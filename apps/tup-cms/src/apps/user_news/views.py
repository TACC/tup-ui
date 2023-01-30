from django.views.generic.base import TemplateView

from .defaults import urls
from .utils import get_article, get_latest_articles

class UserNewsListView(TemplateView):
  template_name = 'user_news/list.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)

    context['articles'] = get_latest_articles()
    context['urls'] = urls

    return context

class UserNewsReadView(TemplateView):
  template_name = 'user_news/read.html'

  def get_context_data(self, **kwargs):
    article_id = self.kwargs['id']
    context = super().get_context_data(**kwargs)

    context['article'] = get_article(article_id)
    context['urls'] = urls

    return context
