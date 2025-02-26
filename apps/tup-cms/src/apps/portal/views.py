from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.template import loader
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
import requests
from apps.portal.decorators import tup_login_required

service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace("localhost", "host.docker.internal")

def LoginView(request):
    user = authenticate(request)
    if user:
        login(request, user)
        return redirect(request.GET.get('next', '/portal'))

    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL, 'is_login_view': True}, request))
    return resp


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
