/**
 * Konzept-Widget `unbiased-estimator`.
 *
 * DIE EINE EINSICHT: Erwartungstreue ist eine Aussage über den Mittelpunkt
 * vieler Wiederholungen, nicht über die Streuung einer einzelnen. Die linke
 * Scheibe streut stark und trifft im Mittel; die rechte streut wenig und liegt
 * im Mittel daneben.
 *
 * FARBROLLEN: blau = der wahre Wert θ (Zentrum); rot = die einzelnen
 * Schätzungen; grün = ihr Mittelwert, also die Größe, über die Erwartungstreue
 * überhaupt etwas sagt.
 *
 * PROVENIENZ: die beiden festen Punktwolken aus der Vorfassung (Stand
 * 2026-08-19, bewusst fest statt zufällig, damit das Bild stabil bleibt); die
 * Mittelwertkreuze, die Themenfarben und das Verdikt sind neu. Der erklärende
 * Absatz steht jetzt in unbiased-estimator.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20),
 * beide in Bildpunkten relativ zum Zentrum gerechnet: linke Wolke Mittel
 * (0,3 | 1,0), Abstand zum Ziel 1,04 px, Streuung um das eigene Mittel 18,4 px;
 * rechte Wolke Mittel (16,5 | −12,5), Abstand 20,7 px, Streuung 4,0 px. Die
 * linke Wolke streut also mehr als das Vierfache und liegt trotzdem zwanzigmal
 * näher am Ziel. Ringe bei r = 21, 38, 55 px.
 */
import { Aufgabe, FMM_COLORS, Verdikt, W_MUTED } from "../../lib";

// feste "zufällige" Streuung (deterministisch, damit das Bild stabil bleibt)
const UNBIASED: [number, number][] = [
  [-18, 6],
  [11, -15],
  [4, 19],
  [-9, -11],
  [22, 3],
  [-3, -22],
  [15, 12],
  [-20, -4],
  [7, 8],
  [-6, 14],
];
const BIASED: [number, number][] = [
  [14, -12],
  [19, -8],
  [12, -17],
  [17, -14],
  [21, -11],
  [15, -9],
  [18, -16],
  [13, -11],
  [20, -14],
  [16, -13],
];

const mittel = (pts: [number, number][]): [number, number] => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
];

const S = 130;

function Scheibe({
  pts,
  title,
  ariaLabel,
}: {
  pts: [number, number][];
  title: string;
  ariaLabel: string;
}) {
  const c = S / 2;
  const [mx, my] = mittel(pts);
  return (
    <div className="flex w-40 max-w-full flex-col items-center">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="h-auto w-full rounded"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x={0.5}
          y={0.5}
          width={S - 1}
          height={S - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {[55, 38, 21].map((r) => (
          <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="var(--w-grid-strong)" strokeWidth={1} />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={c + x} cy={c + y} r={2.8} fill={FMM_COLORS.rot} opacity={0.9} />
        ))}
        {/* theta als Ring, damit das Mittelwertkreuz darin sichtbar bleibt,
            wenn beide (wie links) zusammenfallen */}
        <circle cx={c} cy={c} r={6} fill="none" stroke={FMM_COLORS.blau} strokeWidth={2.5} />
        {/* Mittelwertkreuz: die Größe, über die Erwartungstreue spricht */}
        <g stroke={FMM_COLORS.gruen} strokeWidth={2}>
          <line x1={c + mx - 8} y1={c + my} x2={c + mx + 8} y2={c + my} />
          <line x1={c + mx} y1={c + my - 8} x2={c + mx} y2={c + my + 8} />
        </g>
      </svg>
      <span className={`mt-1 text-center text-xs ${W_MUTED}`}>{title}</span>
    </div>
  );
}

export function DartboardWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Vergleichen wir, wo die grünen Mittelwertkreuze der beiden Wolken sitzen.</Aufgabe>
      <div className="flex flex-wrap justify-center gap-4">
        <Scheibe
          pts={UNBIASED}
          title="erwartungstreu: gestreut, aber zentriert"
          ariaLabel="Zielscheibe mit weit gestreuten Schätzungen, deren Mittelwert im Zentrum liegt."
        />
        <Scheibe
          pts={BIASED}
          title="verzerrt: eng beisammen, aber daneben"
          ariaLabel="Zielscheibe mit eng beieinanderliegenden Schätzungen, deren Mittelwert deutlich neben dem Zentrum liegt."
        />
      </div>
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> wahrer Wert θ ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> einzelne Schätzungen ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> ihr Mittelwert
      </p>
      <Verdikt>
        Links liegt das grüne Kreuz praktisch auf θ, obwohl die einzelnen Punkte weit streuen;
        rechts liegt es klar daneben, obwohl die Punkte dicht beisammen sind. Erwartungstreue
        misst allein den Abstand des Kreuzes vom Zentrum – über die Streuung sagt sie nichts.
      </Verdikt>
    </div>
  );
}
