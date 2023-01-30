from django.urls import path, include

from django.conf.urls import url

custom_urls = [
    path('core/markup/nav/', include('apps.portal_nav.urls', namespace='portal_nav')),
    path('dashboard/', include('apps.dashboard.urls', namespace='dashboard')),
    path('user-updates/', include('apps.user_news.urls', namespace='user_news')),

    # To support legacy TACC site URLs
    path('user-news/', include('apps.user_news.urls', namespace='user_news')),

    # To support `taggit_autosuggest` (from `djangocms-blog`)
    url(r'^taggit_autosuggest/', include('taggit_autosuggest.urls')),
]
