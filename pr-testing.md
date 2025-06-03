…

## Testing

- Verify `<hr>` on https://tacc.utexas.edu/news/supplemental/2024/02/22/black-history-month-spotlight-cosby/ does not flow behind floated image.

- Load homepage without ad/tracking/fingerprint/etc blockers. Scroll to footer. Hover over "Request an Account" button/link. Hover off. Hover back over. See markup (or browser tooltip for URL, at bottom-left of window) and verify link `href` has long query parameter added to it. _Refresh page and keep trying until it does._ Click on button/link; new window opens. Return to TACC homepage in previous window. Verify link `href` now does **not** have long query parameter.

…
