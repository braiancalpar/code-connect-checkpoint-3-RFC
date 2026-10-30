import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "./coverage",
      thresholds: {
        branches: 40,
        functions: 40,
        lines: 40,
        statements: 40,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(currentDirectory, "./src"),
    },
  },
});
