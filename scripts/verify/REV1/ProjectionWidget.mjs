import assert from "node:assert/strict";
const close=(actual,expected,tolerance=1e-4)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);
const project=(theta,[x,y])=>{const c=Math.cos(theta),s=Math.sin(theta),dot=c*x+s*y;return [c*dot,s*dot]};
for(const [theta,expected] of [[.5,[2.1293,1.1633]],[0,[2,0]],[Math.PI/2,[0,1.4]]]) { const p=project(theta,[2,1.4]); close(p[0],expected[0]); close(p[1],expected[1]); const pp=project(theta,p); close(pp[0],p[0],1e-12); close(pp[1],p[1],1e-12); }
const p=project(.5,[2,1.4]), r=[2-p[0],1.4-p[1]]; close(Math.cos(.5)*r[0]+Math.sin(.5)*r[1],0,3.5e-16);
const c=Math.cos(.5), s=Math.sin(.5), P=[[c*c,c*s],[c*s,s*s]];
close(P[0][0]*P[1][1]-P[0][1]*P[1][0],0,1e-12); close(P[0][0]+P[1][1],1,1e-12);
const axisProjection=project(0,[2,3]); close(axisProjection[0],2); close(axisProjection[1],0);
console.log("ProjectionWidget: verified");
