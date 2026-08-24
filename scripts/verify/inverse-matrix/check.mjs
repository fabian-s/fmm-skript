import assert from "node:assert/strict";

// Verifiziert die Zahlen des Konzept-Widgets `inverse-matrix` (2026-08-20).
const near = (actual, expected, tolerance, label) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} != ${expected}`);
// A(t) = A0 * diag(1, 1-t): die zweite Achse wird zusammengedrueckt.
const mul = (A, B) => [
  [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
  [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]],
];
const det = (A) => A[0][0]*A[1][1] - A[0][1]*A[1][0];
const sv = (A) => {                       // Singulaerwerte ueber A^T A
  const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
  const m = a*a + b*b + c*c + d*d, dt = det(A);
  const disc = Math.sqrt(Math.max(0, m*m - 4*dt*dt));
  return [Math.sqrt((m + disc)/2), Math.sqrt(Math.max(0, (m - disc)/2))];
};
const rad = (g) => g*Math.PI/180;
const PRESETS = {
  Spiegelung: [[Math.cos(rad(60)), Math.sin(rad(60))], [Math.sin(rad(60)), -Math.cos(rad(60))]],
  Drehung:    [[Math.cos(rad(40)), -Math.sin(rad(40))], [Math.sin(rad(40)), Math.cos(rad(40))]],
  Scherung:   [[1, 1], [0, 1]],
  Streckung:  [[1.6, 0], [0, 0.6]],
};
const D = 0.9;                            // fester Abstand der beiden Testpunkte entlang e2
for (const [name, A0] of Object.entries(PRESETS)) {
  const expectedAt09 = {
    Spiegelung: [1, 0.1, 10, 0.09],
    Drehung: [1, 0.1, 10, 0.09],
    Scherung: [1.0050373078, 0.0994987940, 10.101, 0.1272792206],
    Streckung: [1.6, 0.06, 26.666666667, 0.054],
  }[name];
  for (const t of [0, 0.5, 0.9, 0.99, 1]) {
    const A = mul(A0, [[1, 0], [0, 1 - t]]);
    const [s1, s2] = sv(A);
    const dOut = D * (1 - t) * Math.hypot(A0[0][1], A0[1][1]);
    if (t === 0.9) {
      near(s1, expectedAt09[0], 1e-9, `${name} σ₁`);
      near(s2, expectedAt09[1], 1e-9, `${name} σ₂`);
      near(s1 / s2, expectedAt09[2], 1e-3, `${name} κ`);
      near(dOut, expectedAt09[3], 1e-9, `${name} Bildabstand`);
    }
    if (t === 1) near(s2, 0, 1e-12, `${name} σ₂ bei t=1`);
  }
}
// Gegenprobe: Kern von A(1) ist span(e2), also A(1)*e2 = 0
for (const [name, A0] of Object.entries(PRESETS)) {
  const A = mul(A0, [[1, 0], [0, 0]]);
  const img = [A[0][0]*0 + A[0][1]*1, A[1][0]*0 + A[1][1]*1];
  near(img[0], 0, 1e-12, `${name}: erste Kernkoordinate`);
  near(img[1], 0, 1e-12, `${name}: zweite Kernkoordinate`);
}
console.log("Matrix-inverse claims: OK");
