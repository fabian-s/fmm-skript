/**
 * Konzept-Widget `low-rank-approximation`.
 *
 * DIE EINE EINSICHT: Ein kleiner Rang kann fast die ganze Frobenius-Energie
 * tragen — was wir wegwerfen, kostet nur den nächsten Singulärwert als
 * Spektralfehler.
 *
 * FARBROLLEN: blau = die behaltenen Singulärwerte σ₁ … σ_k; grau (--w-muted) =
 * die verworfenen. Achsen, Ticks und Beschriftungen aus den Theme-Variablen.
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20),
 * Spektrum σ = (10; 6; 2,5; 0,9; 0,3; 0,08):
 *   Σσᵢ² = 143,1564. Behaltene Energie je k in Prozent:
 *   k=1 → 69,85; k=2 → 95,00 (genau 95,001, knapp über der Verdikt-Schwelle);
 *   k=3 → 99,37; k=4 → 99,93; k=5 → 100,00; k=6 → 100,00.
 *   Bei k = 6 gibt es kein σ₇ mehr; der Spektralfehler ist dann exakt 0 und das
 *   Verdikt sagt das ausdrücklich, statt ein nicht existierendes σ₇ zu zitieren.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const SIGMAS = [10, 6, 2.5, 0.9, 0.3, 0.08];
const W = 300;
const H = 176;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 24;
const PAD_B = 30;

export function TruncateWidget() {
  const [k, setK] = useState(2);
  const voll = k >= SIGMAS.length;
  const err = voll ? 0 : SIGMAS[k];
  const energie = SIGMAS.reduce((a, v) => a + v * v, 0);
  const anteil = SIGMAS.slice(0, k).reduce((a, v) => a + v * v, 0) / energie;
  const balken = (W - PAD_L - PAD_R) / SIGMAS.length;
  const y = (v: number) => H - PAD_B - (v / 10) * (H - PAD_T - PAD_B);
  return (
    <div className={`mt-2 p-2 text-sm ${W_PANEL}`}>
      <Aufgabe>Wählen wir einen Rang und vergleichen wir Fehler und behaltene Energie.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Singulärwert-Spektrum; die ersten ${k} Werte sind behalten, der Spektralfehler ist ${fmtDe(err, 2)}.`}
      >
        {[0, 2, 4, 6, 8, 10].map((v) => (
          <g key={`y${v}`}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(v)}
              y2={y(v)}
              stroke={v === 0 ? "var(--w-axis)" : "var(--w-grid)"}
              strokeWidth={v === 0 ? 1 : 0.6}
            />
            <text x={PAD_L - 4} y={y(v) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtDe(v, 0)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={y(0)} stroke="var(--w-axis)" />
        <text x={PAD_L - 4} y={PAD_T - 8} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          σᵢ
        </text>
        {SIGMAS.map((s, i) => {
          const behalten = i < k;
          const x0 = PAD_L + i * balken + 4;
          return (
            <g key={i}>
              <rect
                x={x0}
                y={y(s)}
                width={balken - 8}
                height={y(0) - y(s)}
                fill={behalten ? FMM_COLORS.blau : "var(--w-muted)"}
                opacity={behalten ? 1 : 0.45}
              />
              <text
                x={x0 + (balken - 8) / 2}
                y={y(s) - 3}
                textAnchor="middle"
                fill="var(--w-text)"
                fontSize={9}
              >
                {fmtDe(s, s < 1 ? 2 : 1)}
              </text>
              <text
                x={x0 + (balken - 8) / 2}
                y={y(0) + 13}
                textAnchor="middle"
                fill={behalten ? FMM_COLORS.blau : "var(--w-muted)"}
                fontSize={10}
              >
                σ{"₁₂₃₄₅₆"[i]}
              </text>
            </g>
          );
        })}
        {!voll && (
          <line
            x1={PAD_L + k * balken}
            y1={PAD_T}
            x2={PAD_L + k * balken}
            y2={y(0) + 4}
            stroke={FMM_COLORS.rot}
            strokeDasharray="3 3"
          />
        )}
        <text x={W - PAD_R} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          Index i
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: die behaltenen Singulärwerte; Grau: die verworfenen; die rote Linie ist die
        Abschneidegrenze.
      </p>
      <Slider label="Rang k" value={k} onChange={setK} min={1} max={6} step={1} fmt={(v) => fmtDe(v, 0)} />
      <Verdikt kind={voll ? "neutral" : anteil > 0.95 ? "ok" : "warn"}>
        {voll ? (
          <>
            Bei k = {k} bleibt nichts übrig: A<sub>k</sub> = A, der Spektralfehler ist null. Eine
            Approximation ist das nicht mehr, nur noch eine andere Schreibweise für A.
          </>
        ) : (
          <>
            Die ersten {k} Terme tragen {fmtDe(100 * anteil, 1)} % der quadrierten Singulärwerte;
            der Spektralfehler ist genau der erste weggelassene Wert,
            ‖A − A<sub>k</sub>‖₂ = σ<sub>{k + 1}</sub> = {fmtDe(err, 2)}.
          </>
        )}
      </Verdikt>
    </div>
  );
}
