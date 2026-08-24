import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
for (const [w, max, percent] of [[1.6, 2.56, 36.4], [.8,.64,18.2], [.4,.16,9.1], [.2,.04,4.5], [.1,.01,2.3], [.05,.0025,1.1]]) { close(w*w, max); close(100*w*w/(4.4*w), percent, .05); }
console.log("TangentLineWidget: verified");
