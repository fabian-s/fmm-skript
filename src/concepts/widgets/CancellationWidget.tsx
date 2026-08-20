/**
 * Konzept-Widget `cancellation`.
 *
 * DIE EINE EINSICHT: Die Subtraktion zweier fast gleicher Zahlen ist selbst
 * exakt — sie erzeugt keinen Fehler, sondern legt die schon vorhandenen
 * Rundungsfehler frei und verstärkt sie relativ um den Faktor |a|/|a−b|.
 *
 * FARBROLLEN: rot (durchgestrichen) = die gemeinsamen führenden Ziffern, die
 * sich wegheben; grün = der Rest, der die Differenz allein trägt. Fließtext und
 * Flächen über die surface.ts-Ketten (W_PANEL / W_TEXT).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20),
 * a = 1,23456789 und b = a·(1 − 10⁻ᵏ):
 *   |a|/|a−b| = 10^k, auf ganze Zahlen gerundet exakt für k = 1 … 8 (die
 *   Rechnung selbst weicht wegen Auslöschung um bis zu 1,9·10⁻⁹ relativ ab).
 *   Die Zahl der übereinstimmenden ZEICHEN in fmtDe(·,10) ist k+1 — das eine
 *   Zeichen mehr ist das Dezimalkomma, die Zahl gemeinsamer ZIFFERN ist also
 *   genau k, wie der Regler behauptet.
 *
 * KORREKTUR 2026-08-20 (Re-Audit QA-O0): Die Datei war eine
 * Minifizierungszeile; das Verdikt behauptete außerdem in jedem Zustand, die
 * Altfehler „dominieren“ — bei k = 1 (Faktor 10) ist das falsch. Jetzt drei
 * Zustandsklassen.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const A = 1.23456789;

export function DigitWidget() {
  const [k, setK] = useState(4);
  const b = A * (1 - 10 ** -k);
  const d = A - b;
  const sa = fmtDe(A, 10);
  const sb = fmtDe(b, 10);
  let p = 0;
  while (p < sa.length && sa[p] === sb[p]) p++;
  const faktor = Math.abs(A / d);
  // 16 signifikante Dezimalstellen sind das Budget der doppelten Genauigkeit.
  const uebrig = Math.max(0, 16 - k);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Erhöhen wir die gemeinsamen führenden Ziffern und vergleichen wir den Rest.</Aufgabe>
      <div className={`font-mono text-xs leading-5 ${W_TEXT}`}>
        <div>
          a ={" "}
          <s style={{ color: FMM_COLORS.rot }}>{sa.slice(0, p)}</s>
          <span style={{ color: FMM_COLORS.gruen }}>{sa.slice(p)}</span>
        </div>
        <div>
          b ={" "}
          <s style={{ color: FMM_COLORS.rot }}>{sb.slice(0, p)}</s>
          <span style={{ color: FMM_COLORS.gruen }}>{sb.slice(p)}</span>
        </div>
        <div>a−b = {fmtDe(d, Math.min(10, k + 2))}</div>
      </div>
      <p className={`mt-1 text-xs ${W_TEXT}`}>
        Rot: die Ziffern, die sich wegheben; Grün: der Rest, der die Differenz trägt.
      </p>
      <Slider label="gemeinsame Ziffern k" value={k} onChange={setK} min={1} max={8} step={1} />
      <Verdikt kind={k <= 2 ? "neutral" : k <= 5 ? "warn" : "fail"}>
        {k <= 2 ? (
          <>
            Die Verstärkung ist erst {fmtDe(faktor, 0)} = 10<sup>{k}</sup>. Von den rund 16
            signifikanten Stellen sind noch {uebrig} übrig — hier ist die Differenz praktisch
            unbedenklich.
          </>
        ) : k <= 5 ? (
          <>
            Die Verstärkung beträgt {fmtDe(faktor, 0)} = 10<sup>{k}</sup>. Rund {k} der 16
            signifikanten Stellen sind weg; ein vorher unsichtbarer Rundungsfehler wird jetzt
            sichtbar.
          </>
        ) : (
          <>
            Die Verstärkung beträgt {fmtDe(faktor, 0)} = 10<sup>{k}</sup>: nur noch etwa{" "}
            {uebrig} signifikante Stellen tragen das Ergebnis. Jetzt dominieren die schon
            vorhandenen Fehler den kleinen Rest — genauer rechnen hilft nicht, nur umformen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
