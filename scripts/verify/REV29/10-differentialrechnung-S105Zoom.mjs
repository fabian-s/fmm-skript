#!/usr/bin/env node
/**
 * REV29 — src/chapters/10-differentialrechnung/widgets/S105Zoom.tsx
 * (ZoomWidget, ZoomSchaetzung).
 *
 * Prüft die Kernzahl des Widgets: die relative Abweichung
 *   D(w) = max_{|t| <= w} |f(x0+t) − S(t)| / w
 * von der Sehne S durch die beiden Fensterränder, für die drei Kurven auf der
 * Zoomleiter w = 2^(−z), z = 0 … 12.
 *
 * Unabhängiger Rechenweg: Die Sollwerte kommen NICHT aus einer Abtastung,
 * sondern aus der geschlossenen Analysis (x0 = 0):
 *   f = x²      : Sehne ist konstant w², Maximum in t = 0, D(w) = w;
 *   f = |x|     : Sehne ist konstant w,  Maximum in t = 0, D(w) = 1;
 *   f = √|x|    : Sehne ist konstant √w, Maximum in t = 0, D(w) = 1/√w.
 * Die Abtastung des Widgets wird daneben mit demselben N nachgebaut und gegen
 * diese Sollwerte gehalten. Zusätzlich wird belegt, dass ein UNGERADES N (der
 * behobene Fehler) die Knickstelle verfehlt und systematisch zu kleine Werte
 * liefert — die Assertion kann also scheitern.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const datei = "src/chapters/10-differentialrechnung/widgets/S105Zoom.tsx";
const src = readFileSync(join(repo, datei), "utf8");

const nah = (a, b, eps, was) =>
  assert.ok(Math.abs(a - b) <= eps, `${was}: ${a} weicht von ${b} ab (> ${eps})`);

/* ------------------------------------------------ N aus dem Quelltext lesen */

const nTreffer = src.match(/^const N = (\d+);/m);
assert.ok(nTreffer, "const N nicht im Quelltext gefunden");
const N = Number(nTreffer[1]);
assert.equal(
  N % 2,
  0,
  `N = ${N} ist ungerade: die Fenstermitte t = 0 liegt dann nicht auf dem Raster und der Knick wird nie getroffen`,
);

/* ------------------------------------------------------- Messung des Widgets */

const KURVEN = {
  quadrat: (x) => x * x,
  betrag: (x) => Math.abs(x),
  wurzel: (x) => Math.sqrt(Math.abs(x)),
};
const KNICK = { quadrat: [], betrag: [0], wurzel: [0] };

/** Nachbau der Widget-Messung (gleichmäßiges Raster plus Knickstellen). */
function dGemessen(id, x0, w, n = N, mitKnick = true) {
  const f = KURVEN[id];
  const a = f(x0 - w);
  const b = f(x0 + w);
  const sehne = (t) => a + ((b - a) * (t + w)) / (2 * w);
  let m = 0;
  for (let i = 0; i <= n; i++) {
    const t = -w + (2 * w * i) / n;
    m = Math.max(m, Math.abs(f(x0 + t) - sehne(t)));
  }
  if (mitKnick) {
    for (const k of KNICK[id]) if (Math.abs(k - x0) <= w) m = Math.max(m, Math.abs(f(k) - sehne(k - x0)));
  }
  return m / w;
}

/* ------------------------------------- Sollwerte aus der geschlossenen Form */

const soll = { quadrat: (w) => w, betrag: () => 1, wurzel: (w) => 1 / Math.sqrt(w) };

for (let z = 0; z <= 12; z++) {
  const w = 2 ** -z;
  for (const id of Object.keys(KURVEN)) {
    nah(dGemessen(id, 0, w), soll[id](w), 1e-12 * Math.max(1, soll[id](w)), `D(w) für ${id}, z = ${z}`);
  }
}

/* --------------------------------------- die im Header behaupteten Einzelwerte */

nah(dGemessen("betrag", 0, 1), 1, 1e-12, "|x| bei w = 1");
nah(dGemessen("betrag", 0, 1e-6), 1, 1e-12, "|x| bei w = 1e−6");
nah(dGemessen("wurzel", 0, 1), 1, 1e-12, "√|x| bei w = 1");
nah(dGemessen("wurzel", 0, 0.25), 2, 1e-12, "√|x| bei w = 0,25");
nah(dGemessen("wurzel", 0, 0.01), 10, 1e-12, "√|x| bei w = 0,01");
nah(dGemessen("wurzel", 0, 2 ** -12), 64, 1e-10, "√|x| bei z = 12");
nah(dGemessen("quadrat", 0, 0.5), 0.5, 1e-12, "x² bei w = 0,5");
// Quotient zweier Zoomstufen: bei x² exakt 2, bei |x| exakt 1, bei √|x| 1/√2.
nah(dGemessen("quadrat", 0, 0.5) / dGemessen("quadrat", 0, 0.25), 2, 1e-12, "Quotient x²");
nah(dGemessen("betrag", 0, 0.5) / dGemessen("betrag", 0, 0.25), 1, 1e-12, "Quotient |x|");
nah(dGemessen("wurzel", 0, 0.5) / dGemessen("wurzel", 0, 0.25), Math.SQRT1_2, 1e-12, "Quotient √|x|");

// Knick daneben: bei x0 = 0,5 und w < 0,5 ist |x| im Fenster exakt gerade.
assert.ok(dGemessen("betrag", 0.5, 0.25) < 1e-14, "|x| bei x0 = 0,5 muss exakt gerade sein");

/* ---------------------------------------- Der behobene Fehler, als Gegenprobe */

// Mit dem alten, ungeraden N verfehlt das Raster die Mitte; die Werte fallen
// systematisch um den Faktor (1 − 1/N) zu klein aus.
const altN = 601;
nah(dGemessen("betrag", 0, 0.5, altN, false), 1 - 1 / altN, 1e-12, "|x| mit ungeradem N");
nah(
  dGemessen("wurzel", 0, 2 ** -12, altN, false),
  64 * (1 - 1 / Math.sqrt(altN)),
  1e-9,
  "√|x| mit ungeradem N",
);
assert.ok(
  Math.abs(dGemessen("betrag", 0, 0.5, altN, false) - 1) > 0.001,
  "mit ungeradem N wäre die zahlfrage (Toleranz 0,001) nicht lösbar",
);

/* ------------------------------------- Die zahlfrage aus S105.mdx ist lösbar */

for (let z = 0; z <= 12; z++) {
  assert.ok(
    Math.abs(dGemessen("betrag", 0, 2 ** -z) - 1) <= 0.001,
    `zahlfrage{loesung=1 toleranz=0.001}: bei z = ${z} muss der angezeigte Wert 1 treffen`,
  );
}

/* ------------------------ Beispiel 10.5.3: einseitige Differenzenquotienten */

for (const h of [0.5, 0.01, 1e-8]) {
  nah((Math.abs(h) - 0) / h, 1, 0, `rechtsseitiger Quotient von |x| bei h = ${h}`);
  nah((Math.abs(-h) - 0) / -h, -1, 0, `linksseitiger Quotient von |x| bei h = ${h}`);
}

console.log(`REV29 ${datei}: Zoomleiter, Knick und Zahlfrage geprüft (N = ${N}).`);
