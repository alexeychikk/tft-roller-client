import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { analyzer } from 'vite-bundle-analyzer';

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
    dedupe: ['remeda', '@colyseus/schema'],
  },
});
