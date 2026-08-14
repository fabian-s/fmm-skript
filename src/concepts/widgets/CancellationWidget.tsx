import { useState } from "react";
import { M, Slider } from "../../lib";

/** Ziffernbild der Auslöschung: gemeinsame führende Ziffern heben sich weg. */
export function DigitWidget() {
  const [k, setK] = useState(4);
  const a = 1.23456789;
  const b = a * (1 - Math.pow(10, -k)); // teilt ~k führende Ziffern mit a
  const d = a - b;
  const sa = a.toFixed(10);
  const sb = b.toFixed(10);
  let p = 0;
  while (p < sa.length && sa[p] === sb[p]) p++;
  const factor = Math.abs(a / d);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="gemeinsame Ziffern k"
        value={k}
        onChange={setK}
        min={1}
        max={8}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="font-mono text-xs leading-5">
        <div>
          a &nbsp;= <span className="text-red-400 line-through">{sa.slice(0, p)}</span>
          <span className="text-emerald-400">{sa.slice(p)}</span>
        </div>
        <div>
          b &nbsp;= <span className="text-red-400 line-through">{sb.slice(0, p)}</span>
          <span className="text-emerald-400">{sb.slice(p)}</span>
        </div>
        <div>
          a−b = {d.toExponential(3)} &nbsp;&nbsp;(Verstärkungsfaktor ≈ {factor.toExponential(1)})
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        Die durchgestrichenen führenden Ziffern sind in <M>{"a"}</M> und <M>{"b"}</M> identisch
        und heben sich bei der Subtraktion exakt weg; nur der grüne Rest trägt Information.
        Tragen <M>{"a"}</M> und <M>{"b"}</M> je einen relativen Rundungsfehler{" "}
        <M>{"\\approx \\eps_{\\text{mach}}"}</M>, dann trägt <M>{"a - b"}</M> ungefähr den{" "}
        <M>{"|a| / |a - b| \\approx 10^{k}"}</M>-fachen relativen Fehler.
      </p>
    </div>
  );
}
