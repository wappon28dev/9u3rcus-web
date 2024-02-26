import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx,js,jsx,astro}",
    "./pages/**/*.{ts,tsx,js,jsx,astro}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          "9u-white": { value: "#fceded" },
          "9u-red1": { value: " #dd4343" },
          "9u-red2": { value: "#b21b1b" },
          "9u-red3": { value: "#561d1d" },
          "9u-gray": { value: "#635d5c" },
          "9u-brown": { value: "#3f3736" },
        },
        fonts: {
          line: { value: "var(--font-line)" },
          udev: { value: "var(--font-udev)" },
        },
        zIndex: {
          header: { value: 10 },
          modal: { value: 100 },
          modalContent: { value: 110 },
        },
      },
      breakpoints: {
        se: "400px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "panda",
  jsxFramework: "react",
});
