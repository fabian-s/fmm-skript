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
 * Siehe scripts/verify/KAP09/s92-scheiben.mjs (2026-08-20) und
 * scripts/verify/REV29/09-tensoren-S92Scheiben.mjs (2026-08-29). Das zweite
 * Skript prüft die STRUKTUR der vier Scheiben, auf die sich die Verdikte
 * berufen (konstante Zeile, Symmetrie, Ausreißer), und die Kanalformel an
 * konkreten Pixeln statt nur auf ihrem Wertebereich.
 */
const { blau: BLAU, gruen: GRUEN, rot: ROT, orange: ORANGE, grau: GRAU } = FMM_COLORS;

/**
 * Die vier Scheiben sind KEINE vier gleichartigen Zufallsblöcke, sondern vier
 * Fälle, an denen sich der Wechsel des dritten Index ablesen lässt:
 *   k = 1 ohne Struktur, k = 2 mit konstanter dritter Zeile, k = 3 symmetrisch,
 *   k = 4 mit einem einzelnen Ausreißer. Die Verdikte hängen daran.
 */
const SCHEIBEN = [
  [[2, -1, 4, 0], [3, 1, -2, 5], [0, 4, 1, -3], [2, 0, 3, 1]],
  [[1, 4, -2, 0], [3, -1, 2, 5], [3, 3, 3, 3], [0, 2, -3, 1]],
  [[4, 1, -2, 0], [1, 3, 5, 2], [-2, 5, 0, -3], [0, 2, -3, 1]],
  [[0, 1, 0, -1], [1, 0, 5, 0], [0, -1, 0, 1], [1, 0, -1, 0]],
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
      <svg viewBox="0 0 310 314" className="max-w-full h-auto" role="group" aria-label={`Aufgefächerter Stapel aus vier beschrifteten Matrixscheiben; Scheibe ${k} ist ausgewählt.`}>
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
          ? "Für k = 1 ist die Scheibe ohne besondere Struktur: Das Höhenfeld ist eine zerklüftete Treppe, jeder Eintrag ein Plateau."
          : k === 2
            ? "Die dritte Zeile dieser Scheibe ist konstant 3. Im Höhenfeld liegt dort ein waagerechtes Band auf Höhe 3 – der Index i ändert nichts mehr, sobald i = 3 ist."
            : k === 3
              ? "Diese Scheibe ist symmetrisch, Tᵢⱼ₃ = Tⱼᵢ₃. Das Höhenfeld ist deshalb spiegelbildlich zur Diagonalen i = j; Vertauschen der ersten beiden Indizes ändert nichts."
              : "Ein einziger Ausreißer T₂₃₄ = 5 ragt heraus, alle übrigen Einträge liegen zwischen −1 und 1: ein Turm auf flachem Feld. Der dritte Index wählt also nicht nur andere Zahlen, sondern eine andere Gestalt."}
      </Verdikt>
    </div>
  );
}

function FarbBild() {
  const [zeile, setZeile] = useState(3);
  const [spalte, setSpalte] = useState(4);
  const pixel: [number, number] = [zeile, spalte];
  const kanaele = [kanalMatrix(0), kanalMatrix(1), kanalMatrix(2)];
  const werte = kanaele.map((matrix) => matrix[zeile][spalte]);
  const rgb = `rgb(${werte.join(", ")})`;
  const namen = ["Rot", "Grün", "Blau"];
  const farben = [ROT, GRUEN, BLAU];
  const waehle = (i: number, j: number) => {
    setZeile(i);
    setSpalte(j);
  };
  // Ein Graustufen-Zweig wäre unerreichbar: die Kanalformel liefert
  // nirgends eine Spanne unter 106 (REV29-Prüfskript). Stattdessen trennen wir
  // nach dem dominierenden Kanal – alle drei Fälle kommen im Bild wirklich vor.
  const dominant = werte.indexOf(Math.max(...werte));

  return (
    <div>
      <Aufgabe>
        Wählen wir denselben Pixel in einer Kanalscheibe – per Klick oder über die beiden
        Regler – und lesen wir ab, welche drei Zahlen seine Farbe zusammensetzen.
      </Aufgabe>
      {/* Vier gleich breite Tafeln: bei 390 px zwei nebeneinander, sonst alle vier.
          Ein einziges breites SVG hätte das RGB-Bild auf dem Handy aus dem Bild geschoben. */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {kanaele.map((matrix, kanal) => (
          <div key={namen[kanal]} className="min-w-0">
            <svg
              viewBox="0 0 152 152"
              width={152}
              height={152}
              className="h-auto w-full max-w-full"
              role="group"
              aria-label={`${namen[kanal]}-Kanal als 8 mal 8 Zahlentafel; gewählt ist Zeile ${zeile + 1}, Spalte ${spalte + 1} mit dem Wert ${werte[kanal]}.`}
            >
              <text x={2} y={11} fill={farben[kanal]} fontSize="11">
                {namen[kanal]}-Kanal
              </text>
              <MatrixZellen
                matrix={matrix}
                farbe={farben[kanal]}
                x={2}
                y={16}
                groesse={136}
                intensiv
                aktiv={pixel}
                onCellClick={waehle}
              />
            </svg>
          </div>
        ))}
        <div className="min-w-0">
          <svg
            viewBox="0 0 152 152"
            width={152}
            height={152}
            className="h-auto w-full max-w-full"
            role="img"
            aria-label={`Das zusammengesetzte RGB-Bild aus den drei Kanälen; der gewählte Pixel hat die Farbe ${rgb}.`}
          >
            <text x={2} y={11} fill="var(--w-text)" fontSize="11">
              RGB-Bild
            </text>
            {Array.from({ length: 8 }, (_, i) =>
              Array.from({ length: 8 }, (_, j) => {
                const rot = kanaele[0][i][j];
                const gruen = kanaele[1][i][j];
                const blau = kanaele[2][i][j];
                const ausgewaehlt = zeile === i && spalte === j;
                return (
                  <rect
                    key={`${i}-${j}`}
                    x={2 + j * 17}
                    y={16 + i * 17}
                    width="17"
                    height="17"
                    fill={`rgb(${rot}, ${gruen}, ${blau})`}
                    stroke={ausgewaehlt ? "var(--w-text)" : "var(--w-border)"}
                    strokeWidth={ausgewaehlt ? 1.8 : 0.55}
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>
      {/* Doppelpfad: dieselbe Auswahl ohne Maus, über zwei Regler. */}
      <div className="mt-2 max-w-sm">
        <Slider label="Zeile i" value={zeile + 1} onChange={(v) => setZeile(Math.round(v) - 1)} min={1} max={8} step={1} accent={ORANGE} fmt={(v) => String(Math.round(v))} />
        <Slider label="Spalte j" value={spalte + 1} onChange={(v) => setSpalte(Math.round(v) - 1)} min={1} max={8} step={1} accent={ORANGE} fmt={(v) => String(Math.round(v))} />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 text-xs" aria-label="Legende">
        <span style={{ color: ROT }}>Rot: Intensität des Rotanteils</span>
        <span style={{ color: GRUEN }}>Grün: Intensität des Grünanteils</span>
        <span style={{ color: BLAU }}>Blau: Intensität des Blauanteils</span>
      </div>
      <Verdikt kind="ok">
        {`Pixel (${zeile + 1}, ${spalte + 1}) – Zeile, dann Spalte, wie bei Iᵢⱼₖ – entsteht aus (${werte.join(", ")}) und ergibt ${rgb}. Der ${namen[dominant]}-Kanal ist hier mit ${werte[dominant]} der größte; er ist es nicht überall, denn jeder Kanal hat sein eigenes Muster mit eigener Steigung in i und j.`}
      </Verdikt>
    </div>
  );
}

export function TensorScheibenViewer({ bild = false }: { bild?: boolean }) {
  return bild ? <FarbBild /> : <ZahlenTensor />;
}
