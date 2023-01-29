from django.urls import re_path
from .views import UserNewsView

app_name = 'user_news'
urlpatterns = [
    re_path('', UserNewsView.as_view(), name='index'),
]
