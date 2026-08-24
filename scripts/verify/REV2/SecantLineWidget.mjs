import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const f = x => x * x;
for (const [h, claim] of [[2, 4], [1, 3], [0.5, 2.5], [0.1, 2.1], [0.05, 2.05]]) {
  const slope = (f(1 + h) - f(1)) / h;
  close(slope, claim); close(Math.abs(slope - 2), h);
}
close((f(2) - f(1)) / (2 - 1), 3); close(f(1) + 2 * (2 - 1), 3);
console.log("SecantLineWidget: verified");
