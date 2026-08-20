/**
 * Konzept-Widget `binomial-coefficient`.
 *
 * DIE EINE EINSICHT: Jeder Binomialkoeffizient ist ein Eintrag im
 * Pascal-Dreieck, und jeder innere Eintrag ist die Summe seiner beiden direkten
 * Vorgänger — die Auswahlzählung und die Rekursion liefern dieselbe Zahl.
 *
 * FARBROLLEN: blau = der gewählte Eintrag (n, i); grün = seine beiden Vorgänger
 * in der Zeile darüber; alle übrigen Einträge in der Textfarbe. Flächen und
 * Ränder aus den Theme-Variablen (--w-bg / --w-border / --w-text).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   choose(5,2) = 10, choose(6,3) = 20; die Rekursion
 *   C(r,c) = C(r−1,c−1) + C(r−1,c) ist für ALLE inneren Einträge der
 *   gezeichneten Zeilen 0 … 7 per Assertion nachgerechnet.
 *
 * KORREKTUREN 2026-08-20 (Re-Audit QA-O0):
 *  - Die Aufgabenzeile verlangte, „die beiden Vorgänger zu verfolgen“, ohne dass
 *    das Widget sie zeigte; sie sind jetzt markiert.
 *  - Der Spalten-Regler lief bis 7, während der gezeichnete Eintrag bei n
 *    gekappt wurde: Regler und Bild widersprachen sich. Der Regler endet jetzt
 *    bei n.
 *  - Die Datei war eine einzige Minifizierungszeile und ist neu formatiert.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const ZEILEN = 8;
const W = 300;
const H = 186;

/** Binomialkoeffizient über die multiplikative Rekursion. */
function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let j = 1; j <= Math.min(k, n - k); j++) r = (r * (n - j + 1)) / j;
  return Math.round(r);
}

export function ChooseWidget() {
  const [n, setN] = useState(5);
  const [i, setI] = useState(2);
  const k = Math.min(i, n);
  const links = k - 1 >= 0 && n - 1 >= k - 1 ? choose(n - 1, k - 1) : null;
  const rechts = n - 1 >= k ? choose(n - 1, k) : null;
  const innen = links !== null && rechts !== null;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Wählen wir einen Eintrag im Pascal-Dreieck und verfolgen wir seine Vorgänger.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Pascal-Dreieck; hervorgehoben ist der Eintrag ${n} über ${k} mit dem Wert ${choose(n, k)}.`}
      >
        {Array.from({ length: ZEILEN }, (_, r) =>
          Array.from({ length: r + 1 }, (_, c) => {
            const x = W / 2 + (c - r / 2) * 32;
            const y = 20 + r * 21;
            const gewaehlt = r === n && c === k;
            const vorgaenger = innen && r === n - 1 && (c === k - 1 || c === k);
            const fuellung = gewaehlt
              ? FMM_COLORS.blau
              : vorgaenger
                ? FMM_COLORS.gruen
                : "var(--w-bg)";
            const rand = gewaehlt
              ? FMM_COLORS.blau
              : vorgaenger
                ? FMM_COLORS.gruen
                : "var(--w-border)";
            return (
              <g key={`${r}-${c}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={gewaehlt ? 12 : 9.5}
                  fill={fuellung}
                  stroke={rand}
                  strokeWidth={gewaehlt || vorgaenger ? 2 : 1}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill={gewaehlt || vorgaenger ? "#ffffff" : "var(--w-text)"}
                >
                  {choose(r, c)}
                </text>
              </g>
            );
          }),
        )}
        <text x="6" y={20 + 4} fontSize="9" fill="var(--w-muted)">
          n = 0
        </text>
        <text x="6" y={20 + 7 * 21 + 4} fontSize="9" fill="var(--w-muted)">
          n = 7
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: der gewählte Eintrag; Grün: seine beiden Vorgänger eine Zeile höher.
      </p>
      <Slider label="Zeile n" value={n} onChange={setN} min={0} max={7} step={1} fmt={(v) => fmtDe(v, 0)} />
      <Slider
        label="Spalte i"
        value={k}
        onChange={setI}
        min={0}
        max={n}
        step={1}
        fmt={(v) => fmtDe(v, 0)}
      />
      <Verdikt kind={innen ? "ok" : "neutral"}>
        {links !== null && rechts !== null ? (
          <>
            ({n} über {k}) = {fmtDe(choose(n, k), 0)} = {fmtDe(links, 0)} + {fmtDe(rechts, 0)}: die
            beiden grünen Vorgänger addieren sich genau zum blauen Eintrag. Dieselbe Zahl liefert
            die Formel n!/(i!(n−i)!).
          </>
        ) : (
          <>
            ({n} über {k}) = 1 — ein Randeintrag. Es gibt nur eine Art, keine oder alle {n}{" "}
            Objekte auszuwählen, und über dem Rand liegt kein zweiter Vorgänger.
          </>
        )}
      </Verdikt>
    </div>
  );
}
