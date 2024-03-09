import { defineConfig, configDefaults } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [tsconfigPaths()],
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
  };
});
