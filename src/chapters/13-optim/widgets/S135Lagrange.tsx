import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { Slider } from "../../../lib";

/**
 * §13.5: Lagrange-/KKT-Geometrie (Eigenbau) zu den Folien „Geometrische
 * Intuition", „Lagrange-Multiplikatoren: Idee", „Beispiel:
 * Lagrange-Multiplikatoren" und „Lagrange visualisiert" (13-optim.Rmd
 * Z. 902-959). Es ersetzt die Grafiken resources/optim-constraint-geometry.pdf
 * und resources/optim-lagrange-example.pdf.
 *
 * Gezeigt wird das Folienbeispiel f(x, y) = x^2 + y^2 mit g(x, y) = x + y - 1.
 * Die Höhenlinien von f sind exakt gezeichnete Kreise um den Ursprung, die
 * Nebenbedingung ist die Gerade x + y = 1. Der Punkt lässt sich entlang der
 * Geraden ziehen; abgelesen werden grad f, der Gradient der jeweiligen
 * Nebenbedingung, die Richtungsableitung entlang der Geraden und die beiden
 * Werte, die die Stationaritätsgleichungen für den Multiplikator liefern.
 * Beide stimmen genau im Optimum überein.
 *
 * Drei Modi zeigen den Unterschied zwischen Gleichung und Ungleichung; die
 * Readouts wechseln mit (lambda bei der Gleichung, mu bei den Ungleichungen):
 *  - „x + y = 1": grad g = (1, 1), lambda aus 2x + lambda = 0 bzw.
 *    2y + lambda = 0. Optimum (0,5; 0,5), lambda* = -1, f* = 0,5.
 *  - „x + y >= 1", also h = 1 - x - y <= 0 mit grad h = (-1, -1): mu aus
 *    2x - mu = 0 bzw. 2y - mu = 0. Beide Gleichungen stimmen nur in
 *    (0,5; 0,5) überein, dort ist mu = 1 > 0 und h = 0: AKTIVE Ungleichung.
 *  - „x + y <= 1", also h = x + y - 1 <= 0 mit grad h = (1, 1): mu aus
 *    2x + mu = 0 bzw. 2y + mu = 0, beide fordern in (0,5; 0,5) mu = -1 < 0.
 *    Kein Randpunkt ist also KKT-Punkt; das unbeschränkte Minimum (0,0) ist
 *    zulässig, die Nebenbedingung INAKTIV, mu = 0, h(0,0) = -1 < 0.
 *    Komplementarität mu*h = 0 gilt in allen drei Fällen.
 *
 * Farbrollen (Farbcode Kapitel 13): grau die Höhenlinienschar von f (wie in
 * S133/S134), violett die gerade erreichte Höhenlinie, rot die Nebenbedingung
 * samt zulässigem Bereich, orange die Gradientenpfeile (grad f durchgezogen,
 * der Nebenbedingungsgradient gestrichelt), grün das Optimum. Blau bleibt im
 * Kapitel den Iterierten vorbehalten, die es hier nicht gibt.
 *
 * Alles ist deterministisch; kein Math.random.
 *
 * Per node nachgerechnet (rev135-zahlen.mjs): auf der Geraden ist
 * f(t, 1-t) = t^2 + (1-t)^2 minimal bei t = 0,5 mit f = 0,5; das
 * Kreuzprodukt von grad f = (2t, 2(1-t)) mit (1,1) ist 4t - 2 und
 * verschwindet nur dort; lambda* = -1 und f* = 0,5 wie auf der Folie.
 */

const HILFS = "#94a3b8"; // Höhenlinienschar von f
const VIOLETT = "#9E57D5"; // die gerade erreichte Höhenlinie
const GRUEN = "#009E73"; // Optimum
const ROT = "#D55E00"; // Nebenbedingung und zulässiger Bereich
const ORANGE = "#E69F00"; // Gradientenpfeile

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const X0 = -0.8;
const X1 = 1.7;
const SPANNE = X1 - X0;
const SIZE = 320;
const PAD_L = 34;
const PAD_B = 18;
const PAD_R = 12;

const px = (x: number) => PAD_L + ((x - X0) / SPANNE) * SIZE;
const py = (y: number) => SIZE - ((y - X0) / SPANNE) * SIZE;
const laenge = (d: number) => (d / SPANNE) * SIZE;

/** Höhenlinien f = c, gezeichnet als Kreise mit Radius sqrt(c). */
const NIVEAUS = [0.1, 0.25, 0.5, 1, 1.5, 2, 2.75];

type Modus = "eq" | "ge" | "le";

const MODI: {
  key: Modus;
  knopf: string;
  formel: string;
  /** Name der Nebenbedingungsfunktion und ihres Gradienten */
  nb: string;
  /** Gradient der Nebenbedingungsfunktion */
  grad: [number, number];
  /** Name des Multiplikators */
  mult: string;
  /** Vorzeichen des Multiplikators in der Stationaritätsgleichung */
  vz: 1 | -1;
}[] = [
  {
    key: "eq",
    knopf: "x + y = 1",
    formel: "g(x, y) = x + y − 1 = 0",
    nb: "g",
    grad: [1, 1],
    mult: "λ",
    vz: 1,
  },
  {
    key: "ge",
    knopf: "x + y ≥ 1",
    formel: "h(x, y) = 1 − x − y ≤ 0",
    nb: "h",
    grad: [-1, -1],
    mult: "μ",
    vz: -1,
  },
  {
    key: "le",
    knopf: "x + y ≤ 1",
    formel: "h(x, y) = x + y − 1 ≤ 0",
    nb: "h",
    grad: [1, 1],
    mult: "μ",
    vz: 1,
  },
];

export function LagrangeGeometrie() {
  const [t, setT] = useState(1.2);
  const [modus, setModus] = useState<Modus>("eq");

  const runden = (v: number) => Math.round(v * 20) / 20;
  const klemm = (v: number) => Math.min(1.6, Math.max(-0.6, v));

  const m = MODI.find((k) => k.key === modus) as (typeof MODI)[number];

  const x = t;
  const y = 1 - t;
  const wert = x * x + y * y;
  const radius = Math.sqrt(wert);
  const gf: [number, number] = [2 * x, 2 * y];
  const gg: [number, number] = m.grad;
  // Kreuzprodukt von grad f mit dem Nebenbedingungsgradienten misst die
  // Abweichung von Parallelität
  const kreuz = gf[0] * gg[1] - gf[1] * gg[0];
  // Richtungsableitung entlang der Nebenbedingung, Richtung (1; −1)
  const richtung = gf[0] - gf[1];
  // Stationarität grad f + mult * grad NB = 0, komponentenweise aufgelöst
  const multAusX = -gf[0] / gg[0];
  const multAusY = -gf[1] / gg[1];
  const parallel = Math.abs(kreuz) < 1e-9;

  // Optimum des jeweiligen Modus
  const opt: [number, number] = modus === "le" ? [0, 0] : [0.5, 0.5];

  const greifen = (e: ReactPointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = (e.clientX - r.left) * ((PAD_L + SIZE + PAD_R) / r.width);
    const sy = (e.clientY - r.top) * ((SIZE + PAD_B) / r.height);
    const u = X0 + ((sx - PAD_L) / SIZE) * SPANNE;
    const v = X0 + ((SIZE - sy) / SIZE) * SPANNE;
    // Lotfusspunkt von (u, v) auf die Gerade (t, 1 − t)
    setT(runden(klemm((u - v + 1) / 2)));
  };

  // Pfeile: beide Gradienten mit demselben Faktor skaliert, damit die
  // Parallelität im Optimum als Deckungsgleichheit sichtbar wird.
  const SKALA = 0.28;
  const pfeil = (g: [number, number]): [number, number] => [x + SKALA * g[0], y + SKALA * g[1]];
  const zielF = pfeil(gf);
  const zielG = pfeil(gg);

  // zulässige Halbebene als Polygon im Sichtfenster
  const ecken =
    modus === "ge"
      ? `${px(1.7)},${py(-0.7)} ${px(1.7)},${py(1.7)} ${px(-0.7)},${py(1.7)}`
      : `${px(-0.8)},${py(-0.8)} ${px(1.8)},${py(-0.8)} ${px(-0.8)},${py(1.8)}`;

  const gradText = `∇${m.nb} = (${fmt(gg[0])}; ${fmt(gg[1])})`;
  const uneinig = `Die erste Stationaritätsgleichung verlangt ${m.mult} = ${fmt(multAusX)}, die zweite ${m.mult} = ${fmt(multAusY)}; das widerspricht sich.`;
  const runter = richtung > 0 ? "nach links oben" : "nach rechts unten";
  const tiefer = `Die Richtungsableitung entlang der Geraden ist ${fmt(richtung)}, wir kommen also ${runter} noch tiefer, und die Höhenlinie f = ${fmt(wert)} schneidet die Gerade in zwei Punkten.`;

  let status: string;
  if (modus === "eq") {
    if (parallel) {
      status = `Die beiden Pfeile decken sich: ∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) ist ein Vielfaches von ${gradText}. Beide Stationaritätsgleichungen liefern denselben Multiplikator λ = ${fmt(multAusX)}. Entlang der Geraden ändert sich f hier nicht mehr, die Richtungsableitung ist ${fmt(richtung)}. Die Höhenlinie f = ${fmt(wert)} berührt die Gerade, statt sie zu kreuzen: das ist das Optimum. Das Vorzeichen von λ ist bei einer Gleichungsnebenbedingung frei.`;
    } else {
      status = `∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) und ${gradText} zeigen in verschiedene Richtungen; das Kreuzprodukt beträgt ${fmt(kreuz)}. ${uneinig} Hier kann also kein Optimum liegen. ${tiefer}`;
    }
  } else if (modus === "ge") {
    if (parallel) {
      status = `Zulässig ist die rote Halbebene x + y ≥ 1, das unbeschränkte Minimum (0; 0) liegt außerhalb. Hier stimmen beide Stationaritätsgleichungen überein und liefern μ = ${fmt(multAusX)} > 0, und wegen h(${fmt(x)}; ${fmt(y)}) = 0 ist auch die Komplementarität erfüllt. Die Ungleichung ist also aktiv, sie bindet: ∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) und ${gradText} zeigen in entgegengesetzte Richtungen, und diese Gegenläufigkeit ist es, die μ positiv macht.`;
    } else {
      status = `Zulässig ist die rote Halbebene x + y ≥ 1. ${uneinig} Hier kann also kein Optimum liegen. ${tiefer} Im Punkt (0,50; 0,50) werden sich beide auf μ = 1 einigen, und weil das positiv ist, darf die Ungleichung dort binden.`;
    }
  } else {
    const rand = parallel
      ? `Im einzigen Punkt der Geraden, in dem sich die beiden Stationaritätsgleichungen einigen, fordern sie μ = ${fmt(multAusX)} < 0.`
      : `${uneinig} Und selbst dort, wo sie sich einigen, nämlich in (0,50; 0,50), fordern sie μ = −1 < 0.`;
    status = `Jetzt zeigt die Ungleichung in die andere Richtung, zulässig ist die rote Halbebene x + y ≤ 1. ${rand} Die duale Zulässigkeit μ ≥ 0 verbietet das: Kein Randpunkt ist ein KKT-Punkt. Stattdessen gewinnt das unbeschränkte Minimum x* = (0; 0) mit f* = 0. Dort ist h(0; 0) = −1 < 0, die Ungleichung ist inaktiv, die Komplementarität μ·h = 0 erzwingt μ = 0, und die Stationarität wird trivial erfüllt, weil ∇f(0; 0) = (0; 0) ist.`;
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Grau die Höhenlinien von f(x, y) = x² + y², violett die gerade erreichte, rot die
        Nebenbedingung x + y = 1. Wir ziehen den Punkt entlang der Geraden und vergleichen
        die beiden orangen Pfeile: ∇f durchgezogen, der Gradient der Nebenbedingung
        gestrichelt. Nur an einer Stelle sind sie parallel, und dort berührt die Höhenlinie
        die Gerade. Mit den drei Knöpfen wechseln wir zwischen Gleichung und den beiden
        Ungleichungen; die Ablesetafel wechselt mit.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MODI.map((mo) => (
          <button
            key={mo.key}
            type="button"
            className={
              "rounded border px-3 py-1 " +
              (modus === mo.key
                ? "border-sky-600 bg-sky-50 dark:bg-sky-900"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700")
            }
            onClick={() => setModus(mo.key)}
          >
            {mo.knopf}
          </button>
        ))}
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setT(0.5)}
        >
          {modus === "le" ? "zum Berührpunkt (0,5; 0,5)" : "zum Optimum"}
        </button>
      </div>
      <Slider
        label="x (auf der Geraden)"
        value={t}
        onChange={(v) => setT(runden(klemm(v)))}
        min={-0.6}
        max={1.6}
        step={0.05}
        fmt={(v) => fmt(v)}
      />
      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            y ↑
          </div>
          <svg
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="cursor-crosshair rounded border border-slate-300 bg-white dark:border-slate-600"
            onPointerDown={greifen}
            onPointerMove={(e) => {
              if (e.buttons === 1) greifen(e);
            }}
          >
            <defs>
              <clipPath id="s135l-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
              <marker id="s135l-pf" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
              </marker>
              <marker id="s135l-pg" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} opacity={0.6} />
              </marker>
            </defs>
            {[-0.5, 0, 0.5, 1, 1.5].map((v) => (
              <g key={`t${v}`}>
                <text x={PAD_L - 5} y={py(v) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(v, 1)}
                </text>
                <text x={px(v)} y={SIZE + 13} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(v, 1)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s135l-clip)">
              {modus !== "eq" && <polygon points={ecken} fill={ROT} opacity={0.08} />}
              <line x1={px(X0)} y1={py(0)} x2={px(X1)} y2={py(0)} stroke="#cbd5e1" strokeWidth={1} />
              <line x1={px(0)} y1={py(X0)} x2={px(0)} y2={py(X1)} stroke="#cbd5e1" strokeWidth={1} />
              {NIVEAUS.map((c) => (
                <circle
                  key={`n${c}`}
                  cx={px(0)}
                  cy={py(0)}
                  r={laenge(Math.sqrt(c))}
                  fill="none"
                  stroke={HILFS}
                  strokeWidth={1}
                  opacity={0.7}
                />
              ))}
              <circle
                cx={px(0)}
                cy={py(0)}
                r={laenge(radius)}
                fill="none"
                stroke={VIOLETT}
                strokeWidth={2.2}
              />
              <line
                x1={px(-0.7)}
                y1={py(1.7)}
                x2={px(1.7)}
                y2={py(-0.7)}
                stroke={ROT}
                strokeWidth={2.4}
              />
              <line
                x1={px(x)}
                y1={py(y)}
                x2={px(zielG[0])}
                y2={py(zielG[1])}
                stroke={ORANGE}
                strokeWidth={3.4}
                strokeDasharray="6 4"
                opacity={0.6}
                markerEnd="url(#s135l-pg)"
              />
              <line
                x1={px(x)}
                y1={py(y)}
                x2={px(zielF[0])}
                y2={py(zielF[1])}
                stroke={ORANGE}
                strokeWidth={1.8}
                markerEnd="url(#s135l-pf)"
              />
              <circle cx={px(opt[0])} cy={py(opt[1])} r={8} fill="none" stroke={GRUEN} strokeWidth={2.4} />
              <circle cx={px(x)} cy={py(y)} r={5} fill={ROT} />
            </g>
            <text x={px(1.34)} y={py(-0.55)} textAnchor="middle" fill={ROT} fontSize={11}>
              x + y = 1
            </text>
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            x →
          </div>
        </div>
        <div className="max-w-sm space-y-2 text-sm">
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="pr-3 align-top">Punkt auf der Geraden</td>
                <td className="font-mono">
                  ({fmt(x)}; {fmt(y)})
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">f(x, y)</td>
                <td className="font-mono">{fmt(wert)}</td>
              </tr>
              <tr>
                <td className="pr-3 align-top" style={{ color: ORANGE }}>
                  ∇f
                </td>
                <td className="font-mono">
                  ({fmt(gf[0])}; {fmt(gf[1])})
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top" style={{ color: ORANGE }}>
                  ∇{m.nb}
                </td>
                <td className="font-mono">
                  ({fmt(gg[0])}; {fmt(gg[1])})
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">∇f entlang (1; −1)</td>
                <td className="font-mono">{fmt(richtung)}</td>
              </tr>
              <tr>
                <td className="pr-3 align-top">
                  {m.mult} aus 2x {m.vz > 0 ? "+" : "−"} {m.mult} = 0
                </td>
                <td className="font-mono">{fmt(multAusX)}</td>
              </tr>
              <tr>
                <td className="pr-3 align-top">
                  {m.mult} aus 2y {m.vz > 0 ? "+" : "−"} {m.mult} = 0
                </td>
                <td className="font-mono">{fmt(multAusY)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Nebenbedingung: {m.formel}
          </p>
        </div>
      </div>
      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
