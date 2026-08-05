/**
 * Widgets für §4.3 (Stabilität von Algorithmen):
 * - SgdLernratenDemo: 1D-Gradientenabstieg auf L(θ) = θ² mit einstellbarer
 *   Lernrate α und optional verrauschtem Gradienten; der Iteriertenpfad
 *   zeigt farbcodiert konvergentes, oszillierendes und divergentes Regime.
 * - KappaRechner: Live-Rechner für κ_rel(h,(a,b)) = √2·√(a²+b²)/|a−b|,
 *   wahlweise an die Verschiebung c des Varianz-Beispiels gekoppelt.
 * Beide Widgets rechnen ausschließlich eigene Werte; die R-Ausgaben des
 * Folien-Chunks zitiert nur der Fließtext (Lesson: R-Output nicht in
 * JS-Widgets spiegeln).
 */
import { useMemo, useState, type ReactNode } from "react";
import { M, Slider } from "../../../lib";

/* FMM-Palette (identisch zu den \cb*-Makros in src/fmm-macros.ts) */
const FMM = {
  red: "#D55E00",
  blue: "#0072B2",
  green: "#009E73",
  orange: "#E69F00",
  purple: "#9E57D5",
};
/* Neutrale Beschriftungsfarbe: lesbar auf weißem Canvas UND dunkler Seite */
const GRAY = "#64748b";

/** Deterministischer Pseudozufall, damit der Pfad beim Rendern stabil bleibt. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* SGD-Lernraten-Demo                                                  */
/* ------------------------------------------------------------------ */

export function SgdLernratenDemo() {
  const [alpha, setAlpha] = useState(0.15);
  const [sigma, setSigma] = useState(0);
  const [seed, setSeed] = useState(1);

  const N = 30;
  const THETA0 = 2.5;

  const { thetas, diverged } = useMemo(() => {
    const rnd = mulberry32(seed * 9301 + 49297);
    const arr: number[] = [THETA0];
    let th = THETA0;
    let div = false;
    for (let k = 0; k < N; k++) {
      // Summe dreier Gleichverteilter: Erwartungswert 0, Standardabweichung ≈ σ
      const noise = 2 * sigma * (rnd() + rnd() + rnd() - 1.5);
      th = th - alpha * (2 * th + noise);
      arr.push(th);
      if (!Number.isFinite(th) || Math.abs(th) > 1e4) {
        div = true;
        break;
      }
    }
    return { thetas: arr, diverged: div };
  }, [alpha, sigma, seed]);

  const rho = Math.abs(1 - 2 * alpha);
  const grenzfall = Math.abs(rho - 1) < 1e-9;
  const color =
    diverged || rho > 1 ? FMM.red : grenzfall ? FMM.purple : alpha > 0.5 ? FMM.orange : FMM.green;

  let status: string;
  if (diverged || rho > 1) {
    status =
      "Divergent: Der Verstärkungsfaktor ist größer als 1, jeder Schritt vergrößert " +
      "den Abstand zum Minimum — die Iterierten explodieren und verlassen den Plot.";
  } else if (grenzfall) {
    status =
      "Grenzfall: Der Verstärkungsfaktor ist exakt 1. Die Iterierten springen mit " +
      "konstanter Amplitude um das Minimum hin und her — weder Konvergenz noch Divergenz.";
  } else if (alpha > 0.5) {
    status =
      "Oszillierend, aber konvergent: Jeder Schritt springt über das Minimum hinweg, " +
      "schrumpft den Abstand aber trotzdem — der Verstärkungsfaktor liegt unter 1.";
  } else {
    status =
      "Monoton konvergent: Jeder Schritt schrumpft den Abstand zum Minimum um " +
      "denselben Faktor, die Iterierten laufen direkt auf das Optimum zu.";
  }
  if (sigma > 0 && !diverged && rho < 1) {
    status +=
      " Der verrauschte Gradient legt zusätzlich einen Rauschteppich um das Minimum: " +
      "Je größer die Lernrate, desto stärker schlagen die Schätzfehler durch.";
  }

  /* SVG-Geometrie */
  const W = 480;
  const H = 270;
  const X0 = -3.3;
  const X1 = 3.3;
  const Y0 = -1.2;
  const Y1 = 10.5;
  const px = (x: number) => ((x - X0) / (X1 - X0)) * W;
  const py = (y: number) => H - ((y - Y0) / (Y1 - Y0)) * H;
  const parabel = Array.from({ length: 97 }, (_, i) => {
    const x = X0 + ((X1 - X0) * i) / 96;
    return `${px(x).toFixed(1)},${py(x * x).toFixed(1)}`;
  }).join(" ");
  const pfad = thetas.map((t) => `${px(t).toFixed(1)},${py(t * t).toFixed(1)}`).join(" ");
  const letzte = thetas[thetas.length - 1];

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir minimieren <M>{"L(\\theta) = \\theta^2"}</M> (Minimum bei{" "}
        <M>{"\\theta^* = 0"}</M>, exakter Gradient <M>{"2\\theta"}</M>) mit den Schritten{" "}
        <M>{"\\theta_{k+1} = \\theta_k - \\alpha\\,(2\\theta_k + \\eps_k)"}</M>, wobei{" "}
        <M>{"\\eps_k"}</M> den Schätz- und Rundungsfehler des Gradienten spielt. Probieren
        wir verschiedene Lernraten aus: Ohne Rauschen schrumpft (oder wächst) der Abstand
        zum Minimum in jedem Schritt exakt um den Faktor{" "}
        <M>{"|1 - 2\\alpha|"}</M>.
      </p>
      <Slider label="Lernrate α" value={alpha} onChange={setAlpha} min={0.02} max={1.3} step={0.01} />
      <Slider
        label="Rauschen σ"
        value={sigma}
        onChange={setSigma}
        min={0}
        max={2}
        step={0.05}
        fmt={(v) => v.toFixed(2)}
      />
      {sigma > 0 && (
        <button
          type="button"
          className="rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          onClick={() => setSeed((s) => s + 1)}
        >
          Rauschen neu würfeln
        </button>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full max-w-[480px] rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        {/* Achse und Ticks */}
        <line x1={px(X0)} y1={py(0)} x2={px(X1)} y2={py(0)} stroke="#94a3b8" strokeWidth={1} />
        {[-3, -2, -1, 1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="#94a3b8" />
            <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={10} fill={GRAY}>
              {t}
            </text>
          </g>
        ))}
        <text x={px(X1) - 6} y={py(0) - 6} textAnchor="end" fontSize={11} fill={GRAY}>
          θ
        </text>
        {/* Minimum */}
        <line
          x1={px(0)}
          y1={py(0)}
          x2={px(0)}
          y2={py(Y1)}
          stroke="#94a3b8"
          strokeDasharray="4 3"
          strokeWidth={1}
        />
        <text x={px(0) + 5} y={py(Y1) + 12} fontSize={10} fill={GRAY}>
          θ* = 0
        </text>
        {/* Verlustfunktion */}
        <polyline points={parabel} fill="none" stroke={FMM.blue} strokeWidth={2} />
        <text x={px(-2.9)} y={py(8.7)} fontSize={11} fill={FMM.blue}>
          L(θ) = θ²
        </text>
        {/* Iteriertenpfad */}
        <polyline points={pfad} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.65} />
        {thetas
          .filter((t) => Math.abs(t) < 50)
          .map((t, i) => (
            <circle key={i} cx={px(t)} cy={py(t * t)} r={3} fill={color} fillOpacity={0.9} />
          ))}
        <text x={px(THETA0) + 6} y={py(THETA0 * THETA0) - 6} fontSize={10} fill={GRAY}>
          θ₀
        </text>
      </svg>
      <p className="text-sm">
        Verstärkungsfaktor pro Schritt:{" "}
        <span className="font-mono font-semibold" style={{ color }}>
          |1 − 2α| = {rho.toFixed(2)}
        </span>
        {" · "}nach {thetas.length - 1} Schritten:{" "}
        <span className="font-mono">
          |θ| ≈ {Math.abs(letzte) < 1e4 ? Math.abs(letzte).toPrecision(3) : "> 10⁴"}
        </span>
      </p>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">{status}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* κ_rel(h,(a,b))-Live-Rechner                                         */
/* ------------------------------------------------------------------ */

/** Zahl deutsch formatiert, große/kleine Werte als Mantisse · 10^Exponent. */
function SciNum({ v }: { v: number }) {
  if (Number.isNaN(v)) return <span>—</span>;
  if (!Number.isFinite(v)) return <span>∞</span>;
  if (v === 0) return <span>0</span>;
  const e = Math.floor(Math.log10(Math.abs(v)));
  if (e >= -3 && e <= 3) {
    return <span>{v.toLocaleString("de-DE", { maximumSignificantDigits: 3 })}</span>;
  }
  const man = v / 10 ** e;
  return (
    <span>
      {man.toLocaleString("de-DE", { maximumFractionDigits: 1 })} · 10<sup>{e}</sup>
    </span>
  );
}

export function KappaRechner() {
  const [mode, setMode] = useState<"c" | "frei">("c");
  const [k, setK] = useState(5);
  const [aStr, setAStr] = useState("2000");
  const [bStr, setBStr] = useState("1999");

  let kappa: number;
  let aNode: ReactNode;
  let bNode: ReactNode;
  let diffNode: ReactNode;
  if (mode === "c") {
    // Idealisierte Werte für Daten x_i = c + z_i mit Var(z) = 1:
    // a = c² + 1, b = c², also |a − b| = 1 — analytisch gesetzt, denn in
    // Doubles wäre (c² + 1) − c² für großes c selbst schon ausgelöscht (= 0).
    const c2 = 10 ** (2 * k);
    kappa = Math.SQRT2 * Math.hypot(c2 + 1, c2);
    aNode = (
      <span>
        10<sup>{2 * k}</sup>&thinsp;+&thinsp;1
      </span>
    );
    bNode = (
      <span>
        10<sup>{2 * k}</sup>
      </span>
    );
    diffNode = <span>1</span>;
  } else {
    const a = Number(aStr.replace(",", "."));
    const b = Number(bStr.replace(",", "."));
    const ok = Number.isFinite(a) && Number.isFinite(b) && aStr.trim() !== "" && bStr.trim() !== "";
    kappa = !ok ? NaN : a === b ? Infinity : (Math.SQRT2 * Math.hypot(a, b)) / Math.abs(a - b);
    aNode = <SciNum v={a} />;
    bNode = <SciNum v={b} />;
    diffNode = ok ? <SciNum v={Math.abs(a - b)} /> : <span>—</span>;
  }

  const verlust = Math.log10(kappa); // ≈ verlorene Dezimalstellen
  const rest = Math.max(0, 16 - verlust);

  let statusColor = FMM.green;
  let status: ReactNode;
  if (Number.isNaN(kappa)) {
    statusColor = GRAY;
    status = "Geben wir zwei gültige Zahlen ein (auch Exponentialschreibweise wie 1e10 geht).";
  } else if (!Number.isFinite(kappa)) {
    statusColor = FMM.red;
    status =
      "a = b: Das Teilproblem ist hier schlecht gestellt (κ = ∞). Das exakte Ergebnis " +
      "ist 0, und jede noch so kleine Störung der Inputs erzeugt einen relativen Fehler " +
      "von beliebiger Größe.";
  } else if (verlust >= 16) {
    statusColor = FMM.red;
    status = (
      <>
        <M>{"\\kappa_{rel} \\cdot \\eps \\gtrsim 1"}</M>: Von den rund 16 Dezimalstellen
        doppelter Genauigkeit überlebt keine einzige — das Ergebnis des letzten Schritts ist
        reiner Rundungsschutt.
      </>
    );
  } else if (verlust >= 2) {
    statusColor = FMM.orange;
    status = (
      <>
        Der letzte Schritt verstärkt alle bis dahin angesammelten relativen Fehler etwa um den
        Faktor <M>{"\\kappa_{rel}"}</M>: rund {Math.round(verlust)} Dezimalstellen gehen
        verloren, höchstens etwa {Math.floor(rest)} bleiben korrekt.
      </>
    );
  } else {
    status =
      "κ ist von der Größenordnung 1: Der letzte Schritt verstärkt Fehler kaum — die " +
      "Subtraktion ist hier gut konditioniert.";
  }

  const inputCls =
    "w-36 rounded border border-slate-300 bg-white px-2 py-1 font-mono text-sm dark:border-slate-600 dark:bg-slate-900";

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Rechnen wir die Kondition des letzten Schritts <M>{"h(a, b) = a - b"}</M> live aus:
      </p>
      <MDKappaFormel />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-1.5">
          <input type="radio" checked={mode === "c"} onChange={() => setMode("c")} />
          an Verschiebung <M>{"c"}</M> gekoppelt
        </label>
        <label className="flex items-center gap-1.5">
          <input type="radio" checked={mode === "frei"} onChange={() => setMode("frei")} />
          <M>{"a, b"}</M> frei wählen
        </label>
      </div>
      {mode === "c" ? (
        <>
          <Slider
            label="Exponent k"
            value={k}
            onChange={setK}
            min={0}
            max={12}
            step={1}
            fmt={(v) => `c = 1e${v}`}
          />
          <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
            Modell wie im Varianz-Beispiel: Daten <M>{"x_i = c + z_i"}</M> mit Varianz{" "}
            <M>{"1"}</M>. Idealisiert (über die Erwartungswerte) ist dann{" "}
            <M>{"\\cred{a} = c^2 + 1"}</M> und <M>{"\\cblue{b} = c^2"}</M>, die wahre
            Differenz also genau <M>{"1"}</M>. Die konkrete R-Stichprobe aus dem Beispiel
            weicht davon leicht ab — an der Größenordnung von <M>{"\\kappa_{rel}"}</M>{" "}
            ändert das nichts.
          </p>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-1.5">
            <span style={{ color: FMM.red }}>a =</span>
            <input className={inputCls} value={aStr} onChange={(e) => setAStr(e.target.value)} />
          </label>
          <label className="flex items-center gap-1.5">
            <span style={{ color: FMM.blue }}>b =</span>
            <input className={inputCls} value={bStr} onChange={(e) => setBStr(e.target.value)} />
          </label>
        </div>
      )}
      <div className="overflow-x-auto rounded border border-slate-200 p-3 font-mono text-xs dark:border-slate-700 sm:text-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-3">a</td>
              <td className="text-right" style={{ color: FMM.red }}>
                {aNode}
              </td>
            </tr>
            <tr>
              <td className="pr-3">b</td>
              <td className="text-right" style={{ color: FMM.blue }}>
                {bNode}
              </td>
            </tr>
            <tr>
              <td className="pr-3">|a − b|</td>
              <td className="text-right">{diffNode}</td>
            </tr>
            <tr className="border-t border-slate-300 dark:border-slate-600">
              <td className="pr-3 pt-1">κ_rel(h, (a, b))</td>
              <td className="pt-1 text-right font-bold" style={{ color: FMM.orange }}>
                <SciNum v={kappa} />
              </td>
            </tr>
            <tr>
              <td className="pr-3">verlorene Dezimalstellen ≈ log₁₀ κ</td>
              <td className="text-right">
                {Number.isFinite(kappa) ? Math.max(0, verlust).toFixed(1) : "alle"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="max-w-prose text-sm" style={{ color: statusColor }}>
        {status}
      </p>
    </div>
  );
}

/** Statische Formelzeile des Rechners (einmal gesetzt, nie neu getippt). */
function MDKappaFormel() {
  return (
    <div className="max-w-prose">
      <M>
        {
          "\\kappa_{rel}\\bigl(h, (\\cred{a}, \\cblue{b})\\bigr) = \\sqrt{2}\\,\\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{|\\cred{a} - \\cblue{b}|}, \\qquad \\eps \\approx 2{,}2 \\cdot 10^{-16}."
        }
      </M>
    </div>
  );
}
