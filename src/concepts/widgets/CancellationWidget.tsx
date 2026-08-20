/**
 * Einsicht: Auslöschung macht vorhandene relative Fehler um etwa 10^k größer.
 * Farben: Rot gestrichen = verlorene Ziffern, Grün = verbleibende Information. Provenienz: neu.
 * Verifikation: verify/FA/check-numbers.mjs (2026-08-20): |a|/|a-b|=10^k.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";
export function DigitWidget() {
  const [k, setK] = useState(4); const a = 1.23456789; const b = a * (1 - 10 ** -k); const d = a - b;
  const sa = fmtDe(a, 10); const sb = fmtDe(b, 10); let p = 0; while (p < sa.length && sa[p] === sb[p]) p++;
  const factor = Math.abs(a / d);
  return <div className={`mt-2 p-2 ${W_PANEL}`}>
    <Aufgabe>Erhöhen wir die gemeinsamen führenden Ziffern und vergleichen wir den Rest.</Aufgabe>
    <div className={`font-mono text-xs leading-5 ${W_TEXT}`}><div>a = <s style={{ color: FMM_COLORS.rot }}>{sa.slice(0,p)}</s><span style={{ color: FMM_COLORS.gruen }}>{sa.slice(p)}</span></div><div>b = <s style={{ color: FMM_COLORS.rot }}>{sb.slice(0,p)}</s><span style={{ color: FMM_COLORS.gruen }}>{sb.slice(p)}</span></div><div>a−b = {fmtDe(d, Math.min(10, k + 2))}</div></div>
    <p className={`mt-1 text-xs ${W_TEXT}`}>Rot: weggefallene Ziffern; Grün: der Rest.</p>
    <Slider label="gemeinsame Ziffern k" value={k} onChange={setK} min={1} max={8} step={1} />
    <Verdikt kind="warn">Die Verstärkung beträgt etwa {fmtDe(factor, 0)} = 10^{k}. Bereits vorhandene relative Fehler dominieren deshalb den kleinen Rest.</Verdikt>
  </div>;
}
