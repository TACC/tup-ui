# TACC Styles - Imports

These project stylesheets should:

1. be imported by global or component stylesheet(s)
2. follow [ITCSS organization](https://confluence.tacc.utexas.edu/x/IAA9Cw) and [CSS style guide](https://confluence.tacc.utexas.edu/x/ZQALBg)

## Usage Options

### Import from Global Stylesheets

Global stylesheets may `@import` project stylesheets, e.g.:

**`index.css`**

```
@import url('@tacc/core-styles/src/libs/_imports/settings/color.css');
```

### Import from Component Stylesheets

Component stylesheets may `@import` project stylesheets, e.g.:

**`components/(.../)SomeProjectComponent.module.css`**

```
@import url('@tacc/core-styles/src/libs/_imports/tools/media-queries.css');

@media screen and (--short-and-above) and (--medium-and-above) {
  selector {
    project: 'styles';
  }
}
```

### Author atop Core Styles

Project stylesheets may `@import`—then append to—[Core-Styles], e.g.:

**`styles/(.../)some-project-stylesheet.css`**

```
@import url('@tacc/core-styles/.../settings/color.css');

:root {
  --project: 'value';
}
```

Project stylesheets may `@extend` [Core-Styles], e.g.:

**`styles/(.../)some-project-stylesheet.css`**

```
@import url('@tacc/core-styles/.../tools/x-truncate.css');

selector {
  @extend .x-truncate--one-line;

  project: 'styles';
}
```

### Or Do Not Use At All

Global stylesheets may directly `@import` [Core-Styles], e.g.:

**`index.css`**

```
@import url('@tacc/core-styles/.../settings/border.css');
```

Component stylesheets may directly `compose…` from [Core-Styles], e.g.:

**`components/(.../)SomeProjectComponent.module.css`**

```
selector {
  composes: x-truncate--many-lines from '@tacc/core-styles/.../tools/x-truncate.css';
}
```
