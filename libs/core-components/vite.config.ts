/// <reference types="vitest" />
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import viteTsConfigPaths from 'vite-tsconfig-paths';

const globOutput = glob.sync(resolve(__dirname, 'src/**/!(*.test).{ts,tsx,js,jsx}')).map(file => [
  // This removes `...src/` as well as the file extension from each
  // file, so e.g. ...src/nested/foo.js becomes nested/foo
  relative(
    resolve(__dirname, 'src'),
    file.slice(0, file.length - extname(file).length)
  ),
  // This expands the relative paths to absolute paths, so e.g.
  // ...src/nested/foo becomes /project/src/nested/foo.js
  fileURLToPath(new URL(file, import.meta.url))
]);
// console.log( globOutput );

export default defineConfig({
  cacheDir: '../../node_modules/.vite/core-components',

  plugins: [
    react(),
    dts(),
    libInjectCss(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  build: {
    // outDir: '../../dist/libs/core-components',
    // reportCompressedSize: true,
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    // },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      // name: 'CoreComponents',
      // fileName: 'core-components',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        globOutput
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
  },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/core-components',
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
