#!/usr/bin/env node
/**
 * Wortzählung für den Straffungs-Durchgang 2026-09-25.
 *
 * Zählt je MDX-Datei alle Wörter (Leerzeichen-getrennt, inkl. Mathe und
 * Markup — grob, aber über die Zeit konsistent) und davon die Wörter
 * innerhalb von :::vertiefung-Blöcken (beliebige Fence-Stufe).
 * „Haupttext" = gesamt − Vertiefung = das, was bei zugeklappten
 * Vertiefungen zu lesen ist.
 *
 *   node reviews/straffung-2026-09-25/zaehlen.mjs                 Kapitelübersicht vs. Ausgangsstand
 *   node reviews/straffung-2026-09-25/zaehlen.mjs 10-differentialrechnung   je Datei
 *   node reviews/straffung-2026-09-25/zaehlen.mjs concepts        je Konzept-Pop-up
 *   node reviews/straffung-2026-09-25/zaehlen.mjs --write-baseline
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const chaptersDir = join(root, "src", "chapters");
const conceptsDir = join(root, "src", "concepts");
const baselineFile = join(here, "baseline.json");

function countFile(path) {
  const lines = readFileSync(path, "utf8").split("\n");
  let total = 0, vt = 0, fence = null;
  for (const line of lines) {
    const w = line.split(/\s+/).filter(Boolean).length;
    total += w;
    if (fence === null) {
      const m = line.match(/^(:{3,})vertiefung\[/);
      if (m) { fence = m[1]; vt += w; }
    } else {
      vt += w;
      if (line.trim() === fence) fence = null;
    }
  }
  return { total, vt, main: total - vt };
}

function snapshot() {
  const snap = { chapters: {}, concepts: {} };
  for (const d of readdirSync(chaptersDir).filter((d) => /^\d\d-/.test(d)).sort()) {
    snap.chapters[d] = {};
    for (const f of readdirSync(join(chaptersDir, d)).filter((f) => f.endsWith(".mdx")).sort())
      snap.chapters[d][f] = countFile(join(chaptersDir, d, f));
  }
  for (const f of readdirSync(conceptsDir).filter((f) => f.endsWith(".mdx")).sort())
    snap.concepts[f] = countFile(join(conceptsDir, f));
  return snap;
}

const sum = (o) => Object.values(o).reduce((a, x) => ({ total: a.total + x.total, vt: a.vt + x.vt, main: a.main + x.main }), { total: 0, vt: 0, main: 0 });
const pct = (a, b) => (b ? `${a >= b ? "+" : ""}${(100 * (a - b) / b).toFixed(1)} %` : "neu");
const pad = (s, n) => String(s).padStart(n);

const arg = process.argv[2];
const now = snapshot();
if (arg === "--write-baseline") {
  writeFileSync(baselineFile, JSON.stringify(now, null, 1) + "\n");
  console.log(`Ausgangsstand geschrieben: ${baselineFile}`);
  process.exit(0);
}
const base = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, "utf8")) : now;

function row(name, n, b) {
  return `${name.padEnd(30)} Haupttext ${pad(b.main, 6)} → ${pad(n.main, 6)} (${pad(pct(n.main, b.main), 8)})   ` +
    `Vertiefung ${pad(b.vt, 5)} → ${pad(n.vt, 5)}   gesamt ${pad(b.total, 6)} → ${pad(n.total, 6)} (${pad(pct(n.total, b.total), 8)})`;
}

if (!arg) {
  let N = { total: 0, vt: 0, main: 0 }, B = { total: 0, vt: 0, main: 0 };
  for (const d of Object.keys(now.chapters)) {
    const n = sum(now.chapters[d]), b = sum(base.chapters[d] ?? {});
    console.log(row(d, n, b));
    for (const k of ["total", "vt", "main"]) { N[k] += n[k]; B[k] += b[k]; }
  }
  console.log(row("SUMME Kapitel", N, B));
  const cn = sum(now.concepts), cb = sum(base.concepts);
  console.log(row("Konzept-Pop-ups", cn, cb));
} else if (arg === "concepts") {
  for (const f of Object.keys(now.concepts)) {
    const n = now.concepts[f], b = base.concepts[f] ?? { total: 0 };
    console.log(`${f.padEnd(40)} ${pad(b.total, 4)} → ${pad(n.total, 4)} (${pct(n.total, b.total)})`);
  }
  const cn = sum(now.concepts), cb = sum(base.concepts);
  console.log(`SUMME ${cb.total} → ${cn.total} (${pct(cn.total, cb.total)})`);
} else {
  const d = now.chapters[arg];
  if (!d) { console.error(`Unbekanntes Kapitel: ${arg}`); process.exit(1); }
  for (const f of Object.keys(d)) console.log(row(f, d[f], base.chapters[arg]?.[f] ?? { total: 0, vt: 0, main: 0 }));
  console.log(row("SUMME", sum(d), sum(base.chapters[arg] ?? {})));
}
