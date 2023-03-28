// TODO: Move to TACC/Core-CMS
// TODO: Try to programmatically only perform if link is a redirect
/**
 * To "disable" top-level CMS menu nav links in breadcrumbs
 * (because they all are always set to redirect to a child)
 */
const link = document.querySelector(
  '.s-breadcrumbs:is(nav) li:nth-of-type(2) a'
);
const isAppropriatePage = window.location.pathname.search('/systems/') == -1;

if (isAppropriatePage) {
  link.removeAttribute('href');
}
