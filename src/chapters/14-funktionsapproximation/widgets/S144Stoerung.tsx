import { useMemo, useState } from "react";
import { LabeledPlot, M, Slider } from "../../../lib";
import {
  BLAU,
  GRUEN,
  NEUTRAL,
  ORANGE,
  ROT,
  bsplD2,
  bsplRand,
  fmt,
  knotenvektor,
  loeseLGS,
} from "./S144BSpline";

/**
 * Ein Datenpunkt wandert: globales Polynom gegen kubischen Spline (§14.4).
 *
 * Portiert aus /workspace/interactive/interactive/heath-ch7/src/sections/S743.tsx
 * (BandedLocality) und S74.tsx (newtonEval): uebernommen sind die
 * Kollokationsmatrix in der B-Spline-Basis samt natuerlichen Randzeilen, die
 * Balkendarstellung der Koeffizientenaenderungen, die beiden
 * Besetzungsmuster-Raster und die Newton-Auswertung des Interpolationspolynoms.
 * Daten, Farben und saemtliche Texte sind neu; das Widget ersetzt die
 * Folienabbildungen interp-poly-2 und interp-spline-2.
 *
 * Nachgerechnet (node, 2026-08-13) fuer die Voreinstellung (Punkt 5 bei
 * 5. Punkt bei x = 5, delta = 1): max |Delta| beim Spline 1,000 und beim Polynom 2,320;
 * weiter als zwei Knoten entfernt 0,037 gegen 2,320. Die
 * Koeffizientenaenderungen fallen mit rund Faktor 3,7 je Knotenabstand
 * (1,732 / 0,464 / 0,124 / 0,031 / 0,010). Die Kollokationsmatrix hat je
 * Zeile hoechstens q + 1 = 4 Eintraege ungleich null.
 */

const XS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const YS = [0.2, 0.9, 1.4, 1.6, 1.5, 1.2, 0.9, 0.7, 0.6];
const Q = 3;
const RAND = 9;
const TAU = knotenvektor(XS, Q);
const K = TAU.length - Q - 1; // m + q = 11

const bD2 = (k: number, x: number) => bsplD2(TAU, k, Q, Math.min(x, RAND - 1e-9));

/** Kollokationsmatrix: natuerliche Randzeile, neun Datenzeilen, Randzeile. */
function kollokation(): number[][] {
  const A: number[][] = [];
  A.push(Array.from({ length: K }, (_, k) => bD2(k, XS[0])));
  for (const x of XS) {
    A.push(Array.from({ length: K }, (_, k) => bsplRand(TAU, k, Q, x, RAND)));
  }
  A.push(Array.from({ length: K }, (_, k) => bD2(k, XS[8])));
  return A;
}

const A_KOLLOKATION = kollokation();

/** Interpolationspolynom vom Grad 8 in Newton-Darstellung. */
function newtonPolynom(ys: number[]): (x: number) => number {
  const n = XS.length;
  const c = ys.slice();
  for (let k = 1; k < n; k++) {
    for (let i = n - 1; i >= k; i--) c[i] = (c[i] - c[i - 1]) / (XS[i] - XS[i - k]);
  }
  return (x: number) => {
    let v = c[n - 1];
    for (let i = n - 2; i >= 0; i--) v = v * (x - XS[i]) + c[i];
    return v;
  };
}

function splineKoeffizienten(ys: number[]): number[] | null {
  return loeseLGS(A_KOLLOKATION, [0, ...ys, 0]);
}

export function StoerungVergleich() {
  const [jRoh, setJ] = useState(5);
  const [delta, setDelta] = useState(1);

  const j = Math.round(jRoh);

  const { daten, cVor, cNach, pVor, pNach } = useMemo(() => {
    const gestoert = YS.map((v, i) => (i === j - 1 ? v + delta : v));
    return {
      daten: gestoert,
      cVor: splineKoeffizienten(YS),
      cNach: splineKoeffizienten(gestoert),
      pVor: newtonPolynom(YS),
      pNach: newtonPolynom(gestoert),
    };
  }, [j, delta]);

  if (!cVor || !cNach) {
    return (
      <p className="text-sm" style={{ color: ROT }}>
        Die Kollokationsmatrix ist singulär.
      </p>
    );
  }

  const spline = (c: number[]) => (x: number) =>
    c.reduce((acc, ck, k) => acc + ck * bsplRand(TAU, k, Q, x, RAND), 0);
  const sVor = spline(cVor);
  const sNach = spline(cNach);

  let lo = Infinity;
  let hi = -Infinity;
  let maxS = 0;
  let maxP = 0;
  let fernS = 0;
  let fernP = 0;
  for (let i = 0; i <= 400; i++) {
    const x = XS[0] + (8 * i) / 400;
    for (const v of [sVor(x), sNach(x), pVor(x), pNach(x)]) {
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    const ds = Math.abs(sNach(x) - sVor(x));
    const dp = Math.abs(pNach(x) - pVor(x));
    maxS = Math.max(maxS, ds);
    maxP = Math.max(maxP, dp);
    if (Math.abs(x - XS[j - 1]) > 2) {
      fernS = Math.max(fernS, ds);
      fernP = Math.max(fernP, dp);
    }
  }
  const yLo = Math.min(-1, lo - 0.3);
  const yHi = Math.max(2.2, hi + 0.3);

  const dc = cVor.map((v, i) => Math.abs(cNach[i] - v));
  const dcMax = Math.max(...dc, 1e-12);
  const spuerbar = dc.filter((v) => v > 0.01 * Math.max(Math.abs(delta), 1e-9)).length;

  const marker = XS.map((x, i) => ({
    x,
    y: daten[i],
    color: i === j - 1 ? ROT : BLAU,
  }));

  const tafel = (
    titel: string,
    vorher: (x: number) => number,
    nachher: (x: number) => number,
  ) => (
    <div>
      <p className="mb-1 text-sm font-semibold">{titel}</p>
      <LabeledPlot
        xLabel="x"
        yLabel="y"
        series={[
          { f: vorher, color: "#94a3b8", dash: [5, 4] },
          { f: nachher, color: GRUEN },
        ]}
        markers={marker}
        xDomain={[0.8, 9.2]}
        yDomain={[yLo, yHi]}
        width={330}
        height={210}
      />
    </div>
  );

  return (
    <div className="my-2">
      <p className="mb-2 text-sm">
        Neun Datenpunkte, einer davon lässt sich verschieben. Beide Tafeln zeigen
        denselben Vorgang mit verschiedenen Ansatzräumen: links das
        Interpolationspolynom vom Grad 8, rechts der natürliche kubische Spline
        zum Gitter der Datenpunkte. Grau gestrichelt liegt jeweils der
        ungestörte Interpolant darunter, grün der neue, rot markiert ist der
        verschobene Punkt.
      </p>

      <div className="mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2">
        <Slider
          label="Punkt j"
          value={j}
          onChange={setJ}
          min={1}
          max={9}
          step={1}
          fmt={(v) => `${Math.round(v)}`}
        />
        <Slider
          label="Verschiebung δ"
          value={delta}
          onChange={setDelta}
          min={-2}
          max={2}
          step={0.25}
          fmt={(v) => fmt(v, 2)}
        />
      </div>

      <div className="flex flex-wrap gap-5">
        {tafel("Polynom vom Grad 8", pVor, pNach)}
        {tafel("Natürlicher kubischer Spline", sVor, sNach)}
      </div>

      <div className="mt-2 text-sm">
        <p>
          Größte Änderung des Interpolanten: Polynom{" "}
          <span className="font-mono" style={{ color: ROT }}>
            {fmt(maxP, 3)}
          </span>
          , Spline{" "}
          <span className="font-mono" style={{ color: GRUEN }}>
            {fmt(maxS, 3)}
          </span>{" "}
          bei einer Verschiebung von{" "}
          <span className="font-mono">{fmt(Math.abs(delta), 2)}</span>.
        </p>
        <p className="mt-1">
          Weiter als zwei Knoten von <M>{`x_{${j}}`}</M> entfernt: Polynom{" "}
          <span className="font-mono" style={{ color: ROT }}>
            {fmt(fernP, 3)}
          </span>
          , Spline{" "}
          <span className="font-mono" style={{ color: GRUEN }}>
            {fmt(fernS, 3)}
          </span>
          .{" "}
          {delta === 0
            ? "Bei δ = 0 ändert sich naturgemäß nichts."
            : fernP > 4 * fernS
              ? "Beim Spline ist nach wenigen Knoten nichts mehr davon übrig, beim Polynom bleibt bis zum Rand hin etwas zu sehen."
              : "Nahe am Rand hat das Polynom weniger Hebel als in der Mitte, deshalb fällt der Abstand zwischen beiden Spalten hier kleiner aus."}
        </p>
      </div>

      <p className="mt-3 mb-1 text-sm font-semibold">
        Welche B-Spline-Koeffizienten reagieren?
      </p>
      <div className="max-w-md">
        {dc.map((v, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-10 shrink-0 text-right">
              <M>{`a_{${i + 1}}`}</M>
            </span>
            <div className="h-3 flex-1 rounded-sm bg-slate-200 dark:bg-slate-700">
              <div
                className="h-3 rounded-sm"
                style={{
                  width: `${Math.max(0, (100 * v) / dcMax)}%`,
                  background: ORANGE,
                }}
              />
            </div>
            <span className="w-16 shrink-0 font-mono">{fmt(v, 3)}</span>
          </div>
        ))}
      </div>
      <p className="mt-1 max-w-[34rem] text-sm">
        <span className="font-mono">{spuerbar}</span> von {K} Koeffizienten
        ändern sich um mehr als ein Prozent der Verschiebung. Der Balkensatz
        hat eine Spitze und zwei Flanken, und die Flanken fallen je
        Knotenabstand auf rund ein Viertel. Wichtig ist dabei, dass sie nicht
        abbrechen: Auch die äußersten Koeffizienten bewegen sich noch, nur eben
        um sehr wenig.
      </p>

      <p className="mt-3 mb-1 text-sm font-semibold">Besetzungsmuster</p>
      <div className="flex flex-wrap items-start gap-8">
        <div>
          <div className="mb-1 text-xs" style={{ color: NEUTRAL }}>
            B-Spline-Kollokation, {K} × {K}
          </div>
          <div
            className="inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600"
            style={{ gridTemplateColumns: `repeat(${K}, 13px)` }}
          >
            {A_KOLLOKATION.flatMap((zeile, r) =>
              zeile.map((v, s) => (
                <div
                  key={`${r}-${s}`}
                  style={{
                    width: 13,
                    height: 13,
                    background: Math.abs(v) > 1e-12 ? ORANGE : undefined,
                  }}
                  className={Math.abs(v) > 1e-12 ? "" : "bg-white dark:bg-slate-900"}
                />
              )),
            )}
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs" style={{ color: NEUTRAL }}>
            Monombasis (Vandermonde), 9 × 9
          </div>
          <div
            className="inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600"
            style={{ gridTemplateColumns: "repeat(9, 13px)" }}
          >
            {XS.flatMap((x, r) =>
              XS.map((_, s) => (
                <div
                  key={`${r}-${s}`}
                  style={{
                    width: 13,
                    height: 13,
                    background: Math.abs(Math.pow(x, s)) > 1e-12 ? ROT : undefined,
                  }}
                  className={Math.abs(Math.pow(x, s)) > 1e-12 ? "" : "bg-white dark:bg-slate-900"}
                />
              )),
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 max-w-[34rem] text-sm">
        Links liegen die Einträge ungleich null in einem schmalen Streifen um
        die Diagonale, höchstens <M>{"q + 1 = 4"}</M> je Zeile; genau so viele
        Basisfunktionen sind an einer Stelle überhaupt beteiligt. Rechts ist
        kein einziges Feld leer. Der Unterschied kostet beim Lösen den Faktor,
        den Bemerkung 14.4.14 ausrechnet, und zur schlechten Kondition der
        Monombasis kommt er noch hinzu.
      </p>
    </div>
  );
}
