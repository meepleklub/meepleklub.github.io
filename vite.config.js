import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

const root = new URL('.', import.meta.url).pathname;

export default defineConfig({
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
  // When serving the site from a subdirectory (e.g. GitHub Pages), set: base: '/repo-name/'
});
