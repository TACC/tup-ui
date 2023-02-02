import re

from cms.models.pluginmodel import CMSPlugin

from django.db import models

class TaccRedirect(CMSPlugin):
    def get_short_description(self):
        url_abbrev = re.sub('http(s*)://', '', self.url)[:5]
        return f'{url_abbrev}...'

    url = models.URLField(
        help_text=f'The URL to which to redirect the user.',
        blank=False
    )
