import { useMemo, useState, type CSSProperties } from "react";
import { MatrixInput } from "../../../lib";
import { backSub, MatTable, WidgetLabel } from "./shared";

/**
 * Rückwärts-Substitutions-Stepper für §5.2: ein kleines oberes Dreieckssystem
 * Ux = c wird zeilenweise von unten nach oben aufgelöst. Farbcode wie im
 * Text (FMM-Palette): blau = aktuelle Zeile, grün = fertige x-Einträge,
 * rot = Diagonalelement (Pivot), durch das dividiert wird.
 *
 * Tabellen-Renderer und Substitutions-Tracer sind aus dem LUStepper der
 * privaten heath-ch2-App portiert (nur Code; alle Texte neu); sie liegen
 * gemeinsam mit den anderen Kapitel-5-Steppern in shared.tsx.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const RED = "#D55E00";

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
      <p className="text-sm">
        Lösen wir das gestaffelte System <span className="font-mono">Ux = c</span> von unten
        nach oben. Jeder Klick berechnet eine weitere Unbekannte: die{" "}
        <span style={{ color: BLUE, fontWeight: 600 }}>blaue Zeile</span> ist dran, ihr{" "}
        <span style={{ color: RED, fontWeight: 600 }}>rotes Diagonalelement</span> ist der
        Divisor, und schon berechnete Komponenten erscheinen{" "}
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span>. Die Einträge von{" "}
        <span className="font-mono">U</span> und <span className="font-mono">c</span> lassen
        sich editieren (unterhalb der Diagonalen bleibt alles null); mit einer Null auf der
        Diagonalen sehen wir den singulären Fall.
      </p>
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
      <div className="my-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40"
          onClick={() => setT((v) => Math.max(0, v - 1))}
          disabled={shown === 0}
        >
          ◀ zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800"
          onClick={() => setT((v) => Math.min(maxT, v + 1))}
          disabled={shown >= maxT}
        >
          nächste Unbekannte ▶
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setT(0)}
        >
          zurücksetzen
        </button>
        <span className="text-sm" style={{ color: "#64748b" }}>
          {shown} von {n} Komponenten bekannt
        </span>
      </div>
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
            <p className="mt-2 text-sm" style={{ color: RED }}>
              Schritt {trace.failRow + 1} bleibt stecken: Das Diagonalelement dieser Zeile
              ist 0, und Formel (5.2.1) verlangt, genau dadurch zu teilen. Bei einer
              Dreiecksmatrix entscheidet allein die Diagonale über die Invertierbarkeit;
              mit einer Null dort verliert das System seine eindeutige Lösung.
            </p>
          )}
          {trace.failRow < 0 && shown === maxT && maxT > 0 && (
            <p className="mt-2 text-sm">
              Alle Komponenten stehen. Zählen wir nach: Zeile i setzt n−i bekannte Werte
              ein (je eine Multiplikation und Subtraktion) und teilt einmal durch ihr
              Diagonalelement — macht n(n−1)/2 Multiplikationen, ebenso viele
              Subtraktionen und n Divisionen, zusammen exakt n² Operationen: das O(n²)
              aus dem Quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
