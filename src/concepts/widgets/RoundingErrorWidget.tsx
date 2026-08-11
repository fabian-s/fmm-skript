import { useState } from "react";
import { M, Slider } from "../../lib";

/** Katastrophale Auslöschung live: (1 - cos x)/x^2 in echter double precision. */
export function CancellationWidget() {
  const [k, setK] = useState(4);
  const x = Math.pow(10, -k);
  const naive = (1 - Math.cos(x)) / (x * x);
  const s = Math.sin(x / 2);
  const stable = (2 * s * s) / (x * x);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="Exponent k"
        value={k}
        onChange={setK}
        min={1}
        max={9}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="font-mono text-xs leading-5">
        <div>x = 1e-{k}</div>
        <div>
          naiv&nbsp;&nbsp;(1 &minus; cos x)/x&sup2; ={" "}
          <span className={Math.abs(naive - 0.5) > 1e-4 ? "text-red-400" : "text-emerald-400"}>
            {naive.toPrecision(10)}
          </span>
        </div>
        <div>
          stabil&nbsp;2&thinsp;sin&sup2;(x/2)/x&sup2; ={" "}
          <span className="text-emerald-400">{stable.toPrecision(10)}</span>
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        Beide Formeln sind mathematisch identisch, mit Wert{" "}
        <M>{"\\to 1/2"}</M> für <M>{"x \\to 0"}</M>. Das hier sind die echten
        Double-Precision-Ergebnisse dieses Browsers, live berechnet: Bei{" "}
        <M>{"x = 10^{-8}"}</M> hat die naive Variante <M>{"\\cos x"}</M> exakt
        als 1 berechnet, und die Subtraktion liefert 0; jede korrekte Ziffer
        ist weg. Die stabile Variante subtrahiert nie fast gleich große Zahlen.
      </p>
    </div>
  );
}
