from functools import wraps
from django.shortcuts import redirect
import urllib
from django.contrib.auth import authenticate, login

def tup_login_required(login_url="/portal/login"):
    """
    Decorates a view so that it attempts to authenticate the user before proceeding.
    This differs from @login_required() in that it explicitly calls the authentication
    backend (tup-services) to verify that the JWT payload is valid.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapper_view(request, *args, **kwargs):
            user = authenticate(request)

            if user is None:
                from_path = urllib.parse.quote(request.get_full_path())
                return redirect(f'{login_url}?next={from_path}')

            login(request, user)
            return view_func(request, *args, **kwargs)

        return _wrapper_view

    return decorator
