
from django.forms.models import ModelForm
from django import forms
from django.utils.translation import gettext_lazy as _
from djangocms_text_ckeditor.widgets import TextEditorWidget

from .models import StaffProfilePlugin
from django.core.exceptions import ValidationError

def validate_jr_and_sr(value):
    if value.lower().endswith('jr') or value.lower().endswith('sr'):
        if not value.endswith('.'):
            raise ValidationError('Please use a period after Jr. or Sr.')

class StaffProfilePluginForm(ModelForm):
    first_name = forms.CharField(
        required=True,
        help_text=_('If desired, include middle name.')
    )
    last_name = forms.CharField(
        required=True
    )
    post_nomials = forms.CharField(
        required=False,
        label=_('Post-nomials'),
        help_text=_('E.g. Ph.D., B.S., M.B.A.'),
        validators=[validate_jr_and_sr]
    )
    title = forms.CharField(
        required=True,
        label=_('Job title'),
        help_text=_('If you are a manager, enter "Manager" here.')
    )
    title2 = forms.CharField(
        required=False,
        label=_('Secondary job title'),
        help_text=_('Only necessary if first Job Title is "Manager".')
    )
    email = forms.CharField(
        required=True
    )
    phone = forms.CharField(
        required=False
    )
    department = forms.CharField(
        required=False,
        label=_('Group / Department')
    )

    description = forms.CharField(
        widget=TextEditorWidget,
        required=False,
        label=_('Biography')
    )

    publications = forms.CharField(
        widget=TextEditorWidget,
        required=False,
        label=_('Selected Publications')
    )
    projects = forms.CharField(
        widget=TextEditorWidget,
        required=False,
        label=_('Current Projects')
    )
    education = forms.CharField(
        widget=TextEditorWidget,
        required=False
    )
    research_areas = forms.CharField(
        widget=TextEditorWidget,
        required=False,
        label=_('Areas of Research')
    )
    memberships = forms.CharField(
        widget=TextEditorWidget,
        required=False
    )

fieldsets = [
    (_('Name'), {
        'fields': (
            ('first_name', 'last_name', 'post_nomials'),
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
        'description': 'We encourage all staff to have a professional photo and a brief professional bio.',
        'fields': (
            'photo',
            'description',
        )
    }),
    (_('Other'), {
        'fields': (
            'publications',
            'projects',
            'research_areas',
            'memberships',
            'education',
        )
    }),
]
