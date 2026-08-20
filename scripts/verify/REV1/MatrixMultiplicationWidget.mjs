import assert from "node:assert/strict";
const A=[[1,2],[3,4]], B=[[5,6],[7,8]];
const C=A.map(row => B[0].map((_,j) => row[0]*B[0][j]+row[1]*B[1][j]));
assert.deepEqual(C, [[19,22],[43,50]]); // literals displayed in header and MDX
console.log("MatrixMultiplicationWidget: verified");
