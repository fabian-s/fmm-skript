import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  LabeledPlot,
  M,
  MatrixInput,
  Slider,
  TransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  fmtDe,
  sigmaMax,
} from "../../../lib";
import type { Mat2 } from "../../../lib";

/**
 * §3.3: Die Operatornorm als längste Halbachse der Bildellipse.
 *
 * DIE EINE EINSICHT: ‖A‖₂ ist ein Maximum über Richtungen. Wer den
 * Einheitsvektor x einmal ganz herumzieht, sieht den Streckfaktor ‖Ax‖₂
 * zwischen σ₂ und σ₁ pendeln – und ‖A‖₂ ist der höchste Punkt dieser Kurve
 * (Definition 3.3.1, Satz 3.3.7).
 *
 * FARBROLLEN (Kapitel-3-Tabelle): rot = alles, was am Maximum hängt, also der
 * Kreis vom Radius σ₁ = ‖A‖₂ und die Richtung x*, in der es angenommen wird;
 * blau = das Bild unter A (Ellipse, Ax, Streckfaktorkurve); grau = das Urbild,
 * also Einheitskreis, gezogener Einheitsvektor x und Achsen. Orange und
 * Violett bleiben in §3.3 unbelegt.
 *
 * INTERAKTION: x wird direkt auf dem Einheitskreis gezogen (TransformCanvas
 * mit dragConstraint "unitCircle"), der Winkelregler ist der Doppelpfad, die
 * Matrixeingabe der Präzisionsweg. Die vier Voreinstellungen sind die
 * Fallunterscheidung des Verdikts.
 *
 * PROVENIENZ: Die Idee der Kreis-Ellipse-Tafel stammt aus der internen
 * heath-ch2-App (S233, Konditions-Spielwiese); gezeichnet wird sie hier von
 * der Lib-Komponente TransformCanvas v2. Texte, Presets, Streckfaktorkurve
 * und Verdikt sind neu.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   (2 1; 0 1)        σ = 2,288246 / 0,874032, κ = 2,618, ‖A‖₁ = 2, ‖A‖∞ = 3
 *   (0,6 −0,8; 0,8 0,6) σ = 1 / 1 (Drehung), ‖A‖₁ = ‖A‖∞ = 1,4, ‖A‖_F = 1,4142
 *   (20 10; 0 10)     σ = 22,882456 / 8,740320 – exakt das Zehnfache von Zeile 1
 *   (1 2; 0,5 1)      σ = 2,5 / 0 (singulär), ‖A‖₁ = ‖A‖∞ = 3
 * Gegenprobe: das Maximum von ‖Ax‖₂ über 200 000 Winkel trifft σ₁ jeweils auf
 * 3e−10 genau; für (2 1; 0 1) liegt es bei 31,72°.
 */

/** Deutsche Dezimalzahl für MathJax-Strings: 2,288 -> "2{,}288". */
const deMath = (v: number, d = 3) => fmtDe(v, d).replace(",", "{,}");

const ROT = FMM_COLORS.rot; // Maximum: Kreis mit Radius σ₁ = ‖A‖₂ und Richtung x*
const BLAU = FMM_COLORS.blau; // Bild unter A, σ₂
const GRAU = FMM_COLORS.grau; // Urbild: Einheitskreis, x, Achsen

const asMat2 = (A: number[][]): Mat2 => [
  [A[0][0], A[0][1]],
  [A[1][0], A[1][1]],
];

/** kleinster Singulärwert einer 2×2-Matrix (stärkste Stauchung) */
function sigmaMin(m: Mat2): number {
  const [[a, b], [c, d]] = m;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  return Math.sqrt(Math.max(0, (T - Math.sqrt(Math.max(0, T * T - 4 * det * det))) / 2));
}

/** Winkel (Grad) der Richtung, in der ‖Ax‖₂ maximal wird. */
function maxStretchWinkel(m: Mat2): number {
  const [[a, b], [c, d]] = m;
  const p = a * a + c * c;
  const q = a * b + c * d;
  const r = b * b + d * d;
  if (Math.abs(q) < 1e-12) return p >= r ? 0 : 90;
  const tr = p + r;
  const det = p * r - q * q;
  const l1 = (tr + Math.sqrt(Math.max(0, tr * tr - 4 * det))) / 2;
  const g = (Math.atan2(l1 - p, q) * 180) / Math.PI;
  return ((g % 360) + 360) % 360;
}

/** Spaltensummennorm ‖A‖₁ */
const norm1 = (A: number[][]): number =>
  Math.max(Math.abs(A[0][0]) + Math.abs(A[1][0]), Math.abs(A[0][1]) + Math.abs(A[1][1]));
/** Zeilensummennorm ‖A‖∞ */
const normInf = (A: number[][]): number =>
  Math.max(Math.abs(A[0][0]) + Math.abs(A[0][1]), Math.abs(A[1][0]) + Math.abs(A[1][1]));

const VOREINSTELLUNGEN: { name: string; titel: string; m: number[][] }[] = [
  { name: "Beispiel 3.3.3", titel: "die Matrix aus dem Beispiel: σ₁ ≈ 2,29", m: [[2, 1], [0, 1]] },
  { name: "Drehung", titel: "alle Streckfaktoren sind 1", m: [[0.6, -0.8], [0.8, 0.6]] },
  { name: "zehnfach", titel: "alle Einträge ×10: die Norm wächst mit", m: [[20, 10], [0, 10]] },
  { name: "singulär", titel: "die Ellipse entartet zur Strecke", m: [[1, 2], [0.5, 1]] },
];

const gleich = (a: number[][], b: number[][]) =>
  a.every((r, i) => r.every((x, j) => Math.abs(x - b[i][j]) < 1e-9));

export function S33OperatornormWidget() {
  const [A, setA] = useState<number[][]>(VOREINSTELLUNGEN[0].m.map((r) => [...r]));
  const [winkel, setWinkel] = useState(20);

  const m = asMat2(A);
  const smax = sigmaMax(m);
  const smin = sigmaMin(m);
  const optWinkel = maxStretchWinkel(m);
  const rad = (g: number) => (g * Math.PI) / 180;
  const richtung = (g: number): [number, number] => [Math.cos(rad(g)), Math.sin(rad(g))];
  const anwenden = (v: [number, number]): [number, number] => [
    m[0][0] * v[0] + m[0][1] * v[1],
    m[1][0] * v[0] + m[1][1] * v[1],
  ];
  const x = richtung(winkel);
  const Ax = anwenden(x);
  const streck = Math.hypot(Ax[0], Ax[1]);
  const optRichtung = richtung(optWinkel);
  const AxOpt = anwenden(optRichtung);

  const worldHalf = Math.max(2.4, 1.25 * smax);
  const overlay = (toPx: (a: number, b: number) => [number, number]) => {
    if (!(smax > 1e-9)) return null;
    const [cx, cy] = toPx(0, 0);
    const [ex] = toPx(smax, 0);
    const [ox, oy] = toPx(AxOpt[0], AxOpt[1]);
    return (
      <g>
        <circle cx={cx} cy={cy} r={ex - cx} fill="none" stroke={ROT} strokeWidth={1.2} strokeDasharray="3 4" />
        <circle cx={ox} cy={oy} r={4} fill="none" stroke={ROT} strokeWidth={2} />
      </g>
    );
  };

  const singulaer = smin < 1e-9;
  const isotrop = !singulaer && Math.abs(smax - smin) < 1e-6;
  const getroffen = smax > 1e-9 && streck >= smax * 0.995;
  const art = singulaer ? "singulär" : isotrop ? "isotrop" : "generisch";

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Ziehen wir <M>{"\\bx"}</M> auf dem Einheitskreis herum, bis der blaue Bildpfeil am längsten
        ist.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        <span style={{ color: GRAU }}>grau</span> der Einheitskreis mit dem Einheitsvektor{" "}
        <M>{"\\bx"}</M>, <span style={{ color: BLAU }}>blau</span> sein Bild{" "}
        <M>{"\\bA\\bx"}</M> und die Bildellipse, <span style={{ color: ROT }}>rot</span> der Kreis
        vom Radius <M>{"\\left\\| \\bA \\right\\|_2"}</M> samt der Stelle, an der die Ellipse ihn
        berührt.
      </p>
      <div className="flex flex-wrap gap-2">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = gleich(v.m, A);
          return (
            <button
              key={v.name}
              type="button"
              title={v.titel}
              aria-pressed={aktiv}
              className={`text-xs ${aktiv ? W_BUTTON_AKTIV : W_BUTTON}`}
              onClick={() => setA(v.m.map((r) => [...r]))}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <TransformCanvas
            matrix={m}
            showGrid={false}
            showUnitCircle
            size={270}
            worldHalf={worldHalf}
            transitionMs={250}
            vectors={[
              { v: x, color: GRAU, label: "x", draggable: true, dragConstraint: "unitCircle" },
              { v: Ax, color: BLAU, label: "Ax" },
            ]}
            lines={[{ dir: optRichtung, color: ROT, dash: [5, 5], label: "x*" }]}
            onVectorChange={(index, v) => {
              if (index !== 0) return;
              const g = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
              setWinkel(Math.round(((g % 360) + 360) % 360));
            }}
            overlay={overlay}
            ariaLabel={`Einheitskreis und seine Bildellipse unter A; der aktuelle Streckfaktor ist ${fmtDe(streck, 2)}, das Maximum ${fmtDe(smax, 2)}.`}
          />
        </div>
        <div className="min-w-0">
          <LabeledPlot
            xLabel="Winkel von x (Grad)"
            yLabel="‖Ax‖₂"
            width={300}
            height={230}
            xDomain={[0, 360]}
            yDomain={[0, Math.max(0.2, smax * 1.25)]}
            series={[
              {
                f: (g: number) => {
                  const v = anwenden(richtung(g));
                  return Math.hypot(v[0], v[1]);
                },
                color: BLAU,
                label: "‖Ax‖₂",
              },
            ]}
            hlines={[
              { at: smax, color: ROT, dash: [4, 4], label: "σ₁ = ‖A‖₂" },
              { at: smin, color: GRAU, dash: [2, 4], label: "σ₂" },
            ]}
            vlines={[{ at: winkel, color: GRAU }]}
            points={[{ x: winkel, y: streck, color: BLAU, r: 4 }]}
            ariaLabel="Streckfaktor als Funktion des Winkels; das Maximum ist die Operatornorm."
          />
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-2">
          <M>{"\\bA ="}</M>
          <MatrixInput value={A} onChange={setA} />
        </div>
        <div className="min-w-[14rem] grow">
          <Slider
            label="Winkel von x"
            value={winkel}
            onChange={setWinkel}
            min={0}
            max={360}
            step={1}
            unit="°"
            accent={GRAU}
            fmt={(v) => `${Math.round(v)}`}
          />
        </div>
      </div>
      <div className={`inline-block p-2 font-mono text-xs ${W_PANEL}`}>
        <div style={{ color: BLAU }}>
          ‖Ax‖₂ = {fmtDe(streck, 3)} (aktuelle Richtung)
        </div>
        <div style={{ color: ROT }}>‖A‖₂ = σ₁ = {fmtDe(smax, 3)}</div>
        <div>σ₂ = {fmtDe(smin, 3)} (stärkste Stauchung)</div>
        <div>‖A‖₁ = {fmtDe(norm1(A), 3)} · ‖A‖∞ = {fmtDe(normInf(A), 3)}</div>
      </div>
      <Verdikt kind={getroffen ? "ok" : art === "singulär" ? "warn" : "neutral"}>
        {art === "singulär" ? (
          <>
            Die Bildellipse ist zu einer Strecke entartet: <M>{"\\sigma_2 = 0"}</M>, eine ganze
            Richtung wird auf den Nullpunkt gedrückt. Die Operatornorm merkt davon nichts, sie
            misst nur die stärkste Streckung <M>{`\\left\\| \\bA \\right\\|_2 = ${deMath(smax)}`}</M>{" "}
            (Satz 3.3.7). Die Konditionszahl <M>{"\\kappa_2(\\bA)"}</M> aus{" "}
            <a className="underline" href="#sec-3.5">
              Abschnitt 3.5
            </a>{" "}
            ist hier unendlich.
          </>
        ) : art === "isotrop" ? (
          <>
            Alle Streckfaktoren sind gleich {fmtDe(smax, 3)}: Die Kurve rechts ist eine Waagrechte,
            der Einheitskreis bleibt ein Kreis. Für die Drehung mit{" "}
            <M>{"\\left\\| \\bA \\right\\|_2 = 1"}</M> ist das Bemerkung 3.3.6; die
            Spalten- und Zeilensummennorm liegen mit {fmtDe(norm1(A), 2)} bzw.{" "}
            {fmtDe(normInf(A), 2)} daneben, denn sie messen in einer anderen Geometrie
            (Satz 3.3.4).
          </>
        ) : getroffen ? (
          <>
            Getroffen: In dieser Richtung nimmt der Streckfaktor sein Maximum{" "}
            {fmtDe(smax, 3)} an, und genau dieses Maximum ist{" "}
            <M>{"\\left\\| \\bA \\right\\|_2"}</M> (Definition 3.3.1). Die Ellipse berührt hier den
            roten Kreis, und <M>{"\\bx"}</M> zeigt in Richtung des Eigenvektors von{" "}
            <M>{"\\bA^\\top\\bA"}</M> zum größten Eigenwert{" "}
            <M>{`\\lambda_1 = ${deMath(smax * smax)}`}</M> (Satz 3.3.7).
          </>
        ) : (
          <>
            In dieser Richtung streckt <M>{"\\bA"}</M> um den Faktor {fmtDe(streck, 3)}, also{" "}
            {fmtDe((100 * streck) / smax, 0)} % des Maximums. Der Streckfaktor pendelt zwischen{" "}
            {fmtDe(smin, 3)} und {fmtDe(smax, 3)}; nur der obere dieser beiden Werte ist die
            Operatornorm (Definition 3.3.1). Zum Vergleich: ‖A‖₁ = {fmtDe(norm1(A), 2)} und
            ‖A‖∞ = {fmtDe(normInf(A), 2)} lesen dieselbe Matrix in der 1- bzw.
            <M>{"\\,\\infty"}</M>-Geometrie (Satz 3.3.4).
          </>
        )}
      </Verdikt>
    </div>
  );
}
