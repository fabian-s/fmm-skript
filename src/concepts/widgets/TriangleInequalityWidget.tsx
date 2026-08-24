/**
 * Konzept-Widget `triangle-inequality`.
 *
 * DIE EINE EINSICHT: ‖a + b‖ ist keine feste Zahl, sondern läuft zwischen zwei
 * Schranken – und beide werden angenommen. Bei gleicher Richtung wird der
 * Umweg zum direkten Weg, bei entgegengesetzter frisst er sich selbst auf.
 *
 * FARBROLLEN: blau = a; rot = b (die Kurspalette nennt diesen Zinnoberton
 * `rot`, er wirkt orange); grün = die Summe a + b und ihr Vergleichsbalken.
 * Die beiden Schrankenbalken bleiben neutral.
 *
 * PROVENIENZ: Dreieck, Balkenpaar und Kosinussatz aus der Vorfassung (Stand
 * 2026-08-20); Kurspalette statt lokaler Hexwerte, die Anordnung
 * Regler-unter-Grafik und die Erkennung der beiden Gleichheitsfälle sind neu.
 *
 * Die drei Balken sind ein direkt beschrifteter Größenvergleich, kein
 * Koordinatenbild: jeder Balken trägt seinen Wert als Zahl, der längste ist die
 * obere Schranke und damit der Maßstab. Achsen mit Ticks gäbe es hier nichts zu
 * beschriften.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * mit ‖a‖ = 2 und ‖b‖ = 1,3 gilt ‖a+b‖ = √(‖a‖² + ‖b‖² + 2‖a‖‖b‖cos ω); der
 * Wert fällt monoton von 3,30 bei ω = 0 (obere Schranke, Gleichheit) über 2,99
 * im Startzustand ω = 0,9 und 2,39 bei ω = π/2 bis 0,70 bei ω = π (untere
 * Schranke, Gleichheit). Das Sandwich 0,70 ≤ ‖a+b‖ ≤ 3,30 ist über das ganze
 * Winkelraster in 1°-Schritten nachgerechnet.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtDe } from "../../lib";

const NA = 2.0; // ‖a‖
const NB = 1.3; // ‖b‖
const W = 300;
const H = 215;
const S = 55; // Pixel je Einheit — isotrop, damit das Dreieck ein Dreieck bleibt
const BALKEN_X = 120;
const BALKEN_W = 140;

export function TriangleWidget() {
  const [omega, setOmega] = useState(0.9);

  const nsum = Math.sqrt(NA * NA + NB * NB + 2 * NA * NB * Math.cos(omega));
  const unten = Math.abs(NA - NB);
  const oben = NA + NB;

  const ox = 35;
  const oy = H - 25;
  const ax = ox + S * NA;
  const sx = ox + S * (NA + NB * Math.cos(omega));
  const sy = oy - S * NB * Math.sin(omega);

  const gleichOben = nsum > oben - 0.01;
  const gleichUnten = nsum < unten + 0.01;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir den Winkel und verfolgen die grüne Luftlinie zwischen beiden Schranken.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={`Dreieck aus a und b; die Länge der Summe ist ${fmtDe(nsum)} und liegt zwischen ${fmtDe(unten)} und ${fmtDe(oben)}.`}
      >
        {/* Vergleichsbalken: Sandwich |‖a‖−‖b‖| ≤ ‖a+b‖ ≤ ‖a‖+‖b‖ */}
        <text x={8} y={20} fill="var(--w-text)" fontSize={11}>
          |‖a‖−‖b‖| = {fmtDe(unten)}
        </text>
        <rect x={BALKEN_X} y={12} width={(BALKEN_W * unten) / oben} height={9} fill="var(--w-muted)" />
        <text x={8} y={38} fill={FMM_COLORS.gruen} fontSize={11}>
          ‖a+b‖ = {fmtDe(nsum)}
        </text>
        <rect x={BALKEN_X} y={30} width={(BALKEN_W * nsum) / oben} height={9} fill={FMM_COLORS.gruen} />
        <text x={8} y={56} fill="var(--w-text)" fontSize={11}>
          ‖a‖+‖b‖ = {fmtDe(oben)}
        </text>
        <rect x={BALKEN_X} y={48} width={BALKEN_W} height={9} fill="var(--w-muted)" />
        {/* Dreieck: a vom Ursprung, b ab der Spitze von a, a+b als Luftlinie */}
        <line x1={ox} y1={oy} x2={ax} y2={oy} stroke={FMM_COLORS.blau} strokeWidth={2.5} />
        <line x1={ax} y1={oy} x2={sx} y2={sy} stroke={FMM_COLORS.rot} strokeWidth={2.5} />
        <line x1={ox} y1={oy} x2={sx} y2={sy} stroke={FMM_COLORS.gruen} strokeWidth={2.5} />
        <text x={ox + (S * NA) / 2 - 4} y={oy + 14} fill={FMM_COLORS.blau} fontSize={13}>
          a
        </text>
        <text x={(ax + sx) / 2 + 7} y={(oy + sy) / 2 + 4} fill={FMM_COLORS.rot} fontSize={13}>
          b
        </text>
        <text x={(ox + sx) / 2 - 20} y={(oy + sy) / 2 - 4} fill={FMM_COLORS.gruen} fontSize={13}>
          a+b
        </text>
      </svg>
      <Slider
        label="Winkel ω zwischen a und b"
        value={omega}
        onChange={setOmega}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(t) => `${((t * 180) / Math.PI).toFixed(0)}°`}
        accent={FMM_COLORS.gruen}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> a ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> b ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> a + b
      </p>
      <Verdikt kind={gleichOben || gleichUnten ? "warn" : "ok"}>
        {gleichOben ? (
          <>
            Gleichheit oben: a und b zeigen in dieselbe Richtung, das Dreieck ist zur Strecke
            zusammengefallen und ‖a+b‖ = {fmtDe(nsum)} = ‖a‖ + ‖b‖. Nur in diesem Fall ist der
            Umweg über die Spitze von a kein Umweg.
          </>
        ) : gleichUnten ? (
          <>
            Gleichheit unten: a und b zeigen genau gegeneinander, und ‖a+b‖ = {fmtDe(nsum)} ={" "}
            |‖a‖ − ‖b‖|. Der kürzere Vektor hebt vom längeren gerade seine eigene Länge weg – kürzer
            wird die Summe nie.
          </>
        ) : (
          <>
            Für diesen Winkel gilt {fmtDe(unten)} &lt; {fmtDe(nsum)} &lt; {fmtDe(oben)}: die grüne
            Strecke liegt echt zwischen den Schranken, das Dreieck ist nicht entartet. Beide
            Schranken werden aber angenommen – ganz am Rand des Reglers.
          </>
        )}
      </Verdikt>
    </div>
  );
}
