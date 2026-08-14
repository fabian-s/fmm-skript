/**
 * Lokale Hilfskomponenten aus der TSX-Fassung von §7.4 (MDX-Migration
 * 2026-08-11; Rendering unverändert übernommen, Namen beibehalten).
 */
import { useState } from "react";
import {
  ConceptLink,
  LabeledTransformCanvas,
  M,
  MD,
  Slider,
  type Vec2,
} from "../../../lib";

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

/* ------------------------- Widget 1: Orthogonalmatrix = Drehung/Spiegelung */

export function OrthoWidget() {
  const [deg, setDeg] = useState(35);
  const [mirror, setMirror] = useState(false);
  const t = (deg * Math.PI) / 180;
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
  const vecs: Vec2[] = [{ v: x, color: "#0284c7", label: "x" }];
  const det = Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];
  return (
    <div className="my-2 rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <p className="my-2 text-sm">
        Jede Orthogonalmatrix in <M>{"\\R^{2 \\times 2}"}</M> ist eine{" "}
        <ConceptLink id="rotation-matrix">Drehung</ConceptLink> oder eine{" "}
        <ConceptLink id="reflection">Spiegelung</ConceptLink>. Verstellen wir den Winkel: das
        hellblaue Bild des Einheitskreises bleibt immer der Einheitskreis, und der Vektor{" "}
        <M>{"\\bx = (2, 1)^\\top"}</M> wird nur gedreht bzw. gespiegelt, nie gestreckt oder
        gestaucht.
      </p>
      <Slider
        label="Winkel θ (°)"
        value={deg}
        onChange={setDeg}
        min={0}
        max={360}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <label className="my-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} />
        <span>Spiegelung statt Drehung</span>
      </label>
      <LabeledTransformCanvas matrix={Q} vectors={vecs} showGrid showUnitCircle />
      <div className="my-2 text-sm">
        <MD>
          {`\\bQ = \\begin{pmatrix} ${Q[0][0].toFixed(3)} & ${Q[0][1].toFixed(3)} \\\\ ${Q[1][0].toFixed(3)} & ${Q[1][1].toFixed(3)} \\end{pmatrix}, \\quad \\bQ\\bx = \\begin{pmatrix} ${Qx[0].toFixed(3)} \\\\ ${Qx[1].toFixed(3)} \\end{pmatrix}, \\quad \\det \\bQ = ${det.toFixed(0)}`}
        </MD>
        <MD>
          {`\\|\\bx\\|_2 = ${norm2(x).toFixed(4)} = \\|\\bQ\\bx\\|_2 = ${norm2(Qx).toFixed(4)}, \\qquad \\kappa_2(\\bQ) = 1`}
        </MD>
      </div>
      <p className="my-2 text-sm">
        Die Determinante verrät den Typ: <M>{"\\det \\bQ = +1"}</M> für Drehungen,{" "}
        <M>{"\\det \\bQ = -1"}</M> für Spiegelungen. Beide lassen alle Längen und damit auch
        alle <ConceptLink id="condition-number">Konditionszahlen</ConceptLink> unverändert.
      </p>
    </div>
  );
}

/* ------------------- Widget 2: ein Gram-Schmidt-Schritt, interaktiv (SVG) */

function svgArrow(
  ox: number,
  oy: number,
  S: number,
  from: V2,
  to: V2,
  color: string,
  width: number,
  dashed: boolean,
  key: string
) {
  const x1 = ox + from[0] * S;
  const y1 = oy - from[1] * S;
  const x2 = ox + to[0] * S;
  const y2 = oy - to[1] * S;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 9;
  const hx1 = x2 - h * Math.cos(ang - 0.42);
  const hy1 = y2 - h * Math.sin(ang - 0.42);
  const hx2 = x2 - h * Math.cos(ang + 0.42);
  const hy2 = y2 - h * Math.sin(ang + 0.42);
  return (
    <g key={key}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} fill={color} />
    </g>
  );
}

function GSFigure({ a1, a2 }: { a1: V2; a2: V2 }) {
  const W = 460;
  const H = 300;
  const S = 76;
  const ox = W / 2;
  const oy = H - 34;
  const n1 = Math.hypot(a1[0], a1[1]);
  const q1: V2 = [a1[0] / n1, a1[1] / n1];
  const gamma = q1[0] * a2[0] + q1[1] * a2[1];
  const proj: V2 = [gamma * q1[0], gamma * q1[1]];
  const res: V2 = [a2[0] - proj[0], a2[1] - proj[1]];
  const nr = Math.hypot(res[0], res[1]);
  const collinear = nr < 1e-9;
  const q2: V2 = collinear ? [0, 0] : [res[0] / nr, res[1] / nr];

  const px = (p: V2): V2 => [ox + p[0] * S, oy - p[1] * S];
  // Marker für den rechten Winkel am Fußpunkt des Lots
  const d = 0.14;
  const e1: V2 = gamma >= 0 ? [-q1[0], -q1[1]] : [q1[0], q1[1]];
  const c0 = proj;
  const c1: V2 = [c0[0] + d * e1[0], c0[1] + d * e1[1]];
  const c2: V2 = [c1[0] + d * q2[0], c1[1] + d * q2[1]];
  const c3: V2 = [c0[0] + d * q2[0], c0[1] + d * q2[1]];
  const label = (p: V2, text: string, color: string, dx = 6, dy = -6) => {
    const [X, Y] = px(p);
    return (
      <text x={X + dx} y={Y + dy} fontSize={12} fill={color} fontStyle="italic">
        {text}
      </text>
    );
  };
  const lineEnd1 = px([q1[0] * 3.2, q1[1] * 3.2]);
  const lineEnd2 = px([-q1[0] * 0.6, -q1[1] * 0.6]);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
    >
      {/* Gerade span(q1) */}
      <line
        x1={lineEnd2[0]}
        y1={lineEnd2[1]}
        x2={lineEnd1[0]}
        y2={lineEnd1[1]}
        stroke="#e2e8f0"
        strokeWidth={1.5}
      />
      {!collinear && (
        <>
          {/* Lot von a2 auf die Projektion und Parallelogrammseite */}
          <line
            x1={px(a2)[0]}
            y1={px(a2)[1]}
            x2={px(proj)[0]}
            y2={px(proj)[1]}
            stroke="#94a3b8"
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />
          <line
            x1={px(res)[0]}
            y1={px(res)[1]}
            x2={px(a2)[0]}
            y2={px(a2)[1]}
            stroke="#94a3b8"
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />
          <polygon
            points={[c0, c1, c2, c3].map((p) => px(p).join(",")).join(" ")}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={1}
          />
        </>
      )}
      {svgArrow(ox, oy, S, [0, 0], a1, "#64748b", 2, false, "a1")}
      {svgArrow(ox, oy, S, [0, 0], a2, "#0284c7", 2, false, "a2")}
      {svgArrow(ox, oy, S, [0, 0], q1, "#7c3aed", 3, false, "q1")}
      {!collinear && svgArrow(ox, oy, S, [0, 0], res, "#059669", 2, false, "res")}
      {!collinear && svgArrow(ox, oy, S, [0, 0], q2, "#047857", 3, false, "q2")}
      {label(a1, "a₁", "#64748b")}
      {label(a2, "a₂", "#0284c7")}
      {label(q1, "q₁", "#7c3aed", -20, 0)}
      {!collinear && label(res, "a₂ − (q₁ᵀa₂)q₁", "#059669", 8, 4)}
      {!collinear && label(q2, "q₂", "#047857", 6, 14)}
      {collinear && (
        <text x={16} y={24} fontSize={12} fill="#dc2626">
          a₂ ist kollinear zu a₁: Das Residuum verschwindet, es gibt kein q₂.
        </text>
      )}
    </svg>
  );
}

export function GramSchmidtWidget() {
  const [phi1, setPhi1] = useState(120);
  const [phi2, setPhi2] = useState(68);
  const [len2, setLen2] = useState(2.2);
  const rad = (d: number) => (d * Math.PI) / 180;
  const a1: V2 = [2.4 * Math.cos(rad(phi1)), 2.4 * Math.sin(rad(phi1))];
  const a2: V2 = [len2 * Math.cos(rad(phi2)), len2 * Math.sin(rad(phi2))];
  const q1: V2 = [a1[0] / 2.4, a1[1] / 2.4];
  const gamma = q1[0] * a2[0] + q1[1] * a2[1];
  const res: V2 = [a2[0] - gamma * q1[0], a2[1] - gamma * q1[1]];
  const nr = Math.hypot(res[0], res[1]);
  const q2: V2 = nr < 1e-9 ? [0, 0] : [res[0] / nr, res[1] / nr];
  const q1q2 = q1[0] * q2[0] + q1[1] * q2[1];
  return (
    <div className="my-2 rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <p className="my-2 text-sm">
        Die Regler steuern die beiden Ausgangsvektoren <M>{"\\ba_1"}</M> und{" "}
        <M>{"\\ba_2"}</M>; die Grafik zerlegt den zugehörigen Gram-Schmidt-Schritt in seine
        Teilschritte. Zuerst wird <M>{"\\ba_1"}</M> zu <M>{"\\bq_1"}</M> normiert. Von{" "}
        <M>{"\\ba_2"}</M> bleibt nach Abzug der Projektion auf <M>{"\\spann(\\bq_1)"}</M> nur
        der zu <M>{"\\bq_1"}</M> senkrechte Anteil übrig; normiert ergibt er{" "}
        <M>{"\\bq_2"}</M>. Probieren wir vor allem aus, was passiert, wenn{" "}
        <M>{"\\ba_2"}</M> fast parallel zu <M>{"\\ba_1"}</M> liegt: der senkrechte Anteil wird
        dann winzig, und das ist die Quelle der numerischen Probleme, die wir weiter unten
        untersuchen.
      </p>
      <Slider
        label="Winkel a₁ (°)"
        value={phi1}
        onChange={setPhi1}
        min={95}
        max={175}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Slider
        label="Winkel a₂ (°)"
        value={phi2}
        onChange={setPhi2}
        min={0}
        max={180}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Slider label="Länge a₂" value={len2} onChange={setLen2} min={0.5} max={2.8} step={0.05} />
      <GSFigure a1={a1} a2={a2} />
      <div className="my-2 text-sm">
        <MD>
          {`\\bq_1 = \\begin{pmatrix} ${q1[0].toFixed(4)} \\\\ ${q1[1].toFixed(4)} \\end{pmatrix}, \\quad R_{12} = \\bq_1^\\top \\ba_2 = ${gamma.toFixed(4)}, \\quad \\left\\| \\wt{\\bq}_2 \\right\\|_2 = ${nr.toFixed(4)}`}
        </MD>
        {nr >= 1e-9 && (
          <MD>
            {`\\bq_2 = \\begin{pmatrix} ${q2[0].toFixed(4)} \\\\ ${q2[1].toFixed(4)} \\end{pmatrix}, \\qquad \\bq_1^\\top \\bq_2 = ${Math.abs(q1q2) < 1e-14 ? "0" : q1q2.toExponential(1)}`}
          </MD>
        )}
      </div>
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

function lossColor(v: number): string {
  if (v < 1e-13) return "text-emerald-600 dark:text-emerald-400";
  if (v < 1e-7) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

export function CgsVsMgsWidget() {
  const [p, setP] = useState(4);
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
    <div className="my-2 rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <p className="my-2 text-sm">
        Als Stresstest dient uns eine <M>{"4 \\times 3"}</M>-Matrix nach Läuchli. Ihre drei
        Spalten unterscheiden sich für kleines <M>{"\\varepsilon"}</M> kaum voneinander: Die
        Matrix ist fast rangdefizient, und ihre Konditionszahl wächst wie{" "}
        <M>{"1/\\varepsilon"}</M>:
      </p>
      <MD>
        {"\\bA = \\begin{pmatrix} 1 & 1 & 1 \\\\ \\varepsilon & 0 & 0 \\\\ 0 & \\varepsilon & 0 \\\\ 0 & 0 & \\varepsilon \\end{pmatrix}, \\qquad \\kappa_2(\\bA) = \\frac{\\sqrt{3+\\varepsilon^2}}{\\varepsilon}"}
      </MD>
      <p className="my-2 text-sm">
        Die Tabelle unten wird bei jeder Reglerbewegung neu berechnet, mit Gleitkommazahlen
        doppelter Genauigkeit (
        <ConceptLink id="machine-epsilon">
          <M>{"\\eps_{\\text{mach}} \\approx 2{,}2 \\cdot 10^{-16}"}</M>
        </ConceptLink>
        ). Fassen wir die berechneten Vektoren als Spalten der Matrix{" "}
        <M>{"\\bQ_1 = (\\bq_1, \\bq_2, \\bq_3)"}</M> zusammen: wären sie exakt orthonormal, so
        wäre <M>{"\\bQ_1^\\top \\bQ_1 = \\bI"}</M>. Als Fehlermaß verwenden wir deshalb den
        betragsgrößten Eintrag von <M>{"\\bQ_1^\\top \\bQ_1 - \\bI"}</M>.
      </p>
      <Slider
        label="Exponent p"
        value={p}
        onChange={setP}
        min={1}
        max={12}
        step={0.5}
        fmt={(v) => v.toFixed(1)}
      />
      <p className="my-1 text-sm">
        <M>{`\\varepsilon = 10^{-${p.toFixed(1)}}, \\qquad \\kappa_2(\\bA) \\approx ${kappa.toExponential(2)}`}</M>
      </p>
      <table className="my-2 text-sm">
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
              <td className={`py-1 font-mono ${lossColor(v)}`}>{v.toExponential(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="my-2 text-sm">
        Erhöhen wir <M>{"p"}</M> schrittweise, sehen wir zwei sehr unterschiedliche
        Fehlerkurven. Beim klassischen Verfahren wächst der Orthogonalitätsverlust etwa
        proportional zu <M>{"\\kappa_2(\\bA)^2 \\, \\eps_{\\text{mach}}"}</M>; schon ab{" "}
        <M>{"p \\approx 8"}</M> sind die berechneten <M>{"\\bq_k"}</M> praktisch gar nicht
        mehr orthogonal. Die <em>modifizierte</em> Variante zieht jede Projektion sofort vom
        bereits aktualisierten Restvektor ab statt von der Originalspalte; ihr Fehler wächst
        nur etwa wie <M>{"\\kappa_2(\\bA) \\, \\eps_{\\text{mach}}"}</M>. Und wer volle
        Genauigkeit braucht, orthogonalisiert einfach ein zweites Mal nach: ein einziger
        Extra-Durchlauf drückt beide Varianten auf Maschinengenauigkeit (Faustregel „twice is
        enough"). Vorsicht bei <M>{"p \\gtrsim 8"}</M>: dort rundet der Rechner{" "}
        <M>{"1 + \\varepsilon^2"}</M> exakt zu <M>{"1"}</M>. Das Experiment bildet die
        Theorie dann nicht mehr sauber ab, und die Messwerte springen.
      </p>
    </div>
  );
}
