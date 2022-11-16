from django.urls import re_path
from .views import PortalNavView

app_name = 'portal_nav'
urlpatterns = [
    re_path('', PortalNavView, name='index'),
]
