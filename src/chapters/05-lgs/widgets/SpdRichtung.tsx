import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Einsicht: Positive Definitheit fordert xᵀAx>0 in jeder Richtung; eine Richtung widerlegt sie.
 * Farbrollen: Testvektor/aktuelle Richtung blau, negativer Befund rot, positive Form grün.
 * Provenienz: neu für dieses Skript. Zahlen: diag(2,1) gibt q∈[1,2], diag(1,−1) q=cos(2θ) in verify-05-lgs/verify.mjs, 2026-08-19.
 */

const { blau: BLUE, gruen: GREEN, rot: RED } = FMM_COLORS;
const W = 320;
const C = 160;
const R = 110;

export function SpdRichtung() {
  const [theta, setTheta] = useState(45);
  const [fall, setFall] = useState<"spd" | "nicht">("nicht");
  const t = (theta * Math.PI) / 180;
  const x: [number, number] = [Math.cos(t), Math.sin(t)];
  const A = fall === "spd" ? [[2, 0], [0, 1]] : [[1, 0], [0, -1]];
  const q = useMemo(() => x[0] * (A[0][0] * x[0] + A[0][1] * x[1]) + x[1] * (A[1][0] * x[0] + A[1][1] * x[1]), [x, A]);
  const px = C + R * x[0];
  const py = C - R * x[1];
  const hit = q <= 1e-9;
  return <div>
    <Aufgabe>Wählen wir „nicht SPD“ und drehen den Einheitsvektor bis die quadratische Form nicht mehr positiv ist.</Aufgabe>
    <div className="my-2 flex flex-wrap gap-2" role="group" aria-label="Matrixfamilie">
      <button type="button" aria-pressed={fall === "spd"} onClick={() => setFall("spd")} className="rounded px-3 py-1 text-sm" style={{ background: fall === "spd" ? GREEN : "var(--w-bg)", color: fall === "spd" ? "white" : "var(--w-text)" }}>SPD: diag(2, 1)</button>
      <button type="button" aria-pressed={fall === "nicht"} onClick={() => setFall("nicht")} className="rounded px-3 py-1 text-sm" style={{ background: fall === "nicht" ? RED : "var(--w-bg)", color: fall === "nicht" ? "white" : "var(--w-text)" }}>nicht SPD: diag(1, −1)</button>
    </div>
    <svg viewBox={`0 0 ${W} ${W}`} className="max-w-full h-auto" role="img" aria-label={`Einheitsvektor bei ${theta} Grad, quadratische Form ${q.toFixed(2)}`}>
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--w-grid-strong)" />
      <line x1={30} y1={C} x2={290} y2={C} stroke="var(--w-axis)" /><line x1={C} y1={30} x2={C} y2={290} stroke="var(--w-axis)" />
      <line x1={C} y1={C} x2={px} y2={py} stroke={BLUE} strokeWidth={4} /><circle cx={px} cy={py} r={8} fill={BLUE} />
      <text x={C + 8} y={C - 8} fill="var(--w-text)" fontSize={13}>x</text>
      <text x={18} y={26} fill="var(--w-muted)" fontSize={12}>xᵀAx = {q.toFixed(3).replace(".", ",")}</text>
    </svg>
    <Slider label="Richtung θ" value={theta} onChange={setTheta} min={0} max={360} step={1} unit="°" accent={BLUE} />
    <Verdikt kind={fall === "spd" ? "ok" : hit ? "fail" : "warn"}>{fall === "spd" ? `Für jede dargestellte Richtung bleibt xᵀAx positiv. Das bestätigt nur diese Matrixfamilie; ${ref("satz:cholesky-zerlegung")} darf angewendet werden.` : hit ? "Aufgabe geschafft: Diese Richtung liefert xᵀAx ≤ 0 und widerlegt positive Definitheit." : "Diese Richtung besteht den Test, beweist aber nichts: SPD verlangt die Ungleichung für alle Richtungen."}</Verdikt>
  </div>;
}
