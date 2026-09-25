#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/S24WachstumWidget.tsx.
 *
 * Der Header behauptet eine Schwellentabelle c → n*, das Verdikt zitiert sie.
 * Unabhängiger Rechenweg: n* wird hier über den Logarithmus bestimmt
 * (n·ln 2 > ln c + 2·ln n) statt über die Potenzschleife des Widgets, und
 * beide Wege werden gegeneinander gehalten.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/** Wie im Widget: letztes n mit 2^n ≤ c·n², plus eins. */
function schwelleSchleife(c) {
  let last = 0;
  for (let n = 1; n <= 2000; n++) if (Math.pow(2, n) <= c * n * n) last = n;
  return last + 1;
}
/** Unabhängig: über Logarithmen, damit 2^n nie wirklich gebildet wird. */
function schwelleLog(c) {
  let last = 0;
  for (let n = 1; n <= 2000; n++) {
    if (n * Math.LN2 <= Math.log(c) + 2 * Math.log(n)) last = n;
  }
  return last + 1;
}

const TABELLE = [[1, 5], [10, 10], [100, 15], [178, 16], [316, 17], [1000, 19]];
for (const [c, n] of TABELLE) {
  assert.equal(schwelleSchleife(c), n, `c = ${c}`);
  assert.equal(schwelleLog(c), n, `c = ${c} (log-Weg)`);
  // widerlegbar: ab n* gilt es wirklich für ALLE folgenden n, davor nicht.
  for (let m = n; m <= 200; m++) assert.ok(2 ** m > c * m * m, `c=${c}, n=${m}`);
  assert.ok(2 ** (n - 1) <= c * (n - 1) ** 2, `c=${c}: n*−1 ist doch schon größer`);
}
assert.equal(schwelleSchleife(1000) - schwelleSchleife(1), 14, "der Vorfaktor 1000 kostet 14 Schritte");

/* Die frühere Verdikt-Aussage „c·n² liegt bis n = n*−1 über 2^n" ist für c = 1
   falsch: bei n = 1 ist 2 > 1, bei n = 2 und n = 4 stehen beide gleich. */
assert.ok(2 ** 1 > 1 * 1 * 1, "n = 1: 2^n liegt für c = 1 vorn");
assert.equal(2 ** 2, 1 * 2 * 2);
assert.equal(2 ** 4, 1 * 4 * 4);

const src = readFileSync(join(repo, "src/chapters/02-algos/widgets/S24WachstumWidget.tsx"), "utf8");
assert.ok(
  !/liegt <M>\{"c \\\\cdot n\^2"\}<\/M> bis/.test(src),
  "die für c = 1 falsche Verdikt-Teilaussage ist zurück",
);
assert.ok(/spätestens ab/.test(src), "der korrigierte Verdikttext fehlt");

/* n³ > c·n² gilt genau für n > c. */
for (const c of [1, 3, 10, 50]) {
  for (let n = 1; n <= 200; n++) assert.equal(n ** 3 > c * n * n, n > c, `c=${c}, n=${n}`);
}

/* Die widgetabhängige Selbsttestfrage in S24.mdx. */
const mdx = readFileSync(join(repo, "src/chapters/02-algos/S24.mdx"), "utf8");
const zahlfragen = [...mdx.matchAll(/:::zahlfrage\{loesung=(\d+)/g)].map((m) => Number(m[1]));
assert.ok(zahlfragen.includes(schwelleSchleife(100)), "zahlfrage c = 100 → 15 fehlt");

console.log("REV29 02-algos-S24Wachstum: ok");
