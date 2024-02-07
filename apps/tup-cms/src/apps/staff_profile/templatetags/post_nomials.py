from django import template
from django.conf import settings

POST_NOMIAL_EXCLUSIONS = settings.TACC_EXCLUDED_POST_NOMIAL_LIST

register = template.Library()

@register.simple_tag
def post_nomial_exclusions():

    return POST_NOMIAL_EXCLUSIONS


