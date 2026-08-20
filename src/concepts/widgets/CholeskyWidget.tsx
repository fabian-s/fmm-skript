/**
 * Konzept-Widget `cholesky-factorization`.
 *
 * DIE EINE EINSICHT: Positive Definitheit ist in der Geometrie und in der
 * Rechnung dieselbe Bedingung — genau dann, wenn die Niveaumenge xᵀAx = 1 eine
 * echte Ellipse ist, sind beide Wurzelschritte der Cholesky-Zerlegung reell.
 *
 * FARBROLLEN: blau = die Niveauellipse xᵀAx = 1; grün = der Faktor L; rot =
 * der abgebrochene zweite Wurzelschritt. Achsen, Ticks und Text aus den
 * Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   Voreinstellung A = [4 2; 2 3] ⇒ L = [2 0; 1 √2] mit √2 = 1,41…; LLᵀ = A
 *   exakt (elementweise per Assertion), Eigenwerte 5,5616 und 1,4384.
 *   Die Halbachsen von xᵀAx = 1 sind 1/√λ.
 *
 * KORREKTUREN 2026-08-20 (Re-Audit QA-O0):
 *  - Die Achsen waren zwei nackte Linien ohne Ticks und ohne Namen.
 *  - Die Ellipse hatte keine Größenbegrenzung: auf dem Reglerraster sind
 *    15 854 von 179 032 positiv definiten Tripeln (8,9 %) so schlecht
 *    konditioniert, dass die große Halbachse über MAX_R = 80 px hinauswächst;
 *    bei a = 0,9; b = −0,9; c = 0,9 wären es Milliarden Pixel. Die Zeichnung
 *    klemmt jetzt, zeichnet gestrichelt und sagt es im Verdikt.
 *  - „A = [4,0 2,0; 2,0 3,0]“ mit deutschem Dezimalkomma war nicht lesbar; die
 *    Matrizen stehen jetzt als Raster mit einer Nachkommastelle.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 180;
const CX = 150;
const CY = 90;
const S = 42; // Pixel je Welteinheit (Niveaumenge xᵀAx = 1)
const MAX_R = 80; // groesste zeichenbare Halbachse

function Matrix({
  zeilen,
  farbe,
  name,
}: {
  zeilen: string[][];
  farbe: string;
  name: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs" style={{ color: farbe }}>
      {name} =
      <span className="inline-block border-x-2 px-1" style={{ borderColor: farbe }}>
        {zeilen.map((z, i) => (
          <span key={i} className="grid grid-cols-2 gap-x-2 text-right leading-5">
            {z.map((v, j) => (
              <span key={j}>{v}</span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export function CholeskyWidget() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const q = c - (b * b) / a;
  const ok = a > 0 && q > 0;
  const l11 = Math.sqrt(a);
  const l21 = b / l11;
  const l22 = ok ? Math.sqrt(q) : NaN;
  const spur = a + c;
  const disk = Math.sqrt((a - c) ** 2 + 4 * b * b);
  const lam1 = (spur + disk) / 2;
  const lam2 = (spur - disk) / 2;
  const winkel = 0.5 * Math.atan2(2 * b, a - c);
  const rxRoh = ok ? S / Math.sqrt(lam1) : 0;
  const ryRoh = ok ? S / Math.sqrt(lam2) : 0;
  const geklemmt = ok && ryRoh > MAX_R;
  const rx = Math.min(rxRoh, MAX_R);
  const ry = Math.min(ryRoh, MAX_R);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verstellen wir A und beobachten wir Ellipse und zweiten Wurzelschritt.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Die Niveaumenge xᵀAx = 1 ist ${ok ? "eine Ellipse" : "keine Ellipse"}.`}
      >
        {[-1, 1].map((t) => (
          <g key={t}>
            <line x1={CX + t * S} y1={CY - 3} x2={CX + t * S} y2={CY + 3} stroke="var(--w-axis)" />
            <text
              x={CX + t * S}
              y={CY + 13}
              textAnchor="middle"
              fontSize={8}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
            <line x1={CX - 3} y1={CY - t * S} x2={CX + 3} y2={CY - t * S} stroke="var(--w-axis)" />
            <text
              x={CX - 5}
              y={CY - t * S + 3}
              textAnchor="end"
              fontSize={8}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
          </g>
        ))}
        <line x1={6} y1={CY} x2={W - 6} y2={CY} stroke="var(--w-axis)" />
        <line x1={CX} y1={4} x2={CX} y2={H - 6} stroke="var(--w-axis)" />
        <text x={W - 6} y={CY - 5} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₁
        </text>
        <text x={CX + 5} y={12} fontSize={9} fill="var(--w-muted)">
          x₂
        </text>
        {ok ? (
          <ellipse
            cx={CX}
            cy={CY}
            rx={rx}
            ry={ry}
            transform={`rotate(${(-winkel * 180) / Math.PI} ${CX} ${CY})`}
            fill={FMM_COLORS.blau}
            fillOpacity={0.12}
            stroke={FMM_COLORS.blau}
            strokeWidth="2"
            strokeDasharray={geklemmt ? "5 3" : undefined}
          />
        ) : (
          <text x={W / 2} y={CY - 10} textAnchor="middle" fill={FMM_COLORS.rot} fontSize="11">
            keine Ellipse
          </text>
        )}
        <text x={6} y={H - 4} fontSize={9} fill="var(--w-muted)">
          Niveaumenge xᵀAx = 1
        </text>
      </svg>
      <div className="mt-1 flex flex-wrap items-start gap-4">
        <Matrix
          name="A"
          farbe="var(--w-text)"
          zeilen={[
            [fmtDe(a, 1), fmtDe(b, 1)],
            [fmtDe(b, 1), fmtDe(c, 1)],
          ]}
        />
        {ok && (
          <Matrix
            name="L"
            farbe={FMM_COLORS.gruen}
            zeilen={[
              [fmtDe(l11, 2), "0"],
              [fmtDe(l21, 2), fmtDe(l22, 2)],
            ]}
          />
        )}
      </div>
      <p className={`mt-1 text-xs ${W_TEXT}`}>
        Blau: die Niveaumenge xᵀAx = 1; Grün: der Cholesky-Faktor L mit A = LLᵀ.
      </p>
      <Slider label="a₁₁" value={a} onChange={setA} min={0.5} max={6} step={0.1} />
      <Slider label="a₂₁ = a₁₂" value={b} onChange={setB} min={-4} max={4} step={0.1} />
      <Slider label="a₂₂" value={c} onChange={setC} min={0.5} max={6} step={0.1} />
      <Verdikt kind={ok ? (geklemmt ? "warn" : "ok") : "fail"}>
        {!ok ? (
          <>
            Der zweite Wurzelschritt verlangt a₂₂ − a₂₁²/a₁₁ = {fmtDe(q, 2)} &gt; 0. Hier ist er
            nicht positiv: l₂₂ wäre nicht reell, A ist nicht positiv definit, und die Niveaumenge
            ist keine Ellipse mehr, sondern eine Hyperbel.
          </>
        ) : geklemmt ? (
          <>
            Beide Wurzeln sind reell (l₂₂ = {fmtDe(l22, 2)}), A ist also positiv definit — aber
            knapp: der kleinere Eigenwert ist nur {fmtDe(lam2, 3)}, das Verhältnis λ₁/λ₂ ={" "}
            {fmtDe(lam1 / lam2, 0)}. Die Ellipse ist so gestreckt, dass wir sie nur noch
            abgeschnitten (gestrichelt) zeichnen können.
          </>
        ) : (
          <>
            Die Ellipse ist echt und l₂₂ = {fmtDe(l22, 2)} ist reell: A ist positiv definit. Die
            Eigenwerte {fmtDe(lam1, 2)} und {fmtDe(lam2, 2)} sind beide positiv, die Halbachsen
            sind 1/√λ.
          </>
        )}
      </Verdikt>
    </div>
  );
}
