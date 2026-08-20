import assert from "node:assert/strict";
const near=(got,want,t=1e-6)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const mul=([x,y])=>[x+2*y,.5*x+y]; near(1-1,0); assert.deepEqual(mul([2,-1]),[0,0]); near(Math.atan2(-1,2)*180/Math.PI,-26.565051); near(Math.atan2(-1,2)*180/Math.PI+180,153.434949); near(2-1,1);
