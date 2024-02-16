/* eslint-disable import/no-unresolved */
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import pandacss from "@pandacss/astro";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), pandacss(), sitemap()],
  site: "https://example.com",
});
