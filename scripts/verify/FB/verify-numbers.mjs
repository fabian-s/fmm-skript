import assert from "node:assert/strict";

const sigmas = [10, 6, 2.5, 0.9, 0.3, 0.08];
assert.ok(Math.abs(sigmas.reduce((s, x) => s + x * x, 0) - 143.1564) < 1e-10);
assert.equal((2 * 1 + 1 * 2) / 5, 0.8); // Normalengleichungen
for (const s of [0.6, 0.85, 1, 1.1]) {
  const n0 = Math.hypot(1, 0.4);
  assert.ok(Math.abs(Math.pow(s, 16) * n0 - Math.pow(s, 16) * n0) < 1e-12);
}
for (const omega of [0, 0.9, Math.PI]) {
  const value = Math.sqrt(4 + 1.69 + 5.2 * Math.cos(omega));
  assert.ok(value >= 0.7 - 1e-12 && value <= 3.3 + 1e-12);
}
console.log("FB number checks passed");
