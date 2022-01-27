import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer()]
    },
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '#mixins' as *;
        `,

      }
    }
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      '~': resolve('./src'),
      '#mixins': resolve('./src/mixins'),
    }
  }
});
