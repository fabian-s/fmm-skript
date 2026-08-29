import { useMemo, useState, type ReactNode } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, Schaetzfrage, Slider, Verdikt } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * Kosten-Vergleich für §5.3 (Komplexität): J Gleichungssysteme mit derselben
 * Matrix lösen: einmal zerlegen und dann nur noch substituieren
 * (n³/3 + J·n²) gegen jedes Mal komplett neu eliminieren (J·(n³/3 + n²)).
 * Einsicht: Bei zwei rechten Seiten lohnt die gespeicherte Zerlegung bereits.
 * Farbrollen: gespeicherte Zerlegung grün, Neuansatz rot, κ/Verstärkung orange unbenutzt.
 * Provenienz: neu für dieses Skript. Zahlen: Schwelle J=2, Kostenformeln und
 * die drei Verdikt-Regime in scripts/verify/R3/widgets-05.mjs und
 * scripts/verify/REV29/05-lgs-Anwendungen.mjs, 2026-08-29.
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
    <Schaetzfrage
      frage="Bei wie vielen rechten Seiten lohnt sich das einmalige Zerlegen?"
      loesung={2}
      toleranz={0.5}
      min={1}
      max={10}
      schritt={1}
      start={5}
      verdeckt={
        <div className="max-w-prose text-sm">
          <p>
            Gleichsetzen der beiden Kosten: <span className="font-mono">n³/3 + J·n² = J·(n³/3 + n²)</span>,
            also <span className="font-mono">n³/3 = J·n³/3</span> und damit{" "}
            <span className="font-mono">J = 1</span> als Gleichstand. Schon die zweite rechte
            Seite bezahlt die Zerlegung nur einmal statt zweimal – ab <span className="font-mono">J = 2</span>{" "}
            ist die gespeicherte Zerlegung strikt billiger.
          </p>
        </div>
      }
    >
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
        {/* Fenster an J gekoppelt: bei J_MAX läge die Schwelle J = 2 im ersten Pixel. */}
        <LabeledPlot
          xLabel="J (rechte Seiten)"
          yLabel="log₁₀ Multiplikationen"
          series={series}
          xDomain={[1, Math.max(10, Math.min(J_MAX, 2 * J))]}
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
          {J === 1 ? (
            <Verdikt kind="neutral" titel="Gleichstand.">
              Bei einer einzigen rechten Seite rechnen beide Strategien dasselbe:
              n³/3 + n² gegen 1 · (n³/3 + n²). Die Zerlegung zu speichern kostet nichts und
              bringt nichts.
            </Verdikt>
          ) : J <= 5 ? (
            <Verdikt kind="ok" titel="Amortisiert.">
              Ab der zweiten rechten Seite fällt der teure Anteil n³/3 nur noch einmal an statt
              J-mal; bei J = {J} ist das der Faktor {faktor.toFixed(1).replace(".", ",")}×. Die
              Zerlegung hat sich also schon bezahlt gemacht.
            </Verdikt>
          ) : J >= n ? (
            <Verdikt kind="ok" titel="Die Ersparnis läuft in ihre Schranke.">
              Für J ≫ n dominiert in beiden Kosten der J-Anteil: Der Faktor strebt gegen
              (n³/3 + n²)/n² ≈ n/3 ={" "}
              {(n / 3).toFixed(1).replace(".", ",")} und steht bei J = {J} schon bei{" "}
              {faktor.toFixed(1).replace(".", ",")}×. Mehr als rund n/3 ist nicht zu holen.
            </Verdikt>
          ) : (
            <Verdikt kind="ok" titel="Deutlich billiger.">
              Bei J = {J} spart die gespeicherte Zerlegung den Faktor{" "}
              {faktor.toFixed(1).replace(".", ",")}×, weil die Elimination J-mal statt einmal
              bezahlt würde. Mit wachsendem J läuft dieser Faktor gegen n/3 ={" "}
              {(n / 3).toFixed(1).replace(".", ",")}.
            </Verdikt>
          )}
        </div>
      </div>
      </div>
    </Schaetzfrage>
  );
}
