import { useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledPlot,
  M,
  Schaetzfrage,
  Slider,
  Verdikt,
  W_BUTTON,
  W_MUTED,
  W_PANEL,
  fmtInt,
} from "../../../lib";

/**
 * Widgets zu §2.3 (Aufwand und Komplexität).
 *
 * S23FlopWidget — DIE EINE EINSICHT: Der Aufwand des Matrix-Vektor-Produkts
 * wächst in jeder Dimension linear, der des Matrix-Matrix-Produkts in drei
 * Dimensionen gleichzeitig; deshalb verdoppelt „alles verdoppeln" das eine
 * um den Faktor 4 und das andere um den Faktor 8.
 *
 * S23WachstumsBild — bewusst KEIN Widget (Muster 11): zwei feste Tafeln
 * derselben drei Kurven, links linear, rechts logarithmisch. Es gibt hier
 * keine interessante Parameterrichtung; der Wachstums-Explorer mit Reglern
 * steht in §2.4 (S24WachstumWidget).
 *
 * S23KonstantenWidget — DIE EINE EINSICHT: Ein O(n)-Verfahren mit großen
 * Konstanten kann ein O(n²)-Verfahren sehr lange schlagen; wie lange, schätzt
 * man reihenweise zu kurz. Muster 1 (erst tippen, dann auflösen): vor dem
 * Auflösen enden beide Kurven bei n = 300, der Schnittpunkt muss extrapoliert
 * werden.
 *
 * FARBROLLEN (Kapitel 2, s. S21Demos.tsx): grün O(log n) · blau O(n) ·
 * grau n·log n · orange O(n²) · violett O(n³) · rot O(2ⁿ), also die teuerste
 * gezeigte Klasse. Im FLOP-Zähler: blau das Matrix-Vektor-Produkt (linear in
 * jeder Dimension), orange das Matrix-Matrix-Produkt.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-02-algos/check-02-algos.mjs,
 * 2026-08-19):
 *   FLOPs bei n = d = m = 100: Matrix-Vektor 10 000 Multiplikationen +
 *     9 900 Additionen = 19 900 (Näherung 2nd = 20 000), Speicher 10 200;
 *     Matrix-Matrix 1 000 000 + 990 000 = 1 990 000 (Näherung 2ndm =
 *     2 000 000), Speicher 30 000.
 *   Schnittpunkt von 1000n + 10 000 und n²: n* = 500 + √260 000 =
 *     1009,9019513592784. Größtes n mit n² < 1000n + 10 000 ist 1009
 *     (1 018 081 < 1 019 000), ab n = 1010 gewinnt n² (1 020 100 > 1 020 000).
 *     Bei n = 100: 110 000 gegen 10 000.
 *   2^200 = 1,607 · 10^60; bei 10^18 Operationen pro Sekunde sind das
 *     5,09 · 10^34 Jahre.
 *
 * Provenienz: eigenständig implementiert, kein Code aus den privaten
 * Buch-Apps. Der frühere S23GrowthWidget (Regler „n bis") ist 2026-08-19
 * entfallen; sein Inhalt steckt im Explorer von §2.4.
 */

const GRUEN = FMM_COLORS.gruen;
const BLAU = FMM_COLORS.blau;
const ROT = FMM_COLORS.rot;
const ORANGE = FMM_COLORS.orange;

/* ------------------------------------------------------------------ */
/* FLOP-Zähler                                                         */
/* ------------------------------------------------------------------ */

function CountRow({ label, formula, value }: { label: string; formula: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span>
        {label} <M>{formula}</M>
      </span>
      <span className="font-mono tabular-nums">{fmtInt(value)}</span>
    </div>
  );
}

const START = { n: 100, d: 100, m: 100 };

export function S23FlopWidget() {
  const [n, setN] = useState(START.n);
  const [d, setD] = useState(START.d);
  const [m, setM] = useState(START.m);
  const [merk, setMerk] = useState<{ mv: number; mm: number; n: number; d: number; m: number } | null>(null);

  // Matrix-Vektor: y = A x, A in R^{n x d}
  const mvTotal = n * (2 * d - 1);
  const mvMem = n * d + d + n;
  // Matrix-Matrix: C = A B, A in R^{n x d}, B in R^{d x m}
  const mmTotal = n * m * (2 * d - 1);
  const mmMem = n * d + d * m + n * m;

  const verdoppeln = () => {
    setMerk({ mv: mvTotal, mm: mmTotal, n, d, m });
    setN(Math.min(400, n * 2));
    setD(Math.min(400, d * 2));
    setM(Math.min(400, m * 2));
  };
  const zuruecksetzen = () => {
    setMerk(null);
    setN(START.n);
    setD(START.d);
    setM(START.m);
  };

  const verdoppelt = merk !== null && n === 2 * merk.n && d === 2 * merk.d && m === 2 * merk.m;
  const fMv = merk ? mvTotal / merk.mv : 0;
  const fMm = merk ? mmTotal / merk.mm : 0;

  let verdikt: ReactNode;
  if (verdoppelt) {
    verdikt = (
      <>
        Alle drei Dimensionen verdoppelt: Das Matrix-Vektor-Produkt kostet jetzt das{" "}
        <strong style={{ color: BLAU }}>{fMv.toFixed(1).replace(".", ",")}-fache</strong>, das
        Matrix-Matrix-Produkt das{" "}
        <strong style={{ color: ORANGE }}>{fMm.toFixed(1).replace(".", ",")}-fache</strong>. Das
        sind die Faktoren <M>{"2^2"}</M> und <M>{"2^3"}</M> aus Satz 2.3.3: In{" "}
        <M>{"2nd"}</M> stecken zwei Dimensionen, in <M>{"2ndm"}</M> drei.
      </>
    );
  } else if (m === 1) {
    verdikt = (
      <>
        Mit <M>{"m = 1"}</M> ist <M>{"\\bB"}</M> ein einspaltiger Vektor, und das
        Matrix-Matrix-Produkt <em>ist</em> das Matrix-Vektor-Produkt: beide Zähler zeigen{" "}
        {fmtInt(mvTotal)} Operationen. Jede weitere Spalte kostet noch einmal dasselbe.
      </>
    );
  } else {
    verdikt = (
      <>
        Das Matrix-Matrix-Produkt kostet gerade das <strong>{fmtInt(m)}-fache</strong> des
        Matrix-Vektor-Produkts, denn es besteht aus <M>{"m"}</M> Matrix-Vektor-Produkten,
        eines pro Spalte von <M>{"\\bB"}</M> (Satz 2.3.3). Beim Speicher ist der Abstand viel
        kleiner ({fmtInt(mmMem)} gegen {fmtInt(mvMem)} Zahlen): Rechenzeit und Speicher
        wachsen nicht im selben Tempo.
      </>
    );
  }

  return (
    <div className="space-y-3">
      <Aufgabe>
        Verdoppeln wir alle drei Dimensionen und lesen ab, um welchen Faktor die beiden
        Gesamtzahlen wachsen.
      </Aufgabe>
      <div className="max-w-md">
        <Slider label="n (Zeilen von A)" value={n} onChange={(v) => setN(Math.round(v))} min={1} max={400} step={1} fmt={fmtInt} accent={BLAU} />
        <Slider label="d (Spalten von A)" value={d} onChange={(v) => setD(Math.round(v))} min={1} max={400} step={1} fmt={fmtInt} accent={BLAU} />
        <Slider label="m (Spalten von B)" value={m} onChange={(v) => setM(Math.round(v))} min={1} max={400} step={1} fmt={fmtInt} accent={ORANGE} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={W_BUTTON} onClick={verdoppeln} disabled={n >= 400 && d >= 400 && m >= 400}>
          alle Dimensionen verdoppeln
        </button>
        <button type="button" className={W_BUTTON} onClick={zuruecksetzen}>
          zurücksetzen
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`space-y-1 p-3 ${W_PANEL}`}>
          <p className="mb-2 font-medium" style={{ color: BLAU }}>
            Matrix-Vektor: <M>{"\\by = \\bA\\bx"}</M>, <M>{"\\bA \\in \\R^{n \\times d}"}</M>
          </p>
          <CountRow label="Multiplikationen" formula={"nd"} value={n * d} />
          <CountRow label="Additionen" formula={"n(d-1)"} value={n * (d - 1)} />
          <CountRow label="gesamt" formula={"n(2d-1)"} value={mvTotal} />
          <CountRow label="Näherung" formula={"2nd"} value={2 * n * d} />
          <div className="my-1 border-t border-slate-300 dark:border-slate-600" />
          <CountRow label="Speicher (Zahlen)" formula={"nd + d + n"} value={mvMem} />
        </div>
        <div className={`space-y-1 p-3 ${W_PANEL}`}>
          <p className="mb-2 font-medium" style={{ color: ORANGE }}>
            Matrix-Matrix: <M>{"\\bC = \\bA\\bB"}</M>, <M>{"\\bB \\in \\R^{d \\times m}"}</M>
          </p>
          <CountRow label="Multiplikationen" formula={"ndm"} value={n * d * m} />
          <CountRow label="Additionen" formula={"nm(d-1)"} value={n * m * (d - 1)} />
          <CountRow label="gesamt" formula={"nm(2d-1)"} value={mmTotal} />
          <CountRow label="Näherung" formula={"2ndm"} value={2 * n * d * m} />
          <div className="my-1 border-t border-slate-300 dark:border-slate-600" />
          <CountRow label="Speicher (Zahlen)" formula={"nd + dm + nm"} value={mmMem} />
        </div>
      </div>
      <Verdikt kind={verdoppelt ? "warn" : "neutral"}>{verdikt}</Verdikt>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Statische Doppeltafel: dieselben Kurven, zwei Skalen                */
/* ------------------------------------------------------------------ */

const KURVEN = [
  { label: "n", color: BLAU, f: (x: number) => x },
  { label: "n²", color: ORANGE, f: (x: number) => x * x },
  { label: "2ⁿ", color: ROT, f: (x: number) => Math.pow(2, x) },
];

/** Zwei feste Tafeln (kein Widget, Muster 11): lineare und log-Skala. */
export function S23WachstumsBild() {
  return (
    <div className="my-4 space-y-2">
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledPlot
          xLabel="n"
          yLabel="Operationen"
          series={KURVEN.map((k) => ({ f: k.f, color: k.color, label: k.label }))}
          xDomain={[1, 30]}
          yDomain={[0, 1000]}
          width={300}
          height={230}
          ariaLabel="Lineare Skala: die Kurven n und n Quadrat bleiben flach, 2 hoch n verlässt den Bildausschnitt schon bei n gleich 10 als fast senkrechte Wand."
        />
        <LabeledPlot
          xLabel="n"
          yLabel="log₁₀(Operationen)"
          series={KURVEN.map((k) => ({
            f: (x: number) => (x >= 1 ? Math.log10(k.f(x)) : NaN),
            color: k.color,
            label: k.label,
          }))}
          xDomain={[1, 30]}
          yDomain={[0, 9.5]}
          width={300}
          height={230}
          ariaLabel="Logarithmische Skala: n und n Quadrat sind flache, immer flacher werdende Kurven, 2 hoch n ist eine Gerade."
        />
      </div>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Dieselben drei Kurven, links auf linearer, rechts auf logarithmischer Skala
        (<span style={{ color: BLAU }}>n</span>, <span style={{ color: ORANGE }}>n²</span>,{" "}
        <span style={{ color: ROT }}>2ⁿ</span>). Eine Einheit nach oben bedeutet rechts den
        zehnfachen Aufwand.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Konstanten gegen Ordnung: erst tippen, dann auflösen                */
/* ------------------------------------------------------------------ */

const N_STERN = 500 + Math.sqrt(500 * 500 + 10000); // 1009,9019513592784
const N_SICHT = 300; // so weit sind die Kurven vor dem Auflösen gezeichnet

export function S23KonstantenWidget() {
  return (
    <Schaetzfrage
      variante="bereich"
      frage={
        <>
          Ein Verfahren braucht 1000n + 10 000 Operationen, ein zweites n². Ab welchem n ist
          das zweite schneller? Erst tippen, dann auflösen.
        </>
      }
      loesung={N_STERN}
      toleranz={150}
      min={0}
      max={2000}
      schritt={10}
      fmt={(v) => fmtInt(v)}
      auswertung={(guess) => {
        const g = typeof guess === "number" ? guess : 0;
        const diff = g - N_STERN;
        return (
          <Verdikt kind={Math.abs(diff) <= 150 ? "ok" : "warn"}>
            Die Kurven schneiden sich bei <M>{"n \\approx 1010"}</M>; bis <M>{"n = 1009"}</M>{" "}
            ist das <M>{"O(n^2)"}</M>-Verfahren das <em>langsamere</em>.{" "}
            {Math.abs(diff) <= 150 ? (
              <>Gut getippt ({fmtInt(g)}).</>
            ) : diff < 0 ? (
              <>
                Getippt hatten wir {fmtInt(g)}, also zu früh: Die Konstante 1000 trägt weiter,
                als sie aussieht.
              </>
            ) : (
              <>
                Getippt hatten wir {fmtInt(g)}, also zu spät: Sobald <M>{"n"}</M> die
                Konstante überholt, holt <M>{"n^2"}</M> sehr schnell auf.
              </>
            )}{" "}
            Das ist die Aussage von Bemerkung 2.3.8: Die Komplexitätsklasse sagt, wer für
            hinreichend große Probleme gewinnt, nicht wer bei unserem konkreten Problem
            gewinnt.
          </Verdikt>
        );
      }}
    >
      {({ aufgeloest, guess }) => (
        <div className="space-y-2">
          <Aufgabe>
            Verlängern wir die beiden Kurven im Kopf über <M>{"n = 300"}</M> hinaus und setzen
            den Regler dorthin, wo sie sich treffen.
          </Aufgabe>
          <LabeledPlot
            xLabel="n"
            yLabel="log₁₀(Operationen)"
            series={[
              {
                f: (x) => (aufgeloest || x <= N_SICHT ? Math.log10(1000 * x + 10000) : NaN),
                color: BLAU,
                label: "1000n + 10 000: O(n)",
              },
              {
                f: (x) => (aufgeloest || x <= N_SICHT ? Math.log10(x * x) : NaN),
                color: ORANGE,
                label: "n²: O(n²)",
              },
            ]}
            xDomain={aufgeloest ? [10, 2200] : [10, 440]}
            yDomain={[1.5, 7]}
            width={440}
            height={300}
            vlines={
              typeof guess === "number" && guess <= (aufgeloest ? 2200 : 440)
                ? [{ at: guess, color: GRUEN, dash: [5, 4], label: "unser Tipp" }]
                : []
            }
            markers={
              aufgeloest
                ? [{ x: N_STERN, y: Math.log10(N_STERN * N_STERN), color: ROT, r: 5, label: "n ≈ 1010" }]
                : []
            }
            ariaLabel={
              aufgeloest
                ? "Beide Kurven vollständig gezeichnet bis n gleich 2200; sie schneiden sich bei n ungefähr 1010."
                : "Beide Kurven brechen bei n gleich 300 ab; die blaue liegt dort noch deutlich über der orangen."
            }
          />
        </div>
      )}
    </Schaetzfrage>
  );
}
