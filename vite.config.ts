import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   host: "192.168.45.175",
  // },
});
