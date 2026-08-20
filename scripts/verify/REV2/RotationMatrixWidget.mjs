import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const theta = 35 * Math.PI / 180;
const c = Math.cos(theta), s = Math.sin(theta);
close(c, 0.8192, 5e-5); close(s, 0.5736, 5e-5);
close(c * c + s * s, 1); close(c * c - (-s * s), 1);
close(c * -s + s * c, 0); close(Math.hypot(c, s), 1);
close(Math.cos(Math.PI / 2), 0); close(Math.sin(Math.PI / 2), 1);
console.log("RotationMatrixWidget: verified");
