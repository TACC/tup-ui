from cms.models.pluginmodel import CMSPlugin

from django.db import models

from .defaults import max_articles

class UserNewsList(CMSPlugin):
    max_articles = models.PositiveSmallIntegerField(
        default=max_articles,
        help_text=f'The maximum number of articles to show.',
        blank=True
    )
