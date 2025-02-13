import requests
from datetime import datetime
from dateutil.parser import isoparse
from requests import HTTPError

from django.conf import settings

from .defaults import max_articles


service_url = settings.TUP_SERVICES_URL


def get_articles(sanitize = True):
  url = f'{service_url}/news?sanitize={sanitize}'
  try:
    r = requests.get(url)
    r.raise_for_status()
    articles = r.json()
    return articles
  except HTTPError:
    return []

def get_latest_articles(count = max_articles, sanitize = True):
  articles = get_articles(sanitize)
  latest_articles = articles[:count] if count else articles
  proxy_articles = map(
    lambda article: create_proxy_article(article), latest_articles
  )

  return proxy_articles

def get_article(id_, sanitize = True):
  articles = get_articles(sanitize)
  filtered_articles = filter(lambda article: str(article['ID']) == str(id_), articles)
  article = list(filtered_articles)[0]

  return create_proxy_article(article)

def get_datetime(str_):
  return isoparse(str_)

def format_date(datetime):
  return datetime.strftime('%B %d, %Y')

def format_datetime(datetime):
  return datetime.isoformat()

def rename_dict_item(dict, old_item_name, new_item_name):
    dict[new_item_name] = dict[old_item_name]
    del dict[old_item_name]

def create_proxy_article(article):
  if article['Updates']:
    updates = article['Updates']['AnnouncementUpdate']

    for update in updates:
      postDateTime = get_datetime(update['PostedDate'])

      rename_dict_item(update, 'PostedDate', 'postDate')
      rename_dict_item(update, 'Content', 'content')
      update['postDate'] = format_date(postDateTime)
      update['postDateTime'] = format_datetime(postDateTime)

  else:
    updates = None

  postDateTime = get_datetime(article['PostedDate'])

  context_article = {
    'id': article['ID'],
    'title': article['WebTitle'].strip(),
    'content': article['Content'],
    'subtitle': article['Subtitle'],
    'author': article['Author'],
    'postDate': format_date(postDateTime),
    'postDateTime': format_datetime(postDateTime),
    'updates': updates,
  }

  return context_article
