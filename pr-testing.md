## Overview

Consolidate global snippets into a few files now loaded via CDN.

## Status

- [x] **Change** [global JS snippet to load from CDN](https://tacc.utexas.edu/admin/djangocms_snippet/snippet/150/change).
- [x] **Test** that global JS.
- [x] **Add** [one global CSS snippet that loads from CDN](https://tacc.utexas.edu/admin/djangocms_snippet/snippet/167/change/).
- [x] **Document** test steps.
- [ ] **Test** _all_ that global CSS.
- [ ] **Delete** migrated snippets.

## Related

- new [snippet #167](https://tacc.utexas.edu/admin/djangocms_snippet/snippet/167/change/)
- new [snippet #168](https://tacc.utexas.edu/admin/djangocms_snippet/snippet/167/change/)

## Changes

- **Added** unsaved snippets.
- **Updated** snippets with latest content from prod.
- **Changed** CSS snippets from `.html` to `.css`
- **Moved** CSS snippets to CSS
- **Changed** JS snippets from `.html` to `.js`
- **Moved** CSS snippets to CSS

## Testing

<details><summary><code>fix-news-hr-behind-offset-image.css</code></summary>

1. Open https://tacc.utexas.edu/news/supplemental/2024/02/22/black-history-month-spotlight-cosby/.
2. See horizontal line (`<hr>`) before first instance of "WeTeach_CS/TACC".

Verify horizontal line does **not** flow behind floated image.

</details>
<details><summary><code>hide-svg-icons.css</code></summary>

0. Be logged in as an editor.
1. Open https://tacc.utexas.edu/use-tacc/allocations/?edit.

Verify giant paperclip design **is** visible.

2. Open https://tacc.utexas.edu/use-tacc/allocations/?preview.

Verify giant paperclip design is **not** visible.

</details>
<details><summary><code>trumps-has-decal.css</code></summary>

0. Be logged in as an editor.
1. Open https://tacc.utexas.edu/?edit.
2. Use your browser Developer Tools to search markup for `has-decal`.
3. Select the element that has such a class.

Verify that element **is** styled via a `.has-decal…` rule.

</details>
<details><summary><code>spacing-fixes.css</code></summary>

1. Open https://tacc.utexas.edu/use-tacc/allocations/.
2. Scroll toward "TACC's Acceptable Use Policies".

Verify **much** space above the gray cards (`60px` not `20px`).

</details>
<details><summary><code>podcast-embeds.css</code></summary>

1. Open https://tacc.utexas.edu/news/latest-news/2025/06/05/How-Public-Investment-in-HPC-Sparked-AI-Boom/.
2. Scroll to the embedded podcast.

Verify the podcast player does **not** have a scrollbar.

</details>
<details><summary><code>scrolling-fixes.css</code></summary>

1. Open https://tacc.utexas.edu/.
2. Ensure browser window width is **`<`** 1500px and **`>`** 290px.

Verify page does **not** have a _horizontal_ scrollbar.

</details>
<details><summary><code>global-a11y.css</code></summary>

1. Open any TACC page e.g. https://tacc.utexas.edu/.
2. Click empty black space left of UTexas logo.
3. Cycle focus through header elements.
    <sup>(I.e. Press <kbd>tab</kbd> key several times.)</sub>

Verify highlight on focused element is **thick white outline**.

4. Make window narrow enough to trigger mobile navbar.

Verify menu toggle icon has a **thin gray border**.

</details>
<details><summary><code>tup-730-drop-cap-and-fix-has-blog-tag-no-drop-cap.css</code></summary>

Nothing to test. This code is commented out.

</details>
<details><summary><code>c-feed-list-tweaks.css</code></summary>

> [!NOTE]
> I don't know what this does. Whether it works will be irrellevant after #115.

1. Open https://tacc.utexas.edu/#training-events.
2. Use your browser Developer Tools.
3. Select any `<article>` within the "Training Events" list.

Verify `flex-grow: unset;` is applied.

</details>
<details><summary><code>navbar-width-horz-scrollbar.css</code></summary>

0. Be logged in to Portal.
1. Open https://tacc.utexas.edu/.
2. Ensure browser window width is **`<`** 1130px and **`>`** 992px.

Verify header does **not** show username.

3. Make browser window width **`>`** 1130px.

Verify header **does** show username.

</details>
<details><summary><code>tagged-news-uppercase-tag.css</code></summary>

1. Open https://tacc.utexas.edu/news/latest-news/tag/lccf/.

Verify page title is "**LATEST NEWS — LCCF**" (not "LATEST NEWS — Lccf")

</details>
<details><summary><code>prevent-ugly-urls.js</code></summary>

0. Turn off ad/tracking/fingerprint/etc blockers.
1. Open [tacc.utexas.edu](http://tacc.utexas.edu/).
2. In page nav, click "Use TACC" > "Documentation".

Verify URL does **not** have a string of query parameters.

3. Scroll to footer.
4. Under Quick Links, click "Create an Account".

Verify URL does **not** have a string of query parameters.

</details>

## UI

…
