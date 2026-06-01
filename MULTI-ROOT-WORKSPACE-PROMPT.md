# Multi-root workspace prompt (Research / Software CMS pages)

Copy this into the new multi-root workspace chat.

---

## Context

We are shipping **manual Django CMS pages** for TACC **Research & Software projects** (unified listing + separate Past Projects + individual detail pages). Spec: **tup-ui [`GOAL.md`](GOAL.md)** (read first).

**Not in scope:** React/JSON tables in tup-ui, portal `ProjectsTable`, HPC Software List (`SoftwareTable`), CMS plugins / staff_profile-style data entry.

**Architecture:** Progressive enhancement only—editors build HTML; **Core-CMS** provides JS; **Core-Styles** provides CSS; **tup-ui** holds a Phase B Django CMS snippet with jsDelivr pins until upstream releases land.

---

## Workspace roots

- **tup-ui** — snippet, staging copies, GOAL
- **Core-CMS** — `site_cms/js/modules/`, templates, Docker image
- **Core-Styles** — bootstrap4 bridge CSS, objects, dist/npm release

---

## Editor contract

**Listing table:** `table.o-fixed-header-table.o-sortable-table`; Description column `th.is-not-sortable`; columns Name, Description, Umbrella, Topic; default sort Name A→Z (client-side).

**Archive detail pages:** Bootstrap 4 **Alert** plugin + extra classes:  
`c-message c-message--scope-section c-message--type-warning`  
(no JS to infer types—editors must set full `c-message` classes).

---

## Already staged in tup-ui (upstream these)

| Work | tup-ui location | Upstream target |
|------|-----------------|-----------------|
| Sortable table JS | `apps/tup-cms/src/taccsite_cms/static/site_cms/js/modules/sortableTable.js` | Core-CMS same path |
| Sortable table CSS | `apps/tup-cms/src/taccsite_custom/tup_cms/static/tup_cms/css/for-core-styles/objects/o-sortable-table.css` | Core-Styles `objects/o-sortable-table.css` (+ pattern lib if needed) |
| Bootstrap alert → c-message | `core-styles-staging/src/lib/_imports/bootstrap4/components/alert.css` and `alert/` | Core-Styles same paths (mirror **btn.css** / **btn/**) |
| Phase B snippet | `apps/tup-cms/src/taccsite_cms/templates/snippets/research-projects-assets.html` | Register in CMS admin; update CDN pins after releases |

**Deleted / do not reintroduce:** `bootstrapAlertAsCMessage.js` or any JS that maps Bootstrap alert types to `c-message--type-*`.

**Do not** import alert or sortable CSS via `tup-cms.for-tup-cms.css`.

---

## Your tasks (in order)

1. **Core-Styles PR**
   - Copy `core-styles-staging/.../bootstrap4/components/alert*` into Core-Styles; wire into bootstrap4 CMS build like `btn.css`.
   - Add `objects/o-sortable-table.css` from tup-ui staging; wire into dist.
   - Release npm `@tacc/core-styles`; confirm dist paths:
     - `dist/bootstrap4/components/alert.css`
     - `dist/objects/o-sortable-table.css`

2. **Core-CMS PR**
   - Add `sortableTable.js` from tup-ui (vanilla; `table.o-sortable-table`; skip `th.is-not-sortable`).
   - Bump Core-Styles version in build/Docker as repo convention requires.
   - **Later (not blocking v1):** call `sortableTable({ scopeElement: document.getElementById('cms-content') })` in `assets_core_delayed.html` like `updateEmailLinkHrefs`.

3. **tup-ui PR**
   - Update `research-projects-assets.html` jsDelivr pins to `gh/TACC/Core-Styles@<tag>/dist/...` (no npm publish required).
     - Drop per-page sort script when tup CMS image includes Core-CMS `assets_core_delayed` sortableTable init.
     - Do not bundle with tup-ui v4.40.0 / PR 557 CMS bump.
   - Trim redundant staging after upstream tags are live.

4. **Content (human/CMS):** Create listing + Past Projects + detail pages manually; add snippet on pages that need sortable table / alert styling.

---

## Snippet behavior today

`research-projects-assets.html` loads (jsDelivr gh commit pins):

- `gh/TACC/Core-Styles@31e62d5/dist/objects/o-sortable-table.css`
- `gh/TACC/Core-Styles@31e62d5/dist/bootstrap4/components/alert.css`
- `gh/TACC/Core-CMS@1fe2544/taccsite_cms/static/site_cms/js/modules/sortableTable.js`

---

## References

- Core-Styles alert pattern: [btn.css](https://github.com/TACC/Core-Styles/blob/main/src/lib/_imports/bootstrap4/components/btn.css), [Bootstrap 4.6 alerts](https://getbootstrap.com/docs/4.6/components/alerts/)
- c-message: `c-message c-message--scope-section c-message--type-warning`
- Core-CMS delayed assets: `taccsite_cms/templates/assets_core_delayed.html`

Follow each repo’s commit/PR conventions. Ask before expanding scope beyond manual CMS pages + sortable table + alert/c-message CSS bridge.
