#!/usr/bin/env node
/**
 * REV29 — src/chapters/02-algos/widgets/FibonacciStepper.tsx und
 * src/chapters/02-algos/widgets/S25Aufrufbaum.tsx.
 *
 * Unabhängiger Rechenweg: Aufrufe und Additionen der naiven Rekursion werden
 * hier durch tatsächliches Ausführen der Rekursion mit Zählern bestimmt (das
 * Widget benutzt die geschlossene Rekurrenz C(k) = 1 + C(k−1) + C(k−2)), die
 * Baumhäufigkeiten durch vollständiges Aufzählen der Aufrufe.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/* ------------------------------------ Rekursion mit echten Zählern laufen */

function laufen(k) {
  let calls = 0;
  let adds = 0;
  const counts = new Map();
  const fib = (j) => {
    calls += 1;
    counts.set(j, (counts.get(j) ?? 0) + 1);
    if (j <= 2) return j === 1 ? 0 : 1;
    adds += 1;
    return fib(j - 1) + fib(j - 2);
  };
  const wert = fib(k);
  return { wert, calls, adds, counts };
}

/** Geschlossene Rekurrenz wie im Widget – muss dasselbe liefern. */
function rekurrenz(kMax) {
  const c = [0, 1, 1];
  const a = [0, 0, 0];
  for (let k = 3; k <= kMax; k++) {
    c[k] = 1 + c[k - 1] + c[k - 2];
    a[k] = 1 + a[k - 1] + a[k - 2];
  }
  return { c, a };
}

const { c, a } = rekurrenz(15);
for (let k = 1; k <= 15; k++) {
  const r = laufen(k);
  assert.equal(r.calls, c[k], `C(${k})`);
  assert.equal(r.adds, a[k], `A(${k})`);
}

// Die Tabelle aus dem Header.
assert.deepEqual([3, 5, 8, 10, 12, 15].map((k) => c[k]), [3, 9, 41, 109, 287, 1219]);
assert.deepEqual([3, 5, 8, 10, 12, 15].map((k) => a[k]), [1, 4, 20, 54, 143, 609]);
// Iteration: k − 2 Additionen.
assert.deepEqual([3, 5, 8, 10, 12, 15].map((k) => k - 2), [1, 3, 6, 8, 10, 13]);

// Die Fibonacci-Werte selbst (Konvention x1 = 0, x2 = 1).
assert.deepEqual(
  Array.from({ length: 10 }, (_, i) => laufen(i + 1).wert),
  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
);

/* ------------------------------------------------- Häufigkeiten im Baum */

const b8 = laufen(8).counts;
assert.deepEqual(
  [1, 2, 3, 4, 5, 6, 7, 8].map((j) => b8.get(j)),
  [8, 13, 8, 5, 3, 2, 1, 1],
);
const b5 = laufen(5).counts;
assert.deepEqual([1, 2, 3, 4, 5].map((j) => b5.get(j)), [2, 3, 2, 1, 1]);

// S25Aufrufbaum zeichnet fib_rek(5) in der Nullbasis F_0, F_1 (zwei
// Abbruchfälle): T(n) = 1 + T(n−1) + T(n−2), T(0) = T(1) = 1.
function laufenNull(n) {
  let knoten = 0;
  const counts = new Map();
  const f = (j) => {
    knoten += 1;
    counts.set(j, (counts.get(j) ?? 0) + 1);
    return j <= 1 ? j : f(j - 1) + f(j - 2);
  };
  f(n);
  return { knoten, counts };
}
const t5 = laufenNull(5);
assert.equal(t5.knoten, 15, "T(5) im Aufrufbaum von S25Aufrufbaum");
assert.deepEqual([5, 4, 3, 2, 1, 0].map((j) => t5.counts.get(j)), [1, 1, 2, 3, 5, 3]);
assert.equal([1, 1, 2, 3, 5, 3].reduce((s, v) => s + v, 0), 15);

/* -------------------------------------------------- Zustand des Widgets */

const src = readFileSync(join(repo, "src/chapters/02-algos/widgets/FibonacciStepper.tsx"), "utf8");
assert.equal(
  Number(/const \[kRaw, setKRaw\] = useState\((\d+)\)/.exec(src)?.[1]),
  8,
  "die tote Anfangsfigur soll den vollen Achterbaum zeigen",
);
assert.ok(
  /counts\[j\] \?\? 0\) > 1/.test(src),
  "die Baumfarbe hängt nicht mehr an der Mehrfachberechnung",
);
assert.ok(!/base\[j % base\.length\]/.test(src), "die zyklische Fünf-Farben-Palette ist zurück");

/* ---------------------------------------- Selbsttestlösungen in S22.mdx */

const mdx = readFileSync(join(repo, "src/chapters/02-algos/S22.mdx"), "utf8");
assert.equal(Number(/loesung=\{(\d+)\}/.exec(mdx)?.[1]), b8.get(3), "Schätzfrage: x₃ im Baum von x₈");
assert.equal(Number(/:::zahlfrage\{loesung=(\d+)/.exec(mdx)?.[1]), a[10], "zahlfrage: A(10)");

console.log("REV29 02-algos-FibonacciStepper: ok");
