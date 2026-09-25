/**
 * Widgets für §7.4 „QR-Zerlegung und Gram-Schmidt-Verfahren".
 *
 * DIE EINE EINSICHT je Widget:
 *   OrthoWidget – Eine Orthogonalmatrix bildet den Einheitskreis auf sich
 *     selbst ab; die Determinante verrät, ob gedreht oder gespiegelt wird.
 *   GramSchmidtWidget – Je näher a₂ an span(a₁) liegt, desto winziger ist der
 *     senkrechte Anteil, der nach der Projektion übrig bleibt – und genau den
 *     müssen wir anschließend normieren.
 *   CgsVsMgsWidget – Das klassische Verfahren verliert die Orthogonalität wie
 *     κ₂(A)²·ε_mach, das modifizierte nur wie κ₂(A)·ε_mach; ein zweiter
 *     Durchlauf repariert beide.
 *
 * FARBROLLEN Kapitel 7 (durchgehend): Ausgangsdaten rot (a₁, a₂), das
 * Ergebnis der Orthogonalisierung grün (q₁, q₂), der abgezogene
 * Projektionsanteil violett (er ist das „Residuum" dieses Schrittes), blau
 * der transformierte Vektor Qx, orange die Konditionszahl κ₂(A).
 *
 * PROVENIENZ: Zeichen- und Rechengerüst aus der internen App
 * interactive/heath-ch3 portiert (Labels deutsch); Ziehgriffe, Schätzfrage,
 * Verdikte und alle Texte für dieses Skript neu geschrieben.
 *
 * PRÜFSTATUS: scripts/verify/REV29/07-kq-S74Local.mjs (2026-08-29), Teil von
 * `npm run verify:numbers`. Das Skript rechnet die Läuchli-Messreihe mit einer
 * eigenen Implementierung von CGS/MGS/MGS+Nachlauf nach und prüft die
 * Gram-Schmidt-Geometrie gegen die trigonometrische Formel:
 *   OrthoWidget: x = (2,1)ᵀ mit ‖x‖₂ = 2,236068; für θ = 35° liefert die
 *   Drehung Qx = (1,0647; 1,9663) und die Spiegelung Qx = (2,2119; 0,3280),
 *   beide mit ‖Qx‖₂ = 2,236067977500 (zwölf Stellen) und det = ±1.
 *   Gram-Schmidt (‖a₁‖ = 2,4, ‖a₂‖ = 2,2): ‖q̃₂‖ = ‖a₂‖·sin∠(a₁,a₂) auf vier
 *   Stellen; Voreinstellung φ₁ = 120°, φ₂ = 112° ⇒ ∠ = 8°, R₁₂ = 2,1786,
 *   ‖q̃₂‖ = 0,3062 (13,9 % von ‖a₂‖); bei ∠ = 2° nur noch 0,0768; bei ∠ = 90°
 *   ist R₁₂ = 0 und ‖q̃₂‖ = 2,2.
 *   Läuchli-Matrix, maximale Abweichung von der Orthogonalität:
 *   p = 4 → CGS 2,26e−9, MGS 2,77e−13, MGS+Nachlauf 2,22e−16;
 *   p = 6 → 5,13e−5 / 6,29e−11 / 2,22e−16;
 *   p = 8 → 5,00e−1 / 7,07e−9 / 5,55e−17 (κ₂(A) = 1,73e8).
 *   Überraschend, deshalb hier notiert: ab p ≳ 8 SINKT der gemessene
 *   MGS-Fehler wieder (7,07e−9 → 7,07e−13 bei p = 12), weil dort 1 + ε²
 *   bereits zu 1 rundet und das Experiment die Theorie nicht mehr abbildet.
 *   Der Verdikt-Zweig sagt das ausdrücklich.
 */
import { useState } from "react";
import {
  Aufgabe,
  ConceptLink,
  DragHandle,
  FMM_COLORS,
  LabeledTransformCanvas,
  M,
  MD,
  Schaetzfrage,
  Slider,
  Verdikt,
  clamp,
  fmtDe,
  useDrag,
  type Vec2,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/* ---------------------------------------------------------------- Helfer */

type V2 = [number, number];

function dot(u: number[], v: number[]): number {
  let s = 0;
  for (let i = 0; i < u.length; i++) s += u[i] * v[i];
  return s;
}

function norm2(v: number[]): number {
  return Math.sqrt(dot(v, v));
}

const rad = (d: number) => (d * Math.PI) / 180;

/* ------------------------- Widget 1: Orthogonalmatrix = Drehung/Spiegelung */

export function OrthoWidget() {
  const [deg, setDeg] = useState(35);
  const [mirror, setMirror] = useState(false);
  const t = rad(deg);
  const Q: [[number, number], [number, number]] = mirror
    ? [
        [Math.cos(t), Math.sin(t)],
        [Math.sin(t), -Math.cos(t)],
      ]
    : [
        [Math.cos(t), -Math.sin(t)],
        [Math.sin(t), Math.cos(t)],
      ];
  const x: V2 = [2, 1];
  const Qx: V2 = [Q[0][0] * x[0] + Q[0][1] * x[1], Q[1][0] * x[0] + Q[1][1] * x[1]];
  const vecs: Vec2[] = [
    { v: x, color: FMM_COLORS.grau, label: "x" },
    { v: Qx, color: FMM_COLORS.blau, label: "Qx" },
  ];
  const det = Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];
  return (
    <div className="my-2">
      <Aufgabe>
        Drehen wir am Winkel und schalten zwischendurch auf Spiegelung um: Was passiert mit dem
        hellblauen Bild des Einheitskreises, was mit det Q?
      </Aufgabe>
      <Slider label="Winkel θ (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} fmt={(v) => fmtDe(v, 0) + "°"} />
      <label className="my-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} className="accent-sky-600" />
        <span>Spiegelung statt Drehung</span>
      </label>
      <LabeledTransformCanvas
        matrix={Q}
        vectors={vecs}
        showGrid
        showUnitCircle
        size={280}
        transitionMs={250}
        ariaLabel={`Das Bild des Einheitskreises unter einer ${mirror ? "Spiegelung" : "Drehung"} um ${fmtDe(deg, 0)} Grad; er bleibt der Einheitskreis.`}
      />
      <div className="my-2 text-sm">
        <MD>
          {`\\bQ = \\begin{pmatrix} ${Q[0][0].toFixed(3)} & ${Q[0][1].toFixed(3)} \\\\ ${Q[1][0].toFixed(3)} & ${Q[1][1].toFixed(3)} \\end{pmatrix}, \\quad \\det \\bQ = ${det.toFixed(0)}`}
        </MD>
        <MD>{`\\bQ\\bx = \\begin{pmatrix} ${Qx[0].toFixed(3)} \\\\ ${Qx[1].toFixed(3)} \\end{pmatrix}`}</MD>
        <MD>
          {`\\|\\bx\\|_2 = \\|\\bQ\\bx\\|_2 = ${norm2(Qx).toFixed(4)}, \\quad \\kappa_2(\\bQ) = 1`}
        </MD>
      </div>
      {det > 0 ? (
        <Verdikt kind="ok" titel="Drehung:">
          <M>{"\\det \\bQ = +1"}</M>, die Orientierung bleibt erhalten. Längen ändern sich nicht
          ({ref("lemma:qr-eigenschaften-von-orthogonalmatrizen")} (ii)), also auch keine{" "}
          <ConceptLink id="condition-number">Konditionszahl</ConceptLink>:{" "}
          <M>{"\\kappa_2(\\bQ) = 1"}</M> nach {ref("lemma:qr-eigenschaften-von-orthogonalmatrizen")} (iii). Deshalb kann kein noch so langes
          Produkt solcher Matrizen ein Problem schlechter konditioniert machen.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Spiegelung:">
          <M>{"\\det \\bQ = -1"}</M> – die Orientierung kippt, ein Umlaufsinn dreht sich um.
          Für die Numerik ist das gleichgültig: Auch hier gilt{" "}
          <M>{"\\left\\|\\bQ\\bx\\right\\|_2 = \\left\\|\\bx\\right\\|_2"}</M> und{" "}
          <M>{"\\kappa_2(\\bQ) = 1"}</M> ({ref("lemma:qr-eigenschaften-von-orthogonalmatrizen")}). Beide Typen sind für uns gleich brauchbar,
          und genau diese beiden Typen gibt es im <M>{"\\R^2"}</M> auch nur.
        </Verdikt>
      )}
    </div>
  );
}

/* ------------------- Widget 2: ein Gram-Schmidt-Schritt, interaktiv (SVG) */

// Alle Vektoren liegen in der oberen Halbebene (φ₁ ∈ [95°, 175°],
// φ₂ ∈ [0°, 180°], Längen ≤ 2,4), deshalb sitzt der Ursprung unten mittig.
const GW = 420;
const GH = 280;
const GS_SCALE = 74;
const GOX = GW / 2;
const GOY = GH - 28;
const gpx = (p: V2): V2 => [GOX + p[0] * GS_SCALE, GOY - p[1] * GS_SCALE];

function svgArrow(from: V2, to: V2, color: string, width: number, key: string) {
  const [x1, y1] = gpx(from);
  const [x2, y2] = gpx(to);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 9;
  const hx1 = x2 - h * Math.cos(ang - 0.42);
  const hy1 = y2 - h * Math.sin(ang - 0.42);
  const hx2 = x2 - h * Math.cos(ang + 0.42);
  const hy2 = y2 - h * Math.sin(ang + 0.42);
  return (
    <g key={key}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill={color} />
    </g>
  );
}

const A1_LEN = 2.4;

export function GramSchmidtWidget() {
  // Voreinstellung: 8° zwischen den Spalten – der interessante, nicht der
  // gutmütige Fall (der senkrechte Anteil ist nur 13,9 % von ‖a₂‖).
  const [phi1, setPhi1] = useState(120);
  const [phi2, setPhi2] = useState(112);
  const [len2, setLen2] = useState(2.2);

  const a1: V2 = [A1_LEN * Math.cos(rad(phi1)), A1_LEN * Math.sin(rad(phi1))];
  const a2: V2 = [len2 * Math.cos(rad(phi2)), len2 * Math.sin(rad(phi2))];
  const q1: V2 = [a1[0] / A1_LEN, a1[1] / A1_LEN];
  const gamma = q1[0] * a2[0] + q1[1] * a2[1];
  const proj: V2 = [gamma * q1[0], gamma * q1[1]];
  const res: V2 = [a2[0] - proj[0], a2[1] - proj[1]];
  const nr = Math.hypot(res[0], res[1]);
  const kollinear = nr < 1e-9;
  const q2: V2 = kollinear ? [0, 0] : [res[0] / nr, res[1] / nr];
  const q1q2 = q1[0] * q2[0] + q1[1] * q2[1];
  const winkel = Math.abs(phi1 - phi2);
  const anteil = nr / len2; // = sin(Winkel)

  const zieh = useDrag<"a1" | "a2">({
    feld: { x0: 0, y0: 0, w: GW, h: GH },
    welt: {
      x0: -GOX / GS_SCALE,
      x1: (GW - GOX) / GS_SCALE,
      y0: (GOY - GH) / GS_SCALE,
      y1: GOY / GS_SCALE,
    },
    onDrag: ([px, py], id) => {
      const grad = (Math.atan2(py, px) * 180) / Math.PI;
      if (id === "a1") {
        setPhi1(clamp(Math.round(grad), 95, 175));
      } else {
        setPhi2(clamp(Math.round(grad), 0, 180));
        setLen2(clamp(Math.round(Math.hypot(px, py) * 20) / 20, 0.5, 2.8));
      }
    },
  });

  // Marker für den rechten Winkel am Fußpunkt des Lots
  const d = 0.14;
  const e1: V2 = gamma >= 0 ? [-q1[0], -q1[1]] : [q1[0], q1[1]];
  const c0 = proj;
  const c1: V2 = [c0[0] + d * e1[0], c0[1] + d * e1[1]];
  const c2: V2 = [c1[0] + d * q2[0], c1[1] + d * q2[1]];
  const c3: V2 = [c0[0] + d * q2[0], c0[1] + d * q2[1]];
  const label = (p: V2, text: string, color: string, dx = 6, dy = -6) => {
    const [X, Y] = gpx(p);
    return (
      <text x={X + dx} y={Y + dy} fontSize={12} fill={color} fontStyle="italic" pointerEvents="none">
        {text}
      </text>
    );
  };
  const lineEnd1 = gpx([q1[0] * 3.2, q1[1] * 3.2]);
  const lineEnd2 = gpx([-q1[0] * 0.6, -q1[1] * 0.6]);

  return (
    <div className="my-2">
      <Aufgabe>
        Ziehen wir <M>{"\\ba_2"}</M> auf <M>{"\\ba_1"}</M> zu (oder nehmen die Regler) und
        beobachten, was von <M>{"\\ba_2"}</M> nach Abzug der Projektion übrig bleibt.
      </Aufgabe>
      <svg
        viewBox={`0 0 ${GW} ${GH}`}
        width={GW}
        height={GH}
        className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        role="img"
        aria-label={`Ein Gram-Schmidt-Schritt für zwei Vektoren im Winkel ${fmtDe(winkel, 0)} Grad; der zu q₁ senkrechte Anteil von a₂ hat die Länge ${fmtDe(nr, 3)}.`}
        {...zieh.svgProps}
      >
        {/* Gerade span(q1) */}
        <line
          x1={lineEnd2[0]}
          y1={lineEnd2[1]}
          x2={lineEnd1[0]}
          y2={lineEnd1[1]}
          stroke="var(--w-grid)"
          strokeWidth={1.5}
        />
        {!kollinear && (
          <>
            {/* Lot von a2 auf die Projektion und Parallelogrammseite */}
            <line
              x1={gpx(a2)[0]}
              y1={gpx(a2)[1]}
              x2={gpx(proj)[0]}
              y2={gpx(proj)[1]}
              stroke="var(--w-axis)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
            <line
              x1={gpx(res)[0]}
              y1={gpx(res)[1]}
              x2={gpx(a2)[0]}
              y2={gpx(a2)[1]}
              stroke="var(--w-axis)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
            <polygon
              points={[c0, c1, c2, c3].map((p) => gpx(p).join(",")).join(" ")}
              fill="none"
              stroke="var(--w-axis)"
              strokeWidth={1}
            />
          </>
        )}
        {svgArrow([0, 0], a1, FMM_COLORS.rot, 2, "a1")}
        {svgArrow([0, 0], a2, FMM_COLORS.rot, 2, "a2")}
        {svgArrow([0, 0], proj, FMM_COLORS.violett, 2, "proj")}
        {svgArrow([0, 0], q1, FMM_COLORS.gruen, 3.2, "q1")}
        {!kollinear && svgArrow([0, 0], res, FMM_COLORS.gruen, 1.8, "res")}
        {!kollinear && svgArrow([0, 0], q2, FMM_COLORS.gruen, 3.2, "q2")}
        {label(a1, "a₁", FMM_COLORS.rot, -22, 0)}
        {label(a2, "a₂", FMM_COLORS.rot)}
        {label(q1, "q₁", FMM_COLORS.gruen, -20, 14)}
        {label(proj, "(q₁ᵀa₂)q₁", FMM_COLORS.violett, -12, 20)}
        {!kollinear && label(q2, "q₂", FMM_COLORS.gruen, 10, 12)}
        {!kollinear && label(res, "a₂ − (q₁ᵀa₂)q₁", FMM_COLORS.gruen, 8, 4)}
        {kollinear && (
          <text x={16} y={24} fontSize={12} fill={FMM_COLORS.rot}>
            a₂ ist kollinear zu a₁: Das Residuum verschwindet, es gibt kein q₂.
          </text>
        )}
        <DragHandle x={gpx(a1)[0]} y={gpx(a1)[1]} r={5} farbe={FMM_COLORS.rot} aktiv={zieh.dragging === "a1"} {...zieh.handleProps("a1")} />
        <DragHandle x={gpx(a2)[0]} y={gpx(a2)[1]} r={5} farbe={FMM_COLORS.rot} aktiv={zieh.dragging === "a2"} {...zieh.handleProps("a2")} />
      </svg>
      <div className="mt-2">
        <Slider label="Winkel a₁ (°)" value={phi1} onChange={setPhi1} min={95} max={175} step={1} accent={FMM_COLORS.rot} fmt={(v) => fmtDe(v, 0) + "°"} />
        <Slider label="Winkel a₂ (°)" value={phi2} onChange={setPhi2} min={0} max={180} step={1} accent={FMM_COLORS.rot} fmt={(v) => fmtDe(v, 0) + "°"} />
        <Slider label="Länge a₂" value={len2} onChange={setLen2} min={0.5} max={2.8} step={0.05} accent={FMM_COLORS.rot} fmt={(v) => fmtDe(v, 2)} />
      </div>
      <div className="my-2 text-sm">
        <MD>
          {`\\cgreen{\\bq_1} = \\begin{pmatrix} ${q1[0].toFixed(4)} \\\\ ${q1[1].toFixed(4)} \\end{pmatrix}, \\quad R_{12} = \\cgreen{\\bq_1}^\\top \\ba_2 = ${gamma.toFixed(4)}`}
        </MD>
        <MD>{`\\left\\| \\wt{\\bq}_2 \\right\\|_2 = ${nr.toFixed(4)}`}</MD>
        {!kollinear && (
          <MD>
            {`\\cgreen{\\bq_2} = \\begin{pmatrix} ${q2[0].toFixed(4)} \\\\ ${q2[1].toFixed(4)} \\end{pmatrix}, \\qquad \\cgreen{\\bq_1}^\\top \\cgreen{\\bq_2} = ${Math.abs(q1q2) < 1e-14 ? "0" : q1q2.toExponential(1)}`}
          </MD>
        )}
      </div>
      {kollinear ? (
        <Verdikt kind="fail" titel="Kein zweiter Vektor:">
          <M>{"\\ba_2"}</M> liegt exakt auf <M>{"\\spann(\\bq_1)"}</M>, das Residuum ist null und
          lässt sich nicht normieren. Die Spalten von <M>{"\\bA"}</M> sind dann linear abhängig,{" "}
          <M>{"\\rang(\\bA) < n"}</M>, und Gram-Schmidt bricht ab.
        </Verdikt>
      ) : anteil < 0.2 ? (
        <Verdikt kind="warn" titel="Hier fängt der Ärger an:">
          Bei <span className="font-mono">{fmtDe(winkel, 0)}°</span> zwischen den Spalten bleibt
          von <M>{"\\ba_2"}</M> nach Abzug der Projektion nur{" "}
          <span className="font-mono">{fmtDe(nr, 3)}</span> übrig, also{" "}
          <span className="font-mono">{fmtDe(100 * anteil, 1)} %</span> seiner Länge. Genau diesen
          Rest teilen wir gleich durch seine eigene Länge – und mit ihm alle Rundungsfehler, die
          in der Differenz <M>{"\\ba_2 - R_{12}\\bq_1"}</M> stecken. Genau hier verliert das
          klassische Gram-Schmidt-Verfahren in Gleitkommaarithmetik seine Orthogonalität.
        </Verdikt>
      ) : anteil > 0.95 ? (
        <Verdikt kind="ok" titel="Der bequeme Fall:">
          Die beiden Spalten stehen fast senkrecht aufeinander (
          <span className="font-mono">{fmtDe(winkel, 0)}°</span>),{" "}
          <M>{`R_{12} = ${gamma.toFixed(3).replace(".", "{,}")}`}</M> ist klein und der Rest
          praktisch <M>{"\\ba_2"}</M> selbst. Hier ist an Gram-Schmidt nichts auszusetzen; die
          Probleme kommen erst, wenn wir die Vektoren zusammenschieben.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral">
          Der senkrechte Anteil hat die Länge <span className="font-mono">{fmtDe(nr, 3)}</span>,
          das ist <M>{"\\left\\|\\ba_2\\right\\|_2 \\sin(\\angle(\\ba_1, \\ba_2))"}</M> mit{" "}
          <span className="font-mono">{fmtDe(winkel, 0)}°</span>. Er wird zu{" "}
          <M>{"\\cgreen{\\bq_2}"}</M> normiert, und <M>{"R_{12}"}</M> ={" "}
          <span className="font-mono">{fmtDe(gamma, 3)}</span> protokolliert, wie viel von{" "}
          <M>{"\\cgreen{\\bq_1}"}</M> in <M>{"\\ba_2"}</M> steckte.
        </Verdikt>
      )}
    </div>
  );
}

/* --------------- Widget 3: klassisches vs. modifiziertes Gram-Schmidt --- */

function lauchliCols(eps: number): number[][] {
  return [
    [1, eps, 0, 0],
    [1, 0, eps, 0],
    [1, 0, 0, eps],
  ];
}

function cgs(cols: number[][]): number[][] {
  const Q: number[][] = [];
  for (let k = 0; k < cols.length; k++) {
    const v = cols[k].slice();
    for (let j = 0; j < k; j++) {
      const r = dot(Q[j], cols[k]); // klassisch: benutzt die ORIGINAL-Spalte
      for (let i = 0; i < v.length; i++) v[i] -= r * Q[j][i];
    }
    const n = norm2(v);
    Q.push(v.map((vi) => vi / n));
  }
  return Q;
}

function mgs(cols: number[][]): number[][] {
  const V = cols.map((c) => c.slice());
  const Q: number[][] = [];
  for (let k = 0; k < V.length; k++) {
    const n = norm2(V[k]);
    const q = V[k].map((vi) => vi / n);
    Q.push(q);
    for (let j = k + 1; j < V.length; j++) {
      const r = dot(q, V[j]); // modifiziert: benutzt die bereits AKTUALISIERTE Spalte
      for (let i = 0; i < V[j].length; i++) V[j][i] -= r * q[i];
    }
  }
  return Q;
}

function orthLoss(Q: number[][]): number {
  let worst = 0;
  for (let i = 0; i < Q.length; i++) {
    for (let j = i; j < Q.length; j++) {
      const target = i === j ? 1 : 0;
      worst = Math.max(worst, Math.abs(dot(Q[i], Q[j]) - target));
    }
  }
  return worst;
}

/** Ampel aus der \cb*-Palette (die Stufe steht zusätzlich als Zahl daneben). */
function lossColor(v: number): string {
  if (v < 1e-13) return FMM_COLORS.gruen;
  if (v < 1e-7) return FMM_COLORS.orange;
  return FMM_COLORS.rot;
}

/** Verbleibende korrekte Stellen aus einem Orthogonalitätsfehler. */
const stellen = (v: number) => (v <= 0 ? 16 : Math.max(0, Math.min(16, -Math.log10(v))));

/** „1{,}73 \\cdot 10^{4}" – deutsche Mantisse mit Zehnerpotenz für MathJax. */
function zehnerpotenz(v: number): string {
  const e = Math.floor(Math.log10(v));
  const m = v / Math.pow(10, e);
  return `${m.toFixed(2).replace(".", "{,}")} \\cdot 10^{${e}}`;
}

function CgsVsMgsTafel({ p, setP }: { p: number; setP: (v: number) => void }) {
  const eps = Math.pow(10, -p);
  const cols = lauchliCols(eps);
  const lossCgs = orthLoss(cgs(cols));
  const lossMgs = orthLoss(mgs(cols));
  const lossRe = orthLoss(mgs(mgs(cols)));
  const kappa = Math.sqrt(3 + eps * eps) / eps;
  const rows: [string, number][] = [
    ["klassisches Gram-Schmidt", lossCgs],
    ["modifiziertes Gram-Schmidt", lossMgs],
    ["MGS + eine Re-Orthogonalisierung", lossRe],
  ];
  return (
    <div className="my-2 text-sm">
      <MD>
        {"\\bA = \\begin{pmatrix} 1 & 1 & 1 \\\\ \\varepsilon & 0 & 0 \\\\ 0 & \\varepsilon & 0 \\\\ 0 & 0 & \\varepsilon \\end{pmatrix}, \\qquad \\corange{\\kappa_2(\\bA)} = \\frac{\\sqrt{3+\\varepsilon^2}}{\\varepsilon}"}
      </MD>
      <Aufgabe>
        Schieben wir den Exponenten <M>{"p"}</M> hoch und lesen ab, welche der drei Zeilen zuerst
        aus dem Ruder läuft.
      </Aufgabe>
      <Slider label="Exponent p" value={p} onChange={setP} min={1} max={12} step={0.5} fmt={(v) => fmtDe(v, 1)} />
      <p className="my-1 text-sm">
        <M>{`\\varepsilon = 10^{-${p.toFixed(1).replace(".", "{,}")}}, \\qquad \\corange{\\kappa_2(\\bA)} \\approx ${zehnerpotenz(kappa)}`}</M>
      </p>
      <table className="my-2 text-sm">
        <caption className="sr-only">
          Maximale Abweichung von der Orthogonalität für klassisches Gram-Schmidt, modifiziertes
          Gram-Schmidt und modifiziertes Gram-Schmidt mit Nachlauf, beim aktuellen Exponenten p.
        </caption>
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400">
            <th className="py-1 pr-6 font-normal">Verfahren</th>
            <th className="py-1 font-normal">maximale Abweichung von Orthogonalität</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, v]) => (
            <tr key={name}>
              <td className="py-1 pr-6">{name}</td>
              <td className="py-1 font-mono tabular-nums" style={{ color: lossColor(v) }}>
                {v.toExponential(2).replace(".", ",").replace("-", "−")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
        Fehlermaß ist der betragsgrößte Eintrag von <M>{"\\bQ_1^\\top \\bQ_1 - \\bI"}</M>, gerechnet
        in doppelter Genauigkeit (
        <ConceptLink id="machine-epsilon">
          <M>{"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}</M>
        </ConceptLink>
        ).
      </p>
      {p >= 8 ? (
        <Verdikt kind="fail" titel="Das klassische Verfahren ist ausgestiegen:">
          Bei <M>{`p = ${p.toFixed(1).replace(".", "{,}")}`}</M> liegt der Fehler von CGS bei{" "}
          <span className="font-mono">{lossCgs.toExponential(1)}</span> – von Orthogonalität keine
          Spur mehr, es bleiben <span className="font-mono">{fmtDe(stellen(lossCgs), 1)}</span>{" "}
          Stellen. MGS steht bei <span className="font-mono">{lossMgs.toExponential(1)}</span> (
          <span className="font-mono">{fmtDe(stellen(lossMgs), 1)}</span> Stellen), der zweite
          Durchlauf bei <span className="font-mono">{lossRe.toExponential(1)}</span>. Vorsicht ab
          hier: Der Rechner rundet <M>{"1 + \\varepsilon^2"}</M> bereits zu <M>{"1"}</M> (siehe{" "}
          <a className="underline" href="#sec-7.3">
            {ref("sec:kq/normalengleichungen")}
          </a>
          ), die Messwerte springen und bilden die Theorie nicht mehr sauber ab.
        </Verdikt>
      ) : lossCgs > 1e-8 ? (
        <Verdikt kind="warn" titel="Die Schere geht auf:">
          CGS verliert <span className="font-mono">{lossCgs.toExponential(1)}</span>, MGS nur{" "}
          <span className="font-mono">{lossMgs.toExponential(1)}</span> – ein Faktor{" "}
          <span className="font-mono">{(lossCgs / lossMgs).toExponential(1)}</span> bei
          identischer Eingabe. Der Fehler des klassischen Verfahrens wächst wie{" "}
          <M>{"\\corange{\\kappa_2(\\bA)}^2\\,\\eps_{\\text{mach}}"}</M>, der des modifizierten
          nur wie <M>{"\\corange{\\kappa_2(\\bA)}\\,\\eps_{\\text{mach}}"}</M>.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Noch sind alle drei brauchbar:">
          Bei <M>{`\\corange{\\kappa_2(\\bA)} \\approx ${zehnerpotenz(kappa)}`}</M>{" "}
          liegen alle drei Verfahren nahe an der Maschinengenauigkeit (
          <span className="font-mono">{lossCgs.toExponential(1)}</span>,{" "}
          <span className="font-mono">{lossMgs.toExponential(1)}</span>,{" "}
          <span className="font-mono">{lossRe.toExponential(1)}</span>). Der Unterschied zeigt
          sich erst, wenn die Spalten näher zusammenrücken.
        </Verdikt>
      )}
    </div>
  );
}

export function CgsVsMgsWidget() {
  const [p, setP] = useState(4);
  return (
    <Schaetzfrage
      variante="auswahl"
      frage={
        <>
          Als Stresstest dient eine <M>{"4 \\times 3"}</M>-Matrix nach Läuchli, deren Spalten sich
          für kleines <M>{"\\varepsilon"}</M> kaum unterscheiden. Bei{" "}
          <M>{"\\varepsilon = 10^{-8}"}</M> ist <M>{"\\kappa_2(\\bA) \\approx 1{,}7 \\cdot 10^8"}</M>.
          Wie weit ist das klassische Gram-Schmidt-Verfahren dort von der Orthogonalität entfernt?
        </>
      }
      optionen={[
        { id: "e9", text: "etwa 10⁻⁹" },
        { id: "e5", text: "etwa 10⁻⁵" },
        { id: "e0", text: "etwa 0,5 – gar nicht mehr orthogonal" },
      ]}
      loesung="e0"
      onAufloesen={() => setP(8)}
      verdeckt={
        <Verdikt kind="neutral" titel="Auflösung:">
          Der Regler steht jetzt auf <M>{"p = 8"}</M>: Das klassische Verfahren landet bei{" "}
          <span className="font-mono">5,0·10⁻¹</span> und ist damit unbrauchbar, das modifizierte
          bei <span className="font-mono">7,1·10⁻⁹</span>. Ein zweiter Durchlauf drückt beide
          zurück auf Maschinengenauigkeit („twice is enough").
        </Verdikt>
      }
    >
      <CgsVsMgsTafel p={p} setP={setP} />
    </Schaetzfrage>
  );
}
