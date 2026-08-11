import { useState } from "react";
import { Slider } from "../../lib";

const MATS: number[][][] = [
  [
    [2, 1, 1],
    [4, 5, 1],
    [2, -2, 0],
  ],
  [
    [2, 1, 1],
    [0, 3, -1],
    [0, -3, -1],
  ],
  [
    [2, 1, 1],
    [0, 3, -1],
    [0, 0, -2],
  ],
];

// cells changed at each step ("i-j" keys); created zeros get the green color
const CHANGED: Set<string>[] = [
  new Set(),
  new Set(["1-0", "1-1", "1-2", "2-0", "2-1", "2-2"]),
  new Set(["2-1", "2-2"]),
];
const ZEROED: Set<string>[] = [new Set(), new Set(["1-0", "2-0"]), new Set(["2-1"])];

const CAPTIONS = [
  "Start: Das Pivotelement ist die 2 in der linken oberen Ecke.",
  "Schritt 1: Wir ziehen das 2-Fache von Zeile 1 von Zeile 2 ab und das 1-Fache von Zeile 1 von Zeile 3 (Multiplikatoren 4/2 = 2 und 2/2 = 1); Spalte 1 ist unterhalb des Pivots geräumt.",
  "Schritt 2: Das nächste Pivotelement ist die 3; der Multiplikator ist \u22123/3 = \u22121, also wird Zeile 2 zu Zeile 3 addiert. Obere Dreiecksform erreicht.",
];

export function EliminationWidget() {
  const [step, setStep] = useState(0);
  const A = MATS[step];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="Eliminationsschritt"
        value={step}
        onChange={setStep}
        min={0}
        max={2}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div
        className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-2 py-1 font-mono text-xs"
        style={{ gridTemplateColumns: "repeat(3, 2.2rem)" }}
      >
        {A.map((row, i) =>
          row.map((v, j) => {
            const key = `${i}-${j}`;
            const cls = ZEROED[step].has(key)
              ? "text-emerald-400 font-bold"
              : CHANGED[step].has(key)
                ? "text-amber-300"
                : "";
            return (
              <span key={key} className={`text-center ${cls}`}>
                {v}
              </span>
            );
          })
        )}
      </div>
      <p className="mt-1 text-xs opacity-80">{CAPTIONS[step]}</p>
    </div>
  );
}
