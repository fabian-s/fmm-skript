/**
 * Konzept-Widget `cholesky-factorization`.
 *
 * DIE EINE EINSICHT: Positive Definitheit ist in der Geometrie und in der
 * Rechnung dieselbe Bedingung – genau dann, wenn die Niveaumenge xᵀAx = 1 eine
 * echte Ellipse ist, liefern beide Wurzelschritte der Cholesky-Zerlegung reelle
 * und positive Diagonaleintraege l11, l22.
 *
 * FARBROLLEN: blau = die Niveauellipse xᵀAx = 1; grün = der Faktor L; rot =
 * der abgebrochene zweite Wurzelschritt. Achsen, Ticks und Text aus den
 * Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   Voreinstellung A = [4 2; 2 3] ⇒ L = [2 0; 1 √2] mit √2 = 1,41…; LLᵀ = A
 *   exakt (elementweise per Assertion), Eigenwerte 5,5616 und 1,4384.
 *   Die Halbachsen von xᵀAx = 1 sind 1/√λ.
 *
 * KORREKTUREN 2026-08-20 (Re-Audit QA-O0):
 *  - Die Achsen waren zwei nackte Linien ohne Ticks und ohne Namen.
 *  - Die Ellipse hatte keine Größenbegrenzung: auf dem Reglerraster sind
 *    15 854 von 179 032 positiv definiten Tripeln (8,9 %) so schlecht
 *    konditioniert, dass die große Halbachse über MAX_R = 80 px hinauswächst;
 *    bei a = 0,9; b = −0,9; c = 0,9 wären es Milliarden Pixel. Die Zeichnung
 *    klemmt jetzt, zeichnet gestrichelt und sagt es im Verdikt.
 *  - „A = [4,0 2,0; 2,0 3,0]“ mit deutschem Dezimalkomma war nicht lesbar; die
 *    Matrizen stehen jetzt als Raster mit einer Nachkommastelle.
 *
 * KORREKTUR 2026-08-26 (Pop-up-Audit): Der Grenzfall q = a22 - a21^2/a11 = 0
 * wurde wie der indefinite Fall behandelt und die Niveaumenge dort „Hyperbel“
 * genannt. Fuer q = 0 ist A aber positiv SEMIdefinit (det A = 0), und die
 * Niveaumenge zerfaellt in zwei parallele Geraden. Es gibt jetzt drei Zustaende:
 *   det A > 0  regulaer, Ellipse, l22 > 0;
 *   det A = 0  exakt entartet, zwei parallele Geraden, l22 = 0;
 *   det A < 0  indefinit, Hyperbel, l22 nicht reell.
 * Die Fallentscheidung laeuft NICHT ueber eine Toleranz, sondern exakt: die drei
 * Regler liefern Vielfache von 0,1, also ist det A = (A10*C10 - B10^2)/100 mit
 * ganzzahligen Zehnteln A10, B10, C10 – das Vorzeichen dieser ganzen Zahl ist
 * exakt. Die Warnstufe „nahe entartet“ bleibt davon getrennt.
 *
 * RECHNUNG zum entarteten Fall (nachgerechnet 2026-08-26): mit a22 = a21^2/a11
 * ist xAx = a11*x1^2 + 2*a21*x1*x2 + (a21^2/a11)*x2^2 = (a11*x1 + a21*x2)^2/a11,
 * also xAx = 1 <=> a11*x1 + a21*x2 = +-sqrt(a11). Probe A = [4 2; 2 1]:
 * xAx = (2*x1 + x2)^2, Geraden 2*x1 + x2 = +-1; die Formel gibt
 * 4*x1 + 2*x2 = +-2, dieselben Geraden. Ihr Abstand vom Ursprung ist
 * sqrt(a11)/sqrt(a11^2 + a21^2) <= 1/sqrt(a11) <= sqrt(2) < 3,5, sie liegen also
 * immer im gezeichneten Fenster.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 180;
const CX = 150;
const CY = 90;
const S = 42; // Pixel je Welteinheit (Niveaumenge xᵀAx = 1)
const MAX_R = 80; // groesste zeichenbare Halbachse

function Matrix({
  zeilen,
  farbe,
  name,
}: {
  zeilen: string[][];
  farbe: string;
  name: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs" style={{ color: farbe }}>
      {name} =
      <span className="inline-block border-x-2 px-1" style={{ borderColor: farbe }}>
        {zeilen.map((z, i) => (
          <span key={i} className="grid grid-cols-2 gap-x-2 text-right leading-5">
            {z.map((v, j) => (
              <span key={j}>{v}</span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export function CholeskyWidget() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  // Exakte Fallunterscheidung ueber ganzzahlige Zehntel (siehe Kopfkommentar):
  // det A = (A10*C10 - B10^2)/100, das Vorzeichen der ganzen Zahl ist exakt.
  const det100 = Math.round(a * 10) * Math.round(c * 10) - Math.round(b * 10) ** 2;
  const q = det100 / 100 / a; // = a22 - a21^2/a11, ohne Rundungsdrift im Vorzeichen
  const ok = a > 0 && det100 > 0;
  const entartet = a > 0 && det100 === 0;
  const l11 = Math.sqrt(a);
  const l21 = b / l11;
  const l22 = det100 >= 0 ? Math.sqrt(Math.max(q, 0)) : NaN;
  const spur = a + c;
  const disk = Math.sqrt((a - c) ** 2 + 4 * b * b);
  const lam1 = (spur + disk) / 2;
  const lam2 = (spur - disk) / 2;
  const winkel = 0.5 * Math.atan2(2 * b, a - c);
  const rxRoh = ok ? S / Math.sqrt(lam1) : 0;
  const ryRoh = ok ? S / Math.sqrt(lam2) : 0;
  const geklemmt = ok && ryRoh > MAX_R;
  const rx = Math.min(rxRoh, MAX_R);
  const ry = Math.min(ryRoh, MAX_R);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verstellen wir A und beobachten wir Ellipse und zweiten Wurzelschritt.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Die Niveaumenge xᵀAx = 1 ist ${ok ? "eine Ellipse" : entartet ? "zu zwei parallelen Geraden entartet" : "eine Hyperbel, keine Ellipse"}.`}
      >
        {[-1, 1].map((t) => (
          <g key={t}>
            <line x1={CX + t * S} y1={CY - 3} x2={CX + t * S} y2={CY + 3} stroke="var(--w-axis)" />
            <text
              x={CX + t * S}
              y={CY + 13}
              textAnchor="middle"
              fontSize={8}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
            <line x1={CX - 3} y1={CY - t * S} x2={CX + 3} y2={CY - t * S} stroke="var(--w-axis)" />
            <text
              x={CX - 5}
              y={CY - t * S + 3}
              textAnchor="end"
              fontSize={8}
              fill="var(--w-muted)"
            >
              {fmtDe(t, 0)}
            </text>
          </g>
        ))}
        <line x1={6} y1={CY} x2={W - 6} y2={CY} stroke="var(--w-axis)" />
        <line x1={CX} y1={4} x2={CX} y2={H - 6} stroke="var(--w-axis)" />
        <text x={W - 6} y={CY - 5} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₁
        </text>
        <text x={CX + 5} y={12} fontSize={9} fill="var(--w-muted)">
          x₂
        </text>
        {ok ? (
          <ellipse
            cx={CX}
            cy={CY}
            rx={rx}
            ry={ry}
            transform={`rotate(${(-winkel * 180) / Math.PI} ${CX} ${CY})`}
            fill={FMM_COLORS.blau}
            fillOpacity={0.12}
            stroke={FMM_COLORS.blau}
            strokeWidth="2"
            strokeDasharray={geklemmt ? "5 3" : undefined}
          />
        ) : entartet ? (
          <>
            {[1, -1].map((vz) => {
              // Gerade a11*x1 + a21*x2 = vz*sqrt(a11); Fusspunkt p = k*n/|n|^2 mit
              // n = (a11, a21), Richtung d = (-a21, a11)/|n|. T = 10 Welteinheiten
              // reichen weit ueber das Fenster hinaus, das <svg> beschneidet.
              const nn = a * a + b * b;
              const k = vz * Math.sqrt(a);
              const px = (k * a) / nn;
              const py = (k * b) / nn;
              const norm = Math.sqrt(nn);
              const dx = -b / norm;
              const dy = a / norm;
              const T = 10;
              return (
                <line
                  key={vz}
                  x1={CX + S * (px - T * dx)}
                  y1={CY - S * (py - T * dy)}
                  x2={CX + S * (px + T * dx)}
                  y2={CY - S * (py + T * dy)}
                  stroke={FMM_COLORS.blau}
                  strokeWidth="2"
                />
              );
            })}
            <text x={W - 6} y={H - 4} textAnchor="end" fontSize={9} fill={FMM_COLORS.blau}>
              zwei parallele Geraden
            </text>
          </>
        ) : (
          <text x={W / 2} y={CY - 10} textAnchor="middle" fill={FMM_COLORS.rot} fontSize="11">
            keine Ellipse: Hyperbel
          </text>
        )}
        <text x={6} y={H - 4} fontSize={9} fill="var(--w-muted)">
          Niveaumenge xᵀAx = 1
        </text>
      </svg>
      <div className="mt-1 flex flex-wrap items-start gap-4">
        <Matrix
          name="A"
          farbe="var(--w-text)"
          zeilen={[
            [fmtDe(a, 1), fmtDe(b, 1)],
            [fmtDe(b, 1), fmtDe(c, 1)],
          ]}
        />
        {(ok || entartet) && (
          <Matrix
            name="L"
            farbe={FMM_COLORS.gruen}
            zeilen={[
              [fmtDe(l11, 2), "0"],
              [fmtDe(l21, 2), fmtDe(l22, 2)],
            ]}
          />
        )}
      </div>
      <p className={`mt-1 text-xs ${W_TEXT}`}>
        Blau: die Niveaumenge xᵀAx = 1; Grün: der Cholesky-Faktor L mit A = LLᵀ.
      </p>
      <Slider label="a₁₁" value={a} onChange={setA} min={0.5} max={6} step={0.1} />
      <Slider label="a₂₁ = a₁₂" value={b} onChange={setB} min={-4} max={4} step={0.1} />
      <Slider label="a₂₂" value={c} onChange={setC} min={0.5} max={6} step={0.1} />
      <Verdikt kind={ok ? (geklemmt ? "warn" : "ok") : entartet ? "warn" : "fail"}>
        {entartet ? (
          <>
            Hier ist a₁₁a₂₂ = a₂₁² exakt, also a₂₂ − a₂₁²/a₁₁ = 0 und l₂₂ = 0: A ist positiv
            semidefinit, aber singulär (det A = 0), und L ist nicht invertierbar. Passend dazu
            zerfällt die Niveaumenge in die beiden parallelen Geraden a₁₁x₁ + a₂₁x₂ = ±√a₁₁.
          </>
        ) : !ok ? (
          <>
            Der zweite Wurzelschritt verlangt a₂₂ − a₂₁²/a₁₁ = {fmtDe(q, 2)} &gt; 0. Hier ist er
            negativ: l₂₂ wäre nicht reell, A ist indefinit (det A &lt; 0), und die Niveaumenge
            ist keine Ellipse mehr, sondern eine Hyperbel.
          </>
        ) : geklemmt ? (
          <>
            Beide Wurzeln sind reell (l₂₂ = {fmtDe(l22, 2)}), A ist also positiv definit – aber
            nahe am Grenzfall det A = 0: der kleinere Eigenwert ist nur {fmtDe(lam2, 3)}, das
            Verhältnis λ₁/λ₂ = {fmtDe(lam1 / lam2, 0)}. Die Ellipse ist so gestreckt, dass wir sie
            nur noch abgeschnitten (gestrichelt) zeichnen können.
          </>
        ) : (
          <>
            Die Ellipse ist echt und l₂₂ = {fmtDe(l22, 2)} ist reell: A ist positiv definit. Die
            Eigenwerte {fmtDe(lam1, 2)} und {fmtDe(lam2, 2)} sind beide positiv, die Halbachsen
            sind 1/√λ.
          </>
        )}
      </Verdikt>
    </div>
  );
}
