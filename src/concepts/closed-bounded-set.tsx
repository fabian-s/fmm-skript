/**
 * Konzept-Tooltip: abgeschlossene und beschränkte (kompakte) Menge, die
 * Voraussetzung des Satzes vom Minimum und Maximum (Existenz globaler
 * Minima).
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept } from "../lib";

function EndpointWidget() {
  const [closed, setClosed] = useState(true);
  const W = 280;
  const H = 170;
  const x0 = -0.15;
  const x1 = 1.15;
  const y0 = -0.15;
  const y1 = 1.15;
  const X = (x: number) => ((x - x0) / (x1 - x0)) * W;
  const Y = (y: number) => H - ((y - y0) / (y1 - y0)) * H;
  const a = closed ? 0.2 : 0; // linker Randpunkt des Definitionsbereichs
  const btn = (active: boolean) =>
    `rounded px-2 py-0.5 text-xs ${active ? "bg-sky-600 text-white" : "bg-slate-600 text-slate-200"}`;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex gap-2">
        <button className={btn(closed)} onClick={() => setClosed(true)}>
          abgeschlossen [0.2, 1]
        </button>
        <button className={btn(!closed)} onClick={() => setClosed(false)}>
          nicht abgeschlossen (0, 1]
        </button>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full rounded border border-slate-500 bg-white"
      >
        <line x1={0} y1={Y(0)} x2={W} y2={Y(0)} stroke="#94a3b8" strokeWidth={1} />
        <line x1={X(0)} y1={0} x2={X(0)} y2={H} stroke="#94a3b8" strokeWidth={1} />
        {[0.2, 0.5, 1].map((v) => (
          <text key={v} x={X(v)} y={Y(0) + 11} fontSize={9} fill="#64748b" textAnchor="middle">
            {v}
          </text>
        ))}
        {/* Graph von f(x) = x auf dem gewählten Definitionsbereich */}
        <line x1={X(a)} y1={Y(a)} x2={X(1)} y2={Y(1)} stroke="#0284c7" strokeWidth={2} />
        {/* rechter Randpunkt: immer enthalten */}
        <circle cx={X(1)} cy={Y(1)} r={4} fill="#0284c7" />
        {/* linker Randpunkt: gefüllt wenn enthalten, offener Ring wenn nicht */}
        {closed ? (
          <circle cx={X(a)} cy={Y(a)} r={4.5} fill="#dc2626" />
        ) : (
          <circle cx={X(a)} cy={Y(a)} r={4.5} fill="white" stroke="#dc2626" strokeWidth={2} />
        )}
      </svg>
      <p className="mt-1 text-xs">
        {closed ? (
          <>
            <M>{"f(x) = x"}</M> auf <M>{"[0.2, 1]"}</M>: das Minimum wird im
            enthaltenen Randpunkt angenommen, <M>{"f(0.2) = 0.2"}</M>.
          </>
        ) : (
          <>
            <M>{"f(x) = x"}</M> auf <M>{"(0, 1]"}</M>: die Werte kommen der 0
            beliebig nahe, aber kein Punkt der Menge erreicht sie; jeder
            Kandidat <M>{"\\wh{x}"}</M> wird von <M>{"\\wh{x}/2"}</M>{" "}
            geschlagen. Es existiert kein Minimierer.
          </>
        )}
      </p>
    </div>
  );
}

registerConcept({
  id: "closed-bounded-set",
  title: "Abgeschlossene und beschränkte Menge",
  body: (
    <>
      <p>
        Zwei getrennte Bedingungen an eine Menge{" "}
        <M>{"S \\subseteq \\R^n"}</M>. <em>Beschränkt</em> (bounded) heißt:{" "}
        <M>{"S"}</M> passt in eine Kugel mit endlichem Radius,{" "}
        <M>{"\\|\\bx\\| \\le R"}</M> für alle <M>{"\\bx \\in S"}</M>, gemessen
        mit der{" "}
        <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink>.
        Keine Punkte entkommen ins Unendliche. <em>Abgeschlossen</em> (closed)
        heißt: <M>{"S"}</M> enthält alle seine Randpunkte. Wann immer sich
        Punkte aus <M>{"S"}</M> auf einen Grenzwert zubewegen, gehört auch
        dieser Grenzwert zu <M>{"S"}</M>. Das Intervall <M>{"[0, 1]"}</M> ist
        abgeschlossen; <M>{"(0, 1)"}</M> nicht, denn seine Punkte nähern sich{" "}
        <M>{"0"}</M> und <M>{"1"}</M>, ohne dass eine der beiden Zahlen zur
        Menge gehört.
      </p>
      <p>
        Zusammen (eine abgeschlossene und beschränkte Menge heißt{" "}
        <em>kompakt</em>, compact) kaufen uns die beiden Bedingungen die
        fundamentale Existenzgarantie (Satz vom Minimum und Maximum): eine{" "}
        <ConceptLink id="continuity">stetige</ConceptLink> Funktion auf einer
        nichtleeren abgeschlossenen und beschränkten Menge nimmt einen größten
        und einen kleinsten Wert an: das globale Minimum existiert wirklich,
        es wird nicht nur angenähert. Lassen wir eine der Bedingungen fallen,
        stirbt die Garantie: <M>{"f(x) = x"}</M> auf <M>{"(0, 1]"}</M> hat
        keinen Minimierer (nicht abgeschlossen), und auf ganz <M>{"\\R"}</M>{" "}
        gar kein Minimum (nicht beschränkt).
      </p>
      <MD>{"\\text{abgeschlossen + beschränkt + } f \\text{ stetig} \\;\\implies\\; \\min_{\\bx \\in S} f(\\bx) \\text{ wird angenommen.}"}</MD>
      <EndpointWidget />
    </>
  ),
});
