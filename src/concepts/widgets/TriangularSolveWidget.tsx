/**
 * Konzept-Widget `triangular-solve` (Rückwärtssubstitution).
 *
 * DIE EINE EINSICHT: Ein Dreieckssystem löst sich Zeile für Zeile auf, weil
 * jede Zeile genau eine neue Unbekannte mitbringt. Es ist kein Verfahren mit
 * Tricks, sondern reines Einsetzen.
 *
 * FARBROLLEN: keine Rollenfarben – das Widget zeigt Formeln und Schritte, die
 * Zustandsfarbe steckt allein im Verdikt.
 *
 * PROVENIENZ: das 3×3-Beispielsystem und der Schrittaufbau aus der Vorfassung
 * (Stand 2026-08-20); der Operationszähler im Verdikt und diese Kopfzeile sind
 * neu.
 *
 * Es ist eine Formeltafel, kein Koordinatenbild; Achsen mit Ticks gäbe es hier
 * nichts zu beschriften.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * für U = [[2,1,1],[0,3,−1],[0,0,2]] und b = (7 | 3 | 6) liefert die
 * Rückwärtssubstitution x₃ = 3, x₂ = 2, x₁ = 1, also x = (1 | 2 | 3) exakt.
 * Der Aufwand ist n(n−1) Multiplikationen und Subtraktionen plus n Divisionen,
 * für n = 3 also 9 Operationen — Größenordnung n².
 */
import { useState } from "react";
import { Aufgabe, MD, Stepper, Verdikt, W_MUTED } from "../../lib";

const SCHRITTE = [
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
  const [schritt, setSchritt] = useState(0);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Gehen wir von der untersten Gleichung schrittweise nach oben.</Aufgabe>
      <MD>
        {"\\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 3 & -1 \\\\ 0 & 0 & 2 \\end{bmatrix} " +
          "\\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = " +
          "\\begin{bmatrix} 7 \\\\ 3 \\\\ 6 \\end{bmatrix}"}
      </MD>
      {SCHRITTE.slice(0, schritt).map((s, i) => (
        <div key={i} className="mt-1">
          <span className={`text-xs ${W_MUTED}`}>{s.text}</span>
          <MD>{s.math}</MD>
        </div>
      ))}
      <Stepper
        step={schritt}
        setStep={setSchritt}
        max={3}
        narration={schritt ? SCHRITTE[schritt - 1].text : "Ausgangssystem"}
      />
      <Verdikt kind={schritt === 3 ? "ok" : "neutral"}>
        {schritt === 0 ? (
          <>
            Noch ist nichts eingesetzt. Die dritte Zeile ist der Einstieg: sie enthält als einzige
            nur eine Unbekannte.
          </>
        ) : schritt === 3 ? (
          <>
            x = (1, 2, 3), und keine Zeile musste dafür umgeformt werden. Für n Unbekannte kostet
            das n(n−1) Multiplikationen und Subtraktionen plus n Divisionen, hier also 9
            Operationen – Größenordnung n², gegenüber n³/3 für die Elimination, die erst zur
            Dreiecksform führt.
          </>
        ) : (
          <>
            {schritt} von 3 Unbekannten stehen fest. Jeder Schritt braucht nur die bereits
            bekannten Werte der Zeilen darunter, deshalb bleibt die Rechnung eine Kette ohne
            Rückgriff.
          </>
        )}
      </Verdikt>
    </div>
  );
}
