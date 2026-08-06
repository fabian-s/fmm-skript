/**
 * §7.5 Konstruktion von Q: Givens-Rotationen und Householder-Spiegelungen.
 * Quelle: Folien 07-kq.Rmd, Abschnitt „Konstruktion von Q" (Z. 415–503).
 * Widget-Code recycelt aus interactive/heath-ch3 (§3.5), Labels deutsch.
 */
import { useId, useState } from "react";
import {
  ConceptLink,
  EnvBlock,
  ExpandedReading,
  LabeledTransformCanvas,
  M,
  MD,
  maxAbsCoord,
  Proof,
  PStep,
  Slider,
  type Vec2,
} from "../../lib";

/* ---------------------------------------------------------------- Helfer */

type V2 = [number, number];
const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
const scl = (a: V2, s: number): V2 => [a[0] * s, a[1] * s];
const dot2 = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];

function fmt(x: number): string {
  if (Math.abs(x) < 5e-10) return "0";
  if (Math.abs(x - Math.round(x)) < 5e-10) return String(Math.round(x));
  return x.toFixed(4);
}

/* -------------------------------------------- Widget 1: Givens, live */

function GivensWidget() {
  const [a1, setA1] = useState(4);
  const [a2, setA2] = useState(3);
  const r = Math.hypot(a1, a2);
  const degeneriert = r < 1e-9;
  const c = degeneriert ? 1 : a1 / r;
  const s = degeneriert ? 0 : a2 / r;
  const G: [[number, number], [number, number]] = [
    [c, s],
    [-s, c],
  ];
  const theta = (Math.atan2(a2, a1) * 180) / Math.PI;
  const wh = Math.max(2, maxAbsCoord([a1, a2], [r, 0])) * 1.25;
  const vecs: Vec2[] = [
    { v: [a1, a2], color: "#0072B2", label: "a" }, // FMM-blau
    { v: [r, 0], color: "#E69F00", label: "Ga" }, // FMM-orange (= α)
  ];
  return (
    <div className="my-2 rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <p className="my-2 text-sm">
        Stellen wir die beiden Komponenten von <M>{"\\ba"}</M> ein. Daraus berechnet das
        Widget <M>{"c"}</M> und <M>{"s"}</M> wie in Satz 7.5.2 und wendet die Rotation an:
        blau ist <M>{"\\ba"}</M>, orange das Ergebnis <M>{"\\bG\\ba"}</M>. Es landet stets
        auf der ersten Koordinatenachse, mit Länge{" "}
        <M>{"\\alpha = \\left\\|\\ba\\right\\|_2"}</M>. Im Hintergrund sehen wir, wohin{" "}
        <M>{"\\bG"}</M> das Koordinatengitter schickt: Alles wird nur gedreht, nichts
        gestreckt oder gestaucht.
      </p>
      <Slider label="a₁" value={a1} onChange={setA1} min={-5} max={5} step={0.1} />
      <Slider label="a₂" value={a2} onChange={setA2} min={-5} max={5} step={0.1} />
      {degeneriert ? (
        <p className="my-2 text-sm italic">
          <M>{"\\ba = \\bnull"}</M>: hier gibt es nichts zu drehen; jedes Paar mit{" "}
          <M>{"c^2 + s^2 = 1"}</M> funktioniert, wir nehmen <M>{"\\bG = \\bI"}</M>.
        </p>
      ) : (
        <div className="my-2 text-sm">
          <MD>
            {`c = ${c.toFixed(4)}, \\quad s = ${s.toFixed(4)}, \\quad \\alpha = ${r.toFixed(
              4
            )}, \\quad \\theta \\approx ${theta.toFixed(2)}^{\\circ}`}
          </MD>
          <MD>
            {`\\bG = \\begin{pmatrix} ${c.toFixed(4)} & ${s.toFixed(4)} \\\\ ${(-s).toFixed(
              4
            )} & ${c.toFixed(4)} \\end{pmatrix}, \\qquad \\bG\\ba = \\begin{pmatrix} ${r.toFixed(
              4
            )} \\\\ 0 \\end{pmatrix}`}
          </MD>
        </div>
      )}
      <LabeledTransformCanvas matrix={G} vectors={vecs} worldHalf={wh} showUnitCircle />
      <p className="my-2 text-sm">
        Der angezeigte Winkel <M>{"\\theta"}</M> dient nur unserer Anschauung; in die
        Formeln für <M>{"c"}</M> und <M>{"s"}</M> geht er an keiner Stelle ein.
      </p>
    </div>
  );
}

/* --------------------------- Widget 2: Householder-Spiegelung, geometrisch */

const FARBEN = {
  a: "#0072B2", // FMM-blau: der gegebene Vektor a
  p: "#D55E00", // FMM-rot: v-Anteil v(vᵀa/vᵀv), rot wie \cbred{v} im Text
  proj: "#9E57D5", // FMM-violett: Projektion auf die Spiegelgerade
  refl: "#009E73", // FMM-grün: Ha bzw. Wanderpunkt w(t)
  spiegel: "#475569",
  spiegelAndere: "#cbd5e1",
};

/**
 * 2D-Geometrie von Ha: Vektor a, gewählte Spiegelgerade span(v)⊥, Anteil von
 * a längs v, Projektion auf die Spiegelgerade und Spiegelung. `t`
 * interpoliert a − t·v(vᵀa/vᵀv): t=1 Projektion, t=2 Spiegelung.
 * (SVG-Code portiert aus der internen Heath-App, Labels deutsch.)
 */
function SpiegelungSVG({
  a,
  sign,
  t,
  size = 340,
}: {
  a: V2;
  sign: 1 | -1;
  t: number;
  size?: number;
}) {
  const uid = useId();
  const half = 2.8;
  const s = size / (2 * half);
  const px = (v: V2): V2 => [size / 2 + v[0] * s, size / 2 - v[1] * s];

  const norm = Math.hypot(a[0], a[1]);
  const alpha = sign * norm;
  const v: V2 = [a[0] - alpha, a[1]];
  const vv = dot2(v, v);
  const c = vv > 1e-12 ? dot2(v, a) / vv : 0;
  const p = scl(v, c); // Anteil von a längs v
  const proj = sub(a, p); // liegt auf der Spiegelgeraden
  const refl = sub(a, scl(p, 2)); // = alpha·e1
  const w = sub(a, scl(p, t)); // Wanderpunkt

  const spiegelRichtung = (vv_: V2): V2 => {
    const n = Math.hypot(vv_[0], vv_[1]);
    return n > 1e-9 ? [-vv_[1] / n, vv_[0] / n] : [1, 0];
  };
  const d1 = spiegelRichtung(v);
  const vAndere: V2 = [a[0] + alpha, a[1]];
  const d2 = spiegelRichtung(vAndere);

  const line = (d: V2, color: string, dash: string, label?: string) => {
    const A = px(scl(d, -half * 1.5));
    const B = px(scl(d, half * 1.5));
    const L = px(scl(d, d[1] >= 0 ? 2.35 : -2.35));
    return (
      <g>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={color} strokeDasharray={dash} />
        {label && (
          <text x={L[0]} y={L[1]} fontSize="11" fill={color}>
            {label}
          </text>
        )}
      </g>
    );
  };

  const arrow = (to: V2, color: string) => {
    const A = px([0, 0]);
    const B = px(to);
    return (
      <line
        x1={A[0]}
        y1={A[1]}
        x2={B[0]}
        y2={B[1]}
        stroke={color}
        strokeWidth={2}
        markerEnd={`url(#pf-${uid}-${color.slice(1)})`}
      />
    );
  };

  const label = (at: V2, text: string, color: string, dx = 6, dy = -6) => {
    const P = px(at);
    return (
      <text
        x={Math.min(Math.max(P[0] + dx, 4), size - 24)}
        y={Math.min(Math.max(P[1] + dy, 12), size - 4)}
        fontSize="12"
        fontStyle="italic"
        fill={color}
      >
        {text}
      </text>
    );
  };

  const farben = Object.values(FARBEN);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rounded border border-slate-300 bg-white dark:border-slate-600"
    >
      <defs>
        {farben.map((col) => (
          <marker
            key={col}
            id={`pf-${uid}-${col.slice(1)}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 z" fill={col} />
          </marker>
        ))}
      </defs>
      {/* Achsen */}
      <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#e2e8f0" />
      <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#e2e8f0" />
      <text x={size - 16} y={size / 2 - 5} fontSize="11" fill="#94a3b8">
        x₁
      </text>
      <text x={size / 2 + 5} y={14} fontSize="11" fill="#94a3b8">
        x₂
      </text>
      {/* die beiden winkelhalbierenden Spiegelgeraden */}
      {line(d2, FARBEN.spiegelAndere, "3 4")}
      {line(d1, FARBEN.spiegel, "5 4", "span(v)⊥")}
      {/* Weg a → Projektion → Spiegelung, senkrecht zur Spiegelgeraden */}
      <polyline
        points={`${px(a)} ${px(proj)} ${px(refl)}`}
        fill="none"
        stroke="#94a3b8"
        strokeDasharray="2 3"
      />
      {/* Zielpunkte auf der Achse */}
      <circle cx={px([norm, 0])[0]} cy={px([norm, 0])[1]} r={3.5} fill="#334155" />
      <circle cx={px([-norm, 0])[0]} cy={px([-norm, 0])[1]} r={3.5} fill="#334155" />
      {label([norm, 0], "+‖a‖₂e₁", "#334155", -8, 16)}
      {label([-norm, 0], "−‖a‖₂e₁", "#334155", -24, 16)}
      {/* Vektoren */}
      {arrow(a, FARBEN.a)}
      {vv > 1e-12 && arrow(p, FARBEN.p)}
      {vv > 1e-12 && arrow(proj, FARBEN.proj)}
      {t >= 1.95 && arrow(refl, FARBEN.refl)}
      {label(a, "a", FARBEN.a)}
      {vv > 1e-12 && label(p, "v·(vᵀa/vᵀv)", FARBEN.p, 6, 12)}
      {vv > 1e-12 && label(proj, "a − v(vᵀa/vᵀv)", FARBEN.proj, -40, -8)}
      {t >= 1.95 ? (
        label(refl, "Ha = αe₁", FARBEN.refl, -16, 26)
      ) : (
        <g>
          <circle cx={px(w)[0]} cy={px(w)[1]} r={5} fill={FARBEN.refl} />
          {label(w, "w(t)", FARBEN.refl, 8, -8)}
        </g>
      )}
    </svg>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="mr-1 inline-block h-2.5 w-2.5 rounded-sm align-middle"
      style={{ background: color }}
    />
  );
}

function HouseholderWidget() {
  const [deg, setDeg] = useState(130);
  const [sign, setSign] = useState<1 | -1>(1);
  const [t, setT] = useState(2);
  const r = 2;
  const a: V2 = [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)];
  const alpha = sign * r;
  const v: V2 = [a[0] - alpha, a[1]];
  const vv = dot2(v, v);
  const c = vv > 1e-12 ? dot2(v, a) / vv : 0;
  const w = sub(a, scl(v, t * c));
  const nw = Math.hypot(w[0], w[1]);
  const sicher: 1 | -1 = a[0] < 0 ? 1 : -1;
  const phase =
    t < 0.05
      ? "w(0) = a: wir stehen noch am Ausgangsvektor."
      : Math.abs(t - 1) < 0.05
        ? "w(1) = (I − P)a ist die Projektion: der Wanderpunkt liegt jetzt auf der Spiegelgeraden."
        : t >= 1.95
          ? "w(2) = (I − 2P)a = Ha: die Spiegelung ist komplett, die Norm wieder da."
          : t < 1
            ? "der v-Anteil schrumpft, Richtung Spiegelgerade …"
            : "hinter der Spiegelgeraden, gleich ist die x₁-Achse erreicht …";
  return (
    <div className="my-2 rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <p className="my-2 text-sm">
        Der Regler <M>{"t"}</M> zerlegt die Spiegelung in ihre zwei Hälften: Der Wanderpunkt{" "}
        <M>{"\\bw(t) = \\ba - t\\,\\bv\\,\\frac{\\bv^\\top\\ba}{\\bv^\\top\\bv}"}</M> startet
        bei <M>{"t = 0"}</M> in <M>{"\\ba"}</M>, erreicht bei <M>{"t = 1"}</M> die
        Spiegelgerade (einmal den <M>{"\\bv"}</M>-Anteil abziehen: die Projektion) und bei{" "}
        <M>{"t = 2"}</M> den gespiegelten Punkt (zweimal abziehen). Über die Knöpfe legen wir
        das Vorzeichen von <M>{"\\alpha"}</M> fest, und damit, an welcher der beiden
        Spiegelgeraden gespiegelt wird.
      </p>
      <div className="flex flex-wrap items-start gap-4">
        <SpiegelungSVG a={a} sign={sign} t={t} />
        <div className="min-w-56 grow text-sm">
          <Slider
            label="Richtung von a (°)"
            value={deg}
            onChange={setDeg}
            min={10}
            max={170}
            step={1}
            fmt={(x) => `${x.toFixed(0)}°`}
          />
          <div className="my-2 flex items-center gap-2">
            <span className="w-28 shrink-0 text-right">Spiegel / Vorzeichen:</span>
            {([1, -1] as const).map((sg) => (
              <button
                key={sg}
                type="button"
                onClick={() => setSign(sg)}
                className={`rounded border px-2 py-0.5 text-xs ${
                  sign === sg
                    ? "border-sky-600 bg-sky-100 dark:bg-sky-900"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              >
                <M>
                  {sg === 1
                    ? "\\alpha = +\\left\\|\\ba\\right\\|_2"
                    : "\\alpha = -\\left\\|\\ba\\right\\|_2"}
                </M>
              </button>
            ))}
          </div>
          <Slider label="t" value={t} onChange={setT} min={0} max={2} step={0.01} />
          <div className="rounded bg-slate-200/70 p-2 font-mono text-xs dark:bg-slate-900/60">
            <div>
              a = ({fmt(a[0])}, {fmt(a[1])}), ‖a‖₂ = 2
            </div>
            <div>
              α = {sign === 1 ? "+" : "−"}2 → v = a − αe₁ = ({fmt(v[0])}, {fmt(v[1])})
            </div>
            <div>
              w(t) = ({fmt(w[0])}, {fmt(w[1])}), ‖w(t)‖₂ = {fmt(nw)}
            </div>
            <div>vᵀw(t) = {fmt(dot2(v, w))}</div>
            <div className="mt-1 text-emerald-700 dark:text-emerald-400">
              numerisch sichere Wahl hier: α = {sicher === 1 ? "+" : "−"}‖a‖₂ (das weiter
              entfernte Ziel, längeres v)
            </div>
          </div>
          <p className="mt-2 text-sm">{phase}</p>
          <ul className="mt-2 space-y-0.5 text-xs">
            <li>
              <Swatch color={FARBEN.a} />
              <M>{"\\ba"}</M> – der gegebene Vektor
            </li>
            <li>
              <Swatch color={FARBEN.p} />
              <M>{"\\bv\\,(\\bv^\\top\\ba/\\bv^\\top\\bv)"}</M> – Anteil von <M>{"\\ba"}</M>{" "}
              längs <M>{"\\bv"}</M>
            </li>
            <li>
              <Swatch color={FARBEN.proj} />
              <M>{"\\ba - \\bv\\,(\\bv^\\top\\ba/\\bv^\\top\\bv)"}</M> – Projektion auf die
              Spiegelgerade
            </li>
            <li>
              <Swatch color={FARBEN.refl} />
              <M>{"\\bH\\ba = \\alpha\\,\\be_1"}</M> – die Spiegelung (bzw. Wanderpunkt{" "}
              <M>{"\\bw(t)"}</M>)
            </li>
            <li>
              <Swatch color={FARBEN.spiegel} />
              gewählte Spiegelgerade <M>{"\\spann(\\bv)^\\perp"}</M>;{" "}
              <Swatch color={FARBEN.spiegelAndere} />
              die Spiegelgerade des anderen Vorzeichens
            </li>
          </ul>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Der Zahlenzustand verrät dabei ein wichtiges Detail: Für{" "}
            <M>{"0 < t < 2"}</M> ist <M>{"\\left\\|\\bw(t)\\right\\|_2"}</M> echt kleiner als{" "}
            <M>{"\\left\\|\\ba\\right\\|_2"}</M>. Die Projektion allein (<M>{"t = 1"}</M>)
            verkürzt den Vektor also und ist keine Orthogonalmatrix; erst der doppelte
            Schritt bringt die volle Länge zurück. Und dass <M>{"\\bw(1)"}</M> wirklich auf
            der Spiegelgeraden liegt, zeigt die Zeile <M>{"\\bv^\\top\\bw(t)"}</M>: bei{" "}
            <M>{"t = 1"}</M> steht dort 0.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Widget 3: Auslöschung bei falschem Vorzeichen */

function AusloeschungWidget() {
  const [logd, setLogd] = useState(-3);
  const [stellen, setStellen] = useState(4);
  const delta = Math.pow(10, logd);
  const rnd = (x: number) => parseFloat(x.toPrecision(stellen));

  // simulierte t-stellige Berechnung von ‖a‖₂ für a = (1, δ)
  const nrm = rnd(Math.sqrt(rnd(1 + rnd(delta * delta))));
  const nrmExakt = Math.hypot(1, delta);

  // v₁ für beide Vorzeichen, in t-stelliger Arithmetik
  const v1Schlecht = rnd(1 - nrm); // α = +‖a‖: gleiches Vorzeichen wie a₁ → Auslöschung
  const v1Gut = rnd(1 + nrm); // α = −‖a‖: sicher
  const v1SchlechtExakt = (-delta * delta) / (1 + nrmExakt); // stabile Umformung von 1 − √(1+δ²)
  const v1GutExakt = 1 + nrmExakt;

  // H (exakt) mit dem GERUNDETEN v anwenden; wie nah ist Ha an αe₁?
  const haFehler = (v1: number, alphaExakt: number): number => {
    const vvv = v1 * v1 + delta * delta;
    if (vvv === 0) return NaN;
    const va = v1 * 1 + delta * delta;
    const ha: V2 = [1 - ((2 * va) / vvv) * v1, delta - ((2 * va) / vvv) * delta];
    return Math.hypot(ha[0] - alphaExakt, ha[1]);
  };
  const fehlerSchlecht = haFehler(v1Schlecht, nrmExakt);
  const fehlerGut = haFehler(v1Gut, -nrmExakt);

  const korrekteZiffern = (comp: number, exakt: number): string => {
    const rel = Math.abs(comp - exakt) / Math.abs(exakt);
    if (rel === 0) return `alle ${stellen}`;
    const d = Math.max(0, Math.min(stellen, -Math.log10(rel)));
    return d.toFixed(1);
  };

  const zeile = (
    name: string,
    alphaS: string,
    v1: number,
    v1Exakt: number,
    fehler: number,
    schlecht: boolean
  ) => (
    <tr
      className={
        schlecht
          ? "bg-rose-50 dark:bg-rose-950/40"
          : "bg-emerald-50 dark:bg-emerald-950/30"
      }
    >
      <td className="px-2 py-1">{name}</td>
      <td className="px-2 py-1 font-mono">{alphaS}</td>
      <td className="px-2 py-1 font-mono">{v1.toExponential(Math.min(stellen - 1, 6))}</td>
      <td className="px-2 py-1 font-mono">{v1Exakt.toExponential(6)}</td>
      <td className="px-2 py-1 font-mono">{korrekteZiffern(v1, v1Exakt)}</td>
      <td className="px-2 py-1 font-mono">
        {Number.isFinite(fehler) ? fehler.toExponential(1) : "H nicht definiert (v = 0)"}
      </td>
    </tr>
  );

  return (
    <div className="my-2 rounded bg-slate-100 p-3 text-sm dark:bg-slate-800/60">
      <p className="mb-2">
        Als Testvektor dient <M>{"\\ba = (1, \\delta)^\\top"}</M> mit kleinem{" "}
        <M>{"\\delta"}</M>; gerechnet wird in einer nachgestellten Gleitkommaarithmetik, die
        nach jeder Operation auf <M>{"t"}</M> signifikante Stellen rundet. Es ist{" "}
        <M>{"\\left\\|\\ba\\right\\|_2 = \\sqrt{1 + \\delta^2} \\approx 1"}</M>: Bei der
        ungünstigen Wahl <M>{"\\alpha = +\\left\\|\\ba\\right\\|_2"}</M> (gleiches Vorzeichen
        wie <M>{"a_1"}</M>) entsteht <M>{"v_1 = 1 - \\left\\|\\ba\\right\\|_2"}</M> als
        Differenz zweier fast identischer Zahlen, genau der Auslöschungs-Fall aus Bemerkung
        7.5.9. Die sichere Wahl <M>{"\\alpha = -\\left\\|\\ba\\right\\|_2"}</M> vermeidet das.
      </p>
      <Slider
        label="δ"
        value={logd}
        onChange={setLogd}
        min={-7}
        max={-1}
        step={0.5}
        fmt={(x) => `1e${x.toFixed(1)}`}
      />
      <Slider
        label="Stellen t"
        value={stellen}
        onChange={setStellen}
        min={2}
        max={10}
        step={1}
        fmt={(x) => x.toFixed(0)}
      />
      <div className="my-2 overflow-x-auto">
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-600">
              <th className="px-2 py-1">Wahl</th>
              <th className="px-2 py-1">α</th>
              <th className="px-2 py-1">berechnetes v₁</th>
              <th className="px-2 py-1">exaktes v₁</th>
              <th className="px-2 py-1">korrekte Ziffern</th>
              <th className="px-2 py-1">‖Ha − αe₁‖₂ mit berechnetem v</th>
            </tr>
          </thead>
          <tbody>
            {zeile("ungünstig (Auslöschung)", "+‖a‖₂", v1Schlecht, v1SchlechtExakt, fehlerSchlecht, true)}
            {zeile("sicher", "−‖a‖₂", v1Gut, v1GutExakt, fehlerGut, false)}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        In der oberen Zeile frisst die Subtraktion alle führenden Ziffern auf; was von{" "}
        <M>{"v_1"}</M> übrig bleibt, ist im Wesentlichen der Rundungsfehler von{" "}
        <M>{"\\left\\|\\ba\\right\\|_2 \\approx 1 + \\delta^2/2"}</M>. Ist <M>{"\\delta^2"}</M>{" "}
        so klein, dass es in <M>{"t"}</M> Stellen gar nicht mehr sichtbar ist, wird{" "}
        <M>{"v_1"}</M> sogar zu exakt 0 gerundet; die daraus gebaute „Spiegelung" hat mit der
        gesuchten dann nichts mehr zu tun (letzte Spalte!). In der unteren Zeile werden dagegen
        zwei positive Zahlen addiert; dabei geht keine einzige Ziffer verloren. Geometrisch
        gesprochen: Die sichere Wahl spiegelt auf das Ziel <M>{"\\alpha\\,\\be_1"}</M>, das von{" "}
        <M>{"\\ba"}</M> <em>weiter entfernt</em> liegt.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- Abschnitt */

export function S75() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 07-kq, Abschnitt „Konstruktion von <M>{"\\bQ"}</M>&ldquo;.
      </p>

      <p>
        In{" "}
        <a className="underline" href="#sec-7.4">
          Abschnitt 7.4
        </a>{" "}
        haben wir gesehen: Sobald eine QR-Zerlegung von <M>{"\\bA"}</M> vorliegt, schrumpft das
        Kleinste-Quadrate-Problem auf ein Dreieckssystem{" "}
        <M>{"\\bR\\,\\wh{\\bx} = \\bc_1"}</M> zusammen. Offen blieb die entscheidende Frage: Wie
        finden wir die <ConceptLink id="orthogonal-matrix">Orthogonalmatrix</ConceptLink>{" "}
        <M>{"\\bQ"}</M> überhaupt? Das holen wir jetzt nach.
      </p>
      <p>
        Die Strategie kennen wir im Kern schon vom{" "}
        <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink>: Wir gehen von links
        nach rechts durch die Spalten von <M>{"\\bA"}</M> und entfernen die Einträge unter der
        Diagonalen, diesmal aber durch Multiplikation mit Orthogonalmatrizen{" "}
        <M>{"\\bQ_k"}</M>. Warum ausgerechnet orthogonal? Weil solche Matrizen die{" "}
        <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink> jedes Vektors erhalten;
        das Kleinste-Quadrate-Kriterium bleibt unter ihnen also unverändert, wie wir in
        Abschnitt 7.4 ausgenutzt haben. Die beiden gängigsten Bausteine für die{" "}
        <M>{"\\bQ_k"}</M> sind die <em>Givens-Rotation</em> und die{" "}
        <em>Householder-Spiegelung</em> (engl. <em>Householder reflection</em>). Beide schauen
        wir uns nun im Detail an.
      </p>

      {/* ------------------------------------------------------------------ */}
      <h3 id="sec-7.5-aufgabe" className="mt-6 text-lg font-semibold">
        Die Eliminationsaufgabe
      </h3>

      <p>
        Formulieren wir zuerst präzise, was ein einzelner Eliminationsschritt leisten muss. Sei{" "}
        <M>{"\\ba \\in \\R^n"}</M> beliebig. Wir suchen eine Orthogonalmatrix{" "}
        <M>{"\\bQ_k"}</M>, sodass in <M>{"\\bQ_k\\ba"}</M>
      </p>
      <ul className="my-3 max-w-prose list-disc space-y-1 pl-6">
        <li>
          die ersten <M>{"k-1"}</M> Komponenten unberührt bleiben,
        </li>
        <li>
          die letzten <M>{"n-k"}</M> Komponenten <M>{"0"}</M> sind:
        </li>
      </ul>
      <MD>
        {"\\bQ_k\\,\\ba = \\begin{pmatrix} a_1 \\\\ \\vdots \\\\ a_{k-1} \\\\ \\alpha \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{pmatrix}."}
      </MD>
      <p>
        Der Wert <M>{"\\alpha"}</M> ist dabei nicht frei wählbar: Orthogonale Abbildungen
        erhalten Normen, also muss die gesamte „Länge" des hinteren Teilvektors{" "}
        <M>{"(a_k, \\ldots, a_n)^\\top"}</M> in der <M>{"k"}</M>-ten Komponente landen. Es
        genügt deshalb, das Problem für diesen Teilvektor zu lösen. Damit sind wir beim
        Kernproblem dieses Abschnitts angekommen: Gegeben <M>{"\\ba"}</M>, finde ein
        orthogonales <M>{"\\bQ"}</M> mit
      </p>
      <MD>
        {"\\bQ\\ba = \\alpha\\,\\be_1 = \\alpha \\begin{pmatrix} 1 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{pmatrix}, \\qquad \\alpha = \\pm\\left\\|\\ba\\right\\|_2."}
      </MD>
      <p>
        Für <M>{"n = 2"}</M> und <M>{"k = 1"}</M> ist die Intuition ein Bild wert: Wir müssen{" "}
        <M>{"\\ba"}</M> längentreu auf die erste Koordinatenachse bringen. Dafür gibt es genau
        zwei natürliche Bewegungen:
      </p>
      <ul className="my-3 max-w-prose list-disc space-y-1 pl-6">
        <li>
          <b>Givens:</b> wir <em>drehen</em> <M>{"\\ba"}</M> auf <M>{"\\alpha\\,\\be_1"}</M>{" "}
          (eine <ConceptLink id="rotation-matrix">Rotation</ConceptLink>),
        </li>
        <li>
          <b>Householder:</b> wir <em>spiegeln</em> <M>{"\\ba"}</M> auf{" "}
          <M>{"\\alpha\\,\\be_1"}</M> (eine <ConceptLink id="reflection">Spiegelung</ConceptLink>
          ; mehr dazu auch in der Übung).
        </li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      <h3 id="sec-7.5-givens" className="mt-6 text-lg font-semibold">
        Givens-Rotationen
      </h3>

      <p>
        Beginnen wir mit der Drehung. Aus der linearen Algebra kennen wir die{" "}
        <ConceptLink id="rotation-matrix">Drehmatrix</ConceptLink> der Ebene. Drehungen sind
        orthogonal und damit genau die Art von Transformation, die wir suchen.
      </p>

      <EnvBlock kind="Definition" label="7.5.1 (Givens-Rotation)">
        <p>
          Seien <M>{"c, s \\in \\R"}</M> mit <M>{"c^2 + s^2 = 1"}</M>. Dann heißt
        </p>
        <MD>{"\\bG = \\begin{pmatrix} c & s \\\\ -s & c \\end{pmatrix}"}</MD>
        <p>
          <em>Givens-Rotation</em>. Wegen{" "}
          <M>{"\\bG^\\top\\bG = (c^2 + s^2)\\,\\bI = \\bI"}</M> ist jede solche Matrix
          orthogonal; <M>{"c"}</M> und <M>{"s"}</M> spielen die Rolle von Kosinus und Sinus des
          Drehwinkels.
        </p>
      </EnvBlock>

      <p>
        Wie müssen wir <M>{"c"}</M> und <M>{"s"}</M> wählen, damit die Drehung{" "}
        <M>{"\\ba"}</M> auf die erste Koordinatenachse bringt? Das folgende Resultat gibt die
        Antwort, und die Herleitung ist erfreulich kurz.
      </p>

      <EnvBlock kind="Satz" label="7.5.2 (Wahl von c und s)">
        <p>
          Sei <M>{"\\ba = (a_1, a_2)^\\top \\neq \\bnull"}</M>. Mit
        </p>
        <MD>
          {"c = \\frac{a_1}{\\sqrt{a_1^2 + a_2^2}}, \\qquad s = \\frac{a_2}{\\sqrt{a_1^2 + a_2^2}}"}
        </MD>
        <p>
          gilt{" "}
          <M>
            {"\\bG\\ba = \\begin{pmatrix} \\alpha \\\\ 0 \\end{pmatrix} \\text{ mit } \\alpha = \\left\\|\\ba\\right\\|_2."}
          </M>
        </p>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              Matrixprodukt ausschreiben; die zweite Komponente soll verschwinden
            </>
          }
        >
          <MD>
            {"\\bG\\ba = \\begin{pmatrix} c\\,\\cblue{a_1} + s\\,\\cred{a_2} \\\\ -s\\,\\cblue{a_1} + c\\,\\cred{a_2} \\end{pmatrix} \\overset{!}{=} \\begin{pmatrix} \\corange{\\alpha} \\\\ 0 \\end{pmatrix}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Ansatz aus dem Satz; wegen{" "}
              <M>{"c^2 + s^2 = (\\cblue{a_1}^2 + \\cred{a_2}^2)/r^2 = 1"}</M> ist <M>{"\\bG"}</M>{" "}
              tatsächlich eine Givens-Rotation
            </>
          }
        >
          <MD>
            {"r := \\sqrt{\\cblue{a_1}^2 + \\cred{a_2}^2} = \\left\\|\\ba\\right\\|_2 > 0, \\qquad c := \\frac{\\cblue{a_1}}{r}, \\quad s := \\frac{\\cred{a_2}}{r}"}
          </MD>
        </PStep>
        <PStep why={<>einsetzen; die zweite Komponente verschwindet wie gefordert</>}>
          <MD>
            {"-s\\,\\cblue{a_1} + c\\,\\cred{a_2} = \\frac{-\\cred{a_2}\\,\\cblue{a_1} + \\cblue{a_1}\\,\\cred{a_2}}{r} = 0"}
          </MD>
        </PStep>
        <PStep why={<>einsetzen; Definition von <M>{"r"}</M></>}>
          <MD>
            {"c\\,\\cblue{a_1} + s\\,\\cred{a_2} = \\frac{\\cblue{a_1}^2 + \\cred{a_2}^2}{r} = r = \\left\\|\\ba\\right\\|_2 = \\corange{\\alpha}"}
          </MD>
        </PStep>
      </Proof>

      <p>
        Dass <M>{"\\alpha = \\left\\|\\ba\\right\\|_2"}</M> herauskommt, ist kein Zufall: Eine
        Orthogonalmatrix kann die Norm gar nicht ändern. Und noch eine Beobachtung: Um{" "}
        <M>{"\\bG"}</M> aufzustellen, mussten wir den Drehwinkel nie ausrechnen;{" "}
        <M>{"c"}</M> und <M>{"s"}</M> ergeben sich unmittelbar aus <M>{"a_1"}</M> und{" "}
        <M>{"a_2"}</M>, ganz ohne Trigonometrie.
      </p>

      <EnvBlock kind="Beispiel" label="7.5.3 (Givens-Rotation)">
        <p>
          Wir eliminieren die zweite Komponente von{" "}
          <M>{"\\ba = (\\cblue{4}, \\cred{3})^\\top"}</M>. Zuerst die Norm:
        </p>
        <MD>
          {"r = \\sqrt{\\cblue{4}^2 + \\cred{3}^2} = \\sqrt{16 + 9} = \\sqrt{25} = \\corange{5}."}
        </MD>
        <p>Damit sind Kosinus und Sinus festgelegt:</p>
        <MD>
          {"c = \\frac{\\cblue{4}}{\\corange{5}} = 0{,}8, \\qquad s = \\frac{\\cred{3}}{\\corange{5}} = 0{,}6."}
        </MD>
        <p>Anwenden und nachrechnen:</p>
        <MD>
          {"\\bG\\ba = \\begin{pmatrix} 0{,}8 & 0{,}6 \\\\ -0{,}6 & 0{,}8 \\end{pmatrix} \\begin{pmatrix} \\cblue{4} \\\\ \\cred{3} \\end{pmatrix} = \\begin{pmatrix} 0{,}8 \\cdot \\cblue{4} + 0{,}6 \\cdot \\cred{3} \\\\ -0{,}6 \\cdot \\cblue{4} + 0{,}8 \\cdot \\cred{3} \\end{pmatrix} = \\begin{pmatrix} 3{,}2 + 1{,}8 \\\\ -2{,}4 + 2{,}4 \\end{pmatrix} = \\begin{pmatrix} \\corange{5} \\\\ 0 \\end{pmatrix}."}
        </MD>
        <p>
          In der zweiten Komponente steht die gewünschte Null, und wegen{" "}
          <M>{"\\left\\|\\bG\\ba\\right\\|_2 = \\corange{5} = \\left\\|\\ba\\right\\|_2"}</M>{" "}
          hat die Rotation die Länge nicht angetastet, für eine Orthogonalmatrix keine
          Überraschung.
        </p>
      </EnvBlock>

      <ExpandedReading title="Givens-Rotation zum Ausprobieren">
        <GivensWidget />
      </ExpandedReading>

      <p>
        Das Rezept trägt weiter als <M>{"\\R^2"}</M>: Auch in <M>{"\\R^n"}</M> können wir
        damit jede einzelne Komponente eines Vektors zu Null machen. Dazu suchen wir uns neben
        der zu eliminierenden Komponente <M>{"j"}</M> eine Partnerkomponente <M>{"i"}</M> aus
        und bestimmen <M>{"c"}</M> und <M>{"s"}</M> nach Satz 7.5.2 aus den beiden Einträgen{" "}
        <M>{"a_i"}</M> und <M>{"a_j"}</M>. Anschließend setzen wir die{" "}
        <M>{"2 \\times 2"}</M>-Rotation in die Zeilen und Spalten <M>{"i"}</M> und{" "}
        <M>{"j"}</M> einer <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink> ein.
        Für <M>{"n = 5"}</M>, <M>{"i = 3"}</M> und <M>{"j = 5"}</M> entsteht so
      </p>
      <MD>
        {"\\begin{pmatrix} 1 & 0 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 & 0 \\\\ 0 & 0 & c & 0 & s \\\\ 0 & 0 & 0 & 1 & 0 \\\\ 0 & 0 & -s & 0 & c \\end{pmatrix} \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\\\ a_4 \\\\ a_5 \\end{pmatrix} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ \\alpha \\\\ a_4 \\\\ 0 \\end{pmatrix}."}
      </MD>
      <p>
        Alle übrigen Komponenten bleiben unberührt, genau wie es unsere
        Eliminationsaufgabe verlangt. Pro Rotation gewinnen wir allerdings nur eine einzige
        Null. Eine ganze Spalte räumen wir deshalb mit einer Folge solcher Rotationen leer.
        Dabei ist nur auf die Reihenfolge zu achten: Schon erzeugte Nullen dürfen von den
        nachfolgenden Rotationen nicht wieder mit Werten gefüllt werden.
      </p>

      <EnvBlock kind="Bemerkung" label="7.5.4 (Wann Givens?)">
        <p>
          Eine Givens-Rotation fasst genau zwei Zeilen an; alle anderen Einträge der Matrix
          bleiben exakt so, wie sie sind. Deshalb greifen wir zu Givens, wenn wir gezielt
          einzelne Nullen erzeugen wollen: bei{" "}
          <ConceptLink id="sparse-matrix">dünnbesetzten</ConceptLink> Matrizen, deren viele
          Nullen wir nicht zerstören möchten, oder wenn eine bestehende QR-Zerlegung nur um
          eine neue Datenzeile ergänzt werden soll. Der Preis: Eliminieren wir so eine voll
          besetzte Matrix komplett, fällt etwa das Anderthalbfache der Rechenoperationen des
          Householder-Zugangs an, den wir uns als Nächstes ansehen.
        </p>
      </EnvBlock>

      {/* ------------------------------------------------------------------ */}
      <h3 id="sec-7.5-householder" className="mt-6 text-lg font-semibold">
        Householder-Spiegelungen
      </h3>

      <p>
        Eine Rotation erledigt eine Null pro Schritt. Wollen wir <em>alle</em> Einträge unter
        der Diagonalen einer Spalte in einem einzigen Schlag eliminieren, brauchen wir ein
        anderes Werkzeug: Statt <M>{"\\ba"}</M> auf <M>{"\\alpha\\,\\be_1"}</M> zu drehen,{" "}
        <ConceptLink id="reflection">spiegeln</ConceptLink> wir es an einer geschickt gewählten{" "}
        <ConceptLink id="hyperplane">Hyperebene</ConceptLink>.
      </p>

      <EnvBlock kind="Definition" label="7.5.5 (Householder-Spiegelung)">
        <p>
          Sei <M>{"\\bv \\in \\R^n"}</M>, <M>{"\\bv \\neq \\bnull"}</M>. Die Matrix
        </p>
        <MD>{"\\bH = \\bI - 2\\,\\frac{\\bv\\bv^\\top}{\\bv^\\top\\bv}"}</MD>
        <p>
          heißt <em>Householder-Spiegelung</em> (engl. <em>Householder reflection</em>,{" "}
          <em>elementary reflector</em>) mit Spiegelvektor <M>{"\\bv"}</M>.
        </p>
      </EnvBlock>

      <p>
        Warum „Spiegelung"? Der Baustein{" "}
        <M>{"\\bP = \\bv\\bv^\\top / (\\bv^\\top\\bv)"}</M>, ein skaliertes{" "}
        <ConceptLink id="outer-product">dyadisches Produkt</ConceptLink>, ist die orthogonale{" "}
        <ConceptLink id="projection">Projektion</ConceptLink> auf die Gerade{" "}
        <M>{"\\spann(\\bv)"}</M> (<ConceptLink id="span">lineare Hülle</ConceptLink> von{" "}
        <M>{"\\bv"}</M>). Entsprechend projiziert <M>{"\\bI - \\bP"}</M> auf die Hyperebene{" "}
        <M>{"\\spann(\\bv)^\\perp"}</M>, das{" "}
        <ConceptLink id="orthogonal-complement">orthogonale Komplement</ConceptLink>.{" "}
        <M>{"\\bH = \\bI - 2\\bP"}</M> geht doppelt so weit: Es zieht von <M>{"\\ba"}</M> den{" "}
        <M>{"\\bv"}</M>-Anteil gleich <em>zweimal</em> ab und landet damit auf der anderen Seite
        der Hyperebene; <M>{"\\spann(\\bv)^\\perp"}</M> ist der Spiegel.
      </p>

      <EnvBlock kind="Satz" label="7.5.6 (Symmetrie und Orthogonalität)">
        <p>
          Jede Householder-Spiegelung <M>{"\\bH"}</M> ist{" "}
          <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink> und orthogonal:
        </p>
        <MD>{"\\bH^\\top = \\bH, \\qquad \\bH^\\top\\bH = \\bH^2 = \\bI."}</MD>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              <M>{"(\\bv\\bv^\\top)^\\top = (\\bv^\\top)^\\top\\bv^\\top = \\bv\\bv^\\top"}</M>{" "}
              (<ConceptLink id="transpose">Transponieren</ConceptLink> eines Produkts)
            </>
          }
        >
          <MD>
            {"\\bP := \\frac{\\bv\\bv^\\top}{\\bv^\\top\\bv} \\quimpl \\bP^\\top = \\bP"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bv^\\top\\bv"}</M> ist ein Skalar (<ConceptLink id="dot-product">Skalarprodukt</ConceptLink>) und lässt sich kürzen: <M>{"\\bP"}</M> ist eine Projektion
            </>
          }
        >
          <MD>
            {"\\bP^2 = \\frac{\\bv\\,(\\bv^\\top\\bv)\\,\\bv^\\top}{(\\bv^\\top\\bv)^2} = \\frac{\\bv\\bv^\\top}{\\bv^\\top\\bv} = \\bP"}
          </MD>
        </PStep>
        <PStep why={<>Linearität des Transponierens und Schritt 1</>}>
          <MD>{"\\bH^\\top = (\\bI - 2\\bP)^\\top = \\bI - 2\\bP^\\top = \\bI - 2\\bP = \\bH"}</MD>
        </PStep>
        <PStep why={<>ausmultiplizieren; Schritt 2 (<M>{"\\bP^2 = \\bP"}</M>)</>}>
          <MD>
            {"\\bH^\\top\\bH = \\bH^2 = (\\bI - 2\\bP)^2 = \\bI - 4\\bP + 4\\bP^2 = \\bI"}
          </MD>
        </PStep>
      </Proof>

      <p>
        <M>{"\\bH"}</M> ist also orthogonal und selbstinvers: Eine
        Spiegelung, zweimal ausgeführt, ist die Identität. Bleibt die Frage, <em>welchen</em>{" "}
        Spiegelvektor <M>{"\\bv"}</M> wir wählen müssen, damit <M>{"\\ba"}</M> auf{" "}
        <M>{"\\alpha\\,\\be_1"}</M> landet. Die Antwort kann man aus dem geometrischen Bild
        ablesen: Der Spiegel muss den Winkel zwischen <M>{"\\ba"}</M> und dem Ziel halbieren,
        also muss <M>{"\\bv"}</M> in Richtung der Differenz <M>{"\\ba - \\alpha\\,\\be_1"}</M>{" "}
        zeigen. Rechnen wir nach, dass diese Wahl tatsächlich funktioniert.
      </p>

      <EnvBlock kind="Satz" label="7.5.7 (Wahl des Spiegelvektors)">
        <p>
          Sei <M>{"\\ba \\in \\R^n"}</M> und <M>{"\\alpha = \\pm\\left\\|\\ba\\right\\|_2"}</M>{" "}
          so, dass <M>{"\\bv = \\ba - \\alpha\\,\\be_1 \\neq \\bnull"}</M>. Dann gilt für die
          Householder-Spiegelung <M>{"\\bH"}</M> mit Spiegelvektor <M>{"\\bv"}</M>:
        </p>
        <MD>{"\\bH\\ba = \\alpha\\,\\be_1."}</MD>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              ausmultiplizieren; <M>{"\\be_1^\\top\\ba = a_1"}</M> und{" "}
              <M>{"\\ba^\\top\\ba = \\left\\|\\ba\\right\\|_2^2"}</M>
            </>
          }
        >
          <MD>
            {"\\cbred{\\bv}^\\top\\ba = (\\ba - \\alpha\\,\\be_1)^\\top\\ba = \\ba^\\top\\ba - \\alpha\\,\\be_1^\\top\\ba = \\corange{\\left\\|\\ba\\right\\|_2^2 - \\alpha\\,a_1}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              binomisch ausmultiplizieren; <M>{"\\alpha^2 = \\left\\|\\ba\\right\\|_2^2"}</M>,
              weil <M>{"\\alpha = \\pm\\left\\|\\ba\\right\\|_2"}</M>
            </>
          }
        >
          <MD>
            {"\\cbred{\\bv}^\\top\\cbred{\\bv} = \\left\\|\\ba\\right\\|_2^2 - 2\\alpha\\,a_1 + \\alpha^2 = 2\\left(\\corange{\\left\\|\\ba\\right\\|_2^2 - \\alpha\\,a_1}\\right)"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Schritte 1 und 2 einsetzen; wegen <M>{"\\bv \\neq \\bnull"}</M> ist der Nenner
              nicht 0
            </>
          }
        >
          <MD>
            {"2\\,\\frac{\\cbred{\\bv}^\\top\\ba}{\\cbred{\\bv}^\\top\\cbred{\\bv}} = \\frac{2\\left(\\corange{\\left\\|\\ba\\right\\|_2^2 - \\alpha\\,a_1}\\right)}{2\\left(\\corange{\\left\\|\\ba\\right\\|_2^2 - \\alpha\\,a_1}\\right)} = 1"}
          </MD>
        </PStep>
        <PStep why={<>Definition 7.5.5 anwenden; Schritt 3; <M>{"\\cbred{\\bv}"}</M> einsetzen</>}>
          <MD>
            {"\\bH\\ba = \\ba - 2\\,\\cbred{\\bv}\\,\\frac{\\cbred{\\bv}^\\top\\ba}{\\cbred{\\bv}^\\top\\cbred{\\bv}} = \\ba - \\cbred{\\bv} = \\ba - (\\ba - \\alpha\\,\\be_1) = \\alpha\\,\\be_1"}
          </MD>
        </PStep>
      </Proof>

      <p>
        Bemerkenswert: Der komplette Bruch kollabiert zu <M>{"1"}</M>, und übrig bleibt schlicht{" "}
        <M>{"\\ba - \\bv"}</M>. Ein Zahlenbeispiel macht das greifbar.
      </p>

      <EnvBlock kind="Beispiel" label="7.5.8 (Householder-Spiegelung)">
        <p>
          Wir suchen die Householder-Spiegelung, die in{" "}
          <M>{"\\ba = (1, 2, 2)^\\top"}</M> alle Komponenten außer der ersten eliminiert.
          Zunächst die Norm:
        </p>
        <MD>
          {"\\left\\|\\ba\\right\\|_2 = \\sqrt{1^2 + 2^2 + 2^2} = \\sqrt{9} = 3."}
        </MD>
        <p>
          Da <M>{"a_1 = 1 > 0"}</M>, wählen wir <M>{"\\alpha = -3"}</M> (warum das negative
          Vorzeichen die richtige Wahl ist, klärt Bemerkung 7.5.9). Der Spiegelvektor ist dann
        </p>
        <MD>
          {"\\cbred{\\bv} = \\ba - \\alpha\\,\\be_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 2 \\end{pmatrix} + 3\\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} \\cred{4} \\\\ \\cred{2} \\\\ \\cred{2} \\end{pmatrix}."}
        </MD>
        <p>Die beiden Skalarprodukte aus dem Beweis von Satz 7.5.7:</p>
        <MD>
          {"\\cbred{\\bv}^\\top\\ba = \\cred{4} \\cdot 1 + \\cred{2} \\cdot 2 + \\cred{2} \\cdot 2 = 12, \\qquad \\cbred{\\bv}^\\top\\cbred{\\bv} = \\cred{4}^2 + \\cred{2}^2 + \\cred{2}^2 = 24."}
        </MD>
        <p>
          Wie vom Satz versprochen ist{" "}
          <M>{"2 \\cdot \\tfrac{12}{24} = 1"}</M>, also
        </p>
        <MD>
          {"\\bH\\ba = \\ba - \\cbred{\\bv} = \\begin{pmatrix} 1 - \\cred{4} \\\\ 2 - \\cred{2} \\\\ 2 - \\cred{2} \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ 0 \\\\ 0 \\end{pmatrix} = \\alpha\\,\\be_1."}
        </MD>
        <p>Zur Kontrolle stellen wir <M>{"\\bH"}</M> einmal explizit auf:</p>
        <MD>
          {"\\bH = \\bI - \\tfrac{2}{24}\\,\\cbred{\\bv}\\cbred{\\bv}^\\top = \\bI - \\tfrac{1}{12}\\begin{pmatrix} 16 & 8 & 8 \\\\ 8 & 4 & 4 \\\\ 8 & 4 & 4 \\end{pmatrix} = \\begin{pmatrix} -\\tfrac{1}{3} & -\\tfrac{2}{3} & -\\tfrac{2}{3} \\\\[2pt] -\\tfrac{2}{3} & \\tfrac{2}{3} & -\\tfrac{1}{3} \\\\[2pt] -\\tfrac{2}{3} & -\\tfrac{1}{3} & \\tfrac{2}{3} \\end{pmatrix}."}
        </MD>
        <p>
          Nachrechnen bestätigt <M>{"\\bH\\ba = (-3, 0, 0)^\\top"}</M>: Die erste Zeile liefert
          etwa{" "}
          <M>{"-\\tfrac{1}{3} \\cdot 1 - \\tfrac{2}{3} \\cdot 2 - \\tfrac{2}{3} \\cdot 2 = -\\tfrac{9}{3} = -3"}</M>
          , und natürlich gilt{" "}
          <M>{"\\left\\|\\bH\\ba\\right\\|_2 = 3 = \\left\\|\\ba\\right\\|_2"}</M>. Beide
          Komponenten unterhalb der ersten sind mit <em>einer einzigen</em> Spiegelung
          verschwunden.
        </p>
      </EnvBlock>

      <ExpandedReading title="die Spiegelung Schritt für Schritt: warum H = I − 2P">
        <HouseholderWidget />
      </ExpandedReading>

      <EnvBlock kind="Bemerkung" label="7.5.9 (Vorzeichenwahl)">
        <p>
          In exakter Arithmetik funktionieren beide Vorzeichen von{" "}
          <M>{"\\alpha = \\pm\\left\\|\\ba\\right\\|_2"}</M>, es gibt schließlich zwei
          Spiegelebenen, die <M>{"\\ba"}</M> auf die Achse bringen. Numerisch sind sie{" "}
          <em>nicht</em> gleichwertig: Die erste Komponente des Spiegelvektors ist{" "}
          <M>{"v_1 = a_1 - \\alpha"}</M>. Hat <M>{"\\alpha"}</M> dasselbe Vorzeichen wie{" "}
          <M>{"a_1"}</M> und dominiert <M>{"a_1"}</M> die Norm, subtrahieren wir zwei fast
          gleiche Zahlen; es droht{" "}
          <ConceptLink id="cancellation">Auslöschung</ConceptLink> der führenden Ziffern, und
          der winzige Rest besteht fast nur noch aus Rundungsfehlern. Deshalb wählt man
        </p>
        <MD>{"\\alpha = -\\sign(a_1)\\left\\|\\ba\\right\\|_2,"}</MD>
        <p>
          denn dann ist <M>{"v_1 = a_1 + \\sign(a_1)\\left\\|\\ba\\right\\|_2"}</M> eine
          Addition von Zahlen gleichen Vorzeichens und damit immer gutartig. Geometrisch heißt
          das: Wir
          spiegeln stets auf das Ziel, das <em>weiter</em> von <M>{"\\ba"}</M> entfernt liegt.
        </p>
      </EnvBlock>

      <ExpandedReading title="warum das Vorzeichen von α zählt: Auslöschung, live">
        <AusloeschungWidget />
      </ExpandedReading>

      <EnvBlock kind="Bemerkung" label="7.5.10 (Aufwand)">
        <p>
          In der Praxis stellt niemand <M>{"\\bH"}</M> als Matrix auf. Für einen beliebigen
          Vektor <M>{"\\bu"}</M> gilt
        </p>
        <MD>
          {"\\bH\\bu = \\bu - \\left(2\\,\\frac{\\bv^\\top\\bu}{\\bv^\\top\\bv}\\right)\\bv,"}
        </MD>
        <p>
          also genügen zwei Skalarprodukte und eine Vektor-Aktualisierung:{" "}
          <M>{"\\Ocal(n)"}</M> Operationen statt <M>{"\\Ocal(n^2)"}</M> für das explizite
          Matrix-Vektor-Produkt (<ConceptLink id="big-o-notation">Landau-Notation</ConceptLink>
          ). Genauso wird <M>{"\\bQ"}</M> selbst nie explizit gebildet: Man speichert nur die
          Spiegelvektoren <M>{"\\bv_k"}</M> (bzw. bei Givens die Paare <M>{"(c, s)"}</M>) und
          wendet sie bei Bedarf nacheinander an.
        </p>
      </EnvBlock>

      {/* ------------------------------------------------------------------ */}
      <h3 id="sec-7.5-aufbau" className="mt-6 text-lg font-semibold">
        Von den Bausteinen zur QR-Zerlegung
      </h3>

      <p>
        Setzen wir die Teile zusammen. Im <M>{"k"}</M>-ten Eliminationsschritt betrachten wir
        vom aktuellen Zwischenprodukt die <M>{"k"}</M>-te Spalte ab der Diagonalen, also den
        Teilvektor <M>{"\\ba = (a_{kk}, \\ldots, a_{mk})^\\top"}</M>. Dazu konstruieren wir
        nach Satz 7.5.7 eine Spiegelung <M>{"\\wt{\\bH}_k"}</M> mit{" "}
        <M>{"\\wt{\\bH}_k\\ba = \\alpha\\,\\be_1"}</M> (oder eine Kette von Givens-Rotationen
        mit derselben Wirkung) und betten sie ein:
      </p>
      <MD>
        {"\\bQ_k = \\begin{pmatrix} \\bI_{k-1} & \\bnull \\\\ \\bnull & \\wt{\\bH}_k \\end{pmatrix}."}
      </MD>
      <p>
        <M>{"\\bQ_k"}</M> ist orthogonal, lässt die ersten <M>{"k-1"}</M> Zeilen unberührt und
        macht in Spalte <M>{"k"}</M> alle Einträge unter der Diagonalen zu Null. Entscheidend:
        Die schon fertigen Spalten <M>{"1, \\ldots, k-1"}</M> bleiben fertig. Warum? Unterhalb
        der Diagonalen stehen dort bereits Nullen, und <M>{"\\bQ_k"}</M> verändert nur die
        Zeilen <M>{"k, \\ldots, m"}</M>; auf diesem Nullblock wirkt{" "}
        <M>{"\\wt{\\bH}_k"}</M> als <M>{"\\wt{\\bH}_k\\bnull = \\bnull"}</M>. Nach{" "}
        <M>{"p = \\min(n, m-1)"}</M> Schritten ist{" "}
        <ConceptLink id="triangular-matrix">obere Dreiecksgestalt</ConceptLink> erreicht:
      </p>
      <MD>
        {"\\bQ_p \\cdots \\bQ_1\\,\\bA = \\begin{pmatrix} \\bR \\\\ \\bnull \\end{pmatrix} \\quimpl \\bQ^\\top = \\bQ_p \\cdots \\bQ_1, \\qquad \\bA = \\bQ \\begin{pmatrix} \\bR \\\\ \\bnull \\end{pmatrix}."}
      </MD>
      <p>
        Das Produkt von Orthogonalmatrizen ist wieder orthogonal, also ist{" "}
        <M>{"\\bQ = \\bQ_1^\\top \\cdots \\bQ_p^\\top"}</M> tatsächlich die gesuchte
        Orthogonalmatrix, und wir haben eine QR-Zerlegung im Sinne von{" "}
        <a className="underline" href="#sec-7.4">
          Abschnitt 7.4
        </a>{" "}
        konstruiert. Für das Kleinste-Quadrate-Problem wenden wir dieselben{" "}
        <M>{"\\bQ_k"}</M> parallel auf <M>{"\\bb"}</M> an und lösen anschließend{" "}
        <M>{"\\bR\\,\\wh{\\bx} = \\bc_1"}</M> per{" "}
        <ConceptLink id="triangular-solve">Rücksubstitution</ConceptLink>.
      </p>
      <p>
        Als Faustregel zum Mitnehmen: Für voll besetzte Matrizen ist{" "}
        <b>Householder</b> die Standardwahl: weniger Operationen pro Spalte, hervorragende
        numerische Stabilität; genau so arbeiten die QR-Löser der gängigen Software (etwa hinter{" "}
        <code>lm()</code> in R). <b>Givens</b> spielt seine Stärke aus, wenn{" "}
        <ConceptLink id="sparse-matrix">Dünnbesetztheit</ConceptLink> (sparsity) erhalten
        bleiben soll oder nur einzelne Einträge zu eliminieren sind. Im Vergleich zu den{" "}
        <a className="underline" href="#sec-7.3">
          Normalengleichungen
        </a>{" "}
        vermeiden beide Zugänge das Quadrieren der{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink>. Dazu mehr im
        Methodenvergleich in{" "}
        <a className="underline" href="#sec-7.6">
          Abschnitt 7.6
        </a>
        .
      </p>

      <p className="border-t border-slate-200 pt-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
        <b>Vertiefung:</b> Heath §3.5.1 (Householder-Transformationen) und §3.5.2
        (Givens-Rotationen); Methodenvergleich in Heath §3.7; zur Rolle orthogonaler
        Projektionen im Kleinste-Quadrate-Kontext auch MML §3.8.
      </p>
    </div>
  );
}
