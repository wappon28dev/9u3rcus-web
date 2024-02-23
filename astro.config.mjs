/* eslint-disable import/no-unresolved */
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import pandacss from "@pandacss/astro";
import sitemap from "@astrojs/sitemap";
import metaTags from "astro-meta-tags";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    pandacss(),
    sitemap(),
    metaTags(),
    icon({
      include: {
        mdi: ["*"],
      },
    }),
  ],
  site: "https://9u3rc.us",
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
      {
        protocol: "http",
      },
    ],
  },
});
