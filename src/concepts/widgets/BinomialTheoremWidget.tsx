/**
 * Einsicht: Beim Differenzenquotienten bleibt der lineare h-Term sichtbar.
 * Farben: Blau markiert n x^(n−1)h; Grau die übrigen Terme. Provenienz: neu.
 * Verifikation: algebraische Binomialformel, keine numerischen Verdiktclaims (2026-08-20, FA).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, MD, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

function choose(n: number, k: number) { let r = 1; for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j; return Math.round(r); }
export function ExpansionWidget() {
  const [n, setN] = useState(3);
  const terms = Array.from({ length: n + 1 }, (_, i) => {
    const c = choose(n, i); const coef = c === 1 ? "" : `${c}\\,`;
    const x = n - i === 0 ? "" : n - i === 1 ? "x" : `x^{${n - i}}`;
    const h = i === 0 ? "" : i === 1 ? "h" : `h^{${i}}`;
    return { text: `${coef}${x}${h}` || "1", linear: i === 1 };
  });
  return <div className={`mt-2 p-2 ${W_PANEL}`}>
    <Aufgabe>Verändern wir n und suchen wir den einzigen Term mit genau einem h.</Aufgabe>
    <MD>{`(x+h)^{${n}} = ${terms.map((t) => t.linear ? `\\cbblue{${t.text}}` : t.text).join(" + ")}`}</MD>
    <p className={`mt-1 text-xs ${W_TEXT}`}><span style={{ color: FMM_COLORS.blau }}>Blau:</span> linearer Term in h.</p>
    <Slider label="Exponent n" value={n} onChange={setN} min={1} max={7} step={1} />
    <Verdikt kind="neutral">Der blaue Term ist {n === 1 ? "h" : `${n}x${n === 2 ? "" : `^${n - 1}`}h`}; alle übrigen enthalten h² oder eine höhere Potenz.</Verdikt>
  </div>;
}
