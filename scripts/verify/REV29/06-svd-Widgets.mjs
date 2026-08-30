#!/usr/bin/env node
/**
 * REV29 — die Zahlen der Kapitel-6-Widgets außer S61EllipseWidget
 * (S62Rechner, S62Raum, S62Geometrie, S63Bloecke, S63Pseudo, S64RangK,
 * S64Empfehlung). Bis hierher trug jeder dieser Header die „historische Notiz",
 * und `scripts/verify/R3/widgets-06.mjs` prüfte nur arithmetische Identitäten.
 *
 * Unabhängiger Rechenweg: Alle Singulärwerte entstehen hier über einen
 * ZYKLISCHEN JACOBI-EIGENLÖSER auf AᵀA (zweiseitig, mit Rotationen auf der
 * symmetrischen Matrix) — nicht über das einseitige Jacobi-Verfahren auf den
 * Spalten, das S64Numerik.ts benutzt, und nicht über die 2×2-Winkelformel der
 * S62-Widgets. Die Rang-k-Näherung wird als Projektion A V_k V_kᵀ gebildet
 * statt als Summe σ_i u_i v_iᵀ. Sollwerte sind hartkodiert.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const lies = (p) => readFileSync(join(repo, p), "utf8");
const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------- zyklischer Jacobi-Eigenlöser */

const transponiert = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mal = (A, B) =>
  A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));

/** Eigenwerte/-vektoren einer symmetrischen n×n-Matrix, absteigend sortiert. */
function jacobiEigen(S0) {
  const n = S0.length;
  const S = S0.map((r) => r.slice());
  let V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) off += S[p][q] ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(S[p][q]) < 1e-18) continue;
        const theta = (S[q][q] - S[p][p]) / (2 * S[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const skp = S[k][p], skq = S[k][q];
          S[k][p] = c * skp - s * skq;
          S[k][q] = s * skp + c * skq;
        }
        for (let k = 0; k < n; k++) {
          const spk = S[p][k], sqk = S[q][k];
          S[p][k] = c * spk - s * sqk;
          S[q][k] = s * spk + c * sqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  const idx = S.map((_, i) => i).sort((a, b) => S[b][b] - S[a][a]);
  return {
    lambda: idx.map((i) => S[i][i]),
    v: idx.map((i) => V.map((row) => row[i])), // v[k] ist der k-te Eigenvektor
  };
}

/** Singulärwerte und rechte Singulärvektoren über AᵀA. */
function svdUeberAtA(A) {
  const { lambda, v } = jacobiEigen(mal(transponiert(A), A));
  return { s: lambda.map((l) => Math.sqrt(Math.max(0, l))), v };
}

/** Rang-k-Näherung als Projektion auf die ersten k rechten Singulärrichtungen. */
function rangK(A, v, k) {
  const n = A[0].length;
  return A.map((row) => {
    const out = new Array(n).fill(0);
    for (let i = 0; i < k; i++) {
      const c = row.reduce((s, x, j) => s + x * v[i][j], 0);
      for (let j = 0; j < n; j++) out[j] += c * v[i][j];
    }
    return out;
  });
}
const frob = (A) => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, x) => t + x * x, 0), 0));

/* ------------------------------ S62Rechner: A = (1 2; 2 1; 1 0), Beispiel 6.2.9 */

const A629 = [[1, 2], [2, 1], [1, 0]];
const AtA = mal(transponiert(A629), A629);
assert.deepEqual(AtA, [[6, 4], [4, 5]], "AᵀA ist nicht (6 4; 4 5)");
assert.equal(AtA[0][0] + AtA[1][1], 11, "Spur von AᵀA");
assert.equal(AtA[0][0] * AtA[1][1] - AtA[0][1] * AtA[1][0], 14, "det AᵀA");
const e629 = jacobiEigen(AtA);
nah(e629.lambda[0], 9.531, 5e-4, "λ₁");
nah(e629.lambda[1], 1.469, 5e-4, "λ₂");
const s629 = e629.lambda.map((l) => Math.sqrt(l));
nah(s629[0], 3.087, 5e-4, "σ₁");
nah(s629[1], 1.212, 5e-4, "σ₂");
nah(s629[0] / s629[1], 2.547, 5e-4, "σ₁/σ₂ (Zahlfrage S62.mdx:729)");
// v₁ bis aufs Vorzeichen; das Widget zeigt die Wahl (−0,750; −0,662).
const v1 = e629.v[0].map((x) => -Math.sign(e629.v[0][0]) * x);
nah(Math.abs(v1[0]), 0.75, 5e-4, "|v₁₁|");
nah(Math.abs(v1[1]), 0.662, 5e-4, "|v₁₂|");
// Av₁ und u₁ des Headers.
const Av1 = A629.map((r) => r[0] * -0.75 + r[1] * -0.662);
nah(Av1[0], -2.074, 2e-3, "Av₁ erste Komponente (Beispiel rechnet gerundet)");
const u1 = Av1.map((x) => x / s629[0]);
nah(u1[0], -0.672, 2e-3, "u₁ erste Komponente");
nah(Math.hypot(...u1), 1, 5e-3, "‖u₁‖");
// UΣVᵀ rekonstruiert A: Projektion auf beide Richtungen ergibt A selbst.
// Die Ellipsenfläche der Raumtafel: πσ₁σ₂ = π√(det AᵀA).
nah(Math.PI * s629[0] * s629[1], 11.755, 5e-4, "Ellipsenfläche πσ₁σ₂ (S62Raum)");
nah(s629[0] * s629[1], Math.sqrt(14), 1e-9, "σ₁σ₂ = √det(AᵀA)");
const rest629 = Math.max(
  ...rangK(A629, e629.v, 2).map((r, i) => Math.max(...r.map((x, j) => Math.abs(x - A629[i][j])))),
);
assert.ok(rest629 < 1e-12, `Rekonstruktion weicht um ${rest629} ab`);

/* ------------------------- S62Raum/S62Geometrie: A = (2 1; 0 1) und die Presets */

const A211 = [[2, 1], [0, 1]];
const sg = svdUeberAtA(A211).s;
nah(sg[0], 2.2882456, 1e-6, "σ₁ von (2 1; 0 1)");
nah(sg[1], 0.8740320, 1e-6, "σ₂ von (2 1; 0 1)");
nah(sg[0] / sg[1], 2.618034, 1e-6, "σ₁/σ₂");

for (const [name, M, s1, s2] of [
  ["Drehung", [[0.6, -0.8], [0.8, 0.6]], 1, 1],
  ["Diagonal", [[2, 0], [0, 0.5]], 2, 0.5],
  ["singulär", [[1, 2], [2, 4]], 5, 0],
]) {
  const s = svdUeberAtA(M).s;
  nah(s[0], s1, 1e-9, `${name}: σ₁`);
  nah(s[1], s2, 1e-9, `${name}: σ₂`);
}
// Rang-1-Beispiel der Raumtafel: A = (1 2; 2 4; 1 2), Strecke der halben Länge 5,477.
const A124 = [[1, 2], [2, 4], [1, 2]];
const s124 = svdUeberAtA(A124).s;
nah(s124[0], Math.sqrt(30), 1e-9, "σ₁ der Rang-1-Matrix");
nah(s124[0], 5.4772256, 1e-6, `die „halbe Länge 5,477"`);
nah(s124[1], 0, 1e-9, "σ₂ der Rang-1-Matrix");

/* ------------------------------------------------ S63Bloecke: Speicherbilanz */

/** Speicherbilanz wie im Widget: volle Zerlegung, reduzierte Zerlegung, A selbst. */
const speicher = (m, n, r) => ({
  voll: m * m + n * n + Math.min(m, n),
  reduziert: r * (m + n + 1),
  A: m * n,
});
// Voreinstellung m = 5, n = 4, r = 2: 45 gegen 20 gegen 20.
assert.deepEqual(speicher(5, 4, 2), { voll: 45, reduziert: 20, A: 20 }, "Bilanz 5×4, r = 2");
// Preset r = 1: die reduzierte Form braucht 10 Zahlen.
assert.equal(speicher(5, 4, 1).reduziert, 10, "Bilanz 5×4, r = 1");
// Preset m = n = r = 4: 36 gegen 36 gegen 16 — hier spart die Zerlegung nichts.
assert.deepEqual(speicher(4, 4, 4), { voll: 36, reduziert: 36, A: 16 }, "Bilanz 4×4, r = 4");
assert.ok(speicher(4, 4, 4).reduziert > speicher(4, 4, 4).A, "bei m = n = r fällt doch etwas weg");
// Der Selbsttest-Fall 1000 × 50 mit r = 5: 1 002 550 gegen 5255.
assert.deepEqual(speicher(1000, 50, 5), { voll: 1002550, reduziert: 5255, A: 50000 }, "Bilanz 1000×50");
// Gegenprobe der Formel: die reduzierte Form zählt U_r (m·r), V_r (n·r) und σ (r).
assert.equal(5 * 1000 + 5 * 50 + 5, speicher(1000, 50, 5).reduziert, "Postenzählung der reduzierten Form");

/* --------------------------------------- S63Pseudo: A = (1 1; 1 1), b = (1; 5) */

const Ap = [[1, 1], [1, 1]];
const bp = [1, 5];
const zp = svdUeberAtA(Ap);
nah(zp.s[0], 2, 1e-9, "σ₁ von (1 1; 1 1)");
nah(zp.s[1], 0, 1e-9, "σ₂ von (1 1; 1 1)");
// A⁺ = Σ_{σ>0} v_i u_iᵀ/σ_i mit u_i = A v_i / σ_i.
const v1p = zp.v[0];
const u1p = Ap.map((r) => (r[0] * v1p[0] + r[1] * v1p[1]) / zp.s[0]);
const Aplus = [0, 1].map((i) => [0, 1].map((j) => (v1p[i] * u1p[j]) / zp.s[0]));
for (const i of [0, 1]) for (const j of [0, 1]) nah(Aplus[i][j], 0.25, 1e-9, `A⁺(${i}, ${j})`);
const xDach = Aplus.map((r) => r[0] * bp[0] + r[1] * bp[1]);
nah(xDach[0], 1.5, 1e-9, "A⁺b erste Komponente");
nah(Math.hypot(...xDach), 2.1213203, 1e-6, "‖A⁺b‖");
const Ax = Ap.map((r) => r[0] * xDach[0] + r[1] * xDach[1]);
nah(Ax[0], 3, 1e-9, "Ax erste Komponente");
nah(Math.hypot(bp[0] - Ax[0], bp[1] - Ax[1]), 2.8284271, 1e-6, "‖r‖");
// Entlang der Lösungsgeraden ändert sich ‖r‖ nicht, ‖x‖ wird bei t = 0 minimal.
const kern = [v1p[1], -v1p[0]];
let maxAbw = 0;
for (let t = -3; t <= 3; t += 0.01) {
  const x = [xDach[0] + t * kern[0], xDach[1] + t * kern[1]];
  const Axt = Ap.map((r) => r[0] * x[0] + r[1] * x[1]);
  maxAbw = Math.max(maxAbw, Math.abs(Math.hypot(bp[0] - Axt[0], bp[1] - Axt[1]) - 2.8284271247461903));
  assert.ok(Math.hypot(...x) >= Math.hypot(...xDach) - 1e-12, `‖x(${t})‖ ist kleiner als ‖A⁺b‖`);
}
assert.ok(maxAbw < 1e-12, `das Residuum ändert sich entlang der Geraden um ${maxAbw}`);
const x1 = [xDach[0] + kern[0], xDach[1] + kern[1]];
nah(Math.hypot(...x1), 2.3452079, 1e-6, "‖x(1)‖");

/* --------------------------------------------- S64RangK: das Testbild aus S64Numerik.ts */

function lcg(seed) {
  let s = seed >>> 0;
  return () => {
    s = (1103515245 * s + 12345) >>> 0;
    return s / 4294967296;
  };
}
/** Portierung von testBild() — dieselben Konstanten, damit dieselbe Matrix entsteht. */
function testBild(m = 36, n = 54, rauschen = 0.07) {
  const A = [];
  const horizont = Math.round(0.66 * m);
  const steinOben = Math.round(0.28 * m);
  const pfosten = [5, 12, 19, 28, 35, 44];
  const steinBreit = 3;
  const balken = [[5, 15], [19, 31], [35, 47]];
  const rnd = lcg(20260811);
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      let w;
      if (i < horizont) w = 0.88 - 0.2 * (i / horizont);
      else {
        w = 0.5 - 0.18 * ((i - horizont) / (m - horizont));
        w += 0.04 * Math.sin(0.7 * j + i);
      }
      const d2 = (i - 0.12 * m) ** 2 + ((j - 0.85 * n) * 0.8) ** 2;
      w = Math.max(w, 0.98 * Math.exp(-d2 / 14));
      if (i >= steinOben + 3 && i < horizont + 2) {
        for (const s of pfosten) if (j >= s && j < s + steinBreit) w = 0.14 + 0.05 * Math.sin(3 * s + i);
      }
      if (i >= steinOben && i < steinOben + 3) {
        for (const [a, b] of balken) if (j >= a && j < b) w = 0.18;
      }
      w += rauschen * (rnd() - 0.5);
      row.push(Math.min(1, Math.max(0, w)));
    }
    A.push(row);
  }
  return A;
}

const bild = testBild();
assert.equal(bild.length, 36, "das Testbild hat nicht 36 Zeilen");
assert.equal(bild[0].length, 54, "das Testbild hat nicht 54 Spalten");
const zb = svdUeberAtA(bild);
const sb = zb.s;
// Der Knick: nach σ₃ fällt das Spektrum um den Faktor 0,19.
nah(sb[3] / sb[2], 0.187, 5e-3, "σ₄/σ₃ (der beworbene Knick)");
// Energieanteile (Σσ² bis k gegen Σσ²).
const energie = (k) => sb.slice(0, k).reduce((a, x) => a + x * x, 0) / sb.reduce((a, x) => a + x * x, 0);
nah(100 * energie(1), 93.68, 5e-2, "Energieanteil k = 1");
nah(100 * energie(2), 98.59, 5e-2, "Energieanteil k = 2 (Zahlfrage S64.mdx:572)");
nah(100 * energie(3), 99.8, 5e-2, "Energieanteil k = 3");
// Die Singulärwerte selbst und ‖A‖_F.
const relFehler = (k) => {
  const D = bild.map((r, i) => r.map((x, j) => x - rangK(bild, zb.v, k)[i][j]));
  return (100 * frob(D)) / frob(bild);
};
for (const [i, soll] of [[0, 26.475], [1, 6.06], [2, 3.008], [3, 0.561], [4, 0.497], [5, 0.417]]) {
  nah(sb[i], soll, 5e-3, `σ${i + 1} des Testbilds`);
}
nah(frob(bild), 27.353, 5e-3, "‖A‖_F des Testbilds");
// Die Nachbarquotienten des Spektrums (der Knick ist der kleinste davon).
const quotienten = [1, 2, 3, 4, 5].map((i) => sb[i] / sb[i - 1]);
for (const [i, soll] of [[0, 0.229], [1, 0.496], [2, 0.187], [3, 0.887], [4, 0.838]]) {
  nah(quotienten[i], soll, 5e-3, `Quotient σ${i + 2}/σ${i + 1}`);
}
assert.equal(quotienten.indexOf(Math.min(...quotienten)), 2, "der stärkste Abfall liegt nicht bei σ₄/σ₃");
// Relativer Frobenius-Fehler: 4,48 % bei k = 3 gegen 3,21 % bei k = 6.
nah(relFehler(3), 4.48, 5e-2, "relativer Frobenius-Fehler bei k = 3");
nah(relFehler(6), 3.21, 5e-2, "relativer Frobenius-Fehler bei k = 6");
// … und das Eckart-Young-Optimum: ‖A − A_k‖_F² = Σ_{i>k} σ_i².
for (const k of [1, 2, 3, 5]) {
  const D = bild.map((r, i) => r.map((x, j) => x - rangK(bild, zb.v, k)[i][j]));
  const soll = Math.sqrt(sb.slice(k).reduce((a, x) => a + x * x, 0));
  nah(frob(D) / soll, 1, 1e-9, `Eckart-Young bei k = ${k}`);
}
// Kompressionsgrenze: k · (m + n + 1) < m · n ⇔ k ≤ 21.
const kMax = Math.floor((36 * 54 - 1) / (36 + 54 + 1));
assert.equal(kMax, 21, `die Kompressionsgrenze liegt bei k = ${kMax}, nicht bei 21`);
assert.ok(21 * (36 + 54 + 1) < 36 * 54 && 22 * (36 + 54 + 1) > 36 * 54, "k = 21 ist nicht die Grenze");

const rangKSrc = lies("src/chapters/06-svd/widgets/S64RangK.tsx");
assert.ok(/useState\(1\);/.test(rangKSrc), "der Regler startet wieder auf dem Knick");

/* --------------------------------------- S64Empfehlung: Beispiel 6.4.10 */

const R0 = [
  [5, null, 1, null, 4],
  [null, 3, null, 4, null],
  [2, 1, null, null, 5],
  [null, 5, 4, 3, null],
];
/** Auffüllen mit Spaltenmitteln, wobei `aus` zurückgehaltene Zellen ausblendet. */
function auffuellen(aus = []) {
  const sichtbar = (i, j) => R0[i][j] !== null && !aus.some(([a, b]) => a === i && b === j);
  const werte = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) if (sichtbar(i, j)) werte.push(R0[i][j]);
  const gesamt = werte.reduce((a, x) => a + x, 0) / werte.length;
  const spalten = Array.from({ length: 5 }, (_, j) => {
    const xs = [];
    for (let i = 0; i < 4; i++) if (sichtbar(i, j)) xs.push(R0[i][j]);
    return xs.length ? xs.reduce((a, x) => a + x, 0) / xs.length : gesamt;
  });
  const F = Array.from({ length: 4 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => (sichtbar(i, j) ? R0[i][j] : spalten[j])),
  );
  return { F, spalten, gesamt, anzahl: werte.length, sichtbar };
}

const voll = auffuellen();
assert.equal(voll.anzahl, 11, "die Matrix hat nicht 11 bekannte Einträge");
nah(voll.gesamt, 3.364, 5e-4, "Gesamtmittel");
for (const [j, soll] of [[0, 3.5], [1, 3], [2, 2.5], [3, 3.5], [4, 4.5]]) {
  nah(voll.spalten[j], soll, 1e-9, `Spaltenmittel ${j + 1}`);
}
const zv = svdUeberAtA(voll.F);
for (const [i, soll] of [[0, 15.574], [1, 2.844], [2, 2.671], [3, 0.464]]) {
  nah(zv.s[i], soll, 5e-3, `Singulärwert ${i + 1} der aufgefüllten Matrix`);
}
assert.ok(zv.s[4] < 1e-9, `σ₅ ist nicht null, sondern ${zv.s[4]}`);
const rmse = (Rk, sichtbar) => {
  let s = 0, c = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 5; j++)
      if (sichtbar(i, j)) { s += (R0[i][j] - Rk[i][j]) ** 2; c++; }
  return Math.sqrt(s / c);
};
for (const [k, soll] of [[1, 1.143], [2, 0.735], [3, 0.108]]) {
  nah(rmse(rangK(voll.F, zv.v, k), voll.sichtbar), soll, 5e-3, `RMSE bei k = ${k}`);
}

// Die zurückgehaltene Bewertung: Ada bei „Sternenstaub" (wahr 5).
const ohneAda = auffuellen([[0, 0]]);
nah(ohneAda.spalten[0], 2, 1e-9, "das Spaltenmittel fällt ohne Adas 5 auf 2,0");
const zo = svdUeberAtA(ohneAda.F);
for (const [k, soll] of [[1, 1.744], [2, 1.793], [3, 1.95]]) {
  nah(rangK(ohneAda.F, zo.v, k)[0][0], soll, 5e-3, `Vorhersage für Ada bei k = ${k}`);
}
// Die Zahlfrage S64.mdx:585 nennt 1,8 als gerundete Vorhersage bei k = 2.
nah(Number(rangK(ohneAda.F, zo.v, 2)[0][0].toFixed(1)), 1.8, 1e-12, "gerundete Vorhersage bei k = 2");

const empf = lies("src/chapters/06-svd/widgets/S64Empfehlung.tsx");
assert.ok(/<div className="min-w-0">/.test(empf), "die Flex-Kinder haben wieder kein min-w-0");
assert.ok(/aria-label=\{\s*v === null/.test(empf), "die Bewertungszellen haben wieder keinen aria-Namen");

console.log("REV29 06-svd-Widgets: ok");
