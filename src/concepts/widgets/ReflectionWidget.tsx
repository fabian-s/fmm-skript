/**
 * Konzept-Widget für `reflection` (Triage C3: POLISH — Achse als Gerade,
 * Knopf „zweimal spiegeln" mit Übergang, a ziehbar).
 *
 * DIE EINE EINSICHT: Eine Spiegelung klappt die Ebene an einer Geraden um.
 * Auf der Achse rührt sie nichts an, senkrecht dazu kehrt sie das Vorzeichen
 * um, und weil sie jeden Punkt nur umklappt, macht der zweite Anlauf sie
 * rückgängig: H² = I.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot     = das Objekt in der Hand (a, der gezogene Vektor)
 *   blau    = sein Bild Ha (und, aus der Lib, das gespiegelte Gitter)
 *   violett = die Spiegelachse als Gerade
 *
 * PROVENIENZ: Matrixform und Beispielvektor aus dem Vorgängerwidget (Stand
 * 2026-08-18); Gerade, Ziehen und Matrix-Übergang kommen aus der
 * Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node,
 * scripts/verify/REV1/ReflectionWidget.mjs,
 * 2026-08-20), Achswinkel 30°, ‖a‖ = √5 = 2,2361:
 *   H = ((0,5; 0,866), (0,866; −0,5)), det H = −1 (auf 1e−12);
 *   Default a unter 90°, also a = (0; 2,2361): Ha = (1,9365; −1,118), das
 *     liegt unter −30°, und ‖Ha‖ = 2,2361; H(Ha) = a auf 1e−10, also H² = I;
 *   für a = (2, 1) ist Ha = (1,866; 1,232), ebenfalls längentreu;
 *   der Achsenvektor bleibt fest, die Normale kippt exakt auf ihr Negatives;
 *   a und Ha haben denselben Winkel zur Achse (bei a = (2,1) je 3,4349°);
 *   bei Achswinkel 45° gilt H·(2,1)ᵀ = (1,2)ᵀ exakt.
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

const RADIUS = Math.sqrt(5); // ‖a‖ bleibt fest, gezogen wird nur die Richtung

export function ReflectionWidget() {
  const [achse, setAchse] = useState(30);
  const [grad, setGrad] = useState(90);
  const [zweimal, setZweimal] = useState(false);

  const th = (achse * Math.PI) / 180;
  const c2 = Math.cos(2 * th);
  const s2 = Math.sin(2 * th);
  const H: [[number, number], [number, number]] = [
    [c2, s2],
    [s2, -c2],
  ];
  const M: [[number, number], [number, number]] = zweimal
    ? [
        [1, 0],
        [0, 1],
      ]
    : H;

  const ph = (grad * Math.PI) / 180;
  const a: [number, number] = [RADIUS * Math.cos(ph), RADIUS * Math.sin(ph)];
  const bild: [number, number] = [M[0][0] * a[0] + M[0][1] * a[1], M[1][0] * a[0] + M[1][1] * a[1]];

  /** Winkel zwischen a und der Achse, auf (−90°, 90°] gebracht. */
  const delta = (((grad - achse) % 180) + 270) % 180 - 90;
  const aufAchse = Math.abs(delta) < 3;
  const senkrecht = Math.abs(Math.abs(delta) - 90) < 3;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>
        Ziehen wir a herum und suchen die Richtungen, die die Spiegelung unverändert lässt.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={M}
        xLabel="x₁"
        yLabel="x₂"
        transitionMs={250}
        showGrid
        showUnitCircle={false}
        lines={[{ dir: [Math.cos(th), Math.sin(th)], color: FMM_COLORS.violett, label: "Achse" }]}
        vectors={[
          { v: a, color: FMM_COLORS.rot, label: "a", draggable: true },
          { v: bild, color: FMM_COLORS.blau, label: zweimal ? "H²a" : "Ha" },
        ]}
        onVectorChange={(_i, v) =>
          setGrad(Math.hypot(v[0], v[1]) < 1e-6 ? grad : (Math.atan2(v[1], v[0]) * 180) / Math.PI)
        }
        overlay={(toPx) => {
          const [x1, y1] = toPx(a[0], a[1]);
          const [x2, y2] = toPx(bild[0], bild[1]);
          return (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--w-axis)"
              strokeWidth={1}
              strokeDasharray="3 3"
              pointerEvents="none"
            />
          );
        }}
        size={240}
        worldHalf={3}
        ariaLabel={`Spiegelung an der Geraden mit Winkel ${fmtDe(achse, 0)} Grad; a liegt bei (${fmtDe(a[0])}; ${fmtDe(a[1])}), das Bild bei (${fmtDe(bild[0])}; ${fmtDe(bild[1])}).`}
      />
      <Slider label="Achswinkel (°)" value={achse} onChange={setAchse} min={0} max={180} step={1} accent={FMM_COLORS.violett} />
      <Slider label="Richtung von a (°)" value={grad} onChange={setGrad} min={-180} max={180} step={1} accent={FMM_COLORS.rot} />
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        <button
          type="button"
          aria-pressed={!zweimal}
          className={zweimal ? W_BUTTON : W_BUTTON_AKTIV}
          onClick={() => setZweimal(false)}
        >
          einmal spiegeln
        </button>
        <button
          type="button"
          aria-pressed={zweimal}
          className={zweimal ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setZweimal(true)}
        >
          zweimal spiegeln
        </button>
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> a (ziehbar) ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Bild ·{" "}
        <span style={{ color: FMM_COLORS.violett }}>▮</span> Spiegelachse
      </p>
      <Verdikt kind={zweimal ? "ok" : aufAchse ? "ok" : senkrecht ? "warn" : "neutral"}>
        {zweimal ? (
          <>
            Zweimal gespiegelt liegt das Bild wieder auf a, für jede Richtung und jeden
            Achswinkel: H² = I, also H⁻¹ = H. Das gespiegelte Gitter ist zum Original
            zurückgeklappt.
          </>
        ) : aufAchse ? (
          <>
            a zeigt entlang der Achse und bleibt liegen: Ha = a. Solche Richtungen sind
            Eigenrichtungen zum Eigenwert +1.
          </>
        ) : senkrecht ? (
          <>
            a steht senkrecht auf der Achse, und die Spiegelung dreht es exakt um: Ha = −a,
            Eigenwert −1. Zusammen mit der festen Achsenrichtung erklärt das det H = 1·(−1) =
            −1.
          </>
        ) : (
          <>
            a = ({fmtDe(a[0])}; {fmtDe(a[1])}) klappt auf ({fmtDe(bild[0])}; {fmtDe(bild[1])}). Die
            Länge bleibt (‖a‖ = ‖Ha‖ = {fmtDe(RADIUS)}), aber det H = −1: Die Ebene ist
            umgestülpt, aus links wird rechts.
          </>
        )}
      </Verdikt>
    </div>
  );
}
