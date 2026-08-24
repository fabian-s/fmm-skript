import assert from "node:assert/strict";

const close = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-12, message);
const threshold = 0.08;

close(Math.sin(0), 0, "sin(0) muss 0 sein.");
close(Math.cos(0), 1, "cos(0) muss 1 sein.");
close(Math.cos(1.55), 0.020794827803092428, "Der nahe waagerechte Sliderwert stimmt nicht.");
assert.ok(Math.abs(Math.cos(1.55)) < threshold, "x = 1,55 muss die Verdiktgrenze 0,08 erreichen.");
close(Math.cos(1.45), 0.12050276936736662, "Der benachbarte nicht-waagerechte Sliderwert stimmt nicht.");
assert.ok(Math.abs(Math.cos(1.45)) >= threshold, "x = 1,45 darf die Verdiktgrenze 0,08 nicht erreichen.");
console.log("SineCosineWidget: Zahlen geprüft.");
