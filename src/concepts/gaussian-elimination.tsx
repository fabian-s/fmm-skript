import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

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

function EliminationWidget() {
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

registerConcept({
  id: "gaussian-elimination",
  title: "Gauß-Elimination",
  body: (
    <>
      <p>
        Die <em>Gauß-Elimination</em> (engl. <em>Gaussian elimination</em>)
        ist die systematische Version dessen, was wir beim Lösen von
        Gleichungssystemen von Hand tun: Wir ziehen ein passendes Vielfaches
        einer Gleichung von einer anderen ab, damit eine Variable
        verschwindet. Spalte für Spalte werden Vielfache der aktuellen{" "}
        <em>Pivotzeile</em> von den Zeilen darunter abgezogen, bis unterhalb
        der Diagonale nur noch Nullen stehen und die{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> eine{" "}
        <ConceptLink id="triangular-matrix">obere Dreiecksmatrix</ConceptLink>{" "}
        ist. Danach erledigt{" "}
        <ConceptLink id="triangular-solve">Rückwärtseinsetzen</ConceptLink>{" "}
        den Rest. In der Praxis werden zusätzlich Zeilen getauscht (
        <em>Pivotisierung</em>), damit stets durch einen sicher großen Eintrag
        dividiert wird; die Division durch ein winziges Pivotelement
        verstärkt{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>.
        Notieren wir nebenbei die verwendeten Multiplikatoren, erhalten wir
        die <ConceptLink id="lu-decomposition">LU-Zerlegung</ConceptLink>{" "}
        gratis dazu.
      </p>
      <EliminationWidget />
      <p className="mt-2">
        Ein Vorbehalt ist hier wichtig. Zeilenoperationen lassen sich als
        Multiplikation mit einer regulären Matrix <M>{"\\bM"}</M> schreiben:
        Sie erhalten die <em>Lösungen</em> von <M>{"\\bA\\bx = \\bb"}</M>,
        verändern aber die{" "}
        <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink> von
        Vektoren,
      </p>
      <MD>
        {"\\|\\bM\\bv\\|_2 \\ne \\|\\bv\\|_2 \\text{ im Allgemeinen.}"}
      </MD>
      <p>
        Ein Kleinste-Quadrate-Problem verlangt aber die{" "}
        <em>kleinste Residuumsnorm</em>, nicht eine exakte Lösung; eine
        Transformation mit <M>{"\\bM"}</M> ändert deshalb im Allgemeinen,
        welches <M>{"\\bx"}</M> gewinnt (vgl. Heath §3.4.3). Darum
        triangularisiert man dort stattdessen mit{" "}
        <ConceptLink id="orthogonal-matrix">orthogonalen Matrizen</ConceptLink>
        , die die 2-Norm unangetastet lassen (vgl. Heath §3.5).
      </p>
    </>
  ),
});
