# https://github.com/wesleyboar/Core-CMS-Plugin-Sample/tree/main/djangocms_tacc_sample
from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool

from django.utils.translation import gettext_lazy as _
from django.utils.encoding import force_text

from .models import TaccRedirect

# SEE: http://docs.django-cms.org/en/release-3.7.x/reference/plugins.html
@plugin_pool.register_plugin
class TaccRedirectPlugin(CMSPluginBase):
    module = 'TUP CMS'
    model = TaccRedirect
    name = _('Redirect')
    render_template = 'tacc_redirect/tacc_redirect.html'

    cache = False
    text_enabled = False
    allow_children = False

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)

        return context
