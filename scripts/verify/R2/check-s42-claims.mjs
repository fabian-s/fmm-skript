import assert from "node:assert/strict";

const close = (actual, expected, tolerance = 1e-4) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);

// Kehrwert: relative Outputfehler und Verstärkung aus den Widget-Readouts.
const reciprocal = (x, eps) => {
  const xt = x + eps;
  return { input: Math.abs(eps) / Math.abs(x), output: Math.abs(x / xt - 1), amp: Math.abs(x / xt) };
};
let r = reciprocal(0.6, -0.45);
close(r.input, 0.75); close(r.output, 3); close(r.amp, 4);
close(reciprocal(0.6, -0.3).amp, 2);
close(reciprocal(0.6, -0.48).amp, 5);
close(reciprocal(0.6, -0.54).amp, 10);

const kappa = (x1, x2) => Math.SQRT2 * Math.hypot(x1, x2) / Math.abs(x1 + x2);
close(kappa(1.2, -0.85), 5.9419);
close(kappa(1.4, 1.4), 1);
close(kappa(1.5, -1.45), 59.008, 0.001);
close(Math.SQRT2, 1.41421, 1e-5);

console.log("S42 claims verified");
