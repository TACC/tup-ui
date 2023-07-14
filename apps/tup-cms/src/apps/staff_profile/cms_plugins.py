from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from django.utils.html import escape
from djangocms_text_ckeditor.cms_plugins import TextPlugin
from django.forms.models import ModelForm
from django.db import models
from django import forms
from djangocms_text_ckeditor.widgets import TextEditorWidget

from .models import StaffProfilePlugin


def get_display_name(instance):
    if instance.title:
        return f'{instance.name}, {instance.title}'
    else:
        return instance.name

def get_articles(instance):
    articles = []
    article_dict = {
        'Professional Experience': instance.experience,
        'Selected Publications': instance.publications,
        'Current Projects': instance.projects,
        'Education': instance.education,
        'Areas of Research': instance.research_areas,
        'Memberships': instance.memberships,
    }

    for title, data in article_dict.items():
        char_count = len(data)
        articles.append({
            'title': title,
            'data': data,
            'char_count': char_count,
        })

    return articles

@plugin_pool.register_plugin
class StaffProfilePlugin(CMSPluginBase):
    module = "TUP CMS"
    name = "Staff Profile"
    model = StaffProfilePlugin
    render_template = "staff_profile/profile.html"
    cache = False


    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)

        context.update({
            'display_name': escape(get_display_name(instance)),
            'fallback_alt_text': escape(get_display_name(instance)),
            'articles': get_articles(instance)
        })

        return context
