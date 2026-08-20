import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Surface3D, Verdikt, ViewControls, fmtInt } from "../../../lib";
import type { Sicht3D } from "../../../lib";

/**
 * Einsicht: Die dritte Indexposition wählt eine vollständige Matrixscheibe;
 * bei RGB-Bildern sind drei solche Scheiben gemeinsam ein Pixelbild.
 * Farbrollen: aktive Tensor-Scheibe orange, Rot/Grün/Blau sind die RGB-Kanäle,
 * neutrale Scheiben grau. Provenienz: Eigenbau.
 * Verifizierte Zahlen: Der Zahlenstapel hat 4·4·4 = 64 Einträge; der Bildtensor
 * hat 8·8·3 = 192 Einträge. Die Kanalwerte liegen in [0,255].
 * Siehe scripts/verify/KAP09/s92-scheiben.mjs (2026-08-20).
 */
const { blau: BLAU, gruen: GRUEN, rot: ROT, orange: ORANGE, grau: GRAU } = FMM_COLORS;

const SCHEIBEN = [
  [[2, -1, 4, 0], [3, 1, -2, 5], [0, 4, 1, -3], [2, 0, 3, 1]],
  [[-2, 3, 1, 4], [1, 5, 0, -1], [2, -4, 3, 0], [1, 2, -2, 4]],
  [[4, 0, -3, 1], [2, 1, 5, -2], [-1, 3, 0, 2], [4, -2, 1, 3]],
  [[0, 2, 1, -4], [3, -1, 4, 0], [2, 5, -2, 1], [-3, 0, 2, 4]],
];

const kanalWert = (kanal: number, zeile: number, spalte: number) =>
  (zeile * 29 + spalte * 17 + kanal * 53) % 256;

const kanalMatrix = (kanal: number) =>
  Array.from({ length: 8 }, (_, zeile) =>
    Array.from({ length: 8 }, (_, spalte) => kanalWert(kanal, zeile, spalte))
  );

function MatrixZellen({
  matrix,
  farbe,
  x = 0,
  y = 0,
  groesse,
  intensiv = false,
  onCellClick,
  aktiv,
}: {
  matrix: number[][];
  farbe: string;
  x?: number;
  y?: number;
  groesse: number;
  intensiv?: boolean;
  onCellClick?: (zeile: number, spalte: number) => void;
  aktiv?: [number, number];
}) {
  const n = matrix.length;
  const zelle = groesse / n;
  return (
    <g>
      {matrix.map((zeile, i) =>
        zeile.map((wert, j) => {
          const ausgewaehlt = aktiv?.[0] === i && aktiv?.[1] === j;
          const opacity = intensiv ? 0.08 + 0.82 * (wert / 255) : 0.18;
          return (
            <g key={`${i}-${j}`} onClick={() => onCellClick?.(i, j)} style={onCellClick ? { cursor: "pointer" } : undefined}>
              <rect
                x={x + j * zelle}
                y={y + i * zelle}
                width={zelle}
                height={zelle}
                fill={farbe}
                fillOpacity={opacity}
                stroke={ausgewaehlt ? "var(--w-text)" : "var(--w-border)"}
                strokeWidth={ausgewaehlt ? 1.8 : 0.55}
              />
              <text
                x={x + (j + 0.5) * zelle}
                y={y + (i + 0.62) * zelle}
                textAnchor="middle"
                fontSize={n === 8 ? 8 : 11}
                fill={intensiv && wert > 155 ? "var(--w-bg)" : "var(--w-text)"}
              >
                {fmtInt(wert)}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
}

function ZahlenTensor() {
  const [k, setK] = useState(1);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 25 });
  const matrix = SCHEIBEN[k - 1];
  const flaeche = useMemo(
    () => ({
      // Stückweise konstante Höhe: jedes Plateau ist genau ein Matrixeintrag.
      f: (x: number, y: number) => matrix[Math.min(3, Math.max(0, Math.floor(y)))][Math.min(3, Math.max(0, Math.floor(x)))],
      nx: 20,
      ny: 20,
      color: ORANGE,
      opacity: 0.78,
      wire: true,
    }),
    [matrix]
  );

  return (
    <div>
      <Aufgabe>Wählen wir eine Scheibe und vergleichen wir ihre Matrixeinträge mit dem zugehörigen Höhenfeld.</Aufgabe>
      <svg viewBox="0 0 310 314" className="max-w-full h-auto" role="img" aria-label={`Aufgefächerter Stapel aus vier beschrifteten Matrixscheiben; Scheibe ${k} ist ausgewählt.`}>
        {[[1, 20, 26], [2, 170, 26], [3, 20, 174], [4, 170, 174]].map(([nummer, x, y]) => {
          const aktiv = nummer === k;
          return (
            <g key={nummer} onClick={() => setK(nummer)} style={{ cursor: "pointer" }}>
              <text x={x} y={y - 7} fill={aktiv ? ORANGE : "var(--w-muted)"} fontSize="12">k = {nummer}</text>
              <rect x={x} y={y} width="120" height="120" fill="var(--w-bg)" stroke={aktiv ? ORANGE : GRAU} strokeWidth={aktiv ? 3 : 1} />
              <MatrixZellen matrix={SCHEIBEN[nummer - 1]} farbe={aktiv ? ORANGE : GRAU} x={x} y={y} groesse={120} />
            </g>
          );
        })}
      </svg>
      <div className="mt-3">
        <Surface3D
          size={300}
          xDomain={[0, 4]}
          yDomain={[0, 4]}
          zDomain={[-4, 5]}
          surface={flaeche}
          azimuth={sicht.azimuth}
          elevation={sicht.elevation}
          onViewChange={setSicht}
          labels={{ x: "j", y: "i", z: `Tᵢⱼ${k}` }}
          ariaLabel={`Höhenfeld der ausgewählten Matrixscheibe k gleich ${k}.`}
        />
      </div>
      <Slider label="Scheibe k" value={k} onChange={(wert) => setK(Math.round(wert))} min={1} max={4} step={1} accent={ORANGE} fmt={(wert) => String(Math.round(wert))} />
      <ViewControls value={sicht} onChange={setSicht} />
      <div className="mt-2 flex flex-wrap gap-x-4 text-xs" aria-label="Legende">
        <span style={{ color: ORANGE }}>Orange: gewählte Scheibe und ihr Höhenfeld</span>
        <span style={{ color: GRAU }}>Grau: übrige Scheiben</span>
      </div>
      <Verdikt kind={k === 1 ? "neutral" : "ok"}>
        {k === 1
          ? "Für k = 1 sehen wir die erste Matrix des Stapels als Höhenfeld; jeder Eintrag bestimmt ein Plateau."
          : `Für k = ${k} wechselt nicht nur das Etikett: Das Höhenfeld übernimmt genau die ${k}. Matrixscheibe.`}
      </Verdikt>
    </div>
  );
}

function FarbBild() {
  const [pixel, setPixel] = useState<[number, number]>([3, 4]);
  const kanaele = [kanalMatrix(0), kanalMatrix(1), kanalMatrix(2)];
  const werte = kanaele.map((matrix) => matrix[pixel[0]][pixel[1]]);
  const rgb = `rgb(${werte.join(", ")})`;
  const namen = ["Rot", "Grün", "Blau"];
  const farben = [ROT, GRUEN, BLAU];

  return (
    <div>
      <Aufgabe>Klicken wir auf denselben Pixel in einer Kanalscheibe und lesen wir ab, welche drei Zahlen seine Farbe zusammensetzen.</Aufgabe>
      <div className="overflow-x-auto pb-2">
        <svg viewBox="0 0 610 180" className="max-w-full h-auto min-w-[610px]" role="img" aria-label="Rot-, Grün- und Blaukanal neben dem zusammengesetzten RGB-Bild.">
          {kanaele.map((matrix, kanal) => (
            <g key={namen[kanal]}>
              <text x={kanal * 148 + 8} y="13" fill={farben[kanal]} fontSize="12">{namen[kanal]}-Kanal</text>
              <MatrixZellen matrix={matrix} farbe={farben[kanal]} x={kanal * 148 + 8} y={22} groesse={136} intensiv aktiv={pixel} onCellClick={(i, j) => setPixel([i, j])} />
            </g>
          ))}
          <g>
            <text x="452" y="13" fill="var(--w-text)" fontSize="12">RGB-Bild</text>
            {Array.from({ length: 8 }, (_, i) =>
              Array.from({ length: 8 }, (_, j) => {
                const rot = kanaele[0][i][j];
                const gruen = kanaele[1][i][j];
                const blau = kanaele[2][i][j];
                const ausgewaehlt = pixel[0] === i && pixel[1] === j;
                return <rect key={`${i}-${j}`} x={452 + j * 17} y={22 + i * 17} width="17" height="17" fill={`rgb(${rot}, ${gruen}, ${blau})`} stroke={ausgewaehlt ? "var(--w-text)" : "var(--w-border)"} strokeWidth={ausgewaehlt ? 1.8 : 0.55} />;
              })
            )}
          </g>
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 text-xs" aria-label="Legende">
        <span style={{ color: ROT }}>Rot: Intensität des Rotanteils</span>
        <span style={{ color: GRUEN }}>Grün: Intensität des Grünanteils</span>
        <span style={{ color: BLAU }}>Blau: Intensität des Blauanteils</span>
      </div>
      <Verdikt kind={Math.max(...werte) - Math.min(...werte) < 35 ? "neutral" : "ok"}>
        {Math.max(...werte) - Math.min(...werte) < 35
          ? `Pixel (${pixel[1] + 1}, ${pixel[0] + 1}) hat die fast ausgeglichenen Kanalwerte (${werte.join(", ")}); er erscheint daher annähernd grau.`
          : `Pixel (${pixel[1] + 1}, ${pixel[0] + 1}) entsteht aus (${werte.join(", ")}); die unterschiedlichen Kanalwerte erzeugen sichtbar ${rgb}.`}
      </Verdikt>
    </div>
  );
}

export function TensorScheibenViewer({ bild = false }: { bild?: boolean }) {
  return bild ? <FarbBild /> : <ZahlenTensor />;
}
