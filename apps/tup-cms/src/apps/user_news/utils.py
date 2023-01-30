import requests
from django.conf import settings

from .defaults import max_articles


service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace('localhost', 'host.docker.internal')


def get_articles():
  r = requests.get(f'{service_url}/news')
  articles = r.json();
  print('ARTICLES', articles);

  return articles

def get_latest_articles(count = max_articles):
  articles = get_articles()
  latest_articles = articles[:count]

  return latest_articles

def get_article(ident):
  articles = get_articles()
  filtered_articles = filter(lambda article: article['ID'] == ident, articles)
  article = list(filtered_articles)[0]

  return article
