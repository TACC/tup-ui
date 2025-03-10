from django.apps import AppConfig
import logging
import requests
from django.dispatch import receiver
from djangocms_forms.signals import form_submission
from django.conf import settings
from django.core.mail import send_mail
from .utils import reverse_slugify
from datetime import datetime

logger = logging.getLogger(f"portal.{__name__}")
service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace("localhost", "host.docker.internal")
hetdex_allocation = 66657

QUEUE_MAP = {
    "Allocations": "Allocations",
    "Login Issues": "Accounts",
    "Multi-factor Authentication": "MFA",
    "Data Analytics or Storage Resources": "Data Intensive Computing",
    "Login/Authentication Issue": "Accounting",
    "Running Jobs or Using TACC Resources": "High Performance Computing",
    "Security Incident": "NSO",
    "Arecibo Data": "High Performance Computing",
    "Other": "High Performance Computing"
}


def submit_ticket(form_data):
    message_body = ""
    message_body += f"Category: {form_data['category']}\n"
    message_body += f"System/Resource: {form_data['systemresource']}\n"
    message_body += f"Requestor: {form_data['first-name']} {form_data['last-name']} ({form_data['email']})\n\n"
    message_body += form_data['message']

    ticket_data = {
        "email": form_data["email"],
        "subject": form_data["subject"],
        "description": message_body,
        "queue": QUEUE_MAP.get(form_data['category'], 'Accounting')
    }
    logger.debug(ticket_data)
    requests.post(f"{service_url}/tickets/noauth", data=ticket_data, files=[])


def send_confirmation_email(form_name, form_data):

    tour_receipt = ""
    if form_name == "Tour Request Form":
        tour_receipt = "<p>A copy of your tour request is provided below for your records:</p>\n"
        for key in form_data:
            if not key.startswith('recaptcha_'):
                label = reverse_slugify(key) if key != 'form_id' else 'Form ID'
                value = form_data[key]
                tour_receipt += f"<p>{label}: {value}</p>\n"

    email_body = f"""
            <p>Greetings,</p>
            <p>
                Thank you for reaching out to TACC and completing the {form_name}.
            </p>
            <p>
                <ul>
                    <li>For information about training opportunities, please visit the <a href="https://tacc.utexas.edu/use-tacc/training/">Training page</a>, or contact Tabish Khan (tkhan@tacc.utexas.edu).</li>
                    <li>For tour requests, a tour coordinator will contact you within two business days to complete your reservation. For additional assistance please reach out to info@tacc.utexas.edu.</li>
                    <li>For additional assistance please reach out to info@tacc.utexas.edu.</li>
                </ul>
            </p>
            {tour_receipt}
            <p>
            Thank you for your time,<br>
            TACC Support
            </p>
            """
    send_mail(
    f"TACC Form Submission Received: {form_name}",
    email_body,
    settings.DEFAULT_FROM_EMAIL,
    [form_data["email"]],
    html_message=email_body)

def add_user_hetdex_allocation(form_data, request):
    headers = {"x-tup-token": settings.TUP_SERVICES_ADMIN_JWT}
    data = {"username": request.user.username}
    admin_params = {"username": "admin"}
    response = requests.post(f"{service_url}/projects/{hetdex_allocation}/users",
                           headers=headers,
                           json=data,
                           params=admin_params)
    
    email_body = f"""
            <p>Greetings,</p>
            <p>
                User {request.user.username} submitted a request to access the HETDEX Public JupyterHub.
            </p>
            <p>
            <b>Form information:</b>
            <p><b>Date:</b> {datetime.now().strftime('%B %d, %Y %H:%M')}</p>
            </p>"""
    for key in form_data:
        if not key.startswith('recaptcha_'):
            label = reverse_slugify(key) if key != 'form_id' else 'Form ID'
            value = form_data[key]
            email_body += f"<p><b>{label}</b>: {value}</p>\n"
    
    if response.status_code != 200:
        # Add error information to the email body
        email_body += f"""
            <h4><b>There was an error adding this user to the project:</b></h4>
            <p>Status Code: {response.status_code}</p>
            <p>Response Text: {response.text}</p>
            """
        
        # Send email with "ATTENTION REQUIRED" subject line
        send_mail(
            f"ATTENTION REQUIRED: HETDEX JupyterHub Access Request Failed",
            email_body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.HETDEX_ADMIN_EMAIL],
            html_message=email_body)
    else:
        send_mail(
            f"HETDEX JupyterHub Access Request Successful",
            email_body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.HETDEX_ADMIN_EMAIL],
            html_message=email_body)

def callback(form, cleaned_data, request, **kwargs):
    logger.debug(f"received submission from {form.name} for user {request.user}")
    if form.name == 'rt-ticket-form':
        submit_ticket(cleaned_data)
    if form.name == 'hetdex-request-form':
        add_user_hetdex_allocation(cleaned_data, request)
    elif ('email' in cleaned_data):
        send_confirmation_email(form.name, cleaned_data)


class PortalConfig(AppConfig):
    name = "apps.portal"

    def ready(self):
        form_submission.connect(callback)

