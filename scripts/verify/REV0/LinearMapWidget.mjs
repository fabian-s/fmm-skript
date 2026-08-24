import assert from "node:assert/strict";
const near=(got,want,t=1e-9)=>assert.ok(Math.abs(got-want)<=t,`${got} != ${want}`);
const A=[[1,-.5],[.5,1]]; const mul=([x,y])=>[A[0][0]*x+A[0][1]*y,A[1][0]*x+A[1][1]*y]; assert.deepEqual(mul([1,0]),[1,.5]);assert.deepEqual(mul([0,1]),[-.5,1]);near(A[0][0]*A[1][1]-A[0][1]*A[1][0],1.25);
