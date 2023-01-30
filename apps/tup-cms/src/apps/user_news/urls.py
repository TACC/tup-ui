from django.urls import path

from .views import UserNewsListView, UserNewsReadView

app_name = 'user_news'
urlpatterns = [
    path('', UserNewsListView.as_view(), name='index'),
    path('<id>/', UserNewsReadView.as_view(), name='read'),

    # To support legacy TACC site URLs
    path('-/news/<id>/', UserNewsReadView.as_view(), name='read'),
]
