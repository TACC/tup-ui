# Research / Software project pages

Manual CMS pages: one unified **Projects (Research & Software)** listing, a separate **Past Projects** page, and individual project detail pages (same URL pattern whether archived or not).

## Table (listing)

Editors build a normal HTML table with four columns: Name, Description, Umbrella, Topic/Category/Field. Contact and funding live on detail pages only.

**Classes**

- Table: `o-fixed-header-table o-sortable-table` (wrap in `o-table-wrap` if needed).
- Non-sortable Description column: `th.is-not-sortable`.
- Default sort: first sortable column, Name A→Z (applied by script on load).

**Assets (Phase B)**

Add Django CMS snippet **research-projects-assets** ([`research-projects-assets.html`](apps/tup-cms/src/taccsite_cms/templates/snippets/research-projects-assets.html)) once per listing page (and on detail pages that use the archive alert, until site CSS includes alert bridge).

Snippet loads via [jsDelivr](https://www.jsdelivr.com/):

| Asset | Source (interim → target) |
|-------|-------------------------|
| Sortable table JS | [Core-CMS](https://github.com/TACC/Core-CMS) `site_cms/js/modules/sortableTable.js` — staged in [tup-ui `apps/tup-cms/.../modules/`](apps/tup-cms/src/taccsite_cms/static/site_cms/js/modules/) until upstream tag |
| Sortable table CSS | Core-Styles `objects/o-sortable-table` — staged in [`for-core-styles/objects/`](apps/tup-cms/src/taccsite_custom/tup_cms/static/tup_cms/css/for-core-styles/objects/o-sortable-table.css) until upstream release |
| Bootstrap alert + c-message CSS | Core-Styles `dist/bootstrap4/components/alert.css` via jsDelivr `gh/TACC/Core-Styles@<tag>` (source in [`core-styles-staging/`](core-styles-staging/) until tag; not wired through `tup-cms.for-tup-cms.css`) |

Pin commit/tag refs in the snippet after each merge. Later: init JS in Core-CMS [`assets_core_delayed.html`](https://github.com/TACC/Core-CMS/blob/main/taccsite_cms/templates/assets_core_delayed.html) and drop the per-page snippet when ready.

## Archive banner (detail pages)

Use the **Bootstrap 4 Alert** plugin ([Bootstrap 4.6 alerts](https://getbootstrap.com/docs/4.6/components/alerts/)). In the plugin’s extra **Classes** field, add:

`c-message c-message--scope-section c-message--type-warning`

**Styles:** Core-Styles `bootstrap4/components/alert.css` (pattern library under [`core-styles-staging/.../alert/`](core-styles-staging/src/lib/_imports/bootstrap4/components/alert/)) imports `c-message` and undoes Bootstrap alert chrome when `.c-message` is on the same node—same approach as [`bootstrap4/components/btn.css`](https://github.com/TACC/Core-Styles/blob/main/src/lib/_imports/bootstrap4/components/btn.css). Editors must add full `c-message` classes (including `--type-*`) in the Alert plugin **Classes** field.

## Out of scope

- CMS plugins / form-driven data entry (staff_profile-style).
- JSON or React table components in tup-ui.
- HPC **Software List** (`SoftwareTable` on `/use-tacc/software-list/`).

## Multi-repo workflow

Open a **multi-root workspace** with tup-ui, Core-CMS, and Core-Styles. Copy staging files from this repo into upstream paths, open PRs, release Core-Styles, bump Core-CMS Docker/static, then update snippet CDN pins.

## Upstream PR checklist

1. **Core-Styles:** `bootstrap4/components/alert.css` + `alert/` from [`core-styles-staging/`](core-styles-staging/); `objects/o-sortable-table` from tup-ui staging; release.
2. **Core-CMS:** JS modules from [`apps/tup-cms/src/taccsite_cms/static/site_cms/js/modules/`](apps/tup-cms/src/taccsite_cms/static/site_cms/js/modules/); bump Core-Styles; optional global init in `assets_core_delayed.html`.
3. **tup-ui:** update snippet pins; remove redundant staging copies when upstream tags are live.
