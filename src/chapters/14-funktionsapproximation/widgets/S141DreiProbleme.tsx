import { useState, type ReactNode } from "react";
import { M, Slider } from "../../../lib";

/**
 * Die drei Problemvarianten aus §14.1 als drei Tafeln nebeneinander
 * (Ersatz fuer die Folienbilder resources/problems-approx, problems-interp,
 * problems-smooth).
 *
 * Alles ist deterministisch: die Kurven kommen aus geschlossenen Formeln,
 * die Rauschwerte z_i stammen aus einem EINMAL in node gezogenen, hier fest
 * eingebetteten Vektor (kein Math.random im Render). z_i ist auf Mittelwert
 * 0 und Streuung 1 normiert, das Rausch-Niveau sigma skaliert es.
 *
 * Verifiziert (node, gen-noise-s141.mjs):
 *  - f(x) = 0,5 + 0,28 sin(2 pi x - 0,9) laeuft auf [0,1] zwischen 0,220
 *    und 0,780, mit sigma <= 0,12 bleiben alle y_i in [0,180; 0,956] und
 *    damit im Bildausschnitt.
 *  - g(x) = 0,06 sin(5 pi x) verschwindet an allen Knoten 0; 0,2; ...; 1
 *    (numerisch < 1e-16), die gruene Kurve der mittleren Tafel interpoliert
 *    also exakt.
 *  - RMS-Abstand der Punkte zur gruenen Kurve ist exakt sigma (weil die
 *    z_i auf RMS 1 normiert sind).
 *
 * Farbcode Kapitel 14: Daten blau, Schaetzer/Interpolant gruen,
 * Problemzone (hier die Residuen) rot; die unbekannte wahre Funktion f
 * bleibt neutral grau.
 */

const DATEN = "#0072B2";
const SCHAETZER = "#009E73";
const FEHLER = "#D55E00";
const WAHR = "#64748b";

const W = 210;
const H = 150;
const PL = 24;
const PR = 8;
const PT = 10;
const PB = 18;

const sx = (x: number) => PL + x * (W - PL - PR);
const sy = (y: number) => H - PB - y * (H - PB - PT);

/** Die (unbekannte) datenerzeugende Funktion aller drei Tafeln. */
const f = (x: number) => 0.5 + 0.28 * Math.sin(2 * Math.PI * x - 0.9);

/** Stuetzstellen der Interpolationstafel: sechs gleichabstaendige Knoten. */
const KNOTEN = [0, 0.2, 0.4, 0.6, 0.8, 1];

/** Verschiebt die Interpolationstafel zwischen den Knoten, an den Knoten null. */
const g = (x: number) => 0.06 * Math.sin(5 * Math.PI * x);

/** Beobachtungsstellen und fester Rauschvektor der Glaettungstafel. */
const XOBS = [0.042, 0.125, 0.208, 0.292, 0.375, 0.458, 0.542, 0.625, 0.708, 0.792, 0.875, 0.958];
const ZOBS = [-0.245, -0.912, -0.221, -2.183, 0.304, 1.66, 0.197, -0.441, 1.272, 1.185, -0.348, -0.267];

const fmt = (v: number, d = 2) => v.toFixed(d).replace(".", ",").replace(/^-/, "−");

/** Polylinie einer Funktion ueber [0, 1] als SVG-points-String. */
function kurve(fn: (x: number) => number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    const y = fn(x);
    if (!Number.isFinite(y)) continue;
    pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

function Achsen() {
  return (
    <g>
      <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(0)} stroke="#cbd5e1" strokeWidth={1} />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(1)} stroke="#cbd5e1" strokeWidth={1} />
      <text x={sx(0)} y={H - 5} fontSize={9} fill={WAHR} textAnchor="middle">
        0
      </text>
      <text x={sx(1)} y={H - 5} fontSize={9} fill={WAHR} textAnchor="middle">
        1
      </text>
      <text x={sx(0.5)} y={H - 5} fontSize={9} fill={WAHR} textAnchor="middle">
        x
      </text>
      <text x={PL - 4} y={sy(0) + 3} fontSize={9} fill={WAHR} textAnchor="end">
        0
      </text>
      <text x={PL - 4} y={sy(1) + 3} fontSize={9} fill={WAHR} textAnchor="end">
        1
      </text>
      <text x={PL - 4} y={sy(0.5) + 3} fontSize={9} fill={WAHR} textAnchor="end">
        y
      </text>
    </g>
  );
}

function Tafel({ titel, formula, children }: { titel: string; formula: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-center text-sm font-medium">{titel}</p>
      <svg width={W} height={H} className="rounded border border-slate-300 bg-white dark:border-slate-600">
        <Achsen />
        {children}
      </svg>
      <p className="mt-1 text-center text-sm">
        <M>{formula}</M>
      </p>
    </div>
  );
}

/** Drei Tafeln: Approximation, Interpolation, Glaettung. */
export function DreiProbleme() {
  const [sigma, setSigma] = useState(0.07);
  const yObs = XOBS.map((x, i) => f(x) + sigma * ZOBS[i]);
  const rms = Math.sqrt(yObs.reduce((s, y, i) => s + (y - f(XOBS[i])) ** 2, 0) / XOBS.length);
  const groesster = yObs.reduce(
    (best, y, i) => (Math.abs(y - f(XOBS[i])) > best.d ? { d: Math.abs(y - f(XOBS[i])), x: XOBS[i] } : best),
    { d: 0, x: 0 },
  );
  return (
    <div className="my-2">
      <div className="flex flex-wrap items-start justify-center gap-4">
        <Tafel titel="Approximation" formula={"\\left\\|f - \\wh{f}\\right\\| \\approx 0"}>
          <polyline points={kurve(f)} fill="none" stroke={WAHR} strokeWidth={1.5} strokeDasharray="5 3" />
          <polyline
            points={kurve((x) => f(x) + 0.045 * Math.sin(4 * Math.PI * x + 1))}
            fill="none"
            stroke={SCHAETZER}
            strokeWidth={2}
          />
        </Tafel>
        <Tafel titel="Interpolation" formula={"\\wh{f}(x_i) = y_i \\ \\ \\forall i"}>
          <polyline points={kurve(f)} fill="none" stroke={WAHR} strokeWidth={1.5} strokeDasharray="5 3" />
          <polyline points={kurve((x) => f(x) + g(x))} fill="none" stroke={SCHAETZER} strokeWidth={2} />
          {KNOTEN.map((x) => (
            <circle key={x} cx={sx(x)} cy={sy(f(x))} r={3.5} fill={DATEN} />
          ))}
        </Tafel>
        <Tafel titel="Glättung" formula={"y_i = \\wh{f}(x_i) + \\eps_i \\ \\ \\forall i"}>
          <polyline points={kurve(f)} fill="none" stroke={SCHAETZER} strokeWidth={2} />
          {XOBS.map((x, i) => (
            <line
              key={`r${x}`}
              x1={sx(x)}
              y1={sy(f(x))}
              x2={sx(x)}
              y2={sy(yObs[i])}
              stroke={FEHLER}
              strokeWidth={1.5}
            />
          ))}
          {XOBS.map((x, i) => (
            <circle key={x} cx={sx(x)} cy={sy(yObs[i])} r={3.5} fill={DATEN} />
          ))}
        </Tafel>
      </div>
      <p className="mt-2 text-sm">
        Grau gestrichelt läuft in den ersten beiden Tafeln die Funktion <M>{"f"}</M>, die wir treffen
        wollen, grün unser <M>{"\\wh{f}"}</M>, blau die Datenpunkte. Links darf{" "}
        <M>{"\\wh{f}"}</M> überall ein
        wenig danebenliegen, muss aber nirgends genau treffen. In der Mitte ist es umgekehrt: An den
        sechs Knoten sitzt <M>{"\\wh{f}"}</M> exakt auf den Daten, dazwischen weicht es sichtbar von{" "}
        <M>{"f"}</M> ab. Rechts streuen die Beobachtungen um die grüne Kurve, die roten Strecken sind
        die Fehler <M>{"\\eps_i"}</M>.
      </p>
      <Slider
        label="σ (Rauschen)"
        value={sigma}
        onChange={setSigma}
        min={0}
        max={0.12}
        step={0.005}
        fmt={(v) => fmt(v, 3)}
      />
      <p className="mt-1 text-sm">
        {rms === 0 ? (
          "Bei σ = 0 liegen alle zwölf Punkte exakt auf der grünen Kurve, alle Residuen sind null: Die Glättungsaufgabe ist zur Interpolationsaufgabe zusammengefallen."
        ) : (
          <>
            Mittlerer Abstand der Punkte zur grünen Kurve (quadratisches Mittel):{" "}
            <span className="font-mono">{fmt(rms, 3)}</span>, der größte Einzelabstand{" "}
            <span className="font-mono" style={{ color: FEHLER }}>
              {fmt(groesster.d, 3)}
            </span>{" "}
            bei <span className="font-mono">x = {fmt(groesster.x, 3)}</span>. Solange σ &gt; 0 ist,
            wäre eine Kurve durch alle Punkte die falsche Antwort, denn sie würde das Rauschen
            mitzeichnen.
          </>
        )}
      </p>
    </div>
  );
}
