/** Orchestrator 2026-08-20: sucht projektweit Makros, die MathJax STILL als
 *  Literaltext setzt (noundefined-Paket -> mtext statt merror). Rezept aus
 *  QA-O0/check-cbblue.mjs verallgemeinert. */
import { createRequire } from "node:module";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const ROOT = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))));
const require = createRequire(`${ROOT}/package.json`);
const src = fs.readFileSync(`${ROOT}/src/fmm-macros.ts`, "utf8");
const tabelle = {};
for (const m of src.matchAll(/"([A-Za-z]+)":\s*\[\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*(\d+))?\s*\]/g))
  tabelle[m[1]] = m[3] ? [JSON.parse(`"${m[2]}"`), Number(m[3])] : JSON.parse(`"${m[2]}"`);
for (const m of src.matchAll(/"([A-Za-z]+)":\s*"((?:[^"\\]|\\.)*)"/g))
  if (!(m[1] in tabelle)) tabelle[m[1]] = JSON.parse(`"${m[2]}"`);

// alle im Buch verwendeten Makronamen einsammeln
// Wichtig: die von typecheck:mdx erzeugten .mdx-check.tsx-Tempdateien AUSSCHLIESSEN —
// dort tauchen \n-Escapes als Pseudomakros auf (\nx, \ny, ...).
const files = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collect(path);
    else if (!entry.name.startsWith(".") && (entry.name.endsWith(".tsx") || entry.name.endsWith(".mdx"))) files.push(path);
  }
}
collect(join(ROOT, "src/concepts"));
collect(join(ROOT, "src/chapters"));
const used = new Map();
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/\\\\([a-zA-Z]{2,})/g)) {
    if (!used.has(m[1])) used.set(m[1], f.replace(ROOT + "/", ""));
  }
}
const MathJax = require("mathjax/es5/node-main.js");
const mj = await MathJax.init({
  loader: { load: ["input/tex-full", "output/svg"] },
  tex: { packages: { "[+]": ["ams", "color", "unicode"] }, macros: tabelle },
});
const kaputt = [];
for (const [name, datei] of [...used].sort()) {
  // Argumentlose Probe; Makros mit Argumenten bekommen zwei Dummy-Argumente.
  for (const probe of [`\\${name}`, `\\${name}{x}`, `\\${name}{x}{y}`]) {
    let svg;
    try { svg = mj.startup.adaptor.outerHTML(mj.tex2svg(probe, { display: false })); }
    catch { continue; }
    // Nur der Name-als-Literaltext beweist das noundefined-Fallback.
    const textFallback = new RegExp(`>\\s*${name}\\s*<`).test(svg);
    if (!textFallback) { svg = null; break; }
    if (probe.endsWith("{y}")) kaputt.push({ name, datei });
  }
}
console.log(`geprüfte Makronamen: ${used.size}`);
if (kaputt.length === 0) console.log("KEIN Makro faellt still auf Literaltext zurueck.");
else { console.log(`STILL FEHLSCHLAGENDE MAKROS: ${kaputt.length}`); for (const k of kaputt) console.log(`  \\${k.name}   zuerst in ${k.datei}`); }
