from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import requests

class TupServicesBackend(ModelBackend):
    def authenticate(self, request):
        token = request.COOKIES.get('x-tup-token', None)
        profile_url = f"{settings.TUP_SERVICES_URL}/auth/profile"
        headers = {"x-tup-token": token}

        req = requests.get(profile_url, headers=headers)
        if req.status_code != 200:
            raise PermissionDenied

        profile = req.json()
        username = profile['username']
        user_model = get_user_model()
        try:
            return user_model.objects.get(username=username)
        except user_model.DoesNotExist:
            user = user_model(username = username)
            user.save()
            return user
