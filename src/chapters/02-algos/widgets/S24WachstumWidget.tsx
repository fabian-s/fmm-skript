import { useMemo, useState, type ReactNode } from "react";
import { LabeledPlot, Slider } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * Wachstumsraten-Explorer (Abschnitt 2.4): die gängigen Komplexitätsklassen
 * auf linearer und logarithmischer Skala, mit verstellbarem Vorfaktor c für
 * die n²-Kurve: „ab welchem n dominiert was?".
 * Farben folgen der FMM-Palette (siehe KONVENTIONEN.md, Lessons).
 */

interface Klasse {
  key: string;
  label: string;
  color: string;
  f: (n: number, c: number) => number;
}

const KLASSEN: Klasse[] = [
  { key: "log", label: "log₂ n", color: "#009E73", f: (n) => Math.log2(n) },
  { key: "lin", label: "n", color: "#0072B2", f: (n) => n },
  { key: "nlogn", label: "n · log₂ n", color: "#9E57D5", f: (n) => n * Math.log2(n) },
  { key: "quad", label: "c · n²", color: "#E69F00", f: (n, c) => c * n * n },
  { key: "kub", label: "n³", color: "#D55E00", f: (n) => n * n * n },
  // Neutralfarbe für 2ⁿ: slate-500 ist auf weißem Canvas UND dunklem
  // Seitenhintergrund lesbar (slate-700 wäre im Dark-Mode unsichtbar).
  { key: "exp", label: "2ⁿ", color: "#64748b", f: (n) => Math.pow(2, n) },
];

const Y_CAP = 100000; // lineare Skala: y-Achse kappen, sonst plättet 2ⁿ alles

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
  if (v >= 100) return Math.round(v).toLocaleString("de-DE");
  return v.toFixed(1).replace(".", ",");
}

/** Kleinstes n, ab dem endgültig 2^m > c·m² für alle m ≥ n gilt. */
function crossoverExpQuad(c: number): number {
  let last = 0;
  for (let n = 1; n <= 2000; n++) {
    if (Math.pow(2, n) <= c * n * n) last = n;
  }
  return last + 1;
}

export function S24WachstumWidget() {
  const [scale, setScale] = useState<"linear" | "log">("linear");
  const [nMax, setNMax] = useState(30);
  const [cExp, setCExp] = useState(0); // c = 10^cExp
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    log: false,
    lin: true,
    nlogn: false,
    quad: true,
    kub: true,
    exp: true,
  });

  const c = Math.round(Math.pow(10, cExp));
  const active = KLASSEN.filter((k) => enabled[k.key]);

  const { series, yDomain, yLabel, capped } = useMemo(() => {
    const maxVal = Math.max(1, ...active.map((k) => k.f(nMax, c)));
    if (scale === "linear") {
      const yMax = Math.min(maxVal, Y_CAP);
      return {
        series: active.map(
          (k): Series => ({ f: (x) => (x >= 1 ? k.f(x, c) : NaN), color: k.color })
        ),
        yDomain: [0, yMax * 1.05] as [number, number],
        yLabel: "f(n)",
        capped: maxVal > Y_CAP,
      };
    }
    const yMax = Math.log10(maxVal);
    return {
      series: active.map(
        (k): Series => ({
          f: (x) => (x >= 1 ? Math.log10(Math.max(k.f(x, c), 1e-12)) : NaN),
          color: k.color,
        })
      ),
      yDomain: [-1, Math.max(yMax * 1.08, 1)] as [number, number],
      yLabel: "log₁₀ f(n)",
      capped: false,
    };
  }, [active, scale, nMax, c]);

  const nStar = useMemo(() => crossoverExpQuad(c), [c]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex overflow-hidden rounded-md border border-slate-300 dark:border-slate-600">
          {(["linear", "log"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              className={`px-3 py-1 ${
                scale === s
                  ? "bg-sky-600 text-white"
                  : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              {s === "linear" ? "lineare Skala" : "log-Skala"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {KLASSEN.map((k) => (
            <label key={k.key} className="flex cursor-pointer items-center gap-1 select-none">
              <input
                type="checkbox"
                checked={enabled[k.key]}
                onChange={() => setEnabled((e) => ({ ...e, [k.key]: !e[k.key] }))}
              />
              <span className="font-mono" style={{ color: k.color }}>
                {k.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="max-w-md">
        <Slider label="n bis" value={nMax} onChange={setNMax} min={10} max={200} step={5} fmt={(v) => String(v)} />
        <Slider
          label="Vorfaktor c"
          value={cExp}
          onChange={setCExp}
          min={0}
          max={3}
          step={0.25}
          fmt={(v) => String(Math.round(Math.pow(10, v)))}
        />
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <LabeledPlot
          xLabel="n"
          yLabel={yLabel}
          series={series}
          xDomain={[1, nMax]}
          yDomain={yDomain}
          width={360}
          height={260}
        />
        <div className="max-w-xs space-y-2 text-sm">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="py-1 text-left font-medium">Klasse</th>
                <th className="py-1 font-medium">f({nMax})</th>
              </tr>
            </thead>
            <tbody>
              {active.map((k) => (
                <tr key={k.key}>
                  <td className="py-0.5 text-left font-mono" style={{ color: k.color }}>
                    {k.label}
                  </td>
                  <td className="py-0.5 font-mono">{fmtVal(k.f(nMax, c))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-slate-600 dark:text-slate-300">
            Ab n = {nStar} gilt endgültig 2ⁿ &gt; c·n² (mit c = {c}); ab n &gt; {c} gilt n³ &gt;
            c·n². Der Vorfaktor verschiebt die Schwelle nur; aufhalten kann er das schnellere
            Wachstum nicht.
          </p>
          {capped && (
            <p className="text-slate-500 dark:text-slate-400">
              Hinweis: Die y-Achse ist bei 10⁵ gekappt, die schnellsten Kurven verlassen den
              sichtbaren Bereich als fast senkrechte Wand. Auf der log-Skala werden sie wieder
              vergleichbar: 2ⁿ ist dort eine Gerade.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
