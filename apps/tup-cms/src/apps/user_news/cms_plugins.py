# https://github.com/wesleyboar/Core-CMS-Plugin-Sample/tree/main/djangocms_tacc_sample
from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool

from django.utils.translation import gettext_lazy as _
from django.utils.encoding import force_str as force_text

from .defaults import max_articles, urls
from .utils import get_latest_articles

# SEE: http://docs.django-cms.org/en/release-3.7.x/reference/plugins.html
@plugin_pool.register_plugin
class UserNewsListPlugin(CMSPluginBase):
    module = 'TUP CMS'
    name = _('User News List')
    render_template = 'user_news/list__short.html'

    cache = False
    text_enabled = False
    allow_children = False

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)
        request = context['request']

        should_sanitize = True
        articles = get_latest_articles(max_articles, should_sanitize)

        context.update({
            'articles': articles,
            'has_markup_content': not should_sanitize,
            'urls': urls
        })
        return context


@plugin_pool.register_plugin
class FullUserNewsListPlugin(CMSPluginBase):
    module = 'TUP CMS'
    name = _('Full User News List')
    render_template = 'user_news/list__full.html'

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)
        request = context['request']

        should_sanitize = True
        articles = get_latest_articles(None, should_sanitize)

        context.update({
            'articles': articles,
            'has_markup_content': not should_sanitize,
            'urls': urls
        })
        return context
