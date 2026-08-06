/** Konzept-Tooltip: Skalarprodukt (inneres Produkt) x^T y. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

function AngleWidget() {
  const [deg, setDeg] = useState(40);
  const th = (deg * Math.PI) / 180;
  const x: [number, number] = [2, 1];
  const y: [number, number] = [1.8 * Math.cos(th), 1.8 * Math.sin(th)];
  const ip = x[0] * y[0] + x[1] * y[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Drehen wir <M>{"\\by"}</M> (rot): Das Vorzeichen von{" "}
        <M>{"\\bx^T \\by"}</M> wechselt genau dann, wenn die beiden Vektoren
        senkrecht aufeinander stehen.
      </p>
      <Slider
        label="Winkel von y"
        value={deg}
        onChange={setDeg}
        min={0}
        max={360}
        step={1}
        fmt={(v) => `${v.toFixed(0)}°`}
      />
      <LabeledTransformCanvas
        matrix={[[1, 0], [0, 1]]}
        vectors={[
          { v: x, color: "#60a5fa", label: "x" },
          { v: y, color: "#f87171", label: "y" },
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={220}
        worldHalf={2.4}
        tickClass="text-slate-300"
      />
      <p className="mt-1 font-mono text-sm">
        x&middot;y = {ip.toFixed(2)}{" "}
        {Math.abs(ip) < 0.05 ? "(≈ senkrecht!)" : ip > 0 ? "(Winkel < 90°)" : "(Winkel > 90°)"}
      </p>
    </div>
  );
}

registerConcept({
  id: "inner-product",
  title: "Skalarprodukt",
  body: (
    <>
      <p>
        Das <em>Skalarprodukt</em> (inner product, dot product) zweier{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink>{" "}
        <M>{"\\bx, \\by"}</M> im{" "}
        <ConceptLink id="real-coordinate-space">
          <M>{"\\R^n"}</M>
        </ConceptLink>{" "}
        multipliziert zueinander passende Komponenten und addiert die
        Ergebnisse; mit der{" "}
        <ConceptLink id="transpose">Transponierten</ConceptLink> schreibt es
        sich als Zeile mal Spalte:
      </p>
      <MD>
        {"\\bx^T \\by = x_1 y_1 + x_2 y_2 + \\cdots + x_n y_n."}
      </MD>
      <p>
        Zum Beispiel erhalten wir mit <M>{"\\bx = (1, 2)"}</M> und{" "}
        <M>{"\\by = (3, 4)"}</M> den Wert{" "}
        <M>{"1 \\cdot 3 + 2 \\cdot 4 = 11"}</M>. Setzen wir{" "}
        <M>{"\\by = \\bx"}</M>, ergibt sich die Quadratsumme{" "}
        <M>{"\\bx^T \\bx = \\sum_i x_i^2"}</M>, genau die quadrierte
        euklidische Länge. So hängt die 2-Norm über{" "}
        <M>{"\\|\\bx\\|_2^2 = \\bx^T \\bx"}</M> mit Quadratsummen zusammen.
        Geometrisch gilt{" "}
        <M>{"\\bx^T \\by = \\|\\bx\\|_2 \\, \\|\\by\\|_2 \\cos\\theta"}</M>,
        wobei <M>{"\\theta"}</M> der Winkel zwischen den Vektoren ist; das
        Skalarprodukt ist also genau dann null, wenn die Vektoren senkrecht
        aufeinander stehen. In der Statistik begegnet es uns ständig: Die
        Stichprobenkovarianz zweier zentrierter Datenvektoren ist einfach ihr
        Skalarprodukt geteilt durch <M>{"n-1"}</M>.
      </p>
      <AngleWidget />
    </>
  ),
});
