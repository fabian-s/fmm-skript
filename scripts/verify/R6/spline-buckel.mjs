// §13.6: Zahlen zum Buckel-Beispiel und zum Konvergenz-Widget, 2026-08-27.
// Geprueft werden die Tabelle in Beispiel "Ein Buckel auf dem Einheitsintervall",
// die Vergleichszahlen der Bemerkung "Welcher Spline die Konstante traegt" und
// die im Kopf von S136Konvergenz.tsx dokumentierten Widget-Werte.
const near = (actual, expected, tolerance, label) => {
  if (!(Math.abs(actual - expected) <= tolerance)) {
    throw new Error(`${label}: ${actual} != ${expected}`);
  }
};

const ALPHA = 40;
const MITTE = 2 / 5;
const f = (x) => Math.exp(-ALPHA * (x - MITTE) ** 2);
const fStrich = (x) => -2 * ALPHA * (x - MITTE) * f(x);
const fVier = (x) => {
  const t = x - MITTE;
  return (12 * ALPHA ** 2 - 48 * ALPHA ** 3 * t ** 2 + 16 * ALPHA ** 4 * t ** 4) * f(x);
};

/** Kubischer Spline ueber die Momente M_i = s''(x_i); Thomas-Algorithmus. */
function spline(xs, ys, rand) {
  const n = xs.length - 1;
  const hs = [];
  for (let i = 0; i < n; i++) hs.push(xs[i + 1] - xs[i]);
  const m = n + 1;
  const unter = new Array(m).fill(0);
  const diag = new Array(m).fill(0);
  const ober = new Array(m).fill(0);
  const rechts = new Array(m).fill(0);
  for (let i = 1; i < n; i++) {
    unter[i] = hs[i - 1];
    diag[i] = 2 * (hs[i - 1] + hs[i]);
    ober[i] = hs[i];
    rechts[i] = 6 * ((ys[i + 1] - ys[i]) / hs[i] - (ys[i] - ys[i - 1]) / hs[i - 1]);
  }
  if (rand === "natuerlich") {
    diag[0] = 1;
    diag[n] = 1;
  } else {
    diag[0] = 2 * hs[0];
    ober[0] = hs[0];
    rechts[0] = 6 * ((ys[1] - ys[0]) / hs[0] - fStrich(xs[0]));
    unter[n] = hs[n - 1];
    diag[n] = 2 * hs[n - 1];
    rechts[n] = 6 * (fStrich(xs[n]) - (ys[n] - ys[n - 1]) / hs[n - 1]);
  }
  const co = new Array(m);
  const cr = new Array(m);
  co[0] = ober[0] / diag[0];
  cr[0] = rechts[0] / diag[0];
  for (let k = 1; k < m; k++) {
    const nenner = diag[k] - unter[k] * co[k - 1];
    co[k] = ober[k] / nenner;
    cr[k] = (rechts[k] - unter[k] * cr[k - 1]) / nenner;
  }
  const M = new Array(m);
  M[m - 1] = cr[m - 1];
  for (let k = m - 2; k >= 0; k--) M[k] = cr[k] - co[k] * M[k + 1];
  return (x) => {
    let i = 0;
    if (x <= xs[0]) i = 0;
    else if (x >= xs[n]) i = n - 1;
    else {
      let lo = 0;
      let hi = n;
      while (hi - lo > 1) {
        const mitte = (lo + hi) >> 1;
        if (x < xs[mitte]) hi = mitte;
        else lo = mitte;
      }
      i = lo;
    }
    const h = hs[i];
    const A = xs[i + 1] - x;
    const B = x - xs[i];
    return (
      (M[i] * A ** 3) / (6 * h) + (M[i + 1] * B ** 3) / (6 * h) +
      (ys[i] / h - (M[i] * h) / 6) * A + (ys[i + 1] / h - (M[i + 1] * h) / 6) * B
    );
  };
}

const ABTASTUNG = 400001;
function messe(knoten, rand) {
  const n = knoten - 1;
  const xs = [];
  const ys = [];
  for (let i = 0; i <= n; i++) { xs.push(i / n); ys.push(f(i / n)); }
  const s = spline(xs, ys, rand);
  let fehler = 0;
  let argmax = 0;
  let hoch = -Infinity;
  let tief = Infinity;
  for (let k = 0; k < ABTASTUNG; k++) {
    const x = k / (ABTASTUNG - 1);
    const wert = s(x);
    if (wert > hoch) hoch = wert;
    if (wert < tief) tief = wert;
    const e = Math.abs(f(x) - wert);
    if (e > fehler) { fehler = e; argmax = x; }
  }
  const h = 1 / n;
  return { h, schranke: (5 / 384) * h ** 4 * M4, fehler, argmax, hoch, tief };
}

// M_4 = 12 alpha^2, angenommen in der Spitze.
let M4 = 0;
for (let k = 0; k < ABTASTUNG; k++) M4 = Math.max(M4, Math.abs(fVier(k / (ABTASTUNG - 1))));
near(M4, 12 * ALPHA ** 2, 1e-6, "M4");
near(M4, 19200, 1e-6, "M4 numerisch");

// Tabelle des Beispiels (vollstaendiger/eingespannter Spline)
const tabelle = [
  [5, 0.25, 0.977, 0.324, null],
  [9, 0.125, 0.0610, 0.0239, 13.6],
  [17, 0.0625, 3.81e-3, 1.11e-3, 21.6],
  [33, 0.03125, 2.38e-4, 5.16e-5, 21.4],
  [65, 0.015625, 1.49e-5, 3.05e-6, 16.9],
  [129, 0.0078125, 9.31e-7, 1.87e-7, 16.3],
];
const verhaeltnisse = [0.33, 0.39, 0.29, 0.22, 0.20, 0.20];
let vorher = null;
tabelle.forEach(([knoten, h, schranke, fehler, faktor], i) => {
  const z = messe(knoten, "eingespannt");
  near(z.h, h, 1e-12, `h bei ${knoten}`);
  near(z.schranke, schranke, Math.abs(schranke) * 5e-3, `Schranke bei ${knoten}`);
  near(z.fehler, fehler, Math.abs(fehler) * 5e-3, `Fehler bei ${knoten}`);
  if (faktor !== null) near(vorher / z.fehler, faktor, 0.05, `Faktor bei ${knoten}`);
  near(z.fehler / z.schranke, verhaeltnisse[i], 0.005, `Verhaeltnis bei ${knoten}`);
  vorher = z.fehler;
});

// Prosa des Beispiels: Buckelhoehe 0,71 und Unterschwinger -0,056 bei 5 Knoten.
const grob = messe(5, "eingespannt");
near(grob.hoch, 0.71, 0.005, "Spline-Hoehe bei 5 Knoten");
near(grob.tief, -0.056, 0.0005, "Unterschwinger bei 5 Knoten");
near(messe(3, "eingespannt").hoch, 0.6703, 5e-4, "Spline-Hoehe bei 3 Knoten");

// Bemerkung "Welcher Spline die Konstante traegt": der natuerliche Spline.
near(messe(5, "natuerlich").fehler, 0.341, 5e-4, "natuerlich, 5 Knoten");
const nat33 = messe(33, "natuerlich");
near(nat33.argmax, 0.012, 5e-4, "natuerlich, Fehlerort bei 33 Knoten");
const nat65 = messe(65, "natuerlich");
near(nat65.fehler, 1.84e-5, 1e-7, "natuerlich, Fehler bei 65 Knoten");
near(nat65.schranke, 1.49e-5, 1e-7, "Schranke bei 65 Knoten");
if (!(nat65.fehler > nat65.schranke)) throw new Error("natuerlich bei 65 Knoten: Schranke nicht verletzt");

// Widget-Kopf von S136Konvergenz.tsx: gleiche Werte bei 8001 Abtastpunkten.
const widget = [
  [3, 15.625, 0.4423233],
  [5, 0.97656, 0.3244323],
  [9, 0.061035, 0.0238954],
  [17, 0.0038147, 0.00110657],
  [33, 0.00023842, 5.1615e-5],
  [65, 1.4901e-5, 3.0523e-6],
];
for (const [knoten, schranke, fehler] of widget) {
  const n = knoten - 1;
  const xs = [];
  const ys = [];
  for (let i = 0; i <= n; i++) { xs.push(i / n); ys.push(f(i / n)); }
  const s = spline(xs, ys, "eingespannt");
  let e = 0;
  for (let k = 0; k < 8001; k++) e = Math.max(e, Math.abs(f(k / 8000) - s(k / 8000)));
  near((5 / 384) * (1 / n) ** 4 * M4, schranke, Math.abs(schranke) * 1e-3, `Widget-Schranke ${knoten}`);
  near(e, fehler, Math.abs(fehler) * 2e-3, `Widget-Fehler ${knoten}`);
}

console.log("R6 §13.6 Buckel-Beispiel und Konvergenz-Widget: OK");
