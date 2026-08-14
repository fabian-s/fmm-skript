import { useState } from "react";
import { LabeledTransformCanvas, M, Slider } from "../../lib";

export function NullSpaceWidget() {
  const [deg, setDeg] = useState(60);
  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A = [[1,1],[1,1]], null space = span{(1,-1)}
  const Av: [number, number] = [v[0] + v[1], v[0] + v[1]];
  const nearNull = Math.abs(v[0] + v[1]) < 0.15;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Richtung von v (Grad)" value={deg} onChange={setDeg} min={0} max={360} step={1} />
      <div className="my-1 font-mono text-xs">
        A v = ({Av[0].toFixed(2)}, {Av[1].toFixed(2)})ᵀ{nearNull ? ": v liegt (fast) im Nullraum!" : ""}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 1],
          [1, 1],
        ]}
        vectors={[
          { v: [2.1, -2.1], color: "#64748b", label: "Nullrichtung" },
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "A v" },
        ]}
        size={240}
        worldHalf={3.2}
      />
      <p className="mt-1 text-xs opacity-80">
        Hier drückt <M>{"\\bA = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}"}</M>{" "}
        das ganze Gitter auf eine einzige Gerade zusammen. Drehen wir den
        roten Eingabevektor, bis er entlang der grauen Richtung zeigt (135°
        oder 315°): Sein Bild kollabiert in den Ursprung.
      </p>
    </div>
  );
}
