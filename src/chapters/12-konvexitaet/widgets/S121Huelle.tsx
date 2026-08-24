import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Schaetzfrage,
  Slider,
  Verdikt,
  fmtDe,
  fmtInt,
  niceTicks,
  fmtTick,
} from "../../../lib";

/**
 * §12.1: Konvexe Hülle einer Punktwolke (Eigenbau).
 *
 * DIE EINE EINSICHT: Die konvexe Hülle wächst monoton, die Liste ihrer
 * Extrempunkte aber nicht — ein neuer Punkt kann eine alte Ecke einschließen
 * und ihr den Status nehmen (Bemerkung 12.1.8).
 *
 * Ersatz für convex-hull.png (Folien 12-konvexitaet, Z. 128–134). Die
 * Punktliste ist FEST eingebettet, es gibt keinen Zufall zur Laufzeit. Der
 * Regler schaltet die ersten k Punkte frei; die Hülle entsteht per
 * Monotone-Chain-Verfahren, die Fläche über die Schnürsenkelformel.
 *
 * FARBROLLEN (Kapitel 12): konvexe Menge blau, Konvexkombination (der
 * Mittelwert) grün, Extrempunkte orange, verlorene Ecken rot, übrige Punkte
 * neutralgrau.
 *
 * PROVENIENZ: Eigenbau; Achsenraster, Zahlformat und Farbwerte kommen aus
 * `src/lib/widgets/util.ts`.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen: Eine alte Ecke fällt bei
 * k = 5, 6, 8, 9, 10, 11 und 12 heraus; (1,5; 1,4) verliert seine Ecke bei
 * k = 5. Extrempunktzahlen 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 7 für
 * k = 3 … 14, Fläche wächst monoton von 0,44 auf 7,46.
 */

const GRUEN = FMM_COLORS.gruen; // Mittelwert als Konvexkombination
const BLAU = FMM_COLORS.blau; // die konvexe Hülle
const ORANGE = FMM_COLORS.orange; // Extrempunkte
const ROT = FMM_COLORS.rot; // gerade verlorene Ecken
const NEUTRAL = FMM_COLORS.grau; // Punkte ohne Extrempunkt-Eigenschaft

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
const PAD_B = 30;
const PAD_R = 12;
const VB_W = PAD_L + SIZE + PAD_R;
const VB_H = SIZE + PAD_B;
const px = (x: number) => PAD_L + ((x - LO) / (HI - LO)) * SIZE;
const py = (y: number) => SIZE - ((y - LO) / (HI - LO)) * SIZE;

const punktText = (p: P2) => `(${fmtDe(p[0], 1)}; ${fmtDe(p[1], 1)})`;

/** Kern des Widgets ohne die Schätzfrage-Hülle. */
export function KonvexeHuellePunktwolke({ start = 4 }: { start?: number }) {
  const [k, setK] = useState(start);

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
  const tickStep = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
  const neu = PUNKTE[k - 1];

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir k nach oben und achten wir darauf, wann ein oranger Punkt grau wird.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[300px]">
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Punktwolke mit ${fmtInt(k)} freigeschalteten Punkten und ihrer konvexen Hülle; ${fmtInt(huelle.length)} davon sind Extrempunkte.`}
          >
            <rect
              x={0.5}
              y={0.5}
              width={VB_W - 1}
              height={VB_H - 1}
              rx={4}
              fill="var(--w-bg, #ffffff)"
              stroke="var(--w-border, #cbd5e1)"
            />
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="var(--w-grid, #e2e8f0)"
                  strokeWidth={0.6}
                />
                <text
                  x={PAD_L - 4}
                  y={py(t) + 3}
                  textAnchor="end"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, tickStep)}
                </text>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="var(--w-grid, #e2e8f0)"
                  strokeWidth={0.6}
                />
                <text
                  x={px(t)}
                  y={SIZE + 13}
                  textAnchor="middle"
                  fill="var(--w-muted, #64748b)"
                  fontSize={10}
                >
                  {fmtTick(t, tickStep)}
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
            {aktiv.map((p, i) => {
              const raus = verloren.some((v) => v[0] === p[0] && v[1] === p[1]);
              return (
                <circle
                  key={`p${i}`}
                  cx={px(p[0])}
                  cy={py(p[1])}
                  r={istExtrem[i] || raus ? 5 : 3.5}
                  fill={istExtrem[i] ? ORANGE : raus ? ROT : NEUTRAL}
                />
              );
            })}
            <circle
              cx={px(neu[0])}
              cy={py(neu[1])}
              r={8}
              fill="none"
              stroke={istExtrem[k - 1] ? ORANGE : NEUTRAL}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle
              cx={px(mittel[0])}
              cy={py(mittel[1])}
              r={6}
              fill="none"
              stroke={GRUEN}
              strokeWidth={2.2}
            />
            <circle cx={px(mittel[0])} cy={py(mittel[1])} r={2.5} fill={GRUEN} />
            <text
              x={PAD_L + 4}
              y={12}
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              2. Koordinate ↑
            </text>
            <text
              x={PAD_L + SIZE / 2}
              y={SIZE + 27}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              1. Koordinate →
            </text>
          </svg>
        </div>
        <div className="min-w-[15rem] grow basis-[15rem] space-y-2 text-sm">
          <Slider
            label="Anzahl k"
            value={k}
            onChange={(v) => setK(Math.round(v))}
            min={3}
            max={PUNKTE.length}
            step={1}
            accent={BLAU}
            fmt={(v) => fmtInt(v)}
          />
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">freigeschaltet</td>
                <td className="font-mono text-xs">{fmtInt(k)} Punkte</td>
              </tr>
              <tr>
                <td className="pr-3">Extrempunkte</td>
                <td className="font-mono text-xs" style={{ color: ORANGE }}>
                  {fmtInt(huelle.length)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">Fläche der Hülle</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {fmtDe(flaeche(huelle))}
                </td>
              </tr>
              <tr>
                <td className="pr-3">Mittelwert</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  ({fmtDe(mittel[0])}; {fmtDe(mittel[1])})
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Blau die konvexe Hülle, orange ihre Extrempunkte, grau die übrigen Punkte, grün der
            Mittelwert der ersten k Punkte (Gewichte 1/k = {fmtDe(1 / k, 3)}), gestrichelt der
            zuletzt hinzugekommene Punkt.
          </p>
        </div>
      </div>
      {verloren.length > 0 ? (
        <Verdikt kind="warn" titel="Eine Ecke ist nach innen gefallen.">
          Der neue Punkt {punktText(neu)} schließt {punktText(verloren[0])}
          {verloren.length > 1 ? " und weitere" : ""} ein: eben noch Extrempunkt, jetzt selbst
          eine Konvexkombination der übrigen. Extrempunkt zu sein hängt nach Definition 12.1.7
          nicht am Punkt allein, sondern an der Menge, in der er liegt (Bemerkung 12.1.8).
        </Verdikt>
      ) : k === 3 ? (
        <Verdikt kind="neutral" titel="Startlage.">
          Drei Punkte, drei Ecken: Die Hülle ist das Dreieck aus Beispiel 12.1.10, und jeder der
          drei Punkte ist Extrempunkt. Der grüne Mittelwert liegt als Konvexkombination mit
          Gewichten 1/3 darin (Bemerkung 12.1.2).
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Alle alten Ecken bleiben Ecken.">
          Der neue Punkt {punktText(neu)} liegt entweder schon in der bisherigen Hülle, oder er
          vergrößert sie, ohne einen alten Eckpunkt zu überdecken. Die Fläche kann dabei nur
          wachsen, denn alle alten Konvexkombinationen bleiben nach Definition 12.1.5 möglich.
        </Verdikt>
      )}
    </div>
  );
}

/** Der Abschnitts-Baustein: erst tippen, dann schieben. */
export function HuellenSchaetzung() {
  return (
    <Schaetzfrage
      frage="Der Punkt (1,5; 1,4) startet als Extrempunkt. Ab welchem k verliert er diesen Status?"
      loesung={5}
      toleranz={0}
      einheit="Punkte"
      fmt={(v) => fmtInt(v)}
      verdeckt={
        <p className="max-w-prose text-sm">
          Eine alte Ecke fällt bei k = 5, 6, 8, 9, 10, 11 und 12 heraus, jedes Mal genau eine,
          während der neue Punkt nachrückt. Deshalb steht die Anzahl der Extrempunkte über weite
          Strecken still, obwohl sich ihre Zusammensetzung ändert.
        </p>
      }
    >
      <KonvexeHuellePunktwolke />
    </Schaetzfrage>
  );
}
