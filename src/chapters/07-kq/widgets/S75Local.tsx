/**
 * Lokale Hilfskomponenten aus der TSX-Fassung von §7.5 (MDX-Migration
 * 2026-08-11; Rendering unverändert übernommen, Namen beibehalten).
 * Widget-Code recycelt aus interactive/heath-ch3 (§3.5), Labels deutsch.
 */
import { useId, useState } from "react";
import {
  LabeledTransformCanvas,
  M,
  MD,
  maxAbsCoord,
  Slider,
  type Vec2,
} from "../../../lib";

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

export function GivensWidget() {
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

export function HouseholderWidget() {
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

export function AusloeschungWidget() {
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
