import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Stepper, Verdikt, W_BUTTON, W_BUTTON_AKTIV } from "../../../lib";

/**
 * §13.3 — DIE EINE EINSICHT: Vier Züge (Reflexion, Expansion, Kontraktion,
 * Schrumpfen) bringen einen Simplex ohne jede Ableitung ins Tal, und sie
 * verteilen sich sehr ungleich: Auf dem Rosenbrock-Tal fällt der teure
 * Schrumpfschritt aus dem oberen Startsimplex nie.
 *
 * Widget-CODE (Simplex-Logik nmF/nmStep, Hintergrund-Bänderung, Historie der
 * letzten Simplizes) portiert aus
 * heath-ch5-6/src/sections/widgets/S65Widgets.tsx (NelderMeadWidget).
 * SÄMTLICHE Texte, Beschriftungen, Statuszweige und Farben sind neu und
 * gehören zu diesem Skript. Der Lauf wird deterministisch aus der Schrittzahl
 * neu gerechnet (Muster S134Bfgs), der Verlauf ist deshalb scrubbar und
 * rückwärts begehbar; Play/Pause startet nie von selbst.
 *
 * Farbrollen nach dem Kapitel-13-Code: der Simplex und seine Ecken sind
 * Iterierte, also blau; das gesuchte Minimum ist grün; der Reflexionsstrahl
 * vom schlechtesten Punkt durch den Schwerpunkt ist die Suchrichtung dieses
 * Verfahrens, also orange. Rot warnt, wenn der Simplex nur noch schrumpft.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen
 * für f(x) = (1 − x₁)² + 5(x₂ − x₁²)² mit Minimum (1; 1), f = 0:
 *  - Startsimplex „Tal von oben" (Voreinstellung): nach 40 Schritten
 *    13 Reflexionen, 4 Expansionen, 23 Kontraktionen, 0 Schrumpfschritte, und
 *    genau bei Schritt 40 unterschreitet der beste Wert erstmals 10⁻⁶
 *    (f = 6,483·10⁻⁷). Nach 60 Schritten 15 / 4 / 41 / 0. Alle Ecken bleiben in
 *    x₁ ∈ [−1,50; 1,01] und x₂ ∈ [−0,38; 2,50], das Fenster schneidet nichts ab.
 *  - Startsimplex „flach von links": erster Schrumpfschritt bei Schritt 4;
 *    nach 40 Schritten 12 / 2 / 25 / 1, bester Wert 5,951·10⁻⁹, erstmals unter
 *    10⁻⁶ bei Schritt 31. Ecken in x₁ ∈ [−1,50; 1,02], x₂ ∈ [0,05; 1,10].
 *    Erst dieser Start macht den vierten Zug überhaupt sichtbar.
 */

const BLAU = FMM_COLORS.blau; // Simplex und seine Ecken (die Iterierten)
const GRUEN = FMM_COLORS.gruen; // das gesuchte Minimum
const ORANGE = FMM_COLORS.orange; // Reflexionsstrahl: die Suchrichtung des Verfahrens
const ROT = FMM_COLORS.rot; // Warnhinweis, wenn der Simplex nur noch schrumpft
const ACHSE = "#64748b";

type V2 = [number, number];

const fmt = (v: number, d = 3) => fmtDe(v, d);

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

type Zaehler = Record<Exclude<Zug, "–">, number>;

/** Der ganze Lauf, einmal gerechnet; jeder Schritt ist damit anspringbar. */
function nmLauf(startIndex: number, K: number) {
  let sim = STARTS[startIndex].sim;
  const zaehler: Zaehler = { Reflexion: 0, Expansion: 0, Kontraktion: 0, Schrumpfen: 0 };
  const zeilen: { sim: V2[]; move: Zug; zaehler: Zaehler }[] = [
    { sim, move: "–", zaehler: { ...zaehler } },
  ];
  for (let i = 0; i < K; i++) {
    const r = nmStep(sim);
    sim = r.next;
    zaehler[r.move] += 1;
    zeilen.push({ sim, move: r.move, zaehler: { ...zaehler } });
  }
  return zeilen;
}

const K_MAX = 60;
const W = 380;
const H = 380;
const XD: V2 = [-2, 2];
const YD: V2 = [-1, 3];
const px = (x: number) => ((x - XD[0]) / (XD[1] - XD[0])) * W;
const py = (y: number) => H - ((y - YD[0]) / (YD[1] - YD[0])) * H;

export function NelderMeadSimplex() {
  const [start, setStart] = useState(0);
  const [k, setK] = useState(0);

  const zeilen = useMemo(() => nmLauf(start, K_MAX), [start]);
  const kk = Math.min(k, zeilen.length - 1);
  const jetzt = zeilen[kk];
  const hist = zeilen.slice(Math.max(0, kk - 13), kk).map((z) => z.sim);

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
          />,
        );
      }
    }
    return zellen;
  }, []);

  const ecken = jetzt.sim.map((p) => ({ p, v: nmF(p) })).sort((a, b) => a.v - b.v);
  const dreieck = (sim: V2[]) =>
    sim.map((q) => `${px(q[0]).toFixed(1)},${py(q[1]).toFixed(1)}`).join(" ");

  // Der Reflexionsstrahl des NÄCHSTEN Zuges: vom schlechtesten Punkt durch die
  // Mitte der beiden anderen.
  const schwer: V2 = [(ecken[0].p[0] + ecken[1].p[0]) / 2, (ecken[0].p[1] + ecken[1].p[1]) / 2];
  const reflex: V2 = [schwer[0] + (schwer[0] - ecken[2].p[0]), schwer[1] + (schwer[1] - ecken[2].p[1])];

  const durchmesser = Math.max(
    ...ecken.flatMap((a) => ecken.map((b) => Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1]))),
  );
  const spanne = ecken[2].v - ecken[0].v;
  const z = jetzt.zaehler;

  let art: "neutral" | "ok" | "warn" | "fail";
  let titel: string;
  let status: string;
  if (kk === 0) {
    art = "neutral";
    titel = "Ausgangslage";
    status =
      "Der Startsimplex steht. Ein Schritt vorwärts wirft die schlechteste Ecke weg und probiert den Punkt auf der anderen Seite des Schwerpunkts, Zug 1 von Algorithmus 13.3.2.";
  } else if (ecken[0].v < 1e-6) {
    art = "ok";
    titel = "im Minimum angekommen";
    status = `Der beste Eckpunkt liegt bei f = ${fmtE(ecken[0].v)}, das Verfahren ist also am Ziel. Bis hierher standen ${z.Reflexion} Reflexionen, ${z.Expansion} Expansionen, ${z.Kontraktion} Kontraktionen und ${z.Schrumpfen} Schrumpfschritte auf der Rechnung: Die vier Züge von Algorithmus 13.3.2 kommen sehr ungleich zum Einsatz, und die billigste Bewegung ist bei weitem nicht die häufigste.`;
  } else if (jetzt.move === "Schrumpfen") {
    art = "warn";
    titel = "Schrumpfen";
    status =
      "Weder Reflexion noch Kontraktion haben geholfen, deshalb zieht sich der ganze Simplex zur besten Ecke zusammen. Das ist der teuerste der vier Züge: Er kostet n neue Auswertungen und bringt keinen neuen besten Wert.";
  } else if (jetzt.move === "Expansion") {
    art = "neutral";
    titel = "Expansion";
    status =
      "Die Reflexion war besser als jede bisherige Ecke, deshalb hat das Verfahren in derselben Richtung gleich noch einmal nachgelegt. So läuft der Simplex ein langes Tal entlang, ohne je eine Ableitung zu sehen.";
  } else if (jetzt.move === "Kontraktion") {
    art = "neutral";
    titel = "Kontraktion";
    status =
      "Der gespiegelte Punkt war nicht gut genug; der neue Eckpunkt liegt näher am Schwerpunkt als die weggeworfene Ecke. Im gekrümmten Rosenbrock-Tal ist das der häufigste Zug, weil die Talsohle dem Simplex ständig wegkippt.";
  } else {
    art = "neutral";
    titel = "Reflexion";
    status =
      "Die gespiegelte Ecke ist besser als die zweitschlechteste und wird übernommen; der Simplex kippt über den Schwerpunkt hinweg. Das ist der Grundzug des Verfahrens und der einzige, der nichts kostet außer einer Auswertung.";
  }

  const knopf = (aktiv: boolean) => (aktiv ? W_BUTTON_AKTIV : W_BUTTON);

  return (
    <div className="my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Spielen wir den Lauf ab und achten auf den Zugzähler: Welcher der vier Züge fällt am
        häufigsten, welcher gar nicht?
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            role="img"
            aria-label={`Der Nelder-Mead-Simplex nach ${kk} Schritten über der Höhenkarte von f; letzter Zug: ${jetzt.move}.`}
            className="max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            {bg}
            {hist.map((sim, i) => (
              <polygon
                key={i}
                points={dreieck(sim)}
                fill="none"
                stroke={BLAU}
                strokeWidth={1}
                opacity={0.12 + (0.4 * i) / Math.max(hist.length, 1)}
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
              points={dreieck(jetzt.sim)}
              fill={BLAU}
              fillOpacity={0.18}
              stroke={BLAU}
              strokeWidth={2}
            />
            {ecken.map((q, i) => (
              <circle key={i} cx={px(q.p[0])} cy={py(q.p[1])} r={i === 0 ? 5 : 3.5} fill={BLAU} />
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
            {jetzt.move === "Schrumpfen" && (
              <text x={W - 6} y={28} fontSize="9" fill={ROT} textAnchor="end">
                Schrumpfschritt
              </text>
            )}
          </svg>
        </div>
        <div className="min-w-60 grow space-y-2">
          <p className="text-sm">
            Minimiert wird f(x₁, x₂) = (1 − x₁)² + 5(x₂ − x₁²)². Die Talsohle ist die Parabel
            x₂ = x₁², das Minimum liegt in (1; 1) mit f = 0. Ausgewertet wird nur f selbst,
            verglichen werden nur Funktionswerte.
          </p>
          <Stepper
            step={kk}
            setStep={setK}
            max={K_MAX}
            playable
            speedMs={450}
            narration={`Letzter Zug: ${jetzt.move}`}
          />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Startsimplex:</span>
            {STARTS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                aria-pressed={i === start}
                className={knopf(i === start)}
                onClick={() => {
                  setStart(i);
                  setK(0);
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="space-y-1 font-mono text-xs">
            <p>
              Reflexionen {z.Reflexion}, Expansionen {z.Expansion}, Kontraktionen {z.Kontraktion},
              Schrumpfschritte {z.Schrumpfen}
            </p>
            {ecken.map((v, i) => (
              <p key={i}>
                {i === 0 ? "beste " : i === 1 ? "mittl." : "schl. "} ({fmt(v.p[0])}; {fmt(v.p[1])}) f
                = {fmtE(v.v)}
              </p>
            ))}
            <p>
              Durchmesser {fmt(durchmesser)}, Spanne f<sub>schl.</sub> − f<sub>beste</sub> ={" "}
              {fmtE(spanne)}
            </p>
          </div>
        </div>
      </div>
      <Verdikt kind={art} titel={titel}>
        {status}
      </Verdikt>
    </div>
  );
}
