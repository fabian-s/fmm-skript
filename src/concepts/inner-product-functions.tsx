/** Konzept-Tooltip: Skalarprodukt von Funktionen — das Integral-Gegenstück zum Skalarprodukt von Vektoren. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept } from "../lib";
import { LabeledPlot } from "../lib";

const POLYS = [
  { name: "1", f: (_t: number) => 1 },
  { name: "t", f: (t: number) => t },
  { name: "(3t²−1)/2", f: (t: number) => (3 * t * t - 1) / 2 },
];

/** Simpson-Regel auf [-1, 1] mit 200 Teilintervallen. */
function integrate(g: (t: number) => number): number {
  const n = 200;
  const h = 2 / n;
  let s = g(-1) + g(1);
  for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * g(-1 + i * h);
  return (s * h) / 3;
}

function InnerProductWidget() {
  const [pi, setPi] = useState(0);
  const [qi, setQi] = useState(1);
  const p = POLYS[pi];
  const q = POLYS[qi];
  const prod = (t: number) => p.f(t) * q.f(t);
  const ip = integrate(prod);
  const orth = Math.abs(ip) < 1e-8;
  const picker = (label: string, sel: number, set: (i: number) => void) => (
    <div className="flex items-center gap-1">
      <span className="w-4 font-mono text-xs">{label}:</span>
      {POLYS.map((pol, i) => (
        <button
          key={pol.name}
          onClick={() => set(i)}
          className={`rounded px-2 py-0.5 font-mono text-xs ${
            i === sel ? "bg-sky-600 text-white" : "bg-slate-600 text-slate-200"
          }`}
        >
          {pol.name}
        </button>
      ))}
    </div>
  );
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Wählen wir zwei Polynome; der Plot zeigt das Produkt{" "}
        <span className="text-sky-400">p(t)·q(t)</span> auf <M>{"[-1, 1]"}</M>{" "}
        (mit <M>{"w(t) \\equiv 1"}</M>). Sein Integral ist das Skalarprodukt:
        Bei orthogonalen Paaren heben sich positive und negative Fläche exakt
        auf.
      </p>
      <div className="mb-1 flex flex-col gap-1">
        {picker("p", pi, setPi)}
        {picker("q", qi, setQi)}
      </div>
      <LabeledPlot
        xLabel="t"
        yLabel="p·q"
        tickClass="text-slate-300"
        series={[
          { f: p.f, color: "#94a3b8", dash: [3, 4] },
          { f: q.f, color: "#94a3b8", dash: [6, 3] },
          { f: prod, color: "#0284c7" },
        ]}
        xDomain={[-1, 1]}
        yDomain={[-1.25, 1.25]}
        width={280}
        height={200}
      />
      <p className="mt-1 font-mono text-xs">
        ⟨p, q⟩ = {(Math.abs(ip) < 5e-9 ? 0 : ip).toFixed(3)}
        {orth ? " → orthogonal" : ""}
      </p>
    </div>
  );
}

registerConcept({
  id: "inner-product-functions",
  title: "Skalarprodukt von Funktionen",
  body: (
    <>
      <p>
        Das <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> zweier
        Vektoren multipliziert zueinander passende Komponenten und summiert
        sie auf. Funktionen auf einem Intervall können wir genauso behandeln
        &mdash; stellen wir uns <M>{"p(t)"}</M> und <M>{"q(t)"}</M> als
        „Vektoren“ mit einer Komponente pro Punkt <M>{"t"}</M> vor &mdash;
        nur wird aus der Summe über unendlich viele Punkte ein Integral:
      </p>
      <MD>{"\\langle p, q \\rangle = \\int_a^b p(t)\\, q(t)\\, w(t)\\, dt,"}</MD>
      <p>
        wobei die feste Gewichtsfunktion <M>{"w(t) \\ge 0"}</M> manche
        Bereiche des Intervalls stärker zählen lässt als andere. Die gesamte
        geometrische Sprache überträgt sich dann: Zwei Funktionen sind{" "}
        <ConceptLink id="orthogonality">orthogonal</ConceptLink>, wenn{" "}
        <M>{"\\langle p, q \\rangle = 0"}</M>. Kleines Beispiel: Auf{" "}
        <M>{"[-1, 1]"}</M> mit <M>{"w(t) \\equiv 1"}</M> ist{" "}
        <M>{"\\langle 1, t \\rangle = \\int_{-1}^{1} t \\, dt = 0"}</M>, die
        konstante Funktion und <M>{"t"}</M> sind also orthogonal &mdash; der
        erste Schritt beim Aufbau orthogonaler Polynome (vgl. Heath §7.3.4).
      </p>
      <InnerProductWidget />
    </>
  ),
});
