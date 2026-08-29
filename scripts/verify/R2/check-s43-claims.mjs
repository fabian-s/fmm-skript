import assert from "node:assert/strict";

const rho = (alpha) => Math.abs(1 - 2 * alpha);
const theta = (alpha, k, theta0 = 2.5) => theta0 * (1 - 2 * alpha) ** k;
const close = (actual, expected, tolerance = 1e-10) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);

close(rho(0.25), 0.5);
close(rho(0.45), 0.1);
close(rho(0.5), 0);
close(rho(0.72), 0.44);
close(rho(1), 1);
close(rho(1.15), 1.3);
close(theta(1, 30), 2.5);
// Gegen eine unabhängig gerechnete KONSTANTE, nicht gegen 2,5 · 1,3³⁰: Letzteres
// wäre derselbe Ausdruck auf beiden Seiten und könnte nicht scheitern.
close(theta(1.15, 30), 6549.9891091248, 1e-6); // Header: θ₃₀ = 6,55 · 10³

for (const [k, expected] of [[2, 20001.000025], [5, 20000000001], [8, 2e16], [10, 2e20]]) {
  const c2 = 10 ** (2 * k);
  const kappa = Math.SQRT2 * Math.hypot(c2 + 1, c2);
  close(kappa / expected, 1, 1e-9);
}

console.log("S43 claims verified");
