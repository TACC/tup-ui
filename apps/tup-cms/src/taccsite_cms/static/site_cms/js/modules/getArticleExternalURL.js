/**
 * Get URL of external web article of which internal news article represents
 * @param {HTMLElement} article - The article within which to find external URL
 * @return {string|null} - The URL of the external article
 */
export default function getArticleExternalURL( article ) {
  if ( ! article ) {
    console.warn('No article found', article );
    return;
  }

  // News admin states only one external link should be in article abstract
  const contentLink = article.querySelector('.blog-lead a[href^="http"]');
  const isExternalLink = ( contentLink.hostname !== window.location.hostname );
  const URL = ( isExternalLink ) ? contentLink.href : null;

  return URL;
}
