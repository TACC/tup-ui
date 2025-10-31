/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tup-ui',

  server: {
    port: 3000,
    host: 'localhost',
    hmr: {
      port: 3000,
    },
  },

  preview: {
    port: 3000,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  build: {
    outDir: '../../dist/apps/tup-ui',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: {
      input: {
        imports: path.resolve(__dirname, 'imports.html'),
      },
    },
  },

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
    setupFiles: ['./vitest.setup.ts'],
  },
});
