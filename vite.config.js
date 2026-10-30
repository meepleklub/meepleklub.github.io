import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

const root = new URL('.', import.meta.url).pathname;

export default defineConfig({
  // The repository is named <owner>.github.io, so GitHub Pages serves it at the domain root.
  base: '/',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        'pages/rolunk': resolve(root, 'pages/rolunk.html'),
        'pages/klubnapok': resolve(root, 'pages/klubnapok.html'),
        'pages/galeria': resolve(root, 'pages/galeria.html'),
        'pages/elerhetoseg': resolve(root, 'pages/elerhetoseg.html'),
      },
    },
  },
});
