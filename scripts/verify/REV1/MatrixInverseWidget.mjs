import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≠ ${expected}`);
const A = [[2,1],[1,1]], d = A[0][0]*A[1][1]-A[0][1]*A[1][0]; close(d,1);
const inverse = [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];
for (const [actual, expected] of [[inverse[0][0],1],[inverse[0][1],-1],[inverse[1][0],-1],[inverse[1][1],2]]) close(actual,expected);
const product = A.map((row) => inverse[0].map((_,j) => row[0]*inverse[0][j]+row[1]*inverse[1][j]));
for (const [actual, expected] of [[product[0][0],1],[product[0][1],0],[product[1][0],0],[product[1][1],1]]) close(actual,expected);
console.log("MatrixInverseWidget: verified");
