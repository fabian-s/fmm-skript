import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LabeledPlot, M, Slider } from "../../../lib";
import { bildMitSVD, energieAnteil, frobenius, matSub, rankK, type Mat } from "./S64Numerik";

/**
 * Rang-k-Approximations-Explorer für §6.4: Testbild, Rekonstruktion A_k,
 * Residuum A − A_k, Singulärwert-Balken, die beiden Fehlerkurven aus dem Satz
 * von Eckart und Young sowie Energie-Anteil und Speicherbilanz.
 *
 * Der Bildrenderer und der SVD-Rechenkern sind aus der privaten mml-ch4-App
 * portiert (widgets/S46Widgets.tsx, widgets/svd.ts); Aufbau, Fehlerkurven,
 * Speicherbilanz und sämtliche Texte sind neu. Farbcode des Kapitels:
 * orange = Singulärwerte, rot = Rest- und Fehlerterme.
 */

const ORANGE = "#E69F00";
const ROT = "#D55E00";
const GRAU = "#64748b";

const KMAX = 24;

/** deutsche Dezimaltrennung, kein −0; NaN und ±∞ getrennt ausgewiesen */
function fmt(v: number, stellen = 3): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Number(v.toFixed(stellen));
  if (Object.is(r, -0)) r = 0;
  return r.toFixed(stellen).replace("-", "−").replace(".", ",");
}

const prozent = (v: number, stellen = 1) =>
  Number.isFinite(v) ? `${fmt(100 * v, stellen)} %` : fmt(v);

/** Graustufenraster als Canvas; "sym" legt 0 auf Mittelgrau (für Residuen). */
function GrauBild({
  data,
  scale = 4,
  mode = "clamp",
}: {
  data: Mat;
  scale?: number;
  mode?: "clamp" | "sym";
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const m = data.length;
  const n = data[0].length;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(n, m);
    let lo = 0;
    let hi = 1;
    if (mode === "sym") {
      let a = 0;
      for (const row of data) for (const x of row) a = Math.max(a, Math.abs(x));
      lo = -a || -1;
      hi = a || 1;
    }
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const t = Math.min(1, Math.max(0, (data[i][j] - lo) / (hi - lo)));
        const g = Math.round(t * 255);
        const o = 4 * (i * n + j);
        img.data[o] = g;
        img.data[o + 1] = g;
        img.data[o + 2] = g;
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [data, m, n, mode]);
  return (
    <canvas
      ref={ref}
      width={n}
      height={m}
      style={{ width: n * scale, height: m * scale, imageRendering: "pixelated" }}
      className="rounded border border-slate-300 dark:border-slate-600"
    />
  );
}

function Tafel({ children, titel }: { children: ReactNode; titel: ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-1">
      {children}
      <figcaption className="text-center text-xs" style={{ color: GRAU }}>
        {titel}
      </figcaption>
    </figure>
  );
}

/** stückweise lineare Fortsetzung einer an den ganzen Zahlen gegebenen Folge */
function stetig(werte: number[]): (x: number) => number {
  return (x: number) => {
    if (!Number.isFinite(x)) return NaN;
    const t = Math.min(Math.max(x, 0), werte.length - 1);
    const i = Math.floor(t);
    const j = Math.min(i + 1, werte.length - 1);
    return werte[i] * (1 - (t - i)) + werte[j] * (t - i);
  };
}

export function RangKExplorer() {
  const { A, svd } = bildMitSVD();
  const [k, setK] = useState(3);

  const Ak = useMemo(() => rankK(svd, k), [svd, k]);
  const rest = useMemo(() => matSub(A, Ak), [A, Ak]);

  const m = svd.m;
  const n = svd.n;
  const voll = m * n;
  const gespeichert = k * (m + n + 1);
  const grenze = Math.floor((voll - 1) / (m + n + 1)); // größtes k, das noch Speicher spart

  const normA = frobenius(A);
  const spektralFehler = useMemo(
    () => Array.from({ length: KMAX + 1 }, (_, j) => svd.s[j] ?? 0),
    [svd]
  );
  const frobFehler = useMemo(
    () =>
      Array.from({ length: KMAX + 1 }, (_, j) =>
        Math.sqrt(svd.s.slice(j).reduce((a, x) => a + x * x, 0))
      ),
    [svd]
  );
  const energie = energieAnteil(svd.s, k);
  const yMax = 1.15 * frobFehler[1];

  const balken = svd.s.slice(0, KMAX);
  const sMax = balken[0];

  return (
    <div>
      <p className="text-sm">
        Als Testmatrix dient ein künstlich erzeugtes Graustufenbild mit {m} Zeilen und {n}{" "}
        Spalten: Himmel, Sonne, Boden, drei Torbögen, darüber ein feines Rauschen. Jeder Eintrag
        kodiert eine Helligkeit, 0 steht für schwarz und 1 für weiß. Schieben wir{" "}
        <M>{"k"}</M> nach oben, kommt in der Rekonstruktion je ein Summand{" "}
        <M>{"\\sigma_i \\bu_i \\bv_i^\\top"}</M> hinzu.
      </p>

      <div className="mt-3 max-w-md">
        <Slider
          label="Rang k"
          value={k}
          onChange={(v) => setK(Math.round(v))}
          min={1}
          max={KMAX}
          step={1}
          fmt={(v) => v.toFixed(0)}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-center gap-4">
        <Tafel titel={<>Original <M>{"\\bA"}</M></>}>
          <GrauBild data={A} />
        </Tafel>
        <Tafel titel={<>Rekonstruktion <M>{`\\bA_{${k}}`}</M></>}>
          <GrauBild data={Ak} />
        </Tafel>
        <Tafel
          titel={
            <>
              Residuum <M>{`\\bA - \\bA_{${k}}`}</M> (Mittelgrau = 0)
            </>
          }
        >
          <GrauBild data={rest} mode="sym" />
        </Tafel>
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-28 items-end gap-0.5" aria-hidden="true">
            {balken.map((s, i) => (
              <div
                key={i}
                title={`σ${i + 1} = ${fmt(s)}`}
                className="w-2.5 rounded-t"
                style={{
                  height: `${Math.max(2, (s / sMax) * 100)}%`,
                  backgroundColor: i < k ? ORANGE : "#cbd5e1",
                }}
              />
            ))}
          </div>
          <span className="max-w-[220px] text-center text-xs" style={{ color: GRAU }}>
            Singulärwerte <M>{"\\sigma_1"}</M> bis <M>{`\\sigma_{${KMAX}}`}</M> in absteigender
            Größe; orange eingefärbt sind die {k}, die in{" "}
            <M>{`\\bA_{${k}}`}</M> eingehen
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <LabeledPlot
            xLabel="Rang k"
            yLabel="Fehler"
            xDomain={[1, KMAX]}
            yDomain={[0, yMax]}
            width={330}
            height={210}
            series={[
              { f: stetig(frobFehler), color: ROT },
              { f: stetig(spektralFehler), color: ORANGE },
            ]}
            markers={[
              { x: k, y: frobFehler[k], color: ROT },
              { x: k, y: spektralFehler[k], color: ORANGE },
            ]}
          />
          <span className="max-w-[330px] text-center text-xs" style={{ color: GRAU }}>
            <span style={{ color: ROT }}>rot</span>:{" "}
            <M>{"\\left\\| \\bA - \\bA_k \\right\\|_F"}</M>,{" "}
            <span style={{ color: ORANGE }}>orange</span>:{" "}
            <M>{"\\left\\| \\bA - \\bA_k \\right\\|_2 = \\sigma_{k+1}"}</M>. Sinnvoll sind nur
            ganzzahlige <M>{"k"}</M>; die Punkte sind der Übersicht halber verbunden.
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <div className="mb-1">
            Energie-Anteil{" "}
            <M>{`\\sum_{i=1}^{${k}} \\sigma_i^2 \\big/ \\sum_{i=1}^{r} \\sigma_i^2`}</M> ={" "}
            <strong>{prozent(energie, 2)}</strong>
          </div>
          <div className="relative h-4 w-full max-w-md rounded bg-slate-200 dark:bg-slate-700">
            <div
              className="absolute left-0 top-0 h-4 rounded"
              style={{
                width: `${Math.max(0, Math.min(1, energie)) * 100}%`,
                backgroundColor: ORANGE,
              }}
            />
            <div className="absolute left-[90%] top-0 h-4 w-px bg-slate-500" />
            <div className="absolute left-[99%] top-0 h-4 w-px bg-slate-500" />
          </div>
          <div className="mt-0.5 max-w-md text-xs" style={{ color: GRAU }}>
            Die beiden Striche markieren 90 % und 99 %.
          </div>
        </div>

        <ul className="list-disc space-y-1 pl-5">
          <li>
            Spektralnorm-Fehler{" "}
            <M>{`\\left\\| \\bA - \\bA_{${k}} \\right\\|_2 = \\sigma_{${k + 1}}`}</M> ={" "}
            {fmt(spektralFehler[k])}, relativ zu <M>{"\\sigma_1"}</M>:{" "}
            {prozent(spektralFehler[k] / spektralFehler[0], 2)}.
          </li>
          <li>
            Frobenius-Fehler <M>{`\\left\\| \\bA - \\bA_{${k}} \\right\\|_F`}</M> ={" "}
            {fmt(frobFehler[k])}, relativ zu <M>{"\\left\\| \\bA \\right\\|_F"}</M> ={" "}
            {fmt(normA)}: {prozent(frobFehler[k] / normA, 2)}.
          </li>
          <li>
            Speicherbedarf: {k} · ({m} + {n} + 1) = {gespeichert} Zahlen; das Bild selbst hat{" "}
            {m} · {n} = {voll}. Verhältnis: {prozent(gespeichert / voll)}.{" "}
            {k <= grenze
              ? `Bei k = ${grenze + 1} kippt die Bilanz.`
              : `Die Bilanz ist gekippt: Kompression gibt es hier nur bis k = ${grenze}.`}
          </li>
        </ul>
        <p>
          Die dritte Tafel zeigt, wo die Rekonstruktion danebenliegt. Mittelgrau heißt: kein
          Unterschied; hell und dunkel markieren zu helle und zu dunkle Pixel. Bei{" "}
          <M>{"k = 1"}</M> zeichnen sich dort noch die Torbögen ab, hinter dem Knick bei{" "}
          <M>{"k = 3"}</M> nur noch das Rauschen der Vorlage.
        </p>
        <p>
          Wie viel ein weiterer Term überhaupt noch bringen kann, verrät der nächste graue
          Balken: Er senkt den quadrierten Frobenius-Fehler um{" "}
          <M>{`\\sigma_{${k + 1}}^2 = ${(spektralFehler[k] ** 2).toFixed(3).replace(".", ",")}`}</M>
          .
        </p>
      </div>
    </div>
  );
}
