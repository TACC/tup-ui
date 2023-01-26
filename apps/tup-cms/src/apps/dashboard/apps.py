from django.apps import AppConfig
import logging
import requests
from django.dispatch import receiver
from djangocms_forms.signals import form_submission
from django.conf import settings


logger = logging.getLogger(f"portal.{__name__}")
service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace("localhost", "host.docker.internal")


def submit_ticket(form_data):
    message_body = ""
    message_body += f"Category: {form_data['category']}\n"
    message_body += f"System/Resource: {form_data['systemresource']}\n"
    message_body += f"Requestor: {form_data['first-name']} {form_data['last-name']} ({form_data['email']})\n\n"
    message_body += form_data['message']

    ticket_data = {
        "email": form_data["email"],
        "subject": form_data["subject"],
        "description": message_body
    }
    logger.debug(ticket_data)
    requests.post(f"{service_url}/tickets/noauth", data=ticket_data, files=[])


def callback(form, cleaned_data, **kwargs):
    logger.debug(f"received submission from {form.name}")
    if form.name == 'rt-ticket-form':
        submit_ticket(cleaned_data)


class DashboardConfig(AppConfig):
    name = "apps.dashboard"

    def ready(self):
        form_submission.connect(callback)

