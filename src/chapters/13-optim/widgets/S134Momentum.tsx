import { useMemo, useState } from "react";
import { Slider } from "../../../lib";

/**
 * §13.4: Vergleich Gradientenabstieg gegen Heavy-Ball-Momentum, Eigenbau zu
 * den Folien „Gradientenabstieg mit Momentum: Motivation", „Idee: Momentum",
 * „Heavy-Ball Momentum" und „Momentum: Visualisierung" (13-optim.Rmd
 * Z. 792-844). Es ersetzt die Grafiken resources/optim-zigzag-problem.pdf,
 * -momentum-idea.pdf und -momentum-comparison.pdf.
 *
 * Als Bauform (Höhenlinien-Ellipsen plus halblogarithmische Fehlerkurve
 * daneben, Regler rechts) dient SteepestNewtonRace aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx; Rechenkern, Texte und
 * Beschriftungen sind neu.
 *
 * Modellproblem ist die Quadrik f(x) = 0,5 (x1^2 + c x2^2) mit Start (5; 1);
 * die Hesse-Matrix ist diag(1; c), also kappa = c für c >= 1. Die
 * Schrittweite wird als Vielfaches von 1/L angegeben (L = c), damit der
 * Stabilitätsbereich sichtbar bleibt: GD divergiert ab gamma*L > 2,
 * Heavy-Ball erst ab gamma*L > 2(1 + alpha).
 *
 * Per node nachgerechnet (check-math-s134.mjs, check2-s134.mjs), Schritte bis
 * f <= 1e-6 f0 bei gamma = 1/L:
 *   c =   5: GD  31, Momentum(0,9) 106, optimal (alpha* = 0,146) 10
 *   c =  10: GD  64, Momentum(0,9) 103, optimal (alpha* = 0,270) 15
 *   c =  25: GD 161, Momentum(0,9) 103, optimal (alpha* = 0,444) 26
 *   c = 100: GD > 400, Momentum(0,9) 121, optimal (alpha* = 0,669) 58
 * alpha = 0,9 hilft also erst bei schlecht konditionierten Problemen und
 * schadet bei gut konditionierten; optimal sind alpha* = ((sqrt(kappa)-1) /
 * (sqrt(kappa)+1))^2 und gamma* = 4/(sqrt(L) + sqrt(mu))^2 mit der Rate
 * (sqrt(kappa)-1)/(sqrt(kappa)+1) statt (kappa-1)/(kappa+1).
 *
 * Farbrollen (Farbcode Kapitel 13): blau die Iterierten des gewöhnlichen
 * Gradientenabstiegs, violett (im Kapitel sonst unbelegt) die Iterierten mit
 * Momentum, grün das Minimum, rot die Divergenzwarnung.
 *
 * Alles ist deterministisch; kein Math.random.
 */

const BLAU = "#0072B2"; // Gradientenabstieg
const VIOLETT = "#9E57D5"; // mit Momentum
const GRUEN = "#009E73"; // Minimum
const ROT = "#D55E00"; // Divergenz

type V2 = [number, number];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const START: V2 = [5, 1];
const ZEIGE = 60; // gezeichnete Schritte
const PRUEFE = 400; // Schritte für die Zählung im Statustext

function lauf(c: number, gamma: number, alpha: number, K: number): V2[] {
  let x: V2 = [...START] as V2;
  let v: V2 = [0, 0];
  const pts: V2[] = [[...x] as V2];
  for (let k = 0; k < K; k++) {
    const g: V2 = [x[0], c * x[1]];
    v = [alpha * v[0] - gamma * g[0], alpha * v[1] - gamma * g[1]];
    x = [x[0] + v[0], x[1] + v[1]];
    if (!Number.isFinite(x[0]) || !Number.isFinite(x[1]) || Math.hypot(x[0], x[1]) > 1e12) {
      pts.push([...x] as V2);
      break;
    }
    pts.push([...x] as V2);
  }
  return pts;
}

const W = 420;
const HGT = 250;
const PAD = 24;
const CW = 330;
const CH = 190;
const CL = 46;
const CB = 24;
const CT = 10;
const CR = 10;

export function MomentumVergleich() {
  const [c, setC] = useState(25);
  const [rel, setRel] = useState(1); // gamma * L
  const [alpha, setAlpha] = useState(0.9);

  const L = Math.max(1, c);
  const mu = Math.min(1, c);
  const kappa = L / mu;
  const gamma = rel / L;
  const f = (x: V2) => 0.5 * (x[0] * x[0] + c * x[1] * x[1]);

  const ohne = useMemo(() => lauf(c, gamma, 0, ZEIGE), [c, gamma]);
  const mit = useMemo(() => lauf(c, gamma, alpha, ZEIGE), [c, gamma, alpha]);

  const f0 = f(START);
  const bis = (alph: number) => {
    const p = lauf(c, gamma, alph, PRUEFE);
    const i = p.findIndex((q) => f(q) <= 1e-6 * f0);
    return i < 0 ? null : i;
  };
  const bisOhne = bis(0);
  const bisMit = bis(alpha);

  const alphaOpt = ((Math.sqrt(kappa) - 1) / (Math.sqrt(kappa) + 1)) ** 2;
  const gammaOptRel = (4 / (Math.sqrt(L) + Math.sqrt(mu)) ** 2) * L;

  // Fenster: Startpunkt plus etwas Luft; ausbrechende Bahnen werden geklemmt
  const mx = 7;
  const my = 2.2;
  const px = (x: number) => PAD + ((x + mx) / (2 * mx)) * (W - 2 * PAD);
  const py = (y: number) => HGT - PAD - ((y + my) / (2 * my)) * (HGT - 2 * PAD);
  const sxu = (W - 2 * PAD) / (2 * mx);
  const syu = (HGT - 2 * PAD) / (2 * my);
  const klemm = (v: number, m: number) => Math.max(-3 * m, Math.min(3 * m, v));
  const zug = (pts: V2[]) =>
    pts
      .filter((q) => Number.isFinite(q[0]) && Number.isFinite(q[1]))
      .map((q) => `${px(klemm(q[0], mx)).toFixed(1)},${py(klemm(q[1], my)).toFixed(1)}`)
      .join(" ");
  const niveaus = [0.5, 2, 5, 12.5, 25].filter((v) => Math.sqrt(2 * v) < 1.3 * mx);

  // halblogarithmische Verlustkurve
  const logs = (pts: V2[]) => pts.map((q) => Math.log10(Math.max(f(q), 1e-16)));
  const lOhne = logs(ohne);
  const lMit = logs(mit);
  let oben = 2;
  let unten = -8;
  for (const arr of [lOhne, lMit]) for (const v of arr) if (Number.isFinite(v)) oben = Math.max(oben, Math.ceil(v));
  const gx = (k: number) => CL + ((CW - CL - CR) * k) / ZEIGE;
  const gy = (lv: number) => CT + ((CH - CT - CB) * (oben - lv)) / (oben - unten);
  const kurve = (arr: number[]) =>
    arr
      .map((lv, k) => `${gx(k).toFixed(1)},${gy(Math.max(unten, Math.min(oben, lv))).toFixed(1)}`)
      .join(" ");
  const yTicks: number[] = [];
  for (let t = oben; t >= unten; t -= Math.max(1, Math.ceil((oben - unten) / 5))) yTicks.push(t);

  // Stabilität analytisch: der Gradientenabstieg braucht gamma*L < 2, das
  // Heavy-Ball-Verfahren gamma*L < 2(1 + alpha) bei alpha < 1.
  const grenzeMit = 2 * (1 + alpha);
  const instabilOhne = rel > 2 + 1e-9;
  const randOhne = Math.abs(rel - 2) <= 1e-9;
  const instabilMit = rel > grenzeMit + 1e-9;
  const schwung = alpha < 1 ? 1 / (1 - alpha) : Infinity;
  const wechsel = rel > 1; // in der steilen Richtung kippt das Vorzeichen

  let status: string;
  if (instabilMit) {
    status = `Beide Verfahren laufen davon: γ·L = ${fmt(rel)} liegt über der Stabilitätsgrenze 2 des Gradientenabstiegs und über 2(1 + α) = ${fmt(grenzeMit)} für Heavy-Ball. In der steilen Richtung wächst der Fehler dann in jedem Schritt.`;
  } else if (instabilOhne) {
    status = `Der gewöhnliche Gradientenabstieg divergiert hier, denn γ·L = ${fmt(rel)} liegt über 2. Momentum bleibt stabil, seine Grenze ist 2(1 + α) = ${fmt(grenzeMit)}: Der Schwung erlaubt also nicht nur glattere, sondern auch grössere Schritte.`;
  } else if (randOhne) {
    status = `Genau an der Grenze γ·L = 2 springt der Gradientenabstieg in der steilen Richtung zwischen zwei Werten hin und her, ohne kleiner zu werden. Momentum bleibt darunter (Grenze 2(1 + α) = ${fmt(grenzeMit)}) und kommt voran.`;
  } else if (bisMit !== null && bisOhne !== null && bisMit < bisOhne) {
    status = `Momentum braucht ${bisMit} Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾), der reine Gradientenabstieg ${bisOhne}. ${
      wechsel
        ? `Zwei Wirkungen stecken darin: In der flachen Richtung zeigen die Gradienten immer in dieselbe Richtung und summieren sich auf das 1/(1 − α) = ${fmt(schwung, 1)}-fache eines Einzelschritts auf; in der steilen Richtung wechselt der Gradient wegen γ·L > 1 das Vorzeichen, und die Mittelung dämpft das Hin und Her.`
        : `Bei dieser Schrittweite schwingt noch nichts: Der Gewinn kommt allein daher, dass sich die gleichgerichteten Gradienten der flachen Richtung auf das 1/(1 − α) = ${fmt(schwung, 1)}-fache eines Einzelschritts aufsummieren.`
    }`;
  } else if (bisMit !== null && bisOhne !== null) {
    status = `Hier schadet das Momentum: ${bisMit} Schritte gegen ${bisOhne} ohne. Bei κ = ${fmt(kappa, 0)} ist α = ${fmt(alpha)} zu viel des Guten, die Iterierten schiessen über das Tal hinaus; rechnerisch optimal wären α ≈ ${fmt(alphaOpt)} und γ·L ≈ ${fmt(gammaOptRel)}. Der Standardwert 0,9 stammt aus dem Deep Learning, wo die Konditionszahl um Grössenordnungen höher liegt.`;
  } else if (bisMit !== null) {
    status = `Momentum erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) nach ${bisMit} Schritten; der reine Gradientenabstieg schafft es in ${PRUEFE} Schritten nicht. Rechnerisch optimal wären hier α ≈ ${fmt(alphaOpt)} und γ·L ≈ ${fmt(gammaOptRel)}.`;
  } else {
    status = `Keines der beiden Verfahren erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) innerhalb von ${PRUEFE} Schritten. Bei κ = ${fmt(kappa, 0)} wären α ≈ ${fmt(alphaOpt)} und γ·L ≈ ${fmt(gammaOptRel)} die beste Wahl.`;
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Modellproblem ist f(x) = ½(x₁² + c·x₂²) mit Start (5; 1); die Hesse-Matrix ist diag(1; c),
        die Konditionszahl also κ = c. Blau läuft der gewöhnliche Gradientenabstieg, violett
        derselbe Abstieg mit Momentum. Die Schrittweite geben wir als Vielfaches von 1/L an,
        damit die Stabilitätsgrenzen ablesbar bleiben.
      </p>
      <div className="flex flex-wrap gap-4">
        <div className="shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <svg
            viewBox={`0 0 ${W} ${HGT}`}
            style={{ width: W, maxWidth: "100%" }}
            className="rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <defs>
              <clipPath id="s134-mom-clip">
                <rect x={PAD / 2} y={0} width={W - PAD} height={HGT} />
              </clipPath>
            </defs>
            <line x1={px(-mx)} y1={py(0)} x2={px(mx)} y2={py(0)} stroke="#cbd5e1" />
            <line x1={px(0)} y1={py(-my)} x2={px(0)} y2={py(my)} stroke="#cbd5e1" />
            <g clipPath="url(#s134-mom-clip)">
              {niveaus.map((v) => (
                <ellipse
                  key={v}
                  cx={px(0)}
                  cy={py(0)}
                  rx={Math.sqrt(2 * v) * sxu}
                  ry={Math.sqrt((2 * v) / c) * syu}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth={0.9}
                  strokeDasharray="3 3"
                />
              ))}
              <polyline points={zug(ohne)} fill="none" stroke={BLAU} strokeWidth={1.5} opacity={0.9} />
              <polyline points={zug(mit)} fill="none" stroke={VIOLETT} strokeWidth={1.5} opacity={0.9} />
              <circle cx={px(START[0])} cy={py(START[1])} r={4} fill="#334155" />
              <circle cx={px(0)} cy={py(0)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
            </g>
            <text x={W - 6} y={py(0) - 5} fontSize={10} textAnchor="end" fill="#64748b">
              x₁
            </text>
            <text x={px(0) + 5} y={12} fontSize={10} fill="#64748b">
              x₂
            </text>
          </svg>
          <div className="mt-1 flex flex-wrap gap-3">
            <span style={{ color: BLAU }}>● ohne Momentum</span>
            <span style={{ color: VIOLETT }}>● mit Momentum</span>
            <span style={{ color: GRUEN }}>◯ Minimum</span>
          </div>
        </div>
        <div className="shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            style={{ width: CW, maxWidth: "100%" }}
            className="rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {yTicks.map((t) => (
              <g key={`y${t}`}>
                <line x1={CL} y1={gy(t)} x2={CW - CR} y2={gy(t)} stroke="#e2e8f0" />
                <text x={CL - 4} y={gy(t) + 3} fontSize={9} textAnchor="end" fill="#64748b">
                  10^{t}
                </text>
              </g>
            ))}
            {[0, 15, 30, 45, 60].map((k) => (
              <text key={`x${k}`} x={gx(k)} y={CH - 6} fontSize={9} textAnchor="middle" fill="#64748b">
                {k}
              </text>
            ))}
            <polyline points={kurve(lOhne)} fill="none" stroke={BLAU} strokeWidth={1.6} />
            <polyline points={kurve(lMit)} fill="none" stroke={VIOLETT} strokeWidth={1.6} />
          </svg>
          <div className="mt-1">f(x⁽ᵏ⁾) über k, logarithmische Achse</div>
        </div>
      </div>
      <div className="max-w-prose space-y-1">
        <Slider
          label="c = κ"
          value={c}
          onChange={(v) => setC(Math.round(v))}
          min={2}
          max={100}
          step={1}
          fmt={(v) => String(Math.round(v))}
        />
        <Slider
          label="γ·L"
          value={rel}
          onChange={(v) => setRel(Math.round(v * 20) / 20)}
          min={0.1}
          max={3.6}
          step={0.05}
          fmt={(v) => fmt(v)}
        />
        <Slider
          label="α (Momentum)"
          value={alpha}
          onChange={(v) => setAlpha(Math.round(v * 100) / 100)}
          min={0}
          max={0.95}
          step={0.01}
          fmt={(v) => fmt(v)}
        />
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p className="font-mono text-xs">
          κ = {fmt(kappa, 0)}, γ = {fmt(gamma, 4)}, α = {fmt(alpha)} | Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾):{" "}
          <span style={{ color: BLAU }}>ohne {bisOhne === null ? `> ${PRUEFE}` : bisOhne}</span>,{" "}
          <span style={{ color: VIOLETT }}>mit {bisMit === null ? `> ${PRUEFE}` : bisMit}</span>
        </p>
        <p style={{ color: instabilOhne || instabilMit ? ROT : undefined }}>{status}</p>
      </div>
    </div>
  );
}
