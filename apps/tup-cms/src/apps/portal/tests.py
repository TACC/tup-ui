from unittest.mock import patch

from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory, SimpleTestCase, override_settings

from apps.portal.views import LoginView, LogoutView


class LoginViewTests(SimpleTestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def _request(self, path="/portal/login"):
        request = self.factory.get(path)
        request.user = AnonymousUser()
        request.session = {}
        return request

    @override_settings(
        TAPIS_TENANT_BASEURL="https://portals.tapis.io",
        TAPIS_CLIENT_ID="client-id",
        TAPIS_CLIENT_KEY="client-key",
        TAPIS_REDIRECT_URI="https://portal.example/portal/login/callback",
        TUP_SERVICES_URL="http://localhost:8001",
    )
    @patch("apps.portal.views.authenticate", return_value=None)
    def test_renders_tapis_login_iframe(self, _mock_authenticate):
        request = self._request()
        response = LoginView(request)

        self.assertEqual(response.status_code, 200)
        content = response.content.decode()
        self.assertIn("login via TACC system login form", content)
        self.assertIn("https://portals.tapis.io/v3/oauth2/login?", content)
        self.assertIn("client_id=client-id", content)
        self.assertIn(
            "redirect_uri=https%3A%2F%2Fportal.example%2Fportal%2Flogin%2Fcallback",
            content,
        )
        self.assertIn("auth_state", request.session)


class LogoutViewTests(SimpleTestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def _request(self):
        request = self.factory.get("/portal/logout")
        request.user = AnonymousUser()
        return request

    @override_settings(
        TAPIS_TENANT_BASEURL="https://portals.tapis.io/",
        TAPIS_CLIENT_ID="client-id",
        TAPIS_CLIENT_KEY="client-key",
        LOGOUT_REDIRECT_URL="https://tacc.utexas.edu/",
    )
    @patch("apps.portal.views.logout")
    def test_redirects_through_tapis_logout(self, mock_logout):
        response = LogoutView(self._request())

        self.assertEqual(response.status_code, 302)
        self.assertEqual(
            response.url,
            "https://portals.tapis.io/v3/oauth2/logout"
            "?redirect_url=https%3A%2F%2Ftacc.utexas.edu%2F",
        )
        self.assertEqual(response.cookies["x-tup-token"]["max-age"], 0)
        mock_logout.assert_called_once()

    @override_settings(
        TAPIS_TENANT_BASEURL="https://portals.tapis.io",
        TAPIS_CLIENT_ID="",
        TAPIS_CLIENT_KEY="",
        LOGOUT_REDIRECT_URL="https://tacc.utexas.edu/",
    )
    @patch("apps.portal.views.logout")
    def test_redirects_locally_without_tapis_config(self, mock_logout):
        response = LogoutView(self._request())

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, "https://tacc.utexas.edu/")
        self.assertEqual(response.cookies["x-tup-token"]["max-age"], 0)
        mock_logout.assert_called_once()
