import assert from "node:assert/strict";
const near=(got,want,t=1e-10)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const likelihood=(p,h,n)=>p**h*(1-p)**(n-h);
near(7/10,.7); const peak=likelihood(.7,7,10); near(peak,.0022235661,1e-10); near(likelihood(.7,7,10)/peak,1);
for(let h=0;h<=10;h++){const p=h/10;for(let j=0;j<=1000;j++)assert.ok(likelihood(p,h,10)+1e-14>=likelihood(j/1000,h,10));}
