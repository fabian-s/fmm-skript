import assert from "node:assert/strict";

const close = (actual, expected, eps = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= eps, `${actual} != ${expected}`);

// Formulae and advertised defaults used by the QA-L0 widgets, 2026-08-20.
close(0.6 + 0.9 * 2 - 0.5 * 4, 0.4); // Basis target at t = 2
close(Math.E - 2, 0.718281828459045); // Big-O sharp C on [-1, 1]
close(Math.hypot(2, 1), Math.sqrt(5)); // Basiswechsel
const mulComplex = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
assert.deepEqual(mulComplex([0, 1], [2, 1]), [-1, 2]); // i(2+i) in der Gauß-Ebene
close(2 * 2 + 1 * 1, 5); // z zbar = |z|²

function singularValues(eps) {
  const trace = 4 + 2 * eps + eps * eps;
  const disc = Math.sqrt(trace * trace - 4 * eps * eps);
  return [Math.sqrt((trace + disc) / 2), Math.sqrt((trace - disc) / 2)];
}
for (const [eps, cond] of [[1, 6.854101966249685], [0.3, 15.56910355952676], [0.01, 402.0075124842945]]) {
  const [s1, s2] = singularValues(eps);
  close(s1 / s2, cond, 1e-8);
}
close(12 * (1 / 6) - 2, 0); // Erwartungswert break-even
close(2.4 * (1 - 2 * 0.15), 1.68); // erster Gradienten-Schritt
close(Math.abs(1 - 2 * 0.5), 0); // convergence in one step
close(Math.abs(1 - 2 * 1), 1); // non-convergence threshold
close(3 * 2 - 1 * 2, 4); // determinant default
close(2 * 1 * 1 + 2 * 0.6, 3.2); // trace of default Hessian
assert.deepEqual([2, 1.2], [2 * 1, 2 * 0.6]); // Hessian eigenvalues
close(1.2 * 1.2, 1.44); // function default
assert.equal(13, [-1.9, -1.6, -1.4, -1.2, -1.1, -0.9, -0.6, 0.4, 0.7, 0.9, 1.2, 1.5, 1.9].length);
close(1 / Math.sqrt(2 * Math.PI), 0.3989422804014327); // standard-Gauss at its mean

console.log("QA-L0 widget numerics verified");
