from django.urls import path, re_path
from .views import (
    LoginView,
    LoginCallbackView,
    PortalView,
    LogoutView,
    ImpersonateView,
)

app_name = 'portal'
urlpatterns = [
    path('login', LoginView, name='login'),
    path('login/callback', LoginCallbackView, name='login_callback'),
    path('login/callback/', LoginCallbackView),
    path('logout', LogoutView, name='logout'),
    path('impersonate', ImpersonateView, name='impersonate'),
    re_path(r'^.*$', PortalView, name='index'),
]
