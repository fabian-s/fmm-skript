import { useState } from "react";
import { LabeledPlot, M, Slider, type Series } from "../../../lib";

/**
 * Vier Interpolanten durch dieselben drei Punkte (§14.1). Ersetzt das
 * Folienbild resources/interpolants-example und macht seine Pointe
 * nachpruefbar: An den Stuetzstellen stimmen alle vier ueberein, dazwischen
 * nicht.
 *
 * Der Aufbau (Serien plus Ein-/Ausschalter plus LabeledPlot) folgt dem
 * ManyInterpolantsWidget aus heath-ch7/src/sections/S71.tsx; die Funktionen,
 * der Regler, die Auswertung und saemtliche Texte sind eigene Arbeit.
 *
 * Verifiziert (node, check-math-s141.mjs):
 *  - alle vier Funktionen treffen (0,1), (1,2), (2,5) exakt;
 *  - f2 - f1, f3 - f1 und f4 - f1 verschwinden an genau diesen drei Stellen
 *    (f3 - f1 = x(x-1)(x-2), f4 - f1 = 0,5 sin(2 pi x));
 *  - die groesste Spannweite der vier auf [0, 2] ist 0,7499 bei x = 1,2884.
 *
 * Farbcode Kapitel 14: Daten blau, Interpolanten gruen (unterschieden durch
 * die Strichelung, nicht durch die Farbe), die Spanne bei x* rot, weil sie
 * das Problem markiert: Interpolation legt nur die Stuetzstellen fest.
 */

const DATEN = "#0072B2";
const GRUEN = "#009E73";
const ROT = "#D55E00";

const X = [0, 1, 2];
const Y = [1, 2, 5];

const f1 = (x: number) => 1 + x * x;
const f2 = (x: number) => (x < 0 || x > 2 ? NaN : x <= 1 ? x + 1 : 3 * x - 1);
const f3 = (x: number) => x ** 3 - 2 * x * x + 2 * x + 1;
const f4 = (x: number) => 1 + x * x + 0.5 * Math.sin(2 * Math.PI * x);

interface Kandidat {
  name: string;
  f: (x: number) => number;
  dash: number[];
}

const KANDIDATEN: Kandidat[] = [
  { name: "Parabel", f: f1, dash: [] },
  { name: "stückweise linear", f: f2, dash: [7, 4] },
  { name: "kubisch", f: f3, dash: [2, 3] },
  { name: "vogelwild", f: f4, dash: [10, 3, 2, 3] },
];

const fmt = (v: number, d = 2) => v.toFixed(d).replace(".", ",").replace(/^-/, "−");

/** Kleines Strichmuster als Legendensymbol. */
function Muster({ dash }: { dash: number[] }) {
  return (
    <svg width={30} height={10} className="shrink-0">
      <line
        x1={1}
        y1={5}
        x2={29}
        y2={5}
        stroke={GRUEN}
        strokeWidth={2}
        strokeDasharray={dash.length ? dash.join(" ") : undefined}
      />
    </svg>
  );
}

/** Vier Interpolanten durch (0,1), (1,2), (2,5), einzeln zuschaltbar. */
export function VierInterpolanten() {
  const [an, setAn] = useState([true, true, true, true]);
  const [xStern, setXStern] = useState(1.3);

  const sichtbar = KANDIDATEN.filter((_, i) => an[i]);
  const series: Series[] = sichtbar.map((k) => ({ f: k.f, color: GRUEN, dash: k.dash }));
  const werte = sichtbar.map((k) => k.f(xStern)).filter((v) => Number.isFinite(v));
  const hoch = werte.length ? Math.max(...werte) : NaN;
  const tief = werte.length ? Math.min(...werte) : NaN;
  const spanne = werte.length >= 2 ? hoch - tief : NaN;
  const aufKnoten = X.some((x) => Math.abs(x - xStern) < 1e-9);

  const markers = X.map((x, i) => ({ x, y: Y[i], color: DATEN }));
  if (Number.isFinite(spanne) && spanne > 1e-9) {
    markers.push({ x: xStern, y: tief, color: ROT });
    markers.push({ x: xStern, y: hoch, color: ROT });
  }

  return (
    <div className="my-2">
      <div className="mb-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {KANDIDATEN.map((k, i) => (
          <label key={k.name} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={an[i]}
              onChange={(e) => setAn(an.map((v, j) => (j === i ? e.target.checked : v)))}
            />
            <Muster dash={k.dash} />
            <span>{k.name}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <LabeledPlot
          xLabel="x"
          yLabel="y"
          series={series}
          markers={markers}
          xDomain={[-0.15, 2.15]}
          yDomain={[-0.5, 6.5]}
          width={360}
          height={250}
        />
        <div className="text-sm">
          <Slider
            label="x*"
            value={xStern}
            onChange={setXStern}
            min={0}
            max={2}
            step={0.05}
            fmt={(v) => fmt(v, 2)}
          />
          <table className="mt-2 border-collapse text-left">
            <tbody>
              {KANDIDATEN.map((k, i) => {
                const v = k.f(xStern);
                return (
                  <tr key={k.name} className={an[i] ? "" : "opacity-40"}>
                    <td className="py-0.5 pr-3">
                      <M>{`\\wh{f}_${i + 1}(x^{\\ast})`}</M>
                    </td>
                    <td className="py-0.5 font-mono">
                      {Number.isFinite(v) ? fmt(v) : "nicht definiert"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2">
            {werte.length < 2 ? (
              "Zum Vergleichen brauchen wir mindestens zwei eingeschaltete Kurven."
            ) : aufKnoten ? (
              <>
                <span style={{ color: ROT }}>Spanne 0</span>: <M>{"x^{\\ast}"}</M> ist eine
                Stützstelle, dort sind alle Interpolanten gleich.
              </>
            ) : (
              <>
                Spanne der eingeschalteten Kurven bei <M>{"x^{\\ast}"}</M>:{" "}
                <span className="font-mono" style={{ color: ROT }}>
                  {fmt(spanne)}
                </span>
                . Die beiden roten Punkte im Bild markieren sie.
              </>
            )}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm">
        Alle vier Kurven laufen durch die drei blauen Punkte, deshalb tragen sie dieselbe Farbe und
        unterscheiden sich nur in der Strichelung. Schieben wir <M>{"x^{\\ast}"}</M> von Stützstelle
        zu Stützstelle, fällt die rote Spanne jedes Mal auf null und wächst dazwischen wieder an; ihr
        größter Wert auf <M>{"[0, 2]"}</M> ist <M>{"0{,}7499"}</M> bei{" "}
        <M>{"x \\approx 1{,}288"}</M>, auf dem Raster des Reglers erreichbar bei{" "}
        <M>{"x^{\\ast} = 1{,}30"}</M>. Die Interpolationsbedingung sagt über die Zwischenwerte
        nichts.
      </p>
    </div>
  );
}
