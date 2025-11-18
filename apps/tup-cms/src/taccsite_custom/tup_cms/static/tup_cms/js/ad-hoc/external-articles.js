import {
  changeHowExternalArticleOpens,
  redirectExternalArticle
} from 'https://cdn.jsdelivr.net/gh/TACC/Core-CMS@344c33c/taccsite_cms/static/site_cms/js/modules/manageExternalArticles.js';

const isNewsArticle = document.querySelectorAll('.app-blog .post-detail').length;
const isNewsList = document.querySelectorAll('.app-blog .blog-list').length;

if (isNewsList) changeHowExternalArticleOpens();
if (isNewsArticle) redirectExternalArticle();
