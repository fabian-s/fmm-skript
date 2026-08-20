import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, M, Slider, Verdikt } from "../../../lib";

/**
 * §14.3: Das Runge-Phaenomen, aequidistante gegen Chebyshev-Knoten.
 *
 * Rechen- und Layout-CODE portiert aus der privaten Buch-App
 * heath-ch7/src/sections/S734.tsx (rungeF, equiPts, chebPts, makeInterp
 * (baryzentrische Auswertung), scanInterp, die vorberechneten Fehlerkurven
 * und der Aufbau des RungeExplorerWidget). ALLE Texte, Beschriftungen,
 * Statuszeilen und Zahlformate sind fuer dieses Skript neu geschrieben
 * (App-Prosa ist buchadaptiert und im oeffentlichen Repo verboten).
 *
 * Verifiziert mit node (verify-14-funktionsapproximation/verify-values.mjs,
 * 2026-08-19; detaillierter Scan check-s143.mjs / check2-s143.mjs, 2026-08-13),
 * max|f - p| auf [-1,1] bei n Knoten:
 *   n =  5: aequidistant 0,4384 (bei x = -0,795) | Chebyshev 0,4020
 *   n = 10: 0,3003 (x = -0,927) | 0,2692
 *   n = 15: 7,195  (x = -0,961) | 0,0466
 *   n = 20: 8,579  (x = -0,973) | 0,0376
 * Die aequidistante Folge waechst also NICHT monoton (0,44 -> 0,30), und die
 * Fehlermaxima wandern an den Rand. Chebyshev faellt weiter: 5,2e-3 (n = 30),
 * 7,1e-4 (n = 40), 1,3e-5 (n = 60).
 *
 * Farbcode Kapitel 14: Stuetzpunkte blau, Interpolant gruen, Fehler und
 * Problemzonen rot, die wahre Funktion neutral (wie in S141DreiProbleme).
 * R5-Nachprüfung: verify/R5/verify-r5-claims.mjs, 2026-08-20.
 */

const { blau: BLAU, gruen: GRUEN, rot: ROT, grau: WAHR } = FMM_COLORS;

/* ------------------------------------------------------------------ */
/* Numerik                                                             */
/* ------------------------------------------------------------------ */

const rungeF = (x: number) => 1 / (1 + 25 * x * x);

/** n gleichmäßig verteilte Knoten auf [-1, 1]. */
const aequiKnoten = (n: number) =>
  Array.from({ length: n }, (_, i) => (n === 1 ? 0 : -1 + (2 * i) / (n - 1)));

/** n Chebyshev-Knoten auf [-1, 1] (Nullstellen von T_n). */
const chebKnoten = (n: number) =>
  Array.from({ length: n }, (_, i) => Math.cos(((2 * i + 1) * Math.PI) / (2 * n)));

/** Baryzentrische Auswertung des Interpolanten durch (xs, f(xs)). */
function interpolant(xs: number[], f: (x: number) => number): (x: number) => number {
  const ys = xs.map(f);
  const w = xs.map((xi, i) => {
    let p = 1;
    for (let j = 0; j < xs.length; j++) if (j !== i) p *= xi - xs[j];
    return 1 / p;
  });
  return (x: number) => {
    let zaehler = 0;
    let nenner = 0;
    for (let i = 0; i < xs.length; i++) {
      const d = x - xs[i];
      if (Math.abs(d) < 1e-13) return ys[i];
      const c = w[i] / d;
      zaehler += c * ys[i];
      nenner += c;
    }
    return zaehler / nenner;
  };
}

/** Größter Abstand zu f auf einem feinen Gitter, dazu Ort und Wertebereich. */
function scanne(p: (x: number) => number): { fehler: number; ort: number; lo: number; hi: number } {
  let fehler = 0;
  let ort = 0;
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= 2000; i++) {
    const x = -1 + i / 1000;
    const v = p(x);
    const d = Math.abs(rungeF(x) - v);
    if (d > fehler) {
      fehler = d;
      ort = x;
    }
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  return { fehler, ort, lo, hi };
}

const N_MIN = 3;
const N_MAX = 21;
const LOG_AEQUI: number[] = [];
const LOG_CHEB: number[] = [];
for (let n = N_MIN; n <= N_MAX; n++) {
  LOG_AEQUI.push(Math.log10(scanne(interpolant(aequiKnoten(n), rungeF)).fehler));
  LOG_CHEB.push(Math.log10(scanne(interpolant(chebKnoten(n), rungeF)).fehler));
}

/** Stückweise lineares Ablesen der vorberechneten Fehlerkurven. */
function logFehlerBei(werte: number[], x: number): number {
  const u = Math.min(N_MAX, Math.max(N_MIN, x)) - N_MIN;
  const i = Math.min(werte.length - 2, Math.floor(u));
  return werte[i] + (u - i) * (werte[i + 1] - werte[i]);
}

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "undefiniert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(d).replace(".", ",").replace(/^-/, "−");
}

/* ------------------------------------------------------------------ */
/* Widget                                                              */
/* ------------------------------------------------------------------ */

export function RungeExplorer() {
  const [n, setN] = useState(11);
  const [modus, setModus] = useState<"aequi" | "cheb">("aequi");

  const xs = useMemo(() => (modus === "aequi" ? aequiKnoten(n) : chebKnoten(n)), [n, modus]);
  const p = useMemo(() => interpolant(xs, rungeF), [xs]);
  const { fehler, ort, lo, hi } = useMemo(() => scanne(p), [p]);

  const yLo = Math.max(-4, Math.min(-0.4, lo - 0.15));
  const yHi = Math.min(4, Math.max(1.6, hi + 0.15));
  const beschnitten = lo < -4 || hi > 4;

  const logAktuell = Math.log10(fehler);
  const vorher =
    n > N_MIN
      ? 10 ** (modus === "aequi" ? LOG_AEQUI[n - 1 - N_MIN] : LOG_CHEB[n - 1 - N_MIN])
      : NaN;
  const besser = Number.isFinite(vorher) ? fehler < vorher : false;

  const amRand = Math.abs(ort) > 0.7;
  const wo = amRand ? "also nahe am Rand" : "also im mittleren Bereich";
  const kopf = `${modus === "cheb" ? "Chebyshev-Knoten" : "Äquidistante Knoten"}, Grad ${n - 1}: größter Abstand ${fehler >= 100 ? fmt(fehler, 0) : fmt(fehler)} bei x = ${fmt(ort, 2)}, ${wo}.`;
  const status =
    modus === "cheb"
      ? `${kopf} Zu den Rändern hin liegen die Knoten dichter, und dort bleibt die Kurve ruhig.`
      : fehler > 1
        ? `${kopf} In der Mitte passt der Interpolant gut, an den Enden schlägt er weit aus.`
        : amRand
          ? `${kopf} Der Ausschlag ist noch klein, sitzt aber schon am Rand; von dort wächst er mit weiteren Knoten.`
          : `${kopf} Noch sieht es harmlos aus. Ziehen wir n hoch, wandert das Maximum an den Rand und wächst.`;

  const vergleich =
    n === N_MIN
      ? ""
      : besser
        ? ` Der letzte hinzugekommene Knoten hat den Fehler von ${fmt(vorher, 3)} auf ${fmt(fehler, 3)} gedrückt.`
        : ` Der letzte hinzugekommene Knoten hat den Fehler von ${fmt(vorher, 3)} auf ${fmt(fehler, 3)} gehoben.`;

  return (
    <div className="my-2 text-sm">
      <Aufgabe>Wählen wir eine Knotenfamilie und verändern die Knotenzahl; erst dann lesen wir den Fehler ab.</Aufgabe>

      <div className="mb-1 flex flex-wrap items-center gap-2">
        {(
          [
            ["aequi", "äquidistante Knoten"],
            ["cheb", "Chebyshev-Knoten"],
          ] as const
        ).map(([id, name]) => (
          <button
            key={id}
            type="button"
            onClick={() => setModus(id)}
            className={`rounded border px-2 py-1 ${
              modus === id
                ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
                : "border-slate-300 dark:border-slate-600"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <Slider
        label="n (Zahl der Knoten)"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={N_MIN}
        max={N_MAX}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />

      <div className="my-2 flex flex-wrap items-start gap-5">
        <div>
          <LabeledPlot
            xLabel="x"
            yLabel="y"
            series={[
              { f: rungeF, color: WAHR },
              { f: p, color: GRUEN },
            ]}
            xDomain={[-1, 1]}
            yDomain={[yLo, yHi]}
            width={360}
            height={250}
            markers={xs.map((xi) => ({ x: xi, y: rungeF(xi), color: BLAU }))}
          />
          <p className="mt-1 max-w-[22rem] text-center text-xs" style={{ color: WAHR }}>
            Grau die Funktion <M>{"f"}</M>, blau die Stützpunkte, grün der
            Interpolant.
            {beschnitten
              ? " Der Interpolant verlässt am Rand das gezeichnete Fenster."
              : ""}
          </p>
        </div>

        <div>
          <LabeledPlot
            xLabel="n (Knoten)"
            yLabel="log₁₀ max|f−p|"
            series={[
              { f: (x: number) => logFehlerBei(LOG_AEQUI, x), color: ROT },
              { f: (x: number) => logFehlerBei(LOG_CHEB, x), color: ROT, dash: [5, 4] },
            ]}
            xDomain={[N_MIN, N_MAX]}
            yDomain={[-2.4, 2.4]}
            width={300}
            height={220}
            markers={[{ x: n, y: logAktuell, color: ROT }]}
          />
          <p className="mt-1 max-w-[19rem] text-center text-xs" style={{ color: WAHR }}>
            Beide Kurven messen dieselbe Größe und tragen deshalb dieselbe
            Farbe: durchgezogen die äquidistanten, gestrichelt die
            Chebyshev-Knoten.
          </p>
        </div>
      </div>

      <p className="font-mono text-xs">
        n = {n}, Grad {n - 1}, {modus === "aequi" ? "äquidistant" : "Chebyshev"}: max|f − p| ≈{" "}
        {fehler >= 100 ? fmt(fehler, 0) : fmt(fehler)}
      </p>
      <Verdikt kind={modus === "aequi" && fehler > 1 ? "fail" : modus === "cheb" ? "ok" : "warn"}>
        {status}{vergleich} Das illustriert Bemerkung 14.3.16: Bei äquidistanten Knoten wächst der Fehler asymptotisch, aber nicht monoton.
      </Verdikt>
    </div>
  );
}
