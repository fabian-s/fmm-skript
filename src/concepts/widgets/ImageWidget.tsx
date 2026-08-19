/**
 * Konzept-Widget `image` (Bild / Spaltenraum).
 *
 * DIE EINE EINSICHT: Das Bild ist keine Rechenvorschrift, sondern eine Menge —
 * und bei dieser Rang-1-Matrix ist sie so klein wie möglich, ohne leer zu sein:
 * eine einzige Gerade, auf der jede Ausgabe landet, egal woher wir kommen.
 *
 * FARBROLLEN: rot = der Eingabevektor v, den wir ziehen; blau = seine Ausgabe
 * Av und die Bildgerade span{(1; 0,5)}, auf der sie immer liegt.
 *
 * PROVENIENZ: Aufbau aus dem Vorgängerwidget (Stand 2026-08-18); Achsen,
 * Ziehen und die Gerade als Unterraum kommen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeB.mjs,
 * 2026-08-19), A = [[1, 2], [0,5, 1]]: det A = 0; Ae₁ = (1; 0,5),
 * Ae₂ = (2; 1) = 2·Ae₁, beide Spalten liegen also auf derselben Geraden;
 * A·(2, −1) = (0, 0). Über 12 566 Eingaberichtungen auf dem Kreis mit
 * Radius 1,8 ist der Abstand von Av zur Geraden span{(1; 0,5)} exakt 0.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

const A: [[number, number], [number, number]] = [
  [1, 2],
  [0.5, 1],
];
const BILD: [number, number] = [1, 0.5];

export function ImageWidget() {
  const [v, setV] = useState<[number, number]>([1.5 * Math.cos(0.8), 1.5 * Math.sin(0.8)]);
  const Av: [number, number] = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
  const laengeAv = Math.hypot(Av[0], Av[1]);
  const winkel = Math.atan2(v[1], v[0]);
  const radius = Math.hypot(v[0], v[1]);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir v im Kreis herum und suchen wir eine Ausgabe abseits der blauen Geraden.</Aufgabe>
      <TransformCanvas
        matrix={A}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={3.2}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true },
          { v: Av, color: FMM_COLORS.blau, label: "Av" },
        ]}
        onVectorChange={(_i, nv) => setV([nv[0], nv[1]])}
        lines={[{ dir: BILD, color: FMM_COLORS.blau, label: "Bild(A)" }]}
        ariaLabel={`Der Eingabevektor v und sein Bild Av; Av liegt auf der Geraden durch (1; 0,5), aktuell bei (${fmtDe(Av[0], 2)}; ${fmtDe(Av[1], 2)}).`}
      />
      <Slider
        label="Richtung von v"
        value={winkel}
        onChange={(w) => setV([radius * Math.cos(w), radius * Math.sin(w)])}
        min={-Math.PI}
        max={Math.PI}
        step={0.01}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="Länge von v"
        value={radius}
        onChange={(r) => setV([r * Math.cos(winkel), r * Math.sin(winkel)])}
        min={0.2}
        max={3}
        step={0.05}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Eingabe v ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Ausgabe Av und die Bildgerade
      </p>
      <Verdikt kind={laengeAv < 0.08 ? "warn" : "neutral"}>
        {laengeAv < 0.08 ? (
          <>
            Av ist auf den Ursprung zusammengefallen: v zeigt gerade entlang (2, −1) und damit im
            Kern. Auch die Null gehört zum Bild, sie ist nur der ärmste seiner Punkte.
          </>
        ) : (
          <>
            Av = ({fmtDe(Av[0], 2)}; {fmtDe(Av[1], 2)}) = {fmtDe(Av[0], 2)} · (1; 0,5). Wohin wir
            v auch ziehen, die Ausgabe bleibt auf dieser einen Geraden – beide Spalten von A sind
            Vielfache von (1; 0,5), also spannen sie zusammen nur eine Richtung auf. Das Bild ist
            eindimensional, der Rang ist 1.
          </>
        )}
      </Verdikt>
    </div>
  );
}
