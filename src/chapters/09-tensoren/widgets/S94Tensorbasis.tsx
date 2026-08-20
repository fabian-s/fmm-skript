import { useMemo, useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Slider, Surface3D, useDrag, Verdikt, ViewControls, fmtDe } from "../../../lib";
import type { Sicht3D } from "../../../lib";

/**
 * Einsicht: Höhenlinien und Fläche beschreiben dieselbe Tensorproduktfunktion;
 * c22 biegt die Ebene und koppelt die Steigung in x an y.
 * Farbrollen: x blau, y grün, ausgewählter Punkt orange, Funktionswerte violett.
 * Provenienz: Eigenbau, keine portierten Texte. Zahlen geprüft mit
 * scripts/verify/KAP09/s94-tensorbasis.mjs (2026-08-20): für
 * 2+3x−y+5xy sind die Eckwerte 2,5,1,9 und c22=5.
 */
const { blau: BLAU, gruen: GRUEN, orange: ORANGE, violett: VIOLETT, grau: GRAU } = FMM_COLORS;
type Koeffizienten = { a: number; b: number; c: number; d: number };
type Segment = { a: [number, number]; b: [number, number] };
const f = (k: Koeffizienten, x: number, y: number) => k.a + k.b * x + k.c * y + k.d * x * y;
const HEAT = { x: 34, y: 18, size: 210 };

function schnitt(a: [number, number, number], b: [number, number, number], niveau: number): [number, number] | null {
  const da = a[2] - niveau;
  const db = b[2] - niveau;
  if ((da < 0 && db < 0) || (da > 0 && db > 0) || Math.abs(a[2] - b[2]) < 1e-10) return null;
  const t = da / (da - db);
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

function konturen(k: Koeffizienten, niveau: number, n = 24): Segment[] {
  const result: Segment[] = [];
  for (let ix = 0; ix < n; ix += 1) for (let iy = 0; iy < n; iy += 1) {
    const x0 = ix / n, x1 = (ix + 1) / n, y0 = iy / n, y1 = (iy + 1) / n;
    const ecken: [number, number, number][] = [[x0, y0, f(k, x0, y0)], [x1, y0, f(k, x1, y0)], [x1, y1, f(k, x1, y1)], [x0, y1, f(k, x0, y1)]];
    const punkte = [[0, 1], [1, 2], [2, 3], [3, 0]].map(([a, b]) => schnitt(ecken[a], ecken[b], niveau)).filter((p): p is [number, number] => p !== null);
    if (punkte.length === 2) result.push({ a: punkte[0], b: punkte[1] });
    if (punkte.length === 4) {
      result.push({ a: punkte[0], b: punkte[1] }, { a: punkte[2], b: punkte[3] });
    }
  }
  return result;
}

export function TensorbasisExplorer() {
  const [k, setK] = useState<Koeffizienten>({ a: 2, b: 3, c: -1, d: 5 });
  const [punkt, setPunkt] = useState<[number, number]>([0.65, 0.45]);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });
  const ecken = [f(k, 0, 0), f(k, 1, 0), f(k, 0, 1), f(k, 1, 1)];
  const lo = Math.min(...ecken);
  const hi = Math.max(...ecken);
  const zDom: [number, number] = hi - lo < 1e-9 ? [lo - 1, hi + 1] : [lo, hi];
  const z = f(k, punkt[0], punkt[1]);
  const niveaus = useMemo(() => [0.2, 0.4, 0.6, 0.8].map((q) => lo + q * (hi - lo || 1)), [lo, hi]);
  const linien = useMemo(() => niveaus.map((niveau) => konturen(k, niveau)), [k, niveaus]);
  const surface = useMemo(() => ({ f: (x: number, y: number) => f(k, x, y), nx: 24, ny: 24, color: VIOLETT, opacity: 0.84, wire: true }), [k]);
  const drag = useDrag<"punkt">({
    feld: { x0: HEAT.x, y0: HEAT.y, w: HEAT.size, h: HEAT.size },
    welt: { x0: 0, x1: 1, y0: 0, y1: 1 },
    greifPosition: () => punkt,
    clamp: ([x, y]) => [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))],
    onDrag: setPunkt,
  });
  const hpx = (x: number) => HEAT.x + x * HEAT.size;
  const hpy = (y: number) => HEAT.y + (1 - y) * HEAT.size;

  return (
    <div>
      <Aufgabe>Ziehen wir den orangefarbenen Punkt und vergleichen seine Höhe in beiden Ansichten.</Aufgabe>
      <div className="mt-3 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <svg viewBox="0 0 280 260" width="280" height="260" className="max-w-full h-auto" role="img" aria-label="Höhenlinien und Heatmap der Tensorproduktfunktion; der orange Punkt markiert dieselbe Stelle wie in der Fläche." {...drag.svgProps}>
          {Array.from({ length: 28 }, (_, ix) => Array.from({ length: 28 }, (_, iy) => {
            const value = f(k, (ix + 0.5) / 28, (iy + 0.5) / 28);
            const t = (value - lo) / (hi - lo || 1);
            return <rect key={`${ix}-${iy}`} x={HEAT.x + ix * 7.5} y={HEAT.y + (27 - iy) * 7.5} width="7.7" height="7.7" fill={VIOLETT} fillOpacity={0.12 + 0.76 * t} />;
          }))}
          {linien.map((segments, level) => <g key={niveaus[level]} stroke="var(--w-text)" strokeWidth="1.1" fill="none">{segments.map((s, i) => <line key={i} x1={hpx(s.a[0])} y1={hpy(s.a[1])} x2={hpx(s.b[0])} y2={hpy(s.b[1])} />)}<text x="252" y={32 + level * 15} fontSize="10" fill="var(--w-text)">{fmtDe(niveaus[level], 1)}</text></g>)}
          <rect x={HEAT.x} y={HEAT.y} width={HEAT.size} height={HEAT.size} fill="none" stroke={GRAU} />
          <line x1={HEAT.x} y1={HEAT.y + HEAT.size} x2={HEAT.x + HEAT.size} y2={HEAT.y + HEAT.size} stroke={BLAU} />
          <line x1={HEAT.x} y1={HEAT.y} x2={HEAT.x} y2={HEAT.y + HEAT.size} stroke={GRUEN} />
          <text x="139" y="250" fill={BLAU} fontSize="12" textAnchor="middle">x</text><text x="18" y="123" fill={GRUEN} fontSize="12" textAnchor="middle">y</text>
          <DragHandle x={hpx(punkt[0])} y={hpy(punkt[1])} farbe={ORANGE} {...drag.handleProps("punkt")} />
        </svg>
        <Surface3D size={280} xDomain={[0, 1]} yDomain={[0, 1]} zDomain={zDom} surface={surface} contours={niveaus} contourColor={VIOLETT} points={[{ p: [punkt[0], punkt[1], z], color: ORANGE, label: `f = ${fmtDe(z, 2)}`, onTop: true }]} dropLines azimuth={sicht.azimuth} elevation={sicht.elevation} onViewChange={setSicht} labels={{ x: "x", y: "y", z: "f" }} ariaLabel="Dieselbe Tensorproduktfunktion als Fläche; der orange Punkt ist mit der Höhenlinientafel verknüpft." />
      </div>
      <div className="mt-3 max-w-md">
        <Slider label="c₁₁" value={k.a} onChange={(a) => setK({ ...k, a })} min={-5} max={5} step={0.5} accent={VIOLETT} />
        <Slider label="c₂₁" value={k.b} onChange={(b) => setK({ ...k, b })} min={-5} max={5} step={0.5} accent={VIOLETT} />
        <Slider label="c₁₂" value={k.c} onChange={(c) => setK({ ...k, c })} min={-5} max={5} step={0.5} accent={VIOLETT} />
        <Slider label="c₂₂" value={k.d} onChange={(d) => setK({ ...k, d })} min={-5} max={5} step={0.5} accent={VIOLETT} />
        <Slider label="Punkt x" value={punkt[0]} onChange={(x) => setPunkt([x, punkt[1]])} min={0} max={1} step={0.05} accent={BLAU} />
        <Slider label="Punkt y" value={punkt[1]} onChange={(y) => setPunkt([punkt[0], y])} min={0} max={1} step={0.05} accent={GRUEN} />
      </div>
      <ViewControls value={sicht} onChange={setSicht} />
      <Verdikt kind={Math.abs(k.d) < 1e-9 ? "ok" : "neutral"}>
        {Math.abs(k.d) < 1e-9
          ? `Bei c₂₂ = 0 liegt der Punkt bei f(${fmtDe(punkt[0], 2)}, ${fmtDe(punkt[1], 2)}) = ${fmtDe(z, 2)} auf einer Ebene: Die x-Steigung ist für jedes y gleich.`
          : `Bei c₂₂ = ${fmtDe(k.d, 1)} liegt derselbe Punkt in beiden Bildern bei f(${fmtDe(punkt[0], 2)}, ${fmtDe(punkt[1], 2)}) = ${fmtDe(z, 2)}. Die gekrümmten Höhenlinien zeigen die Kopplung von x und y.`}
      </Verdikt>
    </div>
  );
}
