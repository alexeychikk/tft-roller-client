import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    analyzer({ analyzerMode: 'static' }),
  ],
  base: '',
  build: {
    outDir: 'build',
  },
  resolve: {
    dedupe: [
      'remeda',
      '@colyseus/schema',
      'reflect-metadata',
      'class-validator',
      'class-transformer',
    ],
  },
});
