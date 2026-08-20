import { useState } from "react";
import { Aufgabe, Slider, Verdikt, fmtDe } from "../../lib";

/** EINSICHT: Auslöschung vernichtet korrekte Stellen. FARBEN: rot naiv, grün stabil. PROVENIENZ: neu. VERIFIZIERT: verify/FB/verify-numbers.mjs, 2026-08-20. */
export function CancellationWidget() {
  const [k, setK] = useState(4);
  const x = Math.pow(10, -k);
  const naive = (1 - Math.cos(x)) / (x * x);
  const s = Math.sin(x / 2);
  const stable = (2 * s * s) / (x * x);
  const lost = naive === 0 ? 16 : Math.max(0, Math.floor(-Math.log10(Math.abs(naive - 0.5) / 0.5)));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Verkleinern wir x und vergleichen die zwei mathematisch gleichen Formeln.</Aufgabe><Slider
        label="Exponent k"
        value={k}
        onChange={setK}
        min={1}
        max={9}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="font-mono text-xs leading-5">
        <div>x = 10⁻{k}</div>
        <div>
          naiv&nbsp;&nbsp;(1 &minus; cos x)/x&sup2; ={" "}
          <span className={Math.abs(naive - 0.5) > 1e-4 ? "text-red-400" : "text-emerald-400"}>
            {fmtDe(naive, 10)}
          </span>
        </div>
        <div>
          stabil&nbsp;2&thinsp;sin&sup2;(x/2)/x&sup2; ={" "}
          <span className="text-emerald-400">{fmtDe(stable, 10)}</span>
        </div>
      </div>
      <Verdikt kind={Math.abs(naive - 0.5) > 1e-4 ? "fail" : "ok"}>{Math.abs(naive - 0.5) > 1e-4 ? `Die naive Variante hat mindestens ${16 - lost} korrekte Stellen verloren; die stabile Umformung vermeidet die Auslöschung.` : "Beide Werte stimmen hier noch auf die angezeigten Stellen überein."}</Verdikt>
    </div>
  );
}
