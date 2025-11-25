import {
  changeHowExternalArticleOpens,
  redirectExternalArticle,
} from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@dd7a5ee/taccsite_cms/static/site_cms/js/modules/manageExternalArticles.js';

/* https://github.com/TACC/Core-CMS/blob/v4.35.13/taccsite_cms/static/site_cms/css/src/_imports/components/django.cms.blog.selectors.css#L6-L7 */
const isNewsArticle = document.querySelectorAll(
  '.app-blog article.post-detail'
).length;
const isNewsList = document.querySelectorAll('.app-blog .blog-list').length;

if (isNewsList) changeHowExternalArticleOpens();
if (isNewsArticle) redirectExternalArticle();
