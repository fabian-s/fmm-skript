import assert from "node:assert/strict";

const close = (actual, expected, eps = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= eps, `${actual} != ${expected}`);
const matVec = (a, v) => [a[0][0] * v[0] + a[0][1] * v[1], a[1][0] * v[0] + a[1][1] * v[1]];

// Hyperplane, image, kernel, inverse matrix and linear map.
close(Math.hypot(1, 1), Math.SQRT2);
close(1 / Math.SQRT2, 0.7071067811865475);
assert.deepEqual(matVec([[1, 2], [0.5, 1]], [2, -1]), [0, 0]);
assert.deepEqual(matVec([[1, 2], [0.5, 1]], [1, 0]), [1, 0.5]);
assert.deepEqual(matVec([[1, 2], [0.5, 1]], [0, 1]), [2, 1]);
for (const s of [1, -0.5, 2]) {
  const x = [1, 1];
  const ax = [x[0] + s * x[1], x[1]];
  assert.deepEqual([ax[0] - s * ax[1], ax[1]], x);
}
close(1 * 1 - (-0.5) * 0.5, 1.25);

// Function inner products and the intermediate-value example.
const simpson = (f, n = 2000) => {
  const h = 2 / n;
  let sum = f(-1) + f(1);
  for (let i = 1; i < n; i += 1) sum += (i % 2 ? 4 : 2) * f(-1 + i * h);
  return sum * h / 3;
};
const polys = [() => 1, t => t, t => (3 * t * t - 1) / 2];
close(simpson(t => polys[0](t) ** 2), 2);
close(simpson(t => polys[1](t) ** 2), 2 / 3);
close(simpson(t => polys[2](t) ** 2), 2 / 5);
for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) close(simpson(t => polys[i](t) * polys[j](t)), 0, 1e-12);
close(Math.sqrt(2), 1.4142135623730951);
close(Math.sqrt(2 * (1 - 0.3)), 1.1832159566199232);
assert.equal(0.7 <= 0.5, false);

// Likelihood, limit, linear combination, independence and least squares.
for (let h = 0; h <= 10; h += 1) close(h / 10, h / 10);
close(2 + 0.01, 2.01);
const mix = (c1, c2) => [2 * c1 - c2, c1 + c2];
close(mix(4 / 3, 5 / 3)[0], 1);
close(mix(4 / 3, 5 / 3)[1], 3);
assert.deepEqual(mix(1, 1), [1, 2]);
close(Math.abs(2 * 1.5 - (-1)), 4);
close(Math.abs(2 * 2 - 4), 0);
const ssr = (c0, c1) => [1, 2, 2].reduce((sum, y, i) => sum + (y - (c0 + c1 * (i + 1))) ** 2, 0);
close(ssr(2 / 3, 1 / 2), 1 / 6);
close(ssr(1.6, 0.05), 0.575);

// Linear system: unique, none and infinitely many solutions.
const solve = (a, b, d) => {
  const det = 2 * b - 3 * a;
  return [(5 * b - 3 * d) / det, (2 * d - 5 * a) / det];
};
assert.deepEqual(solve(1, -1, 1).map(v => Number(v.toFixed(1))), [1.6, 0.6]);
assert.equal(2 * 3 - 3 * 2, 0);
assert.equal(5 * 2 - 2 * 5, 0);

// Logarithms and the matrix-norm defaults.
close(Math.log2(8), 3);
close(Math.log(8), 2.0794415416798357);
close(Math.log10(8), 0.9030899869919435);
const singularMax2x2 = a => {
  const b11 = a[0][0] ** 2 + a[1][0] ** 2;
  const b12 = a[0][0] * a[0][1] + a[1][0] * a[1][1];
  const b22 = a[0][1] ** 2 + a[1][1] ** 2;
  return Math.sqrt((b11 + b22 + Math.sqrt((b11 - b22) ** 2 + 4 * b12 ** 2)) / 2);
};
close(singularMax2x2([[1, 0.8], [0.2, 1.4]]), 1.7754481683987484);
close(singularMax2x2([[2, 0], [0, 0.5]]), 2);
close(singularMax2x2([[0, -1], [1, 0]]), 1);

console.log("QA-L1 numerical assertions passed.");
