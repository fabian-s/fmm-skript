/** QA-O0, 2026-08-20: Gibt es ein \cbblue-Makro? Rendert der Ausdruck fehlerfrei? */
import { createRequire } from "node:module";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const require = createRequire(join(repoRoot, "package.json"));
const src = fs.readFileSync(join(repoRoot, "src/fmm-macros.ts"), "utf8");
const namen = [...src.matchAll(/^\s*"([A-Za-z]+)":\s*\[/gm)].map((m) => m[1]);
console.log("cblue vorhanden:", namen.includes("cblue"), "| cbblue vorhanden:", namen.includes("cbblue"));
// Makrotabelle fuer MathJax rekonstruieren
const tabelle = {};
for (const m of src.matchAll(/"([A-Za-z]+)":\s*\[\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*(\d+))?\s*\]/g)) {
  tabelle[m[1]] = m[3] ? [JSON.parse(`"${m[2]}"`), Number(m[3])] : JSON.parse(`"${m[2]}"`);
}
const MathJax = require("mathjax/es5/node-main.js");
const mj = await MathJax.init({
  loader: { load: ["input/tex-full", "output/svg"] },
  tex: { packages: { "[+]": ["ams", "color", "unicode"] }, macros: tabelle },
});
// MathJax meldet fuer ein unbekanntes Makro KEINEN merror-Knoten; es setzt den
// Makronamen still als <mtext> in die Formel. Der Test unterscheidet deshalb
// nach Knotentypen: mstyle (Farbe angewendet) vs. mtext (Name als Text).
for (const lit of ["\\cblue{3\\,x^{2}h}", "\\cbblue{3\\,x^{2}h}"]) {
  const svg = mj.startup.adaptor.outerHTML(mj.tex2svg(lit, { display: false }));
  const knoten = [...new Set([...svg.matchAll(/data-mml-node="([a-z]+)"/g)].map((m) => m[1]))];
  // Das noundefined-Paket von tex-full setzt ein UNBEKANNTES Makro als roten
  // Literaltext (mtext) in die Formel, statt einen merror-Knoten zu erzeugen.
  const alsText = knoten.includes("mtext");
  console.log(
    `${lit.padEnd(26)} -> Knoten ${knoten.join(",")} | ${alsText ? "FEHLER: Makroname erscheint als Literaltext (mtext)" : "ok, Makro wurde expandiert"}`,
  );
}
