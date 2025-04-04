from django.urls import re_path
from .views import LoginView, PortalView, LogoutView, ImpersonateView, StopImpersonateView

app_name = 'portal'
urlpatterns = [
    re_path('login', LoginView, name='login'),
    re_path('logout', LogoutView, name='logout'),
    re_path('stop-impersonate', StopImpersonateView, name='stop_impersonate'),
    re_path('impersonate', ImpersonateView, name='impersonate'),
    re_path('', PortalView, name='index'),
]
