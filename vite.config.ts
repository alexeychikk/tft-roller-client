import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    svgr(),
    preact({
      babel: {
        plugins: [
          [
            '@babel/plugin-proposal-decorators',
            { decoratorsBeforeExport: true },
          ],
          '@babel/plugin-transform-class-properties',
        ],
      },
    }),
    command === 'build' && analyzer({ analyzerMode: 'static' }),
  ].filter(Boolean),
  base: '',
  build: {
    outDir: 'build',
  },
  resolve: {
    dedupe: [
      'remeda',
      'reflect-metadata',
      'class-validator',
      'class-transformer',
    ],
  },
}));
