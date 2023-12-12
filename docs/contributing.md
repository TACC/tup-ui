# Contributing

## Linting and Formatting

GitHub will run linting and formatting check.

To automatically fix what it finds, run `npx nx format:write`.

## Best Practices

- [Sign your commits.](https://help.github.com/en/github/authenticating-to-github/managing-commit-signature-verification)
- [Learn Markdown.](https://bitbucket.org/tutorials/markdowndemo)

## Development Workflow

We use a modifed version of [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).

- "feature branches" have a specific prefix:
  - `feat/` for features and updates
  - `fix/` for bugfixes and hotfixes
  - `refactor/` for large internal changes
  - `style/` for code style changes (white-space, formatting, etc.)
  - `chore/` for no-op changes
  - `docs/` for documentation
  - `perf/` for performance improvements
  - `test/` for test case updates
  - or other "types" from [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- "develop" branch is usually `main`,\
   <sup>but can exist as a long-lived multi-task branch</sup>
- "release branches" (as needed) are prefixed with `release/`
- "hotfix branches" are prefixed `fix/`
- "master branch" is always `main`

## Release Workflow

Only appointed team members may release versions.

1. Create release and tag on GitHub.

   | type        | tag format                                                                               | example                                                                              |
   | ----------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
   | release     | `vX.X.X` following [SemVer](https://semver.org/)                                         | `v1.1.3`                                                                             |
   | pre-release | `vX.X.X-YYYYMMZZ`<br /><sub>Where `ZZ` is the _number_ of pre-releases this month.</sub> | `v1.1.3-20231203`<br /><sub>Where `03` is the _third_ pre-release of December.</sub> |
