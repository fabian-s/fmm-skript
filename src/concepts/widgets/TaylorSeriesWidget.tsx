/**
 * QA-L3-Nachprüfung: `verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget `taylor-series` (Gruppe C, KEEP + Politur 2026-08-19).
 *
 * DIE EINE EINSICHT: Ein höherer Grad verbreitert nur das Fenster, in dem das
 * Polynom mitläuft; außerhalb reißt es umso heftiger aus. Ein Taylor-Polynom
 * ist eine lokale Aussage, keine globale.
 *
 * ABGRENZUNG (Dublette C6): Dieses Widget trägt die Rolle „wie weit trägt die
 * Reihe"; das Restglied mit seiner Schranke steht im Widget zu
 * `taylor-theorem`.
 *
 * FARBROLLEN: blau = sin; rot (gestrichelt) = Taylor-Polynom vom Grad n; graue
 * Marken = die Stelle x = π, an der wir den Fehler ablesen.
 *
 * PROVENIENZ: Reihenauswertung (aufsteigende Rekursion der Terme) und
 * Gradregler aus der Vorfassung; neu sind Legende/Achsen aus `Plot` v2, die
 * gemessene Breite des Übereinstimmungsfensters und das Verdikt. Der
 * erklärende Absatz steht in taylor-series.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/REV2/TaylorSeriesWidget.mjs,
 * 2026-08-20): |sin π − p_n(π)| = 3,142 (n = 1), 2,026 (n = 3), 5,240·10⁻¹
 * (n = 5), 7,522·10⁻² (n = 7), 6,925·10⁻³ (n = 9), 4,452·10⁻⁴ (n = 11),
 * 2,114·10⁻⁵ (n = 13); bei x = 2π dagegen 6,283 / 3,506·10¹ / 4,655·10¹ /
 * 3,016·10¹ / 1,190·10¹ / 3,195 / 6,249·10⁻¹ — der Fehler wächst dort erst
 * einmal. Grad 3 bei x = 0,5: 0,479167 gegen sin(0,5) = 0,479426.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

/** Taylor-Polynom von sin um 0, abgeschnitten bei Grad n (n ungerade). */
function sinTaylor(x: number, n: number): number {
  let term = x; // x^1 / 1!
  let sum = x;
  for (let k = 1; 2 * k + 1 <= n; k++) {
    term *= (-x * x) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return sum;
}

/** Zehnerpotenz-Schreibweise im deutschen Format: 7,5 · 10⁻². */
function expDe(v: number): string {
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / Math.pow(10, e);
  const hoch = String(e).replace("-", "⁻").replace(/[0-9]/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]);
  return `${fmtDe(m, 1)} · 10${hoch}`;
}

/** Größtes x, bis zu dem |sin − p_n| unter 0,01 bleibt. */
function guteBreite(n: number): number {
  for (let i = 1; i <= 1400; i++) {
    const x = i / 200;
    if (Math.abs(Math.sin(x) - sinTaylor(x, n)) > 0.01) return (i - 1) / 200;
  }
  return 7;
}

export function TaylorWidget() {
  const [n, setN] = useState(3);
  const fehlerPi = Math.abs(Math.sin(Math.PI) - sinTaylor(Math.PI, n));
  const breite = guteBreite(n);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Erhöhen wir den Grad und schauen, wie weit das Polynom mitläuft.</Aufgabe>
      <Plot
        xLabel="x"
        yLabel="f(x)"
        xDomain={[-7, 7]}
        yDomain={[-3, 3]}
        width={320}
        height={220}
        readout
        ariaLabel={`sin und Taylor-Polynom vom Grad ${n}; die Kurven stimmen bis etwa x gleich ${fmtDe(breite, 2)} überein.`}
        series={[
          { f: (x) => Math.sin(x), color: FMM_COLORS.blau, label: "sin x" },
          { f: (x) => sinTaylor(x, n), color: FMM_COLORS.rot, dash: [5, 4], label: `p${"₀₁₂₃₄₅₆₇₈₉"[n] ?? n}` },
        ]}
        vlines={[{ at: Math.PI, color: FMM_COLORS.grau, dash: [3, 3], label: "x = π" }]}
        points={[{ x: Math.PI, y: 0, color: FMM_COLORS.grau, r: 3 }]}
      />
      <Slider label="Grad n" value={n} onChange={setN} min={1} max={13} step={2} accent={FMM_COLORS.rot} />
      <Verdikt kind={fehlerPi < 0.01 ? "ok" : "warn"}>
        Bis |x| ≈ {fmtDe(breite, 2)} weicht das Polynom vom Grad {n} um weniger als 0,01 von sin ab; an der Stelle π
        beträgt der Fehler {expDe(fehlerPi)}. Jeder weitere Term
        schiebt diese Grenze hinaus, aber weit draußen (etwa bei 2π) wächst der Fehler mit
        steigendem Grad zunächst sogar.
      </Verdikt>
    </div>
  );
}
