// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://googleknight.github.io",

  build: {
    assets: "_assets",
  },

  vite: {
    build: {
      cssMinify: true,
    },
  },

  integrations: [sitemap()],
});