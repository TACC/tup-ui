from django.views.generic.base import TemplateView

from .defaults import urls
from .utils import get_latest_articles, get_article

class UserNewsReadView(TemplateView):
  template_name = 'user_news/read.html'

  def get_context_data(self, **kwargs):
    article_id = self.kwargs['id']
    should_sanitize = False
    article = get_article(article_id, should_sanitize)
    context = super().get_context_data(**kwargs)

    context['article'] = article
    context['has_markup_content'] = not should_sanitize
    context['urls'] = urls

    return context
