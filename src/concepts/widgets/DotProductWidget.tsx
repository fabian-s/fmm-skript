/**
 * Konzept-Widget für `dot-product` UND `inner-product` (Dublettenauflösung D6,
 * 2026-08-19; das frühere InnerProductWidget ist entfallen).
 *
 * DIE EINE EINSICHT: xᵀy ist keine abstrakte Zahl, sondern eine Länge mal eine
 * Länge — ‖x‖ mal der Länge des Schattens, den y auf die Richtung von x wirft.
 * Kippt der Schatten auf die andere Seite, kippt das Vorzeichen; verschwindet
 * er, stehen die Vektoren senkrecht.
 *
 * FARBROLLEN: blau = der feste Vektor x; rot = der gezogene Vektor y;
 * orange = der Schatten (die Projektion von y auf die Richtung von x) samt
 * dem gestrichelten Lot.
 *
 * PROVENIENZ: Grundaufbau aus den Vorgängerwidgets DotProductWidget und
 * InnerProductWidget (Stand 2026-08-18); Ziehen und Achsen kommen aus der
 * Lib-`TransformCanvas`, die Projektionsdarstellung und alle Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-20; zusätzlich der Projektions-Test), x = (2, 1), ‖x‖ = √5 = 2,2360679775:
 *   y parallel zu x (26,57°, ‖y‖ = 2): xᵀy = 4,4721, Schattenlänge 2,0000, cos = 1
 *   y senkrecht (116,57°):             xᵀy = 0,0000, Schattenlänge 0,0000, cos = 0
 *   y entgegengesetzt (206,57°):       xᵀy = −4,4721, Schattenlänge −2,0000, cos = −1
 *   Voreinstellung 75°, ‖y‖ = 2:       xᵀy = 2,9671, Schattenlänge 1,3269, cos = 0,6635
 * Die Identität xᵀy = ‖x‖ · Schattenlänge stimmt über 5760 geprüfte
 * Winkel/Längen-Paare bis auf 8,9e−16.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];
const X: [number, number] = [2, 1];
const NX = Math.hypot(X[0], X[1]);

export function DotProductWidget() {
  // Voreinstellung 75°: y steht deutlich schräg zu x, damit Schatten, x und y
  // im Bild getrennt sichtbar sind (bei 26,57° lägen alle drei übereinander).
  const [y, setY] = useState<[number, number]>([
    2 * Math.cos((75 * Math.PI) / 180),
    2 * Math.sin((75 * Math.PI) / 180),
  ]);

  const laenge = Math.hypot(y[0], y[1]);
  const winkelGrad = ((Math.atan2(y[1], y[0]) * 180) / Math.PI + 360) % 360;
  const dot = X[0] * y[0] + X[1] * y[1];
  const schatten = dot / NX; // vorzeichenbehaftete Länge der Projektion
  const cos = laenge > 1e-9 ? dot / (NX * laenge) : 0;
  // Fußpunkt der Projektion auf die Gerade durch x
  const p: [number, number] = [(schatten / NX) * X[0], (schatten / NX) * X[1]];

  const setzeAus = (grad: number, r: number) => {
    const th = (grad * Math.PI) / 180;
    setY([r * Math.cos(th), r * Math.sin(th)]);
  };

  const fastNull = Math.abs(dot) < 0.12;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir y, bis sein Schatten auf x verschwindet.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={IDENT}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={3}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v: X, color: FMM_COLORS.blau, label: "x" },
          { v: y, color: FMM_COLORS.rot, label: "y", draggable: true },
        ]}
        onVectorChange={(_i, v) => setY([v[0], v[1]])}
        lines={[{ dir: X, color: FMM_COLORS.blau, dash: true }]}
        overlay={(toPx) => {
          const [x0, y0] = toPx(0, 0);
          const [xp, yp] = toPx(p[0], p[1]);
          const [xy, yy] = toPx(y[0], y[1]);
          // Der Schatten liegt auf der Geraden durch x; damit der blaue Pfeil x
          // sichtbar bleibt, zeichnen wir ihn 7 px daneben als Messbalken.
          const lx = X[0];
          const ly = X[1];
          const norm = Math.hypot(lx, ly);
          const ox = (-ly / norm) * 7;
          const oy = (-lx / norm) * 7;
          return (
            <g pointerEvents="none">
              <line x1={xy} y1={yy} x2={xp + ox} y2={yp + oy} stroke={FMM_COLORS.orange} strokeWidth={1.2} strokeDasharray="4 3" />
              <line
                x1={x0 + ox}
                y1={y0 + oy}
                x2={xp + ox}
                y2={yp + oy}
                stroke={FMM_COLORS.orange}
                strokeWidth={4}
                strokeOpacity={0.9}
              />
            </g>
          );
        }}
        ariaLabel={`Der feste Vektor x gleich (2, 1) und der ziehbare Vektor y; die Länge des Schattens von y auf x beträgt ${fmtDe(schatten, 2)}.`}
      />
      <Slider
        label="Winkel von y"
        value={winkelGrad}
        onChange={(g) => setzeAus(g, laenge)}
        min={0}
        max={360}
        step={1}
        fmt={(v) => `${fmtDe(v, 0)}°`}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="Länge von y"
        value={laenge}
        onChange={(r) => setzeAus(winkelGrad, r)}
        min={0.3}
        max={3}
        step={0.05}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> x = (2, 1) ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> y ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Schatten von y auf x
      </p>
      <Verdikt kind={fastNull ? "ok" : "neutral"}>
        xᵀy = {fmtDe(dot, 2)} = ‖x‖ · {fmtDe(schatten, 2)}, also ‖x‖ mal Schattenlänge; cos θ ={" "}
        {fmtDe(cos, 2)}.{" "}
        {fastNull
          ? "Der Schatten ist zusammengeschrumpft: y steht senkrecht auf x, und genau dann verschwindet das Skalarprodukt."
          : dot > 0
            ? "Der Schatten fällt in Richtung von x, das Skalarprodukt ist positiv: der Winkel ist kleiner als 90°."
            : "Der Schatten fällt der Richtung von x entgegen, das Skalarprodukt wird negativ: der Winkel ist größer als 90°."}
      </Verdikt>
    </div>
  );
}
