/**
 * Bericht (kein Build-Gate): Wo wird ein Begriff, den das Skript in einer
 * :::definition einführt, in einem SPÄTEREN Abschnitt erwähnt, ohne dass
 * dieser Abschnitt ihn verlinkt (:d[…]{#id}, @definition:id oder :k[…])?
 *
 * Gemeldet wird je (Begriff, Abschnitt) nur die ERSTE Erwähnung im
 * Fließtext; Mathematik, Überschriften, Env-Labels, Links und JSX-Zeilen
 * zählen nicht. Die Suche ist eine Heuristik (Wortstamm + kurze Endung),
 * also Kandidatenliste für einen Menschen, keine Vorschrift: Nicht jede
 * Erwähnung braucht einen Link, und manche Treffer meinen etwas anderes.
 *
 *   node scripts/report-definition-links.mjs [--kapitel 08-la-misc] [--json]
 */
import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readChapters, readSections } from "./lib/registry.mjs";
import { loadNumbers } from "../mdx/numbers.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Suchbegriffe je Definitions-ID, wo der Name der Definition nicht der Begriff
 * ist, der im Text steht (Sammelnamen, Aufzählungen, Beiwerk). Leere Liste =
 * nicht melden (zu allgemein).
 */
const TERMS = {
  algorithmus: [],
  komplexitaet: [],
  "zeit-und-speicheraufwand": [],
  "numerisches-problem": ["numerisches Problem"],
  "rechte-und-linke-singulaervektoren": ["Singulärvektor"],
  "lokales-und-globales-minimum": ["lokales Minimum", "globales Minimum"],
  "unbeschraenktes-und-beschraenktes": [],
  "vorwaerts-und-rueckwaertsstabilitaet": ["Rückwärtsstabilität", "rückwärtsstabil", "Vorwärtsstabilität", "vorwärtsstabil"],
  "partition-und-gitterweite": ["Gitterweite"],
  "subgradient-und-subdifferential": ["Subgradient", "Subdifferential"],
  "sketching-matrix-und-skizze": ["Sketching-Matrix"],
  "ansatzraum-und-designmatrix": [],
  "interpolation-und-glaettung-im": [],
  "monombasis-und-vandermonde-matrix": ["Monombasis", "Vandermonde-Matrix"],
  "erweiterte-knotenfolge-und-b-splines": ["B-Spline"],
  "polynom-spline-vom-grad-q": ["Polynom-Spline"],
  "k-mal-frechet-differenzierbar": [],
  "ableitung-einer-matrixwertigen-funktion": [],
  "der-vektorraum-der-funktionen": [],
  "fibonacci-zahlen": [],
  "landau-symbole": ["Landau-Symbol"],
  "kleinste-quadrate-problem-kq-problem": ["KQ-Problem", "Kleinste-Quadrate-Problem"],
  "eigenschaften-konditionszahl-einer-matrix": ["Konditionszahl"],
  "positiv-semidefinit": [],
};

/** Namen → Suchbegriffe: „A, B" und „A/B" teilen; sonst der Name selbst. */
function termsFor(id, name) {
  if (TERMS[id]) return TERMS[id];
  if (!name) return [];
  return name.split(/\s*[,/]\s*/).filter(Boolean);
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Wortstamm + bis zu drei Endungsbuchstaben: Operatornorm → Operatornormen, konvexe → konvexen */
function termRegex(term) {
  const words = term.split(/\s+/).map((w) => {
    const stem = w.length > 5 ? w.replace(/(e|en|er|es|em)$/i, "") : w;
    return `${esc(stem)}[\\p{L}]{0,3}`;
  });
  return new RegExp(`(?<![\\p{L}-])${words.join("\\s+")}(?![\\p{L}-])`, "iu");
}

/** Fließtext einer Zeile: Mathe, Links, Direktiven, Verweise ausblenden. */
function prose(line) {
  return line
    .replace(/\$[^$]*\$/g, " ")
    .replace(/:[kd]\[[^\]]*\]\{[^}]*\}/g, " ")
    .replace(/\\?@[a-z]+:[a-z0-9/-]+/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ");
}

function scanSection(src) {
  const out = [];
  let inMath = false;
  let inFence = false;
  src.split("\n").forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith("```")) inFence = !inFence;
    if (inFence) return;
    if (t.startsWith("$$")) {
      // einzeiliges $$ … $$ oder Blockgrenze
      if (!(t.length > 2 && t.endsWith("$$") && t !== "$$" && !/^\$\$\s*\{#/.test(t))) inMath = !inMath;
      return;
    }
    if (inMath) return;
    if (/^(#|:{2,}|import |export |<\/?[A-Za-z])/.test(t)) return;
    out.push({ line: i + 1, raw: line, text: prose(line) });
  });
  return out;
}

const args = process.argv.slice(2);
const onlyChapter = args.includes("--kapitel") ? args[args.indexOf("--kapitel") + 1] : null;
const asJson = args.includes("--json");

const table = loadNumbers(ROOT);
const defs = Object.entries(table.envs)
  .filter(([, e]) => e.directive === "definition" && !e.legacy)
  .map(([id, e]) => ({ id, ...e, terms: termsFor(id, e.name).map((t) => ({ t, re: termRegex(t) })) }))
  .filter((d) => d.terms.length);

// Abschnitte in Dokumentreihenfolge
const sections = [];
for (const ch of readChapters(ROOT))
  for (const s of readSections(ROOT, ch)) sections.push({ chapter: ch.id, num: s.num, file: join("src/chapters", ch.id, s.file) });
const order = new Map(sections.map((s, i) => [s.num, i]));

const hits = [];
for (const s of sections) {
  if (onlyChapter && s.chapter !== onlyChapter) continue;
  const src = readFileSync(join(ROOT, s.file), "utf8");
  const lines = scanSection(src);
  for (const d of defs) {
    if (order.get(d.section) >= order.get(s.num)) continue; // nur NACH der Definition
    // schon verlinkt in diesem Abschnitt?
    if (src.includes(`{#${d.id}}`) || new RegExp(`@(definition|ref|num):${esc(d.id)}(?![a-z0-9-])`).test(src)) continue;
    for (const l of lines) {
      const term = d.terms.find(({ re }) => re.test(l.text));
      if (!term) continue;
      const m = term.re.exec(l.text);
      hits.push({ file: s.file, line: l.line, section: s.num, id: d.id, def: d.num, match: m[0], context: l.raw.trim().slice(0, 140) });
      break;
    }
  }
}

if (asJson) console.log(JSON.stringify(hits, null, 1));
else {
  for (const h of hits) console.log(`${h.file}:${h.line}  „${h.match}" → :d[…]{#${h.id}} (Def. ${h.def})\n    ${h.context}`);
  const bySec = new Set(hits.map((h) => h.section)).size;
  console.log(`\n${hits.length} unverlinkte Erst-Erwähnungen in ${bySec} Abschnitten (${defs.length} Begriffe geprüft)`);
}
