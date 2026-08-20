import assert from "node:assert/strict";
const close = (actual, expected, tolerance) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
function factorial(n) { let x=1; for(let i=2;i<=n;i++)x*=i; return x; }
function polynomial(t,n) { let s=0; for(let k=0;2*k+1<=n;k++) s += (k%2?-1:1)*t**(2*k+1)/factorial(2*k+1); return s; }
for (const [n,t,error,bound] of [[1,.5,.02057,.125],[1,1,.1585,.5],[1,2,1.091,2],[1,3,2.859,4.5],[3,.5,.0002589,.002604],[3,1,.008138,.04167],[3,2,.2426,.6667],[5,.5,.000001545,.00002170],[5,1,.0001957,.001389],[5,2,.02404,.08889]]) { close(Math.abs(Math.sin(t)-polynomial(t,n)),error,error<.001?5e-7:5e-4); close(t**(n+1)/factorial(n+1),bound,bound<.01?5e-7:5e-4); assert.ok(Math.abs(Math.sin(t)-polynomial(t,n)) <= t**(n+1)/factorial(n+1)); }
close(Math.sqrt(.1),.3162,5e-5); close((.05*factorial(4))**.25,1.047,.0005); close((.05*factorial(6))**(1/6),1.8171,5e-5); close(Math.sin(.1)-.1,-.0001666,5e-8);
console.log("TaylorTheoremWidget: verified");
