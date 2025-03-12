import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
} as UserConfig);
