/**
 * Konzept-Widget `rounding-error` (Auslöschung).
 *
 * DIE EINE EINSICHT: Zwei algebraisch identische Formeln sind numerisch nicht
 * dasselbe. Die naive Form subtrahiert zwei fast gleich große Zahlen und
 * verliert dabei genau die Stellen, auf die es ankommt; die umgeformte Variante
 * subtrahiert nie und behält sie.
 *
 * FARBROLLEN: rot = die naive Auswertung und ihre verlorenen Stellen; grün =
 * die stabile Auswertung und ihre erhaltenen Stellen. Der Balken ist kein
 * Koordinatenbild — er zeigt eine Anzahl korrekter Stellen und trägt diese
 * Anzahl als Zahl daneben, Achsen mit Ticks gäbe es hier nichts zu beschriften.
 *
 * PROVENIENZ: die beiden Formeln und der Regler aus der Vorfassung (Stand
 * 2026-08-20). NEU im Re-Audit QA-O1 ist das Fehlermaß: die Vorfassung maß den
 * Abstand zum Grenzwert 0,5 und behauptete deshalb schon bei k = 1 einen
 * Verlust von 13 Stellen, obwohl die naive Formel dort auf 14 Stellen stimmt —
 * bei x = 0,1 ist der wahre Funktionswert eben 0,4995834… und nicht 0,5. Bei
 * k = 6, wo tatsächlich zwölf Stellen verloren gehen, meldete sie umgekehrt
 * „stimmen überein". Gemessen wird jetzt gegen die stabile Auswertung.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * korrekte Stellen der naiven Formel, gegen die stabile Auswertung gerechnet,
 * für k = 1 … 9: 13,9 · 12,5 · 10,8 · 8,3 · 7,1 · 4,1 · 3,1 · 0 · 0. Sie fallen
 * monoton; bei k = 8 liefert die naive Formel exakt 0, also keine einzige
 * korrekte Stelle. Der Startzustand k = 4 hat 8,3 korrekte Stellen.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtDe } from "../../lib";

const MANTISSE = 16; // ungefähre Anzahl signifikanter Dezimalstellen eines double
const BB = 260;
const BH = 44;

export function CancellationWidget() {
  const [k, setK] = useState(4);
  const x = Math.pow(10, -k);
  const naiv = (1 - Math.cos(x)) / (x * x);
  const s = Math.sin(x / 2);
  const stabil = (2 * s * s) / (x * x);

  // Korrekte Stellen der naiven Formel, gemessen an der stabilen Auswertung.
  const relFehler = Math.abs(naiv - stabil) / Math.abs(stabil);
  const stellen =
    relFehler === 0 ? MANTISSE : Math.max(0, Math.min(MANTISSE, -Math.log10(relFehler)));
  const verloren = MANTISSE - stellen;

  const art = stellen >= 12 ? "ok" : stellen >= 6 ? "warn" : "fail";
  const balken = (anteil: number) => (BB - 96) * Math.max(0, Math.min(1, anteil));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Verkleinern wir x und vergleichen die zwei mathematisch gleichen Formeln.</Aufgabe>
      <div className="font-mono text-xs leading-5">
        <div>x = 10⁻{k}</div>
        <div>
          naiv&nbsp;&nbsp;(1 &minus; cos x)/x&sup2; ={" "}
          <span style={{ color: art === "ok" ? FMM_COLORS.gruen : FMM_COLORS.rot }}>
            {fmtDe(naiv, 10)}
          </span>
        </div>
        <div>
          stabil&nbsp;2&thinsp;sin&sup2;(x/2)/x&sup2; ={" "}
          <span style={{ color: FMM_COLORS.gruen }}>{fmtDe(stabil, 10)}</span>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${BB} ${BH}`}
        className="mt-1 h-auto max-w-full"
        role="img"
        aria-label={`Die naive Formel behält ${fmtDe(stellen, 1)} von 16 signifikanten Stellen, die stabile alle 16.`}
      >
        <text x={0} y={13} fontSize={10} fill="var(--w-muted)">
          naiv
        </text>
        <rect x={44} y={4} width={BB - 96} height={11} rx={2} fill="var(--w-grid)" />
        <rect x={44} y={4} width={balken(stellen / MANTISSE)} height={11} rx={2} fill={FMM_COLORS.rot} />
        <text x={BB} y={13} fontSize={10} textAnchor="end" fill="var(--w-text)">
          {fmtDe(stellen, 1)}
        </text>
        <text x={0} y={33} fontSize={10} fill="var(--w-muted)">
          stabil
        </text>
        <rect x={44} y={24} width={BB - 96} height={11} rx={2} fill="var(--w-grid)" />
        <rect x={44} y={24} width={balken(1)} height={11} rx={2} fill={FMM_COLORS.gruen} />
        <text x={BB} y={33} fontSize={10} textAnchor="end" fill="var(--w-text)">
          16,0
        </text>
      </svg>
      <Slider
        label="Exponent k"
        value={k}
        onChange={setK}
        min={1}
        max={9}
        step={1}
        fmt={(v) => v.toFixed(0)}
        accent={FMM_COLORS.rot}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        Balkenlänge: korrekte signifikante Stellen von 16, die naive Auswertung gemessen an der
        stabilen.
      </p>
      <Verdikt kind={art}>
        {stellen <= 0.001 ? (
          <>
            Vollständige Auslöschung: für x = 10⁻{k} rundet cos x auf genau 1, die Differenz wird 0
            und die naive Formel liefert 0 statt 0,5. Keine einzige korrekte Stelle bleibt übrig.
          </>
        ) : art === "fail" ? (
          <>
            Die naive Variante hat rund {fmtDe(verloren, 0)} ihrer 16 Stellen verloren und stimmt
            nur noch auf {fmtDe(stellen, 1)}. Der Grund ist die Differenz 1 − cos x: beide Zahlen
            sind fast gleich groß, ihre führenden Ziffern heben sich weg, und was bleibt, ist der
            zuvor begangene Rundungsfehler.
          </>
        ) : art === "warn" ? (
          <>
            Erste sichtbare Verluste: {fmtDe(stellen, 1)} korrekte Stellen statt 16. Die Auslöschung
            hat begonnen, aber das Ergebnis ist für viele Zwecke noch brauchbar – ein kleineres x
            ändert das rasch.
          </>
        ) : (
          <>
            Hier ist noch alles in Ordnung: {fmtDe(stellen, 1)} korrekte Stellen. 1 − cos x ist bei
            diesem x noch nicht klein gegen 1, also gibt es nichts auszulöschen. Der Unterschied
            zwischen den angezeigten Werten und 0,5 ist echte Mathematik, kein Rundungsfehler.
          </>
        )}
      </Verdikt>
    </div>
  );
}
