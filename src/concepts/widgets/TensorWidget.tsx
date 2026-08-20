/**
 * Konzept-Widget `tensor`.
 *
 * DIE EINE EINSICHT: Ein Tensor ist ein Stapel Matrizen, und jede Zelle braucht
 * deshalb drei Adressteile. Zeile und Spalte reichen erst, wenn die Schicht
 * feststeht.
 *
 * FARBROLLEN: blau = die gewählte Schicht k; neutral = die beiden anderen
 * Schichten; orange = die gerade angezeigte Zelle. Farbe trägt keine
 * zusätzliche Aussage — die Adresse steht als Text daneben.
 *
 * PROVENIENZ: der gestapelte 3×3×3-Aufbau aus der Vorfassung (Stand
 * 2026-08-20). NEU im Re-Audit QA-O1: die Aufgabenzeile „zeigen auf die Zellen"
 * war eine leere Zusage (der Zeiger löste nichts aus, und das Verdikt sprach
 * von einer „hervorgehobenen Zelle", die es nicht gab). Jetzt hebt Zeigen bzw.
 * Tastaturfokus wirklich eine Zelle hervor, Zeilen- und Spaltenindex sind
 * angeschrieben, und das Verdikt nennt die konkrete Adresse.
 *
 * Es ist ein Schema, kein Koordinatenbild: die Indizes stehen als Ziffern am
 * Raster, Achsen mit Ticks gäbe es hier nichts zu beschriften.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * der Stapel hat 3·3·3 = 27 Zellen, jede mit einer Adresse (i, j, k) aus
 * {1, 2, 3}³.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED } from "../../lib";

const ZELLE = 26;
const VERSATZ = 16; // Tiefenversatz je Schicht
const RASTER = 3 * ZELLE;
const RAND = 16;
const B = RASTER + 2 * VERSATZ + 2 * RAND;
const H = RASTER + 2 * VERSATZ + 2 * RAND;

export function TensorStackWidget() {
  const [schicht, setSchicht] = useState(1);
  const [zelle, setZelle] = useState<[number, number] | null>(null);
  const k = Math.round(schicht);

  const dxOf = (l: number) => RAND + (l - 1) * VERSATZ;
  const dyOf = (l: number) => RAND + (3 - l) * VERSATZ;
  const dx = dxOf(k);
  const dy = dyOf(k);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Wählen wir eine Schicht und zeigen auf eine ihrer Zellen.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={
          zelle
            ? `Dreidimensionaler Stapel; hervorgehoben ist die Zelle mit der Adresse ${zelle[0] + 1}, ${zelle[1] + 1}, ${k}.`
            : `Dreidimensionaler Stapel aus drei Matrizen; Schicht ${k} liegt vorn.`
        }
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {/* hintere Schichten zuerst */}
        {[3, 2, 1]
          .filter((l) => l !== k)
          .map((l) => (
            <g key={l} opacity={0.7}>
              {Array.from({ length: 3 }, (_, i) =>
                Array.from({ length: 3 }, (_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={dxOf(l) + j * ZELLE}
                    y={dyOf(l) + i * ZELLE}
                    width={ZELLE - 2}
                    height={ZELLE - 2}
                    rx={3}
                    fill="var(--w-grid)"
                    stroke="var(--w-muted)"
                  />
                )),
              )}
            </g>
          ))}
        {/* gewählte Schicht mit Indizes und Zeigerziel */}
        {Array.from({ length: 3 }, (_, i) =>
          Array.from({ length: 3 }, (_, j) => {
            const hier = zelle?.[0] === i && zelle?.[1] === j;
            return (
              <rect
                key={`a${i}-${j}`}
                x={dx + j * ZELLE}
                y={dy + i * ZELLE}
                width={ZELLE - 2}
                height={ZELLE - 2}
                rx={3}
                fill={hier ? FMM_COLORS.orange : FMM_COLORS.blau}
                stroke={hier ? FMM_COLORS.orange : FMM_COLORS.blau}
                tabIndex={0}
                role="button"
                aria-label={`Zelle ${i + 1}, ${j + 1}, ${k}`}
                style={{ cursor: "pointer" }}
                onPointerEnter={() => setZelle([i, j])}
                onFocus={() => setZelle([i, j])}
                onClick={() => setZelle([i, j])}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setZelle([i, j]);
                }}
              />
            );
          }),
        )}
        {/* Zeilen- und Spaltenindex der gewählten Schicht */}
        {[0, 1, 2].map((i) => (
          <text
            key={`zi${i}`}
            x={dx - 5}
            y={dy + i * ZELLE + ZELLE / 2}
            textAnchor="end"
            fontSize={9}
            fill="var(--w-muted)"
          >
            {i + 1}
          </text>
        ))}
        {[0, 1, 2].map((j) => (
          <text
            key={`sj${j}`}
            x={dx + j * ZELLE + ZELLE / 2 - 1}
            y={dy - 4}
            textAnchor="middle"
            fontSize={9}
            fill="var(--w-muted)"
            stroke="var(--w-bg)"
            strokeWidth={2.5}
            paintOrder="stroke"
          >
            {j + 1}
          </text>
        ))}
        <text x={B - RAND} y={H - 5} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          Schicht k = {k}
        </text>
      </svg>
      <Slider
        label="Schicht k"
        value={schicht}
        onChange={(v) => {
          setSchicht(v);
          setZelle(null);
        }}
        min={1}
        max={3}
        step={1}
        fmt={(v) => v.toFixed(0)}
        accent={FMM_COLORS.blau}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> gewählte Schicht ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> angezeigte Zelle · neutral: die beiden
        übrigen Schichten
      </p>
      <Verdikt kind={zelle ? "ok" : "neutral"}>
        {zelle ? (
          <>
            Diese Zelle heißt a<sub>{zelle[0] + 1}</sub>
            <sub>{zelle[1] + 1}</sub>
            <sub>{k}</sub>: Zeile {zelle[0] + 1}, Spalte {zelle[1] + 1}, Schicht {k}. Ohne den
            dritten Index gäbe es drei Zellen mit derselben Adresse – eine in jeder Schicht.
          </>
        ) : (
          <>
            27 Zellen liegen in drei Schichten übereinander. Zeigen wir auf eine, um zu sehen, dass
            Zeile und Spalte allein sie nicht festlegen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
