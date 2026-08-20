/**
 * Konzept-Widget `eigenvalue-eigenvector`.
 *
 * DIE EINE EINSICHT: Eigenrichtungen sind selten. Fast jede Richtung wird von
 * A aus ihrer Geraden herausgekippt; nur in zwei Richtungen bleibt Av auf der
 * Geraden durch v liegen, und erst dort ist der Streckungsfaktor ein Eigenwert.
 * Deshalb ist dieses Widget eine Suchaufgabe und verrät die beiden Winkel
 * nicht: gefundene Richtungen werden als Gerade eingeblendet.
 *
 * FARBROLLEN: rot = v (der Pfeil in der Hand), blau = Av (das Bild, zugleich
 * die Farbe des Bildgitters), grau gestrichelt = eine bereits gefundene
 * Eigenrichtung.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18); dessen Schlussabsatz nannte
 * die gesuchten Winkel 45° und 135° samt Eigenwerten und war damit ein
 * Spoiler. Ziehen auf dem Einheitskreis und Achsen kommen aus der
 * Lib-`TransformCanvas`, Suchlogik und Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA2.mjs,
 * 2026-08-19), A = [[2, 1], [1, 2]], Spur 4, det 3, also λ = 3 und λ = 1:
 *   45°/225° : Av = ±(2,121; 2,121), Kreuzprodukt 0, vᵀAv = 3, ‖Av‖ = 3
 *   135°/315°: Av = ∓(0,707; −0,707), Kreuzprodukt 0, vᵀAv = 1, ‖Av‖ = 1
 * Es gilt exakt (Abweichung ≤ 8,9e−16) Kreuzprodukt(θ) = cos 2θ und
 * vᵀAv = 2 + sin 2θ. Mit dem Fangfenster |cos 2θ| < 0,08 rastet die Erkennung
 * in den Bereichen 42,75°–47,25°, 132,75°–137,25° und ihren Gegenrichtungen
 * ein, also ±2,25° um jede Eigenrichtung.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
  type Mat2,
  type SubspaceLine,
} from "../../lib";

const A: Mat2 = [
  [2, 1],
  [1, 2],
];
const TOL = 0.08;

export function EigenWidget() {
  // Voreinstellung 20°: eine gewöhnliche Richtung, in der Av sichtbar aus der
  // Geraden durch v herauskippt – die Ausgangslage der Suche.
  const [deg, setDeg] = useState(20);
  const [gefunden, setGefunden] = useState<{ gross: boolean; klein: boolean }>({
    gross: false,
    klein: false,
  });

  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [Math.cos(th), Math.sin(th)];
  const Av: [number, number] = [
    A[0][0] * v[0] + A[0][1] * v[1],
    A[1][0] * v[0] + A[1][1] * v[1],
  ];
  const kreuz = v[0] * Av[1] - v[1] * Av[0];
  const parallel = Math.abs(kreuz) < TOL;
  const rayleigh = v[0] * Av[0] + v[1] * Av[1]; // = vᵀAv, da ‖v‖ = 1

  const setzeWinkel = (grad: number) => {
    const g = ((grad % 360) + 360) % 360;
    setDeg(g);
    const t = (g * Math.PI) / 180;
    if (Math.abs(Math.cos(2 * t)) < TOL) {
      const lam = 2 + Math.sin(2 * t);
      setGefunden((alt) => (lam > 2 ? { ...alt, gross: true } : { ...alt, klein: true }));
    }
  };

  const geraden: SubspaceLine[] = [];
  if (gefunden.gross) geraden.push({ dir: [1, 1], color: FMM_COLORS.grau, dash: true });
  if (gefunden.klein) geraden.push({ dir: [1, -1], color: FMM_COLORS.grau, dash: true });
  const beide = gefunden.gross && gefunden.klein;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Drehen wir v, bis der blaue Pfeil genau auf dem roten liegt: es gibt
        zwei solche Richtungen.
      </Aufgabe>
      <TransformCanvas
        matrix={A}
        size={280}
        worldHalf={3.2}
        showUnitCircle={false}
        lines={geraden}
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true, dragConstraint: "unitCircle" },
          { v: Av, color: FMM_COLORS.blau, label: "Av" },
        ]}
        onVectorChange={(_i, p) => setzeWinkel((Math.atan2(p[1], p[0]) * 180) / Math.PI)}
        ariaLabel={`Der Einheitsvektor v und sein Bild Av unter A; die beiden Pfeile liegen aktuell ${parallel ? "auf derselben Geraden" : "nicht auf derselben Geraden"}.`}
      />
      <Slider
        label="Richtung von v"
        value={deg}
        onChange={setzeWinkel}
        min={0}
        max={360}
        step={1}
        fmt={(x) => `${fmtDe(x, 0)}°`}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        A = [[2, 1], [1, 2]] ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> v ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Av · gestrichelt: schon
        gefundene Eigenrichtungen
      </p>
      <Verdikt kind={parallel ? "ok" : "neutral"}>
        {parallel ? (
          <>
            Treffer: Av liegt auf der Geraden durch v, und zwar mit dem Faktor λ ={" "}
            {fmtDe(rayleigh, 2)}. Das ist die Eigenwertgleichung Av = λv.{" "}
            {beide
              ? "Beide Eigenrichtungen sind damit gefunden; eine 2×2-Matrix hat höchstens zwei, und die beiden gestrichelten Geraden stehen hier senkrecht aufeinander, wie es sich für eine symmetrische Matrix gehört."
              : "Eine zweite Richtung mit dieser Eigenschaft fehlt noch."}
          </>
        ) : (
          <>
            Av = ({fmtDe(Av[0], 2)}; {fmtDe(Av[1], 2)}) kippt aus der Geraden durch
            v heraus: keine Eigenrichtung. Die Zahl vᵀAv = {fmtDe(rayleigh, 2)}{" "}
            beschreibt hier nur, wie stark v in seine eigene Richtung gestreckt
            wird, und ist kein Eigenwert.
          </>
        )}
      </Verdikt>
    </div>
  );
}
