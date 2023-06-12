from django.http import HttpResponse
from django.template import loader, Context
from django.contrib.auth import authenticate


def PortalNavView(request):
    user = authenticate(request)
    is_impersonator = user.groups.filter(name='Impersonator').exists()
    context = {'user': user, 'show_impersonation': is_impersonator}
    template = loader.get_template('portal_nav/nav_portal.raw.html')
    return HttpResponse(template.render(context, request))
