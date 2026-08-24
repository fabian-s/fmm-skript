/**
 * Konzept-Widget `infinite-series`.
 *
 * DIE EINE EINSICHT: Nach endlich vielen Summanden bleibt immer eine Lücke zum
 * Grenzwert — das Restglied. Es wird beliebig klein, aber nie null; genau das
 * meint „die Reihe hat den Wert 2“.
 *
 * FARBROLLEN: blau = die Partialsumme Sₙ; rot = das Restglied Rₙ, also die
 * Lücke bis zum Grenzwert 2. Skala und Beschriftungen aus den Theme-Variablen.
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   Σ_{k=0}^{n} 2⁻ᵏ = 2 − 2⁻ⁿ, geprüft für n = 1 … 12; das Restglied ist also
 *   exakt Rₙ = 2⁻ⁿ. Das sind n+1 Summanden, weshalb der Regler „Index n“ heißt
 *   und nicht „Summanden n“.
 *   Der Rest-Text stand früher bei x = 140·Sₙ + 4 und lief schon bei kleinem n
 *   aus dem 280 breiten viewBox heraus; er sitzt jetzt fest am rechten Rand.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 74;
const PAD_L = 8;
const PAD_R = 8;
const Y0 = 16;
const HOEHE = 26;

export function PartialSumBar() {
  const [n, setN] = useState(3);
  const teil = 2 - 2 ** -n;
  const rest = 2 ** -n;
  const skala = (v: number) => PAD_L + (v / 2) * (W - PAD_L - PAD_R);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Erhöhen wir n und beobachten wir die verbleibende Lücke.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Ein Balken der Länge ${fmtDe(teil, 4)} von 2; die verbleibende Lücke beträgt ${fmtDe(rest, 4)}.`}
      >
        <rect
          x={PAD_L}
          y={Y0}
          width={skala(teil) - PAD_L}
          height={HOEHE}
          fill={FMM_COLORS.blau}
        />
        <rect
          x={skala(teil)}
          y={Y0}
          width={Math.max(1, skala(2) - skala(teil))}
          height={HOEHE}
          fill={FMM_COLORS.rot}
          fillOpacity=".45"
        />
        <rect
          x={PAD_L}
          y={Y0}
          width={skala(2) - PAD_L}
          height={HOEHE}
          fill="none"
          stroke="var(--w-border)"
        />
        {[0, 0.5, 1, 1.5, 2].map((v) => (
          <g key={v}>
            <line
              x1={skala(v)}
              y1={Y0 + HOEHE}
              x2={skala(v)}
              y2={Y0 + HOEHE + 4}
              stroke="var(--w-axis)"
            />
            <text
              x={skala(v)}
              y={Y0 + HOEHE + 15}
              textAnchor="middle"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {fmtDe(v, 1)}
            </text>
          </g>
        ))}
        <text x={PAD_L} y={11} fontSize={9} fill={FMM_COLORS.blau}>
          Sₙ = {fmtDe(teil, 4)}
        </text>
        <text x={W - PAD_R} y={11} textAnchor="end" fontSize={9} fill={FMM_COLORS.rot}>
          Rₙ = {fmtDe(rest, 4)}
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: die Partialsumme Sₙ; Rot: das Restglied Rₙ bis zum Grenzwert 2.
      </p>
      <Slider
        label="Index n"
        value={n}
        onChange={setN}
        min={1}
        max={12}
        step={1}
        fmt={(v) => fmtDe(v, 0)}
      />
      <Verdikt kind={rest < 0.01 ? "ok" : "neutral"}>
        {rest < 0.01 ? (
          <>
            Sₙ = {fmtDe(teil, 4)}; die rote Lücke ist auf Rₙ = 2<sup>−{n}</sup> ={" "}
            {fmtDe(rest, 4)} zusammengeschrumpft und im Balken kaum noch zu sehen. Verschwunden
            ist sie trotzdem nicht — für jedes endliche n bleibt ein Rest.
          </>
        ) : (
          <>
            Sₙ = {fmtDe(teil, 4)}; die rote Lücke ist genau Rₙ = 2<sup>−{n}</sup> ={" "}
            {fmtDe(rest, 4)}. Jeder weitere Summand halbiert sie.
          </>
        )}
      </Verdikt>
    </div>
  );
}
