import assert from "node:assert/strict";

const close = (actual, expected, eps = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= eps, `${actual} is not ${expected}`);

// Matrix product and matrix-vector product.
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, a, i) => s + a * B[i][j], 0)));
const AB = mul([[1.5, 0], [0, 1]], [[1, 0.8], [0, 1]]);
close(AB[0][0], 1.5); close(AB[0][1], 1.2); close(AB[1][0], 0); close(AB[1][1], 1);
const BA = mul([[1, -1.2], [0, 1]], [[0.6, 0], [0, 1]]);
close(BA[0][0], 0.6); close(BA[0][1], -1.2); close(BA[1][0], 0); close(BA[1][1], 1);
assert.deepEqual([1 * 2 + 2, 3 * 2 + 4], [4, 10]);

// Newton's method for f(x) = x^4/4 - x + 1.
const f = (x) => x ** 4 / 4 - x + 1;
const fp = (x) => x ** 3 - 1;
const fpp = (x) => 3 * x * x;
let x = 2.5;
for (const expected of [2.5, 1.72, 1.2593401838831801, 1.0497407202235782, 1.0023196787065571, 1.0000053643147837]) {
  close(x, expected, 1e-10);
  x -= fp(x) / fpp(x);
}
close(f(1), 0.25);

// Null space, orthogonal decomposition, Pythagoras and orthonormal coordinates.
close(Math.hypot(1 + 0, 1 + 0), Math.SQRT2);
assert.deepEqual([1 + -1, 1 + -1], [0, 0]);
const u = [2, 1], b = [0.5, 2], t = (u[0] * b[0] + u[1] * b[1]) / 5;
const p = [t * 2, t], r = [b[0] - p[0], b[1] - p[1]];
close(t, 0.6); close(r[0] * 2 + r[1], 0); close(0.5 ** 2 + 2 ** 2, p[0] ** 2 + p[1] ** 2 + r[0] ** 2 + r[1] ** 2);
const q1 = [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)], q2 = [-q1[1], q1[0]];
close(q1[0] * q2[0] + q1[1] * q2[1], 0);
const uP = [1.2, 0.6], vP = [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)];
close(uP[0] * vP[0] + uP[1] * vP[1], 1.1196152422706632);
const theta = 40 * Math.PI / 180, w = [2, 1];
close(w[0] * Math.cos(theta) + w[1] * Math.sin(theta), 2.1748764959244955);
close(w[0] * -Math.sin(theta) + w[1] * Math.cos(theta), -0.5195307762541006);
const c30 = Math.cos(Math.PI / 6), s30 = Math.sin(Math.PI / 6);
close(Math.hypot(c30 * 2 - s30, s30 * 2 + c30), Math.sqrt(5));
close(c30 * 2 + s30, 2.232050807568877);

// Objective function, optimization and Ohm's law.
const data = [[-2, -1.6], [-1, -0.8], [1, 1.1], [2, 2.4]];
const objective = (a) => data.reduce((s, [xi, yi]) => s + (yi - a * xi) ** 2, 0) / data.length;
close(objective(1), 0.0925);
const loss = (z) => (z * z - 1) ** 2 + 0.3 * z;
close(loss(-1.035558), -0.305428, 2e-6);
close(2 * 1.5, 3); close(4 * 1.5, 6);

// Positive definiteness and partial derivatives.
for (const c of [-2.5, -2, -1, 0, 1, 2, 2.5]) close(2 - Math.abs(c), Math.min(2 + c, 2 - c));
const partialX = (a, y) => 2 * a + y;
close(partialX(0.8, 1), 2.6); close(partialX(-1, 1), -1); close(partialX(0.8, -2), -0.4);

// Polynomial roots and Taylor partial sums.
close(Math.sqrt(2), 1.4142135623730951);
const factorial = (n) => Array.from({ length: n }, (_, i) => i + 1).reduce((a, v) => a * v, 1);
const cosPartial = (z, n) => Array.from({ length: n + 1 }, (_, k) => (-1) ** k * z ** (2 * k) / factorial(2 * k)).reduce((a, v) => a + v, 0);
close(cosPartial(0, 8), 1); close(cosPartial(1, 8), Math.cos(1), 3e-14);

console.log("QA-L2 numeric assertions passed.");
