/**
 * Konzept-Widget für `orthogonal-matrix` (Triage C3: POLISH — Checkbox zu zwei
 * aria-pressed-Knöpfen mit 250-ms-Übergang, v ziehbar).
 *
 * DIE EINE EINSICHT: Orthogonale Matrizen sind genau die starren Bewegungen.
 * Drehung und Spiegelung sehen im Bild verschieden aus, aber beide lassen den
 * Einheitskreis auf sich liegen und jede Länge unangetastet; unterscheiden
 * lassen sie sich nur am Vorzeichen der Determinante.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot  = das Objekt in der Hand (v, der gezogene Vektor)
 *   blau = sein Bild Qv (und, aus der Lib, das bewegte Gitter samt Kreisbild)
 *
 * PROVENIENZ: Matrixformen und Testvektor aus dem Vorgängerwidget (Stand
 * 2026-08-18); Ziehen, Kreisbild und Matrix-Übergang aus der
 * Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C3/check-ortho.mjs,
 * 2026-08-19), v = (2, 1), ‖v‖ = 2,2361:
 *   Drehung θ = 30°: Qv = (1,2321; 1,866), ‖Qv‖ = 2,2361, det Q = 1;
 *   Spiegelung θ = 30°: Qv = (2,2321; 0,134), ‖Qv‖ = 2,2361, det Q = −1,
 *     Spiegelachse bei 15° (die Hälfte von θ);
 *   Drehung θ = 120°: Qv = (−1,866; 1,2321); Spiegelung θ = 120°:
 *     Qv = (−0,134; 2,2321), Achse bei 60°.
 *   Alle Determinanten auf 1e−12 genau.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
} from "../../lib";

type Art = "drehung" | "spiegelung";

export function OrthogonalMatrixWidget() {
  const [deg, setDeg] = useState(30);
  const [art, setArt] = useState<Art>("drehung");
  const [v, setV] = useState<[number, number]>([2, 1]);

  const th = (deg * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);
  const Q: [[number, number], [number, number]] =
    art === "spiegelung"
      ? [
          [c, s],
          [s, -c],
        ]
      : [
          [c, -s],
          [s, c],
        ];
  const Qv: [number, number] = [Q[0][0] * v[0] + Q[0][1] * v[1], Q[1][0] * v[0] + Q[1][1] * v[1]];
  const nv = Math.hypot(v[0], v[1]);
  const nQv = Math.hypot(Qv[0], Qv[1]);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ziehen wir v und vergleichen die beiden Längen unter der Tafel.</Aufgabe>
      <LabeledTransformCanvas
        matrix={Q}
        transitionMs={250}
        size={250}
        worldHalf={3.2}
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true },
          { v: Qv, color: FMM_COLORS.blau, label: "Qv" },
        ]}
        onVectorChange={(_i, p) => setV([p[0], p[1]])}
        lines={
          art === "spiegelung"
            ? [{ dir: [Math.cos(th / 2), Math.sin(th / 2)], color: FMM_COLORS.orange, label: "Achse", dash: true }]
            : []
        }
        ariaLabel={`${art === "drehung" ? "Drehung" : "Spiegelung"} mit Winkelparameter ${fmtDe(deg, 0)} Grad; v = (${fmtDe(v[0])}; ${fmtDe(v[1])}) wird auf (${fmtDe(Qv[0])}; ${fmtDe(Qv[1])}) abgebildet, beide der Länge ${fmtDe(nv)}.`}
      />
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        <button
          type="button"
          aria-pressed={art === "drehung"}
          className={art === "drehung" ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setArt("drehung")}
        >
          Q als Drehung
        </button>
        <button
          type="button"
          aria-pressed={art === "spiegelung"}
          className={art === "spiegelung" ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setArt("spiegelung")}
        >
          Q als Spiegelung
        </button>
      </div>
      <Slider label="Winkel θ (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} accent={FMM_COLORS.blau} />
      <Slider label="v₁" value={v[0]} onChange={(x) => setV([x, v[1]])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="v₂" value={v[1]} onChange={(y) => setV([v[0], y])} min={-3} max={3} step={0.05} accent={FMM_COLORS.rot} />
      <p className="mt-1 font-mono text-xs tabular-nums" style={{ color: "var(--w-muted, #64748b)" }}>
        ‖v‖₂ = {fmtDe(nv, 3)} · ‖Qv‖₂ = {fmtDe(nQv, 3)}
      </p>
      <Verdikt kind={art === "drehung" ? "ok" : "warn"}>
        {art === "drehung" ? (
          <>
            Die beiden Längen stimmen auf jede angezeigte Stelle überein, und der gestrichelte
            Einheitskreis liegt auf seinem Bild. Das ist QᵀQ = I in Bildform. Hier ist
            det Q = +1: Das Gitter wird gedreht, aber nicht umgestülpt.
          </>
        ) : (
          <>
            Auch hier bleibt ‖Qv‖ = ‖v‖ – eine Spiegelung ist ebenso starr. Der Unterschied
            steckt allein im Vorzeichen: det Q = −1. Die Achse liegt bei θ/2 ={" "}
            {fmtDe(deg / 2, 0)}°, und was auf ihr liegt, bleibt liegen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
