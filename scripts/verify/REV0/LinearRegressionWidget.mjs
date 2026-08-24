import assert from "node:assert/strict";
const near=(got,want,t=1e-9)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const d=[[-2,-1.4],[-1,-.9],[0,.4],[1,1],[2,2.3]]; const n=d.length, mx=d.reduce((s,[x])=>s+x,0)/n,my=d.reduce((s,[,y])=>s+y,0)/n; const a=d.reduce((s,[x,y])=>s+(x-mx)*(y-my),0)/d.reduce((s,[x])=>s+(x-mx)**2,0),b=my-a*mx,sse=d.reduce((s,[x,y])=>s+(y-a*x-b)**2,0);
near(a,.93);near(b,.28);near(sse,.179);assert.ok(sse<.25);
