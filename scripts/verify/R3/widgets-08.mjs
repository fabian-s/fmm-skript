import assert from "node:assert/strict";

// R3: numeric claims retained in chapter 8 widget captions/verdicts.
const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
close((7 + Math.sqrt(5)) / 2, 4.61803398875);
close((7 - Math.sqrt(5)) / 2, 2.38196601125);
close(2 / ((7 + Math.sqrt(5)) / 2), .433084729318);
const star = [1 / 3, 1 / 6, 1 / 3, 1 / 6];
const T = [[0, 0, .5, 1], [.5, 0, 0, 0], [.5, 1, 0, 0], [0, 0, .5, 0]];
star.forEach((_, i) => close(T[i].reduce((s, v, j) => s + v * star[j], 0), star[i]));
console.log("R3 chapter 08 claims verified");
