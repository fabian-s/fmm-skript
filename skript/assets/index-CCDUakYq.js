import{r as I,u as qe,j as e,V as A,M as n,g as s,b as N,A as me,F as W,D as De,f as ie,e as Fe,z as Ze,S as U,s as ee,B as Xe,C as b,E as R,a as g,P as Ge,n as L,G as bn,Q as Le,i as ge,Z as _e,W as Ye,d as Ve,o as mn,p as jn,h as un,x as pn,y as fn,m as Me}from"./index-GbyLwDE5.js";import{I as be,E as nn}from"./Interaktiv-DHZUUTxv.js";const je=W.gruen,oe=W.blau,fe=W.rot,xe=W.orange,rn=W.violett;function kn(i){const r="⁰¹²³⁴⁵⁶⁷⁸⁹";return(i<0?"⁻":"")+String(Math.abs(i)).split("").map(t=>r[Number(t)]).join("")}function ce(i,r=3){if(!Number.isFinite(i))return s(i,r);const t=Math.abs(i);if(t===0)return"0";if(t>=.001&&t<1e5)return s(i,Math.max(0,r-Math.max(0,Math.floor(Math.log10(t)))));const d=Math.floor(Math.log10(t));return`${s(i/10**d,r-1)} · 10${kn(d)}`}function wn(i,r){let t=1,d=1;for(let h=1;h<=r;h++)t*=i/h,d+=t;return d}const Pe=320,le=36,ae=12,ke=Pe-le-12,we=Pe-ae-30,Y=-.7,he=5.6,M=i=>le+(i-Y)/(he-Y)*ke,E=i=>ae+we-(i-Y)/(he-Y)*we,q=ke/(he-Y);function tn({x:i,y:r,farbe:t,breite:d=2}){const h=Math.hypot(i,r);if(h<1e-9)return null;const[l,o]=[i/h,r/h],k=Math.min(.32,h*.5),x=i-l*k,m=r-o*k,[a,c]=[-o*k*.38,l*k*.38];return e.jsxs("g",{pointerEvents:"none",children:[e.jsx("line",{x1:M(0),y1:E(0),x2:M(x),y2:E(m),stroke:t,strokeWidth:d}),e.jsx("polygon",{points:`${M(i)},${E(r)} ${M(x+a)},${E(m+c)} ${M(x-a)},${E(m-c)}`,fill:t})]})}function vn({label:i,aria:r,roh:t,onRoh:d}){return e.jsxs("label",{className:"flex items-center gap-1.5 text-sm",children:[e.jsx("span",{className:ie,children:i}),e.jsx("input",{type:"text",inputMode:"decimal","aria-label":r,className:`w-20 text-right font-mono ${Xe}`,value:t,onChange:h=>d(h.target.value)})]})}function zn(){const[i,r]=I.useState([3,4]),[t,d]=I.useState([3.2,4.3]),[h,l]=I.useState({}),o=[t[0]-i[0],t[1]-i[1]],k=Math.hypot(o[0],o[1]),x=Math.hypot(i[0],i[1]),m=Math.hypot(t[0],t[1]),a=x>0?k/x:NaN,c=x*(1-a),z=x*(1+a),y=.1*x,S=u=>[ee(u[0],Y+.1,he-.1),ee(u[1],Y+.1,he-.1)],v=qe({feld:{x0:le,y0:ae,w:ke,h:we},welt:{x0:Y,x1:he,y0:Y,y1:he},clamp:u=>S(u),greifPosition:u=>u==="v"?i:t,onDrag:(u,K)=>{const O=[Math.round(u[0]*100)/100,Math.round(u[1]*100)/100];l({}),K==="v"?r(O):d(O)}}),j=(u,K,O,H,de)=>e.jsx(vn,{label:K,aria:O,roh:h[u]??s(H,2),onRoh:ne=>{l(Oe=>({...Oe,[u]:ne}));const Ne=Number(ne.trim().replace(/,/g,".").replace(/−/g,"-"));ne.trim()!==""&&Number.isFinite(Ne)&&de(ee(Ne,Y+.1,he-.1))}}),$=[0,1,2,3,4,5],p=x<.2?e.jsxs(A,{kind:"warn",titel:"Grenzfall ‖v‖ → 0.",children:["Der absolute Fehler ",e.jsx(n,{children:"\\left\\| \\bDelta_{\\bv} \\right\\|_2"})," = ",s(k,3)," bleibt definiert, der relative nicht: ",N("definition:fehlermass")," verlangt"," ",e.jsx(n,{children:"\\left\\| \\bv \\right\\| \\neq 0"}),". Auch ",N("lemma:fehlerschranken")," sagt hier nichts mehr, denn das Band um den Ursprung schrumpft mit ",e.jsx(n,{children:"\\left\\| \\bv \\right\\|"})," auf einen Punkt."]}):a<.01?e.jsxs(A,{kind:"ok",titel:"Unter 1 %.",children:[e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"})," = ",s(100*a,2)," % liegt weit innerhalb des gestrichelten Kreises. ",N("lemma:fehlerschranken")," klemmt ",e.jsx(n,{children:"\\left\\| \\wt{\\bv} \\right\\|_2"})," ="," ",s(m,3)," damit zwischen ",s(c,3)," und ",s(z,3),": ein Ring, der auf dem Bild kaum noch Dicke hat."]}):a<=.1?e.jsxs(A,{kind:"ok",titel:"Innerhalb der 10-%-Toleranz.",children:[e.jsx(n,{children:"\\left\\| \\bDelta_{\\bv} \\right\\|_2"})," = ",s(k,3)," ist höchstens"," ",s(y,3)," = 0,1 · ",e.jsx(n,{children:"\\left\\| \\bv \\right\\|_2"}),", also"," ",e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"})," = ",s(100*a,2)," % ≤ 10 %. Nach ",N("lemma:fehlerschranken"),"liegt ",e.jsx(n,{children:"\\left\\| \\wt{\\bv} \\right\\|_2"})," = ",s(m,3)," damit im orangen Band [",s(c,3),"; ",s(z,3),"], und die Spitze von ",e.jsx(n,{children:"\\wt{\\bv}"})," tatsächlich im Ring."]}):e.jsxs(A,{kind:"fail",titel:"Toleranz gerissen.",children:[e.jsx(n,{children:"\\left\\| \\bDelta_{\\bv} \\right\\|_2"})," = ",s(k,3)," übersteigt"," ",s(y,3),", der relative Fehler ist ",s(100*a,1)," %. Der orange Ring aus",N("lemma:fehlerschranken")," ist entsprechend breit: ",e.jsx(n,{children:"\\left\\| \\wt{\\bv} \\right\\|_2"})," darf irgendwo zwischen ",s(c,3)," und ",s(z,3)," liegen. Als Garantie über die Länge von ",e.jsx(n,{children:"\\wt{\\bv}"})," ist das fast nichts wert."]});return e.jsxs("div",{className:"my-3 space-y-2",children:[e.jsxs(me,{children:["Ziehen wir die blaue Spitze ",e.jsx(n,{children:"\\wt{\\bv}"}),": Solange sie im gestrichelten Kreis um"," ",e.jsx(n,{children:"\\bv"})," bleibt, ist ",e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"})," höchstens 10 %."]}),e.jsxs("svg",{viewBox:`0 0 ${Pe} ${Pe}`,className:"max-w-full h-auto",role:"img","aria-label":`Die Ebene mit dem wahren Vektor v, seiner Näherung v-Schlange und dem Fehlerpfeil dazwischen; der relative Fehler beträgt ${s(100*a,1)} Prozent.`,...v.svgProps,children:[e.jsx("rect",{x:le,y:ae,width:ke,height:we,fill:"var(--w-bg)"}),$.map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:M(u),y1:ae,x2:M(u),y2:ae+we,stroke:"var(--w-grid)",strokeWidth:1}),e.jsx("line",{x1:le,y1:E(u),x2:le+ke,y2:E(u),stroke:"var(--w-grid)",strokeWidth:1})]},`g${u}`)),x>.2&&Number.isFinite(a)&&e.jsx("path",{d:`M ${M(0)+z*q} ${E(0)} A ${z*q} ${z*q} 0 1 0 ${M(0)-z*q} ${E(0)} A ${z*q} ${z*q} 0 1 0 ${M(0)+z*q} ${E(0)} Z M ${M(0)+Math.max(c,0)*q} ${E(0)} A ${Math.max(c,0)*q} ${Math.max(c,0)*q} 0 1 0 ${M(0)-Math.max(c,0)*q} ${E(0)} A ${Math.max(c,0)*q} ${Math.max(c,0)*q} 0 1 0 ${M(0)+Math.max(c,0)*q} ${E(0)} Z`,fillRule:"evenodd",fill:xe,fillOpacity:.16,stroke:xe,strokeWidth:.8,strokeOpacity:.7,pointerEvents:"none"}),e.jsx("line",{x1:le,y1:E(0),x2:le+ke,y2:E(0),stroke:"var(--w-axis)",strokeWidth:1.2}),e.jsx("line",{x1:M(0),y1:ae,x2:M(0),y2:ae+we,stroke:"var(--w-axis)",strokeWidth:1.2}),$.filter(u=>u>0).map(u=>e.jsxs("g",{children:[e.jsx("text",{x:M(u),y:E(0)+14,textAnchor:"middle",fontSize:10,fill:"var(--w-muted)",children:u}),e.jsx("text",{x:M(0)-6,y:E(u)+4,textAnchor:"end",fontSize:10,fill:"var(--w-muted)",children:u})]},`t${u}`)),x>.2&&e.jsx("circle",{cx:M(i[0]),cy:E(i[1]),r:y*q,fill:"none",stroke:xe,strokeWidth:1.4,strokeDasharray:"5 4",pointerEvents:"none"}),e.jsx(tn,{x:i[0],y:i[1],farbe:je}),e.jsx(tn,{x:t[0],y:t[1],farbe:oe}),k>1e-6&&e.jsxs("g",{pointerEvents:"none",children:[e.jsx("line",{x1:M(i[0]),y1:E(i[1]),x2:M(t[0]),y2:E(t[1]),stroke:fe,strokeWidth:2.4}),e.jsx("text",{x:M((i[0]+t[0])/2)+10,y:E((i[1]+t[1])/2),fontSize:12,fontWeight:600,fill:fe,children:"Δ"})]}),e.jsx("text",{x:M(i[0])-8,y:E(i[1])+18,fontSize:12,fontWeight:600,fill:je,pointerEvents:"none",children:"v"}),e.jsx("text",{x:M(t[0])+10,y:E(t[1])-8,fontSize:12,fontWeight:600,fill:oe,pointerEvents:"none",children:"ṽ"}),e.jsx(De,{x:M(i[0]),y:E(i[1]),farbe:je,aktiv:v.dragging==="v",...v.handleProps("v")}),e.jsx(De,{x:M(t[0]),y:E(t[1]),farbe:oe,aktiv:v.dragging==="vt",...v.handleProps("vt")})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-x-5 gap-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold",style:{color:je},children:"v"}),j("v1","₁","v 1",i[0],u=>r([u,i[1]])),j("v2","₂","v 2",i[1],u=>r([i[0],u]))]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold",style:{color:oe},children:"ṽ"}),j("w1","₁","v Schlange 1",t[0],u=>d([u,t[1]])),j("w2","₂","v Schlange 2",t[1],u=>d([t[0],u]))]}),e.jsxs("button",{type:"button",className:`text-xs underline ${ie}`,onClick:()=>{l({}),r([3,4]),d([3.2,4.3])},children:["zurück zu ",N("beispiel:fehlermasse-fuer-vektoren")]})]}),e.jsxs("div",{className:`grid gap-x-6 gap-y-0.5 p-3 font-mono text-xs sm:grid-cols-2 ${Fe}`,children:[e.jsxs("span",{style:{color:fe},children:["Δ = ṽ − v = (",s(o[0],2),"; ",s(o[1],2),")"]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:fe},children:"‖Δ‖₂"})," = ",s(k,4)]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:je},children:"‖v‖₂"})," = ",s(x,4),"  ",e.jsx("span",{style:{color:oe},children:"‖ṽ‖₂"})," = ",s(m,4)]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:xe},children:"δ"})," ="," ",x>0?`${s(a,4)} = ${s(100*a,2)} %`:"nicht definiert"]}),e.jsxs("span",{className:"sm:col-span-2",children:[e.jsx("span",{style:{color:xe},children:N("lemma:fehlerschranken")}),": ",s(c,4)," ≤ ‖ṽ‖₂ ="," ",s(m,4)," ≤ ",s(z,4)]})]}),p]})}function Te({label:i,value:r,color:t,vmax:d}){const h=Math.min(Math.abs(r)/d,1)*50;return e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"w-44 shrink-0 text-right text-xs sm:w-52 sm:text-sm",style:{color:t},children:i}),e.jsxs("div",{className:"relative h-5 grow overflow-hidden rounded bg-slate-200/70 dark:bg-slate-800/70",children:[e.jsx("div",{className:"absolute inset-y-0 left-1/2 w-px",style:{backgroundColor:W.grau}}),e.jsx("div",{className:"absolute bottom-1 top-1 rounded-sm",style:{backgroundColor:t,left:r<0?`${50-h}%`:"50%",width:`${Math.max(h,r===0?0:.4)}%`}})]}),e.jsx("span",{className:"w-24 shrink-0 text-right font-mono text-xs",children:ce(r)})]})}function yn(){const[i,r]=I.useState(2),[t,d]=I.useState(0),h=Number(Math.PI.toFixed(t)),l=Math.exp(Math.PI),o=Math.exp(h),k=wn(h,i),x=k-o,m=o-l,a=k-l,c=Math.max(Math.abs(x),Math.abs(m),Math.abs(a),1e-15),z=i===2&&t===0?e.jsxs(A,{kind:"neutral",titel:`${N("beispiel:fehlerzerlegung-berechnung-von-e")}.`,children:["Genau die Rechnung aus dem Text: ",s(x,3)," + (",s(m,3),") ="," ",s(a,3),". Der rote Algorithmusfehler ist fast viermal so groß wie der orange Folgefehler."]}):Math.abs(x)>2*Math.abs(m)?e.jsxs(A,{kind:"warn",titel:"Der Algorithmus dominiert.",children:["Der rote Anteil ist ",s(Math.abs(x)/Math.abs(m),1),"-mal so groß wie der orange. Nach der Zerlegung (",Ze("eq:eq-4-1-1"),") hilft hier nur ein besserer Algorithmus (größeres"," ",e.jsx(n,{children:"N"}),"); ein genauerer Input würde den Gesamtfehler kaum bewegen."]}):Math.abs(m)>2*Math.abs(x)?e.jsxs(A,{kind:"warn",titel:"Der Input dominiert.",children:["Der orange Anteil ist ",s(Math.abs(m)/Math.abs(x),1),"-mal so groß wie der rote. Der Algorithmus ist genau genug; kein noch so großes ",e.jsx(n,{children:"N"})," repariert das, denn (",Ze("eq:eq-4-1-1"),") lässt den zweiten Summanden davon unberührt. Nur ein genaueres"," ",e.jsx(n,{children:"\\wt{\\pi}"})," hilft."]}):e.jsx(A,{kind:"ok",titel:"Beide Anteile gleichauf.",children:"Roter und oranger Balken sind auf einen Faktor 2 gleich groß. Hier wäre es Verschwendung, nur an einer der beiden Schrauben zu drehen: Der Gesamtfehler halbiert sich erst, wenn beide Anteile kleiner werden."});return e.jsxs("div",{className:"my-3 space-y-2",children:[e.jsxs(me,{children:["Schieben wir ",e.jsx(n,{children:"N"})," und ",e.jsx(n,{children:"k"})," und suchen die Einstellung, bei der beide Balken gleich lang sind."]}),e.jsx(U,{label:"Abbruchordnung N",value:i,onChange:y=>r(Math.round(y)),min:0,max:10,step:1,fmt:y=>String(Math.round(y))}),e.jsx(U,{label:"Nachkommastellen k",value:t,onChange:y=>d(Math.round(y)),min:0,max:6,step:1,fmt:y=>String(Math.round(y))}),e.jsxs("div",{className:"grid grid-cols-2 gap-x-4 gap-y-0.5 font-mono text-xs sm:grid-cols-4",children:[e.jsxs("span",{children:[e.jsx("span",{style:{color:oe},children:"π̃"})," ="," ",h.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:oe},children:"f̃(π̃)"})," = ",ce(k,6)]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:W.grau},children:"f(π̃)"})," = ",ce(o,6)]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:je},children:"f(π)"})," = ",ce(l,6)]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(Te,{label:"Algorithmus f̃(π̃) − f(π̃)",value:x,color:fe,vmax:c}),e.jsx(Te,{label:"Folgefehler f(π̃) − f(π)",value:m,color:xe,vmax:c}),e.jsx(Te,{label:"Gesamtfehler f̃(π̃) − f(π)",value:a,color:rn,vmax:c})]}),e.jsxs("p",{className:`text-xs ${ie}`,children:["Probe zu (",Ze("eq:eq-4-1-1"),"): ",e.jsx("span",{style:{color:fe},children:ce(x)})," +"," ",e.jsx("span",{style:{color:xe},children:ce(m)})," ="," ",e.jsx("span",{style:{color:rn},children:ce(x+m)}),"."]}),z]})}function sn(i){const r={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...i.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(r.p,{children:[`In Kapitel 2 haben wir gesehen, dass Computer praktisch nie exakt rechnen: Schon das
Speichern einer Zahl im `,e.jsx(b,{id:"floating-point",children:"Gleitkommaformat"}),`
erzeugt `,e.jsx(b,{id:"rounding-error",children:"Rundungsfehler"}),`, und jede
Rechenoperation kann weitere hinzufügen
(`,e.jsx(r.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),`). Für Statistiker/innen kommt
noch etwas Grundsätzlicheres dazu: Unsere Inputs sind Daten, und Daten sind gemessen,
also selbst schon fehlerbehaftet, bevor der Computer überhaupt anfängt zu rechnen. Dieses
Kapitel entwickelt das Handwerkszeug, um mit beidem systematisch umzugehen. Wir klären
zuerst, wie man Fehler überhaupt `,e.jsx(r.em,{children:"misst"}),`, und zerlegen dann den Gesamtfehler eines
berechneten Ergebnisses in seine zwei grundverschiedenen Quellen. Diese Zerlegung ist der
rote Faden des ganzen Kapitels: Sie führt direkt auf die Begriffe `,e.jsx(r.em,{children:"Kondition"}),`
(`,e.jsx(r.a,{href:"#sec-4.2",children:"Abschnitt 4.2"}),") und ",e.jsx(r.em,{children:"Stabilität"}),`
(`,e.jsx(r.a,{href:"#sec-4.3",children:"Abschnitt 4.3"}),")."]}),`
`,e.jsxs(R,{kind:"Bemerkung",label:"4.1.1 (Verwendete Vorkenntnisse)",id:"env-fehlermasse-verwendete-vorkenntnisse",children:[e.jsx(r.p,{children:"Dieses Kapitel setzt voraus:"}),e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`aus Kapitel 2: den Algorithmusbegriff und die Komplexitätsanalyse
(Abschnitte `,e.jsx(r.a,{href:"?k=02-algos#sec-2.1",children:"2.1"}),"–",e.jsx(r.a,{href:"?k=02-algos#sec-2.3",children:"2.3"}),`) sowie das Verständnis, dass
Algorithmen meist nur `,e.jsx(r.em,{children:"approximative"})," Lösungen berechnen,"]}),`
`,e.jsxs(r.li,{children:[`aus der linearen Algebra: Vektor- und
`,e.jsx(b,{id:"matrix-norm",children:"Matrixnormen"}),` (Kapitel 3, insbesondere
`,e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),`) mit den
`,e.jsx(b,{id:"norm",children:"Normeigenschaften"}),` Definitheit, Homogenität und
`,e.jsx(b,{id:"triangle-inequality",children:"Dreiecksungleichung"}),`, außerdem
Matrixoperationen und
`,e.jsx(b,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkte"}),","]}),`
`,e.jsxs(r.li,{children:["aus der Analysis: ",e.jsx(b,{id:"limit",children:"Grenzwerte"}),` und
`,e.jsx(b,{id:"convergence",children:"Konvergenz"}),`,
`,e.jsx(b,{id:"continuity",children:"Stetigkeit"}),` und die Grundlagen der
`,e.jsx(b,{id:"taylor-series",children:"Taylor-Approximation"}),"."]}),`
`]})]}),`
`,e.jsxs(r.h3,{id:"sec-absolute-und-relative-fehler",children:["4.1.1 ","Absolute und relative Fehler"]}),`
`,e.jsxs(r.p,{children:[`Beginnen wir mit dem einfachsten Fall: Eine einzelne Zahl soll gespeichert oder berechnet
werden, und statt des `,e.jsx(n,{children:"\\cgreen{\\text{tatsächlichen Werts}}"}),` erhalten wir einen
`,e.jsx(n,{children:"\\cblue{\\text{fehlerhaften Wert}}"}),`. Die naheliegendste Art, den Fehler zu
quantifizieren, ist die Differenz der beiden:`]}),`
`,e.jsx(g,{children:"\\text{absoluter Fehler} = \\cblue{\\text{fehlerhafter Wert}} - \\cgreen{\\text{tatsächlicher Wert}}."}),`
`,e.jsxs(r.p,{children:[`Der absolute Fehler hat aber einen Schönheitsfehler: Er hängt von der Skala ab. Ein
Fehler von einem Meter ist beim Vermessen eines Zimmers eine Katastrophe, beim Abstand
zwischen München und Hamburg belanglos. Deshalb ist es üblicher, Fehler `,e.jsx(r.em,{children:"relativ"}),`
zum tatsächlichen Wert zu betrachten:`]}),`
`,e.jsx(g,{children:"\\corange{\\text{relativer Fehler}} = \\frac{\\cblue{\\text{fehlerhafter Wert}} - \\cgreen{\\text{tatsächlicher Wert}}}{\\cgreen{\\text{tatsächlicher Wert}}}."}),`
`,e.jsxs(r.p,{children:[`Der Vorteil: Der relative Fehler ist einheitenfrei und lässt sich als Prozentzahl lesen.
Der Nachteil: Der tatsächliche Wert darf nicht `,e.jsx(n,{children:"0"}),` sein. Lösen wir die
Definition nach dem fehlerhaften Wert auf, erhalten wir eine Umformung, die uns noch oft
begegnen wird:`]}),`
`,e.jsx(g,{children:"\\cblue{\\text{fehlerhafter Wert}} = \\cgreen{\\text{tatsächlicher Wert}} \\cdot \\left(1 + \\corange{\\text{relativer Fehler}}\\right)."}),`
`,e.jsxs(r.p,{children:[`Ein fehlerbehafteter Wert ist also der wahre Wert, multiplikativ verzerrt um den Faktor
`,e.jsx(n,{children:"1 + \\corange{\\text{relativer Fehler}}"}),`. So lässt sich auch das aus
Kapitel 2 bekannte Runden im Gleitkommaformat beschreiben: Dort ist der relative Fehler
höchstens die
`,e.jsx(b,{id:"machine-epsilon",children:"Maschinengenauigkeit"}),"."]}),`
`,e.jsxs(r.h3,{id:"sec-fehlermasse-und-fehlerschranken",children:["4.1.2 ","Fehlermaße und Fehlerschranken"]}),`
`,e.jsxs(r.p,{children:[`In der Statistik sind unsere Ergebnisse selten einzelne Zahlen: Wir rechnen mit
Vektoren von Schätzern, mit Kovarianzmatrizen, mit ganzen Funktionen. Um Fehler auch
dort messen zu können, brauchen wir statt des Betrags eine
`,e.jsx(b,{id:"norm",children:"Norm"}),`. Genau dafür haben wir in Kapitel 3 die
Normbegriffe bereitgestellt; jetzt zahlt sich das aus. Die folgende Definition überträgt
beide Fehlerbegriffe wörtlich auf beliebige
`,e.jsx(b,{id:"vector-space",children:"Vektorräume"}),":"]}),`
`,e.jsxs(R,{kind:"Definition",label:"4.1.2 (Fehlermaß)",id:"env-fehlermass",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"V"})," ein Vektorraum mit (Semi-)Norm ",e.jsx(n,{children:"\\left\\| \\cdot \\right\\|"}),`
und `,e.jsx(n,{children:"\\cblue{\\wt{\\bv}} \\in V"}),` eine Approximation zu
`,e.jsx(n,{children:"\\cgreen{\\bv} \\in V"}),". Dann ist"]}),e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["der ",e.jsx(r.em,{children:"absolute Fehler"})]}),`
`,e.jsx(g,{children:"\\cred{\\bDelta_{\\bv}} = \\cblue{\\wt{\\bv}} - \\cgreen{\\bv},"}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["der ",e.jsx(r.em,{children:"relative Fehler"})]}),`
`,e.jsx(g,{children:"\\corange{\\delta_{\\bv}} = \\frac{\\left\\| \\cblue{\\wt{\\bv}} - \\cgreen{\\bv} \\right\\|}{\\left\\| \\cgreen{\\bv} \\right\\|} = \\frac{\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|}{\\left\\| \\cgreen{\\bv} \\right\\|} \\qquad \\text{(sofern } \\left\\| \\cgreen{\\bv} \\right\\| \\neq 0\\text{)}."}),`
`]}),`
`]})]}),`
`,e.jsxs(r.p,{children:[`Beachten wir den kleinen, aber wichtigen Unterschied: Der absolute Fehler
`,e.jsx(n,{children:"\\cred{\\bDelta_{\\bv}}"})," ist selbst ein Element von ",e.jsx(n,{children:"V"}),` und sagt uns
auch, `,e.jsx(r.em,{children:"in welche Richtung"}),` die Approximation danebenliegt. Der relative Fehler
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"}),` ist dagegen eine einzelne nichtnegative Zahl. Für
Skalare (`,e.jsx(n,{children:"V = \\R"}),` mit dem Betrag als Norm) liefert die Definition gerade den
Betrag des relativen Fehlers aus
`,e.jsx(r.a,{href:"#sec-absolute-und-relative-fehler",children:"Abschnitt 4.1.1"}),"."]}),`
`,e.jsxs(r.p,{children:[`Oft kennen wir den Fehler nicht exakt, sonst könnten wir ihn ja einfach abziehen und
exakt rechnen. Was wir realistischerweise angeben können, ist eine Garantie nach oben:
Gilt `,e.jsx(n,{children:"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\| \\le \\eps"}),` bzw.
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}} \\le \\eps"}),", so nennen wir ",e.jsx(n,{children:"\\eps"}),` eine
`,e.jsx(r.em,{children:"absolute"})," bzw. ",e.jsx(r.em,{children:"relative Fehlerschranke"}),`. Das folgende Lemma zeigt, was
eine relative Fehlerschranke praktisch wert ist: Sie kontrolliert, wie stark die Norm der
Approximation von der Norm des wahren Werts abweichen kann.`]}),`
`,e.jsxs(R,{kind:"Lemma",label:"4.1.3 (Fehlerschranken)",id:"env-fehlerschranken",children:[e.jsx(r.p,{children:"Es gilt"}),e.jsx(g,{children:"\\left\\| \\cgreen{\\bz} \\right\\| \\left(1 - \\corange{\\delta_{\\bz}}\\right) \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| \\;\\le\\; \\left\\| \\cgreen{\\bz} \\right\\| \\left(1 + \\corange{\\delta_{\\bz}}\\right)."})]}),`
`,e.jsxs(Ge,{children:[e.jsx(L,{why:e.jsxs(e.Fragment,{children:["Definition des relativen Fehlers ",e.jsx(n,{children:"\\corange{\\delta_{\\bz}}"}),", beide Seiten mit ",e.jsx(n,{children:"\\left\\| \\cgreen{\\bz} \\right\\| > 0"})," multipliziert"]}),children:e.jsx(g,{children:"\\corange{\\delta_{\\bz}} = \\frac{\\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\|}{\\left\\| \\cgreen{\\bz} \\right\\|} \\quimpl \\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\| = \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["umgekehrte ",e.jsx(b,{id:"triangle-inequality",children:"Dreiecksungleichung"}),": ",e.jsx(n,{children:"\\bigl| \\left\\| \\ba \\right\\| - \\left\\| \\bb \\right\\| \\bigr| \\le \\left\\| \\ba - \\bb \\right\\|"})," für alle ",e.jsx(n,{children:"\\ba, \\bb \\in V"})]}),children:e.jsx(g,{children:"\\Bigl| \\left\\| \\cblue{\\wt{\\bz}} \\right\\| - \\left\\| \\cgreen{\\bz} \\right\\| \\Bigr| \\le \\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\| = \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["Definition des Betrags: ",e.jsx(n,{children:"|t| \\le c \\quequiv -c \\le t \\le c"})]}),children:e.jsx(g,{children:"-\\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| - \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["überall ",e.jsx(n,{children:"\\left\\| \\cgreen{\\bz} \\right\\|"})," addiert; Ausklammern liefert die Behauptung"]}),children:e.jsx(g,{children:"\\left\\| \\cgreen{\\bz} \\right\\| - \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| \\;\\le\\; \\left\\| \\cgreen{\\bz} \\right\\| + \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"})})]}),`
`,e.jsxs(r.p,{children:["Ein relativer Fehler von zum Beispiel ",e.jsx(n,{children:"\\corange{\\delta_{\\bz}} = 0{,}01"}),`
garantiert also: Die Norm der Approximation liegt zwischen `,e.jsx(n,{children:"99\\,\\%"}),` und
`,e.jsx(n,{children:"101\\,\\%"}),` der wahren Norm. Rechnen wir das Ganze einmal konkret an einem
Vektor durch.`]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.1.4 (Fehlermaße für Vektoren)",id:"env-fehlermasse-fuer-vektoren",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bv} = \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}"}),` und
`,e.jsx(n,{children:"\\cblue{\\wt{\\bv}} = \\cblue{\\begin{pmatrix} 3{,}2 \\\\ 4{,}3 \\end{pmatrix}}"}),`
mit der `,e.jsx(b,{id:"euclidean-norm",children:"euklidischen Norm"}),`
`,e.jsx(n,{children:"\\left\\| \\cdot \\right\\|_2"}),"."]}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Absoluter Fehler"}),", komponentenweise Differenz:"]}),e.jsx(g,{children:"\\cred{\\bDelta_{\\bv}} = \\cblue{\\wt{\\bv}} - \\cgreen{\\bv} = \\cblue{\\begin{pmatrix} 3{,}2 \\\\ 4{,}3 \\end{pmatrix}} - \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}} = \\cred{\\begin{pmatrix} 0{,}2 \\\\ 0{,}3 \\end{pmatrix}}."}),e.jsx(r.p,{children:e.jsx(r.strong,{children:"Norm des absoluten Fehlers:"})}),e.jsx(g,{children:"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2 = \\sqrt{0{,}2^2 + 0{,}3^2} = \\sqrt{0{,}04 + 0{,}09} = \\sqrt{0{,}13} \\approx 0{,}361."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Relativer Fehler"}),`, wegen
`,e.jsx(n,{children:"\\left\\| \\cgreen{\\bv} \\right\\|_2 = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5"}),":"]}),e.jsx(g,{children:"\\corange{\\delta_{\\bv}} = \\frac{\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2}{\\left\\| \\cgreen{\\bv} \\right\\|_2} = \\frac{\\sqrt{0{,}13}}{5} \\approx \\frac{0{,}361}{5} \\approx 0{,}072 = 7{,}2\\,\\%."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Fehlerschranke:"}),` Wegen
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}} \\approx 0{,}072 \\le 0{,}1"}),` ist
`,e.jsx(n,{children:"\\eps = 0{,}1"})," eine relative Fehlerschranke."]}),e.jsxs(r.p,{children:["Zur Probe können wir auch ",e.jsx(r.a,{href:"#env-fehlerschranken",children:"Lemma 4.1.3"}),` nachrechnen: Es ist
`,e.jsx(n,{children:"\\left\\| \\cblue{\\wt{\\bv}} \\right\\|_2 = \\sqrt{3{,}2^2 + 4{,}3^2} = \\sqrt{28{,}73} \\approx 5{,}3600"}),`,
und tatsächlich gilt
`,e.jsx(n,{children:"5 \\cdot (1 - \\corange{\\delta_{\\bv}}) \\approx 4{,}6394 \\le 5{,}3600 \\le 5{,}3606 \\approx 5 \\cdot (1 + \\corange{\\delta_{\\bv}})"}),"."]})]}),`
`,e.jsxs(be,{title:"Fehlermaß-Rechner: v und ṽ in der Ebene",children:[e.jsxs(r.p,{children:["Für den Vektor aus ",e.jsx(r.a,{href:"#env-fehlermasse-fuer-vektoren",children:"Beispiel 4.1.4"}),` bedeutet
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}} \\le 0{,}1"}),` nichts anderes als: Die Spitze von
`,e.jsx(n,{children:"\\cblue{\\wt{\\bv}}"})," darf höchstens um ",e.jsx(n,{children:"0{,}1 \\cdot \\left\\| \\cgreen{\\bv} \\right\\|_2"}),`
danebenliegen. Wie groß ist dieser Spielraum in der Ebene, und wie viel Information über
`,e.jsx(n,{children:"\\left\\| \\cblue{\\wt{\\bv}} \\right\\|"})," steckt am Ende in ",e.jsx(r.a,{href:"#env-fehlerschranken",children:"Lemma 4.1.3"}),"?"]}),e.jsx(zn,{}),e.jsxs(r.p,{children:[`Der Rechner übersetzt beide Fehlermaße in Geometrie: Der absolute Fehler
`,e.jsx(n,{children:"\\cred{\\bDelta_{\\bv}}"}),` ist der rote Pfeil zwischen den beiden Spitzen, der relative Fehler
misst dessen Länge an `,e.jsx(n,{children:"\\left\\| \\cgreen{\\bv} \\right\\|_2"}),`. Der gestrichelte Kreis um
`,e.jsx(n,{children:"\\cgreen{\\bv}"})," hat den Radius ",e.jsx(n,{children:"0{,}1 \\cdot 5 = 0{,}5"}),`: Solange die blaue Spitze darin liegt,
ist `,e.jsx(n,{children:"\\eps = 0{,}1"}),` eine gültige Fehlerschranke. Der orange Ring um den Ursprung ist
`,e.jsx(r.a,{href:"#env-fehlerschranken",children:"Lemma 4.1.3"})," als Bild – bei den 7,2 % aus ",e.jsx(r.a,{href:"#env-fehlermasse-fuer-vektoren",children:"Beispiel 4.1.4"}),` noch
schmal, bei 40 % lässt er für `,e.jsx(n,{children:"\\left\\| \\cblue{\\wt{\\bv}} \\right\\|_2"})," fast alles zu."]})]}),`
`,e.jsxs(r.h3,{id:"sec-fehlerzerlegung",children:["4.1.3 ","Fehlerzerlegung"]}),`
`,e.jsxs(r.p,{children:["Jetzt zur zweiten Leitfrage: ",e.jsx(r.em,{children:"Woher"}),` kommt der Fehler in einem berechneten
Ergebnis? Formalisieren wir dazu die Situation. Sei `,e.jsx(n,{children:"f"}),` ein Problem (eine
Funktion, die wir auswerten wollen) mit idealem Input `,e.jsx(n,{children:"\\bx"}),`. Was der Computer
stattdessen ausführt, ist ein Algorithmus `,e.jsx(n,{children:"\\wt{f}"}),` (eine Näherung an
`,e.jsx(n,{children:"f"}),"), und zwar am tatsächlichen Input ",e.jsx(n,{children:"\\wt{\\bx}"}),`, einer Näherung an
`,e.jsx(n,{children:"\\bx"}),":"]}),`
`,e.jsx(g,{children:"\\text{Input } \\wt{\\bx} \\quad \\longrightarrow \\quad \\text{Algorithmus } \\wt{f} \\quad \\longrightarrow \\quad \\text{Ergebnis } \\cblue{\\wt{f}(\\wt{\\bx})}."}),`
`,e.jsxs(r.p,{children:["Weicht das Ergebnis ",e.jsx(n,{children:"\\cblue{\\wt{f}(\\wt{\\bx})}"}),` vom idealen Wert
`,e.jsx(n,{children:"\\cgreen{f(\\bx)}"})," ab, kann das an zwei ganz verschiedenen Stellen liegen:"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["am ",e.jsx(r.em,{children:"Fehler im Input"}),", also ",e.jsx(n,{children:"\\wt{\\bx} \\neq \\bx"}),`, etwa durch Messen oder
Speichern von `,e.jsx(n,{children:"\\bx"}),". Diese Fehler sind ",e.jsx(r.em,{children:"unvermeidbar"}),`: Sie entstehen,
bevor unser Programm die erste Zeile ausführt.`]}),`
`,e.jsxs(r.li,{children:["am ",e.jsx(r.em,{children:"Fehler im Algorithmus"}),", also ",e.jsx(n,{children:"\\wt{f} \\neq f"}),`, etwa durch Rundung in
Maschinenarithmetik oder durch bewusste Approximation (abgebrochene Reihen,
Diskretisierung, endlich viele Iterationen). Diese Fehler `,e.jsx(r.em,{children:`können wir
beeinflussen`}),": durch die Wahl eines besseren Algorithmus."]}),`
`]}),`
`,e.jsxs(r.p,{children:[`Der zentrale Trick dieses Kapitels ist nun, den Gesamtfehler exakt in diese zwei Anteile
zu zerlegen. Dazu subtrahieren und addieren wir den Zwischenwert
`,e.jsx(n,{children:"f(\\wt{\\bx})"})," (das ideale Problem, ausgewertet am tatsächlichen Input):"]}),`
`,e.jsx(bn,{tag:"4.1.1",id:"eq-eq-4-1-1",children:"\\cpurp{\\underbrace{\\wt{f}(\\wt{\\bx}) - f(\\bx)}_{\\text{Gesamtfehler}}} \\;=\\; \\cred{\\underbrace{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}_{\\substack{\\text{Fehler im Algorithmus} \\\\ \\text{(Maschinenarithmetik)}}}} \\;+\\; \\corange{\\underbrace{f(\\wt{\\bx}) - f(\\bx)}_{\\substack{\\text{Folgefehler aus Input} \\\\ \\text{(exakte Arithmetik)}}}}"}),`
`,e.jsx(r.p,{children:`Warum ist diese Zerlegung so nützlich? Weil die beiden Terme sauber getrennte
Verantwortlichkeiten haben:`}),`
`,e.jsx(R,{kind:"Bemerkung",label:"4.1.5 (Stabilität und Kondition: Ausblick)",id:"env-stabilitaet-und-kondition-ausblick",children:e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Der erste Term ",e.jsx(n,{children:"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"}),` vergleicht
Algorithmus und Problem `,e.jsx(r.em,{children:"am selben Input"}),` und hängt damit nicht vom
Inputfehler ab. Ist er „klein", nennen wir den Algorithmus `,e.jsx(r.em,{children:"stabil"}),`
(`,e.jsx(r.a,{href:"#sec-4.3",children:"Abschnitt 4.3"}),")."]}),`
`,e.jsxs(r.li,{children:["Der zweite Term ",e.jsx(n,{children:"\\corange{f(\\wt{\\bx}) - f(\\bx)}"}),` vergleicht das ideale
Problem `,e.jsx(n,{children:"f"}),` an zwei Inputs, in exakter Arithmetik, und hängt damit nicht
vom Algorithmus `,e.jsx(n,{children:"\\wt{f}"}),` ab. Ist er „klein", nennen wir das Problem
`,e.jsx(n,{children:"f"})," an der Stelle ",e.jsx(n,{children:"\\bx"})," ",e.jsx(r.em,{children:"gut konditioniert"}),`
(`,e.jsx(r.a,{href:"#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`]})}),`
`,e.jsxs(r.p,{children:["Die Zerlegung ",e.jsx(r.a,{href:"#eq-eq-4-1-1",children:"(4.1.1)"}),` trennt also, was der Algorithmus verbockt, von dem, was am
gestörten Input liegt – und nur den ersten Anteil können wir durch bessere Software
reparieren. Sehen wir uns das an einem vollständig durchgerechneten Beispiel an.`]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.1.6 (Fehlerzerlegung: Berechnung von e^π)",id:"env-fehlerzerlegung-berechnung-von-e",children:[e.jsxs(r.p,{children:[`Bekanntlich lässt sich die Exponentialfunktion als
`,e.jsx(b,{id:"power-series",children:"Potenzreihe"}),` schreiben:
`,e.jsx(n,{children:"e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}"}),`. Angenommen, wir wollen
`,e.jsx(n,{children:"f(\\pi) = e^{\\pi}"}),` berechnen und verwenden dazu zwei Näherungen: als Input
`,e.jsx(n,{children:"\\wt{\\pi} = 3"}),` (auf eine ganze Zahl gerundet) und als Algorithmus die nach
dem quadratischen Glied abgebrochene Reihe
`,e.jsx(n,{children:"\\wt{f}(x) = \\sum_{n=0}^{2} \\frac{x^n}{n!} = 1 + x + \\tfrac{x^2}{2}"}),`.
Zerlegen wir den Gesamtfehler wie in `,e.jsx(r.a,{href:"#eq-eq-4-1-1",children:"(4.1.1)"}),`. Am besten erst selbst probieren, dann
weiterlesen.`]}),e.jsxs(r.p,{children:[`Der Algorithmus liefert
`,e.jsx(n,{children:"\\wt{f}(3) = 1 + 3 + \\tfrac{9}{2} = 8{,}5"}),`. Einsetzen des Zwischenwerts
`,e.jsx(n,{children:"f(3) = e^3"})," ergibt die Zerlegung"]}),e.jsx(g,{children:"\\cpurp{\\wt{f}(3) - f(\\pi)} = \\cred{\\bigl[\\wt{f}(3) - f(3)\\bigr]} + \\corange{\\bigl[f(3) - f(\\pi)\\bigr]}."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Fehler im Algorithmus"}),`, also die abgebrochene Reihe gegen
`,e.jsx(n,{children:"e^3"}),"; der Fehler ist gerade der weggelassene Reihenrest, mit Minuszeichen:"]}),e.jsx(g,{children:"\\cred{\\wt{f}(3) - f(3)} = \\left(1 + 3 + \\tfrac{9}{2}\\right) - e^3 = -\\sum_{n=3}^{\\infty} \\frac{3^n}{n!} \\approx 8{,}5 - 20{,}086 = \\cred{-11{,}586}."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Folgefehler aus dem Input"}),", das exakte Problem ",e.jsx(n,{children:"f"}),` an den
zwei Inputs `,e.jsx(n,{children:"3"})," und ",e.jsx(n,{children:"\\pi"}),":"]}),e.jsx(g,{children:"\\corange{f(3) - f(\\pi)} = e^3 - e^{\\pi} \\approx 20{,}086 - 23{,}141 = \\corange{-3{,}055}."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Gesamtfehler"}),", zur Probe direkt und über die Zerlegung:"]}),e.jsx(g,{children:"\\cpurp{\\wt{f}(3) - f(\\pi)} \\approx 8{,}5 - 23{,}141 = \\cpurp{-14{,}641} = \\cred{(-11{,}586)} + \\corange{(-3{,}055)}. \\quad \\checkmark"}),e.jsxs(r.p,{children:[`Beide Anteile sind hier negativ, und das aus jeweils gutem Grund: Die abgebrochene
Reihe lässt nur positive Terme weg und unterschätzt `,e.jsx(n,{children:"e^3"}),` deshalb systematisch;
und wegen `,e.jsx(n,{children:"3 < \\pi"})," und der Monotonie von ",e.jsx(n,{children:"e^x"}),` ist auch
`,e.jsx(n,{children:"e^3 < e^{\\pi}"}),". Der Algorithmusfehler dominiert klar (",e.jsx(n,{children:"-11{,}6"}),`
gegenüber `,e.jsx(n,{children:"-3{,}1"}),`). Hier würde sich also zuerst ein besserer Algorithmus
lohnen (mehr Reihenglieder), nicht ein genauerer Input.`]})]}),`
`,e.jsxs(r.p,{children:[`Bleibt das so? Den Algorithmusfehler drücken wir mit mehr Reihengliedern, den Folgefehler nur
mit einem genaueren `,e.jsx(n,{children:"\\wt{\\pi}"}),"."]}),`
`,e.jsxs(be,{title:"Fehlerzerlegungs-Explorer: Abbruchordnung N und Input-Genauigkeit k",children:[e.jsx(r.p,{children:`Ab welcher Abbruchordnung ist der Algorithmus so gut, dass nicht mehr er, sondern der Input
das Ergebnis begrenzt?`}),e.jsx(yn,{}),e.jsxs(r.p,{children:["Bei ",e.jsx(n,{children:"\\wt{\\pi} = 3"})," kippt die Dominanz zwischen ",e.jsx(n,{children:"N = 4"})," und ",e.jsx(n,{children:"N = 6"}),": Bis ",e.jsx(n,{children:"N = 3"}),` ist der
Algorithmusfehler mehr als doppelt so groß wie der Folgefehler, ab `,e.jsx(n,{children:"N = 6"}),` ist es umgekehrt.
Ab da kostet jedes weitere Reihenglied Rechenzeit, ohne den Gesamtfehler zu bewegen, denn der
zweite Summand in `,e.jsx(r.a,{href:"#eq-eq-4-1-1",children:"(4.1.1)"})," enthält ",e.jsx(n,{children:"N"}),` überhaupt nicht. Wer den Fehler dann noch drücken
will, muss am Input ansetzen.`]})]}),`
`,e.jsxs(r.p,{children:[`Damit haben wir das Vokabular beisammen: Fehler messen wir mit Normen (absolut oder
relativ), und den Gesamtfehler eines berechneten Ergebnisses zerlegen wir in den
Algorithmus-Anteil und den Folgefehler aus dem Input. Die nächsten beiden Abschnitte
quantifizieren die zwei Anteile: Die `,e.jsx(r.em,{children:"Kondition"}),` eines Problems misst, wie stark
Inputfehler im Ergebnis verstärkt werden; die `,e.jsx(r.em,{children:"Stabilität"}),` beurteilt, wie viel
Fehler der Algorithmus selbst hinzufügt.`]}),`
`,e.jsx(r.h3,{children:"Selbsttest"}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(Le,{children:[e.jsxs(ge,{wahr:!1,children:[e.jsxs(r.p,{children:["Ein absoluter Fehler von ",e.jsx(n,{children:"0{,}36"})," ist ein kleiner Fehler."]}),e.jsxs(r.p,{children:["Ohne Bezugsgröße sagt der absolute Fehler nichts. In ",e.jsx(r.a,{href:"#env-fehlermasse-fuer-vektoren",children:"Beispiel 4.1.4"}),` sind
`,e.jsx(n,{children:"0{,}36"})," gemessen an ",e.jsx(n,{children:"\\left\\| \\cgreen{\\bv} \\right\\|_2 = 5"}),` gerade
7,2 %, bei einem Vektor der Länge `,e.jsx(n,{children:"0{,}5"}),` wären dieselben
`,e.jsx(n,{children:"0{,}36"}),` ein relativer Fehler von über 70 %. Genau deshalb steht neben dem
absoluten Fehler immer auch der relative.`]})]}),e.jsxs(ge,{wahr:!0,children:[e.jsxs(r.p,{children:["Der absolute Fehler ",e.jsx(n,{children:"\\cred{\\bDelta_{\\bv}}"}),` trägt mehr Information als der relative Fehler
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"}),"."]}),e.jsxs(r.p,{children:[e.jsx(n,{children:"\\cred{\\bDelta_{\\bv}}"})," ist ein Element von ",e.jsx(n,{children:"V"}),` und sagt auch, in welche
`,e.jsx(r.em,{children:"Richtung"})," die Näherung danebenliegt; ",e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"}),` ist eine einzelne
nichtnegative Zahl (`,e.jsx(r.a,{href:"#env-fehlermass",children:"Definition 4.1.2"}),"). Aus ",e.jsx(n,{children:"\\cred{\\bDelta_{\\bv}}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bv}"})," lässt sich ",e.jsx(n,{children:"\\corange{\\delta_{\\bv}}"})," berechnen, umgekehrt nicht."]})]}),e.jsxs(ge,{wahr:!1,children:[e.jsxs(r.p,{children:["Mehr Reihenglieder in ",e.jsx(n,{children:"\\wt{f}"})," verkleinern beide Anteile der Zerlegung ",e.jsx(r.a,{href:"#eq-eq-4-1-1",children:"(4.1.1)"}),"."]}),e.jsxs(r.p,{children:["Nur den ersten. Der Folgefehler ",e.jsx(n,{children:"\\corange{f(\\wt{\\bx}) - f(\\bx)}"}),` vergleicht das
`,e.jsx(r.em,{children:"ideale"})," Problem an zwei Inputs und weiß von ",e.jsx(n,{children:"\\wt{f}"}),` gar nichts
(`,e.jsx(r.a,{href:"#env-stabilitaet-und-kondition-ausblick",children:"Bemerkung 4.1.5"}),`). Deshalb läuft der Gesamtfehler im Explorer gegen den Folgefehler und nicht
gegen null.`]})]}),e.jsxs(_e,{loesung:.5,toleranz:.02,children:[e.jsxs(r.p,{children:["Ziehen wir im Fehlermaß-Rechner die blaue Spitze bei ",e.jsx(n,{children:"\\cgreen{\\bv} = (3, 4)^\\top"}),` genau auf
den gestrichelten Kreis. Welchen Wert zeigt der Rechner dann für
`,e.jsx(n,{children:"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2"}),"?"]}),e.jsxs(r.p,{children:["Der gestrichelte Kreis hat den Radius ",e.jsx(n,{children:"0{,}1 \\cdot \\left\\| \\cgreen{\\bv} \\right\\|_2"}),`, und
`,e.jsx(n,{children:"\\left\\| \\cgreen{\\bv} \\right\\|_2 = 5"}),`. Auf dem Kreis ist also
`,e.jsx(n,{children:"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2 = 0{,}5"}),` und damit
`,e.jsx(n,{children:"\\corange{\\delta_{\\bv}} = 0{,}5/5 = 10\\,\\%"}),`: der Grenzfall der Fehlerschranke
`,e.jsx(n,{children:"\\eps = 0{,}1"})," aus ",e.jsx(r.a,{href:"#env-fehlermasse-fuer-vektoren",children:"Beispiel 4.1.4"}),"."]})]})]})}),`
`,e.jsx(r.p,{children:e.jsx(r.em,{children:"Vertiefung: Heath §1.2."})})]})}function Sn(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(sn,{...i})}):sn(i)}const _={x:W.blau,pert:W.rot,out:W.gruen,amp:W.orange},se=i=>Number.isFinite(i)?`${s(100*i,1)} %`:"–";function X({label:i,value:r,color:t}){return e.jsxs("div",{className:"flex justify-between gap-4 border-b border-slate-200/70 py-0.5 last:border-b-0 dark:border-slate-700",children:[e.jsx("span",{style:t?{color:t}:void 0,children:i}),e.jsx("span",{className:"font-mono tabular-nums",children:r})]})}const pe=400,We=300,ye=46,Ke=12,ve=12,gn=30,Re=3.4,re=10,F=i=>ye+(pe-ye-Ke)*i/Re,D=i=>ve+(We-ve-gn)*(1-Math.min(i,re)/re);function An(){const[i,r]=I.useState(.6),[t,d]=I.useState(-.45),h=i+t,l=h>.001,o=1/i,k=l?1/h:NaN,x=Math.abs(t)/i,m=l?Math.abs(k-o)/o:NaN,a=l&&x>0?m/x:NaN,c=qe({feld:{x0:ye,y0:ve,w:pe-ye-Ke,h:We-ve-gn},welt:{x0:0,x1:Re,y0:0,y1:re},clamp:([j,$])=>[ee(j,.001,Re),$],onDrag:([j])=>d(ee(Math.round((j-i)*200)/200,-.55,.55))}),z=I.useMemo(()=>{const j=[];for(let $=0;$<=180;$++){const p=1/re+(3.35-1/re)*($/180);j.push(`${F(p).toFixed(1)},${D(1/p).toFixed(1)}`)}return j.join(" ")},[]),y=Math.min(o,re),S=l?Math.min(k,re):re,v=l?t===0?e.jsxs(A,{kind:"neutral",titel:"Keine Störung.",children:["Ohne Störung gibt es keinen Fehlerquotienten: ",e.jsx(n,{children:"0/0"})," ist nicht definiert. Schieben wir ",e.jsx(n,{children:"\\eps"})," ein Stück von null weg oder ziehen wir den roten Punkt auf der Achse."]}):a<.8?e.jsxs(A,{kind:"ok",titel:"Der Outputfehler wird gedämpft.",children:["Der relative Outputfehler (",se(m),") ist kleiner als der relative Inputfehler (",se(x),"); der Faktor beträgt ",s(a,2),". Das ist kein Widerspruch zur Konditionszahl ",e.jsx(n,{children:"\\kappa_{rel} = 1"}),": Sie beschreibt den Grenzfall",e.jsx(n,{children:"\\eps \\to 0"}),", während die gewählte Störung dafür nicht klein ist."]}):Math.abs(a-1)<.2?e.jsxs(A,{kind:"ok",titel:"Verstärkung nahe 1.",children:["Der relative Outputfehler (",se(m),") liegt nahe beim relativen Inputfehler (",se(x),"); die Verstärkung liegt bei ",s(a,2),". Das passt zu ",N("beispiel:der-kehrwert-aufgeloest"),": Für kleine ",e.jsx(n,{children:"\\eps/x"})," ist der Kehrwert relativ gemessen harmlos,"," ",e.jsx(n,{children:"\\kappa_{rel} = 1"}),", und das gilt an ",e.jsx("em",{children:"jeder"})," Stelle"," ",e.jsx(n,{children:"x > 0"}),", auch bei ",e.jsx(n,{children:"x = 10^{-17}"}),"."]}):e.jsxs(A,{kind:"warn",titel:"Der Faktor x/|x + ε| schlägt zu.",children:["Aus ",se(x)," Inputfehler werden ",se(m)," Outputfehler, Verstärkung"," ",Number.isFinite(a)?s(a,2):"∞",". Der Faktor ist ",e.jsx(n,{children:"|x| / |x + \\eps|"})," aus ",N("beispiel:kehrwert-nahe-null"),", und er wächst über alle Grenzen, sobald ",e.jsx(n,{children:"\\wt{x}"})," die Polstelle erreicht. Die Konditionszahl"," ",e.jsx(n,{children:"\\kappa_{rel} = 1"})," aus ",N("bemerkung:wie-lesen-wir-das")," widerspricht dem nicht: Sie beschreibt nur den Grenzfall ",e.jsx(n,{children:"\\eps \\to 0"}),", und hier ist ",e.jsx(n,{children:"\\eps"})," relativ zu"," ",e.jsx(n,{children:"x"})," eben nicht klein."]}):e.jsxs(A,{kind:"fail",titel:"Über die Polstelle geschoben.",children:["Für ",e.jsx(n,{children:"\\wt{x} = x + \\eps \\le 0"})," hat das Ergebnis nicht einmal mehr das richtige Vorzeichen. Genau dieses Regime beschreibt ",N("beispiel:kehrwert-nahe-null"),": Läuft"," ",e.jsx(n,{children:"\\wt{x}"})," gegen null, durchläuft der relative Outputfehler das ganze Intervall"," ",e.jsx(n,{children:"[0, \\infty)"}),"."]});return e.jsxs("div",{className:"my-3 space-y-2",children:[e.jsxs(me,{children:["Ziehen wir den roten Punkt ",e.jsx(n,{children:"\\wt{x}"})," auf der Achse in Richtung null und vergleichen dabei die Länge des roten mit der des grünen Balkens."]}),e.jsxs("svg",{viewBox:`0 0 ${pe} ${We}`,className:"max-w-full h-auto rounded border border-slate-300 dark:border-slate-600",role:"img","aria-label":`Graph von f(x) = 1 durch x mit dem Punkt x, dem gestörten Punkt x plus epsilon und den Fehlerintervallen auf beiden Achsen; die Verstärkung beträgt derzeit ${Number.isFinite(a)?s(a,2):"unendlich"}.`,...c.svgProps,children:[e.jsx("rect",{x:0,y:0,width:pe,height:We,fill:"var(--w-bg)"}),e.jsx("line",{x1:ye,y1:D(0),x2:pe-Ke,y2:D(0),stroke:"var(--w-axis)",strokeWidth:1.2}),e.jsx("line",{x1:F(0),y1:ve,x2:F(0),y2:D(0),stroke:"var(--w-axis)",strokeWidth:1.2}),[1,2,3].map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:F(j),y1:D(0),x2:F(j),y2:D(0)+4,stroke:"var(--w-axis)"}),e.jsx("text",{x:F(j),y:D(0)+16,textAnchor:"middle",fill:"var(--w-muted)",fontSize:11,children:j})]},`xt${j}`)),[2,4,6,8,10].map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:F(0)-4,y1:D(j),x2:F(0),y2:D(j),stroke:"var(--w-axis)"}),e.jsx("text",{x:F(0)-7,y:D(j)+4,textAnchor:"end",fill:"var(--w-muted)",fontSize:11,children:j})]},`yt${j}`)),e.jsx("text",{x:pe-Ke-2,y:D(0)-6,textAnchor:"end",fill:"var(--w-muted)",fontSize:12,fontStyle:"italic",children:"x"}),e.jsx("text",{x:F(0)+8,y:ve+12,fill:"var(--w-muted)",fontSize:12,fontStyle:"italic",children:"f(x) = 1/x"}),e.jsx("polyline",{points:z,fill:"none",stroke:"var(--w-axis)",strokeWidth:1.8}),e.jsx("line",{x1:F(Math.min(i,Math.max(h,0))),y1:D(0),x2:F(Math.max(i,h)),y2:D(0),stroke:_.pert,strokeWidth:5,strokeLinecap:"round",pointerEvents:"none"}),e.jsx("text",{x:F((i+Math.max(h,0))/2),y:D(0)+16,textAnchor:"middle",fill:_.pert,fontSize:12,fontStyle:"italic",fontWeight:600,pointerEvents:"none",children:"ε"}),l&&e.jsx("line",{x1:F(0),y1:D(y),x2:F(0),y2:D(S),stroke:_.out,strokeWidth:5,strokeLinecap:"round",pointerEvents:"none"}),e.jsx("polyline",{points:`${F(i)},${D(0)} ${F(i)},${D(y)} ${F(0)},${D(y)}`,fill:"none",stroke:_.x,strokeWidth:1.3,strokeDasharray:"4 3",pointerEvents:"none"}),e.jsx("circle",{cx:F(i),cy:D(y),r:4.5,fill:_.x,pointerEvents:"none"}),e.jsx("text",{x:F(i)+7,y:D(y)-7,fill:_.x,fontSize:12,fontStyle:"italic",fontWeight:600,pointerEvents:"none",children:"(x, f(x))"}),l&&e.jsxs("g",{children:[e.jsx("polyline",{points:`${F(h)},${D(0)} ${F(h)},${D(S)} ${F(0)},${D(S)}`,fill:"none",stroke:_.pert,strokeWidth:1.3,strokeDasharray:"4 3",pointerEvents:"none"}),e.jsx("circle",{cx:F(h),cy:D(S),r:4.5,fill:_.pert,pointerEvents:"none"}),k>re&&e.jsx("text",{x:F(h)+7,y:D(S)+12,fill:_.pert,fontSize:11,pointerEvents:"none",children:"f(x̃) > 10, außerhalb des Bildes"})]}),e.jsx(De,{x:F(ee(h,0,Re)),y:D(0),farbe:_.pert,aktiv:c.dragging==="xt",label:"x̃",labelDy:-10,labelDx:-12,...c.handleProps("xt")})]}),e.jsx(U,{label:"Input x",value:i,onChange:r,min:.1,max:2.8,step:.01,accent:_.x}),e.jsx(U,{label:"Störung ε",value:t,onChange:d,min:-.55,max:.55,step:.005,accent:_.pert}),e.jsxs("div",{className:`p-2 text-sm ${Fe}`,children:[e.jsx(X,{label:"x̃ = x + ε",value:s(h,2),color:_.pert}),e.jsx(X,{label:"f(x) = 1/x",value:s(o,2),color:_.x}),e.jsx(X,{label:"f(x̃) = 1/x̃",value:l?s(k,2):"–"}),e.jsx(X,{label:"rel. Inputfehler |ε|/|x|",value:se(x),color:_.pert}),e.jsx(X,{label:"rel. Outputfehler",value:se(m),color:_.out}),e.jsx(X,{label:"Verstärkung x/|x + ε|",value:Number.isFinite(a)?s(a,2):"∞",color:_.amp})]}),v,e.jsxs("p",{className:`max-w-prose text-xs ${ie}`,children:["Beide Fehlerquotienten hängen nur vom Verhältnis ",e.jsx(n,{children:"\\eps/x"})," ab; die Stelle"," ",e.jsx(n,{children:"x"})," selbst spielt keine Rolle."]})]})}function Dn(i){const r=[255,250,240],t=[230,159,0],d=[213,94,0],h=(o,k,x)=>[0,1,2].map(m=>Math.round(o[m]+(k[m]-o[m])*x)),l=i<.5?h(r,t,i*2):h(t,d,(i-.5)*2);return`rgb(${l[0]},${l[1]},${l[2]})`}const w=2,ue=340,V=i=>(i+w)/(2*w)*ue,P=i=>(w-i)/(2*w)*ue,ln=[{id:"diag",text:"Diagonale: κ = 1",p:[1.4,1.4]},{id:"mittel",text:"mäßig",p:[1.2,-.85]},{id:"nah",text:"nahe Auslöschung",p:[1.5,-1.45]},{id:"gestellt",text:"schlecht gestellt",p:[1.5,-1.5]}];function _n(){var m;const[i,r]=I.useState([1.2,-.85]),t=I.useMemo(()=>{const c=2*w/48,z=ue/48,y=[];for(let S=0;S<48;S++)for(let v=0;v<48;v++){const j=-w+(S+.5)*c,$=-w+(v+.5)*c,p=Math.abs(j+$),u=p<1e-12?1/0:Math.SQRT2*Math.hypot(j,$)/p,K=Number.isFinite(u)?Math.min(1,Math.max(0,Math.log10(Math.max(u,1))/2)):1;y.push({x:V(-w+S*c),y:P(-w+(v+1)*c),c:Dn(K)})}return{size:z,out:y}},[]),d=i[0]+i[1],h=Math.hypot(i[0],i[1]),l=Math.abs(d)<1e-12?1/0:Math.SQRT2*h/Math.abs(d),o=qe({feld:{x0:0,y0:0,w:ue,h:ue},welt:{x0:-w,x1:w,y0:-w,y1:w},clamp:([a,c])=>[ee(a,-w,w),ee(c,-w,w)],onDrag:a=>r([Math.round(a[0]*100)/100,Math.round(a[1]*100)/100])}),k=(m=ln.find(a=>a.p[0]===i[0]&&a.p[1]===i[1]))==null?void 0:m.id,x=Number.isFinite(l)?l<3?e.jsxs(A,{kind:"ok",titel:"Gut konditioniert.",children:[e.jsx(n,{children:"\\kappa_{rel}"})," = ",Number.isFinite(l)?s(l,2):"∞",": relative Inputfehler werden höchstens um diesen Faktor verstärkt. Auf der grünen Diagonalen ",e.jsx(n,{children:"x_2 = x_1"})," wird der Bestwert"," ",e.jsx(n,{children:"\\kappa_{rel} = 1"})," angenommen (",N("beispiel:aufgabe-kondition-der-summe"),"). Besser geht es nicht, denn"," ",e.jsx(n,{children:"\\kappa_{abs} = \\sqrt{2}"})," und ",e.jsx(n,{children:"\\left\\| \\bx \\right\\|_2 / |x_1 + x_2| = 1/\\sqrt{2}"}),"."]}):l<50?e.jsxs(A,{kind:"warn",titel:"Mäßig konditioniert.",children:[e.jsx(n,{children:"\\kappa_{rel}"})," = ",Number.isFinite(l)?s(l,2):"∞",". Nach der Faustregel aus ",N("bemerkung:interpretation")," verlieren wir bis zu ",Math.ceil(Math.log10(l))," ",Math.ceil(Math.log10(l))===1?"Dezimalstelle":"Dezimalstellen"," gegenüber der Genauigkeit des Inputs. Die Karte ist entlang jedes Strahls durch den Ursprung einfarbig: Nur die"," ",e.jsx("em",{children:"Richtung"})," von ",e.jsx(n,{children:"\\bx"})," zählt, nicht seine Länge."]}):e.jsxs(A,{kind:"fail",titel:"Schlecht konditioniert.",children:[e.jsx(n,{children:"\\kappa_{rel}"})," = ",Number.isFinite(l)?s(l,2):"∞",": rund ",Math.ceil(Math.log10(l))," ",Math.ceil(Math.log10(l))===1?"Dezimalstelle geht":"Dezimalstellen gehen"," verloren. Nahe der Antidiagonalen löschen sich ",e.jsx(n,{children:"x_1"})," und"," ",e.jsx(n,{children:"x_2"})," fast aus. Das ist dieselbe Auslöschung wie in ",N("sec:algos/probleme-algorithmen"),", hier aber als Aussage über das ",e.jsx("em",{children:"Problem"}),' „addiere zwei Zahlen", nicht über einen Algorithmus.']}):e.jsxs(A,{kind:"fail",titel:"Schlecht gestellt.",children:["Auf der Antidiagonalen ist ",e.jsx(n,{children:"x_1 + x_2 = 0"}),", der relative Outputfehler also nicht einmal definiert: ",e.jsx(n,{children:"\\kappa_{rel} = \\infty"}),". Das ist der dritte Fall aus",N("bemerkung:interpretation"),", und die Lösung von ",N("beispiel:aufgabe-kondition-der-summe")," sagt genau, wo er auftritt."]});return e.jsxs("div",{className:"my-3 space-y-2",children:[e.jsx(me,{children:"Ziehen wir den blauen Punkt auf die rote Antidiagonale und danach auf die grüne Diagonale; die Regler darunter setzen dieselben Koordinaten genau."}),e.jsxs("svg",{viewBox:`0 0 ${ue} ${ue}`,className:"max-w-full h-auto rounded border border-slate-300 dark:border-slate-600",role:"img","aria-label":`Karte der relativen Konditionszahl der Summe x1 plus x2 über der Ebene; entlang der Antidiagonalen explodiert sie. Der Punkt liegt bei (${s(i[0],2)}; ${s(i[1],2)}) mit kappa gleich ${Number.isFinite(l)?s(l,2):"unendlich"}.`,...o.svgProps,...o.surfaceProps("p"),children:[t.out.map((a,c)=>e.jsx("rect",{x:a.x,y:a.y,width:t.size+.5,height:t.size+.5,fill:a.c,shapeRendering:"crispEdges"},c)),e.jsx("line",{x1:V(-w),y1:P(0),x2:V(w),y2:P(0),stroke:W.grau,strokeWidth:1,strokeOpacity:.6}),e.jsx("line",{x1:V(0),y1:P(-w),x2:V(0),y2:P(w),stroke:W.grau,strokeWidth:1,strokeOpacity:.6}),e.jsx("text",{x:V(w)-16,y:P(0)-5,fill:W.grau,fontSize:12,fontStyle:"italic",children:"x₁"}),e.jsx("text",{x:V(0)+5,y:P(w)+14,fill:W.grau,fontSize:12,fontStyle:"italic",children:"x₂"}),e.jsx("line",{x1:V(-w),y1:P(w),x2:V(w),y2:P(-w),stroke:"var(--w-bg)",strokeWidth:4,strokeOpacity:.85}),e.jsx("line",{x1:V(-w),y1:P(w),x2:V(w),y2:P(-w),stroke:_.pert,strokeWidth:1.8,strokeDasharray:"6 4"}),e.jsx("text",{x:V(-1.92),y:P(.55),fill:_.pert,fontSize:11,fontWeight:600,stroke:"var(--w-bg)",strokeWidth:2.6,paintOrder:"stroke",children:"x₁ + x₂ = 0"}),e.jsx("line",{x1:V(-w),y1:P(-w),x2:V(w),y2:P(w),stroke:_.out,strokeWidth:1.4,strokeDasharray:"3 4"}),e.jsx("text",{x:V(1.35),y:P(1.7),fill:_.out,fontSize:11,fontWeight:600,stroke:"var(--w-bg)",strokeWidth:2.6,paintOrder:"stroke",children:"κ = 1"}),e.jsx("line",{x1:V(0),y1:P(0),x2:V(i[0]),y2:P(i[1]),stroke:_.x,strokeWidth:1.5,strokeDasharray:"2 3",pointerEvents:"none"}),e.jsx(De,{x:V(i[0]),y:P(i[1]),r:5,farbe:_.x,aktiv:o.dragging==="p",...o.handleProps("p")})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:ln.map(a=>e.jsx("button",{type:"button",className:k===a.id?Ye:Ve,"aria-pressed":k===a.id,onClick:()=>r(a.p),children:a.text},a.id))}),e.jsx(U,{label:"x₁",value:i[0],onChange:a=>r([a,i[1]]),min:-w,max:w,step:.01,accent:_.x}),e.jsx(U,{label:"x₂",value:i[1],onChange:a=>r([i[0],a]),min:-w,max:w,step:.01,accent:_.x}),e.jsxs("div",{className:`p-2 text-sm ${Fe}`,children:[e.jsx(X,{label:"x = (x₁, x₂)",value:`(${s(i[0],2)}; ${s(i[1],2)})`,color:_.x}),e.jsx(X,{label:"f(x) = x₁ + x₂",value:s(d,2)}),e.jsx(X,{label:"‖x‖₂",value:s(h,2)}),e.jsx(X,{label:"κ_abs = √2",value:s(Math.SQRT2,3)}),e.jsx(X,{label:"κ_rel = √2 · ‖x‖₂ / |x₁ + x₂|",value:Number.isFinite(l)?s(l,2):"∞",color:_.amp})]}),x,e.jsxs("p",{className:`max-w-prose text-xs ${ie}`,children:["Legende: Farbe = ",e.jsx(n,{children:"\\kappa_{rel}"})," (hell nahe 1, dunkel ab 100), rot gestrichelt die Antidiagonale, grün gestrichelt die Diagonale."]})]})}const G={x:W.blau,pert:W.rot,out:W.gruen,amp:W.orange};function Fn(i){const[[r,t],[d,h]]=i,l=r*r+t*t+d*d+h*h,o=r*h-t*d,k=Math.sqrt(Math.max(0,l*l-4*o*o));return[Math.sqrt((l+k)/2),Math.sqrt(Math.max(0,(l-k)/2))]}function Nn(i){const[[r,t],[d,h]]=i,l=r*h-t*d;return[[h/l,-t/l],[-d/l,r/l]]}const an=(i,r)=>[i[0][0]*r[0]+i[0][1]*r[1],i[1][0]*r[0]+i[1][1]*r[1]],Ce=[{id:"orth",text:"Drehung (κ = 1)",A:[[Math.cos(Math.PI/6),-Math.sin(Math.PI/6)],[Math.sin(Math.PI/6),Math.cos(Math.PI/6)]]},{id:"mild",text:"mäßig gedehnt",A:[[2,0],[0,.8]]},{id:"schlecht",text:"schlecht konditioniert",A:[[1,1],[1,1.05]]},{id:"fast",text:"fast singulär",A:[[1,1],[1,1.005]]}],J=300,Se=26,Ee=J-Se-10,ze=J-Se-10,Q=3.4;function Mn(i){const r=Math.pow(10,Math.floor(Math.log10(Math.max(i,1e-9)))),t=i/r;return r*(t<=1?1:t<=2?2:t<=5?5:10)}function hn({r:i,px:r,py:t,namen:d}){const h=mn(-i,i,4).filter(o=>Math.abs(o)>1e-9),l=h.length>1?h[1]-h[0]:void 0;return e.jsxs("g",{pointerEvents:"none",children:[e.jsx("line",{x1:r(-i),y1:t(0),x2:r(i),y2:t(0),stroke:"var(--w-axis)",strokeWidth:1.1}),e.jsx("line",{x1:r(0),y1:t(-i),x2:r(0),y2:t(i),stroke:"var(--w-axis)",strokeWidth:1.1}),h.map(o=>e.jsxs("g",{children:[e.jsx("line",{x1:r(o),y1:t(0)-3,x2:r(o),y2:t(0)+3,stroke:"var(--w-axis)"}),e.jsx("text",{x:r(o),y:t(0)+14,textAnchor:"middle",fontSize:9,fill:"var(--w-muted)",children:jn(o,l)})]},o)),e.jsx("text",{x:r(i)-2,y:t(0)-6,textAnchor:"end",fontSize:10,fontStyle:"italic",fill:"var(--w-muted)",children:d[0]}),e.jsx("text",{x:r(0)+5,y:t(i)+11,fontSize:10,fontStyle:"italic",fill:"var(--w-muted)",children:d[1]})]})}function En(){const[i,r]=I.useState("schlecht"),[t,d]=I.useState([2,2.05]),[h,l]=I.useState(.05),o=(Ce.find(f=>f.id===i)??Ce[2]).A,k=I.useMemo(()=>Nn(o),[o]),[x,m]=I.useMemo(()=>Fn(o),[o]),a=x/m,c=an(k,t),z=Math.hypot(t[0],t[1]),y=Math.hypot(c[0],c[1]),S=z>1e-9&&y>1e-9?1/m*z/y:NaN,v=h*z,j=Number.isFinite(S)?S*h:NaN,$=I.useMemo(()=>{const f=[];for(let C=0;C<=72;C++){const te=2*Math.PI*C/72;f.push(an(k,[t[0]+v*Math.cos(te),t[1]+v*Math.sin(te)]))}return f},[k,t,v]),p=I.useMemo(()=>{let f=y;for(const[C,te]of $)f=Math.max(f,Math.abs(C),Math.abs(te));return Mn(Math.max(f*1.15,.5))},[$,y]),u=f=>Se+(f+Q)/(2*Q)*Ee,K=f=>10+ze-(f+Q)/(2*Q)*ze,O=f=>Se+(f+p)/(2*p)*Ee,H=f=>10+ze-(f+p)/(2*p)*ze,de=qe({feld:{x0:Se,y0:10,w:Ee,h:ze},welt:{x0:-Q,x1:Q,y0:-Q,y1:Q},clamp:([f,C])=>{const te=Math.hypot(f,C);return te<.3?[.3*f/(te||1),.3*C/(te||1)]:[ee(f,-3,3),ee(C,-3,3)]},greifPosition:()=>t,onDrag:f=>d([Math.round(f[0]*100)/100,Math.round(f[1]*100)/100])}),ne=Number.isFinite(S)?S/a:0,Ne=Number.isFinite(S)?a<1.05?e.jsxs(A,{kind:"ok",titel:"Orthogonal: nichts wird verstärkt.",children:["Hier ist ",e.jsx(n,{children:"\\kappa(\\bA) = 1"}),", die Schranke aus ",N("satz:kondition-der-loesung-eines-lgs")," lässt also gar keine Verstärkung zu: Der rote Kreis wird zu einem Kreis derselben relativen Größe, egal wohin wir ",e.jsx(n,{children:"\\bx"})," ziehen. Der relative Outputfehler bleibt bei ",s(100*j,1)," %."]}):ne>.9?e.jsxs(A,{kind:"fail",titel:"Die ungünstige rechte Seite.",children:[e.jsx(n,{children:"\\kappa_{rel}(f, \\bx)"})," = ",s(S,1)," schöpft"," ",s(100*ne,0)," % der Schranke ",e.jsx(n,{children:"\\kappa(\\bA)"})," ="," ",s(a,1)," aus. ",N("bemerkung:kondition-konditionszahl-einer-matrix")," sagt genau das: Die Schranke ist kein Pessimismus, sie wird für ungünstige rechte Seiten angenommen. Aus"," ",s(100*h,1)," % Inputfehler werden hier ",s(100*j,0)," % Outputfehler."]}):ne<.15?e.jsxs(A,{kind:"ok",titel:"Gutmütige rechte Seite.",children:["Dieselbe Matrix, ein anderes ",e.jsx(n,{children:"\\bx"}),": ",e.jsx(n,{children:"\\kappa_{rel}(f, \\bx)"})," ="," ",s(S,2)," liegt weit unter ",e.jsx(n,{children:"\\kappa(\\bA)"})," = ",s(a,1),". Nach",N("satz:kondition-der-loesung-eines-lgs")," hängt die relative Kondition eben von ",e.jsx(n,{children:"\\bx"})," ab; die Ellipse ist zwar lang, aber ",e.jsx(n,{children:"\\left\\| \\bA^{-1}\\bx \\right\\|"})," ist hier ebenfalls groß, und der Quotient bleibt klein."]}):e.jsxs(A,{kind:"warn",titel:"Dazwischen.",children:[e.jsx(n,{children:"\\kappa_{rel}(f, \\bx)"})," = ",s(S,1)," ist"," ",s(100*ne,0)," % der Schranke ",e.jsx(n,{children:"\\kappa(\\bA)"})," = ",s(a,1),". Ziehen wir ",e.jsx(n,{children:"\\bx"})," weiter herum: Es gibt Richtungen, in denen der Quotient bis an die Schranke heranreicht, und andere, in denen er auf 1 fällt."]}):e.jsxs(A,{kind:"warn",titel:"Nullpunkt.",children:["Für ",e.jsx(n,{children:"\\bx = \\bnull"})," ist auch ",e.jsx(n,{children:"\\by = \\bnull"}),", und der relative Fehler ist auf beiden Seiten undefiniert: ",N("definition:konditionszahl")," verlangt"," ",e.jsx(n,{children:"\\left\\| \\bx \\right\\| \\ne 0"})," und"," ",e.jsx(n,{children:"\\left\\| f(\\bx) \\right\\| \\ne 0"}),". Schieben wir die Regler von null weg."]}),Oe=Math.max(h,Number.isFinite(j)?j:0,1e-9),en=(f,C)=>e.jsx("div",{className:"relative h-4 grow overflow-hidden rounded bg-slate-200/70 dark:bg-slate-800/70",children:e.jsx("div",{className:"absolute inset-y-0 left-0 rounded-sm",style:{backgroundColor:C,width:`${Math.max(1,Math.min(100,100*(Number.isFinite(f)?f:0)/Oe))}%`}})});return e.jsxs("div",{className:"my-3 space-y-3",children:[e.jsxs(me,{children:["Ziehen wir ",e.jsx(n,{children:"\\bx"})," im linken Feld im Kreis herum und beobachten, wie sich die rote Ellipse rechts dabei streckt und staucht."]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("div",{children:[e.jsxs("p",{className:`mb-1 text-xs ${ie}`,children:["Inputebene: rechte Seite ",e.jsx(n,{children:"\\bx"})," und die plausiblen Inputs"]}),e.jsxs("svg",{viewBox:`0 0 ${J} ${J}`,className:"max-w-full h-auto rounded border border-slate-300 dark:border-slate-600",role:"img","aria-label":`Inputebene mit der rechten Seite x bei (${s(t[0],2)}; ${s(t[1],2)}) und einem roten Kreis der plausiblen Inputs.`,...de.svgProps,children:[e.jsx("rect",{x:0,y:0,width:J,height:J,fill:"var(--w-bg)"}),e.jsx(hn,{r:Q,px:u,py:K,namen:["x₁","x₂"]}),e.jsx("circle",{cx:u(t[0]),cy:K(t[1]),r:v/(2*Q)*Ee,fill:G.pert,fillOpacity:.18,stroke:G.pert,strokeWidth:1.4,pointerEvents:"none"}),e.jsx("line",{x1:u(0),y1:K(0),x2:u(t[0]),y2:K(t[1]),stroke:G.x,strokeWidth:1.6,pointerEvents:"none"}),e.jsx("text",{x:u(t[0])+10,y:K(t[1])-8,fontSize:12,fontWeight:600,fill:G.x,pointerEvents:"none",children:"x"}),e.jsx(De,{x:u(t[0]),y:K(t[1]),r:2.5,strichbreite:1.5,farbe:G.x,aktiv:de.dragging==="x",...de.handleProps("x")})]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:`mb-1 text-xs ${ie}`,children:["Lösungsebene: ",e.jsx(n,{children:"\\by = \\bA^{-1}\\bx"})," und das Bild des Kreises"]}),e.jsxs("svg",{viewBox:`0 0 ${J} ${J}`,className:"max-w-full h-auto rounded border border-slate-300 dark:border-slate-600",role:"img","aria-label":`Lösungsebene mit y gleich A hoch minus eins mal x bei (${s(c[0],2)}; ${s(c[1],2)}) und der Bildellipse des Störkreises.`,children:[e.jsx("rect",{x:0,y:0,width:J,height:J,fill:"var(--w-bg)"}),e.jsx(hn,{r:p,px:O,py:H,namen:["y₁","y₂"]}),e.jsx("polygon",{points:$.map(([f,C])=>`${O(f).toFixed(1)},${H(C).toFixed(1)}`).join(" "),fill:G.pert,fillOpacity:.18,stroke:G.pert,strokeWidth:1.4}),e.jsx("line",{x1:O(0),y1:H(0),x2:O(c[0]),y2:H(c[1]),stroke:G.out,strokeWidth:1.6}),e.jsx("circle",{cx:O(c[0]),cy:H(c[1]),r:4,fill:G.out}),e.jsx("text",{x:O(c[0])+10,y:H(c[1])-8,fontSize:12,fontWeight:600,fill:G.out,children:"y"})]})]})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Ce.map(f=>e.jsx("button",{type:"button",className:i===f.id?Ye:Ve,"aria-pressed":i===f.id,onClick:()=>r(f.id),children:f.text},f.id))}),e.jsx(U,{label:"x₁",value:t[0],onChange:f=>d([f,t[1]]),min:-3,max:3,step:.01,accent:G.x}),e.jsx(U,{label:"x₂",value:t[1],onChange:f=>d([t[0],f]),min:-3,max:3,step:.01,accent:G.x}),e.jsx(U,{label:"rel. Inputfehler",value:h,onChange:l,min:.005,max:.1,step:.005,accent:G.pert,fmt:f=>`${s(100*f,1)} %`}),e.jsxs("div",{className:`space-y-1 p-3 text-sm ${Fe}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-40 shrink-0 text-right text-xs",style:{color:G.pert},children:"rel. Inputfehler"}),en(h,G.pert),e.jsxs("span",{className:"w-16 shrink-0 text-right font-mono text-xs",children:[s(100*h,1)," %"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-40 shrink-0 text-right text-xs",style:{color:G.out},children:"rel. Outputfehler"}),en(j,G.out),e.jsx("span",{className:"w-16 shrink-0 text-right font-mono text-xs",children:Number.isFinite(j)?`${s(100*j,j>1?0:1)} %`:"–"})]}),e.jsxs("div",{className:"grid gap-x-6 gap-y-0.5 pt-1 font-mono text-xs sm:grid-cols-2",children:[e.jsxs("span",{children:["A = (",s(o[0][0],2)," ",s(o[0][1],2),"; ",s(o[1][0],2)," ",s(o[1][1],2),")"]}),e.jsxs("span",{children:["σ_max = ",s(x,3),", σ_min = ",s(m,4)]}),e.jsxs("span",{style:{color:G.out},children:["y = A⁻¹x = (",s(c[0],2),"; ",s(c[1],2),")"]}),e.jsxs("span",{style:{color:G.amp},children:["κ_rel(f, x) = ",s(S,2)]}),e.jsxs("span",{className:"sm:col-span-2",style:{color:G.amp},children:["Schranke κ(A) = σ_max/σ_min = ",s(a,2)," · ausgeschöpft zu"," ",s(100*ne,0)," %"]})]})]}),Ne]})}function In({frage:i,children:r}){return e.jsxs("details",{className:"my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600",children:[e.jsxs("summary",{className:"cursor-pointer select-none px-3 py-2",children:[e.jsx("span",{className:"font-semibold",children:"Selbsttest."})," ",i," ",e.jsx("span",{className:"text-sm text-slate-500 dark:text-slate-400",children:"(Lösung aufklappen)"})]}),e.jsx("div",{className:"space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700",children:r})]})}function dn(i){const r={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(r.p,{children:["In ",e.jsx(r.a,{href:"#sec-4.1",children:"Abschnitt 4.1"}),` haben wir den Gesamtfehler
einer numerischen Rechnung in zwei Teile zerlegt: den Fehler des Algorithmus selbst und
den Folgefehler, der aus einem fehlerhaften Input entsteht. Um den zweiten Teil geht es
jetzt. Inputfehler betrachten wir als `,e.jsx(r.em,{children:"unvermeidbar"}),`: Messwerte sind ungenau,
Daten wurden gerundet gespeichert, und schon das Ablegen einer reellen Zahl als
`,e.jsx(b,{id:"floating-point",children:"Gleitkommazahl"}),` erzeugt einen relativen
`,e.jsx(b,{id:"rounding-error",children:"Rundungsfehler"}),` von der Größenordnung der
`,e.jsx(b,{id:"machine-epsilon",children:"Maschinengenauigkeit"}),"."]}),`
`,e.jsxs(r.p,{children:[`Die entscheidende Beobachtung: Wie stark sich solche Inputfehler im Ergebnis
niederschlagen, ist eine Eigenschaft des `,e.jsx(r.em,{children:"Problems"})," ",e.jsx(n,{children:"f"}),`, noch bevor
irgendein Algorithmus ins Spiel kommt. Stellen wir uns die Menge aller Inputs vor, die
wir von `,e.jsx(n,{children:"\\bx"}),` nicht unterscheiden können, weil ihr relativer Fehler unter einer
Toleranz `,e.jsx(n,{children:"\\delta"})," liegt:"]}),`
`,e.jsx(g,{children:"E = \\left\\{ \\wt{\\bx} \\colon \\left\\| \\wt{\\bx} - \\bx \\right\\| / \\left\\| \\bx \\right\\| \\le \\delta \\right\\}."}),`
`,e.jsxs(r.p,{children:["Jeder Punkt in ",e.jsx(n,{children:"E"}),` ist ein plausibler Input, also ist jeder Punkt der Bildmenge
`,e.jsx(n,{children:"R = f(E)"})," ein plausibles Ergebnis. Ist ",e.jsx(n,{children:"R"})," ",e.jsx(r.em,{children:"groß"}),` im Vergleich
zu `,e.jsx(n,{children:"E"}),", bläst ",e.jsx(n,{children:"f"}),` kleine Eingabestörungen zu großen
Ergebnisänderungen auf. Wir nennen das Problem dann
`,e.jsx(r.em,{children:"schlecht konditioniert"}),`. Vorsicht: Kein noch so guter Algorithmus kann das
reparieren, denn er sieht nur `,e.jsx(n,{children:"\\wt{\\bx}"}),` und kann nicht wissen, welcher Punkt
von `,e.jsx(n,{children:"E"}),' der „wahre" Input war.']}),`
`,e.jsxs(r.h3,{id:"sec-ein-warnbeispiel-der-kehrwert",children:["4.2.1 ","Ein Warnbeispiel: der Kehrwert"]}),`
`,e.jsx(r.p,{children:"Wie schlimm kann es werden? Ein bewusst extremes Beispiel:"}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.2.1 (Kehrwert nahe null)",id:"env-kehrwert-nahe-null",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"f(x) = x^{-1}"})," mit Input ",e.jsx(n,{children:"x = 10^{-17}"}),`, und sei der gestörte
Input `,e.jsx(n,{children:"\\wt{x} = x + \\cred{\\eps}"}),` mit
`,e.jsx(n,{children:"\\cred{\\eps} \\in \\left(-10^{-17},\\, 10^{-17}\\right)"}),`. Dann durchläuft
`,e.jsx(n,{children:"\\wt{x}"})," das Intervall ",e.jsx(n,{children:"\\left(0,\\, 2 \\cdot 10^{-17}\\right)"}),` und
damit`]}),e.jsx(g,{children:"f(\\wt{x}) = \\frac{1}{\\wt{x}} \\in \\left( \\tfrac{1}{2} \\cdot 10^{17},\\, \\infty \\right)."}),e.jsxs(r.p,{children:["Der Output kann also um ",e.jsx(r.em,{children:"Größenordnungen"}),` vom wahren Wert
`,e.jsx(n,{children:"f(x) = 10^{17}"}),` abweichen. Rechnen wir den relativen Outputfehler explizit
aus. Die Störung `,e.jsx(n,{children:"\\cred{\\eps}"})," verfolgen wir in Rot:"]}),e.jsx(g,{children:"f(\\wt{x}) - f(x) = \\frac{1}{x + \\cred{\\eps}} - \\frac{1}{x} = \\frac{x - (x + \\cred{\\eps})}{(x + \\cred{\\eps})\\, x} = \\frac{-\\cred{\\eps}}{(x + \\cred{\\eps})\\, x},"}),e.jsxs(r.p,{children:["und nach Division durch ",e.jsx(n,{children:"f(x) = 1/x"}),":"]}),e.jsx(g,{children:"\\cgreen{\\frac{\\left| f(\\wt{x}) - f(x) \\right|}{\\left| f(x) \\right|}} = \\frac{\\left| \\cred{\\eps} \\right|}{\\left| x + \\cred{\\eps} \\right|} = \\corange{\\frac{|x|}{\\left| x + \\cred{\\eps} \\right|}} \\cdot \\frac{\\left| \\cred{\\eps} \\right|}{|x|}."}),e.jsxs(r.p,{children:["Der ",e.jsx(r.em,{children:"relative Outputfehler"})," ist also der ",e.jsx(r.em,{children:"relative Inputfehler"}),`, multipliziert mit dem
`,e.jsx(r.em,{children:"Verstärkungsfaktor"}),`
`,e.jsx(n,{children:"\\corange{|x| / |x + \\cred{\\eps}|}"}),`. Für
`,e.jsx(n,{children:"\\cred{\\eps} \\to -10^{-17}"}),` wächst dieser Faktor über alle Grenzen;
insgesamt durchläuft der relative Outputfehler das gesamte Intervall
`,e.jsx(n,{children:"[0, \\infty)"}),`. Und das, obwohl die Störung absolut winziger ist als jede
Messgenauigkeit der Welt: `,e.jsx(n,{children:"|\\cred{\\eps}| < 10^{-17}"}),`. Relativ zu
`,e.jsx(n,{children:"x"}),` kann sie allerdings bis zu 100 % betragen. Diesen Unterschied schauen wir
uns gleich noch genauer an.`]})]}),`
`,e.jsxs(be,{title:"Kondition-Spielwiese: der Kehrwert unter Störungen",children:[e.jsxs(r.p,{children:[`Wie schnell wächst dieser Verstärkungsfaktor eigentlich? Die Frage lässt sich schätzen, bevor
wir sie ausrechnen: Steht der Input bei `,e.jsx(n,{children:"x = 0{,}6"}),`, wie weit müssen wir ihn dann
stören, damit der relative Outputfehler zehnmal so groß wird wie der relative Inputfehler?`]}),e.jsx(un,{frage:e.jsxs(e.Fragment,{children:["Wie groß muss die Störung ",e.jsx(n,{children:"\\eps"})," bei ",e.jsx(n,{children:"x = 0{,}6"})," sein, damit der relative Outputfehler zehnmal so groß ist wie der relative Inputfehler?"]}),variante:"bereich",loesung:-.54,toleranz:.02,einheit:"ε",min:-.55,max:0,schritt:.005,start:-.2,fmt:t=>t.toFixed(3).replace(".",",").replace("-","−"),verdeckt:e.jsxs(r.p,{className:"max-w-prose text-sm",children:["Die Verstärkung ist ",e.jsx(n,{children:"|x| / |x + \\eps|"}),". Zehnfach heißt",e.jsx(n,{children:"|x + \\eps| = x/10 = 0{,}06"}),", also ",e.jsx(n,{children:"\\eps = -0{,}54"}),": 90 % der Strecke von ",e.jsx(n,{children:"x"})," zur Polstelle."]}),children:e.jsx(An,{})}),e.jsxs(r.p,{children:["Das Widget zeigt beide Regime an einem Bild. Solange ",e.jsx(n,{children:"\\cred{\\eps}"}),` klein gegenüber
`,e.jsx(n,{children:"x"}),` ist, sind roter und grüner Balken fast gleich lang, die Verstärkung liegt nahe
`,e.jsx(n,{children:"1"}),". Schieben wir ",e.jsx(n,{children:"\\wt{x}"}),` dagegen an die Polstelle, wächst der grüne
Outputbalken über den Bildrand hinaus, während der rote Inputbalken kaum länger wird. Bei
`,e.jsx(n,{children:"x = 0{,}6"})," und ",e.jsx(n,{children:"\\cred{\\eps} = -0{,}54"}),` ist die Verstärkung genau
`,e.jsx(n,{children:"10"}),", bei ",e.jsx(n,{children:"\\cred{\\eps} = -0{,}45"}),` (der Voreinstellung) ist sie
`,e.jsx(n,{children:"4"}),"."]})]}),`
`,e.jsxs(r.h3,{id:"sec-konditionszahlen",children:["4.2.2 ","Konditionszahlen"]}),`
`,e.jsxs(r.p,{children:[`Um „sensitiv gegenüber Inputfehlern" quantitativ zu fassen, setzen wir Output- und
Inputfehler direkt ins Verhältnis, einmal für absolute, einmal für relative Fehler. Im
Folgenden betrachten wir Abbildungen `,e.jsx(n,{children:"f \\colon \\R^n \\to \\R^m"}),`;
`,e.jsx(n,{children:"\\left\\| \\cdot \\right\\|"})," bezeichnet eine beliebige Vektor",e.jsx(b,{id:"norm",children:"norm"}),` bzw. die von ihr induzierte
`,e.jsx(b,{id:"matrix-norm",children:"Operatornorm"})," für Matrizen (",e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),")."]}),`
`,e.jsxs(R,{kind:"Definition",label:"4.2.2 (Konditionszahl)",id:"env-konditionszahl",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"f"})," ein Problem mit Input ",e.jsx(n,{children:"\\bx"}),`. Für die relative Konditionszahl setzen
wir `,e.jsx(n,{children:"\\|\\bx\\|\\ne0"})," und ",e.jsx(n,{children:"\\|f(\\bx)\\|\\ne0"})," voraus."]}),e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["Die ",e.jsx(r.em,{children:"absolute Konditionszahl"})," ist"]}),`
`,e.jsx(g,{children:`\\kappa_{abs}(f,\\bx)
=\\limsup_{\\substack{\\bh\\to\\bnull\\\\\\bh\\ne\\bnull}}
\\frac{\\|f(\\bx+\\bh)-f(\\bx)\\|}{\\|\\bh\\|}.`}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["Die ",e.jsx(r.em,{children:"relative Konditionszahl"})," ist"]}),`
`,e.jsx(g,{children:`\\kappa_{rel}(f,\\bx)
=\\limsup_{\\substack{\\bh\\to\\bnull\\\\\\bh\\ne\\bnull}}
\\frac{\\|f(\\bx+\\bh)-f(\\bx)\\|/\\|f(\\bx)\\|}{\\|\\bh\\|/\\|\\bx\\|}.`}),`
`]}),`
`]})]}),`
`,e.jsx(R,{kind:"Bemerkung",label:"4.2.3 (Wie lesen wir das?)",id:"env-wie-lesen-wir-das",children:e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[`Der Limes superior betrachtet alle Richtungen, aus denen kleine Störungen gegen
null gehen. `,e.jsx(n,{children:"\\kappa"}),` ist also der größte asymptotische Verstärkungsfaktor
`,e.jsx(r.em,{children:"im Grenzfall"}),` verschwindender Störungen. Konditionszahlen sind lokale
Größen, und sie hängen sowohl vom Problem `,e.jsx(n,{children:"f"}),` als auch von der
konkreten Stelle `,e.jsx(n,{children:"\\bx"})," ab."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["Für ",e.jsx(b,{id:"differentiability",children:"differenzierbares"}),`
`,e.jsx(n,{children:"f \\colon \\R \\to \\R"}),` können wir die Konditionszahlen direkt ausrechnen:
Wegen `,e.jsx(n,{children:"f(\\wt{x}) - f(x) \\approx f'(x)\\,(\\wt{x} - x)"})," (",e.jsx(b,{id:"taylor-series",children:"Taylor-Näherung"})," erster Ordnung) gilt"]}),`
`,e.jsx(g,{children:"\\kappa_{abs} = \\left| f'(x) \\right| \\quad \\text{und} \\quad \\kappa_{rel} = \\frac{\\left| f'(x) \\right| \\, |x|}{\\left| f(x) \\right|}."}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["Meist ist ",e.jsx(n,{children:"\\kappa_{rel}"}),` die relevantere Größe: Gleitkommarechnung
erzeugt naturgemäß `,e.jsx(r.em,{children:"relative"})," Fehler (",e.jsx(r.a,{href:"#sec-4.1",children:"Abschnitt 4.1"}),`), und relative Fehler
sind unabhängig von Maßeinheiten und Skalierung.`]}),`
`]}),`
`]})}),`
`,e.jsx(r.p,{children:`Die Konditionszahl sortiert Probleme in gutartige und bösartige, mit einem wichtigen
Extremfall:`}),`
`,e.jsx(R,{kind:"Bemerkung",label:"4.2.4 (Interpretation)",id:"env-interpretation",children:e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.em,{children:"gut konditioniert"})," (",e.jsx(n,{children:"\\kappa \\lesssim 1"}),`): Ein Inputfehler führt
zu einem ähnlich großen oder kleineren Outputfehler.`]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.em,{children:"schlecht konditioniert"})," (",e.jsx(n,{children:"\\kappa \\gg 1"}),`): Ungünstig gerichtete kleine
Inputfehler können zu viel größeren Outputfehlern führen. Als Faustregel bei
`,e.jsx(n,{children:"\\kappa_{rel} \\approx 10^k"}),": Wir verlieren bis zu ",e.jsx(n,{children:"k"}),`
signifikante Dezimalstellen gegenüber der Genauigkeit des Inputs.`]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.em,{children:"schlecht gestellt"})," (engl. ",e.jsx(r.em,{children:"ill-posed"}),", ",e.jsx(n,{children:"\\kappa = \\infty"}),`):
Bei Inputfehlern ist das Problem praktisch nicht lösbar: Beliebig kleine Störungen
können das Ergebnis beliebig stark verfälschen.`]}),`
`]}),`
`]})}),`
`,e.jsxs(r.p,{children:["Mit den Formeln aus ",e.jsx(r.a,{href:"#env-wie-lesen-wir-das",children:"Bemerkung 4.2.3"}),` können wir nun auch das Rätsel aus dem Warnbeispiel
auflösen:`]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.2.5 (Der Kehrwert, aufgelöst)",id:"env-der-kehrwert-aufgeloest",children:[e.jsxs(r.p,{children:["Für ",e.jsx(n,{children:"f(x) = x^{-1}"})," ist ",e.jsx(n,{children:"f'(x) = -x^{-2}"}),`, also an der Stelle
`,e.jsx(n,{children:"x = 10^{-17}"}),":"]}),e.jsx(g,{children:"\\kappa_{abs} = \\left| f'(x) \\right| = \\frac{1}{x^2} = 10^{34}, \\qquad \\kappa_{rel} = \\frac{\\left| f'(x) \\right| \\, |x|}{\\left| f(x) \\right|} = \\frac{x^{-2} \\cdot x}{x^{-1}} = 1."}),e.jsxs(r.p,{children:["Absolut gemessen ist das Problem also katastrophal sensitiv (",e.jsx(n,{children:"\\kappa_{abs} = 10^{34}"}),`),
relativ gemessen dagegen völlig harmlos: Asymptotisch wird ein relativer Inputfehler
von 0,1 % zu einem relativen Outputfehler von ebenfalls 0,1 %. Das Drama in
`,e.jsx(r.a,{href:"#env-kehrwert-nahe-null",children:"Beispiel 4.2.1"})," entsteht, weil die Störungen dort ",e.jsx(r.em,{children:"relativ zu"})," ",e.jsx(n,{children:"x"}),`
eben nicht klein waren (bis zu 100 %): Ein absoluter Fehler fester Größe (etwa ein
additiver Messfehler) bedeutet bei winzigem `,e.jsx(n,{children:"x"}),` eine riesige relative
Störung. Merken wir uns: `,e.jsx(r.em,{children:"Welche"}),` Konditionszahl zählt, hängt davon ab, welche
Fehlerart im Input unvermeidbar ist. Im Widget oben sehen wir beide Regime: Für
kleine `,e.jsx(n,{children:"\\eps/x"})," liegt die Verstärkung nahe 1, erst wenn ",e.jsx(n,{children:"\\eps"}),` in
die Größenordnung von `,e.jsx(n,{children:"x"})," kommt, explodiert sie."]})]}),`
`,e.jsxs(r.h3,{id:"sec-kondition-eines-linearen",children:["4.2.3 ","Kondition eines linearen Gleichungssystems"]}),`
`,e.jsxs(r.p,{children:[`Nun zum wichtigsten Beispiel dieses Kapitels. Wir lösen ein
`,e.jsx(b,{id:"linear-system",children:"lineares Gleichungssystem"}),`
`,e.jsx(n,{children:"\\bA \\by = \\bx"}),` mit invertierbarem
`,e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),", wobei die rechte Seite ",e.jsx(n,{children:"\\bx"}),` der
fehlerbehaftete Input ist. Als Problem geschrieben:
`,e.jsx(n,{children:"f(\\bx) = \\bA^{-1} \\bx = \\by"}),`, wobei die
`,e.jsx(b,{id:"matrix-inverse",children:"Inverse"}),` hier nur die Lösungsabbildung
bezeichnet, nicht etwa eine Empfehlung, sie auszurechnen. Wie sensitiv reagiert die
Lösung `,e.jsx(n,{children:"\\by"})," auf Störungen von ",e.jsx(n,{children:"\\bx"}),`? Die Antwort führt genau auf
die `,e.jsx(r.em,{children:"Konditionszahl der Matrix"}),`
`,e.jsx(n,{children:"\\kappa(\\bA) = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"}),`,
die wir in `,e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),` kennengelernt
haben.`]}),`
`,e.jsxs(R,{kind:"Satz",label:"4.2.6 (Kondition der Lösung eines LGS)",id:"env-kondition-der-loesung-eines-lgs",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` invertierbar und
`,e.jsx(n,{children:"f(\\bx) = \\bA^{-1} \\bx"}),`. Bezüglich einer beliebigen Vektornorm und der von
ihr induzierten Operatornorm gilt dann`]}),e.jsx(g,{children:"\\kappa_{abs} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|}, \\qquad \\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|} \\; \\le \\; \\left\\| \\bA \\right\\| \\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\corange{\\kappa(\\bA)}."})]}),`
`,e.jsxs(Ge,{children:[e.jsx(L,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"f"})," ist ",e.jsx(b,{id:"linear-map",children:"linear"}),"; wir kürzen die Störung als ",e.jsx(n,{children:"\\cbred{\\bh} = \\wt{\\bx} - \\bx"})," ab"]}),children:e.jsx(g,{children:"f(\\wt{\\bx}) - f(\\bx) = \\bA^{-1} \\wt{\\bx} - \\bA^{-1} \\bx = \\bA^{-1} \\cbred{\\bh}"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["definierende Eigenschaft der Operatornorm: ",e.jsx(n,{children:"\\left\\| \\bA^{-1} \\bv \\right\\| \\le \\left\\| \\bA^{-1} \\right\\| \\left\\| \\bv \\right\\|"})," für alle ",e.jsx(n,{children:"\\bv"})," (",e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),")"]}),children:e.jsx(g,{children:"\\left\\| f(\\wt{\\bx}) - f(\\bx) \\right\\| = \\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\| \\le \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\left\\| \\cbred{\\bh} \\right\\| \\quimpl \\kappa_{abs} \\le \\cgreen{\\left\\| \\bA^{-1} \\right\\|}"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["die Operatornorm ist ein Maximum: ",e.jsx(n,{children:"\\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\max_{\\bv \\ne \\bnull} \\left\\| \\bA^{-1} \\bv \\right\\| / \\left\\| \\bv \\right\\|"}),", und eine maximierende Richtung dürfen wir beliebig klein skalieren"]}),children:e.jsxs(r.p,{children:["Keine kleinere Konstante genügt: Wählen wir ",e.jsx(n,{children:"\\cbred{\\bh}"}),` (beliebig
klein) entlang einer maximierenden Richtung, gilt in der Ungleichung Gleichheit.
Also ist `,e.jsx(n,{children:"\\kappa_{abs} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|}"}),"."]})}),e.jsx(L,{why:e.jsx(e.Fragment,{children:"den Quotienten aus relativem Output- und Inputfehler umsortieren; dann liefern Schritt 2 und 3 wieder Schranke und Gleichheitsfall für den ersten Faktor"}),children:e.jsx(g,{children:"\\frac{\\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\| / \\left\\| \\bA^{-1} \\bx \\right\\|}{\\left\\| \\cbred{\\bh} \\right\\| / \\left\\| \\bx \\right\\|} = \\underbrace{\\frac{\\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\|}{\\left\\| \\cbred{\\bh} \\right\\|}}_{\\le\\, \\cgreen{\\left\\| \\bA^{-1} \\right\\|}} \\cdot \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|} \\quimpl \\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|}"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["substituiere ",e.jsx(n,{children:"\\by = \\bA^{-1} \\bx"}),", also ",e.jsx(n,{children:"\\bx = \\bA \\by"}),"; Operatornorm-Schranke ",e.jsx(n,{children:"\\left\\| \\bA \\by \\right\\| \\le \\left\\| \\bA \\right\\| \\left\\| \\by \\right\\|"})]}),children:e.jsx(g,{children:"\\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bA \\by \\right\\|}{\\left\\| \\by \\right\\|} \\le \\left\\| \\bA \\right\\| \\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\corange{\\kappa(\\bA)}"})})]}),`
`,e.jsx(R,{kind:"Bemerkung",label:"4.2.7 (Konditionszahl einer Matrix)",id:"env-kondition-konditionszahl-einer-matrix",children:e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[`Die relative Kondition des Gleichungslösens hängt von der rechten Seite
`,e.jsx(n,{children:"\\bx"})," ab; ",e.jsx(n,{children:"\\corange{\\kappa(\\bA)} = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"}),`
ist die von `,e.jsx(n,{children:"\\bx"})," unabhängige ",e.jsx(r.em,{children:"Worst-Case"}),`-Schranke – und sie wird
für ungünstige `,e.jsx(n,{children:"\\bx"}),` auch angenommen. Das erklärt im Nachhinein, warum
genau dieses Produkt in
`,e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),` den Namen
`,e.jsx(r.em,{children:"Konditionszahl von"})," ",e.jsx(n,{children:"\\bA"})," bekommen hat."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:["Für die von ",e.jsx(n,{children:"\\left\\| \\cdot \\right\\|_2"})," induzierte Operatornorm (",e.jsx(r.em,{children:"Spektralnorm"}),") gilt"]}),`
`,e.jsx(g,{children:"\\kappa_2(\\bA) = \\frac{\\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)}}{\\sqrt{\\lambda_{\\min}\\left(\\bA^\\top\\bA\\right)}} = \\frac{\\sigma_{\\max}(\\bA)}{\\sigma_{\\min}(\\bA)},"}),`
`,e.jsxs(r.p,{children:[`das Verhältnis des größten zum kleinsten
`,e.jsx(b,{id:"singular-value-decomposition",children:"Singulärwert"}),` (bzw. der
Wurzeln der extremen
`,e.jsx(b,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` von
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),")."]}),`
`]}),`
`]})}),`
`,e.jsxs(r.p,{children:[e.jsx(r.a,{href:"#env-kondition-der-loesung-eines-lgs",children:"Satz 4.2.6"}),` hat zwei Aussagen, und die zweite ist die überraschende: Die relative Kondition
hängt von der rechten Seite `,e.jsx(n,{children:"\\bx"}),` ab, aber die Schranke
`,e.jsx(n,{children:"\\corange{\\kappa(\\bA)}"})," wird für ungünstige ",e.jsx(n,{children:"\\bx"}),` auch wirklich
angenommen.`]}),`
`,e.jsxs(be,{title:"Kondition eines Gleichungssystems: aus dem Kreis wird eine Ellipse",children:[e.jsxs(r.p,{children:[`Sehen wir uns an, was das geometrisch heißt. Ein Kreis plausibler rechter Seiten um
`,e.jsx(n,{children:"\\bx"})," wird von ",e.jsx(n,{children:"\\bA^{-1}"}),` zu einer Ellipse verzogen; für welche
`,e.jsx(n,{children:"\\bx"})," ist diese Ellipse groß gemessen an ",e.jsx(n,{children:"\\left\\| \\bA^{-1}\\bx \\right\\|"}),`,
und für welche nicht?`]}),e.jsx(En,{}),e.jsxs(r.p,{children:[`Beide Tafeln zeigen dieselbe Störung, einmal vor und einmal nach dem Lösen. In der
Voreinstellung (`,e.jsx(n,{children:"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1{,}05 \\end{pmatrix}"}),`,
`,e.jsx(n,{children:"\\bx = (2;\\ 2{,}05)^\\top"}),", also ",e.jsx(n,{children:"\\by = (1;\\ 1)^\\top"}),`) schöpft
`,e.jsx(n,{children:"\\kappa_{rel}(f, \\bx) \\approx 82{,}0"}),` die Schranke
`,e.jsx(n,{children:"\\corange{\\kappa(\\bA)} \\approx 82{,}0"}),` zu 99,99 % aus: Aus 5 % Inputfehler werden
410 % Outputfehler, aus dem kleinen roten Kreis links wird die lange Nadel rechts. Ziehen wir
`,e.jsx(n,{children:"\\bx"})," dagegen in Richtung ",e.jsx(n,{children:"(1;\\ -1)^\\top"}),`, fällt
`,e.jsx(n,{children:"\\kappa_{rel}"})," auf ",e.jsx(n,{children:"1"}),", obwohl die Matrix dieselbe bleibt."]})]}),`
`,e.jsxs(In,{frage:e.jsxs(e.Fragment,{children:["Sei"," ",e.jsx(n,{children:"\\bA = \\begin{pmatrix} 2 & 0 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 0{,}1 \\end{pmatrix}"}),". Was ist die Konditionszahl ",e.jsx(n,{children:"\\kappa_2(\\bA)"})," bezüglich der 2-Norm: 2, 5, 20 oder 50?"]}),children:[e.jsxs(r.p,{children:["Für eine ",e.jsx(b,{id:"diagonal-matrix",children:"Diagonalmatrix"}),` ist
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\diag\\left(4,\\, 25,\\, 0{,}01\\right)"}),`, die
Singulärwerte sind also die Beträge der Diagonaleinträge:
`,e.jsx(n,{children:"\\sigma \\in \\{2,\\, 5,\\, 0{,}1\\}"}),". Damit"]}),e.jsx(g,{children:"\\kappa_2(\\bA) = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}} = \\frac{5}{0{,}1} = 50."}),e.jsxs(r.p,{children:["Vorsicht vor der Distraktor-Antwort 20 ",e.jsx(n,{children:"= 2/0{,}1"}),`: Der größte Singulärwert
ist 5, nicht der erste Diagonaleintrag 2. Die Werte 2 und 5 wären nur Normen, keine
Konditionszahlen; `,e.jsx(n,{children:"\\kappa_2"})," misst das ",e.jsx(r.em,{children:"Verhältnis"}),` von stärkster zu
schwächster Streckung.`]})]}),`
`,e.jsxs(r.h3,{id:"sec-aufgabe-die-kondition-einer-summe",children:["4.2.4 ","Aufgabe: die Kondition einer Summe"]}),`
`,e.jsx(r.p,{children:`Zum Abschluss eine Aufgabe. Versuchen wir es erst selbst, bevor wir die
Lösung aufklappen. Sie sieht harmlos aus, trägt aber den Keim eines Phänomens in sich,
das wir schon kennen.`}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.2.8 (Aufgabe: Kondition der Summe)",id:"env-aufgabe-kondition-der-summe",children:[e.jsxs(r.p,{children:[`Sei
`,e.jsx(n,{children:"f(\\bx) = x_1 + x_2 = \\binom{1}{1}^\\top \\bx = \\symbf{1}^\\top \\bx"}),` mit
`,e.jsx(n,{children:"\\bx \\in \\R^2"}),` und der euklidischen Norm
`,e.jsx(n,{children:"\\left\\| \\cdot \\right\\|_2"}),"."]}),e.jsxs(r.ol,{children:[`
`,e.jsx(r.li,{children:"Was sind die Konditionszahlen?"}),`
`,e.jsxs(r.li,{children:["Für welche ",e.jsx(n,{children:"\\bx"})," ist das Problem schlecht konditioniert?"]}),`
`]}),e.jsxs("details",{className:"mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium",children:"Lösung anzeigen"}),e.jsxs("div",{className:"space-y-2 pt-2",children:[e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"1."})," Für die Störung ",e.jsx(n,{children:"\\cbred{\\bh} = \\wt{\\bx} - \\bx"}),`
liefert die
`,e.jsx(b,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"})]}),e.jsx(g,{children:"\\left| f(\\wt{\\bx}) - f(\\bx) \\right| = \\left| \\symbf{1}^\\top \\cbred{\\bh} \\right| \\le \\left\\| \\symbf{1} \\right\\|_2 \\left\\| \\cbred{\\bh} \\right\\|_2 = \\sqrt{2}\\, \\left\\| \\cbred{\\bh} \\right\\|_2,"}),e.jsxs(r.p,{children:["mit Gleichheit genau dann, wenn ",e.jsx(n,{children:"\\cbred{\\bh}"}),` parallel zu
`,e.jsx(n,{children:"\\symbf{1} = (1, 1)^\\top"}),` liegt. Solche beliebig kleinen Störungen
gibt es, also ist die Schranke scharf: Der Gleichheitsfall von Cauchy-Schwarz
liefert hier nicht nur `,e.jsx(n,{children:"\\kappa_{abs} \\le \\sqrt{2}"}),`, sondern
`,e.jsx(n,{children:"\\kappa_{abs} = \\sqrt{2}"}),". Da ",e.jsx(n,{children:"f"}),` linear ist, tritt derselbe
Gleichheitsfall auch beim relativen Fehlerquotienten auf, und wie im Beweis von
`,e.jsx(r.a,{href:"#env-kondition-der-loesung-eines-lgs",children:"Satz 4.2.6"})," folgt"]}),e.jsx(g,{children:"\\kappa_{rel} = \\kappa_{abs}\\, \\frac{\\left\\| \\bx \\right\\|_2}{\\left| f(\\bx) \\right|} = \\corange{\\frac{\\sqrt{2}\\, \\left\\| \\bx \\right\\|_2}{\\left| x_1 + x_2 \\right|}}."}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"2."}),` Schlecht konditioniert ist das Problem, wenn
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}} \\gg 1"}),`, also wenn
`,e.jsx(n,{children:"\\left| x_1 + x_2 \\right| \\approx 0"}),`, während
`,e.jsx(n,{children:"\\left\\| \\bx \\right\\|_2"}),` nicht klein ist, sprich für
`,e.jsx(n,{children:"x_1 \\approx -x_2"}),`, nahe der Antidiagonalen. Dort heben sich die beiden
Summanden fast auf: Das ist exakt die
`,e.jsx(b,{id:"cancellation",children:"Auslöschung"}),` aus
`,e.jsx(r.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),`, jetzt als
Konditionsaussage über das `,e.jsx(r.em,{children:"Problem"}),` „addiere zwei Zahlen", unabhängig
davon, wie wir die Summe ausrechnen. Auf der Diagonalen
`,e.jsx(n,{children:"x_1 = x_2"})," gilt dagegen ",e.jsx(n,{children:"\\kappa_{rel} = 1"}),`: besser geht es
nicht.`]})]})]})]}),`
`,e.jsxs(be,{title:"Kondition-Spielwiese: die Summe zweier Zahlen in der Ebene",children:[e.jsxs(r.p,{children:[`Die Antwort auf Teil 2 lässt sich auch als Landkarte über der Ebene lesen: Für welche Punkte
`,e.jsx(n,{children:"\\bx"}),` ist die Summe gutmütig, für welche katastrophal, und wie schnell wechselt
das eine ins andere?`]}),e.jsx(_n,{}),e.jsxs(r.p,{children:[`Die Karte macht zwei Dinge sichtbar, die in der Formel stecken, aber leicht zu übersehen sind.
Erstens ist sie entlang jedes Strahls durch den Ursprung einfarbig: Da Zähler und Nenner von
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}}"})," beide homogen vom Grad 1 in ",e.jsx(n,{children:"\\bx"}),` sind, zählt
allein die `,e.jsx(r.em,{children:"Richtung"}),`. Zweitens liegt der ganze Ärger in einer beliebig dünnen
Umgebung der Antidiagonalen: Bei `,e.jsx(n,{children:"\\bx = (1{,}5;\\ -1{,}45)^\\top"}),` ist
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}} \\approx 59"}),`, also gut zwei verlorene Dezimalstellen; ein
Schritt weiter auf `,e.jsx(n,{children:"(1{,}5;\\ -1{,}5)^\\top"})," und das Problem ist schlecht gestellt."]})]}),`
`,e.jsxs(r.p,{children:[`Diese Rechnung ist mehr als eine Fingerübung: In
`,e.jsx(r.a,{href:"#sec-4.3",children:"Abschnitt 4.3"}),` wird genau die Kondition der
Differenz zweier fast gleicher Zahlen erklären, warum die
Verschiebungsformel für die Varianz numerisch scheitert.`]}),`
`,e.jsx(r.h3,{children:"Selbsttest"}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(Le,{children:[e.jsxs(ge,{wahr:!1,children:[e.jsx(r.p,{children:"Ein schlecht konditioniertes Problem lässt sich durch einen besseren Algorithmus retten."}),e.jsxs(r.p,{children:["Die Kondition ist eine Eigenschaft des Problems ",e.jsx(n,{children:"f"}),` an der Stelle
`,e.jsx(n,{children:"\\bx"}),`, nicht der Rechenvorschrift. Ein Algorithmus sieht nur
`,e.jsx(n,{children:"\\wt{\\bx}"}),` und kann nicht wissen, welcher Punkt der ununterscheidbaren Menge
`,e.jsx(n,{children:"E"})," der wahre Input war. Ein ",e.jsx(r.em,{children:"stabiler"}),` Algorithmus liefert trotzdem
etwas: nämlich nicht mehr Fehler, als das Problem erzwingt.`]})]}),e.jsxs(ge,{wahr:!1,children:[e.jsxs(r.p,{children:["Die absolute Konditionszahl von ",e.jsx(n,{children:"f(x) = 1/x"})," ist bei ",e.jsx(n,{children:"x = 10^{-17}"}),`
riesig, also ist das Problem dort in jedem Sinn schlecht konditioniert.`]}),e.jsxs(r.p,{children:[e.jsx(n,{children:"\\kappa_{abs} = 10^{34}"}),", aber ",e.jsx(n,{children:"\\kappa_{rel} = 1"})," (",e.jsx(r.a,{href:"#env-der-kehrwert-aufgeloest",children:"Beispiel 4.2.5"}),`).
Welche der beiden zählt, hängt davon ab, welche Fehlerart im Input unvermeidbar ist. Bei
Gleitkommarechnung sind das `,e.jsx(r.em,{children:"relative"}),` Fehler, und die gibt der Kehrwert
unverändert weiter.`]})]}),e.jsxs(ge,{wahr:!0,children:[e.jsxs(r.p,{children:["Für dieselbe Matrix ",e.jsx(n,{children:"\\bA"}),` kann das Lösen von
`,e.jsx(n,{children:"\\bA\\by = \\bx"})," je nach rechter Seite gut oder schlecht konditioniert sein."]}),e.jsxs(r.p,{children:["Nach ",e.jsx(r.a,{href:"#env-kondition-der-loesung-eines-lgs",children:"Satz 4.2.6"}),` ist
`,e.jsx(n,{children:"\\kappa_{rel} = \\left\\| \\bA^{-1} \\right\\| \\left\\| \\bx \\right\\| / \\left\\| \\bA^{-1}\\bx \\right\\|"}),`,
und dieser Quotient hängt von der Richtung von `,e.jsx(n,{children:"\\bx"}),` ab. Er schöpft die
Schranke `,e.jsx(n,{children:"\\corange{\\kappa(\\bA)}"}),` nur für ungünstige rechte Seiten aus; im LGS-Widget
sind das die Richtungen nahe 45°.`]})]}),e.jsxs(_e,{loesung:1,toleranz:.05,children:[e.jsxs(r.p,{children:[`Stellen wir im Widget zur Kondition der Summe die Voreinstellung „Diagonale" ein. Welchen Wert
zeigt der Readout für `,e.jsx(n,{children:"\\kappa_{rel}"}),"?"]}),e.jsxs(r.p,{children:["Eins. Auf der Diagonalen ",e.jsx(n,{children:"x_2 = x_1"}),` ist
`,e.jsx(n,{children:"\\left\\| \\bx \\right\\|_2 = \\sqrt{2}\\,|x_1|"}),` und
`,e.jsx(n,{children:"|x_1 + x_2| = 2|x_1|"}),`, also
`,e.jsx(n,{children:"\\kappa_{rel} = \\sqrt{2} \\cdot \\sqrt{2}\\,|x_1| / (2|x_1|) = 1"}),`. Besser als 1 geht
nicht: Relative Inputfehler werden dort überhaupt nicht verstärkt.`]})]})]})}),`
`,e.jsx(r.p,{children:e.jsx(r.em,{children:"Vertiefung: Heath §1.2.5–1.2.6 (Fehlerfortpflanzung, Sensitivität und Kondition)."})})]})}function Wn(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(dn,{...i})}):dn(i)}const B={rot:W.rot,blau:W.blau,gruen:W.gruen,orange:W.orange,violett:W.violett},Qe=470,Be=260,Ae=-3.3,$e=3.3,cn=-1.4,Je=10.5,Z=i=>(i-Ae)/($e-Ae)*Qe,T=i=>Be-(i-cn)/(Je-cn)*Be;function Kn(i){const r="⁰¹²³⁴⁵⁶⁷⁸⁹";return(i<0?"⁻":"")+String(Math.abs(i)).split("").map(t=>r[Number(t)]).join("")}function Ue(i){const r=Math.abs(i);if(r===0)return"0";if(r>=.001)return s(r,4);const t=Math.floor(Math.log10(r));return`${s(r/10**t,1)} · 10${Kn(t)}`}const Rn=[{id:"monoton",text:"monoton (α = 0,25)",alpha:.25},{id:"oszill",text:"oszillierend (α = 0,72)",alpha:.72},{id:"grenz",text:"Grenzfall (α = 1)",alpha:1},{id:"div",text:"divergent (α = 1,15)",alpha:1.15}];function $n({aufgeloest:i}){const[r,t]=I.useState(.72),[d,h]=I.useState(0),{seed:l,neueStichprobe:o}=pn(1),k=30,x=2.5,{thetas:m,diverged:a}=I.useMemo(()=>{const p=fn(l*9301+49297),u=[x];let K=x,O=!1;for(let H=0;H<k;H++){const de=2*d*(p()+p()+p()-1.5);if(K=K-r*(2*K+de),u.push(K),!Number.isFinite(K)||Math.abs(K)>1e4){O=!0;break}}return{thetas:u,diverged:O}},[r,d,l]),c=Math.abs(1-2*r),z=Math.abs(c-1)<1e-9,y=a||c>1?B.rot:z?B.violett:r>.5?B.orange:B.gruen,S=Array.from({length:97},(p,u)=>{const K=Ae+($e-Ae)*u/96;return`${Z(K).toFixed(1)},${T(K*K).toFixed(1)}`}).join(" "),v=m.map(p=>`${Z(p).toFixed(1)},${T(p*p).toFixed(1)}`).join(" "),j=m[m.length-1],$=a||c>1?e.jsxs(A,{kind:"fail",titel:"Divergent.",children:["Ohne Rauschen wird der Abstand in jedem Schritt mit ",s(c,2)," vergrößert; die Iterierten verlassen hier nach ",m.length-1," Schritten den Plot. Rauschen ändert einzelne Schritte, aber nicht die Instabilität des Verstärkungsfaktors. Das ist das Signaturverhalten aus ",N("beispiel:stochastic-gradient-descent"),"."]}):z?e.jsxs(A,{kind:"warn",titel:"Grenzfall.",children:["Ohne Rauschen springen die Iterierten mit konstanter Amplitude um das Minimum, weder Konvergenz noch Divergenz: ",e.jsx(n,{children:"|\\theta_k|"})," bleibt bei ",s(Math.abs(j),2),".",d>0&&" Mit Rauschen kommt zusätzlich ein zufälliger Schritt hinzu; eine Konvergenz zum Minimum gibt es dann erst recht nicht."]}):r>.5?e.jsxs(A,{kind:"ok",titel:"Oszillierend, aber konvergent.",children:["Jeder Schritt springt über das Minimum hinweg und landet auf der anderen Seite; der Abstand schrumpft trotzdem, nach ",m.length-1," Schritten auf"," ",Ue(j),".",d>0&&" Das Rauschen legt zusätzlich einen Teppich um das Minimum: Je größer die Lernrate, desto stärker schlagen die Schätzfehler des Gradienten durch."]}):e.jsxs(A,{kind:"ok",titel:"Monoton konvergent.",children:["Die Iterierten laufen von einer Seite auf das Optimum zu, nach ",m.length-1," ","Schritten ist ",e.jsx(n,{children:"|\\theta_k|"})," = ",Ue(j),".",d>0&&" Mit Rauschen bleibt ein Restzappeln um das Minimum: Der geschätzte Gradient ist auch dort nicht null."]});return e.jsxs("div",{className:"space-y-2",children:[e.jsxs(me,{children:["Schieben wir die Lernrate ",e.jsx(n,{children:"\\alpha"})," nach oben und beobachten, wann die Iterierten aufhören, auf das Minimum zuzulaufen."]}),e.jsxs("svg",{viewBox:`0 0 ${Qe} ${Be}`,className:"max-w-full h-auto rounded border border-slate-300 dark:border-slate-600",role:"img","aria-label":`Parabel L(theta) = theta Quadrat mit dem Pfad der Iterierten bei Lernrate ${s(r,2)}; der Pfad ist derzeit ${a||c>1?"divergent":z?"am Grenzfall":r>.5?"oszillierend konvergent":"monoton konvergent"}.`,children:[e.jsx("rect",{x:0,y:0,width:Qe,height:Be,fill:"var(--w-bg)"}),e.jsx("line",{x1:Z(Ae),y1:T(0),x2:Z($e),y2:T(0),stroke:"var(--w-axis)",strokeWidth:1}),[-3,-2,-1,1,2,3].map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:Z(p),y1:T(0)-3,x2:Z(p),y2:T(0)+3,stroke:"var(--w-axis)"}),e.jsx("text",{x:Z(p),y:T(0)+14,textAnchor:"middle",fontSize:10,fill:"var(--w-muted)",children:p})]},p)),e.jsx("text",{x:Z($e)-6,y:T(0)-6,textAnchor:"end",fontSize:11,fill:"var(--w-muted)",children:"θ"}),e.jsx("line",{x1:Z(0),y1:T(0),x2:Z(0),y2:T(Je),stroke:"var(--w-grid-strong)",strokeDasharray:"4 3",strokeWidth:1}),e.jsx("text",{x:Z(0)+5,y:T(Je)+12,fontSize:10,fill:"var(--w-muted)",children:"θ* = 0"}),e.jsx("polyline",{points:S,fill:"none",stroke:B.blau,strokeWidth:2}),e.jsx("text",{x:Z(-2.9),y:T(8.7),fontSize:11,fill:B.blau,children:"L(θ) = θ²"}),e.jsx("polyline",{points:v,fill:"none",stroke:y,strokeWidth:1.5,strokeOpacity:.65}),m.filter(p=>Math.abs(p)<50).map((p,u)=>e.jsx("circle",{cx:Z(p),cy:T(p*p),r:3,fill:y,fillOpacity:.9},u)),e.jsx("text",{x:Z(x)+6,y:T(x*x)-6,fontSize:10,fill:"var(--w-muted)",children:"θ₀"})]}),e.jsx(U,{label:"Lernrate α",value:r,onChange:t,min:.02,max:1.3,step:.01,accent:B.orange}),e.jsx(U,{label:"Rauschen σ",value:d,onChange:h,min:0,max:2,step:.05}),d>0&&e.jsx("button",{type:"button",className:Ve,onClick:o,children:"Rauschen neu würfeln"}),i&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex flex-wrap gap-2",children:Rn.map(p=>e.jsx("button",{type:"button",className:Math.abs(r-p.alpha)<1e-9?Ye:Ve,"aria-pressed":Math.abs(r-p.alpha)<1e-9,onClick:()=>t(p.alpha),children:p.text},p.id))}),e.jsxs("p",{className:"text-sm",children:["Verstärkungsfaktor pro Schritt:"," ",e.jsxs("span",{className:"font-mono font-semibold",style:{color:y},children:["|1 − 2α| = ",s(c,2)]})," · ","nach ",m.length-1," Schritten:"," ",e.jsxs("span",{className:"font-mono",children:["|θ| ≈ ",Math.abs(j)<1e4?Ue(j):"> 10⁴"]})]})]}),$]})}function Gn(){const t=l=>34+l/1.4*256,d=l=>108-l/1.6*96,h=Array.from({length:71},(l,o)=>{const k=1.4*o/70;return`${t(k).toFixed(1)},${d(Math.abs(1-2*k)).toFixed(1)}`}).join(" ");return e.jsxs("div",{className:"space-y-1",children:[e.jsxs("svg",{viewBox:"0 0 300 130",className:"max-w-full h-auto",role:"img","aria-label":"Der Verstärkungsfaktor Betrag von 1 minus 2 alpha als Funktion der Lernrate; er unterschreitet 1 zwischen alpha gleich 0 und alpha gleich 1.",children:[e.jsx("rect",{x:0,y:0,width:300,height:130,fill:"var(--w-bg)"}),e.jsx("line",{x1:34,y1:d(0),x2:292,y2:d(0),stroke:"var(--w-axis)"}),e.jsx("line",{x1:34,y1:12,x2:34,y2:d(0),stroke:"var(--w-axis)"}),e.jsx("line",{x1:34,y1:d(1),x2:292,y2:d(1),stroke:B.rot,strokeDasharray:"5 4"}),e.jsx("text",{x:290,y:d(1)-4,textAnchor:"end",fontSize:10,fill:B.rot,children:"ρ = 1"}),e.jsx("line",{x1:t(1),y1:12,x2:t(1),y2:d(0),stroke:B.rot,strokeDasharray:"5 4"}),e.jsx("polyline",{points:h,fill:"none",stroke:B.orange,strokeWidth:2}),[0,.5,1].map(l=>e.jsx("g",{children:e.jsx("text",{x:t(l),y:d(0)+13,textAnchor:"middle",fontSize:10,fill:"var(--w-muted)",children:s(l,1)})},l)),e.jsx("text",{x:292,y:d(0)+13,textAnchor:"end",fontSize:10,fill:"var(--w-muted)",children:"α"}),e.jsx("text",{x:6,y:d(1)+4,fontSize:10,fill:"var(--w-muted)",children:"1"}),e.jsx("text",{x:6,y:d(0)+4,fontSize:10,fill:"var(--w-muted)",children:"0"})]}),e.jsxs("p",{className:`max-w-prose text-xs ${ie}`,children:["Der Verstärkungsfaktor ",e.jsx(n,{children:"\\rho(\\alpha) = |1 - 2\\alpha|"}),": null bei"," ",e.jsx(n,{children:"\\alpha = 0{,}5"})," (ein Schritt genügt), Vorzeichenwechsel und damit Oszillation darüber, und ab ",e.jsx(n,{children:"\\alpha > 1"})," ist ",e.jsx(n,{children:"\\rho > 1"}),"."]})]})}function Vn(){return e.jsx(un,{frage:e.jsxs(e.Fragment,{children:["Tippen wir zuerst: ab welcher Lernrate ",e.jsx(n,{children:"\\alpha"})," kippt es?"]}),variante:"bereich",loesung:1,toleranz:.05,einheit:"α",min:.1,max:1.4,schritt:.05,start:.6,fmt:i=>s(i,2),verdeckt:e.jsx(Gn,{}),children:({aufgeloest:i})=>e.jsx($n,{aufgeloest:i})})}function Ie({v:i}){if(Number.isNaN(i))return e.jsx("span",{children:"–"});if(!Number.isFinite(i))return e.jsx("span",{children:"∞"});if(i===0)return e.jsx("span",{children:"0"});const r=Math.floor(Math.log10(Math.abs(i)));return r>=-3&&r<=3?e.jsx("span",{children:s(i,Math.max(0,3-r))}):e.jsxs("span",{children:[s(i/10**r,1)," · 10",e.jsx("sup",{children:r})]})}function Pn(){const[i,r]=I.useState("c"),[t,d]=I.useState(5),[h,l]=I.useState("2000"),[o,k]=I.useState("1999");let x,m,a,c;if(i==="c"){const v=10**(2*t);x=Math.SQRT2*Math.hypot(v+1,v),m=e.jsxs("span",{children:["10",e.jsx("sup",{children:2*t})," + 1"]}),a=e.jsxs("span",{children:["10",e.jsx("sup",{children:2*t})]}),c=e.jsx("span",{children:"1"})}else{const v=Number(h.replace(",",".")),j=Number(o.replace(",",".")),$=Number.isFinite(v)&&Number.isFinite(j)&&h.trim()!==""&&o.trim()!=="";x=$?v===j?1/0:Math.SQRT2*Math.hypot(v,j)/Math.abs(v-j):NaN,m=e.jsx(Ie,{v}),a=e.jsx(Ie,{v:j}),c=$?e.jsx(Ie,{v:Math.abs(v-j)}):e.jsx("span",{children:"–"})}const z=Math.log10(x),y=Math.max(0,16-z);let S;return Number.isNaN(x)?S=e.jsxs(A,{kind:"neutral",titel:"Keine Zahl.",children:["Geben wir zwei gültige Zahlen ein; auch Exponentialschreibweise wie"," ",e.jsx("span",{className:"font-mono",children:"1e10"})," geht."]}):Number.isFinite(x)?z>=16?S=e.jsxs(A,{kind:"fail",titel:"Nichts bleibt übrig.",children:[e.jsx(n,{children:"\\kappa_{rel} \\cdot \\eps \\gtrsim 1"}),": Von den rund 16 Dezimalstellen doppelter Genauigkeit überlebt keine einzige. Nach ",N("satz:fehlerfortpflanzung-in-einer-komposition")," verstärkt der letzte Schritt alle zuvor angesammelten Fehler mit diesem Faktor, und ",Math.round(z)," verlorene Stellen sind mehr, als die Zwischengrößen überhaupt tragen."]}):z>=1?S=e.jsxs(A,{kind:"warn",titel:"Stellen gehen verloren.",children:["Der letzte Schritt verstärkt alle bis dahin angesammelten relativen Fehler etwa um"," ",e.jsx(n,{children:"\\kappa_{rel}"})," (",N("satz:fehlerfortpflanzung-in-einer-komposition"),"): rund ",Math.round(z)," ",Math.round(z)===1?"Dezimalstelle geht":"Dezimalstellen gehen"," verloren, höchstens etwa ",Math.floor(y)," bleiben korrekt. Als Faustregel aus",N("bemerkung:interpretation"),": ",e.jsx(n,{children:"\\kappa_{rel} \\approx 10^m"})," kostet ",e.jsx(n,{children:"m"})," Stellen."]}):S=e.jsxs(A,{kind:"ok",titel:"Harmlos.",children:[e.jsx(n,{children:"\\kappa_{rel}"})," ist von der Größenordnung 1, der letzte Schritt verstärkt Fehler also kaum; rechnerisch geht weniger als eine Dezimalstelle verloren."]}):S=e.jsxs(A,{kind:"fail",titel:"Schlecht gestellt.",children:["Für ",e.jsx(n,{children:"a = b"})," ist ",e.jsx(n,{children:"\\kappa_{rel} = \\infty"})," (",N("lemma:kondition-der-differenz"),", Nenner null). Das exakte Ergebnis ist ",e.jsx(n,{children:"0"}),", und jede noch so kleine Störung der Inputs erzeugt einen relativen Fehler von beliebiger Größe."]}),e.jsxs("div",{className:"my-3 space-y-2",children:[e.jsxs(me,{children:["Schieben wir den Exponenten ",e.jsx(n,{children:"k"})," nach oben und lesen ab, wie viele Dezimalstellen der letzte Schritt kostet."]}),e.jsx("div",{className:"max-w-prose",children:e.jsx(n,{children:"\\kappa_{rel}\\bigl(h, (\\cred{a}, \\cblue{b})\\bigr) = \\sqrt{2}\\,\\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{|\\cred{a} - \\cblue{b}|}, \\qquad \\eps \\approx 2{,}2 \\cdot 10^{-16}."})}),e.jsxs("div",{className:"flex flex-wrap gap-4 text-sm",children:[e.jsxs("label",{className:"flex items-center gap-1.5",children:[e.jsx("input",{type:"radio",checked:i==="c",onChange:()=>r("c")}),"an Verschiebung ",e.jsx(n,{children:"c"})," gekoppelt"]}),e.jsxs("label",{className:"flex items-center gap-1.5",children:[e.jsx("input",{type:"radio",checked:i==="frei",onChange:()=>r("frei")}),e.jsx(n,{children:"a, b"})," frei wählen"]})]}),i==="c"?e.jsxs(e.Fragment,{children:[e.jsx(U,{label:"Exponent k",value:t,onChange:d,min:0,max:12,step:1,fmt:v=>`c = 1e${v}`}),e.jsxs("p",{className:`max-w-prose text-xs ${ie}`,children:["Modell wie im Varianz-Beispiel: Daten ",e.jsx(n,{children:"x_i = c + z_i"})," mit Varianz"," ",e.jsx(n,{children:"1"}),". Idealisiert ist dann ",e.jsx(n,{children:"\\cred{a} = c^2 + 1"})," und"," ",e.jsx(n,{children:"\\cblue{b} = c^2"}),", die wahre Differenz also genau ",e.jsx(n,{children:"1"}),"."]})]}):e.jsxs("div",{className:"flex flex-wrap items-center gap-3 text-sm",children:[e.jsxs("label",{className:"flex items-center gap-1.5",children:[e.jsx("span",{style:{color:B.rot},children:"a ="}),e.jsx("input",{"aria-label":"a",className:`w-36 font-mono ${Xe}`,value:h,onChange:v=>l(v.target.value)})]}),e.jsxs("label",{className:"flex items-center gap-1.5",children:[e.jsx("span",{style:{color:B.blau},children:"b ="}),e.jsx("input",{"aria-label":"b",className:`w-36 font-mono ${Xe}`,value:o,onChange:v=>k(v.target.value)})]})]}),e.jsx("div",{className:`overflow-x-auto p-3 font-mono text-xs sm:text-sm ${Fe}`,children:e.jsx("table",{className:"w-full",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"a"}),e.jsx("td",{className:"text-right",style:{color:B.rot},children:m})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"b"}),e.jsx("td",{className:"text-right",style:{color:B.blau},children:a})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"|a − b|"}),e.jsx("td",{className:"text-right",children:c})]}),e.jsxs("tr",{className:"border-t border-slate-300 dark:border-slate-600",children:[e.jsx("td",{className:"pr-3 pt-1",children:"κ_rel(h, (a, b))"}),e.jsx("td",{className:"pt-1 text-right font-bold",style:{color:B.orange},children:e.jsx(Ie,{v:x})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"verlorene Dezimalstellen ≈ log₁₀ κ"}),e.jsx("td",{className:"text-right",children:Number.isFinite(x)?s(Math.max(0,z),1):"alle"})]})]})})}),S]})}function He({q:i,children:r}){return e.jsxs("li",{className:"space-y-1",children:[e.jsx("div",{children:i}),e.jsxs("details",{className:"rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300",children:"Lösung anzeigen"}),e.jsx("div",{className:"pt-1.5",children:r})]})]})}function on(i){const r={a:"a",code:"code",em:"em",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(r.p,{children:["Erinnern wir uns an die Fehlerzerlegung aus ",e.jsx(r.a,{href:"#sec-4.1",children:"Abschnitt 4.1"}),`: Wenn wir ein
Problem `,e.jsx(n,{children:"f"})," mit einem Algorithmus ",e.jsx(n,{children:"\\wt{f}"}),` auf einem fehlerbehafteten Input
`,e.jsx(n,{children:"\\wt{\\bx}"})," lösen, zerfällt der Gesamtfehler in zwei Teile:"]}),`
`,e.jsx(g,{children:"\\text{Gesamtfehler} = \\wt{f}(\\wt{\\bx}) - f(\\bx) = \\underbrace{\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}}_{\\text{Fehler im Algorithmus}} + \\underbrace{\\corange{f(\\wt{\\bx}) - f(\\bx)}}_{\\text{Folgefehler aus Input}}"}),`
`,e.jsxs(r.p,{children:["Den ",e.jsx(n,{children:"\\corange{\\text{zweiten Summanden}}"})," haben wir in ",e.jsx(r.a,{href:"#sec-4.2",children:"Abschnitt 4.2"}),`
untersucht: Er hängt nur vom Problem ab, nicht vom Algorithmus, und die
`,e.jsx(b,{id:"condition-number",children:"Konditionszahl"}),` sagt uns, wie stark
er den unvermeidbaren Inputfehler verstärkt. Jetzt nehmen wir uns den
`,e.jsx(n,{children:"\\cred{\\text{ersten Summanden}}"}),` vor: den Fehler, den der Algorithmus
`,e.jsx(r.em,{children:"selbst"}),` hinzufügt: durch
`,e.jsx(b,{id:"rounding-error",children:"Rundungsfehler"}),` in jeder einzelnen
`,e.jsx(b,{id:"floating-point",children:"Gleitkomma"}),`-Operation, durch
abgebrochene Reihen, durch geschätzte Zwischengrößen. Dieser Anteil hängt nicht vom
Inputfehler ab; er entsteht, selbst wenn der Input exakt ist. Ganz analog zur
Kondition geben wir ihm einen Namen: Ist er „klein", nennen wir den Algorithmus
`,e.jsx(n,{children:"\\wt{f}"})," ",e.jsx(r.em,{children:"stabil"}),'. Was „klein" heißt, lässt sich präzise fassen.']}),`
`,e.jsxs(nn,{title:"Vorwärts- und Rückwärtsstabilität, präzise",children:[e.jsxs(R,{kind:"Definition",label:"4.3.1 (Vorwärts- und Rückwärtsstabilität)",id:"env-vorwaerts-und-rueckwaertsstabilitaet",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"f"})," ein Problem, ",e.jsx(n,{children:"\\wt f"}),` ein Gleitkomma-Algorithmus und
`,e.jsx(n,{children:"\\wh{\\by}=\\wt f(\\bx)"})," sein Ergebnis für einen exakt dargestellten Input ",e.jsx(n,{children:"\\bx"}),`.
Für `,e.jsx(n,{children:"\\|\\bx\\|\\ne0"})," und ",e.jsx(n,{children:"\\|f(\\bx)\\|\\ne0"})," heißen"]}),e.jsx(g,{children:"\\eta_{vor}=\\frac{\\|\\wh{\\by}-f(\\bx)\\|}{\\|f(\\bx)\\|}"}),e.jsxs(r.p,{children:["der ",e.jsx(r.em,{children:"relative Vorwärtsfehler"})," und"]}),e.jsx(g,{children:`\\eta_{rück}=\\inf\\left\\{
\\frac{\\|\\bDelta\\bx\\|}{\\|\\bx\\|}:\\ \\wh{\\by}=f(\\bx+\\bDelta\\bx)
\\right\\}`}),e.jsxs(r.p,{children:["der ",e.jsx(r.em,{children:"relative Rückwärtsfehler"}),". Der Algorithmus heißt ",e.jsx(r.em,{children:"rückwärtsstabil"}),`, wenn
`,e.jsx(n,{children:"\\eta_{rück}=O(u)"})," ist, wobei ",e.jsx(n,{children:"u"}),` die Rundungseinheit bezeichnet. Er heißt
`,e.jsx(r.em,{children:"vorwärtsstabil"}),`, wenn sein Vorwärtsfehler bis auf moderate Faktoren nicht größer
ist als der durch Kondition und Rundung erwartbare Fehler,
`,e.jsx(n,{children:"\\eta_{vor}=O(\\kappa_{rel}(f,\\bx)u)"}),"."]})]}),e.jsxs(r.p,{children:["Die Konstanten in den ",e.jsx(n,{children:"O"}),`-Aussagen dürfen von Dimension und Algorithmus abhängen,
sollen aber nicht durch eine vermeidbare numerische Katastrophe riesig werden.
Rückwärtsstabilität bedeutet besonders anschaulich: Das berechnete Ergebnis ist die
exakte Lösung eines nur geringfügig gestörten Problems. Zusammen mit der Kondition
liefert das typischerweise eine Vorwärtsfehlerschranke.`]})]}),`
`,e.jsxs(r.p,{children:["Wichtig ist die Arbeitsteilung: Die ",e.jsx(r.em,{children:"Kondition"}),` ist eine Eigenschaft des
`,e.jsx(r.em,{children:"Problems"}),`, die wir nicht wählen
können. Die `,e.jsx(r.em,{children:"Stabilität"})," ist eine Eigenschaft des ",e.jsx(r.em,{children:"Algorithmus"}),`, und
den wählen wir sehr wohl. Deshalb lohnt sich dieser Abschnitt: Für dasselbe
Problem können zwei mathematisch äquivalente Rechenwege dramatisch unterschiedlich
stabil sein.`]}),`
`,e.jsx(r.h3,{children:"Eine verwandte Idee aus dem maschinellen Lernen: SGD"}),`
`,e.jsxs(r.p,{children:["Das nächste Beispiel illustriert die ",e.jsx(r.em,{children:"dynamische"}),` Stabilität einer Iteration. Es ist
eine nützliche Analogie, aber nicht dasselbe wie die eben definierte numerische
Vorwärts- oder Rückwärtsstabilität.`]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.3.2 (Stochastic Gradient Descent)",id:"env-stochastic-gradient-descent",children:[e.jsxs(r.p,{children:[`Beim Training von Machine-Learning-Modellen minimieren wir eine
`,e.jsx(b,{id:"objective-function",children:"Verlustfunktion"}),`
`,e.jsx(n,{children:"L(\\theta)"}),` mit dem
`,e.jsx(b,{id:"gradient-descent",children:"Gradientenabstieg"}),` in seiner
stochastischen Variante (SGD):`]}),e.jsx(g,{children:"\\theta_{k+1} = \\theta_k - \\alpha\\, \\wh{\\nabla} L(\\theta_k),"}),e.jsxs(r.p,{children:["wobei ",e.jsx(n,{children:"\\wh{\\nabla} L(\\theta_k)"})," nur eine ",e.jsx(r.em,{children:"Schätzung"}),` des
`,e.jsx(b,{id:"gradient",children:"Gradienten"}),` ist (berechnet auf einem
zufälligen Teil der Daten, in endlicher Gleitkomma-Genauigkeit) und
`,e.jsx(n,{children:"\\alpha > 0"})," die ",e.jsx(r.em,{children:"Lernrate"})," (learning rate)."]}),e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Eine relativ zur Krümmung von ",e.jsx(n,{children:"L"}),` hinreichend kleine Lernrate kann Fehler in
bestimmten Richtungen dämpfen und unter geeigneten Annahmen Konvergenz ermöglichen.`]}),`
`,e.jsxs(r.li,{children:[`Eine zu große Lernrate kann Iterierte oszillieren oder divergieren lassen.
Zahlenwerte wie `,e.jsx(n,{children:"0{,}001"})," oder ",e.jsx(n,{children:"1"}),` sind ohne Skalierung und Krümmung des konkreten
Problems nicht allgemein als „klein" oder „groß" einzuordnen.`]}),`
`]}),e.jsxs(r.p,{children:[`Die Lernrate beeinflusst also die Stabilität der Iterationsdynamik. Ob SGD
konvergiert und wogegen, hängt zusätzlich von Annahmen an `,e.jsx(n,{children:"L"}),`, an die
Gradientenschätzung und an den Lernratenplan ab.`]})]}),`
`,e.jsxs(be,{title:"Die Lernrate als Stabilitätsregler: SGD zum Ausprobieren",children:[e.jsxs(r.p,{children:[`Wie scharf ist der Umschlag von Konvergenz zu Divergenz? Machen wir das Modell so klein, dass
wir es ganz überblicken:
`,e.jsx(n,{children:"L(\\theta) = \\theta^2"})," mit exaktem Gradienten ",e.jsx(n,{children:"2\\theta"}),`, Start bei
`,e.jsx(n,{children:"\\theta_0 = 2{,}5"}),`. Ab welcher Lernrate laufen die Iterierten nicht mehr auf das
Minimum zu, sondern davon weg?`]}),e.jsx(Vn,{}),e.jsxs(r.p,{children:[`Die Rechnung dahinter passt in eine Zeile. Ohne Rauschen ist
`,e.jsx(n,{children:"\\theta_{k+1} = \\theta_k - \\alpha \\cdot 2\\theta_k = (1 - 2\\alpha)\\,\\theta_k"}),`,
der Abstand zum Minimum wird in jedem Schritt also mit
`,e.jsx(n,{children:"\\corange{\\rho(\\alpha) = |1 - 2\\alpha|}"}),` multipliziert. Das erklärt alle vier
Regime auf einmal: monotone Konvergenz für `,e.jsx(n,{children:"\\alpha < 0{,}5"}),`, ein einziger Schritt
bei `,e.jsx(n,{children:"\\alpha = 0{,}5"}),`, Oszillation mit schrumpfender Amplitude für
`,e.jsx(n,{children:"0{,}5 < \\alpha < 1"}),", und ab ",e.jsx(n,{children:"\\alpha > 1"}),` Divergenz. Die Schwelle ist
keine Eigenschaft von SGD, sondern der Krümmung von `,e.jsx(n,{children:"L"}),`: Für
`,e.jsx(n,{children:"L(\\theta) = \\tfrac{c}{2}\\theta^2"})," läge sie bei ",e.jsx(n,{children:"\\alpha = 2/c"}),"."]})]}),`
`,e.jsx(r.h3,{children:"Zusammengesetzte Algorithmen: die wichtigste Erkenntnis"}),`
`,e.jsxs(r.p,{children:[`Praktisch jeder Algorithmus ist eine Kette von Teilschritten. Was passiert mit den
Fehlern der frühen Schritte, wenn spätere Schritte darauf aufbauen? Das folgende
Resultat verknüpft die Stabilität eines zusammengesetzten Algorithmus mit der
`,e.jsx(r.em,{children:"Kondition seiner Teilschritte"}),`. Es ist die wichtigste Erkenntnis dieses
Abschnitts. Wir betrachten dazu ein Problem, das als
`,e.jsx(b,{id:"function-composition",children:"Verkettung"}),` zweier Teilprobleme
geschrieben ist.`]}),`
`,e.jsxs(R,{kind:"Satz",label:"4.3.3 (Fehlerfortpflanzung in einer Komposition)",id:"env-fehlerfortpflanzung-in-einer-komposition",children:[e.jsxs(r.p,{children:["Sei ",e.jsx(n,{children:"f=h\\circ g"}),", ",e.jsx(n,{children:"\\by=g(\\bx)\\ne\\bnull"}),` und
`,e.jsx(n,{children:"\\wt{\\by}=\\wt g(\\bx)"}),". Wir setzen ",e.jsx(n,{children:"h(\\by)\\ne\\bnull"})," voraus und definieren"]}),e.jsx(g,{children:`\\eta_g=\\frac{\\|\\wt{\\by}-\\by\\|}{\\|\\by\\|},\\qquad
\\eta_h=\\frac{\\|\\wt h(\\wt{\\by})-h(\\wt{\\by})\\|}{\\|h(\\wt{\\by})\\|}.`}),e.jsxs(r.p,{children:["Ist ",e.jsx(n,{children:"h"})," in ",e.jsx(n,{children:"\\by"})," stetig und ",e.jsx(n,{children:"\\wt{\\by}\\to\\by"}),", dann gilt in erster Ordnung"]}),e.jsx(g,{children:`\\frac{\\|\\wt h(\\wt{\\by})-h(\\by)\\|}{\\|h(\\by)\\|}
\\le \\bigl(1+o(1)\\bigr)\\eta_h
+\\bigl(\\kappa_{rel}(h,\\by)+o(1)\\bigr)\\eta_g.`})]}),`
`,e.jsxs(r.p,{children:[`Der erste Term ist der relative algorithmische Fehler des zweiten Schritts am
tatsächlich übergebenen Input. Der zweite Term ist der Fehler des ersten Schritts,
verstärkt durch die lokale Kondition des zweiten Problems. Die `,e.jsx(n,{children:"o(1)"}),`-Terme machen
explizit, dass dies eine asymptotische Aussage für verschwindende Zwischenfehler ist,
keine exakte Ungleichung für beliebig große Störungen.`]}),`
`,e.jsxs(Ge,{children:[e.jsxs(L,{children:[e.jsxs(r.p,{children:["Durch Addieren und Subtrahieren von ",e.jsx(n,{children:"h(\\wt{\\by})"}),` sowie die
Dreiecksungleichung erhalten wir exakt`]}),e.jsx(g,{children:`\\frac{\\|\\wt h(\\wt{\\by})-h(\\by)\\|}{\\|h(\\by)\\|}
\\le
\\frac{\\|\\wt h(\\wt{\\by})-h(\\wt{\\by})\\|}{\\|h(\\by)\\|}
+\\frac{\\|h(\\wt{\\by})-h(\\by)\\|}{\\|h(\\by)\\|}.`})]}),e.jsx(L,{children:e.jsxs(r.p,{children:["Stetigkeit und ",e.jsx(n,{children:"h(\\by)\\ne\\bnull"}),` liefern
`,e.jsx(n,{children:"\\|h(\\wt{\\by})\\|/\\|h(\\by)\\|=1+o(1)"}),`. Daher ist der erste Summand
gleich `,e.jsx(n,{children:"\\bigl(1+o(1)\\bigr)\\eta_h"}),"."]})}),e.jsxs(L,{children:[e.jsxs(r.p,{children:[`Nach Definition der relativen Konditionszahl ist der zweite Summand entlang
`,e.jsx(n,{children:"\\wt{\\by}\\to\\by"})," höchstens"]}),e.jsx(g,{children:`\\bigl(\\kappa_{rel}(h,\\by)+o(1)\\bigr)
\\frac{\\|\\wt{\\by}-\\by\\|}{\\|\\by\\|}
=\\bigl(\\kappa_{rel}(h,\\by)+o(1)\\bigr)\\eta_g.`})]})]}),`
`,e.jsx(R,{kind:"Bemerkung",label:"4.3.4 (Was folgt daraus – und was nicht?)",id:"env-was-folgt-daraus-und-was-nicht",children:e.jsx(r.p,{children:`Ein schlecht konditionierter später Teilschritt kann Fehler aus früheren Schritten
stark verstärken. Daraus folgt aber keine allgemeine Regel, schlecht konditionierte
Operationen einfach „nach vorn" zu verschieben: Eine Umordnung verändert
Zwischengrößen, Rundungsfehler und oft auch die relevanten Konditionen. Verlässlichere
Strategien sind, das Teilproblem umzuformulieren, große beinahe gleiche
Zwischengrößen zu vermeiden und eine rückwärtsstabile Implementierung zu verwenden.`})}),`
`,e.jsx(r.h3,{children:"Anwendung: Stabilität der Varianzberechnung"}),`
`,e.jsxs(r.p,{children:[`Wenden wir den Satz auf ein Beispiel an, das wir aus
`,e.jsx(r.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),`
schon kennen. Dort haben wir `,e.jsx(r.em,{children:"beobachtet"}),`, dass die Verschiebungsformel für
die Varianz katastrophal versagen kann. Jetzt können wir `,e.jsx(r.em,{children:"erklären"}),`, warum,
und zwar quantitativ.`]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.3.5 (Zwei Algorithmen für die Varianz)",id:"env-zwei-algorithmen-fuer-die-varianz",children:[e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Problem:"}),` Berechne die Stichprobenvarianz
`,e.jsx(n,{children:"f(\\bx) = \\frac{1}{n} \\sumin \\left(x_i - \\bar{x}\\right)^2"}),"."]}),e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Algorithmen:"}),` Wir vergleichen die zweistufige Rechnung (erst
zentrieren, dann quadrieren) mit der Verschiebungsformel:`]}),e.jsx(g,{children:"\\wt{f}_1(\\bx) = \\frac{1}{n} \\sumin \\left(x_i - \\bar{x}\\right)^2, \\qquad \\wt{f}_2(\\bx) = \\cred{\\left(\\frac{1}{n} \\sumin x_i^2\\right)} - \\cblue{\\bar{x}^2}."}),e.jsxs(r.p,{children:[`Mathematisch sind beide identisch. Als Rechenvorschriften sind sie es nicht:
`,e.jsx(n,{children:"\\wt{f}_2"})," ist eine Verkettung ",e.jsx(n,{children:"\\wt{f}_2 = \\wt{h} \\circ \\wt{g}"}),`
im Sinne von `,e.jsx(r.a,{href:"#env-fehlerfortpflanzung-in-einer-komposition",children:"Satz 4.3.3"}),". Der erste Schritt ",e.jsx(n,{children:"g"})," berechnet das Paar"]}),e.jsx(g,{children:"g(\\bx) = (\\cred{a}, \\cblue{b}) \\quad \\text{mit} \\quad \\cred{a} = \\frac{1}{n} \\sumin x_i^2 \\quad \\text{und} \\quad \\cblue{b} = \\bar{x}^2,"}),e.jsxs(r.p,{children:["und der ",e.jsx(r.em,{children:"letzte"}),` Schritt bildet die Differenz
`,e.jsx(n,{children:"h(\\cred{a}, \\cblue{b}) = \\cred{a} - \\cblue{b}"}),"."]})]}),`
`,e.jsxs(r.p,{children:["Nach ",e.jsx(r.a,{href:"#env-fehlerfortpflanzung-in-einer-komposition",children:"Satz 4.3.3"}),` müssen wir also die Kondition des letzten Schritts an der
Übergabestelle untersuchen. Rechnen wir sie aus.`]}),`
`,e.jsxs(R,{kind:"Lemma",label:"4.3.6 (Kondition der Differenz)",id:"env-kondition-der-differenz",children:[e.jsxs(r.p,{children:["Für ",e.jsx(n,{children:"h(\\cred{a}, \\cblue{b}) = \\cred{a} - \\cblue{b}"}),` gilt bezüglich
der `,e.jsx(b,{id:"euclidean-norm",children:"euklidischen Norm"})]}),e.jsx(g,{children:"\\kappa_{rel}\\bigl(h, (\\cred{a}, \\cblue{b})\\bigr) = \\sqrt{2}\\, \\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{\\left|\\cred{a} - \\cblue{b}\\right|}."})]}),`
`,e.jsxs(r.p,{children:["Der Beweis ist Schritt für Schritt der von ",e.jsx(r.a,{href:"#env-aufgabe-kondition-der-summe",children:"Beispiel 4.2.8"}),`, nur mit
`,e.jsx(n,{children:"(1, -1)^\\top"})," statt ",e.jsx(n,{children:"(1, 1)^\\top"}),`: Auch dort liefert die Cauchy-Schwarz-Ungleichung
`,e.jsx(n,{children:"\\kappa_{abs} = \\sqrt{2}"}),`, und die Division durch
`,e.jsx(n,{children:"\\left| h(\\cred{a}, \\cblue{b}) \\right| = \\left|\\cred{a} - \\cblue{b}\\right|"}),` ergibt die
Behauptung.`]}),`
`,e.jsx(nn,{title:"Die Rechnung im Detail",children:e.jsxs(Ge,{children:[e.jsx(L,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"h"})," ist linear: Die Differenz zweier Funktionswerte ist ",e.jsx(n,{children:"h"}),", angewandt auf die Differenz der Inputs, geschrieben als Skalarprodukt mit dem Vektor ",e.jsx(n,{children:"(1, -1)^\\top"})]}),children:e.jsx(g,{children:"h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) = (\\wt{a} - \\cred{a}) - (\\wt{b} - \\cblue{b}) = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}^\\top \\begin{pmatrix} \\wt{a} - \\cred{a} \\\\ \\wt{b} - \\cblue{b} \\end{pmatrix}"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:[e.jsx(b,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"})," mit ",e.jsx(n,{children:"\\left\\| (1, -1)^\\top \\right\\|_2 = \\sqrt{2}"}),"; für Störungen proportional zu ",e.jsx(n,{children:"(1, -1)^\\top"})," gilt Gleichheit, die Schranke wird also angenommen; ",e.jsx(n,{children:"\\sqrt{2}"})," ist die ",e.jsx(r.em,{children:"kleinste"})," solche Konstante und damit ",e.jsx(n,{children:"\\kappa_{abs} = \\sqrt{2}"})]}),children:e.jsx(g,{children:"\\left| h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) \\right| \\le \\sqrt{2}\\, \\left\\| \\begin{pmatrix} \\wt{a} - \\cred{a} \\\\ \\wt{b} - \\cblue{b} \\end{pmatrix} \\right\\|_2"})}),e.jsx(L,{why:e.jsxs(e.Fragment,{children:["Definition der relativen Konditionszahl (",e.jsx(r.a,{href:"#sec-4.2",children:"Abschnitt 4.2"}),"): beide Seiten durch ",e.jsx(n,{children:"|h(\\cred{a}, \\cblue{b})| = |\\cred{a} - \\cblue{b}|"})," teilen und mit der Inputnorm ",e.jsx(n,{children:"\\left\\| (\\cred{a}, \\cblue{b})^\\top \\right\\|_2 = \\sqrt{\\cred{a}^2 + \\cblue{b}^2}"})," erweitern"]}),children:e.jsx(g,{children:"\\frac{\\left| h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) \\right|}{\\left|\\cred{a} - \\cblue{b}\\right|} \\le \\underbrace{\\sqrt{2}\\, \\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{\\left|\\cred{a} - \\cblue{b}\\right|}}_{=\\, \\corange{\\kappa_{rel}}} \\cdot \\frac{\\left\\| (\\wt{a} - \\cred{a},\\; \\wt{b} - \\cblue{b})^\\top \\right\\|_2}{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}"})})]})}),`
`,e.jsxs(r.p,{children:["Die Formel sagt präzise, wann es gefährlich wird: Sind ",e.jsx(n,{children:"\\cred{a}"}),` und
`,e.jsx(n,{children:"\\cblue{b}"})," ",e.jsx(r.em,{children:"groß"}),", liegen aber ",e.jsx(r.em,{children:"nah beieinander"}),`
(`,e.jsx(n,{children:"\\cred{a} \\approx \\cblue{b}"}),`), dann ist der Zähler riesig und der
Nenner winzig: `,e.jsx(n,{children:"\\corange{\\kappa_{rel}}"}),` explodiert, und der letzte
Schritt verstärkt `,e.jsx(r.em,{children:"alle"}),` vorangegangenen Fehler mit diesem Faktor. Genau das
passiert bei der Varianz von Daten mit großem Mittelwert: Für
`,e.jsx(n,{children:"x_i = c + z_i"})," mit Verschiebung ",e.jsx(n,{children:"c"})," und Varianz ",e.jsx(n,{children:"1"}),` ist
`,e.jsx(n,{children:"\\cred{a} \\approx c^2 + 1"})," und ",e.jsx(n,{children:"\\cblue{b} \\approx c^2"}),`,
während die Differenz (die Varianz) bei `,e.jsx(n,{children:"1"})," bleibt. Damit wächst"]}),`
`,e.jsx(g,{children:"\\corange{\\kappa_{rel}} \\approx \\sqrt{2}\\, \\frac{\\sqrt{2}\\, c^2}{1} = 2c^2"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.em,{children:"quadratisch"}),` in der Verschiebung. Das ist die
`,e.jsx(b,{id:"cancellation",children:"katastrophale Auslöschung"}),` aus
`,e.jsx(r.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),`.
Dort können wir mit der interaktiven Demo nachspielen, ab welcher Verschiebung
die Formel kippt. Und `,e.jsx(r.a,{href:"#env-was-folgt-daraus-und-was-nicht",children:"Bemerkung 4.3.4"})," erklärt, warum ",e.jsx(n,{children:"\\wt{f}_1"}),`
so viel besser dasteht: Auch `,e.jsx(n,{children:"\\wt{f}_1"}),` subtrahiert fast gleich große
Zahlen (`,e.jsx(n,{children:"x_i - \\bar{x}"})," mit ",e.jsx(n,{children:"x_i \\approx \\bar{x} \\approx c"}),`),
aber dieser schlecht konditionierte Schritt kommt `,e.jsx(r.em,{children:"zuerst"}),` und arbeitet auf
Zahlen der Größenordnung `,e.jsx(n,{children:"c"}),". Bei ",e.jsx(n,{children:"\\wt{f}_2"}),` kommt die
Subtraktion ganz am `,e.jsx(r.em,{children:"Ende"}),`, nach dem Quadrieren, auf Zahlen der
Größenordnung `,e.jsx(n,{children:"c^2"}),". Der Verstärkungsfaktor ist ",e.jsx(n,{children:"\\sim c^2"}),`
statt `,e.jsx(n,{children:"\\sim c"}),", und er trifft alle vorher akkumulierten Rundungsfehler."]}),`
`,e.jsxs(R,{kind:"Beispiel",label:"4.3.7 (Die Instabilität in R)",id:"env-die-instabilitaet-in-r",children:[e.jsxs(r.p,{children:["Ein Zahlenexperiment dazu: ",e.jsx(n,{children:"n = 1000"}),` standardnormalverteilte
Werte, um `,e.jsx(n,{children:"c = 10^{10}"})," verschoben. Die wahre Varianz ist ",e.jsx(n,{children:"1"}),"."]}),e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-r",children:`set.seed(5)
x <- rnorm(10^3, mean = 0, sd = 1) + 10^10
mean((x - mean(x))^2)
#> [1] 1.023151
mean(x^2) - mean(x)^2
#> [1] 16384
`})}),e.jsxs(r.p,{children:["Die zweistufige Rechnung ",e.jsx(n,{children:"\\wt{f}_1"})," liefert ",e.jsx(n,{children:"1{,}023"}),`, eine
völlig plausible Stichprobenvarianz. Die Verschiebungsformel `,e.jsx(n,{children:"\\wt{f}_2"}),`
liefert `,e.jsx(n,{children:"16384"}),`: um mehr als vier Größenordnungen daneben. Passt das zu
unserer Analyse? Mit `,e.jsx(n,{children:"c = 10^{10}"}),` ist
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}} \\approx 2c^2 = 2 \\cdot 10^{20}"}),`; die
Zwischenergebnisse `,e.jsx(n,{children:"\\cred{a}, \\cblue{b} \\approx 10^{20}"}),` tragen
relative Rundungsfehler der Größenordnung
`,e.jsx(b,{id:"machine-epsilon",children:e.jsx(n,{children:"\\eps \\approx 2{,}2 \\cdot 10^{-16}"})}),`, also erwarten wir
relative Fehler im Ergebnis bis etwa
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}} \\cdot \\eps \\approx 4 \\cdot 10^{4}"}),`.
Beobachtet: `,e.jsx(n,{children:"16384/1{,}02 \\approx 1{,}6 \\cdot 10^4"}),`. Die
Größenordnung stimmt.`]}),e.jsxs(r.p,{children:["Ein hübsches Detail: ",e.jsx(n,{children:"16384 = 2^{14}"}),` ist genau der Abstand zweier
benachbarter Maschinenzahlen in der Größenordnung `,e.jsx(n,{children:"10^{20}"}),`. Was die
Verschiebungsformel als „Varianz" ausgibt, ist hier also schlicht ein einzelner
Rundungsschritt der Zwischenergebnisse – mit den Daten hat diese Zahl nichts
mehr zu tun.`]})]}),`
`,e.jsxs(be,{title:"Wie schlimm wird es? Der κ-Rechner für den letzten Schritt",children:[e.jsxs(r.p,{children:["Bei ",e.jsx(n,{children:"c = 10^{10}"}),` ging alles verloren. Aber wo genau liegt die Grenze? Anders
gefragt: Ab welcher Verschiebung `,e.jsx(n,{children:"c"}),` frisst die Kondition des letzten Schritts die
16 Dezimalstellen doppelter Genauigkeit auf?`]}),e.jsx(Pn,{}),e.jsxs(r.p,{children:["Der Rechner macht die Faustregel aus ",e.jsx(r.a,{href:"#env-interpretation",children:"Bemerkung 4.2.4"}),` zur Ablesehilfe:
`,e.jsx(n,{children:"\\log_{10} \\corange{\\kappa_{rel}}"}),` zählt die verlorenen Dezimalstellen. Bei
`,e.jsx(n,{children:"c = 10^5"})," sind das schon 10 von 16, bei ",e.jsx(n,{children:"c = 10^8"}),` genau 16, und
darüber bleibt nichts mehr übrig – im Einklang mit `,e.jsx(r.a,{href:"#env-die-instabilitaet-in-r",children:"Beispiel 4.3.7"}),"."]})]}),`
`,e.jsx(r.h3,{children:"Selbsttest"}),`
`,e.jsx(r.p,{children:"Prüfen wir das Verständnis. Erst selbst überlegen, dann aufklappen."}),`
`,e.jsxs("ol",{className:"max-w-prose list-decimal space-y-3 pl-5",children:[e.jsx(He,{q:e.jsxs(e.Fragment,{children:["Sei ",e.jsx(n,{children:"f = h \\circ g"}),", und ",e.jsx(n,{children:"h"})," sei an der Stelle"," ",e.jsx(n,{children:"g(\\bx)"})," schlecht konditioniert. Ist der Algorithmus"," ",e.jsx(n,{children:"\\wt{f} = \\wt{h} \\circ \\wt{g}"})," dann zwangsläufig instabil?"]}),children:e.jsxs(r.p,{children:["Nein. ",e.jsx(r.a,{href:"#env-fehlerfortpflanzung-in-einer-komposition",children:"Satz 4.3.3"})," liefert eine lokale ",e.jsx(r.em,{children:"obere Schranke"}),`: Die schlechte
Kondition von `,e.jsx(n,{children:"h"})," kann ungünstig gerichtete Fehler von ",e.jsx(n,{children:"\\wt{g}"}),` stark
verstärken. Ist `,e.jsx(n,{children:"\\wt{g}"}),` (nahezu) exakt oder liegt sein Fehler in einer
wenig empfindlichen Richtung, kann der resultierende Fehler trotzdem klein
bleiben. Eine schlecht konditionierte Zwischenstelle ist deshalb ein Indiz,
kein Beweis für Instabilität.`]})}),e.jsx(He,{q:e.jsxs(e.Fragment,{children:["Auch ",e.jsx(n,{children:"\\wt{f}_1"})," subtrahiert fast gleich große Zahlen (",e.jsx(n,{children:"x_i - \\bar{x}"})," mit ",e.jsx(n,{children:"x_i \\approx \\bar{x}"}),"). Warum ist"," ",e.jsx(n,{children:"\\wt{f}_1"})," trotzdem viel stabiler als ",e.jsx(n,{children:"\\wt{f}_2"}),"?"]}),children:e.jsxs(r.p,{children:["Entscheidend ist nicht allein die Position der Subtraktion. ",e.jsx(n,{children:"\\wt{f}_1"}),`
bildet direkt die Abweichungen und arbeitet danach mit deren Quadraten.
`,e.jsx(n,{children:"\\wt{f}_2"})," bildet dagegen zunächst zwei Aggregate der Größenordnung ",e.jsx(n,{children:"c^2"}),`
und versucht, ihre kleine Differenz als Varianz zurückzugewinnen; deren
Information kann schon in den Rundungen der großen Aggregate verschwunden
sein. Die Zentrierung vermeidet genau diese großen, beinahe gleichen
Zwischenwerte.`]})}),e.jsx(He,{q:e.jsx(e.Fragment,{children:"Beim Training eines neuronalen Netzes beginnt der Verlust nach wenigen Epochen zu oszillieren und wächst dann über alle Grenzen. Welche Stellschraube prüfen wir zuerst, und warum?"}),children:e.jsxs(r.p,{children:["Die Lernrate ",e.jsx(n,{children:"\\alpha"}),`. Oszillation mit wachsender Amplitude ist das
Signaturverhalten eines instabilen Iterationsverfahrens: Der
Verstärkungsfaktor pro Schritt liegt über `,e.jsx(n,{children:"1"}),`, jeder Schritt bläht
die Fehler des geschätzten Gradienten weiter auf. Eine kleinere Lernrate
(oder Gradient Clipping) drückt den Faktor wieder unter `,e.jsx(n,{children:"1"}),`. In der
SGD-Demo oben lässt sich der Umschlag direkt beobachten.`]})})]}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(Le,{children:[e.jsxs(_e,{loesung:10.3,toleranz:.2,children:[e.jsxs(r.p,{children:["Stellen wir im κ-Rechner den Modus „an Verschiebung ",e.jsx(n,{children:"c"}),` gekoppelt" und den
Exponenten `,e.jsx(n,{children:"k = 5"})," ein. Wie viele Dezimalstellen gehen laut Rechner verloren?"]}),e.jsxs(r.p,{children:["Rund 10,3. Mit ",e.jsx(n,{children:"\\cred{a} = c^2 + 1"})," und ",e.jsx(n,{children:"\\cblue{b} = c^2"}),` bei
`,e.jsx(n,{children:"c = 10^5"}),` ist
`,e.jsx(n,{children:"\\corange{\\kappa_{rel}} = \\sqrt{2}\\,\\sqrt{a^2 + b^2} \\approx 2c^2 = 2 \\cdot 10^{10}"}),`,
also `,e.jsx(n,{children:"\\log_{10} \\corange{\\kappa_{rel}} \\approx 10{,}3"}),`. Von den etwa 16 Stellen
doppelter Genauigkeit bleiben knapp 6 übrig, die Verschiebungsformel liefert hier noch eine
Zahl, aber nur noch mit einer Handvoll gültiger Stellen.`]})]}),e.jsxs(_e,{loesung:1,toleranz:.05,children:[e.jsxs(r.p,{children:["In der SGD-Demo: Bei welcher Lernrate ",e.jsx(n,{children:"\\alpha > 0{,}5"}),` springen die Iterierten mit
konstanter Amplitude um das Minimum, ohne näher zu kommen oder wegzulaufen?`]}),e.jsxs(r.p,{children:["Bei ",e.jsx(n,{children:"\\alpha = 1"}),". Dort ist ",e.jsx(n,{children:"|1 - 2\\alpha| = 1"}),`, also
`,e.jsx(n,{children:"\\theta_{k+1} = -\\theta_k"}),`: Die Iterierten pendeln zwischen
`,e.jsx(n,{children:"2{,}5"})," und ",e.jsx(n,{children:"-2{,}5"}),`. Die zweite Lösung von
`,e.jsx(n,{children:"|1 - 2\\alpha| = 1"})," ist ",e.jsx(n,{children:"\\alpha = 0"}),`, und dort passiert
schlicht gar nichts.`]})]})]})}),`
`,e.jsx(r.p,{children:e.jsx(r.em,{children:"Vertiefung: Heath §1.2.7 (Stabilität und Genauigkeit)."})})]})}function Bn(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(on,{...i})}):on(i)}function xn(i){const r={a:"a",em:"em",h3:"h3",p:"p",...i.components};return e.jsxs(e.Fragment,{children:[`
`,e.jsxs(r.p,{children:[`Fassen wir das Kapitel zusammen. Der rote Faden war die Frage, warum ein berechnetes
Ergebnis `,e.jsx(n,{children:"\\wt{f}(\\wt{\\bx})"})," vom idealen Ergebnis ",e.jsx(n,{children:"f(\\bx)"}),` abweicht, und wie wir diese
Abweichung messen, zerlegen und den beiden Schuldigen zuordnen: dem `,e.jsx(r.em,{children:"Problem"}),` und dem
`,e.jsx(r.em,{children:"Algorithmus"}),"."]}),`
`,e.jsx(r.h3,{children:"Die Konzepte im Überblick"}),`
`,e.jsx("div",{className:"max-w-prose overflow-x-auto",children:e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 text-left dark:border-slate-600",children:[e.jsx("th",{className:"py-1 pr-6",children:"Konzept"}),e.jsx("th",{className:"py-1 pr-6",children:"Kernaussage"}),e.jsx("th",{className:"py-1",children:"Abschnitt"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"absoluter / relativer Fehler"}),e.jsxs("td",{className:"py-1 pr-6",children:[e.jsx(n,{children:"\\bDelta_{\\bv} = \\wt{\\bv} - \\bv"})," bzw. ",e.jsx(n,{children:"\\delta_{\\bv} = \\left\\| \\wt{\\bv} - \\bv \\right\\| / \\left\\| \\bv \\right\\|"}),", gemessen in einer ",e.jsx(b,{id:"norm",children:"Norm"})," unserer Wahl"]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.1",children:"4.1"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Fehlerzerlegung"}),e.jsxs("td",{className:"py-1 pr-6",children:["Gesamtfehler = algorithmischer Fehler ",e.jsx(n,{children:"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"})," + Input-Folgefehler ",e.jsx(n,{children:"\\corange{f(\\wt{\\bx}) - f(\\bx)}"})]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.1",children:"4.1"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Kondition"}),e.jsxs("td",{className:"py-1 pr-6",children:["Sensitivität eines ",e.jsx(r.em,{children:"Problems"})," bezüglich Inputfehlern, unabhängig vom verwendeten Algorithmus"]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.2",children:"4.2"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Konditionszahlen"}),e.jsxs("td",{className:"py-1 pr-6",children:[e.jsx(n,{children:"\\kappa_{abs}"})," und ",e.jsx(n,{children:"\\kappa_{rel}"}),": kleinste Verstärkungsfaktoren von absolutem bzw. relativem Inputfehler; gut konditioniert (",e.jsx(n,{children:"\\kappa \\lesssim 1"}),"), schlecht konditioniert (",e.jsx(n,{children:"\\kappa \\gg 1"}),"), schlecht gestellt (",e.jsx(n,{children:"\\kappa = \\infty"}),")"]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.2",children:"4.2"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:e.jsx(b,{id:"condition-number",children:"Konditionszahl einer Matrix"})}),e.jsxs("td",{className:"py-1 pr-6",children:[e.jsx(n,{children:"\\kappa(\\bA) = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"})," in einer ",e.jsx(b,{id:"matrix-norm",children:"Matrixnorm"}),": obere Schranke für die relative Kondition des Problems ",e.jsx(n,{children:"\\bx \\mapsto \\bA^{-1}\\bx"})," (eingeführt in ",e.jsx(r.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),")"]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.2",children:"4.2"})})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Stabilität"}),e.jsxs("td",{className:"py-1 pr-6",children:["Eigenschaft eines ",e.jsx(r.em,{children:"Algorithmus"}),": ",e.jsx(n,{children:"\\wt{f}"})," ist stabil, wenn der algorithmische Fehler ",e.jsx(n,{children:"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"})," klein ist"]}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.3",children:"4.3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-1 pr-6",children:"zusammengesetzte Algorithmen"}),e.jsx("td",{className:"py-1 pr-6",children:"Fehlerfortpflanzung über Teilschritte: Die Kondition eines späteren Teilschritts verstärkt die Fehler aller früheren"}),e.jsx("td",{className:"py-1",children:e.jsx(r.a,{href:"#sec-4.3",children:"4.3"})})]})]})]})}),`
`,e.jsx(r.h3,{children:"Kondition und Stabilität: die Arbeitsteilung"}),`
`,e.jsxs(r.p,{children:["Die ",e.jsx(r.em,{children:"Kondition"}),` kontrolliert den orangen Term der Fehlerzerlegung: wie stark
`,e.jsx(n,{children:"f"}),` selbst (in exakter Arithmetik) Inputfehler verstärkt. Daran kann kein noch so guter
Algorithmus etwas ändern. Die `,e.jsx(r.em,{children:"Stabilität"}),` kontrolliert den roten Term: wie viel
zusätzlichen Fehler die Umsetzung `,e.jsx(n,{children:"\\wt{f}"}),` durch
`,e.jsx(b,{id:"rounding-error",children:"Rundungsfehler"}),` in
`,e.jsx(b,{id:"floating-point",children:"Gleitkommaarithmetik"}),` obendrauf legt. Ein
stabiler Algorithmus für ein schlecht konditioniertes Problem liefert also trotzdem
ungenaue Ergebnisse – aber nicht ungenauer, als das Problem es erzwingt.`]}),`
`,e.jsxs(R,{kind:"Bemerkung",label:"4.4.1 (Faustregel, mit Einschränkung)",id:"env-faustregel-mit-der-einschraenkung-aus",children:[e.jsx("p",{className:"font-semibold",children:"Schlecht konditionierte Teilschritte möglichst früh ausführen!"}),e.jsxs(r.p,{children:[`Warum? Nach der Fehlerfortpflanzungs-Schranke aus
`,e.jsx(r.a,{href:"#sec-4.3",children:"Abschnitt 4.3"}),` verstärkt die Kondition
eines Teilschritts die angesammelten Fehler aller `,e.jsx(r.em,{children:"vorangegangenen"}),` Schritte.
Ein schlecht konditionierter Schritt am Ende der Kette trifft auf einen Input, der
schon viele Fehler trägt, und bläst sie alle auf. Derselbe Schritt am Anfang sieht
nur den unvermeidbaren Inputfehler. Genau das haben wir am Varianz-Beispiel gesehen:
Die Verschiebungsformel hebt sich die schlecht konditionierte Subtraktion (Stichwort
`,e.jsx(b,{id:"cancellation",children:"Auslöschung"}),`) bis zum Schluss auf, die
Zwei-Pass-Formel zieht sie vor und ist deshalb stabil.`]}),e.jsxs(r.p,{children:[`Vorsicht: Das ist eine Faustregel, kein Satz – die Einschränkungen und die
verlässlicheren Strategien stehen in `,e.jsx(r.a,{href:"#env-was-folgt-daraus-und-was-nicht",children:"Bemerkung 4.3.4"}),"."]})]}),`
`,e.jsx(r.h3,{children:"Wie geht es weiter?"}),`
`,e.jsxs(r.p,{children:[`Im nächsten Kapitel wenden wir das neue Vokabular auf das wichtigste Rechenproblem der
Statistik an: die numerische Lösung
`,e.jsx(b,{id:"linear-system",children:"linearer Gleichungssysteme"}),`
`,e.jsx(n,{children:"\\bA\\bx = \\bb"}),". Die Konditionszahl ",e.jsx(n,{children:"\\kappa(\\bA)"}),` sagt uns dann,
wie genau die Lösung überhaupt sein `,e.jsx(r.em,{children:"kann"}),` – und die Stabilitätsanalyse, welche
Lösungsverfahren diese Genauigkeit auch wirklich erreichen.`]}),`
`,e.jsx(r.h3,{children:"Selbsttest zum Kapitel"}),`
`,e.jsx("div",{className:"max-w-prose",children:e.jsxs(Le,{children:[e.jsxs(ge,{wahr:!0,children:[e.jsx(r.p,{children:`Ein stabiler Algorithmus für ein schlecht konditioniertes Problem liefert im Allgemeinen
ungenaue Ergebnisse.`}),e.jsx(r.p,{children:`Die Stabilität begrenzt nur den roten Term der Zerlegung, den der Algorithmus selbst
beisteuert. Den orangen Term erzwingt das Problem: Ist es schlecht konditioniert, verstärkt es
den unvermeidbaren Inputfehler, und daran ändert kein Algorithmus etwas. Die richtige Erwartung
lautet: nicht ungenauer, als das Problem es erzwingt.`})]}),e.jsxs(_e,{loesung:82,toleranz:1.5,children:[e.jsxs(r.p,{children:["Im Widget zur Kondition eines Gleichungssystems (",e.jsx(r.a,{href:"#sec-4.2",children:"Abschnitt 4.2"}),`) ist die
Voreinstellung „schlecht konditioniert" gewählt. Welchen Wert zeigt der Readout für die
Schranke `,e.jsx(n,{children:"\\kappa(\\bA)"}),"?"]}),e.jsxs(r.p,{children:[`Rund 82. Die Matrix ist
`,e.jsx(n,{children:"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1{,}05 \\end{pmatrix}"}),` mit den Singulärwerten
`,e.jsx(n,{children:"\\sigma_{\\max} \\approx 2{,}025"})," und ",e.jsx(n,{children:"\\sigma_{\\min} \\approx 0{,}0247"}),`,
also `,e.jsx(n,{children:"\\kappa_2(\\bA) = \\sigma_{\\max}/\\sigma_{\\min} \\approx 82{,}0"}),`
(`,e.jsx(r.a,{href:"#env-kondition-konditionszahl-einer-matrix",children:"Bemerkung 4.2.7"}),`). Für die Voreinstellung der rechten Seite wird diese Schranke fast exakt
angenommen.`]})]})]})}),`
`,e.jsx(r.p,{children:e.jsx(r.em,{children:"Vertiefung: Heath §1.2."})})]})}function qn(i={}){const{wrapper:r}=i.components||{};return r?e.jsx(r,{...i,children:e.jsx(xn,{...i})}):xn(i)}const Zn={sections:[{id:"4.1",key:"fehlermasse",title:"Fehlermaße und Fehlerzerlegung",C:Me(Sn)},{id:"4.2",key:"kondition",title:"Kondition",C:Me(Wn)},{id:"4.3",key:"stabilitaet",title:"Stabilität von Algorithmen",C:Me(Bn)},{id:"4.4",key:"zusammenfassung",title:"Zusammenfassung",C:Me(qn)}]};export{Zn as default};
