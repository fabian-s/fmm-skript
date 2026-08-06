import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../../lib";

/**
 * Widgets zu Abschnitt 2.3 (Aufwand und Komplexität):
 * - S23FlopWidget: FLOP- und Speicher-Zähler für Matrix-Vektor- und
 *   Matrix-Matrix-Multiplikation mit Dimensions-Slidern.
 * - S23GrowthWidget: Wachstumsraten-Plot der Komplexitätsklassen
 *   (log-Skala) plus Konstanten-Demo 1000n + 10000 vs. n².
 * Eigenständig implementiert (kein Code aus den privaten Buch-Apps).
 */

const de = (v: number) => Math.round(v).toLocaleString("de-DE");
const int = (v: number) => String(Math.round(v));

/* FMM-Palette (identisch zu den \cb*-Makros in src/fmm-macros.ts) */
const GREEN = "#009E73";
const BLUE = "#0072B2";
const RED = "#D55E00";
const ORANGE = "#E69F00";
const PURPLE = "#9E57D5";
const SLATE = "#94a3b8";

function CountRow({ label, formula, value }: { label: string; formula: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span>
        {label} <M>{formula}</M>
      </span>
      <span className="font-mono tabular-nums">{de(value)}</span>
    </div>
  );
}

export function S23FlopWidget() {
  const [n, setN] = useState(3);
  const [d, setD] = useState(2);
  const [m, setM] = useState(4);

  // Matrix-Vektor: y = A x, A in R^{n x d}
  const mvMult = n * d;
  const mvAdd = n * (d - 1);
  const mvTotal = mvMult + mvAdd;
  const mvApprox = 2 * n * d;
  const mvMem = n * d + d + n;

  // Matrix-Matrix: C = A B, A in R^{n x d}, B in R^{d x m}
  const mmMult = n * d * m;
  const mmAdd = n * m * (d - 1);
  const mmTotal = mmMult + mmAdd;
  const mmApprox = 2 * n * d * m;
  const mmMem = n * d + d * m + n * m;

  return (
    <div className="space-y-3">
      <div className="max-w-md">
        <Slider label="n (Zeilen von A)" value={n} onChange={(v) => setN(Math.round(v))} min={1} max={200} step={1} fmt={int} />
        <Slider label="d (Spalten von A)" value={d} onChange={(v) => setD(Math.round(v))} min={1} max={200} step={1} fmt={int} />
        <Slider label="m (Spalten von B)" value={m} onChange={(v) => setM(Math.round(v))} min={1} max={200} step={1} fmt={int} />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="min-w-64 flex-1 space-y-1 rounded border border-slate-300 p-3 dark:border-slate-600">
          <p className="mb-2 font-medium">
            Matrix-Vektor: <M>{"\\by = \\bA\\bx"}</M>, <M>{"\\bA \\in \\R^{n \\times d}"}</M>
          </p>
          <CountRow label="Multiplikationen" formula={"nd"} value={mvMult} />
          <CountRow label="Additionen" formula={"n(d-1)"} value={mvAdd} />
          <CountRow label="gesamt" formula={"n(2d-1)"} value={mvTotal} />
          <CountRow label="Näherung" formula={"2nd"} value={mvApprox} />
          <div className="my-1 border-t border-slate-300 dark:border-slate-600" />
          <CountRow label="Speicher (Zahlen)" formula={"nd + d + n"} value={mvMem} />
        </div>
        <div className="min-w-64 flex-1 space-y-1 rounded border border-slate-300 p-3 dark:border-slate-600">
          <p className="mb-2 font-medium">
            Matrix-Matrix: <M>{"\\bC = \\bA\\bB"}</M>, <M>{"\\bB \\in \\R^{d \\times m}"}</M>
          </p>
          <CountRow label="Multiplikationen" formula={"ndm"} value={mmMult} />
          <CountRow label="Additionen" formula={"nm(d-1)"} value={mmAdd} />
          <CountRow label="gesamt" formula={"nm(2d-1)"} value={mmTotal} />
          <CountRow label="Näherung" formula={"2ndm"} value={mmApprox} />
          <div className="my-1 border-t border-slate-300 dark:border-slate-600" />
          <CountRow label="Speicher (Zahlen)" formula={"nd + dm + nm"} value={mmMem} />
        </div>
      </div>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-400">
        Probieren wir aus: Verdoppeln wir beim Matrix-Vektor-Produkt <M>{"n"}</M> (oder{" "}
        <M>{"d"}</M>), verdoppelt sich der Aufwand ungefähr; er wächst <em>linear</em> in jeder
        Dimension. Beim Matrix-Matrix-Produkt stecken <em>drei</em> Dimensionen im Produkt{" "}
        <M>{"2ndm"}</M>: Für quadratische Matrizen (<M>{"n = d = m"}</M>) bedeutet Verdoppeln
        aller Dimensionen den <em>achtfachen</em> Aufwand.
      </p>
    </div>
  );
}

export function S23GrowthWidget() {
  const [nMax, setNMax] = useState(60);
  const yMax = Math.max(6, Math.ceil(nMax * Math.log10(2)) + 1);
  const classes: { label: string; color: string; f: (x: number) => number }[] = [
    { label: "O(1)", color: SLATE, f: () => 0 },
    { label: "O(log n)", color: GREEN, f: (x) => Math.log10(Math.log2(x)) },
    { label: "O(n)", color: BLUE, f: (x) => Math.log10(x) },
    { label: "O(n²)", color: ORANGE, f: (x) => 2 * Math.log10(x) },
    { label: "O(n³)", color: PURPLE, f: (x) => 3 * Math.log10(x) },
    { label: "O(2ⁿ)", color: RED, f: (x) => x * Math.log10(2) },
  ];
  return (
    <div className="space-y-3">
      <div className="max-w-md">
        <Slider label="n bis" value={nMax} onChange={(v) => setNMax(Math.round(v))} min={10} max={200} step={1} fmt={int} />
      </div>
      <LabeledPlot
        xLabel="n"
        yLabel="log₁₀(Operationen)"
        series={classes.map(({ f, color }) => ({ f, color }))}
        xDomain={[1, nMax]}
        yDomain={[0, yMax]}
        width={480}
        height={300}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {classes.map(({ label, color }) => (
          <span key={label} className="font-medium" style={{ color }}>
            {label}
          </span>
        ))}
      </div>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-400">
        Die senkrechte Achse ist logarithmisch: Eine Einheit nach oben bedeutet den{" "}
        <em>zehnfachen</em> Aufwand. Polynomiale Klassen (<M>{"n, n^2, n^3"}</M>) erscheinen als
        gekrümmte, immer flacher werdende Kurven, <M>{"2^n"}</M> dagegen als steile Gerade, die
        alle anderen ab <M>{"n \\approx 10"}</M>–<M>{"20"}</M> hoffnungslos abhängt. Schieben
        wir <M>{"n"}</M> nach oben: Bei <M>{"n = 200"}</M> braucht ein{" "}
        <M>{"O(2^n)"}</M>-Algorithmus rund <M>{"10^{60}"}</M> Operationen. Selbst ein
        Superrechner mit <M>{"10^{18}"}</M> Operationen pro Sekunde rechnete daran länger als{" "}
        <M>{"10^{34}"}</M> Jahre, das Universum ist erst etwa <M>{"10^{10}"}</M> Jahre alt.
      </p>
    </div>
  );
}

export function S23KonstantenWidget() {
  // Schnittpunkt von 1000n + 10000 und n^2: n* = 500 + sqrt(500^2 + 10000)
  const nStar = 500 + Math.sqrt(500 * 500 + 10000);
  return (
    <div className="space-y-3">
      <LabeledPlot
        xLabel="n"
        yLabel="log₁₀(Operationen)"
        series={[
          { f: (x) => Math.log10(1000 * x + 10000), color: BLUE },
          { f: (x) => Math.log10(x * x), color: ORANGE },
        ]}
        xDomain={[1, 2000]}
        yDomain={[0, 7]}
        width={480}
        height={300}
        markers={[{ x: nStar, y: Math.log10(nStar * nStar), color: RED, label: "n ≈ 1010" }]}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="font-medium" style={{ color: BLUE }}>
          1000n + 10000: O(n)
        </span>
        <span className="font-medium" style={{ color: ORANGE }}>
          n²: O(n²)
        </span>
      </div>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-400">
        Der <M>{"O(n)"}</M>-Algorithmus mit großen Konstanten (blau) liegt bis zum Schnittpunkt
        bei <M>{"n \\approx 1010"}</M> <em>über</em> der <M>{"O(n^2)"}</M>-Kurve (orange); für
        kleine Probleme ist er also der langsamere. Erst rechts davon zahlt sich die bessere
        Komplexitätsklasse aus, dann aber unaufhaltsam: Die Kurven entfernen sich immer weiter
        voneinander.
      </p>
    </div>
  );
}
