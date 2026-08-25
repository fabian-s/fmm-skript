/**
 * F1 — DIE EINE EINSICHT: Cox–de Boor baut eine Basisfunktion aus zwei
 * nichtnegativ gewichteten Nachbarn auf.
 * FARBROLLEN: Nachbarfunktionen violett, Ergebnis orange, Gewichtsrampen neutral.
 * PROVENIENZ: RecursionAnatomy aus heath-ch7/S743 portiert; Knotenfolge und
 * deutsche Texte neu.
 * VERIFIZIERTE ZAHLEN: Für q=1,2,3 und alle zulässigen x sind beide Rampen
 * nichtnegativ, ihr Produkt-Summenwert ist B₃^(q), und der Träger wächst um
 * genau ein Gitterintervall.
 * Geprüft mit verify-hdr.mjs, 2026-08-20.
 */
import { useState } from "react";
import { Aufgabe, LabeledPlot, M, Slider, Verdikt } from "../../../lib";
import { NEUTRAL, ORANGE, VIOLETT, bspl, fmt } from "./S134BSpline";

/**
 * Anatomie eines Cox-de-Boor-Schritts (§13.4).
 *
 * Portiert aus /workspace/interactive/interactive/heath-ch7/src/sections/S743.tsx
 * (RecursionAnatomy): uebernommen sind die Idee der beiden Gewichtsrampen als
 * eigene Serien, das Klemmen der Sonde nach einer Gradaenderung und die
 * Zerlegung des Readouts in die beiden Summanden. Farben, Knotenfolge und
 * saemtliche Texte sind neu.
 *
 * Hier steht bewusst eine einfache Knotenfolge tau_k = k - 1 ohne
 * Mehrfachknoten: der Ueberblendvorgang ist dann in Reinform zu sehen. Der
 * offene Knotenvektor des Skripts entsteht daraus, indem die Randknoten
 * zusammenrutschen (Widget zur Basis).
 */

const TAU = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const K0 = 2; // 0-basiert; im Text B_3
const ORDNUNG = ["nullten", "ersten", "zweiten", "dritten"];

export function CoxDeBoorSchritt() {
  const [qRoh, setQ] = useState(2);
  const [xRoh, setX] = useState(3.4);

  const q = Math.round(qRoh);
  const xStern = Math.min(xRoh, TAU[K0] + q + 1);

  const rampeLinks = (x: number) => (x - TAU[K0]) / (TAU[K0 + q] - TAU[K0]);
  const rampeRechts = (x: number) =>
    (TAU[K0 + q + 1] - x) / (TAU[K0 + q + 1] - TAU[K0 + 1]);

  const serien = [
    { f: (x: number) => bspl(TAU, K0, q - 1, x), color: VIOLETT, dash: [] },
    { f: (x: number) => bspl(TAU, K0 + 1, q - 1, x), color: VIOLETT, dash: [2, 3] },
    { f: rampeLinks, color: NEUTRAL, dash: [6, 4] },
    { f: rampeRechts, color: NEUTRAL, dash: [6, 4] },
    { f: (x: number) => bspl(TAU, K0, q, x), color: ORANGE, dash: [] },
  ];

  const vL = rampeLinks(xStern);
  const bL = bspl(TAU, K0, q - 1, xStern);
  const vR = rampeRechts(xStern);
  const bR = bspl(TAU, K0 + 1, q - 1, xStern);
  const ergebnis = bspl(TAU, K0, q, xStern);

  return (
    <div className="my-2">
      <Aufgabe>Verschieben wir x* und lesen die beiden gewichteten Beiträge ab.</Aufgabe>

      <div className="mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2">
        <Slider
          label="Grad q"
          value={qRoh}
          onChange={setQ}
          min={1}
          max={3}
          step={1}
          fmt={(v) => `${Math.round(v)}`}
        />
        <Slider
          label="Stelle x*"
          value={xStern}
          onChange={setX}
          min={TAU[K0]}
          max={TAU[K0] + q + 1}
          step={0.05}
          fmt={(v) => fmt(v, 2)}
        />
      </div>

      <p className="my-1 text-sm">
        <M>
          {`B_{3}^{(${q})}(x) = \\frac{x - \\tau_3}{\\tau_{${3 + q}} - \\tau_3}\\, B_{3}^{(${
            q - 1
          })}(x) + \\frac{\\tau_{${4 + q}} - x}{\\tau_{${4 + q}} - \\tau_4}\\, B_{4}^{(${q - 1})}(x)`}
        </M>
      </p>

      <div className="mb-1 text-sm">
        An der Stelle <M>{`x^* = ${fmt(xStern, 2)}`}</M>:{" "}
        <span className="font-mono" style={{ color: VIOLETT }}>
          {fmt(vL, 3)} · {fmt(bL, 3)}
        </span>{" "}
        +{" "}
        <span className="font-mono" style={{ color: VIOLETT }}>
          {fmt(vR, 3)} · {fmt(bR, 3)}
        </span>{" "}
        ={" "}
        <span className="font-mono" style={{ color: ORANGE }}>
          {fmt(ergebnis, 4)}
        </span>
      </div>

      <LabeledPlot
        xLabel="x"
        yLabel=""
        series={serien}
        markers={[
          ...TAU.slice(1, 8).map((t) => ({ x: t, y: 0, color: ORANGE })),
          { x: xStern, y: ergebnis, color: ORANGE },
        ]}
        xDomain={[1.5, 7.5]}
        yDomain={[0, 1.12]}
        width={480}
        height={230}
      />

      <Verdikt kind="ok">
        Beide Rampen gewichten nichtnegative Nachbarfunktionen. Deshalb bleibt <M>{`B_3^{(${q})}`}</M> nichtnegativ; sein Träger wächst um ein Intervall und die Glattheit reicht bis zur {ORDNUNG[q - 1]} Ableitung (13.4.3).
      </Verdikt>
    </div>
  );
}
