import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // allows access from network IPs
    port: 5176,       // your preferred dev port
    open: false,      // don't auto-open browser
  },
  build: {
    outDir: "dist",   // production build folder
  },
  base: "/",          // important for React Router client-side routing
});
