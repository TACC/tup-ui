# https://github.com/nephila/djangocms-blog/blob/1.1.1/djangocms_blog/cms_toolbars.py
# https://docs.django-cms.org/en/release-3.7.x/how_to/toolbar.html#modifying-an-existing-toolbar
import logging

from cms.toolbar_pool import toolbar_pool
from djangocms_blog.cms_toolbars import BlogToolbar

logger = logging.getLogger(f"portal.{__name__}")

def should_add_publish_button(user):
    '''
    Whether to permit parent class to run add_publish_button()

    FAQ: TACC (CMD) does not want certain groups to publish
    '''
    for group in user.groups.all():
        if group.name in ['News Writer (Advanced)']:
            return False
    return True

@toolbar_pool.register
class TaccBlogToolbar(BlogToolbar):
    def add_publish_button(self):
      # """
      # Adds the publish button to the toolbar, like parent, unless user is writer
      # """
      should_add = should_add_publish_button(self.request.user)
      if (should_add):
          super().add_publish_button()

toolbar_pool.unregister(BlogToolbar)
