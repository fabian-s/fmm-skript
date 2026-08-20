/**
 * Konzept-Widget `cauchy-schwarz-inequality`.
 *
 * DIE EINE EINSICHT: |xᵀy| bleibt für jeden Winkel unter dem Längenprodukt
 * ‖x‖‖y‖ und erreicht es nur, wenn die beiden Vektoren parallel oder
 * antiparallel sind — der Gleichheitsfall ist kein Grenzfall, sondern genau die
 * Kollinearität.
 *
 * FARBROLLEN: blau = der feste Vektor x, violett = der gedrehte Vektor y;
 * orange = der Balken für |xᵀy|, grau (--w-muted) = der Balken für die Schranke
 * ‖x‖‖y‖. Achsen, Ticks und Text aus den Theme-Variablen.
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   ‖x‖ = 2,2 und ‖y‖ = 1,6 ⇒ Schranke ‖x‖‖y‖ = 3,52.
 *   |xᵀy| = 3,52·|cos ω|; auf dem Reglerraster (Schritt 0,02) ist |cos ω| > 0,999
 *   nur bei ω = 0; 0,02; 0,04 und 3,10; 3,12; 3,14 — das Erkennungsfenster
 *   |ω| < 0,03 bzw. |ω − π| < 0,03 liegt darin.
 *
 * KORREKTUR 2026-08-20 (Re-Audit QA-O0): Blau bezeichnete gleichzeitig den
 * Vektor x UND den Balken für das Skalarprodukt, und die beiden Vektoren waren
 * gar nicht beschriftet. Der Balken ist jetzt orange, die Vektoren tragen ihre
 * Namen.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 200;
const CX = 96;
const CY = 150;
const S = 34;
const NX = 2.2;
const NY = 1.6;
const SCHRANKE = NX * NY;
const BAR_X = 120;
const BAR_W = 165;

export function AngleWidget() {
  const [phi, setPhi] = useState(0.5);
  const dot = Math.abs(SCHRANKE * Math.cos(phi));
  const gleich = phi < 0.03 || Math.abs(phi - Math.PI) < 0.03;
  const parallel = phi < 0.03;
  const p = (r: number, a: number): [number, number] => [
    CX + S * r * Math.cos(a),
    CY - S * r * Math.sin(a),
  ];
  const x = p(NX, 0.35);
  const y = p(NY, 0.35 + phi);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Drehen wir y, bis beide Balken dieselbe Länge haben.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Zwei Vektoren mit dem Zwischenwinkel ${fmtDe((phi * 180) / Math.PI, 0)} Grad und der Vergleich von Skalarprodukt und Längenprodukt.`}
      >
        <text x={10} y={20} fill={FMM_COLORS.orange} fontSize="11">
          |xᵀy| = {fmtDe(dot, 2)}
        </text>
        <rect
          x={BAR_X}
          y={11}
          width={(BAR_W * dot) / SCHRANKE}
          height={11}
          fill={FMM_COLORS.orange}
        />
        <text x={10} y={44} fill="var(--w-text)" fontSize="11">
          ‖x‖‖y‖ = {fmtDe(SCHRANKE, 2)}
        </text>
        <rect x={BAR_X} y={35} width={BAR_W} height={11} fill="var(--w-muted)" />
        <line
          x1={BAR_X + BAR_W}
          y1={6}
          x2={BAR_X + BAR_W}
          y2={51}
          stroke="var(--w-axis)"
          strokeDasharray="3 2"
        />
        <text x={BAR_X + BAR_W} y={60} textAnchor="end" fontSize="9" fill="var(--w-muted)">
          Schranke
        </text>
        <line x1={CX - 40} y1={CY} x2={W - 10} y2={CY} stroke="var(--w-axis)" />
        <line x1={CX} y1={72} x2={CX} y2={CY + 30} stroke="var(--w-axis)" />
        <path
          d={`M ${CX + 26 * Math.cos(0.35)} ${CY - 26 * Math.sin(0.35)} A 26 26 0 0 0 ${CX + 26 * Math.cos(0.35 + phi)} ${CY - 26 * Math.sin(0.35 + phi)}`}
          fill="none"
          stroke="var(--w-muted)"
        />
        <text
          x={CX + 34 * Math.cos(0.35 + phi / 2)}
          y={CY - 34 * Math.sin(0.35 + phi / 2) + 4}
          fontSize="10"
          fill="var(--w-muted)"
        >
          ω
        </text>
        <line x1={CX} y1={CY} x2={x[0]} y2={x[1]} stroke={FMM_COLORS.blau} strokeWidth="3" />
        <text x={x[0] + 5} y={x[1] + 4} fontSize="12" fill={FMM_COLORS.blau}>
          x
        </text>
        <line x1={CX} y1={CY} x2={y[0]} y2={y[1]} stroke={FMM_COLORS.violett} strokeWidth="3" />
        <text x={y[0] + 5} y={y[1] - 2} fontSize="12" fill={FMM_COLORS.violett}>
          y
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: x; Violett: y; Orange: |xᵀy|; Grau: die Schranke ‖x‖‖y‖.
      </p>
      <Slider
        label="Winkel ω"
        value={phi}
        onChange={setPhi}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(v) => `${fmtDe((v * 180) / Math.PI, 0)}°`}
      />
      <Verdikt kind={gleich ? "ok" : "neutral"}>
        {gleich ? (
          <>
            Gleichheit erreicht: y ist ein {parallel ? "positives" : "negatives"} Vielfaches von x,
            beide Balken sind gleich lang. Genau dieser Fall — und nur er — macht die Ungleichung
            zur Gleichung.
          </>
        ) : (
          <>
            |xᵀy| = {fmtDe(dot, 2)} liegt um {fmtDe(SCHRANKE - dot, 2)} unter der Schranke{" "}
            {fmtDe(SCHRANKE, 2)}. Die Lücke ist ‖x‖‖y‖(1 − |cos ω|) und schließt sich nur, wenn
            die Richtungen zusammenfallen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
