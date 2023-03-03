from django.urls import re_path
from .views import LoginView, PortalView, LogoutView

app_name = 'portal'
urlpatterns = [
    re_path('login', LoginView, name='login'),
    re_path('logout', LogoutView, name='logout'),
    re_path('', PortalView, name='index'),
]
