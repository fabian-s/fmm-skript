/**
 * Konzept-Widget `binomial-theorem`.
 *
 * DIE EINE EINSICHT: Von allen Termen von (x+h)ⁿ enthält genau EINER die
 * Potenz h¹ — er trägt den Koeffizienten n und wird beim Differenzenquotienten
 * zu n·x^(n−1). Alle übrigen tragen h² oder mehr und verschwinden im Grenzwert.
 *
 * FARBROLLEN: blau (\cblue) = der lineare Term in h; alle anderen Terme bleiben
 * in der Textfarbe.
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   Die im Widget benutzte Rekursion für den Binomialkoeffizienten stimmt für
 *   n = 1 … 7 und alle i mit n!/(i!(n−i)!) überein; der Koeffizient bei i = 1
 *   ist stets n.
 * FEHLERKORREKTUR 2026-08-20 (Re-Audit QA-O0): Der Term stand vorher in
 * \cbblue{…}. Dieses Makro existiert NICHT (src/fmm-macros.ts kennt nur
 * \cblue); MathJax hat den Makronamen als mtext-Knoten in die Formel gesetzt
 * statt einzufärben — nachgewiesen in verify/QA-O0/check-cbblue.mjs.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MD, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

/** Binomialkoeffizient über die multiplikative Rekursion (ganzzahlig stabil). */
function choose(n: number, k: number): number {
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}

export function ExpansionWidget() {
  const [n, setN] = useState(3);
  const terme = Array.from({ length: n + 1 }, (_, i) => {
    const c = choose(n, i);
    const koef = c === 1 ? "" : `${c}\\,`;
    const x = n - i === 0 ? "" : n - i === 1 ? "x" : `x^{${n - i}}`;
    const h = i === 0 ? "" : i === 1 ? "h" : `h^{${i}}`;
    return { text: `${koef}${x}${h}` || "1", linear: i === 1 };
  });
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verändern wir n und suchen wir den einzigen Term mit genau einem h.</Aufgabe>
      <MD>{`(x+h)^{${n}} = ${terme.map((t) => (t.linear ? `\\cblue{${t.text}}` : t.text)).join(" + ")}`}</MD>
      <p className={`mt-1 text-xs ${W_TEXT}`}>
        <span style={{ color: FMM_COLORS.blau }}>Blau:</span> der lineare Term in h.
      </p>
      <Slider label="Exponent n" value={n} onChange={setN} min={1} max={7} step={1} />
      <Verdikt kind="neutral">
        {n === 1 ? (
          <>
            Für n = 1 ist (x+h)¹ = x + h; der blaue Term ist h selbst, und es gibt gar keine
            höheren h-Potenzen. Der Differenzenquotient ist hier schon exakt 1.
          </>
        ) : (
          <>
            Der blaue Term ist {n}x{n > 2 && <sup>{n - 1}</sup>}h; er ist der einzige mit genau
            einem h, alle übrigen tragen h² oder mehr. Nach Division durch h bleibt davon {n}x
            {n > 2 && <sup>{n - 1}</sup>} stehen, der Rest geht mit h gegen null.
          </>
        )}
      </Verdikt>
    </div>
  );
}
