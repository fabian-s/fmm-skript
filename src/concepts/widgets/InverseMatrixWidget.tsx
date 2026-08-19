/**
 * Konzept-Widget `inverse-matrix`.
 *
 * DIE EINE EINSICHT: Die Inverse ist die Rückfahrkarte. Was A mit einem Punkt
 * anstellt, macht A⁻¹ Punkt für Punkt rückgängig — und zwar für jeden Punkt
 * gleichzeitig, weil auch das Gitter wieder an seinen Platz rückt.
 *
 * FARBROLLEN: rot = der Ausgangspunkt x (links gezogen, rechts wiedergefunden);
 * blau = sein Bild Ax; die beiden Tafeln zeigen dasselbe x aus zwei
 * Blickrichtungen (Muster 4: Nebeneinander statt Umschalten).
 *
 * PROVENIENZ: Zwei-Tafel-Aufbau aus dem Vorgängerwidget (Stand 2026-08-18);
 * Achsen und Ziehen kommen aus der Lib-`TransformCanvas`. Texte neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeB.mjs,
 * 2026-08-19), Scherung A = [[1, s], [0, 1]] mit x = (1, 1):
 *   s = 1    → Ax = (2, 1),   A⁻¹(Ax) = (1, 1), det A = 1
 *   s = −0,5 → Ax = (0,5; 1), A⁻¹(Ax) = (1, 1), det A = 1
 *   s = 2    → Ax = (3, 1),   A⁻¹(Ax) = (1, 1), det A = 1
 * Die Scherung ändert also keine Flächen (det = 1 für jedes s) und ihre
 * Inverse ist die Scherung mit −s.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, M, Slider, TransformCanvas, Verdikt, fmtDe } from "../../lib";

export function ShearUndoWidget() {
  const [s, setS] = useState(1);
  const [x, setX] = useState<[number, number]>([1, 1]);
  const Ax: [number, number] = [x[0] + s * x[1], x[1]];
  const zurueck: [number, number] = [Ax[0] - s * Ax[1], Ax[1]];
  const fehler = Math.hypot(zurueck[0] - x[0], zurueck[1] - x[1]);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir x in der linken Tafel und suchen wir es in der rechten wieder.</Aufgabe>
      <div className="grid grid-cols-2 gap-2">
        <div className="min-w-0">
          <TransformCanvas
            matrix={[
              [1, s],
              [0, 1],
            ]}
            size={150}
            worldHalf={2.6}
            showUnitCircle={false}
            vectors={[
              { v: x, color: FMM_COLORS.rot, label: "x", draggable: true },
              { v: Ax, color: FMM_COLORS.blau, label: "Ax" },
            ]}
            onVectorChange={(_i, v) => setX([v[0], v[1]])}
            ariaLabel={`Die Scherung A schiebt x auf (${fmtDe(Ax[0], 2)}; ${fmtDe(Ax[1], 2)}).`}
          />
          <p className="text-center text-xs">
            <M>{"\\bA"}</M> schert
          </p>
        </div>
        <div className="min-w-0">
          <TransformCanvas
            matrix={[
              [1, -s],
              [0, 1],
            ]}
            size={150}
            worldHalf={2.6}
            showUnitCircle={false}
            vectors={[
              { v: Ax, color: FMM_COLORS.blau, label: "Ax" },
              { v: zurueck, color: FMM_COLORS.rot, label: "A⁻¹Ax" },
            ]}
            ariaLabel={`Die Inverse schert Ax zurück auf (${fmtDe(zurueck[0], 2)}; ${fmtDe(zurueck[1], 2)}).`}
          />
          <p className="text-center text-xs">
            <M>{"\\bA^{-1}"}</M> schert zurück
          </p>
        </div>
      </div>
      <Slider label="Scherung s" value={s} onChange={setS} min={-2} max={2} step={0.05} />
      <Slider label="x₁" value={x[0]} onChange={(v) => setX([v, x[1]])} min={-2.5} max={2.5} step={0.05} accent={FMM_COLORS.rot} />
      <Slider label="x₂" value={x[1]} onChange={(v) => setX([x[0], v])} min={-2.5} max={2.5} step={0.05} accent={FMM_COLORS.rot} />
      <Verdikt kind="ok">
        Aus x = ({fmtDe(x[0], 2)}; {fmtDe(x[1], 2)}) wird Ax = ({fmtDe(Ax[0], 2)};{" "}
        {fmtDe(Ax[1], 2)}), und die Gegenscherung bringt es mit einem Restfehler von{" "}
        {fmtDe(fehler, 3)} zurück. Die Inverse der Scherung mit s ist also schlicht die Scherung
        mit −s; beide haben die Determinante 1 und ändern deshalb keine Flächen.
      </Verdikt>
    </div>
  );
}
