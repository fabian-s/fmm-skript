import { useMemo, useState } from "react";
import { LabeledPlot, Slider } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * §2.5: Gezählte Schrittzahlen der naiven vs. der iterativen
 * Fibonacci-Variante gegen die Landau-Vorhersage, auf log-Skala.
 *
 * Punkte: exakte Zählungen (Aufrufzahl T(n) über die Rekurrenz
 * T(n) = 1 + T(n-1) + T(n-2); Operationszahl 4n - 6 der Iteration).
 * Linien: Landau-Vorhersagen c·2ⁿ, c·φⁿ und c·n, jeweils bei n = 10
 * an die gezählten Werte angeheftet.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const RED = "#D55E00"; // naive Rekursion (wie \cred im Text)
const BLUE = "#0072B2"; // iterative Variante (wie \cblue im Text)
const N0 = 10; // Ankerpunkt für die Vorhersage-Konstanten

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function sup(e: number): string {
  return String(e)
    .split("")
    .map((d) => SUP[Number(d)])
    .join("");
}

/** Zahl deutsch formatieren; ab 10⁶ wissenschaftlich. */
function fmtCount(x: number): string {
  if (x < 1e6) return Math.round(x).toLocaleString("de-DE");
  const e = Math.floor(Math.log10(x));
  const m = x / 10 ** e;
  return `${m.toFixed(1).replace(".", ",")} · 10${sup(e)}`;
}

/** Modell-Laufzeit bei 10⁹ Elementarschritten pro Sekunde. */
function fmtTime(ops: number): string {
  const s = ops / 1e9;
  if (s < 1e-6) return `${Math.max(1, Math.round(s * 1e9))} ns`;
  if (s < 1e-3) return `${Math.round(s * 1e6)} µs`;
  if (s < 1) return `${(s * 1e3).toFixed(1).replace(".", ",")} ms`;
  if (s < 120) return `${s.toFixed(1).replace(".", ",")} s`;
  if (s < 7200) return `${(s / 60).toFixed(0)} min`;
  if (s < 2 * 86400) return `${(s / 3600).toFixed(1).replace(".", ",")} h`;
  const years = s / 3.156e7;
  if (years < 1) return `${(s / 86400).toFixed(0)} Tage`;
  return `${fmtCount(Math.round(years))} Jahre`;
}

export function S25FibVergleichWidget() {
  const [nMax, setNMax] = useState(30);
  const [showPhi, setShowPhi] = useState(true);

  const { T, markers, series, yMax } = useMemo(() => {
    // Exakte Aufrufzahl der naiven Rekursion: T(n) = 1 + T(n-1) + T(n-2).
    const T: number[] = [1, 1];
    for (let n = 2; n <= nMax; n++) T[n] = 1 + T[n - 1] + T[n - 2];
    // Gezählte Operationen der Iteration (n Initialisierungen + 3(n-2) Schleifenkosten).
    const itOps = (n: number) => 4 * n - 6;

    const L2 = Math.log10(2);
    const LPHI = Math.log10(PHI);
    // Vorhersage-Konstanten: Kurven bei n = N0 an die Zählungen anheften.
    const a2 = Math.log10(T[N0]) - N0 * L2; // log10(c) für c·2^n
    const aPhi = Math.log10(T[N0]) - N0 * LPHI; // log10(c) für c·φ^n
    const c1 = itOps(N0) / N0; // c für c·n

    const markers: { x: number; y: number; color: string }[] = [];
    const step = nMax > 40 ? 2 : 1;
    for (let n = nMax; n >= 2; n -= step) {
      markers.push({ x: n, y: Math.log10(T[n]), color: RED });
      markers.push({ x: n, y: Math.log10(itOps(n)), color: BLUE });
    }

    const series: Series[] = [
      { f: (x) => a2 + x * L2, color: RED, dash: [7, 4] },
      ...(showPhi ? [{ f: (x: number) => aPhi + x * LPHI, color: RED, dash: [2, 4] }] : []),
      { f: (x) => (x > 0 ? Math.log10(c1 * x) : NaN), color: BLUE, dash: [7, 4] },
    ];

    const yMax = Math.max(a2 + nMax * L2, Math.log10(T[nMax])) + 0.5;
    return { T, markers, series, yMax };
  }, [nMax, showPhi]);

  const naive = T[nMax];
  const iter = 4 * nMax - 6;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Die Punkte sind <em>exakt gezählte</em> Schrittzahlen: rot die Aufrufe der naiven
        Rekursion, blau die Operationen der iterativen Variante. Die y-Achse zeigt den
        Zehnerlogarithmus der Schrittzahl. Auf dieser Skala wird exponentielles Wachstum zu
        einer Geraden, und die Steigung verrät die Basis. Die gestrichelten Linien sind die
        Landau-Vorhersagen (bei <span className="font-mono">n = 10</span> an die Zählungen
        angeheftet).
      </p>
      <Slider
        label="n (Größe)"
        value={nMax}
        onChange={(v) => setNMax(Math.round(v))}
        min={10}
        max={80}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="accent-sky-600"
          checked={showPhi}
          onChange={(e) => setShowPhi(e.target.checked)}
        />
        scharfe Vorhersage c·φⁿ (goldener Schnitt) einblenden
      </label>
      <LabeledPlot
        xLabel="n"
        yLabel="log₁₀(Schritte)"
        series={series}
        markers={markers}
        xDomain={[0, nMax + 1]}
        yDomain={[0, yMax]}
        width={460}
        height={300}
      />
      <div className="max-w-prose space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <p>
          <span style={{ color: RED }}>●</span> naive Rekursion (gezählte Aufrufe) &ensp;
          <span style={{ color: RED }}>– –</span> Schranke c·2ⁿ &ensp;
          {showPhi && (
            <>
              <span style={{ color: RED }}>· ·</span> scharfe Vorhersage c·φⁿ &ensp;
            </>
          )}
          <span style={{ color: BLUE }}>●</span> iterativ (gezählte Operationen) &ensp;
          <span style={{ color: BLUE }}>– –</span> Vorhersage c·n
        </p>
      </div>
      <div className="max-w-prose rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        Bei <span className="font-mono">n = {nMax}</span>: naive Rekursion{" "}
        <span className="font-semibold" style={{ color: RED }}>
          {fmtCount(naive)}
        </span>{" "}
        Aufrufe (Modellrechnung bei 10⁹ Schritten/s: ≈ {fmtTime(naive)}), iterative Variante{" "}
        <span className="font-semibold" style={{ color: BLUE }}>
          {fmtCount(iter)}
        </span>{" "}
        Operationen (≈ {fmtTime(iter)}).
      </div>
      <p className="max-w-prose text-sm">
        Zwei Beobachtungen: Die roten Punkte liegen exakt auf einer Geraden, aber auf der
        flacheren mit Steigung log₁₀ φ ≈ 0,209, nicht auf der 2ⁿ-Geraden mit Steigung
        log₁₀ 2 ≈ 0,301. Die Schranke O(2ⁿ) von den Folien ist also korrekt, aber nicht
        scharf; das tatsächliche Wachstum hat die Basis φ ≈ 1,618 (siehe Vertiefung oben).
        Die blauen Punkte dagegen bleiben auf der logarithmischen Skala fast am Boden:
        lineares Wachstum ist hier praktisch unsichtbar.
      </p>
    </div>
  );
}
