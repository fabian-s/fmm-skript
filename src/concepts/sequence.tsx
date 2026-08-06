/** Konzept-Tooltip: Folge: eine geordnete unendliche Liste von Zahlen. */
import { ConceptLink, M, MD, registerConcept } from "../lib";

/** Punktplot von a_n = 1/n: ein Punkt pro Index, immer dichter an 0. */
function SequenceDots() {
  const W = 280;
  const H = 120;
  const N = 20;
  const xOf = (n: number) => 14 + ((n - 1) / (N - 1)) * (W - 28);
  const yOf = (a: number) => H - 14 - a * (H - 28);
  const dots = Array.from({ length: N }, (_, i) => {
    const n = i + 1;
    return { n, a: 1 / n };
  });
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <svg width={W} height={H} className="rounded bg-white">
        <line
          x1={8}
          y1={yOf(0)}
          x2={W - 4}
          y2={yOf(0)}
          stroke="#dc2626"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {dots.map((d) => (
          <circle key={d.n} cx={xOf(d.n)} cy={yOf(d.a)} r={3.5} fill="#0284c7" />
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        Die Folge a<sub>n</sub> = 1/n, ein Punkt pro Index n = 1, 2, …, 20. Die
        Glieder behalten ihre Reihenfolge und drängen sich immer dichter an 0
        (rote Linie).
      </p>
    </div>
  );
}

registerConcept({
  id: "sequence",
  title: "Folge",
  body: (
    <>
      <p>
        Eine Folge (sequence) ist eine unendliche, <em>geordnete</em> Liste von
        Zahlen
      </p>
      <MD>{"a_0,\\; a_1,\\; a_2,\\; a_3,\\; \\dots,"}</MD>
      <p>
        wobei der Index die Position angibt: <M>{"a_0"}</M> ist das erste
        Glied, <M>{"a_{17}"}</M> das achtzehnte, und es gibt immer ein
        nächstes. Formal ist eine Folge einfach eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink>, die jedem Index{" "}
        <M>{"n \\in \\N"}</M> eine Zahl <M>{"a_n"}</M> zuordnet. Die
        Reihenfolge zählt: Die Liste{" "}
        <M>{"1, \\tfrac{1}{2}, \\tfrac{1}{3}, \\dots"}</M> (also{" "}
        <M>{"a_n = 1/n"}</M>) ist eine andere Folge als dieselben Zahlen in
        durchgewürfelter Reihenfolge.
      </p>
      <p>
        Folgen sind das Grundwerkzeug hinter der{" "}
        <ConceptLink id="convergence">Konvergenz</ConceptLink>: Viele Folgen
        pendeln sich mit wachsendem <M>{"n"}</M> auf einen festen Wert ein:{" "}
        <M>{"a_n = 1/n"}</M> strebt gegen <M>{"0"}</M>, wie die Punkte unten
        zeigen. Und summieren wir die Glieder einer Folge nacheinander auf,
        entsteht eine{" "}
        <ConceptLink id="infinite-series">unendliche Reihe</ConceptLink>.
      </p>
      <SequenceDots />
    </>
  ),
});
