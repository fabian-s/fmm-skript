/** Konzept-Tooltip: Rangsatz (rank–nullity theorem). */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function DimensionBudgetWidget() {
  const n = 4;
  const [r, setR] = useState(2);
  const w = 280;
  const barH = 26;
  const seg = (w - 20) / n;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Rang r"
        value={r}
        onChange={(v) => setR(Math.round(v))}
        min={0}
        max={n}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <svg width={w} height={70} className="rounded bg-slate-900/60">
        {Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={10 + i * seg}
            y={18}
            width={seg - 3}
            height={barH}
            rx={3}
            fill={i < r ? "#38bdf8" : "#f472b6"}
          />
        ))}
        <text x={10} y={12} fill="#e2e8f0" fontSize={11}>
          n = {n} Eingangsdimensionen
        </text>
        <text x={10} y={60} fill="#38bdf8" fontSize={11}>
          überleben: rg = {r}
        </text>
        <text x={w - 10} y={60} fill="#f472b6" fontSize={11} textAnchor="end">
          plattgedrückt: dim Kern = {n - r}
        </text>
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Ein festes Budget von <M>{"n = 4"}</M> Eingangsdimensionen für eine
        Abbildung <M>{"\\R^4 \\to \\R^m"}</M>: Was der Rang gewinnt, verliert
        der Kern; die beiden summieren sich immer zu 4.
      </p>
    </div>
  );
}

registerConcept({
  id: "rank-nullity-theorem",
  title: "Rangsatz",
  body: (
    <>
      <p>
        Für eine{" "}
        <ConceptLink id="linear-map">lineare Abbildung</ConceptLink>{" "}
        <M>{"\\Phi: \\R^n \\to \\R^m"}</M> (gleichwertig: eine{" "}
        <M>{"m \\times n"}</M>-
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M>) ist der{" "}
        <em>Rangsatz</em> (rank–nullity theorem, vgl. MML Theorem 2.24) ein
        Erhaltungssatz für{" "}
        <ConceptLink id="dimension">Dimensionen</ConceptLink>:
      </p>
      <MD>
        {"\\dim\\big(\\ker(\\Phi)\\big) \\;+\\; \\rang(\\bA) \\;=\\; n."}
      </MD>
      <p>
        Von den <M>{"n"}</M> Dimensionen, die der Eingangsraum anbietet,
        drückt die Abbildung <M>{"\\dim(\\ker)"}</M> davon auf null zusammen
        (den <ConceptLink id="kernel">Kern</ConceptLink>), und jede nicht
        zusammengedrückte Dimension taucht im{" "}
        <ConceptLink id="image">Bild</ConceptLink> auf, dessen Dimension der{" "}
        <ConceptLink id="rank">Rang</ConceptLink> ist. Keine entsteht neu,
        keine geht verloren. Kleines Beispiel:{" "}
        <M>{"\\bA = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}"}</M>{" "}
        hat Rang 2 (die ersten beiden Spalten sind unabhängig, die dritte ist
        ihre Summe), also muss der Kern eine Gerade sein: Tatsächlich spannt{" "}
        <M>{"(1, 1, -1)^\\top"}</M> ihn auf, und <M>{"1 + 2 = 3"}</M> geht
        auf. Der Rangsatz treibt außerdem Beweise durch Abzählen an: Im
        Eckart-Young-Argument zur SVD (vgl. MML §4.5) zwingt er zwei{" "}
        <ConceptLink id="subspace">Untervektorräume</ConceptLink> dazu, sich
        in einem Vektor ungleich null zu überlappen: allein die Dimensionen
        schließen einen leeren Schnitt aus, und das liefert den Widerspruch.
      </p>
      <DimensionBudgetWidget />
    </>
  ),
});
