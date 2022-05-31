# TACC Core Styles

The shared styles for TACC WMA Workspace Portals & Websites

> __Notice__: Currently only [Core CMS] is using these styles.


## Related Repositories

- [Core CMS], the base CMS code for TACC WMA CMS Websites


## External Project Usage

### CLI

```bash
Usage: core-styles [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  build [options]    build stylesheets with TACC standard process:
  - "post-css" plugins
  - custom input path
  - custom output path
  - custom configs
  - prepend build id

  help [command]     display help for command
```

#### Build Command

```bash
Usage: core-styles build [options]

build stylesheets with TACC standard process:
- "post-css" plugins
- custom input path
- custom output path
- custom configs
- prepend build id

Options:
  -i, --input <path>               parse source at which path¹
  -o, --output <path>              output CSS files to which path¹
  -v, --verbose                    print more info during build process
  -c, --custom-configs <paths...>  extend base config with YAML files²³
  -b, --build-id <identifier>      any value to identify the build (default: version of app)
  -m, --base-mirror-dir <path>     if input folder structure is mirrored, this path is not⁴
  -h, --help                       display help for command

Notes:
  ¹ Folder structure of "--input-dir" mirrored in "--output-dir" i.e.

    given input
    - "input_dir/x.css"
    - "input_dir/sub_dir_a/y.css"
    - "input_dir"
    - "input_dir/**/*"

    expect output
    - "output_dir/x.css"
    - "output_dir/sub_dir_a/y.css"
    - "output_dir/..." (all files from input not in sub-directories)
    - "output_dir/.../..." (all files from input as nested)

  ² The file formats are like ".postcssrc.yml" from
    https://github.com/postcss/postcss-load-config#postcssrc

  ³ The first file is merged on top of the base config.
    Each successive file overwrites the file before it.

  ⁴ Given '-i "a/b*" -o "x/" -m "a/"' output is "x/b/...".
    Given '-i "a/b*" -o "x/" -m "a/b/"' output is "x/...".
    Given '-i "a/b*" -o "x/" -m "not-a/"' output is "x/abs-path-to-input/...".
```

### Module

1. Install the package with any package manager e.g.:
  - `npm install TACC/Core-Styles`
  - `yarn add TACC/Core-Styles`

2. Import stylesheets of either type:
    - pre-compiled, from `/dist`
    - source files, from `/src/lib`

#### Build Script

```js
const buildStylesheets = require('core-styles');

buildStylesheets(
  // Parse CSS files from which directory (required)
  `path/to/your/css/src`,
  // Output CSS files to which directory (required)
  `path/to/put/css/output`, {
    // List of YAML config files (optional)
    // (The first file is merged on top of the base config.)
    // (Each successive file overwrites the file before it.)
    // SEE: https://github.com/postcss/postcss-load-config#postcssrc
    customConfigs: [
      // The "base" config is `/.postcssrc.base.yml`
      `path/to/custom/configthat/extends/base/.postcssrc.yml`,
      `path/to/custom/config/that/extends/above/.postcssrc.yml`
    ],
    // Print more info from build log (optional, default: false)
    verbose: true,
    // Print version of this software (optional, default: false)
    version: true,
    // Extension of CSS files to parse (optional, default: "css")
    fileExt: 'css',
    // Any value to help identify the build (optional, default: app version)
    buildId: process.env.npm_package_version + someUniqueId
  }
);
```

## Local Development Setup

### Prequisites for Building the Styles

* Nodejs 16.x

> __Future__: The Core Styles will be rendered via a pattern library software.

### Code Configuration

Code configuration happens in repos that use these styles.

### Previewing the Styles

1. [Install][npm-install] the dependencies:

    ```bash
    npm ci
    ```

> __Future__:
>
> 2. Build stylesheets + Run the pattern library:
>
>     ```bash
>     npm start
>     ```
>
> 3. Open the web interface.
>
>     The build command will output the URL (and may even open it for you).


[npm-install]: https://docs.npmjs.com/cli/v8/commands/npm-ci

### Source Files

If you changes files in a `src/lib/` directory, you may need to follow some of these steps.

#### Quick Start

1. _(optional)_ Make changes to `/src/lib` files.
2. Build the styles: `npm run build`

    > __Future__: 2. Build and preview the styles: `npm start`

3. _(to debug)_ Review respective `/dist` files' content.

#### How to Just Build Stylesheets

You can build stylesheets __from__ source files __in__ `src/lib` directory __to__ compiled files __in__ `dist` directory.

0. (Optional) Set version (for preserved comment):

    ```bash
    npm run version -- --build-id="$(git describe --always)"
    ```

1. Build stylesheets:

    ```bash
    npm run build
    ```


## Testing

Plugin testing is done manually. Run `npm run build` from root folder in this project, then review output in `/dist/_tests.css`, to ensure plugins are working correctly.

> __Future__: Style testing is done manually. Run `npm start` from root folder in this project, then review output at web interface, to ensure styles are rendering correctly.

### Production Deployment

The Core Styles are not deployed alone _yet_. ¹

_For now_, the stylesheets are acquired or accessed by other repositories.

| Repo | Usage |
| - | - |
| __[Core CMS]__ | via CLI installed on test branch |
| __[Core CMS Pattern Library]__ | not accessing styles [_yet_][research-pattern-lib] ¹ |

<sub>¹ A repo that is, or will be, in [Core CMS Pattern Library] should load these styles __and__ build a pattern library.</sub>

[Core CMS Pattern Library]: https://github.com/wesleyboar/Core-CMS-Pattern-Library
[research-pattern-lib]: https://confluence.tacc.utexas.edu/x/FADMBQ


## Contributing

### Development Workflow

We use a modifed version of [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) as our development workflow. Our [development site](https://dev.cep.tacc.utexas.edu) (accessible behind the TACC Network) is always up-to-date with `main`, while the [production site](https://prod.cep.tacc.utexas.edu) is built to a hashed commit tag.
- Feature branches contain major updates, bug fixes, and hot fixes with respective branch prefixes:
    - `task/` for features and updates
    - `bug/` for bugfixes
    - `fix/` for hotfixes

### Best Practices

Sign your commits ([see this link](https://help.github.com/en/github/authenticating-to-github/managing-commit-signature-verification) for help)

### Publishing Workflow

1. Create new branch for version bump.
1. Update `CHANGELOG.md`.
1. Update version in `package.json`.
1. Update version in `package-lock.json` by running `npm i --package-lock-only`.
1. Commit, push, PR, review, merge.
1. Create new GitHub Release.

### Resources

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)


<!-- Link Aliases -->

[Core Portal Deployments]: https://github.com/TACC/Core-Portal-Deployments
[Camino]: https://github.com/TACC/Camino
[Core CMS]: https://github.com/TACC/Core-CMS
[Core Portal]: https://github.com/TACC/Core-Portal
