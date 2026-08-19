/**
 * Labeled-axes wrappers around the shared lib canvases (lib itself is frozen).
 *
 * LabeledPlot / LabeledTransformCanvas render the lib <Plot>/<TransformCanvas>
 * unchanged and add numeric tick labels + axis names in a reserved margin
 * around the canvas, so nothing is ever drawn on top of the data area and
 * labels cannot be cut off.
 *
 * Also exports small numeric helpers used by widgets to auto-scale the
 * world window so arrows / curve images always fit inside the canvas.
 */
import type { ReactNode } from "react";
import { Plot, type Series } from "./Plot";
import { TransformCanvas, type Vec2 } from "./TransformCanvas";

export { niceTicks, sigmaMax, maxAbsCoord } from "./util";
import { niceTicks, fmtTick } from "./util";

const PAD_L = 34; // room for y tick labels
const PAD_B = 16; // room for x tick labels

/**
 * Margin frame: y ticks left of the canvas, x ticks below it, axis names
 * above-left and below-center. `tickClass` lets dark tooltip panels pass a
 * lighter text color.
 */
function LabeledFrame({
  width,
  height,
  xDomain,
  yDomain,
  xLabel,
  yLabel,
  tickClass = "text-slate-500 dark:text-slate-400",
  children,
}: {
  width: number;
  height: number;
  xDomain: [number, number];
  yDomain: [number, number];
  xLabel: string;
  yLabel: string;
  tickClass?: string;
  children: ReactNode;
}) {
  const [x0, x1] = xDomain;
  const [y0, y1] = yDomain;
  const xt = niceTicks(x0, x1);
  const yt = niceTicks(y0, y1);
  return (
    <div className={`inline-block shrink-0 select-none text-[10px] ${tickClass}`}>
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {yLabel} ↑
      </div>
      <div className="flex">
        <div className="relative shrink-0" style={{ width: PAD_L, height }}>
          {yt.map((t) => (
            <span
              key={t}
              className="absolute right-1 -translate-y-1/2 font-mono leading-none"
              style={{ top: ((y1 - t) / (y1 - y0)) * height }}
            >
              {fmtTick(t)}
            </span>
          ))}
        </div>
        <div className="shrink-0">{children}</div>
      </div>
      <div className="flex">
        <div style={{ width: PAD_L }} className="shrink-0" />
        <div className="relative shrink-0" style={{ width, height: PAD_B }}>
          {xt.map((t) => (
            <span
              key={t}
              className="absolute top-0.5 -translate-x-1/2 font-mono leading-none"
              style={{ left: ((t - x0) / (x1 - x0)) * width }}
            >
              {fmtTick(t)}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
        {xLabel} →
      </div>
    </div>
  );
}

/** lib <Plot> with labeled, tick-marked axes in a reserved margin. */
export function LabeledPlot({
  xLabel,
  yLabel,
  tickClass,
  series,
  xDomain = [-3, 3],
  yDomain = [-3, 3],
  width = 320,
  height = 240,
  markers = [],
}: {
  xLabel: string;
  yLabel: string;
  tickClass?: string;
  series: Series[];
  xDomain?: [number, number];
  yDomain?: [number, number];
  width?: number;
  height?: number;
  markers?: { x: number; y: number; color?: string; label?: string }[];
}) {
  return (
    <LabeledFrame
      width={width}
      height={height}
      xDomain={xDomain}
      yDomain={yDomain}
      xLabel={xLabel}
      yLabel={yLabel}
      tickClass={tickClass}
    >
      <Plot
        series={series}
        xDomain={xDomain}
        yDomain={yDomain}
        width={width}
        height={height}
        markers={markers}
      />
    </LabeledFrame>
  );
}

/** lib <TransformCanvas> with labeled, tick-marked axes in a reserved margin. */
export function LabeledTransformCanvas({
  xLabel = "x₁",
  yLabel = "x₂",
  tickClass,
  matrix,
  vectors,
  showGrid,
  showUnitCircle,
  size = 340,
  worldHalf = 3.2,
  annotate,
}: {
  xLabel?: string;
  yLabel?: string;
  tickClass?: string;
  matrix: [[number, number], [number, number]];
  vectors?: Vec2[];
  showGrid?: boolean;
  showUnitCircle?: boolean;
  size?: number;
  worldHalf?: number;
  annotate?: (ctx: CanvasRenderingContext2D, toPx: (x: number, y: number) => [number, number]) => void;
}) {
  return (
    <LabeledFrame
      width={size}
      height={size}
      xDomain={[-worldHalf, worldHalf]}
      yDomain={[-worldHalf, worldHalf]}
      xLabel={xLabel}
      yLabel={yLabel}
      tickClass={tickClass}
    >
      <TransformCanvas
        matrix={matrix}
        vectors={vectors}
        annotate={annotate}
        showGrid={showGrid}
        showUnitCircle={showUnitCircle}
        size={size}
        worldHalf={worldHalf}
      />
    </LabeledFrame>
  );
}
