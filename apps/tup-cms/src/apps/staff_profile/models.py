from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from filer.fields.image import FilerImageField
from django.db import models


class StaffProfilePlugin(CMSPlugin):
    """
    Model for CMS staff profile pages.
    """
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    phone = models.CharField(max_length=50, null=True)

    description = models.TextField()

    photo = FilerImageField(on_delete=models.CASCADE, null=True)

    publications = models.TextField(null=True)
    projects = models.TextField(null=True)
    education = models.TextField(null=True)
    research_areas = models.TextField(null=True)
    memberships = models.TextField(null=True)
    experience = models.TextField(null=True)
