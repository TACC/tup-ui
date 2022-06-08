#!/usr/bin/env node

/** Functions to build, to configure build of, and to version stylesheets */

const { resolve } = require('path');

const build = require('./bin/build.js');
const config = require('./bin/config.js');
const version = require('./bin/version.js');

/**
 * Build stylesheets from source CSS
 * @param {string} input - Parse CSS files from which directory
 * @param {string} output - Output CSS files to which directory
 * @param {object} [opts={}] - Options
 * @param {string} [opts.baseMirrorDir] - Do not add this path when mirroring
 * @param {array.string} [opts.customConfigs] - List of YAML config file paths
 * (The first file is merged on top of the base config.)
 * (Each successive file overwrites the file before it.)
 * @param {string} [opts.buildId] - Any value to identify the build
 * @param {boolean} [opts.verbose=false] - Print more in log output
 */
function buildStylesheets(input, output, opts = {}) {
  const buildOpts = {
    verbose: opts.verbose || null,
    baseMirrorDir: opts.baseMirrorDir || null,
  };

  const inputResolved = resolve(input);
  const outputResolved = resolve(output);
  const customConfigs = opts.customConfigs
    ? opts.customConfigs.map((filePath) =>
        filePath ? resolve(filePath) : null
      )
    : undefined;

  config(customConfigs, version(opts.buildId));
  build(inputResolved, outputResolved, buildOpts);
}

/*
  Export
*/
module.exports = { buildStylesheets };
