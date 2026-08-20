/**
 * Konzept-Widget `covariance-matrix`.
 *
 * DIE EINE EINSICHT: ρ dreht und staucht dieselbe Punktwolke — die
 * Kovarianzmatrix beschreibt nicht nur zwei Streuungen, sondern eine geometrische
 * Ausrichtung; bei |ρ| nahe 1 bleibt praktisch nur noch eine Richtung übrig.
 *
 * FARBROLLEN: blau = die feste Standardnormalstichprobe; orange = die
 * 2σ-Kovarianzellipse mit ihren Hauptachsen. Achsen, Ticks und Beschriftungen
 * aus den Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau; Zufallszahlen deterministisch über die
 * Lib-Bausteine `mulberry32` (Seed 42) und `randn` — kein Math.random.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   Für Σ = [[1, ρ], [ρ, 1]] sind die Eigenwerte 1 ± |ρ| mit den Eigenrichtungen
 *   (1, ±1)/√2, die Halbachsen der 1σ-Ellipse also √(1 ± |ρ|) unter ±45°.
 *   Das Produkt der Halbachsen ist √(1 − ρ²) = √det Σ.
 *
 * KORREKTUR 2026-08-20 (Re-Audit QA-O0): Die Achsen trugen weder Ticks noch
 * Namen, obwohl Varianz 1 und die Ellipsengröße quantitative Aussagen sind.
 */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  fmtDe,
  FMM_COLORS,
  mulberry32,
  randn,
  Slider,
  Verdikt,
  W_PANEL,
  W_TEXT,
} from "../../lib";

const W = 300;
const H = 220;
const S = 30; // Pixel je Standardabweichung
const Z: [number, number][] = (() => {
  const r = mulberry32(42);
  return Array.from({ length: 180 }, () => [randn(r), randn(r)] as [number, number]);
})();

export function CovScatterWidget() {
  const [rho, setRho] = useState(0.8);
  const cx = W / 2;
  const cy = H / 2;
  const pts = useMemo(
    () =>
      Z.map(([z1, z2]) => [
        cx + S * z1,
        cy - S * (rho * z1 + Math.sqrt(1 - rho * rho) * z2),
      ]),
    [rho, cx, cy],
  );
  const winkel = 45 * (rho < 0 ? -1 : 1);
  const gross = Math.sqrt(1 + Math.abs(rho));
  const klein = Math.sqrt(1 - Math.abs(rho));
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verschieben wir ρ und verfolgen wir die Hauptachsen der Wolke.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Punktwolke mit der Kovarianzellipse für ρ = ${fmtDe(rho, 2)}.`}
      >
        {[-2, -1, 1, 2].map((t) => (
          <g key={t}>
            <line x1={cx + t * S} y1={cy - 4} x2={cx + t * S} y2={cy + 4} stroke="var(--w-axis)" />
            <text
              x={cx + t * S}
              y={cy + 14}
              textAnchor="middle"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
            <line x1={cx - 4} y1={cy - t * S} x2={cx + 4} y2={cy - t * S} stroke="var(--w-axis)" />
            <text
              x={cx - 6}
              y={cy - t * S + 3}
              textAnchor="end"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
          </g>
        ))}
        <line x1="0" y1={cy} x2={W} y2={cy} stroke="var(--w-axis)" />
        <line x1={cx} y1="0" x2={cx} y2={H} stroke="var(--w-axis)" />
        <text x={W - 4} y={cy - 6} textAnchor="end" fontSize={10} fill="var(--w-muted)">
          x₁
        </text>
        <text x={cx + 6} y={12} fontSize={10} fill="var(--w-muted)">
          x₂
        </text>
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill={FMM_COLORS.blau} opacity=".55" />
        ))}
        <g transform={`rotate(${-winkel} ${cx} ${cy})`}>
          <ellipse
            cx={cx}
            cy={cy}
            rx={2 * S * gross}
            ry={2 * S * klein}
            fill="none"
            stroke={FMM_COLORS.orange}
            strokeWidth="2"
          />
          <line
            x1={cx - 2 * S * gross}
            y1={cy}
            x2={cx + 2 * S * gross}
            y2={cy}
            stroke={FMM_COLORS.orange}
          />
          <line
            x1={cx}
            y1={cy - 2 * S * klein}
            x2={cx}
            y2={cy + 2 * S * klein}
            stroke={FMM_COLORS.orange}
          />
        </g>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: eine feste Standardnormalstichprobe (Seed 42, 180 Punkte); Orange: die
        2σ-Ellipse mit ihren Hauptachsen. Beide Koordinaten haben Varianz 1.
      </p>
      <Slider
        label="Korrelation ρ"
        value={rho}
        onChange={setRho}
        min={-0.95}
        max={0.95}
        step={0.05}
      />
      <Verdikt kind={Math.abs(rho) > 0.8 ? "warn" : Math.abs(rho) < 0.05 ? "neutral" : "ok"}>
        {Math.abs(rho) < 0.05 ? (
          <>
            Bei ρ = 0 sind die Halbachsen gleich lang: die Ellipse ist ein Kreis, es gibt keine
            ausgezeichnete Richtung. Die Kovarianzmatrix ist die Einheitsmatrix.
          </>
        ) : Math.abs(rho) > 0.8 ? (
          <>
            Die Halbachsen stehen wie {fmtDe(gross, 2)} zu {fmtDe(klein, 2)}, also{" "}
            {fmtDe(gross / klein, 1)} zu 1. Fast die ganze Streuung liegt auf einer Richtung — die
            zweite Koordinate trägt kaum noch eigene Information.
          </>
        ) : (
          <>
            Die Hauptachsen liegen bei {rho > 0 ? "+45" : "−45"}°, und sie verhalten sich wie
            √(1+|ρ|) : √(1−|ρ|) = {fmtDe(gross, 2)} : {fmtDe(klein, 2)}. Das Vorzeichen von ρ
            dreht die Wolke, sein Betrag staucht sie.
          </>
        )}
      </Verdikt>
    </div>
  );
}
