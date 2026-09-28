/**
 * Erzeugt src/definitions/<kapitel>/<id>.mdx: je eine Kopie des RUMPFS jeder
 * Definition, jedes Satzes, Lemmas und Korollars mit ID-Label (Familien:
 * PREVIEW_FAMILIES in mdx/numbers.mjs). Daraus baut src/mdx/definitions-mdx.tsx
 * die Vorschaufenster für `:d[Begriff]{#id}` und für @-Verweise.
 *
 * Warum Kopien statt eigener Texte: Das Fenster soll GENAU den Wortlaut des
 * Skripts zeigen, und es gibt nur eine Stelle, an der er gepflegt wird. Die
 * Kapitel werden lazy geladen, deshalb reicht es nicht, zur Laufzeit den
 * DOM-Knoten #env-… zu klonen — er existiert in einem fremden Kapitel nicht.
 *
 * Die Kopien liegen unter src/definitions/<kapitel>/, damit remark-fmm
 * kurze Verweise (@eq:x, @sec:y) im Kontext des Herkunftskapitels auflöst;
 * dort erzeugt es absolute ?k=-Links und keine Anker-IDs (siehe
 * isPreviewFile). Das Verzeichnis ist generiert und nicht eingecheckt.
 *
 * Deterministisch, mtime-stabil (geschrieben wird nur bei Änderung), veraltete
 * Kopien werden gelöscht. Läuft vor dev/build und im Vite-Plugin.
 *
 *   node scripts/gen-definitions.mjs [--check]   (--check: Exit 1, wenn veraltet)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, rmdirSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { loadNumbers, hasPreview } from "../mdx/numbers.mjs";

const DEFAULT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_REL = join("src", "definitions");

const processor = unified().use(remarkParse).use(remarkMath).use(remarkGfm).use(remarkDirective).use(remarkMdx);

/** Rumpf (ohne Label-Absatz) der Container-Direktive, die in Zeile `line` beginnt. */
function bodyAt(src, tree, line) {
  let hit = null;
  visit(tree, "containerDirective", (n) => {
    if (n.position?.start.line === line) {
      hit = n;
      return false;
    }
  });
  if (!hit) return null;
  const kids = hit.children.filter((c) => !c.data?.directiveLabel);
  if (!kids.length) return "";
  return src.slice(kids[0].position.start.offset, kids.at(-1).position.end.offset);
}

/** Soll-Inhalt aller Kopien: Map relPath → Inhalt, dazu Fehler. */
export function buildDefinitions(root = DEFAULT_ROOT) {
  const table = loadNumbers(root);
  const files = new Map();
  const errors = [];
  const trees = new Map();
  for (const [id, env] of Object.entries(table.envs ?? {})) {
    if (!hasPreview(env)) continue;
    if (!trees.has(env.file)) {
      const src = readFileSync(join(root, env.file), "utf8");
      trees.set(env.file, { src, tree: processor.parse(src) });
    }
    const { src, tree } = trees.get(env.file);
    const body = bodyAt(src, tree, env.line);
    if (body == null) {
      errors.push(`${env.file}:${env.line}: keine Umgebung „${id}" gefunden — Nummerntabelle veraltet? npm run gen:numbers`);
      continue;
    }
    if (/^\s*(import|export)\s/m.test(body)) {
      errors.push(`${env.file}:${env.line}: Umgebung „${id}" enthält import/export — im Vorschaufenster nicht kopierbar`);
      continue;
    }
    const meta = {
      id,
      kind: env.kind,
      num: env.num,
      name: env.name ?? null,
      chapter: env.chapter,
      section: env.section,
      anchor: env.anchor,
      source: `${env.file}:${env.line}`,
    };
    files.set(
      join(OUT_REL, env.chapter, `${id}.mdx`),
      `export const meta = ${JSON.stringify(meta)};\n\n${body.trim()}\n`
    );
  }
  return { files, errors };
}

function listMdx(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => join(e.parentPath ?? e.path, e.name));
}

/**
 * Kopien erzeugen. Rückgabe { changed, written, removed, errors, count }.
 * Mit write=false wird nur verglichen.
 */
export function generateDefinitions(root = DEFAULT_ROOT, { write = true } = {}) {
  const { files, errors } = buildDefinitions(root);
  const outDir = join(root, OUT_REL);
  const written = [];
  const removed = [];
  if (errors.length) return { changed: false, written, removed, errors, count: files.size };
  for (const [rel, content] of files) {
    const abs = join(root, rel);
    if (existsSync(abs) && readFileSync(abs, "utf8") === content) continue;
    written.push(rel);
    if (write) {
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, content);
    }
  }
  for (const abs of listMdx(outDir)) {
    const rel = relative(root, abs);
    if (files.has(rel)) continue;
    removed.push(rel);
    if (write) rmSync(abs);
  }
  if (write && existsSync(outDir))
    for (const e of readdirSync(outDir, { withFileTypes: true }))
      if (e.isDirectory() && !readdirSync(join(outDir, e.name)).length) rmdirSync(join(outDir, e.name));
  return { changed: written.length + removed.length > 0, written, removed, errors, count: files.size };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const check = process.argv.includes("--check");
  const r = generateDefinitions(DEFAULT_ROOT, { write: !check });
  for (const e of r.errors) console.error(`gen-definitions: FEHLER ${e}`);
  if (r.errors.length) process.exit(1);
  console.log(
    `gen-definitions: ${r.count} Vorschau-Kopien → ${OUT_REL}` +
      (r.changed ? ` (${r.written.length} geschrieben, ${r.removed.length} gelöscht)` : " (unverändert)")
  );
  if (check && r.changed) {
    console.error("gen-definitions --check: Kopien sind nicht aktuell — npm run gen:definitions");
    process.exit(1);
  }
}
