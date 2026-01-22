import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import { oidcSpa } from "oidc-spa/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tanstackRouter(), react(), oidcSpa()],
});
