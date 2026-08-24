import assert from "node:assert/strict";

const scheiben = [
  [[2, -1, 4, 0], [3, 1, -2, 5], [0, 4, 1, -3], [2, 0, 3, 1]],
  [[-2, 3, 1, 4], [1, 5, 0, -1], [2, -4, 3, 0], [1, 2, -2, 4]],
  [[4, 0, -3, 1], [2, 1, 5, -2], [-1, 3, 0, 2], [4, -2, 1, 3]],
  [[0, 2, 1, -4], [3, -1, 4, 0], [2, 5, -2, 1], [-3, 0, 2, 4]],
];
const kanalWert = (kanal, zeile, spalte) => (zeile * 29 + spalte * 17 + kanal * 53) % 256;

assert.equal(scheiben.length, 4);
assert.ok(scheiben.every((matrix) => matrix.length === 4 && matrix.every((zeile) => zeile.length === 4)));
assert.equal(scheiben.flat(2).length, 64);
assert.equal(8 * 8 * 3, 192);
for (let kanal = 0; kanal < 3; kanal += 1) {
  for (let zeile = 0; zeile < 8; zeile += 1) {
    for (let spalte = 0; spalte < 8; spalte += 1) {
      assert.ok(kanalWert(kanal, zeile, spalte) >= 0 && kanalWert(kanal, zeile, spalte) <= 255);
    }
  }
}
console.log("KAP09 S92: Scheibenformate, Eintragszahlen und RGB-Bereiche geprüft.");
