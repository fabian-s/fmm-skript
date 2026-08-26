import { useMemo, useState } from "react";
import {
  Aufgabe,
  clamp as klemmen,
  DragHandle,
  FMM_COLORS,
  fmtDe,
  Slider,
  Surface3D,
  useDrag,
  Verdikt,
  ViewControls,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";
import type { Kurve3D, Punkt3D, Sicht3D, Vec3 } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §12.5 — DIE EINE EINSICHT: Im Optimum eines beschraenkten Problems sind
 * grad f und der Gradient der Nebenbedingung PARALLEL — dort beruehrt die
 * Hoehenlinie die Nebenbedingung, statt sie zu kreuzen. Bei einer Ungleichung
 * entscheidet zusaetzlich das VORZEICHEN des Multiplikators, ob die
 * Nebenbedingung bindet oder abgeschaltet ist.
 *
 * Lagrange-/KKT-Geometrie (Eigenbau) zu den Folien „Geometrische
 * Intuition", „Lagrange-Multiplikatoren: Idee", „Beispiel:
 * Lagrange-Multiplikatoren" und „Lagrange visualisiert" (12-optim.Rmd
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
 * Farbrollen (Farbcode Kapitel 12): grau die Höhenlinienschar von f (wie in
 * S133/S134), violett die gerade erreichte Höhenlinie, rot die Nebenbedingung
 * samt zulässigem Bereich, orange die Gradientenpfeile (grad f durchgezogen,
 * der Nebenbedingungsgradient gestrichelt), grün das Optimum. Blau bleibt im
 * Kapitel den Iterierten vorbehalten, die es hier nicht gibt.
 *
 * Alles ist deterministisch; kein Math.random.
 *
 * Neben der 2D-Tafel steht (D7) dieselbe Funktion als Flaeche, auf die die
 * Nebenbedingung als Kurve gehoben ist: Das beschraenkte Problem ist die Suche
 * nach dem tiefsten Punkt DIESER Kurve. Die 3D-Tafel behauptet keine eigenen
 * Zahlen; alle Zahlen stehen in der Ablesetafel und im Verdikt.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen, 2026-08-19;
 * aeltere Pruefung rev135-zahlen.mjs bestaetigt):
 *  - Auf der Geraden ist f(t, 1-t) = t^2 + (1-t)^2 minimal bei t = 0,500000
 *    mit f = 0,500000; das Kreuzprodukt von grad f = (2t, 2(1-t)) mit (1, 1)
 *    ist 4t - 2 und verschwindet nur dort (bei t = 1,2 etwa 2,80).
 *  - lambda* = -1 und f* = 0,5 wie auf der Folie.
 *  - Modus „x + y >= 1": grad h = (-1, -1), also mu = 2t, in t = 0,5 also
 *    mu = 1,00 > 0 und h = 0 — die Ungleichung ist AKTIV.
 *  - Modus „x + y <= 1": grad h = (1, 1), also mu = -2t, in t = 0,5 also
 *    mu = -1,00 < 0. Kein Randpunkt ist KKT-Punkt; das unbeschraenkte Minimum
 *    (0; 0) ist zulaessig mit f = 0 und h(0, 0) = -1 < 0, die Ungleichung also
 *    INAKTIV und mu = 0.
 */

const HILFS = "#94a3b8"; // Höhenlinienschar von f
const VIOLETT = FMM_COLORS.violett; // die gerade erreichte Höhenlinie
const GRUEN = FMM_COLORS.gruen; // Optimum
const ROT = FMM_COLORS.rot; // Nebenbedingung und zulässiger Bereich
const ORANGE = FMM_COLORS.orange; // Gradientenpfeile

const fmt = (v: number, d = 2) => fmtDe(v, d);

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

  /* --------------------------------------------- verlinkte 3D-Tafel (D7) */

  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 42, elevation: 26 });
  const flaeche = useMemo(
    () => ({ f: (a: number, b: number) => a * a + b * b, nx: 28, ny: 28, color: HILFS, opacity: 0.72, wire: true }),
    [],
  );
  // Die Nebenbedingung, auf die Flaeche gehoben: das beschraenkte Problem ist
  // die Suche nach dem tiefsten Punkt DIESER Kurve.
  const nbKurve = useMemo((): Kurve3D[] => {
    const pts: Vec3[] = [];
    for (let i = 0; i <= 60; i++) {
      const u = -0.6 + (2.2 * i) / 60;
      const v = 1 - u;
      pts.push([u, v, u * u + v * v]);
    }
    return [{ pts, color: ROT, width: 2.4, onTop: true }];
  }, []);
  const punkte3d = useMemo(
    (): Punkt3D[] => [
      { p: [x, y, x * x + y * y] as Vec3, color: ROT, r: 4.5, onTop: true },
      { p: [opt[0], opt[1], opt[0] ** 2 + opt[1] ** 2] as Vec3, color: GRUEN, r: 4.5, label: "x*", onTop: true },
    ],
    [x, y, opt],
  );

  // Der Punkt laesst sich nur ENTLANG der Geraden ziehen: `clamp` projiziert
  // jede Zeigerposition auf ihren Lotfusspunkt (t, 1 - t).
  const zieh = useDrag<"p">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: X0, x1: X1, y0: X0, y1: X1 },
    clamp: ([u, v]) => {
      const tt = runden(klemm((u - v + 1) / 2));
      return [tt, 1 - tt];
    },
    greifPosition: () => [t, 1 - t],
    onDrag: ([u]) => setT(u),
  });

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
      status = `Die beiden Pfeile decken sich: ∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) ist ein Vielfaches von ${gradText}. Beide Stationaritätsgleichungen liefern denselben Multiplikator λ = ${fmt(multAusX)}. Entlang der Geraden ändert sich f hier nicht mehr, die Richtungsableitung ist ${fmt(richtung)}. Die Höhenlinie f = ${fmt(wert)} berührt die Gerade, statt sie zu kreuzen: das ist das Optimum. Das ist genau die notwendige Bedingung von ${ref("satz:notwendige-bedingung-von-lagrange")}; das Vorzeichen von λ ist bei einer Gleichungsnebenbedingung frei.`;
    } else {
      status = `∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) und ${gradText} zeigen in verschiedene Richtungen; das Kreuzprodukt beträgt ${fmt(kreuz)}. ${uneinig} Hier kann also kein Optimum liegen. ${tiefer}`;
    }
  } else if (modus === "ge") {
    if (parallel) {
      status = `Zulässig ist die rote Halbebene x + y ≥ 1, das unbeschränkte Minimum (0; 0) liegt außerhalb. Hier stimmen beide Stationaritätsgleichungen überein und liefern μ = ${fmt(multAusX)} > 0, und wegen h(${fmt(x)}; ${fmt(y)}) = 0 ist auch die Komplementarität erfüllt. Alle vier Bedingungen von ${ref("satz:karush-kuhn-tucker-bedingungen")} sind damit erfüllt, die Ungleichung ist aktiv, sie bindet: ∇f = (${fmt(gf[0])}; ${fmt(gf[1])}) und ${gradText} zeigen in entgegengesetzte Richtungen, und diese Gegenläufigkeit ist es, die μ positiv macht.`;
    } else {
      status = `Zulässig ist die rote Halbebene x + y ≥ 1. ${uneinig} Hier kann also kein Optimum liegen. ${tiefer} Im Punkt (0,50; 0,50) werden sich beide auf μ = 1 einigen, und weil das positiv ist, darf die Ungleichung dort binden.`;
    }
  } else {
    const rand = parallel
      ? `Im einzigen Punkt der Geraden, in dem sich die beiden Stationaritätsgleichungen einigen, fordern sie μ = ${fmt(multAusX)} < 0.`
      : `${uneinig} Und selbst dort, wo sie sich einigen, nämlich in (0,50; 0,50), fordern sie μ = −1 < 0.`;
    status = `Jetzt zeigt die Ungleichung in die andere Richtung, zulässig ist die rote Halbebene x + y ≤ 1. ${rand} Die duale Zulässigkeit aus ${ref("satz:karush-kuhn-tucker-bedingungen")} verbietet das: Kein Randpunkt ist ein KKT-Punkt. Stattdessen gewinnt das unbeschränkte Minimum x* = (0; 0) mit f* = 0. Dort ist h(0; 0) = −1 < 0, die Ungleichung ist inaktiv, die Komplementarität μ·h = 0 erzwingt μ = 0, und die Stationarität wird trivial erfüllt, weil ∇f(0; 0) = (0; 0) ist.`;
  }

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den Punkt entlang der roten Geraden, bis sich die beiden orangen Pfeile
        decken.
      </Aufgabe>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-400">
        Grau die Höhenlinien von f(x, y) = x² + y², violett die gerade erreichte, rot die
        Nebenbedingung. Orange die beiden Gradienten: ∇f durchgezogen, der Gradient der
        Nebenbedingung gestrichelt. Die drei Knöpfe wechseln zwischen Gleichung und den beiden
        Ungleichungen; die Ablesetafel wechselt mit.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MODI.map((mo) => (
          <button
            key={mo.key}
            type="button"
            aria-pressed={modus === mo.key}
            className={modus === mo.key ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setModus(mo.key)}
          >
            {mo.knopf}
          </button>
        ))}
        <button
          type="button"
          className={W_BUTTON}
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
        <div className="inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            y ↑
          </div>
          <svg
            viewBox={`0 0 ${PAD_L + SIZE + PAD_R} ${SIZE + PAD_B}`}
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            role="img"
            aria-label={`Höhenlinien von f mit der Nebenbedingung und den beiden Gradientenpfeilen im Punkt (${fmt(x)}; ${fmt(y)}); ${parallel ? "die Pfeile sind parallel" : "die Pfeile sind nicht parallel"}.`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
            {...zieh.svgProps}
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
              <DragHandle
                x={px(x)}
                y={py(y)}
                farbe={ROT}
                r={5}
                aktiv={zieh.dragging === "p"}
                {...zieh.handleProps("p")}
              />
            </g>
            <text x={px(1.34)} y={py(-0.55)} textAnchor="middle" fill={ROT} fontSize={11}>
              x + y = 1
            </text>
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            x →
          </div>
        </div>
        <div className="min-w-0 max-w-full">
          <Surface3D
            size={280}
            xDomain={[-0.8, 1.7]}
            yDomain={[-0.8, 1.7]}
            surface={flaeche}
            curves={nbKurve}
            points={punkte3d}
            labels={{ x: "x", y: "y", z: "f" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel="Die Paraboloidfläche f(x, y) = x² + y² mit der auf sie gehobenen Nebenbedingung als roter Kurve."
          />
          <div className="mt-1 max-w-[280px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
          <p className="mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300">
            Dieselbe Funktion als Fläche. Die rote Kurve ist die Nebenbedingung, auf die Fläche
            gehoben; das beschränkte Problem ist die Suche nach ihrem tiefsten Punkt. Rot derselbe
            Punkt wie links, grün dasselbe Optimum.
          </p>
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
      <Verdikt kind={parallel ? "ok" : "neutral"} titel={parallel ? "die Pfeile sind parallel" : "die Pfeile sind nicht parallel"}>
        {status}
      </Verdikt>
    </div>
  );
}
