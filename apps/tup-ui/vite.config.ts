import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/',
  resolve: {
    alias: {
      '@tacc/core-components': path.resolve(
        __dirname,
        '../../libs/core-components/src/index.ts'
      ),
      '@tacc/core-wrappers': path.resolve(
        __dirname,
        '../../libs/core-wrappers/src/index.ts'
      ),
      '@tacc/tup-hooks': path.resolve(
        __dirname,
        '../../libs/tup-hooks/src/index.ts'
      ),
      '@tacc/core-styles': path.resolve(__dirname, '../../libs/core-styles/'),
      '@tacc/tup-ui': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    hmr: {
      port: 3000,
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist/apps/tup-ui'),
    rollupOptions: {
      input: {
        imports: path.resolve(__dirname, 'imports.html'),
      },
    },
  },
});
