from unittest.mock import patch

from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory, SimpleTestCase, TestCase, override_settings
from django.urls import reverse

from apps.portal.views import LogoutView


class OAuthRecoveryTests(TestCase):
    def test_state_mismatch_renders_recovery_page_without_leaking_states(self):
        session = self.client.session
        session["auth_state"] = "expected-secret-state"
        session["next"] = "/portal/projects"
        session.save()

        with patch("apps.portal.views.secrets.token_hex", return_value="ref12345"):
            response = self.client.get(
                reverse("portal:login_callback"),
                {"state": "returned-secret-state", "code": "authorization-code"},
            )

        self.assertEqual(response.status_code, 400)
        self.assertContains(
            response,
            "We couldn’t complete your login",
            status_code=400,
        )
        self.assertContains(response, "ref12345", status_code=400)
        self.assertNotContains(response, "expected-secret-state", status_code=400)
        self.assertNotContains(response, "returned-secret-state", status_code=400)
        self.assertNotContains(response, "authorization-code", status_code=400)

    def test_missing_expected_state_renders_recovery_page(self):
        response = self.client.get(
            reverse("portal:login_callback"),
            {"state": "returned-secret-state", "code": "authorization-code"},
        )

        self.assertEqual(response.status_code, 400)
        self.assertContains(response, "Restart login", status_code=400)

    def test_restart_clears_pending_oauth_data_and_redirects_to_login(self):
        session = self.client.session
        session["auth_state"] = "stale-state"
        session["next"] = "/portal/projects"
        session["unrelated"] = "preserved"
        session.save()

        response = self.client.get(reverse("portal:login_restart"))

        self.assertRedirects(
            response,
            reverse("portal:login"),
            fetch_redirect_response=False,
        )
        self.assertNotIn("auth_state", self.client.session)
        self.assertNotIn("next", self.client.session)
        self.assertEqual(self.client.session["unrelated"], "preserved")


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
