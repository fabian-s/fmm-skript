import { useMemo, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  clamp,
  fmtDe,
  useDrag,
} from "../../../lib";

/**
 * Widgets für §4.2 „Kondition".
 *
 * ── KehrwertWidget ─────────────────────────────────────────────────────────
 * DIE EINE EINSICHT: Nicht die Größe der Störung entscheidet, sondern ihr
 * Verhältnis zu x — schieben wir x̃ an die Polstelle, wächst der grüne
 * Outputbalken über alle Grenzen, während der rote Inputbalken stehen bleibt.
 *
 * ── SummenKonditionWidget ──────────────────────────────────────────────────
 * DIE EINE EINSICHT: κ_rel der Summe hängt nur von der RICHTUNG von x ab; auf
 * der Antidiagonalen ist das Problem schlecht gestellt, auf der Diagonalen so
 * gutmütig wie ein Problem nur sein kann.
 *
 * FARBROLLEN §4.2 (Rollentabelle des Kapitels im Kopf von S41Widgets.tsx):
 *   blau   ungestörter Input x bzw. der Punkt in der Ebene
 *   rot    Störung ε und relativer Inputfehler
 *   grün   relativer Outputfehler
 *   orange Verstärkungsfaktor bzw. Konditionszahl κ
 *   grau   Achsen, Gitter, Nebentext
 *
 * PROVENIENZ: Eigenbau (Fassung 2026-08-05, hier auf Direktmanipulation,
 * Voreinstellungen und <Verdikt> umgebaut).
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-04-fehler/check-kap04.mjs,
 * 2026-08-19):
 *   Kehrwert, Voreinstellung x = 0,6 und ε = −0,45: x̃ = 0,15, relativer
 *   Inputfehler 75 %, relativer Outputfehler 300 %, Verstärkung 4 = x/|x+ε|.
 *   Verstärkung 2 bei ε = −0,3, Verstärkung 5 bei ε = −0,48, Verstärkung 10
 *   bei ε = −0,54 (jeweils x = 0,6). Asymptotisch ist κ_rel(1/x) = 1
 *   (Beispiel 4.2.5).
 *   Summe: κ_rel(1,2; −0,85) = 5,9419 (‖x‖₂ = 1,47054, Summe 0,35);
 *   κ_rel(1,4; 1,4) = 1; κ_rel(1,5; −1,45) = 59,008 (2 verlorene Stellen);
 *   κ_rel(1,5; −1,5) = ∞; κ_abs = √2 = 1,41421.
 *   R2-Nachprüfung: verify/R2/check-s42-claims.mjs, 2026-08-20.
 */

const COL = {
  x: FMM_COLORS.blau, // ungestörter Input / Punkt
  pert: FMM_COLORS.rot, // Störung ε, relativer Inputfehler
  out: FMM_COLORS.gruen, // relativer Outputfehler
  amp: FMM_COLORS.orange, // Verstärkung / Konditionszahl
};

/** Exponent als Unicode-Hochzahl: Widget-Text läuft nicht durch MathJax. */
function hoch(e: number): string {
  const z = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";
  return (e < 0 ? "\u207b" : "") + String(Math.abs(e)).split("").map((d) => z[Number(d)]).join("");
}

const fmtPct = (v: number): string => (Number.isFinite(v) ? `${fmtDe(100 * v, 1)} %` : "–");

function Readout({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200/70 py-0.5 last:border-b-0 dark:border-slate-700">
      <span style={color ? { color } : undefined}>{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}

/* ================================================================== */
/* f(x) = 1/x: relativer Input- gegen Outputfehler                     */
/* ================================================================== */

const W = 400;
const H = 300;
const L = 46;
const R = 12;
const T = 12;
const B = 30;
const XMAX = 3.4;
const YMAX = 10;
const sx = (wx: number) => L + ((W - L - R) * wx) / XMAX;
const sy = (wy: number) => T + (H - T - B) * (1 - Math.min(wy, YMAX) / YMAX);

export function KehrwertWidget() {
  const [x, setX] = useState(0.6);
  const [eps, setEps] = useState(-0.45);

  const xt = x + eps;
  const valid = xt > 0.001;
  const fx = 1 / x;
  const fxt = valid ? 1 / xt : NaN;
  const relIn = Math.abs(eps) / x;
  const relOut = valid ? Math.abs(fxt - fx) / fx : NaN; // = |ε| / |x + ε|
  const amp = valid && relIn > 0 ? relOut / relIn : NaN; // = x / |x + ε|

  // x̃ ist direkt auf der Achse ziehbar; der ε-Regler ist der Doppelpfad.
  const zieh = useDrag<"xt">({
    feld: { x0: L, y0: T, w: W - L - R, h: H - T - B },
    welt: { x0: 0, x1: XMAX, y0: 0, y1: YMAX },
    clamp: ([wx, wy]) => [clamp(wx, 0.001, XMAX), wy],
    onDrag: ([wx]) => setEps(clamp(Math.round((wx - x) * 200) / 200, -0.55, 0.55)),
  });

  const curve = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 180; i++) {
      const t = 1 / YMAX + (3.35 - 1 / YMAX) * (i / 180);
      pts.push(`${sx(t).toFixed(1)},${sy(1 / t).toFixed(1)}`);
    }
    return pts.join(" ");
  }, []);

  const fxC = Math.min(fx, YMAX);
  const fxtC = valid ? Math.min(fxt, YMAX) : YMAX;

  const verdikt = !valid ? (
    <Verdikt kind="fail" titel="Über die Polstelle geschoben.">
      Für <M>{"\\wt{x} = x + \\eps \\le 0"}</M> hat das Ergebnis nicht einmal mehr das richtige
      Vorzeichen. Genau dieses Regime beschreibt Beispiel 4.2.1: Läuft{" "}
      <M>{"\\wt{x}"}</M> gegen null, durchläuft der relative Outputfehler das ganze Intervall{" "}
      <M>{"[0, \\infty)"}</M>.
    </Verdikt>
  ) : eps === 0 ? (
    <Verdikt kind="neutral" titel="Keine Störung.">
      Ohne Störung gibt es keinen Fehlerquotienten: <M>{"0/0"}</M> ist nicht definiert. Schieben
      wir <M>{"\\eps"}</M> ein Stück von null weg oder ziehen wir den roten Punkt auf der Achse.
    </Verdikt>
  ) : !(amp >= 1.5) ? (
    <Verdikt kind="ok" titel="Verstärkung nahe 1.">
      Der relative Outputfehler ({fmtPct(relOut)}) ist kaum größer als der relative Inputfehler
      ({fmtPct(relIn)}); die Verstärkung liegt bei {Number.isFinite(amp) ? fmtDe(amp, 2) : "∞"}. Das passt zu Beispiel 4.2.5: Für
      kleine <M>{"\\eps/x"}</M> ist der Kehrwert relativ gemessen harmlos,{" "}
      <M>{"\\kappa_{rel} = 1"}</M>, und das gilt an <em>jeder</em> Stelle{" "}
      <M>{"x > 0"}</M>, auch bei <M>{"x = 10^{-17}"}</M>.
    </Verdikt>
  ) : (
    <Verdikt kind="warn" titel="Der Faktor x/|x + ε| schlägt zu.">
      Aus {fmtPct(relIn)} Inputfehler werden {fmtPct(relOut)} Outputfehler, Verstärkung{" "}
      {Number.isFinite(amp) ? fmtDe(amp, 2) : "∞"}. Der Faktor ist <M>{"|x| / |x + \\eps|"}</M> aus Beispiel 4.2.1, und er wächst
      über alle Grenzen, sobald <M>{"\\wt{x}"}</M> die Polstelle erreicht. Die Konditionszahl{" "}
      <M>{"\\kappa_{rel} = 1"}</M> aus Bemerkung 4.2.3 widerspricht dem nicht: Sie beschreibt
      nur den Grenzfall <M>{"\\eps \\to 0"}</M>, und hier ist <M>{"\\eps"}</M> relativ zu{" "}
      <M>{"x"}</M> eben nicht klein.
    </Verdikt>
  );

  return (
    <div className="my-3 space-y-2">
      <Aufgabe>
        Ziehen wir den roten Punkt <M>{"\\wt{x}"}</M> auf der Achse in Richtung null und
        vergleichen dabei die Länge des roten mit der des grünen Balkens.
      </Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto rounded border border-slate-300 dark:border-slate-600"
        role="img"
        aria-label={`Graph von f(x) = 1 durch x mit dem Punkt x, dem gestörten Punkt x plus epsilon und den Fehlerintervallen auf beiden Achsen; die Verstärkung beträgt derzeit ${Number.isFinite(amp) ? fmtDe(amp, 2) : "unendlich"}.`}
        {...zieh.svgProps}
      >
        <rect x={0} y={0} width={W} height={H} fill="var(--w-bg)" />
        {/* Achsen */}
        <line x1={L} y1={sy(0)} x2={W - R} y2={sy(0)} stroke="var(--w-axis)" strokeWidth={1.2} />
        <line x1={sx(0)} y1={T} x2={sx(0)} y2={sy(0)} stroke="var(--w-axis)" strokeWidth={1.2} />
        {[1, 2, 3].map((t) => (
          <g key={`xt${t}`}>
            <line x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(0) + 4} stroke="var(--w-axis)" />
            <text x={sx(t)} y={sy(0) + 16} textAnchor="middle" fill="var(--w-muted)" fontSize={11}>
              {t}
            </text>
          </g>
        ))}
        {[2, 4, 6, 8, 10].map((t) => (
          <g key={`yt${t}`}>
            <line x1={sx(0) - 4} y1={sy(t)} x2={sx(0)} y2={sy(t)} stroke="var(--w-axis)" />
            <text x={sx(0) - 7} y={sy(t) + 4} textAnchor="end" fill="var(--w-muted)" fontSize={11}>
              {t}
            </text>
          </g>
        ))}
        <text x={W - R - 2} y={sy(0) - 6} textAnchor="end" fill="var(--w-muted)" fontSize={12} fontStyle="italic">
          x
        </text>
        <text x={sx(0) + 8} y={T + 12} fill="var(--w-muted)" fontSize={12} fontStyle="italic">
          f(x) = 1/x
        </text>
        <polyline points={curve} fill="none" stroke="var(--w-axis)" strokeWidth={1.8} />

        {/* Inputfehler auf der x-Achse (rot) */}
        <line
          x1={sx(Math.min(x, Math.max(xt, 0)))}
          y1={sy(0)}
          x2={sx(Math.max(x, xt))}
          y2={sy(0)}
          stroke={COL.pert}
          strokeWidth={5}
          strokeLinecap="round"
          pointerEvents="none"
        />
        <text
          x={sx((x + Math.max(xt, 0)) / 2)}
          y={sy(0) + 16}
          textAnchor="middle"
          fill={COL.pert}
          fontSize={12}
          fontStyle="italic"
          fontWeight={600}
          pointerEvents="none"
        >
          ε
        </text>

        {/* Outputfehler auf der y-Achse (grün) */}
        {valid && (
          <line
            x1={sx(0)}
            y1={sy(fxC)}
            x2={sx(0)}
            y2={sy(fxtC)}
            stroke={COL.out}
            strokeWidth={5}
            strokeLinecap="round"
            pointerEvents="none"
          />
        )}

        {/* ungestört (blau) */}
        <polyline
          points={`${sx(x)},${sy(0)} ${sx(x)},${sy(fxC)} ${sx(0)},${sy(fxC)}`}
          fill="none"
          stroke={COL.x}
          strokeWidth={1.3}
          strokeDasharray="4 3"
          pointerEvents="none"
        />
        <circle cx={sx(x)} cy={sy(fxC)} r={4.5} fill={COL.x} pointerEvents="none" />
        <text x={sx(x) + 7} y={sy(fxC) - 7} fill={COL.x} fontSize={12} fontStyle="italic" fontWeight={600} pointerEvents="none">
          (x, f(x))
        </text>

        {/* gestört (rot) */}
        {valid && (
          <g>
            <polyline
              points={`${sx(xt)},${sy(0)} ${sx(xt)},${sy(fxtC)} ${sx(0)},${sy(fxtC)}`}
              fill="none"
              stroke={COL.pert}
              strokeWidth={1.3}
              strokeDasharray="4 3"
              pointerEvents="none"
            />
            <circle cx={sx(xt)} cy={sy(fxtC)} r={4.5} fill={COL.pert} pointerEvents="none" />
            {fxt > YMAX && (
              <text x={sx(xt) + 7} y={sy(fxtC) + 12} fill={COL.pert} fontSize={11} pointerEvents="none">
                f(x̃) &gt; 10, außerhalb des Bildes
              </text>
            )}
          </g>
        )}

        {/* Zuggriff für x̃ auf der Achse */}
        <DragHandle
          x={sx(clamp(xt, 0, XMAX))}
          y={sy(0)}
          farbe={COL.pert}
          aktiv={zieh.dragging === "xt"}
          label="x̃"
          labelDy={-10}
          labelDx={-12}
          {...zieh.handleProps("xt")}
        />
      </svg>

      <Slider label="Input x" value={x} onChange={setX} min={0.1} max={2.8} step={0.01} accent={COL.x} />
      <Slider label="Störung ε" value={eps} onChange={setEps} min={-0.55} max={0.55} step={0.005} accent={COL.pert} />

      <div className={`p-2 text-sm ${W_PANEL}`}>
        <Readout label="x̃ = x + ε" value={fmtDe(xt, 2)} color={COL.pert} />
        <Readout label="f(x) = 1/x" value={fmtDe(fx, 2)} color={COL.x} />
        <Readout label="f(x̃) = 1/x̃" value={valid ? fmtDe(fxt, 2) : "–"} />
        <Readout label="rel. Inputfehler |ε|/|x|" value={fmtPct(relIn)} color={COL.pert} />
        <Readout label="rel. Outputfehler" value={fmtPct(relOut)} color={COL.out} />
        <Readout label="Verstärkung x/|x + ε|" value={Number.isFinite(amp) ? fmtDe(amp, 2) : "∞"} color={COL.amp} />
      </div>
      {verdikt}
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Beide Fehlerquotienten hängen nur vom Verhältnis <M>{"\\eps/x"}</M> ab; die Stelle{" "}
        <M>{"x"}</M> selbst spielt keine Rolle.
      </p>
    </div>
  );
}

/* ================================================================== */
/* f(x) = x₁ + x₂: κ_rel als Karte über der Ebene                      */
/* ================================================================== */

/** Farbrampe: κ = 1 (fast weiß) → orange → rot (κ ≥ 100). */
function ramp(t: number): string {
  const a: [number, number, number] = [255, 250, 240];
  const b: [number, number, number] = [230, 159, 0];
  const c: [number, number, number] = [213, 94, 0];
  const mix = (u: [number, number, number], v: [number, number, number], s: number) =>
    [0, 1, 2].map((i) => Math.round(u[i] + (v[i] - u[i]) * s));
  const rgb = t < 0.5 ? mix(a, b, t * 2) : mix(b, c, (t - 0.5) * 2);
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

const HALF = 2;
const KS = 340;
const kx = (wx: number) => ((wx + HALF) / (2 * HALF)) * KS;
const ky = (wy: number) => ((HALF - wy) / (2 * HALF)) * KS;

const PRESETS: { id: string; text: string; p: [number, number] }[] = [
  { id: "diag", text: "Diagonale: κ = 1", p: [1.4, 1.4] },
  { id: "mittel", text: "mäßig", p: [1.2, -0.85] },
  { id: "nah", text: "nahe Auslöschung", p: [1.5, -1.45] },
  { id: "gestellt", text: "schlecht gestellt", p: [1.5, -1.5] },
];

export function SummenKonditionWidget() {
  const [p, setP] = useState<[number, number]>([1.2, -0.85]);

  const cells = useMemo(() => {
    const n = 48;
    const cw = (2 * HALF) / n;
    const size = KS / n;
    const out: { x: number; y: number; c: string }[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const wx = -HALF + (i + 0.5) * cw;
        const wy = -HALF + (j + 0.5) * cw;
        const s = Math.abs(wx + wy);
        const k = s < 1e-12 ? Infinity : (Math.SQRT2 * Math.hypot(wx, wy)) / s;
        const t = Number.isFinite(k) ? Math.min(1, Math.max(0, Math.log10(Math.max(k, 1)) / 2)) : 1;
        out.push({ x: kx(-HALF + i * cw), y: ky(-HALF + (j + 1) * cw), c: ramp(t) });
      }
    }
    return { size, out };
  }, []);

  const summe = p[0] + p[1];
  const nrm = Math.hypot(p[0], p[1]);
  const kappa = Math.abs(summe) < 1e-12 ? Infinity : (Math.SQRT2 * nrm) / Math.abs(summe);

  const zieh = useDrag<"p">({
    feld: { x0: 0, y0: 0, w: KS, h: KS },
    welt: { x0: -HALF, x1: HALF, y0: -HALF, y1: HALF },
    clamp: ([a, b]) => [clamp(a, -HALF, HALF), clamp(b, -HALF, HALF)],
    onDrag: (q) => setP([Math.round(q[0] * 100) / 100, Math.round(q[1] * 100) / 100]),
  });

  const aktivesPreset = PRESETS.find((q) => q.p[0] === p[0] && q.p[1] === p[1])?.id;

  const verdikt = !Number.isFinite(kappa) ? (
    <Verdikt kind="fail" titel="Schlecht gestellt.">
      Auf der Antidiagonalen ist <M>{"x_1 + x_2 = 0"}</M>, der relative Outputfehler also nicht
      einmal definiert: <M>{"\\kappa_{rel} = \\infty"}</M>. Das ist der dritte Fall aus
      Bemerkung 4.2.4, und die Lösung von Beispiel 4.2.8 sagt genau, wo er auftritt.
    </Verdikt>
  ) : kappa < 3 ? (
    <Verdikt kind="ok" titel="Gut konditioniert.">
      <M>{"\\kappa_{rel}"}</M> = {Number.isFinite(kappa) ? fmtDe(kappa, 2) : "∞"}: relative Inputfehler werden höchstens um diesen
      Faktor verstärkt. Auf der grünen Diagonalen <M>{"x_2 = x_1"}</M> wird der Bestwert{" "}
      <M>{"\\kappa_{rel} = 1"}</M> angenommen (Beispiel 4.2.8). Besser geht es nicht, denn{" "}
      <M>{"\\kappa_{abs} = \\sqrt{2}"}</M> und <M>{"\\left\\| \\bx \\right\\|_2 / |x_1 + x_2| = 1/\\sqrt{2}"}</M>.
    </Verdikt>
  ) : kappa < 50 ? (
    <Verdikt kind="warn" titel="Mäßig konditioniert.">
      <M>{"\\kappa_{rel}"}</M> = {Number.isFinite(kappa) ? fmtDe(kappa, 2) : "∞"}. Nach der Faustregel aus Bemerkung 4.2.4 verlieren
      wir bis zu {Math.ceil(Math.log10(kappa))}{" "}
      {Math.ceil(Math.log10(kappa)) === 1 ? "Dezimalstelle" : "Dezimalstellen"} gegenüber der
      Genauigkeit des Inputs. Die Karte ist entlang jedes Strahls durch den Ursprung einfarbig: Nur die{" "}
      <em>Richtung</em> von <M>{"\\bx"}</M> zählt, nicht seine Länge.
    </Verdikt>
  ) : (
    <Verdikt kind="fail" titel="Schlecht konditioniert.">
      <M>{"\\kappa_{rel}"}</M> = {Number.isFinite(kappa) ? fmtDe(kappa, 2) : "∞"}: rund {Math.ceil(Math.log10(kappa))}{" "}
      {Math.ceil(Math.log10(kappa)) === 1 ? "Dezimalstelle geht" : "Dezimalstellen gehen"} verloren. Nahe der Antidiagonalen löschen sich <M>{"x_1"}</M> und{" "}
      <M>{"x_2"}</M> fast aus. Das ist dieselbe Auslöschung wie in Abschnitt 2.1, hier aber als
      Aussage über das <em>Problem</em> „addiere zwei Zahlen", nicht über einen Algorithmus.
    </Verdikt>
  );

  return (
    <div className="my-3 space-y-2">
      <Aufgabe>
        Ziehen wir den blauen Punkt auf die rote Antidiagonale und danach auf die grüne
        Diagonale; die Regler darunter setzen dieselben Koordinaten genau.
      </Aufgabe>
      <svg
        viewBox={`0 0 ${KS} ${KS}`}
        className="max-w-full h-auto rounded border border-slate-300 dark:border-slate-600"
        role="img"
        aria-label={`Karte der relativen Konditionszahl der Summe x1 plus x2 über der Ebene; entlang der Antidiagonalen explodiert sie. Der Punkt liegt bei (${fmtDe(p[0], 2)}; ${fmtDe(p[1], 2)}) mit kappa gleich ${Number.isFinite(kappa) ? fmtDe(kappa, 2) : "unendlich"}.`}
        {...zieh.svgProps}
        {...zieh.surfaceProps("p")}
      >
        {cells.out.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width={cells.size + 0.5} height={cells.size + 0.5} fill={c.c} shapeRendering="crispEdges" />
        ))}
        <line x1={kx(-HALF)} y1={ky(0)} x2={kx(HALF)} y2={ky(0)} stroke={FMM_COLORS.grau} strokeWidth={1} strokeOpacity={0.6} />
        <line x1={kx(0)} y1={ky(-HALF)} x2={kx(0)} y2={ky(HALF)} stroke={FMM_COLORS.grau} strokeWidth={1} strokeOpacity={0.6} />
        <text x={kx(HALF) - 16} y={ky(0) - 5} fill={FMM_COLORS.grau} fontSize={12} fontStyle="italic">
          x₁
        </text>
        <text x={kx(0) + 5} y={ky(HALF) + 14} fill={FMM_COLORS.grau} fontSize={12} fontStyle="italic">
          x₂
        </text>
        {/* Weißer Halo darunter: Rot auf dem dunkelroten Band der Karte wäre sonst unsichtbar. */}
        <line x1={kx(-HALF)} y1={ky(HALF)} x2={kx(HALF)} y2={ky(-HALF)} stroke="var(--w-bg)" strokeWidth={4} strokeOpacity={0.85} />
        <line x1={kx(-HALF)} y1={ky(HALF)} x2={kx(HALF)} y2={ky(-HALF)} stroke={COL.pert} strokeWidth={1.8} strokeDasharray="6 4" />
        <text x={kx(-1.92)} y={ky(0.55)} fill={COL.pert} fontSize={11} fontWeight={600} stroke="var(--w-bg)" strokeWidth={2.6} paintOrder="stroke">
          x₁ + x₂ = 0
        </text>
        <line x1={kx(-HALF)} y1={ky(-HALF)} x2={kx(HALF)} y2={ky(HALF)} stroke={COL.out} strokeWidth={1.4} strokeDasharray="3 4" />
        <text x={kx(1.35)} y={ky(1.7)} fill={COL.out} fontSize={11} fontWeight={600} stroke="var(--w-bg)" strokeWidth={2.6} paintOrder="stroke">
          κ = 1
        </text>
        <line x1={kx(0)} y1={ky(0)} x2={kx(p[0])} y2={ky(p[1])} stroke={COL.x} strokeWidth={1.5} strokeDasharray="2 3" pointerEvents="none" />
        <DragHandle x={kx(p[0])} y={ky(p[1])} r={5} farbe={COL.x} aktiv={zieh.dragging === "p"} {...zieh.handleProps("p")} />
      </svg>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((q) => (
          <button
            key={q.id}
            type="button"
            className={aktivesPreset === q.id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={aktivesPreset === q.id}
            onClick={() => setP(q.p)}
          >
            {q.text}
          </button>
        ))}
      </div>

      <Slider label="x₁" value={p[0]} onChange={(v) => setP([v, p[1]])} min={-HALF} max={HALF} step={0.01} accent={COL.x} />
      <Slider label="x₂" value={p[1]} onChange={(v) => setP([p[0], v])} min={-HALF} max={HALF} step={0.01} accent={COL.x} />

      <div className={`p-2 text-sm ${W_PANEL}`}>
        <Readout label="x = (x₁, x₂)" value={`(${fmtDe(p[0], 2)}; ${fmtDe(p[1], 2)})`} color={COL.x} />
        <Readout label="f(x) = x₁ + x₂" value={fmtDe(summe, 2)} />
        <Readout label="‖x‖₂" value={fmtDe(nrm, 2)} />
        <Readout label="κ_abs = √2" value={fmtDe(Math.SQRT2, 3)} />
        <Readout label="κ_rel = √2 · ‖x‖₂ / |x₁ + x₂|" value={Number.isFinite(kappa) ? fmtDe(kappa, 2) : "∞"} color={COL.amp} />
      </div>
      {verdikt}
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Legende: Farbe = <M>{"\\kappa_{rel}"}</M> (hell nahe 1, dunkel ab 100), rot gestrichelt
        die Antidiagonale, grün gestrichelt die Diagonale.
      </p>
    </div>
  );
}
