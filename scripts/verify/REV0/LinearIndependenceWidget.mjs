import assert from "node:assert/strict";
const near=(got,want,t=1e-6)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const area=([x,y])=>Math.abs(2*y-x); near(area([-1,1.5]),4); near(area([4,2]),0); near(area([1,.5]),0); near(area([3,1]),1); near(Math.hypot(2,1),2.236068); near(area([-1,1.5])/Math.hypot(2,1),1.788854);
