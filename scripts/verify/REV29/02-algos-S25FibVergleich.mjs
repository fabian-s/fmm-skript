#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/S25FibVergleich.tsx.
 *
 * Unabhängiger Rechenweg: T(n) wird hier über die geschlossene Form
 * T(n) = 2·F(n+1) − 1 aus den Fibonacci-Zahlen (BigInt) gebildet, das Widget
 * über die Rekurrenz T(n) = 1 + T(n−1) + T(n−2). Beide müssen für alle
 * erreichbaren Reglerwerte n = 10 … 80 übereinstimmen.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/02-algos/widgets/S25FibVergleich.tsx"), "utf8");

/* --------------------------------------------------- zwei Rechenwege für T */

const N = 100;
const rek = [1n, 1n];
for (let n = 2; n <= N; n++) rek[n] = 1n + rek[n - 1] + rek[n - 2];

const F = [0n, 1n];
for (let n = 2; n <= N + 1; n++) F[n] = F[n - 1] + F[n - 2];
const geschlossen = (n) => 2n * F[n + 1] - 1n;

for (let n = 0; n <= N; n++) assert.equal(rek[n], geschlossen(n), `T(${n})`);

assert.equal(rek[20], 21891n);
assert.equal(rek[30], 2692537n);
assert.equal(rek[50], 40730022147n);
assert.equal(rek[80], 75778124746287811n);
assert.equal(rek[100], 1146295688027634168201n);

/* Der Regler läuft von 10 bis 80: dort ist T(n) ab n = 76 größer als 2^53,
   deshalb muss die Ablesezeile aus BigInt kommen. */
const REGLER_MIN = Number(/min=\{(\d+)\}\s*\n\s*max=\{(\d+)\}/.exec(src)?.[1]);
const REGLER_MAX = Number(/min=\{(\d+)\}\s*\n\s*max=\{(\d+)\}/.exec(src)?.[2]);
assert.equal(REGLER_MIN, 10);
assert.equal(REGLER_MAX, 80);
const erstesUngenau = [...Array(N + 1).keys()].find((n) => BigInt(Number(rek[n])) !== rek[n]);
assert.ok(erstesUngenau <= REGLER_MAX, "T(n) bleibt im Reglerbereich exakt darstellbar?");
assert.equal(erstesUngenau, 76, "erster nicht mehr exakt darstellbarer Wert");
assert.ok(/const TExakt: bigint\[\]/.test(src), "T wird nicht mehr in BigInt gezählt");
assert.notEqual(
  BigInt(Number(rek[80])),
  rek[80],
  "die Double-Darstellung von T(80) ist wider Erwarten exakt",
);

/* --------------------------------------------------------- Modellzeiten */

const jahre = (ops) => Number(ops) / 1e9 / 3.156e7;
assert.ok(Math.abs(Number(rek[30]) / 1e9 * 1e3 - 2.692537) < 1e-6); // 2,7 ms
assert.ok(Math.abs(Number(rek[50]) / 1e9 - 40.73) < 0.01); // 41 s
assert.ok(Math.abs(jahre(rek[80]) - 2.4011) < 1e-3);
assert.ok(Math.abs(jahre(rek[100]) / 1000 - 36.321) < 1e-2);
// Die Anzeige rundet Jahre ganzzahlig; genau diese 2 fragt der Selbsttest ab.
assert.equal(Math.round(jahre(rek[80])), 2);

/* ----------------------------------------------------------- Steigungen */

const PHI = (1 + Math.sqrt(5)) / 2;
assert.ok(Math.abs(PHI - 1.6180340) < 1e-7);
assert.ok(Math.abs(Math.log10(2) - 0.30103) < 1e-5);
assert.ok(Math.abs(Math.log10(PHI) - 0.208988) < 1e-6);
// Die gezählten Punkte liegen wirklich auf der φ-Geraden, nicht auf der 2ⁿ-Geraden.
const steigung = (Math.log10(Number(rek[80])) - Math.log10(Number(rek[40]))) / 40;
assert.ok(Math.abs(steigung - Math.log10(PHI)) < 1e-3, `Steigung ${steigung}`);
assert.ok(Math.abs(steigung - Math.log10(2)) > 0.09);

/* Iteration: 4n − 6 Operationen. */
const itOps = (n) => 4 * n - 6;
assert.equal(itOps(10), 34);
assert.equal(itOps(80), 314);

/* ------------------------------------- kein Spoiler im Vor-Auflösen-Verdikt */

assert.ok(
  !/verläuft aber sichtbar flacher als die gestrichelte Schranke/.test(src),
  "das neutrale Verdikt nimmt die Auflösung wieder vorweg",
);

const mdx = readFileSync(join(repo, "src/chapters/02-algos/S25.mdx"), "utf8");
assert.ok(
  !/Steigung der roten Punkte liegt dabei sichtbar unter/.test(mdx),
  "die vorweggenommene Konsolidierung steht wieder im Kasten",
);

console.log("REV29 02-algos-S25FibVergleich: ok");
