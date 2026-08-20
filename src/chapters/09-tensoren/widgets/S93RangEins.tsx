import { useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, MatrixDisplay, Slider, useDrag, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: A = v wᵀ misst x in Richtung w und legt das Ergebnis auf span(v);
 * deshalb ist w⊥ der Kern und span(v) das Bild von A.
 * Farbrollen: v und im(A) blau/orange, w und ker(A) grün, x grau.
 * Provenienz: Eigenbau. Verifizierte Zahlen: Für v=(1,1), w=(1,−1) ist
 * A=((1,−1),(1,−1)) und Ax=(x₁−x₂,x₁−x₂); wᵀ(1,1)=0.
 * Siehe scripts/verify/KAP09/s93-rang-eins.mjs (2026-08-20).
 */
const { blau: BLAU, gruen: GRUEN, orange: ORANGE, grau: GRAU } = FMM_COLORS;
const px = (x: number) => 150 + 48 * x;
const py = (y: number) => 150 - 48 * y;
const begrenze = (wert: number) => Math.max(-2, Math.min(2, wert));
const norm = ([a, b]: [number, number]) => Math.hypot(a, b);
const matrix = (v: [number, number], w: [number, number]) => [[v[0] * w[0], v[0] * w[1]], [v[1] * w[0], v[1] * w[1]]];

export function RangEinsExplorer() {
  const [v, setV] = useState<[number, number]>([1, 1]);
  const [w, setW] = useState<[number, number]>([1, -1]);
  const [x, setX] = useState<[number, number]>([1.5, 0.2]);
  const zieh = useDrag<"v" | "w" | "x">({
    feld: { x0: 54, y0: 54, w: 192, h: 192 },
    welt: { x0: -2, x1: 2, y0: -2, y1: 2 },
    greifPosition: (id) => (id === "v" ? v : id === "w" ? w : x),
    onDrag: (punkt, id) => {
      if (id === "v") setV(punkt);
      else if (id === "w") setW(punkt);
      else setX(punkt);
    },
    clamp: ([a, b]) => [begrenze(a), begrenze(b)],
  });
  const A = matrix(v, w);
  const skalar = w[0] * x[0] + w[1] * x[1];
  const Ax: [number, number] = [v[0] * skalar, v[1] * skalar];
  const rangEins = norm(v) > 0.12 && norm(w) > 0.12;
  const kernTreffer = rangEins && Math.abs(skalar) < 0.08;
  const kernRichtung: [number, number] = [-w[1], w[0]];

  return (
    <div>
      <Aufgabe>Ziehen wir v oder w und prüfen wir, wie sich Matrix, Kern und Bildgerade gemeinsam ändern.</Aufgabe>
      <div className="mb-3 flex flex-wrap items-start gap-4" aria-label="Aktuelle Vektoren und Rang-eins-Matrix">
        <div><span style={{ color: BLAU }}>v = </span><MatrixDisplay value={[[v[0]], [v[1]]]} /></div>
        <div><span style={{ color: GRUEN }}>w = </span><MatrixDisplay value={[[w[0]], [w[1]]]} /></div>
        <div><span style={{ color: ORANGE }}>A = v wᵀ = </span><MatrixDisplay value={A} /></div>
      </div>
      <svg viewBox="0 0 300 300" className="max-w-full h-auto" role="img" aria-label="Veränderbare Vektoren v und w mit Kern- und Bildgerade der Matrix A gleich v w transponiert." {...zieh.svgProps}>
        <line x1="54" y1="246" x2="246" y2="54" stroke="var(--w-grid)" />
        <line x1="54" y1="150" x2="246" y2="150" stroke="var(--w-axis)" />
        <line x1="150" y1="54" x2="150" y2="246" stroke="var(--w-axis)" />
        {norm(w) > 0.12 && <line x1={px(-2 * kernRichtung[0] / norm(kernRichtung))} y1={py(-2 * kernRichtung[1] / norm(kernRichtung))} x2={px(2 * kernRichtung[0] / norm(kernRichtung))} y2={py(2 * kernRichtung[1] / norm(kernRichtung))} stroke={GRUEN} strokeDasharray="6 3" strokeWidth="2" />}
        {norm(v) > 0.12 && <line x1={px(-2 * v[0] / norm(v))} y1={py(-2 * v[1] / norm(v))} x2={px(2 * v[0] / norm(v))} y2={py(2 * v[1] / norm(v))} stroke={ORANGE} strokeWidth="2.5" />}
        <line x1="150" y1="150" x2={px(x[0])} y2={py(x[1])} stroke={GRAU} strokeWidth="2.5" />
        <line x1="150" y1="150" x2={px(Ax[0])} y2={py(Ax[1])} stroke={ORANGE} strokeWidth="3.5" />
        <line x1="150" y1="150" x2={px(v[0])} y2={py(v[1])} stroke={BLAU} strokeWidth="3" />
        <line x1="150" y1="150" x2={px(w[0])} y2={py(w[1])} stroke={GRUEN} strokeWidth="3" />
        <text x="58" y="68" fill={GRUEN} fontSize="11">w⊥ = ker A</text>
        <text x="171" y="235" fill={ORANGE} fontSize="11">span(v) = im A</text>
        <text x={px(x[0]) + 6} y={py(x[1]) - 5} fill="var(--w-text)" fontSize="11">x</text>
        <text x={px(Ax[0]) + 6} y={py(Ax[1]) + 13} fill={ORANGE} fontSize="11">Ax</text>
        <DragHandle x={px(v[0])} y={py(v[1])} farbe={BLAU} aktiv={zieh.dragging === "v"} {...zieh.handleProps("v")} />
        <DragHandle x={px(w[0])} y={py(w[1])} farbe={GRUEN} aktiv={zieh.dragging === "w"} {...zieh.handleProps("w")} />
        <DragHandle x={px(x[0])} y={py(x[1])} farbe={GRAU} aktiv={zieh.dragging === "x"} {...zieh.handleProps("x")} />
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-4">
        <div><Slider label="v₁" value={v[0]} onChange={(wert) => setV([wert, v[1]])} min={-2} max={2} step={0.1} accent={BLAU} /><Slider label="v₂" value={v[1]} onChange={(wert) => setV([v[0], wert])} min={-2} max={2} step={0.1} accent={BLAU} /></div>
        <div><Slider label="w₁" value={w[0]} onChange={(wert) => setW([wert, w[1]])} min={-2} max={2} step={0.1} accent={GRUEN} /><Slider label="w₂" value={w[1]} onChange={(wert) => setW([w[0], wert])} min={-2} max={2} step={0.1} accent={GRUEN} /></div>
        <div><Slider label="x₁" value={x[0]} onChange={(wert) => setX([wert, x[1]])} min={-2} max={2} step={0.1} accent={GRAU} /><Slider label="x₂" value={x[1]} onChange={(wert) => setX([x[0], wert])} min={-2} max={2} step={0.1} accent={GRAU} /></div>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 text-xs" aria-label="Legende">
        <span style={{ color: BLAU }}>v</span><span style={{ color: GRUEN }}>w und w⊥ = ker A</span><span style={{ color: ORANGE }}>Ax und span(v) = im A</span>
      </div>
      <Verdikt kind={!rangEins ? "warn" : kernTreffer ? "ok" : "neutral"}>
        {!rangEins
          ? "Mindestens einer der Faktoren ist der Nullvektor: A ist die Nullmatrix, also keine Rang-1-Matrix."
          : kernTreffer
            ? `wᵀx = ${fmtDe(skalar, 2)}; x liegt auf w⊥ = ker A und daher ist Ax = 0.`
            : `wᵀx = ${fmtDe(skalar, 2)}; Ax = (${fmtDe(Ax[0], 2)}, ${fmtDe(Ax[1], 2)}) liegt auf span(v), auch wenn wir x anders wählen.`}
      </Verdikt>
    </div>
  );
}
