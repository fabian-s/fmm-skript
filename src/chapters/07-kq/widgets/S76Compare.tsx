/**
 * Interaktive Widgets zum Methodenvergleich in Abschnitt 7.6.
 * Widget-Code recycelt aus der internen Heath-Ch.-3-App (S37Compare),
 * Labels und Begleittexte deutsch und an die Kursnotation angepasst:
 *  - CostWidget: Operationszählungen Normalengleichungen / Householder-QR / SVD
 *    als Funktion von m, n (und der SVD-Konstante), mit Aufwandsverhältnis.
 *  - AccuracyWidget: erwartete korrekte Stellen für Normalengleichungen vs.
 *    QR als Funktion von kappa_2(A) und der Residuumsnorm.
 *  - MethodChooser: Entscheidungshilfe, die die Abwägungen des Abschnitts
 *    zusammenfasst.
 * Farbcode durchgehend (FMM-Palette, vgl. Lessons in KONVENTIONEN.md):
 * Normalengleichungen = orange, QR = blau, SVD = violett; Marker/Abbruch = rot.
 */
import { useState, type ReactNode } from "react";
import { LabeledPlot, M, Slider } from "../../../lib";

const COL = { ne: "#E69F00", qr: "#0072B2", svd: "#9E57D5", warn: "#D55E00" };

const EPS = 2.220446049250313e-16; // Maschinengenauigkeit, double precision

function fmtOps(v: number): string {
  if (v >= 1e12) return (v / 1e12).toFixed(1) + " Bio.";
  if (v >= 1e9) return (v / 1e9).toFixed(1) + " Mrd.";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + " Mio.";
  if (v >= 1e3) return (v / 1e3).toFixed(1) + " Tsd.";
  return v.toFixed(0);
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
        <span className="font-mono">{fmtOps(value)}</span>
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
      <Slider label="n (Spalten)" value={n} onChange={setN} min={5} max={200} step={5} fmt={(v) => v.toFixed(0)} />
      <Slider
        label="m / n"
        value={rho}
        onChange={setRho}
        min={1}
        max={20}
        step={0.5}
        fmt={(v) => v.toFixed(1)}
      />
      <Slider label="SVD-Konstante c" value={c} onChange={setC} min={4} max={12} step={1} fmt={(v) => v.toFixed(0)} />
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
      <div className="overflow-x-auto">
        <LabeledPlot
          xLabel="m/n"
          yLabel="W(QR) / W(NE)"
          series={[{ f: ratioF, color: COL.qr }]}
          xDomain={[1, 20]}
          yDomain={[0, 2.5]}
          width={320}
          height={170}
          markers={[{ x: rho, y: ratioF(rho), color: COL.warn, label: ratio.toFixed(2) }]}
        />
      </div>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Bei <M>{"m = n"}</M> kosten beide Wege je <M>{"\\tfrac{2}{3}n^3"}</M> Multiplikationen —
        das Verhältnis startet also exakt bei 1. Für <M>{"m/n \\to \\infty"}</M> klettert es gegen
        2: stark überbestimmte Probleme lösen die Normalengleichungen mit etwa halbem Aufwand.
        Alle drei Methoden liegen in derselben <M>{"O"}</M>-Klasse — die Konstanten machen den
        Unterschied.
      </p>
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
        <span className="font-mono">
          rel. Fehler ≈ {err >= 1 ? "O(1) — unbrauchbar" : err.toExponential(1)}
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
        <div
          className="flex h-full items-center rounded pl-1 text-[10px] font-semibold text-white"
          style={{ width: `${pct}%`, backgroundColor: broken ? COL.warn : color }}
        >
          {digits.toFixed(1)} Stellen
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
export function AccuracyWidget() {
  const [lc, setLc] = useState(5); // log10 kappa_2(A)
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
      <Slider
        label="log₁₀ κ₂(A)"
        value={lc}
        onChange={setLc}
        min={0}
        max={16}
        step={0.25}
        fmt={(v) => v.toFixed(1)}
      />
      <Slider
        label="log₁₀ ‖r‖₂"
        value={lr}
        onChange={setLr}
        min={-16}
        max={0}
        step={0.5}
        fmt={(v) => v.toFixed(1)}
      />
      <p className="my-2 text-xs text-slate-600 dark:text-slate-400">
        <M>{"\\kappa_2(\\bA) = "}</M>
        <span className="font-mono">{cond.toExponential(1)}</span>,{" "}
        <M>{"\\left\\|\\br\\right\\|_2 = "}</M>
        <span className="font-mono">{rnorm.toExponential(1)}</span>, double precision (
        <M>{"\\eps \\approx 2{,}2 \\cdot 10^{-16}"}</M>, also höchstens ~16 korrekte Stellen).
        Erwartete korrekte Stellen der berechneten Lösung:
      </p>
      <DigitBar
        label="Normalengleichungen — Fehler ~ κ² · ε"
        digits={neBroken ? 0 : digits(errNE)}
        err={neBroken ? 1 : errNE}
        color={COL.ne}
        broken={neBroken}
        brokenNote="κ₂(A) ≳ 1/√ε ≈ 10⁸ — die Cholesky-Zerlegung von AᵀA bricht voraussichtlich ab"
      />
      <DigitBar
        label="QR (Householder) — Fehler ~ (κ + ‖r‖₂ κ²) · ε"
        digits={qrBroken ? 0 : digits(errQR)}
        err={qrBroken ? 1 : errQR}
        color={COL.qr}
        broken={qrBroken}
        brokenNote="κ₂(A) ≳ 1/ε ≈ 4,5·10¹⁵ — das Rückwärtseinsetzen bricht voraussichtlich ab"
      />
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        {squaringActive ? (
          <>
            Das Residuum ist so groß, dass{" "}
            <M>{"\\left\\|\\br\\right\\|_2 \\kappa_2(\\bA) > 1"}</M> gilt: der quadrierte Term
            dominiert auch bei QR, <em>beide</em> Methoden verlieren rund{" "}
            <M>{"2\\log_{10}\\kappa_2(\\bA)"}</M> Stellen. Das ist die Empfindlichkeit des
            Problems selbst (<a className="underline" href="#sec-7.2">Abschnitt 7.2</a>), kein
            Defekt des Algorithmus.
          </>
        ) : (
          <>
            Bei diesem kleinen Residuum ist der QR-Fehler im Wesentlichen{" "}
            <M>{"\\kappa_2(\\bA)\\,\\eps"}</M> (etwa {Math.round(lc)} verlorene Stellen), während
            die Normalengleichungen immer rund <M>{"2\\log_{10}\\kappa_2(\\bA)"}</M> Stellen
            verlieren (hier {Math.round(2 * lc)}) — die <M>{"\\kappa^2"}</M>-Strafe fällt auch
            bei fast perfektem Fit an.
          </>
        )}
      </p>
    </div>
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
        (oder numerisch singulär), Cholesky bricht ab. Die SVD diagnostiziert den numerischen
        Rang explizit und liefert unter allen KQ-Lösungen die mit minimaler Norm (Satz 7.6.1) —
        genau dafür ist sie da.
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
        {critical ? " — wenn wirklich viel auf dem Spiel steht, lohnt der SVD-Aufpreis." : "."}
      </>
    );
  } else if (shape === "tall") {
    pick = critical ? "QR (oder SVD)" : "Normalengleichungen + Cholesky";
    color = critical ? COL.qr : COL.ne;
    why = critical ? (
      <>
        Das Problem ist gutartig — aber wenn es auf Genauigkeit ankommt, kostet QR nur etwa
        das Doppelte der Normalengleichungen, und sein Fehler ist so klein, wie es die
        Empfindlichkeit des Problems überhaupt zulässt.
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
        ungefähr gleich viel — der Kostenvorteil der Normalengleichungen verschwindet, und die
        bessere Genauigkeit macht QR zur natürlichen Wahl.
      </>
    );
  }

  return (
    <div className="rounded bg-slate-100 p-3 dark:bg-slate-800/60">
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
      <div className="mt-3 rounded border-l-4 bg-white p-2 dark:bg-slate-900/60" style={{ borderColor: color }}>
        <div className="text-sm font-bold" style={{ color }}>
          {pick}
        </div>
        <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{why}</p>
      </div>
    </div>
  );
}
