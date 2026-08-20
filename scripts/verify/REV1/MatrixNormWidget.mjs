import assert from "node:assert/strict";
const close=(actual,expected,tolerance=1e-6)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);
const spectral=(A)=>{const b11=A[0][0]**2+A[1][0]**2,b12=A[0][0]*A[0][1]+A[1][0]*A[1][1],b22=A[0][1]**2+A[1][1]**2;return Math.sqrt((b11+b22+Math.sqrt((b11-b22)**2+4*b12*b12))/2)};
for(const [A,value] of [[[[1,.8],[.2,1.4]],1.775448],[[[2,0],[0,.5]],2],[[[0,-1],[1,0]],1],[[[1,1],[1,1.05]],2.025312]]) close(spectral(A),value);
const A=[[1,.8],[.2,1.4]], v=[.45525237295133436,.8903624413249804], Av=[A[0][0]*v[0]+A[0][1]*v[1],A[1][0]*v[0]+A[1][1]*v[1]];
close(v[0],.4553,5e-5); close(v[1],.8904,5e-5); close(Av[0],1.1675,5e-5); close(Av[1],1.3376,5e-5); close(Math.atan2(v[1],v[0])*180/Math.PI,62.92,.01);
const C=[[1,1],[1,1.05]], c11=2,c12=2.05,c22=2.1025, cv=[c12,(c11+c22+Math.sqrt((c11-c22)**2+4*c12*c12))/2-c11];close(Math.atan2(cv[1],cv[0])*180/Math.PI,45.72,.01);
console.log("MatrixNormWidget: verified");
