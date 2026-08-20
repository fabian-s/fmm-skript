/**
 * Einsicht: Jeder Binomialkoeffizient ist ein Eintrag im Pascal-Dreieck.
 * Farben: blau = gewählter Eintrag, grau = übrige Einträge. Provenienz: Eigenbau.
 * Verifiziert: choose(5,2)=10, choose(6,3)=20 mit verify-konzepte-C6/binomial.mjs (2026-08-19).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";

function choose(n: number, k: number) { let r = 1; for (let j = 1; j <= Math.min(k, n-k); j++) r = (r * (n - j + 1)) / j; return Math.round(r); }
export function ChooseWidget() {
  const [n, setN] = useState(5); const [kRaw, setK] = useState(2); const k = Math.min(kRaw, n);
  return <div className="mt-2 rounded bg-slate-700/60 p-2">
    <Aufgabe>Wählen wir einen Eintrag im Pascal-Dreieck und verfolgen wir seine beiden Vorgänger.</Aufgabe>
    <svg viewBox="0 0 280 170" className="max-w-full h-auto" role="img" aria-label={`Pascal-Dreieck mit dem Eintrag ${n} über ${k}.`}>
      {Array.from({length: 8}, (_, r) => Array.from({length:r+1},(_,c) => { const x=140+(c-r/2)*31,y=18+r*20, hit=r===n&&c===k; return <g key={`${r}-${c}`}><circle cx={x} cy={y} r={hit?12:9} fill={hit?FMM_COLORS.blau:"var(--w-bg)"} stroke={hit?FMM_COLORS.blau:"var(--w-border)"}/><text x={x} y={y+4} textAnchor="middle" fontSize="10" fill={hit?"white":"var(--w-text)"}>{choose(r,c)}</text></g>; }))}
    </svg>
    <Slider label="Zeile n" value={n} onChange={setN} min={0} max={7} step={1} fmt={(v)=>fmtDe(v,0)} />
    <Slider label="Spalte i" value={kRaw} onChange={setK} min={0} max={7} step={1} fmt={(v)=>fmtDe(v,0)} />
    <Verdikt kind="neutral">Der Eintrag ({n}, {k}) hat den Wert {fmtDe(choose(n,k),0)}: Jeder innere Eintrag ist die Summe seiner zwei Vorgänger.</Verdikt>
  </div>;
}
