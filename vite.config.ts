import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src", "assets"),
      "@components": resolve(__dirname, "./src", "components"),
      "@hooks": resolve(__dirname, "./src", "hooks"),
      "@layout": resolve(__dirname, "./src", "layout"),
      "@models": resolve(__dirname, "./src", "models"),
      "@redux": resolve(__dirname, "./src", "redux"),
      "@services": resolve(__dirname, "./src", "services"),
      "@utils": resolve(__dirname, "./src", "utils"),
    },
  },
  server: {
    port: 4000,
  },
});
