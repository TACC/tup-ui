from django.urls import path, include

custom_urls = [
    path('core/markup/nav/', include('apps.portal_nav.urls', namespace='portal_nav')),
    path('dashboard/', include('apps.dashboard.urls', namespace='dashboard')),
]
