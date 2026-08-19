import { useMemo, useState, type ReactNode } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, Schaetzfrage, Slider, Verdikt } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * Kosten-Vergleich für §5.3 (Komplexität): J Gleichungssysteme mit derselben
 * Matrix lösen: einmal zerlegen und dann nur noch substituieren
 * (n³/3 + J·n²) gegen jedes Mal komplett neu eliminieren (J·(n³/3 + n²)).
 * Einsicht: Bei zwei rechten Seiten lohnt die gespeicherte Zerlegung bereits.
 * Farbrollen: gespeicherte Zerlegung grün, Neuansatz rot, κ/Verstärkung orange unbenutzt.
 * Provenienz: neu für dieses Skript. Zahlen: Schwelle J=2, Kostenformeln in verify-05-lgs/verify.mjs, 2026-08-19.
 */

const { gruen: GREEN, rot: RED } = FMM_COLORS;

const J_MAX = 500;

/** Multiplikationen der LU-Strategie: einmal zerlegen, dann je System
 *  Vorwärts- plus Rückwärtssubstitution. */
const kostenLU = (n: number, J: number) => (n * n * n) / 3 + J * n * n;
/** Multiplikationen, wenn jedes System komplett neu eliminiert wird. */
const kostenNeu = (n: number, J: number) => J * ((n * n * n) / 3 + n * n);

/** Wert deutsch formatiert; große Werte als Mantisse · 10^Exponent. */
function fmtVal(v: number): ReactNode {
  if (!Number.isFinite(v)) return "∞";
  if (v >= 1e5) {
    const e = Math.floor(Math.log10(v));
    const m = v / Math.pow(10, e);
    return (
      <>
        {m.toFixed(1).replace(".", ",")}&thinsp;·&thinsp;10<sup>{e}</sup>
      </>
    );
  }
  return Math.round(v).toLocaleString("de-DE");
}

export function LUKostenPlot() {
  const [n, setN] = useState(100);
  const [J, setJ] = useState(50);

  const cLU = kostenLU(n, J);
  const cNeu = kostenNeu(n, J);
  const faktor = cNeu / cLU;

  const { series, yDomain } = useMemo(() => {
    // Serien als FUNKTIONEN von J; außerhalb des Definitionsbereichs NaN,
    // damit der lib-Plot dort einfach nichts zeichnet.
    const s: Series[] = [
      { f: (x) => (x >= 1 ? Math.log10(kostenLU(n, x)) : NaN), color: GREEN },
      { f: (x) => (x >= 1 ? Math.log10(kostenNeu(n, x)) : NaN), color: RED },
    ];
    const lo = Math.log10(kostenLU(n, 1));
    const hi = Math.log10(kostenNeu(n, J_MAX));
    return { series: s, yDomain: [lo - 0.4, hi + 0.3] as [number, number] };
  }, [n]);

  return (
    <Schaetzfrage frage="Bei wie vielen rechten Seiten lohnt sich das einmalige Zerlegen?" loesung={2} toleranz={0.5} min={1} max={10} schritt={1}>
      <div className="text-sm">
      <Aufgabe>Vergleichen wir die beiden Kostenkurven bei verschiedenen Werten von J.</Aufgabe>
      <div className="max-w-md">
        <Slider
          label="n"
          value={n}
          onChange={(v) => setN(Math.round(v))}
          min={10}
          max={1000}
          step={10}
          fmt={(v) => String(v)}
        />
        <Slider
          label="J"
          value={J}
          onChange={(v) => setJ(Math.round(v))}
          min={1}
          max={J_MAX}
          step={1}
          fmt={(v) => String(v)}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-start gap-6">
        <LabeledPlot
          xLabel="J (rechte Seiten)"
          yLabel="log₁₀ Multiplikationen"
          series={series}
          xDomain={[1, J_MAX]}
          yDomain={yDomain}
          width={360}
          height={240}
          markers={[
            { x: J, y: Math.log10(kostenLU(n, J)), color: GREEN },
            { x: J, y: Math.log10(kostenNeu(n, J)), color: RED },
          ]}
        />
        <div className="max-w-xs space-y-1">
          <p className="font-mono text-xs">
            n = {n}, J = {J}
          </p>
          <p className="font-mono text-xs" style={{ color: GREEN }}>
            zerlegen + substituieren: {fmtVal(cLU)}
          </p>
          <p className="font-mono text-xs" style={{ color: RED }}>
            jedes Mal neu: {fmtVal(cNeu)}
          </p>
          <p className="font-mono text-xs">Ersparnisfaktor: {faktor.toFixed(1).replace(".", ",")}×</p>
          <Verdikt kind="neutral">Bei J = 50 beträgt die Ersparnis aktuell {faktor.toFixed(1).replace(".", ",")}×; die Auflösung ordnet den Schwellenwert ein.</Verdikt>
        </div>
      </div>
      </div>
    </Schaetzfrage>
  );
}
