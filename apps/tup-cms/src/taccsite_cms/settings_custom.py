# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.TUP.TACC.UTEXAS.EDU

########################
# DJANGO CMS SETTINGS
########################

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'PORT': '5432',
        'NAME': 'taccsite',
        'USER': 'postgresadmin',
        'PASSWORD': 'taccforever',  # Change before live deployment.
        'HOST': 'tup_cms_postgres'
    }
}

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),

    ('guide.html', 'Guide'),
    ('guides/getting_started.html', 'Guide: Getting Started'),
    ('guides/data_transfer.html', 'Guide: Data Transfer'),
    ('guides/data_transfer.globus.html', 'Guide: Globus Data Transfer'),
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack'),
)

INCLUDES_CORE_PORTAL = False

RECAPTCHA_PRIVATE_KEY = ''
RECAPTCHA_PUBLIC_KEY = ''

########################
# TACC: LOGOS
########################

LOGO = [
    "tup",
    "tup-cms/img/org_logos/tacc-logo.svg",
    "tup",
    "/",
    "_self",
    "TACC Logo",
    "anonymous",
    "True"
]

AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend', 'apps.dashboard.backend.TupServicesBackend']
TUP_SERVICES_URL = "https://dev.tup-services.tacc.utexas.edu"
