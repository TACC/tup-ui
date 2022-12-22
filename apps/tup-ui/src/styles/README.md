# TUP UI - Styles

## Table of Contents

- [How to Style](#how-to-style)
- [Component Styles](#component-styles)
- [Browse Core Styles](#browse-core-styles)
- [Use Core Styles](#use-core-styles)
- [Create Core Styles](#create-core-styles)
- [Use Global Project Styles](#use-global-project-styles)
- [Create Global Project Styles](#create-global-project-styles)

## How to Style

1. **Avoid** Global Project styles.
2. Do use and create [Component Styles](#component-styles).
3. Do use and create [Core Styles].
4. Do follow our [CSS Style Guide].

## Component Styles

- ✓ [Module](#module) — always start here
- ⚠ [Global](#global) — only as necessary

### Module

`.../SomeComponent.tsx`

```tsx
import styles from './SomeComponent.module.css';

/* ... */

<table className={styles.root}>{/* ... */}</table>;
```

`.../SomeComponent.module.css`

```tsx
.root {
  /* ... */
}
```

### Global

`.../SomeComponent.tsx`

```tsx
import './SomeComponent.global.css';
```

`.../SomeComponent.global.css`

```tsx
.some_class_external_to_component_markup {
  /* ... */
}
```

## Browse [Core Styles]

| Environment | URL                                                  |
| ----------- | ---------------------------------------------------- |
| Local*      | http://localhost:8000/static/ui/index.html           |
| Remote*     | https://dev.tup.tacc.utexas.edu/static/ui/index.html |
| Source†     | https://github.com/TACC/Core-Styles/tree/main/src/lib/_imports |

<sub>* Incomplete, but each is documented with test case examples.</sub>\
<sub>† Complete, but expects knowledge of [ITCSS](https://confluence.tacc.utexas.edu/x/IAA9Cw).</sub>

## Use [Core Styles]

If the [Core Styles] you need is not available globally, evaluate these options:

### In Component Markup, Use [Core Styles] Classes

**`.../SomeComponent.tsx`**

```tsx
<table className="o-fixed-header-table">{/* ... */}</table>
```

### In Component Styles, Import from [Core Styles]

**`.../SomeComponent.module.css`**

```css
@import url('@tacc/core-styles/.../tools/media-queries.css');

@media screen and (--short-and-above) and (--medium-and-above) {
  selector {
    project: 'styles';
  }
}
```

### In Component Styles, Compose from [Core Styles]

**`.../SomeComponent.module.css`**

```css
selector {
  composes: x-truncate--many-lines from '@tacc/core-styles/.../tools/x-truncate.css';
}
```

## Create [Core Styles]

1. Clone [Core Styles].
2. Develop component.
3. Request review.\*

<sub>\* You might need to request repository access.</sub>

## Use Global Project Styles

### In `main.css`, Import from Global Project Styles

**`/main.css`**

```css
@import url('@tacc/core-styles/.../components/something-not-already-available-globally.css');
```

<sub>\* The file may not exist, because no global project styles exist.</sub>

## Create Global Project Styles

If you need global styles, then evaluate these options.

### In Global Styles, Append to [Core Styles]

**`/styles/(.../)global-stylesheet.css`**

```css
:root {
  /* To overwrite @tacc/core-styles/.../settings/color.css */
  --some-global-prop: 'value';
}
```

### In Global Project Styles, Extend from [Core Styles]

**`/styles/(.../)global-stylesheet.css`**

```css
@import url('@tacc/core-styles/.../tools/x-truncate.css');

selector {
  @extend .x-truncate--one-line;

  project: 'styles';
}
```

### In Global Project Styles, Import from [Core Styles]

**`/main.css`**

```css
@import url('@tacc/core-styles/.../components/something-not-already-available-globally.css');
```

[core styles]: https://github.com/TACC/Core-Styles
[css style guide]: https://confluence.tacc.utexas.edu/display/~wbomar/Shared+UI+-+CSS+-+Style+Guide
