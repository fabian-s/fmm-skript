/**
 * Konzept-Widget für `orthonormal-basis` (Triage C3: POLISH —
 * Projektionsstrecken auf q₁/q₂ einzeichnen, w ziehbar).
 *
 * DIE EINE EINSICHT: In einer Orthonormalbasis muss man kein
 * Gleichungssystem lösen. Die Koordinate zu q_i ist die Länge der Projektion
 * von w auf q_i, und die ist einfach das Skalarprodukt q_iᵀw — das gilt für
 * jede Drehung der Basis und für jedes w.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot   = das Objekt in der Hand (w, der gezogene Vektor)
 *   blau  = q₁ und die Projektionsstrecke der Länge c₁
 *   grün  = q₂ und die Projektionsstrecke der Länge c₂
 *
 * PROVENIENZ: Basisdrehung und Koeffizientenanzeige aus dem Vorgängerwidget
 * (Stand 2026-08-18); Ziehen und Achsen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C3/check-ortho.mjs,
 * 2026-08-19), w = (2, 1), ‖w‖² = 5:
 *   θ = 40° (Default): c₁ = 2,1749, c₂ = −0,5195, c₁² + c₂² = 5;
 *   θ = 26,5651°: c₂ = 0 und c₁ = ‖w‖ = 2,2361 — dort liegt w auf q₁;
 *   θ = 0°: c₁ = 2, c₂ = 1; θ = 90°: c₁ = 1, c₂ = −2;
 *   q₁ᵀq₂ = 0 in allen Fällen (auf 1e−12);
 *   die Rekonstruktion c₁q₁ + c₂q₂ trifft w auf 1e−10.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, LabeledTransformCanvas, Verdikt, fmtDe } from "../../lib";

const HALB = 2.6;

export function OrthonormalBasisWidget() {
  const [deg, setDeg] = useState(40);
  const [w, setW] = useState<[number, number]>([2, 1]);

  const th = (deg * Math.PI) / 180;
  const q1: [number, number] = [Math.cos(th), Math.sin(th)];
  const q2: [number, number] = [-Math.sin(th), Math.cos(th)];
  const c1 = w[0] * q1[0] + w[1] * q1[1];
  const c2 = w[0] * q2[0] + w[1] * q2[1];
  const nw = Math.hypot(w[0], w[1]);
  const aufQ1 = Math.abs(c2) < 0.04;
  const aufQ2 = Math.abs(c1) < 0.04;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Drehen wir die Basis, bis w nur noch eine einzige Koordinate hat.</Aufgabe>
      <LabeledTransformCanvas
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={290}
        worldHalf={HALB}
        lines={[
          { dir: q1, color: FMM_COLORS.blau, dash: true },
          { dir: q2, color: FMM_COLORS.gruen, dash: true },
        ]}
        vectors={[
          { v: q1, color: FMM_COLORS.blau, label: "q₁" },
          { v: q2, color: FMM_COLORS.gruen, label: "q₂" },
          { v: w, color: FMM_COLORS.rot, label: "w", draggable: true },
        ]}
        onVectorChange={(_i, p) => setW([p[0], p[1]])}
        overlay={(toPx) => {
          const [ox, oy] = toPx(0, 0);
          const rad = Math.abs(toPx(1, 0)[0] - ox);
          const p1: [number, number] = [c1 * q1[0], c1 * q1[1]];
          const [ax, ay] = toPx(p1[0], p1[1]);
          const [wx, wy] = toPx(w[0], w[1]);
          return (
            <g pointerEvents="none">
              <circle cx={ox} cy={oy} r={rad} fill="none" stroke="var(--w-axis)" strokeWidth={1} strokeDasharray="3 3" />
              {/* c₁ entlang q₁, dann c₂ entlang q₂ — die Zerlegung als Streckenzug */}
              <line x1={ox} y1={oy} x2={ax} y2={ay} stroke={FMM_COLORS.blau} strokeWidth={4} strokeOpacity={0.55} />
              <line x1={ax} y1={ay} x2={wx} y2={wy} stroke={FMM_COLORS.gruen} strokeWidth={4} strokeOpacity={0.55} />
            </g>
          );
        }}
        ariaLabel={`Orthonormalbasis um ${fmtDe(deg, 0)} Grad gedreht; w hat die Koordinaten c₁ = ${fmtDe(c1)} und c₂ = ${fmtDe(c2)}.`}
      />
      <Slider label="Drehung θ (°)" value={deg} onChange={setDeg} min={0} max={180} step={0.5} accent={FMM_COLORS.blau} />
      <Slider label="w₁" value={w[0]} onChange={(x) => setW([x, w[1]])} min={-2.4} max={2.4} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="w₂" value={w[1]} onChange={(y) => setW([w[0], y])} min={-2.4} max={2.4} step={0.05} accent={FMM_COLORS.rot} />
      <p className="mt-1 font-mono text-xs tabular-nums" style={{ color: "var(--w-muted, #64748b)" }}>
        c₁ = q₁ᵀw = {fmtDe(c1)} · c₂ = q₂ᵀw = {fmtDe(c2)}
      </p>
      <Verdikt kind={aufQ1 || aufQ2 ? "ok" : "neutral"}>
        {aufQ1 || aufQ2 ? (
          <>
            Getroffen: w zeigt jetzt genau entlang {aufQ1 ? "q₁" : "q₂"}, die andere Koordinate
            ist null, und die verbleibende ist ±‖w‖ = {fmtDe(nw)}. Auch hier gilt
            c₁² + c₂² = ‖w‖² = {fmtDe(nw * nw)} – eine Orthonormalbasis verschiebt Länge nur
            zwischen den Koordinaten hin und her.
          </>
        ) : (
          <>
            Die blaue Strecke misst c₁ = {fmtDe(c1)}, die grüne c₂ = {fmtDe(c2)}; zusammen führen
            sie exakt zur Spitze von w. Beide Zahlen sind bloße Skalarprodukte, kein
            Gleichungssystem, und es gilt c₁² + c₂² = {fmtDe(c1 * c1 + c2 * c2)} = ‖w‖².
          </>
        )}
      </Verdikt>
    </div>
  );
}
