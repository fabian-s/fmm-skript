import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

/** Expected winnings of a simple bet as the win probability varies. */
export function BetWidget() {
  const [p, setP] = useState(0.4);
  const ev = 10 * p - 2 * (1 - p);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Gewinnwahrsch. p" value={p} onChange={setP} min={0} max={1} step={0.01} />
      <div className="mb-1 text-xs">
        Eine Wette zahlt <M>{"+10"}</M> € mit Wahrscheinlichkeit <M>{"p"}</M>{" "}
        und kostet sonst <M>{"2"}</M> €:{" "}
        <M>{`\\E[X] = 10p - 2(1-p) = ${ev.toFixed(2)}`}</M> €. Ab{" "}
        <M>{"p = 1/6"}</M> lohnt sie sich.
      </div>
      <Plot
        series={[{ f: (q) => 12 * q - 2 }]}
        xDomain={[0, 1]}
        yDomain={[-3, 11]}
        width={280}
        height={160}
        markers={[{ x: p, y: ev, label: "E[X]" }]}
      />
    </div>
  );
}
