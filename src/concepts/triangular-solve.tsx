import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

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

function BackSubWidget() {
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
          x = (1, 2, 3) — von unten nach oben gelöst, eine Division pro
          Unbekannter.
        </div>
      )}
    </div>
  );
}

registerConcept({
  id: "triangular-solve",
  title: "Dreieckssystem lösen (Rückwärts-/Vorwärtseinsetzen)",
  body: (
    <>
      <p>
        Ein lineares Gleichungssystem, dessen Matrix{" "}
        <ConceptLink id="triangular-matrix">Dreiecksform</ConceptLink> hat,
        lässt sich direkt lösen, ganz ohne Eliminationsarbeit. Für ein oberes
        Dreieckssystem <M>{"\\bU\\bx = \\bb"}</M> enthält die unterste
        Gleichung nur eine einzige Unbekannte; lösen wir sie und arbeiten uns
        nach oben, steuert jede Gleichung genau eine neue Unbekannte bei.
        Dieser Durchlauf von unten nach oben heißt{" "}
        <em>Rückwärtseinsetzen</em> (engl. <em>back-substitution</em>); der
        spiegelbildliche Durchlauf von oben nach unten für ein unteres
        Dreieckssystem <M>{"\\bL\\by = \\bb"}</M> heißt{" "}
        <em>Vorwärtseinsetzen</em> (forward substitution).
      </p>
      <p>
        Die Kosten liegen bei nur etwa <M>{"n^2"}</M> Operationen für{" "}
        <M>{"n"}</M> Unbekannte — eine Größenordnung billiger als die{" "}
        <M>{"\\sim n^3/3"}</M>, die das{" "}
        <ConceptLink id="gaussian-elimination">Gaußsche Eliminationsverfahren</ConceptLink>{" "}
        zum Faktorisieren einer vollen Matrix braucht. Dieses Ungleichgewicht
        treibt die Standardstrategie der numerischen linearen Algebra an:
        Einmal zahlen, um die Matrix in Dreiecksfaktoren zu zerlegen (z.&nbsp;B.{" "}
        <ConceptLink id="lu-decomposition">LU</ConceptLink> oder{" "}
        <ConceptLink id="cholesky-factorization">Cholesky</ConceptLink>), dann
        jedes Lösen mit billigen Einsetz-Durchläufen abschließen. Bei den
        Kleinste-Quadrate-Verfahren taucht dieses Muster gleich zweimal auf
        (vgl. Heath §3.4): Die Normalengleichungs-Methode löst{" "}
        <M>{"\\bL\\by = \\bA^T \\bb"}</M> vorwärts und dann{" "}
        <M>{"\\bL^T \\bx = \\by"}</M> rückwärts, und das QR-Verfahren endet
        mit Rückwärtseinsetzen in{" "}
        <M>{"\\bR\\bx = \\bc_1"}</M>.
      </p>
      <BackSubWidget />
    </>
  ),
});
