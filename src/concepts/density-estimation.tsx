import { ConceptLink, M, Plot, registerConcept } from "../lib";

const gauss = (x: number, mu: number, s: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

const data = [-1.9, -1.6, -1.4, -1.2, -1.1, -0.9, -0.6, 0.4, 0.7, 0.9, 1.2, 1.5, 1.9];

function DensityWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Plot
        series={[{ f: (x) => 0.55 * gauss(x, -1.2, 0.45) + 0.45 * gauss(x, 1.1, 0.6) }]}
        xDomain={[-3, 3]}
        yDomain={[0, 0.65]}
        width={280}
        height={180}
        markers={data.map((x) => ({ x, y: 0.015, color: "#475569" }))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Graue Punkte: beobachtete Datenpunkte. Blaue Kurve: eine geschätzte
        Dichte mit zwei Höckern, passend zu den zwei Clustern.
      </p>
    </div>
  );
}

registerConcept({
  id: "density-estimation",
  title: "Dichteschätzung",
  body: (
    <>
      <p>
        <em>Dichteschätzung</em> (density estimation) bedeutet: Wir
        rekonstruieren die Wahrscheinlichkeitsdichte einer Zufallsgröße aus
        einer Stichprobe <M>{"x_1, \\dots, x_N"}</M> beobachteter Werte —
        gesucht ist eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink> <M>{"p(x)"}</M>, die
        groß ist, wo sich Datenpunkte häufen, und klein, wo sie selten sind.
        Das Histogramm aus Statistik I ist die gröbste Variante; glatter wird
        es, wenn wir eine parametrische Familie wählen — zum Beispiel ein{" "}
        <ConceptLink id="gaussian-mixture-model">
          Gaußsches Mischmodell
        </ConceptLink>{" "}
        — und deren Parameter so einstellen, dass die{" "}
        <ConceptLink id="likelihood">Likelihood</ConceptLink> der beobachteten
        Stichprobe maximal wird. Dieser Einstellschritt ist ein numerisches{" "}
        <ConceptLink id="optimization">Optimierungsproblem</ConceptLink> — so
        motiviert die Dichteschätzung die Differentialrechnung, die wir dafür
        brauchen.
      </p>
      <DensityWidget />
    </>
  ),
});
