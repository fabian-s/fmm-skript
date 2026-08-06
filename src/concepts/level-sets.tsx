/**
 * Concept tooltip: Niveaumengen (Höhenlinien) einer Funktion mehrerer
 * Variablen.
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function LevelSetWidget() {
  const [lam, setLam] = useState(1);
  const [th, setTh] = useState(0.9);
  const W = 260;
  const H = 260;
  const S = W / 4.4; // isotropic px per world unit, so right angles stay right
  const cx = W / 2;
  const cy = H / 2;
  const X = (x: number) => cx + x * S;
  const Y = (y: number) => cy - y * S;
  // f(x1,x2) = 0.5(x1^2 + lam x2^2); contour f = L is an ellipse
  const levels = [0.2, 0.5, 0.9];
  const ax = (L: number) => Math.sqrt(2 * L);
  const ay = (L: number) => Math.sqrt((2 * L) / lam);
  // movable point on the middle contour
  const L0 = 0.5;
  const px = ax(L0) * Math.cos(th);
  const py = ay(L0) * Math.sin(th);
  const g: [number, number] = [px, lam * py]; // gradient at p
  const ng = Math.hypot(...g) || 1;
  const u: [number, number] = [(g[0] / ng) * 0.55, (g[1] / ng) * 0.55];
  const t: [number, number] = [-u[1], u[0]]; // tangent direction (⊥ gradient)
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="flex flex-wrap gap-x-6">
        <div className="w-44">
          <Slider label="Streckung λ" value={lam} onChange={setLam} min={0.4} max={2.5} step={0.05} />
        </div>
        <div className="w-44">
          <Slider label="Punktposition θ" value={th} onChange={setTh} min={0} max={6.28} step={0.02} />
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="max-w-full rounded border border-slate-500 bg-white"
      >
        <line x1={0} y1={cy} x2={W} y2={cy} stroke="#94a3b8" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={H} stroke="#94a3b8" strokeWidth={1} />
        {[-2, -1, 1, 2].map((v) => (
          <g key={v}>
            <text x={X(v)} y={cy + 12} fontSize={9} fill="#64748b" textAnchor="middle">
              {v}
            </text>
            <text x={cx - 4} y={Y(v) + 3} fontSize={9} fill="#64748b" textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        <text x={W - 10} y={cy - 5} fontSize={10} fill="#64748b" textAnchor="end">
          x₁
        </text>
        <text x={cx + 5} y={11} fontSize={10} fill="#64748b">
          x₂
        </text>
        {levels.map((L) => (
          <ellipse
            key={L}
            cx={cx}
            cy={cy}
            rx={ax(L) * S}
            ry={ay(L) * S}
            fill="none"
            stroke={L === L0 ? "#0284c7" : "#64748b"}
            strokeWidth={L === L0 ? 2 : 1}
            opacity={L === L0 ? 1 : 0.55}
          />
        ))}
        {/* tangent segment at p */}
        <line
          x1={X(px - t[0])}
          y1={Y(py - t[1])}
          x2={X(px + t[0])}
          y2={Y(py + t[1])}
          stroke="#059669"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {/* gradient arrow at p */}
        <line x1={X(px)} y1={Y(py)} x2={X(px + u[0])} y2={Y(py + u[1])} stroke="#dc2626" strokeWidth={2} />
        <circle cx={X(px + u[0])} cy={Y(py + u[1])} r={2.5} fill="#dc2626" />
        <circle cx={X(px)} cy={Y(py)} r={3.5} fill="#0284c7" />
      </svg>
      <p className="mt-1 text-xs">
        Punkt <M>{`(${px.toFixed(2)}, ${py.toFixed(2)})`}</M> auf der Höhenlinie{" "}
        <M>{`f = ${L0}`}</M>; der Gradient{" "}
        <M>{`\\nabla f = (${g[0].toFixed(2)}, ${g[1].toFixed(2)})`}</M> (rot)
        steht immer senkrecht auf der Höhenlinie (gestrichelte Tangente), für
        jedes λ und θ.
      </p>
    </div>
  );
}

registerConcept({
  id: "level-sets",
  title: "Niveaumengen (Höhenlinien)",
  body: (
    <>
      <p>
        Denken wir an eine topografische Wanderkarte: Kurven verbinden alle
        Punkte gleicher Höhe. Für eine Funktion{" "}
        <M>{"f\\colon \\R^2 \\to \\R"}</M> gilt dasselbe Bild: die{" "}
        <em>Niveaumenge</em> (level set) zur Höhe <M>{"c"}</M> sammelt alle
        Eingaben, an denen <M>{"f"}</M> genau diesen Wert annimmt:
      </p>
      <MD>{"\\{\\, \\bx \\in \\R^n : f(\\bx) = c \\,\\}."}</MD>
      <p>
        In zwei Dimensionen sind das Kurven (Höhenlinien, contour lines), in{" "}
        <M>{"n"}</M> Dimensionen Flächen. Zeichnen wir verschachtelte
        Höhenlinien für mehrere Werte von <M>{"c"}</M>, wird die Gestalt einer
        Funktion auf einen Blick sichtbar: Eng beieinander liegende Linien
        bedeuten steiles Gelände, weit auseinander liegende flaches, und
        kleine geschlossene Schleifen umschließen ein Minimum oder Maximum.
      </p>
      <p>
        Für die Optimierung sind zwei Fakten wichtig. Erstens: Der{" "}
        <ConceptLink id="gradient">Gradient</ConceptLink>{" "}
        <M>{"\\nabla f(\\bx)"}</M> steht senkrecht auf der Niveaumenge durch{" "}
        <M>{"\\bx"}</M> und zeigt in Richtung größerer Werte von <M>{"f"}</M>;{" "}
        <M>{"-\\nabla f"}</M> ist also lokal der steilste Weg bergab. Zweitens:
        Nahe einem Minimum sehen die Höhenlinien einer glatten Funktion aus wie
        verschachtelte Ellipsen, deren Form die Hesse-Matrix bestimmt. Stark
        gestreckte Ellipsen signalisieren ein schlecht konditioniertes Problem.
      </p>
      <LevelSetWidget />
    </>
  ),
});
