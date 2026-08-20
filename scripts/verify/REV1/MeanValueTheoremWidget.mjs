import assert from "node:assert/strict";
const close=(actual,expected,tolerance=1e-6)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);
const f=x=>x**3/3-x, slope=(a,b)=>(f(b)-f(a))/(b-a), roots=m=>[Math.sqrt(m+1),-Math.sqrt(m+1)];
for(const [a,b,m,x] of [[-2,1.6,.12,1.058301],[-1.5,1.5,-.25,.866025],[-.5,2,1/12,1.040833],[.4,2,.653333,1.285820]]) { close(slope(a,b),m,6e-7); close(roots(m)[0],x,6e-7); close(roots(m)[0]**2-1,m); }
close(100 / 1, 100);
console.log("MeanValueTheoremWidget: verified");
