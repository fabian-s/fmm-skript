// node --experimental-strip-types src/lib/widgets/util.test.mjs
import assert from "node:assert/strict";
const u = await import("./util.ts");
const { fmtDe, fmtInt, fmtTick, niceTicks, sigmaMax, maxAbsCoord, mulberry32, clamp } = u;
assert.equal(fmtDe(-1.5), "−1,50"); assert.equal(fmtDe(NaN), "–"); assert.equal(fmtDe(-Infinity), "−∞"); assert.equal(fmtDe(-0.001), "0,00");
assert.equal(fmtInt(-0.4), "0"); assert.equal(fmtInt(1234), "1.234");
assert.deepEqual(niceTicks(10, 12).map((t) => fmtTick(t, 0.5)), ["10,0", "10,5", "11,0", "11,5", "12,0"]);
const tk = niceTicks(0, 1e-4); assert.equal(new Set(tk.map((t) => fmtTick(t, tk[1] - tk[0]))).size, tk.length);
assert.equal(fmtTick(0.0025), "0,0025"); assert.equal(fmtTick(0), "0");
assert.ok(Math.abs(sigmaMax([[2, 1], [0, 1]]) - 2.288245611270737) < 1e-12);
assert.equal(maxAbsCoord([1, -3], [2, 0]), 3);
const r = mulberry32(7); const a = [r(), r(), r()]; const r2 = mulberry32(7); assert.deepEqual(a, [r2(), r2(), r2()]);
assert.equal(clamp(5, 0, 1), 1);
console.log("util tests ok");
