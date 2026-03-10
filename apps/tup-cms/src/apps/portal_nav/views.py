import logging

from django.http import HttpResponse
from django.template import loader, Context
from django.contrib.auth import authenticate

logger = logging.getLogger(f"portal.{__name__}")


def PortalNavView(request):
    auth_user = authenticate(request)
    # Debug: see plan debug_portal_nav_auth_51488d45
    logger.info(
        'portal_nav: request.user=%s is_authenticated=%s authenticate()=%s cookies sessionid=%s x-tup-token=%s',
        getattr(request.user, 'username', request.user),
        getattr(request.user, 'is_authenticated', '?'),
        auth_user,
        'sessionid' in request.COOKIES,
        'x-tup-token' in request.COOKIES,
    )
    user = auth_user
    is_impersonator = False
    if user:
        is_impersonator = user.groups.filter(name='Impersonator').exists()
    context = {'user': user, 'show_impersonation': is_impersonator}
    template = loader.get_template('portal_nav/nav_portal.raw.html')
    return HttpResponse(template.render(context, request))
