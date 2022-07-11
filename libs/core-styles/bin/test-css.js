#!/usr/bin/env node

/** Test CSS plugins via the Core-Styles API */

const buildStylesheets = require('../src/bin/build');

buildStylesheets(
  'src/lib/_tests',
  './dist', {
    baseMirrorDir: 'src/lib'
  }
);
