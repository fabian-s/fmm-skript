import { useMemo, useState } from "react";

/**
 * §13.3: Nelder-Mead-Simplexverfahren als Stepper.
 *
 * Widget-CODE (Simplex-Logik nmF/nmStep, Hintergrund-Bänderung, Historie der
 * letzten Simplizes, Stepper-Knöpfe) portiert aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx (NelderMeadWidget).
 * SÄMTLICHE Texte, Beschriftungen, Statuszweige und Farben sind neu und
 * gehören zu diesem Skript.
 *
 * Farbrollen nach dem Kapitel-13-Code: der Simplex und seine Ecken sind
 * Iterierte, also blau; das gesuchte Minimum ist grün; der Reflexionsstrahl
 * vom schlechtesten Punkt durch den Schwerpunkt ist die Suchrichtung dieses
 * Verfahrens, also orange. Rot warnt, wenn der Simplex nur noch schrumpft.
 *
 * Nachgerechnet (node, check-math-s133.mjs, rev133nm.mjs) für
 * f(x) = (1 − x₁)² + 5(x₂ − x₁²)²:
 *  - Startsimplex „Tal von oben“ (Voreinstellung): alle Ecken bleiben in
 *    x₁ ∈ [−1,50; 1,02] und x₂ ∈ [−0,38; 2,50], das Fenster [−2, 2] × [−1, 3]
 *    schneidet also nichts ab; nach 40 Schritten stehen 13 Reflexionen,
 *    4 Expansionen, 23 Kontraktionen und KEIN Schrumpfschritt, und genau bei
 *    Schritt 40 unterschreitet der beste Funktionswert erstmals 10⁻⁶
 *    (nach 80 Schritten: 20 / 4 / 56 / 0).
 *  - Startsimplex „flach von links“: Schrumpfschritt bei Schritt 4 (best f
 *    dort noch 0,55), Ecken in x₁ ∈ [−1,50; 1,02], x₂ ∈ [0,05; 1,10]; erst
 *    dieser Start macht den vierten Zug überhaupt sichtbar (Review 13.3).
 */

const BLAU = "#0072B2"; // Simplex und seine Ecken (die Iterierten)
const GRUEN = "#009E73"; // das gesuchte Minimum
const ORANGE = "#E69F00"; // Reflexionsstrahl: die Suchrichtung des Verfahrens
const ROT = "#D55E00"; // Warnhinweis, wenn der Simplex nur noch schrumpft
const ACHSE = "#64748b";

type V2 = [number, number];

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** Sehr kleine Zahlen in Zehnerpotenzschreibweise, sonst gewöhnlich. */
function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  if (Math.abs(v) >= 1e-3) return fmt(v, 3);
  const [m, e] = v.toExponential(2).split("e");
  const exp = Number(e);
  const ziffern = String(Math.abs(exp))
    .split("")
    .map((z) => HOCH[Number(z)])
    .join("");
  return `${m.replace(".", ",")} · 10${exp < 0 ? "⁻" : ""}${ziffern}`;
}

const nmF = ([x, y]: V2): number => (1 - x) ** 2 + 5 * (y - x * x) ** 2;

/** Zwei Startsimplizes: der zweite erzwingt früh einen Schrumpfschritt. */
const STARTS: { name: string; sim: V2[] }[] = [
  {
    name: "Tal von oben",
    sim: [
      [-1.5, 2.5],
      [-0.7, 2.6],
      [-1.3, 1.8],
    ],
  },
  {
    name: "flach von links",
    sim: [
      [-1.5, 0.5],
      [-0.9, 0.5],
      [-1.5, 1.1],
    ],
  },
];
const NM_START: V2[] = STARTS[0].sim;

type Zug = "Reflexion" | "Expansion" | "Kontraktion" | "Schrumpfen" | "–";

function nmStep(sim: V2[]): { next: V2[]; move: Exclude<Zug, "–"> } {
  const s = sim.map((p) => ({ p, v: nmF(p) })).sort((a, b) => a.v - b.v);
  const [b1, b2, w] = s;
  const cen: V2 = [(b1.p[0] + b2.p[0]) / 2, (b1.p[1] + b2.p[1]) / 2];
  const xr: V2 = [cen[0] + (cen[0] - w.p[0]), cen[1] + (cen[1] - w.p[1])];
  const fr = nmF(xr);
  if (fr < b1.v) {
    const xe: V2 = [cen[0] + 2 * (cen[0] - w.p[0]), cen[1] + 2 * (cen[1] - w.p[1])];
    if (nmF(xe) < fr) return { next: [b1.p, b2.p, xe], move: "Expansion" };
    return { next: [b1.p, b2.p, xr], move: "Reflexion" };
  }
  if (fr < b2.v) return { next: [b1.p, b2.p, xr], move: "Reflexion" };
  const xc: V2 =
    fr < w.v
      ? [cen[0] + 0.5 * (cen[0] - w.p[0]), cen[1] + 0.5 * (cen[1] - w.p[1])]
      : [cen[0] - 0.5 * (cen[0] - w.p[0]), cen[1] - 0.5 * (cen[1] - w.p[1])];
  if (nmF(xc) < Math.min(fr, w.v)) return { next: [b1.p, b2.p, xc], move: "Kontraktion" };
  return {
    next: [
      b1.p,
      [(b1.p[0] + b2.p[0]) / 2, (b1.p[1] + b2.p[1]) / 2],
      [(b1.p[0] + w.p[0]) / 2, (b1.p[1] + w.p[1]) / 2],
    ],
    move: "Schrumpfen",
  };
}

const W = 380;
const H = 380;
const XD: V2 = [-2, 2];
const YD: V2 = [-1, 3];
const px = (x: number) => ((x - XD[0]) / (XD[1] - XD[0])) * W;
const py = (y: number) => H - ((y - YD[0]) / (YD[1] - YD[0])) * H;

type Zaehler = Record<Exclude<Zug, "–">, number>;
const LEER: Zaehler = { Reflexion: 0, Expansion: 0, Kontraktion: 0, Schrumpfen: 0 };

export function NelderMeadSimplex() {
  const [start, setStart] = useState(0);
  const [state, setState] = useState<{
    sim: V2[];
    hist: V2[][];
    move: Zug;
    k: number;
    zaehler: Zaehler;
  }>({
    sim: NM_START,
    hist: [],
    move: "–",
    k: 0,
    zaehler: { ...LEER },
  });

  // Statischer Hintergrund: diskrete Bänder von log f, einmal berechnet.
  const bg = useMemo(() => {
    const n = 44;
    const zellen: React.ReactNode[] = [];
    const hell: [number, number, number] = [248, 250, 252];
    const dunkel: [number, number, number] = [71, 85, 105];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = XD[0] + ((i + 0.5) / n) * (XD[1] - XD[0]);
        const y = YD[0] + ((j + 0.5) / n) * (YD[1] - YD[0]);
        const t = Math.min(1, Math.max(0, (Math.log10(nmF([x, y]) + 0.01) + 2) / 4));
        const q = Math.round(t * 7) / 7;
        const col = hell.map((l, m) => Math.round(l + (dunkel[m] - l) * q));
        zellen.push(
          <rect
            key={`${i}-${j}`}
            x={(i / n) * W}
            y={H - ((j + 1) / n) * H}
            width={W / n + 0.5}
            height={H / n + 0.5}
            fill={`rgb(${col[0]},${col[1]},${col[2]})`}
            opacity={0.5}
          />
        );
      }
    }
    return zellen;
  }, []);

  const schritte = (m: number) =>
    setState((st) => {
      let sim = st.sim;
      let move = st.move;
      const hist = [...st.hist];
      const zaehler = { ...st.zaehler };
      for (let i = 0; i < m; i++) {
        hist.push(sim);
        const r = nmStep(sim);
        sim = r.next;
        move = r.move;
        zaehler[r.move] += 1;
      }
      return { sim, hist: hist.slice(-14), move, k: st.k + m, zaehler };
    });
  const zuruecksetzen = (i = start) => {
    setStart(i);
    setState({ sim: STARTS[i].sim, hist: [], move: "–", k: 0, zaehler: { ...LEER } });
  };

  const ecken = state.sim.map((p) => ({ p, v: nmF(p) })).sort((a, b) => a.v - b.v);
  const dreieck = (sim: V2[]) =>
    sim.map((q) => `${px(q[0]).toFixed(1)},${py(q[1]).toFixed(1)}`).join(" ");

  // Der Reflexionsstrahl des NÄCHSTEN Zuges: vom schlechtesten Punkt durch die
  // Mitte der beiden anderen.
  const schwer: V2 = [
    (ecken[0].p[0] + ecken[1].p[0]) / 2,
    (ecken[0].p[1] + ecken[1].p[1]) / 2,
  ];
  const reflex: V2 = [
    schwer[0] + (schwer[0] - ecken[2].p[0]),
    schwer[1] + (schwer[1] - ecken[2].p[1]),
  ];

  const durchmesser = Math.max(
    ...ecken.flatMap((a) => ecken.map((b) => Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1])))
  );
  const spanne = ecken[2].v - ecken[0].v;

  let status: string;
  let statusFarbe = ACHSE;
  if (state.k === 0) {
    status =
      "Startsimplex gesetzt. Ein Klick auf „Schritt“ wirft die schlechteste Ecke weg und probiert den Punkt auf der anderen Seite des Schwerpunkts.";
  } else if (state.move === "Schrumpfen") {
    status =
      "Weder Reflexion noch Kontraktion haben geholfen, der ganze Simplex zieht sich zur besten Ecke zusammen. Das kostet n neue Auswertungen und bringt keinen neuen besten Wert.";
    statusFarbe = ROT;
  } else if (state.move === "Expansion") {
    status =
      "Die Reflexion war besser als jede bisherige Ecke, deshalb hat das Verfahren in derselben Richtung gleich noch einmal nachgelegt.";
    statusFarbe = BLAU;
  } else if (state.move === "Kontraktion") {
    status =
      "Der gespiegelte Punkt war nicht gut genug; der neue Eckpunkt liegt näher am Schwerpunkt als die weggeworfene Ecke.";
    statusFarbe = BLAU;
  } else {
    status =
      "Die gespiegelte Ecke ist besser als die zweitschlechteste und wird übernommen; der Simplex kippt über den Schwerpunkt hinweg.";
    statusFarbe = BLAU;
  }
  if (state.k > 0 && ecken[0].v < 1e-6) {
    status = `Der beste Eckpunkt liegt bei f = ${fmtE(
      ecken[0].v
    )}, das Verfahren ist im Minimum angekommen. Letzter Zug: ${state.move}.`;
    statusFarbe = GRUEN;
  }

  return (
    <div className="my-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {bg}
            {state.hist.map((sim, i) => (
              <polygon
                key={i}
                points={dreieck(sim)}
                fill="none"
                stroke={BLAU}
                strokeWidth={1}
                opacity={0.12 + (0.4 * i) / Math.max(state.hist.length, 1)}
              />
            ))}
            <line
              x1={px(ecken[2].p[0])}
              y1={py(ecken[2].p[1])}
              x2={px(reflex[0])}
              y2={py(reflex[1])}
              stroke={ORANGE}
              strokeWidth={1.6}
              strokeDasharray="5 4"
            />
            <circle cx={px(reflex[0])} cy={py(reflex[1])} r={3} fill={ORANGE} />
            <polygon
              points={dreieck(state.sim)}
              fill={BLAU}
              fillOpacity={0.18}
              stroke={BLAU}
              strokeWidth={2}
            />
            {ecken.map((q, i) => (
              <circle
                key={i}
                cx={px(q.p[0])}
                cy={py(q.p[1])}
                r={i === 0 ? 5 : 3.5}
                fill={BLAU}
              />
            ))}
            <circle cx={px(1)} cy={py(1)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
            <text x={px(1) + 8} y={py(1) + 4} fontSize="10" fill={GRUEN}>
              Minimum (1; 1)
            </text>
            <text x={6} y={H - 6} fontSize="9" fill={ACHSE}>
              x₁ ∈ [−2, 2], x₂ ∈ [−1, 3]; je dunkler, desto größer f
            </text>
            <text x={W - 6} y={14} fontSize="9" fill={ORANGE} textAnchor="end">
              nächste Reflexion
            </text>
          </svg>
        </div>
        <div className="min-w-60 grow">
          <p className="mb-2 text-sm">
            Minimiert wird f(x₁, x₂) = (1 − x₁)² + 5(x₂ − x₁²)². Die Talsohle ist die
            Parabel x₂ = x₁², das Minimum liegt in (1; 1) mit f = 0. Ausgewertet wird nur f
            selbst, verglichen werden nur Funktionswerte.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => schritte(1)}
              className="rounded bg-sky-700 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Schritt
            </button>
            <button
              onClick={() => schritte(5)}
              className="rounded bg-sky-700 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Schritt ×5
            </button>
            <button
              onClick={() => zuruecksetzen()}
              className="rounded bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-400"
            >
              Zurücksetzen
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Startsimplex:</span>
            {STARTS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => zuruecksetzen(i)}
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  i === start
                    ? "bg-sky-700 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="mt-2 space-y-1 font-mono text-xs">
            <p>
              Schritt {state.k}, letzter Zug: {state.move}
            </p>
            <p>
              Reflexionen {state.zaehler.Reflexion}, Expansionen {state.zaehler.Expansion},
              Kontraktionen {state.zaehler.Kontraktion}, Schrumpfschritte{" "}
              {state.zaehler.Schrumpfen}
            </p>
            {ecken.map((v, i) => (
              <p key={i}>
                {i === 0 ? "beste " : i === 1 ? "mittl." : "schl. "} ({fmt(v.p[0])};{" "}
                {fmt(v.p[1])}) f = {fmtE(v.v)}
              </p>
            ))}
            <p>
              Durchmesser {fmt(durchmesser)}, Spanne f<sub>schl.</sub> − f<sub>beste</sub> ={" "}
              {fmtE(spanne)}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: statusFarbe }}>
            {status}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Der orange Strahl zeigt, wo der nächste Versuchspunkt landet: gespiegelt an der
            Mitte der beiden besseren Ecken. Fällt der Wert dort unter alles Bisherige, geht
            es in derselben Richtung noch weiter; hilft die Spiegelung gar nicht, rückt der
            neue Punkt näher heran. Der Zähler oben zeigt, wie ungleich sich die vier Züge
            verteilen: Aus dem oberen Startsimplex stehen nach vierzig Schritten 13
            Reflexionen, 4 Expansionen und 23 Kontraktionen, aber kein einziger
            Schrumpfschritt. Wer den vierten Zug sehen will, startet flach von links; dort
            fällt er im vierten Schritt.
          </p>
        </div>
      </div>
    </div>
  );
}
