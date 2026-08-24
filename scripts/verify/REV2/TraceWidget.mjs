import assert from "node:assert/strict";
const close = (actual, expected, tolerance = 1e-12) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const invariants = ([[a,b],[c,d]]) => ({trace:a+d, determinant:a*d-b*c, discriminant:(a+d)**2-4*(a*d-b*c)});
let x=invariants([[3,1],[1,3]]); close(x.trace,6); close(x.determinant,8); close((x.trace+Math.sqrt(x.discriminant))/2,4); close((x.trace-Math.sqrt(x.discriminant))/2,2);
x=invariants([[0,-1],[1,0]]); close(x.trace,0); close(x.determinant,1); close(Math.sqrt(-x.discriminant)/2,1);
x=invariants([[2,1],[0,2]]); close(x.trace,4); close(x.determinant,4); close(x.discriminant,0); close(x.trace/2,2);
console.log("TraceWidget: verified");
