import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/movie-grid-node/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  server: {
    host: true,
    port: 3000,
  },
} as UserConfig);
