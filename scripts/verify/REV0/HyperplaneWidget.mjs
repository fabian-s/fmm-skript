import assert from "node:assert/strict";
const near=(got,want,t=1e-6)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const plane=(a1,a2,b)=>({norm:Math.hypot(a1,a2), distance:Math.abs(b)/Math.hypot(a1,a2), foot:[b*a1/(a1*a1+a2*a2),b*a2/(a1*a1+a2*a2)]});
let r=plane(1,1,1); near(r.norm,1.414214); near(r.distance,.707107); near(r.foot[0],.5); near(r.foot[1],.5); near(-1/1,-1); near(1/1,1);
r=plane(1,0,1.5); near(r.distance,1.5); near(1.5/1,1.5);
r=plane(-2,.5,1); near(r.norm,2.061553); near(r.distance,.485071); near(-(-2)/.5,4); near(1/.5,2);
assert.equal(Math.hypot(0,0),0);
