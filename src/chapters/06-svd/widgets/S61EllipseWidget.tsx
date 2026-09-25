import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MatrixInput,
  Plot,
  Schaetzfrage,
  Slider,
  TransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
  sigmaMax,
  type Mat2,
} from "../../../lib";
import { num, ref } from "../../numbers.generated";

/**
 * DIE EINE EINSICHT: Auf dem Einheitskreis hat die Streckung ‖Ax(θ)‖ ein
 * Maximum und ein Minimum, sie liegen genau 90° auseinander, und die beiden
 * Bildvektoren stehen wieder senkrecht aufeinander. Das ist das Muster, aus dem
 * in §6.2 die Singulärwertzerlegung wird.
 *
 * Der Leser tippt den Winkel der stärksten Streckung, bevor das Widget die
 * Extremrichtungen und die σ-Werte zeigt (Muster 1, predict-then-reveal): vor
 * dem Auflösen nennt das Widget weder σ₁ noch θ*; die Kurve ‖Ax(θ)‖ ist
 * absichtlich schon gezeichnet, weil das Suchen ihres Höchstpunkts die Aufgabe
 * ist.
 *
 * FARBROLLEN (Kapitel 6): orange = Streckfaktoren σ (Kurve, Extremmarken),
 * blau = rechte Singulärrichtungen v im Urbild, grün = deren Bilder Av,
 * grau = das laufende x, violett = sein Bild Ax. Rot bleibt im Kapitel den
 * Rest- und Fehlertermen vorbehalten und kommt hier nicht vor.
 *
 * PROVENIENZ: sigmaMin/maxStreckRichtung stammen aus dem Operatornorm-Widget
 * von Kapitel 3 (03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx); Tafeln
 * und Kurve kommen aus den lib-Bausteinen TransformCanvas v2 und Plot v2. Aus
 * den internen SVD-Widgets (mml-ch4) ist nichts übernommen. Alle Texte sind
 * eigenständig formuliert.
 *
 * Für eine Abbildung von R^3 nach R^2 wäre das Bild der Einheitssphäre die
 * AUSGEFÜLLTE Ellipse. Hier steht das 2x2-Analogon: Einheitskreis in R^2 → Ellipse in R^2, bei singulärem
 * A zu einer Strecke entartet.
 *
 * PRÜFSTATUS (scripts/verify/REV29/06-svd-S61Ellipse.mjs, 2026-08-29),
 * Voreinstellung A = (2 1; 0 1):
 *   σ₁ = 2,2882 = √(3+√5) bei θ* = 31,72°, σ₂ = 0,8740 = √(3−√5) bei 121,72°
 *   (Rasterlauf über 3,6 Mio. Winkel bestätigt Lage und Wert beider Extrema),
 *   v₁ = (0,851; 0,526), v₂ = (−0,526; 0,851), u₁·u₂ = 0 (< 1e−12),
 *   σ₁/σ₂ = 2,618.
 * Presets: Drehung (0,6 −0,8; 0,8 0,6) σ = 1 und 1; singulär (1 2; 2 4)
 *   σ₁ = 5, σ₂ = 0 bei θ* = 63,43°; Diagonal (2 0; 0 0,5) σ = 2 und 0,5.
 *
 * DREI-ZUSTANDS-REGEL: „singulär" und „Vielfaches einer Orthogonalmatrix" sind
 * Strukturaussagen über A und werden deshalb EXAKT auf den eingegebenen
 * Rasterwerten entschieden (istEntartet/istIsotrop, Ganzzahlarithmetik), nie
 * über eine Toleranz auf σ. Dazwischen liegen die beiden ehrlichen Zwischen-
 * stufen „fast entartet, schlecht konditioniert" und „fast ein Kreis".
 */

/** kleinste Streckung: kleinster Singulärwert einer 2x2-Matrix */
function sigmaMin(m: Mat2): number {
  const [[a, b], [c, d]] = m;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  return Math.sqrt(Math.max(0, (T - Math.sqrt(Math.max(0, T * T - 4 * det * det))) / 2));
}

/** Einheitsvektor, in dessen Richtung ‖Ax‖ maximal wird (Eigenvektor von AᵀA zum größten Eigenwert) */
function maxStreckRichtung(m: Mat2): [number, number] {
  const [[a, b], [c, d]] = m;
  const p = a * a + c * c;
  const q = a * b + c * d;
  const r = b * b + d * d;
  if (Math.abs(q) < 1e-12) return p >= r ? [1, 0] : [0, 1];
  const spur = p + r;
  const det = p * r - q * q;
  const l1 = (spur + Math.sqrt(Math.max(0, spur * spur - 4 * det))) / 2;
  const v: [number, number] = [q, l1 - p];
  const n = Math.hypot(v[0], v[1]);
  return [v[0] / n, v[1] / n];
}

/**
 * Die Eingabefelder liefern Rasterwerte mit höchstens sechs Nachkommastellen.
 * Wir rechnen die vier Einträge deshalb in ganze Zahlen um und entscheiden die
 * beiden Strukturfragen exakt statt über eine Toleranz auf σ.
 */
function ganzzahlig(m: number[][]): [number, number, number, number] {
  const g = (v: number) => Math.round((v || 0) * 1e6);
  return [g(m[0][0]), g(m[0][1]), g(m[1][0]), g(m[1][1])];
}

/** exakt singulär: det A = 0 (auf den eingegebenen Rasterwerten) */
function istEntartet(m: number[][]): boolean {
  const [a, b, c, d] = ganzzahlig(m);
  return a * d - b * c === 0;
}

/** exakt AᵀA = λI mit λ > 0, also A ein Vielfaches einer Orthogonalmatrix */
function istIsotrop(m: number[][]): boolean {
  const [a, b, c, d] = ganzzahlig(m);
  const spalte1 = a * a + c * c;
  return a * b + c * d === 0 && spalte1 === b * b + d * d && spalte1 > 0;
}

/** Exponent als Unicode-Hochzahl: Widget-Text läuft nicht durch MathJax. */
function hoch(e: number): string {
  const z = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return (e < 0 ? "⁻" : "") + String(Math.abs(e)).split("").map((d) => z[Number(d)]).join("");
}

/** σ mit drei Stellen; winzige Werte als Mantisse · 10^Exponent statt als „0,000". */
function fmtSigma(v: number): string {
  if (!Number.isFinite(v)) return fmtDe(v, 3);
  if (v === 0) return "0";
  if (v >= 0.001) return fmtDe(v, 3);
  const e = Math.floor(Math.log10(v));
  return `${fmtDe(v / 10 ** e, 2)} · 10${hoch(e)}`;
}

/** Winkel eines Vektors in Grad, auf [0, 360) normiert */
function winkelGrad(v: [number, number]): number {
  const g = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  return ((g % 360) + 360) % 360;
}

const PRESETS: { id: string; name: string; A: number[][] }[] = [
  { id: "beispiel", name: `${ref("beispiel:der-einheitskreis-wird-zur-ellipse")}`, A: [[2, 1], [0, 1]] },
  { id: "drehung", name: "Drehung", A: [[0.6, -0.8], [0.8, 0.6]] },
  { id: "diagonal", name: "Strecken und Stauchen", A: [[2, 0], [0, 0.5]] },
  { id: "singulaer", name: "singulär", A: [[1, 2], [2, 4]] },
];

export function EinheitskreisEllipse() {
  const [Aroh, setAroh] = useState<number[][]>(PRESETS[0].A);
  const [theta, setTheta] = useState(20);
  const [preset, setPreset] = useState("beispiel");

  const A: Mat2 = [
    [Aroh[0][0] || 0, Aroh[0][1] || 0],
    [Aroh[1][0] || 0, Aroh[1][1] || 0],
  ];
  const bild = (x: [number, number]): [number, number] => [
    A[0][0] * x[0] + A[0][1] * x[1],
    A[1][0] * x[0] + A[1][1] * x[1],
  ];
  const laenge = (grad: number): number => {
    const t = (grad * Math.PI) / 180;
    return Math.hypot(...bild([Math.cos(t), Math.sin(t)]));
  };

  const t = (theta * Math.PI) / 180;
  const x: [number, number] = [Math.cos(t), Math.sin(t)];
  const Ax = bild(x);
  const nAx = Math.hypot(...Ax);

  const smax = sigmaMax(A);
  const smin = sigmaMin(A);
  const xStern = maxStreckRichtung(A);
  const xSenk: [number, number] = [-xStern[1], xStern[0]];
  const AxStern = bild(xStern);
  const AxSenk = bild(xSenk);
  const thetaStern = winkelGrad(xStern);
  const thetaSenk = winkelGrad(xSenk);
  const skalarprodukt = AxStern[0] * AxSenk[0] + AxStern[1] * AxSenk[1];

  const worldHalf = Math.max(2.4, 1.25 * smax);
  const yMax = Math.max(1, 1.15 * smax);

  const setzePreset = (p: (typeof PRESETS)[number]) => {
    setPreset(p.id);
    setAroh(p.A);
  };
  const setzeMatrix = (m: number[][]) => {
    setPreset("frei");
    setAroh(m);
  };

  // Strukturaussagen exakt auf der Eingabe, Zwischenstufen über das Verhältnis.
  const entartet = istEntartet(Aroh);
  const isotrop = !entartet && istIsotrop(Aroh);
  const kappa = entartet ? Infinity : smax / smin;
  const fastEntartet = !entartet && kappa > 1e3;
  const fastIsotrop = !entartet && !isotrop && kappa < 1.02;

  return (
    <div className="text-sm">
      <Schaetzfrage
        frage={
          <>
            Bei welchem Winkel <M>{"\\theta"}</M> wird <M>{"\\bx"}</M> am stärksten gestreckt?
          </>
        }
        loesung={thetaStern}
        toleranz={5}
        // Bei exakt isotropem A ist θ* nur EINE von unendlich vielen Maximalstellen.
        labels={isotrop ? { tatsaechlich: "Eine Maximalstelle unter vielen" } : undefined}
        einheit="°"
        fmt={(v) => fmtDe(v, 1)}
        min={0}
        max={360}
        auswertung={(getippt) => {
          const g = typeof getippt === "number" ? getippt : NaN;
          if (isotrop) {
            return (
              <Verdikt kind="ok" titel="Trickfrage:">
                Bei dieser Matrix ist jede Richtung eine Maximalstelle, alle werden um{" "}
                {fmtDe(smax, 3)} gestreckt. Die Frage nach dem Winkel hat hier keine eindeutige
                Antwort.
              </Verdikt>
            );
          }
          // Das Maximum tritt zweimal auf, bei θ* und bei θ* + 180°: beide gelten
          const abw = Math.min(
            ...[-360, -180, 0, 180, 360].map((v) => Math.abs(g - thetaStern + v)),
          );
          return (
            <Verdikt kind={abw <= 5 ? "ok" : "warn"}>
              {abw <= 5 ? "Gut geschätzt. " : "Daneben. "}
              Das Maximum liegt bei {fmtDe(thetaStern, 1)}° und, weil die Kurve die Periode
              180° hat, ein zweites Mal bei {fmtDe((thetaStern + 180) % 360, 1)}°; beide
              Antworten sind richtig. Die Abweichung des Tipps beträgt {fmtDe(abw, 1)}°.
            </Verdikt>
          );
        }}
      >
        {({ aufgeloest }) => (
          <>
            <Aufgabe>
              Ziehen wir die graue Spitze auf dem Einheitskreis herum (oder schieben wir{" "}
              <M>{"\\theta"}</M>) und suchen wir die Stellung mit dem längsten violetten
              Bildpfeil.
            </Aufgabe>

            <div className="my-2 grid gap-4 sm:grid-cols-2">
              <TransformCanvas
                matrix={A}
                showGrid={false}
                showUnitCircle
                size={250}
                worldHalf={worldHalf}
                transitionMs={250}
                readout={false}
                ariaLabel={`Einheitskreis und seine Bildellipse unter A; der laufende Einheitsvektor steht bei ${fmtDe(theta, 0)} Grad, sein Bild hat die Länge ${fmtDe(nAx, 2)}.`}
                vectors={[
                  {
                    v: x,
                    color: FMM_COLORS.grau,
                    label: "x",
                    draggable: true,
                    dragConstraint: "unitCircle",
                  },
                  { v: Ax, color: FMM_COLORS.violett, label: "Ax" },
                  ...(aufgeloest
                    ? [
                        { v: xStern, color: FMM_COLORS.blau, label: "v₁" },
                        { v: xSenk, color: FMM_COLORS.blau, label: "v₂" },
                        { v: AxStern, color: FMM_COLORS.gruen, label: "Av₁" },
                        { v: AxSenk, color: FMM_COLORS.gruen, label: "Av₂" },
                      ]
                    : []),
                ]}
                onVectorChange={(i, v) => {
                  if (i === 0) setTheta(winkelGrad(v as [number, number]));
                }}
              />
              <Plot
                xLabel="θ in Grad"
                yLabel="‖Ax(θ)‖"
                xDomain={[0, 360]}
                yDomain={[0, yMax]}
                width={300}
                height={230}
                ariaLabel={`Länge des Bildvektors über dem Winkel; aktuell ${fmtDe(nAx, 2)} bei ${fmtDe(theta, 0)} Grad.`}
                series={[
                  { f: laenge, color: FMM_COLORS.orange, label: "‖Ax(θ)‖" },
                  ...(aufgeloest
                    ? [
                        { f: () => smax, color: FMM_COLORS.grau, dash: [4, 4], label: "σ₁" },
                        { f: () => smin, color: FMM_COLORS.grau, dash: [4, 4], label: "σ₂" },
                      ]
                    : []),
                ]}
                markers={[
                  { x: theta, y: nAx, color: FMM_COLORS.violett },
                  ...(aufgeloest
                    ? [
                        { x: thetaStern, y: smax, color: FMM_COLORS.orange },
                        { x: (thetaStern + 180) % 360, y: smax, color: FMM_COLORS.orange },
                        { x: thetaSenk, y: smin, color: FMM_COLORS.orange },
                        { x: (thetaSenk + 180) % 360, y: smin, color: FMM_COLORS.orange },
                      ]
                    : []),
                ]}
              />
            </div>

            <Slider
              label="Winkel θ"
              value={theta}
              onChange={setTheta}
              min={0}
              max={360}
              step={1}
              unit="°"
              accent={FMM_COLORS.grau}
              fmt={(g) => fmtDe(g, 0)}
            />

            <div className="my-2 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2">
                <M>{"\\bA ="}</M>
                <MatrixInput value={Aroh} onChange={setzeMatrix} />
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={preset === p.id ? W_BUTTON_AKTIV : W_BUTTON}
                  aria-pressed={preset === p.id}
                  onClick={() => setzePreset(p)}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <p className="my-1 font-mono text-xs">
              ‖x‖ = 1, ‖Ax(θ)‖ = {fmtDe(nAx, 3)} bei θ = {fmtDe(theta, 0)}°
            </p>

            {!aufgeloest ? (
              <Verdikt kind="neutral">
                Die Kurve wiederholt sich nach <M>{"180^\\circ"}</M>: Ein halber Umlauf ersetzt{" "}
                <M>{"\\bx"}</M> durch <M>{"-\\bx"}</M>, und das Bild wechselt dabei nur das
                Vorzeichen. Ihr Höchstpunkt ist die längste Halbachse der Ellipse.
              </Verdikt>
            ) : entartet ? (
              <Verdikt kind="warn" titel="Entartet:">
                <M>{"\\det \\bA = 0"}</M>, die kleinste Streckung ist damit exakt null: Eine ganze
                Richtung wird plattgedrückt, aus dem Kreis wird eine Strecke statt einer Ellipse,
                und die Kurve berührt zweimal die Nulllinie. Die längste Halbachse misst weiterhin{" "}
                {fmtDe(smax, 3)}. Eine Matrix mit kleinstem Singulärwert null ist singulär
                ({ref("sec:svd/motivation")}).
              </Verdikt>
            ) : fastEntartet ? (
              <Verdikt kind="warn" titel="Fast entartet:">
                Die kleinste Streckung ist {fmtSigma(smin)}, also nicht null, aber winzig gegen{" "}
                {fmtDe(smax, 3)}. Die Ellipse ist eine sehr dünne Nadel, ohne je zur Strecke zu
                werden. Das Verhältnis <M>{"\\sigma_1/\\sigma_2"}</M> = {fmtSigma(kappa)} ist die
                Konditionszahl aus {ref("sec:fehler/kondition")}: Die Matrix ist
                schlecht konditioniert, nicht singulär.
              </Verdikt>
            ) : isotrop ? (
              <Verdikt kind="ok" titel="Alle Richtungen gleich:">
                Hier ist <M>{"\\bA^\\top\\bA"}</M> ein Vielfaches der Einheitsmatrix, größte und
                kleinste Streckung fallen deshalb exakt mit {fmtDe(smax, 3)} zusammen und die Kurve
                ist flach. Aus dem Kreis wird wieder ein Kreis, und jede Richtung ist
                Maximalstelle: Die Maximalstelle in ({num("eq:eq-6-1-2")}) ist dann nicht eindeutig.
              </Verdikt>
            ) : fastIsotrop ? (
              <Verdikt kind="neutral" titel="Fast ein Kreis:">
                Größte und kleinste Streckung liegen mit {fmtDe(smax, 3)} und {fmtDe(smin, 3)} dicht
                beieinander. Die Ellipse ist fast, aber nicht ganz ein Kreis, und die Maximalstelle
                bei {fmtDe(thetaStern, 1)}° ist zwar eindeutig, an der flachen Kurve aber kaum
                abzulesen. Ein Vielfaches einer Orthogonalmatrix ist <M>{"\\bA"}</M> erst, wenn{" "}
                <M>{"\\sigma_1 = \\sigma_2"}</M> gilt.
              </Verdikt>
            ) : (
              <Verdikt kind="neutral">
                Das Maximum ist {fmtDe(smax, 3)} bei {fmtDe(thetaStern, 1)}°, das Minimum{" "}
                {fmtDe(smin, 3)} bei {fmtDe(thetaSenk, 1)}°, und die beiden Stellen liegen exakt{" "}
                <M>{"90^\\circ"}</M> auseinander. Auch die zugehörigen Bilder stehen senkrecht
                aufeinander: Ihr Skalarprodukt ist {fmtDe(skalarprodukt, 3)}. Genau dieses Muster
                zerlegt {ref("sec:svd/singulaerwerte")} in <M>{"\\bA = \\bU\\bSigma\\bV^\\top"}</M>.
              </Verdikt>
            )}
          </>
        )}
      </Schaetzfrage>
    </div>
  );
}
