import requests
from django.conf import settings

from .defaults import max_articles


service_url = settings.TUP_SERVICES_URL
if settings.DEBUG:
    service_url = service_url.replace('localhost', 'host.docker.internal')


def get_articles():
  r = requests.get(f'{service_url}/news')
  articles = r.json();

  return articles

def get_latest_articles(count = max_articles):
  articles = get_articles()
  latest_articles = articles[:count]
  proxy_articles = map(
    lambda article: create_proxy_article(article), latest_articles
  )

  return proxy_articles

def get_article(ident):
  articles = get_articles()
  filtered_articles = filter(lambda article: article['ID'] == ident, articles)
  article = list(filtered_articles)[0]

  return create_proxy_article(article)

def rename_dict_item(dict, old_item_name, new_item_name):
    dict[new_item_name] = dict[old_item_name]
    del dict[old_item_name]

def create_proxy_article(article):
  if article['Updates']:
    updates = article['Updates']['AnnouncementUpdate']
    for update in updates:
      rename_dict_item(update, 'PostedDate', 'postDate')
      rename_dict_item(update, 'Content', 'content')
  else:
    updates = None

  context_article = {
    'id': article['ID'],
    'title': article['WebTitle'],
    'content': article['Content'],
    'subtitle': article['Subtitle'],
    'author': article['Author'],
    'postDate': article['PostedDate'],
    'updates': updates,
  }

  return context_article
