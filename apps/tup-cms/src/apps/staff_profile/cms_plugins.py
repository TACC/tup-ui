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
from .forms import StaffProfilePluginForm

def get_display_name(instance):
    name = f'{instance.first_name} {instance.first_name}'

    if instance.post_nomial:
        return f'{name}, {instance.post_nomial}'
    else:
        return name

@plugin_pool.register_plugin
class StaffProfilePlugin(CMSPluginBase):
    module = "TUP CMS"
    name = "Staff Profile"
    form = StaffProfilePluginForm
    model = StaffProfilePlugin
    render_template = "staff_profile/profile.html"
    cache = False


    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)

        context.update({
            'display_name': escape(get_display_name(instance)),
            'fallback_alt_text': escape(get_display_name(instance))
        })

        return context
