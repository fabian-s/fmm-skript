/** Konzept-Tooltip: Kovarianzmatrix. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

// Deterministic standard-normal pairs (LCG + Box-Muller), computed once.
const Z: [number, number][] = (() => {
  let s = 42;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const out: [number, number][] = [];
  for (let i = 0; i < 180; i++) {
    const u1 = Math.max(rnd(), 1e-9);
    const u2 = rnd();
    const r = Math.sqrt(-2 * Math.log(u1));
    out.push([r * Math.cos(2 * Math.PI * u2), r * Math.sin(2 * Math.PI * u2)]);
  }
  return out;
})();

function CovScatterWidget() {
  const [rho, setRho] = useState(0.8);
  const w = 280;
  const h = 200;
  const scale = 32;
  // Cholesky factor of [[1, rho], [rho, 1]] applied to standard-normal z:
  const pts = Z.map(([z1, z2]) => {
    const x = z1;
    const y = rho * z1 + Math.sqrt(1 - rho * rho) * z2;
    return [w / 2 + scale * x, h / 2 - scale * y];
  });
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Korrelation ρ" value={rho} onChange={setRho} min={-0.95} max={0.95} step={0.05} />
      <svg width={w} height={h} className="rounded bg-slate-900/60">
        <line x1={0} y1={h / 2} x2={w} y2={h / 2} stroke="#475569" strokeWidth={1} />
        <line x1={w / 2} y1={0} x2={w / 2} y2={h} stroke="#475569" strokeWidth={1} />
        {pts.map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r={2.2} fill="#38bdf8" opacity={0.65} />
        ))}
      </svg>
      <p className="mt-1 text-xs opacity-80">
        180 fixe Zufallspunkte mit Kovarianzmatrix{" "}
        <M>{"\\bSigma = \\begin{pmatrix} 1 & \\rho \\\\ \\rho & 1 \\end{pmatrix}"}</M>,
        erzeugt genau wie oben beschrieben: standardnormalverteiltes Rauschen,
        multipliziert mit dem Cholesky-Faktor von <M>{"\\bSigma"}</M>. Schieben
        wir <M>{"\\rho"}</M> hin und her, kippt die Punktwolke in eine immer
        schmalere diagonale Ellipse.
      </p>
    </div>
  );
}

registerConcept({
  id: "covariance-matrix",
  title: "Kovarianzmatrix",
  body: (
    <>
      <p>
        Für einen zufälligen <ConceptLink id="vector">Vektor</ConceptLink>{" "}
        <M>{"\\bx = (x_1, \\dotsc, x_n)^\\top"}</M> ist die Kovarianzmatrix{" "}
        <M>{"\\bSigma"}</M> die <M>{"n \\times n"}</M>{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> mit Eintrag{" "}
        <M>{"\\operatorname{Cov}(x_i, x_j)"}</M> an Position{" "}
        <M>{"(i, j)"}</M> — reine Buchhaltung für die Varianzen und
        Kovarianzen aus Statistik I: Auf der Diagonalen stehen die Varianzen
        der einzelnen Koordinaten, und jeder Nebendiagonal-Eintrag hält fest,
        wie stark sich ein Koordinatenpaar gemeinsam bewegt. Ein winziges
        Beispiel:
      </p>
      <MD>
        {"\\bSigma = \\begin{pmatrix} 1 & 0.8 \\\\ 0.8 & 1 \\end{pmatrix}"}
      </MD>
      <p>
        besagt: Beide Koordinaten haben Varianz <M>{"1"}</M> und sind stark
        positiv gekoppelt. Wegen{" "}
        <M>{"\\operatorname{Cov}(x_i, x_j) = \\operatorname{Cov}(x_j, x_i)"}</M>{" "}
        ist <M>{"\\bSigma"}</M> stets{" "}
        <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink>, und weil{" "}
        <M>{"\\ba^\\top \\bSigma\\, \\ba = \\operatorname{Var}(\\ba^\\top \\bx) \\geq 0"}</M>{" "}
        für jedes <M>{"\\ba"}</M> gilt, ist sie außerdem{" "}
        <ConceptLink id="positive-definite">positiv semidefinit</ConceptLink>{" "}
        (positiv definit, außer die Verteilung ist in eine
        niedrigerdimensionale Ebene plattgedrückt). Das ist genau, was die
        Cholesky-Zerlegung braucht (vgl. MML §4.3): Wir faktorisieren{" "}
        <M>{"\\bSigma = \\bL\\bL^\\top"}</M>, schicken billiges unabhängiges
        standardnormalverteiltes Rauschen <M>{"\\bz"}</M> durch{" "}
        <M>{"\\bL"}</M>, und <M>{"\\bL\\bz"}</M> hat exakt die Kovarianz{" "}
        <M>{"\\bSigma"}</M> — der Standardweg, um aus einer multivariaten
        Normalverteilung zu ziehen.
      </p>
      <CovScatterWidget />
    </>
  ),
});
