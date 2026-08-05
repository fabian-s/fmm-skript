import { useMemo, useState } from "react";
import { Slider } from "../../../lib";

/**
 * Fibonacci-Stepper: der iterative Algorithmus aus den Folien (02-algos,
 * "Fibonacci: Schrittweise Berechnung") Schritt für Schritt, daneben die
 * naive Rekursion mit Aufruf- und Additionszähler. Foreshadowing für die
 * Komplexitätsanalyse in Abschnitt 2.5.
 *
 * Farbcodierung wie im Text (FMM-Palette): blau = letztes Element,
 * grün = vorletztes Element, orange = neu berechnete Summe.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const ORANGE = "#E69F00";
const RED = "#D55E00";

const N_MAX = 15;

/** Erste n Fibonacci-Zahlen, Konvention der Folien: x1 = 0, x2 = 1. */
function fibSeq(n: number): number[] {
  const x = new Array<number>(n).fill(0);
  if (n > 1) x[1] = 1;
  for (let i = 2; i < n; i++) x[i] = x[i - 1] + x[i - 2];
  return x;
}

/** Aufrufe C(k) und Additionen A(k) der naiven Rekursion für x_k allein. */
function naiveStats(kMax: number): { calls: number[]; adds: number[] } {
  const calls = new Array<number>(kMax + 1).fill(0);
  const adds = new Array<number>(kMax + 1).fill(0);
  for (let k = 1; k <= kMax; k++) {
    if (k <= 2) {
      calls[k] = 1;
      adds[k] = 0;
    } else {
      calls[k] = 1 + calls[k - 1] + calls[k - 2];
      adds[k] = 1 + adds[k - 1] + adds[k - 2];
    }
  }
  return { calls, adds };
}

/** Wie oft berechnet der naive Rekursionsbaum mit Wurzel k jedes x_j? */
function callCounts(k: number): number[] {
  const cnt = new Array<number>(k + 1).fill(0);
  const stack: number[] = [k];
  while (stack.length > 0) {
    const j = stack.pop() as number;
    cnt[j] += 1;
    if (j > 2) {
      stack.push(j - 1, j - 2);
    }
  }
  return cnt;
}

/** Pastellton pro Argument j — gleiche Teilbäume bekommen dieselbe Farbe. */
function shade(j: number): string {
  const base = [GREEN, BLUE, ORANGE, "#9E57D5", RED];
  return base[j % base.length] + "2e";
}

function CallTree({ j }: { j: number }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded border border-slate-300 px-1 font-mono text-[11px] dark:border-slate-600"
        style={{ background: shade(j) }}
      >
        x<sub>{j}</sub>
      </div>
      {j > 2 && (
        <div className="flex gap-1 pt-1">
          <CallTree j={j - 1} />
          <CallTree j={j - 2} />
        </div>
      )}
    </div>
  );
}

export function FibonacciStepper() {
  const [n, setN] = useState(8);
  const [kRaw, setKRaw] = useState(1);
  const k = Math.min(kRaw, n);

  const seq = useMemo(() => fibSeq(N_MAX), []);
  const { calls, adds } = useMemo(() => naiveStats(N_MAX), []);
  const counts = useMemo(() => callCounts(k), [k]);

  const iterAdds = Math.max(0, k - 2);
  const duplicates: { j: number; c: number }[] = [];
  for (let j = k - 2; j >= 1; j--) {
    if (counts[j] > 1) duplicates.push({ j, c: counts[j] });
  }

  return (
    <div className="space-y-3 text-sm">
      <Slider
        label="n (Ziel)"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={3}
        max={N_MAX}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <div className="flex flex-wrap items-center gap-2">
        <span>
          Schritt <strong>{k}</strong> von {n}:
        </span>
        {[
          { label: "◀ zurück", to: Math.max(1, k - 1), off: k <= 1 },
          { label: "Schritt ▶", to: Math.min(n, k + 1), off: k >= n },
          { label: "bis zum Ende ▶▶", to: n, off: k >= n },
          { label: "zurücksetzen", to: 1, off: k <= 1 },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            disabled={b.off}
            className="rounded bg-slate-200 px-2 py-1 text-xs font-medium enabled:hover:bg-slate-300 disabled:opacity-40 dark:bg-slate-700 dark:enabled:hover:bg-slate-600"
            onClick={() => setKRaw(b.to)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {/* iterativ */}
        <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
          <p className="mb-2 font-semibold">Iterativ (Algorithmus 2.2.2)</p>
          <div className="mb-2 flex flex-wrap gap-1">
            {seq.slice(0, k).map((v, i) => {
              const idx = i + 1; // 1-basiert
              const isNew = k >= 3 && idx === k;
              const isLast = k >= 3 && idx === k - 1;
              const isPrev = k >= 3 && idx === k - 2;
              const color = isNew ? ORANGE : isLast ? BLUE : isPrev ? GREEN : undefined;
              return (
                <span
                  key={idx}
                  className="rounded border px-1.5 py-0.5 font-mono text-xs"
                  style={
                    color
                      ? { borderColor: color, color, fontWeight: 600 }
                      : { borderColor: "#94a3b8" }
                  }
                  title={`x${idx}`}
                >
                  {v}
                </span>
              );
            })}
          </div>
          {k >= 3 ? (
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Schritt {k}: hänge{" "}
              <span style={{ color: ORANGE, fontWeight: 600 }}>{seq[k - 1]}</span> ={" "}
              <span style={{ color: BLUE, fontWeight: 600 }}>{seq[k - 2]}</span> +{" "}
              <span style={{ color: GREEN, fontWeight: 600 }}>{seq[k - 3]}</span> an — eine
              einzige Addition.
            </p>
          ) : (
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {k === 1 ? "Startwert 0 setzen — noch keine Addition." : "1 anhängen — noch keine Addition."}
            </p>
          )}
          <p className="mt-2 font-mono text-xs">
            elementare Schritte: {k} &nbsp;|&nbsp; Additionen insgesamt:{" "}
            <strong>{iterAdds}</strong>
          </p>
        </div>

        {/* naiv rekursiv */}
        <div className="rounded border border-slate-200 p-3 dark:border-slate-700">
          <p className="mb-2 font-semibold">
            Naive Rekursion — nur x<sub>{k}</sub>
          </p>
          <p className="mb-2 text-xs text-slate-600 dark:text-slate-300">
            Direkt nach Definition: berechne x<sub>{k}</sub> aus x<sub>{k - 1}</sub> und x
            <sub>{k - 2}</sub>, jeweils wieder rekursiv — ohne Zwischenergebnisse zu speichern.
          </p>
          <p className="font-mono text-xs">
            Funktionsaufrufe: <strong style={{ color: RED }}>{calls[k]}</strong> &nbsp;|&nbsp;
            Additionen: <strong style={{ color: RED }}>{adds[k]}</strong>
          </p>
          {duplicates.length > 0 && (
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              Mehrfach berechnet:{" "}
              {duplicates.slice(0, 4).map((d, i) => (
                <span key={d.j}>
                  {i > 0 && ", "}x<sub>{d.j}</sub> {d.c}-mal
                </span>
              ))}
              {duplicates.length > 4 && ", …"}
            </p>
          )}
        </div>
      </div>

      {k >= 3 && (
        <p className="text-xs">
          Bilanz bei Schritt {k}: Die Iteration hat <em>alle</em> Zahlen x<sub>1</sub>, …, x
          <sub>{k}</sub> mit <strong>{iterAdds}</strong>{" "}
          {iterAdds === 1 ? "Addition" : "Additionen"} berechnet; die naive Rekursion braucht für
          die <em>eine</em> Zahl x<sub>{k}</sub> schon{" "}
          <strong style={{ color: RED }}>{adds[k]}</strong>{" "}
          {adds[k] === 1 ? "Addition" : "Additionen"} und{" "}
          <strong style={{ color: RED }}>{calls[k]}</strong> Aufrufe. Wie schnell diese Schere
          aufgeht, analysieren wir in{" "}
          <a className="underline" href="#sec-2.5">
            Abschnitt 2.5
          </a>
          .
        </p>
      )}

      {k <= 8 ? (
        <div className="overflow-x-auto rounded border border-slate-200 p-2 dark:border-slate-700">
          <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            Aufrufbaum der naiven Rekursion für x<sub>{k}</sub> — gleiche Farbe = identische,
            mehrfach ausgeführte Teilrechnung:
          </p>
          <CallTree j={k} />
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          (Der Aufrufbaum hat jetzt {calls[k]} Knoten — zum Anzeigen Schritt ≤ 8 wählen.)
        </p>
      )}
    </div>
  );
}
