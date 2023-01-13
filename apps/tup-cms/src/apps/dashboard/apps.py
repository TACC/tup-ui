from django.apps import AppConfig
import logging
from django.dispatch import receiver
from djangocms_forms.signals import form_submission

logger = logging.getLogger(f"portal.{__name__}")

def callback(form, cleaned_data, **kwargs):
    logger.debug(f"received submission from {form.name}")
    logger.debug(cleaned_data)

class DashboardConfig(AppConfig):
    name = "apps.dashboard"

    def ready(self):
        form_submission.connect(callback)

