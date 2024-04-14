/* eslint-disable import/no-unresolved */
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import pandacss from "@pandacss/astro";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    pandacss(),
    sitemap(),
    metaTags(),
    icon({ include: { mdi: ["*"] } }),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      CSS: false,
    }),
  ],
  site: "https://9u3rc.us",
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http" }],
  },
  vite: {
    optimizeDeps: {
      exclude: "*.json",
    },
  },
});
