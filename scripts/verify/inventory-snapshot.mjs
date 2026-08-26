#!/usr/bin/env node
/**
 * Orakel-Schnappschuss: inventoryFromMdx() (mdx/inventory.mjs) über ALLE
 * Abschnitts-MDX, als JSON gespeichert oder gegen einen gespeicherten Stand
 * verglichen. Das ist das Migrations-Gate der automatischen Nummerierung:
 * Werkzeugkette ändern (oder Quellen migrieren) → die Fingerabdrücke
 * `env <Art> <Label>`, `eq(<tag>) …`, `h3#sec-… Titel` und die Prosa müssen
 * gleich bleiben (bis auf erwartete, per --allow whitelistete Änderungen).
 *
 *   node scripts/verify/inventory-snapshot.mjs --write <datei> [--root <repo>]
 *   node scripts/verify/inventory-snapshot.mjs --compare <datei> [--root <repo>] [--allow <regel>…]
 *
 * --root zeigt auf den Repo-Stand, dessen Werkzeugkette UND Quellen benutzt
 * werden (z. B. ein `git worktree` von HEAD als Referenz). Ohne Argumente
 * (so ruft es scripts/verify/run-all.mjs auf) tut das Skript nichts.
 *
 * --allow <regel>: erwartete Unterschiede ausblenden. Regeln:
 *   link-wrap   „Prosa Satz 12.5.7" → „link #env-… „Satz 12.5.7"" (Stufe 2 der Migration)
 *   heading-id  h3#sec-2.5.1 → h3#sec-<slug> bei gleichem Text (Stufe 5)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const flag = (n) => {
  const i = argv.indexOf(n);
  return i >= 0 ? argv[i + 1] : null;
};
const root = resolve(flag("--root") ?? process.cwd());
const writeTo = flag("--write");
const compareTo = flag("--compare");
const allow = new Set(argv.flatMap((a, i) => (a === "--allow" ? [argv[i + 1]] : [])));

if (!writeTo && !compareTo) {
  console.log("inventory-snapshot: nichts zu tun (--write <datei> oder --compare <datei>)");
  process.exit(0);
}

const { inventoryFromMdx, inventoryKey } = await import(pathToFileURL(join(root, "mdx", "inventory.mjs")).href);
const { readChapters, readSections } = await import(pathToFileURL(join(root, "scripts", "lib", "registry.mjs")).href).catch(
  () => import(pathToFileURL(join(process.cwd(), "scripts", "lib", "registry.mjs")).href)
);

const snapshot = {};
for (const ch of readChapters(root)) {
  for (const s of readSections(root, ch)) {
    const rel = `src/chapters/${ch.id}/${s.file}`;
    const abs = join(root, rel);
    const inv = await inventoryFromMdx(readFileSync(abs, "utf8"), abs, root);
    snapshot[rel] = inv.map(inventoryKey);
  }
}

if (writeTo) {
  writeFileSync(writeTo, JSON.stringify(snapshot, null, 1) + "\n");
  const n = Object.values(snapshot).reduce((a, b) => a + b.length, 0);
  console.log(`inventory-snapshot: ${Object.keys(snapshot).length} Dateien, ${n} Einträge → ${writeTo}`);
  process.exit(0);
}

const ref = JSON.parse(readFileSync(compareTo, "utf8"));

/**
 * Erlaubte Änderungen werden durch NORMALISIERUNG beider Seiten unsichtbar
 * gemacht (nicht durch paarweises Verzeihen: ein aufgesplitteter Prosalauf
 * verschiebt sonst alle folgenden Indizes).
 *   link-wrap:  Verweis-Links (#env-/#eq-/#sec-/?k=) werden zu Text, und
 *               aufeinanderfolgende Textstücke mit gleichem Elternpfad zu
 *               EINEM Lauf verschmolzen — genau das, was inventory.mjs aus
 *               der alten Prosa ohne Links gemacht hat.
 *   heading-id: h3#sec-<irgendwas> → h3#sec-* bei gleichem Text.
 */
const ENTRY = /^(text|link (?:\?k=[^ ]+)?#(?:env|eq|sec|chap)-[^ ]+ „([^]*?)")\s?([^]*?)( in [^]*)?$/;
function normalize(entries) {
  if (!allow.size) return entries;
  const out = [];
  let run = null; // { text, where }
  const flush = () => {
    if (!run) return;
    out.push(`text ${run.text.replace(/\s+/g, " ").trim()}${run.where}`);
    run = null;
  };
  for (let e of entries) {
    if (allow.has("heading-id")) e = e.replace(/^(h\d)#sec-[^ ]+ /, "$1#sec-* ");
    const m = allow.has("link-wrap") ? ENTRY.exec(e) : null;
    if (!m) {
      flush();
      out.push(e);
      continue;
    }
    const isLink = m[1] !== "text";
    const text = isLink ? m[2] : m[3];
    const where = m[4] ?? "";
    if (run && run.where === where) run.text += " " + text;
    else {
      flush();
      run = { text, where };
    }
  }
  flush();
  return out;
}

let bad = 0;
const files = new Set([...Object.keys(ref), ...Object.keys(snapshot)]);
for (const f of [...files].sort()) {
  const a = ref[f] && normalize(ref[f]);
  const b = snapshot[f] && normalize(snapshot[f]);
  if (!a || !b) {
    console.log(`${f}: ${!a ? "neu" : "fehlt"}`);
    bad++;
    continue;
  }
  const diffs = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const ka = a[i] ?? "«fehlt»";
    const kb = b[i] ?? "«fehlt»";
    if (ka === kb) continue;
    diffs.push({ i, ka, kb });
  }
  if (diffs.length) {
    bad += diffs.length;
    console.log(`${f}: ${diffs.length} Abweichung(en)`);
    for (const d of diffs.slice(0, 5)) console.log(`   [${d.i}]\n     alt: ${d.ka.slice(0, 160)}\n     neu: ${d.kb.slice(0, 160)}`);
  }
}
if (bad) {
  console.error(`inventory-snapshot: ${bad} Abweichung(en) gegenüber ${compareTo}`);
  process.exit(1);
}
console.log(`inventory-snapshot: identisch mit ${compareTo} (${files.size} Dateien)`);
