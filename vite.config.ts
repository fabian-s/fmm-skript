import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import { remarkChain } from "./mdx/plugins.mjs";
import { generateNumbers } from "./scripts/gen-numbers.mjs";
import type { Plugin } from "vite";

/**
 * Nummerntabelle im Dev-Server aktuell halten: bei jeder MDX-Änderung wird
 * src/chapters/numbers.generated.json neu gerechnet. Ändert sich dabei KEINE
 * Nummer (Textedit), läuft das normale HMR; verschiebt sich ein Zähler
 * (neuer Satz eingefügt), sind die Nummern in allen MDX-Modulen veraltet —
 * dann werden alle invalidiert und die Seite komplett neu geladen.
 */
function numbersPlugin(root: string): Plugin {
  const report = (r: ReturnType<typeof generateNumbers>) => {
    for (const w of r.warnings) console.warn(`gen-numbers: WARNUNG ${w}`);
    for (const e of r.errors) console.error(`gen-numbers: FEHLER ${e}`);
  };
  return {
    name: "fmm-numbers",
    buildStart() {
      report(generateNumbers(root));
    },
    async handleHotUpdate({ file, server, modules }) {
      if (!file.endsWith(".mdx") && !/src[\/]chapters[\/][^\/]+[\/]index\.ts$/.test(file)) return;
      const r = generateNumbers(root);
      report(r);
      if (!r.changed) return; // nur Text geändert: normales HMR
      for (const m of server.moduleGraph.fileToModulesMap.values())
        for (const mod of m) if (mod.file?.endsWith(".mdx")) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: "full-reload" });
      return [];
    },
  };
}

// Static-site build (GitHub Pages): NO single-file inlining here — the
// Skript is served as a normal multi-file site with per-chapter code
// splitting. relative base so it works under /<repo>/ project pages.
export default defineConfig({
  plugins: [
    numbersPlugin(process.cwd()),
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
