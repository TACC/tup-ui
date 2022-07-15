# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.0] - 2022-07-15: New Global Color, Fix Section Banner on Safari

### Change

- release [0.7.0-beta] as [0.7.0]

## [0.7.0-beta] - 2022-07-13: New Global Color, Fix Section Banner on Safari

### Added

- feat(core-styles): tup-308, new global color #25

### Change

- feat(core-styles): add `.npmrc` with `git-tag-version=false`
- feat(core-styles): add git tagging to publish steps in readme

### Fixed

- fix(core-styles): fp-1723 fix o-section--banner on safari #29

## [0.6.0] - 2022-07-06: Fix CMS v3.7.0 Bugs, Button Style Updates

- [0.6.0-beta.3]
- [0.6.0-beta.2]
- [0.6.0-beta.1]

## [0.6.0-beta.3] - 2022-06-28: Fix/Consistent Space Above CMS Footer

### Fixed

- chore: <main>, margin not pad. & accurate selector
- feat: drop .o-site for simple sticky footer trick
- fix: hide extra space, last light section ↔ footer

## [0.6.0-beta.2] - 2022-06-27: Prevent Section Banner Overflow

### Fixed

- fix(core-styles): fp-1666, section banner overflow

## [0.6.0-beta.1] - 2022-06-24: Do Not Let Figure CSS Bleed into Other Patterns

### Fixed

- fix(core-styles): no figure css, only .figure css
- fix(core-styles): remove unwanted sample html css

## [0.6.0-beta] - 2022-06-08: Linting, Button Updates, package-lock.json

### Added

- (feat) add style lint (minimal ruleset)

### Changed

- (fix) lint/update: markdown, yaml, js, html
- (fix) readme "Build Script" example code
- (chore) update package-lock.json
- (feat) update button styles (https://github.com/TACC/Core-Portal/pull/654)
- (docs) combine versioning steps to just `npm version ...`

## [0.6.0-alpha.2] - 2022-06-03: Fix Alpha Bugs

### Changed

- fix(core-styles): add missing file to package

## [0.6.0-alpha.1] - 2022-06-03: Allow Build from Root, New Publish Process

### Changed

- feat(core-styles): root build includes local build
- feat(core-styles): publish process & remove dist/

## [0.6.0-alpha] - 2022-06-01: Migrate to Monorepo

### Changed

- refactor: moved to https://github.com/TACC/tup-ui:/libs/core-styles
- refactor!: moved `/source` to `/src/lib`
- feat: support TypeScript and Jest

## [0.5.1] - 2022-05-26: Version Rewrite

### Changed

- chore(version): v3.0→v0.5 & publish instructions (https://github.com/TACC/Core-Styles/pull/28)

## [0.5.0] - 2022-05-25: Simpler CLI API, Fixes, Updates, Cleanup

### Added

- FP-1648: Build Individual Stylesheets — ⚠️ API Change (https://github.com/TACC/Core-Styles/pull/23)

### Changed

- feat(tup-151): offset content less offset (https://github.com/TACC/Core-Styles/pull/21)
- FP-1648: Build Individual Stylesheets — ⚠️ API Change (https://github.com/TACC/Core-Styles/pull/23)
- feat(fp-1491): c-button updates from portal & use x-truncate (https://github.com/TACC/Core-Styles/pull/20)

### Fixed

- fix(x-truncate): typo kills x-truncate--one-line (https://github.com/TACC/Core-Styles/pull/22)
- fix(FP-1596): pagination @import used external url
- fix(fp-1542): figure img margin for link img's too (https://github.com/TACC/Core-Styles/pull/25)

### Deleted

- chore(gitignore): remove outdated file

## [0.4.0] - 2022-05-11: Return Some CMS Styles, Many New Patterns

### Added

- feat(branding): new class .branding-logo--short (https://github.com/TACC/Core-Styles/pull/4)
- feat(search): input placeholder matches bkgd (310e969)
- feat(fp-1596): pagination component (b9e2eca, #5)
- feat(fp-1491): button component (c1bd33f / #6)
- feat(postcss): custom selectors (847d0e2)
- feat(ecep-114): tweak typography (https://github.com/TACC/Core-Styles/pull/14)
- feat(ecep-113): article link mixin new features (https://github.com/TACC/Core-Styles/pull/15)
- feat: nav component (https://github.com/TACC/Core-Styles/pull/12)
- feat(ecep-114): position sticky support on CMS (https://github.com/TACC/Core-Styles/pull/13)
- feat(ecep-113): style news & related patterns (https://github.com/TACC/Core-Styles/pull/16)
- feat(fp-1378): add new space prop --section-gap (https://github.com/TACC/Core-Styles/pull/10)
- feat(object): o-flex-item-table-wrap (Core-Portal) (https://github.com/TACC/Core-Styles/pull/18)

### Changed

- fix: no depress UX for links (53a3a6c)
- docs(readme): updates [learned from active use of repo] (69bf862)
- chore(github): add pull request template (6037687)
- docs(markup): c-image-map (b8ed629)

### Fixed

- fix(tup-231): move some core-styles back to core-cms (https://github.com/TACC/Core-Styles/pull/17)

## Deleted

- chore(gh-149): remove deleted id selector (https://github.com/TACC/Core-Styles/pull/7)

## [0.3.0] - 2022-04-06: Initial Release

### Added

- feat(version): do not depend on git describe (398bf79)
- feat(version): … use postcss-banner plugin (58858f9, eeafce0)

### Changed

- Quick: Readme tweaks (5d2d82c, f627bbd, 93dd9cd)
- chore(cleanup): drop yarn, node 16 (92664db)
- refactor(minor): simpler npm scripts (d7b36ba, 214aa80)
- chore: do not support verbose option (9c8018a)
- chore(rename): tacc-wbomar → TACC (95d82d9)

### Fixed

- Quick: Stable Package.json Calls … (https://github.com/TACC/Core-Styles/pull/3)
- Fix: Require NPM7+ … (37466e2)
- chore(version): del & ignore runtime \_version.css (dab87e7)
- fix(refactor): config script (1d6dacd)

## [0.2.0] - 2022-03-14: Changelog, Easy Git Ref, Version CLI, Readme Tweak

### Added

- Quick: Add Changelog (449a045, e49b7c6)
- Version CLI (https://github.com/TACC/Core-Styles/pull/2) — Split build CLI into two commands `build` and `version`.

### Changed

- Quick: Readme intro tweak (b67fd0e)
- Version CLI (https://github.com/TACC/Core-Styles/pull/2) — require `build` command to build (`core-styles build ...`).

### Fixed

- Fix/Polish: [...] Git Ref/Rev/Version [Script] (85347a1, …, e1c85ae, 9ca6af0)

## [0.1.0] - 2022-03-11

Initial working code. (This code may not work on all environments.)

[unreleased]: https://github.com/TACC/tup-ui/compare/core-styles-v0.7.0...HEAD
[0.7.0]: https://github.com/TACC/Core-Styles/releases/tag/core-styles-v0.7.0
[0.7.0-beta]: https://github.com/TACC/Core-Styles/releases/tag/core-styles-v0.7.0-beta
[0.6.0]: https://github.com/TACC/Core-Styles/releases/tag/core-styles-v0.6.0
[0.6.0-beta.3]: https://github.com/TACC/Core-Styles/releases/tag/core-styles-v0.6.0-beta.3
[0.6.0-beta.2]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-beta.2
[0.6.0-beta.1]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-beta.1
[0.6.0-beta]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-beta
[0.6.0-alpha.2]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-alpha.2
[0.6.0-alpha.1]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-alpha.1
[0.6.0-alpha]: https://github.com/TACC/tup-ui/releases/tag/core-styles-v0.6.0-alpha
[0.5.1]: https://github.com/TACC/Core-Styles/releases/tag/v0.5.1
[0.5.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.5.0
[0.4.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.4.0
[0.3.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.3.0
[0.2.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.2.0
[0.1.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.1.0
