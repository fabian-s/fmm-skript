/**
 * F1 — DIE EINE EINSICHT: Cox–de Boor baut eine Basisfunktion aus zwei
 * nichtnegativ gewichteten Nachbarn auf.
 * FARBROLLEN: Nachbarfunktionen violett, Ergebnis orange, Gewichtsrampen neutral.
 * PROVENIENZ: RecursionAnatomy aus heath-ch7/S743 portiert; Knotenfolge und
 * deutsche Texte neu.
 * VERIFIZIERTE ZAHLEN: Für q=1,2,3 und alle zulässigen x sind beide Rampen
 * nichtnegativ, ihr Produkt-Summenwert ist B₃^(q), und der Träger wächst um
 * genau ein Gitterintervall; die drei Verdikt-Zweige (Überlappung, einseitig,
 * außerhalb) sind über den Regler alle erreichbar.
 * Geprüft mit verify-hdr.mjs, 2026-08-20, und mit
 * scripts/verify/REV29/13-funktionsapproximation-S134BSplineBasis.mjs, 2026-08-29.
 */
import { useState } from "react";
import { Aufgabe, LabeledPlot, M, Slider, Verdikt } from "../../../lib";
import { NEUTRAL, ORANGE, VIOLETT, bspl, fmt } from "./S134BSpline";
import { num } from "../../numbers.generated";

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
    // Die beiden Rampen tragen verschiedene Strichmuster: die ganze Erklärung
    // („links wächst, rechts fällt") hängt daran, sie unterscheiden zu können.
    { f: rampeLinks, color: NEUTRAL, dash: [9, 4] },
    { f: rampeRechts, color: NEUTRAL, dash: [1, 4] },
    { f: (x: number) => bspl(TAU, K0, q, x), color: ORANGE, dash: [] },
  ];

  const LEGENDE: { dash: number[]; farbe: string; text: string }[] = [
    { dash: [], farbe: VIOLETT, text: `linker Nachbar B₃⁽${q - 1}⁾` },
    { dash: [2, 3], farbe: VIOLETT, text: `rechter Nachbar B₄⁽${q - 1}⁾` },
    { dash: [9, 4], farbe: NEUTRAL, text: "Gewichtsrampe links (wächst)" },
    { dash: [1, 4], farbe: NEUTRAL, text: "Gewichtsrampe rechts (fällt)" },
    { dash: [], farbe: ORANGE, text: `Ergebnis B₃⁽${q}⁾` },
  ];

  const vL = rampeLinks(xStern);
  const bL = bspl(TAU, K0, q - 1, xStern);
  const vR = rampeRechts(xStern);
  const bR = bspl(TAU, K0 + 1, q - 1, xStern);
  const ergebnis = bspl(TAU, K0, q, xStern);

  // Zustandsklassen entlang des x*-Reglers: der Träger von B_3^(q) ist
  // [tau_3, tau_{4+q}], der Überlappungsbereich beider Nachbarn (tau_4, tau_{3+q}).
  const linksTraegt = bL > 1e-12;
  const rechtsTraegt = bR > 1e-12;
  const lage: "ausserhalb" | "ueberlappung" | "einseitig" =
    ergebnis <= 1e-12 ? "ausserhalb" : linksTraegt && rechtsTraegt ? "ueberlappung" : "einseitig";
  const titel =
    lage === "ausserhalb"
      ? "Außerhalb des Trägers:"
      : lage === "ueberlappung"
        ? "Beide Rampen tragen:"
        : "Nur ein Nachbar trägt:";
  const deutung =
    lage === "ausserhalb"
      ? `Bei x* = ${fmt(xStern, 2)} verschwinden beide Nachbarfunktionen, das Ergebnis ist deshalb exakt null: Hier endet der Träger [${fmt(TAU[K0], 0)}, ${fmt(TAU[K0 + q + 1], 0)}].`
      : lage === "ueberlappung"
        ? `Bei x* = ${fmt(xStern, 2)} sind beide Nachbarn ungleich null. Die linke Rampe gewichtet mit ${fmt(vL, 3)}, die rechte mit ${fmt(vR, 3)}; zusammen ergeben die beiden Summanden ${fmt(ergebnis, 4)}. Genau in diesem Überlappungsbereich entsteht die Glattheit.`
        : `Bei x* = ${fmt(xStern, 2)} ist nur der ${linksTraegt ? "linke" : "rechte"} Nachbar ungleich null. Das Ergebnis ${fmt(ergebnis, 4)} kommt allein aus ${linksTraegt ? "seinem wachsenden" : "seinem fallenden"} Beitrag; der andere Summand ist null.`;

  return (
    <div className="my-2">
      <Aufgabe>Verschieben wir x* und lesen die beiden gewichteten Beiträge ab.</Aufgabe>

      <div className="mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2">
        <Slider
          label="Grad q"
          value={qRoh}
          onChange={(v) => {
            const neu = Math.round(v);
            setQ(neu);
            // x* mitziehen: sonst zeigt der Regler den geklemmten Wert, während
            // der interne Zustand noch der alte ist, und x* springt zurück,
            // sobald der Grad wieder steigt.
            setX((alt) => Math.min(alt, TAU[K0] + neu + 1));
          }}
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

      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: NEUTRAL }}>
        {LEGENDE.map((e) => (
          <span key={e.text} className="inline-flex items-center gap-1.5">
            <svg width={28} height={8} viewBox="0 0 28 8" className="h-2 w-7 shrink-0" aria-hidden="true">
              <line
                x1={1}
                y1={4}
                x2={27}
                y2={4}
                stroke={e.farbe}
                strokeWidth={2}
                strokeDasharray={e.dash.length ? e.dash.join(" ") : undefined}
              />
            </svg>
            <span style={{ color: e.farbe }}>{e.text}</span>
          </span>
        ))}
      </p>

      <Verdikt kind={lage === "ueberlappung" ? "ok" : "neutral"} titel={titel}>
        {deutung} Beide Rampen gewichten nichtnegative Nachbarfunktionen; deshalb
        bleibt {`B₃ vom Grad ${q}`} nichtnegativ, sein Träger wächst um ein
        Intervall und die Glattheit reicht bis zur {ORDNUNG[q - 1]} Ableitung (
        {num("eq:erweiterte-knotenfolge-und-b-splines-2")}).
      </Verdikt>
    </div>
  );
}
