import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { remarkChain } from "./mdx/plugins.mjs";

// Static-site build (GitHub Pages): NO single-file inlining here — the
// Skript is served as a normal multi-file site with per-chapter code
// splitting. relative base so it works under /<repo>/ project pages.
export default defineConfig({
  plugins: [
    // enforce "pre": MDX must run BEFORE the React plugin, which then also
    // has to be told to transform the JSX that MDX produces (include below).
    // Plugin order in remarkPlugins matters too: math and directives are
    // parsed first, remark-fmm lowers them onto the src/lib components.
    { enforce: "pre", ...mdx({ remarkPlugins: remarkChain(process.cwd()) }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  base: "./",
});
