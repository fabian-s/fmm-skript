/**
 * Widgets für §4.1: Fehlerzerlegungs-Explorer (e^x über abgebrochene
 * Taylor-Reihe, Input π auf k Nachkommastellen gerundet) und
 * Fehlermaß-Rechner (Vektor v und Näherung ṽ editierbar, live Δ, ‖Δ‖₂, δ).
 * Alle Werte rechnet der Browser live in IEEE-Doppelpräzision nach.
 */
import { useState } from "react";
import { M, Slider } from "../../../lib";

/* FMM-Palette (identisch zu den \cb*-Makros in src/fmm-macros.ts) */
const FMM = {
  red: "#D55E00",
  blue: "#0072B2",
  green: "#009E73",
  orange: "#E69F00",
  purple: "#9E57D5",
};
/** Neutralton, lesbar auf hellem Canvas UND dunkler Seite. */
const NEUTRAL = "#64748b";

/** Zahl deutsch formatiert; sehr kleine/große Werte in Zehnerpotenz-Schreibweise. */
function fmtDE(v: number, sig = 4): string {
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 0.001 && a < 100000) {
    return v.toLocaleString("de-DE", { maximumSignificantDigits: sig });
  }
  const [m, e] = v.toExponential(sig - 1).split("e");
  return `${m.replace(".", ",")} · 10^${Number(e)}`;
}

/** Abgebrochene Exponentialreihe: Summe von x^n/n! für n = 0, …, N. */
function taylorExp(x: number, N: number): number {
  let term = 1;
  let sum = 1;
  for (let n = 1; n <= N; n++) {
    term *= x / n;
    sum += term;
  }
  return sum;
}

/* ------------------------------------------------------------------ */
/* Fehlerzerlegungs-Explorer (Beispiel e^π)                            */
/* ------------------------------------------------------------------ */

function FehlerBalken({
  label,
  value,
  color,
  vmax,
}: {
  label: string;
  value: number;
  color: string;
  vmax: number;
}) {
  const pct = Math.min(Math.abs(value) / vmax, 1) * 50;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-48 shrink-0 text-right" style={{ color }}>
        {label}
      </span>
      <div className="relative h-5 grow overflow-hidden rounded bg-slate-200/70 dark:bg-slate-800/70">
        <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: NEUTRAL }} />
        <div
          className="absolute bottom-1 top-1 rounded-sm"
          style={{
            backgroundColor: color,
            left: value < 0 ? `${50 - pct}%` : "50%",
            width: `${Math.max(pct, value === 0 ? 0 : 0.4)}%`,
          }}
        />
      </div>
      <span className="w-28 shrink-0 text-right font-mono text-xs">{fmtDE(value)}</span>
    </div>
  );
}

export function FehlerzerlegungExplorer() {
  const [N, setN] = useState(2);
  const [k, setK] = useState(0);

  const xt = Number(Math.PI.toFixed(k)); // π auf k Nachkommastellen gerundet
  const fWahr = Math.exp(Math.PI); // f(π), „exakt" in Maschinengenauigkeit
  const fInput = Math.exp(xt); // f(π̃), exakte Arithmetik am gestörten Input
  const fTilde = taylorExp(xt, N); // f̃(π̃), abgebrochene Reihe

  const algoF = fTilde - fInput; // Fehler im Algorithmus
  const folgeF = fInput - fWahr; // Folgefehler aus dem Input
  const gesamt = fTilde - fWahr; // Gesamtfehler
  const vmax = Math.max(Math.abs(algoF), Math.abs(folgeF), Math.abs(gesamt), 1e-15);

  let status: string;
  if (N === 2 && k === 0) {
    status =
      "Das ist genau die Rechnung aus Beispiel 4.1.6: −11,586 + (−3,055) = −14,641. " +
      "Der rote Algorithmusfehler dominiert deutlich. Probieren wir aus, was mehr " +
      "Taylor-Terme bzw. ein genauerer Input ändern.";
  } else if (Math.abs(algoF) > 2 * Math.abs(folgeF)) {
    status =
      "Zurzeit dominiert der rote Algorithmusfehler: Mehr Taylor-Terme (N erhöhen) " +
      "helfen am meisten, ein genauerer Input allein brächte fast nichts.";
  } else if (Math.abs(folgeF) > 2 * Math.abs(algoF)) {
    status =
      "Zurzeit dominiert der orange Folgefehler: Der Algorithmus ist genau genug, " +
      "jetzt begrenzt die Qualität des Inputs das Ergebnis; kein noch so großes N " +
      "kann das reparieren, nur ein genaueres π̃.";
  } else {
    status =
      "Beide Anteile sind ähnlich groß: Hier lohnt es sich, an Algorithmus UND " +
      "Input gleichzeitig zu arbeiten.";
  }

  return (
    <div className="my-3 max-w-2xl rounded border border-slate-300 p-3 dark:border-slate-600">
      <p className="mb-2 text-sm">
        Wir berechnen <M>{"f(\\pi) = e^{\\pi}"}</M> näherungsweise: als Algorithmus{" "}
        <M>{"\\wt{f}"}</M> dient die nach dem Grad <M>{"N"}</M> abgebrochene Reihe{" "}
        <M>{"\\wt{f}(x) = \\sum_{n=0}^{N} x^n/n!"}</M>, als Input <M>{"\\wt{\\pi}"}</M> der auf{" "}
        <M>{"k"}</M> Nachkommastellen gerundete Wert von <M>{"\\pi"}</M>. Schieben wir die
        Regler und beobachten, wie sich der Gesamtfehler auf die beiden Anteile aus der
        Zerlegung (4.1.1) verteilt.
      </p>
      <Slider label="Abbruchordnung N" value={N} onChange={(v) => setN(Math.round(v))} min={0} max={10} step={1} fmt={(v) => String(Math.round(v))} />
      <Slider label="Nachkommastellen k" value={k} onChange={(v) => setK(Math.round(v))} min={0} max={6} step={1} fmt={(v) => String(Math.round(v))} />
      <div className="my-2 grid grid-cols-2 gap-x-4 gap-y-0.5 font-mono text-xs sm:grid-cols-4">
        <span>
          <span style={{ color: FMM.blue }}>π̃</span> = {xt.toLocaleString("de-DE", { minimumFractionDigits: k, maximumFractionDigits: k })}
        </span>
        <span>
          <span style={{ color: FMM.blue }}>f̃(π̃)</span> = {fmtDE(fTilde, 6)}
        </span>
        <span>
          <span style={{ color: NEUTRAL }}>f(π̃) = e^π̃</span> = {fmtDE(fInput, 6)}
        </span>
        <span>
          <span style={{ color: FMM.green }}>f(π) = e^π</span> = {fmtDE(fWahr, 6)}
        </span>
      </div>
      <div className="my-2 space-y-1">
        <FehlerBalken label="Fehler im Algorithmus f̃(π̃) − f(π̃)" value={algoF} color={FMM.red} vmax={vmax} />
        <FehlerBalken label="Folgefehler aus Input f(π̃) − f(π)" value={folgeF} color={FMM.orange} vmax={vmax} />
        <FehlerBalken label="Gesamtfehler f̃(π̃) − f(π)" value={gesamt} color={FMM.purple} vmax={vmax} />
      </div>
      <p className="text-xs" style={{ color: NEUTRAL }}>
        Probe: <span style={{ color: FMM.red }}>{fmtDE(algoF)}</span> +{" "}
        <span style={{ color: FMM.orange }}>{fmtDE(folgeF)}</span> ={" "}
        <span style={{ color: FMM.purple }}>{fmtDE(algoF + folgeF)}</span>. Die Zerlegung geht
        (bis auf Rundung in der Anzeige) exakt auf.
      </p>
      <p className="mt-1 text-sm">{status}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fehlermaß-Rechner (Vektoren in R²)                                  */
/* ------------------------------------------------------------------ */

function Feld({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <input
      aria-label={label}
      className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-right font-mono text-sm dark:border-slate-600 dark:bg-slate-900"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function FehlermassRechner() {
  const [v1, setV1] = useState("3");
  const [v2, setV2] = useState("4");
  const [w1, setW1] = useState("3,2");
  const [w2, setW2] = useState("4,3");

  const p = (s: string) => parseFloat(s.trim().replace(",", "."));
  const a = [p(v1), p(v2)];
  const b = [p(w1), p(w2)];
  const ok = a.every(Number.isFinite) && b.every(Number.isFinite);

  const d = ok ? [b[0] - a[0], b[1] - a[1]] : [NaN, NaN];
  const nd = Math.hypot(d[0], d[1]);
  const nv = Math.hypot(a[0], a[1]);
  const delta = nv > 0 ? nd / nv : NaN;

  return (
    <div className="my-3 max-w-2xl rounded border border-slate-300 p-3 dark:border-slate-600">
      <p className="mb-2 text-sm">
        Ändern wir den wahren Vektor <M>{"\\cgreen{\\bv}"}</M> oder seine Näherung{" "}
        <M>{"\\cblue{\\wt{\\bv}}"}</M> und beobachten, wie <M>{"\\cred{\\bDelta_{\\bv}}"}</M>,{" "}
        <M>{"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2"}</M> und{" "}
        <M>{"\\corange{\\delta_{\\bv}}"}</M> reagieren. Die Voreinstellung ist Beispiel 4.1.4.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: FMM.green }}>
            v =
          </span>
          <div className="flex flex-col gap-1">
            <Feld label="v1" value={v1} onChange={setV1} />
            <Feld label="v2" value={v2} onChange={setV2} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: FMM.blue }}>
            ṽ =
          </span>
          <div className="flex flex-col gap-1">
            <Feld label="ṽ1" value={w1} onChange={setW1} />
            <Feld label="ṽ2" value={w2} onChange={setW2} />
          </div>
        </div>
        {ok ? (
          <div className="flex flex-col gap-0.5 font-mono text-xs">
            <span style={{ color: FMM.red }}>
              Δ = ṽ − v = ({fmtDE(d[0])}; {fmtDE(d[1])})
            </span>
            <span>
              <span style={{ color: FMM.red }}>‖Δ‖₂</span> = {fmtDE(nd)}
            </span>
            <span>
              <span style={{ color: FMM.green }}>‖v‖₂</span> = {fmtDE(nv)}
            </span>
            <span>
              <span style={{ color: FMM.orange }}>δ</span> ={" "}
              {nv > 0 ? `${fmtDE(delta)} ≈ ${fmtDE(delta * 100, 3)} %` : "nicht definiert (‖v‖₂ = 0)"}
            </span>
          </div>
        ) : (
          <span className="text-xs" style={{ color: NEUTRAL }}>
            Bitte in alle vier Felder Zahlen eintragen (Dezimalkomma oder -punkt).
          </span>
        )}
      </div>
      <p className="mt-2 text-xs" style={{ color: NEUTRAL }}>
        Vorsicht beim Grenzfall v = 0: Der absolute Fehler bleibt definiert, der relative nicht.
      </p>
    </div>
  );
}
