/** Konzept-Tooltip: unendliche Reihen und Partialsummen. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** Balken, der sich in Richtung 2 füllt, während sich die Partialsummen 1 + 1/2 + 1/4 + … ansammeln. */
function PartialSumBar() {
  const [n, setN] = useState(3);
  const terms = Array.from({ length: n }, (_, k) => Math.pow(0.5, k));
  const partial = terms.reduce((s, t) => s + t, 0);
  const W = 280;
  const H = 34;
  const scale = W / 2; // Zielwert 2 füllt den ganzen Balken
  let xPos = 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Summanden n"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={1}
        max={12}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg width={W} height={H} className="rounded bg-white">
        {terms.map((t, k) => {
          const x = xPos;
          xPos += t * scale;
          return (
            <rect
              key={k}
              x={x}
              y={6}
              width={Math.max(t * scale - 1, 0.5)}
              height={H - 12}
              fill={k % 2 === 0 ? "#0284c7" : "#38bdf8"}
            />
          );
        })}
        <line x1={W - 1} y1={0} x2={W - 1} y2={H} stroke="#dc2626" strokeWidth={2} />
      </svg>
      <div className="mt-1 font-mono text-xs">
        S_{n} = {partial.toFixed(4)} → 2 (rote Linie)
      </div>
    </div>
  );
}

registerConcept({
  id: "infinite-series",
  title: "Unendliche Reihe",
  body: (
    <>
      <p>
        Eine <em>unendliche Reihe</em> (infinite series) entsteht, wenn eine{" "}
        <ConceptLink id="summation-notation">Summation</ConceptLink> niemals
        aufhört: eine Summe <M>{"\\sum_{k=0}^{\\infty} a_k"}</M> mit unendlich
        vielen Summanden, einem für jedes Glied einer{" "}
        <ConceptLink id="sequence">Folge</ConceptLink>{" "}
        <M>{"a_0, a_1, a_2, \\dots"}</M>
      </p>
      <p>
        Unendlich viele Zahlen können wir nie wirklich addieren, also wird die
        Summe über <em>Partialsummen</em>{" "}
        <M>{"S_n = a_0 + a_1 + \\cdots + a_n"}</M> definiert: Die Reihe hat den
        Wert <M>{"S"}</M>, wenn die Partialsummen als{" "}
        <ConceptLink id="limit">Grenzwert</ConceptLink> gegen <M>{"S"}</M>{" "}
        <ConceptLink id="convergence">konvergieren</ConceptLink>. Ein
        klassisches Beispiel ist die{" "}
        <ConceptLink id="geometric-series">geometrische Reihe</ConceptLink>
      </p>
      <MD>{"\\sum_{k=0}^{\\infty} \\left(\\tfrac{1}{2}\\right)^k = 1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots = 2,"}</MD>
      <p>
        bei der jeder weitere Summand die Hälfte der verbleibenden Lücke zur{" "}
        <M>{"2"}</M> schließt. Schauen wir unten zu, wie sich der Balken
        füllt. Nicht jede Reihe verhält sich so brav:{" "}
        <M>{"1 + 1 + 1 + \\cdots"}</M> wächst über alle Grenzen und hat darum
        keinen Wert. Taylorreihen sind genau solche Objekte: eine unendliche
        Summe von Polynomtermen.
      </p>
      <PartialSumBar />
    </>
  ),
});
