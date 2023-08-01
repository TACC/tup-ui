from django.forms.models import ModelForm
from django import forms
from djangocms_text_ckeditor.widgets import TextEditorWidget

class StaffProfilePluginForm(ModelForm):
    description = forms.CharField(widget=TextEditorWidget, required=False)
    publications = forms.CharField(widget=TextEditorWidget, required=False)
    projects = forms.CharField(widget=TextEditorWidget, required=False)
    education = forms.CharField(widget=TextEditorWidget, required=False)
    research_areas = forms.CharField(widget=TextEditorWidget, required=False)
    memberships = forms.CharField(widget=TextEditorWidget, required=False)
    experience = forms.CharField(widget=TextEditorWidget, required=False)
