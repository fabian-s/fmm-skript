/** Konzept-Tooltip: Konvergenz — Werte pendeln sich bei einem Grenzwert ein. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Dots of a_n = 1 + (-0.75)^n with an adjustable tolerance band around the
 * limit 1: shrink the band and watch that only finitely many dots miss it.
 */
function ToleranceBandWidget() {
  const [eps, setEps] = useState(0.3);
  const W = 280;
  const H = 150;
  const N = 24;
  const L = 1;
  const yMin = 0;
  const yMax = 2;
  const xOf = (n: number) => 12 + ((n - 1) / (N - 1)) * (W - 24);
  const yOf = (v: number) => H - 10 - ((v - yMin) / (yMax - yMin)) * (H - 20);
  const dots = Array.from({ length: N }, (_, i) => {
    const n = i + 1;
    const a = L + Math.pow(-0.75, n);
    return { n, a, inside: Math.abs(a - L) < eps };
  });
  const nOutside = dots.filter((d) => !d.inside).length;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Toleranz ε"
        value={eps}
        onChange={setEps}
        min={0.05}
        max={0.6}
        step={0.01}
        fmt={(v) => v.toFixed(2)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        <rect
          x={0}
          y={yOf(L + eps)}
          width={W}
          height={yOf(L - eps) - yOf(L + eps)}
          fill="#bbf7d0"
        />
        <line
          x1={0}
          y1={yOf(L)}
          x2={W}
          y2={yOf(L)}
          stroke="#16a34a"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {dots.map((d) => (
          <circle
            key={d.n}
            cx={xOf(d.n)}
            cy={yOf(d.a)}
            r={3.5}
            fill={d.inside ? "#16a34a" : "#ea580c"}
          />
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        a<sub>n</sub> = 1 + (−0.75)<sup>n</sup> konvergiert gegen 1
        (gestrichelte Linie). Egal wie schmal wir das grüne Band machen: Nur
        die ersten paar Punkte (orange: {nOutside}) liegen außerhalb — alle
        späteren bleiben endgültig darin.
      </p>
    </div>
  );
}

registerConcept({
  id: "convergence",
  title: "Konvergenz",
  body: (
    <>
      <p>
        Eine <ConceptLink id="sequence">Folge</ConceptLink>{" "}
        <M>{"a_1, a_2, a_3, \\dots"}</M> <em>konvergiert</em> gegen einen Wert{" "}
        <M>{"L"}</M>, wenn sich ihre Glieder bei <M>{"L"}</M> einpendeln:
        Irgendwann kommen sie <M>{"L"}</M> beliebig nahe und bleiben dann auch
        so nahe. Wir schreiben
      </p>
      <MD>{"a_n \\to L \\quad \\text{oder} \\quad \\lim_{n \\to \\infty} a_n = L."}</MD>
      <p>
        „Beliebig nahe“ machen wir mit einer Toleranz{" "}
        <M>{"\\varepsilon > 0"}</M> präzise: Für jede noch so winzige Toleranz
        müssen ab irgendeinem Index alle Glieder{" "}
        <M>{"|a_n - L| < \\varepsilon"}</M> erfüllen. Probieren wir das im
        Widget unten aus, indem wir das Band schrumpfen lassen. Zum Beispiel
        konvergiert <M>{"a_n = 1/n"}</M> gegen <M>{"0"}</M>, während{" "}
        <M>{"a_n = (-1)^n"}</M> ewig zwischen <M>{"-1"}</M> und <M>{"1"}</M>{" "}
        hin- und herspringt und gegen gar nichts konvergiert.
      </p>
      <p>
        Dieselbe Idee steckt hinter dem{" "}
        <ConceptLink id="limit">Grenzwert</ConceptLink> einer Funktion für{" "}
        <M>{"h \\to 0"}</M>, und sie entscheidet, ob eine{" "}
        <ConceptLink id="infinite-series">unendliche Reihe</ConceptLink> einen
        Wert hat: Eine Reihe konvergiert, wenn ihre Partialsummen es tun — die{" "}
        <ConceptLink id="geometric-series">geometrische Reihe</ConceptLink>{" "}
        <M>{"\\sum_k (1/2)^k"}</M> ist das klassische konvergente Beispiel.
      </p>
      <ToleranceBandWidget />
    </>
  ),
});
