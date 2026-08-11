import { useState } from "react";
import { ConceptLink, LabeledPlot, M, Slider } from "../../lib";

const E0 = 0.1;
const FLOOR = -16; // doppelte Genauigkeit: ~16 korrekte Stellen

export function RateWidget() {
  const [c, setC] = useState(0.5);
  // log10 des Fehlers nach k Schritten
  const linLog = (k: number) => Math.log10(E0) + k * Math.log10(c);
  const quadLog = (k: number) => Math.pow(2, k) * Math.log10(E0);
  const marks: { x: number; y: number; color?: string }[] = [];
  for (let k = 0; k <= 8; k++) {
    const l = linLog(k);
    const q = quadLog(k);
    if (l >= FLOOR) marks.push({ x: k, y: l, color: "#dc2626" });
    if (q >= FLOOR) marks.push({ x: k, y: q, color: "#0284c7" });
  }
  const linDigits = -Math.log10(c);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="linearer Faktor C" value={c} onChange={setC} min={0.05} max={0.95} step={0.05} />
      <div className="my-1 font-mono text-xs">
        linear: ≈ {linDigits.toFixed(2)} neue Stelle(n) pro Schritt · quadratisch: Stellenzahl verdoppelt sich pro Schritt
      </div>
      <LabeledPlot
        xLabel="Iteration k"
        yLabel="log₁₀ Fehler"
        tickClass="text-slate-300"
        series={[
          { f: linLog, color: "#dc2626", label: "linear" },
          { f: quadLog, color: "#0284c7", label: "quadratisch" },
        ]}
        markers={marks}
        xDomain={[0, 8]}
        yDomain={[FLOOR, 0]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs opacity-80">
        Beide starten mit Fehler <M>{"10^{-1}"}</M>. Die{" "}
        <span className="text-red-400">lineare</span> Folge sinkt entlang
        einer Geraden, deren Steigung wir über <M>{"C"}</M> steuern; die{" "}
        <span className="text-sky-400">quadratische</span> stürzt nach wenigen
        Schritten aus dem Diagramm. Der Plot endet bei <M>{"10^{-16}"}</M>,
        ungefähr die{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
        in doppelter Genauigkeit; darunter bringen weitere Iterationen nichts
        mehr.
      </p>
    </div>
  );
}
