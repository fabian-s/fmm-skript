import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Static-site build (GitHub Pages): NO single-file inlining here — the
// Skript is served as a normal multi-file site with per-chapter code
// splitting. relative base so it works under /<repo>/ project pages.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
});
