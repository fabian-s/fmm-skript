import assert from "node:assert/strict";
const u=[1,2,3],v=[4,5],M=u.map(x=>v.map(y=>x*y)); assert.deepEqual(M,[[4,5],[8,10],[12,15]]);
assert.deepEqual(M[1], M[0].map(x=>2*x)); assert.deepEqual(M[2],M[0].map(x=>3*x)); assert.deepEqual(M.map(row=>row[1]/row[0]),[1.25,1.25,1.25]);
console.log("OuterProductWidget: verified");
