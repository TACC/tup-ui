from urllib.parse import urlencode
import base64
import json
import secrets
import logging
import requests
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.conf import settings
from django.template import loader
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.urls import reverse
from apps.portal.decorators import tup_login_required

logger = logging.getLogger(f"portal.{__name__}")

service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace("localhost", "host.docker.internal")


def _oauth_redirect_uri(request):
    configured_redirect_uri = getattr(settings, "TAPIS_REDIRECT_URI", "")
    if configured_redirect_uri:
        return configured_redirect_uri

    protocol = "https" if request.is_secure() else "http"
    return f"{protocol}://{request.get_host()}{reverse('portal:login_callback')}"


def _extract_user_data(payload):
    return {
        "username": (
            payload.get("username")
            or payload.get("tapis/username")
            or payload.get("preferred_username")
            or payload.get("sub")
        ),
        "first_name": (
            payload.get("firstName")
            or payload.get("first_name")
            or payload.get("given_name")
            or ""
        ),
        "last_name": (
            payload.get("lastName")
            or payload.get("last_name")
            or payload.get("family_name")
            or ""
        ),
        "email": payload.get("email") or "",
    }


def _resolve_tapis_user_data(access_token):
    # Prefer userinfo so Tapis validates token signature/claims server-side.
    try:
        userinfo_resp = requests.get(
            f"{settings.TAPIS_TENANT_BASEURL}/v3/oauth2/userinfo",
            headers={"X-Tapis-Token": access_token},
            timeout=30,
        )
        userinfo_resp.raise_for_status()
        userinfo = userinfo_resp.json().get("result", userinfo_resp.json())
        user_data = _extract_user_data(userinfo)
        if user_data["username"]:
            return user_data
    except Exception:
        logger.exception("Unable to resolve Tapis username via /userinfo")

    # Fallback to direct claim read to tolerate temporary userinfo failures.
    try:
        payload_b64 = access_token.split(".")[1]
        payload_b64 += "=" * (-len(payload_b64) % 4)
        claims = json.loads(base64.urlsafe_b64decode(payload_b64.encode()).decode())
        return _extract_user_data(claims)
    except Exception:
        logger.exception("Unable to decode Tapis access token claims for username")
        return {}


def LoginView(request):
    user = authenticate(request)
    if user:
        login(request, user)
        return redirect(request.GET.get('next', '/portal'))

    # Temporary fallback for environments not yet configured for Tapis OAuth/MFA.
    # Remove this block after production fully switches to Tapis/MFA login.
    if not all(
        [
            getattr(settings, "TAPIS_TENANT_BASEURL", ""),
            getattr(settings, "TAPIS_CLIENT_ID", ""),
            getattr(settings, "TAPIS_CLIENT_KEY", ""),
        ]
    ):
        if settings.DEBUG:
            template = loader.get_template('portal/portal.debug.html')
        else:
            template = loader.get_template('portal/portal.html')
        return HttpResponse(
            template.render(
                {'baseUrl': settings.TUP_SERVICES_URL, 'is_login_view': True}, request
            )
        )

    next_path = request.GET.get("next")
    if next_path:
        request.session["next"] = next_path

    state = secrets.token_urlsafe(32)
    request.session["auth_state"] = state

    params = urlencode(
        {
            "client_id": settings.TAPIS_CLIENT_ID,
            "response_type": "code",
            "redirect_uri": _oauth_redirect_uri(request),
            "state": state,
        }
    )
    return redirect(f"{settings.TAPIS_TENANT_BASEURL}/v3/oauth2/authorize?{params}")


def LoginCallbackView(request):
    returned_state = request.GET.get("state")
    expected_state = request.session.get("auth_state")
    if expected_state != returned_state:
        logger.warning(
            "OAuth state mismatch: expected=%s returned=%s",
            expected_state,
            returned_state,
        )
        return HttpResponseBadRequest("Authorization State Failed")

    code = request.GET.get("code")
    if not code:
        logger.warning("Authorization failed: %s", request.GET.get("error", "no_code"))
        return HttpResponseRedirect(reverse("portal:logout"))

    try:
        token_resp = requests.post(
            f"{settings.TAPIS_TENANT_BASEURL}/v3/oauth2/tokens",
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": _oauth_redirect_uri(request),
            },
            auth=(settings.TAPIS_CLIENT_ID, settings.TAPIS_CLIENT_KEY),
            timeout=30,
        )
        token_resp.raise_for_status()
        token_json = token_resp.json()
        token_result = token_json.get("result", {})
        access_token = token_result.get("access_token", {}).get("access_token")
        if not access_token:
            raise ValueError("Missing access token in Tapis token response")

        user_data = _resolve_tapis_user_data(access_token)
        username = user_data.get("username")
        if not username:
            raise ValueError("Missing username in Tapis userinfo response")

        jwt_mint_resp = requests.post(
            f"{service_url}/auth/impersonate",
            headers={"x-tup-token": settings.TUP_SERVICES_ADMIN_JWT},
            json={"username": username},
            timeout=30,
        )
        jwt_mint_resp.raise_for_status()
        tup_jwt = jwt_mint_resp.json()["jwt"]
    except Exception:
        logger.exception("OAuth callback failed")
        return HttpResponseRedirect(reverse("portal:logout"))

    user_model = get_user_model()
    user, _ = user_model.objects.get_or_create(
        username=username,
        defaults={
            "first_name": user_data.get("first_name", ""),
            "last_name": user_data.get("last_name", ""),
            "email": user_data.get("email", ""),
        },
    )
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')

    request.session.pop("auth_state", None)
    redirect_path = request.session.pop("next", "/portal")
    response = HttpResponseRedirect(redirect_path)
    response.set_cookie("x-tup-token", tup_jwt, secure=not settings.DEBUG)
    return response


def LogoutView(request):
    logout(request)
    resp = HttpResponseRedirect("/login")
    resp.set_cookie("x-tup-token", "")
    return resp


def ImpersonateView(request):
    resp = HttpResponseRedirect("/portal/dashboard")

    if not request.user:
        return resp

    if not request.user.groups.filter(name='Impersonator').exists():
        return resp

    headers = {"x-tup-token": settings.TUP_SERVICES_ADMIN_JWT}
    data = {"username": request.GET.get("username")}

    impersonation_resp = requests.post(f"{service_url}/auth/impersonate",
                                       headers=headers,
                                       json=data)
    user_jwt = impersonation_resp.json()['jwt']
    resp.set_cookie("x-tup-token", user_jwt, secure=True)
    return resp


@tup_login_required()
def PortalView(request):
    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL}, request))
    return resp
