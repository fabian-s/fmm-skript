/**
 * Konzept-Tooltip: Spektralradius — größter Eigenwert-Betrag; entscheidet,
 * ob Matrixpotenzen (und stationäre Iterationen) schrumpfen oder explodieren.
 * Kanonische id, geteilt mit den internen Apps.
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function PowerSpiralWidget() {
  const [s, setS] = useState(0.85);
  const [th, setTh] = useState(0.55);
  // G = s * Rotation(th): Eigenwerte s e^{+-i th}, also rho(G) = s exakt.
  const K = 16;
  const pts: [number, number][] = [];
  let x = 1;
  let y = 0.4;
  for (let k = 0; k <= K; k++) {
    pts.push([x, y]);
    const nx = s * (Math.cos(th) * x - Math.sin(th) * y);
    const ny = s * (Math.sin(th) * x + Math.cos(th) * y);
    x = nx;
    y = ny;
  }
  // Fensterausschnitt so, dass jede Iterierte hineinpasst (nichts wird abgeschnitten)
  let h = 1.2;
  for (const [px, py] of pts) h = Math.max(h, Math.abs(px), Math.abs(py));
  h *= 1.15;
  const W = 260;
  const cx = W / 2;
  const S = W / (2 * h);
  const X = (v: number) => cx + v * S;
  const Y = (v: number) => cx - v * S;
  const nLast = Math.hypot(...pts[K]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="flex flex-wrap gap-x-6">
        <div className="w-44">
          <Slider label="Skalierung s = ρ(G)" value={s} onChange={setS} min={0.6} max={1.1} step={0.01} />
        </div>
        <div className="w-44">
          <Slider label="Drehwinkel θ" value={th} onChange={setTh} min={0} max={1.5} step={0.05} />
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${W}`}
        width={W}
        height={W}
        className="max-w-full rounded border border-slate-500 bg-white"
      >
        <line x1={0} y1={cx} x2={W} y2={cx} stroke="#94a3b8" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={W} stroke="#94a3b8" strokeWidth={1} />
        <text x={W - 6} y={cx - 5} fontSize={10} fill="#64748b" textAnchor="end">
          x₁
        </text>
        <text x={cx + 5} y={11} fontSize={10} fill="#64748b">
          x₂
        </text>
        <text x={X(h / 1.15)} y={cx + 12} fontSize={9} fill="#64748b" textAnchor="middle">
          {(h / 1.15).toFixed(1)}
        </text>
        <polyline
          points={pts.map(([px, py]) => `${X(px)},${Y(py)}`).join(" ")}
          fill="none"
          stroke="#0284c7"
          strokeWidth={1.2}
          opacity={0.6}
        />
        {pts.map(([px, py], k) => (
          <circle
            key={k}
            cx={X(px)}
            cy={Y(py)}
            r={k === 0 ? 4 : 2.6}
            fill={k === 0 ? "#dc2626" : "#0284c7"}
          />
        ))}
      </svg>
      <p className="mt-1 text-xs">
        Iterierte <M>{"\\bx_{k+1} = \\bG\\bx_k"}</M> für eine
        Dreh-und-Streck-Matrix mit <M>{"\\rho(\\bG) = " + s.toFixed(2)}</M>{" "}
        (roter Punkt = Start). Nach 16 Schritten ist{" "}
        <M>{"\\|\\bx_{16}\\| = " + nLast.toFixed(3)}</M> &mdash;{" "}
        {s < 1
          ? "die Spirale zieht sich zusammen: ρ < 1."
          : s > 1
            ? "die Spirale läuft nach außen: ρ > 1."
            : "sie kreist: ρ = 1."}
      </p>
    </div>
  );
}

registerConcept({
  id: "spectral-radius",
  title: "Spektralradius",
  body: (
    <>
      <p>
        Der <em>Spektralradius</em> (spectral radius) einer quadratischen{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> ist die
        Größe ihres betragsgrößten{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerts</ConceptLink>:
      </p>
      <MD>{"\\rho(\\bA) = \\max\\{\\, |\\lambda| : \\lambda \\text{ ist Eigenwert von } \\bA \\,\\}."}</MD>
      <p>
        Da reelle Matrizen auch{" "}
        <ConceptLink id="complex-numbers">komplexe</ConceptLink> Eigenwerte
        haben können, meint <M>{"|\\lambda|"}</M> hier den Betrag einer
        komplexen Zahl. Beispiel: Für{" "}
        <M>{"\\bA = \\begin{bmatrix} 0.5 & 0.3 \\\\ 0 & 0.8 \\end{bmatrix}"}</M>{" "}
        sind die Eigenwerte <M>{"0.5"}</M> und <M>{"0.8"}</M>, also{" "}
        <M>{"\\rho(\\bA) = 0.8"}</M>.
      </p>
      <p>
        Warum das wichtig ist: Wiederholtes Multiplizieren mit <M>{"\\bA"}</M>{" "}
        streckt jede Eigenrichtung pro Schritt um ihren Eigenwert. Die
        Potenzen <M>{"\\bA^k"}</M> schrumpfen also genau dann gegen Null, wenn{" "}
        <M>{"\\rho(\\bA) < 1"}</M> gilt, und irgendwann dominiert die am
        langsamsten schrumpfende Richtung: Fehler klingen ungefähr wie{" "}
        <M>{"\\rho^k"}</M> ab. Das macht{" "}
        <M>{"\\rho(\\bG(\\bx^*)) < 1"}</M> zum natürlichen mehrdimensionalen
        Ersatz für die skalare Bedingung <M>{"|g'(x^*)| < 1"}</M> bei der
        Fixpunkt-Iteration für Gleichungssysteme.
      </p>
      <PowerSpiralWidget />
    </>
  ),
});
