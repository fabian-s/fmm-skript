import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Stepper,
  Verdikt,
  W_MUTED,
  W_PANEL,
  fmtInt,
} from "../../../lib";

/**
 * §2.2: Der iterative Fibonacci-Algorithmus 2.2.2 Schritt für Schritt, daneben
 * die naive Rekursion mit Aufruf- und Additionszähler.
 *
 * DIE EINE EINSICHT: Die Iteration rechnet jede Zahl genau einmal, die
 * Rekursion rechnet dieselben Teilaufgaben immer wieder — und zwar nicht ein
 * paarmal, sondern so oft, dass die Schere schon bei einstelligem k aufgeht.
 *
 * FARBROLLEN (Kapitel 2, s. S21Demos.tsx): rot = die teure Variante (naive
 * Rekursion). Innerhalb der Iterationstafel gelten zusätzlich die
 * Elementrollen aus Algorithmus 2.2.2, wie sie auch die Prosa setzt:
 * blau = letztes Element, grün = vorletztes Element, orange = neue Summe.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-02-algos/check-02-algos.mjs,
 * 2026-08-19). Zählung in der Kapitelkonvention x_1 = 0, x_2 = 1; die
 * Rekursion für x_k macht C(k) = 1 + C(k−1) + C(k−2) Aufrufe und
 * A(k) = 1 + A(k−1) + A(k−2) Additionen, C(1) = C(2) = 1, A(1) = A(2) = 0:
 *   k  =  3    5    8    10    12     15
 *   C  =  3    9   41   109   287   1219
 *   A  =  1    4   20    54   143    609
 *   Iteration: k − 2 Additionen, also 1, 3, 6, 8, 10, 13.
 * Häufigkeiten im Aufrufbaum von x_8: x_1 8-mal, x_2 13-mal, x_3 8-mal,
 * x_4 5-mal, x_5 3-mal, x_6 2-mal, x_7 und x_8 je einmal (im Baum von x_5:
 * x_1 2-mal, x_2 3-mal, x_3 2-mal).
 *
 * Provenienz: eigenständig implementiert. Die vier Schaltknöpfe der
 * Vorfassung sind 2026-08-19 durch den scrubbaren Lib-<Stepper> ersetzt.
 */

const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;
const ROT = FMM_COLORS.rot;

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

/** Pastellton pro Argument j: gleiche Teilbäume bekommen dieselbe Farbe. */
function shade(j: number): string {
  const base = [GRUEN, BLAU, ORANGE, FMM_COLORS.violett, ROT];
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
  const [kRaw, setKRaw] = useState(5);
  const k = Math.min(kRaw, n);

  const seq = useMemo(() => fibSeq(N_MAX), []);
  const { calls, adds } = useMemo(() => naiveStats(N_MAX), []);
  const counts = useMemo(() => callCounts(k), [k]);

  const iterAdds = Math.max(0, k - 2);
  const duplicates: { j: number; c: number }[] = [];
  for (let j = k - 2; j >= 1; j--) {
    if (counts[j] > 1) duplicates.push({ j, c: counts[j] });
  }
  const faktor = iterAdds > 0 ? adds[k] / iterAdds : 0;
  // Fürs Verdikt zählt der auffälligste Mehrfachaufruf, nicht der erste.
  const oefter = duplicates.reduce<{ j: number; c: number } | null>(
    (best, d) => (best === null || d.c > best.c ? d : best),
    null
  );

  const narration =
    k >= 3 ? (
      <>
        Schritt {k}: hänge{" "}
        <span style={{ color: ORANGE, fontWeight: 600 }}>{seq[k - 1]}</span> ={" "}
        <span style={{ color: BLAU, fontWeight: 600 }}>{seq[k - 2]}</span> +{" "}
        <span style={{ color: GRUEN, fontWeight: 600 }}>{seq[k - 3]}</span> an, eine einzige
        Addition.
      </>
    ) : k === 1 ? (
      <>Schritt 1: Startwert 0 setzen, noch keine Addition.</>
    ) : (
      <>Schritt 2: die 1 anhängen, noch keine Addition.</>
    );

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Scrubben wir den Schrittregler nach rechts und vergleichen die beiden Zähler unter den
        Tafeln.
      </Aufgabe>

      <div className="max-w-md">
        <Slider
          label="n (Ziel)"
          value={n}
          onChange={(v) => setN(Math.round(v))}
          min={3}
          max={N_MAX}
          step={1}
          fmt={(v) => String(Math.round(v))}
        />
      </div>
      <Stepper step={k} setStep={setKRaw} min={1} max={n} narration={narration} />

      <div className="grid gap-3 md:grid-cols-2">
        {/* iterativ */}
        <div className={`p-3 ${W_PANEL}`}>
          <p className="mb-2 font-semibold">Iterativ (Algorithmus 2.2.2)</p>
          <div className="mb-2 flex flex-wrap gap-1">
            {seq.slice(0, k).map((v, i) => {
              const idx = i + 1; // 1-basiert
              const isNew = k >= 3 && idx === k;
              const isLast = k >= 3 && idx === k - 1;
              const isPrev = k >= 3 && idx === k - 2;
              const color = isNew ? ORANGE : isLast ? BLAU : isPrev ? GRUEN : undefined;
              return (
                <span
                  key={idx}
                  className="rounded border px-1.5 py-0.5 font-mono text-xs"
                  style={
                    color
                      ? { borderColor: color, color, fontWeight: 600 }
                      : { borderColor: "var(--w-border)" }
                  }
                  title={`x${idx}`}
                >
                  {v}
                </span>
              );
            })}
          </div>
          <p className="font-mono text-xs">
            elementare Schritte: {k} &nbsp;|&nbsp; Additionen insgesamt:{" "}
            <strong style={{ color: BLAU }}>{iterAdds}</strong>
          </p>
        </div>

        {/* naiv rekursiv */}
        <div className={`p-3 ${W_PANEL}`}>
          <p className="mb-2 font-semibold">
            Naive Rekursion: nur x<sub>{k}</sub>
          </p>
          <p className="font-mono text-xs">
            Funktionsaufrufe: <strong style={{ color: ROT }}>{fmtInt(calls[k])}</strong>{" "}
            &nbsp;|&nbsp; Additionen: <strong style={{ color: ROT }}>{fmtInt(adds[k])}</strong>
          </p>
          {duplicates.length > 0 && (
            <p className={`mt-2 text-xs ${W_MUTED}`}>
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

      {k <= 8 ? (
        <div className={`overflow-x-auto p-2 ${W_PANEL}`}>
          <p className={`mb-1 text-xs ${W_MUTED}`}>
            Aufrufbaum der naiven Rekursion für x<sub>{k}</sub>; gleiche Farbe = identische,
            mehrfach ausgeführte Teilrechnung.
          </p>
          <CallTree j={k} />
        </div>
      ) : (
        <p className={`text-xs ${W_MUTED}`}>
          (Der Aufrufbaum hat jetzt {fmtInt(calls[k])} Knoten; zum Anzeigen Schritt ≤ 8
          wählen.)
        </p>
      )}

      <Verdikt kind={k < 3 ? "neutral" : faktor >= 3 ? "fail" : "warn"}>
        {k < 3 ? (
          <>
            Noch ist nichts passiert: Beide Varianten setzen nur den Startwert. Der Unterschied
            entsteht erst, sobald etwas addiert wird.
          </>
        ) : (
          <>
            Bei Schritt {k} hat die Iteration <em>alle</em> Zahlen x<sub>1</sub> bis x
            <sub>{k}</sub> mit{" "}
            <strong style={{ color: BLAU }}>
              {iterAdds} {iterAdds === 1 ? "Addition" : "Additionen"}
            </strong>{" "}
            berechnet; die naive Rekursion braucht für die <em>eine</em> Zahl x<sub>{k}</sub>{" "}
            schon{" "}
            <strong style={{ color: ROT }}>
              {fmtInt(adds[k])} {adds[k] === 1 ? "Addition" : "Additionen"}
            </strong>{" "}
            und {fmtInt(calls[k])} Aufrufe
            {faktor >= 2 ? <>, also das {fmtInt(Math.round(faktor))}-fache</> : null}.
            {oefter && (
              <>
                {" "}
                Der Grund steht im Aufrufbaum: x<sub>{oefter.j}</sub> wird {oefter.c}-mal von
                vorn berechnet, weil die Rekursion nichts aufbewahrt.
              </>
            )}{" "}
            Wie schnell diese Schere aufgeht, rechnen wir in{" "}
            <a className="underline" href="#sec-2.5">
              Abschnitt 2.5
            </a>{" "}
            nach.
          </>
        )}
      </Verdikt>
    </div>
  );
}
