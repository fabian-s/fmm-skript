import assert from "node:assert/strict";

// R3: numeric claims retained in chapter 7 widget captions/verdicts.
const close = (a, b, eps = 1e-8) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
close(1 / Math.tan(12 * Math.PI / 360), 9.5143644542);
close(1 / Math.tan(3 * Math.PI / 360), 38.188459297);
// aᵀr bei x = 1/2 im Projektionswidget: a = (3,1)ᵀ, b = (1,2)ᵀ, r = b − x·a.
// (Kein Literalvergleich: r wird aus a und b gebildet, nicht eingesetzt.)
const s71a = [3, 1], s71b = [1, 2], s71x = 0.5;
const s71r = [s71b[0] - s71x * s71a[0], s71b[1] - s71x * s71a[1]];
close(s71a[0] * s71r[0] + s71a[1] * s71r[1], 0);
close(s71r[0] * s71r[0] + s71r[1] * s71r[1], 2.5);
close(Math.hypot(2, 1), 2.2360679775);
close((5 - 1 / 3) / (5 / 2 + 1 / 6), 1.75);
console.log("R3 chapter 07 claims verified");
