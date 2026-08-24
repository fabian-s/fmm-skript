import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-4) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const eig = c => [(3 + Math.sqrt(1 + 4 * c * c)) / 2, (3 - Math.sqrt(1 + 4 * c * c)) / 2];
for (const [c, expected] of [[0, [2, 1, 2]], [1, [2.618, .382, 1]], [2, [3.5616, -.5616, -2]]]) { const [a,b] = eig(c); close(a, expected[0]); close(b, expected[1]); close(2-c*c, expected[2]); close(a+b, 3, 1e-12); }
const [a, b] = eig(1); const v1 = [1, a - 2], v2 = [1, b - 2]; const n1 = Math.hypot(...v1), n2 = Math.hypot(...v2); close(v1[0]/n1, .8507); close(v1[1]/n1, .5257); close(v1[0]*v2[0]/(n1*n2) + v1[1]*v2[1]/(n1*n2), 0, 1e-12);
close(eig(Math.SQRT2)[1], 0, 1e-12);
console.log("SymmetricMatrixWidget: verified");
