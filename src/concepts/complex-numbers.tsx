import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas, maxAbsCoord } from "../lib";

function ComplexPlaneWidget() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const z: [number, number] = [a, b];
  const iz: [number, number] = [-b, a]; // i(a+bi) = -b + ai
  const zbar: [number, number] = [a, -b];
  const mod = Math.hypot(a, b);
  const half = Math.max(2.2, maxAbsCoord(z, iz, zbar) * 1.25);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Re z = a" value={a} onChange={setA} min={-2.5} max={2.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="Im z = b" value={b} onChange={setB} min={-2.5} max={2.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="my-1 font-mono text-xs">
        z = {a.toFixed(1)} {b < 0 ? "−" : "+"} {Math.abs(b).toFixed(1)}i, |z| = {mod.toFixed(2)}, z̄ ={" "}
        {a.toFixed(1)} {b < 0 ? "+" : "−"} {Math.abs(b).toFixed(1)}i
      </div>
      <LabeledTransformCanvas
        xLabel="Re"
        yLabel="Im"
        tickClass="text-slate-300"
        matrix={[
          [0, -1],
          [1, 0],
        ]}
        vectors={[
          { v: z, color: "#dc2626", label: "z" },
          { v: iz, color: "#0284c7", label: "i·z" },
          { v: zbar, color: "#d97706", label: "z̄" },
        ]}
        size={240}
        worldHalf={half}
      />
      <p className="mt-1 text-xs opacity-80">
        Das gezeigte Gitter ist die Ebene nach Multiplikation mit{" "}
        <M>{"i"}</M>: eine Vierteldrehung gegen den Uhrzeigersinn. Der blaue
        Pfeil <M>{"i \\cdot z"}</M> ist immer der um 90° gedrehte rote Pfeil,
        und die Konjugierte <M>{"\\bar{z}"}</M> (orange) ist sein Spiegelbild
        an der reellen Achse.
      </p>
    </div>
  );
}

registerConcept({
  id: "complex-numbers",
  title: "Komplexe Zahlen",
  body: (
    <>
      <p>
        Keine reelle Zahl hat das Quadrat <M>{"-1"}</M>. Deshalb wurde ein
        neues Symbol <M>{"i"}</M> eingeführt, die <em>imaginäre Einheit</em>,
        mit der einzigen Regel <M>{"i^2 = -1"}</M>. Eine <em>komplexe Zahl</em>{" "}
        kombiniert sie mit zwei gewöhnlichen reellen Zahlen,
      </p>
      <MD>{"z = a + b i, \\qquad a, b \\in \\R,"}</MD>
      <p>
        wobei <M>{"a"}</M> der <em>Realteil</em> und <M>{"b"}</M> der{" "}
        <em>Imaginärteil</em> ist. Wir können uns <M>{"z"}</M> als den Punkt{" "}
        <M>{"(a, b)"}</M> in einer Ebene vorstellen, der{" "}
        <em>komplexen Zahlenebene</em>. Eine komplexe Zahl ist also im
        Wesentlichen ein 2D-<ConceptLink id="vector">Vektor</ConceptLink>, den
        wir zusätzlich multiplizieren können: zum Beispiel{" "}
        <M>{"(1 + 2i)(3 + i) = 3 + i + 6i + 2i^2 = 1 + 7i"}</M>. Ihre Länge ist
        der <em>Betrag</em> <M>{"|z| = \\sqrt{a^2 + b^2}"}</M>, und ein
        Vorzeichenwechsel im Imaginärteil liefert die <em>Konjugierte</em>{" "}
        <M>{"\\bar{z} = a - b i"}</M>, mit der praktischen Identität{" "}
        <M>{"z \\bar{z} = |z|^2"}</M>.
      </p>
      <p>
        Warum interessiert uns das in einem Kurs über Matrizen? Weil eine
        reelle Matrix komplexe Eigenwerte haben kann: das charakteristische
        Polynom hat vielleicht keine reellen{" "}
        <ConceptLink id="polynomial-roots">Nullstellen</ConceptLink>, aber
        immer komplexe, und bei reellen Matrizen treten sie in konjugierten
        Paaren <M>{"a \\pm b i"}</M> auf. Komplexe Eigenwerte signalisieren
        Drehung oder Schwingung; genau deshalb funktioniert der harmonische
        Ansatz <M>{"e^{i\\omega t}"}</M> (vgl. Heath Bsp. 4.1).
      </p>
      <ComplexPlaneWidget />
    </>
  ),
});
