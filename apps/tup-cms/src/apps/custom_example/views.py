from curses.ascii import HT
from django.http import HttpResponse
from django.conf import settings
from django.template import loader
from django.conf import settings


def AddedView(request):
    if settings.DEBUG:
        template = loader.get_template('custom_example/custom_example.debug.html')
    else:
        template = loader.get_template('custom_example/custom_example.html')
    return HttpResponse(template.render({}, request))
