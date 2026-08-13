import { useMemo, useState } from "react";
import { Slider, niceTicks } from "../../../lib";
import { gitter, hoehenlinie, niveaus, type Segment } from "./S114Kontur";

/**
 * §11.4: Newton-Raphson-Verfahren als Stepper. Jeder Klick führt genau den
 * Schritt aus Algorithmus 11.4.11 aus; die Tabelle zeigt Iterierte, Gradient,
 * Fehler und den Quotienten Fehler_k / Fehler_{k-1}^2, an dem sich die
 * quadratische Konvergenz ablesen lässt.
 *
 * Eigenbau, kein portierter Code; die Höhenlinien kommen aus S114Kontur.ts.
 * Alles ist deterministisch: zwei fest verdrahtete Funktionen, Startpunkt per
 * Regler, kein Zufall.
 *
 * Farben nach dem Kapitel-11-Code: Funktion blau, Ziel (Minimum bzw.
 * kritischer Punkt) grün, Iterierte und Ableitungsobjekte orange, Fehler rot.
 *
 * Nachgerechnet (node, rev-s114-c.mjs):
 * - f(x) = x1³/3 − x1 + x2²/2, Start (2; 1,5): x2 fällt nach EINEM Schritt auf
 *   0 (in dieser Richtung ist f quadratisch), x1 läuft über 1,25 / 1,025 /
 *   1,00030488 / 1,00000005 gegen 1. Die Fehlerspalte misst den ABSTAND zum
 *   Ziel (1; 0), also 1,803 / 0,25 / 0,025 / 3,049e-4 / 4,646e-8; der Quotient
 *   Fehler_k/Fehler_{k-1}² steht damit bei 0,077 / 0,400 / 0,488 / 0,4998 und
 *   strebt gegen 1/(2x*) = 0,5. Die erste Zeile fällt heraus, weil in e_0 auch
 *   die x2-Richtung steckt, die Newton in einem Zug erledigt.
 * - Start mit x1 < 0 läuft gegen den SATTELPUNKT (−1; 0), nicht gegen das
 *   Minimum.
 * - f(x) = 2x1² + 2x1x2 + 3x2² − 4x1 − 6x2 hat das Minimum (0,6; 0,8) mit
 *   f = −3,6; von jedem Startpunkt trifft der erste Schritt es exakt.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ROT = "#D55E00";
const ORANGE = "#E69F00";
const ACHSE = "#64748b";

interface Aufgabe {
  id: string;
  label: string;
  f: (a: number, b: number) => number;
  grad: (a: number, b: number) => [number, number];
  hess: (a: number, b: number) => [[number, number], [number, number]];
  quadratisch: boolean;
  /** Grenzpunkt, den die Iteration vom Startpunkt aus ansteuert */
  ziel: (a0: number) => [number, number] | null;
}

const AUFGABEN: Aufgabe[] = [
  {
    id: "kubisch",
    label: "x₁³/3 − x₁ + x₂²/2",
    f: (a, b) => (a * a * a) / 3 - a + (b * b) / 2,
    grad: (a, b) => [a * a - 1, b],
    hess: (a) => [
      [2 * a, 0],
      [0, 1],
    ],
    quadratisch: false,
    ziel: (a0) => (a0 > 0 ? [1, 0] : a0 < 0 ? [-1, 0] : null),
  },
  {
    id: "quadrik",
    label: "2x₁² + 2x₁x₂ + 3x₂² − 4x₁ − 6x₂",
    f: (a, b) => 2 * a * a + 2 * a * b + 3 * b * b - 4 * a - 6 * b,
    grad: (a, b) => [4 * a + 2 * b - 4, 2 * a + 6 * b - 6],
    hess: () => [
      [4, 2],
      [2, 6],
    ],
    quadratisch: true,
    ziel: () => [0.6, 0.8],
  },
];

const D: [number, number] = [-2.5, 2.5];
const N_GITTER = 44;
const N_NIVEAUS = 9;
const W = 250;
const PAD_L = 26;
const PAD_B = 16;
const MAX_SCHRITTE = 6;

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

/** wissenschaftliche Notation mit deutschem Komma, für die Fehlerspalte */
function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  return v < 1e-3 ? v.toExponential(2).replace(".", ",") : v.toFixed(6).replace(".", ",");
}

const px = (t: number) => PAD_L + ((t - D[0]) / (D[1] - D[0])) * W;
const py = (t: number) => ((D[1] - t) / (D[1] - D[0])) * W;

/** Höhenlinien als EIN Pfad statt als tausende <line>-Knoten. */
function pfad(segmente: Segment[]): string {
  return segmente
    .map(
      (s) =>
        `M${px(s.x1).toFixed(1)},${py(s.y1).toFixed(1)}L${px(s.x2).toFixed(1)},${py(s.y2).toFixed(1)}`,
    )
    .join("");
}

interface Iterierte {
  x: [number, number];
  gradNorm: number;
  fehler: number;
  detH: number;
  singulaer: boolean;
}

export function NewtonStepper() {
  const [id, setId] = useState("kubisch");
  const [x0, setX0] = useState(2);
  const [y0, setY0] = useState(1.5);
  const [schritte, setSchritte] = useState(0);

  const aufgabe = AUFGABEN.find((a) => a.id === id) ?? AUFGABEN[0];
  const ziel = useMemo(() => aufgabe.ziel(x0), [aufgabe, x0]);

  /** Kompletter Iterationsweg, bei jedem Render aus dem Startpunkt neu gerechnet. */
  const bahn = useMemo(() => {
    const liste: Iterierte[] = [];
    let p: [number, number] = [x0, y0];
    for (let k = 0; k <= MAX_SCHRITTE; k++) {
      const g = aufgabe.grad(p[0], p[1]);
      const H = aufgabe.hess(p[0], p[1]);
      const det = H[0][0] * H[1][1] - H[0][1] * H[1][0];
      liste.push({
        x: p,
        gradNorm: Math.hypot(g[0], g[1]),
        fehler: ziel ? Math.hypot(p[0] - ziel[0], p[1] - ziel[1]) : NaN,
        detH: det,
        singulaer: Math.abs(det) < 1e-12,
      });
      if (Math.abs(det) < 1e-12) break;
      // Newton-Schritt: x - (grad f * H^{-1})^T, mit H symmetrisch also H^{-1} grad f^T
      const inv = [
        [H[1][1] / det, -H[0][1] / det],
        [-H[1][0] / det, H[0][0] / det],
      ];
      p = [p[0] - (inv[0][0] * g[0] + inv[0][1] * g[1]), p[1] - (inv[1][0] * g[0] + inv[1][1] * g[1])];
    }
    return liste;
  }, [aufgabe, x0, y0, ziel]);

  const sichtbar = bahn.slice(0, Math.min(schritte + 1, bahn.length));
  const aktuell = sichtbar[sichtbar.length - 1];
  const H = aufgabe.hess(aktuell.x[0], aktuell.x[1]);
  const spurH = H[0][0] + H[1][1];
  const definitheit =
    aktuell.detH > 1e-9 && spurH > 0
      ? "positiv definit"
      : aktuell.detH > 1e-9 && spurH < 0
        ? "negativ definit"
        : aktuell.detH < -1e-9
          ? "indefinit"
          : "singulär";

  const linien = useMemo(() => {
    const gF = gitter(aufgabe.f, D, D, N_GITTER);
    const stufen = niveaus(gF.min, gF.max, N_NIVEAUS);
    const alle: Segment[] = [];
    for (const n of stufen) alle.push(...hoehenlinie(gF, n));
    return alle;
  }, [aufgabe]);

  let status: string;
  if (aktuell.singulaer) {
    status =
      `Bei x₁ = 0 ist die Hesse-Matrix diag(0, 1) und damit nicht invertierbar: Der Newton-Schritt ` +
      `aus Algorithmus 11.4.11 verlangt H⁻¹ und ist hier gar nicht definiert. Das Taylorpolynom T₂ ` +
      `entartet in dieser Richtung zu einer Geraden, die kein Minimum hat. Ein Stück am Startregler ` +
      `genügt, um wieder in den regulären Fall zu kommen.`;
  } else if (aufgabe.quadratisch) {
    status =
      schritte === 0
        ? `Auf einer Quadrik stimmt T₂ mit f überein. Der erste Schritt minimiert also nicht eine ` +
          `Näherung, sondern f selbst, und muss deshalb exakt im Minimum landen. Klicken wir einmal.`
        : `Wie angekündigt: EIN Schritt, und der Gradient ist bis auf Rundungsfehler null ` +
          `(‖∇f‖ = ${fmtE(aktuell.gradNorm)}). Weitere Klicks bewegen nichts mehr. Das Minimum liegt ` +
          `bei (0,6; 0,8) mit f = −3,6, und die Hesse-Matrix (4, 2; 2, 6) ist mit Determinante 20 und ` +
          `positiver Spur positiv definit, es ist also wirklich ein Minimum.`;
  } else if (ziel && ziel[0] < 0) {
    status =
      `Der Start liegt links der Null, und die Iteration läuft gegen (−1; 0). Dort ist der Gradient ` +
      `null, die Hesse-Matrix diag(−2, 1) aber indefinit: ein Sattelpunkt. Newton sucht Nullstellen ` +
      `des Gradienten, also kritische Punkte, und unterscheidet Minimum, Maximum und Sattel nicht ` +
      `von selbst. Wer das Minimum will, muss die Definitheit prüfen (Bemerkung 11.4.12).`;
  } else if (bahn[0].fehler === 0) {
    status =
      `Der Startpunkt ist schon das Minimum (1; 0): Der Gradient ist null, der Newton-Schritt ` +
      `ändert nichts mehr, und die Fehlerspalte bleibt bei 0. Der Quotient eₖ/eₖ₋₁² ist hier ` +
      `0/0 und deshalb leer. Ein Stück am Startregler, und die Iteration bekommt etwas zu tun.`;
  } else if (aktuell.fehler === 0) {
    status =
      `Die Iteration ist am Ziel: Der Abstand zum Minimum (1; 0) ist auf null gefallen, weiter ` +
      `als bis zur Maschinengenauigkeit kommt keine Rechnung. Der Quotient eₖ/eₖ₋₁² in der ` +
      `letzten Zeile ist deshalb nicht mehr aussagekräftig; ablesen lässt sich die quadratische ` +
      `Konvergenz an den Zeilen davor, wo er gegen 1/(2·x₁*) = 0,5 läuft.`;
  } else if (schritte === 0) {
    status =
      `Der Startpunkt liegt rechts der Null, das Ziel ist das Minimum (1; 0). Sehenswert ist der ` +
      `erste Schritt: In der x₂-Richtung ist f quadratisch, dort trifft Newton sofort exakt; in der ` +
      `x₁-Richtung braucht er mehrere Anläufe. Klicken wir Schritt für Schritt und beobachten ` +
      `dabei die Fehlerspalte.`;
  } else {
    const letzte = sichtbar.length - 1;
    const vorletzte = sichtbar[letzte - 1];
    const q = vorletzte.fehler > 0 ? aktuell.fehler / vorletzte.fehler ** 2 : NaN;
    const ersteZeile =
      Math.abs(y0) > 1e-12
        ? `In der ersten Zeile gilt das noch nicht, dort steckt im Fehler auch die x₂-Richtung, ` +
          `die Newton in einem Zug erledigt.`
        : `In der ersten Zeile gilt das noch nicht, dort ist der Startpunkt für die quadratische ` +
          `Konvergenz einfach zu weit weg.`;
    status =
      `Nach ${letzte} Schritt${letzte === 1 ? "" : "en"} ist der Abstand zum Minimum ` +
      `${fmtE(aktuell.fehler)}; im Schritt davor war er ${fmtE(vorletzte.fehler)}. Der Quotient ` +
      `eₖ/eₖ₋₁² steht bei ${fmt(q, 3)} und strebt gegen 1/(2·x₁*) = 0,5, der Fehler wird also in ` +
      `jedem Schritt im Wesentlichen quadriert. In der Tabelle heißt das: Die Zahl der gültigen ` +
      `Stellen verdoppelt sich pro Schritt, sobald wir nahe genug am Ziel sind. ${ersteZeile}`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Blau sind die Höhenlinien von f, orange der Weg der Newton-Iterierten, grün der Punkt, den
        die Iteration ansteuert. Jeder Klick auf „Schritt“ führt genau eine Zeile von
        Algorithmus 11.4.11 aus.
      </p>
      <div className="flex flex-wrap gap-2">
        {AUFGABEN.map((a) => (
          <button
            key={a.id}
            type="button"
            className={knopf(a.id === id)}
            onClick={() => {
              setId(a.id);
              setSchritte(0);
            }}
          >
            f(x) = {a.label}
          </button>
        ))}
      </div>
      <Slider
        label="x₁ (Start)"
        value={x0}
        onChange={(v) => {
          setX0(Math.round(v * 4) / 4);
          setSchritte(0);
        }}
        min={-2.25}
        max={2.25}
        step={0.25}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="x₂ (Start)"
        value={y0}
        onChange={(v) => {
          setY0(Math.round(v * 4) / 4);
          setSchritte(0);
        }}
        min={-2.25}
        max={2.25}
        step={0.25}
        fmt={(v) => fmt(v, 2)}
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={knopf(false)}
          onClick={() => setSchritte((s) => Math.min(s + 1, bahn.length - 1))}
        >
          Schritt
        </button>
        <button type="button" className={knopf(false)} onClick={() => setSchritte(0)}>
          Zurücksetzen
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            x₂ ↑
          </div>
          <svg
            width={PAD_L + W + 6}
            height={W + PAD_B}
            className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {niceTicks(D[0], D[1]).map((t) => (
              <g key={`t${t}`}>
                <line x1={PAD_L} x2={PAD_L + W} y1={py(t)} y2={py(t)} stroke="#e2e8f0" strokeWidth={0.6} />
                <line y1={0} y2={W} x1={px(t)} x2={px(t)} stroke="#e2e8f0" strokeWidth={0.6} />
                <text x={PAD_L - 3} y={py(t) + 3} textAnchor="end" fill={ACHSE} fontSize={9}>
                  {String(t).replace("-", "−")}
                </text>
                <text x={px(t)} y={W + 11} textAnchor="middle" fill={ACHSE} fontSize={9}>
                  {String(t).replace("-", "−")}
                </text>
              </g>
            ))}
            <line x1={PAD_L} x2={PAD_L + W} y1={py(0)} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
            <line y1={0} y2={W} x1={px(0)} x2={px(0)} stroke={ACHSE} strokeWidth={1} />
            <path d={pfad(linien)} fill="none" stroke={BLAU} strokeWidth={1.3} />
            {ziel && <circle cx={px(ziel[0])} cy={py(ziel[1])} r={5} fill="none" stroke={GRUEN} strokeWidth={2.4} />}
            {sichtbar.slice(1).map((p, i) => (
              <line
                key={`w${i}`}
                x1={px(sichtbar[i].x[0])}
                y1={py(sichtbar[i].x[1])}
                x2={px(p.x[0])}
                y2={py(p.x[1])}
                stroke={ORANGE}
                strokeWidth={2}
              />
            ))}
            {sichtbar.map((p, i) => (
              <circle
                key={`p${i}`}
                cx={px(p.x[0])}
                cy={py(p.x[1])}
                r={i === sichtbar.length - 1 ? 4.5 : 3}
                fill={ORANGE}
              />
            ))}
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            x₁ →
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="px-2 text-right">k</th>
                <th className="px-2 text-right">x₁</th>
                <th className="px-2 text-right">x₂</th>
                <th className="px-2 text-right" style={{ color: ORANGE }}>
                  ‖∇f‖
                </th>
                <th className="px-2 text-right" style={{ color: ROT }}>
                  Fehler eₖ
                </th>
                <th className="px-2 text-right" style={{ color: ROT }}>
                  eₖ/eₖ₋₁²
                </th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {sichtbar.map((p, i) => {
                const vor = i > 0 ? sichtbar[i - 1].fehler : NaN;
                const q = i > 0 && vor > 0 ? p.fehler / vor ** 2 : NaN;
                return (
                  <tr key={i} className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-2 text-right">{i}</td>
                    <td className="px-2 text-right">{fmt(p.x[0], 6)}</td>
                    <td className="px-2 text-right">{fmt(p.x[1], 6)}</td>
                    <td className="px-2 text-right">{fmtE(p.gradNorm)}</td>
                    <td className="px-2 text-right">{fmtE(p.fehler)}</td>
                    <td className="px-2 text-right">{Number.isNaN(q) ? "" : fmt(q, 3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: ORANGE }}>
          H_f in Zeile k = {sichtbar.length - 1}: ({fmt(H[0][0], 3)}, {fmt(H[0][1], 3)}; {fmt(H[1][0], 3)},{" "}
          {fmt(H[1][1], 3)}), det = {fmt(aktuell.detH, 3)} → {definitheit}
        </div>
        <div style={{ color: BLAU }}>
          f in Zeile k = {sichtbar.length - 1}: {fmt(aufgabe.f(aktuell.x[0], aktuell.x[1]), 6)}
        </div>
      </div>

      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
