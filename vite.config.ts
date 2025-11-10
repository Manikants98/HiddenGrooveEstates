import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { updateContentPlugin } from "./vite-plugin-update-content";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), updateContentPlugin()],
  server: {
    port: 3000,
    host: true,
  },
});
