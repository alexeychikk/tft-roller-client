import prefresh from '@prefresh/vite';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    svgr(),
    command === 'build' && analyzer({ analyzerMode: 'static' }),
    command === 'serve' && prefresh(),
  ].filter(Boolean),
  base: '',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // Must be below test-utils
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
    dedupe: [
      'remeda',
      'reflect-metadata',
      'class-validator',
      'class-transformer',
    ],
  },
}));
