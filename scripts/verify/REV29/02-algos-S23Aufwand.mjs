#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/S23Aufwand.tsx (S23FlopWidget,
 * S23KonstantenWidget) und die Zahlen der zugehörigen Selbsttests in S23.mdx.
 *
 * Unabhängiger Rechenweg: die FLOP-Zahlen entstehen hier durch echtes Zählen
 * der Multiplikationen und Additionen in ausgeführten Schleifen, nicht über
 * die Formeln n(2d−1) bzw. nm(2d−1), die das Widget benutzt.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/* --------------------------------------------- FLOPs durch echtes Zählen */

function matVecFlops(n, d) {
  let mult = 0;
  let add = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < d; j++) {
      mult += 1;
      if (j > 0) add += 1;
    }
  }
  return { mult, add, total: mult + add };
}
function matMatFlops(n, d, m) {
  const eine = matVecFlops(n, d);
  return { mult: eine.mult * m, add: eine.add * m, total: eine.total * m };
}

const mv = matVecFlops(100, 100);
assert.deepEqual([mv.mult, mv.add, mv.total], [10000, 9900, 19900]);
const mm = matMatFlops(100, 100, 100);
assert.deepEqual([mm.mult, mm.add, mm.total], [1000000, 990000, 1990000]);
// Näherungen 2nd bzw. 2ndm
assert.equal(2 * 100 * 100, 20000);
assert.equal(2 * 100 * 100 * 100, 2000000);

// Speicher: nd + d + n bzw. nd + dm + nm
assert.equal(100 * 100 + 100 + 100, 10200);
assert.equal(100 * 100 + 100 * 100 + 100 * 100, 30000);

/* ------------------------------- die Faktoren 4 und 8 beim Verdoppeln */

const mvFaktor = matVecFlops(200, 200).total / mv.total;
const mmFaktor = matMatFlops(200, 200, 200).total / mm.total;
assert.ok(Math.abs(mvFaktor - 4.01) < 5e-3, `Matrix-Vektor-Faktor ${mvFaktor}`);
assert.ok(Math.abs(mmFaktor - 8.02) < 5e-3, `Matrix-Matrix-Faktor ${mmFaktor}`);
// Die gerundeten Faktoren, nach denen der Selbsttest fragt.
assert.equal(Math.round(mvFaktor), 4);
assert.equal(Math.round(mmFaktor), 8);
// Der Speicher wächst langsamer als die Rechenzeit.
const spMv = (n, d) => n * d + d + n;
assert.ok(spMv(200, 200) / spMv(100, 100) < mvFaktor);

/* ------------------------------------ Schnittpunkt 1000n + 10 000 vs. n² */

const linear = (n) => 1000 * n + 10000;
const quad = (n) => n * n;
let letztesLinearVorn = 0;
for (let n = 1; n <= 5000; n++) if (quad(n) < linear(n)) letztesLinearVorn = n;
assert.equal(letztesLinearVorn, 1009);
assert.ok(quad(1009) < linear(1009) && quad(1010) > linear(1010));
assert.deepEqual([quad(1009), linear(1009)], [1018081, 1019000]);
assert.deepEqual([quad(1010), linear(1010)], [1020100, 1020000]);
const nStern = 500 + Math.sqrt(260000);
assert.ok(Math.abs(nStern - 1009.9019513592784) < 1e-9);
assert.deepEqual([quad(100), linear(100)], [10000, 110000]);

/* --------------------------------------------------------- 2^200 in Jahren */

const p200 = 2 ** 200;
assert.ok(Math.abs(p200 / 1e60 - 1.607) < 5e-4, `2^200 = ${p200}`);
const jahre = p200 / 1e18 / 3.156e7;
assert.ok(Math.abs(jahre / 1e34 - 5.09) < 5e-3, `${jahre} Jahre`);

/* ----------------------------------------------- Selbsttests in S23.mdx */

const mdx = readFileSync(join(repo, "src/chapters/02-algos/S23.mdx"), "utf8");
const zahlfragen = [...mdx.matchAll(/:::zahlfrage\{loesung=(\d+)/g)].map((m) => Number(m[1]));
assert.ok(zahlfragen.includes(letztesLinearVorn + 1), "zahlfrage 1010 fehlt");
assert.ok(zahlfragen.includes(Math.round(mmFaktor)), "zahlfrage Faktor 8 fehlt");
// Die Schätzfrage im Kasten fragt nach demselben Faktor und hält die Antwort
// bis zum Auflösen zurück.
assert.ok(/loesung="acht"/.test(mdx), "Schätzfrage im FLOP-Kasten fehlt");
assert.ok(
  !/Der Zähler zeigt: \*\*Nein\.\*\*/.test(mdx),
  "die vorweggenommene Konsolidierung steht wieder sichtbar im Kasten",
);

console.log("REV29 02-algos-S23Aufwand: ok");
