/**
 * Konzept-Widget `outer-product`.
 *
 * DIE EINE EINSICHT: Beim äußeren Produkt sind alle Zeilen dasselbe vᵀ, nur
 * unterschiedlich stark skaliert — mit den Einträgen von u als Faktoren. Genau
 * deshalb steckt in der ganzen Matrix nur eine einzige Richtung: Rang 1.
 *
 * FARBROLLEN: blau = die Einträge von u, die zugleich die Zeilenfaktoren sind;
 * grün = die Einträge von v, also die eine Zeile, die sich wiederholt.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18); die
 * Zeilenfaktoren neben der Matrix und das Verdikt sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node,
 * /tmp/claude-1000/-home-fabians-lehre-FMM-fmm-lmu/3a8ca427-1db0-42e8-8398-15672016f929/scratchpad/verify/REV1/OuterProductWidget.mjs,
 * 2026-08-20), Voreinstellung u = (1, 2, 3), v = (4, 5):
 *   uvᵀ = [[4, 5], [8, 10], [12, 15]] (wie auf der Konzeptseite);
 *   Zeile 2 ist genau das 2-fache von Zeile 1, Zeile 3 das 3-fache;
 *   Spalte 2 ist in jeder Zeile das 1,25-fache von Spalte 1 (= 5/4).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, MatrixInput, Verdikt, fmtDe } from "../../lib";

export function OuterWidget() {
  const [u, setU] = useState<number[][]>([[1], [2], [3]]);
  const [v, setV] = useState<number[][]>([[4], [5]]);
  const M = u.map((ur) => v.map((vr) => ur[0] * vr[0]));
  const uNull = u.every((r) => r[0] === 0);
  const vNull = v.every((r) => r[0] === 0);
  const nullmatrix = uNull || vNull;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ändern wir die Einträge und suchen wir zwei Zeilen, die keine Vielfachen voneinander sind.</Aufgabe>
      <div className="mt-1 flex flex-wrap items-end gap-4">
        <div>
          <div className="mb-1 text-xs" style={{ color: FMM_COLORS.blau }}>
            u
          </div>
          <MatrixInput value={u} onChange={setU} step={1} />
        </div>
        <div>
          <div className="mb-1 text-xs" style={{ color: FMM_COLORS.gruen }}>
            v
          </div>
          <MatrixInput value={v} onChange={setV} step={1} />
        </div>
        <div>
          <div className="mb-1 text-xs">uvᵀ</div>
          <MatrixDisplay value={M} />
        </div>
        <div className="text-xs leading-[1.9]" style={{ color: FMM_COLORS.blau }}>
          {u.map((r, i) => (
            <div key={i}>{fmtDe(r[0], 1)} · vᵀ</div>
          ))}
        </div>
      </div>
      <Verdikt kind={nullmatrix ? "warn" : "ok"}>
        {nullmatrix ? (
          <>
            Ist einer der beiden Faktoren der Nullvektor, bleibt nur die Nullmatrix übrig – sie
            hat Rang 0 und ist der einzige Fall, in dem das äußere Produkt keinen Rang 1 hat.
          </>
        ) : (
          <>
            Jede Zeile ist ein Vielfaches derselben Zeile vᵀ (die Faktoren stehen rechts daneben),
            und jede Spalte ein Vielfaches von u. Zwei Zeilen, die keine Vielfachen voneinander
            sind, kann es hier gar nicht geben: die Matrix hat Rang 1, egal welche Zahlen wir
            eintippen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
