# Research / Software project pages

Manual CMS pages: one unified **Projects (Research & Software)** listing, a separate **Past Projects** page, and individual project detail pages (same URL pattern whether archived or not).

## Table (listing)

Editors build a normal HTML table with four columns: Name, Description, Umbrella, Topic/Category/Field. Contact and funding live on detail pages only.

**Classes**

- Table: `o-fixed-header-table is-sortable` (wrap in `o-table-wrap` if needed).
- Non-sortable Description column: `th.is-not-sortable`.
- Default sort: first sortable column, Name A→Z (applied by script on load).

**Assets (Phase B)**

Add Django CMS snippet **research-projects-assets** ([`research-projects-assets.html`](apps/tup-cms/src/taccsite_cms/templates/snippets/research-projects-assets.html)) once per listing page (and on detail pages that use the archive alert, until site CSS includes alert bridge).

Snippet loads via [jsDelivr](https://www.jsdelivr.com/):

| Asset | jsDelivr (snippet pins) |
|-------|-------------------------|
| Sortable table CSS + JS | Core-CMS `site_cms/css/modules/sortableTable.css` and `.../js/modules/sortableTable.js` (load both; see module README) |
| Bootstrap alert + c-message CSS | `gh/TACC/Core-Styles@31e62d5/dist/bootstrap4/components/alert.css` |

Bump commit SHAs in the snippet after upstream PR merges. Later: drop snippet JS when tup CMS uses Core-CMS [`assets_core_delayed.html`](https://github.com/TACC/Core-CMS/blob/main/taccsite_cms/templates/assets_core_delayed.html) sort init.

## Archive banner (detail pages)

Use the **Bootstrap 4 Alert** plugin ([Bootstrap 4.6 alerts](https://getbootstrap.com/docs/4.6/components/alerts/)). In the plugin’s extra **Classes** field, add:

`c-message c-message--scope-section c-message--type-warning`

**Styles:** Core-Styles `bootstrap4/components/alert.css` (see [Core-Styles alert pattern](https://github.com/TACC/Core-Styles/tree/main/src/lib/_imports/bootstrap4/components/alert)) imports `c-message` and undoes Bootstrap alert chrome when `.c-message` is on the same node. Editors must add full `c-message` classes (including `--type-*`) in the Alert plugin **Classes** field.

## Out of scope

- CMS plugins / form-driven data entry (staff_profile-style).
- JSON or React table components in tup-ui.
- HPC **Software List** (`SoftwareTable` on `/use-tacc/software-list/`).

## Multi-repo workflow

Open a **multi-root workspace** with tup-ui, Core-CMS, and Core-Styles when changing upstream assets or snippet CDN pins.

## Upstream PR checklist

1. **Core-Styles:** alert bridge (PR merged → bump snippet commit SHA if needed).
2. **Core-CMS:** `sortableTable.css` + `sortableTable.js` + delayed init (PR merged → bump snippet SHAs; later drop snippet assets when tup CMS image includes them).
3. **tup-ui:** snippet + GOAL only; assets via jsDelivr, not copied into this repo.
