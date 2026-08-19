/**
 * Konzept-Widget `matrix-inverse`.
 *
 * DIE EINE EINSICHT: Die Inverse ist keine Formel, die immer greift. Sie hängt
 * an der Determinante im Nenner — und sobald die zweite Zeile ein Vielfaches
 * der ersten wird, ist sie null und es gibt keine Inverse mehr.
 *
 * FARBROLLEN: orange = die Determinante, an der alles hängt; grün = die Probe
 * A·A⁻¹, die die Einheitsmatrix ergeben muss; rot = der singuläre Fall.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18); die
 * handgebaute Ergebnismatrix ist durch die Lib-`MatrixDisplay` ersetzt, die
 * Probe A·A⁻¹ ist neu. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C1/check-gruppeE.mjs,
 * 2026-08-19), Voreinstellung A = [[2, 1], [1, 1]]: det A = 1,
 * A⁻¹ = [[1, −1], [−1, 2]], und A·A⁻¹ = [[1, 0], [0, 1]] exakt. Das ist genau
 * die Probe, die auf der Konzeptseite steht.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MatrixDisplay, MatrixInput, Verdikt, fmtDe } from "../../lib";

export function InverseWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [1, 1],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const singulaer = Math.abs(det) < 1e-9;
  const inv = singulaer
    ? null
    : [
        [m[1][1] / det, -m[0][1] / det],
        [-m[1][0] / det, m[0][0] / det],
      ];
  const probe = inv
    ? [
        [m[0][0] * inv[0][0] + m[0][1] * inv[1][0], m[0][0] * inv[0][1] + m[0][1] * inv[1][1]],
        [m[1][0] * inv[0][0] + m[1][1] * inv[1][0], m[1][0] * inv[0][1] + m[1][1] * inv[1][1]],
      ]
    : null;
  const fastSingulaer = !singulaer && Math.abs(det) < 0.2;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Machen wir die zweite Zeile zu einem Vielfachen der ersten.</Aufgabe>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <MatrixInput value={m} onChange={setM} step={1} />
        <span className="font-mono text-xs" style={{ color: FMM_COLORS.orange }}>
          det = {fmtDe(det, 2)}
        </span>
        {inv && <MatrixDisplay value={inv} />}
      </div>
      {probe && (
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono">Probe A·A⁻¹ =</span>
          <MatrixDisplay value={probe.map((r) => r.map((v) => (Math.abs(v) < 1e-12 ? 0 : v)))} />
        </div>
      )}
      <Verdikt kind={singulaer ? "fail" : fastSingulaer ? "warn" : "ok"}>
        {singulaer ? (
          <>
            det A = 0: die Formel für die Inverse hätte hier eine Null im Nenner, und tatsächlich
            gibt es keine. Die beiden Zeilen tragen dieselbe Information, also lässt sich aus dem
            Ergebnis die Eingabe nicht mehr zurückrechnen.
          </>
        ) : fastSingulaer ? (
          <>
            Die Inverse existiert noch, aber det A = {fmtDe(det, 2)} ist winzig, und alle vier
            Einträge von A⁻¹ werden dadurch geteilt: schon eine kleine Änderung an A wirft die
            Inverse weit herum. Die Probe A·A⁻¹ liefert trotzdem die Einheitsmatrix.
          </>
        ) : (
          <>
            Die Probe A·A⁻¹ ergibt die Einheitsmatrix – beide Matrizen machen einander also
            wirklich rückgängig. Solange det A = {fmtDe(det, 2)} von null wegbleibt, geht das gut.
          </>
        )}
      </Verdikt>
    </div>
  );
}
