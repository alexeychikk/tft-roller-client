import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    svgr(),
    million.vite({ auto: true }),
    react(),
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
      // these 2 just in case:
      'react',
      'react-dom',
    ],
  },
}));
