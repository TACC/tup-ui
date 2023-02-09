from django.urls import path, include

from django.conf.urls import url
from apps.user_news.urls import urls as user_news_urls

custom_urls = [
    path('core/markup/nav/', include('apps.portal_nav.urls', namespace='portal_nav')),
    path('dashboard/', include('apps.dashboard.urls', namespace='dashboard')),
    path(user_news_urls['base'], include('apps.user_news.urls', namespace='user_news')),

    # To support legacy TACC site URLs
    path(user_news_urls['legacy']['base'], include('apps.user_news.urls', namespace='user_news_legacy')),

    # To support `taggit_autosuggest` (from `djangocms-blog`)
    url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
]
