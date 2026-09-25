/**
 * F1 — DIE EINE EINSICHT: Interpolation, zwei Anschlussbedingungen je innerem
 * Knoten und Randbedingungen bestimmen die drei kubischen Stücke zusammen.
 * FARBROLLEN: Daten blau, Spline grün, innere Knoten orange, Gleichungen neutral.
 * PROVENIENZ: SplineSystemWidget aus heath-ch7/S74 portiert; 12×12-Foliensystem
 * und Texte neu.
 * VERIFIZIERTE ZAHLEN: vier Punkte, drei kubische Stücke und 12 Bedingungen;
 * für (0,1,0,-1) ergeben sich die drei im Kommentar dokumentierten Polynome
 * und s(0..3)=0,1,0,-1 ohne Anschluss-Sprung.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
import { useMemo, useState } from "react";
import { Aufgabe, LabeledPlot, M, Slider, Verdikt } from "../../../lib";
import { BLAU, GRUEN, NEUTRAL, ORANGE, fmt, fmtExp, loeseLGS } from "./S134BSpline";

/**
 * Kubischer Spline durch vier Punkte: das 12x12-System live (§13.4).
 *
 * Portiert aus /workspace/interactive/interactive/heath-ch7/src/sections/S74.tsx
 * (SplineSystemWidget): uebernommen sind der Gauss-Loeser mit
 * Spaltenpivotierung (jetzt in S144BSpline.ts), der zeilenweise Aufbau der
 * Bedingungsmatrix, die stueckweise NaN-Maskierung der Kurven und die
 * dynamische y-Fensterung. Das System selbst ist das Folienbeispiel
 * (Punkte (0,0), (1,1), (2,0), (3,-1), drei kubische Stuecke, 12 Bedingungen)
 * statt der 8x8-Fassung des Buches; saemtliche Texte sind neu geschrieben.
 *
 * Nachgerechnet (node, 2026-08-13): natuerlicher Spline zur Voreinstellung
 * p_1(x) = 23/15 x - 8/15 x^3, p_2(x) = -6/5 + 77/15 x - 18/5 x^2 + 2/3 x^3,
 * p_3(x) = 26/5 - 67/15 x + 6/5 x^2 - 2/15 x^3; Probe s(0..3) = 0, 1, 0, -1.
 *
 * Farbcode Kapitel 13: Daten blau, Interpolant gruen (die drei Stuecke
 * unterscheiden sich durch die Strichelung, nicht durch die Farbe), Knoten
 * orange.
 * R5-Nachprüfung: scripts/verify/R5/verify-r5-claims.mjs, 2026-08-20.
 */

const KNOTEN = [0, 1, 2, 3];
const NULLZEILE = () => new Array(12).fill(0);

/** Zeile fuer p_k(x), p_k'(x) bzw. p_k''(x); k ist 0-basiert. */
const pz = (k: number, x: number) => {
  const r = NULLZEILE();
  r[4 * k] = 1;
  r[4 * k + 1] = x;
  r[4 * k + 2] = x * x;
  r[4 * k + 3] = x ** 3;
  return r;
};
const pz1 = (k: number, x: number) => {
  const r = NULLZEILE();
  r[4 * k + 1] = 1;
  r[4 * k + 2] = 2 * x;
  r[4 * k + 3] = 3 * x * x;
  return r;
};
const pz2 = (k: number, x: number) => {
  const r = NULLZEILE();
  r[4 * k + 2] = 2;
  r[4 * k + 3] = 6 * x;
  return r;
};
const minus = (a: number[], b: number[]) => a.map((v, i) => v - b[i]);

type RandTyp = "natuerlich" | "eingespannt";

export function SplineKonstruktion() {
  const [y, setY] = useState([0, 1, 0, -1]);
  const [rand, setRand] = useState<RandTyp>("natuerlich");

  const koeff = useMemo(() => {
    const A: number[][] = [];
    const b: number[] = [];
    // Interpolation: je Datenpunkt eine Bedingung (4)
    A.push(pz(0, KNOTEN[0]));
    b.push(y[0]);
    A.push(pz(0, KNOTEN[1]));
    b.push(y[1]);
    A.push(pz(1, KNOTEN[2]));
    b.push(y[2]);
    A.push(pz(2, KNOTEN[3]));
    b.push(y[3]);
    // Stetigkeit von s, s' und s'' an den beiden inneren Knoten (6)
    for (const k of [0, 1]) {
      const x = KNOTEN[k + 1];
      A.push(minus(pz(k, x), pz(k + 1, x)));
      b.push(0);
      A.push(minus(pz1(k, x), pz1(k + 1, x)));
      b.push(0);
      A.push(minus(pz2(k, x), pz2(k + 1, x)));
      b.push(0);
    }
    // Randbedingungen (2)
    if (rand === "natuerlich") {
      A.push(pz2(0, KNOTEN[0]));
      b.push(0);
      A.push(pz2(2, KNOTEN[3]));
      b.push(0);
    } else {
      A.push(pz1(0, KNOTEN[0]));
      b.push(0);
      A.push(pz1(2, KNOTEN[3]));
      b.push(0);
    }
    return loeseLGS(A, b);
  }, [y, rand]);

  if (!koeff) {
    return (
      <p className="text-sm" style={{ color: ORANGE }}>
        Für diese Eingaben ist das System singulär.
      </p>
    );
  }

  const c = koeff;
  const stueck = (k: number) => (x: number) =>
    c[4 * k] + c[4 * k + 1] * x + c[4 * k + 2] * x * x + c[4 * k + 3] * x ** 3;
  const d1 = (k: number) => (x: number) =>
    c[4 * k + 1] + 2 * c[4 * k + 2] * x + 3 * c[4 * k + 3] * x * x;
  const d2 = (k: number) => (x: number) => 2 * c[4 * k + 2] + 6 * c[4 * k + 3] * x;
  const s = (x: number) => (x < 1 ? stueck(0)(x) : x < 2 ? stueck(1)(x) : stueck(2)(x));

  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i <= 300; i++) {
    const v = s((3 * i) / 300);
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  const yLo = Math.min(-2.5, lo - 0.4);
  const yHi = Math.max(3, hi + 0.4);

  const dash: number[][] = [[], [7, 4], [2, 3]];
  const serien = [0, 1, 2].map((k) => ({
    f: (x: number) => (x >= KNOTEN[k] && x <= KNOTEN[k + 1] ? stueck(k)(x) : NaN),
    color: GRUEN,
    dash: dash[k],
  }));

  const sprung = (f: (k: number) => (x: number) => number, k: number) =>
    Math.abs(f(k)(KNOTEN[k + 1]) - f(k + 1)(KNOTEN[k + 1]));
  const maxSprung = Math.max(
    ...[0, 1].flatMap((k) => [sprung(stueck, k), sprung(d1, k), sprung(d2, k)]),
  );
  const randWert =
    rand === "natuerlich"
      ? [d2(0)(KNOTEN[0]), d2(2)(KNOTEN[3])]
      : [d1(0)(KNOTEN[0]), d1(2)(KNOTEN[3])];

  // Das Verdikt klassifiziert die didaktisch tragende Unterscheidung: welche
  // beiden Zeilen die Randbedingung stellt und was sie an den Enden erzwingt.
  // (Der Nahtsprung ist Rundungsrauschen einer Zeile des gelösten Systems und
  // deshalb kein Zustand, über den sich klassifizieren ließe.)
  const steigungAussen = [d1(0)(KNOTEN[0]), d1(2)(KNOTEN[3])];
  const kruemmungAussen = [d2(0)(KNOTEN[0]), d2(2)(KNOTEN[3])];
  const randTitel = rand === "natuerlich" ? "Natürlich:" : "Eingespannt:";
  const randSatz =
    rand === "natuerlich"
      ? `Die letzten beiden Zeilen setzen s''(0) = s''(3) = 0. Die Krümmung verschwindet an beiden Enden, der Spline läuft geradlinig aus; seine Steigung dort ist frei und steht gerade bei ${fmt(steigungAussen[0], 2)} und ${fmt(steigungAussen[1], 2)}.`
      : `Die letzten beiden Zeilen setzen s'(0) = s'(3) = 0. Der Spline läuft an beiden Enden waagerecht aus; dafür ist jetzt die Krümmung dort frei und steht bei ${fmt(kruemmungAussen[0], 2)} und ${fmt(kruemmungAussen[1], 2)}.`;

  return (
    <div className="my-2">
      <Aufgabe>Verschieben wir einen Messwert und vergleichen die beiden Randbedingungen.</Aufgabe>
      <p className="mb-2 text-sm">
        Wir halten die vier Stellen <M>{"\\xi_0 = 0, \\dots, \\xi_3 = 3"}</M> fest
        und verschieben die vier Messwerte. Das Widget baut die zwölf Zeilen genau
        so auf, wie sie im Text stehen, löst das System mit
        Spaltenpivotierung und zeichnet die drei kubischen Stücke. Alle drei sind
        Teile <em>desselben</em> Interpolanten und deshalb grün; unterschieden
        sind sie nur durch die Strichelung.
      </p>

      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
        {(["natuerlich", "eingespannt"] as RandTyp[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setRand(t)}
            className={`rounded border px-2 py-1 ${
              rand === t
                ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
                : "border-slate-300 dark:border-slate-600"
            }`}
          >
            {t === "natuerlich" ? "natürlich: s''(0) = s''(3) = 0" : "eingespannt: s'(0) = s'(3) = 0"}
          </button>
        ))}
      </div>

      <div className="mb-2 grid max-w-xl gap-x-8 sm:grid-cols-2">
        {KNOTEN.map((x, i) => (
          <Slider
            key={x}
            label={`y bei x = ${x}`}
            value={y[i]}
            onChange={(v) => setY((alt) => alt.map((w, j) => (j === i ? v : w)))}
            min={-2}
            max={2}
            step={0.25}
            fmt={(v) => fmt(v, 2)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="min-w-0">
          <LabeledPlot
            xLabel="x"
            yLabel="y"
            series={serien}
            markers={[
              ...KNOTEN.map((x, i) => ({ x, y: y[i], color: BLAU })),
              { x: 1, y: yLo + 0.05 * (yHi - yLo), color: ORANGE },
              { x: 2, y: yLo + 0.05 * (yHi - yLo), color: ORANGE },
            ]}
            xDomain={[-0.15, 3.15]}
            yDomain={[yLo, yHi]}
            width={340}
            height={250}
          />
          <p className="mt-1 max-w-[21rem] text-xs text-slate-500 dark:text-slate-400">
            Blau die Daten, grün die drei Stücke (durchgezogen, gestrichelt,
            gepunktet), orange am unteren Rand die inneren Knoten bei
            <M>{"x = 1"}</M> und <M>{"x = 2"}</M>. Wo genau ein Stück endet und
            das nächste beginnt, verrät die Kurve nicht; das Readout daneben
            misst nach.
          </p>
        </div>

        <div className="min-w-0 max-w-full grow basis-72 text-sm">
          <div className="mb-2 overflow-x-auto">
          <table className="font-mono text-xs">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="pr-2 text-left font-normal">Stück</th>
                <th className="px-2 font-normal">konst.</th>
                <th className="px-2 font-normal">
                  <M>{"x"}</M>
                </th>
                <th className="px-2 font-normal">
                  <M>{"x^2"}</M>
                </th>
                <th className="px-2 font-normal">
                  <M>{"x^3"}</M>
                </th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map((k) => (
                <tr key={k}>
                  <td className="pr-2 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    p{k + 1} auf [{KNOTEN[k]}, {KNOTEN[k + 1]}]
                  </td>
                  {[0, 1, 2, 3].map((j) => (
                    <td key={j} className="px-2 text-right" style={{ color: GRUEN }}>
                      {fmt(c[4 * k + j], 3)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <p>
            Probe an den Daten:{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              {KNOTEN.map((x) => fmt(s(x), 2)).join(" · ")}
            </span>{" "}
            gegen{" "}
            <span className="font-mono" style={{ color: BLAU }}>
              {y.map((v) => fmt(v, 2)).join(" · ")}
            </span>
          </p>
          <p className="mt-1">
            Größter Sprung von <M>{"s"}</M>, <M>{"s'"}</M> oder <M>{"s''"}</M> an
            den inneren Knoten:{" "}
            <span className="font-mono">
              {maxSprung < 1e-9 ? "0 (bis auf Rundung)" : fmtExp(maxSprung)}
            </span>
          </p>
          <p className="mt-1" style={{ color: NEUTRAL }}>
            Randbedingung: {rand === "natuerlich" ? "s''" : "s'"} an den Enden ={" "}
            <span className="font-mono">
              {randWert.map((v) => fmt(v, 3)).join(" und ")}
            </span>
          </p>
        </div>
      </div>
      <Verdikt kind={rand === "natuerlich" ? "neutral" : "ok"} titel={randTitel}>
        {randSatz} Beide Male bleiben es zwölf Bedingungen für zwölf Unbekannte,
        nur die letzten beiden Zeilen der Matrix wechseln; die Naht bei{" "}
        <M>{"x = 1"}</M> und <M>{"x = 2"}</M> bleibt in beiden Fällen
        unsichtbar, weil Wert, Steigung und Krümmung dort Zeilen desselben
        gelösten Systems sind.
      </Verdikt>
    </div>
  );
}
