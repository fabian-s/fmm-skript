/**
 * Konzept-Widget `null-space`.
 *
 * DIE EINE EINSICHT: Der Nullraum ist eine Richtung, in der die Abbildung
 * blind ist. Wer den Eingabevektor herumdreht, merkt zweierlei: Das Bild
 * landet immer auf ein und derselben Geraden, und in genau einer Richtung
 * schrumpft es auf den Ursprung. Deshalb ist der Kern eine Gerade und kein
 * Pfeil – jedes Vielfache von v tut es genauso.
 *
 * FARBROLLEN: rot = v (der Pfeil in der Hand), blau = Av (durchgezogen) und
 * die Bildgerade (gestrichelt, damit der Pfeil darauf sichtbar bleibt), grau
 * gestrichelt = die gefundene Kerngerade.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18); dessen Schlussabsatz nannte
 * die gesuchten Winkel 135° und 315° und zeichnete die Nullrichtung als
 * Pfeil. Ziehen, Achsen und Geraden kommen aus der Lib-`TransformCanvas`,
 * Suchlogik und Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA3.mjs,
 * 2026-08-19), A = [[1, 1], [1, 1]], v auf dem Einheitskreis:
 *     0°: Av = (1; 1),         ‖Av‖ = 1,4142
 *    45°: Av = (1,414; 1,414), ‖Av‖ = 2      (stärkste Streckung)
 *   135°: Av = (0; 0),         ‖Av‖ = 0      (Kern)
 *   315°: Av = (0; 0),         ‖Av‖ = 0      (Kern, Gegenrichtung)
 * Es gilt exakt ‖Av‖ = 2·|cos(θ − 45°)| (Abweichung 6,7e−16); das Fangfenster
 * ‖Av‖ < 0,1 greift in 132,14°–137,86° und 312,14°–317,86°, also ±2,86° um die
 * Kernrichtung. Kern = span{(1; −1)}, Bild = span{(1; 1)}, und Rang 1 plus
 * Kerndimension 1 ergibt die Spaltenzahl 2.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
  type Mat2,
  type SubspaceLine,
} from "../../lib";

const A: Mat2 = [
  [1, 1],
  [1, 1],
];

export function NullSpaceWidget() {
  // Voreinstellung 60°: v liegt sichtbar neben der Kernrichtung, das Bild ist
  // noch lang – die Ausgangslage der Suche, ohne den Zielwinkel zu verraten.
  const [deg, setDeg] = useState(60);
  const [gefunden, setGefunden] = useState(false);

  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [Math.cos(th), Math.sin(th)];
  const Av: [number, number] = [v[0] + v[1], v[0] + v[1]];
  const laenge = Math.hypot(Av[0], Av[1]);
  const imKern = laenge < 0.1;

  const setzeWinkel = (grad: number) => {
    const g = ((grad % 360) + 360) % 360;
    setDeg(g);
    const t = (g * Math.PI) / 180;
    if (2 * Math.abs(Math.cos(t - Math.PI / 4)) < 0.1) setGefunden(true);
  };

  const geraden: SubspaceLine[] = [
    // Die Bildgerade gestrichelt, damit der durchgezogene Pfeil Av darauf
    // sichtbar bleibt (zwei blaue Linien uebereinander sind ununterscheidbar).
    { dir: [1, 1], color: FMM_COLORS.blau, dash: true },
  ];
  if (gefunden) geraden.push({ dir: [1, -1], color: FMM_COLORS.grau, dash: true, label: "Kern" });

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Drehen wir v, bis sein Bild im Ursprung verschwindet.</Aufgabe>
      <TransformCanvas
        matrix={A}
        size={280}
        worldHalf={3.2}
        showUnitCircle={false}
        lines={geraden}
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true, dragConstraint: "unitCircle" },
          { v: Av, color: FMM_COLORS.blau, label: "Av" },
        ]}
        onVectorChange={(_i, p) => setzeWinkel((Math.atan2(p[1], p[0]) * 180) / Math.PI)}
        ariaLabel={`Der Einheitsvektor v und sein Bild Av unter A; das Bild hat aktuell die Länge ${fmtDe(laenge, 2)}.`}
      />
      <Slider
        label="Richtung von v"
        value={deg}
        onChange={setzeWinkel}
        min={0}
        max={360}
        step={1}
        fmt={(x) => `${fmtDe(x, 0)}°`}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        A = [[1, 1], [1, 1]] ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> v ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Av, blau gestrichelt die
        Bildgerade, grau gestrichelt der gefundene Kern
      </p>
      <Verdikt kind={imKern ? "ok" : "neutral"}>
        Av = ({fmtDe(Av[0], 2)}; {fmtDe(Av[1], 2)}), also ‖Av‖ = {fmtDe(laenge, 2)}.{" "}
        {imKern
          ? "Gefunden: A löscht diese Richtung vollständig aus. Weil A jedes Vielfache von v ebenso auf null schickt, ist der Kern die ganze gestrichelte Gerade und nicht bloß ein Pfeil."
          : "Das Bild liegt auf der blauen Geraden, egal wie wir v drehen: A quetscht die ganze Ebene auf diese eine Gerade. Verschwunden ist v damit aber noch nicht."}
      </Verdikt>
    </div>
  );
}
