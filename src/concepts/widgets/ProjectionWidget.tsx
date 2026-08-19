/**
 * Konzept-Widget `projection`.
 *
 * DIE EINE EINSICHT: Projizieren heißt, den Anteil senkrecht zur Geraden
 * wegzuwerfen. Was übrig bleibt, ist der nächstgelegene Punkt der Geraden —
 * und ein zweites Mal Wegwerfen ändert daran nichts mehr: P² = P.
 *
 * FARBROLLEN: blau = die Gerade, auf die projiziert wird (und ihr
 * Richtungsvektor b); rot = der Punkt x, den wir ziehen; orange = sein
 * Lotfußpunkt Px samt Lot und rechtem Winkel.
 *
 * PROVENIENZ: Aufbau und die Matrix P = bbᵀ aus dem Vorgängerwidget (Stand
 * 2026-08-18, dort noch `ProjectionWidget` genannt — umbenannt wegen der
 * Namenskollision mit dem Widget zu den Normalengleichungen); Achsen, Ziehen
 * und die Gerade kommen aus der Lib-`TransformCanvas`. Texte neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeB.mjs,
 * 2026-08-19), P = bbᵀ mit b = (cos θ, sin θ), x = (2; 1,4):
 *   θ = 0,5   → Px = (2,1293; 1,1633)
 *   θ = 0     → Px = (2; 0)      (die zweite Koordinate wird verworfen)
 *   θ = π/2   → Px = (0; 1,4)
 * In allen drei Fällen ist P(Px) − Px exakt 0 (P ist idempotent), das Residuum
 * x − Px steht auf b senkrecht (Skalarprodukt ≤ 1,5e−16), det P = 0 und
 * tr P = 1,000000 — die Ebene wird auf eine Gerade, also auf Dimension 1,
 * zusammengedrückt.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, TransformCanvas, Verdikt, fmtDe } from "../../lib";

export function ProjektionsmatrixWidget() {
  const [theta, setTheta] = useState(0.5);
  const [x, setX] = useState<[number, number]>([2, 1.4]);

  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const P: [[number, number], [number, number]] = [
    [c * c, c * s],
    [c * s, s * s],
  ];
  const px: [number, number] = [P[0][0] * x[0] + P[0][1] * x[1], P[1][0] * x[0] + P[1][1] * x[1]];
  const rest: [number, number] = [x[0] - px[0], x[1] - px[1]];
  const abstand = Math.hypot(rest[0], rest[1]);
  const aufDerGeraden = abstand < 0.06;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir x, bis das Lot verschwindet.</Aufgabe>
      <TransformCanvas
        matrix={P}
        size={280}
        worldHalf={3.2}
        showUnitCircle={false}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v: x, color: FMM_COLORS.rot, label: "x", draggable: true },
          { v: px, color: FMM_COLORS.orange, label: "Px" },
        ]}
        onVectorChange={(_i, v) => setX([v[0], v[1]])}
        lines={[{ dir: [c, s], color: FMM_COLORS.blau, label: "Gerade" }]}
        overlay={(toPx) => {
          const [xa, ya] = toPx(x[0], x[1]);
          const [xb, yb] = toPx(px[0], px[1]);
          if (aufDerGeraden) return null;
          // kleines Quadrat als Zeichen für den rechten Winkel am Fußpunkt
          const len = Math.hypot(xa - xb, ya - yb);
          const ex = (xa - xb) / len;
          const ey = (ya - yb) / len;
          const g = 8;
          return (
            <g pointerEvents="none">
              <line x1={xa} y1={ya} x2={xb} y2={yb} stroke={FMM_COLORS.orange} strokeWidth={1.2} strokeDasharray="4 3" />
              <path
                d={`M ${xb + ex * g} ${yb + ey * g} L ${xb + ex * g - ey * g} ${yb + ey * g + ex * g} L ${xb - ey * g} ${yb + ex * g}`}
                fill="none"
                stroke={FMM_COLORS.orange}
                strokeWidth={1}
              />
            </g>
          );
        }}
        ariaLabel={`Die Gerade mit Winkel ${fmtDe(theta, 2)} und der Punkt x mit seinem Lotfußpunkt Px im Abstand ${fmtDe(abstand, 2)}.`}
      />
      <Slider label="Winkel θ der Geraden" value={theta} onChange={setTheta} min={0} max={Math.PI} step={0.01} accent={FMM_COLORS.blau} />
      <Slider label="x₁" value={x[0]} onChange={(v) => setX([v, x[1]])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="x₂" value={x[1]} onChange={(v) => setX([x[0], v])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Gerade ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> x ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Px und das Lot
      </p>
      <Verdikt kind={aufDerGeraden ? "ok" : "neutral"}>
        {aufDerGeraden ? (
          <>
            x liegt schon auf der Geraden, deshalb ändert die Projektion nichts: Px = x. Genau das
            meint P² = P – ein zweites Mal projizieren ist wirkungslos, und der Fehler ist null.
          </>
        ) : (
          <>
            Px = ({fmtDe(px[0], 2)}; {fmtDe(px[1], 2)}), der weggeworfene Rest hat die Länge{" "}
            {fmtDe(abstand, 2)} und steht senkrecht auf der Geraden. Kein anderer Punkt der
            Geraden liegt näher an x. Das ganze Gitter wird auf diese Gerade gedrückt: det P = 0,
            tr P = 1.
          </>
        )}
      </Verdikt>
    </div>
  );
}
