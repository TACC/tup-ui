/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/core-wrappers',

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/tup-ui',
      provider: 'v8',
    },
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
