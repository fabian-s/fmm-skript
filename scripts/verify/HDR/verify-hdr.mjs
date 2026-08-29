#!/usr/bin/env node
// Independent numerical checks for the HDR F1 headers, 2026-08-20.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

// S101: the displayed map is a directed dependency graph; node and edge counts
// are read out of the widget source instead of being asserted against
// themselves (assert.equal(15, 15) could not fail — REV29).
const s101 = readFileSync(
  new URL("../../../src/chapters/10-differentialrechnung/widgets/S101Konzeptkarte.tsx", import.meta.url),
  "utf8",
);
const s101Nodes = [...(/const nodes: FlowNode\[\] = \[([\s\S]*?)\n\];/.exec(s101)?.[1] ?? "")
  .matchAll(/id: "([^"]+)"/g)].map((m) => m[1]);
const s101Edges = [...(/const edges: FlowEdge\[\] = \[([\s\S]*?)\n\];/.exec(s101)?.[1] ?? "")
  .matchAll(/from: "([^"]+)", to: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
assert.equal(s101Nodes.length, 15);
assert.equal(s101Edges.length, 18);
assert.equal(new Set(s101Nodes).size, 15, "S101: doppelte Knoten-IDs");
assert.equal(new Set(s101Edges.map((e) => e.join("→"))).size, 18, "S101: doppelte Kanten");
for (const [a, b] of s101Edges) {
  assert.ok(s101Nodes.includes(a) && s101Nodes.includes(b), `S101: Kante ${a} → ${b} ins Leere`);
}
assert.equal(new Set([...s101.matchAll(/group: "(k\w+)"/g)].map((m) => m[1])).size, 4);

// S141DreiProbleme: extrema are analytic; noise has RMS one independently.
const f = x => .5 + .28 * Math.sin(2 * Math.PI * x - .9);
close(Math.min(...Array.from({length:100001},(_,i)=>f(i/100000))), .22, 1e-8);
close(Math.max(...Array.from({length:100001},(_,i)=>f(i/100000))), .78, 1e-8);
const xs = [.042,.125,.208,.292,.375,.458,.542,.625,.708,.792,.875,.958];
const zRaw = [-.245,-.912,-.221,-2.183,.304,1.66,.197,-.441,1.272,1.185,-.348,-.267];
const zRms = Math.sqrt(zRaw.reduce((s,v)=>s+v*v,0)/zRaw.length), z=zRaw.map(v=>v/zRms);
close(Math.sqrt(z.reduce((s,v)=>s+v*v,0)/z.length), 1, 2e-15);
for (const x of [0,.2,.4,.6,.8,1]) close(.06*Math.sin(5*Math.PI*x),0,1e-15);
const obs = xs.map((x,i)=>f(x)+.12*z[i]);
assert.ok(Math.min(...obs) >= .180 && Math.max(...obs) <= .957);

// S141Interpolanten: interpolation and dense maximum-span scan.
const fs=[x=>1+x*x,x=>x<=1?x+1:3*x-1,x=>x**3-2*x*x+2*x+1,x=>1+x*x+.5*Math.sin(2*Math.PI*x)];
for(const [x,y] of [[0,1],[1,2],[2,5]]) for(const h of fs) close(h(x),y);
let span={v:-1,x:0}; for(let i=0;i<=1000000;i++){const x=2*i/1000000, a=fs.map(h=>h(x));const v=Math.max(...a)-Math.min(...a);if(v>span.v)span={v,x};}
close(span.v,.7499,1e-4); close(span.x,1.2884,1e-3);

// S142: both independently written coefficient formulas interpolate all slider states.
let worst=0; for(let a=0;a<=6;a+=.5)for(let b=0;b<=6;b+=.5)for(let c=0;c<=6;c+=.5){
 const m=[a,b-a-(a-2*b+c)/2,(a-2*b+c)/2], n=[a,b-a,(a-2*b+c)/2];
 for(const x of [0,1,2]){const pm=m[0]+m[1]*x+m[2]*x*x, pn=n[0]+n[1]*x+n[2]*x*(x-1), y=[a,b,c][x]; worst=Math.max(worst,Math.abs(pm-y),Math.abs(pn-y),Math.abs(pm-pn));}
}
assert.ok(worst < 4e-14); assert.equal(13**3,2197);

// S143Runge: barycentric interpolation with independently generated nodes.
const rf=x=>1/(1+25*x*x); const nodes=(n,cheb)=>Array.from({length:n},(_,i)=>cheb?Math.cos((2*i+1)*Math.PI/(2*n)):-1+2*i/(n-1));
function interp(xn){const yn=xn.map(rf),w=xn.map((x,i)=>1/xn.reduce((p,t,j)=>i===j?p:p*(x-t),1));return x=>{for(let i=0;i<xn.length;i++)if(Math.abs(x-xn[i])<1e-13)return yn[i];let a=0,b=0;for(let i=0;i<xn.length;i++){const q=w[i]/(x-xn[i]);a+=q*yn[i];b+=q;}return a/b;};}
function scan(n,cheb){const p=interp(nodes(n,cheb));let r={e:-1,x:0};for(let i=0;i<=200000;i++){const x=-1+2*i/200000,e=Math.abs(rf(x)-p(x));if(e>r.e)r={e,x};}return r;}
for(const [n,e,c] of [[5,.4384,.4020],[10,.3003,.2692],[15,7.195,.0466],[20,8.579,.0376]]){close(scan(n,false).e,e,2e-3);close(scan(n,true).e,c,2e-3);}
assert.ok(scan(5,false).e > scan(10,false).e);

// S144: Cox--de Boor recursion, partition of unity and local support.
function B(t,k,q,x){if(q===0)return t[k]<=x&&x<t[k+1]?1:0;const a=t[k+q]-t[k],b=t[k+q+1]-t[k+1];return (a?(x-t[k])/a*B(t,k,q-1,x):0)+(b?(t[k+q+1]-x)/b*B(t,k+1,q-1,x):0);}
for(let q=0;q<=3;q++){const grid=[0,1,2,3,4,5], t=[...Array(q).fill(0),...grid,...Array(q).fill(5)], K=t.length-q-1;assert.equal(t.length,5+2*q+1);assert.equal(K,5+q);for(let i=0;i<1000;i++){const x=(5-.000001)*i/999;close(Array.from({length:K},(_,k)=>B(t,k,q,x)).reduce((s,v)=>s+v,0),1,2e-14);}}
const t=[0,1,2,3,4,5,6,7,8,9];for(let q=1;q<=3;q++)for(let i=0;i<100;i++){const x=2+(q+1)*i/99,l=(x-2)/(t[2+q]-2),r=(t[3+q]-x)/(t[3+q]-3);assert.ok(l>=-1e-12&&r>=-1e-12);close(B(t,2,q,x),l*B(t,2,q-1,x)+r*B(t,3,q-1,x),1e-12);}

// S144Konstruktion: independently substitute the documented natural spline.
const pieces=[[0,23/15,0,-8/15],[-6/5,77/15,-18/5,2/3],[26/5,-67/15,6/5,-2/15]];
const val=(p,x)=>p[0]+p[1]*x+p[2]*x*x+p[3]*x*x*x, d1=(p,x)=>p[1]+2*p[2]*x+3*p[3]*x*x,d2=(p,x)=>2*p[2]+6*p[3]*x;
for(const [i,x,y] of [[0,0,0],[0,1,1],[1,2,0],[2,3,-1]])close(val(pieces[i],x),y);
for(const [i,x] of [[0,1],[1,2]]){close(val(pieces[i],x),val(pieces[i+1],x));close(d1(pieces[i],x),d1(pieces[i+1],x));close(d2(pieces[i],x),d2(pieces[i+1],x));}
close(d2(pieces[0],0),0); close(d2(pieces[2],3),0);
// "12 Bedingungen fuer 12 Unbekannte" wird gezaehlt, nicht behauptet
// (assert.equal(3*4,12) konnte nicht fehlschlagen — REV29): die Zeilen werden
// wie im Widget aufgebaut und die dokumentierten Stuecke eingesetzt.
const kn=[0,1,2,3], zeile=(k,f)=>{const r=new Array(12).fill(0); f(r,4*k); return r;};
const rows=[
  ...[[0,0],[0,1],[1,2],[2,3]].map(([k,x])=>zeile(k,(r,o)=>{r[o]=1;r[o+1]=x;r[o+2]=x*x;r[o+3]=x**3;})),
  ...[0,1].flatMap((k)=>{const x=kn[k+1]; const sub=(a,b)=>a.map((v,i)=>v-b[i]);
    const p=(kk)=>zeile(kk,(r,o)=>{r[o]=1;r[o+1]=x;r[o+2]=x*x;r[o+3]=x**3;});
    const p1=(kk)=>zeile(kk,(r,o)=>{r[o+1]=1;r[o+2]=2*x;r[o+3]=3*x*x;});
    const p2=(kk)=>zeile(kk,(r,o)=>{r[o+2]=2;r[o+3]=6*x;});
    return [sub(p(k),p(k+1)),sub(p1(k),p1(k+1)),sub(p2(k),p2(k+1))];}),
  zeile(0,(r,o)=>{r[o+2]=2;r[o+3]=0;}), zeile(2,(r,o)=>{r[o+2]=2;r[o+3]=18;}),
];
const rhs=[0,1,0,-1,0,0,0,0,0,0,0,0];
assert.equal(rows.length,12); assert.ok(rows.every(r=>r.length===12));
const koeff=pieces.flat();
rows.forEach((r,i)=>close(r.reduce((s,v,j)=>s+v*koeff[j],0),rhs[i],1e-12));
// Die Bedingungsmatrix hat vollen Rang: Gauss mit Spaltenpivotierung raeumt
// alle zwoelf Spalten, kein Pivot faellt unter 1e-9.
{const Ag=rows.map(r=>r.slice()); let minPiv=Infinity;
 for(let c=0;c<12;c++){let p=c; for(let r=c+1;r<12;r++) if(Math.abs(Ag[r][c])>Math.abs(Ag[p][c])) p=r;
  [Ag[c],Ag[p]]=[Ag[p],Ag[c]]; minPiv=Math.min(minPiv,Math.abs(Ag[c][c]));
  for(let r=c+1;r<12;r++){const m=Ag[r][c]/Ag[c][c]; for(let j=c;j<12;j++) Ag[r][j]-=m*Ag[c][j];}}
 assert.ok(minPiv>1e-9, `S144Konstruktion: Bedingungsmatrix fast singulaer (${minPiv})`);}

// S144Stoerung: the displayed B-spline collocation structure has q+1=4
// nonzeros per interior data row; the degree-8 Vandermonde has nine entries.
const tx=[0,0,0,1,2,3,4,5,6,7,8,9,9,9,9], q=3, kk=tx.length-q-1;
for(const x of [1,2,3,4,5,6,7,8,9-1e-9]) assert.ok(Array.from({length:kk},(_,k)=>Math.abs(B(tx,k,q,x))>1e-12).filter(Boolean).length<=4);
// Gegenstueck: die 9x9-Vandermonde-Matrix zu x = 1..9 ist VOLL besetzt — 81
// Eintraege, keiner null (assert.equal(9,9) hat das nur behauptet, REV29).
{const xd=[1,2,3,4,5,6,7,8,9], V=xd.map(x=>xd.map((_,s)=>x**s));
 assert.equal(V.flat().length,81);
 assert.equal(V.flat().filter(v=>Math.abs(v)>1e-12).length,81);
 for(const r of V) assert.equal(r.filter(v=>Math.abs(v)>1e-12).length,9);
 // und die Bandmatrix bleibt darunter: hoechstens 4 von 11 je Datenzeile.
 const band=[1,2,3,4,5,6,7,8,9-1e-9].map(x=>Array.from({length:kk},(_,k)=>B(tx,k,q,x)).filter(v=>Math.abs(v)>1e-12).length);
 assert.ok(Math.max(...band)<=4 && band.length===9);}

console.log("HDR verification passed: S101, S141–S144 numerical claims.");
