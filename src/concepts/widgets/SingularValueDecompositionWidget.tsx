/**
 * Konzept-Widget für `singular-value-decomposition` (Triage C3: REWORK —
 * die drei Schritte Vᵀ, Σ, U einzeln zuschaltbar, mit Übergang).
 *
 * DIE EINE EINSICHT: A = UΣVᵀ ist kein Formelsalat, sondern eine Reihenfolge:
 * erst drehen, dann entlang der Achsen strecken, dann wieder drehen. Der erste
 * Schritt Vᵀ sieht am Einheitskreis wie nichts aus – markiert man aber die
 * beiden Rechtssingulärvektoren, wird sichtbar, dass er genau sie auf die
 * Koordinatenachsen legt. Erst dadurch kann Σ sie einzeln strecken.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot   = v₁ und seine Bilder auf dem Weg (die erste Hauptrichtung)
 *   grün  = v₂ und seine Bilder
 *   blau  = Einheitskreis-Bild und verformtes Gitter (Lib)
 *
 * PROVENIENZ: Idee „Drehen–Strecken–Drehen am Einheitskreis" aus dem
 * Vorgängerwidget (Stand 2026-08-18, dort nur mit V = I); Schrittsteuerung aus
 * der Lib-`Stepper`, Übergang und Achsen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C3/check-svd.mjs,
 * 2026-08-19), V = R(α), U = R(β), Σ = diag(σ₁, σ₂):
 *   Default α = 0,5, β = 0,8, σ₁ = 1,8, σ₂ = 0,6:
 *     A = ((1,3069; 0,2235), (0,9328; 0,9859)), det A = 1,08 = σ₁σ₂;
 *     numerisch max‖Ax‖ = 1,8 und min‖Ax‖ = 0,6 über dem Einheitskreis,
 *     also sind σ₁, σ₂ genau die Halbachsen; κ₂ = σ₁/σ₂ = 3;
 *     Vᵀv₁ = e₁ und Vᵀv₂ = e₂ auf 1e−10; Av₁ = σ₁u₁ auf 1e−12;
 *   α = 1,1, β = −0,4, σ₁ = 2,4, σ₂ = 0,15: max‖Ax‖ = 2,4, min‖Ax‖ = 0,15,
 *     κ₂ = 16, det A = 0,36;
 *   σ₂ = 0: det A = 0, min‖Ax‖ = 0 (numerisch 2,8e−5 bei 200 000 Punkten),
 *     Rang 1;
 *   Vᵀ lässt jeden Punkt des Einheitskreises auf dem Kreis:
 *     max |‖Vᵀx‖ − 1| = 4,4e−16.
 */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Stepper,
  TransformCanvas,
  Verdikt,
  fmtDe,
  type Mat2,
} from "../../lib";

const NARRATION = [
  "Ausgangslage: der Einheitskreis mit den beiden Rechtssingulärvektoren v₁ und v₂.",
  "Vᵀ dreht v₁ und v₂ auf die Koordinatenachsen.",
  "Σ streckt die Achsen einzeln, um σ₁ und um σ₂.",
  "U dreht die fertige Ellipse in ihre endgültige Lage – zusammen ist das A.",
];
const TITEL = ["Start", "Vᵀ", "ΣVᵀ", "UΣVᵀ = A"];

export function SvdWidget() {
  const [k, setK] = useState(0);
  const [alpha, setAlpha] = useState(0.5);
  const [beta, setBeta] = useState(0.8);
  const [s1, setS1] = useState(1.8);
  const [s2, setS2] = useState(0.6);

  const { M, v1Bild, v2Bild, A } = useMemo(() => {
    const ca = Math.cos(alpha);
    const sa = Math.sin(alpha);
    const cb = Math.cos(beta);
    const sb = Math.sin(beta);
    const V: Mat2 = [
      [ca, -sa],
      [sa, ca],
    ];
    const Vt: Mat2 = [
      [ca, sa],
      [-sa, ca],
    ];
    const SV: Mat2 = [
      [s1 * Vt[0][0], s1 * Vt[0][1]],
      [s2 * Vt[1][0], s2 * Vt[1][1]],
    ];
    const USV: Mat2 = [
      [cb * SV[0][0] - sb * SV[1][0], cb * SV[0][1] - sb * SV[1][1]],
      [sb * SV[0][0] + cb * SV[1][0], sb * SV[0][1] + cb * SV[1][1]],
    ];
    const stufen: Mat2[] = [
      [
        [1, 0],
        [0, 1],
      ],
      Vt,
      SV,
      USV,
    ];
    const Mk = stufen[k];
    const v1: [number, number] = [V[0][0], V[1][0]];
    const v2: [number, number] = [V[0][1], V[1][1]];
    const bild = (x: [number, number]): [number, number] => [
      Mk[0][0] * x[0] + Mk[0][1] * x[1],
      Mk[1][0] * x[0] + Mk[1][1] * x[1],
    ];
    return { M: Mk, v1Bild: bild(v1), v2Bild: bild(v2), A: USV };
  }, [alpha, beta, s1, s2, k]);

  const halb = Math.max(2.2, 1.25 * s1);
  const labels = [
    ["v₁", "v₂"],
    ["Vᵀv₁ = e₁", "Vᵀv₂ = e₂"],
    ["σ₁e₁", "σ₂e₂"],
    ["σ₁u₁", "σ₂u₂"],
  ][k];
  const rangverlust = s2 < 0.05;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>
        Gehen wir die drei Schritte durch und achten darauf, wann sich der Kreis verformt.
      </Aufgabe>
      <TransformCanvas
        matrix={M}
        transitionMs={400}
        size={280}
        worldHalf={halb}
        showGrid
        showUnitCircle
        vectors={[
          {
            v: v1Bild,
            color: FMM_COLORS.rot,
            label: labels[0],
            draggable: k === 0,
            dragConstraint: "unitCircle",
          },
          { v: v2Bild, color: FMM_COLORS.gruen, label: labels[1] },
        ]}
        onVectorChange={(_i, p) => {
          // V und −V liefern dieselbe Ellipse; auf (−π/2, π/2] normieren,
          // damit der Regler den gezogenen Wert auch anzeigen kann.
          const a = Math.atan2(p[1], p[0]);
          setAlpha(((((a + Math.PI / 2) % Math.PI) + Math.PI) % Math.PI) - Math.PI / 2);
        }}
        ariaLabel={`Schritt ${k} der Singulärwertzerlegung (${TITEL[k]}); der Einheitskreis liegt ${k < 2 ? "unverformt" : `als Ellipse mit den Halbachsen ${fmtDe(s1)} und ${fmtDe(s2)}`} vor.`}
      />
      <Stepper step={k} setStep={setK} max={3} narration={`${TITEL[k]}: ${NARRATION[k]}`} />
      <Slider label="Drehung von V (rad)" value={alpha} onChange={setAlpha} min={-1.57} max={1.57} step={0.01} accent={FMM_COLORS.rot} />
      <Slider label="σ₁" value={s1} onChange={(x) => setS1(Math.max(x, s2))} min={0.2} max={2.5} step={0.05} accent={FMM_COLORS.blau} />
      <Slider label="σ₂" value={s2} onChange={(x) => setS2(Math.min(x, s1))} min={0} max={2.5} step={0.05} accent={FMM_COLORS.blau} />
      <Slider label="Drehung von U (rad)" value={beta} onChange={setBeta} min={-1.57} max={1.57} step={0.01} accent={FMM_COLORS.gruen} />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> erste Hauptrichtung ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> zweite ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Bild von Kreis und Gitter
      </p>
      <Verdikt kind={k === 3 && rangverlust ? "fail" : k === 0 ? "neutral" : "ok"}>
        {k === 0 ? (
          <>
            Noch ist nichts geschehen: v₁ und v₂ sind zwei senkrechte Einheitsvektoren auf dem
            Kreis. Sie sind die Spalten von V, und die Reihenfolge im nächsten Schritt hängt an
            ihnen.
          </>
        ) : k === 1 ? (
          <>
            Am Kreis hat sich nichts geändert – eine Drehung bildet ihn auf sich selbst ab. Nur
            an den beiden Pfeilen sehen wir, dass etwas passiert ist: Vᵀ legt v₁ auf e₁ und v₂
            auf e₂. Genau dafür ist der Schritt da; ohne ihn wüsste Σ nicht, welche Richtungen
            es strecken soll.
          </>
        ) : k === 2 ? (
          <>
            Jetzt verformt sich der Kreis zum ersten Mal: Σ streckt die erste Achse auf{" "}
            {fmtDe(s1)} und die zweite auf {fmtDe(s2)}. Die Ellipse steht achsenparallel, ihre
            Fläche ist um den Faktor σ₁σ₂ = {fmtDe(s1 * s2)} gewachsen.
          </>
        ) : rangverlust ? (
          <>
            Mit σ₂ = {fmtDe(s2)} ist die Ellipse zu einer Strecke zusammengefallen: det A ={" "}
            {fmtDe(A[0][0] * A[1][1] - A[0][1] * A[1][0])}, A hat Rang 1, und κ₂ = σ₁/σ₂ ist
            unendlich. Das ganze Bild von A liegt auf der Geraden durch σ₁u₁.
          </>
        ) : (
          <>
            U dreht nur noch, ohne zu strecken. Die Halbachsen der Ellipse sind σ₁ = {fmtDe(s1)}{" "}
            und σ₂ = {fmtDe(s2)}, also ist ‖A‖₂ = {fmtDe(s1)} und κ₂ = {fmtDe(s1 / s2)}. Die
            Verformung steckt vollständig in Σ; die beiden Drehungen legen nur fest, wo sie
            ansetzt.
          </>
        )}
      </Verdikt>
    </div>
  );
}
