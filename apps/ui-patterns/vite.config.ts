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
      '@tacc/core-wrappers': path.resolve(
        __dirname,
        '../../libs/core-wrappers/src/index.ts'
      ),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist/apps/ui-patterns'),
  },
});
