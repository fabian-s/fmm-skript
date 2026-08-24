import assert from "node:assert/strict";
const close = (actual, expected, tolerance) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
function polynomial(x,n) { let total=0; for(let k=0;2*k+1<=n;k++) { let fact=1; for(let j=2;j<=2*k+1;j++) fact*=j; total += (k%2?-1:1)*x**(2*k+1)/fact; } return total; }
for (const [n, claim] of [[1,3.142],[3,2.026],[5,.5240],[7,.07522],[9,.006925],[11,.0004452],[13,.00002114]]) close(Math.abs(Math.sin(Math.PI)-polynomial(Math.PI,n)), claim, claim<.001?5e-7:5e-4);
for (const [n, claim] of [[1,6.283],[3,35.06],[5,46.55],[7,30.16],[9,11.90],[11,3.195],[13,.6249]]) close(Math.abs(Math.sin(2*Math.PI)-polynomial(2*Math.PI,n)), claim, claim<1?5e-4:.01);
close(polynomial(.5,3),.479167,5e-7); close(Math.sin(.5),.479426,5e-7);
console.log("TaylorSeriesWidget: verified");
