import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ayurveda-hayd.onrender.com",
      "/uploads/": "https://ayurveda-hayd.onrender.com",
    },
  },
});
