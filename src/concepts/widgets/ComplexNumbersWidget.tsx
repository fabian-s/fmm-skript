/** Widget zum Konzept-Tooltip „Komplexe Zahlen": z, i·z und die Konjugierte. */
import { useState } from "react";
import { M, Slider } from "../../lib";
import { LabeledTransformCanvas, maxAbsCoord } from "../../lib";

export function ComplexPlaneWidget() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const z: [number, number] = [a, b];
  const iz: [number, number] = [-b, a]; // i(a+bi) = -b + ai
  const zbar: [number, number] = [a, -b];
  const mod = Math.hypot(a, b);
  const half = Math.max(2.2, maxAbsCoord(z, iz, zbar) * 1.25);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Re z = a" value={a} onChange={setA} min={-2.5} max={2.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="Im z = b" value={b} onChange={setB} min={-2.5} max={2.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="my-1 font-mono text-xs">
        z = {a.toFixed(1)} {b < 0 ? "−" : "+"} {Math.abs(b).toFixed(1)}i, |z| = {mod.toFixed(2)}, z̄ ={" "}
        {a.toFixed(1)} {b < 0 ? "+" : "−"} {Math.abs(b).toFixed(1)}i
      </div>
      <LabeledTransformCanvas
        xLabel="Re"
        yLabel="Im"
        tickClass="text-slate-300"
        matrix={[
          [0, -1],
          [1, 0],
        ]}
        vectors={[
          { v: z, color: "#dc2626", label: "z" },
          { v: iz, color: "#0284c7", label: "i·z" },
          { v: zbar, color: "#d97706", label: "z̄" },
        ]}
        size={240}
        worldHalf={half}
      />
      <p className="mt-1 text-xs opacity-80">
        Das gezeigte Gitter ist die Ebene nach Multiplikation mit{" "}
        <M>{"i"}</M>: eine Vierteldrehung gegen den Uhrzeigersinn. Der blaue
        Pfeil <M>{"i \\cdot z"}</M> ist immer der um 90° gedrehte rote Pfeil,
        und die Konjugierte <M>{"\\bar{z}"}</M> (orange) ist sein Spiegelbild
        an der reellen Achse.
      </p>
    </div>
  );
}
