import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Stepper, TransformCanvas, Verdikt, fmtDe } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Einsicht: Ein Startanteil in v₁ genügt, damit die normierte Potenzmethode
 * mit Rate |λ₂/λ₁| auf v₁ zuläuft.
 * Farbrollen Kapitel 8: Iterierte blau, Grenz-Eigenvektor grün, Rate orange,
 * Winkel-/Richtungsfehler rot, Hilfsrichtungen grau.
 * Provenienz: Eigenbau, keine portierte Prosa.
 * PRÜFSTATUS: scripts/verify/REV29/08-la-misc-S81Potenz.mjs (2026-08-29), Teil
 * von `npm run verify:numbers`. Das Skript bestimmt die Eigenwerte 9 und 4 samt
 * Eigenvektoren aus dem charakteristischen Polynom (unabhängig von den hier
 * hartkodierten V1/V2), prüft die Rate 4/9 an der wirklich gelaufenen Iteration
 * und belegt, dass der Ausnahmefall nur über die Preset-Knöpfe exakt erreichbar
 * ist, der Winkelregler ihn also nicht versehentlich trifft.
 */

type Vec = [number, number];
const A: [[number, number], [number, number]] = [[5, -2], [-2, 8]];
const V1: Vec = [-1 / Math.sqrt(5), 2 / Math.sqrt(5)];
const V2: Vec = [2 / Math.sqrt(5), 1 / Math.sqrt(5)];
const RATE = 4 / 9;
const KMAX = 18;

const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1];
const mul = (x: Vec): Vec => [5 * x[0] - 2 * x[1], -2 * x[0] + 8 * x[1]];
const normalize = (x: Vec): Vec => {
  const n = Math.hypot(...x);
  return [x[0] / n, x[1] / n];
};
const fromAngle = (theta: number): Vec => [Math.cos((theta * Math.PI) / 180), Math.sin((theta * Math.PI) / 180)];
const toAngle = (x: Vec) => Math.atan2(x[1], x[0]) * 180 / Math.PI;

function lauf(start: Vec) {
  const xs = [start];
  for (let k = 1; k <= KMAX; k += 1) xs.push(normalize(mul(xs[k - 1])));
  return xs;
}

export function PotenzmethodenStepper() {
  const [theta, setTheta] = useState(33);
  const [k, setK] = useState(0);
  const x0 = fromAngle(theta);
  const xs = useMemo(() => lauf(x0), [theta]);
  const x = xs[k];
  const c1 = dot(x0, V1);
  const c2 = dot(x0, V2);
  const sinPhi = Math.abs(x[0] * V1[1] - x[1] * V1[0]);
  const prevSin = k ? Math.abs(xs[k - 1][0] * V1[1] - xs[k - 1][1] * V1[0]) : NaN;
  const rayleigh = dot(x, mul(x));
  const observed = k && prevSin > 1e-12 ? sinPhi / prevSin : NaN;
  const fails = Math.abs(c1) < 1e-8;
  const hit = Math.abs(c2) < 1e-8;
  const setDirection = (v: Vec) => { setTheta(toAngle(v)); setK(0); };

  // Drei Zustände am kontrollierten Parameter: exakt auf v₂ bzw. v₁ (nur über
  // die Preset-Knöpfe erreichbar, der Winkelregler läuft in ganzen Grad), knapp
  // daneben (c₁ winzig, aber ungleich null) und der Normalfall.
  const knappDaneben = !fails && Math.abs(c1) < 0.02;
  const verdict = fails
    ? `Der Start liegt exakt auf v₂. Sein v₁-Anteil ist null; A x⁽⁰⁾ = 4 x⁽⁰⁾, die normierte Iterierte bleibt für immer stehen, und beide Schätzungen liefern hartnäckig 4 statt 9. Das ist der Ausnahmefall aus ${ref("bemerkung:wann-die-potenzmethode-versagt")}.`
    : hit
      ? `Der Start liegt bereits auf v₁. Die Normierung hebt die Streckung mit λ₁ = 9 auf; mehr Konvergenz ist nicht zu sehen. ${ref("satz:konvergenz-der-potenzmethode")} ist sofort erfüllt.`
      : knappDaneben
        ? `Fast, aber nicht ganz auf v₂: c₁ = ${fmtDe(c1, 4)} ist winzig, aber ungleich null. ${ref("satz:konvergenz-der-potenzmethode")} greift also – nur muss die Iteration diesen Anteil erst über viele Schritte aufblasen. Der Winkelrest steht bei ${fmtDe(sinPhi, 4)}.`
        : k === 0
          ? `Noch sehen wir nur den Start. Sein von null verschiedener v₁-Anteil erfüllt die Voraussetzung von ${ref("satz:konvergenz-der-potenzmethode")}.`
          : k < 3
            ? `Der Winkelrest beträgt ${fmtDe(sinPhi, 4)}. Noch dominiert der v₂-Anteil, die beobachtete Rate ${fmtDe(observed, 3)} sagt deshalb wenig; ${ref("satz:konvergenz-der-potenzmethode")} macht eine Aussage über das Langzeitverhalten. Der Rayleigh-Quotient ist ${fmtDe(rayleigh, 4)}.`
            : `Der Winkelrest beträgt ${fmtDe(sinPhi, 4)}; die beobachtete Rate ${fmtDe(observed, 3)} nähert sich der Rate |λ₂/λ₁| = ${fmtDe(RATE, 3)} aus ${ref("satz:konvergenz-der-potenzmethode")}. Der Rayleigh-Quotient ist ${fmtDe(rayleigh, 4)}.`;

  return <div className="space-y-2">
    <Aufgabe>Ziehen wir den blauen Startvektor auf dem Kreis und verfolgen wir anschließend die Schritte.</Aufgabe>
    <TransformCanvas
      matrix={[[1, 0], [0, 1]]}
      size={300}
      worldHalf={1.3}
      showGrid={false}
      vectors={[
        { v: V1, color: FMM_COLORS.gruen, label: "v₁" },
        { v: V2, color: FMM_COLORS.grau, label: "v₂" },
        ...xs.slice(0, k + 1).map((v, i) => ({ v, color: FMM_COLORS.blau, label: i === k ? `x⁽${k}⁾` : undefined, draggable: i === 0, dragConstraint: "unitCircle" as const })),
      ]}
      onVectorChange={(index, v) => { if (index === 2) setDirection(v); }}
      ariaLabel={`Potenzmethode im Schritt ${k}; der blaue Vektor ist auf dem Einheitskreis ziehbar.`}
    />
    <Slider label="Winkel von x⁽⁰⁾" value={theta} onChange={(v) => { setTheta(v); setK(0); }} min={-180} max={180} step={1} unit="°" accent={FMM_COLORS.blau} />
    <div className="flex flex-wrap gap-2">
      {[{ text: "Beispiel aus dem Text", value: 33 }, { text: "Versagensfall v₂", value: toAngle(V2) }, { text: "Volltreffer v₁", value: toAngle(V1) }].map(({ text, value }) => <button key={text} type="button" className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600" onClick={() => { setTheta(value); setK(0); }}>{text}</button>)}
    </div>
    <Stepper step={k} setStep={setK} max={KMAX} narration={`x⁽${k}⁾ = (${fmtDe(x[0], 3)}; ${fmtDe(x[1], 3)}), c₁ = ${fmtDe(c1, 3)}, c₂ = ${fmtDe(c2, 3)}.`} />
    <Verdikt kind={fails ? "warn" : hit ? "ok" : knappDaneben ? "warn" : k > 0 && sinPhi <= 0.1 ? "ok" : "neutral"}>{verdict}</Verdikt>
  </div>;
}
