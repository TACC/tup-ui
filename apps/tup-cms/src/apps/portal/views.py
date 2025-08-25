import json
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
tup_proxy_url = "/tup-api"

def LoginView(request):
    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')

    if request.method == "POST":
        body = request.POST
        username = body.get("username", "")
        password = body.get("password", "")

        auth_request: requests.Response = requests.post(f"{service_url}/auth",
                                     json={"username": username, 
                                           "password": password})
        if auth_request.status_code == 200:
            auth_jwt = auth_request.json()["jwt"]
            resp = redirect(request.GET.get('next', '/portal'))
            resp.set_cookie("x_tup_token", auth_jwt, httponly=True, max_age=14400)
            return resp
        else:
            resp = HttpResponse(template.render({'baseUrl': tup_proxy_url,
                                                 'is_login_view': True,
                                                 'httpStatus': auth_request.status_code}, request))
            return resp


    user = authenticate(request)
    if user:
        login(request, user)
        return redirect(request.GET.get('next', '/portal'))

    resp = HttpResponse(template.render({'baseUrl': tup_proxy_url, 'is_login_view': True}, request))
    return resp


def LogoutView(request):
    logout(request)
    resp = HttpResponseRedirect("/login")
    resp.delete_cookie("x_tup_token")
    return resp


def ImpersonateView(request):
    resp = HttpResponseRedirect("/portal/dashboard")

    if not request.user:
        return resp

    if not request.user.groups.filter(name='Impersonator').exists():
        return resp

    impersonator_jwt = request.COOKIES.get('x_tup_token')

    headers = {"x-tup-token": settings.TUP_SERVICES_ADMIN_JWT}
    data = {"username": request.GET.get("username")}

    impersonation_resp = requests.post(f"{service_url}/auth/impersonate",
                                       headers=headers,
                                       json=data)
    user_jwt = impersonation_resp.json()['jwt']
    resp.set_cookie("x_tup_token", user_jwt, secure=True, max_age=14400)
    resp.set_cookie("x_tup_token__pre_impersonate", impersonator_jwt, secure=True, max_age=14400)
    return resp


def StopImpersonateView(request):
    resp = HttpResponseRedirect("/portal/dashboard")
    old_jwt = request.COOKIES.get("x_tup_token__pre_impersonate")
    resp.delete_cookie("x_tup_token__pre_impersonate")
    resp.set_cookie("x_tup_token", old_jwt, secure=True, max_age=14400)
    return resp


@tup_login_required()
def PortalView(request):
    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')
    resp = HttpResponse(template.render({'baseUrl': tup_proxy_url, 'authenticated': request.user.is_authenticated}, request))
    return resp
