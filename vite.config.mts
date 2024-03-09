import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig(({ command, mode }) => {
  return {
    define: {
      "import.meta.vitest": mode !== "production",
    },
    test: {
      includeSource: ["src/**/*.{ts, tsx}"],
      exclude: [...configDefaults.exclude, "client/panda/patterns/*"],
      globals: true,
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
    plugins: [],
  };
});
