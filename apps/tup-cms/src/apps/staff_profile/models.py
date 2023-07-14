from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from filer.fields.image import FilerImageField
from django.db import models


class StaffProfilePlugin(CMSPlugin):
    """
    Model for CMS staff profile pages.
    """
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    phone = models.CharField(max_length=50, blank=True)

    description = models.TextField()

    photo = FilerImageField(on_delete=models.CASCADE, blank=True)

    publications = models.TextField(blank=True)
    projects = models.TextField(blank=True)
    education = models.TextField(blank=True)
    research_areas = models.TextField(blank=True)
    memberships = models.TextField(blank=True)
    experience = models.TextField(blank=True)
