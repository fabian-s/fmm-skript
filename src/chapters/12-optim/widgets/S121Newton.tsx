import { useMemo, useState } from "react";
import {
  Aufgabe,
  clamp,
  DragHandle,
  FMM_COLORS,
  fmtDe,
  fmtTick,
  niceTicks,
  Slider,
  Stepper,
  useDrag,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";

/**
 * §12.1 — DIE EINE EINSICHT: Newton verdoppelt in der Nähe einer einfachen
 * Nullstelle die Zahl der richtigen Stellen pro Schritt. Weit weg davon ist er
 * dagegen keine Garantie, sondern ein Glücksspiel: Wo die Tangente flach liegt,
 * springt der Schritt beliebig weit, und bei einer zu flachen Funktion läuft
 * die Folge auseinander, obwohl es nur eine Nullstelle gibt.
 *
 * Eigenbau zu Algorithmus 12.1.11 und Bemerkung 12.1.13; die Bauform (Kurve,
 * Tangente, Lot auf die Achse, Schritttabelle) folgt dem Muster von
 * S131Bisektion und S134Newton in diesem Kapitel. Kein portierter Code, kein
 * Math.random.
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte blau, Nullstelle grün, die
 * Tangente als Suchrichtung orange, Divergenzwarnung rot; der Graph von f
 * trägt das im Kapitel freie Violett (wie in S131Bisektion und S133GdStepper).
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19):
 *  - f(x) = x² − 2 ab x⁽⁰⁾ = 1: 1 → 1,5 → 1,4166666667 → 1,4142156863 →
 *    1,4142135624 mit den Fehlern 4,142·10⁻¹ / 8,579·10⁻² / 2,453·10⁻³ /
 *    2,124·10⁻⁶ / 1,595·10⁻¹². Der Quotient e_{k+1}/e_k² läuft gegen
 *    f″/(2f′) = 0,353553 (gemessen 0,352941 / 0,353522).
 *    Ab x⁽⁰⁾ = 0,5 springt der erste Schritt auf 2,25, danach dieselbe
 *    quadratische Endphase.
 *  - f(x) = x³ − 3x + 1 (Nullstellen −1,879385 / 0,347296 / 1,532089):
 *    ab −2 in 5 Schritten zur linken, ab 0 in 5 Schritten zur mittleren, ab 2
 *    in 7 Schritten zur rechten. Bei x⁽⁰⁾ = 1,05 ist f′ = 0,3075, der erste
 *    Schritt springt nach 4,277236, und der Lauf braucht 10 Schritte.
 *  - f(x) = arctan x hat genau die Nullstelle 0. Newton konvergiert nur für
 *    |x⁽⁰⁾| < 1,391745200 (bisektiert aus arctan(ξ)(1+ξ²) = 2ξ). Ab
 *    x⁽⁰⁾ = 1,5 läuft die Folge 1,5 → −1,694080 → 2,321127 → −5,114088 →
 *    32,295684 → −1575,32 auseinander; ab 1,39 dagegen kehrt sie nach
 *    anfänglichem Pendeln um und konvergiert.
 *  - Alle Reglerzustände (Raster 0,05) durch die Verdikt-Zweige gespielt
 *    (s131newton-zweige.mjs): x² − 2 (65 Startwerte) 59 „unterwegs" / 6
 *    „flache Tangente"; x³ − 3x + 1 (107) 97 / 8 und 2 mal f′ = 0 (bei ±1);
 *    arctan (241) 186 „divergent" / 54 „unterwegs" / 1 „am Ziel" (x⁽⁰⁾ = 0).
 *    Der Zweig „davongelaufen" feuert nur außerhalb dieses Rasters und ist
 *    reine Absicherung. Der Zweig „flache Tangente" verlangt ausdrücklich
 *    |f′| < 1: Ohne diese Bedingung feuerte er bei x⁽⁰⁾ = 3 auf x² − 2, wo
 *    f′ = 6 ist und die Behauptung „flach" schlicht falsch wäre.
 */

const BLAU = FMM_COLORS.blau; // Iterierte
const GRUEN = FMM_COLORS.gruen; // Nullstellen
const ORANGE = FMM_COLORS.orange; // Tangente = Suchrichtung
const ROT = FMM_COLORS.rot; // Divergenzwarnung
const VIOLETT = FMM_COLORS.violett; // Graph von f
const ACHSE = "#64748b";

const HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** Zehnerpotenz mit echten Hochzahlen. */
function potenz(exp: number): string {
  const ziffern = String(Math.abs(exp))
    .split("")
    .map((z) => HOCH[Number(z)])
    .join("");
  return `10${exp < 0 ? "⁻" : ""}${ziffern}`;
}

const fmt = (v: number, d = 6): string => {
  if (Number.isFinite(v) && Math.abs(v) >= 1e5) {
    const [m, e] = v.toExponential(2).split("e");
    return `${m.replace(".", ",").replace(/^-/, "−")}·${potenz(Number(e))}`;
  }
  return fmtDe(v, d);
};

/** Kleine Zahlen in Zehnerpotenzschreibweise, mittlere gewöhnlich. */
const fmtE = (v: number): string => {
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  if (Math.abs(v) >= 1e-3 && Math.abs(v) < 1e5) return fmtDe(v, 4);
  const [m, e] = v.toExponential(3).split("e");
  return `${m.replace(".", ",").replace(/^-/, "−")}·${potenz(Number(e))}`;
};

interface Beispiel {
  id: string;
  label: string;
  formel: string;
  f: (x: number) => number;
  df: (x: number) => number;
  xd: [number, number];
  yd: [number, number];
  start: number;
  /** alle Nullstellen im Fenster, vorgerechnet */
  nullstellen: number[];
  /** Stellen mit f' = 0 im Fenster (dort ist der Schritt nicht ausführbar) */
  flach: number[];
}

const BEISPIELE: Beispiel[] = [
  {
    id: "wurzel",
    label: "x² − 2",
    formel: "f(x) = x² − 2, f′(x) = 2x",
    f: (x) => x * x - 2,
    df: (x) => 2 * x,
    xd: [0.2, 3.4],
    yd: [-2.4, 9.8],
    start: 3,
    nullstellen: [Math.SQRT2],
    flach: [],
  },
  {
    id: "kubisch",
    label: "x³ − 3x + 1",
    formel: "f(x) = x³ − 3x + 1, f′(x) = 3x² − 3",
    f: (x) => x ** 3 - 3 * x + 1,
    df: (x) => 3 * x * x - 3,
    xd: [-2.4, 2.9],
    yd: [-4.5, 6.5],
    start: 1.05,
    nullstellen: [-1.879385241572, 0.347296355334, 1.532088886238],
    flach: [-1, 1],
  },
  {
    id: "arctan",
    label: "arctan x",
    formel: "f(x) = arctan x, f′(x) = 1/(1 + x²)",
    f: Math.atan,
    df: (x) => 1 / (1 + x * x),
    xd: [-6, 6],
    yd: [-1.8, 1.8],
    start: 1.5,
    nullstellen: [0],
    flach: [],
  },
];

/** Schwelle, ab der Newton auf arctan auseinanderläuft (bisektiert). */
const ARCTAN_SCHWELLE = 1.3917452;

const W = 440;
const H = 270;
const PAD_L = 42;
const PAD_R = 12;
const PAD_T = 10;
const PAD_B = 26;
const K_MAX = 8;

export function NewtonNullstelle() {
  const [id, setId] = useState("wurzel");
  const b = BEISPIELE.find((e) => e.id === id) ?? BEISPIELE[0];
  const [x0, setX0] = useState(b.start);
  const [k, setK] = useState(0);

  const px = (x: number) => PAD_L + ((x - b.xd[0]) / (b.xd[1] - b.xd[0])) * (W - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + ((b.yd[1] - y) / (b.yd[1] - b.yd[0])) * (H - PAD_T - PAD_B);
  const imX = (x: number) => x >= b.xd[0] && x <= b.xd[1];
  const cx = (x: number) => clamp(x, b.xd[0], b.xd[1]);
  const cy = (y: number) => clamp(y, b.yd[0], b.yd[1]);

  // Die Bahn wird deterministisch aus (Beispiel, x0, k) gerechnet — der
  // Schrittregler ist deshalb scrubbar und rückwärts begehbar.
  const bahn = useMemo(() => {
    const xs = [x0];
    for (let i = 0; i < K_MAX; i++) {
      const x = xs[xs.length - 1];
      const d = b.df(x);
      if (!Number.isFinite(d) || Math.abs(d) < 1e-13) break;
      const nx = x - b.f(x) / d;
      if (!Number.isFinite(nx) || Math.abs(nx) > 1e12) {
        xs.push(nx);
        break;
      }
      xs.push(nx);
    }
    return xs;
  }, [b, x0]);

  const kk = Math.min(k, bahn.length - 1);
  const x = bahn[kk];
  const fx = b.f(x);
  const dfx = b.df(x);
  const naechste = Math.abs(dfx) > 1e-13 ? x - fx / dfx : NaN;

  // Der Startpunkt wird auf der x-Achse gezogen; y ist ohne Bedeutung.
  const zieh = useDrag<"x0">({
    feld: { x0: PAD_L, y0: PAD_T, w: W - PAD_L - PAD_R, h: H - PAD_T - PAD_B },
    welt: { x0: b.xd[0], x1: b.xd[1], y0: b.yd[0], y1: b.yd[1] },
    clamp: ([a]) => [clamp(a, b.xd[0], b.xd[1]), 0],
    snap: [0.05, 0],
    greifPosition: () => [x0, 0],
    onDrag: ([a]) => {
      setX0(Math.round(a * 20) / 20);
      setK(0);
    },
  });

  const kurve = useMemo(() => {
    let d = "";
    let stift = false;
    for (let i = 0; i <= 400; i++) {
      const xx = b.xd[0] + ((b.xd[1] - b.xd[0]) * i) / 400;
      const yy = b.f(xx);
      if (!Number.isFinite(yy) || yy < b.yd[0] || yy > b.yd[1]) {
        stift = false;
        continue;
      }
      d += `${stift ? "L" : "M"}${px(xx).toFixed(1)} ${py(yy).toFixed(1)}`;
      stift = true;
    }
    return d;
  }, [b]);

  const xTicks = niceTicks(b.xd[0], b.xd[1]);
  const yTicks = niceTicks(b.yd[0], b.yd[1]);
  const xStep = xTicks.length > 1 ? xTicks[1] - xTicks[0] : 1;
  const yStep = yTicks.length > 1 ? yTicks[1] - yTicks[0] : 1;

  const ziel = bahn[bahn.length - 1];
  const naeheste = b.nullstellen.reduce(
    (best, r) => (Math.abs(r - ziel) < Math.abs(best - ziel) ? r : best),
    b.nullstellen[0],
  );
  const fehler = bahn.map((v) => Math.abs(v - naeheste));
  const divergiert = !Number.isFinite(ziel) || Math.abs(ziel - naeheste) > 1;
  const sprung = Math.abs(naechste - x);

  /* ------------------------------------------------ Verdikt: fünf Zweige */

  let art: "neutral" | "ok" | "warn" | "fail";
  let titel: string;
  let text: string;
  if (Math.abs(dfx) < 1e-13) {
    art = "fail";
    titel = "die Tangente ist waagerecht";
    text = `An dieser Stelle ist f′ = 0, die Tangente schneidet die x-Achse also nirgends, und Algorithmus 12.1.11 lässt sich nicht ausführen. Genau diese Voraussetzung steht dort in der Bedingung „solange f′(x⁽ᵏ⁾) ≠ 0".`;
  } else if (b.id === "arctan" && Math.abs(x0) > ARCTAN_SCHWELLE) {
    art = "fail";
    titel = "die Folge läuft auseinander";
    text = `Bei arctan flacht die Kurve nach außen ab, die Tangente wird also immer flacher und ihr Schnittpunkt mit der Achse immer weiter entfernt. Ab |x⁽⁰⁾| > ${fmt(ARCTAN_SCHWELLE, 4)} überholt jeder Schritt den vorigen: Aus ${fmt(x0, 2)} wird ${fmt(bahn[1] ?? NaN, 4)}, dann ${fmt(bahn[2] ?? NaN, 4)}, und die Beträge wachsen. Es gibt hier nur EINE Nullstelle, und trotzdem findet Newton sie nicht, genau die Warnung von Bemerkung 12.1.13: Die quadratische Konvergenz ist eine LOKALE Aussage.`;
    // „Flach" heißt hier wirklich flach: ein weiter Sprung allein genügt nicht,
    // sonst behauptet der Zweig bei x^(0) = 3 auf x² − 2 eine kleine Ableitung,
    // obwohl f' = 6 ist.
  } else if (kk === 0 && sprung > 0.35 * (b.xd[1] - b.xd[0]) && Math.abs(dfx) < 1) {
    art = "warn";
    titel = "ein sehr weiter erster Schritt";
    text = `Am Startpunkt ist f′ = ${fmt(dfx, 4)} und damit betragsmäßig klein: Die Tangente liegt fast waagerecht, und ihr Schnittpunkt mit der Achse rutscht weit weg. Der erste Schritt landet bei ${fmt(naechste, 4)}, also ${fmt(sprung, 3)} vom Start entfernt. Die Iteration erholt sich hier zwar, aber die Richtung, in die sie zuerst springt, hat mit der nächstgelegenen Nullstelle nichts zu tun.`;
  } else if (divergiert) {
    art = "fail";
    titel = "davongelaufen";
    text = `Die Iterierten wachsen über jede Schranke; nach ${bahn.length - 1} Schritten steht die Folge bei ${fmt(ziel, 2)}. Newton hat keine Abstiegsgarantie wie die Bisektion, sondern nur eine lokale Aussage.`;
  } else if (fehler[kk] < 1e-10) {
    art = "ok";
    titel = `am Ziel nach ${kk} Schritten`;
    text = `Die Iteration steht auf der Nullstelle ${fmt(naeheste)}. Die Fehlerspalte zeigt, was Bemerkung 12.1.13 mit quadratischer Konvergenz meint: Der Quotient e_{k+1}/e_k² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Bei f(x) = x² − 2 läuft dieser Quotient gegen f″/(2f′) = 0,3536. Zum Vergleich: Die Bisektion aus Satz 12.1.8 gewinnt pro Schritt ein Bit, also rund 0,3 Dezimalstellen.`;
  } else {
    art = "neutral";
    titel = `Schritt ${kk} von ${bahn.length - 1}`;
    text = `Die Tangente im Punkt (${fmt(x, 4)}; ${fmt(fx, 4)}) hat die Steigung ${fmt(dfx, 4)} und trifft die x-Achse bei ${fmt(naechste, 6)}. Das ist die nächste Iterierte, und der Bruch in (12.1.1) sagt dasselbe in Zahlen: Wir teilen die abzubauende Höhe durch die Rate, mit der die Tangente sie abbaut. Der Abstand zur Nullstelle ${fmt(naeheste)} beträgt gerade ${fmtE(fehler[kk])}.`;
  }

  const knopf = (aktiv: boolean) => (aktiv ? W_BUTTON_AKTIV : W_BUTTON);
  const tabelle = bahn.slice(0, kk + 1).map((v, i) => ({ i, v, fv: b.f(v), e: fehler[i] }));

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den Startpunkt auf der x-Achse und schauen, wohin der erste Schritt springt.
      </Aufgabe>
      <div className="flex flex-wrap gap-2 text-sm">
        {BEISPIELE.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={e.id === id}
            className={knopf(e.id === id)}
            onClick={() => {
              setId(e.id);
              setX0(e.start);
              setK(0);
            }}
          >
            f(x) = {e.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 max-w-full">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            role="img"
            aria-label={`Der Graph von ${b.formel} mit der Tangente im Punkt x⁽${kk}⁾ = ${fmt(x, 3)} und ihrem Schnittpunkt mit der x-Achse.`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
            {...zieh.svgProps}
          >
            <rect
              x={PAD_L}
              y={PAD_T}
              width={W - PAD_L - PAD_R}
              height={H - PAD_T - PAD_B}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth={0.8}
            />
            {xTicks.map((t) => (
              <g key={`x${t}`}>
                <line x1={px(t)} x2={px(t)} y1={H - PAD_B} y2={H - PAD_B + 3} stroke={ACHSE} />
                <text x={px(t)} y={H - PAD_B + 14} textAnchor="middle" fontSize={9} fill={ACHSE}>
                  {fmtTick(t, xStep)}
                </text>
              </g>
            ))}
            {yTicks.map((t) => (
              <g key={`y${t}`}>
                <line x1={PAD_L - 3} x2={PAD_L} y1={py(t)} y2={py(t)} stroke={ACHSE} />
                <text x={PAD_L - 5} y={py(t) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                  {fmtTick(t, yStep)}
                </text>
              </g>
            ))}
            <line x1={PAD_L} x2={W - PAD_R} y1={py(0)} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
            <text x={W - PAD_R - 4} y={py(0) - 5} textAnchor="end" fontSize={10} fill={ACHSE}>
              x
            </text>
            <path d={kurve} fill="none" stroke={VIOLETT} strokeWidth={1.9} />
            {b.nullstellen.filter(imX).map((r) => (
              <circle key={r} cx={px(r)} cy={py(0)} r={4.5} fill="none" stroke={GRUEN} strokeWidth={2} />
            ))}
            {b.flach.filter(imX).map((r) => (
              <line
                key={`fl${r}`}
                x1={px(r)}
                x2={px(r)}
                y1={PAD_T}
                y2={H - PAD_B}
                stroke={ROT}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.6}
              />
            ))}
            {/* Weg der Iterierten auf der x-Achse */}
            {bahn.slice(0, kk + 1).map((v, i) => (
              <circle
                key={`p${i}`}
                cx={px(cx(v))}
                cy={py(0)}
                r={i === kk ? 4.5 : 2.6}
                fill={BLAU}
                opacity={i === kk ? 1 : 0.5}
              />
            ))}
            {Number.isFinite(dfx) && Math.abs(dfx) > 1e-13 && (
              <>
                {/* Tangente, über das ganze Fenster gezeichnet */}
                <line
                  x1={px(b.xd[0])}
                  y1={py(cy(fx + dfx * (b.xd[0] - x)))}
                  x2={px(b.xd[1])}
                  y2={py(cy(fx + dfx * (b.xd[1] - x)))}
                  stroke={ORANGE}
                  strokeWidth={1.6}
                />
                {/* Lot vom Kurvenpunkt auf die Achse */}
                <line
                  x1={px(cx(x))}
                  y1={py(cy(fx))}
                  x2={px(cx(x))}
                  y2={py(0)}
                  stroke={BLAU}
                  strokeWidth={0.9}
                  strokeDasharray="2 3"
                />
                <circle cx={px(cx(x))} cy={py(cy(fx))} r={3.5} fill={BLAU} />
                {imX(naechste) && (
                  <circle cx={px(naechste)} cy={py(0)} r={4} fill="none" stroke={ORANGE} strokeWidth={2} />
                )}
                {!imX(naechste) && (
                  <text
                    x={naechste > b.xd[1] ? W - PAD_R - 4 : PAD_L + 4}
                    y={py(0) - 8}
                    textAnchor={naechste > b.xd[1] ? "end" : "start"}
                    fontSize={10}
                    fill={ROT}
                  >
                    nächste Iterierte außerhalb ({fmt(naechste, 2)})
                  </text>
                )}
              </>
            )}
            <DragHandle
              x={px(cx(x0))}
              y={py(0)}
              farbe={BLAU}
              r={5}
              aktiv={zieh.dragging === "x0"}
              {...zieh.handleProps("x0")}
            />
          </svg>
        </div>
        <div className="min-w-56 grow space-y-2">
          <Slider
            label="Startwert x⁽⁰⁾"
            value={x0}
            onChange={(v) => {
              setX0(Math.round(v * 20) / 20);
              setK(0);
            }}
            min={b.xd[0]}
            max={b.xd[1]}
            step={0.05}
            accent={BLAU}
          />
          <Stepper
            step={kk}
            setStep={setK}
            max={bahn.length - 1}
            narration={`x⁽${kk}⁾ = ${fmt(x, 8)}`}
          />
          <p className="font-mono text-xs">{b.formel}</p>
          <table className="w-full text-right font-mono text-xs">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="pr-2 text-left">k</th>
                <th className="pr-2">x⁽ᵏ⁾</th>
                <th className="pr-2">f(x⁽ᵏ⁾)</th>
                <th>|x⁽ᵏ⁾ − x*|</th>
              </tr>
            </thead>
            <tbody>
              {tabelle.map((z) => (
                <tr key={z.i}>
                  <td className="pr-2 text-left">{z.i}</td>
                  <td className="pr-2">{fmt(z.v, 8)}</td>
                  <td className="pr-2">{fmtE(Math.abs(z.fv))}</td>
                  <td>{fmtE(z.e)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Verdikt kind={art} titel={titel}>
        {text}
      </Verdikt>
    </div>
  );
}
