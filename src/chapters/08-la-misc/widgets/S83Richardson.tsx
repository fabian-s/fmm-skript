import { useMemo, useState } from "react";
import { LabeledPlot, Slider, niceTicks } from "../../../lib";
import type { Series } from "../../../lib";

/**
 * §8.3: Richardson-Iteration am Folienbeispiel
 * A = (4 1; 1 3), b = (1, 2), Startwert x^(0) = 0.
 *
 * Links der Weg der Iterierten in der Ebene (blau) zur wahren Lösung (grün),
 * mit dem anstehenden Korrekturschritt gamma*r^(k) als rotem Pfeil; rechts die
 * Fehlerkurve auf log10-Skala gegen die Vorhersage rho^k (orange, als
 * Serien-FUNKTION, damit sie auch bei Divergenz eine Gerade bleibt).
 *
 * Alle Zahlen sind exakt nachgerechnet: x = (1/11, 7/11),
 * eig(A) = (7 ± sqrt(5))/2, rho(gamma) = max_i |1 - gamma*lambda_i|.
 */

const GREEN = "#009E73"; // wahre Lösung x
const BLUE = "#0072B2"; // Iterierte x^(k)
const RED = "#D55E00"; // Residuum und Fehler
const ORANGE = "#E69F00"; // Konvergenzrate rho

const A: [[number, number], [number, number]] = [
  [4, 1],
  [1, 3],
];
const RHS: [number, number] = [1, 2];
const XSTAR: [number, number] = [1 / 11, 7 / 11];
const LMAX = (7 + Math.sqrt(5)) / 2; // ≈ 4,618
const LMIN = (7 - Math.sqrt(5)) / 2; // ≈ 2,382
const GAMMA_OPT = 2 / (LMIN + LMAX); // = 2/7 ≈ 0,2857
const GAMMA_GRENZ = 2 / LMAX; // ≈ 0,4331
const KMAX = 12;

function residuum(x: [number, number]): [number, number] {
  return [
    RHS[0] - (A[0][0] * x[0] + A[0][1] * x[1]),
    RHS[1] - (A[1][0] * x[0] + A[1][1] * x[1]),
  ];
}

function fehler(x: [number, number]): number {
  return Math.hypot(x[0] - XSTAR[0], x[1] - XSTAR[1]);
}

/** rho = ‖I − gamma·A‖₂; A ist symmetrisch, also der größte Eigenwertbetrag. */
function rhoVon(gamma: number): number {
  return Math.max(Math.abs(1 - gamma * LMAX), Math.abs(1 - gamma * LMIN));
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Iterationsindex hochgestellt, damit x⁽ᵏ⁾ im Text und im Readout gleich aussieht. */
function sup(k: number): string {
  return String(k)
    .split("")
    .map((d) => SUP[Number(d)])
    .join("");
}

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

const PAD_L = 30;
const PAD_B = 16;
const SIZE = 288;

/** Weg der Iterierten in der Ebene, mit eigenen Achsen und Ticks. */
function EbenenPanel({
  punkte,
  naechster,
}: {
  punkte: [number, number][];
  naechster: [number, number] | null;
}) {
  const alle = naechster ? [...punkte, XSTAR, naechster] : [...punkte, XSTAR];
  const xs = alle.map((p) => p[0]);
  const ys = alle.map((p) => p[1]);
  const mx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const my = (Math.min(...ys) + Math.max(...ys)) / 2;
  const roh = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  // Laufen die Iterierten davon, bleibt der Ausschnitt auf der Lösung zentriert,
  // statt dem Schwerpunkt der davonfliegenden Punkte zu folgen.
  const gross = roh * 1.25 > 8;
  const zx = gross ? XSTAR[0] : mx;
  const zy = gross ? XSTAR[1] : my;
  const spanne = Math.min(8, Math.max(1.1, roh * 1.25));
  const x0 = zx - spanne / 2;
  const x1 = zx + spanne / 2;
  const y0 = zy - spanne / 2;
  const y1 = zy + spanne / 2;

  const px = (x: number) => PAD_L + ((x - x0) / (x1 - x0)) * SIZE;
  const py = (y: number) => SIZE - ((y - y0) / (y1 - y0)) * SIZE;
  const sichtbar = (p: [number, number]) =>
    p[0] >= x0 && p[0] <= x1 && p[1] >= y0 && p[1] <= y1;

  const pfad = punkte.map((p) => `${px(p[0])},${py(p[1])}`).join(" ");

  return (
    <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        x₂ ↑
      </div>
      <svg
        width={PAD_L + SIZE + 6}
        height={SIZE + PAD_B}
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <defs>
          <clipPath id="s83-clip">
            <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <marker
            id="s83-pfeil"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 z" fill={RED} />
          </marker>
        </defs>
        {niceTicks(y0, y1).map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + SIZE}
              y1={py(t)}
              y2={py(t)}
              stroke="#cbd5e1"
              strokeWidth={t === 0 ? 1.4 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 ? 0 : 1)}
            </text>
          </g>
        ))}
        {niceTicks(x0, x1).map((t) => (
          <g key={`x${t}`}>
            <line
              y1={0}
              y2={SIZE}
              x1={px(t)}
              x2={px(t)}
              stroke="#cbd5e1"
              strokeWidth={t === 0 ? 1.4 : 0.6}
            />
            <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="#64748b" fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 ? 0 : 1)}
            </text>
          </g>
        ))}
        <g clipPath="url(#s83-clip)">
          {punkte.length > 1 && (
            <polyline points={pfad} fill="none" stroke={BLUE} strokeWidth={1.5} opacity={0.75} />
          )}
          {naechster && sichtbar(punkte[punkte.length - 1]) && (
            <line
              x1={px(punkte[punkte.length - 1][0])}
              y1={py(punkte[punkte.length - 1][1])}
              x2={px(naechster[0])}
              y2={py(naechster[1])}
              stroke={RED}
              strokeWidth={2}
              markerEnd="url(#s83-pfeil)"
            />
          )}
          <circle cx={px(XSTAR[0])} cy={py(XSTAR[1])} r={6} fill="none" stroke={GREEN} strokeWidth={2} />
          <circle cx={px(XSTAR[0])} cy={py(XSTAR[1])} r={2.5} fill={GREEN} />
          {punkte.map((p, i) =>
            sichtbar(p) ? (
              <circle
                key={i}
                cx={px(p[0])}
                cy={py(p[1])}
                r={i === punkte.length - 1 ? 4.5 : 2.5}
                fill={BLUE}
                opacity={i === punkte.length - 1 ? 1 : 0.55}
              />
            ) : null
          )}
          <text x={px(XSTAR[0]) + 9} y={py(XSTAR[1]) - 7} fill={GREEN} fontSize={11}>
            x
          </text>
        </g>
      </svg>
      <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
        x₁ →
      </div>
    </div>
  );
}

export function RichardsonStepper() {
  const [gamma, setGamma] = useState(0.25);
  const [k, setK] = useState(1);

  const { schritte, rho } = useMemo(() => {
    const schritte: { x: [number, number]; r: [number, number]; err: number }[] = [];
    let x: [number, number] = [0, 0];
    for (let i = 0; i <= KMAX; i++) {
      const r = residuum(x);
      schritte.push({ x, r, err: fehler(x) });
      x = [x[0] + gamma * r[0], x[1] + gamma * r[1]];
    }
    return { schritte, rho: rhoVon(gamma) };
  }, [gamma]);

  const jetzt = schritte[k];
  const vorher = k > 0 ? schritte[k - 1] : null;
  const quotient = vorher ? jetzt.err / vorher.err : NaN;

  const { series, markers, yDomain } = useMemo(() => {
    const e0 = schritte[0].err;
    const lg = (v: number) => (v > 0 ? Math.log10(v) : NaN);
    const vorhersage = (x: number) => {
      const y = Math.log10(e0) + x * Math.log10(rho);
      return Number.isFinite(y) ? y : NaN;
    };
    const werte = schritte.map((s) => lg(s.err)).filter((v) => Number.isFinite(v));
    const grenzen = [...werte, vorhersage(0), vorhersage(KMAX)].filter((v) => Number.isFinite(v));
    const lo = Math.min(...grenzen) - 0.4;
    const hi = Math.max(...grenzen) + 0.4;
    const markers = schritte
      .slice(0, k + 1)
      .map((s, i) => ({ x: i, y: lg(s.err), color: RED }))
      .filter((m) => Number.isFinite(m.y));
    const series: Series[] = [{ f: vorhersage, color: ORANGE, dash: [7, 4] }];
    return { series, markers, yDomain: [lo, hi] as [number, number] };
  }, [schritte, rho, k]);

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Links wandern die Iterierten <span style={{ color: BLUE }}>x⁽ᵏ⁾</span> durch die
        Ebene, der grüne Kreis markiert die wahre Lösung x = (1/11, 7/11). Der rote Pfeil
        ist der Korrekturschritt γ·r⁽ᵏ⁾, der beim nächsten Klick ausgeführt wird: Er zeigt
        in Richtung des Residuums. Rechts steht der Fehler auf logarithmischer Skala, dazu
        als orange Gerade die Vorhersage ρᵏ aus Satz 8.3.5. Auf dieser Skala ist die
        Vorhersage eine Gerade, und ihre Steigung ist log₁₀ ρ. Läuft die Iteration davon,
        bleibt der linke Ausschnitt auf die Lösung zentriert, und die Iterierten verlassen
        ihn nach und nach.
      </p>
      <Slider
        label="γ (Schrittweite)"
        value={gamma}
        onChange={(v) => setGamma(Math.round(v * 200) / 200)}
        min={0.05}
        max={0.55}
        step={0.005}
        fmt={(v) => fmt(v, 3)}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK((v) => Math.max(0, v - 1))}
          disabled={k === 0}
        >
          ← Schritt zurück
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK((v) => Math.min(KMAX, v + 1))}
          disabled={k === KMAX}
        >
          Schritt vorwärts →
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => setK(0)}
        >
          zurücksetzen
        </button>
        <span className="font-mono">k = {k}</span>
      </div>
      <div className="flex flex-wrap gap-4">
        <EbenenPanel
          punkte={schritte.slice(0, k + 1).map((s) => s.x)}
          naechster={k < KMAX ? schritte[k + 1].x : null}
        />
        <LabeledPlot
          xLabel="k"
          yLabel="log₁₀ ‖x⁽ᵏ⁾ − x‖"
          series={series}
          markers={markers}
          xDomain={[0, KMAX]}
          yDomain={yDomain}
          width={300}
          height={288}
        />
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          <span className="font-mono">
            x⁽{sup(k)}⁾ = ({fmt(jetzt.x[0], 4)}; {fmt(jetzt.x[1], 4)})
          </span>
          , Residuum{" "}
          <span className="font-mono" style={{ color: RED }}>
            r⁽{sup(k)}⁾ = ({fmt(jetzt.r[0], 4)}; {fmt(jetzt.r[1], 4)})
          </span>
        </p>
        <p>
          Fehler{" "}
          <span className="font-mono" style={{ color: RED }}>
            ‖x⁽{sup(k)}⁾ − x‖ = {fmt(jetzt.err, 4)}
          </span>
          , Verhältnis zum Vorschritt{" "}
          <span className="font-mono">{fmt(quotient, 3)}</span>, Vorhersage{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            ρ = {fmt(rho, 3)}
          </span>
        </p>
        <p>
          {rho < 0.999
            ? `ρ < 1: Satz 8.3.5 greift, und der Fehler schrumpft auf Dauer je Schritt um etwa den Faktor ${fmt(rho, 2)}.`
            : rho <= 1.001
              ? "ρ ≈ 1: der Grenzfall. Die Schranke des Satzes verspricht nichts mehr, die Iterierten kommen kaum noch voran."
              : `ρ > 1: die Voraussetzung von Satz 8.3.5 ist verletzt, und hier läuft die Iteration tatsächlich davon (Faktor ${fmt(rho, 2)} je Schritt).`}
        </p>
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        Drei Einstellungen lohnen sich: γ = 0,25 ist die Wahl aus Beispiel 8.3.11 mit
        ρ ≈ 0,405. Um γ ≈ 0,285 herum wird ρ am kleinsten, denn dort liegen
        1 − γλ<sub>min</sub> und 1 − γλ<sub>max</sub> betragsgleich um die Null verteilt;
        das Optimum ist γ = 2/7 ≈ {fmt(GAMMA_OPT, 3)} mit ρ = √5/7 ≈ 0,319. Ab
        γ = {fmt(GAMMA_GRENZ, 3)} = 2/λ<sub>max</sub> kippt ρ über 1, und aus der Korrektur
        wird eine Übersteuerung: Die Iterierten springen mit wachsender
        Amplitude um die Lösung herum.
      </p>
    </div>
  );
}
