/**
 * Einsicht: Das Skalarprodukt erreicht die Längen-Schranke nur bei parallelen Richtungen.
 * Farben: Blau = |xᵀy|, Grau = ||x||||y||. Provenienz: neu.
 * Verifikation: verify/FA/check-numbers.mjs (2026-08-20): |cos ω|=1 nur bei 0, π.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";
export function AngleWidget() {
  const [phi, setPhi] = useState(0.5);
  const nx = 2.2,
    ny = 1.6,
    bound = nx * ny,
    dot = Math.abs(bound * Math.cos(phi)),
    equal = phi < 0.03 || Math.abs(phi - Math.PI) < 0.03;
  const W = 280,
    H = 190,
    cx = 140,
    cy = 138,
    s = 42;
  const p = (r: number, a: number): [number, number] => [
    cx + s * r * Math.cos(a),
    cy - s * r * Math.sin(a),
  ];
  const x = p(nx, 0.35),
    y = p(ny, 0.35 + phi);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Drehen wir y, bis beide Balken dieselbe Länge haben.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Zwei Vektoren und der Vergleich von Skalarprodukt und Längenprodukt."
      >
        <line x1={cx} y1={cy} x2={x[0]} y2={x[1]} stroke={FMM_COLORS.blau} strokeWidth="3" />
        <line x1={cx} y1={cy} x2={y[0]} y2={y[1]} stroke={FMM_COLORS.violett} strokeWidth="3" />
        <text x={10} y={20} fill="var(--w-text)" fontSize="11">
          |xᵀy| = {fmtDe(dot, 2)}
        </text>
        <rect x={100} y={12} width={(150 * dot) / bound} height={10} fill={FMM_COLORS.blau} />
        <text x={10} y={42} fill="var(--w-text)" fontSize="11">
          ||x||||y|| = {fmtDe(bound, 2)}
        </text>
        <rect x={100} y={34} width="150" height="10" fill="var(--w-muted)" />
      </svg>
      <p className={`text-xs ${W_TEXT}`}>Blau: Skalarprodukt; Grau: Schranke.</p>
      <Slider
        label="Winkel ω"
        value={phi}
        onChange={setPhi}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(v) => `${fmtDe((v * 180) / Math.PI, 0)}°`}
      />
      <Verdikt kind={equal ? "ok" : "neutral"}>
        {equal
          ? "Gleichheit erkannt: Die Vektoren sind parallel oder antiparallel."
          : "Die blaue Länge bleibt unter der grauen Schranke; nur Parallelität kann die Lücke schließen."}
      </Verdikt>
    </div>
  );
}
