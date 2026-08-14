import { useState } from "react";
import { LabeledTransformCanvas, Slider } from "../../lib";

/**
 * Untervektorraum: Der Regler c zeigt, dass alle Vielfachen eines Vektors
 * eine Gerade durch den Ursprung nachzeichnen, einen 1-dimensionalen
 * Untervektorraum der Ebene. Ein fester Punkt abseits dieser Geraden
 * illustriert „liegt nicht im Untervektorraum".
 */
export function SubspaceWidget() {
  const [c, setC] = useState(1.2);
  const v: [number, number] = [2, 1];
  const cv: [number, number] = [c * v[0], c * v[1]];
  const w: [number, number] = [-1, 1.8];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="c" value={c} onChange={setC} min={-1.5} max={1.5} step={0.1} fmt={(x) => x.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        c·v = ({cv[0].toFixed(1)}, {cv[1].toFixed(1)})
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        vectors={[
          { v: v, color: "#38bdf8", label: "v" },
          { v: cv, color: "#f472b6", label: "c·v" },
          { v: w, color: "#94a3b8", label: "w (nicht auf der Geraden)" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Jede Position, die der pinke Vektor erreichen kann, liegt auf einer
        Geraden durch den Ursprung: Diese Gerade ist ein Untervektorraum. Der
        graue Vektor w liegt nicht darauf; kein noch so geschicktes
        Skalieren von v wird ihn je erreichen.
      </p>
    </div>
  );
}
