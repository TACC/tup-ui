import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tacc/core-components': path.resolve(
        __dirname,
        '../../libs/core-components/src/index.ts'
      ),
      '@tacc/core-styles': path.resolve(__dirname, '../../libs/core-styles/'),
      '@tacc/tup-ui': path.resolve(__dirname, './src/')
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist/apps/tup-ui'),
  },
});
