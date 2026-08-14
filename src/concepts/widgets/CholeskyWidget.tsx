import { useState } from "react";
import { Slider } from "../../lib";

/**
 * Live-2x2-Cholesky: die Einträge einer symmetrischen Matrix verstellen und
 * zusehen, wie sich der Faktor L aktualisiert, oder wie die Zerlegung
 * zusammenbricht, sobald die Matrix nicht mehr positiv definit ist.
 */
export function CholeskyWidget() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const l11 = Math.sqrt(Math.max(a, 0));
  const l21 = a > 0 ? b / l11 : NaN;
  const l22sq = c - (a > 0 ? (b * b) / a : NaN);
  const ok = a > 0 && l22sq > 0;
  const l22 = ok ? Math.sqrt(l22sq) : NaN;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a₁₁" value={a} onChange={setA} min={0.5} max={6} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="a₂₁ = a₁₂" value={b} onChange={setB} min={-4} max={4} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="a₂₂" value={c} onChange={setC} min={0.5} max={6} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        A = [[{a.toFixed(1)}, {b.toFixed(1)}], [{b.toFixed(1)}, {c.toFixed(1)}]]
      </p>
      {ok ? (
        <p className="my-1 font-mono text-xs text-emerald-300">
          L = [[{l11.toFixed(3)}, 0], [{l21.toFixed(3)}, {l22.toFixed(3)}]]
          {"  "}(Probe: l₂₁² + l₂₂² = {(l21 * l21 + l22 * l22).toFixed(3)} = a₂₂)
        </p>
      ) : (
        <p className="my-1 font-mono text-xs text-rose-300">
          Abbruch: l₂₂² = a₂₂ − a₂₁²/a₁₁ = {l22sq.toFixed(3)} ≤ 0. Dieses A
          ist nicht positiv definit, es gibt keine reelle Wurzel
        </p>
      )}
      <p className="mt-1 text-xs text-slate-300">
        Das Rezept für 2×2: l₁₁ = √a₁₁, l₂₁ = a₂₁/l₁₁, l₂₂ = √(a₂₂ − l₂₁²).
        Positive Definitheit ist genau das, was jede Zahl unter einer Wurzel
        positiv hält.
      </p>
    </div>
  );
}
