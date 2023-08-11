from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from filer.fields.image import FilerImageField
from django.db import models


class StaffProfilePlugin(CMSPlugin):
    """
    Model for CMS staff profile pages.
    """
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    title = models.CharField(max_length=100, blank=False)
    email = models.CharField(max_length=100, blank=False)
    department = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)

    description = models.TextField()

    photo = FilerImageField(on_delete=models.CASCADE, null=True, blank=True)

    publications = models.TextField(null=True, blank=True)
    projects = models.TextField(null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    research_areas = models.TextField(null=True, blank=True)
    memberships = models.TextField(null=True, blank=True)
    experience = models.TextField(null=True, blank=True)
