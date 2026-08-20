import assert from "node:assert/strict";

const sigmas = [10, 6, 2.5, 0.9, 0.3, 0.08];
assert.ok(Math.abs(sigmas.reduce((s, x) => s + x * x, 0) - 143.1564) < 1e-10);
assert.equal((2 * 1 + 1 * 2) / 5, 0.8); // Normalengleichungen
// SpectralRadiusWidget: die Iterierte x_{k+1} = s*R(theta)*x_k wird WIRKLICH
// 16-mal angewendet und mit der behaupteten Formel ||x_16|| = s^16*||x_0||
// verglichen. (Vorher stand hier |s^16*n0 - s^16*n0| < 1e-12 — auf beiden
// Seiten derselbe Ausdruck, also fuer jede Eingabe wahr und ohne Aussage.)
const START = [1, 0.4];
const n0 = Math.hypot(START[0], START[1]);
for (const s of [0.6, 0.85, 1, 1.1]) {
  for (const th of [0, 0.55, 1.5]) {
    let [x, y] = START;
    for (let k = 0; k < 16; k++) {
      [x, y] = [s * (Math.cos(th) * x - Math.sin(th) * y), s * (Math.sin(th) * x + Math.cos(th) * y)];
    }
    // Drehung ist laengentreu, also skaliert allein s die Norm.
    assert.ok(Math.abs(Math.hypot(x, y) - Math.pow(s, 16) * n0) < 1e-9,
      `s=${s}, theta=${th}: ||x_16||=${Math.hypot(x, y)} statt ${Math.pow(s, 16) * n0}`);
  }
}
// Der Spektralradius entscheidet ueber das Verhalten: s<1 faellt, s=1 bleibt.
assert.ok(Math.pow(0.6, 16) * n0 < 1e-3);
assert.ok(Math.abs(Math.pow(1, 16) * n0 - n0) < 1e-12);
assert.ok(Math.pow(1.1, 16) * n0 > 4 * n0);
for (const omega of [0, 0.9, Math.PI]) {
  const value = Math.sqrt(4 + 1.69 + 5.2 * Math.cos(omega));
  assert.ok(value >= 0.7 - 1e-12 && value <= 3.3 + 1e-12);
}
console.log("FB number checks passed");
