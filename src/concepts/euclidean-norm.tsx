import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/**
 * Unit "circles" of the 1-, 2-, and ∞-norms as an SVG, with a movable point
 * whose three norm values are printed live.
 */
function NormBallsWidget() {
  const [x1, setX1] = useState(0.9);
  const [x2, setX2] = useState(0.6);
  const n1 = Math.abs(x1) + Math.abs(x2);
  const n2 = Math.hypot(x1, x2);
  const nInf = Math.max(Math.abs(x1), Math.abs(x2));
  const size = 250;
  const half = 1.7; // world half-width
  const px = (w: number) => ((w + half) / (2 * half)) * size;
  const py = (w: number) => size - ((w + half) / (2 * half)) * size;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={x1} onChange={setX1} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-1.5} max={1.5} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        <span className="text-amber-300">‖x‖₁ = {n1.toFixed(2)}</span>{"  "}
        <span className="text-sky-300">‖x‖₂ = {n2.toFixed(2)}</span>{"  "}
        <span className="text-pink-300">‖x‖∞ = {nInf.toFixed(2)}</span>
      </p>
      <svg width={size} height={size} className="rounded bg-slate-800">
        {/* axes */}
        <line x1={0} y1={py(0)} x2={size} y2={py(0)} stroke="#64748b" strokeWidth={1} />
        <line x1={px(0)} y1={0} x2={px(0)} y2={size} stroke="#64748b" strokeWidth={1} />
        <text x={size - 14} y={py(0) - 4} fill="#cbd5e1" fontSize={11}>
          x₁
        </text>
        <text x={px(0) + 5} y={12} fill="#cbd5e1" fontSize={11}>
          x₂
        </text>
        {/* unit balls: all points with norm exactly 1 */}
        <polygon
          points={`${px(1)},${py(0)} ${px(0)},${py(1)} ${px(-1)},${py(0)} ${px(0)},${py(-1)}`}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={1.5}
        />
        <circle cx={px(0)} cy={py(0)} r={px(1) - px(0)} fill="none" stroke="#38bdf8" strokeWidth={1.5} />
        <rect
          x={px(-1)}
          y={py(1)}
          width={px(1) - px(-1)}
          height={py(-1) - py(1)}
          fill="none"
          stroke="#f472b6"
          strokeWidth={1.5}
        />
        {/* the point */}
        <line x1={px(0)} y1={py(0)} x2={px(x1)} y2={py(x2)} stroke="#e2e8f0" strokeWidth={1.5} />
        <circle cx={px(x1)} cy={py(x2)} r={4} fill="#e2e8f0" />
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        Jede Kurve sammelt alle Punkte der „Länge 1" in einer Norm:
        Raute = 1-Norm, Kreis = 2-Norm, Quadrat = ∞-Norm. Bewegen wir den
        Punkt, sehen wir die drei Längen auseinanderlaufen (nur auf den Achsen
        stimmen sie überein).
      </p>
    </div>
  );
}

registerConcept({
  id: "euclidean-norm",
  title: "Euklidische Norm (2-Norm)",
  body: (
    <>
      <p>
        Eine Norm ordnet einem{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> eine einzelne
        nichtnegative Zahl zu, die misst, wie „groß" er ist. Die{" "}
        <em>euklidische Norm</em> (engl. <em>Euclidean norm</em>), geschrieben{" "}
        <M>{"\\|\\bx\\|_2"}</M>, ist die gewöhnliche geometrische Länge aus dem
        Satz des Pythagoras, erweitert auf <M>{"n"}</M> Komponenten:
      </p>
      <MD>{"\\|\\bx\\|_2 = \\sqrt{x_1^2 + x_2^2 + \\cdots + x_n^2} = \\sqrt{\\bx^T \\bx} ."}</MD>
      <p>
        Zum Beispiel hat <M>{"\\bx = [3, 4]^T"}</M> die Norm{" "}
        <M>{"\\|\\bx\\|_2 = \\sqrt{9 + 16} = 5"}</M>. Der letzte Ausdruck zeigt
        die besondere Verbindung zum{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink>: Das Quadrat
        der 2-Norm ist einfach <M>{"\\bx^T\\bx"}</M>. Deshalb ist das
        Minimieren einer Summe quadrierter Residuen genau das Minimieren einer
        2-Norm. Es gibt auch andere Normen, die manchmal natürlicher sind: Die
        1-Norm <M>{"\\|\\bx\\|_1 = \\sum_i |x_i|"}</M> addiert Absolutbeträge,
        und die ∞-Norm <M>{"\\|\\bx\\|_\\infty = \\max_i |x_i|"}</M> nimmt nur
        die betragsgrößte Komponente. Welche Norm wir wählen, ändert, was
        „beste Anpassung" bedeutet; die Kleinste-Quadrate-Methode ist per
        Definition die Wahl der 2-Norm.
      </p>
      <NormBallsWidget />
    </>
  ),
});
