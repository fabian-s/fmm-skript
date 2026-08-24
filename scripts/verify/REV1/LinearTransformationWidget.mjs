import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≠ ${expected} (tol ${tolerance})`);
const det = ([[a,b],[c,d]]) => a * d - b * c;
const singularValues = (A) => {
  const t = A.flat().reduce((s, x) => s + x * x, 0), q = det(A);
  return [Math.sqrt((t + Math.sqrt(t*t - 4*q*q))/2), Math.sqrt((t - Math.sqrt(t*t - 4*q*q))/2)];
};
const rotate = [[.8,-.6],[.6,.8]], shear = [[1,.8],[0,1]], scale = [[1.6,0],[0,.6]], collapse = [[1,.5],[2,1]];
for (const [A, d, s1, s2] of [[rotate,1,1,1],[shear,1,1.477032961426901,0.6770329614269009],[scale,.96,1.6,.6],[collapse,0,2.5,0]]) {
  close(det(A), d); const [x,y] = singularValues(A); close(x,s1); close(y,s2);
}
close(Math.atan2(rotate[1][0],rotate[0][0])*180/Math.PI,36.87,.01); close(rotate[0][0]*rotate[0][1]+rotate[1][0]*rotate[1][1],0);
const apply = (A,[x,y]) => [A[0][0]*x+A[0][1]*y,A[1][0]*x+A[1][1]*y];
assert.deepEqual(apply(shear,[0,0]), [0,0]); assert.deepEqual(apply(shear,[2,2]), [3.6,2]); assert.deepEqual(apply(shear,[1,1]).map(x => 2*x), [3.6,2]);
console.log("LinearTransformationWidget: verified");
