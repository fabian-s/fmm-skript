import{r as I,u as un,o as ve,j as e,A as Ae,p as ee,F,D as Ye,g as h,W as Me,d as pe,S as ie,s as he,V as W,b as P,h as bi,l as Te,C as b,M as n,a,E as j,P as Z,n as z,Q as en,i as E,Z as on,t as vi,v as pi,G as ke,z as ge,H as gi,m as rn}from"./index-GbyLwDE5.js";import{E as L,I as we}from"./Interaktiv-DHZUUTxv.js";const ze=F.gruen,Cn=F.blau,Jn=F.orange,G=[[0,0],[2,0],[1,2]],Ie=["x₁","x₂","x₃"],qe=-.5,cn=2.5,ae=300,Ce=34,wi=30,zi=12,_n=Ce+ae+zi,Dn=ae+wi,T=r=>Ce+(r-qe)/(cn-qe)*ae,O=r=>ae-(r-qe)/(cn-qe)*ae;function gn(r,i,s){return Math.abs((i[0]-r[0])*(s[1]-r[1])-(s[0]-r[0])*(i[1]-r[1]))/2}function Si(r){const[[i,s],[d,t],[c,u]]=G,p=(d-i)*(u-s)-(c-i)*(t-s),m=((r[0]-i)*(u-s)-(c-i)*(r[1]-s))/p,f=((d-i)*(r[1]-s)-(r[0]-i)*(t-s))/p;return[1-m-f,m,f]}const yi=[{name:"Schwerpunkt",titel:"alle Gewichte 1/3",w:[1,1,1]},{name:"Ecke x₃",titel:"ein Gewicht trägt alles",w:[0,0,1]},{name:"Kante x₁x₂",titel:"ein Gewicht steht auf null",w:[.5,.5,0]},{name:"innerer Punkt",titel:"w = (1/2; 1/4; 1/4)",w:[.5,.25,.25]},{name:"alle Regler null",titel:"Normierung nicht definiert",w:[0,0,0]}];function _i(){const[r,i]=I.useState([1,1,1]),s=r[0]+r[1]+r[2],d=s>1e-12,t=d?[r[0]/s,r[1]/s,r[2]/s]:[NaN,NaN,NaN],c=d?[t[0]*G[0][0]+t[1]*G[1][0]+t[2]*G[2][0],t[0]*G[0][1]+t[1]*G[1][1]+t[2]*G[2][1]]:[NaN,NaN],u=un({feld:{x0:Ce,y0:0,w:ae,h:ae},welt:{x0:qe,x1:cn,y0:qe,y1:cn},greifPosition:()=>d?c:G[0],onDrag:o=>{const A=Si(o).map(R=>Math.max(0,R)),x=A[0]+A[1]+A[2];i(x>1e-12?[A[0]/x,A[1]/x,A[2]/x]:[1,1,1])}}),p=d?t[1]+t[2]:0,m=d&&p>1e-12?[(t[1]*G[1][0]+t[2]*G[2][0])/p,(t[1]*G[1][1]+t[2]*G[2][1])/p]:null,f=gn(G[0],G[1],G[2]),w=d?[gn(c,G[1],G[2])/f,gn(G[0],c,G[2])/f,gn(G[0],G[1],c)/f]:[NaN,NaN,NaN],N=1e-9,g=d?t.filter(o=>o<N).length:-1,_=d?g>=2?"ecke":g===1?"kante":"innen":"undefiniert",k=d&&t.every(o=>Math.abs(o-1/3)<.005),D=d?t.findIndex(o=>o>1-N):-1,X=d&&g===1?t.findIndex(o=>o<N):-1,K=ve(qe,cn),M=K.length>1?K[1]-K[0]:void 0,l=o=>i([o[0],o[1],o[2]]),B=o=>r.every((A,x)=>Math.abs(A-o[x])<1e-9);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Ziehen wir den grünen Punkt durch das Dreieck und lesen wir ab, wie sich die drei Gewichte dabei verhalten."}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[300px]",children:e.jsxs("svg",{width:_n,height:Dn,viewBox:`0 0 ${_n} ${Dn}`,className:"max-w-full h-auto rounded",role:"img","aria-label":d?`Dreieck mit den Ecken x1, x2, x3 und der Konvexkombination bei (${h(c[0])}; ${h(c[1])}).`:"Dreieck mit den Ecken x1, x2, x3; die Gewichtssumme ist null, es wird kein Punkt gezeichnet.",...u.svgProps,children:[e.jsx("rect",{x:.5,y:.5,width:_n-1,height:Dn-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),K.map(o=>e.jsxs("g",{children:[e.jsx("line",{x1:Ce,x2:Ce+ae,y1:O(o),y2:O(o),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:o===0?1.2:.6}),e.jsx("text",{x:Ce-4,y:O(o)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(o,M)}),e.jsx("line",{y1:0,y2:ae,x1:T(o),x2:T(o),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:o===0?1.2:.6}),e.jsx("text",{x:T(o),y:ae+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(o,M)})]},`t${o}`)),e.jsx("polygon",{points:G.map(o=>`${T(o[0]).toFixed(1)},${O(o[1]).toFixed(1)}`).join(" "),fill:Cn,fillOpacity:.12,stroke:Cn,strokeWidth:1.8}),d&&e.jsxs(e.Fragment,{children:[e.jsx("polygon",{points:`${T(c[0]).toFixed(1)},${O(c[1]).toFixed(1)} ${T(G[1][0])},${O(G[1][1])} ${T(G[2][0])},${O(G[2][1])}`,fill:ze,fillOpacity:.14}),m&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:T(G[0][0]),y1:O(G[0][1]),x2:T(m[0]),y2:O(m[1]),stroke:ze,strokeWidth:1.6,strokeDasharray:"5 4"}),e.jsx("circle",{cx:T(m[0]),cy:O(m[1]),r:3,fill:ze,opacity:.75}),e.jsx("text",{x:T(m[0])+7,y:O(m[1])-5,fill:ze,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"y"})]})]}),G.map((o,A)=>e.jsxs("g",{children:[e.jsx("circle",{cx:T(o[0]),cy:O(o[1]),r:5,fill:Jn}),e.jsx("text",{x:T(o[0])+(A===1?9:A===0?-14:0),y:O(o[1])+(A===2?-10:16),textAnchor:"middle",fill:Jn,fontSize:12,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:Ie[A]})]},Ie[A])),d&&e.jsx(Ye,{x:T(c[0]),y:O(c[1]),r:5,farbe:ze,strichbreite:2.4,aktiv:u.dragging==="x",label:"x",...u.handleProps("x")})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-2 text-sm",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:yi.map(o=>e.jsx("button",{type:"button",title:o.titel,"aria-pressed":B(o.w),className:B(o.w)?Me:pe,onClick:()=>l(o.w),children:o.name},o.name))}),[0,1,2].map(o=>e.jsx(ie,{label:`Regler ${Ie[o]}`,value:r[o],onChange:A=>i(x=>{const R=[x[0],x[1],x[2]];return R[o]=he(A,0,1),R}),min:0,max:1,step:.01,accent:ze,fmt:A=>h(A,2)},o)),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Reglersumme"}),e.jsx("td",{className:"font-mono text-xs",children:h(s)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"normierte Gewichte"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:ze},children:["(",h(t[0]),"; ",h(t[1]),"; ",h(t[2]),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Kombination x"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:ze},children:["(",h(c[0]),"; ",h(c[1]),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Flächenanteile"}),e.jsxs("td",{className:"font-mono text-xs",children:[h(w[0]),"; ",h(w[1]),"; ",h(w[2])]})]})]})})]})]}),_==="undefiniert"?e.jsxs(W,{kind:"fail",titel:"Summe null, Normierung nicht definiert.",children:["Alle drei Regler stehen auf null. Wir müssten durch die Summe 0 teilen, und das ergibt keine Zahl, auch keine unendlich große. Die Bedingung w₁ + w₂ + w₃ = 1 aus",P("definition:konvexkombination")," lässt sich hier nicht erfüllen, also zeichnen wir keinen Punkt. Jede andere Reglerstellung ist zulässig, denn durch eine positive Summe dürfen wir immer teilen."]}):_==="ecke"?e.jsxs(W,{kind:"warn",titel:`Ecke ${Ie[D]}, ein Extrempunkt.`,children:["Ein Gewicht trägt alles, die beiden anderen sind null. So und nur so erreichen wir die Ecke ",Ie[D],": Sobald ein zweites Gewicht positiv wird, wandert der Punkt von der Ecke weg. Das ist die Extrempunkt-Eigenschaft aus ",P("definition:konvexkombinationen-extrempunkt"),". Der Flächenanteil der Ecke ist 1, die beiden anderen Teildreiecke sind entartet."]}):_==="kante"?e.jsxs(W,{kind:"ok",titel:`Auf der Kante gegenüber von ${Ie[X]}.`,children:["Ein Gewicht steht auf null, die Kombination läuft also nur noch über zwei Ecken. Die Menge aller solchen Punkte ist nach ",P("satz:konvexkombinationen-zweier-vektoren")," genau das Liniensegment zwischen ihnen, und wir sehen den Rand der konvexen Hülle. Der Punkt bleibt eine Konvexkombination aller drei Ecken, nur mit einem Gewicht 0."]}):e.jsxs(W,{kind:"ok",titel:k?"Nahe am Schwerpunkt (1; 2/3).":"Im Inneren des Dreiecks.",children:["Alle drei Gewichte sind positiv, der Punkt liegt im Inneren (",P("bemerkung:rand-und-inneres-an-den-gewichten"),"). Die gestrichelte Hilfsstrecke zeigt, wie er entsteht: erst x₂ und x₃ zu y mischen, dann x₁ mit y. Jedes Gewicht wᵢ ist zugleich der Flächenanteil des Teildreiecks, in dem die Ecke xᵢ fehlt; hier ",h(t[0])," gegen ",h(w[0])," für x₁.",k?" Bei gleichen Gewichten sind alle drei Teilflächen gleich groß, jede also ein Drittel der Gesamtfläche 2.":""]})]})}const Mn=F.gruen,mn=F.blau,An=F.orange,Di=F.rot,Yn=F.grau,jn=[[1.5,1.4],[2.2,2],[1.2,2.4],[.9,1.2],[2.6,1.5],[1.9,2.9],[2.9,2.4],[.4,.5],[3,1],[2.4,3.5],[.2,2],[3.4,2.6],[1.6,.3],[1,3.2]],ei=(r,i,s)=>(i[0]-r[0])*(s[1]-r[1])-(i[1]-r[1])*(s[0]-r[0]);function ni(r){const i=r.slice().sort((t,c)=>t[0]-c[0]||t[1]-c[1]);if(i.length<3)return i;const s=[];for(const t of i){for(;s.length>=2&&ei(s[s.length-2],s[s.length-1],t)<=0;)s.pop();s.push(t)}const d=[];for(const t of i.slice().reverse()){for(;d.length>=2&&ei(d[d.length-2],d[d.length-1],t)<=0;)d.pop();d.push(t)}return s.slice(0,-1).concat(d.slice(0,-1))}function Mi(r){let i=0;for(let s=0;s<r.length;s++){const d=r[s],t=r[(s+1)%r.length];i+=d[0]*t[1]-t[0]*d[1]}return Math.abs(i)/2}const Sn=-.2,On=3.8,ce=300,Re=30,Ai=30,Ni=12,Nn=Re+ce+Ni,En=ce+Ai,Se=r=>Re+(r-Sn)/(On-Sn)*ce,ye=r=>ce-(r-Sn)/(On-Sn)*ce,Fn=r=>`(${h(r[0],1)}; ${h(r[1],1)})`;function Ei({start:r=4}){const[i,s]=I.useState(r),d=jn.slice(0,i),t=ni(d),c=d.map(g=>t.some(_=>_[0]===g[0]&&_[1]===g[1])),p=ni(jn.slice(0,i-1)).filter(g=>!t.some(_=>_[0]===g[0]&&_[1]===g[1])),m=[d.reduce((g,_)=>g+_[0],0)/i,d.reduce((g,_)=>g+_[1],0)/i],f=ve(0,On),w=f.length>1?f[1]-f[0]:void 0,N=jn[i-1];return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Schieben wir k nach oben und achten wir darauf, wann ein oranger Punkt grau wird."}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[300px]",children:e.jsxs("svg",{width:Nn,height:En,viewBox:`0 0 ${Nn} ${En}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Punktwolke mit ${Te(i)} freigeschalteten Punkten und ihrer konvexen Hülle; ${Te(t.length)} davon sind Extrempunkte.`,children:[e.jsx("rect",{x:.5,y:.5,width:Nn-1,height:En-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),f.map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:Re,x2:Re+ce,y1:ye(g),y2:ye(g),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:.6}),e.jsx("text",{x:Re-4,y:ye(g)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(g,w)}),e.jsx("line",{y1:0,y2:ce,x1:Se(g),x2:Se(g),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:.6}),e.jsx("text",{x:Se(g),y:ce+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(g,w)})]},`t${g}`)),e.jsx("polygon",{points:t.map(g=>`${Se(g[0]).toFixed(1)},${ye(g[1]).toFixed(1)}`).join(" "),fill:mn,fillOpacity:.12,stroke:mn,strokeWidth:1.8}),d.map((g,_)=>{const k=p.some(D=>D[0]===g[0]&&D[1]===g[1]);return e.jsx("circle",{cx:Se(g[0]),cy:ye(g[1]),r:c[_]||k?5:3.5,fill:c[_]?An:k?Di:Yn},`p${_}`)}),e.jsx("circle",{cx:Se(N[0]),cy:ye(N[1]),r:8,fill:"none",stroke:c[i-1]?An:Yn,strokeWidth:1,strokeDasharray:"3 3"}),e.jsx("circle",{cx:Se(m[0]),cy:ye(m[1]),r:6,fill:"none",stroke:Mn,strokeWidth:2.2}),e.jsx("circle",{cx:Se(m[0]),cy:ye(m[1]),r:2.5,fill:Mn}),e.jsx("text",{x:Re+4,y:12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"2. Koordinate ↑"}),e.jsx("text",{x:Re+ce/2,y:ce+27,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"1. Koordinate →"})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-2 text-sm",children:[e.jsx(ie,{label:"Anzahl k",value:i,onChange:g=>s(Math.round(g)),min:3,max:jn.length,step:1,accent:mn,fmt:g=>Te(g)}),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"freigeschaltet"}),e.jsxs("td",{className:"font-mono text-xs",children:[Te(i)," Punkte"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Extrempunkte"}),e.jsx("td",{className:"font-mono text-xs",style:{color:An},children:Te(t.length)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Fläche der Hülle"}),e.jsx("td",{className:"font-mono text-xs",style:{color:mn},children:h(Mi(t))})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Mittelwert"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:Mn},children:["(",h(m[0]),"; ",h(m[1]),")"]})]})]})}),e.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:["Blau die konvexe Hülle, orange ihre Extrempunkte, grau die übrigen Punkte, grün der Mittelwert der ersten k Punkte (Gewichte 1/k = ",h(1/i,3),"), gestrichelt der zuletzt hinzugekommene Punkt."]})]})]}),p.length>0?e.jsxs(W,{kind:"warn",titel:"Eine Ecke ist nach innen gefallen.",children:["Der neue Punkt ",Fn(N)," schließt ",Fn(p[0]),p.length>1?" und weitere":""," ein: eben noch Extrempunkt, jetzt selbst eine Konvexkombination der übrigen. Extrempunkt zu sein hängt nach ",P("definition:konvexkombinationen-extrempunkt"),"nicht am Punkt allein, sondern an der Menge, in der er liegt (",P("bemerkung:extrempunkt-zu-sein-ist-keine"),")."]}):i===3?e.jsxs(W,{kind:"neutral",titel:"Startlage.",children:["Drei Punkte, drei Ecken: Die Hülle ist das Dreieck aus ",P("beispiel:konvexe-huelle-dreier-punkte"),", und jeder der drei Punkte ist Extrempunkt. Der grüne Mittelwert liegt als Konvexkombination mit Gewichten 1/3 darin (",P("bemerkung:ein-gewichteter-durchschnitt"),")."]}):e.jsxs(W,{kind:"ok",titel:"Alle alten Ecken bleiben Ecken.",children:["Der neue Punkt ",Fn(N)," liegt entweder schon in der bisherigen Hülle, oder er vergrößert sie, ohne einen alten Eckpunkt zu überdecken. Die Fläche kann dabei nur wachsen, denn alle alten Konvexkombinationen bleiben nach ",P("definition:konvexe-huelle")," möglich."]})]})}function Fi(){return e.jsx(bi,{frage:"Der Punkt (1,5; 1,4) startet als Extrempunkt. Ab welchem k verliert er diesen Status?",loesung:5,toleranz:0,einheit:"Punkte",fmt:r=>Te(r),verdeckt:e.jsx("p",{className:"max-w-prose text-sm",children:"Eine alte Ecke fällt bei k = 5, 6, 8, 9, 10, 11 und 12 heraus, jedes Mal genau eine, während der neue Punkt nachrückt. Deshalb steht die Anzahl der Extrempunkte über weite Strecken still, obwohl sich ihre Zusammensetzung ändert."}),children:e.jsx(Ei,{})})}function ii(r){const i={a:"a",em:"em",h3:"h3",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Wozu Konvexität"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),` hat die Ableitungen bereitgestellt.
Gradient, Jacobi- und Hesse-Matrix beschreiben, wie sich eine Funktion in der Nähe eines
Punktes verhält. Über ihr Verhalten im Großen sagen sie wenig. Diese Lücke füllt die
Konvexität.`]}),`
`,e.jsxs(i.p,{children:["Der Begriff hat zwei eng verwandte Ausprägungen: ",e.jsx(i.em,{children:"konvexe Mengen"}),`
(`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),") und ",e.jsx(i.em,{children:"konvexe Funktionen"}),`
(`,e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"}),`). Beide verallgemeinern Linearität, und zwar durch eine
Einschränkung auf der einen und eine Lockerung auf der anderen Seite. Bei einer
`,e.jsx(b,{id:"linear-combination",children:"Linearkombination"})," ",e.jsx(n,{children:"\\sum_i w_i \\bx_i"}),` dürfen die Koeffizienten
beliebig sein; lassen wir nur nichtnegative mit Summe `,e.jsx(n,{children:"1"}),` zu, entsteht der Begriff dieses
Abschnitts. Und wo eine lineare Funktion die Gleichung
`,e.jsx(n,{children:"f(\\lambda \\bx + (1-\\lambda)\\by) = \\lambda f(\\bx) + (1-\\lambda) f(\\by)"}),` exakt erfüllt,
verlangt Konvexität davon nur noch die Ungleichung `,e.jsx(n,{children:"\\le"}),"."]}),`
`,e.jsxs(i.p,{children:[`Warum sich das lohnt, zeigt sich an zwei Stellen. In der
`,e.jsx(b,{id:"optimization",children:"Optimierung"}),` und damit im maschinellen Lernen und in der Statistik ist ein
konvexes Problem eines, bei dem kein Verfahren in einem schlechten Tal hängenbleiben kann:
Jedes lokale Minimum ist dort automatisch ein globales. Darauf bauen viele Standardwerkzeuge
auf, etwa die `,e.jsx(b,{id:"likelihood",children:"Maximum-Likelihood-Schätzung"}),` in verallgemeinerten linearen
Modellen, Support Vector Machines und die Ridge-Regression, deren Zielfunktion wir in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),` abgeleitet haben. Bei der Likelihood lohnt ein
Blick auf die Richtung: Konvex ist die
`,e.jsx(i.em,{children:"negative"}),` Log-Likelihood, die wir minimieren. Die Log-Likelihood selbst ist in diesen Modellen
konkav, und eine konkave Funktion zu maximieren ist dasselbe, wie ihr Negatives zu minimieren.`]}),`
`,e.jsxs(i.p,{children:["Vorsicht bei Formulierungen, die konvexen Problemen gleich ",e.jsx(i.em,{children:"eindeutige"}),` globale
Minima zusprechen. Verlässlich ist nur die Aussage über lokal und global. Eindeutigkeit
bekommen wir erst mit strikter Konvexität, denn eine konstante Funktion ist konvex und wird
an jeder Stelle minimal. Und ob überhaupt ein Minimum angenommen wird, ist noch einmal eine
eigene Frage: `,e.jsx(n,{children:"f(x) = e^x"})," ist konvex, kommt ihrem Infimum ",e.jsx(n,{children:"0"})," auf ",e.jsx(n,{children:"\\R"}),` aber nur beliebig
nahe. Sauber getrennt stehen die drei Aussagen in `,e.jsx(i.a,{href:"#sec-11.5",children:"Abschnitt 11.5"}),`, und in
`,e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"})," hängen daran die Konvergenzgarantien der Verfahren."]}),`
`,e.jsxs(i.p,{children:[`In der Wahrscheinlichkeitstheorie liefert Konvexität Ungleichungen für Erwartungswerte. Die
Jensen-Ungleichung ist der Prototyp (`,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"}),`); die Kullback-Leibler-
Divergenz ist konvex, was in der Variationsinferenz gebraucht wird; und die
Nichtnegativität der Varianz ist nichts anderes als die Jensen-Ungleichung für
`,e.jsx(n,{children:"x \\mapsto x^2"}),":"]}),`
`,e.jsx(a,{children:"\\E[X^2] \\ge \\left(\\E[X]\\right)^2 ."}),`
`,e.jsxs(i.p,{children:[`Dieser Abschnitt legt das Fundament für all das. Wir brauchen dafür wenig:
`,e.jsx(b,{id:"vector-space",children:"Vektorräume"}),` und
`,e.jsx(b,{id:"linear-combination",children:"Linearkombinationen"}),", den Umgang mit ",e.jsx(b,{id:"norm",children:"Normen"}),` und
`,e.jsx(b,{id:"dot-product",children:"Skalarprodukten"}),", aus der Analysis ",e.jsx(b,{id:"limit",children:"Grenzwerte"}),`,
`,e.jsx(b,{id:"supremum",children:"Supremum und Infimum"})," sowie ",e.jsx(b,{id:"closed-bounded-set",children:"abgeschlossene Mengen"}),`,
und aus der Stochastik den `,e.jsx(b,{id:"expected-value",children:"Erwartungswert"}),` als gewichteten Durchschnitt.
Später im Kapitel kommen der `,e.jsx(b,{id:"gradient",children:"Gradient"}),` und
`,e.jsx(b,{id:"positive-definite",children:"positiv definite Matrizen"})," dazu."]}),`
`,e.jsx(i.h3,{children:"Konvexkombinationen"}),`
`,e.jsx(i.p,{children:"Beginnen wir mit dem Baustein, aus dem alles Weitere entsteht."}),`
`,e.jsxs(j,{kind:"Definition",label:"11.1.1 (Konvexkombination)",id:"env-konvexkombination",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"V"})," ein Vektorraum und ",e.jsx(n,{children:"\\Xcal = \\{\\bx_1, \\dots, \\bx_k\\} \\subset V"}),`. Wir nennen
`,e.jsx(n,{children:"\\cgreen{\\bx}"})," eine ",e.jsx(i.em,{children:"Konvexkombination"})," (convex combination) von Vektoren in ",e.jsx(n,{children:"\\Xcal"}),`,
falls es Koeffizienten
`,e.jsx(n,{children:"\\cgreen{w_1}, \\dots, \\cgreen{w_k} \\ge 0"})," gibt mit"]}),e.jsx(a,{children:`\\cgreen{\\bx} = \\sum_{i=1}^k \\cgreen{w_i} \\bx_i
\\qquad \\text{und} \\qquad
\\sum_{i=1}^k \\cgreen{w_i} = 1 .`})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.1.2 (Ein gewichteter Durchschnitt)",id:"env-ein-gewichteter-durchschnitt",children:[e.jsx(i.p,{children:`Konvexkombinationen sind spezielle Linearkombinationen. Zwei Bedingungen kommen hinzu, und
jede von beiden zieht etwas nach sich.`}),e.jsxs(i.p,{children:[`Die Gewichte sind nichtnegativ, sie dürfen also keine Richtung umkehren. Sie summieren sich
zu `,e.jsx(n,{children:"1"}),`, wir können sie also nicht gemeinsam hochskalieren. Zusammen heißt das: Die Gewichte
`,e.jsx(n,{children:"\\cgreen{w_1}, \\dots, \\cgreen{w_k}"}),` sind nichts anderes als eine Wahrscheinlichkeitsverteilung
auf den `,e.jsx(n,{children:"k"})," Punkten, und ",e.jsx(n,{children:"\\cgreen{\\bx}"})," ist deren ",e.jsx(i.em,{children:"gewichteter Durchschnitt"}),"."]}),e.jsxs(i.p,{children:["Zwei Sonderfälle sind schnell abgehakt. Für ",e.jsx(n,{children:"k = 1"})," bleibt nur ",e.jsx(n,{children:"\\cgreen{w_1} = 1"}),`, also
`,e.jsx(n,{children:"\\cgreen{\\bx} = \\bx_1"}),`. Und wählen wir alle Gewichte gleich, so ist
`,e.jsx(n,{children:"\\cgreen{w_i} = \\tfrac{1}{k}"})," und ",e.jsx(n,{children:"\\cgreen{\\bx}"})," das arithmetische Mittel der Punkte."]}),e.jsxs(i.p,{children:[`Nützlich ist außerdem die Lesart als Verschiebung. Setzen wir
`,e.jsx(n,{children:"\\cgreen{w_1} = 1 - \\sum_{i \\ge 2} \\cgreen{w_i}"})," in die Definition ein, so wird daraus"]}),e.jsx(a,{children:"\\cgreen{\\bx} = \\bx_1 + \\sum_{i=2}^k \\cgreen{w_i}\\,(\\bx_i - \\bx_1) ."}),e.jsxs(i.p,{children:["Wir starten also in ",e.jsx(n,{children:"\\bx_1"}),` und gehen ein Stück in Richtung der übrigen Punkte. Die
Summenbedingung ist der Grund, warum hier lauter `,e.jsx(i.em,{children:"Differenzen"}),` stehen und das Ergebnis nicht
davon abhängt, wo der Ursprung des Koordinatensystems liegt.`]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.1.3 (Der Erwartungswert ist eine Konvexkombination)",id:"env-der-erwartungswert-ist-eine",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"X"}),` eine diskrete Zufallsvariable mit endlichem Träger
`,e.jsx(n,{children:"\\Xcal = T_X = \\{x_1, \\dots, x_k\\} \\subset \\R"}),"; wir arbeiten also in ",e.jsx(i.a,{href:"#env-konvexkombination",children:"Definition 11.1.1"}),` mit
`,e.jsx(n,{children:"V = \\R"}),". Ihr ",e.jsx(b,{id:"expected-value",children:"Erwartungswert"})," ist"]}),e.jsx(a,{children:"\\cgreen{\\E(X)} = \\sum_{x_j \\in T_X} \\cgreen{\\Pr(X = x_j)}\\, x_j ,"}),e.jsxs(i.p,{children:["und das ist wörtlich ",e.jsx(i.a,{href:"#env-konvexkombination",children:"Definition 11.1.1"}),`: Die Wahrscheinlichkeiten sind nichtnegativ und
summieren sich zu `,e.jsx(n,{children:"1"}),`. Der Erwartungswert ist also eine Konvexkombination der Werte des
Trägers, mit den Wahrscheinlichkeiten als Gewichten. Bei abzählbar unendlichem Träger wird
daraus eine Reihe, und wir bräuchten einen Grenzübergang.`]}),e.jsxs(i.p,{children:["Beim fairen Würfel etwa tragen alle sechs Augenzahlen das Gewicht ",e.jsx(n,{children:"\\tfrac{1}{6}"}),`, und wir
erhalten das arithmetische Mittel `,e.jsx(n,{children:"\\cgreen{\\E(X)} = 3{,}5"}),`. Daran hängt eine Aussage, die
uns durch das Kapitel begleitet: Ein gewichteter Durchschnitt verlässt den Bereich seiner
Zutaten nicht. `,e.jsx(n,{children:"\\E(X)"})," liegt zwischen ",e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"6"}),", obwohl kein einzelner Wurf jemals ",e.jsx(n,{children:"3{,}5"}),`
zeigt.`]}),e.jsxs(i.p,{children:[`Rechnen wir dagegen erst und mitteln dann, ändert sich das Bild. Für dieselbe Zufallsvariable
ist `,e.jsx(n,{children:"\\E(X^2) = \\tfrac{91}{6} \\approx 15{,}17"}),", während ",e.jsx(n,{children:"\\left(\\E(X)\\right)^2 = 12{,}25"}),` ist.
Die Differenz `,e.jsx(n,{children:"\\tfrac{35}{12} \\approx 2{,}92"})," ist die ",e.jsx(b,{id:"variance",children:"Varianz"}),`. Dass hier immer dieses
Vorzeichen steht, ist kein Zufall des Würfels, sondern die Jensen-Ungleichung; wir beweisen
sie in `,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Zwei Punkte: das Liniensegment"}),`
`,e.jsxs(i.p,{children:["Der einfachste nichttriviale Fall hat ",e.jsx(n,{children:"k = 2"}),`, und er ist bereits das geometrische Herz des
ganzen Kapitels.`]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.1.4 (Konvexkombinationen zweier Vektoren)",id:"env-konvexkombinationen-zweier-vektoren",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx_1, \\bx_2 \\in V"}),". Die Menge aller Konvexkombinationen von ",e.jsx(n,{children:"\\bx_1"})," und ",e.jsx(n,{children:"\\bx_2"}),` ist
das `,e.jsx(i.em,{children:"Liniensegment"})]}),e.jsx(a,{children:"[\\bx_1, \\bx_2] := \\left\\{\\cgreen{\\bx_1 + \\lambda\\,(\\bx_2 - \\bx_1)} \\colon \\lambda \\in [0,1]\\right\\} ,"}),e.jsx(i.p,{children:"also die Verbindungsstrecke der beiden Punkte."})]}),`
`,e.jsx(L,{title:"Beweis für Konvexkombinationen zweier Vektoren",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die Summenbedingung erlaubt es, ",e.jsx(n,{children:"w_1"})," zu eliminieren; danach sortieren wir nach ",e.jsx(n,{children:"\\bx_1"})]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\bx}"}),` eine Konvexkombination, also
`,e.jsx(n,{children:"\\cgreen{\\bx} = \\cgreen{w_1}\\bx_1 + \\cgreen{w_2}\\bx_2"})," mit ",e.jsx(n,{children:"\\cgreen{w_1}, \\cgreen{w_2} \\ge 0"}),`
und `,e.jsx(n,{children:"\\cgreen{w_1} + \\cgreen{w_2} = 1"}),". Setzen wir ",e.jsx(n,{children:"\\lambda := \\cgreen{w_2}"}),`, so ist
`,e.jsx(n,{children:"\\lambda \\in [0,1]"})," und ",e.jsx(n,{children:"\\cgreen{w_1} = 1 - \\lambda"}),", also"]}),e.jsx(a,{children:`\\cgreen{\\bx} = (1-\\lambda)\\,\\bx_1 + \\lambda\\,\\bx_2
= \\cgreen{\\bx_1 + \\lambda\\,(\\bx_2 - \\bx_1)} .`})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\lambda \\in [0,1]"})," garantiert ",e.jsx(n,{children:"1 - \\lambda \\ge 0"}),"; ohne diese Schranke bekämen wir die ganze Gerade durch ",e.jsx(n,{children:"\\bx_1"})," und ",e.jsx(n,{children:"\\bx_2"})," statt nur die Strecke"]}),children:e.jsxs(i.p,{children:["Sei umgekehrt ",e.jsx(n,{children:"\\lambda \\in [0,1]"})," gegeben. Mit ",e.jsx(n,{children:"\\cgreen{w_1} := 1 - \\lambda"}),` und
`,e.jsx(n,{children:"\\cgreen{w_2} := \\lambda"})," sind beide Gewichte nichtnegativ, ihre Summe ist ",e.jsx(n,{children:"1"}),`, und die
zugehörige Konvexkombination ist gerade `,e.jsx(n,{children:"\\cgreen{\\bx_1 + \\lambda(\\bx_2 - \\bx_1)}"}),`. Beide
Mengen enthalten einander, sind also gleich.`]})})]})}),`
`,e.jsxs(i.p,{children:["Der Parameter ",e.jsx(n,{children:"\\lambda"})," misst den Fortschritt entlang der Strecke: ",e.jsx(n,{children:"\\lambda = 0"}),` gibt
`,e.jsx(n,{children:"\\bx_1"}),", ",e.jsx(n,{children:"\\lambda = \\tfrac{1}{2}"})," den Mittelpunkt, ",e.jsx(n,{children:"\\lambda = 1"})," gibt ",e.jsx(n,{children:"\\bx_2"}),`. Wer die
Schranken `,e.jsx(n,{children:"0 \\le \\lambda \\le 1"}),` fallen lässt, erhält die ganze Gerade durch die beiden
Punkte; die Nichtnegativität der Gewichte ist also genau das, was Strecke von Gerade trennt.`]}),`
`,e.jsxs(i.p,{children:["Halten wir fest, worauf das hinausläuft. Eine Menge wird gleich ",e.jsx(i.em,{children:"konvex"}),` heißen, wenn sie mit
je zwei Punkten auch deren Verbindungsstrecke enthält (`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),`).
`,e.jsx(i.a,{href:"#env-konvexkombinationen-zweier-vektoren",children:"Satz 11.1.4"}),` sagt: Diese Strecke ist nichts anderes als die Menge aller Konvexkombinationen der
beiden Punkte. Konvexe Mengen sind also genau die Mengen, die unter Konvexkombinationen von je
zwei Punkten abgeschlossen sind. Dass dann auch Konvexkombinationen von mehr als zwei Punkten
nicht hinausführen, ist eine Induktion und steht dort als eigener Satz.`]}),`
`,e.jsx(i.h3,{children:"Die konvexe Hülle"}),`
`,e.jsxs(i.p,{children:[`Bisher haben wir von einer festen, endlichen Punktliste aus kombiniert. Die konvexe Hülle
dreht den Blick um: Wir sammeln alles ein, was sich aus einer Menge `,e.jsx(n,{children:"\\Xcal"}),` überhaupt
kombinieren lässt.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.1.5 (Konvexe Hülle)",id:"env-konvexe-huelle",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\Xcal \\subset V"})," eine beliebige Menge von Vektoren. Die Menge"]}),e.jsx(a,{children:`\\cblue{\\conv(\\Xcal)} = \\left\\{\\cgreen{\\bx} = \\sum_{i=1}^N \\cgreen{w_i} \\bx_i \\colon
N \\in \\N,\\ \\bx_i \\in \\Xcal,\\ \\cgreen{w_i} \\ge 0,\\ \\sum_{i=1}^N \\cgreen{w_i} = 1\\right\\}`}),e.jsxs(i.p,{children:["aller Konvexkombinationen von endlich vielen Vektoren aus ",e.jsx(n,{children:"\\Xcal"})," heißt ",e.jsx(i.em,{children:"konvexe Hülle"}),`
(convex hull) von `,e.jsx(n,{children:"\\Xcal"}),"."]})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.1.6 (Warum endlich viele)",id:"env-warum-endlich-viele",children:[e.jsx(i.p,{children:"Drei Details der Definition verdienen einen zweiten Blick."}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\Xcal"})," selbst darf unendlich sein, eine Kugel etwa oder eine Kurve. Jede ",e.jsx(i.em,{children:"einzelne"}),`
Kombination benutzt aber nur endlich viele Punkte daraus. Und `,e.jsx(n,{children:"N"}),` ist nicht ein für alle Mal
festgelegt, sondern darf von Punkt zu Punkt anders ausfallen; deshalb steht das `,e.jsx(n,{children:"N \\in \\N"}),`
mit in der Mengenklammer.`]}),e.jsxs(i.p,{children:["Für endliches ",e.jsx(n,{children:"\\Xcal = \\{\\bx_1, \\dots, \\bx_k\\}"})," reicht immer ",e.jsx(n,{children:"N = k"}),`. Wir dürfen ja Gewichte
`,e.jsx(n,{children:"0"}),` vergeben, brauchen also nie mehr Summanden als Punkte, und Wiederholungen bringen nichts
Neues, weil sich die Gewichte zweier gleicher Punkte einfach addieren.`]}),e.jsxs(i.p,{children:["Schließlich gilt ",e.jsx(n,{children:"\\Xcal \\subseteq \\cblue{\\conv(\\Xcal)}"}),": Für ",e.jsx(n,{children:"N = 1"}),` ist
`,e.jsx(n,{children:"\\cgreen{w_1} = 1"})," erzwungen, und wir bekommen die Punkte von ",e.jsx(n,{children:"\\Xcal"}),` selbst zurück. Wer
neugierig ist: Im `,e.jsx(n,{children:"\\R^n"})," genügen sogar stets ",e.jsx(n,{children:"N \\le n+1"}),` Punkte pro Kombination, in der
Ebene also drei. Das ist der klassische Satz von Carathéodory, den wir hier nicht
brauchen.`]})]}),`
`,e.jsxs(i.p,{children:["Unter den Punkten von ",e.jsx(n,{children:"\\Xcal"}),` gibt es solche, die sich nicht wegdiskutieren lassen, weil sie
aus den anderen nicht zu bauen sind.`]}),`
`,e.jsx(j,{kind:"Definition",label:"11.1.7 (Extrempunkt)",id:"env-konvexkombinationen-extrempunkt",children:e.jsxs(i.p,{children:["Ein Punkt ",e.jsx(n,{children:"\\corange{\\bx} \\in \\Xcal"})," heißt ",e.jsx(i.em,{children:"Extrempunkt"}),` (extreme point) von
`,e.jsx(n,{children:"\\cblue{\\conv(\\Xcal)}"}),`, wenn er sich nur auf die triviale Weise als Konvexkombination von
Punkten aus `,e.jsx(n,{children:"\\Xcal"})," schreiben lässt, nämlich mit dem Gewicht ",e.jsx(n,{children:"\\cgreen{1}"}),` auf
`,e.jsx(n,{children:"\\corange{\\bx}"})," selbst und ",e.jsx(n,{children:"\\cgreen{0}"})," auf allen anderen Punkten von ",e.jsx(n,{children:"\\Xcal"}),"."]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.1.8 (Extrempunkt zu sein ist keine Eigenschaft des Punktes allein)",id:"env-extrempunkt-zu-sein-ist-keine",children:[e.jsxs(i.p,{children:["Die Definition prüft eine Aussage über ",e.jsx(i.em,{children:"alle"}),` Darstellungen. Ob ein Punkt Extrempunkt ist,
hängt deshalb an der ganzen Menge `,e.jsx(n,{children:"\\Xcal"}),", nicht am Punkt für sich. Nehmen wir zu ",e.jsx(n,{children:"\\Xcal"}),`
weitere Vektoren hinzu, so kann ein bisheriger Extrempunkt seinen Status verlieren, sobald
er zwischen den neuen liegt. Das zweite Widget unten führt das vor.`]}),e.jsxs(i.p,{children:[`In der Literatur wird der Begriff meist etwas allgemeiner gefasst, nämlich für eine beliebige
konvexe Menge statt für eine Punktliste: Extrem heißt dort, im Inneren keiner Strecke zu
liegen, die ganz in der Menge verläuft. Diese Fassung brauchen wir ab
`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"})," und führen sie dort als ",e.jsx(i.a,{href:"#env-konvexe-mengen-extrempunkt",children:"Definition 11.2.5"}),` ein; für
eine endliche Punktmenge `,e.jsx(n,{children:"\\Xcal"}),` wählen beide Lesarten dieselben Punkte aus. Im
Dreiecksbeispiel unten bleiben deshalb genau die drei Ecken übrig.`]})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.1.9 (Die kleinste konvexe Obermenge)",id:"env-die-kleinste-konvexe-obermenge",children:[e.jsxs(i.p,{children:["Der Name ",e.jsx(i.em,{children:"Hülle"})," ist mit Bedacht gewählt: ",e.jsx(n,{children:"\\cblue{\\conv(\\Xcal)}"}),` ist die
kleinste konvexe Menge, die `,e.jsx(n,{children:"\\Xcal"}),` enthält. Das sind drei
Behauptungen auf einmal: `,e.jsx(n,{children:"\\cblue{\\conv(\\Xcal)}"})," ist konvex, sie enthält ",e.jsx(n,{children:"\\Xcal"}),`, und sie
liegt in `,e.jsx(i.em,{children:"jeder"})," konvexen Menge, die ",e.jsx(n,{children:"\\Xcal"})," enthält."]}),e.jsxs(i.p,{children:["Die zweite steht schon in ",e.jsx(i.a,{href:"#env-warum-endlich-viele",children:"Bemerkung 11.1.6"}),`. Für die anderen beiden fehlt uns
noch der Begriff der konvexen Menge, deshalb holen wir den Beweis in
`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),` nach. Die Beweisidee lässt sich aber jetzt schon in einem Satz
sagen: Eine konvexe Menge ist unter Konvexkombinationen von zwei Punkten abgeschlossen, und
daraus folgt per Induktion die Abgeschlossenheit unter Konvexkombinationen von `,e.jsx(n,{children:"N"})," Punkten."]})]}),`
`,e.jsxs(we,{title:"Wie eine Punktwolke ihre Hülle aufspannt",children:[e.jsx(i.p,{children:`Hier steht eine Punktwolke mit ihrer konvexen Hülle, und wir lassen die Wolke
wachsen. Die Hülle selbst kann dabei nur größer werden. Aber gilt das auch
für die Liste ihrer Extrempunkte?`}),e.jsx(Fi,{}),e.jsxs(i.p,{children:[`Wie das Widget zeigt, wächst die Fläche monoton, die Liste der Extrempunkte dagegen nicht:
Bei `,e.jsx(n,{children:"k = 5, 6, 8, 9, 10, 11"})," und ",e.jsx(n,{children:"12"}),` fällt jeweils eine alte Ecke heraus, während der neue
Punkt nachrückt. Die Anzahl bleibt dabei stehen und nur die Zusammensetzung ändert sich;
fallen kann sie ebenfalls, nämlich sobald ein einziger neuer Punkt gleich zwei alte Ecken
einschließt. Am Ende tragen sieben der vierzehn Punkte die ganze Hülle. Genau das meint
`,e.jsx(i.a,{href:"#env-extrempunkt-zu-sein-ist-keine",children:"Bemerkung 11.1.8"}),": Extrempunkt zu sein ist keine Eigenschaft des Punktes, sondern der Menge."]}),e.jsxs(i.p,{children:[`Der grüne Punkt ist der Mittelwert der freigeschalteten Punkte, also die Konvexkombination
mit lauter Gewichten `,e.jsx(n,{children:"\\tfrac{1}{k}"})," aus ",e.jsx(i.a,{href:"#env-ein-gewichteter-durchschnitt",children:"Bemerkung 11.1.2"}),`. Er liegt immer in der blauen
Fläche. Das ist die geometrische Fassung derselben Aussage, die in `,e.jsx(i.a,{href:"#env-der-erwartungswert-ist-eine",children:"Beispiel 11.1.3"}),` den
Erwartungswert zwischen `,e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"6"})," hält."]})]}),`
`,e.jsxs(L,{title:"Die konvexe Hülle dreier Punkte ausführlich berechnet",children:[e.jsxs(i.h3,{children:["Beispiel im ",e.jsx(n,{children:"\\R^2"}),": das Dreieck"]}),e.jsxs(j,{kind:"Beispiel",label:"11.1.10 (Konvexe Hülle dreier Punkte)",id:"env-konvexe-huelle-dreier-punkte",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\Xcal = \\{\\corange{\\bx_1}, \\corange{\\bx_2}, \\corange{\\bx_3}\\} \\subset \\R^2"})," mit"]}),e.jsx(a,{children:`\\corange{\\bx_1} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}, \\qquad
\\corange{\\bx_2} = \\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}, \\qquad
\\corange{\\bx_3} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} ,`}),e.jsx(i.p,{children:"also den Ecken eines Dreiecks."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Extrempunkte."})," Alle drei Punkte sind Extrempunkte im Sinne von ",e.jsx(i.a,{href:"#env-konvexkombinationen-extrempunkt",children:"Definition 11.1.7"}),`. Keiner
von ihnen liegt auf der Verbindungsstrecke der beiden anderen, also erreichen wir ihn nur
mit `,e.jsx(n,{children:"\\cgreen{w_i} = 1"})," und ",e.jsx(n,{children:"\\cgreen{w_j} = 0"})," für ",e.jsx(n,{children:"j \\neq i"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvexe Hülle."})," Nach ",e.jsx(i.a,{href:"#env-konvexe-huelle",children:"Definition 11.1.5"})," ist ",e.jsx(n,{children:"\\cblue{\\conv(\\Xcal)}"})," die Menge aller Punkte"]}),e.jsx(a,{children:`\\cgreen{\\bx} = \\cgreen{w_1} \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}
+ \\cgreen{w_2} \\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}
+ \\cgreen{w_3} \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}
= \\begin{pmatrix} 2\\cgreen{w_2} + \\cgreen{w_3} \\\\ 2\\cgreen{w_3} \\end{pmatrix}`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\cgreen{w_1}, \\cgreen{w_2}, \\cgreen{w_3} \\ge 0"}),` und
`,e.jsx(n,{children:"\\cgreen{w_1} + \\cgreen{w_2} + \\cgreen{w_3} = 1"}),", und das ist die Dreiecksfläche samt Rand."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ein konkreter Punkt."})," Für ",e.jsx(n,{children:"\\cgreen{w_1} = \\cgreen{w_2} = \\cgreen{w_3} = \\tfrac{1}{3}"}),`
ergibt sich`]}),e.jsx(a,{children:`\\cgreen{\\bx} = \\tfrac{1}{3}\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}
+ \\tfrac{1}{3}\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}
+ \\tfrac{1}{3}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}
= \\begin{pmatrix} 1 \\\\ \\tfrac{2}{3} \\end{pmatrix} ,`}),e.jsx(i.p,{children:"der Schwerpunkt des Dreiecks. Er liegt im Inneren, denn alle drei Gewichte sind positiv."})]}),e.jsxs(j,{kind:"Bemerkung",label:"11.1.11 (Rand und Inneres an den Gewichten ablesen)",id:"env-rand-und-inneres-an-den-gewichten",children:[e.jsxs(i.p,{children:[`Im Dreiecksbeispiel sind die Gewichte durch den Punkt eindeutig bestimmt, weil
`,e.jsx(n,{children:"\\corange{\\bx_2} - \\corange{\\bx_1}"})," und ",e.jsx(n,{children:"\\corange{\\bx_3} - \\corange{\\bx_1}"}),` linear unabhängig
sind. Deshalb dürfen wir die Lage eines Punktes direkt an seinen Gewichten ablesen. Sind alle
drei positiv, liegt er im Inneren. Ist genau eines gleich `,e.jsx(n,{children:"0"}),`, liegt er auf der
gegenüberliegenden Kante, die nach `,e.jsx(i.a,{href:"#env-konvexkombinationen-zweier-vektoren",children:"Satz 11.1.4"}),` gerade das Liniensegment der beiden anderen
Ecken ist. Sind zwei gleich `,e.jsx(n,{children:"0"}),", sind wir in einer Ecke."]}),e.jsxs(i.p,{children:["Die Gewichte haben hier eine hübsche geometrische Bedeutung: ",e.jsx(n,{children:"\\cgreen{w_i}"}),` ist der
Flächenanteil des Teildreiecks, das aus `,e.jsx(n,{children:"\\cgreen{\\bx}"})," und den beiden ",e.jsx(i.em,{children:"anderen"}),` Ecken
gebildet wird. Beim Schwerpunkt sind alle drei Teilflächen gleich groß, jede also ein Drittel
der Gesamtfläche `,e.jsx(n,{children:"2"}),". Das Widget rechnet diese Probe live mit."]})]}),e.jsxs(we,{title:"Konvexkombinationen zum Schieben",children:[e.jsx(i.p,{children:`Ein einziges Widget deckt Liniensegment und Dreieck zugleich ab, wenn wir den Punkt selbst
bewegen dürfen. Zwei Fragen lassen sich daran
klären: Welche Punkte der Ebene sind überhaupt Konvexkombinationen der drei Ecken, und woran
sehen wir den Gewichten an, ob der Punkt im Inneren, auf einer Kante oder in einer Ecke liegt?`}),e.jsx(_i,{}),e.jsxs(i.p,{children:[`Der grüne Punkt verlässt das Dreieck nie: Negative Gewichte sind nicht zugelassen, und genau
diese Nichtnegativität hält ihn drinnen. Jede Kante entsteht, sobald ein Gewicht null wird:
Übrig bleibt die Konvexkombination zweier Ecken, also nach `,e.jsx(i.a,{href:"#env-konvexkombinationen-zweier-vektoren",children:"Satz 11.1.4"})," ihr Liniensegment."]}),e.jsxs(i.p,{children:[`Die drei Regler geben unnormierte Werte; geteilt wird durch ihre Summe, damit
`,e.jsx(n,{children:"\\cgreen{w_1} + \\cgreen{w_2} + \\cgreen{w_3} = 1"}),` gilt. Nur eine Reglerstellung ist verboten,
nämlich alle drei auf `,e.jsx(n,{children:"\\cred{0}"}),": Dann ist die Summe ",e.jsx(n,{children:"\\cred{0}"}),`, die Normierung nicht
definiert, und die Nebenbedingung lässt sich gar nicht erfüllen.`]}),e.jsxs(i.p,{children:[`Die gestrichelte Hilfsstrecke zeigt, warum die drei Ecken die gesamte Fläche erzeugen. Wir
mischen zuerst `,e.jsx(n,{children:"\\corange{\\bx_2}"})," und ",e.jsx(n,{children:"\\corange{\\bx_3}"})," zum Punkt ",e.jsx(n,{children:"\\cgreen{\\by}"}),` auf der
Kante zwischen diesen beiden und mischen dann `,e.jsx(n,{children:"\\corange{\\bx_1}"})," mit ",e.jsx(n,{children:"\\cgreen{\\by}"}),`. Läuft
`,e.jsx(n,{children:"\\cgreen{\\by}"})," über die ganze Kante, so überstreichen die Strecken von ",e.jsx(n,{children:"\\corange{\\bx_1}"}),` aus
das ganze Dreieck. Formal steckt dahinter nichts anderes als das Zusammenfassen von
Gewichten:`]}),e.jsx(a,{children:`\\cgreen{\\bx} = \\cgreen{w_1}\\corange{\\bx_1}
+ (\\cgreen{w_2} + \\cgreen{w_3}) \\underbrace{\\left(
\\frac{\\cgreen{w_2}}{\\cgreen{w_2} + \\cgreen{w_3}}\\corange{\\bx_2}
+ \\frac{\\cgreen{w_3}}{\\cgreen{w_2} + \\cgreen{w_3}}\\corange{\\bx_3}
\\right)}_{=\\ \\cgreen{\\by}} ,`}),e.jsxs(i.p,{children:["und die beiden inneren Gewichte summieren sich wieder zu ",e.jsx(n,{children:"1"}),`. Vorausgesetzt ist dabei
`,e.jsx(n,{children:"\\cgreen{w_2} + \\cgreen{w_3} > 0"}),"; sonst bleibt schlicht ",e.jsx(n,{children:"\\cgreen{\\bx} = \\corange{\\bx_1}"}),`,
und es gibt nichts zu mischen. Dieselbe Rechnung, ein paar
Punkte weiter getrieben, ist die Induktion, die wir in
`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"})," für die Hülle brauchen."]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(en,{children:[e.jsxs(E,{wahr:!0,children:[e.jsx(i.p,{children:`Jede Konvexkombination ist eine Linearkombination, aber nicht jede Linearkombination ist
eine Konvexkombination.`}),e.jsxs(i.p,{children:["Konvexkombinationen sind Linearkombinationen mit zwei Zusatzbedingungen (",e.jsx(i.a,{href:"#env-konvexkombination",children:"Definition 11.1.1"}),`),
also ist die erste Hälfte klar. Für die zweite genügt ein Gegenbeispiel. Mit
`,e.jsx(n,{children:"\\bx_1 = (1,0)^\\top"})," und ",e.jsx(n,{children:"\\bx_2 = (0,1)^\\top"})," ist ",e.jsx(n,{children:"2\\bx_1 = (2,0)^\\top"}),` eine
Linearkombination, aber keine Konvexkombination: Nach `,e.jsx(i.a,{href:"#env-konvexkombinationen-zweier-vektoren",children:"Satz 11.1.4"}),` sind das genau die Punkte der
Strecke zwischen `,e.jsx(n,{children:"\\bx_1"})," und ",e.jsx(n,{children:"\\bx_2"}),", und ",e.jsx(n,{children:"(2,0)^\\top"}),` liegt nicht darauf. Ebenso wenig tut es
`,e.jsx(n,{children:"\\bx_1 - \\bx_2 = (1,-1)^\\top"}),`. Auf die konkreten Vektoren kommt es dabei an: Wäre
`,e.jsx(n,{children:"\\bx_1 = \\bnull"}),", so wäre ",e.jsx(n,{children:"2\\bx_1 = \\bx_1"})," sehr wohl eine Konvexkombination."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsx(i.p,{children:"Ist ein Optimierungsproblem konvex, so besitzt es genau ein globales Minimum."}),e.jsxs(i.p,{children:[`So formuliert verspricht die Aussage zu viel. Zuverlässig ist: Jedes lokale Minimum ist
global. Eindeutigkeit folgt daraus nicht, denn eine konstante Funktion ist konvex und wird an
jeder Stelle minimal; dafür braucht es strikte Konvexität. Und die Existenz ist eine dritte,
davon unabhängige Frage: `,e.jsx(n,{children:"f(x) = e^x"})," ist konvex und nimmt ihr Infimum ",e.jsx(n,{children:"0"})," auf ",e.jsx(n,{children:"\\R"}),` nie an.
Die drei Aussagen werden in `,e.jsx(i.a,{href:"#sec-11.5",children:"Abschnitt 11.5"})," sauber getrennt."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Für die Dreiecksecken ",e.jsx(n,{children:"\\bx_1 = (0,0)^\\top"}),", ",e.jsx(n,{children:"\\bx_2 = (2,0)^\\top"})," und ",e.jsx(n,{children:"\\bx_3 = (1,2)^\\top"}),`
liegt der Punkt `,e.jsx(n,{children:"(1,1)^\\top"})," nicht in ",e.jsx(n,{children:"\\conv(\\Xcal)"}),"."]}),e.jsxs(i.p,{children:[`Er liegt darin, und wir können die Gewichte angeben:
`,e.jsx(n,{children:`\\tfrac{1}{4}\\bx_1 + \\tfrac{1}{4}\\bx_2 + \\tfrac{1}{2}\\bx_3
= (\\tfrac{1}{2} + \\tfrac{1}{2},\\ 1)^\\top = (1,1)^\\top`}),`. Alle drei Gewichte sind positiv und
summieren sich zu `,e.jsx(n,{children:"1"}),", der Punkt liegt also sogar im Inneren des Dreiecks."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bx"})," ein Extrempunkt von ",e.jsx(n,{children:"\\conv(\\Xcal)"}),", so bleibt ",e.jsx(n,{children:"\\bx"}),` auch dann Extrempunkt, wenn
wir `,e.jsx(n,{children:"\\Xcal"})," um weitere Punkte vergrößern."]}),e.jsxs(i.p,{children:[`Extrempunkt zu sein ist eine Aussage über alle Darstellungen und hängt damit an der ganzen
Menge (`,e.jsx(i.a,{href:"#env-extrempunkt-zu-sein-ist-keine",children:"Bemerkung 11.1.8"}),"). Im Hüllen-Widget oben ist ",e.jsx(n,{children:"(1{,}5;\\ 1{,}4)"})," bei ",e.jsx(n,{children:"k = 4"}),` noch
Extrempunkt und verliert diesen Status bei `,e.jsx(n,{children:"k = 5"}),`, weil der neu hinzukommende Punkt ihn
einschließt. Umgekehrt kann ein Punkt seinen Status nie `,e.jsx(i.em,{children:"gewinnen"}),`, wenn wir Punkte
hinzunehmen.`]})]}),e.jsxs(E,{wahr:!0,children:[e.jsx(i.p,{children:`Der Erwartungswert einer diskreten Zufallsvariablen mit endlichem Träger ist eine
Konvexkombination der Trägerwerte.`}),e.jsxs(i.p,{children:["Die Gewichte sind die Wahrscheinlichkeiten ",e.jsx(n,{children:"\\Pr(X = x_j)"}),": nichtnegativ und mit Summe ",e.jsx(n,{children:"1"}),`
(`,e.jsx(i.a,{href:"#env-der-erwartungswert-ist-eine",children:"Beispiel 11.1.3"}),"). Daraus folgt sofort, dass ",e.jsx(n,{children:"\\E(X)"}),` zwischen dem kleinsten und dem größten
Trägerwert liegt, denn ein gewichteter Durchschnitt verlässt die konvexe Hülle seiner
Zutaten nicht.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["In der Definition der konvexen Hülle muss die Zahl ",e.jsx(n,{children:"N"}),` der beteiligten Punkte für alle
Elemente dieselbe sein, und `,e.jsx(n,{children:"\\Xcal"})," muss endlich sein."]}),e.jsxs(i.p,{children:["Beides ist zu eng gelesen. ",e.jsx(n,{children:"N"}),` steht mit in der Mengenklammer und darf von Punkt zu Punkt
verschieden ausfallen, und `,e.jsx(n,{children:"\\Xcal"}),` selbst darf ohne Weiteres unendlich sein; nur jede
einzelne Kombination benutzt endlich viele Punkte (`,e.jsx(i.a,{href:"#env-warum-endlich-viele",children:"Bemerkung 11.1.6"}),"). Für endliches ",e.jsx(n,{children:"\\Xcal"}),`
mit `,e.jsx(n,{children:"k"})," Elementen reicht dagegen immer ",e.jsx(n,{children:"N = k"}),", weil Gewichte ",e.jsx(n,{children:"0"})," erlaubt sind."]})]}),e.jsxs(on,{loesung:7,toleranz:0,children:[e.jsxs(i.p,{children:["Schieben wir im Hüllen-Widget den Regler ganz nach rechts, also auf ",e.jsx(n,{children:"k = 14"}),`. Wie viele der
vierzehn Punkte sind dann noch Extrempunkte?`]}),e.jsxs(i.p,{children:[`Sieben. Die anderen sieben liegen im Inneren der Hülle und lassen sich als Konvexkombination
der Ecken schreiben; sie steuern zur Hülle nichts bei. Genau darin liegt der Nutzen der
Extrempunkte: Sie sind die sparsame Beschreibung einer konvexen Menge. Die Hülle hat dann die
Fläche `,e.jsx(n,{children:"7{,}46"}),", und keiner der sieben inneren Punkte könnte sie vergrößern."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Boyd und Vandenberghe, Convex Optimization, §2.1 behandelt Liniensegmente,
konvexe Mengen, Konvexkombinationen und die konvexe Hülle mit weiteren Beispielen.`})})]})}function Pi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(ii,{...r})}):ii(r)}const xe=F.blau,te=F.gruen,Ki=F.rot,Bi=F.orange,Xi=F.grau,V=1.4,Q=300,oe=30,Ri=30,Wi=10,Pn=oe+Q+Wi,Kn=Q+Ri,Bn=r=>`(${h(r[0])}; ${h(r[1])})`,Xn=(r,i,s)=>{const d=r(0),t=i(0),c=r(s)-r(0);return`M${d+c},${t} A${c},${c} 0 1 0 ${d-c},${t} A${c},${c} 0 1 0 ${d+c},${t} Z`},Le=[{id:"scheibe",name:"Kreisscheibe",formel:"{ z : ‖z‖ ≤ 1,2 }",drin:r=>Math.hypot(r[0],r[1])<=1.2+1e-12,konvex:!0,flaeche:(r,i)=>e.jsx("path",{d:Xn(r,i,1.2),fill:xe,fillOpacity:.16,stroke:xe,strokeWidth:1.4}),paar:[[-1,.5],[.9,-.6]],paarName:"Testpaar setzen"},{id:"ring",name:"Kreisring",formel:"{ z : 0,8 ≤ ‖z‖ ≤ 1,2 }",drin:r=>{const i=Math.hypot(r[0],r[1]);return i>=.8-1e-12&&i<=1.2+1e-12},konvex:!1,flaeche:(r,i)=>e.jsx("path",{d:`${Xn(r,i,1.2)} ${Xn(r,i,.8)}`,fillRule:"evenodd",fill:xe,fillOpacity:.16,stroke:xe,strokeWidth:1.4}),paar:[[1.1,0],[0,1.1]],paarName:"Gegenbeispiel setzen"},{id:"dreieck",name:"Dreieck",formel:"{ z : z₁ ≥ 0, z₂ ≥ 0, z₁ + z₂ ≤ 1 }",drin:r=>r[0]>=-1e-12&&r[1]>=-1e-12&&r[0]+r[1]<=1+1e-12,konvex:!0,flaeche:(r,i)=>e.jsx("polygon",{points:`${r(0)},${i(0)} ${r(1)},${i(0)} ${r(0)},${i(1)}`,fill:xe,fillOpacity:.16,stroke:xe,strokeWidth:1.4}),extrem:[[0,0],[1,0],[0,1]],paar:[[.05,.05],[.8,.15]],paarName:"Testpaar setzen"},{id:"parabel",name:"Parabelunterseite",formel:"{ z : z₂ ≤ z₁² }",drin:r=>r[1]<=r[0]*r[0]+1e-12,konvex:!1,flaeche:(r,i)=>{const d=[];for(let t=0;t<=80;t++){const c=-V+2*V*t/80;d.push(`${r(c).toFixed(1)},${i(Math.min(c*c,V)).toFixed(1)}`)}return e.jsx("polygon",{points:`${d.join(" ")} ${r(V)},${i(-V)} ${r(-V)},${i(-V)}`,fill:xe,fillOpacity:.16,stroke:xe,strokeWidth:1.4})},paar:[[-1,1],[1,1]],paarName:"Gegenbeispiel setzen"}];function Gi(r,i,s,d=600){const t=k=>[k*i[0]+(1-k)*s[0],k*i[1]+(1-k)*s[1]],c=[];for(let k=0;k<=d;k++)c.push(r.drin(t(k/d)));const u=[];let p=0;for(let k=1;k<=d;k++)c[k]!==c[k-1]&&(u.push({drin:c[p],a:p/d,b:(k-.5)/d}),p=k);u.push({drin:c[p],a:p/d,b:1});const m=c.filter(k=>!k).length;if(m===0)return{anteil:0,von:NaN,bis:NaN,stuecke:u};const f=(k,D)=>{let X=k,K=D;for(let M=0;M<40;M++){const l=(X+K)/2;r.drin(t(l))===r.drin(t(k))?X=l:K=l}return(X+K)/2},w=c.indexOf(!1),N=c.lastIndexOf(!1),g=w===0?0:f((w-1)/d,w/d),_=N===d?1:f((N+1)/d,N/d);return{anteil:m/(d+1),von:g,bis:_,stuecke:u}}function qi(){const[r,i]=I.useState(Le[1].id),[s,d]=I.useState([1.1,0]),[t,c]=I.useState([.85,.75]),u=Le.find(l=>l.id===r)??Le[0],p=l=>oe+(l+V)/(2*V)*Q,m=l=>Q-(l+V)/(2*V)*Q,f=un({feld:{x0:oe,y0:0,w:Q,h:Q},welt:{x0:-V,x1:V,y0:-V,y1:V},snap:.05,clamp:([l,B])=>[he(l,-V,V),he(B,-V,V)],greifPosition:l=>l==="x"?s:t,onDrag:(l,B)=>B==="x"?d(l):c(l)}),w=u.drin(s),N=u.drin(t),g=w&&N,_=Gi(u,s,t),k=l=>{const B=Le.find(o=>o.id===l)??Le[0];i(l),d(B.paar[0]),c(B.paar[1])},D=s[0]===t[0]&&s[1]===t[1],X=l=>[l*s[0]+(1-l)*t[0],l*s[1]+(1-l)*t[1]],K=X(.5),M=(l,B,o,A)=>e.jsx(ie,{label:l,value:B,onChange:x=>o(Math.round(x*20)/20),min:-V,max:V,step:.05,accent:A,fmt:x=>h(x)});return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Ziehen wir x und y so, dass die grüne Strecke die blaue Menge verlässt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Le.map(l=>e.jsx("button",{type:"button","aria-pressed":l.id===r,className:l.id===r?Me:pe,onClick:()=>k(l.id),children:l.name},l.id))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[300px]",children:e.jsxs("svg",{width:Pn,height:Kn,viewBox:`0 0 ${Pn} ${Kn}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Die Menge ${u.name} mit zwei Punkten x und y; die Verbindungsstrecke ${g?_.anteil>0?"verlässt die Menge":"bleibt in der Menge":"wird nicht geprüft"}.`,...f.svgProps,children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s122-clip",children:e.jsx("rect",{x:oe,y:0,width:Q,height:Q})})}),e.jsx("rect",{x:.5,y:.5,width:Pn-1,height:Kn-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),ve(-V,V).map(l=>e.jsxs("g",{children:[e.jsx("line",{x1:oe,x2:oe+Q,y1:m(l),y2:m(l),stroke:l===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:l===0?1.2:.6}),e.jsx("text",{x:oe-4,y:m(l)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(l,.5)})]},`y${l}`)),ve(-V,V).map(l=>e.jsxs("g",{children:[e.jsx("line",{y1:0,y2:Q,x1:p(l),x2:p(l),stroke:l===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:l===0?1.2:.6}),e.jsx("text",{x:p(l),y:Q+12,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(l,.5)})]},`x${l}`)),e.jsxs("g",{clipPath:"url(#s122-clip)",children:[u.flaeche(p,m),_.stuecke.map((l,B)=>{const o=X(l.a),A=X(l.b);return e.jsx("line",{x1:p(o[0]),y1:m(o[1]),x2:p(A[0]),y2:m(A[1]),stroke:g?l.drin?te:Ki:Xi,strokeWidth:g&&!l.drin?3:2.2},B)}),(u.extrem??[]).map((l,B)=>e.jsx("circle",{cx:p(l[0]),cy:m(l[1]),r:4,fill:Bi},`e${B}`)),e.jsx(Ye,{x:p(s[0]),y:m(s[1]),r:5,farbe:te,fuellung:w?te:"var(--w-bg, #ffffff)",aktiv:f.dragging==="x",label:"x",...f.handleProps("x")}),e.jsx(Ye,{x:p(t[0]),y:m(t[1]),r:5,farbe:te,fuellung:N?te:"var(--w-bg, #ffffff)",aktiv:f.dragging==="y",label:"y",...f.handleProps("y")})]}),e.jsx("text",{x:oe+4,y:12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"z₂ ↑"}),e.jsx("text",{x:oe+Q/2,y:Q+26,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"z₁ →"})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-1 text-sm",children:[e.jsx("button",{type:"button",className:pe,onClick:()=>{d(u.paar[0]),c(u.paar[1])},children:u.paarName}),M("x₁",s[0],l=>d([l,s[1]]),te),M("x₂",s[1],l=>d([s[0],l]),te),M("y₁",t[0],l=>c([l,t[1]]),te),M("y₂",t[1],l=>c([t[0],l]),te),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"Menge"}),e.jsx("td",{className:"font-mono text-xs",style:{color:xe},children:u.formel})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"x"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:te},children:[Bn(s)," ",w?"∈ 𝒳":"∉ 𝒳"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"y"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:te},children:[Bn(t)," ",N?"∈ 𝒳":"∉ 𝒳"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"Mittelpunkt"}),e.jsxs("td",{className:"font-mono text-xs",children:[Bn(K)," ",u.drin(K)?"∈ 𝒳":"∉ 𝒳"]})]})]})})]})]}),g?D?e.jsxs(W,{kind:"neutral",titel:"Beide Punkte fallen zusammen.",children:["Die Strecke schrumpft zu einem Punkt. Für x = y ist λ·x + (1−λ)·y = x, die Bedingung aus ",P("definition:konvexe-menge")," also erfüllt, ohne dass wir etwas über die Menge erfahren. Ziehen wir y an eine andere Stelle."]}):_.anteil>0?e.jsxs(W,{kind:"fail",titel:"Geschafft: die Strecke verlässt die Menge.",children:["Für λ echt zwischen ",h(_.von,3)," und ",h(_.bis,3)," liegt z(λ) = λ·x + (1−λ)·y außerhalb, das sind ",h(100*_.anteil,1)," % der abgetasteten Strecke. Damit ist die Bedingung aus ",P("definition:konvexe-menge")," verletzt, und dieses eine Paar entscheidet die Frage: ",u.name," ist nicht konvex."]}):e.jsxs(W,{kind:"warn",titel:"Dieses Paar besteht die Probe.",children:["Für alle abgetasteten λ bleibt z(λ) = λ·x + (1−λ)·y in der Menge. Entschieden ist damit nichts, denn ",P("definition:konvexe-menge")," fordert ",e.jsx("em",{children:"alle"})," Paare. Genau darin liegt die Asymmetrie aus ",P("bemerkung:was-die-bedingung-verlangt"),": Widerlegen kostet ein Beispiel, Beweisen eine Rechnung über alle Paare. Ziehen wir x und y weiter auseinander."]}):e.jsxs(W,{kind:"neutral",titel:"Voraussetzung nicht erfüllt.",children:[!w&&!N?"Beide Punkte liegen":w?"Der Punkt y liegt":"Der Punkt x liegt"," ","außerhalb der Menge. ",P("definition:konvexe-menge")," verlangt x, y ∈ 𝒳 und sagt über andere Paare nichts; ein Herausragen widerlegt hier also nichts. Ziehen wir den Punkt zurück, oder greifen wir zum vorbereiteten Paar."]}),e.jsx("p",{className:"max-w-prose text-xs text-slate-500 dark:text-slate-400",children:"Der Kreisring vertritt hier die Einheitssphäre aus dem Selbsttest: Eine Kurve ohne Dicke lässt sich nicht treffen, und für das Argument zählt ohnehin nur das Loch in der Mitte."})]})}const fn=F.blau,kn=F.orange,Vi=F.rot,Ii=F.gruen,de=-1,C=4,ri=2.5,Y=300,be=32,Li=30,$i=12,Rn=be+Y+$i,Wn=Y+Li,Ee=r=>be+(r-de)/(C-de)*Y,Fe=r=>Y-(r-de)/(C-de)*Y;function Zi(r,i,s){const d=(r+s)/2,t=Math.hypot((r-s)/2,i);return[d-t,d+t]}const Hi=[{name:"Einheitsmatrix",titel:"positiv definit, im Inneren",a:1,b:0,c:1},{name:"Rang 1",titel:"semidefinit, auf dem Rand",a:1,b:1,c:1},{name:"Nullzeile",titel:"semidefinit, auf der Kante c = 0",a:2,b:0,c:0},{name:"indefinit",titel:"b zu groß, außerhalb",a:1,b:2,c:1},{name:"negativ definit",titel:"der gespiegelte Kegel",a:-1,b:0,c:-1}];function Ui(){const[r,i]=I.useState(1),[s,d]=I.useState(1),[t,c]=I.useState(1),[u,p]=I.useState({azimuth:38,elevation:18}),[m,f]=Zi(r,s,t),w=r*t-s*s,N=r+t,g=1e-9,_=r>=-g&&t>=-g&&w>=-g,k=Math.abs(r)<g&&Math.abs(s)<g&&Math.abs(t)<g?"null":m>g?"definit":_?"semidefinit":f<=g?"negativ":"indefinit",D=_?kn:Vi,X=un({feld:{x0:be,y0:0,w:Y,h:Y},welt:{x0:de,x1:C,y0:de,y1:C},snap:.05,clamp:([S,H])=>[he(S,de,C),he(H,de,C)],greifPosition:()=>[r,t],onDrag:([S,H])=>{i(S),c(H)}}),K=I.useMemo(()=>{const S=Math.max(s*s/C,1e-6),H=[];for(let U=0;U<=120;U++){const y=U/120,ne=S*Math.pow(C/S,y);H.push([ne,Math.min(s*s/ne,C)])}return H},[s]),M=`${K.map(([S,H])=>`${Ee(S).toFixed(1)},${Fe(H).toFixed(1)}`).join(" ")} ${Ee(C).toFixed(1)},${Fe(C).toFixed(1)}`,l=ve(de,C),B=l.length>1?l[1]-l[0]:void 0,o=2.5,A=-1.5,x=4,R=I.useMemo(()=>({f:(S,H)=>Math.min(Math.hypot(S,H),x),xDomain:[-o,o],yDomain:[-o,o],nx:34,ny:34,color:fn,opacity:.8,wire:!0}),[]),v=(r-t)/2,q=(r+t)/2,re=I.useMemo(()=>[{p:[v,s,q],color:D,r:4.5,label:"A",onTop:!0}],[v,s,q,D]),yn=I.useMemo(()=>[{p0:[0,s,(A+x)/2],u:[1,0,0],v:[0,0,1],su:o,sv:(x-A)/2,color:F.grau,opacity:.14}],[s]),bn=I.useMemo(()=>{const S=[];for(let se=0;se<=80;se++){const nn=-o+2*o*se/80;S.push([nn,s,Math.min(Math.hypot(nn,s),x)])}const H=[];for(let se=0;se<=72;se++){const nn=2*Math.PI*se/72;H.push([Math.cos(nn),Math.sin(nn),1])}const U=[Math.abs(v)>1e-9?o/Math.abs(v):1/0,Math.abs(s)>1e-9?o/Math.abs(s):1/0,q>1e-9?x/q:q<-1e-9?A/q:1/0],y=Math.min(...U,6),ne=[[0,0,0],[y*v,y*s,y*q]];return[{pts:S,color:fn,width:2,onTop:!0},{pts:H,color:F.grau,dash:"4 3",width:1.4,onTop:!0},{pts:ne,color:Ii,dash:"5 4",width:1.6,onTop:!0}]},[v,s,q]),Ne=S=>{i(S.a),d(S.b),c(S.c)},Ve=S=>Math.abs(r-S.a)<1e-9&&Math.abs(s-S.b)<1e-9&&Math.abs(t-S.c)<1e-9;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Ziehen wir den orangen Punkt (a, c) über die Ebene und schieben wir b, bis die Bedingung ac ≥ b² kippt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Hi.map(S=>e.jsx("button",{type:"button",title:S.titel,"aria-pressed":Ve(S),className:Ve(S)?Me:pe,onClick:()=>Ne(S),children:S.name},S.name))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("div",{className:"min-w-0 grow basis-[300px]",children:[e.jsxs("svg",{width:Rn,height:Wn,viewBox:`0 0 ${Rn} ${Wn}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Schnitt des Kegels bei b = ${h(s)}: die Menge aller (a, c) mit a·c ≥ b². Die aktuelle Matrix liegt ${_?"darin":"außerhalb"}.`,...X.svgProps,children:[e.jsx("rect",{x:.5,y:.5,width:Rn-1,height:Wn-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),e.jsx("defs",{children:e.jsx("clipPath",{id:"s122-psd-clip",children:e.jsx("rect",{x:be,y:0,width:Y,height:Y})})}),l.map(S=>e.jsxs("g",{children:[e.jsx("line",{x1:be,x2:be+Y,y1:Fe(S),y2:Fe(S),stroke:S===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:S===0?1.2:.6}),e.jsx("text",{x:be-4,y:Fe(S)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(S,B)}),e.jsx("line",{y1:0,y2:Y,x1:Ee(S),x2:Ee(S),stroke:S===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:S===0?1.2:.6}),e.jsx("text",{x:Ee(S),y:Y+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(S,B)})]},`t${S}`)),e.jsxs("g",{clipPath:"url(#s122-psd-clip)",children:[e.jsx("polygon",{points:M,fill:fn,fillOpacity:.16}),e.jsx("polyline",{points:K.map(([S,H])=>`${Ee(S).toFixed(1)},${Fe(H).toFixed(1)}`).join(" "),fill:"none",stroke:fn,strokeWidth:1.8}),e.jsx(Ye,{x:Ee(r),y:Fe(t),r:5,farbe:D,aktiv:X.dragging==="A",label:"(a, c)",...X.handleProps("A")})]}),e.jsx("text",{x:be+4,y:12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"c ↑"}),e.jsx("text",{x:be+Y/2,y:Y+27,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"a →"})]}),e.jsx("p",{className:"mt-1 max-w-prose text-xs text-slate-500 dark:text-slate-400",children:"Der Schnitt des Kegels bei festem b: blau die zulässigen Paare (a, c), begrenzt von der Hyperbel c = b²/a. Für b = 0 füllt er den ganzen Viertelraum, mit wachsendem |b| zieht er sich zusammen."})]}),e.jsxs("div",{className:"shrink-0",children:[e.jsx(vi,{size:280,xDomain:[-o,o],yDomain:[-o,o],zDomain:[A,x],surface:R,points:re,curves:bn,planes:yn,dropLines:!0,labels:{x:"½(a−c)",y:"b",z:"½(a+c)"},azimuth:u.azimuth,elevation:u.elevation,onViewChange:p,ariaLabel:`Der Kegel der positiv semidefiniten 2x2-Matrizen als Kreiskegel in den gedrehten Koordinaten (a−c)/2, b und (a+c)/2; die aktuelle Matrix liegt ${_?"im Kegel":"außerhalb"}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(pi,{value:u,onChange:p})}),e.jsxs("p",{className:"mt-1 max-w-[280px] text-xs text-slate-500 dark:text-slate-400",children:["Dieselbe Menge in gedrehten Koordinaten: waagerecht ½(a−c) und b, senkrecht die halbe Spur ½(a+c). Darin ist 𝒫₂ ein Kreiskegel, denn ac ≥ b² heißt hier (a+c)/2 ≥ √(((a−c)/2)² + b²). Blau der Rand, grau gestrichelt sein Schnitt bei Spur 2, die graue Scheibe die Ebene b = ",h(s)," mit der Hyperbel der linken Tafel, grün der Halbstrahl t·A. Ziehen dreht die Ansicht."]})]}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-1 text-sm",children:[e.jsx(ie,{label:"a",value:r,onChange:S=>i(Math.round(S*20)/20),min:de,max:C,step:.05,accent:kn}),e.jsx(ie,{label:"b",value:s,onChange:S=>d(Math.round(S*20)/20),min:-ri,max:ri,step:.05,accent:kn}),e.jsx(ie,{label:"c",value:t,onChange:S=>c(Math.round(S*20)/20),min:de,max:C,step:.05,accent:kn}),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"A"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:D},children:["(",h(r)," ",h(s),"; ",h(s)," ",h(t),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Spur a + c"}),e.jsx("td",{className:"font-mono text-xs",children:h(N)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"det = ac − b²"}),e.jsx("td",{className:"font-mono text-xs",children:h(w)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Eigenwerte"}),e.jsxs("td",{className:"font-mono text-xs",style:{color:D},children:[h(m),"; ",h(f)]})]})]})})]})]}),k==="definit"?e.jsxs(W,{kind:"ok",titel:"Positiv definit.",children:["Beide Eigenwerte sind positiv, also ist xᵀAx ",">"," 0 für jedes x ≠ 0 und A erst recht semidefinit im Sinne von ",P("definition:positiv-semidefinit"),". Der Punkt liegt im Inneren des blauen Schnitts, und mit ihm der ganze Halbstrahl t·A für t ≥ 0: Alle drei Bedingungen sind homogen, Skalieren ändert an keiner etwas."]}):k==="semidefinit"?e.jsxs(W,{kind:"warn",titel:"Semidefinit, aber nicht definit: A liegt auf dem Rand.",children:["Der kleinere Eigenwert ist ",h(m)," und die Determinante ac − b² = ",h(w),". Es gibt also ein x ≠ 0 mit xᵀAx = 0, und A ist nicht invertierbar. Genau diese Matrizen fehlen der positiv definiten Menge; sie sind der Rand des Kegels und der Fall, an dem das Cholesky-Verfahren scheitert (",P("bemerkung:kovarianzmatrizen-sind-semidefinit-nicht"),")."]}):k==="indefinit"?e.jsxs(W,{kind:"fail",titel:"Indefinit: A gehört nicht zu 𝒫₂.",children:["Die Eigenwerte ",h(m)," und ",h(f)," haben verschiedene Vorzeichen, die Bedingung aus ",P("definition:positiv-semidefinit")," ist verletzt. In der linken Tafel liegt der Punkt unter der Hyperbel: ac = ",h(r*t)," ist kleiner als b² = ",h(s*s),". Der Kegel ist trotzdem konvex; ",P("satz:die-positiv-semidefiniten-matrizen")," verbietet nur, dass eine Mischung zweier semidefiniter Matrizen hier landet."]}):k==="negativ"?e.jsx(W,{kind:"fail",titel:"Negativ semidefinit: der gespiegelte Kegel.",children:"Beide Eigenwerte sind höchstens null, also ist −A semidefinit und A gehört nicht zu 𝒫₂. Im Raum rechts liegt der Punkt im gespiegelten Kegel −𝒫₂; die beiden Kegel berühren sich nur in der Nullmatrix. Eine Mischung aus einer Matrix hier und einer aus 𝒫₂ kann jeden der drei Fälle treffen, denn konvex ist nur jeder Kegel für sich."}):e.jsxs(W,{kind:"neutral",titel:"Die Nullmatrix.",children:["Alle drei Zahlen sind null. Dann ist xᵀAx = 0 für jedes x, die Bedingung aus",P("definition:positiv-semidefinit")," ist mit Gleichheit erfüllt, und A liegt in 𝒫₂, und zwar als Spitze des Kegels, in der sich alle Halbstrahlen treffen."]})]})}function si(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Mengen, die ihre Verbindungsstrecken enthalten"}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"}),` haben wir aus gegebenen Punkten neue gemacht: Konvexkombinationen
mischen endlich viele Vektoren mit nichtnegativen Gewichten, die sich zu eins addieren. Jetzt
drehen wir die Frage um. Statt zu fragen, welche Punkte aus einer Menge entstehen, fragen wir,
welche Mengen unter dieser Konstruktion schon abgeschlossen sind.`]}),`
`,e.jsx(i.p,{children:`Das klingt nach einer technischen Spielerei, ist aber die Eigenschaft, an der in der Optimierung
alles hängt. Die zulässige Menge eines Optimierungsproblems sammelt alle Punkte, die die
Nebenbedingungen erfüllen. Ist sie konvex, so darf ein Verfahren, das zwei zulässige Punkte
kennt, jeden Punkt dazwischen ausprobieren, ohne aus dem Erlaubten zu fallen. Ist sie es nicht,
kann schon der Weg zwischen zwei guten Lösungen durch verbotenes Gebiet führen.`}),`
`,e.jsxs(j,{kind:"Definition",label:"11.2.1 (Konvexe Menge)",id:"env-konvexe-menge",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"V"})," ein ",e.jsx(b,{id:"vector-space",children:"Vektorraum"}),". Eine Menge ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq V"}),` heißt
`,e.jsx(i.em,{children:"konvex"})," (convex), falls für alle ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und alle ",e.jsx(n,{children:"\\lambda \\in [0,1]"})," gilt:"]}),e.jsx(a,{children:"\\cgreen{\\lambda \\bx + (1 - \\lambda) \\by} \\in \\cblue{\\Xcal} ."})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.2.2 (Was die Bedingung verlangt)",id:"env-was-die-bedingung-verlangt",children:[e.jsxs(i.p,{children:[`Der grüne Ausdruck ist genau die Konvexkombination zweier Punkte aus
`,e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"}),". Läuft ",e.jsx(n,{children:"\\lambda"})," von ",e.jsx(n,{children:"0"})," nach ",e.jsx(n,{children:"1"}),", so wandert er von ",e.jsx(n,{children:"\\by"}),` nach
`,e.jsx(n,{children:"\\bx"}),` und durchläuft dabei die ganze Verbindungsstrecke. Konvex heißt also: Mit je zwei Punkten
liegt auch die Strecke zwischen ihnen in der Menge. Anschaulich hat eine konvexe Menge weder
Einbuchtungen noch Löcher.`]}),e.jsxs(i.p,{children:["Drei Kleinigkeiten sind der Definition anzusehen. Erstens sind die Randfälle ",e.jsx(n,{children:"\\lambda = 0"}),` und
`,e.jsx(n,{children:"\\lambda = 1"})," zugelassen; sie geben ",e.jsx(n,{children:"\\by"})," beziehungsweise ",e.jsx(n,{children:"\\bx"}),` zurück und sind damit
automatisch erfüllt. Zweitens ist die leere Menge konvex, und einelementige Mengen sind es
auch: Im ersten Fall gibt es kein Paar zu prüfen, im zweiten ist `,e.jsx(n,{children:"\\bx = \\by"}),` und die
Konvexkombination liefert wieder denselben Punkt.`]}),e.jsxs(i.p,{children:[`Drittens, und das ist beim Rechnen das Wichtigste, sind Nachweis und Widerlegung ungleich
schwer. Ein einziges Paar, dessen Strecke heraushängt, widerlegt die Konvexität. Für den
Nachweis dagegen müssen wir über `,e.jsx(i.em,{children:"alle"})," Paare und alle ",e.jsx(n,{children:"\\lambda"}),` argumentieren, und dazu brauchen
wir eine Rechnung, keine Beispiele.`]})]}),`
`,e.jsxs(we,{title:"Welche Mengen sind konvex?",children:[e.jsx(i.p,{children:`Statt hier zwei Bilder abzudrucken, eine konvexe und eine nicht konvexe Menge,
machen wir daraus einen Test. Vier Mengen stehen zur Wahl, zwei Punkte
lassen sich frei hineinziehen: Bei welchen der vier finden wir ein Paar, dessen
Verbindungsstrecke herausläuft, und wie schwer ist die Suche?`}),e.jsx(qi,{}),e.jsxs(i.p,{children:[`Die Kreisscheibe und das Dreieck geben nicht nach, so oft wir es auch versuchen. Beim Kreisring
und bei der Parabelunterseite finden wir dagegen schnell ein Paar, dessen Strecke hinausläuft.
Der vorbereitete Knopf setzt beim Ring die Punkte `,e.jsx(n,{children:"(1{,}1;\\ 0)^\\top"})," und ",e.jsx(n,{children:"(0;\\ 1{,}1)^\\top"}),`;
ihr Mittelpunkt hat die Norm `,e.jsx(n,{children:"1{,}1/\\sqrt2 \\approx 0{,}778"}),` und unterschreitet damit den
Innenradius `,e.jsx(n,{children:"0{,}8"}),`. Bei der Parabel verlässt die Strecke die Menge sogar auf ganzer Länge.
Kreisscheibe und Parabelmenge kommen gleich im Selbsttest wieder vor, dort mit Rechnung statt
mit Mausklicks; der Ring vertritt dort die Einheitssphäre, die als Kurve ohne Dicke nicht
anklickbar wäre.`]})]}),`
`,e.jsx(i.p,{children:`Die Definition spricht nur über zwei Punkte. Gemeint ist aber mehr, und der folgende Satz holt
es nach. Wir brauchen ihn, sobald wir über die konvexe Hülle
argumentieren.`}),`
`,e.jsxs(j,{kind:"Satz",label:"11.2.3 (Konvexe Mengen enthalten alle Konvexkombinationen)",id:"env-konvexe-mengen-enthalten-alle",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq V"})," konvex, seien ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_N \\in \\cblue{\\Xcal}"}),` und
`,e.jsx(n,{children:"w_1, \\dots, w_N \\ge 0"})," mit ",e.jsx(n,{children:"\\sum_{i=1}^N w_i = 1"}),". Dann gilt"]}),e.jsx(a,{children:"\\cgreen{\\sum_{i=1}^N w_i \\bx_i} \\in \\cblue{\\Xcal} ."})]}),`
`,e.jsx(L,{title:"Beweis per Induktion über die Zahl der Punkte",children:e.jsxs(Z,{children:[e.jsx(z,{why:e.jsxs(e.Fragment,{children:["die Nebenbedingung ",e.jsx(n,{children:"\\sum_i w_i = 1"})," macht aus zwei Gewichten gerade das Paar ",e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1 - \\lambda"})]}),children:e.jsxs(i.p,{children:["Induktion über ",e.jsx(n,{children:"N"}),". Für ",e.jsx(n,{children:"N = 1"})," ist ",e.jsx(n,{children:"w_1 = 1"})," und die Summe gleich ",e.jsx(n,{children:"\\bx_1 \\in \\cblue{\\Xcal}"}),`.
Für `,e.jsx(n,{children:"N = 2"})," ist ",e.jsx(n,{children:"w_2 = 1 - w_1"}),", und die Behauptung ist wörtlich ",e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"}),"."]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die Gewichte sind nichtnegativ und addieren sich zu eins, also ist ",e.jsx(n,{children:"s = 1 - w_{N+1}"})," und ",e.jsx(n,{children:"s > 0"})," genau dann, wenn ",e.jsx(n,{children:"w_{N+1} < 1"})]}),children:[e.jsxs(i.p,{children:["Sei die Aussage für ",e.jsx(n,{children:"N"})," Punkte bewiesen, und seien ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_{N+1}"}),` und Gewichte
`,e.jsx(n,{children:"w_1, \\dots, w_{N+1}"})," wie im Satz gegeben. Ist ",e.jsx(n,{children:"w_{N+1} = 1"}),`, so sind alle übrigen Gewichte
null und die Summe ist `,e.jsx(n,{children:"\\bx_{N+1} \\in \\cblue{\\Xcal}"}),". Sei also ",e.jsx(n,{children:"w_{N+1} < 1"})," und"]}),e.jsx(a,{children:"s := \\sum_{i=1}^{N} w_i = 1 - w_{N+1} > 0 ."})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"})," mit ",e.jsx(n,{children:"\\lambda = s"}),"; der Trick ist das Normieren der ersten ",e.jsx(n,{children:"N"})," Gewichte, das aus einer ",e.jsx(n,{children:"(N+1)"}),"-Kombination eine Zweierkombination von etwas schon Bekanntem macht"]}),children:[e.jsxs(i.p,{children:["Wir teilen die ersten ",e.jsx(n,{children:"N"})," Gewichte durch ",e.jsx(n,{children:"s"}),". Die Zahlen ",e.jsx(n,{children:"w_i/s"}),` sind nichtnegativ und addieren
sich zu `,e.jsx(n,{children:"1"}),", also ist"]}),e.jsx(a,{children:"\\bu := \\cgreen{\\sum_{i=1}^{N} \\frac{w_i}{s}\\, \\bx_i} \\in \\cblue{\\Xcal}"}),e.jsxs(i.p,{children:["nach Induktionsvoraussetzung. Damit lässt sich die volle Summe als Konvexkombination ",e.jsx(i.em,{children:"zweier"}),`
Punkte schreiben:`]}),e.jsx(a,{children:`\\cgreen{\\sum_{i=1}^{N+1} w_i \\bx_i}
= s\\,\\bu + (1 - s)\\,\\bx_{N+1}
\\in \\cblue{\\Xcal} ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"s \\in (0, 1)"})," und ",e.jsx(n,{children:"\\bu, \\bx_{N+1} \\in \\cblue{\\Xcal}"}),"."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["der Satz liefert ",e.jsx(n,{children:"\\conv(\\Xcal) \\subseteq \\Xcal"}),", die Einerkombination die umgekehrte Inklusion; die Definition der konvexen Hülle steht in ",e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"})]}),children:[e.jsxs(i.p,{children:["Zusammen mit ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\conv(\\cblue{\\Xcal})"}),`, was man an der Einerkombination
`,e.jsx(n,{children:"w_1 = 1"})," abliest, folgt für konvexe Mengen"]}),e.jsx(a,{children:"\\conv(\\cblue{\\Xcal}) = \\cblue{\\Xcal} ."}),e.jsx(i.p,{children:"Eine Menge ist also genau dann konvex, wenn sie mit ihrer konvexen Hülle übereinstimmt."})]})]})}),`
`,e.jsx(i.h3,{children:"Fünf Mengen im Selbsttest"}),`
`,e.jsx(i.p,{children:"Fünf Mengen stehen zur Wahl. Rechnen wir sie einzeln durch."}),`
`,e.jsxs(en,{children:[e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Die leere Menge ",e.jsx(n,{children:"\\emptyset"})," ist konvex."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"})," fordert etwas über alle Paare ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"}),`. In der leeren
Menge gibt es kein solches Paar, also ist nichts zu prüfen und die Bedingung leer erfüllt. Mit
demselben Argument ist jede einelementige Menge konvex, denn dort ist `,e.jsx(n,{children:"\\bx = \\by"}),` und
`,e.jsx(n,{children:"\\lambda\\bx + (1-\\lambda)\\bx = \\bx"}),"."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein Vektorraum ",e.jsx(n,{children:"V"})," ist, als Teilmenge seiner selbst gelesen, konvex."]}),e.jsxs(i.p,{children:[`Ein Vektorraum ist gegen Linearkombinationen abgeschlossen, und
`,e.jsx(n,{children:"\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),` ist eine solche. Dasselbe gilt für jeden
`,e.jsx(b,{id:"subspace",children:"Untervektorraum"}),` und für affine Teilräume. Konvexe Mengen sind damit eine echte
Verallgemeinerung: Sie verlangen die Abgeschlossenheit nur für Gewichte, die nichtnegativ sind
und sich zu eins addieren.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Einheitssphäre ",e.jsx(n,{children:"\\{\\bx \\in V\\colon \\left\\|\\bx\\right\\| = 1\\}"})," ist konvex."]}),e.jsxs(i.p,{children:["Sie ist es nicht. Ein Gegenbeispiel lebt im ",e.jsx(n,{children:"\\R^2"}),`: Für
`,e.jsx(n,{children:"\\cred{\\bx} = (1, 0)^\\top"})," und ",e.jsx(n,{children:"\\cred{\\by} = (0, 1)^\\top"})," ist ",e.jsx(n,{children:"\\left\\|\\bx\\right\\| = \\left\\|\\by\\right\\| = 1"}),`,
aber der Mittelpunkt `,e.jsx(n,{children:"\\lambda = \\tfrac12"})," liefert"]}),e.jsx(a,{children:`\\cred{\\tfrac12 \\bx + \\tfrac12 \\by} = (0{,}5;\\ 0{,}5)^\\top ,
\\qquad
\\left\\|(0{,}5;\\ 0{,}5)^\\top\\right\\| = \\sqrt{0{,}25 + 0{,}25} = \\tfrac{1}{\\sqrt 2} \\approx 0{,}7071 \\neq 1 .`}),e.jsxs(i.p,{children:["Kürzer und ohne Koordinaten geht es auch: Sobald ",e.jsx(n,{children:"V \\neq \\{\\bnull\\}"})," ist, gibt es ein ",e.jsx(n,{children:"\\bx"}),` mit
`,e.jsx(n,{children:"\\left\\|\\bx\\right\\| = 1"}),", und dann liegt auch ",e.jsx(n,{children:"-\\bx"}),` auf der Sphäre. Deren Mittelpunkt ist
`,e.jsx(n,{children:"\\bnull"})," mit Norm ",e.jsx(n,{children:"0"}),". Der Sphäre fehlt genau das Innere, das den Ball konvex macht."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Der geschlossene Ball ",e.jsx(n,{children:"\\{\\bx \\in V\\colon \\left\\|\\bx\\right\\| \\le r\\}"})," ist konvex."]}),e.jsxs(i.p,{children:["Das ist die ",e.jsx(b,{id:"triangle-inequality",children:"Dreiecksungleichung"}),` plus absolute Homogenität der
`,e.jsx(b,{id:"norm",children:"Norm"}),". Für ",e.jsx(n,{children:"\\lambda \\in [0,1]"})," sind ",e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1-\\lambda"})," nichtnegativ, also"]}),e.jsx(a,{children:`\\left\\|\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right\\|
\\le \\lambda\\left\\|\\bx\\right\\| + (1-\\lambda)\\left\\|\\by\\right\\|
\\le \\lambda r + (1-\\lambda) r = r .`}),e.jsxs(i.p,{children:[`Bemerkenswert daran ist, dass nirgends eine bestimmte Norm gebraucht wird: Kugeln bezüglich
jeder Norm sind konvex, auch die Würfel und Rauten der `,e.jsx(n,{children:"\\infty"}),"- und ",e.jsx(n,{children:"1"}),`-Norm aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),"."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Menge ",e.jsx(n,{children:"\\{(x, y) \\in \\R^2\\colon y \\le x^2\\}"})," ist konvex."]}),e.jsxs(i.p,{children:["Sie ist es nicht, denn sie liegt ",e.jsx(i.em,{children:"unter"}),` einer nach oben geöffneten Parabel. Die Punkte
`,e.jsx(n,{children:"\\cred{(-1, 1)}"})," und ",e.jsx(n,{children:"\\cred{(1, 1)}"})," gehören dazu, denn ",e.jsx(n,{children:"1 \\le (\\pm 1)^2 = 1"}),`. Ihr Mittelpunkt
ist `,e.jsx(n,{children:"\\cred{(0, 1)}"}),", und dort scheitert die Bedingung: ",e.jsx(n,{children:"1 \\le 0^2 = 0"}),` ist falsch. Die Strecke
verlässt die Menge sogar für jedes `,e.jsx(n,{children:"\\lambda"})," zwischen ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"1"}),", wie das Widget vorführt."]}),e.jsxs(i.p,{children:["Konvex wäre die Menge oberhalb der Parabel, ",e.jsx(n,{children:"\\{(x,y)\\colon y \\ge x^2\\}"}),`. Diese Umkehrung ist
kein Zufall, sie hängt daran, dass `,e.jsx(n,{children:"x \\mapsto x^2"}),` eine konvexe Funktion ist, und wir kommen in
`,e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"})," darauf zurück."]})]}),e.jsxs(on,{loesung:.38,toleranz:.01,children:[e.jsxs(i.p,{children:[`Setzen wir im Widget oben den Kreisring und drücken auf „Gegenbeispiel setzen". Ab welchem
`,e.jsx(n,{children:"\\lambda"})," verlässt die Strecke die Menge?"]}),e.jsxs(i.p,{children:["Ab ",e.jsx(n,{children:"\\lambda \\approx 0{,}380"}),", und sie kehrt bei ",e.jsx(n,{children:"0{,}620"}),` zurück; dazwischen liegt sie im Loch.
Der Mittelpunkt `,e.jsx(n,{children:"\\lambda = \\tfrac12"})," hat die Norm ",e.jsx(n,{children:"1{,}1/\\sqrt2 \\approx 0{,}778"}),` und
unterschreitet den Innenradius `,e.jsx(n,{children:"0{,}8"}),` am deutlichsten. Das Widget schärft diese Grenzen per
Bisektion nach; für die Widerlegung genügt ohnehin ein einziges `,e.jsx(n,{children:"\\lambda"}),"."]})]})]}),`
`,e.jsx(i.h3,{children:"Weitere Beispiele"}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.2.4 (Offener Ball)",id:"env-offener-ball",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"r>0"}),` ist der offene Ball
`,e.jsx(n,{children:"\\cblue{\\Xcal} = \\{\\bx \\in V\\colon \\left\\|\\bx\\right\\| < r\\}"}),` ebenfalls
konvex. Sei `,e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Mindestens eines der beiden Gewichte ",e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1-\\lambda"}),`
ist echt positiv, und schon deshalb wird die Abschätzung aus dem Selbsttest strikt:`]}),e.jsx(a,{children:`\\left\\|\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right\\|
\\le \\lambda\\left\\|\\bx\\right\\| + (1-\\lambda)\\left\\|\\by\\right\\|
< \\lambda r + (1-\\lambda) r = r .`}),e.jsxs(i.p,{children:["Der strikte Schritt kommt dabei immer von einem der beiden Summanden: Für ",e.jsx(n,{children:"\\lambda = 0"}),` trägt
ihn der zweite, sonst der erste. Eine Fallunterscheidung brauchen wir deshalb nicht.`]})]}),`
`,e.jsxs(i.p,{children:[`Der nächste Begriff beschreibt die Ecken einer konvexen Menge. In
`,e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"}),` sind Extrempunkte über die Gewichte eingeführt worden, als Punkte
also, die sich nur mit einem einzigen `,e.jsx(n,{children:"w_i = 1"}),` erreichen lassen. Hier brauchen wir die
allgemeine Fassung, denn die folgenden Sätze sprechen über konvexe Mengen, die niemand als
Hülle einer Punktwolke gegeben hat.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.2.5 (Extrempunkt)",id:"env-konvexe-mengen-extrempunkt",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Kcal} \\subseteq V"})," konvex. Ein Punkt ",e.jsx(n,{children:"\\corange{\\bz} \\in \\cblue{\\Kcal}"}),` heißt
`,e.jsx(i.em,{children:"Extrempunkt"})," (extreme point) von ",e.jsx(n,{children:"\\cblue{\\Kcal}"}),", falls aus"]}),e.jsx(a,{children:`\\corange{\\bz} = \\cgreen{\\lambda \\bu + (1-\\lambda)\\bw}
\\qquad \\text{mit} \\qquad
\\bu, \\bw \\in \\cblue{\\Kcal}, \\ \\lambda \\in (0,1)`}),e.jsxs(i.p,{children:["stets ",e.jsx(n,{children:"\\bu = \\bw = \\corange{\\bz}"})," folgt."]})]}),`
`,e.jsxs(L,{title:"Warum beide Fassungen dieselben Punkte auswählen",children:[e.jsxs(i.p,{children:["Für endliches ",e.jsx(n,{children:"\\Xcal"})," und ",e.jsx(n,{children:"\\cblue{\\Kcal} = \\conv(\\Xcal)"}),` stimmt
`,e.jsx(i.a,{href:"#env-konvexe-mengen-extrempunkt",children:"Definition 11.2.5"})," mit ",e.jsx(i.a,{href:"#env-konvexkombinationen-extrempunkt",children:"Definition 11.1.7"}),` überein.
Sei zunächst `,e.jsx(n,{children:"\\corange{\\bz} \\in \\Xcal"}),` nur trivial darstellbar, und sei
`,e.jsx(n,{children:"\\corange{\\bz} = \\lambda\\bu + (1-\\lambda)\\bw"})," mit ",e.jsx(n,{children:"\\bu, \\bw \\in \\cblue{\\Kcal}"}),` und
`,e.jsx(n,{children:"\\lambda \\in (0,1)"}),". Setzen wir für ",e.jsx(n,{children:"\\bu"})," und ",e.jsx(n,{children:"\\bw"}),` ihre Darstellungen als
Konvexkombinationen von Punkten aus `,e.jsx(n,{children:"\\Xcal"}),` ein und sortieren um, so steht rechts wieder eine
Konvexkombination von Punkten aus `,e.jsx(n,{children:"\\Xcal"}),`. Sie muss also die triviale sein, und daraus folgt
`,e.jsx(n,{children:"\\bu = \\bw = \\corange{\\bz}"}),"."]}),e.jsxs(i.p,{children:["Umgekehrt lösen wir eine nichttriviale Darstellung nach ",e.jsx(n,{children:"\\corange{\\bz}"}),` auf und erhalten
`,e.jsx(n,{children:"\\corange{\\bz}"})," als Konvexkombination der ",e.jsx(i.em,{children:"übrigen"}),` Punkte. Mindestens zwei von ihnen tragen
positives Gewicht, denn ein einzelner Punkt mit Gewicht `,e.jsx(n,{children:"1"})," wäre ",e.jsx(n,{children:"\\corange{\\bz}"}),` selbst, und
der kommt unter den übrigen nicht vor. Spalten wir einen davon ab, so liegt `,e.jsx(n,{children:"\\corange{\\bz}"}),`
im Inneren einer Strecke innerhalb von `,e.jsx(n,{children:"\\cblue{\\Kcal}"}),`. Dasselbe Argument zeigt nebenbei,
dass Punkte aus `,e.jsx(n,{children:"\\cblue{\\Kcal} \\setminus \\Xcal"})," von vornherein ausscheiden."]})]}),`
`,e.jsxs(i.p,{children:[`Ein Extrempunkt liegt also auf keiner Strecke, die ganz in der Menge verläuft und ihn im Inneren
trifft. Der offene Ball aus `,e.jsx(i.a,{href:"#env-offener-ball",children:"Beispiel 11.2.4"}),` hat deshalb gar keinen Extrempunkt: Jeder seiner
Punkte ist Mittelpunkt zweier anderer Punkte des Balls. Beim geschlossenen `,e.jsx(i.em,{children:"euklidischen"}),` Ball
dagegen ist jeder Randpunkt extrem. Auf die Norm kommt es dabei an: Der Einheitsball der
`,e.jsx(n,{children:"\\infty"}),"-Norm im ",e.jsx(n,{children:"\\R^2"})," ist das Quadrat ",e.jsx(n,{children:"[-1,1]^2"}),", und dessen Randpunkt ",e.jsx(n,{children:"(1, 0)^\\top"}),` ist der
Mittelpunkt von `,e.jsx(n,{children:"(1, -\\tfrac12)^\\top"})," und ",e.jsx(n,{children:"(1, \\tfrac12)^\\top"}),`, die beide dazugehören. Extrem
sind dort nur die vier Ecken.`]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.2.6 (Der Simplex)",id:"env-der-simplex",children:[e.jsxs(i.p,{children:["Der ",e.jsx(i.em,{children:"Simplex"})]}),e.jsx(a,{children:"\\cblue{\\Delta^N} = \\left\\{\\bx \\in \\R^N\\colon x_i \\ge 0 \\text{ für alle } i, \\ \\sum_{i=1}^N x_i = 1\\right\\}"}),e.jsxs(i.p,{children:["ist konvex. Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Delta^N}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`. Die Komponenten von
`,e.jsx(n,{children:"\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),` sind als Summe nichtnegativer Zahlen wieder
nichtnegativ, und für die Gesamtsumme gilt`]}),e.jsx(a,{children:`\\sum_{i=1}^N \\left(\\lambda x_i + (1-\\lambda) y_i\\right)
= \\lambda \\sum_{i=1}^N x_i + (1-\\lambda)\\sum_{i=1}^N y_i
= \\lambda \\cdot 1 + (1-\\lambda)\\cdot 1 = 1 .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Extrempunkte."})," Die Extrempunkte von ",e.jsx(n,{children:"\\cblue{\\Delta^N}"}),` sind genau die Standard-Basisvektoren
`,e.jsx(n,{children:"\\corange{\\be_1}, \\dots, \\corange{\\be_N}"}),". Dass ",e.jsx(n,{children:"\\corange{\\be_1}"}),` extrem ist, sieht man so: Gilt
`,e.jsx(n,{children:"\\corange{\\be_1} = \\lambda\\bu + (1-\\lambda)\\bw"})," mit ",e.jsx(n,{children:"\\bu, \\bw \\in \\cblue{\\Delta^N}"}),` und
`,e.jsx(n,{children:"\\lambda \\in (0,1)"}),", so ist für jedes ",e.jsx(n,{children:"i \\ge 2"})," die Zahl ",e.jsx(n,{children:"\\lambda u_i + (1-\\lambda) w_i = 0"}),` eine
Summe zweier nichtnegativer Terme mit positiven Vorfaktoren, also `,e.jsx(n,{children:"u_i = w_i = 0"}),`; weil sich die
Komponenten zu eins addieren, bleibt `,e.jsx(n,{children:"u_1 = w_1 = 1"}),". Für die übrigen ",e.jsx(n,{children:"\\corange{\\be_i}"}),` läuft
das Argument genauso, und umgekehrt ist jeder Punkt mit zwei positiven Komponenten
`,e.jsx(n,{children:"x_j, x_k > 0"}),", ",e.jsx(n,{children:"j \\neq k"}),", der Mittelpunkt von ",e.jsx(n,{children:"\\bx \\pm \\varepsilon(\\be_j - \\be_k)"}),` und
deshalb nicht extrem.
Dass die Ecken den Simplex auch aufspannen, sieht man ohne Umweg: Jedes `,e.jsx(n,{children:"\\bx \\in \\cblue{\\Delta^N}"}),`
ist `,e.jsx(n,{children:"\\bx = \\sum_{i=1}^N x_i \\corange{\\be_i}"}),", und die ",e.jsx(n,{children:"x_i"}),` sind gerade nichtnegative Gewichte
mit Summe eins. Also ist `,e.jsx(n,{children:"\\cblue{\\Delta^N} = \\conv\\{\\corange{\\be_1}, \\dots, \\corange{\\be_N}\\}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Geometrie."})," ",e.jsx(n,{children:"\\cblue{\\Delta^2}"})," ist die Strecke von ",e.jsx(n,{children:"(1,0)^\\top"})," nach ",e.jsx(n,{children:"(0,1)^\\top"}),`,
`,e.jsx(n,{children:"\\cblue{\\Delta^3}"})," das Dreieck mit den Ecken ",e.jsx(n,{children:"\\corange{\\be_1}, \\corange{\\be_2}, \\corange{\\be_3}"}),`
im `,e.jsx(n,{children:"\\R^3"}),", ",e.jsx(n,{children:"\\cblue{\\Delta^4}"}),` ein Tetraeder. Der Simplex ist außerdem
`,e.jsx(b,{id:"closed-bounded-set",children:"abgeschlossen und beschränkt"}),`, denn er ist durch Gleichungen und
nichtstrikte Ungleichungen beschrieben und erfüllt `,e.jsx(n,{children:"\\left\\|\\bx\\right\\|_1 = 1"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum das in der Statistik zählt."})," Ein Punkt von ",e.jsx(n,{children:"\\cblue{\\Delta^N}"}),` ist nichts anderes als eine
Wahrscheinlichkeitsverteilung über `,e.jsx(n,{children:"N"})," Ereignisse. Der Vektor ",e.jsx(n,{children:"\\bp = (0{,}2;\\ 0{,}5;\\ 0{,}3)^\\top"}),`
beschreibt eine kategoriale Verteilung mit drei Kategorien, und die Extrempunkte
`,e.jsx(n,{children:"\\corange{\\be_i}"}),` sind die entarteten Verteilungen, die ihre ganze Masse auf eine Kategorie
legen. Modelle, die Verteilungen vorhersagen, müssen deshalb in den Simplex hinein abbilden.
Die übliche Wahl ist die Softmax-Abbildung`]}),e.jsx(a,{children:"\\softmax(\\bz)_i = \\frac{\\exp(z_i)}{\\sum_{j=1}^N \\exp(z_j)} ,"}),e.jsxs(i.p,{children:[`deren Werte nichtnegativ sind und sich nach Konstruktion zu eins addieren. Für
`,e.jsx(n,{children:"\\bz = (1;\\ 2;\\ 0{,}5)^\\top"})," etwa liefert sie ",e.jsx(n,{children:"(0{,}231;\\ 0{,}629;\\ 0{,}140)^\\top"}),`. Alle
Komponenten sind echt positiv, die Ecken werden also nie erreicht, sondern nur im Grenzwert
angesteuert. Dieselbe Menge trägt die multinomiale Regression und die Dirichlet-Verteilung, die
Verteilungen über `,e.jsx(n,{children:"\\cblue{\\Delta^N}"})," beschreibt."]})]}),`
`,e.jsx(i.h3,{children:"Der Kegel der positiv semidefiniten Matrizen"}),`
`,e.jsxs(i.p,{children:["Das dritte Beispiel lebt nicht im ",e.jsx(n,{children:"\\R^n"}),`, sondern in einem Raum von Matrizen. Das ist
kein Sonderfall, denn die `,e.jsx(n,{children:"n \\times n"}),`-Matrizen bilden mit der üblichen Addition und
Skalarmultiplikation selbst einen `,e.jsx(b,{id:"vector-space",children:"Vektorraum"}),", und ",e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"}),` fragt
nach nichts anderem.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.2.7 (Positiv semidefinit)",id:"env-positiv-semidefinit",children:[e.jsxs(i.p,{children:["Eine ",e.jsx(b,{id:"symmetric-matrix",children:"symmetrische"})," Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` heißt
`,e.jsx(i.em,{children:"positiv semidefinit"})," (PSD), falls"]}),e.jsx(a,{children:"\\bx^\\top \\bA \\bx \\ge 0 \\qquad \\text{für alle } \\bx \\in \\R^n ."}),e.jsxs(i.p,{children:["Wir schreiben dafür ",e.jsx(n,{children:"\\bA \\succeq 0"})," und sammeln alle diese Matrizen in"]}),e.jsx(a,{children:"\\cblue{\\Pcal_n} := \\left\\{\\bA \\in \\R^{n \\times n}\\colon \\bA = \\bA^\\top, \\ \\bx^\\top\\bA\\bx \\ge 0 \\ \\ \\forall\\, \\bx \\in \\R^n \\right\\} ."})]}),`
`,e.jsxs(i.p,{children:[`Die Symmetrie ist dabei keine Nebensache. Die
`,e.jsx(b,{id:"quadratic-form",children:"quadratische Form"})," ",e.jsx(n,{children:"\\bx^\\top\\bA\\bx"})," sieht von ",e.jsx(n,{children:"\\bA"}),` nur den symmetrischen
Anteil `,e.jsx(n,{children:"(\\bA + \\bA^\\top)/2"}),`, denn der schiefsymmetrische Teil liefert stets null; ohne
Symmetrie wäre `,e.jsx(n,{children:"\\bA \\succeq 0"})," also gar keine Eigenschaft von ",e.jsx(n,{children:"\\bA"}),` allein. Vor allem hängen
die Aussagen, für die wir Semidefinitheit brauchen, an ihr: Nur für symmetrische Matrizen gibt
der `,e.jsx(b,{id:"spectral-theorem",children:"Spektralsatz"}),` die Äquivalenz zu „alle
`,e.jsx(b,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` sind nichtnegativ" her, und nur dort greift das
Cholesky-Verfahren aus `,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),"."]}),`
`,e.jsx(j,{kind:"Satz",label:"11.2.8 (Die positiv semidefiniten Matrizen bilden eine konvexe Menge)",id:"env-die-positiv-semidefiniten-matrizen",children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\Pcal_n}"})," ist konvex."]})}),`
`,e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsx(e.Fragment,{children:"Transponieren ist linear, und beide Summanden sind nach Voraussetzung symmetrisch"}),children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bA_1, \\bA_2 \\in \\cblue{\\Pcal_n}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`. Wir setzen
`,e.jsx(n,{children:"\\bA_\\lambda := \\cgreen{\\lambda\\bA_1 + (1-\\lambda)\\bA_2}"})," und prüfen zuerst die Symmetrie:"]}),e.jsx(a,{children:"\\bA_\\lambda^\\top = \\lambda\\bA_1^\\top + (1-\\lambda)\\bA_2^\\top = \\lambda\\bA_1 + (1-\\lambda)\\bA_2 = \\bA_\\lambda ."})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die mittlere Zeile nutzt nur, dass das Matrix-Vektor-Produkt in der Matrix linear ist; die Abschätzung nutzt ",e.jsx(n,{children:"\\bA_1, \\bA_2 \\succeq 0"})," und ",e.jsx(n,{children:"\\lambda, 1-\\lambda \\ge 0"})]}),children:[e.jsxs(i.p,{children:["Sei nun ",e.jsx(n,{children:"\\bx \\in \\R^n"})," beliebig. Dann ist"]}),e.jsx(a,{children:`\\begin{aligned}
\\bx^\\top \\bA_\\lambda \\bx
&= \\bx^\\top\\left[\\lambda\\bA_1 + (1-\\lambda)\\bA_2\\right]\\bx \\\\
&= \\lambda\\, \\bx^\\top\\bA_1\\bx + (1-\\lambda)\\, \\bx^\\top\\bA_2\\bx \\\\
&\\ge \\lambda \\cdot 0 + (1-\\lambda)\\cdot 0 = 0 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Damit ist ",e.jsx(n,{children:"\\bA_\\lambda \\in \\cblue{\\Pcal_n}"}),"."]})]})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.2.9 (Kovarianzmatrizen sind semidefinit, nicht immer definit)",id:"env-kovarianzmatrizen-sind-semidefinit-nicht",children:[e.jsxs(i.p,{children:[`Als Anwendung liest man häufig, Kovarianzmatrizen seien SPD, also symmetrisch und positiv
`,e.jsx(i.em,{children:"definit"}),`, und bildeten deshalb eine konvexe Menge. Die Konvexität stimmt, die Begründung
greift zu hoch.`]}),e.jsxs(i.p,{children:["Richtig ist: Kovarianzmatrizen sind stets symmetrisch und positiv ",e.jsx(i.em,{children:"semi"}),`definit. Für einen
Zufallsvektor `,e.jsx(n,{children:"\\bX"})," mit ",e.jsx(b,{id:"covariance-matrix",children:"Kovarianzmatrix"})," ",e.jsx(n,{children:"\\bSigma"}),` und beliebiges
`,e.jsx(n,{children:"\\ba \\in \\R^n"})," gilt"]}),e.jsx(a,{children:"\\ba^\\top \\bSigma \\ba = \\var\\left(\\ba^\\top \\bX\\right) \\ge 0 ,"}),e.jsxs(i.p,{children:["und eine Varianz ist nie negativ. Positiv definit ist ",e.jsx(n,{children:"\\bSigma"}),` dagegen nur, wenn es keine
lineare Degeneration gibt, wenn also kein `,e.jsx(n,{children:"\\ba \\neq \\bnull"}),` existiert, für das
`,e.jsx(n,{children:"\\ba^\\top\\bX"}),` fast sicher konstant ist. Ein Gegenbeispiel ist schnell gebaut: Für
`,e.jsx(n,{children:"\\bX = (Z, Z)^\\top"})," mit ",e.jsx(n,{children:"\\var(Z) = 1"})," ist"]}),e.jsx(a,{children:`\\cred{\\bSigma} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix} ,
\\qquad
\\ba = (1, -1)^\\top ,
\\qquad
\\ba^\\top\\cred{\\bSigma}\\ba = 0 ,`}),e.jsxs(i.p,{children:["und die Eigenwerte sind ",e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"0"}),`. In der Praxis passiert genau das, sobald zwei Merkmale
exakt linear zusammenhängen oder eine empirische Kovarianzmatrix aus zu wenigen Beobachtungen
geschätzt wird. Das ist kein Haarspalten: Das Cholesky-Verfahren aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),` verlangt positive Definitheit und scheitert im degenerierten
Fall.`]}),e.jsxs(i.p,{children:["Die konvexe Menge, die hier gemeint ist, ist also ",e.jsx(n,{children:"\\cblue{\\Pcal_n}"}),`, der Kegel der
semidefiniten Matrizen. Die positiv definiten Matrizen bilden übrigens ebenfalls eine konvexe
Menge, mit demselben Beweis und strikten Ungleichungen; sie ist das Innere von
`,e.jsx(n,{children:"\\cblue{\\Pcal_n}"})," ",e.jsx(i.em,{children:"innerhalb des Raums der symmetrischen Matrizen"}),`. Im vollen
`,e.jsx(n,{children:"\\R^{n \\times n}"})," hätte ",e.jsx(n,{children:"\\cblue{\\Pcal_n}"}),` dagegen gar kein Inneres, denn die Forderung
`,e.jsx(n,{children:"\\bA = \\bA^\\top"})," sperrt sie in einen echten Untervektorraum."]})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = 2"})," lässt sich ",e.jsx(n,{children:"\\cblue{\\Pcal_2}"}),` vollständig hinzeichnen, denn eine symmetrische
`,e.jsx(n,{children:"2 \\times 2"}),"-Matrix besteht aus nur drei Zahlen: ",e.jsx(n,{children:"a"}),", ",e.jsx(n,{children:"b"})," und ",e.jsx(n,{children:"c"}),` in
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} a & b \\\\ b & c\\end{smallmatrix}\\bigr)"}),`. Wie sieht die Menge
der semidefiniten unter ihnen aus, und woran erkennen wir ihren Rand?`]}),`
`,e.jsxs(we,{title:"Der Kegel zum Anfassen",children:[e.jsxs(i.p,{children:["Die Bedingung aus ",e.jsx(i.a,{href:"#env-positiv-semidefinit",children:"Definition 11.2.7"})," lässt sich für ",e.jsx(n,{children:"n = 2"}),` in drei Ungleichungen übersetzen:
`,e.jsx(n,{children:"a \\ge 0"}),", ",e.jsx(n,{children:"c \\ge 0"})," und ",e.jsx(n,{children:"ac \\ge b^2"}),". Die linke Tafel zeigt davon den Schnitt bei festem ",e.jsx(n,{children:"b"}),`,
die rechte die ganze Menge im Raum der drei Zahlen.`]}),e.jsx(Ui,{}),e.jsxs(i.p,{children:["Wie das Widget zeigt, ist ",e.jsx(n,{children:"\\cblue{\\Pcal_2}"}),` ein Kegel mit gekrümmtem Rand. Kegel heißt: Mit
`,e.jsx(n,{children:"\\bA"})," gehört der ganze Halbstrahl ",e.jsx(n,{children:"t\\bA"}),", ",e.jsx(n,{children:"t \\ge 0"}),`, dazu, denn alle drei Bedingungen sind
homogen. Der Rand `,e.jsx(n,{children:"ac = b^2"})," besteht genau aus den semidefiniten Matrizen mit Determinante ",e.jsx(n,{children:"0"}),`,
also denen vom Rang `,e.jsx(n,{children:"1"})," oder ",e.jsx(n,{children:"0"}),`; dort ist der kleinere Eigenwert gerade null. Innen liegen die
positiv definiten Matrizen, außen die indefiniten und die negativ semidefiniten. Die drei
Voreinstellungen mit Spur `,e.jsx(n,{children:"2"}),` machen den Unterschied an Zahlen fest: Die Einheitsmatrix hat die
Eigenwerte `,e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"1"}),", die Rang-",e.jsx(n,{children:"1"}),"-Matrix mit ",e.jsx(n,{children:"b = 1"})," die Eigenwerte ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"2"}),`, und mit
`,e.jsx(n,{children:"b = 2"})," kippt es auf ",e.jsx(n,{children:"-1"})," und ",e.jsx(n,{children:"3"}),". ",e.jsx(i.a,{href:"#env-die-positiv-semidefiniten-matrizen",children:"Satz 11.2.8"}),` ist im Bild die Aussage, dass die Strecke zwischen zwei Punkten des Kegels nie
unter die gekrümmte Randfläche taucht.`]}),e.jsxs(i.p,{children:[`Nebenbei fällt eine hübsche Beobachtung ab: Schneiden wir den Kegel mit der Ebene
`,e.jsx(n,{children:"a + c = 2"}),`, so entsteht genau die Einheitskreisscheibe
`,e.jsx(n,{children:"\\left(\\tfrac{a-c}{2}\\right)^2 + b^2 \\le 1"}),". Alle Matrizen mit Spur ",e.jsx(n,{children:"2"}),`, die im Kegel liegen,
sind also so angeordnet wie die Punkte einer Kreisscheibe.`]})]}),`
`,e.jsxs(en,{children:[e.jsxs(on,{loesung:0,toleranz:.001,children:[e.jsxs(i.p,{children:["Stellen wir im Kegel-Widget ",e.jsx(n,{children:"a = c = 1"})," und ",e.jsx(n,{children:"b = 1"}),` ein. Wie groß ist der kleinere Eigenwert
von `,e.jsx(n,{children:"\\bA"}),"?"]}),e.jsxs(i.p,{children:["Null. Für ",e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 1 & 1 \\\\ 1 & 1\\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"\\det \\bA = 1 \\cdot 1 - 1^2 = 0"}),", die Eigenwerte sind ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"2"}),`. Die Matrix ist semidefinit,
aber nicht definit, und liegt deshalb auf dem Rand des Kegels. Genau diese Matrix taucht in
`,e.jsx(i.a,{href:"#env-kovarianzmatrizen-sind-semidefinit-nicht",children:"Bemerkung 11.2.9"})," als Kovarianzmatrix von ",e.jsx(n,{children:"(Z, Z)^\\top"})," wieder auf."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\cblue{\\Pcal_2}"})," ein Kegel ist, gehört mit ",e.jsx(n,{children:"\\bA"})," auch ",e.jsx(n,{children:"-\\bA"})," dazu."]}),e.jsxs(i.p,{children:["Ein Kegel im hier gemeinten Sinn ist unter Multiplikation mit ",e.jsx(i.em,{children:"nichtnegativen"}),` Skalaren
abgeschlossen, nicht unter Vorzeichenwechsel. Im Widget liegt `,e.jsx(n,{children:"-\\bA"}),` im gespiegelten Kegel,
und beide berühren sich nur in der Nullmatrix. Wäre `,e.jsx(n,{children:"\\cblue{\\Pcal_2}"})," unter ",e.jsx(n,{children:"t < 0"}),`
abgeschlossen, so wäre die Menge ein Untervektorraum, und `,e.jsx(n,{children:"\\bx^\\top\\bA\\bx \\ge 0"}),` könnte
nur für `,e.jsx(n,{children:"\\bA = \\bnull"})," gelten."]})]})]}),`
`,e.jsx(i.h3,{children:"Operationen, die Konvexität erhalten"}),`
`,e.jsx(i.p,{children:`Bis hierhin haben wir jede Menge einzeln geprüft. Das wird schnell mühsam. Bequemer ist es,
wenige Grundbausteine als konvex nachzuweisen und dann Regeln zu haben, die aus konvexen Mengen
neue konvexe Mengen machen. Vier solche Regeln stellen wir zusammen.`}),`
`,e.jsxs(j,{kind:"Satz",label:"11.2.10 (Konvexitätserhaltung)",id:"env-konvexitaetserhaltung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," konvex und sei ",e.jsx(n,{children:"(\\cblue{\\Xcal_i})_{i \\in I}"}),` eine Familie konvexer Mengen
über einer beliebigen Indexmenge `,e.jsx(n,{children:"I"}),". Dann sind auch die folgenden Mengen konvex:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Schnitt:"})," ",e.jsx(n,{children:"\\displaystyle \\cblue{\\Scal} = \\bigcap_{i \\in I} \\cblue{\\Xcal_i}"}),`, sofern alle
`,e.jsx(n,{children:"\\cblue{\\Xcal_i}"})," im selben Vektorraum liegen;"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kartesisches Produkt:"})," ",e.jsx(n,{children:"\\cblue{\\Xcal_1} \\times \\cdots \\times \\cblue{\\Xcal_k}"}),`, hier dürfen
die Faktoren in verschiedenen Vektorräumen leben, und das Produkt trägt die
komponentenweisen Verknüpfungen;`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Bild unter einer affinen Abbildung:"})," Für ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"}),` und
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),", ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx + \\bb"}),`, ist
`,e.jsx(n,{children:"f(\\cblue{\\Xcal}) = \\{\\by = f(\\bx)\\colon \\bx \\in \\cblue{\\Xcal}\\}"})," konvex;"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Summe:"})," ",e.jsx(n,{children:"\\cblue{\\Xcal_1} \\oplus \\cblue{\\Xcal_2} := \\{\\bx_1 + \\bx_2\\colon \\bx_1 \\in \\cblue{\\Xcal_1}, \\bx_2 \\in \\cblue{\\Xcal_2}\\}"})," für ",e.jsx(n,{children:"\\cblue{\\Xcal_1}, \\cblue{\\Xcal_2} \\subseteq \\R^n"}),"."]}),`
`]})]}),`
`,e.jsx(L,{title:"Beweis der Konvexitätserhaltung",children:e.jsxs(Z,{children:[e.jsx(z,{why:e.jsx(e.Fragment,{children:"hier wird über die Indexmenge nichts vorausgesetzt; das Argument läuft für endlich, abzählbar oder überabzählbar viele Mengen gleich"}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Schnitt."})," Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Scal}"}),", ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),` und
`,e.jsx(n,{children:"\\bz = \\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),". Aus ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Scal}"}),` folgt
`,e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal_i}"})," für jedes ",e.jsx(n,{children:"i \\in I"}),". Weil jedes ",e.jsx(n,{children:"\\cblue{\\Xcal_i}"}),` konvex ist,
liegt `,e.jsx(n,{children:"\\bz"})," in jedem ",e.jsx(n,{children:"\\cblue{\\Xcal_i}"}),", also in ihrem Schnitt."]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["jede Komponente wird für sich gemischt, also greift die Konvexität von ",e.jsx(n,{children:"\\Xcal_j"})," genau auf der ",e.jsx(n,{children:"j"}),"-ten Stelle"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kartesisches Produkt."})," Seien ",e.jsx(n,{children:"(\\bx_1, \\dots, \\bx_k)"})," und ",e.jsx(n,{children:"(\\by_1, \\dots, \\by_k)"}),` zwei Elemente
des Produkts und `,e.jsx(n,{children:"\\lambda \\in [0,1]"}),`. Addition und Skalarmultiplikation laufen im Produktraum
komponentenweise, also ist`]}),e.jsx(a,{children:`\\begin{aligned}
&\\quad \\cgreen{\\lambda (\\bx_1, \\dots, \\bx_k) + (1-\\lambda)(\\by_1, \\dots, \\by_k)} \\\\
&= \\left(\\cgreen{\\lambda\\bx_1 + (1-\\lambda)\\by_1}, \\ \\dots, \\ \\cgreen{\\lambda\\bx_k + (1-\\lambda)\\by_k}\\right)
\\in \\cblue{\\Xcal_1} \\times \\cdots \\times \\cblue{\\Xcal_k} ,
\\end{aligned}`}),e.jsxs(i.p,{children:["denn die ",e.jsx(n,{children:"j"}),"-te Komponente liegt nach Voraussetzung in ",e.jsx(n,{children:"\\cblue{\\Xcal_j}"}),"."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["in der mittleren Zeile heben sich die beiden ",e.jsx(n,{children:"\\bb"}),"-Anteile zu einem einzigen ",e.jsx(n,{children:"\\bb"})," auf, weil ",e.jsx(n,{children:"\\lambda + (1-\\lambda) = 1"})," ist; genau dafür braucht es Konvex- statt Linearkombinationen"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Affines Bild."})," Seien ",e.jsx(n,{children:"\\by_1 = f(\\bx_1)"})," und ",e.jsx(n,{children:"\\by_2 = f(\\bx_2)"}),` zwei Punkte von
`,e.jsx(n,{children:"f(\\cblue{\\Xcal})"})," mit ",e.jsx(n,{children:"\\bx_1, \\bx_2 \\in \\cblue{\\Xcal}"}),", und sei ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Dann ist"]}),e.jsx(a,{children:`\\begin{aligned}
\\cgreen{\\lambda\\by_1 + (1-\\lambda)\\by_2}
&= \\lambda(\\bA\\bx_1 + \\bb) + (1-\\lambda)(\\bA\\bx_2 + \\bb) \\\\
&= \\bA\\left(\\cgreen{\\lambda\\bx_1 + (1-\\lambda)\\bx_2}\\right) + \\bb \\\\
&= f\\left(\\cgreen{\\lambda\\bx_1 + (1-\\lambda)\\bx_2}\\right) \\in f(\\cblue{\\Xcal}) .
\\end{aligned}`})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["Schritt 3 mit ",e.jsx(n,{children:"\\bA = (\\bI_n \\ \\ \\bI_n) \\in \\R^{n \\times 2n}"})," und ",e.jsx(n,{children:"\\bb = \\bnull"})]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Summe."}),` Das folgt aus den beiden vorigen Punkten. Nach Schritt 2 ist
`,e.jsx(n,{children:"\\cblue{\\Xcal_1} \\times \\cblue{\\Xcal_2} \\subseteq \\R^{2n}"}),` konvex, und
`,e.jsx(n,{children:"f(\\bx_1, \\bx_2) = \\bx_1 + \\bx_2"}),` ist linear, in Matrixform
`,e.jsx(n,{children:"f(\\bz) = (\\bI_n \\ \\ \\bI_n)\\,\\bz"}),`. Nach Schritt 3 ist das Bild konvex, und dieses Bild ist
gerade `,e.jsx(n,{children:"\\cblue{\\Xcal_1} \\oplus \\cblue{\\Xcal_2}"}),"."]})})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.2.11 (Drei Feinheiten zum Satz)",id:"env-drei-feinheiten-zum-satz",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Das Produkt heißt kartesisch."}),` Punkt 2 meint das kartesische Produkt der Mengen, also die
Menge aller Tupel. Mit dem `,e.jsx(i.em,{children:"äußeren"})," Produkt ",e.jsx(n,{children:"\\bv \\otimes \\bw = \\bv\\bw^\\top"}),` aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.3",children:"Abschnitt 9.3"}),` hat es nichts zu tun; die Namen ähneln sich, die
Begriffe nicht. Wir schreiben deshalb durchgehend kartesisches Produkt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Abbildung ist affin."})," In Punkt 3 steht ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx + \\bb"}),`. Das ist eine affine
Abbildung, und linear ist sie nur für `,e.jsx(n,{children:"\\bb = \\bnull"}),`. Der Beweis benutzt tatsächlich nur die
Affinität, die Aussage gilt also in dieser allgemeineren Form. Der Verschiebungsanteil
ist übrigens der Grund, warum Konvexkombinationen und nicht beliebige Linearkombinationen
betrachtet werden: Erst `,e.jsx(n,{children:"\\lambda + (1-\\lambda) = 1"})," lässt aus zwei ",e.jsx(n,{children:"\\bb"}),`-Anteilen wieder genau
ein `,e.jsx(n,{children:"\\bb"})," werden."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Schnitt darf beliebig groß sein."})," Punkt 1 lässt eine beliebige Indexmenge ",e.jsx(n,{children:"I"}),` zu und
nicht nur eine Abzählung `,e.jsx(n,{children:"\\bigcap_{i=1}^\\infty"}),`. Der Beweis kennt gar keine Abzählung, und wir
brauchen die allgemeine Fassung gleich: `,e.jsx(i.a,{href:"#env-konvexe-huelle-als-durchschnitt",children:"Satz 11.2.13"})," schneidet über ",e.jsx(i.em,{children:"alle"}),` konvexen
Obermengen einer Menge, und das sind im Allgemeinen überabzählbar viele.`]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.2.12 (Ein Dreieck als Schnitt dreier Halbräume)",id:"env-ein-dreieck-als-schnitt-dreier",children:[e.jsxs(i.p,{children:["Im ",e.jsx(n,{children:"\\R^2"})," betrachten wir die drei Mengen"]}),e.jsx(a,{children:`\\cblue{\\Xcal_1} = \\{(x,y)\\colon x + y \\le 1\\}, \\qquad
\\cblue{\\Xcal_2} = \\{(x,y)\\colon x \\ge 0\\}, \\qquad
\\cblue{\\Xcal_3} = \\{(x,y)\\colon y \\ge 0\\} .`}),e.jsxs(i.p,{children:["Jede von ihnen ist ein ",e.jsx(i.em,{children:"Halbraum"}),`, also eine der beiden Seiten einer
`,e.jsx(b,{id:"hyperplane",children:"Hyperebene"})," und damit von der Form ",e.jsx(n,{children:"\\{\\bz\\colon \\ba^\\top\\bz \\le \\beta\\}"}),`; für
`,e.jsx(n,{children:"\\cblue{\\Xcal_2}"})," etwa mit ",e.jsx(n,{children:"\\ba = (-1, 0)^\\top"})," und ",e.jsx(n,{children:"\\beta = 0"}),". Jeder Halbraum ist konvex:"]}),e.jsx(a,{children:`\\ba^\\top\\left(\\cgreen{\\lambda\\bz_1 + (1-\\lambda)\\bz_2}\\right)
= \\lambda\\, \\ba^\\top\\bz_1 + (1-\\lambda)\\, \\ba^\\top\\bz_2
\\le \\lambda\\beta + (1-\\lambda)\\beta = \\beta .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-konvexitaetserhaltung",children:"Satz 11.2.10"}),"(1) ist damit auch der Schnitt konvex, und der ist"]}),e.jsx(a,{children:`\\cblue{\\Scal} = \\cblue{\\Xcal_1} \\cap \\cblue{\\Xcal_2} \\cap \\cblue{\\Xcal_3}
= \\{(x,y)\\colon x \\ge 0,\\ y \\ge 0,\\ x + y \\le 1\\} ,`}),e.jsxs(i.p,{children:["also das Dreieck mit den Ecken ",e.jsx(n,{children:"\\corange{(0,0)}"}),", ",e.jsx(n,{children:"\\corange{(1,0)}"})," und ",e.jsx(n,{children:"\\corange{(0,1)}"}),`. Genau
diese Menge steckt hinter dem Knopf „Dreieck" im Widget oben, samt ihren drei orangen
Extrempunkten.`]}),e.jsxs(i.p,{children:["Das Muster trägt weit. Endliche Schnitte von Halbräumen heißen ",e.jsx(i.em,{children:"Polyeder"}),`, und die zulässigen
Mengen linearer Optimierungsprobleme sind von dieser Bauart: endlich viele lineare
Ungleichungen, jede ein Halbraum, zusammen ein konvexes Polyeder. Die Optimierung unter solchen
Nebenbedingungen ist Thema von `,e.jsx(i.a,{href:"?k=12-optim#sec-12.5",children:"Abschnitt 12.5"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Die konvexe Hülle als kleinste konvexe Obermenge"}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"})," ist ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),` als Menge aller Konvexkombinationen
endlich vieler Punkte aus `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),` eingeführt worden, mit dem Zusatz, sie sei die
kleinste konvexe Menge, die `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),` enthält. Der folgende Satz sagt genau das, und zwar
in einer Form, die sich beweisen lässt.`]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.2.13 (Konvexe Hülle als Durchschnitt)",id:"env-konvexe-huelle-als-durchschnitt",children:[e.jsxs(i.p,{children:["Für jede Menge ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq V"})," gilt"]}),e.jsx(ke,{tag:"11.2.1",id:"eq-konvexe-huelle-als-durchschnitt",children:"\\conv(\\cblue{\\Xcal}) = \\bigcap_{\\cblue{\\Xcal} \\subseteq \\cblue{\\Ycal},\\ \\cblue{\\Ycal} \\text{ konvex}} \\cblue{\\Ycal} ."})]}),`
`,e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["Konvexkombinationen von Konvexkombinationen sind wieder Konvexkombinationen; das ist dieselbe Rechnung wie im Induktionsschritt zu ",e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"}),", nur in die andere Richtung gelesen"]}),children:[e.jsxs(i.p,{children:["Zuerst halten wir fest, dass ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),` überhaupt konvex ist. Der Name legt es
nahe, nachzurechnen ist es trotzdem. Seien
`,e.jsx(n,{children:"\\bz = \\sum_{i=1}^{N} w_i \\bx_i"})," und ",e.jsx(n,{children:"\\bz' = \\sum_{j=1}^{M} w'_j \\bx'_j"}),` zwei
Konvexkombinationen von Punkten aus `,e.jsx(n,{children:"\\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Dann ist"]}),e.jsx(a,{children:`\\cgreen{\\lambda\\bz + (1-\\lambda)\\bz'}
= \\sum_{i=1}^{N} \\lambda w_i\\, \\bx_i + \\sum_{j=1}^{M} (1-\\lambda) w'_j\\, \\bx'_j`}),e.jsxs(i.p,{children:["wieder eine Konvexkombination von endlich vielen Punkten aus ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`: Alle Gewichte
sind nichtnegativ, und ihre Summe ist `,e.jsx(n,{children:"\\lambda \\cdot 1 + (1-\\lambda)\\cdot 1 = 1"}),"."]})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["genau hier wird ",e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"})," gebraucht: Die Definition der Konvexität spricht nur über zwei Punkte, die Konvexkombination hat aber ",e.jsx(n,{children:"N"})," Summanden"]}),children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Scal}"})," die rechte Seite von ",e.jsx(i.a,{href:"#eq-konvexe-huelle-als-durchschnitt",children:"(11.2.1)"}),`. Über wie viele Mengen dieser Schnitt läuft,
brauchen wir nicht zu wissen; leer ist die Familie jedenfalls nicht, denn `,e.jsx(n,{children:"V"}),` selbst ist konvex
und enthält `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),`. Wir zeigen
`,e.jsx(n,{children:"\\conv(\\cblue{\\Xcal}) \\subseteq \\cblue{\\Scal}"}),". Sei dazu ",e.jsx(n,{children:"\\cblue{\\Ycal}"}),` irgendeine konvexe
Menge mit `,e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\cblue{\\Ycal}"}),", und sei ",e.jsx(n,{children:"\\bz \\in \\conv(\\cblue{\\Xcal})"}),`, also
`,e.jsx(n,{children:"\\bz = \\sum_i w_i \\bx_i"})," mit ",e.jsx(n,{children:"\\bx_i \\in \\cblue{\\Xcal}"}),". Dann sind alle ",e.jsx(n,{children:"\\bx_i"}),` auch Punkte von
`,e.jsx(n,{children:"\\cblue{\\Ycal}"}),", und weil ",e.jsx(n,{children:"\\cblue{\\Ycal}"})," konvex ist, liegt nach ",e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"}),` die ganze
Konvexkombination in `,e.jsx(n,{children:"\\cblue{\\Ycal}"}),". Das gilt für jedes solche ",e.jsx(n,{children:"\\cblue{\\Ycal}"}),`, also auch für
den Schnitt.`]})}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["ein Durchschnitt ist in jedem seiner Teilnehmer enthalten; der Trick ist nur, ",e.jsx(n,{children:"\\conv(\\Xcal)"})," als einen dieser Teilnehmer zu erkennen"]}),children:e.jsxs(i.p,{children:["Umgekehrt gilt ",e.jsx(n,{children:"\\cblue{\\Scal} \\subseteq \\conv(\\cblue{\\Xcal})"}),`. Nach Schritt 1 ist
`,e.jsx(n,{children:"\\cblue{\\Ycal} = \\conv(\\cblue{\\Xcal})"})," selbst eine konvexe Menge, die ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` enthält,
denn jedes `,e.jsx(n,{children:"\\bx \\in \\cblue{\\Xcal}"}),` ist die Einerkombination seiner selbst. Der Schnitt läuft
also unter anderem über diese Menge und ist damit in ihr enthalten.`]})}),e.jsx(z,{why:e.jsx(e.Fragment,{children:'Schritt 2 sagt „steckt in jeder anderen", Schritt 1 und die Einerkombination sagen „ist selbst eine solche"'}),children:e.jsxs(i.p,{children:["Beide Inklusionen zusammen geben ",e.jsx(i.a,{href:"#eq-konvexe-huelle-als-durchschnitt",children:"(11.2.1)"}),". Damit ist ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),` in einem präzisen
Sinn die kleinste konvexe Obermenge von `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),`: Sie ist konvex, sie enthält
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),", und sie steckt in jeder anderen Menge mit diesen beiden Eigenschaften."]})})]}),`
`,e.jsx(i.h3,{children:"Anwendung: lineare Ziele werden in Ecken angenommen"}),`
`,e.jsx(i.p,{children:`Zum Abschluss eine Anwendung. Sie erklärt, warum sich
der ganze Aufwand mit Hüllen und Extrempunkten in der Optimierung lohnt.`}),`
`,e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\N^n"}),` eine Menge von Zusammenstellungen: Ein Vektor
`,e.jsx(n,{children:"\\bx \\in \\cblue{\\Xcal}"})," sagt mit ",e.jsx(n,{children:"x_i = k"}),", dass ",e.jsx(n,{children:"k"})," Einheiten des ",e.jsx(n,{children:"i"}),`-ten Gegenstands vorhanden
sind. Jeder Gegenstand hat einen Wert `,e.jsx(n,{children:"v_i"}),`, und gesucht ist die wertvollste zulässige
Zusammenstellung,`]}),`
`,e.jsx(a,{children:`\\corange{\\bx^\\star} \\in \\argmax_{\\bx \\in \\cblue{\\Xcal}} \\ \\sum_{i=1}^n v_i x_i
= \\argmax_{\\bx \\in \\cblue{\\Xcal}} \\ \\bv^\\top\\bx .`}),`
`,e.jsxs(i.p,{children:[`Das Elementzeichen ist mit Bedacht gesetzt: Das Maximum ist
der erreichte `,e.jsx(i.em,{children:"Wert"}),` und nicht die Stelle, an der er angenommen wird; gesucht ist das
Argmax, und mehrdeutig ist es obendrein.`]}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` groß, so ist das Absuchen aller Vektoren aussichtslos. Der folgende Satz
verkleinert die Suche drastisch.`]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.2.14 (Lineare Ziele und Extrempunkte)",id:"env-lineare-ziele-und-extrempunkte",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subset \\R^n"})," endlich und nichtleer, sei ",e.jsx(n,{children:"\\bv \\in \\R^n"}),` und
`,e.jsx(n,{children:"M := \\max_{\\bx \\in \\cblue{\\Xcal}} \\bv^\\top\\bx"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\displaystyle \\max_{\\bz \\in \\conv(\\cblue{\\Xcal})} \\bv^\\top\\bz = M"}),`, das Maximum wächst durch
den Übergang zur konvexen Hülle also nicht;`]}),`
`,e.jsxs(i.li,{children:["unter den Maximierern in ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," gibt es einen Extrempunkt ",e.jsx(n,{children:"\\corange{\\bx^\\star}"}),` von
`,e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),";"]}),`
`,e.jsxs(i.li,{children:["jeder Extrempunkt von ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"})," liegt in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),"."]}),`
`]})]}),`
`,e.jsxs(L,{title:"Der Beweis des Extrempunkt-Satzes",children:[e.jsx(i.p,{children:`Für die Anwendung des Satzes genügt seine Aussage. Wer wissen will, wie der Nachweis läuft,
findet ihn hier; der technische Kern ist ein Existenzbeweis für Extrempunkte.`}),e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["ein gewichteter Durchschnitt von Zahlen, die alle höchstens ",e.jsx(n,{children:"M"})," sind, ist höchstens ",e.jsx(n,{children:"M"}),"; die Gewichte addieren sich zu eins"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu 1."})," Wegen ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\conv(\\cblue{\\Xcal})"}),` ist das Maximum über die Hülle
mindestens `,e.jsx(n,{children:"M"}),". Umgekehrt sei ",e.jsx(n,{children:"\\bz = \\sum_i w_i \\bx_i \\in \\conv(\\cblue{\\Xcal})"}),". Dann ist"]}),e.jsx(a,{children:"\\bv^\\top\\bz = \\sum_i w_i\\, \\bv^\\top\\bx_i \\le \\sum_i w_i M = M ,"}),e.jsxs(i.p,{children:["also ist das Maximum über die Hülle höchstens ",e.jsx(n,{children:"M"}),"."]})]}),e.jsx(z,{why:e.jsx(e.Fragment,{children:"eine Summe nichtnegativer Terme mit positiven Gewichten ist nur dann null, wenn jeder Term null ist"}),children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal_M} := \\{\\bx \\in \\cblue{\\Xcal}\\colon \\bv^\\top\\bx = M\\}"}),` die Menge der
Maximierer und `,e.jsx(n,{children:"\\cblue{\\Fcal} := \\{\\bz \\in \\conv(\\cblue{\\Xcal})\\colon \\bv^\\top\\bz = M\\}"}),`. Wir zeigen
`,e.jsx(n,{children:"\\cblue{\\Fcal} = \\conv(\\cblue{\\Xcal_M})"}),`. Von rechts nach links rechnen wir direkt nach: Für
`,e.jsx(n,{children:"\\bz = \\sum_i w_i\\bx_i"})," mit ",e.jsx(n,{children:"\\bx_i \\in \\cblue{\\Xcal_M}"}),` ist
`,e.jsx(n,{children:"\\bv^\\top\\bz = \\sum_i w_i M = M"}),". Für die andere Richtung sei ",e.jsx(n,{children:"\\bz = \\sum_i w_i\\bx_i \\in \\cblue{\\Fcal}"}),`
mit `,e.jsx(n,{children:"\\bx_i \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"w_i > 0"}),`. Aus
`,e.jsx(n,{children:"\\sum_i w_i (M - \\bv^\\top\\bx_i) = M - \\bv^\\top\\bz = 0"}),` und
`,e.jsx(n,{children:"M - \\bv^\\top\\bx_i \\ge 0"})," folgt ",e.jsx(n,{children:"\\bv^\\top\\bx_i = M"})," für jedes dieser ",e.jsx(n,{children:"i"}),"."]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die Identität entsteht aus ",e.jsx(n,{children:"\\left\\|\\lambda\\bu + (1-\\lambda)\\bw\\right\\|^2 = \\lambda^2\\left\\|\\bu\\right\\|^2 + 2\\lambda(1-\\lambda)\\bu^\\top\\bw + (1-\\lambda)^2\\left\\|\\bw\\right\\|^2"})," und ",e.jsx(n,{children:"\\lambda - \\lambda^2 = \\lambda(1-\\lambda)"}),"; links ist höchstens null, weil ",e.jsx(n,{children:"\\left\\|\\bu\\right\\|"})," und ",e.jsx(n,{children:"\\left\\|\\bw\\right\\|"})," die maximale Norm ",e.jsx(n,{children:"\\left\\|\\corange{\\bx^\\star}\\right\\|"})," nicht überschreiten"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu 2, in der Skizze."})," Unter den endlich vielen Punkten von ",e.jsx(n,{children:"\\cblue{\\Xcal_M}"}),` wählen wir einen
mit größter euklidischer Norm und nennen ihn `,e.jsx(n,{children:"\\corange{\\bx^\\star}"}),`. Zerlegen wir ihn als
`,e.jsx(n,{children:"\\corange{\\bx^\\star} = \\cgreen{\\lambda\\bu + (1-\\lambda)\\bw}"}),` mit
`,e.jsx(n,{children:"\\bu, \\bw \\in \\conv(\\cblue{\\Xcal_M})"})," und ",e.jsx(n,{children:"\\lambda \\in (0,1)"}),", so liefert Ausmultiplizieren"]}),e.jsx(a,{children:`\\lambda\\left\\|\\bu\\right\\|^2 + (1-\\lambda)\\left\\|\\bw\\right\\|^2
- \\left\\|\\cgreen{\\lambda\\bu + (1-\\lambda)\\bw}\\right\\|^2
= \\lambda(1-\\lambda)\\left\\|\\bu - \\bw\\right\\|^2 ,`}),e.jsxs(i.p,{children:[`und links steht höchstens null, rechts mindestens null. Also sind beide Seiten null und
`,e.jsx(n,{children:"\\bu = \\bw = \\corange{\\bx^\\star}"}),", das heißt ",e.jsx(n,{children:"\\corange{\\bx^\\star}"}),` ist Extrempunkt von
`,e.jsx(n,{children:"\\conv(\\cblue{\\Xcal_M})"}),". Für eine Zerlegung innerhalb von ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),` zwingt
Schritt 1 die beiden Teilpunkte ohnehin nach `,e.jsx(n,{children:"\\cblue{\\Fcal} = \\conv(\\cblue{\\Xcal_M})"}),`, und
damit ist `,e.jsx(n,{children:"\\corange{\\bx^\\star}"})," auch dort extrem."]})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["dieselbe Normierung wie im Beweis zu ",e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"}),", hier benutzt, um eine ",e.jsx(n,{children:"N"}),"-Kombination als Zweierkombination zu lesen"]}),children:e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu 3."})," Sei ",e.jsx(n,{children:"\\corange{\\bz}"})," ein Extrempunkt von ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),`, geschrieben als
`,e.jsx(n,{children:"\\corange{\\bz} = \\sum_{i=1}^{N} w_i\\bx_i"})," mit ",e.jsx(n,{children:"\\bx_i \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"w_i > 0"}),`. Für
`,e.jsx(n,{children:"N = 1"})," ist ",e.jsx(n,{children:"\\corange{\\bz} = \\bx_1 \\in \\cblue{\\Xcal}"}),", und für ",e.jsx(n,{children:"N \\ge 2"}),` lesen wir
`,e.jsx(n,{children:"\\corange{\\bz} = w_1\\bx_1 + (1-w_1)\\bu"}),` mit
`,e.jsx(n,{children:"\\bu = \\sum_{i\\ge 2} \\frac{w_i}{1-w_1}\\bx_i \\in \\conv(\\cblue{\\Xcal})"}),` als
Zweierkombination; weil `,e.jsx(n,{children:"\\corange{\\bz}"}),` extrem ist, folgt wieder
`,e.jsx(n,{children:"\\corange{\\bz} = \\bx_1 \\in \\cblue{\\Xcal}"}),"."]})})]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.2.15 (Auswahl unter einer Budgetschranke)",id:"env-auswahl-unter-einer-budgetschranke",children:[e.jsxs(i.p,{children:["Zwei Gegenstände, der erste kostet ",e.jsx(n,{children:"2"})," und ist ",e.jsx(n,{children:"5"})," wert, der zweite kostet ",e.jsx(n,{children:"3"})," und ist ",e.jsx(n,{children:"8"}),` wert.
Das Budget beträgt `,e.jsx(n,{children:"12"}),", ganze Einheiten sind zu wählen:"]}),e.jsx(a,{children:`\\cblue{\\Xcal} = \\left\\{\\bx \\in \\N^2\\colon 2x_1 + 3x_2 \\le 12\\right\\} ,
\\qquad
\\bv = (5, 8)^\\top .`}),e.jsxs(i.p,{children:["Diese Menge hat ",e.jsx(n,{children:"19"}),` Elemente. Ihre konvexe Hülle ist das Dreieck
`,e.jsx(n,{children:"\\{\\bx \\in \\R^2\\colon x_1 \\ge 0,\\ x_2 \\ge 0,\\ 2x_1 + 3x_2 \\le 12\\}"})," mit den drei Extrempunkten"]}),e.jsx(a,{children:"\\corange{(0,0)}, \\qquad \\corange{(6,0)}, \\qquad \\corange{(0,4)} ,"}),e.jsxs(i.p,{children:["denn alle Punkte von ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` erfüllen die drei Ungleichungen, und die drei Ecken liegen
selbst in `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),". Die Zielwerte dort sind ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"30"})," und ",e.jsx(n,{children:"32"}),". Nach ",e.jsx(i.a,{href:"#env-lineare-ziele-und-extrempunkte",children:"Satz 11.2.14"}),` ist
`,e.jsx(n,{children:"\\corange{\\bx^\\star} = \\corange{(0,4)}"})," mit dem Wert ",e.jsx(n,{children:"32"}),` eine Lösung, und wir haben dafür drei
Punkte geprüft statt neunzehn.`]}),e.jsxs(i.p,{children:["Lehrreich ist der Zweitplatzierte. Der Punkt ",e.jsx(n,{children:"\\cred{(3,2)}"}),` schöpft das Budget voll aus
(`,e.jsx(n,{children:"2 \\cdot 3 + 3 \\cdot 2 = 12"}),") und erreicht den Wert ",e.jsx(n,{children:"31"}),`; er liegt damit auf der Kante von
`,e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"})," zwischen ",e.jsx(n,{children:"\\corange{(6,0)}"})," und ",e.jsx(n,{children:"\\corange{(0,4)}"}),`. Ein Extrempunkt ist er
trotzdem nicht, denn er ist genau deren Mittelpunkt. Wer nur die Ecken absucht, übersieht ihn
und verliert dadurch nichts.`]})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.2.16 (Was der Satz leistet und was nicht)",id:"env-was-der-satz-leistet-und-was-nicht",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Nicht jeder Maximierer ist ein Extrempunkt."})," ",e.jsx(i.a,{href:"#env-lineare-ziele-und-extrempunkte",children:"Satz 11.2.14"}),`(2) verspricht
die Existenz eines solchen, nicht mehr: Bei `,e.jsx(n,{children:"\\cblue{\\Xcal} = \\{(0,0), (1,0), (2,0)\\}"}),` und
`,e.jsx(n,{children:"\\bv = (0,1)^\\top"}),` sind alle drei Punkte Maximierer, der mittlere ist aber der Mittelpunkt der
beiden äußeren. Bei Gleichständen taugt der Satz zum Finden `,e.jsx(i.em,{children:"einer"}),` Lösung, nicht zum
Beschreiben aller. Und die Endlichkeit ist nicht kosmetisch: Der offene Ball aus
`,e.jsx(i.a,{href:"#env-offener-ball",children:"Beispiel 11.2.4"})," hat gar keine Extrempunkte, und für ",e.jsx(n,{children:"\\bv \\neq \\bnull"}),` erreicht
`,e.jsx(n,{children:"\\bv^\\top\\bx"})," dort sein Supremum nie."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Arbeit verschiebt sich, sie verschwindet nicht."}),` Der Satz ersetzt die Suche über
`,e.jsx(n,{children:"\\cblue{\\Xcal}"})," durch die Suche über die Extrempunkte von ",e.jsx(n,{children:"\\conv(\\cblue{\\Xcal})"}),`, und das nützt
nur, wenn wir diese Hülle beschreiben können. In `,e.jsx(i.a,{href:"#env-auswahl-unter-einer-budgetschranke",children:"Beispiel 11.2.15"}),`
war sie leicht zu bekommen; für allgemeine Teilmengen von `,e.jsx(n,{children:"\\N^n"}),` ist sie dagegen selbst schwer
zu bestimmen, und genau darin liegt die Schwierigkeit der ganzzahligen Optimierung. Ist die
zulässige Menge von vornherein ein Polyeder wie in
`,e.jsx(i.a,{href:"#env-ein-dreieck-als-schnitt-dreier",children:"Beispiel 11.2.12"}),`, so ist die Suche über die Ecken die Grundidee der
linearen Programmierung. Dieses Verfahren behandelt das Skript nicht;
`,e.jsx(i.a,{href:"?k=12-optim#sec-12.5",children:"Abschnitt 12.5"}),` geht die Optimierung unter Nebenbedingungen über
Lagrange-Multiplikatoren und die Karush-Kuhn-Tucker-Bedingungen an.`]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Boyd und Vandenberghe, Convex Optimization, §2.2 und §2.3 behandeln dieselben Themen
ausführlicher, mit §2.1 zu affinen und konvexen Mengen, §2.2 zu den wichtigen Beispielen
einschließlich Simplex und semidefinitem Kegel und §2.3 zu den Operationen, die Konvexität
erhalten.`})})]})}function Ti(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(si,{...r})}):si(r)}const De=F.blau,me=F.gruen,Zn=F.rot,le=[{id:"doppelmulde",name:"nicht konvex",formel:"f(x) = x⁴ − 3x² − x + 3",f:r=>r**4-3*r*r-r+3,yBereich:[-1,9.6],start:[-1.55,1.25]},{id:"betrag",name:"konvex, nicht streng",formel:"f(x) = |x|",f:r=>Math.abs(r),yBereich:[-.3,2.3],start:[-1.6,-.4]},{id:"parabel",name:"strikt konvex",formel:"f(x) = 0,6x² + 0,3",f:r=>.6*r*r+.3,yBereich:[-.2,3],start:[-1.2,1.5]},{id:"konkav",name:"konkav",formel:"f(x) = 2 − 0,6x²",f:r=>2-.6*r*r,yBereich:[-1,2.4],start:[-1.4,1.4]}],$e=460,Ze=290,Be=34,pn=10,ln=10,Hn=30;function Qn({f:r,a:i,b:s,yBereich:d,breite:t,hoehe:c,lambda:u,ticks:p=!1,epigraph:m=!1,griff:f}){const w=p?Be:10,N=p?pn:10,g=p?ln:10,_=p?Hn:10,k=t-w-N,D=c-g-_,[X,K]=d,M=y=>w+(y+2)/4*k,l=y=>g+(1-(y-X)/(K-X))*D,B=200,A=Array.from({length:B+1},(y,ne)=>-2+4*ne/B).map(y=>`${M(y).toFixed(1)},${l(r(y)).toFixed(1)}`).join(" "),x=`${A} ${M(2).toFixed(1)},${l(K).toFixed(1)} ${M(-2).toFixed(1)},${l(K).toFixed(1)}`,R=r(i),v=r(s),q=y=>R+(v-R)*(y-i)/(s-i),re=200,yn=Array.from({length:re+1},(y,ne)=>{const se=i+(s-i)*ne/re;return{x:se,fx:r(se),sx:q(se)}}),bn=[];let Ne=[],Ve=0;const S=()=>{Ne.length>1&&bn.push(Ne.map(y=>`${M(y.x).toFixed(1)},${l(y.fx).toFixed(1)}`).join(" ")+" "+[...Ne].reverse().map(y=>`${M(y.x).toFixed(1)},${l(y.sx).toFixed(1)}`).join(" ")),Ne=[]};for(const y of yn)Ve=Math.max(Ve,y.fx-y.sx),y.fx>y.sx+1e-9?Ne.push(y):S();S();const H=Ve>1e-9,U=u!==void 0?u*i+(1-u)*s:void 0;return e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:.5,y:.5,width:t-1,height:c-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),p&&e.jsxs(e.Fragment,{children:[ve(X,K,4).map(y=>e.jsxs("g",{children:[e.jsx("line",{x1:w,x2:t-N,y1:l(y),y2:l(y),stroke:y===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:y===0?1.2:.6}),e.jsx("text",{x:w-4,y:l(y)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(y)})]},`y${y}`)),[-2,-1,0,1,2].map(y=>e.jsxs("g",{children:[e.jsx("line",{y1:g,y2:c-_,x1:M(y),x2:M(y),stroke:y===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:y===0?1.2:.6}),e.jsx("text",{x:M(y),y:c-_+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(y,1)})]},`x${y}`))]}),!p&&X<0&&K>0&&e.jsx("line",{x1:w,x2:t-N,y1:l(0),y2:l(0),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:1}),m&&e.jsx("polygon",{points:x,fill:De,fillOpacity:.14}),bn.map((y,ne)=>e.jsx("polygon",{points:y,fill:Zn,fillOpacity:.3},ne)),e.jsx("polyline",{points:A,fill:"none",stroke:De,strokeWidth:1.8}),e.jsx("line",{x1:M(i),y1:l(R),x2:M(s),y2:l(v),stroke:H?Zn:me,strokeWidth:1.8}),U!==void 0&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:M(U),y1:l(r(U)),x2:M(U),y2:l(q(U)),stroke:"var(--w-muted, #94a3b8)",strokeWidth:1.2,strokeDasharray:"3 3"}),e.jsx("circle",{cx:M(U),cy:l(r(U)),r:4,fill:De}),e.jsx("circle",{cx:M(U),cy:l(q(U)),r:4,fill:me})]}),["a","b"].map(y=>{const ne=y==="a"?i:s;return f?e.jsx("g",{children:f(y)},y):e.jsx("circle",{cx:M(ne),cy:l(r(ne)),r:3.5,fill:"var(--w-bg, #ffffff)",stroke:me,strokeWidth:2},y)})]})}function Oi(){const[r,i]=I.useState(le[0].id),[s,d]=I.useState(le[0].start[0]),[t,c]=I.useState(le[0].start[1]),[u,p]=I.useState(.5),m=le.find(v=>v.id===r)??le[0],{f}=m,w=v=>Be+(v+2)/4*($e-Be-pn),N=v=>ln+(1-(v-m.yBereich[0])/(m.yBereich[1]-m.yBereich[0]))*(Ze-ln-Hn),g=un({feld:{x0:Be,y0:ln,w:$e-Be-pn,h:Ze-ln-Hn},welt:{x0:-2,x1:2,y0:m.yBereich[0],y1:m.yBereich[1]},clamp:([v,q],re)=>[re==="a"?he(v,-2,t-.15):he(v,s+.15,2),q],greifPosition:v=>v==="a"?[s,f(s)]:[t,f(t)],onDrag:([v],q)=>q==="a"?d(v):c(v)}),_=v=>{const q=le.find(re=>re.id===v)??le[0];i(v),d(q.start[0]),c(q.start[1])},k=f(s),D=f(t),X=u*s+(1-u)*t,K=f(X),M=u*k+(1-u)*D;let l=0,B=0;for(let v=0;v<=400;v++){const q=s+(t-s)*v/400,re=f(q)-(k+(D-k)*(q-s)/(t-s));l=Math.max(l,re),B=Math.max(B,Math.abs(re))}const o=l>1e-9,A=B<1e-12,x=1/Math.SQRT2,R=t<=-x||s>=x;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Ziehen wir x und y auf der Doppelmulde in denselben Talgrund, bis das Paar die Probe besteht. Danach suchen wir eines, das sie sprengt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:le.map(v=>e.jsx("button",{type:"button","aria-pressed":v.id===r,className:v.id===r?Me:pe,onClick:()=>_(v.id),children:v.name},v.id))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[320px]",children:e.jsxs("svg",{width:$e,height:Ze,viewBox:`0 0 ${$e} ${Ze}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Der Graph von ${m.formel} mit der Sehne zwischen x und y; die Sehne wird ${o?"unterschritten":"nicht unterschritten"}.`,...g.svgProps,children:[e.jsx(Qn,{f,a:s,b:t,yBereich:m.yBereich,breite:$e,hoehe:Ze,lambda:u,ticks:!0,griff:v=>{const q=v==="a"?s:t;return e.jsx(Ye,{x:w(q),y:N(f(q)),r:4.5,farbe:me,aktiv:g.dragging===v,label:v==="a"?"x":"y",...g.handleProps(v)})}}),e.jsx("text",{x:Be,y:9,fill:"var(--w-muted, #64748b)",fontSize:10,children:"f(x) ↑"}),e.jsx("text",{x:(Be+$e-pn)/2,y:Ze-3,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"x →"})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-1 text-sm",children:[e.jsx("p",{className:"font-mono text-xs",style:{color:De},children:m.formel}),e.jsx(ie,{label:"x",value:s,onChange:v=>d(Math.min(v,t-.15)),min:-2,max:2,step:.01,accent:me}),e.jsx(ie,{label:"y",value:t,onChange:v=>c(Math.max(v,s+.15)),min:-2,max:2,step:.01,accent:me}),e.jsx(ie,{label:"λ",value:u,onChange:p,min:0,max:1,step:.01}),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"λx + (1−λ)y"}),e.jsx("td",{className:"font-mono text-xs",style:{color:me},children:h(X,3)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"f(λx + (1−λ)y)"}),e.jsx("td",{className:"font-mono text-xs",style:{color:De},children:h(K,3)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"λf(x) + (1−λ)f(y)"}),e.jsx("td",{className:"font-mono text-xs",style:{color:me},children:h(M,3)})]})]})}),e.jsx("p",{style:{color:K<=M+1e-12?me:Zn},children:K<=M+1e-12?`An dieser Zwischenstelle stimmt (${ge("eq:konvexitaet-als-ungleichung")}).`:`An dieser Zwischenstelle steht in (${ge("eq:konvexitaet-als-ungleichung")}) das falsche Zeichen.`})]})]}),o&&m.id==="konkav"?e.jsxs(W,{kind:"fail",titel:"Der Graph liegt über der ganzen Sehne.",children:["An seiner dicksten Stelle misst der rote Streifen ",h(l,3),". So geht es dieser Funktion bei jedem Paar, (",ge("eq:konvexitaet-als-ungleichung"),") ist also nirgends erfüllt. Mit umgedrehtem Zeichen stimmt die Ungleichung dafür immer, und genau so ist konkav erklärt (",P("bemerkung:wie-wir-die-ungleichung-lesen"),"): −f ist konvex."]}):o?e.jsxs(W,{kind:"fail",titel:"Sehne unterschritten: die Frage ist entschieden.",children:["An seiner dicksten Stelle misst der rote Streifen ",h(l,3),". Dort steht in (",ge("eq:konvexitaet-als-ungleichung"),") das falsche Zeichen. Weil ",P("satz:konvexitaet-als-ungleichung")," die Ungleichung für alle Paare fordert, genügt dieses eine Gegenbeispiel: f ist nicht konvex."]}):A?e.jsxs(W,{kind:"warn",titel:"Sehne und Graph fallen zusammen.",children:["Zwischen x und y verläuft f geradlinig, deshalb deckt die Sehne den Graphen genau ab und in (",ge("eq:konvexitaet-als-ungleichung"),") steht Gleichheit. Die Ungleichung ist erfüllt, die strikte Fassung nicht: Der Betrag ist konvex, aber nicht strikt konvex (",P("definition:strikte-konvexitaet"),")."]}):m.id==="doppelmulde"?e.jsxs(W,{kind:"ok",titel:"Geschafft: dieses Paar besteht die Probe.",children:["Zwischen x und y bleibt der Graph unter der Sehne."," ",R?"Beide Endpunkte liegen im selben konvexen Ast; die Wendepunkte sitzen bei ±0,7071.":"Das Paar überspannt sogar den Höcker: die Sehne läuft dort schlicht hoch genug."," ","Bewiesen ist damit nichts, denn (",ge("eq:konvexitaet-als-ungleichung"),") fordert alle Paare, und diese Funktion fällt anderswo durch. Genau darin liegt die Asymmetrie: Widerlegen kostet ein Paar, Beweisen eine Rechnung."]}):e.jsxs(W,{kind:"ok",titel:"Sehne liegt über dem Graphen.",children:["Zwischen x und y bleibt der Graph unter der Sehne, und bei dieser Funktion gelingt das für jedes Paar",m.id==="parabel"?", im Inneren sogar mit strikter Ungleichung":"","."]})]})}function Qi(){const r=[{id:"parabel",a:-1.4,b:1.5,titel:"konvex"},{id:"konkav",a:-1.4,b:1.5,titel:"konkav"},{id:"betrag",a:.2,b:1.7,titel:"konvex, nicht streng"},{id:"doppelmulde",a:-1.6,b:1.3,titel:"weder noch"}];return e.jsx("div",{className:"my-3",children:e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:r.map(({id:i,a:s,b:d,titel:t})=>{const c=le.find(u=>u.id===i)??le[0];return e.jsxs("div",{className:"min-w-0 basis-[190px]",children:[e.jsx("svg",{width:190,height:140,viewBox:"0 0 190 140",className:"max-w-full h-auto rounded",role:"img","aria-label":`${t}: ${c.formel} mit einer Sehne.`,children:e.jsx(Qn,{f:c.f,a:s,b:d,yBereich:c.yBereich,breite:190,hoehe:140})}),e.jsx("p",{className:"text-center text-sm text-slate-600 dark:text-slate-300",children:t}),e.jsx("p",{className:"text-center font-mono text-[11px]",style:{color:De},children:c.formel})]},i)})})})}function Ci(){const r=le[2];return e.jsxs("div",{className:"my-3 flex flex-col items-center",children:[e.jsxs("svg",{width:280,height:200,viewBox:"0 0 280 200",className:"max-w-full h-auto rounded",role:"img","aria-label":"Der Epigraph von f(x) = 0,6x² + 0,3 als Fläche über dem Graphen, mit einer Sehne darin.",children:[e.jsx(Qn,{f:r.f,a:-1.3,b:1.6,yBereich:r.yBereich,breite:280,hoehe:200,epigraph:!0}),e.jsx("text",{x:150,y:48,fontSize:12,fill:De,children:"epi(f)"}),e.jsx("text",{x:96,y:186,fontSize:12,fill:De,children:"f"})]}),e.jsxs("p",{className:"mt-1 max-w-prose text-center text-xs text-slate-500 dark:text-slate-400",children:["Der Epigraph von f(x) = 0,6x² + 0,3 ist die blaue Fläche über dem Graphen, der Graph selbst gehört dazu. Die grüne Sehne verbindet zwei seiner Punkte und bleibt in der Fläche; so ist Konvexität in ",P("definition:konvexe-funktion")," erklärt."]})]})}const dn=F.blau,He=F.orange,Ji=F.grau,$=2.2,J=300,ue=30,Yi=30,er=10,Gn=ue+J+er,qn=J+Yi,ti=r=>`(${h(r[0])}; ${h(r[1])})`,Ge=(r,i)=>[r[0]-i[0],r[1]-i[1]],Un=(r,i)=>r[0]*i[0]+r[1]*i[1],Je=r=>Math.hypot(r[0],r[1]),fe=[[-1,-.8],[1.2,-.6],[.1,1.2]];function nr(r,i,s){const d=Ge(s,i),t=Math.min(1,Math.max(0,Un(Ge(r,i),d)/Un(d,d)));return[i[0]+t*d[0],i[1]+t*d[1]]}function li(r){let i=0,s=0;for(let d=0;d<3;d++){const t=fe[d],c=fe[(d+1)%3],u=(c[0]-t[0])*(r[1]-t[1])-(c[1]-t[1])*(r[0]-t[0]);u>1e-12&&i++,u<-1e-12&&s++}return!(i&&s)}const ir=Array.from({length:720},(r,i)=>{const s=2*Math.PI*i/720;return[Math.cos(s),Math.sin(s)]}),rr=Array.from({length:3},(r,i)=>i).flatMap(r=>{const i=fe[r],s=fe[(r+1)%3];return Array.from({length:240},(d,t)=>{const c=t/240;return[i[0]+c*(s[0]-i[0]),i[1]+c*(s[1]-i[1])]})}),Pe=[{id:"scheibe",name:"Kreisscheibe",formel:"{ z : ‖z‖ ≤ 1 }",drin:r=>Je(r)<=1+1e-12,projektion:r=>{const i=Je(r);return i<=1+1e-12?r:[r[0]/i,r[1]/i]},rand:ir,flaeche:(r,i)=>{const s=r(0),d=i(0),t=r(1)-r(0);return e.jsx("circle",{cx:s,cy:d,r:t,fill:dn,fillOpacity:.16,stroke:dn,strokeWidth:1.4})},vor:[{name:"x weit außen",x:[1.6,1.2]},{name:"x nah am Rand",x:[1.05,.15]},{name:"x hinein",x:[.3,-.35]}]},{id:"dreieck",name:"Dreieck",formel:"conv{ (−1; −0,8), (1,2; −0,6), (0,1; 1,2) }",drin:li,projektion:r=>{if(li(r))return r;let i=fe[0],s=1/0;for(let d=0;d<3;d++){const t=nr(r,fe[d],fe[(d+1)%3]),c=Je(Ge(r,t));c<s&&(s=c,i=t)}return i},rand:rr,flaeche:(r,i)=>e.jsx("polygon",{points:fe.map(s=>`${r(s[0])},${i(s[1])}`).join(" "),fill:dn,fillOpacity:.16,stroke:dn,strokeWidth:1.4}),ecken:fe,vor:[{name:"x gegenüber einer Kante",x:[1.8,.9]},{name:"x hinter einer Ecke",x:[2.1,-1.35]},{name:"x hinein",x:[.1,-.1]}]}];function sr(){const[r,i]=I.useState(Pe[0].id),[s,d]=I.useState(Pe[0].vor[0].x),t=Pe.find(l=>l.id===r)??Pe[0],c=l=>ue+(l+$)/(2*$)*J,u=l=>J-(l+$)/(2*$)*J,p=un({feld:{x0:ue,y0:0,w:J,h:J},welt:{x0:-$,x1:$,y0:-$,y1:$},snap:.05,clamp:([l,B])=>[he(l,-$,$),he(B,-$,$)],greifPosition:()=>s,onDrag:l=>d(l)}),m=l=>{const B=Pe.find(o=>o.id===l)??Pe[0];i(l),d(B.vor[0].x)},f=t.drin(s),w=t.projektion(s),N=Ge(s,w),g=Je(N),_=(t.ecken??[]).some(l=>Je(Ge(l,w))<1e-9);let k=-1/0;for(const l of t.rand)k=Math.max(k,Un(N,Ge(l,w)));let D=1/0;for(const l of t.rand)D=Math.min(D,Je(Ge(s,l)));const X=g>1e-9?[-N[1]/g,N[0]/g]:null,K=2*$,M=ve(-$,$);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Ziehen wir x um die Menge herum und beobachten wir, wann x̂ mitwandert und wann es stehen bleibt."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Pe.map(l=>e.jsx("button",{type:"button","aria-pressed":l.id===r,className:l.id===r?Me:pe,onClick:()=>m(l.id),children:l.name},l.id))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[300px]",children:e.jsxs("svg",{width:Gn,height:qn,viewBox:`0 0 ${Gn} ${qn}`,className:"max-w-full h-auto rounded",role:"img","aria-label":`Die Menge ${t.name} und der Punkt x; die Projektion x̂ liegt ${f?"auf x selbst":_?"in einer Ecke":"auf dem Rand"}.`,...p.svgProps,children:[e.jsx("rect",{x:.5,y:.5,width:Gn-1,height:qn-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),e.jsx("defs",{children:e.jsx("clipPath",{id:"s123-proj-clip",children:e.jsx("rect",{x:ue,y:0,width:J,height:J})})}),M.map(l=>e.jsxs("g",{children:[e.jsx("line",{x1:ue,x2:ue+J,y1:u(l),y2:u(l),stroke:l===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:l===0?1.2:.6}),e.jsx("text",{x:ue-4,y:u(l)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(l,1)}),e.jsx("line",{y1:0,y2:J,x1:c(l),x2:c(l),stroke:l===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:l===0?1.2:.6}),e.jsx("text",{x:c(l),y:J+12,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(l,1)})]},`y${l}`)),e.jsxs("g",{clipPath:"url(#s123-proj-clip)",children:[t.flaeche(c,u),!f&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:c(s[0]),cy:u(s[1]),r:c(g)-c(0),fill:"none",stroke:He,strokeWidth:1,strokeDasharray:"2 4",opacity:.8}),X&&e.jsx("line",{x1:c(w[0]-K*X[0]),y1:u(w[1]-K*X[1]),x2:c(w[0]+K*X[0]),y2:u(w[1]+K*X[1]),stroke:Ji,strokeWidth:1.2,strokeDasharray:"6 4"}),e.jsx("line",{x1:c(s[0]),y1:u(s[1]),x2:c(w[0]),y2:u(w[1]),stroke:He,strokeWidth:2.2})]}),e.jsx("circle",{cx:c(w[0]),cy:u(w[1]),r:5.5,fill:He}),e.jsx("text",{x:c(w[0])+8,y:u(w[1])+14,fill:He,fontSize:12,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"x̂"}),e.jsx(Ye,{x:c(s[0]),y:u(s[1]),r:5,farbe:"var(--w-text, #1e293b)",aktiv:p.dragging==="x",label:"x",...p.handleProps("x")})]}),e.jsx("text",{x:ue+4,y:12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"z₂ ↑"}),e.jsx("text",{x:ue+J/2,y:J+26,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"z₁ →"})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-1 text-sm",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:t.vor.map(l=>e.jsx("button",{type:"button","aria-pressed":s[0]===l.x[0]&&s[1]===l.x[1],className:s[0]===l.x[0]&&s[1]===l.x[1]?Me:pe,onClick:()=>d(l.x),children:l.name},l.name))}),e.jsx(ie,{label:"x₁",value:s[0],onChange:l=>d([Math.round(l*20)/20,s[1]]),min:-$,max:$,step:.05}),e.jsx(ie,{label:"x₂",value:s[1],onChange:l=>d([s[0],Math.round(l*20)/20]),min:-$,max:$,step:.05}),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"Menge"}),e.jsx("td",{className:"font-mono text-xs",style:{color:dn},children:t.formel})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"x"}),e.jsxs("td",{className:"font-mono text-xs",children:[ti(s)," ",f?"∈ 𝒳":"∉ 𝒳"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"x̂"}),e.jsx("td",{className:"font-mono text-xs",style:{color:He},children:ti(w)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"d = ‖x − x̂‖"}),e.jsx("td",{className:"font-mono text-xs",style:{color:He},children:h(g,3)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3 align-top",children:"max ⟨x − x̂, y − x̂⟩"}),e.jsx("td",{className:"font-mono text-xs",children:h(k,3)})]})]})})]})]}),f?e.jsx(W,{kind:"neutral",titel:"x liegt schon in der Menge.",children:"Dann ist x selbst der nächstgelegene Punkt, also x̂ = x und d = 0. Die Stützgerade lassen wir hier weg: Die Richtung x − x̂ ist der Nullvektor und gibt keine Senkrechte her. Ziehen wir x nach außen."}):_?e.jsxs(W,{kind:"warn",titel:"x̂ steht in einer Ecke.",children:["Der Abstand ist d = ",h(g,3),". Solange x im Normalenkegel dieser Ecke bleibt, rührt sich x̂ nicht, obwohl x weiterläuft. Die Projektion ist eindeutig (",P("satz:projektionstheorem"),"), aber keineswegs umkehrbar. Auch hier trennt die gestrichelte Gerade: Für jeden Punkt y der Menge ist ⟨x − x̂, y − x̂⟩ ≤ 0 (",P("satz:kriterium-des-stumpfen-winkels"),"), das größte abgetastete Skalarprodukt beträgt ",h(k,3),"."]}):e.jsxs(W,{kind:"ok",titel:"x̂ ist der eindeutige nächste Punkt.",children:["Der Kreis mit Radius d = ",h(g,3)," um x berührt die Menge genau in x̂ und schneidet sie sonst nirgends; unter ",t.rand.length," abgetasteten Randpunkten unterbietet keiner diesen Abstand (kleinster gefundener Wert ",h(D,3),"). Die gestrichelte Gerade durch x̂ steht senkrecht auf x − x̂, und die ganze Menge liegt auf ihrer abgewandten Seite: Für jeden Punkt y der Menge ist ⟨x − x̂, y − x̂⟩ ≤ 0 (",P("satz:kriterium-des-stumpfen-winkels"),"), das größte abgetastete Skalarprodukt beträgt ",h(k,3),"."]}),e.jsx("p",{className:"max-w-prose text-xs text-slate-500 dark:text-slate-400",children:"Das Maximum in der letzten Zeile läuft über die abgetasteten Randpunkte y der Menge. Weil y ↦ ⟨x − x̂, y − x̂⟩ linear ist, wird es ohnehin am Rand angenommen; für das Dreieck genügten sogar die drei Ecken. Der Wert bleibt bei jeder Lage von x kleiner oder gleich null, und er ist genau dann null, wenn y auf der gestrichelten Stützgeraden liegt."})]})}function di(r){const i={a:"a",em:"em",h3:"h3",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Der nächste Punkt einer konvexen Menge"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),` hat konvexe Mengen von innen betrachtet: Zwei Punkte drin, die
ganze Strecke drin. Jetzt schauen wir von außen darauf. Gegeben ein Punkt `,e.jsx(n,{children:"\\bx"}),`, der nicht in
der Menge liegt: Welcher Punkt der Menge kommt ihm am nächsten?`]}),`
`,e.jsxs(i.p,{children:[`Die Frage ist keine Spielerei. Verfahren für Optimierungsprobleme mit Nebenbedingungen rechnen
einen Schritt oft erst frei aus und holen das Ergebnis danach in die zulässige Menge zurück,
und zwar an die nächstgelegene Stelle. Auch die Kleinste-Quadrate-Rechnung aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),` ist eine solche Aufgabe: Dort suchen wir im Spaltenraum von
`,e.jsx(n,{children:"\\bA"})," den Punkt mit dem kleinsten Abstand zu ",e.jsx(n,{children:"\\by"}),`. Damit ein Verfahren darauf bauen kann,
brauchen wir zwei Zusagen. Es muss einen nächstgelegenen Punkt überhaupt geben, und es darf nur
einen geben. Beides liefert Konvexität.`]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.3.1 (Projektionstheorem)",id:"env-projektionstheorem",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"V"})," ein endlichdimensionaler ",e.jsx(b,{id:"dot-product",children:"Skalarproduktraum"}),` und
`,e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq V"})," eine nichtleere, ",e.jsx(b,{id:"closed-bounded-set",children:"abgeschlossene"}),` und
konvexe Teilmenge. Dann gibt es zu jedem `,e.jsx(n,{children:"\\bx \\in V"}),` genau einen Punkt
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}} \\in \\cblue{\\Xcal}"})," mit"]}),e.jsx(ke,{tag:"11.3.1",id:"eq-projektionstheorem",children:"\\left\\|\\bx - \\corange{\\wh{\\bx}}\\right\\| = \\min_{\\by \\in \\cblue{\\Xcal}} \\left\\|\\bx - \\by\\right\\| ."}),e.jsxs(i.p,{children:["Wir nennen ",e.jsx(n,{children:"\\corange{\\wh{\\bx}}"})," die ",e.jsx(b,{id:"projection",children:e.jsx(i.em,{children:"Projektion"})})," von ",e.jsx(n,{children:"\\bx"}),` auf
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),"."]})]}),`
`,e.jsx(L,{title:"Beweisskizze des Projektionstheorems",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\Kcal"})," ist als Schnitt zweier abgeschlossener Mengen abgeschlossen und liegt in einer Kugel um ",e.jsx(n,{children:"\\bx"}),", ist also beschränkt"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Existenz."})," Wir setzen ",e.jsx(n,{children:"d := \\inf_{\\by \\in \\cblue{\\Xcal}} \\left\\|\\bx - \\by\\right\\|"}),`. Das
Infimum existiert, weil die Menge der Abstände nichtleer und nach unten durch `,e.jsx(n,{children:"0"}),` beschränkt
ist. Nun greifen wir uns irgendein `,e.jsx(n,{children:"\\by_0 \\in \\cblue{\\Xcal}"}),` und schneiden die Menge mit einer
Kugel:`]}),e.jsx(a,{children:"\\Kcal := \\cblue{\\Xcal} \\cap \\left\\{\\by \\in V\\colon \\left\\|\\bx - \\by\\right\\| \\le \\left\\|\\bx - \\by_0\\right\\|\\right\\} ."}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\Kcal"})," ist nichtleer, abgeschlossen und beschränkt, und außerhalb von ",e.jsx(n,{children:"\\Kcal"}),` sind alle
Abstände größer als in `,e.jsx(n,{children:"\\by_0"}),". Es genügt also, über ",e.jsx(n,{children:"\\Kcal"})," zu minimieren."]})]}),e.jsx(z,{why:e.jsx(e.Fragment,{children:"hier steckt die Vollständigkeit des Raums: In endlicher Dimension liefert der Satz von Bolzano-Weierstraß zu jeder beschränkten Folge eine konvergente Teilfolge, und die Abgeschlossenheit hält den Grenzwert in der Menge"}),children:e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"\\by \\mapsto \\left\\|\\bx - \\by\\right\\|"}),` ist stetig, und in endlicher Dimension ist
`,e.jsx(n,{children:"\\Kcal"}),` als abgeschlossene und beschränkte Menge kompakt. Nach dem Satz von Weierstraß nimmt
eine stetige Funktion auf einer kompakten Menge ihr Minimum an. Es gibt also ein
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}} \\in \\Kcal \\subseteq \\cblue{\\Xcal}"}),` mit
`,e.jsx(n,{children:"\\left\\|\\bx - \\corange{\\wh{\\bx}}\\right\\| = d"}),"."]})}),e.jsxs(z,{why:e.jsx(e.Fragment,{children:"genau hier geht die Konvexität ein: ohne sie wüssten wir über die Punkte der Strecke gar nichts"}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Eindeutigkeit."}),` Angenommen, es gäbe zwei Punkte
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}_1} \\neq \\corange{\\wh{\\bx}_2}"})," in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),", beide mit Abstand ",e.jsx(n,{children:"d"}),` zu
`,e.jsx(n,{children:"\\bx"}),". Wir setzen ",e.jsx(n,{children:"\\bv := \\corange{\\wh{\\bx}_2} - \\corange{\\wh{\\bx}_1} \\neq \\bnull"}),` und
betrachten den Abstand entlang der Verbindungsstrecke, quadriert:`]}),e.jsx(ke,{tag:"11.3.2",id:"eq-eq-11-3-2",children:`g(\\lambda) := \\left\\|\\bx - \\left(\\corange{\\wh{\\bx}_1} + \\lambda \\bv\\right)\\right\\|^2 ,
\\qquad \\lambda \\in [0,1] .`}),e.jsxs(i.p,{children:["Wegen der Konvexität von ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` liegt
`,e.jsx(n,{children:"\\cgreen{\\corange{\\wh{\\bx}_1} + \\lambda\\bv} = \\cgreen{(1-\\lambda)\\corange{\\wh{\\bx}_1} + \\lambda\\corange{\\wh{\\bx}_2}}"}),`
für jedes solche `,e.jsx(n,{children:"\\lambda"})," in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),". Nach Schritt 2 ist ",e.jsx(n,{children:"d"}),` der kleinstmögliche
Abstand, also gilt `,e.jsx(n,{children:"g(\\lambda) \\ge d^2"})," auf dem ganzen Intervall."]})]}),e.jsxs(z,{why:e.jsx(e.Fragment,{children:e.jsx(n,{children:"g(1) - g(0) = -2\\langle \\bx - \\wh{\\bx}_1, \\bv\\rangle + \\left\\|\\bv\\right\\|^2 = 0"})}),children:[e.jsxs(i.p,{children:["Jetzt multiplizieren wir ",e.jsx(i.a,{href:"#eq-eq-11-3-2",children:"(11.3.2)"})," aus. Mit der Bilinearität des Skalarprodukts ist"]}),e.jsx(a,{children:`g(\\lambda) = \\left\\|\\bx - \\corange{\\wh{\\bx}_1}\\right\\|^2
- 2\\lambda \\left\\langle \\bx - \\corange{\\wh{\\bx}_1}, \\bv \\right\\rangle
+ \\lambda^2 \\left\\|\\bv\\right\\|^2 ,`}),e.jsxs(i.p,{children:["eine quadratische Funktion in ",e.jsx(n,{children:"\\lambda"})," mit positivem Leitkoeffizienten. Aus ",e.jsx(n,{children:"g(0) = d^2"}),` und
`,e.jsx(n,{children:"g(1) = \\left\\|\\bx - \\corange{\\wh{\\bx}_2}\\right\\|^2 = d^2"}),` folgt
`,e.jsx(n,{children:"\\left\\langle \\bx - \\corange{\\wh{\\bx}_1}, \\bv \\right\\rangle = \\tfrac{1}{2}\\left\\|\\bv\\right\\|^2"}),"."]})]}),e.jsxs(z,{why:e.jsx(e.Fragment,{children:"der rote Term ist der ganze Gewinn: Er misst, wie weit die beiden Kandidaten auseinanderliegen, und genau um ihn unterbietet der Mittelpunkt den angeblich kleinsten Abstand"}),children:[e.jsxs(i.p,{children:[`Eine Parabel mit gleichen Werten an den Rändern hat ihren Scheitel in der Mitte. Setzen wir
`,e.jsx(n,{children:"\\lambda = \\tfrac{1}{2}"})," ein:"]}),e.jsx(a,{children:`g\\!\\left(\\tfrac{1}{2}\\right)
= d^2 - \\left\\langle \\bx - \\corange{\\wh{\\bx}_1}, \\bv \\right\\rangle + \\tfrac{1}{4}\\left\\|\\bv\\right\\|^2
= d^2 - \\cred{\\tfrac{1}{4}\\left\\|\\bv\\right\\|^2} < d^2 ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"\\bv \\neq \\bnull"}),". Der Mittelpunkt der beiden Kandidaten liegt also echt näher an ",e.jsx(n,{children:"\\bx"}),` als
`,e.jsx(n,{children:"d"}),`, und das widerspricht Schritt 3. Folglich war die Annahme falsch, und es gilt
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}_1} = \\corange{\\wh{\\bx}_2}"}),"."]})]})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.3.2 (Jede Voraussetzung wird gebraucht)",id:"env-jede-voraussetzung-wird-gebraucht",children:[e.jsx(i.p,{children:"Der Satz stellt drei Bedingungen, und entbehrlich ist keine davon."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Abgeschlossen."}),` Für den offenen Einheitsball
`,e.jsx(n,{children:"\\cred{\\{\\bz\\colon \\left\\|\\bz\\right\\| < 1\\}}"})," und ",e.jsx(n,{children:"\\bx = (2,0)^\\top"}),` ist das Infimum der
Abstände `,e.jsx(n,{children:"1"}),", angenommen wird es nie: Zu jedem ",e.jsx(n,{children:"\\by"}),` des Balls gibt es einen näheren. Ein
Minimum wie in `,e.jsx(i.a,{href:"#eq-projektionstheorem",children:"(11.3.1)"})," gibt es also nicht."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvex."})," Für die Einheitssphäre ",e.jsx(n,{children:"\\cred{\\{\\bz\\colon \\left\\|\\bz\\right\\| = 1\\}}"}),`, die
abgeschlossen, aber nicht konvex ist, und `,e.jsx(n,{children:"\\bx = \\bnull"}),` hat jeder Punkt der Menge den
Abstand `,e.jsx(n,{children:"1"}),`. Statt eines nächsten Punktes gibt es unendlich viele. Noch einfacher ist die
zweielementige Menge `,e.jsx(n,{children:"\\cred{\\{-1, +1\\}} \\subseteq \\R"})," mit ",e.jsx(n,{children:"\\bx = 0"}),": zwei nächste Punkte."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Endliche Dimension."}),` Die Abgeschlossenheit allein trägt die Existenz nicht. Sie sorgt dafür,
dass der Grenzwert einer Minimierungsfolge wieder in der Menge liegt; dass die Folge überhaupt
konvergiert, ist die eigentliche Arbeit, und in endlicher Dimension besorgt es
Bolzano-Weierstraß. In unendlichdimensionalen Räumen gilt der Satz ebenfalls, dort allerdings
nur für `,e.jsx(i.em,{children:"vollständige"}),` Räume, und die Rechnung aus Schritt 5 wird dann zur
Parallelogrammgleichung, mit der sich jede Minimierungsfolge als Cauchy-Folge erweist.`]})]}),`
`,e.jsx(i.p,{children:`Der nächstgelegene Punkt lässt sich auch ohne Minimierung erkennen. Das folgende Kriterium
sagt, woran wir ihn sehen. Für einen Untervektorraum wird daraus die vertraute
Orthogonalität, für allgemeine konvexe Mengen bleibt nur die Ungleichung.`}),`
`,e.jsxs(j,{kind:"Satz",label:"11.3.3 (Kriterium des stumpfen Winkels)",id:"env-kriterium-des-stumpfen-winkels",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq V"})," nichtleer und konvex, ",e.jsx(n,{children:"\\bx \\in V"}),` und
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}} \\in \\cblue{\\Xcal}"}),". Dann hat ",e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),` genau dann unter allen
Punkten von `,e.jsx(n,{children:"\\cblue{\\Xcal}"})," den kleinsten Abstand zu ",e.jsx(n,{children:"\\bx"}),", wenn"]}),e.jsx(ke,{tag:"11.3.3",id:"eq-kriterium-des-stumpfen-winkels",children:`\\left\\langle \\bx - \\corange{\\wh{\\bx}},\\ \\by - \\corange{\\wh{\\bx}} \\right\\rangle \\le 0
\\qquad \\text{für alle } \\by \\in \\cblue{\\Xcal} .`})]}),`
`,e.jsx(i.p,{children:`Abgeschlossenheit und endliche Dimension braucht dieses Kriterium nicht. Es sagt allerdings
auch nichts darüber, ob ein nächstgelegener Punkt existiert; es erkennt ihn nur, wenn es ihn
gibt.`}),`
`,e.jsxs(i.p,{children:["Geometrisch sagt ",e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"})," für ",e.jsx(n,{children:"\\bx \\notin \\cblue{\\Xcal}"}),`: Der Vektor
von der Projektion zu `,e.jsx(n,{children:"\\bx"}),` und der Vektor von der Projektion zu einem beliebigen weiteren
Punkt `,e.jsx(n,{children:"\\by \\neq \\corange{\\wh{\\bx}}"}),` der Menge schließen einen Winkel von mindestens
`,e.jsx(n,{children:"90^\\circ"})," ein. Die ganze Menge liegt also auf einer Seite der Geraden (im ",e.jsx(n,{children:"\\R^n"}),`: der
`,e.jsx(b,{id:"hyperplane",children:"Hyperebene"}),") durch ",e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),`, die senkrecht auf
`,e.jsx(n,{children:"\\bx - \\corange{\\wh{\\bx}}"})," steht. Liegt ",e.jsx(n,{children:"\\bx"})," dagegen selbst in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`, so ist
`,e.jsx(n,{children:"\\bx - \\corange{\\wh{\\bx}} = \\bnull"})," und von einem Winkel keine Rede mehr."]}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\cblue{\\Xcal} = \\Ucal"}),` sogar ein Untervektorraum, so wird aus
`,e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"})," eine Gleichung. Mit ",e.jsx(n,{children:"\\by = \\corange{\\wh{\\bx}} \\pm \\bu"}),` für
beliebiges `,e.jsx(n,{children:"\\bu \\in \\Ucal"})," liefert ",e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"}),` nämlich
`,e.jsx(n,{children:"\\pm\\langle \\bx - \\corange{\\wh{\\bx}}, \\bu\\rangle \\le 0"}),`, also
`,e.jsx(n,{children:"\\langle \\bx - \\corange{\\wh{\\bx}}, \\bu\\rangle = 0"}),`. Das Residuum steht dann wirklich senkrecht
auf dem ganzen Unterraum, und aus dieser Bedingung entstehen die Normalgleichungen der
Kleinsten Quadrate aus `,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`. Für eine konvexe Menge bleibt davon die Ungleichung
übrig, und die reicht aus.`]}),`
`,e.jsxs(L,{title:"Der Beweis des Winkelkriteriums und zwei Projektionsformeln",children:[e.jsx(i.p,{children:`Der Beweis ist eine Rechnung mit demselben quadratischen Ausdruck wie im
Eindeutigkeitsteil oben; die beiden Formeln danach zeigen, wie eine Projektion aussieht, wenn
man sie ausnahmsweise hinschreiben kann.`}),e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\|\\ba + \\bb\\right\\|^2 = \\left\\|\\ba\\right\\|^2 + 2\\langle \\ba, \\bb\\rangle + \\left\\|\\bb\\right\\|^2"})," mit ",e.jsx(n,{children:"\\ba = \\bx - \\wh{\\bx}"})," und ",e.jsx(n,{children:"\\bb = \\wh{\\bx} - \\by"}),", also ",e.jsx(n,{children:"\\langle \\ba, \\bb \\rangle = -\\langle \\bx - \\wh{\\bx}, \\by - \\wh{\\bx}\\rangle"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Aus der Ungleichung folgt die Minimalität."})," Sei ",e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"})," erfüllt und ",e.jsx(n,{children:"\\by \\in \\cblue{\\Xcal}"}),`
beliebig. Wir zerlegen `,e.jsx(n,{children:"\\bx - \\by = (\\bx - \\corange{\\wh{\\bx}}) + (\\corange{\\wh{\\bx}} - \\by)"}),`
und quadrieren:`]}),e.jsx(a,{children:`\\left\\|\\bx - \\by\\right\\|^2
= \\left\\|\\bx - \\corange{\\wh{\\bx}}\\right\\|^2
- 2\\left\\langle \\bx - \\corange{\\wh{\\bx}},\\ \\by - \\corange{\\wh{\\bx}} \\right\\rangle
+ \\left\\|\\by - \\corange{\\wh{\\bx}}\\right\\|^2
\\ \\ge\\ \\left\\|\\bx - \\corange{\\wh{\\bx}}\\right\\|^2 .`}),e.jsx(i.p,{children:"Beide weggelassenen Terme sind nichtnegativ, der mittlere nach Voraussetzung."})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["dieselbe quadratische Rechnung wie im Eindeutigkeitsbeweis, nur mit dem Laufparameter ",e.jsx(n,{children:"t"})," statt ",e.jsx(n,{children:"\\lambda"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Aus der Minimalität folgt die Ungleichung."})," Sei nun ",e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),` die Projektion und
`,e.jsx(n,{children:"\\by \\in \\cblue{\\Xcal}"}),". Für ",e.jsx(n,{children:"t \\in (0,1]"}),` liegt
`,e.jsx(n,{children:"\\cgreen{\\bz_t := \\corange{\\wh{\\bx}} + t(\\by - \\corange{\\wh{\\bx}})}"}),` wegen der Konvexität in
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),", also ist ",e.jsx(n,{children:"\\left\\|\\bx - \\cgreen{\\bz_t}\\right\\|^2 \\ge \\left\\|\\bx - \\corange{\\wh{\\bx}}\\right\\|^2"}),`.
Ausmultipliziert heißt das`]}),e.jsx(a,{children:`-2t\\left\\langle \\bx - \\corange{\\wh{\\bx}},\\ \\by - \\corange{\\wh{\\bx}} \\right\\rangle
+ t^2 \\left\\|\\by - \\corange{\\wh{\\bx}}\\right\\|^2 \\ \\ge\\ 0 .`}),e.jsxs(i.p,{children:["Wir teilen durch ",e.jsx(n,{children:"2t > 0"}),` und erhalten
`,e.jsx(n,{children:"\\left\\langle \\bx - \\corange{\\wh{\\bx}}, \\by - \\corange{\\wh{\\bx}} \\right\\rangle \\le \\tfrac{t}{2}\\left\\|\\by - \\corange{\\wh{\\bx}}\\right\\|^2"}),`.
Weil das für jedes `,e.jsx(n,{children:"t \\in (0,1]"})," gilt, dürfen wir ",e.jsx(n,{children:"t \\to 0"}),` laufen lassen, und die rechte Seite
verschwindet.`]})]})]}),e.jsxs(i.p,{children:["Die Eindeutigkeit fällt nebenbei ab: Erfüllen ",e.jsx(n,{children:"\\corange{\\wh{\\bx}_1}"}),` und
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}_2}"})," beide ",e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"}),", so setzen wir einmal ",e.jsx(n,{children:"\\by = \\corange{\\wh{\\bx}_2}"}),` und
einmal `,e.jsx(n,{children:"\\by = \\corange{\\wh{\\bx}_1}"}),` ein und addieren die beiden Ungleichungen. Übrig bleibt
`,e.jsx(n,{children:"\\left\\|\\corange{\\wh{\\bx}_2} - \\corange{\\wh{\\bx}_1}\\right\\|^2 \\le 0"}),"."]}),e.jsxs(j,{kind:"Beispiel",label:"11.3.4 (Zwei Projektionen, die wir hinschreiben können)",id:"env-zwei-projektionen-die-wir-hinschreiben",children:[e.jsx(i.p,{children:"Selten lässt sich die Projektion in einer Formel angeben; in diesen beiden Fällen geht es."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Kugel."})," Für ",e.jsx(n,{children:"\\cblue{\\Xcal} = \\{\\bz\\colon \\left\\|\\bz\\right\\| \\le r\\}"})," ist"]}),e.jsx(a,{children:`\\corange{\\wh{\\bx}} = \\begin{cases}
\\bx, & \\left\\|\\bx\\right\\| \\le r , \\\\[2pt]
r\\,\\dfrac{\\bx}{\\left\\|\\bx\\right\\|}, & \\left\\|\\bx\\right\\| > r .
\\end{cases}`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"r = 1"})," und ",e.jsx(n,{children:"\\bx = (1{,}6;\\ 1{,}2)^\\top"})," ist ",e.jsx(n,{children:"\\left\\|\\bx\\right\\| = 2"}),`, also
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}} = (0{,}8;\\ 0{,}6)^\\top"})," und ",e.jsx(n,{children:"d = 1"}),". Die Probe mit ",e.jsx(i.a,{href:"#eq-kriterium-des-stumpfen-winkels",children:"(11.3.3)"}),`: Es ist
`,e.jsx(n,{children:"\\bx - \\corange{\\wh{\\bx}} = (0{,}8;\\ 0{,}6)^\\top = \\corange{\\wh{\\bx}}"}),", und für jedes ",e.jsx(n,{children:"\\by"}),` mit
`,e.jsx(n,{children:"\\left\\|\\by\\right\\| \\le 1"}),` gilt
`,e.jsx(n,{children:"\\langle \\corange{\\wh{\\bx}}, \\by - \\corange{\\wh{\\bx}}\\rangle = \\langle \\corange{\\wh{\\bx}}, \\by\\rangle - 1 \\le \\left\\|\\by\\right\\| - 1 \\le 0"}),`
nach Cauchy-Schwarz.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Halbraum."})," Für ",e.jsx(n,{children:"\\cblue{\\Xcal} = \\{\\bz\\colon \\ba^\\top\\bz \\le \\beta\\}"})," mit ",e.jsx(n,{children:"\\ba \\neq \\bnull"})," ist"]}),e.jsx(a,{children:"\\corange{\\wh{\\bx}} = \\bx - \\frac{\\max\\{0,\\ \\ba^\\top\\bx - \\beta\\}}{\\left\\|\\ba\\right\\|^2}\\,\\ba ,"}),e.jsxs(i.p,{children:[`wir laufen also entlang der Normalenrichtung gerade so weit, bis die Nebenbedingung mit
Gleichheit erfüllt ist. Liegt `,e.jsx(n,{children:"\\bx"})," schon im Halbraum, passiert nichts."]}),e.jsx(i.p,{children:`Für ein Dreieck oder ein Polyeder gibt es keine solche Formel mehr. Dort rechnen wir die
Projektion auf jede Seite einzeln aus, jeweils auf diese Seite beschränkt, und nehmen die
beste; Ecken sind damit von selbst abgedeckt. Genau so rechnet das Widget unten.`})]})]}),`
`,e.jsxs(we,{title:"Die Projektion zum Ziehen",children:[e.jsxs(i.p,{children:[`In dieser Skizze ist der Punkt beweglich. Zwei Fragen lassen sich damit klären:
Wandert `,e.jsx(n,{children:"\\corange{\\wh{\\bx}}"})," immer mit, wenn wir ",e.jsx(n,{children:"\\bx"})," bewegen, und wo liegt der nächste Punkt, wenn ",e.jsx(n,{children:"\\bx"})," hinter einer Ecke steht?"]}),e.jsx(sr,{}),e.jsxs(i.p,{children:["Der gestrichelte Kreis um ",e.jsx(n,{children:"\\bx"})," mit Radius ",e.jsx(n,{children:"d"}),`
berührt die Menge nur in `,e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),`. Ein weiterer Punkt der Menge im Inneren des
Kreises wäre selbst näher an `,e.jsx(n,{children:"\\bx"}),`; läge er auf dem Kreis, so wäre nach Schritt 5 des Beweises
der Mittelpunkt der beiden näher. Die gestrichelte Gerade durch `,e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),` ist die Trennlinie aus
`,e.jsx(i.a,{href:"#env-kriterium-des-stumpfen-winkels",children:"Satz 11.3.3"}),", senkrecht zur Abstandsstrecke. Wir dürfen ",e.jsx(n,{children:"\\bx"}),` um die Menge herumziehen: Die
Gerade dreht sich mit, die Menge bleibt aber immer auf derselben Seite. Beim Dreieck wandert
`,e.jsx(n,{children:"\\corange{\\wh{\\bx}}"}),` dabei über Kanten und Ecken, und in einer Ecke bleibt es eine Weile
stehen, während `,e.jsx(n,{children:"\\bx"})," weiterläuft."]})]}),`
`,e.jsx(i.h3,{children:"Der Epigraph"}),`
`,e.jsxs(i.p,{children:[`Bisher ging es um Mengen. Für die Optimierung brauchen wir aber vor allem Aussagen über
`,e.jsx(i.em,{children:"Funktionen"}),`, und daraus wird keine neue Theorie: Wir führen die Konvexität einer
Funktion auf die Konvexität einer Menge zurück. Diese Menge ist alles, was über dem Graphen
liegt.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.3.5 (Epigraph)",id:"env-epigraph",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\Xcal\\subseteq\\R^n"})," und ",e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"}),". Der ",e.jsx(i.em,{children:"Epigraph"}),`
(epigraph) von `,e.jsx(n,{children:"f"})," ist die Menge"]}),e.jsx(a,{children:"\\cblue{\\epi(f)} := \\left\\{(\\bx, t) \\in \\Xcal \\times \\R\\colon t \\ge f(\\bx)\\right\\} ."})]}),`
`,e.jsxs(i.p,{children:[`Der Name kommt aus dem Griechischen und heißt wörtlich „darüber geschrieben". Für
`,e.jsx(n,{children:"f\\colon \\R \\to \\R"})," ist ",e.jsx(n,{children:"\\cblue{\\epi(f)} \\subseteq \\R^2"}),` die Fläche über der Kurve, den Graphen
eingeschlossen. Die Punkte darunter gehören nicht dazu.`]}),`
`,e.jsx(Ci,{}),`
`,e.jsx(j,{kind:"Definition",label:"11.3.6 (Konvexe Funktion)",id:"env-konvexe-funktion",children:e.jsxs(i.p,{children:["Eine Funktion ",e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"})," heißt ",e.jsx(i.em,{children:"konvex"}),` (convex), falls ihr Epigraph
`,e.jsx(n,{children:"\\cblue{\\epi(f)}"}),` eine konvexe Teilmenge des Umgebungsraums
`,e.jsx(n,{children:"\\R^n \\times \\R"})," ist."]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.3.7 (Der Definitionsbereich muss mitspielen)",id:"env-der-definitionsbereich-muss-mitspielen",children:[e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"\\Xcal"}),` dabei konvex ist, muss man nicht eigens fordern. Es ist keine zusätzliche
Forderung, sondern eine Folgerung. Sind nämlich `,e.jsx(n,{children:"\\bx, \\by \\in \\Xcal"}),", so liegen ",e.jsx(n,{children:"(\\bx, f(\\bx))"}),`
und `,e.jsx(n,{children:"(\\by, f(\\by))"})," in ",e.jsx(n,{children:"\\cblue{\\epi(f)}"}),`, und ist der Epigraph konvex, so liegt auch
`,e.jsx(n,{children:"\\cgreen{\\lambda(\\bx, f(\\bx)) + (1-\\lambda)(\\by, f(\\by))}"}),` darin. Die erste Komponente dieses
Punktes ist `,e.jsx(n,{children:"\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),`, und weil alle Punkte des Epigraphen ihre
erste Komponente in `,e.jsx(n,{children:"\\Xcal"})," haben, liegt sie in ",e.jsx(n,{children:"\\Xcal"}),`. Ein konvexer Epigraph erzwingt also
einen konvexen Definitionsbereich.`]}),e.jsxs(i.p,{children:["Umgekehrt brauchen wir die Konvexität von ",e.jsx(n,{children:"\\Xcal"}),` sehr wohl als Voraussetzung, sobald wir
gleich mit Ungleichungen arbeiten: Dort steht `,e.jsx(n,{children:"f(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by})"}),`, und
dieser Ausdruck muss überhaupt erst definiert sein. Wir setzen deshalb ab jetzt durchgehend
voraus, dass `,e.jsx(n,{children:"\\Xcal"})," konvex ist."]})]}),`
`,e.jsx(i.p,{children:`Die Epigraph-Fassung erklärt, warum konvexe Funktionen in dieses Kapitel gehören. Zum Rechnen
ist sie unhandlich. Gängiger ist die Formulierung über eine
Ungleichung. Beide sagen dasselbe.`}),`
`,e.jsxs(j,{kind:"Satz",label:"11.3.8 (Konvexität als Ungleichung)",id:"env-konvexitaet-als-ungleichung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\Xcal"})," konvex und ",e.jsx(n,{children:"f\\colon \\Xcal \\to \\R"}),". Dann ist ",e.jsx(n,{children:"f"}),` genau dann konvex im Sinne von
`,e.jsx(i.a,{href:"#env-konvexe-funktion",children:"Definition 11.3.6"}),", wenn für alle ",e.jsx(n,{children:"\\bx, \\by \\in \\Xcal"})," und alle ",e.jsx(n,{children:"\\lambda \\in [0,1]"})," gilt"]}),e.jsx(ke,{tag:"11.3.4",id:"eq-konvexitaet-als-ungleichung",children:`f\\!\\left(\\cgreen{\\lambda \\bx + (1-\\lambda)\\by}\\right)
\\ \\le\\ \\cgreen{\\lambda f(\\bx) + (1-\\lambda) f(\\by)} .`})]}),`
`,e.jsx(L,{title:"Beweis der Ungleichungscharakterisierung",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["ein Paar ",e.jsx(n,{children:"(\\bz, t)"})," liegt im Epigraphen, wenn ",e.jsx(n,{children:"t \\ge f(\\bz)"})," ist; hier ist ",e.jsx(n,{children:"\\bz = \\lambda\\bx + (1-\\lambda)\\by"})," und ",e.jsx(n,{children:"t = \\lambda f(\\bx) + (1-\\lambda)f(\\by)"})]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Vom Epigraphen zur Ungleichung."})," Sei ",e.jsx(n,{children:"\\cblue{\\epi(f)}"}),` konvex und seien
`,e.jsx(n,{children:"\\bx, \\by \\in \\Xcal"}),", ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Die Punkte ",e.jsx(n,{children:"(\\bx, f(\\bx))"})," und ",e.jsx(n,{children:"(\\by, f(\\by))"}),`
liegen in `,e.jsx(n,{children:"\\cblue{\\epi(f)}"}),", also auch ihre Konvexkombination"]}),e.jsx(a,{children:"\\cgreen{\\left(\\lambda\\bx + (1-\\lambda)\\by,\\ \\lambda f(\\bx) + (1-\\lambda)f(\\by)\\right)} \\in \\cblue{\\epi(f)} ."}),e.jsxs(i.p,{children:["Nach Definition des Epigraphen heißt das genau ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),"."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["hier wird gebraucht, dass ",e.jsx(n,{children:"\\Xcal"})," konvex ist; sonst wäre die rechte Seite gar nicht definiert"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Von der Ungleichung zum Epigraphen."})," Gelte ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),", und seien ",e.jsx(n,{children:"(\\bx, s), (\\by, t)"}),` zwei
Punkte aus `,e.jsx(n,{children:"\\cblue{\\epi(f)}"}),", also ",e.jsx(n,{children:"s \\ge f(\\bx)"})," und ",e.jsx(n,{children:"t \\ge f(\\by)"}),". Für ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`
rechnen wir`]}),e.jsx(a,{children:`\\cgreen{\\lambda s + (1-\\lambda) t}
\\ \\ge\\ \\cgreen{\\lambda f(\\bx) + (1-\\lambda) f(\\by)}
\\ \\ge\\ f\\!\\left(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right) .`}),e.jsxs(i.p,{children:["Die erste Ungleichung gilt, weil ",e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1-\\lambda"}),` nichtnegativ sind, die zweite ist
die Voraussetzung. Zusammen mit `,e.jsx(n,{children:"\\cgreen{\\lambda\\bx + (1-\\lambda)\\by} \\in \\Xcal"}),` liegt die
Konvexkombination der beiden Punkte damit wieder in `,e.jsx(n,{children:"\\cblue{\\epi(f)}"}),"."]})]})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.3.9 (Wie wir die Ungleichung lesen)",id:"env-wie-wir-die-ungleichung-lesen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," sagt ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` etwas sehr Anschauliches. Die rechte Seite ist der
Wert, den die Verbindungsstrecke zwischen den Graphenpunkten `,e.jsx(n,{children:"(\\bx, f(\\bx))"}),` und
`,e.jsx(n,{children:"(\\by, f(\\by))"})," an der Stelle ",e.jsx(n,{children:"\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),` hat, die linke der
Funktionswert dort. Die `,e.jsx(i.em,{children:"Sehne"}),` liegt also nie unter dem Graphen, oder umgekehrt: Zwischen zwei
Punkten hängt der Graph durch. Konvexe Funktionen sind nach oben geöffnet.`]}),e.jsxs(i.p,{children:["Aus derselben Ungleichung entstehen zwei weitere Begriffe. Wir nennen ",e.jsx(n,{children:"f"})," ",e.jsx(i.em,{children:"konkav"})," (concave), wenn ",e.jsx(n,{children:"-f"}),` konvex ist; für
konkave Funktionen dreht sich in `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` das Ungleichheitszeichen um, die Sehne liegt nie
über dem Graphen. Und wir nennen `,e.jsx(n,{children:"f"})," ",e.jsx(i.em,{children:"strikt konvex"})," (strictly convex), wenn in ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` für
`,e.jsx(n,{children:"\\bx \\neq \\by"})," und ",e.jsx(n,{children:"\\lambda \\in (0,1)"}),` sogar die strikte Ungleichung gilt. Gebräuchlich sind
dafür beide Namen, „strikt konvex" und „streng konvex"; wir bleiben einheitlich bei
strikt. Strikt konvexe
Funktionen dürfen also keine geraden Stücke haben. Warum das wichtig ist, sehen wir in
`,e.jsx(i.a,{href:"#sec-11.5",children:"Abschnitt 11.5"}),`: Konvexität macht jedes lokale Minimum global, strikte Konvexität
macht das Minimum eindeutig.`]})]}),`
`,e.jsx(i.p,{children:`Eine Bildtafel stellt konvex und konkav gegenüber, und daran hängt ein
beweglicher Test.`}),`
`,e.jsx(Qi,{}),`
`,e.jsxs(i.p,{children:[`Blau ist jeweils der Graph, rot markiert die Stellen, an denen er über der Sehne liegt; die
Sehne selbst ist grün, solange sie nirgends unterschritten wird, und sonst rot. Bei der
konkaven Funktion ist das ganze Zwischenstück rot, bei der Doppelmulde rechts nur ein Teil
davon. Beides widerlegt Konvexität, konkav ist von den vier Funktionen aber nur die zweite.
In der dritten Tafel liegen beide Endpunkte rechts vom Knick des Betrags. Dort verdeckt die
grüne Sehne den blauen Graphen vollständig, denn auf diesem Ast steht in `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),`
Gleichheit; genau darin unterscheiden sich konvex und strikt konvex. Die Parabel links kennt
diesen Fall nicht, sie bleibt zwischen ihren Endpunkten überall echt unter der Sehne.`]}),`
`,e.jsxs(we,{title:"Konvexität mit einer beweglichen Sehne",children:[e.jsx(i.p,{children:`Wählen wir die Endpunkte selbst, wird aus der Tafel ein Werkzeug. Wie viele Paare müssen wir
prüfen, um Konvexität zu widerlegen, und wie viele, um sie zu beweisen?`}),e.jsx(Oi,{}),e.jsxs(i.p,{children:["Nachweis und Widerlegung sind ebenso ungleich schwer wie bei den Mengen in ",e.jsx(i.a,{href:"#env-was-die-bedingung-verlangt",children:"Bemerkung 11.2.2"}),`:
Ein einziges schlechtes Paar erledigt die Konvexität, während noch so viele gelungene Proben
sie nicht beweisen. Die Doppelmulde führt beides vor. In der Voreinstellung `,e.jsx(n,{children:"x = -1{,}55"}),` und
`,e.jsx(n,{children:"y = 1{,}25"})," ragt der Graph um ",e.jsx(n,{children:"1{,}891"}),` über die Sehne, damit ist die Sache entschieden.
Rücken wir dagegen beide Endpunkte in denselben Talgrund, etwa auf `,e.jsx(n,{children:"x = -1{,}8"}),` und
`,e.jsx(n,{children:"y = -0{,}9"}),`, so besteht das Paar die Probe, und bewiesen ist damit nichts. Beim Betrag deckt
die grüne Sehne den Graphen auf jedem Paar mit gleichem Vorzeichen vollständig ab, dort steht
in `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` Gleichheit, und genau daran unterscheiden sich konvex und
strikt konvex.`]})]}),`
`,e.jsx(i.h3,{children:"Nachweis von Hand: der Betrag"}),`
`,e.jsx(i.p,{children:`Beweisen lässt sich Konvexität nur mit einer Rechnung über alle Paare. Wie so eine Rechnung
aussieht, führen wir am Betrag vor.`}),`
`,e.jsx(j,{kind:"Beispiel",label:"11.3.10 (Der Betrag ist konvex)",id:"env-der-betrag-ist-konvex",children:e.jsxs(i.p,{children:["Die Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", ",e.jsx(n,{children:"f(x) = |x|"}),", ist konvex."]})}),`
`,e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["in der zweiten Zeile die ",e.jsx(b,{id:"triangle-inequality",children:"Dreiecksungleichung"})," ",e.jsx(n,{children:"|a+b| \\le |a|+|b|"}),", in der dritten ",e.jsx(n,{children:"|\\lambda x| = |\\lambda|\\,|x| = \\lambda|x|"}),", weil ",e.jsx(n,{children:"\\lambda \\ge 0"})," und ",e.jsx(n,{children:"1-\\lambda \\ge 0"})," sind"]}),children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"x, y \\in \\R"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),` beliebig. Zu zeigen ist
`,e.jsx(n,{children:"f(\\cgreen{\\lambda x + (1-\\lambda)y}) \\le \\cgreen{\\lambda f(x) + (1-\\lambda)f(y)}"}),`. Wir setzen
die Definition von `,e.jsx(n,{children:"f"})," ein und schätzen mit der Dreiecksungleichung ab:"]}),e.jsx(a,{children:`\\begin{aligned}
f\\!\\left(\\cgreen{\\lambda x + (1-\\lambda)y}\\right)
&= \\left|\\lambda x + (1-\\lambda)y\\right| \\\\
&\\le \\left|\\lambda x\\right| + \\left|(1-\\lambda)y\\right| \\\\
&= \\lambda \\left|x\\right| + (1-\\lambda)\\left|y\\right| \\\\
&= \\cgreen{\\lambda f(x) + (1-\\lambda) f(y)} .
\\end{aligned}`})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"|\\cdot|"})," ist die Norm ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|_1"})," auf ",e.jsx(n,{children:"\\R^1"})]}),children:e.jsxs(i.p,{children:[`Die Rechnung benutzt vom Betrag nur zwei Eigenschaften, die absolute Homogenität und die
Dreiecksungleichung. Beides haben alle Normen, und deshalb tragen wir denselben Beweis unten in
`,e.jsx(i.a,{href:"#env-jede-norm-ist-konvex",children:"Satz 11.3.15"})," gleich für jede Norm ein."]})})]}),`
`,e.jsxs(i.p,{children:["Der Betrag ist konvex, aber nicht strikt konvex: Für ",e.jsx(n,{children:"x, y > 0"}),` steht in der Rechnung
durchgehend Gleichheit. Und er zeigt noch etwas: Konvexe Funktionen dürfen Knicke haben, sie
müssen nicht differenzierbar sein. Die Ableitungskriterien, die
`,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"})," bringt, sind deshalb bequem, aber nicht die Definition."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(en,{children:[e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Die affine Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", ",e.jsx(n,{children:"f(x) = ax + b"})," mit ",e.jsx(n,{children:"a, b \\in \\R"}),", ist konvex."]}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` steht hier sogar Gleichheit:
`,e.jsx(n,{children:"a(\\lambda x + (1-\\lambda)y) + b = \\lambda(ax+b) + (1-\\lambda)(ay+b)"}),`, weil sich die beiden
`,e.jsx(n,{children:"b"}),"-Anteile wegen ",e.jsx(n,{children:"\\lambda + (1-\\lambda) = 1"})," zu einem einzigen ",e.jsx(n,{children:"b"}),` zusammensetzen. Damit ist
`,e.jsx(n,{children:"f"})," konvex und zugleich konkav, aber für kein ",e.jsx(n,{children:"a"})," strikt konvex."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Funktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", ",e.jsx(n,{children:"f(x) = x^4"}),", ist konvex."]}),e.jsxs(i.p,{children:[`Sie ist es, und zwar streng. Ein Beweis in einer Zeile folgt in
`,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"})," aus ",e.jsx(n,{children:"f''(x) = 12x^2 \\ge 0"}),`. Dass die zweite Ableitung im Nullpunkt
verschwindet, schadet dabei nicht: Die Sehnenungleichung verlangt nichts über Ableitungen, und
die Funktion ist auch über den Nullpunkt hinweg strikt konvex.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Wurzelfunktion ",e.jsx(n,{children:"f\\colon \\R_+ \\to \\R"}),", ",e.jsx(n,{children:"f(x) = \\sqrt{x}"}),", ist konvex."]}),e.jsxs(i.p,{children:["Sie ist konkav. Die Sehne zwischen ",e.jsx(n,{children:"(0,0)"})," und ",e.jsx(n,{children:"(4,2)"})," hat in der Mitte den Wert ",e.jsx(n,{children:"1"}),`, die
Funktion dort aber `,e.jsx(n,{children:"\\sqrt{2} \\approx 1{,}414"})," und liegt damit über der Sehne. Für ",e.jsx(n,{children:"-f"}),` ist die
Ungleichung erfüllt, also ist `,e.jsx(n,{children:"\\sqrt{\\cdot}"})," konkav im Sinne von ",e.jsx(i.a,{href:"#env-wie-wir-die-ungleichung-lesen",children:"Bemerkung 11.3.9"}),"."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Exponentialfunktion ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),", ",e.jsx(n,{children:"f(x) = e^x"}),", ist konvex."]}),e.jsxs(i.p,{children:[`Sogar strikt konvex. Nebenbei ist die Exponentialfunktion das Standardbeispiel dafür, dass
Konvexität allein noch kein Minimum liefert: `,e.jsx(n,{children:"e^x > 0"})," für alle ",e.jsx(n,{children:"x"}),", das Infimum ",e.jsx(n,{children:"0"}),` wird nie
angenommen.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Logarithmus ",e.jsx(n,{children:"f\\colon \\R_+ \\to \\R"}),", ",e.jsx(n,{children:"f(x) = \\ln x"}),", ist konvex."]}),e.jsxs(i.p,{children:["Er ist konkav, wie die Wurzel. Zwischen ",e.jsx(n,{children:"x = 1"})," und ",e.jsx(n,{children:"x = 4"}),` etwa hat die Sehne in der Mitte
den Wert `,e.jsx(n,{children:"\\tfrac{1}{2}\\ln 4 \\approx 0{,}693"}),`, der Logarithmus dort aber
`,e.jsx(n,{children:"\\ln 2{,}5 \\approx 0{,}916"}),`. Beide steigen mit wachsendem Argument immer langsamer, und das
ist die Anschauung hinter konkav.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," konkav, so ist ihr Epigraph konvex."]}),e.jsxs(i.p,{children:["Genau andersherum. Konkav heißt, dass ",e.jsx(n,{children:"-f"}),` konvex ist, und das ist gleichbedeutend damit, dass
die Menge `,e.jsx(i.em,{children:"unter"})," dem Graphen konvex ist. Für ",e.jsx(n,{children:"f(x) = -x^2"}),` etwa ist der Epigraph das Gebiet
über einer nach unten geöffneten Parabel, und die Verbindungsstrecke zwischen `,e.jsx(n,{children:"(-1,-1)"}),` und
`,e.jsx(n,{children:"(1,-1)"})," läuft durch ",e.jsx(n,{children:"(0,-1)"}),", was wegen ",e.jsx(n,{children:"-1 < f(0) = 0"}),` nicht im Epigraphen liegt. Konvex ist
der Epigraph einer konkaven Funktion nur, wenn sie affin ist.`]})]}),e.jsxs(on,{loesung:1.891,toleranz:.02,children:[e.jsxs(i.p,{children:["Wählen wir im Sehnentest die Doppelmulde in ihrer Voreinstellung ",e.jsx(n,{children:"x = -1{,}55"}),", ",e.jsx(n,{children:"y = 1{,}25"}),`.
Wie dick ist der rote Streifen an seiner stärksten Stelle, also wie weit ragt der Graph über
die Sehne?`]}),e.jsxs(i.p,{children:["Um ",e.jsx(n,{children:"1{,}891"}),". Das ist die größte Verletzung von ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` auf diesem Paar, und mehr braucht
es nicht: `,e.jsx(i.a,{href:"#env-konvexitaet-als-ungleichung",children:"Satz 11.3.8"}),` fordert die Ungleichung für alle Paare, ein einziges Gegenbeispiel
entscheidet die Frage. Zum Vergleich: Auf dem Paar `,e.jsx(n,{children:"x = -1{,}8"}),", ",e.jsx(n,{children:"y = -0{,}9"}),` bleibt der
Streifen leer, bewiesen ist damit aber nichts.`]})]})]}),`
`,e.jsx(i.h3,{children:"Beispiele konvexer Funktionen"}),`
`,e.jsx(i.p,{children:`Zum Schluss stehen drei Klassen zusammen, die in der Statistik ständig vorkommen. Wir gehen
sie der Reihe nach durch, mit Beweis, wo er kurz ist.`}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.3.11 (Affine Funktionen)",id:"env-affine-funktionen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"a \\in \\R"})," ist ",e.jsx(n,{children:"f(\\bx) = \\bb^\\top\\bx + a"}),` konvex und konkav zugleich,
denn in `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"})," steht Gleichheit:"]}),e.jsx(a,{children:`\\bb^\\top\\!\\left(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right) + a
= \\cgreen{\\lambda\\left(\\bb^\\top\\bx + a\\right) + (1-\\lambda)\\left(\\bb^\\top\\by + a\\right)} .`})]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.3.12 (Quadratische Funktionen)",id:"env-quadratische-funktionen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bQ \\in \\R^{n \\times n}"}),", ",e.jsx(n,{children:"\\bb \\in \\R^n"})," und ",e.jsx(n,{children:"a \\in \\R"}),", und sei"]}),e.jsx(a,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx + \\bb^\\top\\bx + a ."}),e.jsxs(i.p,{children:["Ist der symmetrische Anteil ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}} := \\tfrac{1}{2}(\\bQ + \\bQ^\\top)"}),` positiv
semidefinit, so ist `,e.jsx(n,{children:"f"})," konvex. Ist ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}}"})," sogar positiv definit, so ist ",e.jsx(n,{children:"f"}),`
strikt konvex.`]})]}),`
`,e.jsx(L,{title:"Beweis des Kriteriums für quadratische Funktionen",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["ausmultiplizieren: ",e.jsx(n,{children:"\\bz^\\top\\bQ\\bz = \\lambda^2\\bx^\\top\\bQ\\bx + \\lambda(1-\\lambda)(\\bx^\\top\\bQ\\by + \\by^\\top\\bQ\\bx) + (1-\\lambda)^2\\by^\\top\\bQ\\by"}),", und mit ",e.jsx(n,{children:"\\lambda - \\lambda^2 = \\lambda(1-\\lambda)"})," bleibt genau der angegebene Term; numerisch über 200000 Zufallsfälle bestätigt"]}),children:[e.jsxs(i.p,{children:["Wir rechnen die Differenz zwischen rechter und linker Seite von ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` aus. Mit
`,e.jsx(n,{children:"\\bz := \\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"})," und ",e.jsx(n,{children:"\\bd := \\bx - \\by"})," gilt"]}),e.jsx(a,{children:`\\cgreen{\\lambda f(\\bx) + (1-\\lambda)f(\\by)} - f(\\bz)
= \\lambda(1-\\lambda)\\, \\bd^\\top \\bQ\\, \\bd .`}),e.jsxs(i.p,{children:["Die affinen Anteile ",e.jsx(n,{children:"\\bb^\\top\\bx + a"})," fallen dabei heraus, weil sie nach ",e.jsx(i.a,{href:"#env-affine-funktionen",children:"Beispiel 11.3.11"}),` die
Gleichung mit Gleichheit erfüllen; zu rechnen bleibt der quadratische Teil.`]})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bd^\\top\\bA\\bd = (\\bd^\\top\\bA\\bd)^\\top = \\bd^\\top\\bA^\\top\\bd"}),", also verschwindet ",e.jsx(n,{children:"\\bd^\\top(\\bA - \\bA^\\top)\\bd"})]}),children:e.jsxs(i.p,{children:["Nun ist ",e.jsx(n,{children:"\\bd^\\top\\bQ\\bd = \\bd^\\top\\bQ_{\\mathrm{sym}}\\bd"}),`, denn der schiefsymmetrische Anteil
`,e.jsx(n,{children:"\\tfrac{1}{2}(\\bQ - \\bQ^\\top)"}),` liefert in einer
`,e.jsx(b,{id:"quadratic-form",children:"quadratischen Form"})," stets null. Ist ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}}"}),` positiv
semidefinit, so ist dieser Ausdruck nichtnegativ, und wegen `,e.jsx(n,{children:"\\lambda(1-\\lambda) \\ge 0"}),` ist die
ganze Differenz nichtnegativ. Das ist `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),". Ist ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}}"}),` positiv definit, so
ist der Ausdruck für `,e.jsx(n,{children:"\\bd \\neq \\bnull"})," und ",e.jsx(n,{children:"\\lambda \\in (0,1)"}),` echt positiv, und wir bekommen
die strikte Ungleichung.`]})})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.3.13 (Warum der symmetrische Anteil entscheidet)",id:"env-warum-der-symmetrische-anteil",children:[e.jsxs(i.p,{children:["Die Voraussetzung des Satzes ist bewusst an ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}}"})," geknüpft und nicht an ",e.jsx(n,{children:"\\bQ"}),`
selbst. Verlangten wir „`,e.jsx(n,{children:"\\bQ"}),` positiv semidefinit", so wäre die Aussage unnötig eng, denn die
quadratische Form sieht von `,e.jsx(n,{children:"\\bQ"})," nur den symmetrischen Anteil, wie Schritt 2 zeigt. Für"]}),e.jsx(a,{children:"\\bQ = \\begin{pmatrix} 1 & 5 \\\\ -5 & 1 \\end{pmatrix}"}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\bQ_{\\mathrm{sym}} = \\bI"}),", die Funktion ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx = x_1^2 + x_2^2"}),` also
strikt konvex, obwohl `,e.jsx(n,{children:"\\bQ"})," selbst nicht symmetrisch und damit nach ",e.jsx(i.a,{href:"#env-positiv-semidefinit",children:"Definition 11.2.7"}),` nicht
einmal ein Kandidat für „positiv semidefinit" ist. In der Praxis fällt das selten ins Gewicht,
weil wir `,e.jsx(n,{children:"\\bQ"})," ohnehin symmetrisch wählen; die allgemeinere Fassung kostet aber nichts."]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.3.14 (Eine Quadrik ausgerechnet)",id:"env-eine-quadrik-ausgerechnet",children:[e.jsxs(i.p,{children:[`Rechnen wir ein Beispiel vor. Sei
`,e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx + \\bb^\\top\\bx + a"})," mit"]}),e.jsx(a,{children:`\\bQ = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}, \\qquad
\\bb = \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}, \\qquad a = 3 .`}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bQ"})," ist symmetrisch mit den ",e.jsx(b,{id:"eigenvalue-eigenvector",children:"Eigenwerten"})," ",e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"1"}),`, also positiv
definit. Nach `,e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"})," ist ",e.jsx(n,{children:"f"}),` strikt konvex. Auswerten an der Stelle
`,e.jsx(n,{children:"\\bx = (1, 2)^\\top"}),":"]}),e.jsx(a,{children:`\\begin{aligned}
f(\\bx) &= \\begin{pmatrix} 1 & 2 \\end{pmatrix}\\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}
+ \\begin{pmatrix} 1 & -2 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + 3 \\\\
&= \\begin{pmatrix} 1 & 2 \\end{pmatrix}\\begin{pmatrix} 2 \\\\ 2 \\end{pmatrix} + (1 - 4) + 3
= 6 - 3 + 3 = 6 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bQ"})," hier diagonal ist, lässt sich ",e.jsx(n,{children:"f"}),` auch als
`,e.jsx(n,{children:"2x_1^2 + x_2^2 + x_1 - 2x_2 + 3"}),` schreiben, und daran sehen wir die strikte Konvexität ohne
Matrixrechnung: eine Summe zweier nach oben geöffneter Parabeln plus einer affinen Funktion.`]})]}),`
`,e.jsx(j,{kind:"Satz",label:"11.3.15 (Jede Norm ist konvex)",id:"env-jede-norm-ist-konvex",children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\left\\|\\cdot\\right\\|"})," eine beliebige ",e.jsx(b,{id:"norm",children:"Norm"})," auf ",e.jsx(n,{children:"\\R^n"}),`. Dann ist
`,e.jsx(n,{children:"f(\\bx) = \\left\\|\\bx\\right\\|"})," konvex."]})}),`
`,e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung, dann absolute Homogenität ",e.jsx(n,{children:"\\left\\|c\\bx\\right\\| = |c|\\left\\|\\bx\\right\\|"})," mit ",e.jsx(n,{children:"c = \\lambda \\ge 0"})," beziehungsweise ",e.jsx(n,{children:"c = 1-\\lambda \\ge 0"})]}),children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\R^n"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Dann ist"]}),e.jsx(a,{children:`f\\!\\left(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right)
= \\left\\|\\lambda\\bx + (1-\\lambda)\\by\\right\\|
\\le \\left\\|\\lambda\\bx\\right\\| + \\left\\|(1-\\lambda)\\by\\right\\|
= \\cgreen{\\lambda\\left\\|\\bx\\right\\| + (1-\\lambda)\\left\\|\\by\\right\\|} .`})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["die drei Normeigenschaften stehen als ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-matrixnorm",children:"Definition 3.2.1"})," in ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),", dort für Matrizen formuliert; ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-bemerkung-3-2-2",children:"Bemerkung 3.2.2"})," hält fest, dass es dieselben Axiome sind"]}),children:e.jsxs(i.p,{children:[`Von den drei definierenden Eigenschaften einer Norm haben wir nur
zwei gebraucht: die absolute Homogenität und die Dreiecksungleichung. Die Definitheit
(`,e.jsx(n,{children:"f(\\bx) = 0 \\implies \\bx = \\bnull"}),`) geht nirgends ein. Der Beweis trägt deshalb auch für
Halbnormen, und für `,e.jsx(n,{children:"n = 1"})," ist er wörtlich der aus ",e.jsx(i.a,{href:"#env-der-betrag-ist-konvex",children:"Beispiel 11.3.10"}),"."]})})]}),`
`,e.jsxs(i.p,{children:["Strikt konvex ist keine dieser Normen. Liegen ",e.jsx(n,{children:"\\bx"})," und ",e.jsx(n,{children:"\\by"}),` auf demselben Strahl durch den
Ursprung, so steht in Schritt 1 überall Gleichheit. Für das `,e.jsx(i.em,{children:"Quadrat"}),` der euklidischen Norm
sieht es anders aus: `,e.jsx(n,{children:"f(\\bx) = \\left\\|\\bx\\right\\|_2^2 = \\bx^\\top\\bI\\bx"}),` ist nach
`,e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"})," strikt konvex, weil ",e.jsx(n,{children:"\\bI"}),` positiv definit ist. Und diese Funktion ist es, die uns
in der Statistik ständig begegnet.`]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.3.16 (Kleinste Quadrate und Ridge)",id:"env-kleinste-quadrate-und-ridge",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," die Designmatrix und ",e.jsx(n,{children:"\\by \\in \\R^m"}),` der Beobachtungsvektor. Der
`,e.jsx(b,{id:"linear-least-squares",children:"Kleinste-Quadrate-Verlust"})," lässt sich ausmultiplizieren zu"]}),e.jsx(a,{children:`f(\\bw) = \\left\\|\\bA\\bw - \\by\\right\\|^2
= \\bw^\\top\\!\\left(\\bA^\\top\\bA\\right)\\bw - 2\\by^\\top\\bA\\bw + \\left\\|\\by\\right\\|^2 ,`}),e.jsxs(i.p,{children:["also zu einer quadratischen Funktion mit ",e.jsx(n,{children:"\\bQ = \\bA^\\top\\bA"}),`. Diese Matrix ist symmetrisch und
stets positiv semidefinit, denn`]}),e.jsx(a,{children:`\\bw^\\top\\!\\left(\\bA^\\top\\bA\\right)\\bw = \\left(\\bA\\bw\\right)^\\top\\!\\left(\\bA\\bw\\right)
= \\left\\|\\bA\\bw\\right\\|^2 \\ge 0 .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"}),` ist der Kleinste-Quadrate-Verlust deshalb immer konvex, ganz gleich, wie die
Daten aussehen. Das ist der Grund, warum wir uns in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` nie um
lokale Minima kümmern mussten.`]}),e.jsxs(i.p,{children:["Strikt konvex ist er dagegen nur bei vollem Spaltenrang. Hat ",e.jsx(n,{children:"\\bA"})," zwei gleiche Spalten, etwa"]}),e.jsx(a,{children:`\\bA = \\begin{pmatrix} 1 & 1 \\\\ 2 & 2 \\\\ 3 & 3 \\end{pmatrix} ,
\\qquad
\\bA^\\top\\bA = \\begin{pmatrix} 14 & 14 \\\\ 14 & 14 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["so ist ",e.jsx(n,{children:"\\bd^\\top(\\bA^\\top\\bA)\\bd = 0"})," für ",e.jsx(n,{children:"\\bd = (1,-1)^\\top"}),`, und entlang dieser Richtung ist
`,e.jsx(n,{children:"f"})," konstant. Die Lösung ist dann nicht eindeutig."]}),e.jsxs(i.p,{children:["Hier setzt die ",e.jsx(i.em,{children:"Ridge-Regression"})," an. Sie addiert einen Strafterm,"]}),e.jsx(a,{children:`f_\\lambda(\\bw) = \\left\\|\\bA\\bw - \\by\\right\\|^2 + \\lambda\\left\\|\\bw\\right\\|^2
= \\bw^\\top\\!\\left(\\bA^\\top\\bA + \\lambda\\bI\\right)\\bw - 2\\by^\\top\\bA\\bw + \\left\\|\\by\\right\\|^2 ,`}),e.jsxs(i.p,{children:["und für ",e.jsx(n,{children:"\\lambda > 0"})," ist ",e.jsx(n,{children:"\\bA^\\top\\bA + \\lambda\\bI"}),` positiv definit:
`,e.jsx(n,{children:"\\bw^\\top(\\bA^\\top\\bA + \\lambda\\bI)\\bw = \\left\\|\\bA\\bw\\right\\|^2 + \\lambda\\left\\|\\bw\\right\\|^2 > 0"}),`
für `,e.jsx(n,{children:"\\bw \\neq \\bnull"}),". Nach ",e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"})," ist ",e.jsx(n,{children:"f_\\lambda"}),` also strikt konvex, und die Lösung ist
eindeutig, auch bei rangdefizientem `,e.jsx(n,{children:"\\bA"}),`. Die Rechnung dazu, samt Gradient, steht in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-ridge-regression",children:"Beispiel 10.6.6"}),"."]}),e.jsxs(i.p,{children:["Der Strafterm hebt dabei alle Eigenwerte um ",e.jsx(n,{children:"\\lambda"}),` an und drückt so die
`,e.jsx(b,{id:"condition-number",children:"Konditionszahl"}),": Das rangdefiziente ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` von oben hat die
Eigenwerte `,e.jsx(n,{children:"28"})," und ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"\\kappa_2"})," ist also unendlich; mit ",e.jsx(n,{children:"\\lambda = 1"})," stehen dort ",e.jsx(n,{children:"29"}),` und
`,e.jsx(n,{children:"1"}),", und ",e.jsx(n,{children:"\\kappa_2"})," fällt auf ",e.jsx(n,{children:"29"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`An der quadratischen Form hängt mehr als die Frage konvex oder nicht. Für
`,e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx + \\bb^\\top\\bx + a"}),` ist die
`,e.jsx(b,{id:"hessian-matrix",children:"Hesse-Matrix"}),` überall dieselbe, nämlich
`,e.jsx(n,{children:"\\bH_f = \\bQ + \\bQ^\\top = 2\\bQ_{\\mathrm{sym}}"}),`, und ihre Eigenwerte messen die Krümmung in den
Hauptrichtungen (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`); Eigenwerte nahe null bedeuten
flache Richtungen, in denen die Lösung schlecht bestimmt ist. In der Statistik ist das keine
Randnotiz, denn die negative Hesse-Matrix der Log-Likelihood ist die beobachtete
Fisher-Information, aus der die Standardfehler kommen. Wie sich Konvexität und Krümmung genau
zueinander verhalten, klärt `,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"}),"."]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Boyd und Vandenberghe, Convex Optimization, Kapitel 3 führt konvexe Funktionen
über dieselbe Ungleichung ein, sammelt die Beispiele (Normen, quadratische Funktionen) und
behandelt die Epigraph-Charakterisierung ausführlich. Das Projektionstheorem ist der
endlichdimensionale Fall des Projektionssatzes für Hilberträume, den jedes Lehrbuch zur
Funktionalanalysis bringt.`})})]})}function tr(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(di,{...r})}):di(r)}const ai=F.blau,Ke=F.gruen,Vn=F.orange,lr=F.rot,ci=[{key:"quad",label:"f(x) = x²",f:r=>r*r,konvex:!0,yMax:14},{key:"exp",label:"f(x) = eˣ",f:r=>Math.exp(r),konvex:!0,yMax:36},{key:"wurzel",label:"f(x) = √x  (konkav)",f:r=>Math.sqrt(r),konvex:!1,yMax:2.2}],Ue=[.5,1.5,3.5],dr=["x₁","x₂","x₃"],sn=0,In=4.2,wn=320,Oe=220,Xe=40,ar=32,Qe=10,cr=12,Ln=Xe+wn+cr,$n=Qe+Oe+ar,hr=[{name:"gleiche Gewichte",titel:"je 1/3",w:[1,1,1]},{name:"w = (0,2; 0,3; 0,5)",titel:"ungleiche Gewichte",w:[.2,.3,.5]},{name:"nur x₂",titel:"Gleichheitsfall",w:[0,1,0]},{name:"x₁ und x₃ je zur Hälfte",titel:"größte Lücke",w:[1,0,1]},{name:"alle Regler null",titel:"Normierung nicht definiert",w:[0,0,0]}];function xr(){const[r,i]=I.useState(0),[s,d]=I.useState([1,1,1]),t=ci[r],c=s[0]+s[1]+s[2],u=c>1e-12,p=u?s.map(x=>x/c):[NaN,NaN,NaN],m=u?Ue.reduce((x,R,v)=>x+p[v]*R,0):NaN,f=u?t.f(m):NaN,w=u?Ue.reduce((x,R,v)=>x+p[v]*t.f(R),0):NaN,N=w-f,g=u?Ue.reduce((x,R,v)=>x+p[v]*(R-m)**2,0):NaN,_=t.yMax,k=x=>Xe+(x-sn)/(In-sn)*wn,D=x=>Qe+Oe-x/_*Oe,X=160,K=Array.from({length:X+1},(x,R)=>{const v=sn+(In-sn)*R/X;return`${k(v).toFixed(1)},${D(Math.min(t.f(v),_*1.2)).toFixed(1)}`}).join(" "),M=Ue.map(x=>`${k(x).toFixed(1)},${D(t.f(x)).toFixed(1)}`).join(" "),l=u&&p.some(x=>x>1-1e-9),B=ve(sn,In),o=ve(0,_),A=x=>s.every((R,v)=>Math.abs(R-x[v])<1e-9);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Schieben wir das Gewicht auf eine einzige Stützstelle und beobachten wir, was mit dem Abstand der beiden Markierungen geschieht."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:ci.map((x,R)=>e.jsx("button",{type:"button","aria-pressed":R===r,className:R===r?Me:pe,onClick:()=>i(R),children:x.label},x.key))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[320px]",children:e.jsxs("svg",{width:Ln,height:$n,viewBox:`0 0 ${Ln} ${$n}`,className:"max-w-full h-auto rounded",role:"img","aria-label":u?`Der Graph von ${t.label} mit dem Sehnendreieck der drei Stützstellen; beide Seiten der Jensen-Ungleichung stehen über x = ${h(m)}.`:`Der Graph von ${t.label}; die Gewichtssumme ist null, es wird keine Markierung gezeichnet.`,children:[e.jsx("rect",{x:.5,y:.5,width:Ln-1,height:$n-1,rx:4,fill:"var(--w-bg, #ffffff)",stroke:"var(--w-border, #cbd5e1)"}),o.map(x=>e.jsxs("g",{children:[e.jsx("line",{x1:Xe,x2:Xe+wn,y1:D(x),y2:D(x),stroke:x===0?"var(--w-grid-strong, #cbd5e1)":"var(--w-grid, #e2e8f0)",strokeWidth:x===0?1.2:.6}),e.jsx("text",{x:Xe-4,y:D(x)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(x)})]},`y${x}`)),B.map(x=>e.jsxs("g",{children:[e.jsx("line",{y1:Qe,y2:Qe+Oe,x1:k(x),x2:k(x),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:.6}),e.jsx("text",{x:k(x),y:Qe+Oe+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:ee(x,1)})]},`x${x}`)),e.jsx("polygon",{points:M,fill:Ke,fillOpacity:.12,stroke:Ke,strokeWidth:1}),e.jsx("polyline",{points:K,fill:"none",stroke:ai,strokeWidth:2}),Ue.map((x,R)=>e.jsx("circle",{cx:k(x),cy:D(t.f(x)),r:3.5,fill:ai},R)),u&&e.jsxs("g",{children:[e.jsx("line",{x1:k(m),x2:k(m),y1:D(Math.min(f,w)),y2:D(Math.max(f,w)),stroke:t.konvex?Ke:lr,strokeWidth:2,strokeDasharray:"4 3"}),e.jsx("line",{x1:k(m),x2:k(m),y1:D(0),y2:D(Math.min(f,w)),stroke:"var(--w-muted, #94a3b8)",strokeWidth:.8,strokeDasharray:"2 3"}),e.jsx("circle",{cx:k(m),cy:D(w),r:5,fill:Ke}),e.jsx("circle",{cx:k(m),cy:D(f),r:5,fill:Vn}),e.jsxs("text",{x:k(m)+8,y:D(w)-4,fill:Ke,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:["Σ wᵢ f(xᵢ) = ",h(w)]}),e.jsxs("text",{x:k(m)+8,y:D(f)+13,fill:Vn,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:["f(Σ wᵢ xᵢ) = ",h(f)]})]}),e.jsx("text",{x:Xe,y:9,fill:"var(--w-muted, #64748b)",fontSize:10,children:"f(x) ↑"}),e.jsx("text",{x:Xe+wn/2,y:Qe+Oe+27,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:"x →"})]})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-1 text-sm",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:hr.map(x=>e.jsx("button",{type:"button",title:x.titel,"aria-pressed":A(x.w),className:A(x.w)?Me:pe,onClick:()=>d([x.w[0],x.w[1],x.w[2]]),children:x.name},x.name))}),[0,1,2].map(x=>e.jsx(ie,{label:`Gewicht ${dr[x]} = ${h(Ue[x],1)}`,value:s[x],onChange:R=>d(v=>{const q=[v[0],v[1],v[2]];return q[x]=he(Math.round(R*20)/20,0,1),q}),min:0,max:1,step:.05,accent:Ke},x)),e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"normierte Gewichte"}),e.jsxs("td",{className:"font-mono text-xs",children:["(",h(p[0]),"; ",h(p[1]),"; ",h(p[2]),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"gemischte Stelle Σ wᵢ xᵢ"}),e.jsx("td",{className:"font-mono text-xs",children:h(m)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",style:{color:Vn},children:"f(Σ wᵢ xᵢ)"}),e.jsx("td",{className:"font-mono text-xs",children:h(f)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",style:{color:Ke},children:"Σ wᵢ f(xᵢ)"}),e.jsx("td",{className:"font-mono text-xs",children:h(w)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Differenz"}),e.jsx("td",{className:"font-mono text-xs",children:h(N)})]})]})})]})]}),u?l?e.jsxs(W,{kind:"warn",titel:"Gleichheit: das ganze Gewicht liegt auf einer Stützstelle.",children:["Ein Gewicht ist 1, die beiden anderen sind 0. Dann steht auf beiden Seiten von (",ge("eq:jensen-ungleichung"),") derselbe Wert ",h(f),", die Ungleichung ist mit Gleichheit erfüllt. Das ist der eine Gleichheitsfall, den wir hier einstellen können; der andere wäre eine affine Funktion, für die Jensen in beide Richtungen gilt, und keine der drei Auswahlmöglichkeiten ist affin."]}):t.konvex?e.jsxs(W,{kind:"ok",titel:"Jensen: der grüne Punkt liegt über dem orangen.",children:["Erst mischen, dann auswerten gibt ",h(f),"; erst auswerten, dann mischen gibt"," ",h(w),". Die Lücke ",h(N)," ist der Abstand zwischen dem Sehnenzug und der Kurve, genau wie (",ge("eq:jensen-ungleichung"),") es verlangt. Der grüne Punkt liegt im Dreieck der drei Graphenpunkte, und dieses Dreieck gehört zum Epigraphen, weil f konvex ist.",t.key==="quad"&&e.jsxs(e.Fragment,{children:[" ","Bei f(x) = x² hat die Lücke einen Namen: Sie ist die gewichtete Varianz der Stützstellen, hier ",h(g),", dieselbe Rechnung wie beim fairen Würfel aus",P("beispiel:der-erwartungswert-ist-eine"),", wo E[X²] − E[X]² = 35/12 = ",h(35/12)," herauskommt (",P("beispiel:die-varianz-ist-nicht-negativ"),"). Deshalb ist die Varianz nie negativ."]})]}):e.jsxs(W,{kind:"fail",titel:"Konkave Gegenprobe: die Ungleichung dreht sich um.",children:["Für die konkave Wurzel liegt der Sehnenzug unter der Kurve: ",h(w)," ist kleiner als ",h(f),", die Lücke also ",h(N),". Das ist kein Widerspruch zu",P("satz:jensen-ungleichung"),", sondern seine Spiegelung (",P("bemerkung:wie-wir-die-ungleichung-lesen"),"): −√x ist konvex, für diese Funktion gilt (",ge("eq:jensen-ungleichung"),"), und Multiplikation mit −1 dreht das Zeichen um."]}):e.jsxs(W,{kind:"fail",titel:"Summe null, keine Gewichte.",children:["Alle drei Regler stehen auf null. Die Nebenbedingung w₁ + w₂ + w₃ = 1 aus",P("satz:jensen-ungleichung")," lässt sich so nicht erfüllen, und wir müssten durch null teilen. Wir zeichnen deshalb keine Markierung. Jede andere Stellung ist zulässig, denn durch eine positive Summe dürfen wir immer teilen."]})]})}function hi(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Regeln statt Nachrechnen"}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"}),` haben wir Konvexität direkt aus der Definition nachgewiesen,
für den Betrag mit der Dreiecksungleichung. Für jede neue Funktion dasselbe zu tun, wäre
mühsam. Bei den Zielfunktionen der Statistik ist es aussichtslos, denn die entstehen aus
Bausteinen: Ein Verlust wird über alle Beobachtungen summiert, ein Strafterm kommt dazu, über
Klassen wird maximiert, und am Ende steht vielleicht noch ein Grenzübergang.`]}),`
`,e.jsxs(i.p,{children:[`Dieser Abschnitt liefert das Handwerkszeug dafür. Zuerst einen Baukasten aus vier Operationen,
unter denen Konvexität erhalten bleibt. Dann die Jensen-Ungleichung, die die Definition von
zwei auf beliebig viele Punkte hebt. Danach ein Kriterium, das die Frage an die zweite
Ableitung weiterreicht und damit an das Rechnen aus `,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`
anschließt. Zum Schluss den Subgradienten, der die Tangente ersetzt, wo es keine gibt.`]}),`
`,e.jsx(i.h3,{children:"Vier Operationen, die Konvexität erhalten"}),`
`,e.jsxs(j,{kind:"Satz",label:"11.4.1 (Operationen, die Konvexität erhalten)",id:"env-operationen-die-konvexitaet-erhalten",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"}),` konvex und seien
`,e.jsx(n,{children:"f_1, f_2, \\dots\\colon \\cblue{\\Xcal} \\to \\R"}),` konvexe Funktionen. Dann sind auch die folgenden
Funktionen auf `,e.jsx(n,{children:"\\cblue{\\Xcal}"})," konvex:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["die Summe ",e.jsx(n,{children:"f(\\bx) = f_1(\\bx) + f_2(\\bx)"}),";"]}),`
`,e.jsxs(i.li,{children:["das nichtnegative Vielfache ",e.jsx(n,{children:"f(\\bx) = c\\,f_1(\\bx)"})," mit ",e.jsx(n,{children:"c \\ge 0"}),";"]}),`
`,e.jsxs(i.li,{children:["das punktweise ",e.jsx(b,{id:"supremum",children:"Supremum"})," ",e.jsx(n,{children:"f(\\bx) = \\sup_i f_i(\\bx)"}),`, sofern dieser Wert an
jeder Stelle endlich ist; bei endlich vielen Funktionen ist das das Maximum
`,e.jsx(n,{children:"\\max_i f_i(\\bx)"}),";"]}),`
`,e.jsxs(i.li,{children:["der punktweise ",e.jsx(b,{id:"limit",children:"Grenzwert"})," ",e.jsx(n,{children:"f(\\bx) = \\lim_{k \\to \\infty} f_k(\\bx)"}),`, sofern dieser
Grenzwert für jedes `,e.jsx(n,{children:"\\bx \\in \\cblue{\\Xcal}"})," existiert."]}),`
`]})]}),`
`,e.jsx(i.p,{children:`Wir führen die Beweise für (2) und (4) in der Vertiefung aus; (1) und (3) bleiben Übungen, die wir
gleich im Anschluss lösen.`}),`
`,e.jsx(L,{title:"Beweise zu Skalarmultiplikation und Grenzwerten",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["im zweiten Schritt geht beides ein: die Konvexität von ",e.jsx(n,{children:"f_1"})," liefert die Ungleichung, und ",e.jsx(n,{children:"c \\ge 0"})," erlaubt es, mit ",e.jsx(n,{children:"c"})," zu multiplizieren, ohne das Ungleichheitszeichen zu drehen. Für ",e.jsx(n,{children:"c < 0"})," kippt es, und ",e.jsx(n,{children:"c f_1"})," ist dann konkav"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu (2)."})," Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Dann gilt"]}),e.jsx(a,{children:`\\begin{aligned}
f(\\cgreen{\\lambda \\bx + (1-\\lambda)\\by})
&= c\\,f_1(\\cgreen{\\lambda \\bx + (1-\\lambda)\\by}) \\\\
&\\le c\\left(\\lambda f_1(\\bx) + (1-\\lambda) f_1(\\by)\\right) \\\\
&= \\lambda\\, c f_1(\\bx) + (1-\\lambda)\\, c f_1(\\by)
= \\lambda f(\\bx) + (1-\\lambda) f(\\by) .
\\end{aligned}`})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["Zeile 1: ",e.jsx(n,{children:"f"})," ist als Grenzwert definiert, und eine konvergente Folge hat Limes und Limes superior gemeinsam. Zeile 2: jedes einzelne ",e.jsx(n,{children:"f_k"})," ist konvex, und der Limes superior ist monoton, aus ",e.jsx(n,{children:"a_k \\le b_k"})," folgt also ",e.jsx(n,{children:"\\limsup a_k \\le \\limsup b_k"}),". Zeile 3: Subadditivität des Limes superior, zusammen mit ",e.jsx(n,{children:"\\lambda, 1-\\lambda \\ge 0"}),". Zeile 4: beide Folgen konvergieren nach Voraussetzung, ihr Limes superior ist also ihr Grenzwert"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zu (4)."})," Wieder seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`. Wir setzen
`,e.jsx(n,{children:"\\cgreen{\\bz} := \\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),`, das nach Voraussetzung wieder in
`,e.jsx(n,{children:"\\cblue{\\Xcal}"})," liegt, und rechnen nach:"]}),e.jsx(a,{children:`\\begin{aligned}
f(\\cgreen{\\bz})
&= \\lim_{k \\to \\infty} f_k(\\cgreen{\\bz})
= \\limsup_{k \\to \\infty} f_k(\\cgreen{\\bz}) \\\\
&\\le \\limsup_{k \\to \\infty} \\left[\\lambda f_k(\\bx) + (1-\\lambda) f_k(\\by)\\right] \\\\
&\\le \\lambda \\limsup_{k \\to \\infty} f_k(\\bx)
 + (1-\\lambda) \\limsup_{k \\to \\infty} f_k(\\by) \\\\
&= \\lambda f(\\bx) + (1-\\lambda) f(\\by) .
\\end{aligned}`})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["dieselbe Kette zeigt damit ohne Zusatzarbeit: Ist ",e.jsx(n,{children:"\\limsup_k f_k"})," überall endlich, so ist auch diese Funktion konvex, ganz ohne Konvergenzannahme"]}),children:e.jsxs(i.p,{children:[`Weil hier alle drei Folgen konvergieren, kämen wir auch mit den gewöhnlichen Grenzwertregeln
aus. Der Umweg über den Limes superior kostet nichts und ist robuster: Er existiert immer,
notfalls mit dem Wert `,e.jsx(n,{children:"+\\infty"}),", und braucht die Konvergenz erst in der letzten Zeile."]})})]})}),`
`,e.jsx(i.p,{children:"Jetzt die beiden Übungen. Wer will, deckt die Lösungen ab und rechnet selbst."}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.4.2 (Übung: die Summe zweier konvexer Funktionen)",id:"env-uebung-die-summe-zweier-konvexer",children:[e.jsxs(i.p,{children:["Zu zeigen ist Teil (1) von ",e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),": Sind ",e.jsx(n,{children:"f_1"})," und ",e.jsx(n,{children:"f_2"})," konvex, so ist ",e.jsx(n,{children:"f = f_1 + f_2"}),`
konvex. Zwei Ungleichungen stehen bereit, gesucht ist eine.`]}),e.jsxs("details",{className:"mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium",children:"Lösung anzeigen"}),e.jsxs("div",{className:"space-y-2 pt-2",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),". Die Konvexität von ",e.jsx(n,{children:"f_1"}),` und von
`,e.jsx(n,{children:"f_2"})," liefert je eine Ungleichung, und beide zeigen in dieselbe Richtung:"]}),e.jsx(a,{children:`\\begin{aligned}
f(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by})
&= f_1(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}) + f_2(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}) \\\\
&\\le \\left[\\lambda f_1(\\bx) + (1-\\lambda) f_1(\\by)\\right]
 + \\left[\\lambda f_2(\\bx) + (1-\\lambda) f_2(\\by)\\right] \\\\
&= \\lambda \\left[f_1(\\bx) + f_2(\\bx)\\right] + (1-\\lambda)\\left[f_1(\\by) + f_2(\\by)\\right] \\\\
&= \\lambda f(\\bx) + (1-\\lambda) f(\\by) .
\\end{aligned}`}),e.jsxs(i.p,{children:[`Der einzige Schritt, der etwas verlangt, ist der zweite: Zwei Ungleichungen mit demselben
Zeichen dürfen addiert werden. Sortiert wird danach nur noch nach `,e.jsx(n,{children:"\\bx"})," und ",e.jsx(n,{children:"\\by"}),"."]})]})]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.4.3 (Übung: das punktweise Maximum)",id:"env-uebung-das-punktweise-maximum",children:[e.jsxs(i.p,{children:["Zu zeigen ist Teil (3) von ",e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),` für endlich viele Funktionen: Sind
`,e.jsx(n,{children:"f_1, \\dots, f_m"})," konvex, so ist ",e.jsx(n,{children:"f(\\bx) = \\max_{i \\le m} f_i(\\bx)"}),` konvex. Der Trick steckt
in der Frage, `,e.jsx(i.em,{children:"welches"})," ",e.jsx(n,{children:"i"})," das Maximum liefert."]}),e.jsxs("details",{className:"mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium",children:"Lösung anzeigen"}),e.jsxs("div",{className:"space-y-2 pt-2",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`, und sei wieder
`,e.jsx(n,{children:"\\cgreen{\\bz} = \\cgreen{\\lambda\\bx + (1-\\lambda)\\by}"}),`. Weil es nur endlich viele Funktionen
sind, wird das Maximum an der Stelle `,e.jsx(n,{children:"\\cgreen{\\bz}"})," angenommen: Wir wählen ein"]}),e.jsx(a,{children:`j \\in \\argmax_{i \\le m} f_i(\\cgreen{\\bz}) ,
\\qquad \\text{also} \\qquad
f(\\cgreen{\\bz}) = f_j(\\cgreen{\\bz}) .`}),e.jsxs(i.p,{children:["Für dieses eine ",e.jsx(n,{children:"j"})," rechnen wir:"]}),e.jsx(a,{children:`f(\\cgreen{\\bz}) = f_j(\\cgreen{\\bz})
\\le \\lambda f_j(\\bx) + (1-\\lambda) f_j(\\by)
\\le \\lambda f(\\bx) + (1-\\lambda) f(\\by) .`}),e.jsxs(i.p,{children:["Die erste Ungleichung ist die Konvexität von ",e.jsx(n,{children:"f_j"}),`. Die zweite benutzt
`,e.jsx(n,{children:"f_j \\le f"})," punktweise, denn ",e.jsx(n,{children:"f"})," ist ja das Maximum über alle ",e.jsx(n,{children:"i"}),`, und dass die Gewichte
`,e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1-\\lambda"})," nichtnegativ sind."]}),e.jsxs(i.p,{children:["Der Index ",e.jsx(n,{children:"j"})," hängt von ",e.jsx(n,{children:"\\cgreen{\\bz}"})," ab, und an den Stellen ",e.jsx(n,{children:"\\bx"})," und ",e.jsx(n,{children:"\\by"}),` maximiert
womöglich ein ganz anderer Index. Das stört nicht: Gebraucht wird `,e.jsx(n,{children:"j"}),` nur auf der linken
Seite, und rechts schätzen wir sofort wieder gegen das Maximum ab. Genau deshalb funktioniert
die Fallunterscheidung, ohne dass wir die Stücke des Maximums je einzeln verfolgen müssten.`]}),e.jsxs(i.p,{children:[`Für unendlich viele Funktionen gibt es kein Argmax mehr. Dann argumentieren wir ohne
Fallunterscheidung: Für jedes einzelne `,e.jsx(n,{children:"i"})," ist"]}),e.jsx(a,{children:`f_i(\\cgreen{\\bz}) \\le \\lambda f_i(\\bx) + (1-\\lambda) f_i(\\by)
\\le \\lambda f(\\bx) + (1-\\lambda) f(\\by) ,`}),e.jsxs(i.p,{children:["und die rechte Seite hängt nicht mehr von ",e.jsx(n,{children:"i"}),` ab. Sie ist damit eine obere Schranke für alle
`,e.jsx(n,{children:"f_i(\\cgreen{\\bz})"}),", also auch für deren Supremum ",e.jsx(n,{children:"f(\\cgreen{\\bz})"}),"."]})]})]})]}),`
`,e.jsx(L,{title:"Was die vier Regeln zusammen hergeben",children:e.jsxs(j,{kind:"Bemerkung",label:"11.4.4 (Was die vier Regeln zusammen hergeben)",id:"env-was-die-vier-regeln-zusammen-hergeben",children:[e.jsxs(i.p,{children:["Aus (1) und (2) folgt per Induktion sofort mehr: Jede ",e.jsx(i.em,{children:"nichtnegative Linearkombination"}),`
`,e.jsx(n,{children:"\\sum_{i=1}^m c_i f_i"})," mit ",e.jsx(n,{children:"c_i \\ge 0"}),` konvexer Funktionen ist konvex. Die konvexen Funktionen
auf `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),` bilden also einen konvexen Kegel, ganz analog zum Kegel der positiv
semidefiniten Matrizen aus `,e.jsx(i.a,{href:"#env-die-positiv-semidefiniten-matrizen",children:"Satz 11.2.8"}),"."]}),e.jsxs(i.p,{children:["Die Vorzeichenbedingung ist unverzichtbar. Für ",e.jsx(n,{children:"c < 0"})," dreht sich die Ungleichung, ",e.jsx(n,{children:"c f_1"}),` ist
dann konkav. Deshalb ist auch die Differenz zweier konvexer Funktionen im Allgemeinen weder
konvex noch konkav: Mit `,e.jsx(n,{children:"f_1(x) = x^2"})," und ",e.jsx(n,{children:"f_2(x) = 2x^2"}),` ist
`,e.jsx(n,{children:"\\cred{f_1 - f_2} = -x^2"})," konkav, mit ",e.jsx(n,{children:"f_2(x) = \\tfrac{1}{2}x^2"}),` dagegen bliebe die Differenz
konvex.`]}),e.jsxs(i.p,{children:[`Zu (3) trägt nur die Supremum-Fassung, denn ein Maximum über unendlich viele Werte muss weder
angenommen werden noch endlich sein: Für `,e.jsx(n,{children:"f_i(x) = i\\,x^2"}),` ist das Supremum in jedem
`,e.jsx(n,{children:"x \\neq 0"})," gleich ",e.jsx(n,{children:"+\\infty"}),", und über solche Funktionen redet ",e.jsx(i.a,{href:"#env-konvexe-funktion",children:"Definition 11.3.6"}),`
nicht.`]}),e.jsxs(i.p,{children:[`Regel (4) erhält die Konvexität, nicht aber die Glattheit: Die Funktionen
`,e.jsx(n,{children:"f_k(x) = \\left|x\\right|^{1+1/k}"})," sind konvex und überall differenzierbar, auch in ",e.jsx(n,{children:"x = 0"}),` mit
`,e.jsx(n,{children:"f_k'(0) = 0"}),", streben punktweise aber gegen ",e.jsx(n,{children:"\\left|x\\right|"}),` und damit gegen eine Funktion mit
Knick. Das ist einer der Gründe, warum wir am Ende dieses Abschnitts einen Ersatz für die
Tangente brauchen.`]})]})}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.4.5 (Zielfunktionen aus Bausteinen)",id:"env-zielfunktionen-aus-bausteinen",children:[e.jsxs(i.p,{children:[`Die Regeln erledigen Fälle, die aus der Definition heraus mühsam wären. Wir sammeln vier
Beispiele ein, deren Bausteine wir schon kennen: `,e.jsx(b,{id:"norm",children:"Normen"}),` sind konvex, quadratische
Funktionen mit positiv semidefinitem symmetrischen Anteil ebenfalls, und affine Funktionen sind
sogar zugleich konvex und konkav (alles `,e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ridge-Regression."}),` Die Zielfunktion
`,e.jsx(n,{children:"f(\\bw) = \\left\\|\\bA\\bw - \\by\\right\\|^2 + \\lambda\\left\\|\\bw\\right\\|^2"}),` ist eine Summe zweier
konvexer Funktionen, der zweite Summand zusätzlich mit dem Faktor `,e.jsx(n,{children:"\\lambda \\ge 0"}),` versehen.
Regeln (1) und (2) geben die Konvexität, ohne dass wir eine einzige Ungleichung nachrechnen.
`,e.jsx(i.a,{href:"#env-kleinste-quadrate-und-ridge",children:"Beispiel 11.3.16"}),` ist denselben Weg noch über die quadratische Form gegangen und hat dabei mehr
herausgeholt, nämlich strikte Konvexität für `,e.jsx(n,{children:"\\lambda > 0"}),`; die Regeln allein liefern das
nicht. Ihr Vorteil zeigt sich beim nächsten Punkt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"LASSO."})," Ersetzen wir den Strafterm durch ",e.jsx(n,{children:"\\lambda\\left\\|\\bw\\right\\|_1"}),`, ändert sich am
Argument nichts, denn auch die `,e.jsx(n,{children:"\\ell_1"}),"-Norm ist eine Norm – ",e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"}),`
greift hier dagegen nicht mehr. Die Zielfunktion bleibt konvex, ist aber an den Stellen mit
`,e.jsx(n,{children:"w_j = 0"})," nicht differenzierbar."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Hinge-Verlust und Support Vector Machines."})," Der Verlust ",e.jsx(n,{children:"\\ell(u) = \\max\\{0,\\, 1 - u\\}"}),` ist das
Maximum zweier affiner Funktionen, nach Regel (3) also konvex. Setzen wir
`,e.jsx(n,{children:"u = y_i\\,\\bx_i^\\top\\bbeta"}),` ein, so steht dort
`,e.jsx(n,{children:"\\max\\{0,\\, 1 - y_i\\,\\bx_i^\\top\\bbeta\\}"}),`, wieder ein Maximum zweier affiner Funktionen, diesmal
in `,e.jsx(n,{children:"\\bbeta"}),`. Regel (3) greift also unmittelbar, und die Summe über die Beobachtungen ist nach
Regel (1) wieder konvex. Den Umweg über eine Regel für Verkettungen brauchen wir nicht.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Vom empirischen zum theoretischen Risiko."})," Ist ",e.jsx(n,{children:"\\btheta \\mapsto \\ell(\\btheta; \\bz)"}),` für jede
Beobachtung konvex, so ist das empirische Risiko
`,e.jsx(n,{children:"R_n(\\btheta) = \\tfrac{1}{n}\\sum_{i=1}^n \\ell(\\btheta; \\bz_i)"}),` als nichtnegative
Linearkombination konvex, und weil es nach dem Gesetz der großen Zahlen punktweise gegen das
theoretische Risiko `,e.jsx(n,{children:"R(\\btheta) = \\E[\\ell(\\btheta; \\bZ)]"}),` strebt, überträgt Regel (4) die
Konvexität auf den Grenzwert.`]})]}),`
`,e.jsx(i.h3,{children:"Die Jensen-Ungleichung"}),`
`,e.jsxs(i.p,{children:[`Die Definition der Konvexität spricht über zwei Punkte. Konvexkombinationen aus
`,e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"}),` dürfen beliebig viele Punkte mischen. Der folgende Satz schließt
die Lücke.`]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.4.6 (Jensen-Ungleichung)",id:"env-jensen-ungleichung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex und ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),` konvex. Dann gilt
für alle `,e.jsx(n,{children:"N \\in \\N"}),", alle ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_N \\in \\cblue{\\Xcal}"}),` und alle Gewichte
`,e.jsx(n,{children:"w_1, \\dots, w_N \\ge 0"})," mit ",e.jsx(n,{children:"\\sum_{i=1}^N w_i = 1"})]}),e.jsx(ke,{tag:"11.4.1",id:"eq-jensen-ungleichung",children:"f\\left(\\cgreen{\\sum_{i=1}^N w_i \\bx_i}\\right) \\le \\cgreen{\\sum_{i=1}^N w_i f(\\bx_i)} ."})]}),`
`,e.jsx(L,{title:"Induktionsbeweis der Jensen-Ungleichung",children:e.jsxs(Z,{children:[e.jsx(z,{why:e.jsx(e.Fragment,{children:"die Jensen-Ungleichung ist also keine neue Eigenschaft, sondern die Definition, mehrfach angewandt"}),children:e.jsxs(i.p,{children:["Induktion über ",e.jsx(n,{children:"N"}),". Für ",e.jsx(n,{children:"N = 1"})," ist ",e.jsx(n,{children:"w_1 = 1"}),", und auf beiden Seiten steht ",e.jsx(n,{children:"f(\\bx_1)"}),`. Für
`,e.jsx(n,{children:"N = 2"})," ist ",e.jsx(i.a,{href:"#eq-jensen-ungleichung",children:"(11.4.1)"})," mit ",e.jsx(n,{children:"\\lambda := w_1"})," und ",e.jsx(n,{children:"w_2 = 1 - \\lambda"}),` wörtlich die Definition
einer konvexen Funktion.`]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["hier zahlt sich ",e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"})," aus: Eine konvexe Menge enthält nicht nur die Verbindungsstrecken je zweier Punkte, sondern alle endlichen Konvexkombinationen. Ohne diese Aussage wüssten wir nicht, dass ",e.jsx(n,{children:"f(\\cgreen{\\bz})"})," überhaupt definiert ist"]}),children:[e.jsxs(i.p,{children:["Sei nun ",e.jsx(n,{children:"N \\ge 3"})," und die Behauptung für ",e.jsx(n,{children:"N-1"})," Punkte bereits bewiesen. Ist ",e.jsx(n,{children:"w_N = 1"}),`, so sind
alle übrigen Gewichte null, und beide Seiten sind `,e.jsx(n,{children:"f(\\bx_N)"}),". Sei also ",e.jsx(n,{children:"w_N < 1"})," und"]}),e.jsx(a,{children:`s := \\sum_{i=1}^{N-1} w_i = 1 - w_N > 0 ,
\\qquad
\\cgreen{\\bz} := \\cgreen{\\sum_{i=1}^{N-1} \\frac{w_i}{s}\\, \\bx_i} .`}),e.jsxs(i.p,{children:["Die Koeffizienten ",e.jsx(n,{children:"w_i/s"})," sind nichtnegativ und summieren sich zu ",e.jsx(n,{children:"1"}),`, also ist
`,e.jsx(n,{children:"\\cgreen{\\bz}"})," eine Konvexkombination von ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_{N-1}"}),` und liegt in
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),"."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die erste Ungleichung ist die Definition der Konvexität für die zwei Punkte ",e.jsx(n,{children:"\\cgreen{\\bz}"})," und ",e.jsx(n,{children:"\\bx_N"}),", die zweite ist die Induktionsvoraussetzung, multipliziert mit ",e.jsx(n,{children:"s \\ge 0"}),". Im letzten Schritt kürzt sich ",e.jsx(n,{children:"s"})," heraus"]}),children:[e.jsxs(i.p,{children:["Nach Konstruktion ist ",e.jsx(n,{children:"\\cgreen{\\sum_{i=1}^N w_i \\bx_i} = s\\,\\cgreen{\\bz} + w_N \\bx_N"}),` eine
Konvexkombination der beiden Punkte `,e.jsx(n,{children:"\\cgreen{\\bz}"})," und ",e.jsx(n,{children:"\\bx_N"}),", denn ",e.jsx(n,{children:"s + w_N = 1"}),` und beide
Gewichte sind nichtnegativ. Damit rechnen wir`]}),e.jsx(a,{children:`\\begin{aligned}
f\\left(\\cgreen{\\sum_{i=1}^N w_i \\bx_i}\\right)
&= f\\left(s\\,\\cgreen{\\bz} + w_N \\bx_N\\right) \\\\
&\\le s\\,f(\\cgreen{\\bz}) + w_N f(\\bx_N) \\\\
&\\le s \\sum_{i=1}^{N-1} \\frac{w_i}{s}\\, f(\\bx_i) + w_N f(\\bx_N)
= \\cgreen{\\sum_{i=1}^N w_i f(\\bx_i)} .
\\end{aligned}`})]})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.4.7 (Gewichte als Wahrscheinlichkeiten)",id:"env-gewichte-als-wahrscheinlichkeiten",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-der-erwartungswert-ist-eine",children:"Beispiel 11.1.3"}),` hat den Erwartungswert einer Zufallsvariablen mit endlichem Träger als
Konvexkombination gelesen: Die Gewichte sind die Wahrscheinlichkeiten, der
`,e.jsx(b,{id:"expected-value",children:"Erwartungswert"}),` ist also selbst eine Mischung. In dieser Sprache lautet
`,e.jsx(i.a,{href:"#eq-jensen-ungleichung",children:"(11.4.1)"})]}),e.jsx(a,{children:"f\\left(\\cgreen{\\E[X]}\\right) \\le \\cgreen{\\E\\!\\left[f(X)\\right]} ,"}),e.jsx(i.p,{children:`und das ist die Form, in der die Jensen-Ungleichung meist zitiert wird. Erst mischen und dann
auswerten gibt höchstens so viel wie erst auswerten und dann mischen.`}),e.jsxs(i.p,{children:["Zwei Einschränkungen sind dabei zu beachten. ",e.jsx(i.a,{href:"#env-jensen-ungleichung",children:"Satz 11.4.6"}),` deckt nur endlich viele Punkte ab,
also Zufallsvariablen mit endlichem Träger. Für allgemeine integrierbare `,e.jsx(n,{children:"X"}),` gilt die
Ungleichung ebenfalls, der Beweis läuft dann aber nicht mehr über die Induktion; am Ende dieses
Abschnitts fällt er als Nebenprodukt der Stützgeraden ab (`,e.jsx(i.a,{href:"#env-randpunkte-und-wozu-subgradienten-gut",children:"Bemerkung 11.4.17"}),`). Und für konkave
`,e.jsx(n,{children:"f"})," dreht sich alles um: Dort gilt ",e.jsx(n,{children:"f(\\E[X]) \\ge \\E[f(X)]"}),`, was etwa beim Logarithmus in
Likelihood-Rechnungen ständig gebraucht wird.`]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.4.8 (Die Varianz ist nicht negativ)",id:"env-die-varianz-ist-nicht-negativ",children:[e.jsxs(i.p,{children:[`Aus der Jensen-Ungleichung folgt eine Aussage, die wir längst benutzen, ohne sie je
bewiesen zu haben. Die Funktion `,e.jsx(n,{children:"f(x) = x^2"})," ist konvex auf ",e.jsx(n,{children:"\\R"}),". Für eine Zufallsvariable ",e.jsx(n,{children:"X"}),`
mit endlichem Träger liefert `,e.jsx(i.a,{href:"#env-gewichte-als-wahrscheinlichkeiten",children:"Bemerkung 11.4.7"})," damit"]}),e.jsx(a,{children:`\\left(\\cgreen{\\E[X]}\\right)^2 = f\\left(\\cgreen{\\E[X]}\\right)
\\le \\cgreen{\\E\\!\\left[f(X)\\right]} = \\cgreen{\\E\\!\\left[X^2\\right]} ,`}),e.jsx(i.p,{children:"und Umstellen ergibt"}),e.jsx(a,{children:"\\var(X) = \\E\\!\\left[X^2\\right] - \\left(\\E[X]\\right)^2 \\ge 0 ."}),e.jsxs(i.p,{children:["Der faire Würfel aus ",e.jsx(i.a,{href:"#env-der-erwartungswert-ist-eine",children:"Beispiel 11.1.3"})," zeigt die Größenordnung: ",e.jsx(n,{children:"\\E[X] = 3{,}5"}),` und
`,e.jsx(n,{children:"\\left(\\E[X]\\right)^2 = 12{,}25"})," stehen gegen ",e.jsx(n,{children:"\\E[X^2] = \\tfrac{91}{6} \\approx 15{,}17"}),`, und
die Differenz `,e.jsx(n,{children:"\\tfrac{35}{12} \\approx 2{,}92"})," ist die ",e.jsx(b,{id:"variance",children:"Varianz"}),`. Gleichheit tritt genau dann ein,
wenn die Varianz verschwindet, wenn also `,e.jsx(n,{children:"X"})," mit Wahrscheinlichkeit ",e.jsx(n,{children:"1"}),` konstant ist. Die
Jensen-Lücke misst hier direkt die Streuung.`]})]}),`
`,e.jsxs(we,{title:"Die Jensen-Ungleichung zum Schieben",children:[e.jsxs(i.p,{children:[`Der Satz sagt, dass zwei Zahlen in einer bestimmten Reihenfolge stehen. Sehen wir sie uns an.
Drei feste Stützstellen bekommen einstellbare Gewichte, und das Widget zeichnet beide Seiten
von `,e.jsx(i.a,{href:"#eq-jensen-ungleichung",children:"(11.4.1)"})," über derselben Stelle ",e.jsx(n,{children:"\\cgreen{\\sum_i w_i x_i}"}),`: orange den Funktionswert der
Mischung, grün die Mischung der Funktionswerte. Wie groß ist der Abstand zwischen beiden, und
bei welcher Reglerstellung verschwindet er?`]}),e.jsx(xr,{}),e.jsxs(i.p,{children:["Das grüne Dreieck ist die konvexe Hülle der drei Punkte auf dem Graphen. Bei konvexem ",e.jsx(n,{children:"f"}),` liegt
es nie unter der Kurve, seine Ecken berühren sie ja. Der grüne Punkt kann den orangen deshalb
nie unterbieten. Für
`,e.jsx(n,{children:"f(x) = x^2"})," und gleiche Gewichte stehen ",e.jsx(n,{children:"3{,}3611"})," gegen ",e.jsx(n,{children:"4{,}9167"}),`, die Lücke beträgt
`,e.jsx(n,{children:"1{,}5556"}),". Das ist genau die gewichtete Varianz der drei Stützstellen, denn für ",e.jsx(n,{children:"x \\mapsto x^2"}),`
ist die Jensen-Lücke nach `,e.jsx(i.a,{href:"#env-die-varianz-ist-nicht-negativ",children:"Beispiel 11.4.8"}),` die Differenz
`,e.jsx(n,{children:"\\E[X^2] - \\left(\\E[X]\\right)^2"}),". Bei ",e.jsx(n,{children:"f(x) = e^x"})," wächst die Lücke auf ",e.jsx(n,{children:"6{,}8273"}),`, weil die
Krümmung dort viel stärker zunimmt. Die dritte Wahl ist eine Gegenprobe: `,e.jsx(n,{children:"\\sqrt{x}"}),` ist konkav,
und prompt tauschen die beiden Markierungen die Plätze, `,e.jsx(n,{children:"1{,}2676"})," gegen ",e.jsx(n,{children:"1{,}3540"}),`. Und wer
alles Gewicht auf eine einzige Stützstelle schiebt, erzeugt den Gleichheitsfall: Dann steht
auf beiden Seiten derselbe Wert, so wie bei einer Zufallsvariablen mit Varianz `,e.jsx(n,{children:"0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Konvexität an der Ableitung ablesen"}),`
`,e.jsxs(i.p,{children:[`Bisher haben wir Konvexität aus Konvexität gemacht. Die Bausteine selbst mussten wir immer noch
aus der Definition heraus prüfen. Für zweimal stetig differenzierbare Funktionen geht es
bequemer, und das Ergebnis verbindet dieses Kapitel mit
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),"."]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.4.9 (Konvexe Funktionen von Vektoren zu Skalaren)",id:"env-konvexe-funktionen-von-vektoren-zu",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," eine ",e.jsx(i.em,{children:"offene"}),`, konvexe Menge und
`,e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"})," zweimal stetig differenzierbar, also ",e.jsx(n,{children:"f \\in \\Ccal^2"}),`. Dann sind
die folgenden Aussagen äquivalent:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"f"})," ist konvex."]}),`
`,e.jsxs(i.li,{children:["Mit dem ",e.jsx(b,{id:"gradient",children:"Gradienten"})," gilt für alle ",e.jsx(n,{children:"\\corange{\\bx}, \\by \\in \\cblue{\\Xcal}"}),`
`,e.jsx(ke,{tag:"11.4.2",id:"eq-konvexe-funktionen-von-vektoren-zu",children:"f(\\by) \\ge f(\\corange{\\bx}) + \\nabla f(\\corange{\\bx})\\,(\\by - \\corange{\\bx}) ."}),`
`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(b,{id:"hessian-matrix",children:"Hesse-Matrix"})," ",e.jsx(n,{children:"\\bH_f(\\bx)"}),` ist
`,e.jsx(b,{id:"positive-definite",children:"positiv semidefinit"})," für alle ",e.jsx(n,{children:"\\bx \\in \\cblue{\\Xcal}"}),"."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Alle drei Aussagen beschreiben dieselbe Krümmungseigenschaft, jede aus einer anderen
Entfernung. Aussage (1) ist die Sehnenbedingung: Die Verbindungsstrecke zwischen zwei Punkten
des Graphen verläuft nie unter dem Graphen. Aussage (2) ist die Tangentenbedingung: Die
Tangentialebene im Punkt `,e.jsx(n,{children:"\\corange{\\bx}"}),` verläuft nie über dem Graphen, die lineare Näherung
unterschätzt `,e.jsx(n,{children:"f"}),` also überall. Aussage (3) ist die punktweise Krümmungsbedingung: In keiner
Richtung und an keiner Stelle krümmt sich `,e.jsx(n,{children:"f"}),` nach unten, denn die
`,e.jsx(b,{id:"quadratic-form",children:"quadratische Form"})," ",e.jsx(n,{children:"\\bh^\\top\\bH_f(\\bx)\\bh"}),` ist überall nichtnegativ. In
einer Variablen schrumpft (3) auf die Schulregel `,e.jsx(n,{children:"f'' \\ge 0"})," zusammen."]}),`
`,e.jsxs(i.p,{children:[`Die Äquivalenz von (1) und (3) haben wir in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"})," als ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"}),` schon einmal gesehen, damals
ohne Beweis. Den holen wir jetzt nach, und zwar über (2) als Drehscheibe.`]}),`
`,e.jsx(L,{title:"Beweis der drei Charakterisierungen",children:e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["in der zweiten Zeile ist ",e.jsx(n,{children:"\\lambda = 1 - t"})," eingesetzt und ",e.jsx(n,{children:"f(\\corange{\\bx})"})," auf beiden Seiten abgezogen; in der dritten wird durch ",e.jsx(n,{children:"t > 0"})," geteilt, das Ungleichheitszeichen bleibt also stehen. Dass der Punkt ",e.jsx(n,{children:"\\corange{\\bx} + t(\\by - \\corange{\\bx})"})," überhaupt in ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," liegt, ist die Konvexität der Menge"]}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(1) ",e.jsx(n,{children:"\\Rightarrow"})," (2)."]})," Seien ",e.jsx(n,{children:"\\corange{\\bx}, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in (0,1)"}),`.
Wir setzen `,e.jsx(n,{children:"t := 1 - \\lambda \\in (0,1)"}),` und beobachten
`,e.jsx(n,{children:"\\cgreen{\\lambda\\corange{\\bx} + (1-\\lambda)\\by} = \\corange{\\bx} + t\\,(\\by - \\corange{\\bx})"}),`.
Die Konvexität liefert`]}),e.jsx(a,{children:`\\begin{aligned}
f\\left(\\corange{\\bx} + t(\\by - \\corange{\\bx})\\right)
&\\le \\lambda f(\\corange{\\bx}) + (1-\\lambda) f(\\by) \\\\
\\iff \\quad
f\\left(\\corange{\\bx} + t(\\by - \\corange{\\bx})\\right) - f(\\corange{\\bx})
&\\le t\\left[f(\\by) - f(\\corange{\\bx})\\right] \\\\
\\iff \\quad
\\frac{f\\left(\\corange{\\bx} + t(\\by - \\corange{\\bx})\\right) - f(\\corange{\\bx})}{t}
&\\le f(\\by) - f(\\corange{\\bx}) .
\\end{aligned}`})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["der Grenzwert eines Differenzenquotienten ist die Ableitung in Richtung ",e.jsx(n,{children:"\\bh"}),", siehe ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),"; schwache Ungleichungen bleiben beim Grenzübergang erhalten, strikte nicht"]}),children:[e.jsxs(i.p,{children:[`Auf der linken Seite steht ein Differenzenquotient in Richtung
`,e.jsx(n,{children:"\\bh := \\by - \\corange{\\bx}"}),". Weil ",e.jsx(n,{children:"f"})," differenzierbar ist, strebt er für ",e.jsx(n,{children:"t \\to 0^+"}),` gegen die
Richtungsableitung `,e.jsx(n,{children:"\\nabla f(\\corange{\\bx})\\,\\bh"}),". Die rechte Seite hängt nicht von ",e.jsx(n,{children:"t"}),` ab, die
Ungleichung überlebt den Grenzübergang, und wir erhalten`]}),e.jsx(a,{children:"\\nabla f(\\corange{\\bx})\\,(\\by - \\corange{\\bx}) \\le f(\\by) - f(\\corange{\\bx}) ,"}),e.jsxs(i.p,{children:["also ",e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"}),". Der Fall ",e.jsx(n,{children:"\\by = \\corange{\\bx}"}),` war nicht mitgerechnet, dort steht in
`,e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"})," aber ohnehin nur ",e.jsx(n,{children:"f(\\corange{\\bx}) \\ge f(\\corange{\\bx})"}),"."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["beide Ungleichungen werden mit den nichtnegativen Zahlen ",e.jsx(n,{children:"\\lambda"})," und ",e.jsx(n,{children:"1-\\lambda"})," multipliziert, das Zeichen bleibt. Der Gradient ",e.jsx(n,{children:"\\nabla f(\\cgreen{\\bz})"})," ist in beiden Zeilen derselbe Zeilenvektor und lässt sich ausklammern, deshalb verschwindet er mit der Klammer"]}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(2) ",e.jsx(n,{children:"\\Rightarrow"})," (1)."]})," Seien ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\lambda \\in [0,1]"}),`. Wir setzen
`,e.jsx(n,{children:"\\cgreen{\\bz} := \\cgreen{\\lambda\\bx + (1-\\lambda)\\by} \\in \\cblue{\\Xcal}"})," und wenden ",e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"}),`
zweimal an, einmal mit `,e.jsx(n,{children:"\\cgreen{\\bz}"})," als Entwicklungspunkt und ",e.jsx(n,{children:"\\bx"}),` als Argument, einmal mit
`,e.jsx(n,{children:"\\by"}),":"]}),e.jsx(a,{children:`\\begin{aligned}
\\lambda f(\\bx) &\\ge \\lambda f(\\cgreen{\\bz}) + \\lambda \\nabla f(\\cgreen{\\bz})(\\bx - \\cgreen{\\bz}) , \\\\
(1-\\lambda) f(\\by) &\\ge (1-\\lambda) f(\\cgreen{\\bz})
 + (1-\\lambda)\\nabla f(\\cgreen{\\bz})(\\by - \\cgreen{\\bz}) .
\\end{aligned}`}),e.jsx(i.p,{children:"Addieren wir beide Zeilen, so fällt der Gradiententerm weg:"}),e.jsx(a,{children:`\\lambda(\\bx - \\cgreen{\\bz}) + (1-\\lambda)(\\by - \\cgreen{\\bz})
= \\cgreen{\\lambda\\bx + (1-\\lambda)\\by} - \\cgreen{\\bz} = \\bnull ,`}),e.jsxs(i.p,{children:["und es bleibt ",e.jsx(n,{children:"\\lambda f(\\bx) + (1-\\lambda) f(\\by) \\ge f(\\cgreen{\\bz})"}),`, also genau die
Definition der Konvexität.`]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["der Faktor ",e.jsx(n,{children:"2"})," vor der eckigen Klammer kommt aus dem ",e.jsx(n,{children:"\\tfrac{1}{2}"})," der Taylorformel; wer ihn vergisst, verschiebt die Kette um den Faktor ",e.jsx(n,{children:"2"}),", am Vorzeichen und damit an der Schlussfolgerung ändert das nichts"]}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(2) ",e.jsx(n,{children:"\\Rightarrow"})," (3)."]})," Sei ",e.jsx(n,{children:"\\bx \\in \\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\bh \\in \\R^n"}),` beliebig. Weil
`,e.jsx(n,{children:"\\cblue{\\Xcal}"})," offen ist, liegt ",e.jsx(n,{children:"\\bx + t\\bh"})," für alle hinreichend kleinen ",e.jsx(n,{children:"t > 0"}),` noch in
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),". Die ",e.jsx(b,{id:"taylor-theorem",children:"Taylorentwicklung"})," zweiter Ordnung aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"})," lautet"]}),e.jsx(a,{children:`f(\\bx + t\\bh) = f(\\bx) + t\\,\\nabla f(\\bx)\\,\\bh
+ \\frac{t^2}{2}\\,\\bh^\\top \\bH_f(\\bx)\\,\\bh + \\cred{o(t^2)} .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"})," mit ",e.jsx(n,{children:"\\by = \\bx + t\\bh"}),` ist die linke Seite mindestens
`,e.jsx(n,{children:"f(\\bx) + t\\,\\nabla f(\\bx)\\bh"}),". Umgestellt heißt das"]}),e.jsx(a,{children:`\\bh^\\top \\bH_f(\\bx)\\,\\bh
= \\frac{2\\left[f(\\bx + t\\bh) - f(\\bx) - t\\,\\nabla f(\\bx)\\bh\\right]}{t^2} + \\cred{o(1)}
\\ \\ge\\ 0 + \\cred{o(1)} \\ \\longrightarrow \\ 0 \\qquad (t \\to 0^+) .`}),e.jsxs(i.p,{children:["Die linke Seite hängt nicht von ",e.jsx(n,{children:"t"})," ab, also ist sie nichtnegativ. Da ",e.jsx(n,{children:"\\bh"}),` beliebig war, ist
`,e.jsx(n,{children:"\\bH_f(\\bx)"})," positiv semidefinit."]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"g"})," ist die Verkettung von ",e.jsx(n,{children:"f"})," mit der affinen Kurve ",e.jsx(n,{children:"s \\mapsto \\corange{\\bx} + s(\\by - \\corange{\\bx})"}),", deren Ableitung konstant ",e.jsx(n,{children:"\\by - \\corange{\\bx}"})," ist; die zweite Ableitung ist dann die quadratische Form der Hesse-Matrix an der laufenden Stelle, vgl. ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"})]}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(3) ",e.jsx(n,{children:"\\Rightarrow"})," (2)."]})," Seien ",e.jsx(n,{children:"\\corange{\\bx}, \\by \\in \\cblue{\\Xcal}"}),". Weil ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`
konvex ist, liegt die ganze Verbindungsstrecke in `,e.jsx(n,{children:"\\cblue{\\Xcal}"}),", und wir dürfen ",e.jsx(n,{children:"f"}),` darauf
einschränken:`]}),e.jsx(a,{children:"g(s) := f\\left(\\corange{\\bx} + s(\\by - \\corange{\\bx})\\right) , \\qquad s \\in [0,1] ."}),e.jsxs(i.p,{children:["Nach der Kettenregel aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"})," ist ",e.jsx(n,{children:"g"}),` zweimal stetig
differenzierbar mit`]}),e.jsx(a,{children:`g'(s) = \\nabla f\\left(\\corange{\\bx} + s(\\by - \\corange{\\bx})\\right)(\\by - \\corange{\\bx}) ,
\\qquad
g''(s) = (\\by - \\corange{\\bx})^\\top
 \\bH_f\\left(\\corange{\\bx} + s(\\by - \\corange{\\bx})\\right)(\\by - \\corange{\\bx}) .`})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["hier geht die Konvexität von ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," ein zweites Mal ein: Ohne sie wüssten wir nicht, dass die Hesse-Matrix an der Zwischenstelle überhaupt zur Verfügung steht"]}),children:[e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"g"}),` wenden wir die eindimensionale Taylorentwicklung mit Lagrange-Restglied an
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-taylorentwicklung-i",children:"Satz 10.8.2"})," mit ",e.jsx(n,{children:"k = 1"}),"): Es gibt ein ",e.jsx(n,{children:"t \\in (0,1)"}),` mit
`,e.jsx(n,{children:"g(1) = g(0) + g'(0) + \\tfrac{1}{2}g''(t)"}),", ausgeschrieben"]}),e.jsx(a,{children:`f(\\by) = f(\\corange{\\bx}) + \\nabla f(\\corange{\\bx})(\\by - \\corange{\\bx})
+ \\tfrac{1}{2}(\\by - \\corange{\\bx})^\\top
 \\bH_f\\!\\left(\\corange{\\bx} + t(\\by - \\corange{\\bx})\\right)(\\by - \\corange{\\bx}) .`}),e.jsxs(i.p,{children:[`Der letzte Summand ist nach (3) nichtnegativ, denn die Zwischenstelle
`,e.jsx(n,{children:"\\corange{\\bx} + t(\\by - \\corange{\\bx})"})," liegt in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`. Weglassen macht die rechte
Seite also nur kleiner, und es folgt `,e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"}),"."]}),e.jsxs(i.p,{children:["Damit ist der Ring geschlossen: Die Schritte 1 bis 3 zeigen (1) ",e.jsx(n,{children:"\\Leftrightarrow"}),` (2), die
Schritte 4 bis 6 zeigen (2) `,e.jsx(n,{children:"\\Leftrightarrow"})," (3)."]})]})]})}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.4.10 (Wo die Voraussetzungen stecken)",id:"env-wo-die-voraussetzungen-stecken",children:[e.jsxs(i.p,{children:["Der Satz nennt drei Bedingungen an ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"f"}),`, und jede wird an einer bestimmten
Stelle gebraucht.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvex"})," muss ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` sein, damit in den Schritten 1 und 5 überhaupt Punkte auf der
Verbindungsstrecke zur Verfügung stehen. `,e.jsx(i.em,{children:"Offen"})," muss ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` sein, damit in Schritt 4
zu jeder Richtung `,e.jsx(n,{children:"\\bh"})," ein Stück Weg in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),` bleibt; an einem Randpunkt gäbe es
Richtungen, in denen wir sofort hinausliefen, und die Aussage über `,e.jsx(n,{children:"\\bH_f"}),` zöge Information aus
Richtungen, die gar nicht vorkommen. `,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-warum-die-menge-offen-und-konvex-sein",children:"Bemerkung 10.7.12"}),` führt beide Fälle mit Gegenbeispielen
vor.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zweimal stetig differenzierbar"})," muss ",e.jsx(n,{children:"f"}),` sein, damit die Hesse-Matrix existiert und die
Taylorformeln gelten. Für (1) `,e.jsx(n,{children:"\\Leftrightarrow"}),` (2) allein genügt einfache
Differenzierbarkeit.`]}),e.jsxs(i.p,{children:["Zwei Verschärfungen liegen nahe und gelten nur halb. Ist ",e.jsx(n,{children:"\\bH_f(\\bx)"}),` an jeder Stelle positiv
`,e.jsx(i.em,{children:"definit"}),", so ist ",e.jsx(n,{children:"f"})," strikt konvex. Die Umkehrung ist falsch: ",e.jsx(n,{children:"f(x) = x^4"}),` ist strikt konvex,
hat aber `,e.jsx(n,{children:"f''(0) = 0"}),". Wir kennen den Grenzfall aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),`, wo dieselbe Funktion
zeigt, dass die zweite Ableitung im semidefiniten Fall nichts entscheidet.`]})]}),`
`,e.jsxs(j,{kind:"Beispiel",label:"11.4.11 (Quadratische Funktionen, mit dem Kriterium nachgerechnet)",id:"env-quadratische-funktionen-mit-dem",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"}),` hat für die quadratische Funktion
`,e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx + \\bb^\\top\\bx + a"}),` schon gezeigt: Ist der symmetrische Anteil
`,e.jsx(n,{children:"\\bQ_{\\mathrm{sym}} = \\tfrac12(\\bQ + \\bQ^\\top)"})," positiv semidefinit, so ist ",e.jsx(n,{children:"f"}),` konvex. Bewiesen
haben wir das damals über den Sehnendefekt. `,e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),` liefert denselben Schluss in zwei
Zeilen und obendrein die Umkehrung, macht die Bedingung also zu einem `,e.jsx(i.em,{children:"genau dann, wenn"}),`.
Den Gradienten der quadratischen Form kennen wir aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`, und noch einmal ableiten gibt die
Hesse-Matrix:`]}),e.jsx(a,{children:`\\nabla f(\\bx) = \\bx^\\top\\left(\\bQ + \\bQ^\\top\\right) + \\bb^\\top ,
\\qquad
\\bH_f(\\bx) = \\bQ + \\bQ^\\top .`}),e.jsxs(i.p,{children:["Die Hesse-Matrix ist konstant, und nach (3) ist ",e.jsx(n,{children:"f"}),` genau dann konvex, wenn
`,e.jsx(n,{children:"\\bQ + \\bQ^\\top \\succeq 0"})," gilt. Für symmetrisches ",e.jsx(n,{children:"\\bQ"})," steht dort ",e.jsx(n,{children:"2\\bQ"}),`, und die Bedingung
ist wörtlich `,e.jsx(n,{children:"\\bQ \\succeq 0"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-warum-der-symmetrische-anteil",children:"Bemerkung 11.3.13"}),` hat eine Matrix gezeigt, die trotz fehlender Symmetrie eine strikt konvexe
Funktion erzeugt. Die andere Richtung ist ebenso lehrreich: `,e.jsx(n,{children:"\\bQ"}),` kann lauter positive
Eigenwerte haben und die Funktion trotzdem nicht konvex sein. Für
`,e.jsx(n,{children:"\\bQ = \\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 0 & 1\\end{smallmatrix}\\bigr)"}),` stehen auf der
Diagonalen der Dreiecksmatrix die Eigenwerte `,e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"1"}),`, beide positiv. Es ist aber
`,e.jsx(n,{children:"\\bQ + \\bQ^\\top = \\bigl(\\begin{smallmatrix} 4 & 3 \\\\ 3 & 2\\end{smallmatrix}\\bigr)"}),` mit den
Eigenwerten `,e.jsx(n,{children:"6{,}162"})," und ",e.jsx(n,{children:"\\cred{-0{,}162}"}),`, und die zugehörige Funktion ist nicht konvex. Zum
negativen Eigenwert gehört ungefähr die Richtung `,e.jsx(n,{children:"\\bd = (2;\\ -3)^\\top"}),`, denn
`,e.jsx(n,{children:"\\bd^\\top(\\bQ + \\bQ^\\top)\\bd = 16 - 36 + 18 = \\cred{-2}"}),". Mit ",e.jsx(n,{children:"\\bx = (1;\\ -1{,}5)^\\top"}),`,
`,e.jsx(n,{children:"\\by = -\\bx"}),", ",e.jsx(n,{children:"\\bb = \\bnull"})," und ",e.jsx(n,{children:"a = 0"})," steht im Mittelpunkt ",e.jsx(n,{children:"\\bnull"})," der Wert ",e.jsx(n,{children:"f(\\bnull) = 0"}),`
gegen den Mittelwert `,e.jsx(n,{children:"\\tfrac12 f(\\bx) + \\tfrac12 f(\\by) = \\cred{-0{,}25}"}),`: Die Sehne verläuft
unter dem Graphen. Die Richtung muss dabei sorgfältig gewählt sein – die ähnlich aussehende
`,e.jsx(n,{children:"\\bd = (1;\\ -1)^\\top"})," liefert ",e.jsx(n,{children:"4 - 6 + 2 = 0"})," und damit exakt Gleichheit, zeigt also gar nichts."]})]}),`
`,e.jsx(L,{title:"Die logistische Regression als konvexes Problem",children:e.jsxs(j,{kind:"Beispiel",label:"11.4.12 (Logistische Regression ist ein konvexes Problem)",id:"env-logistische-regression-ist-ein-konvexes",children:[e.jsxs(i.p,{children:["Die negative ",e.jsx(b,{id:"likelihood",children:"Log-Likelihood"}),` der logistischen Regression aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.6",children:"Abschnitt 10.6"}),` lautet mit
`,e.jsx(n,{children:"\\pi_i(\\bbeta) = 1/(1 + e^{-\\bx_i^\\top\\bbeta})"})]}),e.jsx(a,{children:`\\ell(\\bbeta) = \\sum_{i=1}^n
\\left[\\log\\left(1 + e^{\\bx_i^\\top\\bbeta}\\right) - y_i\\,\\bx_i^\\top\\bbeta\\right] ,
\\qquad
\\nabla \\ell(\\bbeta) = \\sum_{i=1}^n \\left(\\pi_i(\\bbeta) - y_i\\right)\\bx_i^\\top .`}),e.jsx(i.p,{children:"Noch einmal ableiten gibt"}),e.jsx(a,{children:"\\bH_\\ell(\\bbeta) = \\sum_{i=1}^n \\pi_i(\\bbeta)\\left(1 - \\pi_i(\\bbeta)\\right)\\bx_i\\bx_i^\\top ."}),e.jsxs(i.p,{children:[`Jeder Summand ist positiv semidefinit, denn
`,e.jsx(n,{children:"\\bh^\\top\\bx_i\\bx_i^\\top\\bh = (\\bx_i^\\top\\bh)^2 \\ge 0"}),`, und der Vorfaktor
`,e.jsx(n,{children:"\\pi_i(1-\\pi_i)"})," ist wegen ",e.jsx(n,{children:"\\pi_i \\in (0,1)"})," positiv; sein größter Wert ",e.jsx(n,{children:"\\tfrac14"}),` wird bei
`,e.jsx(n,{children:"\\pi_i = \\tfrac12"})," angenommen, also genau dann, wenn ",e.jsx(n,{children:"\\bx_i^\\top\\bbeta = 0"}),` ist. Eine Summe positiv semidefiniter
Matrizen ist wieder positiv semidefinit, also ist `,e.jsx(n,{children:"\\bH_\\ell(\\bbeta) \\succeq 0"}),` an jeder Stelle,
und nach `,e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"})," ist ",e.jsx(n,{children:"\\ell"}),` konvex. Die Log-Likelihood selbst ist damit konkav, und ihre
Maximierung ist ein konvexes Problem.`]}),e.jsxs(i.p,{children:["Ein Zahlenbeispiel mit vier Beobachtungen, ",e.jsx(n,{children:"\\bx_i^\\top = (1, x_i)"}),` und
`,e.jsx(n,{children:"x = (0{,}5;\\ -1{,}2;\\ 2{,}0;\\ 0{,}1)"}),": An der Stelle ",e.jsx(n,{children:"\\bbeta = (0{,}3;\\ -0{,}7)^\\top"})," ist"]}),e.jsx(a,{children:`\\bH_\\ell(\\bbeta) =
\\begin{pmatrix} 0{,}8675 & 0{,}3040 \\\\ 0{,}3040 & 1{,}0788 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["mit den Eigenwerten ",e.jsx(n,{children:"1{,}2950"})," und ",e.jsx(n,{children:"0{,}6513"}),`, also sogar positiv definit. Definitheit statt
Semidefinitheit bekommen wir hier, weil die Regressormatrix vollen Spaltenrang hat. Bei
linear abhängigen Regressoren bliebe nur Semidefinitheit, und mit ihr die Mehrdeutigkeit des
Maximums.`]})]})}),`
`,e.jsx(i.h3,{children:"Das Spektrum der Hesse-Matrix"}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.4.13 (Eigenwerte als Krümmungen)",id:"env-eigenwerte-als-kruemmungen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f \\in \\Ccal^2"})," ist ",e.jsx(n,{children:"\\bH_f(\\bx)"})," nach dem Satz von Schwarz symmetrisch (",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-satz-von-schwarz",children:"Satz 10.7.4"}),`). Der
`,e.jsx(b,{id:"spectral-theorem",children:"Spektralsatz"}),` liefert deshalb reelle
`,e.jsx(b,{id:"eigenvalue-eigenvector",children:"Eigenwerte"})," ",e.jsx(n,{children:"\\lambda_1, \\dots, \\lambda_n"}),` und eine
`,e.jsx(b,{id:"orthonormal-basis",children:"Orthonormalbasis"})," aus Eigenvektoren ",e.jsx(n,{children:"\\bv_1, \\dots, \\bv_n"}),`. Zerlegen wir
einen Zuwachs `,e.jsx(n,{children:"\\bh"})," in dieser Basis, so wird aus der Taylorentwicklung zweiter Ordnung"]}),e.jsx(a,{children:`f(\\corange{\\bx} + \\bh) \\approx f(\\corange{\\bx}) + \\nabla f(\\corange{\\bx})\\,\\bh
+ \\tfrac{1}{2}\\,\\bh^\\top\\bH_f(\\corange{\\bx})\\,\\bh
= f(\\corange{\\bx}) + \\nabla f(\\corange{\\bx})\\,\\bh
+ \\tfrac{1}{2}\\sum_{i=1}^n \\lambda_i \\left(\\bv_i^\\top\\bh\\right)^2 .`}),e.jsxs(i.p,{children:[`Die letzte Gleichung ist die Spektralzerlegung
`,e.jsx(n,{children:"\\bH_f = \\sum_i \\lambda_i \\bv_i\\bv_i^\\top"}),`, eingesetzt in die quadratische Form. Sie
zerlegt die Krümmung in Richtungen, und jede Richtung bekommt ihre eigene Zahl:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\lambda_i > 0"}),": In Richtung ",e.jsx(n,{children:"\\bv_i"})," krümmt sich ",e.jsx(n,{children:"f"})," nach oben, wir stehen in einem Tal."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\lambda_i < 0"}),": In Richtung ",e.jsx(n,{children:"\\bv_i"})," krümmt sich ",e.jsx(n,{children:"f"})," nach unten, wir stehen auf einer Kuppe."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\left|\\lambda_i\\right|"})," misst, wie stark die Krümmung in Richtung ",e.jsx(n,{children:"\\bv_i"})," ausfällt."]}),`
`]}),e.jsxs(i.p,{children:["Konvexität ist in dieser Sprache leicht zu sagen: Nach ",e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),"(3) ist ",e.jsx(n,{children:"f"}),` genau dann
konvex, wenn an jeder Stelle `,e.jsx(i.em,{children:"alle"}),` Eigenwerte nichtnegativ sind. Es gibt dann nirgends eine
Richtung, in der die Funktion nach unten wegkippt, und damit auch keine Sattelpunkte, in denen
ein Verfahren steckenbleiben könnte.`]}),e.jsxs(i.p,{children:[`Der Gradiententerm darf in dieser Näherung nicht fehlen: Die verkürzte Fassung
`,e.jsx(n,{children:"f(\\bx + \\bh) \\approx f(\\bx) + \\tfrac12\\bh^\\top\\bH_f(\\bx)\\bh"}),` stimmt nur an kritischen
Punkten, sonst ist der weggelassene Term für kleine `,e.jsx(n,{children:"\\bh"}),` sogar der größere von beiden. Zum
Anschauen eignet sich das Definitheits-Widget in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`, dessen Höhenlinien von Ellipsen zu Hyperbeln
wechseln, sobald ein Eigenwert unter null rutscht.`]})]}),`
`,e.jsx(i.h3,{children:"Stützgeraden und Subgradienten"}),`
`,e.jsxs(i.p,{children:["Aussage (2) von ",e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),` ist eine bemerkenswerte Eigenschaft: Eine konvexe Funktion liegt
nirgends unter ihrer Tangentialebene. Was aber, wenn es keine Tangente gibt? Der Betrag hat im
Nullpunkt keine, der LASSO-Strafterm ebenfalls nicht, und nach `,e.jsx(i.a,{href:"#env-was-die-vier-regeln-zusammen-hergeben",children:"Bemerkung 11.4.4"}),` kann selbst der
Grenzwert glatter konvexer Funktionen einen Knick bekommen. Es zeigt sich, dass die `,e.jsx(i.em,{children:"Existenz"}),`
einer Stützgeraden erhalten bleibt, auch wenn die Ableitung fehlt.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.4.14 (Subgradient und Subdifferential)",id:"env-subgradient-und-subdifferential",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex, ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),` und
`,e.jsx(n,{children:"\\corange{\\bx} \\in \\cblue{\\Xcal}"}),". Ein Vektor ",e.jsx(n,{children:"\\bv \\in \\R^n"})," heißt ",e.jsx(i.em,{children:"Subgradient"}),`
(subgradient) von `,e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\corange{\\bx}"}),", falls"]}),e.jsx(ke,{tag:"11.4.3",id:"eq-subgradient-und-subdifferential",children:`f(\\by) \\ge f(\\corange{\\bx}) + \\bv^\\top(\\by - \\corange{\\bx})
\\qquad \\text{für alle } \\by \\in \\cblue{\\Xcal} .`}),e.jsxs(i.p,{children:["Die Menge aller Subgradienten in ",e.jsx(n,{children:"\\corange{\\bx}"})," heißt ",e.jsx(i.em,{children:"Subdifferential"}),` und wird
`,e.jsx(n,{children:"\\partial f(\\corange{\\bx})"})," geschrieben."]})]}),`
`,e.jsxs(i.p,{children:["Ungleichung ",e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"})," ist ",e.jsx(i.a,{href:"#eq-konvexe-funktionen-von-vektoren-zu",children:"(11.4.2)"})," mit ",e.jsx(n,{children:"\\bv^\\top"}),` anstelle des Gradienten. Sie sagt, dass
die affine Funktion `,e.jsx(n,{children:"\\by \\mapsto f(\\corange{\\bx}) + \\bv^\\top(\\by - \\corange{\\bx})"}),` nirgends
über dem Graphen von `,e.jsx(n,{children:"f"})," verläuft und ihn in ",e.jsx(n,{children:"\\corange{\\bx}"})," berührt. Ist ",e.jsx(n,{children:"f"}),` in einem inneren
Punkt `,e.jsx(n,{children:"\\corange{\\bx}"})," differenzierbar, so ist ",e.jsx(n,{children:"\\nabla f(\\corange{\\bx})^\\top"}),` ein solcher
Vektor, und dann ist er auch der einzige. Die Schritte 1 und 2 im Beweis von `,e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),`
brauchen dafür nur Differenzierbarkeit in genau diesem einen Punkt, nicht die
`,e.jsx(n,{children:"\\Ccal^2"}),`-Voraussetzung des Satzes. Am Knick können dagegen viele auftreten: Für
`,e.jsx(n,{children:"f(x) = \\left|x\\right|"})," ist ",e.jsx(n,{children:"\\partial f(0) = [-1, 1]"}),` (Herleitung in der Vertiefung
`,e.jsx(i.a,{href:"#env-das-subdifferential-des-betrags",children:"Beispiel 11.4.16"}),")."]}),`
`,e.jsx(j,{kind:"Satz",label:"11.4.15 (Existenz von Subgradienten im Inneren)",id:"env-existenz-von-subgradienten-im-inneren",children:e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex und ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),` konvex. Dann
gibt es zu jedem `,e.jsx(n,{children:"\\corange{\\bx} \\in \\interior(\\cblue{\\Xcal})"}),` einen Subgradienten, es ist also
`,e.jsx(n,{children:"\\partial f(\\corange{\\bx}) \\neq \\emptyset"}),"."]})}),`
`,e.jsxs(L,{title:"Beweis, Subdifferential des Betrags und wozu Subgradienten dienen",children:[e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["die Monotonie ist Schritt 1 im Beweis von ",e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"})," ohne den Grenzübergang; eine monotone, beschränkte Folge konvergiert, und die Schranke liefert jeweils der andere einseitige Quotient. Ist ",e.jsx(n,{children:"f"})," differenzierbar, fallen ",e.jsx(n,{children:"f'_-"})," und ",e.jsx(n,{children:"f'_+"})," zusammen"]}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der eindimensionale Fall, in der Skizze."})," Schreiben wir für eine Richtung ",e.jsx(n,{children:"\\bh"}),` und
`,e.jsx(n,{children:"0 < s \\le t"})," mit ",e.jsx(n,{children:"\\corange{\\bx} + t\\bh \\in \\cblue{\\Xcal}"})," den Punkt"]}),e.jsx(a,{children:`\\corange{\\bx} + s\\bh
= \\left(1 - \\tfrac{s}{t}\\right)\\corange{\\bx} + \\tfrac{s}{t}\\left(\\corange{\\bx} + t\\bh\\right)`}),e.jsxs(i.p,{children:["als Konvexkombination, so liefert die Konvexität von ",e.jsx(n,{children:"f"})," nach Umstellen"]}),e.jsx(a,{children:`\\frac{f(\\corange{\\bx} + s\\bh) - f(\\corange{\\bx})}{s}
\\ \\le\\
\\frac{f(\\corange{\\bx} + t\\bh) - f(\\corange{\\bx})}{t} ,`}),e.jsxs(i.p,{children:[`der Differenzenquotient wächst also monoton in der Schrittweite. In einem inneren Punkt
`,e.jsx(n,{children:"\\corange{x}"}),` existieren deshalb beide einseitigen Ableitungen als monotone, beschränkte
Grenzwerte, und es gilt `,e.jsx(n,{children:"f'_-(\\corange{x}) \\le f'_+(\\corange{x})"}),`. Jedes
`,e.jsx(n,{children:"v \\in [f'_-(\\corange{x}),\\, f'_+(\\corange{x})]"}),` erfüllt dann
`,e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"}),": Für ",e.jsx(n,{children:"y > \\corange{x}"}),` ist der Differenzenquotient
mindestens `,e.jsx(n,{children:"f'_+(\\corange{x})"})," und damit mindestens ",e.jsx(n,{children:"v"}),", für ",e.jsx(n,{children:"y < \\corange{x}"}),` höchstens
`,e.jsx(n,{children:"f'_-(\\corange{x})"})," und damit höchstens ",e.jsx(n,{children:"v"}),", und die Multiplikation mit ",e.jsx(n,{children:"y - \\corange{x}"}),` dreht
im zweiten Fall das Ungleichheitszeichen um.`]})]}),e.jsx(z,{why:e.jsxs(e.Fragment,{children:["dass der Epigraph konvex ist, ist ",e.jsx(i.a,{href:"#env-konvexe-funktion",children:"Definition 11.3.6"}),", die konvexe Funktionen genau darüber erklärt; läge ",e.jsx(n,{children:"\\corange{\\bx}"})," auf dem Rand von ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),", könnte die stützende Hyperebene senkrecht stehen, und die Division wäre nicht möglich. Genau daran scheitert ",e.jsx(i.a,{href:"#env-randpunkte-und-wozu-subgradienten-gut",children:"Bemerkung 11.4.17"})]}),children:e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n > 1"}),` liefert dasselbe Argument in jeder einzelnen Richtung eine Steigung, aber noch
keinen Vektor `,e.jsx(n,{children:"\\bv"}),`, der alle Richtungen gleichzeitig bedient. Den Rest erledigt eine
Trennungsaussage: Der `,e.jsx(i.em,{children:"Epigraph"}),`
`,e.jsx(n,{children:"\\cblue{\\epi(f)} = \\{(\\by, r) \\colon \\by \\in \\cblue{\\Xcal},\\ r \\ge f(\\by)\\} \\subseteq \\R^{n+1}"}),`
aus `,e.jsx(i.a,{href:"#env-epigraph",children:"Definition 11.3.5"})," ist konvex, und ",e.jsx(n,{children:"(\\corange{\\bx}, f(\\corange{\\bx}))"}),` ist ein Randpunkt.
Eine stützende `,e.jsx(b,{id:"hyperplane",children:"Hyperebene"}),` in diesem Randpunkt, also eine, die
`,e.jsx(n,{children:"\\cblue{\\epi(f)}"}),` ganz auf einer Seite lässt, hat wegen
`,e.jsx(n,{children:"\\corange{\\bx} \\in \\interior(\\cblue{\\Xcal})"}),` eine nichtverschwindende
letzte Koordinate; nach Division durch diese Koordinate steht `,e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"}),`
da. Die Trennungsaussage selbst beweisen wir hier nicht, sie lässt sich aus dem
Projektionssatz in `,e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"})," gewinnen."]})})]}),e.jsxs(j,{kind:"Beispiel",label:"11.4.16 (Das Subdifferential des Betrags)",id:"env-das-subdifferential-des-betrags",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f(x) = \\left|x\\right|"})," auf ",e.jsx(n,{children:"\\cblue{\\Xcal} = \\R"}),". Für ",e.jsx(n,{children:"\\corange{x} > 0"})," ist ",e.jsx(n,{children:"f"}),`
differenzierbar mit Ableitung `,e.jsx(n,{children:"1"}),", und ",e.jsx(n,{children:"\\partial f(\\corange{x}) = \\{1\\}"}),`; für
`,e.jsx(n,{children:"\\corange{x} < 0"})," entsprechend ",e.jsx(n,{children:"\\{-1\\}"}),". Interessant ist der Knick in ",e.jsx(n,{children:"\\corange{x} = 0"}),`. Dort
verlangt `,e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"})]}),e.jsx(a,{children:"\\left|y\\right| \\ge v\\,y \\qquad \\text{für alle } y \\in \\R ,"}),e.jsxs(i.p,{children:["und das ist für ",e.jsx(n,{children:"v \\in [-1, 1]"})," erfüllt, sonst nicht: Für ",e.jsx(n,{children:"v > 1"})," scheitert ",e.jsx(n,{children:"y = 1"}),`, denn
`,e.jsx(n,{children:"\\cred{1 < v}"}),"; für ",e.jsx(n,{children:"v < -1"})," scheitert ",e.jsx(n,{children:"y = -1"}),`. Also ist
`,e.jsx(n,{children:"\\partial f(0) = [-1, 1]"}),`, ein ganzes Intervall von Stützgeraden. Der Satz sagt nur, dass es
mindestens eine gibt; eindeutig ist sie an einem Knick gerade nicht.`]}),e.jsxs(i.p,{children:[`Diese Vielfalt hat eine praktische Kehrseite, die den LASSO erklärt. Für die eindimensionale
Zielfunktion `,e.jsx(n,{children:"g(w) = \\tfrac12(w - z)^2 + \\lambda\\left|w\\right|"})," mit ",e.jsx(n,{children:"\\lambda > 0"}),` ist
`,e.jsx(n,{children:"0 \\in \\partial g(w^\\star)"}),` die Optimalitätsbedingung, und sie führt auf die
Schwellenwertregel`]}),e.jsx(a,{children:"w^\\star = \\sign(z)\\,\\max\\left\\{\\left|z\\right| - \\lambda,\\ 0\\right\\} ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"z = 2"})," und ",e.jsx(n,{children:"\\lambda = 0{,}5"})," steht dort ",e.jsx(n,{children:"1{,}5"}),", für ",e.jsx(n,{children:"z = 0{,}3"})," dagegen exakt ",e.jsx(n,{children:"0"}),`. Weil
das Subdifferential im Nullpunkt ein ganzes Intervall ist, kann die Bedingung dort für einen
ganzen Bereich von `,e.jsx(n,{children:"z"}),` erfüllt sein, und der LASSO setzt Koeffizienten wirklich auf null statt
nur nahe an null.`]})]}),e.jsxs(j,{kind:"Bemerkung",label:"11.4.17 (Randpunkte, und wozu Subgradienten gut sind)",id:"env-randpunkte-und-wozu-subgradienten-gut",children:[e.jsxs(i.p,{children:["Der innere Punkt in ",e.jsx(i.a,{href:"#env-existenz-von-subgradienten-im-inneren",children:"Satz 11.4.15"}),` ist keine Formalie: Am Rand kann die Aussage scheitern.
Auf `,e.jsx(n,{children:"\\cblue{\\Xcal} = [0, \\infty)"})," ist ",e.jsx(n,{children:"\\cred{f(x) = -\\sqrt{x}}"}),` konvex, aber im Randpunkt
`,e.jsx(n,{children:"0"})," gibt es keinen Subgradienten. Für ",e.jsx(n,{children:"v \\ge 0"})," scheitert schon ",e.jsx(n,{children:"y = 1"}),`, denn dort verlangt
`,e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"})," die falsche Aussage ",e.jsx(n,{children:"-1 \\ge v"}),". Und für ",e.jsx(n,{children:"v = -c"})," mit ",e.jsx(n,{children:"c > 0"}),` nimmt
`,e.jsx(n,{children:"f(y) - v\\,y = -\\sqrt{y} + c\\,y"}),` bei
`,e.jsx(n,{children:"y = 1/(4c^2)"})," den Wert ",e.jsx(n,{children:"-1/(4c) < 0"})," an, während ",e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"})," dort ",e.jsx(n,{children:"\\ge 0"}),` verlangt. Für
`,e.jsx(n,{children:"c = 10"})," etwa ist das ",e.jsx(n,{children:"-0{,}025"})," an der Stelle ",e.jsx(n,{children:"y = 0{,}0025"}),`. Anschaulich wird die Funktion am
Rand unendlich steil, und keine Gerade kommt hinterher. `,e.jsx(i.a,{href:"#env-existenz-von-subgradienten-im-inneren",children:"Satz 11.4.15"}),` verlangt deshalb einen
inneren Punkt; im Inneren von `,e.jsx(n,{children:"[0,\\infty)"})," existiert der Subgradient wie versprochen."]}),e.jsxs(i.p,{children:[`Die Existenz von Stützgeraden ist mehr wert, als sie zunächst aussieht. Sie liefert etwa die
Jensen-Ungleichung für beliebige integrierbare Zufallsvariablen, die `,e.jsx(i.a,{href:"#env-jensen-ungleichung",children:"Satz 11.4.6"}),` mit seinen
endlich vielen Gewichten nicht erreicht: Ist `,e.jsx(n,{children:"\\bmu = \\E[\\bX]"}),` ein innerer Punkt von
`,e.jsx(n,{children:"\\cblue{\\Xcal}"})," und ",e.jsx(n,{children:"\\bv \\in \\partial f(\\bmu)"}),`, so gilt punktweise
`,e.jsx(n,{children:"f(\\bX) \\ge f(\\bmu) + \\bv^\\top(\\bX - \\bmu)"}),`, und Erwartungswertbildung auf beiden Seiten lässt
den zweiten Summanden verschwinden. Übrig bleibt `,e.jsx(n,{children:"\\E[f(\\bX)] \\ge f(\\E[\\bX])"}),"."]}),e.jsxs(i.p,{children:[`Algorithmisch sind Subgradienten die Eintrittskarte in die nichtdifferenzierbare Optimierung.
Wo der Gradient fehlt, tritt ein beliebiger Subgradient an seine Stelle, und Verfahren wie der
`,e.jsx(b,{id:"gradient-descent",children:"Gradientenabstieg"}),` bleiben in ihrer Subgradienten-Fassung anwendbar.
Typische Anwendungen sind der LASSO und die Quantilregression, deren Verlustfunktion
`,e.jsx(n,{children:"\\rho_\\tau(u) = u\\left(\\tau - \\ind\\{u < 0\\}\\right)"}),` genau wie der Betrag einen Knick in
`,e.jsx(n,{children:"u = 0"})," hat und für ",e.jsx(n,{children:"\\tau = \\tfrac12"})," bis auf den Faktor ",e.jsx(n,{children:"\\tfrac12"}),` mit ihm übereinstimmt. In
beiden Fällen ist die Zielfunktion konvex, aber nicht differenzierbar.
`,e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"}),` entwickelt die Verfahren für den differenzierbaren Fall,
vom Gradientenabstieg bis zu Newton und seinen Verwandten; die Subgradienten-Varianten selbst
gehören nicht mehr zum Stoff dieses Skripts, brauchen aber genau das Werkzeug von hier.`]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Sieben Aussagen zu diesem Abschnitt. Welche davon stimmen?"}),`
`,e.jsxs(en,{children:[e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Sind ",e.jsx(n,{children:"f_1"})," und ",e.jsx(n,{children:"f_2"})," konvex, so ist auch die Differenz ",e.jsx(n,{children:"f_1 - f_2"})," konvex."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),"(2) verlangt einen Faktor ",e.jsx(n,{children:"c \\ge 0"}),", und ",e.jsx(n,{children:"-f_2"}),` verletzt das. Mit
`,e.jsx(n,{children:"f_1(x) = x^2"})," und ",e.jsx(n,{children:"f_2(x) = 2x^2"})," ist die Differenz ",e.jsx(n,{children:"-x^2"}),`, also konkav. Je nach
`,e.jsx(n,{children:"f_2"})," kann die Differenz konvex, konkav oder keines von beidem sein; für ",e.jsx(n,{children:"f_2(x) = \\tfrac12 x^2"}),`
etwa bliebe sie konvex.`]})]}),e.jsxs(E,{wahr:!0,children:[e.jsx(i.p,{children:`Das punktweise Maximum endlich vieler konvexer Funktionen ist konvex, auch wenn keine der
beteiligten Funktionen differenzierbar ist.`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),"(3), und der Beweis in ",e.jsx(i.a,{href:"#env-uebung-das-punktweise-maximum",children:"Beispiel 11.4.3"}),` kommt ohne Ableitungen aus: Wir
wählen an der gemischten Stelle einen maximierenden Index `,e.jsx(n,{children:"j"}),`, benutzen die Konvexität von
`,e.jsx(n,{children:"f_j"}),` und schätzen rechts sofort wieder gegen das Maximum ab. Der Hinge-Verlust
`,e.jsx(n,{children:"\\max\\{0, 1-u\\}"})," zeigt zugleich, dass dabei ein Knick entstehen darf: In ",e.jsx(n,{children:"u = 1"}),` wechselt das
Maximum von einem Stück zum anderen, und die Funktion bleibt trotzdem konvex.`]})]}),e.jsxs(E,{wahr:!1,children:[e.jsx(i.p,{children:"Das punktweise Minimum zweier konvexer Funktionen ist konvex."}),e.jsxs(i.p,{children:["Für das Minimum gibt es keine Regel. Zu ",e.jsx(n,{children:"f_1(x) = x^2"})," und ",e.jsx(n,{children:"f_2(x) = (x-3)^2"}),` ist
`,e.jsx(n,{children:"f = \\min\\{f_1, f_2\\}"})," in ",e.jsx(n,{children:"x = 0"})," und ",e.jsx(n,{children:"x = 3"}),` jeweils null, in der Mitte aber
`,e.jsx(n,{children:"f(1{,}5) = 2{,}25"}),`. Der Mittelpunkt liegt also über der Sehne, und die Konvexitätsbedingung
ist verletzt. Der Beweis aus `,e.jsx(i.a,{href:"#env-uebung-das-punktweise-maximum",children:"Beispiel 11.4.3"}),` bricht genau an der Stelle, an der wir nach oben
abschätzen: Beim Minimum zeigt die entsprechende Ungleichung in die falsche Richtung.`]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"N = 2"})," ist die Jensen-Ungleichung wörtlich die Definition einer konvexen Funktion."]}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\lambda = w_1"})," und ",e.jsx(n,{children:"1 - \\lambda = w_2"})," steht in ",e.jsx(i.a,{href:"#eq-jensen-ungleichung",children:"(11.4.1)"}),` genau
`,e.jsx(n,{children:"f(\\lambda\\bx_1 + (1-\\lambda)\\bx_2) \\le \\lambda f(\\bx_1) + (1-\\lambda) f(\\bx_2)"}),`. Der Beweis
von `,e.jsx(i.a,{href:"#env-jensen-ungleichung",children:"Satz 11.4.6"}),` nimmt das als Induktionsanfang und schiebt in jedem Schritt einen weiteren
Punkt nach, wobei `,e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"})," sicherstellt, dass die Zwischenpunkte in ",e.jsx(n,{children:"\\Xcal"})," bleiben."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Eine Funktion ",e.jsx(n,{children:"f \\in \\Ccal^2"}),` auf einer offenen, konvexen Menge ist genau dann konvex, wenn
ihre Hesse-Matrix überall positiv definit ist.`]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),"(3) verlangt positive ",e.jsx(i.em,{children:"Semi"}),`definitheit. Jede affine Funktion hat
`,e.jsx(n,{children:"\\bH_f \\equiv \\bnull"})," und ist konvex, und ",e.jsx(n,{children:"f(x) = x^4"}),` ist sogar strikt konvex, obwohl
`,e.jsx(n,{children:"f''(0) = 0"}),` ist. Definitheit ist hinreichend für strikte Konvexität, aber nicht notwendig
(`,e.jsx(i.a,{href:"#env-wo-die-voraussetzungen-stecken",children:"Bemerkung 11.4.10"}),")."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["In der Taylorentwicklung zweiter Ordnung von ",e.jsx(n,{children:"f(\\bx + t\\bh)"}),` steht der Krümmungsterm
`,e.jsx(n,{children:"t^2\\,\\bh^\\top\\bH_f(\\bx)\\,\\bh"}),"."]}),e.jsxs(i.p,{children:["Der Faktor ",e.jsx(n,{children:"\\tfrac12"})," fehlt: ",e.jsx(i.a,{href:"?k=10-differentialrechnung#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"}),` liefert
`,e.jsx(n,{children:"\\tfrac{t^2}{2}\\bh^\\top\\bH_f(\\bx)\\bh"}),". Nachprüfen lässt sich das an ",e.jsx(n,{children:"f(x) = x^2"}),` mit
`,e.jsx(n,{children:"x = h = 1"})," und ",e.jsx(n,{children:"t = 0{,}1"}),": Der Krümmungsterm ist ",e.jsx(n,{children:"0{,}01"}),`, die Fassung ohne den Faktor
gäbe `,e.jsx(n,{children:"0{,}02"}),". Am Ergebnis ",e.jsx(n,{children:"\\bh^\\top\\bH_f\\bh \\ge 0"})," ändert der positive Faktor nichts."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsx(i.p,{children:"Jede konvexe Funktion besitzt in jedem Punkt ihres Definitionsbereichs einen Subgradienten."}),e.jsxs(i.p,{children:["Im Inneren ja (",e.jsx(i.a,{href:"#env-existenz-von-subgradienten-im-inneren",children:"Satz 11.4.15"}),"), am Rand nicht unbedingt. Auf ",e.jsx(n,{children:"[0,\\infty)"})," ist ",e.jsx(n,{children:"-\\sqrt{x}"}),` konvex,
und in `,e.jsx(n,{children:"x = 0"})," gibt es keinen Subgradienten: Für ",e.jsx(n,{children:"v = -c"})," mit ",e.jsx(n,{children:"c > 0"}),` unterschreitet
`,e.jsx(n,{children:"f(y) - v\\,y"})," bei ",e.jsx(n,{children:"y = 1/(4c^2)"})," den Wert null, und ",e.jsx(n,{children:"v \\ge 0"})," scheitert schon an ",e.jsx(n,{children:"y = 1"}),`
(`,e.jsx(i.a,{href:"#env-randpunkte-und-wozu-subgradienten-gut",children:"Bemerkung 11.4.17"}),")."]})]}),e.jsxs(on,{loesung:1.5556,toleranz:.01,children:[e.jsxs(i.p,{children:["Stellen wir im Jensen-Widget ",e.jsx(n,{children:"f(x) = x^2"}),` und gleiche Gewichte ein. Wie groß ist die Differenz
zwischen der grünen und der orangen Markierung?`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"1{,}5556"}),", nämlich ",e.jsx(n,{children:"4{,}9167 - 3{,}3611"}),`. Diese Lücke ist die gewichtete Varianz der drei
Stützstellen `,e.jsx(n,{children:"0{,}5"}),", ",e.jsx(n,{children:"1{,}5"})," und ",e.jsx(n,{children:"3{,}5"})," um ihren Mittelwert ",e.jsx(n,{children:"\\tfrac{11}{6} = 1{,}8333"}),`
(`,e.jsx(i.a,{href:"#env-die-varianz-ist-nicht-negativ",children:"Beispiel 11.4.8"}),`). Sie verschwindet genau dann, wenn alles Gewicht auf einer Stützstelle
liegt; für die konkave Wurzel wechselt sie das Vorzeichen.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Boyd und Vandenberghe, Convex Optimization, §3.1 behandelt die Bedingungen erster
und zweiter Ordnung sowie die Jensen-Ungleichung, §3.2 die Operationen, die Konvexität
erhalten.`})})]})}function or(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(hi,{...r})}):hi(r)}const mi=F.blau,tn=F.gruen,_e=F.orange,Tn=F.rot,xi=F.hellgrau,ur=r=>{const i=Math.max(0,Math.abs(r)-.8);return 2*i*i},br=r=>.8*r*r,an=r=>r**4-3*r*r-r+3,ji=r=>4*r**3-6*r-1,We={x:-1.1309,f:1.9298},je={x:1.3008,f:-.5139},fi=-.1699,hn=-2.2,xn=2.2;function vn({farbe:r,text:i}){return e.jsxs("span",{className:"inline-flex items-center gap-1",children:[e.jsx("span",{className:"inline-block h-2 w-2 rounded-full",style:{backgroundColor:r},"aria-hidden":"true"}),i]})}function gr(){const r=[{key:"plateau",titel:"konvex, aber nicht strikt",f:ur,yDomain:[-.4,4.4],markers:[{x:-.8,y:0,color:_e},{x:0,y:0,color:_e},{x:.8,y:0,color:_e}],text:"Auf dem ganzen Stück von −0,8 bis 0,8 steht derselbe kleinste Wert 0. Jeder dieser Punkte ist ein globales Minimum, eindeutig ist keiner. Die Minimalstellen bilden hier ein Intervall, also selbst wieder eine konvexe Menge."},{key:"schuessel",titel:"strikt konvex",f:br,yDomain:[-.4,4.4],markers:[{x:0,y:0,color:_e}],text:"Kein gerades Stück, keine flache Stelle: Die Schüssel hat genau eine tiefste Stelle. Wer irgendwo bergab läuft, kann nur dort ankommen."},{key:"doppelmulde",titel:"nicht konvex",f:an,yDomain:[-1.5,14.8],markers:[{x:We.x,y:We.f,color:Tn},{x:je.x,y:je.f,color:_e}],text:"Zwei Täler, zwei kritische Punkte mit positiver Krümmung. Das linke Tal bei −1,13 ist ein lokales Minimum mit Wert 1,93, das rechte bei 1,30 das globale mit −0,51. Von innen sehen beide gleich aus."}];return e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"max-w-prose text-sm text-slate-500 dark:text-slate-400",children:"Drei Landschaften über demselben Bereich von −2,2 bis 2,2. Blau ist der Graph, orange markiert ein globales Minimum, rot ein Minimum, das nur lokal ist. Die beiden linken Tafeln teilen sich eine Werteachse, die rechte reicht bis 14,8; verglichen wird die Form, nicht die Höhe."}),e.jsx("div",{className:"flex flex-wrap gap-5",children:r.map(i=>e.jsxs("div",{className:"min-w-0 basis-[19rem]",children:[e.jsx("p",{className:"mb-1 text-sm font-medium",children:i.titel}),e.jsx(gi,{xLabel:"x",yLabel:"f(x)",series:[{f:i.f,color:mi}],markers:i.markers,xDomain:[hn,xn],yDomain:i.yDomain,width:250,height:170,ariaLabel:`Landschaft: ${i.titel}.`}),e.jsx("p",{className:"mt-1 max-w-[19rem] text-sm",children:i.text})]},i.key))})]})}const mr=.02,zn=300,jr=[0,1,2,3,4,5,6,8,10,13,17,22,30,40,60,100,200,300];function ki(r){const i=[r];let s=r;for(let d=0;d<zn;d++)s-=mr*ji(s),i.push(s);return i}function oi(r){const i=ki(r);return Math.abs(i[i.length-1]-je.x)<.1}function fr({tipp:r,zeigeWasserscheide:i=!1}){const[s,d]=I.useState(-.4),t=ki(s);let c=zn;for(let f=0;f<zn;f++)if(Math.abs(ji(t[f]))<1e-4){c=f;break}const u=t[t.length-1],p=Math.abs(u-je.x)<.1,m=s+.01<=xn&&oi(s+.01)!==p||s-.01>=hn&&oi(s-.01)!==p;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Ae,{children:"Schieben wir den Startpunkt Schritt für Schritt nach rechts, bis der Abstieg das Tal wechselt."}),e.jsx(ie,{label:"Startpunkt x₀",value:s,onChange:d,min:hn,max:xn,step:.01,accent:tn}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx("div",{className:"min-w-0 grow basis-[320px]",children:e.jsx(gi,{xLabel:"x",yLabel:"f(x)",series:[{f:an,color:mi}],markers:[...jr.slice(1).map(f=>({x:t[f],y:an(t[f]),color:xi})),{x:We.x,y:We.f,color:Tn},{x:je.x,y:je.f,color:_e},{x:s,y:an(s),color:tn}],vlines:[...r!==void 0?[{at:r,color:tn,dash:[5,4],label:"Tipp"}]:[],...i?[{at:fi,color:_e,dash:[3,3],label:"Wasserscheide"}]:[]],xDomain:[hn,xn],yDomain:[-1.5,14.8],width:380,height:240,ariaLabel:`Die Doppelmulde mit dem Gradientenabstieg ab x0 = ${h(s)}; die Folge endet ${p?"im tiefen Tal rechts":"im flachen Tal links"}.`})}),e.jsxs("div",{className:"min-w-[15rem] grow basis-[15rem] space-y-2 text-sm",children:[e.jsx("table",{className:"text-sm",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Start x₀"}),e.jsx("td",{className:"font-mono text-xs",style:{color:tn},children:h(s)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"nach 300 Schritten"}),e.jsx("td",{className:"font-mono text-xs",children:h(u,4)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Funktionswert dort"}),e.jsx("td",{className:"font-mono text-xs",children:h(an(u),4)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"pr-3",children:"Schritte bis |f′| < 10⁻⁴"}),e.jsx("td",{className:"font-mono text-xs",children:c<zn?c:"über 300"})]})]})}),e.jsxs("p",{className:"max-w-prose text-xs text-slate-500 dark:text-slate-400",children:[e.jsx(vn,{farbe:tn,text:"Startpunkt"}),","," ",e.jsx(vn,{farbe:xi,text:"Zwischenstationen"}),","," ",e.jsx(vn,{farbe:_e,text:"globales Minimum"}),","," ",e.jsx(vn,{farbe:Tn,text:"lokales Minimum"}),". Die Iteration ist xₖ₊₁ = xₖ − η f′(xₖ) mit η = 0,02 und 300 Schritten."]})]})]}),p?e.jsxs(W,{kind:"ok",titel:"Im tiefen Tal gelandet.",children:["Der Startpunkt liegt rechts der Wasserscheide, und das Verfahren läuft in das globale Minimum bei ",h(je.x)," mit dem Wert ",h(je.f),".",m?" Ein einziger Schritt des Reglers nach links kippt das Ergebnis in das andere Tal, obwohl sich am Startwert kaum etwas ändert.":""]}):e.jsxs(W,{kind:"fail",titel:"Im flachen Tal hängengeblieben.",children:["Der Startpunkt liegt links der Wasserscheide. Das Verfahren kommt bei"," ",h(We.x)," zur Ruhe, dort ist der Wert ",h(We.f)," und damit um"," ",h(We.f-je.f)," zu hoch. Die Ableitung verschwindet trotzdem, das Abbruchkriterium meldet Erfolg. ",P("satz:kritischer-punkt-und-globales-minimum")," greift hier nicht, denn die Landschaft ist nicht konvex.",m?" Ein einziger Schritt des Reglers nach rechts kippt das Ergebnis in das andere Tal, obwohl sich am Startwert kaum etwas ändert.":""]})]})}function kr(){return e.jsx(bi,{frage:"Die Doppelmulde hat zwei Täler. An welcher Stelle liegt die Wasserscheide, ab der ein Start rechts davon im tiefen Tal endet?",variante:"bereich",min:hn,max:xn,schritt:.01,loesung:fi,toleranz:.15,einheit:"x₀",verdeckt:e.jsx("p",{className:"max-w-prose text-sm",children:"Die Wasserscheide ist der Höcker zwischen den beiden Tälern, das lokale Maximum bei −0,1699. Über das ganze Reglerraster kippt das Ergebnis genau einmal, nämlich zwischen −0,17 und −0,16."}),children:({aufgeloest:r,guess:i})=>e.jsx(fr,{tipp:typeof i=="number"?i:void 0,zeigeWasserscheide:r})})}function ui(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Warum konvexe Probleme leichter sind"}),`
`,e.jsxs(i.p,{children:[`Bis hierher haben wir Konvexität beschrieben. Jetzt ernten wir. Die Frage, um die es
in der `,e.jsx(b,{id:"optimization",children:"Optimierung"}),` wirklich geht, lautet nicht „ist die Funktion konvex",
sondern: Wenn ein Verfahren stehenbleibt, weil es keine Abstiegsrichtung mehr findet, haben
wir dann das Beste gefunden oder nur ein Zwischenergebnis? Für allgemeine Funktionen ist die
Antwort ernüchternd. Ein Gradient, der verschwindet, kann zu einem Minimum gehören, zu einem
Maximum oder zu einem Sattelpunkt (`,e.jsx(i.a,{href:"?k=10-differentialrechnung#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` in
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.7",children:"Abschnitt 10.7"}),`), und selbst ein echtes lokales Minimum kann
weit über dem globalen liegen.`]}),`
`,e.jsx(i.p,{children:`Für konvexe Funktionen bricht diese Unterscheidung zusammen. Das ist der eigentliche Grund,
warum sich der Aufwand der letzten vier Abschnitte lohnt.`}),`
`,e.jsxs(j,{kind:"Satz",label:"11.5.1 (Kritischer Punkt und globales Minimum)",id:"env-kritischer-punkt-und-globales-minimum",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," differenzierbar und ",e.jsx(b,{id:"convexity",children:"konvex"}),`, und sei
`,e.jsx(n,{children:"\\corange{\\bx^\\star} \\in \\R^n"}),". Dann sind die folgenden beiden Aussagen äquivalent:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\bx^\\star}"})," ist ein globales Minimum von ",e.jsx(n,{children:"f"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\nabla f(\\corange{\\bx^\\star}) = \\bnull^\\top"}),"."]}),`
`]})]}),`
`,e.jsxs(L,{title:"Beweis: Kritische Punkte konvexer Funktionen sind global",children:[e.jsxs(Z,{children:[e.jsxs(z,{why:e.jsx(e.Fragment,{children:"in diesem Schritt geht die Konvexität nirgends ein; er gilt für jede differenzierbare Funktion an einer Minimalstelle im Inneren des Definitionsbereichs und heißt notwendige Bedingung erster Ordnung"}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(1) ",e.jsx(n,{children:"\\Rightarrow"})," (2)."]})," Sei ",e.jsx(n,{children:"\\bh \\in \\R^n"}),` beliebig und
`,e.jsx(n,{children:"\\varphi(t) := f(\\corange{\\bx^\\star} + t\\,\\bh)"})," für ",e.jsx(n,{children:"t \\in \\R"}),`. Nach der Kettenregel ist
`,e.jsx(n,{children:"\\varphi"})," differenzierbar mit ",e.jsx(n,{children:"\\varphi'(0) = \\nabla f(\\corange{\\bx^\\star})\\,\\bh"}),`. Weil
`,e.jsx(n,{children:"\\corange{\\bx^\\star}"})," global minimiert, gilt ",e.jsx(n,{children:"\\varphi(t) \\ge \\varphi(0)"})," für alle ",e.jsx(n,{children:"t"}),`, und
damit`]}),e.jsx(a,{children:`\\frac{\\varphi(t) - \\varphi(0)}{t} \\ge 0 \\quad \\text{für } t > 0 ,
\\qquad
\\frac{\\varphi(t) - \\varphi(0)}{t} \\le 0 \\quad \\text{für } t < 0 .`}),e.jsxs(i.p,{children:["Beide Differenzenquotienten streben für ",e.jsx(n,{children:"t \\to 0"})," gegen ",e.jsx(n,{children:"\\varphi'(0)"}),`. Also ist
`,e.jsx(n,{children:"\\varphi'(0)"}),` zugleich nicht negativ und nicht positiv, folglich
`,e.jsx(n,{children:"\\nabla f(\\corange{\\bx^\\star})\\,\\bh = 0"}),". Mit ",e.jsx(n,{children:"\\bh = \\be_j"}),` verschwindet so jeder einzelne
Eintrag des Gradienten.`]})]}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"})," ist für ",e.jsx(n,{children:"f \\in \\Ccal^2"})," formuliert; für die Äquivalenz seiner Aussagen (1) und (2) genügt nach ",e.jsx(i.a,{href:"#env-wo-die-voraussetzungen-stecken",children:"Bemerkung 11.4.10"})," einfache Differenzierbarkeit, denn der zugehörige Beweisschritt rechnet nur mit Differenzenquotienten"]}),children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["(2) ",e.jsx(n,{children:"\\Rightarrow"})," (1)."]})," Hier trägt die Konvexität. Nach ",e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),`(2), der
Tangentenbedingung aus `,e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"}),", gilt für jedes ",e.jsx(n,{children:"\\by \\in \\R^n"})]}),e.jsx(a,{children:`f(\\by) \\ \\ge\\ f(\\corange{\\bx^\\star}) + \\underbrace{\\nabla f(\\corange{\\bx^\\star})}_{=\\ \\bnull^\\top}
\\left(\\by - \\corange{\\bx^\\star}\\right)
\\ =\\ f(\\corange{\\bx^\\star}) .`}),e.jsxs(i.p,{children:["Damit ist ",e.jsx(n,{children:"f(\\corange{\\bx^\\star})"})," der kleinste Funktionswert überhaupt."]})]})]}),e.jsx(i.p,{children:`Zwei Konsequenzen stecken in diesem Satz, und sie sind die wichtigsten des ganzen
Kapitels. Wir gehen sie einzeln durch.`})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.5.2 (Was daraus folgt, und was nicht)",id:"env-was-daraus-folgt-und-was-nicht",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Jeder kritische Punkt ist ein globales Minimum."}),` Das ist Schritt 2 des Beweises, wörtlich.
Die vorsichtigere Fassung „jeder kritische Punkt ist ein lokales Minimum" bleibt unter dem,
was der Satz hergibt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Jedes lokale Minimum ist ein globales Minimum."})," Für differenzierbares ",e.jsx(n,{children:"f"}),` folgt das aus dem
Satz, indem wir beide Schritte hintereinanderschalten: In einem lokalen Minimum verschwindet
der Gradient nach Schritt 1, und Schritt 2 macht daraus ein globales. Bemerkenswerterweise
brauchen wir dafür aber gar keine Ableitung. Sei `,e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"}),` konvex,
`,e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"})," konvex und ",e.jsx(n,{children:"\\corange{\\bx^\\star}"}),` ein lokales Minimum. Gäbe es
ein `,e.jsx(n,{children:"\\by \\in \\cblue{\\Xcal}"})," mit ",e.jsx(n,{children:"f(\\by) < f(\\corange{\\bx^\\star})"}),`, so läge für jedes
`,e.jsx(n,{children:"\\lambda \\in (0, 1]"}),` der Punkt
`,e.jsx(n,{children:"\\cgreen{\\bz_\\lambda} = (1-\\lambda)\\corange{\\bx^\\star} + \\lambda\\by"})," in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`, und
die Konvexitätsungleichung `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"})," gäbe"]}),e.jsx(a,{children:`f(\\cgreen{\\bz_\\lambda}) \\ \\le\\ (1-\\lambda) f(\\corange{\\bx^\\star}) + \\lambda f(\\by)
\\ <\\ f(\\corange{\\bx^\\star}) .`}),e.jsxs(i.p,{children:["Für kleines ",e.jsx(n,{children:"\\lambda"})," liegt ",e.jsx(n,{children:"\\cgreen{\\bz_\\lambda}"}),` aber in jeder noch so kleinen
`,e.jsx(b,{id:"neighborhood",children:"Umgebung"})," von ",e.jsx(n,{children:"\\corange{\\bx^\\star}"}),`, im Widerspruch zur lokalen
Minimalität. Nichtdifferenzierbare konvexe Funktionen wie der Betrag oder der
LASSO-Strafterm sind also genauso gutmütig.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Es gibt keine Sattelpunkte, in denen ein Verfahren hängenbleiben könnte."}),` An einem
Sattelpunkt verschwindet der Gradient, und in jeder Umgebung lägen Punkte mit kleinerem
Funktionswert. Nach `,e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` ist ein solcher Punkt aber ein globales Minimum, und kleinere
Werte gibt es dort nicht. Konvexe Landschaften haben nur Talböden.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Nicht folgt: Eindeutigkeit, und ebenso wenig Existenz."}),` Eine konstante Funktion ist konvex und
wird an jeder Stelle minimal – die erste der drei Landschaften weiter unten zeigt denselben
Effekt mit einem flachen Stück; `,e.jsx(n,{children:"f(x) = e^x"}),` ist konvex und nimmt ihr Infimum nie an.
`,e.jsx(i.a,{href:"#env-drei-aussagen-die-auseinanderzuhalten",children:"Bemerkung 11.5.6"}),` sortiert die drei Aussagen. Der Merksatz „wenn
wir ein konvexes Optimierungsproblem lösen, finden wir garantiert ein globales Optimum" ist
deshalb genau so zu lesen, wie er dasteht: `,e.jsx(i.em,{children:"falls"})," wir eine Lösung finden, ist sie global."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Und ohne Ableitung?"})," Ist ",e.jsx(n,{children:"f"}),` konvex, so tritt an die Stelle des Gradienten das
`,e.jsx(b,{id:"gradient",children:"Subdifferential"})," aus ",e.jsx(i.a,{href:"#env-subgradient-und-subdifferential",children:"Definition 11.4.14"}),":"]}),e.jsx(a,{children:`\\corange{\\bx^\\star} \\ \\text{ist globales Minimum}
\\quad\\Longleftrightarrow\\quad
\\bnull \\in \\partial f(\\corange{\\bx^\\star}) .`}),e.jsxs(i.p,{children:[`Beide Richtungen stehen schon in der Definition des Subgradienten, und zwar an jeder Stelle des
Definitionsbereichs, Randpunkte eingeschlossen. Ist `,e.jsx(n,{children:"\\bnull \\in \\partial f(\\corange{\\bx^\\star})"}),`,
so lautet `,e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"})," mit ",e.jsx(n,{children:"\\bv = \\bnull"})," gerade ",e.jsx(n,{children:"f(\\by) \\ge f(\\corange{\\bx^\\star})"}),` für alle
`,e.jsx(n,{children:"\\by"}),". Und ist umgekehrt ",e.jsx(n,{children:"\\corange{\\bx^\\star}"})," ein globales Minimum, so erfüllt ",e.jsx(n,{children:"\\bv = \\bnull"}),`
die Ungleichung, ist also ein Subgradient. Die Voraussetzung eines inneren Punktes brauchen wir
an anderer Stelle: Sie sichert nach `,e.jsx(i.a,{href:"#env-existenz-von-subgradienten-im-inneren",children:"Satz 11.4.15"}),", dass ",e.jsx(n,{children:"\\partial f(\\corange{\\bx^\\star})"}),`
überhaupt nicht leer ist. Für `,e.jsx(n,{children:"f(x) = \\left|x\\right|"}),` gilt am Knick
`,e.jsx(n,{children:"\\partial f(0) = [-1, 1]"}),"; mit dem Kriterium ",e.jsx(n,{children:"\\bnull \\in \\partial f"}),` folgt daraus die
Schwellenwertregel des LASSO (Herleitung in der Vertiefung
`,e.jsx(i.a,{href:"#env-das-subdifferential-des-betrags",children:"Beispiel 11.4.16"}),")."]})]}),`
`,e.jsxs(i.p,{children:[`Wenn die Minimalstelle nicht eindeutig ist, ist wenigstens die Menge aller Minimalstellen
handlich. Sie ist selbst wieder konvex, und das ist der Grund, warum in der Statistik von der
`,e.jsx(i.em,{children:"Lösungsmenge"})," eines konvexen Problems die Rede ist."]}),`
`,e.jsxs(j,{kind:"Satz",label:"11.5.3 (Die Minimalstellen bilden eine konvexe Menge)",id:"env-die-minimalstellen-bilden-eine-konvexe",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex und ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),` konvex. Dann
ist`]}),e.jsx(a,{children:`\\corange{\\argmin_{\\bx \\in \\cblue{\\Xcal}} f(\\bx)}
:= \\left\\{\\bx \\in \\cblue{\\Xcal}\\colon f(\\bx) \\le f(\\by) \\ \\text{für alle } \\by \\in \\cblue{\\Xcal}\\right\\}`}),e.jsxs(i.p,{children:["eine konvexe Teilmenge von ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),"."]})]}),`
`,e.jsxs(L,{title:"Beweis: Die Minimalstellen bilden eine konvexe Menge",children:[e.jsxs(Z,{children:[e.jsx(z,{why:e.jsxs(e.Fragment,{children:["die leere Menge und einelementige Mengen sind konvex, weil die Bedingung aus ",e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"})," dort nichts fordert oder trivial erfüllt ist"]}),children:e.jsxs(i.p,{children:["Ist die Menge leer oder einelementig, so ist sie konvex und wir sind fertig. Seien also ",e.jsx(n,{children:"\\bu"}),`
und `,e.jsx(n,{children:"\\bw"})," zwei Minimalstellen. Beide tragen denselben Wert: Aus der Minimalität von ",e.jsx(n,{children:"\\bu"}),`
folgt `,e.jsx(n,{children:"f(\\bu) \\le f(\\bw)"}),", aus der von ",e.jsx(n,{children:"\\bw"})," folgt ",e.jsx(n,{children:"f(\\bw) \\le f(\\bu)"}),`. Wir setzen
`,e.jsx(n,{children:"m := f(\\bu) = f(\\bw)"}),"."]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["hier werden beide Konvexitäten gebraucht: die der Menge, damit ",e.jsx(n,{children:"\\cgreen{\\bz}"})," überhaupt zulässig ist, und die der Funktion für die Abschätzung nach oben"]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\lambda \\in [0,1]"})," und ",e.jsx(n,{children:"\\cgreen{\\bz} = \\lambda\\bu + (1-\\lambda)\\bw"}),`. Weil
`,e.jsx(n,{children:"\\cblue{\\Xcal}"})," konvex ist, liegt ",e.jsx(n,{children:"\\cgreen{\\bz}"})," in ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),`, und die Konvexität von
`,e.jsx(n,{children:"f"})," gibt"]}),e.jsx(a,{children:"f(\\cgreen{\\bz}) \\ \\le\\ \\lambda f(\\bu) + (1-\\lambda) f(\\bw) \\ =\\ m ."}),e.jsxs(i.p,{children:["Andererseits ist ",e.jsx(n,{children:"m"})," der kleinste Wert von ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"\\cblue{\\Xcal}"}),", also ",e.jsx(n,{children:"f(\\cgreen{\\bz}) \\ge m"}),`.
Damit ist `,e.jsx(n,{children:"f(\\cgreen{\\bz}) = m"}),", und ",e.jsx(n,{children:"\\cgreen{\\bz}"})," ist selbst eine Minimalstelle."]})]})]}),e.jsxs(i.p,{children:["Dieselbe Rechnung trägt mehr, als der Satz behauptet. Für jedes ",e.jsx(n,{children:"c \\in \\R"}),` ist die
`,e.jsx(i.em,{children:"Subniveaumenge"})," ",e.jsx(n,{children:"\\{\\bx \\in \\cblue{\\Xcal}\\colon f(\\bx) \\le c\\}"}),` konvex, denn aus
`,e.jsx(n,{children:"f(\\bu) \\le c"})," und ",e.jsx(n,{children:"f(\\bw) \\le c"})," folgt ",e.jsx(n,{children:"f(\\cgreen{\\bz}) \\le \\lambda c + (1-\\lambda)c = c"}),`.
Die Minimalstellen sind davon der Sonderfall `,e.jsx(n,{children:"c = \\min f"}),`, sofern dieses Minimum angenommen
wird. Konvexe Funktionen haben also konvexe `,e.jsx(i.em,{children:"Subniveaumengen"}),`, und daran hängt in
`,e.jsx(i.a,{href:"?k=12-optim#sec-12.5",children:"Abschnitt 12.5"}),` die Beschreibung zulässiger Bereiche. Für exakte
`,e.jsx(b,{id:"level-sets",children:"Niveaumengen"})," ",e.jsx(n,{children:"\\{\\bx:f(\\bx)=c\\}"})," gilt das nicht: Das Niveau ",e.jsx(n,{children:"1"}),` von
`,e.jsx(n,{children:"f(x)=x^2"})," besteht aus ",e.jsx(n,{children:"\\{-1,1\\}"})," und ist nicht konvex."]})]}),`
`,e.jsx(i.h3,{children:"Strikte Konvexität und Eindeutigkeit"}),`
`,e.jsxs(i.p,{children:["Eindeutigkeit fehlt in ",e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` aus einem einfachen Grund: Die Konvexitätsungleichung
erlaubt Gleichheit, und Gleichheit heißt geometrisch, dass der Graph auf einem Stück gerade
verläuft. Verbieten wir das, so bekommen wir die Eindeutigkeit geschenkt.`]}),`
`,e.jsxs(j,{kind:"Definition",label:"11.5.4 (Strikte Konvexität)",id:"env-strikte-konvexitaet",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex und ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),". Wir nennen ",e.jsx(n,{children:"f"}),`
`,e.jsx(i.em,{children:"strikt konvex"})," (strictly convex), falls für alle ",e.jsx(n,{children:"\\bx, \\by \\in \\cblue{\\Xcal}"}),` mit
`,e.jsx(n,{children:"\\bx \\neq \\by"})," und alle ",e.jsx(n,{children:"\\lambda \\in (0,1)"})," gilt"]}),e.jsx(ke,{tag:"11.5.1",id:"eq-strikte-konvexitaet",children:`f\\left(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}\\right)
\\ \\cred{<}\\ \\lambda f(\\bx) + (1-\\lambda) f(\\by) .`})]}),`
`,e.jsxs(i.p,{children:["Gegenüber der Sehnenungleichung ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"}),` aus
`,e.jsx(i.a,{href:"#env-konvexitaet-als-ungleichung",children:"Satz 11.3.8"}),` haben sich drei Dinge geändert, und alle drei sind nötig. Aus
`,e.jsx(n,{children:"\\le"})," wird ",e.jsx(n,{children:"\\cred{<}"}),", das ist der Punkt. Dafür müssen ",e.jsx(n,{children:"\\bx"})," und ",e.jsx(n,{children:"\\by"}),` verschieden sein und
`,e.jsx(n,{children:"\\lambda"})," die Randwerte ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"1"}),` auslassen, denn sonst stünde links und rechts ohnehin
derselbe Wert und keine einzige Funktion wäre strikt konvex. Eingeführt ist der Begriff samt
seiner Zweitbezeichnung „streng konvex" schon in `,e.jsx(i.a,{href:"#env-wie-wir-die-ungleichung-lesen",children:"Bemerkung 11.3.9"}),`; wir
bleiben bei strikt.`]}),`
`,e.jsx(j,{kind:"Satz",label:"11.5.5 (Höchstens eine Minimalstelle)",id:"env-hoechstens-eine-minimalstelle",children:e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\Xcal} \\subseteq \\R^n"})," konvex und ",e.jsx(n,{children:"f\\colon \\cblue{\\Xcal} \\to \\R"}),` strikt konvex.
Dann besitzt `,e.jsx(n,{children:"f"})," höchstens eine Minimalstelle."]})}),`
`,e.jsxs(L,{title:"Beweis der Eindeutigkeit bei strikter Konvexität",children:[e.jsxs(Z,{children:[e.jsx(z,{why:e.jsx(e.Fragment,{children:"jede der beiden Stellen ist minimal, also höchstens so groß wie die andere"}),children:e.jsxs(i.p,{children:["Angenommen, es gäbe zwei verschiedene Minimalstellen ",e.jsx(n,{children:"\\corange{\\bx_1} \\neq \\corange{\\bx_2}"}),`.
Wie in Schritt 1 des Beweises zu `,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),` tragen beide denselben Wert
`,e.jsx(n,{children:"m := f(\\corange{\\bx_1}) = f(\\corange{\\bx_2})"}),"."]})}),e.jsxs(z,{why:e.jsxs(e.Fragment,{children:["hier wird jede Zutat von ",e.jsx(i.a,{href:"#env-strikte-konvexitaet",children:"Definition 11.5.4"})," gebraucht: ",e.jsx(n,{children:"\\corange{\\bx_1} \\neq \\corange{\\bx_2}"})," und ",e.jsx(n,{children:"\\tfrac12 \\in (0,1)"})," machen die strikte Ungleichung anwendbar, und die Konvexität von ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," sichert die Zulässigkeit des Mittelpunkts"]}),children:[e.jsxs(i.p,{children:[`Wir betrachten den Mittelpunkt
`,e.jsx(n,{children:"\\cgreen{\\bz} = \\tfrac12\\corange{\\bx_1} + \\tfrac12\\corange{\\bx_2}"}),`. Er liegt in
`,e.jsx(n,{children:"\\cblue{\\Xcal}"}),", weil ",e.jsx(n,{children:"\\cblue{\\Xcal}"})," konvex ist, und ",e.jsx(i.a,{href:"#env-strikte-konvexitaet",children:"Definition 11.5.4"}),` mit
`,e.jsx(n,{children:"\\lambda = \\tfrac12"})," liefert"]}),e.jsx(a,{children:"f(\\cgreen{\\bz}) \\ \\cred{<}\\ \\tfrac12 f(\\corange{\\bx_1}) + \\tfrac12 f(\\corange{\\bx_2}) \\ =\\ m ."}),e.jsx(i.p,{children:`Damit gäbe es einen zulässigen Punkt mit einem kleineren Wert als dem Minimum, ein
Widerspruch. Also kann es keine zwei verschiedenen Minimalstellen geben.`})]})]}),e.jsxs(i.p,{children:[`Der Beweis ist kurz, und er zeigt, wo die Grenze verläuft:
Genommen wird nur ein einziges `,e.jsx(n,{children:"\\lambda"}),", nämlich ",e.jsx(n,{children:"\\tfrac12"}),`. Dasselbe Argument lässt sich
auch aus `,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),` ablesen. Die Minimalstellen bilden eine konvexe Menge; enthielte sie zwei
verschiedene Punkte, so enthielte sie die ganze Strecke dazwischen, und auf deren Innerem ist
`,e.jsx(n,{children:"f"})," nach ",e.jsx(i.a,{href:"#eq-strikte-konvexitaet",children:"(11.5.1)"}),` echt kleiner als an den Endpunkten. Eine konvexe Funktion, die auf einer
Strecke konstant ist, kann also nicht strikt konvex sein.`]})]}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.5.6 (Drei Aussagen, die auseinanderzuhalten sind)",id:"env-drei-aussagen-die-auseinanderzuhalten",children:[e.jsxs(i.p,{children:[`Damit sind die drei Versprechen sortiert, die in der Einleitung von
`,e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"})," noch zusammen aufgetreten sind."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokal ist global."}),` Das leistet schon gewöhnliche Konvexität, ohne jede
Differenzierbarkeit (`,e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),", ",e.jsx(i.a,{href:"#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Höchstens eine Lösung."})," Dafür braucht es strikte Konvexität (",e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Mindestens eine Lösung."})," Das folgt aus keinem von beiden."]}),`
`]}),e.jsxs(i.p,{children:["Punkt 3 wird am leichtesten übersehen. Die Exponentialfunktion ist auf ",e.jsx(n,{children:"\\R"}),` sogar
strikt konvex, denn `,e.jsx(n,{children:"f''(x) = e^x > 0"}),` überall, und trotzdem gibt es kein Minimum. Für die
Existenz sorgen andere Argumente: eine `,e.jsx(b,{id:"closed-bounded-set",children:"kompakte"}),` zulässige Menge und
Stetigkeit nach dem Satz von Weierstraß, wie in `,e.jsx(i.a,{href:"#env-projektionstheorem",children:"Satz 11.3.1"}),`, oder Koerzivität,
also `,e.jsx(n,{children:"f(\\bx) \\to \\infty"})," für ",e.jsx(n,{children:"\\left\\|\\bx\\right\\| \\to \\infty"}),`. Im zweiten Fall genügt es, auf
einer hinreichend großen abgeschlossenen Kugel zu minimieren, und wir sind wieder im ersten.`]}),e.jsxs(i.p,{children:["Erst beides zusammen, strikte Konvexität und Existenz, gibt die ",e.jsx(i.em,{children:"genau eine"}),` Lösung. Das Kapitel hat davon schon zwei Beispiele geliefert. Der
`,e.jsx(b,{id:"linear-least-squares",children:"Kleinste-Quadrate-Verlust"}),` ist bei vollem Spaltenrang der
Designmatrix strikt konvex und koerziv, das Minimum existiert und ist eindeutig
(`,e.jsx(i.a,{href:"#env-kleinste-quadrate-und-ridge",children:"Beispiel 11.3.16"}),", ",e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` rechnet es aus). Und die Ridge-Regression ist es für jedes
`,e.jsx(n,{children:"\\lambda > 0"})," auch dann, wenn die Designmatrix rangdefizient ist."]}),e.jsxs(i.p,{children:[`Ein statistisches Gegenbeispiel zeigt, dass Punkt 3 keine Spitzfindigkeit ist. Bei perfekt
trennbaren Daten bleibt die negative Log-Likelihood der logistischen Regression strikt konvex,
angenommen wird ihr Infimum aber nicht: Die Koeffizienten laufen ins Unendliche, während der
Wert gegen `,e.jsx(n,{children:"0"})," fällt. Schon mit den beiden Beobachtungen ",e.jsx(n,{children:"(x, y) = (1, 1)"}),` und
`,e.jsx(n,{children:"(x, y) = (-1, 0)"})," und dem Modell ",e.jsx(n,{children:"\\pi(\\beta) = 1/(1 + e^{-\\beta x})"}),` ist
`,e.jsx(n,{children:"\\ell(\\beta) = \\log(1 + e^{\\beta}) - \\beta + \\log(1 + e^{-\\beta})"}),`, und dieser Wert fällt von
`,e.jsx(n,{children:"1{,}386"})," bei ",e.jsx(n,{children:"\\beta = 0"})," auf ",e.jsx(n,{children:"9{,}1 \\cdot 10^{-5}"})," bei ",e.jsx(n,{children:"\\beta = 10"}),`, bleibt aber für jedes
endliche `,e.jsx(n,{children:"\\beta"}),` positiv. Ein Ridge-Strafterm repariert hier nicht die Eindeutigkeit, die schon
da ist, sondern die Existenz: Der Zusatz `,e.jsx(n,{children:"\\lambda\\beta^2"}),` ist koerziv, und für
`,e.jsx(n,{children:"\\lambda = 0{,}2"})," liegt das Minimum bei ",e.jsx(n,{children:"\\beta = 1{,}18"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Optimierungslandschaften"}),`
`,e.jsx(i.p,{children:`Der Unterschied lässt sich als Bildtafel mit drei Flächen nebeneinander zeigen. Wir bauen ihn
in einer Variablen nach, weil sich dort alles einzeichnen lässt, worauf es ankommt: erst die
drei Fälle als Tafel, danach ein Verfahren, das in einem von ihnen scheitert.`}),`
`,e.jsxs(we,{title:"Drei Landschaften nebeneinander",children:[e.jsx(i.p,{children:`Woran sehen wir einer Landschaft an, welcher der drei Fälle vorliegt? Die Antwort steckt nicht
im Verlauf des Graphen, sondern in der Menge der Minimalstellen.`}),e.jsx(gr,{}),e.jsxs(i.p,{children:["Die mittlere Tafel ist der Fall, den ",e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),` abdeckt: strikt konvex, also höchstens eine
Minimalstelle, und weil die Parabel koerziv ist, wird sie auch angenommen. Links steht eine
konvexe Funktion mit einem flachen Stück. Sie erfüllt `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"})," mit ",e.jsx(n,{children:"\\le"}),`, aber auf dem
Plateau steht in `,e.jsx(i.a,{href:"#eq-strikte-konvexitaet",children:"(11.5.1)"}),` Gleichheit, sie ist also nicht
strikt konvex. Ihre Minimalstellen bilden das ganze Intervall von `,e.jsx(n,{children:"-0{,}8"})," bis ",e.jsx(n,{children:"0{,}8"}),`, und
das ist eine konvexe Menge, wie `,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),` es verlangt. Rechts ist die Konvexität verletzt,
und damit fällt die ganze Theorie dieses Abschnitts weg: Zwei kritische Punkte tragen dort
positive Krümmung, nur einer von beiden ist global.`]})]}),`
`,e.jsxs(L,{title:"Ein Abstiegsverfahren auf der Doppelmulde",children:[e.jsxs(i.p,{children:[`Wie sich der Unterschied auf ein Verfahren auswirkt, gehört eigentlich schon zu
`,e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"}),`. Ein Blick voraus lohnt sich trotzdem: Wir lassen den einfachsten Vertreter laufen,
den `,e.jsx(b,{id:"gradient-descent",children:"Gradientenabstieg"})," aus ",e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.2",children:"Abschnitt 10.2"}),`, der
wiederholt ein Stück in Richtung des stärksten Abstiegs geht. Auf der Doppelmulde entscheidet
allein der Startwert, in welchem Tal er endet.`]}),e.jsxs(we,{title:"Ein Abstieg auf der Doppelmulde",children:[e.jsx(i.p,{children:`Der Startwert lässt sich Schritt für Schritt verschieben; die Tafel zeigt jedes Mal die
ausgewählten Zwischenstationen und den Punkt, an dem die Folge zur Ruhe kommt. Wo genau
verläuft die Grenze zwischen den beiden Einzugsgebieten?`}),e.jsx(kr,{}),e.jsxs(i.p,{children:["Wie das Widget zeigt, trennt der Höcker bei ",e.jsx(n,{children:"-0{,}1699"}),` die beiden Einzugsbereiche. Am
Endpunkt selbst ist der Unterschied nicht abzulesen: In beiden Tälern verschwindet die
Ableitung, in beiden ist die Krümmung positiv, in beiden meldet jedes Abbruchkriterium Erfolg.
Wer ein nicht-konvexes Problem rechnet, muss deshalb mehrere Startwerte durchprobieren; bei
einer konvexen Zielfunktion erübrigt sich das, denn nach
`,e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` ist jeder Punkt mit verschwindendem Gradienten
schon das Ziel.`]})]})]}),`
`,e.jsx(i.h3,{children:"Konvexe und nicht-konvexe Probleme in Statistik und maschinellem Lernen"}),`
`,e.jsx(i.p,{children:`Zum Abschluss eine Landkarte. Sie sortiert die gängigen Verfahren nach der Frage,
die dieser Abschnitt beantwortet hat, und ist beim Lesen von Software-Dokumentation
erstaunlich nützlich: Sie sagt voraus, ob ein Startwert das Ergebnis beeinflussen kann.`}),`
`,e.jsxs(j,{kind:"Bemerkung",label:"11.5.7 (Eine Landkarte der Optimierungsprobleme)",id:"env-eine-landkarte-der-optimierungsprobleme",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Strikt konvexe Probleme"})," haben höchstens eine Lösung (",e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),`), und wo sie existiert, ist
sie eindeutig und global. Jeder korrekt konvergierte Lauf muss daher dieselbe Lösung liefern;
Rechenweg, Laufzeit und Abbruchstatus können trotzdem vom Startwert abhängen.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Kleinste Quadrate, ",e.jsx(n,{children:"\\min_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),", sofern ",e.jsx(n,{children:"\\bX"}),` vollen
`,e.jsx(i.em,{children:"Spalten"}),"rang hat (",e.jsx(i.a,{href:"#env-kleinste-quadrate-und-ridge",children:"Beispiel 11.3.16"}),`). „Voller Rang" allein genügt nicht; entscheidend ist
der Spaltenrang, denn nur er macht `,e.jsx(n,{children:"\\bX^\\top\\bX"})," positiv definit."]}),`
`,e.jsxs(i.li,{children:["Allgemeiner die Maximum-Likelihood-Schätzung in ",e.jsx(b,{id:"linear-regression",children:`verallgemeinerten linearen
Modellen`}),` mit kanonischem Link. Dort hat die negative Log-Likelihood die
Hesse-Matrix `,e.jsx(n,{children:"\\bX^\\top\\bW\\bX"})," mit einer nichtnegativen Diagonalmatrix ",e.jsx(n,{children:"\\bW"}),`, ist also stets
konvex, und bei vollem Spaltenrang und positiven Gewichten strikt konvex
(`,e.jsx(i.a,{href:"#env-logistische-regression-ist-ein-konvexes",children:"Beispiel 11.4.12"})," rechnet den logistischen Fall vor)."]}),`
`,e.jsxs(i.li,{children:["Support Vector Machines. Die Zielfunktion ",e.jsx(n,{children:`\\tfrac12\\left\\|\\bw\\right\\|_2^2 + C\\sum_i
\\max\\{0,\\ 1 - y_i(\\bw^\\top\\bx_i + b)\\}`}),` ist als Summe konvexer Funktionen konvex
(`,e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),"), und im Argument ",e.jsx(n,{children:"\\bw"}),` ist der erste Summand
strikt konvex; damit ist der Trennvektor `,e.jsx(n,{children:"\\bw"})," nach ",e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),`
eindeutig. Im Paar `,e.jsx(n,{children:"(\\bw, b)"}),` ist die Zielfunktion dagegen nicht strikt konvex, denn der
Achsenabschnitt `,e.jsx(n,{children:"b"}),` geht nur über den stückweise linearen Hinge-Verlust ein und kann bei
trennbaren Daten mit Sicherheitsabstand mehrdeutig bleiben.`]}),`
`,e.jsxs(i.li,{children:[`Ridge-Regression,
`,e.jsx(n,{children:"\\min_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2 + \\lambda\\left\\|\\bbeta\\right\\|_2^2"}),`, für
jedes `,e.jsx(n,{children:"\\lambda > 0"})," und jedes ",e.jsx(n,{children:"\\bX"})," (",e.jsx(i.a,{href:"#env-kleinste-quadrate-und-ridge",children:"Beispiel 11.3.16"}),"), ebenso das ",e.jsx(i.em,{children:"Elastic Net"}),`, solange
sein Ridge-Anteil positiv ist.`]}),`
`,e.jsxs(i.li,{children:[`Graphisches LASSO, also die regularisierte Schätzung einer Präzisionsmatrix. Optimiert wird
über die positiv definiten Matrizen. Sie bilden nach `,e.jsx(i.a,{href:"#env-kovarianzmatrizen-sind-semidefinit-nicht",children:"Bemerkung 11.2.9"}),` das Innere des Kegels
aus `,e.jsx(i.a,{href:"#env-die-positiv-semidefiniten-matrizen",children:"Satz 11.2.8"})," ",e.jsx(i.em,{children:"innerhalb des Raums der symmetrischen Matrizen"}),", und der Term ",e.jsx(n,{children:"-\\log\\det"}),`
ist darauf strikt konvex.`]}),`
`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Konvexe, aber nicht strikt konvexe Probleme"})," haben nach ",e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),` eine konvexe
Lösungsmenge, die mehr als einen Punkt enthalten darf. Jede gefundene Lösung ist global, aber
verschiedene Implementierungen dürfen verschiedene Koeffizienten melden.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`Das LASSO,
`,e.jsx(n,{children:"\\min_{\\bbeta} \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2 + \\lambda\\left\\|\\bbeta\\right\\|_1"}),`. Der
Strafterm ist konvex, aber stückweise linear und damit nicht strikt; bei rangdefizienter
Designmatrix, dem Regelfall für `,e.jsx(n,{children:"p > n"}),", überträgt sich das auf die Zielfunktion."]}),`
`,e.jsxs(i.li,{children:[`Quantilregression. Die Verlustfunktion
`,e.jsx(n,{children:"\\rho_\\tau(u) = u\\left(\\tau - \\ind\\{u < 0\\}\\right)"}),` ist konvex, besteht aber aus zwei
Geradenstücken und ist auf keinem Intervall strikt konvex. Optimiert wird deshalb mit
Subgradienten oder als lineares Programm.`]}),`
`,e.jsxs(i.li,{children:[`Nicht-kanonische Links in verallgemeinerten linearen Modellen. Hier entfällt die Garantie:
Der Term, der beim kanonischen Link die Form `,e.jsx(n,{children:"\\bX^\\top\\bW\\bX"}),` erzwingt, fällt weg. Konvex
bleibt die negative Log-Likelihood trotzdem oft, etwa im Probit-Modell, weil die
Verteilungsfunktion der Normalverteilung log-konkav ist. Automatisch ist es eben nicht mehr.`]}),`
`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Nicht-konvexe Probleme"}),` können mehrere lokale Minima und Sattelpunkte haben. Verschiedene
Startwerte können dann in verschiedene Einzugsgebiete führen, und ein bloß stationäres Ergebnis
trägt kein globales Gütesiegel.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(b,{id:"neural-network",children:"Neuronale Netze"}),`. Schon das Vertauschen zweier Neuronen einer Schicht
liefert ein anderes Parameterset mit demselben Verlust, das Problem ist also nicht einmal
identifizierbar.`]}),`
`,e.jsxs(i.li,{children:["Clusteranalyse: ",e.jsx(n,{children:"k"}),`-means und Verwandte,
`,e.jsx(b,{id:"gaussian-mixture-model",children:"Mischverteilungsmodelle"}),`. Beide Verfahren werden in der Praxis
mehrfach neu gestartet, und das beste Ergebnis gewinnt.`]}),`
`,e.jsx(i.li,{children:`Bäume und darauf aufbauende Verfahren, CART, Random Forests, XGBoost. Hier ist der
Suchraum überhaupt nicht kontinuierlich, optimiert wird gierig Schnitt für Schnitt.`}),`
`,e.jsx(i.li,{children:`Modelle mit latenten Variablen: gemischte Modelle, Strukturgleichungsmodelle,
Faktorenanalyse.`}),`
`,e.jsxs(i.li,{children:["Variablenselektion mit ",e.jsx(n,{children:"L_0"}),"-Strafe, ",e.jsx(i.em,{children:"Best Subset"}),", ",e.jsx(i.em,{children:"Spike and Slab"}),`. Das Zählen der
Nicht-Null-Koeffizienten ist keine Norm und nicht konvex, das Problem ist kombinatorisch.`]}),`
`,e.jsxs(i.li,{children:["Dimensionsreduktion und Einbettungen: tSNE, UMAP, ",e.jsx(i.code,{children:"word2vec"}),"."]}),`
`,e.jsxs(i.li,{children:[`Matrixvervollständigung und Tensorzerlegungen: nichtnegative Matrixfaktorisierung, dünn
besetzte Hauptkomponenten. Die Zielfunktion aus
`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.4",children:"Abschnitt 10.4"})," ist in ",e.jsx(n,{children:"\\bU"})," und in ",e.jsx(n,{children:"\\bV"}),` jeweils konvex, in
beiden zusammen aber nicht.`]}),`
`,e.jsx(i.li,{children:"Graphische Modelle, wenn nicht nur die Gewichte, sondern die Struktur selbst gesucht wird."}),`
`]}),e.jsx(i.p,{children:`Die Wahl von Hyperparametern gehört nur mit Vorbehalt in dieselbe Liste: Dort ist die
Zielfunktion, meist ein Kreuzvalidierungsfehler, oft nicht einmal stetig. Von Sattelpunkten
lässt sich da gar nicht sprechen, und deshalb kommen Gittersuche, Zufallssuche und Bayessche
Optimierung zum Einsatz statt Abstiegsverfahren.`})]}),`
`,e.jsx(i.h3,{children:"Die Kernkonzepte des Kapitels"}),`
`,e.jsx(j,{kind:"Bemerkung",label:"11.5.8 (Fünf Bausteine, die bleiben)",id:"env-fuenf-bausteine-die-bleiben",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Konvexkombinationen"})," (",e.jsx(i.a,{href:"#sec-11.1",children:"Abschnitt 11.1"}),"): Gewichte ",e.jsx(n,{children:"w_i \\ge 0"})," mit Summe ",e.jsx(n,{children:"1"}),`
(`,e.jsx(i.a,{href:"#env-konvexkombination",children:"Definition 11.1.1"}),`), für zwei Punkte die Verbindungsstrecke
(`,e.jsx(i.a,{href:"#env-konvexkombinationen-zweier-vektoren",children:"Satz 11.1.4"}),`), für endlich viele die konvexe Hülle
`,e.jsx(n,{children:"\\conv(\\Xcal)"})," (",e.jsx(i.a,{href:"#env-konvexe-huelle",children:"Definition 11.1.5"}),`); der Erwartungswert ist der Prototyp
(`,e.jsx(i.a,{href:"#env-der-erwartungswert-ist-eine",children:"Beispiel 11.1.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Konvexe Mengen"})," (",e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),`): mit je zwei Punkten die ganze Strecke
(`,e.jsx(i.a,{href:"#env-konvexe-menge",children:"Definition 11.2.1"}),`), per Induktion alle endlichen Konvexkombinationen
(`,e.jsx(i.a,{href:"#env-konvexe-mengen-enthalten-alle",children:"Satz 11.2.3"}),`), stabil unter Durchschnitt, kartesischem Produkt,
affinem Bild und Summe (`,e.jsx(i.a,{href:"#env-konvexitaetserhaltung",children:"Satz 11.2.10"}),"), und ",e.jsx(n,{children:"\\conv(\\Xcal)"}),` als kleinste
konvexe Obermenge (`,e.jsx(i.a,{href:"#env-konvexe-huelle-als-durchschnitt",children:"Satz 11.2.13"}),`); wichtigstes Beispiel für die
Statistik ist der Kegel der positiv semidefiniten Matrizen
(`,e.jsx(i.a,{href:"#env-die-positiv-semidefiniten-matrizen",children:"Satz 11.2.8"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Konvexe Funktionen"})," (",e.jsx(i.a,{href:"#sec-11.3",children:"Abschnitt 11.3"}),`): konvexer
`,e.jsx(b,{id:"convexity",children:"Epigraph"})," (",e.jsx(i.a,{href:"#env-konvexe-funktion",children:"Definition 11.3.6"}),`), gleichwertig die
Sehnenungleichung `,e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"})," (",e.jsx(i.a,{href:"#env-konvexitaet-als-ungleichung",children:"Satz 11.3.8"}),`);
konvex sind affine und quadratische Funktionen sowie alle `,e.jsx(b,{id:"norm",children:"Normen"}),`
(`,e.jsx(i.a,{href:"#env-affine-funktionen",children:"Beispiel 11.3.11"}),", ",e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"}),", ",e.jsx(i.a,{href:"#env-jede-norm-ist-konvex",children:"Satz 11.3.15"}),`);
dazu das `,e.jsx(b,{id:"projection",children:"Projektionstheorem"})," (",e.jsx(i.a,{href:"#env-projektionstheorem",children:"Satz 11.3.1"}),`) als Brücke zur
Geometrie der kleinsten Quadrate.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Eigenschaften konvexer Funktionen"})," (",e.jsx(i.a,{href:"#sec-11.4",children:"Abschnitt 11.4"}),`): der Baukasten aus Summe,
nichtnegativem Vielfachem, Supremum und Grenzwert
(`,e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),`), die
`,e.jsx(b,{id:"expected-value",children:"Jensen-Ungleichung"})," (",e.jsx(i.a,{href:"#env-jensen-ungleichung",children:"Satz 11.4.6"}),`), die Äquivalenz von
Sehnen-, Tangenten- und Krümmungsbedingung (`,e.jsx(i.a,{href:"#env-konvexe-funktionen-von-vektoren-zu",children:"Satz 11.4.9"}),`) und
der `,e.jsx(b,{id:"gradient",children:"Subgradient"}),` dort, wo die Tangente fehlt
(`,e.jsx(i.a,{href:"#env-subgradient-und-subdifferential",children:"Definition 11.4.14"}),", ",e.jsx(i.a,{href:"#env-existenz-von-subgradienten-im-inneren",children:"Satz 11.4.15"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Konvexe Optimierungsprobleme"})," (",e.jsx(i.a,{href:"#sec-11.5",children:"Abschnitt 11.5"}),`): kritischer Punkt und globales
Minimum fallen zusammen, lokale Minima sind global, Sattelpunkte gibt es nicht
(`,e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),", ",e.jsx(i.a,{href:"#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),`);
die Lösungsmenge ist konvex (`,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),`), strikte
Konvexität macht sie höchstens einelementig (`,e.jsx(i.a,{href:"#env-strikte-konvexitaet",children:"Definition 11.5.4"}),`,
`,e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),`), und die Existenz ist davon unabhängig
(`,e.jsx(i.a,{href:"#env-drei-aussagen-die-auseinanderzuhalten",children:"Bemerkung 11.5.6"}),")."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Das Wichtigste in Kürze"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Abschnitt"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Was bleibt"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-11.1",children:"11.1"})}),e.jsx(i.td,{children:"Konvexkombinationen"}),e.jsxs(i.td,{children:["Gewichte ",e.jsx(n,{children:"w_i \\ge 0"})," mit ",e.jsx(n,{children:"\\sum_i w_i = 1"}),"; zwei Punkte spannen eine Strecke auf, endlich viele die konvexe Hülle ",e.jsx(n,{children:"\\conv(\\Xcal)"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-11.2",children:"11.2"})}),e.jsx(i.td,{children:"Konvexe Mengen"}),e.jsxs(i.td,{children:["Mit je zwei Punkten die ganze Strecke; stabil unter Durchschnitt, kartesischem Produkt, affinen Abbildungen und Summe; der Kegel ",e.jsx(n,{children:"\\{\\bA = \\bA^\\top\\colon \\bA \\succeq 0\\}"})," als Beispiel"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-11.3",children:"11.3"})}),e.jsx(i.td,{children:"Konvexe Funktionen"}),e.jsxs(i.td,{children:["Konvexer Epigraph, gleichbedeutend mit ",e.jsx(n,{children:"f(\\cgreen{\\lambda\\bx + (1-\\lambda)\\by}) \\le \\lambda f(\\bx) + (1-\\lambda)f(\\by)"}),"; die Projektion auf eine nichtleere abgeschlossene konvexe Menge existiert und ist eindeutig"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-11.4",children:"11.4"})}),e.jsx(i.td,{children:"Eigenschaften"}),e.jsxs(i.td,{children:["Baukasten aus Summe, nichtnegativem Vielfachem, Supremum und Grenzwert; Jensen; für ",e.jsx(n,{children:"f \\in \\Ccal^2"})," auf offenem, konvexem Bereich ist Konvexität gleichbedeutend mit ",e.jsx(n,{children:"\\bH_f(\\bx) \\succeq 0"})," überall; Subgradienten im Knick"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-11.5",children:"11.5"})}),e.jsx(i.td,{children:"Konvexe Optimierung"}),e.jsxs(i.td,{children:["Für differenzierbares konvexes ",e.jsx(n,{children:"f"})," bedeutet ",e.jsx(n,{children:"\\nabla f(\\corange{\\bx^\\star}) = \\bnull^\\top"})," globales Minimum; lokal ist global, keine Sattelpunkte; konvexe Lösungsmenge; strikt konvex bedeutet höchstens eine Lösung, Existenz ist eine eigene Frage"]})]})]})]}),`
`,e.jsx(i.p,{children:`Ein Satz fasst das Kapitel zusammen. Konvexität kostet uns die Gleichheit der Linearität und
gibt uns dafür eine globale Aussage, die keine lokale Rechnung je liefern könnte.`}),`
`,e.jsx(i.h3,{children:"Nächstes Kapitel"}),`
`,e.jsxs(i.p,{children:[`Wir wissen jetzt, wann ein lokaler Befund ein globaler ist. Offen ist die andere Hälfte: wie
wir überhaupt dorthin kommen. Davon handelt `,e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"}),` – von Abstiegsverfahren und ihren
Schrittweiten, von Newton-Verfahren, die die Krümmung mitnehmen, und von Nebenbedingungen. Die
Ergebnisse dieses Kapitels sind dort die Eintrittskarte für alle Garantien, die über „das
Verfahren bleibt irgendwo stehen" hinausgehen.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Acht Aussagen aus dem ganzen Kapitel. Welche davon stimmen?"}),`
`,e.jsxs(en,{children:[e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Die konvexe Hülle der Einheitssphäre ",e.jsx(n,{children:"\\{\\bx \\in \\R^n\\colon \\left\\|\\bx\\right\\|_2 = 1\\}"}),` ist
wieder die Einheitssphäre.`]}),e.jsxs(i.p,{children:["Sie ist die abgeschlossene Einheitskugel. Schon der Mittelpunkt von ",e.jsx(n,{children:"\\be_1"})," und ",e.jsx(n,{children:"\\be_2"}),` liegt
in der Hülle und hat die Norm `,e.jsx(n,{children:"1/\\sqrt{2} = 0{,}7071"}),`, gehört also nicht zur Sphäre. Umgekehrt
lässt sich jeder Punkt der Kugel als Konvexkombination zweier Sphärenpunkte schreiben: Wir
legen eine Gerade durch ihn und nehmen die beiden Schnittpunkte mit der Sphäre. Für
`,e.jsx(n,{children:"\\bx = (0{,}3;\\ -0{,}2)^\\top"}),` und die waagerechte Richtung sind das
`,e.jsx(n,{children:"(0{,}9798;\\ -0{,}2)^\\top"})," und ",e.jsx(n,{children:"(-0{,}9798;\\ -0{,}2)^\\top"})," mit den Gewichten ",e.jsx(n,{children:"0{,}6531"}),` und
`,e.jsx(n,{children:"0{,}3469"}),`. Die Sphäre selbst ist nicht konvex (Selbsttest in
`,e.jsx(i.a,{href:"#sec-11.2",children:"Abschnitt 11.2"}),"), ihre Hülle ist es nach ",e.jsx(i.a,{href:"#env-konvexe-huelle-als-durchschnitt",children:"Satz 11.2.13"}),"."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," differenzierbar und konvex und hat ",e.jsx(n,{children:"f"}),` mehrere kritische Punkte, so
haben sie alle denselben Funktionswert.`]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-kritischer-punkt-und-globales-minimum",children:"Satz 11.5.1"}),` ist jeder kritische Punkt ein globales Minimum, und globale Minima tragen
alle den kleinsten Wert. Die erste Landschaft im Widget zeigt genau das: Auf dem Plateau von
`,e.jsx(n,{children:"-0{,}8"})," bis ",e.jsx(n,{children:"0{,}8"})," verschwindet die Ableitung überall, und überall steht der Wert ",e.jsx(n,{children:"0"}),`. Nach
`,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"})," bilden diese Stellen sogar eine konvexe Menge, hier ein Intervall."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Jede strikt konvexe Funktion ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," besitzt genau ein globales Minimum."]}),e.jsxs(i.p,{children:["Sie besitzt ",e.jsx(i.em,{children:"höchstens"})," eines (",e.jsx(i.a,{href:"#env-hoechstens-eine-minimalstelle",children:"Satz 11.5.5"}),`). Die Existenz ist eine unabhängige Frage:
`,e.jsx(n,{children:"f(x) = e^x"})," ist wegen ",e.jsx(n,{children:"f''(x) = e^x > 0"})," strikt konvex, nähert sich ihrem Infimum ",e.jsx(n,{children:"0"}),` aber
nur an. Statistisch relevant ist derselbe Effekt bei perfekt trennbaren Daten in der
logistischen Regression, wo die Koeffizienten ins Unendliche laufen (`,e.jsx(i.a,{href:"#env-drei-aussagen-die-auseinanderzuhalten",children:"Bemerkung 11.5.6"}),`).
Gesichert wird die Existenz erst durch Kompaktheit oder Koerzivität.`]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f_1"})," konvex und ",e.jsx(n,{children:"f_2"})," strikt konvex, so ist ",e.jsx(n,{children:"f_1 + f_2"})," strikt konvex."]}),e.jsxs(i.p,{children:["Wir addieren die beiden Ungleichungen ",e.jsx(i.a,{href:"#eq-konvexitaet-als-ungleichung",children:"(11.3.4)"})," und ",e.jsx(i.a,{href:"#eq-strikte-konvexitaet",children:"(11.5.1)"}),` für
`,e.jsx(n,{children:"\\bx \\neq \\by"})," und ",e.jsx(n,{children:"\\lambda \\in (0,1)"}),": Links steht ",e.jsx(n,{children:"\\le"}),", rechts ",e.jsx(n,{children:"<"}),", in der Summe also ",e.jsx(n,{children:"<"}),`.
Davon lebt die Ridge-Regression. Der Kleinste-Quadrate-Term ist immer konvex und bei
rangdefizienter Designmatrix nur nicht strikt konvex; der Strafterm
`,e.jsx(n,{children:"\\lambda\\left\\|\\bbeta\\right\\|_2^2"}),` ist für
`,e.jsx(n,{children:"\\lambda > 0"}),` strikt konvex, und die Summe erbt die strikte Konvexität
(`,e.jsx(i.a,{href:"#env-kleinste-quadrate-und-ridge",children:"Beispiel 11.3.16"}),", ",e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),"). Ohne den strikten Summanden geht es nicht: ",e.jsx(n,{children:"\\left|x\\right|"}),`
und `,e.jsx(n,{children:"\\max\\{0, x\\}"})," sind beide konvex, ihre Summe stimmt auf ",e.jsx(n,{children:"(-\\infty, 0]"}),` aber mit
`,e.jsx(n,{children:"\\left|x\\right| = -x"})," überein und verläuft dort geradlinig."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Aus der Jensen-Ungleichung folgt für eine Zufallsvariable ",e.jsx(n,{children:"X"}),` mit endlichem Träger sowohl
`,e.jsx(n,{children:"\\E[X]^2 \\le \\E[X^2]"})," als auch ",e.jsx(n,{children:"\\E\\left[\\sqrt{X}\\right] \\le \\sqrt{\\E[X]}"}),", sofern ",e.jsx(n,{children:"X \\ge 0"}),`
ist.`]}),e.jsxs(i.p,{children:["Beides ist derselbe ",e.jsx(i.a,{href:"#env-jensen-ungleichung",children:"Satz 11.4.6"}),", einmal mit der konvexen Funktion ",e.jsx(n,{children:"x \\mapsto x^2"}),` und einmal
mit der konkaven Wurzel, bei der sich das Ungleichheitszeichen umdreht (`,e.jsx(i.a,{href:"#env-wie-wir-die-ungleichung-lesen",children:"Bemerkung 11.3.9"}),`). Am
fairen Würfel gerechnet: `,e.jsx(n,{children:"\\E[X] = 3{,}5"})," und ",e.jsx(n,{children:"\\E[X^2] = 15{,}1667"}),` gegen
`,e.jsx(n,{children:"\\E[X]^2 = 12{,}25"}),", die Differenz ",e.jsx(n,{children:"2{,}9167"})," ist die Varianz (",e.jsx(i.a,{href:"#env-die-varianz-ist-nicht-negativ",children:"Beispiel 11.4.8"}),`). Und
`,e.jsx(n,{children:"\\E[\\sqrt{X}] = 1{,}8053"})," liegt unter ",e.jsx(n,{children:"\\sqrt{3{,}5} = 1{,}8708"}),"."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Die quadratische Funktion ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bQ\\bx"})," ist genau dann konvex, wenn ",e.jsx(n,{children:"\\bQ"}),` positiv
semidefinit ist.`]}),e.jsxs(i.p,{children:["Die quadratische Form sieht von ",e.jsx(n,{children:"\\bQ"}),` nur den symmetrischen Anteil
`,e.jsx(n,{children:"(\\bQ + \\bQ^\\top)/2"}),", und nach ",e.jsx(i.a,{href:"#env-quadratische-funktionen",children:"Satz 11.3.12"}),` entscheidet allein dieser. Für
`,e.jsx(n,{children:"\\bQ = \\bigl(\\begin{smallmatrix} 1 & 5 \\\\ -5 & 1\\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"\\bx^\\top\\bQ\\bx = x_1^2 + x_2^2"}),", also sogar strikt konvex, während ",e.jsx(n,{children:"\\bQ"}),` nicht einmal
symmetrisch ist und damit nach `,e.jsx(i.a,{href:"#env-positiv-semidefinit",children:"Definition 11.2.7"}),` gar nicht positiv semidefinit heißen kann.
An der Stelle `,e.jsx(n,{children:"\\bx = (2,3)^\\top"})," steht auf beiden Seiten ",e.jsx(n,{children:"13"}),". Die Bedingung an ",e.jsx(n,{children:"\\bQ"}),` selbst
ist also zu eng (`,e.jsx(i.a,{href:"#env-warum-der-symmetrische-anteil",children:"Bemerkung 11.3.13"}),")."]})]}),e.jsxs(E,{wahr:!1,children:[e.jsxs(i.p,{children:["Im Knick ",e.jsx(n,{children:"x = 0"})," hat ",e.jsx(n,{children:"f(x) = \\left|x\\right|"}),` keinen Subgradienten, weil dort die Ableitung
fehlt.`]}),e.jsxs(i.p,{children:["Der Subgradient braucht keine Ableitung, das ist gerade sein Zweck. Bedingung ",e.jsx(i.a,{href:"#eq-subgradient-und-subdifferential",children:"(11.4.3)"}),`
verlangt in `,e.jsx(n,{children:"x = 0"})," nur ",e.jsx(n,{children:"\\left|y\\right| \\ge v\\,y"})," für alle ",e.jsx(n,{children:"y"}),`, und das erfüllt jedes
`,e.jsx(n,{children:"v \\in [-1,1]"}),`. Das Subdifferential ist also ein ganzes Intervall,
`,e.jsx(n,{children:"\\partial f(0) = [-1,1]"}),", und weil ",e.jsx(n,{children:"\\bnull"})," darin liegt, ist ",e.jsx(n,{children:"0"})," nach ",e.jsx(i.a,{href:"#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),` die
globale Minimalstelle (`,e.jsx(i.a,{href:"#env-das-subdifferential-des-betrags",children:"Beispiel 11.4.16"}),`). Umgekehrt wird ein Rand gefährlich: Auf
`,e.jsx(n,{children:"[0,\\infty)"})," hat das konvexe ",e.jsx(n,{children:"-\\sqrt{x}"})," in ",e.jsx(n,{children:"0"}),` wirklich keinen Subgradienten
(`,e.jsx(i.a,{href:"#env-randpunkte-und-wozu-subgradienten-gut",children:"Bemerkung 11.4.17"}),")."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsx(i.p,{children:`Erfüllen zwei verschiedene Koeffizientenvektoren eines LASSO-Problems beide die
Subgradienten-Optimalitätsbedingung, so sind beide global optimal.`}),e.jsxs(i.p,{children:["Die LASSO-Zielfunktion ist als Summe zweier konvexer Funktionen konvex (",e.jsx(i.a,{href:"#env-operationen-die-konvexitaet-erhalten",children:"Satz 11.4.1"}),`), also
ist jeder Punkt mit `,e.jsx(n,{children:"\\bnull"})," im Subdifferential global optimal (",e.jsx(i.a,{href:"#env-was-daraus-folgt-und-was-nicht",children:"Bemerkung 11.5.2"}),`). Strikt
konvex ist sie bei
rangdefizienter Designmatrix nicht, die Lösungsmenge kann deshalb mehr als einen Punkt
enthalten. Nach `,e.jsx(i.a,{href:"#env-die-minimalstellen-bilden-eine-konvexe",children:"Satz 11.5.3"}),` ist sie konvex, also liegt sogar die ganze Verbindungsstrecke
zwischen den beiden Lösungen in der Lösungsmenge, und alle Punkte darauf haben denselben
Zielwert. Zwei bloße Softwareausgaben wären dagegen noch kein Beweis: Zuerst sind
Konvergenzstatus und Optimalitätsresiduum zu prüfen. Bei nicht-konvexen Verfahren wie
`,e.jsx(n,{children:"k"}),"-means wäre selbst erfüllte lokale Optimalität kein globales Gütesiegel (",e.jsx(i.a,{href:"#env-eine-landkarte-der-optimierungsprobleme",children:"Bemerkung 11.5.7"}),")."]})]}),e.jsxs(E,{wahr:!0,children:[e.jsxs(i.p,{children:["Im Abstiegs-Widget landet ein Lauf, der bei ",e.jsx(n,{children:"x_0 = -0{,}16"})," startet, im tiefen Tal rechts."]}),e.jsxs(i.p,{children:[`Er landet dort, obwohl er weit links vom tiefen Tal beginnt. Die Wasserscheide ist der Höcker
bei `,e.jsx(n,{children:"-0{,}1699"}),", und ",e.jsx(n,{children:"-0{,}16"}),` liegt knapp rechts davon; der negative Gradient zeigt dort nach
rechts, und die Folge rollt über den ganzen Höcker hinweg bis `,e.jsx(n,{children:"1{,}30084"}),`. Ein Start bei
`,e.jsx(n,{children:"-0{,}17"})," endet dagegen bei ",e.jsx(n,{children:"-1{,}13090"}),". Ein Reglerschritt von ",e.jsx(n,{children:"0{,}01"}),` entscheidet also über
einen Zielwert, der um `,e.jsx(n,{children:"2{,}44"})," auseinanderliegt."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Boyd und Vandenberghe, Convex Optimization, behandeln in Kapitel 4 die konvexen
Optimierungsprobleme selbst, darunter die Aussage, dass jedes lokale Minimum global ist, und
das Optimalitätskriterium für differenzierbare Zielfunktionen. Das Buch ist frei verfügbar.`})})]})}function vr(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(ui,{...r})}):ui(r)}const zr={sections:[{id:"11.1",key:"konvexkombinationen",title:"Konvexkombinationen und konvexe Hülle",C:rn(Pi)},{id:"11.2",key:"konvexe-mengen",title:"Konvexe Mengen",C:rn(Ti)},{id:"11.3",key:"projektion-konvexe-funktionen",title:"Projektion und konvexe Funktionen",C:rn(tr)},{id:"11.4",key:"eigenschaften",title:"Eigenschaften konvexer Funktionen",C:rn(or)},{id:"11.5",key:"konvexe-optimierung",title:"Konvexe Optimierung und Zusammenfassung",C:rn(vr)}]};export{zr as default};
