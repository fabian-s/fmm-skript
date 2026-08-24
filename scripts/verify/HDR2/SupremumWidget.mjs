import assert from "node:assert/strict";

const f = (x) => x / (1 + x);
const close = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-12, message);

close(f(4), 0.8, "Der Startwert muss f(4) = 0,800 zeigen.");
close(f(99), 0.99, "Bei x = 99 muss f(x) genau 0,99 sein.");
close(f(99.5), 0.9900497512437811, "Der erste halbe Schritt über 99 muss 0,99 überschreiten.");
assert.ok(f(99.5) > 0.99, "x = 99,5 muss die Aufgabe erfüllen.");
close(f(110), 0.990990990990991, "Der rechte Reglerwert muss korrekt berechnet sein.");
close(1 - f(110), 0.009009009009009009, "Der Abstand zur oberen Schranke muss positiv bleiben.");
assert.ok(1 - f(110) > 0, "Auch am rechten Reglerwert darf die obere Schranke nicht erreicht sein.");
console.log("SupremumWidget: Zahlen geprüft.");
