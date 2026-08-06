import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function EigenWidget() {
  const [deg, setDeg] = useState(20);
  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [Math.cos(th), Math.sin(th)];
  // A = [[2,1],[1,2]]: eigenvalues 3 (dir 45°) and 1 (dir 135°)
  const Av: [number, number] = [2 * v[0] + v[1], v[0] + 2 * v[1]];
  const cross = v[0] * Av[1] - v[1] * Av[0];
  const aligned = Math.abs(cross) < 0.04;
  const lam = v[0] * Av[0] + v[1] * Av[1]; // v·Av since |v| = 1
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Richtung von v (Grad)" value={deg} onChange={setDeg} min={0} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        A v = ({Av[0].toFixed(2)}, {Av[1].toFixed(2)})ᵀ
        {aligned ? `, parallel! Eigenvektor mit λ ≈ ${lam.toFixed(2)}` : ", nicht parallel zu v"}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [2, 1],
          [1, 2],
        ]}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "A v" },
        ]}
        size={240}
        worldHalf={3.2}
      />
      <p className="mt-1 text-xs opacity-80">
        Drehen wir <M>{"\\bv"}</M>, bis der blaue Pfeil auf dem roten liegt:
        Bei 45° finden wir <M>{"\\lambda = 3"}</M>, bei 135° finden wir{" "}
        <M>{"\\lambda = 1"}</M>. Jede andere Richtung wird von der Abbildung
        aus ihrer Linie gekippt.
      </p>
    </div>
  );
}

registerConcept({
  id: "eigenvalue-eigenvector",
  title: "Eigenwerte und Eigenvektoren",
  body: (
    <>
      <p>
        Die meisten Vektoren ändern ihre Richtung, wenn eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> sie
        multipliziert. Ein <em>Eigenvektor</em> ist ein spezieller Vektor
        ungleich null, dessen Richtung erhalten bleibt: Das{" "}
        <ConceptLink id="matrix-vector-product">Produkt</ConceptLink>{" "}
        <M>{"\\bA\\bv"}</M> ist einfach ein{" "}
        <ConceptLink id="scalar">skalares</ConceptLink> Vielfaches von{" "}
        <M>{"\\bv"}</M> selbst,
      </p>
      <MD>{"\\bA\\bv = \\lambda \\bv, \\qquad \\bv \\neq \\bzero,"}</MD>
      <p>
        und der Streckungsfaktor <M>{"\\lambda"}</M> ist der zugehörige{" "}
        <em>Eigenwert</em>. Kleines Beispiel: Für{" "}
        <M>{"\\bA = \\begin{pmatrix}2 & 1\\\\ 1 & 2\\end{pmatrix}"}</M> wird
        der Vektor <M>{"(1,1)^T"}</M> auf <M>{"(3,3)^T"}</M> abgebildet (also
        ein Eigenvektor mit <M>{"\\lambda = 3"}</M>), während{" "}
        <M>{"(1,-1)^T"}</M> auf sich selbst abgebildet wird (
        <M>{"\\lambda = 1"}</M>).
      </p>
      <p>
        Für eine{" "}
        <ConceptLink id="symmetric-matrix">symmetrische Matrix</ConceptLink>{" "}
        sind die Eigenwerte reell, und die Eigenvektoren lassen sich als{" "}
        <ConceptLink id="orthonormal-basis">Orthonormalbasis</ConceptLink>{" "}
        wählen. Deshalb verbinden die Eigenwerte von <M>{"\\bA^T\\bA"}</M> das
        Kleinste-Quadrate-Problem mit der Singulärwertzerlegung. Bemerkenswert:
        Die Orthonormalbasen aus der QR-Zerlegung stecken auch in den
        Algorithmen, die Eigenwerte überhaupt erst berechnen (vgl. Heath
        §3.4.5).
      </p>
      <EigenWidget />
    </>
  ),
});
