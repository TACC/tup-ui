import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import libPaths from '../../libs/paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tacc/core-styles/dist': libPaths['@tacc/core-styles/dist'],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: '@tacc/core-components',
      fileName: (format) => `core-components.${format}.js`,
    },
    rollupOptions: {
      // Externalized dependencies, that will not be included during build
      external: ['react', 'reactstrap'],
      output: {
        globals: {
          react: 'react',
          reactstrap: 'reactstrap',
          'react-resize-detector': 'react-resize-detector',
          'react-table': 'react-table',
        },
      },
    },
    outDir: path.resolve(__dirname, '../../dist/libs/core-components'),
  },
});
