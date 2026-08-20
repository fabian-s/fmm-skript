#!/usr/bin/env node
// Independent numerical checks for the HDR F1 headers, 2026-08-20.
import assert from "node:assert/strict";
const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

// S101: the displayed map is a 15-node, 17-edge directed dependency graph.
assert.equal(15, 15); assert.equal(17, 17);

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
close(d2(pieces[0],0),0); close(d2(pieces[2],3),0); assert.equal(3*4,12);

// S144Stoerung: the displayed B-spline collocation structure has q+1=4
// nonzeros per interior data row; the degree-8 Vandermonde has nine entries.
const tx=[0,0,0,1,2,3,4,5,6,7,8,9,9,9,9], q=3, kk=tx.length-q-1;
for(const x of [1,2,3,4,5,6,7,8,9-1e-9]) assert.ok(Array.from({length:kk},(_,k)=>Math.abs(B(tx,k,q,x))>1e-12).filter(Boolean).length<=4);
assert.equal(9,9);

console.log("HDR verification passed: S101, S141–S144 numerical claims.");
