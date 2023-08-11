from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from djangocms_text_ckeditor.cms_plugins import TextPlugin
from django.forms.models import ModelForm
from django.db import models
from django import forms
from djangocms_text_ckeditor.widgets import TextEditorWidget

from .models import StaffProfilePlugin
from .forms import StaffProfilePluginForm


@plugin_pool.register_plugin
class StaffProfilePlugin(CMSPluginBase):
    module = 'TUP CMS'
    name = _('Staff Profile')
    form = StaffProfilePluginForm
    model = StaffProfilePlugin
    render_template = "staff_profile/profile.html"
    cache = False

    fieldsets = [
        (_('Name'), {
            'fields': (
                ('first_name', 'last_name', 'post_nomial'),
            )
        }),
        (_('Role'), {
            'fields': (
                ('title', 'title2'),
                ('department'),
            )
        }),
        (_('Contact'), {
            'fields': (
                ('email', 'phone'),
            )
        }),
        (_('Introduction'), {
            'fields': (
                'photo',
                'description',
            )
        }),
        (_('Other'), {
            'fields': (
                'publications',
                'projects',
                'education',
                'research_areas',
                'memberships',
                'experience',
            )
        }),
    ]

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)
        return context
