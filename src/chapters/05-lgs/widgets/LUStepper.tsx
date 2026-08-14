import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { MatrixInput } from "../../../lib";
import { backSub, fmtNum, MatTable, sub, WidgetLabel } from "./shared";

/**
 * Schritt-für-Schritt-Widget zur LU-Zerlegung für §5.3: In der Arbeitsmatrix
 * wachsen die Nullen unter der Diagonalen, die Multiplikatoren wandern in L,
 * und aus b wird nebenbei y. Am Ende löst Rückwärtssubstitution Ux = y.
 *
 * Ablauf-/Trace-Code aus dem LUStepper der privaten heath-ch2-App portiert
 * (nur Code; alle Texte neu). Farbcode wie im Kapiteltext (FMM-Palette):
 * rot = Pivot, blau = aktuelle Zeile/Multiplikator, grün = Ergebnis-/L-Einträge.
 */

const RED = "#D55E00";
const BLUE = "#0072B2";
const GREEN = "#009E73";

type Phase = "init" | "mult" | "apply" | "fail" | "done";

interface Step {
  phase: Phase;
  k: number; // aktuelle Spalte, 0-basiert (-1 bei init/done)
  W: number[][]; // Momentaufnahme der Arbeitsmatrix
  bw: number[]; // Momentaufnahme der rechten Seite
  L: (number | null)[][]; // bereits bekannter Teil von L
  Lk: number[][] | null; // Eliminationsmatrix dieser Stufe
  lines: string[]; // Mono-Protokollzeilen
}

function clone2(m: (number | null)[][]) {
  return m.map((r) => [...r]);
}

function buildTrace(A0: number[][], b0: number[]): Step[] {
  const n = A0.length;
  const W = A0.map((r) => [...r]);
  const bw = [...b0];
  const L: (number | null)[][] = A0.map((_, i) =>
    A0.map((__, j) => (i === j ? 1 : i < j ? 0 : null))
  );
  const steps: Step[] = [];
  const snap = (phase: Phase, k: number, Lk: number[][] | null, lines: string[]) =>
    steps.push({
      phase,
      k,
      W: W.map((r) => [...r]),
      bw: [...bw],
      L: clone2(L),
      Lk,
      lines,
    });

  snap("init", -1, null, []);
  for (let k = 0; k < n - 1; k++) {
    const piv = W[k][k];
    if (Math.abs(piv) < 1e-12) {
      snap("fail", k, null, [
        `m${sub(k + 1)}${sub(k + 1)} = 0  ⇒  Abbruch in Spalte ${k + 1}`,
      ]);
      return steps;
    }
    const ms: number[] = [];
    const Lk: number[][] = A0.map((_, i) => A0.map((__, j) => (i === j ? 1 : 0)));
    const multLines: string[] = [];
    for (let i = k + 1; i < n; i++) {
      ms[i] = W[i][k] / piv;
      Lk[i][k] = -ms[i];
      L[i][k] = ms[i];
      multLines.push(
        `l${sub(i + 1)}${sub(k + 1)} = m${sub(i + 1)}${sub(k + 1)}/m${sub(k + 1)}${sub(
          k + 1
        )} = ${fmtNum(W[i][k])}/${fmtNum(piv)} = ${fmtNum(ms[i])}`
      );
    }
    snap("mult", k, Lk, multLines);
    const applyLines: string[] = [];
    for (let i = k + 1; i < n; i++) {
      for (let j = k; j < n; j++) W[i][j] -= ms[i] * W[k][j];
      W[i][k] = 0; // per Konstruktion exakt null
      bw[i] -= ms[i] * bw[k];
      applyLines.push(
        `Zeile ${i + 1} ← Zeile ${i + 1} − (${fmtNum(ms[i])}) · Zeile ${k + 1}   (ebenso b${sub(
          i + 1
        )} ← b${sub(i + 1)} − (${fmtNum(ms[i])}) · b${sub(k + 1)})`
      );
    }
    snap("apply", k, Lk, applyLines);
  }
  const { lines } = backSub(W, bw);
  snap("done", -1, null, lines);
  return steps;
}

/** Der Stepper: Standardbeispiel ist die 3×3-Matrix aus Beispiel 5.3.4/5.3.8. */
export function LUZerlegungStepper() {
  const [A0, setA0] = useState<number[][]>([
    [2, 1, -1],
    [4, -6, 0],
    [-2, 7, 2],
  ]);
  const [b0, setB0] = useState<number[][]>([[5], [-2], [9]]);
  const [step, setStep] = useState(0);
  const trace = useMemo(() => buildTrace(A0, b0.map((r) => r[0])), [A0, b0]);
  const s = trace[Math.min(step, trace.length - 1)];
  const n = A0.length;
  const last = trace.length - 1;

  const aug = s.W.map((r, i) => [...r, s.bw[i]]);
  const augClass = (_i: number, j: number): string =>
    j === n ? "ml-1 border-l border-slate-400 pl-1" : "";
  const augStyle = (i: number, j: number): CSSProperties | undefined => {
    if (s.phase === "mult") {
      if (i === s.k && j === s.k) return { background: RED + "33", fontWeight: 600 };
      if (j === s.k && i > s.k) return { background: BLUE + "26" };
    }
    if (s.phase === "apply") {
      if (j === s.k && i > s.k) return { background: GREEN + "26", fontWeight: 600 };
      if (i > s.k && j >= s.k) return { background: BLUE + "1a" };
    }
    if (s.phase === "fail" && i === s.k && j === s.k)
      return { background: RED + "33", fontWeight: 600 };
    return undefined;
  };
  const lStyle = (i: number, j: number): CSSProperties | undefined =>
    s.phase === "mult" && j === s.k && i > s.k
      ? { color: GREEN, fontWeight: 600 }
      : undefined;
  const lkStyle = (i: number, j: number): CSSProperties | undefined =>
    j === s.k && i > s.k ? { color: BLUE, fontWeight: 600 } : undefined;

  const doneX = useMemo(() => (s.phase === "done" ? backSub(s.W, s.bw) : null), [s]);
  const luErr = useMemo(() => {
    if (s.phase !== "done") return null;
    let e = 0;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        let p = 0;
        for (let k = 0; k < n; k++) p += (s.L[i][k] ?? 0) * (k <= j ? s.W[k][j] : 0);
        e = Math.max(e, Math.abs(p - A0[i][j]));
      }
    return e;
  }, [s, A0, n]);

  const phaseText: Record<Phase, ReactNode> = {
    init: (
      <>
        Startzustand. Rechts vom Strich steht die rechte Seite, die jede Zeilenoperation
        mitmacht. Von <span className="font-mono">L</span> kennen wir bisher nur das Gerüst aus
        Einsen und Nullen; auf den Punkten darunter landen gleich die Multiplikatoren, einer
        pro eliminiertem Eintrag.
      </>
    ),
    mult: (
      <>
        Spalte {s.k + 1}, erste Hälfte. Auf der Diagonalen sitzt das Pivot
        (<span style={{ color: RED, fontWeight: 600 }}>rot</span>); darunter stehen die
        Einträge, die weg sollen (<span style={{ color: BLUE, fontWeight: 600 }}>blau</span>).
        Jeder von ihnen geteilt durch das Pivot ergibt seinen Multiplikator, und den notieren
        wir uns an derselben Stelle in <span className="font-mono">L</span>{" "}
        (<span style={{ color: GREEN, fontWeight: 600 }}>grün</span>). In{" "}
        <span className="font-mono">L{sub(s.k + 1)}</span> steht derselbe Wert negativ, denn
        diese Matrix zieht ab, was <span className="font-mono">L</span> aufbewahrt.
      </>
    ),
    apply: (
      <>
        Zweite Hälfte: Von jeder Zeile unterhalb des Pivots ziehen wir die mit ihrem
        Multiplikator skalierte Pivotzeile ab. In Spalte {s.k + 1} liefert das die gewünschte Null
        (<span style={{ color: GREEN, fontWeight: 600 }}>grün</span>), weiter rechts neue Werte
        in der Zeile und in der rechten Seite
        (<span style={{ color: BLUE, fontWeight: 600 }}>blau</span>). Die Zeilen oberhalb des
        Pivots bleiben, wie sie sind.
      </>
    ),
    fail: (
      <>
        Auf dem Pivotplatz steht eine Null. Ein Multiplikator wäre hier nur mit einer Division
        durch null zu haben, also endet die Elimination an dieser Stelle. Invertierbar darf die
        Matrix dabei durchaus sein (Beispiel 5.3.6); wer weiterrechnen will, tauscht zuerst
        Zeilen.
      </>
    ),
    done: (
      <>
        Unterhalb der Diagonalen ist nichts mehr übrig: Die Arbeitsmatrix ist das gesuchte{" "}
        <span className="font-mono">U</span>. Dieselben Operationen haben aus{" "}
        <span className="font-mono">b</span> den Vektor <span className="font-mono">y</span>{" "}
        gemacht, den auch die Vorwärtssubstitution mit{" "}
        <span className="font-mono">L</span> geliefert hätte. Bleibt der letzte Schritt:
        rückwärts durch <span className="font-mono">Ux = y</span>.
      </>
    ),
  };

  return (
    <div>
      <p className="text-sm">
        Links läuft das erweiterte System, rechts die Buchhaltung: Was im Arbeitssystem zu
        einer Null wird, taucht in <span className="font-mono">L</span> als Multiplikator
        wieder auf. Matrix und rechte Seite sind editierbar, jede Änderung setzt den Ablauf
        auf den Anfang zurück.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          A =
          <MatrixInput value={A0} onChange={(m) => { setA0(m); setStep(0); }} step={1} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          b =
          <MatrixInput value={b0} onChange={(m) => { setB0(m); setStep(0); }} step={1} />
        </div>
      </div>
      <div className="my-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40"
          onClick={() => setStep((v) => Math.max(0, v - 1))}
          disabled={step === 0}
        >
          ◀ zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800"
          onClick={() => setStep((v) => Math.min(last, v + 1))}
          disabled={step >= last}
        >
          nächster Schritt ▶
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setStep(0)}
        >
          zurücksetzen
        </button>
        <span className="text-sm" style={{ color: "#64748b" }}>
          Schritt {Math.min(step, last) + 1} von {last + 1}
        </span>
      </div>
      <div className="my-3 flex flex-wrap items-start gap-5">
        <WidgetLabel label={s.phase === "done" ? "U | y  (fertig)" : "Arbeitsmatrix | b"}>
          <MatTable m={aug} cellClass={augClass} cellStyle={augStyle} />
        </WidgetLabel>
        {s.Lk && s.phase === "mult" && (
          <WidgetLabel label={`L${sub(s.k + 1)} (Eliminationsmatrix)`}>
            <MatTable m={s.Lk} cellStyle={lkStyle} />
          </WidgetLabel>
        )}
        <WidgetLabel label="L (Multiplikatoren)">
          <MatTable m={s.L} cellStyle={lStyle} />
        </WidgetLabel>
      </div>
      <p className="text-sm">{phaseText[s.phase]}</p>
      {s.lines.length > 0 && (
        <div className="mt-2 rounded bg-slate-100 p-2 font-mono text-xs leading-5 dark:bg-slate-800">
          {s.lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      )}
      {s.phase === "done" && doneX && (
        <p className="mt-2 text-sm">
          {doneX.failRow >= 0 ? (
            <>
              In Zeile {doneX.failRow + 1} von <span className="font-mono">U</span> steht eine
              Null auf der Diagonalen. Dividieren lässt sich dort nicht, und das liegt nicht am
              Verfahren: Diese Matrix ist singulär.
            </>
          ) : (
            <>
              Lösung:{" "}
              <span className="font-mono" style={{ color: GREEN, fontWeight: 600 }}>
                x = ({doneX.x.map((v) => fmtNum(v as number)).join("; ")})
              </span>
              . Probe der Zerlegung: max |A − L·U| ={" "}
              <span className="font-mono">{fmtNum(luErr ?? 0)}</span>.
            </>
          )}
        </p>
      )}
    </div>
  );
}
