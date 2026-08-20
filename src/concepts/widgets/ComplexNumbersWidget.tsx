/**
 * Konzept-Widget `complex-numbers`.
 *
 * DIE EINE EINSICHT: Eine komplexe Zahl ist ein Punkt der Ebene, und die drei
 * Operationen, die wir brauchen, sind reine Geometrie: mit i multiplizieren
 * dreht um 90°, konjugieren spiegelt an der reellen Achse, und der Betrag ist
 * schlicht die Pfeillänge.
 *
 * FARBROLLEN: rot = z (der Pfeil in der Hand), blau = i·z (die Vierteldrehung,
 * zugleich die Farbe des Bildgitters unter der Multiplikation mit i),
 * orange = die Konjugierte z̄.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18, drei feste Pfeile plus zwei
 * Regler). Ziehen, Achsen und Bildgitter kommen aus der Lib-`TransformCanvas`;
 * die Texte sind neu und der erklärende Absatz ist in `complex-numbers.mdx`
 * gewandert (Spoiler-Split).
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19), Voreinstellung z = 2 + 1i:
 *   |z| = 2,2361, arg z = 26,57°, i·z = (−1; 2), z̄ = (2; −1), z·z̄ = 5 = |z|².
 * Über 3600 geprüfte z gilt exakt (Abweichung 0,0e0): zᵀ(i·z) = 0, also stehen
 * z und i·z immer senkrecht aufeinander, und |i·z| = |z|.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  maxAbsCoord,
} from "../../lib";

/** Multiplikation mit i: (a + bi) ↦ (−b + ai), also eine Vierteldrehung. */
const MAL_I: [[number, number], [number, number]] = [
  [0, -1],
  [1, 0],
];

export function ComplexPlaneWidget() {
  // Voreinstellung 2 + 1i: alle drei Pfeile zeigen in verschiedene Quadranten,
  // damit Drehung und Spiegelung im Bild getrennt sichtbar sind.
  const [z, setZ] = useState<[number, number]>([2, 1]);
  const [a, b] = z;

  const iz: [number, number] = [-b, a];
  const zbar: [number, number] = [a, -b];
  const betrag = Math.hypot(a, b);
  const half = Math.max(2.2, maxAbsCoord(z, iz, zbar) * 1.25);

  const reell = Math.abs(b) < 0.06;
  const imaginaer = Math.abs(a) < 0.06;
  const null_ = betrag < 0.08;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir z herum und behalten den blauen Pfeil im Auge.</Aufgabe>
      <LabeledTransformCanvas
        matrix={MAL_I}
        size={280}
        worldHalf={half}
        showUnitCircle={false}
        xLabel="Re"
        yLabel="Im"
        vectors={[
          { v: z, color: FMM_COLORS.rot, label: "z", draggable: true },
          { v: iz, color: FMM_COLORS.blau, label: "i·z" },
          { v: zbar, color: FMM_COLORS.orange, label: "z̄" },
        ]}
        onVectorChange={(_i, v) => setZ([v[0], v[1]])}
        ariaLabel={`Die komplexe Ebene mit z gleich ${fmtDe(a, 1)} plus ${fmtDe(b, 1)} i, dem um 90 Grad gedrehten i mal z und der an der reellen Achse gespiegelten Konjugierten.`}
      />
      <Slider
        label="Re z = a"
        value={a}
        onChange={(v) => setZ([v, b])}
        min={-2.5}
        max={2.5}
        step={0.1}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="Im z = b"
        value={b}
        onChange={(v) => setZ([a, v])}
        min={-2.5}
        max={2.5}
        step={0.1}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> z ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> i·z ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> z̄ · das blasse Gitter
        ist die Ebene nach Multiplikation mit i
      </p>
      <Verdikt kind={null_ ? "warn" : "neutral"}>
        {null_ ? (
          "z = 0: alle drei Pfeile schrumpfen auf den Ursprung. Die Null ist der einzige Punkt, den Drehung und Spiegelung nicht bewegen."
        ) : (
          <>
            z = {fmtDe(a, 1)} {b < 0 ? "−" : "+"} {fmtDe(Math.abs(b), 1)}i, |z| ={" "}
            {fmtDe(betrag, 2)}, z·z̄ = {fmtDe(betrag * betrag, 2)} = |z|².{" "}
            {reell
              ? "Der Imaginärteil ist null: z ist reell, deshalb fällt z̄ mit z zusammen, und i·z steht senkrecht darauf auf der imaginären Achse."
              : imaginaer
                ? "Der Realteil ist null: z ist rein imaginär, z̄ = −z, und i·z landet auf der reellen Achse."
                : "Der blaue Pfeil ist der rote, um eine Vierteldrehung gegen den Uhrzeigersinn weitergedreht; die orange Konjugierte ist sein Spiegelbild an der reellen Achse. Beide sind genauso lang wie z."}
          </>
        )}
      </Verdikt>
    </div>
  );
}
