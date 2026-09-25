import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  Plot,
  Schaetzfrage,
  Slider,
  Verdikt,
  fmtDe,
} from "../../../lib";
import { bildMitSVD, energieAnteil, frobenius, matSub, rankK, type Mat } from "./S64Numerik";
import { num } from "../../numbers.generated";

/**
 * DIE EINE EINSICHT: Der Singulärwert-Verlauf sagt, wie viele Rang-1-Terme ein
 * Bild wirklich braucht. Hinter dem Knick des Spektrums steckt in A − A_k nur
 * noch das Rauschen der Vorlage, und jeder weitere Term kauft fast nichts mehr.
 *
 * Der Leser tippt diese Zahl, bevor das Widget sie im Verdikt bestätigt
 * (Muster 1); vorher steht sie nirgends.
 *
 * FARBROLLEN (Kapitel 6): orange = Singulärwerte σ (Balken, Energiebalken),
 * rot = Rest- und Fehlerterme (beide Fehlerkurven, Marken), grau = neutrale
 * Beschriftung. Blau und Grün gehören im Kapitel den Singulärvektoren und
 * kommen hier nicht vor.
 *
 * PROVENIENZ: Bildrenderer und SVD-Rechenkern sind aus der privaten mml-ch4-App
 * portiert (widgets/S46Widgets.tsx, widgets/svd.ts); Aufbau, Fehlerkurven,
 * Speicherbilanz und sämtliche Texte sind neu.
 *
 * PRÜFSTATUS (scripts/verify/REV29/06-svd-Widgets.mjs, 2026-08-29) für das synthetische Testbild (36 × 54, Rauschstärke 0,07):
 *   σ₁…σ₆ = 26,475 · 6,060 · 3,008 · 0,561 · 0,497 · 0,417, ‖A‖_F = 27,353;
 *   der Knick liegt bei k = 3: σ₄/σ₃ = 0,187 ist der stärkste Abfall des
 *   Spektrums (die Nachbarquotienten sind 0,229, 0,496, 0,887, 0,838);
 *   Energie-Anteil 93,68 % (k=1), 98,59 % (k=2), 99,80 % (k=3);
 *   relativer Frobenius-Fehler 4,48 % (k=3) gegen 3,21 % (k=6);
 *   Speicherbilanz: 36·54 = 1944 Zahlen, Kompression nur für k ≤ 21.
 */

const ORANGE = FMM_COLORS.orange;
const ROT = FMM_COLORS.rot;
const GRAU = FMM_COLORS.grau;

const KMAX = 24;
/** Lage des Knicks im Spektrum des Testbilds (verifiziert, s. Kopfkommentar) */
const KNICK = 3;

/** deutsche Dezimaltrennung (fmtDe aus der lib) */
const fmt = (v: number, stellen = 3) => fmtDe(v, stellen);

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
      style={{ width: n * scale, imageRendering: "pixelated" }}
      className="h-auto max-w-full rounded border border-slate-300 dark:border-slate-600"
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
  // NICHT auf KNICK starten: der Regler steht sonst beim Laden schon auf der
  // Lösung der eigenen Schätzfrage. Bei k = 1 führt das Schieben durch alle drei
  // Bildstufen.
  const [k, setK] = useState(1);

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
    <Schaetzfrage
      frage={
        <>
          Wie viele Rang-1-Terme braucht dieses Bild, bis im Restbild nur noch das Rauschen der
          Vorlage steht?
        </>
      }
      loesung={KNICK}
      toleranz={0.5}
      einheit="Terme"
      fmt={(v) => fmtDe(v, 0)}
      min={1}
      max={KMAX}
    >
      {({ aufgeloest }) => (
        <div>
          <Aufgabe>
            Schieben wir <M>{"k"}</M> nach oben und achten wir auf die dritte Tafel: Ab wann
            steht dort kein Gegenstand mehr, sondern nur noch Körnung?
          </Aufgabe>

          <div className="mt-3 max-w-md">
            <Slider
              label="Rang k"
              value={k}
              onChange={(v) => setK(Math.round(v))}
              min={1}
              max={KMAX}
              step={1}
              accent={ORANGE}
              marks={aufgeloest ? [KNICK] : undefined}
              fmt={(v) => fmtDe(v, 0)}
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
              Differenz <M>{`\\bA - \\bA_{${k}}`}</M>, wobei 0 als Mittelgrau erscheint
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
                  backgroundColor: i < k ? ORANGE : "var(--w-grid-strong)",
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
          <Plot
            xLabel="Rang k"
            yLabel="Fehler"
            xDomain={[1, KMAX]}
            yDomain={[0, yMax]}
            width={330}
            height={230}
            ariaLabel={`Fehler der Rang-k-Approximation über k; bei k = ${k} beträgt der Frobenius-Fehler ${fmt(frobFehler[k])}.`}
            series={[
              { f: stetig(frobFehler), color: ROT, label: "Frobenius-Fehler" },
              { f: stetig(spektralFehler), color: ROT, dash: [5, 4], label: "Spektralnorm-Fehler" },
            ]}
            markers={[
              { x: k, y: frobFehler[k], color: ROT },
              { x: k, y: spektralFehler[k], color: ROT },
            ]}
          />
          <span className="max-w-[330px] text-center text-xs" style={{ color: GRAU }}>
            Die beiden Fehlerformeln aus ({num("eq:eckart-und-young-beste-approximation-von")}), an diesem Bild ausgewertet. Sinnvoll sind
            nur ganzzahlige <M>{"k"}</M>; die Punkte sind der Übersicht halber verbunden.
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
        {k < KMAX ? (
          <p>
            Wie viel ein weiterer Term überhaupt noch bringen kann, verrät der nächste graue
            Balken: Er senkt den quadrierten Frobenius-Fehler um{" "}
            <M>
              {`\\sigma_{${k + 1}}^2 = ${(spektralFehler[k] ** 2).toFixed(3).replace(".", "{,}")}`}
            </M>
            .
          </p>
        ) : (
          <p>
            Alle {KMAX} gezeigten Balken sind aufgebraucht. Jeder weitere Term würde den
            quadrierten Frobenius-Fehler noch um <M>{"\\sigma_{k+1}^2"}</M> senken; das sind
            hier höchstens {fmt(spektralFehler[KMAX] ** 2)}.
          </p>
        )}
          </div>

          {!aufgeloest ? (
            <Verdikt kind="neutral">
              Die dritte Tafel zeigt, wo die Rekonstruktion danebenliegt: Mittelgrau heißt kein
              Unterschied, hell und dunkel markieren zu helle und zu dunkle Bildpunkte. Lesen
              wir sie zusammen mit dem Balkenbild links, dann sehen wir, welcher Singulärwert
              gerade welche Struktur nachträgt.
            </Verdikt>
          ) : k > grenze ? (
            <Verdikt kind="warn" titel="Speicherbilanz gekippt:">
              Bei <M>{`k = ${k}`}</M> legen wir mit {gespeichert} Zahlen mehr ab als das Bild
              selbst hat ({voll}). Kompression gibt es hier nur bis <M>{`k = ${grenze}`}</M>;
              als Glättung kann ein größeres <M>{"k"}</M> trotzdem sinnvoll sein.
            </Verdikt>
          ) : k < KNICK ? (
            <Verdikt kind="fail" titel="Noch fehlt Struktur:">
              In der dritten Tafel zeichnen sich noch Gegenstände ab, nicht nur Körnung: Der
              nächste Singulärwert <M>{`\\sigma_{${k + 1}} = ${fmt(spektralFehler[k])}`}</M> ist
              groß gegen seine Nachfolger, und genau er ist nach ({num("eq:eckart-und-young-beste-approximation-von")}) der Fehler in der
              Spektralnorm. Der Energie-Anteil liegt erst bei {prozent(energie, 2)}.
            </Verdikt>
          ) : (
            <Verdikt kind="ok" titel="Hinter dem Knick:">
              Ab <M>{`k = ${KNICK}`}</M> bleibt in der Differenz im Wesentlichen das Rauschen der
              Vorlage übrig. Der Grund steht im Balkenbild: Nach{" "}
              <M>{`\\sigma_{${KNICK}}`}</M> fällt das Spektrum um den Faktor{" "}
              {fmt(svd.s[KNICK] / svd.s[KNICK - 1], 2)} ab, und die
              ersten drei Terme tragen bereits {prozent(energieAnteil(svd.s, KNICK), 2)} der
              Energie. Weitere Terme senken den Frobenius-Fehler nach ({num("eq:eckart-und-young-beste-approximation-von")}) nur noch um
              jeweils <M>{"\\sigma_{k+1}^2"}</M>, hier also um Bruchteile.
            </Verdikt>
          )}
        </div>
      )}
    </Schaetzfrage>
  );
}
