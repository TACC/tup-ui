from django.urls import re_path
from .views import LoginView, DashboardView, LogoutView

app_name = 'dashboard'
urlpatterns = [
    re_path('login', LoginView, name='login'),
    re_path('logout', LogoutView, name='logout'),
    re_path('', DashboardView, name='index'),
]
