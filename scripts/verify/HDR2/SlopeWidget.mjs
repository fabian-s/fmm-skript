import assert from "node:assert/strict";

const y = (a, x) => a * x;

assert.equal(y(1.5, 1), 1.5, "Der Startwert muss bei x = 1 den Wert 1,5 haben.");
assert.equal(y(-1.5, 1), -1.5, "Negative Steigung muss zum Abstieg führen.");
assert.equal(y(0, 1), 0, "Steigung 0 muss eine waagerechte Gerade liefern.");
assert.equal(y(2.4, 1) - y(2.4, 0), 2.4, "Das Einheitsdreieck muss den Anstieg messen.");
console.log("SlopeWidget: Zahlen geprüft.");
