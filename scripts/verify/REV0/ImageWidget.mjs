import assert from "node:assert/strict";
const near=(got,want,t=1e-9)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const mul=([x,y])=>[x+2*y,.5*x+y];
near(1*1-2*.5,0); assert.deepEqual(mul([1,0]),[1,.5]); assert.deepEqual(mul([0,1]),[2,1]); assert.deepEqual(mul([2,-1]),[0,0]);
for(let k=0;k<12566;k++){const v=[1.8*Math.cos(2*Math.PI*k/12566),1.8*Math.sin(2*Math.PI*k/12566)];const [x,y]=mul(v);near(x*.5-y,0)}
