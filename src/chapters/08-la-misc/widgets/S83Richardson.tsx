import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, Schaetzfrage, Slider, Stepper, Verdikt, fmtDe, niceTicks } from "../../../lib";
import type { Series } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §8.3: Richardson-Iteration am Folienbeispiel
 * A = (4 1; 1 3), b = (1, 2), Startwert x^(0) = 0.
 *
 * Links der Weg der Iterierten in der Ebene (blau) zur wahren Lösung (grün),
 * mit dem anstehenden Korrekturschritt gamma*r^(k) als rotem Pfeil; rechts die
 * Fehlerkurve auf log10-Skala gegen die Vorhersage rho^k (orange, als
 * Serien-FUNKTION, damit sie auch bei Divergenz eine Gerade bleibt).
 *
 * Einsicht: Die Richardson-Iteration kippt genau dann, wenn die Rate rho über 1 steigt.
 * Farbrollen: Iterierte blau, Lösung grün, Residuum/Fehler rot, Rate orange.
 * Provenienz: Eigenbau; keine portierte Prosa.
 * PRÜFSTATUS: scripts/verify/REV29/08-la-misc-S83Richardson.mjs (2026-08-29),
 * Teil von `npm run verify:numbers`. Das Skript bestimmt λ_max und λ_min durch
 * Potenziteration auf A bzw. auf 5·I − A (also ohne das charakteristische
 * Polynom, das hier hartkodiert ist) und assertiert γ* = 2/λ_max = 0,4330847,
 * ρ(0,25) = 0,4045 sowie die Erreichbarkeit des Grenzzweigs auf dem
 * 0,001er-Reglerraster.
 */

const { gruen: GREEN, blau: BLUE, rot: RED, orange: ORANGE } = FMM_COLORS;

const A: [[number, number], [number, number]] = [
  [4, 1],
  [1, 3],
];
const RHS: [number, number] = [1, 2];
const XSTAR: [number, number] = [1 / 11, 7 / 11];
const LMAX = (7 + Math.sqrt(5)) / 2; // ≈ 4,618
const LMIN = (7 - Math.sqrt(5)) / 2; // ≈ 2,382
const KMAX = 12;
/** Kippgrenze: für γ > 2/λ_max ist ρ > 1. Lösung der Schätzfrage. */
const GAMMA_STERN = 2 / LMAX;

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
const fmt = fmtDe;

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
    <div className="min-w-0 shrink select-none text-[10px] text-slate-500 dark:text-slate-400">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        x₂ ↑
      </div>
      <svg
        width={PAD_L + SIZE + 6}
        height={SIZE + PAD_B}
        viewBox={`0 0 ${PAD_L + SIZE + 6} ${SIZE + PAD_B}`}
        className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        role="img"
        aria-label={`Der Weg der Iterierten in der x₁-x₂-Ebene; ${punkte.length} Punkte, der letzte bei (${fmt(punkte[punkte.length - 1][0], 3)}; ${fmt(punkte[punkte.length - 1][1], 3)}), die Lösung liegt bei (0,091; 0,636).`}
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
              stroke="var(--w-grid-strong)"
              strokeWidth={t === 0 ? 1.4 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="var(--w-muted)" fontSize={10}>
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
              stroke="var(--w-grid-strong)"
              strokeWidth={t === 0 ? 1.4 : 0.6}
            />
            <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="var(--w-muted)" fontSize={10}>
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

export function RichardsonStepper({
  gamma: gammaExtern,
  setGamma: setGammaExtern,
  zeigeGrenze = false,
}: {
  /** von außen geführte Schrittweite (die Schätzfrage setzt sie beim Auflösen) */
  gamma?: number;
  setGamma?: (v: number) => void;
  /** nach dem Auflösen: Grenze γ* am Regler und ρ = 1 im Fehlerplot markieren */
  zeigeGrenze?: boolean;
} = {}) {
  const [gammaLokal, setGammaLokal] = useState(0.25);
  const gamma = gammaExtern ?? gammaLokal;
  const setGamma = setGammaExtern ?? setGammaLokal;
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
    // Nach dem Auflösen: die Höhe, auf der der Fehler bei ρ = 1 stehen bliebe.
    if (zeigeGrenze) series.push({ f: () => Math.log10(e0), color: GREEN, dash: [3, 3] });
    return { series, markers, yDomain: [lo, hi] as [number, number] };
  }, [schritte, rho, k, zeigeGrenze]);

  return (
    <div className="space-y-3">
      <Aufgabe>Wählen wir eine Schrittweite, schätzen die Kippgrenze und verfolgen dann die Fehlerkurve.</Aufgabe>
      <Slider
        label="γ (Schrittweite)"
        value={gamma}
        onChange={(v) => setGamma(Math.round(v * 1000) / 1000)}
        min={0.05}
        max={0.55}
        step={0.001}
        fmt={(v) => fmt(v, 3)}
      />
      {zeigeGrenze && (
        <p className="text-xs" style={{ color: ORANGE }}>
          Kippgrenze γ* = 2/λ<sub>max</sub> = {fmt(GAMMA_STERN, 4)}: Links davon fällt der
          Fehler, rechts davon wächst er. Die grün gestrichelte Waagerechte im Fehlerplot ist
          die Höhe, auf der er bei ρ = 1 stehen bliebe.
        </p>
      )}
      <Stepper step={k} setStep={setK} max={KMAX} narration="Ein Schritt wendet die aktuelle Residuumskorrektur an." />
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
          ariaLabel={`Fehler der Iterierten auf logarithmischer Skala über der Schrittzahl, mit der Theoriegeraden zur Rate ${fmt(rho, 3)}.`}
        />
      </div>
      <div className="max-w-prose space-y-1 text-sm">
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
        <Verdikt kind={rho < 0.999 ? "ok" : rho <= 1.001 ? "warn" : "fail"}>
          {rho < 0.999
            ? `ρ < 1: ${ref("satz:konvergenz-der-korrekturiteration")} greift, und der Fehler fällt auf Dauer je Schritt auf etwa das ${fmt(rho, 2)}-fache.`
            : rho <= 1.001
              ? "ρ ≈ 1: der Grenzfall. Die Schranke des Satzes verspricht nichts mehr, die Iterierten kommen kaum noch voran."
              : `ρ > 1: die Voraussetzung von ${ref("satz:konvergenz-der-korrekturiteration")} ist verletzt, und hier läuft die Iteration tatsächlich davon (auf Dauer das ${fmt(rho, 2)}-fache je Schritt).`}
        </Verdikt>
      </div>
    </div>
  );
}

/**
 * Der Kasten in §8.3: erst die Kippgrenze schätzen, dann auflösen. Beim Auflösen
 * springt der Regler auf γ* und der Plot bekommt die ρ-1-Marke – ohne das
 * passierte beim Klick auf „Auflösen" im Widget nichts (Review 2026-08-29).
 */
export function RichardsonSchaetzfrage() {
  const [gamma, setGamma] = useState(0.25);
  const [aufgeloest, setAufgeloest] = useState(false);
  return (
    <Schaetzfrage
      frage="Ab welchem γ beginnt diese Richardson-Iteration zu divergieren?"
      loesung={GAMMA_STERN}
      toleranz={0.02}
      einheit="γ"
      min={0.05}
      max={0.55}
      schritt={0.005}
      onAufloesen={() => {
        setGamma(GAMMA_STERN);
        setAufgeloest(true);
      }}
      verdeckt={
        <Verdikt kind="neutral" titel="Auflösung:">
          Die Grenze ist γ* = 2/λ<sub>max</sub> = {fmt(GAMMA_STERN, 4)}: Genau dort ist
          ρ = |1 − γ λ<sub>max</sub>| = 1. Der Regler steht jetzt darauf, und die grün
          gestrichelte Waagerechte im Fehlerplot zeigt, wo der Fehler dann hängen bliebe.
          Ein Tausendstel weiter nach rechts, und die Iterierten laufen davon.
        </Verdikt>
      }
    >
      <RichardsonStepper gamma={gamma} setGamma={setGamma} zeigeGrenze={aufgeloest} />
    </Schaetzfrage>
  );
}
