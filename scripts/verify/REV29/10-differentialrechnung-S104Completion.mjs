#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S104Completion.tsx
 * (MatrixCompletionDemo).
 *
 * Prüft die drei alpha-Regime des Headers, die Vorhersagen für die beiden
 * Lücken und den im Review nachgetragenen vierten Verdikt-Zweig („der Verlust
 * pendelt").
 *
 * Unabhängige Rechenwege:
 *   - Der Abstieg wird hier ohne Matrixhilfsfunktionen mit ausgeschriebenen
 *     Indexschleifen nachgerechnet.
 *   - Die Rang-1-Vorhersagen werden zusätzlich in geschlossener Form geprüft:
 *     Ein Rang-1-Fit an vier Beobachtungen erfüllt y13 = y11·y23/y21 usw.;
 *     die Sollwerte 2,5 und 2,4 stehen also NICHT aus dem Lauf, sondern aus
 *     der Kreuzproduktbedingung.
 *   - Der Pendel-Test wird unabhängig vom Widget formuliert (zwei aufeinander
 *     folgende Schritte müssen sich reproduzieren: 2-Zyklus).
 */
import assert from "node:assert/strict";

const datei = "src/chapters/10-differentialrechnung/widgets/S104Completion.tsx";

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const Y = [
  [5, 3, 0],
  [4, 0, 2],
];
const P = [
  [1, 1, 0],
  [1, 0, 1],
];
const START = {
  1: { U: [[0.9], [0.5]], V: [[1.1], [0.4], [0.7]] },
  2: {
    U: [
      [0.9, -0.3],
      [0.5, 0.8],
    ],
    V: [
      [1.1, 0.2],
      [0.4, -0.6],
      [0.7, 0.5],
    ],
  },
};

/** Abstieg mit ausgeschriebenen Schleifen, ohne Matrixhelfer. */
function lauf(k, alpha, schritte) {
  const U = START[k].U.map((z) => [...z]);
  const V = START[k].V.map((z) => [...z]);
  const verluste = [];
  const L = () => {
    let s = 0;
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 3; j++) {
        if (!P[i][j]) continue;
        let p = 0;
        for (let r = 0; r < k; r++) p += U[i][r] * V[j][r];
        s += (Y[i][j] - p) ** 2;
      }
    return 0.5 * s;
  };
  verluste.push(L());
  for (let t = 0; t < schritte; t++) {
    const R = [
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 3; j++) {
        if (!P[i][j]) continue;
        let p = 0;
        for (let r = 0; r < k; r++) p += U[i][r] * V[j][r];
        R[i][j] = Y[i][j] - p;
      }
    const dU = U.map((z) => z.map(() => 0));
    const dV = V.map((z) => z.map(() => 0));
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 3; j++)
        for (let r = 0; r < k; r++) {
          dU[i][r] += -R[i][j] * V[j][r];
          dV[j][r] += -R[i][j] * U[i][r];
        }
    for (let i = 0; i < 2; i++) for (let r = 0; r < k; r++) U[i][r] -= alpha * dU[i][r];
    for (let j = 0; j < 3; j++) for (let r = 0; r < k; r++) V[j][r] -= alpha * dV[j][r];
    verluste.push(L());
  }
  const S = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 3; j++) {
      let p = 0;
      for (let r = 0; r < k; r++) p += U[i][r] * V[j][r];
      S[i][j] = p;
    }
  return { verluste, S };
}

/* --------------------------------------------------- alpha = 0,05: beide Ränge */

const a1 = lauf(1, 0.05, 300);
const a2 = lauf(2, 0.05, 300);
nah(a1.verluste[0], 18.8373, 1e-4, "L₀ bei k = 1");
nah(a1.verluste[20], 1.689e-4, 1e-7, "L(20) bei k = 1");
assert.ok(a1.verluste[200] < 1e-23, `L(200) bei k = 1 muss unter 1e−23 liegen (ist ${a1.verluste[200]})`);
assert.ok(a1.verluste[300] < 1e-29, `L(300) bei k = 1 muss unter 1e−29 liegen (ist ${a1.verluste[300]})`);
nah(a2.verluste[20], 9.279e-6, 1e-9, "L(20) bei k = 2");
assert.ok(a2.verluste[200] < 1e-29, `L(200) bei k = 2 muss unter 1e−29 liegen (ist ${a2.verluste[200]})`);

// Vorhersagen für die beiden Lücken.
nah(a1.S[0][2], 2.5, 1e-6, "y₁₃ bei k = 1");
nah(a1.S[1][1], 2.4, 1e-6, "y₂₂ bei k = 1");
nah(a2.S[0][2], 1.5831, 1e-3, "y₁₃ bei k = 2");
nah(a2.S[1][1], 0.9091, 1e-3, "y₂₂ bei k = 2");

// Geschlossene Gegenprobe für den Rang-1-Fit: Bei Rang 1 ist jede 2×2-
// Unterdeterminante von UVᵀ null, also y₁₃ = y₁₁·y₂₃/y₂₁ und y₂₂ = y₂₁·y₁₂/y₁₁.
nah((Y[0][0] * Y[1][2]) / Y[1][0], 2.5, 1e-12, "y₁₃ aus der Rang-1-Bedingung");
nah((Y[1][0] * Y[0][1]) / Y[0][0], 2.4, 1e-12, "y₂₂ aus der Rang-1-Bedingung");
// Das Rang-2-Modell trifft die vier Beobachtungen ebenso exakt …
for (const [i, j] of [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 2],
])
  nah(a2.S[i][j], Y[i][j], 1e-6, `Rang-2-Fit auf der Beobachtung (${i + 1},${j + 1})`);
// … sagt für die Lücken aber etwas anderes voraus. Das ist die Einsicht.
assert.ok(Math.abs(a2.S[0][2] - a1.S[0][2]) > 0.5, "die beiden Ränge müssen für y₁₃ auseinanderlaufen");

/* --------------------------------------- alpha = 0,15: der Verlust pendelt */

const p1 = lauf(1, 0.15, 300);
const p2 = lauf(2, 0.15, 300);
nah(p1.verluste[20], 1.114, 1e-3, "L(20) bei α = 0,15, k = 1");
nah(p1.verluste[300], 1.110, 1e-3, "L(300) bei α = 0,15, k = 1");
nah(p2.verluste[300], 0.144, 1e-3, "L(300) bei α = 0,15, k = 2");

// Der Verlauf ist ein 2-Zyklus: L(t) und L(t+2) stimmen praktisch überein,
// L(t) und L(t+1) unterscheiden sich deutlich.
for (let t = 250; t < 296; t++) {
  nah(p1.verluste[t + 2], p1.verluste[t], 5e-3, `2-Zyklus bei α = 0,15 (t = ${t})`);
  assert.ok(
    Math.abs(p1.verluste[t + 1] - p1.verluste[t]) > 0.5,
    `benachbarte Schritte müssen sich unterscheiden (t = ${t})`,
  );
}
const fenster = p1.verluste.slice(181, 201);
nah(Math.min(...fenster), 1.1095, 1e-3, "unteres Niveau des Pendelns");
nah(Math.max(...fenster), 1.812, 1e-3, "oberes Niveau des Pendelns");

/** Das Erkennungskriterium des Widgets, hier unabhängig nachgebaut. */
function pendelt(verluste, t) {
  if (t < 20) return false;
  const f = verluste.slice(t - 19, t + 1);
  if (!f.every((v) => Number.isFinite(v) && v > 1e-3)) return false;
  return (
    Math.max(...f) - Math.min(...f) > 0.1 * Math.max(...f) &&
    Math.min(...f.slice(10)) > 0.98 * Math.min(...f.slice(0, 10))
  );
}
assert.ok(pendelt(p1.verluste, 200), "bei α = 0,15 und k = 1 muss der Pendel-Zweig greifen");
assert.ok(!pendelt(a1.verluste, 200), "bei α = 0,05 darf der Pendel-Zweig nicht greifen");
assert.ok(!pendelt(a2.verluste, 200), "bei α = 0,05 (k = 2) darf der Pendel-Zweig nicht greifen");
assert.ok(!pendelt(p1.verluste, 10), "vor Schritt 20 darf der Pendel-Zweig nie greifen");
// Auch bei α = 0,18 steht der Verlust; ab α = 0,14 beginnt das Regime.
assert.ok(pendelt(lauf(1, 0.18, 200).verluste, 200), "α = 0,18 muss ebenfalls pendeln");
assert.ok(!pendelt(lauf(1, 0.13, 200).verluste, 200), "α = 0,13 konvergiert noch");

/* ------------------------------------------- alpha = 0,3: die Iteration läuft davon */

const d1 = lauf(1, 0.3, 30);
assert.ok(!Number.isFinite(d1.verluste[20]), "bei α = 0,3 muss L nach 20 Schritten NaN sein");
const d25 = lauf(1, 0.25, 200);
assert.ok(!Number.isFinite(d25.verluste[200]), "bei α = 0,25 muss L nach 200 Schritten NaN sein");
assert.ok(Number.isFinite(lauf(1, 0.2, 200).verluste[200]), "bei α = 0,2 darf L noch endlich sein");

console.log(`REV29 ${datei}: drei α-Regime, Lückenvorhersagen und Pendel-Kriterium geprüft.`);
