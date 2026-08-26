/**
 * QA-L3-Nachprüfung: `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget `taylor-theorem` (Gruppe C, REPLACE 2026-08-19).
 *
 * DIE EINE EINSICHT: Der Satz von Taylor liefert nicht nur ein Polynom,
 * sondern eine GARANTIE: die Funktion bleibt im Schlauch p_n(t) ± |t|ⁿ⁺¹/(n+1)!
 * um das Polynom, und dieser Schlauch schnürt sich mit wachsender Ordnung und
 * kleinerem |t| zu.
 *
 * ABGRENZUNG (Dublette C6): Die Vorfassung zeigte dasselbe Bild wie
 * `taylor-series` mit weniger Ordnungen. Der Satz ist aber das Restglied, also
 * zeigt dieses Widget die Lagrange-Schranke als Fehlerband; die Frage „wie
 * weit trägt die Reihe" bleibt bei `taylor-series`.
 *
 * FARBROLLEN: blau = sin t; grün (gestrichelt) = Taylor-Polynom p_n; rot
 * (gepunktet) = die beiden Ränder des garantierten Bandes p_n ± Schranke;
 * grauer Strich = die Auswertungsstelle t₀.
 *
 * PROVENIENZ: Ersetzt die frühere Dublette zu `taylor-series`: Die
 * Reihenauswertung bleibt, das neue Diagramm zeichnet aus dem
 * Lagrange-Restglied die garantierte obere und untere Bandgrenze.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/TaylorTheoremWidget.mjs,
 * 2026-08-20), |R_n(t)| gegen die Schranke |t|ⁿ⁺¹/(n+1)!:
 *   n = 1: t = 0,5 → 2,057·10⁻² gegen 1,250·10⁻¹ (16,5 %); t = 1 → 1,585·10⁻¹
 *          gegen 5,000·10⁻¹; t = 2 → 1,091 gegen 2,000; t = 3 → 2,859 gegen 4,500
 *   n = 3: t = 0,5 → 2,589·10⁻⁴ gegen 2,604·10⁻³; t = 1 → 8,138·10⁻³ gegen
 *          4,167·10⁻²; t = 2 → 2,426·10⁻¹ gegen 6,667·10⁻¹
 *   n = 5: t = 0,5 → 1,545·10⁻⁶ gegen 2,170·10⁻⁵; t = 1 → 1,957·10⁻⁴ gegen
 *          1,389·10⁻³; t = 2 → 2,404·10⁻² gegen 8,889·10⁻²
 * Die Schranke bleibt unter 0,05 für |t| < 0,3162 (n = 1), |t| < 1,047
 * (n = 3), |t| < 1,8171 (n = 5). Kontrollwert sin(0,1) − 0,1 = −1,666·10⁻⁴.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

/** Taylor-Polynom von sin um 0 bis Grad n (n ungerade). */
function pN(t: number, n: number): number {
  let term = t;
  let sum = t;
  for (let k = 1; 2 * k + 1 <= n; k++) {
    term *= (-t * t) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return sum;
}

function fakultaet(n: number): number {
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

/** Lagrange-Schranke |R_n(t)| ≤ |t|^{n+1}/(n+1)!, da alle Ableitungen von sin durch 1 beschränkt sind. */
function schranke(t: number, n: number): number {
  return Math.pow(Math.abs(t), n + 1) / fakultaet(n + 1);
}

/** Zehnerpotenz-Schreibweise im deutschen Format: 7,5 · 10⁻². */
function expDe(v: number): string {
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / Math.pow(10, e);
  const hoch = String(e).replace("-", "⁻").replace(/[0-9]/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]);
  return `${fmtDe(m, 2)} · 10${hoch}`;
}

const HOCH = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";
const TIEF = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
const hoch = (n: number) => String(n).replace(/[0-9]/g, (d) => HOCH[Number(d)]);
const tief = (n: number) => String(n).replace(/[0-9]/g, (d) => TIEF[Number(d)]);

const RAND: [number, number][] = [];
for (let i = 0; i <= 240; i++) RAND.push([-3.5 + (7 * i) / 240, 0]);

export function TaylorRestgliedWidget() {
  const [n, setN] = useState(3);
  const [t0, setT0] = useState(2);

  const oben = RAND.map(([t]) => [t, pN(t, n) + schranke(t, n)] as [number, number]);
  const unten = RAND.map(([t]) => [t, pN(t, n) - schranke(t, n)] as [number, number]);
  const rest = Math.abs(Math.sin(t0) - pN(t0, n));
  const bound = schranke(t0, n);
  const anteil = bound > 0 ? rest / bound : 0;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Erhöhen wir die Ordnung und beobachten, wie sich das rote Band um das Polynom pₙ schnürt –
        die blaue sin-Kurve muss darin bleiben.
      </Aufgabe>
      <Plot
        xLabel="t"
        yLabel="f(t)"
        xDomain={[-3.5, 3.5]}
        yDomain={[-2.2, 2.2]}
        width={320}
        height={230}
        readout
        ariaLabel={`sin, Taylor-Polynom der Ordnung ${n} und das garantierte Fehlerband; bei t = ${fmtDe(t0, 2)} ist das Restglied ${expDe(rest)}, die Schranke ${expDe(bound)}.`}
        series={[
          { f: Math.sin, color: FMM_COLORS.blau, label: "sin t" },
          { f: (t) => pN(t, n), color: FMM_COLORS.gruen, dash: [5, 4], label: `p${tief(n)}` },
        ]}
        polylines={[
          { pts: oben, color: FMM_COLORS.rot, dash: [2, 3], label: "pₙ ± Schranke" },
          { pts: unten, color: FMM_COLORS.rot, dash: [2, 3] },
        ]}
        vlines={[{ at: t0, color: FMM_COLORS.grau, dash: [4, 3] }]}
        points={[
          { x: t0, y: Math.sin(t0), color: FMM_COLORS.blau, r: 3.5 },
          { x: t0, y: pN(t0, n), color: FMM_COLORS.gruen, r: 3.5 },
        ]}
      />
      <Slider label="Ordnung n" value={n} onChange={setN} min={1} max={5} step={2} accent={FMM_COLORS.gruen} />
      <Slider label="Stelle t₀" value={t0} onChange={setT0} min={0.2} max={3} step={0.05} accent={FMM_COLORS.grau} />
      <Verdikt kind={rest <= bound ? "ok" : "fail"}>
        Bei t₀ = {fmtDe(t0, 2)} beträgt der tatsächliche Fehler |R{tief(n)}(t₀)| = {expDe(rest)},
        die Lagrange-Schranke |t₀|{hoch(n + 1)}/{n + 1}! = {expDe(bound)}. Der Fehler schöpft sie zu{" "}
        {fmtDe(100 * anteil, 0)} % aus; garantiert ist nur die Schranke, und sie gilt ohne
        Kenntnis der Zwischenstelle ξ.
      </Verdikt>
    </div>
  );
}
