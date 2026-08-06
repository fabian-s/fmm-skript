#!/usr/bin/env node
/**
 * Migrations-Gate: vergleicht das semantische Inventar einer TSX-Fassung mit
 * dem der MDX-Fassung.
 *
 *   node mdx/compare.mjs src/chapters/02-algos/S22.tsx src/chapters/02-algos/S22.mdx
 *   node mdx/compare.mjs --strukturell  …   (Prosa-Tokens ignorieren)
 *
 * Exit 0 = gleichwertig. Jeder Unterschied wird mit Index und beiden Seiten
 * ausgegeben, damit klar ist, WO die Konvertierung abgewichen ist.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  inventoryFromTsx,
  inventoryFromMdx,
  diffInventories,
  diffMultiset,
} from "./inventory.mjs";

const args = process.argv.slice(2);
const ignoreText = args.includes("--strukturell");
const [tsxPath, mdxPath] = args.filter((a) => !a.startsWith("--"));

if (!tsxPath || !mdxPath) {
  console.error("Aufruf: node mdx/compare.mjs [--strukturell] <alt.tsx> <neu.mdx>");
  process.exit(2);
}

const root = process.cwd();
const tsx = inventoryFromTsx(readFileSync(tsxPath, "utf8"));
const mdx = await inventoryFromMdx(readFileSync(mdxPath, "utf8"), path.resolve(mdxPath), root);
const count = (inv) => inv.reduce((m, it) => ((m[it.kind] = (m[it.kind] ?? 0) + 1), m), {});

console.log(`TSX: ${tsx.length} Einträge`, count(tsx));
console.log(`MDX: ${mdx.length} Einträge`, count(mdx));

// 1. GATE: nichts darf verschwunden oder verändert sein
const lost = diffMultiset(tsx, mdx, { ignoreText });
console.log(`\n[Gate] Mengenvergleich: ${lost.length === 0 ? "OK" : `${lost.length} Abweichung(en)`}`);
for (const d of lost.slice(0, 40)) console.log(`  ${d.side}: ${d.entry.slice(0, 150)}`);
if (lost.length > 40) console.log(`  … und ${lost.length - 40} weitere`);

// 2. HINWEIS: Reihenfolge. Verschiebungen sind erlaubt, wenn die TSX-Fassung
// z.B. ihr QUIZ-Array an den Dateianfang hoistet — dann ist die Reihenfolge
// verschieden, ohne dass Inhalt fehlt.
const order = diffInventories(tsx, mdx, { ignoreText });
console.log(`[Hinweis] Reihenfolge: ${order.length === 0 ? "identisch" : `${order.length} Verschiebung(en)`}`);
if (order.length && lost.length === 0)
  console.log("  (nichts fehlt — vermutlich nur im TSX hochgezogene Daten, bitte einmal ansehen)");
for (const d of order.slice(0, 10)) {
  console.log(`  [${d.index}] alt: ${d.tsx.slice(0, 120)}`);
  console.log(`       neu: ${d.mdx.slice(0, 120)}`);
}

if (lost.length === 0) {
  console.log(`\nGLEICHWERTIG${ignoreText ? " (Struktur; Prosa nicht verglichen)" : ""}`);
  process.exit(0);
}
process.exit(1);
