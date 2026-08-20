import assert from "node:assert/strict";
const near=(got,want,t=1e-12)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const quotient=h=>((1+h)**2-1)/h; const g=h=>h===0?NaN:quotient(h); for(const h of [-1.5,-.1,.1,1.5])near(quotient(h),2+h); near(quotient(.01),2.01); near(quotient(-.01),1.99); if(!Number.isNaN(g(0)))throw new Error("g(0) muss undefiniert sein");
