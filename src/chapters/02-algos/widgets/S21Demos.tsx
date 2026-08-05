/**
 * Widgets für §2.1: Auslöschungs-Demo (Varianz-Verschiebungsformel bei
 * wachsender Verschiebung) und Assoziativitäts-Demo (Reihenfolge der
 * Gleitkomma-Addition). Beide rechnen live in IEEE-Doppelpräzision —
 * derselben Arithmetik, die auch R verwendet.
 */
import { useState } from "react";
import { M, Slider } from "../../../lib";

/* FMM-Palette (identisch zu den \cb*-Makros in src/fmm-macros.ts) */
const FMM = {
  red: "#D55E00",
  blue: "#0072B2",
  green: "#009E73",
  orange: "#E69F00",
};

function mean(a: number[]): number {
  let s = 0;
  for (const v of a) s += v;
  return s / a.length;
}

/** Ganzzahl-/Dezimaldarstellung mit deutschen Tausenderpunkten. */
function fmtDE(v: number): string {
  return v.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}

/** v als „m · 10^e" für TeX, deutsch formatiert. */
function sciTex(v: number): string {
  if (v === 0) return "0";
  const ex = Math.floor(Math.log10(Math.abs(v)));
  const man = v / 10 ** ex;
  const manStr = man.toLocaleString("de-DE", { maximumFractionDigits: 1 }).replace(",", "{,}");
  return `${manStr} \\cdot 10^{${ex}}`;
}

/* ------------------------------------------------------------------ */
/* Auslöschungs-Demo: Varianz nach Verschiebungsformel                 */
/* ------------------------------------------------------------------ */

export function AusloeschungDemo() {
  const [k, setK] = useState(9);
  const c = 10 ** k;
  const x = [4, 7, 13, 16].map((v) => v + c);
  const m = mean(x);
  const zweistufig = mean(x.map((v) => (v - m) ** 2));
  const sq = mean(x.map((v) => v * v)); // Mittel der Quadrate
  const msq = m * m; // Quadrat des Mittels
  const formel = sq - msq;

  let status: string;
  let ok = false;
  if (formel === 22.5) {
    ok = true;
    status =
      "Beide Rechenwege liefern exakt 22,5. Die Rundungsfehler der beiden großen " +
      "Terme bleiben noch deutlich unter deren wahrer Differenz 22,5 — die " +
      "Subtraktion verliert nichts Wesentliches.";
  } else if (formel === 0) {
    status =
      "Totalausfall: Beide Terme werden auf dieselbe Maschinenzahl gerundet, die " +
      "Differenz ist exakt 0 — die gesamte Information über die Streuung der Daten " +
      "ist ausgelöscht.";
  } else if (formel < 0) {
    status =
      "Eine negative Varianz! Die Rundungsfehler der beiden Terme sind inzwischen " +
      "größer als ihre wahre Differenz 22,5 — das Vorzeichen des Ergebnisses ist " +
      "reiner Rundungszufall.";
  } else {
    status =
      "Das Ergebnis beginnt zu kippen: Von den führenden Ziffern der beiden Terme " +
      "heben sich fast alle weg, übrig bleiben im Wesentlichen deren Rundungsfehler.";
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir berechnen die Varianz der vier Werte{" "}
        <M>{"x_i \\in \\{4, 7, 13, 16\\}"}</M>, verschoben um eine Konstante{" "}
        <M>{"c = 10^k"}</M>. Die wahre Varianz ist unabhängig von <M>{"c"}</M> immer{" "}
        <M>{"22{,}5"}</M>. Schieben wir <M>{"k"}</M> nach oben, sehen wir, wann
        die Verschiebungsformel{" "}
        <M>{"\\cred{\\tfrac{1}{n}\\sumin x_i^2} - \\cblue{\\bar{x}^2}"}</M> versagt:
      </p>
      <Slider label="Exponent k" value={k} onChange={setK} min={0} max={12} step={1} fmt={(v) => `c = 1e${v}`} />
      <div className="overflow-x-auto rounded border border-slate-200 p-3 font-mono text-xs dark:border-slate-700 sm:text-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-3 align-top">Mittel der Quadrate</td>
              <td className="text-right" style={{ color: FMM.red }}>
                {fmtDE(sq)}
              </td>
            </tr>
            <tr>
              <td className="pr-3 align-top">Quadrat des Mittels</td>
              <td className="text-right" style={{ color: FMM.blue }}>
                {fmtDE(msq)}
              </td>
            </tr>
            <tr className="border-t border-slate-300 dark:border-slate-600">
              <td className="pr-3 pt-1 align-top">Verschiebungsformel</td>
              <td className="pt-1 text-right font-bold" style={{ color: ok ? FMM.green : FMM.orange }}>
                {fmtDE(formel)}
              </td>
            </tr>
            <tr>
              <td className="pr-3 align-top">zweistufig (erst zentrieren)</td>
              <td className="text-right" style={{ color: FMM.green }}>
                {fmtDE(zweistufig)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">{status}</p>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">
        Die zweistufige Rechnung <M>{"\\tfrac{1}{n}\\sumin (x_i - \\bar{x})^2"}</M>{" "}
        bleibt dagegen für jedes <M>{"k"}</M> exakt: Sie subtrahiert <em>zuerst</em> und
        quadriert dann die kleinen Abweichungen <M>{"-6, -3, 3, 6"}</M> — es treffen nie
        zwei riesige, fast gleiche Zahlen aufeinander.
      </p>
      <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
        Übrigens: Die genauen Zahlenwerte hier können von der R-Ausgabe in Beispiel
        2.1.3 abweichen (bei <M>{"k = 9"}</M> zeigt das Widget <M>{"-128"}</M> statt{" "}
        <M>{"0"}</M>). Das Widget summiert naiv von vorne nach hinten, Rs{" "}
        <code>mean()</code> hängt intern einen Korrekturschritt an — beides ist
        IEEE-Doppelpräzision, nur die Reihenfolge der Rundungen unterscheidet sich.
        Dass schon <em>das</em> das Ergebnis ändert, ist selbst der beste Beleg für die
        Kernbotschaft dieses Abschnitts.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assoziativitäts-Demo: Klammerung der Gleitkomma-Addition            */
/* ------------------------------------------------------------------ */

export function AssoziativDemo() {
  const [k, setK] = useState(14);
  const x = 10 ** k;
  const y = -(10 ** k);
  const z = 1;
  const links = x + y + z; // (x + y) + z
  const rechts = x + (y + z);
  const ulp = 2 ** (Math.floor(Math.log2(x)) - 52); // Abstand benachbarter Maschinenzahlen bei 10^k

  const kaputt = rechts !== links;
  const status = kaputt
    ? "Jetzt gehen die Klammerungen auseinander: Der Abstand benachbarter " +
      "Maschinenzahlen bei 10^k ist inzwischen mindestens 2, also ist -10^k + 1 " +
      "nicht mehr darstellbar und wird auf -10^k zurückgerundet — die 1 " +
      "verschwindet spurlos, bevor x sie retten kann."
    : "Noch stimmen beide Klammerungen überein: 1 ist groß genug gegenüber dem " +
      "Abstand benachbarter Maschinenzahlen bei 10^k, die Zwischensumme y + z kann " +
      "die 1 also noch festhalten.";

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir addieren <M>{"\\cred{x = 10^k}"}</M>, <M>{"\\cblue{y = -10^k}"}</M> und{" "}
        <M>{"\\cgreen{z = 1}"}</M> in zwei Klammerungen. Mathematisch ist beides{" "}
        <M>{"1"}</M> — in Gleitkommaarithmetik nicht immer:
      </p>
      <Slider label="Exponent k" value={k} onChange={setK} min={0} max={30} step={1} fmt={(v) => `10^${v}`} />
      <div className="overflow-x-auto rounded border border-slate-200 p-3 text-sm dark:border-slate-700">
        <M>{`(\\cred{x} + \\cblue{y}) + \\cgreen{z} = ${fmtDE(links)}, \\qquad \\cred{x} + (\\cblue{y} + \\cgreen{z}) = ${fmtDE(rechts)}`}</M>
      </div>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">
        Auflösung der Maschinenzahlen bei <M>{`10^{${k}}`}</M>: benachbarte darstellbare
        Zahlen liegen dort etwa <M>{sciTex(ulp)}</M> auseinander.
      </p>
      <p className="max-w-prose text-sm text-slate-600 dark:text-slate-300">{status}</p>
    </div>
  );
}
