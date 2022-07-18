'use strict';

const mandelbrot = require('@frctl/mandelbrot');
const fractal = require('@frctl/fractal').create();

// Get base theme
const themeConfig = require('./fractal.theme.js');
const theme = mandelbrot(themeConfig);

// Configure UI
fractal.set('project.title', 'TACC UI Patterns');
fractal.components.set('label', 'Patterns'); // default is 'Components'
fractal.components.set('title', 'Patterns'); // default is 'Components'
fractal.components.set('default.status', 'wip'); // default is 'ready'

// Set source paths
// (for components)
fractal.components.set('path', __dirname + '/src/lib/_imports');
fractal.components.set('resources', {
  // Render assets from component folders in a panel
  // WARNING: Undocumented feature
  // https://github.com/frctl/fractal/issues/150#issuecomment-254642411
  // https://github.com/frctl/fractal/issues/93#issuecomment-236429871
  assets: {
    label: 'Assets',
    match: ['**/*.css', '**/*.js'],
  },
});
// (for stylesheets)
fractal.components.set('default.context', {
  styles: {
    internal: {
      local: [
        '/settings/border.css',
        '/settings/color.css',
        '/settings/font.css',
        '/settings/max-width.css',
        '/settings/space.css',
      ],
    },
  },
});

// Set website paths
fractal.docs.set('path', __dirname + '/docs');
fractal.web.set('static.path', __dirname + '/dist');
fractal.web.set('builder.dest', __dirname + '/demo');

// Customize theme
fractal.web.theme(theme);

// Export
module.exports = fractal;
