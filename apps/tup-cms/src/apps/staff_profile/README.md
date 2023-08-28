# Staff Profile

This app creates a CMS plugin that renders a layout of content for a staff profile.

## Usage

1. Add instance of plugin to a page.
2. Within it, fill out all required fields.
3. Verify plugin:
   - renders all text your provide it
   - renders an image (the one you provide it, or a default image)

### Known Issues

1. The link 📎 button does **not** work. Console error.
2. The WYSIWYG fields do **not** automatically wrap text in `<p>` tag. (One must press enter.) [TUP-566]
3. Every one profile created seems to create two (see `/admin/staff_profile/staffprofileplugin/`).

[tup-566]: https://jira.tacc.utexas.edu/browse/TUP-566
