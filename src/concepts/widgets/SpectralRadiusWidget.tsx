/**
 * Konzept-Widget `spectral-radius`.
 *
 * DIE EINE EINSICHT: Über Wachstum oder Schrumpfen einer Iteration entscheidet
 * allein ρ(G), nicht die Drehung. Der Winkel θ verändert die Spirale, aber
 * kein bisschen an der Normkurve.
 *
 * FARBROLLEN: blau = die Iterierten x_k in der Ebene; rot = der Startpunkt x₀;
 * grün = die Normen ‖xₖ‖ in der Nebentafel darunter.
 *
 * PROVENIENZ: Iteration, Auto-Fenster und die Idee der Nebentafel aus der
 * Vorfassung (Stand 2026-08-20); Achsen mit Ticks und Achsennamen in beiden
 * Tafeln, Themenfarben, deutsches Zahlformat und die Anordnung
 * Regler-unter-Grafik sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * G = s·Rot(θ) hat die Eigenwerte s·e^{±iθ}, also ρ(G) = s exakt, und damit
 * ‖xₖ‖ = s^k·‖x₀‖ unabhängig von θ — für s ∈ {0,6; 0,85; 1; 1,1} und
 * θ ∈ {0; 0,55; 1,5} auf 1e−9 nachgerechnet. Mit x₀ = (1 | 0,4), also
 * ‖x₀‖ = √1,16 = 1,0770, ergibt der Startzustand s = 0,85 nach 16 Schritten
 * ‖x₁₆‖ = 0,0800; bei s = 1,1 wächst dieselbe Norm auf 4,949.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtDe, fmtTick, niceTicks } from "../../lib";

const K = 16;
const START: [number, number] = [1, 0.4];

const B = 280;
const PAD_L = 28;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 22;
const FELD = B - PAD_L - PAD_R;
const H = FELD + PAD_T + PAD_B;

const NB = 280; // Nebentafel
const NH = 106;
const NPAD_L = 34;
const NPAD_R = 8;
const NPAD_T = 22;
const NPAD_B = 22;

export function PowerSpiralWidget() {
  const [s, setS] = useState(0.85);
  const [th, setTh] = useState(0.55);

  const pts: [number, number][] = [];
  let x = START[0];
  let y = START[1];
  for (let k = 0; k <= K; k++) {
    pts.push([x, y]);
    const nx = s * (Math.cos(th) * x - Math.sin(th) * y);
    const ny = s * (Math.sin(th) * x + Math.cos(th) * y);
    x = nx;
    y = ny;
  }
  const normen = pts.map(([a, b]) => Math.hypot(a, b));

  // Fenster so, dass keine Iterierte abgeschnitten wird
  let halb = 1.2;
  for (const [a, b] of pts) halb = Math.max(halb, Math.abs(a), Math.abs(b));
  halb *= 1.15;

  const px = (v: number) => PAD_L + ((v + halb) / (2 * halb)) * FELD;
  const py = (v: number) => PAD_T + (1 - (v + halb) / (2 * halb)) * FELD;
  const ticks = niceTicks(-halb, halb, 4).filter((t) => Math.abs(t) < halb * 0.92);
  const tickStep = ticks.length > 1 ? Math.abs(ticks[1] - ticks[0]) : 1;

  const nMax = Math.max(...normen) * 1.12;
  const nTicks = niceTicks(0, nMax, 3);
  const nStep = nTicks.length > 1 ? Math.abs(nTicks[1] - nTicks[0]) : 1;
  const nx2 = (k: number) => NPAD_L + (k / K) * (NB - NPAD_L - NPAD_R);
  const ny2 = (v: number) => NPAD_T + (1 - v / nMax) * (NH - NPAD_T - NPAD_B);

  const art = s < 0.995 ? "ok" : s > 1.005 ? "warn" : "neutral";

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Bewegen wir s über die Schwelle 1 und drehen θ, ohne die Normkurve zu ändern.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Spirale der Iterierten mit rho gleich ${fmtDe(s)}; die Punkte laufen ${
          s < 1 ? "nach innen" : s > 1 ? "nach außen" : "auf einem Kreis"
        }.`}
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {ticks.map((t) => (
          <g key={`t${t}`}>
            <line
              x1={PAD_L}
              x2={B - PAD_R}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <line
              x1={px(t)}
              x2={px(t)}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, tickStep)}
            </text>
            {t !== 0 && (
              <text x={px(t)} y={H - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
                {fmtTick(t, tickStep)}
              </text>
            )}
          </g>
        ))}
        <text x={B - PAD_R} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₁
        </text>
        <text x={PAD_L - 4} y={PAD_T + 8} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₂
        </text>
        <polyline
          points={pts.map(([a, b]) => `${px(a)},${py(b)}`).join(" ")}
          fill="none"
          stroke={FMM_COLORS.blau}
          strokeWidth={1.2}
          opacity={0.6}
        />
        {pts.map(([a, b], k) => (
          <circle
            key={k}
            cx={px(a)}
            cy={py(b)}
            r={k === 0 ? 4 : 2.6}
            fill={k === 0 ? FMM_COLORS.rot : FMM_COLORS.blau}
          />
        ))}
        <text x={px(pts[0][0]) + 7} y={py(pts[0][1]) - 5} fontSize={10} fill={FMM_COLORS.rot}>
          x₀
        </text>
      </svg>
      {/* Nebentafel: die Normen, auf die es allein ankommt */}
      <svg
        viewBox={`0 0 ${NB} ${NH}`}
        className="mt-1 h-auto max-w-full rounded"
        role="img"
        aria-label={`Normen der Iterierten von k gleich 0 bis 16; sie ${
          s < 1 ? "fallen" : s > 1 ? "wachsen" : "bleiben konstant"
        }.`}
      >
        <rect
          x={0.5}
          y={0.5}
          width={NB - 1}
          height={NH - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {nTicks.map((t) => (
          <g key={`n${t}`}>
            <line
              x1={NPAD_L}
              x2={NB - NPAD_R}
              y1={ny2(t)}
              y2={ny2(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={NPAD_L - 4} y={ny2(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, nStep)}
            </text>
          </g>
        ))}
        {[0, 4, 8, 12, 16].map((k) => (
          <text
            key={`k${k}`}
            x={nx2(k)}
            y={NH - NPAD_B + 12}
            textAnchor="middle"
            fontSize={9}
            fill="var(--w-muted)"
          >
            {fmtTick(k, 1)}
          </text>
        ))}
        <text x={NB - NPAD_R} y={NH - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          k
        </text>
        <text x={4} y={12} fontSize={9} fill="var(--w-muted)">
          ‖xₖ‖
        </text>
        <polyline
          points={normen.map((v, k) => `${nx2(k)},${ny2(v)}`).join(" ")}
          fill="none"
          stroke={FMM_COLORS.gruen}
          strokeWidth={1.2}
          opacity={0.6}
        />
        {normen.map((v, k) => (
          <circle key={k} cx={nx2(k)} cy={ny2(v)} r={2.5} fill={FMM_COLORS.gruen} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-6">
        <div className="w-44 grow">
          <Slider
            label="Skalierung s = ρ(G)"
            value={s}
            onChange={setS}
            min={0.6}
            max={1.1}
            step={0.01}
            accent={FMM_COLORS.blau}
          />
        </div>
        <div className="w-44 grow">
          <Slider label="Drehwinkel θ" value={th} onChange={setTh} min={0} max={1.5} step={0.05} />
        </div>
      </div>
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Start x₀ ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Iterierte x_k ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> ‖xₖ‖ in der Nebentafel
      </p>
      <Verdikt kind={art}>
        ρ(G) = {fmtDe(s)}; nach 16 Schritten ist ‖x₁₆‖ = {fmtDe(normen[K], 3)} statt anfangs{" "}
        {fmtDe(normen[0], 3)}.{" "}
        {s < 0.995
          ? "Die Normen fallen geometrisch mit dem Faktor ρ(G) je Schritt – die Iteration konvergiert gegen 0."
          : s > 1.005
            ? "Die Normen wachsen geometrisch mit dem Faktor ρ(G) je Schritt – die Iteration divergiert."
            : "Die Normen bleiben konstant: bei ρ(G) = 1 dreht sich die Iterierte nur noch."}{" "}
        Der Drehwinkel θ verformt die Spirale, lässt die Normkurve aber unberührt, denn ‖xₖ‖ =
        ρ(G)ᵏ·‖x₀‖.
      </Verdikt>
    </div>
  );
}
