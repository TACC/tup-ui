from django.urls import path

from .defaults import urls
from .views import UserNewsListView, UserNewsReadView

app_name = 'user_news'
urlpatterns = [
    path('', UserNewsListView.as_view(), name='index'),
    path('<id>/', UserNewsReadView.as_view(), name='read'),

    # To support legacy TACC site URLs
    path(urls['legacy']['item_prefix'] + '<id>/', UserNewsReadView.as_view(), name='read'),
]
