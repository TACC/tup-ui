/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/core-components',

  plugins: [
    react(),
    // dts({ include: ['src/lib'] }),
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
      // output: {
      //   globals: {
      //     vue: 'React',
      //   },
      // },
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
