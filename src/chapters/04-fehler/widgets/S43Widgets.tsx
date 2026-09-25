import { useMemo, useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MD,
  Schaetzfrage,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_INPUT,
  W_MUTED,
  W_PANEL,
  fmtDe,
  mulberry32,
  useSeed,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * Widgets für §4.3 „Stabilität von Algorithmen".
 *
 * ── SgdLernratenDemo (in <Schaetzfrage> gewickelt) ─────────────────────────
 * DIE EINE EINSICHT: Ob die Iteration konvergiert, entscheidet allein der
 * Verstärkungsfaktor ρ = |1 − 2α| pro Schritt; bei α = 1 wird er 1, und
 * darüber explodieren die Iterierten — die Lernrate ist der Stabilitätsregler.
 * Deshalb steht der Faktor NICHT über dem Widget: Erst tippen, dann auflösen.
 *
 * ── KappaRechner ───────────────────────────────────────────────────────────
 * DIE EINE EINSICHT: κ_rel des letzten Schritts a − b wächst quadratisch in
 * der Verschiebung c, und log₁₀ κ zählt direkt die Dezimalstellen, die dabei
 * verloren gehen.
 *
 * FARBROLLEN §4.3 (Kapitel-Rollentabelle im Kopf von S41Widgets.tsx):
 *   blau   die Verlustfunktion L bzw. die Zwischengröße b = x̄²
 *   rot    die Zwischengröße a und der divergente Iteriertenpfad
 *   grün   konvergenter Pfad (der „gute" Ausgang)
 *   orange Verstärkung ρ bzw. Konditionszahl κ_rel
 *   violett der Grenzfall ρ = 1
 *   grau   Achsen, Gitter, Nebentext
 *
 * PROVENIENZ: Eigenbau; die Widgets rechnen ausschließlich eigene Werte, die
 * R-Ausgaben des Folien-Chunks zitiert nur der Fließtext (Lesson: R-Output
 * nicht in JS-Widgets spiegeln).
 *
 * PRÜFSTATUS (scripts/verify/R2/check-s43-claims.mjs, 2026-08-20, seit
 * 2026-08-29 ohne die tautologische Assertion; ergänzt um
 * scripts/verify/REV29/04-fehler-S43Widgets.mjs, 2026-08-29):
 *   SGD auf L(θ) = θ², θ₀ = 2,5: θ_{k+1} = θ_k (1 − 2α), also ρ = |1 − 2α|.
 *   ρ(0,25) = 0,5; ρ(0,45) = 0,1; ρ(0,5) = 0 (schnellste Konvergenz, ein
 *   Schritt); ρ(0,72) = 0,44; ρ(1) = 1 (Grenzfall, θ_30 = 2,5); ρ(1,15) = 1,3
 *   (θ_30 = 6,55 · 10³). Pfad bei α = 0,72: 2,5 · −1,1 · 0,484 · −0,213 ·
 *   0,094 · −0,041 · 0,018. Vorzeichenwechsel ab α > 0,5, Divergenz ab α > 1.
 *   κ_rel(h, (a, b)) = √2 · √(a² + b²)/|a − b| mit a = c² + 1, b = c²
 *   (|a − b| = 1 analytisch gesetzt): k = 2 ⇒ 2,0001 · 10⁴ (log₁₀ = 4,301);
 *   k = 5 ⇒ 2,0 · 10¹⁰ (log₁₀ = 10,301); k = 8 ⇒ 2,0 · 10¹⁶ (log₁₀ = 16,301);
 *   k = 10 ⇒ 2,0 · 10²⁰ (log₁₀ = 20,301).
 *   Freier Modus, Voreinstellung a = 2000, b = 1999: κ_rel = 3999,0
 *   (log₁₀ = 3,602). Beispiel 4.3.7: κ_rel · ε ≈ 4,4 · 10⁴, beobachtet
 *   16384/1,023151 = 1,60 · 10⁴, und 2¹⁴ = 16384.
 */

const FMM = {
  rot: FMM_COLORS.rot,
  blau: FMM_COLORS.blau,
  gruen: FMM_COLORS.gruen,
  orange: FMM_COLORS.orange,
  violett: FMM_COLORS.violett,
};

/* ================================================================== */
/* SGD-Lernraten-Demo                                                  */
/* ================================================================== */

const W = 470;
const H = 260;
const X0 = -3.3;
const X1 = 3.3;
const Y0 = -1.4;
const Y1 = 10.5;
const px = (x: number) => ((x - X0) / (X1 - X0)) * W;
const py = (y: number) => H - ((y - Y0) / (Y1 - Y0)) * H;

/** Exponent als Unicode-Hochzahl: Widget-Text läuft nicht durch MathJax. */
function hoch(e: number): string {
  const z = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";
  return (e < 0 ? "\u207b" : "") + String(Math.abs(e)).split("").map((d) => z[Number(d)]).join("");
}

/** Betrag deutsch, sehr kleine Werte als Zehnerpotenz statt als „0,0000". */
function fmtKlein(v: number): string {
  const a = Math.abs(v);
  if (a === 0) return "0";
  if (a >= 1e-3) return fmtDe(a, 4);
  const e = Math.floor(Math.log10(a));
  return `${fmtDe(a / 10 ** e, 1)} · 10${hoch(e)}`;
}

const ALPHA_PRESETS: { id: string; text: string; alpha: number }[] = [
  { id: "monoton", text: "monoton (α = 0,25)", alpha: 0.25 },
  { id: "einschritt", text: "ein Schritt (α = 0,5)", alpha: 0.5 },
  { id: "oszill", text: "oszillierend (α = 0,72)", alpha: 0.72 },
  { id: "grenz", text: "Grenzfall (α = 1)", alpha: 1 },
  { id: "div", text: "divergent (α = 1,15)", alpha: 1.15 },
];

/** Die Tafel selbst; `aufgeloest` schaltet Verstärkungsfaktor und Presets frei. */
function SgdTafel({ aufgeloest }: { aufgeloest: boolean }) {
  const [alpha, setAlpha] = useState(0.72);
  const [sigma, setSigma] = useState(0);
  const { seed, neueStichprobe } = useSeed(1);

  const N = 30;
  const THETA0 = 2.5;

  const { thetas, diverged } = useMemo(() => {
    const rnd = mulberry32(seed * 9301 + 49297);
    const arr: number[] = [THETA0];
    let th = THETA0;
    let div = false;
    for (let k = 0; k < N; k++) {
      // Summe dreier Gleichverteilter: Erwartungswert 0, Standardabweichung ≈ σ
      const noise = 2 * sigma * (rnd() + rnd() + rnd() - 1.5);
      th = th - alpha * (2 * th + noise);
      arr.push(th);
      if (!Number.isFinite(th) || Math.abs(th) > 1e4) {
        div = true;
        break;
      }
    }
    return { thetas: arr, diverged: div };
  }, [alpha, sigma, seed]);

  const rho = Math.abs(1 - 2 * alpha);
  // Der Regler rastet auf 0,01: die beiden ausgezeichneten Lernraten sind damit
  // exakt erkennbar und werden nicht aus einer Toleranz auf ρ erschlossen.
  const alphaRaster = Math.round(alpha * 100);
  const grenzfall = alphaRaster === 100;
  const einSchritt = alphaRaster === 50;
  // Der rauschfreie Vergleichswert |θ_N| = θ₀ ρ^N — im Verdikt darf NICHT der
  // verrauschte Pfad stehen, wenn der Satz „ohne Rauschen" sagt.
  const ohneRauschen = THETA0 * rho ** (thetas.length - 1);
  const farbe =
    diverged || rho > 1 ? FMM.rot : grenzfall ? FMM.violett : alpha > 0.5 ? FMM.orange : FMM.gruen;

  const parabel = Array.from({ length: 97 }, (_, i) => {
    const x = X0 + ((X1 - X0) * i) / 96;
    return `${px(x).toFixed(1)},${py(x * x).toFixed(1)}`;
  }).join(" ");
  const pfad = thetas.map((t) => `${px(t).toFixed(1)},${py(t * t).toFixed(1)}`).join(" ");
  const letzte = thetas[thetas.length - 1];

  const verdikt =
    diverged || rho > 1 ? (
      <Verdikt kind="fail" titel="Divergent.">
        Ohne Rauschen wird der Abstand in jedem Schritt mit {fmtDe(rho, 2)} vergrößert; die
        Iterierten verlassen hier nach {thetas.length - 1} Schritten den Plot. Rauschen ändert
        einzelne Schritte, aber nicht die Instabilität des Verstärkungsfaktors. Das ist das
        Signaturverhalten aus {ref("beispiel:stochastic-gradient-descent")}.
      </Verdikt>
    ) : grenzfall ? (
      <Verdikt kind="warn" titel="Grenzfall.">
        Ohne Rauschen springen die Iterierten mit konstanter Amplitude um das Minimum, weder
        Konvergenz noch Divergenz: <M>{"|\\theta_k|"}</M> bleibt bei{" "}
        {fmtDe(ohneRauschen, 2)}.
        {sigma > 0 &&
          ` Mit Rauschen kommt in jedem Schritt ein zufälliger Beitrag hinzu; im gezeigten Pfad steht am Ende |θ| = ${fmtKlein(letzte)}, und eine Konvergenz zum Minimum gibt es erst recht nicht.`}
      </Verdikt>
    ) : einSchritt ? (
      <Verdikt kind="ok" titel="ρ = 0: ein Schritt genügt.">
        Bei <M>{"\\alpha = 0{,}5"}</M> ist <M>{"\\rho = |1 - 2\\alpha| = 0"}</M>: Der erste Schritt
        landet ohne Rauschen exakt im Minimum, alle weiteren ändern nichts mehr. Schneller kann
        diese Iteration nicht sein.
        {sigma > 0 &&
          ` Mit Rauschen bleibt es nicht dabei: Der geschätzte Gradient ist im Minimum nicht null, nach ${thetas.length - 1} Schritten steht |θ| = ${fmtKlein(letzte)}.`}
      </Verdikt>
    ) : alpha > 0.5 ? (
      <Verdikt kind="ok" titel="Oszillierend, aber konvergent.">
        Jeder Schritt springt über das Minimum hinweg und landet auf der anderen Seite; der
        Abstand schrumpft trotzdem, nach {thetas.length - 1} Schritten auf{" "}
        {fmtKlein(letzte)}.
        {sigma > 0 && " Das Rauschen legt zusätzlich einen Teppich um das Minimum: Je größer die Lernrate, desto stärker schlagen die Schätzfehler des Gradienten durch."}
      </Verdikt>
    ) : (
      <Verdikt kind="ok" titel="Monoton konvergent.">
        Die Iterierten laufen von einer Seite auf das Optimum zu, nach {thetas.length - 1}{" "}
        Schritten ist <M>{"|\\theta_k|"}</M> = {fmtKlein(letzte)}.
        {sigma > 0 && " Mit Rauschen bleibt ein Restzappeln um das Minimum: Der geschätzte Gradient ist auch dort nicht null."}
      </Verdikt>
    );

  return (
    <div className="space-y-2">
      <Aufgabe>
        Schieben wir die Lernrate <M>{"\\alpha"}</M> nach oben und beobachten, wann die
        Iterierten aufhören, auf das Minimum zuzulaufen.
      </Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto rounded border border-slate-300 dark:border-slate-600"
        role="img"
        aria-label={`Parabel L(theta) = theta Quadrat mit dem Pfad der Iterierten bei Lernrate ${fmtDe(alpha, 2)}; der Pfad ist derzeit ${diverged || rho > 1 ? "divergent" : grenzfall ? "am Grenzfall" : einSchritt ? "nach einem Schritt im Minimum" : alpha > 0.5 ? "oszillierend konvergent" : "monoton konvergent"}.`}
      >
        <rect x={0} y={0} width={W} height={H} fill="var(--w-bg)" />
        <line x1={px(X0)} y1={py(0)} x2={px(X1)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1} />
        {[-3, -2, -1, 1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-axis)" />
            <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={10} fill="var(--w-muted)">
              {t}
            </text>
          </g>
        ))}
        <text x={px(X1) - 6} y={py(0) - 6} textAnchor="end" fontSize={11} fill="var(--w-muted)">
          θ
        </text>
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(Y1)} stroke="var(--w-grid-strong)" strokeDasharray="4 3" strokeWidth={1} />
        <text x={px(0) + 5} y={py(Y1) + 12} fontSize={10} fill="var(--w-muted)">
          θ* = 0
        </text>
        <polyline points={parabel} fill="none" stroke={FMM.blau} strokeWidth={2} />
        <text x={px(-2.9)} y={py(8.7)} fontSize={11} fill={FMM.blau}>
          L(θ) = θ²
        </text>
        <polyline points={pfad} fill="none" stroke={farbe} strokeWidth={1.5} strokeOpacity={0.65} />
        {thetas
          .filter((t) => Math.abs(t) < 50)
          .map((t, i) => (
            <circle key={i} cx={px(t)} cy={py(t * t)} r={3} fill={farbe} fillOpacity={0.9} />
          ))}
        <text x={px(THETA0) + 6} y={py(THETA0 * THETA0) - 6} fontSize={10} fill="var(--w-muted)">
          θ₀
        </text>
      </svg>

      <Slider label="Lernrate α" value={alpha} onChange={setAlpha} min={0.02} max={1.3} step={0.01} accent={FMM.orange} />
      <Slider label="Rauschen σ" value={sigma} onChange={setSigma} min={0} max={2} step={0.05} />
      {sigma > 0 && (
        <button type="button" className={W_BUTTON} onClick={neueStichprobe}>
          Rauschen neu würfeln
        </button>
      )}

      {aufgeloest && (
        <>
          <div className="flex flex-wrap gap-2">
            {ALPHA_PRESETS.map((q) => (
              <button
                key={q.id}
                type="button"
                className={Math.abs(alpha - q.alpha) < 1e-9 ? W_BUTTON_AKTIV : W_BUTTON}
                aria-pressed={Math.abs(alpha - q.alpha) < 1e-9}
                onClick={() => setAlpha(q.alpha)}
              >
                {q.text}
              </button>
            ))}
          </div>
          <p className="text-sm">
            Verstärkungsfaktor pro Schritt:{" "}
            <span className="font-mono font-semibold" style={{ color: farbe }}>
              |1 − 2α| = {fmtDe(rho, 2)}
            </span>
            {" · "}nach {thetas.length - 1} Schritten:{" "}
            <span className="font-mono">
              |θ| ≈ {Math.abs(letzte) < 1e4 ? fmtKlein(letzte) : "> 10⁴"}
            </span>
          </p>
        </>
      )}
      {verdikt}
    </div>
  );
}

/** Kleine Tafel: ρ(α) = |1 − 2α| mit der Schwelle bei α = 1. */
function RhoKurve() {
  const w = 300;
  const h = 130;
  const ax = (a: number) => 34 + (a / 1.4) * (w - 44);
  const ay = (r: number) => h - 22 - (r / 1.6) * (h - 34);
  const kurve = Array.from({ length: 71 }, (_, i) => {
    const a = (1.4 * i) / 70;
    return `${ax(a).toFixed(1)},${ay(Math.abs(1 - 2 * a)).toFixed(1)}`;
  }).join(" ");
  return (
    <div className="space-y-1">
      <svg viewBox={`0 0 ${w} ${h}`} className="max-w-full h-auto" role="img" aria-label="Der Verstärkungsfaktor Betrag von 1 minus 2 alpha als Funktion der Lernrate; er unterschreitet 1 zwischen alpha gleich 0 und alpha gleich 1.">
        <rect x={0} y={0} width={w} height={h} fill="var(--w-bg)" />
        <line x1={34} y1={ay(0)} x2={w - 8} y2={ay(0)} stroke="var(--w-axis)" />
        <line x1={34} y1={12} x2={34} y2={ay(0)} stroke="var(--w-axis)" />
        <line x1={34} y1={ay(1)} x2={w - 8} y2={ay(1)} stroke={FMM.rot} strokeDasharray="5 4" />
        <text x={w - 10} y={ay(1) - 4} textAnchor="end" fontSize={10} fill={FMM.rot}>
          ρ = 1
        </text>
        <line x1={ax(1)} y1={12} x2={ax(1)} y2={ay(0)} stroke={FMM.rot} strokeDasharray="5 4" />
        <polyline points={kurve} fill="none" stroke={FMM.orange} strokeWidth={2} />
        {[0, 0.5, 1].map((a) => (
          <g key={a}>
            <text x={ax(a)} y={ay(0) + 13} textAnchor="middle" fontSize={10} fill="var(--w-muted)">
              {fmtDe(a, 1)}
            </text>
          </g>
        ))}
        <text x={w - 8} y={ay(0) + 13} textAnchor="end" fontSize={10} fill="var(--w-muted)">
          α
        </text>
        <text x={6} y={ay(1) + 4} fontSize={10} fill="var(--w-muted)">
          1
        </text>
        <text x={6} y={ay(0) + 4} fontSize={10} fill="var(--w-muted)">
          0
        </text>
      </svg>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Der Verstärkungsfaktor <M>{"\\rho(\\alpha) = |1 - 2\\alpha|"}</M>: null bei{" "}
        <M>{"\\alpha = 0{,}5"}</M> (ein Schritt genügt), Vorzeichenwechsel und damit Oszillation
        darüber, und ab <M>{"\\alpha > 1"}</M> ist <M>{"\\rho > 1"}</M>.
      </p>
    </div>
  );
}

/** Der Abschnitts-Baustein: erst tippen, dann auflösen. */
export function SgdLernratenDemo() {
  return (
    <Schaetzfrage
      frage={
        <>
          Tippen wir zuerst: ab welcher Lernrate <M>{"\\alpha"}</M> kippt es?
        </>
      }
      variante="bereich"
      loesung={1}
      toleranz={0.05}
      einheit="α"
      min={0.1}
      max={1.4}
      schritt={0.05}
      start={0.6}
      fmt={(v) => fmtDe(v, 2)}
      verdeckt={<RhoKurve />}
    >
      {({ aufgeloest }) => <SgdTafel aufgeloest={aufgeloest} />}
    </Schaetzfrage>
  );
}

/* ================================================================== */
/* κ_rel(h,(a,b))-Live-Rechner                                         */
/* ================================================================== */

/** Zahl deutsch formatiert, große/kleine Werte als Mantisse · 10^Exponent. */
function SciNum({ v }: { v: number }) {
  if (Number.isNaN(v)) return <span>–</span>;
  if (!Number.isFinite(v)) return <span>∞</span>;
  if (v === 0) return <span>0</span>;
  const e = Math.floor(Math.log10(Math.abs(v)));
  if (e >= -3 && e <= 3) return <span>{fmtDe(v, Math.max(0, 3 - e))}</span>;
  return (
    <span>
      {fmtDe(v / 10 ** e, 1)} · 10<sup>{e}</sup>
    </span>
  );
}

export function KappaRechner() {
  const [mode, setMode] = useState<"c" | "frei">("c");
  const [k, setK] = useState(5);
  const [aStr, setAStr] = useState("2000");
  const [bStr, setBStr] = useState("1999");

  let kappa: number;
  let aNode: ReactNode;
  let bNode: ReactNode;
  let diffNode: ReactNode;
  if (mode === "c") {
    // Idealisierte Werte für Daten x_i = c + z_i mit Var(z) = 1:
    // a = c² + 1, b = c², also |a − b| = 1, analytisch gesetzt, denn in
    // Doubles wäre (c² + 1) − c² für großes c selbst schon ausgelöscht (= 0).
    const c2 = 10 ** (2 * k);
    kappa = Math.SQRT2 * Math.hypot(c2 + 1, c2);
    aNode = (
      <span>
        10<sup>{2 * k}</sup>&thinsp;+&thinsp;1
      </span>
    );
    bNode = (
      <span>
        10<sup>{2 * k}</sup>
      </span>
    );
    diffNode = <span>1</span>;
  } else {
    const a = Number(aStr.replace(",", "."));
    const b = Number(bStr.replace(",", "."));
    const ok = Number.isFinite(a) && Number.isFinite(b) && aStr.trim() !== "" && bStr.trim() !== "";
    kappa = !ok ? NaN : a === b ? Infinity : (Math.SQRT2 * Math.hypot(a, b)) / Math.abs(a - b);
    aNode = <SciNum v={a} />;
    bNode = <SciNum v={b} />;
    diffNode = ok ? <SciNum v={Math.abs(a - b)} /> : <span>–</span>;
  }

  const verlust = Math.log10(kappa); // ≈ verlorene Dezimalstellen
  const rest = Math.max(0, 16 - verlust);

  let verdikt: ReactNode;
  if (Number.isNaN(kappa)) {
    verdikt = (
      <Verdikt kind="neutral" titel="Keine Zahl.">
        Geben wir zwei gültige Zahlen ein; auch Exponentialschreibweise wie{" "}
        <span className="font-mono">1e10</span> geht.
      </Verdikt>
    );
  } else if (!Number.isFinite(kappa)) {
    verdikt = (
      <Verdikt kind="fail" titel="Schlecht gestellt.">
        Für <M>{"a = b"}</M> ist <M>{"\\kappa_{rel} = \\infty"}</M> ({ref("lemma:kondition-der-differenz")}, Nenner null).
        Das exakte Ergebnis ist <M>{"0"}</M>, und jede noch so kleine Störung der Inputs erzeugt
        einen relativen Fehler von beliebiger Größe.
      </Verdikt>
    );
  } else if (verlust >= 16) {
    verdikt = (
      <Verdikt kind="fail" titel="Nichts bleibt übrig.">
        <M>{"\\kappa_{rel} \\cdot \\eps \\gtrsim 1"}</M>: Von den rund 16 Dezimalstellen doppelter
        Genauigkeit überlebt keine einzige. Nach {ref("satz:fehlerfortpflanzung-in-einer-komposition")} verstärkt der letzte Schritt alle
        zuvor angesammelten Fehler mit diesem Faktor, und {Math.round(verlust)} verlorene Stellen
        sind mehr, als die Zwischengrößen überhaupt tragen.
      </Verdikt>
    );
  } else if (verlust >= 1) {
    verdikt = (
      <Verdikt kind="warn" titel="Stellen gehen verloren.">
        Der letzte Schritt verstärkt alle bis dahin angesammelten relativen Fehler etwa um{" "}
        <M>{"\\kappa_{rel}"}</M> ({ref("satz:fehlerfortpflanzung-in-einer-komposition")}): rund {Math.round(verlust)}{" "}
        {Math.round(verlust) === 1 ? "Dezimalstelle geht" : "Dezimalstellen gehen"} verloren,
        höchstens etwa {Math.floor(rest)} bleiben korrekt. Als Faustregel aus{" "}
        {ref("bemerkung:interpretation")}: <M>{"\\kappa_{rel} \\approx 10^m"}</M> kostet <M>{"m"}</M> Stellen.
      </Verdikt>
    );
  } else {
    verdikt = (
      <Verdikt kind="ok" titel="Harmlos.">
        <M>{"\\kappa_{rel}"}</M> ist von der Größenordnung 1, der letzte Schritt verstärkt Fehler
        also kaum; rechnerisch geht weniger als eine Dezimalstelle verloren.
      </Verdikt>
    );
  }

  return (
    <div className="my-3 space-y-2">
      <Aufgabe>
        Schieben wir den Exponenten <M>{"k"}</M> nach oben und lesen ab, wie viele Dezimalstellen
        der letzte Schritt kostet.
      </Aufgabe>
      {/* <MD> bringt overflow-x-auto mit: bei 390 px bricht die Formel sonst am
          rechten Rand ab. */}
      <div className="max-w-prose">
        <MD>
          {
            "\\kappa_{rel}\\bigl(h, (\\cred{a}, \\cblue{b})\\bigr) = \\sqrt{2}\\,\\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{|\\cred{a} - \\cblue{b}|}, \\qquad \\eps \\approx 2{,}2 \\cdot 10^{-16}."
          }
        </MD>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-1.5">
          <input type="radio" checked={mode === "c"} onChange={() => setMode("c")} />
          an Verschiebung <M>{"c"}</M> gekoppelt
        </label>
        <label className="flex items-center gap-1.5">
          <input type="radio" checked={mode === "frei"} onChange={() => setMode("frei")} />
          <M>{"a, b"}</M> frei wählen
        </label>
      </div>
      {mode === "c" ? (
        <>
          <Slider label="Exponent k" value={k} onChange={setK} min={0} max={12} step={1} fmt={(v) => `c = 1e${v}`} />
          <p className={`max-w-prose text-xs ${W_MUTED}`}>
            Modell wie im Varianz-Beispiel: Daten <M>{"x_i = c + z_i"}</M> mit Varianz{" "}
            <M>{"1"}</M>. Idealisiert ist dann <M>{"\\cred{a} = c^2 + 1"}</M> und{" "}
            <M>{"\\cblue{b} = c^2"}</M>, die wahre Differenz also genau <M>{"1"}</M>.
          </p>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-1.5">
            <span style={{ color: FMM.rot }}>a =</span>
            <input aria-label="a" className={`w-36 font-mono ${W_INPUT}`} value={aStr} onChange={(e) => setAStr(e.target.value)} />
          </label>
          <label className="flex items-center gap-1.5">
            <span style={{ color: FMM.blau }}>b =</span>
            <input aria-label="b" className={`w-36 font-mono ${W_INPUT}`} value={bStr} onChange={(e) => setBStr(e.target.value)} />
          </label>
        </div>
      )}
      <div className={`overflow-x-auto p-3 font-mono text-xs sm:text-sm ${W_PANEL}`}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-3">a</td>
              <td className="text-right" style={{ color: FMM.rot }}>
                {aNode}
              </td>
            </tr>
            <tr>
              <td className="pr-3">b</td>
              <td className="text-right" style={{ color: FMM.blau }}>
                {bNode}
              </td>
            </tr>
            <tr>
              <td className="pr-3">|a − b|</td>
              <td className="text-right">{diffNode}</td>
            </tr>
            <tr className="border-t border-slate-300 dark:border-slate-600">
              <td className="pr-3 pt-1">κ_rel(h, (a, b))</td>
              <td className="pt-1 text-right font-bold" style={{ color: FMM.orange }}>
                <SciNum v={kappa} />
              </td>
            </tr>
            <tr>
              <td className="pr-3">verlorene Dezimalstellen ≈ log₁₀ κ</td>
              <td className="text-right">{Number.isFinite(kappa) ? fmtDe(Math.max(0, verlust), 1) : "alle"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {verdikt}
    </div>
  );
}
