/**
 * Konzept-Widget für `orthogonal-complement` (Triage C3: POLISH — b ziehen,
 * rechten Winkel markieren).
 *
 * DIE EINE EINSICHT: Ein Unterraum S und sein Komplement S⊥ zerlegen jeden
 * Vektor eindeutig in zwei Stücke, und zwar so, dass die beiden Stücke
 * senkrecht aufeinander stehen. Wohin wir b auch ziehen: p bleibt auf der
 * Geraden S, r bleibt auf der Geraden S⊥, und rᵀu bleibt null.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot     = das Objekt in der Hand (b, der gezogene Vektor)
 *   violett = u, der Aufspannvektor von S
 *   blau    = die Gerade S und der Anteil p ∈ S
 *   grün    = die Gerade S⊥ und der Rest r ∈ S⊥
 *
 * PROVENIENZ: Zerlegung b = p + r und der Testvektor u aus dem Vorgängerwidget
 * (Stand 2026-08-18); Geraden, Ziehen und Achsen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L2/verify-qa-l2.mjs,
 * 2026-08-20), u = (2, 1), Default b = (0,5; 2):
 *   t = uᵀb/uᵀu = 0,6, p = (1,2; 0,6), r = (−0,7; 1,4);
 *   rᵀu = 0 (auf 1e−12), ‖p‖ = 1,3416, ‖r‖ = 1,5652;
 *   ‖b‖² = 4,25 = ‖p‖² + ‖r‖²;
 *   normierte Richtung von S⊥: (−0,4472; 0,8944).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, LabeledTransformCanvas, Verdikt, fmtDe } from "../../lib";

const U: [number, number] = [2, 1];
const UU = U[0] * U[0] + U[1] * U[1];
const N: [number, number] = [-U[1], U[0]]; // Richtung von S⊥
const HALB = 3.4;

export function ComplementWidget() {
  const [b, setB] = useState<[number, number]>([0.5, 2]);

  const t = (U[0] * b[0] + U[1] * b[1]) / UU;
  const p: [number, number] = [t * U[0], t * U[1]];
  const r: [number, number] = [b[0] - p[0], b[1] - p[1]];
  const np = Math.hypot(p[0], p[1]);
  const nr = Math.hypot(r[0], r[1]);

  const inS = nr < 0.12;
  const inSperp = np < 0.12;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ziehen wir b umher und beobachten, was mit den beiden Anteilen passiert.</Aufgabe>
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
          { dir: U, color: FMM_COLORS.blau, label: "S" },
          { dir: N, color: FMM_COLORS.gruen, label: "S⊥", dash: true },
        ]}
        vectors={[
          { v: U, color: FMM_COLORS.violett, label: "u" },
          { v: p, color: FMM_COLORS.blau, label: "p" },
          { v: r, color: FMM_COLORS.gruen, label: "r" },
          { v: b, color: FMM_COLORS.rot, label: "b", draggable: true },
        ]}
        onVectorChange={(_i, q) => setB([q[0], q[1]])}
        overlay={(toPx) => {
          const [px, py] = toPx(p[0], p[1]);
          const [bx, by] = toPx(b[0], b[1]);
          // rechter Winkel bei p: kleines Quadrat aus u-Richtung und r-Richtung
          const lu = Math.hypot(U[0], U[1]);
          const eu: [number, number] = [U[0] / lu, U[1] / lu];
          const er: [number, number] = nr > 1e-6 ? [r[0] / nr, r[1] / nr] : [0, 0];
          const d = 0.28;
          const ecken: [number, number][] = [
            [p[0] + d * eu[0], p[1] + d * eu[1]],
            [p[0] + d * eu[0] + d * er[0], p[1] + d * eu[1] + d * er[1]],
            [p[0] + d * er[0], p[1] + d * er[1]],
          ];
          return (
            <g pointerEvents="none">
              <line x1={px} y1={py} x2={bx} y2={by} stroke={FMM_COLORS.gruen} strokeWidth={1.5} strokeDasharray="4 3" />
              {nr > 0.2 && (
                <polyline
                  points={ecken.map(([x, y]) => toPx(x, y).map((z) => z.toFixed(2)).join(",")).join(" ")}
                  fill="none"
                  stroke="var(--w-text)"
                  strokeOpacity={0.7}
                  strokeWidth={1.2}
                />
              )}
            </g>
          );
        }}
        ariaLabel={`b = (${fmtDe(b[0])}; ${fmtDe(b[1])}) zerlegt sich in p = (${fmtDe(p[0])}; ${fmtDe(p[1])}) auf der Geraden S und r = (${fmtDe(r[0])}; ${fmtDe(r[1])}) auf der dazu senkrechten Geraden.`}
      />
      <Slider label="b₁" value={b[0]} onChange={(x) => setB([x, b[1]])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="b₂" value={b[1]} onChange={(y) => setB([b[0], y])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <p className="mt-1 font-mono text-xs tabular-nums" style={{ color: "var(--w-muted)" }}>
        p = ({fmtDe(p[0])}; {fmtDe(p[1])}) · r = ({fmtDe(r[0])}; {fmtDe(r[1])}) · rᵀu ={" "}
        {fmtDe(r[0] * U[0] + r[1] * U[1])}
      </p>
      <Verdikt kind={inS || inSperp ? "warn" : "ok"}>
        {inS ? (
          <>
            b liegt selbst schon auf S, also bleibt nichts übrig: r = 0 und p = b. Der Rest ist
            trotzdem ein zulässiges Element von S⊥ – der Nullvektor gehört jedem Unterraum an.
          </>
        ) : inSperp ? (
          <>
            Umgekehrter Randfall: b steht senkrecht auf ganz S, deshalb ist p = 0 und r = b. Die
            Projektion auf S wirft b vollständig weg.
          </>
        ) : (
          <>
            Die Zerlegung b = p + r trennt sauber: rᵀu = {fmtDe(r[0] * U[0] + r[1] * U[1])}, das
            markierte Eck bei p ist ein echter rechter Winkel. Damit gilt auch Pythagoras,
            ‖b‖² = ‖p‖² + ‖r‖² = {fmtDe(np * np)} + {fmtDe(nr * nr)} ={" "}
            {fmtDe(b[0] * b[0] + b[1] * b[1])}. Genau diese Aufteilung berechnet die Methode der
            kleinsten Quadrate, mit r als Residuum.
          </>
        )}
      </Verdikt>
    </div>
  );
}
