from django.urls import re_path
from .views import LoginView, RestrictedView

app_name = 'dashboard'
urlpatterns = [
    re_path('login', LoginView, name='login'),
    re_path('', RestrictedView, name='index'),
]
