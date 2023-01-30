import requests
from django.conf import settings
from django.views.generic.base import TemplateView

from .defaults import list_count


service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace('localhost', 'host.docker.internal')


def get_articles():
  r = requests.get(f'{service_url}/news')
  articles = r.json();
  print('ARTICLES', articles);

  return articles

def get_latest_articles(count = list_count):
  articles = get_articles()
  latest_articles = articles[:count]

  return latest_articles

def get_article(ident):
  articles = get_articles()
  filtered_articles = filter(lambda article: article['ID'] == ident, articles)
  article = list(filtered_articles)[0]

  return article


class UserNewsListView(TemplateView):
  template_name = 'user_news/list.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)

    context['latest_articles'] = get_latest_articles()
    context['should_title_be_link'] = True

    return context

class UserNewsReadView(TemplateView):
  template_name = 'user_news/read.html'

  def get_context_data(self, **kwargs):
    article_id = self.kwargs['id']
    context = super().get_context_data(**kwargs)

    context['article'] = get_article(article_id)

    return context
