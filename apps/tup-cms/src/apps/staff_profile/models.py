from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import gettext_lazy as _
from filer.fields.image import FilerImageField
from django.db import models


class StaffProfilePlugin(CMSPlugin):
    """
    Model for CMS staff profile pages.
    """
    first_name = models.CharField(max_length=100, blank=False,
        help_text=_('If desired, include middle name.'))
    last_name = models.CharField(max_length=100, blank=False)
    post_nomial = models.CharField(max_length=100, blank=True,
        verbose_name=_('Post-nomial'),
        help_text=_('E.g. Ph.D., B.S., M.B.A.'))
    title = models.CharField(max_length=100, blank=False,
        verbose_name=_('Job title'))
    title2 = models.CharField(max_length=100, blank=True,
        verbose_name=_('Secondary job title'))
    email = models.CharField(max_length=100, blank=False)
    department = models.CharField(max_length=100, blank=True,
        verbose_name=_('Group / Department'))
    phone = models.CharField(max_length=50, null=True, blank=True)

    description = models.TextField(
        verbose_name=_('Biography'))

    photo = FilerImageField(on_delete=models.CASCADE, null=True, blank=True)

    publications = models.TextField(null=True, blank=True)
    projects = models.TextField(null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    research_areas = models.TextField(null=True, blank=True)
    memberships = models.TextField(null=True, blank=True)
    experience = models.TextField(null=True, blank=True)
