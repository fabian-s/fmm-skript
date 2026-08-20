import assert from "node:assert/strict";

const f = (a, b, x) => a * x + b;
const a = 1;
const b = 0.5;

assert.equal(f(a, b, 0), 0.5, "Der Startwert muss f(0) = 0,5 zeigen.");
assert.equal(f(a, b, 1) - f(a, b, 0), 1, "Das Startdreieck muss den Anstieg 1 zeigen.");
assert.equal(f(-2.3, 1.7, 2) - f(-2.3, 1.7, 1), -2.3, "Ein Einheitsschritt muss stets a ergeben.");
console.log("LinearFunctionWidget: Zahlen geprüft.");
