import assert from "node:assert/strict";

const close = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-12, message);
const q = (phi) => 2 * Math.cos(phi) ** 2 + Math.cos(phi) * Math.sin(phi) + Math.sin(phi) ** 2;
const lambdaMin = (3 - Math.sqrt(2)) / 2;
const lambdaMax = (3 + Math.sqrt(2)) / 2;

close(q(0.5), 2.1908866453380185, "Der Startwert q(0,50) stimmt nicht.");
close(q(Math.PI / 2), 1, "Die vertikale Richtung muss Krümmung 1 haben.");
close(q(Math.PI / 8), lambdaMax, "Die steilste Richtung muss den größten Eigenwert liefern.");
close(q((5 * Math.PI) / 8), lambdaMin, "Die flachste Richtung muss den kleinsten Eigenwert liefern.");
console.log("QuadraticFormWidget: Zahlen geprüft.");
