// FIX-VERDACHT, 2026-08-20: n-abhängiges Chebyshev-Verdikt in S143Runge.tsx.
// UNABHÄNGIG vom Widget: direkte Lagrange-Produktform statt baryzentrischer
// Auswertung; gleiches Scan-Gitter (2001 Punkte auf [-1,1]).
// Behauptungen, die das Widget-Verdikt tragen:
//   (1) n=5: cheb/aequi = 0,402/0,438 — Verhältnis > 0,85 ("kaum kleiner")
//   (2) n=4,6,8: Chebyshev-Fehler GRÖSSER als äquidistant
//   (3) chebLohnt := fehler < 0,2 && fehler < 0,5*aequi gilt genau für
//       n = 9 und n = 11..21, nicht für n = 3..8 und n = 10
import assert from "node:assert/strict";

const f = (x) => 1 / (1 + 25 * x * x);
const aequi = (n) => Array.from({ length: n }, (_, i) => -1 + (2 * i) / (n - 1));
const cheb = (n) => Array.from({ length: n }, (_, i) => Math.cos(((2 * i + 1) * Math.PI) / (2 * n)));

// direkte Lagrange-Form: p(x) = sum_i y_i * prod_{j!=i} (x-x_j)/(x_i-x_j)
function lagrange(xs) {
  const ys = xs.map(f);
  return (x) => {
    let s = 0;
    for (let i = 0; i < xs.length; i++) {
      let L = 1;
      for (let j = 0; j < xs.length; j++) if (j !== i) L *= (x - xs[j]) / (xs[i] - xs[j]);
      s += ys[i] * L;
    }
    return s;
  };
}
function maxErr(p) {
  let e = 0;
  for (let i = 0; i <= 2000; i++) {
    const x = -1 + i / 1000;
    e = Math.max(e, Math.abs(f(x) - p(x)));
  }
  return e;
}

const E = {};
for (let n = 3; n <= 21; n++) E[n] = { a: maxErr(lagrange(aequi(n))), c: maxErr(lagrange(cheb(n))) };

// (1)
assert.ok(Math.abs(E[5].c - 0.402) < 0.001 && Math.abs(E[5].a - 0.4384) < 0.001, "n=5 Werte");
assert.ok(E[5].c / E[5].a > 0.85, "n=5: Chebyshev kaum besser");
// (2)
for (const n of [4, 6, 8]) assert.ok(E[n].c > E[n].a, `n=${n}: Chebyshev schlechter als äquidistant`);
// (3)
const lohnt = (n) => E[n].c < 0.2 && E[n].c < 0.5 * E[n].a;
for (let n = 3; n <= 21; n++) {
  const soll = n === 9 || n >= 11;
  assert.equal(lohnt(n), soll, `chebLohnt(${n}) muss ${soll} sein (c=${E[n].c.toFixed(4)}, a=${E[n].a.toFixed(4)})`);
}
console.log("check-s143-cheb: alle Behauptungen bestätigt (Lagrange-Form, unabhängig).");
