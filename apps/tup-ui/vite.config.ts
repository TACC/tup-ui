import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function localFsPlugin(): PluginOption {
  // Rewrite @fs asset paths to point to the Vite dev server.
  // Otherwise Django will attempt to serve the files from port 8000.
  return {
    name: 'localfs',
    enforce: 'pre',
    apply: 'serve',
    transform: function (code, _) {
      return {
        code: code.replace(
          /\/static\/@fs\/(.*)\.(svg|jpg|png|webp|otf)/,
          'http://localhost:3000/@fs/$1.$2'
        ),
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localFsPlugin()],
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
      '@tacc/tup-components': path.resolve(
        __dirname,
        '../../libs/tup-components/src/index.ts'
      ),
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
