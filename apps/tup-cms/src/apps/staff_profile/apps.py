from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class StaffProfileConfig(AppConfig):
    verbose_name = _("TACC Staff Profiles")
    name = 'apps.staff_profile'
