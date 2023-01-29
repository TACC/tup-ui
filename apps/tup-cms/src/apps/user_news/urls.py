from django.urls import path
from .views import UserNewsListView

app_name = 'user_news'
urlpatterns = [
    path('', UserNewsListView.as_view(), name='index'),
    path('list/', UserNewsListView.as_view(), name='list'),
]
