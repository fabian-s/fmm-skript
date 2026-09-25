import { useMemo, useState, type CSSProperties } from "react";
import { Aufgabe, FMM_COLORS, MatrixInput, Stepper, Verdikt } from "../../../lib";
import { fmtNum, MatTable, sub, WidgetLabel } from "./shared";
import { ref } from "../../numbers.generated";

/**
 * Cholesky-Stepper für §5.4: die Zerlegung A = LLᵀ entsteht Eintrag für
 * Eintrag per Koeffizientenvergleich (spaltenweise, wie im 2×2-Beispiel des
 * Texts). Farbcode wie im Kapitel (FMM-Palette): rot = der Eintrag von A,
 * der gerade verglichen wird, blau = der Eintrag von L, nach dem wir
 * auflösen, grün = fertige L-Einträge.
 *
 * Einsicht: Cholesky bestimmt L spaltenweise und scheitert an einer nicht-SPD-Matrix.
 * Farbrollen: A-Eintrag/Pivot rot, gesuchter Eintrag blau, fertige L-Einträge grün.
 * Provenienz: Trace-Muster aus heath-ch2 (nur Code), sichtbare Texte neu.
 * Zahlen: Standardmatrix L=(2,0,0;1,3,0;−1,1,2), Rest 0 in
 * scripts/verify/REV29/05-lgs-Stepper.mjs, 2026-08-29.
 *
 * DREI-ZUSTANDS-REGEL beim Abbruch: s < 0 (nicht positiv semidefinit),
 * s = 0 exakt (positiv semidefinit, aber nicht definit) und 0 < s < 1e−12
 * (numerisch nicht mehr unterscheidbar) bekommen je einen eigenen Text.
 */

const { blau: BLUE, gruen: GREEN, rot: RED } = FMM_COLORS;

/** Residuen als Mantisse · 10^Exponent: „0,000" könnte 4·10⁻⁴ verstecken. */
function fmtExp(v: number): string {
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v)));
  return `${fmtNum(v / 10 ** e)} · 10^${e}`;
}

interface CholStep {
  i: number; // Zeile des L-Eintrags (0-basiert)
  j: number; // Spalte des L-Eintrags
  line: string; // druckbare Formelzeile
  value: number; // NaN im Abbruchschritt
}

/**
 * Spaltenweiser Koeffizientenvergleich: erst l_jj = √(a_jj − Σ l_jk²),
 * dann l_ij = (a_ij − Σ l_ik l_jk)/l_jj für i > j. Bricht ab, sobald unter
 * einer Wurzel nichts Positives mehr steht (Matrix nicht positiv definit).
 */
function cholTrace(A: number[][]): {
  steps: CholStep[];
  fail: { msg: string } | null;
} {
  const n = A.length;
  const L: number[][] = A.map(() => new Array(n).fill(0));
  const steps: CholStep[] = [];
  for (let j = 0; j < n; j++) {
    let s = A[j][j];
    let terms = "";
    for (let k = 0; k < j; k++) {
      s -= L[j][k] * L[j][k];
      terms += ` − (${fmtNum(L[j][k])})²`;
    }
    if (!(s > 1e-12)) {
      steps.push({
        i: j,
        j,
        line: `l${sub(j + 1)}${sub(j + 1)} = √(${fmtNum(A[j][j])}${terms}) = √(${fmtNum(s)})  ✗`,
        value: NaN,
      });
      const msg =
        s < 0
          ? `Unter der Wurzel steht ${fmtNum(s)} < 0: Die eingegebene Matrix ist nicht einmal positiv semidefinit, eine Cholesky-Zerlegung existiert nicht.`
          : s === 0
            ? `Unter der Wurzel steht exakt 0: Die Matrix ist positiv semidefinit, aber nicht positiv definit. Das reelle l${sub(j + 1)}${sub(j + 1)} = 0 gäbe es zwar, doch die nächste Spalte müsste durch null teilen – genau die Lücke, die die pivotierte Cholesky-Variante schließt.`
            : `Unter der Wurzel steht ${fmtNum(s)}: positiv, aber so winzig, dass die folgende Division jeden Rundungsfehler aufbläst. Numerisch ist die Matrix von einer semidefiniten nicht mehr zu unterscheiden.`;
      return { steps, fail: { msg } };
    }
    L[j][j] = Math.sqrt(s);
    steps.push({
      i: j,
      j,
      line: `l${sub(j + 1)}${sub(j + 1)} = √(${fmtNum(A[j][j])}${terms}) = ${fmtNum(L[j][j])}`,
      value: L[j][j],
    });
    for (let i = j + 1; i < n; i++) {
      let t = A[i][j];
      let tt = "";
      for (let k = 0; k < j; k++) {
        t -= L[i][k] * L[j][k];
        tt += ` − (${fmtNum(L[i][k])})·(${fmtNum(L[j][k])})`;
      }
      const v = t / L[j][j];
      L[i][j] = v;
      steps.push({
        i,
        j,
        line: `l${sub(i + 1)}${sub(j + 1)} = (${fmtNum(A[i][j])}${tt}) / ${fmtNum(L[j][j])} = ${fmtNum(v)}`,
        value: v,
      });
    }
  }
  return { steps, fail: null };
}

/** Der Stepper: Standardbeispiel ist eine ganzzahlige SPD-Matrix mit L = (2 0 0; 1 3 0; −1 1 2). */
export function CholeskyStepper() {
  const [A, setA] = useState<number[][]>([
    [4, 2, -2],
    [2, 10, 2],
    [-2, 2, 6],
  ]);
  // Start bei 1: die tote Ansicht zeigt sonst ein L aus lauter Punkten.
  const [t, setT] = useState(1);
  const trace = useMemo(() => cholTrace(A), [A]);
  const maxT = trace.steps.length;
  const shown = Math.min(t, maxT);
  const n = A.length;
  const next = shown < maxT ? trace.steps[shown] : null; // nächster zu berechnender Eintrag
  const failedNow = trace.fail !== null && shown === maxT;
  const done = trace.fail === null && shown === maxT;

  // L-Anzeige: obere Hälfte fix 0, berechnete Einträge gefüllt, Rest offen (·)
  const Ldisp: (number | null)[][] = A.map((_, i) => A.map((__, j) => (j > i ? 0 : null)));
  const isComputed: boolean[][] = A.map(() => new Array(n).fill(false));
  for (let k = 0; k < shown; k++) {
    const st = trace.steps[k];
    if (!Number.isNaN(st.value)) {
      Ldisp[st.i][st.j] = st.value;
      isComputed[st.i][st.j] = true;
    }
  }

  const aStyle = (i: number, j: number): CSSProperties | undefined =>
    next && i === next.i && j === next.j
      ? { background: RED + "33", fontWeight: 600 }
      : undefined;
  const lStyle = (i: number, j: number): CSSProperties | undefined => {
    if (next && i === next.i && j === next.j) return { background: BLUE + "33" };
    if (isComputed[i][j]) return { color: GREEN, fontWeight: 600 };
    return undefined;
  };

  // Probe am Ende: max |A − L·Lᵀ|
  const resid = useMemo(() => {
    if (!done) return null;
    const val = (i: number, j: number) => (j > i ? 0 : (Ldisp[i][j] as number) ?? 0);
    let e = 0;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        let p = 0;
        for (let k = 0; k < n; k++) p += val(i, k) * val(j, k);
        e = Math.max(e, Math.abs(p - A[i][j]));
      }
    return e;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, A, shown]);

  return (
    <div>
      <Aufgabe>Schieben wir durch alle {maxT} Einträge von L und probieren danach eine nicht-SPD-Matrix.</Aufgabe>
      <p className="text-xs" style={{ color: "var(--w-muted)" }}>
        Farben: <span style={{ color: RED, fontWeight: 600 }}>rot</span> der verglichene Eintrag
        von A, <span style={{ color: BLUE, fontWeight: 600 }}>blau</span> der gesuchte Eintrag
        von L, <span style={{ color: GREEN, fontWeight: 600 }}>grün</span> die fertigen Einträge.
      </p>
      <p className="sr-only">
        Bauen wir <span className="font-mono">L</span> per Koeffizientenvergleich auf,
        spaltenweise von links oben nach rechts unten; jeder Schritt löst eine Gleichung nach
        genau einer neuen Unbekannten auf. Die Matrix lässt sich editieren (wir symmetrisieren
        die Eingabe automatisch). Setzen wir etwa a₁₁ auf −1, sehen wir, wie die Zerlegung an
        einer nicht positiv definiten Matrix scheitert.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          A =
          <MatrixInput
            value={A}
            onChange={(m) => {
              setA(m.map((r, i) => r.map((v, j) => (v + (m[j]?.[i] ?? v)) / 2)));
              setT(1);
            }}
          />
        </div>
      </div>
      <Stepper step={shown} setStep={setT} max={maxT} narration={`${shown} von ${maxT} Einträgen berechnet`} />
      <div className="my-3 flex flex-wrap items-start gap-5">
        <WidgetLabel label="A (symmetrisch)">
          <MatTable m={A} cellStyle={aStyle} label="Matrix A" />
        </WidgetLabel>
        <WidgetLabel label="L (untere Dreiecksmatrix)">
          <MatTable m={Ldisp} cellStyle={lStyle} label="untere Dreiecksmatrix L" />
        </WidgetLabel>
        <div className="grow">
          {shown > 0 && (
            <div className="rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800">
              {trace.steps.slice(0, shown).map((l) => (
                <div key={l.line}>{l.line}</div>
              ))}
            </div>
          )}
          {failedNow && trace.fail && (
            <Verdikt kind="fail" className="mt-2">{trace.fail.msg} {ref("satz:cholesky-zerlegung")} ist hier nicht anwendbar.</Verdikt>
          )}
          {done && resid !== null && (
            <Verdikt kind="ok" className="mt-2">
              Fertig: alle {maxT} Gleichungen des Koeffizientenvergleichs sind abgearbeitet,
              jede enthielt genau eine neue Unbekannte. Probe: max |A − L·Lᵀ| ={" "}
              <span className="font-mono">{fmtExp(resid)}</span>.
            </Verdikt>
          )}
        </div>
      </div>
    </div>
  );
}
