import assert from "node:assert/strict";

// R3: numeric claims retained in chapter 7 widget captions/verdicts.
const close = (a, b, eps = 1e-8) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
close(1 / Math.tan(12 * Math.PI / 360), 9.5143644542);
close(1 / Math.tan(3 * Math.PI / 360), 38.188459297);
close((5 - 10 * .5), 0);
close(Math.hypot(2, 1), 2.2360679775);
close((5 - 1 / 3) / (5 / 2 + 1 / 6), 1.75);
console.log("R3 chapter 07 claims verified");
