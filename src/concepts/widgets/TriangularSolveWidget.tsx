import { useState } from "react";
import { MD, Slider } from "../../lib";

const STEPS = [
  {
    text: "Zeile 3 enthält nur x_3:",
    math: "2 x_3 = 6 \\;\\Rightarrow\\; x_3 = 3",
  },
  {
    text: "x_3 = 3 in Zeile 2 einsetzen:",
    math: "3 x_2 - x_3 = 3 \\;\\Rightarrow\\; x_2 = \\tfrac{3 + 3}{3} = 2",
  },
  {
    text: "x_2, x_3 in Zeile 1 einsetzen:",
    math: "2 x_1 + x_2 + x_3 = 7 \\;\\Rightarrow\\; x_1 = \\tfrac{7 - 2 - 3}{2} = 1",
  },
];

export function BackSubWidget() {
  const [step, setStep] = useState(0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <MD>
        {"\\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 3 & -1 \\\\ 0 & 0 & 2 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 3 \\\\ 6 \\end{bmatrix}"}
      </MD>
      <Slider
        label="gezeigte Schritte"
        value={step}
        onChange={setStep}
        min={0}
        max={3}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      {STEPS.slice(0, step).map((s, i) => (
        <div key={i} className="mt-1">
          <span className="text-xs opacity-80">{s.text}</span>
          <MD>{s.math}</MD>
        </div>
      ))}
      {step === 3 && (
        <div className="mt-1 font-mono text-xs text-emerald-400">
          x = (1, 2, 3): von unten nach oben gelöst, eine Division pro
          Unbekannter.
        </div>
      )}
    </div>
  );
}
