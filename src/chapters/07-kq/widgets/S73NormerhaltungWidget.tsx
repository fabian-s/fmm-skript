import { useState } from "react";
import { LabeledTransformCanvas, M, MD, Slider, maxAbsCoord } from "../../../lib";

/**
 * Welche linearen Abbildungen erhalten die euklidische Norm? Drehung und
 * Spiegelung ja, Scherung (Eliminationsschritt) nein. (Berechnungs-/SVG-Code
 * recycelt aus der internen heath-ch3-App; Texte eigenständig.)
 */

type Modus = "drehung" | "spiegelung" | "scherung";

export function S73NormerhaltungWidget() {
  const [modus, setModus] = useState<Modus>("drehung");
  const [theta, setTheta] = useState(40); // Drehwinkel in Grad
  const [phi, setPhi] = useState(25); // Winkel der Spiegelachse in Grad
  const [mult, setMult] = useState(1.2); // Eliminations-Multiplikator
  const v: [number, number] = [1.5, 1.0];

  let Q: [[number, number], [number, number]];
  if (modus === "drehung") {
    const t = (theta * Math.PI) / 180;
    Q = [
      [Math.cos(t), -Math.sin(t)],
      [Math.sin(t), Math.cos(t)],
    ];
  } else if (modus === "spiegelung") {
    const t = (2 * phi * Math.PI) / 180;
    Q = [
      [Math.cos(t), Math.sin(t)],
      [Math.sin(t), -Math.cos(t)],
    ];
  } else {
    Q = [
      [1, 0],
      [mult, 1],
    ];
  }
  const w: [number, number] = [Q[0][0] * v[0] + Q[0][1] * v[1], Q[1][0] * v[0] + Q[1][1] * v[1]];
  const nv = Math.hypot(v[0], v[1]);
  const nw = Math.hypot(w[0], w[1]);
  const worldHalf = Math.max(2.6, maxAbsCoord(v, w) * 1.25);
  const istOrth = modus !== "scherung";

  return (
    <div className="text-sm">
      <div className="mb-2 flex flex-wrap gap-4">
        {(
          [
            ["drehung", "Drehung"],
            ["spiegelung", "Spiegelung"],
            ["scherung", "Elimination (Scherung)"],
          ] as [Modus, string][]
        ).map(([m, label]) => (
          <label key={m} className="flex items-center gap-1.5">
            <input
              type="radio"
              name="s73-norm-modus"
              checked={modus === m}
              onChange={() => setModus(m)}
              className="accent-sky-600"
            />
            {label}
          </label>
        ))}
      </div>
      {modus === "drehung" && (
        <Slider label="Winkel θ (°)" value={theta} onChange={setTheta} min={-180} max={180} step={1} fmt={(x) => x.toFixed(0) + "°"} />
      )}
      {modus === "spiegelung" && (
        <Slider label="Achse φ (°)" value={phi} onChange={setPhi} min={-90} max={90} step={1} fmt={(x) => x.toFixed(0) + "°"} />
      )}
      {modus === "scherung" && (
        <Slider label="Multiplikator m" value={mult} onChange={setMult} min={-2} max={2} step={0.05} />
      )}
      <div className="flex flex-wrap items-start gap-4">
        <LabeledTransformCanvas
          matrix={Q}
          vectors={[
            { v, color: "#64748b", label: "v" },
            { v: w, color: istOrth ? "#0284c7" : "#dc2626", label: "Mv" },
          ]}
          showGrid
          showUnitCircle
          size={300}
          worldHalf={worldHalf}
        />
        <div className="min-w-48 space-y-2">
          <MD>{`\\bM = \\begin{pmatrix} ${Q[0][0].toFixed(2)} & ${Q[0][1].toFixed(2)} \\\\ ${Q[1][0].toFixed(2)} & ${Q[1][1].toFixed(2)} \\end{pmatrix}`}</MD>
          <p className="font-mono text-xs">
            ‖v‖₂ = {nv.toFixed(3)}
            <br />
            ‖Mv‖₂ = {nw.toFixed(3)}
          </p>
          {istOrth ? (
            <p className="text-emerald-700 dark:text-emerald-400">
              <M>{"\\bM^\\top\\bM = \\bI"}</M>: Der Einheitskreis wird auf sich selbst
              abgebildet, und es gilt <M>{"\\left\\| \\bM\\bv \\right\\|_2 = \\left\\| \\bv \\right\\|_2"}</M>{" "}
              — für jeden Winkel und jeden Vektor. Drehungen und Spiegelungen sind
              Orthogonalmatrizen.
            </p>
          ) : (
            <p className="text-rose-600 dark:text-rose-400">
              Ein Eliminationsschritt des Gauß-Verfahrens ist eine Scherung: Aus dem
              Einheitskreis wird eine Ellipse, die Norm bleibt im Allgemeinen nicht erhalten
              (vergleiche ‖v‖₂ und ‖Mv‖₂). Auf ein KQ-Problem angewandt würde eine Scherung
              deshalb den Minimierer <M>{"\\wh{\\bx}"}</M> verschieben.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
