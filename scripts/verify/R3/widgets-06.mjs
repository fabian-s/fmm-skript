import assert from "node:assert/strict";

// R3: numeric claims retained in chapter 6 widget captions/verdicts.
const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const s1 = Math.sqrt(3 + Math.sqrt(5)), s2 = Math.sqrt(3 - Math.sqrt(5));
close(s1, 2.2882456113); close(s2, 0.8740320489); close(s1 / s2, 2.6180339887);
assert.equal(Math.hypot(1, 1), Math.sqrt(2));
console.log("R3 chapter 06 claims verified");
