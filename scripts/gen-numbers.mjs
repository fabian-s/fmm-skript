/**
 * Erzeugt src/chapters/numbers.generated.json (+ .ts): die Nummerntabelle
 * ALLER Umgebungen, Gleichungen, nummerierten Unterüberschriften und
 * Abschnitte des Skripts, in Dokumentreihenfolge gezählt.
 *
 * Zählkonvention (exakt wie die bisherige Handnummerierung):
 *   - Abschnitt K.k: K aus der Registry (num), k aus der Position in
 *     src/chapters/<kap>/index.ts.
 *   - EIN Zähler über alle Env-Typen je Abschnitt (K.k.n, n ab 1),
 *     ein zweiter für Gleichungen, ein dritter für nummerierte
 *     Unterüberschriften. Vertiefungen zählen mit.
 *   - Handnummerierte Labels (:::satz[12.5.7 …], {#eq-12.5.3}, ### 2.5.1 …)
 *     werden mit ihrer Nummer als ID registriert und belegen sie;
 *     ID-Labels (:::satz[#kkt …], {#eq-kkt}, ### … :id[x]) bekommen die
 *     nächste FREIE Nummer in Dokumentreihenfolge. Beides darf in einer
 *     Datei gemischt vorkommen (stufenweise Migration).
 *
 * Deterministisch, mtime-stabil: geschrieben wird nur, wenn sich der Inhalt
 * ändert (sonst lädt Vite grundlos neu). Läuft vor dev/build (package.json)
 * und im Vite-Plugin bei jeder MDX-Änderung; das Ergebnis ist eingecheckt.
 *
 *   node scripts/gen-numbers.mjs [--check]     (--check: nur prüfen, Exit 1 bei Abweichung)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { readChapters, readSections } from "./lib/registry.mjs";
import {
  ENV_KIND,
  parseEnvLabel,
  parseEqMeta,
  takeHeadingId,
  isValidId,
  formatEnvLabel,
} from "../mdx/numbers.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(here, "..");

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkMdx);

function plain(node) {
  if (!node) return "";
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (node.type === "inlineMath") return "";
  return (node.children ?? []).map(plain).join("");
}

/** Label-Absatz einer Direktive lesen (ohne den Baum zu verändern). */
function labelOf(node) {
  const first = node.children?.[0];
  if (!first?.data?.directiveLabel) return node.attributes?.label ?? null;
  return plain(first).trim();
}

/**
 * Alle nummerierbaren Objekte einer Datei in Dokumentreihenfolge.
 * Rückgabe: [{ ns: "envs"|"eqs"|"subs", legacy, id|num, …, line }]
 */
export function scanFile(src, relPath) {
  const tree = processor.parse(src);
  const items = [];
  const errors = [];
  const err = (node, msg) => errors.push(`${relPath}:${node?.position?.start?.line ?? "?"}: ${msg}`);

  visit(tree, (node) => {
    const line = node.position?.start?.line ?? 0;
    if (node.type === "containerDirective" && ENV_KIND[node.name]) {
      const raw = labelOf(node);
      if (raw == null) return; // remark-fmm meldet das fehlende Label
      const p = parseEnvLabel(raw);
      const base = { ns: "envs", kind: ENV_KIND[node.name], directive: node.name, line };
      if (p.form === "legacy") items.push({ ...base, legacy: true, num: p.num, name: p.name });
      else if (p.form === "id") {
        if (!isValidId(p.id)) err(node, `Env-ID „${p.id}" — erlaubt sind a-z, 0-9, - (nicht rein numerisch)`);
        else items.push({ ...base, legacy: false, id: p.id, name: p.name });
      }
      // "unnumbered"/"free": keine Nummer, nichts zu registrieren
      return;
    }
    if (node.type === "math") {
      const p = parseEqMeta(node.meta);
      if (!p) return;
      if (p.error) return; // remark-fmm meldet es
      items.push(p.legacy ? { ns: "eqs", legacy: true, num: p.id, line } : { ns: "eqs", legacy: false, id: p.id, line });
      return;
    }
    if (node.type === "heading") {
      // Kopie, damit takeHeadingId den Baum hier nicht beschneiden muss
      const copy = { ...node, children: [...(node.children ?? [])] };
      const h = takeHeadingId(copy, plain);
      if (h.error) return err(node, h.error);
      if (h.legacy) items.push({ ns: "subs", legacy: true, num: h.legacy, title: plain(node).trim().replace(/^\d+(?:\.\d+)*\s*/, ""), depth: node.depth, line });
      else if (h.id) items.push({ ns: "subs", legacy: false, id: h.id, title: plain(copy).trim(), depth: node.depth, line });
    }
  });
  return { items, errors };
}

/** Zähler je Namensraum: Handnummern belegen, IDs füllen die Lücken in Reihenfolge. */
export function assignNumbers(items, secNum, relPath, errors, warnings) {
  const out = [];
  for (const ns of ["envs", "eqs", "subs"]) {
    const mine = items.filter((it) => it.ns === ns);
    const taken = new Set();
    let lastLegacy = 0;
    for (const it of mine) {
      if (!it.legacy) continue;
      const prefix = it.num.slice(0, it.num.lastIndexOf("."));
      if (prefix !== secNum)
        errors.push(`${relPath}:${it.line}: Handnummer ${it.num} passt nicht zum Abschnitt ${secNum}`);
      if (taken.has(it.num)) errors.push(`${relPath}:${it.line}: Nummer ${it.num} ist in dieser Datei doppelt`);
      taken.add(it.num);
      const n = Number(it.num.slice(it.num.lastIndexOf(".") + 1));
      if (n <= lastLegacy) warnings.push(`${relPath}:${it.line}: Handnummer ${it.num} nicht aufsteigend`);
      lastLegacy = n;
    }
    let n = 1;
    for (const it of mine) {
      if (it.legacy) {
        out.push(it);
        continue;
      }
      while (taken.has(`${secNum}.${n}`)) n++;
      out.push({ ...it, num: `${secNum}.${n}` });
      n++;
    }
  }
  return out;
}

const sortKeys = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));

export function buildTable(root = DEFAULT_ROOT) {
  const errors = [];
  const warnings = [];
  const table = { version: 1, chapters: {}, sections: {}, envs: {}, eqs: {}, subs: {} };
  const chapters = readChapters(root);
  const sectionKeys = new Map(); // key → chapter (für Kollision mit Unterüberschriften-IDs)

  for (const ch of chapters) {
    table.chapters[ch.key] = { id: ch.id, num: ch.num, title: ch.title };
    const sections = readSections(root, ch);
    for (const s of sections) {
      const relPath = `src/chapters/${ch.id}/${s.file}`;
      if (s.key) {
        table.sections[`${ch.key}/${s.key}`] = {
          num: s.num,
          chapter: ch.id,
          key: s.key,
          title: s.title,
          anchor: `sec-${s.num}`,
          file: relPath,
        };
        sectionKeys.set(s.key, ch.id);
      }
      if (s.id !== s.num)
        warnings.push(`${ch.id}/index.ts: Abschnitt „${s.title}" trägt id ${s.id}, steht aber an Position ${s.num}`);
      const abs = join(root, relPath);
      if (!existsSync(abs)) {
        errors.push(`${relPath}: Datei fehlt`);
        continue;
      }
      const { items, errors: fileErrors } = scanFile(readFileSync(abs, "utf8"), relPath);
      errors.push(...fileErrors);
      for (const it of assignNumbers(items, s.num, relPath, errors, warnings)) {
        const id = it.legacy ? it.num : it.id;
        const common = { num: it.num, chapter: ch.id, section: s.num, file: relPath, line: it.line, legacy: it.legacy };
        const bag = table[it.ns];
        if (bag[id]) {
          errors.push(`${relPath}:${it.line}: ID „${id}" (${it.ns}) ist schon vergeben in ${bag[id].file}:${bag[id].line}`);
          continue;
        }
        if (it.ns === "envs")
          bag[id] = { ...common, kind: it.kind, directive: it.directive, name: it.name, label: formatEnvLabel(it.num, it.name), anchor: it.legacy ? null : `env-${id}` };
        else if (it.ns === "eqs") bag[id] = { ...common, anchor: it.legacy ? `eq-${it.num}` : `eq-${id}` };
        else bag[id] = { ...common, title: it.title, depth: it.depth, anchor: it.legacy ? `sec-${it.num}` : `sec-${id}` };
      }
    }
  }
  for (const [id, sub] of Object.entries(table.subs))
    if (!sub.legacy && sectionKeys.has(id))
      errors.push(`${sub.file}:${sub.line}: Überschriften-ID „${id}" kollidiert mit dem Abschnitts-key in ${sectionKeys.get(id)} — @sec:${id} wäre mehrdeutig`);
  for (const ns of ["envs", "eqs", "subs"]) table[ns] = sortKeys(table[ns]);
  table.sections = sortKeys(table.sections);
  return { table, errors, warnings };
}

/* ---- Ausgabe: JSON + TS ------------------------------------------- */

function tsSource(table) {
  // Nur ID-Einträge: Handnummern stehen wörtlich im Code, die brauchen keinen Helfer.
  const entries = [];
  for (const [id, e] of Object.entries(table.envs))
    if (!e.legacy) entries.push([`${e.directive}:${id}`, e.num, `${e.kind} ${e.num}`]);
  for (const [id, e] of Object.entries(table.eqs)) if (!e.legacy) entries.push([`eq:${id}`, e.num, `(${e.num})`]);
  for (const [id, e] of Object.entries(table.subs)) if (!e.legacy) entries.push([`sec:${id}`, e.num, `Abschnitt ${e.num}`]);
  for (const [k, e] of Object.entries(table.sections)) entries.push([`sec:${k}`, e.num, `Abschnitt ${e.num}`]);
  for (const [k, e] of Object.entries(table.chapters)) entries.push([`kap:${k}`, String(e.num), `Kapitel ${e.num}`]);
  entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const keyType = entries.length ? entries.map(([k]) => `  | ${JSON.stringify(k)}`).join("\n") : "  never";
  const rows = entries.map(([k, n, t]) => `  ${JSON.stringify(k)}: [${JSON.stringify(n)}, ${JSON.stringify(t)}],`).join("\n");
  return `/* GENERIERT von scripts/gen-numbers.mjs — nicht von Hand bearbeiten.
 * Neu erzeugen: npm run gen:numbers (läuft auch vor dev und build).
 *
 * Nummern für Widget-TSX: statt „… aus Satz 12.5.7" schreibe
 *   import { ref, num } from "../../numbers.generated";
 *   \`… aus \${ref("satz:kkt")}\`        → "… aus Satz 12.5.7"
 *   num("eq:kkt-stationaritaet")       → "12.5.3"
 * Schlüssel: <direktive>:<id> (satz:, definition:, …), eq:<id>, sec:<kap>/<key>,
 * sec:<überschriften-id>, kap:<kap>. Unbekannte Schlüssel sind ein Typfehler.
 */
export type NumKey =
${keyType};

/** [Nummer, Verweistext] je Schlüssel. */
export const NUMBERS: Record<NumKey, readonly [string, string]> = {
${rows}
};

/** Nur die Nummer, z. B. num("satz:kkt") → "12.5.7". */
export function num(key: NumKey): string {
  return NUMBERS[key][0];
}

/** Verweistext mit Art, z. B. ref("satz:kkt") → "Satz 12.5.7", ref("eq:x") → "(12.5.3)". */
export function ref(key: NumKey): string {
  return NUMBERS[key][1];
}
`;
}

function writeIfChanged(file, content) {
  const old = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (old === content) return false;
  writeFileSync(file, content);
  return true;
}

/**
 * Tabelle erzeugen und schreiben. Rückgabe { table, changed, errors, warnings }.
 * `changed` heißt: die JSON hat sich inhaltlich geändert (Vite-Plugin nutzt
 * das für den Full-Reload).
 */
export function generateNumbers(root = DEFAULT_ROOT, { write = true } = {}) {
  const { table, errors, warnings } = buildTable(root);
  const json = JSON.stringify(table, null, 1) + "\n";
  const jsonFile = join(root, "src", "chapters", "numbers.generated.json");
  const tsFile = join(root, "src", "chapters", "numbers.generated.ts");
  let changed = false;
  if (write && !errors.length) {
    changed = writeIfChanged(jsonFile, json);
    writeIfChanged(tsFile, tsSource(table));
  } else if (!write) {
    changed = !existsSync(jsonFile) || readFileSync(jsonFile, "utf8") !== json;
  }
  return { table, changed, errors, warnings, json };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const check = process.argv.includes("--check");
  const { table, changed, errors, warnings } = generateNumbers(DEFAULT_ROOT, { write: !check });
  for (const w of warnings) console.warn(`gen-numbers: WARNUNG ${w}`);
  for (const e of errors) console.error(`gen-numbers: FEHLER ${e}`);
  if (errors.length) process.exit(1);
  const count = (ns, legacy) => Object.values(table[ns]).filter((e) => e.legacy === legacy).length;
  const rel = relative(process.cwd(), join(DEFAULT_ROOT, "src", "chapters", "numbers.generated.json"));
  console.log(
    `gen-numbers: ${Object.keys(table.chapters).length} Kapitel, ${Object.keys(table.sections).length} Abschnitte mit key, ` +
      `Envs ${count("envs", false)} ID / ${count("envs", true)} Hand, Gleichungen ${count("eqs", false)} / ${count("eqs", true)}, ` +
      `Unterüberschriften ${count("subs", false)} / ${count("subs", true)} → ${rel}${changed ? "" : " (unverändert)"}`
  );
  if (check && changed) {
    console.error("gen-numbers --check: Tabelle ist nicht aktuell — npm run gen:numbers");
    process.exit(1);
  }
}
