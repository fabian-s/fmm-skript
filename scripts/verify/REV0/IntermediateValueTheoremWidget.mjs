import assert from "node:assert/strict";
const near=(got,want,t=1e-6)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const root=c=>Math.sqrt(2*(1-c));
near(.5*0**2-1,-1); for(const c of [0,.3,.5,.7,1.2])assert.ok(1+c>0); near(.5*1**2-1,-.5);
near(root(0),1.414214); near(root(.3),1.183216); near(root(.5),1); assert.ok(root(.5)>=1); assert.ok(.5+.7>0); assert.ok(.5+1.2>0);
