from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.template import loader
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from apps.portal.decorators import tup_login_required


def LoginView(request):
    user = authenticate(request)
    if user:
        login(request, user)
        return redirect(request.GET.get('from', '/portal'))

    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL}, request))
    return resp


def LogoutView(request):
    logout(request)
    resp = HttpResponseRedirect("/")
    resp.set_cookie("x-tup-token", "")
    return resp
    

@tup_login_required()
def PortalView(request):
    if settings.DEBUG:
        template = loader.get_template('portal/portal.debug.html')
    else:
        template = loader.get_template('portal/portal.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL}, request))
    return resp
