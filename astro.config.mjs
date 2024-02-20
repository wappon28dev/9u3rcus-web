/* eslint-disable import/no-unresolved */
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import pandacss from "@pandacss/astro";
import sitemap from "@astrojs/sitemap";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), pandacss(), sitemap(), metaTags()],
  site: "https://9u3rc.us",
  image: {
    domains: ["images.microcms-assets.io"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
});
