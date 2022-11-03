from django.http import HttpResponse
from django.template import loader, Context
from django.contrib.auth import authenticate


def PortalNavView(request):
    user = authenticate(request)
    context = {'user': user}
    template = loader.get_template('portal_nav/nav_portal.raw.html')
    return HttpResponse(template.render(context, request))
