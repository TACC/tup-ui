# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.1] - 2022-05-26: Version Rewrite

### Changed

- chore(version): v3.0→v0.5 & publish instructions (#28)

## [0.5.0] - 2022-05-25: Simpler CLI API, Fixes, Updates, Cleanup

### Added

- FP-1648: Build Individual Stylesheets — ⚠️ API Change (#23)

### Changed

- feat(tup-151): offset content less offset (#21)
- FP-1648: Build Individual Stylesheets — ⚠️ API Change (#23)
- feat(fp-1491): c-button updates from portal & use x-truncate (#20)

### Fixed

- fix(x-truncate): typo kills x-truncate--one-line (#22)
- fix(FP-1596): pagination @import used external url
- fix(fp-1542): figure img margin for link img's too (#25)

### Deleted

- chore(gitignore): remove outdated file

## [0.4.0] - 2022-05-11: Return Some CMS Styles, Many New Patterns

### Added

- feat(branding): new class .branding-logo--short (#4)
- feat(search): input placeholder matches bkgd (310e969)
- feat(fp-1596): pagination component (b9e2eca, #5)
- feat(fp-1491): button component (c1bd33f / #6)
- feat(postcss): custom selectors (847d0e2)
- feat(ecep-114): tweak typography (#14)
- feat(ecep-113): article link mixin new features (#15)
- feat: nav component (#12)
- feat(ecep-114): position sticky support on CMS (#13)
- feat(ecep-113): style news & related patterns (#16)
- feat(fp-1378): add new space prop --section-gap (#10)
- feat(object): o-flex-item-table-wrap (Core-Portal) (#18)

### Changed

- fix: no depress UX for links (53a3a6c)
- docs(readme): updates [learned from active use of repo] (69bf862)
- chore(github): add pull request template (6037687)
- docs(markup): c-image-map (b8ed629)

### Fixed

- fix(tup-231): move some core-styles back to core-cms (#17)

## Deleted

- chore(gh-149): remove deleted id selector (#7)

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

- Quick: Stable Package.json Calls … (#3)
- Fix: Require NPM7+ … (37466e2)
- chore(version): del & ignore runtime _version.css (dab87e7)
- fix(refactor): config script (1d6dacd)

## [0.2.0] - 2022-03-14: Changelog, Easy Git Ref, Version CLI, Readme Tweak

### Added

- Quick: Add Changelog (449a045, e49b7c6)
- Version CLI (#2) — Split build CLI into two commands `build` and `version`.

### Changed

- Quick: Readme intro tweak (b67fd0e)
- Version CLI (#2) — require `build` command to build (`core-styles build ...`).

### Fixed

- Fix/Polish: [...] Git Ref/Rev/Version [Script] (85347a1, …, e1c85ae, 9ca6af0)

## [0.1.0] - 2022-03-11

Initial working code. (This code may not work on all environments.)

[unreleased]: https://github.com/TACC/Core-Styles/compare/v0.5.1...HEAD
[0.5.1]: https://github.com/TACC/Core-Styles/releases/tag/v0.5.1
[0.5.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.5.0
[0.4.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.4.0
[0.3.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.3.0
[0.2.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.2.0
[0.1.0]: https://github.com/TACC/Core-Styles/releases/tag/v0.1.0
