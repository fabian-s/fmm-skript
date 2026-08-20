import assert from "node:assert/strict";

const smooth = (x) => 0.5 * x * x;
const abs = (x) => Math.abs(x);
const h = 1e-7;
const rightSlope = (abs(h) - abs(0)) / h;
const leftSlope = (abs(-h) - abs(0)) / -h;

assert.equal(smooth(2), 2, "Für x²/2 muss f(2) = 2 gelten.");
assert.equal((smooth(h) - smooth(-h)) / (2 * h), 0, "Die Ableitung von x²/2 bei 0 ist 0.");
assert.equal(rightSlope, 1, "Die rechte Steigung von |x| bei 0 muss 1 sein.");
assert.equal(leftSlope, -1, "Die linke Steigung von |x| bei 0 muss −1 sein.");
assert.notEqual(leftSlope, rightSlope, "Verschiedene einseitige Steigungen schließen Differenzierbarkeit aus.");
console.log("SmoothFunctionWidget: Zahlen geprüft.");
