/** Konzept-Tooltip: Kovarianzmatrix. */
import { useState } from "react";
import { M, Slider } from "../../lib";

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

export function CovScatterWidget() {
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
