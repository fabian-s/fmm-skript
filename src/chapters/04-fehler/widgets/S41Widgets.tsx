import { useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  W_INPUT,
  W_MUTED,
  W_PANEL,
  clamp,
  fmtDe,
  useDrag,
} from "../../../lib";
import { num, ref } from "../../numbers.generated";

/**
 * Widgets für §4.1 „Fehlermaße und Fehlerzerlegung".
 *
 * ── FARBROLLEN KAPITEL 4 ────────────────────────────────────────────────────
 * Das Kapitel führt zwei Begriffswelten, und die Widgets folgen jeweils den
 * FORMELN ihres Abschnitts (E1: dieselbe Farbe für denselben Teilausdruck in
 * Text und Bild):
 *
 *   §4.1 Fehlerzerlegung (Def. 4.1.2, Gl. (4.1.1)):
 *     grün    der wahre/exakte Wert (v, f(π))
 *     blau    die berechnete Näherung (ṽ, π̃, f̃(π̃))
 *     rot     der absolute Fehler Δ bzw. der Algorithmusfehler
 *     orange  der relative Fehler δ bzw. der Folgefehler aus dem Input
 *     violett der Gesamtfehler
 *
 *   §4.2/§4.3 Kondition und Stabilität (S42Kondition.tsx, S42Lgs.tsx,
 *   S43Widgets.tsx):
 *     blau    der ungestörte Input x, grün der Output bzw. die exakte Lösung,
 *     rot     die Störung ε und der relative Inputfehler,
 *     orange  die Verstärkung κ.
 *
 * Grün und Rot tragen damit in §4.1 und §4.2 verschiedene Rollen. Das ist
 * bewusst und folgt der Farbgebung der Gleichungen im jeweiligen Abschnitt
 * (siehe Gl. (4.1.1) gegen Beispiel 4.2.1); wer die Rollen vereinheitlichen
 * will, muss zuerst die Formeln umfärben.
 *
 * ── VERIFIZIERTE ZAHLEN ─────────────────────────────────────────────────────
 * node, historische Prüfung, Skript nicht mehr vorhanden, 2026-08-19:
 *   Beispiel 4.1.4: Δ = (0,2; 0,3), ‖Δ‖₂ = 0,36056, ‖v‖₂ = 5,
 *   δ = 0,072111 = 7,2111 %, ‖ṽ‖₂ = 5,36004; Lemma-4.1.3-Band
 *   [4,63944; 5,36056] enthält ‖ṽ‖₂ (Abstand zur oberen Schranke 0,00052).
 *   δ = 10 % entspricht ‖Δ‖ = 0,5, δ = 1 % entspricht ‖Δ‖ = 0,05.
 *   Beispiel 4.1.6 (N = 2, k = 0): Algorithmusfehler −11,5855,
 *   Folgefehler −3,05516, Gesamtfehler −14,6407; die Probe geht auf 0 auf.
 *   Dominanzwechsel bei k = 0: bis N = 3 dominiert der Algorithmusfehler
 *   (Faktor > 2), bei N = 4 und N = 5 sind beide Anteile vergleichbar, ab
 *   N = 6 dominiert der Folgefehler (|algo|/|folge| = 0,22).
 */

const GRUEN = FMM_COLORS.gruen; // wahrer Wert v, f(π)
const BLAU = FMM_COLORS.blau; // Näherung ṽ, π̃, f̃(π̃)
const ROT = FMM_COLORS.rot; // absoluter Fehler Δ / Algorithmusfehler
const ORANGE = FMM_COLORS.orange; // relativer Fehler δ / Folgefehler
const VIOLETT = FMM_COLORS.violett; // Gesamtfehler

/** Exponent als Unicode-Hochzahl: Widget-Text läuft nicht durch MathJax. */
function hoch(e: number): string {
  const z = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";
  return (e < 0 ? "\u207b" : "") + String(Math.abs(e)).split("").map((d) => z[Number(d)]).join("");
}

/** Deutsche Zahl; sehr kleine/große Werte als Mantisse · 10^Exponent. */
function fmtWiss(v: number, d = 3): string {
  if (!Number.isFinite(v)) return fmtDe(v, d);
  const a = Math.abs(v);
  if (a === 0) return "0";
  if (a >= 0.001 && a < 100000) return fmtDe(v, Math.max(0, d - Math.max(0, Math.floor(Math.log10(a)))));
  const e = Math.floor(Math.log10(a));
  return `${fmtDe(v / 10 ** e, d - 1)} · 10${hoch(e)}`;
}

/** Abgebrochene Exponentialreihe: Summe von x^n/n! für n = 0, …, N. */
function taylorExp(x: number, N: number): number {
  let term = 1;
  let sum = 1;
  for (let n = 1; n <= N; n++) {
    term *= x / n;
    sum += term;
  }
  return sum;
}

/* ================================================================== */
/* Fehlermaß-Rechner: v und ṽ als ziehbare Pfeile in der Ebene        */
/* ================================================================== */

/**
 * DIE EINE EINSICHT: Der absolute Fehler ist ein Pfeil zwischen zwei Punkten,
 * der relative Fehler misst diesen Pfeil an der Länge von v — und Lemma 4.1.3
 * ist genau die Aussage, dass ṽ dann in einem Ring um den Ursprung liegt.
 */

const S = 320; // viewBox-Kantenlänge
const FX = 36; // Zeichenfläche links
const FY = 12; // Zeichenfläche oben
const FW = S - FX - 12;
const FH = S - FY - 30;
const W0 = -0.7;
const W1 = 5.6;
const px = (wx: number) => FX + ((wx - W0) / (W1 - W0)) * FW;
const py = (wy: number) => FY + FH - ((wy - W0) / (W1 - W0)) * FH;
const skala = FW / (W1 - W0); // Weltlänge → Bildlänge

/** Ein Pfeil vom Ursprung zu (x, y). */
function Pfeil({ x, y, farbe, breite = 2 }: { x: number; y: number; farbe: string; breite?: number }) {
  const L = Math.hypot(x, y);
  if (L < 1e-9) return null;
  const [ux, uy] = [x / L, y / L];
  const spitzeL = Math.min(0.32, L * 0.5);
  const bx = x - ux * spitzeL;
  const by = y - uy * spitzeL;
  const [qx, qy] = [-uy * spitzeL * 0.38, ux * spitzeL * 0.38];
  return (
    <g pointerEvents="none">
      <line x1={px(0)} y1={py(0)} x2={px(bx)} y2={py(by)} stroke={farbe} strokeWidth={breite} />
      <polygon
        points={`${px(x)},${py(y)} ${px(bx + qx)},${py(by + qy)} ${px(bx - qx)},${py(by - qy)}`}
        fill={farbe}
      />
    </g>
  );
}

/**
 * Zahlenfeld auf Modulebene (nicht in der Komponente definiert): eine im
 * Render erzeugte Komponente wird bei jedem Tastendruck neu gemountet und
 * verliert den Fokus.
 */
function Koordinatenfeld({ label, aria, roh, onRoh }: { label: string; aria: string; roh: string; onRoh: (s: string) => void }) {
  return (
    <label className="flex items-center gap-1.5 text-sm">
      <span className={W_MUTED}>{label}</span>
      <input
        type="text"
        inputMode="decimal"
        aria-label={aria}
        className={`w-20 text-right font-mono ${W_INPUT}`}
        value={roh}
        onChange={(e) => onRoh(e.target.value)}
      />
    </label>
  );
}

export function FehlermassRechner() {
  const [v, setV] = useState<[number, number]>([3, 4]);
  const [vt, setVt] = useState<[number, number]>([3.2, 4.3]);
  // Zahlenfelder halten Strings (craft.md): sonst lassen sich „−" und „0," nicht tippen.
  const [text, setText] = useState<Record<string, string>>({});

  const d: [number, number] = [vt[0] - v[0], vt[1] - v[1]];
  const nd = Math.hypot(d[0], d[1]);
  const nv = Math.hypot(v[0], v[1]);
  const nvt = Math.hypot(vt[0], vt[1]);
  const delta = nv > 0 ? nd / nv : NaN;
  const unten = nv * (1 - delta);
  const oben = nv * (1 + delta);
  const tol = 0.1 * nv; // Radius des 10-%-Kreises um die Spitze von v

  const halten = (p: [number, number]): [number, number] => [
    clamp(p[0], W0 + 0.1, W1 - 0.1),
    clamp(p[1], W0 + 0.1, W1 - 0.1),
  ];
  const zieh = useDrag<"v" | "vt">({
    feld: { x0: FX, y0: FY, w: FW, h: FH },
    welt: { x0: W0, x1: W1, y0: W0, y1: W1 },
    clamp: (p) => halten(p as [number, number]),
    greifPosition: (id) => (id === "v" ? v : vt),
    onDrag: (p, id) => {
      const q: [number, number] = [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100];
      setText({});
      if (id === "v") setV(q);
      else setVt(q);
    },
  });

  const feld = (id: string, label: string, aria: string, wert: number, setzen: (n: number) => void) => (
    <Koordinatenfeld
      label={label}
      aria={aria}
      roh={text[id] ?? fmtDe(wert, 2)}
      onRoh={(s) => {
        setText((t) => ({ ...t, [id]: s }));
        const n = Number(s.trim().replace(/,/g, ".").replace(/−/g, "-"));
        if (s.trim() !== "" && Number.isFinite(n)) setzen(clamp(n, W0 + 0.1, W1 - 0.1));
      }}
    />
  );

  const gitter = [0, 1, 2, 3, 4, 5];

  const verdikt =
    nv < 0.2 ? (
      <Verdikt kind="warn" titel="Grenzfall ‖v‖ → 0.">
        Der absolute Fehler <M>{"\\left\\| \\bDelta_{\\bv} \\right\\|_2"}</M> = {fmtDe(nd, 3)} bleibt
        definiert, der relative nicht: {ref("definition:fehlermass")} verlangt{" "}
        <M>{"\\left\\| \\bv \\right\\| \\neq 0"}</M>. Auch {ref("lemma:fehlerschranken")} sagt hier nichts mehr, denn
        das Band um den Ursprung schrumpft mit <M>{"\\left\\| \\bv \\right\\|"}</M> auf einen Punkt.
      </Verdikt>
    ) : delta < 0.01 ? (
      <Verdikt kind="ok" titel="Unter 1 %.">
        <M>{"\\corange{\\delta_{\\bv}}"}</M> = {fmtDe(100 * delta, 2)} % liegt weit innerhalb des
        gestrichelten Kreises. {ref("lemma:fehlerschranken")} klemmt <M>{"\\left\\| \\wt{\\bv} \\right\\|_2"}</M> =
        {" "}
        {fmtDe(nvt, 3)} damit zwischen {fmtDe(unten, 3)} und {fmtDe(oben, 3)}: ein Ring, der auf dem
        Bild kaum noch Dicke hat.
      </Verdikt>
    ) : delta <= 0.1 ? (
      <Verdikt kind="ok" titel="Innerhalb der 10-%-Toleranz.">
        <M>{"\\left\\| \\bDelta_{\\bv} \\right\\|_2"}</M> = {fmtDe(nd, 3)} ist höchstens{" "}
        {fmtDe(tol, 3)} = 0,1 · <M>{"\\left\\| \\bv \\right\\|_2"}</M>, also{" "}
        <M>{"\\corange{\\delta_{\\bv}}"}</M> = {fmtDe(100 * delta, 2)} % ≤ 10 %. Nach {ref("lemma:fehlerschranken")}
        liegt <M>{"\\left\\| \\wt{\\bv} \\right\\|_2"}</M> = {fmtDe(nvt, 3)} damit im orangen Band
        [{fmtDe(unten, 3)}; {fmtDe(oben, 3)}], und die Spitze von <M>{"\\wt{\\bv}"}</M> tatsächlich
        im Ring.
      </Verdikt>
    ) : (
      <Verdikt kind="fail" titel="Toleranz gerissen.">
        <M>{"\\left\\| \\bDelta_{\\bv} \\right\\|_2"}</M> = {fmtDe(nd, 3)} übersteigt{" "}
        {fmtDe(tol, 3)}, der relative Fehler ist {fmtDe(100 * delta, 1)} %. Der orange Ring aus
        {ref("lemma:fehlerschranken")} ist entsprechend breit: <M>{"\\left\\| \\wt{\\bv} \\right\\|_2"}</M> darf
        irgendwo zwischen {fmtDe(unten, 3)} und {fmtDe(oben, 3)} liegen. Als Garantie über die
        Länge von <M>{"\\wt{\\bv}"}</M> ist das fast nichts wert.
      </Verdikt>
    );

  return (
    <div className="my-3 space-y-2">
      <Aufgabe>
        Ziehen wir die blaue Spitze <M>{"\\wt{\\bv}"}</M>: Solange sie im gestrichelten Kreis um{" "}
        <M>{"\\bv"}</M> bleibt, ist <M>{"\\corange{\\delta_{\\bv}}"}</M> höchstens 10 %.
      </Aufgabe>

      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Die Ebene mit dem wahren Vektor v, seiner Näherung v-Schlange und dem Fehlerpfeil dazwischen; der relative Fehler beträgt ${fmtDe(100 * delta, 1)} Prozent.`}
        {...zieh.svgProps}
      >
        <rect x={FX} y={FY} width={FW} height={FH} fill="var(--w-bg)" />
        {gitter.map((t) => (
          <g key={`g${t}`}>
            <line x1={px(t)} y1={FY} x2={px(t)} y2={FY + FH} stroke="var(--w-grid)" strokeWidth={1} />
            <line x1={FX} y1={py(t)} x2={FX + FW} y2={py(t)} stroke="var(--w-grid)" strokeWidth={1} />
          </g>
        ))}

        {/* Lemma-4.1.3-Band: alle Punkte mit Länge zwischen ‖v‖(1−δ) und ‖v‖(1+δ) */}
        {nv > 0.2 && Number.isFinite(delta) && (
          <path
            d={
              `M ${px(0) + oben * skala} ${py(0)} A ${oben * skala} ${oben * skala} 0 1 0 ${px(0) - oben * skala} ${py(0)}` +
              ` A ${oben * skala} ${oben * skala} 0 1 0 ${px(0) + oben * skala} ${py(0)} Z` +
              ` M ${px(0) + Math.max(unten, 0) * skala} ${py(0)} A ${Math.max(unten, 0) * skala} ${Math.max(unten, 0) * skala} 0 1 0 ${px(0) - Math.max(unten, 0) * skala} ${py(0)}` +
              ` A ${Math.max(unten, 0) * skala} ${Math.max(unten, 0) * skala} 0 1 0 ${px(0) + Math.max(unten, 0) * skala} ${py(0)} Z`
            }
            fillRule="evenodd"
            fill={ORANGE}
            fillOpacity={0.16}
            stroke={ORANGE}
            strokeWidth={0.8}
            strokeOpacity={0.7}
            pointerEvents="none"
          />
        )}

        {/* Achsen */}
        <line x1={FX} y1={py(0)} x2={FX + FW} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1.2} />
        <line x1={px(0)} y1={FY} x2={px(0)} y2={FY + FH} stroke="var(--w-axis)" strokeWidth={1.2} />
        {gitter.filter((t) => t > 0).map((t) => (
          <g key={`t${t}`}>
            <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={10} fill="var(--w-muted)">
              {t}
            </text>
            <text x={px(0) - 6} y={py(t) + 4} textAnchor="end" fontSize={10} fill="var(--w-muted)">
              {t}
            </text>
          </g>
        ))}

        {/* 10-%-Toleranzkreis um die Spitze von v */}
        {nv > 0.2 && (
          <circle
            cx={px(v[0])}
            cy={py(v[1])}
            r={tol * skala}
            fill="none"
            stroke={ORANGE}
            strokeWidth={1.4}
            strokeDasharray="5 4"
            pointerEvents="none"
          />
        )}

        <Pfeil x={v[0]} y={v[1]} farbe={GRUEN} />
        <Pfeil x={vt[0]} y={vt[1]} farbe={BLAU} />

        {/* absoluter Fehler Δ als Pfeil von der Spitze von v zur Spitze von ṽ */}
        {nd > 1e-6 && (
          <g pointerEvents="none">
            <line
              x1={px(v[0])}
              y1={py(v[1])}
              x2={px(vt[0])}
              y2={py(vt[1])}
              stroke={ROT}
              strokeWidth={2.4}
            />
            <text
              x={px((v[0] + vt[0]) / 2) + 10}
              y={py((v[1] + vt[1]) / 2)}
              fontSize={12}
              fontWeight={600}
              fill={ROT}
            >
              Δ
            </text>
          </g>
        )}

        <text x={px(v[0]) - 8} y={py(v[1]) + 18} fontSize={12} fontWeight={600} fill={GRUEN} pointerEvents="none">
          v
        </text>
        <text x={px(vt[0]) + 10} y={py(vt[1]) - 8} fontSize={12} fontWeight={600} fill={BLAU} pointerEvents="none">
          ṽ
        </text>

        <DragHandle x={px(v[0])} y={py(v[1])} farbe={GRUEN} aktiv={zieh.dragging === "v"} {...zieh.handleProps("v")} />
        <DragHandle x={px(vt[0])} y={py(vt[1])} farbe={BLAU} aktiv={zieh.dragging === "vt"} {...zieh.handleProps("vt")} />
      </svg>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: GRUEN }}>
            v
          </span>
          {feld("v1", "₁", "v 1", v[0], (n) => setV([n, v[1]]))}
          {feld("v2", "₂", "v 2", v[1], (n) => setV([v[0], n]))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: BLAU }}>
            ṽ
          </span>
          {feld("w1", "₁", "v Schlange 1", vt[0], (n) => setVt([n, vt[1]]))}
          {feld("w2", "₂", "v Schlange 2", vt[1], (n) => setVt([vt[0], n]))}
        </div>
        <button
          type="button"
          className={`text-xs underline ${W_MUTED}`}
          onClick={() => {
            setText({});
            setV([3, 4]);
            setVt([3.2, 4.3]);
          }}
        >
          zurück zu {ref("beispiel:fehlermasse-fuer-vektoren")}
        </button>
      </div>

      <div className={`grid gap-x-6 gap-y-0.5 p-3 font-mono text-xs sm:grid-cols-2 ${W_PANEL}`}>
        <span style={{ color: ROT }}>
          Δ = ṽ − v = ({fmtDe(d[0], 2)}; {fmtDe(d[1], 2)})
        </span>
        <span>
          <span style={{ color: ROT }}>‖Δ‖₂</span> = {fmtDe(nd, 4)}
        </span>
        <span>
          <span style={{ color: GRUEN }}>‖v‖₂</span> = {fmtDe(nv, 4)}
          {"  "}
          <span style={{ color: BLAU }}>‖ṽ‖₂</span> = {fmtDe(nvt, 4)}
        </span>
        <span>
          <span style={{ color: ORANGE }}>δ</span> ={" "}
          {nv > 0 ? `${fmtDe(delta, 4)} = ${fmtDe(100 * delta, 2)} %` : "nicht definiert"}
        </span>
        <span className="sm:col-span-2">
          <span style={{ color: ORANGE }}>{ref("lemma:fehlerschranken")}</span>: {fmtDe(unten, 4)} ≤ ‖ṽ‖₂ ={" "}
          {fmtDe(nvt, 4)} ≤ {fmtDe(oben, 4)}
        </span>
      </div>

      {verdikt}
    </div>
  );
}

/* ================================================================== */
/* Fehlerzerlegungs-Explorer (Beispiel 4.1.6, e^π)                    */
/* ================================================================== */

/**
 * DIE EINE EINSICHT: Der Gesamtfehler zerfällt in zwei Anteile mit getrennten
 * Stellschrauben — mehr Reihenglieder drücken nur den roten Anteil, ein
 * genauerer Input nur den orangen; wer am falschen dreht, ändert nichts.
 */

function FehlerBalken({
  label,
  value,
  color,
  vmax,
}: {
  label: string;
  value: number;
  color: string;
  vmax: number;
}) {
  const pct = Math.min(Math.abs(value) / vmax, 1) * 50;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-44 shrink-0 text-right text-xs sm:w-52 sm:text-sm" style={{ color }}>
        {label}
      </span>
      <div className="relative h-5 grow overflow-hidden rounded bg-slate-200/70 dark:bg-slate-800/70">
        <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: FMM_COLORS.grau }} />
        <div
          className="absolute bottom-1 top-1 rounded-sm"
          style={{
            backgroundColor: color,
            left: value < 0 ? `${50 - pct}%` : "50%",
            width: `${Math.max(pct, value === 0 ? 0 : 0.4)}%`,
          }}
        />
      </div>
      <span className="w-24 shrink-0 text-right font-mono text-xs">{fmtWiss(value)}</span>
    </div>
  );
}

export function FehlerzerlegungExplorer() {
  const [N, setN] = useState(2);
  const [k, setK] = useState(0);

  const xt = Number(Math.PI.toFixed(k)); // π auf k Nachkommastellen gerundet
  const fWahr = Math.exp(Math.PI); // f(π), „exakt" in Maschinengenauigkeit
  const fInput = Math.exp(xt); // f(π̃), exakte Arithmetik am gestörten Input
  const fTilde = taylorExp(xt, N); // f̃(π̃), abgebrochene Reihe

  const algoF = fTilde - fInput; // Fehler im Algorithmus
  const folgeF = fInput - fWahr; // Folgefehler aus dem Input
  const gesamt = fTilde - fWahr; // Gesamtfehler
  const vmax = Math.max(Math.abs(algoF), Math.abs(folgeF), Math.abs(gesamt), 1e-15);

  const verdikt =
    N === 2 && k === 0 ? (
      <Verdikt kind="neutral" titel={`${ref("beispiel:fehlerzerlegung-berechnung-von-e")}.`}>
        Genau die Rechnung aus dem Text: {fmtDe(algoF, 3)} + ({fmtDe(folgeF, 3)}) ={" "}
        {fmtDe(gesamt, 3)}. Der rote Algorithmusfehler ist fast viermal so groß wie der orange
        Folgefehler.
      </Verdikt>
    ) : Math.abs(algoF) > 2 * Math.abs(folgeF) ? (
      <Verdikt kind="warn" titel="Der Algorithmus dominiert.">
        Der rote Anteil ist {fmtDe(Math.abs(algoF) / Math.abs(folgeF), 1)}-mal so groß wie der
        orange. Nach der Zerlegung ({num("eq:eq-4-1-1")}) hilft hier nur ein besserer Algorithmus (größeres{" "}
        <M>{"N"}</M>); ein genauerer Input würde den Gesamtfehler kaum bewegen.
      </Verdikt>
    ) : Math.abs(folgeF) > 2 * Math.abs(algoF) ? (
      <Verdikt kind="warn" titel="Der Input dominiert.">
        Der orange Anteil ist {fmtDe(Math.abs(folgeF) / Math.abs(algoF), 1)}-mal so groß wie der
        rote. Der Algorithmus ist genau genug; kein noch so großes <M>{"N"}</M> repariert das,
        denn ({num("eq:eq-4-1-1")}) lässt den zweiten Summanden davon unberührt. Nur ein genaueres{" "}
        <M>{"\\wt{\\pi}"}</M> hilft.
      </Verdikt>
    ) : (
      <Verdikt kind="ok" titel="Beide Anteile gleichauf.">
        Roter und oranger Balken sind auf einen Faktor 2 gleich groß. Hier wäre es Verschwendung,
        nur an einer der beiden Schrauben zu drehen: Der Gesamtfehler halbiert sich erst, wenn
        beide Anteile kleiner werden.
      </Verdikt>
    );

  return (
    <div className="my-3 space-y-2">
      <Aufgabe>
        Schieben wir <M>{"N"}</M> und <M>{"k"}</M> und suchen die Einstellung, bei der beide
        Balken gleich lang sind.
      </Aufgabe>
      <Slider
        label="Abbruchordnung N"
        value={N}
        onChange={(v) => setN(Math.round(v))}
        min={0}
        max={10}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <Slider
        label="Nachkommastellen k"
        value={k}
        onChange={(v) => setK(Math.round(v))}
        min={0}
        max={6}
        step={1}
        fmt={(v) => String(Math.round(v))}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 font-mono text-xs sm:grid-cols-4">
        <span>
          <span style={{ color: BLAU }}>π̃</span> ={" "}
          {xt.toLocaleString("de-DE", { minimumFractionDigits: k, maximumFractionDigits: k })}
        </span>
        <span>
          <span style={{ color: BLAU }}>f̃(π̃)</span> = {fmtWiss(fTilde, 6)}
        </span>
        <span>
          <span style={{ color: FMM_COLORS.grau }}>f(π̃)</span> = {fmtWiss(fInput, 6)}
        </span>
        <span>
          <span style={{ color: GRUEN }}>f(π)</span> = {fmtWiss(fWahr, 6)}
        </span>
      </div>
      <div className="space-y-1">
        <FehlerBalken label="Algorithmus f̃(π̃) − f(π̃)" value={algoF} color={ROT} vmax={vmax} />
        <FehlerBalken label="Folgefehler f(π̃) − f(π)" value={folgeF} color={ORANGE} vmax={vmax} />
        <FehlerBalken label="Gesamtfehler f̃(π̃) − f(π)" value={gesamt} color={VIOLETT} vmax={vmax} />
      </div>
      <p className={`text-xs ${W_MUTED}`}>
        Probe zu ({num("eq:eq-4-1-1")}): <span style={{ color: ROT }}>{fmtWiss(algoF)}</span> +{" "}
        <span style={{ color: ORANGE }}>{fmtWiss(folgeF)}</span> ={" "}
        <span style={{ color: VIOLETT }}>{fmtWiss(algoF + folgeF)}</span>.
      </p>
      {verdikt}
    </div>
  );
}
