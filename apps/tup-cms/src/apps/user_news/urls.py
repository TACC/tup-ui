from django.urls import path

from .defaults import urls
from .views import UserNewsReadView

app_name = 'user_news'
urlpatterns = [
    path('<id>/', UserNewsReadView.as_view(), name='read'),

    # To support legacy TACC site URLs
    path(urls['legacy']['item_prefix'] + '<id>/', UserNewsReadView.as_view(), name='read'),
]
