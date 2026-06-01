# Core-Styles upstream staging

Copy these paths into [TACC/Core-Styles](https://github.com/TACC/Core-Styles) when opening PRs from a multi-root workspace.

| Staging path | Upstream path |
|--------------|---------------|
| `src/lib/_imports/bootstrap4/components/alert.css` | same |
| `src/lib/_imports/bootstrap4/components/alert/` | same |

Follow existing [btn](https://github.com/TACC/Core-Styles/tree/main/src/lib/_imports/bootstrap4/components/btn) pattern: component CSS imports TACC styles and undoes Bootstrap defaults.

After merge and release, CMS sites pick up `alert.css` via the Core-Styles CMS/bootstrap4 build (same as `btn.css`). No tup-ui `tup-cms.for-tup-cms.css` import.

Sortable table CSS remains staged under [`apps/tup-cms/src/taccsite_custom/tup_cms/static/tup_cms/css/for-core-styles/objects/o-sortable-table.css`](../apps/tup-cms/src/taccsite_custom/tup_cms/static/tup_cms/css/for-core-styles/objects/o-sortable-table.css) until an `objects/o-sortable-table` PR lands in Core-Styles.
