import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Surface3D, Verdikt, ViewControls, fmtInt } from "../../../lib";
import type { Sicht3D } from "../../../lib";

/**
 * Einsicht: Ein Tensor dritter Stufe lässt sich als Stapel von Matrizen lesen;
 * bei Bildern sind die Scheiben Farbkanäle. Farbrollen: Indizes/Faktor blau,
 * aktive Scheibe orange, RGB-Kanäle rot/grün/blau. Provenienz: Eigenbau.
 * Per node verifiziert: 4²=16, 4³=64, 8²·3=192
 * (verify-09-tensoren/check-s92.mjs, 2026-08-19).
 */
const { blau: BLAU, gruen: GRUEN, rot: ROT, orange: ORANGE, grau: GRAU } = FMM_COLORS;
const ZAHLEN = [[[2,-1,4,0],[3,1,-2,5],[0,4,1,-3],[2,0,3,1]], [[-2,3,1,4],[1,5,0,-1],[2,-4,3,0],[1,2,-2,4]], [[4,0,-3,1],[2,1,5,-2],[-1,3,0,2],[4,-2,1,3]], [[0,2,1,-4],[3,-1,4,0],[2,5,-2,1],[-3,0,2,4]]];

export function TensorScheibenViewer({ bild = false }: { bild?: boolean }) {
  const n = bild ? 8 : 4, slices = bild ? 3 : 4; const [k,setK] = useState(1); const [sicht,setSicht] = useState<Sicht3D>({azimuth:38,elevation:25});
  const channels = [ROT, GRUEN, BLAU]; const active = bild ? channels[k-1] : ORANGE;
  const surface = useMemo(() => ({ f:(x:number,y:number) => 0.15 + 0.7*(Math.sin((x+1)*2+k)+Math.cos((y+1)*2-k)+2)/4, nx:6,ny:6,color:active,opacity:.8,wire:true }), [active,k]);
  const matrix = bild ? Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>(i*29+j*17+(k-1)*53)%256)) : ZAHLEN[k-1];
  return <div>
    <Aufgabe>{bild ? "Wählen wir einen Farbkanal und vergleichen wir ihn mit dem gemeinsamen Bild." : "Wählen wir eine Scheibe im Stapel und lesen wir sie rechts als Matrix."}</Aufgabe>
    <Slider label={bild ? "Kanal" : "Scheibe k"} value={k} onChange={v=>setK(Math.round(v))} min={1} max={slices} step={1} accent={active} fmt={v=>String(Math.round(v))}/>
    <div className="flex flex-wrap gap-4 items-start"><svg viewBox="0 0 270 230" className="max-w-full h-auto" role="img" aria-label="Wählbarer Stapel aus Matrixscheiben.">
      {Array.from({length:slices},(_,r)=>slices-r).map(s=>{const dx=(s-1)*16,dy=(slices-s)*12;return <g key={s} onClick={()=>setK(s)} style={{cursor:"pointer"}}><rect x={35+dx} y={25+dy} width="150" height="150" fill="var(--w-bg)" stroke={s===k?active:GRAU} strokeWidth={s===k?3:1}/>{Array.from({length:n*n},(_,z)=>{const i=Math.floor(z/n),j=z%n;return <rect key={z} x={38+dx+j*150/n} y={28+dy+i*150/n} width={150/n-2} height={150/n-2} fill={s===k?active:GRAU} fillOpacity={s===k?.35:.12}/>})}<text x={192+dx} y={35+dy} fill={s===k?active:GRAU} fontSize="12">k={s}</text></g>})}</svg>
      {!bild && <Surface3D size={260} xDomain={[0,4]} yDomain={[0,4]} zDomain={[0,1]} surface={surface} points={[{p:[k-1,2,.5],color:ORANGE,label:`k=${k}`,onTop:true}]} azimuth={sicht.azimuth} elevation={sicht.elevation} onViewChange={setSicht} labels={{x:"i",y:"j",z:"k"}} ariaLabel="Dreidimensionale Ansicht desselben Scheibenstapels."/>}</div>
    {!bild && <ViewControls value={sicht} onChange={setSicht}/>}<div className="mt-2 inline-grid gap-1 font-mono text-xs" style={{gridTemplateColumns:`repeat(${n}, minmax(1.5rem,auto))`}}>{matrix.flat().map((v,i)=><span key={i} style={{color:active}}>{fmtInt(v)}</span>)}</div>
    <Verdikt kind="neutral">{bild ? `Der gewählte Kanal ist eine ${n}×${n}-Matrix; drei Kanäle bilden zusammen den Bildtensor.` : `Die gewählte Scheibe hat ${n*n} Einträge. Der ganze Stapel hat ${n*n*slices} Einträge und damit eine zusätzliche Indexposition (Definition 9.2.3).`}</Verdikt>
  </div>;
}
