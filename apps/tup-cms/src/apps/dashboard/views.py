from django.http import HttpResponse
from django.conf import settings
from django.template import loader
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import authenticate, login


def LoginView(request):
    if settings.DEBUG:
        template = loader.get_template('dashboard/dashboard.debug.html')
    else:
        template = loader.get_template('dashboard/dashboard.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL}, request))
    return resp

def RestrictedView(request):
    user = authenticate(request)
    if user is None:
        return redirect('/dashboard/login')
    login(request, user)
    if settings.DEBUG:
        template = loader.get_template('dashboard/dashboard.debug.html')
    else:
        template = loader.get_template('dashboard/dashboard.html')
    resp = HttpResponse(template.render({'baseUrl': settings.TUP_SERVICES_URL}, request))
    return resp
