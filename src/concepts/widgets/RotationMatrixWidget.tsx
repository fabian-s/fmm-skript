/**
 * QA-L3-Nachprüfung: `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget für `rotation-matrix` (Triage C3: KEEP + Direktmanipulation).
 *
 * DIE EINE EINSICHT: Eine Drehmatrix ist nichts anderes als die Angabe, wohin
 * e₁ wandert — der zweite Spaltenvektor folgt zwangsläufig, weil er senkrecht
 * darauf und ebenso lang bleiben muss. Deshalb ist hier das Ziehen von Qe₁ auf
 * dem Einheitskreis die natürliche Bedienung, nicht der Winkelregler.
 *
 * FARBROLLEN (Batch-C3-Konvention, deckungsgleich mit der Lib):
 *   rot   = das Objekt in der Hand (Qe₁, der gezogene Vektor)
 *   grün  = die zweite Spalte Qe₂, die mitgeführt wird
 *   blau  = Bild des Einheitsgitters und des Einheitskreises unter Q (Lib)
 *
 * PROVENIENZ: Aufbau und Matrixanzeige aus dem Vorgängerwidget (Stand
 * 2026-08-18); Ziehen, Achsen und Ticks kommen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/RotationMatrixWidget.mjs,
 * 2026-08-20), Default θ = 35°:
 *   cos θ = 0,8192, sin θ = 0,5736; det Q = 1 (auf 1e−12);
 *   Qe₁ = (0,8192; 0,5736), Qe₂ = (−0,5736; 0,8192), Qe₁ᵀQe₂ = 0 (auf 1e−12),
 *   ‖Qe₁‖ = 1 (auf 1e−12); für θ = 90° gilt Q·(1,0)ᵀ = (0,1)ᵀ exakt.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MD,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

/** Deutsche Dezimalzahl für den MathJax-Fließsatz (Komma als Gruppe). */
const tex = (v: number, d = 2) => fmtDe(v, d).replace(",", "{,}").replace("−", "-");

export function RotationWidget() {
  const [deg, setDeg] = useState(35);
  const th = (deg * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);

  /** Ziehen von Qe₁ auf dem Einheitskreis setzt θ (Doppelpfad: der Regler). */
  const ausZug = (v: [number, number]) => {
    const w = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
    setDeg(Math.round(w));
  };

  const viertel = Math.abs(Math.abs(deg) - 90) < 2;
  const ruhe = Math.abs(deg) < 2 || Math.abs(Math.abs(deg) - 180) < 2;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ziehen wir den roten Pfeil Qe₁ auf dem Kreis herum.</Aufgabe>
      <LabeledTransformCanvas
        matrix={[
          [c, -s],
          [s, c],
        ]}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v: [c, s], color: FMM_COLORS.rot, label: "Qe₁", draggable: true, dragConstraint: "unitCircle" },
          { v: [-s, c], color: FMM_COLORS.gruen, label: "Qe₂" },
        ]}
        onVectorChange={(_i, v) => ausZug(v)}
        size={240}
        worldHalf={1.6}
        ariaLabel={`Drehung um ${fmtDe(deg, 0)} Grad; Qe₁ liegt bei (${fmtDe(c)}; ${fmtDe(s)}), Qe₂ bei (${fmtDe(-s)}; ${fmtDe(c)}).`}
      />
      <Slider label="θ (Grad)" value={deg} onChange={setDeg} min={-180} max={180} step={1} accent={FMM_COLORS.rot} />
      <MD>{`\\bQ = \\begin{pmatrix} ${tex(c)} & ${tex(-s)} \\\\ ${tex(s)} & ${tex(c)} \\end{pmatrix}`}</MD>
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Qe₁ (gezogen) ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> Qe₂ ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Bild des Gitters und des Einheitskreises
      </p>
      <Verdikt kind={ruhe ? "neutral" : "ok"}>
        {ruhe ? (
          <>
            Bei θ = {fmtDe(deg, 0)}° passiert fast nichts: Q ist ±I, das Gitter liegt auf sich
            selbst. Interessant wird es dazwischen.
          </>
        ) : viertel ? (
          <>
            Eine Vierteldrehung: e₁ landet exakt auf ±e₂. Die beiden Spalten sind weiterhin
            Einheitsvektoren mit Qe₁ᵀQe₂ = 0, und det Q = 1 – die Drehung erhält die
            Orientierung.
          </>
        ) : (
          <>
            Der Kreis landet auf sich selbst, keine Länge ändert sich: ‖Qe₁‖ = ‖Qe₂‖ = 1 und
            Qe₁ᵀQe₂ = 0. Die Spalten bilden also eine Orthonormalbasis, Q ist orthogonal, und
            det Q = 1 hält die Orientierung fest.
          </>
        )}
      </Verdikt>
    </div>
  );
}
