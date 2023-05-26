import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() as any],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./test/benchmark/**/*.spec.ts"],
    // setupFiles: "setupTests.ts",
    // deps: {
    //   // Workaround for the "... seems to be an ES Module but shipped in a CommonJS package" vitest error
    //   inline: [
    //     "@uxland/browser-utilities",
    //     "@uxland/event-aggregator",
    //     "@uxland/react-services",
    //     "@uxland/utilities",
    //   ],
    // },
  },
});
