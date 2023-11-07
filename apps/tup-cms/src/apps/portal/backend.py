from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import requests

class TupServicesBackend(ModelBackend):
    def authenticate(self, request):
        token = request.COOKIES.get('x-tup-token', None)
        service_url = settings.TUP_SERVICES_URL
        if settings.DEBUG:
            service_url = service_url.replace("localhost", "host.docker.internal")

        profile_url = f"{service_url}/users/profile"
        headers = {"x-tup-token": token}
        
        try:
            req = requests.get(profile_url, headers=headers, timeout=15)
            req.raise_for_status()
        except Exception as exc:
            raise PermissionDenied from exc

        profile = req.json()
        username = profile['username']
        user_model = get_user_model()
        try:
            return user_model.objects.get(username=username)
        except user_model.DoesNotExist:
            user = user_model(username = username)
            user.save()
            return user
