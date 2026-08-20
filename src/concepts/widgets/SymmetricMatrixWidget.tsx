/**
 * QA-L3-Nachprüfung: `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget für `symmetric-matrix` (Triage C3: KEEP + Verdikt für
 * „Streckung vs. Spiegelung"; dazu x als Suchaufgabe ziehbar).
 *
 * DIE EINE EINSICHT: Eine symmetrische Matrix hat immer zwei senkrecht
 * aufeinander stehende Richtungen, in denen sie nur streckt oder staucht.
 * Suchen kann man sie, indem man x auf dem Einheitskreis dreht, bis Ax
 * wieder auf x zeigt; die zweite Richtung liegt dann automatisch 90° daneben.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   rot    = das Objekt in der Hand (x auf dem Einheitskreis)
 *   blau   = sein Bild Ax und die Bildellipse des Einheitskreises (Lib)
 *   orange = die beiden Eigenrichtungen λ₁v₁, λ₂v₂, sobald aufgedeckt
 *
 * PROVENIENZ: Matrixfamilie A = ((2, c), (c, 1)) und die Eigenwertformel aus
 * dem Vorgängerwidget (Stand 2026-08-18); Ziehen, Ellipse und Achsen aus der
 * Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/SymmetricMatrixWidget.mjs,
 * 2026-08-20), A = ((2, c), (c, 1)), λ = (3 ± √(1+4c²))/2:
 *   c = 0: λ₁ = 2, λ₂ = 1, det A = 2;
 *   c = 1 (Default): λ₁ = 2,618, λ₂ = 0,382, det A = 1, Spur 3,
 *     v₁ = (0,8507; 0,5257) unter 31,717°, v₂ = (0,5257; −0,8507),
 *     v₁ᵀv₂ = 0 und Av₁ − λ₁v₁ = 0 (beides auf 1e−12);
 *   c = √2 = 1,414214: λ₂ = 0 und det A = 0 — dort kollabiert die Ellipse;
 *   c = 2: λ₁ = 3,5616, λ₂ = −0,5616, det A = −2;
 *   die Spur bleibt für jedes c gleich 3, also λ₁ + λ₂ = 3.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
} from "../../lib";

const SCHWELLE = Math.SQRT2; // ab |c| > √2 wird λ₂ negativ

export function SymmetricWidget() {
  const [c, setC] = useState(1);
  const [deg, setDeg] = useState(0);
  const [zeigen, setZeigen] = useState(false);

  const A: [[number, number], [number, number]] = [
    [2, c],
    [c, 1],
  ];
  const disc = Math.sqrt(1 + 4 * c * c);
  const l1 = (3 + disc) / 2;
  const l2 = (3 - disc) / 2;
  const evec = (l: number): [number, number] => {
    if (Math.abs(c) < 1e-9) return l >= 1.5 ? [1, 0] : [0, 1];
    const n = Math.hypot(c, l - 2);
    return [c / n, (l - 2) / n];
  };
  const v1 = evec(l1);
  const v2 = evec(l2);

  const th = (deg * Math.PI) / 180;
  const x: [number, number] = [Math.cos(th), Math.sin(th)];
  const Ax: [number, number] = [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];
  const nAx = Math.hypot(Ax[0], Ax[1]);
  // Winkel zwischen x und Ax in Grad (x ist Einheitsvektor)
  const winkel =
    nAx > 1e-9
      ? (Math.atan2(Math.abs(x[0] * Ax[1] - x[1] * Ax[0]), x[0] * Ax[0] + x[1] * Ax[1]) * 180) /
        Math.PI
      : 0;
  const getroffen = (winkel < 1.5 || winkel > 178.5) && nAx > 1e-6;
  const lambda = x[0] * Ax[0] + x[1] * Ax[1];

  const halb = Math.max(2.6, 1.25 * Math.max(Math.abs(l1), Math.abs(l2)));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Drehen wir x auf dem Kreis, bis Ax wieder genau auf x zeigt.</Aufgabe>
      <LabeledTransformCanvas
        matrix={A}
        xLabel="x₁"
        yLabel="x₂"
        showGrid={false}
        size={290}
        worldHalf={halb}
        vectors={[
          ...(zeigen
            ? [
                { v: [l1 * v1[0], l1 * v1[1]] as [number, number], color: FMM_COLORS.orange, label: "λ₁v₁" },
                { v: [l2 * v2[0], l2 * v2[1]] as [number, number], color: FMM_COLORS.orange, label: "λ₂v₂" },
              ]
            : []),
          { v: Ax, color: FMM_COLORS.blau, label: "Ax" },
          { v: x, color: FMM_COLORS.rot, label: "x", draggable: true, dragConstraint: "unitCircle" as const },
        ]}
        onVectorChange={(_i, p) => setDeg((Math.atan2(p[1], p[0]) * 180) / Math.PI)}
        ariaLabel={`Symmetrische Matrix mit Nebendiagonaleintrag ${fmtDe(c, 1)}; x steht unter ${fmtDe(deg, 0)} Grad, Ax bei (${fmtDe(Ax[0])}; ${fmtDe(Ax[1])}).`}
      />
      <Slider label="Richtung von x (°)" value={deg} onChange={setDeg} min={-180} max={180} step={0.5} accent={FMM_COLORS.rot} />
      <Slider label="Nebendiagonale c" value={c} onChange={setC} min={-2} max={2} step={0.05} accent={FMM_COLORS.blau} />
      <div className="my-1 flex flex-wrap gap-1 text-xs">
        <button
          type="button"
          aria-pressed={zeigen}
          className={zeigen ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setZeigen((z) => !z)}
        >
          Eigenrichtungen {zeigen ? "verbergen" : "zeigen"}
        </button>
      </div>
      <p className="mt-1 font-mono text-xs tabular-nums" style={{ color: "var(--w-muted, #64748b)" }}>
        A = ((2; {fmtDe(c, 2)}), ({fmtDe(c, 2)}; 1)) · λ₁ = {fmtDe(l1)} · λ₂ = {fmtDe(l2)}
      </p>
      <Verdikt kind={getroffen ? "ok" : Math.abs(c) > SCHWELLE ? "warn" : "neutral"}>
        {getroffen ? (
          <>
            Getroffen: Ax = λx mit λ = {fmtDe(lambda)}. Das ist eine Eigenrichtung, und die
            zweite liegt exakt 90° daneben – bei symmetrischen Matrizen stehen die
            Eigenrichtungen immer senkrecht aufeinander.
            {lambda < 0 ? " Hier ist λ negativ, Ax zeigt also in die Gegenrichtung." : ""}
          </>
        ) : Math.abs(c) > SCHWELLE ? (
          <>
            Für |c| &gt; √2 ≈ 1,41 wird λ₂ = {fmtDe(l2)} negativ: In der zweiten Eigenrichtung
            streckt A nicht mehr, sondern klappt um. Die Ellipse sieht unverändert aus, aber
            det A = {fmtDe(2 - c * c)} ist negativ, die Orientierung also gekippt.
          </>
        ) : (
          <>
            Ax und x schließen noch {fmtDe(winkel, 1)}° ein. Beide
            Eigenwerte sind hier positiv, λ₁ = {fmtDe(l1)} und λ₂ = {fmtDe(l2)}, ihre Summe ist
            die Spur 3: A streckt in zwei senkrechten Richtungen, ohne zu scheren.
          </>
        )}
      </Verdikt>
    </div>
  );
}
