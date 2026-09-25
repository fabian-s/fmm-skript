import { useMemo, useState, type CSSProperties } from "react";
import { Aufgabe, FMM_COLORS, MatrixInput, Stepper, Verdikt } from "../../../lib";
import { backSub, fmtNum, MatTable, WidgetLabel } from "./shared";
import { num, ref } from "../../numbers.generated";

/**
 * Rückwärts-Substitutions-Stepper für §5.2: ein kleines oberes Dreieckssystem
 * Ux = c wird zeilenweise von unten nach oben aufgelöst. Farbcode wie im
 * Text (FMM-Palette): blau = aktuelle Zeile, grün = fertige x-Einträge,
 * rot = Diagonalelement (Pivot), durch das dividiert wird.
 *
 * Einsicht: Rückwärtseinsetzen bestimmt die Komponenten von unten nach oben.
 * Farbrollen: Pivot rot, aktuelle Zeile blau, fertige Lösung grün.
 * Provenienz: Trace-Struktur aus heath-ch2 (nur Code), sichtbare Texte neu.
 * Zahlen: x=(2;1;2), 3 Divisionen und 9 Operationen in
 * scripts/verify/R3/widgets-05.mjs und scripts/verify/REV29/05-lgs-Stepper.mjs,
 * 2026-08-29.
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
  // Start bei 1: die tote Ansicht zeigt sonst den Trivialfall (leere x-Spalte,
  // kein Protokoll, kein Verdikt).
  const [t, setT] = useState(1); // wie viele Komponenten schon berechnet sind
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

  // Drei Zustände: Pivot exakt null (Abbruch, oben), Pivot winzig gegen den Rest
  // der Matrix (rechnet weiter, verstärkt aber jeden Fehler) und regulär.
  const skala = Math.max(...U.flat().map((v) => Math.abs(v)), 1e-30);
  const pivotMin = Math.min(...U.map((r, i) => Math.abs(r[i])));
  const winzigesPivot = trace.failRow < 0 && pivotMin / skala < 1e-3;

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
              setT(1);
            }}
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          c =
          <MatrixInput
            value={cIn}
            onChange={(m) => {
              setCIn(m);
              setT(1);
            }}
          />
        </div>
      </div>
      <Stepper step={shown} setStep={setT} max={maxT} narration={`${shown} von ${n} Komponenten bekannt`} />
      <p className="my-1 text-xs" style={{ color: "var(--w-muted)" }}>
        Farben: <span style={{ color: RED, fontWeight: 600 }}>rot</span> das Pivot, durch das
        geteilt wird, <span style={{ color: BLUE, fontWeight: 600 }}>blau</span> die Zeile, die
        gerade an der Reihe ist, <span style={{ color: GREEN, fontWeight: 600 }}>grün</span> die
        fertigen Komponenten.
      </p>
      <div className="my-3 flex flex-wrap items-start gap-5">
        <WidgetLabel label="U | c">
          <MatTable m={aug} cellClass={augClass} cellStyle={augStyle} label="erweiterte Matrix U senkrecht c" />
        </WidgetLabel>
        <WidgetLabel label="x">
          <MatTable m={xCol} cellStyle={xStyle} label="Lösungsvektor x" />
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
            trace.failExakt ? (
              <Verdikt kind="fail" className="mt-2">
                Schritt {trace.failRow + 1} bleibt stecken: Das Diagonalelement dieser Zeile
                ist exakt 0, und Formel ({num("eq:gauss-elimination-mit-partieller")}) verlangt, genau dadurch zu teilen. Bei einer
                Dreiecksmatrix entscheidet allein die Diagonale über die Invertierbarkeit;
                mit einer Null dort verliert das System seine eindeutige Lösung.
              </Verdikt>
            ) : (
              <Verdikt kind="fail" className="mt-2">
                Schritt {trace.failRow + 1} bleibt stecken: Das Diagonalelement dieser Zeile ist
                mit {fmtNum(trace.failPivot)} zwar nicht null, aber so winzig, dass die Division
                jeden Rundungsfehler der Zeile um den Kehrwert aufbläst. Rechnerisch ist das
                System noch eindeutig lösbar, numerisch ist die Lösung wertlos – genau davor
                warnt die Pivot-Demo weiter unten.
              </Verdikt>
            )
          )}
          {trace.failRow < 0 && shown === maxT && maxT > 0 && winzigesPivot && (
            <Verdikt kind="warn" className="mt-2">
              Alle Komponenten stehen, aber das kleinste Pivot ist mit {fmtNum(pivotMin)} winzig
              gegen die übrigen Einträge: Die Division dadurch multipliziert jeden Rundungsfehler
              der Zeile mit rund {fmtNum(skala / pivotMin)}. Zwischen „null" und „winzig" liegt
              genau der Unterschied, um den es in {ref("sec:lgs/lu")} geht.
            </Verdikt>
          )}
          {trace.failRow < 0 && shown === maxT && maxT > 0 && !winzigesPivot && (
            <Verdikt kind="ok" className="mt-2">Alle Komponenten stehen. Formel ({num("eq:gauss-elimination-mit-partieller")}) benötigt hier {trace.lines.length} Divisionen, eine je Zeile; allgemein summieren sich Multiplikationen, Subtraktionen und Divisionen zu n² Operationen, also O(n²).</Verdikt>
          )}
          {trace.failRow < 0 && shown > 0 && shown < maxT && (
            <Verdikt kind="neutral" className="mt-2">
              {shown === 1
                ? "Die letzte Zeile enthält nur eine Unbekannte: eine Division genügt, und die erste Komponente steht (grün)."
                : `Zeile ${current + 1} ist an der Reihe (blau): Die ${shown} bereits bekannten Komponenten werden eingesetzt, es bleibt eine Gleichung in einer Unbekannten, und die Division durch das rote Pivot löst sie.`}
            </Verdikt>
          )}
        </div>
      </div>
    </div>
  );
}
