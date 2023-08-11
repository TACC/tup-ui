
from django.forms.models import ModelForm
from django import forms
from djangocms_text_ckeditor.widgets import TextEditorWidget

from .models import StaffProfilePlugin

class StaffProfilePluginForm(ModelForm):
    description = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('description').verbose_name)
    publications = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('publications').verbose_name)
    projects = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('projects').verbose_name)
    education = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('education').verbose_name)
    research_areas = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('research_areas').verbose_name)
    memberships = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('memberships').verbose_name)
    experience = forms.CharField(widget=TextEditorWidget, required=False,
      label=StaffProfilePlugin._meta.get_field('experience').verbose_name)
