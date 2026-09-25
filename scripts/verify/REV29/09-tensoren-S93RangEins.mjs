#!/usr/bin/env node
/**
 * REV29 — src/chapters/09-tensoren/widgets/S93RangEins.tsx (RangEinsExplorer).
 *
 * scripts/verify/KAP09/s93-rang-eins.mjs prüft die Zahlen der Voreinstellung.
 * Hier geht es um die Drei-Zustands-Regel, die das Review angemahnt hat:
 *   • wᵀx = 0 und ‖v‖ = 0 bzw. ‖w‖ = 0 sind über die Regler (Schritt 0,1) und
 *     über den Preset EXAKT erreichbar – das wird nachgewiesen, nicht behauptet;
 *   • die Toleranzschwellen 0,08 und 0,12 treffen Zustände, in denen die alte
 *     Aussage („Ax = 0", „A ist die Nullmatrix") nachweislich falsch war.
 * Der Rang von A = v wᵀ wird dabei unabhängig über die Determinante und über
 * die Zeilenstufenform bestimmt, nicht über die Normen der Faktoren.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const src = readFileSync(join(repo, "src/chapters/09-tensoren/widgets/S93RangEins.tsx"), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

const A = (v, w) => [[v[0] * w[0], v[0] * w[1]], [v[1] * w[0], v[1] * w[1]]];
/** Rang einer 2×2-Matrix über Zeilenstufenform mit Pivot. */
function rang(M) {
  const R = M.map((r) => r.slice());
  const eps = 1e-12;
  let zeile = 0;
  for (let spalte = 0; spalte < 2 && zeile < 2; spalte++) {
    let p = -1;
    for (let r = zeile; r < 2; r++) if (Math.abs(R[r][spalte]) > eps && (p < 0 || Math.abs(R[r][spalte]) > Math.abs(R[p][spalte]))) p = r;
    if (p < 0) continue;
    [R[zeile], R[p]] = [R[p], R[zeile]];
    for (let r = zeile + 1; r < 2; r++) {
      const f = R[r][spalte] / R[zeile][spalte];
      for (let c = 0; c < 2; c++) R[r][c] -= f * R[zeile][c];
    }
    zeile++;
  }
  return zeile;
}

/* ---------------------------------------------- Voreinstellung und Kern-Preset */

const V = [1, 1];
const W = [1, 0];
const X = [1.3, 0.3];
assert.deepEqual(A(V, W), [[1, 0], [1, 0]], "A = v wᵀ in der Voreinstellung");
nah(W[0] * X[0] + W[1] * X[1], 1.3, 1e-12, "wᵀx in der Voreinstellung");
assert.equal(rang(A(V, W)), 1, "A hat Rang 1");
nah(A(V, W)[0][0] * A(V, W)[1][1] - A(V, W)[0][1] * A(V, W)[1][0], 0, 1e-15, "det A = 0");

/* --------------------------- Der Kern ist über die Regler EXAKT erreichbar */

// x₁ = 0 ist ein Rastwert (Schritt 0,1), und dort ist wᵀx exakt null.
for (let j = -20; j <= 20; j++) {
  const x = [0, j / 10];
  assert.equal(W[0] * x[0] + W[1] * x[1], 0, "auf der Kerngeraden ist wᵀx exakt null");
}
// Der nächste Rastwert ist deutlich davon getrennt – die Schwelle 0,08 trennt
// über die Regler also sauber.
nah(W[0] * 0.1 + W[1] * 0, 0.1, 1e-15, "nächster Reglerzustand neben dem Kern");
assert.ok(0.1 > 0.08, "über die Regler liegt der Nachbarzustand über der Schwelle");
// Über den Ziehgriff dagegen sind Zwischenwerte erreichbar, für die die alte
// Aussage „Ax = 0" falsch war – dafür gibt es jetzt den „fast"-Zweig.
const skalarNah = 0.05;
const AxNah = [V[0] * skalarNah, V[1] * skalarNah];
nah(Math.hypot(AxNah[0], AxNah[1]), 0.0707, 1e-4, "‖Ax‖ bei wᵀx = 0,05 – klein, aber nicht null");
assert.ok(Math.hypot(AxNah[0], AxNah[1]) > 0, "Ax ist dort nicht der Nullvektor");
assert.ok(/const kernExakt = rangEins && skalar === 0;/.test(src), "exakter Kern-Zweig fehlt");
assert.ok(/const kernNah = /.test(src), "der Zwischenzweig „fast im Kern“ fehlt");
assert.ok(!/const kernTreffer = rangEins && Math\.abs\(skalar\) < 0\.08;/.test(src), "die alte Toleranz-als-Gleichheit muss weg sein");

/* ---------------------- Kurze Faktoren sind KEINE Nullmatrix (der zweite MAJOR) */

const vKurz = [0.1, 0];
assert.deepEqual(A(vKurz, W), [[0.1, 0], [0, 0]], "A bei sehr kurzem v");
assert.equal(rang(A(vKurz, W)), 1, "A hat auch bei kurzem v noch Rang 1");
assert.ok(A(vKurz, W).flat().some((e) => e !== 0), "A ist dort NICHT die Nullmatrix");
assert.ok(Math.hypot(vKurz[0], vKurz[1]) < 0.12, "…obwohl ‖v‖ unter der alten Schwelle 0,12 liegt");
// Der exakte Fall: ‖v‖ = 0 ist ein Rastwert und liefert wirklich die Nullmatrix.
assert.equal(rang(A([0, 0], W)), 0, "bei v = 0 ist der Rang 0");
assert.ok(A([0, 0], W).flat().every((e) => e === 0), "bei v = 0 ist A die Nullmatrix");
assert.equal(rang(A(V, [0, 0])), 0, "bei w = 0 ebenso");
assert.ok(/const nullFaktor = norm\(v\) === 0 \|\| norm\(w\) === 0;/.test(src), "exakter Nullvektor-Zweig fehlt");
assert.ok(/const kurzerFaktor = /.test(src), "der Zwischenzweig „sehr kurz“ fehlt");
assert.ok(!/norm\(v\) > 0\.12 && norm\(w\) > 0\.12/.test(src), "die alte Rang-Schwelle muss weg sein");

/* ------------------------------------------- Alle drei Zweige sind erreichbar */

let exakt = 0;
let nahe = 0;
let regulaer = 0;
for (let i = -20; i <= 20; i++) {
  for (let j = -20; j <= 20; j++) {
    const skalar = W[0] * (i / 10) + W[1] * (j / 10);
    if (skalar === 0) exakt++;
    else if (Math.abs(skalar) < 0.08) nahe++;
    else regulaer++;
  }
}
assert.ok(exakt > 0 && regulaer > 0, "exakter und regulärer Zweig sind über die Regler erreichbar");
assert.equal(nahe, 0, "über die Regler gibt es keinen Zwischenzustand – der kommt nur vom Ziehgriff");

console.log("REV29 09-tensoren S93RangEins: alle Zahlen bestätigt");
