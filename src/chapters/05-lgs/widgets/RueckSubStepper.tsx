import { useMemo, useState, type CSSProperties } from "react";
import { Aufgabe, FMM_COLORS, MatrixInput, Stepper, Verdikt } from "../../../lib";
import { backSub, MatTable, WidgetLabel } from "./shared";
import { num } from "../../numbers.generated";

/**
 * Rückwärts-Substitutions-Stepper für §5.2: ein kleines oberes Dreieckssystem
 * Ux = c wird zeilenweise von unten nach oben aufgelöst. Farbcode wie im
 * Text (FMM-Palette): blau = aktuelle Zeile, grün = fertige x-Einträge,
 * rot = Diagonalelement (Pivot), durch das dividiert wird.
 *
 * Einsicht: Rückwärtseinsetzen bestimmt die Komponenten von unten nach oben.
 * Farbrollen: Pivot rot, aktuelle Zeile blau, fertige Lösung grün.
 * Provenienz: Trace-Struktur aus heath-ch2 (nur Code), sichtbare Texte neu.
 * Zahlen: x=(2;1;2), 3 Divisionen und 9 Operationen in verify-05-lgs/verify.mjs, 2026-08-19.
 */

const { blau: BLUE, gruen: GREEN, rot: RED } = FMM_COLORS;

/** Der Stepper: Standardbeispiel ist das 3×3-System aus dem Text (x = (2,1,2)). */
export function RueckSubStepper() {
  const [U, setU] = useState<number[][]>([
    [2, 1, -1],
    [0, 3, 2],
    [0, 0, 2],
  ]);
  const [cIn, setCIn] = useState<number[][]>([[3], [7], [4]]);
  const [t, setT] = useState(0); // wie viele Komponenten schon berechnet sind
  const n = 3;
  const c = cIn.map((r) => r[0]);
  const trace = useMemo(() => backSub(U, c), [U, cIn]); // eslint-disable-line react-hooks/exhaustive-deps
  const maxT = trace.lines.length;
  const shown = Math.min(t, maxT);
  const solvedFrom = n - shown; // Zeilenindex, ab dem alles gelöst ist
  const current = solvedFrom - 1; // die als Nächstes dranstehende Zeile
  const aug = U.map((r, i) => [...r, c[i]]);

  const augClass = (_i: number, j: number) =>
    j === n ? "ml-1 border-l border-slate-400 pl-1" : "";
  const augStyle = (i: number, j: number): CSSProperties | undefined => {
    if (i >= solvedFrom) return { background: GREEN + "26" }; // fertige Zeilen
    if (i === current && shown < maxT) {
      // aktuelle Zeile blau; ihr Diagonalelement (Pivot der Division) rot
      if (j === i) return { background: RED + "33", fontWeight: 600 };
      return { background: BLUE + "26" };
    }
    return undefined;
  };

  const xCol: (number | null)[][] = trace.x.map((v, i) => [i >= solvedFrom ? v : null]);
  const xStyle = (i: number, _j: number): CSSProperties | undefined =>
    i >= solvedFrom ? { color: GREEN, fontWeight: 600 } : undefined;

  return (
    <div>
      <Aufgabe>Schieben wir den Regler bis zur letzten Zeile und verfolgen die Divisionen.</Aufgabe>
      <div className="my-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          U =
          <MatrixInput
            value={U}
            onChange={(m) => {
              setU(m.map((r, i) => r.map((v, j) => (j < i ? 0 : v))));
              setT(0);
            }}
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          c =
          <MatrixInput
            value={cIn}
            onChange={(m) => {
              setCIn(m);
              setT(0);
            }}
          />
        </div>
      </div>
      <Stepper step={shown} setStep={setT} max={maxT} narration={`${shown} von ${n} Komponenten bekannt`} />
      <div className="my-3 flex flex-wrap items-start gap-5">
        <WidgetLabel label="U | c">
          <MatTable m={aug} cellClass={augClass} cellStyle={augStyle} />
        </WidgetLabel>
        <WidgetLabel label="x">
          <MatTable m={xCol} cellStyle={xStyle} />
        </WidgetLabel>
        <div className="grow">
          {shown > 0 && (
            <div className="rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800">
              {trace.lines.slice(0, shown).map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          )}
          {trace.failRow >= 0 && shown >= maxT && (
            <Verdikt kind="fail" className="mt-2">
              Schritt {trace.failRow + 1} bleibt stecken: Das Diagonalelement dieser Zeile
              ist 0, und Formel ({num("eq:gauss-elimination-mit-partieller")}) verlangt, genau dadurch zu teilen. Bei einer
              Dreiecksmatrix entscheidet allein die Diagonale über die Invertierbarkeit;
              mit einer Null dort verliert das System seine eindeutige Lösung.
            </Verdikt>
          )}
          {trace.failRow < 0 && shown === maxT && maxT > 0 && (
            <Verdikt kind="ok" className="mt-2">Alle Komponenten stehen. Formel ({num("eq:gauss-elimination-mit-partieller")}) benötigt hier drei Divisionen; allgemein summieren sich Multiplikationen, Subtraktionen und Divisionen zu n² Operationen, also O(n²).</Verdikt>
          )}
        </div>
      </div>
    </div>
  );
}
