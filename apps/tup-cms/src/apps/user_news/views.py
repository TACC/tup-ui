from django.http import HttpResponse
from django.template import loader, Context
from django.contrib.auth import authenticate


def UserNewsView(request):
    user = authenticate(request)
    context = {'user': user}
    template = loader.get_template('user_news/user_news.html')
    return HttpResponse(template.render(context, request))
