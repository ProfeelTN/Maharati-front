import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    host: "0.0.0.0", // Listen on all interfaces
    port: process.env.PORT || 3000, // Use the port provided by Render or default to 3000
  },
});
