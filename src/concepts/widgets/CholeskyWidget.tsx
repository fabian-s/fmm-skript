/** Einsicht: Positive Definitheit erscheint als echte Ellipse und reelle Cholesky-Wurzeln. Farben: Blau = Ellipse, Grün = L. Provenienz: neu; keine Zahlenclaims (2026-08-20, FA). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";
export function CholeskyWidget() {
  const [a, setA] = useState(4),
    [b, setB] = useState(2),
    [c, setC] = useState(3);
  const q = c - (b * b) / a,
    ok = a > 0 && q > 0,
    l11 = Math.sqrt(a),
    l21 = b / l11,
    l22 = ok ? Math.sqrt(q) : NaN;
  const tr = a + c,
    disc = Math.sqrt((a - c) ** 2 + 4 * b * b),
    l1 = (tr + disc) / 2,
    l2 = (tr - disc) / 2,
    ang = 0.5 * Math.atan2(2 * b, a - c),
    rx = ok ? 42 / Math.sqrt(l1) : 0,
    ry = ok ? 42 / Math.sqrt(l2) : 0;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verstellen wir A und beobachten wir Ellipse und zweiten Wurzelschritt.</Aufgabe>
      <svg
        viewBox="0 0 280 125"
        className="max-w-full h-auto"
        role="img"
        aria-label="Ellipse der quadratischen Form von A."
      >
        <line x1="0" y1="62" x2="140" y2="62" stroke="var(--w-axis)" />
        <line x1="70" y1="0" x2="70" y2="125" stroke="var(--w-axis)" />
        {ok ? (
          <ellipse
            cx="70"
            cy="62"
            rx={rx}
            ry={ry}
            transform={`rotate(${(-ang * 180) / Math.PI} 70 62)`}
            fill="none"
            stroke={FMM_COLORS.blau}
            strokeWidth="2"
          />
        ) : (
          <text x="12" y="60" fill="var(--w-text)" fontSize="12">
            keine Ellipse
          </text>
        )}
        <text x="155" y="25" fill="var(--w-text)" fontSize="12">
          A = [{fmtDe(a, 1)} {fmtDe(b, 1)}; {fmtDe(b, 1)} {fmtDe(c, 1)}]
        </text>
        {ok && (
          <text x="155" y="52" fill={FMM_COLORS.gruen} fontSize="12">
            L = [{fmtDe(l11, 2)} 0; {fmtDe(l21, 2)} {fmtDe(l22, 2)}]
          </text>
        )}
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: Niveauellipse der quadratischen Form; Grün: Cholesky-Faktor.
      </p>
      <Slider label="a₁₁" value={a} onChange={setA} min={0.5} max={6} step={0.1} />
      <Slider label="a₂₁ = a₁₂" value={b} onChange={setB} min={-4} max={4} step={0.1} />
      <Slider label="a₂₂" value={c} onChange={setC} min={0.5} max={6} step={0.1} />
      <Verdikt kind={ok ? "ok" : "fail"}>
        {ok
          ? "Die Ellipse ist echt und l₂₂ ist reell: A ist positiv definit."
          : "l₂₂² ist nicht positiv; A ist nicht positiv definit und die reelle Cholesky-Zerlegung bricht ab."}
      </Verdikt>
    </div>
  );
}
