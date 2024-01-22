# CUSTOM SETTINGS VALUES.
# TACC WMA CMS SITE:
# *.TUP.TACC.UTEXAS.EDU

import os

from django.utils.translation import gettext_lazy as _

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

########################
# CORE CMS SETTINGS
# FAQ: These are in future versions of Core-CMS
########################

# NOTE: Already in Core-CMS v3.12.0-beta.2
# whether the session cookie should be secure (https:// only)
SESSION_COOKIE_SECURE = True

########################
# DJANGO CMS SETTINGS
########################

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'PORT': '5432',
        'NAME': 'taccsite',
        'USER': 'postgresadmin',
        'PASSWORD': 'taccforever',  # Change before live deployment.
        'HOST': 'tup_cms_postgres'
    }
}

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
    },
}

SESSION_COOKIE_AGE = 14400

CMS_TEMPLATES = (
    ('standard.html', 'Standard'),
    ('fullwidth.html', 'Full Width'),

    ('guide.html', 'Guide'),
    ('guides/getting_started.html', 'Guide: Getting Started'),
    ('guides/data_transfer.html', 'Guide: Data Transfer'),
    ('guides/data_transfer.globus.html', 'Guide: Globus Data Transfer'),
    ('guides/portal_technology.html', 'Guide: Portal Technology Stack'),
)

CMS_PERMISSIONS = True
# IMPORTANT: All values must be set (to prevent KeyError)
CMS_CACHE_DURATIONS = {
    'menus': 60,
    'content': 60,
    'permissions': 0,
}

RECAPTCHA_PRIVATE_KEY = ''
RECAPTCHA_PUBLIC_KEY = ''

HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.BaseSignalProcessor'

########################
# TACC: GOOGLE ANALYTICS
########################

# To use during dev, Tracking Protection in browser needs to be turned OFF.
GOOGLE_ANALYTICS_PROPERTY_ID = "G-TRRRQZ0EHX"
GOOGLE_ANALYTICS_PRELOAD = True

########################
# TACC: BRANDING
########################

UTEXAS_BRANDING = [
    "utexas",
    "site_cms/img/org_logos/utaustin-white.png",
    "branding-utaustin",
    "https://www.utexas.edu/",
    "_blank",
    "University of Texas at Austin Logo",
    "anonymous",
    "True"
]

NSF_BRANDING = [
    "nsf",
    "site_cms/img/org_logos/nsf-white.png",
    "branding-nsf",
    "https://www.nsf.gov/",
    "_blank",
    "NSF Logo",
    "anonymous",
    "True"
]

BRANDING = [ NSF_BRANDING, UTEXAS_BRANDING ]

########################
# TACC: LOGOS
########################

LOGO = [
    "tup",
    "tup_cms/img/org_logos/tacc-logo-white.svg",
    "tup",
    "/",
    "_self",
    "TACC Logo",
    "anonymous",
    "True"
]

########################
# TACC: SEARCH
########################

SEARCH_QUERY_PARAM_NAME = 'q'

########################
# DJANGO
########################

AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend', 'apps.portal.backend.TupServicesBackend']
TUP_SERVICES_URL = "https://tup-services.tacc.utexas.edu"
LOGIN_URL = "/portal/login"

########################
# TACC: PORTAL
########################

INCLUDES_CORE_PORTAL = False
INCLUDES_PORTAL_NAV = True
INCLUDES_SEARCH_BAR = True

########################
# TACC: NEWS/BLOG
########################

from taccsite_cms.settings import INSTALLED_APPS

# News must be installed BEFORE our CMS app; reason unknown
# https://github.com/TACC/Core-CMS-Resources/pull/127/commits/0b09af6cb0ae6dd630f9ca94bf36ca9e042a5d81
tacc_app_index = INSTALLED_APPS.index('taccsite_cms')
INSTALLED_APPS[tacc_app_index:tacc_app_index] = [
    # 'filer',              # already in Core
    # 'easy_thumbnails',    # already in Core
    'parler',
    'taggit',
    'taggit_autosuggest',
    # 'meta',               # already in Core
    'sortedm2m',
    'djangocms_blog',
]
# REQ: 'taggit_autosuggest' requires the following is added to `urls.py`
"""
urlpatterns += [
    # Support `taggit_autosuggest` (from `djangocms-blog`)
    url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
]
"""

# Paths for alternate templates that user can choose for blog-specific plugin
# - Devs can customize core templates at `templates/djangocms_blog/`.
# - Users can choose alt. templates from `templates/djangocms_blog/plugins/*`.
# - Devs can customize alt. templates at `templates/djangocms_blog/plugins/*`.
BLOG_PLUGIN_TEMPLATE_FOLDERS = (
    ('plugins', 'Default'),
    # ('plugins/alternate', 'Alternate'),
)

# Change default values for the auto-setup of one `BlogConfig`
BLOG_AUTO_SETUP = True # Set to False after setup (minimize overhead)
BLOG_AUTO_HOME_TITLE ='Home'
BLOG_AUTO_BLOG_TITLE = 'News'
BLOG_AUTO_APP_TITLE = 'News'
BLOG_AUTO_NAMESPACE = 'News'

# Miscellaneous settings
BLOG_ENABLE_COMMENTS = False

# TACC settings
TACC_BLOG_SHOW_CATEGORIES = True
TACC_BLOG_SHOW_TAGS = False
TACC_BLOG_CUSTOM_MEDIA_POST_CATEGORY = 'multimedia'
TACC_BLOG_SHOW_ABSTRACT_TAG = 'external'

########################
# TACC: CORE STYLES
########################

TACC_CORE_STYLES_VERSION = 2

########################
# PLUGIN SETTINGS
########################

# https://github.com/django-cms/django-filer/blob/2.0.2/docs/permissions.rst
FILER_ENABLE_PERMISSIONS = True

# https://github.com/django-cms/djangocms-text-ckeditor
CKEDITOR_SETTINGS = {
    'autoParagraph': True, # Core-CMS had set this to False
    'stylesSet': 'default:/static/js/addons/ckeditor.wysiwyg.js',
    'contentsCss': ['/static/djangocms_text_ckeditor/ckeditor/contents.css'],
}

# DJANGOCMS_ICON SETTINGS
# https://github.com/django-cms/djangocms-icon

from taccsite_cms.settings import DJANGOCMS_ICON_SETS as CORECMS_ICON_SETS

DECAL_ICONFILE = os.path.join(BASE_DIR, 'taccsite_custom', 'tup_cms', 'static', 'tup_cms', 'img', 'icons', 'decals.json')
with open(DECAL_ICONFILE, 'r') as fh:
    DECAL_ICONS = fh.read()

# HELP: Icon dropdown sometimes does not show active icon selected.
#       The position of DECAL_ICONS in this array affects the bug.
# SEE: https://github.com/django-cms/djangocms-icon/issues/9
DJANGOCMS_ICON_SETS = [
    (DECAL_ICONS, '', _('TACC Decal SVGs')),
] + CORECMS_ICON_SETS
