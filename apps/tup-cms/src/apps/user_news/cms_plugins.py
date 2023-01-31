# https://github.com/wesleyboar/Core-CMS-Plugin-Sample/tree/main/djangocms_tacc_sample
from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool

from django.utils.translation import gettext_lazy as _
from django.utils.encoding import force_text

from .models import UserNewsList
from .defaults import max_articles, urls
from .utils import get_latest_articles

# SEE: http://docs.django-cms.org/en/release-3.7.x/reference/plugins.html
@plugin_pool.register_plugin
class UserNewsListPlugin(CMSPluginBase):
    module = 'TUP CMS'
    model = UserNewsList
    name = _('User News List')
    render_template = 'user_news/includes/list.html'

    cache = False
    text_enabled = False
    allow_children = False

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)
        request = context['request']

        context.update({
            'articles': get_latest_articles(instance.max_articles),
            'urls': urls
        })
        return context
