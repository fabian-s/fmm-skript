import{r as F,o as Pn,b as O,j as e,A as Se,S as re,k as Bi,p as _i,F as K,V as ye,g as Z,W as Re,d as Ne,u as $i,s as kn,z as sr,D as Gi,C as A,M as n,E as y,a as _,Q as Ue,i as V,P as tn,n as ne,h as Ge,G as ee,Z as Ri,t as br,v as mr,L as xt,m as pn}from"./index-GbyLwDE5.js";import{E as $e,I as ze}from"./Interaktiv-DHZUUTxv.js";const di=K.blau,gt=K.gruen,Li=K.orange,bt=K.violett,ln="#64748b",Ei=[{id:"wurzel",label:"x² − 2 auf [1, 2]",f:r=>r*r-2,a0:1,b0:2,xd:[.9,2.1],yd:[-1.4,2.4],nullstellen:[Math.SQRT2]},{id:"kubisch",label:"x³ − 3x + 1 auf [−2, 2]",f:r=>r*r*r-3*r+1,a0:-2,b0:2,xd:[-2.2,2.2],yd:[-3.4,3.4],nullstellen:[-1.879385241572,.347296355334,1.532088886238]}],wn=430,an=250,ie={l:40,r:12,t:10,b:26},Ke=(r,i=6)=>Z(r,i),mt={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function dn(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e"),h=String(Number(t)).split("").map(l=>mt[l]??l).join("");return`${i.replace(".",",")}·10${h}`}function jt(r,i){let t=r.a0,h=r.b0;const l=[];for(;h-t>i&&l.length<60;){const d=t+(h-t)/2;l.push({a:t,b:h,m:d}),Math.sign(r.f(t))===Math.sign(r.f(d))?t=d:h=d}return l.push({a:t,b:h,m:null}),l}function ft(){const[r,i]=F.useState("wurzel"),[t,h]=F.useState(6),[l,d]=F.useState(0),s=Ei.find(w=>w.id===r)??Ei[0],o=Math.pow(10,-t),f=F.useMemo(()=>jt(s,o),[s,o]),u=Math.min(l,f.length-1),{a:b,b:S,m:x}=f[u],z=x===null,R=x===null?!1:Math.sign(s.f(b))===Math.sign(s.f(x)),j=w=>ie.l+(w-s.xd[0])/(s.xd[1]-s.xd[0])*(wn-ie.l-ie.r),m=w=>ie.t+(s.yd[1]-w)/(s.yd[1]-s.yd[0])*(an-ie.t-ie.b);let k="";{let E=!1;for(let te=0;te<=360;te++){const ue=s.xd[0]+(s.xd[1]-s.xd[0])*te/360,p=s.f(ue);if(!Number.isFinite(p)||p<s.yd[0]||p>s.yd[1]){E=!1;continue}k+=`${E?"L":"M"}${j(ue).toFixed(1)} ${m(p).toFixed(1)}`,E=!0}}const D=Pn(s.xd[0],s.xd[1]),L=Pn(s.yd[0],s.yd[1]),c=D.length>1?D[1]-D[0]:1,v=L.length>1?L[1]-L[0]:1,W=Math.ceil(Math.log2((s.b0-s.a0)/o)),I=b+(S-b)/2,M=s.nullstellen.reduce((w,E)=>Math.abs(E-I)<Math.abs(w-I)?E:w,s.nullstellen[0]);let g="neutral",q=`Klammer nach ${u} ${u===1?"Halbierung":"Halbierungen"}`,U;if(z)g="ok",q="am Ziel",U=`Fertig nach ${f.length-1} Halbierungen. ${O("satz:schrittzahl-der-bisektion")} hatte ⌈log₂((b − a)/ε)⌉ = ${W} vorhergesagt, und das ist keine Schätzung, sondern die exakte Zahl. Zurück geben wir die Mitte ${Ke(I)} des Endintervalls, dessen Länge ${dn(S-b)} unter ε = ${dn(o)} liegt. Garantiert ist damit ein Fehler von höchstens ${dn((S-b)/2)}; tatsächlich sind es ${dn(Math.abs(I-M))} bis zur Nullstelle ${Ke(M)}.`;else if(s.id==="kubisch"&&u===0)g="warn",q="drei Nullstellen, eine Klammer",U="Das Startintervall [−2, 2] enthält drei Nullstellen: −1,879385, 0,347296 und 1,532089. Der Vorzeichenwechsel zwischen f(−2) = −1 und f(2) = 3 sagt nur, dass mindestens eine darin liegt. Welche das Verfahren findet, entscheidet der erste Test: Weil f(0) = 1 dasselbe Vorzeichen hat wie f(2), verwerfen wir die rechte Hälfte samt zwei Nullstellen und laufen gegen die linke.";else{const w=x;U=`Die Vorzeichenprobe an der Stelle m = ${Ke(w)} entscheidet Schritt ${u+1}. Dort ist f(m) = ${Ke(s.f(w))}, am linken Rand f(a) = ${Ke(s.f(b))}: ${R?"kein Wechsel zwischen a und m, der Wechsel muss also rechts von m sitzen":"zwischen a und m liegt der Wechsel"}. Wir werfen die ${R?"linke":"rechte"} Hälfte weg und setzen ${R?"a ← m":"b ← m"}. Übrig bleibt eine Klammer der Länge ${dn((S-b)/2)}, und wo immer die Nullstelle darin steckt, von deren Mitte ist sie höchstens ${dn((S-b)/4)} entfernt.`}const C=w=>w?Re:Ne,P=f.slice(0,u+1);return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(Se,{children:["Schieben wir den Schrittregler durch und vergleichen die gebrauchte Zahl der Halbierungen mit der Vorhersage von ",O("satz:schrittzahl-der-bisektion"),"."]}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Violett der Graph von f, blau die aktuelle Klammer [a, b] auf der x-Achse, orange der Mittelpunkt m, den dieser Schritt prüft, grün die Nullstellen. Ein Schritt ist genau ein Durchlauf der Schleife aus ",O("algorithmus:bisektionsverfahren"),"."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Ei.map(w=>e.jsxs("button",{type:"button",className:C(w.id===r),onClick:()=>{i(w.id),d(0)},children:["f(x) = ",w.label]},w.id))}),e.jsx(re,{label:"Toleranz ε",value:t,onChange:w=>{h(Math.round(w)),d(0)},min:1,max:10,step:1,fmt:w=>`10^−${Math.round(w)}`}),e.jsx(Bi,{step:u,setStep:d,max:f.length-1,narration:z?`Endintervall [${Ke(b,8)}; ${Ke(S,8)}]`:`Prüfpunkt m = ${Ke(x,6)}`}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{width:wn,height:an,viewBox:`0 0 ${wn} ${an}`,role:"img","aria-label":`Der Graph von f mit der Klammer [a, b] nach ${u} Halbierungen und dem gerade geprüften Mittelpunkt.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:ie.l,y:ie.t,width:wn-ie.l-ie.r,height:an-ie.t-ie.b,fill:"none",stroke:"#cbd5e1",strokeWidth:.8}),D.map(w=>e.jsxs("g",{children:[e.jsx("line",{x1:j(w),x2:j(w),y1:an-ie.b,y2:an-ie.b+3,stroke:ln}),e.jsx("text",{x:j(w),y:an-ie.b+14,textAnchor:"middle",fontSize:9,fill:ln,children:_i(w,c)})]},`x${w}`)),L.map(w=>e.jsxs("g",{children:[e.jsx("line",{x1:ie.l-3,x2:ie.l,y1:m(w),y2:m(w),stroke:ln}),e.jsx("text",{x:ie.l-5,y:m(w)+3,textAnchor:"end",fontSize:9,fill:ln,children:_i(w,v)})]},`y${w}`)),e.jsx("line",{x1:ie.l,x2:wn-ie.r,y1:m(0),y2:m(0),stroke:ln,strokeWidth:1}),e.jsx("text",{x:wn-ie.r-4,y:m(0)-5,textAnchor:"end",fontSize:10,fill:ln,children:"x"}),e.jsx("text",{x:ie.l+3,y:ie.t+10,fontSize:10,fill:ln,children:"f(x)"}),e.jsx("path",{d:k,fill:"none",stroke:bt,strokeWidth:1.8}),s.nullstellen.map(w=>e.jsx("circle",{cx:j(w),cy:m(0),r:4.5,fill:"none",stroke:gt,strokeWidth:2},w)),e.jsx("line",{x1:j(b),x2:j(S),y1:m(0),y2:m(0),stroke:di,strokeWidth:5,opacity:.55}),[b,S].map((w,E)=>e.jsxs("g",{children:[e.jsx("line",{x1:j(w),x2:j(w),y1:m(0),y2:m(s.f(w)),stroke:di,strokeDasharray:"3 3",strokeWidth:1}),e.jsx("circle",{cx:j(w),cy:m(s.f(w)),r:3.5,fill:di}),e.jsx("text",{x:j(w),y:m(0)+16,textAnchor:"middle",fontSize:11,fill:di,children:E===0?"a":"b"})]},`e${E}`)),x!==null&&e.jsxs("g",{children:[e.jsx("line",{x1:j(x),x2:j(x),y1:m(0),y2:m(s.f(x)),stroke:Li,strokeWidth:1.4}),e.jsx("circle",{cx:j(x),cy:m(s.f(x)),r:4,fill:Li}),e.jsx("text",{x:j(x),y:m(0)-8,textAnchor:"middle",fontSize:11,fill:Li,children:"m"})]})]}),e.jsxs("div",{className:"min-w-56 grow",children:[e.jsx("p",{className:"mb-1 text-xs text-slate-600 dark:text-slate-400",children:"Intervall-Verlauf (jede Zeile ein Schritt)"}),e.jsx("div",{className:"max-h-56 overflow-y-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"sticky top-0 bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsx("th",{className:"px-2 py-1",children:"k"}),e.jsx("th",{className:"px-2 py-1",children:"a"}),e.jsx("th",{className:"px-2 py-1",children:"b"}),e.jsx("th",{className:"px-2 py-1",children:"b − a"})]})}),e.jsx("tbody",{children:P.map((w,E)=>e.jsxs("tr",{className:E===P.length-1?"font-semibold":"",children:[e.jsx("td",{className:"px-2 py-0.5",children:E}),e.jsx("td",{className:"px-2 py-0.5",children:Ke(w.a)}),e.jsx("td",{className:"px-2 py-0.5",children:Ke(w.b)}),e.jsx("td",{className:"px-2 py-0.5",children:dn(w.b-w.a)})]},E))})]})})]})]}),e.jsx(ye,{kind:g,titel:q,children:U})]})}const Tn=K.blau,kt=K.gruen,pr=K.orange,wr=K.rot,pt=K.violett,vn="#64748b",wt="⁰¹²³⁴⁵⁶⁷⁸⁹";function dt(r){const i=String(Math.abs(r)).split("").map(t=>wt[Number(t)]).join("");return`10${r<0?"⁻":""}${i}`}const je=(r,i=6)=>{if(Number.isFinite(r)&&Math.abs(r)>=1e5){const[t,h]=r.toExponential(2).split("e");return`${t.replace(".",",").replace(/^-/,"−")}·${dt(Number(h))}`}return Z(r,i)},Ki=r=>{if(!Number.isFinite(r))return"∞";if(r===0)return"0";if(Math.abs(r)>=.001&&Math.abs(r)<1e5)return Z(r,4);const[i,t]=r.toExponential(3).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·${dt(Number(t))}`},qi=[{id:"wurzel",label:"x² − 2",formel:"f(x) = x² − 2, f′(x) = 2x",f:r=>r*r-2,df:r=>2*r,xd:[.2,3.4],yd:[-2.4,9.8],start:3,nullstellen:[Math.SQRT2],flach:[]},{id:"kubisch",label:"x³ − 3x + 1",formel:"f(x) = x³ − 3x + 1, f′(x) = 3x² − 3",f:r=>r**3-3*r+1,df:r=>3*r*r-3,xd:[-2.4,2.9],yd:[-4.5,6.5],start:1.05,nullstellen:[-1.879385241572,.347296355334,1.532088886238],flach:[-1,1]},{id:"arctan",label:"arctan x",formel:"f(x) = arctan x, f′(x) = 1/(1 + x²)",f:Math.atan,df:r=>1/(1+r*r),xd:[-6,6],yd:[-1.8,1.8],start:1.5,nullstellen:[0],flach:[]}],vr=1.3917452,Xe=440,Ze=270,Be=42,zn=12,hn=10,cn=26,vt=8;function zt(){const[r,i]=F.useState("wurzel"),t=qi.find(p=>p.id===r)??qi[0],[h,l]=F.useState(t.start),[d,s]=F.useState(0),o=p=>Be+(p-t.xd[0])/(t.xd[1]-t.xd[0])*(Xe-Be-zn),f=p=>hn+(t.yd[1]-p)/(t.yd[1]-t.yd[0])*(Ze-hn-cn),u=p=>p>=t.xd[0]&&p<=t.xd[1],b=p=>kn(p,t.xd[0],t.xd[1]),S=p=>kn(p,t.yd[0],t.yd[1]),x=F.useMemo(()=>{const p=[h];for(let B=0;B<vt;B++){const X=p[p.length-1],$=t.df(X);if(!Number.isFinite($)||Math.abs($)<1e-13)break;const a=X-t.f(X)/$;if(!Number.isFinite(a)||Math.abs(a)>1e12){p.push(a);break}p.push(a)}return p},[t,h]),z=Math.min(d,x.length-1),R=x[z],j=t.f(R),m=t.df(R),k=Math.abs(m)>1e-13?R-j/m:NaN,D=$i({feld:{x0:Be,y0:hn,w:Xe-Be-zn,h:Ze-hn-cn},welt:{x0:t.xd[0],x1:t.xd[1],y0:t.yd[0],y1:t.yd[1]},clamp:([p])=>[kn(p,t.xd[0],t.xd[1]),0],snap:[.05,0],greifPosition:()=>[h,0],onDrag:([p])=>{l(Math.round(p*20)/20),s(0)}}),L=F.useMemo(()=>{let p="",B=!1;for(let X=0;X<=400;X++){const $=t.xd[0]+(t.xd[1]-t.xd[0])*X/400,a=t.f($);if(!Number.isFinite(a)||a<t.yd[0]||a>t.yd[1]){B=!1;continue}p+=`${B?"L":"M"}${o($).toFixed(1)} ${f(a).toFixed(1)}`,B=!0}return p},[t]),c=Pn(t.xd[0],t.xd[1]),v=Pn(t.yd[0],t.yd[1]),W=c.length>1?c[1]-c[0]:1,I=v.length>1?v[1]-v[0]:1,M=x[x.length-1],g=t.nullstellen.reduce((p,B)=>Math.abs(B-M)<Math.abs(p-M)?B:p,t.nullstellen[0]),q=x.map(p=>Math.abs(p-g)),U=!Number.isFinite(M)||Math.abs(M-g)>1,C=Math.abs(k-R);let P,w,E;Math.abs(m)<1e-13?(P="fail",w="die Tangente ist waagerecht",E=`An dieser Stelle ist f′ = 0, die Tangente schneidet die x-Achse also nirgends, und ${O("algorithmus:newton-raphson-verfahren-fuer")} lässt sich nicht ausführen. Genau diese Voraussetzung steht dort in der Bedingung „solange f′(x⁽ᵏ⁾) ≠ 0".`):t.id==="arctan"&&Math.abs(h)>vr?(P="fail",w="die Folge läuft auseinander",E=`Bei arctan flacht die Kurve nach außen ab, die Tangente wird also immer flacher und ihr Schnittpunkt mit der Achse immer weiter entfernt. Ab |x⁽⁰⁾| > ${je(vr,4)} überholt jeder Schritt den vorigen: Aus ${je(h,2)} wird ${je(x[1]??NaN,4)}, dann ${je(x[2]??NaN,4)}, und die Beträge wachsen. Es gibt hier nur EINE Nullstelle, und trotzdem findet Newton sie nicht, genau die Warnung von ${O("bemerkung:quadratische-konvergenz")}: Die quadratische Konvergenz ist eine LOKALE Aussage.`):z===0&&C>.35*(t.xd[1]-t.xd[0])&&Math.abs(m)<1?(P="warn",w="ein sehr weiter erster Schritt",E=`Am Startpunkt ist f′ = ${je(m,4)} und damit betragsmäßig klein: Die Tangente liegt fast waagerecht, und ihr Schnittpunkt mit der Achse rutscht weit weg. Der erste Schritt landet bei ${je(k,4)}, also ${je(C,3)} vom Start entfernt. Die Iteration erholt sich hier zwar, aber die Richtung, in die sie zuerst springt, hat mit der nächstgelegenen Nullstelle nichts zu tun.`):U?(P="fail",w="davongelaufen",E=`Die Iterierten wachsen über jede Schranke; nach ${x.length-1} Schritten steht die Folge bei ${je(M,2)}. Newton hat keine Abstiegsgarantie wie die Bisektion, sondern nur eine lokale Aussage.`):q[z]<1e-10?(P="ok",w=`am Ziel nach ${z} Schritten`,E=`Die Iteration steht auf der Nullstelle ${je(g)}. Die Fehlerspalte zeigt, was ${O("bemerkung:quadratische-konvergenz")} mit quadratischer Konvergenz meint: Der Quotient e_{k+1}/e_k² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Bei f(x) = x² − 2 läuft dieser Quotient gegen f″/(2f′) = 0,3536. Zum Vergleich: Die Bisektion aus ${O("satz:schrittzahl-der-bisektion")} gewinnt pro Schritt ein Bit, also rund 0,3 Dezimalstellen.`):(P="neutral",w=`Schritt ${z} von ${x.length-1}`,E=`Die Tangente im Punkt (${je(R,4)}; ${je(j,4)}) hat die Steigung ${je(m,4)} und trifft die x-Achse bei ${je(k,6)}. Das ist die nächste Iterierte, und der Bruch in (${sr("eq:newton-raphson-verfahren-fuer")}) sagt dasselbe in Zahlen: Wir teilen die abzubauende Höhe durch die Rate, mit der die Tangente sie abbaut. Der Abstand zur Nullstelle ${je(g)} beträgt gerade ${Ki(q[z])}.`);const te=p=>p?Re:Ne,ue=x.slice(0,z+1).map((p,B)=>({i:B,v:p,fv:t.f(p),e:q[B]}));return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Ziehen wir den Startpunkt auf der x-Achse und schauen, wohin der erste Schritt springt."}),e.jsx("div",{className:"flex flex-wrap gap-2 text-sm",children:qi.map(p=>e.jsxs("button",{type:"button","aria-pressed":p.id===r,className:te(p.id===r),onClick:()=>{i(p.id),l(p.start),s(0)},children:["f(x) = ",p.label]},p.id))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 max-w-full",children:e.jsxs("svg",{viewBox:`0 0 ${Xe} ${Ze}`,width:Xe,height:Ze,role:"img","aria-label":`Der Graph von ${t.formel} mit der Tangente im Punkt x⁽${z}⁾ = ${je(R,3)} und ihrem Schnittpunkt mit der x-Achse.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",...D.svgProps,children:[e.jsx("rect",{x:Be,y:hn,width:Xe-Be-zn,height:Ze-hn-cn,fill:"none",stroke:"#cbd5e1",strokeWidth:.8}),c.map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:o(p),x2:o(p),y1:Ze-cn,y2:Ze-cn+3,stroke:vn}),e.jsx("text",{x:o(p),y:Ze-cn+14,textAnchor:"middle",fontSize:9,fill:vn,children:_i(p,W)})]},`x${p}`)),v.map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:Be-3,x2:Be,y1:f(p),y2:f(p),stroke:vn}),e.jsx("text",{x:Be-5,y:f(p)+3,textAnchor:"end",fontSize:9,fill:vn,children:_i(p,I)})]},`y${p}`)),e.jsx("line",{x1:Be,x2:Xe-zn,y1:f(0),y2:f(0),stroke:vn,strokeWidth:1}),e.jsx("text",{x:Xe-zn-4,y:f(0)-5,textAnchor:"end",fontSize:10,fill:vn,children:"x"}),e.jsx("path",{d:L,fill:"none",stroke:pt,strokeWidth:1.9}),t.nullstellen.filter(u).map(p=>e.jsx("circle",{cx:o(p),cy:f(0),r:4.5,fill:"none",stroke:kt,strokeWidth:2},p)),t.flach.filter(u).map(p=>e.jsx("line",{x1:o(p),x2:o(p),y1:hn,y2:Ze-cn,stroke:wr,strokeWidth:1,strokeDasharray:"3 4",opacity:.6},`fl${p}`)),x.slice(0,z+1).map((p,B)=>e.jsx("circle",{cx:o(b(p)),cy:f(0),r:B===z?4.5:2.6,fill:Tn,opacity:B===z?1:.5},`p${B}`)),Number.isFinite(m)&&Math.abs(m)>1e-13&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:o(t.xd[0]),y1:f(S(j+m*(t.xd[0]-R))),x2:o(t.xd[1]),y2:f(S(j+m*(t.xd[1]-R))),stroke:pr,strokeWidth:1.6}),e.jsx("line",{x1:o(b(R)),y1:f(S(j)),x2:o(b(R)),y2:f(0),stroke:Tn,strokeWidth:.9,strokeDasharray:"2 3"}),e.jsx("circle",{cx:o(b(R)),cy:f(S(j)),r:3.5,fill:Tn}),u(k)&&e.jsx("circle",{cx:o(k),cy:f(0),r:4,fill:"none",stroke:pr,strokeWidth:2}),!u(k)&&e.jsxs("text",{x:k>t.xd[1]?Xe-zn-4:Be+4,y:f(0)-8,textAnchor:k>t.xd[1]?"end":"start",fontSize:10,fill:wr,children:["nächste Iterierte außerhalb (",je(k,2),")"]})]}),e.jsx(Gi,{x:o(b(h)),y:f(0),farbe:Tn,r:5,aktiv:D.dragging==="x0",...D.handleProps("x0")})]})}),e.jsxs("div",{className:"min-w-56 grow space-y-2",children:[e.jsx(re,{label:"Startwert x⁽⁰⁾",value:h,onChange:p=>{l(Math.round(p*20)/20),s(0)},min:t.xd[0],max:t.xd[1],step:.05,accent:Tn}),e.jsx(Bi,{step:z,setStep:s,max:x.length-1,narration:`x⁽${z}⁾ = ${je(R,8)}`}),e.jsx("p",{className:"font-mono text-xs",children:t.formel}),e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left",children:"k"}),e.jsx("th",{className:"pr-2",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-2",children:"f(x⁽ᵏ⁾)"}),e.jsx("th",{children:"|x⁽ᵏ⁾ − x*|"})]})}),e.jsx("tbody",{children:ue.map(p=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-left",children:p.i}),e.jsx("td",{className:"pr-2",children:je(p.v,8)}),e.jsx("td",{className:"pr-2",children:Ki(Math.abs(p.fv))}),e.jsx("td",{children:Ki(p.e)})]},p.i))})]})]})]}),e.jsx(ye,{kind:P,titel:w,children:E})]})}const zr=K.blau,St=K.gruen,hi="#94a3b8",Wi=[{id:"gutartig",label:"A = (4 1; 1 3)",A:[[4,1],[1,3]],x0:[1.7,.6],gammaOpt:2/7,rhoOpt:Math.sqrt(5)/7,gammaMax:2/((7+Math.sqrt(5))/2),kurz:"symmetrisch, Eigenwerte 4,618 und 2,382"},{id:"drehung",label:"A = (1 −2; 2 1)",A:[[1,-2],[2,1]],x0:[1.7,.6],gammaOpt:.2,rhoOpt:2/Math.sqrt(5),gammaMax:.4,kurz:"komplexe Eigenwerte 1 ± 2i, also ein Drehanteil"},{id:"kondition",label:"A = diag(1, 10)",A:[[1,0],[0,10]],x0:[1.8,1.4],gammaOpt:2/11,rhoOpt:9/11,gammaMax:.2,kurz:"Eigenwerte 1 und 10, Kondition 10"}],yt=30,de=290,Sn=2.4;function Mt(r){const i=r[0][0]**2+r[1][0]**2,t=r[0][0]*r[0][1]+r[1][0]*r[1][1],h=r[0][1]**2+r[1][1]**2,l=i+h,d=i*h-t*t;return Math.sqrt(l/2+Math.sqrt(Math.max(0,l*l/4-d)))}const Y=(r,i=3)=>Z(r,i),Dt={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function On(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e"),h=String(Number(t)).split("").map(l=>Dt[l]??l).join("");return`${i.replace(".",",")}·10${h}`}function Nt(){const[r,i]=F.useState("gutartig"),[t,h]=F.useState(.25),l=Wi.find(c=>c.id===r)??Wi[0],d=l.A,s=[[1-t*d[0][0],-t*d[0][1]],[-t*d[1][0],1-t*d[1][1]]],o=Mt(s),f=[l.x0];for(let c=0;c<yt;c++){const[v,W]=f[f.length-1],I=s[0][0]*v+s[0][1]*W,M=s[1][0]*v+s[1][1]*W;if(!Number.isFinite(I)||!Number.isFinite(M))break;f.push([I,M])}const u=f[f.length-1],b=Math.hypot(u[0],u[1]),S=Math.hypot(l.x0[0],l.x0[1]),x=f.length-1,z=c=>(Math.max(-Sn,Math.min(Sn,c))+Sn)/(2*Sn)*de;let R="";f.forEach((c,v)=>{R+=`${v===0?"M":"L"}${z(c[0]).toFixed(1)} ${(de-z(c[1])).toFixed(1)}`});const j=f.some(c=>Math.abs(c[0])>Sn||Math.abs(c[1])>Sn);let m,k,D;if(o>=1){m="fail",k="ρ ≥ 1: die Schranke trägt nicht mehr";const c=b>1.001*S;D=`ρ = ${Y(o)} ist nicht kleiner als 1, damit sagt ${O("satz:konvergenzrate-der-fixpunktiteration")} nichts mehr zu. Nach ${x} Schritten steht der Abstand zum Fixpunkt bei ${On(b)}, gestartet sind wir bei ${Y(S)}. `+(c?"Der Fehler wächst also, und der Zuwachs pro Schritt nähert sich dem Faktor ρ. ":"Gewachsen ist er nicht: Bei ρ = 1 hält die Iteration den Fehler in mindestens einer Richtung genau fest, und weiter als bis dorthin kommt sie nicht. ")+`Zusammen läuft die Iteration nur für γ < ${Y(l.gammaMax)}.`}else Math.abs(t-l.gammaOpt)<.011&&o<=1.05*l.rhoOpt?(m="ok",k="nahe der besten Schrittweite",D=`Das ist ungefähr die beste Schrittweite für dieses System: ρ = ${Y(o)} liegt höchstens fünf Prozent über dem erreichbaren Minimum ${Y(l.rhoOpt)}, das bei γ* ≈ ${Y(l.gammaOpt)} steht. Nach ${x} Schritten ist der Abstand von ${Y(S)} auf ${On(b)} gefallen. Weiter weg von γ* wird es in beide Richtungen schlechter, nach links wegen zu kleiner Schritte, nach rechts wegen des Überschießens.`):t<l.gammaOpt?(m="neutral",k="γ zu klein",D=`ρ = ${Y(o)} < 1, die Folge läuft also zusammen, aber gemächlich: Nach ${x} Schritten steht der Abstand bei ${On(b)}, gestartet sind wir bei ${Y(S)}. Jeder Schritt korrigiert nur einen Bruchteil γ des Residuums; das ist der Fall „γ zu klein“. Bis γ ≈ ${Y(l.gammaOpt)} lohnt sich jedes Stück nach rechts.`):(m="warn",k="γ über der besten Wahl",D=`γ liegt bereits über der besten Wahl γ* ≈ ${Y(l.gammaOpt)}, und das kostet: ρ ist mit ${Y(o)} wieder größer als das erreichbare Minimum ${Y(l.rhoOpt)}. Die Folge läuft noch zusammen, nach ${x} Schritten steht der Abstand bei ${On(b)}. Jenseits von γ = ${Y(l.gammaMax)} kippt sie ganz.`);const L=c=>c?Re:Ne;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Schieben wir γ für jedes der drei Systeme nach oben, bis die Spirale nach außen läuft."}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Blau der Weg der ersten 30 Schritte, grün der Fixpunkt x* = 0. Alle drei A sind affin, also ist ρ = ‖I − γA‖₂ nach dem affinen Fall im Beweis von ",O("satz:konvergenzrate-der-fixpunktiteration")," eine echte Schranke ohne Restterm."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Wi.map(c=>e.jsx("button",{type:"button",className:L(c.id===r),onClick:()=>i(c.id),children:c.label},c.id))}),e.jsx(re,{label:"γ",value:t,onChange:h,min:.01,max:.6,step:.01,fmt:c=>Y(c,2)}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{width:de,height:de,viewBox:`0 0 ${de} ${de}`,role:"img","aria-label":`Der Weg der Fixpunktiteration für ${l.label} bei γ = ${Y(t,2)}; ρ = ${Y(o)}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:0,y1:de/2,x2:de,y2:de/2,stroke:hi,strokeWidth:.8}),e.jsx("line",{x1:de/2,y1:0,x2:de/2,y2:de,stroke:hi,strokeWidth:.8}),[-2,-1,1,2].map(c=>e.jsxs("g",{children:[e.jsx("text",{x:z(c),y:de/2+12,fontSize:9,fill:hi,textAnchor:"middle",children:Z(c,0)}),e.jsx("text",{x:de/2+5,y:de-z(c)+3,fontSize:9,fill:hi,children:Z(c,0)})]},`t${c}`)),e.jsx("text",{x:de-6,y:de/2-6,fontSize:10,fill:"#64748b",textAnchor:"end",children:"x₁"}),e.jsx("text",{x:de/2+6,y:12,fontSize:10,fill:"#64748b",children:"x₂"}),e.jsx("path",{d:R,fill:"none",stroke:zr,strokeWidth:1.3,opacity:.75}),f.map((c,v)=>e.jsx("circle",{cx:z(c[0]),cy:de-z(c[1]),r:v===0?4.5:2.6,fill:zr,opacity:Math.max(.25,1-v*.025)},v)),e.jsx("circle",{cx:de/2,cy:de/2,r:5,fill:"none",stroke:St,strokeWidth:2.2})]}),e.jsxs("div",{className:"min-w-56 grow space-y-1 text-sm",children:[e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:l.kurz}),e.jsxs("p",{className:"font-mono text-xs",children:["I − γA = (",Y(s[0][0],2)," ",Y(s[0][1],2),"; ",Y(s[1][0],2)," ",Y(s[1][1],2),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["ρ = ‖I − γA‖₂ = ",Y(o)]}),e.jsxs("p",{className:"font-mono text-xs",children:["‖x⁽⁰⁾ − x*‖ = ",Y(S)," · nach ",x," Schritten ",On(b)]}),e.jsxs("p",{className:"font-mono text-xs",children:["bestes γ ≈ ",Y(l.gammaOpt)," · Divergenz ab γ > ",Y(l.gammaMax)]}),j&&e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:"Ein Teil des Weges liegt außerhalb des gezeigten Fensters [−2,4; 2,4]²; diese Punkte sind an den Rand gelegt."})]})]}),e.jsx(ye,{kind:m,titel:k,children:D})]})}function Sr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Was wir mitbringen"}),`
`,e.jsxs(i.p,{children:["Der zweite Block des Skripts, ",e.jsx(i.em,{children:"Analysis und Optimierung"}),`, läuft auf dieses Kapitel
zu. Alles, was wir dafür brauchen, steht schon da, und es lohnt sich, es kurz
nebeneinanderzulegen.`]}),`
`,e.jsxs(i.p,{children:["Aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),` kommt der
`,e.jsx(A,{id:"gradient",children:"Gradient"})," ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}"}),` einer Funktion
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`. Wo er nicht verschwindet, zeigt er in die Richtung des
steilsten Anstiegs, genauer gesagt tut das sein Transponiertes, denn in der
Konvention dieses Skripts ist der Gradient ein Zeilenvektor, eine Richtung im
`,e.jsx(n,{children:"\\R^n"}),` dagegen eine Spalte. Die Voraussetzung
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"})," von ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),` ist hier wichtig: In
einem kritischen Punkt gibt es keine ausgezeichnete Anstiegsrichtung mehr, und
kritische Punkte sind im Rest des Kapitels unser Ziel. Aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),` kommt die
`,e.jsx(A,{id:"hessian-matrix",children:"Hesse-Matrix"})," ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),` der zweiten
Ableitungen, die die Krümmung misst. Und aus
`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.3",children:"Kapitel 11"}),` kommt die Konvexität von Mengen und
Funktionen, die später darüber entscheidet, ob ein gefundenes Minimum auch das
globale ist.`]}),`
`,e.jsxs(i.p,{children:["Dazu zwei Bausteine aus der Grundvorlesung. ",e.jsx(i.em,{children:"Notwendig"}),` für ein Extremum einer
differenzierbaren Funktion in einem inneren Punkt des Definitionsbereichs ist
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} = 0"}),` beziehungsweise
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),". ",e.jsx(i.em,{children:"Hinreichend"}),` für ein Minimum ist
das zusammen mit `,e.jsx(n,{children:"\\corange{f''(x^\\star)} > 0"}),`, im Mehrdimensionalen mit einer
`,e.jsx(A,{id:"positive-definite",children:"positiv definiten"}),` Hesse-Matrix. Beide Teile werden
gebraucht: Ohne die notwendige Bedingung daneben sagt die Krümmungsbedingung
nichts, denn eine positive Krümmung allein macht aus einem beliebigen Punkt kein
Minimum.`]}),`
`,e.jsxs(i.p,{children:["Der Farbcode dieses Kapitels: blau die Iterierten ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),` und die
Wege, die sie zurücklegen, grün das Ziel `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, orange die
Ableitungsobjekte und die aus ihnen gebauten Schritte, rot die Nebenbedingungen
und die Warnzeichen für Divergenz.`]}),`
`,e.jsx(i.h3,{children:"Drei Sorten von Problemen"}),`
`,e.jsx(i.p,{children:`Der Rest des Kapitels behandelt drei Fragestellungen, die enger zusammengehören,
als sie zunächst aussehen.`}),`
`,e.jsxs(y,{kind:"Definition",label:"12.1.1 (Nichtlineares Gleichungssystem)",id:"env-nichtlineares-gleichungssystem",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),". Ein ",e.jsx(i.em,{children:"nichtlineares Gleichungssystem"}),` ist die
Aufgabe, ein `,e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in \\R^n"})," zu finden mit"]}),e.jsx(_,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = m = 1"})," sprechen wir von einer ",e.jsx(i.em,{children:"Nullstelle"})," (root) von ",e.jsx(n,{children:"f"}),"."]})]}),`
`,e.jsxs(i.p,{children:['Der Zusatz „nichtlinear" grenzt gegen ',e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"})," ab: Ist ",e.jsx(n,{children:"f"}),`
affin, also `,e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"}),`, so ist das ein
`,e.jsx(A,{id:"linear-system",children:"lineares Gleichungssystem"}),`, und dafür haben wir fertige
Zerlegungen. Sobald `,e.jsx(n,{children:"f"}),` krumm ist, gibt es keine Formel mehr, die uns die Lösung
in endlich vielen Schritten hinstellt.`]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.1.2 (Unbeschränktes und beschränktes Optimierungsproblem)",id:"env-unbeschraenktes-und-beschraenktes",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),". Ein ",e.jsx(i.em,{children:"unbeschränktes Optimierungsproblem"}),`
(unconstrained optimization) ist die Aufgabe`]}),e.jsx(_,{children:`\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\R^n} \\cblue{f(\\bx)}
\\qquad \\text{beziehungsweise} \\qquad
\\cgreen{\\bx^\\star} \\in \\argmax_{\\bx \\in \\R^n} \\cblue{f(\\bx)} .`}),e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"beschränktes Optimierungsproblem"}),` (constrained optimization) schränkt die
Suche auf eine Menge `,e.jsx(n,{children:"\\cred{S} \\subseteq \\R^n"})," ein,"]}),e.jsx(_,{children:"\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\cred{S}} \\cblue{f(\\bx)} ,"}),e.jsxs(i.p,{children:["wobei die ",e.jsx(i.em,{children:"Nebenbedingungen"}),` typischerweise selbst durch Funktionen beschrieben
werden:`]}),e.jsx(_,{children:`\\cred{S} = \\{\\bx \\in \\R^n \\colon \\cred{g_i(\\bx)} = 0,\\ i = 1, \\dots, m\\}
\\qquad \\text{oder} \\qquad
\\cred{S} = \\{\\bx \\in \\R^n \\colon \\cred{h_j(\\bx)} \\le 0,\\ j = 1, \\dots, p\\}`}),e.jsxs(i.p,{children:["oder eine Kombination aus beidem. Die Funktion ",e.jsx(n,{children:"\\cblue{f}"}),` heißt
`,e.jsx(A,{id:"objective-function",children:"Zielfunktion"}),"."]}),e.jsxs(i.p,{children:["„Beschränkt“ bedeutet hier ",e.jsx(i.em,{children:"mit Nebenbedingungen"})," und nicht, dass ",e.jsx(n,{children:"S"}),` eine
beschränkte Menge sein muss. Eindeutiger ist deshalb auch die Bezeichnung
`,e.jsx(i.em,{children:"Optimierung mit Nebenbedingungen"}),"."]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.3 (Zwei Probleme, ein Werkzeugkasten)",id:"env-zwei-probleme-ein-werkzeugkasten",children:[e.jsxs(i.p,{children:[`Maximieren und Minimieren sind dieselbe Aufgabe, denn
`,e.jsx(n,{children:"\\argmax_{\\bx} \\cblue{f(\\bx)} = \\argmin_{\\bx} \\bigl(-\\cblue{f(\\bx)}\\bigr)"}),`. Wir
reden deshalb ab jetzt nur noch über Minima.`]}),e.jsxs(i.p,{children:["Wichtiger ist der zweite Zusammenhang. Ist ",e.jsx(n,{children:"\\cblue{f}"}),` differenzierbar, so muss
im Minimum eines `,e.jsx(i.em,{children:"unbeschränkten"}),` Problems
`,e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})} = \\bnull^\\top"}),` gelten; welche Bedingung
an die Stelle tritt, sobald Nebenbedingungen im Spiel sind, klärt
`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),`.
Das ist ein nichtlineares Gleichungssystem für die Funktion
`,e.jsx(n,{children:"\\bx \\mapsto \\corange{\\nabla f(\\bx)}^\\top"})," von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^n"}),`. Wer Nullstellen
suchen kann, kann also auch kritische Punkte suchen, und umgekehrt taucht jedes
Verfahren dieses Abschnitts im Rest des Kapitels wieder auf. Deshalb steht die
Nullstellensuche am Anfang.`]}),e.jsxs(i.p,{children:["Alle drei Probleme lösen wir ",e.jsx(i.em,{children:"iterativ"}),`: Wir starten irgendwo und bauen eine
Folge `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}, \\cblue{\\bx^{(1)}}, \\cblue{\\bx^{(2)}}, \\dots"}),`, die
hoffentlich gegen `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` läuft. Dieselbe Bauform kennen wir schon
von der `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.1",children:"Potenzmethode"}),` und den
`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Splitting-Verfahren"})," aus Kapitel 8."]})]}),`
`,e.jsx(i.h3,{children:"Warum Optimierung?"}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.1.4 (Optimierungsprobleme in Statistik und maschinellem Lernen)",id:"env-optimierungsprobleme-in-statistik-und",children:[e.jsx(i.p,{children:"Ein erstaunlich großer Teil beider Fächer besteht daraus, ein Minimum zu suchen."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Maximum-Likelihood-Schätzung."}),` Für unabhängige, identisch verteilte
Beobachtungen `,e.jsx(n,{children:"y_1, \\dots, y_n"})," mit Dichte ",e.jsx(n,{children:"f_Y(y \\mid \\btheta)"}),` ist der
`,e.jsx(A,{id:"likelihood",children:"ML-Schätzer"})]}),e.jsx(_,{children:`\\wh{\\btheta}_{\\mathrm{ML}}
= \\argmax_{\\btheta} \\sum_{i=1}^{n} \\log f_Y(y_i \\mid \\btheta) .`}),e.jsxs(i.p,{children:["Nur in Lehrbuchfällen wie der Normalverteilung lässt sich das nach ",e.jsx(n,{children:"\\btheta"}),`
auflösen; sonst bleibt die Iteration.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Überwachtes Lernen."})," Mit einer Verlustfunktion ",e.jsx(n,{children:"L(y, \\wh y)"}),` und Vorhersagen
`,e.jsx(n,{children:"\\wh y_i := p_{\\btheta}(\\bx_i)"})," aus Merkmalen ",e.jsx(n,{children:"\\bx_i"})," lautet die Aufgabe"]}),e.jsx(_,{children:"\\wh{\\btheta} = \\argmin_{\\btheta} \\sum_{i=1}^{n} L\\bigl(y_i, p_{\\btheta}(\\bx_i)\\bigr) ."}),e.jsxs(i.p,{children:["Für die ",e.jsx(A,{id:"linear-regression",children:"lineare Regression"}),` mit quadratischem Verlust ist
das `,e.jsx(n,{children:"\\wh{\\bbeta} = \\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),`, und
dieses eine Problem konnten wir in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` noch geschlossen
lösen. Steht bei `,e.jsx(n,{children:"p_{\\btheta}"}),` dagegen ein
`,e.jsx(A,{id:"neural-network",children:"neuronales Netz"}),", so ist ",e.jsx(n,{children:"\\btheta"}),` hochdimensional, die
Zielfunktion nicht konvex, und es bleibt nur die Iteration.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Regularisierte Regression."})," Ridge und Lasso hängen einen Strafterm an:"]}),e.jsx(_,{children:`\\wh{\\bbeta} = \\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2
+ \\lambda \\left\\|\\bbeta\\right\\|_p^p ,
\\qquad p = 2 \\ \\text{(Ridge)}, \\quad p = 1 \\ \\text{(Lasso)} .`}),e.jsx(i.p,{children:"Dieselbe Aufgabe lässt sich als beschränktes Problem schreiben,"}),e.jsx(_,{children:`\\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2
\\quad \\text{so dass} \\quad \\cred{\\left\\|\\bbeta\\right\\|_p \\le c} ,`}),e.jsxs(i.p,{children:[`und darin sitzt die geometrische Anschauung. Verletzt der KQ-Schätzer die
Nebenbedingung, so blasen wir die `,e.jsx(A,{id:"level-sets",children:"Niveaumengen"}),` des
Kleinste-Quadrate-Verlusts um ihn herum so lange auf, bis eine von ihnen die
`,e.jsx(n,{children:"p"}),"-Norm-Kugel vom Radius ",e.jsx(n,{children:"\\cred{c}"}),` gerade berührt; der Berührpunkt ist die
Lösung. Bei `,e.jsx(n,{children:"p = 1"}),` hat diese Kugel Ecken auf den Achsen, und an einer Ecke
kommt die wachsende Niveaumenge besonders leicht zuerst an; deshalb setzt Lasso
Koeffizienten exakt auf null.`]}),e.jsxs(i.p,{children:[`Zwei Feinheiten sind dabei leicht zu übersehen. Erstens gehört zu jeder
penalisierten Lösung ein Budget `,e.jsx(n,{children:"\\cred c"}),`, das dieselbe Lösung liefert – in der
Gegenrichtung aber nur, solange die Nebenbedingung wirklich bindet. Warum das so
ist und warum es keine allgemeine Umrechnungsformel gibt, klärt
`,e.jsx(i.a,{href:"#env-kkt-stationaritaet-fuer-ridge",children:"Beispiel 12.5.10"})," in ",e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),`. Zweitens steht im
Strafterm die `,e.jsx(n,{children:"p"}),"-te ",e.jsx(i.em,{children:"Potenz"}),`
der Norm. Für `,e.jsx(n,{children:"p = 1"})," ist das die Norm selbst, für ",e.jsx(n,{children:"p = 2"}),` dagegen
`,e.jsx(n,{children:"\\lambda\\left\\|\\bbeta\\right\\|_2^2"}),` – und nur mit dieser quadrierten Fassung
ergibt sich die geschlossene Ridge-Lösung
`,e.jsx(n,{children:"\\wh{\\bbeta} = (\\bX^\\top\\bX + \\lambda\\bI_p)^{-1}\\bX^\\top\\by"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ridge-regression",children:"Beispiel 10.6.6"})," in ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),`. Die
unquadrierte Fassung wäre ein anderes, ebenfalls konvexes Problem. In der
Nebenbedingungsform spielt der Unterschied keine Rolle, weil
`,e.jsx(n,{children:"\\left\\|\\bbeta\\right\\|_2 \\le c"}),` und
`,e.jsx(n,{children:"\\left\\|\\bbeta\\right\\|_2^2 \\le c^2"})," dieselbe Menge beschreiben."]})]}),`
`,e.jsxs(i.h3,{children:["Wann hat ",e.jsx(n,{children:"f(x) = 0"})," überhaupt eine Lösung?"]}),`
`,e.jsxs(i.p,{children:[`Bevor wir ein Verfahren bauen, sollten wir wissen, wonach wir suchen. Sei
`,e.jsx(n,{children:"[a, b] \\subset \\R"})," und ",e.jsx(n,{children:"f\\colon [a, b] \\to \\R"}),`; gesucht sind Lösungen von
`,e.jsx(n,{children:"f(x) = 0"}),". Welche der folgenden Aussagen stimmen?"]}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," stetig, so hat ",e.jsx(n,{children:"f(x) = 0"})," genau eine Lösung."]}),e.jsxs(i.p,{children:[`Stetigkeit allein liefert weder Existenz noch Eindeutigkeit. Die konstante
Funktion `,e.jsx(n,{children:"f \\equiv 1"}),` ist stetig und hat gar keine Nullstelle, die konstante
Funktion `,e.jsx(n,{children:"f \\equiv 0"}),` ist stetig und hat lauter Nullstellen. Was Stetigkeit
beiträgt, ist erst in Verbindung mit einem Vorzeichenwechsel etwas wert.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Gilt ",e.jsx(n,{children:"f(a) < 0"})," und ",e.jsx(n,{children:"f(b) > 0"}),", so hat ",e.jsx(n,{children:"f(x) = 0"})," mindestens eine Lösung."]}),e.jsxs(i.p,{children:["Das wäre der ",e.jsx(A,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),`, aber der
verlangt Stetigkeit, und die steht in der Voraussetzung nicht. Ein
Gegenbeispiel ist die Sprungfunktion auf `,e.jsx(n,{children:"[-1, 1]"})," mit ",e.jsx(n,{children:"f(x) = -1"})," für ",e.jsx(n,{children:"x < 0"}),`
und `,e.jsx(n,{children:"f(x) = 1"})," für ",e.jsx(n,{children:"x \\ge 0"}),`: Die Vorzeichen an den Rändern wechseln, eine
Nullstelle gibt es nicht.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," streng monoton, so hat ",e.jsx(n,{children:"f(x) = 0"})," höchstens eine Lösung."]}),e.jsxs(i.p,{children:["Streng monotone Funktionen sind injektiv: Aus ",e.jsx(n,{children:"x_1 < x_2"}),` folgt
`,e.jsx(n,{children:"f(x_1) \\neq f(x_2)"}),". Der Wert ",e.jsx(n,{children:"0"}),` wird also höchstens einmal angenommen. Für die
Existenz sagt das nichts, dafür brauchen wir Stetigkeit und einen
Vorzeichenwechsel. Diese Aufteilung steckt im folgenden Satz.`]})]})]}),`
`,e.jsx(y,{kind:"Satz",label:"12.1.5 (Existenz und Eindeutigkeit einer Nullstelle)",id:"env-existenz-und-eindeutigkeit-einer",children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon [a, b] \\to \\R"}),` streng monoton und stetig mit
`,e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} \\le 0"}),". Dann hat die Gleichung ",e.jsx(n,{children:"f(x) = 0"}),` genau
eine Lösung `,e.jsx(n,{children:"\\cgreen{x^\\star} \\in [a, b]"}),"."]})}),`
`,e.jsxs(tn,{children:[e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["strenge Monotonie heißt: ",e.jsx(n,{children:"x_1 < x_2"})," erzwingt ",e.jsx(n,{children:"f(x_1) < f(x_2)"})," (steigend) oder ",e.jsx(n,{children:"f(x_1) > f(x_2)"})," (fallend), in beiden Fällen ungleiche Werte"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Höchstens eine Lösung."})," Sind ",e.jsx(n,{children:"x_1 < x_2"})," zwei Punkte aus ",e.jsx(n,{children:"[a, b]"}),`, so ist
`,e.jsx(n,{children:"f(x_1) \\neq f(x_2)"}),", weil ",e.jsx(n,{children:"f"})," streng monoton ist. Der Wert ",e.jsx(n,{children:"0"}),` kann also
höchstens an einer Stelle angenommen werden.`]})}),e.jsx(ne,{why:e.jsx(e.Fragment,{children:"ein Produkt reeller Zahlen ist genau dann null, wenn einer der Faktoren null ist"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Randfall."})," Ist ",e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} = 0"}),`, so ist
`,e.jsx(n,{children:"\\cblue{f(a)} = 0"})," oder ",e.jsx(n,{children:"\\cblue{f(b)} = 0"}),`, und wir sind bereits fertig: Die
Nullstelle liegt am Rand.`]})}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["im anderen Fall betrachten wir ",e.jsx(n,{children:"-f"}),"; diese Funktion ist ebenfalls stetig und streng monoton und hat genau dieselben Nullstellen"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der interessante Fall."})," Sei nun ",e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} < 0"}),`, die
beiden Randwerte haben also verschiedene Vorzeichen. Ohne Beschränkung der
Allgemeinheit nehmen wir `,e.jsx(n,{children:"\\cblue{f(a)} < 0 < \\cblue{f(b)}"})," an."]})}),e.jsx(ne,{why:e.jsx(e.Fragment,{children:"der Zwischenwertsatz gilt für stetige Funktionen auf einem Intervall; ohne Stetigkeit ist er falsch, wie die Sprungfunktion aus dem Quiz zeigt"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Existenz."})," Weil ",e.jsx(n,{children:"f"}),` stetig ist, liefert der
`,e.jsx(A,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),` zu jedem Wert zwischen
`,e.jsx(n,{children:"\\cblue{f(a)}"})," und ",e.jsx(n,{children:"\\cblue{f(b)}"})," eine Urbildstelle, insbesondere zum Wert ",e.jsx(n,{children:"0"}),`.
Es gibt also ein `,e.jsx(n,{children:"\\cgreen{x^\\star} \\in (a, b)"})," mit ",e.jsx(n,{children:"f(\\cgreen{x^\\star}) = 0"}),`.
Zusammen mit Schritt 1 ist diese Lösung eindeutig.`]})})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.6 (Hinreichend, aber nicht notwendig)",id:"env-hinreichend-aber-nicht-notwendig",children:[e.jsxs(i.p,{children:[`Der Satz gibt eine Garantie, keine Charakterisierung. Die Funktion
`,e.jsx(n,{children:"f(x) = x^2 - 1"})," auf ",e.jsx(n,{children:"[-2, 2]"}),` ist weder monoton noch wechselt sie das
Vorzeichen zwischen den Rändern, und trotzdem hat sie dort zwei Nullstellen. Die
Bedingungen des Satzes sind also `,e.jsx(i.em,{children:"hinreichend"}),", aber nicht ",e.jsx(i.em,{children:"notwendig"}),"."]}),e.jsx(i.p,{children:`Praktisch heißt das: Findet ein Verfahren keine Nullstelle, so ist damit nicht
gesagt, dass es keine gibt. Umgekehrt liefert ein Vorzeichenwechsel plus
Stetigkeit eine belastbare Zusage, und darauf baut das erste Verfahren auf.`})]}),`
`,e.jsx(i.h3,{children:"Das Bisektionsverfahren"}),`
`,e.jsxs(i.p,{children:["Die Idee des ",e.jsx(A,{id:"bisection",children:"Bisektionsverfahrens"}),` ist so einfach, dass sie fast
keine Erklärung braucht. Wir kennen ein Intervall, in dem eine Nullstelle
stecken muss, weil `,e.jsx(n,{children:"f"}),` an den Rändern das Vorzeichen wechselt. Wir halbieren es,
schauen nach, in welcher Hälfte der Vorzeichenwechsel geblieben ist, und werfen
die andere weg.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.1.7 (Bisektionsverfahren)",id:"env-bisektionsverfahren",children:[e.jsxs(i.p,{children:["Gegeben seien eine stetige Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", zwei Punkte ",e.jsx(n,{children:"a < b"}),` mit
`,e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} < 0"})," und eine Zielgenauigkeit ",e.jsx(n,{children:"\\epsilon > 0"}),`.
Solange `,e.jsx(n,{children:"\\cblue{b} - \\cblue{a} > \\epsilon"}),":"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Setze ",e.jsx(n,{children:"\\corange{m} = \\cblue{a} + (\\cblue{b} - \\cblue{a})/2"}),"."]}),`
`,e.jsxs(i.li,{children:["Haben ",e.jsx(n,{children:"\\cblue{f(a)}"})," und ",e.jsx(n,{children:"\\corange{f(m)}"}),` dasselbe Vorzeichen, so setze
`,e.jsx(n,{children:"\\cblue{a} \\leftarrow \\corange{m}"}),", andernfalls ",e.jsx(n,{children:"\\cblue{b} \\leftarrow \\corange{m}"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Als Näherung geben wir die Mitte ",e.jsx(n,{children:"\\cblue{a} + (\\cblue{b} - \\cblue{a})/2"}),` des
Endintervalls zurück.`]})]}),`
`,e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"\\epsilon"}),` ist hier die gewünschte Genauigkeit, nicht die Maschinengenauigkeit
aus `,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),". Wie viele Schritte kostet uns das?"]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.1.8 (Schrittzahl der Bisektion)",id:"env-schrittzahl-der-bisektion",children:[e.jsxs(i.p,{children:["Es gelten die Voraussetzungen von ",e.jsx(i.a,{href:"#env-bisektionsverfahren",children:"Algorithmus 12.1.7"}),`, und das Startintervall sei
noch zu grob, `,e.jsx(n,{children:"b - a > \\epsilon"}),". Dann hat das Intervall nach ",e.jsx(n,{children:"k"}),` Durchläufen die
Länge `,e.jsx(n,{children:"(b - a)/2^k"}),`, und es enthält weiterhin eine Nullstelle
von `,e.jsx(n,{children:"f"}),". Die Schleife bricht nach genau"]}),e.jsx(_,{children:"k = \\left\\lceil \\log_2\\left(\\frac{b - a}{\\epsilon}\\right) \\right\\rceil"}),e.jsxs(i.p,{children:["Durchläufen ab, und die zurückgegebene Intervallmitte ",e.jsx(n,{children:"\\cblue{\\wh x}"}),` erfüllt
`,e.jsx(n,{children:"\\left|\\cgreen{x^\\star} - \\cblue{\\wh x}\\right| \\le \\epsilon/2"}),"."]})]}),`
`,e.jsxs(tn,{children:[e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["das leistet die Fallunterscheidung des Algorithmus. Gleichheit tritt nur im Ausnahmefall ",e.jsx(n,{children:"\\corange{f(m)} = 0"})," ein: Dann haben die beiden Werte nicht dasselbe Vorzeichen, es wird ",e.jsx(n,{children:"b \\leftarrow m"})," gesetzt, und die Nullstelle sitzt anschließend auf dem rechten Rand"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Vorzeichenwechsel überlebt."})," Schreiben wir ",e.jsx(n,{children:"[\\cblue{a_k}, \\cblue{b_k}]"}),` für
das Intervall nach `,e.jsx(n,{children:"k"})," Durchläufen. Haben ",e.jsx(n,{children:"\\cblue{f(a_{k-1})}"}),` und
`,e.jsx(n,{children:"\\corange{f(m)}"})," dasselbe Vorzeichen, so hat ",e.jsx(n,{children:"\\corange{f(m)}"}),` das andere
Vorzeichen als `,e.jsx(n,{children:"\\cblue{f(b_{k-1})}"}),`, und der Wechsel sitzt in
`,e.jsx(n,{children:"[\\corange{m}, \\cblue{b_{k-1}}]"}),`; diese Hälfte behalten wir. Andernfalls
sitzt er in `,e.jsx(n,{children:"[\\cblue{a_{k-1}}, \\corange{m}]"}),`, und wir behalten diese. In beiden
Fällen gilt weiter `,e.jsx(n,{children:"\\cblue{f(a_k)} \\cdot \\cblue{f(b_k)} \\le 0"}),"."]})}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["das sind die Schritte 2 und 4 des Beweises von ",e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"}),", angewandt auf das kleinere Intervall"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Es gibt immer noch eine Nullstelle."})," Auf ",e.jsx(n,{children:"[\\cblue{a_k}, \\cblue{b_k}]"})," ist ",e.jsx(n,{children:"f"}),`
stetig, und die Randwerte haben verschiedene Vorzeichen oder einer von ihnen ist
null. Im ersten Fall liefert der
`,e.jsx(A,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),` eine Nullstelle
`,e.jsx(n,{children:"\\cgreen{x^\\star}"}),` im Inneren, im zweiten liegt sie auf dem Rand. Monotonie
brauchen wir dafür nicht; nur für die Eindeutigkeit wäre sie nötig.`]})}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["Induktionsanfang ",e.jsx(n,{children:"k = 0"})," ist das Startintervall selbst"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Länge halbiert sich."}),` Der Mittelpunkt teilt das Intervall in zwei gleich
lange Hälften, also ist `,e.jsx(n,{children:`\\cblue{b_k} - \\cblue{a_k} = (\\cblue{b_{k-1}} -
\\cblue{a_{k-1}})/2`}),` und per Induktion
`,e.jsx(n,{children:"\\cblue{b_k} - \\cblue{a_k} = (b - a)/2^k"}),"."]})}),e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["der Logarithmus zur Basis ",e.jsx(n,{children:"2"})," ist streng monoton wachsend, die Äquivalenzen bleiben also erhalten"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Abbruchbedingung."}),` Die Schleife läuft, solange
`,e.jsx(n,{children:"\\cblue{b_k} - \\cblue{a_k} > \\epsilon"})," ist. Sie endet also beim kleinsten ",e.jsx(n,{children:"k"})," mit"]}),e.jsx(_,{children:`\\frac{b - a}{2^k} \\le \\epsilon
\\quad \\Longleftrightarrow \\quad
2^k \\ge \\frac{b - a}{\\epsilon}
\\quad \\Longleftrightarrow \\quad
k \\ge \\log_2\\left(\\frac{b - a}{\\epsilon}\\right) ,`}),e.jsx(i.p,{children:"und die kleinste solche ganze Zahl ist die aufgerundete rechte Seite."})]}),e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["hier zahlt sich die Rückgabe der Intervallmitte aus; ein Randpunkt des Endintervalls hätte nur die Schranke ",e.jsx(n,{children:"\\epsilon"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Fehlerschranke."})," Die Nullstelle ",e.jsx(n,{children:"\\cgreen{x^\\star}"}),` liegt nach Schritt 2 im
Endintervall, und von dessen Mitte `,e.jsx(n,{children:"\\cblue{\\wh x}"}),` ist jeder Punkt des Intervalls
höchstens eine halbe Intervalllänge entfernt. Also ist`]}),e.jsx(_,{children:`\\left|\\cgreen{x^\\star} - \\cblue{\\wh x}\\right|
\\le \\frac{\\cblue{b_k} - \\cblue{a_k}}{2} \\le \\frac{\\epsilon}{2} .`})]})]}),`
`,e.jsxs(i.p,{children:[`Ein Beispiel, das uns durch den Rest des Abschnitts begleitet: Für
`,e.jsx(n,{children:"f(x) = x^2 - 2"})," auf ",e.jsx(n,{children:"[1, 2]"}),", also die Suche nach ",e.jsx(n,{children:"\\sqrt 2"}),`, und
`,e.jsx(n,{children:"\\epsilon = 10^{-6}"})," ist ",e.jsx(n,{children:"\\log_2(10^6) = 19{,}93"}),", also brauchen wir ",e.jsx(n,{children:"20"}),`
Schritte, und das Endintervall hat die Länge `,e.jsx(n,{children:"2^{-20} = 9{,}54 \\cdot 10^{-7}"}),`. Die Bisektion gewinnt pro Schritt genau
ein Bit, also `,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),` Dezimalstellen; für eine weitere
gültige Stelle brauchen wir rund `,e.jsx(n,{children:"3{,}3"}),` Schritte. Das ist zuverlässig und
langsam.`]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.9 (Die Bisektion in sieben Zeilen)",id:"env-bisektion-robust-implementiert",children:[e.jsx(i.p,{children:"Kompakt geschrieben ist das Verfahren sieben Zeilen lang:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`bisect <- function(f, a, b, eps) {
  while (b - a > eps) {
    mid <- (a + b) / 2
    if (f(a) * f(mid) <= 0) b <- mid else a <- mid
  }
  return((a + b) / 2)
}
`})}),e.jsxs(i.p,{children:["Auf die letzte Zeile kommt es dabei an. Gäbe sie den ",e.jsx(i.em,{children:"letzten Mittelpunkt"}),`
zurück, so wäre das nach der Zuweisung stets ein Randpunkt des Endintervalls:
Statt der garantierten Genauigkeit `,e.jsx(n,{children:"\\epsilon/2"})," aus ",e.jsx(i.a,{href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` bliebe nur
`,e.jsx(n,{children:"\\epsilon"}),", ein voller Halbierungsschritt verschenkt."]})]}),`
`,e.jsxs($e,{title:"Fließkomma-Fallen der Bisektion",children:[e.jsxs(i.p,{children:[`Zwei Kleinigkeiten dieser Fassung sind Fließkomma-Handwerk aus
`,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),". Die erste betrifft den Mittelpunkt. Haben ",e.jsx(n,{children:"a"}),`
und `,e.jsx(n,{children:"b"})," dasselbe Vorzeichen, so ist ",e.jsx(n,{children:"a + (b-a)/2"}),` die verlässlichere Formel: Die
Differenz `,e.jsx(n,{children:"b - a"}),` ist dann betragsmäßig höchstens so groß wie der größere der
beiden Endpunkte, ihre Hälfte erst recht, und der Ausdruck bleibt auch gerundet
zwischen `,e.jsx(n,{children:"a"})," und ",e.jsx(n,{children:"b"}),". Die Summe ",e.jsx(n,{children:"a + b"}),` dagegen ist ein Zwischenergebnis, das
größer sein kann als beide Endpunkte, und sie kann überlaufen, obwohl die Mitte
selbst darstellbar wäre. Die zweite betrifft den Vorzeichentest. Nahe der
Nullstelle sind `,e.jsx(n,{children:"f(a)"})," und ",e.jsx(n,{children:"f(m)"}),` beide winzig; ihr Produkt unterläuft dann auf
null, und der Produkttest kann einen echten Vorzeichenwechsel nicht mehr von
einem Unterlauf unterscheiden. Vergleichen wir stattdessen die Vorzeichen, so stehen im Produkt nur noch
`,e.jsx(n,{children:"\\pm 1"}),`, und dort kann nichts mehr unterlaufen. So sieht die robuste Fassung
aus:`]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`bisect <- function(f, a, b, eps) {
  fa <- f(a); fb <- f(b)
  stopifnot(is.finite(fa), is.finite(fb), sign(fa) * sign(fb) < 0)
  while (b - a > eps) {
    mid <- a + (b - a) / 2          # bleibt auch gerundet in [a, b]
    fmid <- f(mid)
    if (fmid == 0) return(mid)      # exakt getroffen
    if (sign(fa) * sign(fmid) < 0) {
      b <- mid
    } else {
      a <- mid; fa <- fmid          # f(a) nur neu auswerten, wenn a sich bewegt
    }
  }
  a + (b - a) / 2                   # Mitte des Endintervalls
}
`})}),e.jsxs(i.p,{children:["Der Aufruf ",e.jsx(i.code,{children:"stopifnot"}),` macht aus einer stillschweigenden Voraussetzung eine
geprüfte, und das Zwischenspeichern von `,e.jsx(i.code,{children:"fa"}),` halbiert die Zahl der
Funktionsauswertungen. Bei einer Zielfunktion, deren Auswertung eine Minute
dauert, ist das kein Schönheitsfehler.`]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.10 (Umkehrfunktionen, Binärsuche und die Grenze des Verfahrens)",id:"env-umkehrfunktionen-binaersuche-und-die",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Umkehrfunktionen auswerten."})," Suchen wir ",e.jsx(n,{children:"f^{-1}(y)"})," für ein gegebenes ",e.jsx(n,{children:"y"}),`, so
lösen wir einfach `,e.jsx(n,{children:"f(x) - y = 0"}),`. Für die Statistik ist der wichtigste Fall die
Quantilfunktion: Ist `,e.jsx(n,{children:"F"}),` eine stetige, streng wachsende Verteilungsfunktion, so
ist das `,e.jsx(n,{children:"p"}),"-Quantil die Lösung von ",e.jsx(n,{children:"F(x) - p = 0"}),". ",e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"}),` ist hier wörtlich
anwendbar, und genau so berechnen viele Programmbibliotheken Quantile, für die es
keine geschlossene Formel gibt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Verwandtschaft zur Binärsuche."}),` Die Bisektion halbiert in jedem Schritt den
Suchbereich, wie die binäre Suche in einer sortierten Liste. Auch der Aufwand ist
derselbe, nämlich `,e.jsx(A,{id:"big-o-notation",children:"logarithmisch"}),` in der geforderten
Auflösung (`,e.jsx(i.a,{href:"?k=02-algos#sec-2.3",children:"Abschnitt 2.3"}),`). Der Vorzeichenwechsel
übernimmt dabei die Rolle des Größenvergleichs: Er sagt uns, in welcher Hälfte
weiterzusuchen ist.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Und die Grenze."})," Beide Verfahren leben davon, dass ",e.jsx(n,{children:"\\R"}),` angeordnet ist. Im
`,e.jsx(n,{children:"\\R^n"}),' ist es das nicht: Ein „Vorzeichenwechsel" eines vektorwertigen ',e.jsx(n,{children:"f"}),` ist gar
nicht definiert, und ein Gebiet lässt sich nicht so halbieren, dass eine
Nullstelle nachweislich in einer Hälfte bleibt. Deshalb eignet sich die Bisektion
nur für univariate Funktionen; für `,e.jsx(n,{children:"n > 1"}),` brauchen wir andere Ideen, und die
einfachste davon steht am Ende dieses Abschnitts.`]})]}),`
`,e.jsx(i.p,{children:`Zwei Fragen bleiben offen. Wie viele Halbierungen kostet eine vorgegebene
Genauigkeit wirklich, und was passiert, wenn im Startintervall mehr als eine
Nullstelle liegt? Beides lässt sich am Verfahren selbst ablesen.`}),`
`,e.jsxs(ze,{title:"Halbieren, Schritt für Schritt",children:[e.jsxs(i.p,{children:["Voreingestellt ist ",e.jsx(n,{children:"f(x) = x^2 - 2"})," auf ",e.jsx(n,{children:"[1, 2]"}),", also die Suche nach ",e.jsx(n,{children:"\\sqrt 2"}),`;
die Tabelle daneben protokolliert den Intervall-Verlauf. Der zweite Menüpunkt
wechselt zu `,e.jsx(n,{children:"f(x) = x^3 - 3x + 1"})," auf ",e.jsx(n,{children:"[-2, 2]"}),`, wo die Voraussetzung von
`,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"})," verletzt ist."]}),e.jsx(Ge,{frage:e.jsxs(e.Fragment,{children:["Wie viele Halbierungen braucht die Bisektion auf ",e.jsx(n,{children:"[1, 2]"}),", bis das Intervall kürzer ist als ",e.jsx(n,{children:"\\epsilon = 10^{-6}"}),"?"]}),loesung:20,toleranz:2,einheit:"Schritte",verdeckt:e.jsxs(e.Fragment,{children:[O("satz:schrittzahl-der-bisektion")," sagt ",e.jsx(n,{children:"\\lceil \\log_2((b-a)/\\epsilon)\\rceil = 20"})," voraus, und das ist keine Schätzung, sondern die exakte Zahl."]}),children:e.jsx(ft,{})}),e.jsxs(i.p,{children:["Die Schranke aus ",e.jsx(i.a,{href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"})," trifft exakt: ",e.jsx(n,{children:"10"}),` Schritte für
`,e.jsx(n,{children:"\\epsilon = 10^{-3}"}),", ",e.jsx(n,{children:"20"})," für ",e.jsx(n,{children:"10^{-6}"}),", ",e.jsx(n,{children:"34"})," für ",e.jsx(n,{children:"10^{-10}"}),`, also
`,e.jsx(n,{children:"1/\\log_{10} 2 = 3{,}32"}),` Schritte je gültiger Dezimalstelle. Der zweite Menüpunkt
zeigt, was der Satz `,e.jsx(i.em,{children:"nicht"})," verspricht: ",e.jsx(n,{children:"f(x) = x^3 - 3x + 1"})," hat auf ",e.jsx(n,{children:"[-2, 2]"}),`
drei Nullstellen bei `,e.jsx(n,{children:"-1{,}879385"}),", ",e.jsx(n,{children:"0{,}347296"})," und ",e.jsx(n,{children:"1{,}532089"}),`, und schon der
erste Mittelpunkt entscheidet, welche davon wir finden – weil `,e.jsx(n,{children:"f(0) = 1"}),` dasselbe
Vorzeichen trägt wie `,e.jsx(n,{children:"f(2) = 3"}),`, fliegt die rechte Hälfte samt zwei Nullstellen
sofort hinaus. Für die Eindeutigkeit fehlt hier die strenge Monotonie aus
`,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Das Newton-Raphson-Verfahren"}),`
`,e.jsxs(i.p,{children:["Die Bisektion benutzt von ",e.jsx(n,{children:"f"})," nur das Vorzeichen. Ist ",e.jsx(n,{children:"f"}),` differenzierbar,
verschenken wir damit Information: Die Ableitung sagt uns nicht nur, auf welcher
Seite die Nullstelle liegt, sondern auch ungefähr wie weit.`]}),`
`,e.jsxs(i.p,{children:[`Der Ansatz ist die Taylorentwicklung erster Ordnung aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),`. Um die aktuelle Stelle
`,e.jsx(n,{children:"\\cblue{x^{(k)}}"})," herum ersetzen wir ",e.jsx(n,{children:"f"}),` durch seine
`,e.jsx(A,{id:"tangent-line",children:"Tangente"})," und verlangen von dieser, dass sie null wird:"]}),`
`,e.jsx(_,{children:`\\cblue{f(x)} \\approx \\cblue{f(x^{(k)})} + \\corange{f'(x^{(k)})}\\bigl(x - \\cblue{x^{(k)}}\\bigr)
\\overset{!}{=} 0 .`}),`
`,e.jsxs(i.p,{children:["Das ist eine lineare Gleichung in ",e.jsx(n,{children:"x"}),`, und sie lässt sich hinschreiben, solange
`,e.jsx(n,{children:"\\corange{f'(x^{(k)})} \\neq 0"})," ist. Auflösen liefert die nächste Iterierte."]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.1.11 (Newton-Raphson-Verfahren für Nullstellen)",id:"env-newton-raphson-verfahren-fuer",children:[e.jsxs(i.p,{children:["Gegeben seien eine differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),` und ein
Startwert `,e.jsx(n,{children:"\\cblue{x^{(0)}}"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ee,{tag:"12.1.1",id:"eq-newton-raphson-verfahren-fuer",children:"\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\cblue{f(x^{(k)})}}{\\corange{f'(x^{(k)})}} ,"}),e.jsxs(i.p,{children:["solange ",e.jsx(n,{children:"\\corange{f'(x^{(k)})} \\neq 0"}),` ist, und brich ab, sobald
`,e.jsx(n,{children:"\\left|\\cblue{f(x^{(k)})}\\right|"}),` oder die Schrittlänge
`,e.jsx(n,{children:"\\left|\\cblue{x^{(k+1)}} - \\cblue{x^{(k)}}\\right|"}),` unter eine vorgegebene
Schranke fällt.`]})]}),`
`,e.jsxs(i.p,{children:["Geometrisch ist ",e.jsx(n,{children:"\\cblue{x^{(k+1)}}"})," der Schnittpunkt der Tangente an ",e.jsx(n,{children:"f"}),` im
Punkt `,e.jsx(n,{children:"\\bigl(\\cblue{x^{(k)}}, \\cblue{f(x^{(k)})}\\bigr)"})," mit der ",e.jsx(n,{children:"x"}),`-Achse. Der
Bruch in `,e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` sagt das noch einmal in Zahlen: Wir teilen die Höhe, die
abzubauen ist, durch die Rate, mit der die Tangente sie abbaut.`]}),`
`,e.jsx($e,{title:"Newton-Raphson einmal vollständig durchgerechnet",children:e.jsxs(y,{kind:"Beispiel",label:"12.1.12 (Die Wurzel aus zwei)",id:"env-die-wurzel-aus-zwei",children:[e.jsxs(i.p,{children:["Wir bleiben bei ",e.jsx(n,{children:"\\cblue{f(x) = x^2 - 2}"})," mit ",e.jsx(n,{children:"\\corange{f'(x) = 2x}"}),` und
`,e.jsx(n,{children:"\\cgreen{x^\\star} = \\sqrt 2 = 1{,}41421356"}),". Die Vorschrift ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"})," wird zu"]}),e.jsx(_,{children:`\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\cblue{(x^{(k)})^2 - 2}}{\\corange{2x^{(k)}}}
= \\frac{1}{2}\\left(\\cblue{x^{(k)}} + \\frac{2}{\\cblue{x^{(k)}}}\\right) ,`}),e.jsxs(i.p,{children:[`also gerade dem Heron-Verfahren, das seit der Antike Wurzeln zieht. Von
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 2"})," aus laufen die Iterierten so:"]}),e.jsx(_,{children:`\\begin{array}{c|l|l|l}
k & \\cblue{x^{(k)}} & e_k := \\left|\\cblue{x^{(k)}} - \\cgreen{x^\\star}\\right| & e_k / e_{k-1}^2 \\\\ \\hline
0 & 2{,}000000000000 & 5{,}86 \\cdot 10^{-1} & \\text{-} \\\\
1 & 1{,}500000000000 & 8{,}58 \\cdot 10^{-2} & 0{,}250 \\\\
2 & 1{,}416666666667 & 2{,}45 \\cdot 10^{-3} & 0{,}333 \\\\
3 & 1{,}414215686275 & 2{,}12 \\cdot 10^{-6} & 0{,}353 \\\\
4 & 1{,}414213562375 & 1{,}59 \\cdot 10^{-12} & 0{,}354
\\end{array}`}),e.jsxs(i.p,{children:["Die letzte Spalte pendelt sich bei ",e.jsx(n,{children:"1/(2\\cgreen{x^\\star}) = 0{,}3536"}),` ein. Die
Zahl der gültigen Dezimalstellen läuft dabei über `,e.jsx(n,{children:"0{,}2"}),", ",e.jsx(n,{children:"1{,}1"}),", ",e.jsx(n,{children:"2{,}6"}),`,
`,e.jsx(n,{children:"5{,}7"})," und ",e.jsx(n,{children:"11{,}8"}),`: Sie verdoppelt sich in jedem Schritt grob. Zum Vergleich
brauchte die Bisektion auf demselben Intervall `,e.jsx(n,{children:"20"})," Schritte für sechs Stellen."]})]})}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.13 (Quadratische Konvergenz)",id:"env-quadratische-konvergenz",children:[e.jsxs(i.p,{children:["Was wir in der letzten Spalte gesehen haben, ist ",e.jsx(i.em,{children:"quadratische Konvergenz"}),`
(`,e.jsx(A,{id:"rate-of-convergence",children:"Konvergenzordnung"}),`): Der Fehler des nächsten Schrittes
verhält sich wie das Quadrat des aktuellen,`]}),e.jsx(_,{children:"e_{k+1} \\approx C \\cdot e_k^2 ,"}),e.jsxs(i.p,{children:["mit einer Konstanten ",e.jsx(n,{children:"C"}),", die von ",e.jsx(n,{children:"f"})," abhängt. Ist ",e.jsx(n,{children:"f"}),` in einer Umgebung einer
einfachen Nullstelle zweimal stetig differenzierbar, so ist asymptotisch
`,e.jsx(n,{children:"C = \\left|f''(\\cgreen{x^\\star})\\right| / \\bigl(2\\left|f'(\\cgreen{x^\\star})\\right|\\bigr)"}),`,
für unser Beispiel also `,e.jsx(n,{children:"2/(2 \\cdot 2\\sqrt 2) = 0{,}354"}),`, genau der beobachtete
Wert. Auf `,e.jsx(n,{children:"C"}),` kommt es an: Zur Merkregel „der Fehler quadriert sich pro Schritt"
abgekürzt, stimmt die Aussage schon in unserem eigenen Beispiel nicht, denn
`,e.jsx(n,{children:"e_0^2 = 0{,}343"})," steht gegen ",e.jsx(n,{children:"e_1 = 0{,}086"}),`. Praktisch heißt
quadratische Konvergenz: Sobald wir nah genug dran sind,
verdoppelt jeder Schritt die Zahl der richtigen Stellen, und wenige Schritte
genügen bis zur Maschinengenauigkeit.`]}),e.jsxs(i.p,{children:[`Der Preis dafür steht im Kleingedruckten. Erstens braucht das Verfahren die
Ableitung, die Bisektion kam mit Funktionswerten aus. Zweitens gilt die Aussage
nur `,e.jsx(i.em,{children:"lokal"}),`: Weit weg vom Ziel kann die Tangente irgendwohin zeigen, und die
Iteration läuft dann davon. Drittens muss die Nullstelle einfach und `,e.jsx(n,{children:"f'"}),` hinreichend
glatt sein; eine lokal Lipschitz-stetige Ableitung ist eine übliche hinreichende Annahme.
Ist `,e.jsx(n,{children:"\\corange{f'(\\cgreen{x^\\star})} = 0"}),`, so bricht die Konvergenz auf lineare
Geschwindigkeit ein, und unterwegs kann ein `,e.jsx(n,{children:"\\corange{f'(x^{(k)})} = 0"}),` den
Schritt ganz undefiniert machen. Die Bisektion hat keinen dieser Vorbehalte,
dafür braucht sie für dieselbe Genauigkeit ein Vielfaches an Schritten. In der
Praxis kombinieren wir beides: erst klammern, dann Newton. Wir kommen in
`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"})," darauf zurück."]})]}),`
`,e.jsx(i.p,{children:`Das Kleingedruckte klingt harmlos. Wie schlimm wird es tatsächlich, wenn die
Tangente flach liegt?`}),`
`,e.jsxs(ze,{title:"Die Tangente als Wegweiser",children:[e.jsxs(i.p,{children:["Die Tafel zeigt ",e.jsx(i.a,{href:"#env-newton-raphson-verfahren-fuer",children:"Algorithmus 12.1.11"}),` Schritt für Schritt: violett der Graph von
`,e.jsx(n,{children:"f"}),", orange die Tangente im aktuellen Punkt, und wo sie die ",e.jsx(n,{children:"x"}),`-Achse trifft,
sitzt die nächste blaue Iterierte. Der Startpunkt lässt sich auf der Achse
ziehen oder mit dem Regler setzen; die gestrichelten roten Senkrechten im
zweiten Beispiel markieren die Stellen mit `,e.jsx(n,{children:"\\corange{f'} = 0"}),"."]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Die dritte Funktion, ",e.jsx(n,{children:"f(x) = \\arctan x"}),", hat genau EINE Nullstelle. Findet Newton sie von jedem Startpunkt aus?"]}),optionen:[{id:"ja",text:"ja, es gibt ja nur eine"},{id:"nein",text:"nein, ab einem gewissen Abstand nicht mehr"}],loesung:"nein",verdeckt:e.jsxs(e.Fragment,{children:["Die Schwelle liegt bei ",e.jsx(n,{children:"|x^{(0)}| = 1{,}3917"}),"."]}),children:e.jsx(zt,{})}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"f(x) = x^2 - 2"}),` läuft alles glatt: Die Fehlerspalte fällt über
`,e.jsx(n,{children:"8{,}6 \\cdot 10^{-2}"})," und ",e.jsx(n,{children:"2{,}5 \\cdot 10^{-3}"})," auf ",e.jsx(n,{children:"1{,}6 \\cdot 10^{-12}"}),`, und
der Quotient `,e.jsx(n,{children:"e_{k+1}/e_k^2"})," pendelt sich bei ",e.jsx(n,{children:"0{,}3536"}),` ein. Auf
`,e.jsx(n,{children:"f(x) = x^3 - 3x + 1"}),` entscheidet dagegen der Startpunkt, welche der drei
Nullstellen wir finden, und in der Nähe von `,e.jsx(n,{children:"x = 1"}),` wird es unangenehm: Bei
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 1{,}05"})," ist ",e.jsx(n,{children:"\\corange{f'} = 0{,}31"}),`, der erste Schritt springt
nach `,e.jsx(n,{children:"4{,}28"}),`, und der Lauf braucht zehn Schritte statt fünf. Am deutlichsten ist
der Arkustangens: Er hat genau eine Nullstelle, aber ab
`,e.jsx(n,{children:"\\left|\\cblue{x^{(0)}}\\right| > 1{,}3917"}),` überholt jeder Schritt den vorigen, und
die Iterierten `,e.jsx(n,{children:`1{,}5 \\to -1{,}694 \\to 2{,}321 \\to -5{,}114 \\to 32{,}30 \\to
-1575{,}3`}),` laufen auseinander. Die Bisektion hätte hier ohne Weiteres
funktioniert; sie ist eben langsam, aber nicht zu überlisten.`]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.1.14 (Von der Nullstelle zum Minimum)",id:"env-von-der-nullstelle-zum-minimum",children:[e.jsxs(i.p,{children:["Jetzt schließt sich der Kreis zu ",e.jsx(i.a,{href:"#env-zwei-probleme-ein-werkzeugkasten",children:"Bemerkung 12.1.3"}),`. Suchen wir das Minimum einer
differenzierbaren Funktion `,e.jsx(n,{children:"\\cblue{f}"}),`, so suchen wir eine Nullstelle von
`,e.jsx(n,{children:"\\corange{\\nabla f}"}),". Wenden wir ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` auf diese Funktion an, so steht im
Nenner die Ableitung des Gradienten, also die Hesse-Matrix:`]}),e.jsx(_,{children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
- \\Bigl(\\corange{\\nabla f(\\bx^{(k)})}\\, \\corange{\\bH_f(\\bx^{(k)})^{-1}}\\Bigr)^\\top .`}),e.jsxs(i.p,{children:["Das ist wörtlich ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-newton-raphson-verfahren",children:"Algorithmus 10.8.11"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),`. Newton für
`,e.jsx(n,{children:"\\min_{\\bx} \\cblue{f(\\bx)}"})," ",e.jsx(i.em,{children:"ist"}),` Newton-Raphson für
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),`, und das Transponierte steht da, weil
der Gradient in unserer Konvention eine Zeile ist. In
`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),` bauen wir dieses Verfahren zu einem
praxistauglichen aus.`]})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"})," tritt in ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` an die Stelle der Division die
Lösung des linearen Systems
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx^{(k)})}\\,\\bd = -\\cblue{f(\\bx^{(k)})}"}),` mit der
Jacobimatrix aus `,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.3",children:"Abschnitt 10.3"}),`; die nächste
Iterierte ist dann `,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\bd"}),`. Das ist teuer:
pro Schritt eine ganze Matrix von Ableitungen und eine Zerlegung.`]}),`
`,e.jsxs($e,{title:"Fixpunktiteration erster Ordnung",children:[e.jsxs(i.p,{children:[`Die einfachste Alternative ersetzt die Ableitung durch eine feste Zahl. Das
Ergebnis ist ein Nebenweg, aber ein lehrreicher: Es nimmt den Gradientenabstieg
aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," in Reinform vorweg."]}),e.jsxs(y,{kind:"Algorithmus",label:"12.1.15 (Fixpunktiteration erster Ordnung)",id:"env-fixpunktiteration-erster-ordnung",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"}),", ein Startpunkt ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),` und
eine Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma} > 0"}),". Für ",e.jsx(n,{children:"k = 1, 2, \\dots"})," setze"]}),e.jsx(ee,{tag:"12.1.2",id:"eq-fixpunktiteration-erster-ordnung",children:"\\cblue{\\bx^{(k)}} = \\cblue{\\bx^{(k-1)}} - \\corange{\\gamma\\, f(\\bx^{(k-1)})} ."})]}),e.jsxs(i.p,{children:["Der Name kommt daher, dass ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` eine
`,e.jsx(A,{id:"fixed-point-iteration",children:"Fixpunktiteration"})," ",e.jsx(n,{children:"\\bx \\mapsto g(\\bx)"}),` für
`,e.jsx(n,{children:"g(\\bx) := \\bx - \\corange{\\gamma} f(\\bx)"})," ist: Wegen ",e.jsx(n,{children:"\\corange{\\gamma} \\neq 0"}),`
gilt `,e.jsx(n,{children:"g(\\cgreen{\\bx^\\star}) = \\cgreen{\\bx^\\star}"}),` genau dann, wenn
`,e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull"})," ist. Fixpunkte von ",e.jsx(n,{children:"g"})," und Nullstellen von ",e.jsx(n,{children:"f"}),`
sind dasselbe.`]}),e.jsxs(i.p,{children:["Für affines ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"})," ist ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` übrigens wörtlich das
Richardson-Verfahren aus `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),`, und die dortige
Konvergenzbedingung ist der Spezialfall des folgenden Satzes.`]}),e.jsxs(y,{kind:"Satz",label:"12.1.16 (Konvergenzrate der Fixpunktiteration)",id:"env-konvergenzrate-der-fixpunktiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"})," in einer Umgebung von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`
differenzierbar mit `,e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull"}),", und sei"]}),e.jsx(ee,{tag:"12.1.3",id:"eq-konvergenzrate-der-fixpunktiteration",children:"\\corange{\\rho} := \\left\\|\\bI_n - \\corange{\\gamma\\,\\bJ_f(\\cgreen{\\bx^\\star})}\\right\\| < 1"}),e.jsxs(i.p,{children:["für eine ",e.jsx(A,{id:"matrix-norm",children:"induzierte Matrixnorm"}),`. Dann gibt es zu jedem
`,e.jsx(n,{children:"\\rho' \\in (\\corange{\\rho}, 1)"})," ein ",e.jsx(n,{children:"\\delta > 0"}),`, sodass für jeden Startpunkt mit
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\| \\le \\delta"}),` die Iteration
`,e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"})," gegen ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," konvergiert, und zwar mit"]}),e.jsx(_,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}\\right\\|
\\le (\\rho')^k \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\|
= O\\bigl((\\rho')^k\\bigr) .`}),e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," affin, so gilt die Schranke mit ",e.jsx(n,{children:"\\corange{\\rho}"}),` selbst und für jeden
Startpunkt.`]})]}),e.jsxs(tn,{children:[e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["die Zerlegung von ",e.jsx(n,{children:"f"})," ist ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-frechet-ableitung",children:"Definition 10.1.5"}),", die Fréchet-Differenzierbarkeit: Funktionswert gleich lineare Näherung plus Restterm, der schneller als linear verschwindet. Die Abschätzung benutzt danach die Dreiecksungleichung und die Verträglichkeit der induzierten Norm, ",e.jsx(n,{children:"\\left\\|\\bM\\bv\\right\\| \\le \\left\\|\\bM\\right\\|\\left\\|\\bv\\right\\|"})," (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),"). Genau hier wird die Aussage lokal: Sie gilt nur in einer Kugel um ",e.jsx(n,{children:"\\bx^\\star"}),", deren Radius von ",e.jsx(n,{children:"\\rho'"})," abhängt"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fehlerrekursion und Kontraktion."})," Schreiben wir ",e.jsx(n,{children:`\\be_k := \\cblue{\\bx^{(k)}} -
\\cgreen{\\bx^\\star}`}),". Weil ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` differenzierbar ist und
dort verschwindet, ist
`,e.jsx(n,{children:"f(\\cblue{\\bx^{(k-1)}}) = \\corange{\\bJ_f(\\cgreen{\\bx^\\star})}\\,\\be_{k-1} + r(\\be_{k-1})"}),`
mit `,e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\| = o(\\left\\|\\bh\\right\\|)"}),`. Einsetzen in
`,e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"})," und Abziehen von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` auf
beiden Seiten liefert`]}),e.jsx(_,{children:`\\be_k = \\bigl(\\bI_n - \\corange{\\gamma\\,\\bJ_f(\\cgreen{\\bx^\\star})}\\bigr)\\be_{k-1}
- \\corange{\\gamma}\\, r(\\be_{k-1}) ,
\\qquad\\text{also}\\qquad
\\left\\|\\be_k\\right\\| \\le \\corange{\\rho}\\left\\|\\be_{k-1}\\right\\|
+ \\corange{\\gamma}\\left\\|r(\\be_{k-1})\\right\\| .`}),e.jsxs(i.p,{children:["Sei nun ",e.jsx(n,{children:"\\rho' \\in (\\corange{\\rho}, 1)"}),` beliebig. Weil
`,e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\| / \\left\\|\\bh\\right\\| \\to 0"})," für ",e.jsx(n,{children:"\\bh \\to \\bnull"}),` gilt, gibt
es ein `,e.jsx(n,{children:"\\delta > 0"}),` mit
`,e.jsx(n,{children:"\\corange{\\gamma}\\left\\|r(\\bh)\\right\\| \\le (\\rho' - \\corange{\\rho})\\left\\|\\bh\\right\\|"}),`
für alle `,e.jsx(n,{children:"\\left\\|\\bh\\right\\| \\le \\delta"}),", und für ",e.jsx(n,{children:"\\left\\|\\be_{k-1}\\right\\| \\le \\delta"}),`
folgt daraus `,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le \\rho' \\left\\|\\be_{k-1}\\right\\|"}),"."]})]}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\rho' < 1"})," sorgt dafür, dass die Kugel nie verlassen wird; ohne diese Beobachtung wäre die Induktion nicht abgeschlossen"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktion."})," Ist ",e.jsx(n,{children:"\\left\\|\\be_0\\right\\| \\le \\delta"}),`, so ist
`,e.jsx(n,{children:"\\left\\|\\be_1\\right\\| \\le \\rho'\\left\\|\\be_0\\right\\| \\le \\delta"}),`, und dasselbe
Argument greift erneut. Per Induktion bleibt die ganze Folge in der Kugel und es
gilt `,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le (\\rho')^k \\left\\|\\be_0\\right\\|"}),`. Wegen
`,e.jsx(n,{children:"\\rho' < 1"})," konvergiert die rechte Seite gegen null."]})}),e.jsx(ne,{why:e.jsx(e.Fragment,{children:"eine affine Abbildung ist ihre eigene lineare Näherung, der Restterm entfällt"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der affine Fall."})," Ist ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"}),`, so ist
`,e.jsx(n,{children:"\\corange{\\bJ_f} = \\bA"})," konstant und ",e.jsx(n,{children:"r \\equiv \\bnull"}),`. Die Abschätzung aus
Schritt 1 gibt dann direkt
`,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le \\corange{\\rho}\\left\\|\\be_{k-1}\\right\\|"}),`, ohne
Einschränkung an den Startpunkt.`]})})]}),e.jsxs(i.p,{children:["Kurzgefasst lautet das Ergebnis ",e.jsx(n,{children:`\\left\\|\\cblue{\\bx^{(k)}} -
\\cgreen{\\bx^\\star}\\right\\| = O(\\corange{\\rho}^k)`}),`. Das trifft den Kern, unterschlägt
aber zwei Vorbehalte: Die Aussage gilt nur in der Nähe von `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, und
der Restterm verwässert die Rate im nichtaffinen Fall um ein beliebig kleines Stück.`]}),e.jsxs(i.p,{children:[`Eine Voraussetzung ist dabei leicht zu übersehen. Damit überhaupt ein
`,e.jsx(n,{children:"\\corange{\\gamma} > 0"})," mit ",e.jsx(n,{children:"\\corange{\\rho} < 1"}),` existiert, muss die Ableitung im
Zielpunkt in die richtige Richtung zeigen: Im Eindimensionalen ist
`,e.jsx(n,{children:"\\corange{\\rho} = \\left|1 - \\corange{\\gamma f'(x^\\star)}\\right| < 1"}),` genau für
`,e.jsx(n,{children:"0 < \\corange{\\gamma} < 2/\\corange{f'(x^\\star)}"}),`, und das setzt
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} > 0"})," voraus. Ist ",e.jsx(n,{children:"f"}),` dort fallend, so treibt uns
`,e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"})," mit positivem ",e.jsx(n,{children:"\\corange{\\gamma}"}),` von der
Nullstelle weg – das Gegenmittel ist wohlfeil, wir arbeiten mit `,e.jsx(n,{children:"-f"}),`, das dieselben
Nullstellen hat. Deshalb wird die Fixpunktiteration oft gleich mit der Annahme
formuliert, `,e.jsx(n,{children:"f"})," sei monoton steigend."]}),e.jsxs(y,{kind:"Bemerkung",label:"12.1.17 (Das Dilemma der Schrittweite)",id:"env-das-dilemma-der-schrittweite",children:[e.jsxs(i.p,{children:[`Die Vor- und Nachteile des Verfahrens hängen an einer einzigen Zahl. Positiv:
Es ist denkbar simpel, funktioniert für multivariates `,e.jsx(n,{children:"f"}),` und braucht keine
Jacobimatrix, sondern nur Funktionsauswertungen; bei gutartigem `,e.jsx(n,{children:"f"}),`, also kleinem
`,e.jsx(n,{children:"\\corange{\\rho}"}),`, ist es zudem schnell. Negativ: Die Schrittweite
`,e.jsx(n,{children:"\\corange{\\gamma}"})," muss passen."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu klein"})," heißt langsam. Mit ",e.jsx(n,{children:"\\corange{\\rho}"})," nahe bei ",e.jsx(n,{children:"1"}),` schrumpft der Fehler
pro Schritt kaum, und wir brauchen `,e.jsx(n,{children:"\\log(10)/(-\\log\\corange{\\rho})"}),` Schritte je
Dezimalstelle. `,e.jsx(i.em,{children:"Zu groß"}),` heißt, dass der Schritt über die Nullstelle hinausschießt
und dabei größer wird als der Fehler, den er beheben sollte. Dann ist
`,e.jsx(n,{children:"\\cred{\\rho \\ge 1}"}),", und ",e.jsx(i.a,{href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"})," sagt nichts mehr zu."]}),e.jsxs(i.p,{children:[`Wie eng das Fenster ist, lässt sich im symmetrisch positiv definiten Fall exakt
angeben. Hat `,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx^\\star)}"}),` die Eigenwerte
`,e.jsx(n,{children:"0 < \\lambda_{\\min} \\le \\dots \\le \\lambda_{\\max}"}),", so ist"]}),e.jsx(_,{children:`\\corange{\\gamma^\\star} = \\frac{2}{\\lambda_{\\min} + \\lambda_{\\max}}
\\qquad \\text{mit} \\qquad
\\corange{\\rho} = \\frac{\\lambda_{\\max} - \\lambda_{\\min}}{\\lambda_{\\max} + \\lambda_{\\min}}
= \\frac{\\kappa - 1}{\\kappa + 1}`}),e.jsxs(i.p,{children:["die beste Wahl, und für ",e.jsx(n,{children:"\\cred{\\gamma > 2/\\lambda_{\\max}}"}),` läuft die Iteration von
jedem Startpunkt aus auseinander, dessen Fehler einen Anteil in der steilsten
Eigenrichtung hat. Beides steht in `,e.jsx(i.a,{href:"#env-gradientenabstieg-auf-einer-quadrik",children:"Satz 12.3.15"}),`, wo
dieselbe Eigenzerlegung von `,e.jsx(n,{children:"\\bI - \\gamma\\bA"}),` den Gradientenabstieg trägt: Dort ist
`,e.jsx(n,{children:"\\max_i\\left|1 - \\gamma\\lambda_i\\right|"}),` der Fehlerfaktor, und
`,e.jsx(n,{children:"\\corange{\\gamma^\\star}"}),` ist genau die Schrittweite, die ihn kleinstmöglich macht –
nur steht dort die Hesse-Matrix, wo hier die Jacobimatrix steht. Der Buchstabe
`,e.jsx(n,{children:"\\kappa = \\lambda_{\\max}/\\lambda_{\\min}"}),` ist die
`,e.jsx(A,{id:"condition-number",children:"Konditionszahl"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`. Schlechte Kondition heißt also
wörtlich langsame Konvergenz: Bei `,e.jsx(n,{children:"\\kappa = 10"}),` ist selbst die beste Rate noch
`,e.jsx(n,{children:"9/11 = 0{,}818"}),`. Und wer die optimale Schrittweite verdoppelt, landet stets auf
oder jenseits der Divergenzgrenze, denn `,e.jsx(n,{children:`4/(\\lambda_{\\min} + \\lambda_{\\max}) \\ge
2/\\lambda_{\\max}`})," mit Gleichheit nur für ",e.jsx(n,{children:"\\lambda_{\\min} = \\lambda_{\\max}"}),"."]}),e.jsxs(i.p,{children:[`Im Eindimensionalen ist die beste Wahl besonders sprechend. Dort drückt
`,e.jsx(n,{children:"\\corange{\\gamma^\\star} = 1/\\corange{f'(x^\\star)}"}),` die Rate auf
`,e.jsx(n,{children:"\\corange{\\rho} = 0"}),`, und die Iteration ist nichts anderes als das
Newton-Verfahren mit eingefrorener Ableitung. Der Haken ist offensichtlich: Wir
müssten `,e.jsx(n,{children:"\\corange{f'(x^\\star)}"}),` schon kennen. Newton umgeht das, indem es die
Ableitung in jedem Schritt neu auswertet, und bezahlt sie mit einer Auswertung
pro Schritt.`]}),e.jsxs(i.p,{children:["In der Praxis wählen wir ",e.jsx(n,{children:"\\corange{\\gamma_k}"}),` adaptiv, etwa durch eine
Liniensuche: Ein zu großer Vorschlag wird verkleinert, bis er genügend Fortschritt
liefert. Die akzeptierten Schrittweiten müssen dabei nicht gegen null gehen.
Folgen mit `,e.jsx(n,{children:"\\corange{\\gamma_k}\\to0"}),` spielen später beim stochastischen
Gradientenabstieg eine eigene Rolle und brauchen dort zusätzliche Bedingungen.
Die deterministische Schrittweitensteuerung behandelt
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]})]}),e.jsx(i.p,{children:`Bleibt die Frage, wie weit uns diese Schranke trägt. Sie hängt an einer einzigen
Zahl, und die lässt sich für drei kleine Systeme durchspielen: Ab welcher
Schrittweite kippt die Iteration?`}),e.jsxs(ze,{title:"Die Schrittweite als Regler",children:[e.jsxs(i.p,{children:["Alle drei Beispiele sind affin, ",e.jsx(n,{children:"f(\\bx) = \\bA(\\bx - \\cgreen{\\bx^\\star})"}),` mit
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} = \\bnull"}),". Damit ist die Jacobimatrix überall ",e.jsx(n,{children:"\\bA"}),`, und
`,e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bI - \\corange{\\gamma}\\bA\\right\\|_2"}),` ist nach dem
affinen Fall im Beweis eine echte Schranke ohne Restterm.`]}),e.jsx(Ge,{frage:e.jsxs(e.Fragment,{children:["Das dritte System hat ",e.jsx(n,{children:"\\bA = \\diag(1, 10)"}),", also Kondition ",e.jsx(n,{children:"10"}),". Ab welchem ",e.jsx(n,{children:"\\gamma"})," divergiert es?"]}),loesung:.2,toleranz:.03,einheit:"γ",verdeckt:e.jsxs(e.Fragment,{children:["Die Grenze liegt bei ",e.jsx(n,{children:"2/\\lambda_{\\max} = 0{,}2"}),", das beste erreichbare ",e.jsx(n,{children:"\\rho"})," bei ",e.jsx(n,{children:"9/11 = 0{,}818"}),"."]}),children:e.jsx(Nt,{})}),e.jsxs(i.p,{children:["Entschieden wird alles von ",e.jsx(n,{children:"\\corange{\\rho}"}),`. Das erste System ist symmetrisch mit
den Eigenwerten `,e.jsx(n,{children:"4{,}618"})," und ",e.jsx(n,{children:"2{,}382"}),`; die Voreinstellung
`,e.jsx(n,{children:"\\corange{\\gamma} = 0{,}25"}),` ist die aus dem Richardson-Beispiel in
`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"})," und liefert dieselbe Rate ",e.jsx(n,{children:"0{,}4045"}),`, das Optimum
liegt bei `,e.jsx(n,{children:"\\corange{\\gamma^\\star} = 2/7"})," mit ",e.jsx(n,{children:"\\corange{\\rho} = 0{,}319"}),`. Beim
zweiten sind die Eigenwerte komplex, der Weg wird zur Spirale, und der Drehanteil
lässt sich durch keine Schrittweite wegregeln: Selbst im Optimum bleibt
`,e.jsx(n,{children:"2/\\sqrt 5 = 0{,}894"}),". Das dritte führt ",e.jsx(i.a,{href:"#env-das-dilemma-der-schrittweite",children:"Bemerkung 12.1.17"}),`
vor – bei `,e.jsx(n,{children:"\\corange{\\gamma} = 0{,}25"})," ist ",e.jsx(n,{children:"\\corange{\\rho} = 1{,}5"}),`, erst unterhalb
von `,e.jsx(n,{children:"0{,}2"})," läuft die Iteration zusammen, und die beste Rate bleibt ",e.jsx(n,{children:"9/11"}),`.
Sehenswert ist dort das Zickzack: Die steile Richtung überschießt, während die
flache kaum vorankommt – dasselbe Bild wie beim Gradientenabstieg in
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]})]}),e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"})," ist die Fixpunktiteration ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` genau das
Richardson-Verfahren aus `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),"."]}),e.jsxs(i.p,{children:["Einsetzen gibt ",e.jsx(n,{children:"\\bx^{(k)} = \\bx^{(k-1)} - \\gamma(\\bA\\bx^{(k-1)} - \\bb)"}),`, also die
Korrektur des Residuums mit fester Schrittweite. Die dortige Konvergenzbedingung
`,e.jsx(n,{children:"\\left\\|\\bI - \\gamma\\bA\\right\\| < 1"})," ist wörtlich ",e.jsx(i.a,{href:"#eq-konvergenzrate-der-fixpunktiteration",children:"(12.1.3)"}),", und weil ",e.jsx(n,{children:"f"}),` affin
ist, greift der affine Fall im Beweis von `,e.jsx(i.a,{href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"}),`: Die Schranke gilt für jeden
Startpunkt.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\rho = \\left\\|\\bI_n - \\gamma\\bJ_f(\\bx^\\star)\\right\\| < 1"}),`, so konvergiert
die Fixpunktiteration von jedem Startpunkt aus gegen `,e.jsx(n,{children:"\\bx^\\star"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"})," ist eine ",e.jsx(i.em,{children:"lokale"}),` Aussage: Die Schranke im Beweis gilt nur in
einer Kugel um `,e.jsx(n,{children:"\\bx^\\star"}),`, deren Radius wir nicht kennen. Weiter draußen taugt
die lineare Näherung nichts mehr, und die Iteration kann zu einer anderen
Nullstelle laufen oder ganz davonlaufen. Nur im affinen Fall verschwindet der
Restterm und die Aussage wird global.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Verdoppeln wir im symmetrisch positiv definiten Fall die optimale Schrittweite,
so ist die Konvergenzgarantie verloren.`}),e.jsxs(i.p,{children:["Die optimale Wahl ist ",e.jsx(n,{children:"\\gamma^\\star = 2/(\\lambda_{\\min} + \\lambda_{\\max})"}),`,
divergiert wird ab `,e.jsx(n,{children:"2/\\lambda_{\\max}"}),`. Wegen
`,e.jsx(n,{children:"4/(\\lambda_{\\min} + \\lambda_{\\max}) \\ge 2/\\lambda_{\\max}"}),` liegt das Doppelte
immer auf oder jenseits der Grenze, mit Gleichheit nur für
`,e.jsx(n,{children:"\\lambda_{\\min} = \\lambda_{\\max}"}),". Bei ",e.jsx(n,{children:"\\bA = \\diag(1, 10)"}),` etwa ist
`,e.jsx(n,{children:"\\gamma^\\star = 2/11 = 0{,}18"})," und die Grenze ",e.jsx(n,{children:"0{,}2"}),"; das Doppelte ",e.jsx(n,{children:"0{,}36"}),`
liegt weit darüber.`]})]})]})]}),`
`,e.jsxs(i.p,{children:[`Damit ist der Werkzeugkasten für Nullstellen beisammen. Für die Optimierung ist
allerdings gerade die Monotonie heikel, von der die Fixpunktiteration lebt: Der
Gradient einer beliebigen Zielfunktion ist im Allgemeinen nicht monoton.
`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),` setzt deshalb neu an und fragt zuerst, was ein
Minimum überhaupt auszeichnet.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Das Bisektionsverfahren braucht die Ableitung von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Es braucht nur Funktionswerte, genauer sogar nur deren Vorzeichen, und einen
Startbereich mit Vorzeichenwechsel. Das ist seine große Stärke: Es funktioniert
für nicht differenzierbare, nur numerisch auswertbare oder schlicht hässliche
Funktionen, und es kann nach `,e.jsx(i.a,{href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` nicht divergieren. Dafür kostet jede
weitere gültige Dezimalstelle rund `,e.jsx(n,{children:"3{,}3"}),` Schritte, während Newton in der Nähe
der Nullstelle ihre Zahl verdoppelt.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Eine zusätzliche gültige Dezimalstelle kostet die Bisektion rund ",e.jsx(n,{children:"3{,}3"}),`
Schritte.`]}),e.jsxs(i.p,{children:[`Jeder Schritt halbiert die Intervalllänge, gewinnt also genau ein Bit oder
`,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),` Dezimalstellen. Für eine ganze Stelle brauchen wir
`,e.jsx(n,{children:"1/\\log_{10} 2 = 3{,}32"})," Schritte. Nach ",e.jsx(i.a,{href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` sind das für
`,e.jsx(n,{children:"[1, 2]"})," und ",e.jsx(n,{children:"\\epsilon = 10^{-6}"})," zusammen ",e.jsx(n,{children:"20"})," Durchläufe."]})]}),e.jsxs(Ri,{loesung:1.39,toleranz:.06,children:[e.jsxs(i.p,{children:["Ab welchem ",e.jsx(n,{children:"\\left|x^{(0)}\\right|"})," läuft Newton auf ",e.jsx(n,{children:"f(x) = \\arctan x"}),`
auseinander?`]}),e.jsxs(i.p,{children:["Die Schwelle liegt bei ",e.jsx(n,{children:"1{,}3917"}),"; sie löst ",e.jsx(n,{children:"\\arctan(\\xi)(1+\\xi^2) = 2\\xi"}),`.
Darunter zieht sich das Pendeln zusammen, darüber wächst es. Dass es überhaupt
eine solche Schwelle gibt, obwohl die Funktion nur eine einzige Nullstelle hat,
ist die Pointe von `,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),": Quadratische Konvergenz ist eine ",e.jsx(i.em,{children:"lokale"}),`
Aussage, und wie groß die Umgebung ist, sagt sie nicht.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:`Das Newton-Raphson-Verfahren konvergiert quadratisch, gleichgültig wo wir starten
und welche Nullstelle wir suchen.`}),e.jsxs(i.p,{children:[`Beides ist zu viel versprochen. Quadratisch wird es erst in der Nähe der
Nullstelle, und nur wenn diese einfach ist, also
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} \\neq 0"}),` gilt. Bei einer mehrfachen Nullstelle sinkt die
Ordnung auf `,e.jsx(n,{children:"1"}),`, und weit weg vom Ziel kann die Tangente die Iteration beliebig
weit forttragen (`,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §5.1 ordnet Existenz, Eindeutigkeit und Konvergenzraten von
Nullstellenproblemen ein, §5.5 behandelt Bisektion, Fixpunktiteration und Newton
im Eindimensionalen, §5.6 die Systeme. Heath Kapitel 6 ist der Optimierung
gewidmet und trägt die folgenden Abschnitte dieses Kapitels.`})})]})}function At(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Sr,{...r})}):Sr(r)}const qe=K.blau,Vi=K.gruen,Ii=K.rot,ci=K.orange,yr=K.violett,H=2,_e=300,Ye=30,Mr=16,Dr=10,Un=8,fe=r=>Ye+(r+H)/(2*H)*_e,ke=r=>_e-(r+H)/(2*H)*_e,oi=(r,i)=>r*r-i*i;function Nr(r,i){const t=[];for(let l=0;l<=120;l++){const d=-H+2*H*l/120;if(r>0){const s=i*Math.sqrt(r+d*d);Math.abs(s)<=H&&t.push(`${fe(s).toFixed(1)},${ke(d).toFixed(1)}`)}else{const s=i*Math.sqrt(-r+d*d);Math.abs(s)<=H&&t.push(`${fe(d).toFixed(1)},${ke(s).toFixed(1)}`)}}return t.join(" ")}const Ar=[.5,1,2,3],_r=[-.5,-1,-2,-3],_t=[{name:"Abstieg entkommt",x:1.5,y:.4,gamma:.25,bahn:!0},{name:"Startstrahl y = 0",x:1.5,y:0,gamma:.25,bahn:!0},{name:"Newton von schräg",x:1.7,y:-.9,gamma:.25,bahn:!1}];function Ft(){const[r,i]=F.useState(1.5),[t,h]=F.useState(.4),[l,d]=F.useState(.25),[s,o]=F.useState(!0),[f,u]=F.useState(!1),b=a=>Math.round(a*20)/20,S=(a,G)=>{i(b(a)),h(b(G)),u(!1)},x=$i({feld:{x0:Ye,y0:0,w:_e,h:_e},welt:{x0:-H,x1:H,y0:-H,y1:H},clamp:([a,G])=>[kn(a,-H,H),kn(G,-H,H)],snap:.05,greifPosition:()=>[r,t],onDrag:([a,G])=>S(a,G)}),z=2*r,R=-2*t,j=Math.hypot(z,R),m=oi(r,t),k=F.useMemo(()=>{const a=[[r,t]];for(let G=0;G<Un;G++){const[me,sn]=a[G];a.push([me*(1-2*l),sn*(1+2*l)])}return a},[r,t,l]),D=k[Un],L=k.some(([a,G])=>Math.abs(a)>H||Math.abs(G)>H),c=j>1e-9?Math.min(.9,.25+.15*j):0,v=j>1e-9?[r-z/j*c,t-R/j*c]:[r,t],W=1e-9,I=Math.abs(t)<W,M=Math.abs(r)<W,g=Math.abs(1-2*l),q=1+2*l;let U;I&&M?U="stationaer":I?U="strahl":M?U="achseY":U="entkommt";const P={stationaer:{kind:"neutral",titel:"im stationären Punkt",text:`Der Gradient ist null, es gibt also keinen Pfeil, und jedes Verfahren bleibt stehen, wo es steht. Trotzdem liegt hier weder ein Minimum noch ein Maximum: In jeder noch so kleinen Umgebung gibt es Punkte auf der grünen Achse mit größerem und Punkte auf der roten Achse mit kleinerem Funktionswert. Genau das meint ${O("bemerkung:was-sattelpunkte-fuer-die-verfahren")} mit „Sattelpunkt".`},strahl:{kind:"warn",titel:"der Sonderfall y = 0",text:`Auf der grünen Achse zeigt der Gradient nur in x-Richtung, und der Abstieg bleibt auf der Achse: y bleibt exakt null, x schrumpft mit dem Faktor ${Z(g)} pro Schritt und steht nach ${Un} Schritten bei ${Z(D[0],4)}. Hier läuft also auch der Gradientenabstieg in den Sattelpunkt hinein. Dieser eine Startstrahl ist die Ausnahme: Er hat in der Ebene Maß null, weshalb ihn ein zufälliger Startpunkt mit Wahrscheinlichkeit null trifft.`},achseY:{kind:"fail",titel:"auf der Maximumsachse",text:`Auf der roten Achse ist f nach unten geöffnet, und der Abstieg folgt genau dieser Richtung: |y| wächst in jedem Schritt um den Faktor ${Z(q)} und steht nach ${Un} Schritten bei ${Z(D[1],3)}. Der Funktionswert fällt dabei zwar in jedem Schritt, nur eben ins Bodenlose. Ein Minimum findet das Verfahren so nie.`},entkommt:{kind:"ok",titel:"der Abstieg entkommt",text:`Beide Komponenten sind besetzt, und der Abstieg behandelt sie gegenläufig: x drückt er mit dem Faktor ${Z(g)} pro Schritt gegen null, y bläst er mit dem Faktor ${Z(q)} auf. Nach ${Un} Schritten steht er bei (${Z(D[0],3)}; ${Z(D[1],3)}), also praktisch auf der roten Achse und weit weg vom Sattel. Der Gradientenabstieg bleibt an einem Sattelpunkt nicht hängen (${O("bemerkung:was-sattelpunkte-fuer-die-verfahren")}); dass er dabei überhaupt nichts findet, ist eine andere Geschichte.`}}[U],w=[{f:a=>a*a,color:Vi,label:"f(t, 0) = t²"},{f:a=>-a*a,color:Ii,label:"f(0, t) = −t²"}],[E,te]=F.useState({azimuth:40,elevation:24}),ue=F.useMemo(()=>({f:oi,nx:30,ny:30,color:qe,opacity:.82,wire:!0}),[]),p=F.useMemo(()=>[{p:[0,0,0],color:yr,r:4.5,label:"x*",onTop:!0},{p:[r,t,oi(r,t)],color:qe,r:4.5,onTop:!0}],[r,t]),B=F.useMemo(()=>{if(!s)return[];const a=k.filter(([G,me])=>Math.abs(G)<=H&&Math.abs(me)<=H).map(([G,me])=>[G,me,oi(G,me)]);return a.length>1?[{pts:a,color:qe,width:2,dash:"4 3",onTop:!0}]:[]},[k,s]),X={stationaer:"der Punkt sitzt genau im Sattel",strahl:"der Punkt sitzt auf dem aufsteigenden Grat",achseY:"der Punkt sitzt auf dem abfallenden Grat",entkommt:"der Punkt sitzt auf einer der Flanken"},$=a=>a?Re:Ne;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Ziehen wir den blauen Punkt über die Fläche und lassen den Abstieg laufen: Von welchen Startpunkten aus landet er im Sattel?"}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:_t.map(a=>{const G=r===a.x&&t===a.y&&l===a.gamma;return e.jsx("button",{type:"button","aria-pressed":G,className:$(G),onClick:()=>{i(a.x),h(a.y),d(a.gamma),o(a.bahn),u(!1)},children:a.name},a.name)})}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:Ye},children:"y ↑"}),e.jsxs("svg",{viewBox:`0 0 ${Ye+_e+Dr} ${_e+Mr}`,width:Ye+_e+Dr,height:_e+Mr,role:"img","aria-label":`Höhenlinien von f(x, y) = x² − y² mit dem Punkt (${Z(r)}; ${Z(t)}); ${X[U]}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",...x.svgProps,children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s132-clip",children:e.jsx("rect",{x:Ye,y:0,width:_e,height:_e})}),e.jsx("marker",{id:"s132-pfeil",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:ci})})]}),[-2,-1,0,1,2].map(a=>e.jsxs("g",{children:[e.jsx("text",{x:Ye-4,y:ke(a)+3,textAnchor:"end",fill:"#64748b",fontSize:10,children:Z(a,0)}),e.jsx("text",{x:fe(a),y:_e+12,textAnchor:"middle",fill:"#64748b",fontSize:10,children:Z(a,0)})]},`t${a}`)),e.jsxs("g",{clipPath:"url(#s132-clip)",children:[Ar.map(a=>[1,-1].map(G=>e.jsx("polyline",{points:Nr(a,G),fill:"none",stroke:"#94a3b8",strokeWidth:1},`p${a}${G}`))),_r.map(a=>[1,-1].map(G=>e.jsx("polyline",{points:Nr(a,G),fill:"none",stroke:"#94a3b8",strokeWidth:1,strokeDasharray:"4 3"},`n${a}${G}`))),e.jsx("line",{x1:fe(-H),y1:ke(-H),x2:fe(H),y2:ke(H),stroke:"#475569",strokeWidth:1.8}),e.jsx("line",{x1:fe(-H),y1:ke(H),x2:fe(H),y2:ke(-H),stroke:"#475569",strokeWidth:1.8}),e.jsx("line",{x1:fe(-H),y1:ke(0),x2:fe(H),y2:ke(0),stroke:Vi,strokeWidth:2.4}),e.jsx("line",{x1:fe(0),y1:ke(-H),x2:fe(0),y2:ke(H),stroke:Ii,strokeWidth:2.4}),s&&e.jsxs(e.Fragment,{children:[e.jsx("polyline",{points:k.map(([a,G])=>`${fe(a).toFixed(1)},${ke(G).toFixed(1)}`).join(" "),fill:"none",stroke:qe,strokeWidth:1.4,strokeDasharray:"3 3"}),k.slice(1).map(([a,G],me)=>e.jsx("circle",{cx:fe(a),cy:ke(G),r:3,fill:qe,opacity:.65},`b${me}`))]}),j>1e-9&&e.jsx("line",{x1:fe(r),y1:ke(t),x2:fe(v[0]),y2:ke(v[1]),stroke:ci,strokeWidth:2.2,markerEnd:"url(#s132-pfeil)"}),e.jsx("circle",{cx:fe(0),cy:ke(0),r:7,fill:"none",stroke:yr,strokeWidth:2}),e.jsx(Gi,{x:fe(r),y:ke(t),farbe:qe,r:5,aktiv:x.dragging==="p",...x.handleProps("p")})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:Ye},children:"x →"})]}),e.jsxs("div",{className:"min-w-0 max-w-full",children:[e.jsx(br,{size:280,xDomain:[-H,H],yDomain:[-H,H],zDomain:[-4,4],surface:ue,contours:[..._r,0,...Ar],contourColor:qe,points:p,curves:B,labels:{x:"x",y:"y",z:"f"},azimuth:E.azimuth,elevation:E.elevation,onViewChange:te,ariaLabel:`Die Sattelfläche f(x, y) = x² − y² über der Ebene; ${X[U]}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:E,onChange:te})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche. Der violette Punkt ist derselbe stationäre Punkt, der blaue derselbe wie links, die gestrichelte blaue Kurve dieselbe Bahn, nur auf die Fläche gehoben. Ziehen dreht die Ansicht."})]}),e.jsxs("div",{children:[e.jsx(xt,{xLabel:"t",yLabel:"f",series:w,xDomain:[-2,2],yDomain:[-4,4],width:300,height:300,markers:[{x:r,y:r*r,color:Vi},{x:t,y:-t*t,color:Ii}]}),e.jsx("p",{className:"mt-1 max-w-[300px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion, aber nur auf den beiden Achsen: grün mit dem Minimum in t = 0, rot mit dem Maximum dort. Die beiden Marken sitzen bei t = x beziehungsweise t = y. Ein und derselbe Punkt ist für die eine Richtung der tiefste und für die andere der höchste der Gegend."})]})]}),e.jsx(re,{label:"x",value:r,onChange:a=>S(a,t),min:-2,max:2,step:.05,accent:qe}),e.jsx(re,{label:"y",value:t,onChange:a=>S(r,a),min:-2,max:2,step:.05,accent:qe}),e.jsx(re,{label:"γ (Schrittweite)",value:l,onChange:a=>d(Math.round(a*20)/20),min:.05,max:.45,step:.05,accent:ci}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button","aria-pressed":s,className:$(s),onClick:()=>o(a=>!a),children:s?"Abstieg ausblenden":"Gradientenabstieg zeigen"}),e.jsx("button",{type:"button",className:Ne,onClick:()=>{i(0),h(0),u(!0)},children:"ein Newton-Schritt"})]}),e.jsxs("div",{className:"max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:[e.jsxs("p",{children:["Punkt"," ",e.jsxs("span",{className:"font-mono",style:{color:qe},children:["(",Z(r),"; ",Z(t),")"]}),", Funktionswert ",e.jsx("span",{className:"font-mono",children:Z(m)}),", Gradient"," ",e.jsxs("span",{className:"font-mono",style:{color:ci},children:["(",Z(z),"; ",Z(R),")"]})," ","mit Norm ",e.jsx("span",{className:"font-mono",children:Z(j)})]}),e.jsxs("p",{children:["Hesse-Matrix ",e.jsx("span",{className:"font-mono",children:"H = (2 0; 0 −2)"}),", überall dieselbe; Eigenwerte ",e.jsx("span",{className:"font-mono",children:"λ₁ = 2"})," zur x-Richtung und"," ",e.jsx("span",{className:"font-mono",children:"λ₂ = −2"})," zur y-Richtung, also"," ",e.jsx("span",{className:"font-semibold",children:"indefinit"}),"."]}),e.jsxs("p",{children:["Abstiegsfaktoren pro Schritt: ",e.jsxs("span",{className:"font-mono",children:["|1 − 2γ| = ",Z(g)]})," in x-Richtung, ",e.jsxs("span",{className:"font-mono",children:["1 + 2γ = ",Z(q)]})," in y-Richtung."]})]}),e.jsxs(ye,{kind:P.kind,titel:P.titel,children:[P.text,f&&e.jsxs(e.Fragment,{children:[" ","Der Newton-Schritt hat gerade auf (0; 0) gezeigt, und zwar von jedem Startpunkt aus: f ist quadratisch, seine Taylornäherung zweiten Grades also exakt, und der einzige stationäre Punkt dieser Näherung ist der Sattel. Newton sucht Nullstellen des Gradienten, nicht Minima."]}),s&&L&&e.jsxs(e.Fragment,{children:[" ","Die gestrichelte Bahn verlässt das gezeigte Fenster; gerechnet wird sie weiter bis zu dem Endpunkt, den dieses Verdikt nennt."]})]})]})}function Fr(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Vom Nullstellen- zum Optimierungsproblem"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"})," hat Gleichungen gelöst: gesucht war ein ",e.jsx(n,{children:"x"}),` mit
`,e.jsx(n,{children:"f(x) = 0"}),`. Ab hier suchen wir etwas anderes, nämlich die Stelle, an der eine
Funktion ihren kleinsten Wert annimmt. Für die Statistik ist das der Normalfall.
Kleinste Quadrate minimieren eine Residuenquadratsumme, Maximum-Likelihood
maximiert eine Log-Likelihood, ein neuronales Netz minimiert einen empirischen
Verlust. In allen drei Fällen steht am Ende dieselbe Frage: Wo liegt das Optimum,
und woran erkennen wir es, wenn wir dort sind?`]}),`
`,e.jsxs(i.p,{children:[`Dieser Abschnitt beantwortet die zweite Hälfte der Frage. Er sagt, was ein
Optimum ist, welche Bedingungen an einer optimalen Stelle gelten und warum
`,e.jsx(A,{id:"convexity",children:"Konvexität"}),` den Unterschied zwischen „irgendein Minimum" und „das
Minimum" ausmacht. Die Verfahren, die das Optimum dann tatsächlich suchen, kommen
in den Abschnitten `,e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"}),"."]}),`
`,e.jsxs(i.p,{children:[`Der Farbcode des Kapitels: blau die Iterierten eines Verfahrens, grün das Optimum
und Grenzwerte, rot die Richtungen, in denen etwas davonläuft, und Nebenbedingungen.
Gradient und Hesse-Matrix behalten das Orange aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Kapitel 10"}),`; aus ihnen bauen die Verfahren ihre
Suchrichtungen. Der stationäre Punkt des Sattelbeispiels bekommt Violett, weil er
keine dieser Rollen spielt.`]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.2.1 (Lokales und globales Minimum)",id:"env-lokales-und-globales-minimum",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\Xcal \\subseteq \\R^n"})," die ",e.jsx(i.em,{children:"zulässige Menge"}),` (feasible set) und
`,e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"})," die ",e.jsx(A,{id:"objective-function",children:"Zielfunktion"}),` (objective
function), das Problem also`]}),e.jsx(ee,{tag:"12.2.1",id:"eq-lokales-und-globales-minimum",children:"\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\Xcal} f(\\bx) ."}),e.jsxs(i.p,{children:["Ein Punkt ",e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in \\Xcal"})," heißt"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"globales Minimum"}),", wenn ",e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) \\le f(\\bx)"}),` für alle
`,e.jsx(n,{children:"\\bx \\in \\Xcal"})," gilt;"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"lokales Minimum"}),", wenn es eine ",e.jsx(A,{id:"neighborhood",children:"Umgebung"})," ",e.jsx(n,{children:"U"}),` von
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," gibt, sodass ",e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) \\le f(\\bx)"}),` für alle
`,e.jsx(n,{children:"\\bx \\in U \\cap \\Xcal"})," gilt."]}),`
`]}),e.jsxs(i.p,{children:["Gilt jeweils die strikte Ungleichung für ",e.jsx(n,{children:"\\bx \\neq \\cgreen{\\bx^\\star}"}),`, so heißt das
Minimum `,e.jsx(i.em,{children:"strikt"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Das Problem ",e.jsx(i.a,{href:"#eq-lokales-und-globales-minimum",children:"(12.2.1)"})," hat ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` schon aufgeschrieben, dort mit
`,e.jsx(n,{children:"S"})," für die zulässige Menge. Wir schreiben hier ",e.jsx(n,{children:"\\Xcal"}),", weil der Buchstabe ",e.jsx(n,{children:"S"}),` in
den Sätzen unten für den offenen Definitionsbereich gebraucht wird. Neu ist die
Unterscheidung zwischen lokal und global, und um die dreht sich der ganze
Abschnitt.`]}),`
`,e.jsxs(i.p,{children:["Zwei Sprachfallen stecken in der Schreibweise. Erstens ist ",e.jsx(n,{children:"\\argmin"}),` streng
genommen die Menge aller Minimierer; wir schreiben
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` für ein Element daraus, sofern überhaupt eines existiert.
Zweitens meint „unbeschränkte Optimierung" die Optimierung ohne
Nebenbedingungen, also `,e.jsx(n,{children:"\\Xcal = \\R^n"}),`, und nicht etwa eine unbeschränkte Funktion.
Die Sätze zur Konvexität unten formulieren wir trotzdem für eine allgemeine
zulässige Menge, weil gerade dort sichtbar wird, was `,e.jsx(n,{children:"\\Xcal"}),` beiträgt; die
Verfahren der Abschnitte `,e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"}),` arbeiten dann
durchweg mit `,e.jsx(n,{children:"\\Xcal = \\R^n"}),`, und wie Nebenbedingungen die Bedingungen ändern,
klärt `,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.2 (Maximieren ist Minimieren)",id:"env-maximieren-ist-minimieren",children:[e.jsx(i.p,{children:`Ein Maximierungsproblem müssen wir nicht getrennt behandeln. Eine einzige
Zeile hält das fest, und sie meint zweierlei:`}),e.jsx(_,{children:`\\max_{\\bx \\in \\Xcal} f(\\bx) = -\\min_{\\bx \\in \\Xcal}\\bigl(-f(\\bx)\\bigr) ,
\\qquad
\\argmax_{\\bx \\in \\Xcal} f(\\bx) = \\argmin_{\\bx \\in \\Xcal}\\bigl(-f(\\bx)\\bigr) .`}),e.jsxs(i.p,{children:[`Die Werte kippen im Vorzeichen, die Argumente bleiben dieselben; die zweite
Gleichung stand schon in `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`. Deshalb sind die gängigen
Bibliotheken Minimierer, und deshalb heißt die Zielfunktion der
Maximum-Likelihood-Schätzung dort in aller Regel die `,e.jsx(i.em,{children:"negative"}),`
`,e.jsx(A,{id:"likelihood",children:"Log-Likelihood"}),". Wir formulieren im Folgenden alles für Minima."]})]}),`
`,e.jsx(i.h3,{children:"Die Bedingung erster Ordnung"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` hat die Bedingung schon benutzt, und
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Kapitel 10"}),` hat um kritische Punkte herum das
Hesse-Kriterium gebaut. Bewiesen haben wir die Bedingung selbst an keiner der
beiden Stellen. Für die Optimierung ist sie der Ausgangspunkt jedes Verfahrens,
deshalb holen wir den Beweis hier nach.`]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.2.3 (Notwendige Bedingung erster Ordnung)",id:"env-notwendige-bedingung-erster-ordnung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f\\colon S \\to \\R"})," und ",e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in S"}),`
ein lokales Minimum von `,e.jsx(n,{children:"f"}),". Ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` differenzierbar, so
gilt`]}),e.jsx(ee,{tag:"12.2.2",id:"eq-notwendige-bedingung-erster-ordnung",children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})} = \\bnull^\\top ."}),e.jsx(i.p,{children:"Dieselbe Aussage gilt für lokale Maxima."})]}),`
`,e.jsxs(tn,{children:[e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["Für kleine ",e.jsx(n,{children:"\\left|t\\right|"})," liegt ",e.jsx(n,{children:"\\bx^\\star + t\\bh"})," in der Umgebung ",e.jsx(n,{children:"U"})," aus ",e.jsx(i.a,{href:"#env-lokales-und-globales-minimum",children:"Definition 12.2.1"}),", dort ist ",e.jsx(n,{children:"f(\\bx^\\star) \\le f(\\bx^\\star + t\\bh)"}),", also ",e.jsx(n,{children:"g(0) \\le g(t)"})]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bh \\in \\R^n"})," beliebig. Weil ",e.jsx(n,{children:"S"})," offen ist, gibt es ein ",e.jsx(n,{children:"\\delta > 0"}),`, sodass
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} + t\\bh \\in S"})," für alle ",e.jsx(n,{children:"\\left|t\\right| < \\delta"}),` gilt. Wir
betrachten die Funktion einer einzigen Variablen`]}),e.jsx(_,{children:"g\\colon (-\\delta, \\delta) \\to \\R , \\qquad g(t) := f(\\cgreen{\\bx^\\star} + t\\bh) ."}),e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"})," ist, hat ",e.jsx(n,{children:"g"})," in ",e.jsx(n,{children:"t = 0"}),` ein
lokales Minimum.`]})]}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["Der Wert der Ableitung ist die Richtungsableitung aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),"; die Kettenregel auf die affine Abbildung ",e.jsx(n,{children:"t \\mapsto \\bx^\\star + t\\bh"})," angewandt gibt genau ",e.jsx(n,{children:"\\nabla f(\\bx^\\star)\\bh"})]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"g"})," ist in ",e.jsx(n,{children:"t = 0"})," differenzierbar mit ",e.jsx(n,{children:"g'(0) = \\corange{\\nabla f(\\cgreen{\\bx^\\star})}\\,\\bh"}),`.
Nun schauen wir den Differenzenquotienten von zwei Seiten an. Für hinreichend
kleine `,e.jsx(n,{children:"t > 0"})," ist ",e.jsx(n,{children:"(g(t) - g(0))/t \\ge 0"}),`, weil der Zähler nicht negativ ist; im
Grenzwert folgt `,e.jsx(n,{children:"g'(0) \\ge 0"}),". Für hinreichend kleine ",e.jsx(n,{children:"t < 0"}),` dreht der Nenner das
Vorzeichen um, wir erhalten `,e.jsx(n,{children:"(g(t) - g(0))/t \\le 0"}),` und im Grenzwert
`,e.jsx(n,{children:"g'(0) \\le 0"}),". Beides zusammen ergibt ",e.jsx(n,{children:"g'(0) = 0"}),"."]})}),e.jsx(ne,{why:e.jsx(e.Fragment,{children:"Ein Zeilenvektor, der auf jedem Einheitsvektor verschwindet, ist der Nullvektor"}),children:e.jsxs(i.p,{children:["Der zweite Schritt gilt für ",e.jsx(i.em,{children:"jedes"})," ",e.jsx(n,{children:"\\bh"}),`. Setzen wir nacheinander die
Einheitsvektoren `,e.jsx(n,{children:"\\bh = \\be_j"}),` ein, so steht dort
`,e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})}\\,\\be_j = \\partial f(\\cgreen{\\bx^\\star}) / \\partial x_j = 0"}),`
für `,e.jsx(n,{children:"j = 1, \\dots, n"}),", und das ist ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"}),`. Für ein lokales Maximum wenden wir
das Gezeigte auf `,e.jsx(n,{children:"-f"})," an und benutzen ",e.jsx(i.a,{href:"#env-maximieren-ist-minimieren",children:"Bemerkung 12.2.2"}),"."]})})]}),`
`,e.jsx(y,{kind:"Definition",label:"12.2.4 (Stationärer Punkt)",id:"env-stationaerer-punkt",children:e.jsxs(i.p,{children:["Ein Punkt ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})," heißt ",e.jsx(i.em,{children:`stationärer
Punkt`})," von ",e.jsx(n,{children:"f"}),". In ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Kapitel 10"}),` heißt derselbe Punkt
`,e.jsx(i.em,{children:"kritischer Punkt"}),"; beide Wörter sind gebräuchlich und meinen dasselbe."]})}),`
`,e.jsxs(i.p,{children:["Zwei Warnungen gehören sofort dazu. Die Bedingung ist ",e.jsx(i.em,{children:"notwendig"}),`, nicht
hinreichend: Jedes lokale Minimum ist stationär, aber ein stationärer Punkt kann
ebenso ein Maximum oder ein Sattelpunkt sein. Und sie gilt nur im `,e.jsx(i.em,{children:"Inneren"}),`.
Liegt das Minimum auf dem Rand der zulässigen Menge, so darf der Gradient dort
sehr wohl von null verschieden sein. Verboten ist dann nur noch eine zulässige
Abstiegsrichtung: Für jede Richtung `,e.jsx(n,{children:"\\bd"}),", die von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` aus in
`,e.jsx(n,{children:"\\Xcal"})," hineinführt, muss ",e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})}\\,\\bd \\ge 0"}),`
gelten, der `,e.jsx(i.em,{children:"negative"}),` Gradient darf also nicht ins Innere zeigen. Bei
`,e.jsx(n,{children:"f(x) = x"})," auf ",e.jsx(n,{children:"\\Xcal = [0, 1]"})," etwa liegt das Minimum in ",e.jsx(n,{children:"0"})," mit ",e.jsx(n,{children:"f'(0) = 1"}),`: Der
Gradient zeigt dort sogar ins Innere, der negative Gradient dagegen hinaus. Genau
davon handelt `,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.5 (Optimieren heißt Gleichungen lösen)",id:"env-optimieren-heisst-gleichungen-loesen",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"})," ist ein System aus ",e.jsx(n,{children:"n"})," Gleichungen in ",e.jsx(n,{children:"n"}),` Unbekannten, meist
nichtlinear. Damit sind wir wieder bei `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`, und das ganze
dortige Werkzeug steht bereit. Insbesondere ist`]}),e.jsx(ee,{tag:"12.2.3",id:"eq-optimieren-heisst-gleichungen-loesen",children:"\\Phi(\\bx) := \\bx - \\gamma\\,\\corange{\\nabla f(\\bx)}^\\top"}),e.jsxs(i.p,{children:["eine ",e.jsx(A,{id:"fixed-point-iteration",children:"Fixpunktabbildung"}),`, deren Fixpunkte genau die
stationären Punkte von `,e.jsx(n,{children:"f"})," sind, denn ",e.jsx(n,{children:"\\Phi(\\bx) = \\bx"})," gilt für ",e.jsx(n,{children:"\\gamma \\neq 0"}),`
genau dann, wenn `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})," ist. Die zu ",e.jsx(i.a,{href:"#eq-optimieren-heisst-gleichungen-loesen",children:"(12.2.3)"}),`
gehörige Fixpunktiteration `,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\Phi(\\cblue{\\bx^{(k)}})"}),` ist der
`,e.jsx(A,{id:"gradient-descent",children:"Gradientenabstieg"})," aus ",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]}),e.jsxs(i.p,{children:["Analytisch lösen lässt sich ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"}),` nur in Sonderfällen. Einer davon ist
wichtig genug, um ihn zu nennen: Bei den kleinsten Quadraten ist der Gradient
linear in `,e.jsx(n,{children:"\\bbeta"}),", aus ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"}),` werden die Normalgleichungen, und die lösen wir
mit den Mitteln aus `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` in einem Zug. Sobald das Modell
nichtlinear wird, ist damit Schluss, und wir iterieren.`]})]}),`
`,e.jsx(i.h3,{children:"Lokal oder global"}),`
`,e.jsxs(i.p,{children:[`Ein Verfahren, das nur die Umgebung des aktuellen Punktes ansieht, kann
grundsätzlich nur lokale Minima finden. Ob das genügt, entscheidet die
Zielfunktion. `,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.3",children:"Kapitel 11"}),` hat die beiden Antworten
schon bewiesen, und wir zitieren sie hier, statt sie ein zweites Mal zu führen.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lokal ist global."})," Sind ",e.jsx(n,{children:"\\Xcal \\subseteq \\R^n"}),` konvex und
`,e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"})," ",e.jsx(A,{id:"convexity",children:"konvex"}),`, so ist jedes lokale Minimum von
`,e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"\\Xcal"}),` auch ein globales, und zwar ohne jede Differenzierbarkeit
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),"). Ist ",e.jsx(n,{children:"f"}),` differenzierbar, so steht in
`,e.jsx(i.a,{href:"?k=11-konvexitaet#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` sogar die schärfere Fassung: Dann ist
schon jeder stationäre Punkt ein globales Minimum. Ein lokal suchendes Verfahren
kann bei konvexem `,e.jsx(n,{children:"f"}),` also nichts verpassen, und deshalb ist Konvexität die
wichtigste Struktureigenschaft der ganzen Optimierung.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Höchstens eine Lösung."})," Ist ",e.jsx(n,{children:"f"}),` darüber hinaus strikt konvex, gilt also
`,e.jsx(n,{children:"f\\bigl(\\lambda\\bx + (1-\\lambda)\\by\\bigr) < \\lambda f(\\bx) + (1-\\lambda) f(\\by)"}),`
für alle `,e.jsx(n,{children:"\\bx \\neq \\by"})," in ",e.jsx(n,{children:"\\Xcal"})," und alle ",e.jsx(n,{children:"\\lambda \\in (0, 1)"}),", so hat ",e.jsx(n,{children:"f"}),` auf
`,e.jsx(n,{children:"\\Xcal"})," nach ",e.jsx(i.a,{href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` höchstens einen Minimierer; der
Beweis dort nimmt den Mittelpunkt zweier Minimierer und findet an ihm einen
strikt kleineren Wert. Über die `,e.jsx(i.em,{children:"Existenz"}),` eines Minimierers sagt keine der
beiden Aussagen etwas: `,e.jsx(n,{children:"f(x) = e^x"})," ist auf ",e.jsx(n,{children:"\\R"}),` strikt konvex und hat kein
Minimum.`]}),`
`,e.jsx(i.p,{children:"Beide Aussagen kosten dasselbe Kleingedruckte."}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.6 (Beide Sätze brauchen zwei Konvexitätsbedingungen)",id:"env-beide-saetze-brauchen-zwei",children:[e.jsxs(i.p,{children:[`Leicht zu übersehen ist, dass in beiden Sätzen die Konvexität der zulässigen
Menge genauso tragend ist wie die der Zielfunktion. Die Beweise in
`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),` zeigen, warum: Der Vergleichspunkt muss
`,e.jsx(i.em,{children:"zulässig"})," sein, dafür sorgt die Menge, und er muss ",e.jsx(i.em,{children:"besser"}),` sein, dafür sorgt
die Funktion.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ohne konvexe Menge nützt die beste Zielfunktion nichts."}),` Wir nehmen
`,e.jsx(n,{children:"\\cred{\\Xcal = \\{-1, +1\\}}"})," und ",e.jsx(n,{children:"f(y) = y^2"}),`. Die Zielfunktion ist strikt konvex,
und trotzdem sind `,e.jsx(n,{children:"y = -1"})," und ",e.jsx(n,{children:"y = +1"})," beide optimal mit dem Wert ",e.jsx(n,{children:"1"}),`. Der
Mittelpunkt `,e.jsx(n,{children:"\\bz = 0"})," hätte den kleineren Wert ",e.jsx(n,{children:"0"}),`, er ist aber nicht zulässig,
und der Widerspruch aus `,e.jsx(i.a,{href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` entsteht gar nicht erst. Die Eindeutigkeit
fällt mit der Konvexität der Menge.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:`Das Projektionstheorem ist der Spezialfall, bei dem die zweite Bedingung
geschenkt ist.`})," Es minimiert die Distanz zu einem festen Punkt ",e.jsx(n,{children:"\\bx"}),` über eine
abgeschlossene konvexe Menge, also `,e.jsx(n,{children:"\\min_{\\by \\in \\Xcal} \\left\\|\\bx - \\by\\right\\|^2"}),`
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.3",children:"Kapitel 11"}),`). Sichtbar ist dort nur die Bedingung an
die Menge, weil die strikte Konvexität der quadrierten Distanz in `,e.jsx(n,{children:"\\by"}),` schon in
der Struktur des Raumes steckt.`]})]}),`
`,e.jsxs($e,{title:"Warum die quadrierte Norm strikt konvex ist",children:[e.jsxs(i.p,{children:["Die ",e.jsx(A,{id:"triangle-inequality",children:"Dreiecksungleichung"}),` liefert
`,e.jsx(n,{children:"\\left\\|\\lambda\\ba + (1-\\lambda)\\bb\\right\\| \\le \\lambda\\left\\|\\ba\\right\\| + (1-\\lambda)\\left\\|\\bb\\right\\|"}),`
und damit nur die Konvexität der `,e.jsx(A,{id:"norm",children:"Norm"}),`, nicht die strikte. Gleichheit
tritt nämlich ein, sobald `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"}),` in dieselbe Richtung zeigen: Für
`,e.jsx(n,{children:"\\ba = (1; 0)"}),", ",e.jsx(n,{children:"\\bb = (2; 0)"})," und ",e.jsx(n,{children:"\\lambda = \\tfrac12"}),` stehen auf beiden Seiten
`,e.jsx(n,{children:"1{,}5"}),". Die ",e.jsx(i.em,{children:"quadrierte"}),` Norm ist dagegen strikt konvex, und zwar wegen der
Identität`]}),e.jsx(ee,{tag:"12.2.4",id:"eq-beide-saetze-brauchen-zwei",children:`\\left\\|\\lambda\\ba + (1-\\lambda)\\bb\\right\\|^2
= \\lambda\\left\\|\\ba\\right\\|^2 + (1-\\lambda)\\left\\|\\bb\\right\\|^2
- \\cred{\\lambda(1-\\lambda)\\left\\|\\ba - \\bb\\right\\|^2} ,`}),e.jsxs(i.p,{children:[`die durch Ausmultiplizieren mit der Bilinearität des
`,e.jsx(A,{id:"dot-product",children:"Skalarprodukts"}),` entsteht und der Parallelogrammgleichung
entspricht. Für `,e.jsx(n,{children:"\\ba \\neq \\bb"})," und ",e.jsx(n,{children:"\\lambda \\in (0, 1)"}),` ist der rote Term strikt
negativ, und genau das ist die strikte Konvexität. Weil `,e.jsx(n,{children:"t \\mapsto t^2"}),` auf
`,e.jsx(n,{children:"[0, \\infty)"}),` streng wächst, haben Distanz und quadrierte Distanz dieselben
Minimierer; das Quadrieren kostet also nichts und bringt die strikte Konvexität.
Gebraucht wird dafür das Skalarprodukt, nicht bloß eine Norm.`]})]}),`
`,e.jsx(i.h3,{children:"Konvexe Verlustfunktionen in Statistik und ML"}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.2.7 (Vier konvexe Verlustfunktionen)",id:"env-vier-konvexe-verlustfunktionen",children:[e.jsx(i.p,{children:`Vier Standardfälle stehen hier nebeneinander. Alle vier begegnen uns im Skript
wieder.`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kleinste Quadrate."})," Für ",e.jsx(n,{children:"L(\\bbeta) = \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),` ist der
Gradient `,e.jsx(n,{children:"\\corange{\\nabla L(\\bbeta)} = 2(\\bX\\bbeta - \\by)^\\top\\bX"}),` und die
Hesse-Matrix`]}),e.jsx(_,{children:"\\corange{\\bH_L} = 2\\bX^\\top\\bX ."}),e.jsxs(i.p,{children:[`Sie ist stets positiv semidefinit, denn
`,e.jsx(n,{children:"\\bh^\\top\\bX^\\top\\bX\\bh = \\left\\|\\bX\\bh\\right\\|_2^2 \\ge 0"}),`, und positiv definit
genau dann, wenn `,e.jsx(n,{children:"\\bX"})," vollen Spaltenrang hat: Nur dann folgt aus ",e.jsx(n,{children:"\\bh \\neq \\bnull"}),`
auch `,e.jsx(n,{children:"\\bX\\bh \\neq \\bnull"}),". Mit vollem Spaltenrang ist ",e.jsx(n,{children:"L"}),` also strikt konvex und
der Kleinste-Quadrate-Schätzer nach `,e.jsx(i.a,{href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` eindeutig. Ein Zahlenbeispiel:
Für die Designmatrix mit den Zeilen `,e.jsx(n,{children:"(1, 1)"}),", ",e.jsx(n,{children:"(1, 2)"}),", ",e.jsx(n,{children:"(1, 3)"})," und ",e.jsx(n,{children:"(1, 5)"}),` ist
`,e.jsx(n,{children:"\\corange{\\bH_L} = \\begin{pmatrix} 8 & 22 \\\\ 22 & 78\\end{pmatrix}"}),` mit den
Eigenwerten `,e.jsx(n,{children:"84{,}34"})," und ",e.jsx(n,{children:"1{,}66"}),", also positiv definit."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ridge-Regression."})," Der Strafterm addiert eine Krümmung dazu,"]}),e.jsx(_,{children:`f(\\bbeta) = \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2 + \\lambda\\left\\|\\bbeta\\right\\|_2^2 ,
\\qquad
\\corange{\\bH_f} = 2\\bigl(\\bX^\\top\\bX + \\lambda\\bI_p\\bigr) .`}),e.jsxs(i.p,{children:["Die Eigenwerte von ",e.jsx(n,{children:"\\corange{\\bH_f}"})," sind ",e.jsx(n,{children:"2(\\mu_i + \\lambda)"}),", wenn ",e.jsx(n,{children:"\\mu_i \\ge 0"}),`
die Eigenwerte von `,e.jsx(n,{children:"\\bX^\\top\\bX"})," sind. Für ",e.jsx(n,{children:"\\lambda > 0"}),` sind sie alle positiv, und
zwar unabhängig vom `,e.jsx(A,{id:"rank",children:"Rang"})," von ",e.jsx(n,{children:"\\bX"}),`. Ein rangdefektes Beispiel: Hat
`,e.jsx(n,{children:"\\bX"})," zwei identische Spalten, etwa mit den Zeilen ",e.jsx(n,{children:"(1, 1)"}),", ",e.jsx(n,{children:"(2, 2)"}),", ",e.jsx(n,{children:"(3, 3)"}),`,
so hat `,e.jsx(n,{children:"\\bX^\\top\\bX"})," die Eigenwerte ",e.jsx(n,{children:"28"})," und ",e.jsx(n,{children:"0"}),"; mit ",e.jsx(n,{children:"\\lambda = 1{,}5"}),` stehen in
`,e.jsx(n,{children:"\\corange{\\bH_f}"})," die Eigenwerte ",e.jsx(n,{children:"59"})," und ",e.jsx(n,{children:"3"}),`. Ridge macht aus einem Problem mit
unendlich vielen Lösungen eines mit genau einer; den Gradienten dazu haben wir in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"})," schon gerechnet."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Negative Log-Likelihood."}),` Ist die Log-Likelihood konkav, so ist ihr Negatives
konvex, und die Maximum-Likelihood-Schätzung wird zu einem konvexen
Minimierungsproblem. Das ist bei vielen Standardmodellen so, etwa bei der
Normalverteilung mit bekannter Varianz, wo dabei wieder genau das
Kleinste-Quadrate-Problem herauskommt, und bei der logistischen Regression aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),`. Automatisch ist die Konkavität
nicht: Die Log-Likelihood einer `,e.jsx(A,{id:"gaussian-mixture-model",children:"Mischverteilung"}),` ist
nicht konkav, und solche Modelle sind der Standardfall für mehrere lokale Optima.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hinge-Loss."}),` Die Support-Vector-Machine summiert über die Daten den
`,e.jsx(i.em,{children:"Hinge-Verlust"})," ",e.jsx(n,{children:"L(y, \\wh{y}) = \\max(0,\\, 1 - y\\wh{y})"}),` und addiert einen
Strafterm. Als punktweises Maximum zweier affiner
Funktionen ist der Hinge-Loss konvex
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.4",children:"Kapitel 11"}),`), aber weder strikt konvex noch überall
differenzierbar: Für `,e.jsx(n,{children:"y\\wh{y} \\ge 1"})," ist er konstant null, und bei ",e.jsx(n,{children:"y\\wh{y} = 1"}),` hat
er einen Knick. Verfahren, die nur Gradienten kennen, brauchen dort das
Subgradienten-Werkzeug aus `,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.4",children:"Kapitel 11"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Sattelpunkte"}),`
`,e.jsxs(i.p,{children:["Bei nicht-konvexen Funktionen sagt ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),` wenig.
Der Punkt kann ein Minimum sein, ein Maximum, oder keines von beidem.`]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.2.8 (Sattelpunkt)",id:"env-sattelpunkt",children:[e.jsxs(i.p,{children:["Ein stationärer Punkt ",e.jsx(n,{children:"\\bx^\\star"})," von ",e.jsx(n,{children:"f"})," heißt ",e.jsx(i.em,{children:"Sattelpunkt"}),`, wenn jede
Umgebung von `,e.jsx(n,{children:"\\bx^\\star"})," Punkte ",e.jsx(n,{children:"\\bx_-"})," und ",e.jsx(n,{children:"\\bx_+"})," enthält mit"]}),e.jsx(_,{children:"f(\\bx_-) < f(\\bx^\\star) < f(\\bx_+) ."}),e.jsxs(i.p,{children:["Ist die ",e.jsx(A,{id:"hessian-matrix",children:"Hesse-Matrix"}),`
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})," ",e.jsx(i.em,{children:"indefinit"}),`, hat sie also sowohl positive als auch
negative `,e.jsx(A,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),`, so sprechen wir genauer von
einem `,e.jsx(i.em,{children:"Sattelpunkt mit indefiniter Hesse-Matrix"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," zweimal stetig differenzierbar, wie es ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` verlangt, so ist die
indefinite Hesse-Matrix ein hinreichendes Kriterium für die Definition: In jeder
Umgebung liegen Punkte mit größerem und Punkte mit kleinerem Funktionswert. Die
Umkehrung gilt nicht. Bei `,e.jsx(n,{children:"f(x)=x^3"})," ist ",e.jsx(n,{children:"x=0"}),` ebenfalls ein Sattelpunkt, obwohl
`,e.jsx(n,{children:"f''(0)=0"}),` ist und das Kriterium zweiter Ordnung nichts entscheidet. Praktisch
wichtig ist vor allem der Fall der indefiniten Hesse-Matrix.`]}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.2.9 (Der Standardsattel)",id:"env-der-standardsattel",children:[e.jsx(i.p,{children:"Wir rechnen den einfachsten Fall vollständig durch. Sei"}),e.jsx(_,{children:"f(x, y) = \\cgreen{x^2} - \\cred{y^2} ."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Stationäre Punkte."}),` Der Gradient ist
`,e.jsx(n,{children:"\\corange{\\nabla f(x, y)} = (2x,\\, -2y)"}),`, und er verschwindet genau im Ursprung.
Der einzige stationäre Punkt ist also `,e.jsx(n,{children:"\\cpurp{\\bx^\\star = (0; 0)}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hesse-Matrix."})," Zweimaliges Ableiten gibt"]}),e.jsx(_,{children:"\\corange{\\bH_f(x, y)} = \\begin{pmatrix} 2 & 0 \\\\ 0 & -2 \\end{pmatrix} ,"}),e.jsxs(i.p,{children:["und zwar an jeder Stelle dieselbe Matrix, weil ",e.jsx(n,{children:"f"}),` quadratisch ist. Sie ist
diagonal, ihre Eigenwerte stehen also ablesbar auf der Diagonalen:
`,e.jsx(n,{children:"\\lambda_1 = 2 > 0"})," zum Eigenvektor ",e.jsx(n,{children:"\\be_1"})," und ",e.jsx(n,{children:"\\lambda_2 = -2 < 0"}),` zum
Eigenvektor `,e.jsx(n,{children:"\\be_2"}),`. Die Vorzeichen sind verschieden, die Matrix ist indefinit,
und `,e.jsx(n,{children:"\\cpurp{\\bx^\\star}"})," ist ein Sattelpunkt."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Was das geometrisch heißt."})," Schneiden wir ",e.jsx(n,{children:"f"}),` entlang der beiden Achsen, so
sehen wir zwei Parabeln mit entgegengesetzter Öffnung:`]}),e.jsx(_,{children:`f(t, 0) = \\cgreen{t^2} \\quad (\\text{Minimum in } t = 0) ,
\\qquad
f(0, t) = \\cred{-t^2} \\quad (\\text{Maximum in } t = 0) .`}),e.jsxs(i.p,{children:[`Derselbe Punkt ist in der einen Richtung der tiefste und in der anderen der
höchste seiner Umgebung. Die `,e.jsx(A,{id:"level-sets",children:"Höhenlinien"}),` machen das sichtbar: Das
Niveau `,e.jsx(n,{children:"f = 0"})," besteht aus den beiden Geraden ",e.jsx(n,{children:"y = \\pm x"}),`, die positiven Niveaus
sind Hyperbeln, die in `,e.jsx(n,{children:"x"}),`-Richtung öffnen, die negativen Hyperbeln öffnen in
`,e.jsx(n,{children:"y"}),"-Richtung."]})]}),`
`,e.jsx(i.p,{children:`Damit ist die Lage beschrieben. Offen ist die praktisch entscheidende Frage:
Kann ein Verfahren an so einem Punkt hängenbleiben?`}),`
`,e.jsxs(ze,{title:"Zwei Verfahren am Sattelpunkt",children:[e.jsxs(i.p,{children:["Die Tafel zeichnet die Höhenlinien von ",e.jsx(i.a,{href:"#env-der-standardsattel",children:"Beispiel 12.2.9"}),` und hängt zwei
Verfahren daran. Drei Voreinstellungen sind die drei Experimente, die sich lohnen:
der gewöhnliche Start, der Sonderfall auf der grünen Achse und ein schräger Start
für den Newton-Knopf.`]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Von welchen Startpunkten aus läuft der ",e.jsx(i.em,{children:"Gradientenabstieg"})," in den Sattelpunkt?"]}),optionen:[{id:"alle",text:"von fast allen"},{id:"achse",text:"nur von der grünen Achse aus"},{id:"keiner",text:"von keinem"}],loesung:"achse",verdeckt:e.jsxs(e.Fragment,{children:["Die Voreinstellung „Startstrahl ",e.jsx(n,{children:"y = 0"}),'" trifft genau diesen Fall.']}),children:e.jsx(Ft,{})}),e.jsxs(i.p,{children:[`Die beiden Verfahren gehen gegensätzlich mit dem Sattel um. Der Newton-Knopf
landet von jedem Startpunkt aus in einem einzigen Schritt exakt in
`,e.jsx(n,{children:"\\cpurp{\\bx^\\star}"}),", denn ",e.jsx(n,{children:"f"}),` ist quadratisch und seine Näherung zweiter Ordnung
damit exakt. Der Gradientenabstieg dagegen entkommt: Mit `,e.jsx(n,{children:"\\gamma = 0{,}25"}),` steht
er aus `,e.jsx(n,{children:"(1{,}5;\\, 0{,}4)"})," nach acht Schritten bei ",e.jsx(n,{children:"(0{,}0059;\\, 10{,}25)"}),` – die
erste Komponente fällt gegen null, die zweite läuft davon. Nur auf dem Startstrahl
`,e.jsx(n,{children:"y = 0"}),` kriecht auch er hinein, weil dort die zweite Komponente in jedem Schritt
null bleibt; aus `,e.jsx(n,{children:"x = 1{,}5"}),` stehen die Iterierten dann nach zwanzig Schritten bei
`,e.jsx(n,{children:"1{,}4 \\cdot 10^{-6}"}),`. Warum diese Ausnahme in der Praxis keine Rolle spielt,
sagt `,e.jsx(i.a,{href:"#env-was-sattelpunkte-fuer-die-verfahren",children:"Bemerkung 12.2.10"}),"."]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.10 (Was Sattelpunkte für die Verfahren bedeuten)",id:"env-was-sattelpunkte-fuer-die-verfahren",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Newton läuft hinein."})," Der ",e.jsx(A,{id:"newtons-method",children:"Newton-Schritt"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),` sucht eine Nullstelle des
Gradienten, und ein Sattelpunkt ist eine. Für unser `,e.jsx(n,{children:"f"}),` rechnen wir das in einer
Zeile nach. Der Schritt lautet
`,e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = \\bx - \\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f(\\bx)}^\\top"}),` mit
der Spalte `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}^\\top"}),`, und mit
`,e.jsx(n,{children:"\\corange{\\bH_f^{-1}} = \\diag(\\tfrac12, -\\tfrac12)"})," ist"]}),e.jsx(_,{children:`\\cblue{\\bx^{(1)}}
= \\begin{pmatrix} x \\\\ y \\end{pmatrix}
- \\begin{pmatrix} \\tfrac12 & 0 \\\\ 0 & -\\tfrac12 \\end{pmatrix}
\\begin{pmatrix} 2x \\\\ -2y \\end{pmatrix}
= \\begin{pmatrix} x - x \\\\ y - y \\end{pmatrix}
= \\cpurp{\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}} ,`}),e.jsxs(i.p,{children:[`und zwar von jedem Startpunkt aus. Wer Krümmungsinformation benutzt, ohne auf ihr
Vorzeichen zu achten, wird von Sattelpunkten genauso angezogen wie von Minima.
`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"})," zeigt die Gegenmittel."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Gradientenabstieg entkommt."})," Mit Schrittweite ",e.jsx(n,{children:"\\gamma"}),` lautet die Iteration
komponentenweise`]}),e.jsx(ee,{tag:"12.2.5",id:"eq-was-sattelpunkte-fuer-die-verfahren",children:`\\cblue{x^{(k+1)}} = (1 - 2\\gamma)\\,\\cblue{x^{(k)}} ,
\\qquad
\\cblue{y^{(k+1)}} = (1 + 2\\gamma)\\,\\cblue{y^{(k)}} .`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"0 < \\gamma < \\tfrac12"})," schrumpft nach ",e.jsx(i.a,{href:"#eq-was-sattelpunkte-fuer-die-verfahren",children:"(12.2.5)"}),` die erste Komponente, die
zweite wächst in jedem Schritt um den Faktor `,e.jsx(n,{children:"\\cred{1 + 2\\gamma} > 1"}),`. Nur wer exakt auf der
`,e.jsx(n,{children:"x"}),"-Achse startet, also mit ",e.jsx(n,{children:"y^{(0)} = 0"}),`, landet im Sattel. Diese Startmenge ist
eine Gerade im `,e.jsx(n,{children:"\\R^2"}),` und hat das Volumen null. In der Praxis genügt schon
Rundungsrauschen, um sie zu verfehlen, und der stochastische Gradientenabstieg
aus `,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"})," bringt sein eigenes Rauschen mit."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Eine hochdimensionale Vorzeichenheuristik."}),` Solange kein Eigenwert von
`,e.jsx(n,{children:"\\corange{\\bH_f}"}),` null ist, entscheidet allein das Vorzeichenmuster: Ein Minimum
verlangt, dass `,e.jsx(i.em,{children:"alle"})," ",e.jsx(n,{children:"n"}),` Eigenwerte positiv sind, für einen Sattelpunkt mit
indefiniter Hesse-Matrix genügen gemischte Vorzeichen. (Ein Eigenwert null lässt
beide Fälle offen, dazu `,e.jsx(i.a,{href:"#env-warum-die-rueckrichtung-nicht-gilt",children:"Bemerkung 12.2.12"}),`.) Die
Münzwurf-Faustregel aus `,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),` beziffert
den Unterschied: Wären die `,e.jsx(n,{children:"n"}),` Vorzeichen unabhängige faire Münzwürfe, so hätte
ein Minimum die Wahrscheinlichkeit `,e.jsx(n,{children:"2^{-n}"})," und irgendein Extremum ",e.jsx(n,{children:"2^{1-n}"}),`, für
`,e.jsx(n,{children:"n = 100"})," also ",e.jsx(n,{children:"7{,}9 \\cdot 10^{-31}"})," und ",e.jsx(n,{children:"1{,}6 \\cdot 10^{-30}"}),`. Ein Toy-Modell
ist das und keine Verteilungsaussage über die stationären Punkte eines konkreten
Problems; belastbar bleibt die Geometrie dahinter, dass positive Definitheit ein
einheitliches Vorzeichen verlangt und Indefinitheit nur ein gemischtes Muster.
Wie Verfahren auf negative Krümmung reagieren, zeigen die Abschnitte
`,e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Optimalitätsbedingungen im Überblick"}),`
`,e.jsx(i.p,{children:`Damit haben wir alle Bausteine zusammen. Der folgende Satz stellt sie
nebeneinander, für eine zweimal stetig differenzierbare Zielfunktion.`}),`
`,e.jsxs(y,{kind:"Satz",label:"12.2.11 (Bedingungen erster und zweiter Ordnung)",id:"env-bedingungen-erster-und-zweiter-ordnung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," und ",e.jsx(n,{children:"\\bx^\\star \\in S"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Notwendig, erste Ordnung."})," Ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein lokales Minimum, so gilt
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Notwendig, zweite Ordnung."})," Ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein lokales Minimum, so ist
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)} \\succeq 0"}),", also positiv semidefinit."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Hinreichend, zweite Ordnung."})," Gilt ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),`
und ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)} \\succ 0"}),`, also
`,e.jsx(A,{id:"positive-definite",children:"positiv definit"}),", so ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein striktes lokales
Minimum.`]}),`
`]})]}),`
`,e.jsx($e,{title:"Beweis der notwendigen Bedingung zweiter Ordnung",children:e.jsxs(tn,{children:[e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["Der lineare Term fällt weg, weil ",e.jsx(n,{children:"\\bx^\\star"})," nach Teil 1 stationär ist"]}),children:[e.jsxs(i.p,{children:["Teil 1 ist ",e.jsx(i.a,{href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),", und Teil 3 ist ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`(1) aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`. Zu zeigen bleibt Teil 2. Sei
`,e.jsx(n,{children:"\\bh \\in \\R^n"})," beliebig und wieder ",e.jsx(n,{children:"g(t) = f(\\bx^\\star + t\\bh)"}),` wie im Beweis von
`,e.jsx(i.a,{href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),". Die ",e.jsx(A,{id:"taylor-theorem",children:"Taylorentwicklung"}),` zweiter Ordnung aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),` gibt mit
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"})," aus Teil 1"]}),e.jsx(_,{children:`g(t) = g(0) + \\tfrac{1}{2}\\,t^2\\,\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh
+ \\cred{o(t^2)}
\\qquad (t \\to 0) .`})]}),e.jsxs(ne,{why:e.jsx(e.Fragment,{children:"Genau hier bleibt nur die schwache Ungleichung übrig: Der Grenzwert einer Folge nichtnegativer Zahlen ist nichtnegativ, aber nicht notwendig positiv"}),children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bx^\\star"})," ein lokales Minimum ist, gilt ",e.jsx(n,{children:"g(t) \\ge g(0)"}),` für alle
hinreichend kleinen `,e.jsx(n,{children:"\\left|t\\right|"}),". Wir ziehen ",e.jsx(n,{children:"g(0)"}),` ab und teilen durch
`,e.jsx(n,{children:"t^2 > 0"}),":"]}),e.jsx(_,{children:`0 \\le \\frac{g(t) - g(0)}{t^2}
= \\tfrac{1}{2}\\,\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh + \\frac{\\cred{o(t^2)}}{t^2} .`}),e.jsxs(i.p,{children:["Der rote Quotient verschwindet für ",e.jsx(n,{children:"t \\to 0"}),`, also bleibt
`,e.jsx(n,{children:"\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh \\ge 0"})," stehen. Weil ",e.jsx(n,{children:"\\bh"}),` beliebig war,
ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})," positiv semidefinit."]})]})]})}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.12 (Warum die Rückrichtung nicht gilt)",id:"env-warum-die-rueckrichtung-nicht-gilt",children:[e.jsxs(i.p,{children:[`Verlockend wäre, aus Teil 3 eine Äquivalenz zu machen und zu schreiben:
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),` und
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)} \\succ 0"})," ",e.jsx(i.em,{children:"genau dann, wenn"})," ",e.jsx(n,{children:"\\bx^\\star"}),` ein lokales
Minimum ist. Die Richtung von links nach rechts stimmt, das ist Teil 3 des
Satzes. Die Rückrichtung ist falsch.`]}),e.jsxs(i.p,{children:[`Das Gegenbeispiel ist schon in einer Variablen zu haben:
`,e.jsx(n,{children:"\\cred{f(x) = x^4}"})," hat in ",e.jsx(n,{children:"x = 0"}),` ein striktes globales Minimum, denn
`,e.jsx(n,{children:"f(x) > 0 = f(0)"})," für alle ",e.jsx(n,{children:"x \\neq 0"}),". Es ist aber ",e.jsx(n,{children:"f'(0) = 0"})," ",e.jsx(i.em,{children:"und"}),`
`,e.jsx(n,{children:"f''(0) = 0"}),", die Hesse-Matrix ",e.jsx(n,{children:"\\corange{\\bH_f(0)} = (0)"}),` ist also nicht positiv
definit. Was aus einem lokalen Minimum wirklich folgt, steht in Teil 2 des Satzes:
positive Semidefinitheit, mehr nicht. `,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),` in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"})," führt neben ",e.jsx(n,{children:"x^4"})," noch ",e.jsx(n,{children:"-x^4"}),` und
`,e.jsx(n,{children:"x^3"}),` vor, drei Funktionen mit derselben Hesse-Matrix im Nullpunkt und drei
verschiedenen Antworten.`]})]}),`
`,e.jsxs(i.p,{children:[`Die Fälle lassen sich in einer Tabelle zusammenfassen. Sie gilt für stationäre
Punkte, also unter der Voraussetzung `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),":"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})}),e.jsxs(i.th,{children:[e.jsx(n,{children:"\\bx^\\star"})," ist"]})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(n,{children:"\\succ 0"})," (positiv definit)"]}),e.jsx(i.td,{children:"striktes lokales Minimum"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(n,{children:"\\prec 0"})," (negativ definit)"]}),e.jsx(i.td,{children:"striktes lokales Maximum"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"indefinit"}),e.jsx(i.td,{children:"Sattelpunkt"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"semidefinit, aber nicht definit"}),e.jsx(i.td,{children:"unklar, weitere Analyse nötig"})]})]})]}),`
`,e.jsxs(i.p,{children:[`Die letzte Zeile ist keine Bequemlichkeit, sondern eine Tatsache: In diesem Fall
entscheidet die zweite Ableitung nichts, und wir müssen höhere Ableitungen ansehen
oder anders argumentieren. Ein einzelner Eigenwert null genügt dafür übrigens
nicht. Bei `,e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(1, -1, 0)"}),` ist die Matrix indefinit, und die
dritte Zeile greift nach wie vor.`]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.2.13 (Was Konvexität aus der Tabelle macht)",id:"env-was-konvexitaet-aus-der-tabelle-macht",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f"})," auf einer offenen konvexen Menge ",e.jsx(n,{children:"S"}),` konvex und zweimal stetig
differenzierbar. Dann ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} \\succeq 0"})," an ",e.jsx(i.em,{children:"jeder"}),` Stelle
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"}),`), eine indefinite Hesse-Matrix kann also gar nicht auftreten: Die
dritte Zeile der Tabelle bleibt leer, eine konvexe Funktion hat keine
Sattelpunkte. Mehr noch, die Bedingung erster Ordnung wird für konvexe Funktionen
hinreichend: Jeder stationäre Punkt ist dann bereits ein globales Minimum
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),`, dessen Beweis nur
`,e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})} = \\bnull^\\top"}),` in die
Gradientenungleichung einsetzt).`]}),e.jsxs(i.p,{children:["Für die Praxis heißt das: Bei einem konvexen Problem sagt ein ",e.jsx(i.em,{children:"verschwindender"}),`
Gradient schon alles, wir stehen dann im globalen Minimum. Ein bloß `,e.jsx(i.em,{children:"kleiner"}),`
Gradient garantiert das nicht von selbst; wie viel er wert ist, hängt an der
Krümmung, und darauf kommt `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),` mit den Abbruchkriterien
zurück. Bei einem nicht-konvexen Problem heißt ein kleiner Gradient ohnehin nur,
dass wir irgendwo stationär stehen, und die Tabelle sagt, welche drei
Möglichkeiten das offenlässt.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Punkt mit ",e.jsx(n,{children:"\\nabla f(\\bx^\\star) = \\bnull^\\top"})," ist ein lokales Minimum von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:["Die Bedingung ist notwendig, nicht hinreichend (",e.jsx(i.a,{href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),`). Der Ursprung ist ein
stationärer Punkt von `,e.jsx(n,{children:"f(x, y) = x^2 - y^2"}),`, aber weder Minimum noch Maximum,
sondern ein Sattelpunkt: entlang der `,e.jsx(n,{children:"x"}),`-Achse geht es nach oben, entlang der
`,e.jsx(n,{children:"y"}),"-Achse nach unten."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Ein Maximierungsproblem lässt sich ohne Verlust in ein Minimierungsproblem
umschreiben.`}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\max f = -\\min(-f)"}),", und die Maximierer von ",e.jsx(n,{children:"f"}),` sind genau die Minimierer
von `,e.jsx(n,{children:"-f"})," (",e.jsx(i.a,{href:"#env-maximieren-ist-minimieren",children:"Bemerkung 12.2.2"}),`). Die Werte kippen im Vorzeichen, die Argumente bleiben
dieselben. Deshalb minimieren Softwarebibliotheken die `,e.jsx(i.em,{children:"negative"})," Log-Likelihood."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:`Ist die Zielfunktion strikt konvex, so hat das Optimierungsproblem höchstens eine
Lösung, gleichgültig wie die zulässige Menge aussieht.`}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` braucht beide Konvexitätsbedingungen. Auf
`,e.jsx(n,{children:"\\Xcal = \\{-1, +1\\}"})," ist ",e.jsx(n,{children:"f(y) = y^2"}),` strikt konvex, und trotzdem sind beide
Punkte optimal mit dem Wert `,e.jsx(n,{children:"1"}),". Der Mittelpunkt ",e.jsx(n,{children:"0"}),` wäre besser, ist aber nicht
zulässig, und ohne ihn entsteht der Widerspruch des Beweises gar nicht erst
(`,e.jsx(i.a,{href:"#env-beide-saetze-brauchen-zwei",children:"Bemerkung 12.2.6"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Hesse-Matrix ",e.jsx(n,{children:"2\\bX^\\top\\bX"}),` des Kleinste-Quadrate-Problems ist immer positiv
semidefinit, aber nur bei vollem Spaltenrang von `,e.jsx(n,{children:"\\bX"})," positiv definit."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\bh^\\top\\bX^\\top\\bX\\bh = \\left\\|\\bX\\bh\\right\\|_2^2 \\ge 0"}),`, also stets
semidefinit. Gleichheit tritt für ein `,e.jsx(n,{children:"\\bh \\neq \\bnull"}),` genau dann ein, wenn
`,e.jsx(n,{children:"\\bX\\bh = \\bnull"}),` gilt, wenn also die Spalten linear abhängig sind. Ohne vollen
Spaltenrang ist die Zielfunktion nur konvex, nicht strikt konvex, und das Minimum
ist nicht mehr eindeutig. Ridge repariert das, indem es `,e.jsx(n,{children:"2\\lambda"}),` auf jeden
Eigenwert addiert (`,e.jsx(i.a,{href:"#env-vier-konvexe-verlustfunktionen",children:"Beispiel 12.2.7"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\nabla f(\\bx^\\star) = \\bnull^\\top"}),` und positiv semidefiniter Hesse-Matrix
folgt, dass `,e.jsx(n,{children:"\\bx^\\star"})," ein lokales Minimum ist."]}),e.jsxs(i.p,{children:[`Semidefinit reicht nicht, das ist die letzte Zeile der Klassifikationstabelle. Für
`,e.jsx(n,{children:"f(x) = x^3"})," ist ",e.jsx(n,{children:"f'(0) = 0"})," und ",e.jsx(n,{children:"f''(0) = 0"}),`, die Hesse-Matrix also positiv
semidefinit, und trotzdem liegt in `,e.jsx(n,{children:"0"})," kein Minimum: links davon ist ",e.jsx(n,{children:"f"}),` negativ.
Positive `,e.jsx(i.em,{children:"Definitheit"})," dagegen genügt (",e.jsx(i.a,{href:"#env-bedingungen-erster-und-zweiter-ordnung",children:"Satz 12.2.11"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:"Das Newton-Verfahren umgeht Sattelpunkte, weil es die Krümmung mitbenutzt."}),e.jsxs(i.p,{children:["Es läuft eher hinein. Auf ",e.jsx(n,{children:"f(x, y) = x^2 - y^2"}),` landet ein einziger Newton-Schritt
von jedem Startpunkt aus exakt im Sattel `,e.jsx(n,{children:"(0; 0)"}),`, wie die Rechnung in
`,e.jsx(i.a,{href:"#env-was-sattelpunkte-fuer-die-verfahren",children:"Bemerkung 12.2.10"}),` zeigt. Der Schritt sucht eine Nullstelle des Gradienten, und ein
Sattelpunkt ist eine. Der Gradientenabstieg entkommt dagegen, weil er die
Komponente in der Richtung mit negativem Eigenwert in jedem Schritt um den Faktor
`,e.jsx(n,{children:"1 + 2\\gamma"})," vergrößert."]})]}),e.jsxs(Ri,{loesung:1.5,toleranz:.05,children:[e.jsxs(i.p,{children:["Mit welchem Faktor wächst im Widget die ",e.jsx(n,{children:"y"}),`-Komponente des Gradientenabstiegs pro
Schritt, wenn `,e.jsx(n,{children:"\\gamma = 0{,}25"})," eingestellt ist?"]}),e.jsxs(i.p,{children:["Die Iteration lautet ",e.jsx(n,{children:`y^{(k+1)} = y^{(k)} - \\gamma \\cdot (-2y^{(k)}) =
(1 + 2\\gamma)\\,y^{(k)}`}),", mit ",e.jsx(n,{children:"\\gamma = 0{,}25"})," also der Faktor ",e.jsx(n,{children:"1{,}5"}),`. Die
Ablesetafel des Widgets nennt ihn direkt; in der `,e.jsx(n,{children:"x"}),`-Richtung steht daneben
`,e.jsx(n,{children:"\\left|1 - 2\\gamma\\right| = 0{,}5"}),`. Diese Gegenläufigkeit ist der ganze Grund,
warum der Abstieg dem Sattel entkommt.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Im Münzwurfmodell für Hesse-Eigenwertvorzeichen wird positive Definitheit mit
wachsender Dimension exponentiell selten.`}),e.jsxs(i.p,{children:["Sind die ",e.jsx(n,{children:"n"}),` Vorzeichen unabhängig und fair, müssen für positive Definitheit alle
`,e.jsx(n,{children:"n"})," positiv ausfallen; das hat Wahrscheinlichkeit ",e.jsx(n,{children:"2^{-n}"}),`. Für irgendein
Extremum dürfen alle positiv oder alle negativ sein, also `,e.jsx(n,{children:"2^{1-n}"}),". Bei ",e.jsx(n,{children:"n=100"}),`
sind das `,e.jsx(n,{children:"7{,}9 \\cdot 10^{-31}"})," beziehungsweise ",e.jsx(n,{children:"1{,}6 \\cdot 10^{-30}"}),`. Für reale
Probleme ist die Unabhängigkeitsannahme im Allgemeinen falsch; der Selbsttest
prüft deshalb ausdrücklich nur die Konsequenz des Toy-Modells
(`,e.jsx(i.a,{href:"#env-was-sattelpunkte-fuer-die-verfahren",children:"Bemerkung 12.2.10"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §6.1 stellt Optimierungsprobleme und ihre Sprechweisen
zusammen, §6.2.1 sammelt die Folgen der Konvexität und §6.2.2 die
Optimalitätsbedingungen ohne Nebenbedingungen; die Bedingungen mit
Nebenbedingungen (Heath §6.2.3) folgen in `,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]})})]})}function Bt(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Fr,{...r})}):Fr(r)}const ui=K.blau,Br=K.gruen,Pi=K.orange,$t=K.rot,Gt="#64748b",Di=(r,i=3)=>Z(r,i),Rt="⁰¹²³⁴⁵⁶⁷⁸⁹";function Hi(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";if(Math.abs(r)>=.001)return Di(r,3);const[i,t]=r.toExponential(2).split("e"),h=Number(t),l=String(Math.abs(h)).split("").map(d=>Rt[Number(d)]).join("");return`${i.replace(".",",")} · 10${h<0?"⁻":""}${l}`}const Ln=([r,i])=>(1-r)**2+5*(i-r*r)**2,ht=[{name:"Tal von oben",sim:[[-1.5,2.5],[-.7,2.6],[-1.3,1.8]]},{name:"flach von links",sim:[[-1.5,.5],[-.9,.5],[-1.5,1.1]]}];function Lt(r){const i=r.map(u=>({p:u,v:Ln(u)})).sort((u,b)=>u.v-b.v),[t,h,l]=i,d=[(t.p[0]+h.p[0])/2,(t.p[1]+h.p[1])/2],s=[d[0]+(d[0]-l.p[0]),d[1]+(d[1]-l.p[1])],o=Ln(s);if(o<t.v){const u=[d[0]+2*(d[0]-l.p[0]),d[1]+2*(d[1]-l.p[1])];return Ln(u)<o?{next:[t.p,h.p,u],move:"Expansion"}:{next:[t.p,h.p,s],move:"Reflexion"}}if(o<h.v)return{next:[t.p,h.p,s],move:"Reflexion"};const f=o<l.v?[d[0]+.5*(d[0]-l.p[0]),d[1]+.5*(d[1]-l.p[1])]:[d[0]-.5*(d[0]-l.p[0]),d[1]-.5*(d[1]-l.p[1])];return Ln(f)<Math.min(o,l.v)?{next:[t.p,h.p,f],move:"Kontraktion"}:{next:[t.p,[(t.p[0]+h.p[0])/2,(t.p[1]+h.p[1])/2],[(t.p[0]+l.p[0])/2,(t.p[1]+l.p[1])/2]],move:"Schrumpfen"}}function Et(r,i){let t=ht[r].sim;const h={Reflexion:0,Expansion:0,Kontraktion:0,Schrumpfen:0},l=[{sim:t,move:"–",zaehler:{...h}}];for(let d=0;d<i;d++){const s=Lt(t);t=s.next,h[s.move]+=1,l.push({sim:t,move:s.move,zaehler:{...h}})}return l}const $r=60,jn=380,rn=380,Wn=[-2,2],Vn=[-1,3],on=r=>(r-Wn[0])/(Wn[1]-Wn[0])*jn,un=r=>rn-(r-Vn[0])/(Vn[1]-Vn[0])*rn;function Kt(){const[r,i]=F.useState(0),[t,h]=F.useState(0),l=F.useMemo(()=>Et(r,$r),[r]),d=Math.min(t,l.length-1),s=l[d],o=l.slice(Math.max(0,d-13),d).map(c=>c.sim),f=F.useMemo(()=>{const v=[],W=[248,250,252],I=[71,85,105];for(let M=0;M<44;M++)for(let g=0;g<44;g++){const q=Wn[0]+(M+.5)/44*(Wn[1]-Wn[0]),U=Vn[0]+(g+.5)/44*(Vn[1]-Vn[0]),C=Math.min(1,Math.max(0,(Math.log10(Ln([q,U])+.01)+2)/4)),P=Math.round(C*7)/7,w=W.map((E,te)=>Math.round(E+(I[te]-E)*P));v.push(e.jsx("rect",{x:M/44*jn,y:rn-(g+1)/44*rn,width:jn/44+.5,height:rn/44+.5,fill:`rgb(${w[0]},${w[1]},${w[2]})`,opacity:.5},`${M}-${g}`))}return v},[]),u=s.sim.map(c=>({p:c,v:Ln(c)})).sort((c,v)=>c.v-v.v),b=c=>c.map(v=>`${on(v[0]).toFixed(1)},${un(v[1]).toFixed(1)}`).join(" "),S=[(u[0].p[0]+u[1].p[0])/2,(u[0].p[1]+u[1].p[1])/2],x=[S[0]+(S[0]-u[2].p[0]),S[1]+(S[1]-u[2].p[1])],z=Math.max(...u.flatMap(c=>u.map(v=>Math.hypot(c.p[0]-v.p[0],c.p[1]-v.p[1])))),R=u[2].v-u[0].v,j=s.zaehler;let m,k,D;d===0?(m="neutral",k="Ausgangslage",D=`Der Startsimplex steht. Ein Schritt vorwärts wirft die schlechteste Ecke weg und probiert den Punkt auf der anderen Seite des Schwerpunkts, Zug 1 von ${O("algorithmus:nelder-mead-simplexverfahren")}.`):u[0].v<1e-6?(m="ok",k="im Minimum angekommen",D=`Der beste Eckpunkt liegt bei f = ${Hi(u[0].v)}, das Verfahren ist also am Ziel. Bis hierher standen ${j.Reflexion} Reflexionen, ${j.Expansion} Expansionen, ${j.Kontraktion} Kontraktionen und ${j.Schrumpfen} Schrumpfschritte auf der Rechnung: Die vier Züge von ${O("algorithmus:nelder-mead-simplexverfahren")} kommen sehr ungleich zum Einsatz, und die billigste Bewegung ist bei weitem nicht die häufigste.`):s.move==="Schrumpfen"?(m="warn",k="Schrumpfen",D="Weder Reflexion noch Kontraktion haben geholfen, deshalb zieht sich der ganze Simplex zur besten Ecke zusammen. Das ist der teuerste der vier Züge: Er kostet n neue Auswertungen und bringt keinen neuen besten Wert."):s.move==="Expansion"?(m="neutral",k="Expansion",D="Die Reflexion war besser als jede bisherige Ecke, deshalb hat das Verfahren in derselben Richtung gleich noch einmal nachgelegt. So läuft der Simplex ein langes Tal entlang, ohne je eine Ableitung zu sehen."):s.move==="Kontraktion"?(m="neutral",k="Kontraktion",D="Der gespiegelte Punkt war nicht gut genug; der neue Eckpunkt liegt näher am Schwerpunkt als die weggeworfene Ecke. Im gekrümmten Rosenbrock-Tal ist das der häufigste Zug, weil die Talsohle dem Simplex ständig wegkippt."):(m="neutral",k="Reflexion",D="Die gespiegelte Ecke ist besser als die zweitschlechteste und wird übernommen; der Simplex kippt über den Schwerpunkt hinweg. Das ist der Grundzug des Verfahrens und der einzige, der nichts kostet außer einer Auswertung.");const L=c=>c?Re:Ne;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(Se,{children:"Spielen wir den Lauf ab und achten auf den Zugzähler: Welcher der vier Züge fällt am häufigsten, welcher gar nicht?"}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"inline-block",children:e.jsxs("svg",{viewBox:`0 0 ${jn} ${rn}`,width:jn,height:rn,role:"img","aria-label":`Der Nelder-Mead-Simplex nach ${d} Schritten über der Höhenkarte von f; letzter Zug: ${s.move}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[f,o.map((c,v)=>e.jsx("polygon",{points:b(c),fill:"none",stroke:ui,strokeWidth:1,opacity:.12+.4*v/Math.max(o.length,1)},v)),e.jsx("line",{x1:on(u[2].p[0]),y1:un(u[2].p[1]),x2:on(x[0]),y2:un(x[1]),stroke:Pi,strokeWidth:1.6,strokeDasharray:"5 4"}),e.jsx("circle",{cx:on(x[0]),cy:un(x[1]),r:3,fill:Pi}),e.jsx("polygon",{points:b(s.sim),fill:ui,fillOpacity:.18,stroke:ui,strokeWidth:2}),u.map((c,v)=>e.jsx("circle",{cx:on(c.p[0]),cy:un(c.p[1]),r:v===0?5:3.5,fill:ui},v)),e.jsx("circle",{cx:on(1),cy:un(1),r:5,fill:"none",stroke:Br,strokeWidth:2}),e.jsx("text",{x:on(1)+8,y:un(1)+4,fontSize:"10",fill:Br,children:"Minimum (1; 1)"}),e.jsx("text",{x:6,y:rn-6,fontSize:"9",fill:Gt,children:"x₁ ∈ [−2, 2], x₂ ∈ [−1, 3]; je dunkler, desto größer f"}),e.jsx("text",{x:jn-6,y:14,fontSize:"9",fill:Pi,textAnchor:"end",children:"nächste Reflexion"}),s.move==="Schrumpfen"&&e.jsx("text",{x:jn-6,y:28,fontSize:"9",fill:$t,textAnchor:"end",children:"Schrumpfschritt"})]})}),e.jsxs("div",{className:"min-w-60 grow space-y-2",children:[e.jsx("p",{className:"text-sm",children:"Minimiert wird f(x₁, x₂) = (1 − x₁)² + 5(x₂ − x₁²)². Die Talsohle ist die Parabel x₂ = x₁², das Minimum liegt in (1; 1) mit f = 0. Ausgewertet wird nur f selbst, verglichen werden nur Funktionswerte."}),e.jsx(Bi,{step:d,setStep:h,max:$r,playable:!0,speedMs:450,narration:`Letzter Zug: ${s.move}`}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-slate-500 dark:text-slate-400",children:"Startsimplex:"}),ht.map((c,v)=>e.jsx("button",{type:"button","aria-pressed":v===r,className:L(v===r),onClick:()=>{i(v),h(0)},children:c.name},c.name))]}),e.jsxs("div",{className:"space-y-1 font-mono text-xs",children:[e.jsxs("p",{children:["Reflexionen ",j.Reflexion,", Expansionen ",j.Expansion,", Kontraktionen ",j.Kontraktion,", Schrumpfschritte ",j.Schrumpfen]}),u.map((c,v)=>e.jsxs("p",{children:[v===0?"beste ":v===1?"mittl.":"schl. "," (",Di(c.p[0]),"; ",Di(c.p[1]),") f = ",Hi(c.v)]},v)),e.jsxs("p",{children:["Durchmesser ",Di(z),", Spanne f",e.jsx("sub",{children:"schl."})," − f",e.jsx("sub",{children:"beste"})," ="," ",Hi(R)]})]})]})]}),e.jsx(ye,{kind:m,titel:k,children:D})]})}const xi=K.blau,Gr=K.gruen,gi=K.orange,qt=K.rot,Wt=K.violett,Qe="#64748b",xn=r=>(r-2)**2+1,bi=r=>2*r-4,Cn=2,Gn=430,En=260,lr=34,ar=24,dr=8,hr=8,li=-2.5,jr=6.5,cr=0,Fi=22,Vt=12,he=r=>lr+(r-li)/(jr-li)*(Gn-lr-hr),ce=r=>En-ar-(r-cr)/(Fi-cr)*(En-ar-dr),Te=r=>Math.max(li,Math.min(jr,r)),Xn=r=>Math.max(cr,Math.min(Fi,r)),pe=(r,i=4)=>Math.abs(r)>=1e5&&Number.isFinite(r)?r.toExponential(2).replace(".",",").replace("e+"," · 10^").replace("e-"," · 10^−").replace(/^-/,"−"):Z(r,i);function It(){const[r,i]=F.useState(.6),[t,h]=F.useState(4.5),[l,d]=F.useState(0),s=F.useMemo(()=>{const M=[t];for(let g=0;g<l;g++){const q=M[M.length-1],U=q-r*bi(q);M.push(Number.isFinite(U)?U:U>0?1e308:-1e308)}return M},[t,r,l]),o=s[s.length-1],f=1-r*Cn,u=F.useMemo(()=>{const M=[];for(let g=0;g<=240;g++){const q=li+(jr-li)*g/240,U=xn(q);U<=Fi&&M.push(`${he(q).toFixed(1)},${ce(U).toFixed(1)}`)}return M.join(" ")},[]),b=[-2,0,2,4,6],S=[5,10,15,20],x=1.1,z=Te(o-x),R=Te(o+x),j=M=>xn(o)+bi(o)*(M-o),m=o-r*bi(o),k=Math.abs(o)<1e6&&xn(o)<=Fi,D=s.map((M,g)=>({i:g,v:M,g:bi(M),fv:xn(M),e:M-2})).slice(-7),L=1e-9;let c,v,W;Math.abs(r-1/Cn)<L?(c="ok",v="γ = 1/L trifft in einem Schritt",W=`Der Faktor 1 − γf″ ist genau null, der erste Schritt landet exakt im Minimum x* = 2. Bei einer Parabel ist das kein Zufall, sondern derselbe Schritt, den das Newton-Verfahren aus ${O("algorithmus:newton-verfahren-fuer-die-optimierung")} macht: γ = 1/f″ ist die inverse Krümmung.`):r<1/Cn?(c="neutral",v="γ < 1/L: einseitige Annäherung",W=`Der Faktor 1 − γf″ = ${pe(f,2)} ist positiv. Der Fehler behält also sein Vorzeichen und schrumpft in jedem Schritt auf das ${pe(f,2)}-fache: Die Iterierten nähern sich von einer Seite, dafür langsam. Das ist der erste Fall von ${O("bemerkung:zu-klein-zu-gross-gerade-richtig")}, und ${O("satz:konvergenzrate-bei-starker-konvexitaet")} deckt genau diesen Bereich ab, denn er verlangt γ ≤ 1/L.`):r<2/Cn-L?(c="neutral",v="1/L < γ < 2/L: Überschießen, aber konvergent",W=`Der Faktor 1 − γf″ = ${pe(f,2)} ist negativ, die Iterierten springen also in jedem Schritt über das Minimum hinweg. Weil sein Betrag unter 1 liegt, wird der Sprung trotzdem kleiner. Das ist der dritte Fall von ${O("bemerkung:zu-klein-zu-gross-gerade-richtig")}: Die Garantie von ${O("satz:konvergenzrate-bei-starker-konvexitaet")} gilt hier nicht mehr, gut geht es trotzdem.`):Math.abs(r-2/Cn)<L?(c="warn",v="γ = 2/L ist die Grenze",W="Der Fehler wechselt nur noch das Vorzeichen und behält seinen Betrag. Die Iteration pendelt für immer zwischen zwei Punkten, ohne je näher zu kommen. Beliebig oft in die richtige Richtung zu laufen genügt eben nicht, wenn die Schrittlänge nicht dazu passt."):(c="fail",v="γ > 2/L: Divergenz",W=`Der Betrag des Faktors ist ${pe(Math.abs(f),2)} > 1, jeder Schritt vergrößert den Fehler. Die Folge läuft davon, obwohl jeder einzelne Schritt in die richtige Richtung startet und der Funktionswert am Startpunkt kleiner wird.`);const I=l===0?`Ausgangslage: x⁽⁰⁾ = ${pe(t,2)}, Fehler ${pe(t-2,4)}.`:`Schritt ${l}: x⁽${l}⁾ = ${pe(o,4)}, Fehler ${pe(o-2,4)} = ${pe(f,2)} · (Fehler davor).`;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(Se,{children:"Schieben wir γ nach oben, bis der Fehler in der Tabelle das Vorzeichen wechselt, und dann weiter, bis er wächst."}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"inline-block",children:e.jsxs("svg",{viewBox:`0 0 ${Gn} ${En}`,width:Gn,height:En,role:"img","aria-label":`Der Graph von f(x) = (x − 2)² + 1 mit den ersten ${l} Iterierten des Gradientenabstiegs bei γ = ${pe(r,2)}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:lr,y1:ce(0),x2:Gn-hr,y2:ce(0),stroke:Qe,strokeWidth:1}),e.jsx("line",{x1:he(0),y1:dr,x2:he(0),y2:En-ar,stroke:Qe,strokeWidth:1}),b.map(M=>e.jsxs("g",{children:[e.jsx("line",{x1:he(M),y1:ce(0),x2:he(M),y2:ce(0)+4,stroke:Qe}),e.jsx("text",{x:he(M),y:ce(0)+15,fontSize:"9",fill:Qe,textAnchor:"middle",children:M})]},`x${M}`)),S.map(M=>e.jsxs("g",{children:[e.jsx("line",{x1:he(0)-4,y1:ce(M),x2:he(0),y2:ce(M),stroke:Qe}),e.jsx("text",{x:he(0)-6,y:ce(M)+3,fontSize:"9",fill:Qe,textAnchor:"end",children:M})]},`y${M}`)),e.jsx("text",{x:Gn-hr,y:ce(0)-6,fontSize:"10",fill:Qe,textAnchor:"end",children:"x"}),e.jsx("text",{x:he(0)+5,y:dr+9,fontSize:"10",fill:Qe,children:"f(x)"}),e.jsx("polyline",{points:u,fill:"none",stroke:Wt,strokeWidth:2}),e.jsx("circle",{cx:he(2),cy:ce(1),r:5,fill:"none",stroke:Gr,strokeWidth:2}),e.jsx("text",{x:he(2),y:ce(1)+20,fontSize:"9",fill:Gr,textAnchor:"middle",children:"x* = 2"}),e.jsx("polyline",{points:s.filter(M=>Number.isFinite(M)).map(M=>`${he(Te(M)).toFixed(1)},${ce(Xn(xn(M))).toFixed(1)}`).join(" "),fill:"none",stroke:xi,strokeWidth:1.2,strokeDasharray:"4 3",opacity:.8}),s.map((M,g)=>Number.isFinite(M)?e.jsx("circle",{cx:he(Te(M)),cy:ce(Xn(xn(M))),r:g===s.length-1?5:3,fill:xi,opacity:g===s.length-1?1:.55},g):null),k&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:he(z),y1:ce(Xn(j(z))),x2:he(R),y2:ce(Xn(j(R))),stroke:gi,strokeWidth:1.6}),e.jsx("line",{x1:he(Te(o)),y1:ce(0),x2:he(Te(m)),y2:ce(0),stroke:gi,strokeWidth:3}),e.jsx("line",{x1:he(Te(o)),y1:ce(Xn(xn(o))),x2:he(Te(o)),y2:ce(0),stroke:xi,strokeWidth:.9,strokeDasharray:"2 3"}),e.jsx("text",{x:he(Te((o+m)/2)),y:ce(0)-6,fontSize:"9",fill:gi,textAnchor:"middle",children:"−γ f′(x⁽ᵏ⁾)"})]}),!k&&e.jsx("text",{x:Gn/2,y:En/2,fontSize:"11",fill:qt,textAnchor:"middle",children:"x⁽ᵏ⁾ liegt außerhalb des Fensters"})]})}),e.jsxs("div",{className:"min-w-60 grow",children:[e.jsx(re,{label:"Schrittweite γ",value:r,onChange:i,min:.05,max:1.2,step:.05,accent:gi}),e.jsx(re,{label:"Startwert x⁽⁰⁾",value:t,onChange:h,min:.5,max:5,step:.25,accent:xi}),e.jsx(Bi,{step:l,setStep:d,max:Vt,narration:I}),e.jsxs("div",{className:"mt-2 font-mono text-xs",children:[e.jsx("p",{children:"f(x) = (x − 2)² + 1, f′(x) = 2x − 4, L = f″ = 2, also 1/L = 0,5 und 2/L = 1"}),e.jsxs("p",{children:["Fehlerfaktor 1 − γf″ = ",pe(f,2)]}),e.jsxs("table",{className:"mt-1 w-full text-right",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left",children:"k"}),e.jsx("th",{className:"pr-2",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-2",children:"f′(x⁽ᵏ⁾)"}),e.jsx("th",{className:"pr-2",children:"f(x⁽ᵏ⁾)"}),e.jsx("th",{children:"x⁽ᵏ⁾ − 2"})]})}),e.jsx("tbody",{children:D.map(M=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-left",children:M.i}),e.jsx("td",{className:"pr-2",children:pe(M.v)}),e.jsx("td",{className:"pr-2",children:pe(M.g)}),e.jsx("td",{className:"pr-2",children:pe(M.fv)}),e.jsx("td",{children:pe(M.e)})]},M.i))})]})]})]})]}),e.jsx(ye,{kind:c,titel:v,children:W})]})}const yn=K.blau,Zi=K.gruen,Pt=K.rot,Ht=K.grau,We="#64748b",Ti="#94a3b8",Q=(r,i=3)=>Math.abs(r)>=1e5&&Number.isFinite(r)?r.toExponential(2).replace(".",",").replace(/^-/,"−"):Z(r,i),Rr=20,In=[5,1],Rn=400,Kn=220,qn=6.5,or=3.3,Ve=r=>(r+qn)/(2*qn)*Rn,Ie=r=>Kn-(r+or)/(2*or)*Kn,mi=r=>Math.max(-40,Math.min(40,r)),Qn=360,Jn=200,Yn=46,Zt=24,Oi=10,Ui=10,Tt=[{name:"κ = 1: rund",kappa:1,anteil:.5},{name:"κ = 10: Zickzack",kappa:10,anteil:.9},{name:"κ = 100: Schlucht",kappa:100,anteil:.9}];function Ot(r,i){let t=[...In];const h=.5*(In[0]**2+r*In[1]**2);for(let l=1;l<=5e3;l++){t=[t[0]*(1-i),t[1]*(1-i*r)];const d=.5*(t[0]**2+r*t[1]**2);if(!Number.isFinite(d))return null;if(d<=1e-6*h)return l}return null}function Ut(){const[r,i]=F.useState(10),[t,h]=F.useState(.9),l=1,d=r,s=t*2/d,o=F.useMemo(()=>([a,G])=>.5*(a*a+r*G*G),[r]),{pts:f,fv:u}=F.useMemo(()=>{const a=[In],G=[.5*(In[0]**2+r*In[1]**2)];for(let me=0;me<Rr;me++){const[sn,Hn]=a[a.length-1],Zn=[sn-s*sn,Hn-s*r*Hn];a.push(Zn),G.push(.5*(Zn[0]**2+r*Zn[1]**2))}return{pts:a,fv:G}},[r,s]),b=u[0],S=1-l/d,x=1-s*l,z=s<=1/d+1e-12,R=u[3]>0?u[4]/u[3]:NaN,j=1-s,m=1-s*r,k=F.useMemo(()=>Ot(r,s),[r,s]),D=[.06,.22,.5,.9].map(a=>a*b),L=u.map(a=>Math.log10(Math.max(a,1e-16)));let c=Math.ceil(Math.max(...L)),v=Math.floor(Math.min(...L));c-v<4&&(v=c-4),v=Math.max(v,-16);const W=a=>Yn+(Qn-Yn-Ui)*a/Rr,I=a=>Oi+(Jn-Oi-Zt)*(c-Math.max(Math.min(a,c),v))/(c-v),M=Math.max(1,Math.ceil((c-v)/5)),g=[];for(let a=c;a>=v;a-=M)g.push(a);const q=[0,5,10,15,20],U=u.map((a,G)=>Math.log10(Math.max(x**G*b,1e-16)));let C,P,w;Math.abs(m)>1+1e-12?(C="fail",P="γ über der Stabilitätsgrenze",w=`γ = ${Q(s,4)} liegt über 2/L = ${Q(2/d,4)}: In der steilen Richtung wächst der Fehler je Schritt um den Faktor ${Q(Math.abs(m),2)}, die Folge läuft aus dem Bild. ${O("satz:gradientenabstieg-auf-einer-quadrik")} sichert Konvergenz genau für 0 < γ < 2/L, und genau das ist hier verletzt.`):Math.abs(m+1)<1e-12?(C="warn",P="γ = 2/L ist die Grenze",w="In der steilen Richtung pendelt die Iteration zwischen zwei Werten, ohne kleiner zu werden. Die flache Richtung kommt zwar weiter voran, aber die Fehlerkurve läuft in eine waagerechte Gerade."):r===1?Math.abs(m)<1e-12?(C="ok",P="κ = 1: nach einem Schritt fertig",w="Die Höhenlinien sind Kreise, μ und L fallen zusammen, und der negative Gradient zeigt direkt auf das Minimum: Mit γ = 1/L ist das Verfahren nach einem einzigen Schritt am Ziel. Der Zickzack braucht zwei verschiedene Krümmungen; hier gibt es nur eine."):(C="neutral",P="κ = 1: gerade Bahn",w=`Beide Komponenten tragen denselben Faktor ${Q(j,3)}, die Iterierten laufen also auf der Geraden durch Startpunkt und Minimum${j<0?" und springen dabei in jedem Schritt über das Minimum hinweg":""}. Ein Zickzack gibt es hier nicht.`):Math.abs(m)<1e-12?(C="ok",P="γ = 1/L trifft die steile Richtung exakt",w=`x₂ ist nach einem Schritt null. Danach fällt f in jedem Schritt auf das ${Q(j**2,4)}-fache, also SCHNELLER als die Schranke ρ = 1 − μ/L = ${Q(S,4)} aus ${O("satz:konvergenzrate-bei-starker-konvexitaet")}. Genau das führt ${O("beispiel:warum-der-satz-eine-schranke-ist-und")} vor: Der Satz verspricht höchstens ρ pro Schritt, nicht genau ρ.`):Math.abs(j)<1e-12?(C="warn",P="γ = 1/μ trifft die flache Richtung exakt",w=`x₁ ist nach einem Schritt null. In der steilen Richtung springt der Fehler dagegen mit dem Faktor ${Q(m,3)} hin und her. ${O("satz:konvergenzrate-bei-starker-konvexitaet")} deckt diese Schrittweite nicht ab, sie liegt über 1/L.`):j<0?(C="neutral",P="beide Richtungen schießen über",w=`γ ist so groß, dass beide Richtungen über das Minimum hinausschießen: die flache mit dem Faktor ${Q(j,3)}, die steile mit ${Q(m,3)}. Konvergent bleibt es nur, weil beide Beträge unter 1 liegen.`):m<0?(C="neutral",P="Zickzack",w=`In der steilen Richtung wechselt der Fehler mit dem Faktor ${Q(m,2)} das Vorzeichen, in der flachen schrumpft er nur mit ${Q(j,3)}. Die Schrittweite ist an die steile Richtung gebunden, vorankommen müssen wir in der flachen, daher der Zickzack. Bis f auf ein Millionstel gefallen ist, dauert es ${k===null?"hier länger als 5000":k} Schritte.`):(C="neutral",P="monotone Annäherung",w=`Beide Richtungen schrumpfen monoton (Faktoren ${Q(j,3)} und ${Q(m,3)}). Die flache Richtung bestimmt das Tempo, und je größer κ, desto näher liegt ihr Faktor an 1. Bis f auf ein Millionstel gefallen ist, dauert es ${k===null?"hier länger als 5000":k} Schritte.`);const[E,te]=F.useState({azimuth:32,elevation:22}),ue=1.6,p=F.useMemo(()=>({f:(a,G)=>o([a,G]),nx:32,ny:26,color:Ht,opacity:.8,wire:!0}),[o]),B=F.useMemo(()=>{const a=f.filter(([G,me])=>Math.abs(G)<=qn&&Math.abs(me)<=ue).map(([G,me])=>[G,me,o([G,me])]);return a.length>1?[{pts:a,color:yn,width:2,onTop:!0}]:[]},[f,o]),X=F.useMemo(()=>[{p:[0,0,0],color:Zi,r:4.5,label:"x*",onTop:!0}],[]),$=a=>a?Re:Ne;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(Se,{children:"Schieben wir κ von 1 auf 100 und zählen, wie viele Schritte die Fehlerkurve für dieselbe Höhe braucht."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Tt.map(a=>{const G=r===a.kappa&&Math.abs(t-a.anteil)<1e-9;return e.jsx("button",{type:"button","aria-pressed":G,className:$(G),onClick:()=>{i(a.kappa),h(a.anteil)},children:a.name},a.name)})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("svg",{viewBox:`0 0 ${Rn} ${Kn}`,width:Rn,height:Kn,role:"img","aria-label":`Höhenlinien der Quadrik mit κ = ${Q(r,1)} und der Bahn des Gradientenabstiegs über zwanzig Schritte.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:0,y1:Ie(0),x2:Rn,y2:Ie(0),stroke:Ti}),e.jsx("line",{x1:Ve(0),y1:0,x2:Ve(0),y2:Kn,stroke:Ti}),[-6,-4,-2,2,4,6].map(a=>e.jsx("text",{x:Ve(a),y:Ie(0)+12,fontSize:"9",fill:We,textAnchor:"middle",children:a},`x${a}`)),[-3,-2,-1,1,2,3].map(a=>e.jsx("text",{x:Ve(0)-5,y:Ie(a)+3,fontSize:"9",fill:We,textAnchor:"end",children:a},`y${a}`)),e.jsx("text",{x:Rn-8,y:Ie(0)-5,fontSize:"10",fill:We,textAnchor:"end",children:"x₁"}),e.jsx("text",{x:Ve(0)+6,y:12,fontSize:"10",fill:We,children:"x₂"}),D.map((a,G)=>e.jsx("ellipse",{cx:Ve(0),cy:Ie(0),rx:Math.sqrt(2*a)/(2*qn)*Rn,ry:Math.sqrt(2*a/r)/(2*or)*Kn,fill:"none",stroke:Ti,strokeWidth:.9},G)),e.jsx("polyline",{points:f.filter(a=>Number.isFinite(a[0])&&Number.isFinite(a[1])).map(a=>`${Ve(mi(a[0])).toFixed(1)},${Ie(mi(a[1])).toFixed(1)}`).join(" "),fill:"none",stroke:yn,strokeWidth:1.5}),f.map((a,G)=>e.jsx("circle",{cx:Ve(mi(a[0])),cy:Ie(mi(a[1])),r:G===0?4.5:2.4,fill:yn,opacity:G===0?1:.85},G)),e.jsx("circle",{cx:Ve(0),cy:Ie(0),r:5,fill:"none",stroke:Zi,strokeWidth:2}),e.jsx("text",{x:Ve(0)+8,y:Ie(0)-8,fontSize:"9",fill:Zi,children:"x*"})]}),e.jsxs("svg",{viewBox:`0 0 ${Qn} ${Jn}`,width:Qn,height:Jn,role:"img","aria-label":"Halblogarithmischer Verlauf des Funktionswerts über zwanzig Schritte, mit der Schranke des Satzes als gestrichelter Geraden.",className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[g.map(a=>e.jsxs("g",{children:[e.jsx("line",{x1:Yn,y1:I(a),x2:Qn-Ui,y2:I(a),stroke:"#e2e8f0"}),e.jsxs("text",{x:Yn-4,y:I(a)+3,fontSize:"9",fill:We,textAnchor:"end",children:["10",a<0?"⁻":"",String(Math.abs(a)).split("").map(G=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(G)]).join("")]})]},a)),q.map(a=>e.jsx("text",{x:W(a),y:Jn-6,fontSize:"9",fill:We,textAnchor:"middle",children:a},a)),z&&e.jsx("polyline",{points:U.map((a,G)=>`${W(G).toFixed(1)},${I(a).toFixed(1)}`).join(" "),fill:"none",stroke:We,strokeWidth:1.4,strokeDasharray:"5 4"}),e.jsx("polyline",{points:L.map((a,G)=>`${W(G).toFixed(1)},${I(a).toFixed(1)}`).join(" "),fill:"none",stroke:yn,strokeWidth:1.6}),L.map((a,G)=>e.jsx("circle",{cx:W(G),cy:I(a),r:2.4,fill:yn},G)),e.jsx("text",{x:Yn+4,y:Oi+9,fontSize:"9",fill:We,children:"f(x⁽ᵏ⁾) − f(x*), logarithmisch"}),e.jsx("text",{x:Qn-Ui,y:Jn-6,fontSize:"9",fill:We,textAnchor:"end",children:"k"})]}),e.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:[e.jsx("span",{style:{color:yn},children:"●"})," gemessener Verlauf ·"," ",z?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:We},children:"– –"})," Schranke (1 − γμ)",e.jsx("sup",{children:"k"})," · f(x⁽⁰⁾)"]}):e.jsx("span",{style:{color:Pt},children:"für γ > 1/L gibt der Satz keine Schranke her"})]})]}),e.jsxs("div",{className:"min-w-60 grow space-y-3",children:[e.jsxs("div",{children:[e.jsx(br,{size:280,xDomain:[-qn,qn],yDomain:[-ue,ue],surface:p,points:X,curves:B,labels:{x:"x₁",y:"x₂",z:"f"},azimuth:E.azimuth,elevation:E.elevation,onViewChange:te,ariaLabel:`Die Quadrik als Fläche über der Ebene; bei κ = ${Q(r,1)} ${r>3?"ein enges Tal mit steilen Wänden":"eine runde Schale"}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:E,onChange:te})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche, dieselbe Bahn: Je größer κ, desto enger das Tal und desto steiler die Wände, an denen die Iterierten hin und her prallen."})]}),e.jsx(re,{label:"Kondition κ = L/μ",value:r,onChange:a=>i(Math.round(a)),min:1,max:100,step:1,fmt:a=>Q(a,0)}),e.jsx(re,{label:"γ als Anteil von 2/L",value:t,onChange:h,min:.05,max:1.1,step:.05}),e.jsxs("div",{className:"space-y-1 font-mono text-xs",children:[e.jsxs("p",{children:["f(x) = ½(x₁² + ",Q(r,0)," x₂²), H = diag(1; ",Q(r,0),"), μ = 1, L ="," ",Q(r,0)]}),e.jsxs("p",{children:["γ = ",Q(s,4)," (1/L = ",Q(1/d,4),", 2/L = ",Q(2/d,4),")"]}),e.jsxs("p",{children:["Fehlerfaktoren: flach 1 − γμ = ",Q(j,3),", steil 1 − γL = ",Q(m,3)]}),e.jsxs("p",{children:["ρ = 1 − μ/L = ",Q(S,4),"; gemessener Quotient f⁽⁴⁾/f⁽³⁾ = ",Q(R,4)]}),e.jsxs("p",{children:["Schritte, bis f auf ein Millionstel gefallen ist:"," ",k===null?"über 5000 (oder nie)":k]})]})]})]}),e.jsx(ye,{kind:C,titel:P,children:w})]})}const Lr=K.blau,Er=K.rot,Kr=K.orange,Ct=K.violett,Mn="#64748b",ji="#94a3b8",fr=5,Xt=([r,i])=>.5*r*r+.5*fr*i*i,Qt=([r,i])=>[r,fr*i],oe=(r,i=3)=>Z(r,i),Jt=[{name:"c = 0,05: Praxis",x1:5,x2:1,c:.05,rho:.5},{name:"c = 0,3: Lehrbuch",x1:5,x2:1,c:.3,rho:.5}],gn=430,bn=250,Dn=46,Ci=26,mn=10,ei=12,Xi=1.2;function Yt(){const[r,i]=F.useState(5),[t,h]=F.useState(1),[l,d]=F.useState(.2),[s,o]=F.useState(.5),f=[r,t],u=Qt(f),b=[-u[0],-u[1]],S=u[0]*b[0]+u[1]*b[1],x=$=>Xt([f[0]+$*b[0],f[1]+$*b[1]]),z=x(0),R=$=>z+l*$*S,j=$=>z+$*S,m=60,k=[];let D=1,L=0;for(;x(D)>R(D)&&L<m;)k.push(D),D*=s,L++;const c=D,v=x(D)<=R(D),W=k.length<=3?[...k,c].map($=>oe($,4)).join(" → "):`${oe(k[0],4)} → ${oe(k[1],4)} → … → ${oe(c,4)}`,I=u[0]*u[0]+u[1]*u[1],M=u[0]*u[0]+fr*u[1]*u[1],g=M>0?I/M:NaN,q=160,U=Array.from({length:q+1},($,a)=>Xi*a/q),C=Math.max(...U.map(x),1e-6)*1.06,P=-.28*C,w=$=>Dn+(gn-Dn-ei)*$/Xi,E=$=>mn+(bn-mn-Ci)*(1-($-P)/(C-P)),te=$=>$>=P&&$<=C,ue=$=>U.filter(a=>te($(a))).map(a=>`${w(a).toFixed(1)},${E($(a)).toFixed(1)}`).join(" ");let p,B,X;return I<1e-12?(p="neutral",B="kein Gradient, keine Suchrichtung",X="Der Gradient verschwindet, es gibt keine Suchrichtung. Die Liniensuche hat hier nichts zu tun; die Abbruchkriterien haben längst gegriffen."):v?L===0?(p="ok",B="der volle Schritt genügt",X=`Der volle Schritt γ = 1 wird sofort angenommen: φ(1) = ${oe(x(1))} liegt bereits unter der Schranke ${oe(R(1))}. Bedingung (${sr("eq:backtracking-liniensuche-nach-armijo")}) aus ${O("algorithmus:backtracking-liniensuche-nach-armijo")} ist also schon beim ersten Versuch erfüllt.`):(p="ok",B=L===1?"eine Halbierung genügt":`${L} Halbierungen`,X=`${L===1?"Eine Verkleinerung genügt":`${L} Verkleinerungen genügen`}: γ = ${oe(c,4)} drückt den Funktionswert von ${oe(z)} auf ${oe(x(c))}, gefordert war nach (${sr("eq:backtracking-liniensuche-nach-armijo")}) höchstens ${oe(R(c))}. Der exakte Minimierer läge bei γ* = ${oe(g,4)}; ihn zu suchen wäre teurer als der gewonnene Fortschritt wert ist.`):(p="fail",B="abgebrochen",X=`Auch nach ${m} Verkleinerungen ist die Bedingung nicht erfüllt; hier bricht das Widget ab. Am Verfahren liegt das nicht, denn für hinreichend kleine γ ist die Bedingung stets erfüllbar.`),e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(Se,{children:"Drehen wir c hoch, bis die graue Gerade so steil steht, dass die erste Halbierung nicht mehr genügt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Jt.map($=>{const a=r===$.x1&&t===$.x2&&Math.abs(l-$.c)<1e-9&&Math.abs(s-$.rho)<1e-9;return e.jsx("button",{type:"button","aria-pressed":a,className:a?Re:Ne,onClick:()=>{i($.x1),h($.x2),d($.c),o($.rho)},children:$.name},$.name)})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"inline-block",children:[e.jsxs("svg",{viewBox:`0 0 ${gn} ${bn}`,width:gn,height:bn,role:"img","aria-label":`Der Schnitt φ(γ) = f(x + γd) mit der Armijo-Geraden und den ${k.length} verworfenen Probeschritten.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:Dn,y1:E(0),x2:gn-ei,y2:E(0),stroke:ji}),e.jsx("line",{x1:Dn,y1:mn,x2:Dn,y2:bn-Ci,stroke:ji}),[0,.25,.5,.75,1].map($=>e.jsxs("g",{children:[e.jsx("line",{x1:w($),y1:E(0),x2:w($),y2:E(0)+4,stroke:ji}),e.jsx("text",{x:w($),y:bn-8,fontSize:"9",fill:Mn,textAnchor:"middle",children:oe($,2)})]},$)),e.jsx("text",{x:gn-ei,y:bn-8,fontSize:"10",fill:Mn,textAnchor:"end",children:"γ"}),e.jsx("text",{x:Dn+4,y:mn+9,fontSize:"10",fill:Mn,children:"φ(γ) = f(x + γd)"}),e.jsx("polyline",{points:ue(j),fill:"none",stroke:Kr,strokeWidth:1.5}),e.jsx("polyline",{points:ue(R),fill:"none",stroke:Mn,strokeWidth:1.5,strokeDasharray:"6 4"}),e.jsx("polyline",{points:ue(x),fill:"none",stroke:Ct,strokeWidth:2}),k.slice(0,24).map(($,a)=>e.jsxs("g",{children:[e.jsx("circle",{cx:w($),cy:E(Math.min(x($),C)),r:4,fill:Er}),e.jsx("line",{x1:w($),y1:E(Math.min(x($),C)),x2:w($),y2:E(Math.max(R($),P)),stroke:Er,strokeWidth:1,strokeDasharray:"2 3"})]},a)),v&&I>=1e-12&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:w(c),cy:E(x(c)),r:5,fill:Lr}),e.jsxs("text",{x:w(c),y:E(x(c))-9,fontSize:"10",fill:Lr,textAnchor:"middle",children:["γ = ",oe(c,3)]})]}),Number.isFinite(g)&&g<=Xi&&e.jsx("line",{x1:w(g),y1:mn,x2:w(g),y2:bn-Ci,stroke:ji,strokeDasharray:"3 3"}),e.jsx("text",{x:gn-ei,y:mn+9,fontSize:"9",fill:Kr,textAnchor:"end",children:"Tangente"}),e.jsx("text",{x:gn-ei,y:mn+21,fontSize:"9",fill:Mn,textAnchor:"end",children:"Armijo-Schranke"})]}),e.jsx("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:"Die dünne senkrechte Linie steht auf γ*, dem Tiefpunkt des Schnitts. Ihn zu treffen wäre die exakte Liniensuche; die Armijo-Bedingung verlangt weniger, nämlich nur, unter der grauen Geraden zu landen."})]}),e.jsxs("div",{className:"min-w-60 grow",children:[e.jsx(re,{label:"x₁",value:r,onChange:i,min:-6,max:6,step:.25}),e.jsx(re,{label:"x₂",value:t,onChange:h,min:-2,max:2,step:.25}),e.jsx(re,{label:"Abstiegsanteil c",value:l,onChange:d,min:.05,max:.5,step:.05,accent:Mn}),e.jsx(re,{label:"Verkleinerungsfaktor ρ",value:s,onChange:o,min:.1,max:.9,step:.1}),e.jsxs("div",{className:"mt-2 space-y-1 font-mono text-xs",children:[e.jsx("p",{children:"f(x) = ½x₁² + 2,5x₂², ∇f(x) = (x₁; 5x₂), also μ = 1, L = 5, κ_f = 5"}),e.jsxs("p",{children:["x = (",oe(r,2),"; ",oe(t,2),"), ∇f(x) = (",oe(u[0],2),"; ",oe(u[1],2),"), d = −∇f(x)ᵀ"]}),e.jsxs("p",{children:["φ(0) = ",oe(z),", φ′(0) = ∇f(x)d = ",oe(S),I<1e-12?" (null, weil der Gradient verschwindet)":" (negativ, sonst wäre d keine Abstiegsrichtung)"]}),e.jsxs("p",{children:["geprüfte Schrittweiten: ",W,k.length>3?` (${L} Verkleinerungen)`:""]}),e.jsxs("p",{children:["exakter Minimierer γ* = ",oe(g,4)," mit φ(γ*) = ",oe(x(g))]})]}),e.jsx("p",{className:"mt-2 text-xs text-slate-500 dark:text-slate-400",children:"Der Regler für c beginnt bei 0,05 und damit weit über dem Praxiswert 10⁻⁴; nur so ist die graue Armijo-Gerade von der waagerechten Höhe φ(0) zu unterscheiden."})]})]}),e.jsx(ye,{kind:p,titel:B,children:X})]})}function qr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Wie viel Ableitung darf es sein?"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),` hat die Bedingung geliefert, an der ein Minimum zu
erkennen ist: In einem inneren Minimum verschwindet der Gradient. Nur ist
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),` ein nichtlineares Gleichungssystem, und
solche Systeme lösen wir nach `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` iterativ. Ab hier geht
es also um Verfahren, die eine Folge `,e.jsx(n,{children:`\\cblue{\\bx^{(0)}}, \\cblue{\\bx^{(1)}},
\\cblue{\\bx^{(2)}}, \\dots`}),` erzeugen und hoffen, dass sie gegen ein Minimum
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," läuft."]}),`
`,e.jsx(i.p,{children:`Die Verfahren unterscheiden sich vor allem darin, wie viel Ableitungsinformation
sie überhaupt benutzen. Das ist keine akademische Einteilung: Jede Ableitung, die
ein Verfahren verlangt, muss jemand bereitstellen, sei es von Hand, per
automatischem Differenzieren oder durch Differenzenquotienten, und jede Ableitung
kostet Rechenzeit in jedem einzelnen Schritt.`}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.1 (Taxonomie nach Ableitungsordnung)",id:"env-taxonomie-nach-ableitungsordnung",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Ordnung"}),e.jsx(i.th,{children:"benutzt"}),e.jsx(i.th,{children:"Beispiele"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"nullte"}),e.jsxs(i.td,{children:["nur Funktionswerte ",e.jsx(n,{children:"\\cblue{f(\\bx)}"})]}),e.jsx(i.td,{children:"Nelder-Mead, Gittersuche"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"erste"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{f}"})," und ",e.jsx(n,{children:"\\corange{\\nabla f}"})]}),e.jsx(i.td,{children:"Gradientenabstieg, Momentum-Verfahren, SGD"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"zweite"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{f}"}),", ",e.jsx(n,{children:"\\corange{\\nabla f}"})," und ",e.jsx(n,{children:"\\corange{\\bH_f}"})]}),e.jsx(i.td,{children:"Newton-Verfahren"})]})]})]}),e.jsxs(i.p,{children:[`Der Tausch hat in beide Richtungen seinen Preis. Verfahren nullter Ordnung sind
robust und laufen auf allem, was sich auswerten lässt, auch auf Funktionen mit
Knicken oder auf Simulationsergebnissen; dafür brauchen sie viele Iterationen.
Höhere Ordnung bringt schnellere Konvergenz, macht aber jeden einzelnen Schritt
teurer, und die Hesse-Matrix hat `,e.jsx(n,{children:"n^2"}),` Einträge. In der Praxis greifen wir oft
zu einem Kompromiss, den superlinearen Quasi-Newton-Verfahren wie BFGS, die eine
Näherung der inversen Hesse-Matrix aus den bereits berechneten Gradienten
aufbauen (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]}),e.jsx(i.p,{children:`Dieser Abschnitt behandelt die ersten beiden Zeilen: ein Verfahren nullter
Ordnung als robusten Notnagel und den Gradientenabstieg als das
Arbeitspferd, auf dem das ganze maschinelle Lernen läuft.`})]}),`
`,e.jsx(i.h3,{children:"Nelder-Mead: Optimieren ohne Ableitungen"}),`
`,e.jsxs(i.p,{children:[`Manchmal gibt es keine Ableitung. Die Zielfunktion ist das Ergebnis einer
Simulation, einer Datenbankabfrage oder eines Programms, dessen Innenleben wir
nicht kennen; sie kann Knicke haben oder gar nicht überall differenzierbar sein.
Dann bleibt nur, Funktionswerte zu vergleichen. Das bekannteste Verfahren dieser
Art arbeitet mit einem `,e.jsx(i.em,{children:"Simplex"}),", also mit ",e.jsx(n,{children:"n+1"})," Punkten im ",e.jsx(n,{children:"\\R^n"}),`: einem Dreieck
in der Ebene, einem Tetraeder im Raum. Der Simplex kriecht durch den Suchraum,
dehnt sich und schrumpft wieder, indem er in jedem Schritt seine schlechteste
Ecke durch eine bessere ersetzt.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.3.2 (Nelder-Mead-Simplexverfahren)",id:"env-nelder-mead-simplexverfahren",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," und ein Startsimplex aus ",e.jsx(n,{children:"n+1"}),` Punkten.
Wiederhole, bis der Simplex klein genug ist:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Sortieren."})," Ordne die Ecken nach Funktionswert, ",e.jsx(n,{children:"\\cblue{\\bx_{(1)}}"}),` sei die
beste und `,e.jsx(n,{children:"\\cblue{\\bx_{(n+1)}}"}),` die schlechteste. Bilde den Schwerpunkt
`,e.jsx(n,{children:"\\cblue{\\bc}"})," der ",e.jsx(n,{children:"n"})," besten Ecken."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Reflexion."}),` Spiegle die schlechteste Ecke am Schwerpunkt,
`,e.jsx(n,{children:"\\corange{\\bx_r} = \\cblue{\\bc} + (\\cblue{\\bc} - \\cblue{\\bx_{(n+1)}})"}),`. Ist
`,e.jsx(n,{children:"f(\\corange{\\bx_r})"}),` besser als die zweitschlechteste Ecke, aber nicht besser
als die beste, so übernimm `,e.jsx(n,{children:"\\corange{\\bx_r}"})," und beginne von vorn."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Expansion."})," Ist ",e.jsx(n,{children:"f(\\corange{\\bx_r})"}),` besser als alles Bisherige, so gehe in
derselben Richtung noch weiter,
`,e.jsx(n,{children:"\\corange{\\bx_e} = \\cblue{\\bc} + 2(\\cblue{\\bc} - \\cblue{\\bx_{(n+1)}})"}),`, und
übernimm den besseren der beiden Punkte.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kontraktion."})," Ist ",e.jsx(n,{children:"\\corange{\\bx_r}"}),` nicht besser als die zweitschlechteste
Ecke, so probiere einen Punkt auf halbem Weg zwischen Schwerpunkt und dem
besseren der beiden Punkte `,e.jsx(n,{children:"\\corange{\\bx_r}"})," und ",e.jsx(n,{children:"\\cblue{\\bx_{(n+1)}}"}),`;
übernimm ihn, falls er besser ist als beide.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Schrumpfen."}),` Hilft auch das nicht, so ziehe alle Ecken zur besten Ecke
`,e.jsx(n,{children:"\\cblue{\\bx_{(1)}}"})," hin."]}),`
`]})]}),`
`,e.jsx(i.p,{children:`Zwei Bewegungsmuster stecken in diesen vier Zügen. Solange es bergab geht,
schaukelt sich der Simplex über Reflexionen und Expansionen voran und wird dabei
lang; sobald er ein Tal umschließt, ziehen ihn Kontraktionen und
Schrumpfschritte zusammen. Die Schrittweite steuert er dabei selbst, ohne dass
wir einen Parameter einstellen müssten. Das ist der eigentliche Reiz des
Verfahrens.`}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.3 (Wann sich Nelder-Mead lohnt)",id:"env-wann-sich-nelder-mead-lohnt",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Situation"}),e.jsx(i.th,{children:"geeignet?"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Ableitungen nicht verfügbar"}),e.jsx(i.td,{children:"ja, das ist der Hauptgrund"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["niedrige Dimension, ",e.jsx(n,{children:"n \\leq 10"})]}),e.jsx(i.td,{children:"ja"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"nicht glatte Zielfunktion"}),e.jsx(i.td,{children:"ja, es werden nur Werte verglichen"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["hohe Dimension, ",e.jsx(n,{children:"n > 50"})]}),e.jsx(i.td,{children:"nein, zu langsam"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"präzise Konvergenz nötig"}),e.jsx(i.td,{children:"nein, im Allgemeinen ohne Garantie"})]})]})]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kosten."})," Ein Simplex im ",e.jsx(n,{children:"\\R^n"})," hat ",e.jsx(n,{children:"n+1"}),` Ecken. Ein gewöhnlicher Schritt kostet
ein bis zwei neue Funktionsauswertungen, ein Schrumpfschritt dagegen `,e.jsx(n,{children:"n"}),` neue
Ecken; pro Iteration fallen also `,e.jsx(n,{children:"O(n)"}),` Auswertungen an
(`,e.jsx(A,{id:"big-o-notation",children:"Landau-Notation"}),`), und es sind meist sehr viele Iterationen
nötig. In hoher Dimension wird beides zum Problem.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Garantien."}),` Es gibt keinen allgemeinen Konvergenzsatz. Schlimmer noch, es sind
strikt konvexe Funktionen bekannt, auf denen das Verfahren gegen einen Punkt
läuft, der gar kein stationärer Punkt ist (McKinnon 1998). In der Praxis wird
Nelder-Mead deshalb gern als robuste Startpunktsuche vor einem
gradientenbasierten Verfahren eingesetzt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"In R."})," Nelder-Mead ist die Voreinstellung von ",e.jsx(i.code,{children:"optim()"}),`; wer nichts angibt,
optimiert also ableitungsfrei:`]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`# Nelder-Mead ist der Default in optim()!
optim(c(0, 0), f)                          # verwendet Nelder-Mead
optim(c(0, 0), f, method = "Nelder-Mead")  # explizit
`})}),e.jsxs(i.p,{children:[`Das ist bequem und für viele Modelle ausreichend, erklärt aber auch, warum eine
`,e.jsx(i.code,{children:"optim()"}),`-Anpassung mit vielen Parametern manchmal überraschend lange läuft. Wer
Ableitungen hat, gibt sie über `,e.jsx(i.code,{children:"gr"}),` an und wählt dazu ein gradientenbasiertes
`,e.jsx(i.code,{children:"method"}),"; ",e.jsx(i.a,{href:"#sec-12.6",children:"Abschnitt 12.6"})," geht die Optionen durch."]})]}),`
`,e.jsx(i.p,{children:`Vier Züge, aber wie oft fällt welcher? Das entscheidet über die Kosten des
Verfahrens, denn die vier sind verschieden teuer. Sehen wir zu.`}),`
`,e.jsxs(ze,{title:"Der Simplex bei der Arbeit",children:[e.jsxs(i.p,{children:[`Hier läuft das Verfahren Schritt für Schritt, auf der Testfunktion
`,e.jsx(n,{children:"f(\\bx) = (1-x_1)^2 + 5(x_2 - x_1^2)^2"})," mit Minimum in ",e.jsx(n,{children:"\\cgreen{(1; 1)}"}),`. Der orange Strahl markiert jeweils den nächsten
Versuchspunkt; der Schrittregler lässt sich vorwärts und rückwärts schieben, der
Abspielknopf lässt den ganzen Lauf durchlaufen.`]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Welcher der vier Züge fällt auf dieser Testfunktion am häufigsten?"}),optionen:[{id:"reflexion",text:"Reflexion"},{id:"expansion",text:"Expansion"},{id:"kontraktion",text:"Kontraktion"},{id:"schrumpfen",text:"Schrumpfen"}],loesung:"kontraktion",verdeckt:e.jsx(e.Fragment,{children:"Der Zugzähler im Widget führt mit."}),children:e.jsx(Kt,{})}),e.jsxs(i.p,{children:[`Die vier Züge verteilen sich sehr ungleich. Aus dem voreingestellten Simplex
braucht das Verfahren vierzig Schritte, bis der beste Eckpunkt unter `,e.jsx(n,{children:"10^{-6}"}),`
liegt, und der Zähler steht dann auf `,e.jsx(n,{children:"23"})," Kontraktionen, ",e.jsx(n,{children:"13"}),` Reflexionen und
`,e.jsx(n,{children:"4"}),` Expansionen; ein Schrumpfschritt, der teuerste Zug, kommt auf diesem Weg gar
nicht vor, erst der zweite Startsimplex führt ihn im vierten Schritt vor. Auch die
Form verrät, wo der Simplex steht: Auf den geraden Stücken des Tals wird er lang
und dünn und legt sich in Laufrichtung, in der Biegung um `,e.jsx(n,{children:"x_1 \\approx 0"}),`
schrumpft er auf ein fast gleichseitiges Dreieck und dreht sich in die neue
Richtung. Diese Anpassung an die lokale Geometrie ersetzt hier die fehlende
Ableitung.`]}),e.jsxs(i.p,{children:[`Eine sehr sehenswerte Animation derselben Züge, mit einstellbaren Parametern und
mehreren Testfunktionen, liegt unter
`,e.jsx(i.a,{href:"https://alexdowad.github.io/visualizing-nelder-mead/",children:"alexdowad.github.io/visualizing-nelder-mead"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Der Gradientenabstieg"}),`
`,e.jsxs(i.p,{children:[`Der Gradient zeigt bergauf. Diese eine Beobachtung aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),` reicht schon für ein
Optimierungsverfahren: Wenn wir minimieren wollen, laufen wir in die
Gegenrichtung.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.3.4 (Gradientenabstieg)",id:"env-nelder-mead-gradient-gradientenabstieg",children:[e.jsxs(i.p,{children:["Gegeben seien eine differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`, ein
Startpunkt `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"})," und eine Schrittweite ",e.jsx(n,{children:"\\gamma > 0"}),`. Für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ee,{tag:"12.3.1",id:"eq-nelder-mead-gradient-gradientenabstieg",children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\gamma\\,\\corange{\\nabla f\\bigl(\\cblue{\\bx^{(k)}}\\bigr)^\\top}"}),e.jsxs(i.p,{children:["und brich ab, sobald eines der Kriterien aus ",e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"})," greift."]})]}),`
`,e.jsxs(i.p,{children:[`Das Transponierte gehört dazu. Der Gradient ist in diesem Skript ein Zeilenvektor
(`,e.jsx(A,{id:"gradient",children:"Gradient"}),", ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`), eine
Richtung im `,e.jsx(n,{children:"\\R^n"}),` dagegen eine Spalte. In der Sprache des maschinellen Lernens
heißt `,e.jsx(n,{children:"\\gamma"})," ",e.jsx(i.em,{children:"Lernrate"}),` (learning rate), und das Verfahren selbst heißt
`,e.jsx(A,{id:"gradient-descent",children:"Gradientenabstieg"})," (gradient descent)."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.5 (Drei Lesarten desselben Schritts)",id:"env-drei-lesarten-desselben-schritts",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Steilster Abstieg."})," Sei ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"}),`. Unter allen
Richtungen `,e.jsx(n,{children:"\\bd"})," mit ",e.jsx(n,{children:"\\left\\|\\bd\\right\\| = 1"}),`
macht `,e.jsx(n,{children:"\\bd = -\\corange{\\nabla f(\\bx)^\\top}/\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|"}),`
die Richtungsableitung `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd"}),` so klein wie möglich; das ist
der Gleichheitsfall der
`,e.jsx(A,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"}),` und steht als Satz in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`. Lokal gibt es also keine bessere
Richtung als die des negativen Gradienten.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Abstiegsrichtung."})," Für ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"}),` ist
`,e.jsx(n,{children:`\\corange{\\nabla f(\\bx)}\\bigl(-\\corange{\\nabla f(\\bx)^\\top}\\bigr)
= -\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|^2 < 0`}),`, und
nach der Taylorentwicklung erster Ordnung
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),") sinkt ",e.jsx(n,{children:"f"}),` deshalb für alle
hinreichend kleinen `,e.jsx(n,{children:"\\gamma"}),` tatsächlich. Zwei Zusätze wären dabei zu großzügig.
Abstiegsrichtung ist `,e.jsx(n,{children:"-\\corange{\\nabla f(\\bx)^\\top}"}),` auch ohne Konvexität, solange
der Gradient nicht verschwindet – Konvexität wird dafür gar nicht gebraucht. Und
`,e.jsx(i.em,{children:"hin zum"}),` Minimum zeigt sie im Allgemeinen gerade nicht, wie das Zickzack-Bild
weiter unten vorführt. Was die `,e.jsx(A,{id:"convexity",children:"Konvexität"}),` aus
`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.3",children:"Kapitel 11"}),` beisteuert, ist etwas anderes und
Wichtigeres: Sie sorgt dafür, dass jeder stationäre Punkt schon ein globales
Minimum ist (`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`), das Verfahren also nirgends sonst
hängen bleiben kann.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fixpunktiteration."})," Mit ",e.jsx(n,{children:"\\bg(\\bx) := \\bx - \\gamma\\,\\corange{\\nabla f(\\bx)^\\top}"}),`
ist `,e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"})," wörtlich die ",e.jsx(A,{id:"fixed-point-iteration",children:"Fixpunktiteration"}),`
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\bg(\\cblue{\\bx^{(k)}})"}),` aus
`,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),", und die Fixpunkte von ",e.jsx(n,{children:"\\bg"}),` sind genau die
stationären Punkte von `,e.jsx(n,{children:"f"}),`. Alles, was dort über Schrittweiten und
Konvergenzraten steht, gilt deshalb hier weiter; wir bekommen es gleich in
schärferer Form, weil `,e.jsx(n,{children:"\\corange{\\nabla f}"}),` mehr Struktur hat als ein beliebiges
`,e.jsx(n,{children:"\\bg"}),"."]})]}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.3.6 (Gradientenabstieg von Hand)",id:"env-gradientenabstieg-von-hand",children:[e.jsxs(i.p,{children:["Minimieren wir ",e.jsx(n,{children:"\\cblue{f(x)} = (x-2)^2 + 1"})," mit Startwert ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4{,}5"}),`
und Schrittweite `,e.jsx(n,{children:"\\gamma = 0{,}6"}),`. Die Ableitung ist
`,e.jsx(n,{children:"\\corange{f'(x)} = 2x - 4"}),", das Minimum liegt bei ",e.jsx(n,{children:"\\cgreen{x^\\star} = 2"}),`, denn
dort und nur dort verschwindet sie.`]}),e.jsx(_,{children:`\\begin{aligned}
\\cblue{x^{(0)}} &= 4{,}5 , \\\\
\\cblue{x^{(1)}} &= \\cblue{x^{(0)}} - 0{,}6\\,\\corange{f'(x^{(0)})}
 = 4{,}5 - 0{,}6\\cdot(2\\cdot 4{,}5 - 4) = 4{,}5 - 3 = \\cblue{1{,}5} , \\\\
\\cblue{x^{(2)}} &= \\cblue{x^{(1)}} - 0{,}6\\,\\corange{f'(x^{(1)})}
 = 1{,}5 - 0{,}6\\cdot(2\\cdot 1{,}5 - 4) = 1{,}5 + 0{,}6 = \\cblue{2{,}1} , \\\\
\\cblue{x^{(3)}} &= \\cblue{x^{(2)}} - 0{,}6\\,\\corange{f'(x^{(2)})}
 = 2{,}1 - 0{,}6\\cdot(2\\cdot 2{,}1 - 4) = 2{,}1 - 0{,}12 = \\cblue{1{,}98} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Der erste Schritt schießt weit über das Ziel hinaus, von ",e.jsx(n,{children:"4{,}5"})," auf ",e.jsx(n,{children:"1{,}5"}),`.
Danach wird die Iteration schnell brav: Die Fehler
`,e.jsx(n,{children:"\\cblue{x^{(k)}} - \\cgreen{x^\\star}"})," sind ",e.jsx(n,{children:"2{,}5"}),", ",e.jsx(n,{children:"-0{,}5"}),", ",e.jsx(n,{children:"0{,}1"}),` und
`,e.jsx(n,{children:"-0{,}02"}),`. Sie wechseln in jedem Schritt das Vorzeichen und schrumpfen dabei
exakt auf ein Fünftel.`]})]}),`
`,e.jsxs(i.p,{children:["Dass dort der Faktor ",e.jsx(n,{children:"-0{,}2"}),` steht, ist kein Zufall. Bevor wir den Grund
ausrechnen, probieren wir die Schrittweite selbst aus: Welche Werte von `,e.jsx(n,{children:"\\gamma"}),`
führen ans Ziel, welche nicht?`]}),`
`,e.jsxs(ze,{title:"Die Schrittweite am eindimensionalen Beispiel",children:[e.jsxs(i.p,{children:["Die Tafel zeigt ",e.jsx(i.a,{href:"#env-gradientenabstieg-von-hand",children:"Beispiel 12.3.6"}),` mit frei einstellbarem
`,e.jsx(n,{children:"\\gamma"}),". Weil ",e.jsx(n,{children:"f'' \\equiv 2"}),` ist, liegen die beiden Schwellen direkt auf dem
Reglerraster und lassen sich einzeln ansteuern; der Schrittregler läuft vorwärts
wie rückwärts.`]}),e.jsx(Ge,{frage:e.jsxs(e.Fragment,{children:["Ab welchem ",e.jsx(n,{children:"\\gamma"})," läuft die Iteration davon, statt sich dem Minimum zu nähern?"]}),loesung:1,toleranz:.1,einheit:"γ",verdeckt:e.jsxs(e.Fragment,{children:["Die Grenze ist ",e.jsx(n,{children:"2/L"}),", hier also ",e.jsx(n,{children:"\\gamma = 1"}),". Dort pendelt die Folge; darüber wächst der Fehler."]}),children:e.jsx(It,{})})]}),`
`,e.jsx(i.p,{children:`Die Beobachtungen ordnen sich zu einer vollständigen Fallunterscheidung, und die
lohnt sich auszurechnen: Sie erklärt das ganze Verhalten des Verfahrens auf einen
Schlag.`}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.7 (Zu klein, zu groß, gerade richtig)",id:"env-zu-klein-zu-gross-gerade-richtig",children:[e.jsxs(i.p,{children:["Für eine Parabel ",e.jsx(n,{children:"f(x) = \\tfrac{L}{2}(x - \\cgreen{x^\\star})^2"}),` mit Krümmung
`,e.jsx(n,{children:"L > 0"})," ist ",e.jsx(n,{children:"\\corange{f'(x)} = L(x - \\cgreen{x^\\star})"}),", und ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` wird zu
einer Rekursion für den Fehler
`,e.jsx(n,{children:"e^{(k)} := \\cblue{x^{(k)}} - \\cgreen{x^\\star}"}),":"]}),e.jsx(ee,{tag:"12.3.2",id:"eq-zu-klein-zu-gross-gerade-richtig",children:`e^{(k+1)} = e^{(k)} - \\gamma L\\, e^{(k)} = (1 - \\gamma L)\\, e^{(k)} ,
\\qquad\\text{also}\\qquad
e^{(k)} = (1 - \\gamma L)^k\\, e^{(0)} .`}),e.jsxs(i.p,{children:["Den Buchstaben ",e.jsx(n,{children:"L"})," für die Krümmung wählen wir mit Absicht; ",e.jsx(i.a,{href:"#env-lipschitz-stetigkeit",children:"Definition 12.3.8"}),`
wird zeigen, dass diese Größe die Schrittweite auch im allgemeinen Fall
begrenzt. Entschieden ist damit alles, und zwar allein durch den Betrag von
`,e.jsx(n,{children:"1 - \\gamma L"}),":"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"0 < \\gamma < 1/L"}),": Der Faktor liegt in ",e.jsx(n,{children:"(0, 1)"}),`, der Fehler behält sein
Vorzeichen und schrumpft. Für sehr kleines `,e.jsx(n,{children:"\\gamma"})," liegt er dicht an ",e.jsx(n,{children:"1"}),`, und
das Verfahren kriecht.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\gamma = 1/L"}),`: Der Faktor ist null, ein einziger Schritt trifft
`,e.jsx(n,{children:"\\cgreen{x^\\star}"})," exakt."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"1/L < \\gamma < 2/L"}),": Der Faktor ist negativ mit Betrag unter ",e.jsx(n,{children:"1"}),`; die
Iterierten springen über das Minimum hinweg und nähern sich trotzdem.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\gamma = 2/L"}),": Der Betrag ist genau ",e.jsx(n,{children:"1"}),`. Die Folge pendelt für immer zwischen
zwei Punkten.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cred{\\gamma > 2/L}"}),": Der Betrag übersteigt ",e.jsx(n,{children:"1"}),`, jeder Schritt vergrößert den
Fehler, das Verfahren divergiert. Und das, obwohl jeder einzelne Schritt in die
richtige Richtung startet.`]}),`
`]}),e.jsxs(i.p,{children:["Im ",e.jsx(i.a,{href:"#env-gradientenabstieg-von-hand",children:"Beispiel 12.3.6"})," ist ",e.jsx(n,{children:"L = 2"}),", also ",e.jsx(n,{children:"1/L = 0{,}5"})," und ",e.jsx(n,{children:"2/L = 1"}),`; mit
`,e.jsx(n,{children:"\\gamma = 0{,}6"})," landen wir im dritten Fall und lesen ",e.jsx(n,{children:`1 - 0{,}6\\cdot 2 =
-0{,}2`}),` ab. Das sind genau die fünf Bilder, die das Widget oben liefert: bei
`,e.jsx(n,{children:"\\gamma = 0{,}2"})," die zähe einseitige Annäherung, bei ",e.jsx(n,{children:"\\gamma = 0{,}5"}),` der Treffer
im ersten Schritt (es ist der Newton-Schritt aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),"), bei ",e.jsx(n,{children:"\\gamma = 0{,}6"}),` die Zahlen
der Tabelle, bei `,e.jsx(n,{children:"\\gamma = 1"}),` das ewige Pendeln und darüber die Flucht aus dem
Bild. Das ist das Dilemma der Schrittweite in Reinform, dem wir schon bei
der Fixpunktiteration in `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` begegnet sind: klein genug
für Konvergenz, groß genug für Tempo. Nur wird es im `,e.jsx(n,{children:"\\R^n"}),` noch unangenehmer,
denn dort gibt es einen solchen Faktor je Krümmungsrichtung, und ein einziges
`,e.jsx(n,{children:"\\gamma"})," muss sie alle zugleich bedienen."]})]}),`
`,e.jsxs(i.h3,{children:["Zwischenfrage: ein Schritt im ",e.jsx(n,{children:"\\R^2"})]}),`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f(\\bx) = x_1^2 + x_2^2"})," und ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}} = (4, 3)^\\top"}),` mit
Schrittweite `,e.jsx(n,{children:"\\gamma = 0{,}25"}),". Wo liegt ",e.jsx(n,{children:"\\cblue{\\bx^{(1)}}"}),` nach einem Schritt
des Gradientenabstiegs? Vier Vorschläge, jeder einzeln zu beurteilen.`]}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (2;\\ 1{,}5)^\\top"}),"."]}),e.jsxs(i.p,{children:["Der Gradient ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (2x_1,\\ 2x_2)"}),`, an der Stelle
`,e.jsx(n,{children:"(4, 3)^\\top"})," also ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(0)})} = (8,\\ 6)"}),`. Eingesetzt in
`,e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),`:
`,e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (4, 3)^\\top - 0{,}25\\cdot(8, 6)^\\top = (4, 3)^\\top - (2;\\ 1{,}5)^\\top = (2;\\ 1{,}5)^\\top"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (0, 0)^\\top"}),", das Verfahren ist sofort fertig."]}),e.jsxs(i.p,{children:[`Das wäre der Treffer in einem Schritt, und den gibt es hier bei
`,e.jsx(n,{children:"\\gamma = 1/L = 0{,}5"}),", nicht bei ",e.jsx(n,{children:"0{,}25"}),`. Die Hesse-Matrix ist
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(2, 2)"}),", also ",e.jsx(n,{children:"L = 2"}),"; mit ",e.jsx(n,{children:"\\gamma = 0{,}25"}),` ist der
Fehlerfaktor `,e.jsx(n,{children:"1 - \\gamma L = 0{,}5"}),`, und die Iterierten halbieren nur ihren
Abstand zum Ursprung: `,e.jsx(n,{children:"(2;\\ 1{,}5)"}),", ",e.jsx(n,{children:"(1;\\ 0{,}75)"}),", ",e.jsx(n,{children:"(0{,}5;\\ 0{,}375)"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (3, 2)^\\top"}),"."]}),e.jsxs(i.p,{children:["Hier ist von jeder Komponente ",e.jsx(n,{children:"1"}),` abgezogen worden, der Schritt hätte also in
beiden Richtungen dieselbe Länge. Der Gradientenabstieg skaliert die Richtung
aber nicht auf Einheitslänge; er nimmt den Gradienten so, wie er ist, und die
Komponente mit dem größeren Betrag bekommt den längeren Schritt.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (8, 6)^\\top"}),"."]}),e.jsxs(i.p,{children:[`Das ist der Gradient selbst. Er ist der Bauteil des Schritts, nicht das
Ergebnis; abgesehen davon zeigt `,e.jsx(n,{children:"+\\corange{\\nabla f}"})," bergauf, und ",e.jsx(n,{children:"(8, 6)^\\top"}),`
liegt weiter vom Minimum entfernt als der Startpunkt.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie schnell ist der Gradientenabstieg?"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-zu-klein-zu-gross-gerade-richtig",children:"Bemerkung 12.3.7"}),` hat die Schrittweite an die Krümmung gekoppelt. Für eine
allgemeine Funktion brauchen wir dafür einen Begriff, der die Krümmung nach oben
begrenzt, ohne zweite Ableitungen zu verlangen.`]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.3.8 (Lipschitz-Stetigkeit)",id:"env-lipschitz-stetigkeit",children:[e.jsxs(i.p,{children:["Eine Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," heißt ",e.jsx(i.em,{children:"Lipschitz-stetig"}),`
(Lipschitz continuous) mit `,e.jsx(i.em,{children:"Lipschitz-Konstante"})," ",e.jsx(n,{children:"L > 0"}),", falls"]}),e.jsx(_,{children:`\\left\\|f(\\bx) - f(\\by)\\right\\| \\le L \\left\\|\\bx - \\by\\right\\|
\\qquad \\text{für alle } \\bx, \\by \\in \\R^n .`})]}),`
`,e.jsxs(i.p,{children:["Anschaulich: Die Funktionswerte ändern sich höchstens ",e.jsx(n,{children:"L"}),`-mal so schnell wie die
Argumente. Je größer `,e.jsx(n,{children:"L"}),", desto zackiger darf ",e.jsx(n,{children:"f"}),` verlaufen. Lipschitz-Stetigkeit
ist deutlich stärker als bloße `,e.jsx(A,{id:"continuity",children:"Stetigkeit"}),`, mit
Differenzierbarkeit aber ohne Zusatzannahmen nicht vergleichbar:
`,e.jsx(n,{children:"f(x)=\\left|x\\right|"})," ist mit ",e.jsx(n,{children:"L=1"}),` Lipschitz-stetig und im Nullpunkt trotzdem
nicht differenzierbar; `,e.jsx(n,{children:"f(x)=x^2"})," ist auf ",e.jsx(n,{children:"\\R"}),` differenzierbar, aber nicht global
Lipschitz-stetig. Auf einem kompakten Intervall ist eine stetig differenzierbare
Funktion wegen ihrer dort beschränkten Ableitung Lipschitz-stetig.`]}),`
`,e.jsxs(i.p,{children:["Für den Gradientenabstieg brauchen wir die Bedingung nicht für ",e.jsx(n,{children:"f"}),`, sondern für
den Gradienten.`]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.9 (Lipschitz-stetiger Gradient und die Spektralnorm)",id:"env-lipschitz-stetiger-gradient-und-die",children:[e.jsxs(i.p,{children:["Wir nennen ",e.jsx(n,{children:"\\corange{\\nabla f}"})," ",e.jsxs(i.em,{children:["Lipschitz-stetig mit Konstante ",e.jsx(n,{children:"L"})]}),`, wenn
`,e.jsx(i.a,{href:"#env-lipschitz-stetigkeit",children:"Definition 12.3.8"}),` auf die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\corange{\\nabla f(\\bx)^\\top} \\in \\R^n"})," zutrifft:"]}),e.jsx(_,{children:`\\left\\|\\corange{\\nabla f(\\bx)} - \\corange{\\nabla f(\\by)}\\right\\|
\\le L \\left\\|\\bx - \\by\\right\\| .`}),e.jsxs(i.p,{children:["Die Steigung von ",e.jsx(n,{children:"f"}),` ändert sich also nicht zu abrupt, die Krümmung ist
beschränkt. Ist `,e.jsx(n,{children:"f"}),` auf einer konvexen offenen Menge zweimal stetig
differenzierbar, so ist das gleichwertig zu`]}),e.jsx(ee,{tag:"12.3.3",id:"eq-lipschitz-stetiger-gradient-und-die",children:`\\left\\|\\corange{\\bH_f(\\bx)}\\right\\|_2 \\le L \\quad \\text{für alle } \\bx ,
\\qquad\\text{also}\\qquad
L_{\\min} = \\sup_{\\bx} \\left\\|\\corange{\\bH_f(\\bx)}\\right\\|_2
 = \\sup_{\\bx} \\max_{i} \\left|\\lambda_i\\bigl(\\corange{\\bH_f(\\bx)}\\bigr)\\right| ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"L_{\\min}"}),` die kleinste mögliche Lipschitz-Konstante bezeichnet; jede
größere Zahl ist ebenfalls eine gültige Konstante.`]}),e.jsxs(i.p,{children:["Denn für ",e.jsx(A,{id:"symmetric-matrix",children:"symmetrische"}),` Matrizen ist die
`,e.jsx(A,{id:"matrix-norm",children:"Spektralnorm"}),` der betragsgrößte
`,e.jsx(A,{id:"eigenvalue-eigenvector",children:"Eigenwert"}),". ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),` in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),` berechnet
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),`; für symmetrisches
`,e.jsx(n,{children:"\\bA"})," ist ",e.jsx(n,{children:"\\bA^\\top\\bA = \\bA^2"}),", und der ",e.jsx(A,{id:"spectral-theorem",children:"Spektralsatz"}),`
gibt dieser Matrix die Eigenwerte `,e.jsx(n,{children:"\\lambda_i^2"}),`, also
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\max_i \\left|\\lambda_i(\\bA)\\right|"}),`. Dieselbe
Umrechnung steckt hinter der Formel für `,e.jsx(n,{children:"\\kappa_2"}),` symmetrischer Matrizen in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),"."]}),e.jsxs(i.p,{children:[`Auf den Betrag kommt es an. Die kürzere Schreibweise
`,e.jsx(n,{children:"L = \\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})"})," geht nur gut, solange ",e.jsx(n,{children:"f"}),`
konvex ist, denn dann ist `,e.jsx(n,{children:"\\corange{\\bH_f}"}),` positiv semidefinit und der größte
Eigenwert zugleich der betragsgrößte. Für nicht konvexes `,e.jsx(n,{children:"f"}),` ist sie falsch:
Für `,e.jsx(n,{children:"f(x) = -x^2"})," ist ",e.jsx(n,{children:"\\corange{f'(x)} = -2x"})," mit der exakten Lipschitz-Konstanten ",e.jsx(n,{children:"2"}),`, während
`,e.jsx(n,{children:"\\lambda_{\\max}(\\corange{\\bH_f}) = -2"}),` nicht einmal positiv ist. Im
Mehrdimensionalen genügt schon eine Sattelrichtung: Bei
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(0{,}5;\\ -8)"})," ist ",e.jsx(n,{children:"L = 8"}),`, das Supremum der größten
Eigenwerte aber `,e.jsx(n,{children:"0{,}5"}),`. Gerade in der nicht konvexen Optimierung, wo die
Schrittweite an `,e.jsx(n,{children:"L"})," hängt, wäre das ein Faktor ",e.jsx(n,{children:"16"})," zu viel Vertrauen."]})]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.3.10 (Konvergenzrate bei konvexem f)",id:"env-konvergenzrate-bei-konvexem-f",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` konvex und differenzierbar mit Lipschitz-stetigem
Gradienten und Lipschitz-Konstante `,e.jsx(n,{children:"L"}),", und ",e.jsx(n,{children:"f"}),` nehme sein Minimum in
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," an. Dann gilt für den Gradientenabstieg ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` mit
fester Schrittweite `,e.jsx(n,{children:"\\gamma \\le 1/L"})]}),e.jsx(ee,{tag:"12.3.4",id:"eq-konvergenzrate-bei-konvexem-f",children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le \\frac{\\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\|^2}{2\\gamma k} .`})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.11 (Was eine Rate der Ordnung 1/k praktisch heißt)",id:"env-was-eine-rate-der-ordnung-1-k-praktisch",children:[e.jsxs(i.p,{children:["Die Schranke fällt wie ",e.jsx(n,{children:"1/k"}),". Um den Fehler unter ",e.jsx(n,{children:"\\varepsilon"}),` zu drücken,
brauchen wir also `,e.jsx(n,{children:"k \\sim 1/\\varepsilon"}),` Schritte, und das ist wenig
erfreulich: Eine Dezimalstelle mehr Genauigkeit kostet die zehnfache
Iterationszahl, der Weg von `,e.jsx(n,{children:"10^{-2}"})," auf ",e.jsx(n,{children:"10^{-6}"}),` das Zehntausendfache. Zum
Vergleich hat das Newton-Verfahren aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` in seinem
Einzugsbereich die Zahl der korrekten Stellen in jedem Schritt verdoppelt.`]}),e.jsxs(i.p,{children:["Zwei Feinheiten sind der Formulierung wert. Erstens misst ",e.jsx(i.a,{href:"#eq-konvergenzrate-bei-konvexem-f",children:"(12.3.4)"}),` den
Fehler im `,e.jsx(i.em,{children:"Funktionswert"}),", nicht den Abstand zu ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`; die beiden
können weit auseinanderliegen, wie `,e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"}),` gleich beziffert. Zweitens setzt der Satz voraus, dass ein
Minimierer überhaupt existiert. Für `,e.jsx(n,{children:"f(x) = \\sqrt{1 + x^2} - x"}),` ist alles andere
erfüllt, denn `,e.jsx(n,{children:"f''(x) = (1+x^2)^{-3/2} \\le 1"})," macht ",e.jsx(n,{children:"f"})," konvex mit ",e.jsx(n,{children:"L = 1"}),`; das
Infimum `,e.jsx(n,{children:"0"}),` wird aber nirgends angenommen, und der Gradientenabstieg läuft brav,
aber ergebnislos nach rechts.`]})]}),`
`,e.jsx(i.p,{children:`Schneller wird es, wenn die Krümmung nicht nur nach oben, sondern auch nach
unten beschränkt ist. Die Funktion darf dann nirgends flach werden.`}),`
`,e.jsxs(y,{kind:"Definition",label:"12.3.12 (Starke Konvexität)",id:"env-starke-konvexitaet",children:[e.jsxs(i.p,{children:["Eine zweimal stetig differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` heißt
`,e.jsx(i.em,{children:"stark konvex"})," (",e.jsx(n,{children:"\\mu"}),"-strongly convex) mit Parameter ",e.jsx(n,{children:"\\mu > 0"}),", falls"]}),e.jsx(_,{children:`\\corange{\\bH_f(\\bx)} - \\mu \\bI \\succeq 0
\\qquad \\text{für alle } \\bx ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\lambda_{\\min}(\\corange{\\bH_f(\\bx)}) \\ge \\mu"})," für alle ",e.jsx(n,{children:"\\bx"}),`. Der größte
solche Wert ist `,e.jsx(n,{children:"\\mu = \\inf_{\\bx} \\lambda_{\\min}(\\corange{\\bH_f(\\bx)})"}),`, die
kleinste vorkommende Krümmung.`]})]}),`
`,e.jsxs(i.p,{children:["Ohne Ableitungen formuliert heißt dasselbe: ",e.jsx(n,{children:`\\bx \\mapsto f(\\bx) -
\\tfrac{\\mu}{2}\\left\\|\\bx\\right\\|^2`}),` ist konvex. In dieser Fassung braucht die
Definition keine zweiten Ableitungen, und sie zeigt zugleich, was starke
Konvexität aussagt: Unter `,e.jsx(n,{children:"f"}),` steckt an jeder Stelle eine Parabel mit Krümmung
mindestens `,e.jsx(n,{children:"\\mu"}),"."]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.3.13 (Konvergenzrate bei starker Konvexität)",id:"env-konvergenzrate-bei-starker-konvexitaet",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f"})," stark konvex mit Parameter ",e.jsx(n,{children:"\\mu > 0"}),` und habe einen Lipschitz-stetigen
Gradienten mit Konstante `,e.jsx(n,{children:"L"}),". Dann gilt für den Gradientenabstieg ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` mit
Schrittweite `,e.jsx(n,{children:"\\gamma \\le 1/L"})]}),e.jsx(ee,{tag:"12.3.5",id:"eq-konvergenzrate-bei-starker-konvexitaet",children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le \\rho^k \\cdot \\Bigl(\\cblue{f\\bigl(\\bx^{(0)}\\bigr)} - \\cgreen{f(\\bx^\\star)}\\Bigr) ,
\\qquad \\rho = 1 - \\gamma\\mu < 1 ,`}),e.jsxs(i.p,{children:["insbesondere ",e.jsx(n,{children:"\\rho = 1 - \\mu/L"})," für ",e.jsx(n,{children:"\\gamma = 1/L"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Der Gewinn gegenüber ",e.jsx(i.a,{href:"#env-konvergenzrate-bei-konvexem-f",children:"Satz 12.3.10"}),` ist beträchtlich. Dort brauchten wir
`,e.jsx(n,{children:"k \\sim 1/\\varepsilon"})," Schritte, hier genügen wegen ",e.jsx(n,{children:"\\rho^k < \\varepsilon"}),` schon
`,e.jsx(n,{children:"k \\sim \\log(1/\\varepsilon)"}),`: Jede weitere Dezimalstelle kostet nicht mehr das
Zehnfache, sondern denselben festen Zuschlag. Das ist derselbe Unterschied wie
zwischen linearer und exponentieller Fehlerreduktion in
`,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),"."]}),`
`,e.jsxs(i.p,{children:["Die Existenz von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` muss dieser Satz nicht mehr eigens
voraussetzen. Starke Konvexität legt unter `,e.jsx(n,{children:"f"}),` an jeder Stelle eine Parabel mit
Krümmung `,e.jsx(n,{children:"\\mu > 0"}),`, und eine solche Parabel wächst in jeder Richtung über alle
Grenzen; ein Minimum wird also angenommen, und weil `,e.jsx(n,{children:"f"}),` dann auch strikt konvex
ist, gibt es nur dieses eine
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),")."]}),`
`,e.jsxs(i.p,{children:["Die Schrittweite gehört dabei zwingend zur Rate. Mit einem sehr kleinen ",e.jsx(n,{children:"\\gamma"}),`
bleibt zwar die Konvergenz, aber eben mit `,e.jsx(n,{children:"1 - \\gamma\\mu"}),` statt mit
`,e.jsx(n,{children:"1 - \\mu/L"}),"; die Rate ",e.jsx(n,{children:"\\rho = 1 - \\mu/L"}),` ist die beste, die dieser Satz hergibt,
und sie gehört zu `,e.jsx(n,{children:"\\gamma = 1/L"}),"."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.14 (Die Konditionszahl einer Funktion)",id:"env-die-konditionszahl-einer-funktion",children:[e.jsx(i.p,{children:"Die beiden Konstanten spannen die Krümmung von beiden Seiten ein,"}),e.jsx(_,{children:`\\mu \\bI \\preceq \\corange{\\bH_f(\\bx)} \\preceq L \\bI
\\qquad \\text{für alle } \\bx ,`}),e.jsxs(i.p,{children:["wobei die obere Hälfte für konvexes ",e.jsx(n,{children:"f"})," gerade ",e.jsx(i.a,{href:"#eq-lipschitz-stetiger-gradient-und-die",children:"(12.3.3)"}),` ist. Das Verhältnis der
beiden Konstanten heißt `,e.jsx(i.em,{children:"Konditionszahl"})," der Funktion,"]}),e.jsx(_,{children:`\\kappa_f = \\frac{L}{\\mu}
= \\frac{\\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})}{\\inf_{\\bx} \\lambda_{\\min}(\\corange{\\bH_f(\\bx)})} ,
\\qquad\\text{damit}\\qquad
\\rho = 1 - \\frac{\\mu}{L} = \\frac{\\kappa_f - 1}{\\kappa_f} .`}),e.jsxs(i.p,{children:[`Der Name ist mit Bedacht gewählt. Für eine Quadrik
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}\\bx^\\top\\bA\\bx"}),` mit
`,e.jsx(A,{id:"positive-definite",children:"positiv definitem"})," ",e.jsx(n,{children:"\\bA"}),` ist
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\bA"})," überall, also ",e.jsx(n,{children:"L = \\lambda_{\\max}(\\bA)"}),`,
`,e.jsx(n,{children:"\\mu = \\lambda_{\\min}(\\bA)"})," und"]}),e.jsx(_,{children:"\\kappa_f = \\frac{\\lambda_{\\max}(\\bA)}{\\lambda_{\\min}(\\bA)} = \\kappa_2(\\bA) ,"}),e.jsxs(i.p,{children:["genau die ",e.jsx(A,{id:"condition-number",children:"Konditionszahl"}),` der Matrix aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),". Für allgemeines ",e.jsx(n,{children:"f"}),` wandert die
Hesse-Matrix mit `,e.jsx(n,{children:"\\bx"}),", und ",e.jsx(n,{children:"\\kappa_f"}),` misst das Verhältnis der extremen
Krümmungen über den ganzen Definitionsbereich hinweg.`]}),e.jsxs(i.p,{children:["Wie teuer ein großes ",e.jsx(n,{children:"\\kappa_f"})," ist, lässt sich beziffern. Aus ",e.jsx(n,{children:`\\rho^k \\le
10^{-1}`})," folgt ",e.jsx(n,{children:"k \\ge \\ln 10 / (-\\ln \\rho)"}),", und weil ",e.jsx(n,{children:`-\\ln(1 - 1/\\kappa_f)
\\approx 1/\\kappa_f`})," ist, wächst diese Zahl ungefähr proportional zu ",e.jsx(n,{children:"\\kappa_f"}),`:
Nach dieser Schranke kostet eine Dezimalstelle bei `,e.jsx(n,{children:"\\kappa_f = 10"}),` rund
`,e.jsx(n,{children:"21{,}9"})," Schritte, bei ",e.jsx(n,{children:"\\kappa_f = 20"})," schon ",e.jsx(n,{children:"44{,}9"})," und bei ",e.jsx(n,{children:"\\kappa_f = 100"}),`
ganze `,e.jsx(n,{children:"229{,}1"}),`. Geometrisch
heißt großes `,e.jsx(n,{children:"\\kappa_f"}),", dass die ",e.jsx(A,{id:"level-sets",children:"Höhenlinien"}),` lange, schmale
Ellipsen sind; bei einer Quadrik gilt das überall, sonst in der Nähe eines
Minimums, wo die Hesse-Matrix positiv definit ist. In solchen Canyons läuft der
Gradientenabstieg im Zickzack: Er steht quer zum Tal, statt es entlangzulaufen.`]})]}),`
`,e.jsxs(i.p,{children:[`Warum das so ist, lässt sich auf einer Quadrik vollständig ausrechnen. Der
folgende Satz behandelt diesen Sonderfall schärfer als `,e.jsx(i.a,{href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),`: Er sagt, was
tatsächlich passiert, statt nur eine Schranke zu geben, und er deckt jede
Schrittweite unterhalb der Divergenzgrenze ab.`]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.3.15 (Gradientenabstieg auf einer Quadrik)",id:"env-gradientenabstieg-auf-einer-quadrik",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` symmetrisch und positiv definit mit Eigenwerten
`,e.jsx(n,{children:"0 < \\mu = \\lambda_1 \\le \\dots \\le \\lambda_n = L"}),`, und sei
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(\\bx - \\cgreen{\\bx^\\star})^\\top \\bA (\\bx - \\cgreen{\\bx^\\star})"}),`.
Dann gilt für den Gradientenabstieg mit fester Schrittweite `,e.jsx(n,{children:"\\gamma"}),` und den
Fehler `,e.jsx(n,{children:"\\be^{(k)} := \\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}"})]}),e.jsx(ee,{tag:"12.3.6",id:"eq-gradientenabstieg-auf-einer-quadrik",children:`\\be^{(k)} = (\\bI - \\gamma\\bA)^k\\,\\be^{(0)}
\\qquad\\text{und}\\qquad
\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le q^{2k}\\Bigl(\\cblue{f\\bigl(\\bx^{(0)}\\bigr)} - \\cgreen{f(\\bx^\\star)}\\Bigr)`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"q := \\max_i \\left|1 - \\gamma\\lambda_i\\right|"}),`. Die Iteration konvergiert
genau dann für jeden Startpunkt, wenn `,e.jsx(n,{children:"q < 1"}),` ist, und das trifft für
`,e.jsx(n,{children:"0 < \\gamma < 2/L"})," zu."]})]}),`
`,e.jsx($e,{title:"Beweis: Fehlerzerlegung nach Eigenrichtungen",children:e.jsxs(tn,{children:[e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["der Gradient der ",e.jsx(A,{id:"quadratic-form",children:"quadratischen Form"})," ",e.jsx(n,{children:"\\bx^\\top\\bA\\bx"})," ist für symmetrisches ",e.jsx(n,{children:"\\bA"})," gerade ",e.jsx(n,{children:"2\\bx^\\top\\bA"})," (",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),"), und der Faktor ",e.jsx(n,{children:"\\tfrac12"})," kürzt die ",e.jsx(n,{children:"2"})," weg; der Fehler erfüllt dieselbe Rekursion wie die Iterierten, weil ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," konstant ist. ",e.jsx(n,{children:"\\bI - \\gamma\\bA"})," hat dieselben Eigenvektoren wie ",e.jsx(n,{children:"\\bA"}),", mit den Eigenwerten ",e.jsx(n,{children:"1 - \\gamma\\lambda_i"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fehlerrekursion und Spektralzerlegung."}),` Der Gradient der quadratischen Form ist
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (\\bx - \\cgreen{\\bx^\\star})^\\top\\bA"}),`. Einsetzen in
`,e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"})," und Abziehen von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`
auf beiden Seiten gibt
`,e.jsx(n,{children:"\\be^{(k+1)} = (\\bI - \\gamma\\bA)\\,\\be^{(k)}"}),", also nach ",e.jsx(n,{children:"k"}),` Schritten die erste
Aussage von `,e.jsx(i.a,{href:"#eq-gradientenabstieg-auf-einer-quadrik",children:"(12.3.6)"}),". Weil ",e.jsx(n,{children:"\\bA"}),` symmetrisch ist,
liefert der Spektralsatz eine Orthonormalbasis `,e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),` aus
Eigenvektoren, und in ihr zerfällt der Fehler in `,e.jsx(n,{children:"n"}),` unabhängige Anteile: Mit
`,e.jsx(n,{children:"\\be^{(0)} = \\sum_i c_i \\bv_i"})," ist"]}),e.jsx(_,{children:`(\\bI - \\gamma\\bA)\\,\\bv_i = (1 - \\gamma\\lambda_i)\\,\\bv_i
\\qquad\\Longrightarrow\\qquad
\\be^{(k)} = \\sum_{i=1}^{n} (1 - \\gamma\\lambda_i)^k\\, c_i\\, \\bv_i .`}),e.jsxs(i.p,{children:["Jede Eigenrichtung hat also ihren eigenen Fehlerfaktor ",e.jsx(n,{children:"1 - \\gamma\\lambda_i"}),`;
`,e.jsx(i.a,{href:"#eq-zu-klein-zu-gross-gerade-richtig",children:"(12.3.2)"})," ist der Fall ",e.jsx(n,{children:"n = 1"}),"."]})]}),e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["Jeder einzelne Faktor ",e.jsx(n,{children:"(1-\\gamma\\lambda_i)^{2k}"})," ist höchstens ",e.jsx(n,{children:"q^{2k}"}),", und alle Summanden ",e.jsx(n,{children:"\\lambda_i c_i^2"})," sind wegen ",e.jsx(n,{children:"\\lambda_i > 0"})," nichtnegativ, dürfen also mit demselben Faktor abgeschätzt werden"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Funktionswert."})," In derselben Basis ist wegen ",e.jsx(n,{children:"\\bA\\bv_i = \\lambda_i \\bv_i"}),`
und `,e.jsx(n,{children:"\\bv_i^\\top\\bv_j = \\delta_{ij}"})]}),e.jsx(_,{children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
= \\tfrac{1}{2}\\,\\be^{(k)\\top}\\bA\\,\\be^{(k)}
= \\tfrac{1}{2}\\sum_{i=1}^{n} \\lambda_i (1 - \\gamma\\lambda_i)^{2k} c_i^2
\\le q^{2k}\\cdot \\tfrac{1}{2}\\sum_{i=1}^{n} \\lambda_i c_i^2 ,`}),e.jsxs(i.p,{children:["und ",e.jsx(n,{children:"\\tfrac{1}{2}\\sum_i \\lambda_i c_i^2"}),` ist gerade
`,e.jsx(n,{children:"\\cblue{f(\\bx^{(0)})} - \\cgreen{f(\\bx^\\star)}"}),`. Das ist die zweite Aussage von
`,e.jsx(i.a,{href:"#eq-gradientenabstieg-auf-einer-quadrik",children:"(12.3.6)"}),"."]})]}),e.jsx(ne,{why:e.jsxs(e.Fragment,{children:["Die kritische Bedingung stammt immer vom GRÖSSTEN Eigenwert: ",e.jsx(n,{children:"\\gamma\\lambda_i < 2"})," für alle ",e.jsx(n,{children:"i"})," ist dasselbe wie ",e.jsx(n,{children:"\\gamma L < 2"})]}),children:e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Die Bedingung an ",e.jsx(n,{children:"\\gamma"}),"."]})," Es ist ",e.jsx(n,{children:"q < 1"}),` genau dann, wenn
`,e.jsx(n,{children:"0 < \\gamma\\lambda_i < 2"})," für alle ",e.jsx(n,{children:"i"})," gilt, und weil alle ",e.jsx(n,{children:"\\lambda_i"}),` positiv
sind und `,e.jsx(n,{children:"L"})," der größte ist, ist das gleichwertig zu ",e.jsx(n,{children:"0 < \\gamma < 2/L"}),`. Ist
umgekehrt `,e.jsx(n,{children:"q \\ge 1"}),`, so fällt die Komponente in der zugehörigen Eigenrichtung
nicht mehr gegen null.`]})})]})}),`
`,e.jsx($e,{title:"Schranke und tatsächliche Rate an einem Zahlenbeispiel",children:e.jsxs(y,{kind:"Beispiel",label:"12.3.16 (Warum der Satz eine Schranke ist und keine Formel)",id:"env-warum-der-satz-eine-schranke-ist-und",children:[e.jsxs(i.p,{children:["Nehmen wir ",e.jsx(n,{children:"\\bA = \\diag(1, 10)"}),`, also
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}\\bigl(x_1^2 + 10\\,x_2^2\\bigr)"}),`, mit
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} = \\bnull"}),". Dann ist ",e.jsx(n,{children:"\\mu = 1"}),", ",e.jsx(n,{children:"L = 10"}),` und
`,e.jsx(n,{children:"\\kappa_f = 10"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\gamma = 1/L = 0{,}1"})]}),` sind die beiden Fehlerfaktoren
`,e.jsx(n,{children:"1 - \\gamma\\mu = 0{,}9"})," und ",e.jsx(n,{children:"1 - \\gamma L = 0"}),`. Die steile Richtung wird also in
einem einzigen Schritt exakt getroffen, danach lebt der Fehler nur noch in der
flachen Richtung und wird je Schritt mit `,e.jsx(n,{children:"0{,}9"}),` multipliziert. Nach
`,e.jsx(i.a,{href:"#env-gradientenabstieg-auf-einer-quadrik",children:"Satz 12.3.15"}),` fällt der Funktionswert deshalb ab dem zweiten Schritt auf exakt das
`,e.jsx(n,{children:"0{,}9^2 = 0{,}81"}),"-fache. ",e.jsx(i.a,{href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),` verspricht an derselben Stelle nur
`,e.jsx(n,{children:"\\rho = 1 - \\mu/L = 0{,}9"}),". Beides ist richtig, denn ",e.jsx(i.a,{href:"#eq-konvergenzrate-bei-starker-konvexitaet",children:"(12.3.5)"}),` ist eine
`,e.jsx(i.em,{children:"obere Schranke"}),`: Der beobachtete Verlauf darf schneller sein, und hier ist er es
um genau den Faktor `,e.jsx(n,{children:"\\rho"}),` je Schritt. Wer aus dem Satz „der Fehler fällt genau
wie `,e.jsx(n,{children:"\\rho^k"}),'" liest, liest zu viel hinein.']}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\gamma = 0{,}18"})]})," dagegen sind die Faktoren ",e.jsx(n,{children:"0{,}82"})," und ",e.jsx(n,{children:"-0{,}8"}),`: Die
steile Richtung wechselt in jedem Schritt das Vorzeichen, die flache kriecht.
Das ist das Zickzack aus `,e.jsx(i.a,{href:"#env-die-konditionszahl-einer-funktion",children:"Bemerkung 12.3.14"}),`, und der Grund steht daneben: Die
Schrittweite ist an die `,e.jsx(i.em,{children:"steilste"}),` Richtung gebunden, denn dort droht
Divergenz; vorankommen müssen wir aber in der `,e.jsx(i.em,{children:"flachsten"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\cred{\\gamma = 0{,}2 = 2/L}"})]}),` pendelt die zweite Komponente zwischen zwei
Werten, ohne kleiner zu werden, und darüber läuft sie davon.`]})]})}),`
`,e.jsx(i.p,{children:"Wie teuer wird eine schlechte Kondition also wirklich? Das lässt sich zählen."}),`
`,e.jsxs(ze,{title:"Zickzack im Canyon",children:[e.jsxs(i.p,{children:[`Die obere Tafel zeigt die Höhenlinien von
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(x_1^2 + \\kappa\\,x_2^2)"}),` und den Weg der Iterierten, die
mittlere den Verlauf von `,e.jsx(n,{children:"\\cblue{f(\\bx^{(k)})} - \\cgreen{f(\\bx^\\star)}"}),` auf
logarithmischer Skala, daneben steht dieselbe Quadrik als Fläche. Der Regler für
`,e.jsx(n,{children:"\\gamma"})," ist in Vielfachen von ",e.jsx(n,{children:"2/L"}),` geeicht, damit die Schwellen unabhängig von
`,e.jsx(n,{children:"\\kappa"})," an derselben Stelle liegen."]}),e.jsx(Ge,{frage:e.jsxs(e.Fragment,{children:["Bei ",e.jsx(n,{children:"\\kappa = 10"})," braucht der Abstieg in der Voreinstellung ",e.jsx(n,{children:"35"})," Schritte, bis ",e.jsx(n,{children:"f"})," auf ein Millionstel gefallen ist. Wie viele bei ",e.jsx(n,{children:"\\kappa = 100"}),"?"]}),loesung:336,toleranz:80,einheit:"Schritte",verdeckt:e.jsxs(e.Fragment,{children:["Der Aufwand wächst proportional zu ",e.jsx(n,{children:"\\kappa"}),"; die Ablesetafel des Widgets nennt die Zahl."]}),children:e.jsx(Ut,{})}),e.jsxs(i.p,{children:["Der Aufwand wächst ungefähr proportional zur Kondition: bei ",e.jsx(n,{children:"\\kappa = 10"}),` sind es
`,e.jsx(n,{children:"35"})," Schritte bis zum Millionstel, bei ",e.jsx(n,{children:"\\kappa = 25"})," schon ",e.jsx(n,{children:"88"}),` und bei
`,e.jsx(n,{children:"\\kappa = 100"})," dann ",e.jsx(n,{children:"336"}),". Bei ",e.jsx(n,{children:"\\kappa = 1"}),` sind die Höhenlinien Kreise, der
negative Gradient zeigt direkt auf das Minimum, und mit einem halben Anteil ist
das Verfahren nach einem Schritt fertig. Bei `,e.jsx(n,{children:"\\kappa = 10"})," und ",e.jsx(n,{children:"\\gamma = 1/L"}),`
stehen dieselben Zahlen auf der Tafel: gemessener Quotient `,e.jsx(n,{children:"0{,}81"}),` gegen die
gestrichelte Schranke `,e.jsx(n,{children:"0{,}9"}),`. Und
bei einem Anteil um `,e.jsx(n,{children:"0{,}9"}),` entsteht das Zickzack; die Schranke wird dann gar
nicht mehr gezeichnet, denn `,e.jsx(i.a,{href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),` setzt
`,e.jsx(n,{children:"\\gamma \\le 1/L"})," voraus."]})]}),`
`,e.jsx(i.h3,{children:"Wann hören wir auf?"}),`
`,e.jsxs(i.p,{children:["Die Iteration ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` läuft von sich aus ewig. In der Praxis brauchen wir eine
Regel, wann wir sie beenden, und alle brauchbaren Regeln messen etwas, das wir
tatsächlich ausrechnen können. Der Abstand
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}\\right\\|"}),` gehört nicht dazu, denn
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ist ja gerade das Gesuchte."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.17 (Drei Abbruchkriterien und ihre Grenzen)",id:"env-drei-abbruchkriterien-und-ihre-grenzen",children:[e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Der Gradient ist klein:"}),`
`,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\cblue{\\bx^{(k)}})}\\right\\| < \\varepsilon_{\\mathrm{grad}}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Der Funktionswert stagniert:"}),`
`,e.jsx(n,{children:"\\bigl|\\cblue{f(\\bx^{(k+1)})} - \\cblue{f(\\bx^{(k)})}\\bigr| \\big/ \\bigl|\\cblue{f(\\bx^{(k)})}\\bigr| < \\varepsilon_f"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Das Budget ist aufgebraucht:"})," ",e.jsx(n,{children:"k > k_{\\max}"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Üblich sind ",e.jsx(n,{children:"\\varepsilon_{\\mathrm{grad}} \\approx 10^{-6}"})," bis ",e.jsx(n,{children:"10^{-8}"}),` und
`,e.jsx(n,{children:"k_{\\max} \\approx 1000"})," bis ",e.jsx(n,{children:"10\\,000"}),`, und üblich ist es auch, mehrere Kriterien
zu kombinieren: Die ersten beiden sagen etwas über die Lösung, das dritte
verhindert eine Endlosschleife, wenn keines der anderen greift.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Vorsicht."}),` Bei schlecht konditionierten oder nicht stark konvexen Problemen
können die Kriterien versagen. Für stark konvexes `,e.jsx(n,{children:"f"}),` gilt zwar
`,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx)}\\right\\| \\ge \\mu\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\|"}),`
und damit
`,e.jsx(n,{children:"\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\| \\le \\left\\|\\corange{\\nabla f(\\bx)}\\right\\|/\\mu"}),`,
doch diese Schranke ist nur so gut wie `,e.jsx(n,{children:"\\mu"}),`. Ein Beispiel:
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(x_1^2 + 10^{-8}x_2^2)"}),` hat an der Stelle
`,e.jsx(n,{children:"\\cblue{\\bx} = (0;\\ 10)^\\top"}),` den Gradienten
`,e.jsx(n,{children:"\\corange{\\nabla f} = (0;\\ 10^{-7})"}),`, unterschreitet also jede
Gradientenschranke ab `,e.jsx(n,{children:"10^{-6}"}),", und liegt trotzdem ",e.jsx(n,{children:"10"}),` Einheiten vom Minimum
entfernt. Der Funktionswert ist dort allerdings schon fast optimal, nämlich
`,e.jsx(n,{children:"f - \\cgreen{f^\\star} = 5\\cdot 10^{-7}"}),`. Das ist keine Ausrede, sondern die
ehrliche Auskunft: In einer flachen Richtung ist die `,e.jsx(i.em,{children:"Stelle"}),` des Minimums
schlecht bestimmt, sein `,e.jsx(i.em,{children:"Wert"})," dagegen gut."]}),e.jsxs(i.p,{children:[`Das zweite Kriterium ist noch schwächer. Ein kleiner Fortschritt kann daran
liegen, dass wir angekommen sind, aber genauso daran, dass `,e.jsx(n,{children:"\\gamma"}),` zu klein
gewählt ist; und ist `,e.jsx(n,{children:"\\cblue{f(\\bx^{(k)})}"}),` nahe null, so ist der relative
Quotient gar nicht mehr aussagekräftig. Wer es ernst meint, prüft am Ende
zusätzlich, ob der Gradient wirklich klein `,e.jsx(i.em,{children:"relativ zur Skala des Problems"})," ist."]})]}),`
`,e.jsx(i.h3,{children:"Schrittweitensuche: die Armijo-Bedingung"}),`
`,e.jsxs(i.p,{children:["Eine feste Schrittweite ist immer ein Kompromiss. ",e.jsx(i.a,{href:"#env-zu-klein-zu-gross-gerade-richtig",children:"Bemerkung 12.3.7"}),` hat gezeigt,
wie schmal der brauchbare Bereich sein kann, und `,e.jsx(n,{children:"L"}),` kennen wir in der Regel
nicht. Naheliegend ist deshalb, `,e.jsx(n,{children:"\\gamma"}),` in jedem Schritt neu zu bestimmen: klein
genug, dass es sicher bergab geht, groß genug, dass sich der Schritt lohnt. Diese
Suche heißt `,e.jsx(i.em,{children:"Liniensuche"}),` (line search), weil sie sich mit der Suchrichtung
`,e.jsx(n,{children:"\\corange{\\bd}"}),` auf der Geraden
`,e.jsx(n,{children:"\\gamma \\mapsto \\cblue{\\bx^{(k)}} + \\gamma\\corange{\\bd}"})," abspielt."]}),`
`,e.jsxs(i.p,{children:[`Den exakten Minimierer auf dieser Geraden zu bestimmen, wäre wieder ein
Optimierungsproblem. Billiger und in der Praxis besser ist eine Bedingung, die
nur „genügend Abstieg" verlangt. Ein Warnhinweis zur Notation vorweg: Der
Buchstabe `,e.jsx(n,{children:"\\rho"}),` steht im folgenden Algorithmus für den Faktor, um den die
Schrittweite verkleinert wird, und hat mit der Konvergenzrate `,e.jsx(n,{children:"\\rho"}),` aus
`,e.jsx(i.a,{href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),` nichts zu tun. Beide Bezeichnungen sind eingebürgert, und wir
behalten sie bei.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.3.18 (Backtracking-Liniensuche nach Armijo)",id:"env-backtracking-liniensuche-nach-armijo",children:[e.jsxs(i.p,{children:["Gegeben seien die aktuelle Stelle ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),`, die Suchrichtung
`,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\cblue{\\bx^{(k)}})^\\top}"}),` und Parameter
`,e.jsx(n,{children:"c \\in (0, 1)"})," sowie ",e.jsx(n,{children:"\\rho \\in (0, 1)"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Starte mit ",e.jsx(n,{children:"\\gamma = 1"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Solange"}),`
`,e.jsx(ee,{tag:"12.3.7",id:"eq-backtracking-liniensuche-nach-armijo",children:`\\cblue{f\\bigl(\\bx^{(k)} + \\gamma\\corange{\\bd}\\bigr)}
> \\cblue{f\\bigl(\\bx^{(k)}\\bigr)}
+ c\\,\\gamma\\,\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\,\\corange{\\bd} ,`}),`
`,e.jsxs(i.p,{children:["setze ",e.jsx(n,{children:"\\gamma \\leftarrow \\rho\\,\\gamma"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Gib ",e.jsx(n,{children:"\\gamma"}),` zurück und setze
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\gamma\\corange{\\bd}"}),"."]}),`
`]}),`
`]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.3.19 (Was die Armijo-Bedingung fordert)",id:"env-was-die-armijo-bedingung-fordert",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Das Vorzeichen ist der Kern."}),` Mit
`,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\bx^{(k)})^\\top}"})," ist"]}),e.jsx(_,{children:`\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\,\\corange{\\bd}
= -\\left\\|\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\right\\|^2 < 0
\\qquad\\text{für } \\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)} \\neq \\bnull^\\top ,`}),e.jsxs(i.p,{children:["der Zusatzterm ",e.jsx(n,{children:"c\\,\\gamma\\,\\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd}"}),` auf der
rechten Seite von `,e.jsx(i.a,{href:"#eq-backtracking-liniensuche-nach-armijo",children:"(12.3.7)"})," ist also ",e.jsx(i.em,{children:"negativ"}),`. Verschwindet der Gradient, gibt
es überhaupt keine Suchrichtung mehr, und die Abbruchkriterien haben längst
gegriffen. Die rechte Seite liegt damit
unter dem alten Funktionswert, und darauf zielt die Bedingung: Der
Funktionswert muss nicht bloß sinken, sondern um einen Betrag sinken, der
proportional zu `,e.jsx(n,{children:"\\gamma"}),` und zum Quadrat der Gradientennorm ist. Wo es steil
bergab geht, wird viel verlangt, wo es flach ist, wenig.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die geometrische Lesart."}),` Die Gerade
`,e.jsx(n,{children:"\\gamma \\mapsto \\cblue{f(\\bx^{(k)})} + \\gamma\\,\\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd}"}),`
ist die Tangente an den Schnitt
`,e.jsx(n,{children:"\\varphi(\\gamma) = \\cblue{f(\\bx^{(k)} + \\gamma\\corange{\\bd})}"}),` im Nullpunkt, also
das Beste, was die erste Ordnung überhaupt verspricht. Die Armijo-Gerade ist
dieselbe Gerade, um den Faktor `,e.jsx(n,{children:"c"}),` flacher gelegt. Gefordert wird, unter dieser
flacheren Geraden zu bleiben, und je kleiner `,e.jsx(n,{children:"c"}),`, desto bescheidener die
Forderung.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum die Schleife endet."}),` Nach der Taylorentwicklung erster Ordnung ist
`,e.jsx(n,{children:"\\varphi(\\gamma) = \\varphi(0) + \\gamma\\varphi'(0) + o(\\gamma)"}),` mit
`,e.jsx(n,{children:"\\varphi'(0) = \\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd} < 0"}),`. Für kleine
`,e.jsx(n,{children:"\\gamma"})," ist die linke Seite von ",e.jsx(i.a,{href:"#eq-backtracking-liniensuche-nach-armijo",children:"(12.3.7)"}),` deshalb ungefähr
`,e.jsx(n,{children:"\\varphi(0) + \\gamma\\varphi'(0)"}),`, und das liegt unter der rechten Seite, weil
`,e.jsx(n,{children:"\\gamma\\varphi'(0) < c\\,\\gamma\\varphi'(0)"})," für ",e.jsx(n,{children:"c < 1"})," und ",e.jsx(n,{children:"\\varphi'(0) < 0"}),` gilt. Solange der Gradient nicht verschwindet, bricht die Schleife also nach
endlich vielen Verkleinerungen ab.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Typische Parameter."})," ",e.jsx(n,{children:"c = 10^{-4}"})," und ",e.jsx(n,{children:"\\rho = 0{,}5"}),`, die Schrittweite wird
also halbiert. Mit so kleinem `,e.jsx(n,{children:"c"}),` ist die Armijo-Gerade praktisch waagerecht, und
die Bedingung heißt kaum mehr als „der Funktionswert muss wirklich sinken";
gerade das macht sie robust, denn verworfen wird nur ein Schritt, der über das
Ziel hinausschießt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ausblick."}),` Die Liniensuche ist kein Zubehör für den Gradientenabstieg allein.
Quasi-Newton-Verfahren wie BFGS bestimmen ihre Suchrichtung anders, benutzen
darüber aber dieselbe Backtracking-Schleife; `,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),` baut
darauf auf.`]})]}),`
`,e.jsx(i.p,{children:`Wie oft muss die Schleife also halbieren, bis sie fündig wird? Sehen wir am
Schnitt nach.`}),`
`,e.jsxs(ze,{title:"Die Armijo-Bedingung am Schnitt",children:[e.jsxs(i.p,{children:["Hier die drei Kurven zum Selberschieben: der Schnitt ",e.jsx(n,{children:"\\varphi(\\gamma)"}),` in
Violett, die Tangente in Orange und die Armijo-Gerade
gestrichelt in Grau. Die roten Punkte sind verworfene Probeschritte, der blaue
ist der akzeptierte. Als Zielfunktion dient die Quadrik
`,e.jsx(n,{children:"f(\\bx) = \\tfrac12 x_1^2 + \\tfrac52 x_2^2"})," mit ",e.jsx(n,{children:"\\kappa_f = 5"}),`, als Suchrichtung
wie immer `,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\bx)^\\top}"}),"."]}),e.jsx(Yt,{}),e.jsxs(i.p,{children:["Ein bis zwei Halbierungen genügen. In der Voreinstellung wird ",e.jsx(n,{children:"\\gamma = 1"}),`
verworfen und `,e.jsx(n,{children:"\\gamma = 0{,}5"}),` angenommen, obwohl der exakte Minimierer bei
`,e.jsx(n,{children:"\\gamma^\\star = 1/3"})," läge; mit dem Lehrbuchwert ",e.jsx(n,{children:"c = 0{,}3"}),` ist eine zweite
Halbierung nötig, und `,e.jsx(n,{children:"\\gamma = 0{,}25"}),` wird angenommen. Auch das gehört zur
Idee: Der billige Kompromiss ist gut genug, weil ohnehin ein nächster Schritt
folgt. Wer `,e.jsx(n,{children:"c"}),` nach rechts schiebt, sieht die Forderung steiler werden und die
Zahl der Verkleinerungen steigen. Über alle Reglerstellungen hinweg sind höchstens
`,e.jsx(n,{children:"16"}),` Halbierungen nötig – die Schleife endet also nicht nur theoretisch, sondern
auch schnell.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Auf der Quadrik mit ",e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(1, 10)"}),` fällt der Funktionswert mit
`,e.jsx(n,{children:"\\gamma = 1/L"})," in jedem Schritt genau auf das ",e.jsx(n,{children:"\\rho = 0{,}9"}),"-fache."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-konvergenzrate-bei-starker-konvexitaet",children:"(12.3.5)"}),` ist eine obere Schranke, keine Gleichung. Tatsächlich fällt der Wert
ab dem zweiten Schritt auf das `,e.jsx(n,{children:"0{,}81"}),"-fache, also auf das ",e.jsx(n,{children:"\\rho^2"}),`-fache: Die
steile Richtung ist wegen `,e.jsx(n,{children:"1 - \\gamma L = 0"}),` schon nach dem ersten Schritt
erledigt, und in der flachen schrumpft der Fehler mit `,e.jsx(n,{children:"0{,}9"}),`, der Funktionswert
also mit `,e.jsx(n,{children:"0{,}9^2"}),"."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Auch für nicht konvexes ",e.jsx(n,{children:"f"})," ist ",e.jsx(n,{children:"-\\corange{\\nabla f(\\bx)^\\top}"}),` eine
Abstiegsrichtung, solange `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"})," ist."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:`\\corange{\\nabla f(\\bx)}\\bigl(-\\corange{\\nabla f(\\bx)^\\top}\\bigr) =
-\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|^2 < 0`}),`, und daraus folgt mit der
Taylorentwicklung erster Ordnung, dass `,e.jsx(n,{children:"f"}),` für hinreichend kleine Schritte
sinkt. Konvexität wird dafür nicht gebraucht. Was sie liefert, ist etwas
anderes: dass jeder stationäre Punkt, an dem das Verfahren zur Ruhe kommt, schon
global optimal ist (`,e.jsx(i.a,{href:"#env-drei-lesarten-desselben-schritts",children:"Bemerkung 12.3.5"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\cblue{\\bx^{(k)}})}\\right\\| < 10^{-6}"}),`, so liegt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"})," nahe am Minimum."]}),e.jsxs(i.p,{children:["Beide Schranken, die es dazu gibt, hängen an der kleinsten Krümmung ",e.jsx(n,{children:"\\mu"}),`:
`,e.jsx(n,{children:`\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\| \\le
\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|/\\mu`}),` für die Stelle und
`,e.jsx(n,{children:`\\cblue{f(\\bx)} - \\cgreen{f(\\bx^\\star)} \\le
\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|^2/(2\\mu)`}),` für den Wert. Bei kleinem
`,e.jsx(n,{children:"\\mu"}),` taugt vor allem die erste nichts. Für
`,e.jsx(n,{children:"f(\\bx) = \\tfrac12(x_1^2 + 10^{-8}x_2^2)"})," ist der Gradient in ",e.jsx(n,{children:"(0;\\ 10)^\\top"}),`
nur `,e.jsx(n,{children:"10^{-7}"})," lang, der Abstand zum Minimum aber ",e.jsx(n,{children:"10"}),`, während der Funktionswert
mit `,e.jsx(n,{children:"5\\cdot 10^{-7}"})," tatsächlich schon fast optimal ist (",e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:[`Für einen Lipschitz-stetigen Gradienten genügt
`,e.jsx(n,{children:"L = \\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})"})," als Konstante."]}),e.jsxs(i.p,{children:[`Gebraucht wird die Spektralnorm, also der betragsgrößte Eigenwert
`,e.jsx(n,{children:"\\sup_{\\bx}\\max_i \\left|\\lambda_i\\right|"}),". Bei konvexem ",e.jsx(n,{children:"f"}),` fällt beides
zusammen, weil die Hesse-Matrix dann positiv semidefinit ist; sonst nicht. Für
`,e.jsx(n,{children:"f(x) = -x^2"})," ist die exakte Konstante ",e.jsx(n,{children:"2"}),", während der größte Eigenwert ",e.jsx(n,{children:"-2"}),`
beträgt (`,e.jsx(i.a,{href:"#env-lipschitz-stetiger-gradient-und-die",children:"Bemerkung 12.3.9"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Aus dem voreingestellten Simplex fällt im Nelder-Mead-Widget in vierzig Schritten
kein einziger Schrumpfschritt.`}),e.jsxs(i.p,{children:["Der Zugzähler steht nach vierzig Schritten auf ",e.jsx(n,{children:"13"})," Reflexionen, ",e.jsx(n,{children:"4"}),` Expansionen,
`,e.jsx(n,{children:"23"}),` Kontraktionen und null Schrumpfschritten. Der Schrumpfschritt ist der
teuerste der vier Züge aus `,e.jsx(i.a,{href:"#env-nelder-mead-simplexverfahren",children:"Algorithmus 12.3.2"}),`, und dass er hier gar nicht
gebraucht wird, ist der Grund für die verhältnismäßig guten Kosten. Erst der
zweite Startsimplex („flach von links") erzwingt ihn, und zwar im vierten
Schritt.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Nelder-Mead braucht pro Iteration ",e.jsx(n,{children:"O(n^2)"})," Funktionsauswertungen."]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"O(n)"}),". Der Simplex hat ",e.jsx(n,{children:"n+1"}),` Ecken, aber in einem gewöhnlichen Schritt
werden nur ein oder zwei neue Punkte ausgewertet; erst der Schrumpfschritt kostet
`,e.jsx(n,{children:"n"}),` neue Ecken. Langsam wird das Verfahren in hoher Dimension nicht wegen der
Kosten pro Iteration, sondern wegen der Zahl der Iterationen (`,e.jsx(i.a,{href:"#env-wann-sich-nelder-mead-lohnt",children:"Bemerkung 12.3.3"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Verdoppeln wir ",e.jsx(n,{children:"\\kappa_f"}),`, so verdoppelt sich ungefähr die Schrittzahl, die
`,e.jsx(i.a,{href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"})," für dieselbe Genauigkeit garantiert."]}),e.jsxs(i.p,{children:["Die garantierte Zahl der Schritte je Dezimalstelle ist ",e.jsx(n,{children:"\\ln 10/(-\\ln\\rho)"}),` mit
`,e.jsx(n,{children:"\\rho = 1 - 1/\\kappa_f"}),", und wegen ",e.jsx(n,{children:"-\\ln(1 - 1/\\kappa_f) \\approx 1/\\kappa_f"}),`
wächst sie näherungsweise linear in `,e.jsx(n,{children:"\\kappa_f"}),": ",e.jsx(n,{children:"21{,}9"})," bei ",e.jsx(n,{children:"\\kappa_f = 10"}),`,
`,e.jsx(n,{children:"44{,}9"})," bei ",e.jsx(n,{children:"20"}),", ",e.jsx(n,{children:"229{,}1"})," bei ",e.jsx(n,{children:"100"})," und ",e.jsx(n,{children:"459{,}4"})," bei ",e.jsx(n,{children:"200"}),`
(`,e.jsx(i.a,{href:"#env-die-konditionszahl-einer-funktion",children:"Bemerkung 12.3.14"}),`). Der tatsächliche Verlauf darf
schneller sein, wie das Canyon-Widget zeigt, langsamer aber nicht.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §6.5.1 behandelt die direkten Suchverfahren einschließlich
Nelder-Mead, §6.5.2 den steilsten Abstieg samt Zickzack-Bild, und die
eindimensionalen Verfahren hinter der Liniensuche stehen in §6.4.`})})]})}function es(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(qr,{...r})}):qr(r)}const fi=K.blau,Wr=K.gruen,Vr=K.rot,ki=K.orange,ge=(r,i=3)=>Z(r,i);function Ir(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·10^${Number(t)}`}const ns={name:"konvex: f(x) = x − 2 ln x",formel:"f(x) = x − 2 ln x,  f′(x) = 1 − 2/x,  f″(x) = 2/x²",f:r=>r>0?r-2*Math.log(r):NaN,f1:r=>r>0?1-2/r:NaN,f2:r=>r>0?2/(r*r):NaN,xd:[.15,5],yd:[.3,3.2],x0min:.3,x0max:4.6,x0step:.1,start:1,kritisch:[{x:2,art:"min",global:!0}]},is={name:"nicht konvex: f(x) = x⁴/4 − x³/3 − x² + 2",formel:"f(x) = x⁴/4 − x³/3 − x² + 2,  f′(x) = x³ − x² − 2x,  f″(x) = 3x² − 2x − 2",f:r=>r**4/4-r**3/3-r*r+2,f1:r=>r**3-r*r-2*r,f2:r=>3*r*r-2*r-2,xd:[-2.1,3.1],yd:[-1.2,5],x0min:-2,x0max:3,x0step:.05,start:-2,kritisch:[{x:-1,art:"min"},{x:0,art:"max"},{x:2,art:"min",global:!0}]},Qi=[ns,is];function rs(r,i){const t=[i];let h=i;for(let l=0;l<60;l++){const d=r.f1(h),s=r.f2(h);if(!Number.isFinite(d)||!Number.isFinite(s))return{xs:t,ausgang:"undefiniert"};if(Math.abs(d)<1e-13)return{xs:t,ausgang:"konvergiert"};if(Math.abs(s)<1e-12)return{xs:t,ausgang:"flach"};const o=h-d/s;if(t.push(o),!Number.isFinite(o)||Math.abs(o)>1e6)return{xs:t,ausgang:"weg"};if(!Number.isFinite(r.f(o)))return{xs:t,ausgang:"undefiniert"};if(Math.abs(o-h)<1e-14)return{xs:t,ausgang:"konvergiert"};h=o}return{xs:t,ausgang:"maxIter"}}const ur=470,Ni=260,en=44,ts=30,Me=10,ss=12,pi=ur-en-ss,Pe=Ni-Me-ts;function Pr(r,i,t,h){let l="",d=!1;for(let s=0;s<=400;s++){const o=i[0]+(i[1]-i[0])*s/400,f=r(o);if(!Number.isFinite(f)){d=!1;continue}l+=`${d?"L":"M"}${t(o).toFixed(1)} ${h(f).toFixed(1)} `,d=!0}return l}function ls(){const[r,i]=F.useState(0),t=Qi[r],[h,l]=F.useState(t.start),[d,s]=F.useState(!0),{xs:o,ausgang:f}=F.useMemo(()=>rs(t,h),[t,h]),u=g=>en+(g-t.xd[0])/(t.xd[1]-t.xd[0])*pi,b=g=>Me+(t.yd[1]-g)/(t.yd[1]-t.yd[0])*Pe,S=g=>g>=t.xd[0]&&g<=t.xd[1],x=t.f1(h),z=t.f2(h),R=g=>t.f(h)+x*(g-h)+.5*z*(g-h)**2,j=Math.abs(z)>1e-12?h-x/z:null,m=o[o.length-1],k=t.kritisch.find(g=>Math.abs(m-g.x)<1e-6),D=t.kritisch.find(g=>g.global),L=o.map(g=>Math.abs(g-(k?k.x:D.x))),c=j!==null&&Number.isFinite(j)&&Math.abs(j-h)>20;let v="neutral",W="Newton unterwegs",I;f==="flach"?(v="fail",W="Schritt nicht ausführbar",I="Hier verschwindet f″, die Division im Newton-Schritt ist also nicht ausführbar."):f==="undefiniert"?(v="fail",W="aus dem Definitionsbereich gesprungen",I=`Nach ${o.length-1} Schritt${o.length===2?"":"en"} steht die Iteration bei x = ${ge(m,3)}, und dort ist f gar nicht mehr erklärt. Newton konvergiert nur lokal: Weit vom Ziel entfernt taugt die Parabel nicht als Modell, und der Schritt kann überall hin zeigen.`):f==="weg"?(v="fail",W="davongelaufen",I="Die Iterierten laufen davon; die Rechnung bricht hier ab."):o.length===1?(v=k&&k.art==="max"?"fail":"ok",W="der Gradient ist schon null",I=`Hier ist der Gradient schon null, die Iteration steht also von Anfang an still. ${k&&k.art==="max"?"Allerdings in einem lokalen Maximum: Newton unterscheidet nicht, welche Sorte kritischer Punkt vor ihm liegt.":"Wir stehen bereits in einem Minimum."}`):k&&k.art==="max"?(v="fail",W="im lokalen Maximum gelandet",I=`Nach ${o.length-1} Schritt${o.length===2?"":"en"} bleibt die Iteration bei x = ${ge(k.x,2)} stehen. Dort hat f ein lokales Maximum. Gesucht war ein Minimum, gefunden hat das Verfahren eine Nullstelle der Ableitung, und das ist beides. Verraten hätte es die Krümmung: Bei f″ < 0 öffnet sich die Parabel nach unten, ihr Scheitel ist der höchste und nicht der tiefste Punkt.`):k&&!k.global?(v="warn",W="nur ein lokales Minimum",I=`Die Iteration läuft in ${o.length-1} Schritten nach x = ${ge(k.x,2)}. Dort liegt zwar ein lokales Minimum, aber nicht das globale: Bei x = ${ge(D.x,2)} ist f um ${ge(t.f(k.x)-t.f(D.x),2)} kleiner. Welches Tal wir finden, entscheidet allein der Startpunkt.`):k?(v="ok",W="globales Minimum, quadratisch schnell",I=`Die Iteration erreicht das globale Minimum x⋆ = ${ge(D.x,2)} in ${o.length-1} Schritten. In der Nähe des Ziels zeigt die Fehlerspalte die quadratische Konvergenz: Der Quotient eₖ/eₖ₋₁² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Weiter draußen kann es dagegen dauern, bis die Iteration überhaupt in diese Nähe kommt.`):I=`Nach ${o.length-1} Schritten steht die Iteration bei x = ${ge(m,4)} und ist noch nicht zur Ruhe gekommen.`,c&&j!==null&&(I+=` Am Startpunkt ist f″ = ${ge(z,4)} beinahe null: Die Parabel ist dort fast eine Gerade, ihr Scheitel liegt entsprechend weit draußen, und der erste Schritt springt gleich nach x = ${ge(j,1)}. Von dort muss sich die Iteration erst wieder heranarbeiten. Das ist der eindimensionale Fall der Voraussetzung, dass die Hesse-Matrix invertierbar sein muss: Fast singulär genügt schon, um den Schritt unbrauchbar zu machen.`);const M=d&&Number.isFinite(x)&&Number.isFinite(z);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Verschieben wir den Startpunkt über den nicht-konvexen Bereich und lesen ab, in welchem kritischen Punkt Newton landet."}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Blau die Funktion und die Iterierten, orange die Parabel, mit der ",O("algorithmus:newton-verfahren-fuer-die-optimierung")," an der aktuellen Stelle rechnet, und ihr Scheitel: dort steht im nächsten Schritt die Iterierte."]}),e.jsx("div",{className:"flex flex-wrap items-center gap-3 text-sm",children:Qi.map((g,q)=>e.jsx("button",{type:"button","aria-pressed":q===r,className:q===r?Re:Ne,onClick:()=>{i(q),l(Qi[q].start)},children:g.name},g.name))}),e.jsx(re,{label:"Startpunkt x⁽⁰⁾",value:h,onChange:g=>l(Math.round(g/t.x0step)*t.x0step),min:t.x0min,max:t.x0max,step:t.x0step,fmt:g=>ge(g,2)}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:g=>s(g.target.checked)}),e.jsx("span",{children:"quadratisches Modell T₂ am Startpunkt zeigen"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("svg",{viewBox:`0 0 ${ur} ${Ni}`,width:ur,height:Ni,role:"img","aria-label":`Der Graph von f mit dem quadratischen Modell am Startpunkt x⁽⁰⁾ = ${ge(h,2)} und den ersten Newton-Iterierten.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white text-slate-500 dark:border-slate-600",children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s134-newton-clip",children:e.jsx("rect",{x:en,y:Me,width:pi,height:Pe})})}),e.jsx("rect",{x:en,y:Me,width:pi,height:Pe,fill:"none",stroke:"#cbd5e1"}),Pn(t.xd[0],t.xd[1]).map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:u(g),y1:Me+Pe,x2:u(g),y2:Me+Pe+4,stroke:"#94a3b8"}),e.jsx("text",{x:u(g),y:Me+Pe+15,fontSize:10,textAnchor:"middle",fill:"currentColor",children:ge(g,Math.abs(g)<1&&g!==0?1:0)})]},`x${g}`)),Pn(t.yd[0],t.yd[1]).map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:en-4,y1:b(g),x2:en,y2:b(g),stroke:"#94a3b8"}),e.jsx("text",{x:en-6,y:b(g)+3,fontSize:10,textAnchor:"end",fill:"currentColor",children:ge(g,0)})]},`y${g}`)),e.jsx("text",{x:en+pi/2,y:Ni-3,fontSize:11,textAnchor:"middle",fill:"currentColor",children:"x"}),e.jsx("text",{x:12,y:Me+Pe/2,fontSize:11,textAnchor:"middle",fill:"currentColor",transform:`rotate(-90 12 ${Me+Pe/2})`,children:"f(x)"}),e.jsxs("g",{clipPath:"url(#s134-newton-clip)",children:[t.kritisch.map(g=>e.jsx("line",{x1:u(g.x),y1:Me,x2:u(g.x),y2:Me+Pe,stroke:g.art==="min"?Wr:Vr,strokeWidth:1,strokeDasharray:"4 4",opacity:.7},`k${g.x}`)),e.jsx("path",{d:Pr(t.f,t.xd,u,b),fill:"none",stroke:fi,strokeWidth:2}),M&&e.jsx("path",{d:Pr(R,t.xd,u,b),fill:"none",stroke:ki,strokeWidth:2,strokeDasharray:"6 4"}),M&&j!==null&&S(j)&&e.jsx("line",{x1:u(j),y1:Me,x2:u(j),y2:Me+Pe,stroke:ki,strokeWidth:1.2,strokeDasharray:"2 3"}),e.jsx("polyline",{points:o.filter(g=>S(g)&&Number.isFinite(t.f(g))).map(g=>`${u(g).toFixed(1)},${b(t.f(g)).toFixed(1)}`).join(" "),fill:"none",stroke:fi,strokeWidth:1.2,strokeDasharray:"3 3",opacity:.8}),o.slice(0,6).map((g,q)=>S(g)&&Number.isFinite(t.f(g))&&e.jsx("circle",{cx:u(g),cy:b(t.f(g)),r:q===0?5:3.4,fill:fi,opacity:q===0?1:.75},`p${q}`)),M&&j!==null&&S(j)&&Number.isFinite(R(j))&&e.jsx("circle",{cx:u(j),cy:b(R(j)),r:4.5,fill:ki}),t.kritisch.filter(g=>g.art==="min").map(g=>e.jsx("circle",{cx:u(g.x),cy:b(t.f(g.x)),r:5.5,fill:"none",stroke:Wr,strokeWidth:2},`m${g.x}`))]})]})}),e.jsxs("div",{className:"max-w-prose space-y-2 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:[e.jsx("p",{className:"font-mono text-xs",children:t.formel}),e.jsxs("p",{children:["Am Startpunkt ",e.jsxs("span",{className:"font-mono",children:["x⁽⁰⁾ = ",ge(h,2)]}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:ki},children:["f′ = ",ge(x),", f″ = ",ge(z)]}),z<0&&e.jsx("span",{style:{color:Vr},children:" (negativ: die Parabel ist nach unten geöffnet, ihr Scheitel ein Hochpunkt)"}),j!==null&&e.jsxs(e.Fragment,{children:[" ","Scheitel und damit nächste Iterierte:"," ",e.jsxs("span",{className:"font-mono",style:{color:fi},children:["x⁽¹⁾ = ",ge(j,4)]}),"."]})]}),e.jsxs("table",{className:"font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-4 text-left",children:"k"}),e.jsx("th",{className:"pr-4 text-left",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-4 text-left",children:"f′(x⁽ᵏ⁾)"}),e.jsx("th",{className:"pr-4 text-left",children:"eₖ"}),e.jsx("th",{className:"text-left",children:"eₖ / eₖ₋₁²"})]})}),e.jsx("tbody",{children:o.slice(0,6).map((g,q)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-4",children:q}),e.jsx("td",{className:"pr-4",children:ge(g,8)}),e.jsx("td",{className:"pr-4",children:Ir(t.f1(g))}),e.jsx("td",{className:"pr-4",children:Ir(L[q])}),e.jsx("td",{children:q>0&&L[q-1]>1e-13?ge(L[q]/L[q-1]**2,4):"–"})]},`r${q}`))})]})]}),e.jsx(ye,{kind:v,titel:W,children:I})]})}const wi=K.blau,Hr=K.gruen,Zr=K.orange,Ae=(r,i=3)=>Z(r,i);function as(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const[i,t]=r.toExponential(1).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·10^${Number(t)}`}const ai=5,ds=[[1,0],[0,ai]],Tr=r=>.5*r[0]*r[0]+.5*ai*r[1]*r[1],xr=r=>[r[0],ai*r[1]],Or=(r,i)=>[r[0][0]*i[0]+r[0][1]*i[1],r[1][0]*i[0]+r[1][1]*i[1]],Ji=(r,i)=>r[0]*i[0]+r[1]*i[1];function hs(r,i){let t=[5,1],h=[[1,0],[0,1]];const l=[{x:t,B:h,alpha:null,sekante:null}];for(let d=0;d<i;d++){const s=xr(t);if(Math.hypot(s[0],s[1])<1e-13)break;const o=[-(h[0][0]*s[0]+h[0][1]*s[1]),-(h[1][0]*s[0]+h[1][1]*s[1])],f=Ji(o,Or(ds,o)),u=r&&f>1e-14?-Ji(s,o)/f:1,b=[u*o[0],u*o[1]],S=[t[0]+b[0],t[1]+b[1]],x=xr(S),z=[x[0]-s[0],x[1]-s[1]],R=Ji(z,b);let j=null;if(Math.abs(R)>1e-14){const m=1/R,k=[[1-m*b[0]*z[0],-m*b[0]*z[1]],[-m*b[1]*z[0],1-m*b[1]*z[1]]],D=[[1-m*z[0]*b[0],-m*z[0]*b[1]],[-m*z[1]*b[0],1-m*z[1]*b[1]]],L=[[k[0][0]*h[0][0]+k[0][1]*h[1][0],k[0][0]*h[0][1]+k[0][1]*h[1][1]],[k[1][0]*h[0][0]+k[1][1]*h[1][0],k[1][0]*h[0][1]+k[1][1]*h[1][1]]],c=[[L[0][0]*D[0][0]+L[0][1]*D[1][0],L[0][0]*D[0][1]+L[0][1]*D[1][1]],[L[1][0]*D[0][0]+L[1][1]*D[1][0],L[1][0]*D[0][1]+L[1][1]*D[1][1]]];h=[[c[0][0]+m*b[0]*b[0],c[0][1]+m*b[0]*b[1]],[c[1][0]+m*b[1]*b[0],c[1][1]+m*b[1]*b[1]]];const v=Or(h,z);j=Math.hypot(v[0]-b[0],v[1]-b[1])}t=S,l.push({x:t,B:h,alpha:u,sekante:j})}return l}const ni=400,ii=270,Nn=26;function cs(){const[r,i]=F.useState(!1),[t,h]=F.useState(0),l=F.useMemo(()=>hs(r,8),[r]),d=Math.min(t,l.length-1),s=l[d],o=xr(s.x),f=l.slice(0,d+1).map(c=>c.x);let u=5.5,b=1.4;for(const c of f)u=Math.max(u,Math.abs(c[0])*1.15),b=Math.max(b,Math.abs(c[1])*1.15);const S=c=>Nn+(c+u)/(2*u)*(ni-2*Nn),x=c=>ii-Nn-(c+b)/(2*b)*(ii-2*Nn),z=(ni-2*Nn)/(2*u),R=(ii-2*Nn)/(2*b),j=[.6,2.5,7,15,30,45].filter(c=>Math.sqrt(2*c)<1.05*u),m=Math.hypot(s.B[0][0]-1,s.B[0][1],s.B[1][0],s.B[1][1]-1/ai);let k="neutral",D=`nach ${d} Schritten`,L;return d===0?(D="Ausgangslage B₀ = I",L="Start bei B₀ = I. Der erste Schritt ist deshalb ein gewöhnlicher Gradientenschritt: Ohne Vorwissen über die Krümmung kann das Verfahren nichts Besseres tun."):r&&d>=2?(k="ok",D="nach n = 2 Schritten exakt",L=`Die Iterierte sitzt im Minimum, und B₂ stimmt auf allen gezeigten Stellen mit diag(1; 0,2) = H⁻¹ überein. Ein Zufall dieses Beispiels ist das nicht, sondern genau die Aussage von ${O("satz:das-bfgs-update-erfuellt-die")}: Bei einer Quadrik im ℝⁿ liefern n Schritte mit exakter Liniensuche n Sekantenbedingungen für n unabhängige Richtungen, und mehr Information über eine konstante Krümmung gibt es nicht.`):!r&&d===1?(k="warn",D="der erste Schritt geht zu weit",L=`f wächst von 15 auf 40, obwohl die Richtung bergab zeigte. Am Update liegt das nicht, sondern an der Länge α = 1, die niemand geprüft hat. Deshalb kommt BFGS in der Praxis nie ohne Schrittweitensuche (Häkchen setzen); ${O("satz:das-bfgs-update-erfuellt-die")} setzt sie ausdrücklich voraus.`):L=`Nach ${d===1?"einem Schritt":`${d} Schritten`} steht f bei ${Ae(Tr(s.x),4)}. Die Näherung B_${d} hat inzwischen Krümmungsinformation gesammelt, liegt von diag(1; 0,2) aber immer noch ${Ae(m,3)} entfernt (Frobeniusnorm). Das stört nicht weiter, denn für den Schritt zählt nur, ob die Richtung taugt.`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Schieben wir den Schrittregler durch und vergleichen B_k mit H⁻¹: einmal mit, einmal ohne exakte Schrittweite."}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Minimiert wird f(x) = 0,5 x₁² + 2,5 x₂², die Hesse-Matrix ist überall diag(1; 5). BFGS kennt sie nicht, sondern baut aus den beobachteten Gradientendifferenzen eine Näherung B_k der inversen Hesse-Matrix auf."}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:c=>{i(c.target.checked),h(0)}}),e.jsx("span",{children:"exakte Schrittweite statt α = 1"})]}),e.jsx(re,{label:"Schritt k",value:d,onChange:c=>h(Math.round(c)),min:0,max:l.length-1,step:1,fmt:c=>String(Math.round(c))}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${ni} ${ii}`,width:ni,height:ii,role:"img","aria-label":`Höhenlinien der Quadrik mit den ersten ${d} BFGS-Iterierten${r?" bei exakter Schrittweite":""}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:S(-u),y1:x(0),x2:S(u),y2:x(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:S(0),y1:x(-b),x2:S(0),y2:x(b),stroke:"#cbd5e1"}),j.map(c=>e.jsx("ellipse",{cx:S(0),cy:x(0),rx:Math.sqrt(2*c)*z,ry:Math.sqrt(2*c/ai)*R,fill:"none",stroke:"#94a3b8",strokeWidth:.9,strokeDasharray:"3 3"},c)),e.jsx("text",{x:ni-6,y:x(0)-5,fontSize:10,textAnchor:"end",fill:"#64748b",children:"x₁"}),e.jsx("text",{x:S(0)+5,y:12,fontSize:10,fill:"#64748b",children:"x₂"}),e.jsx("polyline",{points:f.map(c=>`${S(c[0]).toFixed(1)},${x(c[1]).toFixed(1)}`).join(" "),fill:"none",stroke:wi,strokeWidth:1.6}),f.map((c,v)=>e.jsx("circle",{cx:S(c[0]),cy:x(c[1]),r:v===d?4.5:2.8,fill:wi,opacity:v===d?1:.65,style:{transition:"cx 250ms ease-in-out, cy 250ms ease-in-out"}},`i${v}`)),e.jsx("circle",{cx:S(0),cy:x(0),r:5,fill:"none",stroke:Hr,strokeWidth:2})]}),e.jsxs("div",{className:"mt-1 flex flex-wrap gap-3",children:[e.jsx("span",{style:{color:wi},children:"● Iterierte"}),e.jsx("span",{style:{color:Hr},children:"◯ Minimum"}),e.jsx("span",{children:"· · · Höhenlinien von f"})]})]}),e.jsxs("div",{className:"min-w-[16rem] grow space-y-1 font-mono text-xs",children:[e.jsxs("div",{style:{color:wi},children:["x⁽",d,"⁾ = (",Ae(s.x[0],4),"; ",Ae(s.x[1],4),")"]}),e.jsxs("div",{children:["f(x⁽",d,"⁾) = ",Ae(Tr(s.x),5)]}),e.jsxs("div",{style:{color:Zr},children:["∇f(x⁽",d,"⁾) = (",Ae(o[0],4),"; ",Ae(o[1],4),")"]}),s.alpha!==null&&e.jsxs("div",{children:["α für diesen Schritt = ",Ae(s.alpha,4)]}),e.jsxs("div",{className:"pt-2",style:{color:Zr},children:["B_",d," = (",Ae(s.B[0][0],4)," ",Ae(s.B[0][1],4),"; ",Ae(s.B[1][0],4)," ",Ae(s.B[1][1],4),")"]}),e.jsx("div",{className:"text-slate-500 dark:text-slate-400",children:"H⁻¹ = (1,0000 0,0000; 0,0000 0,2000)"}),s.sekante!==null&&e.jsxs("div",{className:"text-slate-500 dark:text-slate-400",children:["Sekantenbedingung ‖B_",d," y − s‖ = ",as(s.sekante)]})]})]}),e.jsx(ye,{kind:k,titel:D,children:L})]})}const vi=K.blau,zi=K.violett,Ur=K.gruen,J=(r,i=2)=>Z(r,i),os=[{name:"κ = 5: gut konditioniert",c:5,rel:1,alpha:.9},{name:"κ = 25: mittel",c:25,rel:1,alpha:.9},{name:"κ = 100: schlecht",c:100,rel:1,alpha:.9}],Ai=[5,1],Yi=60,ri=400;function er(r,i,t,h){let l=[...Ai],d=[0,0];const s=[[...l]];for(let o=0;o<h;o++){const f=[l[0],r*l[1]];if(d=[t*d[0]-i*f[0],t*d[1]-i*f[1]],l=[l[0]+d[0],l[1]+d[1]],!Number.isFinite(l[0])||!Number.isFinite(l[1])||Math.hypot(l[0],l[1])>1e12){s.push([...l]);break}s.push([...l])}return s}const An=420,_n=250,Je=24,Si=330,yi=190,Mi=46,us=24,Cr=10,Xr=10;function xs(){const[r,i]=F.useState(25),[t,h]=F.useState(1),[l,d]=F.useState(.9),s=Math.max(1,r),o=Math.min(1,r),f=s/o,u=t/s,b=N=>.5*(N[0]*N[0]+r*N[1]*N[1]),S=F.useMemo(()=>er(r,u,0,Yi),[r,u]),x=F.useMemo(()=>er(r,u,l,Yi),[r,u,l]),z=b(Ai),R=N=>{const He=er(r,u,N,ri).findIndex(ut=>b(ut)<=1e-6*z);return He<0?null:He},j=R(0),m=R(l),k=((Math.sqrt(f)-1)/(Math.sqrt(f)+1))**2,D=4/(Math.sqrt(s)+Math.sqrt(o))**2*s,L=7,c=2.2,v=N=>Je+(N+L)/(2*L)*(An-2*Je),W=N=>_n-Je-(N+c)/(2*c)*(_n-2*Je),I=(An-2*Je)/(2*L),M=(_n-2*Je)/(2*c),g=(N,se)=>Math.max(-3*se,Math.min(3*se,N)),q=N=>N.filter(se=>Number.isFinite(se[0])&&Number.isFinite(se[1])).map(se=>`${v(g(se[0],L)).toFixed(1)},${W(g(se[1],c)).toFixed(1)}`).join(" "),U=[.5,2,5,12.5,25].filter(N=>Math.sqrt(2*N)<1.3*L),C=N=>N.map(se=>Math.log10(Math.max(b(se),1e-16))),P=C(S),w=C(x);let E=2,te=-8;for(const N of[P,w])for(const se of N)Number.isFinite(se)&&(E=Math.max(E,Math.ceil(se)));const ue=N=>Mi+(Si-Mi-Xr)*N/Yi,p=N=>Cr+(yi-Cr-us)*(E-N)/(E-te),B=N=>N.map((se,He)=>`${ue(He).toFixed(1)},${p(Math.max(te,Math.min(E,se))).toFixed(1)}`).join(" "),X=[];for(let N=E;N>=te;N-=Math.max(1,Math.ceil((E-te)/5)))X.push(N);const $=2*(1+l),a=t>2+1e-9,G=Math.abs(t-2)<=1e-9,me=t>$+1e-9,sn=l<1?1/(1-l):1/0,Hn=N=>{let se=0;for(let He=1;He<N.length;He++)N[He][1]*N[He-1][1]<0&&se++;return se},Zn=Hn(S)>0,ot=Hn(x)>0;let Ce="neutral",Le="Momentum gegen Gradientenabstieg",Ee;return l===0?(Le="α = 0: kein Schwung",Ee=`Mit α = 0 ist der Schwung abgeschaltet: ${O("algorithmus:gradientenabstieg-mit-heavy-ball")} fällt auf den gewöhnlichen Gradientenabstieg zurück, beide Wege sind derselbe, und die violette Kurve liegt genau auf der blauen. ${a?`Mit γ·L = ${J(t)} über der gemeinsamen Grenze 2 laufen deshalb auch beide davon.`:"Schieben wir α nach oben, trennen sich die beiden Wege."}`):me?(Ce="fail",Le="beide divergieren",Ee=`γ·L = ${J(t)} liegt über der Stabilitätsgrenze 2 des Gradientenabstiegs und über 2(1 + α) = ${J($)} für Heavy-Ball. In der steilen Richtung wächst der Fehler dann in jedem Schritt.`):a?(Ce="warn",Le="nur Momentum bleibt stabil",Ee=`Der gewöhnliche Gradientenabstieg divergiert hier, denn γ·L = ${J(t)} liegt über 2. Momentum bleibt stabil, seine Grenze ist 2(1 + α) = ${J($)}: Der Schwung erlaubt also nicht nur glattere, sondern auch grössere Schritte.`):G?(Ce="warn",Le="der Gradientenabstieg steht an der Grenze",Ee=`Genau an der Grenze γ·L = 2 springt der Gradientenabstieg in der steilen Richtung zwischen zwei Werten hin und her, ohne kleiner zu werden. Momentum bleibt darunter (Grenze 2(1 + α) = ${J($)}) und kommt voran.`):m!==null&&j!==null&&m<j?(Ce="ok",Le="hier hilft der Schwung",Ee=`Momentum braucht ${m} Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾), der reine Gradientenabstieg ${j}. ${Zn?`Zwei Wirkungen stecken darin: In der flachen Richtung zeigen die Gradienten immer in dieselbe Richtung und summieren sich auf das 1/(1 − α) = ${J(sn,1)}-fache eines Einzelschritts auf; in der steilen Richtung wechselt schon der blaue Weg wegen γ·L > 1 das Vorzeichen, und die Mittelung dämpft dieses Hin und Her.`:`Der Gewinn kommt hier allein aus der flachen Richtung: Dort zeigen die Gradienten immer gleich, und ihre Beiträge summieren sich auf das 1/(1 − α) = ${J(sn,1)}-fache eines Einzelschritts auf. ${ot?"Der blaue Weg pendelt bei dieser Schrittweite gar nicht; dass der violette quer zum Tal trotzdem hin und her schwingt, ist der Preis des Gedächtnisses und nicht seine Wirkung.":"Quer zum Tal pendelt hier keiner der beiden Wege."}`}`):m!==null&&j!==null&&m===j?(Le="Gleichstand",Ee=`Hier nimmt sich beides nichts: Beide Verfahren brauchen ${m} Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾). Bei κ = ${J(f,0)} wären α ≈ ${J(k)} und γ·L ≈ ${J(D)} die beste Wahl.`):m!==null&&j!==null?(Ce="warn",Le="hier schadet der Schwung",Ee=`Hier schadet das Momentum: ${m} Schritte gegen ${j} ohne. Bei κ = ${J(f,0)} ist α = ${J(l)} zu viel des Guten, die Iterierten schiessen über das Tal hinaus; rechnerisch optimal wären α ≈ ${J(k)} und γ·L ≈ ${J(D)}. Der Standardwert 0,9 stammt aus dem Deep Learning, wo die Konditionszahl um Grössenordnungen höher liegt.`):m!==null?(Ce="ok",Le="nur Momentum kommt an",Ee=`Momentum erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) nach ${m} Schritten; der reine Gradientenabstieg schafft es in ${ri} Schritten nicht. Rechnerisch optimal wären hier α ≈ ${J(k)} und γ·L ≈ ${J(D)}.`):(Ce="warn",Le="keines der beiden kommt an",Ee=`Keines der beiden Verfahren erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) innerhalb von ${ri} Schritten. Bei κ = ${J(f,0)} wären α ≈ ${J(k)} und γ·L ≈ ${J(D)} die beste Wahl.`),e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Vergleichen wir die drei Konditionen bei festem α = 0,9: Ab wann überholt Violett das Blau?"}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Modellproblem ist f(x) = ½(x₁² + c·x₂²) mit Start (5; 1); die Hesse-Matrix ist diag(1; c), die Konditionszahl also κ = c. Blau läuft der gewöhnliche Gradientenabstieg, violett derselbe Abstieg mit Momentum; die Schrittweite steht in Vielfachen von 1/L."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:os.map(N=>{const se=r===N.c&&Math.abs(t-N.rel)<1e-9&&Math.abs(l-N.alpha)<1e-9;return e.jsx("button",{type:"button","aria-pressed":se,className:se?Re:Ne,onClick:()=>{i(N.c),h(N.rel),d(N.alpha)},children:N.name},N.name)})}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${An} ${_n}`,width:An,height:_n,role:"img","aria-label":`Höhenlinien der Quadrik mit κ = ${J(f,0)}; blau der Weg ohne, violett der Weg mit Momentum.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s134-mom-clip",children:e.jsx("rect",{x:Je/2,y:0,width:An-Je,height:_n})})}),e.jsx("line",{x1:v(-L),y1:W(0),x2:v(L),y2:W(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:v(0),y1:W(-c),x2:v(0),y2:W(c),stroke:"#cbd5e1"}),e.jsxs("g",{clipPath:"url(#s134-mom-clip)",children:[U.map(N=>e.jsx("ellipse",{cx:v(0),cy:W(0),rx:Math.sqrt(2*N)*I,ry:Math.sqrt(2*N/r)*M,fill:"none",stroke:"#94a3b8",strokeWidth:.9,strokeDasharray:"3 3"},N)),e.jsx("polyline",{points:q(S),fill:"none",stroke:vi,strokeWidth:1.5,opacity:.9}),e.jsx("polyline",{points:q(x),fill:"none",stroke:zi,strokeWidth:1.5,opacity:.9}),e.jsx("circle",{cx:v(Ai[0]),cy:W(Ai[1]),r:4,fill:"#334155"}),e.jsx("circle",{cx:v(0),cy:W(0),r:5,fill:"none",stroke:Ur,strokeWidth:2})]}),e.jsx("text",{x:An-6,y:W(0)-5,fontSize:10,textAnchor:"end",fill:"#64748b",children:"x₁"}),e.jsx("text",{x:v(0)+5,y:12,fontSize:10,fill:"#64748b",children:"x₂"})]}),e.jsxs("div",{className:"mt-1 flex flex-wrap gap-3",children:[e.jsx("span",{style:{color:vi},children:"● ohne Momentum"}),e.jsx("span",{style:{color:zi},children:"● mit Momentum"}),e.jsx("span",{style:{color:Ur},children:"◯ Minimum"})]})]}),e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${Si} ${yi}`,width:Si,height:yi,role:"img","aria-label":"Halblogarithmischer Verlauf des Funktionswerts über sechzig Schritte für beide Verfahren.",className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[X.map(N=>e.jsxs("g",{children:[e.jsx("line",{x1:Mi,y1:p(N),x2:Si-Xr,y2:p(N),stroke:"#e2e8f0"}),e.jsxs("text",{x:Mi-4,y:p(N)+3,fontSize:9,textAnchor:"end",fill:"#64748b",children:["10^",N]})]},`y${N}`)),[0,15,30,45,60].map(N=>e.jsx("text",{x:ue(N),y:yi-6,fontSize:9,textAnchor:"middle",fill:"#64748b",children:N},`x${N}`)),e.jsx("polyline",{points:B(P),fill:"none",stroke:vi,strokeWidth:1.6}),e.jsx("polyline",{points:B(w),fill:"none",stroke:zi,strokeWidth:1.6})]}),e.jsx("div",{className:"mt-1",children:"f(x⁽ᵏ⁾) über k, logarithmische Achse"})]})]}),e.jsxs("div",{className:"max-w-prose space-y-1",children:[e.jsx(re,{label:"c = κ",value:r,onChange:N=>i(Math.round(N)),min:2,max:100,step:1,fmt:N=>String(Math.round(N))}),e.jsx(re,{label:"γ·L",value:t,onChange:N=>h(Math.round(N*20)/20),min:.1,max:3.6,step:.05,fmt:N=>J(N)}),e.jsx(re,{label:"α (Momentum)",value:l,onChange:N=>d(Math.round(N*100)/100),min:0,max:.95,step:.01,fmt:N=>J(N)})]}),e.jsx("div",{className:"max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:e.jsxs("p",{className:"font-mono text-xs",children:["κ = ",J(f,0),", γ = ",J(u,4),", α = ",J(l)," | Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾):"," ",e.jsxs("span",{style:{color:vi},children:["ohne ",j===null?`> ${ri}`:j]}),","," ",e.jsxs("span",{style:{color:zi},children:["mit ",m===null?`> ${ri}`:m]})]})}),e.jsx(ye,{kind:Ce,titel:Le,children:Ee})]})}function Qr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Krümmung statt nur Steigung"}),`
`,e.jsxs(i.p,{children:["Der Gradientenabstieg aus ",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," kennt von ",e.jsx(n,{children:"\\cblue{f}"}),` nur die
Steigung. Er ersetzt die Funktion an der aktuellen Stelle durch ihre Tangentialebene
und läuft dann bergab. Wie weit er laufen darf, sagt ihm niemand, deshalb die
Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma}"})," und deshalb der Zickzack in engen Tälern."]}),`
`,e.jsxs(i.p,{children:["Die ",e.jsx(A,{id:"taylor-theorem",children:"Taylorentwicklung"}),` liefert die nächstbessere Näherung
gratis. `,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-taylorentwicklung-ii",children:"Satz 10.8.7"})," aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),` gibt sie für
`,e.jsx(n,{children:"f \\in \\Ccal^2"}),", also für zweimal stetig differenzierbares ",e.jsx(n,{children:"f"}),`, mit einem Restterm
`,e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|^2)"}),". ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"}),` schreibt dieselbe Zeile für
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` in Gradient und Hesse-Matrix aus, verlangt dafür aber
`,e.jsx(n,{children:"f \\in \\Ccal^3"}),`, weil es gleich noch eine Ordnung weiter geht. Uns genügt die
Ordnung zwei:`]}),`
`,e.jsx(ee,{tag:"12.4.1",id:"eq-eq-12-4-1",children:`\\cblue{f(\\bx + \\bh)} \\approx \\corange{T_2(\\bh)} = \\cblue{f(\\bx)}
+ \\corange{\\nabla f(\\bx)}\\,\\bh
+ \\tfrac{1}{2}\\,\\bh^\\top \\corange{\\bH_f(\\bx)}\\,\\bh .`}),`
`,e.jsxs(i.p,{children:["Statt einer Geraden legen wir also eine Parabel an, im ",e.jsx(n,{children:"\\R^n"}),` eine
`,e.jsx(A,{id:"quadratic-form",children:"quadratische Form"}),` über dem aktuellen Punkt. Und anders als bei
einer Geraden hat eine nach oben geöffnete Parabel einen tiefsten Punkt. Den können
wir ausrechnen.`]}),`
`,e.jsxs(i.p,{children:["Dazu leiten wir ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"})," nach dem Zuwachs ",e.jsx(n,{children:"\\bh"}),` ab. Der Gradient ist in unserer
Konvention eine Zeile (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`); der lineare
Term steuert `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}"}),` bei, und die quadratische Form hat nach
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"}),` den Gradienten
`,e.jsx(n,{children:"\\bh^\\top(\\corange{\\bH_f} + \\corange{\\bH_f^\\top})/2 = \\bh^\\top \\corange{\\bH_f}"}),`,
denn die `,e.jsx(A,{id:"hessian-matrix",children:"Hesse-Matrix"}),` ist nach dem Satz von Schwarz
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-satz-von-schwarz",children:"Satz 10.7.4"}),") symmetrisch:"]}),`
`,e.jsx(_,{children:`\\corange{\\nabla_\\bh\\, T_2(\\bh)} = \\corange{\\nabla f(\\bx)} + \\bh^\\top \\corange{\\bH_f(\\bx)}
\\overset{!}{=} \\bnull^\\top .`}),`
`,e.jsxs(i.p,{children:["Beide Seiten sind Zeilenvektoren. Auflösen nach ",e.jsx(n,{children:"\\bh^\\top"}),` und Transponieren liefert
den Schritt, den wir suchen. Dieselbe Rechnung lässt sich auch in Spalten führen,
als `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)^\\top} + \\corange{\\bH_f(\\bx)}\\bh = \\bnull"}),`; sie liefert
denselben Schritt. Nur mischen darf man die beiden Konventionen nicht – links zwei
Spaltenvektoren und rechts eine Zeile ergibt keine Gleichung.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.4.1 (Newton-Verfahren für die Optimierung)",id:"env-newton-verfahren-fuer-die-optimierung",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` zweimal stetig differenzierbar und ein
Startpunkt `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," wiederhole:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Berechne ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(k)})}"})," und ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Setze"}),`
`,e.jsx(ee,{tag:"12.4.2",id:"eq-newton-verfahren-fuer-die-optimierung",children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
- \\corange{\\bH_f(\\bx^{(k)})^{-1}}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} ,`}),`
`,e.jsxs(i.p,{children:["sofern ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"})," invertierbar ist."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Brich ab, sobald ",e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx^{(k)})}\\right\\|"}),` oder die
Schrittlänge `,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k+1)}} - \\cblue{\\bx^{(k)}}\\right\\|"}),` unter eine
vorgegebene Schranke fällt, wie beim Gradientenabstieg in
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]}),`
`]}),`
`]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.2 (Was der Schritt voraussetzt und wie wir ihn rechnen)",id:"env-was-der-schritt-voraussetzt-und-wie-wir",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Hesse-Matrix muss invertierbar sein."}),` Sonst hat die quadratische Näherung
entweder gar keinen kritischen Punkt oder gleich einen ganzen affinen Unterraum
davon, und `,e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"})," steht nicht einmal auf dem Papier. „Bei konvexem ",e.jsx(n,{children:"f"}),` ist
`,e.jsx(n,{children:"\\corange{\\bH_f} \\succ 0"}),`" wäre dafür ein zu bequemes Argument: Konvexität liefert
nur positive `,e.jsx(i.em,{children:"Semi"}),"definitheit (",e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.4",children:"Abschnitt 11.4"}),`),
und selbst strikte Konvexität reicht nicht, wie `,e.jsx(n,{children:"f(x) = x^4"}),` im Nullpunkt zeigt. Gebraucht wird eine
`,e.jsx(A,{id:"positive-definite",children:"positiv definite"}),` Hesse-Matrix, und die ist eine eigene
Annahme.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Inverse ist eine Schreibweise, keine Rechenanweisung."}),` Gerechnet wird nicht
`,e.jsx(n,{children:"\\corange{\\bH_f^{-1}}"}),", sondern das ",e.jsx(A,{id:"linear-system",children:"lineare Gleichungssystem"})]}),e.jsx(_,{children:`\\corange{\\bH_f(\\bx^{(k)})}\\,\\corange{\\bd^{(k)}} = -\\corange{\\nabla f(\\bx^{(k)})^\\top} ,
\\qquad
\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\corange{\\bd^{(k)}} .`}),e.jsxs(i.p,{children:["Das ist billiger und stabiler (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`). Ist
`,e.jsx(n,{children:"\\corange{\\bH_f}"}),` positiv definit, so ist die
`,e.jsx(A,{id:"cholesky-factorization",children:"Cholesky-Zerlegung"}),` aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),` das Mittel der Wahl, und ihr Gelingen ist zugleich
die Definitheitsprobe. Die Merkregel lautet knapper:
`,e.jsx(i.em,{children:"Invertiere niemals eine Matrix."})]})]}),`
`,e.jsx(i.h3,{children:"Newton-Raphson und Newton-Optimierung sind dasselbe Verfahren"}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` haben wir Newton-Raphson als Verfahren für Nullstellen
kennengelernt, hier als Verfahren für Minima. Das ist kein Zufall, sondern ein und
dieselbe Vorschrift, angewandt auf zwei verschiedene Funktionen.`]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.3 (Eine Vorschrift, zwei Spalten)",id:"env-eine-vorschrift-zwei-spalten",children:[e.jsx(i.p,{children:"Nebeneinandergestellt sehen die beiden Fassungen so aus:"}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{}),e.jsx(i.th,{children:"Nullstellensuche"}),e.jsx(i.th,{children:"Optimierung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Aufgabe"}),e.jsxs(i.td,{children:["löse ",e.jsx(n,{children:"\\cblue{f(x)} = 0"})]}),e.jsxs(i.td,{children:["löse ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schritt"}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\dfrac{\\cblue{f(x^{(k)})}}{\\corange{f'(x^{(k)})}}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top}"})})]})]})]}),e.jsxs(i.p,{children:[`Der Übergang ist wörtlich zu nehmen. Setzen wir
`,e.jsx(n,{children:"\\corange{\\bg(\\bx)} := \\corange{\\nabla f(\\bx)^\\top}"}),`, so ist die Optimierung genau
die Nullstellensuche für `,e.jsx(n,{children:"\\corange{\\bg}\\colon \\R^n \\to \\R^n"}),`, und deren
Jacobimatrix ist die Hesse-Matrix, `,e.jsx(n,{children:"\\bJ_{\\corange{\\bg}} = \\corange{\\bH_f}"}),` – das
ist die Definition der Hesse-Matrix (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-hesse-matrix",children:"Definition 10.7.3"}),`). Der
mehrdimensionale Newton-Raphson-Schritt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\bJ_{\\corange{\\bg}}^{-1}\\corange{\\bg}"}),`
aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` ist damit wörtlich
`,e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),`, wie
`,e.jsx(i.a,{href:"#env-von-der-nullstelle-zum-minimum",children:"Bemerkung 12.1.14"}),` ihn schon einmal aufgeschrieben hat.
Alles, was wir über Newton-Raphson wissen, gilt deshalb hier
weiter: Unter ausreichender lokaler Glattheit, etwa einer lokal Lipschitz-stetigen
Hesse-Matrix, erhalten wir quadratische Konvergenz in der Nähe einer Lösung mit
invertierbarer Hesse-Matrix. Es bleiben die Empfindlichkeit gegen schlechte
Startpunkte und der Ärger, wenn die Ableitung im Nenner verschwindet.`]})]}),`
`,e.jsx(i.h3,{children:"Wie schnell das geht"}),`
`,e.jsx(i.p,{children:`Dass sich die Näherungsparabel Schritt für Schritt an das Minimum heranarbeitet,
ist als Bild schnell gezeichnet. Interessanter ist, wie schnell das geht. Rechnen
wir es an einer Funktion nach, deren Vorschrift wir kennen.`}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.4.4 (Newton auf einer nicht-quadratischen Funktion)",id:"env-newton-auf-einer-nicht-quadratischen",children:[e.jsx(i.p,{children:"Wir minimieren"}),e.jsx(_,{children:"\\cblue{f(x)} = x - 2\\ln x , \\qquad x > 0 ,"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\corange{f'(x)} = 1 - 2/x"})," und ",e.jsx(n,{children:"\\corange{f''(x)} = 2/x^2 > 0"}),`. Die Funktion ist
also strikt konvex, und `,e.jsx(n,{children:"\\corange{f'(x)} = 0"}),` hat die einzige Lösung
`,e.jsx(n,{children:"\\cgreen{x^\\star} = 2"})," (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`). Statistisch ist das kein
Kunstprodukt: Bis auf eine additive Konstante ist `,e.jsx(n,{children:"\\cblue{f}"}),` die negative
Log-Dichte einer Gammaverteilung mit Formparameter `,e.jsx(n,{children:"3"})," und Rate ",e.jsx(n,{children:"1"}),", und ",e.jsx(n,{children:"2"}),` ist
deren Modus.`]}),e.jsxs(i.p,{children:["Der Newton-Schritt ",e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"})," wird in einer Dimension zu"]}),e.jsx(_,{children:`\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\corange{f'(x^{(k)})}}{\\corange{f''(x^{(k)})}}
= \\cblue{x^{(k)}} - \\frac{1 - 2/\\cblue{x^{(k)}}}{2/(\\cblue{x^{(k)}})^2}
= \\frac{\\cblue{x^{(k)}}\\bigl(4 - \\cblue{x^{(k)}}\\bigr)}{2} .`}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 1"})," aus laufen die Iterierten so:"]}),e.jsx(_,{children:`\\begin{array}{c|l|l|l}
k & \\cblue{x^{(k)}} & e_k := \\left|\\cblue{x^{(k)}} - \\cgreen{x^\\star}\\right| & e_k / e_{k-1}^2 \\\\ \\hline
0 & 1{,}0000000000 & 1{,}00 \\cdot 10^{0} & \\text{-} \\\\
1 & 1{,}5000000000 & 5{,}00 \\cdot 10^{-1} & 0{,}500 \\\\
2 & 1{,}8750000000 & 1{,}25 \\cdot 10^{-1} & 0{,}500 \\\\
3 & 1{,}9921875000 & 7{,}81 \\cdot 10^{-3} & 0{,}500 \\\\
4 & 1{,}9999694824 & 3{,}05 \\cdot 10^{-5} & 0{,}500 \\\\
5 & 1{,}9999999995 & 4{,}66 \\cdot 10^{-10} & 0{,}500
\\end{array}`}),e.jsxs(i.p,{children:["Die letzte Spalte ist hier nicht bloß ungefähr konstant, sondern exakt ",e.jsx(n,{children:"1/2"}),`. Denn
aus der Schrittformel folgt`]}),e.jsx(_,{children:`\\cblue{x^{(k+1)}} - \\cgreen{2}
= \\frac{4\\cblue{x^{(k)}} - (\\cblue{x^{(k)}})^2 - 4}{2}
= -\\frac{\\bigl(\\cblue{x^{(k)}} - \\cgreen{2}\\bigr)^2}{2} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"e_{k+1} = e_k^2/2"})," in jedem einzelnen Schritt. Der Faktor ",e.jsx(n,{children:"1/2"}),` ist kein
Zufallswert, sondern das Gegenstück zu der Konstanten aus `,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),`: Weil
wir Newton-Raphson auf `,e.jsx(n,{children:"\\corange{f'}"}),` anwenden, rutschen die Ableitungen um eine
Ordnung hoch, und aus `,e.jsx(n,{children:"\\left|f''\\right| / (2\\left|f'\\right|)"}),` wird
`,e.jsx(n,{children:`\\left|f'''(\\cgreen{x^\\star})\\right| / \\bigl(2 \\corange{f''(\\cgreen{x^\\star})}\\bigr)
= 0{,}5 / (2 \\cdot 0{,}5) = 0{,}5`}),"."]}),e.jsxs(i.p,{children:["Lokal ist die Aussage aber auch hier. Für ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),` liefert die
Schrittformel `,e.jsx(n,{children:"\\cred{0}"}),", für ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4{,}5"})," sogar ",e.jsx(n,{children:"\\cred{-1{,}125}"}),`.
Beide Male landet der erste Schritt außerhalb von `,e.jsx(n,{children:"(0, \\infty)"}),", wo ",e.jsx(n,{children:"\\cblue{f}"}),` gar
nicht erklärt ist.`]})]}),`
`,e.jsxs(ze,{title:"Die Parabel am Startpunkt",children:[e.jsxs(i.p,{children:["Die Tafel zeigt, was ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"}),` meint. Orange liegt das quadratische Modell am
aktuellen Punkt, sein Scheitel ist die nächste Iterierte, und die blauen Punkte
zeigen, wohin die Reise geht. Voreingestellt ist `,e.jsx(i.a,{href:"#env-newton-auf-einer-nicht-quadratischen",children:"Beispiel 12.4.4"}),` mit
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 1"}),`, sodass sich die Zahlen der Tabelle direkt wiederfinden
lassen; der zweite Menüpunkt ist die nicht-konvexe Funktion aus
`,e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),"."]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Wo landet Newton auf der nicht-konvexen Funktion, wenn wir bei ",e.jsx(n,{children:"x^{(0)} = 0{,}5"})," starten?"]}),optionen:[{id:"min-lokal",text:"im lokalen Minimum bei −1"},{id:"max",text:"im lokalen Maximum bei 0"},{id:"min-global",text:"im globalen Minimum bei 2"}],loesung:"max",verdeckt:e.jsx(e.Fragment,{children:"Der zweite Menüpunkt und der Startpunktregler zeigen es in einem einzigen Schritt."}),children:e.jsx(ls,{})}),e.jsxs(i.p,{children:[`Alles hängt am Startpunkt. Auf der konvexen Funktion verlässt der erste Schritt ab
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),` den Definitionsbereich, wie am Ende von
`,e.jsx(i.a,{href:"#env-newton-auf-einer-nicht-quadratischen",children:"Beispiel 12.4.4"}),` gerechnet. Auf der nicht-konvexen
führt `,e.jsx(n,{children:"-2"})," in das ",e.jsx(i.em,{children:"lokale"})," Minimum bei ",e.jsx(n,{children:"-1"}),", ",e.jsx(n,{children:"2{,}5"})," in das globale bei ",e.jsx(n,{children:"2"}),`, und
`,e.jsx(n,{children:"0{,}5"})," landet in einem einzigen Schritt exakt auf dem lokalen Maximum bei ",e.jsx(n,{children:"0"}),` –
dort ist `,e.jsx(n,{children:"\\corange{f''} = -2{,}25"}),`, die Modellparabel öffnet nach unten, und ihr
Scheitel ist ein Hochpunkt. Am lehrreichsten ist `,e.jsx(n,{children:"\\cblue{x^{(0)}} = 1{,}2"}),`: Dort
ist `,e.jsx(n,{children:"\\corange{f''} = -0{,}08"}),` fast null, der erste Schritt springt nach
`,e.jsx(n,{children:"\\cred{-25{,}2}"}),", und ",e.jsx(n,{children:"14"})," Schritte später steht die Iteration im ",e.jsx(i.em,{children:"lokalen"}),`
Minimum bei `,e.jsx(n,{children:"-1"})," – obwohl der Startpunkt näher am globalen lag."]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.5 (Newton bei nicht-konvexen Funktionen)",id:"env-newton-bei-nicht-konvexen-funktionen",children:[e.jsxs(i.p,{children:["Was ",e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),` sucht, sind Nullstellen des Gradienten, nicht Minima. Bei einer
konvexen Funktion fällt das zusammen (`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`), sonst nicht.
Zwei Dinge können schiefgehen.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ein lokales Optimum statt des globalen."}),` Sichtbar wird das an einer Landschaft mit
mehreren Mulden; im Widget übernimmt das
`,e.jsx(n,{children:"\\cblue{f(x)} = x^4/4 - x^3/3 - x^2 + 2"})," mit den kritischen Punkten ",e.jsx(n,{children:"-1"}),", ",e.jsx(n,{children:"0"}),` und
`,e.jsx(n,{children:"2"}),". Bei ",e.jsx(n,{children:"-1"})," liegt ein lokales Minimum mit ",e.jsx(n,{children:"\\cblue{f(-1)} \\approx 1{,}583"}),", bei ",e.jsx(n,{children:"2"}),`
das globale mit `,e.jsx(n,{children:"\\cblue{f(2)} \\approx -0{,}667"}),`. Welches der beiden Täler die
Iteration findet, entscheidet allein der Startpunkt. Das ist keine Schwäche gerade
dieses Verfahrens, sondern der Preis dafür, dass alle Verfahren dieses Kapitels nur
lokale Information benutzen.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ein Sattelpunkt oder ein Maximum."})," Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),` indefinit, so
ist der Scheitel der Näherung ein Sattel, und ist sie negativ definit, ein Maximum.
Der Schritt läuft dann genauso zielstrebig dorthin, wie er sonst ins Minimum läuft
(`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),"). Im Widget genügt der Startpunkt ",e.jsx(n,{children:"\\cred{0{,}5}"}),`, um
das vorzuführen.`]}),e.jsxs(i.p,{children:[`Praktische Fassungen des Verfahrens sorgen deshalb zunächst für einen
Abstiegsschritt: Sie addieren ein Vielfaches der Einheitsmatrix, bis
`,e.jsx(n,{children:"\\corange{\\bH_f} + \\mu\\bI"}),` positiv definit ist, begrenzen die Schrittlänge
(Trust-Region) oder dämpfen den Schritt mit einer Liniensuche wie in
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`. Das hilft gegen Schritte zu Sattelpunkten oder Maxima
und verbessert die Konvergenz aus entfernten Startpunkten. Welches von mehreren
lokalen Minima gefunden wird, repariert es nicht; ein globales Optimum ist bei
nicht-konvexem `,e.jsx(n,{children:"f"}),` weiterhin nicht garantiert. Für sehr kleines Vertrauen in das
quadratische Modell geht die modifizierte Richtung in Richtung des negativen
Gradienten über.`]})]}),`
`,e.jsx(i.h3,{children:"Newton gegen Gradientenabstieg"}),`
`,e.jsx(i.p,{children:`Beide Verfahren lassen sich an einem Fall gegenüberstellen, der sich
vollständig im Kopf rechnen lässt.`}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.4.6 (Ein Zug statt vieler)",id:"env-ein-zug-statt-vieler",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"\\cblue{f(x)} = x^2"})," mit ",e.jsx(n,{children:"\\corange{f'(x)} = 2x"}),`,
`,e.jsx(n,{children:"\\corange{f''(x)} = 2"})," und Startwert ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Gradientenabstieg"})," mit ",e.jsx(n,{children:"\\corange{\\gamma} = 0{,}4"}),":"]}),e.jsx(_,{children:`\\begin{aligned}
\\cblue{x^{(1)}} &= 4 - 0{,}4 \\cdot 8 = 0{,}8 , \\\\
\\cblue{x^{(2)}} &= 0{,}8 - 0{,}4 \\cdot 1{,}6 = 0{,}16 , \\\\
\\cblue{x^{(3)}} &= 0{,}16 - 0{,}4 \\cdot 0{,}32 = 0{,}032 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Jeder Schritt multipliziert die Iterierte mit ",e.jsx(n,{children:"1 - 2\\corange{\\gamma} = 0{,}2"}),`. Das
ist lineare Konvergenz: Die Zahl der richtigen Stellen wächst um einen festen
Betrag pro Schritt, erreicht wird die Null nie.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Newton"}),":"]}),e.jsx(_,{children:"\\cblue{x^{(1)}} = 4 - \\frac{8}{2} = \\cgreen{0} ."}),e.jsxs(i.p,{children:[`Ein Schritt, und wir stehen exakt im Minimum. Auch das ist kein Zufall: Für eine
quadratische Funktion ist die Näherung `,e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"})," exakt (",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),`), der
Scheitel der Parabel `,e.jsx(i.em,{children:"ist"}),` der kritische Punkt der Funktion selbst. Ist die
Hesse-Matrix dabei positiv definit, so ist dieser Punkt das Minimum, und Newton löst
das Problem in einem Zug, gleichgültig, wo wir starten. Ist sie es nicht, so trifft
derselbe eine Schritt eben den Sattel oder das Maximum (`,e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),")."]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.7 (Warum Newton die Kondition nicht spürt)",id:"env-warum-newton-die-kondition-nicht-spuert",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),` hing die Konvergenzrate des Gradientenabstiegs an der
`,e.jsx(A,{id:"condition-number",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa(\\corange{\\bH_f})"}),`: Je länglicher das
Tal, desto langsamer. `,e.jsx(i.a,{href:"#env-ein-zug-statt-vieler",children:"Beispiel 12.4.6"}),` zeigt daneben eine Rechnung, in der die
Kondition gar nicht vorkommt. Der Grund ist, dass Newton die Krümmung nicht schätzt,
sondern benutzt: Sein Schritt ist gegen lineare Koordinatenwechsel unempfindlich,
und schlechte Kondition ist nichts anderes als ein ungünstig gewähltes
Koordinatensystem. Der Gradientenschritt hat diese Eigenschaft nicht.`]}),e.jsxs(i.p,{children:[`Gemeint ist damit die Zahl der Schritte, nicht die Rechnung darin. Numerisch bleibt
die Kondition sehr wohl spürbar: Das lineare System aus `,e.jsx(i.a,{href:"#env-was-der-schritt-voraussetzt-und-wie-wir",children:"Bemerkung 12.4.2"}),` wird mit
`,e.jsx(n,{children:"\\kappa(\\corange{\\bH_f})"}),` schlechter konditioniert, und der gelöste Schritt trägt
diesen Fehler weiter (`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),e.jsxs(i.p,{children:[`Bezahlt wird das an anderer Stelle. Ein Newton-Schritt braucht die
`,e.jsx(n,{children:"n(n+1)/2"})," zweiten Ableitungen, ihren Speicher der Größenordnung ",e.jsx(n,{children:"n^2"}),` und eine
Zerlegung der Größenordnung `,e.jsx(n,{children:"n^3"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`). Für
`,e.jsx(n,{children:"n = 10\\,000"}),` Parameter, in der Statistik keine ungewöhnliche Zahl, sind das
`,e.jsx(n,{children:"10^8"}),` Einträge allein für die Matrix. Der nächste Unterabschnitt handelt davon, wie
sich dieser Preis drücken lässt.`]})]}),`
`,e.jsxs($e,{title:"Warum sich der Koordinatenwechsel im Newton-Schritt herauskürzt",children:[e.jsxs(i.p,{children:["Rechnen wir in neuen Koordinaten ",e.jsx(n,{children:"\\bx = \\bA\\by"})," mit invertierbarem ",e.jsx(n,{children:"\\bA"}),`, so wird
aus dem Gradienten `,e.jsx(n,{children:"\\corange{\\nabla f}\\bA"}),` und aus der Hesse-Matrix
`,e.jsx(n,{children:"\\bA^\\top \\corange{\\bH_f} \\bA"}),". Im Newton-Schritt heben sich die Faktoren weg,"]}),e.jsx(_,{children:`-\\bigl(\\bA^\\top \\corange{\\bH_f} \\bA\\bigr)^{-1}\\bigl(\\corange{\\nabla f}\\bA\\bigr)^\\top
= -\\bA^{-1}\\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f^\\top} ,`}),e.jsxs(i.p,{children:[`und übrig bleibt genau das Bild des alten Schrittes. Beim Gradientenschritt
`,e.jsx(n,{children:`-\\gamma\\bigl(\\corange{\\nabla f}\\bA\\bigr)^\\top
= -\\gamma\\,\\bA^\\top\\corange{\\nabla f^\\top}`})," bleibt der Faktor ",e.jsx(n,{children:"\\bA^\\top"}),` dagegen
stehen, und genau er trägt die Kondition.`]})]}),`
`,e.jsx(i.h3,{children:"Quasi-Newton: die Krümmung schätzen statt rechnen"}),`
`,e.jsx(i.p,{children:`Newton ist schnell und teuer, der Gradientenabstieg billig und langsam. Die
Quasi-Newton-Verfahren sitzen dazwischen, und die Idee ist so einfach wie
naheliegend: Wir sammeln die Krümmungsinformation aus den Gradienten ein, die wir
ohnehin berechnen.`}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.4.8 (Quasi-Newton-Schritt)",id:"env-quasi-newton-schritt",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` stetig differenzierbar, ein Startpunkt
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"})," und eine Startmatrix ",e.jsx(n,{children:"\\corange{\\bB_0}"}),`, meist
`,e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ee,{tag:"12.4.3",id:"eq-quasi-newton-schritt",children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
- \\corange{\\gamma_k}\\,\\corange{\\bB_k}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\corange{\\bB_k} \\approx \\corange{\\bH_f(\\bx^{(k)})^{-1}}"}),` aus den bisherigen
Schritten geschätzt wird und die Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma_k}"}),` aus einer
Liniensuche stammt (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]})]}),`
`,e.jsxs(i.p,{children:["Die Schrittweite ",e.jsx(n,{children:"\\corange{\\gamma_k}"}),` gehört dabei zwingend dazu. Ohne sie ist der
erste Schritt aus `,e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),` ein ungebremster Gradientenschritt, und
der kann den Funktionswert erhöhen. Das Widget weiter unten führt genau das vor.`]}),`
`,e.jsxs(i.p,{children:["Der Unterschied zu ",e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),` ist die Matrix. Newton setzt dort die exakte inverse
Hesse-Matrix ein und zahlt jedes Mal `,e.jsx(A,{id:"big-o-notation",children:e.jsx(n,{children:"O(n^3)"})}),"; ",e.jsx(i.a,{href:"#eq-quasi-newton-schritt",children:"(12.4.3)"}),`
benutzt eine Näherung, die
schon da ist, und kostet nur noch eine Matrix-Vektor-Multiplikation. Wie diese
Näherung gebaut wird, unterscheidet die Verfahren der Familie: Häufig ist
`,e.jsx(n,{children:"\\corange{\\bB_k}"}),` eine Diagonalmatrix oder eine Einheitsmatrix plus eine Korrektur
kleinen Ranges, weil beides sich billig speichern und anwenden lässt.`]}),`
`,e.jsxs(i.p,{children:["Bleibt die Frage, woher ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` kommt. Fangen wir in einer Dimension an.
Dort ist die zweite Ableitung die Ableitung der ersten, und die schätzen wir wie
jede Ableitung durch einen Differenzenquotienten aus zwei benachbarten Werten:`]}),`
`,e.jsx(_,{children:`\\corange{f''(x)} \\approx
\\frac{\\corange{f'(x^{(k+1)})} - \\corange{f'(x^{(k)})}}{\\cblue{x^{(k+1)}} - \\cblue{x^{(k)}}} .`}),`
`,e.jsxs(i.p,{children:["Diese Forderung lässt sich in den ",e.jsx(n,{children:"\\R^n"})," übertragen. Mit den Abkürzungen"]}),`
`,e.jsx(_,{children:`\\cblue{\\bs_k} := \\cblue{\\bx^{(k+1)}} - \\cblue{\\bx^{(k)}} ,
\\qquad
\\corange{\\by_k} := \\bigl(\\corange{\\nabla f(\\bx^{(k+1)})} - \\corange{\\nabla f(\\bx^{(k)})}\\bigr)^\\top`}),`
`,e.jsxs(i.p,{children:["verlangen wir von der Näherung der ",e.jsx(i.em,{children:"inversen"})," Hesse-Matrix die"]}),`
`,e.jsx(ee,{tag:"12.4.4",id:"eq-eq-12-4-4",children:`\\text{Sekantenbedingung:} \\qquad
\\corange{\\bB_{k+1}}\\,\\corange{\\by_k} = \\cblue{\\bs_k} .`}),`
`,e.jsxs(i.p,{children:[`In einer Dimension ist das genau der Differenzenquotient von eben, nur auf den Kopf
gestellt: `,e.jsx(n,{children:"b = s/y"})," statt ",e.jsx(n,{children:"f'' \\approx y/s"}),`. Beide Gleichungen heißen
„Sekantenbedingung", und wer den Kehrwert überliest, hält `,e.jsx(n,{children:"\\corange{\\bB_k}"}),` für eine
Näherung der Hesse-Matrix statt ihrer Inversen. Im `,e.jsx(n,{children:"\\R^n"})," ist ",e.jsx(i.a,{href:"#eq-eq-12-4-4",children:"(12.4.4)"}),` ein System aus
`,e.jsx(n,{children:"n"})," Gleichungen für die ",e.jsx(n,{children:"n(n+1)/2"}),` Einträge einer symmetrischen Matrix, also weit
unterbestimmt. Die verbleibende Freiheit nutzen wir, um `,e.jsx(n,{children:"\\corange{\\bB_{k+1}}"}),`
möglichst wenig von `,e.jsx(n,{children:"\\corange{\\bB_k}"}),` abweichen zu lassen. Die bekannteste Wahl ist
diese:`]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.4.9 (BFGS-Update)",id:"env-bfgs-update",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\corange{\\bB_k} \\in \\R^{n \\times n}"}),` symmetrisch und gelte
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} \\neq 0"}),`. Mit
`,e.jsx(n,{children:"\\rho_k := 1 / \\bigl(\\corange{\\by_k}^\\top \\cblue{\\bs_k}\\bigr)"})," heißt"]}),e.jsx(ee,{tag:"12.4.5",id:"eq-bfgs-update",children:`\\corange{\\bB_{k+1}} = \\bigl(\\bI - \\rho_k\\, \\cblue{\\bs_k}\\corange{\\by_k}^\\top\\bigr)
\\corange{\\bB_k}
\\bigl(\\bI - \\rho_k\\, \\corange{\\by_k}\\cblue{\\bs_k}^\\top\\bigr)
+ \\rho_k\\, \\cblue{\\bs_k}\\cblue{\\bs_k}^\\top`}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"BFGS-Update"}),", benannt nach Broyden, Fletcher, Goldfarb und Shanno."]})]}),`
`,e.jsxs(i.p,{children:["Der Nenner von ",e.jsx(n,{children:"\\rho_k"}),` hat eine anschauliche Bedeutung. Auf einer Quadrik mit
Hesse-Matrix `,e.jsx(n,{children:"\\corange{\\bH}"})," ist ",e.jsx(n,{children:"\\corange{\\by_k} = \\corange{\\bH}\\cblue{\\bs_k}"}),", also"]}),`
`,e.jsx(_,{children:`\\frac{\\corange{\\by_k}^\\top \\cblue{\\bs_k}}{\\cblue{\\bs_k}^\\top \\cblue{\\bs_k}}
= \\frac{\\cblue{\\bs_k}^\\top \\corange{\\bH}\\, \\cblue{\\bs_k}}{\\cblue{\\bs_k}^\\top \\cblue{\\bs_k}} ,`}),`
`,e.jsxs(i.p,{children:["und das ist die Krümmung in Richtung ",e.jsx(n,{children:"\\cblue{\\bs_k}"}),`. Die Krümmungsbedingung
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} > 0"})," aus ",e.jsx(i.a,{href:"#env-eigenschaften-kosten-und-l-bfgs",children:"Bemerkung 12.4.11"}),` sagt damit schlicht:
Entlang des gerade gegangenen Schrittes ist `,e.jsx(n,{children:"\\cblue{f}"})," nach oben gekrümmt."]}),`
`,e.jsxs(i.p,{children:["Der Ausdruck ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),` sieht schlimmer aus, als er ist. Beide Klammern sind
Einheitsmatrizen plus eine Rang-1-Störung, der letzte Summand ist ebenfalls vom
Rang 1. Ausmultipliziert steht dort `,e.jsx(n,{children:"\\corange{\\bB_k}"}),` plus eine Korrektur, die von
`,e.jsx(n,{children:"\\cblue{\\bs_k}"})," und ",e.jsx(n,{children:"\\corange{\\bB_k\\by_k}"}),` aufgespannt wird und deshalb höchstens
Rang 2 hat. Dass die Formel tut, wozu sie gebaut wurde, rechnen wir in drei Zeilen
nach.`]}),`
`,e.jsx(y,{kind:"Satz",label:"12.4.10 (Das BFGS-Update erfüllt die Sekantenbedingung)",id:"env-das-bfgs-update-erfuellt-die",children:e.jsxs(i.p,{children:["Unter den Voraussetzungen von ",e.jsx(i.a,{href:"#env-bfgs-update",children:"Definition 12.4.9"}),` gilt
`,e.jsx(n,{children:"\\corange{\\bB_{k+1}}\\corange{\\by_k} = \\cblue{\\bs_k}"}),"."]})}),`
`,e.jsx($e,{title:"Beweis: Die BFGS-Aktualisierung erfüllt die Sekantenbedingung",children:e.jsxs(tn,{children:[e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cblue{\\bs}^\\top\\corange{\\by}"})," ist eine Zahl und darf vor den Vektor gezogen werden; nach Definition von ",e.jsx(n,{children:"\\rho"})," ist ",e.jsx(n,{children:"\\rho\\,(\\cblue{\\bs}^\\top\\corange{\\by}) = 1"})]}),children:[e.jsxs(i.p,{children:["Wir lassen die Indizes weg und multiplizieren ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),` von rechts mit
`,e.jsx(n,{children:"\\corange{\\by}"}),". Die rechte Klammer trifft dabei zuerst auf ",e.jsx(n,{children:"\\corange{\\by}"}),":"]}),e.jsx(_,{children:`\\bigl(\\bI - \\rho\\, \\corange{\\by}\\cblue{\\bs}^\\top\\bigr)\\corange{\\by}
= \\corange{\\by} - \\rho\\, \\corange{\\by}\\,\\bigl(\\cblue{\\bs}^\\top\\corange{\\by}\\bigr)
= \\corange{\\by} - \\corange{\\by} = \\bnull .`})]}),e.jsxs(ne,{why:e.jsx(e.Fragment,{children:"Matrixmultiplikation ist assoziativ, wir dürfen also von rechts nach links auswerten"}),children:[e.jsxs(i.p,{children:["Damit verschwindet der ganze erste Summand von ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),`, denn er hat diese Klammer
als rechten Faktor:`]}),e.jsx(_,{children:`\\bigl(\\bI - \\rho\\, \\cblue{\\bs}\\corange{\\by}^\\top\\bigr)\\corange{\\bB}
\\underbrace{\\bigl(\\bI - \\rho\\, \\corange{\\by}\\cblue{\\bs}^\\top\\bigr)\\corange{\\by}}_{= \\,\\bnull}
= \\bnull .`})]}),e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["wieder dieselbe Zahl ",e.jsx(n,{children:"\\rho\\,(\\cblue{\\bs}^\\top\\corange{\\by}) = 1"}),"; die Sekantenbedingung ",e.jsx(i.a,{href:"#eq-eq-12-4-4",children:"(12.4.4)"})," ist also nicht näherungsweise, sondern exakt erfüllt"]}),children:[e.jsx(i.p,{children:"Übrig bleibt der zweite Summand, und der liefert genau den gesuchten Vektor:"}),e.jsx(_,{children:`\\rho\\, \\cblue{\\bs}\\cblue{\\bs}^\\top\\corange{\\by}
= \\cblue{\\bs}\\,\\bigl(\\rho\\, \\cblue{\\bs}^\\top\\corange{\\by}\\bigr)
= \\cblue{\\bs} .`})]})]})}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.11 (Eigenschaften, Kosten und L-BFGS)",id:"env-eigenschaften-kosten-und-l-bfgs",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Symmetrie und Definitheit erben sich."})," Ist ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` symmetrisch, so ist es
`,e.jsx(n,{children:"\\corange{\\bB_{k+1}}"})," nach ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"})," auch. Ist ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` zusätzlich positiv
definit und gilt die Krümmungsbedingung
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} > 0"}),`, so bleibt auch die Definitheit erhalten.
Das ist wichtig, denn positiv definites `,e.jsx(n,{children:"\\corange{\\bB_k}"}),` garantiert
`,e.jsx(n,{children:"\\corange{\\nabla f}\\,\\corange{\\bB_k}\\corange{\\nabla f^\\top} > 0"}),` und damit, dass
`,e.jsx(n,{children:"-\\corange{\\bB_k}\\corange{\\nabla f(\\bx^{(k)})^\\top}"}),` bergab zeigt, und zwar für jeden
Gradienten, der auftreten kann. Erzwingen
lässt sich die Krümmungsbedingung durch eine Liniensuche, die neben dem
Abstiegskriterium aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),` auch eine Bedingung an die
Steigung im neuen Punkt stellt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kosten."}),` Ein Schritt besteht aus einer Matrix-Vektor-Multiplikation und zwei
Rang-1-Korrekturen, zusammen `,e.jsx(n,{children:"O(n^2)"})," statt ",e.jsx(n,{children:"O(n^3)"}),` bei Newton. Eine Zerlegung
fällt nie an, und zweite Ableitungen braucht das Verfahren gar nicht.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvergenz."})," Zwischen linear und quadratisch liegt ",e.jsx(i.em,{children:"superlinear"}),`: Der Quotient
`,e.jsx(n,{children:"e_{k+1}/e_k"})," geht gegen null, ohne dass ",e.jsx(n,{children:"e_{k+1}/e_k^2"}),` beschränkt bleiben müsste
(`,e.jsx(A,{id:"rate-of-convergence",children:"Konvergenzordnung"}),`). In der Praxis ist BFGS deutlich
schneller als der Gradientenabstieg und kaum langsamer als Newton.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"L-BFGS."})," Für großes ",e.jsx(n,{children:"n"})," ist schon das Speichern von ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` zu teuer. Die
Variante mit beschränktem Speicher (`,e.jsx(i.em,{children:"limited memory"}),`) merkt sich deshalb gar keine
Matrix, sondern nur die letzten `,e.jsx(n,{children:"m"})," Paare ",e.jsx(n,{children:"(\\cblue{\\bs_j}, \\corange{\\by_j})"}),`, meist
`,e.jsx(n,{children:"m"})," zwischen ",e.jsx(n,{children:"5"})," und ",e.jsx(n,{children:"20"}),`, und baut daraus bei Bedarf das Produkt
`,e.jsx(n,{children:"\\corange{\\bB_k}\\corange{\\nabla f^\\top}"}),` zusammen. Der Speicher fällt damit von
`,e.jsx(n,{children:"O(n^2)"})," auf ",e.jsx(n,{children:"O(mn)"}),". Bei ",e.jsx(n,{children:"n = 10\\,000"})," und ",e.jsx(n,{children:"m = 10"})," stehen ",e.jsx(n,{children:"10^8"}),` gespeicherte
Zahlen einigen Hunderttausend gegenüber, also drei Größenordnungen weniger.`]})]}),`
`,e.jsxs(ze,{title:"BFGS Schritt für Schritt",children:[e.jsxs(i.p,{children:[`Wir sehen dem Verfahren beim Lernen zu. Minimiert wird die Quadrik
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = 0{,}5\\,x_1^2 + 2{,}5\\,x_2^2"}),` mit der Hesse-Matrix
`,e.jsx(n,{children:"\\diag(1; 5)"}),", gestartet wird bei ",e.jsx(n,{children:"(5; 1)"})," mit ",e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),`. Über die
Krümmung weiß das Verfahren zu diesem Zeitpunkt nichts, der erste Schritt ist also
ein reiner Gradientenschritt.`]}),e.jsx(i.p,{children:`Die letzte Zeile des Ablesefelds prüft in jedem Schritt die Sekantenbedingung
nach. Offen bleibt, was die Schrittweite damit zu tun hat.`}),e.jsx(cs,{}),e.jsxs(i.p,{children:["Das Residuum ",e.jsx(n,{children:"\\left\\|\\corange{\\bB_k\\by} - \\cblue{\\bs}\\right\\|"}),` bleibt in jedem
Schritt auf Rundungsfehlerniveau, wie `,e.jsx(i.a,{href:"#env-das-bfgs-update-erfuellt-die",children:"Satz 12.4.10"}),` es
verspricht. Frei ist dagegen die Schrittweite, und daran hängt das Verhalten:
Lassen wir `,e.jsx(n,{children:"\\corange{\\gamma_k} = 1"}),` stehen, so ist der erste Schritt zu lang,
`,e.jsx(n,{children:"\\cblue{f}"})," steigt von ",e.jsx(n,{children:"15"})," auf ",e.jsx(n,{children:"40"}),", und ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` bleibt von
`,e.jsx(n,{children:"\\diag(1; 0{,}2)"})," sichtbar entfernt (nach sechs Schritten noch ",e.jsx(n,{children:"0{,}011"}),` in der
Frobeniusnorm). Mit dem Häkchen für die exakte Schrittweite liefert dagegen jeder
Schritt eine Sekantenbedingung für eine neue Richtung, und im `,e.jsx(n,{children:"\\R^2"}),` sind nach
zwei Schritten alle vergeben: Die Iterierte sitzt im Minimum und
`,e.jsx(n,{children:"\\corange{\\bB_2}"})," stimmt mit ",e.jsx(n,{children:"\\diag(1; 0{,}2)"}),` überein. Auf einer Quadrik im
`,e.jsx(n,{children:"\\R^n"})," ist BFGS mit exakter Liniensuche deshalb nach höchstens ",e.jsx(n,{children:"n"}),` Schritten
fertig.`]})]}),`
`,e.jsx(i.h3,{children:"Vier Verfahren nebeneinander"}),`
`,e.jsx(i.p,{children:`Damit sind die vier Verfahren beisammen, die für unbeschränkte Probleme zur
Wahl stehen. Nebeneinandergestellt:`}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Eigenschaft"}),e.jsx(i.th,{children:"Nelder-Mead"}),e.jsx(i.th,{children:"Gradientenabstieg"}),e.jsx(i.th,{children:"Quasi-Newton"}),e.jsx(i.th,{children:"Newton"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Ordnung"}),e.jsx(i.td,{children:"nullte"}),e.jsx(i.td,{children:"erste"}),e.jsx(i.td,{children:"dazwischen"}),e.jsx(i.td,{children:"zweite"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"braucht"}),e.jsxs(i.td,{children:["nur ",e.jsx(n,{children:"\\cblue{f}"})]}),e.jsx(i.td,{children:e.jsx(n,{children:"\\corange{\\nabla f}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\corange{\\nabla f}"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\corange{\\nabla f}"}),", ",e.jsx(n,{children:"\\corange{\\bH_f}"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"lineare Algebra je Schritt"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n^2)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n^3)"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Konvergenz"}),e.jsx(i.td,{children:"keine Garantie"}),e.jsx(i.td,{children:"linear"}),e.jsx(i.td,{children:"superlinear"}),e.jsx(i.td,{children:"lokal quadratisch"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schrittweite"}),e.jsx(i.td,{children:"automatisch"}),e.jsxs(i.td,{children:["kritisch (",e.jsx(n,{children:"\\corange{\\gamma}"}),")"]}),e.jsx(i.td,{children:"Liniensuche"}),e.jsx(i.td,{children:"automatisch"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Skalierbarkeit"}),e.jsxs(i.td,{children:["schlecht (",e.jsx(n,{children:"n \\lesssim 10"}),")"]}),e.jsx(i.td,{children:"sehr gut"}),e.jsx(i.td,{children:"gut"}),e.jsx(i.td,{children:"schlecht"})]})]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.12 (Wie die Tabelle zu lesen ist)",id:"env-wie-die-tabelle-zu-lesen-ist",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Aufwandsspalte zählt die lineare Algebra je Schritt"}),`, nicht die Funktions- und
Gradientenauswertungen. Die können ihrerseits teuer sein: Bei einem empirischen
Risiko über `,e.jsx(n,{children:"N"})," Beobachtungen kostet schon ein einziger Gradient ",e.jsx(n,{children:"O(N)"}),`, und genau
davon handelt der letzte Unterabschnitt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Konvergenzspalte ist asymptotisch und lokal."}),` Die quadratische Rate von Newton
gilt in der Nähe eines Minimums mit invertierbarer und lokal hinreichend glatter
Hesse-Matrix, die lineare Rate
des Gradientenabstiegs unter den Voraussetzungen aus
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),". Über das Verhalten weit vom Ziel sagt die Zeile nichts."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Drei der vier sind Fixpunktiterationen."}),` Gradientenabstieg, Quasi-Newton und Newton
haben dieselbe Bauform`]}),e.jsx(_,{children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\corange{\\bM_k}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} ,
\\qquad
\\corange{\\bM_k} \\in \\bigl\\{\\corange{\\gamma}\\bI,\\ \\corange{\\gamma_k}\\corange{\\bB_k},\\
\\corange{\\bH_f(\\bx^{(k)})^{-1}}\\bigr\\} ,`}),e.jsxs(i.p,{children:["sind also allesamt Fixpunktiterationen für ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),`
im Sinne von `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),". Die Wahl von ",e.jsx(n,{children:"\\corange{\\bM_k}"}),` ist genau
die Wahl zwischen Rechenzeit und Schrittqualität, dieselbe Abwägung wie bei den
Splitting-Verfahren in `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Wo sie eingesetzt werden."}),` Nelder-Mead ist der Notnagel ohne Ableitungen
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`), der
Gradientenabstieg die Grundlage der Optimierer für
`,e.jsx(A,{id:"neural-network",children:"neuronale Netze"}),`, BFGS der
Standardkompromiss für mittelgroße glatte Probleme, und Newton steckt in der
`,e.jsx(A,{id:"likelihood",children:"Likelihood"}),`-Inferenz: Das Fisher-Scoring für verallgemeinerte lineare Modelle ist ein
Newton-Verfahren mit erwarteter statt beobachteter Hesse-Matrix und läuft dort unter
dem Namen `,e.jsx(i.em,{children:"iterativ gewichtete kleinste Quadrate"})," (IWLS oder IRLS, ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-warum-statistik-und-ml-voll-davon-sind",children:"Bemerkung 10.8.13"}),`);
auch das Boosting-Verfahren XGBoost baut seine Bäume aus
Gradient und zweiter Ableitung. In `,e.jsx(i.code,{children:"R"})," bekommen wir BFGS mit ",e.jsx(i.code,{children:'method = "BFGS"'}),`;
die Voreinstellung von `,e.jsx(i.code,{children:"optim()"})," ist es nicht (",e.jsx(i.a,{href:"#sec-12.6",children:"Abschnitt 12.6"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Momentum: Schwung gegen den Zickzack"}),`
`,e.jsxs(i.p,{children:[`Zurück zum billigsten der Verfahren. Der Gradientenabstieg leidet an schlecht
konditionierten Problemen: In einem langen, schmalen Tal zeigt der negative Gradient
fast quer zur Talrichtung, die Iterierten pendeln zwischen den Hängen hin und her und
kommen der Länge nach kaum voran (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`). Große Schritte
verstärken das Pendeln, kleine machen den Fortschritt entlang des Tals noch
langsamer.`]}),`
`,e.jsx(i.p,{children:`Ein Bild aus der Mechanik hilft weiter. Eine Kugel, die den Hang
hinunterrollt, folgt nicht in jedem Augenblick der lokalen Falllinie, sondern
sammelt Schwung. Quer zum Tal wird sie von den Hängen abwechselnd nach links und
rechts geschubst, das mittelt sich weg; entlang des Tals ziehen alle Schubser in
dieselbe Richtung und addieren sich auf.`}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.4.13 (Gradientenabstieg mit Heavy-Ball-Momentum)",id:"env-gradientenabstieg-mit-heavy-ball",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` stetig differenzierbar, ein Startpunkt
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),", eine Schrittweite ",e.jsx(n,{children:"\\corange{\\gamma} > 0"}),` und ein
Momentumparameter `,e.jsx(n,{children:"\\alpha \\in [0, 1)"}),". Setze die ",e.jsx(i.em,{children:"Geschwindigkeit"}),`
`,e.jsx(n,{children:"\\bv^{(0)} = \\bnull"}),`, die im Folgenden die bisherigen Schritte aufsammelt, und für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})]}),e.jsx(ee,{tag:"12.4.6",id:"eq-gradientenabstieg-mit-heavy-ball",children:`\\begin{aligned}
\\bv^{(k+1)} &= \\alpha\\,\\bv^{(k)} - \\corange{\\gamma}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} , \\\\
\\cblue{\\bx^{(k+1)}} &= \\cblue{\\bx^{(k)}} + \\bv^{(k+1)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\alpha = 0"})," ist das der gewöhnliche Gradientenabstieg."]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.4.14 (Was der Schwung bewirkt)",id:"env-was-der-schwung-bewirkt",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Gleichgerichtete Gradienten summieren sich auf."}),` Bleibt der Gradient über mehrere
Schritte ungefähr gleich, so wird aus `,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),` eine geometrische Reihe, und die
Geschwindigkeit läuft gegen
`,e.jsx(n,{children:"\\bv \\to -\\corange{\\gamma}\\,\\corange{\\nabla f^\\top}/(1 - \\alpha)"}),`. Der effektive
Schritt in einer flachen, aber konsistenten Richtung ist also um den Faktor
`,e.jsx(n,{children:"1/(1-\\alpha)"}),` größer als beim reinen Gradientenabstieg; für den üblichen Wert
`,e.jsx(n,{children:"\\alpha = 0{,}9"})," ist das ein Faktor ",e.jsx(n,{children:"10"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Wechselnde Gradienten mitteln sich weg."}),` Kippt die Gradientenrichtung dagegen in
jedem Schritt, so heben sich die Beiträge in `,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),` weitgehend auf. Das ist die
Dämpfung des Zickzacks. Der gelegentlich zu lesende Name „Dämpfungsfaktor" für
`,e.jsx(n,{children:"\\alpha"}),` führt dabei leicht in die Irre: Gedämpft wird die Schwingung, nicht die
Bewegung, und in der mechanischen Analogie ist gerade `,e.jsx(n,{children:"1 - \\alpha"}),` die Reibung. Je
größer `,e.jsx(n,{children:"\\alpha"}),", desto weniger Reibung und desto mehr Gedächtnis."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Größere Schritte sind erlaubt."}),` Auf einer Quadrik mit Krümmungen zwischen
`,e.jsx(n,{children:"\\mu"})," und ",e.jsx(n,{children:"L"}),` konvergiert der Gradientenabstieg genau für
`,e.jsx(n,{children:"\\corange{\\gamma} L < 2"}),`; mit Momentum verschiebt sich die Grenze auf
`,e.jsx(n,{children:"\\corange{\\gamma} L < 2(1 + \\alpha)"}),". Bei ",e.jsx(n,{children:"\\alpha = 0{,}9"}),` dürfen die Schritte also
fast doppelt so lang sein.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Aber nicht jedes ",e.jsx(n,{children:"\\alpha"})," hilft."]}),` Für eine Quadrik lässt sich die beste Wahl
ausrechnen: Mit
`,e.jsx(n,{children:"\\alpha^\\star = \\bigl((\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)\\bigr)^2"}),` und
`,e.jsx(n,{children:"\\corange{\\gamma^\\star} = 4/(\\sqrt L + \\sqrt\\mu)^2"}),` fällt der Fehler pro Schritt auf
das `,e.jsx(n,{children:"(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)"}),`-fache statt auf das
`,e.jsx(n,{children:"(\\kappa - 1)/(\\kappa + 1)"}),"-fache. Statt ",e.jsx(n,{children:"\\kappa"})," steht dort also ",e.jsx(n,{children:"\\sqrt\\kappa"}),`, und
das ist bei `,e.jsx(n,{children:"\\kappa = 100"})," der Unterschied zwischen ",e.jsx(n,{children:"0{,}98"})," und ",e.jsx(n,{children:"0{,}82"}),` pro
Schritt. Der Standardwert `,e.jsx(n,{children:"0{,}9"})," passt zu ",e.jsx(n,{children:"\\kappa"})," in der Größenordnung ",e.jsx(n,{children:"10^3"}),`; bei
gut konditionierten Problemen ist er zu groß und macht das Verfahren `,e.jsx(i.em,{children:"langsamer"}),`
als den reinen Gradientenabstieg. Das Widget führt beides vor.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Und die Garantie gilt nicht überall."}),` Für Quadriken ist die Beschleunigung ein
Satz. Für allgemeine glatte, strikt konvexe Funktionen ist sie es nicht: Es gibt
Beispiele, auf denen Heavy-Ball mit den für Quadriken optimalen Parametern in einen
Zyklus läuft und gar nicht konvergiert. Die eng verwandte Variante von Nesterov
trägt dort eine bewiesene Schranke. Der Merksatz „bei strikt konvexen Funktionen
beschleunigt Momentum die Konvergenz deutlich" ist also eine Faustregel, kein
Theorem.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Verwandtschaft."}),` Adagrad, RMSprop und ADAM bauen auf derselben Beobachtung auf,
dass in der Vergangenheit der Gradienten Information steckt. Sie merken sich
zusätzlich, wie groß die bisherigen Gradienten typischerweise waren, und geben jeder
Koordinate daraus eine eigene Schrittweite; ADAM verbindet das mit dem Schwung aus
`,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),". Wir nennen sie hier nur; der Kurs ",e.jsx(i.em,{children:"Optimization for ML"}),` im Master geht
ihnen nach.`]})]}),`
`,e.jsxs(ze,{title:"Mit und ohne Schwung",children:[e.jsxs(i.p,{children:[`Beide Verfahren laufen auf derselben Quadrik
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = \\tfrac12(x_1^2 + c\\,x_2^2)"})," mit Konditionszahl ",e.jsx(n,{children:"\\kappa = c"}),`, blau
ohne und violett mit Momentum. Die Schrittweite geben wir als Vielfaches von `,e.jsx(n,{children:"1/L"}),`
an, damit die beiden Stabilitätsgrenzen `,e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"2(1+\\alpha)"}),` am Regler ablesbar
bleiben.`]}),e.jsxs(i.p,{children:[`Drei Voreinstellungen decken die Fallunterscheidung ab: gut, mittel und schlecht
konditioniert, jeweils mit dem Standardwert `,e.jsx(n,{children:"\\alpha = 0{,}9"}),"."]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Hilft der Standardwert ",e.jsx(n,{children:"\\alpha = 0{,}9"})," bei einer ",e.jsx(i.em,{children:"gut"})," konditionierten Quadrik, etwa ",e.jsx(n,{children:"\\kappa = 5"}),"?"]}),optionen:[{id:"ja",text:"ja, er spart Schritte"},{id:"nein",text:"nein, er kostet Schritte"},{id:"egal",text:"er ändert nichts"}],loesung:"nein",verdeckt:e.jsx(e.Fragment,{children:"Die Ablesezeile zählt beide Verfahren mit."}),children:e.jsx(xs,{})}),e.jsxs(i.p,{children:["Der Nutzen des Schwungs hängt allein an der Kondition. Bei ",e.jsx(n,{children:"\\kappa = 5"}),` dreht sich
das Ergebnis sogar um: `,e.jsx(n,{children:"106"})," Schritte mit gegen ",e.jsx(n,{children:"31"}),` ohne Momentum. Bei
`,e.jsx(n,{children:"\\kappa = 25"})," steht es ",e.jsx(n,{children:"103"})," zu ",e.jsx(n,{children:"161"}),", bei ",e.jsx(n,{children:"\\kappa = 100"})," dann ",e.jsx(n,{children:"121"})," zu ",e.jsx(n,{children:"608"}),` – je
schlechter die Kondition, desto größer der Gewinn. Und bei
`,e.jsx(n,{children:"\\corange{\\gamma} L = 2{,}5"}),` explodiert der blaue Weg, während der violette stabil
bleibt, denn seine Grenze liegt bei `,e.jsx(n,{children:"2 \\cdot 1{,}9 = 3{,}8"}),`. Der Standardwert
`,e.jsx(n,{children:"0{,}9"}),` stammt aus dem Deep Learning, wo die Konditionszahlen um Größenordnungen
höher liegen als hier.`]}),e.jsxs(i.p,{children:["Eine ",e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/gradient-descent-shiny/",children:"Shiny-App"}),` zeigt
Gradientenabstieg und Momentum auf weiteren Landschaften.`]})]}),`
`,e.jsx(i.h3,{children:"Stochastischer Gradientenabstieg"}),`
`,e.jsxs(i.p,{children:[`Bisher haben wir gefragt, wie viele Schritte ein Verfahren braucht. Jetzt fragen
wir, was ein einzelner Schritt kostet. In Statistik und maschinellem Lernen hat die
Zielfunktion fast immer dieselbe Bauform, nämlich einen Mittelwert über Daten. Wir
minimieren das `,e.jsx(i.em,{children:"empirische Risiko"})]}),`
`,e.jsx(ee,{tag:"12.4.7",id:"eq-eq-12-4-7",children:"\\cblue{R(\\btheta)} = \\frac{1}{N}\\sum_{i=1}^{N} L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr) ,"}),`
`,e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"L"})," den Fehler einer einzelnen Vorhersage misst und ",e.jsx(n,{children:"N"}),` die Zahl der
Beobachtungen ist. `,e.jsx(i.a,{href:"#env-optimierungsprobleme-in-statistik-und",children:"Beispiel 12.1.4"}),` hat diese Gestalt schon aufgestellt, und
`,e.jsx(i.a,{href:"#env-vier-konvexe-verlustfunktionen",children:"Beispiel 12.2.7"}),` rechnet mit dem Kleinste-Quadrate-Verlust und der negativen
Log-Likelihood zwei ihrer Vertreter durch. Auch der Kreuzentropie-Verlust gehört
dazu: Er ist die negative Log-Likelihood eines Bernoulli-Modells, also der Verlust
der logistischen Regression.`]}),`
`,e.jsx(i.p,{children:"Der Gradient erbt die Summe:"}),`
`,e.jsx(_,{children:`\\corange{\\nabla R(\\btheta)} = \\frac{1}{N}\\sum_{i=1}^{N}
\\corange{\\nabla L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr)} .`}),`
`,e.jsxs(i.p,{children:[`Ein einziger Gradientenschritt läuft also einmal durch den gesamten Datensatz. Bei
`,e.jsx(n,{children:"N"}),` in Millionenhöhe ist das der Flaschenhals, und zwar unabhängig davon, wie gut
die Schrittrichtung ist. Die Idee des `,e.jsx(i.em,{children:"stochastischen Gradientenabstiegs"}),` ist,
diesen Mittelwert durch einen `,e.jsx(A,{id:"unbiased-estimator",children:"unverzerrten Schätzer"}),` zu
ersetzen, statt ihn auszurechnen.`]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.4.15 (Der Gradient einer zufällig gezogenen Beobachtung ist unverzerrt)",id:"env-der-gradient-einer-zufaellig-gezogenen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\btheta"})," fest, der Datensatz fest, und sei ",e.jsx(n,{children:"i"}),` gleichverteilt auf
`,e.jsx(n,{children:"\\{1, \\dots, N\\}"})," gezogen. Dann gilt"]}),e.jsx(_,{children:`\\E\\Bigl[\\corange{\\nabla L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr)}\\Bigr]
= \\corange{\\nabla R(\\btheta)} .`})]}),`
`,e.jsx($e,{title:"Beweis der Unverzerrtheit",children:e.jsx(tn,{children:e.jsxs(ne,{why:e.jsxs(e.Fragment,{children:["Erwartungswert einer Funktion einer diskreten Zufallsvariablen; die ",e.jsx(n,{children:"y_j"})," und ",e.jsx(n,{children:"\\bx_j"})," sind hier Konstanten, zufällig ist nur, welche von ihnen wir erwischen"]}),children:[e.jsxs(i.p,{children:["Der Erwartungswert läuft allein über den Index ",e.jsx(n,{children:"i"}),", und der nimmt jeden der ",e.jsx(n,{children:"N"}),`
Werte mit Wahrscheinlichkeit `,e.jsx(n,{children:"1/N"})," an:"]}),e.jsx(_,{children:`\\E\\Bigl[\\corange{\\nabla L(y_i, p_\\btheta(\\bx_i))}\\Bigr]
= \\sum_{j=1}^{N} \\P(i = j)\\, \\corange{\\nabla L(y_j, p_\\btheta(\\bx_j))}
= \\frac{1}{N}\\sum_{j=1}^{N} \\corange{\\nabla L(y_j, p_\\btheta(\\bx_j))} ,`}),e.jsxs(i.p,{children:["und das ist ",e.jsx(n,{children:"\\corange{\\nabla R(\\btheta)}"}),"."]})]})})}),`
`,e.jsxs(i.p,{children:[`Der Beweis ist kurz, aber die Voraussetzung verdient Aufmerksamkeit. Kurz
hingeschrieben lautet die Aussage `,e.jsx(n,{children:`\\E[\\nabla L(y_i, p_\\btheta(\\bx_i))] =
\\nabla R(\\btheta)`}),`, und dann ist leicht zu übersehen, worüber gemittelt wird:
über den Zug des Index, nicht über die Verteilung der Daten. Deshalb ist die
Aussage auch keine Annahme über das Modell, sondern eine Konsequenz daraus, wie
wir ziehen: Wir bauen den unverzerrten Schätzer selbst.`]}),`
`,e.jsxs(y,{kind:"Algorithmus",label:"12.4.16 (Stochastischer Gradientenabstieg, SGD)",id:"env-stochastischer-gradientenabstieg-sgd",children:[e.jsxs(i.p,{children:["Gegeben seien das empirische Risiko ",e.jsx(i.a,{href:"#eq-eq-12-4-7",children:"(12.4.7)"}),`, ein Startwert
`,e.jsx(n,{children:"\\cblue{\\btheta^{(0)}}"})," und Schrittweiten ",e.jsx(n,{children:"\\corange{\\gamma^{(k)}} > 0"}),`. Für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["ziehe einen Index ",e.jsx(n,{children:"i_k"})," gleichverteilt aus ",e.jsx(n,{children:"\\{1, \\dots, N\\}"}),","]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"setze"}),`
`,e.jsx(ee,{tag:"12.4.8",id:"eq-stochastischer-gradientenabstieg-sgd",children:`\\cblue{\\btheta^{(k+1)}} = \\cblue{\\btheta^{(k)}}
- \\corange{\\gamma^{(k)}}\\,\\corange{\\nabla L\\bigl(y_{i_k}, p_{\\btheta^{(k)}}(\\bx_{i_k})\\bigr)^\\top} .`}),`
`]}),`
`]})]}),`
`,e.jsx($e,{title:"Mini-Batches, Lernraten und praktische Varianten",children:e.jsxs(y,{kind:"Bemerkung",label:"12.4.17 (Rauschen, Mini-Batches und Lernraten)",id:"env-rauschen-mini-batches-und-lernraten",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Preis und der Gewinn."})," Ein Schritt kostet jetzt ",e.jsx(n,{children:"O(1)"})," statt ",e.jsx(n,{children:"O(N)"}),`, und zwar
unabhängig von der Datenmenge. Dafür ist die Richtung nur im Mittel richtig. Die
Iterierten laufen nicht mehr glatt bergab, sondern zappeln; in der Nähe des Minimums
bleibt bei fester Schrittweite ein Rauschband, das nicht kleiner wird.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Mini-Batches."}),` In der Praxis ziehen wir nicht eine Beobachtung, sondern einen ganzen
Stapel von `,e.jsx(n,{children:"b"}),` Stück und mitteln deren Gradienten; an die Stelle des einzelnen
Summanden in `,e.jsx(i.a,{href:"#eq-stochastischer-gradientenabstieg-sgd",children:"(12.4.8)"})," tritt dann dieses Mittel. Die Stapelgröße nennen wir ",e.jsx(n,{children:"b"}),`,
weil `,e.jsx(n,{children:"n"}),` in diesem Abschnitt schon die Zahl der Parameter ist. Der Schätzer bleibt
unverzerrt, und bei unabhängigen
Ziehungen fällt seine Varianz auf den `,e.jsx(n,{children:"b"}),`-ten Teil, die Standardabweichung also auf
den `,e.jsx(n,{children:"\\sqrt b"}),`-ten. Das ist die entscheidende Buchführung: Der Aufwand wächst linear in
`,e.jsx(n,{children:"b"}),", die Genauigkeit nur mit ",e.jsx(n,{children:"\\sqrt b"}),". Ein Stapel von ",e.jsx(n,{children:"32"}),` statt einer einzelnen
Beobachtung kostet das `,e.jsx(n,{children:"32"}),`-fache und drückt das Rauschen nur um den Faktor
`,e.jsx(n,{children:"5{,}7"}),". Übliche Größen liegen zwischen ",e.jsx(n,{children:"32"})," und ",e.jsx(n,{children:"256"}),`, und diese Wahl folgt
weniger der Statistik als der Hardware, die viele gleichartige Rechnungen
gleichzeitig erledigt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lernraten."}),` Damit die Iterierten nicht im Rauschband hängenbleiben, lassen wir
`,e.jsx(n,{children:"\\corange{\\gamma^{(k)}}"}),` langsam fallen. Klassisch verlangen wir
`,e.jsx(n,{children:"\\sum_k \\corange{\\gamma^{(k)}} = \\infty"}),`, damit die Iteration überhaupt beliebig weit kommt,
und `,e.jsx(n,{children:"\\sum_k (\\corange{\\gamma^{(k)}})^2 < \\infty"}),`, damit sich das Rauschen
herausmittelt; `,e.jsx(n,{children:"\\corange{\\gamma^{(k)}} \\sim 1/k"}),` erfüllt beides. In der Praxis
kommen dazu Aufwärmphasen und stufenweise Absenkungen (`,e.jsx(i.em,{children:"learning rate schedules"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Und was wirklich passiert."}),` Statt unabhängig zu ziehen, mischen die gängigen
Implementierungen den Datensatz einmal pro Durchlauf und gehen ihn der Reihe nach
durch; `,e.jsx(i.a,{href:"#env-der-gradient-einer-zufaellig-gezogenen",children:"Satz 12.4.15"}),` gilt dann nur noch gemittelt
über alle Mischungen, praktisch funktioniert es aber besser.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum das wichtig ist."}),` SGD mit Mini-Batches und Momentum ist die Grundlage, auf
der sämtliche modernen neuronalen Netze trainiert werden. Der MSc-Kurs
`,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),` behandelt
ADAM, Muon und die Lernratenpläne im Detail.`]})]})}),`
`,e.jsxs(i.p,{children:[`Damit ist der Werkzeugkasten für unbeschränkte Probleme beisammen. Im nächsten
Abschnitt kommen Nebenbedingungen dazu, und mit ihnen ein Optimalitätsbegriff, der
mehr verlangt als einen verschwindenden Gradienten
(`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Newton-Schritt liefert stets ein lokales Minimum der Funktion."}),e.jsxs(i.p,{children:[`Er liefert einen kritischen Punkt der quadratischen Näherung, mehr nicht. Ist die
Hesse-Matrix indefinit, so ist das ein Sattel, ist sie negativ definit, ein Maximum.
Im Widget genügt der Startpunkt `,e.jsx(n,{children:"0{,}5"}),` auf der nicht-konvexen Funktion: Ein einziger
Schritt landet exakt auf dem lokalen Maximum bei `,e.jsx(n,{children:"0"}),`, weil dort ebenfalls
`,e.jsx(n,{children:"\\corange{f'} = 0"})," gilt (",e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Auf einer strikt konvexen quadratischen Funktion trifft Newton das Minimum in
einem Schritt, ganz gleich, wie schlecht konditioniert sie ist und wo wir starten.`}),e.jsxs(i.p,{children:["Für ein Polynom zweiten Grades ist die Näherung ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"}),` exakt. Ist seine
Hesse-Matrix positiv definit, ist der Scheitel das eindeutige Minimum selbst
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),"). ",e.jsx(i.a,{href:"#env-ein-zug-statt-vieler",children:"Beispiel 12.4.6"})," rechnet das vor: ",e.jsx(n,{children:"4 - 8/2 = 0"}),`. Bei
negativ definiter Hesse-Matrix träfe Newton stattdessen ein Maximum, bei
indefiniter einen Sattel, und bei singulärer wäre der angegebene Schritt nicht
definiert. Der Gradientenabstieg schafft den Treffer im Allgemeinen nicht, seine
Schrittzahl hängt an der Kondition. In einer Dimension gibt es allerdings eine
Ausnahme: Mit `,e.jsx(n,{children:"\\corange{\\gamma} = 1/\\corange{f''}"}),` trifft auch er sofort, und genau
diese Schrittweite ist der Newton-Schritt.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit BFGS funktioniert, muss ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` gegen die inverse Hesse-Matrix
konvergieren.`]}),e.jsxs(i.p,{children:["Muss es nicht. Im Widget steht nach sechs Schritten mit ",e.jsx(n,{children:"\\corange{\\gamma_k} = 1"}),`
eine Matrix, die `,e.jsx(n,{children:"\\diag(1; 0{,}2)"}),` nur nahekommt, und das Verfahren konvergiert
trotzdem. Gebraucht wird eine gute Richtung, nicht die richtige Matrix. Nur im
Sonderfall der Quadrik mit exakter Liniensuche wird die Näherung nach `,e.jsx(n,{children:"n"}),` Schritten
exakt.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:"Das BFGS-Update erfüllt die Sekantenbedingung nicht näherungsweise, sondern exakt."}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-das-bfgs-update-erfuellt-die",children:"Satz 12.4.10"}),`, und der Beweis braucht nur die Definition
`,e.jsx(n,{children:"\\rho_k = 1/(\\corange{\\by_k}^\\top\\cblue{\\bs_k})"}),": Die rechte Klammer in ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),`
schickt `,e.jsx(n,{children:"\\corange{\\by_k}"}),` auf null, der erste Summand fällt also weg, und der zweite
liefert genau `,e.jsx(n,{children:"\\cblue{\\bs_k}"}),". Näherungsweise ist die ",e.jsx(i.em,{children:"Sekantenbedingung selbst"}),`,
denn ein Differenzenquotient ist nicht die Ableitung.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Momentum mit ",e.jsx(n,{children:"\\alpha = 0{,}9"}),` ist immer mindestens so schnell wie der reine
Gradientenabstieg.`]}),e.jsxs(i.p,{children:[`Bei gut konditionierten Problemen schadet es. Im Widget braucht der Abstieg mit
`,e.jsx(n,{children:"\\alpha = 0{,}9"})," auf ",e.jsx(n,{children:"\\kappa = 5"})," ganze ",e.jsx(n,{children:"106"})," Schritte, ohne Momentum sind es ",e.jsx(n,{children:"31"}),`.
Rechnerisch optimal wäre dort `,e.jsx(n,{children:"\\alpha^\\star \\approx 0{,}15"}),". Der Wert ",e.jsx(n,{children:"0{,}9"}),` stammt
aus dem Deep Learning, wo die Konditionszahl um Größenordnungen höher liegt
(`,e.jsx(i.a,{href:"#env-was-der-schwung-bewirkt",children:"Bemerkung 12.4.14"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Mini-Batch aus ",e.jsx(n,{children:"32"})," Beobachtungen macht die Schätzung des Gradienten ",e.jsx(n,{children:"32"}),`-mal
genauer als eine einzelne Beobachtung.`]}),e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Varianz"}),` fällt auf ein Zweiunddreißigstel, die Standardabweichung also nur um
den Faktor `,e.jsx(n,{children:"\\sqrt{32} \\approx 5{,}7"}),`. Genau deshalb sind Mini-Batches ein Kompromiss
und keine Lösung: Der Aufwand wächst linear, die Genauigkeit mit der Wurzel.`]})]}),e.jsxs(Ri,{loesung:31,toleranz:5,einheit:"Schritte",children:[e.jsxs(i.p,{children:[`Wie viele Schritte braucht der reine Gradientenabstieg im Momentum-Widget bei
`,e.jsx(n,{children:"\\kappa = 5"})," und ",e.jsx(n,{children:"\\corange{\\gamma} L = 1"})," für einen Faktor ",e.jsx(n,{children:"10^{-6}"}),` im
Funktionswert?`]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"31"}),". Der Abstieg ",e.jsx(i.em,{children:"mit"})," Momentum (",e.jsx(n,{children:"\\alpha = 0{,}9"}),") braucht dafür ",e.jsx(n,{children:"106"}),`,
also mehr als dreimal so viele. Bei guter Kondition schadet der Schwung, weil die
Iterierten über das Tal hinausschießen; erst bei `,e.jsx(n,{children:"\\kappa = 100"}),` dreht sich das
Verhältnis auf `,e.jsx(n,{children:"121"})," gegen ",e.jsx(n,{children:"608"})," (",e.jsx(i.a,{href:"#env-was-der-schwung-bewirkt",children:"Bemerkung 12.4.14"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Die Unverzerrtheit des SGD-Gradienten folgt aus der Art, wie wir den Index ziehen,
und nicht aus einer Annahme über die Daten.`}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#env-der-gradient-einer-zufaellig-gezogenen",children:"Satz 12.4.15"}),` sind Datensatz und Parameter fest; zufällig ist einzig, welchen
Summanden von `,e.jsx(i.a,{href:"#eq-eq-12-4-7",children:"(12.4.7)"})," wir erwischen. Weil jeder Index Wahrscheinlichkeit ",e.jsx(n,{children:"1/N"}),`
hat, ist der Erwartungswert der Mittelwert aller Summanden, also der volle Gradient.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §6.5.3 behandelt das Newton-Verfahren für die unbeschränkte
Optimierung, §6.5.4 die Quasi-Newton-Verfahren im Überblick und §6.5.5 die
Sekanten-Updates samt BFGS; §5.6 zeigt die Newton-Verfahren für nichtlineare
Gleichungssysteme, aus denen sie hervorgehen. Zum stochastischen Gradientenabstieg und seinen Varianten führt der
MSc-Kurs `,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),`
weiter.`]})})]})}function gs(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Qr,{...r})}):Qr(r)}const Jr="#94a3b8",bs=K.violett,Yr=K.gruen,Fn=K.rot,Bn=K.orange,T=(r,i=2)=>Z(r,i),fn=-.8,ti=1.7,kr=ti-fn,De=320,nn=34,et=18,nt=12,le=r=>nn+(r-fn)/kr*De,ae=r=>De-(r-fn)/kr*De,it=r=>r/kr*De,ms=[.1,.25,.5,1,1.5,2,2.75],rt=[{key:"eq",knopf:"x + y = 1",formel:"g(x, y) = x + y − 1 = 0",nb:"g",grad:[1,1],mult:"λ",vz:1},{key:"ge",knopf:"x + y ≥ 1",formel:"h(x, y) = 1 − x − y ≤ 0",nb:"h",grad:[-1,-1],mult:"μ",vz:-1},{key:"le",knopf:"x + y ≤ 1",formel:"h(x, y) = x + y − 1 ≤ 0",nb:"h",grad:[1,1],mult:"μ",vz:1}];function js(){const[r,i]=F.useState(1.2),[t,h]=F.useState("eq"),l=B=>Math.round(B*20)/20,d=B=>Math.min(1.6,Math.max(-.6,B)),s=rt.find(B=>B.key===t),o=r,f=1-r,u=o*o+f*f,b=Math.sqrt(u),S=[2*o,2*f],x=s.grad,z=S[0]*x[1]-S[1]*x[0],R=S[0]-S[1],j=-S[0]/x[0],m=-S[1]/x[1],k=Math.abs(z)<1e-9,D=t==="le"?[0,0]:[.5,.5],[L,c]=F.useState({azimuth:42,elevation:26}),v=F.useMemo(()=>({f:(B,X)=>B*B+X*X,nx:28,ny:28,color:Jr,opacity:.72,wire:!0}),[]),W=F.useMemo(()=>{const B=[];for(let X=0;X<=60;X++){const $=-.6+2.2*X/60,a=1-$;B.push([$,a,$*$+a*a])}return[{pts:B,color:Fn,width:2.4,onTop:!0}]},[]),I=F.useMemo(()=>[{p:[o,f,o*o+f*f],color:Fn,r:4.5,onTop:!0},{p:[D[0],D[1],D[0]**2+D[1]**2],color:Yr,r:4.5,label:"x*",onTop:!0}],[o,f,D]),M=$i({feld:{x0:nn,y0:0,w:De,h:De},welt:{x0:fn,x1:ti,y0:fn,y1:ti},clamp:([B,X])=>{const $=l(d((B-X+1)/2));return[$,1-$]},greifPosition:()=>[r,1-r],onDrag:([B])=>i(B)}),g=.28,q=B=>[o+g*B[0],f+g*B[1]],U=q(S),C=q(x),P=t==="ge"?`${le(1.7)},${ae(-.7)} ${le(1.7)},${ae(1.7)} ${le(-.7)},${ae(1.7)}`:`${le(-.8)},${ae(-.8)} ${le(1.8)},${ae(-.8)} ${le(-.8)},${ae(1.8)}`,w=`∇${s.nb} = (${T(x[0])}; ${T(x[1])})`,E=`Die erste Stationaritätsgleichung verlangt ${s.mult} = ${T(j)}, die zweite ${s.mult} = ${T(m)}; das widerspricht sich.`,te=R>0?"nach links oben":"nach rechts unten",ue=`Die Richtungsableitung entlang der Geraden ist ${T(R)}, wir kommen also ${te} noch tiefer, und die Höhenlinie f = ${T(u)} schneidet die Gerade in zwei Punkten.`;let p;return t==="eq"?k?p=`Die beiden Pfeile decken sich: ∇f = (${T(S[0])}; ${T(S[1])}) ist ein Vielfaches von ${w}. Beide Stationaritätsgleichungen liefern denselben Multiplikator λ = ${T(j)}. Entlang der Geraden ändert sich f hier nicht mehr, die Richtungsableitung ist ${T(R)}. Die Höhenlinie f = ${T(u)} berührt die Gerade, statt sie zu kreuzen: das ist das Optimum. Das ist genau die notwendige Bedingung von ${O("satz:notwendige-bedingung-von-lagrange")}; das Vorzeichen von λ ist bei einer Gleichungsnebenbedingung frei.`:p=`∇f = (${T(S[0])}; ${T(S[1])}) und ${w} zeigen in verschiedene Richtungen; das Kreuzprodukt beträgt ${T(z)}. ${E} Hier kann also kein Optimum liegen. ${ue}`:t==="ge"?k?p=`Zulässig ist die rote Halbebene x + y ≥ 1, das unbeschränkte Minimum (0; 0) liegt außerhalb. Hier stimmen beide Stationaritätsgleichungen überein und liefern μ = ${T(j)} > 0, und wegen h(${T(o)}; ${T(f)}) = 0 ist auch die Komplementarität erfüllt. Alle vier Bedingungen von ${O("satz:karush-kuhn-tucker-bedingungen")} sind damit erfüllt, die Ungleichung ist aktiv, sie bindet: ∇f = (${T(S[0])}; ${T(S[1])}) und ${w} zeigen in entgegengesetzte Richtungen, und diese Gegenläufigkeit ist es, die μ positiv macht.`:p=`Zulässig ist die rote Halbebene x + y ≥ 1. ${E} Hier kann also kein Optimum liegen. ${ue} Im Punkt (0,50; 0,50) werden sich beide auf μ = 1 einigen, und weil das positiv ist, darf die Ungleichung dort binden.`:p=`Jetzt zeigt die Ungleichung in die andere Richtung, zulässig ist die rote Halbebene x + y ≤ 1. ${k?`Im einzigen Punkt der Geraden, in dem sich die beiden Stationaritätsgleichungen einigen, fordern sie μ = ${T(j)} < 0.`:`${E} Und selbst dort, wo sie sich einigen, nämlich in (0,50; 0,50), fordern sie μ = −1 < 0.`} Die duale Zulässigkeit aus ${O("satz:karush-kuhn-tucker-bedingungen")} verbietet das: Kein Randpunkt ist ein KKT-Punkt. Stattdessen gewinnt das unbeschränkte Minimum x* = (0; 0) mit f* = 0. Dort ist h(0; 0) = −1 < 0, die Ungleichung ist inaktiv, die Komplementarität μ·h = 0 erzwingt μ = 0, und die Stationarität wird trivial erfüllt, weil ∇f(0; 0) = (0; 0) ist.`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(Se,{children:"Ziehen wir den Punkt entlang der roten Geraden, bis sich die beiden orangen Pfeile decken."}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Grau die Höhenlinien von f(x, y) = x² + y², violett die gerade erreichte, rot die Nebenbedingung. Orange die beiden Gradienten: ∇f durchgezogen, der Gradient der Nebenbedingung gestrichelt. Die drei Knöpfe wechseln zwischen Gleichung und den beiden Ungleichungen; die Ablesetafel wechselt mit."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[rt.map(B=>e.jsx("button",{type:"button","aria-pressed":t===B.key,className:t===B.key?Re:Ne,onClick:()=>h(B.key),children:B.knopf},B.key)),e.jsx("button",{type:"button",className:Ne,onClick:()=>i(.5),children:t==="le"?"zum Berührpunkt (0,5; 0,5)":"zum Optimum"})]}),e.jsx(re,{label:"x (auf der Geraden)",value:r,onChange:B=>i(l(d(B))),min:-.6,max:1.6,step:.05,fmt:B=>T(B)}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:nn},children:"y ↑"}),e.jsxs("svg",{viewBox:`0 0 ${nn+De+nt} ${De+et}`,width:nn+De+nt,height:De+et,role:"img","aria-label":`Höhenlinien von f mit der Nebenbedingung und den beiden Gradientenpfeilen im Punkt (${T(o)}; ${T(f)}); ${k?"die Pfeile sind parallel":"die Pfeile sind nicht parallel"}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",...M.svgProps,children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s135l-clip",children:e.jsx("rect",{x:nn,y:0,width:De,height:De})}),e.jsx("marker",{id:"s135l-pf",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Bn})}),e.jsx("marker",{id:"s135l-pg",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Bn,opacity:.6})})]}),[-.5,0,.5,1,1.5].map(B=>e.jsxs("g",{children:[e.jsx("text",{x:nn-5,y:ae(B)+3,textAnchor:"end",fill:"#64748b",fontSize:10,children:T(B,1)}),e.jsx("text",{x:le(B),y:De+13,textAnchor:"middle",fill:"#64748b",fontSize:10,children:T(B,1)})]},`t${B}`)),e.jsxs("g",{clipPath:"url(#s135l-clip)",children:[t!=="eq"&&e.jsx("polygon",{points:P,fill:Fn,opacity:.08}),e.jsx("line",{x1:le(fn),y1:ae(0),x2:le(ti),y2:ae(0),stroke:"#cbd5e1",strokeWidth:1}),e.jsx("line",{x1:le(0),y1:ae(fn),x2:le(0),y2:ae(ti),stroke:"#cbd5e1",strokeWidth:1}),ms.map(B=>e.jsx("circle",{cx:le(0),cy:ae(0),r:it(Math.sqrt(B)),fill:"none",stroke:Jr,strokeWidth:1,opacity:.7},`n${B}`)),e.jsx("circle",{cx:le(0),cy:ae(0),r:it(b),fill:"none",stroke:bs,strokeWidth:2.2}),e.jsx("line",{x1:le(-.7),y1:ae(1.7),x2:le(1.7),y2:ae(-.7),stroke:Fn,strokeWidth:2.4}),e.jsx("line",{x1:le(o),y1:ae(f),x2:le(C[0]),y2:ae(C[1]),stroke:Bn,strokeWidth:3.4,strokeDasharray:"6 4",opacity:.6,markerEnd:"url(#s135l-pg)"}),e.jsx("line",{x1:le(o),y1:ae(f),x2:le(U[0]),y2:ae(U[1]),stroke:Bn,strokeWidth:1.8,markerEnd:"url(#s135l-pf)"}),e.jsx("circle",{cx:le(D[0]),cy:ae(D[1]),r:8,fill:"none",stroke:Yr,strokeWidth:2.4}),e.jsx(Gi,{x:le(o),y:ae(f),farbe:Fn,r:5,aktiv:M.dragging==="p",...M.handleProps("p")})]}),e.jsx("text",{x:le(1.34),y:ae(-.55),textAnchor:"middle",fill:Fn,fontSize:11,children:"x + y = 1"})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:nn},children:"x →"})]}),e.jsxs("div",{className:"min-w-0 max-w-full",children:[e.jsx(br,{size:280,xDomain:[-.8,1.7],yDomain:[-.8,1.7],surface:v,curves:W,points:I,labels:{x:"x",y:"y",z:"f"},azimuth:L.azimuth,elevation:L.elevation,onViewChange:c,ariaLabel:"Die Paraboloidfläche f(x, y) = x² + y² mit der auf sie gehobenen Nebenbedingung als roter Kurve."}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:L,onChange:c})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche. Die rote Kurve ist die Nebenbedingung, auf die Fläche gehoben; das beschränkte Problem ist die Suche nach ihrem tiefsten Punkt. Rot derselbe Punkt wie links, grün dasselbe Optimum."})]}),e.jsxs("div",{className:"max-w-sm space-y-2 text-sm",children:[e.jsx("table",{className:"text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"Punkt auf der Geraden"}),e.jsxs("td",{className:"font-mono",children:["(",T(o),"; ",T(f),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"f(x, y)"}),e.jsx("td",{className:"font-mono",children:T(u)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",style:{color:Bn},children:"∇f"}),e.jsxs("td",{className:"font-mono",children:["(",T(S[0]),"; ",T(S[1]),")"]})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",style:{color:Bn},children:["∇",s.nb]}),e.jsxs("td",{className:"font-mono",children:["(",T(x[0]),"; ",T(x[1]),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"∇f entlang (1; −1)"}),e.jsx("td",{className:"font-mono",children:T(R)})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",children:[s.mult," aus 2x ",s.vz>0?"+":"−"," ",s.mult," = 0"]}),e.jsx("td",{className:"font-mono",children:T(j)})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",children:[s.mult," aus 2y ",s.vz>0?"+":"−"," ",s.mult," = 0"]}),e.jsx("td",{className:"font-mono",children:T(m)})]})]})}),e.jsxs("p",{className:"text-xs text-slate-600 dark:text-slate-300",children:["Nebenbedingung: ",s.formel]})]})]}),e.jsx(ye,{kind:k?"ok":"neutral",titel:k?"die Pfeile sind parallel":"die Pfeile sind nicht parallel",children:p})]})}const Fe=[[2,.6],[.6,1]],ve=[1.6,.9],fs="#94a3b8",nr=K.violett,ks=K.gruen,si=K.rot,tt=1.342857,ps=1.835756,ws=2.5,vs=r=>{const i=[r[0]-ve[0],r[1]-ve[1]];return i[0]*(Fe[0][0]*i[0]+Fe[0][1]*i[1])+i[1]*(Fe[1][0]*i[0]+Fe[1][1]*i[1])},we=(r,i=2)=>Z(r,i);function zs(r,i){const t=[];for(let l=0;l<4e3;l++)if(r==="kreis"){const d=2*Math.PI*l/4e3;t.push([i*Math.cos(d),i*Math.sin(d)])}else{const d=4*l/4e3;d<1?t.push([i*(1-d),i*d]):d<2?t.push([-i*(d-1),i*(2-d)]):d<3?t.push([-i*(3-d),-i*(d-2)]):t.push([i*(d-3),-i*(4-d)])}return t}function gr(r,i){if((r==="kreis"?Math.hypot(ve[0],ve[1]):Math.abs(ve[0])+Math.abs(ve[1]))<=i)return{p:[ve[0],ve[1]],f:0,aktiv:!1};let h=null;for(const d of zs(r,i)){const s=vs(d);(!h||s<h.f)&&(h={p:d,f:s})}return{...h,aktiv:!0}}function Ss(r,i,t){const h=Fe[0][0]+Fe[1][1],l=Fe[0][0]*Fe[1][1]-Fe[0][1]*Fe[1][0],d=h/2+Math.sqrt(h*h/4-l),s=h/2-Math.sqrt(h*h/4-l),o=Math.atan2(d-Fe[0][0],Fe[0][1]),f=Math.sqrt(r/d),u=Math.sqrt(r/s);let b="";for(let S=0;S<=120;S++){const x=2*Math.PI*S/120,z=f*Math.cos(x),R=u*Math.sin(x),j=ve[0]+z*Math.cos(o)-R*Math.sin(o),m=ve[1]+z*Math.sin(o)+R*Math.cos(o);b+=(S===0?"M ":"L ")+i(j)+" "+t(m)+" "}return b+"Z"}function st({art:r,c:i,titel:t}){const l=u=>Math.round((u+1.6)/3.6*260*100)/100,d=u=>Math.round((1-(u+1.6)/3.6)*260*100)/100,s=F.useMemo(()=>gr(r,i),[r,i]),o=r==="raute"&&s.aktiv&&(Math.abs(s.p[0])<1e-9&&Math.abs(Math.abs(s.p[1])-i)<1e-9||Math.abs(s.p[1])<1e-9&&Math.abs(Math.abs(s.p[0])-i)<1e-9),f=r==="kreis"?e.jsx("circle",{cx:l(0),cy:d(0),r:i/3.6*260,fill:si,opacity:.14,stroke:si,strokeWidth:1.5}):e.jsx("polygon",{points:[[i,0],[0,i],[-i,0],[0,-i]].map(([u,b])=>`${l(u)},${d(b)}`).join(" "),fill:si,opacity:.14,stroke:si,strokeWidth:1.5});return e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-center text-sm font-medium",children:t}),e.jsxs("svg",{viewBox:"0 0 260 260",width:260,height:260,role:"img","aria-label":`${t}: KQ-Höhenlinien über dem zulässigen Bereich, die Lösung liegt bei (${we(s.p[0])}; ${we(s.p[1])}).`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:l(-1.6),y1:d(0),x2:l(2),y2:d(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:l(0),y1:d(-1.6),x2:l(0),y2:d(2),stroke:"#cbd5e1"}),[.35,s.f>.05?s.f:.9,3.2].map((u,b)=>e.jsx("path",{d:Ss(u,l,d),fill:"none",stroke:b===1&&s.f>.05?nr:fs,strokeWidth:b===1&&s.f>.05?2:1,opacity:b===1&&s.f>.05?.9:.7},b)),f,e.jsx("circle",{cx:l(ve[0]),cy:d(ve[1]),r:3.5,fill:nr}),e.jsx("text",{x:l(ve[0])+6,y:d(ve[1])-5,fontSize:11,fill:nr,children:"KQ"}),e.jsx("circle",{cx:l(s.p[0]),cy:d(s.p[1]),r:5,fill:ks})]}),e.jsxs("p",{className:"mt-1 text-center font-mono text-xs",children:["β̂ = (",we(s.p[0]),"; ",we(s.p[1]),")",o?" · Ecke!":"",s.aktiv?"":" · NB inaktiv, μ = 0"]})]})}function ys(){const[r,i]=F.useState(1),t=F.useMemo(()=>gr("kreis",r),[r]),h=F.useMemo(()=>gr("raute",r),[r]),l=r<=1.3+1e-9;let d,s,o;return l?(d="ok",s="Lasso sitzt in der Ecke",o=`Bei r = ${we(r)} liegt die Lasso-Lösung exakt auf (${we(r)}; 0): β₂ ist nicht klein, sondern null. Die Ridge-Lösung (${we(t.p[0])}; ${we(t.p[1])}) hat dagegen zwei von null verschiedene Koeffizienten. Der Unterschied steckt allein in der Form des zulässigen Bereichs: Die Raute hat Ecken auf den Achsen, der Kreis nicht. Die Ecke bleibt optimal bis r = ${we(tt,4)}.`):h.aktiv?(d="neutral",s="beide Lösungen liegen auf dem Rand",o=`Über der Eckenschwelle ${we(tt,4)} rutscht die Lasso-Lösung von der Ecke auf eine Kante der Raute: (${we(h.p[0])}; ${we(h.p[1])}) statt (r; 0). Beide Nebenbedingungen binden noch, beide Multiplikatoren sind nach ${O("satz:karush-kuhn-tucker-bedingungen")} positiv, und die Höhenlinie berührt in beiden Tafeln den Rand. Der Sparsamkeitseffekt des Lasso ist damit weg.`):(d="warn",s="die Nebenbedingung ist inaktiv",o=`Der Radius lässt den KQ-Schätzer selbst zu. Damit ist das Budget kein Zwang mehr: Die Lösung ist der KQ-Punkt, die Komplementarität aus ${O("satz:karush-kuhn-tucker-bedingungen")} erzwingt μ = 0, und die Schätzung wird nicht mehr geschrumpft. Die Schwellen liegen bei ‖β̂‖₂ = ${we(ps,4)} für Ridge und ‖β̂‖₁ = ${we(ws,4)} für Lasso.`),e.jsxs("div",{className:"my-2 space-y-3",children:[e.jsx(Se,{children:"Schieben wir das Budget nach unten und achten auf β₂ in der rechten Tafel: Wann wird es exakt null?"}),e.jsxs("div",{className:"flex flex-wrap gap-5",children:[e.jsx(st,{art:"kreis",c:r,titel:"Ridge: ‖β‖₂ ≤ r"}),e.jsx(st,{art:"raute",c:r,titel:"Lasso: |β₁| + |β₂| ≤ r"})]}),e.jsx(re,{label:"Radius r",value:r,onChange:i,min:.4,max:2.6,step:.05,accent:si}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:'Beide Tafeln zeigen dieselben KQ-Höhenlinien (grau, Minimum im violetten Punkt „KQ") über ihrem zulässigen Bereich (rot). Violett hervorgehoben ist die niedrigste erreichbare Höhenlinie, der grüne Punkt darauf ist die beschränkte Lösung. Der Regler steuert den Radius r beider Mengen; beim quadrierten Ridge-Budget des Textes ist also c = r².'}),e.jsx(ye,{kind:d,titel:s,children:o})]})}function lt(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die Verfahren der Abschnitte ",e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"})," haben ",e.jsx(n,{children:"f"}),`
auf ganz `,e.jsx(n,{children:"\\R^n"}),` minimiert. Oft ist aber nicht jeder Punkt
erlaubt: Wahrscheinlichkeiten müssen nichtnegativ sein und sich zu `,e.jsx(n,{children:"1"}),`
summieren, ein Budget hat eine Obergrenze, Erhaltungsgrößen der Physik stehen
nicht zur Disposition. Solche Einschränkungen formulieren wir als Gleichungen
und Ungleichungen an `,e.jsx(n,{children:"\\bx"}),"."]}),`
`,e.jsxs(y,{kind:"Definition",label:"12.5.1 (Beschränktes Optimierungsproblem)",id:"env-beschraenktes-optimierungsproblem",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-unbeschraenktes-und-beschraenktes",children:"Definition 12.1.2"})," in ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"})," hat das ",e.jsx(i.em,{children:`beschränkte
Optimierungsproblem`}),` (constrained optimization) schon eingeführt. Wir
schreiben es jetzt in der Form aus, mit der wir rechnen werden:`]}),e.jsx(_,{children:`\\begin{aligned}
\\min_{\\bx} \\quad & f(\\bx) && \\text{(Zielfunktion)} \\\\
\\text{unter} \\quad & \\cred{g_i(\\bx)} = 0, \\quad i = 1, \\dots, m && \\text{(Gleichungen)} \\\\
& \\cred{h_j(\\bx)} \\le 0, \\quad j = 1, \\dots, p && \\text{(Ungleichungen)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die Menge ",e.jsx(n,{children:"\\cred{S}"}),` aller Punkte, die sämtliche Nebenbedingungen erfüllen,
heißt `,e.jsx(i.em,{children:"zulässiger Bereich"})," (feasible set)."]})]}),`
`,e.jsx(y,{kind:"Bemerkung",label:"12.5.2 (Das Optimum liegt oft auf der Nebenbedingung)",id:"env-das-optimum-liegt-oft-auf-der",children:e.jsxs(i.p,{children:["Minimieren wir etwa ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"}),` unter der Gleichungsnebenbedingung
`,e.jsx(n,{children:"\\cred{g(x, y)} = x + y - 1 = 0"}),`, so ist das unbeschränkte Minimum
`,e.jsx(n,{children:"(0, 0)"}),` nicht zulässig. Das beschränkte Optimum muss auf der Geraden
`,e.jsx(n,{children:"x + y = 1"}),` liegen, und zwar dort, wo die Gerade die niedrigste
`,e.jsx(A,{id:"level-sets",children:"Höhenlinie"})," von ",e.jsx(n,{children:"f"}),` berührt. Dieses Berührbild trägt das
ganze folgende Verfahren.`]})}),`
`,e.jsx(i.h3,{children:"Die Idee der Lagrange-Multiplikatoren"}),`
`,e.jsxs(i.p,{children:["Dürfen wir uns nur entlang der Kurve ",e.jsx(n,{children:"\\cred{g(\\bx)} = 0"}),` bewegen, dann zählt
am Optimum nur noch die Richtung entlang der Kurve: Gäbe es dort eine
Richtung mit Steigung nach unten, könnten wir den Zielwert weiter senken.
Am Optimum `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," hat ",e.jsx(n,{children:"f"}),` also entlang der Nebenbedingung keine
Steigung mehr. Das heißt geometrisch:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)}"}),` steht senkrecht auf der Tangente der
Nebenbedingungskurve,`]}),`
`,e.jsxs(i.li,{children:["und weil auch ",e.jsx(n,{children:"\\corange{\\nabla g(\\bx^\\star)}"}),` senkrecht auf dieser Tangente
steht (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`: der Gradient steht
senkrecht auf den Höhenlinien), sind die beiden Gradienten `,e.jsx(i.em,{children:"parallel"}),":"]}),`
`]}),`
`,e.jsx(_,{children:`\\exists\\, \\lambda \\in \\R \\colon \\quad
\\corange{\\nabla f(\\bx^\\star)} + \\lambda\\, \\corange{\\nabla g(\\bx^\\star)} = \\bnull^\\top .`}),`
`,e.jsx(y,{kind:"Bemerkung",label:"12.5.3 (Auch null ist ein zulässiger Multiplikator)",id:"env-auch-null-ist-ein-zulaessiger",children:e.jsxs(i.p,{children:["Verlockend wäre, an dieser Stelle ",e.jsx(n,{children:"\\lambda \\in \\R \\setminus \\{0\\}"}),` zu verlangen.
Das stimmt aber nicht. Liegt das unbeschränkte Minimum zufällig auf der
Nebenbedingung, dann ist dort schon `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),`,
und die Bedingung gilt mit `,e.jsx(n,{children:"\\lambda = 0"}),`. Der Multiplikator darf also jeden
reellen Wert annehmen; sein Vorzeichen ist bei Gleichungsnebenbedingungen
frei, wie gleich `,e.jsx(i.a,{href:"#env-minimieren-auf-einer-geraden",children:"Beispiel 12.5.6"}),` zeigt. Damit die Parallelitätsbedingung das
Optimum wirklich erfasst, brauchen wir außerdem
`,e.jsx(n,{children:"\\corange{\\nabla g(\\bx^\\star)} \\neq \\bnull^\\top"}),`, sonst legt die
Nebenbedingung ihre Tangente nicht fest.`]})}),`
`,e.jsxs(y,{kind:"Definition",label:"12.5.4 (Lagrange-Funktion)",id:"env-lagrange-funktion",children:[e.jsxs(i.p,{children:["Für das Problem ",e.jsx(n,{children:"\\min f(\\bx)"})," unter ",e.jsx(n,{children:"\\cred{\\bg(\\bx)} = \\bnull"}),` mit
`,e.jsx(n,{children:"\\bg(\\bx) = (g_1(\\bx), \\dots, g_m(\\bx))^\\top"})," heißt"]}),e.jsx(_,{children:`\\Lcal(\\bx, \\blambda) = f(\\bx) + \\blambda^\\top \\cred{\\bg(\\bx)},
\\qquad \\blambda = (\\lambda_1, \\dots, \\lambda_m)^\\top \\in \\R^m,`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lagrange-Funktion"}),"; die ",e.jsx(n,{children:"\\lambda_i"})," heißen ",e.jsx(i.em,{children:"Lagrange-Multiplikatoren"}),"."]})]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.5.5 (Notwendige Bedingung von Lagrange)",id:"env-notwendige-bedingung-von-lagrange",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"f"})," und ",e.jsx(n,{children:"\\cred{\\bg}"}),` stetig differenzierbar und sei
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"}),` unter
`,e.jsx(n,{children:"\\cred{\\bg(\\bx)} = \\bnull"}),`. Sind die Gradienten
`,e.jsx(n,{children:"\\corange{\\nabla g_1(\\bx^\\star)}, \\dots, \\corange{\\nabla g_m(\\bx^\\star)}"}),`
linear unabhängig, so existiert ein `,e.jsx(n,{children:"\\blambda^\\star \\in \\R^m"})," mit"]}),e.jsx(_,{children:`\\nabla_{\\bx} \\Lcal(\\bx^\\star, \\blambda^\\star) = \\bnull^\\top
\\qquad \\text{und} \\qquad
\\cred{\\bg(\\bx^\\star)} = \\bnull .`})]}),`
`,e.jsxs(i.p,{children:[`Die erste Gleichung ist die Parallelitätsbedingung von oben, für alle
`,e.jsx(n,{children:"m"}),` Nebenbedingungen gleichzeitig; die zweite ist die Zulässigkeit. Statt
eines Minimierungsproblems mit Zwang lösen wir also ein Gleichungssystem in
den `,e.jsx(n,{children:"n + m"})," Unbekannten ",e.jsx(n,{children:"(\\bx, \\blambda)"}),`, und dafür haben wir die Verfahren
aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),"."]}),`
`,e.jsxs(i.p,{children:[`Die Unabhängigkeitsbedingung an die Gradienten ist keine Formsache.
Minimieren wir `,e.jsx(n,{children:"f(x, y) = x"}),` unter
`,e.jsx(n,{children:"\\cred{g(x, y)} = y^2 - x^3 = 0"}),", so erzwingt die Nebenbedingung ",e.jsx(n,{children:"x \\ge 0"}),`,
das Minimum liegt also im Ursprung. Dort ist wegen
`,e.jsx(n,{children:"\\corange{\\nabla g(x, y)} = (-3x^2,\\, 2y)"}),` aber
`,e.jsx(n,{children:"\\corange{\\nabla g(0, 0)} = \\bnull^\\top"}),`, während
`,e.jsx(n,{children:"\\corange{\\nabla f} = (1, 0)"})," nirgends verschwindet: Kein ",e.jsx(n,{children:"\\lambda"}),` erfüllt
die Stationaritätsgleichung. An dieser Spitze der zulässigen Kurve greift der
Satz von Lagrange schlicht nicht.`]}),`
`,e.jsx(i.p,{children:`Hinreichende Bedingungen sind feiner (zweite Ableitungen der
Lagrange-Funktion auf dem Tangentialraum); dazu Heath, Ch. 6.2.3.`}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.5.6 (Minimieren auf einer Geraden)",id:"env-minimieren-auf-einer-geraden",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"})," unter ",e.jsx(n,{children:"\\cred{x + y - 1 = 0}"}),"."]}),e.jsxs(i.p,{children:[`Die Lagrange-Funktion ist
`,e.jsx(n,{children:"\\Lcal(x, y, \\lambda) = x^2 + y^2 + \\lambda\\,(x + y - 1)"}),`, und ihre
partiellen Ableitungen liefern drei Gleichungen:`]}),e.jsx(_,{children:`\\begin{aligned}
\\frac{\\partial \\Lcal}{\\partial x} &= 2x + \\lambda = 0
&&\\implies\\quad x = -\\lambda/2, \\\\
\\frac{\\partial \\Lcal}{\\partial y} &= 2y + \\lambda = 0
&&\\implies\\quad y = -\\lambda/2, \\\\
\\frac{\\partial \\Lcal}{\\partial \\lambda} &= x + y - 1 = 0
&&\\implies\\quad -\\lambda = 1 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Also ",e.jsx(n,{children:"\\lambda^\\star = -1"}),` und
`,e.jsx(n,{children:"\\cgreen{x^\\star = y^\\star = \\tfrac12}"}),` mit
`,e.jsx(n,{children:"f(x^\\star, y^\\star) = \\tfrac12"}),`. Das passt zur Geometrie: Im Punkt
`,e.jsx(n,{children:"(\\tfrac12, \\tfrac12)"})," ist ",e.jsx(n,{children:"\\corange{\\nabla f} = (1, 1)"}),` parallel zu
`,e.jsx(n,{children:"\\corange{\\nabla g} = (1, 1)"}),", und das Vorzeichen von ",e.jsx(n,{children:"\\lambda^\\star"}),` ist
negativ. Bei Gleichungsnebenbedingungen ist das erlaubt.`]})]}),`
`,e.jsx(i.p,{children:`Woran erkennen wir am Bild, dass ein Punkt der Geraden optimal ist? Probieren wir
es aus.`}),`
`,e.jsxs(ze,{title:"Höhenlinien, Gerade und zwei Pfeile",children:[e.jsxs(i.p,{children:["Das Widget zeigt das Beispiel live: die Höhenlinien von ",e.jsx(n,{children:"f"}),` in Grau, die gerade
erreichte violett, die Nebenbedingung in Rot, an einem verschiebbaren Punkt auf
der Geraden die beiden Gradienten in Orange. Daneben steht dieselbe Funktion als
Fläche, auf die die Nebenbedingung als rote Kurve gehoben ist. Die drei Knöpfe
wechseln zwischen der Gleichung und den beiden Ungleichungen.`]}),e.jsx(js,{}),e.jsxs(i.p,{children:["Abzulesen ist die ",e.jsx(i.em,{children:"Parallelität"}),` der beiden Pfeile: Nur an einer Stelle der
Geraden decken sie sich, und nur dort liefern beide Stationaritätsgleichungen
denselben Multiplikator, nämlich `,e.jsx(n,{children:"\\lambda^\\star = -1"}),` im Punkt
`,e.jsx(n,{children:"(0{,}5;\\, 0{,}5)"})," mit ",e.jsx(n,{children:"f^\\star = 0{,}5"}),`. Überall sonst schneidet die Höhenlinie
die Gerade in zwei Punkten, statt sie zu berühren. Die beiden Ungleichungs-Modi
nehmen die folgenden KKT-Bedingungen vorweg: Bei `,e.jsx(n,{children:"x + y \\ge 1"}),` zeigen die Pfeile
im Optimum gegeneinander, `,e.jsx(n,{children:"\\mu = 1 > 0"}),`, die Nebenbedingung bindet; bei
`,e.jsx(n,{children:"x + y \\le 1"})," verlangte jeder Randpunkt ",e.jsx(n,{children:"\\mu < 0"}),`, und stattdessen gewinnt das
unbeschränkte Minimum `,e.jsx(n,{children:"(0;\\, 0)"})," mit ",e.jsx(n,{children:"\\mu = 0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Ungleichungen: die KKT-Bedingungen"}),`
`,e.jsxs(i.p,{children:["Bei Ungleichungs-Nebenbedingungen ",e.jsx(n,{children:"\\cred{h_j(\\bx)} \\le 0"}),` kommt eine neue
Unterscheidung dazu: Eine Ungleichung kann im Optimum `,e.jsx(i.em,{children:"aktiv"}),` sein (es gilt
Gleichheit, sie blockiert die Bewegung) oder `,e.jsx(i.em,{children:"inaktiv"}),` (es gilt strikte
Ungleichheit, lokal spürt das Problem sie gar nicht).`]}),`
`,e.jsxs(y,{kind:"Satz",label:"12.5.7 (Karush-Kuhn-Tucker-Bedingungen)",id:"env-karush-kuhn-tucker-bedingungen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"}),` unter
`,e.jsx(n,{children:"\\cred{g_i(\\bx)} = 0"})," und ",e.jsx(n,{children:"\\cred{h_j(\\bx)} \\le 0"}),`, und seien die Gradienten
aller Gleichungen zusammen mit denen der in `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` aktiven
Ungleichungen linear unabhängig. Dann existieren Multiplikatoren
`,e.jsx(n,{children:"\\lambda_i, \\mu_j"})," mit:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stationarität:"}),`
`,e.jsx(n,{children:"\\displaystyle \\nabla f(\\bx^\\star) + \\sum_i \\lambda_i \\nabla g_i(\\bx^\\star) + \\sum_j \\mu_j \\nabla h_j(\\bx^\\star) = \\bnull^\\top"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Primale Zulässigkeit:"})," ",e.jsx(n,{children:"g_i(\\bx^\\star) = 0"})," und ",e.jsx(n,{children:"h_j(\\bx^\\star) \\le 0"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Duale Zulässigkeit:"})," ",e.jsx(n,{children:"\\mu_j \\ge 0"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Komplementarität:"})," ",e.jsx(n,{children:"\\mu_j\\, h_j(\\bx^\\star) = 0"})," für alle ",e.jsx(n,{children:"j"})]}),`
`]})]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.5.8 (Komplementarität: bindet oder abgeschaltet)",id:"env-komplementaritaet-bindet-oder",children:[e.jsx(i.p,{children:"Bedingung 4 ist ein Entweder-oder je Ungleichung:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"h_j(\\bx^\\star) < 0"})," (inaktiv) ",e.jsx(n,{children:"\\implies \\mu_j = 0"}),`: Die Nebenbedingung
trägt nichts zur Stationarität bei.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\mu_j > 0 \\implies h_j(\\bx^\\star) = 0"}),` (aktiv): Die Nebenbedingung bindet,
und ihr Gradient stemmt sich in der Stationaritätsgleichung gegen
`,e.jsx(n,{children:"\\corange{\\nabla f}"}),"."]}),`
`]}),e.jsxs(i.p,{children:[`Anders als bei Gleichungen ist das Vorzeichen hier festgelegt:
`,e.jsx(n,{children:"\\mu_j \\ge 0"}),`, denn eine Ungleichung kann nur in eine Richtung drücken.
Die `,e.jsx(n,{children:"\\lambda_i"})," der Gleichungen bleiben vorzeichenfrei."]})]}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.5.9 (Eine Box-Beschränkung)",id:"env-eine-box-beschraenkung",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"f(x) = (x - 3)^2"})," unter ",e.jsx(n,{children:"0 \\le x \\le 2"}),`, also mit
`,e.jsx(n,{children:"\\cred{h_1(x)} = -x \\le 0"})," und ",e.jsx(n,{children:"\\cred{h_2(x)} = x - 2 \\le 0"}),"."]}),e.jsx(i.p,{children:"Die KKT-Bedingungen lauten"}),e.jsx(ee,{tag:"12.5.1",id:"eq-eine-box-beschraenkung",children:`2(x^\\star - 3) - \\mu_1 + \\mu_2 = 0, \\qquad
\\mu_1, \\mu_2 \\ge 0, \\qquad
\\mu_1 x^\\star = 0, \\qquad \\mu_2 (x^\\star - 2) = 0 .`}),e.jsxs(i.p,{children:["Das unbeschränkte Minimum ",e.jsx(n,{children:"x = 3"}),` ist unzulässig, der Kandidat ist der rechte
Rand: `,e.jsx(n,{children:"\\cgreen{x^\\star = 2}"}),". Komplementarität erzwingt dann ",e.jsx(n,{children:"\\mu_1 = 0"}),`
(denn `,e.jsx(n,{children:"x^\\star = 2 \\neq 0"}),"), und ",e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"}),` liefert
`,e.jsx(n,{children:"2(2 - 3) + \\mu_2 = 0"}),", also ",e.jsx(n,{children:"\\mu_2 = 2 > 0"}),`. Alle vier Bedingungen sind
erfüllt: Die obere Schranke ist `,e.jsx(i.em,{children:"aktiv"}),", die untere ",e.jsx(i.em,{children:"inaktiv"}),"."]}),e.jsxs(i.p,{children:[`Die beiden anderen Kandidaten scheitern an denselben Bedingungen. Am
linken Rand `,e.jsx(n,{children:"x = 0"})," ist ",e.jsx(n,{children:"\\mu_2 = 0"}),", und ",e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"}),` verlangte dann
`,e.jsx(n,{children:"\\mu_1 = 2(0 - 3) = -6 < 0"}),`, was die duale Zulässigkeit verletzt. Im Inneren
wären beide Multiplikatoren null und `,e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"})," verlangte ",e.jsx(n,{children:"x^\\star = 3"}),`, was
die Box verlässt.`]}),e.jsxs(i.p,{children:["Anschaulich zeigt die negative Ableitung ",e.jsx(n,{children:"-f'(2) = 2"}),` nach rechts, Richtung
des unbeschränkten Minimums, aber die aktive Schranke `,e.jsx(n,{children:"\\cred{h_2}"}),` blockiert
jede weitere Bewegung. Genau diese blockierte Abstiegsrichtung bezahlt das
Problem mit `,e.jsx(n,{children:"\\mu_2 > 0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Ridge und Lasso als beschränkte Optimierung"}),`
`,e.jsxs(i.p,{children:["Die regularisierte Regression aus ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` lässt sich in einer
penalisierten und einer beschränkten Form schreiben; die zweite ist ein
beschränktes Problem im Sinn von `,e.jsx(i.a,{href:"#env-beschraenktes-optimierungsproblem",children:"Definition 12.5.1"}),":"]}),`
`,e.jsx(_,{children:`\\begin{aligned}
\\text{penalisiert:} \\quad & \\min_{\\bbeta}\\; \\|\\by - \\bX\\bbeta\\|_2^2
+ \\lambda \\|\\bbeta\\|_p^p \\\\
\\text{beschränkt:} \\quad & \\min_{\\bbeta}\\; \\|\\by - \\bX\\bbeta\\|_2^2
\\quad \\text{unter} \\quad \\cred{\\|\\bbeta\\|_p^p \\le c},
\\end{aligned}`}),`
`,e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"p = 2"})," (Ridge) beziehungsweise ",e.jsx(n,{children:"p = 1"})," (Lasso)."]}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.5.10 (KKT-Stationarität für Ridge)",id:"env-kkt-stationaritaet-fuer-ridge",children:[e.jsxs(i.p,{children:["Für Ridge (",e.jsx(n,{children:"p = 2"}),") ist die Lagrange-Funktion der beschränkten Form"]}),e.jsx(_,{children:"\\Lcal(\\bbeta, \\mu) = \\|\\by - \\bX\\bbeta\\|_2^2 + \\mu\\,\\bigl(\\|\\bbeta\\|_2^2 - c\\bigr),"}),e.jsxs(i.p,{children:[`und die Stationarität liefert mit den Gradienten aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"})]}),e.jsx(_,{children:`\\nabla_{\\bbeta} \\Lcal^\\top
= -2\\bX^\\top(\\by - \\bX\\bbeta) + 2\\mu\\bbeta = \\bnull
\\quad\\implies\\quad
\\wh{\\bbeta}_{\\text{Ridge}} = \\bigl(\\bX^\\top\\bX + \\mu\\bI\\bigr)^{-1}\\bX^\\top\\by .`}),e.jsxs(i.p,{children:["Das ist die Ridge-Lösung mit dem Multiplikator ",e.jsx(n,{children:"\\mu"}),` in der Rolle des
Strafparameters. Ist die penalisiert geschätzte Lösung zu `,e.jsx(n,{children:"\\lambda>0"}),` von null
verschieden, so gehört mit `,e.jsx(n,{children:"c=\\|\\wh{\\bbeta}(\\lambda)\\|_2^2>0"}),` eine bindende
beschränkte Form mit derselben Lösung dazu. Im Sonderfall
`,e.jsx(n,{children:"\\wh{\\bbeta}(\\lambda)=\\bnull"})," ist das aktive Budget ",e.jsx(n,{children:"c=0"}),`; ein größeres Budget
kann dieselbe Lösung enthalten, ist dann aber inaktiv und hat `,e.jsx(n,{children:"\\mu=0"}),`. Die
Umkehrung gilt nur,
solange die Nebenbedingung wirklich bindet: Ist `,e.jsx(n,{children:"c"}),` so groß, dass der
Kleinste-Quadrate-Schätzer selbst zulässig ist, dann erzwingt die
Komplementarität `,e.jsx(n,{children:"\\mu = 0"}),", und das entspricht ",e.jsx(n,{children:"\\lambda = 0"}),". Welches ",e.jsx(n,{children:"c"}),` zu
welchem `,e.jsx(n,{children:"\\lambda"}),` gehört, hängt außerdem von den Daten ab; eine
Umrechnungsformel gibt es nicht (`,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`). Für
`,e.jsx(n,{children:"\\mu > 0"})," ist ",e.jsx(n,{children:"\\bX^\\top\\bX + \\mu\\bI"}),` symmetrisch positiv definit, das System
also eindeutig lösbar (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),`), auch wenn
`,e.jsx(n,{children:"\\bX"})," keinen vollen Rang hat."]})]}),`
`,e.jsx(y,{kind:"Bemerkung",label:"12.5.11 (Kreis gegen Raute: warum Lasso Nullen erzeugt)",id:"env-kreis-gegen-raute-warum-lasso-nullen",children:e.jsxs(i.p,{children:[`Geometrisch minimieren beide Verfahren dieselben elliptischen Höhenlinien
des Kleinste-Quadrate-Verlusts, nur über verschiedenen zulässigen Bereichen:
Ridge über der Kreisscheibe `,e.jsx(n,{children:"\\|\\bbeta\\|_2^2 \\le c"}),`, Lasso über der Raute
`,e.jsx(n,{children:"|\\beta_1| + |\\beta_2| \\le c"}),`. Verletzt der Kleinste-Quadrate-Schätzer die
Nebenbedingung, so liegt die Lösung dort, wo die um ihn herum wachsende
Ellipse den Bereich zuerst berührt. Einen Kreis trifft sie fast immer in
einem glatten Randpunkt, an dem beide Koordinaten von null verschieden sind.
Die Raute dagegen streckt ihre Ecken auf die Achsen hinaus, und an einer Ecke
kommt die wachsende Ellipse besonders leicht zuerst an; dort ist eine
Koordinate exakt null. Zwingend ist das nicht: Wird das Budget `,e.jsx(n,{children:"c"}),` groß
genug, rutscht auch die Lasso-Lösung auf eine Kante der Raute, und beide
Koordinaten sind wieder besetzt. Am Regler des Widgets lassen sich beide
Regime durchfahren. Der Ecken-Fall ist der geometrische Grund für die
Sparsity des Lasso; formal steckt dahinter das Subdifferential der
Betragsfunktion (`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.4",children:"Abschnitt 11.4"}),")."]})}),`
`,e.jsxs(ze,{title:"Kreis gegen Raute",children:[e.jsxs(i.p,{children:["Das Widget parametrisiert beide Mengen über ihren direkt sichtbaren Radius ",e.jsx(n,{children:"r"}),`:
Es zeigt `,e.jsx(n,{children:"\\|\\bbeta\\|_2\\le r"})," und ",e.jsx(n,{children:"\\|\\bbeta\\|_1\\le r"}),`. Für Ridge entspricht das
dem Budget `,e.jsx(n,{children:"c=r^2"})," in der Formel oben, für Lasso ",e.jsx(n,{children:"c=r"}),`. Die zulässigen Mengen
sind dieselben; nur die Parametrisierung unterscheidet sich.`]}),e.jsx(Ge,{variante:"bereich",frage:e.jsxs(e.Fragment,{children:["Bis zu welchem Radius ",e.jsx(n,{children:"r"})," bleibt die Lasso-Lösung in der Ecke, setzt also ",e.jsx(n,{children:"\\beta_2"})," exakt auf null?"]}),loesung:1.342857,toleranz:.15,min:.4,max:2.6,schritt:.05,start:1.5,einheit:"r",verdeckt:e.jsx(e.Fragment,{children:"Der Ecken-Vermerk in der rechten Tafel verschwindet an dieser Schwelle."}),children:e.jsx(ys,{})}),e.jsxs(i.p,{children:["Die Eckenschwelle liegt bei ",e.jsx(n,{children:"r = 1{,}3429"}),`: Darunter steht die Lasso-Lösung exakt
auf `,e.jsx(n,{children:"(r;\\, 0)"}),`, darüber rutscht sie auf eine Kante der Raute, und beide
Koordinaten sind wieder besetzt. Die Ridge-Lösung wandert dagegen glatt am
Kreisrand entlang und wird nie exakt null. Nach oben verschwindet der Zwang ganz:
Ab `,e.jsx(n,{children:"\\|\\wh{\\bbeta}\\|_2 = 1{,}8358"}),` ist die Ridge-Nebenbedingung inaktiv, ab
`,e.jsx(n,{children:"\\|\\wh{\\bbeta}\\|_1 = 2{,}5"}),` die des Lasso, und beide Male erzwingt die
Komplementarität aus `,e.jsx(i.a,{href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"})," dann ",e.jsx(n,{children:"\\mu = 0"}),"."]})]}),`
`,e.jsx(y,{kind:"Satz",label:"12.5.12 (KKT und Konvexität)",id:"env-kkt-und-konvexitaet",children:e.jsxs(i.p,{children:["Sind ",e.jsx(n,{children:"f"})," und alle ",e.jsx(n,{children:"h_j"})," konvex und alle ",e.jsx(n,{children:"g_i"}),` affin, so ist jeder zulässige
Punkt `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, der die KKT-Bedingungen erfüllt, ein globales
Minimum.`]})}),`
`,e.jsxs(i.p,{children:["Der Beweis ist eine Zeile: Mit festen ",e.jsx(n,{children:"\\lambda_i^\\star"}),` und
`,e.jsx(n,{children:"\\mu_j^\\star \\ge 0"})," ist ",e.jsx(n,{children:"\\Lcal(\\cdot, \\blambda^\\star, \\bmu^\\star)"}),` konvex,
die Stationarität macht `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` zu ihrem Minimierer, und für
jedes zulässige `,e.jsx(n,{children:"\\bx"})," gilt"]}),`
`,e.jsx(_,{children:`f(\\bx) \\;\\ge\\; \\Lcal(\\bx, \\blambda^\\star, \\bmu^\\star)
\\;\\ge\\; \\Lcal(\\bx^\\star, \\blambda^\\star, \\bmu^\\star) \\;=\\; f(\\bx^\\star) .`}),`
`,e.jsxs(i.p,{children:["Die erste Ungleichung nutzt ",e.jsx(n,{children:"g_i(\\bx) = 0"}),", ",e.jsx(n,{children:"h_j(\\bx) \\le 0"}),` und
`,e.jsx(n,{children:"\\mu_j^\\star \\ge 0"}),", die letzte Gleichheit die Komplementarität."]}),`
`,e.jsxs(i.p,{children:[`Diese Richtung braucht also keine Regularitätsbedingung. Die umgekehrte aus
`,e.jsx(i.a,{href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"}),` braucht sie weiterhin, auch bei konvexen Problemen – die beiden
Richtungen sind nicht symmetrisch, und die verbreitete Kurzformel „im konvexen
Fall sind die KKT-Bedingungen notwendig `,e.jsx(i.em,{children:"und"}),` hinreichend" verwischt genau das. Bei
`,e.jsx(n,{children:"\\min x"})," unter ",e.jsx(n,{children:"\\cred{h(x)} = x^2 \\le 0"}),` sind Ziel und
Nebenbedingung konvex, der einzige zulässige Punkt `,e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),` ist
das Optimum, und trotzdem erfüllt kein `,e.jsx(n,{children:"\\mu \\ge 0"}),` die Stationarität
`,e.jsx(n,{children:"1 + \\mu \\cdot 2x^\\star = 0"}),": Wegen ",e.jsx(n,{children:"x^\\star = 0"})," steht links immer ",e.jsx(n,{children:"1"}),"."]}),`
`,e.jsxs(i.p,{children:[`Für konvexe Probleme ist ein KKT-Punkt demnach bereits ein globales Optimum,
und viele statistische Probleme sind konvex: Kleinste Quadrate, Ridge, Lasso,
die negative `,e.jsx(A,{id:"likelihood",children:"Log-Likelihood"}),` einer Exponentialfamilie in ihrer
kanonischen Parametrisierung (`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),`).
Bei
nicht-konvexen Problemen wie neuronalen Netzen liefern die KKT-Bedingungen
dagegen nur Kandidaten, unter denen auch lokale Optima und Sattelpunkte sind
(`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),`
`,e.jsxs(i.p,{children:["Sind Ziel und alle Nebenbedingungen affin, heißt die Aufgabe ",e.jsx(i.em,{children:"lineares Programm"}),`;
ihr zulässiger Bereich ist dann ein Polyeder
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.2",children:"Abschnitt 11.2"}),`), und dafür gibt es eigene Verfahren, die dieses
Skript nicht behandelt.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"}),` unter
`,e.jsx(n,{children:"\\cred{g(\\bx)} = 0"}),", so gibt es immer ein ",e.jsx(n,{children:"\\lambda^\\star"}),` mit
`,e.jsx(n,{children:`\\corange{\\nabla f(\\bx^\\star)} + \\lambda^\\star \\corange{\\nabla g(\\bx^\\star)}
= \\bnull^\\top`}),"."]}),e.jsxs(i.p,{children:["Nur unter der Bedingung aus ",e.jsx(i.a,{href:"#env-notwendige-bedingung-von-lagrange",children:"Satz 12.5.5"}),". Bei ",e.jsx(n,{children:"f(x, y) = x"}),` unter
`,e.jsx(n,{children:"\\cred{g(x, y)} = y^2 - x^3 = 0"}),` liegt das Minimum im Ursprung, dort ist
`,e.jsx(n,{children:"\\corange{\\nabla g(0,0)} = \\bnull^\\top"}),", und ",e.jsx(n,{children:"\\corange{\\nabla f} = (1, 0)"}),`
lässt sich durch kein Vielfaches des Nullvektors ausgleichen.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Bei einer Gleichungsnebenbedingung darf der Multiplikator den Wert null
annehmen.`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-auch-null-ist-ein-zulaessiger",children:"Bemerkung 12.5.3"}),". Minimieren wir etwa ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"}),` unter
`,e.jsx(n,{children:"\\cred{x + y = 0}"}),", so liegt das unbeschränkte Minimum ",e.jsx(n,{children:"(0, 0)"}),` selbst auf
der Nebenbedingung; dort ist `,e.jsx(n,{children:"\\corange{\\nabla f} = \\bnull^\\top"}),`, und die
Stationarität gilt mit `,e.jsx(n,{children:"\\lambda^\\star = 0"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:"Ist eine Ungleichung im Optimum aktiv, so ist ihr Multiplikator positiv."}),e.jsxs(i.p,{children:["Die Komplementarität ",e.jsx(n,{children:"\\mu_j\\, \\cred{h_j(\\bx^\\star)} = 0"}),` ist auch dann
erfüllt, wenn beide Faktoren null sind. Bei `,e.jsx(n,{children:"\\min x^2"}),` unter
`,e.jsx(n,{children:"\\cred{h(x)} = x \\le 0"})," ist ",e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),`, die Ungleichung also
aktiv, und die Stationarität `,e.jsx(n,{children:"2x^\\star + \\mu = 0"}),` liefert trotzdem
`,e.jsx(n,{children:"\\mu = 0"}),". Nur die andere Richtung trägt: inaktiv erzwingt ",e.jsx(n,{children:"\\mu_j = 0"}),"."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist die Lösung der penalisierten Ridge-Regression zu ",e.jsx(n,{children:"\\lambda>0"}),` von null
verschieden, so liefert `,e.jsx(n,{children:"c=\\|\\wh{\\bbeta}(\\lambda)\\|_2^2"}),` eine bindende
beschränkte Form mit derselben Lösung.`]}),e.jsxs(i.p,{children:["Wir lösen die penalisierte Form und setzen ",e.jsx(n,{children:"c := \\|\\wh{\\bbeta}(\\lambda)\\|_2^2"}),`.
Dann ist `,e.jsx(n,{children:"\\wh{\\bbeta}(\\lambda)"}),` zulässig, die Nebenbedingung aktiv, und mit
`,e.jsx(n,{children:"\\mu = \\lambda"})," sind alle KKT-Bedingungen erfüllt; ",e.jsx(i.a,{href:"#env-kkt-und-konvexitaet",children:"Satz 12.5.12"}),` macht daraus
das globale Optimum. Für `,e.jsx(n,{children:"\\bX"})," und ",e.jsx(n,{children:"\\by"})," aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ridge-regression",children:"Beispiel 10.6.6"}),`
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),") und ",e.jsx(n,{children:"\\lambda = 1{,}5"}),` ist
das `,e.jsx(n,{children:"\\wh{\\bbeta} = (0{,}341;\\, 0{,}578)"})," mit ",e.jsx(n,{children:"c = 0{,}450"}),`. Die Umkehrung
gilt dagegen nur, solange die Nebenbedingung bindet. Ist die penalisierte
Lösung null, ergibt die aktive Zuordnung `,e.jsx(n,{children:"c=0"}),`; genau deshalb steht die
Nichtnull-Voraussetzung im Selbsttest.`]})]}),e.jsxs(V,{wahr:!1,children:[e.jsx(i.p,{children:`Bei einem konvexen Problem erfüllt das globale Minimum stets die
KKT-Bedingungen.`}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-kkt-und-konvexitaet",children:"Satz 12.5.12"})," trägt nur die andere Richtung. Bei ",e.jsx(n,{children:"\\min x"}),` unter
`,e.jsx(n,{children:"\\cred{h(x)} = x^2 \\le 0"}),` sind Ziel und Nebenbedingung konvex, der einzige
zulässige Punkt `,e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),` ist damit das Optimum, und trotzdem
scheitert die Stationarität `,e.jsx(n,{children:"1 + \\mu \\cdot 2x^\\star = 0"}),` an jedem
`,e.jsx(n,{children:"\\mu \\ge 0"}),`. Für die notwendige Richtung braucht es eine
Regularitätsbedingung.`]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:"Die Lasso-Lösung muss nicht in einer Ecke der Raute liegen."}),e.jsxs(i.p,{children:[`Die Ecke gewinnt nur, solange das Budget klein genug ist. Im Widget sitzt
die Lösung für `,e.jsx(n,{children:"c \\le 1{,}30"})," exakt in ",e.jsx(n,{children:"(c;\\, 0)"}),", bei ",e.jsx(n,{children:"c = 1{,}40"}),` dagegen
liest das Readout `,e.jsx(n,{children:"(1{,}36;\\, 0{,}04)"}),`: beide Koordinaten sind besetzt. Die
Sparsity des Lasso ist eine Tendenz der Geometrie, keine Garantie.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath behandelt die beschränkte Optimierung in
§6.2.3 (Lagrange-Multiplikatoren, hinreichende Bedingungen) sowie §6.7
(Verfahren für Probleme mit Nebenbedingungen); die konvexe Theorie samt
KKT-Dualität entwickeln Boyd und Vandenberghe, Convex Optimization,
Kapitel 5.`})})]})}function Ms(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(lt,{...r})}):lt(r)}const Ds=K.blau,Ns=K.gruen,ir=K.violett,ct=(r,i)=>{const t=r*r+Math.sin(3*i);return Math.log1p(t*t)+.1*r*r+.1*i*i},As=(r,i)=>{const t=r*r+Math.sin(3*i),h=2*t/(1+t*t);return[h*2*r+.2*r,h*3*Math.cos(3*i)+.2*i]},xe=1.6,Oe=320,$n=96,be=(r,i=2)=>Z(r,i);function _s(r){let i=[r[0],r[1]];const t=[[i[0],i[1]]];for(let h=0;h<3e3;h++){const l=As(i[0],i[1]);i=[i[0]-.05*l[0],i[1]-.05*l[1]],h%15===0&&t.push([i[0],i[1]])}return t.push([i[0],i[1]]),{pfad:t,ende:i,fEnde:ct(i[0],i[1])}}const rr=r=>(r+xe)/(2*xe)*Oe,tr=r=>(1-(r+xe)/(2*xe))*Oe,Fs=[[-1,-.5],[-1,1],[-.5,-1]];function Bs(){const[r,i]=F.useState([-1,-.5]),t=F.useMemo(()=>{const x=[];for(let z=0;z<$n;z++){const R=[];for(let j=0;j<$n;j++){const m=-xe+(j+.5)/$n*2*xe,k=xe-(z+.5)/$n*2*xe;R.push(ct(m,k))}x.push(R)}return x},[]),h=F.useMemo(()=>_s(r),[r]),l=$i({feld:{x0:0,y0:0,w:Oe,h:Oe},welt:{x0:-xe,x1:xe,y0:-xe,y1:xe},clamp:([x,z])=>[kn(x,-xe,xe),kn(z,-xe,xe)],snap:.01,onDrag:([x,z])=>i([x,z])}),d=h.fEnde<.01,s=!d&&h.ende[1]>0,o=d?"ok":"warn",f=d?"im globalen Minimum gelandet":s?"in der oberen Mulde gelandet":"in der unteren Mulde gelandet",u=d?`Von (${be(r[0])}; ${be(r[1])}) aus läuft der Abstieg nach (0; 0) mit f = 0, dem globalen Minimum. Das ist der Glücksfall, und von außen nicht zu erkennen: Der Rückgabewert sieht genauso aus wie in den beiden anderen Fällen.`:`Von (${be(r[0])}; ${be(r[1])}) aus läuft der Abstieg nach (${be(h.ende[0])}; ${be(h.ende[1],4)}) mit f = ${be(h.fEnde,4)}. Dort ist der Gradient null und die Hesse-Matrix positiv definit, es ist also ein sauberes lokales Minimum, nur liegt das globale bei (0; 0) mit f = 0 um ${be(h.fEnde,4)} tiefer. Genau das meint ${O("bemerkung:falsche-konvergenz-und-keiner-warnt")} mit „falscher Konvergenz": Das Verfahren hat nichts falsch gemacht, es hat nur nicht gefunden, was wir suchen. Abhilfe schafft keine bessere Schrittweite, sondern nur ein anderer Startpunkt.`,b=Oe/$n,S=F.useMemo(()=>t.map((x,z)=>x.map((R,j)=>{const m=Math.min(1,R/2.2),k=Math.round(248-m*130);return e.jsx("rect",{x:j*b,y:z*b,width:b+.5,height:b+.5,fill:`rgb(${k}, ${k}, ${k})`},z*$n+j)})),[t,b]);return e.jsxs("div",{className:"my-2 space-y-3",children:[e.jsx(Se,{children:"Setzen wir den Startpunkt an drei verschiedene Stellen und vergleichen die drei Endwerte f(Ende)."}),e.jsx("div",{className:"flex flex-wrap gap-2 text-sm",children:Fs.map(x=>{const z=Math.abs(r[0]-x[0])<1e-9&&Math.abs(r[1]-x[1])<1e-9;return e.jsxs("button",{type:"button","aria-pressed":z,onClick:()=>i(x),className:`${z?Re:Ne} font-mono text-xs`,children:["Start (",be(x[0],1),"; ",be(x[1],1),")"]},x.join(","))})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{viewBox:`0 0 ${Oe} ${Oe}`,width:Oe,height:Oe,role:"img","aria-label":`Höhenkarte der Beispielfunktion mit der Abstiegsbahn von (${be(r[0])}; ${be(r[1])}) nach (${be(h.ende[0])}; ${be(h.ende[1],2)}).`,className:"max-w-full h-auto rounded border border-slate-300",...l.svgProps,...l.surfaceProps("p"),children:[S,e.jsx("polyline",{points:h.pfad.map(([x,z])=>`${rr(x)},${tr(z)}`).join(" "),fill:"none",stroke:Ds,strokeWidth:2}),e.jsx("circle",{cx:rr(h.ende[0]),cy:tr(h.ende[1]),r:5,fill:Ns}),e.jsx(Gi,{x:rr(r[0]),y:tr(r[1]),farbe:ir,r:5,aktiv:l.dragging==="p",...l.handleProps("p")})]}),e.jsxs("div",{className:"min-w-52 space-y-2 text-sm",children:[e.jsxs("p",{className:"font-mono text-xs",children:["Start: (",be(r[0]),"; ",be(r[1]),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["Ende: (",be(h.ende[0]),"; ",be(h.ende[1],4),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["f(Ende) = ",be(h.fEnde,4)]}),e.jsx(re,{label:"Start x₁",value:r[0],onChange:x=>i([Math.round(x*100)/100,r[1]]),min:-xe,max:xe,step:.01,accent:ir}),e.jsx(re,{label:"Start x₂",value:r[1],onChange:x=>i([r[0],Math.round(x*100)/100]),min:-xe,max:xe,step:.01,accent:ir}),e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:"Helle Flächen liegen tief, dunkle hoch. Vom violetten Startpunkt läuft der Gradientenabstieg über 3000 Schritte mit γ = 0,05 (blaue Spur) bis zum Grenzwert (grün)."})]})]}),e.jsx(ye,{kind:o,titel:f,children:u})]})}function at(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Zum Abschluss übersetzen wir die Verfahren dieses Kapitels in R-Aufrufe. Die
beiden Arbeitspferde sind `,e.jsx(i.code,{children:"optimize()"})," für univariate und ",e.jsx(i.code,{children:"optim()"}),` für
multivariate Zielfunktionen. Die Ausgaben der Aufrufe drucken wir hier nicht
ab; stattdessen rechnen wir die Beispielfunktion im Widget selbst nach. Das
Widget läuft mit Gradientenabstieg und nicht mit den Verfahren aus `,e.jsx(i.code,{children:"optim()"}),`,
es zeigt also die Landschaft und ihre Mulden, nicht den Iterationsweg von R.`]}),`
`,e.jsx(i.h3,{children:"Univariat: optimize"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`f <- function(x) (x - 3)^2
optimize(f, interval = c(0, 10))
`})}),`
`,e.jsxs(i.p,{children:["Der Aufruf sucht das Minimum von ",e.jsx(n,{children:"f"})," auf dem Intervall ",e.jsx(n,{children:"[0, 10]"}),`. Das
analytische Minimum ist `,e.jsx(n,{children:"\\cgreen{x^\\star = 3}"})," mit ",e.jsx(n,{children:"f(x^\\star) = 0"}),`, und
weiter als bis auf das voreingestellte `,e.jsx(i.code,{children:"tol"}),` kommt der Aufruf nicht heran:
Es steht auf `,e.jsx(i.code,{children:".Machine$double.eps^0.25"}),", also auf rund ",e.jsx(n,{children:"1{,}2\\cdot 10^{-4}"}),"."]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.6.1 (Golden Section Search)",id:"env-golden-section-search",children:[e.jsxs(i.p,{children:["Im Kern verwendet ",e.jsx(i.code,{children:"optimize()"})," die ",e.jsx(i.em,{children:"Golden Section Search"}),`, eine Verwandte
der Bisektion aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`: Statt eines
Vorzeichenwechsels von `,e.jsx(n,{children:"f"}),` schachtelt sie ein Minimum ein. Dazu hält sie
zwei innere Testpunkte, die das Intervall im Verhältnis des goldenen
Schnitts teilen; in jedem Schritt fällt das Teilintervall weg, das das
Minimum nicht enthalten kann, und ein einziger neuer Funktionswert genügt,
weil der andere Testpunkt wiederverwendet wird. Das Intervall schrumpft pro
Schritt auf das `,e.jsx(n,{children:"0{,}618"}),`-fache, ganz ohne Ableitungen; verlässlich ist das
für `,e.jsx(i.em,{children:"unimodale"}),` Funktionen: Bis zu einer Minimalstelle steigen sie nicht an,
danach fallen sie nicht mehr. Ein bloß eindeutiges globales Minimum ohne diese
Formbedingung genügt nicht, weil zusätzliche Wellen die Intervallsuche täuschen
können.`]}),e.jsxs(i.p,{children:[`Der goldene Schnitt ist aber nur der eine Baustein. Tatsächlich kombiniert
`,e.jsx(i.code,{children:"optimize()"}),` ihn mit einer parabolischen Interpolation: Solange sich die drei zuletzt
berechneten Punkte gutartig verhalten, springt der nächste Testpunkt in den
Scheitel der Parabel durch sie, und erst wenn dieser Sprung aus dem
eingeschachtelten Intervall führt oder zu wenig einbringt, greift wieder der
goldene Schnitt. Die Einschachtelung bleibt dabei erhalten; ein ungeeigneter
Parabelschritt zerstört also nicht die robuste Intervallverkleinerung des
goldenen Schnitts.`]})]}),`
`,e.jsx(i.h3,{children:"Multivariat: optim"}),`
`,e.jsx(i.p,{children:"Als Testfall dient uns die Funktion"}),`
`,e.jsx(ee,{tag:"12.6.1",id:"eq-eq-12-6-1",children:`f(\\bx) = \\log\\bigl(1 + (x_1^2 + \\sin 3x_2)^2\\bigr)
+ 0{,}1\\,x_1^2 + 0{,}1\\,x_2^2 ,`}),`
`,e.jsxs(i.p,{children:["deren erster Term entlang der Kurven ",e.jsx(n,{children:"x_1^2 + \\sin 3x_2 = 0"}),` verschwindet
und deren Regularisierungsterme die Werte zum Ursprung hin senken. Sie hat
das globale Minimum `,e.jsx(n,{children:"\\cgreen{\\bx^\\star = (0;\\ 0)}"})," mit ",e.jsx(n,{children:"f(\\bx^\\star) = 0"}),`,
und im Fenster des Widgets liegen daneben genau zwei lokale Mulden, bei
`,e.jsx(n,{children:"(0;\\ \\pm 1{,}04)"})," mit ",e.jsx(n,{children:"f \\approx 0{,}11"}),`. Die Regularisierung verschiebt
sie leicht: Der erste Term verschwindet bei `,e.jsx(n,{children:"x_2 = \\pm\\pi/3 = \\pm 1{,}047"}),`,
die Talsohle liegt bei `,e.jsx(n,{children:"\\pm 1{,}036"}),"."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`f <- function(x) log1p((x[1]^2 + sin(3*x[2]))^2) +
  .1 * x[1]^2 + .1 * x[2]^2
optim(c(-1, -0.5), f)                     # Default: Nelder-Mead
optim(c(-1, -0.5), f, method = "BFGS")
`})}),`
`,e.jsxs(i.p,{children:["Ohne ",e.jsx(i.code,{children:"method"}),"-Argument verwendet ",e.jsx(i.code,{children:"optim()"}),` das ableitungsfreie
`,e.jsx(A,{id:"nelder-mead",children:"Nelder-Mead-Verfahren"}),` aus
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"; mit ",e.jsx(i.code,{children:'method = "BFGS"'}),` das
Quasi-Newton-Verfahren aus `,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),`, dessen Gradienten
es mangels `,e.jsx(i.code,{children:"gr"}),"-Argument per finiter Differenzen schätzt. Ein über ",e.jsx(i.code,{children:"gr"}),`
mitgeliefertes Gradientenfeld wechselt die Methode übrigens nicht von
selbst; Nelder-Mead bleibt die Voreinstellung, bis `,e.jsx(i.code,{children:"method"}),` etwas anderes
sagt. Von diesem Startpunkt aus landen beide Verfahren im globalen Minimum.`]}),`
`,e.jsxs(y,{kind:"Bemerkung",label:"12.6.2 (Falsche Konvergenz, und keiner warnt)",id:"env-falsche-konvergenz-und-keiner-warnt",children:[e.jsx(i.p,{children:"Zwei Fallen zeigt schon dieses kleine Beispiel; drei Aufrufe genügen:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`optim(c(-1, 1), f)                                # Nelder-Mead
optim(c(-0.5, -1), f, method = "BFGS")            # BFGS
optim(c(-1, -0.5), f, control = list(maxit = 50)) # abgeschnitten
`})}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lokale Minima."}),` Die Beispielfunktion hat neben dem globalen Minimum zwei
spiegelbildliche Mulden bei `,e.jsx(n,{children:"(0;\\ \\pm 1{,}04)"}),". Vom Startpunkt ",e.jsx(n,{children:"(-1;\\ 1)"}),`
aus liegt die obere davon im Weg, von `,e.jsx(n,{children:"(-0{,}5;\\ -1)"}),` aus die untere; der
Gradientenabstieg im Widget landet von beiden Startpunkten genau dort. Das
Verfahren meldet dann Konvergenz, obwohl der gefundene Wert
`,e.jsx(n,{children:"f \\approx 0{,}11"})," über dem globalen Minimum ",e.jsx(n,{children:"0"}),` liegt. Der
`,e.jsx(i.code,{children:"convergence"}),"-Code von ",e.jsx(i.code,{children:"optim()"})," sagt nur, dass das ",e.jsx(i.em,{children:"Verfahren"}),` zum
Stillstand kam, nicht, dass das Ergebnis global optimal ist
(`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Abgebrochene Läufe."}),` Begrenzen wir die Iterationen, etwa mit
`,e.jsx(i.code,{children:"control = list(maxit = 50)"}),", kann ",e.jsx(i.code,{children:"optim()"}),` mitten am Hang stehen bleiben.
Das Ergebnis sieht aus wie immer, nur der `,e.jsx(i.code,{children:"convergence"}),`-Code (dann
`,e.jsx(n,{children:"\\neq 0"}),`) verrät den Abbruch; eine Warnung gibt es nicht. Abbruchkriterien
prüfen heißt hier: den Rückgabewert lesen, nicht auf `,e.jsx(i.code,{children:"warnings()"}),` warten
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),", Abbruchkriterien)."]})]}),`
`,e.jsx(i.p,{children:`Wie schlimm ist das in der Praxis? Probieren wir es an der Beispielfunktion
selbst aus.`}),`
`,e.jsxs(ze,{title:"Die Landkarte zur Beispielfunktion",children:[e.jsxs(i.p,{children:["Das Widget zeichnet die Funktion aus ",e.jsx(i.a,{href:"#eq-eq-12-6-1",children:"(12.6.1)"}),` als Karte und lässt uns den
Startpunkt setzen, per Klick, per Zug oder über die beiden Regler. Weil das
Widget mit Gradientenabstieg rechnet, sind das die Einzugsgebiete `,e.jsx(i.em,{children:"dieses"}),`
Verfahrens; Nelder-Mead und BFGS laufen andere Wege und können deshalb an anderen
Startpunkten umkippen als die blaue Spur.`]}),e.jsx(Ge,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Wie viele verschiedene Grenzwerte findet der Gradientenabstieg auf diesem Ausschnitt?"}),optionen:[{id:"eins",text:"genau einen"},{id:"drei",text:"drei"},{id:"viele",text:"unübersichtlich viele"}],loesung:"drei",verdeckt:e.jsxs(e.Fragment,{children:["Es sind das globale Minimum ",e.jsx(n,{children:"(0;\\ 0)"})," und zwei lokale Mulden bei ",e.jsx(n,{children:"(0;\\ \\pm 1{,}04)"}),"."]}),children:e.jsx(Bs,{})}),e.jsxs(i.p,{children:["Es sind genau drei. Von ",e.jsx(n,{children:"(-1;\\ -0{,}5)"}),` aus geht es ins globale Minimum
`,e.jsx(n,{children:"(0;\\ 0)"})," mit ",e.jsx(n,{children:"f = 0"}),", von ",e.jsx(n,{children:"(-1;\\ 1)"})," in die obere und von ",e.jsx(n,{children:"(-0{,}5;\\ -1)"}),` in die
untere Mulde, beide bei `,e.jsx(n,{children:"(0;\\ \\pm 1{,}0357)"})," mit ",e.jsx(n,{children:"f = 0{,}1085"}),`. Alle drei Läufe
enden ordnungsgemäß – Gradient null, Hesse-Matrix positiv definit, kein
Warnhinweis –, und trotzdem landen zwei von dreien am falschen Ort. Gegen falsche
Konvergenz hilft deshalb keine bessere Schrittweite, sondern nur ein zweiter
Startpunkt.`]})]}),`
`,e.jsx(i.h3,{children:"Der analytische Gradient"}),`
`,e.jsxs(i.p,{children:["Wer den Gradienten kennt, sollte ihn ",e.jsx(i.code,{children:"optim()"}),` übergeben: Finite Differenzen
kosten pro Gradient zusätzliche Funktionsauswertungen, bei einseitigen
Differenzen `,e.jsx(n,{children:"n"})," und bei zentralen ",e.jsx(n,{children:"2n"}),`, und sie bringen Rundungsfehler mit
(`,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`); der analytische Gradient ist schneller
und genauer.`]}),`
`,e.jsxs(y,{kind:"Beispiel",label:"12.6.3 (Kettenregel für die Beispielfunktion)",id:"env-kettenregel-fuer-die-beispielfunktion",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"u(\\bx) = x_1^2 + \\sin 3x_2"})," ist ",e.jsx(n,{children:`f = \\log(1 + u^2) + 0{,}1x_1^2 +
0{,}1x_2^2`}),", und die ",e.jsx(A,{id:"chain-rule",children:"Kettenregel"}),`
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),`) liefert wegen
`,e.jsx(n,{children:"\\tfrac{d}{du}\\log(1 + u^2) = \\tfrac{2u}{1 + u^2}"}),":"]}),e.jsx(_,{children:`\\corange{\\nabla f(\\bx)} = \\left(
\\frac{4 x_1 u}{1 + u^2} + 0{,}2\\,x_1 ,\\quad
\\frac{6 \\cos(3x_2)\\, u}{1 + u^2} + 0{,}2\\,x_2
\\right) .`}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`grad_f <- function(x) {
  u <- x[1]^2 + sin(3*x[2])
  d <- 2 * u / (1 + u^2)
  c(d * 2 * x[1] + .2 * x[1],
    d * 3 * cos(3*x[2]) + .2 * x[2])
}
optim(c(-1, -0.5), f, gr = grad_f, method = "BFGS")
optim(c(-1, 0.5), f, gr = grad_f, method = "L-BFGS-B",
      lower = c(-1, -1), upper = c(1, 1))
`})}),e.jsxs(i.p,{children:[e.jsx(i.code,{children:"L-BFGS-B"}),` ist die speicherschonende BFGS-Variante aus
`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),`, erweitert um Box-Nebenbedingungen
`,e.jsx(i.code,{children:"lower"}),"/",e.jsx(i.code,{children:"upper"}),`; damit sind wir zurück bei der beschränkten Optimierung aus
`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Wann welches Verfahren"}),`
`,e.jsx(i.p,{children:"Die Methodenwahl aus diesem Kapitel, zusammengefasst:"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Methode"}),e.jsx(i.th,{children:"Wann verwenden?"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Nelder-Mead"}),e.jsxs(i.td,{children:["Keine Ableitungen, niedrige Dimension (",e.jsx(n,{children:"n \\le 10"}),")"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Gradientenabstieg"}),e.jsx(i.td,{children:"Große Probleme, einfache Implementierung"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Quasi-Newton (BFGS)"}),e.jsx(i.td,{children:"Mittlere Probleme, guter Kompromiss"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Newton"}),e.jsx(i.td,{children:"Kleine Probleme, schnelle Konvergenz nötig"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Momentum"}),e.jsx(i.td,{children:"Gradientenabstieg bei schlecht konditionierten Problemen"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"SGD"}),e.jsx(i.td,{children:"Sehr große Datensätze und hohe Dimension"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lagrange/KKT"}),e.jsx(i.td,{children:"Nebenbedingungen"})]})]})]}),`
`,e.jsxs(i.p,{children:[`Ein verbreitetes Missverständnis dazu: BFGS ist zwar in vielen
Optimierungsbibliotheken die Voreinstellung, in `,e.jsx(i.code,{children:"optim()"}),` aber nicht. Dort ist
Nelder-Mead die Voreinstellung, und daran ändert auch ein über `,e.jsx(i.code,{children:"gr"}),` übergebener
Gradient nichts. Der gute Kompromiss ist BFGS trotzdem, wir müssen ihn nur anfordern.`]}),`
`,e.jsx(i.h3,{children:"Was bleibt"}),`
`,e.jsx(y,{kind:"Bemerkung",label:"12.6.4 (Kernkonzepte des Kapitels)",id:"env-optim-in-r-kernkonzepte-des-kapitels",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Nichtlineare Gleichungen"}),` lösen wir iterativ: Die Bisektion halbiert
verlässlich, aber langsam; Newton-Raphson konvergiert lokal quadratisch,
`,e.jsx(n,{children:"e_{k+1} \\approx C\\,e_k^2"})," mit einer Konstanten ",e.jsx(n,{children:"C"}),", die von ",e.jsx(n,{children:"f"}),` abhängt,
und überträgt sich wörtlich ins Multivariate. Wo die Jacobimatrix pro
Schritt zu teuer wird, ersetzt die Fixpunktiteration sie durch eine
feste Schrittweite (`,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Optimalität"}),` heißt stationär plus Krümmungsbedingung; ohne Konvexität
drohen lokale Minima und vor allem Sattelpunkte
(`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Gradientenabstieg"}),` lebt von der Schrittweite: Konvergenzraten
`,e.jsx(n,{children:"O(1/k)"})," beziehungsweise linear mit ",e.jsx(n,{children:"\\rho = 1 - \\gamma\\mu"}),`, für
`,e.jsx(n,{children:"\\gamma = 1/L"})," also ",e.jsx(n,{children:"\\rho = 1 - \\mu/L"}),`, und die
`,e.jsx(A,{id:"condition-number",children:"Kondition"})," ",e.jsx(n,{children:"\\kappa_f = L/\\mu"}),` bestimmt das
Zickzack (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Newton und Quasi-Newton"}),` kaufen mit Krümmungsinformation schnellere
Konvergenz; BFGS approximiert die Hesse-Inverse aus Gradienten, SGD
ersetzt den Gradienten durch den einer zufällig gezogenen Beobachtung,
der im Mittel über diese Ziehung der gesuchte ist
(`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Nebenbedingungen"}),` behandeln Lagrange-Multiplikatoren und die
KKT-Bedingungen; Ridge und Lasso sind die statistischen Musterbeispiele
(`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),")."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Sechs Aussagen quer durch das Kapitel."}),`
`,e.jsxs(Ue,{children:[e.jsxs(V,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Bisektion auf ",e.jsx(n,{children:"[0, 8]"}),` braucht für die Zielgenauigkeit
`,e.jsx(n,{children:"\\epsilon = 10^{-3}"})," genau ",e.jsx(n,{children:"13"})," Halbierungen."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` sind es
`,e.jsx(n,{children:"\\lceil \\log_2((b - a)/\\epsilon) \\rceil = \\lceil \\log_2 8000 \\rceil"}),`
Schritte, und wegen `,e.jsx(n,{children:"2^{12} = 4096 < 8000 \\le 8192 = 2^{13}"})," sind das ",e.jsx(n,{children:"13"}),"."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Gradientenabstieg auf ",e.jsx(n,{children:"f(x) = x^2"}),` konvergiert für jede feste
Schrittweite `,e.jsx(n,{children:"\\gamma > 0"}),"."]}),e.jsxs(i.p,{children:["Der Schritt lautet ",e.jsx(n,{children:"x^{(k+1)} = (1 - 2\\gamma)\\,x^{(k)}"}),`. Für
`,e.jsx(n,{children:"\\gamma \\ge 1"})," ist ",e.jsx(n,{children:"|1 - 2\\gamma| \\ge 1"}),": Bei ",e.jsx(n,{children:"\\gamma = 1"}),` springt die
Iteration ewig zwischen `,e.jsx(n,{children:"x^{(0)}"})," und ",e.jsx(n,{children:"-x^{(0)}"}),", für ",e.jsx(n,{children:"\\gamma > 1"}),`
wächst der Betrag sogar. Konvergenz braucht hier `,e.jsx(n,{children:"\\gamma < 1 = 2/L"}),` mit
`,e.jsx(n,{children:"L = 2"})," (",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Auf einer strikt konvexen quadratischen Funktion findet das
Newton-Verfahren das Minimum in einem einzigen Schritt, unabhängig vom
Startpunkt.`}),e.jsxs(i.p,{children:[`Die quadratische Taylor-Approximation einer Quadrik ist die Quadrik
selbst, der Newton-Schritt springt also direkt in deren Minimum
(Beispiel in `,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),"; für ",e.jsx(n,{children:"f(x) = x^2"}),` mit
`,e.jsx(n,{children:"x^{(0)} = 4"}),": ",e.jsx(n,{children:"x^{(1)} = 4 - 8/2 = 0"}),")."]})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["In den KKT-Bedingungen müssen auch die Multiplikatoren ",e.jsx(n,{children:"\\lambda_i"}),` der
Gleichungsnebenbedingungen nichtnegativ sein.`]}),e.jsxs(i.p,{children:["Nur die ",e.jsx(n,{children:"\\mu_j"}),` der Ungleichungen tragen die Vorzeichenbedingung
`,e.jsx(n,{children:"\\mu_j \\ge 0"}),"; die ",e.jsx(n,{children:"\\lambda_i"})," sind frei. ",e.jsx(i.a,{href:"#env-minimieren-auf-einer-geraden",children:"Beispiel 12.5.6"}),` hat
`,e.jsx(n,{children:"\\lambda^\\star = -1"}),", und alles ist in Ordnung."]})]}),e.jsxs(V,{wahr:!0,children:[e.jsx(i.p,{children:`Ist eine Ungleichungs-Nebenbedingung im Optimum inaktiv, so ist ihr
KKT-Multiplikator null.`}),e.jsxs(i.p,{children:["Das ist die Komplementarität ",e.jsx(n,{children:"\\mu_j h_j(\\bx^\\star) = 0"}),` aus
`,e.jsx(i.a,{href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"}),": Aus ",e.jsx(n,{children:"h_j(\\bx^\\star) < 0"})," folgt ",e.jsx(n,{children:"\\mu_j = 0"}),`. In
`,e.jsx(i.a,{href:"#env-eine-box-beschraenkung",children:"Beispiel 12.5.9"})," gilt genau das für die untere Schranke."]})]}),e.jsxs(Ri,{loesung:.1085,toleranz:.005,children:[e.jsxs(i.p,{children:[`Welchen Funktionswert erreicht der Gradientenabstieg im Landkarten-Widget, wenn
wir bei `,e.jsx(n,{children:"(-1;\\ 1)"})," starten?"]}),e.jsxs(i.p,{children:["Er landet in der oberen Mulde bei ",e.jsx(n,{children:"(0;\\ 1{,}0357)"})," mit ",e.jsx(n,{children:"f = 0{,}1085"}),`. Das
globale Minimum liegt bei `,e.jsx(n,{children:"(0;\\ 0)"})," mit ",e.jsx(n,{children:"f = 0"}),`, also gut ein Zehntel tiefer.
Beide Läufe enden mit verschwindendem Gradienten und ohne Warnung – genau das
meint `,e.jsx(i.a,{href:"#env-falsche-konvergenz-und-keiner-warnt",children:"Bemerkung 12.6.2"}),' mit „falscher Konvergenz".']})]}),e.jsxs(V,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"-\\nabla f"}),` die Richtung des steilsten Abstiegs ist, verkleinert
jeder Gradientenabstiegs-Schritt den Funktionswert.`]}),e.jsxs(i.p,{children:["Die Richtung stimmt, solange ",e.jsx(n,{children:"\\nabla f \\neq \\bnull^\\top"}),` ist, aber die
Schrittweite kann den Abstieg überschießen: Auf `,e.jsx(n,{children:"f(x) = x^2"}),` mit
`,e.jsx(n,{children:"\\gamma = 1"})," gilt ",e.jsx(n,{children:"x^{(k+1)} = -x^{(k)}"}),` und der Funktionswert bleibt exakt
gleich, mit `,e.jsx(n,{children:"\\gamma > 1"}),` wächst er. Genau dagegen sichert die
Armijo-Bedingung aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," ab."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath, Scientific Computing, behandelt in Kapitel 5 die
nichtlinearen Gleichungen und in Kapitel 6 die Optimierung, jeweils mit den
hier gezeigten Verfahren; die R-Seite dokumentieren die Hilfeseiten zu
`,e.jsx(i.code,{children:"optimize()"})," und ",e.jsx(i.code,{children:"optim()"}),`. Zum stochastischen Gradientenabstieg führt der
MSc-Kurs `,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),`
weiter.`]})})]})}function $s(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(at,{...r})}):at(r)}const Ls={sections:[{id:"12.1",key:"nichtlineare-gleichungen",title:"Nichtlineare Gleichungen",C:pn(At)},{id:"12.2",key:"optimalitaet",title:"Optimalität und Sattelpunkte",C:pn(Bt)},{id:"12.3",key:"nelder-mead-gradient",title:"Nelder-Mead und Gradientenabstieg",C:pn(es)},{id:"12.4",key:"newton-sgd",title:"Newton, Quasi-Newton und SGD",C:pn(gs)},{id:"12.5",key:"beschraenkt",title:"Beschränkte Optimierung",C:pn(Ms)},{id:"12.6",key:"optim-in-r",title:"Optimierung in R und Zusammenfassung",C:pn($s)}]};export{Ls as default};
