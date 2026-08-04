import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Live-2x2-Cholesky: die Einträge einer symmetrischen Matrix verstellen und
 * zusehen, wie sich der Faktor L aktualisiert — oder wie die Zerlegung
 * zusammenbricht, sobald die Matrix nicht mehr positiv definit ist.
 */
function CholeskyWidget() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const l11 = Math.sqrt(Math.max(a, 0));
  const l21 = a > 0 ? b / l11 : NaN;
  const l22sq = c - (a > 0 ? (b * b) / a : NaN);
  const ok = a > 0 && l22sq > 0;
  const l22 = ok ? Math.sqrt(l22sq) : NaN;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a₁₁" value={a} onChange={setA} min={0.5} max={6} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="a₂₁ = a₁₂" value={b} onChange={setB} min={-4} max={4} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="a₂₂" value={c} onChange={setC} min={0.5} max={6} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        A = [[{a.toFixed(1)}, {b.toFixed(1)}], [{b.toFixed(1)}, {c.toFixed(1)}]]
      </p>
      {ok ? (
        <p className="my-1 font-mono text-xs text-emerald-300">
          L = [[{l11.toFixed(3)}, 0], [{l21.toFixed(3)}, {l22.toFixed(3)}]]
          {"  "}(Probe: l₂₁² + l₂₂² = {(l21 * l21 + l22 * l22).toFixed(3)} = a₂₂)
        </p>
      ) : (
        <p className="my-1 font-mono text-xs text-rose-300">
          Abbruch: l₂₂² = a₂₂ − a₂₁²/a₁₁ = {l22sq.toFixed(3)} ≤ 0 — dieses A
          ist nicht positiv definit, es gibt keine reelle Wurzel
        </p>
      )}
      <p className="mt-1 text-xs text-slate-300">
        Das Rezept für 2×2: l₁₁ = √a₁₁, l₂₁ = a₂₁/l₁₁, l₂₂ = √(a₂₂ − l₂₁²).
        Positive Definitheit ist genau das, was jede Zahl unter einer Wurzel
        positiv hält.
      </p>
    </div>
  );
}

registerConcept({
  id: "cholesky-factorization",
  title: "Cholesky-Zerlegung",
  body: (
    <>
      <p>
        Die <em>Cholesky-Zerlegung</em> (Cholesky factorization) schreibt eine{" "}
        <ConceptLink id="symmetric-matrix">symmetrische</ConceptLink>{" "}
        <ConceptLink id="positive-definite">positiv definite</ConceptLink>{" "}
        Matrix als Produkt
      </p>
      <MD>{"\\bA = \\bL\\bL^T"}</MD>
      <p>
        mit einer unteren{" "}
        <ConceptLink id="triangular-matrix">Dreiecksmatrix</ConceptLink>{" "}
        <M>{"\\bL"}</M> — eine Art &bdquo;Quadratwurzel&ldquo; der Matrix. Sie
        ist die SPD-Spezialisierung der{" "}
        <ConceptLink id="lu-decomposition">LU-Zerlegung</ConceptLink> aus der{" "}
        <ConceptLink id="gaussian-elimination">
          Gauß-Elimination
        </ConceptLink>
        : dank Symmetrie muss nur ein Faktor berechnet werden (etwa der halbe
        Aufwand und Speicher, grob <M>{"n^3/6"}</M> Multiplikationen), und
        positive Definitheit garantiert, dass der Algorithmus nie pivotisieren
        muss und nie die Wurzel aus einer negativen Zahl zieht. Ein kleines
        Beispiel:
      </p>
      <MD>
        {"\\begin{bmatrix} 4 & 2 \\\\ 2 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & 0 \\\\ 1 & \\sqrt{2} \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 0 & \\sqrt{2} \\end{bmatrix}."}
      </MD>
      <p>
        Ist <M>{"\\bL"}</M> einmal bekannt, kostet das Lösen von{" "}
        <M>{"\\bA\\bx = \\bb"}</M> nur noch zwei billige{" "}
        <ConceptLink id="triangular-solve">
          Dreieckssysteme
        </ConceptLink>
        : erst <M>{"\\bL\\by = \\bb"}</M>, dann{" "}
        <M>{"\\bL^T\\bx = \\by"}</M>. Genau so lassen sich die
        Normalgleichungen{" "}
        <M>{"\\bA^T\\bA\\,\\bx = \\bA^T\\bb"}</M> lösen — unter
        Wiederverwendung der Cholesky-Zerlegung (vgl. Heath Bsp. 2.21 und
        Bsp. 3.3).
      </p>
      <CholeskyWidget />
    </>
  ),
});
