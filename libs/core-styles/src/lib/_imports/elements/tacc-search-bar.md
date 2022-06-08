# TACC - Stylesheets - Search Bar

The search bar (as implemented in TACC/Core-CMS) _currently_ has a caveat (that will be resolved via TACC/Core-CMS#101).

Certain styles need to load **before** all search bar styles and markup:

```css
:host {
  visibility: hidden;
  height: 0;
}
```

Certain styles need to load **after** all search bar styles and markup:

```css
:host {
  visibility: visible;
  height: auto;
}
```

This avoids [FOUC] by hiding the search bar _until_ all styles and markup are loaded.

[tacc/core-cms#101]: https://github.com/TACC/Core-CMS/issues/101
[fouc]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content
