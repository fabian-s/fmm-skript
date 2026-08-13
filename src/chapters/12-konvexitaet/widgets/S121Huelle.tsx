import { useState } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §12.1: Konvexe Hülle einer Punktwolke (Eigenbau).
 *
 * Zweites Widget zum Ersatz von convex-hull.png (Folien 12-konvexitaet,
 * Z. 128-134). Die Punktliste ist FEST eingebettet, es gibt keinen Zufall
 * zur Laufzeit. Der Regler schaltet die ersten k Punkte frei; die konvexe
 * Hülle entsteht per Monotone-Chain-Verfahren, die Fläche über die
 * Schnürsenkelformel.
 *
 * Die Reihenfolge der Punkte ist so gewählt, dass Punkte ihre
 * Extrempunkt-Eigenschaft im Lauf des Reglers wieder verlieren: bei
 * k = 5, 6, 8, 9, 10, 11 und 12 fällt jeweils einer nach innen
 * (per node bestätigt, check-huelle-s121.mjs). Die endgültige Hülle hat
 * 7 Extrempunkte bei 14 Punkten und die Fläche 7,46.
 *
 * Grün ist zusätzlich der Mittelwert der ersten k Punkte: eine
 * Konvexkombination mit lauter Gewichten 1/k, also nach Definition 12.1.5
 * ein Element der konvexen Hülle.
 *
 * Farbcode Kapitel 12: konvexe Menge blau, Konvexkombination grün,
 * Extrempunkte orange.
 */

const GRUEN = "#009E73"; // Mittelwert als Konvexkombination
const BLAU = "#0072B2"; // die konvexe Hülle
const ORANGE = "#E69F00"; // Extrempunkte

type P2 = [number, number];

/** Feste Punktwolke; die Reihenfolge steuert, was der Regler wann freischaltet. */
const PUNKTE: P2[] = [
  [1.5, 1.4],
  [2.2, 2.0],
  [1.2, 2.4],
  [0.9, 1.2],
  [2.6, 1.5],
  [1.9, 2.9],
  [2.9, 2.4],
  [0.4, 0.5],
  [3.0, 1.0],
  [2.4, 3.5],
  [0.2, 2.0],
  [3.4, 2.6],
  [1.6, 0.3],
  [1.0, 3.2],
];

function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const kreuz = (o: P2, a: P2, b: P2) =>
  (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/** Monotone Chain: sortieren, unteren und oberen Rand aufbauen. */
function konvexeHuelle(pts: P2[]): P2[] {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const unten: P2[] = [];
  for (const q of p) {
    while (unten.length >= 2 && kreuz(unten[unten.length - 2], unten[unten.length - 1], q) <= 0)
      unten.pop();
    unten.push(q);
  }
  const oben: P2[] = [];
  for (const q of p.slice().reverse()) {
    while (oben.length >= 2 && kreuz(oben[oben.length - 2], oben[oben.length - 1], q) <= 0)
      oben.pop();
    oben.push(q);
  }
  return unten.slice(0, -1).concat(oben.slice(0, -1));
}

/** Schnürsenkelformel. */
function flaeche(poly: P2[]): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
}

const LO = -0.2;
const HI = 3.8;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 18;
const PAD_R = 12;
const px = (x: number) => PAD_L + ((x - LO) / (HI - LO)) * SIZE;
const py = (y: number) => SIZE - ((y - LO) / (HI - LO)) * SIZE;

export function KonvexeHuellePunktwolke() {
  const [k, setK] = useState(6);

  const aktiv = PUNKTE.slice(0, k);
  const huelle = konvexeHuelle(aktiv);
  const istExtrem = aktiv.map((p) => huelle.some((h) => h[0] === p[0] && h[1] === p[1]));

  const vorher = konvexeHuelle(PUNKTE.slice(0, k - 1));
  const verloren = vorher.filter((p) => !huelle.some((h) => h[0] === p[0] && h[1] === p[1]));

  const mittel: P2 = [
    aktiv.reduce((s, p) => s + p[0], 0) / k,
    aktiv.reduce((s, p) => s + p[1], 0) / k,
  ];

  const ticks = niceTicks(0, HI);

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Vierzehn fest eingebaute Punkte, und der Regler schaltet die ersten k davon frei. Blau
        ist ihre konvexe Hülle, orange sind die Extrempunkte, grau die übrigen. Der grüne Punkt
        ist der Mittelwert der freigeschalteten Punkte, also die Konvexkombination mit lauter
        Gewichten 1/k.
      </p>
      <Slider
        label="Anzahl k"
        value={k}
        onChange={(v) => setK(Math.round(v))}
        min={3}
        max={PUNKTE.length}
        step={1}
        fmt={(v) => fmt(v, 0)}
      />
      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            2. Koordinate ↑
          </div>
          <svg
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="#e2e8f0"
                  strokeWidth={0.6}
                />
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(t, 0)}
                </text>
                <line y1={0} y2={SIZE} x1={px(t)} x2={px(t)} stroke="#e2e8f0" strokeWidth={0.6} />
                <text x={px(t)} y={SIZE + 13} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(t, 0)}
                </text>
              </g>
            ))}
            <polygon
              points={huelle.map((p) => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(" ")}
              fill={BLAU}
              fillOpacity={0.12}
              stroke={BLAU}
              strokeWidth={1.8}
            />
            {aktiv.map((p, i) => (
              <circle
                key={`p${i}`}
                cx={px(p[0])}
                cy={py(p[1])}
                r={istExtrem[i] ? 5 : 3.5}
                fill={istExtrem[i] ? ORANGE : "#94a3b8"}
              />
            ))}
            <circle cx={px(mittel[0])} cy={py(mittel[1])} r={6} fill="none" stroke={GRUEN} strokeWidth={2.2} />
            <circle cx={px(mittel[0])} cy={py(mittel[1])} r={2.5} fill={GRUEN} />
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            1. Koordinate →
          </div>
        </div>
        <div className="max-w-prose grow space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
          <p>
            <span className="font-mono">k = {fmt(k, 0)}</span> Punkte,{" "}
            <span className="font-mono" style={{ color: ORANGE }}>
              {fmt(huelle.length, 0)} Extrempunkte
            </span>
            , Fläche der Hülle <span className="font-mono">{fmt(flaeche(huelle))}</span>
          </p>
          <p>
            Mittelwert{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              ({fmt(mittel[0])}; {fmt(mittel[1])})
            </span>{" "}
            mit den Gewichten 1/k = <span className="font-mono">{fmt(1 / k, 3)}</span>. Er liegt
            immer in der blauen Fläche, denn er ist eine Konvexkombination der Punkte.
          </p>
          {verloren.length > 0 ? (
            <p>
              Der neue Punkt hat{" "}
              <span className="font-mono">
                {verloren.map((p) => `(${fmt(p[0], 1)}; ${fmt(p[1], 1)})`).join(", ")}
              </span>{" "}
              nach innen geholt: eben noch Extrempunkt, jetzt selbst eine Konvexkombination der
              übrigen. Extrempunkt zu sein hängt also nicht am Punkt allein, sondern an der
              Menge, in der er liegt.
            </p>
          ) : (
            <p>
              Alle bisherigen Extrempunkte bleiben Extrempunkte. Der neue Punkt liegt entweder
              schon in der bisherigen Hülle, oder er vergrößert sie, ohne einen alten Eckpunkt zu
              überdecken.
            </p>
          )}
        </div>
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        Zwei Beobachtungen. Erstens wächst die Hülle monoton: Punkte hinzuzunehmen kann die
        Fläche nur vergrößern, nie verkleinern, denn alle alten Konvexkombinationen bleiben ja
        möglich. Zweitens gilt das für die Liste der Extrempunkte nicht. Bei k = 5, 6, 8, 9, 10,
        11 und 12 fällt jeweils ein alter Eckpunkt heraus, während der neue nachrückt: Die Anzahl
        bleibt dabei stehen, die Zusammensetzung ändert sich. Bei k = 14 tragen nur sieben der
        vierzehn Punkte die Hülle; die anderen sieben liegen darin, ohne etwas beizusteuern.
        Die Liste der Extrempunkte ist deshalb die sparsame Beschreibung einer solchen Menge.
      </p>
    </div>
  );
}
