import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/predict": {
        target: "http://3.216.17.142:8000",
        changeOrigin: true,
      },
    },
  },
});
