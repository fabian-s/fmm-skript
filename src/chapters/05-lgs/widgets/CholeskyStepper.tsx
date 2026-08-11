import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { MatrixInput } from "../../../lib";

/**
 * Cholesky-Stepper für §5.4: die Zerlegung A = LLᵀ entsteht Eintrag für
 * Eintrag per Koeffizientenvergleich (spaltenweise, wie im 2×2-Beispiel des
 * Texts). Farbcode wie im Kapitel (FMM-Palette): rot = der Eintrag von A,
 * der gerade verglichen wird, blau = der Eintrag von L, nach dem wir
 * auflösen, grün = fertige L-Einträge.
 *
 * Tabellen-Renderer und Formatter folgen dem Muster des LUStepper aus der
 * privaten heath-ch2-App (nur Code-Struktur; alle Texte neu geschrieben).
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const RED = "#D55E00";

/** Kompakte Zahlformatierung (3 Dezimalen, deutsches Komma, kein -0);
 *  NaN und ±∞ werden getrennt ausgewiesen. */
export function fmtNum(v: number): string {
  if (Number.isNaN(v)) return "NaN";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return String(r).replace("-", "−").replace(".", ",");
}

const SUBS = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
const sub = (i: number) => SUBS[i] ?? String(i);

/** Matrix als Mono-Zellen-Raster mit eckigen Klammerlinien; null = „noch offen". */
export function MatTable({
  m,
  cellClass,
  cellStyle,
}: {
  m: (number | null)[][];
  cellClass?: (i: number, j: number) => string;
  cellStyle?: (i: number, j: number) => CSSProperties | undefined;
}) {
  return (
    <div
      className="inline-grid gap-px self-start rounded border-x-2 border-slate-500 px-1.5 py-1"
      style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(2.3rem, auto))` }}
    >
      {m.map((row, i) =>
        row.map((v, j) => (
          <div
            key={`${i}-${j}`}
            className={`rounded px-1 py-0.5 text-center font-mono text-xs ${
              v === null ? "text-slate-400" : ""
            } ${cellClass?.(i, j) ?? ""}`}
            style={cellStyle?.(i, j)}
          >
            {v === null ? "·" : fmtNum(v)}
          </div>
        ))
      )}
    </div>
  );
}

export function WidgetLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium" style={{ color: "#64748b" }}>
        {label}
      </span>
      {children}
    </div>
  );
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
      return {
        steps,
        fail: {
          msg: `Unter der Wurzel steht ${fmtNum(s)} ≤ 0: die eingegebene Matrix ist nicht positiv definit, eine Cholesky-Zerlegung existiert nicht.`,
        },
      };
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
  const [t, setT] = useState(0);
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
      <p className="text-sm">
        Bauen wir <span className="font-mono">L</span> per Koeffizientenvergleich auf,
        spaltenweise von links oben nach rechts unten. In jedem Schritt vergleichen wir den{" "}
        <span style={{ color: RED, fontWeight: 600 }}>rot markierten Eintrag von A</span> mit
        dem entsprechenden Eintrag von <span className="font-mono">LLᵀ</span> und lösen nach
        dem <span style={{ color: BLUE, fontWeight: 600 }}>blau markierten Eintrag von L</span>{" "}
        auf; fertige Einträge erscheinen{" "}
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span>. Die Matrix lässt sich
        editieren (wir symmetrisieren die Eingabe automatisch). Setzen wir etwa a₁₁ auf −1,
        sehen wir, wie die Zerlegung an einer nicht positiv definiten Matrix scheitert.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          A =
          <MatrixInput
            value={A}
            onChange={(m) => {
              setA(m.map((r, i) => r.map((v, j) => (v + (m[j]?.[i] ?? v)) / 2)));
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
          nächster Eintrag ▶
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setT(0)}
        >
          zurücksetzen
        </button>
        <span className="text-sm" style={{ color: "#64748b" }}>
          {shown} von {maxT} Einträgen berechnet
        </span>
      </div>
      <div className="my-3 flex flex-wrap items-start gap-5">
        <WidgetLabel label="A (symmetrisch)">
          <MatTable m={A} cellStyle={aStyle} />
        </WidgetLabel>
        <WidgetLabel label="L (untere Dreiecksmatrix)">
          <MatTable m={Ldisp} cellStyle={lStyle} />
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
            <p className="mt-2 text-sm" style={{ color: RED }}>
              {trace.fail.msg}
            </p>
          )}
          {done && resid !== null && (
            <p className="mt-2 text-sm">
              Fertig: alle {maxT} Gleichungen des Koeffizientenvergleichs sind abgearbeitet,
              jede enthielt genau eine neue Unbekannte. Probe: max |A − L·Lᵀ| ={" "}
              <span className="font-mono">{fmtNum(resid)}</span>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
