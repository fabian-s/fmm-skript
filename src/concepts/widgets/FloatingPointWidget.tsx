import { useState } from "react";
import { M, Slider } from "../../lib";

/**
 * Number line of all positive numbers representable in a toy binary
 * floating-point system: x = (1.f)_2 * 2^e with t fraction bits and
 * exponent e in {-1, 0, 1, 2}. Shows how the gaps double at each power of 2.
 */
export function ToyFloatLine() {
  const [t, setT] = useState(2);

  const exps = [-1, 0, 1, 2];
  const values: number[] = [];
  for (const e of exps) {
    for (let k = 0; k < 2 ** t; k++) {
      values.push((1 + k / 2 ** t) * 2 ** e);
    }
  }
  // upper end of the last binade, so the final gap is visible too
  values.push(2 ** 3);

  const width = 300;
  const height = 70;
  const padL = 14;
  const padR = 10;
  const xMax = 8;
  const sx = (x: number) => padL + (x / xMax) * (width - padL - padR);
  const axisY = 34;
  const powerTicks = [0.5, 1, 2, 4, 8];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Mantissenbits nach dem Komma (t)"
        value={t}
        onChange={setT}
        min={1}
        max={4}
        step={1}
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label="Zahlenstrahl der darstellbaren Spielzeug-Gleitkommazahlen"
      >
        {/* axis */}
        <line
          x1={sx(0)}
          y1={axisY}
          x2={sx(xMax)}
          y2={axisY}
          stroke="#94a3b8"
          strokeWidth={1}
        />
        {/* representable numbers */}
        {values.map((v, i) => (
          <line
            key={i}
            x1={sx(v)}
            y1={axisY - 9}
            x2={sx(v)}
            y2={axisY + 9}
            stroke="#38bdf8"
            strokeWidth={1.5}
          />
        ))}
        {/* zero mark */}
        <line
          x1={sx(0)}
          y1={axisY - 9}
          x2={sx(0)}
          y2={axisY + 9}
          stroke="#f472b6"
          strokeWidth={1.5}
        />
        {/* labels at powers of two */}
        {[0, ...powerTicks].map((v) => (
          <text
            key={`lab-${v}`}
            x={sx(v)}
            y={axisY + 22}
            textAnchor="middle"
            fontSize={9}
            className="fill-slate-300"
          >
            {v}
          </text>
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        {exps.length * 2 ** t + 1} Striche; der Abstand zwischen Nachbarn knapp
        über 1 beträgt <M>{`2^{-${t}} = ${(2 ** -t).toFixed(4)}`}</M>, und er
        verdoppelt sich an jeder Zweierpotenz.
      </p>
    </div>
  );
}
