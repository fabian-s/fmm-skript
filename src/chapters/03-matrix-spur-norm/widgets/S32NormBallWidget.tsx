import { useState } from "react";
import { M, Slider } from "../../../lib";

/**
 * Einheitskugel-Auffrischung: p-Norm-Einheitskugeln in R^2, stufenlos über p
 * gemorpht, mit Norm-Ablesung als Skalierungsfaktor.
 * SVG-/Berechnungscode recycelt aus der internen heath-ch2-App (S23.tsx);
 * Beschriftungen und Begleittexte eigenständig formuliert.
 */

/** p-Norm eines 2-Vektors; p = Infinity liefert die Maximumsnorm. */
function pNorm2d(x: number, y: number, p: number): number {
  if (!Number.isFinite(p)) return Math.max(Math.abs(x), Math.abs(y));
  return Math.pow(Math.pow(Math.abs(x), p) + Math.pow(Math.abs(y), p), 1 / p);
}

/** Polygon-Punkte für die Kurve {x : ||x||_p = scale} in Pixelkoordinaten. */
function ballPoints(
  pEff: number,
  scale: number,
  px: (x: number) => number,
  py: (y: number) => number
): string {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (2 * Math.PI * i) / 240;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const r = scale / pNorm2d(c, s, pEff);
    pts.push(`${px(r * c).toFixed(1)},${py(r * s).toFixed(1)}`);
  }
  return pts.join(" ");
}

/** Deutsche Dezimaldarstellung für MathJax-Strings: 1.25 -> "1{,}25". */
const de = (v: number, d = 2) => v.toFixed(d).replace(".", "{,}");

// FMM-Palette (passend zu den \cb*-Makros):
const BLUE = "#0072B2"; // Einheitskugel
const ORANGE = "#E69F00"; // skalierte Kugel
const RED = "#D55E00"; // Vektor x

export function S32NormBallWidget() {
  const [p, setP] = useState(2);
  const [inf, setInf] = useState(false);
  const [x1, setX1] = useState(-1.6);
  const [x2, setX2] = useState(1.2);
  const pEff = inf ? Infinity : p;
  const nx = pNorm2d(x1, x2, pEff);

  const size = 340;
  const half = 3;
  const sc = size / (2 * half);
  const px = (x: number) => size / 2 + x * sc;
  const py = (y: number) => size / 2 - y * sc;
  const pLabel = inf ? "\\infty" : de(p);

  return (
    <div className="text-sm">
      <p className="mb-2">
        Der Regler bewegt den Exponenten <M>{"p"}</M> stufenlos: Die Einheitskugel{" "}
        <M>{"\\{\\bx \\in \\R^2 : \\|\\bx\\|_p = 1\\}"}</M> verformt sich dabei von der Raute (
        <M>{"p = 1"}</M>) über den Kreis (<M>{"p = 2"}</M>) in Richtung Quadrat; das Kästchen
        springt direkt zu <M>{"p = \\infty"}</M>. Die gestrichelte Kurve ist die Einheitskugel,
        skaliert mit dem Faktor <M>{"\\|\\bx\\|_p"}</M>: Sie läuft immer exakt durch die Spitze
        des roten Vektors. Das ist gemeint, wenn wir sagen: „die Norm ist der Aufblähfaktor der
        Einheitskugel".
      </p>
      <Slider label="p" value={p} onChange={setP} min={0.5} max={6} step={0.05} />
      <label className="my-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={inf}
          onChange={(e) => setInf(e.target.checked)}
          className="accent-sky-600"
        />
        <span>
          <M>{"p = \\infty"}</M> verwenden (übersteuert den Regler)
        </span>
      </label>
      <Slider label="x₁" value={x1} onChange={setX1} min={-2} max={2} step={0.05} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-2} max={2} step={0.05} />
      <div className="my-2 flex flex-wrap items-start gap-4">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <defs>
            <marker
              id="s32-ub-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={RED} />
            </marker>
          </defs>
          <line x1={px(-half)} y1={py(0)} x2={px(half)} y2={py(0)} stroke="#cbd5e1" />
          <line x1={px(0)} y1={py(-half)} x2={px(0)} y2={py(half)} stroke="#cbd5e1" />
          {[-2, -1, 1, 2].map((t) => (
            <g key={`ubt${t}`}>
              <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="#94a3b8" />
              <line x1={px(0) - 3} y1={py(t)} x2={px(0) + 3} y2={py(t)} stroke="#94a3b8" />
            </g>
          ))}
          <text x={px(1)} y={py(0) + 14} fontSize="10" fill="#64748b" textAnchor="middle">
            1
          </text>
          <text x={px(2)} y={py(0) + 14} fontSize="10" fill="#64748b" textAnchor="middle">
            2
          </text>
          <text x={px(0) + 6} y={py(1) + 4} fontSize="10" fill="#64748b">
            1
          </text>
          <text x={px(half) - 16} y={py(0) - 6} fontSize="11" fill="#64748b" fontStyle="italic">
            x₁
          </text>
          <text x={px(0) + 6} y={py(half) + 12} fontSize="11" fill="#64748b" fontStyle="italic">
            x₂
          </text>
          <polygon
            points={ballPoints(pEff, 1, px, py)}
            fill="none"
            stroke={BLUE}
            strokeWidth="2"
          />
          {nx > 1e-9 && (
            <polygon
              points={ballPoints(pEff, nx, px, py)}
              fill="none"
              stroke={ORANGE}
              strokeWidth="1.6"
              strokeDasharray="5 4"
            />
          )}
          <line
            x1={px(0)}
            y1={py(0)}
            x2={px(x1)}
            y2={py(x2)}
            stroke={RED}
            strokeWidth="2.2"
            markerEnd="url(#s32-ub-arrow)"
          />
        </svg>
        <div className="min-w-52">
          <p className="mb-1">
            <M>{`p = ${pLabel}`}</M>
          </p>
          <p className="mb-1">
            <M>{`\\|\\bx\\|_{${pLabel}} = ${de(nx, 3)}`}</M>
          </p>
          <p className="mb-1 text-slate-500">
            durchgezogen (blau): Einheitskugel; gestrichelt (orange): Einheitskugel skaliert mit{" "}
            <M>{"\\|\\bx\\|_p"}</M>; rot: der Vektor <M>{"\\bx"}</M>
          </p>
          {!inf && p < 1 && (
            <p className="mt-2 font-medium text-rose-600 dark:text-rose-400">
              Vorsicht: Für <M>{"p < 1"}</M> beult sich die „Kugel" nach innen. Sie ist nicht
              mehr konvex, und die Dreiecksungleichung geht verloren. Hier etwa{" "}
              <M>
                {`\\left\\| \\be_1 + \\be_2 \\right\\|_{${de(p)}} = 2^{1/${de(p)}} = ${de(
                  Math.pow(2, 1 / p)
                )} > 2 = \\left\\| \\be_1 \\right\\|_{${de(p)}} + \\left\\| \\be_2 \\right\\|_{${de(
                  p
                )}}`}
              </M>
              . Deshalb verlangt die Definition der <M>{"p"}</M>-Normen <M>{"p \\ge 1"}</M>.
            </p>
          )}
          {(inf || p >= 1) && (
            <p className="mt-2 text-slate-500">
              Für <M>{"p \\ge 1"}</M> ist die Kugel konvex, und diese Konvexität ist das
              geometrische Gesicht der Dreiecksungleichung.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
