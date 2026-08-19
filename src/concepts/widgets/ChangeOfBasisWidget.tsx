/**
 * Konzept-Widget `change-of-basis`.
 *
 * DIE EINE EINSICHT: Beim Basiswechsel bewegt sich nichts — der Pfeil bleibt,
 * wo er ist, nur das Lineal darunter dreht sich. Deshalb ändern sich die
 * Koordinaten, nicht aber die Länge des Vektors.
 *
 * FARBROLLEN: blau = die neue Basis b₁, b₂ und ihr Koordinatengitter;
 * rot = der Vektor x, den wir ziehen; orange = seine Koordinaten in der neuen
 * Basis (die Strecken entlang b₁ und b₂).
 *
 * PROVENIENZ: Aufbau aus dem Vorgängerwidget (Stand 2026-08-18); das
 * mitgedrehte Gitter zeichnet jetzt die Lib-`TransformCanvas` (Matrix = die
 * Basismatrix S), Ziehen und Achsen ebenfalls. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeB.mjs,
 * 2026-08-19), x = (2, 1) an einer gedrehten Orthonormalbasis gemessen:
 *   θ = 0        → (2,0000; 1,0000)
 *   θ = 0,4636   → (2,2361; 0,0000)   (b₁ zeigt genau auf x)
 *   θ = 0,5      → (2,2346; −0,0813)
 *   θ = 1,0      → (1,9221; −1,1426)
 * In allen Fällen ist c₁² + c₂² = 5,000000 = ‖x‖², und ‖x‖ = √5 = 2,236068.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

export function BasisWidget() {
  const [th, setTh] = useState(0.5);
  const [x, setX] = useState<[number, number]>([2, 1]);

  const c = Math.cos(th);
  const s = Math.sin(th);
  const b1: [number, number] = [c, s];
  const b2: [number, number] = [-s, c];
  // Orthonormale Basis: die Koordinaten sind einfach die Skalarprodukte.
  const c1 = x[0] * b1[0] + x[1] * b1[1];
  const c2 = x[0] * b2[0] + x[1] * b2[1];
  const laenge = Math.hypot(x[0], x[1]);
  const aufB1 = Math.abs(c2) < 0.05;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Drehen wir die Basis, bis x nur noch eine Koordinate hat.</Aufgabe>
      <TransformCanvas
        matrix={[
          [c, -s],
          [s, c],
        ]}
        showGrid
        showUnitCircle={false}
        size={280}
        worldHalf={3}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v: b1, color: FMM_COLORS.blau, label: "b₁" },
          { v: b2, color: FMM_COLORS.blau, label: "b₂" },
          { v: x, color: FMM_COLORS.rot, label: "x", draggable: true },
        ]}
        onVectorChange={(_i, v) => setX([v[0], v[1]])}
        overlay={(toPx) => {
          const [x0, y0] = toPx(0, 0);
          const [xa, ya] = toPx(c1 * b1[0], c1 * b1[1]);
          const [xb, yb] = toPx(x[0], x[1]);
          return (
            <g pointerEvents="none">
              <line x1={x0} y1={y0} x2={xa} y2={ya} stroke={FMM_COLORS.orange} strokeWidth={3.5} strokeOpacity={0.85} />
              <line x1={xa} y1={ya} x2={xb} y2={yb} stroke={FMM_COLORS.orange} strokeWidth={3.5} strokeOpacity={0.85} />
            </g>
          );
        }}
        ariaLabel={`Der Vektor x mit dem mitgedrehten Koordinatengitter der Basis b₁, b₂; seine Koordinaten sind ${fmtDe(c1, 2)} und ${fmtDe(c2, 2)}.`}
      />
      <Slider label="Basis drehen: θ" value={th} onChange={setTh} min={0} max={1.5} step={0.01} accent={FMM_COLORS.blau} />
      <Slider label="x₁" value={x[0]} onChange={(v) => setX([v, x[1]])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="x₂" value={x[1]} onChange={(v) => setX([x[0], v])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> neue Basis und ihr Gitter ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> x ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Weg entlang b₁, dann b₂
      </p>
      <Verdikt kind={aufB1 ? "ok" : "neutral"}>
        In der Standardbasis heißt der Pfeil ({fmtDe(x[0], 2)}; {fmtDe(x[1], 2)}), in der neuen
        Basis ({fmtDe(c1, 2)}; {fmtDe(c2, 2)}). Zwei Etiketten, ein Pfeil: seine Länge bleibt{" "}
        {fmtDe(laenge, 3)}, denn c₁² + c₂² = ‖x‖².{" "}
        {aufB1
          ? "Gerade zeigt b₁ genau in Richtung x, deshalb steckt alles in der ersten Koordinate."
          : ""}
      </Verdikt>
    </div>
  );
}
