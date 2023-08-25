from cms.models.pluginmodel import CMSPlugin
from filer.fields.image import FilerImageField
from django.db import models


class StaffProfilePlugin(CMSPlugin):
    """
    Model for CMS staff profile pages.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    post_nomials = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    title2 = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    phone = models.CharField(max_length=50, null=True)

    description = models.TextField()

    photo = FilerImageField(on_delete=models.CASCADE, null=True, blank=True)

    publications = models.TextField(null=True)
    projects = models.TextField(null=True)
    education = models.TextField(null=True)
    research_areas = models.TextField(null=True)
    memberships = models.TextField(null=True)
