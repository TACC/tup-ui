# TACC Core Styles - Library - Imports

Styles here should be isolated UI patterns and be imported by other stylesheets.

## Rules

1. Files **must** be [organized appropriately](#directory-organization).
1. Files **must** be [documented appropriately](#documentation-format).
1. Files **must** follow the [style guide][tacc-style-guide].

- Styles **should** be for [structure](#structure-vs-skin) and **may** be for [skin](#structure-vs-skin).

## Directory Organization

These directories are based on [ITCSS][tacc-itcss].

[tacc-itcss]: https://confluence.tacc.utexas.edu/x/IAA9Cw

## Documentation Format

```css
/*
Styles Name

Description of the purpose and use case of styles. Use the `Markup:` property to link to sample markup. The documentation format is [KSS Node](https://github.com/kss-node/kss-node/blob/master/README.md).

Markup: x-stylesheet-name.html

Styleguide __StylesSection__.__StylesName__
*/

.some-selector {
  text-transform: none;
}
```

## Style Guide

See [TACC: CSS Style Guide][tacc-style-guide].

## Structure vs. Skin

- Most Core styles will be _only **or** mostly_ for [structure][tacc-oocss].
- Some core styles may be [skin][tacc-oocss].

[tacc-oocss]: https://confluence.tacc.utexas.edu/x/VwALBg 'TACC: Object-Oriented CSS'
[tacc-style-guide]: https://confluence.tacc.utexas.edu/x/ZQALBg 'TACC: CSS Style Guide'
