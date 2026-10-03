import{r as B,p as Zn,d as O,j as e,A as De,S as se,k as Gi,q as Fi,F as K,V as Ne,g as T,e as Ke,f as $e,u as Li,t as wn,n as sr,D as Ri,C as d,M as n,E as D,b as F,Q as Ce,i as I,P as sn,o as re,h as Re,G as ne,Z as Ki,v as br,w as mr,L as ut,m as an}from"./index-BGJgxqST.js";import{E as pe,I as Me}from"./Interaktiv-Bbglsg7Y.js";const ci=K.blau,gt=K.gruen,Ei=K.orange,bt=K.violett,dn="#64748b",qi=[{id:"wurzel",label:"x² − 2 auf [1, 2]",f:r=>r*r-2,a0:1,b0:2,xd:[.9,2.1],yd:[-1.4,2.4],nullstellen:[Math.SQRT2]},{id:"kubisch",label:"x³ − 3x + 1 auf [−2, 2]",f:r=>r*r*r-3*r+1,a0:-2,b0:2,xd:[-2.2,2.2],yd:[-3.4,3.4],nullstellen:[-1.879385241572,.347296355334,1.532088886238]}],vn=430,hn=250,te={l:40,r:12,t:10,b:26},We=(r,i=6)=>T(r,i),mt={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function cn(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e"),a=String(Number(t)).split("").map(h=>mt[h]??h).join("");return`${i.replace(".",",")}·10${a}`}function jt(r,i){let t=r.a0,a=r.b0;const h=[];for(;a-t>i&&h.length<60;){const l=t+(a-t)/2;h.push({a:t,b:a,m:l}),Math.sign(r.f(t))===Math.sign(r.f(l))?t=l:a=l}return h.push({a:t,b:a,m:null}),h}function ft(){const[r,i]=B.useState("wurzel"),[t,a]=B.useState(6),[h,l]=B.useState(0),s=qi.find(S=>S.id===r)??qi[0],c=Math.pow(10,-t),p=B.useMemo(()=>jt(s,c),[s,c]),x=Math.min(h,p.length-1),{a:w,b:y,m:o}=p[x],M=o===null,G=o===null?!1:Math.sign(s.f(w))===Math.sign(s.f(o)),f=S=>te.l+(S-s.xd[0])/(s.xd[1]-s.xd[0])*(vn-te.l-te.r),v=S=>te.t+(s.yd[1]-S)/(s.yd[1]-s.yd[0])*(hn-te.t-te.b);let z="";{let R=!1;for(let U=0;U<=360;U++){const Q=s.xd[0]+(s.xd[1]-s.xd[0])*U/360,ie=s.f(Q);if(!Number.isFinite(ie)||ie<s.yd[0]||ie>s.yd[1]){R=!1;continue}z+=`${R?"L":"M"}${f(Q).toFixed(1)} ${v(ie).toFixed(1)}`,R=!0}}const A=Zn(s.xd[0],s.xd[1]),L=Zn(s.yd[0],s.yd[1]),j=A.length>1?A[1]-A[0]:1,b=L.length>1?L[1]-L[0]:1,E=Math.ceil(Math.log2((s.b0-s.a0)/c)),V=w+(y-w)/2,_=s.nullstellen.reduce((S,R)=>Math.abs(R-V)<Math.abs(S-V)?R:S,s.nullstellen[0]);let g="neutral",W=`Klammer nach ${x} ${x===1?"Halbierung":"Halbierungen"}`,C;if(M)g="ok",W="am Ziel",C=`Fertig nach ${p.length-1} Halbierungen. ${O("satz:schrittzahl-der-bisektion")} hatte ⌈log₂((b − a)/ε)⌉ = ${E} vorhergesagt, und das ist keine Schätzung, sondern die exakte Zahl. Zurück geben wir die Mitte ${We(V)} des Endintervalls, dessen Länge ${cn(y-w)} unter ε = ${cn(c)} liegt. Garantiert ist damit ein Fehler von höchstens ${cn((y-w)/2)}; tatsächlich sind es ${cn(Math.abs(V-_))} bis zur Nullstelle ${We(_)}.`;else if(s.id==="kubisch"&&x===0)g="warn",W="drei Nullstellen, eine Klammer",C="Das Startintervall [−2, 2] enthält drei Nullstellen: −1,879385, 0,347296 und 1,532089. Der Vorzeichenwechsel zwischen f(−2) = −1 und f(2) = 3 sagt nur, dass mindestens eine darin liegt. Welche das Verfahren findet, entscheidet der erste Test: Weil f(0) = 1 dasselbe Vorzeichen hat wie f(2), verwerfen wir die rechte Hälfte samt zwei Nullstellen und laufen gegen die linke.";else{const S=o;C=`Die Vorzeichenprobe an der Stelle m = ${We(S)} entscheidet Schritt ${x+1}. Dort ist f(m) = ${We(s.f(S))}, am linken Rand f(a) = ${We(s.f(w))}: ${G?"kein Wechsel zwischen a und m, der Wechsel muss also rechts von m sitzen":"zwischen a und m liegt der Wechsel"}. Wir werfen die ${G?"linke":"rechte"} Hälfte weg und setzen ${G?"a ← m":"b ← m"}. Übrig bleibt eine Klammer der Länge ${cn((y-w)/2)}, und wo immer die Nullstelle darin steckt, von deren Mitte ist sie höchstens ${cn((y-w)/4)} entfernt.`}const H=S=>S?Ke:$e,X=p.slice(0,x+1);return e.jsxs("div",{className:"space-y-3",children:[e.jsxs(De,{children:["Schieben wir den Schrittregler durch und vergleichen die gebrauchte Zahl der Halbierungen mit der Vorhersage von ",O("satz:schrittzahl-der-bisektion"),"."]}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Violett der Graph von f, blau die aktuelle Klammer [a, b] auf der x-Achse, orange der Mittelpunkt m, den dieser Schritt prüft, grün die Nullstellen. Ein Schritt ist genau ein Durchlauf der Schleife aus ",O("algorithmus:bisektionsverfahren"),"."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:qi.map(S=>e.jsxs("button",{type:"button",className:H(S.id===r),onClick:()=>{i(S.id),l(0)},children:["f(x) = ",S.label]},S.id))}),e.jsx(se,{label:"Toleranz ε",value:t,onChange:S=>{a(Math.round(S)),l(0)},min:1,max:10,step:1,fmt:S=>`10^−${Math.round(S)}`}),e.jsx(Gi,{step:x,setStep:l,max:p.length-1,narration:M?`Endintervall [${We(w,8)}; ${We(y,8)}]`:`Prüfpunkt m = ${We(o,6)}`}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{width:vn,height:hn,viewBox:`0 0 ${vn} ${hn}`,role:"img","aria-label":`Der Graph von f mit der Klammer [a, b] nach ${x} Halbierungen und dem gerade geprüften Mittelpunkt.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:te.l,y:te.t,width:vn-te.l-te.r,height:hn-te.t-te.b,fill:"none",stroke:"#cbd5e1",strokeWidth:.8}),A.map(S=>e.jsxs("g",{children:[e.jsx("line",{x1:f(S),x2:f(S),y1:hn-te.b,y2:hn-te.b+3,stroke:dn}),e.jsx("text",{x:f(S),y:hn-te.b+14,textAnchor:"middle",fontSize:9,fill:dn,children:Fi(S,j)})]},`x${S}`)),L.map(S=>e.jsxs("g",{children:[e.jsx("line",{x1:te.l-3,x2:te.l,y1:v(S),y2:v(S),stroke:dn}),e.jsx("text",{x:te.l-5,y:v(S)+3,textAnchor:"end",fontSize:9,fill:dn,children:Fi(S,b)})]},`y${S}`)),e.jsx("line",{x1:te.l,x2:vn-te.r,y1:v(0),y2:v(0),stroke:dn,strokeWidth:1}),e.jsx("text",{x:vn-te.r-4,y:v(0)-5,textAnchor:"end",fontSize:10,fill:dn,children:"x"}),e.jsx("text",{x:te.l+3,y:te.t+10,fontSize:10,fill:dn,children:"f(x)"}),e.jsx("path",{d:z,fill:"none",stroke:bt,strokeWidth:1.8}),s.nullstellen.map(S=>e.jsx("circle",{cx:f(S),cy:v(0),r:4.5,fill:"none",stroke:gt,strokeWidth:2},S)),e.jsx("line",{x1:f(w),x2:f(y),y1:v(0),y2:v(0),stroke:ci,strokeWidth:5,opacity:.55}),[w,y].map((S,R)=>e.jsxs("g",{children:[e.jsx("line",{x1:f(S),x2:f(S),y1:v(0),y2:v(s.f(S)),stroke:ci,strokeDasharray:"3 3",strokeWidth:1}),e.jsx("circle",{cx:f(S),cy:v(s.f(S)),r:3.5,fill:ci}),e.jsx("text",{x:f(S),y:v(0)+16,textAnchor:"middle",fontSize:11,fill:ci,children:R===0?"a":"b"})]},`e${R}`)),o!==null&&e.jsxs("g",{children:[e.jsx("line",{x1:f(o),x2:f(o),y1:v(0),y2:v(s.f(o)),stroke:Ei,strokeWidth:1.4}),e.jsx("circle",{cx:f(o),cy:v(s.f(o)),r:4,fill:Ei}),e.jsx("text",{x:f(o),y:v(0)-8,textAnchor:"middle",fontSize:11,fill:Ei,children:"m"})]})]}),e.jsxs("div",{className:"min-w-56 grow",children:[e.jsx("p",{className:"mb-1 text-xs text-slate-600 dark:text-slate-400",children:"Intervall-Verlauf (jede Zeile ein Schritt)"}),e.jsx("div",{className:"max-h-56 overflow-y-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"sticky top-0 bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsx("th",{className:"px-2 py-1",children:"k"}),e.jsx("th",{className:"px-2 py-1",children:"a"}),e.jsx("th",{className:"px-2 py-1",children:"b"}),e.jsx("th",{className:"px-2 py-1",children:"b − a"})]})}),e.jsx("tbody",{children:X.map((S,R)=>e.jsxs("tr",{className:R===X.length-1?"font-semibold":"",children:[e.jsx("td",{className:"px-2 py-0.5",children:R}),e.jsx("td",{className:"px-2 py-0.5",children:We(S.a)}),e.jsx("td",{className:"px-2 py-0.5",children:We(S.b)}),e.jsx("td",{className:"px-2 py-0.5",children:cn(S.b-S.a)})]},R))})]})})]})]}),e.jsx(Ne,{kind:g,titel:W,children:C})]})}const Un=K.blau,kt=K.gruen,pr=K.orange,wr=K.rot,pt=K.violett,zn="#64748b",wt="⁰¹²³⁴⁵⁶⁷⁸⁹";function dt(r){const i=String(Math.abs(r)).split("").map(t=>wt[Number(t)]).join("");return`10${r<0?"⁻":""}${i}`}const je=(r,i=6)=>{if(Number.isFinite(r)&&Math.abs(r)>=1e5){const[t,a]=r.toExponential(2).split("e");return`${t.replace(".",",").replace(/^-/,"−")}·${dt(Number(a))}`}return T(r,i)},Wi=r=>{if(!Number.isFinite(r))return"∞";if(r===0)return"0";if(Math.abs(r)>=.001&&Math.abs(r)<1e5)return T(r,4);const[i,t]=r.toExponential(3).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·${dt(Number(t))}`},Ii=[{id:"wurzel",label:"x² − 2",formel:"f(x) = x² − 2, f′(x) = 2x",f:r=>r*r-2,df:r=>2*r,xd:[.2,3.4],yd:[-2.4,9.8],start:3,nullstellen:[Math.SQRT2],flach:[]},{id:"kubisch",label:"x³ − 3x + 1",formel:"f(x) = x³ − 3x + 1, f′(x) = 3x² − 3",f:r=>r**3-3*r+1,df:r=>3*r*r-3,xd:[-2.4,2.9],yd:[-4.5,6.5],start:1.05,nullstellen:[-1.879385241572,.347296355334,1.532088886238],flach:[-1,1]},{id:"arctan",label:"arctan x",formel:"f(x) = arctan x, f′(x) = 1/(1 + x²)",f:Math.atan,df:r=>1/(1+r*r),xd:[-6,6],yd:[-1.8,1.8],start:1.5,nullstellen:[0],flach:[]}],vr=1.3917452,Qe=440,Oe=270,Le=42,Sn=12,xn=10,on=26,vt=12;function zt(){const[r,i]=B.useState("wurzel"),t=Ii.find(u=>u.id===r)??Ii[0],[a,h]=B.useState(t.start),[l,s]=B.useState(0),c=u=>Le+(u-t.xd[0])/(t.xd[1]-t.xd[0])*(Qe-Le-Sn),p=u=>xn+(t.yd[1]-u)/(t.yd[1]-t.yd[0])*(Oe-xn-on),x=u=>u>=t.xd[0]&&u<=t.xd[1],w=u=>wn(u,t.xd[0],t.xd[1]),y=u=>wn(u,t.yd[0],t.yd[1]),o=B.useMemo(()=>{const u=[a];for(let N=0;N<vt;N++){const m=u[u.length-1],k=t.df(m);if(!Number.isFinite(k)||Math.abs(k)<1e-13)break;const q=m-t.f(m)/k;if(!Number.isFinite(q)||Math.abs(q)>1e12){u.push(q);break}u.push(q)}return u},[t,a]),M=Math.min(l,o.length-1),G=o[M],f=t.f(G),v=t.df(G),z=Math.abs(v)>1e-13?G-f/v:NaN,A=Li({feld:{x0:Le,y0:xn,w:Qe-Le-Sn,h:Oe-xn-on},welt:{x0:t.xd[0],x1:t.xd[1],y0:t.yd[0],y1:t.yd[1]},clamp:([u])=>[wn(u,t.xd[0],t.xd[1]),0],snap:[.05,0],greifPosition:()=>[a,0],onDrag:([u])=>{h(Math.round(u*20)/20),s(0)}}),L=B.useMemo(()=>{let u="",N=!1;for(let m=0;m<=400;m++){const k=t.xd[0]+(t.xd[1]-t.xd[0])*m/400,q=t.f(k);if(!Number.isFinite(q)||q<t.yd[0]||q>t.yd[1]){N=!1;continue}u+=`${N?"L":"M"}${c(k).toFixed(1)} ${p(q).toFixed(1)}`,N=!0}return u},[t]),j=Zn(t.xd[0],t.xd[1]),b=Zn(t.yd[0],t.yd[1]),E=j.length>1?j[1]-j[0]:1,V=b.length>1?b[1]-b[0]:1,_=o[o.length-1],g=t.nullstellen.reduce((u,N)=>Math.abs(N-_)<Math.abs(u-_)?N:u,t.nullstellen[0]),W=o.map(u=>Math.abs(u-g)),C=W.findIndex(u=>u<1e-10),H=C>=0?C:o.length-1,X=!Number.isFinite(_)||Math.abs(_-g)>1,S=Math.abs(z-G);let R,U,Q;Math.abs(v)<1e-13?(R="fail",U="die Tangente ist waagerecht",Q=`An dieser Stelle ist f′ = 0, die Tangente schneidet die x-Achse also nirgends, und ${O("algorithmus:newton-raphson-verfahren-fuer")} lässt sich nicht ausführen. Genau diese Voraussetzung steht dort in der Bedingung „solange f′(x⁽ᵏ⁾) ≠ 0".`):t.id==="arctan"&&Math.abs(a)>vr?(R="fail",U="die Folge läuft auseinander",Q=`Bei arctan flacht die Kurve nach außen ab, die Tangente wird also immer flacher und ihr Schnittpunkt mit der Achse immer weiter entfernt. Ab |x⁽⁰⁾| > ${je(vr,4)} überholt jeder Schritt den vorigen: Aus ${je(a,2)} wird ${je(o[1]??NaN,4)}, dann ${je(o[2]??NaN,4)}, und die Beträge wachsen. Es gibt hier nur EINE Nullstelle, und trotzdem findet Newton sie nicht, genau die Warnung von ${O("bemerkung:quadratische-konvergenz")}: Die quadratische Konvergenz ist eine LOKALE Aussage.`):M===0&&S>.35*(t.xd[1]-t.xd[0])&&Math.abs(v)<1?(R="warn",U="ein sehr weiter erster Schritt",Q=`Am Startpunkt ist f′ = ${je(v,4)} und damit betragsmäßig klein: Die Tangente liegt fast waagerecht, und ihr Schnittpunkt mit der Achse rutscht weit weg. Der erste Schritt landet bei ${je(z,4)}, also ${je(S,3)} vom Start entfernt. Die Iteration erholt sich hier zwar, aber die Richtung, in die sie zuerst springt, hat mit der nächstgelegenen Nullstelle nichts zu tun.`):X?(R="fail",U="davongelaufen",Q=`Die Iterierten wachsen über jede Schranke; nach ${o.length-1} Schritten steht die Folge bei ${je(_,2)}. Newton hat keine Abstiegsgarantie wie die Bisektion, sondern nur eine lokale Aussage.`):W[M]<1e-10?(R="ok",U=`am Ziel nach ${H} Schritten`,Q=`Die Iteration steht auf der Nullstelle ${je(g)}. Die Fehlerspalte zeigt, was ${O("bemerkung:quadratische-konvergenz")} mit quadratischer Konvergenz meint: Der Quotient e_{k+1}/e_k² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Bei f(x) = x² − 2 läuft dieser Quotient gegen f″/(2f′) = 0,3536. Zum Vergleich: Die Bisektion aus ${O("satz:schrittzahl-der-bisektion")} gewinnt pro Schritt ein Bit, also rund 0,3 Dezimalstellen.`):(R="neutral",U=`Schritt ${M} von ${o.length-1}`,Q=`Die Tangente im Punkt (${je(G,4)}; ${je(f,4)}) hat die Steigung ${je(v,4)} und trifft die x-Achse bei ${je(z,6)}. Das ist die nächste Iterierte, und der Bruch in (${sr("eq:newton-raphson-verfahren-fuer")}) sagt dasselbe in Zahlen: Wir teilen die abzubauende Höhe durch die Rate, mit der die Tangente sie abbaut. Der Abstand zur Nullstelle ${je(g)} beträgt gerade ${Wi(W[M])}.`);const ie=u=>u?Ke:$e,he=o.slice(0,M+1).map((u,N)=>({i:N,v:u,fv:t.f(u),e:W[N]}));return e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Ziehen wir den Startpunkt auf der x-Achse und schauen, wohin der erste Schritt springt."}),e.jsx("div",{className:"flex flex-wrap gap-2 text-sm",children:Ii.map(u=>e.jsxs("button",{type:"button","aria-pressed":u.id===r,className:ie(u.id===r),onClick:()=>{i(u.id),h(u.start),s(0)},children:["f(x) = ",u.label]},u.id))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 max-w-full",children:e.jsxs("svg",{viewBox:`0 0 ${Qe} ${Oe}`,width:Qe,height:Oe,role:"img","aria-label":`Der Graph von ${t.formel} mit der Tangente im Punkt x⁽${M}⁾ = ${je(G,3)} und ihrem Schnittpunkt mit der x-Achse.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",...A.svgProps,children:[e.jsx("rect",{x:Le,y:xn,width:Qe-Le-Sn,height:Oe-xn-on,fill:"none",stroke:"#cbd5e1",strokeWidth:.8}),j.map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:c(u),x2:c(u),y1:Oe-on,y2:Oe-on+3,stroke:zn}),e.jsx("text",{x:c(u),y:Oe-on+14,textAnchor:"middle",fontSize:9,fill:zn,children:Fi(u,E)})]},`x${u}`)),b.map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:Le-3,x2:Le,y1:p(u),y2:p(u),stroke:zn}),e.jsx("text",{x:Le-5,y:p(u)+3,textAnchor:"end",fontSize:9,fill:zn,children:Fi(u,V)})]},`y${u}`)),e.jsx("line",{x1:Le,x2:Qe-Sn,y1:p(0),y2:p(0),stroke:zn,strokeWidth:1}),e.jsx("text",{x:Qe-Sn-4,y:p(0)-5,textAnchor:"end",fontSize:10,fill:zn,children:"x"}),e.jsx("path",{d:L,fill:"none",stroke:pt,strokeWidth:1.9}),t.nullstellen.filter(x).map(u=>e.jsx("circle",{cx:c(u),cy:p(0),r:4.5,fill:"none",stroke:kt,strokeWidth:2},u)),t.flach.filter(x).map(u=>e.jsx("line",{x1:c(u),x2:c(u),y1:xn,y2:Oe-on,stroke:wr,strokeWidth:1,strokeDasharray:"3 4",opacity:.6},`fl${u}`)),o.slice(0,M+1).map((u,N)=>e.jsx("circle",{cx:c(w(u)),cy:p(0),r:N===M?4.5:2.6,fill:Un,opacity:N===M?1:.5},`p${N}`)),Number.isFinite(v)&&Math.abs(v)>1e-13&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:c(t.xd[0]),y1:p(y(f+v*(t.xd[0]-G))),x2:c(t.xd[1]),y2:p(y(f+v*(t.xd[1]-G))),stroke:pr,strokeWidth:1.6}),e.jsx("line",{x1:c(w(G)),y1:p(y(f)),x2:c(w(G)),y2:p(0),stroke:Un,strokeWidth:.9,strokeDasharray:"2 3"}),e.jsx("circle",{cx:c(w(G)),cy:p(y(f)),r:3.5,fill:Un}),x(z)&&e.jsx("circle",{cx:c(z),cy:p(0),r:4,fill:"none",stroke:pr,strokeWidth:2}),!x(z)&&e.jsxs("text",{x:z>t.xd[1]?Qe-Sn-4:Le+4,y:p(0)-8,textAnchor:z>t.xd[1]?"end":"start",fontSize:10,fill:wr,children:["nächste Iterierte außerhalb (",je(z,2),")"]})]}),e.jsx(Ri,{x:c(w(a)),y:p(0),farbe:Un,r:5,aktiv:A.dragging==="x0",...A.handleProps("x0")})]})}),e.jsxs("div",{className:"min-w-56 grow space-y-2",children:[e.jsx(se,{label:"Startwert x⁽⁰⁾",value:a,onChange:u=>{h(Math.round(u*20)/20),s(0)},min:t.xd[0],max:t.xd[1],step:.05,accent:Un}),e.jsx(Gi,{step:M,setStep:s,max:o.length-1,narration:`x⁽${M}⁾ = ${je(G,8)}`}),e.jsx("p",{className:"font-mono text-xs",children:t.formel}),e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left",children:"k"}),e.jsx("th",{className:"pr-2",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-2",children:"f(x⁽ᵏ⁾)"}),e.jsx("th",{children:"|x⁽ᵏ⁾ − x*|"})]})}),e.jsx("tbody",{children:he.map(u=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-left",children:u.i}),e.jsx("td",{className:"pr-2",children:je(u.v,8)}),e.jsx("td",{className:"pr-2",children:Wi(Math.abs(u.fv))}),e.jsx("td",{children:Wi(u.e)})]},u.i))})]})]})]}),e.jsx(Ne,{kind:R,titel:U,children:Q})]})}const zr=K.blau,St=K.gruen,xi="#94a3b8",Vi=[{id:"gutartig",label:"A = (4 1; 1 3)",A:[[4,1],[1,3]],x0:[1.7,.6],gammaOpt:2/7,rhoOpt:Math.sqrt(5)/7,gammaMax:2/((7+Math.sqrt(5))/2),kurz:"symmetrisch, Eigenwerte 4,618 und 2,382"},{id:"drehung",label:"A = (1 −2; 2 1)",A:[[1,-2],[2,1]],x0:[1.7,.6],gammaOpt:.2,rhoOpt:2/Math.sqrt(5),gammaMax:.4,kurz:"komplexe Eigenwerte 1 ± 2i, also ein Drehanteil"},{id:"kondition",label:"A = diag(1, 10)",A:[[1,0],[0,10]],x0:[1.8,1.4],gammaOpt:2/11,rhoOpt:9/11,gammaMax:.2,kurz:"Eigenwerte 1 und 10, Kondition 10"}],yt=30,ce=290,yn=2.4;function Mt(r){const i=r[0][0]**2+r[1][0]**2,t=r[0][0]*r[0][1]+r[1][0]*r[1][1],a=r[0][1]**2+r[1][1]**2,h=i+a,l=i*a-t*t;return Math.sqrt(h/2+Math.sqrt(Math.max(0,h*h/4-l)))}const ee=(r,i=3)=>T(r,i),Dt={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function Cn(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e"),a=String(Number(t)).split("").map(h=>Dt[h]??h).join("");return`${i.replace(".",",")}·10${a}`}function Nt({zeigeGrenze:r=!1}){const[i,t]=B.useState("gutartig"),[a,h]=B.useState(.25),l=Vi.find(b=>b.id===i)??Vi[0],s=l.A,c=[[1-a*s[0][0],-a*s[0][1]],[-a*s[1][0],1-a*s[1][1]]],p=Mt(c),x=[l.x0];for(let b=0;b<yt;b++){const[E,V]=x[x.length-1],_=c[0][0]*E+c[0][1]*V,g=c[1][0]*E+c[1][1]*V;if(!Number.isFinite(_)||!Number.isFinite(g))break;x.push([_,g])}const w=x[x.length-1],y=Math.hypot(w[0],w[1]),o=Math.hypot(l.x0[0],l.x0[1]),M=x.length-1,G=b=>(Math.max(-yn,Math.min(yn,b))+yn)/(2*yn)*ce;let f="";x.forEach((b,E)=>{f+=`${E===0?"M":"L"}${G(b[0]).toFixed(1)} ${(ce-G(b[1])).toFixed(1)}`});const v=x.some(b=>Math.abs(b[0])>yn||Math.abs(b[1])>yn);let z,A,L;if(p>=1){z="fail",A="ρ ≥ 1: die Schranke trägt nicht mehr";const b=y>1.001*o;L=`ρ = ${ee(p)} ist nicht kleiner als 1, damit sagt ${O("satz:konvergenzrate-der-fixpunktiteration")} nichts mehr zu. Nach ${M} Schritten steht der Abstand zum Fixpunkt bei ${Cn(y)}, gestartet sind wir bei ${ee(o)}. `+(b?"Der Fehler wächst also, und der Zuwachs pro Schritt nähert sich dem Faktor ρ. ":"Gewachsen ist er nicht: Bei ρ = 1 hält die Iteration den Fehler in mindestens einer Richtung genau fest, und weiter als bis dorthin kommt sie nicht. ")+(r?`Zusammen läuft die Iteration nur für γ < ${ee(l.gammaMax)}.`:"Zusammen läuft die Iteration nur für hinreichend kleine γ.")}else Math.abs(a-l.gammaOpt)<.011&&p<=1.05*l.rhoOpt?(z="ok",A="nahe der besten Schrittweite",L=`Das ist ungefähr die beste Schrittweite für dieses System: ρ = ${ee(p)} liegt höchstens fünf Prozent über dem erreichbaren Minimum ${ee(l.rhoOpt)}, das bei γ* ≈ ${ee(l.gammaOpt)} steht. Nach ${M} Schritten ist der Abstand von ${ee(o)} auf ${Cn(y)} gefallen. Weiter weg von γ* wird es in beide Richtungen schlechter, nach links wegen zu kleiner Schritte, nach rechts wegen des Überschießens.`):a<l.gammaOpt?(z="neutral",A="γ zu klein",L=`ρ = ${ee(p)} < 1, die Folge läuft also zusammen, aber gemächlich: Nach ${M} Schritten steht der Abstand bei ${Cn(y)}, gestartet sind wir bei ${ee(o)}. Jeder Schritt korrigiert nur einen Bruchteil γ des Residuums; das ist der Fall „γ zu klein“. Bis γ ≈ ${ee(l.gammaOpt)} lohnt sich jedes Stück nach rechts.`):(z="warn",A="γ über der besten Wahl",L=`γ liegt bereits über der besten Wahl γ* ≈ ${ee(l.gammaOpt)}, und das kostet: ρ ist mit ${ee(p)} wieder größer als das erreichbare Minimum ${ee(l.rhoOpt)}. Die Folge läuft noch zusammen, nach ${M} Schritten steht der Abstand bei ${Cn(y)}. `+(r?`Jenseits von γ = ${ee(l.gammaMax)} kippt sie ganz.`:"Jenseits einer Schwelle kippt sie ganz."));const j=b=>b?Ke:$e;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Schieben wir γ für jedes der drei Systeme nach oben, bis die Spirale nach außen läuft."}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Blau der Weg der ersten 30 Schritte, grün der Fixpunkt x* = 0. Alle drei A sind affin, also ist ρ = ‖I − γA‖₂ nach dem affinen Fall im Beweis von ",O("satz:konvergenzrate-der-fixpunktiteration")," eine echte Schranke ohne Restterm."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Vi.map(b=>e.jsx("button",{type:"button",className:j(b.id===i),onClick:()=>t(b.id),children:b.label},b.id))}),e.jsx(se,{label:"γ",value:a,onChange:h,min:.01,max:.6,step:.01,fmt:b=>ee(b,2)}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{width:ce,height:ce,viewBox:`0 0 ${ce} ${ce}`,role:"img","aria-label":`Der Weg der Fixpunktiteration für ${l.label} bei γ = ${ee(a,2)}; ρ = ${ee(p)}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:0,y1:ce/2,x2:ce,y2:ce/2,stroke:xi,strokeWidth:.8}),e.jsx("line",{x1:ce/2,y1:0,x2:ce/2,y2:ce,stroke:xi,strokeWidth:.8}),[-2,-1,1,2].map(b=>e.jsxs("g",{children:[e.jsx("text",{x:G(b),y:ce/2+12,fontSize:9,fill:xi,textAnchor:"middle",children:T(b,0)}),e.jsx("text",{x:ce/2+5,y:ce-G(b)+3,fontSize:9,fill:xi,children:T(b,0)})]},`t${b}`)),e.jsx("text",{x:ce-6,y:ce/2-6,fontSize:10,fill:"#64748b",textAnchor:"end",children:"x₁"}),e.jsx("text",{x:ce/2+6,y:12,fontSize:10,fill:"#64748b",children:"x₂"}),e.jsx("path",{d:f,fill:"none",stroke:zr,strokeWidth:1.3,opacity:.75}),x.map((b,E)=>e.jsx("circle",{cx:G(b[0]),cy:ce-G(b[1]),r:E===0?4.5:2.6,fill:zr,opacity:Math.max(.25,1-E*.025)},E)),e.jsx("circle",{cx:ce/2,cy:ce/2,r:5,fill:"none",stroke:St,strokeWidth:2.2})]}),e.jsxs("div",{className:"min-w-56 grow space-y-1 text-sm",children:[e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:l.kurz}),e.jsxs("p",{className:"font-mono text-xs",children:["I − γA = (",ee(c[0][0],2)," ",ee(c[0][1],2),"; ",ee(c[1][0],2)," ",ee(c[1][1],2),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["ρ = ‖I − γA‖₂ = ",ee(p)]}),e.jsxs("p",{className:"font-mono text-xs",children:["‖x⁽⁰⁾ − x*‖ = ",ee(o)," · nach ",M," Schritten ",Cn(y)]}),e.jsxs("p",{className:"font-mono text-xs",children:["bestes γ ≈ ",ee(l.gammaOpt),r?` · Divergenz ab γ > ${ee(l.gammaMax)}`:""]}),v&&e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:"Ein Teil des Weges liegt außerhalb des gezeigten Fensters [−2,4; 2,4]²; diese Punkte sind an den Rand gelegt."})]})]}),e.jsx(Ne,{kind:z,titel:A,children:L})]})}function Sr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Was wir mitbringen"}),`
`,e.jsxs(i.p,{children:["Aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),` kommt der
`,e.jsx(d,{id:"gradient",children:"Gradient"})," ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}"}),` einer Funktion
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`. Wo er nicht verschwindet, zeigt sein Transponiertes in
die Richtung des steilsten Anstiegs (`,e.jsx(d,{id:"env:richtung-des-staerksten-anstiegs",href:"?k=10-differentialrechnung#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`);
der Gradient ist in diesem Skript ein Zeilenvektor, eine Richtung im `,e.jsx(n,{children:"\\R^n"}),`
eine Spalte. Aus `,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),` kommt die
`,e.jsx(d,{id:"hessian-matrix",children:"Hesse-Matrix"})," ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),` der zweiten
Ableitungen, die die Krümmung misst. Aus `,e.jsx(i.a,{href:"?k=11-konvexitaet",children:"Kapitel 11"}),` kommt die Konvexität
von Mengen und Funktionen; sie entscheidet später, ob ein gefundenes Minimum
auch das globale ist.`]}),`
`,e.jsxs(i.p,{children:["Dazu zwei Bausteine aus der Grundvorlesung. ",e.jsx(i.em,{children:"Notwendig"}),` für ein Extremum einer
differenzierbaren Funktion in einem inneren Punkt des Definitionsbereichs ist
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} = 0"}),` beziehungsweise
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),". ",e.jsx(i.em,{children:"Hinreichend"}),` für ein Minimum ist
das zusammen mit `,e.jsx(n,{children:"\\corange{f''(x^\\star)} > 0"}),`, im Mehrdimensionalen mit einer
`,e.jsx(d,{id:"positive-definite",children:"positiv definiten"})," Hesse-Matrix."]}),`
`,e.jsxs(i.p,{children:["Der Farbcode dieses Kapitels: blau die Iterierten ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),` und die
Wege, die sie zurücklegen, grün das Ziel `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, orange die
Ableitungsobjekte und die aus ihnen gebauten Schritte, rot die Nebenbedingungen
und die Warnzeichen für Divergenz.`]}),`
`,e.jsx(i.h3,{children:"Drei Sorten von Problemen"}),`
`,e.jsx(i.p,{children:"Das Kapitel behandelt drei eng verwandte Aufgaben."}),`
`,e.jsxs(D,{kind:"Definition",label:"12.1.1 (Nichtlineares Gleichungssystem)",id:"env-nichtlineares-gleichungssystem",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),". Ein ",e.jsx(i.em,{children:"nichtlineares Gleichungssystem"}),` ist die
Aufgabe, ein `,e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in \\R^n"})," zu finden mit"]}),e.jsx(F,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = m = 1"})," sprechen wir von einer ",e.jsx(i.em,{children:"Nullstelle"})," (root) von ",e.jsx(n,{children:"f"}),"."]})]}),`
`,e.jsxs(i.p,{children:['Der Zusatz „nichtlinear" grenzt gegen ',e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"})," ab: Ist ",e.jsx(n,{children:"f"}),`
affin, also `,e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"}),`, so ist das ein
`,e.jsx(d,{id:"linear-system",children:"lineares Gleichungssystem"}),`, und dafür haben wir fertige
Zerlegungen. Für nichtlineares `,e.jsx(n,{children:"f"}),` gibt es im Allgemeinen kein Verfahren, das
die Lösung in endlich vielen Schritten liefert.`]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.1.2 (Unbeschränktes und beschränktes Optimierungsproblem)",id:"env-unbeschraenktes-und-beschraenktes",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),". Ein ",e.jsx(i.em,{children:"unbeschränktes Optimierungsproblem"}),`
(unconstrained optimization) ist die Aufgabe`]}),e.jsx(F,{children:`\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\R^n} \\cblue{f(\\bx)}
\\qquad \\text{beziehungsweise} \\qquad
\\cgreen{\\bx^\\star} \\in \\argmax_{\\bx \\in \\R^n} \\cblue{f(\\bx)} .`}),e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"beschränktes Optimierungsproblem"}),` (constrained optimization) schränkt die
Suche auf eine Menge `,e.jsx(n,{children:"\\cred{S} \\subseteq \\R^n"})," ein,"]}),e.jsx(F,{children:"\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\cred{S}} \\cblue{f(\\bx)} ,"}),e.jsxs(i.p,{children:["wobei die ",e.jsx(i.em,{children:"Nebenbedingungen"}),` typischerweise selbst durch Funktionen beschrieben
werden:`]}),e.jsx(F,{children:`\\cred{S} = \\{\\bx \\in \\R^n \\colon \\cred{g_i(\\bx)} = 0,\\ i = 1, \\dots, m\\}
\\qquad \\text{oder} \\qquad
\\cred{S} = \\{\\bx \\in \\R^n \\colon \\cred{h_j(\\bx)} \\le 0,\\ j = 1, \\dots, p\\}`}),e.jsxs(i.p,{children:["oder eine Kombination aus beidem. Die Funktion ",e.jsx(n,{children:"\\cblue{f}"}),` heißt
`,e.jsx(d,{id:"objective-function",children:"Zielfunktion"}),"."]}),e.jsxs(i.p,{children:["„Beschränkt“ bedeutet hier ",e.jsx(i.em,{children:"mit Nebenbedingungen"})," und nicht, dass ",e.jsx(n,{children:"S"}),` eine
beschränkte Menge sein muss. Eindeutiger ist deshalb auch die Bezeichnung
`,e.jsx(i.em,{children:"Optimierung mit Nebenbedingungen"}),"."]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.3 (Zwei Probleme, dieselben Verfahren)",id:"env-zwei-probleme-ein-werkzeugkasten",children:[e.jsxs(i.p,{children:[`Maximieren und Minimieren sind dieselbe Aufgabe, denn
`,e.jsx(n,{children:"\\argmax_{\\bx} \\cblue{f(\\bx)} = \\argmin_{\\bx} \\bigl(-\\cblue{f(\\bx)}\\bigr)"}),`. Wir
reden deshalb ab jetzt nur noch über Minima.`]}),e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\cblue{f}"})," differenzierbar, so muss im Minimum eines ",e.jsx(i.em,{children:"unbeschränkten"}),`
Problems `,e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})} = \\bnull^\\top"}),` gelten. Das ist
ein nichtlineares Gleichungssystem für die Funktion
`,e.jsx(n,{children:"\\bx \\mapsto \\corange{\\nabla f(\\bx)}^\\top"})," von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^n"}),`; mit
Nebenbedingungen tritt eine andere Bedingung an seine Stelle (`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),`).
Jedes Verfahren zur Nullstellensuche taugt damit auch zur Suche kritischer
Punkte, und deshalb steht die Nullstellensuche am Anfang.`]}),e.jsxs(i.p,{children:["Alle drei Probleme lösen wir ",e.jsx(i.em,{children:"iterativ"}),`: Wir starten irgendwo und bauen eine
Folge `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}, \\cblue{\\bx^{(1)}}, \\cblue{\\bx^{(2)}}, \\dots"}),`, die
hoffentlich gegen `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` läuft. Dieselbe Bauform kennen wir schon
von der Potenzmethode (`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.1",children:"Abschnitt 8.1"}),") und den ",e.jsx(d,{id:"env:korrekturiteration",children:"Korrekturiterationen"}),`
für lineare Gleichungssysteme (`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Warum Optimierung?"}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.1.4 (Optimierungsprobleme in Statistik und maschinellem Lernen)",id:"env-optimierungsprobleme-in-statistik-und",children:[e.jsx(i.p,{children:"Ein großer Teil beider Fächer besteht daraus, ein Minimum zu suchen."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Maximum-Likelihood-Schätzung."}),` Für unabhängige, identisch verteilte
Beobachtungen `,e.jsx(n,{children:"y_1, \\dots, y_n"})," mit Dichte ",e.jsx(n,{children:"f_Y(y \\mid \\btheta)"}),` ist der
`,e.jsx(d,{id:"likelihood",children:"ML-Schätzer"})]}),e.jsx(F,{children:`\\wh{\\btheta}_{\\mathrm{ML}}
= \\argmax_{\\btheta} \\sum_{i=1}^{n} \\log f_Y(y_i \\mid \\btheta) .`}),e.jsxs(i.p,{children:["Nur in Lehrbuchfällen wie der Normalverteilung lässt sich das nach ",e.jsx(n,{children:"\\btheta"}),`
auflösen; sonst bleibt die Iteration.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Überwachtes Lernen."})," Mit einer Verlustfunktion ",e.jsx(n,{children:"L(y, \\wh y)"}),` und Vorhersagen
`,e.jsx(n,{children:"\\wh y_i := p_{\\btheta}(\\bx_i)"})," aus Merkmalen ",e.jsx(n,{children:"\\bx_i"})," lautet die Aufgabe"]}),e.jsx(F,{children:"\\wh{\\btheta} = \\argmin_{\\btheta} \\sum_{i=1}^{n} L\\bigl(y_i, p_{\\btheta}(\\bx_i)\\bigr) ."}),e.jsxs(i.p,{children:["Für die ",e.jsx(d,{id:"linear-regression",children:"lineare Regression"}),` mit quadratischem Verlust ist
das `,e.jsx(n,{children:"\\wh{\\bbeta} = \\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),`, und
dieses eine Problem konnten wir in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` noch geschlossen
lösen. Steht bei `,e.jsx(n,{children:"p_{\\btheta}"}),` dagegen ein
`,e.jsx(d,{id:"neural-network",children:"neuronales Netz"}),", so ist ",e.jsx(n,{children:"\\btheta"}),` hochdimensional, die
Zielfunktion nicht konvex, und es bleibt nur die Iteration.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Regularisierte Regression."})," Ridge und Lasso hängen einen Strafterm an:"]}),e.jsx(F,{children:`\\wh{\\bbeta} = \\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2
+ \\lambda \\left\\|\\bbeta\\right\\|_p^p ,
\\qquad p = 2 \\ \\text{(Ridge)}, \\quad p = 1 \\ \\text{(Lasso)} .`}),e.jsx(i.p,{children:"Dieselbe Aufgabe lässt sich als beschränktes Problem schreiben,"}),e.jsx(F,{children:`\\argmin_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2
\\quad \\text{so dass} \\quad \\cred{\\left\\|\\bbeta\\right\\|_p \\le c} ,`}),e.jsxs(i.p,{children:[`und daran lässt sich die Geometrie ablesen: Liegt der KQ-Schätzer außerhalb
der `,e.jsx(n,{children:"p"}),"-Norm-Kugel vom Radius ",e.jsx(n,{children:"\\cred{c}"}),`, so ist die Lösung der Punkt, an dem
eine um ihn wachsende `,e.jsx(d,{id:"level-sets",children:"Niveaumenge"}),` des
Kleinste-Quadrate-Verlusts die Kugel zuerst berührt. Bei `,e.jsx(n,{children:"p = 1"}),` ist das oft
eine Ecke auf einer Achse; deshalb setzt Lasso Koeffizienten exakt auf null
(`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"). Zu jeder penalisierten Lösung gehört ein Budget ",e.jsx(n,{children:"\\cred c"}),`,
das dieselbe Lösung liefert, umgekehrt aber nur, solange die Nebenbedingung
bindet (`,e.jsx(i.a,{href:"#env-kkt-stationaritaet-fuer-ridge",children:"Beispiel 12.5.10"}),`). Im Strafterm steht die
`,e.jsx(n,{children:"p"}),"-te ",e.jsx(i.em,{children:"Potenz"})," der Norm; für ",e.jsx(n,{children:"p = 2"}),` ist das
`,e.jsx(n,{children:"\\lambda\\left\\|\\bbeta\\right\\|_2^2"}),`, die Form mit der geschlossenen Lösung
`,e.jsx(n,{children:"\\wh{\\bbeta} = (\\bX^\\top\\bX + \\lambda\\bI_p)^{-1}\\bX^\\top\\by"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ridge-regression",children:"Beispiel 10.6.6"}),`. In der Nebenbedingung spielt die Potenz keine
Rolle, weil `,e.jsx(n,{children:"\\left\\|\\bbeta\\right\\|_2 \\le c"}),` und
`,e.jsx(n,{children:"\\left\\|\\bbeta\\right\\|_2^2 \\le c^2"})," dieselbe Menge beschreiben."]})]}),`
`,e.jsxs(i.h3,{children:["Wann hat ",e.jsx(n,{children:"f(x) = 0"})," überhaupt eine Lösung?"]}),`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon [a, b] \\to \\R"}),". Welche Aussagen über die Lösungen von ",e.jsx(n,{children:"f(x) = 0"}),`
stimmen?`]}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," stetig, so hat ",e.jsx(n,{children:"f(x) = 0"})," genau eine Lösung."]}),e.jsxs(i.p,{children:[`Stetigkeit allein liefert weder Existenz noch Eindeutigkeit. Die konstante
Funktion `,e.jsx(n,{children:"f \\equiv 1"}),` ist stetig und hat gar keine Nullstelle, die konstante
Funktion `,e.jsx(n,{children:"f \\equiv 0"}),` ist stetig und hat lauter Nullstellen. Stetigkeit
hilft erst in Verbindung mit einem Vorzeichenwechsel.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Gilt ",e.jsx(n,{children:"f(a) < 0"})," und ",e.jsx(n,{children:"f(b) > 0"}),", so hat ",e.jsx(n,{children:"f(x) = 0"})," mindestens eine Lösung."]}),e.jsxs(i.p,{children:["Das wäre der ",e.jsx(d,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),`, aber der
verlangt Stetigkeit, und die steht in der Voraussetzung nicht. Ein
Gegenbeispiel ist die Sprungfunktion auf `,e.jsx(n,{children:"[-1, 1]"})," mit ",e.jsx(n,{children:"f(x) = -1"})," für ",e.jsx(n,{children:"x < 0"}),`
und `,e.jsx(n,{children:"f(x) = 1"})," für ",e.jsx(n,{children:"x \\ge 0"}),`: Die Vorzeichen an den Rändern wechseln, eine
Nullstelle gibt es nicht.`]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," streng monoton, so hat ",e.jsx(n,{children:"f(x) = 0"})," höchstens eine Lösung."]}),e.jsxs(i.p,{children:["Streng monotone Funktionen sind injektiv: Aus ",e.jsx(n,{children:"x_1 < x_2"}),` folgt
`,e.jsx(n,{children:"f(x_1) \\neq f(x_2)"}),". Der Wert ",e.jsx(n,{children:"0"}),` wird also höchstens einmal angenommen. Für die
Existenz sagt das nichts, dafür brauchen wir Stetigkeit und einen
Vorzeichenwechsel.`]})]})]}),`
`,e.jsx(D,{kind:"Satz",label:"12.1.5 (Existenz und Eindeutigkeit einer Nullstelle)",id:"env-existenz-und-eindeutigkeit-einer",children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon [a, b] \\to \\R"}),` streng monoton und stetig mit
`,e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} \\le 0"}),". Dann hat die Gleichung ",e.jsx(n,{children:"f(x) = 0"}),` genau
eine Lösung `,e.jsx(n,{children:"\\cgreen{x^\\star} \\in [a, b]"}),"."]})}),`
`,e.jsxs(sn,{children:[e.jsx(re,{why:e.jsxs(e.Fragment,{children:["strenge Monotonie heißt: ",e.jsx(n,{children:"x_1 < x_2"})," erzwingt ",e.jsx(n,{children:"f(x_1) < f(x_2)"})," (steigend) oder ",e.jsx(n,{children:"f(x_1) > f(x_2)"})," (fallend), in beiden Fällen ungleiche Werte"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Höchstens eine Lösung."})," Sind ",e.jsx(n,{children:"x_1 < x_2"})," zwei Punkte aus ",e.jsx(n,{children:"[a, b]"}),`, so ist
`,e.jsx(n,{children:"f(x_1) \\neq f(x_2)"}),", weil ",e.jsx(n,{children:"f"})," streng monoton ist. Der Wert ",e.jsx(n,{children:"0"}),` kann also
höchstens an einer Stelle angenommen werden.`]})}),e.jsx(re,{why:e.jsx(e.Fragment,{children:"ein Produkt reeller Zahlen ist genau dann null, wenn einer der Faktoren null ist"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Randfall."})," Ist ",e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} = 0"}),`, so ist
`,e.jsx(n,{children:"\\cblue{f(a)} = 0"})," oder ",e.jsx(n,{children:"\\cblue{f(b)} = 0"}),`, und wir sind bereits fertig: Die
Nullstelle liegt am Rand.`]})}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:["im anderen Fall betrachten wir ",e.jsx(n,{children:"-f"}),"; diese Funktion ist ebenfalls stetig und streng monoton und hat dieselben Nullstellen"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Hauptfall."})," Sei nun ",e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} < 0"}),`, die
beiden Randwerte haben also verschiedene Vorzeichen. Ohne Beschränkung der
Allgemeinheit nehmen wir `,e.jsx(n,{children:"\\cblue{f(a)} < 0 < \\cblue{f(b)}"})," an."]})}),e.jsx(re,{why:e.jsx(e.Fragment,{children:"der Zwischenwertsatz gilt für stetige Funktionen auf einem Intervall; ohne Stetigkeit ist er falsch, wie die Sprungfunktion aus dem Quiz zeigt"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Existenz."})," Weil ",e.jsx(n,{children:"f"}),` stetig ist, liefert der
`,e.jsx(d,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),` zu jedem Wert zwischen
`,e.jsx(n,{children:"\\cblue{f(a)}"})," und ",e.jsx(n,{children:"\\cblue{f(b)}"})," eine Urbildstelle, insbesondere zum Wert ",e.jsx(n,{children:"0"}),`.
Es gibt also ein `,e.jsx(n,{children:"\\cgreen{x^\\star} \\in (a, b)"})," mit ",e.jsx(n,{children:"f(\\cgreen{x^\\star}) = 0"}),`.
Zusammen mit Schritt 1 ist diese Lösung eindeutig.`]})})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.6 (Hinreichend, aber nicht notwendig)",id:"env-hinreichend-aber-nicht-notwendig",children:[e.jsxs(i.p,{children:[`Der Satz gibt eine Garantie, keine Charakterisierung. Die Funktion
`,e.jsx(n,{children:"f(x) = x^2 - 1"})," auf ",e.jsx(n,{children:"[-2, 2]"}),` ist weder monoton noch wechselt sie das
Vorzeichen zwischen den Rändern, und trotzdem hat sie dort zwei Nullstellen. Die
Bedingungen des Satzes sind also `,e.jsx(i.em,{children:"hinreichend"}),", aber nicht ",e.jsx(i.em,{children:"notwendig"}),"."]}),e.jsx(i.p,{children:`Für die Verfahren zählt vor allem die Existenzhälfte: Stetigkeit und ein
Vorzeichenwechsel garantieren eine Nullstelle; Monotonie braucht nur, wer
Eindeutigkeit will.`})]}),`
`,e.jsx(i.h3,{children:"Das Bisektionsverfahren"}),`
`,e.jsxs(i.p,{children:["Die Idee des ",e.jsx(d,{id:"bisection",children:"Bisektionsverfahrens"}),`: Wir kennen ein Intervall, in dem eine Nullstelle
stecken muss, weil `,e.jsx(n,{children:"f"}),` an den Rändern das Vorzeichen wechselt. Wir halbieren es,
prüfen, in welcher Hälfte der Vorzeichenwechsel liegt, und verwerfen
die andere.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.1.7 (Bisektionsverfahren)",id:"env-bisektionsverfahren",children:[e.jsxs(i.p,{children:["Gegeben seien eine stetige Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", zwei Punkte ",e.jsx(n,{children:"a < b"}),` mit
`,e.jsx(n,{children:"\\cblue{f(a)} \\cdot \\cblue{f(b)} < 0"})," und eine Zielgenauigkeit ",e.jsx(n,{children:"\\epsilon > 0"}),`.
Solange `,e.jsx(n,{children:"\\cblue{b} - \\cblue{a} > \\epsilon"}),":"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Setze ",e.jsx(n,{children:"\\corange{m} = \\cblue{a} + (\\cblue{b} - \\cblue{a})/2"}),"."]}),`
`,e.jsxs(i.li,{children:["Haben ",e.jsx(n,{children:"\\cblue{f(a)}"})," und ",e.jsx(n,{children:"\\corange{f(m)}"}),` dasselbe Vorzeichen, so setze
`,e.jsx(n,{children:"\\cblue{a} \\leftarrow \\corange{m}"}),", andernfalls ",e.jsx(n,{children:"\\cblue{b} \\leftarrow \\corange{m}"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Als Näherung geben wir die Mitte ",e.jsx(n,{children:"\\cblue{a} + (\\cblue{b} - \\cblue{a})/2"}),` des
Endintervalls zurück.`]})]}),`
`,e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"\\epsilon"}),` ist hier die gewünschte Genauigkeit, nicht die Maschinengenauigkeit
aus `,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),". Wie viele Schritte kostet das?"]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.1.8 (Schrittzahl der Bisektion)",id:"env-schrittzahl-der-bisektion",children:[e.jsxs(i.p,{children:["Es gelten die Voraussetzungen von ",e.jsx(i.a,{href:"#env-bisektionsverfahren",children:"Algorithmus 12.1.7"}),`, und das Startintervall sei
noch zu grob, `,e.jsx(n,{children:"b - a > \\epsilon"}),". Dann hat das Intervall nach ",e.jsx(n,{children:"k"}),` Durchläufen die
Länge `,e.jsx(n,{children:"(b - a)/2^k"}),`, und es enthält weiterhin eine Nullstelle
von `,e.jsx(n,{children:"f"}),". Die Schleife bricht nach genau"]}),e.jsx(F,{children:"k = \\left\\lceil \\log_2\\left(\\frac{b - a}{\\epsilon}\\right) \\right\\rceil"}),e.jsxs(i.p,{children:["Durchläufen ab, und die zurückgegebene Intervallmitte ",e.jsx(n,{children:"\\cblue{\\wh x}"}),` erfüllt
`,e.jsx(n,{children:"\\left|\\cgreen{x^\\star} - \\cblue{\\wh x}\\right| \\le \\epsilon/2"}),"."]})]}),`
`,e.jsx(pe,{title:"Beweis der Schrittzahlformel",children:e.jsxs(sn,{children:[e.jsx(re,{why:e.jsxs(e.Fragment,{children:["das leistet die Fallunterscheidung des Algorithmus. Gleichheit tritt nur bei ",e.jsx(n,{children:"\\corange{f(m)} = 0"})," ein; dann wird ",e.jsx(n,{children:"b \\leftarrow m"})," gesetzt, und die Nullstelle sitzt auf dem rechten Rand"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Vorzeichenwechsel überlebt."})," Schreiben wir ",e.jsx(n,{children:"[\\cblue{a_k}, \\cblue{b_k}]"}),` für
das Intervall nach `,e.jsx(n,{children:"k"})," Durchläufen. Haben ",e.jsx(n,{children:"\\cblue{f(a_{k-1})}"}),` und
`,e.jsx(n,{children:"\\corange{f(m)}"})," dasselbe Vorzeichen, so hat ",e.jsx(n,{children:"\\corange{f(m)}"}),` das andere
Vorzeichen als `,e.jsx(n,{children:"\\cblue{f(b_{k-1})}"}),`, und der Wechsel sitzt in
`,e.jsx(n,{children:"[\\corange{m}, \\cblue{b_{k-1}}]"}),`; diese Hälfte behalten wir. Andernfalls
sitzt er in `,e.jsx(n,{children:"[\\cblue{a_{k-1}}, \\corange{m}]"}),`, und wir behalten diese. In beiden
Fällen gilt weiter `,e.jsx(n,{children:"\\cblue{f(a_k)} \\cdot \\cblue{f(b_k)} \\le 0"}),"."]})}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:["das sind die Schritte 2 und 4 des Beweises von ",e.jsx(d,{id:"env:existenz-und-eindeutigkeit-einer",href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"}),", angewandt auf das kleinere Intervall"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Es gibt immer noch eine Nullstelle."})," Auf ",e.jsx(n,{children:"[\\cblue{a_k}, \\cblue{b_k}]"})," ist ",e.jsx(n,{children:"f"}),`
stetig, und die Randwerte haben verschiedene Vorzeichen oder einer von ihnen ist
null. Im ersten Fall liefert der
`,e.jsx(d,{id:"intermediate-value-theorem",children:"Zwischenwertsatz"}),` eine Nullstelle
`,e.jsx(n,{children:"\\cgreen{x^\\star}"}),` im Inneren, im zweiten liegt sie auf dem Rand. Monotonie
brauchen wir dafür nicht; nur für die Eindeutigkeit wäre sie nötig.`]})}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:["Induktionsanfang ",e.jsx(n,{children:"k = 0"})," ist das Startintervall selbst"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Länge halbiert sich."}),` Der Mittelpunkt teilt das Intervall in zwei gleich
lange Hälften, also ist `,e.jsx(n,{children:`\\cblue{b_k} - \\cblue{a_k} = (\\cblue{b_{k-1}} -
\\cblue{a_{k-1}})/2`}),` und per Induktion
`,e.jsx(n,{children:"\\cblue{b_k} - \\cblue{a_k} = (b - a)/2^k"}),"."]})}),e.jsxs(re,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\log_2"})," ist streng monoton wachsend"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Abbruchbedingung."}),` Die Schleife läuft, solange
`,e.jsx(n,{children:"\\cblue{b_k} - \\cblue{a_k} > \\epsilon"})," ist. Sie endet also beim kleinsten ",e.jsx(n,{children:"k"})," mit"]}),e.jsx(F,{children:`\\frac{b - a}{2^k} \\le \\epsilon
\\quad \\Longleftrightarrow \\quad
2^k \\ge \\frac{b - a}{\\epsilon}
\\quad \\Longleftrightarrow \\quad
k \\ge \\log_2\\left(\\frac{b - a}{\\epsilon}\\right) ,`}),e.jsx(i.p,{children:"und die kleinste solche ganze Zahl ist die aufgerundete rechte Seite."})]}),e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["ein Randpunkt des Endintervalls hätte nur die Schranke ",e.jsx(n,{children:"\\epsilon"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Fehlerschranke."})," Die Nullstelle ",e.jsx(n,{children:"\\cgreen{x^\\star}"}),` liegt nach Schritt 2 im
Endintervall, und von dessen Mitte `,e.jsx(n,{children:"\\cblue{\\wh x}"}),` ist jeder Punkt des Intervalls
höchstens eine halbe Intervalllänge entfernt. Also ist`]}),e.jsx(F,{children:`\\left|\\cgreen{x^\\star} - \\cblue{\\wh x}\\right|
\\le \\frac{\\cblue{b_k} - \\cblue{a_k}}{2} \\le \\frac{\\epsilon}{2} .`})]})]})}),`
`,e.jsxs(i.p,{children:["Ein Beispiel, das im Rest des Abschnitts wiederkehrt: ",e.jsx(n,{children:"f(x) = x^2 - 2"}),` auf
`,e.jsx(n,{children:"[1, 2]"}),", also die Suche nach ",e.jsx(n,{children:"\\sqrt 2"}),". Für ",e.jsx(n,{children:"\\epsilon = 10^{-6}"}),` ist
`,e.jsx(n,{children:"\\log_2(10^6) = 19{,}93"}),`, aufgerundet ergibt das die Schrittzahl. Pro Schritt
gewinnt die Bisektion genau ein Bit, also `,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),`
Dezimalstellen; eine weitere gültige Stelle kostet rund `,e.jsx(n,{children:"3{,}3"}),` Schritte. Das
Verfahren ist zuverlässig und langsam.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.9 (Die Bisektion in sieben Zeilen)",id:"env-bisektion-robust-implementiert",children:[e.jsx(i.p,{children:"Kompakt geschrieben ist das Verfahren sieben Zeilen lang:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`bisect <- function(f, a, b, eps) {
  while (b - a > eps) {
    mid <- (a + b) / 2
    if (f(a) * f(mid) <= 0) b <- mid else a <- mid
  }
  return((a + b) / 2)
}
`})}),e.jsxs(i.p,{children:["Die letzte Zeile ist wesentlich. Gäbe sie den ",e.jsx(i.em,{children:"letzten Mittelpunkt"}),`
zurück, so wäre das nach der Zuweisung stets ein Randpunkt des Endintervalls:
Statt der garantierten Genauigkeit `,e.jsx(n,{children:"\\epsilon/2"})," aus ",e.jsx(d,{id:"env:schrittzahl-der-bisektion",href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` bliebe nur
`,e.jsx(n,{children:"\\epsilon"}),", ein voller Halbierungsschritt wäre verschenkt."]})]}),`
`,e.jsxs(pe,{title:"Fließkomma-Fallen der Bisektion",children:[e.jsxs(i.p,{children:[`Zwei Details dieser Fassung betreffen die Fließkommaarithmetik aus
`,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),". Das erste betrifft den Mittelpunkt. Haben ",e.jsx(n,{children:"a"}),`
und `,e.jsx(n,{children:"b"})," dasselbe Vorzeichen, so ist ",e.jsx(n,{children:"a + (b-a)/2"}),` die verlässlichere Formel: Die
Differenz `,e.jsx(n,{children:"b - a"}),` ist dann betragsmäßig höchstens so groß wie der größere der
beiden Endpunkte, ihre Hälfte erst recht, und der Ausdruck bleibt auch gerundet
zwischen `,e.jsx(n,{children:"a"})," und ",e.jsx(n,{children:"b"}),". Die Summe ",e.jsx(n,{children:"a + b"}),` dagegen ist ein Zwischenergebnis, das
größer sein kann als beide Endpunkte, und sie kann überlaufen, obwohl die Mitte
selbst darstellbar wäre. Das zweite betrifft den Vorzeichentest. Nahe der
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
dauert, ist das relevant.`]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.10 (Umkehrfunktionen, Binärsuche und die Grenze des Verfahrens)",id:"env-umkehrfunktionen-binaersuche-und-die",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Umkehrfunktionen auswerten."})," Suchen wir ",e.jsx(n,{children:"f^{-1}(y)"}),`, so lösen wir
`,e.jsx(n,{children:"f(x) - y = 0"}),`. So berechnen viele Programmbibliotheken Quantile ohne
geschlossene Formel: Für eine stetige, streng wachsende Verteilungsfunktion `,e.jsx(n,{children:"F"}),`
ist das `,e.jsx(n,{children:"p"}),"-Quantil die Lösung von ",e.jsx(n,{children:"F(x) - p = 0"}),`, und
`,e.jsx(d,{id:"env:existenz-und-eindeutigkeit-einer",href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"})," ist direkt anwendbar."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Verwandtschaft zur Binärsuche."}),` Wie die binäre Suche in einer sortierten Liste
halbiert die Bisektion in jedem Schritt den Suchbereich, mit demselben
`,e.jsx(d,{id:"big-o-notation",children:"logarithmischen"})," Aufwand (",e.jsx(i.a,{href:"?k=02-algos#sec-2.3",children:"Abschnitt 2.3"}),`); der
Vorzeichenwechsel ersetzt den Größenvergleich.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Grenze."})," Beide Verfahren brauchen die Anordnung von ",e.jsx(n,{children:"\\R"}),". Im ",e.jsx(n,{children:"\\R^n"}),` ist ein
„Vorzeichenwechsel" eines vektorwertigen `,e.jsx(n,{children:"f"}),` nicht definiert; die Bisektion
eignet sich deshalb nur für univariate Funktionen.`]})]}),`
`,e.jsx(i.p,{children:"Die Schrittzahl lässt sich im folgenden Kasten nachzählen."}),`
`,e.jsxs(Me,{title:"Halbieren, Schritt für Schritt",children:[e.jsxs(i.p,{children:["Voreingestellt ist ",e.jsx(n,{children:"f(x) = x^2 - 2"})," auf ",e.jsx(n,{children:"[1, 2]"}),", also die Suche nach ",e.jsx(n,{children:"\\sqrt 2"}),`;
die Tabelle daneben protokolliert den Intervall-Verlauf. Der zweite Menüpunkt
wechselt zu `,e.jsx(n,{children:"f(x) = x^3 - 3x + 1"})," auf ",e.jsx(n,{children:"[-2, 2]"}),`, wo die Voraussetzung von
`,e.jsx(d,{id:"env:existenz-und-eindeutigkeit-einer",href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"})," verletzt ist."]}),e.jsx(Re,{frage:e.jsxs(e.Fragment,{children:["Wie viele Halbierungen braucht die Bisektion auf ",e.jsx(n,{children:"[1, 2]"}),", bis das Intervall kürzer ist als ",e.jsx(n,{children:"\\epsilon = 10^{-6}"}),"?"]}),loesung:20,toleranz:2,einheit:"Schritte",verdeckt:e.jsxs(e.Fragment,{children:[O("satz:schrittzahl-der-bisektion")," sagt ",e.jsx(n,{children:"\\lceil \\log_2((b-a)/\\epsilon)\\rceil = 20"})," voraus, und zwar exakt. Dieselbe Formel liefert ",e.jsx(n,{children:"10"})," Schritte für ",e.jsx(n,{children:"\\epsilon = 10^{-3}"})," und ",e.jsx(n,{children:"34"})," für ",e.jsx(n,{children:"10^{-10}"}),", also ",e.jsx(n,{children:"1/\\log_{10} 2 = 3{,}32"})," Schritte je gültiger Dezimalstelle."]}),children:e.jsx(ft,{})}),e.jsxs(i.p,{children:["Die Schranke aus ",e.jsx(d,{id:"env:schrittzahl-der-bisektion",href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"})," ist für jedes ",e.jsx(n,{children:"\\epsilon"}),`
exakt; der Stepper stellt am Ende die vorhergesagte Schrittzahl neben die
gebrauchte. Beim zweiten Menüpunkt mit drei Nullstellen in `,e.jsx(n,{children:"[-2, 2]"}),`
entscheidet schon der erste Mittelpunkt, welche wir finden: Weil `,e.jsx(n,{children:"f(0) = 1"}),`
dasselbe Vorzeichen trägt wie `,e.jsx(n,{children:"f(2) = 3"}),`, fällt die rechte Hälfte samt zwei
Nullstellen sofort weg. Eindeutig ist die Lösung hier nicht, weil die strenge
Monotonie aus `,e.jsx(d,{id:"env:existenz-und-eindeutigkeit-einer",href:"#env-existenz-und-eindeutigkeit-einer",children:"Satz 12.1.5"})," fehlt."]})]}),`
`,e.jsx(i.h3,{children:"Das Newton-Raphson-Verfahren"}),`
`,e.jsxs(i.p,{children:["Die Bisektion benutzt von ",e.jsx(n,{children:"f"})," nur das Vorzeichen. Ist ",e.jsx(n,{children:"f"}),` differenzierbar,
bleibt damit Information ungenutzt: Die Ableitung sagt uns nicht nur, auf welcher
Seite die Nullstelle liegt, sondern auch ungefähr wie weit.`]}),`
`,e.jsxs(i.p,{children:[`Der Ansatz ist die Taylorentwicklung erster Ordnung aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),`. Um die aktuelle Stelle
`,e.jsx(n,{children:"\\cblue{x^{(k)}}"})," herum ersetzen wir ",e.jsx(n,{children:"f"}),` durch seine
`,e.jsx(d,{id:"tangent-line",children:"Tangente"})," und verlangen von dieser, dass sie null wird:"]}),`
`,e.jsx(F,{children:`\\cblue{f(x)} \\approx \\cblue{f(x^{(k)})} + \\corange{f'(x^{(k)})}\\bigl(x - \\cblue{x^{(k)}}\\bigr)
\\overset{!}{=} 0 .`}),`
`,e.jsxs(i.p,{children:["Das ist eine lineare Gleichung in ",e.jsx(n,{children:"x"}),". Solange ",e.jsx(n,{children:"\\corange{f'(x^{(k)})} \\neq 0"}),`
ist, liefert Auflösen die nächste Iterierte.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.1.11 (Newton-Raphson-Verfahren für Nullstellen)",id:"env-newton-raphson-verfahren-fuer",children:[e.jsxs(i.p,{children:["Gegeben seien eine differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),` und ein
Startwert `,e.jsx(n,{children:"\\cblue{x^{(0)}}"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ne,{tag:"12.1.1",id:"eq-newton-raphson-verfahren-fuer",children:"\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\cblue{f(x^{(k)})}}{\\corange{f'(x^{(k)})}} ,"}),e.jsxs(i.p,{children:["solange ",e.jsx(n,{children:"\\corange{f'(x^{(k)})} \\neq 0"}),` ist, und brich ab, sobald
`,e.jsx(n,{children:"\\left|\\cblue{f(x^{(k)})}\\right|"}),` oder die Schrittlänge
`,e.jsx(n,{children:"\\left|\\cblue{x^{(k+1)}} - \\cblue{x^{(k)}}\\right|"}),` unter eine vorgegebene
Schranke fällt.`]})]}),`
`,e.jsxs(i.p,{children:["Geometrisch ist ",e.jsx(n,{children:"\\cblue{x^{(k+1)}}"})," der Schnittpunkt der Tangente an ",e.jsx(n,{children:"f"}),` im
Punkt `,e.jsx(n,{children:"\\bigl(\\cblue{x^{(k)}}, \\cblue{f(x^{(k)})}\\bigr)"})," mit der ",e.jsx(n,{children:"x"}),`-Achse. Der
Bruch in `,e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` sagt dasselbe in Zahlen: Wir teilen die Höhe, die
abzubauen ist, durch die Rate, mit der die Tangente sie abbaut.`]}),`
`,e.jsx(pe,{title:"Newton-Raphson einmal vollständig durchgerechnet",children:e.jsxs(D,{kind:"Beispiel",label:"12.1.12 (Die Wurzel aus zwei)",id:"env-die-wurzel-aus-zwei",children:[e.jsxs(i.p,{children:["Wir bleiben bei ",e.jsx(n,{children:"\\cblue{f(x) = x^2 - 2}"})," mit ",e.jsx(n,{children:"\\corange{f'(x) = 2x}"}),` und
`,e.jsx(n,{children:"\\cgreen{x^\\star} = \\sqrt 2 = 1{,}41421356"}),". Die Vorschrift ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"})," wird zu"]}),e.jsx(F,{children:`\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\cblue{(x^{(k)})^2 - 2}}{\\corange{2x^{(k)}}}
= \\frac{1}{2}\\left(\\cblue{x^{(k)}} + \\frac{2}{\\cblue{x^{(k)}}}\\right) ,`}),e.jsxs(i.p,{children:[`also dem Heron-Verfahren. Vom Startwert
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 2"})," aus laufen die Iterierten so:"]}),e.jsx(F,{children:`\\begin{array}{c|l|l|l}
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
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.13 (Quadratische Konvergenz)",id:"env-quadratische-konvergenz",children:[e.jsxs(i.p,{children:["Nahe einer einfachen Nullstelle konvergiert Newton-Raphson ",e.jsx(i.em,{children:"quadratisch"}),`
(`,e.jsx(d,{id:"rate-of-convergence",children:"Konvergenzordnung"}),`): Mit
`,e.jsx(n,{children:"e_k := \\left|\\cblue{x^{(k)}} - \\cgreen{x^\\star}\\right|"}),` verhält sich der Fehler
des nächsten Schrittes wie das Quadrat des aktuellen,`]}),e.jsx(F,{children:"e_{k+1} \\approx C \\cdot e_k^2 ,"}),e.jsxs(i.p,{children:["mit einer Konstanten ",e.jsx(n,{children:"C"}),", die von ",e.jsx(n,{children:"f"})," abhängt. Ist ",e.jsx(n,{children:"f"}),` in einer Umgebung einer
einfachen Nullstelle zweimal stetig differenzierbar, so ist asymptotisch
`,e.jsx(n,{children:"C = \\left|f''(\\cgreen{x^\\star})\\right| / \\bigl(2\\left|f'(\\cgreen{x^\\star})\\right|\\bigr)"}),`,
für `,e.jsx(n,{children:"f(x) = x^2 - 2"})," also ",e.jsx(n,{children:"2/(2 \\cdot 2\\sqrt 2) = 0{,}354"}),`. Praktisch heißt
das: Sobald wir nah genug dran sind, verdoppelt jeder Schritt grob die Zahl der
richtigen Stellen, und wenige Schritte genügen bis zur Maschinengenauigkeit.`]}),e.jsxs(i.p,{children:["Das Verfahren braucht allerdings die Ableitung, und es konvergiert nur ",e.jsx(i.em,{children:"lokal"}),`:
Weit weg vom Ziel kann die Tangente irgendwohin zeigen, und die Iteration
kann divergieren. Außerdem muss die Nullstelle einfach sein. Ist
`,e.jsx(n,{children:"\\corange{f'(\\cgreen{x^\\star})} = 0"}),`, so fällt die Konvergenz auf lineare
Geschwindigkeit, und ein `,e.jsx(n,{children:"\\corange{f'(x^{(k)})} = 0"}),` unterwegs macht den Schritt
undefiniert. Die Bisektion hat keinen dieser Vorbehalte, braucht aber ein
Vielfaches an Schritten; in der Praxis kombinieren wir beides: erst klammern,
dann Newton.`]})]}),`
`,e.jsx(i.p,{children:`Wie stark wirken sich diese Vorbehalte aus, wenn die
Tangente flach liegt?`}),`
`,e.jsxs(Me,{title:"Die Tangente als Wegweiser",children:[e.jsxs(i.p,{children:["Die Tafel zeigt ",e.jsx(i.a,{href:"#env-newton-raphson-verfahren-fuer",children:"Algorithmus 12.1.11"}),` Schritt für Schritt: violett der Graph von
`,e.jsx(n,{children:"f"}),", orange die Tangente im aktuellen Punkt, und wo sie die ",e.jsx(n,{children:"x"}),`-Achse trifft,
sitzt die nächste blaue Iterierte. Der Startpunkt lässt sich auf der Achse
ziehen oder mit dem Regler setzen; die gestrichelten roten Senkrechten im
zweiten Beispiel markieren die Stellen mit `,e.jsx(n,{children:"\\corange{f'} = 0"}),"."]}),e.jsx(Re,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Die dritte Funktion, ",e.jsx(n,{children:"f(x) = \\arctan x"}),", hat genau EINE Nullstelle. Findet Newton sie von jedem Startpunkt aus?"]}),optionen:[{id:"ja",text:"ja, es gibt ja nur eine"},{id:"nein",text:"nein, ab einem gewissen Abstand nicht mehr"}],loesung:"nein",verdeckt:e.jsxs(e.Fragment,{children:["Die Schwelle liegt bei ",e.jsx(n,{children:"|x^{(0)}| = 1{,}3917"}),": Ab dort überholt jeder Schritt den vorigen, und die Iterierten laufen über ",e.jsx(n,{children:"1{,}5 \\to -1{,}694 \\to 2{,}321 \\to -5{,}114 \\to 32{,}30 \\to -1575{,}3"})," auseinander."]}),children:e.jsx(zt,{})}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"f(x) = x^2 - 2"})," pendelt sich der Quotient ",e.jsx(n,{children:"e_{k+1}/e_k^2"}),` aus der
Voreinstellung `,e.jsx(n,{children:"\\cblue{x^{(0)}} = 3"})," bei ",e.jsx(n,{children:"0{,}3536"}),` ein. Auf
`,e.jsx(n,{children:"f(x) = x^3 - 3x + 1"}),` entscheidet der Startpunkt, welche der drei Nullstellen
wir finden; bei `,e.jsx(n,{children:"\\cblue{x^{(0)}} = 1{,}05"})," ist ",e.jsx(n,{children:"\\corange{f'} = 0{,}31"}),`, der
erste Schritt springt nach `,e.jsx(n,{children:"4{,}28"}),`, und der Lauf braucht doppelt so viele
Schritte wie aus einem günstigen Startpunkt. Der Arkustangens hat genau eine
Nullstelle, doch jenseits einer Schwelle für `,e.jsx(n,{children:"\\left|\\cblue{x^{(0)}}\\right|"}),`
überholt jeder Schritt den vorigen, und die Iterierten laufen auseinander. Die
Bisektion wäre hier langsam, aber sie divergiert nicht.`]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.1.14 (Von der Nullstelle zum Minimum)",id:"env-von-der-nullstelle-zum-minimum",children:[e.jsxs(i.p,{children:["Suchen wir das Minimum einer differenzierbaren Funktion ",e.jsx(n,{children:"\\cblue{f}"}),`, so suchen
wir eine Nullstelle von `,e.jsx(n,{children:"\\corange{\\nabla f}"}),`
(`,e.jsx(i.a,{href:"#env-zwei-probleme-ein-werkzeugkasten",children:"Bemerkung 12.1.3"}),`). Wenden wir
`,e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` auf diese Funktion an, so steht im Nenner die
Ableitung des Gradienten, die Hesse-Matrix:`]}),e.jsx(F,{children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
- \\Bigl(\\corange{\\nabla f(\\bx^{(k)})}\\, \\corange{\\bH_f(\\bx^{(k)})^{-1}}\\Bigr)^\\top .`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-newton-raphson-verfahren",children:"Algorithmus 10.8.11"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),": Newton für ",e.jsx(n,{children:"\\min_{\\bx} \\cblue{f(\\bx)}"})," ",e.jsx(i.em,{children:"ist"}),`
Newton-Raphson für `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),`. Das Transponierte
steht da, weil der Gradient in unserer Konvention eine Zeile ist.`]})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"})," tritt in ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren-fuer",children:"(12.1.1)"}),` an die Stelle der Division die
Lösung des linearen Systems
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx^{(k)})}\\,\\bd = -\\cblue{f(\\bx^{(k)})}"}),` mit der
`,e.jsx(d,{id:"env:jacobimatrix",children:"Jacobimatrix"})," aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.3",children:"Abschnitt 10.3"}),`; die nächste
Iterierte ist dann `,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\bd"}),`. Das ist teuer:
pro Schritt eine ganze Matrix von Ableitungen und eine Zerlegung.`]}),`
`,e.jsxs(pe,{title:"Fixpunktiteration erster Ordnung",children:[e.jsxs(i.p,{children:[`Die einfachste Alternative ersetzt die Ableitung durch eine feste Zahl. Das
Ergebnis nimmt den Gradientenabstieg
aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," in seiner einfachsten Form vorweg."]}),e.jsxs(D,{kind:"Algorithmus",label:"12.1.15 (Fixpunktiteration erster Ordnung)",id:"env-fixpunktiteration-erster-ordnung",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"}),", ein Startpunkt ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),` und
eine Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma} > 0"}),". Für ",e.jsx(n,{children:"k = 1, 2, \\dots"})," setze"]}),e.jsx(ne,{tag:"12.1.2",id:"eq-fixpunktiteration-erster-ordnung",children:"\\cblue{\\bx^{(k)}} = \\cblue{\\bx^{(k-1)}} - \\corange{\\gamma\\, f(\\bx^{(k-1)})} ."})]}),e.jsxs(i.p,{children:["Der Name kommt daher, dass ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` eine
`,e.jsx(d,{id:"fixed-point-iteration",children:"Fixpunktiteration"})," ",e.jsx(n,{children:"\\bx \\mapsto g(\\bx)"}),` für
`,e.jsx(n,{children:"g(\\bx) := \\bx - \\corange{\\gamma} f(\\bx)"})," ist: Wegen ",e.jsx(n,{children:"\\corange{\\gamma} \\neq 0"}),`
gilt `,e.jsx(n,{children:"g(\\cgreen{\\bx^\\star}) = \\cgreen{\\bx^\\star}"}),` genau dann, wenn
`,e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull"})," ist. Fixpunkte von ",e.jsx(n,{children:"g"})," und Nullstellen von ",e.jsx(n,{children:"f"}),`
sind dasselbe.`]}),e.jsxs(i.p,{children:["Für affines ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"})," ist ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` das
Richardson-Verfahren aus `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),`, und die dortige
Konvergenzbedingung ist der Spezialfall des folgenden Satzes.`]}),e.jsxs(D,{kind:"Satz",label:"12.1.16 (Konvergenzrate der Fixpunktiteration)",id:"env-konvergenzrate-der-fixpunktiteration",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^n"})," in einer Umgebung von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`
differenzierbar mit `,e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) = \\bnull"}),", und sei"]}),e.jsx(ne,{tag:"12.1.3",id:"eq-konvergenzrate-der-fixpunktiteration",children:"\\corange{\\rho} := \\left\\|\\bI_n - \\corange{\\gamma\\,\\bJ_f(\\cgreen{\\bx^\\star})}\\right\\| < 1"}),e.jsxs(i.p,{children:["für eine ",e.jsx(d,{id:"matrix-norm",children:"induzierte Matrixnorm"}),`. Dann gibt es zu jedem
`,e.jsx(n,{children:"\\rho' \\in (\\corange{\\rho}, 1)"})," ein ",e.jsx(n,{children:"\\delta > 0"}),`, sodass für jeden Startpunkt mit
`,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\| \\le \\delta"}),` die Iteration
`,e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"})," gegen ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," konvergiert, und zwar mit"]}),e.jsx(F,{children:`\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}\\right\\|
\\le (\\rho')^k \\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\|
= O\\bigl((\\rho')^k\\bigr) .`}),e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," affin, so gilt die Schranke mit ",e.jsx(n,{children:"\\corange{\\rho}"}),` selbst und für jeden
Startpunkt.`]})]}),e.jsxs(sn,{children:[e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["die Zerlegung von ",e.jsx(n,{children:"f"})," ist ",e.jsx(d,{id:"env:frechet-ableitung",href:"?k=10-differentialrechnung#env-frechet-ableitung",children:"Definition 10.1.5"}),", die Fréchet-Differenzierbarkeit: Funktionswert gleich lineare Näherung plus Restterm, der schneller als linear verschwindet. Die Abschätzung benutzt danach die Dreiecksungleichung und die Verträglichkeit der induzierten Norm, ",e.jsx(n,{children:"\\left\\|\\bM\\bv\\right\\| \\le \\left\\|\\bM\\right\\|\\left\\|\\bv\\right\\|"})," (",e.jsx(d,{id:"env:wichtige-vertraeglichkeiten",href:"?k=03-matrix-spur-norm#env-wichtige-vertraeglichkeiten",children:"Satz 3.5.10"}),"). Hier wird die Aussage lokal: Sie gilt nur in einer Kugel um ",e.jsx(n,{children:"\\bx^\\star"}),", deren Radius von ",e.jsx(n,{children:"\\rho'"})," abhängt"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fehlerrekursion und Kontraktion."})," Schreiben wir ",e.jsx(n,{children:`\\be_k := \\cblue{\\bx^{(k)}} -
\\cgreen{\\bx^\\star}`}),". Weil ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` differenzierbar ist und
dort verschwindet, ist
`,e.jsx(n,{children:"f(\\cblue{\\bx^{(k-1)}}) = \\corange{\\bJ_f(\\cgreen{\\bx^\\star})}\\,\\be_{k-1} + r(\\be_{k-1})"}),`
mit `,e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\| = o(\\left\\|\\bh\\right\\|)"}),`. Einsetzen in
`,e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"})," und Abziehen von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` auf
beiden Seiten liefert`]}),e.jsx(F,{children:`\\be_k = \\bigl(\\bI_n - \\corange{\\gamma\\,\\bJ_f(\\cgreen{\\bx^\\star})}\\bigr)\\be_{k-1}
- \\corange{\\gamma}\\, r(\\be_{k-1}) ,
\\qquad\\text{also}\\qquad
\\left\\|\\be_k\\right\\| \\le \\corange{\\rho}\\left\\|\\be_{k-1}\\right\\|
+ \\corange{\\gamma}\\left\\|r(\\be_{k-1})\\right\\| .`}),e.jsxs(i.p,{children:["Sei nun ",e.jsx(n,{children:"\\rho' \\in (\\corange{\\rho}, 1)"}),` beliebig. Weil
`,e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\| / \\left\\|\\bh\\right\\| \\to 0"})," für ",e.jsx(n,{children:"\\bh \\to \\bnull"}),` gilt, gibt
es ein `,e.jsx(n,{children:"\\delta > 0"}),` mit
`,e.jsx(n,{children:"\\corange{\\gamma}\\left\\|r(\\bh)\\right\\| \\le (\\rho' - \\corange{\\rho})\\left\\|\\bh\\right\\|"}),`
für alle `,e.jsx(n,{children:"\\left\\|\\bh\\right\\| \\le \\delta"}),", und für ",e.jsx(n,{children:"\\left\\|\\be_{k-1}\\right\\| \\le \\delta"}),`
folgt daraus `,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le \\rho' \\left\\|\\be_{k-1}\\right\\|"}),"."]})]}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\rho' < 1"})," sorgt dafür, dass die Kugel nie verlassen wird; ohne diese Beobachtung wäre die Induktion nicht abgeschlossen"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Induktion."})," Ist ",e.jsx(n,{children:"\\left\\|\\be_0\\right\\| \\le \\delta"}),`, so ist
`,e.jsx(n,{children:"\\left\\|\\be_1\\right\\| \\le \\rho'\\left\\|\\be_0\\right\\| \\le \\delta"}),`, und dasselbe
Argument greift erneut. Per Induktion bleibt die ganze Folge in der Kugel und es
gilt `,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le (\\rho')^k \\left\\|\\be_0\\right\\|"}),`. Wegen
`,e.jsx(n,{children:"\\rho' < 1"})," konvergiert die rechte Seite gegen null."]})}),e.jsx(re,{why:e.jsx(e.Fragment,{children:"eine affine Abbildung ist ihre eigene lineare Näherung, der Restterm entfällt"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der affine Fall."})," Ist ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"}),`, so ist
`,e.jsx(n,{children:"\\corange{\\bJ_f} = \\bA"})," konstant und ",e.jsx(n,{children:"r \\equiv \\bnull"}),`. Die Abschätzung aus
Schritt 1 gibt dann direkt
`,e.jsx(n,{children:"\\left\\|\\be_k\\right\\| \\le \\corange{\\rho}\\left\\|\\be_{k-1}\\right\\|"}),`, ohne
Einschränkung an den Startpunkt.`]})})]}),e.jsxs(i.p,{children:["Kurzgefasst lautet das Ergebnis ",e.jsx(n,{children:`\\left\\|\\cblue{\\bx^{(k)}} -
\\cgreen{\\bx^\\star}\\right\\| = O(\\corange{\\rho}^k)`}),`. Die Kurzform unterschlägt
zwei Vorbehalte: Die Aussage gilt nur in der Nähe von `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, und
der Restterm verschlechtert die Rate im nichtaffinen Fall um ein beliebig kleines Stück.`]}),e.jsxs(i.p,{children:["Damit überhaupt ein ",e.jsx(n,{children:"\\corange{\\gamma} > 0"})," mit ",e.jsx(n,{children:"\\corange{\\rho} < 1"}),` existiert,
muss die Ableitung im Zielpunkt positiv sein: Im Eindimensionalen ist
`,e.jsx(n,{children:"\\corange{\\rho} = \\left|1 - \\corange{\\gamma f'(x^\\star)}\\right| < 1"}),` genau für
`,e.jsx(n,{children:"0 < \\corange{\\gamma} < 2/\\corange{f'(x^\\star)}"}),`, und das setzt
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} > 0"})," voraus. Ist ",e.jsx(n,{children:"f"})," dort fallend, arbeiten wir mit ",e.jsx(n,{children:"-f"}),`,
das dieselben Nullstellen hat. Deshalb wird `,e.jsx(n,{children:"f"}),` für die Fixpunktiteration oft
gleich als monoton steigend vorausgesetzt.`]}),e.jsxs(D,{kind:"Bemerkung",label:"12.1.17 (Das Dilemma der Schrittweite)",id:"env-das-dilemma-der-schrittweite",children:[e.jsxs(i.p,{children:[`Die Vor- und Nachteile des Verfahrens hängen an einer einzigen Zahl. Positiv:
Es ist einfach, funktioniert für multivariates `,e.jsx(n,{children:"f"}),` und braucht keine
Jacobimatrix, sondern nur Funktionsauswertungen; bei gutartigem `,e.jsx(n,{children:"f"}),`, also kleinem
`,e.jsx(n,{children:"\\corange{\\rho}"}),`, ist es zudem schnell. Negativ: Die Schrittweite
`,e.jsx(n,{children:"\\corange{\\gamma}"})," muss passen."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu klein"})," heißt langsam. Mit ",e.jsx(n,{children:"\\corange{\\rho}"})," nahe bei ",e.jsx(n,{children:"1"}),` schrumpft der Fehler
pro Schritt kaum, und wir brauchen `,e.jsx(n,{children:"\\log(10)/(-\\log\\corange{\\rho})"}),` Schritte je
Dezimalstelle. `,e.jsx(i.em,{children:"Zu groß"}),` heißt, dass der Schritt über die Nullstelle hinausschießt
und dabei größer wird als der Fehler, den er beheben sollte. Dann ist
`,e.jsx(n,{children:"\\cred{\\rho \\ge 1}"}),", und ",e.jsx(d,{id:"env:konvergenzrate-der-fixpunktiteration",href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"})," sagt nichts mehr zu."]}),e.jsxs(i.p,{children:[`Wie eng das Fenster ist, lässt sich im symmetrisch positiv definiten Fall exakt
angeben. Hat `,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx^\\star)}"}),` die Eigenwerte
`,e.jsx(n,{children:"0 < \\lambda_{\\min} \\le \\dots \\le \\lambda_{\\max}"}),", so ist"]}),e.jsx(F,{children:`\\corange{\\gamma^\\star} = \\frac{2}{\\lambda_{\\min} + \\lambda_{\\max}}
\\qquad \\text{mit} \\qquad
\\corange{\\rho} = \\frac{\\lambda_{\\max} - \\lambda_{\\min}}{\\lambda_{\\max} + \\lambda_{\\min}}
= \\frac{\\kappa - 1}{\\kappa + 1}`}),e.jsxs(i.p,{children:["die beste Wahl, mit der ",e.jsx(d,{id:"condition-number",children:"Konditionszahl"}),`
`,e.jsx(n,{children:"\\kappa = \\lambda_{\\max}/\\lambda_{\\min}"}),". Für ",e.jsx(n,{children:"\\cred{\\gamma > 2/\\lambda_{\\max}}"}),`
läuft die Iteration von jedem Startpunkt aus auseinander, dessen Fehler einen
Anteil in der steilsten Eigenrichtung hat. Die Herleitung ist dieselbe wie für
den Gradientenabstieg in `,e.jsx(d,{id:"env:gradientenabstieg-auf-einer-quadrik",href:"#env-gradientenabstieg-auf-einer-quadrik",children:"Satz 12.3.15"}),`, mit der
Jacobi- an Stelle der Hesse-Matrix.`]}),e.jsxs(i.p,{children:["In der Praxis wählen wir ",e.jsx(n,{children:"\\corange{\\gamma_k}"}),` adaptiv, etwa durch eine
Liniensuche (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`); die akzeptierten Schrittweiten müssen
dabei nicht gegen null gehen. Folgen mit `,e.jsx(n,{children:"\\corange{\\gamma_k} \\to 0"}),` spielen erst
beim stochastischen Gradientenabstieg eine Rolle (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]})]}),e.jsx(i.p,{children:`Ab welcher Schrittweite divergiert die Iteration? Drei kleine Systeme zeigen
es.`}),e.jsxs(Me,{title:"Die Schrittweite als Regler",children:[e.jsxs(i.p,{children:["Alle drei Beispiele sind affin, ",e.jsx(n,{children:"f(\\bx) = \\bA(\\bx - \\cgreen{\\bx^\\star})"}),` mit
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} = \\bnull"}),". Damit ist die Jacobimatrix überall ",e.jsx(n,{children:"\\bA"}),`, und
`,e.jsx(n,{children:"\\corange{\\rho} = \\left\\|\\bI - \\corange{\\gamma}\\bA\\right\\|_2"}),` ist nach dem
affinen Fall im Beweis eine echte Schranke ohne Restterm.`]}),e.jsx(Re,{frage:e.jsxs(e.Fragment,{children:["Das dritte System hat ",e.jsx(n,{children:"\\bA = \\diag(1, 10)"}),", also Kondition ",e.jsx(n,{children:"10"}),". Ab welchem ",e.jsx(n,{children:"\\gamma"})," divergiert es?"]}),loesung:.2,toleranz:.03,einheit:"γ",verdeckt:e.jsxs(e.Fragment,{children:["Die Grenze liegt bei ",e.jsx(n,{children:"2/\\lambda_{\\max} = 0{,}2"}),", das beste erreichbare ",e.jsx(n,{children:"\\rho"})," bei ",e.jsx(n,{children:"9/11 = 0{,}818"}),"."]}),children:({aufgeloest:t})=>e.jsx(Nt,{zeigeGrenze:t})}),e.jsxs(i.p,{children:[`Beim ersten, symmetrischen System liegt das Optimum bei
`,e.jsx(n,{children:"\\corange{\\gamma^\\star} = 2/7"})," mit ",e.jsx(n,{children:"\\corange{\\rho} = 0{,}319"}),`. Beim zweiten sind
die Eigenwerte komplex, der Weg wird zur Spirale, und den Drehanteil regelt
keine Schrittweite weg: Selbst im Optimum bleibt `,e.jsx(n,{children:`\\corange{\\rho} = 2/\\sqrt 5 =
0{,}894`}),". Beim dritten ist bei ",e.jsx(n,{children:"\\corange{\\gamma} = 0{,}25"}),` schon
`,e.jsx(n,{children:"\\corange{\\rho} = 1{,}5"}),`, die Iteration divergiert
(`,e.jsx(i.a,{href:"#env-das-dilemma-der-schrittweite",children:"Bemerkung 12.1.17"}),`). Unterhalb der Schwelle, die die
Ablesetafel nach dem Auflösen nennt, läuft sie im Zickzack zusammen: Die steile
Richtung überschießt, die flache kommt kaum voran, dasselbe Bild wie beim
Gradientenabstieg in `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]})]}),e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx - \\bb"})," ist die Fixpunktiteration ",e.jsx(i.a,{href:"#eq-fixpunktiteration-erster-ordnung",children:"(12.1.2)"}),` das
Richardson-Verfahren aus `,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.3",children:"Abschnitt 8.3"}),"."]}),e.jsxs(i.p,{children:["Einsetzen gibt ",e.jsx(n,{children:"\\bx^{(k)} = \\bx^{(k-1)} - \\gamma(\\bA\\bx^{(k-1)} - \\bb)"}),`. Die
dortige Konvergenzbedingung `,e.jsx(n,{children:"\\left\\|\\bI - \\gamma\\bA\\right\\| < 1"}),` ist
`,e.jsx(i.a,{href:"#eq-konvergenzrate-der-fixpunktiteration",children:"(12.1.3)"}),", und weil ",e.jsx(n,{children:"f"}),` affin ist, gilt die
Schranke nach `,e.jsx(d,{id:"env:konvergenzrate-der-fixpunktiteration",href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"})," für jeden Startpunkt."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\rho = \\left\\|\\bI_n - \\gamma\\bJ_f(\\bx^\\star)\\right\\| < 1"}),`, so konvergiert
die Fixpunktiteration von jedem Startpunkt aus gegen `,e.jsx(n,{children:"\\bx^\\star"}),"."]}),e.jsxs(i.p,{children:[e.jsx(d,{id:"env:konvergenzrate-der-fixpunktiteration",href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"})," ist eine ",e.jsx(i.em,{children:"lokale"}),` Aussage: Die
Schranke gilt nur in einer Kugel um `,e.jsx(n,{children:"\\bx^\\star"}),`, deren Radius wir nicht kennen.
Weiter draußen kann die Iteration zu einer anderen Nullstelle laufen oder
divergieren.`]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Verdoppeln wir im symmetrisch positiv definiten Fall die optimale Schrittweite,
so ist die Konvergenzgarantie verloren.`}),e.jsxs(i.p,{children:["Die optimale Wahl ist ",e.jsx(n,{children:"\\gamma^\\star = 2/(\\lambda_{\\min} + \\lambda_{\\max})"}),`,
divergiert wird ab `,e.jsx(n,{children:"2/\\lambda_{\\max}"}),`. Wegen
`,e.jsx(n,{children:"4/(\\lambda_{\\min} + \\lambda_{\\max}) \\ge 2/\\lambda_{\\max}"}),` liegt das Doppelte
immer auf oder jenseits der Grenze, mit Gleichheit nur für
`,e.jsx(n,{children:"\\lambda_{\\min} = \\lambda_{\\max}"}),"."]})]})]})]}),`
`,e.jsxs(i.p,{children:["Für die Optimierung fragt ",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),` zuerst, was ein Minimum überhaupt
auszeichnet.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Das Bisektionsverfahren braucht die Ableitung von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Es braucht nur Funktionswerte, genauer sogar nur deren Vorzeichen, und einen
Startbereich mit Vorzeichenwechsel. Das ist seine Stärke: Es funktioniert
für nicht differenzierbare oder nur numerisch auswertbare
Funktionen, und es kann nach `,e.jsx(d,{id:"env:schrittzahl-der-bisektion",href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"})," nicht divergieren."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Eine zusätzliche gültige Dezimalstelle kostet die Bisektion rund ",e.jsx(n,{children:"3{,}3"}),`
Schritte.`]}),e.jsxs(i.p,{children:[`Jeder Schritt halbiert die Intervalllänge, gewinnt also genau ein Bit oder
`,e.jsx(n,{children:"\\log_{10} 2 \\approx 0{,}301"}),` Dezimalstellen. Für eine ganze Stelle brauchen wir
`,e.jsx(n,{children:"1/\\log_{10} 2 = 3{,}32"})," Schritte. Nach ",e.jsx(d,{id:"env:schrittzahl-der-bisektion",href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` sind das für
`,e.jsx(n,{children:"[1, 2]"})," und ",e.jsx(n,{children:"\\epsilon = 10^{-6}"})," zusammen ",e.jsx(n,{children:"20"})," Durchläufe."]})]}),e.jsxs(Ki,{loesung:1.39,toleranz:.06,children:[e.jsxs(i.p,{children:["Ab welchem ",e.jsx(n,{children:"\\left|x^{(0)}\\right|"})," läuft Newton auf ",e.jsx(n,{children:"f(x) = \\arctan x"}),`
auseinander?`]}),e.jsxs(i.p,{children:["Die Schwelle liegt bei ",e.jsx(n,{children:"1{,}3917"}),"; sie löst ",e.jsx(n,{children:"\\arctan(\\xi)(1+\\xi^2) = 2\\xi"}),`.
Darunter zieht sich das Pendeln zusammen, darüber wächst es. Dass es
eine solche Schwelle gibt, obwohl die Funktion nur eine einzige Nullstelle hat,
zeigt den Vorbehalt aus `,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),": Quadratische Konvergenz ist eine ",e.jsx(i.em,{children:"lokale"}),`
Aussage, und wie groß die Umgebung ist, sagt sie nicht.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:`Das Newton-Raphson-Verfahren konvergiert quadratisch, gleichgültig, wo wir starten
und welche Nullstelle wir suchen.`}),e.jsxs(i.p,{children:[`Beides gilt nicht. Quadratisch wird es erst in der Nähe der
Nullstelle, und nur wenn diese einfach ist, also
`,e.jsx(n,{children:"\\corange{f'(x^\\star)} \\neq 0"}),` gilt. Bei einer mehrfachen Nullstelle sinkt die
Ordnung auf `,e.jsx(n,{children:"1"}),`, und weit weg vom Ziel kann die Tangente die Iteration beliebig
weit wegführen (`,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §5.1 ordnet Existenz, Eindeutigkeit und Konvergenzraten von
Nullstellenproblemen ein, §5.5 behandelt Bisektion, Fixpunktiteration und Newton
im Eindimensionalen, §5.6 die Systeme. Heath Kapitel 6 ist der Optimierung
gewidmet und trägt die folgenden Abschnitte dieses Kapitels.`})})]})}function _t(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Sr,{...r})}):Sr(r)}const Ie=K.blau,Hi=K.gruen,Pi=K.rot,oi=K.orange,yr=K.violett,P=2,Be=300,en=30,Mr=16,Dr=10,Xn=8,fe=r=>en+(r+P)/(2*P)*Be,ke=r=>Be-(r+P)/(2*P)*Be,ui=(r,i)=>r*r-i*i;function Nr(r,i){const t=[];for(let h=0;h<=120;h++){const l=-P+2*P*h/120;if(r>0){const s=i*Math.sqrt(r+l*l);Math.abs(s)<=P&&t.push(`${fe(s).toFixed(1)},${ke(l).toFixed(1)}`)}else{const s=i*Math.sqrt(-r+l*l);Math.abs(s)<=P&&t.push(`${fe(l).toFixed(1)},${ke(s).toFixed(1)}`)}}return t.join(" ")}const _r=[.5,1,2,3],Ar=[-.5,-1,-2,-3],At=[{name:"erster Start",x:1.5,y:.4,gamma:.25,bahn:!0},{name:"zweiter Start",x:1.5,y:0,gamma:.25,bahn:!0},{name:"Start für den Newton-Knopf",x:1.7,y:-.9,gamma:.25,bahn:!1}];function $t(){const[r,i]=B.useState(1.5),[t,a]=B.useState(.4),[h,l]=B.useState(.25),[s,c]=B.useState(!0),[p,x]=B.useState(!1),w=k=>Math.round(k*20)/20,y=(k,q)=>{i(w(k)),a(w(q)),x(!1)},o=Li({feld:{x0:en,y0:0,w:Be,h:Be},welt:{x0:-P,x1:P,y0:-P,y1:P},clamp:([k,q])=>[wn(k,-P,P),wn(q,-P,P)],snap:.05,greifPosition:()=>[r,t],onDrag:([k,q])=>y(k,q)}),M=2*r,G=-2*t,f=Math.hypot(M,G),v=ui(r,t),z=B.useMemo(()=>{const k=[[r,t]];for(let q=0;q<Xn;q++){const[ze,ln]=k[q];k.push([ze*(1-2*h),ln*(1+2*h)])}return k},[r,t,h]),A=z[Xn],L=z.some(([k,q])=>Math.abs(k)>P||Math.abs(q)>P),j=f>1e-9?Math.min(.9,.25+.15*f):0,b=f>1e-9?[r-M/f*j,t-G/f*j]:[r,t],E=1e-9,V=Math.abs(t)<E,_=Math.abs(r)<E,g=Math.abs(1-2*h),W=1+2*h,C=Math.abs(h-.5)<1e-12;let H;V&&_?H="stationaer":V?H="strahl":_?H="achseY":H="entkommt";const S={stationaer:{kind:"neutral",titel:"im stationären Punkt",text:`Der Gradient ist null, es gibt also keinen Pfeil, und jedes Verfahren bleibt stehen, wo es steht. Trotzdem liegt hier weder ein Minimum noch ein Maximum: In jeder noch so kleinen Umgebung gibt es Punkte auf der grünen Achse mit größerem und Punkte auf der roten Achse mit kleinerem Funktionswert. Genau das meint ${O("bemerkung:was-sattelpunkte-fuer-die-verfahren")} mit „Sattelpunkt".`},strahl:{kind:"warn",titel:"der Sonderfall y = 0",text:`Auf der grünen Achse zeigt der Gradient nur in x-Richtung, und der Abstieg bleibt auf der Achse: y bleibt exakt null, x schrumpft mit dem Faktor ${T(g)} pro Schritt und steht nach ${Xn} Schritten bei ${T(A[0],4)}.${C?" Bei γ = 0,5 ist dieser Faktor exakt null: Ein einziger Schritt genügt, genau wie beim Newton-Schritt in dieser Richtung.":""} Hier läuft also auch der Gradientenabstieg in den Sattelpunkt hinein. Dieser eine Startstrahl ist die Ausnahme: Er hat in der Ebene Maß null, weshalb ihn ein zufälliger Startpunkt mit Wahrscheinlichkeit null trifft.`},achseY:{kind:"fail",titel:"auf der Maximumsachse",text:`Auf der roten Achse ist f nach unten geöffnet, und der Abstieg folgt genau dieser Richtung: |y| wächst in jedem Schritt um den Faktor ${T(W)} und steht nach ${Xn} Schritten bei ${T(A[1],3)}. Der Funktionswert fällt dabei zwar in jedem Schritt, nur eben ins Bodenlose. Ein Minimum findet das Verfahren so nie.`},entkommt:{kind:"ok",titel:"der Abstieg entkommt",text:`Beide Komponenten sind besetzt, und der Abstieg behandelt sie gegenläufig: x drückt er mit dem Faktor ${T(g)} pro Schritt gegen null, y bläst er mit dem Faktor ${T(W)} auf.${C?" Bei γ = 0,5 ist der x-Faktor exakt null, ein Schritt räumt diese Richtung also vollständig ab; der y-Faktor steht dann bei 2.":""} Nach ${Xn} Schritten steht er bei (${T(A[0],3)}; ${T(A[1],3)}), also praktisch auf der roten Achse und weit weg vom Sattel. Der Gradientenabstieg bleibt an einem Sattelpunkt nicht hängen (${O("bemerkung:was-sattelpunkte-fuer-die-verfahren")}); dass er dabei überhaupt nichts findet, ist eine andere Geschichte.`}}[H],R=[{f:k=>k*k,color:Hi,label:"f(t, 0) = t²"},{f:k=>-k*k,color:Pi,label:"f(0, t) = −t²"}],[U,Q]=B.useState({azimuth:40,elevation:24}),ie=B.useMemo(()=>({f:ui,nx:30,ny:30,color:Ie,opacity:.82,wire:!0}),[]),he=B.useMemo(()=>[{p:[0,0,0],color:yr,r:4.5,label:"x*",onTop:!0},{p:[r,t,ui(r,t)],color:Ie,r:4.5,onTop:!0}],[r,t]),u=B.useMemo(()=>{if(!s)return[];const k=z.filter(([q,ze])=>Math.abs(q)<=P&&Math.abs(ze)<=P).map(([q,ze])=>[q,ze,ui(q,ze)]);return k.length>1?[{pts:k,color:Ie,width:2,dash:"4 3",onTop:!0}]:[]},[z,s]),N={stationaer:"der Punkt sitzt genau im Sattel",strahl:"der Punkt sitzt auf dem aufsteigenden Grat",achseY:"der Punkt sitzt auf dem abfallenden Grat",entkommt:"der Punkt sitzt auf einer der Flanken"},m=k=>k?Ke:$e;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Ziehen wir den blauen Punkt über die Fläche und lassen den Abstieg laufen: Von welchen Startpunkten aus landet er im Sattel?"}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:At.map(k=>{const q=r===k.x&&t===k.y&&h===k.gamma;return e.jsx("button",{type:"button","aria-pressed":q,className:m(q),onClick:()=>{i(k.x),a(k.y),l(k.gamma),c(k.bahn),x(!1)},children:k.name},k.name)})}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:en},children:"y ↑"}),e.jsxs("svg",{viewBox:`0 0 ${en+Be+Dr} ${Be+Mr}`,width:en+Be+Dr,height:Be+Mr,role:"img","aria-label":`Höhenlinien von f(x, y) = x² − y² mit dem Punkt (${T(r)}; ${T(t)}); ${N[H]}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",...o.svgProps,children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s132-clip",children:e.jsx("rect",{x:en,y:0,width:Be,height:Be})}),e.jsx("marker",{id:"s132-pfeil",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:oi})})]}),[-2,-1,0,1,2].map(k=>e.jsxs("g",{children:[e.jsx("text",{x:en-4,y:ke(k)+3,textAnchor:"end",fill:"#64748b",fontSize:10,children:T(k,0)}),e.jsx("text",{x:fe(k),y:Be+12,textAnchor:"middle",fill:"#64748b",fontSize:10,children:T(k,0)})]},`t${k}`)),e.jsxs("g",{clipPath:"url(#s132-clip)",children:[_r.map(k=>[1,-1].map(q=>e.jsx("polyline",{points:Nr(k,q),fill:"none",stroke:"#94a3b8",strokeWidth:1},`p${k}${q}`))),Ar.map(k=>[1,-1].map(q=>e.jsx("polyline",{points:Nr(k,q),fill:"none",stroke:"#94a3b8",strokeWidth:1,strokeDasharray:"4 3"},`n${k}${q}`))),e.jsx("line",{x1:fe(-P),y1:ke(-P),x2:fe(P),y2:ke(P),stroke:"#475569",strokeWidth:1.8}),e.jsx("line",{x1:fe(-P),y1:ke(P),x2:fe(P),y2:ke(-P),stroke:"#475569",strokeWidth:1.8}),e.jsx("line",{x1:fe(-P),y1:ke(0),x2:fe(P),y2:ke(0),stroke:Hi,strokeWidth:2.4}),e.jsx("line",{x1:fe(0),y1:ke(-P),x2:fe(0),y2:ke(P),stroke:Pi,strokeWidth:2.4}),s&&e.jsxs(e.Fragment,{children:[e.jsx("polyline",{points:z.map(([k,q])=>`${fe(k).toFixed(1)},${ke(q).toFixed(1)}`).join(" "),fill:"none",stroke:Ie,strokeWidth:1.4,strokeDasharray:"3 3"}),z.slice(1).map(([k,q],ze)=>e.jsx("circle",{cx:fe(k),cy:ke(q),r:3,fill:Ie,opacity:.65},`b${ze}`))]}),f>1e-9&&e.jsx("line",{x1:fe(r),y1:ke(t),x2:fe(b[0]),y2:ke(b[1]),stroke:oi,strokeWidth:2.2,markerEnd:"url(#s132-pfeil)"}),e.jsx("circle",{cx:fe(0),cy:ke(0),r:7,fill:"none",stroke:yr,strokeWidth:2}),e.jsx(Ri,{x:fe(r),y:ke(t),farbe:Ie,r:5,aktiv:o.dragging==="p",...o.handleProps("p")})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:en},children:"x →"})]}),e.jsxs("div",{className:"min-w-0 max-w-full",children:[e.jsx(br,{size:280,xDomain:[-P,P],yDomain:[-P,P],zDomain:[-4,4],surface:ie,contours:[...Ar,0,..._r],contourColor:Ie,points:he,curves:u,labels:{x:"x",y:"y",z:"f"},azimuth:U.azimuth,elevation:U.elevation,onViewChange:Q,ariaLabel:`Die Sattelfläche f(x, y) = x² − y² über der Ebene; ${N[H]}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:U,onChange:Q})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche. Der violette Punkt ist derselbe stationäre Punkt, der blaue derselbe wie links, die gestrichelte blaue Kurve dieselbe Bahn, nur auf die Fläche gehoben. Ziehen dreht die Ansicht."})]}),e.jsxs("div",{children:[e.jsx(ut,{xLabel:"t",yLabel:"f",series:R,xDomain:[-2,2],yDomain:[-4,4],width:300,height:300,markers:[{x:r,y:r*r,color:Hi},{x:t,y:-t*t,color:Pi}]}),e.jsx("p",{className:"mt-1 max-w-[300px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion, aber nur auf den beiden Achsen: grün mit dem Minimum in t = 0, rot mit dem Maximum dort. Die beiden Marken sitzen bei t = x beziehungsweise t = y. Ein und derselbe Punkt ist für die eine Richtung der tiefste und für die andere der höchste der Gegend."})]})]}),e.jsx(se,{label:"x",value:r,onChange:k=>y(k,t),min:-2,max:2,step:.05,accent:Ie}),e.jsx(se,{label:"y",value:t,onChange:k=>y(r,k),min:-2,max:2,step:.05,accent:Ie}),e.jsx(se,{label:"γ (Schrittweite)",value:h,onChange:k=>l(Math.round(k*20)/20),min:.05,max:.5,step:.05,accent:oi}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button","aria-pressed":s,className:m(s),onClick:()=>c(k=>!k),children:s?"Abstieg ausblenden":"Gradientenabstieg zeigen"}),e.jsx("button",{type:"button",className:$e,onClick:()=>{i(0),a(0),x(!0)},children:"ein Newton-Schritt"})]}),e.jsxs("div",{className:"max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:[e.jsxs("p",{children:["Punkt"," ",e.jsxs("span",{className:"font-mono",style:{color:Ie},children:["(",T(r),"; ",T(t),")"]}),", Funktionswert ",e.jsx("span",{className:"font-mono",children:T(v)}),", Gradient"," ",e.jsxs("span",{className:"font-mono",style:{color:oi},children:["(",T(M),"; ",T(G),")"]})," ","mit Norm ",e.jsx("span",{className:"font-mono",children:T(f)})]}),e.jsxs("p",{children:["Hesse-Matrix ",e.jsx("span",{className:"font-mono",children:"H = (2 0; 0 −2)"}),", überall dieselbe; Eigenwerte ",e.jsx("span",{className:"font-mono",children:"λ₁ = 2"})," zur x-Richtung und"," ",e.jsx("span",{className:"font-mono",children:"λ₂ = −2"})," zur y-Richtung, also"," ",e.jsx("span",{className:"font-semibold",children:"indefinit"}),"."]}),e.jsxs("p",{children:["Abstiegsfaktoren pro Schritt: ",e.jsxs("span",{className:"font-mono",children:["|1 − 2γ| = ",T(g)]})," in x-Richtung, ",e.jsxs("span",{className:"font-mono",children:["1 + 2γ = ",T(W)]})," in y-Richtung."]})]}),e.jsxs(Ne,{kind:S.kind,titel:S.titel,children:[S.text,p&&e.jsxs(e.Fragment,{children:[" ","Der Newton-Schritt hat gerade auf (0; 0) gezeigt, und zwar von jedem Startpunkt aus: f ist quadratisch, seine Taylornäherung zweiten Grades also exakt, und der einzige stationäre Punkt dieser Näherung ist der Sattel. Newton sucht Nullstellen des Gradienten, nicht Minima."]}),s&&L&&e.jsxs(e.Fragment,{children:[" ","Die gestrichelte Bahn verlässt das gezeigte Fenster; gerechnet wird sie weiter bis zu dem Endpunkt, den dieses Verdikt nennt."]})]})]})}function $r(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Vom Nullstellen- zum Optimierungsproblem"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"})," hat Gleichungen ",e.jsx(n,{children:"f(x) = 0"}),` gelöst. Ab hier suchen
wir die Stelle, an der eine Funktion ihren kleinsten Wert annimmt, wie bei
kleinsten Quadraten, Maximum-Likelihood oder dem Training eines neuronalen
Netzes. Dieser Abschnitt klärt, was ein Optimum ist, welche Bedingungen dort
gelten und warum `,e.jsx(d,{id:"convexity",children:"Konvexität"}),` den Unterschied zwischen „irgendein
Minimum" und „das Minimum" ausmacht.`]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.2.1 (Lokales und globales Minimum)",id:"env-lokales-und-globales-minimum",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\Xcal \\subseteq \\R^n"})," die ",e.jsx(i.em,{children:"zulässige Menge"}),` (feasible set) und
`,e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"})," die ",e.jsx(d,{id:"objective-function",children:"Zielfunktion"}),` (objective
function), das Problem also`]}),e.jsx(ne,{tag:"12.2.1",id:"eq-lokales-und-globales-minimum",children:"\\cgreen{\\bx^\\star} \\in \\argmin_{\\bx \\in \\Xcal} f(\\bx) ."}),e.jsxs(i.p,{children:["Ein Punkt ",e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in \\Xcal"})," heißt"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"globales Minimum"}),", wenn ",e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) \\le f(\\bx)"}),` für alle
`,e.jsx(n,{children:"\\bx \\in \\Xcal"})," gilt;"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"lokales Minimum"}),", wenn es eine ",e.jsx(d,{id:"neighborhood",children:"Umgebung"})," ",e.jsx(n,{children:"U"}),` von
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," gibt, sodass ",e.jsx(n,{children:"f(\\cgreen{\\bx^\\star}) \\le f(\\bx)"}),` für alle
`,e.jsx(n,{children:"\\bx \\in U \\cap \\Xcal"})," gilt."]}),`
`]}),e.jsxs(i.p,{children:["Gilt jeweils die strikte Ungleichung für ",e.jsx(n,{children:"\\bx \\neq \\cgreen{\\bx^\\star}"}),`, so heißt das
Minimum `,e.jsx(i.em,{children:"strikt"}),"."]})]}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"})," hieß die zulässige Menge ",e.jsx(n,{children:"S"}),`; hier schreiben
wir `,e.jsx(n,{children:"\\Xcal"}),", weil ",e.jsx(n,{children:"S"}),` in den Sätzen unten den offenen Definitionsbereich
bezeichnet. `,e.jsx(n,{children:"\\argmin"}),` ist streng genommen die Menge aller Minimierer, und
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` steht für ein Element daraus, sofern eines existiert. Die
Konvexitätssätze unten gelten für eine allgemeine zulässige Menge; die Verfahren
der Abschnitte `,e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"}),` arbeiten
mit `,e.jsx(n,{children:"\\Xcal = \\R^n"}),"."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.2.2 (Maximieren ist Minimieren)",id:"env-maximieren-ist-minimieren",children:[e.jsx(i.p,{children:"Ein Maximierungsproblem müssen wir nicht getrennt behandeln:"}),e.jsx(F,{children:`\\max_{\\bx \\in \\Xcal} f(\\bx) = -\\min_{\\bx \\in \\Xcal}\\bigl(-f(\\bx)\\bigr) ,
\\qquad
\\argmax_{\\bx \\in \\Xcal} f(\\bx) = \\argmin_{\\bx \\in \\Xcal}\\bigl(-f(\\bx)\\bigr) .`}),e.jsxs(i.p,{children:[`Die Werte wechseln das Vorzeichen, die Argumente bleiben dieselben. Deshalb sind die gängigen
Bibliotheken Minimierer, und deshalb heißt die Zielfunktion der
Maximum-Likelihood-Schätzung dort in aller Regel die `,e.jsx(i.em,{children:"negative"}),`
`,e.jsx(d,{id:"likelihood",children:"Log-Likelihood"}),". Wir formulieren im Folgenden alles für Minima."]})]}),`
`,e.jsx(i.h3,{children:"Die Bedingung erster Ordnung"}),`
`,e.jsxs(i.p,{children:["Die folgende Bedingung haben wir in ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` schon benutzt;
sie ist der Ausgangspunkt jedes Optimierungsverfahrens.`]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.2.3 (Notwendige Bedingung erster Ordnung)",id:"env-notwendige-bedingung-erster-ordnung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f\\colon S \\to \\R"})," und ",e.jsx(n,{children:"\\cgreen{\\bx^\\star} \\in S"}),`
ein lokales Minimum von `,e.jsx(n,{children:"f"}),". Ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` differenzierbar, so
gilt`]}),e.jsx(ne,{tag:"12.2.2",id:"eq-notwendige-bedingung-erster-ordnung",children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})} = \\bnull^\\top ."}),e.jsx(i.p,{children:"Dieselbe Aussage gilt für lokale Maxima."})]}),`
`,e.jsx(pe,{title:"Beweis der notwendigen Bedingung erster Ordnung",children:e.jsxs(sn,{children:[e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["Für kleine ",e.jsx(n,{children:"\\left|t\\right|"})," liegt ",e.jsx(n,{children:"\\bx^\\star + t\\bh"})," in der Umgebung ",e.jsx(n,{children:"U"})," aus ",e.jsx(d,{id:"env:lokales-und-globales-minimum",href:"#env-lokales-und-globales-minimum",children:"Definition 12.2.1"}),", dort ist ",e.jsx(n,{children:"f(\\bx^\\star) \\le f(\\bx^\\star + t\\bh)"}),", also ",e.jsx(n,{children:"g(0) \\le g(t)"})]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bh \\in \\R^n"})," beliebig. Weil ",e.jsx(n,{children:"S"})," offen ist, gibt es ein ",e.jsx(n,{children:"\\delta > 0"}),`, sodass
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} + t\\bh \\in S"})," für alle ",e.jsx(n,{children:"\\left|t\\right| < \\delta"}),` gilt. Wir
betrachten die Funktion einer einzigen Variablen`]}),e.jsx(F,{children:"g\\colon (-\\delta, \\delta) \\to \\R , \\qquad g(t) := f(\\cgreen{\\bx^\\star} + t\\bh) ."}),e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"})," ist, hat ",e.jsx(n,{children:"g"})," in ",e.jsx(n,{children:"t = 0"}),` ein
lokales Minimum.`]})]}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:["Der Wert der Ableitung ist die Richtungsableitung aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),"; die Kettenregel auf die affine Abbildung ",e.jsx(n,{children:"t \\mapsto \\bx^\\star + t\\bh"})," angewandt gibt ",e.jsx(n,{children:"\\nabla f(\\bx^\\star)\\bh"})]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"g"})," ist in ",e.jsx(n,{children:"t = 0"})," differenzierbar mit ",e.jsx(n,{children:"g'(0) = \\corange{\\nabla f(\\cgreen{\\bx^\\star})}\\,\\bh"}),`.
Wir betrachten den Differenzenquotienten von zwei Seiten. Für hinreichend
kleine `,e.jsx(n,{children:"t > 0"})," ist ",e.jsx(n,{children:"(g(t) - g(0))/t \\ge 0"}),`, weil der Zähler nicht negativ ist; im
Grenzwert folgt `,e.jsx(n,{children:"g'(0) \\ge 0"}),". Für hinreichend kleine ",e.jsx(n,{children:"t < 0"}),` dreht der Nenner das
Vorzeichen um, wir erhalten `,e.jsx(n,{children:"(g(t) - g(0))/t \\le 0"}),` und im Grenzwert
`,e.jsx(n,{children:"g'(0) \\le 0"}),". Beides zusammen ergibt ",e.jsx(n,{children:"g'(0) = 0"}),"."]})}),e.jsx(re,{why:e.jsx(e.Fragment,{children:"Ein Zeilenvektor, der auf jedem Einheitsvektor verschwindet, ist der Nullvektor"}),children:e.jsxs(i.p,{children:["Der zweite Schritt gilt für ",e.jsx(i.em,{children:"jedes"})," ",e.jsx(n,{children:"\\bh"}),`. Setzen wir nacheinander die
Einheitsvektoren `,e.jsx(n,{children:"\\bh = \\be_j"}),` ein, so steht dort
`,e.jsx(n,{children:"\\corange{\\nabla f(\\cgreen{\\bx^\\star})}\\,\\be_j = \\partial f(\\cgreen{\\bx^\\star}) / \\partial x_j = 0"}),`
für `,e.jsx(n,{children:"j = 1, \\dots, n"}),", und das ist ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"}),`. Für ein lokales Maximum wenden wir
das Gezeigte auf `,e.jsx(n,{children:"-f"})," an und benutzen ",e.jsx(i.a,{href:"#env-maximieren-ist-minimieren",children:"Bemerkung 12.2.2"}),"."]})})]})}),`
`,e.jsx(D,{kind:"Definition",label:"12.2.4 (Stationärer Punkt)",id:"env-stationaerer-punkt",children:e.jsxs(i.p,{children:["Ein Punkt ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})," heißt ",e.jsx(i.em,{children:`stationärer
Punkt`})," von ",e.jsx(n,{children:"f"}),". In ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),` heißt derselbe Punkt
`,e.jsx(i.em,{children:"kritischer Punkt"}),"; beide Wörter sind gebräuchlich und meinen dasselbe."]})}),`
`,e.jsxs(i.p,{children:["Die Bedingung erster Ordnung ist ",e.jsx(i.em,{children:"notwendig"}),`, nicht hinreichend: Ein
stationärer Punkt kann
ebenso ein Maximum oder ein Sattelpunkt sein. Außerdem gilt sie nur im
`,e.jsx(i.em,{children:"Inneren"}),". Am Rand der zulässigen Menge darf der ",e.jsx(d,{id:"env:gradient",children:"Gradient"}),` im Minimum von null
verschieden sein, so bei `,e.jsx(n,{children:"f(x) = x"})," auf ",e.jsx(n,{children:"\\Xcal = [0, 1]"})," mit Minimum in ",e.jsx(n,{children:"0"}),` und
`,e.jsx(n,{children:"f'(0) = 1"}),"; davon handelt ",e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.2.5 (Optimieren heißt Gleichungen lösen)",id:"env-optimieren-heisst-gleichungen-loesen",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"})," ist ein System aus ",e.jsx(n,{children:"n"})," Gleichungen in ",e.jsx(n,{children:"n"}),` Unbekannten, meist
nichtlinear. Damit sind wir wieder bei `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`, und die
dortigen Verfahren stehen bereit. Insbesondere ist`]}),e.jsx(ne,{tag:"12.2.3",id:"eq-optimieren-heisst-gleichungen-loesen",children:"\\Phi(\\bx) := \\bx - \\gamma\\,\\corange{\\nabla f(\\bx)}^\\top"}),e.jsxs(i.p,{children:["eine ",e.jsx(d,{id:"fixed-point-iteration",children:"Fixpunktabbildung"}),`, deren Fixpunkte genau die
stationären Punkte von `,e.jsx(n,{children:"f"})," sind, denn ",e.jsx(n,{children:"\\Phi(\\bx) = \\bx"})," gilt für ",e.jsx(n,{children:"\\gamma \\neq 0"}),`
genau dann, wenn `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})," ist. Die zu ",e.jsx(i.a,{href:"#eq-optimieren-heisst-gleichungen-loesen",children:"(12.2.3)"}),`
gehörige Fixpunktiteration `,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\Phi(\\cblue{\\bx^{(k)}})"}),` ist der
`,e.jsx(d,{id:"gradient-descent",children:"Gradientenabstieg"})," aus ",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),"."]}),e.jsxs(i.p,{children:["Analytisch lösen lässt sich ",e.jsx(i.a,{href:"#eq-notwendige-bedingung-erster-ordnung",children:"(12.2.2)"}),` nur in
Sonderfällen, etwa bei den kleinsten Quadraten: Dort ist der Gradient linear in
`,e.jsx(n,{children:"\\bbeta"}),", und aus der Bedingung werden die Normalgleichungen aus ",e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),`. Sobald
das Modell nichtlinear wird, iterieren wir.`]})]}),`
`,e.jsx(i.h3,{children:"Lokal oder global"}),`
`,e.jsxs(i.p,{children:[`Ein Verfahren, das nur die Umgebung des aktuellen Punktes ansieht, kann
grundsätzlich nur lokale Minima finden. Ob das genügt, entscheidet die
Zielfunktion; die beiden Antworten hat `,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),`
bewiesen.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lokal ist global."})," Sind ",e.jsx(n,{children:"\\Xcal \\subseteq \\R^n"}),` konvex und
`,e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"})," ",e.jsx(d,{id:"convexity",children:"konvex"}),`, so ist jedes lokale Minimum von
`,e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"\\Xcal"})," auch ein globales, und zwar ohne jede ",e.jsx(d,{id:"env:differenzierbarkeit",children:"Differenzierbarkeit"}),`
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),"). Ist ",e.jsx(n,{children:"f"}),` differenzierbar, so steht in
`,e.jsx(d,{id:"env:kritischer-punkt-und-globales-minimum",href:"?k=11-konvexitaet#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` sogar die schärfere Fassung: Dann ist
schon jeder stationäre Punkt ein globales Minimum. Ein lokal suchendes Verfahren
kann bei konvexem `,e.jsx(n,{children:"f"}),` also nichts verpassen; deshalb ist Konvexität für die
Optimierung so wichtig.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Höchstens eine Lösung."})," Ist ",e.jsx(n,{children:"f"}),` darüber hinaus strikt konvex, gilt also
`,e.jsx(n,{children:"f\\bigl(\\lambda\\bx + (1-\\lambda)\\by\\bigr) < \\lambda f(\\bx) + (1-\\lambda) f(\\by)"}),`
für alle `,e.jsx(n,{children:"\\bx \\neq \\by"})," in ",e.jsx(n,{children:"\\Xcal"})," und alle ",e.jsx(n,{children:"\\lambda \\in (0, 1)"}),", so hat ",e.jsx(n,{children:"f"}),` auf
`,e.jsx(n,{children:"\\Xcal"})," nach ",e.jsx(d,{id:"env:hoechstens-eine-minimalstelle",href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` höchstens einen Minimierer.
Über die `,e.jsx(i.em,{children:"Existenz"}),` eines Minimierers sagt keine der beiden Aussagen etwas:
`,e.jsx(n,{children:"f(x) = e^x"})," ist auf ",e.jsx(n,{children:"\\R"})," strikt konvex und hat kein Minimum."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.2.6 (Beide Sätze brauchen zwei Konvexitätsbedingungen)",id:"env-beide-saetze-brauchen-zwei",children:[e.jsxs(i.p,{children:[`In beiden Sätzen ist die Konvexität der zulässigen Menge so wesentlich wie die
der Zielfunktion. Die Beweise in `,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),` zeigen,
warum: Der Vergleichspunkt muss `,e.jsx(i.em,{children:"zulässig"}),` sein, dafür sorgt die Menge, und er
muss `,e.jsx(i.em,{children:"besser"})," sein, dafür sorgt die Funktion."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Ohne ",e.jsx(d,{id:"env:konvexe-menge",children:"konvexe Menge"})," keine Eindeutigkeit."]}),` Wir nehmen
`,e.jsx(n,{children:"\\cred{\\Xcal = \\{-1, +1\\}}"})," und ",e.jsx(n,{children:"f(y) = y^2"}),`. Die Zielfunktion ist strikt konvex,
und trotzdem sind `,e.jsx(n,{children:"y = -1"})," und ",e.jsx(n,{children:"y = +1"})," beide optimal mit dem Wert ",e.jsx(n,{children:"1"}),`. Der
Mittelpunkt `,e.jsx(n,{children:"\\bz = 0"})," hätte den kleineren Wert ",e.jsx(n,{children:"0"}),`, er ist aber nicht zulässig,
und der Widerspruch aus dem Beweis von `,e.jsx(d,{id:"env:hoechstens-eine-minimalstelle",href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` entsteht gar nicht
erst.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Das Projektionstheorem"})," (",e.jsx(d,{id:"env:projektionstheorem",href:"?k=11-konvexitaet#env-projektionstheorem",children:"Satz 11.3.1"}),`) minimiert
`,e.jsx(n,{children:"\\left\\|\\bx - \\by\\right\\|^2"})," über alle ",e.jsx(n,{children:"\\by"}),` einer abgeschlossenen konvexen
Menge. Dort steht
nur eine Bedingung an die Menge, weil die quadrierte Distanz in `,e.jsx(n,{children:"\\by"}),` ohnehin
strikt konvex ist.`]})]}),`
`,e.jsxs(pe,{title:"Warum die quadrierte Norm strikt konvex ist",children:[e.jsxs(i.p,{children:["Die ",e.jsx(d,{id:"triangle-inequality",children:"Dreiecksungleichung"}),` liefert
`,e.jsx(n,{children:"\\left\\|\\lambda\\ba + (1-\\lambda)\\bb\\right\\| \\le \\lambda\\left\\|\\ba\\right\\| + (1-\\lambda)\\left\\|\\bb\\right\\|"}),`
und damit nur die Konvexität der `,e.jsx(d,{id:"norm",children:"Norm"}),`, nicht die strikte. Gleichheit
tritt nämlich ein, sobald `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"}),` in dieselbe Richtung zeigen: Für
`,e.jsx(n,{children:"\\ba = (1; 0)"}),", ",e.jsx(n,{children:"\\bb = (2; 0)"})," und ",e.jsx(n,{children:"\\lambda = \\tfrac12"}),` stehen auf beiden Seiten
`,e.jsx(n,{children:"1{,}5"}),". Die ",e.jsx(i.em,{children:"quadrierte"}),` Norm ist dagegen strikt konvex, und zwar wegen der
Identität`]}),e.jsx(ne,{tag:"12.2.4",id:"eq-beide-saetze-brauchen-zwei",children:`\\left\\|\\lambda\\ba + (1-\\lambda)\\bb\\right\\|^2
= \\lambda\\left\\|\\ba\\right\\|^2 + (1-\\lambda)\\left\\|\\bb\\right\\|^2
- \\cred{\\lambda(1-\\lambda)\\left\\|\\ba - \\bb\\right\\|^2} ,`}),e.jsxs(i.p,{children:[`die durch Ausmultiplizieren mit der Bilinearität des
`,e.jsx(d,{id:"dot-product",children:"Skalarprodukts"}),` entsteht und der Parallelogrammgleichung
entspricht. Für `,e.jsx(n,{children:"\\ba \\neq \\bb"})," und ",e.jsx(n,{children:"\\lambda \\in (0, 1)"}),` ist der rote Term strikt
negativ, und das ist die strikte Konvexität. Weil `,e.jsx(n,{children:"t \\mapsto t^2"}),` auf
`,e.jsx(n,{children:"[0, \\infty)"}),` streng wächst, haben Distanz und quadrierte Distanz dieselben
Minimierer; das Quadrieren ändert die Lösung also nicht und liefert die strikte Konvexität.
Gebraucht wird dafür das Skalarprodukt, nicht nur eine Norm.`]})]}),`
`,e.jsx(i.h3,{children:"Konvexe Verlustfunktionen in Statistik und ML"}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.2.7 (Vier konvexe Verlustfunktionen)",id:"env-vier-konvexe-verlustfunktionen",children:[e.jsxs(i.p,{children:[`Welche Probleme aus Statistik und maschinellem Lernen konvex sind und welche nicht,
ordnet `,e.jsx(i.a,{href:"?k=11-konvexitaet#env-eine-landkarte-der-optimierungsprobleme",children:"Bemerkung 11.5.7"}),` ein; hier rechnen wir vier
Standardfälle nach.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kleinste Quadrate."})," Für ",e.jsx(n,{children:"L(\\bbeta) = \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),` ist der
Gradient `,e.jsx(n,{children:"\\corange{\\nabla L(\\bbeta)} = 2(\\bX\\bbeta - \\by)^\\top\\bX"}),` und die
Hesse-Matrix`]}),e.jsx(F,{children:"\\corange{\\bH_L} = 2\\bX^\\top\\bX ."}),e.jsxs(i.p,{children:[`Sie ist stets positiv semidefinit, denn
`,e.jsx(n,{children:"\\bh^\\top\\bX^\\top\\bX\\bh = \\left\\|\\bX\\bh\\right\\|_2^2 \\ge 0"}),`, und positiv definit
genau dann, wenn `,e.jsx(n,{children:"\\bX"})," vollen Spaltenrang hat: Nur dann folgt aus ",e.jsx(n,{children:"\\bh \\neq \\bnull"}),`
auch `,e.jsx(n,{children:"\\bX\\bh \\neq \\bnull"}),". Mit vollem Spaltenrang ist ",e.jsx(n,{children:"L"}),` also strikt konvex und
der Kleinste-Quadrate-Schätzer nach `,e.jsx(d,{id:"env:hoechstens-eine-minimalstelle",href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"})," eindeutig."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ridge-Regression."})," Der Strafterm addiert eine Krümmung dazu,"]}),e.jsx(F,{children:`f(\\bbeta) = \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2 + \\lambda\\left\\|\\bbeta\\right\\|_2^2 ,
\\qquad
\\corange{\\bH_f} = 2\\bigl(\\bX^\\top\\bX + \\lambda\\bI_p\\bigr) .`}),e.jsxs(i.p,{children:["Die Eigenwerte von ",e.jsx(n,{children:"\\corange{\\bH_f}"})," sind ",e.jsx(n,{children:"2(\\mu_i + \\lambda)"}),", wenn ",e.jsx(n,{children:"\\mu_i \\ge 0"}),`
die Eigenwerte von `,e.jsx(n,{children:"\\bX^\\top\\bX"})," sind. Für ",e.jsx(n,{children:"\\lambda > 0"}),` sind sie alle positiv, und
zwar unabhängig vom `,e.jsx(d,{id:"rank",children:"Rang"})," von ",e.jsx(n,{children:"\\bX"}),`. Ridge macht so aus einem
rangdefekten Problem mit unendlich vielen Lösungen eines mit genau einer; den
Gradienten dazu haben wir in `,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),`
gerechnet.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Negative Log-Likelihood."}),` Ist die Log-Likelihood konkav, so ist ihr Negatives
konvex, und die Maximum-Likelihood-Schätzung wird zu einem konvexen
Minimierungsproblem. Das ist bei vielen Standardmodellen so, etwa bei der
Normalverteilung mit bekannter Varianz, wo wieder das `,e.jsx(d,{id:"env:kleinste-quadrate-problem-kq-problem",children:"Kleinste-Quadrate-Problem"}),`
herauskommt, und bei der logistischen Regression
(`,e.jsx(i.a,{href:"?k=11-konvexitaet#env-logistische-regression-ist-ein-konvexes",children:"Beispiel 11.4.12"}),`). Die Log-Likelihood einer
`,e.jsx(d,{id:"gaussian-mixture-model",children:"Mischverteilung"}),` dagegen ist nicht konkav und hat
typischerweise mehrere lokale Optima.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hinge-Loss."}),` Die Support-Vector-Machine summiert über die Daten den
`,e.jsx(i.em,{children:"Hinge-Verlust"})," ",e.jsx(n,{children:"L(y, \\wh{y}) = \\max(0,\\, 1 - y\\wh{y})"}),` und addiert einen
Strafterm. Als punktweises Maximum zweier affiner
Funktionen ist der Hinge-Loss konvex
(`,e.jsx(d,{id:"env:operationen-die-konvexitaet-erhalten",href:"?k=11-konvexitaet#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),`), aber weder strikt konvex noch
überall differenzierbar: Für `,e.jsx(n,{children:"y\\wh{y} \\ge 1"}),` ist er konstant null, und bei
`,e.jsx(n,{children:"y\\wh{y} = 1"}),` hat er einen Knick. Verfahren, die nur Gradienten kennen, brauchen
dort Subgradienten (`,e.jsx(d,{id:"env:subgradient-und-subdifferential",href:"?k=11-konvexitaet#env-subgradient-und-subdifferential",children:"Definition 11.4.14"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Sattelpunkte"}),`
`,e.jsxs(i.p,{children:["Bei nicht-konvexen Funktionen sagt ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),` wenig.
Der Punkt kann ein Minimum sein, ein Maximum, oder keines von beidem.`]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.2.8 (Sattelpunkt)",id:"env-sattelpunkt",children:[e.jsxs(i.p,{children:["Ein stationärer Punkt ",e.jsx(n,{children:"\\bx^\\star"})," von ",e.jsx(n,{children:"f"})," heißt ",e.jsx(i.em,{children:"Sattelpunkt"}),`, wenn jede
Umgebung von `,e.jsx(n,{children:"\\bx^\\star"})," Punkte ",e.jsx(n,{children:"\\bx_-"})," und ",e.jsx(n,{children:"\\bx_+"})," enthält mit"]}),e.jsx(F,{children:"f(\\bx_-) < f(\\bx^\\star) < f(\\bx_+) ."}),e.jsxs(i.p,{children:["Ist die ",e.jsx(d,{id:"hessian-matrix",children:"Hesse-Matrix"}),`
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})," ",e.jsx(i.em,{children:"indefinit"}),`, hat sie also sowohl positive als auch
negative `,e.jsx(d,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),`, so sprechen wir genauer von
einem `,e.jsx(i.em,{children:"Sattelpunkt mit indefiniter Hesse-Matrix"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Für zweimal stetig differenzierbares ",e.jsx(n,{children:"f"}),` ist eine indefinite Hesse-Matrix
hinreichend für einen Sattelpunkt (`,e.jsx(d,{id:"env:hesse-kriterium-fuer-kritische-punkte",href:"?k=10-differentialrechnung#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`),
aber nicht notwendig: Bei `,e.jsx(n,{children:"f(x)=x^3"})," ist ",e.jsx(n,{children:"x=0"}),` ein Sattelpunkt, obwohl
`,e.jsx(n,{children:"f''(0)=0"})," ist. Praktisch wichtig ist vor allem der indefinite Fall."]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.2.9 (Der Standardsattel)",id:"env-der-standardsattel",children:[e.jsx(i.p,{children:"Wir rechnen den einfachsten Fall vollständig durch. Sei"}),e.jsx(F,{children:"f(x, y) = \\cgreen{x^2} - \\cred{y^2} ."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Stationäre Punkte."}),` Der Gradient ist
`,e.jsx(n,{children:"\\corange{\\nabla f(x, y)} = (2x,\\, -2y)"}),`, und er verschwindet genau im Ursprung.
Der einzige stationäre Punkt ist also `,e.jsx(n,{children:"\\cpurp{\\bx^\\star = (0; 0)}"}),` (violett:
weder Iterierte noch Ziel).`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hesse-Matrix."})," Zweimaliges Ableiten gibt"]}),e.jsx(F,{children:"\\corange{\\bH_f(x, y)} = \\begin{pmatrix} 2 & 0 \\\\ 0 & -2 \\end{pmatrix} ,"}),e.jsxs(i.p,{children:["und zwar an jeder Stelle dieselbe Matrix, weil ",e.jsx(n,{children:"f"}),` quadratisch ist. Sie ist
diagonal, ihre Eigenwerte stehen also ablesbar auf der Diagonalen:
`,e.jsx(n,{children:"\\lambda_1 = 2 > 0"})," zum Eigenvektor ",e.jsx(n,{children:"\\be_1"})," und ",e.jsx(n,{children:"\\lambda_2 = -2 < 0"}),` zum
Eigenvektor `,e.jsx(n,{children:"\\be_2"}),`. Die Vorzeichen sind verschieden, die Matrix ist indefinit,
und `,e.jsx(n,{children:"\\cpurp{\\bx^\\star}"})," ist ein Sattelpunkt."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Was das geometrisch heißt."})," Schneiden wir ",e.jsx(n,{children:"f"}),` entlang der beiden Achsen, so
sehen wir zwei Parabeln mit entgegengesetzter Öffnung:`]}),e.jsx(F,{children:`f(t, 0) = \\cgreen{t^2} \\quad (\\text{Minimum in } t = 0) ,
\\qquad
f(0, t) = \\cred{-t^2} \\quad (\\text{Maximum in } t = 0) .`}),e.jsxs(i.p,{children:[`Derselbe Punkt ist in der einen Richtung der tiefste und in der anderen der
höchste seiner Umgebung. Die `,e.jsx(d,{id:"level-sets",children:"Höhenlinien"}),` machen das sichtbar: Das
Niveau `,e.jsx(n,{children:"f = 0"})," besteht aus den beiden Geraden ",e.jsx(n,{children:"y = \\pm x"}),`, die positiven Niveaus
sind Hyperbeln, die in `,e.jsx(n,{children:"x"}),`-Richtung öffnen, die negativen Hyperbeln öffnen in
`,e.jsx(n,{children:"y"}),"-Richtung."]})]}),`
`,e.jsx(i.p,{children:"Kann ein Verfahren an einem solchen Punkt hängenbleiben?"}),`
`,e.jsxs(Me,{title:"Zwei Verfahren am Sattelpunkt",children:[e.jsxs(i.p,{children:["Die Tafel zeichnet die Höhenlinien von ",e.jsx(i.a,{href:"#env-der-standardsattel",children:"Beispiel 12.2.9"}),` und hängt zwei
Verfahren daran.`]}),e.jsx(Re,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Von welchen Startpunkten aus läuft der ",e.jsx(i.em,{children:"Gradientenabstieg"})," in den Sattelpunkt?"]}),optionen:[{id:"alle",text:"von fast allen"},{id:"achse",text:"nur von der grünen Achse aus"},{id:"keiner",text:"von keinem"}],loesung:"achse",verdeckt:e.jsxs(e.Fragment,{children:["Der zweite Start trifft diesen Fall: Auf dem Strahl ",e.jsx(n,{children:"y = 0"})," bleibt die zweite Komponente in jedem Schritt exakt null, und der Abstieg läuft in den Sattelpunkt. Dieser eine Strahl hat in der Ebene Maß null."]}),children:e.jsx($t,{})}),e.jsxs(i.p,{children:[`Die beiden Verfahren gehen gegensätzlich mit dem Sattel um. Der Newton-Knopf
landet von jedem Startpunkt aus in einem einzigen Schritt exakt in
`,e.jsx(n,{children:"\\cpurp{\\bx^\\star}"}),", denn ",e.jsx(n,{children:"f"}),` ist quadratisch und seine Näherung zweiter Ordnung
damit exakt. Der Gradientenabstieg dagegen entkommt: Mit `,e.jsx(n,{children:"\\gamma = 0{,}25"}),` steht
er aus `,e.jsx(n,{children:"(1{,}5;\\, 0{,}4)"})," nach acht Schritten bei ",e.jsx(n,{children:"(0{,}0059;\\, 10{,}25)"}),`; die
erste Komponente fällt gegen null, die zweite wächst.`]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.2.10 (Was Sattelpunkte für die Verfahren bedeuten)",id:"env-was-sattelpunkte-fuer-die-verfahren",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Newton läuft hinein."})," Der ",e.jsx(d,{id:"newtons-method",children:"Newton-Schritt"}),` aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),` sucht eine Nullstelle des
Gradienten, und ein Sattelpunkt ist eine. Für unser `,e.jsx(n,{children:"f"}),` ist
`,e.jsx(n,{children:"\\corange{\\bH_f^{-1}} = \\diag(\\tfrac12, -\\tfrac12)"}),`, und der Schritt
`,e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = \\bx - \\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f(\\bx)}^\\top"}),`
ergibt`]}),e.jsx(F,{children:`\\cblue{\\bx^{(1)}}
= \\begin{pmatrix} x \\\\ y \\end{pmatrix}
- \\begin{pmatrix} \\tfrac12 & 0 \\\\ 0 & -\\tfrac12 \\end{pmatrix}
\\begin{pmatrix} 2x \\\\ -2y \\end{pmatrix}
= \\begin{pmatrix} x - x \\\\ y - y \\end{pmatrix}
= \\cpurp{\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}} ,`}),e.jsxs(i.p,{children:[`und zwar von jedem Startpunkt aus. Ein Verfahren, das die Krümmung benutzt, ohne
auf ihr Vorzeichen zu achten, konvergiert gegen Sattelpunkte wie gegen Minima
(Gegenmittel in `,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Gradientenabstieg entkommt."})," Mit Schrittweite ",e.jsx(n,{children:"\\gamma"}),` lautet die Iteration
komponentenweise`]}),e.jsx(ne,{tag:"12.2.5",id:"eq-was-sattelpunkte-fuer-die-verfahren",children:`\\cblue{x^{(k+1)}} = (1 - 2\\gamma)\\,\\cblue{x^{(k)}} ,
\\qquad
\\cblue{y^{(k+1)}} = (1 + 2\\gamma)\\,\\cblue{y^{(k)}} .`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"0 < \\gamma < \\tfrac12"})," schrumpft nach ",e.jsx(i.a,{href:"#eq-was-sattelpunkte-fuer-die-verfahren",children:"(12.2.5)"}),` die erste Komponente, die
zweite wächst in jedem Schritt um den Faktor `,e.jsx(n,{children:"\\cred{1 + 2\\gamma} > 1"}),`. Nur wer exakt auf der
`,e.jsx(n,{children:"x"}),"-Achse startet, also mit ",e.jsx(n,{children:"y^{(0)} = 0"}),`, landet im Sattel. Diese Startmenge ist
eine Gerade im `,e.jsx(n,{children:"\\R^2"}),` und hat Maß null. In der Praxis genügt schon
Rundungsrauschen, um sie zu verfehlen; das Rauschen des stochastischen
Gradientenabstiegs (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),") hilft zusätzlich."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hohe Dimension."})," Ist kein Eigenwert von ",e.jsx(n,{children:"\\corange{\\bH_f}"}),` null, so verlangt ein
Minimum, dass `,e.jsx(i.em,{children:"alle"})," ",e.jsx(n,{children:"n"}),` Eigenwerte positiv sind; für einen Sattelpunkt genügen
gemischte Vorzeichen. In hochdimensionalen, nicht-konvexen Problemen sind
Sattelpunkte deshalb meist häufiger als lokale Minima; eine Münzwurf-Faustregel
dazu steht in `,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-praxisrelevanz-der-hesse-matrix",children:"Bemerkung 10.7.13"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Optimalitätsbedingungen im Überblick"}),`
`,e.jsxs(i.p,{children:["Für zweimal stetig differenzierbares ",e.jsx(n,{children:"f"}),` fasst der folgende Satz die
Bedingungen zusammen.`]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.2.11 (Bedingungen erster und zweiter Ordnung)",id:"env-bedingungen-erster-und-zweiter-ordnung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," und ",e.jsx(n,{children:"\\bx^\\star \\in S"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Notwendig, erste Ordnung."})," Ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein lokales Minimum, so gilt
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Notwendig, zweite Ordnung."})," Ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein lokales Minimum, so ist
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)} \\succeq 0"}),", also positiv semidefinit."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Hinreichend, zweite Ordnung."})," Gilt ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),`
und ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)} \\succ 0"}),`, also
`,e.jsx(d,{id:"positive-definite",children:"positiv definit"}),", so ist ",e.jsx(n,{children:"\\bx^\\star"}),` ein striktes lokales
Minimum.`]}),`
`]})]}),`
`,e.jsx(pe,{title:"Beweis der notwendigen Bedingung zweiter Ordnung",children:e.jsxs(sn,{children:[e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["Der lineare Term fällt weg, weil ",e.jsx(n,{children:"\\bx^\\star"})," nach Teil 1 stationär ist"]}),children:[e.jsxs(i.p,{children:["Teil 1 ist ",e.jsx(d,{id:"env:notwendige-bedingung-erster-ordnung",href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),", und Teil 3 ist ",e.jsx(d,{id:"env:hesse-kriterium-fuer-kritische-punkte",href:"?k=10-differentialrechnung#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`(1) aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`. Zu zeigen bleibt Teil 2. Sei
`,e.jsx(n,{children:"\\bh \\in \\R^n"})," beliebig und wieder ",e.jsx(n,{children:"g(t) = f(\\bx^\\star + t\\bh)"}),` wie im Beweis von
`,e.jsx(d,{id:"env:notwendige-bedingung-erster-ordnung",href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),". Die ",e.jsx(d,{id:"taylor-theorem",children:"Taylorentwicklung"}),` zweiter Ordnung aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),` gibt mit
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"})," aus Teil 1"]}),e.jsx(F,{children:`g(t) = g(0) + \\tfrac{1}{2}\\,t^2\\,\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh
+ \\cred{o(t^2)}
\\qquad (t \\to 0) .`})]}),e.jsxs(re,{why:e.jsx(e.Fragment,{children:"Hier bleibt nur die schwache Ungleichung übrig: Der Grenzwert einer Folge nichtnegativer Zahlen ist nichtnegativ, aber nicht notwendig positiv"}),children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bx^\\star"})," ein lokales Minimum ist, gilt ",e.jsx(n,{children:"g(t) \\ge g(0)"}),` für alle
hinreichend kleinen `,e.jsx(n,{children:"\\left|t\\right|"}),". Wir ziehen ",e.jsx(n,{children:"g(0)"}),` ab und teilen durch
`,e.jsx(n,{children:"t^2 > 0"}),":"]}),e.jsx(F,{children:`0 \\le \\frac{g(t) - g(0)}{t^2}
= \\tfrac{1}{2}\\,\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh + \\frac{\\cred{o(t^2)}}{t^2} .`}),e.jsxs(i.p,{children:["Der rote Quotient verschwindet für ",e.jsx(n,{children:"t \\to 0"}),`, also bleibt
`,e.jsx(n,{children:"\\bh^\\top\\corange{\\bH_f(\\bx^\\star)}\\,\\bh \\ge 0"})," stehen. Weil ",e.jsx(n,{children:"\\bh"}),` beliebig war,
ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})," positiv semidefinit."]})]})]})}),`
`,e.jsx(D,{kind:"Bemerkung",label:"12.2.12 (Warum die Rückrichtung nicht gilt)",id:"env-warum-die-rueckrichtung-nicht-gilt",children:e.jsxs(i.p,{children:["Teil 3 lässt sich nicht umkehren: ",e.jsx(n,{children:"\\cred{f(x) = x^4}"})," hat in ",e.jsx(n,{children:"x = 0"}),` ein
striktes globales Minimum, aber `,e.jsx(n,{children:"f''(0) = 0"}),`, die Hesse-Matrix
`,e.jsx(n,{children:"\\corange{\\bH_f(0)} = (0)"}),` ist also nicht positiv definit. Aus einem lokalen
Minimum folgt nur die Semidefinitheit aus Teil 2.
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"})," stellt ",e.jsx(n,{children:"x^4"}),", ",e.jsx(n,{children:"-x^4"}),` und
`,e.jsx(n,{children:"x^3"}),` nebeneinander: dieselbe Hesse-Matrix im Nullpunkt, drei verschiedene
Antworten.`]})}),`
`,e.jsxs(i.p,{children:["Für stationäre Punkte, ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),`, fasst eine
Tabelle die Fälle zusammen:`]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:e.jsx(n,{children:"\\corange{\\bH_f(\\bx^\\star)}"})}),e.jsxs(i.th,{children:[e.jsx(n,{children:"\\bx^\\star"})," ist"]})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(n,{children:"\\succ 0"})," (positiv definit)"]}),e.jsx(i.td,{children:"striktes lokales Minimum"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(n,{children:"\\prec 0"})," (negativ definit)"]}),e.jsx(i.td,{children:"striktes lokales Maximum"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"indefinit"}),e.jsx(i.td,{children:"Sattelpunkt"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"semidefinit, aber nicht definit"}),e.jsx(i.td,{children:"unklar, weitere Analyse nötig"})]})]})]}),`
`,e.jsxs(i.p,{children:[`In der letzten Zeile entscheidet die zweite Ableitung nichts, und wir müssen
höhere Ableitungen ansehen oder anders argumentieren. Ein einzelner Eigenwert
null führt nicht automatisch dorthin: `,e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(1, -1, 0)"}),` ist
indefinit, und die dritte Zeile greift.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.2.13 (Was Konvexität aus der Tabelle macht)",id:"env-was-konvexitaet-aus-der-tabelle-macht",children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," auf einer offenen konvexen Menge ",e.jsx(n,{children:"S"}),` konvex und zweimal stetig
differenzierbar, so ist `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} \\succeq 0"})," an ",e.jsx(i.em,{children:"jeder"}),` Stelle
(`,e.jsx(d,{id:"env:konvexitaet-und-positive-semidefinitheit",href:"?k=10-differentialrechnung#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"}),`); die indefinite Zeile der
Tabelle bleibt leer. Außerdem wird die Bedingung erster Ordnung hinreichend:
Jeder stationäre Punkt ist ein globales Minimum
(`,e.jsx(d,{id:"env:kritischer-punkt-und-globales-minimum",href:"?k=11-konvexitaet#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),`). Eine konvexe Funktion hat also
keine Sattelpunkte, und jedes lokale Minimum ist global.`]}),e.jsxs(i.p,{children:["Bei einem konvexen Problem genügt deshalb ein ",e.jsx(i.em,{children:"verschwindender"}),` Gradient. Ein
`,e.jsx(i.em,{children:"kleiner"}),` Gradient garantiert noch nicht, dass wir nahe am Minimum sind; darauf
kommen die Abbruchkriterien in `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," zurück."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Punkt mit ",e.jsx(n,{children:"\\nabla f(\\bx^\\star) = \\bnull^\\top"})," ist ein lokales Minimum von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:["Die Bedingung ist notwendig, nicht hinreichend (",e.jsx(d,{id:"env:notwendige-bedingung-erster-ordnung",href:"#env-notwendige-bedingung-erster-ordnung",children:"Satz 12.2.3"}),`). Der Ursprung ist ein
stationärer Punkt von `,e.jsx(n,{children:"f(x, y) = x^2 - y^2"}),`, aber weder Minimum noch Maximum,
sondern ein Sattelpunkt: entlang der `,e.jsx(n,{children:"x"}),`-Achse geht es nach oben, entlang der
`,e.jsx(n,{children:"y"}),"-Achse nach unten."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Ein Maximierungsproblem lässt sich ohne Verlust in ein Minimierungsproblem
umschreiben.`}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\max f = -\\min(-f)"}),", und die Maximierer von ",e.jsx(n,{children:"f"}),` sind genau die Minimierer
von `,e.jsx(n,{children:"-f"})," (",e.jsx(i.a,{href:"#env-maximieren-ist-minimieren",children:"Bemerkung 12.2.2"}),`). Deshalb minimieren
Softwarebibliotheken die `,e.jsx(i.em,{children:"negative"})," Log-Likelihood."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:`Ist die Zielfunktion strikt konvex, so hat das Optimierungsproblem höchstens eine
Lösung, gleichgültig, wie die zulässige Menge aussieht.`}),e.jsxs(i.p,{children:[e.jsx(d,{id:"env:hoechstens-eine-minimalstelle",href:"?k=11-konvexitaet#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` braucht beide Konvexitätsbedingungen. Auf
`,e.jsx(n,{children:"\\Xcal = \\{-1, +1\\}"})," ist ",e.jsx(n,{children:"f(y) = y^2"}),` strikt konvex, und trotzdem sind beide
Punkte optimal mit dem Wert `,e.jsx(n,{children:"1"})," (",e.jsx(i.a,{href:"#env-beide-saetze-brauchen-zwei",children:"Bemerkung 12.2.6"}),")."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Hesse-Matrix ",e.jsx(n,{children:"2\\bX^\\top\\bX"}),` des Kleinste-Quadrate-Problems ist immer positiv
semidefinit, aber nur bei vollem Spaltenrang von `,e.jsx(n,{children:"\\bX"})," positiv definit."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\bh^\\top\\bX^\\top\\bX\\bh = \\left\\|\\bX\\bh\\right\\|_2^2 \\ge 0"}),`, also stets
semidefinit. Gleichheit tritt für ein `,e.jsx(n,{children:"\\bh \\neq \\bnull"}),` genau dann ein, wenn
`,e.jsx(n,{children:"\\bX\\bh = \\bnull"}),` gilt, wenn also die Spalten linear abhängig sind. Ohne vollen
Spaltenrang ist die Zielfunktion nur konvex, nicht strikt konvex, und das Minimum
ist nicht mehr eindeutig. Ridge repariert das, indem es `,e.jsx(n,{children:"2\\lambda"}),` auf jeden
Eigenwert addiert (`,e.jsx(i.a,{href:"#env-vier-konvexe-verlustfunktionen",children:"Beispiel 12.2.7"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\nabla f(\\bx^\\star) = \\bnull^\\top"}),` und positiv semidefiniter Hesse-Matrix
folgt, dass `,e.jsx(n,{children:"\\bx^\\star"})," ein lokales Minimum ist."]}),e.jsxs(i.p,{children:[`Semidefinit reicht nicht, das ist die letzte Zeile der Klassifikationstabelle. Für
`,e.jsx(n,{children:"f(x) = x^3"})," ist ",e.jsx(n,{children:"f'(0) = 0"})," und ",e.jsx(n,{children:"f''(0) = 0"}),`, die Hesse-Matrix also positiv
semidefinit, und trotzdem liegt in `,e.jsx(n,{children:"0"})," kein Minimum: links davon ist ",e.jsx(n,{children:"f"}),` negativ.
Positive `,e.jsx(i.em,{children:"Definitheit"})," dagegen genügt (",e.jsx(d,{id:"env:bedingungen-erster-und-zweiter-ordnung",href:"#env-bedingungen-erster-und-zweiter-ordnung",children:"Satz 12.2.11"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:"Das Newton-Verfahren umgeht Sattelpunkte, weil es die Krümmung mitbenutzt."}),e.jsxs(i.p,{children:["Es läuft eher hinein. Auf ",e.jsx(n,{children:"f(x, y) = x^2 - y^2"}),` landet ein einziger Newton-Schritt
von jedem Startpunkt aus exakt im Sattel `,e.jsx(n,{children:"(0; 0)"}),`, wie die Rechnung in
`,e.jsx(i.a,{href:"#env-was-sattelpunkte-fuer-die-verfahren",children:"Bemerkung 12.2.10"}),` zeigt. Der Gradientenabstieg
entkommt dagegen, weil er die
Komponente in der Richtung mit negativem Eigenwert in jedem Schritt um den Faktor
`,e.jsx(n,{children:"1 + 2\\gamma"})," vergrößert."]})]}),e.jsxs(Ki,{loesung:1.5,toleranz:.05,children:[e.jsxs(i.p,{children:["Mit welchem Faktor wächst im Widget die ",e.jsx(n,{children:"y"}),`-Komponente des Gradientenabstiegs pro
Schritt, wenn `,e.jsx(n,{children:"\\gamma = 0{,}25"})," eingestellt ist?"]}),e.jsxs(i.p,{children:["Die Iteration lautet ",e.jsx(n,{children:`y^{(k+1)} = y^{(k)} - \\gamma \\cdot (-2y^{(k)}) =
(1 + 2\\gamma)\\,y^{(k)}`}),", mit ",e.jsx(n,{children:"\\gamma = 0{,}25"})," also der Faktor ",e.jsx(n,{children:"1{,}5"}),`. Die
Ablesetafel des Widgets nennt ihn direkt; in der `,e.jsx(n,{children:"x"}),`-Richtung steht daneben
`,e.jsx(n,{children:"\\left|1 - 2\\gamma\\right| = 0{,}5"}),`. Wegen dieser Gegenläufigkeit entkommt der
Abstieg dem Sattel.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §6.1 stellt Optimierungsprobleme und ihre Sprechweisen
zusammen, §6.2.1 sammelt die Folgen der Konvexität und §6.2.2 die
Optimalitätsbedingungen ohne Nebenbedingungen; die Bedingungen mit
Nebenbedingungen (Heath §6.2.3) folgen in `,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),"."]})})]})}function Ft(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx($r,{...r})}):$r(r)}const gi=K.blau,Fr=K.gruen,Ti=K.orange,Bt=K.rot,Gt="#64748b",_i=(r,i=3)=>T(r,i),Lt="⁰¹²³⁴⁵⁶⁷⁸⁹";function Zi(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return"∞";if(r===0)return"0";if(Math.abs(r)>=.001)return _i(r,3);const[i,t]=r.toExponential(2).split("e"),a=Number(t),h=String(Math.abs(a)).split("").map(l=>Lt[Number(l)]).join("");return`${i.replace(".",",")} · 10${a<0?"⁻":""}${h}`}const qn=([r,i])=>(1-r)**2+5*(i-r*r)**2,ht=[{name:"Tal von oben",sim:[[-1.5,2.5],[-.7,2.6],[-1.3,1.8]]},{name:"flach von links",sim:[[-1.5,.5],[-.9,.5],[-1.5,1.1]]}];function Rt(r){const i=r.map(x=>({p:x,v:qn(x)})).sort((x,w)=>x.v-w.v),[t,a,h]=i,l=[(t.p[0]+a.p[0])/2,(t.p[1]+a.p[1])/2],s=[l[0]+(l[0]-h.p[0]),l[1]+(l[1]-h.p[1])],c=qn(s);if(c<t.v){const x=[l[0]+2*(l[0]-h.p[0]),l[1]+2*(l[1]-h.p[1])];return qn(x)<c?{next:[t.p,a.p,x],move:"Expansion"}:{next:[t.p,a.p,s],move:"Reflexion"}}if(c<a.v)return{next:[t.p,a.p,s],move:"Reflexion"};const p=c<h.v?[l[0]+.5*(l[0]-h.p[0]),l[1]+.5*(l[1]-h.p[1])]:[l[0]-.5*(l[0]-h.p[0]),l[1]-.5*(l[1]-h.p[1])];return qn(p)<Math.min(c,h.v)?{next:[t.p,a.p,p],move:"Kontraktion"}:{next:[t.p,[(t.p[0]+a.p[0])/2,(t.p[1]+a.p[1])/2],[(t.p[0]+h.p[0])/2,(t.p[1]+h.p[1])/2]],move:"Schrumpfen"}}function Kt(r,i){let t=ht[r].sim;const a={Reflexion:0,Expansion:0,Kontraktion:0,Schrumpfen:0},h=[{sim:t,move:"–",zaehler:{...a}}];for(let l=0;l<i;l++){const s=Rt(t);t=s.next,a[s.move]+=1,h.push({sim:t,move:s.move,zaehler:{...a}})}return h}const Br=60,kn=380,tn=380,Hn=[-2,2],Pn=[-1,3],un=r=>(r-Hn[0])/(Hn[1]-Hn[0])*kn,gn=r=>tn-(r-Pn[0])/(Pn[1]-Pn[0])*tn;function Et(){const[r,i]=B.useState(0),[t,a]=B.useState(0),h=B.useMemo(()=>Kt(r,Br),[r]),l=Math.min(t,h.length-1),s=h[l],c=h.slice(Math.max(0,l-13),l).map(j=>j.sim),p=B.useMemo(()=>{const b=[],E=[248,250,252],V=[71,85,105];for(let _=0;_<44;_++)for(let g=0;g<44;g++){const W=Hn[0]+(_+.5)/44*(Hn[1]-Hn[0]),C=Pn[0]+(g+.5)/44*(Pn[1]-Pn[0]),H=Math.min(1,Math.max(0,(Math.log10(qn([W,C])+.01)+2)/4)),X=Math.round(H*7)/7,S=E.map((R,U)=>Math.round(R+(V[U]-R)*X));b.push(e.jsx("rect",{x:_/44*kn,y:tn-(g+1)/44*tn,width:kn/44+.5,height:tn/44+.5,fill:`rgb(${S[0]},${S[1]},${S[2]})`,opacity:.5},`${_}-${g}`))}return b},[]),x=s.sim.map(j=>({p:j,v:qn(j)})).sort((j,b)=>j.v-b.v),w=j=>j.map(b=>`${un(b[0]).toFixed(1)},${gn(b[1]).toFixed(1)}`).join(" "),y=[(x[0].p[0]+x[1].p[0])/2,(x[0].p[1]+x[1].p[1])/2],o=[y[0]+(y[0]-x[2].p[0]),y[1]+(y[1]-x[2].p[1])],M=Math.max(...x.flatMap(j=>x.map(b=>Math.hypot(j.p[0]-b.p[0],j.p[1]-b.p[1])))),G=x[2].v-x[0].v,f=s.zaehler;let v,z,A;l===0?(v="neutral",z="Ausgangslage",A=`Der Startsimplex steht. Ein Schritt vorwärts wirft die schlechteste Ecke weg und probiert den Punkt auf der anderen Seite des Schwerpunkts, Zug 1 von ${O("algorithmus:nelder-mead-simplexverfahren")}.`):x[0].v<1e-6?(v="ok",z="im Minimum angekommen",A=`Der beste Eckpunkt liegt bei f = ${Zi(x[0].v)}, das Verfahren ist also am Ziel. Bis hierher standen ${f.Reflexion} Reflexionen, ${f.Expansion} Expansionen, ${f.Kontraktion} Kontraktionen und ${f.Schrumpfen} Schrumpfschritte auf der Rechnung: Die vier Züge von ${O("algorithmus:nelder-mead-simplexverfahren")} kommen sehr ungleich zum Einsatz, und die billigste Bewegung ist bei weitem nicht die häufigste.`):s.move==="Schrumpfen"?(v="warn",z="Schrumpfen",A="Weder Reflexion noch Kontraktion haben geholfen, deshalb zieht sich der ganze Simplex zur besten Ecke zusammen. Das ist der teuerste der vier Züge: Er kostet n neue Auswertungen und bringt keinen neuen besten Wert."):s.move==="Expansion"?(v="neutral",z="Expansion",A="Die Reflexion war besser als jede bisherige Ecke, deshalb hat das Verfahren in derselben Richtung gleich noch einmal nachgelegt. So läuft der Simplex ein langes Tal entlang, ohne je eine Ableitung zu sehen."):s.move==="Kontraktion"?(v="neutral",z="Kontraktion",A="Der gespiegelte Punkt war nicht gut genug; der neue Eckpunkt liegt näher am Schwerpunkt als die weggeworfene Ecke. Im gekrümmten Rosenbrock-Tal ist das der häufigste Zug, weil die Talsohle dem Simplex ständig wegkippt."):(v="neutral",z="Reflexion",A="Die gespiegelte Ecke ist besser als die zweitschlechteste und wird übernommen; der Simplex kippt über den Schwerpunkt hinweg. Das ist der Grundzug des Verfahrens und der einzige, der nichts kostet außer einer Auswertung.");const L=j=>j?Ke:$e;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(De,{children:"Spielen wir den Lauf ab und achten auf den Zugzähler: Welcher der vier Züge fällt am häufigsten, welcher gar nicht?"}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"inline-block",children:e.jsxs("svg",{viewBox:`0 0 ${kn} ${tn}`,width:kn,height:tn,role:"img","aria-label":`Der Nelder-Mead-Simplex nach ${l} Schritten über der Höhenkarte von f; letzter Zug: ${s.move}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[p,c.map((j,b)=>e.jsx("polygon",{points:w(j),fill:"none",stroke:gi,strokeWidth:1,opacity:.12+.4*b/Math.max(c.length,1)},b)),e.jsx("line",{x1:un(x[2].p[0]),y1:gn(x[2].p[1]),x2:un(o[0]),y2:gn(o[1]),stroke:Ti,strokeWidth:1.6,strokeDasharray:"5 4"}),e.jsx("circle",{cx:un(o[0]),cy:gn(o[1]),r:3,fill:Ti}),e.jsx("polygon",{points:w(s.sim),fill:gi,fillOpacity:.18,stroke:gi,strokeWidth:2}),x.map((j,b)=>e.jsx("circle",{cx:un(j.p[0]),cy:gn(j.p[1]),r:b===0?5:3.5,fill:gi},b)),e.jsx("circle",{cx:un(1),cy:gn(1),r:5,fill:"none",stroke:Fr,strokeWidth:2}),e.jsx("text",{x:un(1)+8,y:gn(1)+4,fontSize:"10",fill:Fr,children:"Minimum (1; 1)"}),e.jsx("text",{x:6,y:tn-6,fontSize:"9",fill:Gt,children:"x₁ ∈ [−2, 2], x₂ ∈ [−1, 3]; je dunkler, desto größer f"}),e.jsx("text",{x:kn-6,y:14,fontSize:"9",fill:Ti,textAnchor:"end",children:"nächste Reflexion"}),s.move==="Schrumpfen"&&e.jsx("text",{x:kn-6,y:28,fontSize:"9",fill:Bt,textAnchor:"end",children:"Schrumpfschritt"})]})}),e.jsxs("div",{className:"min-w-60 grow space-y-2",children:[e.jsx("p",{className:"text-sm",children:"Die Talsohle ist die Parabel x₂ = x₁². Ausgewertet wird nur f selbst, verglichen werden nur Funktionswerte."}),e.jsx(Gi,{step:l,setStep:a,max:Br,playable:!0,speedMs:450,narration:`Letzter Zug: ${s.move}`}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-slate-500 dark:text-slate-400",children:"Startsimplex:"}),ht.map((j,b)=>e.jsx("button",{type:"button","aria-pressed":b===r,className:L(b===r),onClick:()=>{i(b),a(0)},children:j.name},j.name))]}),e.jsxs("div",{className:"space-y-1 font-mono text-xs",children:[e.jsxs("p",{children:["Reflexionen ",f.Reflexion,", Expansionen ",f.Expansion,", Kontraktionen ",f.Kontraktion,", Schrumpfschritte ",f.Schrumpfen]}),x.map((j,b)=>e.jsxs("p",{children:[b===0?"beste ":b===1?"mittl.":"schl. "," (",_i(j.p[0]),"; ",_i(j.p[1]),") f = ",Zi(j.v)]},b)),e.jsxs("p",{children:["Durchmesser ",_i(M),", Spanne f",e.jsx("sub",{children:"schl."})," − f",e.jsx("sub",{children:"beste"})," ="," ",Zi(G)]})]})]})]}),e.jsx(Ne,{kind:v,titel:z,children:A})]})}const bi=K.blau,Gr=K.gruen,mi=K.orange,qt=K.rot,Wt=K.violett,Je="#64748b",bn=r=>(r-2)**2+1,ji=r=>2*r-4,Qn=2,Kn=430,Wn=260,lr=34,ar=24,dr=8,hr=8,di=-2.5,jr=6.5,cr=0,Bi=22,It=12,xe=r=>lr+(r-di)/(jr-di)*(Kn-lr-hr),oe=r=>Wn-ar-(r-cr)/(Bi-cr)*(Wn-ar-dr),Ue=r=>Math.max(di,Math.min(jr,r)),Jn=r=>Math.max(cr,Math.min(Bi,r)),we=(r,i=4)=>Math.abs(r)>=1e5&&Number.isFinite(r)?r.toExponential(2).replace(".",",").replace("e+"," · 10^").replace("e-"," · 10^−").replace(/^-/,"−"):T(r,i);function Vt(){const[r,i]=B.useState(.6),[t,a]=B.useState(4.5),[h,l]=B.useState(0),s=B.useMemo(()=>{const _=[t];for(let g=0;g<h;g++){const W=_[_.length-1],C=W-r*ji(W);_.push(Number.isFinite(C)?C:C>0?1e308:-1e308)}return _},[t,r,h]),c=s[s.length-1],p=1-r*Qn,x=B.useMemo(()=>{const _=[];for(let g=0;g<=240;g++){const W=di+(jr-di)*g/240,C=bn(W);C<=Bi&&_.push(`${xe(W).toFixed(1)},${oe(C).toFixed(1)}`)}return _.join(" ")},[]),w=[-2,0,2,4,6],y=[5,10,15,20],o=1.1,M=Ue(c-o),G=Ue(c+o),f=_=>bn(c)+ji(c)*(_-c),v=c-r*ji(c),z=Math.abs(c)<1e6&&bn(c)<=Bi,A=s.map((_,g)=>({i:g,v:_,g:ji(_),fv:bn(_),e:_-2})).slice(-7),L=1e-9;let j,b,E;Math.abs(r-1/Qn)<L?(j="ok",b="γ = 1/L trifft in einem Schritt",E=`Der Faktor 1 − γf″ ist genau null, der erste Schritt landet exakt im Minimum x* = 2. Bei einer Parabel ist das kein Zufall, sondern derselbe Schritt, den das Newton-Verfahren aus ${O("algorithmus:newton-verfahren-fuer-die-optimierung")} macht: γ = 1/f″ ist die inverse Krümmung.`):r<1/Qn?(j="neutral",b="γ < 1/L: einseitige Annäherung",E=`Der Faktor 1 − γf″ = ${we(p,2)} ist positiv. Der Fehler behält also sein Vorzeichen und schrumpft in jedem Schritt auf das ${we(p,2)}-fache: Die Iterierten nähern sich von einer Seite, dafür langsam. Das ist der erste Fall von ${O("bemerkung:zu-klein-zu-gross-gerade-richtig")}, und ${O("satz:konvergenzrate-bei-starker-konvexitaet")} deckt genau diesen Bereich ab, denn er verlangt γ ≤ 1/L.`):r<2/Qn-L?(j="neutral",b="1/L < γ < 2/L: Überschießen, aber konvergent",E=`Der Faktor 1 − γf″ = ${we(p,2)} ist negativ, die Iterierten springen also in jedem Schritt über das Minimum hinweg. Weil sein Betrag unter 1 liegt, wird der Sprung trotzdem kleiner. Das ist der dritte Fall von ${O("bemerkung:zu-klein-zu-gross-gerade-richtig")}: Die Garantie von ${O("satz:konvergenzrate-bei-starker-konvexitaet")} gilt hier nicht mehr, gut geht es trotzdem.`):Math.abs(r-2/Qn)<L?(j="warn",b="γ = 2/L ist die Grenze",E="Der Fehler wechselt nur noch das Vorzeichen und behält seinen Betrag. Die Iteration pendelt für immer zwischen zwei Punkten, ohne je näher zu kommen. Beliebig oft in die richtige Richtung zu laufen genügt eben nicht, wenn die Schrittlänge nicht dazu passt."):(j="fail",b="γ > 2/L: Divergenz",E=`Der Betrag des Faktors ist ${we(Math.abs(p),2)} > 1, jeder Schritt vergrößert den Fehler. Die Folge läuft davon, obwohl jeder einzelne Schritt in die richtige Richtung startet und der Funktionswert am Startpunkt kleiner wird.`);const V=h===0?`Ausgangslage: x⁽⁰⁾ = ${we(t,2)}, Fehler ${we(t-2,4)}.`:`Schritt ${h}: x⁽${h}⁾ = ${we(c,4)}, Fehler ${we(c-2,4)} = ${we(p,2)} · (Fehler davor).`;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(De,{children:"Schieben wir γ nach oben, bis der Fehler in der Tabelle das Vorzeichen wechselt, und dann weiter, bis er wächst."}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"inline-block",children:e.jsxs("svg",{viewBox:`0 0 ${Kn} ${Wn}`,width:Kn,height:Wn,role:"img","aria-label":`Der Graph von f(x) = (x − 2)² + 1 mit den ersten ${h} Iterierten des Gradientenabstiegs bei γ = ${we(r,2)}.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:lr,y1:oe(0),x2:Kn-hr,y2:oe(0),stroke:Je,strokeWidth:1}),e.jsx("line",{x1:xe(0),y1:dr,x2:xe(0),y2:Wn-ar,stroke:Je,strokeWidth:1}),w.map(_=>e.jsxs("g",{children:[e.jsx("line",{x1:xe(_),y1:oe(0),x2:xe(_),y2:oe(0)+4,stroke:Je}),e.jsx("text",{x:xe(_),y:oe(0)+15,fontSize:"9",fill:Je,textAnchor:"middle",children:_})]},`x${_}`)),y.map(_=>e.jsxs("g",{children:[e.jsx("line",{x1:xe(0)-4,y1:oe(_),x2:xe(0),y2:oe(_),stroke:Je}),e.jsx("text",{x:xe(0)-6,y:oe(_)+3,fontSize:"9",fill:Je,textAnchor:"end",children:_})]},`y${_}`)),e.jsx("text",{x:Kn-hr,y:oe(0)-6,fontSize:"10",fill:Je,textAnchor:"end",children:"x"}),e.jsx("text",{x:xe(0)+5,y:dr+9,fontSize:"10",fill:Je,children:"f(x)"}),e.jsx("polyline",{points:x,fill:"none",stroke:Wt,strokeWidth:2}),e.jsx("circle",{cx:xe(2),cy:oe(1),r:5,fill:"none",stroke:Gr,strokeWidth:2}),e.jsx("text",{x:xe(2),y:oe(1)+20,fontSize:"9",fill:Gr,textAnchor:"middle",children:"x* = 2"}),e.jsx("polyline",{points:s.filter(_=>Number.isFinite(_)).map(_=>`${xe(Ue(_)).toFixed(1)},${oe(Jn(bn(_))).toFixed(1)}`).join(" "),fill:"none",stroke:bi,strokeWidth:1.2,strokeDasharray:"4 3",opacity:.8}),s.map((_,g)=>Number.isFinite(_)?e.jsx("circle",{cx:xe(Ue(_)),cy:oe(Jn(bn(_))),r:g===s.length-1?5:3,fill:bi,opacity:g===s.length-1?1:.55},g):null),z&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:xe(M),y1:oe(Jn(f(M))),x2:xe(G),y2:oe(Jn(f(G))),stroke:mi,strokeWidth:1.6}),e.jsx("line",{x1:xe(Ue(c)),y1:oe(0),x2:xe(Ue(v)),y2:oe(0),stroke:mi,strokeWidth:3}),e.jsx("line",{x1:xe(Ue(c)),y1:oe(Jn(bn(c))),x2:xe(Ue(c)),y2:oe(0),stroke:bi,strokeWidth:.9,strokeDasharray:"2 3"}),e.jsx("text",{x:xe(Ue((c+v)/2)),y:oe(0)-6,fontSize:"9",fill:mi,textAnchor:"middle",children:"−γ f′(x⁽ᵏ⁾)"})]}),!z&&e.jsx("text",{x:Kn/2,y:Wn/2,fontSize:"11",fill:qt,textAnchor:"middle",children:"x⁽ᵏ⁾ liegt außerhalb des Fensters"})]})}),e.jsxs("div",{className:"min-w-60 grow",children:[e.jsx(se,{label:"Schrittweite γ",value:r,onChange:i,min:.05,max:1.2,step:.05,accent:mi}),e.jsx(se,{label:"Startwert x⁽⁰⁾",value:t,onChange:a,min:.5,max:5,step:.25,accent:bi}),e.jsx(Gi,{step:h,setStep:l,max:It,narration:V}),e.jsxs("div",{className:"mt-2 font-mono text-xs",children:[e.jsx("p",{children:"f(x) = (x − 2)² + 1, f′(x) = 2x − 4, L = f″ = 2"}),e.jsxs("p",{children:["Fehlerfaktor 1 − γf″ = ",we(p,2)]}),e.jsxs("table",{className:"mt-1 w-full text-right",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left",children:"k"}),e.jsx("th",{className:"pr-2",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-2",children:"f′(x⁽ᵏ⁾)"}),e.jsx("th",{className:"pr-2",children:"f(x⁽ᵏ⁾)"}),e.jsx("th",{children:"x⁽ᵏ⁾ − 2"})]})}),e.jsx("tbody",{children:A.map(_=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-left",children:_.i}),e.jsx("td",{className:"pr-2",children:we(_.v)}),e.jsx("td",{className:"pr-2",children:we(_.g)}),e.jsx("td",{className:"pr-2",children:we(_.fv)}),e.jsx("td",{children:we(_.e)})]},_.i))})]})]})]})]}),e.jsx(Ne,{kind:j,titel:b,children:E})]})}const Mn=K.blau,Oi=K.gruen,Ht=K.rot,Pt=K.grau,Ve="#64748b",Ui="#94a3b8",J=(r,i=3)=>Math.abs(r)>=1e5&&Number.isFinite(r)?r.toExponential(2).replace(".",",").replace(/^-/,"−"):T(r,i),Lr=20,Tn=[5,1],En=400,In=220,Vn=6.5,xr=3.3,He=r=>(r+Vn)/(2*Vn)*En,Pe=r=>In-(r+xr)/(2*xr)*In,fi=r=>Math.max(-40,Math.min(40,r)),Yn=360,ei=200,ni=46,Tt=24,Ci=10,Xi=10,Zt=[{name:"κ = 1: rund",kappa:1,anteil:.5},{name:"κ = 10: Zickzack",kappa:10,anteil:.9},{name:"κ = 100: Schlucht",kappa:100,anteil:.9}];function Ot(r,i){let t=[...Tn];const a=.5*(Tn[0]**2+r*Tn[1]**2);for(let h=1;h<=5e3;h++){t=[t[0]*(1-i),t[1]*(1-i*r)];const l=.5*(t[0]**2+r*t[1]**2);if(!Number.isFinite(l))return null;if(l<=1e-6*a)return h}return null}function Ut(){const[r,i]=B.useState(10),[t,a]=B.useState(.9),h=1,l=r,s=t*2/l,c=B.useMemo(()=>([m,k])=>.5*(m*m+r*k*k),[r]),{pts:p,fv:x}=B.useMemo(()=>{const m=[Tn],k=[.5*(Tn[0]**2+r*Tn[1]**2)];for(let q=0;q<Lr;q++){const[ze,ln]=m[m.length-1],On=[ze-s*ze,ln-s*r*ln];m.push(On),k.push(.5*(On[0]**2+r*On[1]**2))}return{pts:m,fv:k}},[r,s]),w=x[0],y=1-h/l,o=1-s*h,M=s<=1/l+1e-12,G=x[3]>0?x[4]/x[3]:NaN,f=1-s,v=1-s*r,z=B.useMemo(()=>Ot(r,s),[r,s]),A=[.06,.22,.5,.9].map(m=>m*w),L=x.map(m=>Math.log10(Math.max(m,1e-16)));let j=Math.ceil(Math.max(...L)),b=Math.floor(Math.min(...L));j-b<4&&(b=j-4),b=Math.max(b,-16);const E=m=>ni+(Yn-ni-Xi)*m/Lr,V=m=>Ci+(ei-Ci-Tt)*(j-Math.max(Math.min(m,j),b))/(j-b),_=Math.max(1,Math.ceil((j-b)/5)),g=[];for(let m=j;m>=b;m-=_)g.push(m);const W=[0,5,10,15,20],C=x.map((m,k)=>Math.log10(Math.max(o**k*w,1e-16)));let H,X,S;Math.abs(v)>1+1e-12?(H="fail",X="γ über der Stabilitätsgrenze",S=`γ = ${J(s,4)} liegt über 2/L = ${J(2/l,4)}: In der steilen Richtung wächst der Fehler je Schritt um den Faktor ${J(Math.abs(v),2)}, die Folge läuft aus dem Bild. ${O("satz:gradientenabstieg-auf-einer-quadrik")} sichert Konvergenz genau für 0 < γ < 2/L, und genau das ist hier verletzt.`):Math.abs(v+1)<1e-12?(H="warn",X="γ = 2/L ist die Grenze",S="In der steilen Richtung pendelt die Iteration zwischen zwei Werten, ohne kleiner zu werden. Die flache Richtung kommt zwar weiter voran, aber die Fehlerkurve läuft in eine waagerechte Gerade."):r===1?Math.abs(v)<1e-12?(H="ok",X="κ = 1: nach einem Schritt fertig",S="Die Höhenlinien sind Kreise, μ und L fallen zusammen, und der negative Gradient zeigt direkt auf das Minimum: Mit γ = 1/L ist das Verfahren nach einem einzigen Schritt am Ziel. Der Zickzack braucht zwei verschiedene Krümmungen; hier gibt es nur eine."):(H="neutral",X="κ = 1: gerade Bahn",S=`Beide Komponenten tragen denselben Faktor ${J(f,3)}, die Iterierten laufen also auf der Geraden durch Startpunkt und Minimum${f<0?" und springen dabei in jedem Schritt über das Minimum hinweg":""}. Ein Zickzack gibt es hier nicht.`):Math.abs(v)<1e-12?(H="ok",X="γ = 1/L trifft die steile Richtung exakt",S=`x₂ ist nach einem Schritt null. Danach fällt f in jedem Schritt auf das ${J(f**2,4)}-fache, also SCHNELLER als die Schranke ρ = 1 − μ/L = ${J(y,4)} aus ${O("satz:konvergenzrate-bei-starker-konvexitaet")}. Genau das führt ${O("beispiel:warum-der-satz-eine-schranke-ist-und")} vor: Der Satz verspricht höchstens ρ pro Schritt, nicht genau ρ.`):Math.abs(f)<1e-12?(H="warn",X="γ = 1/μ trifft die flache Richtung exakt",S=`x₁ ist nach einem Schritt null. In der steilen Richtung springt der Fehler dagegen mit dem Faktor ${J(v,3)} hin und her. ${O("satz:konvergenzrate-bei-starker-konvexitaet")} deckt diese Schrittweite nicht ab, sie liegt über 1/L.`):f<0?(H="neutral",X="beide Richtungen schießen über",S=`γ ist so groß, dass beide Richtungen über das Minimum hinausschießen: die flache mit dem Faktor ${J(f,3)}, die steile mit ${J(v,3)}. Konvergent bleibt es nur, weil beide Beträge unter 1 liegen.`):v<0?(H="neutral",X="Zickzack",S=`In der steilen Richtung wechselt der Fehler mit dem Faktor ${J(v,2)} das Vorzeichen, in der flachen schrumpft er nur mit ${J(f,3)}. Die Schrittweite ist an die steile Richtung gebunden, vorankommen müssen wir in der flachen, daher der Zickzack. Bis f auf ein Millionstel gefallen ist, dauert es ${z===null?"hier länger als 5000":z} Schritte.`):(H="neutral",X="monotone Annäherung",S=`Beide Richtungen schrumpfen monoton (Faktoren ${J(f,3)} und ${J(v,3)}). Die flache Richtung bestimmt das Tempo, und je größer κ, desto näher liegt ihr Faktor an 1. Bis f auf ein Millionstel gefallen ist, dauert es ${z===null?"hier länger als 5000":z} Schritte.`);const[R,U]=B.useState({azimuth:32,elevation:22}),Q=1.6,ie=B.useMemo(()=>({f:(m,k)=>c([m,k]),nx:32,ny:26,color:Pt,opacity:.8,wire:!0}),[c]),he=B.useMemo(()=>{const m=p.filter(([k,q])=>Math.abs(k)<=Vn&&Math.abs(q)<=Q).map(([k,q])=>[k,q,c([k,q])]);return m.length>1?[{pts:m,color:Mn,width:2,onTop:!0}]:[]},[p,c]),u=B.useMemo(()=>[{p:[0,0,0],color:Oi,r:4.5,label:"x*",onTop:!0}],[]),N=m=>m?Ke:$e;return e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(De,{children:"Schieben wir κ von 1 auf 100 und zählen, wie viele Schritte die Fehlerkurve für dieselbe Höhe braucht."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Zt.map(m=>{const k=r===m.kappa&&Math.abs(t-m.anteil)<1e-9;return e.jsx("button",{type:"button","aria-pressed":k,className:N(k),onClick:()=>{i(m.kappa),a(m.anteil)},children:m.name},m.name)})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("svg",{viewBox:`0 0 ${En} ${In}`,width:En,height:In,role:"img","aria-label":`Höhenlinien der Quadrik mit κ = ${J(r,1)} und der Bahn des Gradientenabstiegs über zwanzig Schritte.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:0,y1:Pe(0),x2:En,y2:Pe(0),stroke:Ui}),e.jsx("line",{x1:He(0),y1:0,x2:He(0),y2:In,stroke:Ui}),[-6,-4,-2,2,4,6].map(m=>e.jsx("text",{x:He(m),y:Pe(0)+12,fontSize:"9",fill:Ve,textAnchor:"middle",children:m},`x${m}`)),[-3,-2,-1,1,2,3].map(m=>e.jsx("text",{x:He(0)-5,y:Pe(m)+3,fontSize:"9",fill:Ve,textAnchor:"end",children:m},`y${m}`)),e.jsx("text",{x:En-8,y:Pe(0)-5,fontSize:"10",fill:Ve,textAnchor:"end",children:"x₁"}),e.jsx("text",{x:He(0)+6,y:12,fontSize:"10",fill:Ve,children:"x₂"}),A.map((m,k)=>e.jsx("ellipse",{cx:He(0),cy:Pe(0),rx:Math.sqrt(2*m)/(2*Vn)*En,ry:Math.sqrt(2*m/r)/(2*xr)*In,fill:"none",stroke:Ui,strokeWidth:.9},k)),e.jsx("polyline",{points:p.filter(m=>Number.isFinite(m[0])&&Number.isFinite(m[1])).map(m=>`${He(fi(m[0])).toFixed(1)},${Pe(fi(m[1])).toFixed(1)}`).join(" "),fill:"none",stroke:Mn,strokeWidth:1.5}),p.map((m,k)=>e.jsx("circle",{cx:He(fi(m[0])),cy:Pe(fi(m[1])),r:k===0?4.5:2.4,fill:Mn,opacity:k===0?1:.85},k)),e.jsx("circle",{cx:He(0),cy:Pe(0),r:5,fill:"none",stroke:Oi,strokeWidth:2}),e.jsx("text",{x:He(0)+8,y:Pe(0)-8,fontSize:"9",fill:Oi,children:"x*"})]}),e.jsxs("svg",{viewBox:`0 0 ${Yn} ${ei}`,width:Yn,height:ei,role:"img","aria-label":"Halblogarithmischer Verlauf des Funktionswerts über zwanzig Schritte, mit der Schranke des Satzes als gestrichelter Geraden.",className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[g.map(m=>e.jsxs("g",{children:[e.jsx("line",{x1:ni,y1:V(m),x2:Yn-Xi,y2:V(m),stroke:"#e2e8f0"}),e.jsxs("text",{x:ni-4,y:V(m)+3,fontSize:"9",fill:Ve,textAnchor:"end",children:["10",m<0?"⁻":"",String(Math.abs(m)).split("").map(k=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(k)]).join("")]})]},m)),W.map(m=>e.jsx("text",{x:E(m),y:ei-6,fontSize:"9",fill:Ve,textAnchor:"middle",children:m},m)),M&&e.jsx("polyline",{points:C.map((m,k)=>`${E(k).toFixed(1)},${V(m).toFixed(1)}`).join(" "),fill:"none",stroke:Ve,strokeWidth:1.4,strokeDasharray:"5 4"}),e.jsx("polyline",{points:L.map((m,k)=>`${E(k).toFixed(1)},${V(m).toFixed(1)}`).join(" "),fill:"none",stroke:Mn,strokeWidth:1.6}),L.map((m,k)=>e.jsx("circle",{cx:E(k),cy:V(m),r:2.4,fill:Mn},k)),e.jsx("text",{x:ni+4,y:Ci+9,fontSize:"9",fill:Ve,children:"f(x⁽ᵏ⁾) − f(x*), logarithmisch"}),e.jsx("text",{x:Yn-Xi,y:ei-6,fontSize:"9",fill:Ve,textAnchor:"end",children:"k"})]}),e.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:[e.jsx("span",{style:{color:Mn},children:"●"})," gemessener Verlauf ·"," ",M?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:Ve},children:"– –"})," Schranke (1 − γμ)",e.jsx("sup",{children:"k"})," · f(x⁽⁰⁾)"]}):e.jsx("span",{style:{color:Ht},children:"für γ > 1/L gibt der Satz keine Schranke her"})]})]}),e.jsxs("div",{className:"min-w-60 grow space-y-3",children:[e.jsxs("div",{children:[e.jsx(br,{size:280,xDomain:[-Vn,Vn],yDomain:[-Q,Q],surface:ie,points:u,curves:he,labels:{x:"x₁",y:"x₂",z:"f"},azimuth:R.azimuth,elevation:R.elevation,onViewChange:U,ariaLabel:`Die Quadrik als Fläche über der Ebene; bei κ = ${J(r,1)} ${r>3?"ein enges Tal mit steilen Wänden":"eine runde Schale"}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:R,onChange:U})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche, dieselbe Bahn: Je größer κ, desto enger das Tal und desto steiler die Wände, an denen die Iterierten hin und her prallen."})]}),e.jsx(se,{label:"Kondition κ = L/μ",value:r,onChange:m=>i(Math.round(m)),min:1,max:100,step:1,fmt:m=>J(m,0)}),e.jsx(se,{label:"γ als Anteil von 2/L",value:t,onChange:a,min:.05,max:1.1,step:.05}),e.jsxs("div",{className:"space-y-1 font-mono text-xs",children:[e.jsxs("p",{children:["f(x) = ½(x₁² + ",J(r,0)," x₂²), H = diag(1; ",J(r,0),"), μ = 1, L ="," ",J(r,0)]}),e.jsxs("p",{children:["γ = ",J(s,4)," (1/L = ",J(1/l,4),", 2/L = ",J(2/l,4),")"]}),e.jsxs("p",{children:["Fehlerfaktoren: flach 1 − γμ = ",J(f,3),", steil 1 − γL = ",J(v,3)]}),e.jsxs("p",{children:["ρ = 1 − μ/L = ",J(y,4),"; gemessener Quotient f⁽⁴⁾/f⁽³⁾ = ",J(G,4)]}),e.jsxs("p",{children:["Schritte, bis f auf ein Millionstel gefallen ist:"," ",z===null?"über 5000 (oder nie)":z]})]})]})]}),e.jsx(Ne,{kind:H,titel:X,children:S})]})}const Rr=K.blau,Kr=K.rot,Er=K.orange,Ct=K.violett,Dn="#64748b",ki="#94a3b8",fr=5,Xt=([r,i])=>.5*r*r+.5*fr*i*i,Qt=([r,i])=>[r,fr*i],ue=(r,i=3)=>T(r,i),Jt=[{name:"c = 0,05: Praxis",x1:5,x2:1,c:.05,rho:.5},{name:"c = 0,3: Lehrbuch",x1:5,x2:1,c:.3,rho:.5}],mn=430,jn=250,Nn=46,Qi=26,fn=10,ii=12,Ji=1.2;function Yt(){const[r,i]=B.useState(5),[t,a]=B.useState(1),[h,l]=B.useState(.2),[s,c]=B.useState(.5),p=[r,t],x=Qt(p),w=[-x[0],-x[1]],y=x[0]*w[0]+x[1]*w[1],o=N=>Xt([p[0]+N*w[0],p[1]+N*w[1]]),M=o(0),G=N=>M+h*N*y,f=N=>M+N*y,v=60,z=[];let A=1,L=0;for(;o(A)>G(A)&&L<v;)z.push(A),A*=s,L++;const j=A,b=o(A)<=G(A),E=z.length<=3?[...z,j].map(N=>ue(N,4)).join(" → "):`${ue(z[0],4)} → ${ue(z[1],4)} → … → ${ue(j,4)}`,V=x[0]*x[0]+x[1]*x[1],_=x[0]*x[0]+fr*x[1]*x[1],g=_>0?V/_:NaN,W=160,C=Array.from({length:W+1},(N,m)=>Ji*m/W),H=Math.max(...C.map(o),1e-6)*1.06,X=-.28*H,S=N=>Nn+(mn-Nn-ii)*N/Ji,R=N=>fn+(jn-fn-Qi)*(1-(N-X)/(H-X)),U=N=>N>=X&&N<=H,Q=N=>C.filter(m=>U(N(m))).map(m=>`${S(m).toFixed(1)},${R(N(m)).toFixed(1)}`).join(" ");let ie,he,u;return V<1e-12?(ie="neutral",he="kein Gradient, keine Suchrichtung",u="Der Gradient verschwindet, es gibt keine Suchrichtung. Die Liniensuche hat hier nichts zu tun; die Abbruchkriterien haben längst gegriffen."):b?L===0?(ie="ok",he="der volle Schritt genügt",u=`Der volle Schritt γ = 1 wird sofort angenommen: φ(1) = ${ue(o(1))} liegt bereits unter der Schranke ${ue(G(1))}. Bedingung (${sr("eq:backtracking-liniensuche-nach-armijo")}) aus ${O("algorithmus:backtracking-liniensuche-nach-armijo")} ist also schon beim ersten Versuch erfüllt.`):(ie="ok",he=L===1?"eine Halbierung genügt":`${L} Halbierungen`,u=`${L===1?"Eine Verkleinerung genügt":`${L} Verkleinerungen genügen`}: γ = ${ue(j,4)} drückt den Funktionswert von ${ue(M)} auf ${ue(o(j))}, gefordert war nach (${sr("eq:backtracking-liniensuche-nach-armijo")}) höchstens ${ue(G(j))}. Der exakte Minimierer läge bei γ* = ${ue(g,4)}; ihn zu suchen wäre teurer als der gewonnene Fortschritt wert ist.`):(ie="fail",he="abgebrochen",u=`Auch nach ${v} Verkleinerungen ist die Bedingung nicht erfüllt; hier bricht das Widget ab. Am Verfahren liegt das nicht, denn für hinreichend kleine γ ist die Bedingung stets erfüllbar.`),e.jsxs("div",{className:"my-3 space-y-3 rounded bg-white p-3 dark:bg-slate-800/60",children:[e.jsx(De,{children:"Drehen wir c hoch, bis die graue Gerade so steil steht, dass die erste Halbierung nicht mehr genügt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Jt.map(N=>{const m=r===N.x1&&t===N.x2&&Math.abs(h-N.c)<1e-9&&Math.abs(s-N.rho)<1e-9;return e.jsx("button",{type:"button","aria-pressed":m,className:m?Ke:$e,onClick:()=>{i(N.x1),a(N.x2),l(N.c),c(N.rho)},children:N.name},N.name)})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"inline-block",children:[e.jsxs("svg",{viewBox:`0 0 ${mn} ${jn}`,width:mn,height:jn,role:"img","aria-label":`Der Schnitt φ(γ) = f(x + γd) mit der Armijo-Geraden und den ${z.length} verworfenen Probeschritten.`,className:"max-w-full h-auto overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:Nn,y1:R(0),x2:mn-ii,y2:R(0),stroke:ki}),e.jsx("line",{x1:Nn,y1:fn,x2:Nn,y2:jn-Qi,stroke:ki}),[0,.25,.5,.75,1].map(N=>e.jsxs("g",{children:[e.jsx("line",{x1:S(N),y1:R(0),x2:S(N),y2:R(0)+4,stroke:ki}),e.jsx("text",{x:S(N),y:jn-8,fontSize:"9",fill:Dn,textAnchor:"middle",children:ue(N,2)})]},N)),e.jsx("text",{x:mn-ii,y:jn-8,fontSize:"10",fill:Dn,textAnchor:"end",children:"γ"}),e.jsx("text",{x:Nn+4,y:fn+9,fontSize:"10",fill:Dn,children:"φ(γ) = f(x + γd)"}),e.jsx("polyline",{points:Q(f),fill:"none",stroke:Er,strokeWidth:1.5}),e.jsx("polyline",{points:Q(G),fill:"none",stroke:Dn,strokeWidth:1.5,strokeDasharray:"6 4"}),e.jsx("polyline",{points:Q(o),fill:"none",stroke:Ct,strokeWidth:2}),z.slice(0,24).map((N,m)=>e.jsxs("g",{children:[e.jsx("circle",{cx:S(N),cy:R(Math.min(o(N),H)),r:4,fill:Kr}),e.jsx("line",{x1:S(N),y1:R(Math.min(o(N),H)),x2:S(N),y2:R(Math.max(G(N),X)),stroke:Kr,strokeWidth:1,strokeDasharray:"2 3"})]},m)),b&&V>=1e-12&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:S(j),cy:R(o(j)),r:5,fill:Rr}),e.jsxs("text",{x:S(j),y:R(o(j))-9,fontSize:"10",fill:Rr,textAnchor:"middle",children:["γ = ",ue(j,3)]})]}),Number.isFinite(g)&&g<=Ji&&e.jsx("line",{x1:S(g),y1:fn,x2:S(g),y2:jn-Qi,stroke:ki,strokeDasharray:"3 3"}),e.jsx("text",{x:mn-ii,y:fn+9,fontSize:"9",fill:Er,textAnchor:"end",children:"Tangente"}),e.jsx("text",{x:mn-ii,y:fn+21,fontSize:"9",fill:Dn,textAnchor:"end",children:"Armijo-Schranke"})]}),e.jsx("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:"Die dünne senkrechte Linie steht auf γ*, dem Tiefpunkt des Schnitts. Ihn zu treffen wäre die exakte Liniensuche; die Armijo-Bedingung verlangt weniger, nämlich nur, unter der grauen Geraden zu landen."})]}),e.jsxs("div",{className:"min-w-60 grow",children:[e.jsx(se,{label:"x₁",value:r,onChange:i,min:-6,max:6,step:.25}),e.jsx(se,{label:"x₂",value:t,onChange:a,min:-2,max:2,step:.25}),e.jsx(se,{label:"Abstiegsanteil c",value:h,onChange:l,min:.05,max:.5,step:.05,accent:Dn}),e.jsx(se,{label:"Verkleinerungsfaktor ρ",value:s,onChange:c,min:.1,max:.9,step:.1}),e.jsxs("div",{className:"mt-2 space-y-1 font-mono text-xs",children:[e.jsx("p",{children:"f(x) = ½x₁² + 2,5x₂², ∇f(x) = (x₁; 5x₂), also μ = 1, L = 5, κ_f = 5"}),e.jsxs("p",{children:["x = (",ue(r,2),"; ",ue(t,2),"), ∇f(x) = (",ue(x[0],2),"; ",ue(x[1],2),"), d = −∇f(x)ᵀ"]}),e.jsxs("p",{children:["φ(0) = ",ue(M),", φ′(0) = ∇f(x)d = ",ue(y),V<1e-12?" (null, weil der Gradient verschwindet)":" (negativ, sonst wäre d keine Abstiegsrichtung)"]}),e.jsxs("p",{children:["geprüfte Schrittweiten: ",E,z.length>3?` (${L} Verkleinerungen)`:""]}),e.jsxs("p",{children:["exakter Minimierer γ* = ",ue(g,4)," mit φ(γ*) = ",ue(o(g))]})]})]})]}),e.jsx(Ne,{kind:ie,titel:he,children:u})]})}function qr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Wie viel Ableitung darf es sein?"}),`
`,e.jsxs(i.p,{children:["In einem inneren Minimum verschwindet der Gradient (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`), und
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})," ist ein ",e.jsx(d,{id:"env:nichtlineares-gleichungssystem",children:"nichtlineares Gleichungssystem"}),`,
das wir iterativ lösen. Die Verfahren dafür unterscheiden sich vor allem darin,
wie viel Ableitungsinformation sie benutzen.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.1 (Taxonomie nach Ableitungsordnung)",id:"env-taxonomie-nach-ableitungsordnung",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Ordnung"}),e.jsx(i.th,{children:"benutzt"}),e.jsx(i.th,{children:"Beispiele"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"nullte"}),e.jsxs(i.td,{children:["nur Funktionswerte ",e.jsx(n,{children:"\\cblue{f(\\bx)}"})]}),e.jsx(i.td,{children:"Nelder-Mead, Gittersuche"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"erste"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{f}"})," und ",e.jsx(n,{children:"\\corange{\\nabla f}"})]}),e.jsx(i.td,{children:"Gradientenabstieg, Momentum-Verfahren, SGD"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"zweite"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{f}"}),", ",e.jsx(n,{children:"\\corange{\\nabla f}"})," und ",e.jsx(n,{children:"\\corange{\\bH_f}"})]}),e.jsx(i.td,{children:"Newton-Verfahren"})]})]})]}),e.jsxs(i.p,{children:[`Jede Ableitung, die ein Verfahren verlangt, muss jemand bereitstellen (von
Hand, per automatischem Differenzieren oder durch Differenzenquotienten), und
sie kostet in jedem Schritt Rechenzeit. Verfahren nullter Ordnung sind robust
und laufen auf allem, was sich auswerten lässt; dafür brauchen sie viele
Iterationen. Höhere
Ordnung bringt schnellere Konvergenz, macht aber jeden Schritt teurer, und die
`,e.jsx(d,{id:"env:hesse-matrix",children:"Hesse-Matrix"})," hat ",e.jsx(n,{children:"n^2"}),` Einträge. In der Praxis greifen wir oft zu einem
Kompromiss, den superlinearen Quasi-Newton-Verfahren wie BFGS, die eine
Näherung der inversen Hesse-Matrix aus den bereits berechneten Gradienten
aufbauen (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Nelder-Mead: Optimieren ohne Ableitungen"}),`
`,e.jsxs(i.p,{children:[`Manchmal gibt es keine Ableitung: Die Zielfunktion ist das Ergebnis einer
Simulation oder eines Programms, dessen Innenleben wir nicht kennen, oder sie
hat Knicke. Dann bleibt nur, Funktionswerte zu vergleichen. Das bekannteste
Verfahren dieser Art arbeitet mit einem `,e.jsx(i.em,{children:"Simplex"})," aus ",e.jsx(n,{children:"n+1"})," Punkten im ",e.jsx(n,{children:"\\R^n"}),`,
einem Dreieck in der Ebene, einem Tetraeder im Raum, und ersetzt in jedem
Schritt seine schlechteste Ecke durch eine bessere.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.3.2 (Nelder-Mead-Simplexverfahren)",id:"env-nelder-mead-simplexverfahren",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," und ein Startsimplex aus ",e.jsx(n,{children:"n+1"}),` Punkten.
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
`,e.jsx(i.p,{children:`Solange es bergab geht, bewegt sich der Simplex über Reflexionen und
Expansionen voran und wird dabei lang; umschließt er ein Tal, ziehen ihn
Kontraktionen und Schrumpfschritte zusammen. Die Schrittweite steuert er so
selbst, ohne einen Parameter, und das ist der Hauptvorteil des Verfahrens.`}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.3 (Wann sich Nelder-Mead lohnt)",id:"env-wann-sich-nelder-mead-lohnt",children:[e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Situation"}),e.jsx(i.th,{children:"geeignet?"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Ableitungen nicht verfügbar"}),e.jsx(i.td,{children:"ja, das ist der Hauptgrund"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["niedrige Dimension, ",e.jsx(n,{children:"n \\leq 10"})]}),e.jsx(i.td,{children:"ja"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"nicht glatte Zielfunktion"}),e.jsx(i.td,{children:"ja, es werden nur Werte verglichen"})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["hohe Dimension, ",e.jsx(n,{children:"n > 50"})]}),e.jsx(i.td,{children:"nein, zu langsam"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"präzise Konvergenz nötig"}),e.jsx(i.td,{children:"nein, im Allgemeinen ohne Garantie"})]})]})]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kosten."}),` Ein gewöhnlicher Schritt kostet ein bis zwei neue
Funktionsauswertungen, ein Schrumpfschritt `,e.jsx(n,{children:"n"}),` neue Ecken; pro Iteration fallen
also `,e.jsx(n,{children:"O(n)"})," Auswertungen an (",e.jsx(d,{id:"big-o-notation",children:"Landau-Notation"}),`), und meist
sind sehr viele Iterationen nötig. In hoher Dimension wird beides zum Problem.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Garantien."}),` Einen allgemeinen Konvergenzsatz gibt es nicht; auf manchen
strikt konvexen Funktionen läuft das Verfahren sogar gegen einen Punkt, der kein
`,e.jsx(d,{id:"env:stationaerer-punkt",children:"stationärer Punkt"}),` ist (McKinnon 1998). In der Praxis dient Nelder-Mead deshalb
oft als robuste Startpunktsuche vor einem gradientenbasierten Verfahren.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"In R."})," Nelder-Mead ist die Voreinstellung von ",e.jsx(i.code,{children:"optim()"})," (",e.jsx(i.a,{href:"#sec-12.6",children:"Abschnitt 12.6"}),")."]})]}),`
`,e.jsx(i.p,{children:`Wie oft welcher der vier Züge fällt, entscheidet über die Kosten, denn die
Züge sind verschieden teuer.`}),`
`,e.jsxs(Me,{title:"Der Simplex bei der Arbeit",children:[e.jsxs(i.p,{children:[`Das Verfahren läuft Schritt für Schritt auf der Testfunktion
`,e.jsx(n,{children:"f(\\bx) = (1-x_1)^2 + 5(x_2 - x_1^2)^2"})," mit Minimum in ",e.jsx(n,{children:"\\cgreen{(1; 1)}"}),`. Der orange Strahl markiert jeweils den nächsten
Versuchspunkt; der Schrittregler lässt sich vorwärts und rückwärts schieben, der
Abspielknopf lässt den ganzen Lauf durchlaufen.`]}),e.jsx(Re,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Welcher der vier Züge fällt auf dieser Testfunktion am häufigsten?"}),optionen:[{id:"reflexion",text:"Reflexion"},{id:"expansion",text:"Expansion"},{id:"kontraktion",text:"Kontraktion"},{id:"schrumpfen",text:"Schrumpfen"}],loesung:"kontraktion",verdeckt:e.jsxs(e.Fragment,{children:["Der Zugzähler im Widget führt mit: Aus dem voreingestellten Simplex braucht das Verfahren vierzig Schritte, bis der beste Eckpunkt unter ",e.jsx(n,{children:"10^{-6}"})," liegt, und der Zähler steht dann auf ",e.jsx(n,{children:"23"})," Kontraktionen, ",e.jsx(n,{children:"13"})," Reflexionen und ",e.jsx(n,{children:"4"})," Expansionen."]}),children:e.jsx(Et,{})}),e.jsxs(i.p,{children:[`Die Züge verteilen sich sehr ungleich. Der Schrumpfschritt, der teuerste Zug,
kommt auf dem voreingestellten Weg gar nicht vor; erst der zweite Startsimplex
erzwingt ihn im vierten Schritt. Auf den geraden Stücken des Tals wird der
Simplex lang und dünn und legt sich in Laufrichtung, in der Biegung um
`,e.jsx(n,{children:"x_1 \\approx 0"}),` schrumpft er und dreht sich in die neue Richtung: Die Anpassung
an die lokale Geometrie ersetzt die fehlende Ableitung.`]}),e.jsxs(i.p,{children:[`Eine Animation derselben Züge, mit einstellbaren Parametern und
mehreren Testfunktionen, liegt unter
`,e.jsx(i.a,{href:"https://alexdowad.github.io/visualizing-nelder-mead/",children:"alexdowad.github.io/visualizing-nelder-mead"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Der Gradientenabstieg"}),`
`,e.jsxs(i.p,{children:["Der Gradient zeigt bergauf (",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`). Zum
Minimieren laufen wir also in die Gegenrichtung.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.3.4 (Gradientenabstieg)",id:"env-nelder-mead-gradient-gradientenabstieg",children:[e.jsxs(i.p,{children:["Gegeben seien eine differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`, ein
Startpunkt `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"})," und eine Schrittweite ",e.jsx(n,{children:"\\gamma > 0"}),`. Für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ne,{tag:"12.3.1",id:"eq-nelder-mead-gradient-gradientenabstieg",children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\gamma\\,\\corange{\\nabla f\\bigl(\\cblue{\\bx^{(k)}}\\bigr)^\\top}"}),e.jsxs(i.p,{children:["und brich ab, sobald eines der Kriterien aus ",e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"})," greift."]})]}),`
`,e.jsxs(i.p,{children:["Das Transponierte steht da, weil der ",e.jsx(d,{id:"gradient",children:"Gradient"}),` in diesem Skript
ein Zeilenvektor ist, eine Richtung im `,e.jsx(n,{children:"\\R^n"}),` dagegen eine Spalte. Im
maschinellen Lernen heißt `,e.jsx(n,{children:"\\gamma"})," ",e.jsx(i.em,{children:"Lernrate"}),` (learning rate) und der
`,e.jsx(d,{id:"gradient-descent",children:"Gradientenabstieg"})," ",e.jsx(i.em,{children:"gradient descent"}),"."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.5 (Drei Lesarten desselben Schritts)",id:"env-drei-lesarten-desselben-schritts",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Steilster Abstieg."})," Für ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"}),` macht unter
allen Richtungen `,e.jsx(n,{children:"\\bd"})," mit ",e.jsx(n,{children:"\\left\\|\\bd\\right\\| = 1"}),` die Richtung
`,e.jsx(n,{children:"\\bd = -\\corange{\\nabla f(\\bx)^\\top}/\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|"}),`
die `,e.jsx(d,{id:"env:richtungsableitung",children:"Richtungsableitung"})," ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd"}),` am kleinsten
(`,e.jsx(d,{id:"env:richtung-des-staerksten-anstiegs",href:"?k=10-differentialrechnung#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`, Gleichheitsfall der
`,e.jsx(d,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"}),`). Lokal gibt es also
keine bessere Richtung als die des negativen Gradienten.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Abstiegsrichtung."})," Für ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"}),` ist
`,e.jsx(n,{children:`\\corange{\\nabla f(\\bx)}\\bigl(-\\corange{\\nabla f(\\bx)^\\top}\\bigr)
= -\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|^2 < 0`}),`, und
nach der Taylorentwicklung erster Ordnung
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),") sinkt ",e.jsx(n,{children:"f"}),` deshalb für alle
hinreichend kleinen `,e.jsx(n,{children:"\\gamma"}),` tatsächlich. Zwei Missverständnisse sind dabei zu
vermeiden. Abstiegsrichtung ist `,e.jsx(n,{children:"-\\corange{\\nabla f(\\bx)^\\top}"}),` auch ohne
Konvexität, solange der Gradient nicht verschwindet. Und `,e.jsx(i.em,{children:"hin zum"}),` Minimum zeigt
sie im Allgemeinen nicht, wie das Zickzack weiter unten zeigt. Die
`,e.jsx(d,{id:"convexity",children:"Konvexität"}),` sorgt für etwas anderes: Jeder stationäre Punkt ist
dann schon ein `,e.jsx(d,{id:"env:lokales-und-globales-minimum",children:"globales Minimum"})," (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`), das Verfahren kann also
nirgends sonst hängen bleiben.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fixpunktiteration."})," ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` ist die
`,e.jsx(d,{id:"fixed-point-iteration",children:"Fixpunktiteration"}),` zu
`,e.jsx(i.a,{href:"#eq-optimieren-heisst-gleichungen-loesen",children:"(12.2.3)"}),`, deren Fixpunkte die stationären Punkte
von `,e.jsx(n,{children:"f"}),` sind. Wie bei jeder Fixpunktiteration entscheidet die Schrittweite über
die Konvergenz (`,e.jsx(d,{id:"env:konvergenzrate-der-fixpunktiteration",href:"#env-konvergenzrate-der-fixpunktiteration",children:"Satz 12.1.16"}),")."]})]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.3.6 (Gradientenabstieg von Hand)",id:"env-gradientenabstieg-von-hand",children:[e.jsxs(i.p,{children:["Minimieren wir ",e.jsx(n,{children:"\\cblue{f(x)} = (x-2)^2 + 1"})," mit Startwert ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4{,}5"}),`
und Schrittweite `,e.jsx(n,{children:"\\gamma = 0{,}6"}),`. Die Ableitung ist
`,e.jsx(n,{children:"\\corange{f'(x)} = 2x - 4"}),", das Minimum liegt bei ",e.jsx(n,{children:"\\cgreen{x^\\star} = 2"}),`, denn
dort und nur dort verschwindet sie.`]}),e.jsx(F,{children:`\\begin{aligned}
\\cblue{x^{(0)}} &= 4{,}5 , \\\\
\\cblue{x^{(1)}} &= \\cblue{x^{(0)}} - 0{,}6\\,\\corange{f'(x^{(0)})}
 = 4{,}5 - 0{,}6\\cdot(2\\cdot 4{,}5 - 4) = 4{,}5 - 3 = \\cblue{1{,}5} , \\\\
\\cblue{x^{(2)}} &= \\cblue{x^{(1)}} - 0{,}6\\,\\corange{f'(x^{(1)})}
 = 1{,}5 - 0{,}6\\cdot(2\\cdot 1{,}5 - 4) = 1{,}5 + 0{,}6 = \\cblue{2{,}1} , \\\\
\\cblue{x^{(3)}} &= \\cblue{x^{(2)}} - 0{,}6\\,\\corange{f'(x^{(2)})}
 = 2{,}1 - 0{,}6\\cdot(2\\cdot 2{,}1 - 4) = 2{,}1 - 0{,}12 = \\cblue{1{,}98} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Der erste Schritt schießt von ",e.jsx(n,{children:"4{,}5"})," auf ",e.jsx(n,{children:"1{,}5"}),` weit über das Ziel hinaus,
danach konvergiert die Iteration schnell. Die Fehler
`,e.jsx(n,{children:"\\cblue{x^{(k)}} - \\cgreen{x^\\star}"})," sind ",e.jsx(n,{children:"2{,}5"}),", ",e.jsx(n,{children:"-0{,}5"}),", ",e.jsx(n,{children:"0{,}1"}),` und
`,e.jsx(n,{children:"-0{,}02"}),`; sie wechseln in jedem Schritt das Vorzeichen und schrumpfen exakt auf
ein Fünftel, der Faktor ist also `,e.jsx(n,{children:"-0{,}2"}),"."]})]}),`
`,e.jsx(i.p,{children:"Welche Schrittweiten führen ans Ziel, welche nicht?"}),`
`,e.jsxs(Me,{title:"Die Schrittweite am eindimensionalen Beispiel",children:[e.jsxs(i.p,{children:["Die Tafel zeigt ",e.jsx(i.a,{href:"#env-gradientenabstieg-von-hand",children:"Beispiel 12.3.6"}),` mit frei einstellbarem
`,e.jsx(n,{children:"\\gamma"}),". Weil ",e.jsx(n,{children:"f'' \\equiv 2"}),` ist, liegen die beiden Schwellen direkt auf dem
Reglerraster und lassen sich einzeln ansteuern; der Schrittregler läuft vorwärts
wie rückwärts.`]}),e.jsx(Re,{frage:e.jsxs(e.Fragment,{children:["Ab welchem ",e.jsx(n,{children:"\\gamma"})," läuft die Iteration davon, statt sich dem Minimum zu nähern?"]}),loesung:1,toleranz:.1,einheit:"γ",verdeckt:e.jsxs(e.Fragment,{children:["Die Grenze ist ",e.jsx(n,{children:"2/L"}),", hier also ",e.jsx(n,{children:"\\gamma = 1"}),". Dort pendelt die Folge; darüber wächst der Fehler."]}),children:e.jsx(Vt,{})}),e.jsxs(i.p,{children:["Alles hängt am Fehlerfaktor ",e.jsx(n,{children:"1 - \\gamma L"})," mit der Krümmung ",e.jsx(n,{children:"L = f'' = 2"}),`, den
die Ablesetafel mitführt. Solange sein Betrag unter `,e.jsx(n,{children:"1"}),` bleibt, schrumpft der
Fehler, bei negativem Faktor mit Sprüngen über das Minimum hinweg; bei Betrag
`,e.jsx(n,{children:"1"})," pendelt die Folge, darüber wächst der Fehler."]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.7 (Zu klein, zu groß, gerade richtig)",id:"env-zu-klein-zu-gross-gerade-richtig",children:[e.jsxs(i.p,{children:["Für eine Parabel ",e.jsx(n,{children:"f(x) = \\tfrac{L}{2}(x - \\cgreen{x^\\star})^2"}),` mit Krümmung
`,e.jsx(n,{children:"L > 0"})," ist ",e.jsx(n,{children:"\\corange{f'(x)} = L(x - \\cgreen{x^\\star})"}),", und ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` wird zu
einer Rekursion für den Fehler
`,e.jsx(n,{children:"e^{(k)} := \\cblue{x^{(k)}} - \\cgreen{x^\\star}"}),":"]}),e.jsx(ne,{tag:"12.3.2",id:"eq-zu-klein-zu-gross-gerade-richtig",children:`e^{(k+1)} = e^{(k)} - \\gamma L\\, e^{(k)} = (1 - \\gamma L)\\, e^{(k)} ,
\\qquad\\text{also}\\qquad
e^{(k)} = (1 - \\gamma L)^k\\, e^{(0)} .`}),e.jsxs(i.p,{children:["Den Buchstaben ",e.jsx(n,{children:"L"}),` für die Krümmung wählen wir, weil dieselbe Größe im allgemeinen
Fall als Lipschitz-Konstante (`,e.jsx(d,{id:"env:lipschitz-stetigkeit",href:"#env-lipschitz-stetigkeit",children:"Definition 12.3.8"}),`) die Schrittweite
begrenzt. Das Verhalten hängt allein vom Betrag von
`,e.jsx(n,{children:"1 - \\gamma L"})," ab:"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"0 < \\gamma < 1/L"}),": Der Faktor liegt in ",e.jsx(n,{children:"(0, 1)"}),`, der Fehler behält sein
Vorzeichen und schrumpft. Für sehr kleines `,e.jsx(n,{children:"\\gamma"})," liegt er dicht an ",e.jsx(n,{children:"1"}),`, und
das Verfahren kommt kaum voran.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\gamma = 1/L"}),`: Der Faktor ist null, ein einziger Schritt trifft
`,e.jsx(n,{children:"\\cgreen{x^\\star}"}),` exakt; das ist der Newton-Schritt aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.8",children:"Abschnitt 10.8"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"1/L < \\gamma < 2/L"}),": Der Faktor ist negativ mit Betrag unter ",e.jsx(n,{children:"1"}),`; die
Iterierten springen über das Minimum hinweg und nähern sich trotzdem.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\gamma = 2/L"}),": Der Betrag ist genau ",e.jsx(n,{children:"1"}),`. Die Folge pendelt für immer zwischen
zwei Punkten.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cred{\\gamma > 2/L}"}),": Der Betrag übersteigt ",e.jsx(n,{children:"1"}),`, jeder Schritt vergrößert den
Fehler, das Verfahren divergiert. Und das, obwohl jeder einzelne Schritt in die
richtige Richtung startet.`]}),`
`]}),e.jsxs(i.p,{children:["Im ",e.jsx(i.a,{href:"#env-gradientenabstieg-von-hand",children:"Beispiel 12.3.6"})," ist ",e.jsx(n,{children:"L = 2"}),", also ",e.jsx(n,{children:"1/L = 0{,}5"})," und ",e.jsx(n,{children:"2/L = 1"}),`; mit
`,e.jsx(n,{children:"\\gamma = 0{,}6"})," landen wir im dritten Fall und lesen ",e.jsx(n,{children:`1 - 0{,}6\\cdot 2 =
-0{,}2`}),` ab. Das ist das Dilemma der Schrittweite: klein genug für Konvergenz,
groß genug für Tempo. Im `,e.jsx(n,{children:"\\R^n"}),` wird es schwieriger, denn dort gibt es einen
solchen Faktor je Krümmungsrichtung, und ein einziges `,e.jsx(n,{children:"\\gamma"}),` muss sie alle
zugleich bedienen.`]})]}),`
`,e.jsxs(i.h3,{children:["Zwischenfrage: ein Schritt im ",e.jsx(n,{children:"\\R^2"})]}),`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f(\\bx) = x_1^2 + x_2^2"})," und ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}} = (4, 3)^\\top"}),` mit
Schrittweite `,e.jsx(n,{children:"\\gamma = 0{,}25"}),". Wo liegt ",e.jsx(n,{children:"\\cblue{\\bx^{(1)}}"}),` nach einem Schritt
des Gradientenabstiegs?`]}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (2;\\ 1{,}5)^\\top"}),"."]}),e.jsxs(i.p,{children:["Der Gradient ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (2x_1,\\ 2x_2)"}),`, an der Stelle
`,e.jsx(n,{children:"(4, 3)^\\top"})," also ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(0)})} = (8,\\ 6)"}),`. Eingesetzt in
`,e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),`:
`,e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (4, 3)^\\top - 0{,}25\\cdot(8, 6)^\\top = (4, 3)^\\top - (2;\\ 1{,}5)^\\top = (2;\\ 1{,}5)^\\top"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (0, 0)^\\top"}),", das Verfahren ist sofort fertig."]}),e.jsxs(i.p,{children:[`Das wäre der Treffer in einem Schritt, und den gibt es hier bei
`,e.jsx(n,{children:"\\gamma = 1/L = 0{,}5"}),", nicht bei ",e.jsx(n,{children:"0{,}25"}),`. Die Hesse-Matrix ist
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(2, 2)"}),", also ",e.jsx(n,{children:"L = 2"}),"; mit ",e.jsx(n,{children:"\\gamma = 0{,}25"}),` ist der
Fehlerfaktor `,e.jsx(n,{children:"1 - \\gamma L = 0{,}5"}),`, und die Iterierten halbieren nur ihren
Abstand zum Ursprung: `,e.jsx(n,{children:"(2;\\ 1{,}5)"}),", ",e.jsx(n,{children:"(1;\\ 0{,}75)"}),", ",e.jsx(n,{children:"(0{,}5;\\ 0{,}375)"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (3, 2)^\\top"}),"."]}),e.jsxs(i.p,{children:["Hier ist von jeder Komponente ",e.jsx(n,{children:"1"}),` abgezogen worden, der Schritt hätte also in
beiden Richtungen dieselbe Länge. Der Gradientenabstieg skaliert die Richtung
aber nicht auf Einheitslänge; er nimmt den Gradienten so, wie er ist, und die
Komponente mit dem größeren Betrag bekommt den längeren Schritt.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (8, 6)^\\top"}),"."]}),e.jsxs(i.p,{children:[`Das ist der Gradient selbst. Er ist ein Bestandteil des Schritts, nicht das
Ergebnis; abgesehen davon zeigt `,e.jsx(n,{children:"+\\corange{\\nabla f}"})," bergauf, und ",e.jsx(n,{children:"(8, 6)^\\top"}),`
liegt weiter vom Minimum entfernt als der Startpunkt.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie schnell ist der Gradientenabstieg?"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-zu-klein-zu-gross-gerade-richtig",children:"Bemerkung 12.3.7"}),` hat die Schrittweite an die Krümmung gekoppelt. Für eine
allgemeine Funktion brauchen wir dafür einen Begriff, der die Krümmung nach oben
begrenzt, ohne zweite Ableitungen zu verlangen.`]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.3.8 (Lipschitz-Stetigkeit)",id:"env-lipschitz-stetigkeit",children:[e.jsxs(i.p,{children:["Eine Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," heißt ",e.jsx(i.em,{children:"Lipschitz-stetig"}),`
(Lipschitz continuous) mit `,e.jsx(i.em,{children:"Lipschitz-Konstante"})," ",e.jsx(n,{children:"L > 0"}),", falls"]}),e.jsx(F,{children:`\\left\\|f(\\bx) - f(\\by)\\right\\| \\le L \\left\\|\\bx - \\by\\right\\|
\\qquad \\text{für alle } \\bx, \\by \\in \\R^n .`})]}),`
`,e.jsxs(i.p,{children:["Anschaulich: Die Funktionswerte ändern sich höchstens ",e.jsx(n,{children:"L"}),`-mal so schnell wie die
Argumente. Je größer `,e.jsx(n,{children:"L"}),", desto stärker darf ",e.jsx(n,{children:"f"})," schwanken."]}),`
`,e.jsxs(i.p,{children:["Für den Gradientenabstieg brauchen wir die Bedingung nicht für ",e.jsx(n,{children:"f"}),`, sondern für
den Gradienten.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.9 (Lipschitz-stetiger Gradient und die Spektralnorm)",id:"env-lipschitz-stetiger-gradient-und-die",children:[e.jsxs(i.p,{children:["Wir nennen ",e.jsx(n,{children:"\\corange{\\nabla f}"})," ",e.jsxs(i.em,{children:["Lipschitz-stetig mit Konstante ",e.jsx(n,{children:"L"})]}),`, wenn
`,e.jsx(d,{id:"env:lipschitz-stetigkeit",href:"#env-lipschitz-stetigkeit",children:"Definition 12.3.8"}),` auf die Abbildung
`,e.jsx(n,{children:"\\bx \\mapsto \\corange{\\nabla f(\\bx)^\\top} \\in \\R^n"})," zutrifft:"]}),e.jsx(F,{children:`\\left\\|\\corange{\\nabla f(\\bx)} - \\corange{\\nabla f(\\by)}\\right\\|
\\le L \\left\\|\\bx - \\by\\right\\| .`}),e.jsxs(i.p,{children:["Die Steigung von ",e.jsx(n,{children:"f"}),` ändert sich also nicht zu abrupt, die Krümmung ist
beschränkt. Ist `,e.jsx(n,{children:"f"}),` auf einer konvexen offenen Menge zweimal stetig
differenzierbar, so ist das gleichwertig zu`]}),e.jsx(ne,{tag:"12.3.3",id:"eq-lipschitz-stetiger-gradient-und-die",children:`\\left\\|\\corange{\\bH_f(\\bx)}\\right\\|_2 \\le L \\quad \\text{für alle } \\bx ,
\\qquad\\text{also}\\qquad
L_{\\min} = \\sup_{\\bx} \\left\\|\\corange{\\bH_f(\\bx)}\\right\\|_2
 = \\sup_{\\bx} \\max_{i} \\left|\\lambda_i\\bigl(\\corange{\\bH_f(\\bx)}\\bigr)\\right| ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"L_{\\min}"}),` die kleinste mögliche Lipschitz-Konstante bezeichnet; jede
größere Zahl ist ebenfalls eine gültige Konstante.`]}),e.jsxs(i.p,{children:[`Der Betrag ist wesentlich. Die kürzere Schreibweise
`,e.jsx(n,{children:"L = \\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})"})," geht nur gut, solange ",e.jsx(n,{children:"f"}),`
konvex ist, denn dann ist `,e.jsx(n,{children:"\\corange{\\bH_f}"}),` positiv semidefinit und der größte
Eigenwert zugleich der betragsgrößte. Für nicht konvexes `,e.jsx(n,{children:"f"}),` ist sie falsch:
Für `,e.jsx(n,{children:"f(x) = -x^2"})," ist ",e.jsx(n,{children:"\\corange{f'(x)} = -2x"})," mit der exakten Lipschitz-Konstanten ",e.jsx(n,{children:"2"}),`, während
`,e.jsx(n,{children:"\\lambda_{\\max}(\\corange{\\bH_f}) = -2"})," nicht einmal positiv ist."]})]}),`
`,e.jsxs(pe,{title:"Lipschitz-Stetigkeit, Differenzierbarkeit und die Spektralnorm",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lipschitz-stetig und differenzierbar."}),` Lipschitz-Stetigkeit ist deutlich
stärker als `,e.jsx(d,{id:"continuity",children:"Stetigkeit"}),", mit ",e.jsx(d,{id:"env:differenzierbarkeit",children:"Differenzierbarkeit"}),` aber ohne
Zusatzannahmen nicht vergleichbar: `,e.jsx(n,{children:"f(x)=\\left|x\\right|"})," ist mit ",e.jsx(n,{children:"L=1"}),`
Lipschitz-stetig und im Nullpunkt trotzdem nicht differenzierbar; `,e.jsx(n,{children:"f(x)=x^2"}),` ist
auf `,e.jsx(n,{children:"\\R"}),` differenzierbar, aber nicht global Lipschitz-stetig. Auf einem
kompakten Intervall ist eine stetig differenzierbare Funktion wegen ihrer dort
beschränkten Ableitung Lipschitz-stetig.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Spektralnorm und Eigenwerte."})," Für ",e.jsx(d,{id:"symmetric-matrix",children:"symmetrische"}),` Matrizen
ist die `,e.jsx(d,{id:"matrix-norm",children:"Spektralnorm"}),` der betragsgrößte
`,e.jsx(d,{id:"eigenvalue-eigenvector",children:"Eigenwert"}),". ",e.jsx(d,{id:"env:spektralnorm-und-spektralzerlegung",href:"?k=03-matrix-spur-norm#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),`
berechnet `,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),`; für
symmetrisches `,e.jsx(n,{children:"\\bA"})," ist ",e.jsx(n,{children:"\\bA^\\top\\bA = \\bA^2"}),`, und der
`,e.jsx(d,{id:"spectral-theorem",children:"Spektralsatz"}),` gibt dieser Matrix die Eigenwerte
`,e.jsx(n,{children:"\\lambda_i^2"}),", also ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\max_i \\left|\\lambda_i(\\bA)\\right|"}),`.
Dieselbe Umrechnung steckt hinter der Formel für `,e.jsx(n,{children:"\\kappa_2"}),` symmetrischer
Matrizen in `,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Eine Sattelrichtung genügt."})," Bei ",e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(0{,}5;\\ -8)"}),` ist
`,e.jsx(n,{children:"L = 8"}),", das Supremum der größten Eigenwerte aber ",e.jsx(n,{children:"0{,}5"}),`. In der nicht konvexen
Optimierung, wo die Schrittweite an `,e.jsx(n,{children:"L"})," hängt, wäre ",e.jsx(n,{children:"L"}),` mit der kürzeren
Schreibweise um den Faktor `,e.jsx(n,{children:"16"})," zu klein."]})]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.3.10 (Konvergenzrate bei konvexem f)",id:"env-konvergenzrate-bei-konvexem-f",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` konvex und differenzierbar mit Lipschitz-stetigem
Gradienten und Lipschitz-Konstante `,e.jsx(n,{children:"L"}),", und ",e.jsx(n,{children:"f"}),` nehme sein Minimum in
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," an. Dann gilt für den Gradientenabstieg ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` mit
fester Schrittweite `,e.jsx(n,{children:"\\gamma \\le 1/L"})]}),e.jsx(ne,{tag:"12.3.4",id:"eq-konvergenzrate-bei-konvexem-f",children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le \\frac{\\left\\|\\cblue{\\bx^{(0)}} - \\cgreen{\\bx^\\star}\\right\\|^2}{2\\gamma k} .`})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.11 (Was eine Rate der Ordnung 1/k praktisch heißt)",id:"env-was-eine-rate-der-ordnung-1-k-praktisch",children:[e.jsxs(i.p,{children:["Die Schranke fällt wie ",e.jsx(n,{children:"1/k"}),". Um den Fehler unter ",e.jsx(n,{children:"\\varepsilon"}),` zu drücken,
brauchen wir also `,e.jsx(n,{children:"k \\sim 1/\\varepsilon"}),` Schritte, und das ist langsam: Eine
Dezimalstelle mehr Genauigkeit kostet die zehnfache Iterationszahl. Newton-Raphson
verdoppelt dagegen in seinem Einzugsbereich die Zahl der korrekten Stellen in
jedem Schritt (`,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-konvergenzrate-bei-konvexem-f",children:"(12.3.4)"})," misst den Fehler im ",e.jsx(i.em,{children:"Funktionswert"}),`; über den
Abstand zu `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),` sagt die Schranke nichts, und die beiden können
weit auseinanderliegen (`,e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"}),`).
Außerdem setzt der Satz voraus, dass ein Minimierer existiert.`]})]}),`
`,e.jsx(i.p,{children:`Schneller wird es, wenn die Krümmung nicht nur nach oben, sondern auch nach
unten beschränkt ist. Die Funktion darf dann nirgends flach werden.`}),`
`,e.jsxs(D,{kind:"Definition",label:"12.3.12 (Starke Konvexität)",id:"env-starke-konvexitaet",children:[e.jsxs(i.p,{children:["Eine zweimal stetig differenzierbare Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` heißt
`,e.jsx(i.em,{children:"stark konvex"})," (",e.jsx(n,{children:"\\mu"}),"-strongly convex) mit Parameter ",e.jsx(n,{children:"\\mu > 0"}),", falls"]}),e.jsx(F,{children:`\\corange{\\bH_f(\\bx)} - \\mu \\bI \\succeq 0
\\qquad \\text{für alle } \\bx ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\lambda_{\\min}(\\corange{\\bH_f(\\bx)}) \\ge \\mu"})," für alle ",e.jsx(n,{children:"\\bx"}),`. Der größte
solche Wert ist `,e.jsx(n,{children:"\\mu = \\inf_{\\bx} \\lambda_{\\min}(\\corange{\\bH_f(\\bx)})"}),`, die
kleinste vorkommende Krümmung.`]})]}),`
`,e.jsxs(i.p,{children:["Ohne Ableitungen formuliert heißt dasselbe: ",e.jsx(n,{children:`\\bx \\mapsto f(\\bx) -
\\tfrac{\\mu}{2}\\left\\|\\bx\\right\\|^2`})," ist konvex. Anschaulich steckt unter ",e.jsx(n,{children:"f"}),` an
jeder Stelle eine Parabel mit Krümmung mindestens `,e.jsx(n,{children:"\\mu"}),"."]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.3.13 (Konvergenzrate bei starker Konvexität)",id:"env-konvergenzrate-bei-starker-konvexitaet",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f"})," stark konvex mit Parameter ",e.jsx(n,{children:"\\mu > 0"}),` und habe einen Lipschitz-stetigen
Gradienten mit Konstante `,e.jsx(n,{children:"L"}),". Dann gilt für den Gradientenabstieg ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` mit
Schrittweite `,e.jsx(n,{children:"\\gamma \\le 1/L"})]}),e.jsx(ne,{tag:"12.3.5",id:"eq-konvergenzrate-bei-starker-konvexitaet",children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le \\rho^k \\cdot \\Bigl(\\cblue{f\\bigl(\\bx^{(0)}\\bigr)} - \\cgreen{f(\\bx^\\star)}\\Bigr) ,
\\qquad \\rho = 1 - \\gamma\\mu < 1 ,`}),e.jsxs(i.p,{children:["insbesondere ",e.jsx(n,{children:"\\rho = 1 - \\mu/L"})," für ",e.jsx(n,{children:"\\gamma = 1/L"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Der Gewinn gegenüber ",e.jsx(d,{id:"env:konvergenzrate-bei-konvexem-f",href:"#env-konvergenzrate-bei-konvexem-f",children:"Satz 12.3.10"}),` ist groß. Dort brauchten wir
`,e.jsx(n,{children:"k \\sim 1/\\varepsilon"})," Schritte, hier genügen wegen ",e.jsx(n,{children:"\\rho^k < \\varepsilon"}),` schon
`,e.jsx(n,{children:"k \\sim \\log(1/\\varepsilon)"}),`: Jede weitere Dezimalstelle kostet nicht mehr das
Zehnfache, sondern denselben festen Zuschlag. Diese Konvergenz heißt `,e.jsx(i.em,{children:"linear"}),`,
weil der Fehler je Schritt um einen festen Faktor schrumpft. Die beste Rate, die
der Satz hergibt, ist `,e.jsx(n,{children:"\\rho = 1 - \\mu/L"})," bei ",e.jsx(n,{children:"\\gamma = 1/L"}),`; ein kleineres
`,e.jsx(n,{children:"\\gamma"})," konvergiert nur mit ",e.jsx(n,{children:"1 - \\gamma\\mu"}),"."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.14 (Die Konditionszahl einer Funktion)",id:"env-die-konditionszahl-einer-funktion",children:[e.jsx(i.p,{children:"Die beiden Konstanten spannen die Krümmung von beiden Seiten ein,"}),e.jsx(F,{children:`\\mu \\bI \\preceq \\corange{\\bH_f(\\bx)} \\preceq L \\bI
\\qquad \\text{für alle } \\bx ,`}),e.jsxs(i.p,{children:["wobei die obere Hälfte für konvexes ",e.jsx(n,{children:"f"})," gerade ",e.jsx(i.a,{href:"#eq-lipschitz-stetiger-gradient-und-die",children:"(12.3.3)"}),` ist. Das Verhältnis der
beiden Konstanten heißt `,e.jsx(i.em,{children:"Konditionszahl"})," der Funktion,"]}),e.jsx(F,{children:`\\kappa_f = \\frac{L}{\\mu}
= \\frac{\\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})}{\\inf_{\\bx} \\lambda_{\\min}(\\corange{\\bH_f(\\bx)})} ,
\\qquad\\text{damit}\\qquad
\\rho = 1 - \\frac{\\mu}{L} = \\frac{\\kappa_f - 1}{\\kappa_f} .`}),e.jsxs(i.p,{children:[`Der Name passt zur Matrixkondition. Für eine Quadrik
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}\\bx^\\top\\bA\\bx"}),` mit
`,e.jsx(d,{id:"positive-definite",children:"positiv definitem"})," ",e.jsx(n,{children:"\\bA"}),` ist
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\bA"})," überall, also ",e.jsx(n,{children:"L = \\lambda_{\\max}(\\bA)"}),`,
`,e.jsx(n,{children:"\\mu = \\lambda_{\\min}(\\bA)"})," und"]}),e.jsx(F,{children:"\\kappa_f = \\frac{\\lambda_{\\max}(\\bA)}{\\lambda_{\\min}(\\bA)} = \\kappa_2(\\bA) ,"}),e.jsxs(i.p,{children:["die ",e.jsx(d,{id:"condition-number",children:"Konditionszahl"}),` der Matrix aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),". Für allgemeines ",e.jsx(n,{children:"f"}),` wandert die
Hesse-Matrix mit `,e.jsx(n,{children:"\\bx"}),", und ",e.jsx(n,{children:"\\kappa_f"}),` misst das Verhältnis der extremen
Krümmungen über den ganzen Definitionsbereich hinweg.`]}),e.jsxs(i.p,{children:["Wie teuer ein großes ",e.jsx(n,{children:"\\kappa_f"})," ist, lässt sich beziffern. Aus ",e.jsx(n,{children:`\\rho^k \\le
10^{-1}`})," folgt ",e.jsx(n,{children:"k \\ge \\ln 10 / (-\\ln \\rho)"}),", und weil ",e.jsx(n,{children:`-\\ln(1 - 1/\\kappa_f)
\\approx 1/\\kappa_f`})," ist, wächst diese Zahl ungefähr proportional zu ",e.jsx(n,{children:"\\kappa_f"}),`:
Nach dieser Schranke kostet eine Dezimalstelle bei `,e.jsx(n,{children:"\\kappa_f = 10"}),` rund
`,e.jsx(n,{children:"21{,}9"})," Schritte, bei ",e.jsx(n,{children:"\\kappa_f = 20"})," schon ",e.jsx(n,{children:"44{,}9"})," und bei ",e.jsx(n,{children:"\\kappa_f = 100"}),`
`,e.jsx(n,{children:"229{,}1"}),`. Geometrisch
heißt großes `,e.jsx(n,{children:"\\kappa_f"}),", dass die ",e.jsx(d,{id:"level-sets",children:"Höhenlinien"}),` lange, schmale
Ellipsen sind; bei einer Quadrik gilt das überall, sonst in der Nähe eines
Minimums, wo die Hesse-Matrix positiv definit ist. In solchen Tälern läuft der
Gradientenabstieg im Zickzack: Er bewegt sich quer zum Tal, statt es entlangzulaufen.`]}),e.jsxs(i.p,{children:[`Auf einer Quadrik lässt sich das ausrechnen: Der Fehler zerfällt nach den
Eigenrichtungen von `,e.jsx(n,{children:"\\corange{\\bH_f}"}),`, und jede Richtung hat ihren eigenen
Faktor `,e.jsx(n,{children:"1 - \\gamma\\lambda_i"})," (",e.jsx(d,{id:"env:gradientenabstieg-auf-einer-quadrik",href:"#env-gradientenabstieg-auf-einer-quadrik",children:"Satz 12.3.15"}),`). Die
Schrittweite muss sich mit `,e.jsx(n,{children:"\\gamma < 2/L"}),` nach der steilsten Richtung richten,
vorankommen müssen wir aber in der flachsten, wo der Faktor `,e.jsx(n,{children:"1 - \\gamma\\mu"}),`
nahe eins liegt.`]})]}),`
`,e.jsxs(pe,{title:"Gradientenabstieg auf einer Quadrik: Fehlerzerlegung und Zahlenbeispiel",children:[e.jsxs(i.p,{children:[`Auf einer Quadrik ist der folgende Satz schärfer als
`,e.jsx(d,{id:"env:konvergenzrate-bei-starker-konvexitaet",href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),`: Er sagt, was tatsächlich passiert,
statt nur eine Schranke zu geben, und deckt jede Schrittweite unterhalb der
Divergenzgrenze ab.`]}),e.jsxs(D,{kind:"Satz",label:"12.3.15 (Gradientenabstieg auf einer Quadrik)",id:"env-gradientenabstieg-auf-einer-quadrik",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` symmetrisch und positiv definit mit Eigenwerten
`,e.jsx(n,{children:"0 < \\mu = \\lambda_1 \\le \\dots \\le \\lambda_n = L"}),`, und sei
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(\\bx - \\cgreen{\\bx^\\star})^\\top \\bA (\\bx - \\cgreen{\\bx^\\star})"}),`.
Dann gilt für den Gradientenabstieg mit fester Schrittweite `,e.jsx(n,{children:"\\gamma"}),` und den
Fehler `,e.jsx(n,{children:"\\be^{(k)} := \\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}"})]}),e.jsx(ne,{tag:"12.3.6",id:"eq-gradientenabstieg-auf-einer-quadrik",children:`\\be^{(k)} = (\\bI - \\gamma\\bA)^k\\,\\be^{(0)}
\\qquad\\text{und}\\qquad
\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
\\le q^{2k}\\Bigl(\\cblue{f\\bigl(\\bx^{(0)}\\bigr)} - \\cgreen{f(\\bx^\\star)}\\Bigr)`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"q := \\max_i \\left|1 - \\gamma\\lambda_i\\right|"}),`. Die Iteration konvergiert
genau dann für jeden Startpunkt, wenn `,e.jsx(n,{children:"q < 1"}),` ist, und das trifft für
`,e.jsx(n,{children:"0 < \\gamma < 2/L"})," zu."]})]}),e.jsxs(sn,{children:[e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["der Gradient der ",e.jsx(d,{id:"quadratic-form",children:"quadratischen Form"})," ",e.jsx(n,{children:"\\bx^\\top\\bA\\bx"})," ist für symmetrisches ",e.jsx(n,{children:"\\bA"})," gerade ",e.jsx(n,{children:"2\\bx^\\top\\bA"})," (",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),"), und der Faktor ",e.jsx(n,{children:"\\tfrac12"})," kürzt die ",e.jsx(n,{children:"2"})," weg; der Fehler erfüllt dieselbe Rekursion wie die Iterierten, weil ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," konstant ist. ",e.jsx(n,{children:"\\bI - \\gamma\\bA"})," hat dieselben Eigenvektoren wie ",e.jsx(n,{children:"\\bA"}),", mit den Eigenwerten ",e.jsx(n,{children:"1 - \\gamma\\lambda_i"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Fehlerrekursion und Spektralzerlegung."}),` Der Gradient der quadratischen Form ist
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (\\bx - \\cgreen{\\bx^\\star})^\\top\\bA"}),`. Einsetzen in
`,e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"})," und Abziehen von ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`
auf beiden Seiten gibt
`,e.jsx(n,{children:"\\be^{(k+1)} = (\\bI - \\gamma\\bA)\\,\\be^{(k)}"}),", also nach ",e.jsx(n,{children:"k"}),` Schritten die erste
Aussage von `,e.jsx(i.a,{href:"#eq-gradientenabstieg-auf-einer-quadrik",children:"(12.3.6)"}),". Weil ",e.jsx(n,{children:"\\bA"}),` symmetrisch ist,
liefert der Spektralsatz eine Orthonormalbasis `,e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),` aus
Eigenvektoren, und in ihr zerfällt der Fehler in `,e.jsx(n,{children:"n"}),` unabhängige Anteile: Mit
`,e.jsx(n,{children:"\\be^{(0)} = \\sum_i c_i \\bv_i"})," ist"]}),e.jsx(F,{children:`(\\bI - \\gamma\\bA)\\,\\bv_i = (1 - \\gamma\\lambda_i)\\,\\bv_i
\\qquad\\Longrightarrow\\qquad
\\be^{(k)} = \\sum_{i=1}^{n} (1 - \\gamma\\lambda_i)^k\\, c_i\\, \\bv_i .`}),e.jsxs(i.p,{children:["Jede Eigenrichtung hat also ihren eigenen Fehlerfaktor ",e.jsx(n,{children:"1 - \\gamma\\lambda_i"}),`;
`,e.jsx(i.a,{href:"#eq-zu-klein-zu-gross-gerade-richtig",children:"(12.3.2)"})," ist der Fall ",e.jsx(n,{children:"n = 1"}),"."]})]}),e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["Jeder einzelne Faktor ",e.jsx(n,{children:"(1-\\gamma\\lambda_i)^{2k}"})," ist höchstens ",e.jsx(n,{children:"q^{2k}"}),", und alle Summanden ",e.jsx(n,{children:"\\lambda_i c_i^2"})," sind wegen ",e.jsx(n,{children:"\\lambda_i > 0"})," nichtnegativ, dürfen also mit demselben Faktor abgeschätzt werden"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Funktionswert."})," In derselben Basis ist wegen ",e.jsx(n,{children:"\\bA\\bv_i = \\lambda_i \\bv_i"}),`
und `,e.jsx(n,{children:"\\bv_i^\\top\\bv_j = \\delta_{ij}"})]}),e.jsx(F,{children:`\\cblue{f\\bigl(\\bx^{(k)}\\bigr)} - \\cgreen{f(\\bx^\\star)}
= \\tfrac{1}{2}\\,\\be^{(k)\\top}\\bA\\,\\be^{(k)}
= \\tfrac{1}{2}\\sum_{i=1}^{n} \\lambda_i (1 - \\gamma\\lambda_i)^{2k} c_i^2
\\le q^{2k}\\cdot \\tfrac{1}{2}\\sum_{i=1}^{n} \\lambda_i c_i^2 ,`}),e.jsxs(i.p,{children:["und ",e.jsx(n,{children:"\\tfrac{1}{2}\\sum_i \\lambda_i c_i^2"}),` ist gerade
`,e.jsx(n,{children:"\\cblue{f(\\bx^{(0)})} - \\cgreen{f(\\bx^\\star)}"}),`. Das ist die zweite Aussage von
`,e.jsx(i.a,{href:"#eq-gradientenabstieg-auf-einer-quadrik",children:"(12.3.6)"}),"."]})]}),e.jsx(re,{why:e.jsxs(e.Fragment,{children:["Die kritische Bedingung stammt immer vom größten Eigenwert: ",e.jsx(n,{children:"\\gamma\\lambda_i < 2"})," für alle ",e.jsx(n,{children:"i"})," ist dasselbe wie ",e.jsx(n,{children:"\\gamma L < 2"})]}),children:e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Die Bedingung an ",e.jsx(n,{children:"\\gamma"}),"."]})," Es ist ",e.jsx(n,{children:"q < 1"}),` genau dann, wenn
`,e.jsx(n,{children:"0 < \\gamma\\lambda_i < 2"})," für alle ",e.jsx(n,{children:"i"})," gilt, und weil alle ",e.jsx(n,{children:"\\lambda_i"}),` positiv
sind und `,e.jsx(n,{children:"L"})," der größte ist, ist das gleichwertig zu ",e.jsx(n,{children:"0 < \\gamma < 2/L"}),`. Ist
umgekehrt `,e.jsx(n,{children:"q \\ge 1"}),`, so fällt die Komponente in der zugehörigen Eigenrichtung
nicht mehr gegen null.`]})})]}),e.jsxs(D,{kind:"Beispiel",label:"12.3.16 (Warum der Satz eine Schranke ist und keine Formel)",id:"env-warum-der-satz-eine-schranke-ist-und",children:[e.jsxs(i.p,{children:["Nehmen wir ",e.jsx(n,{children:"\\bA = \\diag(1, 10)"}),`, also
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}\\bigl(x_1^2 + 10\\,x_2^2\\bigr)"}),`, mit
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star} = \\bnull"}),". Dann ist ",e.jsx(n,{children:"\\mu = 1"}),", ",e.jsx(n,{children:"L = 10"}),` und
`,e.jsx(n,{children:"\\kappa_f = 10"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\gamma = 1/L = 0{,}1"})]}),` sind die beiden Fehlerfaktoren
`,e.jsx(n,{children:"1 - \\gamma\\mu = 0{,}9"})," und ",e.jsx(n,{children:"1 - \\gamma L = 0"}),`. Die steile Richtung wird also in
einem einzigen Schritt exakt getroffen, danach lebt der Fehler nur noch in der
flachen Richtung und wird je Schritt mit `,e.jsx(n,{children:"0{,}9"}),` multipliziert. Nach
`,e.jsx(d,{id:"env:gradientenabstieg-auf-einer-quadrik",href:"#env-gradientenabstieg-auf-einer-quadrik",children:"Satz 12.3.15"}),` fällt der Funktionswert deshalb ab dem zweiten Schritt auf exakt das
`,e.jsx(n,{children:"0{,}9^2 = 0{,}81"}),"-fache. ",e.jsx(d,{id:"env:konvergenzrate-bei-starker-konvexitaet",href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),` verspricht an derselben Stelle nur
`,e.jsx(n,{children:"\\rho = 1 - \\mu/L = 0{,}9"}),". Beides ist richtig, denn ",e.jsx(i.a,{href:"#eq-konvergenzrate-bei-starker-konvexitaet",children:"(12.3.5)"}),` ist eine
`,e.jsx(i.em,{children:"obere Schranke"}),`: Der beobachtete Verlauf darf schneller sein, und hier ist er es
um genau den Faktor `,e.jsx(n,{children:"\\rho"}),` je Schritt. Die Lesart „der Fehler fällt genau
wie `,e.jsx(n,{children:"\\rho^k"}),'" ist falsch.']}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\gamma = 0{,}18"})]})," dagegen sind die Faktoren ",e.jsx(n,{children:"0{,}82"})," und ",e.jsx(n,{children:"-0{,}8"}),`: Die
steile Richtung wechselt in jedem Schritt das Vorzeichen, die flache kommt kaum voran.
Das ist das Zickzack aus `,e.jsx(i.a,{href:"#env-die-konditionszahl-einer-funktion",children:"Bemerkung 12.3.14"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Mit ",e.jsx(n,{children:"\\cred{\\gamma = 0{,}2 = 2/L}"})]}),` pendelt die zweite Komponente zwischen zwei
Werten, ohne kleiner zu werden, und darüber divergiert sie.`]})]})]}),`
`,e.jsx(i.p,{children:"Wie teuer schlechte Kondition wird, lässt sich zählen."}),`
`,e.jsxs(Me,{title:"Zickzack im schmalen Tal",children:[e.jsxs(i.p,{children:[`Die obere Tafel zeigt die Höhenlinien von
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(x_1^2 + \\kappa\\,x_2^2)"}),` und den Weg der Iterierten, die
mittlere den Verlauf von `,e.jsx(n,{children:"\\cblue{f(\\bx^{(k)})} - \\cgreen{f(\\bx^\\star)}"}),` auf
logarithmischer Skala, daneben steht dieselbe Quadrik als Fläche. Der Regler für
`,e.jsx(n,{children:"\\gamma"})," ist in Vielfachen von ",e.jsx(n,{children:"2/L"}),` geeicht, damit die Schwellen unabhängig von
`,e.jsx(n,{children:"\\kappa"})," an derselben Stelle liegen."]}),e.jsx(Re,{frage:e.jsxs(e.Fragment,{children:["Bei ",e.jsx(n,{children:"\\kappa = 10"})," braucht der Abstieg in der Voreinstellung ",e.jsx(n,{children:"35"})," Schritte, bis ",e.jsx(n,{children:"f"})," auf ein Millionstel gefallen ist. Wie viele bei ",e.jsx(n,{children:"\\kappa = 100"}),"?"]}),loesung:336,toleranz:80,einheit:"Schritte",verdeckt:e.jsxs(e.Fragment,{children:["Der Aufwand wächst ungefähr proportional zu ",e.jsx(n,{children:"\\kappa"}),": ",e.jsx(n,{children:"35"})," Schritte bei ",e.jsx(n,{children:"\\kappa = 10"}),", ",e.jsx(n,{children:"88"})," bei ",e.jsx(n,{children:"\\kappa = 25"})," und ",e.jsx(n,{children:"336"})," bei ",e.jsx(n,{children:"\\kappa = 100"}),". Die Ablesetafel des Widgets nennt die Zahl zu jedem eingestellten ",e.jsx(n,{children:"\\kappa"}),"."]}),children:e.jsx(Ut,{})}),e.jsxs(i.p,{children:["Der Aufwand wächst ungefähr proportional zur Kondition. Bei ",e.jsx(n,{children:"\\kappa = 1"}),` sind
die Höhenlinien Kreise, der negative Gradient zeigt direkt auf das Minimum, und
mit einem halben Anteil ist das Verfahren nach einem Schritt fertig. Bei
`,e.jsx(n,{children:"\\kappa = 10"})," und ",e.jsx(n,{children:"\\gamma = 1/L"}),` zeigt die Tafel den gemessenen Quotienten
`,e.jsx(n,{children:"0{,}81"})," gegen die gestrichelte Schranke ",e.jsx(n,{children:"\\rho = 0{,}9"}),` aus
`,e.jsx(d,{id:"env:konvergenzrate-bei-starker-konvexitaet",href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),`: Der Satz gibt eine obere Schranke,
das Verfahren darf schneller sein. Bei einem Anteil um `,e.jsx(n,{children:"0{,}9"}),` entsteht das
Zickzack; die Schranke fehlt dann, weil der Satz `,e.jsx(n,{children:"\\gamma \\le 1/L"})," voraussetzt."]})]}),`
`,e.jsx(i.h3,{children:"Wann hören wir auf?"}),`
`,e.jsxs(i.p,{children:["Die Iteration ",e.jsx(i.a,{href:"#eq-nelder-mead-gradient-gradientenabstieg",children:"(12.3.1)"}),` läuft von sich aus
ewig. Brauchbare Abbruchregeln messen etwas, das wir ausrechnen können; der
Abstand `,e.jsx(n,{children:"\\left\\|\\cblue{\\bx^{(k)}} - \\cgreen{\\bx^\\star}\\right\\|"}),` gehört nicht
dazu, denn `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ist gerade das Gesuchte."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.17 (Drei Abbruchkriterien und ihre Grenzen)",id:"env-drei-abbruchkriterien-und-ihre-grenzen",children:[e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Der Gradient ist klein:"}),`
`,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\cblue{\\bx^{(k)}})}\\right\\| < \\varepsilon_{\\mathrm{grad}}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Der Funktionswert stagniert:"}),`
`,e.jsx(n,{children:"\\bigl|\\cblue{f(\\bx^{(k+1)})} - \\cblue{f(\\bx^{(k)})}\\bigr| \\big/ \\bigl|\\cblue{f(\\bx^{(k)})}\\bigr| < \\varepsilon_f"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Das Budget ist aufgebraucht:"})," ",e.jsx(n,{children:"k > k_{\\max}"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Üblich sind ",e.jsx(n,{children:"\\varepsilon_{\\mathrm{grad}} \\approx 10^{-6}"})," bis ",e.jsx(n,{children:"10^{-8}"}),` und
`,e.jsx(n,{children:"k_{\\max} \\approx 1000"})," bis ",e.jsx(n,{children:"10\\,000"}),`, und üblich ist es auch, mehrere Kriterien
zu kombinieren: Die ersten beiden sagen etwas über die Lösung, das dritte
verhindert eine Endlosschleife, wenn keines der anderen greift.`]}),e.jsxs(i.p,{children:[`Bei schlecht konditionierten oder nicht stark konvexen Problemen können die
Kriterien versagen. Für stark konvexes `,e.jsx(n,{children:"f"}),` gilt zwar
`,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx)}\\right\\| \\ge \\mu\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\|"}),`
und damit
`,e.jsx(n,{children:"\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\| \\le \\left\\|\\corange{\\nabla f(\\bx)}\\right\\|/\\mu"}),`,
doch diese Schranke ist nur so gut wie `,e.jsx(n,{children:"\\mu"}),`. Ein Beispiel:
`,e.jsx(n,{children:"f(\\bx) = \\tfrac{1}{2}(x_1^2 + 10^{-8}x_2^2)"}),` hat an der Stelle
`,e.jsx(n,{children:"\\cblue{\\bx} = (0;\\ 10)^\\top"}),` den Gradienten
`,e.jsx(n,{children:"\\corange{\\nabla f} = (0;\\ 10^{-7})"}),`, unterschreitet also jede
Gradientenschranke ab `,e.jsx(n,{children:"10^{-6}"}),", und liegt trotzdem ",e.jsx(n,{children:"10"}),` Einheiten vom Minimum
entfernt. Der Funktionswert ist dort allerdings schon fast optimal, nämlich
`,e.jsx(n,{children:"f - \\cgreen{f^\\star} = 5\\cdot 10^{-7}"}),`. Das ist die
korrekte Auskunft: In einer flachen Richtung ist die `,e.jsx(i.em,{children:"Stelle"}),` des Minimums
schlecht bestimmt, sein `,e.jsx(i.em,{children:"Wert"})," dagegen gut."]}),e.jsxs(i.p,{children:[`Das zweite Kriterium ist noch schwächer: Kleiner Fortschritt kann auch an einem
zu kleinen `,e.jsx(n,{children:"\\gamma"})," liegen, und für ",e.jsx(n,{children:"\\cblue{f(\\bx^{(k)})}"}),` nahe null ist der
relative Quotient nicht aussagekräftig. Am Ende lohnt deshalb die Prüfung, ob der
Gradient `,e.jsx(i.em,{children:"relativ zur Skala des Problems"})," klein ist."]})]}),`
`,e.jsx(i.h3,{children:"Schrittweitensuche: die Armijo-Bedingung"}),`
`,e.jsxs(i.p,{children:["Eine feste Schrittweite ist immer ein Kompromiss, und ",e.jsx(n,{children:"L"}),` kennen wir in der
Regel nicht. Naheliegend ist deshalb, `,e.jsx(n,{children:"\\gamma"}),` in jedem Schritt neu zu
bestimmen, klein genug für sicheren Abstieg und groß genug für Fortschritt. Diese
Suche auf der Geraden `,e.jsx(n,{children:"\\gamma \\mapsto \\cblue{\\bx^{(k)}} + \\gamma\\corange{\\bd}"}),`
heißt `,e.jsx(i.em,{children:"Liniensuche"}),` (line search). Den exakten Minimierer dort zu bestimmen,
wäre wieder ein Optimierungsproblem; billiger ist eine Bedingung, die nur
„genügend Abstieg" verlangt. Der Buchstabe `,e.jsx(n,{children:"\\rho"}),` steht im folgenden Algorithmus
für den Faktor, um den die Schrittweite verkleinert wird, nicht für die
Konvergenzrate aus `,e.jsx(d,{id:"env:konvergenzrate-bei-starker-konvexitaet",href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"}),"."]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.3.18 (Backtracking-Liniensuche nach Armijo)",id:"env-backtracking-liniensuche-nach-armijo",children:[e.jsxs(i.p,{children:["Gegeben seien die aktuelle Stelle ",e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"}),`, die Suchrichtung
`,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\cblue{\\bx^{(k)}})^\\top}"}),` und Parameter
`,e.jsx(n,{children:"c \\in (0, 1)"})," sowie ",e.jsx(n,{children:"\\rho \\in (0, 1)"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Starte mit ",e.jsx(n,{children:"\\gamma = 1"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Solange"}),`
`,e.jsx(ne,{tag:"12.3.7",id:"eq-backtracking-liniensuche-nach-armijo",children:`\\cblue{f\\bigl(\\bx^{(k)} + \\gamma\\corange{\\bd}\\bigr)}
> \\cblue{f\\bigl(\\bx^{(k)}\\bigr)}
+ c\\,\\gamma\\,\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\,\\corange{\\bd} ,`}),`
`,e.jsxs(i.p,{children:["setze ",e.jsx(n,{children:"\\gamma \\leftarrow \\rho\\,\\gamma"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Gib ",e.jsx(n,{children:"\\gamma"}),` zurück und setze
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\gamma\\corange{\\bd}"}),"."]}),`
`]}),`
`]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.3.19 (Was die Armijo-Bedingung fordert)",id:"env-was-die-armijo-bedingung-fordert",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Das Vorzeichen."}),` Mit
`,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\bx^{(k)})^\\top}"})," ist"]}),e.jsx(F,{children:`\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\,\\corange{\\bd}
= -\\left\\|\\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)}\\right\\|^2 < 0
\\qquad\\text{für } \\corange{\\nabla f\\bigl(\\bx^{(k)}\\bigr)} \\neq \\bnull^\\top ,`}),e.jsxs(i.p,{children:["der Zusatzterm ",e.jsx(n,{children:"c\\,\\gamma\\,\\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd}"}),` auf der
rechten Seite von `,e.jsx(i.a,{href:"#eq-backtracking-liniensuche-nach-armijo",children:"(12.3.7)"})," ist also ",e.jsx(i.em,{children:"negativ"}),`,
und die rechte Seite liegt unter dem alten Funktionswert. Der Funktionswert muss
um einen Betrag sinken, der proportional zu `,e.jsx(n,{children:"\\gamma"}),` und zum Quadrat der
Gradientennorm ist: Wo es steil bergab geht, wird viel verlangt, wo es flach
ist, wenig.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die geometrische Lesart."}),` Die Gerade
`,e.jsx(n,{children:"\\gamma \\mapsto \\cblue{f(\\bx^{(k)})} + \\gamma\\,\\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd}"}),`
ist die Tangente an den Schnitt
`,e.jsx(n,{children:"\\varphi(\\gamma) = \\cblue{f(\\bx^{(k)} + \\gamma\\corange{\\bd})}"}),` im Nullpunkt. Die
Armijo-Gerade ist dieselbe Gerade, um den Faktor `,e.jsx(n,{children:"c"}),` flacher gelegt. Gefordert
wird, unter ihr zu bleiben; je kleiner `,e.jsx(n,{children:"c"}),", desto bescheidener die Forderung."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum die Schleife endet."}),` Nach Taylor ist
`,e.jsx(n,{children:"\\varphi(\\gamma) = \\varphi(0) + \\gamma\\varphi'(0) + o(\\gamma)"}),` mit
`,e.jsx(n,{children:"\\varphi'(0) = \\corange{\\nabla f(\\bx^{(k)})}\\corange{\\bd} < 0"}),`; für kleine
`,e.jsx(n,{children:"\\gamma"})," liegt die linke Seite von ",e.jsx(i.a,{href:"#eq-backtracking-liniensuche-nach-armijo",children:"(12.3.7)"}),` also
nahe bei `,e.jsx(n,{children:"\\varphi(0) + \\gamma\\varphi'(0)"}),` und damit unter der rechten, weil
`,e.jsx(n,{children:"\\gamma\\varphi'(0) < c\\,\\gamma\\varphi'(0)"})," für ",e.jsx(n,{children:"c < 1"}),` gilt. Solange der
Gradient nicht verschwindet, endet die Schleife deshalb nach endlich vielen
Verkleinerungen.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Typische Parameter."})," ",e.jsx(n,{children:"c = 10^{-4}"})," und ",e.jsx(n,{children:"\\rho = 0{,}5"}),`, die Schrittweite wird
also halbiert. Mit so kleinem `,e.jsx(n,{children:"c"}),` ist die Armijo-Gerade praktisch waagerecht, und
die Bedingung heißt kaum mehr als „der Funktionswert muss wirklich sinken";
das macht sie robust, denn verworfen wird nur ein Schritt, der über das Ziel
hinausschießt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ausblick."}),` Quasi-Newton-Verfahren wie BFGS benutzen dieselbe
Backtracking-Schleife mit einer anderen Suchrichtung (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]})]}),`
`,e.jsx(i.p,{children:"Wie oft muss die Schleife halbieren, bis sie eine Schrittweite akzeptiert?"}),`
`,e.jsxs(Me,{title:"Die Armijo-Bedingung am Schnitt",children:[e.jsxs(i.p,{children:["Die drei Kurven: der Schnitt ",e.jsx(n,{children:"\\varphi(\\gamma)"}),` in
Violett, die Tangente in Orange und die Armijo-Gerade
gestrichelt in Grau. Die roten Punkte sind verworfene Probeschritte, der blaue
ist der akzeptierte. Als Zielfunktion dient die Quadrik
`,e.jsx(n,{children:"f(\\bx) = \\tfrac12 x_1^2 + \\tfrac52 x_2^2"})," mit ",e.jsx(n,{children:"\\kappa_f = 5"}),`, als Suchrichtung
wie immer `,e.jsx(n,{children:"\\corange{\\bd} = -\\corange{\\nabla f(\\bx)^\\top}"}),"."]}),e.jsx(Yt,{}),e.jsxs(i.p,{children:["In der Voreinstellung wird ",e.jsx(n,{children:"\\gamma = 1"})," verworfen und ",e.jsx(n,{children:"\\gamma = 0{,}5"}),`
angenommen, obwohl der exakte Minimierer bei `,e.jsx(n,{children:"\\gamma^\\star = 1/3"}),` läge; der
billige Kompromiss genügt, weil ohnehin ein nächster Schritt folgt. Mit
`,e.jsx(n,{children:"c = 0{,}3"}),` wird die Forderung steiler, und erst nach einer zweiten Halbierung
wird `,e.jsx(n,{children:"\\gamma = 0{,}25"}),` angenommen. Über alle Reglerstellungen hinweg sind
höchstens `,e.jsx(n,{children:"16"})," Halbierungen nötig."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = x_1^2 + 4x_2^2"})," mit ",e.jsx(n,{children:"\\cblue{\\bx^{(0)}} = (2, 1)^\\top"}),` und
`,e.jsx(n,{children:"\\gamma = 0{,}25"})," ist ",e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (1, -1)^\\top"}),"."]}),e.jsxs(i.p,{children:["Der Gradient ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (2x_1,\\ 8x_2)"}),`, an der Stelle
`,e.jsx(n,{children:"(2, 1)^\\top"})," also ",e.jsx(n,{children:"(4,\\ 8)"}),`. Damit ist
`,e.jsx(n,{children:"\\cblue{\\bx^{(1)}} = (2, 1)^\\top - 0{,}25\\cdot(4, 8)^\\top = (1, -1)^\\top"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Auf der Quadrik mit ",e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(1, 10)"}),` fällt der Funktionswert mit
`,e.jsx(n,{children:"\\gamma = 1/L"})," in jedem Schritt genau auf das ",e.jsx(n,{children:"\\rho = 0{,}9"}),"-fache."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-konvergenzrate-bei-starker-konvexitaet",children:"(12.3.5)"}),` ist eine obere Schranke, keine Gleichung. Tatsächlich fällt der Wert
ab dem zweiten Schritt auf das `,e.jsx(n,{children:"0{,}81"}),"-fache, also auf das ",e.jsx(n,{children:"\\rho^2"}),`-fache: Die
steile Richtung ist wegen `,e.jsx(n,{children:"1 - \\gamma L = 0"}),` schon nach dem ersten Schritt
erledigt, und in der flachen schrumpft der Fehler mit `,e.jsx(n,{children:"0{,}9"}),`, der Funktionswert
also mit `,e.jsx(n,{children:"0{,}9^2"}),"."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Auch für nicht konvexes ",e.jsx(n,{children:"f"})," ist ",e.jsx(n,{children:"-\\corange{\\nabla f(\\bx)^\\top}"}),` eine
Abstiegsrichtung, solange `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"})," ist."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:`\\corange{\\nabla f(\\bx)}\\bigl(-\\corange{\\nabla f(\\bx)^\\top}\\bigr) =
-\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|^2 < 0`}),`, und daraus folgt mit der
Taylorentwicklung erster Ordnung, dass `,e.jsx(n,{children:"f"}),` für hinreichend kleine Schritte
sinkt. Konvexität wird dafür nicht gebraucht
(`,e.jsx(i.a,{href:"#env-drei-lesarten-desselben-schritts",children:"Bemerkung 12.3.5"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\cblue{\\bx^{(k)}})}\\right\\| < 10^{-6}"}),`, so liegt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k)}}"})," nahe am Minimum."]}),e.jsxs(i.p,{children:["Die Schranke ",e.jsx(n,{children:`\\left\\|\\bx - \\cgreen{\\bx^\\star}\\right\\| \\le
\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|/\\mu`}),` hängt an der kleinsten Krümmung
`,e.jsx(n,{children:"\\mu"})," und ist bei kleinem ",e.jsx(n,{children:"\\mu"}),` unbrauchbar. Für
`,e.jsx(n,{children:"f(\\bx) = \\tfrac12(x_1^2 + 10^{-8}x_2^2)"})," ist der Gradient in ",e.jsx(n,{children:"(0;\\ 10)^\\top"}),`
nur `,e.jsx(n,{children:"10^{-7}"})," lang, der Abstand zum Minimum aber ",e.jsx(n,{children:"10"}),`
(`,e.jsx(i.a,{href:"#env-drei-abbruchkriterien-und-ihre-grenzen",children:"Bemerkung 12.3.17"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:[`Für einen Lipschitz-stetigen Gradienten genügt
`,e.jsx(n,{children:"L = \\sup_{\\bx} \\lambda_{\\max}(\\corange{\\bH_f(\\bx)})"})," als Konstante."]}),e.jsxs(i.p,{children:[`Gebraucht wird die Spektralnorm, also der betragsgrößte Eigenwert
`,e.jsx(n,{children:"\\sup_{\\bx}\\max_i \\left|\\lambda_i\\right|"}),". Bei konvexem ",e.jsx(n,{children:"f"}),` fällt beides
zusammen, weil die Hesse-Matrix dann positiv semidefinit ist; sonst nicht. Für
`,e.jsx(n,{children:"f(x) = -x^2"})," ist die exakte Konstante ",e.jsx(n,{children:"2"}),", während der größte Eigenwert ",e.jsx(n,{children:"-2"}),`
beträgt (`,e.jsx(i.a,{href:"#env-lipschitz-stetiger-gradient-und-die",children:"Bemerkung 12.3.9"}),")."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Aus dem voreingestellten Simplex fällt im Nelder-Mead-Widget in vierzig Schritten
kein einziger Schrumpfschritt.`}),e.jsxs(i.p,{children:["Der Zugzähler steht nach vierzig Schritten auf ",e.jsx(n,{children:"13"})," Reflexionen, ",e.jsx(n,{children:"4"}),` Expansionen,
`,e.jsx(n,{children:"23"}),` Kontraktionen und null Schrumpfschritten. Der Schrumpfschritt ist der
teuerste der vier Züge aus `,e.jsx(i.a,{href:"#env-nelder-mead-simplexverfahren",children:"Algorithmus 12.3.2"}),`, und dass er hier gar nicht
gebraucht wird, ist der Grund für die verhältnismäßig guten Kosten.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Nelder-Mead braucht pro Iteration ",e.jsx(n,{children:"O(n^2)"})," Funktionsauswertungen."]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"O(n)"}),`: In einem gewöhnlichen Schritt werden nur ein oder zwei neue
Punkte ausgewertet, erst der Schrumpfschritt kostet `,e.jsx(n,{children:"n"}),` neue Ecken. Langsam wird das Verfahren in hoher Dimension nicht wegen der
Kosten pro Iteration, sondern wegen der Zahl der Iterationen (`,e.jsx(i.a,{href:"#env-wann-sich-nelder-mead-lohnt",children:"Bemerkung 12.3.3"}),")."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Verdoppeln wir ",e.jsx(n,{children:"\\kappa_f"}),`, so verdoppelt sich ungefähr die Schrittzahl, die
`,e.jsx(d,{id:"env:konvergenzrate-bei-starker-konvexitaet",href:"#env-konvergenzrate-bei-starker-konvexitaet",children:"Satz 12.3.13"})," für dieselbe Genauigkeit garantiert."]}),e.jsxs(i.p,{children:["Die garantierte Zahl der Schritte je Dezimalstelle ist ",e.jsx(n,{children:"\\ln 10/(-\\ln\\rho)"}),` mit
`,e.jsx(n,{children:"\\rho = 1 - 1/\\kappa_f"}),", und wegen ",e.jsx(n,{children:"-\\ln(1 - 1/\\kappa_f) \\approx 1/\\kappa_f"}),`
wächst sie näherungsweise linear in `,e.jsx(n,{children:"\\kappa_f"}),": ",e.jsx(n,{children:"21{,}9"})," bei ",e.jsx(n,{children:"\\kappa_f = 10"}),`,
`,e.jsx(n,{children:"44{,}9"})," bei ",e.jsx(n,{children:"20"}),", ",e.jsx(n,{children:"229{,}1"})," bei ",e.jsx(n,{children:"100"})," und ",e.jsx(n,{children:"459{,}4"})," bei ",e.jsx(n,{children:"200"}),`
(`,e.jsx(i.a,{href:"#env-die-konditionszahl-einer-funktion",children:"Bemerkung 12.3.14"}),`). Der tatsächliche Verlauf darf
schneller sein, wie das Widget „Zickzack im schmalen Tal" zeigt, langsamer aber
nicht.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §6.5.1 behandelt die direkten Suchverfahren einschließlich
Nelder-Mead, §6.5.2 den steilsten Abstieg samt Zickzack-Bild, und die
eindimensionalen Verfahren hinter der Liniensuche stehen in §6.4.`})})]})}function es(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(qr,{...r})}):qr(r)}const pi=K.blau,Wr=K.gruen,Ir=K.rot,wi=K.orange,me=(r,i=3)=>T(r,i);function Vr(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const[i,t]=r.toExponential(2).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·10^${Number(t)}`}const ns={name:"konvex: f(x) = x − 2 ln x",formel:"f(x) = x − 2 ln x,  f′(x) = 1 − 2/x,  f″(x) = 2/x²",f:r=>r>0?r-2*Math.log(r):NaN,f1:r=>r>0?1-2/r:NaN,f2:r=>r>0?2/(r*r):NaN,xd:[.15,5],yd:[.3,3.2],x0min:.3,x0max:4.6,x0step:.1,start:1,kritisch:[{x:2,art:"min",global:!0}]},is={name:"nicht konvex: f(x) = x⁴/4 − x³/3 − x² + 2",formel:"f(x) = x⁴/4 − x³/3 − x² + 2,  f′(x) = x³ − x² − 2x,  f″(x) = 3x² − 2x − 2",f:r=>r**4/4-r**3/3-r*r+2,f1:r=>r**3-r*r-2*r,f2:r=>3*r*r-2*r-2,xd:[-2.1,3.1],yd:[-1.2,5],x0min:-2,x0max:3,x0step:.05,start:-2,kritisch:[{x:-1,art:"min"},{x:0,art:"max"},{x:2,art:"min",global:!0}]},Yi=[ns,is];function rs(r,i){const t=[i];let a=i;for(let h=0;h<60;h++){const l=r.f1(a),s=r.f2(a);if(!Number.isFinite(l)||!Number.isFinite(s))return{xs:t,ausgang:"undefiniert"};if(Math.abs(l)<1e-13)return{xs:t,ausgang:"konvergiert"};if(Math.abs(s)<1e-12)return{xs:t,ausgang:"flach"};const c=a-l/s;if(t.push(c),!Number.isFinite(c)||Math.abs(c)>1e6)return{xs:t,ausgang:"weg"};if(!Number.isFinite(r.f(c)))return{xs:t,ausgang:"undefiniert"};if(Math.abs(c-a)<1e-14)return{xs:t,ausgang:"konvergiert"};a=c}return{xs:t,ausgang:"maxIter"}}const or=470,Ai=260,nn=44,ts=30,_e=10,ss=12,vi=or-nn-ss,Te=Ai-_e-ts;function Hr(r,i,t,a){let h="",l=!1;for(let s=0;s<=400;s++){const c=i[0]+(i[1]-i[0])*s/400,p=r(c);if(!Number.isFinite(p)){l=!1;continue}h+=`${l?"L":"M"}${t(c).toFixed(1)} ${a(p).toFixed(1)} `,l=!0}return h}function ls(){const[r,i]=B.useState(0),t=Yi[r],[a,h]=B.useState(t.start),[l,s]=B.useState(!0),{xs:c,ausgang:p}=B.useMemo(()=>rs(t,a),[t,a]),x=g=>nn+(g-t.xd[0])/(t.xd[1]-t.xd[0])*vi,w=g=>_e+(t.yd[1]-g)/(t.yd[1]-t.yd[0])*Te,y=g=>g>=t.xd[0]&&g<=t.xd[1],o=t.f1(a),M=t.f2(a),G=g=>t.f(a)+o*(g-a)+.5*M*(g-a)**2,f=Math.abs(M)>1e-12?a-o/M:null,v=c[c.length-1],z=t.kritisch.find(g=>Math.abs(v-g.x)<1e-6),A=t.kritisch.find(g=>g.global),L=c.map(g=>Math.abs(g-(z?z.x:A.x))),j=f!==null&&Number.isFinite(f)&&Math.abs(f-a)>20;let b="neutral",E="Newton unterwegs",V;p==="flach"?(b="fail",E="Schritt nicht ausführbar",V="Hier verschwindet f″, die Division im Newton-Schritt ist also nicht ausführbar."):p==="undefiniert"?(b="fail",E="aus dem Definitionsbereich gesprungen",V=`Nach ${c.length-1} Schritt${c.length===2?"":"en"} steht die Iteration bei x = ${me(v,3)}, und dort ist f gar nicht mehr erklärt. Newton konvergiert nur lokal: Weit vom Ziel entfernt taugt die Parabel nicht als Modell, und der Schritt kann überall hin zeigen.`):p==="weg"?(b="fail",E="davongelaufen",V="Die Iterierten laufen davon; die Rechnung bricht hier ab."):c.length===1?(b=z&&z.art==="max"?"fail":"ok",E="der Gradient ist schon null",V=`Hier ist der Gradient schon null, die Iteration steht also von Anfang an still. ${z&&z.art==="max"?"Allerdings in einem lokalen Maximum: Newton unterscheidet nicht, welche Sorte kritischer Punkt vor ihm liegt.":"Wir stehen bereits in einem Minimum."}`):z&&z.art==="max"?(b="fail",E="im lokalen Maximum gelandet",V=`Nach ${c.length-1} Schritt${c.length===2?"":"en"} bleibt die Iteration bei x = ${me(z.x,2)} stehen. Dort hat f ein lokales Maximum. Gesucht war ein Minimum, gefunden hat das Verfahren eine Nullstelle der Ableitung, und das ist beides. Verraten hätte es die Krümmung: Bei f″ < 0 öffnet sich die Parabel nach unten, ihr Scheitel ist der höchste und nicht der tiefste Punkt.`):z&&!z.global?(b="warn",E="nur ein lokales Minimum",V=`Die Iteration läuft in ${c.length-1} Schritten nach x = ${me(z.x,2)}. Dort liegt zwar ein lokales Minimum, aber nicht das globale: Bei x = ${me(A.x,2)} ist f um ${me(t.f(z.x)-t.f(A.x),2)} kleiner. Welches Tal wir finden, entscheidet allein der Startpunkt.`):z?(b="ok",E="globales Minimum, quadratisch schnell",V=`Die Iteration erreicht das globale Minimum x⋆ = ${me(A.x,2)} in ${c.length-1} Schritten. In der Nähe des Ziels zeigt die Fehlerspalte die quadratische Konvergenz: Der Quotient eₖ/eₖ₋₁² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Weiter draußen kann es dagegen dauern, bis die Iteration überhaupt in diese Nähe kommt.`):V=`Nach ${c.length-1} Schritten steht die Iteration bei x = ${me(v,4)} und ist noch nicht zur Ruhe gekommen.`,j&&f!==null&&(V+=` Am Startpunkt ist f″ = ${me(M,4)} beinahe null: Die Parabel ist dort fast eine Gerade, ihr Scheitel liegt entsprechend weit draußen, und der erste Schritt springt gleich nach x = ${me(f,1)}. Von dort muss sich die Iteration erst wieder heranarbeiten. Das ist der eindimensionale Fall der Voraussetzung, dass die Hesse-Matrix invertierbar sein muss: Fast singulär genügt schon, um den Schritt unbrauchbar zu machen.`);const _=l&&Number.isFinite(o)&&Number.isFinite(M);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Verschieben wir den Startpunkt über den nicht-konvexen Bereich und lesen ab, in welchem kritischen Punkt Newton landet."}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:["Blau die Funktion und die Iterierten, orange die Parabel, mit der ",O("algorithmus:newton-verfahren-fuer-die-optimierung")," an der aktuellen Stelle rechnet, und ihr Scheitel: dort steht im nächsten Schritt die Iterierte."]}),e.jsx("div",{className:"flex flex-wrap items-center gap-3 text-sm",children:Yi.map((g,W)=>e.jsx("button",{type:"button","aria-pressed":W===r,className:W===r?Ke:$e,onClick:()=>{i(W),h(Yi[W].start)},children:g.name},g.name))}),e.jsx(se,{label:"Startpunkt x⁽⁰⁾",value:a,onChange:g=>h(Math.round(g/t.x0step)*t.x0step),min:t.x0min,max:t.x0max,step:t.x0step,fmt:g=>me(g,2)}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:l,onChange:g=>s(g.target.checked)}),e.jsx("span",{children:"quadratisches Modell T₂ am Startpunkt zeigen"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("svg",{viewBox:`0 0 ${or} ${Ai}`,width:or,height:Ai,role:"img","aria-label":`Der Graph von f mit dem quadratischen Modell am Startpunkt x⁽⁰⁾ = ${me(a,2)} und den ersten Newton-Iterierten.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white text-slate-500 dark:border-slate-600",children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s134-newton-clip",children:e.jsx("rect",{x:nn,y:_e,width:vi,height:Te})})}),e.jsx("rect",{x:nn,y:_e,width:vi,height:Te,fill:"none",stroke:"#cbd5e1"}),Zn(t.xd[0],t.xd[1]).map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:x(g),y1:_e+Te,x2:x(g),y2:_e+Te+4,stroke:"#94a3b8"}),e.jsx("text",{x:x(g),y:_e+Te+15,fontSize:10,textAnchor:"middle",fill:"currentColor",children:me(g,Math.abs(g)<1&&g!==0?1:0)})]},`x${g}`)),Zn(t.yd[0],t.yd[1]).map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:nn-4,y1:w(g),x2:nn,y2:w(g),stroke:"#94a3b8"}),e.jsx("text",{x:nn-6,y:w(g)+3,fontSize:10,textAnchor:"end",fill:"currentColor",children:me(g,0)})]},`y${g}`)),e.jsx("text",{x:nn+vi/2,y:Ai-3,fontSize:11,textAnchor:"middle",fill:"currentColor",children:"x"}),e.jsx("text",{x:12,y:_e+Te/2,fontSize:11,textAnchor:"middle",fill:"currentColor",transform:`rotate(-90 12 ${_e+Te/2})`,children:"f(x)"}),e.jsxs("g",{clipPath:"url(#s134-newton-clip)",children:[t.kritisch.map(g=>e.jsx("line",{x1:x(g.x),y1:_e,x2:x(g.x),y2:_e+Te,stroke:g.art==="min"?Wr:Ir,strokeWidth:1,strokeDasharray:"4 4",opacity:.7},`k${g.x}`)),e.jsx("path",{d:Hr(t.f,t.xd,x,w),fill:"none",stroke:pi,strokeWidth:2}),_&&e.jsx("path",{d:Hr(G,t.xd,x,w),fill:"none",stroke:wi,strokeWidth:2,strokeDasharray:"6 4"}),_&&f!==null&&y(f)&&e.jsx("line",{x1:x(f),y1:_e,x2:x(f),y2:_e+Te,stroke:wi,strokeWidth:1.2,strokeDasharray:"2 3"}),e.jsx("polyline",{points:c.filter(g=>y(g)&&Number.isFinite(t.f(g))).map(g=>`${x(g).toFixed(1)},${w(t.f(g)).toFixed(1)}`).join(" "),fill:"none",stroke:pi,strokeWidth:1.2,strokeDasharray:"3 3",opacity:.8}),c.slice(0,6).map((g,W)=>y(g)&&Number.isFinite(t.f(g))&&e.jsx("circle",{cx:x(g),cy:w(t.f(g)),r:W===0?5:3.4,fill:pi,opacity:W===0?1:.75},`p${W}`)),_&&f!==null&&y(f)&&Number.isFinite(G(f))&&e.jsx("circle",{cx:x(f),cy:w(G(f)),r:4.5,fill:wi}),t.kritisch.filter(g=>g.art==="min").map(g=>e.jsx("circle",{cx:x(g.x),cy:w(t.f(g.x)),r:5.5,fill:"none",stroke:Wr,strokeWidth:2},`m${g.x}`))]})]})}),e.jsxs("div",{className:"max-w-prose space-y-2 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:[e.jsx("p",{className:"font-mono text-xs",children:t.formel}),e.jsxs("p",{children:["Am Startpunkt ",e.jsxs("span",{className:"font-mono",children:["x⁽⁰⁾ = ",me(a,2)]}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:wi},children:["f′ = ",me(o),", f″ = ",me(M)]}),M<0&&e.jsx("span",{style:{color:Ir},children:" (negativ: die Parabel ist nach unten geöffnet, ihr Scheitel ein Hochpunkt)"}),f!==null&&e.jsxs(e.Fragment,{children:[" ","Scheitel und damit nächste Iterierte:"," ",e.jsxs("span",{className:"font-mono",style:{color:pi},children:["x⁽¹⁾ = ",me(f,4)]}),"."]})]}),e.jsxs("table",{className:"font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-4 text-left",children:"k"}),e.jsx("th",{className:"pr-4 text-left",children:"x⁽ᵏ⁾"}),e.jsx("th",{className:"pr-4 text-left",children:"f′(x⁽ᵏ⁾)"}),e.jsx("th",{className:"pr-4 text-left",children:"eₖ"}),e.jsx("th",{className:"text-left",children:"eₖ / eₖ₋₁²"})]})}),e.jsx("tbody",{children:c.slice(0,6).map((g,W)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-4",children:W}),e.jsx("td",{className:"pr-4",children:me(g,8)}),e.jsx("td",{className:"pr-4",children:Vr(t.f1(g))}),e.jsx("td",{className:"pr-4",children:Vr(L[W])}),e.jsx("td",{children:W>0&&L[W-1]>1e-13?me(L[W]/L[W-1]**2,4):"–"})]},`r${W}`))})]})]}),e.jsx(Ne,{kind:b,titel:E,children:V})]})}const zi=K.blau,Pr=K.gruen,Tr=K.orange,Fe=(r,i=3)=>T(r,i);function as(r){if(Number.isNaN(r))return"–";if(!Number.isFinite(r))return r>0?"∞":"−∞";if(r===0)return"0";const[i,t]=r.toExponential(1).split("e");return`${i.replace(".",",").replace(/^-/,"−")}·10^${Number(t)}`}const hi=5,ds=[[1,0],[0,hi]],Zr=r=>.5*r[0]*r[0]+.5*hi*r[1]*r[1],ur=r=>[r[0],hi*r[1]],Or=(r,i)=>[r[0][0]*i[0]+r[0][1]*i[1],r[1][0]*i[0]+r[1][1]*i[1]],er=(r,i)=>r[0]*i[0]+r[1]*i[1];function hs(r,i){let t=[5,1],a=[[1,0],[0,1]];const h=[{x:t,B:a,alpha:null,sekante:null}];for(let l=0;l<i;l++){const s=ur(t);if(Math.hypot(s[0],s[1])<1e-13)break;const c=[-(a[0][0]*s[0]+a[0][1]*s[1]),-(a[1][0]*s[0]+a[1][1]*s[1])],p=er(c,Or(ds,c)),x=r&&p>1e-14?-er(s,c)/p:1,w=[x*c[0],x*c[1]],y=[t[0]+w[0],t[1]+w[1]],o=ur(y),M=[o[0]-s[0],o[1]-s[1]],G=er(M,w);let f=null;if(Math.abs(G)>1e-14){const v=1/G,z=[[1-v*w[0]*M[0],-v*w[0]*M[1]],[-v*w[1]*M[0],1-v*w[1]*M[1]]],A=[[1-v*M[0]*w[0],-v*M[0]*w[1]],[-v*M[1]*w[0],1-v*M[1]*w[1]]],L=[[z[0][0]*a[0][0]+z[0][1]*a[1][0],z[0][0]*a[0][1]+z[0][1]*a[1][1]],[z[1][0]*a[0][0]+z[1][1]*a[1][0],z[1][0]*a[0][1]+z[1][1]*a[1][1]]],j=[[L[0][0]*A[0][0]+L[0][1]*A[1][0],L[0][0]*A[0][1]+L[0][1]*A[1][1]],[L[1][0]*A[0][0]+L[1][1]*A[1][0],L[1][0]*A[0][1]+L[1][1]*A[1][1]]];a=[[j[0][0]+v*w[0]*w[0],j[0][1]+v*w[0]*w[1]],[j[1][0]+v*w[1]*w[0],j[1][1]+v*w[1]*w[1]]];const b=Or(a,M);f=Math.hypot(b[0]-w[0],b[1]-w[1])}t=y,h.push({x:t,B:a,alpha:x,sekante:f})}return h}const ri=400,ti=270,_n=26;function cs(){const[r,i]=B.useState(!1),[t,a]=B.useState(0),h=B.useMemo(()=>hs(r,8),[r]),l=Math.min(t,h.length-1),s=h[l],c=ur(s.x),p=h.slice(0,l+1).map(j=>j.x);let x=5.5,w=1.4;for(const j of p)x=Math.max(x,Math.abs(j[0])*1.15),w=Math.max(w,Math.abs(j[1])*1.15);const y=j=>_n+(j+x)/(2*x)*(ri-2*_n),o=j=>ti-_n-(j+w)/(2*w)*(ti-2*_n),M=(ri-2*_n)/(2*x),G=(ti-2*_n)/(2*w),f=[.6,2.5,7,15,30,45].filter(j=>Math.sqrt(2*j)<1.05*x),v=Math.hypot(s.B[0][0]-1,s.B[0][1],s.B[1][0],s.B[1][1]-1/hi);let z="neutral",A=`nach ${l} Schritten`,L;return l===0?(A="Ausgangslage B₀ = I",L="Start bei B₀ = I. Der erste Schritt ist deshalb ein gewöhnlicher Gradientenschritt: Ohne Vorwissen über die Krümmung kann das Verfahren nichts Besseres tun."):r&&l>=2?(z="ok",A="nach n = 2 Schritten exakt",L=`Die Iterierte sitzt im Minimum, und B₂ stimmt auf allen gezeigten Stellen mit diag(1; 0,2) = H⁻¹ überein. Ein Zufall dieses Beispiels ist das nicht, sondern genau die Aussage von ${O("satz:das-bfgs-update-erfuellt-die")}: Bei einer Quadrik im ℝⁿ liefern n Schritte mit exakter Liniensuche n Sekantenbedingungen für n unabhängige Richtungen, und mehr Information über eine konstante Krümmung gibt es nicht.`):!r&&l===1?(z="warn",A="der erste Schritt geht zu weit",L=`f wächst von 15 auf 40, obwohl die Richtung bergab zeigte. Am Update liegt das nicht, sondern an der Länge α = 1, die niemand geprüft hat. Deshalb kommt BFGS in der Praxis nie ohne Schrittweitensuche (Häkchen setzen); ${O("satz:das-bfgs-update-erfuellt-die")} setzt sie ausdrücklich voraus.`):L=`Nach ${l===1?"einem Schritt":`${l} Schritten`} steht f bei ${Fe(Zr(s.x),4)}. Die Näherung B_${l} hat inzwischen Krümmungsinformation gesammelt, liegt von diag(1; 0,2) aber immer noch ${Fe(v,3)} entfernt (Frobeniusnorm). Das stört nicht weiter, denn für den Schritt zählt nur, ob die Richtung taugt.`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Schieben wir den Schrittregler durch und vergleichen B_k mit H⁻¹: einmal mit, einmal ohne exakte Schrittweite."}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Minimiert wird f(x) = 0,5 x₁² + 2,5 x₂², die Hesse-Matrix ist überall diag(1; 5). BFGS kennt sie nicht, sondern baut aus den beobachteten Gradientendifferenzen eine Näherung B_k der inversen Hesse-Matrix auf."}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:j=>{i(j.target.checked),a(0)}}),e.jsx("span",{children:"exakte Schrittweite statt α = 1"})]}),e.jsx(se,{label:"Schritt k",value:l,onChange:j=>a(Math.round(j)),min:0,max:h.length-1,step:1,fmt:j=>String(Math.round(j))}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${ri} ${ti}`,width:ri,height:ti,role:"img","aria-label":`Höhenlinien der Quadrik mit den ersten ${l} BFGS-Iterierten${r?" bei exakter Schrittweite":""}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:y(-x),y1:o(0),x2:y(x),y2:o(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:y(0),y1:o(-w),x2:y(0),y2:o(w),stroke:"#cbd5e1"}),f.map(j=>e.jsx("ellipse",{cx:y(0),cy:o(0),rx:Math.sqrt(2*j)*M,ry:Math.sqrt(2*j/hi)*G,fill:"none",stroke:"#94a3b8",strokeWidth:.9,strokeDasharray:"3 3"},j)),e.jsx("text",{x:ri-6,y:o(0)-5,fontSize:10,textAnchor:"end",fill:"#64748b",children:"x₁"}),e.jsx("text",{x:y(0)+5,y:12,fontSize:10,fill:"#64748b",children:"x₂"}),e.jsx("polyline",{points:p.map(j=>`${y(j[0]).toFixed(1)},${o(j[1]).toFixed(1)}`).join(" "),fill:"none",stroke:zi,strokeWidth:1.6}),p.map((j,b)=>e.jsx("circle",{cx:y(j[0]),cy:o(j[1]),r:b===l?4.5:2.8,fill:zi,opacity:b===l?1:.65,style:{transition:"cx 250ms ease-in-out, cy 250ms ease-in-out"}},`i${b}`)),e.jsx("circle",{cx:y(0),cy:o(0),r:5,fill:"none",stroke:Pr,strokeWidth:2})]}),e.jsxs("div",{className:"mt-1 flex flex-wrap gap-3",children:[e.jsx("span",{style:{color:zi},children:"● Iterierte"}),e.jsx("span",{style:{color:Pr},children:"◯ Minimum"}),e.jsx("span",{children:"· · · Höhenlinien von f"})]})]}),e.jsxs("div",{className:"min-w-[16rem] grow space-y-1 font-mono text-xs",children:[e.jsxs("div",{style:{color:zi},children:["x⁽",l,"⁾ = (",Fe(s.x[0],4),"; ",Fe(s.x[1],4),")"]}),e.jsxs("div",{children:["f(x⁽",l,"⁾) = ",Fe(Zr(s.x),5)]}),e.jsxs("div",{style:{color:Tr},children:["∇f(x⁽",l,"⁾) = (",Fe(c[0],4),"; ",Fe(c[1],4),")"]}),s.alpha!==null&&e.jsxs("div",{children:["α für diesen Schritt = ",Fe(s.alpha,4)]}),e.jsxs("div",{className:"pt-2",style:{color:Tr},children:["B_",l," = (",Fe(s.B[0][0],4)," ",Fe(s.B[0][1],4),"; ",Fe(s.B[1][0],4)," ",Fe(s.B[1][1],4),")"]}),e.jsx("div",{className:"text-slate-500 dark:text-slate-400",children:"H⁻¹ = (1,0000 0,0000; 0,0000 0,2000)"}),s.sekante!==null&&e.jsxs("div",{className:"text-slate-500 dark:text-slate-400",children:["Sekantenbedingung ‖B_",l," y − s‖ = ",as(s.sekante)]})]})]}),e.jsx(Ne,{kind:z,titel:A,children:L})]})}const Si=K.blau,yi=K.violett,Ur=K.gruen,Y=(r,i=2)=>T(r,i),xs=[{name:"κ = 5: gut konditioniert",c:5,rel:1,alpha:.9},{name:"κ = 25: mittel",c:25,rel:1,alpha:.9},{name:"κ = 100: schlecht",c:100,rel:1,alpha:.9}],$i=[5,1],nr=60,si=1e3;function ir(r,i,t,a){let h=[...$i],l=[0,0];const s=[[...h]];for(let c=0;c<a;c++){const p=[h[0],r*h[1]];if(l=[t*l[0]-i*p[0],t*l[1]-i*p[1]],h=[h[0]+l[0],h[1]+l[1]],!Number.isFinite(h[0])||!Number.isFinite(h[1])||Math.hypot(h[0],h[1])>1e12){s.push([...h]);break}s.push([...h])}return s}const An=420,$n=250,Ye=24,Mi=330,Di=190,Ni=46,os=24,Cr=10,Xr=10;function us(){const[r,i]=B.useState(25),[t,a]=B.useState(1),[h,l]=B.useState(.9),s=Math.max(1,r),c=Math.min(1,r),p=s/c,x=t/s,w=$=>.5*($[0]*$[0]+r*$[1]*$[1]),y=B.useMemo(()=>ir(r,x,0,nr),[r,x]),o=B.useMemo(()=>ir(r,x,h,nr),[r,x,h]),M=w($i),G=$=>{const Ze=ir(r,x,$,si).findIndex(ot=>w(ot)<=1e-6*M);return Ze<0?null:Ze},f=G(0),v=G(h),z=((Math.sqrt(p)-1)/(Math.sqrt(p)+1))**2,A=4/(Math.sqrt(s)+Math.sqrt(c))**2*s,L=7,j=2.2,b=$=>Ye+($+L)/(2*L)*(An-2*Ye),E=$=>$n-Ye-($+j)/(2*j)*($n-2*Ye),V=(An-2*Ye)/(2*L),_=($n-2*Ye)/(2*j),g=($,le)=>Math.max(-3*le,Math.min(3*le,$)),W=$=>$.filter(le=>Number.isFinite(le[0])&&Number.isFinite(le[1])).map(le=>`${b(g(le[0],L)).toFixed(1)},${E(g(le[1],j)).toFixed(1)}`).join(" "),C=[.5,2,5,12.5,25].filter($=>Math.sqrt(2*$)<1.3*L),H=$=>$.map(le=>Math.log10(Math.max(w(le),1e-16))),X=H(y),S=H(o);let R=2,U=-8;for(const $ of[X,S])for(const le of $)Number.isFinite(le)&&(R=Math.max(R,Math.ceil(le)));const Q=$=>Ni+(Mi-Ni-Xr)*$/nr,ie=$=>Cr+(Di-Cr-os)*(R-$)/(R-U),he=$=>$.map((le,Ze)=>`${Q(Ze).toFixed(1)},${ie(Math.max(U,Math.min(R,le))).toFixed(1)}`).join(" "),u=[];for(let $=R;$>=U;$-=Math.max(1,Math.ceil((R-U)/5)))u.push($);const N=2*(1+h),m=t>2+1e-9,k=Math.abs(t-2)<=1e-9,q=t>N+1e-9,ze=h<1?1/(1-h):1/0,ln=$=>{let le=0;for(let Ze=1;Ze<$.length;Ze++)$[Ze][1]*$[Ze-1][1]<0&&le++;return le},On=ln(y)>0,xt=ln(o)>0;let Xe="neutral",Ee="Momentum gegen Gradientenabstieg",qe;return h===0?(Ee="α = 0: kein Schwung",qe=`Mit α = 0 ist der Schwung abgeschaltet: ${O("algorithmus:gradientenabstieg-mit-heavy-ball")} fällt auf den gewöhnlichen Gradientenabstieg zurück, beide Wege sind derselbe, und die violette Kurve liegt genau auf der blauen. ${m?`Mit γ·L = ${Y(t)} über der gemeinsamen Grenze 2 laufen deshalb auch beide davon.`:"Schieben wir α nach oben, trennen sich die beiden Wege."}`):q?(Xe="fail",Ee="beide divergieren",qe=`γ·L = ${Y(t)} liegt über der Stabilitätsgrenze 2 des Gradientenabstiegs und über 2(1 + α) = ${Y(N)} für Heavy-Ball. In der steilen Richtung wächst der Fehler dann in jedem Schritt.`):m?(Xe="warn",Ee="nur Momentum bleibt stabil",qe=`Der gewöhnliche Gradientenabstieg divergiert hier, denn γ·L = ${Y(t)} liegt über 2. Momentum bleibt stabil, seine Grenze ist 2(1 + α) = ${Y(N)}: Der Schwung erlaubt also nicht nur glattere, sondern auch größere Schritte.`):k?(Xe="warn",Ee="der Gradientenabstieg steht an der Grenze",qe=`Genau an der Grenze γ·L = 2 springt der Gradientenabstieg in der steilen Richtung zwischen zwei Werten hin und her, ohne kleiner zu werden. Momentum bleibt darunter (Grenze 2(1 + α) = ${Y(N)}) und kommt voran.`):v!==null&&f!==null&&v<f?(Xe="ok",Ee="hier hilft der Schwung",qe=`Momentum braucht ${v} Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾), der reine Gradientenabstieg ${f}. ${On?`Zwei Wirkungen stecken darin: In der flachen Richtung zeigen die Gradienten immer in dieselbe Richtung und summieren sich auf das 1/(1 − α) = ${Y(ze,1)}-fache eines Einzelschritts auf; in der steilen Richtung wechselt schon der blaue Weg wegen γ·L > 1 das Vorzeichen, und die Mittelung dämpft dieses Hin und Her.`:`Der Gewinn kommt hier allein aus der flachen Richtung: Dort zeigen die Gradienten immer gleich, und ihre Beiträge summieren sich auf das 1/(1 − α) = ${Y(ze,1)}-fache eines Einzelschritts auf. ${xt?"Der blaue Weg pendelt bei dieser Schrittweite gar nicht; dass der violette quer zum Tal trotzdem hin und her schwingt, ist der Preis des Gedächtnisses und nicht seine Wirkung.":"Quer zum Tal pendelt hier keiner der beiden Wege."}`}`):v!==null&&f!==null&&v===f?(Ee="Gleichstand",qe=`Hier nimmt sich beides nichts: Beide Verfahren brauchen ${v} Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾). Bei κ = ${Y(p,0)} wären α ≈ ${Y(z)} und γ·L ≈ ${Y(A)} die beste Wahl.`):v!==null&&f!==null?(Xe="warn",Ee="hier schadet der Schwung",qe=`Hier schadet das Momentum: ${v} Schritte gegen ${f} ohne. Bei κ = ${Y(p,0)} ist α = ${Y(h)} zu viel des Guten, die Iterierten schießen über das Tal hinaus; rechnerisch optimal wären α ≈ ${Y(z)} und γ·L ≈ ${Y(A)}. Der Standardwert 0,9 stammt aus dem Deep Learning, wo die Konditionszahl um Größenordnungen höher liegt.`):v!==null?(Xe="ok",Ee="nur Momentum kommt an",qe=`Momentum erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) nach ${v} Schritten; der reine Gradientenabstieg schafft es in ${si} Schritten nicht. Rechnerisch optimal wären hier α ≈ ${Y(z)} und γ·L ≈ ${Y(A)}.`):(Xe="warn",Ee="keines der beiden kommt an",qe=`Keines der beiden Verfahren erreicht f ≤ 10⁻⁶·f(x⁽⁰⁾) innerhalb von ${si} Schritten. Bei κ = ${Y(p,0)} wären α ≈ ${Y(z)} und γ·L ≈ ${Y(A)} die beste Wahl.`),e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Vergleichen wir die drei Konditionen bei festem α = 0,9: Ab wann überholt Violett das Blau?"}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Modellproblem ist f(x) = ½(x₁² + c·x₂²) mit Start (5; 1); die Hesse-Matrix ist diag(1; c), die Konditionszahl also κ = c. Blau läuft der gewöhnliche Gradientenabstieg, violett derselbe Abstieg mit Momentum; die Schrittweite steht in Vielfachen von 1/L."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:xs.map($=>{const le=r===$.c&&Math.abs(t-$.rel)<1e-9&&Math.abs(h-$.alpha)<1e-9;return e.jsx("button",{type:"button","aria-pressed":le,className:le?Ke:$e,onClick:()=>{i($.c),a($.rel),l($.alpha)},children:$.name},$.name)})}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${An} ${$n}`,width:An,height:$n,role:"img","aria-label":`Höhenlinien der Quadrik mit κ = ${Y(p,0)}; blau der Weg ohne, violett der Weg mit Momentum.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s134-mom-clip",children:e.jsx("rect",{x:Ye/2,y:0,width:An-Ye,height:$n})})}),e.jsx("line",{x1:b(-L),y1:E(0),x2:b(L),y2:E(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:b(0),y1:E(-j),x2:b(0),y2:E(j),stroke:"#cbd5e1"}),e.jsxs("g",{clipPath:"url(#s134-mom-clip)",children:[C.map($=>e.jsx("ellipse",{cx:b(0),cy:E(0),rx:Math.sqrt(2*$)*V,ry:Math.sqrt(2*$/r)*_,fill:"none",stroke:"#94a3b8",strokeWidth:.9,strokeDasharray:"3 3"},$)),e.jsx("polyline",{points:W(y),fill:"none",stroke:Si,strokeWidth:1.5,opacity:.9}),e.jsx("polyline",{points:W(o),fill:"none",stroke:yi,strokeWidth:1.5,opacity:.9}),e.jsx("circle",{cx:b($i[0]),cy:E($i[1]),r:4,fill:"#334155"}),e.jsx("circle",{cx:b(0),cy:E(0),r:5,fill:"none",stroke:Ur,strokeWidth:2})]}),e.jsx("text",{x:An-6,y:E(0)-5,fontSize:10,textAnchor:"end",fill:"#64748b",children:"x₁"}),e.jsx("text",{x:b(0)+5,y:12,fontSize:10,fill:"#64748b",children:"x₂"})]}),e.jsxs("div",{className:"mt-1 flex flex-wrap gap-3",children:[e.jsx("span",{style:{color:Si},children:"● ohne Momentum"}),e.jsx("span",{style:{color:yi},children:"● mit Momentum"}),e.jsx("span",{style:{color:Ur},children:"◯ Minimum"})]})]}),e.jsxs("div",{className:"min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsxs("svg",{viewBox:`0 0 ${Mi} ${Di}`,width:Mi,height:Di,role:"img","aria-label":"Halblogarithmischer Verlauf des Funktionswerts über sechzig Schritte für beide Verfahren.",className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[u.map($=>e.jsxs("g",{children:[e.jsx("line",{x1:Ni,y1:ie($),x2:Mi-Xr,y2:ie($),stroke:"#e2e8f0"}),e.jsxs("text",{x:Ni-4,y:ie($)+3,fontSize:9,textAnchor:"end",fill:"#64748b",children:["10^",$]})]},`y${$}`)),[0,15,30,45,60].map($=>e.jsx("text",{x:Q($),y:Di-6,fontSize:9,textAnchor:"middle",fill:"#64748b",children:$},`x${$}`)),e.jsx("polyline",{points:he(X),fill:"none",stroke:Si,strokeWidth:1.6}),e.jsx("polyline",{points:he(S),fill:"none",stroke:yi,strokeWidth:1.6})]}),e.jsx("div",{className:"mt-1",children:"f(x⁽ᵏ⁾) über k, logarithmische Achse"})]})]}),e.jsxs("div",{className:"max-w-prose space-y-1",children:[e.jsx(se,{label:"c = κ",value:r,onChange:$=>i(Math.round($)),min:2,max:100,step:1,fmt:$=>String(Math.round($))}),e.jsx(se,{label:"γ·L",value:t,onChange:$=>a(Math.round($*20)/20),min:.1,max:3.6,step:.05,fmt:$=>Y($)}),e.jsx(se,{label:"α (Momentum)",value:h,onChange:$=>l(Math.round($*100)/100),min:0,max:.95,step:.01,fmt:$=>Y($)})]}),e.jsx("div",{className:"max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50",children:e.jsxs("p",{className:"font-mono text-xs",children:["κ = ",Y(p,0),", γ = ",Y(x,4),", α = ",Y(h)," | Schritte bis f ≤ 10⁻⁶·f(x⁽⁰⁾):"," ",e.jsxs("span",{style:{color:Si},children:["ohne ",f===null?`> ${si}`:f]}),","," ",e.jsxs("span",{style:{color:yi},children:["mit ",v===null?`> ${si}`:v]})]})}),e.jsx(Ne,{kind:Xe,titel:Ee,children:qe})]})}function Qr(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Krümmung statt nur Steigung"}),`
`,e.jsxs(i.p,{children:["Der Gradientenabstieg aus ",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," benutzt von ",e.jsx(n,{children:"\\cblue{f}"}),` nur die
Steigung: Er ersetzt die Funktion an der aktuellen Stelle durch ihre Tangentialebene
und geht bergab. Wie weit er gehen darf, lässt sich daraus nicht ablesen; daher die
Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma}"})," und der Zickzack in engen Tälern."]}),`
`,e.jsxs(i.p,{children:["Die nächstbessere Näherung liefert die ",e.jsx(d,{id:"taylor-theorem",children:"Taylorentwicklung"}),`
zweiter Ordnung. Für zweimal stetig differenzierbares `,e.jsx(n,{children:"f"}),` gilt sie mit einem
Restterm `,e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|^2)"})," (",e.jsx(d,{id:"env:taylorentwicklung-ii",href:"?k=10-differentialrechnung#env-taylorentwicklung-ii",children:"Satz 10.8.7"}),"), in ",e.jsx(d,{id:"env:gradient",children:"Gradient"}),` und
Hesse-Matrix ausgeschrieben:`]}),`
`,e.jsx(ne,{tag:"12.4.1",id:"eq-eq-12-4-1",children:`\\cblue{f(\\bx + \\bh)} \\approx \\corange{T_2(\\bh)} = \\cblue{f(\\bx)}
+ \\corange{\\nabla f(\\bx)}\\,\\bh
+ \\tfrac{1}{2}\\,\\bh^\\top \\corange{\\bH_f(\\bx)}\\,\\bh .`}),`
`,e.jsxs(i.p,{children:["Statt einer Geraden legen wir also eine Parabel an, im ",e.jsx(n,{children:"\\R^n"}),` eine
`,e.jsx(d,{id:"quadratic-form",children:"quadratische Form"}),` über dem aktuellen Punkt. Anders als eine
Gerade hat eine nach oben geöffnete Parabel einen tiefsten Punkt, und den können
wir ausrechnen.`]}),`
`,e.jsxs(i.p,{children:["Dazu leiten wir ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"})," nach dem Zuwachs ",e.jsx(n,{children:"\\bh"}),` ab. Der Gradient ist in unserer
Konvention eine Zeile (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`); der lineare
Term steuert `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}"}),` bei, und die quadratische Form hat nach
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"}),` den Gradienten
`,e.jsx(n,{children:"\\bh^\\top(\\corange{\\bH_f} + \\corange{\\bH_f^\\top})/2 = \\bh^\\top \\corange{\\bH_f}"}),`,
denn die `,e.jsx(d,{id:"hessian-matrix",children:"Hesse-Matrix"}),` ist nach dem Satz von Schwarz
(`,e.jsx(d,{id:"env:satz-von-schwarz",href:"?k=10-differentialrechnung#env-satz-von-schwarz",children:"Satz 10.7.4"}),") symmetrisch:"]}),`
`,e.jsx(F,{children:`\\corange{\\nabla_\\bh\\, T_2(\\bh)} = \\corange{\\nabla f(\\bx)} + \\bh^\\top \\corange{\\bH_f(\\bx)}
\\overset{!}{=} \\bnull^\\top .`}),`
`,e.jsxs(i.p,{children:["Beide Seiten sind Zeilenvektoren; Auflösen nach ",e.jsx(n,{children:"\\bh^\\top"}),` und Transponieren liefert
den gesuchten Schritt. In Spalten gerechnet, als
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)^\\top} + \\corange{\\bH_f(\\bx)}\\bh = \\bnull"}),`, kommt derselbe
Schritt heraus, nur mischen dürfen wir die beiden Konventionen nicht.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.4.1 (Newton-Verfahren für die Optimierung)",id:"env-newton-verfahren-fuer-die-optimierung",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` zweimal stetig differenzierbar und ein
Startpunkt `,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," wiederhole:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Berechne ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(k)})}"})," und ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Setze"}),`
`,e.jsx(ne,{tag:"12.4.2",id:"eq-newton-verfahren-fuer-die-optimierung",children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
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
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.2 (Was der Schritt voraussetzt und wie wir ihn rechnen)",id:"env-was-der-schritt-voraussetzt-und-wie-wir",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Hesse-Matrix muss invertierbar sein."}),` Sonst hat die quadratische Näherung
keinen kritischen Punkt oder einen ganzen affinen Unterraum davon, und
`,e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),` ist nicht definiert. Konvexität sichert das
nicht: Sie liefert nur positive `,e.jsx(i.em,{children:"Semi"}),"definitheit (",e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.4",children:"Abschnitt 11.4"}),`),
und selbst `,e.jsx(d,{id:"env:strikte-konvexitaet",children:"strikte Konvexität"})," reicht nicht, wie ",e.jsx(n,{children:"f(x) = x^4"}),` im Nullpunkt zeigt.
Invertierbarkeit, bei konvexem `,e.jsx(n,{children:"f"})," also eine ",e.jsx(d,{id:"positive-definite",children:"positiv definite"}),`
Hesse-Matrix, ist eine eigene Annahme.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Inverse ist eine Schreibweise, keine Rechenanweisung."}),` Gerechnet wird nicht
`,e.jsx(n,{children:"\\corange{\\bH_f^{-1}}"}),", sondern das ",e.jsx(d,{id:"linear-system",children:"lineare Gleichungssystem"})]}),e.jsx(F,{children:`\\corange{\\bH_f(\\bx^{(k)})}\\,\\corange{\\bd^{(k)}} = -\\corange{\\nabla f(\\bx^{(k)})^\\top} ,
\\qquad
\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} + \\corange{\\bd^{(k)}} .`}),e.jsxs(i.p,{children:["Das ist billiger und stabiler (",e.jsx(i.a,{href:"?k=05-lgs#env-fuer-ein-lgs-keine-explizite-inverse",children:"Bemerkung 5.2.1"}),`). Ist
`,e.jsx(n,{children:"\\corange{\\bH_f}"}),` positiv definit, so ist die
`,e.jsx(d,{id:"cholesky-factorization",children:"Cholesky-Zerlegung"}),` aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),` das Standardverfahren, und ob sie gelingt, ist zugleich
die Probe auf Definitheit. Kurz:
`,e.jsx(i.em,{children:"Invertiere niemals eine Matrix."})]})]}),`
`,e.jsx(i.h3,{children:"Newton-Raphson und Newton-Optimierung sind dasselbe Verfahren"}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.3 (Eine Vorschrift, zwei Spalten)",id:"env-eine-vorschrift-zwei-spalten",children:[e.jsx(i.p,{children:"Newton-Raphson für Nullstellen und das Newton-Verfahren für Minima, nebeneinander:"}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{}),e.jsx(i.th,{children:"Nullstellensuche"}),e.jsx(i.th,{children:"Optimierung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Aufgabe"}),e.jsxs(i.td,{children:["löse ",e.jsx(n,{children:"\\cblue{f(x)} = 0"})]}),e.jsxs(i.td,{children:["löse ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schritt"}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\dfrac{\\cblue{f(x^{(k)})}}{\\corange{f'(x^{(k)})}}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top}"})})]})]})]}),e.jsxs(i.p,{children:["Setzen wir ",e.jsx(n,{children:"\\corange{\\bg(\\bx)} := \\corange{\\nabla f(\\bx)^\\top}"}),`, so ist die
Optimierung die Nullstellensuche für `,e.jsx(n,{children:"\\corange{\\bg}\\colon \\R^n \\to \\R^n"}),`. Deren
`,e.jsx(d,{id:"env:jacobimatrix",children:"Jacobimatrix"})," ist nach ",e.jsx(d,{id:"env:hesse-matrix",href:"?k=10-differentialrechnung#env-hesse-matrix",children:"Definition 10.7.3"}),` die Hesse-Matrix,
`,e.jsx(n,{children:"\\bJ_{\\corange{\\bg}} = \\corange{\\bH_f}"}),`, und der mehrdimensionale
Newton-Raphson-Schritt
`,e.jsx(n,{children:"\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\bJ_{\\corange{\\bg}}^{-1}\\corange{\\bg}"}),`
aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` ist wörtlich
`,e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),`. Alles, was wir über Newton-Raphson
wissen, gilt deshalb weiter: Unter ausreichender Glattheit, etwa einer lokal
Lipschitz-stetigen Hesse-Matrix, konvergiert das Verfahren nahe einer Lösung mit
invertierbarer Hesse-Matrix quadratisch. Es bleiben die Empfindlichkeit gegen
schlechte Startpunkte und das Problem einer (fast) singulären Hesse-Matrix, das
Gegenstück zur verschwindenden Ableitung im Nenner.`]})]}),`
`,e.jsx(i.h3,{children:"Newton Schritt für Schritt"}),`
`,e.jsx(pe,{title:"Newton an einer nicht-quadratischen Funktion: Zahlenbeispiel",children:e.jsxs(D,{kind:"Beispiel",label:"12.4.4 (Newton auf einer nicht-quadratischen Funktion)",id:"env-newton-auf-einer-nicht-quadratischen",children:[e.jsx(i.p,{children:"Wir minimieren"}),e.jsx(F,{children:"\\cblue{f(x)} = x - 2\\ln x , \\qquad x > 0 ,"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\corange{f'(x)} = 1 - 2/x"})," und ",e.jsx(n,{children:"\\corange{f''(x)} = 2/x^2 > 0"}),`. Die Funktion ist
also strikt konvex, und `,e.jsx(n,{children:"\\corange{f'(x)} = 0"}),` hat die einzige Lösung
`,e.jsx(n,{children:"\\cgreen{x^\\star} = 2"})," (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`). Bis auf eine additive Konstante ist
`,e.jsx(n,{children:"\\cblue{f}"})," die negative Log-Dichte einer Gammaverteilung mit Formparameter ",e.jsx(n,{children:"3"}),` und
Rate `,e.jsx(n,{children:"1"}),", und ",e.jsx(n,{children:"2"})," ist deren Modus."]}),e.jsxs(i.p,{children:["Der Newton-Schritt ",e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"})," wird in einer Dimension zu"]}),e.jsx(F,{children:`\\cblue{x^{(k+1)}} = \\cblue{x^{(k)}} - \\frac{\\corange{f'(x^{(k)})}}{\\corange{f''(x^{(k)})}}
= \\cblue{x^{(k)}} - \\frac{1 - 2/\\cblue{x^{(k)}}}{2/(\\cblue{x^{(k)}})^2}
= \\frac{\\cblue{x^{(k)}}\\bigl(4 - \\cblue{x^{(k)}}\\bigr)}{2} .`}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 1"})," aus laufen die Iterierten so:"]}),e.jsx(F,{children:`\\begin{array}{c|l|l|l}
k & \\cblue{x^{(k)}} & e_k := \\left|\\cblue{x^{(k)}} - \\cgreen{x^\\star}\\right| & e_k / e_{k-1}^2 \\\\ \\hline
0 & 1{,}0000000000 & 1{,}00 \\cdot 10^{0} & \\text{-} \\\\
1 & 1{,}5000000000 & 5{,}00 \\cdot 10^{-1} & 0{,}500 \\\\
2 & 1{,}8750000000 & 1{,}25 \\cdot 10^{-1} & 0{,}500 \\\\
3 & 1{,}9921875000 & 7{,}81 \\cdot 10^{-3} & 0{,}500 \\\\
4 & 1{,}9999694824 & 3{,}05 \\cdot 10^{-5} & 0{,}500 \\\\
5 & 1{,}9999999995 & 4{,}66 \\cdot 10^{-10} & 0{,}500
\\end{array}`}),e.jsxs(i.p,{children:["Die letzte Spalte ist exakt ",e.jsx(n,{children:"1/2"}),", denn aus der Schrittformel folgt"]}),e.jsx(F,{children:`\\cblue{x^{(k+1)}} - \\cgreen{2}
= \\frac{4\\cblue{x^{(k)}} - (\\cblue{x^{(k)}})^2 - 4}{2}
= -\\frac{\\bigl(\\cblue{x^{(k)}} - \\cgreen{2}\\bigr)^2}{2} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"e_{k+1} = e_k^2/2"})," in jedem einzelnen Schritt. Der Faktor ",e.jsx(n,{children:"1/2"}),` ist
das Gegenstück zu der Konstanten aus `,e.jsx(i.a,{href:"#env-quadratische-konvergenz",children:"Bemerkung 12.1.13"}),`: Weil
wir Newton-Raphson auf `,e.jsx(n,{children:"\\corange{f'}"}),` anwenden, steigt jede Ableitung um eine
Ordnung, und aus `,e.jsx(n,{children:"\\left|f''\\right| / (2\\left|f'\\right|)"}),` wird
`,e.jsx(n,{children:`\\left|f'''(\\cgreen{x^\\star})\\right| / \\bigl(2 \\corange{f''(\\cgreen{x^\\star})}\\bigr)
= 0{,}5 / (2 \\cdot 0{,}5) = 0{,}5`}),"."]}),e.jsxs(i.p,{children:["Die Aussage gilt nur lokal. Für ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),` liefert die
Schrittformel `,e.jsx(n,{children:"\\cred{0}"}),", für ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4{,}5"})," sogar ",e.jsx(n,{children:"\\cred{-1{,}125}"}),`.
Beide Male landet der erste Schritt außerhalb von `,e.jsx(n,{children:"(0, \\infty)"}),", wo ",e.jsx(n,{children:"\\cblue{f}"}),`
nicht erklärt ist.`]})]})}),`
`,e.jsxs(Me,{title:"Die Parabel am Startpunkt",children:[e.jsxs(i.p,{children:["Orange liegt das quadratische Modell ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"}),` am aktuellen Punkt, sein
Scheitel ist die nächste Iterierte, und die blauen Punkte zeigen den Verlauf der
Iteration. Voreingestellt ist die strikt `,e.jsx(d,{id:"env:konvexe-funktion",children:"konvexe Funktion"}),`
`,e.jsx(n,{children:"\\cblue{f(x)} = x - 2\\ln x"})," auf ",e.jsx(n,{children:"x > 0"})," mit Minimum bei ",e.jsx(n,{children:"2"}),`, gestartet bei
`,e.jsx(n,{children:"\\cblue{x^{(0)}} = 1"}),` (Zahlentabelle in
`,e.jsx(i.a,{href:"#env-newton-auf-einer-nicht-quadratischen",children:"Beispiel 12.4.4"}),`); der zweite Menüpunkt ist die
nicht-konvexe Funktion aus `,e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),"."]}),e.jsx(Re,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Wo landet Newton auf der nicht-konvexen Funktion, wenn wir bei ",e.jsx(n,{children:"x^{(0)} = 0{,}5"})," starten?"]}),optionen:[{id:"min-lokal",text:"im lokalen Minimum bei −1"},{id:"max",text:"im lokalen Maximum bei 0"},{id:"min-global",text:"im globalen Minimum bei 2"}],loesung:"max",verdeckt:e.jsxs(e.Fragment,{children:["Der zweite Menüpunkt und der Startpunktregler zeigen es in einem einzigen Schritt: ",e.jsx(n,{children:"0{,}5"})," landet exakt auf dem lokalen Maximum bei ",e.jsx(n,{children:"0"}),", denn dort ist ",e.jsx(n,{children:"f'' = -2{,}25"}),", die Modellparabel öffnet nach unten, und ihr Scheitel ist ein Hochpunkt."]}),children:e.jsx(ls,{})}),e.jsxs(i.p,{children:["Auf der konvexen Funktion verlässt der erste Schritt ab ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),` den
Definitionsbereich. Auf der nicht-konvexen führt `,e.jsx(n,{children:"-2"})," in das ",e.jsx(i.em,{children:"lokale"}),` Minimum bei
`,e.jsx(n,{children:"-1"})," und ",e.jsx(n,{children:"2{,}5"})," in das globale bei ",e.jsx(n,{children:"2"}),". Bei ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 1{,}2"}),` ist
`,e.jsx(n,{children:"\\corange{f''} = -0{,}08"}),` fast null: Der erste Schritt springt nach
`,e.jsx(n,{children:"\\cred{-25{,}2}"}),", und ",e.jsx(n,{children:"14"})," Schritte später steht die Iteration im ",e.jsx(i.em,{children:"lokalen"}),`
Minimum bei `,e.jsx(n,{children:"-1"}),", obwohl der Startpunkt näher am globalen lag."]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.5 (Newton bei nicht-konvexen Funktionen)",id:"env-newton-bei-nicht-konvexen-funktionen",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),` sucht Nullstellen des Gradienten, nicht
Minima. Bei konvexem `,e.jsx(n,{children:"f"})," fällt beides zusammen (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),"), sonst nicht."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ein lokales statt des globalen Minimums."}),` Die nicht-konvexe Funktion im Widget,
`,e.jsx(n,{children:"\\cblue{f(x)} = x^4/4 - x^3/3 - x^2 + 2"}),", hat die kritischen Punkte ",e.jsx(n,{children:"-1"}),", ",e.jsx(n,{children:"0"}),` und
`,e.jsx(n,{children:"2"}),": bei ",e.jsx(n,{children:"-1"})," ein ",e.jsx(d,{id:"env:lokales-und-globales-minimum",children:"lokales Minimum"})," mit ",e.jsx(n,{children:"\\cblue{f(-1)} \\approx 1{,}583"}),", bei ",e.jsx(n,{children:"2"}),`
das globale mit `,e.jsx(n,{children:"\\cblue{f(2)} \\approx -0{,}667"}),`. Welches der beiden Täler die
Iteration findet, entscheidet allein der Startpunkt. Das gilt für alle Verfahren
dieses Kapitels, denn sie benutzen nur lokale Information.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Ein ",e.jsx(d,{id:"env:sattelpunkt",children:"Sattelpunkt"})," oder ein Maximum."]})," Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),` indefinit, so
ist der Scheitel der Näherung ein Sattel, ist sie negativ definit, ein Maximum, und
der Schritt läuft genauso dorthin wie sonst ins Minimum (`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),`). Im
Widget zeigt das der Startpunkt `,e.jsx(n,{children:"\\cred{0{,}5}"}),"."]}),e.jsxs(i.p,{children:[`Praktische Fassungen erzwingen deshalb einen Abstiegsschritt: Sie addieren
`,e.jsx(n,{children:"\\mu\\bI"}),", bis ",e.jsx(n,{children:"\\corange{\\bH_f} + \\mu\\bI"}),` positiv definit ist, begrenzen die
Schrittlänge (Trust-Region) oder dämpfen mit einer Liniensuche
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`). Das hilft gegen Schritte zu Sattelpunkten oder Maxima,
ein globales Minimum garantiert es bei nicht-konvexem `,e.jsx(n,{children:"f"})," aber nicht."]})]}),`
`,e.jsx(i.h3,{children:"Newton gegen Gradientenabstieg"}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.4.6 (Newton und Gradientenabstieg an einer Parabel)",id:"env-ein-zug-statt-vieler",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"\\cblue{f(x)} = x^2"})," mit ",e.jsx(n,{children:"\\corange{f'(x)} = 2x"}),`,
`,e.jsx(n,{children:"\\corange{f''(x)} = 2"})," und Startwert ",e.jsx(n,{children:"\\cblue{x^{(0)}} = 4"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Gradientenabstieg"})," mit ",e.jsx(n,{children:"\\corange{\\gamma} = 0{,}4"}),":"]}),e.jsx(F,{children:`\\begin{aligned}
\\cblue{x^{(1)}} &= 4 - 0{,}4 \\cdot 8 = 0{,}8 , \\\\
\\cblue{x^{(2)}} &= 0{,}8 - 0{,}4 \\cdot 1{,}6 = 0{,}16 , \\\\
\\cblue{x^{(3)}} &= 0{,}16 - 0{,}4 \\cdot 0{,}32 = 0{,}032 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Jeder Schritt multipliziert die Iterierte mit ",e.jsx(n,{children:"1 - 2\\corange{\\gamma} = 0{,}2"}),`. Das
ist lineare Konvergenz: Die Zahl der richtigen Stellen wächst um einen festen
Betrag pro Schritt, erreicht wird die Null nie.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Newton"}),":"]}),e.jsx(F,{children:"\\cblue{x^{(1)}} = 4 - \\frac{8}{2} = \\cgreen{0} ."}),e.jsxs(i.p,{children:[`Ein Schritt, und wir stehen exakt im Minimum. Für eine quadratische Funktion ist
die Näherung `,e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"})," exakt (",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),"), ihr Scheitel ",e.jsx(i.em,{children:"ist"}),`
der kritische Punkt der Funktion selbst. Bei positiv definiter Hesse-Matrix ist das
das Minimum, und Newton trifft es von jedem Startpunkt aus in einem Schritt; sonst
trifft derselbe Schritt den Sattel oder das Maximum
(`,e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),")."]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.7 (Kondition und Kosten des Newton-Schritts)",id:"env-warum-newton-die-kondition-nicht-spuert",children:[e.jsxs(i.p,{children:[`Die Schrittzahl des Gradientenabstiegs hängt an der
`,e.jsx(d,{id:"condition-number",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa(\\corange{\\bH_f})"}),`
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`), die des Newton-Verfahrens nicht. Newton benutzt die Krümmung, statt sie zu schätzen: Sein Schritt ist gegen
lineare Koordinatenwechsel unempfindlich, und schlechte Kondition ist ein ungünstig
gewähltes Koordinatensystem.`]}),e.jsxs(i.p,{children:[`Die Kosten liegen an anderer Stelle. Ein Newton-Schritt braucht die
`,e.jsx(n,{children:"n(n+1)/2"})," zweiten Ableitungen, ihren Speicher der Größenordnung ",e.jsx(n,{children:"n^2"}),` und eine
Zerlegung der Größenordnung `,e.jsx(n,{children:"n^3"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`). Für
`,e.jsx(n,{children:"n = 10\\,000"}),` Parameter, in der Statistik keine ungewöhnliche Zahl, sind das
`,e.jsx(n,{children:"10^8"})," Einträge allein für die Matrix."]})]}),`
`,e.jsxs(pe,{title:"Warum Newton die Kondition nicht spürt: affine Invarianz",children:[e.jsxs(i.p,{children:[`Unabhängig von der Kondition ist die Zahl der Newton-Schritte, nicht die Rechnung
darin: Numerisch bleibt die Kondition spürbar, denn das lineare System aus
`,e.jsx(i.a,{href:"#env-was-der-schritt-voraussetzt-und-wie-wir",children:"Bemerkung 12.4.2"}),` wird mit
`,e.jsx(n,{children:"\\kappa(\\corange{\\bH_f})"}),` schlechter konditioniert, und der gelöste Schritt trägt
diesen Fehler weiter (`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),e.jsxs(i.p,{children:["Dass die Schrittzahl nicht an ",e.jsx(n,{children:"\\kappa"}),` hängt, liegt an der affinen Invarianz.
Rechnen wir in neuen Koordinaten `,e.jsx(n,{children:"\\bx = \\bA\\by"})," mit invertierbarem ",e.jsx(n,{children:"\\bA"}),`, so wird
aus dem Gradienten `,e.jsx(n,{children:"\\corange{\\nabla f}\\bA"}),` und aus der Hesse-Matrix
`,e.jsx(n,{children:"\\bA^\\top \\corange{\\bH_f} \\bA"}),". Im Newton-Schritt heben sich die Faktoren weg,"]}),e.jsx(F,{children:`-\\bigl(\\bA^\\top \\corange{\\bH_f} \\bA\\bigr)^{-1}\\bigl(\\corange{\\nabla f}\\bA\\bigr)^\\top
= -\\bA^{-1}\\corange{\\bH_f^{-1}}\\,\\corange{\\nabla f^\\top} ,`}),e.jsxs(i.p,{children:[`und übrig bleibt das Bild des alten Schrittes. Beim Gradientenschritt
`,e.jsx(n,{children:`-\\gamma\\bigl(\\corange{\\nabla f}\\bA\\bigr)^\\top
= -\\gamma\\,\\bA^\\top\\corange{\\nabla f^\\top}`})," bleibt der Faktor ",e.jsx(n,{children:"\\bA^\\top"}),` dagegen
stehen, und er trägt die Kondition.`]})]}),`
`,e.jsx(i.h3,{children:"Quasi-Newton: die Krümmung schätzen statt rechnen"}),`
`,e.jsx(i.p,{children:`Newton ist schnell und teuer, der Gradientenabstieg billig und langsam; die
Quasi-Newton-Verfahren liegen dazwischen. Sie gewinnen die Krümmungsinformation aus
den Gradienten, die ohnehin anfallen.`}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.4.8 (Quasi-Newton-Schritt)",id:"env-quasi-newton-schritt",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` stetig differenzierbar, ein Startpunkt
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"})," und eine Startmatrix ",e.jsx(n,{children:"\\corange{\\bB_0}"}),`, meist
`,e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"})," setze"]}),e.jsx(ne,{tag:"12.4.3",id:"eq-quasi-newton-schritt",children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}}
- \\corange{\\gamma_k}\\,\\corange{\\bB_k}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\corange{\\bB_k} \\approx \\corange{\\bH_f(\\bx^{(k)})^{-1}}"}),` aus den bisherigen
Schritten geschätzt wird und die Schrittweite `,e.jsx(n,{children:"\\corange{\\gamma_k}"}),` aus einer
Liniensuche stammt (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]})]}),`
`,e.jsxs(i.p,{children:["Die Schrittweite ",e.jsx(n,{children:"\\corange{\\gamma_k}"}),` ist nötig: Ohne sie ist der erste Schritt aus
`,e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),` ein ungebremster Gradientenschritt, der den Funktionswert
erhöhen kann; das Widget unten zeigt es.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-quasi-newton-schritt",children:"(12.4.3)"}),` ersetzt die exakte inverse Hesse-Matrix aus
`,e.jsx(i.a,{href:"#eq-newton-verfahren-fuer-die-optimierung",children:"(12.4.2)"}),` durch eine Näherung, die schon da ist;
statt `,e.jsx(d,{id:"big-o-notation",children:e.jsx(n,{children:"O(n^3)"})}),` kostet die Richtung dann nur eine
Matrix-Vektor-Multiplikation. Die Verfahren der Familie unterscheiden sich darin,
wie sie `,e.jsx(n,{children:"\\corange{\\bB_k}"}),` bauen, häufig als Diagonalmatrix oder als Einheitsmatrix
plus eine Korrektur kleinen Ranges, weil sich beides billig speichern und anwenden
lässt.`]}),`
`,e.jsxs(i.p,{children:["Woher kommt ",e.jsx(n,{children:"\\corange{\\bB_k}"}),`? In einer Dimension ist die zweite Ableitung die
Ableitung der ersten, und die schätzen wir durch einen Differenzenquotienten aus
zwei benachbarten Werten:`]}),`
`,e.jsx(F,{children:`\\corange{f''(x)} \\approx
\\frac{\\corange{f'(x^{(k+1)})} - \\corange{f'(x^{(k)})}}{\\cblue{x^{(k+1)}} - \\cblue{x^{(k)}}} .`}),`
`,e.jsxs(i.p,{children:["Im ",e.jsx(n,{children:"\\R^n"})," verlangen wir mit den Abkürzungen"]}),`
`,e.jsx(F,{children:`\\cblue{\\bs_k} := \\cblue{\\bx^{(k+1)}} - \\cblue{\\bx^{(k)}} ,
\\qquad
\\corange{\\by_k} := \\bigl(\\corange{\\nabla f(\\bx^{(k+1)})} - \\corange{\\nabla f(\\bx^{(k)})}\\bigr)^\\top`}),`
`,e.jsxs(i.p,{children:["von der Näherung der ",e.jsx(i.em,{children:"inversen"})," Hesse-Matrix die"]}),`
`,e.jsx(ne,{tag:"12.4.4",id:"eq-eq-12-4-4",children:`\\text{Sekantenbedingung:} \\qquad
\\corange{\\bB_{k+1}}\\,\\corange{\\by_k} = \\cblue{\\bs_k} .`}),`
`,e.jsxs(i.p,{children:[`In einer Dimension ist das der Kehrwert des Differenzenquotienten von eben,
`,e.jsx(n,{children:"b = s/y"})," statt ",e.jsx(n,{children:"f'' \\approx y/s"}),` (beide heißen „Sekantenbedingung"), denn
`,e.jsx(n,{children:"\\corange{\\bB_k}"}),` nähert die Inverse der Hesse-Matrix, nicht die Hesse-Matrix
selbst. Im `,e.jsx(n,{children:"\\R^n"})," legen die ",e.jsx(n,{children:"n"})," Gleichungen von ",e.jsx(i.a,{href:"#eq-eq-12-4-4",children:"(12.4.4)"})," die ",e.jsx(n,{children:"n(n+1)/2"}),`
Einträge einer symmetrischen Matrix bei Weitem nicht fest; die verbleibende Freiheit
nutzen wir, um `,e.jsx(n,{children:"\\corange{\\bB_{k+1}}"})," möglichst wenig von ",e.jsx(n,{children:"\\corange{\\bB_k}"}),`
abweichen zu lassen. Die bekannteste Wahl ist diese:`]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.4.9 (BFGS-Update)",id:"env-bfgs-update",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\corange{\\bB_k} \\in \\R^{n \\times n}"}),` symmetrisch und gelte
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} \\neq 0"}),`. Mit
`,e.jsx(n,{children:"\\rho_k := 1 / \\bigl(\\corange{\\by_k}^\\top \\cblue{\\bs_k}\\bigr)"})," heißt"]}),e.jsx(ne,{tag:"12.4.5",id:"eq-bfgs-update",children:`\\corange{\\bB_{k+1}} = \\bigl(\\bI - \\rho_k\\, \\cblue{\\bs_k}\\corange{\\by_k}^\\top\\bigr)
\\corange{\\bB_k}
\\bigl(\\bI - \\rho_k\\, \\corange{\\by_k}\\cblue{\\bs_k}^\\top\\bigr)
+ \\rho_k\\, \\cblue{\\bs_k}\\cblue{\\bs_k}^\\top`}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"BFGS-Update"}),", benannt nach Broyden, Fletcher, Goldfarb und Shanno."]})]}),`
`,e.jsxs(i.p,{children:["Den Nenner von ",e.jsx(n,{children:"\\rho_k"}),` können wir deuten. Auf einer Quadrik mit
Hesse-Matrix `,e.jsx(n,{children:"\\corange{\\bH}"})," ist ",e.jsx(n,{children:"\\corange{\\by_k} = \\corange{\\bH}\\cblue{\\bs_k}"}),", also"]}),`
`,e.jsx(F,{children:`\\frac{\\corange{\\by_k}^\\top \\cblue{\\bs_k}}{\\cblue{\\bs_k}^\\top \\cblue{\\bs_k}}
= \\frac{\\cblue{\\bs_k}^\\top \\corange{\\bH}\\, \\cblue{\\bs_k}}{\\cblue{\\bs_k}^\\top \\cblue{\\bs_k}} ,`}),`
`,e.jsxs(i.p,{children:["und das ist die Krümmung in Richtung ",e.jsx(n,{children:"\\cblue{\\bs_k}"}),`. Die Krümmungsbedingung
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} > 0"})," aus ",e.jsx(i.a,{href:"#env-eigenschaften-kosten-und-l-bfgs",children:"Bemerkung 12.4.11"}),` sagt damit:
Entlang des gerade gegangenen Schrittes ist `,e.jsx(n,{children:"\\cblue{f}"})," nach oben gekrümmt."]}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),` sind beide Klammern Einheitsmatrizen plus eine Rang-1-Störung,
der letzte Summand hat ebenfalls Rang 1. Ausmultipliziert steht dort
`,e.jsx(n,{children:"\\corange{\\bB_k}"})," plus eine Korrektur, die von ",e.jsx(n,{children:"\\cblue{\\bs_k}"}),` und
`,e.jsx(n,{children:"\\corange{\\bB_k\\by_k}"})," aufgespannt wird und deshalb höchstens Rang 2 hat."]}),`
`,e.jsx(D,{kind:"Satz",label:"12.4.10 (Das BFGS-Update erfüllt die Sekantenbedingung)",id:"env-das-bfgs-update-erfuellt-die",children:e.jsxs(i.p,{children:["Unter den Voraussetzungen von ",e.jsx(d,{id:"env:bfgs-update",href:"#env-bfgs-update",children:"Definition 12.4.9"}),` gilt
`,e.jsx(n,{children:"\\corange{\\bB_{k+1}}\\corange{\\by_k} = \\cblue{\\bs_k}"}),"."]})}),`
`,e.jsx(pe,{title:"Beweis: Die BFGS-Aktualisierung erfüllt die Sekantenbedingung",children:e.jsxs(sn,{children:[e.jsxs(re,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cblue{\\bs}^\\top\\corange{\\by}"})," ist eine Zahl und darf vor den Vektor gezogen werden; nach Definition von ",e.jsx(n,{children:"\\rho"})," ist ",e.jsx(n,{children:"\\rho\\,(\\cblue{\\bs}^\\top\\corange{\\by}) = 1"})]}),children:[e.jsxs(i.p,{children:["Wir lassen die Indizes weg und multiplizieren ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),` von rechts mit
`,e.jsx(n,{children:"\\corange{\\by}"}),". Die rechte Klammer trifft dabei zuerst auf ",e.jsx(n,{children:"\\corange{\\by}"}),":"]}),e.jsx(F,{children:`\\bigl(\\bI - \\rho\\, \\corange{\\by}\\cblue{\\bs}^\\top\\bigr)\\corange{\\by}
= \\corange{\\by} - \\rho\\, \\corange{\\by}\\,\\bigl(\\cblue{\\bs}^\\top\\corange{\\by}\\bigr)
= \\corange{\\by} - \\corange{\\by} = \\bnull .`})]}),e.jsxs(re,{why:e.jsx(e.Fragment,{children:"Matrixmultiplikation ist assoziativ, wir dürfen also von rechts nach links auswerten"}),children:[e.jsxs(i.p,{children:["Damit verschwindet der ganze erste Summand von ",e.jsx(i.a,{href:"#eq-bfgs-update",children:"(12.4.5)"}),`, denn er hat diese Klammer
als rechten Faktor:`]}),e.jsx(F,{children:`\\bigl(\\bI - \\rho\\, \\cblue{\\bs}\\corange{\\by}^\\top\\bigr)\\corange{\\bB}
\\underbrace{\\bigl(\\bI - \\rho\\, \\corange{\\by}\\cblue{\\bs}^\\top\\bigr)\\corange{\\by}}_{= \\,\\bnull}
= \\bnull .`})]}),e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["wieder dieselbe Zahl ",e.jsx(n,{children:"\\rho\\,(\\cblue{\\bs}^\\top\\corange{\\by}) = 1"}),"; die Sekantenbedingung ",e.jsx(i.a,{href:"#eq-eq-12-4-4",children:"(12.4.4)"})," ist also nicht näherungsweise, sondern exakt erfüllt"]}),children:[e.jsx(i.p,{children:"Übrig bleibt der zweite Summand, und der liefert genau den gesuchten Vektor:"}),e.jsx(F,{children:`\\rho\\, \\cblue{\\bs}\\cblue{\\bs}^\\top\\corange{\\by}
= \\cblue{\\bs}\\,\\bigl(\\rho\\, \\cblue{\\bs}^\\top\\corange{\\by}\\bigr)
= \\cblue{\\bs} .`})]})]})}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.11 (Eigenschaften, Kosten und L-BFGS)",id:"env-eigenschaften-kosten-und-l-bfgs",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Symmetrie und Definitheit bleiben erhalten."})," Mit ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` ist auch
`,e.jsx(n,{children:"\\corange{\\bB_{k+1}}"})," symmetrisch, und unter der ",e.jsx(i.em,{children:"Krümmungsbedingung"}),`
`,e.jsx(n,{children:"\\corange{\\by_k}^\\top \\cblue{\\bs_k} > 0"}),` bleibt auch positive Definitheit erhalten.
Dann ist `,e.jsx(n,{children:"\\corange{\\nabla f}\\,\\corange{\\bB_k}\\corange{\\nabla f^\\top} > 0"}),`, und
`,e.jsx(n,{children:"-\\corange{\\bB_k}\\corange{\\nabla f(\\bx^{(k)})^\\top}"}),` zeigt bergab, solange der
Gradient nicht verschwindet. Erzwingen lässt sich die Krümmungsbedingung durch eine
Liniensuche, die neben dem Abstiegskriterium aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),` auch die
Steigung im neuen Punkt prüft.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kosten."}),` Ein Schritt besteht aus einer Matrix-Vektor-Multiplikation und zwei
Rang-1-Korrekturen, zusammen `,e.jsx(n,{children:"O(n^2)"})," statt ",e.jsx(n,{children:"O(n^3)"}),` bei Newton. Eine Zerlegung
fällt nie an, und zweite Ableitungen braucht das Verfahren nicht.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvergenz."})," Zwischen linear und quadratisch liegt ",e.jsx(i.em,{children:"superlinear"}),`: Der Quotient
`,e.jsx(n,{children:"e_{k+1}/e_k"})," geht gegen null, ohne dass ",e.jsx(n,{children:"e_{k+1}/e_k^2"}),` beschränkt bleiben müsste
(`,e.jsx(d,{id:"rate-of-convergence",children:"Konvergenzordnung"}),`). In der Praxis ist BFGS deutlich
schneller als der Gradientenabstieg und kaum langsamer als Newton.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"L-BFGS."})," Für großes ",e.jsx(n,{children:"n"})," ist schon das Speichern von ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` zu teuer. Die
Variante mit beschränktem Speicher (`,e.jsx(i.em,{children:"limited memory"}),`) speichert keine Matrix, sondern
nur die letzten `,e.jsx(n,{children:"m"})," Paare ",e.jsx(n,{children:"(\\cblue{\\bs_j}, \\corange{\\by_j})"}),", meist ",e.jsx(n,{children:"m"})," zwischen ",e.jsx(n,{children:"5"}),`
und `,e.jsx(n,{children:"20"}),`, und setzt daraus bei Bedarf das Produkt
`,e.jsx(n,{children:"\\corange{\\bB_k}\\corange{\\nabla f^\\top}"}),` zusammen. Der Speicher fällt damit von
`,e.jsx(n,{children:"O(n^2)"})," auf ",e.jsx(n,{children:"O(mn)"}),", bei ",e.jsx(n,{children:"n = 10\\,000"})," und ",e.jsx(n,{children:"m = 10"})," von ",e.jsx(n,{children:"10^8"}),` Zahlen auf einige
Hunderttausend.`]})]}),`
`,e.jsxs(Me,{title:"BFGS Schritt für Schritt",children:[e.jsxs(i.p,{children:[`Minimiert wird die Quadrik
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = 0{,}5\\,x_1^2 + 2{,}5\\,x_2^2"}),` mit der Hesse-Matrix
`,e.jsx(n,{children:"\\diag(1; 5)"}),", gestartet wird bei ",e.jsx(n,{children:"(5; 1)"})," mit ",e.jsx(n,{children:"\\corange{\\bB_0} = \\bI"}),`; der erste
Schritt ist also ein reiner Gradientenschritt. Die letzte Zeile des Ablesefelds
prüft in jedem Schritt die Sekantenbedingung nach.`]}),e.jsx(cs,{}),e.jsxs(i.p,{children:["Das Residuum ",e.jsx(n,{children:"\\left\\|\\corange{\\bB_k\\by} - \\cblue{\\bs}\\right\\|"}),` bleibt in jedem
Schritt auf Rundungsfehlerniveau, wie `,e.jsx(d,{id:"env:das-bfgs-update-erfuellt-die",href:"#env-das-bfgs-update-erfuellt-die",children:"Satz 12.4.10"}),` es
verspricht. Mit `,e.jsx(n,{children:"\\corange{\\gamma_k} = 1"}),` ist der erste Schritt zu lang:
`,e.jsx(n,{children:"\\cblue{f}"})," steigt von ",e.jsx(n,{children:"15"})," auf ",e.jsx(n,{children:"40"}),", und ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` ist nach sechs Schritten
noch `,e.jsx(n,{children:"0{,}011"})," (in der Frobeniusnorm) von ",e.jsx(n,{children:"\\diag(1; 0{,}2)"}),` entfernt. Mit exakter
Schrittweite liefert jeder Schritt eine Sekantenbedingung für eine neue Richtung;
im `,e.jsx(n,{children:"\\R^2"}),` sitzt die Iterierte nach zwei Schritten im Minimum, und
`,e.jsx(n,{children:"\\corange{\\bB_2}"})," stimmt mit ",e.jsx(n,{children:"\\diag(1; 0{,}2)"}),` überein. Auf einer Quadrik im
`,e.jsx(n,{children:"\\R^n"})," ist BFGS mit exakter Liniensuche deshalb nach höchstens ",e.jsx(n,{children:"n"}),` Schritten
fertig.`]})]}),`
`,e.jsx(i.h3,{children:"Vier Verfahren nebeneinander"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Eigenschaft"}),e.jsx(i.th,{children:"Nelder-Mead"}),e.jsx(i.th,{children:"Gradientenabstieg"}),e.jsx(i.th,{children:"Quasi-Newton"}),e.jsx(i.th,{children:"Newton"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Ordnung"}),e.jsx(i.td,{children:"nullte"}),e.jsx(i.td,{children:"erste"}),e.jsx(i.td,{children:"dazwischen"}),e.jsx(i.td,{children:"zweite"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"braucht"}),e.jsxs(i.td,{children:["nur ",e.jsx(n,{children:"\\cblue{f}"})]}),e.jsx(i.td,{children:e.jsx(n,{children:"\\corange{\\nabla f}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\corange{\\nabla f}"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\corange{\\nabla f}"}),", ",e.jsx(n,{children:"\\corange{\\bH_f}"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"lineare Algebra je Schritt"}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n^2)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"O(n^3)"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Konvergenz"}),e.jsx(i.td,{children:"keine Garantie"}),e.jsx(i.td,{children:"linear"}),e.jsx(i.td,{children:"superlinear"}),e.jsx(i.td,{children:"lokal quadratisch"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schrittweite"}),e.jsx(i.td,{children:"automatisch"}),e.jsxs(i.td,{children:["kritisch (",e.jsx(n,{children:"\\corange{\\gamma}"}),")"]}),e.jsx(i.td,{children:"Liniensuche"}),e.jsx(i.td,{children:"automatisch"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Skalierbarkeit"}),e.jsxs(i.td,{children:["schlecht (",e.jsx(n,{children:"n \\lesssim 10"}),")"]}),e.jsx(i.td,{children:"sehr gut"}),e.jsx(i.td,{children:"gut"}),e.jsx(i.td,{children:"schlecht"})]})]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.12 (Wie die Tabelle zu lesen ist)",id:"env-wie-die-tabelle-zu-lesen-ist",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Aufwandsspalte zählt die lineare Algebra je Schritt"}),`, nicht die Funktions- und
Gradientenauswertungen. Die können ihrerseits teuer sein: Bei einem empirischen
Risiko über `,e.jsx(n,{children:"N"})," Beobachtungen kostet schon ein einziger Gradient ",e.jsx(n,{children:"O(N)"}),`; davon
handelt der letzte Unterabschnitt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Konvergenzspalte ist asymptotisch und lokal."}),` Die quadratische Rate von Newton
gilt in der Nähe eines Minimums mit invertierbarer und lokal hinreichend glatter
Hesse-Matrix, die lineare Rate des Gradientenabstiegs unter den Voraussetzungen aus
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),". Über das Verhalten weit vom Ziel sagt die Zeile nichts."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Drei der vier sind Fixpunktiterationen."}),` Gradientenabstieg, Quasi-Newton und Newton
haben dieselbe Bauform`]}),e.jsx(F,{children:`\\cblue{\\bx^{(k+1)}} = \\cblue{\\bx^{(k)}} - \\corange{\\bM_k}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} ,
\\qquad
\\corange{\\bM_k} \\in \\bigl\\{\\corange{\\gamma}\\bI,\\ \\corange{\\gamma_k}\\corange{\\bB_k},\\
\\corange{\\bH_f(\\bx^{(k)})^{-1}}\\bigr\\} ,`}),e.jsxs(i.p,{children:["sind also allesamt Fixpunktiterationen für ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bnull^\\top"}),`
im Sinne von `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),". Die Wahl von ",e.jsx(n,{children:"\\corange{\\bM_k}"}),` ist
die Wahl zwischen Rechenzeit und Schrittqualität.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Wo sie eingesetzt werden."}),` Nelder-Mead ist die Rückfalloption ohne Ableitungen
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`), der Gradientenabstieg die Grundlage der Optimierer für
`,e.jsx(d,{id:"neural-network",children:"neuronale Netze"}),`, BFGS der Standardkompromiss für mittelgroße glatte Probleme, und Newton steckt in der
`,e.jsx(d,{id:"likelihood",children:"Likelihood"}),`-Inferenz, etwa als Fisher-Scoring (IWLS) für
verallgemeinerte lineare Modelle
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-warum-statistik-und-ml-voll-davon-sind",children:"Bemerkung 10.8.13"}),`), und im Boosting-Verfahren
XGBoost. In `,e.jsx(i.code,{children:"R"})," bekommen wir BFGS mit ",e.jsx(i.code,{children:'method = "BFGS"'}),`; die Voreinstellung von
`,e.jsx(i.code,{children:"optim()"})," ist es nicht (",e.jsx(i.a,{href:"#sec-12.6",children:"Abschnitt 12.6"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Momentum: Schwung gegen den Zickzack"}),`
`,e.jsxs(i.p,{children:[`Zurück zum Gradientenabstieg und seiner Schwäche bei schlechter Kondition: In einem
langen, schmalen Tal zeigt der negative Gradient fast quer zur Talrichtung, die
Iterierten pendeln zwischen den Hängen und kommen der Länge nach kaum voran
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),`). Große Schritte verstärken das Pendeln, kleine bremsen
den Fortschritt entlang des Tals.`]}),`
`,e.jsxs(i.p,{children:[`Eine Kugel, die den Hang hinunterrollt, folgt nicht in jedem Augenblick der lokalen
Falllinie, sondern sammelt Schwung (`,e.jsx(i.em,{children:"momentum"}),`). Quer zum Tal wird sie von den
Hängen abwechselnd nach links und rechts gelenkt, das mittelt sich weg; entlang des
Tals wirken alle Kräfte in dieselbe Richtung und addieren sich.`]}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.4.13 (Gradientenabstieg mit Heavy-Ball-Momentum)",id:"env-gradientenabstieg-mit-heavy-ball",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` stetig differenzierbar, ein Startpunkt
`,e.jsx(n,{children:"\\cblue{\\bx^{(0)}}"}),", eine Schrittweite ",e.jsx(n,{children:"\\corange{\\gamma} > 0"}),` und ein
Momentumparameter `,e.jsx(n,{children:"\\alpha \\in [0, 1)"}),". Setze die ",e.jsx(i.em,{children:"Geschwindigkeit"}),`
`,e.jsx(n,{children:"\\bv^{(0)} = \\bnull"}),`, die im Folgenden die bisherigen Schritte aufsammelt, und für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})]}),e.jsx(ne,{tag:"12.4.6",id:"eq-gradientenabstieg-mit-heavy-ball",children:`\\begin{aligned}
\\bv^{(k+1)} &= \\alpha\\,\\bv^{(k)} - \\corange{\\gamma}\\,\\corange{\\nabla f(\\bx^{(k)})^\\top} , \\\\
\\cblue{\\bx^{(k+1)}} &= \\cblue{\\bx^{(k)}} + \\bv^{(k+1)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\alpha = 0"})," ist das der gewöhnliche Gradientenabstieg."]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.14 (Was der Schwung bewirkt)",id:"env-was-der-schwung-bewirkt",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Gleichgerichtete Gradienten summieren sich auf."}),` Bleibt der Gradient über mehrere
Schritte ungefähr gleich, so wird aus `,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),` eine
geometrische Reihe, und die Geschwindigkeit läuft gegen
`,e.jsx(n,{children:"\\bv \\to -\\corange{\\gamma}\\,\\corange{\\nabla f^\\top}/(1 - \\alpha)"}),`. Der effektive
Schritt in einer flachen, aber konsistenten Richtung ist also um den Faktor
`,e.jsx(n,{children:"1/(1-\\alpha)"}),` größer als beim reinen Gradientenabstieg; für den üblichen Wert
`,e.jsx(n,{children:"\\alpha = 0{,}9"})," ist das ein Faktor ",e.jsx(n,{children:"10"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Wechselnde Gradienten mitteln sich weg."}),` Wechselt die Gradientenrichtung dagegen
in jedem Schritt, so heben sich die Beiträge in `,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),`
weitgehend auf; das dämpft den Zickzack. In der mechanischen Analogie ist
`,e.jsx(n,{children:"1 - \\alpha"})," die Reibung: Je größer ",e.jsx(n,{children:"\\alpha"}),`, desto weniger Reibung und desto mehr
Gedächtnis.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Größere Schritte sind erlaubt."}),` Auf einer Quadrik mit Krümmungen zwischen
`,e.jsx(n,{children:"\\mu"})," und ",e.jsx(n,{children:"L"}),` konvergiert der Gradientenabstieg genau für
`,e.jsx(n,{children:"\\corange{\\gamma} L < 2"}),", mit Momentum für ",e.jsx(n,{children:"\\corange{\\gamma} L < 2(1 + \\alpha)"}),`.
Bei `,e.jsx(n,{children:"\\alpha = 0{,}9"})," dürfen die Schritte also fast doppelt so lang sein."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Nicht jedes ",e.jsx(n,{children:"\\alpha"})," hilft."]}),` Bei gut konditionierten Problemen ist der Standardwert
`,e.jsx(n,{children:"\\alpha = 0{,}9"})," zu groß und macht das Verfahren ",e.jsx(i.em,{children:"langsamer"}),` als den reinen
Gradientenabstieg; das Widget zeigt es. Die Variante von Nesterov wertet den
Gradienten am voraussichtlichen nächsten Punkt aus statt am aktuellen und ist oft
die bessere Wahl.`]})]}),`
`,e.jsxs(pe,{title:"Optimale Momentum-Parameter und ihre Grenzen",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Optimale Parameter."}),` Für eine Quadrik lässt sich die beste Wahl ausrechnen: Mit
`,e.jsx(n,{children:"\\alpha^\\star = \\bigl((\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)\\bigr)^2"}),` und
`,e.jsx(n,{children:"\\corange{\\gamma^\\star} = 4/(\\sqrt L + \\sqrt\\mu)^2"}),` fällt der Fehler pro Schritt auf
das `,e.jsx(n,{children:"(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)"}),`-fache statt auf das
`,e.jsx(n,{children:"(\\kappa - 1)/(\\kappa + 1)"}),"-fache. Statt ",e.jsx(n,{children:"\\kappa"})," steht dort also ",e.jsx(n,{children:"\\sqrt\\kappa"}),`, und
das ist bei `,e.jsx(n,{children:"\\kappa = 100"})," der Unterschied zwischen ",e.jsx(n,{children:"0{,}98"})," und ",e.jsx(n,{children:"0{,}82"}),` pro
Schritt. Der Standardwert `,e.jsx(n,{children:"0{,}9"})," passt zu ",e.jsx(n,{children:"\\kappa"})," in der Größenordnung ",e.jsx(n,{children:"10^3"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Garantie gilt nur für Quadriken."}),` Für allgemeine glatte, stark konvexe
Funktionen ist die Beschleunigung kein Satz: Es gibt Beispiele, auf denen Heavy-Ball
mit den für Quadriken optimalen Parametern in einen Zyklus läuft und nicht
konvergiert. Die Variante von Nesterov trägt dort eine bewiesene Schranke. Der
Merksatz „bei strikt konvexen Funktionen beschleunigt Momentum die Konvergenz
deutlich" ist also eine Faustregel, kein Theorem.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Adaptive Verfahren."}),` Adagrad, RMSprop und ADAM nutzen dieselbe Beobachtung, dass in
den bisherigen Gradienten Information steckt. Sie merken sich zusätzlich, wie groß
die Gradienten typischerweise waren, und geben daraus jeder Koordinate eine eigene
Schrittweite; ADAM verbindet das mit dem Schwung aus
`,e.jsx(i.a,{href:"#eq-gradientenabstieg-mit-heavy-ball",children:"(12.4.6)"}),". Der Kurs ",e.jsx(i.em,{children:"Optimization for ML"}),` im Master geht
ihnen nach.`]})]}),`
`,e.jsxs(Me,{title:"Mit und ohne Schwung",children:[e.jsxs(i.p,{children:[`Beide Verfahren laufen auf derselben Quadrik
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = \\tfrac12(x_1^2 + c\\,x_2^2)"})," mit Konditionszahl ",e.jsx(n,{children:"\\kappa = c"}),`, blau
ohne und violett mit Momentum. Die Schrittweite steht als Vielfaches von `,e.jsx(n,{children:"1/L"}),` am
Regler, sodass die Stabilitätsgrenzen `,e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"2(1+\\alpha)"}),` direkt ablesbar sind.
Die drei Voreinstellungen sind gut, mittel und schlecht konditioniert, jeweils mit
`,e.jsx(n,{children:"\\alpha = 0{,}9"}),"."]}),e.jsx(Re,{variante:"auswahl",frage:e.jsxs(e.Fragment,{children:["Hilft der Standardwert ",e.jsx(n,{children:"\\alpha = 0{,}9"})," bei einer ",e.jsx(i.em,{children:"gut"})," konditionierten Quadrik, etwa ",e.jsx(n,{children:"\\kappa = 5"}),"?"]}),optionen:[{id:"ja",text:"ja, er spart Schritte"},{id:"nein",text:"nein, er kostet Schritte"},{id:"egal",text:"er ändert nichts"}],loesung:"nein",verdeckt:e.jsxs(e.Fragment,{children:["Die Ablesezeile zählt beide Verfahren mit: Bei ",e.jsx(n,{children:"\\kappa = 5"})," dreht sich das Ergebnis sogar um, ",e.jsx(n,{children:"106"})," Schritte mit gegen ",e.jsx(n,{children:"31"})," ohne Momentum."]}),children:e.jsx(us,{})}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"\\kappa = 25"})," steht es ",e.jsx(n,{children:"103"})," Schritte mit gegen ",e.jsx(n,{children:"161"}),` ohne Momentum, bei
`,e.jsx(n,{children:"\\kappa = 100"})," schon ",e.jsx(n,{children:"121"})," zu ",e.jsx(n,{children:"608"}),`: Je schlechter die Kondition, desto größer der
Gewinn. Bei `,e.jsx(n,{children:"\\corange{\\gamma} L = 2{,}5"}),` divergiert der blaue Weg, der violette
bleibt stabil, denn seine Grenze liegt bei `,e.jsx(n,{children:"2 \\cdot 1{,}9 = 3{,}8"}),`. Der Standardwert
`,e.jsx(n,{children:"0{,}9"}),` stammt aus dem Deep Learning, wo die Konditionszahlen um Größenordnungen
höher liegen als hier.`]}),e.jsxs(i.p,{children:["Eine ",e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/gradient-descent-shiny/",children:"Shiny-App"}),` zeigt
Gradientenabstieg und Momentum auf weiteren Landschaften.`]})]}),`
`,e.jsx(i.h3,{children:"Stochastischer Gradientenabstieg"}),`
`,e.jsxs(i.p,{children:[`Bisher ging es darum, wie viele Schritte ein Verfahren braucht, jetzt darum, was ein
einzelner Schritt kostet. In Statistik und maschinellem Lernen ist die Zielfunktion
meist ein Mittelwert über Daten, das `,e.jsx(i.em,{children:"empirische Risiko"})]}),`
`,e.jsx(ne,{tag:"12.4.7",id:"eq-eq-12-4-7",children:"\\cblue{R(\\btheta)} = \\frac{1}{N}\\sum_{i=1}^{N} L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr) ,"}),`
`,e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"L"})," den Fehler einer einzelnen Vorhersage misst und ",e.jsx(n,{children:"N"}),` die Zahl der
Beobachtungen ist (`,e.jsx(i.a,{href:"#env-optimierungsprobleme-in-statistik-und",children:"Beispiel 12.1.4"}),`). Typische
Verluste sind der Kleinste-Quadrate-Verlust und die negative Log-Likelihood
(`,e.jsx(i.a,{href:"#env-vier-konvexe-verlustfunktionen",children:"Beispiel 12.2.7"}),`), für die logistische Regression also der
Kreuzentropie-Verlust.`]}),`
`,e.jsx(i.p,{children:"Der Gradient erbt die Summe:"}),`
`,e.jsx(F,{children:`\\corange{\\nabla R(\\btheta)} = \\frac{1}{N}\\sum_{i=1}^{N}
\\corange{\\nabla L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr)} .`}),`
`,e.jsxs(i.p,{children:[`Ein einziger Gradientenschritt läuft also einmal durch den gesamten Datensatz; bei
`,e.jsx(n,{children:"N"}),` in Millionenhöhe begrenzt das die Rechenzeit, wie gut die Richtung auch ist. Der
`,e.jsx(i.em,{children:"stochastische Gradientenabstieg"}),` ersetzt diesen Mittelwert durch einen
`,e.jsx(d,{id:"unbiased-estimator",children:"unverzerrten Schätzer"}),", statt ihn auszurechnen."]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.4.15 (Der Gradient einer zufällig gezogenen Beobachtung ist unverzerrt)",id:"env-der-gradient-einer-zufaellig-gezogenen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\btheta"})," fest, der Datensatz fest, und sei ",e.jsx(n,{children:"i"}),` gleichverteilt auf
`,e.jsx(n,{children:"\\{1, \\dots, N\\}"})," gezogen. Dann gilt"]}),e.jsx(F,{children:`\\E\\Bigl[\\corange{\\nabla L\\bigl(y_i, p_\\btheta(\\bx_i)\\bigr)}\\Bigr]
= \\corange{\\nabla R(\\btheta)} .`})]}),`
`,e.jsx(pe,{title:"Beweis der Unverzerrtheit",children:e.jsx(sn,{children:e.jsxs(re,{why:e.jsxs(e.Fragment,{children:["Erwartungswert einer Funktion einer diskreten Zufallsvariablen; die ",e.jsx(n,{children:"y_j"})," und ",e.jsx(n,{children:"\\bx_j"})," sind hier Konstanten, zufällig ist nur, welche von ihnen gezogen wird"]}),children:[e.jsxs(i.p,{children:["Der Erwartungswert läuft allein über den Index ",e.jsx(n,{children:"i"}),", und der nimmt jeden der ",e.jsx(n,{children:"N"}),`
Werte mit Wahrscheinlichkeit `,e.jsx(n,{children:"1/N"})," an:"]}),e.jsx(F,{children:`\\E\\Bigl[\\corange{\\nabla L(y_i, p_\\btheta(\\bx_i))}\\Bigr]
= \\sum_{j=1}^{N} \\P(i = j)\\, \\corange{\\nabla L(y_j, p_\\btheta(\\bx_j))}
= \\frac{1}{N}\\sum_{j=1}^{N} \\corange{\\nabla L(y_j, p_\\btheta(\\bx_j))} ,`}),e.jsxs(i.p,{children:["und das ist ",e.jsx(n,{children:"\\corange{\\nabla R(\\btheta)}"}),"."]})]})})}),`
`,e.jsx(i.p,{children:`Gemittelt wird allein über die Ziehung des Index, nicht über die Verteilung der Daten.
Die Unverzerrtheit ist deshalb keine Annahme über das Modell, sondern folgt daraus,
wie wir ziehen: Den unverzerrten Schätzer bauen wir selbst.`}),`
`,e.jsxs(D,{kind:"Algorithmus",label:"12.4.16 (Stochastischer Gradientenabstieg, SGD)",id:"env-stochastischer-gradientenabstieg-sgd",children:[e.jsxs(i.p,{children:["Gegeben seien das empirische Risiko ",e.jsx(i.a,{href:"#eq-eq-12-4-7",children:"(12.4.7)"}),`, ein Startwert
`,e.jsx(n,{children:"\\cblue{\\btheta^{(0)}}"})," und Schrittweiten ",e.jsx(n,{children:"\\corange{\\gamma^{(k)}} > 0"}),`. Für
`,e.jsx(n,{children:"k = 0, 1, 2, \\dots"})]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["ziehe einen Index ",e.jsx(n,{children:"i_k"})," gleichverteilt aus ",e.jsx(n,{children:"\\{1, \\dots, N\\}"}),","]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"setze"}),`
`,e.jsx(ne,{tag:"12.4.8",id:"eq-stochastischer-gradientenabstieg-sgd",children:`\\cblue{\\btheta^{(k+1)}} = \\cblue{\\btheta^{(k)}}
- \\corange{\\gamma^{(k)}}\\,\\corange{\\nabla L\\bigl(y_{i_k}, p_{\\btheta^{(k)}}(\\bx_{i_k})\\bigr)^\\top} .`}),`
`]}),`
`]})]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.4.17 (Rauschen und Mini-Batches)",id:"env-rauschen-mini-batches-und-lernraten",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kosten und Gewinn."})," Ein Schritt kostet jetzt ",e.jsx(n,{children:"O(1)"})," statt ",e.jsx(n,{children:"O(N)"}),`, unabhängig von
der Datenmenge. Dafür ist die Richtung nur im Mittel richtig: Die Iterierten laufen
nicht mehr glatt bergab, sondern schwanken, und in der Nähe des Minimums bleibt bei
fester Schrittweite ein Rauschband, das nicht kleiner wird.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Mini-Batches."})," In der Praxis ziehen wir einen Stapel von ",e.jsx(n,{children:"b"}),` Beobachtungen und
mitteln deren Gradienten; dieses Mittel ersetzt den einzelnen Summanden in
`,e.jsx(i.a,{href:"#eq-stochastischer-gradientenabstieg-sgd",children:"(12.4.8)"}),". (Wir schreiben ",e.jsx(n,{children:"b"}),", weil ",e.jsx(n,{children:"n"}),` hier schon die
Zahl der Parameter ist.) Der Schätzer bleibt unverzerrt, und bei unabhängigen
Ziehungen fällt seine Varianz auf den `,e.jsx(n,{children:"b"}),`-ten Teil, die Standardabweichung also nur
auf den `,e.jsx(n,{children:"\\sqrt b"}),"-ten. Ein Stapel von ",e.jsx(n,{children:"32"})," kostet das ",e.jsx(n,{children:"32"}),`-fache einer einzelnen
Beobachtung und drückt das Rauschen nur um den Faktor `,e.jsx(n,{children:"5{,}7"}),`. Übliche Größen liegen
zwischen `,e.jsx(n,{children:"32"})," und ",e.jsx(n,{children:"256"}),`; die Wahl folgt eher der Hardware, die viele gleichartige
Rechnungen gleichzeitig erledigt, als der Statistik.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum das wichtig ist."}),` Mini-Batch-SGD, meist mit Momentum oder als AdamW, ist die
Grundlage fast des gesamten Trainings neuronaler Netze. Oft ebenso wichtig wie das
Verfahren ist der Lernratenplan (`,e.jsx(i.em,{children:"learning rate schedule"}),`), der die Schrittweite
nach einer Aufwärmphase absenkt. Häufig begrenzen wir außerdem die Norm zu großer
Gradienten auf einen Höchstwert (`,e.jsx(i.em,{children:"gradient clipping"}),`), was das Training stabilisiert, und das
Rauschen der Mini-Batches hilft, Sattelpunkte und Plateaus zu verlassen
(`,e.jsx(i.a,{href:"#env-was-sattelpunkte-fuer-die-verfahren",children:"Bemerkung 12.2.10"}),`). Der MSc-Kurs
`,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),` behandelt
ADAM, Muon und die Lernratenpläne im Detail.`]})]}),`
`,e.jsxs(pe,{title:"Lernraten und Ziehen ohne Zurücklegen",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lernraten."}),` Damit die Iterierten nicht im Rauschband hängen bleiben, lassen wir
`,e.jsx(n,{children:"\\corange{\\gamma^{(k)}}"}),` langsam fallen. Klassisch verlangen wir
`,e.jsx(n,{children:"\\sum_k \\corange{\\gamma^{(k)}} = \\infty"}),`, damit die Iteration beliebig weit kommt, und
`,e.jsx(n,{children:"\\sum_k (\\corange{\\gamma^{(k)}})^2 < \\infty"}),`, damit sich das Rauschen herausmittelt;
`,e.jsx(n,{children:"\\corange{\\gamma^{(k)}} \\sim 1/k"})," erfüllt beides."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ziehen ohne Zurücklegen."}),` Die gängigen Implementierungen mischen den Datensatz
einmal pro Durchlauf und gehen ihn der Reihe nach durch, statt unabhängig zu ziehen.
`,e.jsx(d,{id:"env:der-gradient-einer-zufaellig-gezogenen",href:"#env-der-gradient-einer-zufaellig-gezogenen",children:"Satz 12.4.15"}),` gilt dann nur noch gemittelt über alle
Mischungen, praktisch funktioniert es aber besser.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Newton-Schritt liefert stets ein lokales Minimum der Funktion."}),e.jsxs(i.p,{children:[`Er liefert einen kritischen Punkt der quadratischen Näherung, mehr nicht. Ist die
Hesse-Matrix indefinit, so ist das ein Sattel, ist sie negativ definit, ein Maximum.
Im Widget genügt der Startpunkt `,e.jsx(n,{children:"0{,}5"}),` auf der nicht-konvexen Funktion: Ein einziger
Schritt landet exakt auf dem lokalen Maximum bei `,e.jsx(n,{children:"0"}),`, weil dort ebenfalls
`,e.jsx(n,{children:"\\corange{f'} = 0"})," gilt (",e.jsx(i.a,{href:"#env-newton-bei-nicht-konvexen-funktionen",children:"Bemerkung 12.4.5"}),")."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Auf einer strikt konvexen quadratischen Funktion trifft Newton das Minimum in
einem Schritt, ganz gleich, wie schlecht konditioniert sie ist und wo wir starten.`}),e.jsxs(i.p,{children:["Für ein Polynom zweiten Grades ist die Näherung ",e.jsx(i.a,{href:"#eq-eq-12-4-1",children:"(12.4.1)"}),` exakt. Ist seine
Hesse-Matrix positiv definit, ist der Scheitel das eindeutige Minimum selbst
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),"). ",e.jsx(i.a,{href:"#env-ein-zug-statt-vieler",children:"Beispiel 12.4.6"}),` rechnet das vor:
`,e.jsx(n,{children:"4 - 8/2 = 0"}),`. Der Gradientenabstieg schafft den Treffer im Allgemeinen nicht, seine
Schrittzahl hängt an der Kondition. In einer Dimension gibt es allerdings eine
Ausnahme: Mit `,e.jsx(n,{children:"\\corange{\\gamma} = 1/\\corange{f''}"}),` trifft auch er sofort, und
diese Schrittweite ist der Newton-Schritt.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit BFGS funktioniert, muss ",e.jsx(n,{children:"\\corange{\\bB_k}"}),` gegen die inverse Hesse-Matrix
konvergieren.`]}),e.jsxs(i.p,{children:["Das ist nicht nötig. Im Widget steht nach sechs Schritten mit ",e.jsx(n,{children:"\\corange{\\gamma_k} = 1"}),`
eine Matrix, die `,e.jsx(n,{children:"\\diag(1; 0{,}2)"}),` nur nahekommt, und das Verfahren konvergiert
trotzdem. Gebraucht wird eine gute Richtung, nicht die richtige Matrix. Nur im
Sonderfall der Quadrik mit exakter Liniensuche wird die Näherung nach `,e.jsx(n,{children:"n"}),` Schritten
exakt.`]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:"Das BFGS-Update erfüllt die Sekantenbedingung nicht näherungsweise, sondern exakt."}),e.jsxs(i.p,{children:["Das ist ",e.jsx(d,{id:"env:das-bfgs-update-erfuellt-die",href:"#env-das-bfgs-update-erfuellt-die",children:"Satz 12.4.10"}),`; der Beweis braucht nur die Definition
`,e.jsx(n,{children:"\\rho_k = 1/(\\corange{\\by_k}^\\top\\cblue{\\bs_k})"}),`. Näherungsweise ist die
`,e.jsx(i.em,{children:"Sekantenbedingung selbst"}),", denn ein Differenzenquotient ist nicht die Ableitung."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Momentum mit ",e.jsx(n,{children:"\\alpha = 0{,}9"}),` ist immer mindestens so schnell wie der reine
Gradientenabstieg.`]}),e.jsxs(i.p,{children:[`Bei gut konditionierten Problemen schadet es. Im Widget braucht der Abstieg bei
`,e.jsx(n,{children:"\\kappa = 5"})," ohne Momentum ",e.jsx(n,{children:"31"})," Schritte, mit ",e.jsx(n,{children:"\\alpha = 0{,}9"})," dagegen ",e.jsx(n,{children:"106"}),`.
Rechnerisch optimal wäre dort ein Momentumparameter von etwa `,e.jsx(n,{children:"0{,}15"}),". Der Wert ",e.jsx(n,{children:"0{,}9"}),` stammt
aus dem Deep Learning, wo die Konditionszahl um Größenordnungen höher liegt
(`,e.jsx(i.a,{href:"#env-was-der-schwung-bewirkt",children:"Bemerkung 12.4.14"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Mini-Batch aus ",e.jsx(n,{children:"32"})," Beobachtungen macht die Schätzung des Gradienten ",e.jsx(n,{children:"32"}),`-mal
genauer als eine einzelne Beobachtung.`]}),e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Varianz"}),` fällt auf ein Zweiunddreißigstel, die Standardabweichung also nur um
den Faktor `,e.jsx(n,{children:"\\sqrt{32} \\approx 5{,}7"}),`. Deshalb sind Mini-Batches ein Kompromiss
und keine Lösung: Der Aufwand wächst linear, die Genauigkeit mit der Wurzel.`]})]}),e.jsxs(Ki,{loesung:31,toleranz:5,einheit:"Schritte",children:[e.jsxs(i.p,{children:[`Wie viele Schritte braucht der reine Gradientenabstieg im Momentum-Widget bei
`,e.jsx(n,{children:"\\kappa = 5"})," und ",e.jsx(n,{children:"\\corange{\\gamma} L = 1"})," für einen Faktor ",e.jsx(n,{children:"10^{-6}"}),` im
Funktionswert?`]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"31"}),". Der Abstieg ",e.jsx(i.em,{children:"mit"})," Momentum (",e.jsx(n,{children:"\\alpha = 0{,}9"}),") braucht dafür ",e.jsx(n,{children:"106"}),`,
also mehr als dreimal so viele. Bei guter Kondition schadet der Schwung, weil die
Iterierten über das Tal hinausschießen; bei schlechterer Kondition dreht sich das
Verhältnis um, bei `,e.jsx(n,{children:"\\kappa = 100"})," auf ",e.jsx(n,{children:"121"})," gegen ",e.jsx(n,{children:"608"}),`
(`,e.jsx(i.a,{href:"#env-was-der-schwung-bewirkt",children:"Bemerkung 12.4.14"}),")."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Die Unverzerrtheit des SGD-Gradienten folgt aus der Art, wie wir den Index ziehen,
und nicht aus einer Annahme über die Daten.`}),e.jsxs(i.p,{children:["In ",e.jsx(d,{id:"env:der-gradient-einer-zufaellig-gezogenen",href:"#env-der-gradient-einer-zufaellig-gezogenen",children:"Satz 12.4.15"}),` sind Datensatz und Parameter fest;
zufällig ist nur, welcher Summand von `,e.jsx(i.a,{href:"#eq-eq-12-4-7",children:"(12.4.7)"})," gezogen wird. Weil jeder Index Wahrscheinlichkeit ",e.jsx(n,{children:"1/N"}),`
hat, ist der Erwartungswert der Mittelwert aller Summanden, also der volle Gradient.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath §6.5.3 behandelt das Newton-Verfahren für die unbeschränkte
Optimierung, §6.5.4 die Quasi-Newton-Verfahren im Überblick und §6.5.5 die
Sekanten-Updates samt BFGS; §5.6 zeigt die Newton-Verfahren für nichtlineare
Gleichungssysteme, aus denen sie hervorgehen. Zum stochastischen Gradientenabstieg und seinen Varianten führt der
MSc-Kurs `,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),`
weiter.`]})})]})}function gs(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Qr,{...r})}):Qr(r)}const Jr="#94a3b8",bs=K.violett,Yr=K.gruen,Fn=K.rot,Bn=K.orange,Z=(r,i=2)=>T(r,i),pn=-.8,li=1.7,kr=li-pn,Ae=320,rn=34,et=18,nt=12,ae=r=>rn+(r-pn)/kr*Ae,de=r=>Ae-(r-pn)/kr*Ae,it=r=>r/kr*Ae,ms=[.1,.25,.5,1,1.5,2,2.75],rt=[{key:"eq",knopf:"x + y = 1",formel:"g(x, y) = x + y − 1 = 0",nb:"g",grad:[1,1],mult:"λ",vz:1},{key:"ge",knopf:"x + y ≥ 1",formel:"h(x, y) = 1 − x − y ≤ 0",nb:"h",grad:[-1,-1],mult:"μ",vz:-1},{key:"le",knopf:"x + y ≤ 1",formel:"h(x, y) = x + y − 1 ≤ 0",nb:"h",grad:[1,1],mult:"μ",vz:1}];function js(){const[r,i]=B.useState(1.2),[t,a]=B.useState("eq"),h=u=>Math.round(u*20)/20,l=u=>Math.min(1.6,Math.max(-.6,u)),s=rt.find(u=>u.key===t),c=r,p=1-r,x=c*c+p*p,w=Math.sqrt(x),y=[2*c,2*p],o=s.grad,M=y[0]*o[1]-y[1]*o[0],G=y[0]-y[1],f=-y[0]/o[0],v=-y[1]/o[1],z=Math.abs(M)<1e-9,A=t==="le"?[0,0]:[.5,.5],[L,j]=B.useState({azimuth:42,elevation:26}),b=B.useMemo(()=>({f:(u,N)=>u*u+N*N,nx:28,ny:28,color:Jr,opacity:.72,wire:!0}),[]),E=B.useMemo(()=>{const u=[];for(let N=0;N<=60;N++){const m=-.6+2.2*N/60,k=1-m;u.push([m,k,m*m+k*k])}return[{pts:u,color:Fn,width:2.4,onTop:!0}]},[]),V=B.useMemo(()=>[{p:[c,p,c*c+p*p],color:Fn,r:4.5,onTop:!0},{p:[A[0],A[1],A[0]**2+A[1]**2],color:Yr,r:4.5,label:"x*",onTop:!0}],[c,p,A]),_=Li({feld:{x0:rn,y0:0,w:Ae,h:Ae},welt:{x0:pn,x1:li,y0:pn,y1:li},clamp:([u,N])=>{const m=h(l((u-N+1)/2));return[m,1-m]},greifPosition:()=>[r,1-r],onDrag:([u])=>i(u)}),g=.28,W=u=>[c+g*u[0],p+g*u[1]],C=W(y),H=W(o),X=t==="ge"?`${ae(1.7)},${de(-.7)} ${ae(1.7)},${de(1.7)} ${ae(-.7)},${de(1.7)}`:`${ae(-.8)},${de(-.8)} ${ae(1.8)},${de(-.8)} ${ae(-.8)},${de(1.8)}`,S=z&&(t==="eq"||f>0),R=`∇${s.nb} = (${Z(o[0])}; ${Z(o[1])})`,U=`Die erste Stationaritätsgleichung verlangt ${s.mult} = ${Z(f)}, die zweite ${s.mult} = ${Z(v)}; das widerspricht sich.`,Q=G>0?"nach links oben":"nach rechts unten",ie=`Die Richtungsableitung entlang der Geraden ist ${Z(G)}, wir kommen also ${Q} noch tiefer, und die Höhenlinie f = ${Z(x)} schneidet die Gerade in zwei Punkten.`;let he;return t==="eq"?z?he=`Die beiden Pfeile decken sich: ∇f = (${Z(y[0])}; ${Z(y[1])}) ist ein Vielfaches von ${R}. Beide Stationaritätsgleichungen liefern denselben Multiplikator λ = ${Z(f)}. Entlang der Geraden ändert sich f hier nicht mehr, die Richtungsableitung ist ${Z(G)}. Die Höhenlinie f = ${Z(x)} berührt die Gerade, statt sie zu kreuzen: das ist das Optimum. Das ist genau die notwendige Bedingung von ${O("satz:notwendige-bedingung-von-lagrange")}; das Vorzeichen von λ ist bei einer Gleichungsnebenbedingung frei.`:he=`∇f = (${Z(y[0])}; ${Z(y[1])}) und ${R} zeigen in verschiedene Richtungen; das Kreuzprodukt beträgt ${Z(M)}. ${U} Hier kann also kein Optimum liegen. ${ie}`:t==="ge"?z?he=`Zulässig ist die rote Halbebene x + y ≥ 1, das unbeschränkte Minimum (0; 0) liegt außerhalb. Hier stimmen beide Stationaritätsgleichungen überein und liefern μ = ${Z(f)} > 0, und wegen h(${Z(c)}; ${Z(p)}) = 0 ist auch die Komplementarität erfüllt. Alle vier Bedingungen von ${O("satz:karush-kuhn-tucker-bedingungen")} sind damit erfüllt, die Ungleichung ist aktiv, sie bindet: ∇f = (${Z(y[0])}; ${Z(y[1])}) und ${R} zeigen in entgegengesetzte Richtungen, und diese Gegenläufigkeit ist es, die μ positiv macht.`:he=`Zulässig ist die rote Halbebene x + y ≥ 1. ${U} Hier kann also kein Optimum liegen. ${ie} Im Punkt (0,50; 0,50) werden sich beide auf μ = 1 einigen, und weil das positiv ist, darf die Ungleichung dort binden.`:he=`Jetzt zeigt die Ungleichung in die andere Richtung, zulässig ist die rote Halbebene x + y ≤ 1. ${z?`Im einzigen Punkt der Geraden, in dem sich die beiden Stationaritätsgleichungen einigen, fordern sie μ = ${Z(f)} < 0.`:`${U} Und selbst dort, wo sie sich einigen, nämlich in (0,50; 0,50), fordern sie μ = −1 < 0.`} Die duale Zulässigkeit aus ${O("satz:karush-kuhn-tucker-bedingungen")} verbietet das: Kein Randpunkt ist ein KKT-Punkt. Stattdessen gewinnt das unbeschränkte Minimum x* = (0; 0) mit f* = 0. Dort ist h(0; 0) = −1 < 0, die Ungleichung ist inaktiv, die Komplementarität μ·h = 0 erzwingt μ = 0, und die Stationarität wird trivial erfüllt, weil ∇f(0; 0) = (0; 0) ist.`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(De,{children:"Ziehen wir den Punkt entlang der roten Geraden, bis sich die beiden orangen Pfeile decken."}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Grau die Höhenlinien von f(x, y) = x² + y², violett die gerade erreichte, rot die Nebenbedingung. Orange die beiden Gradienten: ∇f durchgezogen, der Gradient der Nebenbedingung gestrichelt. Die drei Knöpfe wechseln zwischen Gleichung und den beiden Ungleichungen; die Ablesetafel wechselt mit."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[rt.map(u=>e.jsx("button",{type:"button","aria-pressed":t===u.key,className:t===u.key?Ke:$e,onClick:()=>a(u.key),children:u.knopf},u.key)),e.jsx("button",{type:"button",className:$e,onClick:()=>i(.5),children:t==="le"?"zum Berührpunkt (0,5; 0,5)":"zum Optimum"})]}),e.jsx(se,{label:"x (auf der Geraden)",value:r,onChange:u=>i(h(l(u))),min:-.6,max:1.6,step:.05,fmt:u=>Z(u)}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400",children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:rn},children:"y ↑"}),e.jsxs("svg",{viewBox:`0 0 ${rn+Ae+nt} ${Ae+et}`,width:rn+Ae+nt,height:Ae+et,role:"img","aria-label":`Höhenlinien von f mit der Nebenbedingung und den beiden Gradientenpfeilen im Punkt (${Z(c)}; ${Z(p)}); ${z?"die Pfeile sind parallel":"die Pfeile sind nicht parallel"}.`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",..._.svgProps,children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s135l-clip",children:e.jsx("rect",{x:rn,y:0,width:Ae,height:Ae})}),e.jsx("marker",{id:"s135l-pf",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Bn})}),e.jsx("marker",{id:"s135l-pg",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Bn,opacity:.6})})]}),[-.5,0,.5,1,1.5].map(u=>e.jsxs("g",{children:[e.jsx("text",{x:rn-5,y:de(u)+3,textAnchor:"end",fill:"#64748b",fontSize:10,children:Z(u,1)}),e.jsx("text",{x:ae(u),y:Ae+13,textAnchor:"middle",fill:"#64748b",fontSize:10,children:Z(u,1)})]},`t${u}`)),e.jsxs("g",{clipPath:"url(#s135l-clip)",children:[t!=="eq"&&e.jsx("polygon",{points:X,fill:Fn,opacity:.08}),e.jsx("line",{x1:ae(pn),y1:de(0),x2:ae(li),y2:de(0),stroke:"#cbd5e1",strokeWidth:1}),e.jsx("line",{x1:ae(0),y1:de(pn),x2:ae(0),y2:de(li),stroke:"#cbd5e1",strokeWidth:1}),ms.map(u=>e.jsx("circle",{cx:ae(0),cy:de(0),r:it(Math.sqrt(u)),fill:"none",stroke:Jr,strokeWidth:1,opacity:.7},`n${u}`)),e.jsx("circle",{cx:ae(0),cy:de(0),r:it(w),fill:"none",stroke:bs,strokeWidth:2.2}),e.jsx("line",{x1:ae(-.7),y1:de(1.7),x2:ae(1.7),y2:de(-.7),stroke:Fn,strokeWidth:2.4}),e.jsx("line",{x1:ae(c),y1:de(p),x2:ae(H[0]),y2:de(H[1]),stroke:Bn,strokeWidth:3.4,strokeDasharray:"6 4",opacity:.6,markerEnd:"url(#s135l-pg)"}),e.jsx("line",{x1:ae(c),y1:de(p),x2:ae(C[0]),y2:de(C[1]),stroke:Bn,strokeWidth:1.8,markerEnd:"url(#s135l-pf)"}),e.jsx("circle",{cx:ae(A[0]),cy:de(A[1]),r:8,fill:"none",stroke:Yr,strokeWidth:2.4}),e.jsx(Ri,{x:ae(c),y:de(p),farbe:Fn,r:5,aktiv:_.dragging==="p",..._.handleProps("p")})]}),e.jsx("text",{x:ae(1.34),y:de(-.55),textAnchor:"middle",fill:Fn,fontSize:11,children:"x + y = 1"})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:rn},children:"x →"})]}),e.jsxs("div",{className:"min-w-0 max-w-full",children:[e.jsx(br,{size:280,xDomain:[-.8,1.7],yDomain:[-.8,1.7],surface:b,curves:E,points:V,labels:{x:"x",y:"y",z:"f"},azimuth:L.azimuth,elevation:L.elevation,onViewChange:j,ariaLabel:"Die Paraboloidfläche f(x, y) = x² + y² mit der auf sie gehobenen Nebenbedingung als roter Kurve."}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(mr,{value:L,onChange:j})}),e.jsx("p",{className:"mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300",children:"Dieselbe Funktion als Fläche. Die rote Kurve ist die Nebenbedingung, auf die Fläche gehoben; das beschränkte Problem ist die Suche nach ihrem tiefsten Punkt. Rot derselbe Punkt wie links, grün dasselbe Optimum."})]}),e.jsxs("div",{className:"max-w-sm space-y-2 text-sm",children:[e.jsx("table",{className:"text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"Punkt auf der Geraden"}),e.jsxs("td",{className:"font-mono",children:["(",Z(c),"; ",Z(p),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"f(x, y)"}),e.jsx("td",{className:"font-mono",children:Z(x)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",style:{color:Bn},children:"∇f"}),e.jsxs("td",{className:"font-mono",children:["(",Z(y[0]),"; ",Z(y[1]),")"]})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",style:{color:Bn},children:["∇",s.nb]}),e.jsxs("td",{className:"font-mono",children:["(",Z(o[0]),"; ",Z(o[1]),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"∇f entlang (1; −1)"}),e.jsx("td",{className:"font-mono",children:Z(G)})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",children:[s.mult," aus 2x ",s.vz>0?"+":"−"," ",s.mult," = 0"]}),e.jsx("td",{className:"font-mono",children:Z(f)})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-3 align-top",children:[s.mult," aus 2y ",s.vz>0?"+":"−"," ",s.mult," = 0"]}),e.jsx("td",{className:"font-mono",children:Z(v)})]})]})}),e.jsxs("p",{className:"text-xs text-slate-600 dark:text-slate-300",children:["Nebenbedingung: ",s.formel]})]})]}),e.jsx(Ne,{kind:z?S?"ok":"warn":"neutral",titel:z?S?"die Pfeile sind parallel":"parallel, aber μ < 0: kein KKT-Punkt":"die Pfeile sind nicht parallel",children:he})]})}const Ge=[[2,.6],[.6,1]],ye=[1.6,.9],fs="#94a3b8",rr=K.violett,ks=K.gruen,ai=K.rot,ps=1.342857,ws=1.835756,vs=2.5,zs=r=>{const i=[r[0]-ye[0],r[1]-ye[1]];return i[0]*(Ge[0][0]*i[0]+Ge[0][1]*i[1])+i[1]*(Ge[1][0]*i[0]+Ge[1][1]*i[1])},ve=(r,i=2)=>T(r,i);function Ss(r,i){const t=[];for(let h=0;h<4e3;h++)if(r==="kreis"){const l=2*Math.PI*h/4e3;t.push([i*Math.cos(l),i*Math.sin(l)])}else{const l=4*h/4e3;l<1?t.push([i*(1-l),i*l]):l<2?t.push([-i*(l-1),i*(2-l)]):l<3?t.push([-i*(3-l),-i*(l-2)]):t.push([i*(l-3),-i*(4-l)])}return t}function gr(r,i){if((r==="kreis"?Math.hypot(ye[0],ye[1]):Math.abs(ye[0])+Math.abs(ye[1]))<=i)return{p:[ye[0],ye[1]],f:0,aktiv:!1};let a=null;for(const l of Ss(r,i)){const s=zs(l);(!a||s<a.f)&&(a={p:l,f:s})}return{...a,aktiv:!0}}function ys(r,i,t){const a=Ge[0][0]+Ge[1][1],h=Ge[0][0]*Ge[1][1]-Ge[0][1]*Ge[1][0],l=a/2+Math.sqrt(a*a/4-h),s=a/2-Math.sqrt(a*a/4-h),c=Math.atan2(l-Ge[0][0],Ge[0][1]),p=Math.sqrt(r/l),x=Math.sqrt(r/s);let w="";for(let y=0;y<=120;y++){const o=2*Math.PI*y/120,M=p*Math.cos(o),G=x*Math.sin(o),f=ye[0]+M*Math.cos(c)-G*Math.sin(c),v=ye[1]+M*Math.sin(c)+G*Math.cos(c);w+=(y===0?"M ":"L ")+i(f)+" "+t(v)+" "}return w+"Z"}function tt({art:r,c:i,titel:t}){const h=x=>Math.round((x+1.6)/3.6*260*100)/100,l=x=>Math.round((1-(x+1.6)/3.6)*260*100)/100,s=B.useMemo(()=>gr(r,i),[r,i]),c=r==="raute"&&s.aktiv&&(Math.abs(s.p[0])<1e-9&&Math.abs(Math.abs(s.p[1])-i)<1e-9||Math.abs(s.p[1])<1e-9&&Math.abs(Math.abs(s.p[0])-i)<1e-9),p=r==="kreis"?e.jsx("circle",{cx:h(0),cy:l(0),r:i/3.6*260,fill:ai,opacity:.14,stroke:ai,strokeWidth:1.5}):e.jsx("polygon",{points:[[i,0],[0,i],[-i,0],[0,-i]].map(([x,w])=>`${h(x)},${l(w)}`).join(" "),fill:ai,opacity:.14,stroke:ai,strokeWidth:1.5});return e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-center text-sm font-medium",children:t}),e.jsxs("svg",{viewBox:"0 0 260 260",width:260,height:260,role:"img","aria-label":`${t}: KQ-Höhenlinien über dem zulässigen Bereich, die Lösung liegt bei (${ve(s.p[0])}; ${ve(s.p[1])}).`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:h(-1.6),y1:l(0),x2:h(2),y2:l(0),stroke:"#cbd5e1"}),e.jsx("line",{x1:h(0),y1:l(-1.6),x2:h(0),y2:l(2),stroke:"#cbd5e1"}),[.35,s.f>.05?s.f:.9,3.2].map((x,w)=>e.jsx("path",{d:ys(x,h,l),fill:"none",stroke:w===1&&s.f>.05?rr:fs,strokeWidth:w===1&&s.f>.05?2:1,opacity:w===1&&s.f>.05?.9:.7},w)),p,e.jsx("circle",{cx:h(ye[0]),cy:l(ye[1]),r:3.5,fill:rr}),e.jsx("text",{x:h(ye[0])+6,y:l(ye[1])-5,fontSize:11,fill:rr,children:"KQ"}),e.jsx("circle",{cx:h(s.p[0]),cy:l(s.p[1]),r:5,fill:ks})]}),e.jsxs("p",{className:"mt-1 text-center font-mono text-xs",children:["β̂ = (",ve(s.p[0]),"; ",ve(s.p[1]),")",c?" · Ecke!":"",s.aktiv?"":" · NB inaktiv, μ = 0"]})]})}function Ms(){const[r,i]=B.useState(1),t=B.useMemo(()=>gr("kreis",r),[r]),a=B.useMemo(()=>gr("raute",r),[r]),h=r<=1.3+1e-9;let l,s,c;return h?(l="ok",s="Lasso sitzt in der Ecke",c=`Bei r = ${ve(r)} liegt die Lasso-Lösung exakt auf (${ve(r)}; 0): β₂ ist nicht klein, sondern null. Die Ridge-Lösung (${ve(t.p[0])}; ${ve(t.p[1])}) hat dagegen zwei von null verschiedene Koeffizienten. Der Unterschied steckt allein in der Form des zulässigen Bereichs: Die Raute hat Ecken auf den Achsen, der Kreis nicht.`):a.aktiv&&t.aktiv?(l="neutral",s="beide Lösungen liegen auf dem Rand",c=`Über der Eckenschwelle ${ve(ps,4)} rutscht die Lasso-Lösung von der Ecke auf eine Kante der Raute: (${ve(a.p[0])}; ${ve(a.p[1])}) statt (r; 0). Beide Nebenbedingungen binden noch, beide Multiplikatoren sind nach ${O("satz:karush-kuhn-tucker-bedingungen")} positiv, und die Höhenlinie berührt in beiden Tafeln den Rand. Der Sparsamkeitseffekt des Lasso ist damit weg.`):a.aktiv?(l="neutral",s="nur noch das Lasso-Budget bindet",c=`Die Lasso-Lösung (${ve(a.p[0])}; ${ve(a.p[1])}) liegt auf einer Kante der Raute, ihr Multiplikator ist nach ${O("satz:karush-kuhn-tucker-bedingungen")} positiv. Der Ridge-Kreis lässt den KQ-Schätzer dagegen schon zu: Dort ist die Nebenbedingung inaktiv, die Komplementarität erzwingt μ = 0, und die linke Tafel vermerkt das. Ein und derselbe Radius bindet also die eine Norm noch und die andere nicht mehr.`):(l="warn",s="die Nebenbedingung ist inaktiv",c=`Der Radius lässt den KQ-Schätzer selbst zu. Damit ist das Budget kein Zwang mehr: Die Lösung ist der KQ-Punkt, die Komplementarität aus ${O("satz:karush-kuhn-tucker-bedingungen")} erzwingt μ = 0, und die Schätzung wird nicht mehr geschrumpft. Die Schwellen liegen bei ‖β̂‖₂ = ${ve(ws,4)} für Ridge und ‖β̂‖₁ = ${ve(vs,4)} für Lasso.`),e.jsxs("div",{className:"my-2 space-y-3",children:[e.jsx(De,{children:"Schieben wir das Budget nach unten und achten auf β₂ in der rechten Tafel: Wann wird es exakt null?"}),e.jsxs("div",{className:"flex flex-wrap gap-5",children:[e.jsx(tt,{art:"kreis",c:r,titel:"Ridge: ‖β‖₂ ≤ r"}),e.jsx(tt,{art:"raute",c:r,titel:"Lasso: |β₁| + |β₂| ≤ r"})]}),e.jsx(se,{label:"Radius r",value:r,onChange:i,min:.4,max:2.6,step:.05,accent:ai}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:'Beide Tafeln zeigen dieselben KQ-Höhenlinien (grau, Minimum im violetten Punkt „KQ") über ihrem zulässigen Bereich (rot). Violett hervorgehoben ist die niedrigste erreichbare Höhenlinie, der grüne Punkt darauf ist die beschränkte Lösung. Der Regler steuert den Radius r beider Mengen; beim quadrierten Ridge-Budget des Textes ist also c = r².'}),e.jsx(Ne,{kind:l,titel:s,children:c})]})}function st(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die Verfahren der Abschnitte ",e.jsx(i.a,{href:"#sec-12.3",children:"12.3"})," und ",e.jsx(i.a,{href:"#sec-12.4",children:"12.4"})," haben ",e.jsx(n,{children:"f"}),`
auf ganz `,e.jsx(n,{children:"\\R^n"}),` minimiert. Oft ist aber nicht jeder Punkt
erlaubt: Wahrscheinlichkeiten müssen nichtnegativ sein und sich zu `,e.jsx(n,{children:"1"}),`
summieren, ein Budget hat eine Obergrenze, Erhaltungsgrößen der Physik sind
festgelegt. Solche Einschränkungen formulieren wir als Gleichungen
und Ungleichungen an `,e.jsx(n,{children:"\\bx"}),"."]}),`
`,e.jsxs(D,{kind:"Definition",label:"12.5.1 (Beschränktes Optimierungsproblem)",id:"env-beschraenktes-optimierungsproblem",children:[e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"beschränkte Optimierungsproblem"}),` (constrained optimization) aus
`,e.jsx(d,{id:"env:unbeschraenktes-und-beschraenktes",href:"#env-unbeschraenktes-und-beschraenktes",children:"Definition 12.1.2"})," schreiben wir als"]}),e.jsx(F,{children:`\\begin{aligned}
\\min_{\\bx} \\quad & f(\\bx) && \\text{(Zielfunktion)} \\\\
\\text{unter} \\quad & \\cred{g_i(\\bx)} = 0, \\quad i = 1, \\dots, m && \\text{(Gleichungen)} \\\\
& \\cred{h_j(\\bx)} \\le 0, \\quad j = 1, \\dots, p && \\text{(Ungleichungen)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die Menge ",e.jsx(n,{children:"\\cred{S}"}),` aller Punkte, die sämtliche Nebenbedingungen erfüllen,
heißt `,e.jsx(i.em,{children:"zulässiger Bereich"})," (feasible set)."]})]}),`
`,e.jsx(D,{kind:"Bemerkung",label:"12.5.2 (Das Optimum liegt oft auf der Nebenbedingung)",id:"env-das-optimum-liegt-oft-auf-der",children:e.jsxs(i.p,{children:["Minimieren wir etwa ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"}),` unter der Gleichungsnebenbedingung
`,e.jsx(n,{children:"\\cred{g(x, y)} = x + y - 1 = 0"}),`, so ist das unbeschränkte Minimum
`,e.jsx(n,{children:"(0, 0)"}),` nicht zulässig. Das beschränkte Optimum muss auf der Geraden
`,e.jsx(n,{children:"x + y = 1"}),` liegen, und zwar dort, wo die Gerade die niedrigste
`,e.jsx(d,{id:"level-sets",children:"Höhenlinie"})," von ",e.jsx(n,{children:"f"}),` berührt. Auf dieser Berührbedingung beruht das
folgende Verfahren.`]})}),`
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
steht (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),": der ",e.jsx(d,{id:"env:gradient",children:"Gradient"}),` steht
senkrecht auf den Höhenlinien), sind die beiden Gradienten `,e.jsx(i.em,{children:"parallel"}),":"]}),`
`]}),`
`,e.jsx(F,{children:`\\exists\\, \\lambda \\in \\R \\colon \\quad
\\corange{\\nabla f(\\bx^\\star)} + \\lambda\\, \\corange{\\nabla g(\\bx^\\star)} = \\bnull^\\top .`}),`
`,e.jsx(D,{kind:"Bemerkung",label:"12.5.3 (Auch null ist ein zulässiger Multiplikator)",id:"env-auch-null-ist-ein-zulaessiger",children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\lambda = 0"}),` ist erlaubt: Liegt das unbeschränkte Minimum auf der
Nebenbedingung, dann ist dort schon `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^\\star)} = \\bnull^\\top"}),`,
und die Bedingung gilt mit `,e.jsx(n,{children:"\\lambda = 0"}),`. Auch das Vorzeichen ist bei
Gleichungsnebenbedingungen frei, wie `,e.jsx(i.a,{href:"#env-minimieren-auf-einer-geraden",children:"Beispiel 12.5.6"}),` zeigt.
Gebraucht wird dagegen `,e.jsx(n,{children:"\\corange{\\nabla g(\\bx^\\star)} \\neq \\bnull^\\top"}),`, sonst legt
die Nebenbedingung ihre Tangente nicht fest.`]})}),`
`,e.jsxs(D,{kind:"Definition",label:"12.5.4 (Lagrange-Funktion)",id:"env-lagrange-funktion",children:[e.jsxs(i.p,{children:["Für das Problem ",e.jsx(n,{children:"\\min f(\\bx)"})," unter ",e.jsx(n,{children:"\\cred{\\bg(\\bx)} = \\bnull"}),` mit
`,e.jsx(n,{children:"\\bg(\\bx) = (g_1(\\bx), \\dots, g_m(\\bx))^\\top"})," heißt"]}),e.jsx(F,{children:`\\Lcal(\\bx, \\blambda) = f(\\bx) + \\blambda^\\top \\cred{\\bg(\\bx)},
\\qquad \\blambda = (\\lambda_1, \\dots, \\lambda_m)^\\top \\in \\R^m,`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lagrange-Funktion"}),"; die ",e.jsx(n,{children:"\\lambda_i"})," heißen ",e.jsx(i.em,{children:"Lagrange-Multiplikatoren"}),"."]})]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.5.5 (Notwendige Bedingung von Lagrange)",id:"env-notwendige-bedingung-von-lagrange",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"f"})," und ",e.jsx(n,{children:"\\cred{\\bg}"}),` stetig differenzierbar und sei
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein ",e.jsx(d,{id:"env:lokales-und-globales-minimum",children:"lokales Minimum"})," von ",e.jsx(n,{children:"f"}),` unter
`,e.jsx(n,{children:"\\cred{\\bg(\\bx)} = \\bnull"}),`. Sind die Gradienten
`,e.jsx(n,{children:"\\corange{\\nabla g_1(\\bx^\\star)}, \\dots, \\corange{\\nabla g_m(\\bx^\\star)}"}),`
linear unabhängig, so existiert ein `,e.jsx(n,{children:"\\blambda^\\star \\in \\R^m"})," mit"]}),e.jsx(F,{children:`\\nabla_{\\bx} \\Lcal(\\bx^\\star, \\blambda^\\star) = \\bnull^\\top
\\qquad \\text{und} \\qquad
\\cred{\\bg(\\bx^\\star)} = \\bnull .`})]}),`
`,e.jsxs(i.p,{children:[`Die erste Gleichung ist die Parallelitätsbedingung von oben, für alle
`,e.jsx(n,{children:"m"}),` Nebenbedingungen gleichzeitig; die zweite ist die Zulässigkeit. Statt
eines Minimierungsproblems mit Nebenbedingung lösen wir also ein Gleichungssystem in
den `,e.jsx(n,{children:"n + m"})," Unbekannten ",e.jsx(n,{children:"(\\bx, \\blambda)"}),`, und dafür haben wir die Verfahren
aus `,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),"."]}),`
`,e.jsxs(i.p,{children:[`Ohne die Unabhängigkeitsbedingung gilt der Satz nicht. Minimieren wir
`,e.jsx(n,{children:"f(x, y) = x"})," unter ",e.jsx(n,{children:"\\cred{g(x, y)} = y^2 - x^3 = 0"}),`, so erzwingt die
Nebenbedingung `,e.jsx(n,{children:"x \\ge 0"}),`, und das Minimum liegt im Ursprung. Dort ist wegen
`,e.jsx(n,{children:"\\corange{\\nabla g(x, y)} = (-3x^2,\\, 2y)"}),` aber
`,e.jsx(n,{children:"\\corange{\\nabla g(0, 0)} = \\bnull^\\top"}),`, während
`,e.jsx(n,{children:"\\corange{\\nabla f} = (1, 0)"})," nirgends verschwindet: Kein ",e.jsx(n,{children:"\\lambda"}),` erfüllt
die Stationaritätsgleichung.`]}),`
`,e.jsx(i.p,{children:`Hinreichende Bedingungen sind feiner (zweite Ableitungen der
Lagrange-Funktion auf dem Tangentialraum); dazu Heath, Ch. 6.2.3.`}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.5.6 (Minimieren auf einer Geraden)",id:"env-minimieren-auf-einer-geraden",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"})," unter ",e.jsx(n,{children:"\\cred{x + y - 1 = 0}"}),"."]}),e.jsxs(i.p,{children:[`Die Lagrange-Funktion ist
`,e.jsx(n,{children:"\\Lcal(x, y, \\lambda) = x^2 + y^2 + \\lambda\\,(x + y - 1)"}),`, und ihre
partiellen Ableitungen liefern drei Gleichungen:`]}),e.jsx(F,{children:`\\begin{aligned}
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
`,e.jsxs(Me,{title:"Höhenlinien, Gerade und zwei Pfeile",children:[e.jsxs(i.p,{children:["Das Widget zeigt das Beispiel: grau die Höhenlinien von ",e.jsx(n,{children:"f"}),`, violett die gerade
erreichte, rot die Nebenbedingung und orange die beiden Gradienten an einem
verschiebbaren Punkt der Geraden. Daneben steht dieselbe Funktion als Fläche, auf
die die Nebenbedingung als rote Kurve gehoben ist. Die drei Knöpfe wechseln zwischen
der Gleichung und den beiden Ungleichungen.`]}),e.jsx(js,{}),e.jsxs(i.p,{children:["Nur an einer Stelle der Geraden sind die beiden Pfeile ",e.jsx(i.em,{children:"parallel"}),`, und nur dort
liefern beide Stationaritätsgleichungen denselben Multiplikator,
`,e.jsx(n,{children:"\\lambda^\\star = -1"})," im Punkt ",e.jsx(n,{children:"(0{,}5;\\, 0{,}5)"})," mit ",e.jsx(n,{children:"f^\\star = 0{,}5"}),`. Überall
sonst schneidet die Höhenlinie die Gerade, statt sie zu berühren. Die
Ungleichungs-Modi nehmen die KKT-Bedingungen vorweg: Bei `,e.jsx(n,{children:"x + y \\ge 1"}),` zeigen die
Pfeile im Optimum gegeneinander, `,e.jsx(n,{children:"\\mu = 1 > 0"}),`, und die Nebenbedingung bindet. Bei
`,e.jsx(n,{children:"x + y \\le 1"})," verlangte jeder Randpunkt ",e.jsx(n,{children:"\\mu < 0"}),`; stattdessen gewinnt das
unbeschränkte Minimum `,e.jsx(n,{children:"(0;\\, 0)"})," mit ",e.jsx(n,{children:"\\mu = 0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Ungleichungen: die KKT-Bedingungen"}),`
`,e.jsxs(i.p,{children:["Bei Ungleichungs-Nebenbedingungen ",e.jsx(n,{children:"\\cred{h_j(\\bx)} \\le 0"}),` kommt eine neue
Unterscheidung dazu: Eine Ungleichung kann im Optimum `,e.jsx(i.em,{children:"aktiv"}),` sein (es gilt
Gleichheit, sie blockiert die Bewegung) oder `,e.jsx(i.em,{children:"inaktiv"}),` (es gilt strikte
Ungleichheit, lokal schränkt sie nichts ein).`]}),`
`,e.jsxs(D,{kind:"Satz",label:"12.5.7 (Karush-Kuhn-Tucker-Bedingungen)",id:"env-karush-kuhn-tucker-bedingungen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"}),` unter
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
`,e.jsxs(D,{kind:"Bemerkung",label:"12.5.8 (Komplementarität: bindet oder abgeschaltet)",id:"env-komplementaritaet-bindet-oder",children:[e.jsx(i.p,{children:"Bedingung 4 ist ein Entweder-oder je Ungleichung:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"h_j(\\bx^\\star) < 0"})," (inaktiv) ",e.jsx(n,{children:"\\implies \\mu_j = 0"}),`: Die Nebenbedingung
trägt nichts zur Stationarität bei.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\mu_j > 0 \\implies h_j(\\bx^\\star) = 0"}),` (aktiv): Die Nebenbedingung bindet,
und ihr Gradient gleicht in der Stationaritätsgleichung
`,e.jsx(n,{children:"\\corange{\\nabla f}"})," aus."]}),`
`]}),e.jsxs(i.p,{children:[`Anders als bei Gleichungen ist das Vorzeichen hier festgelegt:
`,e.jsx(n,{children:"\\mu_j \\ge 0"}),`, denn eine Ungleichung kann nur in eine Richtung drücken.
Die `,e.jsx(n,{children:"\\lambda_i"})," der Gleichungen bleiben vorzeichenfrei."]})]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.5.9 (Eine Box-Beschränkung)",id:"env-eine-box-beschraenkung",children:[e.jsxs(i.p,{children:["Wir minimieren ",e.jsx(n,{children:"f(x) = (x - 3)^2"})," unter ",e.jsx(n,{children:"0 \\le x \\le 2"}),`, also mit
`,e.jsx(n,{children:"\\cred{h_1(x)} = -x \\le 0"})," und ",e.jsx(n,{children:"\\cred{h_2(x)} = x - 2 \\le 0"}),"."]}),e.jsx(i.p,{children:"Die KKT-Bedingungen lauten"}),e.jsx(ne,{tag:"12.5.1",id:"eq-eine-box-beschraenkung",children:`2(x^\\star - 3) - \\mu_1 + \\mu_2 = 0, \\qquad
\\mu_1, \\mu_2 \\ge 0, \\qquad
\\mu_1 x^\\star = 0, \\qquad \\mu_2 (x^\\star - 2) = 0 .`}),e.jsxs(i.p,{children:["Das unbeschränkte Minimum ",e.jsx(n,{children:"x = 3"}),` ist unzulässig, der Kandidat ist der rechte
Rand: `,e.jsx(n,{children:"\\cgreen{x^\\star = 2}"}),". Komplementarität erzwingt dann ",e.jsx(n,{children:"\\mu_1 = 0"}),`
(denn `,e.jsx(n,{children:"x^\\star = 2 \\neq 0"}),"), und ",e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"}),` liefert
`,e.jsx(n,{children:"2(2 - 3) + \\mu_2 = 0"}),", also ",e.jsx(n,{children:"\\mu_2 = 2 > 0"}),`. Alle vier Bedingungen sind
erfüllt: Die obere Schranke ist `,e.jsx(i.em,{children:"aktiv"}),", die untere ",e.jsx(i.em,{children:"inaktiv"}),"."]}),e.jsxs(i.p,{children:[`Die beiden anderen Kandidaten scheitern an den KKT-Bedingungen. Am
linken Rand `,e.jsx(n,{children:"x = 0"})," ist ",e.jsx(n,{children:"\\mu_2 = 0"}),", und ",e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"}),` verlangte dann
`,e.jsx(n,{children:"\\mu_1 = 2(0 - 3) = -6 < 0"}),`, was die duale Zulässigkeit verletzt. Im Inneren
wären beide Multiplikatoren null und `,e.jsx(i.a,{href:"#eq-eine-box-beschraenkung",children:"(12.5.1)"})," verlangte ",e.jsx(n,{children:"x^\\star = 3"}),`, was
die Box verlässt.`]}),e.jsxs(i.p,{children:["Anschaulich zeigt die negative Ableitung ",e.jsx(n,{children:"-f'(2) = 2"}),` nach rechts, Richtung
des unbeschränkten Minimums, aber die aktive Schranke `,e.jsx(n,{children:"\\cred{h_2}"}),` blockiert
jede weitere Bewegung. Diese blockierte Abstiegsrichtung entspricht
`,e.jsx(n,{children:"\\mu_2 > 0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Ridge und Lasso als beschränkte Optimierung"}),`
`,e.jsxs(i.p,{children:["Die regularisierte Regression aus ",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),` lässt sich in einer
penalisierten und einer beschränkten Form schreiben; die zweite ist ein
beschränktes Problem im Sinn von `,e.jsx(d,{id:"env:beschraenktes-optimierungsproblem",href:"#env-beschraenktes-optimierungsproblem",children:"Definition 12.5.1"}),":"]}),`
`,e.jsx(F,{children:`\\begin{aligned}
\\text{penalisiert:} \\quad & \\min_{\\bbeta}\\; \\|\\by - \\bX\\bbeta\\|_2^2
+ \\lambda \\|\\bbeta\\|_p^p \\\\
\\text{beschränkt:} \\quad & \\min_{\\bbeta}\\; \\|\\by - \\bX\\bbeta\\|_2^2
\\quad \\text{unter} \\quad \\cred{\\|\\bbeta\\|_p^p \\le c},
\\end{aligned}`}),`
`,e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"p = 2"})," (Ridge) beziehungsweise ",e.jsx(n,{children:"p = 1"})," (Lasso)."]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.5.10 (KKT-Stationarität für Ridge)",id:"env-kkt-stationaritaet-fuer-ridge",children:[e.jsxs(i.p,{children:["Für Ridge (",e.jsx(n,{children:"p = 2"}),") ist die Lagrange-Funktion der beschränkten Form"]}),e.jsx(F,{children:"\\Lcal(\\bbeta, \\mu) = \\|\\by - \\bX\\bbeta\\|_2^2 + \\mu\\,\\bigl(\\|\\bbeta\\|_2^2 - c\\bigr),"}),e.jsxs(i.p,{children:[`und die Stationarität liefert mit den Gradienten aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"})]}),e.jsx(F,{children:`\\nabla_{\\bbeta} \\Lcal^\\top
= -2\\bX^\\top(\\by - \\bX\\bbeta) + 2\\mu\\bbeta = \\bnull
\\quad\\implies\\quad
\\wh{\\bbeta}_{\\text{Ridge}} = \\bigl(\\bX^\\top\\bX + \\mu\\bI\\bigr)^{-1}\\bX^\\top\\by .`}),e.jsxs(i.p,{children:["Das ist die Ridge-Lösung, der Multiplikator ",e.jsx(n,{children:"\\mu"}),` spielt die Rolle des
Strafparameters. Zu jedem `,e.jsx(n,{children:"\\lambda > 0"})," mit ",e.jsx(n,{children:"\\wh{\\bbeta}(\\lambda) \\neq \\bnull"}),`
gehört das bindende Budget `,e.jsx(n,{children:"c = \\|\\wh{\\bbeta}(\\lambda)\\|_2^2"}),` mit derselben Lösung
(im Sonderfall `,e.jsx(n,{children:"\\wh{\\bbeta}(\\lambda) = \\bnull"})," ist ",e.jsx(n,{children:"c = 0"}),`). Umgekehrt gilt das nur,
solange die Nebenbedingung bindet: Ist `,e.jsx(n,{children:"c"}),` so groß, dass der
Kleinste-Quadrate-Schätzer selbst zulässig ist, erzwingt die Komplementarität
`,e.jsx(n,{children:"\\mu = 0"}),", und das entspricht ",e.jsx(n,{children:"\\lambda = 0"}),". Welches ",e.jsx(n,{children:"c"})," zu welchem ",e.jsx(n,{children:"\\lambda"}),`
gehört, hängt von den Daten ab; eine Umrechnungsformel gibt es nicht. Für
`,e.jsx(n,{children:"\\mu > 0"})," ist ",e.jsx(n,{children:"\\bX^\\top\\bX + \\mu\\bI"}),` symmetrisch positiv definit, das System
also eindeutig lösbar (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),"), auch wenn ",e.jsx(n,{children:"\\bX"})," keinen vollen Rang hat."]})]}),`
`,e.jsx(D,{kind:"Bemerkung",label:"12.5.11 (Kreis gegen Raute: warum Lasso Nullen erzeugt)",id:"env-kreis-gegen-raute-warum-lasso-nullen",children:e.jsxs(i.p,{children:[`Geometrisch minimieren beide Verfahren dieselben elliptischen Höhenlinien
des Kleinste-Quadrate-Verlusts, nur über verschiedenen zulässigen Bereichen:
Ridge über der Kreisscheibe `,e.jsx(n,{children:"\\|\\bbeta\\|_2^2 \\le c"}),`, Lasso über der Raute
`,e.jsx(n,{children:"|\\beta_1| + |\\beta_2| \\le c"}),`. Verletzt der Kleinste-Quadrate-Schätzer die
Nebenbedingung, so liegt die Lösung dort, wo die um ihn herum wachsende
Ellipse den Bereich zuerst berührt. Einen Kreis trifft sie fast immer in
einem glatten Randpunkt, an dem beide Koordinaten von null verschieden sind.
Die Raute hat ihre Ecken auf den Achsen, und dort trifft die Ellipse häufig
zuerst auf; dann ist eine Koordinate exakt null. Dieser Ecken-Fall ist der
geometrische Grund für die Sparsity des Lasso. Formal steckt dahinter das Subdifferential der Betragsfunktion
(`,e.jsx(d,{id:"env:subgradient-und-subdifferential",href:"?k=11-konvexitaet#env-subgradient-und-subdifferential",children:"Definition 11.4.14"}),`): An den Ecken ist
`,e.jsx(n,{children:"\\|\\bbeta\\|_1"}),` nicht differenzierbar, die KKT-Stationarität gilt dort nur mit
Subgradienten, und gerechnet wird mit Subgradienten- oder Proximal-Verfahren.`]})}),`
`,e.jsxs(Me,{title:"Kreis gegen Raute",children:[e.jsxs(i.p,{children:["Das Widget parametrisiert beide Mengen über ihren sichtbaren Radius ",e.jsx(n,{children:"r"}),`, zeigt
also `,e.jsx(n,{children:"\\|\\bbeta\\|_2\\le r"})," und ",e.jsx(n,{children:"\\|\\bbeta\\|_1\\le r"}),`; für Ridge ist das Budget in der
Formel oben `,e.jsx(n,{children:"c=r^2"}),", für Lasso ",e.jsx(n,{children:"c=r"}),"."]}),e.jsx(Re,{variante:"bereich",frage:e.jsxs(e.Fragment,{children:["Bis zu welchem Radius ",e.jsx(n,{children:"r"})," bleibt die Lasso-Lösung in der Ecke, setzt also ",e.jsx(n,{children:"\\beta_2"})," exakt auf null?"]}),loesung:1.342857,toleranz:.15,min:.4,max:2.6,schritt:.05,start:1.5,einheit:"r",verdeckt:e.jsxs(e.Fragment,{children:["Der Ecken-Vermerk in der rechten Tafel verschwindet an dieser Schwelle, nämlich bei ",e.jsx(n,{children:"r = 1{,}3429"}),"."]}),children:e.jsx(Ms,{})}),e.jsxs(i.p,{children:["Unterhalb der Eckenschwelle steht die Lasso-Lösung exakt auf ",e.jsx(n,{children:"(r;\\, 0)"}),`, darüber
auf einer Kante der Raute mit beiden Koordinaten besetzt; die Ridge-Lösung wandert
am Kreisrand entlang und wird nie exakt null. Für große `,e.jsx(n,{children:"r"}),` wird die
Nebenbedingung inaktiv, bei Ridge ab `,e.jsx(n,{children:"\\|\\wh{\\bbeta}\\|_2 = 1{,}8358"}),`, beim Lasso ab
`,e.jsx(n,{children:"\\|\\wh{\\bbeta}\\|_1 = 2{,}5"}),`. Beide Male erzwingt die Komplementarität aus
`,e.jsx(d,{id:"env:karush-kuhn-tucker-bedingungen",href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"})," dann ",e.jsx(n,{children:"\\mu = 0"}),"."]})]}),`
`,e.jsx(D,{kind:"Satz",label:"12.5.12 (KKT und Konvexität)",id:"env-kkt-und-konvexitaet",children:e.jsxs(i.p,{children:["Sind ",e.jsx(n,{children:"f"})," und alle ",e.jsx(n,{children:"h_j"})," konvex und alle ",e.jsx(n,{children:"g_i"}),` affin, so ist jeder zulässige
Punkt `,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"}),`, der die KKT-Bedingungen erfüllt, ein globales
Minimum.`]})}),`
`,e.jsxs(i.p,{children:[`Diese Richtung braucht keine Regularitätsbedingung; die umgekehrte aus
`,e.jsx(d,{id:"env:karush-kuhn-tucker-bedingungen",href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"})," braucht sie auch bei konvexen Problemen."]}),`
`,e.jsxs(pe,{title:"Beweis und Grenzen von KKT bei konvexen Problemen",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Beweis."})," Mit festen ",e.jsx(n,{children:"\\lambda_i^\\star"})," und ",e.jsx(n,{children:"\\mu_j^\\star \\ge 0"}),` ist
`,e.jsx(n,{children:"\\Lcal(\\cdot, \\blambda^\\star, \\bmu^\\star)"}),` konvex, die Stationarität macht
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," zu ihrem Minimierer, und für jedes zulässige ",e.jsx(n,{children:"\\bx"})," gilt"]}),e.jsx(F,{children:`f(\\bx) \\;\\ge\\; \\Lcal(\\bx, \\blambda^\\star, \\bmu^\\star)
\\;\\ge\\; \\Lcal(\\bx^\\star, \\blambda^\\star, \\bmu^\\star) \\;=\\; f(\\bx^\\star) .`}),e.jsxs(i.p,{children:["Die erste Ungleichung nutzt ",e.jsx(n,{children:"g_i(\\bx) = 0"}),", ",e.jsx(n,{children:"h_j(\\bx) \\le 0"}),` und
`,e.jsx(n,{children:"\\mu_j^\\star \\ge 0"}),", die letzte Gleichheit die Komplementarität."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Umkehrung."}),` Die beiden Richtungen sind nicht symmetrisch, und die verbreitete
Kurzformel „im konvexen Fall sind die KKT-Bedingungen notwendig `,e.jsx(i.em,{children:"und"}),` hinreichend"
unterschlägt das. Bei `,e.jsx(n,{children:"\\min x"})," unter ",e.jsx(n,{children:"\\cred{h(x)} = x^2 \\le 0"}),` sind Ziel und
Nebenbedingung konvex, der einzige zulässige Punkt `,e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),` ist
das Optimum, und trotzdem erfüllt kein `,e.jsx(n,{children:"\\mu \\ge 0"}),` die Stationarität
`,e.jsx(n,{children:"1 + \\mu \\cdot 2x^\\star = 0"}),": Wegen ",e.jsx(n,{children:"x^\\star = 0"})," steht links immer ",e.jsx(n,{children:"1"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Viele statistische Probleme sind konvex: Kleinste Quadrate, Ridge, Lasso, die
negative `,e.jsx(d,{id:"likelihood",children:"Log-Likelihood"}),` einer Exponentialfamilie in ihrer
kanonischen Parametrisierung (`,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.5",children:"Abschnitt 11.5"}),`). Bei
nicht-konvexen Problemen wie neuronalen Netzen liefern die KKT-Bedingungen dagegen
nur Kandidaten, darunter auch lokale Optima und `,e.jsx(d,{id:"env:sattelpunkt",children:"Sattelpunkte"})," (",e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\cgreen{\\bx^\\star}"})," ein lokales Minimum von ",e.jsx(n,{children:"f"}),` unter
`,e.jsx(n,{children:"\\cred{g(\\bx)} = 0"}),", so gibt es immer ein ",e.jsx(n,{children:"\\lambda^\\star"}),` mit
`,e.jsx(n,{children:`\\corange{\\nabla f(\\bx^\\star)} + \\lambda^\\star \\corange{\\nabla g(\\bx^\\star)}
= \\bnull^\\top`}),"."]}),e.jsxs(i.p,{children:["Nur unter der Bedingung aus ",e.jsx(d,{id:"env:notwendige-bedingung-von-lagrange",href:"#env-notwendige-bedingung-von-lagrange",children:"Satz 12.5.5"}),". Bei ",e.jsx(n,{children:"f(x, y) = x"}),` unter
`,e.jsx(n,{children:"\\cred{g(x, y)} = y^2 - x^3 = 0"}),` liegt das Minimum im Ursprung, dort ist
`,e.jsx(n,{children:"\\corange{\\nabla g(0,0)} = \\bnull^\\top"}),", und ",e.jsx(n,{children:"\\corange{\\nabla f} = (1, 0)"}),`
lässt sich durch kein Vielfaches des Nullvektors ausgleichen.`]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Bei einer Gleichungsnebenbedingung darf der Multiplikator den Wert null
annehmen.`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-auch-null-ist-ein-zulaessiger",children:"Bemerkung 12.5.3"}),". Minimieren wir etwa ",e.jsx(n,{children:"f(x, y) = x^2 + y^2"}),` unter
`,e.jsx(n,{children:"\\cred{x + y = 0}"}),", so liegt das unbeschränkte Minimum ",e.jsx(n,{children:"(0, 0)"}),` selbst auf
der Nebenbedingung; dort ist `,e.jsx(n,{children:"\\corange{\\nabla f} = \\bnull^\\top"}),`, und die
Stationarität gilt mit `,e.jsx(n,{children:"\\lambda^\\star = 0"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:"Ist eine Ungleichung im Optimum aktiv, so ist ihr Multiplikator positiv."}),e.jsxs(i.p,{children:["Die Komplementarität ",e.jsx(n,{children:"\\mu_j\\, \\cred{h_j(\\bx^\\star)} = 0"}),` ist auch dann
erfüllt, wenn beide Faktoren null sind. Bei `,e.jsx(n,{children:"\\min x^2"}),` unter
`,e.jsx(n,{children:"\\cred{h(x)} = x \\le 0"})," ist ",e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),`, die Ungleichung also
aktiv, und die Stationarität `,e.jsx(n,{children:"2x^\\star + \\mu = 0"}),` liefert trotzdem
`,e.jsx(n,{children:"\\mu = 0"}),". Nur die andere Richtung trägt: inaktiv erzwingt ",e.jsx(n,{children:"\\mu_j = 0"}),"."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist die Lösung der penalisierten Ridge-Regression zu ",e.jsx(n,{children:"\\lambda>0"}),` von null
verschieden, so liefert `,e.jsx(n,{children:"c=\\|\\wh{\\bbeta}(\\lambda)\\|_2^2"}),` eine bindende
beschränkte Form mit derselben Lösung.`]}),e.jsxs(i.p,{children:["Wir lösen die penalisierte Form und setzen ",e.jsx(n,{children:"c := \\|\\wh{\\bbeta}(\\lambda)\\|_2^2"}),`.
Dann ist `,e.jsx(n,{children:"\\wh{\\bbeta}(\\lambda)"}),` zulässig, die Nebenbedingung aktiv, und mit
`,e.jsx(n,{children:"\\mu = \\lambda"})," sind alle KKT-Bedingungen erfüllt; ",e.jsx(d,{id:"env:kkt-und-konvexitaet",href:"#env-kkt-und-konvexitaet",children:"Satz 12.5.12"}),` macht daraus
das globale Optimum. Für `,e.jsx(n,{children:"\\bX"})," und ",e.jsx(n,{children:"\\by"})," aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ridge-regression",children:"Beispiel 10.6.6"}),`
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),") und ",e.jsx(n,{children:"\\lambda = 1{,}5"}),` ist
das `,e.jsx(n,{children:"\\wh{\\bbeta} = (0{,}341;\\, 0{,}578)"})," mit ",e.jsx(n,{children:"c = 0{,}450"}),`. Die Umkehrung
gilt dagegen nur, solange die Nebenbedingung bindet.`]})]}),e.jsxs(I,{wahr:!1,children:[e.jsx(i.p,{children:`Bei einem konvexen Problem erfüllt das globale Minimum stets die
KKT-Bedingungen.`}),e.jsxs(i.p,{children:[e.jsx(d,{id:"env:kkt-und-konvexitaet",href:"#env-kkt-und-konvexitaet",children:"Satz 12.5.12"}),` trägt nur die andere Richtung; für die notwendige braucht
es auch bei konvexen Problemen eine Regularitätsbedingung. Bei `,e.jsx(n,{children:"\\min x"}),` unter
`,e.jsx(n,{children:"\\cred{h(x)} = x^2 \\le 0"})," ist ",e.jsx(n,{children:"\\cgreen{x^\\star = 0}"}),` das Optimum, aber die
Stationarität `,e.jsx(n,{children:"1 + \\mu \\cdot 2x^\\star = 0"})," scheitert an jedem ",e.jsx(n,{children:"\\mu \\ge 0"}),"."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:"Die Lasso-Lösung muss nicht in einer Ecke der Raute liegen."}),e.jsxs(i.p,{children:[`In der Ecke liegt sie nur, solange das Budget klein genug ist. Im Widget sitzt
die Lösung für `,e.jsx(n,{children:"c \\le 1{,}30"})," exakt in ",e.jsx(n,{children:"(c;\\, 0)"}),", bei ",e.jsx(n,{children:"c = 1{,}40"}),` dagegen
liest das Readout `,e.jsx(n,{children:"(1{,}36;\\, 0{,}04)"}),`: beide Koordinaten sind besetzt. Die
Sparsity des Lasso ist eine Tendenz, keine Garantie.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath behandelt die beschränkte Optimierung in
§6.2.3 (Lagrange-Multiplikatoren, hinreichende Bedingungen) sowie §6.7
(Verfahren für Probleme mit Nebenbedingungen); die konvexe Theorie samt
KKT-Dualität entwickeln Boyd und Vandenberghe, Convex Optimization,
Kapitel 5.`})})]})}function Ds(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(st,{...r})}):st(r)}const Ns=K.blau,_s=K.gruen,tr=K.violett,ct=(r,i)=>{const t=r*r+Math.sin(3*i);return Math.log1p(t*t)+.1*r*r+.1*i*i},As=(r,i)=>{const t=r*r+Math.sin(3*i),a=2*t/(1+t*t);return[a*2*r+.2*r,a*3*Math.cos(3*i)+.2*i]},be=1.6,Se=320,Gn=96,ge=(r,i=2)=>T(r,i);function $s(r){let i=[r[0],r[1]];const t=[[i[0],i[1]]];for(let a=0;a<3e3;a++){const h=As(i[0],i[1]);i=[i[0]-.05*h[0],i[1]-.05*h[1]],a%15===0&&t.push([i[0],i[1]])}return t.push([i[0],i[1]]),{pfad:t,ende:i,fEnde:ct(i[0],i[1])}}const Ln=r=>(r+be)/(2*be)*Se,Rn=r=>(1-(r+be)/(2*be))*Se,Fs=[[-1,-.5],[-1,1],[-.5,-1]];function Bs(){const[r,i]=B.useState([-1,-.5]),t=B.useMemo(()=>{const o=[];for(let M=0;M<Gn;M++){const G=[];for(let f=0;f<Gn;f++){const v=-be+(f+.5)/Gn*2*be,z=be-(M+.5)/Gn*2*be;G.push(ct(v,z))}o.push(G)}return o},[]),a=B.useMemo(()=>$s(r),[r]),h=Li({feld:{x0:0,y0:0,w:Se,h:Se},welt:{x0:-be,x1:be,y0:-be,y1:be},clamp:([o,M])=>[wn(o,-be,be),wn(M,-be,be)],snap:.01,onDrag:([o,M])=>i([o,M])}),l=a.fEnde<.01,s=!l&&a.ende[1]>0,c=l?"ok":"warn",p=l?"im globalen Minimum gelandet":s?"in der oberen Mulde gelandet":"in der unteren Mulde gelandet",x=l?`Von (${ge(r[0])}; ${ge(r[1])}) aus läuft der Abstieg nach (0; 0) mit f = 0, dem globalen Minimum. Das ist der Glücksfall, und von außen nicht zu erkennen: Der Rückgabewert sieht genauso aus wie in den beiden anderen Fällen.`:`Von (${ge(r[0])}; ${ge(r[1])}) aus läuft der Abstieg nach (${ge(a.ende[0])}; ${ge(a.ende[1],4)}) mit f = ${ge(a.fEnde,4)}. Dort ist der Gradient null und die Hesse-Matrix positiv definit, es ist also ein sauberes lokales Minimum, nur liegt das globale bei (0; 0) mit f = 0 um ${ge(a.fEnde,4)} tiefer. Genau das meint ${O("bemerkung:falsche-konvergenz-und-keiner-warnt")} mit „falscher Konvergenz": Das Verfahren hat nichts falsch gemacht, es hat nur nicht gefunden, was wir suchen. Abhilfe schafft keine bessere Schrittweite, sondern nur ein anderer Startpunkt.`,w=Se/Gn,y=B.useMemo(()=>t.map((o,M)=>o.map((G,f)=>{const v=Math.min(1,G/2.2),z=Math.round(248-v*130);return e.jsx("rect",{x:f*w,y:M*w,width:w+.5,height:w+.5,fill:`rgb(${z}, ${z}, ${z})`},M*Gn+f)})),[t,w]);return e.jsxs("div",{className:"my-2 space-y-3",children:[e.jsx(De,{children:"Setzen wir den Startpunkt an drei verschiedene Stellen und vergleichen die drei Endwerte f(Ende)."}),e.jsx("div",{className:"flex flex-wrap gap-2 text-sm",children:Fs.map(o=>{const M=Math.abs(r[0]-o[0])<1e-9&&Math.abs(r[1]-o[1])<1e-9;return e.jsxs("button",{type:"button","aria-pressed":M,onClick:()=>i(o),className:`${M?Ke:$e} font-mono text-xs`,children:["Start (",ge(o[0],1),"; ",ge(o[1],1),")"]},o.join(","))})}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("svg",{viewBox:`0 0 ${Se} ${Se}`,width:Se,height:Se,role:"img","aria-label":`Höhenkarte der Beispielfunktion mit der Abstiegsbahn von (${ge(r[0])}; ${ge(r[1])}) nach (${ge(a.ende[0])}; ${ge(a.ende[1],2)}).`,className:"max-w-full h-auto rounded border border-slate-300",...h.svgProps,...h.surfaceProps("p"),children:[y,[-1,0,1].concat([1.5]).map(o=>e.jsxs("g",{"aria-hidden":"true",children:[e.jsx("line",{x1:Ln(o),x2:Ln(o),y1:Se-6,y2:Se,stroke:"#94a3b8",strokeWidth:1}),e.jsx("text",{x:Ln(o),y:Se-9,fontSize:9,textAnchor:"middle",fill:"#475569",children:ge(o,1)}),e.jsx("line",{x1:0,x2:6,y1:Rn(o),y2:Rn(o),stroke:"#94a3b8",strokeWidth:1}),e.jsx("text",{x:9,y:Rn(o)+3,fontSize:9,fill:"#475569",children:ge(o,1)})]},`tick${o}`)),e.jsx("text",{x:Se-4,y:Se-9,fontSize:9,textAnchor:"end",fill:"#475569",children:"x₁ →"}),e.jsx("text",{x:9,y:12,fontSize:9,fill:"#475569",children:"x₂ ↑"}),e.jsx("polyline",{points:a.pfad.map(([o,M])=>`${Ln(o)},${Rn(M)}`).join(" "),fill:"none",stroke:Ns,strokeWidth:2}),e.jsx("circle",{cx:Ln(a.ende[0]),cy:Rn(a.ende[1]),r:5,fill:_s}),e.jsx(Ri,{x:Ln(r[0]),y:Rn(r[1]),farbe:tr,r:5,aktiv:h.dragging==="p",...h.handleProps("p")})]}),e.jsxs("div",{className:"min-w-52 space-y-2 text-sm",children:[e.jsxs("p",{className:"font-mono text-xs",children:["Start: (",ge(r[0]),"; ",ge(r[1]),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["Ende: (",ge(a.ende[0]),"; ",ge(a.ende[1],4),")"]}),e.jsxs("p",{className:"font-mono text-xs",children:["f(Ende) = ",ge(a.fEnde,4)]}),e.jsx(se,{label:"Start x₁",value:r[0],onChange:o=>i([Math.round(o*100)/100,r[1]]),min:-be,max:be,step:.01,accent:tr}),e.jsx(se,{label:"Start x₂",value:r[1],onChange:o=>i([r[0],Math.round(o*100)/100]),min:-be,max:be,step:.01,accent:tr}),e.jsx("p",{className:"text-xs text-slate-600 dark:text-slate-400",children:"Helle Flächen liegen tief, dunkle hoch. Vom violetten Startpunkt läuft der Gradientenabstieg über 3000 Schritte mit γ = 0,05 (blaue Spur) bis zum Grenzwert (grün)."})]})]}),e.jsx(Ne,{kind:c,titel:p,children:x})]})}function lt(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Zum Abschluss übersetzen wir die Verfahren dieses Kapitels in R-Aufrufe:
`,e.jsx(i.code,{children:"optimize()"})," für univariate und ",e.jsx(i.code,{children:"optim()"}),` für multivariate Zielfunktionen. Die
Ausgaben drucken wir nicht ab; die Beispielfunktion rechnet das Widget selbst nach.`]}),`
`,e.jsx(i.h3,{children:"Univariat: optimize"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`f <- function(x) (x - 3)^2
optimize(f, interval = c(0, 10))
`})}),`
`,e.jsxs(i.p,{children:["Der Aufruf sucht das Minimum von ",e.jsx(n,{children:"f"})," auf dem Intervall ",e.jsx(n,{children:"[0, 10]"}),`. Das
analytische Minimum ist `,e.jsx(n,{children:"\\cgreen{x^\\star = 3}"})," mit ",e.jsx(n,{children:"f(x^\\star) = 0"}),`; genauer als
das voreingestellte `,e.jsx(i.code,{children:"tol"}),` trifft es der Aufruf nicht, und das steht auf
`,e.jsx(i.code,{children:".Machine$double.eps^0.25"}),", also auf rund ",e.jsx(n,{children:"1{,}2\\cdot 10^{-4}"}),"."]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.6.1 (Golden Section Search)",id:"env-golden-section-search",children:[e.jsxs(i.p,{children:[e.jsx(i.code,{children:"optimize()"})," verwendet die ",e.jsx(i.em,{children:"Golden Section Search"}),`, eine Verwandte der Bisektion aus
`,e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),`, die statt eines Vorzeichenwechsels ein Minimum
einschachtelt. Zwei innere Testpunkte teilen das Intervall im Verhältnis des
goldenen Schnitts; in jedem Schritt fällt das Teilintervall weg, das das Minimum
nicht enthalten kann, und weil ein Testpunkt wiederverwendet wird, genügt ein
neuer Funktionswert. So schrumpft das Intervall ohne Ableitungen pro Schritt auf
das `,e.jsx(n,{children:"0{,}618"}),"-fache. Verlässlich ist das für ",e.jsx(i.em,{children:"unimodale"}),` Funktionen, die bis zu
einer Minimalstelle nicht ansteigen und danach nicht mehr fallen; ein eindeutiges
`,e.jsx(d,{id:"env:lokales-und-globales-minimum",children:"globales Minimum"})," allein genügt nicht."]}),e.jsxs(i.p,{children:["Dazu kommt eine parabolische Interpolation (zusammen heißt das ",e.jsx(i.em,{children:"Brent-Verfahren"}),`):
Solange es die drei zuletzt berechneten Punkte erlauben, springt der nächste
Testpunkt in den Scheitel der Parabel durch sie. Führt der Sprung aus dem
eingeschachtelten Intervall oder bringt er zu wenig, greift wieder der goldene
Schnitt, sodass die Einschachtelung erhalten bleibt.`]})]}),`
`,e.jsx(i.h3,{children:"Multivariat: optim"}),`
`,e.jsx(i.p,{children:"Als Testfall dient uns die Funktion"}),`
`,e.jsx(ne,{tag:"12.6.1",id:"eq-eq-12-6-1",children:`f(\\bx) = \\log\\bigl(1 + (x_1^2 + \\sin 3x_2)^2\\bigr)
+ 0{,}1\\,x_1^2 + 0{,}1\\,x_2^2 ,`}),`
`,e.jsxs(i.p,{children:["deren erster Term entlang der Kurven ",e.jsx(n,{children:"x_1^2 + \\sin 3x_2 = 0"}),` verschwindet,
während die quadratischen Terme zum Ursprung ziehen. Das globale Minimum ist
`,e.jsx(n,{children:"\\cgreen{\\bx^\\star = (0;\\ 0)}"})," mit ",e.jsx(n,{children:"f(\\bx^\\star) = 0"}),`; im Fenster des Widgets
liegen daneben genau zwei lokale Mulden.`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`f <- function(x) log1p((x[1]^2 + sin(3*x[2]))^2) +
  .1 * x[1]^2 + .1 * x[2]^2
optim(c(-1, -0.5), f)                     # Default: Nelder-Mead
optim(c(-1, -0.5), f, method = "BFGS")
`})}),`
`,e.jsxs(i.p,{children:["Ohne ",e.jsx(i.code,{children:"method"}),"-Argument verwendet ",e.jsx(i.code,{children:"optim()"}),` das ableitungsfreie
`,e.jsx(d,{id:"nelder-mead",children:"Nelder-Mead-Verfahren"}),` aus
`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),", mit ",e.jsx(i.code,{children:'method = "BFGS"'}),` das Quasi-Newton-Verfahren aus
`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),"; den ",e.jsx(d,{id:"env:gradient",children:"Gradienten"})," schätzt es dann mangels ",e.jsx(i.code,{children:"gr"}),`-Argument durch finite
Differenzen. Ein über `,e.jsx(i.code,{children:"gr"}),` übergebener Gradient wechselt die Methode nicht, das
tut nur `,e.jsx(i.code,{children:"method"}),`. Von diesem
Startpunkt aus landen beide Verfahren im globalen Minimum.`]}),`
`,e.jsxs(D,{kind:"Bemerkung",label:"12.6.2 (Falsche Konvergenz ohne Warnung)",id:"env-falsche-konvergenz-und-keiner-warnt",children:[e.jsx(i.p,{children:"Drei Aufrufe zeigen zwei Probleme:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`optim(c(-1, 1), f)                                # Nelder-Mead
optim(c(-0.5, -1), f, method = "BFGS")            # BFGS
optim(c(-1, -0.5), f, control = list(maxit = 50)) # abgeschnitten
`})}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Lokale Minima."}),` Die beiden spiegelbildlichen Mulden liegen bei
`,e.jsx(n,{children:"(0;\\ \\pm 1{,}04)"})," mit ",e.jsx(n,{children:"f \\approx 0{,}11"}),". Vom Startpunkt ",e.jsx(n,{children:"(-1;\\ 1)"}),` aus endet der
Lauf in der oberen, von `,e.jsx(n,{children:"(-0{,}5;\\ -1)"})," aus in der unteren, und ",e.jsx(i.code,{children:"optim()"}),` meldet
trotzdem Konvergenz: `,e.jsx(i.code,{children:"convergence = 0"}),` heißt nur, dass ein Abbruchkriterium
erfüllt ist, nicht, dass das Ergebnis global optimal ist (`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Abgebrochene Läufe."}),` Begrenzen wir die Iterationen, etwa mit
`,e.jsx(i.code,{children:"control = list(maxit = 50)"}),", kann ",e.jsx(i.code,{children:"optim()"}),` mitten am Hang stehen bleiben.
Das Ergebnis sieht aus wie immer, nur der `,e.jsx(i.code,{children:"convergence"}),`-Code (dann
`,e.jsx(n,{children:"\\neq 0"}),`) verrät den Abbruch; eine Warnung gibt es nicht. Abbruchkriterien
prüfen heißt hier: den Rückgabewert lesen, statt sich auf `,e.jsx(i.code,{children:"warnings()"}),` zu
verlassen (`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),", Abbruchkriterien)."]})]}),`
`,e.jsxs(Me,{title:"Die Landkarte zur Beispielfunktion",children:[e.jsxs(i.p,{children:["Das Widget zeichnet die Funktion aus ",e.jsx(i.a,{href:"#eq-eq-12-6-1",children:"(12.6.1)"}),` als Karte und lässt uns den
Startpunkt setzen, per Klick, per Zug oder über die beiden Regler. Weil das
Widget mit Gradientenabstieg rechnet, sind das die Einzugsgebiete `,e.jsx(i.em,{children:"dieses"}),`
Verfahrens; Nelder-Mead und BFGS nehmen andere Wege und können von manchen
Startpunkten aus in einer anderen Mulde enden als die blaue Spur.`]}),e.jsx(Re,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Wie viele verschiedene Grenzwerte findet der Gradientenabstieg auf diesem Ausschnitt?"}),optionen:[{id:"eins",text:"genau einen"},{id:"drei",text:"drei"},{id:"viele",text:"unübersichtlich viele"}],loesung:"drei",verdeckt:e.jsxs(e.Fragment,{children:["Es sind genau drei: das globale Minimum ",e.jsx(n,{children:"(0;\\ 0)"})," mit ",e.jsx(n,{children:"f = 0"})," und zwei lokale Mulden bei ",e.jsx(n,{children:"(0;\\ \\pm 1{,}0357)"})," mit ",e.jsx(n,{children:"f = 0{,}1085"}),"."]}),children:e.jsx(Bs,{})}),e.jsxs(i.p,{children:["Von den drei voreingestellten Startpunkten führt ",e.jsx(n,{children:"(-1;\\ -0{,}5)"}),` ins globale
Minimum, `,e.jsx(n,{children:"(-1;\\ 1)"})," in die obere und ",e.jsx(n,{children:"(-0{,}5;\\ -1)"}),` in die untere Mulde. Alle drei
Läufe enden regulär, mit Gradient null, positiv definiter `,e.jsx(d,{id:"env:hesse-matrix",children:"Hesse-Matrix"}),` und ohne
Warnung, und doch landen zwei im falschen Minimum. Dagegen hilft keine bessere
Schrittweite, nur weitere Startpunkte.`]})]}),`
`,e.jsx(i.h3,{children:"Der analytische Gradient"}),`
`,e.jsxs(i.p,{children:["Wer den Gradienten kennt, sollte ihn ",e.jsx(i.code,{children:"optim()"}),` übergeben: Finite Differenzen
kosten pro Gradient `,e.jsx(n,{children:"n"})," (einseitig) oder ",e.jsx(n,{children:"2n"}),` (zentral) zusätzliche
Funktionsauswertungen und bringen Rundungsfehler mit (`,e.jsx(i.a,{href:"?k=04-fehler",children:"Kapitel 4"}),`). Der
analytische Gradient ist schneller und genauer.`]}),`
`,e.jsxs(D,{kind:"Beispiel",label:"12.6.3 (Kettenregel für die Beispielfunktion)",id:"env-kettenregel-fuer-die-beispielfunktion",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"u(\\bx) = x_1^2 + \\sin 3x_2"})," ist ",e.jsx(n,{children:`f = \\log(1 + u^2) + 0{,}1x_1^2 +
0{,}1x_2^2`}),", und die ",e.jsx(d,{id:"chain-rule",children:"Kettenregel"}),`
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),`) liefert wegen
`,e.jsx(n,{children:"\\tfrac{d}{du}\\log(1 + u^2) = \\tfrac{2u}{1 + u^2}"}),":"]}),e.jsx(F,{children:`\\corange{\\nabla f(\\bx)} = \\left(
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
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Methode"}),e.jsx(i.th,{children:"Wann verwenden?"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Bisektion, Newton-Raphson"}),e.jsxs(i.td,{children:["Nullstellen ",e.jsx(n,{children:"f(x) = 0"}),"; Bisektion nur univariat"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Nelder-Mead"}),e.jsxs(i.td,{children:["Keine Ableitungen, niedrige Dimension (",e.jsx(n,{children:"n \\le 10"}),")"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Gradientenabstieg"}),e.jsx(i.td,{children:"Große Probleme, einfache Implementierung"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Quasi-Newton (BFGS)"}),e.jsx(i.td,{children:"Mittlere Probleme, guter Kompromiss"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Newton"}),e.jsx(i.td,{children:"Kleine Probleme, schnelle Konvergenz nötig"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Momentum"}),e.jsx(i.td,{children:"Gradientenabstieg bei schlecht konditionierten Problemen"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"SGD"}),e.jsx(i.td,{children:"Sehr große Datensätze und hohe Dimension"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lagrange/KKT"}),e.jsx(i.td,{children:"Nebenbedingungen"})]})]})]}),`
`,e.jsx(i.h3,{children:"Was bleibt"}),`
`,e.jsx(D,{kind:"Bemerkung",label:"12.6.4 (Kernkonzepte des Kapitels)",id:"env-optim-in-r-kernkonzepte-des-kapitels",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Nichtlineare Gleichungen:"}),` Die Bisektion halbiert verlässlich, aber
langsam; Newton-Raphson konvergiert lokal quadratisch,
`,e.jsx(n,{children:"e_{k+1} \\approx C\\,e_k^2"})," (",e.jsx(i.a,{href:"#sec-12.1",children:"Abschnitt 12.1"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Optimalität"}),` heißt stationär plus Krümmungsbedingung; ohne Konvexität
drohen lokale Minima und Sattelpunkte (`,e.jsx(i.a,{href:"#sec-12.2",children:"Abschnitt 12.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Gradientenabstieg"})," hängt an der Schrittweite; für ",e.jsx(n,{children:"\\gamma = 1/L"}),` konvergiert
er bei starker Konvexität linear mit `,e.jsx(n,{children:"\\rho = 1 - \\mu/L"}),`, und die
`,e.jsx(d,{id:"condition-number",children:"Kondition"})," ",e.jsx(n,{children:"\\kappa_f = L/\\mu"}),` bestimmt den Zickzack
(`,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Newton und Quasi-Newton"}),` konvergieren mit Krümmungsinformation schneller,
bei teureren Schritten; SGD ersetzt den Gradienten durch einen unverzerrten
Schätzer aus zufällig gezogenen Beobachtungen (`,e.jsx(i.a,{href:"#sec-12.4",children:"Abschnitt 12.4"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Nebenbedingungen:"}),` Lagrange-Multiplikatoren und KKT-Bedingungen bringen die
Gradienten von Ziel und Nebenbedingungen ins Gleichgewicht; Ridge und Lasso sind
die statistischen Musterbeispiele (`,e.jsx(i.a,{href:"#sec-12.5",children:"Abschnitt 12.5"}),")."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Ce,{children:[e.jsxs(I,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Bisektion auf ",e.jsx(n,{children:"[0, 8]"}),` braucht für die Zielgenauigkeit
`,e.jsx(n,{children:"\\epsilon = 10^{-3}"})," genau ",e.jsx(n,{children:"13"})," Halbierungen."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(d,{id:"env:schrittzahl-der-bisektion",href:"#env-schrittzahl-der-bisektion",children:"Satz 12.1.8"}),` sind es
`,e.jsx(n,{children:"\\lceil \\log_2((b - a)/\\epsilon) \\rceil = \\lceil \\log_2 8000 \\rceil"}),`
Schritte, und wegen `,e.jsx(n,{children:"2^{12} = 4096 < 8000 \\le 8192 = 2^{13}"})," sind das ",e.jsx(n,{children:"13"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Gradientenabstieg auf ",e.jsx(n,{children:"f(x) = x^2"}),` konvergiert für jede feste
Schrittweite `,e.jsx(n,{children:"\\gamma > 0"}),"."]}),e.jsxs(i.p,{children:["Der Schritt lautet ",e.jsx(n,{children:"x^{(k+1)} = (1 - 2\\gamma)\\,x^{(k)}"}),`. Für
`,e.jsx(n,{children:"\\gamma \\ge 1"})," ist ",e.jsx(n,{children:"|1 - 2\\gamma| \\ge 1"}),": Bei ",e.jsx(n,{children:"\\gamma = 1"}),` springt die
Iteration zwischen `,e.jsx(n,{children:"x^{(0)}"})," und ",e.jsx(n,{children:"-x^{(0)}"})," hin und her, für ",e.jsx(n,{children:"\\gamma > 1"}),`
wächst der Betrag sogar. Konvergenz braucht hier `,e.jsx(n,{children:"\\gamma < 1 = 2/L"}),` mit
`,e.jsx(n,{children:"L = 2"})," (",e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Meldet ",e.jsx(i.code,{children:"optim()"})," ",e.jsx(i.code,{children:"convergence = 0"}),", so hat es das globale Minimum gefunden."]}),e.jsxs(i.p,{children:[e.jsx(i.code,{children:"convergence = 0"}),` heißt nur, dass ein Abbruchkriterium erfüllt ist. Ein lokales
Minimum wie die beiden Mulden der Beispielfunktion erfüllt es genauso
(`,e.jsx(i.a,{href:"#env-falsche-konvergenz-und-keiner-warnt",children:"Bemerkung 12.6.2"}),")."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["In den KKT-Bedingungen müssen auch die Multiplikatoren ",e.jsx(n,{children:"\\lambda_i"}),` der
Gleichungsnebenbedingungen nichtnegativ sein.`]}),e.jsxs(i.p,{children:["Nur die ",e.jsx(n,{children:"\\mu_j"}),` der Ungleichungen tragen die Vorzeichenbedingung
`,e.jsx(n,{children:"\\mu_j \\ge 0"}),"; die ",e.jsx(n,{children:"\\lambda_i"})," sind frei. ",e.jsx(i.a,{href:"#env-minimieren-auf-einer-geraden",children:"Beispiel 12.5.6"}),` hat
`,e.jsx(n,{children:"\\lambda^\\star = -1"}),"."]})]}),e.jsxs(I,{wahr:!0,children:[e.jsx(i.p,{children:`Ist eine Ungleichungs-Nebenbedingung im Optimum inaktiv, so ist ihr
KKT-Multiplikator null.`}),e.jsxs(i.p,{children:["Das ist die Komplementarität ",e.jsx(n,{children:"\\mu_j h_j(\\bx^\\star) = 0"}),` aus
`,e.jsx(d,{id:"env:karush-kuhn-tucker-bedingungen",href:"#env-karush-kuhn-tucker-bedingungen",children:"Satz 12.5.7"}),": Aus ",e.jsx(n,{children:"h_j(\\bx^\\star) < 0"})," folgt ",e.jsx(n,{children:"\\mu_j = 0"}),`. In
`,e.jsx(i.a,{href:"#env-eine-box-beschraenkung",children:"Beispiel 12.5.9"})," gilt das für die untere Schranke."]})]}),e.jsxs(Ki,{loesung:.1085,toleranz:.005,children:[e.jsxs(i.p,{children:[`Welchen Funktionswert erreicht der Gradientenabstieg im Landkarten-Widget, wenn
wir bei `,e.jsx(n,{children:"(-1;\\ 1)"})," starten?"]}),e.jsxs(i.p,{children:["Er landet in der oberen Mulde bei ",e.jsx(n,{children:"(0;\\ 1{,}0357)"})," mit ",e.jsx(n,{children:"f = 0{,}1085"}),`. Das
globale Minimum liegt bei `,e.jsx(n,{children:"(0;\\ 0)"})," mit ",e.jsx(n,{children:"f = 0"}),`, also gut ein Zehntel tiefer.
Der Lauf endet trotzdem mit verschwindendem Gradienten und ohne Warnung, also mit
„falscher Konvergenz" im Sinn von `,e.jsx(i.a,{href:"#env-falsche-konvergenz-und-keiner-warnt",children:"Bemerkung 12.6.2"}),"."]})]}),e.jsxs(I,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"-\\nabla f"}),` die Richtung des steilsten Abstiegs ist, verkleinert
jeder Gradientenabstiegs-Schritt den Funktionswert.`]}),e.jsxs(i.p,{children:["Die Richtung stimmt, solange ",e.jsx(n,{children:"\\nabla f \\neq \\bnull^\\top"}),` ist, aber die
Schrittweite kann den Abstieg überschießen: Auf `,e.jsx(n,{children:"f(x) = x^2"}),` mit
`,e.jsx(n,{children:"\\gamma = 1"})," gilt ",e.jsx(n,{children:"x^{(k+1)} = -x^{(k)}"}),` und der Funktionswert bleibt exakt
gleich, mit `,e.jsx(n,{children:"\\gamma > 1"}),` wächst er. Dagegen sichert die
Armijo-Bedingung aus `,e.jsx(i.a,{href:"#sec-12.3",children:"Abschnitt 12.3"})," ab."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath, Scientific Computing, behandelt in Kapitel 5 die
nichtlinearen Gleichungen und in Kapitel 6 die Optimierung, jeweils mit den
hier gezeigten Verfahren; die R-Seite dokumentieren die Hilfeseiten zu
`,e.jsx(i.code,{children:"optimize()"})," und ",e.jsx(i.code,{children:"optim()"}),`. Zum stochastischen Gradientenabstieg führt der
MSc-Kurs `,e.jsx(i.a,{href:"https://slds-lmu.github.io/website_optimization/",children:"Optimization for ML"}),`
weiter.`]})})]})}function Gs(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(lt,{...r})}):lt(r)}function at(r){const i={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsx(i.p,{children:`Wer den Stoff dieses Kapitels an weiteren Aufgaben üben möchte, findet sie in
den Lehrbüchern der Vorlesung. Die Tabellen listen passende Aufgaben, die
lohnendsten zuerst. Deutsche Übersetzungen der Aufgabenstellungen und
ausführliche Musterlösungen stehen auf der Kurs-Webseite.`}),`
`,e.jsxs(i.p,{children:[`Die Sterne schätzen ein, wie viel eine Aufgabe für diese Vorlesung bringt.
`,e.jsx(n,{children:"\\bigstar\\bigstar\\bigstar"})," heißt ",e.jsx(i.em,{children:"empfohlen"}),`: zentraler Kursstoff, nah an
Klausuraufgaben. `,e.jsx(n,{children:"\\bigstar\\bigstar"})," heißt ",e.jsx(i.em,{children:"lohnend"}),`: Kursstoff, aber ein
Randthema oder ein anderer Aufgabentyp als in der Klausur. `,e.jsx(n,{children:"\\bigstar"}),` heißt
`,e.jsx(i.em,{children:"Vertiefung"}),`: geht größtenteils über den Kursstoff hinaus oder wiederholt nur
Grundlagen. Der Aufwand ist grob geschätzt, für eine Bearbeitung ohne Blick in
die Lösung.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Empfohlen"})," (",e.jsx(n,{children:"\\bigstar\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.14"}),e.jsx(i.td,{children:"Ein Newton-Schritt – exakt beim Minimieren, nicht beim Nullstellensuchen"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.3"}),e.jsxs(i.td,{children:["Optimalitätsbedingungen für ",e.jsx(n,{children:"x^2"}),", ",e.jsx(n,{children:"x^3"}),", ",e.jsx(n,{children:"x^4"})," und ",e.jsx(n,{children:"-x^4"})]}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.5"}),e.jsxs(i.td,{children:["Kritische Punkte im ",e.jsx(n,{children:"\\R^2"})," klassifizieren"]}),e.jsx(i.td,{children:"mittel, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.23"}),e.jsx(i.td,{children:"Gradientenabstieg – wann versagt er, wann konvergiert er schnell?"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.27"}),e.jsx(i.td,{children:"Schrittweitensteuerung bei Gradientenabstieg und Newton"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.9"}),e.jsx(i.td,{children:"Newton und Gradientenabstieg bei quadratischer Zielfunktion"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.8"}),e.jsx(i.td,{children:"Ein Newton-Schritt für die Rosenbrock-Funktion – gut und schlecht zugleich"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.6"}),e.jsx(i.td,{children:"Kritische Punkte der Lagrange-Funktion klassifizieren"}),e.jsx(i.td,{children:"mittel, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.38"}),e.jsx(i.td,{children:"Was sind Lagrange-Multiplikatoren – und wozu?"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.39"}),e.jsx(i.td,{children:"Lagrange-Funktion und notwendige Optimalitätsbedingung"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Lohnend"})," (",e.jsx(n,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 7.1"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"k"}),"-te Wurzel mit dem Newton-Verfahren"]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 7.6"}),e.jsx(i.td,{children:"Newton-Verfahren für konvexe Funktionen"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.4"}),e.jsxs(i.td,{children:["Kritische Punkte kubischer Polynome und von ",e.jsx(n,{children:"x^2 e^x"})]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.1"}),e.jsxs(i.td,{children:["Stationäre Punkte von ",e.jsx(n,{children:"x^3 + 6x^2 - 3x - 5"})]}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.15"}),e.jsx(i.td,{children:"Konvergenzraten univariater Minimierungsverfahren"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.16"}),e.jsx(i.td,{children:"Konvergenzraten multivariater Minimierungsverfahren"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.2"}),e.jsx(i.td,{children:"SGD-Update bei Mini-Batch-Größe 1"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.24"}),e.jsx(i.td,{children:"Wann nützt eine Liniensuche beim Newton-Verfahren – und wann nicht?"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.25"}),e.jsx(i.td,{children:"Welche Faktorisierung für welches lineare Teilproblem?"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.30"}),e.jsx(i.td,{children:"Worauf reduziert sich die erste BFGS-Iteration?"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 6.19 b), c)"}),e.jsx(i.td,{children:"Maximale Iterationszahl bei quadratischer Zielfunktion"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 6.7"}),e.jsx(i.td,{children:"Optimalitätsbedingungen unter einer linearen Nebenbedingung"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Computer Problem 6.9"}),e.jsx(i.td,{children:"Steepest Descent, Newton und gedämpftes Newton für die Rosenbrock-Funktion"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Vertiefung"})," (",e.jsx(n,{children:"\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.5"}),e.jsx(i.td,{children:"Lineares Programm in Standardform"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.6"}),e.jsx(i.td,{children:"Duales lineares Programm via Lagrange-Dualität"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.7"}),e.jsx(i.td,{children:"Duales quadratisches Programm via Lagrange-Dualität"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 7.8"}),e.jsxs(i.td,{children:["Lagrange-duales Problem für ",e.jsx(n,{children:"\\min \\frac{1}{2}\\bw^T\\bw"})," unter ",e.jsx(n,{children:"\\bw^T\\bx \\geq 1"})]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:["Bücher: Heath: ",e.jsx(i.em,{children:"Scientific Computing"})," (2. Aufl.); Schaback/Wendland: ",e.jsx(i.em,{children:"Numerische Mathematik"})," (5. Aufl.); Deisenroth et al. (MML): ",e.jsx(i.em,{children:"Mathematics for Machine Learning"}),"."]})]})}function Ls(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(at,{...r})}):at(r)}const Es={sections:[{id:"12.1",key:"nichtlineare-gleichungen",title:"Nichtlineare Gleichungen",C:an(_t)},{id:"12.2",key:"optimalitaet",title:"Optimalität und Sattelpunkte",C:an(Ft)},{id:"12.3",key:"nelder-mead-gradient",title:"Nelder-Mead und Gradientenabstieg",C:an(es)},{id:"12.4",key:"newton-sgd",title:"Newton, Quasi-Newton und SGD",C:an(gs)},{id:"12.5",key:"beschraenkt",title:"Beschränkte Optimierung",C:an(Ds)},{id:"12.6",key:"optim-in-r",title:"Optimierung in R und Zusammenfassung",C:an(Gs)},{id:"12.7",key:"uebungen",title:"Übungsempfehlungen",C:an(Ls)}]};export{Es as default};
