/** Concept tooltip: Likelihood (wie wahrscheinlich sind die Daten unter den Parametern). */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function LikelihoodWidget() {
  const [h, setH] = useState(7);
  const n = 10;
  const pHat = h / n;
  const peak = Math.pow(pHat, h) * Math.pow(1 - pHat, n - h); // Math.pow(0,0)=1
  const L = (p: number) =>
    p < 0 || p > 1 ? NaN : (Math.pow(p, h) * Math.pow(1 - p, n - h)) / peak;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Anzahl Kopf h"
        value={h}
        onChange={setH}
        min={0}
        max={10}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="mb-1 text-xs">
        Likelihood von <M>{"p"}</M> nach {h}-mal Kopf bei 10 Würfen (skaliert,
        sodass das Maximum 1 ist). Sie ist maximal bei{" "}
        <M>{`\\hat{p} = ${pHat.toFixed(1)}`}</M>, dem
        Maximum-Likelihood-Schätzer.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[0, 1]}
        yDomain={[-0.1, 1.15]}
        width={280}
        height={180}
        markers={[{ x: pHat, y: 1, label: "p̂" }]}
      />
    </div>
  );
}

registerConcept({
  id: "likelihood",
  title: "Likelihood",
  body: (
    <>
      <p>
        Die Likelihood misst, wie wahrscheinlich die beobachteten Daten wären,
        wenn die Parameter einen bestimmten Wert hätten. Die Daten stehen fest
        (sie wurden ja gemessen), und wir lesen die Likelihood als{" "}
        <ConceptLink id="function">Funktion</ConceptLink> der Parameter{" "}
        <M>{"\\btheta"}</M>: Parameter, unter denen die Daten wahrscheinlich
        sind, bekommen eine hohe Likelihood. Beispiel: Eine Münze mit
        unbekannter Kopf-Wahrscheinlichkeit <M>{"p"}</M> zeigt bei 10
        unabhängigen Würfen 7-mal Kopf; eine bestimmte solche Wurffolge hat die
        Wahrscheinlichkeit
      </p>
      <MD>{"L(p) = p^{7} (1 - p)^{3} ,"}</MD>
      <p>
        und die ist am größten bei <M>{"p = 0.7"}</M>. Wählen wir die
        Parameter, die die Likelihood{" "}
        <ConceptLink id="optimization">maximieren</ConceptLink>, heißt das
        Maximum-Likelihood-Schätzung. Sie ist die{" "}
        <ConceptLink id="objective-function">Zielfunktion</ConceptLink> hinter
        vielen Standardverfahren, auch hinter der{" "}
        <ConceptLink id="linear-regression">linearen Regression</ConceptLink>{" "}
        mit normalverteilten Fehlern.
      </p>
      <LikelihoodWidget />
    </>
  ),
});
