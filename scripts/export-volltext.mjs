#!/usr/bin/env node
/**
 * Volltext-Export des Skripts als TXT — gedacht als Kontext-Futter fuer LLMs
 * (Tutor-Chatbots, Recherche, Konsistenzpruefungen).
 *
 *   node scripts/export-volltext.mjs            # -> ../attic/skript-volltext*.txt
 *   node scripts/export-volltext.mjs --out DIR  # anderes Zielverzeichnis
 *   npm run export:volltext
 *
 * Geschrieben werden vier Dateien: das Gesamtskript (`skript-volltext.txt`)
 * und je eine Datei pro Kursteil (`skript-volltext-teil{1,2,3}-*.txt`, Aufteilung
 * wie in slides/concept-map.qmd). Die Teildateien gibt es, weil manche
 * Chatbot-Oberflaechen an der Groesse der Gesamtdatei (~1,6 MB) scheitern; jede
 * Teildatei traegt Legende und Glossar mit, ist also fuer sich verwendbar.
 *
 * Standardziel ist `<repo>/../attic` (im Parent-Repo fmm-lmu), weil die Dateien
 * Wegwerf-Artefakte sind und nicht ins Skript-Repo gehoeren. Fehlt dieses
 * Verzeichnis, landen sie in `<repo>/build/`.
 *
 * Was die Datei enthaelt
 * ---------------------
 * 1. Kurze Notationslegende (die Kursmakros \bA, \wh{}, \kron … bleiben im
 *    Text stehen, ein LLM muss sie also aufloesen koennen).
 * 2. Alle 13 Kapitel in Registry-Reihenfolge (src/chapters/index.ts), je
 *    Kapitel alle Abschnitte in TOC-Reihenfolge (toc.generated.ts).
 * 3. Anhang: alle Begriffstexte aus src/concepts, alphabetisch nach Titel.
 *
 * Wie aus MDX Text wird (alles bewusst grob — Lesbarkeit vor Treue):
 *   - `import`-Zeilen, `{/* … *\/}`-Kommentare und React-Komponenten fliegen
 *     raus; wo ein Widget stand, bleibt ein `[Interaktives Widget: …]`-Marker,
 *     damit klar ist, dass dort Inhalt fehlt, den nur die Web-Fassung hat.
 *   - Container-Direktiven werden lesbare Marker:
 *     `:::satz[#id (Titel)]` -> `[Satz 6.2.2 – Titel]`, dazu `[Beweis]`,
 *     `[Beweisschritt]`, `[Definition …]`, `[Vertiefung: …]`.
 *   - Selbsttests behalten ihre Loesung: `:::frage{wahr}` ->
 *     `[Selbsttest – richtige Antwort: wahr]`, `:::zahlfrage{loesung=1010 …}`
 *     -> `[Schaetzfrage – Loesung: 1010]`. Das gibt dem LLM gratis mehrere
 *     hundert Frage-Antwort-Paare.
 *   - Querverweise werden ueber numbers.generated.json zu echten Nummern
 *     aufgeloest: `@satz:xyz` -> "Satz 5.3.1", `@sec:algos/aufwand` ->
 *     "Abschnitt 2.3", `@eq:…` -> "Gleichung (10.4.1)".
 *   - Konzept-Direktiven `:k[Text]{#id}` schrumpfen auf ihren Text,
 *     Farbmakros (\cblue{…} …) auf ihr Argument, rohe HTML-Tabellen auf
 *     pipe-getrennte Zeilen.
 * Die Mathematik bleibt unangetastetes LaTeX.
 *
 * Abhaengigkeiten: keine (nur node:fs / node:path). Muss NICHT im Build
 * laufen — der Export ist ein Nebenprodukt, kein Artefakt des Skripts.
 * Voraussetzung ist eine aktuelle Nummerntabelle, also ggf. vorher
 * `npm run gen:numbers`.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CHAPTERS = join(ROOT, "src", "chapters");
const CONCEPTS = join(ROOT, "src", "concepts");

const argOut = process.argv.indexOf("--out");
const attic = resolve(ROOT, "..", "attic");
const outDir = argOut !== -1 ? resolve(process.argv[argOut + 1]) : (existsSync(attic) ? attic : join(ROOT, "build"));
const OUT = join(outDir, "skript-volltext.txt");

const NUM = JSON.parse(readFileSync(join(CHAPTERS, "numbers.generated.json"), "utf8"));

/** Kapitel in Registry-Reihenfolge: [id, num, title] */
const chaps = [...readFileSync(join(CHAPTERS, "index.ts"), "utf8")
  .matchAll(/id: "([^"]+)",\s*\n\s*num: (\d+),\s*\n\s*title: "([^"]+)"/g)]
  .map((m) => [m[1], m[2], m[3]]);

/** Abschnitte je Kapitel: id -> [[num, key, title], …] */
const toc = readFileSync(join(CHAPTERS, "toc.generated.ts"), "utf8");
const sections = {};
for (const m of toc.matchAll(/"([^"]+)": \[([\s\S]*?)\n  \]/g)) {
  sections[m[1]] = [...m[2].matchAll(/id: "([^"]+)", key: "([^"]+)", title: "([^"]+)"/g)]
    .map((s) => [s[1], s[2], s[3]]);
}

const KIND = { satz: "Satz", definition: "Definition", beispiel: "Beispiel", bemerkung: "Bemerkung",
  korollar: "Korollar", lemma: "Lemma", algorithmus: "Algorithmus" };

/** `@typ:id` -> ausgeschriebene Nummer. */
function ref(_m, kind, slug) {
  if (kind === "sec") {
    const s = NUM.sections[slug] ?? NUM.subs[slug];
    return s ? `Abschnitt ${s.num}` : `Abschnitt ${slug}`;
  }
  if (kind === "kap") {
    const c = NUM.chapters[slug];
    return c ? `Kapitel ${c.num}` : `Kapitel ${slug}`;
  }
  if (kind === "eq") {
    const e = NUM.eqs[slug] ?? NUM.eqs[slug.replace(/^eq-/, "")];
    return e ? `Gleichung (${e.num})` : "der Gleichung oben";
  }
  if (kind === "num") {
    for (const d of [NUM.sections, NUM.subs, NUM.envs, NUM.eqs]) if (d[slug]) return d[slug].num;
    return slug;
  }
  const e = NUM.envs[slug];
  return e ? `${e.kind} ${e.num}` : `${KIND[kind] ?? kind} ${slug}`;
}

/**
 * React-Komponenten (Grossbuchstabe am Tag-Anfang) entfernen, Marker setzen.
 * Klammer- und quote-bewusst, weil Props wie optionen={[{…}]} sonst zu frueh
 * enden; HTML-Tags (klein geschrieben) bleiben stehen und werden spaeter
 * abgeraeumt.
 */
function stripJsx(txt) {
  const out = [];
  let i = 0;
  const re = /<([A-Z][\w.]*)/g;
  for (;;) {
    re.lastIndex = i;
    const m = re.exec(txt);
    if (!m) { out.push(txt.slice(i)); break; }
    out.push(txt.slice(i, m.index));
    const name = m[1];
    let j = m.index + m[0].length, depth = 0, q = null;
    for (; j < txt.length; j++) {
      const c = txt[j];
      if (q) { if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (c === ">" && depth === 0) break;
    }
    if (txt[j - 1] === "/") i = j + 1;                       // selbstschliessend
    else {
      const k = txt.indexOf(`</${name}>`, j);
      i = k !== -1 ? k + name.length + 3 : j + 1;
    }
    out.push(`[interaktives Element: ${name}]\n`);
  }
  return out.join("");
}

function clean(txt) {
  txt = txt.replace(/^import [\s\S]*?;[^\S\n]*$/gm, "");
  txt = txt.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  txt = stripJsx(txt);

  // Container-Direktiven -> lesbare Marker
  txt = txt.replace(/^(:{3,})([a-z]+)(.*)$/gm, (_full, _colons, d, rawArg) => {
    const arg = (rawArg ?? "").trim();
    const a = arg.match(/^\[#([\w-]+)(?:\s*\((.*)\))?\]/);
    if (a) {
      const e = NUM.envs[a[1]];
      const lbl = e ? `${e.kind} ${e.num}` : (KIND[d] ?? d[0].toUpperCase() + d.slice(1));
      const name = a[2] ?? e?.name ?? "";
      return `\n[${lbl}${name ? " – " + name : ""}]\n`;
    }
    const b = arg.match(/^\[(.*)\]/);
    const title = b ? b[1] : "";
    if (d === "interaktiv") return `\n[Interaktives Widget: ${title}]\n`;
    if (d === "vertiefung") return `\n[Vertiefung: ${title}]\n`;
    if (d === "frage") {
      const ans = arg.match(/^\{(\w+)\}/);
      return `\n[Selbsttest – richtige Antwort: ${ans ? ans[1] : "?"}]\n`;
    }
    if (d === "zahlfrage") {
      const s = arg.match(/^\{loesung=([^\s}]+)/);
      return `\n[Schätzfrage – Lösung: ${s ? s[1] : "?"}]\n`;
    }
    if (d === "beweis") return "\n[Beweis]\n";
    if (d === "schritt") return "\n[Beweisschritt]\n";
    return `\n[${KIND[d] ?? d[0].toUpperCase() + d.slice(1)}${title ? " – " + title : ""}]\n`;
  });
  txt = txt.replace(/^:{3,}[^\S\n]*\n?/gm, "");
  txt = txt.replace(/::why\[(.*)\][^\S\n]*$/gm, "(Warum? $1)");

  txt = txt.replace(/:k\[([\s\S]*?)\]\{#[\w-]+\}/g, (_m, t) => t.replace(/\s+/g, " "));

  // rohe HTML-Tabellen -> Textzeilen
  txt = txt.replace(/<\/t[dh]>\s*/g, " | ");
  txt = txt.replace(/<\/tr>\s*/g, "\n");
  txt = txt.replace(/<[a-z][^>]*>/g, "");
  txt = txt.replace(/<\/[a-z]+>/g, "");
  txt = txt.replace(/^[^\S\n]*\|[^\S\n]*$/gm, "");

  txt = txt.replace(/\s*:id\[[\w-]+\]/g, "");
  txt = txt.replace(/\{#[\w-]+\}/g, "");
  txt = txt.replace(/@(sec|kap|eq|num|satz|definition|beispiel|bemerkung|korollar|lemma|algorithmus):([\w/-]+)/g, ref);
  txt = txt.replace(/\\c(?:blue|red|green|orange|purp|b|bgreen|bred|bpurp|borange)\{/g, "{");
  txt = txt.replace(/\n{3,}/g, "\n\n");
  return txt.trim();
}

const bar = "=".repeat(78);
const rule = "-".repeat(78);

/** Die drei Kursteile (wie in slides/concept-map.qmd) -> je eine Teildatei. */
const PARTS = [
  { slug: "teil1-lineare-algebra", title: "Teil 1: Numerische Lineare Algebra", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { slug: "teil2-analysis-optimierung", title: "Teil 2: Differentialrechnung, Konvexitaet & Optimierung", chapters: [10, 11, 12] },
  { slug: "teil3-funktionsapproximation", title: "Teil 3: Funktionsapproximation", chapters: [13] },
];
const covered = PARTS.flatMap((p) => p.chapters);
for (const [, cnum] of chaps) {
  if (!covered.includes(Number(cnum))) throw new Error(`Kapitel ${cnum} ist keinem Teil zugeordnet`);
}

const NOTATION = `Hinweise zur Notation: Der Text nutzt LaTeX-Mathematik mit Kurzmakros des Kurses:
\\bA, \\bX, \\bx, \\bbeta ... = fette Matrizen/Vektoren (\\mathbf/\\boldsymbol),
\\R \\N \\C \\Z \\E \\P = \\mathbb{R} usw., \\wh{x} = \\hat{x}, \\wt{x} = \\tilde{x},
\\tr = Spur, \\rank = Rang, \\pinv = Pseudoinverse, \\kron = Kroneckerprodukt,
\\otimes = Tensor-/aeusseres Produkt, \\sumin = \\sum_{i=1}^n, \\eps = \\varepsilon.
Farbmakros wurden entfernt, interaktive Widgets sind als [Interaktives Widget: ...]
markiert, Selbsttestfragen als [Selbsttest ...] mit der jeweils richtigen Antwort.`;

const header = (sub) =>
  `FMM – Fortgeschrittene mathematische Methoden in der Statistik (LMU München)\n${sub}\n\n${NOTATION}\n`;

/** Kapitelbloecke einmal bauen, danach in Gesamt- und Teildateien einsortieren. */
let nSections = 0;
const blocks = new Map();
for (const [cid, cnum, ctitle] of chaps) {
  const p = [`\n\n${bar}\nKAPITEL ${cnum}: ${ctitle}\n${bar}\n`];
  for (const [sid, , stitle] of sections[cid] ?? []) {
    const f = join(CHAPTERS, cid, `S${sid.replace(".", "")}.mdx`);
    if (!existsSync(f)) throw new Error(`Abschnitt ${sid} hat keine Datei ${f}`);
    p.push(`\n\n${rule}\n${sid} ${stitle}\n${rule}\n\n` + clean(readFileSync(f, "utf8")));
    nSections++;
  }
  blocks.set(Number(cnum), p.join("\n"));
}

/** Glossar — steht in jeder Datei, damit jeder Teil fuer sich lesbar ist. */
const gl = readdirSync(CONCEPTS)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const raw = readFileSync(join(CONCEPTS, f), "utf8");
    const m = raw.match(/export const title = "(.*?)"/);
    return [m ? m[1] : f.slice(0, -4), clean(raw.replace(/export const \w+ = [\s\S]*?;\s*/g, ""))];
  })
  .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
const glossary = [
  `\n\n${bar}\nANHANG: GLOSSAR DER GRUNDBEGRIFFE\n(Kurzerklaerungen, die im Skript als Hover-Erklaerfenster hinterlegt sind)\n${bar}\n`,
  ...gl.map(([title, body]) => `\n\n--- ${title} ---\n\n${body}`),
].join("\n");

mkdirSync(outDir, { recursive: true });
const written = [];
function write(name, chunks) {
  const p = join(outDir, name);
  writeFileSync(p, chunks.join("\n") + "\n");
  written.push([p, statSync(p).size]);
}

write("skript-volltext.txt", [
  header("Volltext des Vorlesungsskripts (Bachelor Statistik, 3. Semester)."),
  ...chaps.map(([, cnum]) => blocks.get(Number(cnum))),
  glossary,
]);

for (const part of PARTS) {
  const c = part.chapters;
  const span = c.length > 1 ? `Kapitel ${c[0]}–${c[c.length - 1]}` : `Kapitel ${c[0]}`;
  const others = PARTS.filter((q) => q !== part).map((q) => `skript-volltext-${q.slug}.txt (${q.title})`);
  write(`skript-volltext-${part.slug}.txt`, [
    header(`Volltext des Vorlesungsskripts (Bachelor Statistik, 3. Semester),
${part.title} — ${span} von ${chaps.length}.
Die uebrigen Kapitel stehen in den Schwesterdateien:
  ${others.join("\n  ")}
Das Glossar am Ende ist in allen Teilen identisch.`),
    ...c.map((n) => blocks.get(n)),
    glossary,
  ]);
}

for (const [p, size] of written) console.log(`${p} — ${size} Bytes`);
console.log(`insgesamt ${nSections} Abschnitte, ${gl.length} Begriffe`);
