import { useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Slider, useDrag, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: Verdoppeln beider Rechteckseiten vervierfacht die Fläche, das
 * Festhalten einer Seite verdoppelt sie nur; xy ist daher bilinear, nicht linear.
 * Farbrollen: x/erster Faktor blau, y/zweiter Faktor grün, Fläche/Produkt orange,
 * Nichtlinearitätswarnung rot. Provenienz: Eigenbau, keine portierten Texte.
 * Per node verifiziert: 3·2=6, 6·4=24 und 6·2=12
 * (verify-09-tensoren/check-s91.mjs, 2026-08-19). R4-Nachprüfung:
 * check-r4-claims.mjs, 2026-08-20.
 */
const { blau: BLAU, gruen: GRUEN, orange: ORANGE, rot: ROT, grau: GRAU } = FMM_COLORS;
const SIZE = 240, PAD = 34, W = SIZE + PAD + 16, H = SIZE + PAD + 18;
const px = (x: number) => PAD + x * (SIZE / 6);
const py = (y: number) => PAD + SIZE - y * (SIZE / 6);

export function BilinearitaetsDemo() {
  const [x, setX] = useState(1.6); const [y, setY] = useState(1.1); const [fest, setFest] = useState(false);
  const drag = useDrag<"ecke">({ feld: { x0: PAD, y0: PAD, w: SIZE, h: SIZE }, welt: { x0: 0, x1: 3, y0: 0, y1: 3 },
    greifPosition: () => [x, y], clamp: ([a,b]) => [Math.max(0, Math.min(3,a)), Math.max(0, Math.min(3,b))],
    onDrag: ([a,b]) => { setX(a); setY(b); } });
  const f = x*y, faktor = fest ? 2 : 4, gross = f*faktor, entartet = f === 0;
  return <div>
    <Aufgabe>Ziehen wir die rechte obere Ecke oder stellen beide Seiten ein; dann halten wir y einmal fest.</Aufgabe>
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 max-w-full h-auto" role="img" aria-label="Rechteck mit den Seiten x und y; die obere rechte Ecke ist ziehbar." {...drag.svgProps}>
      {[0,1,2,3,4,5,6].map(t => <g key={t}><line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0)+3} stroke={GRAU}/><text x={px(t)} y={py(0)+14} fontSize="9" textAnchor="middle" fill={GRAU}>{t}</text></g>)}
      <line x1={px(0)} y1={py(0)} x2={px(6)} y2={py(0)} stroke={GRAU}/><line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(6)} stroke={GRAU}/>
      <rect x={px(0)} y={py(fest ? y : 2*y)} width={px(2*x)-px(0)} height={py(0)-py(fest ? y : 2*y)} fill={ORANGE} fillOpacity=".12" stroke={fest?BLAU:ROT} strokeDasharray="5 3"/>
      <rect x={px(0)} y={py(y)} width={px(x)-px(0)} height={py(0)-py(y)} fill={ORANGE} fillOpacity=".35"/>
      <line x1={px(0)} y1={py(0)} x2={px(x)} y2={py(0)} stroke={BLAU} strokeWidth="4"/><line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(y)} stroke={GRUEN} strokeWidth="4"/>
      <DragHandle x={px(x)} y={py(y)} farbe={ORANGE} {...drag.handleProps("ecke")}/>
    </svg>
    <div className="max-w-md"><Slider label="Seite x" value={x} onChange={setX} min={0} max={3} step={0.1} accent={BLAU}/><Slider label="Seite y" value={y} onChange={setY} min={0} max={3} step={0.1} accent={GRUEN}/></div>
    <button type="button" className="rounded px-3 py-1 text-sm" style={{boxShadow:`inset 0 0 0 1px ${GRUEN}`}} aria-pressed={fest} onClick={() => setFest(!fest)}>{fest ? "y wieder mitverdoppeln" : "y festhalten"}</button>
    <Verdikt kind={entartet ? "warn" : fest ? "ok" : "fail"}>{entartet ? "Auf einer Achse ist die Fläche null; das Verhältnis ist nicht definiert." : fest ? `f(2x,y) = ${fmtDe(gross,2)} = 2·f(x,y): mit festem zweiten Argument zeigt sich die Linearität aus Beispiel 9.1.3.` : `f(2x,2y) = ${fmtDe(gross,2)} = 4·f(x,y), nicht 2·f(x,y). Das widerlegt gemeinsame Linearität nach Bemerkung 9.1.2.`}</Verdikt>
  </div>;
}
