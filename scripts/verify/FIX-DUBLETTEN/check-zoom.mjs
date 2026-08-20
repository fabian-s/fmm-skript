/**
 * FIX-DUBLETTEN, 2026-08-20 — Zoomfenster der Variante `epsilon` von
 * src/concepts/widgets/FloatingPointWidget.tsx.
 *
 * Geprüft wird, was der Widget-Header behauptet: das Fenster [1 − ε, 1 + ε]
 * (am Strahl [0,5; 8] gekappt), sein Inhalt an Gitterpunkten und der Anteil
 * der ε-Lücke an der Fensterbreite.
 */
import assert from "node:assert/strict";

const X_MIN = 0.5;
const X_MAX = 8;
const EXPONENTEN = [-1, 0, 1, 2];

const gitter = (t) => {
  const w = [];
  for (const e of EXPONENTEN) for (let k = 0; k < 2 ** t; k++) w.push((1 + k / 2 ** t) * 2 ** e);
  w.push(2 ** (EXPONENTEN[EXPONENTEN.length - 1] + 1));
  return w;
};
const fenster = (t) => {
  const eps = 2 ** -t;
  return [Math.max(X_MIN, 1 - eps), Math.min(X_MAX, 1 + eps)];
};

const erwartet = {
  1: [0.5, 1.5],
  2: [0.75, 1.25],
  3: [0.875, 1.125],
  4: [0.9375, 1.0625],
  5: [0.96875, 1.03125],
};

for (const t of [1, 2, 3, 4, 5]) {
  const eps = 2 ** -t;
  const [lo, hi] = fenster(t);
  assert.deepEqual([lo, hi], erwartet[t], `Fenster t=${t}`);

  // Gitterpunkte im Fenster: der linke und der rechte Nachbar von 1 sind sichtbar.
  const drin = gitter(t).filter((v) => v >= lo - 1e-12 && v <= hi + 1e-12);
  assert.ok(drin.length >= 4, `zu wenige Striche bei t=${t}: ${drin.length}`);
  assert.ok(drin.includes(1), `die 1 fehlt im Fenster bei t=${t}`);

  // Gitterweite springt an der 1 von eps/2 auf eps.
  const links = drin.filter((v) => v < 1).sort((a, b) => a - b);
  const rechts = drin.filter((v) => v >= 1).sort((a, b) => a - b);
  const dLinks = links[links.length - 1] - links[links.length - 2];
  const dRechts = rechts[1] - rechts[0];
  assert.ok(Math.abs(dLinks - eps / 2) < 1e-12, `Weite links von 1 bei t=${t}: ${dLinks}`);
  assert.ok(Math.abs(dRechts - eps) < 1e-12, `Weite rechts von 1 bei t=${t}: ${dRechts}`);

  // Anteil der ε-Lücke an der Fensterbreite (im Gesamtbild wären es 0,4 %–6,7 %).
  const anteil = eps / (hi - lo);
  assert.ok(Math.abs(anteil - 0.5) < 1e-12, `ε-Band falsch skaliert bei t=${t}: ${(100 * anteil).toFixed(1)} %`);
  const gesamt = eps / (X_MAX - X_MIN);
  console.log(
    `t=${t}: Fenster [${lo}, ${hi}], ${drin.length} Striche, ` +
      `ε = ${eps}, Band ${(100 * anteil).toFixed(1)} % (im Gesamtstrahl ${(100 * gesamt).toFixed(1)} %)`,
  );
}

// Die Voreinstellung x = 1,1875 der Variante epsilon liegt im Startfenster (t = 2).
const [lo2, hi2] = fenster(2);
assert.ok(1.1875 >= lo2 && 1.1875 <= hi2, "Voreinstellung x = 1,1875 liegt außerhalb des Startfensters");

console.log("alle Zusicherungen bestanden");
