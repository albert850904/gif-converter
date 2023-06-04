import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // other plugins...
    // https://github.com/chaosprint/vite-plugin-cross-origin-isolation
    crossOriginIsolation(),
  ],
});
