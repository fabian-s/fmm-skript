/**
 * Konzept-Widget `convergence`.
 *
 * DIE EINE EINSICHT: Konvergenz heißt nicht „die Folge kommt näher“, sondern:
 * zu JEDER Toleranz ε gibt es einen Index N(ε), ab dem ALLE weiteren Glieder im
 * Band liegen. Nur endlich viele Glieder dürfen draußen bleiben.
 *
 * FARBROLLEN: grün = das ε-Band um den Grenzwert 1 und die Glieder darin;
 * orange = die endlich vielen Glieder außerhalb. Achsen, Ticks und
 * Beschriftungen aus den Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20),
 * Folge aₙ = 1 + (−0,75)ⁿ mit Grenzwert 1:
 *   N(ε) = ⌊ln ε / ln 0,75⌋ + 1 stimmt für alle 56 Reglerwerte ε = 0,05 … 0,60
 *   mit dem kleinsten N überein, ab dem |aₙ − 1| < ε für alle n ≥ N gilt
 *   (nachgeprüft bis n = 200). Randwerte: N(0,60) = 2, N(0,05) = 11.
 *   Gezeichnet sind n = 1 … 24, also stets mehr als N(ε).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 168;
const PAD_L = 26;
const PAD_R = 8;
const PAD_T = 22;
const PAD_B = 26;
const N_MAX = 24;

export function ToleranceBandWidget() {
  const [eps, setEps] = useState(0.3);
  const y = (v: number) => PAD_T + (1 - v / 2) * (H - PAD_T - PAD_B);
  const x = (n: number) => PAD_L + ((n - 1) / (N_MAX - 1)) * (W - PAD_L - PAD_R);
  const need = Math.floor(Math.log(eps) / Math.log(0.75)) + 1;
  const dots = Array.from({ length: N_MAX }, (_, i) => {
    const n = i + 1;
    const a = 1 + (-0.75) ** n;
    return { n, a, inside: Math.abs(a - 1) < eps };
  });
  const draussen = dots.filter((d) => !d.inside).length;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verkleinern wir ε und lesen wir den ersten dauerhaft sicheren Index ab.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Die Folge aₙ = 1 + (−0,75)ⁿ mit dem Toleranzband von 1 − ε bis 1 + ε um den Grenzwert 1, ε = ${fmtDe(eps, 2)}; ab n = ${need} liegen alle Glieder im Band.`}
      >
        <rect
          x={PAD_L}
          y={y(1 + eps)}
          width={W - PAD_L - PAD_R}
          height={y(1 - eps) - y(1 + eps)}
          fill={FMM_COLORS.gruen}
          opacity=".2"
        />
        {[0, 0.5, 1, 1.5, 2].map((v) => (
          <g key={`y${v}`}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--w-grid)"
              strokeWidth={0.6}
            />
            <text x={PAD_L - 4} y={y(v) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(v, 1)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={y(0)} x2={W - PAD_R} y2={y(0)} stroke="var(--w-axis)" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={y(0)} stroke="var(--w-axis)" />
        {[1, 5, 10, 15, 20, 24].map((n) => (
          <g key={`x${n}`}>
            <line x1={x(n)} y1={y(0)} x2={x(n)} y2={y(0) + 4} stroke="var(--w-axis)" />
            <text
              x={x(n)}
              y={y(0) + 14}
              textAnchor="middle"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {n}
            </text>
          </g>
        ))}
        <text x={W - PAD_R} y={H - 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          n
        </text>
        <text x={PAD_L} y={PAD_T - 8} fontSize={9} fill="var(--w-muted)">
          aₙ
        </text>
        <line
          x1={PAD_L}
          y1={y(1)}
          x2={W - PAD_R}
          y2={y(1)}
          stroke={FMM_COLORS.gruen}
          strokeDasharray="4 3"
        />
        <text x={W - PAD_R - 2} y={y(1) - 4} textAnchor="end" fontSize={9} fill={FMM_COLORS.gruen}>
          Grenzwert 1
        </text>
        {need <= N_MAX && (
          <>
            <line
              x1={x(need)}
              y1={PAD_T}
              x2={x(need)}
              y2={y(0)}
              stroke={FMM_COLORS.orange}
              strokeDasharray="3 3"
            />
            <text
              x={x(need) + 3}
              y={PAD_T + 9}
              fontSize={9}
              fill={FMM_COLORS.orange}
            >
              N(ε) = {need}
            </text>
          </>
        )}
        {dots.map((d) => (
          <circle
            key={d.n}
            cx={x(d.n)}
            cy={y(d.a)}
            r="3.5"
            fill={d.inside ? FMM_COLORS.gruen : FMM_COLORS.orange}
          />
        ))}
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        aₙ = 1 + (−0,75)ⁿ · Band: 1 − ε bis 1 + ε · Grün: im Band; Orange: noch außerhalb.
      </p>
      <Slider label="Toleranz ε" value={eps} onChange={setEps} min={0.05} max={0.6} step={0.01} />
      <Verdikt kind="ok">
        {draussen === 0 ? (
          <>
            Schon a₁ liegt im Band: N(ε) = {need} für ε = {fmtDe(eps, 2)}. Kein einziges Glied
            fällt heraus.
          </>
        ) : (
          <>
            Genau {draussen} {draussen === 1 ? "Glied liegt" : "Glieder liegen"} außerhalb des
            Bandes, ab n = {need} bleiben alle drin: |aₙ − 1| = 0,75ⁿ &lt; {fmtDe(eps, 2)}. Für
            jedes kleinere ε rückt N(ε) nach rechts, endlich bleibt es immer.
          </>
        )}
      </Verdikt>
    </div>
  );
}
