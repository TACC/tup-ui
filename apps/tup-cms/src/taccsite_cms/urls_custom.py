from django.urls import path, include

custom_urls = [
    path('dashboard/', include('apps.dashboard.urls', namespace='dashboard')),
]
