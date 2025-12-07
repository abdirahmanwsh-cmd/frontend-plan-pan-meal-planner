
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Only include plugins you actually have installed
export default defineConfig({
  plugins: [
    react(),
  ],
});

