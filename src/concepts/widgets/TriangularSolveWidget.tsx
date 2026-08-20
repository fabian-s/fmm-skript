import { useState } from "react";
import { Aufgabe, MD, Stepper, Verdikt } from "../../lib";

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
      <Aufgabe>Gehen wir von der untersten Gleichung schrittweise nach oben.</Aufgabe><MD>
        {"\\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 3 & -1 \\\\ 0 & 0 & 2 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 3 \\\\ 6 \\end{bmatrix}"}
      </MD>
      <Stepper step={step} setStep={setStep} max={3} narration={step ? STEPS[step - 1].text : "Ausgangssystem"} />
      {STEPS.slice(0, step).map((s, i) => (
        <div key={i} className="mt-1">
          <span className="text-xs opacity-80">{s.text}</span>
          <MD>{s.math}</MD>
        </div>
      ))}
      <Verdikt kind={step === 3 ? "ok" : "neutral"}>{step === 3 ? "x = (1, 2, 3). Für n Unbekannte summieren sich die Produkte und Divisionen zu einer Größenordnung n²." : "Jeder Schritt bestimmt genau eine neue Unbekannte."}</Verdikt>
    </div>
  );
}
