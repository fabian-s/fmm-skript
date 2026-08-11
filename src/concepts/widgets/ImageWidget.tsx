import { useState } from "react";
import { Slider, TransformCanvas } from "../../lib";

export function ImageWidget() {
  const [th, setTh] = useState(0.8);
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A v für A = [[1,2],[0.5,1]] (Rang 1, Bild = span{(1, 0.5)})
  const Av: [number, number] = [v[0] + 2 * v[1], 0.5 * v[0] + v[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Richtung von v"
        value={th}
        onChange={setTh}
        min={-Math.PI / 2}
        max={Math.PI / 2}
      />
      <TransformCanvas
        matrix={[
          [1, 2],
          [0.5, 1],
        ]}
        showGrid={false}
        size={260}
        worldHalf={3}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "Av" },
        ]}
      />
      <p className="mt-1 text-xs">
        Drehen wir v, wohin wir wollen: Die Ausgabe Av landet immer auf der
        Geraden durch (1, 0.5); diese Gerade ist das gesamte Bild dieser
        Rang-1-Matrix.
      </p>
    </div>
  );
}
