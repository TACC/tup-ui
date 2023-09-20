from django.urls import path, include

from django.urls import re_path as url
from apps.user_news.urls import urls as user_news_urls
from django.views.generic.base import RedirectView

custom_urls = [
    path('core/markup/nav/', include('apps.portal_nav.urls', namespace='portal_nav')),
    path('logout/', RedirectView.as_view(url="/portal/logout"), name='logout'),
    path('login/', RedirectView.as_view(url="/portal/login"), name='login'),
    path('portal/', include('apps.portal.urls', namespace='portal')),
    path(user_news_urls['base'], include('apps.user_news.urls', namespace='user_news')),

    # To support legacy TACC site URLs
    path(user_news_urls['legacy']['base'], include('apps.user_news.urls', namespace='user_news_legacy')),

    # To support `taggit_autosuggest` (from `djangocms-blog`)
    url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
]
