import { useState } from "react";
import { M, Slider } from "../../lib";
import { LabeledTransformCanvas } from "../../lib";

export function EigenWidget() {
  const [deg, setDeg] = useState(20);
  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [Math.cos(th), Math.sin(th)];
  // A = [[2,1],[1,2]]: eigenvalues 3 (dir 45°) and 1 (dir 135°)
  const Av: [number, number] = [2 * v[0] + v[1], v[0] + 2 * v[1]];
  const cross = v[0] * Av[1] - v[1] * Av[0];
  const aligned = Math.abs(cross) < 0.04;
  const lam = v[0] * Av[0] + v[1] * Av[1]; // v·Av since |v| = 1
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Richtung von v (Grad)" value={deg} onChange={setDeg} min={0} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        A v = ({Av[0].toFixed(2)}, {Av[1].toFixed(2)})ᵀ
        {aligned ? `, parallel! Eigenvektor mit λ ≈ ${lam.toFixed(2)}` : ", nicht parallel zu v"}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [2, 1],
          [1, 2],
        ]}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "A v" },
        ]}
        size={240}
        worldHalf={3.2}
      />
      <p className="mt-1 text-xs opacity-80">
        Drehen wir <M>{"\\bv"}</M>, bis der blaue Pfeil auf dem roten liegt:
        Bei 45° finden wir <M>{"\\lambda = 3"}</M>, bei 135° finden wir{" "}
        <M>{"\\lambda = 1"}</M>. Jede andere Richtung wird von der Abbildung
        aus ihrer Linie gekippt.
      </p>
    </div>
  );
}
