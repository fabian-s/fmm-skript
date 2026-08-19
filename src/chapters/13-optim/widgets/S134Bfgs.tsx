import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt } from "../../../lib";

/**
 * §13.4 — DIE EINE EINSICHT: B_k naehert sich der INVERSEN Hesse-Matrix an,
 * ohne dass je eine zweite Ableitung ausgewertet wird. Mit exakter Liniensuche
 * steht bei einer Quadrik im R^n nach n Schritten das Minimum UND B_n = H^{-1}
 * exakt (Satz 13.4.10); mit alpha = 1 dagegen geht der erste Schritt zu weit.
 *
 * BFGS-Stepper zur Folie „BFGS-Verfahren" (13-optim.Rmd Z. 760-770).
 *
 * CODE-Vorlage: BfgsStepperWidget und der Höhenlinien-Plotter QuadPlane aus
 * heath-ch5-6/src/sections/widgets/S654Widgets.tsx (Iterationsschleife,
 * Ellipsen-Höhenlinien, Regler über die Schrittnummer, Umschalter für die
 * exakte Schrittweite). Beschriftungen und Statustexte sind neu geschrieben;
 * die Quell-App rechnet ausserdem mit einer Näherung der Hesse-MATRIX,
 * während die Folien (und dieses Widget) B_k als Näherung der INVERSEN
 * führen und nach der Formel der Folie aktualisieren:
 *
 *   B_{k+1} = (I - rho s y^T) B_k (I - rho y s^T) + rho s s^T,
 *   rho = 1/(y^T s),  s = x^(k+1) - x^(k),  y = (grad f(x^(k+1)) - grad f(x^(k)))^T.
 *
 * Beispiel ist die Quadrik f(x) = 0,5 x1^2 + 2,5 x2^2 (Hesse diag(1; 5),
 * kappa = 5, H^{-1} = diag(1; 0,2)) mit Start (5; 1) und B_0 = I.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-13-optim/s134.mjs, 2026-08-19;
 * aeltere Pruefung check-math-s134.mjs bestaetigt):
 *  - Einheitsschritt alpha = 1: (5; 1) -> (0; -4) -> (-2,222; 0,444) ->
 *    (0,816; 0,082) -> ...; f springt im ersten Schritt von 15 auf 40 und
 *    faellt danach (15 / 40 / 2,963 / 0,3499 / 0,0006 / ...); B_6 liegt
 *    0,0112 von H^{-1} entfernt (Frobeniusnorm), B_8 noch 5,205e-4.
 *  - exakte Schrittweite: alpha_0 = 1/3, alpha_1 = 0,6; nach ZWEI Schritten
 *    steht die Iteration exakt im Minimum und B_2 = diag(1; 0,2) = H^{-1}.
 *  - Die Sekantenbedingung B_{k+1} y = s ist in jedem Schritt bis auf
 *    Rundungsfehler erfuellt: groesstes Residuum 5,40e-15 (alpha = 1) bzw.
 *    4,97e-16 (exakt).
 *
 * Farbrollen (Farbcode Kapitel 13): blau die Iterierten, orange Gradient und
 * die Naeherung B_k (Ableitungsobjekte), grün das Minimum.
 *
 * Alles ist deterministisch; kein Math.random.
 */

const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;

type V2 = [number, number];
type M2 = [[number, number], [number, number]];

const fmt = (v: number, d = 3) => fmtDe(v, d);

function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (v === 0) return "0";
  const [m, e] = v.toExponential(1).split("e");
  return `${m.replace(".", ",").replace(/^-/, "−")}·10^${Number(e)}`;
}

const C2 = 5; // Krümmung in x2-Richtung
const H: M2 = [
  [1, 0],
  [0, C2],
];
const f = (x: V2) => 0.5 * x[0] * x[0] + 0.5 * C2 * x[1] * x[1];
const grad = (x: V2): V2 => [x[0], C2 * x[1]];
const mv = (A: M2, v: V2): V2 => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];

interface Zeile {
  x: V2;
  B: M2;
  alpha: number | null;
  /** Residuum der Sekantenbedingung für das B dieser Zeile. */
  sekante: number | null;
}

function bfgsLauf(exakt: boolean, K: number): Zeile[] {
  let x: V2 = [5, 1];
  let B: M2 = [
    [1, 0],
    [0, 1],
  ];
  const zeilen: Zeile[] = [{ x, B, alpha: null, sekante: null }];
  for (let k = 0; k < K; k++) {
    const g = grad(x);
    if (Math.hypot(g[0], g[1]) < 1e-13) break;
    const d: V2 = [-(B[0][0] * g[0] + B[0][1] * g[1]), -(B[1][0] * g[0] + B[1][1] * g[1])];
    const dHd = dot(d, mv(H, d));
    const alpha = exakt && dHd > 1e-14 ? -dot(g, d) / dHd : 1;
    const s: V2 = [alpha * d[0], alpha * d[1]];
    const xn: V2 = [x[0] + s[0], x[1] + s[1]];
    const gn = grad(xn);
    const y: V2 = [gn[0] - g[0], gn[1] - g[1]];
    const ys = dot(y, s);
    let sekante: number | null = null;
    if (Math.abs(ys) > 1e-14) {
      const r = 1 / ys;
      const L: M2 = [
        [1 - r * s[0] * y[0], -r * s[0] * y[1]],
        [-r * s[1] * y[0], 1 - r * s[1] * y[1]],
      ];
      const Rm: M2 = [
        [1 - r * y[0] * s[0], -r * y[0] * s[1]],
        [-r * y[1] * s[0], 1 - r * y[1] * s[1]],
      ];
      const LB: M2 = [
        [L[0][0] * B[0][0] + L[0][1] * B[1][0], L[0][0] * B[0][1] + L[0][1] * B[1][1]],
        [L[1][0] * B[0][0] + L[1][1] * B[1][0], L[1][0] * B[0][1] + L[1][1] * B[1][1]],
      ];
      const LBR: M2 = [
        [LB[0][0] * Rm[0][0] + LB[0][1] * Rm[1][0], LB[0][0] * Rm[0][1] + LB[0][1] * Rm[1][1]],
        [LB[1][0] * Rm[0][0] + LB[1][1] * Rm[1][0], LB[1][0] * Rm[0][1] + LB[1][1] * Rm[1][1]],
      ];
      B = [
        [LBR[0][0] + r * s[0] * s[0], LBR[0][1] + r * s[0] * s[1]],
        [LBR[1][0] + r * s[1] * s[0], LBR[1][1] + r * s[1] * s[1]],
      ];
      const By = mv(B, y);
      sekante = Math.hypot(By[0] - s[0], By[1] - s[1]);
    }
    x = xn;
    zeilen.push({ x, B, alpha, sekante });
  }
  return zeilen;
}

const W = 400;
const HGT = 270;
const PAD = 26;

export function BfgsStepper() {
  const [exakt, setExakt] = useState(false);
  const [k, setK] = useState(0);
  const zeilen = useMemo(() => bfgsLauf(exakt, 8), [exakt]);
  const kk = Math.min(k, zeilen.length - 1);
  const z = zeilen[kk];
  const g = grad(z.x);

  // Fenster so, dass alle gezeigten Iterierten hineinpassen
  const bisher = zeilen.slice(0, kk + 1).map((r) => r.x);
  let mx = 5.5;
  let my = 1.4;
  for (const q of bisher) {
    mx = Math.max(mx, Math.abs(q[0]) * 1.15);
    my = Math.max(my, Math.abs(q[1]) * 1.15);
  }
  const px = (x: number) => PAD + ((x + mx) / (2 * mx)) * (W - 2 * PAD);
  const py = (y: number) => HGT - PAD - ((y + my) / (2 * my)) * (HGT - 2 * PAD);
  const sxu = (W - 2 * PAD) / (2 * mx);
  const syu = (HGT - 2 * PAD) / (2 * my);
  const niveaus = [0.6, 2.5, 7, 15, 30, 45].filter((v) => Math.sqrt(2 * v) < 1.05 * mx);

  const abstandInvers = Math.hypot(z.B[0][0] - 1, z.B[0][1], z.B[1][0], z.B[1][1] - 1 / C2);

  let art: "neutral" | "ok" | "warn" = "neutral";
  let titel = `nach ${kk} Schritten`;
  let status: string;
  if (kk === 0) {
    titel = "Ausgangslage B₀ = I";
    status =
      "Start bei B₀ = I. Der erste Schritt ist deshalb ein gewöhnlicher Gradientenschritt: Ohne Vorwissen über die Krümmung kann das Verfahren nichts Besseres tun.";
  } else if (exakt && kk >= 2) {
    art = "ok";
    titel = "nach n = 2 Schritten exakt";
    status =
      "Die Iterierte sitzt im Minimum, und B₂ stimmt auf allen gezeigten Stellen mit diag(1; 0,2) = H⁻¹ überein. Ein Zufall dieses Beispiels ist das nicht, sondern genau die Aussage von Satz 13.4.10: Bei einer Quadrik im ℝⁿ liefern n Schritte mit exakter Liniensuche n Sekantenbedingungen für n unabhängige Richtungen, und mehr Information über eine konstante Krümmung gibt es nicht.";
  } else if (!exakt && kk === 1) {
    art = "warn";
    titel = "der erste Schritt geht zu weit";
    status =
      "f wächst von 15 auf 40, obwohl die Richtung bergab zeigte. Am Update liegt das nicht, sondern an der Länge α = 1, die niemand geprüft hat. Deshalb kommt BFGS in der Praxis nie ohne Schrittweitensuche (Häkchen setzen); Satz 13.4.10 setzt sie ausdrücklich voraus.";
  } else {
    status = `Nach ${kk === 1 ? "einem Schritt" : `${kk} Schritten`} steht f bei ${fmt(f(z.x), 4)}. Die Näherung B_${kk} hat inzwischen Krümmungsinformation gesammelt, liegt von diag(1; 0,2) aber immer noch ${fmt(abstandInvers, 3)} entfernt (Frobeniusnorm). Das stört nicht weiter, denn für den Schritt zählt nur, ob die Richtung taugt.`;
  }

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir den Schrittregler durch und vergleichen B_k mit H⁻¹: einmal mit, einmal
        ohne exakte Schrittweite.
      </Aufgabe>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-400">
        Minimiert wird f(x) = 0,5 x₁² + 2,5 x₂², die Hesse-Matrix ist überall diag(1; 5). BFGS
        kennt sie nicht, sondern baut aus den beobachteten Gradientendifferenzen eine Näherung
        B_k der inversen Hesse-Matrix auf.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={exakt}
          onChange={(e) => {
            setExakt(e.target.checked);
            setK(0);
          }}
        />
        <span>exakte Schrittweite statt α = 1</span>
      </label>
      <Slider
        label="Schritt k"
        value={kk}
        onChange={(v) => setK(Math.round(v))}
        min={0}
        max={zeilen.length - 1}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <div className="flex flex-wrap gap-4">
        <div className="min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400">
          <svg
            viewBox={`0 0 ${W} ${HGT}`}
            width={W}
            height={HGT}
            role="img"
            aria-label={`Höhenlinien der Quadrik mit den ersten ${kk} BFGS-Iterierten${exakt ? " bei exakter Schrittweite" : ""}.`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line x1={px(-mx)} y1={py(0)} x2={px(mx)} y2={py(0)} stroke="#cbd5e1" />
            <line x1={px(0)} y1={py(-my)} x2={px(0)} y2={py(my)} stroke="#cbd5e1" />
            {niveaus.map((v) => (
              <ellipse
                key={v}
                cx={px(0)}
                cy={py(0)}
                rx={Math.sqrt(2 * v) * sxu}
                ry={Math.sqrt((2 * v) / C2) * syu}
                fill="none"
                stroke="#94a3b8"
                strokeWidth={0.9}
                strokeDasharray="3 3"
              />
            ))}
            <text x={W - 6} y={py(0) - 5} fontSize={10} textAnchor="end" fill="#64748b">
              x₁
            </text>
            <text x={px(0) + 5} y={12} fontSize={10} fill="#64748b">
              x₂
            </text>
            <polyline
              points={bisher.map((q) => `${px(q[0]).toFixed(1)},${py(q[1]).toFixed(1)}`).join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.6}
            />
            {bisher.map((q, i) => (
              <circle
                key={`i${i}`}
                cx={px(q[0])}
                cy={py(q[1])}
                r={i === kk ? 4.5 : 2.8}
                fill={BLAU}
                opacity={i === kk ? 1 : 0.65}
                style={{ transition: "cx 250ms ease-in-out, cy 250ms ease-in-out" }}
              />
            ))}
            <circle cx={px(0)} cy={py(0)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
          </svg>
          <div className="mt-1 flex flex-wrap gap-3">
            <span style={{ color: BLAU }}>● Iterierte</span>
            <span style={{ color: GRUEN }}>◯ Minimum</span>
            <span>· · · Höhenlinien von f</span>
          </div>
        </div>
        <div className="min-w-[16rem] grow space-y-1 font-mono text-xs">
          <div style={{ color: BLAU }}>
            x⁽{kk}⁾ = ({fmt(z.x[0], 4)}; {fmt(z.x[1], 4)})
          </div>
          <div>f(x⁽{kk}⁾) = {fmt(f(z.x), 5)}</div>
          <div style={{ color: ORANGE }}>
            ∇f(x⁽{kk}⁾) = ({fmt(g[0], 4)}; {fmt(g[1], 4)})
          </div>
          {z.alpha !== null && <div>α für diesen Schritt = {fmt(z.alpha, 4)}</div>}
          <div className="pt-2" style={{ color: ORANGE }}>
            B_{kk} = ({fmt(z.B[0][0], 4)} {fmt(z.B[0][1], 4)}; {fmt(z.B[1][0], 4)} {fmt(z.B[1][1], 4)})
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            H⁻¹ = (1,0000 0,0000; 0,0000 0,2000)
          </div>
          {z.sekante !== null && (
            <div className="text-slate-500 dark:text-slate-400">
              Sekantenbedingung ‖B_{kk} y − s‖ = {fmtE(z.sekante)}
            </div>
          )}
        </div>
      </div>
      <Verdikt kind={art} titel={titel}>
        {status}
      </Verdikt>
    </div>
  );
}
