import { useState } from "react";
import { LabeledTransformCanvas, maxAbsCoord, Slider } from "../../lib";

export function IndependenceWidget() {
  const [bx, setBx] = useState(-1);
  const [by, setBy] = useState(1.5);
  // fixed first vector a = (2, 1); pair is dependent iff the parallelogram
  // they span has zero area, i.e. 2*by - 1*bx = 0.
  const cross = 2 * by - 1 * bx;
  const dependent = Math.abs(cross) < 0.05;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="b, 1. Eintrag" value={bx} onChange={setBx} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b, 2. Eintrag" value={by} onChange={setBy} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        b = ({bx.toFixed(1)}, {by.toFixed(1)}) · Parallelogrammfläche |2·{by.toFixed(1)} − 1·
        {bx.toFixed(1)}| = {Math.abs(cross).toFixed(2)}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        vectors={[
          { v: [2, 1], color: "#0284c7", label: "a" },
          { v: [bx, by], color: "#dc2626", label: "b" },
        ]}
        showUnitCircle={false}
        size={260}
        worldHalf={Math.max(3.2, 1.35 * maxAbsCoord([2, 1], [bx, by]))}
      />
      <p className={"mt-1 text-xs " + (dependent ? "text-red-400" : "text-emerald-400")}>
        {dependent
          ? "b liegt auf derselben Ursprungsgeraden wie a: das Paar ist linear ABHÄNGIG."
          : "b zeigt weg von der Geraden durch a: das Paar ist linear unabhängig."}
      </p>
    </div>
  );
}
