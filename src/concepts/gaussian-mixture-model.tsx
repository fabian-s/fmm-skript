import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

const gauss = (x: number, mu: number, s: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

function MixtureWidget() {
  const [pi1, setPi1] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Gewicht π₁" value={pi1} onChange={setPi1} min={0} max={1} step={0.01} />
      <Plot
        series={[
          { f: (x) => pi1 * gauss(x, -1.5, 0.6), dash: [5, 4], color: "#16a34a" },
          { f: (x) => (1 - pi1) * gauss(x, 1, 0.9), dash: [5, 4], color: "#dc2626" },
          { f: (x) => pi1 * gauss(x, -1.5, 0.6) + (1 - pi1) * gauss(x, 1, 0.9) },
        ]}
        xDomain={[-4, 4]}
        yDomain={[0, 0.75]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        Durchgezogen: Mischdichte. Gestrichelt: die beiden gewichteten
        Gauß-Komponenten.
      </p>
    </div>
  );
}

registerConcept({
  id: "gaussian-mixture-model",
  title: "Gauß-Mischmodell (Gaussian mixture model, GMM)",
  body: (
    <>
      <p>
        Ein <em>Gauß-Mischmodell</em> (engl.{" "}
        <em>Gaussian mixture model</em>, GMM) beschreibt eine
        Wahrscheinlichkeitsdichte als gewichtete Summe von <M>{"K"}</M>{" "}
        Gauß-Dichten („Glockenkurven"):
      </p>
      <MD>
        {"p(x) = \\sum_{k=1}^{K} \\pi_k\\, \\mathcal{N}\\left(x \\mid \\mu_k, \\sigma_k^2\\right), \\qquad \\pi_k \\ge 0, \\quad \\sum_{k=1}^{K} \\pi_k = 1"}
      </MD>
      <p>
        Eine einzelne Glockenkurve kann nur einen „Hügel" modellieren, aber
        eine Mischung aus wenigen passt sich auch Daten mit mehreren Clustern
        an; deshalb sind GMMs ein Standardwerkzeug der{" "}
        <ConceptLink id="density-estimation">Dichteschätzung</ConceptLink>.
        Die Parameter (Mittelwerte <M>{"\\mu_k"}</M>, Varianzen{" "}
        <M>{"\\sigma_k^2"}</M>, Gewichte <M>{"\\pi_k"}</M>) werden so gewählt,
        dass sie die{" "}
        <ConceptLink id="likelihood">Likelihood</ConceptLink> der
        beobachteten Daten maximieren; eine geschlossene Lösung gibt es nicht,
        also geschieht das per iterativer numerischer{" "}
        <ConceptLink id="optimization">Optimierung</ConceptLink>, eines der
        motivierenden Beispiele für dieses Thema.
      </p>
      <MixtureWidget />
    </>
  ),
});
