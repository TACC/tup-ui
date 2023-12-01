from djangocms_blog import views as cms_blog_views
from djangocms_blog.views import BaseBlogListView
import logging

logger = logging.getLogger(__name__)

# Define and use CustomModel instead of OriginalModel
class OurBlogListView(BaseBlogListView):
    # To filter out certain posts from the complete listing
    def get_queryset(self):
        # SEE: https://github.com/nephila/djangocms-blog/blob/1.2.3/djangocms_blog/views.py#L41-L47
        language = get_language()
        queryset = self.model._default_manager.namespace(self.namespace).active_translations(language_code=language)
        if not getattr(self.request, "toolbar", None) or not self.request.toolbar.edit_mode_active:
            queryset = queryset.published()
        # TACC (filter out "Q&A" stories):
        # logger.info(f"ORIGINAL QUERYSET: {queryset}")
        queryset = queryset.exclude(
            # HELP: Why does this not work? (I still see the article on /news/.)
            id=311 # /news/latest-news/2023/08/30/generating-new-cyber-talent/
            # HELP: How to exclude based on property of property of an article?
            # category.id=12 # id `12`; slug "qa", name "Q&A" (in English)
        )
        # logger.info(f"FILTERED QUERYSET: {queryset}")
        # /TACC
        setattr(self.request, get_setting("CURRENT_NAMESPACE"), self.config)
        return self.optimize(queryset.on_site())

def patch_blog_list():
    cms_blog_views.BaseBlogListView = OurBlogListView