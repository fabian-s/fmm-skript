/**
 * Widgets für §7.6 „Pseudoinverse, SVD-Lösung und Methodenvergleich".
 *
 * DIE EINE EINSICHT je Widget:
 *   CostWidget – Alle drei Verfahren liegen in derselben O-Klasse; den
 *     Unterschied machen die Konstanten, und das Verhältnis QR/NE läuft von 1
 *     (m = n) auf 2 (m ≫ n).
 *   AccuracyWidget – Die Normalengleichungen verlieren immer 2·log₁₀κ₂(A)
 *     Stellen, QR nur log₁₀κ₂(A), solange das Residuum klein ist.
 *   MethodChooser – Abschluss-Sandkasten: die Abwägungen des Kapitels als
 *     Entscheidungsbaum (Muster 9, Sandkasten zuletzt).
 *
 * FARBROLLEN: Dieser Abschnitt vergleicht METHODEN, nicht mathematische
 * Objekte, und führt dafür eine eigene Farbachse:
 *   Normalengleichungen orange · QR (Householder) blau · SVD violett ·
 *   Abbruch/Marker rot.
 * Das kollidiert bewusst mit den Objektrollen der §§7.1–7.5 (dort orange = κ,
 * blau = Störung, violett = Residuum); in §7.6 kommt keines dieser Objekte in
 * einer Grafik vor, deshalb bleibt jede Farbe innerhalb ihrer Tafel eindeutig.
 *
 * PROVENIENZ: Rechen- und Layoutgerüst aus der internen App
 * interactive/heath-ch3 (S37Compare) portiert; Schätzfrage, Verdikte und alle
 * Texte für dieses Skript neu geschrieben.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   ε_mach = 2,2204e−16, 1/√ε = 6,711e7 (log₁₀ = 7,827), 1/ε = 4,504e15
 *   (log₁₀ = 15,654) – daher die Abbruchschwellen 8 bzw. 15,65 im Code.
 *   Aufwand: W_QR/W_NE = (r − 1/3)/(r/2 + 1/6) mit r = m/n; Grenzwerte exakt
 *   1 (r = 1) und 2 (r → ∞), bei r = 5 also 1,7500 und bei r = 10 1,8710
 *   (direkt aus den Operationszahlen nachgerechnet, n = 50 und n = 200 geben
 *   dasselbe Verhältnis). SVD/QR liegt bei c = 6 zwischen 18,0 (r = 1) und
 *   6,4 (r = 20).
 *   Genauigkeit: κ = 10⁵, ‖r‖ = 10⁻⁶ ⇒ NE 5,7 Stellen (Fehler 2,2e−6), QR
 *   10,6 Stellen (2,4e−11); κ = 10⁸ ⇒ NE 0 Stellen, QR 5,6; κ = 10⁶,
 *   ‖r‖ = 10⁻¹ ⇒ NE 3,7, QR 4,7 (dort dominiert der κ²-Term auch bei QR).
 *   Der quadrierte Term übernimmt genau ab ‖r‖ > 1/κ₂(A).
 */
import { useState, type ReactNode } from "react";
import { Aufgabe, FMM_COLORS, LabeledPlot, M, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../../lib";

const COL = {
  ne: FMM_COLORS.orange,
  qr: FMM_COLORS.blau,
  svd: FMM_COLORS.violett,
  warn: FMM_COLORS.rot,
};

const EPS = 2.220446049250313e-16; // Maschinengenauigkeit, double precision

function fmtOps(v: number): string {
  if (v >= 1e12) return fmtDe(v / 1e12, 1) + " Bio.";
  if (v >= 1e9) return fmtDe(v / 1e9, 1) + " Mrd.";
  if (v >= 1e6) return fmtDe(v / 1e6, 1) + " Mio.";
  if (v >= 1e3) return fmtDe(v / 1e3, 1) + " Tsd.";
  return fmtDe(v, 0);
}

function CostBar({
  label,
  value,
  max,
  color,
  formula,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  formula: string;
}) {
  const pct = Math.max(1.5, (value / max) * 100);
  return (
    <div className="my-1.5">
      <div className="flex items-baseline justify-between text-xs">
        <span>
          <span className="font-semibold" style={{ color }}>
            {label}
          </span>{" "}
          <span className="text-slate-500 dark:text-slate-400">(≈ {formula} Mult.)</span>
        </span>
        <span className="font-mono tabular-nums">{fmtOps(value)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

/** Aufwandsvergleich: W_NE = mn²/2 + n³/6, W_QR = mn² − n³/3, W_SVD = c(mn² + n³). */
export function CostWidget() {
  const [n, setN] = useState(50);
  const [rho, setRho] = useState(10); // Seitenverhältnis m/n
  const [c, setC] = useState(6); // SVD-Proportionalitätskonstante
  const m = Math.round(rho * n);
  const ne = (m * n * n) / 2 + n ** 3 / 6;
  const qr = m * n * n - n ** 3 / 3;
  const svd = c * (m * n * n + n ** 3);
  const max = Math.max(ne, qr, svd);
  const ratio = qr / ne;
  const ratioF = (r: number) => (r - 1 / 3) / (r / 2 + 1 / 6);
  return (
    <div className="rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Fahren wir das Seitenverhältnis <M>{"m/n"}</M> von 1 bis 20 durch und beobachten den
        Marker auf der Verhältniskurve.
      </Aufgabe>
      <Slider label="n (Spalten)" value={n} onChange={setN} min={5} max={200} step={5} fmt={(v) => fmtDe(v, 0)} />
      <Slider label="m / n" value={rho} onChange={setRho} min={1} max={20} step={0.5} fmt={(v) => fmtDe(v, 1)} />
      <Slider label="SVD-Konstante c" value={c} onChange={setC} min={4} max={12} step={1} accent={COL.svd} fmt={(v) => fmtDe(v, 0)} />
      <p className="my-2 text-xs text-slate-600 dark:text-slate-400">
        Aktuelle Problemgröße: <M>{"m = "}</M>
        <span className="font-mono">{m}</span>, <M>{"n = "}</M>
        <span className="font-mono">{n}</span>. Ungefähre Multiplikationszahlen (Additionen
        jeweils ähnlich viele):
      </p>
      <CostBar label="Normalengleichungen" value={ne} max={max} color={COL.ne} formula="mn²/2 + n³/6" />
      <CostBar label="Householder-QR" value={qr} max={max} color={COL.qr} formula="mn² − n³/3" />
      <CostBar label="SVD" value={svd} max={max} color={COL.svd} formula="c·(mn² + n³)" />
      <p className="mb-1 mt-3 text-xs text-slate-600 dark:text-slate-400">
        Aufwandsverhältnis QR / Normalengleichungen als Funktion des Seitenverhältnisses{" "}
        <M>{"m/n"}</M> (Marker = aktuelle Einstellung):
      </p>
      <LabeledPlot
        xLabel="m/n"
        yLabel="W(QR) / W(NE)"
        series={[{ f: ratioF, color: COL.qr }]}
        xDomain={[1, 20]}
        yDomain={[0, 2.5]}
        width={320}
        height={170}
        markers={[{ x: rho, y: ratioF(rho), color: COL.warn, label: fmtDe(ratio, 2) }]}
        ariaLabel={`Das Aufwandsverhältnis QR zu Normalengleichungen steigt von 1 auf 2; bei m/n = ${fmtDe(rho, 1)} beträgt es ${fmtDe(ratio, 2)}.`}
      />
      {rho < 1.5 ? (
        <Verdikt kind="neutral" className="mt-2" titel="Fast quadratisch:">
          Bei <M>{"m \\approx n"}</M> kosten beide Wege je{" "}
          <M>{"\\tfrac{2}{3}n^3"}</M> Multiplikationen, das Verhältnis startet exakt bei 1 (hier{" "}
          <span className="font-mono">{fmtDe(ratio, 2)}</span>). Der Kostenvorteil der
          Normalengleichungen ist also gar keiner – dann kann man gleich QR nehmen.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" className="mt-2" titel="Überbestimmt:">
          Bei <M>{`m = ${fmtDe(rho, 1)}\\,n`}</M> kostet QR das{" "}
          <span className="font-mono">{fmtDe(ratio, 2)}</span>-Fache der Normalengleichungen; für{" "}
          <M>{"m/n \\to \\infty"}</M> klettert das Verhältnis gegen 2 und bleibt dort. Mehr als
          den doppelten Aufwand zahlen wir nie – das ist der Preis dafür, dass QR nur mit{" "}
          <M>{"\\kappa_2(\\bA)"}</M> statt mit <M>{"\\kappa_2(\\bA)^2"}</M> arbeitet. Die SVD
          liegt mit Faktor <span className="font-mono">{fmtDe(svd / qr, 1)}</span> auf QR in einer
          anderen Größenordnung, aber immer noch in derselben{" "}
          <M>{"O(mn^2 + n^3)"}</M>-Klasse (Bemerkung 7.6.3).
        </Verdikt>
      )}
    </div>
  );
}

function DigitBar({
  label,
  digits,
  err,
  color,
  broken,
  brokenNote,
}: {
  label: string;
  digits: number;
  err: number;
  color: string;
  broken: boolean;
  brokenNote: string;
}) {
  const pct = Math.max(1, (digits / 16) * 100);
  return (
    <div className="my-2">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold" style={{ color }}>
          {label}
        </span>
        <span className="font-mono tabular-nums">
          rel. Fehler ≈ {err >= 1 ? "O(1), unbrauchbar" : err.toExponential(1)}
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
        <div
          className="flex h-full items-center rounded pl-1 text-[10px] font-semibold text-white"
          style={{ width: `${pct}%`, backgroundColor: broken ? COL.warn : color }}
        >
          {fmtDe(digits, 1)} Stellen
        </div>
      </div>
      {broken && <div className="mt-0.5 text-[11px] font-medium text-red-600 dark:text-red-400">{brokenNote}</div>}
    </div>
  );
}

/**
 * Genauigkeitsvergleich: err_NE ≈ κ²ε, err_QR ≈ (κ + ‖r‖κ²)ε, mit den
 * Abbruchschwellen κ ≈ 1/sqrt(ε) (Cholesky) und κ ≈ 1/ε (Rückwärtseinsetzen).
 */
function AccuracyTafel({ lc, setLc }: { lc: number; setLc: (v: number) => void }) {
  const [lr, setLr] = useState(-6); // log10 ||r||_2
  const cond = 10 ** lc;
  const rnorm = 10 ** lr;
  const errNE = Math.min(1, cond * cond * EPS);
  const errQR = Math.min(1, (cond + rnorm * cond * cond) * EPS);
  const digits = (e: number) => Math.min(16, Math.max(0, -Math.log10(e)));
  const neBroken = lc >= 8; // κ ≈ 1/sqrt(eps) ≈ 1e8
  const qrBroken = lc >= 15.65; // κ ≈ 1/eps ≈ 4.5e15
  const squaringActive = rnorm * cond > 1;
  return (
    <div className="rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Schieben wir <M>{"\\kappa_2(\\bA)"}</M> nach rechts und lesen ab, welcher Balken zuerst
        verschwindet; danach dasselbe mit der Residuumsnorm.
      </Aufgabe>
      <Slider label="log₁₀ κ₂(A)" value={lc} onChange={setLc} min={0} max={16} step={0.25} fmt={(v) => fmtDe(v, 1)} />
      <Slider label="log₁₀ ‖r‖₂" value={lr} onChange={setLr} min={-16} max={0} step={0.5} fmt={(v) => fmtDe(v, 1)} />
      <p className="my-2 text-xs text-slate-600 dark:text-slate-400">
        <M>{"\\kappa_2(\\bA) = "}</M>
        <span className="font-mono">{cond.toExponential(1)}</span>,{" "}
        <M>{"\\left\\|\\br\\right\\|_2 = "}</M>
        <span className="font-mono">{rnorm.toExponential(1)}</span>, double precision (
        <M>{"\\eps \\approx 2{,}2 \\cdot 10^{-16}"}</M>, also höchstens ~16 korrekte Stellen).
      </p>
      <DigitBar
        label="Normalengleichungen: Fehler ~ κ² · ε"
        digits={neBroken ? 0 : digits(errNE)}
        err={neBroken ? 1 : errNE}
        color={COL.ne}
        broken={neBroken}
        brokenNote="κ₂(A) ≳ 1/√ε ≈ 10⁸, die Cholesky-Zerlegung von AᵀA bricht voraussichtlich ab"
      />
      <DigitBar
        label="QR (Householder): Fehler ~ (κ + ‖r‖₂ κ²) · ε"
        digits={qrBroken ? 0 : digits(errQR)}
        err={qrBroken ? 1 : errQR}
        color={COL.qr}
        broken={qrBroken}
        brokenNote="κ₂(A) ≳ 1/ε ≈ 4,5·10¹⁵, das Rückwärtseinsetzen bricht voraussichtlich ab"
      />
      {squaringActive ? (
        <Verdikt kind="warn" className="mt-2" titel="Das Problem selbst ist empfindlich:">
          Wegen <M>{"\\left\\|\\br\\right\\|_2 \\kappa_2(\\bA) > 1"}</M> dominiert der quadrierte
          Term auch bei QR: <em>beide</em> Methoden verlieren rund{" "}
          <M>{"2\\log_{10}\\kappa_2(\\bA)"}</M> Stellen (hier{" "}
          <span className="font-mono">{fmtDe(2 * lc, 0)}</span> von 16). Das ist die Kondition des
          Problems nach Satz 7.2.4, kein Defekt des Algorithmus – hier hilft kein Verfahren mehr,
          nur ein besser konditioniertes Modell.
        </Verdikt>
      ) : neBroken ? (
        <Verdikt kind="fail" className="mt-2" titel="Die Normalengleichungen sind raus:">
          Ab <M>{"\\kappa_2(\\bA) \\gtrsim 1/\\sqrt{\\eps} \\approx 10^{8}"}</M> frisst der
          <M>{"\\;\\kappa^2"}</M>-Fehler alle 16 Stellen, und die Cholesky-Zerlegung von{" "}
          <M>{"\\bA^\\top\\bA"}</M> bricht voraussichtlich ab (Bemerkung 7.3.7). QR hält hier noch{" "}
          <span className="font-mono">{fmtDe(digits(errQR), 1)}</span> Stellen und arbeitet bis{" "}
          <M>{"\\kappa_2(\\bA) \\approx 1/\\eps \\approx 4{,}5\\cdot 10^{15}"}</M> weiter.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral" className="mt-2" titel="Der typische Fall:">
          Bei kleinem Residuum ist der QR-Fehler im Wesentlichen{" "}
          <M>{"\\kappa_2(\\bA)\\,\\eps"}</M>, es bleiben{" "}
          <span className="font-mono">{fmtDe(digits(errQR), 1)}</span> Stellen. Die
          Normalengleichungen verlieren dagegen immer{" "}
          <M>{"2\\log_{10}\\kappa_2(\\bA)"}</M> Stellen und kommen nur auf{" "}
          <span className="font-mono">{fmtDe(digits(errNE), 1)}</span> – die{" "}
          <M>{"\\kappa^2"}</M>-Strafe fällt auch bei fast perfektem Fit an. Genau das meint
          Bemerkung 7.3.7 mit „instabil".
        </Verdikt>
      )}
    </div>
  );
}

export function AccuracyWidget() {
  const [lc, setLc] = useState(5);
  return (
    <Schaetzfrage
      variante="auswahl"
      frage={
        <>
          In doppelter Genauigkeit stehen uns rund 16 Dezimalstellen zur Verfügung. Wie viele davon
          überleben bei den Normalengleichungen, wenn <M>{"\\kappa_2(\\bA) = 10^{8}"}</M> ist und
          das Residuum winzig bleibt?
        </>
      }
      optionen={[
        { id: "acht", text: "etwa 8" },
        { id: "vier", text: "etwa 4" },
        { id: "keine", text: "praktisch keine" },
      ]}
      loesung="keine"
      onAufloesen={() => setLc(8)}
      verdeckt={
        <Verdikt kind="neutral" titel="Auflösung:">
          Der Regler steht jetzt auf <M>{"\\kappa_2(\\bA) = 10^{8}"}</M>. Der Fehler der
          Normalengleichungen wächst wie <M>{"\\kappa_2(\\bA)^2\\eps = 10^{16}\\cdot 2{,}2\\cdot 10^{-16}"}</M>,
          liegt also bei O(1): Es überlebt keine einzige Stelle, und schon die Cholesky-Zerlegung
          bricht voraussichtlich ab. QR verliert nur <M>{"\\log_{10}\\kappa_2(\\bA) = 8"}</M>{" "}
          Stellen und rechnet weiter.
        </Verdikt>
      }
    >
      <AccuracyTafel lc={lc} setLc={setLc} />
    </Schaetzfrage>
  );
}

type Shape = "square" | "tall";
type Cond = "good" | "borderline" | "rankdef";

function ChoiceRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { v: T; text: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="my-1.5 flex flex-wrap items-center gap-1 text-xs">
      <span className="mr-1 w-32 shrink-0 text-right font-medium">{label}</span>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={o.v === value}
          onClick={() => onChange(o.v)}
          className={
            "rounded border px-2 py-1 " +
            (o.v === value
              ? "border-sky-600 bg-sky-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700")
          }
        >
          {o.text}
        </button>
      ))}
    </div>
  );
}

/** Entscheidungshilfe: die Abwägungen des Abschnitts als Empfehlung. */
export function MethodChooser() {
  const [shape, setShape] = useState<Shape>("tall");
  const [cond, setCond] = useState<Cond>("good");
  const [critical, setCritical] = useState(false);

  let pick: string;
  let color: string;
  let why: ReactNode;
  if (cond === "rankdef") {
    pick = "SVD";
    color = COL.svd;
    why = (
      <>
        Die Normalengleichungen scheitern hier komplett: <M>{"\\bA^\\top\\bA"}</M> ist singulär
        (oder numerisch singulär), Cholesky bricht ab. Die SVD diagnostiziert den numerischen Rang
        explizit und liefert unter allen KQ-Lösungen die mit minimaler Norm (Satz 7.6.1). Genau
        dafür ist sie da.
      </>
    );
  } else if (cond === "borderline") {
    pick = critical ? "SVD" : "QR (Householder)";
    color = critical ? COL.svd : COL.qr;
    why = (
      <>
        Mit <M>{"\\kappa_2(\\bA)"}</M> nahe <M>{"1/\\sqrt{\\eps}"}</M> sind die Normalengleichungen
        raus: ihr <M>{"\\kappa^2"}</M>-Fehler frisst praktisch alle Stellen, und der
        Cholesky-Schritt bricht voraussichtlich ab. QR arbeitet zuverlässig bis{" "}
        <M>{"\\kappa_2(\\bA) \\approx 1/\\eps"}</M>
        {critical ? ". Wenn wirklich viel auf dem Spiel steht, lohnt der SVD-Aufpreis." : "."}
      </>
    );
  } else if (shape === "tall") {
    pick = critical ? "QR (oder SVD)" : "Normalengleichungen + Cholesky";
    color = critical ? COL.qr : COL.ne;
    why = critical ? (
      <>
        Das Problem ist gutartig, aber wenn es auf Genauigkeit ankommt, kostet QR nur etwa das
        Doppelte der Normalengleichungen, und sein Fehler ist so klein, wie es die Empfindlichkeit
        des Problems überhaupt zulässt.
      </>
    ) : (
      <>
        Für <M>{"m \\gg n"}</M> und gute Kondition glänzen die Normalengleichungen: etwa halber
        Aufwand von QR, einfach zu implementieren, und der <M>{"\\kappa^2"}</M>-Fehler ist bei
        moderatem <M>{"\\kappa_2(\\bA)"}</M> harmlos.
      </>
    );
  } else {
    pick = "QR (Householder)";
    color = COL.qr;
    why = (
      <>
        Für fast quadratische Probleme (<M>{"m \\approx n"}</M>) kosten Normalengleichungen und QR
        ungefähr gleich viel: Der Kostenvorteil der Normalengleichungen verschwindet, und die
        bessere Genauigkeit macht QR zur natürlichen Wahl.
      </>
    );
  }

  return (
    <div className="rounded bg-slate-100 p-3 dark:bg-slate-800/60">
      <Aufgabe>
        Spielen wir die Kombinationen durch: Welche Umschaltung ändert die Empfehlung, welche
        nicht?
      </Aufgabe>
      <ChoiceRow<Shape>
        label="Form von A"
        value={shape}
        onChange={setShape}
        options={[
          { v: "tall", text: "stark überbestimmt (m ≫ n)" },
          { v: "square", text: "fast quadratisch (m ≈ n)" },
        ]}
      />
      <ChoiceRow<Cond>
        label="Kondition"
        value={cond}
        onChange={setCond}
        options={[
          { v: "good", text: "gut konditioniert" },
          { v: "borderline", text: "κ₂(A) ~ 1/√ε" },
          { v: "rankdef", text: "(fast) rangdefizient" },
        ]}
      />
      <ChoiceRow<"no" | "yes">
        label="Anspruch"
        value={critical ? "yes" : "no"}
        onChange={(v) => setCritical(v === "yes")}
        options={[
          { v: "no", text: "Routine" },
          { v: "yes", text: "kritisch / heikel" },
        ]}
      />
      <div
        role="status"
        aria-live="polite"
        className="mt-3 rounded bg-white p-2 dark:bg-slate-900/60"
        style={{ boxShadow: `inset 4px 0 0 ${color}` }}
      >
        <div className="text-sm font-bold" style={{ color }}>
          {pick}
        </div>
        <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{why}</p>
      </div>
    </div>
  );
}
