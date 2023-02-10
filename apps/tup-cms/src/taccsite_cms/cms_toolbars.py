# https://github.com/nephila/djangocms-blog/blob/1.1.1/djangocms_blog/cms_toolbars.py
# https://docs.django-cms.org/en/release-3.7.x/how_to/toolbar.html#modifying-an-existing-toolbar
import logging

from cms.toolbar_pool import toolbar_pool
from djangocms_blog.cms_toolbars import BlogToolbar

logger = logging.getLogger(f"portal.{__name__}")

def can_publish(user):
    for group in user.groups.all():
        logger.debug('group:')
        logger.debug(group)
        if group.name in ['News Writer (Advanced)']:
            return True
    return False

@toolbar_pool.register
class TaccBlogToolbar(BlogToolbar):
    def populate(self):
      super().populate()

    def add_publish_button(self):
      """
      Adds the publish button to the toolbar, like parent, unless user is writer
      """
      has_permission = can_publish(self.request.user)
      logger.debug('has_permission:')
      logger.debug(has_permission)
      if (not has_permission):
          super().add_publish_button()

    def post_template_populate(self):
      super().post_template_populate()

toolbar_pool.unregister(BlogToolbar)
