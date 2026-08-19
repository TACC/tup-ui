from unittest.mock import patch

from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory, SimpleTestCase, override_settings

from apps.portal.views import LogoutView


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
