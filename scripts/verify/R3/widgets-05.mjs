import assert from "node:assert/strict";

// R3: numeric claims retained in chapter 5 widget captions/verdicts.
const close = (a, b, eps = 1e-10) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const U = [[2, 1, -1], [0, 3, 2], [0, 0, 2]], c = [3, 7, 4];
const x = [0, 0, c[2] / U[2][2]];
x[1] = (c[1] - U[1][2] * x[2]) / U[1][1];
x[0] = (c[0] - U[0][1] * x[1] - U[0][2] * x[2]) / U[0][0];
assert.deepEqual(x, [2, 1, 2]);
close(2 ** 3 / 3 + 2 ** 2, 20 / 3); // J=2 is the first strict LU saving.
const q = (t) => Math.cos(t) ** 2 - Math.sin(t) ** 2;
close(q(Math.PI / 4), 0);
console.log("R3 chapter 05 claims verified");
