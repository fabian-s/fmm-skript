import { useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, M, Slider, Verdikt, fmtDe } from "../../../lib";

/**
 * Basisdarstellungs-Rechner (§14.2, Eigenbau).
 *
 * Das Folienbeispiel (0,1), (1,2), (2,5) mit zwei Basissystemen desselben
 * Raums der Polynome vom Grad hoechstens 2:
 *   Monombasis   phi = (1, x, x^2)     -> B nicht in Dreiecksform
 *   Newton-Basis phi = (1, x, x(x-1))  -> B untere Dreiecksmatrix
 * Gezeigt werden die Matrix B, die rechte Seite y, die geloesten
 * Koeffizienten a und die Probe. Die drei y-Werte sind verschiebbar; die
 * Knoten x = 0, 1, 2 bleiben fest, damit B fest bleibt.
 *
 * Geschlossene Loesungsformeln (per node gegen eine Gauss-Elimination mit
 * Spaltenpivotierung ueber ALLE 13^3 = 2197 Reglerzustaende geprueft,
 * groesster Fehler 3,6e-15; dabei zugleich bestaetigt, dass beide Basen an
 * jeder Stelle DIESELBE Funktion liefern):
 *   Monom:  a1 = y1, a3 = (y1 - 2 y2 + y3)/2, a2 = y2 - y1 - a3
 *   Newton: a1 = y1, a2 = y2 - y1, a3 = (y1 - 2 y2 + y3)/2
 * Voreinstellung y = (1, 2, 5): a = (1, 0, 1) bzw. (1, 1, 1), beide Male
 * f(x) = 1 + x^2 mit Probe 1, 2, 5.
 *
 * Fenster [-0,2; 2,2] x [-3; 9]: der Interpolant bleibt ueber alle
 * Reglerzustaende in [-2,64; 8,64] (per node), die einzelnen Bausteine
 * a_k phi_k dagegen nicht (bis +-29); das steht in der Bildunterschrift.
 *
 * Farbcode Kapitel 14: Daten blau, Interpolant gruen, Basisfunktionen
 * orange.
 * R5-Nachprüfung: verify/R5/verify-r5-claims.mjs, 2026-08-20.
 */

const { blau: BLAU, gruen: GRUEN, orange: ORANGE } = FMM_COLORS;

const KNOTEN = [0, 1, 2];

type BasisId = "monom" | "newton";

interface Basis {
  name: string;
  tex: string[];
  phi: ((x: number) => number)[];
  loese: (y: number[]) => number[];
}

const BASEN: Record<BasisId, Basis> = {
  monom: {
    name: "Monombasis",
    tex: ["1", "x", "x^2"],
    phi: [() => 1, (x) => x, (x) => x * x],
    loese: (y) => {
      const a3 = (y[0] - 2 * y[1] + y[2]) / 2;
      return [y[0], y[1] - y[0] - a3, a3];
    },
  },
  newton: {
    name: "Newton-Basis",
    tex: ["1", "x", "x(x-1)"],
    phi: [() => 1, (x) => x, (x) => x * (x - 1)],
    loese: (y) => [y[0], y[1] - y[0], (y[0] - 2 * y[1] + y[2]) / 2],
  },
};

/** Deutsche Zahlformatierung; undefinierte Werte von unendlichen trennen. */
const fmt = fmtDe;

export function BasisRechner() {
  const [basisId, setBasisId] = useState<BasisId>("monom");
  const [y, setY] = useState([1, 2, 5]);
  const [zeigeBausteine, setZeigeBausteine] = useState(false);

  const basis = BASEN[basisId];
  const B = KNOTEN.map((x) => basis.phi.map((p) => p(x)));
  const a = basis.loese(y);
  const f = (x: number) => a.reduce((s, ak, k) => s + ak * basis.phi[k](x), 0);
  const probe = KNOTEN.map(f);
  const restMax = Math.max(...probe.map((v, i) => Math.abs(v - y[i])));

  const setYi = (i: number, v: number) =>
    setY((alt) => alt.map((w, j) => (j === i ? v : w)));

  const serien = [
    ...(zeigeBausteine
      ? basis.phi.map((p, k) => ({
          f: (x: number) => a[k] * p(x),
          color: ORANGE,
          dash: [2 + 2 * k, 3],
        }))
      : []),
    { f, color: GRUEN },
  ];

  const dreiecksform = B[0][1] === 0 && B[0][2] === 0 && B[1][2] === 0;
  const gerade = Math.abs(a[2]) < 1e-12;

  return (
    <div className="my-2">
      <Aufgabe>Verschieben wir einen Messwert und wechseln dann die Basis.</Aufgabe>
      <p className="mb-2 text-sm">
        Wir halten die Knoten <M>{"x_1 = 0,\\ x_2 = 1,\\ x_3 = 2"}</M> fest und
        verschieben die drei Messwerte. Die Matrix <M>{"\\bB"}</M> hängt nur von
        den Knoten und vom Basissystem ab, sie bleibt beim Schieben also stehen;
        nur die rechte Seite <M>{"\\by"}</M> wandert mit. Der Schalter wechselt
        das Basissystem, ohne den Ansatzraum zu ändern: Beide Basen spannen die
        Polynome vom Grad höchstens 2 auf, die grüne Kurve springt beim Wechsel
        deshalb nicht, nur die Koeffizienten <M>{"\\ba"}</M> tun es.
      </p>

      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
        {(Object.keys(BASEN) as BasisId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setBasisId(id)}
            className={`rounded border px-2 py-1 ${
              basisId === id
                ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
                : "border-slate-300 dark:border-slate-600"
            }`}
          >
            {BASEN[id].name}
          </button>
        ))}
        <label className="ml-2 flex items-center gap-1">
          <input
            type="checkbox"
            checked={zeigeBausteine}
            onChange={(e) => setZeigeBausteine(e.target.checked)}
          />
          <span>
            Bausteine <M>{"a_k \\phi_k"}</M> zeigen
          </span>
        </label>
      </div>

      {[0, 1, 2].map((i) => (
        <Slider
          key={i}
          label={`y${["₁", "₂", "₃"][i]} bei x = ${KNOTEN[i]}`}
          value={y[i]}
          onChange={(v) => setYi(i, v)}
          min={0}
          max={6}
          step={0.5}
          fmt={(v) => fmt(v, 1)}
        />
      ))}

      <div className="mt-2 flex flex-wrap items-start gap-5">
        <div>
          <LabeledPlot
            xLabel="x"
            yLabel="y"
            series={serien}
            markers={KNOTEN.map((x, i) => ({ x, y: y[i], color: BLAU }))}
            xDomain={[-0.2, 2.2]}
            yDomain={[-3, 9]}
            width={320}
            height={230}
          />
          <p className="mt-1 max-w-[20rem] text-center text-xs text-slate-500 dark:text-slate-400">
            Blau die Daten, grün der Interpolant. Sind die orangen Bausteine{" "}
            <M>{"a_k \\phi_k"}</M> eingeschaltet, summieren sie sich punktweise
            zur grünen Kurve; bei starker Reglerstellung laufen sie oben und
            unten aus dem Bild.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-1" style={{ color: ORANGE }}>
            <M>{`\\phi_1(x) = ${basis.tex[0]}, \\quad \\phi_2(x) = ${basis.tex[1]}, \\quad \\phi_3(x) = ${basis.tex[2]}`}</M>
          </p>
          <table className="mb-2 font-mono text-xs">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="pr-2 text-left font-normal">Zeile</th>
                {[1, 2, 3].map((k) => (
                  <th key={k} className="px-2 font-normal" style={{ color: ORANGE }}>
                    <M>{`\\phi_${k}(x_i)`}</M>
                  </th>
                ))}
                <th className="pl-3 font-normal" style={{ color: BLAU }}>
                  <M>{"y_i"}</M>
                </th>
              </tr>
            </thead>
            <tbody>
              {KNOTEN.map((x, i) => (
                <tr key={x}>
                  <td className="pr-2 text-slate-500 dark:text-slate-400">
                    i = {i + 1}, x = {x}
                  </td>
                  {B[i].map((b, k) => (
                    <td key={k} className="px-2 text-center" style={{ color: ORANGE }}>
                      {fmt(b, 0)}
                    </td>
                  ))}
                  <td className="pl-3 text-center" style={{ color: BLAU }}>
                    {fmt(y[i], 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            Lösung des Systems <M>{"\\bB\\ba = \\by"}</M>:{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              a = ({fmt(a[0])}; {fmt(a[1])}; {fmt(a[2])})
            </span>
          </p>
          <p className="mt-1">
            Probe:{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              {probe.map((v) => fmt(v, 1)).join(" · ")}
            </span>{" "}
            gegen{" "}
            <span className="font-mono" style={{ color: BLAU }}>
              {y.map((v) => fmt(v, 1)).join(" · ")}
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            größte Abweichung:{" "}
            {restMax === 0 ? "0 (exakt)" : restMax.toExponential(1)}
          </p>

          <p className="mt-2 max-w-[20rem]">
            {dreiecksform
              ? "B ist hier untere Dreiecksmatrix: Zeile 1 gibt a₁ direkt, dann setzen wir nach unten durch. Das ist Vorwärtssubstitution im engen Sinn."
              : "Über der Diagonalen steht in Zeile 2 eine 1, B ist also keine Dreiecksmatrix. Wir lösen mit Elimination: Zeile 1 gibt a₁, das setzen wir in die Zeilen 2 und 3 ein und räumen dann a₂ weg."}
          </p>
          <p className="mt-1 max-w-[20rem]">
            {gerade
              ? "Der quadratische Baustein hat Gewicht a₃ = 0. Der Interpolant ist eine Gerade, obwohl wir im Raum der Polynome vom Grad höchstens 2 gesucht haben."
              : `Alle drei Bausteine tragen bei; das Gewicht des quadratischen ist a₃ = ${fmt(a[2])}.`}
          </p>
        </div>
      </div>
      <Verdikt kind={dreiecksform ? "ok" : "neutral"}>
        {dreiecksform
          ? "In der Newton-Basis ist B untere Dreiecksmatrix. Wir bestimmen die Koeffizienten daher nacheinander; die grüne Kurve bleibt dabei unverändert."
          : "Die Monombasis beschreibt denselben Ansatzraum, aber B ist nicht dreieckig. Die Koeffizienten ändern sich beim Basiswechsel, nicht der Interpolant."}
      </Verdikt>
    </div>
  );
}
