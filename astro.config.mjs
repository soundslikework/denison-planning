import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://denisonplanning.com',

  vite: {
    plugins: [tailwindcss()],
  },

  // Cloudflare can't run sharp at runtime; "compile" optimizes images with
  // sharp at build time instead, which works because this page is prerendered.
  adapter: cloudflare({ imageService: 'compile' }),

  integrations: [sitemap()],
});