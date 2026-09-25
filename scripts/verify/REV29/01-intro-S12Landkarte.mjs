#!/usr/bin/env node
/**
 * REV29 — src/chapters/01-intro/widgets/S12Landkarte.tsx (KursKarte).
 *
 * Der Header behauptete 13 Kapitel, 3 Vorwissensknoten und 30 Abhängigkeiten,
 * ohne Nachweis; die einzige bis dahin existierende „Prüfung" der Karte war
 * assert.equal(15, 15). Hier werden Knoten und Kanten aus der Quelle
 * rekonstruiert und gegen die Kapitel-Registry gehalten.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/01-intro/widgets/S12Landkarte.tsx"), "utf8");
const registry = readFileSync(join(repo, "src/chapters/index.ts"), "utf8");

/* ------------------------------------------------------------- Kapitel */

const kapitelNummern = [...registry.matchAll(/^\s{4}num: (\d+),$/gm)].map((m) => Number(m[1]));
assert.equal(kapitelNummern.length, 13, "Registry führt nicht 13 Kapitel");
assert.deepEqual(kapitelNummern, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

// Zu jedem Kapitel gibt es einen Kurztitel für den Kasten.
const kurz = [...src.matchAll(/^\s{2}(\d+): "/gm)].map((m) => Number(m[1]));
assert.deepEqual(kurz, kapitelNummern, "KURZ deckt nicht genau die Kapitel der Registry ab");

/* --------------------------------------------------------- Vorwissen */

const vorwissenBlock = /const vorwissen: FlowNode\[\] = \[([\s\S]*?)\n\];/.exec(src)?.[1] ?? "";
const vorwissenIds = [...vorwissenBlock.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]);
assert.deepEqual(vorwissenIds, ["LA", "AN", "R"], "3 Vorwissensknoten erwartet");

/* ------------------------------------------------------------- Kanten */

const edgeBlock = /const edges: FlowEdge\[\] = \[([\s\S]*?)\n\];/.exec(src)?.[1] ?? "";
assert.ok(edgeBlock.length > 0, "Kantenliste nicht gefunden");

const explizit = [...edgeBlock.matchAll(/from: "([^"]+)", to: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
const kette = Number(/Array\.from\(\{ length: (\d+) \}/.exec(edgeBlock)?.[1]);
assert.equal(kette, 11, "Lesereihenfolge deckt nicht 11 Kanten ab (1→2 … 12→13)");

const edges = [
  ...explizit,
  ...Array.from({ length: kette }, (_, i) => [String(i + 1), String(i + 2)]),
];
assert.equal(edges.length, 30, `30 Abhängigkeiten erwartet, gezählt ${edges.length}`);

// Aufschlüsselung wie im Header: 5 Vorwissenskanten + 11 Lesereihenfolge + 14 Bögen.
const vorwissenKanten = edges.filter(([a]) => vorwissenIds.includes(a));
assert.equal(vorwissenKanten.length, 5);
assert.equal(edges.length - vorwissenKanten.length - kette, 14);

// Kein Knoten außerhalb von Vorwissen ∪ Kapitel, keine Kante ins Leere.
const bekannt = new Set([...vorwissenIds, ...kapitelNummern.map(String)]);
for (const [a, b] of edges) {
  assert.ok(bekannt.has(a) && bekannt.has(b), `Kante ${a} → ${b} zeigt auf einen unbekannten Knoten`);
}
// Keine Duplikate: sonst wäre die 30 doppelt gezählt.
assert.equal(new Set(edges.map((e) => e.join("→"))).size, 30);

/* ------------------------------ Die widgetabhängige Selbsttestfrage (H4) */

const nachfolgerVon6 = edges.filter(([a]) => a === "6").map(([, b]) => b).sort();
assert.deepEqual(nachfolgerVon6, ["7", "8", "9"]);

const mdx = readFileSync(join(repo, "src/chapters/01-intro/S12.mdx"), "utf8");
const loesung = Number(/:::zahlfrage\{loesung=(\d+)/.exec(mdx)?.[1]);
assert.equal(
  loesung,
  nachfolgerVon6.length,
  "die Selbsttestlösung in S12.mdx passt nicht mehr zur Kantenliste der Karte",
);

console.log("REV29 01-intro-S12Landkarte: ok");
