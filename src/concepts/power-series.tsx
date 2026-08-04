/** Konzept-Tooltip: Potenzreihe. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function factorial(k: number): number {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
}

/** Partialsummen der Kosinus-Potenzreihe im Vergleich zum Kosinus selbst. */
function CosSeriesWidget() {
  const [n, setN] = useState(1);
  const partial = (x: number) => {
    let s = 0;
    for (let k = 0; k <= n; k++) {
      s += (Math.pow(-1, k) * Math.pow(x, 2 * k)) / factorial(2 * k);
    }
    return s;
  };
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Terme bis k"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={0}
        max={8}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Plot
        series={[
          { f: Math.cos, color: "#94a3b8", dash: [5, 4], label: "cos" },
          { f: partial, color: "#0284c7", label: "Partialsumme" },
        ]}
        xDomain={[-7, 7]}
        yDomain={[-2.5, 2.5]}
        width={290}
        height={170}
      />
      <div className="mt-1 text-xs">
        Blau: <M>{"\\sum_{k=0}^{n} (-1)^k x^{2k}/(2k)!"}</M> — jeder weitere
        Term schmiegt sich auf einem breiteren Intervall an <M>{"\\cos x"}</M>{" "}
        (grau gestrichelt) an.
      </div>
    </div>
  );
}

registerConcept({
  id: "power-series",
  title: "Potenzreihe",
  body: (
    <>
      <p>
        Eine <em>Potenzreihe</em> (power series) ist eine{" "}
        <ConceptLink id="infinite-series">unendliche Reihe</ConceptLink>, deren
        Terme Potenzen von <M>{"(x - c)"}</M> mit festen Koeffizienten sind:
      </p>
      <MD>{"\\sum_{k=0}^{\\infty} a_k (x - c)^k = a_0 + a_1(x - c) + a_2(x - c)^2 + \\cdots"}</MD>
      <p>
        Stellen wir sie uns als{" "}
        <ConceptLink id="polynomial">Polynom</ConceptLink> vor, das niemals
        aufhört: Schneiden wir nach endlich vielen Termen ab, bleibt ein
        gewöhnliches Polynom übrig, und für alle <M>{"x"}</M>, für die die
        Reihe <ConceptLink id="convergence">konvergiert</ConceptLink>,
        definiert sie eine Funktion von <M>{"x"}</M>. Die Zahl <M>{"c"}</M>{" "}
        ist der Entwicklungspunkt; jeder Koeffizient <M>{"a_k"}</M> ist
        einfach eine Zahl, oft mit einer{" "}
        <ConceptLink id="factorial">Fakultät</ConceptLink> wie{" "}
        <M>{"1/k!"}</M> darin.
      </p>
      <p>
        Zum Beispiel stimmt der{" "}
        <ConceptLink id="sine-cosine">Kosinus</ConceptLink> mit seiner
        Potenzreihe um <M>{"c = 0"}</M> überein,{" "}
        <M>{"\\cos x = \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{(2k)!} x^{2k}"}</M>,
        und zwar für jedes reelle <M>{"x"}</M> — probieren wir es unten aus,
        indem wir die Anzahl der Terme erhöhen. Taylor-Reihen sind genau
        Potenzreihen, deren Koeffizienten aus den Ableitungen einer Funktion
        gebaut sind.
      </p>
      <CosSeriesWidget />
    </>
  ),
});
