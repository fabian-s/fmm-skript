import assert from "node:assert/strict";

// AUDIT-C, 2026-08-20.  Zahlen aus den zwei F1-pflichtigen Widgets.
const t = [1, 2, 3];
const y = [1, 2, 2];
const c0 = 2 / 3;
const c1 = 1 / 2;
const residuen = t.map((x, i) => y[i] - (c0 + c1 * x));
const ssr = residuen.reduce((sum, r) => sum + r * r, 0);
assert.deepEqual(residuen.map((r) => Math.round(r * 6)), [-1, 2, -1]);
assert.ok(Math.abs(ssr - 1 / 6) < 1e-12);

const e0 = 0.1;
const boden = -16;
const schritteLinear = (C) => Math.ceil((boden - Math.log10(e0)) / Math.log10(C));
assert.equal(schritteLinear(0.1), 15);
assert.equal(schritteLinear(0.5), 50);
assert.equal(schritteLinear(0.9), 328);
assert.equal(Math.ceil(Math.log2(-boden / -Math.log10(e0))), 4);

console.log("AUDIT-C: LinearLeastSquares und RateOfConvergence verifiziert.");
