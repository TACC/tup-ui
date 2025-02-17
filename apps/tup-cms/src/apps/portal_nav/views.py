from django.http import HttpResponse
from django.template import loader, Context
from django.contrib.auth import authenticate


def PortalNavView(request):
    user = authenticate(request)
    is_impersonator = False
    has_impersonator_jwt = request.COOKIES.get('x_tup_token__pre_impersonate')
    if user:
        is_impersonator = user.groups.filter(name='Impersonator').exists()
    context = {'user': user, 'show_impersonation': is_impersonator, 'show_stop_impersonation': has_impersonator_jwt}
    template = loader.get_template('portal_nav/nav_portal.raw.html')
    return HttpResponse(template.render(context, request))
