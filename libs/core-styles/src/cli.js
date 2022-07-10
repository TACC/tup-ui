#!/usr/bin/env node

/** CLI to custom build stylesheets and create a version stylesheet */

const { program } = require('commander');

const package = require(process.env.npm_package_json || './package.json');

const { buildStylesheets } = require('./main.js');

/*
  Setup
*/
program
  .name('core-styles')
  .version(package.version)
  .showHelpAfterError('(add --help for additional information)');

/*
  Build Command
*/
program
  .command('build')
  .description(
    `build stylesheets with TACC standard process:
- "post-css" plugins
- custom input path
- custom output path
- custom configs
- prepend build id
    `
  )
  .requiredOption('-i, --input <path>', 'parse source at which path¹')
  .requiredOption('-o, --output <path>', 'output CSS files to which path¹')
  .option('-v, --verbose', 'print more info during build process')
  .option(
    '-c, --custom-configs <paths...>',
    `extend base config with YAML files²³`
  )
  .option(
    '-b, --build-id <identifier>',
    'any value to identify the build (default: version of app)'
  )
  .option(
    '-m, --base-mirror-dir <path>',
    'if input folder structure is mirrored, this path is not⁴'
  )
  .addHelpText(
    'after',
    `
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
    `
  )
  .action((programOpts) => {
    const { input, output, ...opts } = programOpts;

    buildStylesheets(input, output, opts);
  });

/*
  Parse
*/
program.parse(process.argv);
