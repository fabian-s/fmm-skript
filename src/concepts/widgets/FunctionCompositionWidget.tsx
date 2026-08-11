import { useState } from "react";
import { M, Slider } from "../../lib";

/** Live pipeline x -> f(x) = x + 1 -> g(f(x)) = (x + 1)^2. */
export function CompositionPipeline() {
  const [x, setX] = useState(1);
  const fx = x + 1;
  const gfx = fx * fx;
  const box = "rounded bg-white px-2 py-1 font-mono text-xs text-slate-800";
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <span className={box}>x = {x.toFixed(1)}</span>
        <span>
          –<M>{"f"}</M>→
        </span>
        <span className={box}>f(x) = {fx.toFixed(1)}</span>
        <span>
          –<M>{"g"}</M>→
        </span>
        <span className={box}>g(f(x)) = {gfx.toFixed(2)}</span>
      </div>
      <div className="mt-1 text-xs">
        Hier ist <M>{"f(x) = x + 1"}</M> und <M>{"g(y) = y^2"}</M>, also{" "}
        <M>{"(g \\circ f)(x) = (x + 1)^2"}</M>.
      </div>
    </div>
  );
}
