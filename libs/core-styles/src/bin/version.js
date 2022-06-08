#!/usr/bin/env node

/** Create CSS version based on lifecycle app data and given data */

const package = require(process.env.npm_package_json || '../package.json');

/**
 * Create version from app data and given data
 * @param {string} [buildId] - Any value to identify the build
 */
function create(buildId) {
  const appName = package.name;
  const appVersion = buildId || package.version + '+';
  const appLicense = package.license;
  const appWebsite = package.homepage.replace('https://', '');

  return `${appName} ${appVersion} | ${appLicense} | ${appWebsite}`;
}

/*
  Export
*/
module.exports = create;
