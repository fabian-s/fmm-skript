import assert from "node:assert/strict";
const near=(got,want,t=1e-6)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const integral=(f)=>{const n=2000,h=2/n;let s=f(-1)+f(1);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(-1+i*h);return s*h/3};
const one=t=>1, lin=t=>t, p2=t=>(3*t*t-1)/2, pos=f=>integral(t=>Math.max(f(t),0)), neg=f=>-integral(t=>Math.min(f(t),0));
near(integral(t=>one(t)*one(t)),2); near(integral(t=>lin(t)*lin(t)),2/3); near(integral(t=>p2(t)*p2(t)),2/5);
for(const [a,b] of [[one,lin],[one,p2],[lin,p2]])near(integral(t=>a(t)*b(t)),0);
near(pos(t=>one(t)*lin(t)),.5); near(neg(t=>one(t)*lin(t)),.5); near(pos(t=>one(t)*p2(t)),.384900179); near(neg(t=>one(t)*p2(t)),.384900179);
near(pos(t=>lin(t)*p2(t)),.208333333); near(neg(t=>lin(t)*p2(t)),.208333333);
