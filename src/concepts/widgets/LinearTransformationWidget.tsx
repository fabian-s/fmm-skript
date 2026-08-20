/**
 * Konzept-Widget `linear-transformation`.
 *
 * DIE EINE EINSICHT: So verschieden Drehung, Scherung, Streckung und Kollaps
 * aussehen, sie hinterlassen denselben Fingerabdruck: gerade, gleichmäßig
 * verteilte Gitterlinien und ein Ursprung, der liegen bleibt. Genau das
 * bedeutet Linearität, und mehr Formen als diese vier Grundtypen gibt es in
 * der Ebene nicht.
 *
 * FARBROLLEN: rot = Ae₁ (erste Spalte), grün = Ae₂ (zweite Spalte), blau = das
 * Bild von Gitter und Einheitskreis (Lib-Vorgabe).
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) bot nur vier nackte Regler,
 * also einen Sandkasten ohne Fragestellung. Neu sind die vier kuratierten
 * Presets mit weichem Übergang, der Spalten-Drag (Lib-`TransformCanvas`,
 * `columnsDraggable`) und das typabhängige Verdikt; die Regler bleiben als
 * Doppelpfad.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA3.mjs,
 * 2026-08-19):
 *   Drehung   [[0,8; −0,6], [0,6; 0,8]] det = 1,00, σmax = σmin = 1, Spalten
 *             orthonormal, Drehwinkel 36,87°
 *   Scherung  [[1; 0,8], [0; 1]]        det = 1,00, σmax = 1,477, σmin = 0,677
 *   Streckung [[1,6; 0], [0; 0,6]]      det = 0,96, σmax = 1,600, σmin = 0,600
 *   singulär  [[1; 0,5], [2; 1]]        det = 0,   σmax = 2,500, σmin = 0
 * Kontrolle der Linearität an der Scherung: A(0; 0) = (0; 0) und
 * A(2·(1; 1)) = (3,6; 2) = 2·A(1; 1); Ae₁ und Ae₂ sind exakt die Spalten.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  sigmaMax,
  W_BUTTON,
  W_BUTTON_AKTIV,
  type Mat2,
} from "../../lib";

const PRESETS: { id: string; label: string; m: Mat2 }[] = [
  { id: "drehung", label: "Drehung", m: [[0.8, -0.6], [0.6, 0.8]] },
  { id: "scherung", label: "Scherung", m: [[1, 0.8], [0, 1]] },
  { id: "streckung", label: "Streckung", m: [[1.6, 0], [0, 0.6]] },
  { id: "singulaer", label: "Kollaps", m: [[1, 0.5], [2, 1]] },
];

const gleich = (m: Mat2, n: Mat2) =>
  Math.abs(m[0][0] - n[0][0]) < 1e-9 &&
  Math.abs(m[0][1] - n[0][1]) < 1e-9 &&
  Math.abs(m[1][0] - n[1][0]) < 1e-9 &&
  Math.abs(m[1][1] - n[1][1]) < 1e-9;

export function LinearMapWidget() {
  // Voreinstellung = Preset „Drehung": eine Abbildung, die das Gitter sichtbar
  // verdreht, ohne es zu verzerren – die reinste Form des Fingerabdrucks.
  const [m, setM] = useState<Mat2>(PRESETS[0].m);
  const [uebergang, setUebergang] = useState(0);

  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const s1 = sigmaMax(m);
  const singulaer = Math.abs(det) < 0.02;
  const spaltenOrthonormal =
    Math.abs(m[0][0] * m[0][1] + m[1][0] * m[1][1]) < 0.02 &&
    Math.abs(Math.hypot(m[0][0], m[1][0]) - 1) < 0.02 &&
    Math.abs(Math.hypot(m[0][1], m[1][1]) - 1) < 0.02;
  const diagonal = Math.abs(m[0][1]) < 0.02 && Math.abs(m[1][0]) < 0.02;

  const setzeEintrag = (i: number, j: number, wert: number) => {
    setUebergang(0);
    setM((alt) => {
      const neu: Mat2 = [[alt[0][0], alt[0][1]], [alt[1][0], alt[1][1]]];
      neu[i][j] = wert;
      return neu;
    });
  };

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Vergleichen wir die vier Grundtypen und suchen, was allen gemeinsam
        bleibt.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={m}
        size={280}
        worldHalf={Math.max(3.2, 1.2 * s1)}
        transitionMs={uebergang}
        columnsDraggable
        onMatrixChange={(neu) => {
          setUebergang(0);
          setM(neu);
        }}
        ariaLabel={`Das Bild des Gitters und des Einheitskreises unter A; die Determinante beträgt ${fmtDe(det, 2)}.`}
      />
      <div className="mt-1 flex flex-wrap gap-1" role="group" aria-label="Grundtypen">
        {PRESETS.map((p) => {
          const aktiv = gleich(m, p.m);
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={aktiv}
              className={aktiv ? W_BUTTON_AKTIV : W_BUTTON}
              onClick={() => {
                setUebergang(250);
                setM(p.m);
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <Slider label="a" value={m[0][0]} onChange={(v) => setzeEintrag(0, 0, v)} min={-2} max={2} step={0.1} accent={FMM_COLORS.rot} />
      <Slider label="b" value={m[0][1]} onChange={(v) => setzeEintrag(0, 1, v)} min={-2} max={2} step={0.1} accent={FMM_COLORS.gruen} />
      <Slider label="c" value={m[1][0]} onChange={(v) => setzeEintrag(1, 0, v)} min={-2} max={2} step={0.1} accent={FMM_COLORS.rot} />
      <Slider label="d" value={m[1][1]} onChange={(v) => setzeEintrag(1, 1, v)} min={-2} max={2} step={0.1} accent={FMM_COLORS.gruen} />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        A = [[{fmtDe(m[0][0], 1)}; {fmtDe(m[0][1], 1)}], [{fmtDe(m[1][0], 1)};{" "}
        {fmtDe(m[1][1], 1)}]] ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Ae₁ (Spalte a, c) ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> Ae₂ (Spalte b, d)
      </p>
      <Verdikt kind={singulaer ? "warn" : "neutral"}>
        det A = {fmtDe(det, 2)}.{" "}
        {singulaer
          ? "Die Spalten liegen auf einer Geraden: die Ebene wird plattgedrückt. Auch dieser Kollaps ist linear, das Bildgitter besteht weiter aus gleichmäßig verteilten Punkten auf einer Geraden."
          : spaltenOrthonormal
            ? "Die beiden Spalten stehen senkrecht aufeinander und haben Länge 1: eine reine Drehung, Längen und Winkel bleiben erhalten."
            : diagonal
              ? "Die Nebendiagonale ist null: jede Achse wird für sich gestreckt, das Gitter bleibt achsenparallel."
              : "Die Gitterzellen sind zu Parallelogrammen gekippt, aber die Gitterlinien bleiben gerade, parallel und gleichmäßig verteilt."}{" "}
        Der Ursprung bleibt in jedem der vier Fälle liegen: das ist der
        Fingerabdruck einer linearen Abbildung.
      </Verdikt>
    </div>
  );
}
