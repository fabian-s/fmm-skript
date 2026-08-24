/**
 * §7.3: Welche linearen Abbildungen erhalten die euklidische Norm?
 *
 * DIE EINE EINSICHT: Drehungen und Spiegelungen lassen ‖v‖₂ unangetastet,
 * der Eliminationsschritt des Gauß-Verfahrens (eine Scherung) nicht – deshalb
 * dürfen wir ein KQ-Problem mit Orthogonalmatrizen transformieren, mit
 * Gauß-Schritten aber nicht.
 *
 * FARBROLLEN Kapitel 7: das Urbild v neutral grau, das Bild Mv grün, solange
 * die Abbildung längentreu ist (die Rolle „was am Ende herauskommt"), und rot,
 * sobald sie es nicht ist (die Rolle „Datenvektor/Fehlerquelle" – hier: die
 * verbotene Transformation). Der Moduswechsel läuft als 250-ms-Übergang, damit
 * die Zuordnung der drei Bilder sichtbar bleibt (Muster 12).
 *
 * PROVENIENZ: Berechnungs- und Overlay-Code aus der internen App
 * interactive/heath-ch3 portiert; Texte für dieses Skript neu.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   v = (1,5; 1,0)ᵀ mit ‖v‖₂ = 1,802776. Drehungen um 0°, 40°, 90°, 180° und
 *   Spiegelungen an Achsen mit φ = 0°, 25°, 45° liefern ‖Qv‖₂ = 1,802775637732
 *   auf zwölf Stellen; det = +1 bzw. −1.
 *   Scherung mit Multiplikator m: ‖Mv‖₂ = 1,581 (m = −1), 2,305 (m = 0,5),
 *   3,176 (m = 1,2), 4,272 (m = 2) – Faktoren 0,877 bis 2,370 bei det = 1.
 *   Längentreu ist die Scherung nur für m = 0 und m = −4/3 = −1,333333
 *   (dort spiegelt sie v an der x₁-Achse); der Verdikt-Zweig behandelt diesen
 *   Zufallstreffer eigens.
 */
import { useCallback, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledTransformCanvas,
  M,
  MD,
  Slider,
  Verdikt,
  fmtDe,
  maxAbsCoord,
} from "../../../lib";

type Modus = "drehung" | "spiegelung" | "scherung";

const MODI: [Modus, string][] = [
  ["drehung", "Drehung"],
  ["spiegelung", "Spiegelung"],
  ["scherung", "Elimination (Scherung)"],
];

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
  const laengentreu = Math.abs(nw - nv) < 5e-4;
  const det = Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];

  // Zusatz-Zeichnung: Winkelbogen θ zwischen v und Mv (Drehung) bzw.
  // gestrichelte Spiegelachse mit Winkelbogen φ zur x1-Achse (Spiegelung)
  const overlay = useCallback(
    (toPx: (x: number, y: number) => [number, number]) => {
      const bogen = (a0: number, a1: number, r: number) => {
        const pts: string[] = [];
        const n = 40;
        for (let i = 0; i <= n; i++) {
          const t = a0 + ((a1 - a0) * i) / n;
          const [px, py] = toPx(r * Math.cos(t), r * Math.sin(t));
          pts.push(`${px.toFixed(2)},${py.toFixed(2)}`);
        }
        return pts.join(" ");
      };
      const GRAU = "var(--w-text)";
      if (modus === "drehung") {
        const a0 = Math.atan2(v[1], v[0]);
        const a1 = a0 + (theta * Math.PI) / 180;
        const mid = (a0 + a1) / 2;
        const [lx, ly] = toPx(0.8 * Math.cos(mid), 0.8 * Math.sin(mid));
        return (
          <g>
            <polyline points={bogen(a0, a1, 0.55)} fill="none" stroke={GRAU} strokeWidth={1.5} />
            <text x={lx - 4} y={ly + 4} fill={GRAU} style={{ fontSize: 13 }}>
              θ
            </text>
          </g>
        );
      }
      if (modus === "spiegelung") {
        const t = (phi * Math.PI) / 180;
        const L = worldHalf * 0.95;
        const [p1x, p1y] = toPx(-L * Math.cos(t), -L * Math.sin(t));
        const [p2x, p2y] = toPx(L * Math.cos(t), L * Math.sin(t));
        const [lx, ly] = toPx(0.95 * Math.cos(t / 2), 0.95 * Math.sin(t / 2));
        const [ax, ay] = toPx(L * 0.82 * Math.cos(t), L * 0.82 * Math.sin(t));
        return (
          <g>
            <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke={GRAU} strokeWidth={1.5} strokeDasharray="6 5" />
            {Math.abs(phi) > 4 && (
              <polyline points={bogen(0, t, 0.7)} fill="none" stroke={GRAU} strokeWidth={1.5} />
            )}
            <text x={lx - 4} y={ly + 4} fill={GRAU} style={{ fontSize: 13 }}>
              φ
            </text>
            <text x={ax - 4} y={ay - 8} textAnchor="end" fill={GRAU} style={{ fontSize: 11 }}>
              Spiegelachse
            </text>
          </g>
        );
      }
      return null;
    },
    [modus, theta, phi, worldHalf, v],
  );

  return (
    <div className="text-sm">
      <Aufgabe>
        Wählen wir die drei Abbildungen der Reihe nach an und vergleichen jedes Mal ‖v‖₂ mit
        ‖Mv‖₂.
      </Aufgabe>
      <div className="mb-2 flex flex-wrap gap-4">
        {MODI.map(([m, label]) => (
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
        <Slider label="Winkel θ (°)" value={theta} onChange={setTheta} min={-180} max={180} step={1} fmt={(x) => fmtDe(x, 0) + "°"} />
      )}
      {modus === "spiegelung" && (
        <Slider label="Achse φ (°)" value={phi} onChange={setPhi} min={-90} max={90} step={1} fmt={(x) => fmtDe(x, 0) + "°"} />
      )}
      {modus === "scherung" && (
        <Slider label="Multiplikator m" value={mult} onChange={setMult} min={-2} max={2} step={0.05} fmt={(x) => fmtDe(x, 2)} />
      )}
      <div className="flex flex-wrap items-start gap-4">
        <LabeledTransformCanvas
          matrix={Q}
          vectors={[
            { v, color: FMM_COLORS.grau, label: "v" },
            { v: w, color: istOrth ? FMM_COLORS.gruen : FMM_COLORS.rot, label: "Mv" },
          ]}
          showGrid
          showUnitCircle
          size={280}
          worldHalf={worldHalf}
          overlay={overlay}
          transitionMs={250}
          ariaLabel={`Das Bild des Einheitskreises unter der aktuellen Abbildung; ‖v‖₂ = ${fmtDe(nv, 3)}, ‖Mv‖₂ = ${fmtDe(nw, 3)}.`}
        />
        <div className="min-w-48 grow basis-56 space-y-2">
          <MD>{`\\bM = \\begin{pmatrix} ${Q[0][0].toFixed(2)} & ${Q[0][1].toFixed(2)} \\\\ ${Q[1][0].toFixed(2)} & ${Q[1][1].toFixed(2)} \\end{pmatrix}`}</MD>
          <p className="font-mono text-xs tabular-nums">
            ‖v‖₂ = {fmtDe(nv, 3)}
            <br />
            ‖Mv‖₂ = {fmtDe(nw, 3)}
            <br />
            det M = {fmtDe(det, 2)}
          </p>
        </div>
      </div>
      {istOrth ? (
        <Verdikt kind="ok" className="mt-2" titel="Längentreu:">
          <M>{"\\bM^\\top\\bM = \\bI"}</M>, det M = <span className="font-mono">{fmtDe(det, 0)}</span>:
          Der Einheitskreis wird auf sich selbst abgebildet, und ‖Mv‖₂ = ‖v‖₂ ={" "}
          <span className="font-mono">{fmtDe(nv, 3)}</span> – für jeden Winkel und jeden Vektor.
          Genau diese Invarianz erlaubt den Übergang von{" "}
          <M>{"\\left\\| \\bA\\bx - \\bb \\right\\|_2"}</M> zu{" "}
          <M>{"\\left\\| \\bQ\\bA\\bx - \\bQ\\bb \\right\\|_2"}</M>, ohne den Minimierer zu
          verschieben (Lemma 7.4.2 (ii)).
        </Verdikt>
      ) : laengentreu ? (
        <Verdikt kind="warn" className="mt-2" titel="Zufallstreffer, keine Regel:">
          Bei diesem m stimmt ‖Mv‖₂ ausnahmsweise mit ‖v‖₂ überein – aber nur für{" "}
          <em>dieses</em> v. Eine Scherung ist keine Orthogonalmatrix; das sieht man am
          Einheitskreis, aus dem eine Ellipse geworden ist.
        </Verdikt>
      ) : (
        <Verdikt kind="fail" className="mt-2" titel="Nicht längentreu:">
          Ein Eliminationsschritt des Gauß-Verfahrens ist eine Scherung: Aus dem Einheitskreis
          wird eine Ellipse, und ‖Mv‖₂ = <span className="font-mono">{fmtDe(nw, 3)}</span> gegen
          ‖v‖₂ = <span className="font-mono">{fmtDe(nv, 3)}</span>, ein Faktor{" "}
          <span className="font-mono">{fmtDe(nw / nv, 3)}</span>. Auf ein KQ-Problem angewandt
          würde eine solche Transformation den Minimierer <M>{"\\wh{\\bx}"}</M> verschieben –
          det M = 1 hilft dagegen nichts.
        </Verdikt>
      )}
    </div>
  );
}
