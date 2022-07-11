#!/usr/bin/env node

/** Build CSS using the Core-Styles API */

const buildStylesheets = require('../src/bin/build');

buildStylesheets(
  'src/lib/_imports/**/*!(README).css',
  './dist', {
    baseMirrorDir: 'src/lib/_imports'
  }
);
