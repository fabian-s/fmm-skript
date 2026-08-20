/**
 * Konzept-Widget `matrix-inverse`.
 *
 * DIE EINE EINSICHT: Eine Abbildung ist genau dann umkehrbar, wenn sie
 * verschiedene Eingaben auf verschiedene Ausgaben schickt. Drücken wir eine
 * Richtung zusammen, rücken zwei feste Punkte im Bild immer näher zusammen —
 * der Rückweg müsste ihren Abstand um denselben Faktor wieder aufblasen, und
 * bei det A = 0 fallen sie zusammen: dann gibt es keinen Rückweg mehr.
 *
 * FARBROLLEN: blau = x und sein Bild Ax; violett = der zweite Punkt x' und
 * sein Bild Ax'; orange = die Richtung, die zusammengedrückt wird (Kern von
 * A für t = 1); rot = der Verstärkungsfaktor, den die Inverse leisten müsste.
 *
 * PROVENIENZ: Eigenbau (2026-08-20). Ersetzt ZWEI Vorgängerwidgets: das
 * Scherungs-Widget von `inverse-matrix` (dort war det A = 1 für JEDEN
 * Reglerwert, es konnte die Nicht-Invertierbarkeit gar nicht zeigen) und den
 * algebraischen Rechner von `matrix-inverse` (det und Probe A·A⁻¹, beides
 * steht bereits im Fließtext der Konzeptseite). Die beiden Konzeptmodule
 * `inverse-matrix` und `matrix-inverse` waren Dubletten und wurden am
 * 2026-08-20 auf `matrix-inverse` zusammengelegt (25 gegen 3 eingehende Links).
 *
 * AUFBAU: A(t) = A₀ · diag(1, 1 − t). Der Regler drückt die zweite Achse
 * zusammen; bei t = 1 hat A den Rang 1 und der Kern ist span(e₂), unabhängig
 * vom Preset (per node geprüft: A(1)·e₂ = (0, 0) für alle vier Presets).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/inverse-matrix/check.mjs,
 * 2026-08-20); d = 0,9 ist der feste Abstand der beiden Testpunkte entlang e₂:
 *   Drehung 40°   t=0    det= 1,0000  σ=(1,0000; 1,0000)  κ=1,00    |Ax'−Ax|=0,9000
 *                 t=0,9  det= 0,1000  σ=(1,0000; 0,1000)  κ=10,00   |Ax'−Ax|=0,0900
 *                 t=0,99 det= 0,0100  σ=(1,0000; 0,0100)  κ=100,00  |Ax'−Ax|=0,0090
 *   Spiegelung    t=0    det=−1,0000  σ=(1,0000; 1,0000)  κ=1,00    |Ax'−Ax|=0,9000
 *                 t=0,9  det=−0,1000  σ=(1,0000; 0,1000)  κ=10,00   |Ax'−Ax|=0,0900
 *   Scherung s=1  t=0    det= 1,0000  σ=(1,6180; 0,6180)  κ=2,62    |Ax'−Ax|=1,2728
 *                 t=0,9  det= 0,1000  σ=(1,0050; 0,0995)  κ=10,10   |Ax'−Ax|=0,1273
 *   Streckung     t=0    det= 0,9600  σ=(1,6000; 0,6000)  κ=2,67    |Ax'−Ax|=0,5400
 *                 t=0,9  det= 0,0960  σ=(1,6000; 0,0600)  κ=26,67   |Ax'−Ax|=0,0540
 * Für t = 1 ist σ₂ = 0, κ unendlich und |Ax'−Ax| = 0 bei allen vier Presets.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledTransformCanvas,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  fmtDe,
  type Mat2,
} from "../../lib";

const rad = (grad: number) => (grad * Math.PI) / 180;

const PRESETS: { name: string; kurz: string; A0: Mat2 }[] = [
  {
    name: "Spiegelung",
    kurz: "Spiegelung an der Geraden mit 30°",
    A0: [
      [Math.cos(rad(60)), Math.sin(rad(60))],
      [Math.sin(rad(60)), -Math.cos(rad(60))],
    ],
  },
  {
    name: "Drehung",
    kurz: "Drehung um 40°",
    A0: [
      [Math.cos(rad(40)), -Math.sin(rad(40))],
      [Math.sin(rad(40)), Math.cos(rad(40))],
    ],
  },
  {
    name: "Scherung",
    kurz: "Scherung mit s = 1",
    A0: [
      [1, 1],
      [0, 1],
    ],
  },
  {
    name: "Streckung",
    kurz: "Streckung um 1,6 und 0,6",
    A0: [
      [1.6, 0],
      [0, 0.6],
    ],
  },
];

/** Abstand der beiden Testpunkte entlang der zusammengedrückten Richtung. */
const D = 0.9;

const det2 = (A: Mat2) => A[0][0] * A[1][1] - A[0][1] * A[1][0];

/** Singulärwerte einer 2×2-Matrix über die Eigenwerte von AᵀA. */
function singulaerwerte(A: Mat2): [number, number] {
  const [[a, b], [c, d]] = A;
  const summe = a * a + b * b + c * c + d * d;
  const dt = det2(A);
  const wurzel = Math.sqrt(Math.max(0, summe * summe - 4 * dt * dt));
  return [Math.sqrt((summe + wurzel) / 2), Math.sqrt(Math.max(0, (summe - wurzel) / 2))];
}

const anwenden = (A: Mat2, v: [number, number]): [number, number] => [
  A[0][0] * v[0] + A[0][1] * v[1],
  A[1][0] * v[0] + A[1][1] * v[1],
];

export function InvertierbarkeitWidget() {
  const [preset, setPreset] = useState(1);
  const [t, setT] = useState(0);
  const [x, setX] = useState<[number, number]>([1.2, -0.4]);

  const A0 = PRESETS[preset].A0;
  const A: Mat2 = [
    [A0[0][0], A0[0][1] * (1 - t)],
    [A0[1][0], A0[1][1] * (1 - t)],
  ];

  const xStrich: [number, number] = [x[0], x[1] + D];
  const Ax = anwenden(A, x);
  const AxStrich = anwenden(A, xStrich);

  const abstandEin = D;
  const abstandAus = Math.hypot(AxStrich[0] - Ax[0], AxStrich[1] - Ax[1]);
  const [sMax, sMin] = singulaerwerte(A);
  const entartet = abstandAus < 1e-9;
  const verstaerkung = entartet ? Infinity : abstandEin / abstandAus;
  const kappa = sMin < 1e-9 ? Infinity : sMax / sMin;

  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Drücken wir die orange Richtung zusammen und beobachten wir, wann die beiden Bildpunkte
        noch auseinanderzuhalten sind.
      </Aufgabe>

      <div className="grid grid-cols-2 gap-2">
        <div className="min-w-0">
          <LabeledTransformCanvas
            matrix={[
              [1, 0],
              [0, 1],
            ]}
            size={170}
            worldHalf={2.8}
            showUnitCircle={false}
            lines={[{ dir: [0, 1], color: FMM_COLORS.orange, label: "e₂", dash: true }]}
            vectors={[
              { v: x, color: FMM_COLORS.blau, label: "x", draggable: true },
              { v: xStrich, color: FMM_COLORS.violett, label: "x′" },
            ]}
            onVectorChange={(_i, v) => setX([v[0], v[1]])}
            ariaLabel="Zwei verschiedene Eingaben im Urbildraum."
          />
          <p className={`text-center text-xs ${W_MUTED}`}>Urbild: zwei Punkte; orange die gedrückte Richtung e₂</p>
        </div>
        <div className="min-w-0">
          <LabeledTransformCanvas
            matrix={A}
            size={170}
            worldHalf={2.8}
            showUnitCircle={false}
            transitionMs={200}
            vectors={[
              { v: Ax, color: FMM_COLORS.blau, label: "Ax" },
              { v: AxStrich, color: FMM_COLORS.violett, label: "Ax′" },
            ]}
            ariaLabel={`Ihre Bilder liegen ${fmtDe(abstandAus, 2)} auseinander.`}
          />
          <p className={`text-center text-xs ${W_MUTED}`}>Bild unter A: rücken sie zusammen?</p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            className={i === preset ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={i === preset}
            onClick={() => setPreset(i)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className={`mt-1 text-xs ${W_MUTED}`}>{PRESETS[preset].kurz}</p>

      <Slider
        label="zweite Achse zusammendrücken"
        value={t}
        onChange={setT}
        min={0}
        max={1}
        step={0.01}
        accent={FMM_COLORS.orange}
      />
      <Slider
        label="x₁"
        value={x[0]}
        onChange={(v) => setX([v, x[1]])}
        min={-2.5}
        max={2.5}
        step={0.05}
        accent={FMM_COLORS.blau}
      />
      <Slider
        label="x₂"
        value={x[1]}
        onChange={(v) => setX([x[0], v])}
        min={-2.5}
        max={2.5}
        step={0.05}
        accent={FMM_COLORS.blau}
      />

      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <M>{"\\det \\bA"}</M> = {fmtDe(det2(A), 3)}, Singulärwerte {fmtDe(sMax, 3)} und{" "}
        {fmtDe(sMin, 3)}, Abstand im Urbild {fmtDe(abstandEin, 2)}, im Bild{" "}
        {fmtDe(abstandAus, 3)}.
      </p>

      <Verdikt kind={entartet ? "warn" : kappa > 20 ? "neutral" : "ok"}>
        {entartet
          ? `Zwei verschiedene Eingaben, ein einziges Bild: x und x′ liegen ${fmtDe(abstandEin, 2)} auseinander und landen beide auf demselben Punkt. Welchen der beiden sollte eine Inverse zurückgeben? Es gibt keinen Rückweg — und genau das misst det A = 0.`
          : kappa > 20
            ? `Die beiden Bildpunkte liegen nur noch ${fmtDe(abstandAus, 3)} auseinander und sind im Bild kaum zu unterscheiden. Ein Rückweg verstärkt Fehler in dieser Richtung um den Faktor ${fmtDe(verstaerkung, 1)}; κ = ${fmtDe(kappa, 1)} beschreibt die maximale Fehlerverstärkung. A bleibt invertierbar, aber Messfehler im Bild werden sichtbar empfindlich verstärkt.`
            : `Verschiedene Eingaben, verschiedene Bilder: aus ${fmtDe(abstandEin, 2)} Abstand werden ${fmtDe(abstandAus, 2)}. Der Rückweg ist eindeutig und stabil (κ = ${fmtDe(kappa, 2)}), A ist invertierbar.`}
      </Verdikt>
    </div>
  );
}
