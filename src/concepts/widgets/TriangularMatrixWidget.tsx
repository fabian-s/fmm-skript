/**
 * Konzept-Widget `triangular-matrix`.
 *
 * DIE EINE EINSICHT: Die Seite, auf der die Nullen stehen, legt die
 * Einsetzrichtung fest. Bei der oberen Dreiecksmatrix steht die einzige
 * Gleichung mit nur einer Unbekannten ganz unten, bei der unteren ganz oben.
 *
 * FARBROLLEN: blau = frei besetzbare Einträge; neutral = die erzwungenen
 * Nullen. Farbe trägt hier keine zusätzliche Bedeutung — das Zeichen (∗ bzw. 0)
 * sagt dasselbe noch einmal.
 *
 * PROVENIENZ: Nullmuster aus der Vorfassung (Stand 2026-08-19); die
 * Kurspalette, der Legenden- und Verdikt-Rahmen und die Seiten-an-Seite-Hülle
 * (vorher in der .mdx) sind neu.
 *
 * Es ist eine statische Vergleichsfigur (Pattern 4): zwei Besetzungsmuster
 * nebeneinander, keine Koordinatenbilder. Achsen mit Ticks gibt es deshalb
 * nicht; Zeilen- und Spaltenindex sind die Rasterposition selbst.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * eine 5×5-Dreiecksmatrix hat n(n+1)/2 = 15 frei besetzbare Einträge und
 * n² − 15 = 10 erzwungene Nullen.
 */
import { FMM_COLORS, Verdikt, W_MUTED } from "../../lib";

const N = 5;

/** Statisches Nullmuster-Diagramm: obere oder untere Dreiecksmatrix, 5×5. */
export function TriPattern({ lower, caption }: { lower: boolean; caption: string }) {
  const zellen = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const frei = lower ? j <= i : j >= i;
      zellen.push(
        <div
          key={`${i}-${j}`}
          className="flex h-6 w-6 items-center justify-center rounded-sm font-mono text-[10px]"
          style={
            frei
              ? { backgroundColor: FMM_COLORS.blau, color: "#ffffff" }
              : { backgroundColor: "var(--w-grid)", color: "var(--w-muted)" }
          }
        >
          {frei ? "∗" : "0"}
        </div>,
      );
    }
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="inline-grid gap-0.5 rounded border-x-2 p-1"
        style={{ gridTemplateColumns: `repeat(${N}, 1.5rem)`, borderColor: "var(--w-border)" }}
        role="img"
        aria-label={`${caption}: die Nullen stehen ${lower ? "oberhalb" : "unterhalb"} der Hauptdiagonale.`}
      >
        {zellen}
      </div>
      <span className={`text-xs ${W_MUTED}`}>{caption}</span>
    </div>
  );
}

export function TriangularMatrixWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-3">
      <div className="flex flex-wrap justify-center gap-6">
        <TriPattern lower={false} caption="obere Dreiecksmatrix" />
        <TriPattern lower caption="untere Dreiecksmatrix" />
      </div>
      <p className={`mt-2 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> frei besetzbar (∗) · neutral: erzwungene
        Null
      </p>
      <Verdikt>
        Beide Muster haben 15 freie Einträge und 10 erzwungene Nullen – gespiegelt an der
        Hauptdiagonale. Links steht die Zeile mit nur einer Unbekannten unten, rechts oben: darum
        läuft das Einsetzen links rückwärts und rechts vorwärts.
      </Verdikt>
    </div>
  );
}
