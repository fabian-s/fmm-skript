import { useState } from "react";
import { Aufgabe, DragHandle, FMM_COLORS, Schaetzfrage, Slider, useDrag, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: f(x,y)=xy ist bei festem Gegenargument linear, aber nicht auf dem
 * Paar (x,y) linear: Verdoppeln beider Seiten liefert den Faktor 4.
 * Farbrollen: x blau, y grün, Fläche orange, gemeinsame Skalierung rot.
 * Provenienz: Eigenbau, keine portierten Texte.
 * Zahlen geprüft mit scripts/verify/KAP09/s91-bilinear.mjs (2026-08-20):
 * 3·2=6, (2·3)·2=12 und (2·3)·(2·2)=24.
 */
const { blau: BLAU, gruen: GRUEN, orange: ORANGE, rot: ROT, grau: GRAU } = FMM_COLORS;
const SIZE = 230;
const PAD = 32;
const W = SIZE + PAD + 18;
const H = SIZE + PAD + 18;
const px = (x: number) => PAD + (x / 6) * SIZE;
const py = (y: number) => PAD + SIZE - (y / 6) * SIZE;

export function BilinearitaetsDemo() {
  const [x, setX] = useState(3);
  const [y, setY] = useState(2);
  const [modus, setModus] = useState<"gemeinsam" | "fest">("gemeinsam");
  const drag = useDrag<"ecke">({
    feld: { x0: PAD, y0: PAD, w: SIZE, h: SIZE },
    welt: { x0: 0, x1: 3, y0: 0, y1: 3 },
    greifPosition: () => [x, y],
    clamp: ([a, b]) => [Math.max(0, Math.min(3, a)), Math.max(0, Math.min(3, b))],
    onDrag: ([a, b]) => {
      setX(a);
      setY(b);
    },
  });
  const flaeche = x * y;
  const faktor = modus === "gemeinsam" ? 4 : 2;
  const vergroessertX = 2 * x;
  const vergroessertY = modus === "gemeinsam" ? 2 * y : y;
  const vergroessert = vergroessertX * vergroessertY;
  const entartet = flaeche < 1e-8;

  return (
    <Schaetzfrage
      variante="auswahl"
      frage="Welcher Faktor entsteht beim Verdoppeln beider Seiten?"
      loesung="4"
      optionen={[
        { id: "2", text: "Faktor 2" },
        { id: "3", text: "Faktor 3" },
        { id: "4", text: "Faktor 4" },
      ]}
    >
      {({ aufgeloest }) => (
        <div>
          <Aufgabe>Ziehen wir die Ecke, tippen den Faktor und vergleichen danach beide Skalierungen.</Aufgabe>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="mt-3 max-w-full h-auto"
            role="img"
            aria-label="Rechteck mit den Seiten x und y; die rechte obere Ecke ist ziehbar."
            {...drag.svgProps}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((t) => (
              <g key={t}>
                <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0) + 3} stroke={GRAU} />
                <text x={px(t)} y={py(0) + 14} fontSize="9" textAnchor="middle" fill={GRAU}>{t}</text>
              </g>
            ))}
            <line x1={px(0)} y1={py(0)} x2={px(6)} y2={py(0)} stroke={GRAU} />
            <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(6)} stroke={GRAU} />
            {aufgeloest && (
              <rect
                x={px(0)} y={py(vergroessertY)} width={px(vergroessertX) - px(0)} height={py(0) - py(vergroessertY)}
                fill={modus === "gemeinsam" ? ROT : BLAU} fillOpacity="0.12"
                stroke={modus === "gemeinsam" ? ROT : BLAU} strokeDasharray="5 3" strokeWidth="2"
              />
            )}
            <rect x={px(0)} y={py(y)} width={px(x) - px(0)} height={py(0) - py(y)} fill={ORANGE} fillOpacity="0.38" stroke={ORANGE} />
            <line x1={px(0)} y1={py(0)} x2={px(x)} y2={py(0)} stroke={BLAU} strokeWidth="4" />
            <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(y)} stroke={GRUEN} strokeWidth="4" />
            <text x={(px(0) + px(x)) / 2} y={py(0) + 27} fill={BLAU} fontSize="11" textAnchor="middle">x = {fmtDe(x, 1)}</text>
            <text x={px(0) - 10} y={(py(0) + py(y)) / 2} fill={GRUEN} fontSize="11" textAnchor="end">y = {fmtDe(y, 1)}</text>
            <DragHandle x={px(x)} y={py(y)} farbe={ORANGE} {...drag.handleProps("ecke")} />
          </svg>
          <div className="mt-3 max-w-md">
            <Slider label="Seite x" value={x} onChange={setX} min={0} max={3} step={0.1} accent={BLAU} />
            <Slider label="Seite y" value={y} onChange={setY} min={0} max={3} step={0.1} accent={GRUEN} />
          </div>
          {aufgeloest && (
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Skalierung wählen">
              <button type="button" className="rounded px-3 py-1 text-sm" aria-pressed={modus === "gemeinsam"} onClick={() => setModus("gemeinsam")}>Beide Seiten verdoppeln</button>
              <button type="button" className="rounded px-3 py-1 text-sm" aria-pressed={modus === "fest"} onClick={() => setModus("fest")}>y festhalten</button>
            </div>
          )}
          <Verdikt kind={entartet ? "warn" : !aufgeloest ? "neutral" : modus === "fest" ? "ok" : "fail"}>
            {entartet
              ? "Auf einer Achse ist die Fläche null; einen Skalierungsfaktor können wir dort nicht ablesen."
              : !aufgeloest
                ? `Die Ausgangsfläche beträgt f(x,y) = ${fmtDe(flaeche, 2)}. Erst nach dem Tipp legen wir die Vergleichsfläche darüber.`
                : modus === "fest"
                  ? `Mit festem y gilt f(2x,y) = ${fmtDe(vergroessert, 2)} = 2·f(x,y). Das ist Linearität im ersten Argument.`
                  : `Gemeinsam gilt f(2x,2y) = ${fmtDe(vergroessert, 2)} = 4·f(x,y), nicht 2·f(x,y). Bilinearität verlangt gerade nicht gemeinsame Linearität.`}
          </Verdikt>
        </div>
      )}
    </Schaetzfrage>
  );
}
