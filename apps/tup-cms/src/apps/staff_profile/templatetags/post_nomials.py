from django import template
from django.conf import settings

POST_NOMIALS_EXCLUSION_LIST = settings.TACC_STAFF_PROFILE_POST_NOMIALS_EXCLUSION_LIST

register = template.Library()

@register.simple_tag
def post_nomials_exclusion_list():

    return POST_NOMIALS_EXCLUSION_LIST


