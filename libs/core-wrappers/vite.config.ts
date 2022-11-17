import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import libPaths from '../../libs/paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tacc/core-components': path.resolve(
        __dirname,
        '../../libs/core-components/src/index.ts'
      ),
      '@tacc/core-styles/dist': libPaths['@tacc/core-styles/dist'],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: '@tacc/core-wrappers',
      fileName: (format) => `core-wrappers.${format}.js`,
    },
    rollupOptions: {
      // Externalized dependencies, that will not be included during build
      external: [],
      output: {
        globals: {},
      },
    },
    outDir: path.resolve(__dirname, '../../dist/libs/core-wrappers'),
  },
});
