/** Concept tooltip: geometric series, the sum of powers of a fixed ratio r. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** Partial sums S_n of sum r^k for adjustable ratio r, with the limit 1/(1-r). */
function GeometricSumWidget() {
  const [r, setR] = useState(0.5);
  const W = 280;
  const H = 150;
  const N = 16;
  const sums: number[] = [];
  let s = 0;
  for (let k = 0; k < N; k++) {
    s += Math.pow(r, k);
    sums.push(s);
  }
  const target = 1 / (1 - r);
  const lo = Math.min(0, ...sums, target) - 0.3;
  const hi = Math.max(1, ...sums, target) + 0.3;
  const xOf = (n: number) => 12 + (n / (N - 1)) * (W - 24);
  const yOf = (v: number) => H - 10 - ((v - lo) / (hi - lo)) * (H - 20);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Quotient r"
        value={r}
        onChange={setR}
        min={-0.9}
        max={0.9}
        step={0.05}
        fmt={(v) => v.toFixed(2)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        <line
          x1={0}
          y1={yOf(target)}
          x2={W}
          y2={yOf(target)}
          stroke="#dc2626"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {sums.map((v, n) => (
          <circle key={n} cx={xOf(n)} cy={yOf(v)} r={3.5} fill="#0284c7" />
        ))}
      </svg>
      <p className="mt-1 font-mono text-xs text-slate-300">
        S_n = 1 + r + … + r^n → 1/(1−r) = {target.toFixed(3)} (rote Linie)
      </p>
    </div>
  );
}

registerConcept({
  id: "geometric-series",
  title: "Geometrische Reihe",
  body: (
    <>
      <p>
        Eine <em>geometrische Reihe</em> summiert die Potenzen eines festen
        Quotienten <M>{"r"}</M> auf: Sie ist die{" "}
        <ConceptLink id="infinite-series">unendliche Reihe</ConceptLink>{" "}
        <M>{"\\sum_{k=0}^{\\infty} r^k = 1 + r + r^2 + r^3 + \\cdots"}</M>,
        jeder Term ist also der vorherige mal <M>{"r"}</M>. Für{" "}
        <M>{"r = \\tfrac{1}{2}"}</M> gilt
      </p>
      <MD>{"1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots = 2:"}</MD>
      <p>
        Jeder neue Term schließt die Hälfte der verbleibenden Lücke zur{" "}
        <M>{"2"}</M>, die Partialsummen bilden also eine{" "}
        <ConceptLink id="sequence">Folge</ConceptLink>, die{" "}
        <ConceptLink id="convergence">konvergiert</ConceptLink>. Allgemein
        schrumpfen die Potenzen <M>{"r^k"}</M> für <M>{"|r| < 1"}</M> schnell
        genug, sodass
      </p>
      <MD>{"\\sum_{k=0}^{\\infty} r^k = \\frac{1}{1-r} \\qquad (|r| < 1),"}</MD>
      <p>
        während für <M>{"|r| \\geq 1"}</M> die Terme nie abklingen und die
        Reihe keinen Wert hat (probieren wir unten <M>{"r"}</M> nahe{" "}
        <M>{"\\pm 0.9"}</M> aus und beobachten, wie viel langsamer sich die
        Punkte einpendeln). Lesen wir <M>{"r"}</M> als Variable{" "}
        <M>{"x"}</M>, wird aus <M>{"\\sum_k x^k"}</M> die einfachste{" "}
        <ConceptLink id="power-series">Potenzreihe</ConceptLink>, der
        Prototyp dafür, wie sich Taylor-Reihen verhalten.
      </p>
      <GeometricSumWidget />
    </>
  ),
});
