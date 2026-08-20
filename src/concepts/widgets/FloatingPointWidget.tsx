/**
 * Konzept-Widget für `floating-point` UND `machine-epsilon` (gemeinsame
 * Komponente, Dublettenauflösung D6 vom 2026-08-19).
 *
 * DIE EINE EINSICHT: Die darstellbaren Zahlen liegen nicht gleichmäßig auf der
 * Achse, sondern binadenweise — der Abstand verdoppelt sich an jeder
 * Zweierpotenz, während der *relative* Abstand konstant 2^-t bleibt. Deshalb
 * kostet Runden immer denselben relativen Preis, egal wie groß die Zahl ist.
 *
 * VARIANTEN: `variante="gesamt"` (floating-point) zeigt den ganzen Strahl;
 * `variante="epsilon"` (machine-epsilon) hebt zusätzlich die Lücke direkt
 * rechts von 1 hervor — sie ist die Maschinengenauigkeit.
 *
 * FARBROLLEN: blau = Gitter der darstellbaren Zahlen; rot = die exakte Zahl x,
 * die wir ziehen; orange = ihr gerundetes Bild fl(x) und die hervorgehobene
 * ε-Lücke. Flächen/Achsen/Text kommen aus den Theme-Variablen (--w-*).
 *
 * PROVENIENZ: Zahlenstrahl-Idee und Binaden-Aufbau aus den beiden
 * Vorgängerwidgets FloatingPointWidget/MachineEpsilonWidget (Stand
 * 2026-08-18); Ziehen über `useDrag` aus der Lib, Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20;
 * Erstprüfung 2026-08-19), Spielzeugsystem mit e ∈ {−1,0,1,2}:
 *   Striche: t=1 → 9, t=2 → 17, t=3 → 33, t=4 → 65, t=5 → 129 (= 4·2^t + 1).
 *   Lücke rechts von 1 = 2^-t (0,5 / 0,25 / 0,125 / 0,0625 / 0,03125),
 *   Lücke rechts von 4 = 4·2^-t, Verhältnis exakt 4 für jedes t.
 *   Relative Lücke je Binade konstant 2^-t.
 *   Größter relativer Rundungsfehler über [0,5; 8] (200 001 Proben):
 *   t=1 → 2,000e−1, t=2 → 1,111e−1, t=3 → 5,882e−2, t=4 → 3,030e−2,
 *   t=5 → 1,538e−2; die Schranke 2^-(t+1) (0,25 / 0,125 / 0,0625 / 0,03125 /
 *   0,015625) wird in jedem Fall eingehalten.
 *   Doppelte Genauigkeit zum Vergleich: 2^-52 = 2,220446049250313e−16
 *   = Number.EPSILON, 1 + 2^-53 === 1, √(2^-52) ≈ 1,49e−8.
 *
 * KORREKTUR 2026-08-20 (Re-Audit QA-O0): Am Reglermaximum x = 8 = 2³ lieferte
 * Math.floor(log2 x) die Binade 3 und das Verdikt behauptete einen
 * Nachbarabstand 8·2^-t. Oberhalb von 8 gibt es aber gar keine Gitterpunkte
 * mehr; der tatsächliche Abstand unter 8 ist 4·2^-t. Die Binade ist jetzt auf
 * den größten Exponenten gekappt.
 */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_PANEL,
  clamp,
  fmtDe,
  useDrag,
} from "../../lib";

const BREITE = 340;
const HOEHE = 132;
const PAD_L = 16;
const PAD_R = 16;
const ACHSE_Y = 74;
const X_MIN = 0.5;
const X_MAX = 8;
const EXPONENTEN = [-1, 0, 1, 2];

/** Alle darstellbaren Zahlen des Spielzeugsystems, aufsteigend. */
function gitter(t: number): number[] {
  const werte: number[] = [];
  for (const e of EXPONENTEN) {
    for (let k = 0; k < 2 ** t; k++) werte.push((1 + k / 2 ** t) * 2 ** e);
  }
  werte.push(2 ** (EXPONENTEN[EXPONENTEN.length - 1] + 1));
  return werte;
}

/** Nächstgelegene darstellbare Zahl (Runden zur nächsten Gitterzahl). */
function runde(werte: number[], x: number): number {
  let beste = werte[0];
  for (const v of werte) if (Math.abs(v - x) < Math.abs(beste - x)) beste = v;
  return beste;
}

export function ToyFloatLine({
  variante = "gesamt",
}: {
  variante?: "gesamt" | "epsilon";
}) {
  const [t, setT] = useState(2);
  const [x, setX] = useState(variante === "epsilon" ? 1.3 : 5.4);

  const werte = useMemo(() => gitter(t), [t]);
  const px = (v: number) => PAD_L + ((v - X_MIN) / (X_MAX - X_MIN)) * (BREITE - PAD_L - PAD_R);

  const fl = runde(werte, x);
  const relFehler = Math.abs(x - fl) / x;
  const schranke = 2 ** -(t + 1);
  const eps = 2 ** -t;
  // Binade, in der x liegt: [2^e, 2^{e+1}) — dort ist der Gitterabstand 2^e·2^-t.
  // Am rechten Rand (x = 8 = 2^3) endet das Gitter; dort gilt weiterhin der
  // Abstand der letzten vollen Binade [4, 8), sonst behauptet das Verdikt eine
  // Lücke, die im Bild gar nicht existiert.
  const binade = Math.min(Math.floor(Math.log2(x)), EXPONENTEN[EXPONENTEN.length - 1]);
  const luecke = 2 ** binade * eps;
  const exakt = relFehler < 1e-12;

  const zieh = useDrag<"x">({
    feld: { x0: PAD_L, y0: 0, w: BREITE - PAD_L - PAD_R, h: HOEHE },
    welt: { x0: X_MIN, x1: X_MAX, y0: 0, y1: 1 },
    clamp: ([wx]) => [clamp(wx, X_MIN, X_MAX), 0],
    onDrag: ([wx]) => setX(wx),
    cursor: "ew-resize",
  });

  const epsBand = variante === "epsilon" ? { von: 1, bis: 1 + eps } : null;

  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Ziehen wir <span className="font-mono">x</span> über den Strahl und schauen wir, auf
        welchen Strich es gerundet wird.
      </Aufgabe>
      <svg
        viewBox={`0 0 ${BREITE} ${HOEHE}`}
        width={BREITE}
        height={HOEHE}
        className="mt-1 h-auto max-w-full rounded"
        role="img"
        aria-label={`Zahlenstrahl der darstellbaren Zahlen eines Spielzeugsystems mit ${t} Mantissenbits; x = ${fmtDe(x, 3)} wird auf ${fmtDe(fl, 3)} gerundet.`}
        {...zieh.svgProps}
      >
        <rect
          x={0.5}
          y={0.5}
          width={BREITE - 1}
          height={HOEHE - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />

        {epsBand && (
          <>
            <rect
              x={px(epsBand.von)}
              y={ACHSE_Y - 26}
              width={Math.max(1, px(epsBand.bis) - px(epsBand.von))}
              height={52}
              fill={FMM_COLORS.orange}
              fillOpacity={0.22}
            />
          </>
        )}

        <line
          x1={px(X_MIN)}
          y1={ACHSE_Y}
          x2={px(X_MAX)}
          y2={ACHSE_Y}
          stroke="var(--w-axis)"
          strokeWidth={1}
        />
        {werte.map((v, i) => (
          <line
            key={i}
            x1={px(v)}
            y1={ACHSE_Y - 8}
            x2={px(v)}
            y2={ACHSE_Y + 8}
            stroke={FMM_COLORS.blau}
            strokeWidth={1.3}
          />
        ))}
        {[0.5, 1, 2, 4, 8].map((v) => (
          <g key={`p${v}`}>
            <line
              x1={px(v)}
              y1={ACHSE_Y - 13}
              x2={px(v)}
              y2={ACHSE_Y + 13}
              stroke="var(--w-grid-strong)"
              strokeWidth={1}
            />
            <text
              x={px(v)}
              y={ACHSE_Y + 26}
              textAnchor="middle"
              fontSize={10}
              fill="var(--w-muted)"
            >
              {fmtDe(v, v < 1 ? 1 : 0)}
            </text>
          </g>
        ))}

        {/* fl(x): der Gitterpunkt, auf den gerundet wird */}
        <line
          x1={px(fl)}
          y1={ACHSE_Y - 14}
          x2={px(fl)}
          y2={ACHSE_Y + 14}
          stroke={FMM_COLORS.orange}
          strokeWidth={2.4}
        />
        <text
          x={px(fl)}
          y={ACHSE_Y + 40}
          textAnchor="middle"
          fontSize={10}
          fill={FMM_COLORS.orange}
        >
          fl(x)
        </text>

        {/* x selbst, mit Rundungspfeil auf fl(x) */}
        <line
          x1={px(x)}
          y1={ACHSE_Y - 24}
          x2={px(fl)}
          y2={ACHSE_Y - 10}
          stroke={FMM_COLORS.rot}
          strokeWidth={1.2}
          strokeDasharray="3 3"
        />
        <text
          x={px(x)}
          y={ACHSE_Y - 44}
          textAnchor="middle"
          fontSize={11}
          fill={FMM_COLORS.rot}
        >
          x = {fmtDe(x, 3)}
        </text>
        <DragHandle
          x={px(x)}
          y={ACHSE_Y - 30}
          r={5}
          farbe={FMM_COLORS.rot}
          aktiv={zieh.dragging === "x"}
          {...zieh.handleProps("x")}
        />
      </svg>

      <Slider label="x" value={x} onChange={setX} min={X_MIN} max={X_MAX} step={0.001} accent={FMM_COLORS.rot} />
      <Slider label="Mantissenbits t" value={t} onChange={setT} min={1} max={5} step={1} fmt={(v) => fmtDe(v, 0)} />

      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> darstellbare Zahlen ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> exaktes x ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> gerundetes fl(x)
        {variante === "epsilon" && (
          <>
            {" "}
            · <span style={{ color: FMM_COLORS.orange }}>▮</span> ε = {fmtDe(eps, 4)} (Lücke
            rechts von 1)
          </>
        )}
      </p>

      <Verdikt kind={exakt ? "ok" : "neutral"}>
        {exakt ? (
          <>
            x liegt selbst auf dem Gitter, fl(x) = x, der Rundungsfehler ist null. In der Binade
            [{fmtDe(2 ** binade, 1)}, {fmtDe(2 ** (binade + 1), 1)}) beträgt der Abstand zweier
            Nachbarn {fmtDe(luecke, 4)} = {fmtDe(2 ** binade, 1)} · 2<sup>−{t}</sup>.
          </>
        ) : (
          <>
            fl(x) = {fmtDe(fl, 4)}, der relative Fehler ist {fmtDe(100 * relFehler, 2)} %. Er
            bleibt unter der halben Lücke, {fmtDe(100 * schranke, 2)} % = 2<sup>−{t + 1}</sup>,
            und zwar in jeder Binade: hier ist der Nachbarabstand {fmtDe(luecke, 4)}, doppelt so
            groß wie in der Binade davor, der relative Abstand aber überall 2<sup>−{t}</sup> ={" "}
            {fmtDe(eps, 4)}.
          </>
        )}
      </Verdikt>
    </div>
  );
}
