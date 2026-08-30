/**
 * Widgets für §7.5 „Konstruktion von Q: Givens und Householder".
 *
 * DIE EINE EINSICHT je Widget:
 *   GivensWidget – Eine einzige Drehung schiebt (a₁, a₂) auf die erste Achse;
 *     c und s liest man dabei direkt aus den beiden Komponenten ab, ganz ohne
 *     Trigonometrie (Satz 7.5.2).
 *   HouseholderWidget – H = I − 2P spiegelt, weil der v-Anteil zweimal
 *     abgezogen wird: einmal landet man auf dem Spiegel, zweimal dahinter.
 *   AusloeschungWidget – Das falsche Vorzeichen von α löscht die führenden
 *     Ziffern von v₁ aus, und die daraus gebaute „Spiegelung" trifft ihr Ziel
 *     nicht mehr (Bemerkung 7.5.9).
 *
 * FARBROLLEN Kapitel 7 (durchgehend): der gegebene Vektor a blau (die Eingabe
 * der Transformation), das Ergebnis Ga bzw. Ha grün, der abgezogene v-Anteil
 * rot (er ist der Term, den die Auslöschung zerstört), die Projektion auf die
 * Spiegelgerade violett (das „Residuum" dieses Schrittes), Spiegelgeraden und
 * Achsen neutral grau.
 *
 * PROVENIENZ: SVG-/Rechengerüst aus der internen App interactive/heath-ch3
 * (§3.5) portiert; Ziehgriffe, Verdikte und alle Texte für dieses Skript neu.
 *
 * PRÜFSTATUS: scripts/verify/REV29/07-kq-S75Local.mjs (2026-08-29), Teil von
 * `npm run verify:numbers`. Das Skript baut G, H und die t-stellige Arithmetik
 * unabhängig vom Widget-Code nach und assertiert:
 *   Givens: a = (4,3)ᵀ ⇒ r = 5, c = 0,8, s = 0,6, Ga = (5; 4,4e−16), θ = 36,870°;
 *   a = (−3,4)ᵀ ⇒ c = −0,6, s = 0,8, Ga = (5; 4,4e−16); c² + s² = 1 exakt.
 *   Householder mit ‖a‖ = 2: 2·vᵀa/vᵀv = 1,000000000 in allen geprüften Fällen;
 *   bei a-Richtung 130° und α = +2 ist w(0) = a, ‖w(1)‖ = 0,845237 mit
 *   vᵀw(1) = −1,3e−15 (also auf dem Spiegel), ‖w(2)‖ = 2 und
 *   ‖Ha − αe₁‖ = 1,2e−15. Die Projektion verkürzt also, erst der doppelte
 *   Schritt bringt die Länge zurück. Beide exakten Zustände (t = 1 und t = 2)
 *   sind Rastwerte des t-Reglers (Schritt 0,01).
 *   Auslöschung (a = (1, δ)ᵀ, t-stellige Arithmetik): δ = 10⁻³, t = 4 ⇒ die
 *   ungünstige Wahl liefert v₁ = 0 (0 korrekte Ziffern) und ‖Ha − αe₁‖ = 1,0e−3,
 *   die sichere Wahl v₁ = 2,000 (4 korrekte Ziffern) und 2,5e−10.
 *   δ = 10⁻¹, t = 4 ⇒ 2,6 gegen 4,0 korrekte Ziffern und 2,5e−4 gegen 6,2e−7
 *   (ungünstige gegen sichere Wahl, in dieser Reihenfolge).
 *   v₁ wird exakt zu 0 gerundet ab δ ≤ 10^(−1,5) (t = 4), 10^(−2,5) (t = 6),
 *   10^(−3,5) (t = 8).
 */
import { useId, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  LabeledTransformCanvas,
  M,
  MD,
  Slider,
  Verdikt,
  clamp,
  fmtDe,
  maxAbsCoord,
  useDrag,
  type DragApi,
  type Vec2,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/* ---------------------------------------------------------------- Helfer */

type V2 = [number, number];
const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
const scl = (a: V2, s: number): V2 => [a[0] * s, a[1] * s];
const dot2 = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];

function fmt(x: number): string {
  if (Math.abs(x) < 5e-10) return "0";
  if (Math.abs(x - Math.round(x)) < 5e-10) return String(Math.round(x));
  return fmtDe(x, 4);
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
    { v: [a1, a2], color: FMM_COLORS.blau, label: "a", draggable: true },
    { v: [r, 0], color: FMM_COLORS.gruen, label: "Ga" },
  ];
  return (
    <div className="my-2">
      <Aufgabe>
        Ziehen wir die Spitze von <M>{"\\ba"}</M> im Bild herum (oder nehmen die beiden Regler):{" "}
        <M>{"\\bG\\ba"}</M> landet immer auf der ersten Achse.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={G}
        vectors={vecs}
        worldHalf={wh}
        size={280}
        showUnitCircle
        onVectorChange={(i, v) => {
          if (i !== 0) return;
          setA1(Math.round(v[0] * 10) / 10);
          setA2(Math.round(v[1] * 10) / 10);
        }}
        ariaLabel={`Der Vektor a und sein Bild Ga unter der Givens-Rotation; Ga liegt auf der ersten Koordinatenachse und hat die Länge ${fmtDe(r, 3)}.`}
      />
      <div className="mt-2">
        <Slider label="a₁" value={a1} onChange={setA1} min={-5} max={5} step={0.1} accent={FMM_COLORS.blau} fmt={(v) => fmtDe(v, 1)} />
        <Slider label="a₂" value={a2} onChange={setA2} min={-5} max={5} step={0.1} accent={FMM_COLORS.blau} fmt={(v) => fmtDe(v, 1)} />
      </div>
      {degeneriert ? (
        <Verdikt kind="warn" titel="Nichts zu drehen:">
          <M>{"\\ba = \\bnull"}</M> – hier gibt es keine ausgezeichnete Drehung; jedes Paar mit{" "}
          <M>{"c^2 + s^2 = 1"}</M> tut es, üblich ist <M>{"\\bG = \\bI"}</M>. {ref("satz:wahl-von-c-und-s")} setzt
          deshalb <M>{"\\ba \\neq \\bnull"}</M> voraus.
        </Verdikt>
      ) : (
        <>
          <div className="my-2 text-sm">
            <MD>
              {`c = ${fmtMath(c)}, \\quad s = ${fmtMath(s)}, \\quad \\alpha = ${fmtMath(r)}`}
            </MD>
            <MD>{`\\theta \\approx ${fmtMath(theta, 2)}^{\\circ}`}</MD>
            <MD>
              {`\\bG = \\begin{pmatrix} ${fmtMath(c)} & ${fmtMath(s)} \\\\ ${fmtMath(-s)} & ${fmtMath(c)} \\end{pmatrix}`}
            </MD>
            <MD>{`\\bG\\ba = \\begin{pmatrix} ${fmtMath(r)} \\\\ 0 \\end{pmatrix}`}</MD>
          </div>
          <Verdikt kind="ok" titel="Zweite Komponente auf null:">
            {ref("satz:wahl-von-c-und-s")} liefert <M>{`c = a_1/r = ${fmtMath(c)}`}</M> und{" "}
            <M>{`s = a_2/r = ${fmtMath(s)}`}</M>, und damit ist{" "}
            <M>{"\\bG\\ba = (\\alpha, 0)^\\top"}</M> mit{" "}
            <M>{`\\alpha = \\left\\|\\ba\\right\\|_2 = ${fmtMath(r)}`}</M>. Die Länge musste
            herauskommen, denn <M>{"\\bG"}</M> ist orthogonal ({ref("lemma:qr-eigenschaften-von-orthogonalmatrizen")} (ii)). Der angezeigte
            Winkel <M>{`\\theta \\approx ${fmtMath(theta, 2)}^{\\circ}`}</M> dient nur der
            Anschauung; in die Formeln geht er nirgends ein.
          </Verdikt>
        </>
      )}
    </div>
  );
}

/** Deutsche Dezimalzahl für MathJax-Literale. */
function fmtMath(v: number, d = 4): string {
  return fmtDe(v, d).replace(",", "{,}").replace("−", "-");
}

/* --------------------------- Widget 2: Householder-Spiegelung, geometrisch */

const FARBEN = {
  a: FMM_COLORS.blau, // der gegebene Vektor a
  p: FMM_COLORS.rot, // v-Anteil v(vᵀa/vᵀv) – der Term, den die Auslöschung trifft
  proj: FMM_COLORS.violett, // Projektion auf die Spiegelgerade
  refl: FMM_COLORS.gruen, // Ha bzw. Wanderpunkt w(t)
  spiegel: FMM_COLORS.grau, // gewählte Spiegelgerade (neutral)
  spiegelAndere: FMM_COLORS.hellgrau, // die des anderen Vorzeichens
};

const HSIZE = 340;
const HHALF = 2.8;

/**
 * 2D-Geometrie von Ha: Vektor a, gewählte Spiegelgerade span(v)⊥, Anteil von
 * a längs v, Projektion auf die Spiegelgerade und Spiegelung. `t`
 * interpoliert a − t·v(vᵀa/vᵀv): t=1 Projektion, t=2 Spiegelung.
 */
function SpiegelungSVG({
  a,
  sign,
  t,
  zieh,
}: {
  a: V2;
  sign: 1 | -1;
  t: number;
  zieh: DragApi<"a">;
}) {
  const uid = useId();
  const size = HSIZE;
  const half = HHALF;
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
        pointerEvents="none"
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
        pointerEvents="none"
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
      className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
      role="img"
      aria-label={`Die Spiegelung von a an der Geraden senkrecht zu v; der Wanderpunkt steht bei t = ${fmtDe(t, 2)}.`}
      {...zieh.svgProps}
    >
      <defs>
        {farben.map((col) => (
          <marker key={col} id={`pf-${uid}-${col.slice(1)}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={col} />
          </marker>
        ))}
      </defs>
      {/* Achsen */}
      <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="var(--w-grid)" />
      <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="var(--w-grid)" />
      <text x={size - 16} y={size / 2 - 5} fontSize="11" fill="var(--w-axis)">
        x₁
      </text>
      <text x={size / 2 + 5} y={14} fontSize="11" fill="var(--w-axis)">
        x₂
      </text>
      {/* die beiden winkelhalbierenden Spiegelgeraden */}
      {line(d2, FARBEN.spiegelAndere, "3 4")}
      {line(d1, FARBEN.spiegel, "5 4", "span(v)⊥")}
      {/* Weg a → Projektion → Spiegelung, senkrecht zur Spiegelgeraden */}
      <polyline points={`${px(a)} ${px(proj)} ${px(refl)}`} fill="none" stroke="var(--w-axis)" strokeDasharray="2 3" />
      {/* Zielpunkte auf der Achse */}
      <circle cx={px([norm, 0])[0]} cy={px([norm, 0])[1]} r={3.5} fill="var(--w-text)" />
      <circle cx={px([-norm, 0])[0]} cy={px([-norm, 0])[1]} r={3.5} fill="var(--w-text)" />
      {label([norm, 0], "+‖a‖₂e₁", "var(--w-text)", -8, 16)}
      {label([-norm, 0], "−‖a‖₂e₁", "var(--w-text)", -24, 16)}
      {/* Vektoren */}
      {arrow(a, FARBEN.a)}
      {vv > 1e-12 && arrow(p, FARBEN.p)}
      {vv > 1e-12 && arrow(proj, FARBEN.proj)}
      {t === 2 && arrow(refl, FARBEN.refl)}
      {label(a, "a", FARBEN.a)}
      {vv > 1e-12 && label(p, "q", FARBEN.p, 6, 12)}
      {vv > 1e-12 && label(proj, "p", FARBEN.proj, -10, -8)}
      {t === 2 ? (
        label(refl, "Ha = αe₁", FARBEN.refl, -16, 26)
      ) : (
        <g>
          <circle cx={px(w)[0]} cy={px(w)[1]} r={5} fill={FARBEN.refl} pointerEvents="none" />
          {label(w, "w(t)", FARBEN.refl, 8, -8)}
        </g>
      )}
      <DragHandle x={px(a)[0]} y={px(a)[1]} r={5} farbe={FARBEN.a} aktiv={zieh.dragging === "a"} {...zieh.handleProps("a")} />
    </svg>
  );
}

function Swatch({ color }: { color: string }) {
  return <span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm align-middle" style={{ background: color }} />;
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

  /** a bleibt auf dem Kreis vom Radius 2; nur die Richtung ist ziehbar. */
  const zieh = useDrag<"a">({
    feld: { x0: 0, y0: 0, w: HSIZE, h: HSIZE },
    welt: { x0: -HHALF, x1: HHALF, y0: -HHALF, y1: HHALF },
    onDrag: ([px, py]) => {
      const g = (Math.atan2(py, px) * 180) / Math.PI;
      setDeg(clamp(Math.round(g), 10, 170));
    },
  });

  return (
    <div className="my-2">
      <Aufgabe>
        Schieben wir <M>{"t"}</M> von 0 nach 2 und ziehen zwischendurch <M>{"\\ba"}</M> im Bild
        herum; der Knopf wechselt die Spiegelgerade.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <SpiegelungSVG a={a} sign={sign} t={t} zieh={zieh} />
        <div className="min-w-56 grow basis-64 text-sm">
          <Slider label="Richtung von a (°)" value={deg} onChange={setDeg} min={10} max={170} step={1} accent={FARBEN.a} fmt={(x) => `${fmtDe(x, 0)}°`} />
          <div className="my-2 flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-right">Spiegel / Vorzeichen:</span>
            {([1, -1] as const).map((sg) => (
              <button
                key={sg}
                type="button"
                onClick={() => setSign(sg)}
                aria-pressed={sign === sg}
                className={`rounded border px-2 py-0.5 text-xs ${
                  sign === sg ? "border-sky-600 bg-sky-100 dark:bg-sky-900" : "border-slate-300 dark:border-slate-600"
                }`}
              >
                <M>{sg === 1 ? "\\alpha = +\\left\\|\\ba\\right\\|_2" : "\\alpha = -\\left\\|\\ba\\right\\|_2"}</M>
              </button>
            ))}
          </div>
          <Slider label="t" value={t} onChange={setT} min={0} max={2} step={0.01} accent={FARBEN.refl} fmt={(x) => fmtDe(x, 2)} />
          <div className="rounded bg-slate-200/70 p-2 font-mono text-xs tabular-nums dark:bg-slate-900/60">
            <div>
              a = ({fmt(a[0])}; {fmt(a[1])}), ‖a‖₂ = 2
            </div>
            <div>
              α = {sign === 1 ? "+" : "−"}2 → v = a − αe₁ = ({fmt(v[0])}; {fmt(v[1])})
            </div>
            <div>
              w(t) = ({fmt(w[0])}; {fmt(w[1])}), ‖w(t)‖₂ = {fmt(nw)}
            </div>
            <div>vᵀw(t) = {fmt(dot2(v, w))}</div>
          </div>
          <ul className="mt-2 space-y-0.5 text-xs">
            <li>
              <Swatch color={FARBEN.a} />
              <M>{"\\ba"}</M> – der gegebene Vektor
            </li>
            <li>
              <Swatch color={FARBEN.p} />
              <M>{"\\bq = \\bv\\,(\\bv^\\top\\ba/\\bv^\\top\\bv)"}</M> – Anteil von{" "}
              <M>{"\\ba"}</M> längs <M>{"\\bv"}</M> (im Bild als „q" beschriftet)
            </li>
            <li>
              <Swatch color={FARBEN.proj} />
              <M>{"\\bp = \\ba - \\bq"}</M> – Projektion auf die Spiegelgerade (im Bild „p")
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
              die des anderen Vorzeichens
            </li>
          </ul>
        </div>
      </div>
      {t < 0.05 ? (
        <Verdikt kind="neutral" className="mt-2" titel="Ausgangslage:">
          <M>{"\\bw(0) = \\ba"}</M> – noch ist nichts abgezogen. Der rote Pfeil zeigt, wie viel
          von <M>{"\\ba"}</M> längs <M>{"\\bv"}</M> liegt; das ist der Anteil, um den es geht.
        </Verdikt>
      ) : t === 1 ? (
        <Verdikt kind="warn" className="mt-2" titel="Halbzeit: die Projektion:">
          <M>{"\\bw(1) = (\\bI - \\bP)\\ba"}</M> liegt auf der Spiegelgeraden, erkennbar an{" "}
          <M>{"\\bv^\\top\\bw = "}</M> <span className="font-mono">{fmt(dot2(v, w))}</span>. Aber{" "}
          <M>{"\\left\\|\\bw(1)\\right\\|_2"}</M> = <span className="font-mono">{fmt(nw)}</span>{" "}
          ist echt kleiner als <M>{"\\left\\|\\ba\\right\\|_2 = 2"}</M>: Eine Projektion verkürzt,
          sie ist keine Orthogonalmatrix und für unseren Zweck unbrauchbar.
        </Verdikt>
      ) : Math.abs(t - 1) <= 0.05 + 1e-9 ? (
        <Verdikt kind="neutral" className="mt-2" titel="Fast auf dem Spiegel:">
          <M>{"\\bv^\\top\\bw"}</M> = <span className="font-mono">{fmt(dot2(v, w))}</span> ist
          klein, aber noch nicht null: <M>{"\\bw(t)"}</M> liegt knapp neben der Spiegelgeraden.
          Genau darauf landet der Wanderpunkt erst beim Reglerwert <M>{"t = 1{,}00"}</M>.
        </Verdikt>
      ) : t === 2 ? (
        <Verdikt kind="ok" className="mt-2" titel="Fertig gespiegelt:">
          <M>{"\\bw(2) = (\\bI - 2\\bP)\\ba = \\bH\\ba = \\alpha\\,\\be_1"}</M>, und die Länge ist
          mit <span className="font-mono">{fmt(nw)}</span> wieder da – {ref("satz:symmetrie-und-orthogonalitaet")} in Aktion:{" "}
          <M>{"\\bH^2 = \\bI"}</M>. Numerisch sicher ist hier die Wahl{" "}
          <M>{sicher === 1 ? "\\alpha = +\\left\\|\\ba\\right\\|_2" : "\\alpha = -\\left\\|\\ba\\right\\|_2"}</M>
          , also das von <M>{"\\ba"}</M> weiter entfernte Ziel ({ref("bemerkung:vorzeichenwahl")}).
        </Verdikt>
      ) : t >= 1.95 ? (
        <Verdikt kind="neutral" className="mt-2" titel="Fast fertig:">
          <M>{"\\left\\|\\bw(t)\\right\\|_2"}</M> = <span className="font-mono">{fmt(nw)}</span>{" "}
          liegt schon dicht an <M>{"\\left\\|\\ba\\right\\|_2 = 2"}</M>, ist aber noch kleiner.
          Erst der volle doppelte Schritt <M>{"t = 2{,}00"}</M> bringt die Länge exakt zurück –
          das ist der Unterschied zwischen Projektion und Spiegelung.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" className="mt-2" titel="Unterwegs:">
          <M>{"\\left\\|\\bw(t)\\right\\|_2"}</M> = <span className="font-mono">{fmt(nw)}</span>{" "}
          liegt unter 2. Für <M>{"0 < t < 2"}</M> ist der Wanderpunkt stets kürzer als{" "}
          <M>{"\\ba"}</M>; erst der volle doppelte Schritt bringt die Länge zurück.
        </Verdikt>
      )}
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

  const korrekteZiffernZahl = (comp: number, exakt: number): number => {
    const rel = Math.abs(comp - exakt) / Math.abs(exakt);
    if (rel === 0) return stellen;
    return Math.max(0, Math.min(stellen, -Math.log10(rel)));
  };
  const zifSchlecht = korrekteZiffernZahl(v1Schlecht, v1SchlechtExakt);
  const zifGut = korrekteZiffernZahl(v1Gut, v1GutExakt);
  const korrekteZiffern = (comp: number, exakt: number): string => {
    const d = korrekteZiffernZahl(comp, exakt);
    return d === stellen ? `alle ${stellen}` : fmtDe(d, 1);
  };

  const zeile = (
    name: string,
    alphaS: string,
    v1: number,
    v1Exakt: number,
    fehler: number,
    schlecht: boolean,
  ) => (
    <tr style={{ backgroundColor: `${schlecht ? FMM_COLORS.rot : FMM_COLORS.gruen}1f` }}>
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
    <div className="my-2 text-sm">
      <Aufgabe>
        Stellen wir <M>{"\\delta"}</M> klein und die Stellenzahl <M>{"t"}</M> niedrig und
        vergleichen die beiden Zeilen Spalte für Spalte.
      </Aufgabe>
      <Slider label="δ" value={logd} onChange={setLogd} min={-7} max={-1} step={0.5} fmt={(x) => `10^${fmtDe(x, 1)}`} />
      <Slider label="Stellen t" value={stellen} onChange={setStellen} min={2} max={10} step={1} fmt={(x) => fmtDe(x, 0)} />
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
      {v1Schlecht === 0 ? (
        <Verdikt kind="fail" titel="Nichts bleibt übrig:">
          In <M>{`t = ${stellen}`}</M> Stellen ist <M>{"\\delta^2"}</M> gar nicht mehr sichtbar,
          also wird <M>{"v_1 = 1 - \\left\\|\\ba\\right\\|_2"}</M> zu exakt 0 gerundet. Der
          Spiegelvektor verschwindet, und die daraus gebaute „Spiegelung" verfehlt ihr Ziel um{" "}
          <span className="font-mono">{fehlerSchlecht.toExponential(1)}</span>. Die sichere Wahl
          addiert stattdessen zwei positive Zahlen: <span className="font-mono">{fmtDe(zifGut, 1)}</span>{" "}
          korrekte Ziffern und Restfehler <span className="font-mono">{fehlerGut.toExponential(1)}</span>{" "}
          ({ref("bemerkung:vorzeichenwahl")}).
        </Verdikt>
      ) : zifSchlecht < zifGut - 0.5 ? (
        <Verdikt kind="warn" titel="Führende Ziffern verloren:">
          Die Subtraktion zweier fast gleicher Zahlen lässt von{" "}
          <M>{"v_1"}</M> nur <span className="font-mono">{fmtDe(zifSchlecht, 1)}</span> der{" "}
          <M>{`${stellen}`}</M> Ziffern übrig, die sichere Wahl behält{" "}
          <span className="font-mono">{fmtDe(zifGut, 1)}</span>. In der letzten Spalte schlägt das
          durch: <span className="font-mono">{fehlerSchlecht.toExponential(1)}</span> gegen{" "}
          <span className="font-mono">{fehlerGut.toExponential(1)}</span> – ein Faktor{" "}
          <span className="font-mono">{(fehlerSchlecht / fehlerGut).toExponential(1)}</span>.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Hier ist noch alles harmlos:">
          Mit <M>{`\\delta = 10^{${fmtMath(logd, 1)}}`}</M> und{" "}
          <M>{`t = ${stellen}`}</M> Stellen sind <M>{"1"}</M> und{" "}
          <M>{"\\left\\|\\ba\\right\\|_2"}</M> noch gut unterscheidbar, beide Wahlen liefern{" "}
          brauchbare Werte. Schieben wir <M>{"\\delta"}</M> nach unten oder{" "}
          <M>{"t"}</M> herunter, kippt die obere Zeile.
        </Verdikt>
      )}
    </div>
  );
}
