/** Widget zum Konzept-Tooltip „Binomischer Lehrsatz": (x+h)^n ausmultipliziert. */
import { useState } from "react";
import { MD, Slider } from "../../lib";

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}

function expansion(n: number): string {
  const terms: string[] = [];
  for (let i = 0; i <= n; i++) {
    const c = choose(n, i);
    const coef = c === 1 ? "" : `${c}\\,`;
    const xPow = n - i === 0 ? "" : n - i === 1 ? "x" : `x^{${n - i}}`;
    const hPow = i === 0 ? "" : i === 1 ? "h" : `h^{${i}}`;
    terms.push(`${coef}${xPow}${hPow}` || "1");
  }
  return `(x+h)^{${n}} = ${terms.join(" + ")}`;
}

export function ExpansionWidget() {
  const [n, setN] = useState(3);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Exponent n" value={n} onChange={setN} min={1} max={7} step={1} />
      <MD>{expansion(n)}</MD>
      <p className="mt-1 text-xs text-slate-300">
        Nur der zweite Term ist linear in h; nach Abziehen von xⁿ und Teilen
        durch h überlebt er allein den Grenzübergang h → 0 und liefert die
        Ableitung n·xⁿ⁻¹.
      </p>
    </div>
  );
}
