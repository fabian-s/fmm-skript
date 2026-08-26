#!/usr/bin/env node
/**
 * lint-numbers — findet handgeschriebene Nummern, die kein Zähler sieht:
 *
 *   1. Widget-TSX (src/chapters/** /*.tsx): „Satz 8.1.4", „(11.3.4)" in
 *      GERENDERTEN Strings (String-/Template-Literale, JSX-Text). Kommentare
 *      werden ignoriert. Solche Strings zeigen nach der ersten Einfügung
 *      still falsche Nummern — deshalb gehören sie auf ref()/num() aus
 *      src/chapters/numbers.generated.ts umgestellt (AP7 der Migration).
 *   2. Abschnitts-MDX: Textverweise ohne @ — „Satz 3.4.7", „($8.3.1$)",
 *      „(7.1.1)", „Gleichung $x$", [Abschnitt 12.3](#sec-12.3), [Kapitel 7](?k=…).
 *
 * Bis zur Migration (AP7) nur WARNUNG (Exit 0); danach Fehler: --strict.
 *
 *   node scripts/lint-numbers.mjs [--strict] [--quiet]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as babelParse } from "@babel/parser";
import _traverse from "@babel/traverse";

const traverse = _traverse.default ?? _traverse;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const strict = argv.includes("--strict");
const quiet = argv.includes("--quiet");

const KINDS = "Satz|Sätze|Sätzen|Definition|Definitionen|Lemma|Lemmata|Korollar|Korollare|Beispiel|Beispiele|Beispielen|Bemerkung|Bemerkungen|Algorithmus|Algorithmen|Theorem";
const NUM = "\\d+\\.\\d+\\.\\d+";
const TSX_RE = new RegExp(`\\b(?:${KINDS})\\s+${NUM}\\b|\\(${NUM}\\)`, "g");
const MDX_RES = [
  [new RegExp(`\\b(?:${KINDS})\\s+${NUM}\\b`, "g"), "Env-Verweis"],
  [new RegExp(`\\(\\$${NUM}\\$\\)|\\(${NUM}\\)|Gleichung\\s+\\$?${NUM}\\$?`, "g"), "Gleichungsverweis"],
  [/\[(?:Abschnitt|Kapitel)[^\]]*\]\((?:\?k=[^)#]+)?(?:#sec-[^)]+)?\)/g, "Abschnitts-/Kapitellink"],
];

function* walk(dir, ext) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p, ext);
    else if (e.isFile() && e.name.endsWith(ext) && !e.name.includes(".mdx-check.")) yield p;
  }
}

const findings = [];

/* ---- 1. TSX: nur gerenderte Strings ------------------------------- */
for (const file of walk(join(root, "src", "chapters"), ".tsx")) {
  const code = readFileSync(file, "utf8");
  let ast;
  try {
    ast = babelParse(code, { sourceType: "module", plugins: ["typescript", "jsx"], errorRecovery: true });
  } catch (e) {
    findings.push({ file, line: 0, kind: "TSX nicht parsebar", text: String(e.message).split("\n")[0] });
    continue;
  }
  const check = (value, node) => {
    for (const m of String(value).matchAll(TSX_RE))
      findings.push({ file, line: node.loc?.start.line ?? 0, kind: "TSX-String", text: m[0] });
  };
  traverse(ast, {
    StringLiteral: ({ node }) => check(node.value, node),
    TemplateElement: ({ node }) => check(node.value.cooked ?? node.value.raw, node),
    JSXText: ({ node }) => check(node.value, node),
  });
}

/* ---- 2. MDX: Textverweise ohne @ ---------------------------------- */
// Code-Fences und Zeilen mit MDX-Kommentaren werden ausgelassen; ein
// Verweis in einem Env-LABEL (:::satz[3.4.7 …]) ist kein Verweis.
for (const file of walk(join(root, "src", "chapters"), ".mdx")) {
  const lines = readFileSync(file, "utf8").split("\n");
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence || /^\s*:::+\s*[a-z]+\[/.test(line) || /^\s*\{\/\*/.test(line)) return;
    for (const [re, kind] of MDX_RES)
      for (const m of line.matchAll(re)) findings.push({ file, line: i + 1, kind, text: m[0] });
  });
}

/* ---- Bericht ------------------------------------------------------ */
const byKind = new Map();
for (const f of findings) byKind.set(f.kind, (byKind.get(f.kind) ?? 0) + 1);
const files = new Set(findings.map((f) => f.file));
if (!quiet)
  for (const f of findings.slice(0, strict ? findings.length : 15))
    console.log(`  ${relative(root, f.file)}:${f.line}  ${f.kind}: ${f.text}`);
if (findings.length) {
  const summary = [...byKind].map(([k, n]) => `${k} ${n}`).join(", ");
  console.log(
    `lint-numbers: ${findings.length} handgeschriebene Nummer(n) in ${files.size} Datei(en) — ${summary}` +
      (strict ? "" : " (nur Warnung bis AP7; Details: node scripts/lint-numbers.mjs)")
  );
  if (strict) process.exit(1);
} else {
  console.log("lint-numbers: keine handgeschriebenen Nummern.");
}
