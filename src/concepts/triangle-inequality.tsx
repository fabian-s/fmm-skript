/** Konzept-Tooltip: Dreiecksungleichung (normale und umgekehrte Form). */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

function TriangleWidget() {
  const [omega, setOmega] = useState(0.9);
  const na = 2.0; // ‖a‖
  const nb = 1.3; // ‖b‖
  const nsum = Math.sqrt(na * na + nb * nb + 2 * na * nb * Math.cos(omega));
  const lower = Math.abs(na - nb);
  const upper = na + nb;
  const w = 300;
  const h = 215;
  const s = 55;
  const ox = 35;
  const oy = h - 25;
  const ax = ox + s * na;
  const px = ox + s * (na + nb * Math.cos(omega));
  const py = oy - s * nb * Math.sin(omega);
  const barW = 140;
  const barX = 120;
  const fmt = (v: number) => v.toFixed(2).replace(".", ",");
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel ω zwischen a und b"
        value={omega}
        onChange={setOmega}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(t) => `${((t * 180) / Math.PI).toFixed(0)}°`}
      />
      <svg width={w} height={h} className="rounded bg-slate-900/60">
        {/* Vergleichsbalken: Sandwich |‖a‖−‖b‖| ≤ ‖a+b‖ ≤ ‖a‖+‖b‖ */}
        <text x={8} y={20} fill="#e2e8f0" fontSize={11}>
          |‖a‖−‖b‖| = {fmt(lower)}
        </text>
        <rect x={barX} y={12} width={(barW * lower) / upper} height={9} fill="#94a3b8" />
        <text x={8} y={38} fill="#009E73" fontSize={11}>
          ‖a+b‖ = {fmt(nsum)}
        </text>
        <rect x={barX} y={30} width={(barW * nsum) / upper} height={9} fill="#009E73" />
        <text x={8} y={56} fill="#e2e8f0" fontSize={11}>
          ‖a‖+‖b‖ = {fmt(upper)}
        </text>
        <rect x={barX} y={48} width={barW} height={9} fill="#94a3b8" />
        {/* Dreieck: a vom Ursprung, b ab der Spitze von a, a+b als Luftlinie */}
        <line x1={ox} y1={oy} x2={ax} y2={oy} stroke="#0072B2" strokeWidth={2.5} />
        <line x1={ax} y1={oy} x2={px} y2={py} stroke="#D55E00" strokeWidth={2.5} />
        <line x1={ox} y1={oy} x2={px} y2={py} stroke="#009E73" strokeWidth={2.5} />
        <text x={ox + (s * na) / 2 - 4} y={oy + 14} fill="#0072B2" fontSize={13}>
          a
        </text>
        <text x={(ax + px) / 2 + 7} y={(oy + py) / 2 + 4} fill="#D55E00" fontSize={13}>
          b
        </text>
        <text x={(ox + px) / 2 - 20} y={(oy + py) / 2 - 4} fill="#009E73" fontSize={13}>
          a+b
        </text>
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Schieben wir den Winkel <M>{"\\omega"}</M>: die grüne Luftlinie{" "}
        <M>{"\\lVert \\ba + \\bb \\rVert"}</M> pendelt zwischen den beiden grauen
        Schranken. Die obere erreicht sie nur bei <M>{"\\omega = 0^\\circ"}</M>{" "}
        (gleiche Richtung, Dreieck fällt zur Strecke zusammen), die untere nur
        bei <M>{"\\omega = 180^\\circ"}</M> (Gegenrichtung) — das ist die
        umgekehrte Dreiecksungleichung, angewandt auf <M>{"\\ba"}</M> und{" "}
        <M>{"-\\bb"}</M>.
      </p>
    </div>
  );
}

registerConcept({
  id: "triangle-inequality",
  title: "Dreiecksungleichung",
  body: (
    <>
      <p>
        Anschaulich: der direkte Weg ist nie länger als der Umweg. Laufen wir
        vom Ursprung erst entlang des{" "}
        <ConceptLink id="vector">Vektors</ConceptLink> <M>{"\\ba"}</M> und von
        dessen Spitze aus weiter entlang <M>{"\\bb"}</M>, landen wir bei{" "}
        <M>{"\\ba + \\bb"}</M>. Die drei Wege bilden ein Dreieck, und die
        „Luftlinie" ist höchstens so lang wie der Umweg über die Ecke:
      </p>
      <MD>
        {"\\lVert \\ba + \\bb \\rVert \\;\\leq\\; \\lVert \\ba \\rVert + \\lVert \\bb \\rVert."}
      </MD>
      <p>
        Diese <em>Dreiecksungleichung</em> (triangle inequality) ist eine der
        drei definierenden Eigenschaften jeder{" "}
        <ConceptLink id="norm">Norm</ConceptLink> — sie gilt also nicht nur für
        die <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink>,
        sondern etwa auch für Summen- und Maximumsnorm. Für reelle Zahlen ist
        sie die aus der Analysis vertraute Betragsungleichung{" "}
        <M>{"|a + b| \\leq |a| + |b|"}</M>. Kurzer Check mit{" "}
        <M>{"\\ba = (3, 0)^\\top"}</M> und <M>{"\\bb = (0, 4)^\\top"}</M>:
        euklidisch ist{" "}
        <M>{"\\lVert \\ba + \\bb \\rVert = 5 \\leq 3 + 4 = 7"}</M>. Gleichheit
        gilt in der euklidischen Norm genau dann, wenn einer der Vektoren ein
        nichtnegatives Vielfaches des anderen ist.
      </p>
      <p className="mt-2">
        <strong>Umgekehrte Dreiecksungleichung.</strong> Oft brauchen wir eine
        Schranke „von unten": Wie verschieden können die Normen zweier Vektoren
        höchstens sein? Wenden wir die Dreiecksungleichung auf den Umweg{" "}
        <M>{"\\ba = (\\ba - \\bb) + \\bb"}</M> an, folgt{" "}
        <M>{"\\lVert \\ba \\rVert \\leq \\lVert \\ba - \\bb \\rVert + \\lVert \\bb \\rVert"}</M>,
        also{" "}
        <M>{"\\lVert \\ba \\rVert - \\lVert \\bb \\rVert \\leq \\lVert \\ba - \\bb \\rVert"}</M>.
        Vertauschen wir die Rollen von <M>{"\\ba"}</M> und <M>{"\\bb"}</M>,
        gilt dieselbe Schranke auch für{" "}
        <M>{"\\lVert \\bb \\rVert - \\lVert \\ba \\rVert"}</M> — zusammen:
      </p>
      <MD>
        {"\\bigl|\\, \\lVert \\ba \\rVert - \\lVert \\bb \\rVert \\,\\bigr| \\;\\leq\\; \\lVert \\ba - \\bb \\rVert."}
      </MD>
      <p>
        Diese <em>umgekehrte Dreiecksungleichung</em> (reverse triangle
        inequality) sagt: liegen zwei Vektoren nahe beieinander, dann sind auch
        ihre Normen nahe beieinander — die Norm ist eine stetige Funktion.
        Genau so wird sie in Fehlerabschätzungen benutzt: der Abstand{" "}
        <M>{"\\lVert \\ba - \\bb \\rVert"}</M> zweier Größen kontrolliert die
        Differenz ihrer Längen. Im Beispiel oben:{" "}
        <M>{"|3 - 4| = 1 \\leq \\lVert \\ba - \\bb \\rVert = 5"}</M>.
      </p>
      <TriangleWidget />
    </>
  ),
});
