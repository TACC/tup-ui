from django.urls import re_path
from .views import AddedView

app_name = 'dashboard'
urlpatterns = [
    re_path('', AddedView, name='index'),
]
