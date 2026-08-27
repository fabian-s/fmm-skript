import{j as e,h as Ce,b as V,r as E,u as qn,s as Ue,o as Be,W as pe,d as ie,A as we,p as De,F as P,f as Y,S as I,V as ve,g as u,C as v,M as n,a as o,E as q,G as T,P as ke,n as G,Q as Me,i as $,Z as We,t as mr,v as fr,z as dn,H as Fi,k as qi,q as qt,l as wr,L as At,e as Et,D as Bt,m as Ye}from"./index-GbyLwDE5.js";import{I as me,E as xe}from"./Interaktiv-DHZUUTxv.js";import{C as Wt}from"./ConceptFlow-CQqTMxA4.js";const Bi=P.blau,Wi=P.gruen,En=P.rot,cn=P.violett,Gi=[{id:"quadrat",label:"f(x) = x²",f:r=>r*r,fp:r=>2*r,y0:-1.2,y1:6.2},{id:"kubisch",label:"f(x) = x³/3 − x + 1",f:r=>r*r*r/3-r+1,fp:r=>r*r-1,y0:-2.2,y1:4.2},{id:"betrag",label:"f(x) = |x|",f:r=>Math.abs(r),fp:r=>r===0?NaN:Math.sign(r),y0:-.9,y1:3.3}],xn=-2.4,Bn=2.4,Wn=340,Sn=250,on=34,un=6,vr=18,zr=8,_r=240,$i=.01,te=(r,i=3)=>u(r,i);function Gt({aufgeloest:r}){const[i,t]=E.useState("quadrat"),[l,s]=E.useState(.6),[c,h]=E.useState(.6),x=Gi.find(H=>H.id===i)??Gi[0],{f:d,fp:f}=x,j=d(l),D=d(l+c),a=d(l-c),A=(D-j)/c,z=(j-a)/c,p=f(l),R=Number.isFinite(p),M=R?D-j-p*c:NaN,F=Math.abs(M)/Math.abs(c),_=R?d(l+c/2)-j-p*c/2:NaN,y=H=>on+(H-xn)/(Bn-xn)*Wn,g=H=>un+(x.y1-H)/(x.y1-x.y0)*Sn,m=qn({feld:{x0:on,y0:un,w:Wn,h:Sn},welt:{x0:xn,x1:Bn,y0:x.y0,y1:x.y1},snap:.05,clamp:([H,oe])=>[Ue(H,-1.5,1.5),oe],onDrag:([H])=>s(H)}),b=(()=>{const H=[];for(let oe=0;oe<=_r;oe++){const Re=xn+(Bn-xn)*oe/_r;H.push(`${oe===0?"M":"L"}${y(Re).toFixed(1)},${g(d(Re)).toFixed(1)}`)}return H.join(" ")})(),N=(H,oe,Re)=>({x1:y(xn),y1:g(oe+Re*(xn-H)),x2:y(Bn),y2:g(oe+Re*(Bn-H))}),S=N(l,j,A),w=N(l,j,z),B=R?N(l,j,p):null,k=R?j+p*c:NaN,K=x.id==="betrag"&&l!==0&&Math.abs(l)<c,O=Math.abs(z-p)>1e-12,X=R?K?"knick-im-fenster":Math.abs(M)<1e-12&&x.id==="betrag"?"lokal-gerade":Math.abs(M)<1e-12?"zufaellig-null":"regulaer":"knick",U={knick:{kind:"fail",text:`An der Stelle x = ${te(l,2)} stoßen zwei Geradenstücke aufeinander: von links kommen wir mit der Steigung ${te(z,2)} an, nach rechts geht es mit ${te(A,2)} weiter. Die beiden Sekanten laufen für h → 0 gegen verschiedene Geraden, eine eindeutige Tangente gibt es nicht, und der Grenzwert aus ${V("definition:differenzierbarkeit")} existiert nicht.`},"knick-im-fenster":{kind:"warn",text:`f ist in x = ${te(l,2)} differenzierbar mit f′(x) = ${te(p,2)}, aber der Knick bei 0 liegt noch zwischen x − h und x + h. Die ${O?"linke":"rechte"} Sekante läuft über ihn hinweg und misst ${te(O?z:A,2)} statt ${te(p,2)}. Schieben wir h unter ${te(Math.abs(l),2)}, sieht sie nur noch das glatte Stück: lineare Approximation ist eine rein lokale Aussage.`},"lokal-gerade":{kind:"ok",text:`Hier ist f in einer ganzen Umgebung von x = ${te(l,2)} selbst eine Gerade. Der Restterm ist deshalb exakt null, die grüne Approximation trifft f auf diesem Stück nicht nur näherungsweise, sondern genau.`},"zufaellig-null":{kind:"warn",text:`Der Restterm ist hier zufällig null, obwohl f gekrümmt ist: Für f(x) = x³/3 − x + 1 gilt r(h) = h²(x + h/3), und das verschwindet genau bei x = −h/3 = ${te(-c/3,2)}. Sekante und Tangente haben deshalb dieselbe Steigung. Ein Schritt am x- oder h-Regler zerstört die Balance wieder: Kleinheit des Restes ist eine Aussage über h → 0, keine über einzelne h.`},regulaer:{kind:"neutral",text:`Die rechte Sekante hat die Steigung ${te(A,4)}, die Tangente ${te(p,4)}. Ihr Abstand ${te(Math.abs(A-p),4)} ist genau der relative Fehler |r(h)|/|h|, denn r(h)/h ist die Differenz der beiden Steigungen. Nach ${V("satz:ableitung-als-lineare-approximation")}(2) wandert dieser Wert für h → 0 gegen null, und die violette Sekante legt sich auf die grüne Tangente.`}}[X],ae=Be(x.y0,x.y1,5),Ae=Be(xn,Bn,5),Qe=ae.length>1?Math.abs(ae[1]-ae[0]):void 0,Ze=Ae.length>1?Math.abs(Ae[1]-Ae[0]):void 0;return e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2",children:Gi.map(H=>e.jsx("button",{type:"button","aria-pressed":H.id===i,className:H.id===i?pe:ie,onClick:()=>t(H.id),children:H.label},H.id))}),e.jsx(we,{children:"Ziehen wir die Stelle x über die Kurve und schieben h nach unten, bis der rote Balken verschwindet."}),e.jsxs("svg",{viewBox:`0 0 ${on+Wn+zr} ${un+Sn+vr}`,width:on+Wn+zr,height:un+Sn+vr,className:"h-auto max-w-full select-none rounded",role:"img","aria-label":`${x.label} mit den beiden Sekanten durch x = ${te(l,2)} und den Nachbarstellen x ± ${te(c,2)}, der Tangente und dem Restterm über x + h.`,...m.svgProps,...m.surfaceProps("x"),style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)",...m.svgProps.style,...m.surfaceProps("x").style},children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s101-clip",children:e.jsx("rect",{x:on,y:un,width:Wn,height:Sn})})}),ae.map(H=>e.jsxs("g",{children:[e.jsx("line",{x1:on,x2:on+Wn,y1:g(H),y2:g(H),stroke:H===0?"var(--w-axis, #64748b)":"var(--w-grid, #e2e8f0)",strokeWidth:H===0?1.2:.6}),e.jsx("text",{x:on-4,y:g(H)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:10,children:De(H,Qe)})]},`y${H}`)),Ae.map(H=>e.jsxs("g",{children:[e.jsx("line",{y1:un,y2:un+Sn,x1:y(H),x2:y(H),stroke:H===0?"var(--w-axis, #64748b)":"var(--w-grid, #e2e8f0)",strokeWidth:H===0?1.2:.6}),e.jsx("text",{x:y(H),y:un+Sn+13,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:10,children:De(H,Ze)})]},`x${H}`)),e.jsxs("g",{clipPath:"url(#s101-clip)",children:[e.jsx("line",{x1:w.x1,y1:w.y1,x2:w.x2,y2:w.y2,stroke:cn,strokeWidth:1.6,strokeDasharray:"5 4",opacity:.85}),e.jsx("line",{x1:S.x1,y1:S.y1,x2:S.x2,y2:S.y2,stroke:cn,strokeWidth:2}),B&&e.jsx("line",{x1:B.x1,y1:B.y1,x2:B.x2,y2:B.y2,stroke:Wi,strokeWidth:2.4}),e.jsx("path",{d:b,fill:"none",stroke:Bi,strokeWidth:2.4}),R&&Math.abs(g(D)-g(k))>1.5&&e.jsxs("g",{children:[e.jsx("line",{x1:y(l+c),y1:g(k),x2:y(l+c),y2:g(D),stroke:En,strokeWidth:3}),e.jsx("text",{x:y(l+c)+6,y:(g(D)+g(k))/2+3,fill:En,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"r(h)"})]}),e.jsx("line",{x1:y(l),y1:g(j),x2:y(l),y2:g(0),stroke:"var(--w-axis, #64748b)",strokeWidth:.8,strokeDasharray:"2 3"}),e.jsx("line",{x1:y(l+c),y1:g(D),x2:y(l+c),y2:g(0),stroke:"var(--w-axis, #64748b)",strokeWidth:.8,strokeDasharray:"2 3"}),e.jsx("circle",{cx:y(l-c),cy:g(a),r:3.5,fill:"none",stroke:cn,strokeWidth:1.6}),e.jsx("circle",{cx:y(l+c),cy:g(D),r:4,fill:cn}),e.jsx("circle",{cx:y(l),cy:g(j),r:4.5,fill:Bi}),e.jsx("text",{x:y(l)-3,y:g(0)+12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"x"}),e.jsx("text",{x:y(l+c)-8,y:g(0)+12,fill:"var(--w-muted, #64748b)",fontSize:10,children:"x+h"})]})]}),e.jsxs("div",{className:`flex flex-wrap gap-x-5 gap-y-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:Bi},children:"▬ f"}),e.jsx("span",{style:{color:cn},children:"▬ Sekanten durch x ± h"}),e.jsx("span",{style:{color:Wi},children:"▬ lineare Approximation"}),e.jsx("span",{style:{color:En},children:"▬ Restterm r(h)"})]}),e.jsx(I,{label:"x (Stelle)",value:l,onChange:H=>s(Math.round(H*20)/20),min:-1.5,max:1.5,step:.05,accent:cn,fmt:H=>te(H,2)}),e.jsx(I,{label:"h (Schrittweite)",value:c,onChange:H=>h(Math.round(H*100)/100),min:$i,max:.9,step:.01,accent:En,fmt:H=>te(H,2)}),e.jsx("div",{className:"flex flex-wrap items-center gap-2",children:e.jsx("button",{type:"button",className:ie,disabled:c<=$i+1e-9,onClick:()=>h(Math.max($i,Math.round(c/2*100)/100)),children:"h halbieren"})}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:cn},children:["Differenzenquotient rechts (f(x+h) − f(x))/h = ",te(A,4)]}),e.jsxs("div",{style:{color:cn},children:["Differenzenquotient links (f(x) − f(x−h))/h = ",te(z,4)]}),e.jsxs("div",{style:{color:Wi},children:["Ableitung f′(x) = ",te(p,4)]}),e.jsxs("div",{style:{color:En},children:["Restterm r(h) = f(x+h) − f(x) − f′(x)h = ",te(M,5)]}),e.jsxs("div",{style:{color:En},children:["relativer Fehler |r(h)|/|h| = ",te(F,5)]})]}),e.jsx(ve,{kind:U.kind,children:U.text}),r&&R&&e.jsxs("p",{className:`text-xs ${Y}`,children:["Bei halber Schrittweite stünde dort r(h/2) ="," ",e.jsx("span",{className:"font-mono",children:te(_,6)}),Math.abs(_)>1e-14&&e.jsxs(e.Fragment,{children:[", also der Faktor"," ",e.jsx("span",{className:"font-mono",children:te(Math.abs(M/_),2)})]}),"."]})]})}function $t(){return e.jsx(Ce,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Wir halbieren gleich die Schrittweite h. Was passiert dabei mit dem roten Restterm r(h)?"}),optionen:[{id:"halb",text:"halb so groß"},{id:"viertel",text:"ein Viertel so groß"},{id:"gleich",text:"bleibt gleich"}],loesung:"viertel",verdeckt:e.jsxs("p",{className:"text-sm",children:["Bei f(x) = x² ist r(h) = h² exakt, also fällt der Restterm auf ein Viertel und der relative Fehler |r(h)|/|h| auf die Hälfte. Genau diese beiden Größen unterscheidet",V("definition:frechet-ableitung"),": klein werden muss der Quotient, nicht der Restterm allein."]}),children:({aufgeloest:r})=>e.jsx(Gt,{aufgeloest:r})})}const Lt=[{id:"frechet",label:["Fréchet-Ableitung"],x:380,y:36,group:"k10"},{id:"grad",label:["Gradient"],x:235,y:126,w:130,group:"k10"},{id:"jac",label:["Jacobi-Matrix"],x:540,y:126,w:140,group:"k10"},{id:"hesse",label:["Hesse-Matrix"],x:330,y:218,w:140,group:"k11"},{id:"kqmk",label:["KQ per Matrixkalkül"],kicker:"→ Kap. 7",x:585,y:224,w:175,group:"k11",href:"?k=07-kq",name:"Kleinste Quadrate per Matrixkalkül (Normalengleichungen, Kap. 7)"},{id:"taylor",label:["Taylor-Approximation"],x:110,y:314,w:180,group:"k11"},{id:"konvf",label:["Konvexe Funktion"],x:400,y:314,w:160,group:"k12",href:"?k=11-konvexitaet"},{id:"konvm",label:["Konvexe Menge"],x:640,y:314,w:150,group:"k12",href:"?k=11-konvexitaet"},{id:"newton",label:["Newton & Quasi-Newton"],x:110,y:420,w:195,group:"k13",href:"?k=12-optim"},{id:"strikt",label:["Strikte Konvexität"],x:350,y:412,w:160,group:"k13",href:"?k=12-optim"},{id:"subgrad",label:["Subgradient"],x:580,y:412,w:130,group:"k13",href:"?k=12-optim"},{id:"stark",label:["Starke Konvexität"],x:350,y:500,w:160,group:"k13",href:"?k=12-optim"},{id:"kkt",label:["Lagrange / KKT"],x:610,y:500,w:150,group:"k13",href:"?k=12-optim"},{id:"gd",label:["Gradientenabstieg","+ Line Search"],x:150,y:590,w:175,group:"k13",href:"?k=12-optim"},{id:"momsgd",label:["Momentum & SGD"],x:150,y:690,w:165,group:"k13",href:"?k=12-optim"}],Vt=[{from:"frechet",to:"grad"},{from:"frechet",to:"jac"},{from:"grad",to:"hesse"},{from:"grad",to:"kqmk"},{from:"hesse",to:"taylor"},{from:"hesse",to:"konvf"},{from:"taylor",to:"newton"},{from:"hesse",to:"newton"},{from:"konvf",to:"strikt"},{from:"konvf",to:"subgrad"},{from:"strikt",to:"stark"},{from:"konvf",to:"gd"},{from:"stark",to:"gd"},{from:"grad",to:"gd"},{from:"gd",to:"momsgd"},{from:"konvm",to:"kkt"},{from:"konvf",to:"kkt"},{from:"subgrad",to:"kkt"}];function Pt(){return e.jsx(Wt,{ariaLabel:"Konzeptkarte von Teil 2: von der Fréchet-Ableitung über Gradient, Hesse-Matrix, Taylor und Konvexität zu den Optimierungsverfahren.",nodes:Lt,edges:Vt,groups:[{key:"k10",label:"Kap. 10 · Differentialrechnung, 10.1–10.4",color:"#0f7490"},{key:"k11",label:"Kap. 10 · Differentialrechnung, 10.5–10.8",color:"#7c5cd6"},{key:"k12",label:"Kap. 11 · Konvexität",color:"#c2620b"},{key:"k13",label:"Kap. 12 · Gleichungen & Optimierung",color:"#c2417c"}],openLabel:"Kapitel öffnen"})}function Sr(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(me,{title:"Landkarte für Analysis und Optimierung",children:[e.jsxs(i.p,{children:["Mit diesem Kapitel beginnt der zweite Teil des Skripts, ",e.jsx(i.em,{children:`Analysis &
Optimierung`}),`. Die Karte zeigt, wie seine Konzepte zusammenhängen, von der
Fréchet-Ableitung, die wir gleich einführen, bis zu den Optimierungsverfahren
in `,e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"}),`. Beim ersten Lesen genügt der Gesamteindruck;
am Ende von Kapitel 12 lohnt sich ein zweiter Blick.`]}),e.jsx(Pt,{}),e.jsx(i.p,{children:`Wählen wir einen Begriff aus, hebt die Karte seine Voraussetzungen und
Folgerungen hervor; verlinkte Kästen führen direkt zum zugehörigen Kapitel.`})]}),`
`,e.jsx(i.h3,{children:"Was wir mitbringen"}),`
`,e.jsxs(i.p,{children:[`Dieses Kapitel steht auf zwei Beinen. Aus der linearen Algebra brauchen wir die
`,e.jsx(v,{id:"trace",children:"Spur"}),` einer Matrix aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),` und die
`,e.jsx(v,{id:"matrix-norm",children:"Matrixnormen"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),`, dazu
`,e.jsx(v,{id:"determinant",children:"Determinante"})," und ",e.jsx(v,{id:"matrix-inverse",children:"Matrixinversion"}),`.
Außerdem hantieren wir mit normierten Vektorräumen, also
`,e.jsx(v,{id:"vector-space",children:"Vektorräumen"})," mit einer ",e.jsx(v,{id:"norm",children:"Norm"}),`, und mit
beschränkten `,e.jsx(v,{id:"linear-map",children:"linearen Abbildungen"}),` darauf. Aus der Analysis
setzen wir die `,e.jsx(v,{id:"derivative",children:"Ableitung"})," ",e.jsx(n,{children:"f'(x)"}),` voraus, die
`,e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"}),`
`,e.jsx(n,{children:"\\partial f(\\bx)/\\partial x_i"}),`, die lineare Approximation
`,e.jsx(n,{children:"f(x+h) \\approx f(x) + f'(x)h"}),` und die Grundzüge der
`,e.jsx(v,{id:"taylor-series",children:"Taylorreihen"}),"."]}),`
`,e.jsxs(i.p,{children:[`Ein Werkzeug verdient eine eigene Zeile, weil das ganze Kapitel daran hängt:
die Landau-Notation für kleine Argumente. Für eine Funktion `,e.jsx(n,{children:"g"})," schreiben wir"]}),`
`,e.jsx(o,{children:`g(h) = o(h)
\\quad :\\Longleftrightarrow \\quad
\\lim_{h \\to 0} \\frac{g(h)}{h} = 0 .`}),`
`,e.jsxs(i.p,{children:["Ein ",e.jsx(n,{children:"o(h)"}),"-Term verschwindet also nicht einfach nur, er verschwindet ",e.jsxs(i.em,{children:[`schneller
als `,e.jsx(n,{children:"h"})," selbst"]}),": Sein Verhältnis zu ",e.jsx(n,{children:"h"})," geht gegen null. Für ",e.jsx(n,{children:"g(h) = h^2"}),` etwa
viertelt sich der Term, wenn wir `,e.jsx(n,{children:"h"}),` halbieren. Genauso schreiben wir
`,e.jsx(n,{children:"g(h) = o(\\left|h\\right|)"})," und später ",e.jsx(n,{children:"o(\\left\\|h\\right\\|)"}),`, wenn der Quotient
mit `,e.jsx(n,{children:"\\left|h\\right|"})," beziehungsweise ",e.jsx(n,{children:"\\left\\|h\\right\\|"}),` gegen null geht; für
reelles `,e.jsx(n,{children:"h"})," ist ",e.jsx(n,{children:"o(\\left|h\\right|)"})," dasselbe wie ",e.jsx(n,{children:"o(h)"}),", denn ",e.jsx(n,{children:"g(h)/h"}),` und
`,e.jsx(n,{children:"g(h)/\\left|h\\right|"}),` unterscheiden sich höchstens im Vorzeichen. Die
Landau-Symbole haben wir in
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),` für große Argumente kennengelernt, wo sie
Rechenaufwand messen; hier läuft das Argument gegen null statt gegen unendlich,
die Rechenregeln bleiben dieselben (`,e.jsx(v,{id:"big-o-notation",children:"O-Notation"}),")."]}),`
`,e.jsxs(i.p,{children:["Wohin geht die Reise? Ableitungen und ",e.jsx(v,{id:"differentiability",children:"Differenzierbarkeit"}),`
kennen wir aus der Analysis für Funktionen einer reellen Variablen. Neu ist in
diesem Kapitel ein allgemeinerer Ableitungsbegriff, die `,e.jsx(i.em,{children:"Fréchet-Ableitung"}),`. Mit
ihm können wir Funktionen ableiten, die Vektoren oder Matrizen als Eingabe oder
als Ausgabe haben, und wir bleiben dabei nicht auf den `,e.jsx(n,{children:"\\R^n"}),` beschränkt. Die
Spezialfälle mit Vektor- und Matrixargumenten füllen die
Abschnitte `,e.jsx(i.a,{href:"#sec-10.2",children:"10.2"})," bis ",e.jsx(i.a,{href:"#sec-10.4",children:"10.4"}),`. Ab
`,e.jsx(i.a,{href:"#sec-10.5",children:"Abschnitt 10.5"}),` geht es dann ums Rechnen mit dem neuen Begriff:
Eigenschaften, Produkt- und Kettenregel, höhere Ableitungen und die
Taylorapproximation. Der Leitgedanke steht schon in der Überschrift dieses
Abschnitts: `,e.jsx(i.em,{children:"Ableitung = lineare Approximation"}),"."]}),`
`,e.jsx(i.h3,{children:"Die Ableitung im Eindimensionalen"}),`
`,e.jsxs(i.p,{children:[`Fangen wir dort an, wo wir uns auskennen. Für eine Funktion einer reellen
Variablen misst der Differenzenquotient, wie stark sich der Funktionswert
ändert, wenn wir das Argument um `,e.jsx(n,{children:"h"})," verrücken."]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.1.1 (Differenzierbarkeit)",id:"env-differenzierbarkeit",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R"})," offen und ",e.jsx(n,{children:"f\\colon S \\to \\R"}),` eine Funktion. Wir nennen
`,e.jsx(n,{children:"f"})," an der Stelle ",e.jsx(n,{children:"x \\in S"})," ",e.jsx(i.em,{children:"differenzierbar"})," mit ",e.jsx(i.em,{children:"Ableitung"})," ",e.jsx(n,{children:"\\cgreen{f'(x)}"}),`,
falls der Grenzwert`]}),e.jsx(T,{tag:"10.1.1",id:"eq-differenzierbarkeit",children:"\\lim_{h \\to 0} \\frac{\\cblue{f(x + h)} - \\cblue{f(x)}}{h} = \\cgreen{f'(x)}"}),e.jsx(i.p,{children:"existiert."})]}),`
`,e.jsxs(i.p,{children:["Geometrisch ist der Quotient in ",e.jsx(i.a,{href:"#eq-differenzierbarkeit",children:"(10.1.1)"}),` die Steigung der
`,e.jsx(v,{id:"secant-line",children:"Sekante"})," durch die beiden Punkte ",e.jsx(n,{children:"(x, f(x))"}),` und
`,e.jsx(n,{children:"(x+h, f(x+h))"}),". Lassen wir ",e.jsx(n,{children:"h"}),` gegen null laufen, so rutscht der zweite Punkt
auf den ersten zu, und die Sekante dreht sich in die
`,e.jsx(v,{id:"tangent-line",children:"Tangente"}),". Die Ableitung ",e.jsx(n,{children:"\\cgreen{f'(x)}"}),` ist deren
`,e.jsx(v,{id:"slope",children:"Steigung"}),"."]}),`
`,e.jsxs(i.p,{children:['Das Wort „der Grenzwert" in ',e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),` trägt mehr Gewicht, als es
aussieht. Verlangt ist ein einziger Wert, gegen den der Differenzenquotient
strebt, egal von welcher Seite und in welchem Tempo wir uns nähern. Daran kann
es scheitern.`]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.1.2 (Wenn es keine eindeutige Tangente gibt)",id:"env-wenn-es-keine-eindeutige-tangente-gibt",children:[e.jsxs(i.p,{children:["Betrachten wir ",e.jsx(n,{children:"f(x) = \\left|x\\right|"})," an der Stelle ",e.jsx(n,{children:"x = 0"}),". Für ",e.jsx(n,{children:"h > 0"}),` ist
der Differenzenquotient`]}),e.jsx(o,{children:"\\frac{\\left|0 + h\\right| - \\left|0\\right|}{h} = \\frac{h}{h} = 1 ,"}),e.jsxs(i.p,{children:["für ",e.jsx(n,{children:"h < 0"})," dagegen ",e.jsx(n,{children:"-h/h = -1"}),`. Von rechts kommend messen wir also die
Steigung `,e.jsx(n,{children:"1"}),", von links die Steigung ",e.jsx(n,{children:"-1"}),", und zwar für ",e.jsx(i.em,{children:"jedes"})," ",e.jsx(n,{children:"h"}),`, nicht erst
im Grenzwert. Der Grenzwert in `,e.jsx(i.a,{href:"#eq-differenzierbarkeit",children:"(10.1.1)"})," existiert damit nicht, ",e.jsx(n,{children:"f"}),` ist in
`,e.jsx(n,{children:"x = 0"}),` nicht differenzierbar. Anschaulich lässt sich an einen Knick keine
eindeutige Tangente anlegen. Die verschiedenen einseitigen Sekantensteigungen
zeigen bereits, warum. Daneben gibt es für jedes `,e.jsx(n,{children:"-1 \\le m \\le 1"}),` eine Gerade
`,e.jsx(n,{children:"y = m x"}),", die den Graphen von unten stützt, denn ",e.jsx(n,{children:"m x \\le \\left|x\\right|"}),` für
alle `,e.jsx(n,{children:"x"}),". Das sind ",e.jsx(i.em,{children:"Stützgeraden"}),`, keine Tangenten im Sinn der Ableitung; ihre
Steigungen werden in der konvexen Optimierung später als Subgradienten
bezeichnet. Stetig ist die Betragsfunktion trotzdem,
Knicke sind also kein Widerspruch zur `,e.jsx(v,{id:"continuity",children:"Stetigkeit"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Ableitung als lineare Approximation"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),` beschreibt die Ableitung als Grenzwert. Für alles, was
danach kommt, ist eine zweite Lesart nützlicher. Stellen wir `,e.jsx(i.a,{href:"#eq-differenzierbarkeit",children:"(10.1.1)"}),` um und
lösen nach `,e.jsx(n,{children:"\\cblue{f(x+h)}"})," auf, so steht dort: In der Nähe von ",e.jsx(n,{children:"x"}),` verhält sich
`,e.jsx(n,{children:"f"})," wie eine Gerade, und ",e.jsx(n,{children:"\\cgreen{f'(x)}"}),` ist deren Steigung. Der Fehler dieser
Näherung ist klein, und das lässt sich präzise sagen.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.1.3 (Ableitung als lineare Approximation)",id:"env-ableitung-als-lineare-approximation",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R"})," offen, ",e.jsx(n,{children:"f\\colon S \\to \\R"}),", ",e.jsx(n,{children:"x \\in S"})," und ",e.jsx(n,{children:"a \\in \\R"}),`.
Dann sind die folgenden drei Aussagen gleichwertig:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\displaystyle\\lim_{h \\to 0} \\frac{\\cblue{f(x+h)} - \\cblue{f(x)}}{h} = \\cgreen{a}"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\displaystyle\\lim_{h \\to 0} \\frac{\\left|\\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h}\\right|}{\\left|h\\right|} = 0"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{f(x+h)} = \\cblue{f(x)} + \\cgreen{a h} + \\cred{o(\\left|h\\right|)}"})," für ",e.jsx(n,{children:"h \\to 0"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Trifft eine davon zu, so ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"x"}),` differenzierbar mit
`,e.jsx(n,{children:"\\cgreen{f'(x)} = \\cgreen{a}"}),"."]})]}),`
`,e.jsx(xe,{title:"Warum die drei Ableitungsfassungen gleichwertig sind",children:e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{a} = \\cgreen{a h}/h"})," für ",e.jsx(n,{children:"h \\neq 0"}),", dann beide Brüche zusammenfassen"]}),children:[e.jsxs(i.p,{children:["Zu (1) ",e.jsx(n,{children:"\\Longleftrightarrow"})," (2): Für ",e.jsx(n,{children:"h \\neq 0"})," ziehen wir ",e.jsx(n,{children:"\\cgreen{a}"}),` in den
Bruch hinein,`]}),e.jsx(o,{children:`\\frac{\\cblue{f(x+h)} - \\cblue{f(x)}}{h} - \\cgreen{a}
= \\frac{\\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h}}{h} .`}),e.jsxs(i.p,{children:["Der Differenzenquotient strebt also genau dann gegen ",e.jsx(n,{children:"\\cgreen{a}"}),`, wenn die
rechte Seite gegen `,e.jsx(n,{children:"0"})," strebt."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left|z/h\\right| = \\left|z\\right|/\\left|h\\right|"}),"; und ",e.jsx(n,{children:"\\lim_{h \\to 0} g(h) = 0"})," gilt genau dann, wenn ",e.jsx(n,{children:"\\lim_{h \\to 0} \\left|g(h)\\right| = 0"})]}),children:[e.jsx(i.p,{children:`Eine Größe strebt genau dann gegen null, wenn ihr Betrag es tut, und Beträge
vertragen sich mit dem Bruch:`}),e.jsx(o,{children:`\\left|\\frac{\\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h}}{h}\\right|
= \\frac{\\left|\\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h}\\right|}{\\left|h\\right|} .`}),e.jsx(i.p,{children:"Damit ist (1) gleichwertig zu (2)."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Definition des Landau-Symbols: ",e.jsx(n,{children:"g(h) = o(\\left|h\\right|)"})," heißt genau, dass ",e.jsx(n,{children:"g(h)/\\left|h\\right|"})," gegen null strebt"]}),children:[e.jsxs(i.p,{children:["Zu (2) ",e.jsx(n,{children:"\\Longrightarrow"})," (3): Wir taufen den Fehler auf einen Namen und setzen"]}),e.jsx(o,{children:"\\cred{r(h)} := \\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h} ."}),e.jsxs(i.p,{children:["Aussage (2) besagt ",e.jsx(n,{children:"\\left|\\cred{r(h)}\\right|/\\left|h\\right| \\to 0"}),`, also
`,e.jsx(n,{children:"\\cred{r(h)} = \\cred{o(\\left|h\\right|)}"}),`. Einsetzen in die Definition von
`,e.jsx(n,{children:"\\cred{r(h)}"})," liefert"]}),e.jsx(o,{children:`\\cblue{f(x+h)} = \\cblue{f(x)} + \\cgreen{a h} + \\cred{r(h)}
= \\cblue{f(x)} + \\cgreen{a h} + \\cred{o(\\left|h\\right|)} ,`}),e.jsx(i.p,{children:"und das ist (3)."})]}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:["wieder ",e.jsx(n,{children:"\\lim g = 0 \\iff \\lim \\left|g\\right| = 0"}),", diesmal in der Gegenrichtung"]}),children:e.jsxs(i.p,{children:["Zu (3) ",e.jsx(n,{children:"\\Longrightarrow"}),` (2): Gilt (3), so ist die Differenz
`,e.jsx(n,{children:"\\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{a h}"}),` ein Term der Ordnung
`,e.jsx(n,{children:"\\cred{o(\\left|h\\right|)}"}),`. Nach Definition strebt sein Quotient mit
`,e.jsx(n,{children:"\\left|h\\right|"}),` gegen null, und dann tut es auch der Betrag dieses Quotienten.
Damit ist der Ring geschlossen, und Aussage (1) ist wörtlich `,e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),`
mit `,e.jsx(n,{children:"\\cgreen{f'(x)} = \\cgreen{a}"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:["Aussage (3) ist die Fassung, die uns durch das ganze Kapitel trägt: ",e.jsxs(i.em,{children:[`die
Funktion, ihre lineare Näherung, und ein Rest, der schneller verschwindet als
`,e.jsx(n,{children:"h"}),"."]}),` Farblich halten wir das durch: blau die Funktion und ihre Werte, grün die
lineare Approximation, rot der Restterm.`]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.1.4 (Was hier eigentlich linear ist)",id:"env-was-hier-eigentlich-linear-ist",children:[e.jsxs(i.p,{children:[`Eine Verwechslung lohnt sich auszuräumen, bevor wir verallgemeinern. Die
Ableitung `,e.jsx(n,{children:"f'"}),` selbst ist im Allgemeinen keine
`,e.jsx(v,{id:"linear-function",children:"lineare Funktion"}),": für ",e.jsx(n,{children:"f(x) = \\sin(x)"}),` etwa ist
`,e.jsx(n,{children:"f'(x) = \\cos(x)"}),", und der Kosinus ist alles andere als linear."]}),e.jsx(i.p,{children:"Linear ist eine andere Abbildung, nämlich"}),e.jsx(o,{children:"\\cgreen{D_x f} \\colon \\R \\to \\R , \\qquad h \\mapsto \\cgreen{f'(x) h}"}),e.jsxs(i.p,{children:["bei ",e.jsx(i.em,{children:"festem"})," ",e.jsx(n,{children:"x"}),`. Sie erfüllt
`,e.jsx(n,{children:"\\cgreen{f'(x)(h_1 + h_2)} = \\cgreen{f'(x) h_1} + \\cgreen{f'(x) h_2}"}),` und
`,e.jsx(n,{children:"\\cgreen{f'(x)(c h)} = c\\,\\cgreen{f'(x) h}"}),", ist also linear in ",e.jsx(n,{children:"h"}),`. Wie
`,e.jsx(n,{children:"\\cgreen{f'(x)}"})," von ",e.jsx(n,{children:"x"}),` abhängt, bleibt davon völlig unberührt. Diese
Trennung ist der Hebel für den Rest des Kapitels: Was wir verallgemeinern
wollen, ist nicht die Zahl `,e.jsx(n,{children:"f'(x)"}),`, sondern die lineare Abbildung
`,e.jsx(n,{children:"\\cgreen{D_x f}"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Zwei Fragen bleiben offen. Wie schnell verschwindet der Restterm, wenn wir ",e.jsx(n,{children:"h"}),`
verkleinern? Und was geht schief, wenn die Funktion an der betrachteten Stelle
einen Knick hat? Beides lässt sich an drei Beispielkurven ausprobieren.`]}),`
`,e.jsxs(me,{title:"Sekante, Tangente und der Restterm zum Anfassen",children:[e.jsxs(i.p,{children:[`Zur Wahl stehen zwei glatte Funktionen und die Betragsfunktion aus
`,e.jsx(i.a,{href:"#env-wenn-es-keine-eindeutige-tangente-gibt",children:"Bemerkung 10.1.2"}),". Der rote Balken über ",e.jsx(n,{children:"x+h"})," ist der Restterm ",e.jsx(n,{children:"\\cred{r(h)}"}),`, der
letzte Readout darunter der `,e.jsx(i.em,{children:"relative"}),` Fehler
`,e.jsx(n,{children:"\\left|\\cred{r(h)}\\right|/\\left|h\\right|"}),"."]}),e.jsx($t,{}),e.jsxs(i.p,{children:[`Dieser relative Fehler ist genau der Abstand zwischen Sekanten- und Tangentensteigung, und
nach `,e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"}),"(2) geht er gegen null. Bei ",e.jsx(n,{children:"f(x) = x^2"}),` steht
dort sogar exakt `,e.jsx(n,{children:"\\left|h\\right|"}),", denn der Restterm ist ",e.jsx(n,{children:"h^2"}),`
(`,e.jsx(i.a,{href:"#env-frechet-ableitung-von-f-x-x",children:"Beispiel 10.1.7"}),`); halbieren wir die Schrittweite, so fällt der
Restterm auf ein Viertel und der relative Fehler auf die Hälfte. Die Betragsfunktion zeigt
die Kehrseite: Schieben wir `,e.jsx(n,{children:"x"})," auf ",e.jsx(n,{children:"0"}),`, so trennen sich die beiden Sekanten und bleiben
getrennt, wie klein `,e.jsx(n,{children:"h"}),` auch wird. Lehrreich ist eine Stelle knapp neben dem Knick – solange
`,e.jsx(n,{children:"\\left|x\\right| < h"}),` ist, liegt er noch im Fenster, und genau eine der beiden Sekanten läuft
über ihn hinweg und misst etwas anderes als die Ableitung. Lineare Approximation ist eine
lokale Angelegenheit.`]})]}),`
`,e.jsx(i.h3,{children:"Der allgemeine Ableitungsbegriff"}),`
`,e.jsxs(i.p,{children:[`Sobald wir Ableitung als lineare Approximation lesen, brauchen wir vom
Definitionsbereich fast nichts mehr. Wir müssen Punkte verschieben können,
`,e.jsx(n,{children:"x + h"}),` muss also Sinn ergeben, wir müssen Länge messen können, um „der Fehler
wird klein" zu präzisieren, und wir brauchen einen Begriff von linearer
Abbildung. Ein normierter Vektorraum liefert alle drei Zutaten. Auf metrischen
Räumen ohne Vektorraumstruktur funktioniert es dagegen nicht, dort fehlt der
lineare Teil.`]}),`
`,e.jsx(i.p,{children:`Die folgende Definition geht auf Maurice Fréchet zurück. Sie reicht für alle
endlich-dimensionalen Räume und für einige unendlich-dimensionale.`}),`
`,e.jsxs(q,{kind:"Definition",label:"10.1.5 (Fréchet-Ableitung)",id:"env-frechet-ableitung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"})," zwei normierte Vektorräume und ",e.jsx(n,{children:"f\\colon \\D \\to \\E"}),`. Wir
nennen `,e.jsx(n,{children:"f"})," an der Stelle ",e.jsx(n,{children:"x \\in \\D"})," ",e.jsx(i.em,{children:"(Fréchet-)differenzierbar"}),`, falls eine
beschränkte lineare Abbildung `,e.jsx(n,{children:"\\cgreen{D_x f}\\colon \\D \\to \\E"}),` und ein Restterm
`,e.jsx(n,{children:"\\cred{r(h)} \\in \\E"})," existieren, sodass"]}),e.jsx(T,{tag:"10.1.2",id:"eq-frechet-ableitung",children:`\\cblue{f(x + h)} = \\cblue{f(x)} + \\cgreen{D_x f(h)} + \\cred{r(h)}
\\qquad\\text{und}\\qquad
\\lim_{h\\to0,\\,h\\ne0}
\\frac{\\left\\|\\cred{r(h)}\\right\\|_{\\E}}{\\left\\|h\\right\\|_{\\D}}=0 .`}),e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"\\cgreen{D_x f}"})," heißt dann ",e.jsx(i.em,{children:"Fréchet-Ableitung"})," von ",e.jsx(n,{children:"f"}),` an der
Stelle `,e.jsx(n,{children:"x"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Wir schreiben ",e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"}),` für die beiden Räume;
mit dem Erwartungswert hat das `,e.jsx(n,{children:"\\E"}),` hier nichts zu tun. Auch die beiden
Normstriche in `,e.jsx(i.a,{href:"#eq-frechet-ableitung",children:"(10.1.2)"})," meinen zwei verschiedene Dinge: ",e.jsx(n,{children:"\\left\\|h\\right\\|"}),` ist
die Norm auf `,e.jsx(n,{children:"\\D"}),", der Restterm wird dagegen in der Norm auf ",e.jsx(n,{children:"\\E"}),` gemessen.
Die häufige Kurzschreibweise `,e.jsx(n,{children:"\\cred{r(h)}=\\cred{o(\\left\\|h\\right\\|)}"}),` meint genau
die Grenzwertbedingung in `,e.jsx(i.a,{href:"#eq-frechet-ableitung",children:"(10.1.2)"}),": Das ",e.jsx(n,{children:"o"})," ist kein Skalar, den wir zu ",e.jsx(n,{children:"f(x)"}),`
addieren, sondern beschreibt die Größe des `,e.jsx(n,{children:"\\E"}),"-wertigen Restes."]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.1.6 (Wie die Definition zu lesen ist)",id:"env-linearisierung-wie-die-definition-zu-lesen-ist",children:[e.jsx(i.p,{children:"Vier Punkte, die in der knappen Formulierung leicht untergehen."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Restterm."})," Setzen wir wie im Beweis von ",e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"})]}),e.jsx(o,{children:"\\cred{r(h)} := \\cblue{f(x+h)} - \\cblue{f(x)} - \\cgreen{D_x f(h)} ,"}),e.jsxs(i.p,{children:["so verlangt ",e.jsx(i.a,{href:"#eq-frechet-ableitung",children:"(10.1.2)"}),` genau
`,e.jsx(n,{children:"\\left\\|\\cred{r(h)}\\right\\| / \\left\\|h\\right\\| \\to 0"})," für ",e.jsx(n,{children:"h \\to 0"}),`. Die
Gleichung selbst gilt für jedes zulässige `,e.jsx(n,{children:"h"}),`, sie definiert ja bloß
`,e.jsx(n,{children:"\\cred{r(h)}"}),`; die Aussage steckt in der Kleinheit des Restes. Der Zusatz
„für `,e.jsx(n,{children:"h \\to 0"}),`" gehört deshalb nicht zur Gleichung, sondern zum Restterm: Er
ist `,e.jsx(n,{children:"\\cred{o(\\left\\|h\\right\\|)}"})," für ",e.jsx(n,{children:"h \\to 0"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Beschränktheit."})," Dass ",e.jsx(n,{children:"\\cgreen{D_x f}"}),` beschränkt ist, heißt: es gibt ein
`,e.jsx(n,{children:"M < \\infty"})," mit"]}),e.jsx(o,{children:"\\left\\|\\cgreen{D_x f(h)}\\right\\| \\le M \\left\\|h\\right\\| \\qquad \\text{für alle } h ."}),e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"M"})," darf von ",e.jsx(n,{children:"x"})," abhängen, aber nicht von ",e.jsx(n,{children:"h"}),`. In endlich-dimensionalen
Räumen ist jede lineare Abbildung automatisch beschränkt, dort kostet die
Forderung also nichts; im Unendlichdimensionalen ist sie eine echte
Zusatzbedingung und gleichbedeutend mit Stetigkeit.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Linear in ",e.jsx(n,{children:"h"}),", beliebig in ",e.jsx(n,{children:"x"}),"."]})," Die Abbildung ",e.jsx(n,{children:"h \\mapsto \\cgreen{D_x f(h)}"}),`
ist linear, so wie in `,e.jsx(i.a,{href:"#env-was-hier-eigentlich-linear-ist",children:"Bemerkung 10.1.4"}),". Wie ",e.jsx(n,{children:"\\cgreen{D_x f}"})," von ",e.jsx(n,{children:"x"}),` abhängt,
schreibt die Definition in keiner Weise vor.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der eindimensionale Fall."})," Für ",e.jsx(n,{children:"f\\colon \\R \\to \\R"}),` ist
`,e.jsx(n,{children:"\\cgreen{D_x f(h)} = \\cgreen{f'(x) h}"}),", und ",e.jsx(i.a,{href:"#eq-frechet-ableitung",children:"(10.1.2)"}),` ist wörtlich
Aussage (3) aus `,e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"}),`. Beschränkt ist diese Abbildung, sobald
`,e.jsx(n,{children:"\\left|\\cgreen{f'(x)}\\right| < \\infty"})," ist, mit ",e.jsx(n,{children:"M = \\left|\\cgreen{f'(x)}\\right|"}),`.
Die alte Ableitung ist also ein Spezialfall der neuen.`]})]}),`
`,e.jsx(i.p,{children:"Prüfen wir die Definition an dem einfachsten Beispiel, das nicht trivial ist."}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.1.7 (Fréchet-Ableitung von f(x) = x²)",id:"env-frechet-ableitung-von-f-x-x",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R \\to \\R"})," mit ",e.jsx(n,{children:"\\cblue{f(x)} = x^2"}),". Behauptung: ",e.jsx(n,{children:"f"}),` ist
Fréchet-differenzierbar mit `,e.jsx(n,{children:"\\cgreen{D_x f(h)} = \\cgreen{2xh}"}),"."]}),e.jsx(i.p,{children:"Wir gehen die Definition Punkt für Punkt durch. Zuerst multiplizieren wir aus:"}),e.jsx(o,{children:`\\begin{aligned}
\\cblue{f(x+h)} &= (x+h)^2 = x^2 + 2xh + h^2 \\\\
&= \\cblue{f(x)} + \\cgreen{2xh} + \\cred{h^2} \\\\
&= \\cblue{f(x)} + \\cgreen{D_x f(h)} + \\cred{h^2} .
\\end{aligned}`}),e.jsxs(i.p,{children:[`Die Zerlegung liegt damit vor: Der Kandidat für die Ableitung ist
`,e.jsx(n,{children:"\\cgreen{D_x f(h)} = \\cgreen{2xh}"}),", und er ist linear in ",e.jsx(n,{children:"h"}),`. Übrig bleibt der
Restterm `,e.jsx(n,{children:"\\cred{h^2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ist der Rest klein genug?"})," Wir rechnen den Quotienten aus ",e.jsx(i.a,{href:"#eq-frechet-ableitung",children:"(10.1.2)"})," nach:"]}),e.jsx(o,{children:`\\lim_{h \\to 0} \\frac{\\left|\\cred{h^2}\\right|}{\\left|h\\right|}
= \\lim_{h \\to 0} \\left|h\\right| = 0
\\qquad\\Longrightarrow\\qquad
\\cred{h^2} = \\cred{o(\\left|h\\right|)} . \\quad\\checkmark`}),e.jsxs(i.p,{children:[`Bemerkenswert daran: Der relative Fehler ist hier nicht bloß klein, er ist
exakt `,e.jsx(n,{children:"\\left|h\\right|"}),". Bei ",e.jsx(n,{children:"h = 0{,}1"})," beträgt er ",e.jsx(n,{children:"0{,}1"}),", bei ",e.jsx(n,{children:"h = 0{,}01"}),`
schon `,e.jsx(n,{children:"0{,}01"}),". Das Widget oben zeigt diese Zahlen an."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Ist ",e.jsx(n,{children:"\\cgreen{D_x f}"})," beschränkt?"]})," Bei festem ",e.jsx(n,{children:"x"})," ist"]}),e.jsx(o,{children:`\\left|\\cgreen{D_x f(h)}\\right| = \\left|\\cgreen{2xh}\\right|
= 2\\left|x\\right| \\cdot \\left|h\\right| \\le M \\left|h\\right|
\\qquad \\text{für alle } h , \\qquad M = 2\\left|x\\right| < \\infty . \\quad\\checkmark`}),e.jsxs(i.p,{children:["Beide Bedingungen sind erfüllt, ",e.jsx(n,{children:"f"}),` ist also Fréchet-differenzierbar mit
`,e.jsx(n,{children:"\\cgreen{D_x f(h)} = \\cgreen{2xh}"}),`. Das passt zur Schulableitung: Nach
`,e.jsx(i.a,{href:"#env-linearisierung-wie-die-definition-zu-lesen-ist",children:"Bemerkung 10.1.6"})," ist ",e.jsx(n,{children:"\\cgreen{D_x f(h)} = \\cgreen{f'(x) h}"}),`, und aus
`,e.jsx(n,{children:"\\cgreen{f'(x) h} = \\cgreen{2x \\cdot h}"})," lesen wir ",e.jsx(n,{children:"\\cgreen{f'(x)} = \\cgreen{2x}"})," ab."]}),e.jsxs(i.p,{children:["Ein Wort zum Quantor in der Beschränktheit. Das ",e.jsx(n,{children:"\\forall"}),` in der Schranke
gehört zum `,e.jsx(n,{children:"h"}),", nicht zum ",e.jsx(n,{children:"x"}),": Die Schranke ",e.jsx(n,{children:"M"})," hängt ja gerade von ",e.jsx(n,{children:"x"}),` ab, und
ein einziges `,e.jsx(n,{children:"M"})," für alle ",e.jsx(n,{children:"x"})," kann es nicht geben, weil ",e.jsx(n,{children:"2\\left|x\\right|"}),` über
jede Grenze wächst. Beschränktheit ist punktweise in `,e.jsx(n,{children:"x"}),` zu verstehen, und bei
festem `,e.jsx(n,{children:"x"})," gilt sie dann für alle ",e.jsx(n,{children:"h"}),"."]})]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.1.8 (Ausblick: andere Ableitungsbegriffe)",id:"env-ausblick-andere-ableitungsbegriffe",children:e.jsxs(i.p,{children:[`Die Fréchet-Ableitung ist nicht die einzige Möglichkeit, den Ableitungsbegriff
auf normierte Räume zu heben. Schwächere Varianten verlangen die Approximation
nur richtungsweise oder nur gleichmäßig auf kompakten Richtungsmengen; sie
heißen `,e.jsx(i.em,{children:"Gateaux-"})," und ",e.jsx(i.em,{children:"Hadamard-Ableitung"}),` und spielen vor allem in der
asymptotischen Statistik eine Rolle. Für dieses Kapitel reicht Fréchet
vollständig aus, denn wir arbeiten durchweg in endlich-dimensionalen Räumen.`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(i.p,{children:["In den ersten vier Aussagen sei ",e.jsx(n,{children:"f\\colon S \\to \\R"})," an der Stelle ",e.jsx(n,{children:"x"}),`
differenzierbar mit Ableitung `,e.jsx(n,{children:"f'(x)"}),"."]}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"x"})," differenzierbar, so ist ",e.jsx(n,{children:"f'"})," eine lineare Funktion."]}),e.jsxs(i.p,{children:["Die Ableitung ist zunächst irgendeine Funktion von ",e.jsx(n,{children:"x"}),`, und die muss nichts mit
Linearität zu tun haben: Für `,e.jsx(n,{children:"f(x) = \\sin(x)"})," ist ",e.jsx(n,{children:"f'(x) = \\cos(x)"}),`. Linear ist
etwas anderes, nämlich die Abbildung `,e.jsx(n,{children:"h \\mapsto f'(x)h"})," bei festem ",e.jsx(n,{children:"x"}),`
(`,e.jsx(i.a,{href:"#env-was-hier-eigentlich-linear-ist",children:"Bemerkung 10.1.4"}),")."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für festes ",e.jsx(n,{children:"x"})," ist ",e.jsx(n,{children:"h \\mapsto f'(x)h"})," eine lineare Funktion."]}),e.jsxs(i.p,{children:["Hier ist ",e.jsx(n,{children:"f'(x)"})," eine feste Zahl, und ",e.jsx(n,{children:"h \\mapsto f'(x)h"}),` ist die Multiplikation
damit. Additivität und Homogenität sind in einer Zeile nachgerechnet. Diese
Abbildung heißt in `,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," ",e.jsx(n,{children:"D_x f"}),"."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"\\displaystyle\\lim_{h \\to 0} \\frac{\\left|f(x+h) - f(x) - f'(x)h\\right|}{\\left|h\\right|} = 0"}),"."]}),e.jsxs(i.p,{children:["Das ist Aussage (2) aus ",e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"}),". Der Zähler ist der Restterm ",e.jsx(n,{children:"r(h)"}),`, und
Schritt 1 und 2 des Beweises zeigen, dass die Grenzwertdefinition der Ableitung
genau dieses Verschwinden des relativen Fehlers bedeutet.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"f(x+h) = f(x) + f'(x)h + o(\\left|h\\right|)"})," für ",e.jsx(n,{children:"h \\to 0"}),"."]}),e.jsxs(i.p,{children:["Das ist Aussage (3) aus ",e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"}),`, gleichwertig zur vorigen: Setzen wir
`,e.jsx(n,{children:"r(h) := f(x+h) - f(x) - f'(x)h"}),", so heißt ",e.jsx(n,{children:"\\left|r(h)\\right|/\\left|h\\right| \\to 0"}),`
gerade `,e.jsx(n,{children:"r(h) = o(\\left|h\\right|)"}),`. Diese Zeile ist die Vorlage für
`,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),"."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(x) = x^2"})," gilt bei festem ",e.jsx(n,{children:"x"}),` die Schranke
`,e.jsx(n,{children:"\\left|D_x f(h)\\right| \\le M \\left|h\\right|"})," für alle ",e.jsx(n,{children:"h"}),", mit ",e.jsx(n,{children:"M = 2\\left|x\\right|"}),"."]}),e.jsxs(i.p,{children:["So herum stimmt es: ",e.jsx(n,{children:"\\left|2xh\\right| = 2\\left|x\\right|\\left|h\\right|"}),`, und
`,e.jsx(n,{children:"M = 2\\left|x\\right|"})," ist bei festem ",e.jsx(n,{children:"x"})," endlich. Der Quantor gehört zum ",e.jsx(n,{children:"h"}),`:
Ein einziges `,e.jsx(n,{children:"M"})," für alle ",e.jsx(n,{children:"x"})," gäbe es nicht, denn ",e.jsx(n,{children:"2\\left|x\\right|"}),` wächst
unbeschränkt (`,e.jsx(i.a,{href:"#env-frechet-ableitung-von-f-x-x",children:"Beispiel 10.1.7"}),")."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Fréchet-Ableitung ",e.jsx(n,{children:"D_x f"})," ist sowohl in ",e.jsx(n,{children:"h"})," als auch in ",e.jsx(n,{children:"x"})," linear."]}),e.jsxs(i.p,{children:["Linear ist nur die Abhängigkeit von ",e.jsx(n,{children:"h"}),". Wie ",e.jsx(n,{children:"D_x f"})," von der Stelle ",e.jsx(n,{children:"x"}),` abhängt,
lässt `,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," offen, und schon ",e.jsx(n,{children:"f(x) = x^2"}),` zeigt den Unterschied:
`,e.jsx(n,{children:"D_x f(h) = 2xh"})," ist linear in ",e.jsx(n,{children:"h"}),", die Zuordnung ",e.jsx(n,{children:"x \\mapsto D_x f"}),` ist es
zufällig ebenfalls, bei `,e.jsx(n,{children:"f(x) = x^3"})," mit ",e.jsx(n,{children:"D_x f(h) = 3x^2h"})," dagegen nicht mehr."]})]}),e.jsxs(We,{loesung:.6,toleranz:.02,children:[e.jsxs(i.p,{children:["Im Widget: Wir wählen ",e.jsx(n,{children:"f(x) = x^2"})," und stellen ",e.jsx(n,{children:"x = 0{,}60"})," und ",e.jsx(n,{children:"h = 0{,}60"}),` ein.
Welchen Wert zeigt der Readout für den relativen Fehler
`,e.jsx(n,{children:"\\left|r(h)\\right|/\\left|h\\right|"}),"?"]}),e.jsxs(i.p,{children:["Der Restterm ist ",e.jsx(n,{children:"r(h) = h^2 = 0{,}36"}),`, also
`,e.jsx(n,{children:"\\left|r(h)\\right|/\\left|h\\right| = \\left|h\\right| = 0{,}6"}),`. Dasselbe steht als
Abstand zwischen der Sekantensteigung `,e.jsx(n,{children:"1{,}8"})," und der Tangentensteigung ",e.jsx(n,{children:"1{,}2"}),`
in der Readout-Liste.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.1 behandelt den eindimensionalen Ableitungsbegriff, §5.1.1
die Taylorreihen, die wir hier nur als Vorkenntnis gestreift haben, und §5.1.2
die Differentiationsregeln.`})})]})}function Ht(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Sr,{...r})}):Sr(r)}const fe=P.blau,In=P.gruen,_i=P.rot,qe=P.orange,_e=P.violett,Kt="⁰¹²³⁴⁵⁶⁷⁸⁹";function Li(r){return String(r).split("").map(i=>Kt[Number(i)]).join("")}function Dr(r,i,t,l,s,c,h,x,d=72){const f=[];for(let a=0;a<=d;a++){const A=[];for(let z=0;z<=d;z++)A.push(r(t+(l-t)*a/d,s+(c-s)*z/d));f.push(A)}const j=a=>t+(l-t)*a/d,D=a=>s+(c-s)*a/d;return i.map(a=>{let A="";for(let z=0;z<d;z++)for(let p=0;p<d;p++){const R=[f[z][p],f[z+1][p],f[z+1][p+1],f[z][p+1]],M=[j(z),j(z+1),j(z+1),j(z)],F=[D(p),D(p),D(p+1),D(p+1)],_=[];for(let g=0;g<4;g++){const m=(g+1)%4,b=R[g]-a,N=R[m]-a;if(b<0&&N>=0||b>=0&&N<0){const S=b/(b-N);_.push([M[g]+S*(M[m]-M[g]),F[g]+S*(F[m]-F[g])])}}const y=(g,m)=>`M${h(g[0]).toFixed(1)},${x(g[1]).toFixed(1)}L${h(m[0]).toFixed(1)},${x(m[1]).toFixed(1)}`;_.length===2?A+=y(_[0],_[1]):_.length===4&&(A+=y(_[0],_[1])+y(_[2],_[3]))}return A})}const Ne=244,rn=28,wn=14,Ar=16,yr=8;function yt({id:r,titel:i,f:t,niveaus:l,hervor:s,fenster:c,punkte:h,pfeile:x,gerade:d,pfad:f,minimum:j,ariaLabel:D,griff:a}){var w,B;const[A,z,p,R]=c,M=E.useMemo(()=>k=>rn+(k-A)/(z-A)*Ne,[A,z]),F=E.useMemo(()=>k=>wn+Ne-(k-p)/(R-p)*Ne,[p,R]),_=E.useMemo(()=>Dr(t,l,A,z,p,R,M,F),[t,l,A,z,p,R,M,F]),y=E.useMemo(()=>s===void 0?"":Dr(t,[s],A,z,p,R,M,F)[0],[t,s,A,z,p,R,M,F]);let g=null;if(d){const[k,K]=d.p,[O,X]=d.richtung,le=[];Math.abs(O)>1e-9&&le.push((A-k)/O,(z-k)/O),Math.abs(X)>1e-9&&le.push((p-K)/X,(R-K)/X);const U=Math.max(...le.filter(Ae=>Ae<0),-1e6),ae=Math.min(...le.filter(Ae=>Ae>0),1e6);Number.isFinite(U)&&Number.isFinite(ae)&&(g=[k+U*O,K+U*X,k+ae*O,K+ae*X])}const m=Be(A,z,4),b=Be(p,R,4),N=m.length>1?Math.abs(m[1]-m[0]):void 0,S=b.length>1?Math.abs(b[1]-b[0]):void 0;return e.jsx("div",{className:"min-w-0 grow basis-60",children:e.jsxs("svg",{viewBox:`0 0 ${rn+Ne+yr} ${wn+Ne+Ar}`,width:rn+Ne+yr,height:wn+Ne+Ar,className:"h-auto max-w-full select-none rounded",role:"img","aria-label":D,...(a==null?void 0:a.svgProps)??{},...(a==null?void 0:a.surfaceProps)??{},style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)",...((w=a==null?void 0:a.svgProps)==null?void 0:w.style)??{},...((B=a==null?void 0:a.surfaceProps)==null?void 0:B.style)??{}},children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:`${r}-clip`,children:e.jsx("rect",{x:rn,y:wn,width:Ne,height:Ne})}),e.jsx("marker",{id:`${r}-pfeil-o`,markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:qe})}),e.jsx("marker",{id:`${r}-pfeil-v`,markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:_e})})]}),e.jsx("text",{x:rn,y:10,fontSize:10,fill:"var(--w-text, #334155)",children:i}),b.map(k=>e.jsxs("g",{children:[e.jsx("line",{x1:rn,x2:rn+Ne,y1:F(k),y2:F(k),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:k===0?1.2:.6}),e.jsx("text",{x:rn-4,y:F(k)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:9,children:De(k,S)})]},`y${k}`)),m.map(k=>e.jsxs("g",{children:[e.jsx("line",{y1:wn,y2:wn+Ne,x1:M(k),x2:M(k),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:k===0?1.2:.6}),e.jsx("text",{x:M(k),y:wn+Ne+12,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:9,children:De(k,N)})]},`x${k}`)),e.jsxs("g",{clipPath:`url(#${r}-clip)`,children:[_.map((k,K)=>e.jsx("path",{d:k,stroke:fe,strokeWidth:.9,opacity:.35,fill:"none"},K)),y&&e.jsx("path",{d:y,stroke:fe,strokeWidth:2.2,fill:"none"}),g&&e.jsx("line",{x1:M(g[0]),y1:F(g[1]),x2:M(g[2]),y2:F(g[3]),stroke:d.farbe,strokeWidth:1.2,strokeDasharray:"5 4"}),f&&f.length>1&&e.jsx("polyline",{points:f.map(k=>`${M(k[0])},${F(k[1])}`).join(" "),fill:"none",stroke:fe,strokeWidth:1.5,opacity:.7}),j&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:M(j[0]),cy:F(j[1]),r:6,fill:"none",stroke:In,strokeWidth:2}),e.jsx("circle",{cx:M(j[0]),cy:F(j[1]),r:2.5,fill:In})]}),x.map((k,K)=>e.jsxs("g",{children:[e.jsx("line",{x1:M(k.von[0]),y1:F(k.von[1]),x2:M(k.nach[0]),y2:F(k.nach[1]),stroke:k.farbe,strokeWidth:2.4,markerEnd:`url(#${k.marker})`}),k.beschriftung&&e.jsx("text",{x:M(k.nach[0])+6,y:F(k.nach[1])-5,fill:k.farbe,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:k.beschriftung})]},K)),h.map((k,K)=>e.jsx("circle",{cx:M(k.p[0]),cy:F(k.p[1]),r:k.r,fill:k.farbe,opacity:k.deckkraft??1},K))]})]})})}const Tt=(r,i)=>r*r+3*r*i+2*i*i,Fr=(r,i)=>[2*r+3*i,3*r+4*i],Zt=(r,i)=>r*Math.exp(-r*r-i*i),Mr=(r,i)=>{const t=Math.exp(-r*r-i*i);return[t*(1-2*r*r),-2*r*i*t]},ue=[-2,2,-2,2],Rr=.7,Ft=.6*Math.PI/180,Nr=Math.cos(Ft),It=Math.sin(Ft);function qr(r){let i=0;for(let t=0;t<=80;t++)for(let l=0;l<=80;l++){const s=r(-2+t/20,-2+l/20);i=Math.max(i,Math.hypot(s[0],s[1]))}return i}const Fn=[{kurz:"quadratisch",name:"f(x) = x₁² + 3x₁x₂ + 2x₂²",f:Tt,grad:Fr,niveaus:[-.4,0,.5,1,2,4,6,9,12,16,20],start:[1,1],gmax:qr(Fr),stellen:[{name:"steil",p:[1,1]},{name:"Sattel",p:[0,0]},{name:"fast flach",p:[-.6,.4]}]},{kurz:"wellig",name:"g(x) = x₁·exp(−x₁² − x₂²)",f:Zt,grad:Mr,niveaus:[-.4,-.3,-.2,-.1,-.03,.03,.1,.2,.3,.4],start:[.6,.5],gmax:qr(Mr),stellen:[{name:"Flanke",p:[.6,.5]},{name:"Maximum",p:[.7,0]},{name:"Außenbereich",p:[1.6,1.2]}]}];function Xt(){const[r,i]=E.useState(0),[t,l]=E.useState(Fn[0].start[0]),[s,c]=E.useState(Fn[0].start[1]),[h,x]=E.useState({azimuth:38,elevation:26}),d=Fn[r],f=d.f(t,s),j=d.grad(t,s),D=Math.hypot(j[0],j[1]),a=qn({feld:{x0:rn,y0:wn,w:Ne,h:Ne},welt:{x0:ue[0],x1:ue[1],y0:ue[2],y1:ue[3]},clamp:([w,B])=>[Ue(w,ue[0],ue[1]),Ue(B,ue[2],ue[3])],snap:.05,onDrag:([w,B])=>{l(w),c(B)}}),A=.25+.85*Math.min(1,D/d.gmax),z=D>1e-9,p=z?[t+A*j[0]/D,s+A*j[1]/D]:[t,s],R=z?[-j[1]/D,j[0]/D]:[1,0],M=E.useMemo(()=>(w,B)=>d.f(w,B),[d]),[F,_]=E.useMemo(()=>{let w=1/0,B=-1/0;for(let K=0;K<=40;K++)for(let O=0;O<=40;O++){const X=d.f(ue[0]+K*(ue[1]-ue[0])/40,ue[2]+O*(ue[3]-ue[2])/40);w=Math.min(w,X),B=Math.max(B,X)}const k=.06*(B-w||1);return[w-k,B+k]},[d]),y=E.useMemo(()=>({f:M,nx:30,ny:30,color:fe,opacity:.82,wire:!0}),[M]),g=E.useMemo(()=>[{p:[t,s,f],color:_e,r:4,label:"x",onTop:!0}],[t,s,f]),m=E.useMemo(()=>z?[{from:[t,s,F],to:[t+A*j[0]/D,s+A*j[1]/D,F],color:qe,label:"∇f(x)ᵀ",onTop:!0}]:[],[t,s,F,j,D,A,z]),b=E.useMemo(()=>[{p0:[t,s,f],u:[1,0,j[0]],v:[0,1,j[1]],su:Rr,sv:Rr,color:In,opacity:.6}],[t,s,f,j]),N=E.useMemo(()=>d.niveaus,[d]),S=w=>{i(w),l(Fn[w].start[0]),c(Fn[w].start[1])};return e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Fn.map((w,B)=>e.jsx("button",{type:"button","aria-pressed":B===r,className:B===r?pe:ie,onClick:()=>S(B),children:w.name},w.kurz))}),e.jsx(we,{children:"Ziehen wir den Punkt über das Feld und achten darauf, wie der orange Pfeil zur blau gestrichelten Tangente an die Höhenlinie steht."}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(yt,{id:"s102-feld",titel:"Höhenlinien und Gradient",f:d.f,niveaus:d.niveaus,hervor:f,fenster:ue,punkte:[{p:[t,s],farbe:_e,r:4.5}],ariaLabel:`Höhenlinien von ${d.name} mit dem Gradientpfeil im Punkt (${u(t)}; ${u(s)}).`,griff:{svgProps:a.svgProps,surfaceProps:a.surfaceProps("x")},pfeile:z?[{von:[t,s],nach:p,farbe:qe,marker:"s102-feld-pfeil-o",beschriftung:"∇f(x)ᵀ"}]:[],gerade:z?{p:[t,s],richtung:R,farbe:fe}:void 0}),e.jsxs("div",{className:"min-w-0 grow basis-60",children:[e.jsx(mr,{size:272,xDomain:[ue[0],ue[1]],yDomain:[ue[2],ue[3]],zDomain:[F,_],surface:y,contours:N,contourColor:fe,points:g,arrows:m,planes:b,dropLines:!0,labels:{x:"x₁",y:"x₂",z:"f"},azimuth:h.azimuth,elevation:h.elevation,onViewChange:x,ariaLabel:"Dieselbe Funktion als Fläche über der Ebene, mit der grünen Tangentialebene im gewählten Punkt und dem Gradientpfeil auf dem Boden."}),e.jsx("div",{className:"mt-1 max-w-[272px]",children:e.jsx(fr,{value:h,onChange:x})})]})]}),e.jsxs("div",{className:`flex flex-wrap gap-x-5 gap-y-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:fe},children:"▬ Höhenlinien, Fläche, Tangente an die Höhenlinie"}),e.jsxs("span",{style:{color:In},children:["▬ Tangentialebene (",dn("eq:richtungsableitung"),")"]}),e.jsx("span",{style:{color:qe},children:"▬ Gradient"}),e.jsx("span",{style:{color:_e},children:"▬ gewählter Punkt"})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:`text-xs ${Y}`,children:"Stellen:"}),d.stellen.map(w=>e.jsx("button",{type:"button","aria-pressed":t===w.p[0]&&s===w.p[1],className:t===w.p[0]&&s===w.p[1]?pe:ie,onClick:()=>{l(w.p[0]),c(w.p[1])},children:w.name},w.name)),e.jsx("button",{type:"button",className:ie,onClick:()=>S(r),children:"zurücksetzen"})]}),e.jsx(I,{label:"x₁",value:t,onChange:w=>l(Math.round(w*20)/20),min:-2,max:2,step:.05,accent:_e,fmt:w=>u(w)}),e.jsx(I,{label:"x₂",value:s,onChange:w=>c(Math.round(w*20)/20),min:-2,max:2,step:.05,accent:_e,fmt:w=>u(w)}),e.jsxs(ve,{kind:z?"neutral":"warn",children:[e.jsxs("span",{className:"font-mono",children:["x = (",u(t),"; ",u(s),"), f(x) = ",u(f,3)]}),", Gradient"," ",e.jsxs("span",{className:"font-mono",style:{color:qe},children:["∇f(x) = (",u(j[0],3),"; ",u(j[1],3),") ∈ ℝ¹ˣ²"]})," ","mit ‖∇f(x)‖₂ = ",e.jsx("span",{className:"font-mono",children:u(D,3)}),"."," ",z?`Der orange Pfeil steht senkrecht auf der blau gestrichelten Tangente an die Höhenlinie, so wie ${V("bemerkung:der-gradient-steht-senkrecht-auf-der")} es verlangt, und er wird lang, wo die Höhenlinien dicht liegen. In der Fläche daneben ist ${u(D,3)} die größte Steigung, die die grüne Tangentialebene überhaupt hat.`:"Hier verschwindet der Gradient. Dann zeichnet sich keine Richtung mehr aus, und die Höhenlinie durch den Punkt ist keine glatte Kurve: solche Stellen sind die Kandidaten für Extremwerte und Sattelpunkte. Bei der quadratischen Funktion ist der Nullpunkt ein Sattel, denn f zerfällt in (x₁ + x₂)(x₁ + 2x₂), und die Höhenlinie zum Niveau 0 besteht aus diesen beiden sich kreuzenden Geraden."]})]})}function Jt(){return e.jsx(Xt,{})}const zn=210,tn=12,he=tn+zn/2,Le=zn/2-16;function Ot(){const[r,i]=E.useState(0),[t,l]=E.useState(0),s=Fn[0],[c,h]=s.stellen[r].p,x=s.f(c,h),d=s.grad(c,h),f=Math.hypot(d[0],d[1]),j=f>1e-9,D=t*Math.PI/180,a=[Math.cos(D),Math.sin(D)],A=d[0]*a[0]+d[1]*a[1],z=j?(Math.atan2(d[1],d[0])*180/Math.PI+360)%360:NaN,p=j?A/f:NaN,R=j?Math.acos(Ue(p,-1,1))*180/Math.PI:NaN,M=qn({feld:{x0:tn,y0:tn,w:zn,h:zn},welt:{x0:-1.2,x1:1.2,y0:-1.2,y1:1.2},onDrag:([U,ae])=>{Math.hypot(U,ae)<1e-6||l((Math.atan2(ae,U)*180/Math.PI+360)%360)}}),F=U=>{if(!j)return"";const ae=Math.atan2(d[1],d[0]),Ae=[];for(let Qe=0;Qe<=120;Qe++){const Ze=ae-Math.PI/2+Math.PI*Qe/120+(U===1?0:Math.PI),H=Math.cos(Ze-ae)*U,oe=Le*Math.max(0,H);Ae.push(`${(he+oe*Math.cos(Ze)).toFixed(1)},${(he-oe*Math.sin(Ze)).toFixed(1)}`)}return Ae.join(" ")},_=U=>s.f(c+U*a[0],h+U*a[1]),y=U=>x+U*A,g=_(.5)-y(.5),m=[-1,-.75,-.5,-.25,0,.25,.5,.75,1].map(_).concat([y(-1),y(1)]),b=Math.max(...m)-Math.min(...m),N=Math.max(.1,.15*b),S=[{f:_,color:fe,label:"f(x + t·d)"},{f:y,color:In,dash:[6,4],label:"f(x) + t·∇f(x)d"}],w=j?A>=f*Nr?"steilster-anstieg":A<=-f*Nr?"steilster-abstieg":Math.abs(A)<=f*It?"hoehenlinie":"dazwischen":"kritisch",B=he+Le*Math.cos(D),k=he-Le*Math.sin(D),K=j?he+Le*(d[0]/f):he,O=j?he-Le*(d[1]/f):he,X=he+Le*Math.max(0,p)*Math.cos(D),le=he-Le*Math.max(0,p)*Math.sin(D);return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:`text-xs ${Y}`,children:"Stelle x:"}),s.stellen.map((U,ae)=>e.jsxs("button",{type:"button","aria-pressed":ae===r,className:ae===r?pe:ie,onClick:()=>i(ae),children:[U.name," (",u(U.p[0],1),"; ",u(U.p[1],1),")"]},U.name))]}),e.jsx(we,{children:"Ziehen wir die violette Richtung d im Kompass herum und lesen ab, wo die Richtungsableitung ihr Maximum erreicht und wo sie verschwindet."}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx("div",{className:"min-w-0 grow basis-56",children:e.jsxs("svg",{viewBox:`0 0 ${zn+2*tn} ${zn+2*tn}`,width:zn+2*tn,height:zn+2*tn,className:"h-auto max-w-full select-none rounded",role:"img","aria-label":`Kompass der Richtungen um den Punkt (${u(c)}; ${u(h)}); die gewählte Richtung liegt bei ${u(t,0)} Grad und erreicht ${u(100*p,0)} Prozent des maximalen Anstiegs.`,...M.svgProps,...M.surfaceProps("d"),style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)",...M.svgProps.style,...M.surfaceProps("d").style},children:[e.jsxs("defs",{children:[e.jsx("marker",{id:"s102-k-o",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:qe})}),e.jsx("marker",{id:"s102-k-v",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:_e})})]}),e.jsx("circle",{cx:he,cy:he,r:Le,fill:"none",stroke:"var(--w-grid, #e2e8f0)",strokeWidth:1}),j&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:he-Le*(-d[1]/f),y1:he+Le*(-d[0]/f),x2:he+Le*(-d[1]/f),y2:he-Le*(d[0]/f),stroke:fe,strokeWidth:1.2,strokeDasharray:"5 4"}),e.jsx("polyline",{points:F(1),fill:fe,fillOpacity:.1,stroke:fe,strokeWidth:1.6}),e.jsx("polyline",{points:F(-1),fill:"none",stroke:fe,strokeWidth:1.2,strokeDasharray:"4 3"}),e.jsx("line",{x1:he,y1:he,x2:K,y2:O,stroke:qe,strokeWidth:2.4,markerEnd:"url(#s102-k-o)"}),e.jsx("text",{x:K+8,y:O-6,fill:qe,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"∇f(x)ᵀ"})]}),e.jsx("line",{x1:he,y1:he,x2:B,y2:k,stroke:_e,strokeWidth:2.4,markerEnd:"url(#s102-k-v)"}),e.jsx("text",{x:B+8,y:k+12,fill:_e,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"d"}),j&&p>0&&e.jsx("circle",{cx:X,cy:le,r:4,fill:fe}),e.jsx("circle",{cx:he,cy:he,r:3,fill:_e}),e.jsx("text",{x:tn,y:tn+2,fontSize:10,fill:"var(--w-text, #334155)",children:"Kompass: ∇f(x)d über allen Richtungen"})]})}),e.jsx("div",{className:"min-w-0 grow basis-60",children:e.jsx(Fi,{xLabel:"t",yLabel:"f(x + t·d)",series:S,markers:[{x:0,y:x,color:_e}],xDomain:[-1,1],yDomain:[Math.min(...m)-N,Math.max(...m)+N],width:300,height:234,readout:!0,ariaLabel:"Die Funktion entlang des Strahls durch den Punkt in Richtung d, dazu ihre lineare Näherung."})})]}),e.jsxs("div",{className:`flex flex-wrap gap-x-5 gap-y-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:fe},children:"▬ ∇f(x)d über den Richtungen, f entlang des Strahls"}),e.jsxs("span",{style:{color:In},children:["▬ lineare Näherung (",dn("eq:richtungsableitung"),")"]}),e.jsx("span",{style:{color:qe},children:"▬ Gradient"}),e.jsx("span",{style:{color:_e},children:"▬ Richtung d"})]}),e.jsx(I,{label:"φ (Richtung d)",value:t,onChange:U=>l(Math.round(U)),min:0,max:359,step:1,accent:_e,fmt:U=>`${u(U,1)}°`}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button",className:ie,disabled:!j,onClick:()=>{l(z)},children:"d in Gradientenrichtung"}),e.jsx("button",{type:"button",className:ie,disabled:!j,onClick:()=>l((z+60)%360),children:"d 60° daneben"}),e.jsx("button",{type:"button",className:ie,disabled:!j,onClick:()=>l((z+90)%360),children:"d längs der Höhenlinie"})]}),e.jsxs(ve,{kind:w==="kritisch"?"warn":w==="steilster-anstieg"?"ok":"neutral",children:[e.jsxs("span",{className:"font-mono",style:{color:qe},children:["∇f(x) = (",u(d[0],3),"; ",u(d[1],3),")"]}),", ‖∇f(x)‖₂ = ",e.jsx("span",{className:"font-mono",children:u(f,3)}),"; Richtung"," ",e.jsxs("span",{className:"font-mono",style:{color:_e},children:["d = (",u(a[0],3),"; ",u(a[1],3),")"]}),", Richtungsableitung"," ",e.jsxs("span",{className:"font-mono",style:{color:_e},children:["∇f(x)d = ",u(A,3)]}),", das sind ",e.jsxs("span",{className:"font-mono",children:[u(100*p,1)," %"]})," des Maximums. Restterm bei t = 0,5:"," ",e.jsx("span",{className:"font-mono",style:{color:_i},children:u(g,4)}),"."," ",w==="kritisch"&&"Hier verschwindet der Gradient, und dann ist jede Richtung gleich gut: die Richtungsableitung ist in alle Richtungen null. Der Kompass hat keine ausgezeichnete Achse mehr.",w==="steilster-anstieg"&&`Das ist die Richtung des stärksten Anstiegs: ∇f(x)d erreicht ‖∇f(x)‖₂ = ${u(f,3)}, genau wie ${V("satz:richtung-des-staerksten-anstiegs")} es behauptet. Der blaue Punkt sitzt am weitesten außen.`,w==="steilster-abstieg"&&`Das ist die Richtung des stärksten Abstiegs, die Gegenrichtung zum Gradienten: ∇f(x)d erreicht −‖∇f(x)‖₂ = ${u(-f,3)}. Genau diese Richtung nimmt ${V("algorithmus:gradient-gradientenabstieg")}.`,w==="hoehenlinie"&&"Diese Richtung läuft längs der Höhenlinie: die Richtungsableitung ist null, in erster Ordnung ändert sich f hier also nicht. Rechts liegt die grüne Gerade waagerecht, und im Kompass liegt d auf der blau gestrichelten Nulllinie.",w==="dazwischen"&&`Zwischen d und dem Gradienten liegt ein Winkel von ${u(R,1)}°. Nach ${V("satz:richtung-des-staerksten-anstiegs")} ist ∇f(x)d = ‖∇f(x)‖₂·cos dieses Winkels, und genau dieser cos-Anteil steht oben als Prozentzahl. Die blaue Kurve im Kompass ist der Kreis, den r(θ) = ‖∇f(x)‖·cos θ beschreibt.`]})]})}function Ut(){return e.jsx(Ce,{variante:"bereich",min:0,max:100,schritt:1,start:70,einheit:"%",fmt:r=>u(r,0),toleranz:8,loesung:50,frage:e.jsx(e.Fragment,{children:"Eine Richtung d, die 60° neben dem Gradienten liegt: Wie viel Prozent des maximal möglichen Anstiegs erreicht sie?"}),verdeckt:e.jsxs("p",{className:"text-sm",children:["Der Knopf „d 60° daneben“ stellt genau diese Richtung ein: An beiden Stellen mit Gradient zeigt das Verdikt dann 50,0 %. Das ist cos 60°, denn nach ",V("satz:richtung-des-staerksten-anstiegs")," ist ∇f(x)d = ‖∇f(x)‖₂·cos∡(∇f(x)ᵀ, d). Im Sattel gibt es keine Gradientenrichtung, und dann ist die Richtungsableitung in jede Richtung null."]}),children:e.jsx(Ot,{})})}const _n=[[2,1],[1,3]],Ei=(5+Math.sqrt(5))/2,pr=(5-Math.sqrt(5))/2,dr=2/(pr+Ei),Ct=2/Ei,Er=[1.8,-1.2],ti=12,Qt=[.05,.2,.5,1,2,3.24,5,8,12,17],Jn=(r,i)=>.5*(r*(_n[0][0]*r+_n[0][1]*i)+i*(_n[1][0]*r+_n[1][1]*i)),Br=(r,i)=>[_n[0][0]*r+_n[0][1]*i,_n[1][0]*r+_n[1][1]*i];function Wr(r){return Math.max(Math.abs(1-r*Ei),Math.abs(1-r*pr))}function Yt({aufgeloest:r}){const[i,t]=E.useState(.25),[l,s]=E.useState(3),c=E.useMemo(()=>{const F=[Er];let _=Er;for(let y=0;y<ti;y++){const g=Br(_[0],_[1]);_=[_[0]-i*g[0],_[1]-i*g[1]],F.push(_)}return F},[i]),h=c[l],x=Br(h[0],h[1]),d=Jn(h[0],h[1]),f=l>0?Jn(c[l-1][0],c[l-1][1]):NaN,j=l>0?d/f:NaN,D=Wr(i),a=[h[0]-i*x[0],h[1]-i*x[1]],{marker:A,yDomain:z}=E.useMemo(()=>{const F=b=>b>0?Math.log10(b):NaN,_=c.slice(0,l+1).map((b,N)=>({x:N,y:F(Jn(b[0],b[1])),color:fe})).filter(b=>Number.isFinite(b.y)),y=c.map(b=>F(Jn(b[0],b[1]))).filter(b=>Number.isFinite(b)),g=Math.max(-14,Math.min(...y)-.5),m=Math.max(...y)+.5;return{marker:_,yDomain:[g,m]}},[c,l]),p=[-2.4,2.4,-2.4,2.4],R=F=>F[0]>=p[0]&&F[0]<=p[1]&&F[1]>=p[2]&&F[1]<=p[3],M=[{f:F=>Math.abs(1-F*Ei),color:qe,dash:[5,3],label:"|1 − αλ_max|"},{f:F=>Math.abs(1-F*pr),color:fe,dash:[2,3],label:"|1 − αλ_min|"},{f:Wr,color:_i,label:"ρ(α) = max"}];return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Schieben wir α, bis der Verlust so schnell wie möglich fällt, und laufen dann mit dem Schrittregler die Bahn ab."}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(yt,{id:"s102-abstieg",titel:"Höhenlinien von L und die Iterierten",f:Jn,niveaus:Qt,fenster:p,minimum:[0,0],pfad:c.slice(0,l+1),ariaLabel:`Höhenlinien der quadratischen Verlustfunktion mit den ersten ${l} Schritten des Gradientenabstiegs bei Lernrate ${u(i)}.`,punkte:c.slice(0,l+1).map((F,_)=>({p:F,farbe:fe,r:_===l?4.5:2.5,deckkraft:_===l?1:.55})),pfeile:l<ti&&R(h)?[{von:h,nach:a,farbe:qe,marker:"s102-abstieg-pfeil-o"}]:[]}),e.jsx("div",{className:"min-w-0 grow basis-60",children:e.jsx(Fi,{xLabel:"t (Schritt)",yLabel:"log₁₀ L(θ⁽ᵗ⁾)",series:[],markers:A,xDomain:[0,ti],yDomain:z,width:300,height:258,ariaLabel:"Der Verlust je Schritt auf logarithmischer Skala."})}),r&&e.jsx("div",{className:"min-w-0 grow basis-60",children:e.jsx(Fi,{xLabel:"α",yLabel:"Schrumpffaktor",series:M,markers:[{x:i,y:D,color:_i}],hlines:[{at:1,color:P.grau,dash:[4,4]}],vlines:[{at:i,color:_e,dash:[3,3]}],xDomain:[.05,.7],yDomain:[0,1.6],width:300,height:258,readout:!0,ariaLabel:"Der Schrumpffaktor beider Eigenrichtungen als Funktion der Lernrate; ihr Maximum ist die Rate rho."})})]}),e.jsx(I,{label:"α (Lernrate)",value:i,onChange:F=>t(Math.round(F*100)/100),min:.05,max:.7,step:.01,accent:qe,fmt:F=>u(F)}),e.jsx(qi,{step:l,setStep:s,max:ti,narration:e.jsxs(e.Fragment,{children:["θ⁽",Li(l),"⁾ = (",u(h[0],3),"; ",u(h[1],3),"), L = ",u(d,5)]})}),e.jsxs(ve,{kind:D<.999?"ok":D<=1.001?"warn":"fail",children:[e.jsxs("span",{className:"font-mono",style:{color:qe},children:["∇L(θ⁽",Li(l),"⁾) = (",u(x[0],3),"; ",u(x[1],3),") ∈ ℝ¹ˣ²"]}),", Schritt"," ",e.jsxs("span",{className:"font-mono",children:["−α∇L(θ⁽",Li(l),"⁾)ᵀ = (",u(-i*x[0],3),"; ",u(-i*x[1],3),")ᵀ"]}),". Verlust ",e.jsxs("span",{className:"font-mono",children:["L = ",u(d,5)]}),", Verhältnis zum Vorschritt"," ",e.jsx("span",{className:"font-mono",children:u(j,3)}),", Schranke"," ",e.jsxs("span",{className:"font-mono",style:{color:_i},children:["ρ² = ",u(D*D,3)]}),"."," ",D<.999?`ρ = ${u(D,3)} < 1: die Iteration läuft ins Minimum, der Verlust fällt je Schritt höchstens auf das ${u(D*D,3)}-fache.${Math.abs(i-dr)<.005?" Das ist die beste Wahl: bei α = 0,40 schrumpfen beide Eigenrichtungen mit demselben Faktor √5/5 = 0,447, und kein anderes α macht das Maximum der beiden kleiner.":` Ein Stück näher an α = ${u(dr)} ginge es schneller.`}`:D<=1.001?`ρ ≈ 1: der Grenzfall α = 2/λ_max = ${u(Ct,3)}. Die Schritte springen zwischen zwei Punkten hin und her, ohne kleiner zu werden.`:`ρ = ${u(D,3)} > 1: die Schritte schießen über das Minimum hinaus und werden immer größer, die Iteration läuft davon. ${V("satz:gradient-der-quadratischen-form")} liefert dabei weiter den richtigen Gradienten, nur die Schrittweite ist zu groß.`]})]})}function es(){return e.jsx(Ce,{variante:"bereich",min:.05,max:.7,schritt:.01,start:.25,loesung:dr,toleranz:.05,einheit:"α",fmt:r=>u(r,2),frage:e.jsx(e.Fragment,{children:"Bei welcher Lernrate α schrumpfen beide Eigenrichtungen von A gleich schnell, der Verlust also am zügigsten?"}),verdeckt:e.jsx("p",{className:"text-sm",children:"Die dritte Tafel zeigt jetzt, warum: |1 − αλ| fällt für die kleine Eigenrichtung langsam und für die große schnell, ρ(α) ist das Maximum der beiden. Links vom Schnittpunkt bremst λ_min, rechts davon λ_max; das Minimum liegt genau dort, wo sich die beiden Kurven treffen."}),children:({aufgeloest:r})=>e.jsx(Yt,{aufgeloest:r})})}function Gr(r){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),` haben wir das Ableiten so weit gefasst, dass es in jedem
normierten Raum funktioniert. Der Preis dafür ist Abstraktheit: Die Ableitung ist dort eine
lineare Abbildung, kein Objekt, mit dem wir rechnen könnten. Für jede Kombination von Ein-
und Ausgabeformat brauchen wir deshalb eine konkrete Gestalt, in der diese lineare Abbildung
steckt, also eine Zahl, einen Vektor oder eine Matrix.`]}),`
`,e.jsx(i.h3,{children:"Fahrplan durch die Spezialfälle"}),`
`,e.jsx(i.p,{children:`Alle Ableitungen, die wir aus der Analysis kennen, sind Spezialfälle der Fréchet-Ableitung.
Neu und für die Statistik wichtig sind die Fälle, in denen Skalare, Vektoren oder Matrizen
als Eingabe oder als Ausgabe auftreten. Wir ordnen sie in einer Tabelle an, und diese
Tabelle ist zugleich der Fahrplan für die nächsten drei Abschnitte.`}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Eingabe ↓ / Ausgabe →"}),e.jsxs(i.th,{children:["Skalar ",e.jsx(n,{children:"y"})]}),e.jsxs(i.th,{children:["Vektor ",e.jsx(n,{children:"\\by"})]}),e.jsxs(i.th,{children:["Matrix ",e.jsx(n,{children:"\\bY"})]})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Skalar ",e.jsx(n,{children:"x"})]}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{dy}{dx}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{d\\by}{dx}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{d\\bY}{dx}"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Vektor ",e.jsx(n,{children:"\\bx"})]}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{\\partial y}{\\partial \\bx}"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{\\partial \\by}{\\partial \\bx}"})}),e.jsx(i.td,{})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Matrix ",e.jsx(n,{children:"\\bX"})]}),e.jsx(i.td,{children:e.jsx(n,{children:"\\dfrac{\\partial y}{\\partial \\bX}"})}),e.jsx(i.td,{}),e.jsx(i.td,{})]})]})]}),`
`,e.jsx(i.p,{children:"Die Einträge lesen sich so:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Skalar zu Skalar ist die gewöhnliche Ableitung aus ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),"."]}),`
`,e.jsxs(i.li,{children:["Vektor zu Skalar ist der Fall dieses Abschnitts. Das zugehörige Objekt heißt ",e.jsx(i.em,{children:"Gradient"}),"."]}),`
`,e.jsxs(i.li,{children:["Vektor zu Vektor führt auf die Jacobimatrix in ",e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),`; der Fall Skalar
zu Vektor steckt dort als Sonderfall mit einer einzigen Eingabevariablen drin.`]}),`
`,e.jsxs(i.li,{children:["Skalar zu Matrix und Matrix zu Skalar behandelt ",e.jsx(i.a,{href:"#sec-10.4",children:"Abschnitt 10.4"}),"."]}),`
`,e.jsxs(i.li,{children:[`Die drei leeren Zellen lassen wir aus. Ob wir eine Matrix nach einem Vektor ableiten,
einen Vektor nach einer Matrix oder eine Matrix nach einer Matrix: In allen drei Fällen
bräuchten wir ein Objekt mit mindestens drei Indexpositionen, also einen
`,e.jsx(v,{id:"tensor",children:"Tensor"})," (",e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Kapitel 9"}),`). Wir kommen in
`,e.jsx(i.a,{href:"#sec-10.9",children:"Abschnitt 10.9"})," kurz darauf zurück."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Der Gradient"}),`
`,e.jsxs(i.p,{children:[`Der wichtigste Fall in der Statistik ist der zweite: Eine Verlust- oder
`,e.jsx(v,{id:"objective-function",children:"Zielfunktion"}),` bewertet ein ganzes Bündel von Parametern und gibt
dafür eine einzige Zahl zurück. Wie leiten wir nach einem ganzen Bündel ab? Die Analysis
geht es Koordinate für Koordinate durch: Sie friert alle bis auf eine ein und leitet die
übrig bleibende Funktion einer Variablen ganz gewöhnlich ab. Jede solche
`,e.jsx(v,{id:"partial-derivative",children:"partielle Ableitung"})," misst die Steigung von ",e.jsx(n,{children:"f"}),` entlang einer
Koordinatenachse, und der Gradient ist die Liste dieser `,e.jsx(n,{children:"n"})," Steigungen."]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.2.1 (Gradient)",id:"env-gradient",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," eine in ",e.jsx(n,{children:"\\bx \\in \\R^n"}),`
`,e.jsx(v,{id:"differentiability",children:"differenzierbare"})," Funktion. Der ",e.jsx(i.em,{children:"Gradient"})," (gradient) von ",e.jsx(n,{children:"f"}),` in
`,e.jsx(n,{children:"\\bx"})," ist der Zeilenvektor der partiellen Ableitungen,"]}),e.jsx(o,{children:`\\frac{\\partial f(\\bx)}{\\partial \\bx} = \\corange{\\nabla f(\\bx)}
= \\left(\\frac{\\partial f(\\bx)}{\\partial x_1}, \\dots, \\frac{\\partial f(\\bx)}{\\partial x_n}\\right)
\\in \\R^{1 \\times n} .`})]}),`
`,e.jsxs(i.p,{children:[`Dass dieser Zeilenvektor wirklich die Ableitung im Sinne von
`,e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),` ist, kostet ein kurzes Argument. Die Formate passen jedenfalls:
Das Produkt einer `,e.jsx(n,{children:"1 \\times n"}),"-Zeile mit einer ",e.jsx(n,{children:"n \\times 1"}),`-Spalte ist eine Zahl, und
`,e.jsx(n,{children:"\\bh \\mapsto \\corange{\\nabla f(\\bx)}\\bh"})," ist in ",e.jsx(n,{children:"\\bh"}),` linear. Dass es genau diese lineare
Abbildung sein muss, sehen wir, indem wir `,e.jsx(n,{children:"\\bh = t\\,\\be_j"})," mit dem ",e.jsx(n,{children:"j"}),`-ten Einheitsvektor
`,e.jsx(n,{children:"\\be_j"})," einsetzen und durch ",e.jsx(n,{children:"t"})," teilen: Links steht dann der Differenzenquotient von ",e.jsx(n,{children:"f"}),` in
Richtung der `,e.jsx(n,{children:"j"}),"-ten Koordinate, rechts ",e.jsx(n,{children:"\\cgreen{D_{\\bx} f(\\be_j)}"}),` plus ein Term, der mit
`,e.jsx(n,{children:"t \\to 0"})," verschwindet. Der Grenzwert links ist ",e.jsx(n,{children:"\\partial f(\\bx)/\\partial x_j"}),`, also ist
`,e.jsx(n,{children:"\\cgreen{D_{\\bx} f(\\be_j)}"})," genau die ",e.jsx(n,{children:"j"}),`-te partielle Ableitung. Eine lineare Abbildung ist
durch ihre Werte auf den `,e.jsx(n,{children:"n"}),` Koordinatenrichtungen schon festgelegt, es bleibt also keine
andere Wahl. (`,e.jsx(i.a,{href:"#env-die-matrix-der-linearen-naeherung",children:"Lemma 10.3.3"})," in ",e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),` führt dasselbe Argument für
beliebige Ausgabeformate aus.) Die lineare Approximation lautet damit`]}),`
`,e.jsx(T,{tag:"10.2.1",id:"eq-eq-10-2-1",children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{o(\\left\\|\\bh\\right\\|)}
\\qquad \\text{mit} \\qquad
\\cgreen{D_{\\bx} f(\\bh)} = \\corange{\\nabla f(\\bx)}\\,\\bh .`}),`
`,e.jsxs(i.p,{children:["Der Restterm ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),` ist dabei wie immer in der
`,e.jsx(v,{id:"big-o-notation",children:"Landau-Notation"})," zu lesen: Er schrumpft schneller als ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`
selbst, wenn `,e.jsx(n,{children:"\\bh"}),` gegen null geht. Anschaulich ist
`,e.jsx(n,{children:"\\cgreen{\\bh \\mapsto f(\\bx) + \\nabla f(\\bx)\\bh}"})," für ",e.jsx(n,{children:"n = 2"}),` eine Ebene, die den Graphen von
`,e.jsx(n,{children:"f"})," im Punkt ",e.jsx(n,{children:"(\\bx, f(\\bx))"}),` berührt, also die Tangentialebene. Sie übernimmt die Rolle, die
für `,e.jsx(n,{children:"n = 1"})," die Tangente an den Funktionsgraphen spielt."]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.2.2 (Zeilenvektor, nicht Spaltenvektor)",id:"env-zeilenvektor-nicht-spaltenvektor",children:[e.jsxs(i.p,{children:["Vielerorts wird ",e.jsx(n,{children:"\\nabla f"})," als ",e.jsx(i.em,{children:"Spalten"}),`vektor definiert, während
für uns die Zeilenform die praktischere ist. Wofür genau, zeigt sich
erst in den nächsten Abschnitten, deshalb hier vorab die zwei Stellen.`]}),e.jsxs(i.p,{children:["Die Jacobimatrix aus ",e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"})," hat für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),` das Format
`,e.jsx(n,{children:"m \\times n"}),", im Fall ",e.jsx(n,{children:"m = 1"})," also ",e.jsx(n,{children:"\\R^{1 \\times n}"}),`. In der Zeilenkonvention sind Gradient
und Jacobimatrix damit dasselbe Objekt, und wir müssen die beiden Fälle weder unterscheiden
noch ineinander umrechnen. In der Kettenregel dürfen wir die Faktoren außerdem in der
Reihenfolge hinschreiben, in der die Funktionen hintereinander ausgeführt werden; in der
Spaltenkonvention kehrt sich diese Reihenfolge um und die Faktoren tragen Transponierte.`]}),e.jsxs(i.p,{children:[`Bezahlen müssen wir dafür an einer anderen Stelle. Wo der Gradient als Punkt oder als
Schritt im `,e.jsx(n,{children:"\\R^n"}),` auftritt, etwa in einem Optimierungsverfahren, steht der
`,e.jsx(v,{id:"transpose",children:"transponierte"}),` Gradient. Genau das passiert weiter unten im
Gradientenabstieg.`]})]}),`
`,e.jsxs(i.h3,{children:["Was der Gradient über ",e.jsx(n,{children:"f"})," verrät"]}),`
`,e.jsxs(i.p,{children:["Die Definition zählt nur die Steigungen entlang der ",e.jsx(n,{children:"n"}),` Koordinatenachsen auf. Sie sagt
scheinbar nichts über schräge Richtungen. Tatsächlich steckt darin schon die vollständige
Information, und `,e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"})," liefert sie uns."]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.2.3 (Richtungsableitung)",id:"env-richtungsableitung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bd \\in \\R^n"})," mit ",e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"}),". Die ",e.jsx(i.em,{children:"Richtungsableitung"})," von ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"}),`
in Richtung `,e.jsx(n,{children:"\\bd"})," ist die Ableitung der eindimensionalen Funktion ",e.jsx(n,{children:"t \\mapsto f(\\bx + t\\bd)"}),`
an der Stelle `,e.jsx(n,{children:"t = 0"}),". Setzen wir ",e.jsx(n,{children:"\\bh = t\\bd"})," in ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"}),` ein, so ist sie gerade
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd"}),", denn"]}),e.jsx(T,{tag:"10.2.2",id:"eq-richtungsableitung",children:"\\cblue{f(\\bx + t\\bd)} = \\cblue{f(\\bx)} + \\cgreen{t\\,\\corange{\\nabla f(\\bx)}\\bd} + \\cred{o(|t|)} ."})]}),`
`,e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"})," folgt ",e.jsx(n,{children:"\\left\\|t\\bd\\right\\|_2 = |t|"}),`, deshalb steht rechts
`,e.jsx(n,{children:"\\cred{o(|t|)}"}),". Wir kennen die Steigung von ",e.jsx(n,{children:"f"})," also in ",e.jsx(i.em,{children:"jeder"}),` Richtung, sobald wir den
Gradienten kennen. Die Norm legt dabei fest, was ein gleich großer Schritt ist;
im Folgenden verwenden wir die euklidische Norm. Unter allen so normierten
Richtungen gibt es eine beste.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.2.4 (Richtung des stärksten Anstiegs)",id:"env-richtung-des-staerksten-anstiegs",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar mit ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull"}),`. Dann gilt für
alle `,e.jsx(n,{children:"\\bd \\in \\R^n"})," mit ",e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"})]}),e.jsx(o,{children:`-\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2 \\;\\leq\\; \\corange{\\nabla f(\\bx)}\\bd \\;\\leq\\;
\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2 ,`}),e.jsx(i.p,{children:"und die obere Schranke wird genau für"}),e.jsx(o,{children:"\\bd^\\ast = \\frac{\\corange{\\nabla f(\\bx)^\\top}}{\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2}"}),e.jsxs(i.p,{children:["angenommen, die untere für ",e.jsx(n,{children:"-\\bd^\\ast"}),`. Der transponierte Gradient zeigt also in die
Richtung des stärksten Anstiegs, der negative in die des stärksten Abstiegs, und
`,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2"})," ist die Steigung in dieser Richtung."]})]}),`
`,e.jsx(xe,{title:"Warum der Gradient die Richtung des stärksten Anstiegs angibt",children:e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"}),"; die ",e.jsx(v,{id:"euclidean-norm",children:"euklidische Norm"})," von ",e.jsx(n,{children:"\\bg"})," ist dieselbe wie die des Zeilenvektors ",e.jsx(n,{children:"\\nabla f(\\bx)"})]}),children:[e.jsxs(i.p,{children:["Das Produkt aus Zeile und Spalte ist ein Skalarprodukt: Mit ",e.jsx(n,{children:`\\bg = \\corange{\\nabla f(\\bx)^\\top}
\\in \\R^n`})," ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd = \\bg^\\top\\bd"}),`. Die
`,e.jsx(v,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"})," liefert"]}),e.jsx(o,{children:"\\left|\\bg^\\top\\bd\\right| \\leq \\left\\|\\bg\\right\\|_2 \\left\\|\\bd\\right\\|_2 = \\left\\|\\bg\\right\\|_2 ,"}),e.jsx(i.p,{children:"also beide Schranken auf einmal."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["hier wird ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull"})," gebraucht: sonst dürften wir nicht durch ",e.jsx(n,{children:"\\left\\|\\bg\\right\\|_2"})," teilen, und alle Richtungsableitungen wären null"]}),children:[e.jsxs(i.p,{children:["Gleichheit gilt in Cauchy-Schwarz genau dann, wenn ",e.jsx(n,{children:"\\bd"})," ein Vielfaches von ",e.jsx(n,{children:"\\bg"}),` ist, also
`,e.jsx(n,{children:"\\bd = c\\,\\bg"})," mit ",e.jsx(n,{children:"c \\in \\R"}),". Aus ",e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"}),` folgt
`,e.jsx(n,{children:"|c| = 1/\\left\\|\\bg\\right\\|_2"}),". Das positive Vorzeichen gibt"]}),e.jsx(o,{children:`\\bg^\\top\\bd^\\ast = \\frac{\\bg^\\top\\bg}{\\left\\|\\bg\\right\\|_2}
= \\frac{\\left\\|\\bg\\right\\|_2^2}{\\left\\|\\bg\\right\\|_2} = \\left\\|\\bg\\right\\|_2 ,`}),e.jsxs(i.p,{children:["das negative den Wert ",e.jsx(n,{children:"-\\left\\|\\bg\\right\\|_2"}),"."]})]})]})}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.2.5 (Der Gradient steht senkrecht auf der Höhenlinie)",id:"env-der-gradient-steht-senkrecht-auf-der",children:[e.jsxs(i.p,{children:["Interessant ist auch das andere Extrem. Für Richtungen ",e.jsx(n,{children:"\\bd"}),` mit
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd = 0"})," verschwindet in ",e.jsx(i.a,{href:"#eq-richtungsableitung",children:"(10.2.2)"})," der lineare Term, und ",e.jsx(n,{children:"f"}),` ändert
sich in erster Ordnung überhaupt nicht. Solche Richtungen stehen senkrecht auf
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)^\\top}"}),". Ist ",e.jsx(n,{children:"f"})," in einer Umgebung von ",e.jsx(n,{children:"\\bx"}),` stetig differenzierbar
und `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull"}),`, so sind sie genau die Tangentialrichtungen der
`,e.jsx(v,{id:"level-sets",children:"Niveaumenge"})," ",e.jsx(n,{children:"\\{\\by \\in \\R^n : f(\\by) = f(\\bx)\\}"})," durch ",e.jsx(n,{children:"\\bx"}),`; diese ist
dort nach dem Satz über implizite Funktionen eine glatte Kurve oder Fläche, für `,e.jsx(n,{children:"n = 2"}),` also
die Höhenlinie durch `,e.jsx(n,{children:"\\bx"}),`. Verschwindet der Gradient dagegen, kann die Niveaumenge eine
Ecke haben, und ein Beispiel dafür folgt gleich.`]}),e.jsxs(i.p,{children:[`Beide Beobachtungen zusammen ergeben das vertraute Bild einer Landkarte: Der Gradient steht
senkrecht auf der Höhenlinie und zeigt bergauf, und je enger die Höhenlinien beieinander
liegen, desto größer ist `,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Eine quadratische Funktion als Beispiel"}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.2.6 (Gradient einer quadratischen Funktion)",id:"env-gradient-einer-quadratischen-funktion",children:[e.jsxs(i.p,{children:["Wir betrachten ",e.jsx(n,{children:"f\\colon \\R^2 \\to \\R"})," mit"]}),e.jsx(o,{children:"\\cblue{f(\\bx)} = x_1^2 + 3x_1x_2 + 2x_2^2 ."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Schritt 1: partielle Ableitungen."})," Beim Ableiten nach ",e.jsx(n,{children:"x_1"})," ist ",e.jsx(n,{children:"x_2"}),` eine Konstante und
umgekehrt:`]}),e.jsx(o,{children:`\\frac{\\partial f(\\bx)}{\\partial x_1} = 2x_1 + 3x_2 ,
\\qquad\\qquad
\\frac{\\partial f(\\bx)}{\\partial x_2} = 3x_1 + 4x_2 .`}),e.jsx(i.p,{children:e.jsx(i.strong,{children:"Schritt 2: als Zeile zusammensetzen."})}),e.jsx(o,{children:"\\corange{\\nabla f(\\bx)} = \\begin{pmatrix} 2x_1 + 3x_2 & 3x_1 + 4x_2 \\end{pmatrix} \\in \\R^{1 \\times 2} ."}),e.jsxs(i.p,{children:["Beachten wir das Format: ",e.jsx(n,{children:"\\nabla f"})," bildet ",e.jsx(n,{children:"\\R^2"})," nicht nach ",e.jsx(n,{children:"\\R^2"}),` ab, sondern nach
`,e.jsx(n,{children:"\\R^{1 \\times 2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Probe an einer Stelle."})," In ",e.jsx(n,{children:"\\bx = (1, 1)^\\top"})," ist ",e.jsx(n,{children:"\\cblue{f(\\bx)} = 6"}),` und
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (5, 7)"}),". Für ",e.jsx(n,{children:"\\bh = (0{,}1;\\, 0{,}1)^\\top"})," sagt ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"})]}),e.jsx(o,{children:`\\cblue{f(\\bx + \\bh)} \\approx \\cblue{6} + \\cgreen{5 \\cdot 0{,}1 + 7 \\cdot 0{,}1} = 7{,}2 ,
\\qquad\\text{tatsächlich}\\qquad
\\cblue{f(1{,}1;\\, 1{,}1)} = 7{,}26 .`}),e.jsxs(i.p,{children:["Der Restterm ist ",e.jsx(n,{children:"\\cred{0{,}06}"}),". Weil ",e.jsx(n,{children:"f"}),` quadratisch ist, können wir ihn sogar exakt
angeben: Ausmultiplizieren von `,e.jsx(n,{children:"f(\\bx + \\bh)"}),` liefert
`,e.jsx(n,{children:"\\cred{h_1^2 + 3h_1h_2 + 2h_2^2}"}),", also einen Ausdruck, der quadratisch in ",e.jsx(n,{children:"\\bh"}),` ist.
Halbieren wir `,e.jsx(n,{children:"\\bh"}),", so viertelt er sich, während ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),` nur halb so groß
wird:`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:e.jsx(n,{children:"\\bh"})}),e.jsxs(i.th,{children:["Länge von ",e.jsx(n,{children:"\\bh"})]}),e.jsx(i.th,{children:"Restterm"}),e.jsx(i.th,{children:"Restterm geteilt durch die Länge"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(0{,}1;\\, 0{,}1)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}1414"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}06"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}424"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(0{,}05;\\, 0{,}05)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}0707"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}015"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}212"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(0{,}01;\\, 0{,}01)"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}0141"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}0006"})}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}042"})})]})]})]}),e.jsxs(i.p,{children:[`Die letzte Spalte geht gegen null, und das ist genau die Aussage
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),"."]})]}),`
`,e.jsxs(me,{title:"Gradient und Höhenlinie zum Verschieben",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-der-gradient-steht-senkrecht-auf-der",children:"Bemerkung 10.2.5"}),` behauptet etwas Geometrisches über einen Vektor aus lauter partiellen
Ableitungen: Er steht senkrecht auf der Höhenlinie. Das lässt sich nachsehen, statt es zu
glauben.`]}),e.jsx(Jt,{}),e.jsxs(i.p,{children:[`Zwei Tafeln zeigen denselben Zustand: links die Höhenlinien mit dem orangen Gradientpfeil am
gewählten Punkt, rechts dieselbe Funktion als Fläche über der Ebene, mit der grünen
Tangentialebene aus `,e.jsx(i.a,{href:"#eq-richtungsableitung",children:"(10.2.2)"})," und demselben Gradientpfeil auf dem Boden."]}),e.jsxs(i.p,{children:[`Im Widget steht der orange Pfeil an jeder Stelle senkrecht auf der blau gestrichelten
Tangente an die Höhenlinie, und er wird lang, wo die Höhenlinien dicht liegen.
Der zweite Knopf schaltet auf eine nicht quadratische Funktion um, deren Höhenlinien sich
krümmen; die Aussage gilt dort unverändert, weil sie punktweise formuliert ist. Im Nullpunkt
der quadratischen Funktion verschwindet der Gradient ganz, und dann zeichnet sich gar keine
Richtung mehr aus: Das ist die Stelle, an der die Höhenlinie zum Niveau `,e.jsx(n,{children:"0"}),` aus zwei sich
kreuzenden Geraden besteht.`]})]}),`
`,e.jsxs(i.p,{children:["Damit bleibt die zweite Behauptung, die von ",e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`: keine Richtung steigt steiler an
als der Gradient. Und gleich die Anschlussfrage: Wie viel vom maximalen Anstieg bleibt
übrig, wenn wir schräg dazu laufen?`]}),`
`,e.jsxs(me,{title:"Der Kompass der Richtungen",children:[e.jsxs(i.p,{children:["Der Kompass zeigt für jede Richtung ",e.jsx(n,{children:"\\bd"}),", wie stark ",e.jsx(n,{children:"f"}),` in diese Richtung ansteigt: Der
Abstand der blauen Kurve vom Mittelpunkt ist `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bd"}),`, gemessen am
Maximum. Rechts steht der Schnitt von `,e.jsx(n,{children:"f"})," entlang des Strahls ",e.jsx(n,{children:"\\bx + t\\bd"}),` samt der linearen
Näherung aus `,e.jsx(i.a,{href:"#eq-richtungsableitung",children:"(10.2.2)"}),"."]}),e.jsx(Ut,{}),e.jsxs(i.p,{children:[`Die blaue Kurve ist ein Kreis, der den Mittelpunkt berührt, also genau der Graph von
`,e.jsx(n,{children:"\\theta \\mapsto \\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2\\cos\\theta"}),` in Polarkoordinaten. Ihr
weitester Punkt liegt in Gradientenrichtung, dort erreicht die Richtungsableitung ihr
Maximum `,e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx)}\\right\\|_2"})," (",e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`);
senkrecht dazu, also längs der Höhenlinie, ist sie null. Dazwischen zählt allein der Kosinus
des eingeschlossenen Winkels: `,e.jsx(n,{children:"60^\\circ"})," neben dem Gradienten bleiben noch ",e.jsx(n,{children:"50\\,\\%"})," übrig."]})]}),`
`,e.jsx(i.h3,{children:"Zwei Gradienten zum Auswendiglernen"}),`
`,e.jsxs(i.p,{children:[`Zwei Funktionen tauchen in der Statistik so oft auf, dass sich ihre Gradienten einzuprägen
lohnt: die lineare Funktion und die `,e.jsx(v,{id:"quadratic-form",children:"quadratische Form"}),"."]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.2.7 (Gradient einer linearen Funktion)",id:"env-gradient-einer-linearen-funktion",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\ba, \\bx \\in \\R^n"})," und ",e.jsx(n,{children:"f(\\bx) = \\ba^\\top\\bx"}),". Was ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}"}),`?
Bevor wir weiterlesen, lohnt sich der eigene Versuch.`]}),e.jsxs("details",{className:"mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium",children:"Lösung anzeigen"}),e.jsxs("div",{className:"space-y-2 pt-2",children:[e.jsxs(i.p,{children:["Ausgeschrieben ist ",e.jsx(n,{children:"f(\\bx) = \\sumin a_i x_i"}),". In dieser Summe kommt ",e.jsx(n,{children:"x_k"}),` in genau einem
Summanden vor, nämlich in `,e.jsx(n,{children:"a_k x_k"}),", und dort linear. Also"]}),e.jsx(o,{children:`\\frac{\\partial f(\\bx)}{\\partial x_k} = a_k
\\qquad\\text{und damit}\\qquad
\\corange{\\nabla f(\\bx)} = (a_1, \\dots, a_n) = \\corange{\\ba^\\top} .`}),e.jsxs(i.p,{children:["Der Gradient hängt hier nicht von ",e.jsx(n,{children:"\\bx"})," ab. Das muss so sein: ",e.jsx(n,{children:"f"}),` ist selbst schon linear,
die lineare Approximation ist also `,e.jsx(n,{children:"f"})," selbst, und der Restterm in ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"}),` ist exakt
null.`]})]})]})]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.2.8 (Gradient der quadratischen Form)",id:"env-gradient-der-quadratischen-form",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"})," ",e.jsx(v,{id:"symmetric-matrix",children:"symmetrisch"}),` und
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," mit ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bA\\bx"}),". Dann gilt"]}),e.jsx(T,{tag:"10.2.3",id:"eq-gradient-der-quadratischen-form",children:"\\corange{\\nabla f(\\bx)} = 2\\bx^\\top\\bA ."})]}),`
`,e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["der ",e.jsx(n,{children:"i"}),"-te Eintrag von ",e.jsx(n,{children:"\\bA\\bx"})," ist ",e.jsx(n,{children:"\\sum_j a_{ij}x_j"}),", und ",e.jsx(n,{children:"\\bx^\\top(\\bA\\bx)"})," summiert diese Einträge mit den Gewichten ",e.jsx(n,{children:"x_i"})]}),children:[e.jsx(i.p,{children:"Wir schreiben die quadratische Form als Doppelsumme aus:"}),e.jsx(o,{children:"f(\\bx) = \\sumin \\sumjn x_i\\, a_{ij}\\, x_j ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["der Summand mit ",e.jsx(n,{children:"i = j = k"})," enthält ",e.jsx(n,{children:"x_k"})," zweimal; die Produktregel gibt dort ",e.jsx(n,{children:"2a_{kk}x_k"}),", also je einen Beitrag ",e.jsx(n,{children:"a_{kk}x_k"})," an beide Summen"]}),children:[e.jsxs(i.p,{children:["Jetzt leiten wir nach ",e.jsx(n,{children:"x_k"})," ab. Die Variable ",e.jsx(n,{children:"x_k"}),` kommt in zwei Sorten von Summanden vor:
einmal als linker Faktor (`,e.jsx(n,{children:"i = k"}),"), einmal als rechter (",e.jsx(n,{children:"j = k"}),"). Die Produktregel liefert"]}),e.jsx(o,{children:"\\frac{\\partial f(\\bx)}{\\partial x_k} = \\sumin x_i\\, a_{ik} + \\sumjn a_{kj}\\, x_j ."})]}),e.jsxs(G,{why:e.jsx(e.Fragment,{children:"die zweite Summe ist bis auf den Namen des Laufindex die erste"}),children:[e.jsxs(i.p,{children:["Erst hier geht die Symmetrie ein. Aus ",e.jsx(n,{children:"a_{ik} = a_{ki}"}),` folgt, dass beide Summen dasselbe
sind:`]}),e.jsx(o,{children:`\\frac{\\partial f(\\bx)}{\\partial x_k} = \\sumin a_{ki}\\, x_i + \\sumjn a_{kj}\\, x_j
= 2 \\sumin a_{ki}\\, x_i = 2\\,(\\bA\\bx)_k .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"(\\bA\\bx)^\\top = \\bx^\\top\\bA^\\top"}),", und noch einmal ",e.jsx(n,{children:"\\bA^\\top = \\bA"})]}),children:[e.jsxs(i.p,{children:["Der Gradient sammelt diese ",e.jsx(n,{children:"n"})," Zahlen als Zeile ein, also"]}),e.jsx(o,{children:"\\corange{\\nabla f(\\bx)} = 2\\,(\\bA\\bx)^\\top = 2\\,\\bx^\\top\\bA^\\top = 2\\,\\bx^\\top\\bA ."})]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.2.9 (Drei Nachträge zu Satz 10.2.8)",id:"env-drei-nachtraege-zu-satz-10-2-8",children:[e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Der Spezialfall ",e.jsx(n,{children:"\\bA = \\bI"}),"."]})," Dann ist ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bx = \\left\\|\\bx\\right\\|_2^2"}),` und
`,e.jsx(i.a,{href:"#eq-gradient-der-quadratischen-form",children:"(10.2.3)"})," wird zu ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = 2\\bx^\\top"}),`. Das ist die mehrdimensionale
Fassung von `,e.jsx(n,{children:"(x^2)' = 2x"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Ohne Symmetrie stimmt die Formel nicht."}),` Schritt 3 des Beweises braucht
`,e.jsx(n,{children:"a_{ik} = a_{ki}"}),". Allgemein liefern die ersten beiden Schritte"]}),e.jsx(o,{children:"\\corange{\\nabla (\\bx^\\top\\bA\\bx)} = \\bx^\\top\\bigl(\\bA + \\bA^\\top\\bigr) ,"}),e.jsxs(i.p,{children:["was für symmetrisches ",e.jsx(n,{children:"\\bA"})," wieder ",e.jsx(i.a,{href:"#eq-gradient-der-quadratischen-form",children:"(10.2.3)"}),` ergibt. Ein Gegenbeispiel ist
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` mit
`,e.jsx(n,{children:"f(\\bx) = x_1x_2"}),": Hier ist ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = (x_2, x_1)"}),`, während
`,e.jsx(n,{children:"2\\bx^\\top\\bA = (0, 2x_1)"})," etwas ganz anderes ist. In ",e.jsx(n,{children:"\\bx = (1,1)^\\top"})," steht ",e.jsx(n,{children:"(1,1)"}),` gegen
`,e.jsx(n,{children:"(0,2)"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:[e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-funktion",children:"Beispiel 10.2.6"})," ist ein Sonderfall."]}),` Mit
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 1 & 3/2 \\\\ 3/2 & 2 \\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"\\bx^\\top\\bA\\bx = x_1^2 + 3x_1x_2 + 2x_2^2"}),", und ",e.jsx(i.a,{href:"#eq-gradient-der-quadratischen-form",children:"(10.2.3)"})," gibt"]}),e.jsx(o,{children:"2\\bx^\\top\\bA = \\begin{pmatrix} 2x_1 + 3x_2 & 3x_1 + 4x_2 \\end{pmatrix} ,"}),e.jsxs(i.p,{children:[`also genau den Gradienten, den wir dort partiell ausgerechnet haben. Diese Matrix ist
allerdings `,e.jsx(i.em,{children:"nicht"})," ",e.jsx(v,{id:"positive-definite",children:"positiv definit"}),`, denn ihre Determinante ist
`,e.jsx(n,{children:"1 \\cdot 2 - (3/2)^2 = -1/4 < 0"}),`. Die Matrix der zweiten partiellen Ableitungen, die
`,e.jsx(v,{id:"hessian-matrix",children:"Hesse-Matrix"})," ",e.jsx(n,{children:`2\\bA = \\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 3 & 4
\\end{smallmatrix}\\bigr)`}),", hat entsprechend die Determinante ",e.jsx(n,{children:"-1"}),` und die Eigenwerte
`,e.jsx(n,{children:"3 \\pm \\sqrt{10}"}),", also ",e.jsx(n,{children:"6{,}162"})," und ",e.jsx(n,{children:"-0{,}162"}),". Im Nullpunkt hat ",e.jsx(n,{children:"f"}),` deshalb kein Minimum,
sondern einen Sattel: In der einen Eigenrichtung steigt `,e.jsx(n,{children:"f"}),`, in der anderen fällt es. Im
Widget oben kreuzen sich dort die beiden Geraden zum Niveau `,e.jsx(n,{children:"0"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Gradientenabstieg"}),`
`,e.jsxs(i.p,{children:[`Warum interessieren wir uns überhaupt für die Richtung des stärksten Anstiegs? Weil das
Standardwerkzeug der `,e.jsx(v,{id:"optimization",children:"Optimierung"}),` in hohen Dimensionen genau darauf beruht.
Gesucht sind Parameter `,e.jsx(n,{children:"\\btheta \\in \\R^p"}),", die eine Verlustfunktion ",e.jsx(n,{children:"L(\\btheta)"}),` klein
machen, etwa den mittleren quadratischen Fehler eines Modells. Für `,e.jsx(n,{children:"p"}),` in der Größenordnung
von Millionen ist an eine geschlossene Lösung nicht zu denken, wohl aber an kleine Schritte
bergab.`]}),`
`,e.jsxs(q,{kind:"Algorithmus",label:"10.2.10 (Gradientenabstieg)",id:"env-gradient-gradientenabstieg",children:[e.jsxs(i.p,{children:["Gegeben eine differenzierbare Verlustfunktion ",e.jsx(n,{children:"L\\colon \\R^p \\to \\R"}),`, ein Startwert
`,e.jsx(n,{children:"\\btheta^{(0)}"})," und eine Lernrate ",e.jsx(n,{children:"\\alpha > 0"}),". Für ",e.jsx(n,{children:"t = 0, 1, 2, \\dots"})," iteriere"]}),e.jsx(T,{tag:"10.2.4",id:"eq-gradient-gradientenabstieg",children:"\\btheta^{(t+1)} = \\btheta^{(t)} - \\alpha\\, \\corange{\\nabla L\\bigl(\\btheta^{(t)}\\bigr)^\\top} ."}),e.jsxs(i.p,{children:["Abgebrochen wird, wenn sich ",e.jsx(n,{children:"\\btheta"})," kaum noch ändert oder der Gradient klein genug ist."]})]}),`
`,e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"})," zeigt ",e.jsx(n,{children:"-\\corange{\\nabla L(\\btheta)^\\top}"}),` in die Richtung des stärksten
Abstiegs. Der Algorithmus läuft also in jedem Schritt in die aktuell steilste Richtung
bergab, und zwar um die Länge `,e.jsx(n,{children:"\\alpha\\left\\|\\corange{\\nabla L(\\btheta^{(t)})}\\right\\|"}),`.
Dass er damit tatsächlich am Ziel ankommt, hängt an `,e.jsx(n,{children:"\\alpha"})," und an der Gestalt von ",e.jsx(n,{children:"L"}),`; das
`,e.jsx(v,{id:"gradient-descent",children:"Gradientenverfahren"}),` und seine Varianten sind die Grundlage für das
Training `,e.jsx(v,{id:"neural-network",children:"neuronaler Netze"})," und für komplexe Regressionsmodelle."]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.2.11 (Warum in Gleichung 10.2.4 ein Transponiertes steht)",id:"env-warum-in-gleichung-10-2-4-ein",children:e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"^\\top"})," in ",e.jsx(i.a,{href:"#eq-gradient-gradientenabstieg",children:"(10.2.4)"}),` ist keine Kosmetik, sondern eine Formatfrage. Die Parameter
`,e.jsx(n,{children:"\\btheta^{(t)}"})," bilden einen Spaltenvektor in ",e.jsx(n,{children:"\\R^p"}),`, der Gradient
`,e.jsx(n,{children:"\\corange{\\nabla L(\\btheta^{(t)})}"})," nach ",e.jsx(i.a,{href:"#env-gradient",children:"Definition 10.2.1"}),` dagegen eine Zeile in
`,e.jsx(n,{children:"\\R^{1 \\times p}"}),`. Eine Zeile von einer Spalte abzuziehen ist nicht definiert. Erst
`,e.jsx(n,{children:"\\corange{\\nabla L(\\btheta^{(t)})^\\top} \\in \\R^p"}),` passt zum Rest der Gleichung. Wer den
Gradienten von vornherein als Spalte definiert, spart hier das `,e.jsx(n,{children:"^\\top"}),` und handelt es sich
dafür in der Kettenregel wieder ein (`,e.jsx(i.a,{href:"#env-zeilenvektor-nicht-spaltenvektor",children:"Bemerkung 10.2.2"}),")."]})}),`
`,e.jsxs(i.p,{children:["Die Lernrate ",e.jsx(n,{children:"\\alpha"}),` ist der einzige freie Parameter des Verfahrens. Gibt es eine beste
Wahl, und woran erkennt man sie?`]}),`
`,e.jsxs(me,{title:"Gradientenabstieg auf einer konvexen quadratischen Funktion",children:[e.jsxs(i.p,{children:["Zum Ausprobieren nehmen wir nicht die Funktion aus ",e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-funktion",children:"Beispiel 10.2.6"}),`, denn deren Sattel wäre
für ein Abstiegsverfahren eine Falle. Stattdessen minimieren wir
`,e.jsx(n,{children:"L(\\btheta) = \\tfrac{1}{2}\\btheta^\\top\\bA\\btheta"}),` mit der symmetrischen und positiv
definiten Matrix
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 1 & 3 \\end{smallmatrix}\\bigr)"}),`, deren Eigenwerte
`,e.jsx(n,{children:"(5 \\pm \\sqrt{5})/2"})," beide positiv sind. Nach ",e.jsx(i.a,{href:"#env-gradient-der-quadratischen-form",children:"Satz 10.2.8"}),` und der Linearität des Ableitens
ist `,e.jsx(n,{children:"\\corange{\\nabla L(\\btheta)} = \\btheta^\\top\\bA"}),", der Schritt also ",e.jsx(n,{children:"-\\alpha\\bA\\btheta"}),"."]}),e.jsx(es,{}),e.jsxs(i.p,{children:[`Über den Erfolg entscheidet allein die Rate
`,e.jsx(n,{children:"\\rho(\\alpha) = \\max_i \\left|1 - \\alpha\\lambda_i\\right|"}),`: Die Lernrate ist durch das
Verhältnis der Eigenwerte begrenzt, und die beste Wahl ist die, bei der beide
Eigenrichtungen gleich schnell schrumpfen, hier `,e.jsx(n,{children:"\\alpha = 0{,}4"}),`. Zu kleine Lernraten
kriechen, zu große lassen die Iterierten davonlaufen. Wie eng dieser Spielraum ist, hängt an
der Hesse-Matrix; `,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"})," führt das aus, und ",e.jsx(i.a,{href:"?k=12-optim",children:"Kapitel 12"}),` nimmt die
Konvergenzanalyse als eigenes Thema auf. Für die Funktion aus
`,e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-funktion",children:"Beispiel 10.2.6"}),` gäbe es dagegen gar kein brauchbares
`,e.jsx(n,{children:"\\alpha"}),": Ihre Hesse-Matrix hat den negativen Eigenwert ",e.jsx(n,{children:"-0{,}162"}),`, und entlang dieser
Eigenrichtung wächst der Abstand zum Sattel bei jeder Lernrate.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar, so ist ",e.jsx(n,{children:"\\nabla f(\\bx)"}),` ein Zeilenvektor
in `,e.jsx(n,{children:"\\R^{1 \\times n}"}),", und ",e.jsx(n,{children:"\\bh \\mapsto \\nabla f(\\bx)\\bh"})," ist die Fréchet-Ableitung von ",e.jsx(n,{children:"f"}),`
in `,e.jsx(n,{children:"\\bx"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-gradient",children:"Definition 10.2.1"})," zusammen mit ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"}),". Das Produkt aus einer ",e.jsx(n,{children:"1 \\times n"}),`-Zeile
und einer `,e.jsx(n,{children:"n \\times 1"}),"-Spalte ist eine Zahl, und die Abbildung ist linear in ",e.jsx(n,{children:"\\bh"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\ba^\\top\\bx"})," hängt der Gradient von der Stelle ",e.jsx(n,{children:"\\bx"})," ab."]}),e.jsxs(i.p,{children:["Er ist konstant gleich ",e.jsx(n,{children:"\\ba^\\top"})," (",e.jsx(i.a,{href:"#env-gradient-einer-linearen-funktion",children:"Beispiel 10.2.7"}),"). Das ist kein Zufall: ",e.jsx(n,{children:"f"}),` ist selbst
linear, also ist die beste lineare Näherung `,e.jsx(n,{children:"f"})," selbst, und der Restterm in ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"}),`
verschwindet exakt.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für jede Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"})," gilt ",e.jsx(n,{children:"\\nabla\\bigl(\\bx^\\top\\bA\\bx\\bigr) = 2\\bx^\\top\\bA"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-gradient-der-quadratischen-form",children:"Satz 10.2.8"}),` verlangt Symmetrie, und die wird im dritten Beweisschritt gebraucht. Allgemein
gilt `,e.jsx(n,{children:"\\nabla(\\bx^\\top\\bA\\bx) = \\bx^\\top(\\bA + \\bA^\\top)"}),`. Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"f(\\bx) = x_1x_2"})," mit ",e.jsx(n,{children:"\\nabla f(\\bx) = (x_2, x_1)"}),", während ",e.jsx(n,{children:"2\\bx^\\top\\bA = (0, 2x_1)"}),` ist.
In `,e.jsx(n,{children:"\\bx = (1,1)^\\top"})," steht ",e.jsx(n,{children:"(1,1)"})," gegen ",e.jsx(n,{children:"(0,2)"}),"."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\nabla f(\\bx) \\neq \\bnull"}),". Unter allen Richtungen ",e.jsx(n,{children:"\\bd"}),` mit
`,e.jsx(n,{children:"\\left\\|\\bd\\right\\|_2 = 1"})," ist die Richtungsableitung ",e.jsx(n,{children:"\\nabla f(\\bx)\\bd"}),` genau dann maximal,
wenn `,e.jsx(n,{children:"\\bd"})," in Richtung ",e.jsx(n,{children:"\\nabla f(\\bx)^\\top"}),` zeigt, und ihr Maximalwert ist
`,e.jsx(n,{children:"\\left\\|\\nabla f(\\bx)\\right\\|_2"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`, bewiesen mit dem Gleichheitsfall der Cauchy-Schwarz-Ungleichung. Ohne
die Voraussetzung `,e.jsx(n,{children:"\\nabla f(\\bx) \\neq \\bnull"}),` wäre nichts zu holen: Dann sind alle
Richtungsableitungen null, und keine Richtung zeichnet sich aus.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"^\\top"})," im Update ",e.jsx(n,{children:"\\btheta - \\alpha \\nabla L(\\btheta)^\\top"}),` ist reine Schreibweise und
darf weggelassen werden.`]}),e.jsxs(i.p,{children:["Ohne das ",e.jsx(n,{children:"^\\top"})," passen die Formate nicht: ",e.jsx(n,{children:"\\btheta"})," ist eine Spalte in ",e.jsx(n,{children:"\\R^p"}),`, der Gradient
eine Zeile in `,e.jsx(n,{children:"\\R^{1 \\times p}"}),`, und die Differenz wäre nicht definiert
(`,e.jsx(i.a,{href:"#env-warum-in-gleichung-10-2-4-ein",children:"Bemerkung 10.2.11"}),")."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Verschwindet der Gradient in einem Punkt, so liegt dort ein Minimum von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Ein verschwindender Gradient sagt nur, dass die lineare Näherung flach ist. Für
`,e.jsx(n,{children:"f(\\bx) = x_1^2 + 3x_1x_2 + 2x_2^2"})," aus ",e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-funktion",children:"Beispiel 10.2.6"})," ist ",e.jsx(n,{children:"\\nabla f(\\bnull) = (0,0)"}),`,
und der Nullpunkt ist ein Sattel: Die Hesse-Matrix hat die Eigenwerte `,e.jsx(n,{children:"6{,}162"}),` und
`,e.jsx(n,{children:"-0{,}162"}),", also einen positiven und einen negativen (",e.jsx(i.a,{href:"#env-drei-nachtraege-zu-satz-10-2-8",children:"Bemerkung 10.2.9"}),`). Entlang der einen
Eigenrichtung steigt `,e.jsx(n,{children:"f"}),", entlang der anderen fällt es."]})]}),e.jsxs(We,{loesung:50,toleranz:2,einheit:"Prozent",children:[e.jsxs(i.p,{children:["Im Kompass-Widget: Wir setzen ",e.jsx(n,{children:"\\bd"}),` mit dem Knopf „d 60° daneben“ und lesen im Verdikt den
Anteil am maximalen Anstieg ab. Wie viel Prozent sind es?`]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"})," ist ",e.jsx(n,{children:"\\nabla f(\\bx)\\bd = \\left\\|\\nabla f(\\bx)\\right\\|_2 \\cos\\theta"}),`, hier
also `,e.jsx(n,{children:"\\cos 60^\\circ = 0{,}5"}),", und zwar an jeder Stelle, an der der Gradient nicht verschwindet."]})]}),e.jsxs(We,{loesung:.4,toleranz:.03,children:[e.jsxs(i.p,{children:["Bei welcher Lernrate ",e.jsx(n,{children:"\\alpha"})," ist die Rate ",e.jsx(n,{children:"\\rho(\\alpha) = \\max_i\\left|1-\\alpha\\lambda_i\\right|"}),`
des Abstiegs-Widgets am kleinsten?`]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"\\alpha = 2/(\\lambda_{\\min}+\\lambda_{\\max}) = 2/5 = 0{,}4"}),`. Dort schneiden sich die
beiden Kurven `,e.jsx(n,{children:"\\left|1-\\alpha\\lambda_{\\min}\\right|"})," und ",e.jsx(n,{children:"\\left|1-\\alpha\\lambda_{\\max}\\right|"}),`,
beide Eigenrichtungen schrumpfen mit demselben Faktor `,e.jsx(n,{children:"\\sqrt5/5 \\approx 0{,}447"}),"."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.2 (partielle Ableitungen und Gradient); für den Gradientenabstieg
MML §7.1.`})})]})}function ns(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Gr,{...r})}):Gr(r)}const $r=P.grau,bn=P.blau,Vi=P.gruen,Gn=P.rot,Kn=P.orange,Dn=P.violett;function is(){const[r,i]=E.useState(3),[t,l]=E.useState(2),s=[];for(let x=1;x<=t;x++)for(let d=1;d<=r;d++)s.push(e.jsx("div",{className:"border border-slate-300 bg-white px-2 py-1 text-center dark:border-slate-600 dark:bg-slate-800",children:e.jsx(n,{children:`\\tfrac{\\partial f_{${x}}}{\\partial x_{${d}}}`})},`${x}-${d}`));const c=t===1&&r===1?"zahl":t===1?"zeile":r===1?"spalte":"matrix",h={zahl:`Zeile und Spalte schrumpfen auf ein einziges Feld: Wir sind zurück bei ${V("definition:differenzierbarkeit")}, dem Grenzwert des Differenzenquotienten.`,zeile:`Nur eine Ausgabe, also nur eine Zeile. Damit steht hier ${V("definition:gradient")}, der Gradient, als Sonderfall der Jacobimatrix.`,spalte:"Nur eine Eingabe, also nur eine Spalte. So sieht die Ableitung einer Kurve nach ihrem Parameter aus, m Steigungen übereinander.",matrix:`Beide Regler größer als eins: das volle Rechteck aus ${V("definition:jacobimatrix")}, zeilenweise gelesen m Gradienten.`};return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Stellen wir n und m ein und lesen ab, welche Gestalt das Ableitungsobjekt annimmt."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsx("div",{className:"inline-grid gap-1",style:{gridTemplateColumns:`repeat(${r}, minmax(0, auto))`},children:s})}),e.jsx(I,{label:"Eingabedimension n",value:r,onChange:x=>i(Math.round(x)),min:1,max:4,step:1,fmt:x=>x.toFixed(0)}),e.jsx(I,{label:"Ausgabedimension m",value:t,onChange:x=>l(Math.round(x)),min:1,max:4,step:1,fmt:x=>x.toFixed(0)}),e.jsxs(ve,{kind:c==="matrix"?"neutral":"ok",children:[e.jsx(n,{children:`\\boldsymbol{J}_{f}(\\boldsymbol{x}) \\in \\mathbb{R}^{${t} \\times ${r}}`}),"."," ",h[c]]})]})}const si=[{id:"trig",name:"Wellen",titel:"krumm, aber lokal fast linear",f:([r,i])=>[r+.5*Math.sin(2*i),i+.5*Math.sin(2*r)],J:([r,i])=>[[1,Math.cos(2*i)],[Math.cos(2*r),1]],tex:"f(\\boldsymbol{x}) = \\bigl(x_1 + \\tfrac12\\sin(2x_2),\\; x_2 + \\tfrac12\\sin(2x_1)\\bigr)^\\top",halb:Math.PI,x0:[1.2,.6],h:.4,linear:!1},{id:"linear",name:"linear",titel:"J ist überall dieselbe Matrix, der Restterm exakt null",f:([r,i])=>[1.5*r+.5*i,.3*r+1.2*i],J:()=>[[1.5,.5],[.3,1.2]],tex:"f(\\boldsymbol{x}) = \\boldsymbol{A}\\boldsymbol{x}, \\quad \\boldsymbol{A} = \\begin{pmatrix} 1{,}5 & 0{,}5 \\\\ 0{,}3 & 1{,}2 \\end{pmatrix}",halb:2.4,x0:[.8,.6],h:.4,linear:!0},{id:"quadrat",name:"Quadrieren",titel:`${V("beispiel:quadrieren-in-der-ebene")}: Winkel verdoppeln, Radius quadrieren`,f:([r,i])=>[r*r-i*i,2*r*i],J:([r,i])=>[[2*r,-2*i],[2*i,2*r]],tex:"f(\\boldsymbol{x}) = (x_1^2 - x_2^2,\\; 2x_1x_2)^\\top",halb:1.6,x0:[1,.5],h:.3,linear:!1},{id:"wirbel",name:"Wirbel",titel:"flächentreu: det J = 1 an jeder Stelle",f:([r,i])=>{const t=.6*Math.hypot(r,i);return[r*Math.cos(t)-i*Math.sin(t),r*Math.sin(t)+i*Math.cos(t)]},J:([r,i])=>{const t=Math.hypot(r,i);if(t<1e-9)return[[1,0],[0,1]];const l=.6*t,s=r*Math.cos(l)-i*Math.sin(l),c=r*Math.sin(l)+i*Math.cos(l),h=.6/t;return[[Math.cos(l)-h*r*c,-Math.sin(l)-h*i*c],[Math.sin(l)+h*r*s,Math.cos(l)+h*i*s]]},tex:"f(\\boldsymbol{x}) = \\boldsymbol{R}\\bigl(\\tfrac{3}{5}\\left\\|\\boldsymbol{x}\\right\\|\\bigr)\\,\\boldsymbol{x}",halb:2.6,x0:[1.2,.6],h:.4,linear:!1}],Lr=15,Vr=40,Pr=28,li=.025,rs=.8;function Hr(r,i=1.08){let t=1/0,l=-1/0,s=1/0,c=-1/0;for(const[f,j]of r)!Number.isFinite(f)||!Number.isFinite(j)||(t=Math.min(t,f),l=Math.max(l,f),s=Math.min(s,j),c=Math.max(c,j));if(!Number.isFinite(t))return{x0:-1,x1:1,y0:-1,y1:1};const h=(t+l)/2,x=(s+c)/2,d=Math.max((l-t)/2,(c-s)/2,1e-6)*i;return{x0:h-d,x1:h+d,y0:x-d,y1:x+d}}const sn=28,Kr=16,Tr=8,vn=14;function Pi({id:r,titel:i,size:t,fenster:l,ariaLabel:s,griff:c,children:h}){var M,F;const{x0:x,x1:d,y0:f,y1:j}=l,D=_=>sn+(_-x)/(d-x)*t,a=_=>vn+t-(_-f)/(j-f)*t,A=Be(x,d,4),z=Be(f,j,4),p=A.length>1?Math.abs(A[1]-A[0]):void 0,R=z.length>1?Math.abs(z[1]-z[0]):void 0;return e.jsx("div",{className:"min-w-0 grow basis-56",children:e.jsxs("svg",{viewBox:`0 0 ${sn+t+Tr} ${vn+t+Kr}`,width:sn+t+Tr,height:vn+t+Kr,className:"h-auto max-w-full select-none rounded",role:"img","aria-label":s,...(c==null?void 0:c.svgProps)??{},...(c==null?void 0:c.surfaceProps)??{},style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)",...((M=c==null?void 0:c.svgProps)==null?void 0:M.style)??{},...((F=c==null?void 0:c.surfaceProps)==null?void 0:F.style)??{}},children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:`${r}-clip`,children:e.jsx("rect",{x:sn,y:vn,width:t,height:t})}),e.jsx("marker",{id:`${r}-spitze`,markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Kn})})]}),e.jsx("text",{x:sn,y:10,fontSize:10,fill:"var(--w-text, #334155)",children:i}),z.map(_=>e.jsxs("g",{children:[e.jsx("line",{x1:sn,x2:sn+t,y1:a(_),y2:a(_),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:.7}),e.jsx("text",{x:sn-4,y:a(_)+3,textAnchor:"end",fill:"var(--w-muted, #64748b)",fontSize:9,children:De(_,R)})]},`y${_}`)),A.map(_=>e.jsxs("g",{children:[e.jsx("line",{y1:vn,y2:vn+t,x1:D(_),x2:D(_),stroke:"var(--w-grid, #e2e8f0)",strokeWidth:.7}),e.jsx("text",{x:D(_),y:vn+t+12,textAnchor:"middle",fill:"var(--w-muted, #64748b)",fontSize:9,children:De(_,p)})]},`x${_}`)),e.jsx("g",{clipPath:`url(#${r}-clip)`,children:h(D,a)})]})})}const On=(r,i,t)=>r.map(([l,s])=>`${i(l).toFixed(1)},${t(s).toFixed(1)}`).join(" ");function ts(r,i,t){const{f:l,J:s}=r,c=s(i),h=l(i),x=c[0][0]*c[1][1]-c[0][1]*c[1][0],d=g=>[h[0]+c[0][0]*g[0]+c[0][1]*g[1],h[1]+c[1][0]*g[0]+c[1][1]*g[1]],f=[],j=[],D=r.halb;for(let g=0;g<Lr;g++){const m=-D+2*D*g/(Lr-1),b=[],N=[],S=[],w=[];for(let B=0;B<Vr;B++){const k=-D+2*D*B/(Vr-1);b.push([k,m]),N.push([m,k]),S.push(l([k,m])),w.push(l([m,k]))}f.push(b,N),j.push(S,w)}const a=[[-t,-t],[t,-t],[t,t],[-t,t]],A=[],z=[],p=[];for(let g=0;g<4;g++){const[m,b]=a[g],[N,S]=a[(g+1)%4];for(let w=0;w<Pr;w++){const B=w/Pr,k=[m+B*(N-m),b+B*(S-b)];A.push([i[0]+k[0],i[1]+k[1]]),z.push(l([i[0]+k[0],i[1]+k[1]])),p.push(d(k))}}const R=a.map(g=>{const m=l([i[0]+g[0],i[1]+g[1]]),b=d(g);return{echt:m,naeh:b,d:Math.hypot(m[0]-b[0],m[1]-b[1])}}),M=Math.max(...R.map(g=>g.d));let F=0;for(let g=0;g<z.length;g++){const[m,b]=z[g],[N,S]=z[(g+1)%z.length];F+=m*S-N*b}F=Math.abs(F)/2;const _=4*t*t,y=Math.max(...a.map(g=>{const m=[g[0]/2,g[1]/2],b=l([i[0]+m[0],i[1]+m[1]]),N=d(m);return Math.hypot(b[0]-N[0],b[1]-N[1])}));return{Jm:c,fx0:h,det:x,urbildGitter:f,bildGitter:j,rand:A,randBild:z,randLin:p,eckenPaare:R,maxRest:M,halbRest:y,flaeche:F,quadrat:_}}function ss({aufgeloest:r}){const[i,t]=E.useState(0),l=si[i],[s,c]=E.useState(l.x0),[h,x]=E.useState(l.h),d=m=>{t(m),c(si[m].x0),x(si[m].h)},f=l.halb,j=f-li,D=qn({feld:{x0:sn,y0:vn,w:210,h:210},welt:{x0:-f,x1:f,y0:-f,y1:f},clamp:([m,b])=>[Ue(m,-j,j),Ue(b,-j,j)],snap:.05,onDrag:m=>c(m)}),a=E.useMemo(()=>ts(l,s,h),[l,s,h]),A={x0:-f,x1:f,y0:-f,y1:f},z=E.useMemo(()=>Hr(a.bildGitter.flat()),[a.bildGitter]),p=E.useMemo(()=>Hr([...a.randBild,...a.randLin],1.25),[a.randBild,a.randLin]),R=a.quadrat>0?a.flaeche/a.quadrat:NaN,M=h*Math.SQRT2,F=a.maxRest/(M*M),_=a.halbRest>1e-14?a.maxRest/a.halbRest:NaN,y=(m,b,N,S,w)=>m.map((B,k)=>e.jsx("polyline",{points:On(B,N,S),fill:"none",stroke:b,strokeWidth:.7,opacity:.55},`${w}${k}`)),g=(m,b,N,S)=>{const w=[a.fx0[0]+h*a.Jm[0][m],a.fx0[1]+h*a.Jm[1][m]];return e.jsxs("g",{children:[e.jsx("line",{x1:b(a.fx0[0]),y1:N(a.fx0[1]),x2:b(w[0]),y2:N(w[1]),stroke:Kn,strokeWidth:2,markerEnd:`url(#${S}-spitze)`}),e.jsx("text",{x:b(w[0])+5,y:N(w[1])-4,fill:Kn,fontSize:10,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:m===0?"h·Je₁":"h·Je₂"})]},`sp${m}`)};return e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:si.map((m,b)=>e.jsx("button",{type:"button",title:m.titel,"aria-pressed":b===i,className:b===i?pe:ie,onClick:()=>d(b),children:m.name},m.id))}),e.jsx("p",{className:"text-sm",children:e.jsx(n,{children:l.tex})}),e.jsx(we,{children:"Ziehen wir das violette Fenster über die Ebene und verkleinern es mit dem h-Regler."}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(Pi,{id:"s103-urbild",titel:"Urbild: Gitter und Fenster um x₀",size:210,fenster:A,ariaLabel:`Regelmäßiges Gitter über dem Definitionsbereich mit einem quadratischen Fenster der halben Kantenlänge ${u(h)} um den Punkt x₀ = (${u(s[0])}; ${u(s[1])}).`,griff:{svgProps:D.svgProps,surfaceProps:D.surfaceProps("x0")},children:(m,b)=>e.jsxs(e.Fragment,{children:[y(a.urbildGitter,$r,m,b,"u"),e.jsx("polygon",{points:On(a.rand,m,b),fill:Dn,fillOpacity:.12,stroke:Dn,strokeWidth:1.8}),e.jsx("circle",{cx:m(s[0]),cy:b(s[1]),r:3.5,fill:Dn}),e.jsx("text",{x:m(s[0])+6,y:b(s[1])-6,fill:Dn,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"x₀"})]})}),e.jsx(Pi,{id:"s103-bild",titel:"Bild: f(Gitter) und f(Fenster)",size:210,fenster:z,ariaLabel:"Dasselbe Gitter nach Anwendung von f: die Linien sind verbogen, das Bild des Fensters ist blau hervorgehoben.",children:(m,b)=>e.jsxs(e.Fragment,{children:[y(a.bildGitter,bn,m,b,"b"),e.jsx("polygon",{points:On(a.randBild,m,b),fill:bn,fillOpacity:.16,stroke:bn,strokeWidth:1.8}),e.jsx("circle",{cx:m(a.fx0[0]),cy:b(a.fx0[1]),r:3.5,fill:bn}),e.jsx("text",{x:m(a.fx0[0])+6,y:b(a.fx0[1])-6,fill:bn,fontSize:11,stroke:"var(--w-bg, #ffffff)",strokeWidth:2.5,paintOrder:"stroke",children:"f(x₀)"})]})}),e.jsx(Pi,{id:"s103-lupe",titel:"Lupe: Bild gegen Parallelogramm",size:186,fenster:p,ariaLabel:`Vergrößerter Ausschnitt um f(x₀): das krumme Bild des Fensters und das Parallelogramm der Linearisierung, deren größter Abstand ${u(a.maxRest,4)} beträgt.`,children:(m,b)=>e.jsxs(e.Fragment,{children:[e.jsx("polygon",{points:On(a.randLin,m,b),fill:Vi,fillOpacity:.12,stroke:Vi,strokeWidth:2}),e.jsx("polygon",{points:On(a.randBild,m,b),fill:"none",stroke:bn,strokeWidth:2}),a.eckenPaare.map((N,S)=>e.jsx("line",{x1:m(N.naeh[0]),y1:b(N.naeh[1]),x2:m(N.echt[0]),y2:b(N.echt[1]),stroke:Gn,strokeWidth:2.4},`r${S}`)),g(0,m,b,"s103-lupe"),g(1,m,b,"s103-lupe"),e.jsx("circle",{cx:m(a.fx0[0]),cy:b(a.fx0[1]),r:3,fill:bn})]})})]}),e.jsxs("div",{className:`flex flex-wrap gap-x-5 gap-y-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:$r},children:"▬ Urbildgitter"}),e.jsx("span",{style:{color:Dn},children:"▬ Fenster um x₀"}),e.jsx("span",{style:{color:bn},children:"▬ Bild unter f"}),e.jsx("span",{style:{color:Vi},children:"▬ Linearisierung f(x₀) + J h"}),e.jsx("span",{style:{color:Gn},children:"▬ Restterm r(h)"}),e.jsx("span",{style:{color:Kn},children:"▬ Spalten von J"})]}),e.jsx(I,{label:"x₀ Komponente 1",value:s[0],onChange:m=>c([Math.round(m*20)/20,s[1]]),min:-j,max:j,step:.05,accent:Dn,fmt:m=>u(m)}),e.jsx(I,{label:"x₀ Komponente 2",value:s[1],onChange:m=>c([s[0],Math.round(m*20)/20]),min:-j,max:j,step:.05,accent:Dn,fmt:m=>u(m)}),e.jsx(I,{label:"halbe Kante h",value:h,onChange:m=>x(Math.round(m*1e3)/1e3),min:li,max:rs,step:.005,accent:Gn,fmt:m=>u(m,3)}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("button",{type:"button",className:ie,disabled:h<=li+1e-9,onClick:()=>x(Math.max(li,Math.round(h/2*1e3)/1e3)),children:"h halbieren"}),e.jsx("button",{type:"button",className:ie,onClick:()=>d(i),children:"zurücksetzen"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsx(n,{children:`\\boldsymbol{J}_f(\\boldsymbol{x}_0) = \\begin{pmatrix} ${u(a.Jm[0][0],3)} & ${u(a.Jm[0][1],3)} \\\\ ${u(a.Jm[1][0],3)} & ${u(a.Jm[1][1],3)} \\end{pmatrix}, \\quad \\det \\boldsymbol{J}_f(\\boldsymbol{x}_0) = ${u(a.det,3)}`})}),e.jsx(ve,{kind:l.linear||F<1e-9?"ok":"neutral",children:l.linear?e.jsxs(e.Fragment,{children:["Die Abbildung ist linear, also ist sie ihre eigene Linearisierung: Der Restterm bleibt bei jedem h exakt null (angezeigt"," ",e.jsx("span",{className:"font-mono",style:{color:Gn},children:u(a.maxRest,6)}),", das ist Maschinenrauschen), blaues Bild und grünes Parallelogramm liegen übereinander, und das Flächenverhältnis ist"," ",e.jsx("span",{className:"font-mono",children:u(R,4)})," ="," ",e.jsxs("span",{className:"font-mono",style:{color:Kn},children:["|det J| = ",u(Math.abs(a.det),4)]})," ",", nicht nur im Grenzwert, sondern exakt. Genau das sagt ",V("korollar:lineare-abbildungen-sind-ihre-eigene"),"."]}):e.jsxs(e.Fragment,{children:["Größter Abstand zwischen Bild und Parallelogramm in den vier Ecken:"," ",e.jsxs("span",{className:"font-mono",style:{color:Gn},children:["‖r(h)‖ = ",u(a.maxRest,5)]})," ","bei ",e.jsxs("span",{className:"font-mono",children:["‖h‖ = ",u(M,3)]}),", also"," ",e.jsxs("span",{className:"font-mono",style:{color:Gn},children:["‖r(h)‖/‖h‖² = ",u(F,3)]}),". Der Quotient bleibt beim Verkleinern von h beschränkt; (",dn("eq:eq-10-3-1"),") verlangt nur, dass ‖r(h)‖/‖h‖ verschwindet, und das ist hier"," ",e.jsx("span",{className:"font-mono",children:u(a.maxRest/M,4)}),". Das Bild des Fensters hat die Fläche ",e.jsx("span",{className:"font-mono",children:u(a.flaeche,4)}),", das Fenster selbst ",e.jsx("span",{className:"font-mono",children:u(a.quadrat,4)}),"; ihr Verhältnis ",e.jsx("span",{className:"font-mono",children:u(R,4)})," läuft für kleines h gegen"," ",e.jsxs("span",{className:"font-mono",style:{color:Kn},children:["|det J| = ",u(Math.abs(a.det),4)]})," ","(",V("bemerkung:wie-stark-die-flaeche-verzerrt-wird"),").",l.id==="wirbel"&&e.jsxs(e.Fragment,{children:[" ","Hier ist det J überall genau 1: Der Wirbel verschiebt Fläche, ohne sie zu verändern."]})]})}),r&&e.jsxs("p",{className:`text-xs ${Y}`,children:["Zum Vergleichen: bei halber Kante wäre ‖r(h/2)‖ ="," ",e.jsx("span",{className:"font-mono",children:u(a.halbRest,6)}),Number.isFinite(_)&&e.jsxs(e.Fragment,{children:[", das ist der Faktor ",e.jsx("span",{className:"font-mono",children:u(_,2)})]}),"."]})]})}function ls(){return e.jsx(Ce,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Wir halbieren gleich die Kantenlänge des Fensters. Um welchen Faktor schrumpft dabei der rote Restterm?"}),optionen:[{id:"2",text:"Faktor 2"},{id:"4",text:"Faktor 4"},{id:"8",text:"Faktor 8"}],loesung:"4",verdeckt:e.jsxs("p",{className:"text-sm",children:["Der Restterm fällt wie ",e.jsx(n,{children:"\\left\\|\\boldsymbol{h}\\right\\|^2"}),", halbe Kantenlänge kostet ihn also drei Viertel seiner Länge. Die Zeile unter dem Verdikt nennt den gemessenen Faktor; der Knopf „h halbieren“ führt ihn vor."]}),children:({aufgeloest:r})=>e.jsx(ss,{aufgeloest:r})})}const Si=P.blau,Di=P.orange,ai=[[1,-1],[.5,1]],di=[2,-1],as=2,Hi=1,Ki=(r,i)=>`(${u(r)}; ${u(i)})`,$n={x:40,a:160,z:280,y:400,L:520},en=92,ds={x:"x",a:"a₁",z:"z₁",y:"ŷ",L:"L"},hs=[["x","a","W₁ ·"],["a","z","max(0, ·)"],["z","y","W₂ ·"],["y","L","½(· − y)²"]];function cs({werte:r,adjungierte:i,aktiv:t}){return e.jsxs("svg",{viewBox:"0 0 560 190",className:"h-auto w-full max-w-[560px] rounded",role:"img","aria-label":"Rechengraph des kleinen Netzes: Eingabe, erste Schicht, ReLU, zweite Schicht und Verlust; unter den Knoten die Vorwärtswerte, darüber die Adjungierten.",style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)"},children:[e.jsx("defs",{children:e.jsx("marker",{id:"s103-bp-pfeil",markerWidth:"8",markerHeight:"8",refX:"7",refY:"4",orient:"auto",children:e.jsx("path",{d:"M0,0 L8,4 L0,8 z",fill:"var(--w-axis, #64748b)"})})}),hs.map(([s,c,h])=>{const x=$n[s]+19+3,d=$n[c]-19-6,f=($n[s]+$n[c])/2;return e.jsxs("g",{children:[e.jsx("line",{x1:x,y1:en,x2:d,y2:en,stroke:"var(--w-axis, #64748b)",strokeWidth:1.5,markerEnd:"url(#s103-bp-pfeil)"}),e.jsx("rect",{x:f-30,y:en-12,width:60,height:24,rx:4,fill:"var(--w-grid, #e2e8f0)",stroke:"var(--w-border, #94a3b8)",strokeWidth:1.1}),e.jsx("text",{x:f,y:en+5,fontSize:13,fill:"var(--w-text, #334155)",textAnchor:"middle",children:h})]},h)}),Object.keys($n).map(s=>{const c=$n[s],h=(t==null?void 0:t.knoten)===s;return e.jsxs("g",{children:[h&&e.jsx("circle",{cx:c,cy:en,r:23,fill:"none",stroke:(t==null?void 0:t.phase)==="rueckwaerts"?Di:Si,strokeWidth:2.5}),e.jsx("circle",{cx:c,cy:en,r:19,fill:"var(--w-grid, #f1f5f9)",stroke:"var(--w-axis, #64748b)",strokeWidth:1.3}),e.jsx("text",{x:c,y:en+5,fontSize:16,fill:"var(--w-text, #334155)",textAnchor:"middle",fontStyle:"italic",children:ds[s]}),r[s]!==void 0&&e.jsx("text",{x:c,y:en+19+18,fontSize:12,fill:Si,textAnchor:"middle",fontFamily:"ui-monospace, monospace",children:r[s]}),i[s]!==void 0&&e.jsx("text",{x:c,y:en-19-10,fontSize:12,fill:Di,textAnchor:"middle",fontFamily:"ui-monospace, monospace",children:i[s]})]},s)}),e.jsx("text",{x:8,y:16,fontSize:12,fill:Di,children:"∂L/∂(Knoten)"}),e.jsx("text",{x:8,y:184,fontSize:12,fill:Si,children:"Werte"})]})}function xs(){const[r,i]=E.useState(1),[t,l]=E.useState(0),s=E.useMemo(()=>{const a=[r,as],A=[ai[0][0]*a[0]+ai[0][1]*a[1],ai[1][0]*a[0]+ai[1][1]*a[1]],z=[A[0]>0?1:0,A[1]>0?1:0],p=[Math.max(0,A[0]),Math.max(0,A[1])],R=di[0]*p[0]+di[1]*p[1],M=.5*(R-Hi)**2,F=R-Hi,_=[F*di[0],F*di[1]],y=[_[0]*z[0],_[1]*z[1]],g=[F*p[0],F*p[1]],m=[[y[0]*a[0],y[0]*a[1]],[y[1]*a[0],y[1]*a[1]]],b=Math.abs(A[0])<1e-12||Math.abs(A[1])<1e-12;return{x:a,a:A,ind:z,z:p,yh:R,L:M,dy:F,dz:_,da:y,dW2:g,dW1:m,knick:b}},[r]),c=[{knoten:"a",phase:"vorwaerts",tex:`\\boldsymbol{a}_1 = \\boldsymbol{W}_1\\boldsymbol{x} = (${u(s.a[0])};\\ ${u(s.a[1])})^\\top`},{knoten:"z",phase:"vorwaerts",tex:`\\boldsymbol{z}_1 = \\max(\\boldsymbol{0}, \\boldsymbol{a}_1) = (${u(s.z[0])};\\ ${u(s.z[1])})^\\top`},{knoten:"y",phase:"vorwaerts",tex:`\\hat{y} = \\boldsymbol{W}_2\\boldsymbol{z}_1 = ${u(s.yh)}`},{knoten:"L",phase:"vorwaerts",tex:`L = \\tfrac12(\\hat{y} - y)^2 = \\tfrac12(${u(s.yh)} - ${u(Hi)})^2 = ${u(s.L)}`},{knoten:"y",phase:"rueckwaerts",tex:`\\frac{\\partial L}{\\partial \\hat{y}} = \\hat{y} - y = ${u(s.dy)}`},{knoten:"z",phase:"rueckwaerts",tex:`\\frac{\\partial L}{\\partial \\boldsymbol{z}_1} = \\frac{\\partial L}{\\partial \\hat{y}}\\,\\boldsymbol{W}_2 = (${u(s.dz[0])},\\ ${u(s.dz[1])})`},{knoten:"z",phase:"rueckwaerts",tex:`\\frac{\\partial L}{\\partial \\boldsymbol{W}_2} = \\frac{\\partial L}{\\partial \\hat{y}}\\,\\boldsymbol{z}_1^\\top = (${u(s.dW2[0])},\\ ${u(s.dW2[1])})`},{knoten:"a",phase:"rueckwaerts",tex:`\\frac{\\partial L}{\\partial \\boldsymbol{a}_1} = \\frac{\\partial L}{\\partial \\boldsymbol{z}_1}\\,\\operatorname{diag}(${s.ind[0]}, ${s.ind[1]}) = (${u(s.da[0])},\\ ${u(s.da[1])})`},{knoten:"x",phase:"rueckwaerts",tex:`\\frac{\\partial L}{\\partial \\boldsymbol{W}_1} = \\left(\\frac{\\partial L}{\\partial \\boldsymbol{a}_1}\\right)^\\top \\boldsymbol{x}^\\top = \\begin{pmatrix} ${u(s.dW1[0][0])} & ${u(s.dW1[0][1])} \\\\ ${u(s.dW1[1][0])} & ${u(s.dW1[1][1])} \\end{pmatrix}`}],h={x:Ki(s.x[0],s.x[1])},x={};[["a",Ki(s.a[0],s.a[1])],["z",Ki(s.z[0],s.z[1])],["y",u(s.yh)],["L",u(s.L)]].forEach(([a,A],z)=>{t>=z+1&&(h[a]=A)}),t>=5&&(x.L="1",x.y=u(s.dy)),t>=6&&(x.z=`(${u(s.dz[0])}, ${u(s.dz[1])})`),t>=8&&(x.a=`(${u(s.da[0])}, ${u(s.da[1])})`);const f=t>0?c[t-1]:null,j=t>=c.length,D=t===0?"Noch ist nur die Eingabe gesetzt; der erste Klick wertet die erste Schicht aus.":t<=4?`Vorwärtslauf, Schritt ${t} von 4: eine Schicht weiter zur Vorhersage und zum Verlust.`:`Rückwärtslauf, Schritt ${t-4} von 5: von L aus nach links, unterwegs fallen die beiden Parameter-Ableitungen ab.`;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Laufen wir mit dem Schrittregler erst vorwärts durch das Netz und dann rückwärts zurück, und verschieben wir x₁ so, dass eine ReLU-Einheit umschaltet."}),e.jsx(cs,{werte:h,adjungierte:x,aktiv:f?{knoten:f.knoten,phase:f.phase}:null}),e.jsxs("div",{className:`flex flex-wrap gap-x-5 gap-y-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:Si},children:"▬ Vorwärtswerte unter den Knoten"}),e.jsx("span",{style:{color:Di},children:"▬ Adjungierte ∂L/∂(Knoten) darüber"})]}),f&&e.jsx("div",{className:"overflow-x-auto rounded bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800 [.w-dark_&]:bg-slate-800",children:e.jsx(n,{children:f.tex})}),e.jsx(I,{label:"Eingabe x₁",value:r,onChange:a=>i(Math.round(a*20)/20),min:-1,max:4,step:.05,fmt:a=>u(a)}),e.jsx(qi,{step:t,setStep:l,max:c.length,narration:D}),e.jsx(ve,{kind:s.knick?"warn":j?"ok":"neutral",children:s.knick?e.jsxs(e.Fragment,{children:["Hier ist eine Komponente von ",e.jsx(n,{children:"\\boldsymbol{a}_1"})," exakt null. Dort hat",e.jsx(n,{children:"\\ \\max(0, \\cdot)"})," einen Knick und ist nicht differenzierbar; die Anzeige benutzt die übliche Verabredung, die Ableitung dort auf null zu setzen. ",V("beispiel:jacobimatrix-eines-relu-layers")," sagt genau das: die Jacobimatrix einer ReLU-Schicht ist",e.jsx(n,{children:"\\ \\operatorname{diag}(\\mathbb{1}\\{a_i > 0\\})"}),", und auf der Kante ist die Wahl Konvention, nicht Mathematik."]}):j?e.jsxs(e.Fragment,{children:["Der ganze Rückwärtslauf steht da. Multipliziert wurde nie eine Matrix mit einer Matrix, sondern immer die aktuelle Zeile mit der nächsten Jacobimatrix, und das ist die Auswertungsreihenfolge aus ",V("bemerkung:wie-die-kette-ausgewertet-wird"),". Und die Kette für"," ",e.jsx(n,{children:"\\boldsymbol{W}_1"})," endet bei",e.jsx(n,{children:"\\ \\boldsymbol{J}_{f_2}(\\boldsymbol{z}_1) = \\boldsymbol{W}_2"}),"; der letzte Faktor ist die Ableitung der ersten Schicht nach ihren eigenen Gewichten, nicht noch einmal ",e.jsx(n,{children:"\\boldsymbol{W}_1"})," (",V("bemerkung:wo-die-kette-aufhoert"),")."]}):t===0?e.jsxs(e.Fragment,{children:["Ausgangslage: nur die Eingabe ",e.jsx(n,{children:`\\boldsymbol{x} = (${u(s.x[0])};\\ ${u(s.x[1])})^\\top`})," ","steht fest. Vorwärts entstehen erst die Werte, rückwärts danach die Ableitungen, beides in derselben Kette, aber in umgekehrter Richtung."]}):t<=4?e.jsxs(e.Fragment,{children:["Vorwärtslauf: Bisher sind nur Funktionswerte entstanden (blau). Der aktuelle Verlust wäre ",e.jsx(n,{children:`L = ${u(s.L)}`}),"; Ableitungen gibt es noch keine, denn die Kettenregel (",dn("eq:kettenregel-fuer-jacobimatrizen"),") beginnt am Ende der Kette."]}):e.jsxs(e.Fragment,{children:["Rückwärtslauf, Schritt ",t-4," von 5: Die orangen Zeilen wandern von rechts nach links. Jede entsteht aus der vorigen durch Multiplikation mit einer Jacobimatrix, so wie es ",V("satz:kettenregel-fuer-jacobimatrizen")," vorgibt; abgezweigt werden dabei",e.jsx(n,{children:"\\ \\partial L/\\partial \\boldsymbol{W}_2"})," und",e.jsx(n,{children:"\\ \\partial L/\\partial \\boldsymbol{W}_1"}),"."]})})]})}function Zr(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Der Gradient aus ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` setzt voraus, dass am Ende genau
eine Zahl herauskommt. Viele Abbildungen, mit denen wir rechnen, liefern aber
wieder ein ganzes Bündel. Das Residuum
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx - \\bb"}),` der kleinsten Quadrate
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`) hat so viele Komponenten wie es
Beobachtungen gibt. Eine Schicht eines `,e.jsx(v,{id:"neural-network",children:"neuronalen Netzes"}),`
macht aus einem Vektor von Eingaben einen Vektor von Aktivierungen. Und eine
Koordinatentransformation der Ebene ordnet jedem Punkt wieder einen Punkt zu.`]}),`
`,e.jsxs(i.p,{children:["Solche Funktionen ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," sind nichts weiter als ",e.jsx(n,{children:"m"}),` gestapelte
skalarwertige Funktionen,`]}),`
`,e.jsx(o,{children:`\\cblue{f(\\bx)} = \\bigl(f_1(\\bx), \\dots, f_m(\\bx)\\bigr)^\\top ,
\\qquad f_i\\colon \\R^n \\to \\R .`}),`
`,e.jsxs(i.p,{children:["Jede einzelne Komponente ",e.jsx(n,{children:"f_i"})," hat nach ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` einen
Gradienten, also eine Zeile mit `,e.jsx(n,{children:"n"})," Einträgen. Stapeln wir diese ",e.jsx(n,{children:"m"}),` Zeilen
übereinander, steht eine `,e.jsx(v,{id:"matrix",children:"Matrix"})," da. Sie trägt einen eigenen Namen."]}),`
`,e.jsx(i.h3,{children:"Die Jacobimatrix"}),`
`,e.jsxs(q,{kind:"Definition",label:"10.3.1 (Jacobimatrix)",id:"env-jacobimatrix",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," in ",e.jsx(n,{children:"\\bx \\in \\R^n"}),`
`,e.jsx(v,{id:"differentiability",children:"differenzierbar"}),` mit Komponenten
`,e.jsx(n,{children:"f(\\bx) = \\bigl(f_1(\\bx), \\dots, f_m(\\bx)\\bigr)^\\top"}),". Die ",e.jsx(i.em,{children:"Jacobimatrix"}),`
(Jacobian) von `,e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"}),` ist die Matrix der
`,e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"})]}),e.jsx(o,{children:`\\corange{\\bJ_f(\\bx)} := \\frac{\\partial f(\\bx)}{\\partial \\bx}
= \\begin{pmatrix}
\\partial f_1(\\bx)/\\partial x_1 & \\cdots & \\partial f_1(\\bx)/\\partial x_n \\\\
\\vdots & \\ddots & \\vdots \\\\
\\partial f_m(\\bx)/\\partial x_1 & \\cdots & \\partial f_m(\\bx)/\\partial x_n
\\end{pmatrix} \\in \\R^{m \\times n} .`}),e.jsxs(i.p,{children:["Der Eintrag an der Stelle ",e.jsx(n,{children:"(i,j)"})," ist ",e.jsx(n,{children:"\\partial f_i(\\bx)/\\partial x_j"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Damit hat die Fréchet-Ableitung aus ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),` auch in diesem
Fall eine Gestalt, mit der sich rechnen lässt: Sie ist die Multiplikation mit
der Jacobimatrix,`]}),`
`,e.jsx(T,{tag:"10.3.1",id:"eq-eq-10-3-1",children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{o(\\left\\|\\bh\\right\\|)}
\\qquad \\text{mit} \\qquad
\\cgreen{D_{\\bx} f(\\bh)} = \\corange{\\bJ_f(\\bx)}\\,\\bh .`}),`
`,e.jsxs(i.p,{children:["Die Formate passen: Eine ",e.jsx(n,{children:"m \\times n"}),"-Matrix mal eine ",e.jsx(n,{children:"n \\times 1"}),`-Spalte ergibt
eine `,e.jsx(n,{children:"m \\times 1"}),"-Spalte, und dort lebt der Zuwachs von ",e.jsx(n,{children:"f"}),`. Der Restterm wird
in der `,e.jsx(v,{id:"euclidean-norm",children:"euklidischen Norm"})," des ",e.jsx(n,{children:"\\R^m"})," gemessen, das ",e.jsx(n,{children:"\\bh"}),` im
Nenner der `,e.jsx(v,{id:"big-o-notation",children:"Landau-Bedingung"})," dagegen in der des ",e.jsx(n,{children:"\\R^n"}),"."]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.3.2 (Die Zeilen sind Gradienten)",id:"env-die-zeilen-sind-gradienten",children:[e.jsxs(i.p,{children:["Lesen wir ",e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"})," zeilenweise, so steht in Zeile ",e.jsx(n,{children:"i"}),` genau der
Gradient der `,e.jsx(n,{children:"i"}),"-ten Komponentenfunktion:"]}),e.jsx(o,{children:`\\corange{\\bJ_f(\\bx)} = \\begin{pmatrix}
\\corange{\\nabla f_1(\\bx)} \\\\ \\vdots \\\\ \\corange{\\nabla f_m(\\bx)}
\\end{pmatrix} .`}),e.jsx(i.p,{children:`Die Jacobimatrix bringt also nichts grundsätzlich Neues, sie ordnet nur an,
was wir schon haben. Zwei Sonderfälle stecken bereits darin.`}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"m = 1"}),` bleibt eine einzige Zeile übrig, und das ist der Gradient aus
`,e.jsx(i.a,{href:"#env-gradient",children:"Definition 10.2.1"}),`. Dass wir ihn dort als Zeilenvektor definiert haben,
zahlt sich hier aus: Gradient und Jacobimatrix sind dasselbe Objekt, nur
mit unterschiedlich vielen Zeilen.`]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"n = 1"}),` bleibt eine einzige Spalte übrig. Das ist der Fall Skalar zu
Vektor aus der Übersicht in `,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),`, etwa die Ableitung
einer Kurve `,e.jsx(n,{children:"t \\mapsto \\bz(t)"})," nach ihrem Parameter."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-eq-10-3-1",children:"(10.3.1)"}),` lässt sich auch rückwärts lesen. Finden wir auf irgendeinem
Weg eine Matrix, die `,e.jsx(n,{children:"f"})," bis auf einen ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`-Rest
beschreibt, so ist das bereits die Jacobimatrix.`]}),`
`,e.jsxs(q,{kind:"Lemma",label:"10.3.3 (Die Matrix der linearen Näherung)",id:"env-die-matrix-der-linearen-naeherung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),", sei ",e.jsx(n,{children:"\\bx \\in \\R^n"}),`, und sei
`,e.jsx(n,{children:"\\bM \\in \\R^{m \\times n}"})," eine Matrix mit"]}),e.jsx(o,{children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{\\bM\\bh} + \\cred{o(\\left\\|\\bh\\right\\|)}
\\qquad \\text{für } \\bh \\to \\bnull .`}),e.jsxs(i.p,{children:["Dann ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar und ",e.jsx(n,{children:"\\bM = \\corange{\\bJ_f(\\bx)}"}),"."]})]}),`
`,e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bM\\be_j"})," ist die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\bM"}),"; der Restterm hängt von ",e.jsx(n,{children:"t"})," ab, nicht aber der erste Summand"]}),children:[e.jsxs(i.p,{children:["Differenzierbar ist ",e.jsx(n,{children:"f"})," schon nach ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),`, denn
`,e.jsx(n,{children:"\\bh \\mapsto \\cgreen{\\bM\\bh}"}),` ist linear und beschränkt. Zu zeigen bleibt, dass
`,e.jsx(n,{children:"\\bM"}),` die Matrix der partiellen Ableitungen ist. Dazu setzen wir
`,e.jsx(n,{children:"\\bh = t\\,\\be_j"})," mit ",e.jsx(n,{children:"t \\in \\R"})," und dem ",e.jsx(n,{children:"j"}),"-ten Einheitsvektor ",e.jsx(n,{children:"\\be_j"}),`. Dann ist
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\| = |t|"})," und ",e.jsx(n,{children:"\\bM\\bh = t\\,\\bM\\be_j"}),", also"]}),e.jsx(o,{children:`\\frac{\\cblue{f(\\bx + t\\be_j)} - \\cblue{f(\\bx)}}{t}
= \\bM\\be_j + \\frac{\\cred{o(|t|)}}{t} .`})]}),e.jsx(G,{why:e.jsx(e.Fragment,{children:"der Grenzwert existiert, weil die rechte Seite konvergiert; damit existieren nebenbei alle partiellen Ableitungen"}),children:e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"t \\to 0"}),` verschwindet der zweite Summand rechts, denn genau das besagt
`,e.jsx(n,{children:"\\cred{o(|t|)}"}),". Links steht der Differenzenquotient in Richtung der ",e.jsx(n,{children:"j"}),`-ten
Koordinate, sein Grenzwert ist die Spalte der partiellen Ableitungen
`,e.jsx(n,{children:"\\bigl(\\partial f_1/\\partial x_j, \\dots, \\partial f_m/\\partial x_j\\bigr)^\\top"}),`.
Beide Seiten stimmen also spaltenweise überein, und das für jedes
`,e.jsx(n,{children:"j = 1, \\dots, n"}),"."]})})]}),`
`,e.jsxs(i.p,{children:[`Welche Gestalt hat die Ableitung eigentlich, wenn wir Ein- und Ausgabedimension frei
wählen? Die Übersichtstabelle aus `,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` listet vier Fälle auf;
`,e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"})," sagt, dass es immer derselbe Bauplan ist."]}),`
`,e.jsxs(me,{title:"Welche Gestalt hat die Ableitung?",children:[e.jsx(i.p,{children:"Für jede Ausgabekomponente entsteht eine Zeile, für jede Eingabevariable eine Spalte."}),e.jsx(is,{}),e.jsxs(i.p,{children:[`Damit ist die Tabelle der Formate vollständig: Die einzelne Zahl, der Gradient als Zeile,
die Spalte der Ableitungen einer Kurve und die volle Matrix sind vier Ansichten desselben
Objekts, und welche wir sehen, entscheiden nur `,e.jsx(n,{children:"n"})," und ",e.jsx(n,{children:"m"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Die Bausteine und ihre Jacobimatrizen"}),`
`,e.jsx(i.p,{children:`Vier Funktionen tauchen so oft als Bausteine auf, dass sich das Auswendiglernen
lohnt. Alle vier sind konstant oder linear, und entsprechend einfach fallen die
Jacobimatrizen aus.`}),`
`,e.jsxs(q,{kind:"Satz",label:"10.3.4 (Jacobimatrizen der Grundbausteine)",id:"env-jacobimatrizen-der-grundbausteine",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bx \\in \\R^n"})," gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"f(\\bx) = \\bc \\in \\R^m"})," konstant ",e.jsx(n,{children:"\\quad\\impl\\quad \\corange{\\bJ_f(\\bx)} = \\bnull_{m \\times n}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"f(\\bx) = \\bx \\quad\\impl\\quad \\corange{\\bJ_f(\\bx)} = \\bI_n"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"f(\\bx) = \\bA\\bx"})," mit ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n} \\quad\\impl\\quad \\corange{\\bJ_f(\\bx)} = \\bA"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bA"})," mit ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times m} \\quad\\impl\\quad \\corange{\\bJ_f(\\bx)} = \\bA^\\top"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Keine dieser vier Jacobimatrizen hängt von ",e.jsx(n,{children:"\\bx"})," ab."]})]}),`
`,e.jsxs(ke,{children:[e.jsx(G,{why:e.jsx(e.Fragment,{children:"eine konstante Funktion ändert sich nicht, wenn wir an einer Koordinate wackeln"}),children:e.jsxs(i.p,{children:["Zu (1): Jede Komponente ",e.jsx(n,{children:"f_i(\\bx) = c_i"}),` ist konstant, also verschwinden alle
partiellen Ableitungen `,e.jsx(n,{children:"\\partial f_i/\\partial x_j = 0"}),`. Die Jacobimatrix ist
die Nullmatrix im Format `,e.jsx(n,{children:"m \\times n"}),"."]})}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["in der Summe hängt nur der Summand mit ",e.jsx(n,{children:"j = k"})," von ",e.jsx(n,{children:"x_k"})," ab, und zwar linear mit Faktor ",e.jsx(n,{children:"a_{ik}"}),"; alle anderen sind bezüglich ",e.jsx(n,{children:"x_k"})," konstant"]}),children:[e.jsxs(i.p,{children:["Zu (3): Schreiben wir ",e.jsx(n,{children:"f"})," komponentenweise auf. Die ",e.jsx(n,{children:"i"}),`-te Komponente von
`,e.jsx(n,{children:"\\bA\\bx"})," ist"]}),e.jsx(o,{children:`f_i(\\bx) = \\sum_{j=1}^n a_{ij}\\,x_j ,
\\qquad\\text{also}\\qquad
\\frac{\\partial f_i(\\bx)}{\\partial x_k}
= \\frac{\\partial}{\\partial x_k}\\left(\\sum_{j=1}^n a_{ij}\\,x_j\\right) = a_{ik} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"}),": Zeilenindex ",e.jsx(n,{children:"i"})," = Ausgabe, Spaltenindex ",e.jsx(n,{children:"k"})," = Eingabe, exakt die Indizierung von ",e.jsx(n,{children:"\\bA"})]}),children:[e.jsxs(i.p,{children:["Die partielle Ableitung an der Stelle ",e.jsx(n,{children:"(i,k)"}),` ist damit der Matrixeintrag
`,e.jsx(n,{children:"a_{ik}"})," selbst, und das Sammeln aller Einträge liefert"]}),e.jsx(o,{children:`\\corange{\\bJ_f(\\bx)} = \\begin{pmatrix}
a_{11} & \\cdots & a_{1n} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m1} & \\cdots & a_{mn}
\\end{pmatrix} = \\bA .`})]}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:["das ist gerade die ",e.jsx(v,{id:"identity-matrix",children:"Einheitsmatrix"})]}),children:e.jsxs(i.p,{children:["Zu (2): Das ist der Sonderfall ",e.jsx(n,{children:"\\bA = \\bI_n"})," von (3), denn ",e.jsx(n,{children:"\\bx = \\bI_n\\bx"}),`.
Direkt gesehen: `,e.jsx(n,{children:"f_i(\\bx) = x_i"}),` hat die partiellen Ableitungen
`,e.jsx(n,{children:"\\partial f_i/\\partial x_j = 1"})," für ",e.jsx(n,{children:"i = j"})," und ",e.jsx(n,{children:"0"})," sonst."]})}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(v,{id:"transpose",children:"Transponieren"})," dreht ein Produkt um: ",e.jsx(n,{children:"(\\bx^\\top\\bA)^\\top = \\bA^\\top(\\bx^\\top)^\\top = \\bA^\\top\\bx"})]}),children:e.jsxs(i.p,{children:["Zu (4): Der Ausdruck ",e.jsx(n,{children:"\\bx^\\top\\bA"})," ist eine Zeile mit ",e.jsx(n,{children:"m"}),` Einträgen. Lesen wir
sie als Spalte, so ist `,e.jsx(n,{children:"\\bigl(\\bx^\\top\\bA\\bigr)^\\top = \\bA^\\top\\bx"}),`, und
Teil (3) mit der Matrix `,e.jsx(n,{children:"\\bA^\\top \\in \\R^{m \\times n}"}),` liefert
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\bA^\\top"}),"."]})})]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.3.5 (Zur Identität für xᵀA)",id:"env-zur-identitaet-fuer-x-a",children:e.jsxs(i.p,{children:["Streng genommen bildet ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bA"})," nicht in den ",e.jsx(n,{children:"\\R^m"}),` ab, sondern in
den Raum der Zeilenvektoren `,e.jsx(n,{children:"\\R^{1 \\times m}"}),". ",e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"}),` verlangt aber
eine Spalte. Wir lesen die Zeile deshalb stillschweigend als Spalte, rechnen
also mit `,e.jsx(n,{children:"\\bA^\\top\\bx"}),", und erhalten so die im Satz genannte ",e.jsx(n,{children:"m \\times n"}),`-Matrix
`,e.jsx(n,{children:"\\bA^\\top"}),`. Wer stattdessen im Zeilenformat bleibt, bekommt dieselben Zahlen in
transponierter Anordnung. Solche Formatverabredungen sind kein Selbstzweck: Sie
entscheiden, ob die Kettenregel weiter unten ohne zusätzliche Transponierte
auskommt.`]})}),`
`,e.jsxs(q,{kind:"Korollar",label:"10.3.6 (Lineare Abbildungen sind ihre eigene Näherung)",id:"env-lineare-abbildungen-sind-ihre-eigene",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx"})," gilt"]}),e.jsx(o,{children:"\\cblue{f(\\bx + \\bh)} = \\bA\\bx + \\bA\\bh = \\cblue{f(\\bx)} + \\cgreen{\\corange{\\bJ_f(\\bx)}\\,\\bh} ,"}),e.jsxs(i.p,{children:["und zwar exakt für jedes ",e.jsx(n,{children:"\\bh"}),", ohne Restterm. Die lineare Näherung ",e.jsx(i.a,{href:"#eq-eq-10-3-1",children:"(10.3.1)"}),`
ist hier keine Näherung, sondern eine Identität.`]})]}),`
`,e.jsx(i.p,{children:`Das ist der Grund, warum die vier Bausteine so nützlich sind. Sie bilden
zusammen mit der Kettenregel den Werkzeugkasten, mit dem sich fast alle
Ableitungen dieses Kapitels zusammensetzen lassen, und bei ihnen selbst fällt
kein Fehler an.`}),`
`,e.jsx(i.h3,{children:"Was die Jacobimatrix geometrisch anstellt"}),`
`,e.jsxs(i.p,{children:["Für eine nichtlineare Abbildung ",e.jsx(n,{children:"f\\colon \\R^2 \\to \\R^2"}),` ist die Lage
interessanter. Sie verbiegt die Ebene, obwohl Urbild und Bild dieselbe Dimension
haben. Legen wir ein feines Gitter um einen Punkt `,e.jsx(n,{children:"\\bx_0"}),`, so wird daraus ein
krummes Netz um `,e.jsx(n,{children:"\\cblue{f(\\bx_0)}"}),`. Die Jacobimatrix beschreibt dieses krumme
Netz näherungsweise durch ein Parallelogrammgitter: Die beiden Spalten
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx_0)}\\be_1"})," und ",e.jsx(n,{children:"\\corange{\\bJ_f(\\bx_0)}\\be_2"}),` sind die Bilder
der beiden Koordinatenrichtungen unter der Linearisierung, sie spannen die
Maschen dieses Gitters auf, und je kleiner das Gitter, desto besser passt es auf
das krumme Netz.`]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.3.7 (Quadrieren in der Ebene)",id:"env-quadrieren-in-der-ebene",children:[e.jsx(i.p,{children:"Wir nehmen"}),e.jsx(o,{children:`\\cblue{f(\\bx)} = \\begin{pmatrix} x_1^2 - x_2^2 \\\\ 2x_1x_2 \\end{pmatrix} ,
\\qquad
\\corange{\\bJ_f(\\bx)} = \\begin{pmatrix} 2x_1 & -2x_2 \\\\ 2x_2 & 2x_1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Wer die Ebene als komplexe Zahlenebene liest, erkennt darin die Abbildung
`,e.jsx(n,{children:"z \\mapsto z^2"}),". An der Stelle ",e.jsx(n,{children:"\\bx_0 = (1;\\ 0{,}5)^\\top"})," ist"]}),e.jsx(o,{children:`\\cblue{f(\\bx_0)} = \\begin{pmatrix} 0{,}75 \\\\ 1 \\end{pmatrix} ,
\\qquad
\\corange{\\bJ_f(\\bx_0)} = \\begin{pmatrix} 2 & -1 \\\\ 1 & 2 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Der Restterm lässt sich hier vollständig ausrechnen. Setzen wir
`,e.jsx(n,{children:"\\bx_0 + \\bh"})," ein und sortieren nach Potenzen von ",e.jsx(n,{children:"\\bh"}),", so bleibt"]}),e.jsx(o,{children:`\\cred{r(\\bh)}
= \\cblue{f(\\bx_0 + \\bh)} - \\cblue{f(\\bx_0)} - \\cgreen{\\corange{\\bJ_f(\\bx_0)}\\,\\bh}
= \\begin{pmatrix} h_1^2 - h_2^2 \\\\ 2h_1h_2 \\end{pmatrix}
= \\cblue{f(\\bh)} .`}),e.jsx(i.p,{children:`Der Fehler der linearen Näherung ist also die Funktion selbst, ausgewertet am
Zuwachs. Seine Länge kennen wir damit exakt:`}),e.jsx(o,{children:`\\left\\|\\cred{r(\\bh)}\\right\\|^2 = \\bigl(h_1^2 - h_2^2\\bigr)^2 + 4h_1^2h_2^2
= \\bigl(h_1^2 + h_2^2\\bigr)^2 ,
\\qquad\\text{also}\\qquad
\\left\\|\\cred{r(\\bh)}\\right\\| = \\left\\|\\bh\\right\\|^2 .`}),e.jsxs(i.p,{children:[`Der relative Fehler ist demnach
`,e.jsx(n,{children:"\\left\\|\\cred{r(\\bh)}\\right\\| / \\left\\|\\bh\\right\\| = \\left\\|\\bh\\right\\|"}),`, und
das geht für `,e.jsx(n,{children:"\\bh \\to \\bnull"}),` gegen null. Damit ist die
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`-Bedingung nicht nur erfüllt, wir sehen auch, wie
schnell: Bei `,e.jsx(n,{children:"\\bh = (0{,}1;\\ 0{,}1)^\\top"}),` mit
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\| \\approx 0{,}1414"})," ist der Fehler ",e.jsx(n,{children:"0{,}02"}),` lang, bei
`,e.jsx(n,{children:"\\bh = (0{,}01;\\ 0{,}01)^\\top"})," nur noch ",e.jsx(n,{children:"0{,}0002"}),`. Ein Zehntel Schrittweite
kostet ein Hundertstel Fehler.`]})]}),`
`,e.jsx(xe,{title:"Die Jacobi-Determinante als Flächenfaktor",children:e.jsx(q,{kind:"Bemerkung",label:"10.3.8 (Wie stark die Fläche verzerrt wird)",id:"env-wie-stark-die-flaeche-verzerrt-wird",children:e.jsxs(i.p,{children:[`Das Bild dazu ist schnell erzählt: ein kleines Quadrat links, sein verbogenes
Bild rechts, dazu das Parallelogramm der linearen Näherung. Wie stark `,e.jsx(n,{children:"f"}),` die
Fläche dehnt oder staucht, steht in der
`,e.jsx(v,{id:"determinant",children:"Determinante"}),` der Jacobimatrix. Ein achsenparalleles Quadrat
mit Kantenlänge `,e.jsx(n,{children:"a"})," um ",e.jsx(n,{children:"\\bx_0"}),` geht unter der Linearisierung in das
Parallelogramm über, das von `,e.jsx(n,{children:"a\\,\\corange{\\bJ_f(\\bx_0)}\\be_1"}),` und
`,e.jsx(n,{children:"a\\,\\corange{\\bJ_f(\\bx_0)}\\be_2"}),` aufgespannt wird; dessen Flächeninhalt ist das
`,e.jsx(n,{children:"\\left|\\det \\corange{\\bJ_f(\\bx_0)}\\right|"}),"-fache von ",e.jsx(n,{children:"a^2"}),`. Weil sich das krumme
Bild für kleine Quadrate immer besser an dieses Parallelogramm anschmiegt, gilt
derselbe Faktor im Grenzwert auch für `,e.jsx(n,{children:"f"})," selbst. In ",e.jsx(i.a,{href:"#env-quadrieren-in-der-ebene",children:"Beispiel 10.3.7"}),` ist
`,e.jsx(n,{children:"\\det \\corange{\\bJ_f(\\bx)} = 4x_1^2 + 4x_2^2"}),", an der Stelle ",e.jsx(n,{children:"\\bx_0"})," also ",e.jsx(n,{children:"5"}),`:
Ein kleines Quadrat um `,e.jsx(n,{children:"\\bx_0"}),` wird auf annähernd die fünffache Fläche
aufgeblasen, und je kleiner es ist, desto genauer stimmt der Faktor. In der
Wahrscheinlichkeitsrechnung ist genau dieser Faktor das, was beim
Transformationssatz für Dichten den Ausgleich schafft.`]})})}),`
`,e.jsxs(me,{title:"Linearisierung zum Verkleinern",children:[e.jsxs(i.p,{children:[`Wie schnell verschwindet der Unterschied zwischen dem krummen Bild und dem Parallelogramm,
wenn wir die Umgebung schrumpfen lassen? Und trifft der Flächenfaktor
`,e.jsx(n,{children:"\\left|\\det \\bJ_f(\\bx_0)\\right|"}),` wirklich zu, oder gilt er nur im Grenzwert?
Beides ist eine Frage an ein Bild, nicht an eine Formel.`]}),e.jsx(ls,{}),e.jsxs(i.p,{children:[`Links liegt ein regelmäßiges Gitter über dem ganzen Definitionsbereich, dazu das violette
Fenster der halben Kantenlänge `,e.jsx(n,{children:"h"})," um ",e.jsx(n,{children:"\\bx_0"}),`. In der Mitte steht das Bild desselben
Gitters unter `,e.jsx(n,{children:"f"}),`, in der Lupe rechts das krumme Bild des Fensters (blau) gegen das
Parallelogramm `,e.jsx(n,{children:"\\cblue{f(\\bx_0)} + \\corange{\\bJ_f(\\bx_0)}\\bh"}),` (grün). Die roten Strecken
in den vier Ecken sind der Restterm, die orangen Pfeile sind `,e.jsx(n,{children:"h"}),` mal die Spalten von
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx_0)}"}),"."]}),e.jsxs(i.p,{children:["Wie das Widget zeigt, fällt der rote Abstand beim Halbieren von ",e.jsx(n,{children:"h"}),` auf ungefähr ein
Viertel, während das Fenster nur halb so groß wird. Der Quotient
`,e.jsx(n,{children:"\\left\\|\\cred{r(\\bh)}\\right\\| / \\left\\|\\bh\\right\\|"}),` halbiert sich also mit, und mehr
verlangt `,e.jsx(i.a,{href:"#eq-eq-10-3-1",children:"(10.3.1)"}),` auch nicht. Bei der Voreinstellung „linear" bleibt der Restterm exakt
null, so wie es `,e.jsx(i.a,{href:"#env-lineare-abbildungen-sind-ihre-eigene",children:"Korollar 10.3.6"})," verlangt, und das Flächenverhältnis ist dort für jedes ",e.jsx(n,{children:"h"}),`
exakt `,e.jsx(n,{children:"\\left|\\det \\corange{\\bJ_f(\\bx_0)}\\right| = 1{,}65"}),`. Bei den krummen Abbildungen
nähert es sich diesem Wert erst für kleines `,e.jsx(n,{children:"h"}),`: Beim Quadrieren an der Stelle
`,e.jsx(n,{children:"\\bx_0 = (1;\\ 0{,}5)^\\top"})," steht bei ",e.jsx(n,{children:"h = 0{,}3"})," noch ",e.jsx(n,{children:"5{,}24"})," und bei ",e.jsx(n,{children:"h = 0{,}075"}),`
bereits `,e.jsx(n,{children:"5{,}015"}),`, gegen den Flächenfaktor
`,e.jsx(n,{children:"\\left|\\det \\bJ_f(\\bx_0)\\right| = 5"}),`. Die Voreinstellung
„Wirbel" ist der Sonderfall dazu: Dort ist `,e.jsx(n,{children:"\\det \\corange{\\bJ_f(\\bx)} = 1"}),` an jeder
Stelle, die Abbildung verschiebt Fläche also, ohne sie zu verändern, und trotzdem verbiegt
sie das Gitter kräftig.`]})]}),`
`,e.jsx(i.h3,{children:"Verkettung"}),`
`,e.jsxs(i.p,{children:[`Bisher haben wir einzelne Abbildungen abgeleitet. Interessant wird es, wenn
mehrere hintereinandergeschaltet sind, wenn also die Ausgabe der einen die
Eingabe der nächsten ist. Für die
`,e.jsx(v,{id:"function-composition",children:"Verkettung"}),` gilt dieselbe Regel wie in der Analysis,
nur dass jetzt Matrizen multipliziert werden.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.3.9 (Kettenregel für Jacobimatrizen)",id:"env-kettenregel-fuer-jacobimatrizen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"g\\colon \\R^n \\to \\R^m"})," in ",e.jsx(n,{children:"\\bx"}),` differenzierbar und
`,e.jsx(n,{children:"f\\colon \\R^m \\to \\R^p"})," in ",e.jsx(n,{children:"g(\\bx)"})," differenzierbar. Dann ist ",e.jsx(n,{children:"f \\circ g"}),` in
`,e.jsx(n,{children:"\\bx"})," differenzierbar mit"]}),e.jsx(T,{tag:"10.3.2",id:"eq-kettenregel-fuer-jacobimatrizen",children:"\\corange{\\bJ_{f \\circ g}(\\bx)} = \\corange{\\bJ_f\\bigl(g(\\bx)\\bigr)}\\,\\corange{\\bJ_g(\\bx)} ."})]}),`
`,e.jsxs(i.p,{children:["Die Formatprobe erledigt sich von selbst: rechts steht eine ",e.jsx(n,{children:"p \\times m"}),`-Matrix
mal einer `,e.jsx(n,{children:"m \\times n"}),"-Matrix, das Produkt ist ",e.jsx(n,{children:"p \\times n"}),`, und genau das
verlangt `,e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"})," für eine Abbildung von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^p"}),"."]}),`
`,e.jsxs(i.p,{children:["Der Beweis führt dieselbe Rechnung wie später ",e.jsx(i.a,{href:"#env-kettenregel",children:"Satz 10.6.7"}),`, dort ohne Koordinaten und
für beliebige normierte Räume: den Zuwachs abkürzen, ihn gegen `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`
abschätzen, die Linearität zum Aufspalten nutzen und beide Restterme auf denselben
Bezugspunkt bringen. Wer die allgemeine Fassung liest, kann die folgende Vertiefung
überspringen.`]}),`
`,e.jsx(xe,{title:"Der Beweis in Koordinaten",children:e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-eq-10-3-1",children:"(10.3.1)"}),", angewandt auf ",e.jsx(n,{children:"g"})," an der Stelle ",e.jsx(n,{children:"\\bx"})]}),children:[e.jsxs(i.p,{children:["Wir kürzen ",e.jsx(n,{children:"\\by := g(\\bx)"}),` ab und bezeichnen mit
`,e.jsx(n,{children:"\\bk := g(\\bx + \\bh) - g(\\bx)"})," den Zuwachs, den ",e.jsx(n,{children:"g"}),` weiterreicht. Die
Differenzierbarkeit von `,e.jsx(n,{children:"g"})," heißt"]}),e.jsx(o,{children:`\\bk = \\corange{\\bJ_g(\\bx)}\\,\\bh + \\cred{r_g(\\bh)} ,
\\qquad
\\left\\|\\cred{r_g(\\bh)}\\right\\| / \\left\\|\\bh\\right\\| \\to 0 .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"g(\\bx+\\bh) = \\by + \\bk"}),"; die Matrixmultiplikation ist assoziativ, deshalb dürfen wir ",e.jsx(n,{children:"\\corange{\\bJ_f(\\by)}(\\corange{\\bJ_g(\\bx)}\\bh)"})," als ",e.jsx(n,{children:"(\\corange{\\bJ_f(\\by)}\\corange{\\bJ_g(\\bx)})\\bh"})," lesen"]}),children:[e.jsxs(i.p,{children:["Die Differenzierbarkeit von ",e.jsx(n,{children:"f"})," an der Stelle ",e.jsx(n,{children:"\\by"}),` liefert
`,e.jsx(n,{children:"f(\\by + \\bk) = f(\\by) + \\corange{\\bJ_f(\\by)}\\,\\bk + \\cred{r_f(\\bk)}"}),`. Setzen
wir den ersten Schritt ein und sortieren, so entsteht`]}),e.jsx(o,{children:`\\cblue{f\\bigl(g(\\bx + \\bh)\\bigr)}
= \\cblue{f\\bigl(g(\\bx)\\bigr)}
+ \\cgreen{\\corange{\\bJ_f(\\by)}\\,\\corange{\\bJ_g(\\bx)}\\,\\bh}
+ \\underbrace{\\corange{\\bJ_f(\\by)}\\,\\cred{r_g(\\bh)} + \\cred{r_f(\\bk)}}_{=: \\cred{r(\\bh)}} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\|\\bA\\bv\\right\\| \\leq \\left\\|\\bA\\right\\|\\left\\|\\bv\\right\\|"})," für die induzierte Operatornorm, ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),"; ",e.jsx(n,{children:"\\left\\|\\corange{\\bJ_f(\\by)}\\right\\|"})," hängt nicht von ",e.jsx(n,{children:"\\bh"})," ab"]}),children:[e.jsxs(i.p,{children:["Bleibt zu zeigen, dass ",e.jsx(n,{children:"\\cred{r(\\bh)}"})," wirklich ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`
ist. Für den ersten Summanden schätzen wir mit der
`,e.jsx(v,{id:"matrix-norm",children:"Matrixnorm"})," ab,"]}),e.jsx(o,{children:`\\left\\|\\corange{\\bJ_f(\\by)}\\,\\cred{r_g(\\bh)}\\right\\|
\\leq \\left\\|\\corange{\\bJ_f(\\by)}\\right\\| \\left\\|\\cred{r_g(\\bh)}\\right\\| ,`}),e.jsxs(i.p,{children:[`und die rechte Seite ist ein festes Vielfaches von
`,e.jsx(n,{children:"\\left\\|\\cred{r_g(\\bh)}\\right\\| = \\cred{o(\\left\\|\\bh\\right\\|)}"}),"."]})]}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:["der Bruch ",e.jsx(n,{children:"\\left\\|\\cred{r_f(\\bk)}\\right\\| / \\left\\|\\bk\\right\\|"})," geht gegen null, weil mit ",e.jsx(n,{children:"\\bh"})," auch ",e.jsx(n,{children:"\\bk"})," gegen ",e.jsx(n,{children:"\\bnull"})," geht; für ",e.jsx(n,{children:"\\bk = \\bnull"})," ist ",e.jsx(n,{children:"\\cred{r_f(\\bk)} = \\bnull"}),", der Quotient also gar nicht gebildet"]}),children:e.jsxs(i.p,{children:["Für den zweiten Summanden brauchen wir, dass ",e.jsx(n,{children:"\\bk"})," mit ",e.jsx(n,{children:"\\bh"}),` klein wird. Aus dem
ersten Schritt folgt für hinreichend kleine `,e.jsx(n,{children:"\\bh"}),` die Abschätzung
`,e.jsx(n,{children:"\\left\\|\\bk\\right\\| \\leq \\bigl(\\left\\|\\corange{\\bJ_g(\\bx)}\\right\\| + 1\\bigr)\\left\\|\\bh\\right\\|"}),`.
Also ist
`,e.jsx(n,{children:`\\left\\|\\cred{r_f(\\bk)}\\right\\| / \\left\\|\\bh\\right\\|
\\leq \\bigl(\\left\\|\\corange{\\bJ_g(\\bx)}\\right\\| + 1\\bigr) \\cdot \\left\\|\\cred{r_f(\\bk)}\\right\\| / \\left\\|\\bk\\right\\|`}),`,
und das geht gegen null. Damit erfüllt die lineare Abbildung
`,e.jsx(n,{children:"\\bh \\mapsto \\corange{\\bJ_f(\\by)}\\corange{\\bJ_g(\\bx)}\\,\\bh"}),` die Bedingung aus
`,e.jsx(i.a,{href:"#env-die-matrix-der-linearen-naeherung",children:"Lemma 10.3.3"}),", und dieses Lemma liefert ",e.jsx(i.a,{href:"#eq-kettenregel-fuer-jacobimatrizen",children:"(10.3.2)"}),"."]})})]})}),`
`,e.jsx(i.h3,{children:"Anwendung: Backpropagation"}),`
`,e.jsxs(i.p,{children:[`Ein neuronales Netz ist eine Verkettung, wie sie im Buche steht. Aus einer
Eingabe `,e.jsx(n,{children:"\\bx"})," wird über ",e.jsx(n,{children:"K"})," Schichten eine Vorhersage ",e.jsx(n,{children:"\\wh{\\by}"}),","]}),`
`,e.jsx(o,{children:`\\bx \\xrightarrow{\\ f_1\\ } \\bz_1 \\xrightarrow{\\ f_2\\ } \\bz_2
\\xrightarrow{\\ \\cdots\\ } \\bz_{K-1} \\xrightarrow{\\ f_K\\ } \\wh{\\by}
= (f_K \\circ \\cdots \\circ f_2 \\circ f_1)(\\bx) .`}),`
`,e.jsxs(i.p,{children:["Jede Schicht ",e.jsx(n,{children:"f_k"})," hat eigene Parameter ",e.jsx(n,{children:"\\btheta_k"}),`, also Gewichte und
Biases, und rechnet typischerweise
`,e.jsx(n,{children:"f_k(\\bz_{k-1}) = \\sigma_k\\bigl(\\bW_k(\\btheta_k)\\,\\bz_{k-1}\\bigr)"}),` mit einer
Gewichtsmatrix `,e.jsx(n,{children:"\\bW_k"}),` und einer komponentenweise wirkenden
Aktivierungsfunktion `,e.jsx(n,{children:"\\sigma_k"}),`. Eine
`,e.jsx(v,{id:"objective-function",children:"Verlustfunktion"})," ",e.jsx(n,{children:"L(\\wh{\\by},\\by)"}),` misst anhand des
Zielwerts `,e.jsx(n,{children:"\\by"}),`, wie gut die Vorhersagen sind; in der folgenden Formel hängt sie
bei festem `,e.jsx(n,{children:"\\wh{\\by}"}),` nicht noch einmal direkt von den Parametern ab. Zum
Trainieren brauchen wir für jede Schicht die
Ableitung `,e.jsx(n,{children:"\\partial L / \\partial \\btheta_k"}),`, denn genau die verlangt der
`,e.jsx(v,{id:"gradient-descent",children:"Gradientenabstieg"})," aus ",e.jsx(i.a,{href:"#env-gradient-gradientenabstieg",children:"Algorithmus 10.2.10"}),"."]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.3.10 (Die Gradientenkette eines Netzes)",id:"env-die-gradientenkette-eines-netzes",children:[e.jsxs(i.p,{children:["Zwischen ",e.jsx(n,{children:"\\btheta_k"})," und ",e.jsx(n,{children:"L"})," liegen die Schichten ",e.jsx(n,{children:"k+1"})," bis ",e.jsx(n,{children:"K"}),` und danach die
Verlustfunktion. Von `,e.jsx(n,{children:"\\btheta_k"})," hängt dabei allein die Schicht ",e.jsx(n,{children:"k"}),` ab: Ihre
Eingabe `,e.jsx(n,{children:"\\bz_{k-1}"}),` entsteht aus den Schichten davor und bleibt fest, wenn wir
`,e.jsx(n,{children:"\\btheta_k"})," verändern. ",e.jsx(i.a,{href:"#env-kettenregel-fuer-jacobimatrizen",children:"Satz 10.3.9"}),", mehrfach angewandt, ergibt"]}),e.jsx(T,{tag:"10.3.3",id:"eq-die-gradientenkette-eines-netzes",children:`\\frac{\\partial L}{\\partial \\btheta_k}
= \\frac{\\partial L}{\\partial \\wh{\\by}} \\cdot
\\corange{\\bJ_{f_K}(\\bz_{K-1})} \\cdot
\\corange{\\bJ_{f_{K-1}}(\\bz_{K-2})} \\cdots
\\corange{\\bJ_{f_{k+1}}(\\bz_k)} \\cdot
\\frac{\\partial f_k(\\bz_{k-1}; \\btheta_k)}{\\partial \\btheta_k} .`}),e.jsxs(i.p,{children:[`Die Formate lesen sich von links nach rechts wie eine Kette von Dominosteinen.
Ganz links steht mit `,e.jsx(n,{children:"\\partial L / \\partial \\wh{\\by}"})," ein Zeilenvektor, weil ",e.jsx(n,{children:"L"}),`
skalar ist. Jede Jacobimatrix `,e.jsx(n,{children:"\\corange{\\bJ_{f_j}(\\bz_{j-1})}"}),` hat so viele
Zeilen wie `,e.jsx(n,{children:"\\bz_j"})," Komponenten und so viele Spalten wie ",e.jsx(n,{children:"\\bz_{j-1}"}),`. Der letzte
Faktor leitet die Schicht `,e.jsx(n,{children:"k"})," nach ihren ",e.jsx(i.em,{children:"eigenen"}),` Parametern ab, nicht nach
ihrer Eingabe. Am Ende steht eine Zeile mit so vielen Einträgen, wie `,e.jsx(n,{children:"\\btheta_k"}),`
Parameter hat.`]}),e.jsxs(i.p,{children:[`Enthält der Gesamtverlust zusätzlich einen direkten Parameterterm, etwa eine
Regularisierung `,e.jsx(n,{children:"R(\\btheta)"}),`, kommt dessen Gradient additiv hinzu:
`,e.jsx(n,{children:"\\partial(L+R)/\\partial\\btheta_k"})," ist die Kette aus ",e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"}),` plus
`,e.jsx(n,{children:"\\partial R/\\partial\\btheta_k"}),"."]})]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.3.11 (Wo die Kette aufhört)",id:"env-wo-die-kette-aufhoert",children:e.jsxs(i.p,{children:["Eine Stolperstelle in ",e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"}),` verdient einen eigenen Absatz, weil sie leicht
zu übersehen ist. Das Produkt der Jacobimatrizen läuft nur bis
`,e.jsx(n,{children:"\\corange{\\bJ_{f_{k+1}}(\\bz_k)}"}),", also bis zur Schicht ",e.jsx(i.em,{children:"über"}),` der gesuchten.
Verlockend wäre, die Kette bis `,e.jsx(n,{children:"\\corange{\\bJ_{f_k}(\\bz_{k-1})}"}),` weiterzuziehen
und erst dann nach `,e.jsx(n,{children:"\\btheta_k"})," abzuleiten. Das zählt ",e.jsx(n,{children:"\\bW_k"}),` jedoch doppelt:
`,e.jsx(n,{children:"\\corange{\\bJ_{f_k}(\\bz_{k-1})}"})," ist die Ableitung der Schicht ",e.jsx(n,{children:"k"}),` nach ihrer
Eingabe `,e.jsx(n,{children:"\\bz_{k-1}"})," und enthält ",e.jsx(n,{children:"\\bW_k"}),` bereits als Faktor. Für die Parameter
brauchen wir stattdessen die Ableitung derselben Schicht nach `,e.jsx(n,{children:"\\btheta_k"}),`, bei
festgehaltener Eingabe. Merkregel: Jede Schicht liefert genau einen Faktor, und
für die Schicht `,e.jsx(n,{children:"k"})," ist das der nach ",e.jsx(n,{children:"\\btheta_k"})," abgeleitete."]})}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.3.12 (Jacobimatrix eines ReLU-Layers)",id:"env-jacobimatrix-eines-relu-layers",children:[e.jsxs(i.p,{children:["Nehmen wir als Aktivierung die ",e.jsx(i.em,{children:"ReLU-Funktion"}),` (rectified linear unit)
`,e.jsx(n,{children:"\\sigma(u) = \\max(0, u)"}),`, komponentenweise angewandt. Die Schicht rechnet also
`,e.jsx(n,{children:"f_k(\\bz_{k-1}) = \\max\\bigl(\\bnull, \\bW_k\\bz_{k-1}\\bigr)"}),`. Für die Ableitung
nach der Eingabe verketten wir zwei Bausteine: erst die lineare Abbildung
`,e.jsx(n,{children:"\\bz \\mapsto \\bW_k\\bz"})," mit Jacobimatrix ",e.jsx(n,{children:"\\bW_k"})," nach ",e.jsx(i.a,{href:"#env-jacobimatrizen-der-grundbausteine",children:"Satz 10.3.4"}),`(3), dann die
komponentenweise Schwelle. Die zweite Abbildung reicht eine positive Komponente
unverändert durch und setzt eine negative auf null; sie mischt die Komponenten
nicht, also ist ihre Jacobimatrix diagonal, und auf der Diagonale steht die
Ableitung von `,e.jsx(n,{children:"\\max(0,\\cdot)"}),", je nach Vorzeichen eine ",e.jsx(n,{children:"1"})," oder eine ",e.jsx(n,{children:"0"}),`. Nach
`,e.jsx(i.a,{href:"#env-kettenregel-fuer-jacobimatrizen",children:"Satz 10.3.9"})," ist"]}),e.jsx(T,{tag:"10.3.4",id:"eq-jacobimatrix-eines-relu-layers",children:`\\corange{\\bJ_{f_k}(\\bz_{k-1})}
= \\diag\\bigl(\\ind_{\\{\\bW_k\\bz_{k-1} > \\bnull\\}}\\bigr) \\cdot \\bW_k .`}),e.jsxs(i.p,{children:["Die ",e.jsx(v,{id:"diagonal-matrix",children:"Diagonalmatrix"})," trägt an der Stelle ",e.jsx(n,{children:"i"})," eine ",e.jsx(n,{children:"1"}),`, falls
`,e.jsx(n,{children:"(\\bW_k\\bz_{k-1})_i > 0"})," ist, und sonst eine ",e.jsx(n,{children:"0"}),`. Sie streicht also gerade die
Zeilen von `,e.jsx(n,{children:"\\bW_k"}),", die zu inaktiven Einheiten gehören. Ein Zahlenbeispiel mit"]}),e.jsx(o,{children:`\\bW = \\begin{pmatrix} 1 & -1 \\\\ 2 & 1 \\end{pmatrix} ,
\\qquad
\\bz = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} ,
\\qquad
\\bW\\bz = \\begin{pmatrix} -1 \\\\ 4 \\end{pmatrix} :`}),e.jsx(i.p,{children:"Die erste Einheit ist inaktiv, die zweite aktiv, also"}),e.jsx(o,{children:`\\corange{\\bJ_f(\\bz)} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}
\\begin{pmatrix} 1 & -1 \\\\ 2 & 1 \\end{pmatrix}
= \\begin{pmatrix} 0 & 0 \\\\ 2 & 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Vorsicht an den Schaltstellen: Ist ",e.jsx(n,{children:"(\\bW_k\\bz_{k-1})_i = 0"})," und die ",e.jsx(n,{children:"i"}),`-te Zeile
von `,e.jsx(n,{children:"\\bW_k"})," nicht der Nullvektor, etwa für ",e.jsx(n,{children:"\\bz = (1;\\ 1)^\\top"}),` mit
`,e.jsx(n,{children:"\\bW\\bz = (0;\\ 3)^\\top"}),`, dann hat diese Ausgabekomponente dort einen Knick und
der Layer ist nicht differenzierbar (`,e.jsx(i.a,{href:"#env-wenn-es-keine-eindeutige-tangente-gibt",children:"Bemerkung 10.1.2"}),`). Eine Nullzeile ist die
Ausnahme: Dann ist die betreffende Komponente konstant null und damit
differenzierbar. In der Praxis wird an einem echten Knick meist per Verabredung
die Ableitung null verwendet. Bei festen von null verschiedenen Zeilen und
kontinuierlich verteilten Eingaben bilden die Schalthyperebenen eine Nullmenge;
bei diskreten Daten oder Nullgewichten können sie dagegen durchaus exakt
getroffen werden.`]})]}),`
`,e.jsxs(xe,{title:"Wie teuer die Kette ist, und warum sie von links ausgewertet wird",children:[e.jsxs(q,{kind:"Bemerkung",label:"10.3.13 (Wie die Kette ausgewertet wird)",id:"env-wie-die-kette-ausgewertet-wird",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"}),` ist ein Produkt aus vielen Matrizen, und
Matrixmultiplikation ist assoziativ: Wir dürfen die Klammern setzen, wie wir
wollen. Für den Rechenaufwand macht das einen großen Unterschied, denn eine
`,e.jsx(n,{children:"m \\times n"}),"-Matrix mal eine ",e.jsx(n,{children:"n \\times p"}),"-Matrix kostet ",e.jsx(n,{children:"mnp"}),` Multiplikationen
(`,e.jsx(i.a,{href:"?k=02-algos#sec-2.3",children:"Abschnitt 2.3"}),")."]}),e.jsxs(i.p,{children:["Rechnen wir ein kleines Netz mit drei Schichten durch, mit ",e.jsx(n,{children:"\\bz_1 \\in \\R^{50}"}),`,
`,e.jsx(n,{children:"\\bz_2 \\in \\R^{20}"})," und ",e.jsx(n,{children:"\\wh{\\by} \\in \\R^{10}"}),`, und zwar die Kette bis hinunter
zur ersten Schicht. Beginnen wir in `,e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"}),` ganz links, so bleiben wir immer
bei einer Zeile: erst
`,e.jsx(n,{children:"(1 \\times 10)\\cdot(10 \\times 20)"})," mit ",e.jsx(n,{children:"200"}),` Multiplikationen, dann
`,e.jsx(n,{children:"(1 \\times 20)\\cdot(20 \\times 50)"})," mit ",e.jsx(n,{children:"1000"}),", zusammen ",e.jsx(n,{children:"1200"}),`. Klammern wir
dagegen zuerst die beiden Jacobimatrizen zusammen, so entsteht das volle
Matrixprodukt `,e.jsx(n,{children:"(10 \\times 20)\\cdot(20 \\times 50)"})," mit ",e.jsx(n,{children:"10\\,000"}),`
Multiplikationen und danach noch einmal `,e.jsx(n,{children:"500"}),", zusammen ",e.jsx(n,{children:"10\\,500"}),`, also fast das
Neunfache.`]}),e.jsxs(i.p,{children:["Der Grund ist immer derselbe: Weil ",e.jsx(n,{children:"L"}),` skalar ist, ist der äußerste linke Faktor
eine Zeile, und eine Zeile mal einer Matrix bleibt eine Zeile. Wer bei
`,e.jsx(n,{children:"\\partial L / \\partial \\wh{\\by}"}),` anfängt, hält also stets nur einen Vektor im
Speicher; wer am anderen Ende beginnt, baut große Zwischenmatrizen auf. In der
Sprache des Netzes heißt „links anfangen" gerade: von der Ausgabe rückwärts
Schicht für Schicht zur Schicht `,e.jsx(n,{children:"k"}),` laufen. Nichts anderes ist
`,e.jsx(i.em,{children:"Backpropagation"}),`, und dazu kommt eine zweite Ersparnis: Das Teilprodukt für die
Schicht `,e.jsx(n,{children:"k"})," entsteht aus dem für die Schicht ",e.jsx(n,{children:"k+1"}),` durch einen einzigen weiteren
Faktor, nämlich `,e.jsx(n,{children:"\\corange{\\bJ_{f_{k+1}}(\\bz_k)}"}),`. Ein Rückwärtslauf liefert
deshalb die Gradienten `,e.jsx(i.em,{children:"aller"}),` Schichten, nicht nur den einer einzelnen.
`,e.jsx(v,{id:"neural-network",children:"Neuronale Netze"}),` lassen sich überhaupt nur deshalb mit
Millionen von Parametern trainieren.`]})]}),e.jsxs(i.p,{children:["Wo genau endet die Kette, wenn wir sie bis zu ",e.jsx(n,{children:"\\bW_1"}),` zurückverfolgen? Und was steht
unterwegs eigentlich in den Zwischengrößen, Matrizen oder Zeilen? Am kleinsten möglichen
Netz lässt sich das Schritt für Schritt nachzählen.`]}),e.jsxs(me,{title:"Vorwärts und rückwärts durch ein winziges Netz",children:[e.jsxs(i.p,{children:["Das Netz hat zwei Schichten: ",e.jsx(n,{children:"\\ba_1 = \\bW_1\\bx"}),`, dann
`,e.jsx(n,{children:"\\bz_1 = \\max(\\bnull, \\ba_1)"}),", dann ",e.jsx(n,{children:"\\wh{y} = \\bW_2\\bz_1"}),` und schließlich
`,e.jsx(n,{children:"L = \\tfrac12(\\wh{y} - y)^2"})," mit dem Zielwert ",e.jsx(n,{children:"y = 1"}),`. Unter den Knoten stehen blau die
Zahlen des Vorwärtslaufs, über den Knoten orange die Ableitung von `,e.jsx(n,{children:"L"}),` nach dem jeweiligen
Knoten.`]}),e.jsx(xs,{}),e.jsxs(i.p,{children:[`Jede Zwischengröße des Rückwärtslaufs bleibt eine Zeile, weil links immer die Zeile des
vorigen Schritts steht und rechts eine Jacobimatrix; erst der letzte Schritt ordnet das
Ergebnis als Gewichtsmatrix an, denn `,e.jsx(n,{children:"\\bW_1"}),` ist keine Liste, sondern ein Rechteck. Und die
Kette für `,e.jsx(n,{children:"\\bW_1"})," endet bei ",e.jsx(n,{children:"\\corange{\\bJ_{f_2}(\\bz_1)} = \\bW_2"}),`: Der letzte Faktor ist die
Ableitung der ersten Schicht nach ihren eigenen Gewichten, nicht noch einmal `,e.jsx(n,{children:"\\bW_1"}),`
(`,e.jsx(i.a,{href:"#env-wo-die-kette-aufhoert",children:"Bemerkung 10.3.11"}),"). Stellen wir den Regler auf ",e.jsx(n,{children:"x_1 = 2"}),`, so landen wir auf
einer Knickstelle der Art aus `,e.jsx(i.a,{href:"#env-jacobimatrix-eines-relu-layers",children:"Beispiel 10.3.12"}),"."]})]}),e.jsx(Me,{children:e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Ob wir das Produkt in ",e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"}),` von links oder von rechts auswerten, ändert
nur die Reihenfolge der Rechenschritte, nicht den Aufwand.`]}),e.jsxs(i.p,{children:[`Das Ergebnis ist dasselbe, der Aufwand nicht. Im Beispiel aus
`,e.jsx(i.a,{href:"#env-wie-die-kette-ausgewertet-wird",children:"Bemerkung 10.3.13"})," kostet die Auswertung von links ",e.jsx(n,{children:"1200"}),` und die von rechts
`,e.jsx(n,{children:"10\\,500"})," Multiplikationen. Weil ",e.jsx(n,{children:"L"}),` skalar ist, bleibt von links jedes
Zwischenergebnis eine Zeile; von rechts entstehen volle Matrizen. Genau diese
Auswertungsreihenfolge ist die Backpropagation.`]})]})})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," ist ",e.jsx(n,{children:"\\bJ_f(\\bx) \\in \\R^{m \\times n}"}),`, und die
`,e.jsx(n,{children:"i"}),"-te Zeile ist der Gradient der ",e.jsx(n,{children:"i"}),"-ten Komponentenfunktion ",e.jsx(n,{children:"f_i"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"})," zusammen mit ",e.jsx(i.a,{href:"#env-die-zeilen-sind-gradienten",children:"Bemerkung 10.3.2"}),`: Pro Ausgabekomponente
gibt es eine Zeile, pro Eingabevariable eine Spalte. Für `,e.jsx(n,{children:"m = 1"}),` bleibt genau
eine Zeile übrig, nämlich der Gradient aus `,e.jsx(i.a,{href:"#env-gradient",children:"Definition 10.2.1"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\bA\\bx"})," mit ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` hängt die Jacobimatrix von
der Stelle `,e.jsx(n,{children:"\\bx"})," ab."]}),e.jsxs(i.p,{children:["Sie ist konstant gleich ",e.jsx(n,{children:"\\bA"})," (",e.jsx(i.a,{href:"#env-jacobimatrizen-der-grundbausteine",children:"Satz 10.3.4"}),`). Der Grund steht in
`,e.jsx(i.a,{href:"#env-lineare-abbildungen-sind-ihre-eigene",children:"Korollar 10.3.6"}),": ",e.jsx(n,{children:"f"}),` ist selbst linear, also ist die beste lineare Näherung
`,e.jsx(n,{children:"f"})," selbst, und der Restterm verschwindet für jedes ",e.jsx(n,{children:"\\bh"})," exakt."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Kettenregel lautet ",e.jsx(n,{children:"\\bJ_{f \\circ g}(\\bx) = \\bJ_g(\\bx)\\,\\bJ_f(g(\\bx))"}),"."]}),e.jsxs(i.p,{children:["Die Reihenfolge ist vertauscht; richtig ist ",e.jsx(i.a,{href:"#eq-kettenregel-fuer-jacobimatrizen",children:"(10.3.2)"}),`,
`,e.jsx(n,{children:"\\bJ_{f \\circ g}(\\bx) = \\bJ_f(g(\\bx))\\,\\bJ_g(\\bx)"}),`. Schon die Formate
verraten den Fehler: Für `,e.jsx(n,{children:"g\\colon \\R^n \\to \\R^m"})," und ",e.jsx(n,{children:"f\\colon \\R^m \\to \\R^p"}),`
wäre das falsch geordnete Produkt `,e.jsx(n,{children:"(m \\times n)\\cdot(p \\times m)"}),` gar nicht
definiert, außer wenn zufällig `,e.jsx(n,{children:"n = p"})," gilt."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für die Ableitung nach ",e.jsx(n,{children:"\\btheta_k"}),` multiplizieren wir die Jacobimatrizen bis
einschließlich `,e.jsx(n,{children:"\\bJ_{f_k}(\\bz_{k-1})"}),` und hängen danach noch
`,e.jsx(n,{children:"\\partial \\bW_k(\\btheta_k) / \\partial \\btheta_k"})," an."]}),e.jsxs(i.p,{children:["Damit ginge ",e.jsx(n,{children:"\\bW_k"}),` zweimal in das Produkt ein. Die Matrix
`,e.jsx(n,{children:"\\bJ_{f_k}(\\bz_{k-1})"})," ist die Ableitung der Schicht ",e.jsx(n,{children:"k"})," nach ihrer ",e.jsx(i.em,{children:"Eingabe"}),`
und enthält `,e.jsx(n,{children:"\\bW_k"})," bereits, siehe ",e.jsx(i.a,{href:"#eq-jacobimatrix-eines-relu-layers",children:"(10.3.4)"}),` für den ReLU-Fall. Die Kette
endet nach `,e.jsx(i.a,{href:"#eq-die-gradientenkette-eines-netzes",children:"(10.3.3)"})," bei ",e.jsx(n,{children:"\\bJ_{f_{k+1}}(\\bz_k)"}),`, und der letzte Faktor ist
`,e.jsx(n,{children:"\\partial f_k(\\bz_{k-1}; \\btheta_k) / \\partial \\btheta_k"}),`
(`,e.jsx(i.a,{href:"#env-wo-die-kette-aufhoert",children:"Bemerkung 10.3.11"}),")."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein ReLU-Layer ",e.jsx(n,{children:"f(\\bz) = \\max(\\bnull, \\bW\\bz)"}),` ist an einer Stelle mit
`,e.jsx(n,{children:"(\\bW\\bz)_i = 0"})," nicht differenzierbar, sofern die ",e.jsx(n,{children:"i"}),"-te Zeile von ",e.jsx(n,{children:"\\bW"}),` nicht
der Nullvektor ist.`]}),e.jsxs(i.p,{children:["Dort hat ",e.jsx(n,{children:"\\max(0, \\cdot)"}),` einen Knick, links und rechts ergeben sich
verschiedene Steigungen (`,e.jsx(i.a,{href:"#env-wenn-es-keine-eindeutige-tangente-gibt",children:"Bemerkung 10.1.2"}),"). Formel ",e.jsx(i.a,{href:"#eq-jacobimatrix-eines-relu-layers",children:"(10.3.4)"}),` gilt deshalb nur
abseits echter Schalthyperebenen; in der Praxis wird dort meist die Ableitung
null verwendet. Bei einer Nullzeile wäre die Komponente dagegen konstant null
und differenzierbar (`,e.jsx(i.a,{href:"#env-jacobimatrix-eines-relu-layers",children:"Beispiel 10.3.12"}),")."]})]}),e.jsxs(We,{loesung:5,toleranz:.05,children:[e.jsxs(i.p,{children:['Im Linearisierungs-Widget: Wir wählen die Voreinstellung „Quadrieren" und lassen ',e.jsx(n,{children:"\\bx_0"}),` auf
`,e.jsx(n,{children:"(1;\\ 0{,}5)^\\top"})," stehen. Welchen Wert zeigt ",e.jsx(n,{children:"\\det \\bJ_f(\\bx_0)"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bJ_f(\\bx) = \\bigl(\\begin{smallmatrix} 2x_1 & -2x_2 \\\\ 2x_2 & 2x_1\\end{smallmatrix}\\bigr)"}),`
hat die Determinante `,e.jsx(n,{children:"4(x_1^2 + x_2^2)"}),", an der Stelle ",e.jsx(n,{children:"(1;\\ 0{,}5)^\\top"})," also ",e.jsx(n,{children:"5"}),`
(`,e.jsx(i.a,{href:"#env-quadrieren-in-der-ebene",children:"Beispiel 10.3.7"}),`). Dasselbe steht als Grenzwert des
Flächenverhältnisses im Verdikt.`]})]}),e.jsxs(We,{loesung:4,toleranz:.5,children:[e.jsxs(i.p,{children:["Um welchen Faktor fällt der Restterm ",e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\|"}),` im Linearisierungs-Widget,
wenn wir mit dem Knopf „h halbieren" die Kantenlänge des Fensters halbieren?`]}),e.jsxs(i.p,{children:["Der Restterm fällt wie ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"}),`, also auf ein Viertel. Bei der
Voreinstellung „Quadrieren" ist das exakt so, bei den anderen krummen Abbildungen bis auf
Terme höherer Ordnung.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.3 (Jacobimatrix, Jacobi-Determinante als Flächenfaktor);
MML §5.6 für Backpropagation und automatisches Differenzieren.`})})]})}function os(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Zr,{...r})}):Zr(r)}const hr=P.blau,Mi=P.gruen,cr=P.rot,us=P.orange;function xr(r){return r[0][0]*r[1][1]-r[0][1]*r[1][0]}function Un(r){const i=xr(r);return[[r[1][1]/i,-r[0][1]/i],[-r[1][0]/i,r[0][0]/i]]}function hi(r,i){return r.map(t=>i[0].map((l,s)=>t.reduce((c,h,x)=>c+h*i[x][s],0)))}function ci(r){return r.reduce((i,t,l)=>i+t[l],0)}const Tn=1e-5;function Ir(r,i){return(r(i+Tn)-r(i-Tn))/(2*Tn)}function bs(r,i){const t=r(i+Tn),l=r(i-Tn);return t.map((s,c)=>s.map((h,x)=>(h-l[c][x])/(2*Tn)))}const xi=[{name:"diag(x, 2x)",tex:"F(x) = (x 0; 0 2x)",F:r=>[[r,0],[0,2*r]],Fp:()=>[[1,0],[0,2]],xMin:-2,xMax:2,x0:1,hinweis:`Die Diagonalmatrix aus ${V("beispiel:die-jacobi-formel-an-einem")}: det F(x) = 2x², die Ableitung ist 4x. Bei x = 0 ist F singulär, dann sind F⁻¹ und die Formel für die Determinante nicht definiert.`},{name:"(x 1; x² 3x)",tex:"F(x) = (x 1; x² 3x)",F:r=>[[r,1],[r*r,3*r]],Fp:r=>[[1,0],[2*r,3]],xMin:-2,xMax:2,x0:1.3,hinweis:"Hier hängt jeder Eintrag anders von x ab, der rechte obere sogar gar nicht. det F(x) = 3x² − x² = 2x², also wieder 4x als Ableitung, diesmal aber über einen unübersichtlicheren Weg."},{name:"Drehmatrix",tex:"F(x) = (cos x −sin x; sin x cos x)",F:r=>[[Math.cos(r),-Math.sin(r)],[Math.sin(r),Math.cos(r)]],Fp:r=>[[-Math.sin(r),-Math.cos(r)],[Math.cos(r),-Math.sin(r)]],xMin:-3,xMax:3,x0:.6,hinweis:"Eine Drehung um den Winkel x hat stets det F(x) = 1. Die Determinante ist also konstant, ihre Ableitung null, und die Jacobi-Formel muss das über tr(F⁻¹ ∂F/∂x) = 0 abbilden."}];function oi({titel:r,A:i,farbe:t,stellen:l=3}){return e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-xs",style:{color:t},children:r}),e.jsx("div",{className:"inline-grid grid-cols-2 gap-1",children:i.map((s,c)=>s.map((h,x)=>e.jsx("span",{className:"w-16 rounded border border-slate-300 px-1 py-0.5 text-center font-mono text-xs dark:border-slate-600",children:u(h,l)},`${c}-${x}`)))})]})}function Xr({was:r,numerisch:i,formel:t}){const l=Math.abs(i-t),s=Number.isFinite(l)&&l<1e-4;return e.jsxs("tr",{children:[e.jsx("td",{className:"py-1 pr-3",children:r}),e.jsx("td",{className:"py-1 pr-3 text-right font-mono",style:{color:hr},children:u(i,4)}),e.jsx("td",{className:"py-1 pr-3 text-right font-mono",style:{color:Mi},children:u(t,4)}),e.jsx("td",{className:"py-1 text-right font-mono",style:{color:s?Mi:cr},children:s?"✓":u(l,4)})]})}function gs(){const[r,i]=E.useState(0),[t,l]=E.useState(xi[0].x0),s=xi[r],c=s.F(t),h=s.Fp(t),x=xr(c),d=Math.abs(x)<1e-8,f=Ir(R=>ci(s.F(R)),t),j=ci(h),D=Ir(R=>xr(s.F(R)),t),a=d?NaN:x*ci(hi(Un(c),h)),A=d?null:bs(R=>Un(s.F(R)),t),z=d?null:hi(hi(Un(c),h),Un(c)).map(R=>R.map(M=>-M)),p=A&&z?Math.max(...A.flat().map((R,M)=>Math.abs(R-z.flat()[M]))):NaN;return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:`text-xs ${Y}`,children:"F(x) wählen:"}),xi.map((R,M)=>e.jsx("button",{type:"button","aria-pressed":M===r,className:M===r?pe:ie,onClick:()=>{i(M),l(xi[M].x0)},children:R.name},R.name))]}),e.jsxs("p",{className:`max-w-prose text-sm ${Y}`,children:[e.jsx("span",{className:"font-mono",children:s.tex}),". ",s.hinweis]}),e.jsx(we,{children:"Schieben wir x durch den ganzen Bereich und achten auf die letzte Spalte: Wo weicht die Formel von der numerischen Ableitung ab, und warum?"}),e.jsx(I,{label:"x",value:t,onChange:R=>l(Math.round(R*100)/100),min:s.xMin,max:s.xMax,step:.01,fmt:R=>u(R,2)}),e.jsxs("div",{className:"flex flex-wrap gap-6",children:[e.jsx(oi,{titel:"F(x)",A:c,farbe:hr}),e.jsx(oi,{titel:"∂F(x)/∂x",A:h,farbe:us})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 dark:border-slate-600",children:[e.jsx("th",{className:"py-1 pr-3 text-left font-semibold",children:"Identität"}),e.jsx("th",{className:"py-1 pr-3 text-right font-semibold",children:"numerisch"}),e.jsx("th",{className:"py-1 pr-3 text-right font-semibold",children:"Formel"}),e.jsx("th",{className:"py-1 text-right font-semibold",children:"Abstand"})]})}),e.jsxs("tbody",{children:[e.jsx(Xr,{was:"∂ tr F(x) / ∂x = tr(∂F/∂x)",numerisch:f,formel:j}),e.jsx(Xr,{was:"∂ det F(x) / ∂x = det F · tr(F⁻¹ ∂F/∂x)",numerisch:D,formel:a})]})]})}),A&&z&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-wrap gap-6",children:[e.jsx(oi,{titel:"∂F(x)⁻¹/∂x, numerisch",A,farbe:hr}),e.jsx(oi,{titel:"−F⁻¹ (∂F/∂x) F⁻¹",A:z,farbe:Mi})]}),e.jsxs("p",{className:"text-sm",children:["Größter Abstand zwischen den beiden Tafeln:"," ",e.jsx("span",{className:"font-mono",style:{color:p<1e-4?Mi:cr},children:u(p,6)}),p>=1e-4&&e.jsxs("span",{style:{color:cr},children:[" ","Hier klaffen die Tafeln sichtbar auseinander, und daran ist nicht die Formel schuld: So nahe an der Nullstelle der Determinante wachsen die Einträge von F(x)⁻¹ wie 1/x, und bei so steilen Funktionen wird der Differenzenquotient selbst ungenau. Ab etwa |x| = 0,1 stimmen beide Tafeln wieder auf vier Nachkommastellen überein."]})]})]}),e.jsxs(ve,{kind:d?"warn":"ok",children:[e.jsxs("span",{className:"font-mono",children:["det F(x) = ",u(x,4)]}),d?e.jsxs(e.Fragment,{children:[". ","F(x) ist hier singulär. Die Determinantenformel und die Inversenformel setzen beide F(x)⁻¹ voraus und liefern deshalb keinen Wert; die Spur-Identität aus",V("satz:identitaeten-fuer-skalar-zu-matrix"),"(1) gilt dagegen weiter, denn sie braucht nur die Linearität der Spur."]}):e.jsxs(e.Fragment,{children:[", tr(F⁻¹ ∂F/∂x) ="," ",e.jsx("span",{className:"font-mono",children:u(ci(hi(Un(c),h)),4)}),". Beide Faktoren zusammen ergeben die Ableitung der Determinante, wie ",V("satz:identitaeten-fuer-skalar-zu-matrix"),"(2) es behauptet. Die numerische Spalte kennt keine der Formeln: Wir werten F an"," ",e.jsx("span",{className:"font-mono",children:"x ± 10⁻⁵"})," aus und bilden den zentralen Differenzenquotienten. Dass beide Spalten übereinstimmen, ist deshalb eine echte Probe und keine Umformung derselben Rechnung. Ein winziger Rest bleibt: in der Spur- und der Determinantenzeile liegt er über den ganzen Reglerbereich unter 10⁻⁹, meist um 10⁻¹¹, also der Abbruchfehler des Differenzenquotienten, weit unter den angezeigten Stellen."]})]})]})}const Jr=P.blau,js=P.gruen,ms=P.rot,Cn=P.orange,Ln=P.violett,Or=[1,-2],Ur=[2,1,3],Cr=[[1,0,-2],[3,1,0]],Qr=[{name:"aᵀXb",tex:"f(X) = aᵀXb   mit a = (1; −2), b = (2; 1; 3)",f:r=>Or.reduce((i,t,l)=>i+t*Ur.reduce((s,c,h)=>s+r[l][h]*c,0),0),grad:()=>Or.map(r=>Ur.map(i=>r*i)),regel:`∂f/∂X = abᵀ (${V("beispiel:ableitung-von-f-x-a-xb")})`,ordnung:0},{name:"‖X‖_F²",tex:"f(X) = ‖X‖_F² = tr(XᵀX)",f:r=>r.flat().reduce((i,t)=>i+t*t,0),grad:r=>r.map(i=>i.map(t=>2*t)),regel:`∂f/∂X = 2X (${V("satz:identitaeten-fuer-matrix-zu-skalar")})`,ordnung:2},{name:"tr(AᵀX)",tex:"f(X) = tr(AᵀX)   mit A = (1 0 −2; 3 1 0)",f:r=>{const i=r.flat();return Cr.flat().reduce((t,l,s)=>t+l*i[s],0)},grad:()=>Cr.map(r=>[...r]),regel:`∂f/∂X = A (${V("satz:identitaeten-fuer-matrix-zu-skalar")})`,ordnung:0}],fs=[[1,0,2],[-1,2,1]],Mn=78,Rn=46,Nn=10,or=16,Yr=3*Mn+2*Nn,et=2*Rn+2*Nn+or,nt=1;function ps(){const[r,i]=E.useState(0),[t,l]=E.useState(fs.map(S=>[...S])),[s,c]=E.useState(2),[h,x]=E.useState(3),[d,f]=E.useState(.4),j=Qr[r],D=qn({feld:{x0:Nn,y0:or+Nn,w:3*Mn,h:2*Rn},welt:{x0:0,x1:3,y0:-1.1,y1:1.1},clamp:([S,w])=>[S,Ue(w,-nt,nt)],snap:[0,.02],greifPosition:()=>[0,d],onStart:(S,w)=>{const[B,k]=w.split("-").map(Number);c(B),x(k)},onDrag:([,S])=>f(Math.round(S*50)/50)}),a=j.grad(t),A=a[s-1][h-1],z=`${s}${h}`,p=1e-4,R=S=>{const w=t.map(B=>[...B]);return w[s-1][h-1]+=S,j.f(w)},M=(R(p)-R(-p))/(2*p),F=j.f(t),y=R(d)-F,g=A*d,m=y-g,b=Math.abs(M-A),N=b>1e-6?"abweichung":Math.abs(d)<1e-9?"kein-stups":j.ordnung===0?"exakt":Math.abs(m)<5e-4?"rest-verschwindet":"quadratisch";return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{className:`text-xs ${Y}`,children:"f wählen:"}),Qr.map((S,w)=>e.jsx("button",{type:"button","aria-pressed":w===r,className:w===r?pe:ie,onClick:()=>i(w),children:S.name},S.name))]}),e.jsxs("p",{className:`max-w-prose text-sm ${Y}`,children:[e.jsx("span",{className:"font-mono",children:j.tex}),", ausgewertet an X ∈ ℝ²ˣ³."," ",e.jsx("span",{style:{color:Cn},children:j.regel})]}),e.jsxs(we,{children:["Fassen wir eine Zelle von X an und ziehen sie nach oben oder unten. Das ist der Stups h·E",e.jsx("sub",{children:"ij"}),"."]}),e.jsxs("div",{className:"flex flex-wrap items-start gap-6",children:[e.jsxs("svg",{viewBox:`0 0 ${Yr} ${et}`,width:Yr,height:et,className:"h-auto max-w-full select-none rounded",role:"img","aria-label":`Die Matrix X als Tafel; die Zelle (${s}, ${h}) ist um ${u(d,2)} ausgelenkt.`,...D.svgProps,style:{border:"1px solid var(--w-border, #cbd5e1)",background:"var(--w-bg, #ffffff)",...D.svgProps.style},children:[e.jsx("defs",{children:e.jsx("marker",{id:"s104-stups",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:Ln})})}),e.jsxs("text",{x:Nn,y:11,fontSize:10,fill:"var(--w-text, #334155)",children:["X + h·E",z,": Zelle anfassen und senkrecht ziehen"]}),t.map((S,w)=>S.map((B,k)=>{const K=w===s-1&&k===h-1,O=Nn+k*Mn,X=or+Nn+w*Rn,le=K?B+d:B;return e.jsxs("g",{children:[e.jsx("rect",{x:O+2,y:X+2,width:Mn-4,height:Rn-4,rx:4,fill:K?Ln:"var(--w-grid, #e2e8f0)",fillOpacity:K?.14:.5,stroke:K?Ln:"var(--w-border, #cbd5e1)",strokeWidth:K?2:1,...D.handleProps(`${w+1}-${k+1}`)}),e.jsx("text",{x:O+Mn/2,y:X+Rn/2+4,textAnchor:"middle",fontSize:13,fontFamily:"ui-monospace, monospace",fill:K?Ln:"var(--w-text, #334155)",pointerEvents:"none",children:u(le,2)}),K&&Math.abs(d)>1e-9&&e.jsx("line",{x1:O+Mn-14,y1:X+Rn/2+(d>0?12:-12),x2:O+Mn-14,y2:X+Rn/2-(d>0?12:-12),stroke:Ln,strokeWidth:2,markerEnd:"url(#s104-stups)",pointerEvents:"none"})]},`${w}-${k}`)}))]}),e.jsxs("div",{children:[e.jsxs("p",{className:"mb-1 text-xs",style:{color:Cn},children:["∂f(X)/∂X, Eintrag (",s,",",h,") hervorgehoben"]}),e.jsx("div",{className:"inline-grid grid-cols-3 gap-1",children:a.map((S,w)=>S.map((B,k)=>e.jsx("span",{className:"w-14 rounded border px-1 py-0.5 text-center font-mono text-xs",style:w===s-1&&k===h-1?{borderColor:Cn,borderWidth:2,color:Cn,fontWeight:600}:{borderColor:"var(--w-border, #94a3b8)"},children:u(B,2)},`${w}-${k}`)))})]})]}),e.jsx(I,{label:"Stups h",value:d,onChange:S=>f(Math.round(S*100)/100),min:-1,max:1,step:.01,accent:Ln,fmt:S=>u(S,2)}),e.jsx(I,{label:"Zeile i",value:s,onChange:c,min:1,max:2,step:1,fmt:S=>S.toFixed(0)}),e.jsx(I,{label:"Spalte j",value:h,onChange:x,min:1,max:3,step:1,fmt:S=>S.toFixed(0)}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-xs",style:{color:Jr},children:"Grundmatrix X (auch tippbar)"}),e.jsx(qt,{value:t,onChange:l})]}),e.jsxs("div",{className:"max-w-prose space-y-1 text-sm",children:[e.jsxs("p",{children:["Zentraler Differenzenquotient von f nach"," ",e.jsxs("span",{className:"font-mono",children:["x",e.jsx("sub",{children:z})]}),": ",e.jsx("span",{className:"font-mono",children:u(M,4)}),". Vorhersage aus der Gradientenmatrix:"," ",e.jsx("span",{className:"font-mono",style:{color:Cn},children:u(A,4)}),"."]}),e.jsxs("p",{children:[e.jsxs("span",{className:"font-mono",style:{color:Jr},children:["f(X + h·E) − f(X) = ",u(y,4)]})," = ",e.jsx("span",{className:"font-mono",style:{color:js},children:u(g,4)})," + ",e.jsx("span",{className:"font-mono",style:{color:ms},children:u(m,4)})]})]}),e.jsxs(ve,{kind:N==="abweichung"?"fail":N==="kein-stups"?"neutral":"ok",children:[N==="abweichung"&&`Formelwert und Differenzenquotient weichen um ${u(b,6)} voneinander ab. Das darf nach ${V("satz:identitaeten-fuer-matrix-zu-skalar")} nicht passieren; hier stimmt etwas im Widget nicht.`,N==="kein-stups"&&`Ohne Stups ändert sich nichts. Der Eintrag (${s},${h}) der Gradientenmatrix sagt voraus, mit welcher Rate f reagiert, sobald wir an dieser Stelle wackeln: pro Einheit um ${u(A,3)}.`,N==="exakt"&&`f ist linear in X. Der grüne Ableitungsterm D_X f(h·E) = h·[∂f/∂X]${z} trifft die Änderung deshalb exakt, der rote Restterm bleibt für jedes h null. Nach ${V("bemerkung:der-ableitungsterm-ist-ein-skalarprodukt")} ist dieser Term das Skalarprodukt tr((∂f/∂X)ᵀ H); bei H = h·E bleibt davon genau ein Summand übrig.`,N==="quadratisch"&&`f ist quadratisch in X, und der Restterm ist exakt h² = ${u(d*d,4)}. Er fällt schneller als h selbst: halbieren wir den Stups, viertelt er sich. Genau das und nicht mehr verlangt ${V("definition:frechet-ableitung")} vom o(‖H‖)-Term.`,N==="rest-verschwindet"&&`Bei diesem kleinen Stups ist der Restterm h² = ${u(d*d,5)} bereits unter der angezeigten Genauigkeit. Die lineare Vorhersage der Gradientenmatrix ist damit praktisch exakt: die Aussage von ${V("satz:identitaeten-fuer-matrix-zu-skalar")} ist eine über kleine H, nicht über beliebige.`]})]})}const Vn=P.blau,Pn=P.gruen,Ti=P.rot,Qn=P.orange,it=P.violett,Mt=[[5,3,0],[4,0,2]],ur=[[1,1,0],[1,0,1]],rt={1:{U:[[.9],[.5]],V:[[1.1],[.4],[.7]]},2:{U:[[.9,-.3],[.5,.8]],V:[[1.1,.2],[.4,-.6],[.7,.5]]}},Rt=200;function Ri(r){return r[0].map((i,t)=>r.map(l=>l[t]))}function Zn(r,i){return r.map(t=>i[0].map((l,s)=>t.reduce((c,h,x)=>c+h*i[x][s],0)))}function ks(r,i){return r.map((t,l)=>t.map((s,c)=>s*i[l][c]))}function kr(r,i){const t=Zn(r,Ri(i));return ks(ur,Mt.map((l,s)=>l.map((c,h)=>c-t[s][h])))}function tt(r,i){return .5*kr(r,i).flat().reduce((t,l)=>t+l*l,0)}function ws(r,i,t){const l=kr(r,i),s=Zn(l,i).map(h=>h.map(x=>-x)),c=Zn(Ri(l),r).map(h=>h.map(x=>-x));return{U:r.map((h,x)=>h.map((d,f)=>d-t*s[x][f])),V:i.map((h,x)=>h.map((d,f)=>d-t*c[x][f]))}}function st(r,i){let t=rt[r].U.map(c=>[...c]),l=rt[r].V.map(c=>[...c]);const s=[{U:t,V:l,L:tt(t,l)}];for(let c=0;c<Rt;c++){const h=ws(t,l,i);t=h.U,l=h.V,s.push({U:t,V:l,L:tt(t,l)})}return s}function Yn({titel:r,A:i,spalten:t,farbe:l,zelle:s,stellen:c=2}){return e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-xs",style:{color:l},children:r}),e.jsx("div",{className:"inline-grid gap-1",style:{gridTemplateColumns:`repeat(${t}, 3.5rem)`},children:i.map((h,x)=>h.map((d,f)=>{const j=s?s(x,f,d):{text:u(d,c),farbe:""};return e.jsx("span",{className:"rounded border border-slate-300 px-1 py-0.5 text-center font-mono text-xs dark:border-slate-600 [.w-dark_&]:border-slate-600",style:j.farbe?{color:j.farbe}:void 0,children:j.text},`${x}-${f}`)}))})]})}function vs(){const[r,i]=E.useState(.05),[t,l]=E.useState(0),[s,c]=E.useState(1),h=E.useMemo(()=>st(1,r),[r]),x=E.useMemo(()=>st(2,r),[r]),d=[1,2].map(S=>{const w=S===1?h:x,B=w[t];return{k:S,bahn:w,jetzt:B,S:Zn(B.U,Ri(B.V))}}),f=d[s-1],j=kr(f.jetzt.U,f.jetzt.V),D=Zn(j,f.jetzt.V).map(S=>S.map(w=>-w)),a=Zn(Ri(j),f.jetzt.U).map(S=>S.map(w=>-w)),A=Math.max(1,Math.ceil((t+1)/40)),z=(S,w)=>S.slice(0,t+1).map((B,k)=>({x:k,y:Math.log10(Math.max(B.L,1e-12)),color:w})).filter((B,k)=>k%A===0||k===t).filter(B=>Number.isFinite(B.y)),p=[...z(h,Vn),...z(x,it)],R=p.map(S=>S.y),M=R.length?Math.min(...R):-1,F=R.length?Math.max(...R):2,_=F-M<1?[M-.5,M+1.5]:[M-.3,F+.3],y=d.some(S=>!Number.isFinite(S.jetzt.L)),g=d.every(S=>Number.isFinite(S.jetzt.L)&&S.jetzt.L<.001),m=d.map(S=>S.S[0][2]),b=d.map(S=>S.S[1][1]),N=Math.abs(m[0]-m[1]);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Lassen wir beide Modelle mit demselben α laufen und vergleichen die grünen Vorhersagen, sobald der Verlust bei beiden auf null gefallen ist."}),e.jsx(Yn,{titel:"Y auf Ω (Lücken: ?)",A:Mt,spalten:3,farbe:Vn,zelle:(S,w,B)=>ur[S][w]===1?{text:u(B,1),farbe:Vn}:{text:"?",farbe:"var(--w-muted, #64748b)"}}),e.jsxs("div",{className:"flex flex-wrap gap-6",children:[d.map(S=>e.jsxs("div",{className:"space-y-1",children:[e.jsxs("p",{className:"text-sm font-semibold",children:["Rang k = ",S.k]}),e.jsx(Yn,{titel:"UVᵀ (Lücken grün)",A:S.S,spalten:3,farbe:Pn,zelle:(w,B,k)=>({text:Number.isFinite(k)?u(k,3):"–",farbe:ur[w][B]===1?Vn:Pn})}),e.jsxs("p",{className:"font-mono text-xs",children:["L ="," ",e.jsx("span",{style:{color:Number.isFinite(S.jetzt.L)?Vn:Ti},children:u(S.jetzt.L,6)})]})]},S.k)),e.jsxs("div",{className:"min-w-0 grow basis-56",children:[e.jsx(Fi,{xLabel:"t (Schritt)",yLabel:"log₁₀ L",series:[],markers:p,xDomain:[0,Math.max(10,t)],yDomain:_,width:300,height:210,ariaLabel:"Der Verlust beider Modelle je Schritt auf logarithmischer Skala."}),e.jsxs("p",{className:`mt-1 text-xs ${Y}`,children:[e.jsx("span",{style:{color:Vn},children:"●"})," k = 1  ",e.jsx("span",{style:{color:it},children:"●"})," k = 2"]})]})]}),e.jsx(I,{label:"α (Lernrate)",value:r,onChange:S=>{i(Math.round(S*1e3)/1e3),l(0)},min:.01,max:.3,step:.005,accent:Qn,fmt:S=>u(S,3)}),e.jsx(qi,{step:t,setStep:l,max:Rt,narration:e.jsxs(e.Fragment,{children:["t = ",t,": L₍k=1₎ = ",u(d[0].jetzt.L,6),", L₍k=2₎ ="," ",u(d[1].jetzt.L,6)]})}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:[e.jsxs("span",{className:`text-xs ${Y}`,children:["Gradienten aus ",V("satz:gradienten-der-completion")," für:"]}),[1,2].map(S=>e.jsxs("button",{type:"button","aria-pressed":s===S,className:s===S?pe:ie,onClick:()=>c(S),children:["k = ",S]},S))]}),e.jsxs("div",{className:"flex flex-wrap gap-6",children:[e.jsx(Yn,{titel:"PΩ ⊙ (Y − UVᵀ)",A:j,spalten:3,farbe:Ti,zelle:(S,w,B)=>({text:u(B,3),farbe:Ti})}),e.jsx(Yn,{titel:"∂L/∂U",A:D,spalten:s,farbe:Qn,zelle:(S,w,B)=>({text:u(B,3),farbe:Qn})}),e.jsx(Yn,{titel:"∂L/∂V",A:a,spalten:s,farbe:Qn,zelle:(S,w,B)=>({text:u(B,3),farbe:Qn})})]}),e.jsx(ve,{kind:y?"fail":g?"warn":"neutral",children:y?e.jsxs(e.Fragment,{children:["Bei dieser Lernrate wachsen die Einträge von U und V über jede Grenze, das Produkt der Überläufe ist keine Zahl mehr und L wird undefiniert. ",V("satz:gradienten-der-completion")," liefert weiter die richtigen Gradienten, nur die Schrittweite ist zu groß. Zurücksetzen und α kleiner wählen."]}):g?e.jsxs(e.Fragment,{children:["Beide Modelle haben den Verlust praktisch auf null gedrückt (L ="," ",e.jsx("span",{className:"font-mono",children:u(d[0].jetzt.L,6)})," bzw."," ",e.jsx("span",{className:"font-mono",children:u(d[1].jetzt.L,6)}),") und treffen die vier beobachteten Einträge exakt. Für die Lücken sagen sie trotzdem verschiedenes voraus:"," ",e.jsxs("span",{className:"font-mono",style:{color:Pn},children:["y₁₃ = ",u(m[0],3)]})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:Pn},children:u(m[1],3)})," ","und"," ",e.jsxs("span",{className:"font-mono",style:{color:Pn},children:["y₂₂ = ",u(b[0],3)]})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:Pn},children:u(b[1],3)}),". Mit k = 1 ist die Antwort eindeutig: drei Beobachtungen legen die Verhältnisse fest, die vierte fixiert den Rest. Mit k = 2 stehen zehn Parameter vier Beobachtungen gegenüber, und wohin die Vorhersage läuft, entscheidet allein der Startpunkt. Ein kleiner Verlust ist deshalb kein Gütesiegel für die Lücken."]}):e.jsxs(e.Fragment,{children:["Nach ",t," Schritten steht der Verlust bei"," ",e.jsx("span",{className:"font-mono",children:u(d[0].jetzt.L,6)})," (k = 1) und"," ",e.jsx("span",{className:"font-mono",children:u(d[1].jetzt.L,6)})," (k = 2). Die roten Residuen sind die Abweichungen auf den beobachteten Plätzen; auf den beiden Lücken steht dort null, weil PΩ sie ausblendet. Die orangen Gradienten sind die Bausteine des nächsten Schritts. Die beiden Vorhersagen für y₁₃ unterscheiden sich derzeit um"," ",e.jsx("span",{className:"font-mono",children:u(N,3)}),"."]})})]})}function zs(){return e.jsx(Ce,{variante:"auswahl",frage:e.jsx(e.Fragment,{children:"Beide Modelle drücken den Verlust auf den beobachteten Einträgen auf null. Sagen sie dann auch dieselben Werte für die beiden Lücken voraus?"}),optionen:[{id:"ja",text:"ja, der Verlust bestimmt alles"},{id:"nein",text:"nein, die Lücken bleiben offen"}],loesung:"nein",verdeckt:e.jsx("p",{className:"text-sm",children:"Der Verlust misst nur die beobachteten Plätze. Was auf den Lücken steht, legt erst die Modellklasse fest, und k = 2 ist so groß, dass sie nichts mehr festlegt."}),children:e.jsx(vs,{})})}function lt(r){const i={a:"a",em:"em",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",strong:"strong",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Zwei Felder der Tabelle aus ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` haben wir noch nicht besetzt. Im einen
steht eine Matrix als Ausgabe und ein Skalar als Eingabe, im anderen genau umgekehrt. Beide Fälle
kommen in der Statistik ständig vor, und beide brauchen kein neues Werkzeug: Wir leiten
Eintrag für Eintrag ab und sortieren die Ergebnisse so, dass die Bedingung aus
`,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` wieder in der gewohnten Gestalt dasteht. Die eigentliche Arbeit steckt in
der Buchführung, nicht in der Analysis.`]}),`
`,e.jsx(i.h3,{children:"Skalar zu Matrix"}),`
`,e.jsx(i.p,{children:`Beginnen wir mit dem Fall, in dem eine ganze Matrix an einer einzigen Zahl hängt. Eine
Kovarianzmatrix, die von einem Korrelationsparameter abhängt, ist so ein Objekt, ebenso eine
Modellmatrix, in der ein Bandbreitenparameter steckt. Formal betrachten wir`}),`
`,e.jsx(o,{children:`\\bF\\colon \\R \\to \\R^{m \\times n}, \\qquad
\\cblue{\\bF(x)} = \\begin{pmatrix}
f_{11}(x) & \\cdots & f_{1n}(x) \\\\
\\vdots & \\ddots & \\vdots \\\\
f_{m1}(x) & \\cdots & f_{mn}(x)
\\end{pmatrix} .`}),`
`,e.jsxs(i.p,{children:["Jeder der ",e.jsx(n,{children:"m \\cdot n"}),` Einträge ist eine gewöhnliche Funktion einer reellen Variablen. Wir
können also jeden einzeln ableiten und die Ergebnisse an ihrem Platz stehen lassen.`]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.4.1 (Ableitung einer matrixwertigen Funktion nach einem Skalar)",id:"env-ableitung-einer-matrixwertigen-funktion",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{m \\times n}"})," so, dass alle Einträge ",e.jsx(n,{children:"f_{ij}"}),` an der Stelle
`,e.jsx(n,{children:"x \\in \\R"})," ",e.jsx(v,{id:"differentiability",children:"differenzierbar"})," sind. Dann heißt"]}),e.jsx(T,{tag:"10.4.1",id:"eq-ableitung-einer-matrixwertigen-funktion",children:`\\corange{\\frac{\\partial \\bF(x)}{\\partial x}} = \\begin{pmatrix}
\\tfrac{\\partial f_{11}(x)}{\\partial x} & \\cdots & \\tfrac{\\partial f_{1n}(x)}{\\partial x} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\tfrac{\\partial f_{m1}(x)}{\\partial x} & \\cdots & \\tfrac{\\partial f_{mn}(x)}{\\partial x}
\\end{pmatrix} \\in \\R^{m \\times n}`}),e.jsxs(i.p,{children:["die ",e.jsxs(i.em,{children:["Ableitung von ",e.jsx(n,{children:"\\bF"})," nach ",e.jsx(n,{children:"x"})]}),". Es gilt dann"]}),e.jsx(T,{tag:"10.4.2",id:"eq-ableitung-einer-matrixwertigen-funktion-2",children:`\\cblue{\\bF(x + h)} = \\cblue{\\bF(x)} + \\cgreen{D_x \\bF(h)} + \\cred{o(\\left|h\\right|)}
\\qquad \\text{mit} \\qquad
\\cgreen{D_x \\bF(h)} = \\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\, h .`})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.4.2 (Das Format bleibt erhalten)",id:"env-das-format-bleibt-erhalten",children:[e.jsx(i.p,{children:"Drei Beobachtungen zur Definition."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Ableitung hat dieselbe Gestalt wie die Funktion."})," Sowohl ",e.jsx(n,{children:"\\cblue{\\bF(x)}"}),` als auch
`,e.jsx(n,{children:"\\corange{\\partial \\bF(x)/\\partial x}"})," liegen in ",e.jsx(n,{children:"\\R^{m \\times n}"}),`. Das ist bequem, verführt
aber dazu, beide zu verwechseln; die orange Matrix enthält Steigungen, die blaue
Funktionswerte. Für `,e.jsx(n,{children:"n = 1"})," steht in ",e.jsx(i.a,{href:"#eq-ableitung-einer-matrixwertigen-funktion",children:"(10.4.1)"}),` der Fall Skalar zu Vektor, den
`,e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"})," als Jacobimatrix mit einer einzigen Spalte führt."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum die Ableitung eine Matrix sein darf."})," Nach ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` ist die Ableitung eine
lineare Abbildung `,e.jsx(n,{children:"\\cgreen{D_x \\bF}\\colon \\R \\to \\R^{m \\times n}"}),`. Eine lineare Abbildung
mit eindimensionalem Definitionsbereich ist durch ihren Wert an der Stelle `,e.jsx(n,{children:"1"}),` vollständig
festgelegt, denn `,e.jsx(n,{children:"\\cgreen{D_x \\bF(h)} = h \\cdot \\cgreen{D_x \\bF(1)}"}),`. Dieser eine Wert ist
die Matrix `,e.jsx(i.a,{href:"#eq-ableitung-einer-matrixwertigen-funktion",children:"(10.4.1)"}),`. Dasselbe Argument hat in
`,e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"})," aus der Ableitung ",e.jsx(n,{children:"f'(x)"})," eine Zahl gemacht."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Restterm."})," In ",e.jsx(i.a,{href:"#eq-ableitung-einer-matrixwertigen-funktion-2",children:"(10.4.2)"})," misst ",e.jsx(n,{children:"\\cred{o(\\left|h\\right|)}"}),` eine Matrix, wir brauchen dort
also eine `,e.jsx(v,{id:"matrix-norm",children:"Matrixnorm"}),`, etwa die Frobenius-Norm aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),`. Da die Bedingung eintragsweise nachgerechnet
wird und in endlich-dimensionalen Räumen alle Normen äquivalent sind, spielt die Wahl keine
Rolle.`]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.4.3 (Übung: eine 2×3-Matrixfunktion)",id:"env-uebung-eine-2-3-matrixfunktion",children:[e.jsx(i.p,{children:"Sei"}),e.jsx(o,{children:`\\cblue{\\bF(x)} = \\begin{pmatrix}
x^2 & 2e^x & 0 \\\\
0 & x & \\ln(x)
\\end{pmatrix} ,
\\qquad x > 0 .`}),e.jsxs(i.p,{children:["Die Einschränkung auf ",e.jsx(n,{children:"x > 0"}),` kommt vom Logarithmus im letzten Eintrag. Was ist
`,e.jsx(n,{children:"\\corange{\\partial \\bF(x)/\\partial x}"}),`? Das ist eine gute Stelle für einen eigenen Versuch,
bevor wir weiterlesen.`]}),e.jsxs("details",{className:"mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40",children:[e.jsx("summary",{className:"cursor-pointer select-none font-medium",children:"Lösung anzeigen"}),e.jsxs("div",{className:"space-y-2 pt-2",children:[e.jsx(i.p,{children:`Ableiten heißt hier schlicht: sechsmal die Schulregeln anwenden und das Ergebnis an
derselben Stelle notieren.`}),e.jsx(o,{children:`\\corange{\\frac{\\partial \\bF(x)}{\\partial x}} = \\begin{pmatrix}
2x & 2e^x & 0 \\\\
0 & 1 & 1/x
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Der konstante Eintrag ",e.jsx(n,{children:"0"})," bleibt ",e.jsx(n,{children:"0"}),", und ",e.jsx(n,{children:"2e^x"}),` steht unverändert da, weil die
Exponentialfunktion ihre eigene Ableitung ist. An der Stelle `,e.jsx(n,{children:"x = 2"}),` etwa lauten die
Einträge `,e.jsx(n,{children:"4"}),", ",e.jsx(n,{children:"2e^2 \\approx 14{,}778"}),", ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"0{,}5"}),"."]})]})]})]}),`
`,e.jsx(i.h4,{children:"Kennzahlen von F ableiten"}),`
`,e.jsxs(i.p,{children:["Interessant wird es, wenn wir nicht ",e.jsx(n,{children:"\\bF"}),` selbst ableiten wollen, sondern eine Größe, die aus
`,e.jsx(n,{children:"\\bF"})," gewonnen wird: die ",e.jsx(v,{id:"trace",children:"Spur"}),", die ",e.jsx(v,{id:"determinant",children:"Determinante"}),` oder die
`,e.jsx(v,{id:"matrix-inverse",children:"Inverse"}),`. Für alle drei gibt es geschlossene Formeln, die mit
`,e.jsx(n,{children:"\\corange{\\partial \\bF(x)/\\partial x}"}),` auskommen. Ein Wort zu den Voraussetzungen vorweg: Alle
drei Größen sind nur für quadratische Matrizen erklärt. Ab hier setzen wir deshalb
`,e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{n \\times n}"})," voraus; nur ",e.jsx(i.a,{href:"#env-ableitung-einer-matrixwertigen-funktion",children:"Definition 10.4.1"}),` selbst kommt mit beliebigen
Formaten aus.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.4.4 (Identitäten für Skalar zu Matrix)",id:"env-identitaeten-fuer-skalar-zu-matrix",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{n \\times n}"})," an der Stelle ",e.jsx(n,{children:"x"})," differenzierbar. Dann gilt"]}),e.jsx(T,{tag:"10.4.3",id:"eq-identitaeten-fuer-skalar-zu-matrix",children:`\\frac{\\partial \\tr\\bigl(\\cblue{\\bF(x)}\\bigr)}{\\partial x}
= \\tr\\biggl(\\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\biggr) ,`}),e.jsxs(i.p,{children:["und falls ",e.jsx(n,{children:"\\cblue{\\bF(x)}"})," zusätzlich invertierbar ist, auch"]}),e.jsx(T,{tag:"10.4.4",id:"eq-identitaeten-fuer-skalar-zu-matrix-2",children:`\\frac{\\partial \\det\\bigl(\\cblue{\\bF(x)}\\bigr)}{\\partial x}
= \\det\\bigl(\\cblue{\\bF(x)}\\bigr)\\,
\\tr\\biggl[\\cblue{\\bF(x)}^{-1} \\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\biggr]`}),e.jsx(i.p,{children:"sowie"}),e.jsx(T,{tag:"10.4.5",id:"eq-identitaeten-fuer-skalar-zu-matrix-3",children:`\\frac{\\partial \\cblue{\\bF(x)}^{-1}}{\\partial x}
= -\\cblue{\\bF(x)}^{-1} \\corange{\\frac{\\partial \\bF(x)}{\\partial x}} \\cblue{\\bF(x)}^{-1} .`}),e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"})," heißt ",e.jsx(i.em,{children:"Jacobi-Formel"})," (Jacobi's formula)."]})]}),`
`,e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-spur",children:"Definition 3.1.2"})," der Spur (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),"): Summe der Diagonaleinträge"]}),children:[e.jsxs(i.p,{children:["Wir beweisen die Spur-Identität ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix",children:"(10.4.3)"}),`; die beiden anderen Formeln übernehmen wir aus der
Literatur (MML §5.5) und prüfen sie am Ende dieses Abschnitts numerisch nach. Der Beweis kommt
mit einer einzigen Beobachtung aus, denn die Spur liest nur die Diagonale:`]}),e.jsx(o,{children:"\\tr\\bigl(\\cblue{\\bF(x)}\\bigr) = \\sum_{i=1}^n f_{ii}(x) ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["die Ableitung einer endlichen Summe ist die Summe der Ableitungen; jedes ",e.jsx(n,{children:"f_{ii}"})," ist nach Voraussetzung differenzierbar"]}),children:[e.jsx(i.p,{children:`Die rechte Seite ist eine endliche Summe von Funktionen einer Variablen. Wir dürfen also
gliedweise ableiten:`}),e.jsx(o,{children:`\\frac{\\partial}{\\partial x} \\tr\\bigl(\\cblue{\\bF(x)}\\bigr)
= \\frac{\\partial}{\\partial x} \\sum_{i=1}^n f_{ii}(x)
= \\sum_{i=1}^n \\frac{\\partial f_{ii}(x)}{\\partial x} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["der Eintrag ",e.jsx(n,{children:"(i,i)"})," von ",e.jsx(n,{children:"\\corange{\\partial \\bF(x)/\\partial x}"})," ist gerade ",e.jsx(n,{children:"\\partial f_{ii}(x)/\\partial x"})]}),children:[e.jsxs(i.p,{children:["Rechts steht nun die Summe der Diagonaleinträge derjenigen Matrix, die in ",e.jsx(i.a,{href:"#eq-ableitung-einer-matrixwertigen-funktion",children:"(10.4.1)"}),`
definiert wurde, also`]}),e.jsx(o,{children:`\\sum_{i=1}^n \\frac{\\partial f_{ii}(x)}{\\partial x}
= \\tr\\biggl(\\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\biggr) .`})]})]}),`
`,e.jsxs(i.p,{children:[`Hinter dem Beweis steckt ein Prinzip, das über die Spur hinausreicht: Die Spur ist eine
lineare Abbildung von `,e.jsx(n,{children:"\\R^{n \\times n}"})," nach ",e.jsx(n,{children:"\\R"}),`, und lineare Abbildungen vertauschen mit
dem Ableiten. Wo eine Größe linear in den Einträgen ist, dürfen wir Ableiten und
Auswerten in beliebiger Reihenfolge ausführen. Determinante und Inverse sind dagegen nicht
linear, und man sieht ihren Formeln `,e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"})," und ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-3",children:"(10.4.5)"})," an, dass dort mehr passiert."]}),`
`,e.jsx(xe,{title:"Die Jacobi-Formel an einem Diagonalbeispiel nachgerechnet",children:e.jsxs(q,{kind:"Beispiel",label:"10.4.5 (Die Jacobi-Formel an einem Diagonalbeispiel)",id:"env-die-jacobi-formel-an-einem",children:[e.jsx(i.p,{children:"Sei"}),e.jsx(o,{children:"\\cblue{\\bF(x)} = \\begin{pmatrix} x & 0 \\\\ 0 & 2x \\end{pmatrix} ."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Direkt."})," Die Determinante einer ",e.jsx(v,{id:"diagonal-matrix",children:"Diagonalmatrix"}),` ist das Produkt der
Diagonaleinträge, also`]}),e.jsx(o,{children:`\\det\\bigl(\\cblue{\\bF(x)}\\bigr) = x \\cdot 2x = 2x^2
\\quad \\impl \\quad
\\frac{\\partial}{\\partial x}\\det\\bigl(\\cblue{\\bF(x)}\\bigr) = 4x .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Über die Jacobi-Formel."})," Wir brauchen die beiden Zutaten"]}),e.jsx(o,{children:`\\corange{\\frac{\\partial \\bF(x)}{\\partial x}} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 2 \\end{pmatrix} ,
\\qquad
\\cblue{\\bF(x)}^{-1} = \\begin{pmatrix} 1/x & 0 \\\\ 0 & 1/(2x) \\end{pmatrix}
\\quad (x \\neq 0) ,`}),e.jsx(i.p,{children:"und multiplizieren sie:"}),e.jsx(o,{children:`\\cblue{\\bF(x)}^{-1} \\corange{\\frac{\\partial \\bF(x)}{\\partial x}}
= \\begin{pmatrix} 1/x & 0 \\\\ 0 & 1/(2x) \\end{pmatrix}
  \\begin{pmatrix} 1 & 0 \\\\ 0 & 2 \\end{pmatrix}
= \\begin{pmatrix} 1/x & 0 \\\\ 0 & 1/x \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die Spur dieses Produkts ist ",e.jsx(n,{children:"1/x + 1/x = 2/x"}),", und ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"})," liefert"]}),e.jsx(o,{children:`\\det\\bigl(\\cblue{\\bF(x)}\\bigr) \\cdot
\\tr\\biggl[\\cblue{\\bF(x)}^{-1} \\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\biggr]
= 2x^2 \\cdot \\frac{2}{x} = 4x .`}),e.jsxs(i.p,{children:[`Beide Wege stimmen überein. Wichtig ist dabei die Spur auf der rechten Seite: Ohne sie stünde
dort ein Produkt aus einer Zahl und einer Matrix, also gar keine Zahl, während links die
Ableitung einer skalaren Größe steht. Und noch eine Feinheit: Die Jacobi-Formel
verlangt `,e.jsx(n,{children:"x \\neq 0"}),", während die direkte Rechnung auch bei ",e.jsx(n,{children:"x = 0"})," durchläuft und dort ",e.jsx(n,{children:"0"}),`
liefert. Die Invertierbarkeit in `,e.jsx(i.a,{href:"#env-identitaeten-fuer-skalar-zu-matrix",children:"Satz 10.4.4"}),` ist also eine Voraussetzung der Formel, keine
Bedingung dafür, dass die Ableitung existiert.`]})]})}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.4.6 (Warum das in der Statistik gebraucht wird)",id:"env-warum-das-in-der-statistik-gebraucht",children:[e.jsxs(i.p,{children:[`Die Log-Dichte eines multivariaten Normalmodells enthält die Kovarianzmatrix
`,e.jsx(n,{children:"\\bSigma(\\theta)"})," gleich zweimal: einmal als ",e.jsx(n,{children:"\\log\\det\\bigl(\\bSigma(\\theta)\\bigr)"}),` und einmal
als `,e.jsx(n,{children:"\\bSigma(\\theta)^{-1}"}),` in der quadratischen Form. Wer die Score-Funktion aufstellen will,
also die Ableitung der Log-`,e.jsx(v,{id:"likelihood",children:"Likelihood"})," nach ",e.jsx(n,{children:"\\theta"}),`, braucht deshalb genau
`,e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"})," und ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-3",children:"(10.4.5)"}),". Aus der Jacobi-Formel wird mit der Kettenregel"]}),e.jsx(o,{children:`\\frac{\\partial \\log\\det\\bigl(\\bSigma(\\theta)\\bigr)}{\\partial \\theta}
= \\tr\\biggl[\\bSigma(\\theta)^{-1} \\frac{\\partial \\bSigma(\\theta)}{\\partial \\theta}\\biggr] ,`}),e.jsxs(i.p,{children:["denn die äußere Ableitung des Logarithmus liefert den Faktor ",e.jsx(n,{children:"1/\\det(\\bSigma)"}),`, und der kürzt
sich gegen das `,e.jsx(n,{children:"\\det(\\bSigma)"})," aus ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"}),`. Das ist eine der meistbenutzten Formeln der
Statistik.`]})]}),`
`,e.jsxs(i.p,{children:[`Stimmen diese drei Formeln wirklich, oder merken wir uns nur Muster? Eine Probe ist
schnell gemacht: Wir werten `,e.jsx(n,{children:"\\bF"})," numerisch an ",e.jsx(n,{children:"x \\pm 10^{-5}"}),` aus und stellen den
Differenzenquotienten neben den Formelwert.`]}),`
`,e.jsxs(me,{title:"Die drei Identitäten gegen numerische Ableitungen halten",children:[e.jsxs(i.p,{children:["Die numerische Spalte kennt keine der Formeln, die Formelspalte rechnet mit ",e.jsx(i.a,{href:"#env-identitaeten-fuer-skalar-zu-matrix",children:"Satz 10.4.4"}),`.
Drei Beispiele stehen zur Wahl: die Diagonalmatrix
`,e.jsx(n,{children:"\\bF(x) = \\diag(x,2x)"}),`, eine Matrix, in der
jeder Eintrag anders von `,e.jsx(n,{children:"x"})," abhängt (einer gar nicht), und eine Drehmatrix."]}),e.jsx(gs,{}),e.jsxs(i.p,{children:[`Alle drei Identitäten halten über den ganzen Reglerbereich stand; die größte Abweichung
liegt unter `,e.jsx(n,{children:"10^{-9}"}),` und ist der Abbruchfehler des Differenzenquotienten, nicht ein Fehler
der Formel. Zwei Stellen lohnen einen zweiten Blick: Die Drehmatrix hat die konstante
Determinante `,e.jsx(n,{children:"1"}),", also muss ",e.jsx(n,{children:"\\tr[\\bF^{-1}\\, \\partial \\bF/\\partial x]"}),` verschwinden. Und bei
der Diagonalmatrix zeigt der Schieber die Lücke bei `,e.jsx(n,{children:"x = 0"}),": Dort ist ",e.jsx(n,{children:"\\bF"}),` singulär, die
Determinanten- und die Inversenformel setzen aber beide `,e.jsx(n,{children:"\\bF^{-1}"}),` voraus, während die
Spur-Identität auch dort gilt.`]})]}),`
`,e.jsx(i.h3,{children:"Matrix zu Skalar"}),`
`,e.jsxs(i.p,{children:["Jetzt drehen wir die Richtung um. Eine ",e.jsx(v,{id:"objective-function",children:"Verlustfunktion"}),` bewertet eine
ganze Matrix und gibt dafür eine einzige Zahl zurück. Die Gewichtsmatrix einer Netzschicht,
die Faktormatrix einer Zerlegung, die Kovarianzmatrix eines Modells: In allen Fällen wollen
wir wissen, wie sich der Wert ändert, wenn wir an einem einzelnen Eintrag drehen. So lautet
dann auch die Definition.`]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.4.7 (Ableitung nach einer Matrix)",id:"env-ableitung-nach-einer-matrix",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^{m \\times n} \\to \\R"}),` an der Stelle
`,e.jsx(n,{children:"\\bX = (x_{ij}) \\in \\R^{m \\times n}"}),` Fréchet-differenzierbar. Dann existieren
alle `,e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"})," nach den Einträgen von ",e.jsx(n,{children:"\\bX"}),`,
und die Matrix`]}),e.jsx(T,{tag:"10.4.6",id:"eq-ableitung-nach-einer-matrix",children:`\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}} = \\begin{pmatrix}
\\partial f(\\bX) / \\partial x_{11} & \\cdots & \\partial f(\\bX) / \\partial x_{1n} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\partial f(\\bX) / \\partial x_{m1} & \\cdots & \\partial f(\\bX) / \\partial x_{mn}
\\end{pmatrix} \\in \\R^{m \\times n}`}),e.jsxs(i.p,{children:["heißt die ",e.jsxs(i.em,{children:["Ableitung von ",e.jsx(n,{children:"f"})," nach ",e.jsx(n,{children:"\\bX"})]})," oder ",e.jsx(i.em,{children:"Gradientenmatrix"}),`. Sie stellt die
Fréchet-Ableitung dar:`]}),e.jsx(T,{tag:"10.4.7",id:"eq-ableitung-nach-einer-matrix-2",children:`\\cblue{f(\\bX + \\bH)} = \\cblue{f(\\bX)} + \\cgreen{D_{\\bX} f(\\bH)} + \\cred{o(\\left\\|\\bH\\right\\|)}
\\qquad \\text{mit} \\qquad
\\cgreen{D_{\\bX} f(\\bH)} = \\tr\\Biggl(\\corange{\\biggl(\\frac{\\partial f(\\bX)}{\\partial \\bX}\\biggr)^{\\!\\top}}\\bH\\Biggr) .`})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.4.8 (Der Ableitungsterm ist ein Skalarprodukt)",id:"env-der-ableitungsterm-ist-ein-skalarprodukt",children:[e.jsxs(i.p,{children:["Die Spur in ",e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"}),` sieht auf den ersten Blick nach einem Trick aus. Sie ist aber genau
das, was wir schon kennen. Für zwei Matrizen `,e.jsx(n,{children:"\\bA, \\bB \\in \\R^{m \\times n}"})," gilt"]}),e.jsx(T,{tag:"10.4.8",id:"eq-der-ableitungsterm-ist-ein-skalarprodukt",children:"\\tr\\bigl(\\bA^\\top\\bB\\bigr) = \\sum_{i=1}^m \\sum_{j=1}^n a_{ij} b_{ij} ,"}),e.jsxs(i.p,{children:[`und rechts steht das Skalarprodukt der beiden Matrizen, wenn wir sie als lange Vektoren der
Länge `,e.jsx(n,{children:"m \\cdot n"})," lesen. Man nennt es das ",e.jsx(i.em,{children:"Frobenius-Skalarprodukt"}),"; für ",e.jsx(n,{children:"\\bA = \\bB"}),` ergibt
es das Quadrat der Frobenius-Norm aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),", was ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-frobenius-norm-ueber-die-spur",children:"Satz 3.1.10"}),` dort als
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F = \\sqrt{\\tr(\\bA^\\top\\bA)}"})," festhält. Damit lesen wir ",e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"})," so:"]}),e.jsx(o,{children:`\\cgreen{D_{\\bX} f(\\bH)}
= \\sum_{i=1}^m \\sum_{j=1}^n \\corange{\\frac{\\partial f(\\bX)}{\\partial x_{ij}}}\\, h_{ij} .`}),e.jsxs(i.p,{children:[`Der Ableitungsterm summiert also über alle Einträge das Produkt aus Steigung und Auslenkung.
Beim Gradienten in `,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` stand an dieser Stelle das gewöhnliche
Skalarprodukt `,e.jsx(n,{children:"\\nabla f(\\bx)\\, \\bh"}),`; hier ist es dieselbe Rechnung, nur mit zwei
Indexrichtungen. Setzen wir speziell `,e.jsx(n,{children:"\\bH = h \\cdot \\bE_{ij}"}),", wobei ",e.jsx(n,{children:"\\bE_{ij}"}),` die Matrix
mit einer `,e.jsx(n,{children:"1"})," an der Stelle ",e.jsx(n,{children:"(i,j)"}),` und sonst lauter Nullen ist, so bleibt von der Summe nur
ein Term übrig, nämlich `,e.jsx(n,{children:"h \\cdot \\partial f(\\bX)/\\partial x_{ij}"}),`. Das ist die
Rechtfertigung dafür, die Ableitung eintragsweise zu definieren.`]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.4.9 (Ableitung von f(X) = aᵀXb)",id:"env-ableitung-von-f-x-a-xb",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\ba \\in \\R^m"})," und ",e.jsx(n,{children:"\\bb \\in \\R^n"}),` fest und
`,e.jsx(n,{children:"\\cblue{f(\\bX)} = \\ba^\\top \\bX \\bb"}),`. Schreiben wir das Produkt aus, so steht dort eine
Doppelsumme:`]}),e.jsx(o,{children:`\\cblue{f(\\bX)} = \\sum_{i=1}^m \\sum_{j=1}^n a_i\\, x_{ij}\\, b_j
\\quad \\impl \\quad
\\corange{\\frac{\\partial f(\\bX)}{\\partial x_{ij}}} = a_i b_j .`}),e.jsxs(i.p,{children:["In der Doppelsumme kommt ",e.jsx(n,{children:"x_{ij}"})," genau einmal vor, und zwar mit dem Vorfaktor ",e.jsx(n,{children:"a_i b_j"}),`;
alle anderen Summanden sind bezüglich `,e.jsx(n,{children:"x_{ij}"}),` konstant. Sortieren wir die Ergebnisse
zurück in eine Matrix, erkennen wir ein `,e.jsx(v,{id:"outer-product",children:"äußeres Produkt"}),":"]}),e.jsx(T,{tag:"10.4.9",id:"eq-ableitung-von-f-x-a-xb",children:`\\corange{\\frac{\\partial \\ba^\\top \\bX \\bb}{\\partial \\bX}} = \\begin{pmatrix}
a_1 b_1 & \\cdots & a_1 b_n \\\\
\\vdots & \\ddots & \\vdots \\\\
a_m b_1 & \\cdots & a_m b_n
\\end{pmatrix} = \\ba \\bb^\\top .`}),e.jsxs(i.p,{children:["Setzen wir das in ",e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"})," ein, so lässt sich die Spur wieder auflösen:"]}),e.jsx(o,{children:`\\cgreen{D_{\\bX} f(\\bH)}
= \\tr\\bigl(\\bigl(\\ba\\bb^\\top\\bigr)^\\top \\bH\\bigr)
= \\tr\\bigl(\\bb\\ba^\\top \\bH\\bigr)
= \\ba^\\top \\bH \\bb .`}),e.jsxs(i.p,{children:["Im letzten Schritt steckt die zyklische Vertauschung aus ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-eigenschaften-der-spur",children:"Satz 3.1.4"}),": ",e.jsx(n,{children:"\\ba^\\top\\bH\\bb"}),` ist
eine `,e.jsx(n,{children:"1 \\times 1"}),`-Matrix und damit gleich ihrer eigenen Spur. Die Probe ist nun leicht, denn
`,e.jsx(n,{children:"f"})," ist linear in ",e.jsx(n,{children:"\\bX"}),":"]}),e.jsx(o,{children:`\\cblue{f(\\bX + \\bH)} = \\ba^\\top \\bX \\bb + \\ba^\\top \\bH \\bb
= \\cblue{f(\\bX)} + \\cgreen{D_{\\bX} f(\\bH)} .`}),e.jsxs(i.p,{children:["Der Restterm ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bH\\right\\|)}"}),` ist hier also nicht bloß klein, sondern exakt
null. Bei einer linearen Funktion muss das so sein: Ihre beste lineare Näherung ist sie
selbst.`]})]}),`
`,e.jsx(i.h4,{children:"Identitäten zum Nachschlagen"}),`
`,e.jsxs(q,{kind:"Satz",label:"10.4.10 (Identitäten für Matrix zu Skalar)",id:"env-identitaeten-fuer-matrix-zu-skalar",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bX \\in \\R^{m \\times n}"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Quadratische Form."})," Für ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` und
`,e.jsx(n,{children:"f(\\bX) = \\tr\\bigl(\\bX\\bA\\bX^\\top\\bigr)"})," gilt"]}),`
`,e.jsx(T,{tag:"10.4.10",id:"eq-identitaeten-fuer-matrix-zu-skalar",children:"\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}} = \\bX\\bigl(\\bA + \\bA^\\top\\bigr) ,"}),`
`,e.jsxs(i.p,{children:["für ",e.jsx(v,{id:"symmetric-matrix",children:"symmetrisches"})," ",e.jsx(n,{children:"\\bA"})," also ",e.jsx(n,{children:"2\\bX\\bA"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Spur-Produkt."})," Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," und ",e.jsx(n,{children:"f(\\bX) = \\tr\\bigl(\\bA^\\top\\bX\\bigr)"}),`
gilt`]}),`
`,e.jsx(T,{tag:"10.4.11",id:"eq-identitaeten-fuer-matrix-zu-skalar-2",children:"\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}} = \\bA ."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Frobenius-Norm."})," Für ",e.jsx(n,{children:"f(\\bX) = \\left\\|\\bX\\right\\|_F^2 = \\tr\\bigl(\\bX^\\top\\bX\\bigr)"})," gilt"]}),`
`,e.jsx(T,{tag:"10.4.12",id:"eq-identitaeten-fuer-matrix-zu-skalar-3",children:"\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}} = 2\\bX ."}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Alle drei Formeln lassen sich als Muster lesen. Hinter ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar-2",children:"(10.4.11)"}),` steckt nichts weiter als
`,e.jsx(i.a,{href:"#eq-der-ableitungsterm-ist-ein-skalarprodukt",children:"(10.4.8)"}),": Dort ist ",e.jsx(n,{children:"f"})," das Frobenius-Skalarprodukt von ",e.jsx(n,{children:"\\bA"})," mit ",e.jsx(n,{children:"\\bX"}),`, und die Ableitung
ist der Partner `,e.jsx(n,{children:"\\bA"}),` selbst. Das ist die Matrixfassung von
`,e.jsx(n,{children:"\\partial (\\ba^\\top\\bx)/\\partial \\bx = \\ba^\\top"})," aus ",e.jsx(i.a,{href:"#env-gradient-einer-linearen-funktion",children:"Beispiel 10.2.7"}),". In ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar",children:"(10.4.10)"}),` steht
`,e.jsx(n,{children:"\\bX"})," einmal links und einmal rechts von ",e.jsx(n,{children:"\\bA"}),`. Ausgeschrieben ist
`,e.jsx(n,{children:"\\tr(\\bX\\bA\\bX^\\top) = \\sum_{i,j,k} x_{ij}\\,a_{jk}\\,x_{ik}"}),", und beim Ableiten nach ",e.jsx(n,{children:"x_{pq}"}),`
liefert die Produktregel zwei Beiträge: aus dem linken Vorkommen wird `,e.jsx(n,{children:"[\\bX\\bA^\\top]_{pq}"}),`,
aus dem rechten `,e.jsx(n,{children:"[\\bX\\bA]_{pq}"}),". Zusammen ist das ",e.jsx(n,{children:"\\bX(\\bA + \\bA^\\top)"}),". Und ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar-3",children:"(10.4.12)"}),` ist
der Spezialfall `,e.jsx(n,{children:"\\bA = \\bI"})," von ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar",children:"(10.4.10)"}),`, denn
`,e.jsx(n,{children:"\\tr(\\bX\\bI\\bX^\\top) = \\tr(\\bX\\bX^\\top) = \\left\\|\\bX\\right\\|_F^2"})," und ",e.jsx(n,{children:"\\bX(\\bI + \\bI) = 2\\bX"}),`.
Die Verwandtschaft zu `,e.jsx(n,{children:"\\partial x^2/\\partial x = 2x"})," ist kein Zufall."]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.4.11 (Probe der Frobenius-Identität)",id:"env-probe-der-frobenius-identitaet",children:[e.jsxs(i.p,{children:["Für ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar-3",children:"(10.4.12)"})," brauchen wir keine Matrixrechnung. Nach Definition der Frobenius-Norm ist"]}),e.jsx(o,{children:"\\cblue{f(\\bX)} = \\left\\|\\bX\\right\\|_F^2 = \\sum_{i=1}^m \\sum_{j=1}^n x_{ij}^2 ,"}),e.jsxs(i.p,{children:["und in dieser Summe kommt ",e.jsx(n,{children:"x_{ij}"})," genau einmal vor, nämlich quadriert. Also"]}),e.jsx(o,{children:`\\corange{\\frac{\\partial f(\\bX)}{\\partial x_{ij}}} = 2 x_{ij}
\\quad \\impl \\quad
\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}} = 2\\bX .`}),e.jsxs(i.p,{children:["Anders als in ",e.jsx(i.a,{href:"#env-ableitung-von-f-x-a-xb",children:"Beispiel 10.4.9"})," ist der Restterm hier nicht null. Ausmultiplizieren liefert"]}),e.jsx(o,{children:`\\cblue{f(\\bX + \\bH)}
= \\sum_{i,j} \\bigl(x_{ij} + h_{ij}\\bigr)^2
= \\cblue{f(\\bX)} + \\cgreen{2\\tr\\bigl(\\bX^\\top\\bH\\bigr)} + \\cred{\\left\\|\\bH\\right\\|_F^2} ,`}),e.jsxs(i.p,{children:["und der mittlere Term ist wegen ",e.jsx(n,{children:"\\tr\\bigl((2\\bX)^\\top\\bH\\bigr) = 2\\tr\\bigl(\\bX^\\top\\bH\\bigr)"}),`
genau `,e.jsx(n,{children:"\\cgreen{D_{\\bX} f(\\bH)}"}),`. Übrig bleibt
`,e.jsx(n,{children:"\\cred{r(\\bH)} = \\left\\|\\bH\\right\\|_F^2"}),`, und dieser Ausdruck verschwindet im Verhältnis zu
`,e.jsx(n,{children:"\\left\\|\\bH\\right\\|_F"})," wie verlangt."]})]}),`
`,e.jsxs(i.p,{children:[`Was sagt ein einzelner Eintrag der Gradientenmatrix konkret aus, etwa der an der Stelle
`,e.jsx(n,{children:"(2,3)"}),"? Die Antwort steckt in ",e.jsx(i.a,{href:"#env-der-ableitungsterm-ist-ein-skalarprodukt",children:"Bemerkung 10.4.8"}),": Lenken wir nur in Richtung ",e.jsx(n,{children:"\\bE_{ij}"}),` aus,
so schrumpft die Summe über alle Einträge auf einen einzigen Summanden zusammen. Das lässt
sich anstupsen.`]}),`
`,e.jsxs(me,{title:"Auslenkung in Richtung einer einzelnen Koordinate",children:[e.jsxs(i.p,{children:["Wir fassen eine Zelle von ",e.jsx(n,{children:"\\bX"})," an und ziehen sie um ",e.jsx(n,{children:"h"}),` nach oben oder unten. Das Widget
wertet `,e.jsx(n,{children:"f"}),` an der so veränderten Matrix aus und stellt die tatsächliche Änderung neben
`,e.jsx(n,{children:"h \\cdot \\partial f(\\bX)/\\partial x_{ij}"}),`; die Zeile darunter trennt sie in den grünen
Ableitungsterm und den roten Rest.`]}),e.jsx(ps,{}),e.jsxs(i.p,{children:["Der Eintrag ",e.jsx(n,{children:"(i,j)"})," der Gradientenmatrix ist genau die Rate, mit der ",e.jsx(n,{children:"f"}),` auf einen Stups an
dieser Stelle reagiert. Für die beiden in `,e.jsx(n,{children:"\\bX"}),` linearen Funktionen bleibt der Rest exakt
null, die lineare Vorhersage ist dort also nicht nur eine Näherung. Bei
`,e.jsx(n,{children:"\\left\\|\\bX\\right\\|_F^2"})," ist der Rest exakt ",e.jsx(n,{children:"h^2"}),`: sichtbar von null verschieden, aber
schneller fallend als `,e.jsx(n,{children:"h"}),` selbst, und damit ein Musterbeispiel für ein
`,e.jsx(n,{children:"\\cred{o(\\left|h\\right|)}"}),"."]})]}),`
`,e.jsxs(xe,{title:"Anwendung: Matrixzerlegung und Matrix Completion",children:[e.jsxs(i.p,{children:[`Zum Schluss ein Problem, in dem der Fall Matrix zu Skalar seine ganze Kraft zeigt. Gegeben
sei eine Matrix `,e.jsx(n,{children:"\\cblue{\\bY} \\in \\R^{m \\times n}"}),`, von der wir nur die Einträge an den
Positionen einer Indexmenge `,e.jsx(n,{children:"\\Omega"}),` kennen. Das klassische Beispiel sind Bewertungen von
Filmen: Die Zeilen sind Nutzer, die Spalten Filme, und die allermeisten Felder der Tabelle
sind leer, weil niemand alle Filme sieht.`]}),e.jsxs(i.p,{children:[`Die Hoffnung ist, dass die Tabelle in Wahrheit einfach gebaut ist. Wenige Geschmacksrichtungen
erklären die meisten Bewertungen, die Matrix ist also näherungsweise von kleinem
`,e.jsx(v,{id:"rank",children:"Rang"}),`. Wir suchen deshalb eine
`,e.jsxs(v,{id:"low-rank-approximation",children:["Rang-",e.jsx(n,{children:"k"}),"-Approximation"]})]}),e.jsx(o,{children:"\\cblue{\\bY} \\approx \\bU\\bV^\\top , \\qquad \\bU \\in \\R^{m \\times k}, \\quad \\bV \\in \\R^{n \\times k} ,"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"k \\ll \\min(m, n)"}),". Statt ",e.jsx(n,{children:"m \\cdot n"})," Zahlen sind dann nur noch ",e.jsx(n,{children:"k(m+n)"}),` zu bestimmen, und
die Lücken lesen wir am Produkt `,e.jsx(n,{children:"\\bU\\bV^\\top"})," einfach ab."]}),e.jsx(i.p,{children:`Niedriger Rang allein garantiert allerdings noch keine eindeutige Ergänzung.
Auch Zahl und Lage der beobachteten Einträge müssen genügend Information über
Zeilen- und Spaltenstruktur liefern; in Anwendungen kommen deshalb Annahmen an
das Beobachtungsmuster und häufig Regularisierung hinzu. Das folgende Verfahren
liefert Vorhersagen unter dem gewählten Rangmodell, nicht automatisch die einzig
möglichen fehlenden Werte.`}),e.jsxs(i.p,{children:["Bei vollständig beobachtetem ",e.jsx(n,{children:"\\bY"}),` wäre das Problem gelöst: Nach dem Satz von Eckart und
Young (`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),`) liefert die abgeschnittene
Singulärwertzerlegung die beste Rang-`,e.jsx(n,{children:"k"}),`-Approximation. Fehlende Einträge machen diese Tür
zu, denn die Zerlegung braucht die ganze Matrix. Also formulieren wir eine Verlustfunktion,
die nur die beobachteten Felder bewertet, und minimieren sie numerisch:`]}),e.jsx(T,{tag:"10.4.13",id:"eq-eq-10-4-13",children:`L(\\bU, \\bV)
= \\frac{1}{2}\\sum_{(i,j) \\in \\Omega} \\Bigl(y_{ij} - \\bigl[\\bU\\bV^\\top\\bigr]_{ij}\\Bigr)^2
= \\frac{1}{2}\\left\\|\\bP_\\Omega \\odot \\bigl(\\cblue{\\bY} - \\bU\\bV^\\top\\bigr)\\right\\|_F^2 ,
\\qquad
\\bP_\\Omega = \\bigl[\\ind_{(i,j) \\in \\Omega}\\bigr] .`}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\bP_\\Omega \\in \\R^{m \\times n}"})," die Maskenmatrix mit einer ",e.jsx(n,{children:"1"}),` an jeder
beobachteten und einer `,e.jsx(n,{children:"0"})," an jeder fehlenden Position, und ",e.jsx(n,{children:"\\odot"}),` bezeichnet das
`,e.jsx(i.em,{children:"elementweise Produkt"}),` (Hadamard-Produkt), also
`,e.jsx(n,{children:"(\\bA \\odot \\bB)_{ij} = a_{ij} b_{ij}"}),`. Die Maske blendet damit alle unbeobachteten
Abweichungen aus, bevor die Frobenius-Norm sie aufsummieren kann. Ein gewöhnliches
Matrixprodukt kann an dieser Stelle nicht gemeint sein: `,e.jsx(n,{children:"\\bP_\\Omega"}),` und
`,e.jsx(n,{children:"\\cblue{\\bY} - \\bU\\bV^\\top"})," sind beide ",e.jsx(n,{children:"m \\times n"}),`, und nur elementweise blendet die Maske
die unbeobachteten Positionen aus.`]}),e.jsxs(i.p,{children:["Für die Optimierung brauchen wir die Ableitungen von ",e.jsx(n,{children:"L"}),` nach den beiden Faktormatrizen, und
das ist genau der Fall Matrix zu Skalar.`]}),e.jsxs(q,{kind:"Satz",label:"10.4.12 (Gradienten der Completion-Verlustfunktion)",id:"env-gradienten-der-completion",children:[e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bR := \\bP_\\Omega \\odot \\bigl(\\cblue{\\bY} - \\bU\\bV^\\top\\bigr)"})," gilt für ",e.jsx(n,{children:"L"}),` aus
`,e.jsx(i.a,{href:"#eq-eq-10-4-13",children:"(10.4.13)"})]}),e.jsx(T,{tag:"10.4.14",id:"eq-gradienten-der-completion",children:`\\corange{\\frac{\\partial L}{\\partial \\bU}} = -\\bR\\,\\bV \\in \\R^{m \\times k} ,
\\qquad
\\corange{\\frac{\\partial L}{\\partial \\bV}} = -\\bR^\\top\\bU \\in \\R^{n \\times k} .`})]}),e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["die Maske ",e.jsx(n,{children:"p_{ij}"})," setzt alle unbeobachteten Summanden auf null, die Summe über ",e.jsx(n,{children:"\\Omega"})," wird dadurch zur Summe über alle Positionen"]}),children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix",children:"(10.4.6)"})," ist die Ableitung eintragsweise erklärt, also rechnen wir eintragsweise. Mit ",e.jsx(n,{children:"r_{ij} = p_{ij}\\bigl(y_{ij} - \\sum_{s=1}^k u_{is}v_{js}\\bigr)"}),` und
`,e.jsx(n,{children:"p_{ij} \\in \\{0, 1\\}"})," ist"]}),e.jsx(o,{children:"L(\\bU, \\bV) = \\frac{1}{2}\\sum_{i=1}^m \\sum_{j=1}^n r_{ij}^2 ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["im vorletzten Schritt fällt die Maske weg, weil ",e.jsx(n,{children:"r_{aj}"})," den Faktor ",e.jsx(n,{children:"p_{aj}"})," bereits enthält und ",e.jsx(n,{children:"p_{aj}^2 = p_{aj}"})," für ",e.jsx(n,{children:"p_{aj} \\in \\{0,1\\}"})," gilt"]}),children:[e.jsxs(i.p,{children:["Nun leiten wir nach einem einzelnen Eintrag ",e.jsx(n,{children:"u_{ab}"})," ab. Der Eintrag ",e.jsx(n,{children:"u_{ab}"}),` taucht nur in
den Residuen der Zeile `,e.jsx(n,{children:"a"}),` auf, und dort mit
`,e.jsx(n,{children:"\\partial r_{aj} / \\partial u_{ab} = -p_{aj} v_{jb}"}),". Die Kettenregel liefert"]}),e.jsx(o,{children:`\\corange{\\frac{\\partial L}{\\partial u_{ab}}}
= \\sum_{j=1}^n r_{aj}\\, \\frac{\\partial r_{aj}}{\\partial u_{ab}}
= -\\sum_{j=1}^n p_{aj}\\, r_{aj}\\, v_{jb}
= -\\sum_{j=1}^n r_{aj}\\, v_{jb}
= -\\bigl[\\bR\\bV\\bigr]_{ab} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\sum_i r_{ia} u_{ib}"})," ist das Skalarprodukt der ",e.jsx(n,{children:"a"}),"-ten Spalte von ",e.jsx(n,{children:"\\bR"})," mit der ",e.jsx(n,{children:"b"}),"-ten Spalte von ",e.jsx(n,{children:"\\bU"}),", also der Eintrag ",e.jsx(n,{children:"(a,b)"})," von ",e.jsx(n,{children:"\\bR^\\top\\bU"})]}),children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bV"})," läuft die Rechnung genauso, nur über die Spalten. Der Eintrag ",e.jsx(n,{children:"v_{ab}"}),` steckt in
den Residuen der Spalte `,e.jsx(n,{children:"a"}),`, mit
`,e.jsx(n,{children:"\\partial r_{ia} / \\partial v_{ab} = -p_{ia} u_{ib}"}),", also"]}),e.jsx(o,{children:`\\corange{\\frac{\\partial L}{\\partial v_{ab}}}
= \\sum_{i=1}^m r_{ia}\\,\\bigl(-p_{ia} u_{ib}\\bigr)
= -\\sum_{i=1}^m r_{ia}\\, u_{ib}
= -\\bigl[\\bR^\\top\\bU\\bigr]_{ab} .`})]})]}),e.jsxs(i.p,{children:["Damit steht dem ",e.jsx(v,{id:"gradient-descent",children:"Gradientenabstieg"}),` aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"})," nichts mehr im Weg. Wir behandeln ",e.jsx(n,{children:"\\bU"})," und ",e.jsx(n,{children:"\\bV"}),` als ein
gemeinsames Parameterpaket und gehen in beiden zugleich einen Schritt gegen den Gradienten.`]}),e.jsxs(q,{kind:"Algorithmus",label:"10.4.13 (Gradientenabstieg für Matrix Completion)",id:"env-gradientenabstieg-fuer-matrix-completion",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Eingabe:"})," beobachtete Werte ",e.jsx(n,{children:"\\cblue{\\bY}"})," auf ",e.jsx(n,{children:"\\Omega"}),", Maske ",e.jsx(n,{children:"\\bP_\\Omega"}),", Rang ",e.jsx(n,{children:"k"}),`,
Lernrate `,e.jsx(n,{children:"\\alpha > 0"}),", Startwerte ",e.jsx(n,{children:"\\bU^{(0)}, \\bV^{(0)}"}),"."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"t = 0, 1, 2, \\dots"}),":"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[`Residuum auf den beobachteten Feldern:
`,e.jsx(n,{children:"\\bR^{(t)} = \\bP_\\Omega \\odot \\bigl(\\cblue{\\bY} - \\bU^{(t)}\\bV^{(t)\\top}\\bigr)"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Faktoren aktualisieren:"}),`
`,e.jsx(o,{children:`\\bU^{(t+1)} = \\bU^{(t)} + \\alpha\\, \\bR^{(t)}\\bV^{(t)} ,
\\qquad
\\bV^{(t+1)} = \\bV^{(t)} + \\alpha\\, \\bR^{(t)\\top}\\bU^{(t)} .`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Abbruch, sobald sich ",e.jsx(n,{children:"L"})," kaum noch ändert oder eine Schrittzahl erreicht ist."]}),`
`]}),`
`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Ausgabe:"})," ",e.jsx(n,{children:"\\wh{\\bY} = \\bU\\bV^\\top"}),"; an den Positionen außerhalb von ",e.jsx(n,{children:"\\Omega"}),` stehen die
vom Rangmodell und vom Optimierungslauf gelieferten Vorhersagen.`]})]}),e.jsxs(i.p,{children:[`Das Pluszeichen in Schritt 2 ist kein Tippfehler: Wir gehen gegen den Gradienten, und der
trägt nach `,e.jsx(i.a,{href:"#eq-gradienten-der-completion",children:"(10.4.14)"})," bereits ein Minus. Zwei Warnungen gehören dazu. Erstens ist ",e.jsx(n,{children:"L"}),` in
`,e.jsx(n,{children:"(\\bU, \\bV)"})," nicht konvex, das Produkt ",e.jsx(n,{children:"\\bU\\bV^\\top"}),` ist ja quadratisch in den Unbekannten.
Gradientenabstieg hat deshalb keine allgemeine Garantie für ein globales Minimum: Je nach
Startpunkt und Lernrate kann er zu einem lokalen oder globalen Minimum beziehungsweise einem
anderen stationären Punkt konvergieren, oszillieren oder divergieren. Zweitens
ist die Zerlegung nie eindeutig, denn für jede invertierbare `,e.jsx(n,{children:"\\bT \\in \\R^{k \\times k}"}),` ist
`,e.jsx(n,{children:"(\\bU\\bT)(\\bV\\bT^{-\\top})^\\top = \\bU\\bV^\\top"}),`. Für die Vorhersage stört das nicht, wohl aber
für jede Interpretation der Spalten von `,e.jsx(n,{children:"\\bU"})," und ",e.jsx(n,{children:"\\bV"}),"."]}),e.jsx(i.p,{children:`Anwendungen dieses Musters gibt es reichlich: Imputation fehlender Werte, Empfehlungssysteme
und kollaboratives Filtern arbeiten alle nach demselben Rezept.`}),e.jsx(i.p,{children:`Damit stellt sich die Frage, die über den praktischen Wert des Verfahrens entscheidet: Wenn
zwei Modelle den Verlust auf den beobachteten Einträgen beide auf null drücken, sagen sie
dann auch dasselbe für die Lücken voraus?`}),e.jsxs(me,{title:"Matrix Completion an einer 2×3-Matrix",children:[e.jsxs(i.p,{children:[`Vier von sechs Einträgen sind beobachtet, zwei sind Lücken. Das Widget führt
`,e.jsx(i.a,{href:"#env-gradientenabstieg-fuer-matrix-completion",children:"Algorithmus 10.4.13"})," für ",e.jsx(n,{children:"k = 1"})," und ",e.jsx(n,{children:"k = 2"}),` nebeneinander aus, mit derselben Lernrate, und
zeigt alle Zwischengrößen: das Residuum `,e.jsx(n,{children:"\\bP_\\Omega \\odot (\\bY - \\bU\\bV^\\top)"}),` in Rot,
die beiden Gradienten in Orange und die Vorhersagen für die Lücken in Grün.`]}),e.jsx(zs,{}),e.jsxs(i.p,{children:[`Der Verlust fällt bei beiden Rängen auf null, die Vorhersagen laufen aber auseinander:
`,e.jsx(n,{children:"k = 1"})," landet bei ",e.jsx(n,{children:"y_{13} = 2{,}5"})," und ",e.jsx(n,{children:"y_{22} = 2{,}4"}),", ",e.jsx(n,{children:"k = 2"})," bei ",e.jsx(n,{children:"1{,}583"}),` und
`,e.jsx(n,{children:"0{,}909"}),". Bei ",e.jsx(n,{children:"k = 2"}),` treffen zehn Parameter auf vier Beobachtungen; wohin die Vorhersage
läuft, entscheidet dann der Startpunkt. Größerer Rang heißt also nicht bessere
Rekonstruktion. Und wer die Lernrate hochschiebt, sieht ab etwa `,e.jsx(n,{children:"\\alpha = 0{,}14"}),` ein
Pendeln des Verlusts und jenseits von etwa `,e.jsx(n,{children:"\\alpha = 0{,}25"})," ein Davonlaufen der Einträge."]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{m \\times n}"}),` hat die Ableitung
`,e.jsx(n,{children:"\\partial \\bF(x)/\\partial x"})," dasselbe Format ",e.jsx(n,{children:"m \\times n"})," wie ",e.jsx(n,{children:"\\bF(x)"})," selbst."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-ableitung-einer-matrixwertigen-funktion",children:"Definition 10.4.1"}),`: Jeder Eintrag wird für sich abgeleitet und bleibt an seinem Platz.
Verwechseln darf man die beiden Matrizen trotzdem nicht, die eine enthält Werte, die andere
Steigungen (`,e.jsx(i.a,{href:"#env-das-format-bleibt-erhalten",children:"Bemerkung 10.4.2"}),")."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Identität ",e.jsx(n,{children:"\\partial \\tr(\\bF(x))/\\partial x = \\tr(\\partial \\bF(x)/\\partial x)"}),` gilt für
jede Matrixfunktion `,e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{m \\times n}"}),"."]}),e.jsxs(i.p,{children:["Die Spur ist nur für quadratische Matrizen erklärt, die Aussage braucht also ",e.jsx(n,{children:"m = n"}),`. Deshalb
setzt `,e.jsx(i.a,{href:"#env-identitaeten-fuer-skalar-zu-matrix",children:"Satz 10.4.4"})," ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{n \\times n}"})," voraus, während ",e.jsx(i.a,{href:"#env-ableitung-einer-matrixwertigen-funktion",children:"Definition 10.4.1"}),` noch
mit beliebigen Formaten auskommt.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\det(\\bF(x)) = 1"})," für alle ",e.jsx(n,{children:"x"}),`, so gilt
`,e.jsx(n,{children:"\\tr\\bigl[\\bF(x)^{-1}\\, \\partial \\bF(x)/\\partial x\\bigr] = 0"}),"."]}),e.jsxs(i.p,{children:["Die linke Seite der Jacobi-Formel ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"}),` ist die Ableitung einer konstanten Funktion,
also null. Rechts steht das Produkt aus `,e.jsx(n,{children:"\\det(\\bF(x)) = 1"}),` und der Spur, und ein Produkt mit
Faktor `,e.jsx(n,{children:"1"}),` verschwindet nur, wenn der andere Faktor verschwindet. Die Drehmatrix im ersten
Widget führt das vor.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^{m \\times n} \\to \\R"}),` ist der Ableitungsterm das Matrixprodukt
`,e.jsx(n,{children:"D_{\\bX} f(\\bH) = \\bigl(\\partial f(\\bX)/\\partial \\bX\\bigr)\\bH"}),"."]}),e.jsxs(i.p,{children:["Richtig ist ",e.jsx(n,{children:"D_{\\bX} f(\\bH) = \\tr\\bigl((\\partial f(\\bX)/\\partial \\bX)^\\top \\bH\\bigr)"}),` nach
`,e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"}),". Das angegebene Produkt wäre für ",e.jsx(n,{children:"m \\neq n"}),` nicht einmal definiert, denn beide
Faktoren haben das Format `,e.jsx(n,{children:"m \\times n"}),"; und das Ergebnis müsste eine Zahl sein, keine Matrix."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bX) = \\tr(\\bA^\\top\\bX)"})," ist ",e.jsx(n,{children:"\\partial f(\\bX)/\\partial \\bX = \\bA"}),`, und der Restterm in
`,e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"})," ist exakt null."]}),e.jsxs(i.p,{children:["Die Formel steht als ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar-2",children:"(10.4.11)"})," in ",e.jsx(i.a,{href:"#env-identitaeten-fuer-matrix-zu-skalar",children:"Satz 10.4.10"}),". Nach ",e.jsx(i.a,{href:"#eq-der-ableitungsterm-ist-ein-skalarprodukt",children:"(10.4.8)"})," ist ",e.jsx(n,{children:"f"}),` die Summe
`,e.jsx(n,{children:"\\sum_{ij} a_{ij}x_{ij}"})," und damit linear in ",e.jsx(n,{children:"\\bX"}),`, also ist die lineare Näherung exakt. Das
zweite Widget zeigt denselben Effekt für die Funktion `,e.jsx(n,{children:"\\ba^\\top\\bX\\bb"})," aus ",e.jsx(i.a,{href:"#eq-ableitung-von-f-x-a-xb",children:"(10.4.9)"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Bei der Matrix Completion liefert ein größeres ",e.jsx(n,{children:"k"}),` stets eine bessere Rekonstruktion der
unbeobachteten Einträge.`]}),e.jsxs(i.p,{children:["Ein größeres ",e.jsx(n,{children:"k"}),` senkt den Verlust auf den beobachteten Feldern, über die Lücken sagt es
dagegen nichts. Im Widget passt `,e.jsx(n,{children:"k = 2"}),` die vier Beobachtungen mit zehn Parametern exakt an,
und die beiden Vorhersagen hängen dann nur noch am Startpunkt. Genau deshalb steht am Anfang
die Annahme, dass die gesuchte Matrix kleinen Rang hat.`]})]}),e.jsxs(We,{loesung:1.583,toleranz:.03,children:[e.jsxs(i.p,{children:["Im Completion-Widget: Wir lassen beide Modelle mit ",e.jsx(n,{children:"\\alpha = 0{,}05"}),` so lange laufen, bis
der Verlust bei beiden praktisch null ist. Welchen Wert sagt das Rang-2-Modell für die Lücke
`,e.jsx(n,{children:"y_{13}"})," voraus?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"1{,}583"}),", während das Rang-1-Modell ",e.jsx(n,{children:"2{,}5"}),` vorhersagt. Beide erreichen denselben Verlust
null auf den vier beobachteten Einträgen; über die Lücken sagt der Verlust nichts.`]})]}),e.jsxs(We,{loesung:.16,toleranz:.005,children:[e.jsxs(i.p,{children:["Im Anstups-Widget: Wir wählen ",e.jsx(n,{children:"f(\\bX) = \\left\\|\\bX\\right\\|_F^2"}),` und stupsen einen Eintrag
um `,e.jsx(n,{children:"h = 0{,}4"})," an. Wie groß ist der rote Restterm?"]}),e.jsxs(i.p,{children:["Exakt ",e.jsx(n,{children:"h^2 = 0{,}16"}),`, unabhängig davon, welchen Eintrag wir anfassen: Der quadratische Term
in `,e.jsx(n,{children:"(x_{ij} + h)^2 = x_{ij}^2 + 2x_{ij}h + h^2"})," ist der ganze Rest."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.4 (Ableitungen von Matrizen) und §5.5 (nützliche Identitäten für
Gradienten).`})})]})}function _s(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(lt,{...r})}):lt(r)}const hn=P.blau,Ai=P.gruen,at=[{id:"quadrat",marke:"x²",x:148,y:106,farbe:Ai,kurve:r=>r*r,bildTitel:"f(x) = x²"},{id:"betrag",marke:"|x|",x:344,y:106,farbe:hn,kurve:r=>Math.abs(r),bildTitel:"f(x) = |x|"},{id:"sprung",marke:"H",x:215,y:206,farbe:P.grau,kurve:r=>r>=0?1:0,sprung:!0,bildTitel:"H(x) = 1 für x ≥ 0, sonst 0"}];function Ss({fall:r}){const t=c=>6+(c+1)/2*80,l=c=>82-(c+.35)/1.7*72,s=(c,h)=>{const x=[];for(let d=0;d<=40;d++){const f=c+(h-c)*d/40;x.push(`${d===0?"M":"L"}${t(f).toFixed(1)},${l(r.kurve(f)).toFixed(1)}`)}return x.join(" ")};return e.jsxs("figure",{className:"m-0",children:[e.jsxs("svg",{viewBox:"0 0 92 92",role:"img","aria-label":`Der Graph von ${r.bildTitel} in der Nähe von null.`,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[e.jsx("line",{x1:t(-1),x2:t(1),y1:l(0),y2:l(0),stroke:"var(--w-axis)",strokeWidth:.8}),e.jsx("line",{x1:t(0),x2:t(0),y1:6,y2:86,stroke:"var(--w-axis)",strokeWidth:.8}),r.sprung?e.jsxs(e.Fragment,{children:[e.jsx("path",{d:s(-1,-.02),fill:"none",stroke:hn,strokeWidth:2.2}),e.jsx("path",{d:s(.02,1),fill:"none",stroke:hn,strokeWidth:2.2}),e.jsx("circle",{cx:t(0),cy:l(0),r:2.6,fill:"var(--w-bg)",stroke:hn,strokeWidth:1.4}),e.jsx("circle",{cx:t(0),cy:l(1),r:2.6,fill:hn})]}):e.jsx("path",{d:s(-1,1),fill:"none",stroke:hn,strokeWidth:2.2})]}),e.jsx("figcaption",{className:`mt-0.5 text-center text-[11px] ${Y}`,children:r.bildTitel})]})}function Ds(){return e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"rounded p-2",style:{background:"var(--w-bg)"},children:e.jsxs("svg",{viewBox:"0 0 440 252",role:"img","aria-label":"Mengendiagramm an der Stelle null: der Bereich der differenzierbaren Funktionen liegt vollständig im Bereich der stetigen; x Quadrat liegt innen, der Betrag im Ring dazwischen, die Sprungfunktion außerhalb.",className:"mx-auto block h-auto w-full max-w-[440px]",children:[e.jsx("text",{x:"12",y:"18",fontSize:"12",fill:"var(--w-muted)",children:"an der Stelle x₀ = 0"}),e.jsx("ellipse",{cx:"215",cy:"100",rx:"200",ry:"82",fill:hn,fillOpacity:"0.10",stroke:hn,strokeWidth:"1.5"}),e.jsx("ellipse",{cx:"148",cy:"104",rx:"116",ry:"56",fill:Ai,fillOpacity:"0.16",stroke:Ai,strokeWidth:"1.5"}),e.jsx("text",{x:"320",y:"70",textAnchor:"middle",fontSize:"13",fontWeight:"600",fill:hn,children:"stetig"}),e.jsx("text",{x:"148",y:"70",textAnchor:"middle",fontSize:"13",fontWeight:"600",fill:Ai,children:"differenzierbar"}),at.map(r=>e.jsxs("g",{children:[e.jsx("circle",{cx:r.x,cy:r.y,r:17,fill:"var(--w-bg)",stroke:r.farbe,strokeWidth:2.2}),e.jsx("text",{x:r.x,y:r.y+5,textAnchor:"middle",fontSize:"14",fontWeight:700,fill:"var(--w-text)",children:r.marke})]},r.id)),e.jsx("text",{x:"215",y:"246",textAnchor:"middle",fontSize:"12",fill:"var(--w-muted)",children:"weder stetig noch differenzierbar"})]})}),e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:at.map(r=>e.jsx(Ss,{fall:r},r.id))})]})}const dt=P.blau,As=P.gruen,ht=P.rot,Zi=[{id:"quadrat",label:"f(x) = x²",f:r=>r*r,knick:[],art:"glatt"},{id:"betrag",label:"f(x) = |x|",f:r=>Math.abs(r),knick:[0],art:"knick"},{id:"wurzel",label:"f(x) = √|x|",f:r=>Math.sqrt(Math.abs(r)),knick:[0],art:"senkrecht"}],be=260,Ve=34,ys=18,Fs=8,ui=601,Fe=(r,i=3)=>u(r,i),Ms=r=>2**-r,Rs=12;function Ns(){const[r,i]=E.useState("quadrat"),[t,l]=E.useState(0),[s,c]=E.useState(1),h=Zi.find(g=>g.id===r)??Zi[0],x=Ms(s),d=h.f(t),{sehne:f,dRel:j,tMax:D}=E.useMemo(()=>{const g=h.f(t-x),m=h.f(t+x),b=w=>g+(m-g)*(w+x)/(2*x);let N=0,S=0;for(let w=0;w<=ui;w++){const B=-x+2*x*w/ui,k=Math.abs(h.f(t+B)-b(B));k>N&&(N=k,S=B)}return{sehne:b,dRel:N/x,tMax:S}},[h,t,x]),a=g=>Ve+(g-(t-x))/(2*x)*be,A=g=>be/2-(g-d)/x*(be/2),z=qn({feld:{x0:Ve,y0:0,w:be,h:be},welt:{x0:t-x,x1:t+x,y0:d-x,y1:d+x},clamp:([g,m])=>[Ue(g,-1,1),m],onDrag:([g])=>l(g),flaechenCursor:"crosshair"}),p=E.useMemo(()=>{const g=[];let m=!0;for(let b=0;b<=ui;b++){const N=-x+2*x*b/ui,S=h.f(t+N),w=A(S);if(w<-4*be||w>5*be){m=!0;continue}g.push(`${m?"M":"L"}${a(t+N).toFixed(2)},${w.toFixed(2)}`),m=!1}return g.join(" ")},[h,t,x]),R=h.knick.some(g=>Math.abs(g-t)<=x),M=h.knick.some(g=>Math.abs(g-t)<1e-9);let F="neutral",_;h.art==="glatt"||!R?(F=j<.05?"ok":"neutral",_=`Die Abweichung von der grünen Geraden beträgt das ${Fe(j,4)}-fache der halben Fensterbreite w. ${j<.05?"Auf dieser Zoomstufe ist der Unterschied zwischen Kurve und Gerade kaum noch zu sehen. ":"Noch ist die Krümmung sichtbar. "}Jeder Schritt am Zoomregler halbiert das Fenster und halbiert damit auch diese Zahl; im Grenzwert geht sie gegen null: Das ist die Aussage von ${V("definition:differenzierbarkeit")}, dass der Rest o(h) ist. Die Gerade selbst hat die Steigung der Ableitung an dieser Stelle, und weil f dort differenzierbar ist, ist f nach ${V("satz:stetigkeit-aus-differenzierbarkeit")} dort auch stetig.`):h.art==="knick"&&M?(F="fail",_=`Hier bleibt die Abweichung beim ${Fe(j,4)}-fachen von w stehen, und zwar auf JEDER Zoomstufe: Der Knick sieht bei w = 2⁻¹² genauso aus wie bei w = 1. Eine Gerade, die den Graphen in der Nähe von 0 ersetzt, gibt es also nicht. In Zahlen ist das der Befund aus ${V("beispiel:die-betragsfunktion-am-nullpunkt")}: Der Differenzenquotient strebt von rechts gegen +1 und von links gegen −1, und ${V("definition:differenzierbarkeit")} verlangt einen einzigen Wert. Stetig ist |x| in 0 trotzdem – die Umkehrung von ${V("satz:stetigkeit-aus-differenzierbarkeit")} gilt eben nicht.`):h.art==="knick"?(F="warn",_=`Der Knick liegt noch im Fenster, aber nicht in seiner Mitte: die Abweichung beträgt das ${Fe(j,4)}-fache von w. Zoomen wir weiter hinein, so rutscht er hinaus, und übrig bleibt ein exakt gerades Stück. Genau das ist der Punkt: |x| ist an jeder Stelle außer 0 differenzierbar, die eine Ausnahmestelle steckt nicht in der Funktion, sondern in der Stelle.`):M?(F="fail",_=`Hier läuft es in die andere Richtung: Die Abweichung wächst auf das ${Fe(j,3)}-fache von w, und sie wächst weiter, je tiefer wir zoomen (sie verhält sich wie 1/√w). Der Graph steht am Ende senkrecht und verlässt das Bild nach oben. Auch das ist ein Fall von nicht differenzierbar, und zwar ein anderer als der Knick: Hier existiert der Grenzwert des Differenzenquotienten nicht, weil er über jede Grenze wächst. Stetig ist √|x| in 0 dennoch.`):(F="warn",_=`Die Stelle 0 liegt im Fenster, aber nicht in der Mitte; die Abweichung beträgt das ${Fe(j,4)}-fache von w. Weiter hineingezoomt verschwindet sie aus dem Bild, und zurück bleibt eine glatte Kurve: Außerhalb der 0 ist √|x| differenzierbar.`);const y=2**s;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Zoomen wir mit dem Regler „Zoomstufe“ in die Stelle x₀ hinein und achten darauf, wann die blaue Kurve von der grünen Geraden nicht mehr zu unterscheiden ist. Ein Klick ins Bild oder der Regler „x₀“ verschiebt die Stelle."}),e.jsx("p",{className:`max-w-prose text-xs ${Y}`,children:"Blau: die Funktion. Grün: die Sehne durch die beiden Fensterränder, also die Gerade, die im Fenster am besten passt. Rot: die größte Abweichung zwischen beiden, gemessen in Vielfachen der halben Fensterbreite w. Das Fenster ist quadratisch, beide Achsen werden beim Zoomen gleich gestaucht."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Zi.map(g=>e.jsx("button",{type:"button","aria-pressed":g.id===r,className:g.id===r?pe:ie,onClick:()=>i(g.id),children:g.label},g.id))}),e.jsx(I,{label:"x₀ (Stelle)",value:t,onChange:g=>l(Math.round(g*20)/20),min:-1,max:1,step:.05,fmt:g=>Fe(g,2)}),e.jsx(I,{label:"Zoomstufe z",value:s,onChange:g=>c(Math.round(g)),min:0,max:Rs,step:1,fmt:()=>`${wr(y)}×`}),e.jsxs("svg",{viewBox:`0 0 ${Ve+be+Fs} ${be+ys}`,role:"img","aria-label":`${h.label} im Fenster der halben Breite ${Fe(x,4)} um x₀ = ${Fe(t,2)}; die Abweichung von der Geraden beträgt das ${Fe(j,3)}-fache davon.`,className:"h-auto max-w-full rounded border",...z.svgProps,...z.surfaceProps("x0"),style:{background:"var(--w-bg)",borderColor:"var(--w-border)",...z.svgProps.style,...z.surfaceProps("x0").style},children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s111-zoom-clip",children:e.jsx("rect",{x:Ve,y:0,width:be,height:be})})}),Math.abs(t)<=x&&e.jsx("line",{x1:a(0),x2:a(0),y1:0,y2:be,stroke:"var(--w-grid-strong)",strokeWidth:.8}),Math.abs(d)<=x&&e.jsx("line",{x1:Ve,x2:Ve+be,y1:A(0),y2:A(0),stroke:"var(--w-grid-strong)",strokeWidth:.8}),e.jsxs("g",{clipPath:"url(#s111-zoom-clip)",children:[e.jsx("line",{x1:a(t-x),y1:A(f(-x)),x2:a(t+x),y2:A(f(x)),stroke:As,strokeWidth:2,strokeDasharray:"6 4"}),e.jsx("path",{d:p,fill:"none",stroke:dt,strokeWidth:2.4}),j>.004&&e.jsx("line",{x1:a(t+D),y1:A(f(D)),x2:a(t+D),y2:A(h.f(t+D)),stroke:ht,strokeWidth:3}),e.jsx("circle",{cx:a(t),cy:A(d),r:4,fill:dt})]}),e.jsx("rect",{x:Ve,y:0,width:be,height:be,fill:"none",stroke:"var(--w-border)",strokeWidth:1}),e.jsx("text",{x:Ve-4,y:12,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:Fe(d+x,3)}),e.jsx("text",{x:Ve-4,y:be-2,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:Fe(d-x,3)}),e.jsx("text",{x:Ve,y:be+12,textAnchor:"start",fill:"var(--w-text)",fontSize:10,children:Fe(t-x,3)}),e.jsx("text",{x:Ve+be,y:be+12,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:Fe(t+x,3)})]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{children:["halbe Fensterbreite w = 2^(−",s,") = ",Fe(x,6)," (Zoomfaktor ",wr(y),"×)"]}),e.jsxs("div",{style:{color:ht},children:["Abweichung von der Geraden: ",Fe(j,4)," · w"]})]}),e.jsx(ve,{kind:F,children:_})]})}function qs(){return e.jsx(Ce,{frage:"Welche der drei Kurven wird beim Hineinzoomen auf x₀ = 0 von einer Geraden ununterscheidbar?",variante:"auswahl",loesung:"quadrat",optionen:[{id:"quadrat",text:"nur x²"},{id:"betrag",text:"nur |x|"},{id:"alle",text:"alle drei"},{id:"keine",text:"keine"}],verdeckt:e.jsx("p",{className:"max-w-prose text-sm",children:"Nur x². Die Abweichung von der Geraden fällt dort proportional zur Fensterbreite, halbiert sich also mit jeder Halbierung des Fensters. Bei |x| bleibt sie auf jeder Zoomstufe exakt gleich, bei √|x| wächst sie sogar, und der Graph stellt sich immer steiler."}),children:e.jsx(Ns,{})})}function ct(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Woran wir anknüpfen"}),`
`,e.jsxs(i.p,{children:[`Damit ist der Begriffsteil des Kapitels abgeschlossen. Die
Abschnitte `,e.jsx(i.a,{href:"#sec-10.1",children:"10.1"})," bis ",e.jsx(i.a,{href:"#sec-10.4",children:"10.4"}),` haben geklärt, was eine Ableitung
überhaupt ist, sobald Ein- und Ausgabe keine Zahlen mehr sind, und in welchem Format sie
dann steht. Ab hier geht es um das Rechnen damit: Welche Eigenschaften erbt eine
differenzierbare Funktion, und wie leiten wir zusammengesetzte Ausdrücke ab, ohne jedes Mal
zur Definition zurückzukehren.`]}),`
`,e.jsxs(i.p,{children:["Der Begriff, an dem alles hängt, ist die ",e.jsx(i.em,{children:"Fréchet-Ableitung"}),". Für normierte Vektorräume ",e.jsx(n,{children:"\\D"}),`
und `,e.jsx(n,{children:"\\E"}),", eine Funktion ",e.jsx(n,{children:"f\\colon \\D \\to \\E"})," und eine Stelle ",e.jsx(n,{children:"\\bx \\in \\D"})," heißt ",e.jsx(n,{children:"f"}),` dort
`,e.jsx(v,{id:"differentiability",children:"differenzierbar"}),`, wenn es eine beschränkte lineare Abbildung
`,e.jsx(n,{children:"\\cgreen{D_{\\bx} f}\\colon \\D \\to \\E"})," und einen Rest ",e.jsx(n,{children:"\\cred{r(\\bh)} \\in \\E"})," gibt mit"]}),`
`,e.jsx(T,{tag:"10.5.1",id:"eq-eq-10-5-1",children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r(\\bh)},
\\qquad
\\frac{\\left\\|\\cred{r(\\bh)}\\right\\|_{\\E}}{\\left\\|\\bh\\right\\|_{\\D}} \\longrightarrow 0
\\quad \\text{für } \\bh \\to \\bnull .`}),`
`,e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," aus ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),`, und die
Notation von dort übernehmen wir mit: `,e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"}),` sind die beiden
`,e.jsx(v,{id:"norm",children:"normierten"})," ",e.jsx(v,{id:"vector-space",children:"Vektorräume"}),", mit dem Erwartungswert hat das ",e.jsx(n,{children:"\\E"}),`
nichts zu tun. Gleichung `,e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),` ist der Ausgangspunkt für jeden Beweis in diesem
Abschnitt.`]}),`
`,e.jsxs(i.p,{children:[`Die drei konkreten Gestalten, die wir laufend brauchen, stehen schon da: der
`,e.jsx(v,{id:"gradient",children:"Gradient"})," für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," (",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),`), die Jacobimatrix für
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," (",e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),`) und die beiden Matrixableitungen
`,e.jsx(n,{children:"\\corange{\\partial F(x)/\\partial x}"})," und ",e.jsx(n,{children:"\\corange{\\partial f(\\bX)/\\partial \\bX}"}),`
(`,e.jsx(i.a,{href:"#sec-10.4",children:"Abschnitt 10.4"}),")."]}),`
`,e.jsxs(i.p,{children:[`Aus der Analysis setzen wir Produkt- und Kettenregel für Funktionen einer Variablen
voraus, dazu höhere `,e.jsx(v,{id:"derivative",children:"Ableitungen"}),` und die
`,e.jsx(v,{id:"taylor-series",children:"Taylorreihe"}),`; aus der linearen Algebra bilineare und multilineare
Abbildungen samt `,e.jsx(v,{id:"dot-product",children:"Skalarprodukt"})," ",e.jsx(n,{children:"\\inner{\\cdot, \\cdot}"}),`
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.1",children:"Abschnitt 9.1"}),`), die
`,e.jsx(v,{id:"quadratic-form",children:"quadratischen Formen"})," ",e.jsx(n,{children:"\\bx^\\top\\bA\\bx"}),` und die
`,e.jsx(v,{id:"function-composition",children:"Komposition von Funktionen"}),"."]}),`
`,e.jsxs(i.p,{children:[`Der Fahrplan für die zweite Kapitelhälfte: Dieser Abschnitt klärt zwei allgemeine
Eigenschaften. Jede differenzierbare Funktion ist stetig, und die Ableitungsoperation
selbst ist linear.
`,e.jsx(i.a,{href:"#sec-10.6",children:"Abschnitt 10.6"}),` bringt Produkt- und Kettenregel in der allgemeinen Fassung,
`,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"}),` die Ableitungen höheren Grades und
`,e.jsx(i.a,{href:"#sec-10.8",children:"Abschnitt 10.8"})," die Taylorapproximation."]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.5.1 (Groß-O und klein-o für kleine Argumente)",id:"env-gross-o-und-klein-o-fuer-kleine",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"})," haben wir ",e.jsx(n,{children:"g(\\bh) = o(\\left\\|\\bh\\right\\|)"}),`
so gelesen: Der Quotient `,e.jsx(n,{children:"\\left\\|g(\\bh)\\right\\| / \\left\\|\\bh\\right\\|"}),` geht gegen null, der
Term verschwindet also schneller als `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),` selbst. Der nächste Beweis
braucht zusätzlich das große `,e.jsx(n,{children:"O"}),`, ebenfalls für kleine statt für große Argumente. Wir
schreiben `,e.jsx(n,{children:"g(\\bh) = O(\\left\\|\\bh\\right\\|)"}),", wenn es Konstanten ",e.jsx(n,{children:"C < \\infty"}),` und
`,e.jsx(n,{children:"\\delta > 0"})," gibt mit"]}),e.jsx(o,{children:`\\left\\|g(\\bh)\\right\\| \\le C \\left\\|\\bh\\right\\|
\\qquad \\text{für alle } \\bh \\text{ mit } \\left\\|\\bh\\right\\| < \\delta .`}),e.jsxs(i.p,{children:["Ein ",e.jsx(n,{children:"O"}),"-Term darf also von derselben Größenordnung sein wie ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`, er muss
nur mitschrumpfen. Jeder `,e.jsx(n,{children:"o"}),"-Term ist damit automatisch ein ",e.jsx(n,{children:"O"}),`-Term: Strebt der Quotient
gegen null, so liegt er für hinreichend kleine `,e.jsx(n,{children:"\\bh"})," unter ",e.jsx(n,{children:"1"}),`, und das ist die Schranke
mit `,e.jsx(n,{children:"C = 1"}),". Umgekehrt geht es nicht, denn ",e.jsx(n,{children:"g(h) = h"})," ist ",e.jsx(n,{children:"O(\\left|h\\right|)"}),`, aber nicht
`,e.jsx(n,{children:"o(\\left|h\\right|)"}),". Die ",e.jsx(v,{id:"big-o-notation",children:"Landau-Symbole"}),` kennen wir aus
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),` in ihrer üblichen Rolle als Aufwandsmaß; dort läuft
das Argument gegen unendlich, hier gegen null, die Rechenregeln sind dieselben.`]})]}),`
`,e.jsx(i.h3,{children:"Differenzierbarkeit erzwingt Stetigkeit"}),`
`,e.jsxs(i.p,{children:["Die lineare Approximation ",e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),` sagt mehr, als sie auf den ersten Blick zugibt. Sie
zwingt die Funktion nämlich, sich in der Nähe von `,e.jsx(n,{children:"\\bx"}),` zahm zu verhalten: Wer sich in
erster Ordnung linear approximieren lässt, kann an dieser Stelle nicht springen.`]}),`
`,e.jsx(q,{kind:"Satz",label:"10.5.2 (Stetigkeit aus Differenzierbarkeit)",id:"env-stetigkeit-aus-differenzierbarkeit",children:e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"})," normierte Vektorräume und ",e.jsx(n,{children:"f\\colon \\D \\to \\E"})," in ",e.jsx(n,{children:"\\bx \\in \\D"}),`
differenzierbar. Dann ist `,e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," ",e.jsx(v,{id:"continuity",children:"stetig"}),"."]})}),`
`,e.jsxs(xe,{title:"Warum Differenzierbarkeit Stetigkeit erzwingt",children:[e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," verlangt von ",e.jsx(n,{children:"D_{\\bx} f"})," nicht nur Linearität, sondern auch Beschränktheit; das ",e.jsx(n,{children:"M"})," darf von der Stelle ",e.jsx(n,{children:"\\bx"})," abhängen, nicht aber von ",e.jsx(n,{children:"\\bh"})]}),children:[e.jsxs(i.p,{children:["Die Ableitung ",e.jsx(n,{children:"\\cgreen{D_{\\bx} f}"}),` ist nach Definition eine beschränkte lineare Abbildung.
Es gibt also ein `,e.jsx(n,{children:"M < \\infty"})," mit"]}),e.jsx(o,{children:`\\left\\|\\cgreen{D_{\\bx} f(\\bh)}\\right\\| \\le M \\left\\|\\bh\\right\\|
\\qquad \\text{für alle } \\bh ,`}),e.jsxs(i.p,{children:["und damit ist ",e.jsx(n,{children:"\\cgreen{D_{\\bx} f(\\bh)} = O(\\left\\|\\bh\\right\\|)"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["der Quotient ",e.jsx(n,{children:"\\left\\|r(\\bh)\\right\\|/\\left\\|\\bh\\right\\|"})," strebt gegen null, liegt also ab einem ",e.jsx(n,{children:"\\delta"})," unter ",e.jsx(n,{children:"1"})]}),children:[e.jsxs(i.p,{children:["Der Restterm ",e.jsx(n,{children:"\\cred{r(\\bh)} := \\cblue{f(\\bx+\\bh)} - \\cblue{f(\\bx)} - \\cgreen{D_{\\bx} f(\\bh)}"}),`
ist nach `,e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"})," von der Ordnung ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),". Nach ",e.jsx(i.a,{href:"#env-gross-o-und-klein-o-fuer-kleine",children:"Bemerkung 10.5.1"}),`
gibt es deshalb ein `,e.jsx(n,{children:"\\delta > 0"})," mit"]}),e.jsx(o,{children:`\\left\\|\\cred{r(\\bh)}\\right\\| \\le \\left\\|\\bh\\right\\|
\\qquad \\text{für alle } \\bh \\text{ mit } \\left\\|\\bh\\right\\| < \\delta .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["erst die Definition von ",e.jsx(n,{children:"r(\\bh)"})," umgestellt, dann die Dreiecksungleichung, dann die Schranken aus Schritt 1 und 2"]}),children:[e.jsxs(i.p,{children:["Beide Schranken zusammen liefern für alle ",e.jsx(n,{children:"\\bh"})," mit ",e.jsx(n,{children:"\\left\\|\\bh\\right\\| < \\delta"})]}),e.jsx(o,{children:`\\left\\|\\cblue{f(\\bx+\\bh)} - \\cblue{f(\\bx)}\\right\\|
= \\left\\|\\cgreen{D_{\\bx} f(\\bh)} + \\cred{r(\\bh)}\\right\\|
\\le M \\left\\|\\bh\\right\\| + \\left\\|\\bh\\right\\|
= (M+1)\\left\\|\\bh\\right\\| .`})]}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:["Stetigkeit in ",e.jsx(n,{children:"\\bx"})," bedeutet gerade, dass die Funktionswerte in der Nähe von ",e.jsx(n,{children:"\\bx"})," gegen ",e.jsx(n,{children:"f(\\bx)"})," streben"]}),children:e.jsxs(i.p,{children:["Die rechte Seite geht für ",e.jsx(n,{children:"\\left\\|\\bh\\right\\| \\to 0"}),` gegen null, also auch die linke. Das
heißt `,e.jsx(n,{children:"\\cblue{f(\\bx+\\bh)} \\to \\cblue{f(\\bx)}"}),", und das ist die Stetigkeit von ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"}),"."]})})]}),e.jsxs(i.p,{children:[`Üblicherweise fasst man die beiden Zusatzterme zu einem einzigen zusammen und schreibt kurz
`,e.jsx(n,{children:"\\cblue{f(\\bx+\\bh)} = \\cblue{f(\\bx)} + O(\\left\\|\\bh\\right\\|)"}),`. Schritt 3 ist genau diese
Aussage, nur mit der Konstanten `,e.jsx(n,{children:"M+1"}),` ausgeschrieben. Nebenbei sehen wir, welche Zutat
wirklich gebraucht wird: die Beschränktheit von `,e.jsx(n,{children:"\\cgreen{D_{\\bx} f}"}),`. In
endlich-dimensionalen Räumen ist jede lineare Abbildung automatisch beschränkt
(`,e.jsx(i.a,{href:"#env-linearisierung-wie-die-definition-zu-lesen-ist",children:"Bemerkung 10.1.6"}),`), dort kostet Schritt 1 also nichts. Im Unendlichdimensionalen ist die
Forderung eine echte Zusatzbedingung, und ohne sie bricht der Beweis zusammen.`]})]}),`
`,e.jsx(i.h3,{children:"Stetig, aber nicht differenzierbar"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),` hat eine Richtung. Die andere ist falsch, und das Gegenbeispiel ist so
einfach, dass es kaum ein besseres gibt.`]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.5.3 (Die Betragsfunktion am Nullpunkt)",id:"env-die-betragsfunktion-am-nullpunkt",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R \\to \\R"})," mit ",e.jsx(n,{children:"\\cblue{f(x)} = \\left|x\\right|"}),`, betrachtet an der Stelle
`,e.jsx(n,{children:"x = 0"}),"."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Stetig ist ",e.jsx(n,{children:"f"})," dort."]})," Für ",e.jsx(n,{children:"h \\to 0"}),` gilt
`,e.jsx(n,{children:"\\cblue{f(0+h)} = \\left|h\\right| \\to 0 = \\cblue{f(0)}"}),". ",e.jsx(n,{children:"\\checkmark"})]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Differenzierbar ist ",e.jsx(n,{children:"f"})," dort nicht."]})," Diesen Knick haben wir in ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),` schon
vermessen: Der Differenzenquotient ist für jedes `,e.jsx(n,{children:"h > 0"})," exakt ",e.jsx(n,{children:"\\cgreen{+1}"}),` und für jedes
`,e.jsx(n,{children:"h < 0"})," exakt ",e.jsx(n,{children:"\\cgreen{-1}"})," (",e.jsx(i.a,{href:"#env-wenn-es-keine-eindeutige-tangente-gibt",children:"Bemerkung 10.1.2"}),`). Beide
einseitigen `,e.jsx(v,{id:"limit",children:"Grenzwerte"}),` existieren also, sie sind bloß verschieden, während
`,e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),` einen einzigen Wert für beide Seiten verlangt. Damit
existiert `,e.jsx(n,{children:"\\cgreen{f'(0)}"}),` nicht, und an den Knick lässt sich keine eindeutige Tangente
anlegen.`]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.5.4 (Die Merkregel und ihre Kontraposition)",id:"env-die-merkregel-und-ihre-kontraposition",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"})," und ",e.jsx(i.a,{href:"#env-die-betragsfunktion-am-nullpunkt",children:"Beispiel 10.5.3"})," zusammen ergeben"]}),e.jsx(o,{children:`\\text{differenzierbar in } \\bx \\quad\\implies\\quad \\text{stetig in } \\bx ,
\\qquad
\\text{stetig in } \\bx \\quad\\notimplies\\quad \\text{differenzierbar in } \\bx .`}),e.jsxs(i.p,{children:[`Stetigkeit ist für Differenzierbarkeit also notwendig, aber nicht hinreichend. In der
Praxis benutzen wir meist die Kontraposition der ersten Zeile: Wo eine Funktion springt,
brauchen wir gar nicht erst nach einer Ableitung zu suchen. Umgekehrt darf uns ein glatt
aussehender Graph nicht beruhigen, denn Knicke sind mit Stetigkeit verträglich. Beides
begegnet uns wieder, sobald wir in `,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"}),` Ableitungen höheren Grades
verlangen: Jede Ableitungsstufe kostet eine Stufe Glattheit.`]})]}),`
`,e.jsx(Ds,{}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:["Die beiden Aussagen als Bild, alles an der Stelle ",e.jsx(n,{children:"x_0 = 0"}),`. Der grüne Bereich liegt
vollständig im blauen; das ist `,e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),`. Im Ring dazwischen wohnt die Betragsfunktion
aus `,e.jsx(i.a,{href:"#env-die-betragsfunktion-am-nullpunkt",children:"Beispiel 10.5.3"}),`, und dass dieser Ring nicht leer ist, verbietet die Umkehrung. Ganz
außen steht die Sprungfunktion `,e.jsx(n,{children:"H"}),", die in ",e.jsx(n,{children:"0"}),` nicht einmal stetig ist und deshalb auch
nicht differenzierbar sein kann. Die Farben folgen dem Kapitel-Code: Blau gehört zur
Funktion und ihren Werten, und Stetigkeit ist eine Aussage über Funktionswerte; Grün
gehört zum Ableitungsterm, und Differenzierbarkeit ist die Existenz genau dieses Terms.`]})}),`
`,e.jsxs(i.p,{children:[`Ein zweiter Blick auf denselben Sachverhalt lohnt sich, und er ist der anschaulichere.
Differenzierbarkeit in `,e.jsx(n,{children:"\\bx"})," heißt nach ",e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),", dass sich ",e.jsx(n,{children:"f"}),` dort bis auf einen
Rest der Ordnung `,e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"}),` durch eine lineare Abbildung ersetzen lässt. Wenn
das stimmt, muss der Graph unter einer starken Lupe aussehen wie eine Gerade. Was passiert
also, wenn wir in eine Stelle hineinzoomen: Bei welcher der drei Funktionen wird die Kurve
irgendwann gerade, und bei welcher nicht?`]}),`
`,e.jsxs(me,{title:"Unter der Lupe: lokal linear oder nicht",children:[e.jsxs(i.p,{children:["Wir legen ein quadratisches Fenster um die Stelle ",e.jsx(n,{children:"x_0"}),` und ziehen es zusammen. Beide Achsen
werden dabei gleich gestaucht, das Bild zeigt also wirklich einen Zoom und keine gestreckte
Fassung. Gemessen wird, wie weit die Kurve im Fenster von der Geraden abweicht, die durch die
beiden Fensterränder läuft.`]}),e.jsx(qs,{}),e.jsxs(i.p,{children:["Die drei Funktionen verhalten sich an der Stelle ",e.jsx(n,{children:"0"}),` grundverschieden. Bei
`,e.jsx(n,{children:"\\cblue{f(x) = x^2}"}),` halbiert sich die Abweichung von der Geraden mit jeder Halbierung des
Fensters; genau das besagt der Rest `,e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"}),` in
`,e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),". Bei ",e.jsx(n,{children:"\\cblue{f(x) = \\left|x\\right|}"}),` steht sie auf jeder
Zoomstufe bei genau einem `,e.jsx(n,{children:"w"}),", und bei ",e.jsx(n,{children:"\\cblue{f(x) = \\sqrt{\\left|x\\right|}}"}),` wächst sie
beim Hineinzoomen sogar wie `,e.jsx(n,{children:"1/\\sqrt{w}"}),`. Nichtdifferenzierbarkeit hat also mehr als eine
Bauform, und keine davon verträgt sich mit einer Geraden. Verschieben wir `,e.jsx(n,{children:"x_0"})," von der ",e.jsx(n,{children:"0"}),`
weg, so wird auch der Betrag lokal linear – die Ausnahme steckt in der Stelle, nicht in der
Funktion.`]})]}),`
`,e.jsx(i.h3,{children:"Die Ableitung ist linear"}),`
`,e.jsxs(i.p,{children:[`Die zweite allgemeine Eigenschaft betrifft nicht eine einzelne Funktion, sondern die
Zuordnung `,e.jsx(n,{children:"f \\mapsto \\cgreen{D_{\\bx} f}"}),` selbst. Sie ist verträglich mit Summen und mit
Vielfachen, und das ist der Grund, warum wir Summen von Bausteinen Summand für Summand
ableiten dürfen.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.5.5 (Linearität der Ableitungsoperation)",id:"env-linearitaet-der-ableitungsoperation",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"})," normierte Vektorräume und ",e.jsx(n,{children:"f, g\\colon \\D \\to \\E"})," in ",e.jsx(n,{children:"\\bx \\in \\D"}),`
differenzierbar. Dann ist für alle `,e.jsx(n,{children:"c_1, c_2 \\in \\R"})," auch ",e.jsx(n,{children:"c_1 f + c_2 g"})," in ",e.jsx(n,{children:"\\bx"}),`
differenzierbar, und es gilt`]}),e.jsx(T,{tag:"10.5.2",id:"eq-linearitaet-der-ableitungsoperation",children:"\\cgreen{D_{\\bx} (c_1 f + c_2 g)} = c_1 \\cgreen{D_{\\bx} f} + c_2 \\cgreen{D_{\\bx} g} ."})]}),`
`,e.jsxs(xe,{title:"Warum die Ableitungsoperation linear ist",children:[e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),", einmal für ",e.jsx(n,{children:"f"})," und einmal für ",e.jsx(n,{children:"g"}),"; die beiden Restterme bekommen Namen, damit wir sie in Schritt 3 einzeln abschätzen können"]}),children:[e.jsxs(i.p,{children:["Wir entwickeln beide Funktionen einzeln nach ",e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),","]}),e.jsx(o,{children:`\\begin{aligned}
\\cblue{f(\\bx+\\bh)} &= \\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)} , \\\\
\\cblue{g(\\bx+\\bh)} &= \\cblue{g(\\bx)} + \\cgreen{D_{\\bx} g(\\bh)} + \\cred{r_g(\\bh)} ,
\\end{aligned}`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\cred{r_f(\\bh)} = \\cred{o(\\left\\|\\bh\\right\\|)}"}),` und
`,e.jsx(n,{children:"\\cred{r_g(\\bh)} = \\cred{o(\\left\\|\\bh\\right\\|)}"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["nichts als Umsortieren: die Funktionswerte nach vorn, die in ",e.jsx(n,{children:"\\bh"})," linearen Terme in die Mitte, die Restterme nach hinten"]}),children:[e.jsx(i.p,{children:"Jetzt bilden wir die Linearkombination und sortieren die Terme nach Bauart:"}),e.jsx(o,{children:`\\begin{aligned}
(c_1 f + c_2 g)(\\bx + \\bh)
&= c_1 \\left[\\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)}\\right]
 + c_2 \\left[\\cblue{g(\\bx)} + \\cgreen{D_{\\bx} g(\\bh)} + \\cred{r_g(\\bh)}\\right] \\\\
&= \\cblue{(c_1 f + c_2 g)(\\bx)}
 + \\cgreen{\\left(c_1 D_{\\bx} f + c_2 D_{\\bx} g\\right)(\\bh)}
 + \\cred{\\left(c_1 r_f(\\bh) + c_2 r_g(\\bh)\\right)} .
\\end{aligned}`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Dreiecksungleichung und Homogenität der Norm; eine endliche Linearkombination von ",e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"}),"-Termen ist wieder ",e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"})]}),children:[e.jsxs(i.p,{children:["Die Zerlegung hat die Gestalt von ",e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),`, sobald zwei Dinge stimmen. Erstens ist der
mittlere Term eine beschränkte lineare Abbildung in `,e.jsx(n,{children:"\\bh"}),`: Linearkombinationen linearer
Abbildungen sind linear, und mit den Schranken `,e.jsx(n,{children:"M_f"})," und ",e.jsx(n,{children:"M_g"}),` von
`,e.jsx(n,{children:"\\cgreen{D_{\\bx} f}"})," und ",e.jsx(n,{children:"\\cgreen{D_{\\bx} g}"})," gilt"]}),e.jsx(o,{children:`\\left\\|\\cgreen{\\left(c_1 D_{\\bx} f + c_2 D_{\\bx} g\\right)(\\bh)}\\right\\|
\\le \\left(\\left|c_1\\right| M_f + \\left|c_2\\right| M_g\\right) \\left\\|\\bh\\right\\| .`}),e.jsxs(i.p,{children:["Zweitens ist der hintere Term wieder ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),", denn"]}),e.jsx(o,{children:`\\frac{\\left\\|\\cred{c_1 r_f(\\bh) + c_2 r_g(\\bh)}\\right\\|}{\\left\\|\\bh\\right\\|}
\\le \\left|c_1\\right| \\frac{\\left\\|\\cred{r_f(\\bh)}\\right\\|}{\\left\\|\\bh\\right\\|}
 + \\left|c_2\\right| \\frac{\\left\\|\\cred{r_g(\\bh)}\\right\\|}{\\left\\|\\bh\\right\\|}
\\xrightarrow{\\ \\left\\|\\bh\\right\\| \\to 0\\ } 0 .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Eindeutigkeit der Fréchet-Ableitung; für Jacobimatrizen steht dasselbe Argument als ",e.jsx(i.a,{href:"#env-die-matrix-der-linearen-naeherung",children:"Lemma 10.3.3"})," in ",e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"})]}),children:[e.jsxs(i.p,{children:["Damit erfüllt ",e.jsx(n,{children:"c_1 \\cgreen{D_{\\bx} f} + c_2 \\cgreen{D_{\\bx} g}"}),` die Definition der
Fréchet-Ableitung für `,e.jsx(n,{children:"c_1 f + c_2 g"}),": Die Funktion ist in ",e.jsx(n,{children:"\\bx"}),` differenzierbar, und die
angegebene Abbildung leistet das Verlangte. Eine zweite kann es nicht geben. Erfüllen
nämlich `,e.jsx(n,{children:"A"})," und ",e.jsx(n,{children:"B"})," beide ",e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),", so ist ",e.jsx(n,{children:"(A - B)(\\bh) = o(\\left\\|\\bh\\right\\|)"}),`;
setzen wir für festes `,e.jsx(n,{children:"\\bu \\neq \\bnull"})," nun ",e.jsx(n,{children:"\\bh = t\\bu"})," mit ",e.jsx(n,{children:"t \\to 0"}),` ein, so kürzt sich
der Faktor `,e.jsx(n,{children:"\\left|t\\right|"})," heraus,"]}),e.jsx(o,{children:`\\frac{\\left\\|(A-B)(t\\bu)\\right\\|}{\\left\\|t\\bu\\right\\|}
= \\frac{\\left|t\\right|\\left\\|(A-B)(\\bu)\\right\\|}{\\left|t\\right|\\left\\|\\bu\\right\\|}
= \\frac{\\left\\|(A-B)(\\bu)\\right\\|}{\\left\\|\\bu\\right\\|} .`}),e.jsxs(i.p,{children:["Der Quotient hängt also gar nicht von ",e.jsx(n,{children:"t"}),` ab, muss aber gegen null streben und ist damit
selbst null. Also stimmen `,e.jsx(n,{children:"A"})," und ",e.jsx(n,{children:"B"})," überein, und ",e.jsx(i.a,{href:"#eq-linearitaet-der-ableitungsoperation",children:"(10.5.2)"}),` gilt mit
Gleichheitszeichen.`]})]})]}),e.jsx(i.p,{children:`Der Kern dieses Beweises steckt in Schritt 3: Beide Zutaten der Definition, Linearität mit
Beschränktheit und die Kleinheit des Restes, überstehen das Bilden von
Linearkombinationen unbeschadet.`})]}),`
`,e.jsx(i.h3,{children:"Was die Linearität in den einzelnen Formaten bedeutet"}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.5.6 (Fünf Spezialfälle derselben Aussage)",id:"env-fuenf-spezialfaelle-derselben-aussage",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-linearitaet-der-ableitungsoperation",children:"(10.5.2)"}),` ist eine Aussage über lineare Abbildungen. In den Spezialfällen aus den
Abschnitten `,e.jsx(i.a,{href:"#sec-10.2",children:"10.2"})," bis ",e.jsx(i.a,{href:"#sec-10.4",children:"10.4"}),` steckt diese Abbildung jeweils in einem
konkreten Objekt, und die Linearität überträgt sich wörtlich auf dieses Objekt. Es sind fünf
Fälle, und wir gehen sie in derselben Reihenfolge durch wie der Fahrplan in
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),". Überall sind ",e.jsx(n,{children:"c_1, c_2 \\in \\R"}),`
beliebig, und die beteiligten Funktionen sind an der jeweiligen Stelle differenzierbar.`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\D = \\R"}),", ",e.jsx(n,{children:"\\E = \\R"}),`: die gewöhnliche Ableitung
(`,e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),")."]}),`
`,e.jsx(o,{children:"\\cgreen{(c_1 f + c_2 g)'} = c_1 \\cgreen{f'} + c_2 \\cgreen{g'}"}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\D = \\R^n"}),", ",e.jsx(n,{children:"\\E = \\R"}),`: der Gradient
(`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),")."]}),`
`,e.jsx(o,{children:`\\corange{\\nabla\\left[c_1 f(\\bx) + c_2 g(\\bx)\\right]}
= c_1 \\corange{\\nabla f(\\bx)} + c_2 \\corange{\\nabla g(\\bx)}`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\D = \\R^n"}),", ",e.jsx(n,{children:"\\E = \\R^m"}),`: die Jacobimatrix
(`,e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),")."]}),`
`,e.jsx(o,{children:`\\corange{\\bJ_{c_1 f + c_2 g}(\\bx)}
= c_1 \\corange{\\bJ_f(\\bx)} + c_2 \\corange{\\bJ_g(\\bx)}`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\D = \\R"}),", ",e.jsx(n,{children:"\\E = \\R^{m \\times n}"}),`: eine matrixwertige Funktion eines Skalars
(`,e.jsx(i.a,{href:"#env-ableitung-einer-matrixwertigen-funktion",children:"Definition 10.4.1"})," in ",e.jsx(i.a,{href:"#sec-10.4",children:"Abschnitt 10.4"}),")."]}),`
`,e.jsx(o,{children:`\\corange{\\frac{\\partial \\left[c_1 F(x) + c_2 G(x)\\right]}{\\partial x}}
= c_1 \\corange{\\frac{\\partial F(x)}{\\partial x}}
+ c_2 \\corange{\\frac{\\partial G(x)}{\\partial x}}`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\D = \\R^{m \\times n}"}),", ",e.jsx(n,{children:"\\E = \\R"}),`: die Ableitung nach einer Matrix
(`,e.jsx(i.a,{href:"#env-ableitung-nach-einer-matrix",children:"Definition 10.4.7"})," in ",e.jsx(i.a,{href:"#sec-10.4",children:"Abschnitt 10.4"}),")."]}),`
`,e.jsx(o,{children:`\\corange{\\frac{\\partial \\left[c_1 f(\\bX) + c_2 g(\\bX)\\right]}{\\partial \\bX}}
= c_1 \\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}}
+ c_2 \\corange{\\frac{\\partial g(\\bX)}{\\partial \\bX}}`}),`
`]}),`
`]}),e.jsxs(i.p,{children:[`Alle fünf Zeilen sagen dasselbe: Die Ableitungsobjekte werden eintragsweise addiert und
mit Skalaren multipliziert. Überraschend ist das nicht, denn jeder ihrer Einträge ist eine
gewöhnliche oder eine partielle Ableitung, und für die kennen wir die Linearität schon aus
der Analysis. Der Gewinn liegt woanders: `,e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),` gilt in jedem normierten Raum, also
auch dort, wo wir gar keine Einträge zum Nachrechnen haben. Die drei leeren Zellen der Tabelle aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` bleiben auch hier unbesetzt; sie bräuchten
`,e.jsx(v,{id:"tensor",children:"Tensoren"}),` mit mindestens drei Indexpositionen
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Abschnitt 9.2"}),")."]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.5.7 (Linearität an einem Zahlenbeispiel)",id:"env-linearitaet-an-einem-zahlenbeispiel",children:[e.jsxs(i.p,{children:["Gegeben sind ",e.jsx(n,{children:"\\cblue{f(\\bx)} = \\bx^\\top\\bx"})," und ",e.jsx(n,{children:"\\cblue{g(\\bx)} = \\ba^\\top\\bx"}),` mit
`,e.jsx(n,{children:"\\ba = (1, 2)^\\top"}),". Gesucht ist ",e.jsx(n,{children:"\\corange{\\nabla h(\\bx)}"}),` für
`,e.jsx(n,{children:"\\cblue{h(\\bx)} = 3\\cblue{f(\\bx)} - 2\\cblue{g(\\bx)}"}),` an der Stelle
`,e.jsx(n,{children:"\\bx = (1, -1)^\\top"}),". Der Buchstabe ",e.jsx(n,{children:"h"}),` ist hier ausnahmsweise ein Funktionsname und nicht
der Zuwachs aus `,e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"}),"; ein Zuwachs kommt in dieser Rechnung nicht vor."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Schritt 1: die Gradienten der Bausteine."}),` Ausgeschrieben ist
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = x_1^2 + x_2^2"}),", also"]}),e.jsx(o,{children:"\\corange{\\nabla f(\\bx)} = (2x_1,\\; 2x_2) = 2\\bx^\\top ."}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-gradient-der-quadratischen-form",children:"Satz 10.2.8"})," mit ",e.jsx(n,{children:"\\bA = \\bI"}),". Für ",e.jsx(n,{children:"\\cblue{g(\\bx)} = x_1 + 2x_2"}),` liefert
`,e.jsx(i.a,{href:"#env-gradient-einer-linearen-funktion",children:"Beispiel 10.2.7"})]}),e.jsx(o,{children:"\\corange{\\nabla g(\\bx)} = \\ba^\\top = (1,\\; 2) ."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Schritt 2: Linearität anwenden."})," Zeile 2 aus ",e.jsx(i.a,{href:"#env-fuenf-spezialfaelle-derselben-aussage",children:"Bemerkung 10.5.6"})," mit ",e.jsx(n,{children:"c_1 = 3"}),` und
`,e.jsx(n,{children:"c_2 = -2"})," ergibt"]}),e.jsx(o,{children:`\\corange{\\nabla h(\\bx)} = 3\\corange{\\nabla f(\\bx)} - 2\\corange{\\nabla g(\\bx)}
= 3\\,(2x_1,\\; 2x_2) - 2\\,(1,\\; 2)
= (6x_1 - 2,\\; 6x_2 - 4) .`}),e.jsx(i.p,{children:e.jsx(i.em,{children:"Schritt 3: die Stelle einsetzen."})}),e.jsx(o,{children:`\\corange{\\nabla h\\left(\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}\\right)}
= (6 \\cdot 1 - 2,\\; 6 \\cdot (-1) - 4)
= (4,\\; -10) .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Probe."})," Multiplizieren wir ",e.jsx(n,{children:"h"}),` zuerst aus, so steht dort
`,e.jsx(n,{children:"\\cblue{h(\\bx)} = 3x_1^2 + 3x_2^2 - 2x_1 - 4x_2"}),`, und die beiden partiellen Ableitungen
sind `,e.jsx(n,{children:"6x_1 - 2"})," und ",e.jsx(n,{children:"6x_2 - 4"}),". ",e.jsx(n,{children:"\\checkmark"}),` Bei diesem kleinen Beispiel sind beide Wege
etwa gleich lang. Sobald `,e.jsx(n,{children:"f"})," und ",e.jsx(n,{children:"g"}),` komplizierter werden, spielt der Umweg über die
Bausteine seinen Vorteil aus, denn wir dürfen dann auf fertige Identitäten aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` zurückgreifen, statt eine unübersichtliche
Summe von Hand zu differenzieren.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar, so ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," stetig."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),`. Der Beweis schätzt beide Zusatzterme der linearen Approximation nach
oben ab: den Ableitungsterm durch `,e.jsx(n,{children:"M\\left\\|\\bh\\right\\|"})," und den Restterm für kleine ",e.jsx(n,{children:"\\bh"}),`
durch `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`. Zusammen bleibt
`,e.jsx(n,{children:"\\left\\|f(\\bx+\\bh) - f(\\bx)\\right\\| \\le (M+1)\\left\\|\\bh\\right\\|"}),`, und diese Schranke geht
gegen null.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," stetig, so ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar."]}),e.jsxs(i.p,{children:["Die Umkehrung von ",e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"})," gilt nicht. Die Betragsfunktion ist in ",e.jsx(n,{children:"0"}),` stetig, ihr
Differenzenquotient strebt dort aber von rechts gegen `,e.jsx(n,{children:"+1"})," und von links gegen ",e.jsx(n,{children:"-1"}),`
(`,e.jsx(i.a,{href:"#env-die-betragsfunktion-am-nullpunkt",children:"Beispiel 10.5.3"}),"). Stetigkeit ist notwendig, nicht hinreichend."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Am Knick von ",e.jsx(n,{children:"f(x) = \\left|x\\right|"}),` existieren die einseitigen Grenzwerte des
Differenzenquotienten nicht.`]}),e.jsxs(i.p,{children:["Sie existieren beide, sie stimmen nur nicht überein: ",e.jsx(n,{children:"+1"})," von rechts, ",e.jsx(n,{children:"-1"}),` von links, und
zwar schon für jedes einzelne `,e.jsx(n,{children:"h \\neq 0"}),". Genau daran scheitert ",e.jsx(i.a,{href:"#env-differenzierbarkeit",children:"Definition 10.1.1"}),`, die
einen einzigen Grenzwert für beide Seiten verlangt.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil die Ableitungsoperation nach ",e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"})," linear ist, hängt ",e.jsx(n,{children:"D_{\\bx} f"}),` linear von der
Stelle `,e.jsx(n,{children:"\\bx"})," ab."]}),e.jsxs(i.p,{children:["Hier werden zwei Linearitäten verwechselt. ",e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),` sagt etwas über die Zuordnung
`,e.jsx(n,{children:"f \\mapsto D_{\\bx} f"})," bei fester Stelle. Wie ",e.jsx(n,{children:"D_{\\bx} f"})," von ",e.jsx(n,{children:"\\bx"}),` abhängt, bleibt völlig
offen: Für `,e.jsx(n,{children:"f(x) = x^3"})," ist ",e.jsx(n,{children:"D_x f(h) = 3x^2 h"}),", und ",e.jsx(n,{children:"x \\mapsto 3x^2"}),` ist nicht linear
(`,e.jsx(i.a,{href:"#env-was-hier-eigentlich-linear-ist",children:"Bemerkung 10.1.4"}),")."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Jeder Term der Ordnung ",e.jsx(n,{children:"O(\\left\\|\\bh\\right\\|)"})," ist auch ",e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"}),"."]}),e.jsxs(i.p,{children:["Es gilt nur die eine Richtung. Jeder ",e.jsx(n,{children:"o"}),"-Term ist ein ",e.jsx(n,{children:"O"}),"-Term (",e.jsx(i.a,{href:"#env-gross-o-und-klein-o-fuer-kleine",children:"Bemerkung 10.5.1"}),`), aber
`,e.jsx(n,{children:"g(h) = h"})," erfüllt ",e.jsx(n,{children:"\\left|g(h)\\right| \\le \\left|h\\right|"}),` und ist damit
`,e.jsx(n,{children:"O(\\left|h\\right|)"}),", während ",e.jsx(n,{children:"g(h)/\\left|h\\right|"})," betragsmäßig konstant ",e.jsx(n,{children:"1"}),` bleibt und
nicht gegen null geht. Deshalb steht in `,e.jsx(i.a,{href:"#eq-eq-10-5-1",children:"(10.5.1)"})," das kleine ",e.jsx(n,{children:"o"})," und nicht das große ",e.jsx(n,{children:"O"}),`:
Mit `,e.jsx(n,{children:"O"}),` wäre die Forderung fast leer, denn sobald überhaupt eine beschränkte lineare
Abbildung passte, passte jede andere genauso; die Differenz zweier solcher Abbildungen ist
selbst `,e.jsx(n,{children:"O(\\left\\|\\bh\\right\\|)"}),"."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für in ",e.jsx(n,{children:"\\bx"})," differenzierbare ",e.jsx(n,{children:"f, g\\colon \\R^n \\to \\R"}),` gilt
`,e.jsx(n,{children:"\\nabla\\left[3f(\\bx) - 2g(\\bx)\\right] = 3\\nabla f(\\bx) - 2\\nabla g(\\bx)"}),"."]}),e.jsxs(i.p,{children:["Das ist Zeile 2 aus ",e.jsx(i.a,{href:"#env-fuenf-spezialfaelle-derselben-aussage",children:"Bemerkung 10.5.6"}),", also ",e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"})," im Fall ",e.jsx(n,{children:"\\D = \\R^n"}),", ",e.jsx(n,{children:"\\E = \\R"}),` mit
`,e.jsx(n,{children:"c_1 = 3"})," und ",e.jsx(n,{children:"c_2 = -2"}),". ",e.jsx(i.a,{href:"#env-linearitaet-an-einem-zahlenbeispiel",children:"Beispiel 10.5.7"}),` rechnet genau diesen Fall durch und erhält an
der Stelle `,e.jsx(n,{children:"(1, -1)^\\top"})," den Gradienten ",e.jsx(n,{children:"(4, -10)"}),"."]})]}),e.jsxs(We,{loesung:1,toleranz:.001,children:[e.jsxs(i.p,{children:["Stellen wir im Lupen-Widget ",e.jsx(n,{children:"f(x) = \\left|x\\right|"})," und ",e.jsx(n,{children:"x_0 = 0"}),` ein und zoomen so weit
hinein, wie der Regler reicht. Welchen Wert hat die angezeigte Abweichung von der Geraden
dann, gemessen in Vielfachen der halben Fensterbreite `,e.jsx(n,{children:"w"}),"?"]}),e.jsxs(i.p,{children:["Genau ",e.jsx(n,{children:"1"}),`, und zwar auf jeder einzelnen Zoomstufe. Die Sehne durch die beiden Fensterränder
ist bei `,e.jsx(n,{children:"x_0 = 0"})," waagerecht und liegt auf der Höhe ",e.jsx(n,{children:"w"}),`, während die Kurve in der Mitte den
Wert `,e.jsx(n,{children:"0"})," hat; die Abweichung ist also ",e.jsx(n,{children:"w"})," selbst, in Vielfachen von ",e.jsx(n,{children:"w"})," gerechnet ",e.jsx(n,{children:"1"}),`. Der Knick
verschwindet unter keiner Lupe. Zum Vergleich: Bei `,e.jsx(n,{children:"f(x) = x^2"})," steht dort ",e.jsx(n,{children:"w"}),` selbst, also
eine Zahl, die mit jedem Zoomschritt kleiner wird.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:["Vertiefung: Die Summenregel in MML §5.1.2 ist der Spezialfall ",e.jsx(n,{children:"\\D = \\E = \\R"}),` von
`,e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),"; die übrigen Regeln von dort nimmt ",e.jsx(i.a,{href:"#sec-10.6",children:"Abschnitt 10.6"})," auf."]})})]})}function Es(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(ct,{...r})}):ct(r)}const bi=P.blau,gi=P.gruen,Ii=r=>1/(1+Math.exp(-r)),Xi=[{id:"potenz",label:"h(x) = (2x + 1)⁴",f:r=>2*r+1,fp:()=>2,g:r=>r**4,gp:r=>4*r**3,fTex:"f(x) = 2x + 1",gTex:"g(u) = u⁴",x0:-1.6,x1:.6,y0:-1.2,y1:8.5,xs0:-1.3,xs1:.3,start:.3},{id:"wurzel",label:"h(x) = √(x²)",f:r=>r*r,fp:r=>2*r,g:r=>Math.sqrt(r),gp:r=>1/(2*Math.sqrt(r)),fTex:"f(x) = x²",gTex:"g(u) = √u",x0:-1.6,x1:1.6,y0:-.5,y1:2.2,xs0:-1.5,xs1:1.5,start:.6},{id:"logistisch",label:"h(x) = σ(3x − 1)",f:r=>3*r-1,fp:()=>3,g:Ii,gp:r=>Ii(r)*(1-Ii(r)),fTex:"f(x) = 3x − 1",gTex:"g(u) = σ(u) = 1/(1 + e^(−u))",x0:-1.6,x1:1.8,y0:-.2,y1:1.25,xs0:-1.5,xs1:1.7,start:.3}],ji=340,ei=230,gn=36,Bs=18,Ws=8,xt=320,Ji=1e-6,ce=(r,i=3)=>u(r,i);function Gs(){const[r,i]=E.useState("potenz"),[t,l]=E.useState(.3),s=Xi.find(k=>k.id===r)??Xi[0],{f:c,fp:h,g:x,gp:d}=s,f=k=>x(c(k)),j=c(t),D=f(t),a=h(t),A=d(j),z=A*a,p=(f(t+Ji)-f(t-Ji))/(2*Ji),R=Number.isFinite(z),M=k=>gn+(k-s.x0)/(s.x1-s.x0)*ji,F=k=>(s.y1-k)/(s.y1-s.y0)*ei,_=(()=>{const k=[];for(let K=0;K<=xt;K++){const O=s.x0+(s.x1-s.x0)*K/xt,X=f(O);k.push(`${K===0?"M":"L"}${M(O).toFixed(1)},${F(X).toFixed(1)}`)}return k.join(" ")})(),y=R?{x1:M(s.x0),y1:F(D+z*(s.x0-t)),x2:M(s.x1),y2:F(D+z*(s.x1-t))}:null,g=Be(s.y0,s.y1),m=Be(s.x0,s.x1),b=g.length>1?g[1]-g[0]:void 0,N=m.length>1?m[1]-m[0]:void 0;let S="neutral",w;R?s.id==="wurzel"?(S="ok",w=`Zwei Faktoren, die beide aus dem Ruder laufen, und trotzdem ein zahmes Produkt: die äußere Rate g′(f(x)) = 1/(2|x|) = ${ce(A,3)} wächst zum Nullpunkt hin unbeschränkt, die innere Rate f′(x) = 2x = ${ce(a,3)} schrumpft dorthin gegen null. Ihr Produkt ist für jedes x ≠ 0 exakt ${ce(z,0)}, also das Vorzeichen von x, wie es sich für die Ableitung von |x| gehört.`):s.id==="logistisch"?(S="ok",w=`Die äußere Rate ist hier σ′(u) = σ(u)(1 − σ(u)) = ${ce(A,4)}: Sie ist am größten, wo σ den Wert 0,5 annimmt, und wird an beiden Enden winzig. Die innere Rate bleibt konstant bei ${ce(a,0)}. Ihr Produkt ${ce(z,4)} ist nach ${V("satz:kettenregel")} die Steigung der grünen Tangente. Dieselbe Rechnung steckt im Gradienten der logistischen Regression weiter unten.`):(S="ok",w=`Beide Stationen sind an dieser Stelle lineare Abbildungen mit je einer Zahl als Faktor: die innere mit f′(x) = ${ce(a,2)}, die äußere mit g′(f(x)) = ${ce(A,3)}. ${V("satz:kettenregel")} schaltet die beiden hintereinander, und für Multiplikationen mit Zahlen heißt das schlicht multiplizieren: h′(x) = ${ce(z,3)}. Die Gegenprobe kommt ohne die Kettenregel aus und landet auf mehreren Stellen beim selben Wert.`):(S="warn",w=`Hier greift ${V("satz:kettenregel")} nicht: An der Stelle x = ${ce(t,2)} ist f(x) = ${ce(j,2)}, und die äußere Funktion g(u) = √u ist in u = 0 nicht differenzierbar, denn g′(u) = 1/(2√u) wächst über jede Grenze. Die verkettete Funktion h(x) = |x| trägt an dieser Stelle den Knick aus ${V("sec:differentialrechnung/linearisierung")}, und das Produkt aus ∞ und 0 ist keine Zahl. Die Gegenprobe meldet trotzdem einen Wert: Der zentrale Differenzenquotient mittelt über beide Seiten des Knicks und liefert 0. Eine numerische Ableitung merkt von selbst nicht, dass es gar keine gibt.`);const B="rounded border border-slate-400 px-3 py-2 text-center text-sm dark:border-slate-500 [.w-dark_&]:border-slate-500";return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Wählen wir eine Verkettung, schieben x und vergleichen das Produkt der beiden Raten mit der Gegenprobe darunter."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:Xi.map(k=>{const K=k.id===r;return e.jsx("button",{type:"button","aria-pressed":K,className:K?pe:ie,onClick:()=>{i(k.id),l(k.start)},children:k.label},k.id)})}),e.jsx(I,{label:"x",value:t,onChange:k=>l(Math.round(k*20)/20),min:s.xs0,max:s.xs1,step:.05,fmt:k=>ce(k,2)}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-2",children:[e.jsxs("div",{className:B,children:["x = ",e.jsx("span",{className:"font-mono",children:ce(t,2)})]}),e.jsxs("div",{className:"text-sm",children:["→ ",s.fTex," →"]}),e.jsxs("div",{className:B,style:{color:bi},children:["f(x) = ",e.jsx("span",{className:"font-mono",children:ce(j,3)})]}),e.jsxs("div",{className:"text-sm",children:["→ ",s.gTex," →"]}),e.jsxs("div",{className:B,style:{color:bi},children:["h(x) = ",e.jsx("span",{className:"font-mono",children:ce(D,3)})]})]}),e.jsxs("div",{className:`select-none text-[10px] ${Y}`,children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:gn},children:"h(x) ↑"}),e.jsxs("svg",{viewBox:`0 0 ${gn+ji+Ws} ${ei+Bs}`,role:"img","aria-label":`Der Graph von ${s.label} in Blau mit der grünen Tangente an der Stelle x = ${ce(t,2)}.`,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[e.jsx("defs",{children:e.jsx("clipPath",{id:"s112-kette-clip",children:e.jsx("rect",{x:gn,y:0,width:ji,height:ei})})}),g.map(k=>e.jsxs("g",{children:[e.jsx("line",{x1:gn,x2:gn+ji,y1:F(k),y2:F(k),stroke:k===0?"var(--w-axis)":"var(--w-grid)",strokeWidth:k===0?1.2:.6}),e.jsx("text",{x:gn-4,y:F(k)+3,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:De(k,b)})]},`y${k}`)),m.map(k=>e.jsxs("g",{children:[e.jsx("line",{y1:0,y2:ei,x1:M(k),x2:M(k),stroke:k===0?"var(--w-axis)":"var(--w-grid)",strokeWidth:k===0?1.2:.6}),e.jsx("text",{x:M(k),y:ei+12,textAnchor:"middle",fill:"var(--w-text)",fontSize:10,children:De(k,N)})]},`x${k}`)),e.jsxs("g",{clipPath:"url(#s112-kette-clip)",children:[y&&e.jsx("line",{x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,stroke:gi,strokeWidth:2.4}),e.jsx("path",{d:_,fill:"none",stroke:bi,strokeWidth:2.4}),e.jsx("line",{x1:M(t),y1:F(D),x2:M(t),y2:F(s.y0),stroke:"var(--w-axis)",strokeWidth:.8,strokeDasharray:"2 3"}),e.jsx("circle",{cx:M(t),cy:F(D),r:4.5,fill:bi})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:gn},children:"x →"})]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:gi},children:["innere Rate f′(x) = ",ce(a,4)]}),e.jsxs("div",{style:{color:gi},children:["äußere Rate g′(f(x)) = ",ce(A,4)]}),e.jsxs("div",{style:{color:gi},children:["Kettenregel h′(x) = g′(f(x)) · f′(x) = ",ce(z,4)]}),e.jsxs("div",{children:["Gegenprobe (h(x+ε) − h(x−ε))/(2ε) = ",ce(p,4)]})]}),e.jsx(ve,{kind:S,children:w})]})}const An=P.blau,$s=P.gruen,ni=P.orange,Oi=r=>1/(1+Math.exp(-r)),mi=300,ii=210,jn=38,Ls=18,Ni=240,Ui=1e-6,Vs=.5,se=(r,i=3)=>u(r,i);function ot({titel:r,xLabel:i,x0:t,x1:l,y0:s,y1:c,clipId:h,ariaLabel:x,kinder:d}){const f=p=>jn+(p-t)/(l-t)*mi,j=p=>(c-p)/(c-s)*ii,D=Be(s,c),a=Be(t,l),A=D.length>1?D[1]-D[0]:void 0,z=a.length>1?a[1]-a[0]:void 0;return e.jsxs("div",{className:`select-none text-[10px] ${Y}`,children:[e.jsxs("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:jn},children:[r," ↑"]}),e.jsxs("svg",{viewBox:`0 0 ${jn+mi+8} ${ii+Ls}`,role:"img","aria-label":x,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[e.jsx("defs",{children:e.jsx("clipPath",{id:h,children:e.jsx("rect",{x:jn,y:0,width:mi,height:ii})})}),D.map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:jn,x2:jn+mi,y1:j(p),y2:j(p),stroke:p===0?"var(--w-axis)":"var(--w-grid)",strokeWidth:p===0?1.2:.6}),e.jsx("text",{x:jn-4,y:j(p)+3,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:De(p,A)})]},`y${p}`)),a.map(p=>e.jsxs("g",{children:[e.jsx("line",{y1:0,y2:ii,x1:f(p),x2:f(p),stroke:p===0?"var(--w-axis)":"var(--w-grid)",strokeWidth:p===0?1.2:.6}),e.jsx("text",{x:f(p),y:ii+12,textAnchor:"middle",fill:"var(--w-text)",fontSize:10,children:De(p,z)})]},`x${p}`)),e.jsx("g",{clipPath:`url(#${h})`,children:d(f,j)})]}),e.jsxs("div",{className:"text-center text-[11px]",style:{paddingLeft:jn},children:[i," →"]})]})}function ut(r,i,t,l,s){const c=[];for(let h=0;h<=Ni;h++){const x=i+(t-i)*h/Ni;c.push(`${h===0?"M":"L"}${l(x).toFixed(1)},${s(r(x)).toFixed(1)}`)}return c.join(" ")}const fi=-6,Ci=6,Hn=-3,ri=3;function Ps(){const[r,i]=E.useState(1),[t,l]=E.useState(.5),[s,c]=E.useState(1.5),h=_=>{const y=Oi(_*s);return-(r*Math.log(y)+(1-r)*Math.log(1-y))},x=t*s,d=Oi(x),f=h(t),j=(d-r)*s,D=(h(t+Ui)-h(t-Ui))/(2*Ui),a=t-Vs*j;let A=0;for(let _=0;_<=Ni;_++)A=Math.max(A,h(Hn+(ri-Hn)*_/Ni));const z=Math.max(1.2,1.12*A),p=-.09*z;let R="neutral",M;s===0?(R="warn",M=`Bei x = 0 hängt gar nichts von beta ab: Es ist t = 0, also ŷ = 0,5 für jedes beta, der Verlust bleibt konstant bei log 2 = 0,693147, und der Gradient (ŷ − y)·x aus Gleichung (${dn("eq:gradient-des-logistischen-verlusts-2")}) ist null. Ein Merkmal, das immer null ist, trägt keine Information, und die Verlustkurve ist eine waagrechte Gerade.`):Math.abs(d-r)<.05?(R="ok",M=`Die Vorhersage ŷ = ${se(d,3)} liegt schon dicht an der Beobachtung y = ${r}. Der Fehler ŷ − y = ${se(d-r,3)} ist klein, also ist nach Gleichung (${dn("eq:gradient-des-logistischen-verlusts-2")}) auch der Gradient ${se(j,4)} klein: Die Verlustkurve ist hier fast flach, ein Gradientenschritt verschiebt beta kaum noch.`):Math.abs(d-r)>.9?(R="warn",M=`Hier liegt das Modell selbstbewusst daneben: ŷ = ${se(d,3)} bei y = ${r}. Der Fehler ŷ − y = ${se(d-r,3)} schöpft seinen Wertebereich fast aus, entsprechend groß ist der Gradient ${se(j,3)}. Länger als |x| = ${se(Math.abs(s),2)} kann er trotzdem nie werden, denn |ŷ − y| ist immer kleiner als 1 – das ist die zweite Konsequenz aus ${V("bemerkung:fehler-mal-merkmal")}.`):(R="ok",M=`Der Fehler ŷ − y = ${se(d-r,3)} wird mit dem Merkmal x = ${se(s,2)} gewichtet, das ergibt nach Gleichung (${dn("eq:gradient-des-logistischen-verlusts-2")}) den Gradienten ${se(j,4)}. Er ist ${j>0?"positiv":"negativ"}, der Abstiegsschritt schiebt beta also nach ${j>0?"links":"rechts"}, auf ${se(a,2)}. Die grüne Tangente hat genau diese Steigung, und die Gegenprobe darunter kommt ohne ${V("beispiel:gradient-des-logistischen-verlusts")} aus und bestätigt sie.`);const F=r===1?`Für y = 1 steht in Gleichung (${dn("eq:gradient-des-logistischen-verlusts-2")}) der Faktor ŷ − 1, für y = 0 der Faktor ŷ.`:`Für y = 0 steht in Gleichung (${dn("eq:gradient-des-logistischen-verlusts-2")}) der Faktor ŷ, für y = 1 der Faktor ŷ − 1.`;return M=`${M} ${F} Beides ist derselbe Ausdruck (ŷ − y)·x.`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Schieben wir beta, bis der orange Fehlerbalken links am längsten wird, und lesen rechts ab, was das für die Steigung der Verlustkurve bedeutet."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"text-sm",children:"beobachtete Klasse:"}),e.jsx("button",{type:"button","aria-pressed":r===1,className:r===1?pe:ie,onClick:()=>i(1),children:"y = 1"}),e.jsx("button",{type:"button","aria-pressed":r===0,className:r===0?pe:ie,onClick:()=>i(0),children:"y = 0"})]}),e.jsx(I,{label:"beta",value:t,onChange:_=>l(Math.round(_*20)/20),min:-2.5,max:2.5,step:.05,fmt:_=>se(_,2)}),e.jsx(I,{label:"x (Merkmal)",value:s,onChange:_=>c(Math.round(_*10)/10),min:-2,max:2,step:.1,fmt:_=>se(_,1)}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx(ot,{titel:"σ(t)",xLabel:"t = beta·x",x0:fi,x1:Ci,y0:-.12,y1:1.15,clipId:"s112-log-sigma",ariaLabel:`Die Sigmoidkurve; der Punkt liegt bei t = ${se(x,2)} mit Vorhersage ${se(d,2)}, die gestrichelte Linie markiert die beobachtete Klasse y = ${r}.`,kinder:(_,y)=>e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:_(fi),x2:_(Ci),y1:y(r),y2:y(r),stroke:"var(--w-axis)",strokeWidth:1,strokeDasharray:"5 4"}),e.jsxs("text",{x:_(fi)+4,y:y(r)-4,fill:"var(--w-muted)",fontSize:10,children:["y = ",r]}),e.jsx("path",{d:ut(Oi,fi,Ci,_,y),fill:"none",stroke:An,strokeWidth:2.4}),e.jsx("line",{x1:_(x),y1:y(d),x2:_(x),y2:y(-.12),stroke:"var(--w-axis)",strokeWidth:.8,strokeDasharray:"2 3"}),e.jsx("line",{x1:_(x),y1:y(d),x2:_(x),y2:y(r),stroke:ni,strokeWidth:3}),e.jsx("circle",{cx:_(x),cy:y(d),r:4.5,fill:An}),e.jsxs("text",{x:_(x)+7,y:y(d)-5,fill:An,fontSize:11,children:["ŷ = ",se(d,2)]})]})}),e.jsx(ot,{titel:"ℓ(beta)",xLabel:"beta",x0:Hn,x1:ri,y0:p,y1:z,clipId:"s112-log-verlust",ariaLabel:`Der Verlust als Funktion von beta mit der Tangente der Steigung ${se(j,3)} im aktuellen Punkt.`,kinder:(_,y)=>e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:_(Hn),y1:y(f+j*(Hn-t)),x2:_(ri),y2:y(f+j*(ri-t)),stroke:$s,strokeWidth:2.2}),e.jsx("path",{d:ut(h,Hn,ri,_,y),fill:"none",stroke:An,strokeWidth:2.4}),Math.abs(j)>1e-9&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:_(t),y1:y(f),x2:_(a),y2:y(f),stroke:ni,strokeWidth:2.6}),e.jsx("polygon",{points:`${_(a)},${y(f)} ${_(a)+(a>t?-8:8)},${y(f)-4} ${_(a)+(a>t?-8:8)},${y(f)+4}`,fill:ni}),e.jsx("circle",{cx:_(a),cy:y(h(a)),r:4,fill:"none",stroke:ni,strokeWidth:2})]}),e.jsx("circle",{cx:_(t),cy:y(f),r:4.5,fill:An})]})})]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:An},children:["Score t = beta·x = ",se(x,3),", Vorhersage ŷ = σ(t) = ",se(d,4)]}),e.jsxs("div",{style:{color:An},children:["Verlust ℓ(beta) = ",se(f,4)]}),e.jsxs("div",{style:{color:ni},children:["Gradient ∇ℓ(beta) = (ŷ − y)·x = (",se(d,3)," − ",r,") · ",se(s,1)," = ",se(j,4)]}),e.jsxs("div",{children:["Gegenprobe (ℓ(beta+ε) − ℓ(beta−ε))/(2ε) = ",se(D,4)]})]}),e.jsx(ve,{kind:R,children:M})]})}function bt(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Warum zwei Regeln fehlen"}),`
`,e.jsxs(i.p,{children:["Die Linearität aus ",e.jsx(i.a,{href:"#sec-10.5",children:"Abschnitt 10.5"}),` erledigt Summen und Vielfache.
Damit allein kommen wir nicht weit. Die Zielfunktionen der Statistik sind selten
Summen fertiger Bausteine, sondern Produkte und Verkettungen: Eine Quadratsumme
`,e.jsx(n,{children:"\\left\\|\\by - \\bX\\bbeta\\right\\|_2^2"}),` ist ein Skalarprodukt einer Funktion mit sich
selbst, eine Log-Likelihood schiebt einen linearen Score durch eine nichtlineare
Antwortfunktion, und ein neuronales Netz stapelt Dutzende solcher Schichten
übereinander.`]}),`
`,e.jsx(i.p,{children:`Aus der Analysis kennen wir beide Regeln für Funktionen einer reellen Variablen.
Sie gelten wörtlich weiter, sobald wir Ableitung als lineare Approximation lesen.
Bei der Produktregel ist allerdings zuerst zu klären, was „Produkt" überhaupt
heißen soll: Zwei Vektoren lassen sich nicht ohne Weiteres miteinander
multiplizieren.`}),`
`,e.jsx(i.h3,{children:"Produkte sind bilineare Abbildungen"}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f, g\\colon \\D \\to \\R^m"})," gibt es kein kanonisches Produkt ",e.jsx(n,{children:"f(\\bx)g(\\bx)"}),`.
Was es gibt, sind mehrere nützliche Multiplikationen: das
`,e.jsx(v,{id:"dot-product",children:"Skalarprodukt"}),` zweier Vektoren, das
`,e.jsx(v,{id:"matrix-product",children:"Matrixprodukt"}),`, das Produkt aus Zahl und Vektor. Alle drei
teilen eine Eigenschaft. Halten wir ein Argument fest, so ist die Abbildung im
anderen linear. Diese Abbildungen sind uns in
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.1",children:"Abschnitt 9.1"}),` schon als multilineare Abbildungen
begegnet; hier brauchen wir den Fall zweier Argumente und zusätzlich eine
Größenschranke.`]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.6.1 (Beschränkte bilineare Abbildung)",id:"env-beschraenkte-bilineare-abbildung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\E_1"}),", ",e.jsx(n,{children:"\\E_2"})," und ",e.jsx(n,{children:"\\mathbb{B}"}),` normierte Vektorräume. Eine Abbildung
`,e.jsx(n,{children:"\\inner{\\cdot, \\cdot}\\colon \\E_1 \\times \\E_2 \\to \\mathbb{B}"})," heißt ",e.jsx(i.em,{children:"bilinear"}),`,
wenn sie in jedem Argument linear ist, wenn also für alle
`,e.jsx(n,{children:"u, u_1, u_2 \\in \\E_1"}),", ",e.jsx(n,{children:"v, v_1, v_2 \\in \\E_2"})," und ",e.jsx(n,{children:"c_1, c_2 \\in \\R"})]}),e.jsx(o,{children:`\\inner{c_1 u_1 + c_2 u_2,\\, v} = c_1 \\inner{u_1, v} + c_2 \\inner{u_2, v} ,
\\qquad
\\inner{u,\\, c_1 v_1 + c_2 v_2} = c_1 \\inner{u, v_1} + c_2 \\inner{u, v_2}`}),e.jsxs(i.p,{children:["gilt. Sie heißt ",e.jsx(i.em,{children:"beschränkt"}),", wenn es ein ",e.jsx(n,{children:"K < \\infty"})," gibt mit"]}),e.jsx(T,{tag:"10.6.1",id:"eq-beschraenkte-bilineare-abbildung",children:`\\left\\|\\inner{u, v}\\right\\| \\le K \\left\\|u\\right\\| \\left\\|v\\right\\|
\\qquad \\text{für alle } u \\in \\E_1,\\ v \\in \\E_2 .`})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.6.2 (Beispiele, und warum die Schranke selten etwas kostet)",id:"env-beispiele-und-warum-die-schranke-selten",children:[e.jsx(i.p,{children:`Vier Multiplikationen, die uns in diesem Abschnitt begegnen, samt ihrer
Schranke.`}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Das Skalarprodukt ",e.jsx(n,{children:"\\inner{\\bu, \\bv} = \\bu^\\top\\bv"}),` auf
`,e.jsx(n,{children:"\\R^m \\times \\R^m \\to \\R"}),`. Die
`,e.jsx(v,{id:"cauchy-schwarz-inequality",children:"Cauchy-Schwarz-Ungleichung"}),` liefert
`,e.jsx(n,{children:"K = 1"}),"."]}),`
`,e.jsxs(i.li,{children:["Zahl mal Vektor, ",e.jsx(n,{children:"\\R \\times \\R^m \\to \\R^m"}),`, mit
`,e.jsx(n,{children:"\\left\\|c\\,\\bv\\right\\| = \\left|c\\right|\\left\\|\\bv\\right\\|"}),`, also ebenfalls
`,e.jsx(n,{children:"K = 1"}),"."]}),`
`,e.jsxs(i.li,{children:["Das Matrixprodukt ",e.jsx(n,{children:"\\R^{m \\times n} \\times \\R^{n \\times p} \\to \\R^{m \\times p}"}),`.
Für eine submultiplikative `,e.jsx(v,{id:"matrix-norm",children:"Matrixnorm"})," ist ",e.jsx(n,{children:"K = 1"}),`, siehe
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),"."]}),`
`,e.jsxs(i.li,{children:["Die Spur eines Matrixprodukts, ",e.jsx(n,{children:"(\\bF, \\bG) \\mapsto \\tr(\\bF\\bG)"}),`, mit
`,e.jsx(n,{children:"\\bF \\in \\R^{m \\times n}"})," und ",e.jsx(n,{children:"\\bG \\in \\R^{n \\times m}"}),`. Bilinear ist sie,
weil Matrixprodukt und `,e.jsx(v,{id:"trace",children:"Spur"}),` es sind. Wegen
`,e.jsx(n,{children:"\\tr(\\bF\\bG) = \\sum_{i,j} f_{ij}g_{ji}"}),` ist sie das Frobenius-Skalarprodukt
von `,e.jsx(n,{children:"\\bF"})," und ",e.jsx(n,{children:"\\bG^\\top"}),", und Cauchy-Schwarz gibt wieder ",e.jsx(n,{children:"K = 1"}),`, diesmal in
der Frobenius-Norm aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),"."]}),`
`]}),e.jsxs(i.p,{children:[`In endlich-dimensionalen Räumen ist jede bilineare Abbildung automatisch
beschränkt: Wir entwickeln `,e.jsx(n,{children:"u"})," und ",e.jsx(n,{children:"v"}),` in Basen, ziehen die endlich vielen
Werte `,e.jsx(n,{children:"\\inner{e_i, e_j}"}),` heraus und erhalten eine Schranke aus deren Maximum.
Erst im Unendlichdimensionalen ist die Forderung eine echte Zusatzbedingung.
Der Beweis des folgenden Satzes braucht `,e.jsx(i.a,{href:"#eq-beschraenkte-bilineare-abbildung",children:"(10.6.1)"}),` ausdrücklich: Ohne diese
Schranke lässt sich der Kreuzterm nicht abschätzen.`]})]}),`
`,e.jsx(i.p,{children:`Damit ist der Rahmen gesteckt, und die Regel selbst sieht aus wie die aus der
Schule.`}),`
`,e.jsxs(q,{kind:"Satz",label:"10.6.3 (Produktregel)",id:"env-produktregel",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D"}),", ",e.jsx(n,{children:"\\E_1"}),", ",e.jsx(n,{children:"\\E_2"})," und ",e.jsx(n,{children:"\\mathbb{B}"}),` normierte Vektorräume,
`,e.jsx(n,{children:"\\inner{\\cdot,\\cdot}\\colon \\E_1 \\times \\E_2 \\to \\mathbb{B}"}),` beschränkt bilinear
und `,e.jsx(n,{children:"f\\colon \\D \\to \\E_1"}),", ",e.jsx(n,{children:"g\\colon \\D \\to \\E_2"})," in ",e.jsx(n,{children:"\\bx \\in \\D"}),`
differenzierbar. Dann ist auch
`,e.jsx(n,{children:"b(\\bx) = \\inner{\\cblue{f(\\bx)}, \\cblue{g(\\bx)}}"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar mit"]}),e.jsx(T,{tag:"10.6.2",id:"eq-produktregel",children:`\\cgreen{D_{\\bx} b(\\bh)}
= \\inner{\\cgreen{D_{\\bx} f(\\bh)},\\, \\cblue{g(\\bx)}}
+ \\inner{\\cblue{f(\\bx)},\\, \\cgreen{D_{\\bx} g(\\bh)}} .`})]}),`
`,e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," der Fréchet-Ableitung, ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),"; die Beschränktheit der linearen Abbildung gehört dort zur Definition"]}),children:[e.jsxs(i.p,{children:["Die Differenzierbarkeit von ",e.jsx(n,{children:"f"})," und ",e.jsx(n,{children:"g"})," an der Stelle ",e.jsx(n,{children:"\\bx"})," heißt"]}),e.jsx(o,{children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)} ,
\\qquad
\\cblue{g(\\bx + \\bh)} = \\cblue{g(\\bx)} + \\cgreen{D_{\\bx} g(\\bh)} + \\cred{r_g(\\bh)}`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\left\\|\\cred{r_f(\\bh)}\\right\\| / \\left\\|\\bh\\right\\| \\to 0"}),` und ebenso für
`,e.jsx(n,{children:"\\cred{r_g}"}),". Beide Ableitungen sind beschränkt, es gibt also ",e.jsx(n,{children:"M_f, M_g < \\infty"}),`
mit `,e.jsx(n,{children:"\\left\\|\\cgreen{D_{\\bx} f(\\bh)}\\right\\| \\le M_f \\left\\|\\bh\\right\\|"}),` und
`,e.jsx(n,{children:"\\left\\|\\cgreen{D_{\\bx} g(\\bh)}\\right\\| \\le M_g \\left\\|\\bh\\right\\|"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["neun Terme wie beim Ausmultiplizieren zweier Summen; sortiert nach dem Term ohne ",e.jsx(n,{children:"\\bh"}),", den beiden in ",e.jsx(n,{children:"\\bh"})," linearen Termen und dem Rest"]}),children:[e.jsx(i.p,{children:"Wir setzen beides ein und multiplizieren mit der Bilinearität gliedweise aus:"}),e.jsx(o,{children:`\\begin{aligned}
\\cblue{b(\\bx + \\bh)}
&= \\inner{\\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)},\\;
          \\cblue{g(\\bx)} + \\cgreen{D_{\\bx} g(\\bh)} + \\cred{r_g(\\bh)}} \\\\
&= \\cblue{b(\\bx)}
 + \\underbrace{\\inner{\\cgreen{D_{\\bx} f(\\bh)},\\, \\cblue{g(\\bx)}}
   + \\inner{\\cblue{f(\\bx)},\\, \\cgreen{D_{\\bx} g(\\bh)}}}_{=:\\ \\cgreen{L(\\bh)}}
 + \\cred{R(\\bh)}
\\end{aligned}`}),e.jsx(i.p,{children:"mit dem Sammelrest"}),e.jsx(o,{children:`\\cred{R(\\bh)} =
\\underbrace{\\inner{\\cgreen{D_{\\bx} f(\\bh)},\\, \\cgreen{D_{\\bx} g(\\bh)}}}_{\\text{Kreuzterm}}
+ \\inner{\\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)},\\; \\cred{r_g(\\bh)}}
+ \\inner{\\cred{r_f(\\bh)},\\; \\cblue{g(\\bx)} + \\cgreen{D_{\\bx} g(\\bh)}} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-beschraenkte-bilineare-abbildung",children:"(10.6.1)"})," mit ",e.jsx(n,{children:"u = \\cgreen{D_{\\bx} f(\\bh)}"})," und ",e.jsx(n,{children:"v = \\cgreen{D_{\\bx} g(\\bh)}"}),", danach die beiden Schranken aus Schritt 1"]}),children:[e.jsxs(i.p,{children:["Der Kreuzterm ist von der Ordnung ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"}),":"]}),e.jsx(o,{children:`\\left\\|\\inner{\\cgreen{D_{\\bx} f(\\bh)},\\, \\cgreen{D_{\\bx} g(\\bh)}}\\right\\|
\\le K \\left\\|\\cgreen{D_{\\bx} f(\\bh)}\\right\\| \\left\\|\\cgreen{D_{\\bx} g(\\bh)}\\right\\|
\\le K M_f M_g \\left\\|\\bh\\right\\|^2 .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["wieder ",e.jsx(i.a,{href:"#eq-beschraenkte-bilineare-abbildung",children:"(10.6.1)"}),"; der erste Faktor hängt nur beschränkt von ",e.jsx(n,{children:"\\bh"})," ab, der zweite ist nach Schritt 1 von kleinerer Ordnung als ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"})]}),children:[e.jsxs(i.p,{children:["Die beiden übrigen Summanden von ",e.jsx(n,{children:"\\cred{R(\\bh)}"}),` sind
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),". Für den mittleren etwa gilt"]}),e.jsx(o,{children:`\\left\\|\\inner{\\cblue{f(\\bx)} + \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)},\\; \\cred{r_g(\\bh)}}\\right\\|
\\le K \\bigl(\\left\\|\\cblue{f(\\bx)}\\right\\| + M_f\\left\\|\\bh\\right\\| + \\left\\|\\cred{r_f(\\bh)}\\right\\|\\bigr)
\\left\\|\\cred{r_g(\\bh)}\\right\\| ,`}),e.jsxs(i.p,{children:["und die Klammer bleibt für kleine ",e.jsx(n,{children:"\\bh"}),` unter einer festen Schranke, während
`,e.jsx(n,{children:"\\left\\|\\cred{r_g(\\bh)}\\right\\| / \\left\\|\\bh\\right\\|"}),` gegen null geht. Der
letzte Summand wird genauso behandelt.`]})]}),e.jsx(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"a(\\bh) = O(\\left\\|\\bh\\right\\|^2)"})," heißt ",e.jsx(n,{children:"\\left\\|a(\\bh)\\right\\| \\le C\\left\\|\\bh\\right\\|^2"})," nahe ",e.jsx(n,{children:"\\bnull"}),", also ",e.jsx(n,{children:"\\left\\|a(\\bh)\\right\\|/\\left\\|\\bh\\right\\| \\le C \\left\\|\\bh\\right\\| \\to 0"}),"; die Schreibweisen stehen in ",e.jsx(i.a,{href:"#env-gross-o-und-klein-o-fuer-kleine",children:"Bemerkung 10.5.1"}),", die Landau-Rechenregeln in ",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),", dort nur mit Argument gegen unendlich statt gegen null"]}),children:e.jsxs(i.p,{children:["Ordnung ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"})," ist kleiner als Ordnung ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`:
Teilen wir die Schranke aus Schritt 3 durch `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`, so bleibt
`,e.jsx(n,{children:"K M_f M_g \\left\\|\\bh\\right\\|"}),` stehen, und das geht gegen null. Der Kreuzterm ist
also ebenfalls `,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`, und eine Summe aus endlich vielen
solchen Termen ist wieder `,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`. Insgesamt ist
`,e.jsx(n,{children:"\\cred{R(\\bh)} = \\cred{o(\\left\\|\\bh\\right\\|)}"}),"."]})}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Bilinearität gibt die Additivität und Homogenität in jedem Argument einzeln; für die Schranke wieder ",e.jsx(i.a,{href:"#eq-beschraenkte-bilineare-abbildung",children:"(10.6.1)"}),", diesmal mit den festen Vektoren ",e.jsx(n,{children:"\\cblue{f(\\bx)}"})," und ",e.jsx(n,{children:"\\cblue{g(\\bx)}"})]}),children:[e.jsxs(i.p,{children:["Bleibt zu prüfen, dass ",e.jsx(n,{children:"\\cgreen{L}"}),` als Kandidat überhaupt zulässig ist. Linear
in `,e.jsx(n,{children:"\\bh"})," ist ",e.jsx(n,{children:"\\cgreen{L}"}),", weil ",e.jsx(n,{children:"\\cgreen{D_{\\bx} f}"})," und ",e.jsx(n,{children:"\\cgreen{D_{\\bx} g}"}),` es
sind und die Multiplikation im jeweils anderen, festgehaltenen Argument linear
ist. Beschränkt ist sie wegen`]}),e.jsx(o,{children:`\\left\\|\\cgreen{L(\\bh)}\\right\\|
\\le K \\bigl(M_f \\left\\|\\cblue{g(\\bx)}\\right\\| + M_g \\left\\|\\cblue{f(\\bx)}\\right\\|\\bigr)
\\left\\|\\bh\\right\\| .`}),e.jsxs(i.p,{children:["Damit hat ",e.jsx(n,{children:"b"}),` die Gestalt
`,e.jsx(n,{children:"\\cblue{b(\\bx+\\bh)} = \\cblue{b(\\bx)} + \\cgreen{L(\\bh)} + \\cred{o(\\left\\|\\bh\\right\\|)}"}),`
mit beschränktem, linearem `,e.jsx(n,{children:"\\cgreen{L}"}),", und das ist ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` mit
`,e.jsx(n,{children:"\\cgreen{D_{\\bx} b} = \\cgreen{L}"}),"."]})]})]}),`
`,e.jsxs(i.p,{children:["Die Reihenfolge in ",e.jsx(i.a,{href:"#eq-produktregel",children:"(10.6.2)"}),` ist kein Zierrat. Sobald das Produkt nicht
kommutativ ist, etwa beim Matrixprodukt, steht der abgeleitete Faktor genau
dort, wo vorher der ursprüngliche stand.`]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.6.4 (Die Produktregel in vier Bauformen)",id:"env-die-produktregel-in-vier-bauformen",children:[e.jsxs(i.p,{children:["Je nach Wahl der Räume und der Multiplikation liest sich ",e.jsx(i.a,{href:"#eq-produktregel",children:"(10.6.2)"})," anders."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Reelle Funktionen"}),", ",e.jsx(n,{children:"\\D = \\E_1 = \\E_2 = \\R"}),", gewöhnliche Multiplikation:"]}),e.jsx(o,{children:`b(x) = \\cblue{f(x)g(x)}
\\quad\\impl\\quad
\\cgreen{b'(x)} = \\cgreen{f'(x)}\\cblue{g(x)} + \\cblue{f(x)}\\cgreen{g'(x)} .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zwei skalare Felder"}),", ",e.jsx(n,{children:"\\D = \\R^n"}),", ",e.jsx(n,{children:"\\E_1 = \\E_2 = \\R"}),":"]}),e.jsx(o,{children:`b(\\bx) = \\cblue{f(\\bx)g(\\bx)}
\\quad\\impl\\quad
\\corange{\\nabla b(\\bx)} = \\cblue{g(\\bx)}\\corange{\\nabla f(\\bx)}
+ \\cblue{f(\\bx)}\\corange{\\nabla g(\\bx)} \\in \\R^{1 \\times n} .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Skalarprodukt zweier vektorwertiger Funktionen"}),", ",e.jsx(n,{children:"\\D = \\R^n"}),`,
`,e.jsx(n,{children:"\\E_1 = \\E_2 = \\R^m"}),":"]}),e.jsx(o,{children:`b(\\bx) = \\cblue{f(\\bx)^\\top g(\\bx)}
\\quad\\impl\\quad
\\corange{\\nabla b(\\bx)} = \\cblue{g(\\bx)^\\top}\\corange{\\bJ_f(\\bx)}
+ \\cblue{f(\\bx)^\\top}\\corange{\\bJ_g(\\bx)} .`}),e.jsxs(i.p,{children:["Die Formatprobe geht auf: ",e.jsx(n,{children:"1 \\times m"})," mal ",e.jsx(n,{children:"m \\times n"})," ergibt ",e.jsx(n,{children:"1 \\times n"}),`, wie
es sich für den Gradienten einer skalaren Funktion auf dem `,e.jsx(n,{children:"\\R^n"})," gehört."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Spur eines Matrixprodukts"}),", ",e.jsx(n,{children:"\\D = \\R"}),":"]}),e.jsx(o,{children:`b(x) = \\tr\\left[\\cblue{\\bF(x)\\bG(x)}\\right]
\\quad\\impl\\quad
\\cgreen{b'(x)} = \\tr\\left[\\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\cblue{\\bG(x)}\\right]
+ \\tr\\left[\\cblue{\\bF(x)}\\corange{\\frac{\\partial \\bG(x)}{\\partial x}}\\right] .`}),e.jsxs(i.p,{children:["Damit ",e.jsx(n,{children:"\\bF\\bG"}),` quadratisch ist und die Spur überhaupt existiert, muss
`,e.jsx(n,{children:"\\bF(x) \\in \\R^{m \\times n}"})," und ",e.jsx(n,{children:"\\bG(x) \\in \\R^{n \\times m}"}),` sein; für
quadratische Faktoren (`,e.jsx(n,{children:"m = n"}),`) ist das von selbst erfüllt. Zur
Kontrolle rechnen wir den Fall einmal mit Zahlen nach. Für`]}),e.jsx(o,{children:`\\bF(x) = \\begin{pmatrix} x^2 & 1 \\\\ 0 & e^x \\end{pmatrix} ,
\\qquad
\\bG(x) = \\begin{pmatrix} 1 & x \\\\ x & 2 \\end{pmatrix}`}),e.jsxs(i.p,{children:[`liefern die Produktregel und der zentrale Differenzenquotient an der Stelle
`,e.jsx(n,{children:"x = 0{,}3"})," beide den Wert ",e.jsx(n,{children:"4{,}2997"}),"."]})]}),`
`,e.jsx(i.p,{children:`Die dritte Bauform ist die nützlichste, weil sich damit quadratische Formen in
drei Zeilen ableiten lassen.`}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.6.5 (Gradient einer quadratischen Form)",id:"env-gradient-einer-quadratischen-form",children:[e.jsxs(i.p,{children:["Gesucht ist ",e.jsx(n,{children:"\\corange{\\nabla b(\\bx)}"}),` für
`,e.jsx(n,{children:"\\cblue{b(\\bx)} = \\bx^\\top\\bA\\bx"})," mit ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),`. Wir lesen die
`,e.jsx(v,{id:"quadratic-form",children:"quadratische Form"})," als Skalarprodukt,"]}),e.jsx(o,{children:`\\cblue{b(\\bx)} = \\inner{\\cblue{f(\\bx)}, \\cblue{g(\\bx)}}
\\qquad \\text{mit} \\qquad
\\cblue{f(\\bx)} = \\bx , \\quad \\cblue{g(\\bx)} = \\bA\\bx .`}),e.jsxs(i.p,{children:[`Die beiden Jacobimatrizen kennen wir aus
`,e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),": ",e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\bI_n"}),`
und `,e.jsx(n,{children:"\\corange{\\bJ_g(\\bx)} = \\bA"}),". Die Produktregel gibt"]}),e.jsx(o,{children:`\\begin{aligned}
\\corange{\\nabla b(\\bx)}
&= \\cblue{g(\\bx)^\\top}\\corange{\\bJ_f(\\bx)} + \\cblue{f(\\bx)^\\top}\\corange{\\bJ_g(\\bx)} \\\\
&= (\\bA\\bx)^\\top\\bI_n + \\bx^\\top\\bA
= \\bx^\\top\\bA^\\top + \\bx^\\top\\bA
= \\bx^\\top\\left(\\bA + \\bA^\\top\\right) ,
\\end{aligned}`}),e.jsxs(i.p,{children:["und für symmetrisches ",e.jsx(n,{children:"\\bA"}),` vereinfacht sich das zu
`,e.jsx(n,{children:"\\corange{\\nabla b(\\bx)} = 2\\bx^\\top\\bA"}),"."]}),e.jsxs(i.p,{children:[`Die Unterscheidung ist keine Förmelei. Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 3\\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"\\bx = (1, 2)^\\top"}),` ist
`,e.jsx(n,{children:"\\bA + \\bA^\\top = \\bigl(\\begin{smallmatrix} 4 & 1 \\\\ 1 & 6\\end{smallmatrix}\\bigr)"}),`
und damit `,e.jsx(n,{children:"\\corange{\\nabla b(\\bx)} = (6,\\ 13)"}),`, während die Symmetrieformel
`,e.jsx(n,{children:"2\\bx^\\top\\bA = (4,\\ 14)"}),` liefern würde. Bei der
`,e.jsx(v,{id:"symmetric-matrix",children:"symmetrischen Matrix"}),`
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 1 & 3\\end{smallmatrix}\\bigr)"}),` stimmen beide
Wege überein und geben `,e.jsx(n,{children:"(8,\\ 14)"}),"."]}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` haben wir denselben Gradienten
schon einmal bestimmt, dort durch Ausschreiben der Doppelsumme und Ableiten nach
jeder Komponente einzeln. Die Produktregel ersetzt diese Indexrechnung.`]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.6.6 (Ridge-Regression)",id:"env-ridge-regression",children:[e.jsxs(i.p,{children:[`Die Ridge-Regression ergänzt die
`,e.jsx(v,{id:"linear-regression",children:"lineare Regression"}),` um einen Strafterm. Mit Response
`,e.jsx(n,{children:"\\by \\in \\R^n"}),", Designmatrix ",e.jsx(n,{children:"\\bX \\in \\R^{n \\times p}"}),` und
Regularisierungsparameter `,e.jsx(n,{children:"\\lambda > 0"})," minimieren wir"]}),e.jsx(o,{children:"\\ell(\\bbeta) = \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2 + \\lambda\\left\\|\\bbeta\\right\\|_2^2 ."}),e.jsxs(i.p,{children:[`Beide Summanden sind Skalarprodukte einer Funktion mit sich selbst. Für den
ersten setzen wir `,e.jsx(n,{children:"\\cblue{f(\\bbeta)} = \\by - \\bX\\bbeta"}),` mit
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bbeta)} = -\\bX"})," und erhalten aus der Produktregel"]}),e.jsx(o,{children:`\\begin{aligned}
\\corange{\\nabla \\left\\|\\by - \\bX\\bbeta\\right\\|_2^2}
&= \\cblue{f(\\bbeta)^\\top}\\corange{\\bJ_f(\\bbeta)} + \\cblue{f(\\bbeta)^\\top}\\corange{\\bJ_f(\\bbeta)}
= -2(\\by - \\bX\\bbeta)^\\top\\bX \\\\
&= 2\\left(\\bX^\\top\\bX\\bbeta - \\bX^\\top\\by\\right)^\\top .
\\end{aligned}`}),e.jsxs(i.p,{children:["Der Strafterm ist derselbe Fall mit ",e.jsx(n,{children:"\\cblue{f(\\bbeta)} = \\bbeta"}),` und
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bbeta)} = \\bI_p"}),", sein Gradient also ",e.jsx(n,{children:"2\\lambda\\bbeta^\\top"}),`.
Zusammen ergibt die Linearität aus `,e.jsx(i.a,{href:"#sec-10.5",children:"Abschnitt 10.5"})]}),e.jsx(T,{tag:"10.6.3",id:"eq-ridge-regression",children:`\\corange{\\nabla \\ell(\\bbeta)}
= 2\\left(\\bX^\\top\\bX\\bbeta - \\bX^\\top\\by + \\lambda\\bbeta\\right)^\\top .`}),e.jsxs(i.p,{children:["Nullsetzen führt auf ",e.jsx(n,{children:"(\\bX^\\top\\bX + \\lambda\\bI_p)\\bbeta = \\bX^\\top\\by"}),`, also
auf die Normalengleichungen aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.3",children:"Abschnitt 7.3"}),` mit einem Zuschlag auf der Diagonalen. Der
Zuschlag ist der eigentliche Gewinn: Ohne vollen Spaltenrang von `,e.jsx(n,{children:"\\bX"}),` ist
`,e.jsx(n,{children:"\\bX^\\top\\bX"}),` nur positiv semidefinit und singulär,
`,e.jsx(n,{children:"\\bX^\\top\\bX + \\lambda\\bI_p"})," dagegen für ",e.jsx(n,{children:"\\lambda > 0"}),` stets
`,e.jsx(v,{id:"positive-definite",children:"positiv definit"}),` und invertierbar. Das gestrafte System
ist deshalb stets `,e.jsx(i.em,{children:"eindeutig"}),` lösbar. Die ungestraften Normalengleichungen sind
auch bei Rangdefizienz konsistent und besitzen Lösungen, diese sind dann aber
nicht eindeutig; vollen Spaltenrang brauchen wir nur für ihre Eindeutigkeit.`]}),e.jsx(i.p,{children:"Ein Zahlenbeispiel zur Kontrolle. Mit"}),e.jsx(o,{children:`\\bX = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3\\end{pmatrix} , \\qquad
\\by = (1, 2, 2)^\\top , \\qquad \\lambda = 1{,}5`}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\bX^\\top\\bX = \\bigl(\\begin{smallmatrix} 3 & 6 \\\\ 6 & 14\\end{smallmatrix}\\bigr)"}),`
und `,e.jsx(n,{children:"\\bX^\\top\\by = (5, 11)^\\top"}),". An der Stelle ",e.jsx(n,{children:"\\bbeta = (0{,}5,\\ 0{,}4)^\\top"}),`
liefert `,e.jsx(i.a,{href:"#eq-ridge-regression",children:"(10.6.3)"})," den Gradienten ",e.jsx(n,{children:"(-0{,}7,\\ -3{,}6)"}),`, was ein numerischer
Differenzenquotient bestätigt. Die Lösung des gestraften Systems ist
`,e.jsx(n,{children:"\\bbeta = (0{,}341,\\ 0{,}578)^\\top"})," gegenüber ",e.jsx(n,{children:"(0{,}667,\\ 0{,}500)^\\top"}),` ohne
Strafterm. Die Länge des Koeffizientenvektors sinkt dabei von `,e.jsx(n,{children:"0{,}833"}),` auf
`,e.jsx(n,{children:"0{,}671"}),`, die zweite Komponente wächst aber sogar leicht: Der Strafterm
verkürzt den Vektor, nicht jede einzelne Komponente.`]}),e.jsxs(i.p,{children:[`Eine Notationsfalle lauert beim Aufschreiben: Der Zeilenvektor
`,e.jsx(n,{children:"-2(\\by - \\bX\\bbeta)^\\top\\bX"}),` und der Spaltenvektor
`,e.jsx(n,{children:"-2\\bX^\\top(\\by - \\bX\\bbeta)"}),` tragen dieselbe Information, sind aber
verschiedene Objekte und dürfen nicht in derselben Zeile gleichgesetzt werden.
Wir bleiben bei der Zeilenkonvention aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"})," und transponieren sichtbar."]})]}),`
`,e.jsx(i.h3,{children:"Die Kettenregel"}),`
`,e.jsxs(i.p,{children:[`Verkettungen sind die zweite Art, aus einfachen Funktionen komplizierte zu
bauen. Für Jacobimatrizen haben wir die zugehörige
Regel in `,e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),` schon bewiesen. Ohne
Koordinaten wird sie noch einfacher, weil dann nicht einmal mehr ein
Matrixprodukt dasteht, sondern schlicht eine Hintereinanderausführung.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.6.7 (Kettenregel)",id:"env-kettenregel",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D_1"}),", ",e.jsx(n,{children:"\\D_2"}),", ",e.jsx(n,{children:"\\D_3"})," normierte Vektorräume, ",e.jsx(n,{children:"f\\colon \\D_1 \\to \\D_2"}),` in
`,e.jsx(n,{children:"\\bx \\in \\D_1"})," differenzierbar und ",e.jsx(n,{children:"g\\colon \\D_2 \\to \\D_3"}),` in
`,e.jsx(n,{children:"\\by = f(\\bx) \\in \\D_2"}),` differenzierbar. Dann ist die
`,e.jsx(v,{id:"function-composition",children:"Verkettung"})," ",e.jsx(n,{children:"g \\circ f"})," in ",e.jsx(n,{children:"\\bx"})," differenzierbar mit"]}),e.jsx(T,{tag:"10.6.4",id:"eq-kettenregel",children:"\\cgreen{D_{\\bx}(g \\circ f)} = \\cgreen{D_{\\by} g} \\circ \\cgreen{D_{\\bx} f} ."})]}),`
`,e.jsxs(i.p,{children:[`Rechts steht die Verkettung zweier linearer Abbildungen, und die ist wieder
linear und beschränkt. In Koordinaten wird daraus ein Matrixprodukt, dessen
Reihenfolge die Verkettung spiegelt: zuerst wirkt `,e.jsx(n,{children:"\\cgreen{D_{\\bx} f}"}),`, also
steht es rechts.`]}),`
`,e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Differenzierbarkeit von ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bx"}),"; ",e.jsx(n,{children:"\\left\\|\\cred{r_f(\\bh)}\\right\\|/\\left\\|\\bh\\right\\| \\to 0"})," heißt insbesondere, dass der Quotient irgendwann unter ",e.jsx(n,{children:"1"})," liegt"]}),children:[e.jsxs(i.p,{children:["Wir kürzen den Zuwachs ab, den ",e.jsx(n,{children:"f"})," weiterreicht:"]}),e.jsx(o,{children:`\\bk := \\cblue{f(\\bx + \\bh)} - \\cblue{f(\\bx)}
= \\cgreen{D_{\\bx} f(\\bh)} + \\cred{r_f(\\bh)} .`}),e.jsxs(i.p,{children:["Für hinreichend kleine ",e.jsx(n,{children:"\\bh"}),` ist
`,e.jsx(n,{children:"\\left\\|\\bk\\right\\| \\le (M_f + 1)\\left\\|\\bh\\right\\|"}),`: Der erste Summand ist
durch `,e.jsx(n,{children:"M_f\\left\\|\\bh\\right\\|"})," beschränkt, der zweite für kleine ",e.jsx(n,{children:"\\bh"}),` durch
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"f(\\bx+\\bh) = \\by + \\bk"})," nach Schritt 1, und für ",e.jsx(n,{children:"g"})," gilt ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," an der Stelle ",e.jsx(n,{children:"\\by"})]}),children:[e.jsxs(i.p,{children:["Die Differenzierbarkeit von ",e.jsx(n,{children:"g"})," an der Stelle ",e.jsx(n,{children:"\\by"})," liefert"]}),e.jsx(o,{children:`\\cblue{(g \\circ f)(\\bx + \\bh)} = \\cblue{g(\\by + \\bk)}
= \\cblue{g(\\by)} + \\cgreen{D_{\\by} g(\\bk)} + \\cred{r_g(\\bk)} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Linearität erlaubt ",e.jsx(n,{children:"D(u + v) = D(u) + D(v)"}),"; Beschränktheit heißt ",e.jsx(n,{children:"\\left\\|D_{\\by} g(u)\\right\\| \\le M_g\\left\\|u\\right\\|"}),", und ein festes Vielfaches eines ",e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"}),"-Terms bleibt ",e.jsx(n,{children:"o(\\left\\|\\bh\\right\\|)"})]}),children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\cgreen{D_{\\by} g}"})," linear ist, dürfen wir den Zuwachs aufspalten:"]}),e.jsx(o,{children:`\\cgreen{D_{\\by} g(\\bk)}
= \\cgreen{D_{\\by} g\\bigl(D_{\\bx} f(\\bh)\\bigr)} + \\cgreen{D_{\\by} g}\\bigl(\\cred{r_f(\\bh)}\\bigr) .`}),e.jsxs(i.p,{children:[`Weil sie zusätzlich beschränkt ist, ist der zweite Summand klein:
`,e.jsx(n,{children:`\\left\\|\\cgreen{D_{\\by} g}(\\cred{r_f(\\bh)})\\right\\| \\le M_g \\left\\|\\cred{r_f(\\bh)}\\right\\|
= \\cred{o(\\left\\|\\bh\\right\\|)}`}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["für ",e.jsx(n,{children:"\\bk = \\bnull"})," ist ",e.jsx(n,{children:"\\cred{r_g(\\bk)} = \\bnull"}),", der Quotient wird dann gar nicht gebildet; sonst gilt die Abschätzung aus Schritt 1"]}),children:[e.jsxs(i.p,{children:["Auch ",e.jsx(n,{children:"\\cred{r_g(\\bk)}"})," ist ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`. Nach Schritt 1 ist
nämlich`]}),e.jsx(o,{children:`\\frac{\\left\\|\\cred{r_g(\\bk)}\\right\\|}{\\left\\|\\bh\\right\\|}
\\le (M_f + 1)\\,\\frac{\\left\\|\\cred{r_g(\\bk)}\\right\\|}{\\left\\|\\bk\\right\\|} ,`}),e.jsxs(i.p,{children:["und mit ",e.jsx(n,{children:"\\bh \\to \\bnull"})," geht auch ",e.jsx(n,{children:"\\bk \\to \\bnull"}),`, der rechte Quotient also
gegen null. Dieser Schritt wird leicht übersprungen: Der Restterm von `,e.jsx(n,{children:"g"}),` ist
zunächst nur gemessen an `,e.jsx(n,{children:"\\bk"})," klein und nicht an ",e.jsx(n,{children:"\\bh"}),`. Erst die Schranke aus
Schritt 1 wechselt den Bezugspunkt.`]})]}),e.jsxs(G,{why:e.jsx(e.Fragment,{children:e.jsx(n,{children:"\\left\\|D_{\\by} g(D_{\\bx} f(\\bh))\\right\\| \\le M_g\\left\\|D_{\\bx} f(\\bh)\\right\\| \\le M_g M_f \\left\\|\\bh\\right\\|"})}),children:[e.jsx(i.p,{children:"Alles zusammengesetzt:"}),e.jsx(o,{children:`\\cblue{(g \\circ f)(\\bx + \\bh)}
= \\cblue{(g \\circ f)(\\bx)}
+ \\cgreen{\\left(D_{\\by} g \\circ D_{\\bx} f\\right)(\\bh)}
+ \\cred{o(\\left\\|\\bh\\right\\|)} .`}),e.jsxs(i.p,{children:[`Die Verkettung zweier beschränkter linearer Abbildungen ist beschränkt und
linear, mit Schranke `,e.jsx(n,{children:"M_g M_f"}),". Damit ist ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` erfüllt, und
`,e.jsx(i.a,{href:"#eq-kettenregel",children:"(10.6.4)"})," ist bewiesen."]})]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.6.8 (Die Kettenregel in fünf Bauformen)",id:"env-die-kettenregel-in-fuenf-bauformen",children:[e.jsx(i.p,{children:"Wie bei der Produktregel hängt das Aussehen an den beteiligten Räumen."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Reelle Funktionen"}),", ",e.jsx(n,{children:"f, g\\colon \\R \\to \\R"}),":"]}),e.jsx(o,{children:"\\cgreen{\\left[g\\bigl(f(x)\\bigr)\\right]'} = \\cgreen{g'\\bigl(f(x)\\bigr)}\\,\\cgreen{f'(x)} ."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Skalares Feld, dann reelle Funktion"}),", ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),", ",e.jsx(n,{children:"g\\colon \\R \\to \\R"}),":"]}),e.jsx(o,{children:`\\corange{\\nabla\\left[g\\bigl(f(\\bx)\\bigr)\\right]}
= \\cgreen{g'\\bigl(f(\\bx)\\bigr)}\\,\\corange{\\nabla f(\\bx)} \\in \\R^{1 \\times n} .`}),e.jsxs(i.p,{children:["Ein Skalar mal ein Zeilenvektor. Solange ",e.jsx(n,{children:"\\cgreen{g'(f(\\bx))} \\neq 0"}),` ist,
bleibt die Richtung des Gradienten bis auf das Vorzeichen erhalten und nur seine
Länge ändert sich; an einer Stelle mit `,e.jsx(n,{children:"\\cgreen{g'(f(\\bx))} = 0"}),` verschwindet
der Gradient dagegen ganz, gleichgültig wie steil `,e.jsx(n,{children:"f"})," dort ist."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zwei vektorwertige Abbildungen"}),", ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),`,
`,e.jsx(n,{children:"g\\colon \\R^m \\to \\R^p"}),":"]}),e.jsx(o,{children:`\\corange{\\bJ_{g \\circ f}(\\bx)} = \\corange{\\bJ_g\\bigl(f(\\bx)\\bigr)}\\,\\corange{\\bJ_f(\\bx)}
\\in \\R^{p \\times n} .`}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-kettenregel-fuer-jacobimatrizen",children:"Satz 10.3.9"}),", der Spezialfall, auf dem Backpropagation beruht."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Matrixargument, dann reelle Funktion"}),", ",e.jsx(n,{children:"f\\colon \\R^{m \\times n} \\to \\R"}),`,
`,e.jsx(n,{children:"g\\colon \\R \\to \\R"}),":"]}),e.jsx(o,{children:`\\corange{\\frac{\\partial (g \\circ f)(\\bX)}{\\partial \\bX}}
= \\cgreen{g'\\bigl(f(\\bX)\\bigr)}\\,\\corange{\\frac{\\partial f(\\bX)}{\\partial \\bX}}
\\in \\R^{m \\times n} .`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Matrixwertige Kurve, dann reelle Funktion"}),", ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{m \\times n}"}),`,
`,e.jsx(n,{children:"g\\colon \\R^{m \\times n} \\to \\R"}),", mit ",e.jsx(n,{children:"\\bY = \\bF(x)"}),":"]}),e.jsx(o,{children:`\\cgreen{\\frac{\\partial (g \\circ \\bF)}{\\partial x}}
= \\cgreen{D_{\\bY} g}\\left(\\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\right)
= \\tr\\left(\\corange{\\left(\\frac{\\partial g(\\bY)}{\\partial \\bY}\\right)^\\top}
\\corange{\\frac{\\partial \\bF(x)}{\\partial x}}\\right) \\in \\R .`}),e.jsxs(i.p,{children:[`Hier zahlt sich die Lesart aus
`,e.jsx(i.a,{href:"#sec-10.4",children:"Abschnitt 10.4"}),` aus: Die Fréchet-Ableitung einer
skalaren Funktion mit Matrixargument wirkt über das Frobenius-Skalarprodukt,
`,e.jsx(n,{children:"\\cgreen{D_{\\bY} g(\\bH)} = \\tr\\bigl((\\partial g/\\partial\\bY)^\\top\\bH\\bigr)"}),`.
Eingesetzt wird die Richtung `,e.jsx(n,{children:"\\bH = \\partial\\bF(x)/\\partial x"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Zwei der drei Voreinstellungen sind harmlos. Bei der dritten,
`,e.jsx(n,{children:"h(x) = \\sqrt{x^2}"}),`, laufen beide Faktoren aus dem Ruder: Die äußere Rate wächst
zum Nullpunkt hin über jede Grenze, die innere geht dorthin gegen null. Was
kommt dann heraus, und was passiert bei `,e.jsx(n,{children:"x = 0"})," selbst?"]}),`
`,e.jsxs(me,{title:"Warum im Eindimensionalen ein Produkt herauskommt",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-kettenregel",children:"Satz 10.6.7"})," verkettet zwei lineare Abbildungen. Ist ",e.jsx(n,{children:"\\D_1 = \\D_2 = \\D_3 = \\R"}),`,
so ist jede lineare Abbildung eine Multiplikation mit einer Zahl, und das
Hintereinanderausführen zweier Multiplikationen ist die Multiplikation der
beiden Zahlen. Deshalb steht in `,e.jsx(i.a,{href:"#eq-kettenregel",children:"(10.6.4)"}),` dort, wo sonst eine Verkettung oder
ein Matrixprodukt stünde, schlicht ein Produkt zweier Steigungen. Die Tafel
führt beide Zahlen einzeln vor und rechnet die Ableitung zur Kontrolle noch
einmal ohne die Kettenregel nach, über einen zentralen Differenzenquotienten
mit Schrittweite `,e.jsx(n,{children:"10^{-6}"}),"."]}),e.jsx(Gs,{}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"h(x) = \\sqrt{x^2}"}),` bleibt das Produkt zahm, obwohl beide Faktoren es nicht sind: Für
jedes `,e.jsx(n,{children:"x \\neq 0"})," ist ",e.jsx(n,{children:"\\cgreen{g'(f(x))}\\cgreen{f'(x)} = \\frac{1}{2\\left|x\\right|}\\cdot 2x"}),`
exakt das Vorzeichen von `,e.jsx(n,{children:"x"}),", wie es sich für die Ableitung von ",e.jsx(n,{children:"\\left|x\\right|"}),` gehört. Bei
`,e.jsx(n,{children:"x = 0"}),` dagegen ist die Voraussetzung des Satzes verletzt, weil die Wurzel an der Stelle
`,e.jsx(n,{children:"u = f(0) = 0"})," nicht differenzierbar ist; übrig bleibt der Knick aus ",e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),`,
und das Produkt aus `,e.jsx(n,{children:"\\infty"})," und ",e.jsx(n,{children:"0"}),` ist keine Zahl. Bemerkenswert ist, dass die numerische
Gegenprobe davon nichts merkt und brav `,e.jsx(n,{children:"0"}),` meldet: Der zentrale Differenzenquotient mittelt
über beide Seiten des Knicks. `,e.jsx(i.a,{href:"#env-gradient-der-euklidischen-norm",children:"Beispiel 10.6.11"}),` wird genau diesen
Vorbehalt für die euklidische Norm brauchen.`]})]}),`
`,e.jsxs(xe,{title:"Alternatives Beispiel zur Kettenregel: logistische Regression",children:[e.jsxs(i.p,{children:[`Kaum ein Modell zeigt die Kettenregel so sauber wie die logistische Regression.
Wir wollen eine binäre Zielgröße `,e.jsx(n,{children:"Y \\in \\{0, 1\\}"}),` aus Merkmalen
`,e.jsx(n,{children:"\\bx \\in \\R^p"})," vorhersagen und modellieren dafür"]}),e.jsx(o,{children:`P(Y = 1 \\mid \\bx) = \\sigma(\\bbeta^\\top\\bx) ,
\\qquad
\\sigma(t) = \\frac{1}{1 + e^{-t}} .`}),e.jsxs(i.p,{children:["Die Sigmoidfunktion ",e.jsx(n,{children:"\\sigma"})," presst den linearen Score ",e.jsx(n,{children:"\\bbeta^\\top\\bx"}),` in das
Intervall `,e.jsx(n,{children:"(0, 1)"}),`, sodass die Vorhersage als Wahrscheinlichkeit lesbar ist. Der
Verlust einer einzelnen Beobachtung `,e.jsx(n,{children:"(\\bx, y)"}),` ist die negative
`,e.jsx(v,{id:"likelihood",children:"Log-Likelihood"})]}),e.jsx(o,{children:`\\ell(\\bbeta) = -\\left[y \\log\\bigl(\\sigma(\\bbeta^\\top\\bx)\\bigr)
+ (1 - y)\\log\\bigl(1 - \\sigma(\\bbeta^\\top\\bx)\\bigr)\\right]
= \\begin{cases}
-\\log P(Y = 1 \\mid \\bx) & \\text{für } y = 1 , \\\\
-\\log P(Y = 0 \\mid \\bx) & \\text{für } y = 0 .
\\end{cases}`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"y = 1"})," bleibt vom Verlust also der erste Summand, für ",e.jsx(n,{children:"y = 0"})," der zweite."]}),e.jsxs(q,{kind:"Beispiel",label:"10.6.9 (Gradient des logistischen Verlusts)",id:"env-gradient-des-logistischen-verlusts",children:[e.jsxs(i.p,{children:["Zuerst brauchen wir die Ableitung von ",e.jsx(n,{children:"\\sigma"}),`, und schon dafür arbeitet die
Kettenregel. Mit `,e.jsx(n,{children:"u(t) = 1 + e^{-t}"}),` und der äußeren Funktion
`,e.jsx(n,{children:"w \\mapsto w^{-1}"})," ist"]}),e.jsx(T,{tag:"10.6.5",id:"eq-gradient-des-logistischen-verlusts",children:`\\cgreen{\\sigma'(t)} = -\\frac{1}{(1 + e^{-t})^2}\\cdot\\left(-e^{-t}\\right)
= \\frac{e^{-t}}{(1 + e^{-t})^2}
= \\cblue{\\sigma(t)}\\bigl(1 - \\cblue{\\sigma(t)}\\bigr) ,`}),e.jsxs(i.p,{children:["wobei wir im letzten Schritt ",e.jsx(n,{children:"1 - \\sigma(t) = e^{-t}/(1 + e^{-t})"}),` benutzt
haben. Die Ableitung der Sigmoidfunktion lässt sich also aus ihrem eigenen
Funktionswert ablesen, was jede Implementierung dankbar ausnutzt.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Fall ",e.jsx(n,{children:"y = 1"}),"."]})," Hier ist ",e.jsx(n,{children:"\\ell = g \\circ f"})," mit"]}),e.jsx(o,{children:`\\cblue{f(\\bbeta)} = \\bbeta^\\top\\bx , \\quad \\corange{\\nabla f(\\bbeta)} = \\bx^\\top ,
\\qquad
\\cblue{g(t)} = -\\log\\sigma(t) .`}),e.jsxs(i.p,{children:["Für die äußere Funktion liefert ",e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts",children:"(10.6.5)"})]}),e.jsx(o,{children:`\\cgreen{g'(t)} = -\\frac{\\cgreen{\\sigma'(t)}}{\\cblue{\\sigma(t)}}
= -\\bigl(1 - \\cblue{\\sigma(t)}\\bigr) = \\cblue{\\sigma(t)} - 1 ,`}),e.jsxs(i.p,{children:["und die zweite Bauform aus ",e.jsx(i.a,{href:"#env-die-kettenregel-in-fuenf-bauformen",children:"Beispiel 10.6.8"}),` setzt beides zusammen. Mit der
Abkürzung `,e.jsx(n,{children:"\\wh{y} = \\sigma(\\bbeta^\\top\\bx)"})," ist"]}),e.jsx(o,{children:`\\corange{\\nabla \\ell(\\bbeta)} = \\cgreen{g'\\bigl(f(\\bbeta)\\bigr)}\\corange{\\nabla f(\\bbeta)}
= \\bigl(\\wh{y} - 1\\bigr)\\bx^\\top .`}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Fall ",e.jsx(n,{children:"y = 0"}),"."]})," Jetzt ist ",e.jsx(n,{children:"\\cblue{g(t)} = -\\log(1 - \\sigma(t))"}),", also"]}),e.jsx(o,{children:"\\cgreen{g'(t)} = \\frac{\\cgreen{\\sigma'(t)}}{1 - \\cblue{\\sigma(t)}} = \\cblue{\\sigma(t)} ,"}),e.jsxs(i.p,{children:["und damit ",e.jsx(n,{children:"\\corange{\\nabla\\ell(\\bbeta)} = \\wh{y}\\,\\bx^\\top"}),`. Das Vorzeichen ist
hier positiv, und erst so fügen sich beide Fälle zusammen zu`]}),e.jsx(T,{tag:"10.6.6",id:"eq-gradient-des-logistischen-verlusts-2",children:"\\corange{\\nabla \\ell(\\bbeta)} = \\bigl(\\wh{y} - y\\bigr)\\bx^\\top ."}),e.jsxs(i.p,{children:[`Ein Zahlenbeispiel, beide Fälle numerisch geprüft: Für
`,e.jsx(n,{children:"\\bx = (1,\\ -2,\\ 0{,}5)^\\top"})," und ",e.jsx(n,{children:"\\bbeta = (0{,}3,\\ -0{,}7,\\ 1{,}1)^\\top"}),` ist
`,e.jsx(n,{children:"\\bbeta^\\top\\bx = 2{,}25"})," und ",e.jsx(n,{children:"\\wh{y} = 0{,}9047"}),". Bei ",e.jsx(n,{children:"y = 1"})," ergibt ",e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts-2",children:"(10.6.6)"}),`
den Gradienten `,e.jsx(n,{children:"(-0{,}0953,\\ 0{,}1907,\\ -0{,}0477)"}),", bei ",e.jsx(n,{children:"y = 0"}),` dagegen
`,e.jsx(n,{children:"(0{,}9047,\\ -1{,}8093,\\ 0{,}4523)"}),"."]})]}),e.jsxs(q,{kind:"Bemerkung",label:"10.6.10 (Fehler mal Merkmal)",id:"env-fehler-mal-merkmal",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts-2",children:"(10.6.6)"}),` ist eine der meistbenutzten Formeln des maschinellen
Lernens, und sie liest sich wie ein Satz: `,e.jsx(i.em,{children:`Der Gradient ist der Vorhersagefehler,
gewichtet mit dem Merkmalsvektor.`})," Zwei Konsequenzen."]}),e.jsxs(i.p,{children:["Erstens die Richtung. Ist ",e.jsx(n,{children:"\\wh{y} > y"}),`, sagt das Modell also zu viel voraus, so
zeigt der Gradient in Richtung `,e.jsx(n,{children:"\\bx^\\top"}),`. Der Gradientenabstieg aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"})," verschiebt ",e.jsx(n,{children:"\\bbeta"}),` entgegen
dieser Richtung, senkt damit den Score `,e.jsx(n,{children:"\\bbeta^\\top\\bx"}),` und mit ihm die
Vorhersage.`]}),e.jsxs(i.p,{children:["Zweitens die Länge. Es gilt stets ",e.jsx(n,{children:"\\left|\\wh{y} - y\\right| < 1"}),`, weil
`,e.jsx(n,{children:"\\sigma"})," die Werte ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"1"}),` nie annimmt, also ist
`,e.jsx(n,{children:`\\left\\|\\corange{\\nabla\\ell(\\bbeta)}\\right\\| = \\left|\\wh y - y\\right|\\left\\|\\bx\\right\\|
< \\left\\|\\bx\\right\\|`})," für jedes ",e.jsx(n,{children:"\\bx \\neq \\bnull"}),`. Eine einzelne Beobachtung
kann das Modell nie beliebig weit reißen, egal wie falsch die Vorhersage liegt.`]})]}),e.jsx(i.p,{children:`Wie weit kann eine einzelne Beobachtung den Parameter reißen, wenn das Modell
maximal danebenliegt? Und was bleibt vom Gradienten übrig, wenn das Merkmal
selbst null ist?`}),e.jsxs(me,{title:"Der Gradient am Regler: eine Beobachtung, ein Merkmal",children:[e.jsxs(i.p,{children:[`Die Tafel zeigt den einfachsten denkbaren Fall, ein Merkmal und einen Parameter.
Links wandert der Punkt auf der Sigmoidkurve, wenn wir `,e.jsx(n,{children:"\\beta"}),` verschieben; der
orange Balken ist der Fehler `,e.jsx(n,{children:"\\wh{y} - y"}),`. Rechts steht der Verlust als Funktion
von `,e.jsx(n,{children:"\\beta"}),", die grüne Tangente hat die Steigung aus ",e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts-2",children:"(10.6.6)"}),`, und der orange
Pfeil zeigt, wohin ein Abstiegsschritt mit Schrittweite `,e.jsx(n,{children:"0{,}5"})," führt."]}),e.jsx(Ps,{}),e.jsxs(i.p,{children:["In beiden Klassen steht derselbe Ausdruck. Schalten wir auf ",e.jsx(n,{children:"y = 0"})," und schieben ",e.jsx(n,{children:"\\beta"}),`
nach oben, so wird das Modell selbstbewusst falsch, der Gradient nähert sich seiner
Obergrenze `,e.jsx(n,{children:"\\left|x\\right|"}),`, erreicht sie aber nie – das ist die zweite Konsequenz aus
`,e.jsx(i.a,{href:"#env-fehler-mal-merkmal",children:"Bemerkung 10.6.10"}),", ablesbar am Fehlerbalken, der nie über die Höhe ",e.jsx(n,{children:"1"}),`
hinauskommt. Stellen wir umgekehrt `,e.jsx(n,{children:"x = 0"}),` ein, so ist die Verlustkurve eine waagerechte
Gerade auf der Höhe `,e.jsx(n,{children:"\\log 2 = 0{,}693147"}),", und der Gradient verschwindet für jedes ",e.jsx(n,{children:"\\beta"}),`.
Vor allem aber bestätigt die numerische Gegenprobe in beiden Klassen die Formel
`,e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts-2",children:"(10.6.6)"}),", Vorzeichen eingeschlossen."]})]}),e.jsx(Me,{children:e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:[`Für den logistischen Verlust einer Beobachtung gilt
`,e.jsx(n,{children:"\\nabla\\ell(\\bbeta) = (\\wh{y} - y)\\bx^\\top"})," für ",e.jsx(n,{children:"y = 0"})," und für ",e.jsx(n,{children:"y = 1"}),"."]}),e.jsxs(i.p,{children:[`Beide Fälle führen über die Kettenregel auf dieselbe Form, siehe
`,e.jsx(i.a,{href:"#eq-gradient-des-logistischen-verlusts-2",children:"(10.6.6)"}),". Für ",e.jsx(n,{children:"y = 1"}),` ist die äußere Ableitung
`,e.jsx(n,{children:"\\sigma(t) - 1"}),", für ",e.jsx(n,{children:"y = 0"})," ist sie ",e.jsx(n,{children:"\\sigma(t)"}),`, und beides ist
`,e.jsx(n,{children:"\\wh{y} - y"}),"."]})]})})]}),`
`,e.jsx(i.h3,{children:"Übung: Gradient der euklidischen Norm"}),`
`,e.jsxs(i.p,{children:[`Zum Schluss eine Rechnung, die beide Regeln dieses Abschnitts in Anspruch nimmt.
Gesucht ist `,e.jsx(n,{children:"\\corange{\\nabla h(\\bx)}"})," für"]}),`
`,e.jsx(o,{children:"\\cblue{h(\\bx)} = \\left\\|\\bx\\right\\|_2 = \\sqrt{\\bx^\\top\\bx} ."}),`
`,e.jsx(i.p,{children:`Bevor wir weiterlesen, lohnt der eigene Versuch: Welche innere und welche äußere
Funktion bieten sich an?`}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.6.11 (Gradient der euklidischen Norm)",id:"env-gradient-der-euklidischen-norm",children:[e.jsxs(i.p,{children:["Wir zerlegen ",e.jsx(n,{children:"\\cblue{h} = \\cblue{g} \\circ \\cblue{f}"})," mit"]}),e.jsx(o,{children:"\\cblue{f(\\bx)} = \\bx^\\top\\bx , \\qquad \\cblue{g(u)} = \\sqrt{u} = u^{1/2} ."}),e.jsxs(i.p,{children:["Die innere Ableitung kennen wir aus ",e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"})," mit ",e.jsx(n,{children:"\\bA = \\bI_n"}),`, denn
`,e.jsx(n,{children:"\\bx^\\top\\bx"}),` ist die quadratische Form zur Einheitsmatrix:
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = 2\\bx^\\top"}),`. Die äußere ist
`,e.jsx(n,{children:"\\cgreen{g'(u)} = \\tfrac{1}{2}u^{-1/2} = 1/(2\\sqrt{u})"}),". Die Kettenregel gibt"]}),e.jsx(o,{children:`\\corange{\\nabla h(\\bx)} = \\cgreen{g'\\bigl(f(\\bx)\\bigr)}\\corange{\\nabla f(\\bx)}
= \\frac{2\\bx^\\top}{2\\sqrt{\\bx^\\top\\bx}}
= \\frac{\\bx^\\top}{\\left\\|\\bx\\right\\|_2} .`}),e.jsxs(i.p,{children:["Der Gradient der Norm ist also der auf Länge ",e.jsx(n,{children:"1"}),` normierte Vektor selbst, als
Zeile geschrieben. Er zeigt radial vom Ursprung weg, was zur Anschauung passt:
Am schnellsten wächst der Abstand zum Ursprung, wenn wir uns direkt von ihm
entfernen. Für `,e.jsx(n,{children:"\\bx = (3, 4)^\\top"}),` etwa ist
`,e.jsx(n,{children:"\\corange{\\nabla h(\\bx)} = (0{,}6,\\ 0{,}8)"}),", für ",e.jsx(n,{children:"\\bx = (1, -2, 2)^\\top"}),`
entsprechend `,e.jsx(n,{children:"(1/3,\\ -2/3,\\ 2/3)"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Vorbehalt."})," Die Rechnung gilt nur für ",e.jsx(n,{children:"\\bx \\neq \\bnull"}),`. Die Kettenregel
verlangt Differenzierbarkeit von `,e.jsx(n,{children:"\\cblue{g}"}),` an
der Stelle `,e.jsx(n,{children:"u = \\cblue{f(\\bx)} = \\left\\|\\bx\\right\\|_2^2"}),", und für ",e.jsx(n,{children:"\\bx = \\bnull"}),`
ist das gerade die Stelle `,e.jsx(n,{children:"u = 0"}),", an der ",e.jsx(n,{children:"\\cgreen{g'}"}),` über jede Grenze wächst.
Der Nullpunkt ist dabei nicht bloß eine Lücke unserer Herleitung, dort gibt es
überhaupt keine Fréchet-Ableitung. Gäbe es nämlich eine lineare Abbildung
`,e.jsx(n,{children:"L"})," mit ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|_2 = L(\\bh) + \\cred{o(\\left\\|\\bh\\right\\|)}"}),`, so
setzten wir `,e.jsx(n,{children:"\\bh = t\\bd"})," ein und teilten durch ",e.jsx(n,{children:"t"}),": Für ",e.jsx(n,{children:"t > 0"}),` folgte
`,e.jsx(n,{children:"L(\\bd) = \\left\\|\\bd\\right\\|_2"}),", für ",e.jsx(n,{children:"t < 0"}),` dagegen
`,e.jsx(n,{children:"L(\\bd) = -\\left\\|\\bd\\right\\|_2"}),". Für ",e.jsx(n,{children:"\\bd \\neq \\bnull"}),` widerspricht sich das.
Im Fall `,e.jsx(n,{children:"n = 1"}),` ist es genau der Knick der Betragsfunktion aus
`,e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für zwei differenzierbare Abbildungen ",e.jsx(n,{children:"f, g\\colon \\R^n \\to \\R^m"})," mit ",e.jsx(n,{children:"m > 1"}),`
liefert die Produktregel den Gradienten von `,e.jsx(n,{children:"f(\\bx)g(\\bx)"}),"."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m > 1"})," ist ",e.jsx(n,{children:"f(\\bx)g(\\bx)"}),` gar nicht erklärt: Zwei Vektoren lassen sich
nicht ohne Weiteres multiplizieren. `,e.jsx(i.a,{href:"#env-produktregel",children:"Satz 10.6.3"}),` braucht eine bilineare Abbildung,
die aus den beiden Werten ein neues Objekt macht, etwa das Skalarprodukt
`,e.jsx(n,{children:"f(\\bx)^\\top g(\\bx)"}),". Erst dann steht die Regel bereit."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für jede Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` gilt
`,e.jsx(n,{children:"\\nabla(\\bx^\\top\\bA\\bx) = 2\\bx^\\top\\bA"}),"."]}),e.jsxs(i.p,{children:["Allgemein gilt ",e.jsx(n,{children:"\\bx^\\top(\\bA + \\bA^\\top)"}),"; die Kurzform mit dem Faktor ",e.jsx(n,{children:"2"}),` setzt
`,e.jsx(n,{children:"\\bA = \\bA^\\top"})," voraus (",e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"}),`). Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 3\\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"\\bx = (1, 2)^\\top"})," ist der Gradient ",e.jsx(n,{children:"(6,\\ 13)"}),`, die Symmetrieformel gäbe
`,e.jsx(n,{children:"(4,\\ 14)"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Kreuzterm ",e.jsx(n,{children:"\\inner{D_{\\bx} f(\\bh), D_{\\bx} g(\\bh)}"}),` im Beweis der
Produktregel verschwindet für kleine `,e.jsx(n,{children:"\\bh"}),`, deshalb taucht er in der Formel
nicht auf.`]}),e.jsxs(i.p,{children:[`Er verschwindet nicht, er ist nur von zu kleiner Ordnung. Nach Schritt 3 des
Beweises ist er `,e.jsx(n,{children:"O(\\left\\|\\bh\\right\\|^2)"}),`, und ein solcher Term geht nach Teilen
durch `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|"})," gegen null. Für ",e.jsx(n,{children:"b(\\bx) = \\bx^\\top\\bA\\bx"}),` mit
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 3\\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"\\bh = (0{,}1,\\ -0{,}05)^\\top"})," etwa hat er den Wert ",e.jsx(n,{children:"0{,}0225"}),`, also durchaus
nicht null.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Im Unendlichdimensionalen genügt Bilinearität für ",e.jsx(i.a,{href:"#env-produktregel",children:"Satz 10.6.3"}),` nicht, dort
brauchen wir zusätzlich die Schranke `,e.jsx(i.a,{href:"#eq-beschraenkte-bilineare-abbildung",children:"(10.6.1)"}),"."]}),e.jsxs(i.p,{children:[`Ohne die Schranke lässt sich der Kreuzterm nicht kontrollieren, und der ganze
Beweis bricht an Schritt 3. In endlicher Dimension ist jede bilineare Abbildung
automatisch beschränkt (`,e.jsx(i.a,{href:"#env-beispiele-und-warum-die-schranke-selten",children:"Bemerkung 10.6.2"}),`), weshalb die Voraussetzung dort nichts
kostet.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," und ",e.jsx(n,{children:"g\\colon \\R^m \\to \\R^p"}),` gilt
`,e.jsx(n,{children:"\\bJ_{g \\circ f}(\\bx) = \\bJ_f(\\bx)\\,\\bJ_g(f(\\bx))"}),"."]}),e.jsxs(i.p,{children:[`Die Reihenfolge ist vertauscht. Richtig ist
`,e.jsx(n,{children:"\\bJ_{g \\circ f}(\\bx) = \\bJ_g(f(\\bx))\\,\\bJ_f(\\bx)"}),`, also die äußere Ableitung
links. Schon die Formate zeigen es: `,e.jsx(n,{children:"\\bJ_g"})," ist ",e.jsx(n,{children:"p \\times m"}),", ",e.jsx(n,{children:"\\bJ_f"}),` ist
`,e.jsx(n,{children:"m \\times n"}),", und ",e.jsx(n,{children:"p \\times m"})," mal ",e.jsx(n,{children:"m \\times n"})," ergibt ",e.jsx(n,{children:"p \\times n"}),`. Die falsche
Reihenfolge stellt dagegen `,e.jsx(n,{children:"m \\times n"})," neben ",e.jsx(n,{children:"p \\times m"}),` und ist für
`,e.jsx(n,{children:"n \\neq p"})," nicht einmal definiert."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Gradient ",e.jsx(n,{children:"\\nabla\\left\\|\\bx\\right\\|_2 = \\bx^\\top/\\left\\|\\bx\\right\\|_2"}),` hat
für jedes `,e.jsx(n,{children:"\\bx \\neq \\bnull"})," die Länge ",e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:["Wir teilen einen Vektor durch seine eigene Länge, das Ergebnis hat Länge ",e.jsx(n,{children:"1"}),`.
Anschaulich heißt das: Der Abstand zum Ursprung wächst in radialer Richtung mit
Rate `,e.jsx(n,{children:"1"}),", und keine Richtung ist besser. In ",e.jsx(n,{children:"\\bx = \\bnull"}),` existiert der Gradient
nicht (`,e.jsx(i.a,{href:"#env-gradient-der-euklidischen-norm",children:"Beispiel 10.6.11"}),")."]})]}),e.jsxs(We,{loesung:32.768,toleranz:.01,children:[e.jsxs(i.p,{children:["Im Kettenregel-Widget steht die erste Voreinstellung ",e.jsx(n,{children:"h(x) = (2x+1)^4"}),` mit
`,e.jsx(n,{children:"x = 0{,}3"}),". Welchen Wert hat dort ",e.jsx(n,{children:"h'(x)"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"32{,}768"}),". Die innere Rate ist ",e.jsx(n,{children:"\\cgreen{f'(x)} = 2"}),`, die äußere
`,e.jsx(n,{children:"\\cgreen{g'(f(x))} = 4\\cdot 1{,}6^3 = 16{,}384"}),", und ",e.jsx(i.a,{href:"#env-kettenregel",children:"Satz 10.6.7"}),` multipliziert
beide. Die numerische Gegenprobe im Widget landet auf demselben Wert; sie weicht
erst in der zehnten Stelle ab.`]})]}),e.jsxs(We,{loesung:.693147,toleranz:.002,children:[e.jsxs(i.p,{children:["Stellen wir im Logistik-Widget das Merkmal auf ",e.jsx(n,{children:"x = 0"}),`. Auf welcher Höhe liegt
die Verlustkurve dann?`]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"\\log 2 = 0{,}693147"}),", und zwar für jedes ",e.jsx(n,{children:"\\beta"}),". Mit ",e.jsx(n,{children:"x = 0"}),` ist der Score
`,e.jsx(n,{children:"t = \\beta x"})," konstant null, also ",e.jsx(n,{children:"\\wh{y} = \\sigma(0) = 0{,}5"}),` und
`,e.jsx(n,{children:"\\ell = -\\log 0{,}5 = \\log 2"}),". Der Gradient ",e.jsx(n,{children:"(\\wh y - y)x"}),` verschwindet
entsprechend, unabhängig von der Klasse: Ein Merkmal ohne Variation trägt keine
Information über `,e.jsx(n,{children:"\\beta"}),"."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.1.2 stellt die Differentiationsregeln im eindimensionalen
Fall zusammen, §5.2.1 die Produkt- und Summenregel für partielle Ableitungen und
§5.2.2 die Kettenregel für verkettete Abbildungen.`})})]})}function Hs(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(bt,{...r})}):bt(r)}const yn=P.blau,Qi=P.violett,mn=P.orange;function Yi(r,i,t,l,s,c,h,x,d=80){const f=[];for(let a=0;a<=d;a++){const A=[];for(let z=0;z<=d;z++)A.push(r(t+(l-t)*a/d,s+(c-s)*z/d));f.push(A)}const j=a=>t+(l-t)*a/d,D=a=>s+(c-s)*a/d;return i.map(a=>{let A="";for(let z=0;z<d;z++)for(let p=0;p<d;p++){const R=[f[z][p],f[z+1][p],f[z+1][p+1],f[z][p+1]],M=[j(z),j(z+1),j(z+1),j(z)],F=[D(p),D(p),D(p+1),D(p+1)],_=[];for(let g=0;g<4;g++){const m=(g+1)%4,b=R[g]-a,N=R[m]-a;if(b<0&&N>=0||b>=0&&N<0){const S=b/(b-N);_.push([M[g]+S*(M[m]-M[g]),F[g]+S*(F[m]-F[g])])}}const y=(g,m)=>`M${h(g[0]).toFixed(1)},${x(g[1]).toFixed(1)}L${h(m[0]).toFixed(1)},${x(m[1]).toFixed(1)}`;_.length===2?A+=y(_[0],_[1]):_.length===4&&(A+=y(_[0],_[1])+y(_[2],_[3]))}return A})}const C=2.4,Xe=300,fn=30,Ks=16,Ts=10;function Zs(r,i,t){const l=Math.cos(t),s=Math.sin(t);return[[r*l*l+i*s*s,(r-i)*l*s],[(r-i)*l*s,r*s*s+i*l*l]]}const Is=[{name:"Minimum (Schale)",titel:"Beispiel f(x) = x₁² + 4x₂²",l1:2,l2:8,grad:0},{name:"Sattel",titel:"ein Eigenwert positiv, einer negativ",l1:3,l2:-1,grad:30},{name:"Maximum (Kuppel)",titel:"beide Eigenwerte negativ",l1:-2,l2:-5,grad:60},{name:"Rinne (halbdefinit)",titel:"ein Eigenwert genau null",l1:3,l2:0,grad:20}],er={minimum:"eine nach oben offene Schale",maximum:"eine Kuppel",sattel:"eine Sattelfläche",halb:"eine Rinne mit waagerechtem Boden",null:"eine waagerechte Ebene"};function Xs(){const[r,i]=E.useState(2),[t,l]=E.useState(8),[s,c]=E.useState(0),h=s*Math.PI/180,x=Zs(r,t,h),d=x[0][0]+x[1][1],f=x[0][0]*x[1][1]-x[0][1]*x[1][0],j=[Math.cos(h),Math.sin(h)],D=[-Math.sin(h),Math.cos(h)],a=x[0][0],A=x[0][1],z=x[1][1],p=E.useMemo(()=>(W,re)=>.5*(a*W*W+2*A*W*re+z*re*re),[a,A,z]),{niveausPos:R,niveausNeg:M,nullNiveau:F,vmax:_}=E.useMemo(()=>{let W=0;for(let ye=0;ye<=40;ye++)for(let Ie=0;Ie<=40;Ie++)W=Math.max(W,Math.abs(p(-C+ye*C/20,-C+Ie*C/20)));const re=[.03,.08,.15,.25,.38,.53,.7,.9],Ge=[],$e=[];if(W>1e-9)for(const ye of re)Math.max(r,t)>1e-9&&Ge.push(ye*W),Math.min(r,t)<-1e-9&&$e.push(-ye*W);return{niveausPos:Ge,niveausNeg:$e,nullNiveau:r*t<-1e-9,vmax:W}},[p,r,t]),[y,g]=E.useMemo(()=>{let W=1/0,re=-1/0;for(let Ge=0;Ge<=40;Ge++)for(let $e=0;$e<=40;$e++){const ye=p(-C+Ge*C/20,-C+$e*C/20);W=Math.min(W,ye),re=Math.max(re,ye)}return re-W<1e-9?[-1,1]:[W,re]},[p]),m=W=>fn+(W+C)/(2*C)*Xe,b=W=>Xe-(W+C)/(2*C)*Xe,N=E.useMemo(()=>Yi(p,R,-C,C,-C,C,m,b),[p,R]),S=E.useMemo(()=>Yi(p,M,-C,C,-C,C,m,b),[p,M]),w=E.useMemo(()=>F?Yi(p,[0],-C,C,-C,C,m,b)[0]:"",[p,F]),B=W=>.5*r*W*W,k=W=>.5*t*W*W,K=Math.max(1,.5*Math.max(Math.abs(r),Math.abs(t))*4),O=[{f:B,color:yn},{f:k,color:yn,dash:[6,4]}],X=1e-9,le=r>X&&t>X?"minimum":r<-X&&t<-X?"maximum":r*t<-X?"sattel":Math.abs(r)<X&&Math.abs(t)<X?"null":"halb",U=r>0?"v₁":"v₂",ae=r>0?r:t,Ae=r>0?"v₂":"v₁",Qe=r>0?t:r,H={minimum:{titel:"positiv definit",text:`Beide Regler stehen über null. Damit ist die quadratische Form hᵀH h für jedes h ≠ 0 positiv, und ${V("satz:hesse-kriterium-fuer-kritische-punkte")}(1) macht x* = 0 zu einem strikten lokalen Minimum. Wie steil es vom Nullpunkt weg bergauf geht, hängt an der Richtung: am flachsten mit Krümmung ${u(Math.min(r,t))}, am steilsten mit ${u(Math.max(r,t))}.`},maximum:{titel:"negativ definit",text:`Beide Regler stehen unter null, also ist hᵀH h für jedes h ≠ 0 negativ, und ${V("satz:hesse-kriterium-fuer-kritische-punkte")}(2) liefert ein striktes lokales Maximum. Am Bild der Höhenlinien ändert das nichts; was sich umkehrt, sind die Zahlen an ihnen, denn nach außen hin wird f kleiner statt größer.`},sattel:{titel:"indefinit",text:`Die beiden Regler tragen verschiedene Vorzeichen, H ist also indefinit, und ${V("satz:hesse-kriterium-fuer-kritische-punkte")}(3) meldet einen Sattelpunkt. Das rechte Schaubild zeigt, was das bedeutet: Entlang ${U} geht es mit Krümmung ${u(ae)} bergauf, entlang ${Ae} mit ${u(Qe)} bergab, in jeder Umgebung von x* = 0 liegen also Werte über und unter f(0) = 0. Das dick gezeichnete Niveau 0 zerfällt dabei in zwei sich kreuzende Geraden.`},halb:{titel:"semidefinit, nicht definit",text:`Ein Regler steht auf null, damit ist det H = λ₁·λ₂ = 0 und H singulär. Entlang der zugehörigen Hauptachse bleibt f konstant bei 0, die Höhenlinien werden zu Parallelen, und statt eines isolierten kritischen Punktes liegt eine ganze Gerade davon vor. Für unser rein quadratisches f ist der Nullpunkt deshalb weiterhin ein ${Math.max(r,t)>X?"Minimum":"Maximum"}, nur eben kein striktes. Bei allgemeinen Funktionen ist in diesem Grenzfall gar nichts mehr entschieden, wie ${V("bemerkung:wenn-die-hesse-matrix-nichts-entscheidet")} an x⁴, −x⁴ und x³ vorführt.`},null:{titel:"H = 0",text:"Beide Regler stehen auf null, H ist die Nullmatrix und f ≡ 0. Höhenlinien gibt es dann keine zu zeichnen, und kritisch ist nicht nur der Nullpunkt, sondern jede Stelle der Ebene."}}[le],oe=le==="minimum"||le==="maximum"?"ok":le==="sattel"?"warn":le==="null"?"neutral":"fail",[Re,Xn]=E.useState({azimuth:38,elevation:26}),L=E.useMemo(()=>({f:p,nx:28,ny:28,color:yn,opacity:.85,wire:!0}),[p]),J=E.useMemo(()=>[{p:[0,0,0],color:Qi,r:4,label:"x*",onTop:!0}],[]),ee=E.useMemo(()=>[{from:[0,0,y],to:[1.7*Math.cos(h),1.7*Math.sin(h),y],color:mn,label:"v₁",onTop:!0},{from:[0,0,y],to:[-1.7*Math.sin(h),1.7*Math.cos(h),y],color:mn,label:"v₂",onTop:!0}],[h,y]),ne=E.useMemo(()=>[...M,...F?[0]:[],...R],[M,F,R]),de=Math.abs(r-t)<1e-9&&Math.abs(r)>X,je=Be(-C,C),Ee=je.length>1?je[1]-je[0]:void 0;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Gehen wir die vier Voreinstellungen durch und ziehen danach λ₂ langsam durch die Null."}),e.jsx("p",{className:`max-w-prose text-xs ${Y}`,children:"Blau: Höhenlinien von f(x) = ½·xᵀH x und die Fläche darüber. Orange: die Eigenwerte λ₁, λ₂ und die Hauptachsen v₁, v₂. Violett: der kritische Punkt x* = 0."}),e.jsx("div",{className:"flex flex-wrap items-center gap-2 text-sm",children:Is.map(W=>{const re=r===W.l1&&t===W.l2&&s===W.grad;return e.jsx("button",{type:"button",title:W.titel,"aria-pressed":re,className:re?pe:ie,onClick:()=>{i(W.l1),l(W.l2),c(W.grad)},children:W.name},W.name)})}),e.jsx(I,{label:"λ₁ (Achse v₁)",value:r,onChange:W=>i(Math.round(W*2)/2),min:-8,max:8,step:.5,fmt:W=>u(W,1)}),e.jsx(I,{label:"λ₂ (Achse v₂)",value:t,onChange:W=>l(Math.round(W*2)/2),min:-8,max:8,step:.5,fmt:W=>u(W,1)}),e.jsx(I,{label:"φ (Eigenbasis)",value:s,onChange:W=>c(Math.round(W/5)*5),min:0,max:175,step:5,fmt:W=>`${u(W,0)}°`}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:`select-none text-[10px] ${Y}`,children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:fn},children:"x₂ ↑"}),e.jsxs("svg",{viewBox:`0 0 ${fn+Xe+Ts} ${Xe+Ks}`,role:"img","aria-label":`Höhenlinien von f mit den orangen Hauptachsen; im aktuellen Zustand ${er[le]}.`,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[e.jsxs("defs",{children:[e.jsx("clipPath",{id:"s113-clip",children:e.jsx("rect",{x:fn,y:0,width:Xe,height:Xe})}),e.jsx("marker",{id:"s113-pfeil",markerWidth:"7",markerHeight:"7",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L7,3 L0,6 z",fill:mn})})]}),je.map(W=>e.jsxs("g",{children:[e.jsx("line",{x1:fn,x2:fn+Xe,y1:b(W),y2:b(W),stroke:"var(--w-grid)",strokeWidth:W===0?1.2:.6}),e.jsx("text",{x:fn-4,y:b(W)+3,textAnchor:"end",fill:"var(--w-text)",fontSize:10,children:De(W,Ee)}),e.jsx("line",{y1:0,y2:Xe,x1:m(W),x2:m(W),stroke:"var(--w-grid)",strokeWidth:W===0?1.2:.6}),e.jsx("text",{x:m(W),y:Xe+12,textAnchor:"middle",fill:"var(--w-text)",fontSize:10,children:De(W,Ee)})]},`y${W}`)),e.jsxs("g",{clipPath:"url(#s113-clip)",children:[N.map((W,re)=>e.jsx("path",{d:W,stroke:yn,strokeWidth:1,opacity:.45,fill:"none"},`p${re}`)),S.map((W,re)=>e.jsx("path",{d:W,stroke:yn,strokeWidth:1,opacity:.45,strokeDasharray:"4 3",fill:"none"},`n${re}`)),w&&e.jsx("path",{d:w,stroke:yn,strokeWidth:2.2,fill:"none"}),[{v:j,name:"v₁"},{v:D,name:"v₂"}].map(({v:W,name:re})=>e.jsxs("g",{children:[e.jsx("line",{x1:m(0),y1:b(0),x2:m(1.7*W[0]),y2:b(1.7*W[1]),stroke:mn,strokeWidth:2.2,markerEnd:"url(#s113-pfeil)"}),e.jsx("text",{x:m(1.85*W[0]),y:b(1.85*W[1])+4,textAnchor:"middle",fill:mn,fontSize:12,stroke:"var(--w-bg)",strokeWidth:2.5,paintOrder:"stroke",children:re})]},re)),e.jsx("circle",{cx:m(0),cy:b(0),r:6,fill:"none",stroke:Qi,strokeWidth:2}),e.jsx("circle",{cx:m(0),cy:b(0),r:2.5,fill:Qi})]})]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:fn},children:"x₁ →"})]}),e.jsxs("div",{className:"shrink-0",children:[e.jsx(mr,{size:280,xDomain:[-C,C],yDomain:[-C,C],zDomain:[y,g],surface:L,contours:ne,contourColor:yn,points:J,arrows:ee,dropLines:!0,labels:{x:"x₁",y:"x₂",z:"f"},azimuth:Re.azimuth,elevation:Re.elevation,onViewChange:Xn,ariaLabel:`Die Funktion f als Fläche über der x₁-x₂-Ebene; im aktuellen Zustand ${er[le]}.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(fr,{value:Re,onChange:Xn})}),e.jsxs("p",{className:`mt-1 max-w-[280px] text-xs ${Y}`,children:["Dieselbe Funktion als Fläche: ",er[le],". Auf dem Boden liegen die Höhenlinien der linken Tafel, die orangen Pfeile sind dieselben Hauptachsen, der violette Punkt ist derselbe kritische Punkt. Ziehen dreht die Ansicht."]})]}),e.jsxs("div",{children:[e.jsx(At,{xLabel:"t",yLabel:"f(t·vᵢ)",series:O,xDomain:[-2,2],yDomain:[-K,K]}),e.jsx("p",{className:`mt-1 max-w-[330px] text-xs ${Y}`,children:"Die Funktion entlang der beiden Hauptachsen: durchgezogen f(t·v₁) = ½λ₁t², gestrichelt f(t·v₂) = ½λ₂t². Beide Kurven sind Parabeln, und ihre zweite Ableitung ist genau der zugehörige Eigenwert. Wo eine der beiden nach unten öffnet, kann im Nullpunkt kein Minimum liegen."})]})]}),e.jsxs("div",{className:`max-w-prose space-y-1 p-3 text-sm ${Et}`,children:[e.jsxs("p",{children:[e.jsxs("span",{className:"font-mono",style:{color:mn},children:["H = (",u(x[0][0])," ",u(x[0][1]),"; ",u(x[1][0])," ",u(x[1][1]),")"]}),", Spur ",e.jsx("span",{className:"font-mono",children:u(d)})," = λ₁ + λ₂, Determinante"," ",e.jsx("span",{className:"font-mono",children:u(f)})," = λ₁·λ₂"]}),e.jsxs("p",{children:["Eigenwerte"," ",e.jsxs("span",{className:"font-mono",style:{color:mn},children:["λ₁ = ",u(r,1),", λ₂ = ",u(t,1)]}),", Hauptachsen"," ",e.jsxs("span",{className:"font-mono",style:{color:mn},children:["v₁ = (",u(j[0]),"; ",u(j[1]),"), v₂ = (",u(D[0]),"; ",u(D[1]),")"]})]}),de&&e.jsx("p",{children:"Beide Eigenwerte sind gleich, H ist ein Vielfaches der Einheitsmatrix. Dann ist jede Richtung Eigenrichtung, die Höhenlinien sind Kreise, und der Regler φ ändert nichts an f."}),_>1e-9&&e.jsxs("p",{children:["Größter Betrag im gezeigten Ausschnitt: ",e.jsx("span",{className:"font-mono",children:u(_)}),"; die dünnen Höhenlinien liegen bei festen Bruchteilen davon, gestrichelt die negativen Niveaus."]})]}),e.jsx(ve,{kind:oe,titel:`${H.titel}.`,children:H.text})]})}function Js(){return e.jsx(Ce,{frage:"Wir starten bei der Voreinstellung Minimum (Schale) und ziehen λ₂ auf genau 0. Bleibt der Nullpunkt ein Minimum?",variante:"auswahl",loesung:"nichtstrikt",optionen:[{id:"strikt",text:"ja, weiterhin ein striktes Minimum"},{id:"nichtstrikt",text:"ja, aber kein striktes mehr"},{id:"sattel",text:"nein, es wird ein Sattel"}],verdeckt:e.jsxs("p",{className:"max-w-prose text-sm",children:["Mit λ₂ = 0 ist H = diag(2, 0) singulär. Entlang der Achse v₂ bleibt f konstant null, statt eines einzelnen kritischen Punktes liegt dort eine ganze Gerade davon. Für dieses rein quadratische f ist der Nullpunkt weiterhin ein Minimum, nur eben kein striktes; für allgemeine Funktionen entscheidet der semidefinite Fall gar nichts mehr (",V("bemerkung:wenn-die-hesse-matrix-nichts-entscheidet"),")."]}),children:e.jsx(Xs,{})})}function gt(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Wo die erste Ableitung aufhört"}),`
`,e.jsxs(i.p,{children:["Die Fréchet-Ableitung ersetzt ",e.jsx(n,{children:"f"})," in der Nähe von ",e.jsx(n,{children:"\\bx"}),` durch eine lineare Abbildung. Für
sehr vieles reicht das. Sie versagt aber ausgerechnet dort, wo wir am meisten wissen
wollen. Sei `,e.jsx(n,{children:"f\\colon S \\subseteq \\R^n \\to \\R"})," und ",e.jsx(n,{children:"\\bx^*"})," ein ",e.jsx(i.em,{children:"kritischer Punkt"}),`, also eine
Stelle mit `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^*)} = \\bnull"}),". Die lineare Näherung lautet dort"]}),`
`,e.jsx(o,{children:`\\cblue{f(\\bx^* + \\bh)} \\approx \\cblue{f(\\bx^*)} + \\corange{\\nabla f(\\bx^*)}\\,\\bh
= \\cblue{f(\\bx^*)} ,`}),`
`,e.jsxs(i.p,{children:["sie ist konstant. Ob ",e.jsx(n,{children:"\\bx^*"}),` ein Minimum, ein Maximum oder keines von beidem ist, steht
darin nicht. Davon hängt aber ab, ob ein Optimierungsverfahren angekommen ist, und in der
Statistik, wie genau ein Schätzer den Parameter trifft.`]}),`
`,e.jsxs(i.p,{children:[`Der Ausweg ist derselbe wie in der Schule: Wir leiten noch einmal ab. Was das für
Funktionen mehrerer Variabler heißt, klärt dieser Abschnitt. Die Antwort heißt
`,e.jsx(v,{id:"hessian-matrix",children:"Hesse-Matrix"}),`, sie ist wegen des Satzes von Schwarz symmetrisch, ihre
`,e.jsx(v,{id:"eigenvalue-eigenvector",children:"Eigenwerte"}),` entscheiden über die Art des kritischen Punktes,
und in der Statistik führt sie direkt zur Fisher-Information.`]}),`
`,e.jsx(i.h3,{children:"Ableitungen höheren Grades"}),`
`,e.jsx(i.p,{children:`Wir definieren höhere Ableitungen in einem Zug für normierte Vektorräume. Die Definition
wirkt beim ersten Lesen sperrig, sagt aber etwas sehr Einfaches, das wir gleich danach
auspacken.`}),`
`,e.jsxs(q,{kind:"Definition",label:"10.7.1 (k-mal (Fréchet-)differenzierbar)",id:"env-k-mal-frechet-differenzierbar",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\D"})," und ",e.jsx(n,{children:"\\E"})," normierte Vektorräume, ",e.jsx(n,{children:"U \\subseteq \\D"}),` offen und
`,e.jsx(n,{children:"f\\colon U \\to \\E"}),". Mit ",e.jsx(n,{children:"\\mathcal L^j(\\D,\\E)"}),` bezeichnen wir den normierten
Vektorraum der beschränkten `,e.jsx(n,{children:"j"}),"-linearen Abbildungen ",e.jsx(n,{children:"\\D^j \\to \\E"}),`; für
`,e.jsx(n,{children:"j=0"})," setzen wir ",e.jsx(n,{children:"\\mathcal L^0(\\D,\\E):=\\E"}),". Für ",e.jsx(n,{children:"j\\ge1"})," ist seine Operatornorm"]}),e.jsx(o,{children:`\\left\\|A\\right\\|_{\\mathrm{op}}
:= \\sup_{\\left\\|\\bh_1\\right\\|,\\dots,\\left\\|\\bh_j\\right\\|\\le 1}
\\left\\|A(\\bh_1,\\dots,\\bh_j)\\right\\| .`}),e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"D^0 f:=f"}),". Rekursiv heißt ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"U"})," ",e.jsxs(i.em,{children:[e.jsx(n,{children:"k"}),`-mal
(Fréchet-)differenzierbar`]}),", wenn für jedes ",e.jsx(n,{children:"j=1,\\dots,k"})," die Abbildung"]}),e.jsx(o,{children:`U \\longrightarrow \\mathcal L^{j-1}(\\D,\\E),
\\qquad \\by \\longmapsto D^{j-1}_{\\by}f`}),e.jsxs(i.p,{children:["Fréchet-differenzierbar ist. Ihre Ableitung an ",e.jsx(n,{children:"\\bx"}),`, eine beschränkte lineare
Abbildung `,e.jsx(n,{children:"\\D\\to\\mathcal L^{j-1}(\\D,\\E)"}),`, identifizieren wir mit der
beschränkten `,e.jsx(n,{children:"j"}),`-linearen Abbildung
`,e.jsx(n,{children:"\\cgreen{D^j_{\\bx}f}\\in\\mathcal L^j(\\D,\\E)"}),". Äquivalent gilt"]}),e.jsx(T,{tag:"10.7.1",id:"eq-k-mal-frechet-differenzierbar",children:`\\lim_{\\substack{\\bh\\to\\bnull\\\\\\bx+\\bh\\in U}}
\\frac{
\\left\\|\\cblue{D^{j-1}_{\\bx+\\bh}f}-\\cblue{D^{j-1}_{\\bx}f}
-\\cgreen{D^j_{\\bx}f(\\,\\cdot,\\dots,\\cdot,\\bh)}\\right\\|_{\\mathrm{op}}
}{\\left\\|\\bh\\right\\|}=0 .`}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"k"}),"-maliger Differenzierbarkeit ",e.jsxs(i.em,{children:["an ",e.jsx(n,{children:"\\bx"})]}),` sprechen wir, wenn diese
Voraussetzungen in einer offenen Umgebung von `,e.jsx(n,{children:"\\bx"})," erfüllt sind."]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.7.2 (Wie die Definition zu lesen ist)",id:"env-hoehere-ableitungen-wie-die-definition-zu-lesen-ist",children:[e.jsx(i.p,{children:"Sechs Beobachtungen, und die sperrige Formel wird handzahm."}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Für ",e.jsx(n,{children:"j = 1"})," steht dort die alte Definition."]}),` Dann ist
`,e.jsx(n,{children:"\\mathcal L^0(\\D,\\E)=\\E"})," und ",e.jsx(n,{children:"D^0f=f"}),", also lautet die Restbedingung"]}),e.jsx(o,{children:`\\cblue{f(\\bx+\\bh)}=\\cblue{f(\\bx)}+\\cgreen{D_{\\bx}f(\\bh)}+\\cred{r(\\bh)},
\\qquad
\\frac{\\left\\|\\cred{r(\\bh)}\\right\\|}{\\left\\|\\bh\\right\\|}\\longrightarrow0 ,`}),e.jsxs(i.p,{children:["und das ist die Fréchet-Ableitung aus ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),`. Die höheren
Stufen sind also keine neue Idee, sondern dieselbe Idee, mehrfach angewandt.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum eine Umgebung vorkommt."})," Um ",e.jsx(n,{children:"D^j_{\\bx}f"}),` zu bilden, müssen die Werte
`,e.jsx(n,{children:"D^{j-1}_{\\bx+\\bh}f"})," für kleine ",e.jsx(n,{children:"\\bh"}),` bereits existieren. Ableitungen nur an der
einzelnen Stelle `,e.jsx(n,{children:"\\bx"})," reichen dafür nicht."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Was hier wonach abgeleitet wird."})," Halten wir ",e.jsx(n,{children:"\\bh_1, \\dots, \\bh_{j-1}"})," fest. Dann ist"]}),e.jsx(o,{children:"\\bx \\longmapsto \\cblue{D^{j-1}_{\\bx} f(\\bh_1, \\dots, \\bh_{j-1})}"}),e.jsxs(i.p,{children:["eine Abbildung von ",e.jsx(n,{children:"\\D"})," nach ",e.jsx(n,{children:"\\E"}),". Aus ",e.jsx(i.a,{href:"#eq-k-mal-frechet-differenzierbar",children:"(10.7.1)"}),` folgt insbesondere: Ihre
Fréchet-Ableitung an der Stelle `,e.jsx(n,{children:"\\bx"}),", angewandt auf ",e.jsx(n,{children:"\\bh"}),`, ist
`,e.jsx(n,{children:"\\cgreen{D^j_{\\bx} f(\\bh_1, \\dots, \\bh_{j-1}, \\bh)}"}),". In einem Satz: ",e.jsxs(i.em,{children:["Die ",e.jsx(n,{children:"j"}),`-te Ableitung
ist die lineare Näherung an die Änderung der `,e.jsx(n,{children:"(j-1)"}),"-ten."]}),` Deshalb rechnen wir höhere
Ableitungen wie gewohnt iterativ aus, Stufe für Stufe.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum die Operatornorm entscheidend ist."}),` Sie verlangt mehr als eine Restabschätzung für
feste Richtungen: Der Rest muss gleichmäßig für alle Richtungen mit Norm höchstens eins
klein werden. Genau diese Gleichmäßigkeit braucht der allgemeine Taylor-Satz.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Multilinear und beschränkt."}),` Multilinear heißt: linear in jedem Argument, wenn die
übrigen festgehalten werden. Solche Abbildungen kennen wir aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.1",children:"Abschnitt 9.1"}),` und aus der Produktregel in
`,e.jsx(i.a,{href:"#sec-10.6",children:"Abschnitt 10.6"}),". Beschränkt heißt hier"]}),e.jsx(o,{children:`\\left\\|\\cgreen{D^j_{\\bx} f(\\bh_1, \\dots, \\bh_j)}\\right\\|
\\le M \\prod_{i=1}^{j} \\left\\|\\bh_i\\right\\|`}),e.jsxs(i.p,{children:["für ein ",e.jsx(n,{children:"M < \\infty"}),", das von ",e.jsx(n,{children:"\\bx"}),` abhängen darf. In endlicher Dimension ist das
automatisch erfüllt und kostet uns nichts.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Objekte werden größer."})," Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," braucht ",e.jsx(n,{children:"\\cgreen{D^1_{\\bx} f}"}),` einen
Zeilenvektor mit `,e.jsx(n,{children:"n"})," Zahlen, ",e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f}"})," eine Matrix mit ",e.jsx(n,{children:"n^2"}),` Zahlen,
`,e.jsx(n,{children:"\\cgreen{D^3_{\\bx} f}"})," einen ",e.jsx(v,{id:"tensor",children:"Tensor"})," dritter Stufe mit ",e.jsx(n,{children:"n^3"}),` Zahlen. Die Stufe
wächst mit `,e.jsx(n,{children:"j"}),", und ab ",e.jsx(n,{children:"j = 3"}),` verlassen wir die Matrixsprache
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Abschnitt 9.2"}),`). Die Definition sagt noch nichts darüber, wie wir
`,e.jsx(n,{children:"\\cgreen{D^j_{\\bx} f}"}),` ausrechnen. Das tun die nächsten Seiten für den wichtigsten Fall,
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),", und danach für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Vektor zu Skalar: die Hesse-Matrix"}),`
`,e.jsxs(i.p,{children:[`Für skalarwertige Funktionen sammelt die zweite Ableitung alle
`,e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"})," zweiter Ordnung in einer Matrix."]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.7.3 (Hesse-Matrix)",id:"env-hesse-matrix",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Hesse-Matrix"})," ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),` einer zweimal partiell differenzierbaren Funktion
`,e.jsx(n,{children:"f\\colon S \\subseteq \\R^n \\to \\R"})," ist die Matrix der zweiten partiellen Ableitungen,"]}),e.jsx(o,{children:`\\corange{\\bH_f(\\bx)_{i,j}} := \\frac{\\partial^2 f(\\bx)}{\\partial x_i \\partial x_j}
\\in \\R^{n \\times n} .`})]}),`
`,e.jsxs(i.p,{children:[`Bloße Differenzierbarkeit reicht hier nicht. Damit die Einträge überhaupt
existieren, brauchen wir zweite partielle Ableitungen, und für alles Weitere sogar deren
Stetigkeit. Wir schreiben dafür kurz `,e.jsx(n,{children:"f \\in \\Ccal^2"}),`, gemeint ist: alle zweiten
partiellen Ableitungen existieren und sind stetig.`]}),`
`,e.jsxs(i.p,{children:[`Unter dieser Bedingung fällt eine Symmetrie ab, die den halben Rechenaufwand spart. Wir
stellen sie den Formeln für `,e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f}"})," voran, weil diese sie schon brauchen."]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.7.4 (Satz von Schwarz)",id:"env-satz-von-schwarz",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen und ",e.jsx(n,{children:"f\\colon S \\to \\R"}),` zweimal stetig differenzierbar
(`,e.jsx(n,{children:"f \\in \\Ccal^2"}),"). Dann gilt für alle ",e.jsx(n,{children:"\\bx \\in S"})," und alle ",e.jsx(n,{children:"i, j"})]}),e.jsx(o,{children:`\\frac{\\partial^2 f(\\bx)}{\\partial x_i \\partial x_j}
= \\frac{\\partial^2 f(\\bx)}{\\partial x_j \\partial x_i} .`})]}),`
`,e.jsx(xe,{title:"Der Beweis: zweimal Mittelwertsatz an derselben doppelten Differenz",children:e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsx(e.Fragment,{children:"der erste und der letzte Summand sind schon symmetrisch, die beiden mittleren tauschen die Plätze"}),children:[e.jsxs(i.p,{children:["Wir schreiben kurz ",e.jsx(n,{children:"\\partial_i f := \\partial f/\\partial x_i"}),` und
`,e.jsx(n,{children:"\\partial_j \\partial_i f := \\partial(\\partial_i f)/\\partial x_j"}),`; das ist der Eintrag
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)_{j,i}}"}),". Für ",e.jsx(n,{children:"i = j"})," ist nichts zu zeigen, sei also ",e.jsx(n,{children:"i \\neq j"}),`. Zu
kleinen `,e.jsx(n,{children:"s, t \\neq 0"})," betrachten wir die ",e.jsx(i.em,{children:"doppelte Differenz"})]}),e.jsx(o,{children:`\\Delta(s,t) := \\cblue{f(\\bx + s\\be_i + t\\be_j)} - \\cblue{f(\\bx + s\\be_i)}
- \\cblue{f(\\bx + t\\be_j)} + \\cblue{f(\\bx)} .`}),e.jsxs(i.p,{children:["Diese Größe ändert sich nicht, wenn wir die Rollen von ",e.jsx(n,{children:"(i,s)"})," und ",e.jsx(n,{children:"(j,t)"}),` vertauschen: Es
werden nur die vier Summanden umsortiert.`]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(v,{id:"mean-value-theorem",children:"Mittelwertsatz"})," für ",e.jsx(n,{children:"\\varphi"})," auf dem Intervall zwischen ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"s"}),"; ",e.jsx(n,{children:"\\varphi"})," ist differenzierbar, weil ",e.jsx(n,{children:"f"})," nach ",e.jsx(n,{children:"x_i"})," stetig partiell differenzierbar ist"]}),children:[e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"\\varphi(u) := \\cblue{f(\\bx + u\\be_i + t\\be_j)} - \\cblue{f(\\bx + u\\be_i)}"}),`, also
`,e.jsx(n,{children:"\\Delta(s,t) = \\varphi(s) - \\varphi(0)"}),". Die Funktion ",e.jsx(n,{children:"\\varphi"}),` hängt nur von einer
Variablen ab und ist differenzierbar mit`]}),e.jsx(o,{children:"\\varphi'(u) = \\partial_i f(\\bx + u\\be_i + t\\be_j) - \\partial_i f(\\bx + u\\be_i) ."}),e.jsxs(i.p,{children:["Nach dem Mittelwertsatz gibt es ein ",e.jsx(n,{children:"\\sigma"})," zwischen ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"s"}),` mit
`,e.jsx(n,{children:"\\Delta(s,t) = s\\,\\varphi'(\\sigma)"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["zweite Anwendung des Mittelwertsatzes; ",e.jsx(n,{children:"\\psi"})," ist differenzierbar, weil die zweite partielle Ableitung ",e.jsx(n,{children:"\\partial_j\\partial_i f"})," nach Voraussetzung existiert"]}),children:[e.jsxs(i.p,{children:[`Jetzt dasselbe noch einmal in der anderen Richtung. Mit
`,e.jsx(n,{children:"\\psi(v) := \\partial_i f(\\bx + \\sigma\\be_i + v\\be_j)"}),` ist
`,e.jsx(n,{children:"\\varphi'(\\sigma) = \\psi(t) - \\psi(0)"}),", und ",e.jsx(n,{children:"\\psi"}),` ist differenzierbar mit
`,e.jsx(n,{children:"\\psi'(v) = \\partial_j \\partial_i f(\\bx + \\sigma\\be_i + v\\be_j)"}),`. Der Mittelwertsatz
liefert ein `,e.jsx(n,{children:"\\tau"})," zwischen ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"t"})," mit"]}),e.jsx(o,{children:"\\Delta(s,t) = s\\,t\\; \\partial_j \\partial_i f(\\bx + \\sigma\\be_i + \\tau\\be_j) ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["hier geht die Voraussetzung ",e.jsx(n,{children:"f \\in \\Ccal^2"})," ein; ohne Stetigkeit der zweiten Ableitungen könnten die beiden Grenzwerte auseinanderfallen, und es gibt Gegenbeispiele dieser Art"]}),children:[e.jsxs(i.p,{children:["Nun wiederholen wir die Schritte 2 und 3 mit vertauschten Rollen von ",e.jsx(n,{children:"i"})," und ",e.jsx(n,{children:"j"}),`. Weil
`,e.jsx(n,{children:"\\Delta(s,t)"})," dabei nach Schritt 1 dasselbe bleibt, gibt es ",e.jsx(n,{children:"\\wt{\\sigma}"})," zwischen ",e.jsx(n,{children:"0"}),` und
`,e.jsx(n,{children:"t"})," sowie ",e.jsx(n,{children:"\\wt{\\tau}"})," zwischen ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"s"})," mit"]}),e.jsx(o,{children:`s\\,t\\;\\partial_j \\partial_i f(\\bx + \\sigma\\be_i + \\tau\\be_j)
= s\\,t\\;\\partial_i \\partial_j f(\\bx + \\wt{\\tau}\\be_i + \\wt{\\sigma}\\be_j) .`}),e.jsxs(i.p,{children:["Wir teilen durch ",e.jsx(n,{children:"s\\,t \\neq 0"})," und lassen ",e.jsx(n,{children:"s, t \\to 0"}),` laufen. Beide Argumente streben
gegen `,e.jsx(n,{children:"\\bx"}),`, und weil die zweiten partiellen Ableitungen stetig sind, streben beide Seiten
gegen `,e.jsx(n,{children:"\\partial_j\\partial_i f(\\bx)"})," beziehungsweise ",e.jsx(n,{children:"\\partial_i\\partial_j f(\\bx)"}),"."]})]})]})}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.7.5 (Was die Symmetrie spart)",id:"env-was-die-symmetrie-spart",children:[e.jsxs(i.p,{children:["Aus ",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),` folgt sofort
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} = \\corange{\\bH_f(\\bx)}^\\top"}),`: Die Hesse-Matrix einer
`,e.jsx(n,{children:"\\Ccal^2"}),"-Funktion ist ",e.jsx(v,{id:"symmetric-matrix",children:"symmetrisch"}),`. Die Reihenfolge, in der wir
partiell ableiten, spielt also keine Rolle.`]}),e.jsxs(i.p,{children:["Das ist mehr als eine Schönheit. Statt aller ",e.jsx(n,{children:"n^2"}),` Einträge müssen wir nur die
`,e.jsx(n,{children:"n(n+1)/2"})," Einträge auf und über der Diagonalen berechnen und speichern. Für ",e.jsx(n,{children:"n = 100"}),` sind
das `,e.jsx(n,{children:"5050"})," statt ",e.jsx(n,{children:"10\\,000"})," Zahlen, für ",e.jsx(n,{children:"n = 1000"})," schon ",e.jsx(n,{children:"500\\,500"}),` statt einer Million.
Vorsicht mit der naheliegenden Kurzfassung: Das ist etwas `,e.jsx(i.em,{children:"mehr"}),` als die Hälfte, nicht
weniger, denn `,e.jsx(n,{children:"n(n+1)/2 = n^2/2 + n/2"}),". Der Quotient fällt mit wachsendem ",e.jsx(n,{children:"n"})," von ",e.jsx(n,{children:"0{,}75"}),`
bei `,e.jsx(n,{children:"n = 2"})," auf ",e.jsx(n,{children:"0{,}5005"})," bei ",e.jsx(n,{children:"n = 1000"}),"."]}),e.jsxs(i.p,{children:[`Die Symmetrie zahlt sich zweimal aus: bei der Berechnung, und beim Lösen von Systemen mit
`,e.jsx(n,{children:"\\corange{\\bH_f}"}),". Ist ",e.jsx(n,{children:"\\corange{\\bH_f}"}),` zusätzlich positiv definit, also gerade in der
Nähe eines Minimums, so bietet sich das Cholesky-Verfahren aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"})," an; Symmetrie allein reicht dafür nicht, denn ",e.jsx(i.a,{href:"?k=05-lgs#env-cholesky-zerlegung",children:"Satz 5.4.2"}),`
verlangt positive Definitheit. Für symmetrische Matrizen gilt außerdem der
`,e.jsx(v,{id:"spectral-theorem",children:"Spektralsatz"}),`: Es gibt eine Orthonormalbasis aus Eigenvektoren, und
alle Eigenwerte sind reell. Darauf beruht alles Weitere in diesem Abschnitt.`]})]}),`
`,e.jsxs(i.p,{children:["Jetzt können wir die Ableitungen erster und zweiter Stufe für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`
ausrechnen.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.7.6 (Erste und zweite Ableitung in Koordinaten)",id:"env-erste-und-zweite-ableitung-in",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," und ",e.jsx(n,{children:"\\bx \\in S"}),`. Dann gilt für alle
`,e.jsx(n,{children:"\\bh, \\bh_1, \\bh_2 \\in \\R^n"})]}),e.jsx(o,{children:`\\cgreen{D_{\\bx} f(\\bh)} = \\corange{\\nabla f(\\bx)}\\,\\bh
\\qquad \\text{und} \\qquad
\\cgreen{D^2_{\\bx} f(\\bh_1, \\bh_2)} = \\bh_1^\\top \\corange{\\bH_f(\\bx)}\\, \\bh_2 .`})]}),`
`,e.jsx(xe,{title:"Warum Gradient und Hesse-Matrix die ersten beiden Ableitungen darstellen",children:e.jsxs(ke,{children:[e.jsx(G,{why:e.jsxs(e.Fragment,{children:["dort mit ",e.jsx(n,{children:"\\bh = t\\be_j"})," hergeleitet: eine lineare Abbildung ist durch ihre Werte auf den Koordinatenrichtungen festgelegt"]}),children:e.jsxs(i.p,{children:["Die erste Formel ist Gleichung ",e.jsx(i.a,{href:"#eq-eq-10-2-1",children:"(10.2.1)"}),` aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),`: Der Gradient ist der Zeilenvektor der
partiellen Ableitungen, und `,e.jsx(n,{children:"\\bh \\mapsto \\corange{\\nabla f(\\bx)}\\bh"}),` ist die zugehörige
lineare Abbildung.`]})}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-k-mal-frechet-differenzierbar",children:"(10.7.1)"})," mit ",e.jsx(n,{children:"j = 2"}),"; ",e.jsx(n,{children:"D^1_{\\bx+\\bh} f(\\bh_1) = \\nabla f(\\bx+\\bh)\\bh_1"})," und ebenso an der Stelle ",e.jsx(n,{children:"\\bx"})]}),children:[e.jsxs(i.p,{children:["Für die zweite Formel setzen wir ",e.jsx(n,{children:"j = 2"})," in ",e.jsx(i.a,{href:"#eq-k-mal-frechet-differenzierbar",children:"(10.7.1)"}),". Das Produkt über ",e.jsx(n,{children:"i = 1, \\dots, 1"}),`
ist `,e.jsx(n,{children:"\\left\\|\\bh_1\\right\\|"}),", und beide ",e.jsx(n,{children:"D^1"}),`-Terme schreiben wir nach Schritt 1 in
Gradientenform:`]}),e.jsx(o,{children:`\\cgreen{D^2_{\\bx} f(\\bh_1, \\bh)}
= \\left(\\corange{\\nabla f(\\bx + \\bh)} - \\corange{\\nabla f(\\bx)}\\right)\\bh_1
+ \\cred{o(\\left\\|\\bh\\right\\|)\\left\\|\\bh_1\\right\\|} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"})," macht ",e.jsx(n,{children:"\\bH_f"})," symmetrisch, deshalb dürfen wir die Indizes tauschen; dass stetige partielle Ableitungen schon die volle Differenzierbarkeit von ",e.jsx(n,{children:"\\bg"})," nach sich ziehen, ist ein Standardsatz der Analysis, den wir hier als bekannt voraussetzen"]}),children:[e.jsxs(i.p,{children:[`Der Gradient ist selbst eine Abbildung, nämlich
`,e.jsx(n,{children:"\\bg\\colon S \\to \\R^n"}),", ",e.jsx(n,{children:"\\bg(\\bx) := \\corange{\\nabla f(\\bx)}^\\top"}),`. Ihre Jacobimatrix hat
die Einträge`]}),e.jsx(o,{children:`\\bJ_{\\bg}(\\bx)_{i,j} = \\frac{\\partial}{\\partial x_j}\\frac{\\partial f(\\bx)}{\\partial x_i}
= \\corange{\\bH_f(\\bx)_{j,i}} = \\corange{\\bH_f(\\bx)_{i,j}} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\bJ_{\\bg}(\\bx) = \\corange{\\bH_f(\\bx)}"}),". Weil ",e.jsx(n,{children:"f \\in \\Ccal^2"}),` ist, sind alle diese
Einträge stetig, und damit ist `,e.jsx(n,{children:"\\bg"})," differenzierbar:"]}),e.jsx(o,{children:`\\corange{\\nabla f(\\bx + \\bh)}^\\top = \\corange{\\nabla f(\\bx)}^\\top
+ \\corange{\\bH_f(\\bx)}\\,\\bh + \\cred{\\br(\\bh)} ,
\\qquad \\left\\|\\cred{\\br(\\bh)}\\right\\| = \\cred{o(\\left\\|\\bh\\right\\|)} .`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["das Eindeutigkeitsargument aus dem letzten Schritt des Beweises zu ",e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),": ",e.jsx(n,{children:"\\bh = t\\bu"})," einsetzen, der Quotient hängt nicht von ",e.jsx(n,{children:"t"})," ab und muss null sein"]}),children:[e.jsxs(i.p,{children:[`Transponieren wir die letzte Zeile und setzen sie in Schritt 2 ein, so wird aus der
Differenz der Gradienten `,e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx)} + \\cred{\\br(\\bh)}^\\top"}),", und"]}),e.jsx(o,{children:`\\cgreen{D^2_{\\bx} f(\\bh_1, \\bh)}
= \\bh^\\top \\corange{\\bH_f(\\bx)}\\,\\bh_1
+ \\cred{\\br(\\bh)^\\top \\bh_1 + o(\\left\\|\\bh\\right\\|)\\left\\|\\bh_1\\right\\|} .`}),e.jsxs(i.p,{children:["Der ganze rote Rest ist ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)\\left\\|\\bh_1\\right\\|}"}),`, denn
`,e.jsx(n,{children:"\\left|\\cred{\\br(\\bh)^\\top\\bh_1}\\right| \\le \\left\\|\\cred{\\br(\\bh)}\\right\\|\\left\\|\\bh_1\\right\\|"}),`
nach Cauchy-Schwarz. Halten wir nun `,e.jsx(n,{children:"\\bh_1"}),` fest, so sind
`,e.jsx(n,{children:"\\bh \\mapsto \\cgreen{D^2_{\\bx} f(\\bh_1, \\bh)}"}),` und
`,e.jsx(n,{children:"\\bh \\mapsto \\bh^\\top\\corange{\\bH_f(\\bx)}\\bh_1"}),` zwei lineare Abbildungen, die sich nur um
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),` unterscheiden, und solche Abbildungen sind gleich. Also ist
`,e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f(\\bh_1, \\bh)} = \\bh^\\top \\corange{\\bH_f(\\bx)}\\bh_1"}),`, und wegen der
Symmetrie von `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),` ist das dasselbe wie
`,e.jsx(n,{children:"\\bh_1^\\top \\corange{\\bH_f(\\bx)}\\bh"}),". Mit ",e.jsx(n,{children:"\\bh_2 := \\bh"})," steht die Behauptung da."]})]})]})}),`
`,e.jsxs(i.p,{children:["Die Formel ",e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f(\\bh_1, \\bh_2)} = \\bh_1^\\top \\corange{\\bH_f(\\bx)}\\bh_2"}),` ist
in beiden Argumenten linear, also eine bilineare Abbildung im Sinne von
`,e.jsx(i.a,{href:"#env-beschraenkte-bilineare-abbildung",children:"Definition 10.6.1"}),". Für ",e.jsx(n,{children:"\\bh_1 = \\bh_2 = \\bh"}),` wird daraus die
`,e.jsx(v,{id:"quadratic-form",children:"quadratische Form"})," ",e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx)}\\bh"}),`, und die
misst gleich, wie sich `,e.jsx(n,{children:"f"})," in Richtung ",e.jsx(n,{children:"\\bh"})," krümmt."]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.7.7 (Gradient und Hesse-Matrix einer kubischen Funktion)",id:"env-gradient-und-hesse-matrix-einer",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{f(\\bx)} = \\tfrac{1}{3}x_1^3 - x_1 + x_2^2"}),`. Die ersten partiellen Ableitungen
sind `,e.jsx(n,{children:"\\partial f/\\partial x_1 = x_1^2 - 1"})," und ",e.jsx(n,{children:"\\partial f/\\partial x_2 = 2x_2"}),", also"]}),e.jsx(o,{children:`\\corange{\\nabla f(\\bx)} = \\begin{pmatrix} x_1^2 - 1 & 2x_2 \\end{pmatrix} \\in \\R^{1\\times 2} ,
\\qquad
\\corange{\\bH_f(\\bx)} = \\begin{pmatrix} 2x_1 & 0 \\\\ 0 & 2 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die Hesse-Matrix ist symmetrisch, wie ",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),` es verlangt, und sie hängt hier von
`,e.jsx(n,{children:"\\bx"})," ab. Kritische Punkte gibt es zwei, nämlich ",e.jsx(n,{children:"(1, 0)"})," und ",e.jsx(n,{children:"(-1, 0)"}),"."]}),e.jsxs(i.p,{children:["Im Punkt ",e.jsx(n,{children:"(1,0)"})," ist ",e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(2, 2)"})," mit den Eigenwerten ",e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"2"}),`, beide
positiv. Im Punkt `,e.jsx(n,{children:"(-1,0)"})," ist ",e.jsx(n,{children:"\\corange{\\bH_f} = \\diag(-2, 2)"}),`, ein Eigenwert positiv, der
andere negativ. Rechnen wir nach, was das bedeutet:`]}),e.jsx(o,{children:`\\begin{aligned}
\\cblue{f(-0{,}8;\\, 0)} - \\cblue{f(-1;\\, 0)} &= -0{,}0373 < 0 , \\\\
\\cblue{f(-1;\\, 0{,}2)} - \\cblue{f(-1;\\, 0)} &= +0{,}0400 > 0 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"(-1,0)"})," aus fällt ",e.jsx(n,{children:"f"}),` also entlang der ersten Koordinate und steigt entlang der
zweiten. Ein Minimum ist das nicht, ein Maximum auch nicht. Im Punkt `,e.jsx(n,{children:"(1,0)"}),` dagegen
steigt `,e.jsx(n,{children:"f"}),` in jede Richtung, dort liegt ein lokales Minimum mit Wert
`,e.jsx(n,{children:"\\cblue{f(1,0)} = -2/3"}),". Der nächste Satz macht daraus eine Regel."]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.7.8 (Die dritte Ableitung ist ein Tensor)",id:"env-die-dritte-ableitung-ist-ein-tensor",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"j = 3"}),` passt kein Matrixformat mehr. Wir schreiben
`,e.jsx(n,{children:"\\cgreen{D^3_{\\bx} f} \\in \\R^{n \\times n \\times n}"})," mit den Einträgen"]}),e.jsx(o,{children:`\\left(\\cgreen{D^3_{\\bx} f}\\right)_{i,j,k}
= \\frac{\\partial^3 f(\\bx)}{\\partial x_k \\partial x_j \\partial x_i} ,
\\qquad
\\cgreen{D^3_{\\bx} f(\\bh_1, \\bh_2, \\bh_3)}
= \\sum_{i,j,k} \\left(\\cgreen{D^3_{\\bx} f}\\right)_{i,j,k} h_{1i}\\, h_{2j}\\, h_{3k} .`}),e.jsxs(i.p,{children:["Das ist ein ",e.jsx(v,{id:"tensor",children:"Tensor"}),` dritter Stufe, wie wir ihn in
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Abschnitt 9.2"})," kennengelernt haben, mit ",e.jsx(n,{children:"n^3"}),` Einträgen. Für
`,e.jsx(n,{children:"f \\in \\Ccal^3"}),` ist er in allen drei Indizes symmetrisch, sodass wieder nur ein Bruchteil
davon wirklich zu berechnen ist.`]}),e.jsxs(i.p,{children:["Zur Notation halten wir ein für alle Mal fest: Der Index an Position ",e.jsx(n,{children:"r"})," gehört zum ",e.jsx(n,{children:"r"}),`-ten
Argument, und in welcher Reihenfolge die partiellen Ableitungen ausgeführt werden, spielt
unter den hier durchgehend vorausgesetzten Stetigkeitsannahmen keine Rolle
(`,e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"})," für ",e.jsx(n,{children:"\\Ccal^2"}),", die entsprechende Symmetrie für ",e.jsx(n,{children:"\\Ccal^3"}),`). Der
Speicherbedarf ist dagegen der eigentliche Grund, warum in der Praxis fast nie über die
zweite Stufe hinausgegangen wird: Ein solcher Tensor verlangt für `,e.jsx(n,{children:"n = 1000"}),` schon eine
Milliarde Zahlen.`]})]}),`
`,e.jsx(i.h3,{children:"Krümmung, Definitheit und kritische Punkte"}),`
`,e.jsxs(i.p,{children:["Die Hesse-Matrix beschreibt die lokale Krümmung von ",e.jsx(n,{children:"f"}),`. Weil sie symmetrisch ist, hat sie
nach dem Spektralsatz reelle Eigenwerte und eine Orthonormalbasis aus Eigenvektoren. Das
Vorzeichenmuster dieser Eigenwerte entscheidet über die Art des kritischen Punktes.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.7.9 (Hesse-Kriterium für kritische Punkte)",id:"env-hesse-kriterium-fuer-kritische-punkte",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen, ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," und ",e.jsx(n,{children:"\\bx^* \\in S"}),` ein kritischer Punkt,
also `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^*)} = \\bnull"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"})," ",e.jsx(v,{id:"positive-definite",children:"positiv definit"}),`, gilt also
`,e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx^*)}\\bh > 0"})," für alle ",e.jsx(n,{children:"\\bh \\neq \\bnull"}),", so ist ",e.jsx(n,{children:"\\bx^*"}),` ein
striktes lokales Minimum.`]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"}),` negativ definit, gilt also
`,e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx^*)}\\bh < 0"})," für alle ",e.jsx(n,{children:"\\bh \\neq \\bnull"}),", so ist ",e.jsx(n,{children:"\\bx^*"}),` ein
striktes lokales Maximum.`]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"}),` indefinit, hat also positive und negative Eigenwerte, so
ist `,e.jsx(n,{children:"\\bx^*"})," ein ",e.jsx(i.em,{children:"Sattelpunkt"}),`: In jeder noch so kleinen
`,e.jsx(v,{id:"neighborhood",children:"Umgebung"})," von ",e.jsx(n,{children:"\\bx^*"}),` liegen Punkte mit größerem und Punkte mit
kleinerem Funktionswert.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Den Beweis liefert die Taylorentwicklung zweiter Ordnung aus
`,e.jsx(i.a,{href:"#sec-10.8",children:"Abschnitt 10.8"}),`. Die Idee lässt sich aber schon hier in einem Satz sagen. In
einem kritischen Punkt fällt der lineare Term weg, und es bleibt`]}),`
`,e.jsx(o,{children:`\\cblue{f(\\bx^* + \\bh)} = \\cblue{f(\\bx^*)}
+ \\tfrac{1}{2}\\,\\bh^\\top \\corange{\\bH_f(\\bx^*)}\\,\\bh
+ \\cred{o(\\left\\|\\bh\\right\\|^2)} .`}),`
`,e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"}),` positiv definit mit kleinstem Eigenwert
`,e.jsx(n,{children:"\\corange{\\lambda_{\\min}} > 0"}),`, so ist der Krümmungsterm mindestens
`,e.jsx(n,{children:"\\tfrac{1}{2}\\corange{\\lambda_{\\min}}\\left\\|\\bh\\right\\|^2"}),`, während der rote Rest schneller
als `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"})," verschwindet. Für hinreichend kleine ",e.jsx(n,{children:"\\bh \\neq \\bnull"}),` gewinnt
also die Krümmung, und `,e.jsx(n,{children:"\\cblue{f(\\bx^*+\\bh)} > \\cblue{f(\\bx^*)}"}),`. Bei einem indefiniten
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"}),` führen wir dasselbe Argument entlang der beiden Eigenrichtungen zu
einem positiven und einem negativen Eigenwert getrennt durch.`]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.7.10 (Wenn die Hesse-Matrix nichts entscheidet)",id:"env-wenn-die-hesse-matrix-nichts-entscheidet",children:[e.jsxs(i.p,{children:["Die drei Fälle in ",e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` decken nicht alles ab. Offen bleibt genau der Grenzfall, in
dem `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"}),` semidefinit, aber nicht definit ist: Mindestens ein Eigenwert
ist null, und die übrigen tragen alle dasselbe Vorzeichen. Ein Eigenwert null allein reicht
dafür übrigens nicht; kommt ein gemischtes Vorzeichenmuster hinzu, etwa bei
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)} = \\diag(1, -1, 0)"}),`, so ist die Matrix indefinit und Fall 3 greift
nach wie vor. Im semidefiniten Grenzfall dagegen entscheidet die zweite Ableitung gar
nichts. Schon in einer Variablen sehen wir das an drei Funktionen mit
`,e.jsx(n,{children:"f'(0) = f''(0) = 0"}),":"]}),e.jsx(o,{children:`f(x) = x^4 \\ \\ (\\text{Minimum}) , \\qquad
f(x) = -x^4 \\ \\ (\\text{Maximum}) , \\qquad
f(x) = x^3 \\ \\ (\\text{weder noch}) .`}),e.jsxs(i.p,{children:["In allen drei Fällen ist ",e.jsx(n,{children:"\\corange{\\bH_f(0)} = (0)"}),`, also zugleich positiv und negativ
semidefinit. Erst die dritte beziehungsweise vierte Ableitung trennt die Fälle.`]}),e.jsxs(i.p,{children:["Und in der Gegenrichtung wird die Aussage schwächer: Liegt in ",e.jsx(n,{children:"\\bx^*"}),` ein lokales Minimum,
so folgt daraus nur, dass `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"})," positiv ",e.jsx(i.em,{children:"semi"}),`definit ist. Die strikte
Ungleichung darf verloren gehen, wie `,e.jsx(n,{children:"f(x) = x^4"})," zeigt."]})]}),`
`,e.jsxs(i.p,{children:[`Ein Bild macht das greifbar: die Funktion
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = x_1^2 + 4x_2^2"}),` mit ihren Höhenlinien. Zeichnen wir sie und machen die
Eigenwerte gleich verstellbar. Der Aufbau nutzt aus, dass sich jede symmetrische Matrix
nach dem Spektralsatz als
`,e.jsx(n,{children:"\\corange{\\bH} = \\bR(\\varphi)\\diag(\\corange{\\lambda_1}, \\corange{\\lambda_2})\\bR(\\varphi)^\\top"}),`
schreiben lässt, mit einer Drehung `,e.jsx(n,{children:"\\bR(\\varphi)"}),`. Wir stellen also nicht die Einträge von
`,e.jsx(n,{children:"\\corange{\\bH}"}),` ein, sondern gleich die Eigenwerte und die Lage der Eigenbasis. Zur
Funktion `,e.jsx(n,{children:"\\cblue{f(\\bx)} = \\tfrac{1}{2}\\bx^\\top\\corange{\\bH}\\bx"}),` gehört dann an jeder
Stelle dieselbe Hesse-Matrix `,e.jsx(n,{children:"\\corange{\\bH}"}),", und ",e.jsx(n,{children:"\\bnull"}),` ist ein kritischer Punkt von ihr,
solange `,e.jsx(n,{children:"\\corange{\\bH}"})," invertierbar ist sogar der einzige."]}),`
`,e.jsxs(me,{title:"Hesse-Kriterium zum Schieben",children:[e.jsxs(i.p,{children:["Damit lässt sich ",e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` abfahren wie eine Landkarte. Was passiert mit den Höhenlinien,
wenn ein Eigenwert das Vorzeichen wechselt? Welche Achse gehört zur langen Halbachse einer
Ellipse? Und was bleibt an der Grenze übrig, wenn ein Eigenwert genau auf null steht?`]}),e.jsx(Js,{}),e.jsxs(i.p,{children:[`Wie das Widget zeigt, hängt die ganze Fallunterscheidung an den Vorzeichen der beiden
Eigenwerte. Das Beispiel von eben liegt auf dem ersten Knopf: `,e.jsx(n,{children:"\\corange{\\lambda} = (2, 8)"}),` und
`,e.jsx(n,{children:"\\varphi = 0"})," ergibt ",e.jsx(n,{children:"\\corange{\\bH} = \\diag(2,8)"}),` und damit
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = x_1^2 + 4x_2^2"}),`. Die Höhenlinien sind Ellipsen um das Minimum in
`,e.jsx(n,{children:"\\bnull"}),`; das hängt an der Definitheit und geht bei jedem Vorzeichenwechsel verloren. Ihre
Hauptachsen liegen in Richtung der Eigenvektoren, hier also auf den Koordinatenachsen, und
die Krümmung entlang einer Hauptachse ist der zugehörige Eigenwert, denn
`,e.jsx(n,{children:"\\cblue{f(t\\bv_i)} = \\tfrac{1}{2}\\corange{\\lambda_i}t^2"}),`. Die letzten beiden Beobachtungen
gelten für jede symmetrische Hesse-Matrix, die erste nur im definiten Fall. Die lange
Halbachse gehört dabei zum `,e.jsx(i.em,{children:"kleinen"})," Eigenwert: Die Niveaumenge zum Wert ",e.jsx(n,{children:"4"}),` hat die
Halbachsen `,e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"1"}),", und ",e.jsx(n,{children:"2/1 = \\sqrt{8/2}"}),". Der Regler ",e.jsx(n,{children:"\\varphi"}),` dreht Höhenlinien und
Hauptachsen gemeinsam, lässt Spur und Determinante aber unberührt – die Eigenwerte hängen
nicht davon ab, wie wir das Koordinatensystem legen.`]}),e.jsxs(i.p,{children:[`Schieben wir einen Eigenwert unter null, so zerfallen die Ellipsen in Hyperbeln, und das
dick gezeichnete Niveau `,e.jsx(n,{children:"0"}),` wird zu einem Geradenkreuz. Das ist der Sattel aus
`,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`(3), und in der Raumtafel daneben ist es die Sattelfläche. Dieselbe Situation
kennen wir schon: Das Gradientenfeld-Widget in
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` zeigt
`,e.jsx(n,{children:"\\cblue{f(\\bx)} = x_1^2 + 3x_1x_2 + 2x_2^2"}),` mit der Hesse-Matrix
`,e.jsx(n,{children:"\\corange{\\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 3 & 4\\end{smallmatrix}\\bigr)}"}),`, deren
Eigenwerte `,e.jsx(n,{children:"3 \\pm \\sqrt{10}"}),", also ",e.jsx(n,{children:"6{,}162"})," und ",e.jsx(n,{children:"-0{,}162"}),`, genau dieses Vorzeichenmuster
haben.`]})]}),`
`,e.jsx(i.h3,{children:"Konvexität"}),`
`,e.jsx(i.p,{children:`Die Definitheit im kritischen Punkt ist eine lokale Aussage. Verlangen wir sie überall, so
bekommen wir eine globale Eigenschaft.`}),`
`,e.jsxs(q,{kind:"Satz",label:"10.7.11 (Konvexität und positive Semidefinitheit)",id:"env-konvexitaet-und-positive-semidefinitheit",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R^n"})," offen und ",e.jsx(i.em,{children:"konvex"})," und ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"}),". Dann gilt"]}),e.jsx(o,{children:`f \\text{ ist konvex auf } S
\\quad\\Longleftrightarrow\\quad
\\corange{\\bH_f(\\bx)} \\succeq 0 \\ \\ \\text{(positiv semidefinit) für alle } \\bx \\in S .`})]}),`
`,e.jsxs(i.p,{children:["Für eine ",e.jsx(v,{id:"convexity",children:"konvexe Funktion"}),` liegt die Verbindungsstrecke zwischen zwei
Punkten des Graphen nie unter dem Graphen. `,e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"}),` übersetzt das in eine punktweise
Bedingung an die zweite Ableitung, und das ist der Grund, warum konvexe
`,e.jsx(v,{id:"optimization",children:"Optimierungsprobleme"}),` handhabbar sind: Jeder kritische Punkt ist dort
schon ein globales Minimum, und es gibt keine Sattelpunkte, an denen ein Verfahren
hängenbleiben könnte.`]}),`
`,e.jsxs(xe,{title:"Zwei Gegenbeispiele zu den Voraussetzungen offen und konvex",children:[e.jsxs(q,{kind:"Bemerkung",label:"10.7.12 (Warum die Menge offen und konvex sein muss)",id:"env-warum-die-menge-offen-und-konvex-sein",children:[e.jsxs(i.p,{children:["Beide Zusätze in ",e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"})," werden leicht überlesen, nötig sind sie trotzdem."]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:[e.jsx(n,{children:"S"})," muss konvex sein."]}),` Sonst ist die linke Seite gar nicht definiert: Die
Konvexitätsbedingung spricht über Punkte `,e.jsx(n,{children:"t\\bx + (1-t)\\by"}),` auf der Verbindungsstrecke, und
die kann `,e.jsx(n,{children:"S"})," verlassen. Nehmen wir ",e.jsx(n,{children:"S = (-2,-1) \\cup (1,2) \\subset \\R"}),`, offen, aber nicht
konvex, und darauf `,e.jsx(n,{children:"f \\equiv -5"})," auf dem linken und ",e.jsx(n,{children:"f \\equiv 0"}),` auf dem rechten Stück.
Dann ist `,e.jsx(n,{children:"f'' \\equiv 0 \\ge 0"})," auf ganz ",e.jsx(n,{children:"S"}),`. Trotzdem gibt es keine konvexe Funktion auf
`,e.jsx(n,{children:"\\R"}),", die ",e.jsx(n,{children:"f"}),` fortsetzt: Eine konvexe Funktion hat nichtfallende Steigung, und wer links
die Steigung `,e.jsx(n,{children:"0"})," hat und danach um ",e.jsx(n,{children:"5"})," steigt, kann rechts nicht wieder bei Steigung ",e.jsx(n,{children:"0"}),`
ankommen.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:[e.jsx(n,{children:"S"})," muss offen sein."]})," Sonst scheitert die Richtung von links nach rechts. Sei ",e.jsx(n,{children:"S"}),` die
`,e.jsx(n,{children:"x_1"}),"-Achse im ",e.jsx(n,{children:"\\R^2"}),`, also konvex, aber ohne innere Punkte, und
`,e.jsx(n,{children:"f(\\bx) = x_1^2 - x_2^2"}),". Auf ",e.jsx(n,{children:"S"})," ist ",e.jsx(n,{children:"f(x_1, 0) = x_1^2"}),`, also konvex. Die Hesse-Matrix
ist überall `,e.jsx(n,{children:"\\diag(2,-2)"}),` und damit indefinit. Die Äquivalenz bricht, weil die Bedingung
an `,e.jsx(n,{children:"\\corange{\\bH_f}"})," Information aus Richtungen zieht, die in ",e.jsx(n,{children:"S"}),` gar nicht vorkommen.
Sobald `,e.jsx(n,{children:"S"})," offen und konvex ist, stimmt die Äquivalenz."]})]}),e.jsx(Me,{children:e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Gilt ",e.jsx(n,{children:"\\bH_f(\\bx) \\succeq 0"})," für alle ",e.jsx(n,{children:"\\bx"})," einer beliebigen Menge ",e.jsx(n,{children:"S \\subseteq \\R^n"}),`, so
ist `,e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"S"})," konvex."]}),e.jsxs(i.p,{children:["Ohne Zusatzbedingungen an ",e.jsx(n,{children:"S"}),` ist die Behauptung nicht einmal sinnvoll. Auf
`,e.jsx(n,{children:"S = (-2,-1) \\cup (1,2)"})," mit ",e.jsx(n,{children:"f \\equiv -5"})," links und ",e.jsx(n,{children:"f \\equiv 0"}),` rechts ist
`,e.jsx(n,{children:"f'' \\equiv 0"}),", aber die Verbindungsstrecke zwischen zwei Punkten verlässt ",e.jsx(n,{children:"S"}),`, und eine
konvexe Fortsetzung auf `,e.jsx(n,{children:"\\R"})," gibt es nicht. ",e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"})," verlangt ",e.jsx(n,{children:"S"}),` offen und konvex
(`,e.jsx(i.a,{href:"#env-warum-die-menge-offen-und-konvex-sein",children:"Bemerkung 10.7.12"}),")."]})]})})]}),`
`,e.jsxs(i.p,{children:["Die ",e.jsx(v,{id:"convexity",children:"Konvexität"}),` und was sie für Optimierungsverfahren bedeutet, ist ein
Thema für sich; `,e.jsx(i.a,{href:"?k=11-konvexitaet",children:"Kapitel 11"})," nimmt es sich vor."]}),`
`,e.jsx(i.h3,{children:"Warum das in der Praxis zählt"}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.7.13 (Praxisrelevanz der Hesse-Matrix)",id:"env-praxisrelevanz-der-hesse-matrix",children:[e.jsx(i.p,{children:`Vier Punkte, die zusammen erklären, warum die Hesse-Matrix in der Praxis überall
auftaucht.`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Warum Sattelpunkte in hoher Dimension plausibel sind."}),` Ein kritischer Punkt mit
invertierbarer Hesse-Matrix ist nur dann ein Extremum, wenn `,e.jsx(i.em,{children:"alle"})," ",e.jsx(n,{children:"n"}),` Eigenwerte
dasselbe Vorzeichen haben; im ausgearteten Fall entscheidet die Hesse-Matrix nichts
(`,e.jsx(i.a,{href:"#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),`). Schon eine grobe Zählung
macht klar, wie selten das ist: Wären die `,e.jsx(n,{children:"n"}),` Vorzeichen wie Münzwürfe, so hätte ein
Minimum (alle Vorzeichen positiv) die Wahrscheinlichkeit `,e.jsx(n,{children:"2^{-n}"}),` und irgendein Extremum,
Maximum eingeschlossen, die Wahrscheinlichkeit `,e.jsx(n,{children:"2^{1-n}"}),". Für ",e.jsx(n,{children:"n = 100"}),` sind das
`,e.jsx(n,{children:"7{,}9 \\cdot 10^{-31}"})," beziehungsweise ",e.jsx(n,{children:"1{,}6 \\cdot 10^{-30}"}),`. Die Eigenwerte
sind nicht unabhängig, die Zählung ist deshalb nur eine Faustregel. Sie motiviert aber,
warum indefinite kritische Punkte in hochdimensionalen Verlustlandschaften eine wichtige
Rolle spielen können. Auch das Rauschen des
`,e.jsx(v,{id:"gradient-descent",children:"stochastischen Gradientenabstiegs"})," ",e.jsx(i.em,{children:"kann"}),` helfen, instabile
Sattelregionen zu verlassen; eine Garantie gegen schlechte lokale Minima oder jeden
Sattelpunkt folgt aus der Münzwurfrechnung nicht. Augenzwinkernd ließe sich anhängen,
dass die Singularität also bevorstehe, vielleicht.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Statistik."})," Der wichtigste Spezialfall einer Funktion ",e.jsx(n,{children:"\\R^p \\to \\R"}),` ist die
`,e.jsx(v,{id:"likelihood",children:"Log-Likelihood"})," ",e.jsx(n,{children:"\\ell(\\btheta)"}),`. Die Hesse-Matrix der negativen
Log-Likelihood heißt `,e.jsx(i.em,{children:"beobachtete Fisher-Information"}),` und bestimmt, wie genau ein Schätzer
den Parameter trifft. Der nächste Unterabschnitt führt das aus.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Maschinelles Lernen."}),` Im streng konvexen quadratischen Modell bestimmt die Hesse-Matrix
die `,e.jsx(v,{id:"condition-number",children:"Kondition"}),` exakt. Für den Gradientenabstieg aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` hängt die Konvergenzrate dann am Verhältnis
`,e.jsx(n,{children:"\\kappa = \\corange{\\lambda_{\\max}}/\\corange{\\lambda_{\\min}}"}),` der extremen Eigenwerte: Bei
optimal gewählter Lernrate schrumpft der Abstand zum Minimum je Schritt auf das
`,e.jsx(n,{children:"(\\kappa - 1)/(\\kappa + 1)"}),`-fache. Dort wird
`,e.jsx(n,{children:"L(\\btheta) = \\tfrac{1}{2}\\btheta^\\top\\bA\\btheta"}),` mit
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 1 & 3\\end{smallmatrix}\\bigr)"}),` minimiert, und weil
`,e.jsx(n,{children:"\\corange{\\bH_L(\\btheta)} = \\bA"})," an jeder Stelle gilt, sind die Eigenwerte von ",e.jsx(n,{children:"\\bA"}),` genau
die gesuchten Krümmungen: `,e.jsx(n,{children:"\\corange{\\lambda_{\\max}} = 3{,}618"}),`,
`,e.jsx(n,{children:"\\corange{\\lambda_{\\min}} = 1{,}382"})," und ",e.jsx(n,{children:"\\kappa = 2{,}618"}),", der Faktor also ",e.jsx(n,{children:"0{,}447"}),`.
Bei `,e.jsx(n,{children:"\\kappa = 1000"})," stünde dort ",e.jsx(n,{children:"0{,}998"}),`, und das Verfahren käme kaum voran.
Für eine allgemeine Verlustfunktion ist die Hesse-Matrix ortsabhängig. Dieselbe Aussage
gilt dort nur lokal beziehungsweise unter zusätzlichen Annahmen wie einer gleichmäßigen
Schranke `,e.jsx(n,{children:"\\mu\\bI\\preceq\\bH_L(\\btheta)\\preceq L\\bI"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Optimierung."})," Verfahren, die ",e.jsx(n,{children:"\\corange{\\bH_f}"}),` nicht nur analysieren, sondern benutzen,
konvergieren erheblich schneller. Das Newton-Verfahren in
`,e.jsx(i.a,{href:"#sec-10.8",children:"Abschnitt 10.8"})," ist der Prototyp."]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Fisher-Information"}),`
`,e.jsxs(q,{kind:"Definition",label:"10.7.14 (Fisher-Informationsmatrix)",id:"env-fisher-informationsmatrix",children:[e.jsxs(i.p,{children:["Für ein statistisches Modell mit Log-Likelihood ",e.jsx(n,{children:"\\ell(\\btheta)"}),` und Parameter
`,e.jsx(n,{children:"\\btheta \\in \\R^p"}),` ist unter den üblichen Regularitätsbedingungen, die insbesondere
das Differenzieren unter dem Erwartungswert erlauben, die `,e.jsx(i.em,{children:"Fisher-Informationsmatrix"}),`
definiert als`]}),e.jsx(o,{children:`\\corange{\\bI(\\btheta)} := \\E\\left[-\\corange{\\bH_\\ell(\\btheta)}\\right]
= -\\E\\left[\\frac{\\partial^2 \\ell(\\btheta)}{\\partial \\theta_i \\partial \\theta_j}\\right]_{i,j}
\\in \\R^{p \\times p} .`})]}),`
`,e.jsxs(i.p,{children:["Das ",e.jsx(n,{children:"\\E"})," ist hier wieder der ",e.jsx(v,{id:"expected-value",children:"Erwartungswert"}),` und nicht der Zielraum aus
`,e.jsx(i.a,{href:"#env-k-mal-frechet-differenzierbar",children:"Definition 10.7.1"}),"; erwartet wird über die Daten, bei festem wahrem ",e.jsx(n,{children:"\\btheta"}),`. Lassen wir
den Erwartungswert weg, so erhalten wir die `,e.jsx(i.em,{children:"beobachtete"}),` Fisher-Information
`,e.jsx(n,{children:"-\\corange{\\bH_\\ell(\\btheta)}"}),` am jeweiligen Parameterwert; häufig wird sie am
ML-Schätzer `,e.jsx(n,{children:"\\wh{\\btheta}"}),` ausgewertet. Unter denselben Regularitätsbedingungen ist
die erwartete Score-Funktion null und es gilt außerdem
`,e.jsx(n,{children:"\\bI(\\btheta)=\\E[\\nabla\\ell(\\btheta)^\\top\\nabla\\ell(\\btheta)]"}),"."]}),`
`,e.jsxs(i.p,{children:[`Die Intuition steckt schon in der Krümmung. Eine stark gekrümmte Log-Likelihood fällt
neben ihrem Maximum steil ab: Benachbarte Parameterwerte erklären die Daten deutlich
schlechter, die Daten sind also `,e.jsx(i.em,{children:"informativ"})," über ",e.jsx(n,{children:"\\btheta"}),`. Eine flache Log-Likelihood
lässt einen weiten Bereich von Parametern fast gleich gut aussehen, und der Parameter ist
schwer zu schätzen. Beides misst dieselbe zweite Ableitung.`]}),`
`,e.jsx(xe,{title:"Die Fisher-Information im Bernoulli-Modell",children:e.jsxs(q,{kind:"Beispiel",label:"10.7.15 (Fisher-Information im Bernoulli-Modell)",id:"env-fisher-information-im-bernoulli-modell",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"y_1, \\dots, y_n"}),` unabhängige, identisch verteilte Bernoulli-Variablen mit
Erfolgswahrscheinlichkeit `,e.jsx(n,{children:"0<p<1"}),". Die Log-Likelihood ist"]}),e.jsx(o,{children:"\\ell(p) = \\sum_{i=1}^{n} \\left[y_i \\log p + (1 - y_i)\\log(1-p)\\right] ."}),e.jsx(i.p,{children:"Zweimal ableiten ergibt"}),e.jsx(o,{children:"\\ell''(p) = -\\sum_{i=1}^{n}\\left[\\frac{y_i}{p^2} + \\frac{1-y_i}{(1-p)^2}\\right] ,"}),e.jsxs(i.p,{children:["und mit ",e.jsx(n,{children:"\\E[y_i] = p"})," folgt"]}),e.jsx(o,{children:`\\corange{\\bI_n(p)} = \\E\\left[-\\ell''(p)\\right]
= n\\left[\\frac{p}{p^2} + \\frac{1-p}{(1-p)^2}\\right]
= n\\left[\\frac{1}{p} + \\frac{1}{1-p}\\right]
= \\frac{n}{p(1-p)} .`}),e.jsxs(i.p,{children:["Der ML-Schätzer ist hier der Mittelwert ",e.jsx(n,{children:"\\wh{p} = \\bar{y}"}),`, und seine Varianz ist bekannt:
`,e.jsx(n,{children:"\\var(\\wh{p}) = p(1-p)/n"}),". Das ist exakt ",e.jsx(n,{children:"\\corange{\\bI_n(p)}^{-1}"}),`, in diesem Modell also
keine Näherung. Mit `,e.jsx(n,{children:"p = 0{,}2"})," und ",e.jsx(n,{children:"n = 100"})," steht dort ",e.jsx(n,{children:"\\corange{\\bI_n} = 625"}),`, damit
`,e.jsx(n,{children:"\\var(\\wh{p}) = 0{,}0016"})," und eine Standardabweichung von ",e.jsx(n,{children:"0{,}04"}),"."]}),e.jsxs(i.p,{children:[`Die Krümmungs-Intuition lässt sich am selben Beispiel ablesen, weiterhin mit
`,e.jsx(n,{children:"n = 100"}),". Am flachsten ist die Log-Likelihood bei ",e.jsx(n,{children:"p = 0{,}5"}),`: Dort steuert eine einzelne
Beobachtung nur `,e.jsx(n,{children:"\\corange{\\bI_1} = 4"})," bei, und ",e.jsx(n,{children:"\\var(\\wh{p}) = 0{,}0025"}),` ist am größten.
Bei `,e.jsx(n,{children:"p = 0{,}05"})," ist ",e.jsx(n,{children:"\\corange{\\bI_1} = 21{,}05"}),`, also gut das Fünffache, und
`,e.jsx(n,{children:"\\var(\\wh{p}) = 0{,}000475"}),`: Nahe am Rand des Parameterbereichs sind die Daten deutlich
informativer.`]})]})}),`
`,e.jsxs(xe,{title:"Was die Merkregel zur Varianz des ML-Schätzers wirklich sagt",children:[e.jsxs(q,{kind:"Bemerkung",label:"10.7.16 (Cramér-Rao, sauber formuliert)",id:"env-cramer-rao-sauber-formuliert",children:[e.jsxs(i.p,{children:[`Als Merkregel kursiert
`,e.jsx(n,{children:"\\var(\\wh{\\btheta}) \\to \\corange{\\bI(\\btheta)}^{-1}"})," für ",e.jsx(n,{children:"n \\to \\infty"}),`. Gemeint ist das
Richtige, aber so verkürzt vermischt sie drei Dinge, die zu trennen sind.`]}),e.jsxs(i.p,{children:["Erstens die Buchführung über ",e.jsx(n,{children:"n"}),`. Ein konsistenter Schätzer hat
`,e.jsx(n,{children:"\\var(\\wh{\\btheta}) \\to \\bnull"}),`; gegen eine feste Matrix kann die Varianz also nicht
streben. Die Aussage trägt nur, wenn `,e.jsx(n,{children:"\\corange{\\bI}"})," die Information der ",e.jsx(i.em,{children:"ganzen"}),`
Stichprobe meint. Für unabhängige, identisch verteilte Beobachtungen ist
`,e.jsx(n,{children:"\\corange{\\bI_n(\\btheta)} = n\\,\\corange{\\bI_1(\\btheta)}"}),", und die Faustformel lautet"]}),e.jsx(o,{children:`\\var(\\wh{\\btheta}) \\approx \\corange{\\bI_n(\\btheta)}^{-1}
= \\frac{1}{n}\\corange{\\bI_1(\\btheta)}^{-1} .`}),e.jsx(i.p,{children:`Zweitens die saubere asymptotische Fassung. Unter Regularitätsbedingungen gilt für den
ML-Schätzer`}),e.jsx(o,{children:`\\sqrt{n}\\left(\\wh{\\btheta}_n - \\btheta\\right)
\\ \\xrightarrow{\\ d\\ }\\
N\\left(\\bnull, \\corange{\\bI_1(\\btheta)}^{-1}\\right) ,`}),e.jsxs(i.p,{children:["und daraus lesen wir die Faustformel als Näherung für endliches ",e.jsx(n,{children:"n"})," ab."]}),e.jsxs(i.p,{children:[`Drittens der Name. Die Cramér-Rao-Schranke selbst ist keine asymptotische Aussage, sondern
gilt bei festem `,e.jsx(n,{children:"n"})," und für ",e.jsx(v,{id:"unbiased-estimator",children:"erwartungstreue"}),` Schätzer: Deren
`,e.jsx(v,{id:"covariance-matrix",children:"Kovarianzmatrix"}),` erfüllt
`,e.jsx(n,{children:"\\var(\\wh{\\btheta}) \\succeq \\corange{\\bI_n(\\btheta)}^{-1}"}),` im Sinne der Definitheit. Der
ML-Schätzer ist im Allgemeinen nicht erwartungstreu und erreicht die Schranke erst
asymptotisch. Im Bernoulli-`,e.jsx(i.a,{href:"#env-fisher-information-im-bernoulli-modell",children:"Beispiel 10.7.15"})," fällt beides zusammen, weil ",e.jsx(n,{children:"\\wh{p}"}),`
erwartungstreu ist und die Schranke exakt annimmt.`]}),e.jsx(i.p,{children:`In allen drei Fassungen bleibt die Merkregel dieselbe: mehr Information, kleinere Varianz,
präzisere Schätzung.`})]}),e.jsx(Me,{children:e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für den ML-Schätzer gilt bei jedem Stichprobenumfang ",e.jsx(n,{children:"\\var(\\wh{\\btheta}) = \\bI(\\btheta)^{-1}"}),"."]}),e.jsxs(i.p,{children:["Gemeint ist eine asymptotische Aussage. Bei festem ",e.jsx(n,{children:"n"}),`
gilt die Cramér-Rao-Schranke `,e.jsx(n,{children:"\\var(\\wh{\\btheta}) \\succeq \\bI_n(\\btheta)^{-1}"}),`, und zwar für
erwartungstreue Schätzer; der ML-Schätzer ist im Allgemeinen verzerrt und erreicht die
Schranke erst für `,e.jsx(n,{children:"n \\to \\infty"}),`, in der Form
`,e.jsx(n,{children:"\\sqrt{n}(\\wh{\\btheta}_n - \\btheta) \\to N(\\bnull, \\bI_1(\\btheta)^{-1})"}),`
(`,e.jsx(i.a,{href:"#env-cramer-rao-sauber-formuliert",children:"Bemerkung 10.7.16"}),`). Das Bernoulli-Modell ist ein Sonderfall, in dem Gleichheit schon für
endliches `,e.jsx(n,{children:"n"})," gilt."]})]})})]}),`
`,e.jsx(i.h3,{children:"Vektor zu Vektor"}),`
`,e.jsxs(i.p,{children:["Zum Schluss der allgemeine Fall ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"}),`. Er ist in der Statistik nicht
exotisch. Die `,e.jsx(i.em,{children:"Score-Funktion"})," ",e.jsx(n,{children:"\\corange{\\nabla \\ell(\\btheta)}^\\top"}),` ist genau von dieser
Bauart, sie bildet `,e.jsx(n,{children:"\\R^p"})," nach ",e.jsx(n,{children:"\\R^p"}),` ab, und ihre Jacobimatrix ist die Hesse-Matrix
`,e.jsx(n,{children:"\\corange{\\bH_\\ell(\\btheta)}"}),", wie Schritt 3 im Beweis zu ",e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),` zeigt; aus ihr
entsteht die Fisher-Information von `,e.jsx(i.a,{href:"#env-fisher-informationsmatrix",children:"Definition 10.7.14"}),`.
Momentengleichungen sind ein zweites Beispiel. Auf das Transponierte kommt es dabei an:
In der Zeilenkonvention aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"})," ist ",e.jsx(n,{children:"\\corange{\\nabla\\ell(\\btheta)}"}),`
eine Zeile, und erst die transponierte Fassung ist eine Abbildung von `,e.jsx(n,{children:"\\R^p"})," nach ",e.jsx(n,{children:"\\R^p"}),"."]}),`
`,e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-k-mal-frechet-differenzierbar",children:"Definition 10.7.1"})," ist die ",e.jsx(n,{children:"j"}),`-te Ableitung eine multilineare Abbildung
`,e.jsx(n,{children:"\\cgreen{D^j_{\\bx} f}\\colon \\left(\\R^n\\right)^j \\to \\R^m"}),`. Als Zahlenschema ist das ein
Tensor der Stufe `,e.jsx(n,{children:"j+1"})," mit den Dimensionen"]}),`
`,e.jsx(o,{children:"m \\times \\underbrace{n \\times n \\times \\dots \\times n}_{j\\text{-mal}} ,"}),`
`,e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"m\\,n^j"})," Einträgen. In Koordinaten lautet die Auswertung"]}),`
`,e.jsx(o,{children:`\\cgreen{D^j_{\\bx} f(\\bh_1,\\dots,\\bh_j)}
= \\sum_{i_1,\\dots,i_j=1}^n
\\underbrace{\\frac{\\partial^j f(\\bx)}{\\partial x_{i_j}\\cdots \\partial x_{i_1}}}_{\\in\\, \\R^m}
h_{1,i_1} \\cdots h_{j,i_j} .`}),`
`,e.jsxs(i.p,{children:["Die Ausgabe ist also eine Summe von Vektoren aus ",e.jsx(n,{children:"\\R^m"}),`, gewichtet mit Produkten von
Komponenten der `,e.jsx(n,{children:"\\bh_i"}),`. Für die ersten drei Stufen schreiben wir das aus, und es
lohnt sich, die rechten Seiten anzusehen: Dort steht jeweils dieselbe Rechnung, ausgedrückt
über die Jacobimatrix.`]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.7.17 (Die ersten drei Stufen für Vektor-zu-Vektor)",id:"env-die-ersten-drei-stufen-fuer-vektor-zu",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R^m"})," hinreichend oft stetig differenzierbar. Dann gilt"]}),e.jsx(T,{tag:"10.7.2",id:"eq-die-ersten-drei-stufen-fuer-vektor-zu",children:`\\begin{aligned}
\\cgreen{D_{\\bx} f (\\bh)}
&= \\sum_{i=1}^n \\frac{\\partial f(\\bx)}{\\partial x_i}\\, h_i
= \\corange{\\bJ_f(\\bx)}\\,\\bh , \\\\
\\cgreen{D^2_{\\bx} f (\\bh_1, \\bh_2)}
&= \\sum_{i=1}^n \\sum_{j=1}^n \\frac{\\partial^2 f(\\bx)}{\\partial x_j \\partial x_i}\\,
   h_{1,i}\\, h_{2,j}
= \\sum_{i=1}^n \\frac{\\partial \\corange{\\bJ_f(\\bx)}}{\\partial x_i}\\, \\bh_1 \\cdot h_{2,i} , \\\\
\\cgreen{D^3_{\\bx} f (\\bh_1, \\bh_2, \\bh_3)}
&= \\sum_{i=1}^n \\sum_{j=1}^n \\sum_{k=1}^n
   \\frac{\\partial^3 f(\\bx)}{\\partial x_k \\partial x_j \\partial x_i}\\,
   h_{1,i}\\, h_{2,j}\\, h_{3,k}
= \\sum_{i=1}^n \\sum_{j=1}^n \\frac{\\partial^2 \\corange{\\bJ_f(\\bx)}}{\\partial x_j \\partial x_i}\\,
   \\bh_1 \\cdot h_{2,i} \\cdot h_{3,j} .
\\end{aligned}`})]}),`
`,e.jsx(xe,{title:"Warum die höheren Ableitungen dieselbe Indexrechnung ausdrücken",children:e.jsxs(ke,{children:[e.jsx(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"}),": ",e.jsx(n,{children:"\\bJ_f(\\bx)_{a,i} = \\partial f_a(\\bx)/\\partial x_i"}),"; Matrix mal Vektor ist die gewichtete Spaltensumme"]}),children:e.jsxs(i.p,{children:[`Die erste Zeile ist die Jacobimatrix aus
`,e.jsx(i.a,{href:"#sec-10.3",children:"Abschnitt 10.3"}),": Die ",e.jsx(n,{children:"i"}),`-te Spalte von
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)}"})," ist ",e.jsx(n,{children:"\\partial f(\\bx)/\\partial x_i \\in \\R^m"}),`, und das Produkt
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)}\\bh"})," summiert die Spalten mit den Gewichten ",e.jsx(n,{children:"h_i"}),"."]})}),e.jsx(G,{why:e.jsx(e.Fragment,{children:"Umbenennen gebundener Summationsindizes ändert nichts; der Satz von Schwarz wird hier nirgends gebraucht, die Identität ist rein kombinatorisch"}),children:e.jsx(i.p,{children:`Die zweite und die dritte Zeile sind reine Buchführung über Indexnamen: Schreiben wir beide
Seiten komponentenweise aus, so stehen nach Umbenennung der Summationsindizes zweimal
dieselben Summanden.`})}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["der letzte Schritt nutzt die Symmetrie aus ",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),"; ohne sie stünde dort die Transponierte"]}),children:[e.jsxs(i.p,{children:["Zur Kontrolle der Spezialfall ",e.jsx(n,{children:"m = 1"}),". Dann ist ",e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\corange{\\nabla f(\\bx)}"}),`
ein Zeilenvektor, und `,e.jsx(n,{children:"\\partial \\corange{\\nabla f(\\bx)}/\\partial x_i"})," ist die ",e.jsx(n,{children:"i"}),`-te Zeile
von `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),". Die zweite Zeile von ",e.jsx(i.a,{href:"#eq-die-ersten-drei-stufen-fuer-vektor-zu",children:"(10.7.2)"})," wird damit zu"]}),e.jsx(o,{children:`\\sum_{i=1}^n \\left(\\corange{\\bH_f(\\bx)}\\,\\bh_1\\right)_i h_{2,i}
= \\bh_2^\\top \\corange{\\bH_f(\\bx)}\\,\\bh_1
= \\bh_1^\\top \\corange{\\bH_f(\\bx)}\\,\\bh_2 ,`}),e.jsxs(i.p,{children:["also genau ",e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),"."]})]})]})}),`
`,e.jsxs(i.p,{children:["Wie groß werden diese Objekte? Für ",e.jsx(n,{children:"f\\colon \\R^{10} \\to \\R^5"}),` hat
`,e.jsx(n,{children:"\\cgreen{D^1_{\\bx} f}"})," genau ",e.jsx(n,{children:"50"})," Einträge, ",e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f}"})," schon ",e.jsx(n,{children:"500"}),` und
`,e.jsx(n,{children:"\\cgreen{D^3_{\\bx} f}"})," ganze ",e.jsx(n,{children:"5000"}),`. Der Satz von Schwarz drückt die zweite Stufe auf
`,e.jsx(n,{children:"5 \\cdot 10 \\cdot 11/2 = 275"}),`. Das erklärt, warum in der Praxis zweite Ableitungen fast nur
für skalarwertige Funktionen wirklich aufgestellt werden, und auch dort oft nur als
Näherung.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Fünf Aussagen zu diesem Abschnitt. Welche davon stimmen?"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f\\colon S \\to \\R"})," auf der offenen Menge ",e.jsx(n,{children:"S"}),` zweimal stetig differenzierbar, so ist die
Hesse-Matrix in jedem Punkt symmetrisch.`]}),e.jsxs(i.p,{children:["Das ist der Satz von Schwarz (",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),`). Der Beweis vergleicht zwei Mittelwertsätze an
derselben doppelten Differenz `,e.jsx(n,{children:"\\Delta(s,t)"}),`, und die Stetigkeit der zweiten Ableitungen
sorgt dafür, dass beide Grenzwerte für `,e.jsx(n,{children:"s, t \\to 0"})," zusammenfallen."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Satz von Schwarz senkt die Zahl der zu berechnenden zweiten Ableitungen von ",e.jsx(n,{children:"n^2"}),` auf
`,e.jsx(n,{children:"n(n+1)/2"}),", also auf weniger als die Hälfte."]}),e.jsxs(i.p,{children:["Die Zahlen stimmen, der Zusatz nicht: ",e.jsx(n,{children:"n(n+1)/2 = n^2/2 + n/2"})," ist etwas ",e.jsx(i.em,{children:"mehr"}),` als die
Hälfte von `,e.jsx(n,{children:"n^2"}),". Für ",e.jsx(n,{children:"n = 100"})," sind es ",e.jsx(n,{children:"5050"})," statt ",e.jsx(n,{children:"5000"}),". Erst für große ",e.jsx(n,{children:"n"}),` nähert sich
der Quotient der Hälfte an, bei `,e.jsx(n,{children:"n = 1000"})," liegt er bei ",e.jsx(n,{children:"0{,}5005"})," (",e.jsx(i.a,{href:"#env-was-die-symmetrie-spart",children:"Bemerkung 10.7.5"}),")."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Verschwindet der Gradient in ",e.jsx(n,{children:"\\bx^*"})," und ist ",e.jsx(n,{children:"\\bH_f(\\bx^*)"}),` positiv semidefinit, so liegt
in `,e.jsx(n,{children:"\\bx^*"})," ein lokales Minimum."]}),e.jsxs(i.p,{children:["Semidefinit reicht nicht. Für ",e.jsx(n,{children:"f(x) = x^3"})," ist ",e.jsx(n,{children:"f'(0) = f''(0) = 0"}),`, die Hesse-Matrix
`,e.jsx(n,{children:"(0)"})," ist positiv semidefinit, und trotzdem liegt in ",e.jsx(n,{children:"0"}),` weder ein Minimum noch ein
Maximum. `,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"})," verlangt positive ",e.jsx(i.em,{children:"Definitheit"}),`; im semidefiniten Grenzfall
entscheidet die zweite Ableitung nichts (`,e.jsx(i.a,{href:"#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),")."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"(\\bh_1, \\bh_2) \\mapsto \\bh_1^\\top \\bH_f(\\bx)\\bh_2"}),` ist in jedem der beiden
Argumente linear.`]}),e.jsxs(i.p,{children:["Halten wir ",e.jsx(n,{children:"\\bh_2"})," fest, so ist die Zuordnung ",e.jsx(n,{children:"\\bh_1 \\mapsto \\bh_1^\\top \\bH_f(\\bx)\\bh_2"}),`
das Skalarprodukt mit einem festen Vektor, also linear; für `,e.jsx(n,{children:"\\bh_1"}),` fest genauso. Damit ist
`,e.jsx(n,{children:"D^2_{\\bx} f"})," eine bilineare Abbildung im Sinne von ",e.jsx(i.a,{href:"#env-beschraenkte-bilineare-abbildung",children:"Definition 10.6.1"}),`, so wie es
`,e.jsx(i.a,{href:"#env-k-mal-frechet-differenzierbar",children:"Definition 10.7.1"})," für alle Stufen verlangt."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Nach der Münzwurf-Heuristik aus ",e.jsx(i.a,{href:"#env-praxisrelevanz-der-hesse-matrix",children:"Bemerkung 10.7.13"}),` sind in sehr hohen Dimensionen die
meisten kritischen Punkte lokale Minima oder Maxima.`]}),e.jsxs(i.p,{children:["Im Münzwurfmodell aus ",e.jsx(i.a,{href:"#env-praxisrelevanz-der-hesse-matrix",children:"Bemerkung 10.7.13"}),` ist es umgekehrt. Sobald die Hesse-Matrix
Eigenwerte beider Vorzeichen trägt, liegt ein Sattelpunkt vor; ein Extremum verlangt
bei invertierbarer Hesse-Matrix, dass alle `,e.jsx(n,{children:"n"}),` Eigenwerte dasselbe Vorzeichen haben.
Eine grobe
Zählung mit unabhängigen Vorzeichen gibt `,e.jsx(n,{children:"2^{-n}"})," für ein Minimum und ",e.jsx(n,{children:"2^{1-n}"}),` für ein
Extremum irgendeiner Sorte, für `,e.jsx(n,{children:"n = 100"})," also ",e.jsx(n,{children:"7{,}9 \\cdot 10^{-31}"}),` beziehungsweise
`,e.jsx(n,{children:"1{,}6 \\cdot 10^{-30}"}),`. Das ist eine qualitative Motivation, keine Verteilungsaussage
über reale Verlustlandschaften. Bei indefiniter Hesse-Matrix existiert eine Richtung
negativer Krümmung, und Rauschen kann einem stochastischen Verfahren helfen, eine solche
instabile Region zu verlassen; automatisch gelingt das nicht.`]})]}),e.jsxs(We,{loesung:0,toleranz:.001,children:[e.jsxs(i.p,{children:[`Stellen wir im Definitheits-Widget die Voreinstellung „Rinne (halbdefinit)" ein. Welchen
Wert hat dort `,e.jsx(n,{children:"\\det \\corange{\\bH}"}),"?"]}),e.jsxs(i.p,{children:["Null. Die Voreinstellung setzt ",e.jsx(n,{children:"\\corange{\\lambda} = (3, 0)"}),`, und wegen
`,e.jsx(n,{children:"\\det\\corange{\\bH} = \\corange{\\lambda_1}\\corange{\\lambda_2}"}),` ist die Determinante damit
null, die Matrix also singulär. Im Bild wird das zu Parallelen statt Ellipsen: Entlang der
Hauptachse zum Eigenwert `,e.jsx(n,{children:"0"})," bleibt ",e.jsx(n,{children:"\\cblue{f}"}),` konstant, statt eines isolierten kritischen
Punktes liegt dort eine ganze Gerade davon. `,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` greift in diesem Fall nicht mehr
(`,e.jsx(i.a,{href:"#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.7 behandelt die höheren Ableitungen und die Hesse-Matrix; die
Fisher-Information und die Cramér-Rao-Schranke stehen in jedem Lehrbuch zur
mathematischen Statistik, etwa bei Casella und Berger, Statistical Inference, Kapitel 7.`})})]})}function Os(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(gt,{...r})}):gt(r)}const nr=P.blau,ir=P.gruen,jt=P.rot,rr=-3,tr=3,Us=-5,Cs=20,ge=(r,i=4)=>u(r,i);function br(r){return i=>{let t=0,l=1;for(let s=0;s<=r;s++)s>0&&(l*=s),t+=i**s/l;return t}}function mt(r,i,t){const l=br(r);let s=0;for(let c=0;c<=400;c++){const h=i+(t-i)*c/400;s=Math.max(s,Math.abs(Math.exp(h)-l(h)))}return s}function Qs(){const[r,i]=E.useState(1),[t,l]=E.useState(.5),s=br(r),c=Math.exp(t),h=s(t),x=Math.abs(c-h),d=r>0?Math.abs(c-br(r-1)(t)):NaN,f=x>0?d/x:NaN,j=mt(r,-1,1),D=mt(r,rr,tr);let a="neutral",A;if(r===0)a="neutral",A="Die Ordnung 0 ist der Extremfall: T₀ ist die konstante Funktion 1, also der Funktionswert im Entwicklungspunkt selbst. Sie trifft e^x nur in x = 0 und sagt über die Steigung nichts aus. Ein Schritt am Ordnungsregler bringt die Tangente ins Spiel.";else if(Math.abs(t)<1e-9)a="neutral",A="Im Entwicklungspunkt selbst stimmen alle Ordnungen überein: T_k(0) = 1 = e⁰, der Fehler ist null. Interessant wird es erst daneben, verschieben wir also den Regler für die Auswertungsstelle.";else if(x<1e-14)a="ok",A=`Bei dieser Ordnung ist der Abstand an der Stelle x = ${ge(t,2)} unter die Rechengenauigkeit gefallen; die Tafel zeigt zwei Kurven, die Maschine sieht nur noch eine. Weiter draußen, etwa bei x = 3, bleibt trotzdem ein Fehler von ${ge(D,5)} stehen.`;else{const z=x<.01,p=Math.abs(t)/(r+1),R=1/f,M=R>1,F=Math.abs(R-p)<=.25*p;a=M?"warn":"ok";const _=M?`der Schritt auf die Ordnung ${r} hat ihn also nicht gedrückt, sondern auf das ${ge(R,3)}-fache wachsen lassen`:`der Schritt auf die Ordnung ${r} hat ihn also auf ein ${ge(R,3)}-faches gedrückt`,y=F?`Das passt zum Faustwert |x|/(k+1) = ${ge(p,3)}.`:`Der Faustwert |x|/(k+1) = ${ge(p,3)} trifft das nicht: Er beschreibt das Verhalten für kleine |x|, hier sind wir dafür zu weit vom Entwicklungspunkt entfernt.`;A=`Bei x = ${ge(t,2)} lässt T_${r} den Fehler ${ge(x,5)} übrig, die Ordnung davor ${ge(d,5)}; ${_}. ${y} ${z?"Auf dieser Skala liegen blaue und grüne Kurve schon aufeinander.":"Blau und Grün trennen sich hier noch sichtbar."} Die Herkunft des Faktors steht im Beweis zu ${V("satz:taylorentwicklung-i")}: Das Restglied ist e^ξ·x^(k+1)/(k+1)! mit einem ξ zwischen 0 und x. Solange |x| klein gegen k+1 ist, schrumpft es mit jeder Ordnung, sonst gewinnt zunächst die Potenz. Bei |x| ≤ 1 bleibt der größte Fehler hier bei höchstens ${ge(j,4)}, auf dem ganzen Fenster liegt er bei ${ge(D,3)}.`}return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Schieben wir die Ordnung k von 1 aufwärts und lesen den Fehler erst bei x = 0,5 ab, dann bei x = −3."}),e.jsx(I,{label:"k (Ordnung)",value:r,onChange:z=>i(Math.round(z)),min:0,max:8,step:1,fmt:z=>z.toFixed(0)}),e.jsx(I,{label:"x (Auswertungsstelle)",value:t,onChange:z=>l(Math.round(z*20)/20),min:rr,max:tr,step:.05,fmt:z=>ge(z,2)}),e.jsx(At,{xLabel:"x",yLabel:"y",series:[{f:Math.exp,color:nr,label:"f(x) = e^x"},{f:s,color:ir,dash:[6,4],label:`T_${r}`}],ariaLabel:`Die Exponentialfunktion in Blau und ihr Taylorpolynom der Ordnung ${r} in Grün; an der Stelle x = ${ge(t,2)} beträgt der Abstand ${ge(x,5)}.`,readout:!0,markers:[{x:t,y:c,color:nr},{x:t,y:h,color:ir}],xDomain:[rr,tr],yDomain:[Us,Cs]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:nr},children:["f(x) = e^x = ",ge(c,5)]}),e.jsxs("div",{style:{color:ir},children:["T_",r,"(x) = ",ge(h,5)]}),e.jsxs("div",{style:{color:jt},children:["|f(x) − T_",r,"(x)| = ",ge(x,5)]}),e.jsxs("div",{style:{color:jt},children:["größter Fehler auf [−1, 1] = ",ge(j,5),", auf [−3, 3] = ",ge(D,3)]})]}),e.jsx(ve,{kind:a,children:A})]})}function Ys(){return e.jsx(Ce,{frage:"An der Stelle x = 0,5: Um welchen Faktor ist T₃ genauer als T₂?",variante:"auswahl",loesung:"acht",optionen:[{id:"zwei",text:"Faktor 2"},{id:"fuenf",text:"Faktor 5"},{id:"acht",text:"Faktor 8"}],verdeckt:e.jsxs("p",{className:"max-w-prose text-sm",children:["Gemessen sind es 8,2: Der Fehler fällt von 0,023721 auf 0,002888. Der Faustwert dahinter ist |x|/(k+1) = 0,5/3 = 0,167, also ein Sechstel, und dass es etwas besser läuft, liegt am Restglied aus ",V("satz:taylorentwicklung-i"),", in dem zusätzlich e^ξ mit ξ zwischen 0 und x steht."]}),children:e.jsx(Qs,{})})}function gr(r,i,t,l){const s=[],c=[];for(let f=0;f<=l;f++)s.push(i[0]+(i[1]-i[0])*f/l),c.push(t[0]+(t[1]-t[0])*f/l);const h=[];let x=1/0,d=-1/0;for(let f=0;f<=l;f++){const j=[];for(let D=0;D<=l;D++){const a=r(s[f],c[D]);j.push(a),Number.isFinite(a)&&(a<x&&(x=a),a>d&&(d=a))}h.push(j)}return{x:s,y:c,v:h,min:x,max:d}}function ft(r,i,t){const l=[];for(let s=0;s<3;s++){const c=r[s],h=r[(s+1)%3];if(!Number.isFinite(c[2])||!Number.isFinite(h[2]))return;const x=c[2]-i,d=h[2]-i;if(x<=0&&d>0||x>0&&d<=0){const f=x/(x-d);l.push([c[0]+f*(h[0]-c[0]),c[1]+f*(h[1]-c[1])])}}l.length===2&&t.push({x1:l[0][0],y1:l[0][1],x2:l[1][0],y2:l[1][1]})}function jr(r,i){const t=[];for(let l=0;l+1<r.x.length;l++)for(let s=0;s+1<r.y.length;s++){const c=[r.x[l],r.y[s],r.v[l][s]],h=[r.x[l+1],r.y[s],r.v[l+1][s]],x=[r.x[l+1],r.y[s+1],r.v[l+1][s+1]],d=[r.x[l],r.y[s+1],r.v[l][s+1]];ft([c,h,x],i,t),ft([c,x,d],i,t)}return t}function Nt(r,i,t){if(!Number.isFinite(r)||!Number.isFinite(i)||i<=r)return[];const l=[];for(let s=1;s<=t;s++)l.push(r+(i-r)*s/(t+1));return l}const pi=P.blau,ki=P.gruen,sr=P.rot,nn=P.orange,lr=[{id:"sincos",label:"sin(x₁) + cos(x₂)",f:(r,i)=>Math.sin(r)+Math.cos(i),grad:(r,i)=>[Math.cos(r),-Math.sin(i)],hess:(r,i)=>[[-Math.sin(r),0],[0,-Math.cos(i)]],quadratisch:!1},{id:"glocke",label:"exp(−‖x‖²/2)",f:(r,i)=>Math.exp(-(r*r+i*i)/2),grad:(r,i)=>{const t=Math.exp(-(r*r+i*i)/2);return[-r*t,-i*t]},hess:(r,i)=>{const t=Math.exp(-(r*r+i*i)/2);return[[(r*r-1)*t,r*i*t],[r*i*t,(i*i-1)*t]]},quadratisch:!1},{id:"quadrik",label:"2x₁² + 2x₁x₂ + 3x₂² − 4x₁ − 6x₂",f:(r,i)=>2*r*r+2*r*i+3*i*i-4*r-6*i,grad:(r,i)=>[4*r+2*i-4,2*r+6*i-6],hess:()=>[[4,2],[2,6]],quadratisch:!0}],Z=[-2.5,2.5],pt=44,el=8,pn=30,Se=230,Je=26,nl=16,il=6,wi=-2,vi=2,Q=(r,i=3)=>u(r,i),Ke=r=>Je+(r-Z[0])/(Z[1]-Z[0])*Se,Te=r=>(Z[1]-r)/(Z[1]-Z[0])*Se,yi=Be(Z[0],Z[1]),kt=yi.length>1?yi[1]-yi[0]:void 0;function wt({titel:r,ariaLabel:i,children:t,svgProps:l}){return e.jsxs("div",{className:`select-none text-[10px] ${Y}`,children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:Je},children:r}),e.jsxs("svg",{viewBox:`0 0 ${Je+Se+il} ${Se+nl}`,role:"img","aria-label":i,...l,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[yi.map(s=>e.jsxs("g",{children:[e.jsx("line",{x1:Je,x2:Je+Se,y1:Te(s),y2:Te(s),stroke:"var(--w-grid)",strokeWidth:.6}),e.jsx("line",{y1:0,y2:Se,x1:Ke(s),x2:Ke(s),stroke:"var(--w-grid)",strokeWidth:.6}),e.jsx("text",{x:Je-3,y:Te(s)+3,textAnchor:"end",fill:"var(--w-text)",fontSize:9,children:De(s,kt)}),e.jsx("text",{x:Ke(s),y:Se+11,textAnchor:"middle",fill:"var(--w-text)",fontSize:9,children:De(s,kt)})]},`t${s}`)),e.jsx("line",{x1:Je,x2:Je+Se,y1:Te(0),y2:Te(0),stroke:"var(--w-axis)",strokeWidth:1}),e.jsx("line",{y1:0,y2:Se,x1:Ke(0),x2:Ke(0),stroke:"var(--w-axis)",strokeWidth:1}),t]})]})}function rl(r){return r.map(i=>`M${Ke(i.x1).toFixed(1)},${Te(i.y1).toFixed(1)}L${Ke(i.x2).toFixed(1)},${Te(i.y2).toFixed(1)}`).join("")}function vt({segmente:r,farbe:i,gestrichelt:t}){return e.jsx("path",{d:rl(r),fill:"none",stroke:i,strokeWidth:1.4,strokeDasharray:t?"5 4":void 0})}function tl(){const[r,i]=E.useState("sincos"),[t,l]=E.useState(1),[s,c]=E.useState(.75),[h,x]=E.useState(-1.25),[d,f]=E.useState(.8),[j,D]=E.useState({azimuth:38,elevation:26}),a=lr.find(L=>L.id===r)??lr[0],{f0:A,g:z,H:p}=E.useMemo(()=>({f0:a.f(s,h),g:a.grad(s,h),H:a.hess(s,h)}),[a,s,h]),R=E.useMemo(()=>(L,J)=>{const ee=L-s,ne=J-h;let de=A+z[0]*ee+z[1]*ne;return t===2&&(de+=.5*(ee*(p[0][0]*ee+p[0][1]*ne)+ne*(p[1][0]*ee+p[1][1]*ne))),de},[t,s,h,A,z,p]),{linienF:M,linienT:F,fehlerGitter:_,maxFehlerFenster:y,fMin:g,fMax:m}=E.useMemo(()=>{const L=gr(a.f,Z,Z,pt),J=gr(R,Z,Z,pt),ee=Nt(L.min,L.max,el),ne=[],de=[];for(const W of ee)ne.push(...jr(L,W)),de.push(...jr(J,W));const je=[];let Ee=0;for(let W=0;W<pn;W++){const re=[];for(let Ge=0;Ge<pn;Ge++){const $e=Z[0]+(Z[1]-Z[0])*(W+.5)/pn,ye=Z[0]+(Z[1]-Z[0])*(Ge+.5)/pn,Ie=Math.abs(a.f($e,ye)-R($e,ye));re.push(Ie),Ie>Ee&&(Ee=Ie)}je.push(re)}return{linienF:ne,linienT:de,fehlerGitter:je,maxFehlerFenster:Ee,fMin:L.min,fMax:L.max}},[a,R]),b=L=>{let J=0;for(let ee=0;ee<360;ee++){const ne=2*Math.PI*ee/360,de=s+L*Math.cos(ne),je=h+L*Math.sin(ne);J=Math.max(J,Math.abs(a.f(de,je)-R(de,je)))}return J},N=b(d),S=b(d/2),w=S>1e-13?N/S:NaN,B=y>1e-9,k=p[0][0]*p[1][1]-p[0][1]*p[1][0],K=p[0][0]+p[1][1],O=k>1e-9&&K>0?"positiv definit":k>1e-9&&K<0?"negativ definit":k<-1e-9?"indefinit":"singulär",X=O==="positiv definit"||O==="negativ definit"?"Ellipsen":O==="indefinit"?"Hyperbeln":"Parallelen oder Parabeln",le=qn({feld:{x0:Je,y0:0,w:Se,h:Se},welt:{x0:Z[0],x1:Z[1],y0:Z[0],y1:Z[1]},snap:.05,greifPosition:()=>[s,h],clamp:([L,J])=>[Ue(L,wi,vi),Ue(J,wi,vi)],onDrag:([L,J])=>{c(L),x(J)}}),[U,ae]=E.useMemo(()=>{let L=g,J=m;for(let ee=0;ee<60;ee++){const ne=2*Math.PI*ee/60,de=R(s+d*Math.cos(ne),h+d*Math.sin(ne));L=Math.min(L,de),J=Math.max(J,de)}return J-L<1e-9?[L-1,J+1]:[L,J]},[g,m,R,s,h,d]),Ae=E.useMemo(()=>({f:a.f,nx:26,ny:26,color:pi,opacity:.8,wire:!0}),[a]),Qe=E.useMemo(()=>[{p:[s,h,A],color:nn,r:4,label:"x",onTop:!0}],[s,h,A]),Ze=(L,J)=>{const ee=[];for(let ne=0;ne<=72;ne++){const de=2*Math.PI*ne/72,je=s+J*Math.cos(de),Ee=h+J*Math.sin(de);ee.push([je,Ee,L(je,Ee)])}return ee},H=E.useMemo(()=>{const L=[{pts:Ze(a.f,d),color:pi,width:2},{pts:Ze(R,d),color:ki,width:2,dash:"5 4"}],J=4;for(let ee=0;ee<J;ee++){const ne=Math.PI*ee/J,de=s-1.15*d*Math.cos(ne),je=h-1.15*d*Math.sin(ne),Ee=s+1.15*d*Math.cos(ne),W=h+1.15*d*Math.sin(ne);L.push({pts:Array.from({length:21},(re,Ge)=>{const $e=Ge/20,ye=de+$e*(Ee-de),Ie=je+$e*(W-je);return[ye,Ie,R(ye,Ie)]}),color:ki,width:1})}return t===2&&L.push({pts:Ze(R,d/2),color:ki,width:1}),L},[a,R,d,s,h,t]);let oe="neutral",Re;if(a.quadratisch&&t===2)oe="ok",Re=`Auf dieser Quadrik ist T₂ nicht bloß eine Näherung, sondern f selbst: Die Hesse-Matrix ist konstant, alle Ableitungen ab der dritten verschwinden, und das Restglied aus ${V("korollar:taylorapproximation-fuer-vektor-zu")} ist null. Grüne und blaue Höhenlinien decken sich, die rechte Tafel bleibt weiß, die beiden Ringe in der Raumtafel liegen aufeinander, und der gemessene Fehler von ${N.toExponential(1).replace(".",",")} auf dem Kreis ist reines Rundungsrauschen. Auf genau dieser Beobachtung beruht der eine exakte Newton-Schritt weiter unten.`;else if(a.quadratisch)oe="neutral",Re=`Die Tangentialebene lässt hier den vollständigen quadratischen Anteil stehen: Der Fehler ist exakt ½h⊤H h mit konstantem H, deshalb steht beim Halbieren des Radius der Quotient ${Q(w,2)} und nicht bloß „ungefähr 4". Ein Umschalten auf T₂ drückt ihn auf null.`;else{const L=t===1?4:8,J=Number.isFinite(w)&&Math.abs(w-L)<=.25*L;oe=J?"ok":"warn";const ee=J?`Das ist die Größenordnung, die ${V("korollar:taylorapproximation-fuer-vektor-zu")} nahelegt.`:w>L?`Das liegt deutlich über den ${L}, die ${V("korollar:taylorapproximation-fuer-vektor-zu")} nahelegt: An dieser Stelle ist der führende Restterm fast null, sodass schon die nächste Ordnung den Fehler bestimmt, und dann steht dort das Doppelte.`:`Das liegt unter den ${L} aus ${V("korollar:taylorapproximation-fuer-vektor-zu")}, weil der Radius für die Aussage noch zu groß ist; sie beschreibt das Verhalten für kleine ‖h‖. Ein Stück am Radiusregler nach unten, und der Quotient rückt an den Vorhersagewert heran.`;Re=`Am Entwicklungspunkt (${Q(s,2)}; ${Q(h,2)}) ist die Hesse-Matrix ${O}, die Höhenlinien von T₂ sind dort also ${X}. Auf dem Kreis mit Radius ${Q(d,2)} weicht T${t===1?"₁":"₂"} um höchstens ${Q(N,4)} von f ab, auf dem halb so großen Kreis um ${Q(S,5)}; das ist ein Quotient von ${Q(w,2)}. ${ee} Der Fehler von T₁ ist o(‖h‖) und wächst in aller Regel wie ‖h‖², beim Halbieren fällt er also auf ein Viertel, der von T₂ wächst wie ‖h‖³ und fällt auf ein Achtel. In der Raumtafel ist dieser Fehler der senkrechte Abstand zwischen dem blauen und dem grünen Ring.`}const Xn=e.jsxs("g",{children:[e.jsx("circle",{cx:Ke(s),cy:Te(h),r:d/(Z[1]-Z[0])*Se,fill:"none",stroke:nn,strokeWidth:1.2,strokeDasharray:"4 3"}),e.jsx("circle",{cx:Ke(s),cy:Te(h),r:4,fill:nn})]});return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Ziehen wir den orangen Entwicklungspunkt in der linken Tafel und halbieren danach den Messradius."}),e.jsx("p",{className:`max-w-prose text-xs ${Y}`,children:"Blau: f und seine Höhenlinien. Grün gestrichelt: die Höhenlinien des Taylorpolynoms, in der Raumtafel dessen Ebene beziehungsweise Paraboloid. Orange: der Entwicklungspunkt und der Kreis, auf dem wir messen. Rot: der Betrag des Fehlers."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:lr.map(L=>e.jsx("button",{type:"button","aria-pressed":L.id===r,className:L.id===r?pe:ie,onClick:()=>i(L.id),children:L.label},L.id))}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("button",{type:"button","aria-pressed":t===1,className:t===1?pe:ie,onClick:()=>l(1),children:"T₁ (Tangentialebene)"}),e.jsx("button",{type:"button","aria-pressed":t===2,className:t===2?pe:ie,onClick:()=>l(2),children:"T₂ (Quadrik)"}),e.jsx("button",{type:"button",className:ie,onClick:()=>f(L=>Math.max(.1,Math.round(L/2*100)/100)),children:"r halbieren"})]}),e.jsx(I,{label:"x₁ (Entwicklungspunkt)",value:s,onChange:L=>c(Math.round(L*20)/20),min:wi,max:vi,step:.05,accent:nn,fmt:L=>Q(L,2)}),e.jsx(I,{label:"x₂ (Entwicklungspunkt)",value:h,onChange:L=>x(Math.round(L*20)/20),min:wi,max:vi,step:.05,accent:nn,fmt:L=>Q(L,2)}),e.jsx(I,{label:"r (Messradius)",value:d,onChange:L=>f(Math.round(L*100)/100),min:.1,max:1.4,step:.05,accent:nn,fmt:L=>Q(L,2)}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx(wt,{titel:"Höhenlinien: f blau, T grün",ariaLabel:`Höhenlinien von f in Blau und des Taylorpolynoms der Ordnung ${t} in Grün, mit dem Entwicklungspunkt bei (${Q(s,2)}; ${Q(h,2)}) und dem Messkreis vom Radius ${Q(d,2)}.`,svgProps:le.svgProps,children:e.jsxs(e.Fragment,{children:[e.jsx(vt,{segmente:M,farbe:pi}),e.jsx(vt,{segmente:F,farbe:ki,gestrichelt:!0}),Xn,e.jsx(Bt,{x:Ke(s),y:Te(h),farbe:nn,aktiv:le.dragging==="p",...le.handleProps("p")})]})}),e.jsxs("div",{children:[e.jsx(mr,{size:280,xDomain:Z,yDomain:Z,zDomain:[U,ae],surface:Ae,points:Qe,curves:H,labels:{x:"x₁",y:"x₂",z:"f"},azimuth:j.azimuth,elevation:j.elevation,onViewChange:D,ariaLabel:`Die Fläche von f über der x₁-x₂-Ebene, dazu ${t===1?"die Tangentialebene":"das Tangentialparaboloid"} im Entwicklungspunkt und die beiden Messringe.`}),e.jsx("div",{className:"mt-1 max-w-[280px]",children:e.jsx(fr,{value:j,onChange:D})}),e.jsxs("p",{className:`mt-1 max-w-[280px] text-xs ${Y}`,children:["Dieselbe Lage im Raum: blau die Fläche von f, grün"," ",t===1?"die Tangentialebene T₁":"das Tangentialparaboloid T₂"," im orangen Entwicklungspunkt. Der senkrechte Abstand der beiden Ringe ist der Fehler, den wir messen. Ziehen dreht die Ansicht."]})]}),e.jsx(wt,{titel:"|f − T|, dunkel = groß",ariaLabel:`Der Betrag des Fehlers zwischen f und dem Taylorpolynom als Schattierung; der größte Wert im Fenster ist ${Q(y,3)}.`,children:e.jsxs(e.Fragment,{children:[!B&&e.jsx("text",{x:Je+Se/2,y:Se/2,textAnchor:"middle",fill:"var(--w-muted)",fontSize:11,children:"Fehler numerisch null"}),B&&_.map((L,J)=>L.map((ee,ne)=>{const de=Math.min(1,ee/y);if(de<.02)return null;const je=Z[0]+(Z[1]-Z[0])*J/pn,Ee=Z[0]+(Z[1]-Z[0])*(ne+1)/pn;return e.jsx("rect",{x:Ke(je),y:Te(Ee),width:Se/pn+.6,height:Se/pn+.6,fill:sr,opacity:de},`${J}-${ne}`)})),Xn]})})]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:pi},children:["f(x) = ",Q(A,4)," an der Stelle (",Q(s,2),"; ",Q(h,2),")"]}),e.jsxs("div",{style:{color:nn},children:["∇f(x) = (",Q(z[0],4),", ",Q(z[1],4),")"]}),e.jsxs("div",{style:{color:nn},children:["H_f(x) = (",Q(p[0][0],3),", ",Q(p[0][1],3),"; ",Q(p[1][0],3),", ",Q(p[1][1],3),"), det ="," ",Q(k,3)]}),e.jsxs("div",{style:{color:sr},children:["max |f − T| auf dem Kreis: r = ",Q(d,2)," → ",Q(N,5),", r/2 → ",Q(S,5),", Quotient"," ",Number.isNaN(w)?"numerisch null":Q(w,2)]}),e.jsxs("div",{style:{color:sr},children:["größter Fehler im ganzen Fenster = ",Q(y,3)]})]}),e.jsx(ve,{kind:oe,children:Re})]})}function sl(){return e.jsx(Ce,{frage:"Wir halbieren den Messradius um den Entwicklungspunkt. Um welchen Faktor fällt der Fehler der Tangentialebene T₁?",variante:"auswahl",loesung:"vier",optionen:[{id:"zwei",text:"Faktor 2"},{id:"vier",text:"Faktor 4"},{id:"acht",text:"Faktor 8"}],verdeckt:e.jsxs("p",{className:"max-w-prose text-sm",children:["Gemessen sind es 4,34 in der Voreinstellung: Der Fehler fällt von 0,2672 auf 0,0616. Für T₂ steht an derselben Stelle 8,07. Der Grund steht in ",V("korollar:taylorapproximation-fuer-vektor-zu"),": Der Restterm von T₁ wächst wie ‖h‖², der von T₂ wie ‖h‖³."]}),children:e.jsx(tl,{})})}const zt=P.blau,ll=P.gruen,_t=P.rot,zi=P.orange,ar=[{id:"kubisch",label:"x₁³/3 − x₁ + x₂²/2",f:(r,i)=>r*r*r/3-r+i*i/2,grad:(r,i)=>[r*r-1,i],hess:r=>[[2*r,0],[0,1]],quadratisch:!1,ziel:r=>r>0?[1,0]:r<0?[-1,0]:null},{id:"quadrik",label:"2x₁² + 2x₁x₂ + 3x₂² − 4x₁ − 6x₂",f:(r,i)=>2*r*r+2*r*i+3*i*i-4*r-6*i,grad:(r,i)=>[4*r+2*i-4,2*r+6*i-6],hess:()=>[[4,2],[2,6]],quadratisch:!0,ziel:()=>[.6,.8]}],Oe=[-2.5,2.5],al=44,dl=9,an=250,ln=26,hl=16,cl=6,ze=(r,i=3)=>u(r,i);function kn(r){return Number.isNaN(r)?"–":Number.isFinite(r)?r===0?"0":r<.001?r.toExponential(2).replace(".",","):r.toFixed(6).replace(".",","):"∞"}const Pe=r=>ln+(r-Oe[0])/(Oe[1]-Oe[0])*an,He=r=>(Oe[1]-r)/(Oe[1]-Oe[0])*an;function xl(r){return r.map(i=>`M${Pe(i.x1).toFixed(1)},${He(i.y1).toFixed(1)}L${Pe(i.x2).toFixed(1)},${He(i.y2).toFixed(1)}`).join("")}function ol(){const[r,i]=E.useState("kubisch"),[t,l]=E.useState(2),[s,c]=E.useState(1.5),[h,x]=E.useState(0),d=ar.find(b=>b.id===r)??ar[0],f=E.useMemo(()=>d.ziel(t),[d,t]),j=E.useMemo(()=>{const b=[];let N=[t,s];for(let S=0;S<=cl;S++){const w=d.grad(N[0],N[1]),B=d.hess(N[0],N[1]),k=B[0][0]*B[1][1]-B[0][1]*B[1][0];if(b.push({x:N,gradNorm:Math.hypot(w[0],w[1]),fehler:f?Math.hypot(N[0]-f[0],N[1]-f[1]):NaN,detH:k,singulaer:Math.abs(k)<1e-12}),Math.abs(k)<1e-12)break;const K=[[B[1][1]/k,-B[0][1]/k],[-B[1][0]/k,B[0][0]/k]];N=[N[0]-(K[0][0]*w[0]+K[0][1]*w[1]),N[1]-(K[1][0]*w[0]+K[1][1]*w[1])]}return b},[d,t,s,f]),D=j.slice(0,Math.min(h+1,j.length)),a=D[D.length-1],A=d.hess(a.x[0],a.x[1]),z=A[0][0]+A[1][1],p=a.detH>1e-9&&z>0?"positiv definit":a.detH>1e-9&&z<0?"negativ definit":a.detH<-1e-9?"indefinit":"singulär",R=E.useMemo(()=>{const b=gr(d.f,Oe,Oe,al),N=Nt(b.min,b.max,dl),S=[];for(const w of N)S.push(...jr(b,w));return S},[d]),M=Be(Oe[0],Oe[1]),F=M.length>1?M[1]-M[0]:void 0,_=D.length-1,y=_===0?`Ausgangslage: x₀ = (${ze(a.x[0],3)}; ${ze(a.x[1],3)}), ‖∇f‖ = ${kn(a.gradNorm)}.`:`Schritt ${_}: x_${_} = (${ze(a.x[0],6)}; ${ze(a.x[1],6)}), ‖∇f‖ = ${kn(a.gradNorm)}, Abstand zum Ziel ${kn(a.fehler)}.`;let g="neutral",m;if(a.singulaer)g="warn",m=`Bei x₁ = 0 ist die Hesse-Matrix diag(0, 1) und damit nicht invertierbar: Der Newton-Schritt aus ${V("algorithmus:newton-raphson-verfahren")} verlangt H⁻¹ und ist hier gar nicht definiert. Das Taylorpolynom T₂ entartet in dieser Richtung zu einer Geraden, die kein Minimum hat. Ein Stück am Startregler genügt, um wieder in den regulären Fall zu kommen.`;else if(d.quadratisch)g=h===0?"neutral":"ok",m=h===0?"Auf einer Quadrik stimmt T₂ mit f überein. Der erste Schritt minimiert also nicht eine Näherung, sondern f selbst, und muss deshalb exakt im Minimum landen. Ein Schritt am Regler genügt.":`Wie angekündigt: EIN Schritt, und der Gradient ist bis auf Rundungsfehler null (‖∇f‖ = ${kn(a.gradNorm)}). Weitere Schritte bewegen nichts mehr. Das Minimum liegt bei (0,6; 0,8) mit f = −3,6, und die Hesse-Matrix (4, 2; 2, 6) ist mit Determinante 20 und positiver Spur positiv definit, es ist also wirklich ein Minimum.`;else if(f&&f[0]<0)g="warn",m=`Der Start liegt links der Null, und die Iteration läuft gegen (−1; 0). Dort ist der Gradient null, die Hesse-Matrix diag(−2, 1) aber indefinit: ein Sattelpunkt. Newton sucht Nullstellen des Gradienten, also kritische Punkte, und unterscheidet Minimum, Maximum und Sattel nicht von selbst. Wer das Minimum will, muss die Definitheit prüfen (${V("bemerkung:drei-vorbehalte")}).`;else if(j[0].fehler===0)m="Der Startpunkt ist schon das Minimum (1; 0): Der Gradient ist null, der Newton-Schritt ändert nichts mehr, und die Fehlerspalte bleibt bei 0. Der Quotient eₖ/eₖ₋₁² ist hier 0/0 und deshalb leer. Ein Stück am Startregler, und die Iteration bekommt etwas zu tun.";else if(a.fehler===0)g="ok",m="Die Iteration ist am Ziel: Der Abstand zum Minimum (1; 0) ist auf null gefallen, weiter als bis zur Maschinengenauigkeit kommt keine Rechnung. Der Quotient eₖ/eₖ₋₁² in der letzten Zeile ist deshalb nicht mehr aussagekräftig; ablesen lässt sich die quadratische Konvergenz an den Zeilen davor, wo er gegen 1/(2·x₁*) = 0,5 läuft.";else if(h===0)m="Der Startpunkt liegt rechts der Null, das Ziel ist das Minimum (1; 0). Sehenswert ist der erste Schritt: In der x₂-Richtung ist f quadratisch, dort trifft Newton sofort exakt; in der x₁-Richtung braucht er mehrere Anläufe. Fahren wir den Regler Schritt für Schritt hoch und beobachten dabei die Fehlerspalte.";else{g=h===0?"neutral":"ok";const b=D.length-1,N=D[b-1],S=N.fehler>0?a.fehler/N.fehler**2:NaN,w=Math.abs(s)>1e-12?"In der ersten Zeile gilt das noch nicht, dort steckt im Fehler auch die x₂-Richtung, die Newton in einem Zug erledigt.":"In der ersten Zeile gilt das noch nicht, dort ist der Startpunkt für die quadratische Konvergenz einfach zu weit weg.";m=`Nach ${b} Schritt${b===1?"":"en"} ist der Abstand zum Minimum ${kn(a.fehler)}; im Schritt davor war er ${kn(N.fehler)}. Der Quotient eₖ/eₖ₋₁² steht bei ${ze(S,3)} und strebt gegen 1/(2·x₁*) = 0,5, der Fehler wird also in jedem Schritt im Wesentlichen quadriert. In der Tabelle heißt das: Die Zahl der gültigen Stellen verdoppelt sich pro Schritt, sobald wir nahe genug am Ziel sind. ${w}`}return e.jsxs("div",{className:"space-y-3",children:[e.jsx(we,{children:"Fahren wir den Schrittregler von 0 bis 6 durch und beobachten dabei die letzte Spalte der Tabelle."}),e.jsxs("p",{className:`max-w-prose text-xs ${Y}`,children:["Blau: die Höhenlinien von f. Orange: der Weg der Iterierten. Grün: der Punkt, den die Iteration ansteuert. Ein Schritt des Reglers ist genau eine Zeile von ",V("algorithmus:newton-raphson-verfahren"),"."]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:ar.map(b=>e.jsxs("button",{type:"button","aria-pressed":b.id===r,className:b.id===r?pe:ie,onClick:()=>{i(b.id),x(0)},children:["f(x) = ",b.label]},b.id))}),e.jsx(I,{label:"x₁ (Start)",value:t,onChange:b=>{l(Math.round(b*4)/4),x(0)},min:-2.25,max:2.25,step:.25,fmt:b=>ze(b,2)}),e.jsx(I,{label:"x₂ (Start)",value:s,onChange:b=>{c(Math.round(b*4)/4),x(0)},min:-2.25,max:2.25,step:.25,fmt:b=>ze(b,2)}),e.jsx(qi,{step:Math.min(h,j.length-1),setStep:x,max:j.length-1,narration:y}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:`select-none text-[10px] ${Y}`,children:[e.jsx("div",{className:"mb-0.5 text-[11px]",style:{paddingLeft:ln},children:"x₂ ↑"}),e.jsxs("svg",{viewBox:`0 0 ${ln+an+6} ${an+hl}`,role:"img","aria-label":`Höhenlinien von f mit dem Weg der Newton-Iterierten bis Schritt ${D.length-1}; das Ziel ist grün markiert.`,className:"h-auto max-w-full rounded border",style:{background:"var(--w-bg)",borderColor:"var(--w-border)"},children:[M.map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:ln,x2:ln+an,y1:He(b),y2:He(b),stroke:"var(--w-grid)",strokeWidth:.6}),e.jsx("line",{y1:0,y2:an,x1:Pe(b),x2:Pe(b),stroke:"var(--w-grid)",strokeWidth:.6}),e.jsx("text",{x:ln-3,y:He(b)+3,textAnchor:"end",fill:"var(--w-text)",fontSize:9,children:De(b,F)}),e.jsx("text",{x:Pe(b),y:an+11,textAnchor:"middle",fill:"var(--w-text)",fontSize:9,children:De(b,F)})]},`t${b}`)),e.jsx("line",{x1:ln,x2:ln+an,y1:He(0),y2:He(0),stroke:"var(--w-axis)",strokeWidth:1}),e.jsx("line",{y1:0,y2:an,x1:Pe(0),x2:Pe(0),stroke:"var(--w-axis)",strokeWidth:1}),e.jsx("path",{d:xl(R),fill:"none",stroke:zt,strokeWidth:1.3}),f&&e.jsx("circle",{cx:Pe(f[0]),cy:He(f[1]),r:5,fill:"none",stroke:ll,strokeWidth:2.4}),D.slice(1).map((b,N)=>e.jsx("line",{x1:Pe(D[N].x[0]),y1:He(D[N].x[1]),x2:Pe(b.x[0]),y2:He(b.x[1]),stroke:zi,strokeWidth:2},`w${N}`)),D.map((b,N)=>e.jsx("circle",{cx:Pe(b.x[0]),cy:He(b.x[1]),r:N===D.length-1?4.5:3,fill:zi},`p${N}`))]}),e.jsx("div",{className:"text-center text-[11px]",style:{paddingLeft:ln},children:"x₁ →"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 dark:border-slate-600",children:[e.jsx("th",{className:"px-2 text-right",children:"k"}),e.jsx("th",{className:"px-2 text-right",children:"x₁"}),e.jsx("th",{className:"px-2 text-right",children:"x₂"}),e.jsx("th",{className:"px-2 text-right",style:{color:zi},children:"‖∇f‖"}),e.jsx("th",{className:"px-2 text-right",style:{color:_t},children:"Fehler eₖ"}),e.jsx("th",{className:"px-2 text-right",style:{color:_t},children:"eₖ/eₖ₋₁²"})]})}),e.jsx("tbody",{className:"font-mono",children:D.map((b,N)=>{const S=N>0?D[N-1].fehler:NaN,w=N>0&&S>0?b.fehler/S**2:NaN;return e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"px-2 text-right",children:N}),e.jsx("td",{className:"px-2 text-right",children:ze(b.x[0],6)}),e.jsx("td",{className:"px-2 text-right",children:ze(b.x[1],6)}),e.jsx("td",{className:"px-2 text-right",children:kn(b.gradNorm)}),e.jsx("td",{className:"px-2 text-right",children:kn(b.fehler)}),e.jsx("td",{className:"px-2 text-right",children:Number.isNaN(w)?"":ze(w,3)})]},N)})})]})})]}),e.jsxs("div",{className:"max-w-prose font-mono text-sm",children:[e.jsxs("div",{style:{color:zi},children:["H_f in Zeile k = ",D.length-1,": (",ze(A[0][0],3),", ",ze(A[0][1],3),"; ",ze(A[1][0],3),","," ",ze(A[1][1],3),"), det = ",ze(a.detH,3)," → ",p]}),e.jsxs("div",{style:{color:zt},children:["f in Zeile k = ",D.length-1,": ",ze(d.f(a.x[0],a.x[1]),6)]})]}),e.jsx(ve,{kind:g,children:m})]})}function ul(){return e.jsx(Ce,{frage:"Vom Startpunkt (2; 1,5) aus: Nach wie vielen Newton-Schritten liegt der Abstand zum Minimum unter 10⁻¹⁰?",loesung:5,toleranz:0,einheit:"Schritte",fmt:r=>u(r,0),verdeckt:e.jsx("p",{className:"max-w-prose text-sm",children:"Nach fünf Schritten, und der letzte davon ist ein Sprung über sieben Größenordnungen: Der Abstand fällt von 4,6·10⁻⁸ auf 1,1·10⁻¹⁵. So sieht quadratische Konvergenz in Zahlen aus."}),children:e.jsx(ol,{})})}function St(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Vom linearen Blick zum Polynom"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),` hat die Ableitung als lineare Näherung
eingeführt: In der Nähe von `,e.jsx(n,{children:"\\bx"})," verhält sich ",e.jsx(n,{children:"f"}),` wie eine lineare Abbildung, und
der Fehler ist `,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),`. Diese Näherung ist billig und oft
gut genug, aber sie ist eben nur die erste Stufe. Mit den höheren Ableitungen aus
`,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"}),` haben wir jetzt das Material, um weiterzubauen: eine
quadratische Näherung, eine kubische, und so fort. Das Ergebnis heißt
`,e.jsx(v,{id:"taylor-theorem",children:"Taylorapproximation"}),`, und sie ist eines der meistbenutzten
Werkzeuge des ganzen Skripts.`]}),`
`,e.jsxs(i.p,{children:[`Zwei Verwendungen laufen durch dieses Skript. Erstens rechnen wir mit dem
`,e.jsx(v,{id:"polynomial",children:"Polynom"})," statt mit ",e.jsx(n,{children:"f"}),`, weil sich seine Ableitungen und kritischen
Punkte leichter bestimmen lassen, ohne dass wir über `,e.jsx(n,{children:"f"}),` mehr wissen müssen als ein paar
Ableitungen an einer einzigen Stelle. Der Newton-Schritt am Ende dieses Abschnitts
macht davon Gebrauch: Bestimmt wird der stationäre Punkt der quadratischen Näherung;
bei positiver Hesse-Matrix ist er deren Minimum. Zweitens sind Taylorentwicklungen
das Standardwerkzeug der Konvergenz-
und Asymptotikanalyse.
Die asymptotische Normalität des Maximum-Likelihood-Schätzers etwa entsteht, indem
wir die Score-Funktion um den wahren Parameter entwickeln; wir kommen in
`,e.jsx(i.a,{href:"#env-warum-statistik-und-ml-voll-davon-sind",children:"Bemerkung 10.8.13"})," darauf zurück."]}),`
`,e.jsxs(i.p,{children:[`Der Farbcode des Kapitels bleibt: blau die Funktion und ihre Werte, grün die
Näherung `,e.jsx(n,{children:"\\cgreen{T_k}"})," und die abstrakten Ableitungen ",e.jsx(n,{children:"\\cgreen{D^j_{\\bx} f}"}),`, rot
der Restterm. Gradient, Hesse-Matrix und die übrigen konkreten Ableitungsobjekte
tragen das Orange aus `,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"}),`, in den Formeln wie in den
Widgets.`]}),`
`,e.jsx(i.h3,{children:"Der eindimensionale Fall"}),`
`,e.jsxs(i.p,{children:[`Fangen wir dort an, wo sich alles nachrechnen lässt. Gesucht ist ein Polynom, das
sich an einer Stelle `,e.jsx(n,{children:"x"})," an ",e.jsx(n,{children:"f"}),` anschmiegt, und zwar so eng wie möglich. Die
Bedingung „so eng wie möglich" lässt sich präzise fassen: Das Polynom soll in `,e.jsx(n,{children:"x"}),`
denselben Wert, dieselbe Steigung, dieselbe Krümmung und so weiter haben wie `,e.jsx(n,{children:"f"}),"."]}),`
`,e.jsxs(q,{kind:"Definition",label:"10.8.1 (Taylorpolynom)",id:"env-taylorpolynom",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R"})," offen und ",e.jsx(n,{children:"f\\colon S \\to \\R"})," an der Stelle ",e.jsx(n,{children:"x \\in S"}),`
`,e.jsx(n,{children:"k"}),"-mal differenzierbar. Das Polynom"]}),e.jsx(T,{tag:"10.8.1",id:"eq-taylorpolynom",children:`\\cgreen{T_k(h)} := \\sum_{j = 0}^{k} \\frac{1}{j!}\\,\\cgreen{f^{(j)}(x)}\\,h^j
= \\cblue{f(x)} + \\cgreen{f'(x)}h + \\frac{1}{2}\\cgreen{f''(x)}h^2 + \\dots
+ \\frac{1}{k!}\\cgreen{f^{(k)}(x)}h^k`}),e.jsxs(i.p,{children:["heißt ",e.jsxs(i.em,{children:["Taylorpolynom der Ordnung ",e.jsx(n,{children:"k"})]})," von ",e.jsx(n,{children:"f"})," im ",e.jsx(i.em,{children:"Entwicklungspunkt"})," ",e.jsx(n,{children:"x"}),`. Sein
Grad ist höchstens `,e.jsx(n,{children:"k"}),` und kann kleiner sein, wenn die höchsten Koeffizienten
verschwinden.`]})]}),`
`,e.jsxs(i.p,{children:["Wir lesen ",e.jsx(n,{children:"\\cgreen{T_k}"})," als Funktion des Zuwachses ",e.jsx(n,{children:"h"}),` bei festgehaltenem
Entwicklungspunkt, ganz wie die lineare Abbildung `,e.jsx(n,{children:"\\cgreen{D_x f}"}),` aus
`,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),". Der Ausdruck rechts hängt vom Zuwachs ",e.jsx(n,{children:"h"})," ab und nicht von ",e.jsx(n,{children:"x"}),`
allein; `,e.jsx(i.a,{href:"#env-die-zweite-schreibweise",children:"Bemerkung 10.8.4"})," stellt die gebräuchliche zweite Schreibweise daneben."]}),`
`,e.jsxs(i.p,{children:["Die Anschmiegebedingung steckt bereits in ",e.jsx(i.a,{href:"#eq-taylorpolynom",children:"(10.8.1)"}),`: Leiten wir das Polynom
`,e.jsx(n,{children:"j"}),"-mal nach ",e.jsx(n,{children:"h"})," ab und setzen ",e.jsx(n,{children:"h = 0"}),", so überlebt genau der ",e.jsx(n,{children:"j"}),`-te Summand, und
es bleibt `,e.jsx(n,{children:"\\cgreen{f^{(j)}(x)}"})," stehen. Für ",e.jsx(n,{children:"k = 1"}),` steht dort die Tangente aus
`,e.jsx(i.a,{href:"#sec-10.1",children:"Abschnitt 10.1"}),", für ",e.jsx(n,{children:"k = 0"})," die Konstante ",e.jsx(n,{children:"\\cblue{f(x)}"}),"."]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.8.2 (Taylorentwicklung I)",id:"env-taylorentwicklung-i",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"S \\subseteq \\R"})," offen und ",e.jsx(n,{children:"f\\colon S \\to \\R"})," ",e.jsx(n,{children:"(k+1)"}),`-mal stetig
differenzierbar. Dann gilt für `,e.jsx(n,{children:"x \\in S"})," und ",e.jsx(n,{children:"h \\to 0"})]}),e.jsx(T,{tag:"10.8.2",id:"eq-taylorentwicklung-i",children:`\\cblue{f(x + h)} = \\cblue{f(x)} + \\sum_{j = 1}^{k} \\frac{1}{j!}\\,\\cgreen{f^{(j)}(x)}\\,h^j
+ \\cred{o\\bigl(\\left|h\\right|^k\\bigr)} .`}),e.jsxs(i.p,{children:["Genauer gibt es zu jedem hinreichend kleinen ",e.jsx(n,{children:"h \\neq 0"}),` eine Zwischenstelle
`,e.jsx(n,{children:"\\xi"})," strikt zwischen ",e.jsx(n,{children:"x"})," und ",e.jsx(n,{children:"x+h"})," mit"]}),e.jsx(T,{tag:"10.8.3",id:"eq-taylorentwicklung-i-2",children:"\\cblue{f(x+h)} - \\cgreen{T_k(h)} = \\cred{\\frac{f^{(k+1)}(\\xi)}{(k+1)!}\\,h^{k+1}} ."})]}),`
`,e.jsx(xe,{title:"Der Beweis: zwei Hilfsfunktionen, eine Teleskopsumme, der Cauchy-Mittelwertsatz",children:e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["In ",e.jsx(n,{children:"F"})," ist der ",e.jsx(i.em,{children:"Entwicklungspunkt"})," die Variable und ",e.jsx(n,{children:"x+h"})," fest; genau umgekehrt zu ",e.jsx(i.a,{href:"#eq-taylorpolynom",children:"(10.8.1)"}),". Stünde hier durchgehend ",e.jsx(n,{children:"f^{(j)}(x)"})," statt ",e.jsx(n,{children:"f^{(j)}(t)"}),", so wäre ",e.jsx(n,{children:"F"})," ein Polynom in ",e.jsx(n,{children:"t"})," mit konstanten Koeffizienten und der nächste Schritt scheiterte"]}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"h \\neq 0"})," so klein, dass das abgeschlossene Intervall zwischen ",e.jsx(n,{children:"x"})," und ",e.jsx(n,{children:"x+h"}),`
ganz in `,e.jsx(n,{children:"S"}),` liegt. Wir bauen zwei Hilfsfunktionen auf diesem Intervall, beide in
der Variablen `,e.jsx(n,{children:"t"}),":"]}),e.jsx(o,{children:`F(t) := \\sum_{j=0}^{k} \\frac{f^{(j)}(t)}{j!}\\,(x + h - t)^j ,
\\qquad
G(t) := (x + h - t)^{k+1} .`}),e.jsxs(i.p,{children:[`An den beiden Endpunkten stehen genau die Größen, um die es geht:
`,e.jsx(n,{children:"F(x+h) = \\cblue{f(x+h)}"}),", denn alle Summanden mit ",e.jsx(n,{children:"j \\ge 1"}),` verschwinden, und
`,e.jsx(n,{children:"F(x) = \\cgreen{T_k(h)}"})," nach ",e.jsx(i.a,{href:"#eq-taylorpolynom",children:"(10.8.1)"}),". Ebenso ist ",e.jsx(n,{children:"G(x+h) = 0"}),` und
`,e.jsx(n,{children:"G(x) = h^{k+1}"}),"."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Teleskopsumme: der Abzugsterm zu ",e.jsx(n,{children:"j+1"})," löscht den Zuwachsterm zu ",e.jsx(n,{children:"j"}),"; für ",e.jsx(n,{children:"j = 0"})," ist der Abzugsterm leer, weil dort kein ",e.jsx(n,{children:"(j-1)"}),"-Summand existiert"]}),children:[e.jsxs(i.p,{children:["Jetzt leiten wir ",e.jsx(n,{children:"F"})," nach ",e.jsx(n,{children:"t"}),` ab. Jeder Summand ist ein Produkt, die Produktregel
liefert`]}),e.jsx(o,{children:`\\frac{\\mathrm{d}}{\\mathrm{d}t}\\left[\\frac{f^{(j)}(t)}{j!}(x+h-t)^j\\right]
= \\frac{f^{(j+1)}(t)}{j!}(x+h-t)^j - \\frac{f^{(j)}(t)}{(j-1)!}(x+h-t)^{j-1} .`}),e.jsxs(i.p,{children:["Der erste Term für den Index ",e.jsx(n,{children:"j"}),` ist bis aufs Vorzeichen der zweite Term für den
Index `,e.jsx(n,{children:"j+1"}),`. Beim Aufsummieren hebt sich deshalb fast alles weg, und es bleibt nur
der erste Term des letzten Summanden übrig:`]}),e.jsx(T,{tag:"10.8.4",id:"eq-eq-10-8-4",children:"F'(t) = \\frac{f^{(k+1)}(t)}{k!}\\,(x+h-t)^k ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"F"})," und ",e.jsx(n,{children:"G"})," sind stetig auf dem abgeschlossenen und differenzierbar auf dem offenen Intervall, weil ",e.jsx(n,{children:"f"})," nach Voraussetzung ",e.jsx(n,{children:"(k+1)"}),"-mal stetig differenzierbar ist"]}),children:[e.jsxs(i.p,{children:["Auch ",e.jsx(n,{children:"G"})," leiten wir ab, ",e.jsx(n,{children:"G'(t) = -(k+1)(x+h-t)^k"}),". Für ",e.jsx(n,{children:"t"})," strikt zwischen ",e.jsx(n,{children:"x"}),`
und `,e.jsx(n,{children:"x+h"})," ist ",e.jsx(n,{children:"x+h-t \\neq 0"}),", also ",e.jsx(n,{children:"G'(t) \\neq 0"}),`. Damit sind die Voraussetzungen
des `,e.jsx(v,{id:"mean-value-theorem",children:"Mittelwertsatzes"}),` in der Cauchyschen Fassung erfüllt:
Es gibt ein `,e.jsx(n,{children:"\\xi"})," strikt zwischen ",e.jsx(n,{children:"x"})," und ",e.jsx(n,{children:"x+h"})," mit"]}),e.jsx(o,{children:"\\frac{F(x+h) - F(x)}{G(x+h) - G(x)} = \\frac{F'(\\xi)}{G'(\\xi)} ."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Der Faktor ",e.jsx(n,{children:"(x+h-\\xi)^k"})," ist nach Schritt 3 von null verschieden, das Kürzen ist also erlaubt. In der Zwischenstelle steht ",e.jsx(n,{children:"f^{(k+1)}(\\xi)"})," und nicht ",e.jsx(n,{children:"f^{(k+1)}(x)"})," – sonst brächte man den Mittelwertsatz um seine Aussage"]}),children:[e.jsx(i.p,{children:"Beide Seiten sind jetzt bekannt. Links steht"}),e.jsx(o,{children:"\\frac{\\cblue{f(x+h)} - \\cgreen{T_k(h)}}{0 - h^{k+1}} ,"}),e.jsxs(i.p,{children:["rechts kürzt sich der Faktor ",e.jsx(n,{children:"(x+h-\\xi)^k"})," aus ",e.jsx(i.a,{href:"#eq-eq-10-8-4",children:"(10.8.4)"}),` gegen denselben Faktor
in `,e.jsx(n,{children:"G'(\\xi)"})," weg:"]}),e.jsx(o,{children:`\\frac{F'(\\xi)}{G'(\\xi)}
= \\frac{f^{(k+1)}(\\xi)\\,/\\,k!}{-(k+1)}
= -\\frac{f^{(k+1)}(\\xi)}{(k+1)!} .`}),e.jsxs(i.p,{children:["Multiplizieren wir mit ",e.jsx(n,{children:"-h^{k+1}"}),", so steht ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"})," da."]})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Stetigkeit in dem einen Punkt ",e.jsx(n,{children:"x"})," liefert keine Schranke für die Werte an den Zwischenstellen ",e.jsx(n,{children:"\\xi"}),". Gebraucht wird Beschränktheit auf einer ganzen kompakten Umgebung, und die gibt es, weil ",e.jsx(n,{children:"f^{(k+1)}"})," dort stetig ist"]}),children:[e.jsxs(i.p,{children:["Bleibt die Kleinheitsaussage ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i",children:"(10.8.2)"}),". Wir wählen ein ",e.jsx(n,{children:"\\delta > 0"}),` so, dass das
abgeschlossene Intervall `,e.jsx(n,{children:"[x - \\delta, x + \\delta]"})," noch in ",e.jsx(n,{children:"S"}),` liegt. Dort ist
`,e.jsx(n,{children:"f^{(k+1)}"})," stetig auf einer ",e.jsx(v,{id:"closed-bounded-set",children:"abgeschlossenen und beschränkten Menge"}),`,
also beschränkt, sagen wir durch `,e.jsx(n,{children:"M"}),". Für ",e.jsx(n,{children:"0 < \\left|h\\right| \\le \\delta"})," folgt"]}),e.jsx(o,{children:`\\frac{\\left|\\cred{f(x+h) - T_k(h)}\\right|}{\\left|h\\right|^{k}}
= \\frac{\\left|f^{(k+1)}(\\xi)\\right|}{(k+1)!}\\,\\left|h\\right|
\\le \\frac{M}{(k+1)!}\\,\\left|h\\right| \\xrightarrow{\\ h \\to 0\\ } 0 ,`}),e.jsxs(i.p,{children:["und das heißt gerade ",e.jsx(n,{children:"\\cblue{f(x+h)} - \\cgreen{T_k(h)} = \\cred{o(\\left|h\\right|^k)}"}),"."]})]})]})}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.8.3 (Was der Satz sagt und was nicht)",id:"env-was-der-satz-sagt-und-was-nicht",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Zwei Restglieder."})," Die Fassung ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"}),` mit der Zwischenstelle heißt
`,e.jsx(i.em,{children:"Lagrange-Restglied"}),`; sie ist eine Gleichung und liefert konkrete Schranken, sobald
wir `,e.jsx(n,{children:"f^{(k+1)}"})," abschätzen können. Die Fassung ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i",children:"(10.8.2)"}),` mit
`,e.jsx(n,{children:"\\cred{o(\\left|h\\right|^k)}"})," sagt nur etwas über das Verhalten für ",e.jsx(n,{children:"h \\to 0"}),`, dafür
kommt sie mit weniger Voraussetzungen aus. Für uns ist die
`,e.jsx(n,{children:"o"}),`-Fassung die Arbeitsform, weil sie sich auf normierte Vektorräume mit
vollständigem Zielraum überträgt.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Warum ",e.jsx(n,{children:"\\left|h\\right|^k"})," und nicht ",e.jsx(n,{children:"\\left|h\\right|^{k+1}"}),"."]}),` Der Rest ist nach
`,e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"})," von der Größenordnung ",e.jsx(n,{children:"\\left|h\\right|^{k+1}"}),`, also sogar noch kleiner,
als `,e.jsx(i.a,{href:"#eq-taylorentwicklung-i",children:"(10.8.2)"}),` behauptet. Die schwächere Aussage steht dort, weil sie ohne die
Zusatzvoraussetzung „`,e.jsx(n,{children:"(k+1)"}),`-mal stetig differenzierbar" auskommt und weil genau
sie die Bauform von `,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` hat: Näherung plus Rest, der schneller
verschwindet als die letzte mitgenommene Potenz.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Der Grenzfall ",e.jsx(n,{children:"k = 1"}),"."]})," Dann ist ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i",children:"(10.8.2)"}),` wörtlich
`,e.jsx(n,{children:"\\cblue{f(x+h)} = \\cblue{f(x)} + \\cgreen{f'(x)h} + \\cred{o(\\left|h\\right|)}"}),`, also
Aussage (3) aus `,e.jsx(i.a,{href:"#env-ableitung-als-lineare-approximation",children:"Satz 10.1.3"}),`. Die Taylorentwicklung verallgemeinert die
Ableitungsdefinition, sie ersetzt sie nicht.`]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.8.4 (Die zweite Schreibweise)",id:"env-die-zweite-schreibweise",children:[e.jsxs(i.p,{children:[`Statt Entwicklungspunkt und Zuwachs zu trennen, wird das Taylorpolynom oft als
Funktion der Auswertungsstelle geschrieben. Mit `,e.jsx(n,{children:"x_0"}),` als Entwicklungspunkt und
`,e.jsx(n,{children:"h = x - x_0"})," wird aus ",e.jsx(i.a,{href:"#eq-taylorpolynom",children:"(10.8.1)"})]}),e.jsx(o,{children:`\\cgreen{T_k(x)} = \\sum_{j=0}^{k} \\frac{1}{j!}\\,\\cgreen{f^{(j)}(x_0)}\\,(x - x_0)^j ,
\\qquad
\\cblue{f(x)} = \\cgreen{T_k(x)} + \\cred{o\\bigl(\\left|x - x_0\\right|^k\\bigr)}
\\quad \\text{für } x \\to x_0 .`}),e.jsxs(i.p,{children:[`Beide Fassungen sind gebräuchlich. Wir benutzen
die `,e.jsx(n,{children:"h"}),`-Fassung, wenn es um die Struktur „Funktion gleich Näherung plus Rest" geht,
und die `,e.jsx(n,{children:"x_0"}),"-Fassung, wenn wir das Polynom zeichnen wollen."]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.8.5 (Höher ist nicht automatisch besser)",id:"env-hoeher-ist-nicht-automatisch-besser",children:[e.jsxs(i.p,{children:["Oft heißt es: je höher der Grad ",e.jsx(n,{children:"k"}),`, desto besser und globaler die
Approximation. Als Faustregel für gutartige Funktionen stimmt das, und `,e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"}),`
erklärt auch, warum: Der Faktor `,e.jsx(n,{children:"\\left|h\\right|^{k+1}/(k+1)!"}),` wird mit wachsendem
`,e.jsx(n,{children:"k"}),` rasch klein. Eine Garantie ist es nicht, denn der andere Faktor
`,e.jsx(n,{children:"f^{(k+1)}(\\xi)"})," kann mindestens ebenso rasch wachsen."]}),e.jsxs(i.p,{children:["Das Standardbeispiel ist ",e.jsx(n,{children:"f(x) = 1/(1+x^2)"})," mit Entwicklungspunkt ",e.jsx(n,{children:"0"}),`. Bei
`,e.jsx(n,{children:"x = 0{,}5"}),` läuft alles wie erhofft, die Fehler der Ordnungen
`,e.jsx(n,{children:"k = 2, 4, 8, 16"})," sind ",e.jsx(n,{children:"5{,}0 \\cdot 10^{-2}"}),", ",e.jsx(n,{children:"1{,}3 \\cdot 10^{-2}"}),`,
`,e.jsx(n,{children:"7{,}8 \\cdot 10^{-4}"})," und ",e.jsx(n,{children:"3{,}1 \\cdot 10^{-6}"}),". Bei ",e.jsx(n,{children:"x = 1{,}5"}),` dagegen wachsen
sie: `,e.jsx(n,{children:"1{,}6"}),", ",e.jsx(n,{children:"3{,}5"}),", ",e.jsx(n,{children:"17{,}7"})," und ",e.jsx(n,{children:"455"}),". Die ",e.jsx(v,{id:"taylor-series",children:"Taylorreihe"}),`
dieser Funktion konvergiert nur für `,e.jsx(n,{children:"\\left|x\\right| < 1"}),", obwohl ",e.jsx(n,{children:"f"}),` auf ganz
`,e.jsx(n,{children:"\\R"})," beliebig oft differenzierbar ist. Höhere Ordnung hilft also lokal, nicht global."]})]}),`
`,e.jsxs(q,{kind:"Beispiel",label:"10.8.6 (Taylorapproximation der Exponentialfunktion)",id:"env-taylorapproximation-der",children:[e.jsxs(i.p,{children:["Wir entwickeln ",e.jsx(n,{children:"\\cblue{f(x) = e^x}"})," um ",e.jsx(n,{children:"x_0 = 0"})," bis zur Ordnung ",e.jsx(n,{children:"k = 3"}),` und
messen den Fehler bei `,e.jsx(n,{children:"x = 0{,}5"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Ableitungen."})," Für die Exponentialfunktion ist ",e.jsx(n,{children:"f^{(j)}(x) = e^x"}),` für jedes
`,e.jsx(n,{children:"j \\ge 0"}),", im Entwicklungspunkt also ",e.jsx(n,{children:"\\cgreen{f^{(j)}(0)} = e^0 = 1"}),`. Alle
Koeffizienten sind damit `,e.jsx(n,{children:"1/j!"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Polynome."})," In der Schreibweise von ",e.jsx(i.a,{href:"#env-die-zweite-schreibweise",children:"Bemerkung 10.8.4"})," mit ",e.jsx(n,{children:"x_0 = 0"}),` lesen wir
aus `,e.jsx(i.a,{href:"#eq-taylorpolynom",children:"(10.8.1)"})," ab:"]}),e.jsx(o,{children:`\\begin{aligned}
\\cgreen{T_1(x)} &= 1 + x , \\\\
\\cgreen{T_2(x)} &= 1 + x + \\tfrac{1}{2!}x^2 = 1 + x + \\tfrac{x^2}{2} , \\\\
\\cgreen{T_3(x)} &= 1 + x + \\tfrac{x^2}{2} + \\tfrac{1}{3!}x^3
 = 1 + x + \\tfrac{x^2}{2} + \\tfrac{x^3}{6} .
\\end{aligned}`}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Auswertung bei ",e.jsx(n,{children:"x = 0{,}5"}),"."]}),` Der wahre Wert ist
`,e.jsx(n,{children:"\\cblue{e^{0{,}5}} \\approx 1{,}6487"}),", und die drei Polynome liefern"]}),e.jsx(o,{children:`\\begin{aligned}
\\cgreen{T_1(0{,}5)} &= 1 + 0{,}5 = 1{,}5 ,
 & \\left|\\cblue{f(0{,}5)} - \\cgreen{T_1(0{,}5)}\\right| &\\approx \\cred{0{,}1487} , \\\\
\\cgreen{T_2(0{,}5)} &= 1 + 0{,}5 + \\tfrac{0{,}25}{2} = 1{,}625 ,
 & \\left|\\cblue{f(0{,}5)} - \\cgreen{T_2(0{,}5)}\\right| &\\approx \\cred{0{,}0237} , \\\\
\\cgreen{T_3(0{,}5)} &= 1 + 0{,}5 + 0{,}125 + \\tfrac{0{,}125}{6} \\approx 1{,}6458 ,
 & \\left|\\cblue{f(0{,}5)} - \\cgreen{T_3(0{,}5)}\\right| &\\approx \\cred{0{,}0029} .
\\end{aligned}`}),e.jsxs(i.p,{children:[`Jede Ordnung drückt den Fehler also auf etwa ein Sechstel bis ein Achtel. Das
Lagrange-Restglied erklärt, warum: Der Rest ist
`,e.jsx(n,{children:"e^{\\xi}\\,0{,}5^{\\,k+1}/(k+1)!"})," mit einem ",e.jsx(n,{children:"\\xi \\in (0; 0{,}5)"}),`, beim Übergang von
`,e.jsx(n,{children:"k"})," auf ",e.jsx(n,{children:"k+1"})," kommt also im Wesentlichen der Faktor ",e.jsx(n,{children:"0{,}5/(k+2)"}),` dazu; die
Zwischenstelle `,e.jsx(n,{children:"\\xi"}),` verschiebt sich dabei mit, weshalb die gemessenen
Quotienten `,e.jsx(n,{children:"6{,}3"})," und ",e.jsx(n,{children:"8{,}2"})," die vorhergesagten ",e.jsx(n,{children:"6"})," und ",e.jsx(n,{children:"8"}),` nur ungefähr
treffen. Für `,e.jsx(n,{children:"k = 1"})," lässt sich das ",e.jsx(n,{children:"\\xi"})," sogar ausrechnen, indem wir ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"}),`
nach ihm auflösen: Aus
`,e.jsx(n,{children:"e^{0{,}5} - 1{,}5 = e^{\\xi}\\cdot 0{,}25/2"})," folgt ",e.jsx(n,{children:"\\xi = 0{,}1738"}),`, und das liegt
wie versprochen zwischen `,e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"0{,}5"}),"."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-taylorapproximation-der",children:"Beispiel 10.8.6"}),` hat den Fehler an einer einzigen Stelle für drei Ordnungen
ausgerechnet. Lohnt sich der Sprung von `,e.jsx(n,{children:"T_2"})," auf ",e.jsx(n,{children:"T_3"}),` überhaupt, und gilt der
Gewinn auch weit weg vom Entwicklungspunkt?`]}),`
`,e.jsxs(me,{title:"Drei Ordnungen an einem Regler",children:[e.jsxs(i.p,{children:["Die drei Näherungen ",e.jsx(n,{children:"T_1"}),", ",e.jsx(n,{children:"T_2"})," und ",e.jsx(n,{children:"T_3"}),` derselben Funktion hängen hier an
einem Regler, dazu kommt ein zweiter für die Stelle, an der wir
den Fehler ablesen. Voreingestellt ist `,e.jsx(n,{children:"x = 0{,}5"}),`, also genau die Stelle aus
`,e.jsx(i.a,{href:"#env-taylorapproximation-der",children:"Beispiel 10.8.6"}),"."]}),e.jsx(Ys,{}),e.jsxs(i.p,{children:["Nahe am Entwicklungspunkt ist der Gewinn beträchtlich: Bei ",e.jsx(n,{children:"x = 0{,}5"}),` fällt der Fehler von
`,e.jsx(n,{children:"T_2"})," auf ",e.jsx(n,{children:"T_3"})," um den Faktor ",e.jsx(n,{children:"8{,}2"}),", von ",e.jsx(n,{children:"T_3"})," auf ",e.jsx(n,{children:"T_4"})," sogar um ",e.jsx(n,{children:"10{,}2"}),`. Weiter draußen
kippt das Bild, und der linke Rand bleibt hartnäckig: Für `,e.jsx(n,{children:"x \\to -\\infty"})," geht ",e.jsx(n,{children:"e^x"}),` gegen
null, jedes Taylorpolynom positiven Grades dagegen gegen `,e.jsx(n,{children:"\\pm\\infty"}),". Bei ",e.jsx(n,{children:"x = -3"}),` wächst
der Fehler beim Schritt von `,e.jsx(n,{children:"T_0"})," auf ",e.jsx(n,{children:"T_1"})," deshalb von ",e.jsx(n,{children:"0{,}950"})," auf ",e.jsx(n,{children:"2{,}050"}),`, statt zu
fallen. Der Faustwert `,e.jsx(n,{children:"\\left|x\\right|/(k+1)"}),` aus dem Restglied beschreibt eben das Verhalten
für kleine `,e.jsx(n,{children:"\\left|x\\right|"}),"; solange ",e.jsx(n,{children:"\\left|x\\right|"})," groß gegen ",e.jsx(n,{children:"k+1"}),` ist, gewinnt zunächst
die Potenz. Das ist `,e.jsx(i.a,{href:"#env-hoeher-ist-nicht-automatisch-besser",children:"Bemerkung 10.8.5"})," in Zahlen."]})]}),`
`,e.jsx(i.h3,{children:"Der allgemeine Fall"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-taylorentwicklung-i",children:"Satz 10.8.2"})," lebt vom Rechnen mit Potenzen ",e.jsx(n,{children:"h^j"}),`, und die gibt es im
`,e.jsx(n,{children:"\\R^n"}),` oder in einem Funktionenraum nicht. Die höheren Ableitungen aus
`,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"})," liefern den Ersatz: ",e.jsx(n,{children:"\\cgreen{D_{\\bx}^j f}"}),` ist eine
multilineare Abbildung, die `,e.jsx(n,{children:"j"}),` Zuwächse frisst. Setzen wir überall denselben
Zuwachs `,e.jsx(n,{children:"\\bh"}),` ein, so entsteht der passende Ersatz für den Term
`,e.jsx(n,{children:"f^{(j)}(x)h^j"}),"."]}),`
`,e.jsxs(q,{kind:"Satz",label:"10.8.7 (Taylorentwicklung II)",id:"env-taylorentwicklung-ii",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V"})," ein normierter Vektorraum, ",e.jsx(n,{children:"W"})," ein Banachraum, ",e.jsx(n,{children:"U\\subseteq V"}),` offen,
`,e.jsx(n,{children:"k\\ge 1"})," und ",e.jsx(n,{children:"f\\colon U \\to W"})," in einer Umgebung von ",e.jsx(n,{children:"\\bx\\in U"})," ",e.jsx(n,{children:"k"}),`-mal
stetig Fréchet-differenzierbar; kurz `,e.jsx(n,{children:"f\\in\\Ccal^k"}),`. Dann gibt es einen Rest
`,e.jsx(n,{children:"\\cred{r_k(\\bh)}\\in W"})," mit"]}),e.jsx(T,{tag:"10.8.5",id:"eq-taylorentwicklung-ii",children:`\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)}
+ \\sum_{j = 1}^{k} \\frac{1}{j!}\\,\\cgreen{D_{\\bx}^j f(\\underbrace{\\bh, \\dots, \\bh}_{j\\text{-mal}})}
+ \\cred{r_k(\\bh)},
\\qquad
\\frac{\\left\\|\\cred{r_k(\\bh)}\\right\\|}{\\left\\|\\bh\\right\\|^k}\\longrightarrow0
\\quad\\text{für }\\bh\\to\\bnull .`})]}),`
`,e.jsxs(xe,{title:"Der Beweis: von der Verbindungsstrecke zum Integralrestglied",children:[e.jsxs(ke,{children:[e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Damit ist ",e.jsx(n,{children:"\\psi(0)=f(\\bx)"})," und ",e.jsx(n,{children:"\\psi(1)=f(\\bx+\\bh)"}),": Die ganze Frage ist auf die Verbindungsstrecke zurückgeführt"]}),children:[e.jsxs(i.p,{children:["Für hinreichend kleines ",e.jsx(n,{children:"\\bh"})," liegt die Strecke von ",e.jsx(n,{children:"\\bx"})," nach ",e.jsx(n,{children:"\\bx+\\bh"}),` in
`,e.jsx(n,{children:"U"}),". Wir laufen sie mit einer Funktion einer reellen Variablen ab:"]}),e.jsx(o,{children:"\\psi\\colon [0,1]\\to W,\\qquad \\psi(t):=\\cblue{f(\\bx+t\\bh)}."})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Induktiv: ",e.jsx(n,{children:"t\\mapsto D^j_{\\bx+t\\bh}f(\\bh,\\dots,\\bh)"})," ist wieder eine Verkettung, deren Ableitung ",e.jsx(n,{children:"D^{j+1}"})," an einem zusätzlichen ",e.jsx(n,{children:"\\bh"})," auswertet"]}),children:[e.jsxs(i.p,{children:["Die Kettenregel aus ",e.jsx(i.a,{href:"#env-kettenregel",children:"Satz 10.6.7"})," liefert die Ableitungen von ",e.jsx(n,{children:"\\psi"}),`. Die innere
Abbildung `,e.jsx(n,{children:"t\\mapsto\\bx+t\\bh"})," ist affin mit Ableitung ",e.jsx(n,{children:"\\bh"}),`, also setzt jedes
weitere Ableiten ein `,e.jsx(n,{children:"\\bh"})," mehr ein:"]}),e.jsx(o,{children:"\\psi^{(j)}(t)=\\cgreen{D^j_{\\bx+t\\bh}f(\\underbrace{\\bh,\\dots,\\bh}_{j\\text{-mal}})}."})]}),e.jsxs(G,{why:e.jsx(e.Fragment,{children:"Das Integral ist für stetige Kurven in einem Banachraum definiert; in endlichdimensionalen Zielräumen wird einfach komponentenweise integriert"}),children:[e.jsxs(i.p,{children:["Für eine ",e.jsx(n,{children:"W"}),"-wertige ",e.jsx(n,{children:"\\Ccal^k"}),"-Kurve gilt die Taylorformel mit Integralrest:"]}),e.jsx(o,{children:`\\psi(1)=\\sum_{j=0}^{k-1}\\frac{1}{j!}\\psi^{(j)}(0)
+\\frac{1}{(k-1)!}\\int_0^1(1-t)^{k-1}\\psi^{(k)}(t)\\,dt.`}),e.jsxs(i.p,{children:["Wir addieren und subtrahieren ",e.jsx(n,{children:"\\psi^{(k)}(0)"}),` im Integral. Weil
`,e.jsx(n,{children:"\\int_0^1(1-t)^{k-1}\\,dt=1/k"}),`, entsteht daraus genau der fehlende Summand
`,e.jsx(n,{children:"\\psi^{(k)}(0)/k!"})," und der Rest"]}),e.jsx(o,{children:`\\cred{r_k(\\bh)}=\\frac{1}{(k-1)!}\\int_0^1(1-t)^{k-1}
\\bigl(\\cgreen{D^k_{\\bx+t\\bh}f}-\\cgreen{D^k_{\\bx}f}\\bigr)
(\\bh,\\dots,\\bh)\\,dt.`})]}),e.jsxs(G,{why:e.jsxs(e.Fragment,{children:["Die Operatornorm schätzt den Integranden gleichzeitig für jede Richtung ab; das Integral der Gewichtsfunktion liefert den Faktor ",e.jsx(n,{children:"1/k"})]}),children:[e.jsxs(i.p,{children:["Für kleines ",e.jsx(n,{children:"s>0"})," mit ",e.jsx(n,{children:"\\{\\bz:\\left\\|\\bz-\\bx\\right\\|\\le s\\}\\subseteq U"})," setzen wir"]}),e.jsx(o,{children:`\\omega(s):=\\sup_{\\left\\|\\bz-\\bx\\right\\|\\le s}
\\left\\|\\cgreen{D^k_{\\bz}f}-\\cgreen{D^k_{\\bx}f}\\right\\|_{\\mathrm{op}}.`}),e.jsxs(i.p,{children:["Die Stetigkeit von ",e.jsx(n,{children:"D^kf"})," in ",e.jsx(n,{children:"\\bx"})," liefert ",e.jsx(n,{children:"\\omega(s)\\to0"}),`. Mit der Operatornorm
und der Dreiecksungleichung für Integrale folgt`]}),e.jsx(o,{children:`\\left\\|\\cred{r_k(\\bh)}\\right\\|
\\le \\frac{\\omega(\\left\\|\\bh\\right\\|)}{k!}\\left\\|\\bh\\right\\|^k.`}),e.jsxs(i.p,{children:["Nach Division durch ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|^k"}),` geht die rechte Seite gegen null.
Das beweist `,e.jsx(i.a,{href:"#eq-taylorentwicklung-ii",children:"(10.8.5)"}),"."]})]})]}),e.jsx(q,{kind:"Bemerkung",label:"10.8.8 (Warum hier die Integralform steht)",id:"env-warum-hier-die-integralform-steht",children:e.jsxs(i.p,{children:["Das Lagrange-Restglied aus ",e.jsx(i.a,{href:"#env-taylorentwicklung-i",children:"Satz 10.8.2"})," besitzt eine Zwischenstelle ",e.jsx(n,{children:"\\xi"}),` und ist
ein skalares Resultat. Für eine vektorwertige Funktion können verschiedene
Komponenten verschiedene Zwischenstellen benötigen; in einem allgemeinen
Banachraum gibt es gar keine komponentenweise Formulierung. Die Integralform
umgeht dieses Problem und liefert zusammen mit der Operatornorm unmittelbar eine
Schranke, die für alle Richtungen zugleich gilt. Genau deshalb reicht
`,e.jsx(n,{children:"f\\in\\Ccal^k"}),`, während das Restglied trotzdem
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|^k)}"})," ist."]})})]}),`
`,e.jsx(i.h3,{children:"Gradient, Hesse-Matrix und die ersten drei Ordnungen"}),`
`,e.jsxs(i.p,{children:["Für den wichtigsten Spezialfall ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` tragen die ersten
Ableitungen aus `,e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"})," vertraute Namen, und ",e.jsx(i.a,{href:"#eq-taylorentwicklung-ii",children:"(10.8.5)"}),` wird
zu einer Formel, die sich merken lässt.`]}),`
`,e.jsxs(q,{kind:"Korollar",label:"10.8.9 (Taylorapproximation für Vektor zu Skalar)",id:"env-taylorapproximation-fuer-vektor-zu",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"})," in einer Umgebung von ",e.jsx(n,{children:"\\bx"}),` dreimal stetig
differenzierbar, sei `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\in \\R^{1 \\times n}"}),` der Gradient und
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} \\in \\R^{n \\times n}"}),` die Hesse-Matrix aus
`,e.jsx(i.a,{href:"#env-hesse-matrix",children:"Definition 10.7.3"}),`. Dann gilt für
`,e.jsx(n,{children:"\\bh \\to \\bnull"})]}),e.jsx(T,{tag:"10.8.6",id:"eq-taylorapproximation-fuer-vektor-zu",children:`\\begin{aligned}
\\cblue{f(\\bx + \\bh)}
&= \\cblue{f(\\bx)} + \\corange{\\nabla f(\\bx)}\\,\\bh + \\cred{o(\\left\\|\\bh\\right\\|)} \\\\
&= \\cblue{f(\\bx)} + \\corange{\\nabla f(\\bx)}\\,\\bh
 + \\tfrac{1}{2}\\,\\bh^\\top \\corange{\\bH_f(\\bx)}\\,\\bh + \\cred{o(\\left\\|\\bh\\right\\|^2)} \\\\
&= \\cblue{f(\\bx)} + \\corange{\\nabla f(\\bx)}\\,\\bh
 + \\tfrac{1}{2}\\,\\bh^\\top \\corange{\\bH_f(\\bx)}\\,\\bh
 + \\frac{1}{6}\\sum_{i,j,l = 1}^{n} \\frac{\\partial^3 f(\\bx)}{\\partial x_i \\partial x_j \\partial x_l} h_i h_j h_l
 + \\cred{o(\\left\\|\\bh\\right\\|^3)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Mit dem Entwicklungspunkt ",e.jsx(n,{children:"\\bx_0"})," und ",e.jsx(n,{children:"\\bh = \\bx - \\bx_0"})," lautet dieselbe Aussage"]}),e.jsx(o,{children:`\\begin{aligned}
\\cblue{f(\\bx)}
&= \\cblue{f(\\bx_0)} + \\corange{\\nabla f(\\bx_0)}(\\bx - \\bx_0) + \\cred{o(\\left\\|\\bx - \\bx_0\\right\\|)} \\\\
&= \\cblue{f(\\bx_0)} + \\corange{\\nabla f(\\bx_0)}(\\bx - \\bx_0)
 + \\tfrac{1}{2}(\\bx - \\bx_0)^\\top \\corange{\\bH_f(\\bx_0)}(\\bx - \\bx_0)
 + \\cred{o(\\left\\|\\bx - \\bx_0\\right\\|^2)} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die ersten beiden Zeilen kommen mit ",e.jsx(n,{children:"f \\in \\Ccal^1"})," bzw. ",e.jsx(n,{children:"f \\in \\Ccal^2"})," aus."]})]}),`
`,e.jsxs(i.p,{children:["Dass hier überhaupt Gradient und Hesse-Matrix auftauchen, ist ",e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),`: Er
übersetzt `,e.jsx(n,{children:"\\cgreen{D_{\\bx} f(\\bh)}"})," in ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bh"}),` und
`,e.jsx(n,{children:"\\cgreen{D^2_{\\bx} f(\\bh, \\bh)}"})," in ",e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx)}\\bh"}),`, und danach
ist `,e.jsx(i.a,{href:"#eq-taylorapproximation-fuer-vektor-zu",children:"(10.8.6)"})," nur noch ",e.jsx(i.a,{href:"#eq-taylorentwicklung-ii",children:"(10.8.5)"})," in Koordinaten."]}),`
`,e.jsxs(i.p,{children:["Die Formate gehen auf: Der Gradient ist ein Zeilenvektor, ",e.jsx(n,{children:"\\bh"}),` ein Spaltenvektor,
also ist `,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)}\\bh"}),` eine Zahl. Ebenso ist
`,e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx)}\\bh"})," eine ",e.jsx(v,{id:"quadratic-form",children:"quadratische Form"}),` und
damit skalar. Ab der dritten Ordnung gibt es keine Matrixschreibweise mehr, weil
`,e.jsx(n,{children:"\\cgreen{D_{\\bx}^3 f}"}),` drei Indexpositionen hat, also ein
`,e.jsx(v,{id:"tensor",children:"Tensor"})," dritter Stufe ist (",e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Abschnitt 9.2"}),`);
deshalb steht dort die ausgeschriebene Summe. Praktisch verwendet werden fast nur
die ersten beiden Zeilen.`]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.8.10 (Ebene und Quadrik)",id:"env-ebene-und-quadrik",children:[e.jsxs(i.p,{children:[`Geometrisch sind die beiden Näherungen leicht zu benennen. Der Graph von
`,e.jsx(n,{children:"\\cgreen{T_1}"})," ist die ",e.jsx(i.em,{children:"Tangentialebene"})," an den Graphen von ",e.jsx(n,{children:"f"}),` im Punkt
`,e.jsx(n,{children:"(\\bx, \\cblue{f(\\bx)})"}),"; solange ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\neq \\bnull^\\top"}),` ist,
sind ihre `,e.jsx(v,{id:"level-sets",children:"Höhenlinien"}),` parallele Geraden senkrecht zum Gradienten
(`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),`), im kritischen Punkt dagegen ist
`,e.jsx(n,{children:"\\cgreen{T_1}"}),` konstant. Seine Niveaumenge zum konstanten Wert ist dann der ganze
Definitionsraum, alle anderen sind leer; reguläre Höhenlinien mit einer ausgezeichneten
Gradientenrichtung gibt es nicht. Der
Graph von `,e.jsx(n,{children:"\\cgreen{T_2}"}),` ist eine Quadrik, und ihre Höhenlinien verraten die
Definitheit der Hesse-Matrix: Ellipsen bei definiter, Hyperbeln bei indefiniter
Hesse-Matrix. Damit ist der Anschluss an
`,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),` hergestellt, wo dieselbe Fallunterscheidung über Minimum, Maximum
und Sattelpunkt entscheidet, sofern die Hesse-Matrix definit oder indefinit ist
(`,e.jsx(i.a,{href:"#env-wenn-die-hesse-matrix-nichts-entscheidet",children:"Bemerkung 10.7.10"}),"). Genauer ist die zweite Zeile von ",e.jsx(i.a,{href:"#eq-taylorapproximation-fuer-vektor-zu",children:"(10.8.6)"}),` genau das
Werkzeug, das der Beweis dieses Satzes braucht: Im kritischen Punkt fällt der
lineare Term weg, und weil der rote Rest schneller verschwindet als
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"}),", entscheidet für kleine ",e.jsx(n,{children:"\\bh"}),` das Vorzeichen von
`,e.jsx(n,{children:"\\bh^\\top \\corange{\\bH_f(\\bx^*)}\\bh"}),"."]}),e.jsxs(i.p,{children:["Ein Sonderfall ist lehrreich: Ist ",e.jsx(n,{children:"f"}),` selbst ein Polynom zweiten Grades, so
verschwinden alle Ableitungen ab der dritten, das Restglied ist null und
`,e.jsx(n,{children:"\\cgreen{T_2} = \\cblue{f}"})," gilt exakt, an jeder Stelle und für jedes ",e.jsx(n,{children:"\\bh"}),`. Auf
dieser Beobachtung beruht das Verfahren im nächsten Unterabschnitt.`]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"})," macht eine quantitative Aussage: Der Restterm von ",e.jsx(n,{children:"\\cgreen{T_1}"}),`
wächst wie `,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"}),", der von ",e.jsx(n,{children:"\\cgreen{T_2}"}),` wie
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^3"}),`. Halbieren wir also den Abstand zum Entwicklungspunkt, um
welchen Faktor fällt dann der Fehler?`]}),`
`,e.jsxs(me,{title:"Tangentialebene und Quadrik im Höhenlinienbild",children:[e.jsxs(i.p,{children:["Statt nur der Flächen zeichnen wir die Höhenlinien, und zwar die von ",e.jsx(n,{children:"f"}),` und die
des Taylorpolynoms im selben Fenster und auf denselben Niveaus; daneben steht
dieselbe Lage im Raum. Gemessen wird der größte Fehler auf einem Kreis mit Radius
`,e.jsx(n,{children:"r"}),` um den Entwicklungspunkt, im Vergleich zu dem auf dem halb so großen Kreis.
In der Raumtafel ist dieser Fehler der senkrechte Abstand zwischen dem blauen und
dem grünen Ring.`]}),e.jsxs(i.p,{children:[`Dieselbe Idee zeigt außerdem eine
`,e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/taylor-approx/",children:"Shiny-App"}),` mit Flächen im
Raum.`]}),e.jsx(sl,{}),e.jsxs(i.p,{children:["Die Vorhersage trifft: In der Voreinstellung fällt der Fehler von ",e.jsx(n,{children:"\\cgreen{T_1}"}),` beim
Halbieren des Radius um den Faktor `,e.jsx(n,{children:"4{,}34"})," und der von ",e.jsx(n,{children:"\\cgreen{T_2}"})," um ",e.jsx(n,{children:"8{,}07"}),`, also
ungefähr um `,e.jsx(n,{children:"4"})," und ",e.jsx(n,{children:"8"}),`. Die Umschaltung zwischen den beiden Ordnungen zeigt zugleich den
strukturellen Unterschied: Die Tangentialebene liefert parallele Geraden als Höhenlinien,
die Quadrik krümmt sich mit. Die Faustzahlen setzen allerdings voraus, dass der jeweils
führende Restterm nicht selbst verschwindet; wo die Hesse-Matrix nahezu null ist, springt
der `,e.jsx(n,{children:"\\cgreen{T_1}"}),"-Quotient auf etwa ",e.jsx(n,{children:"8"}),`. Auf der Quadrik im dritten Menüpunkt fällt der
`,e.jsx(n,{children:"\\cgreen{T_2}"}),`-Fehler auf Rundungsniveau: Dort ist die Näherung exakt, und genau darauf
beruht der eine exakte Newton-Schritt im nächsten Unterabschnitt.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: das Newton-Raphson-Verfahren"}),`
`,e.jsxs(i.p,{children:[`Gesucht ist ein lokales Minimum, sofern eines existiert, für eine zweimal stetig
differenzierbare Funktion `,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),`. Direkt lösen können wir das im
Allgemeinen nicht. Für eine quadratische Funktion mit positiv definiter Hesse-Matrix
dagegen schon: Dort ist die Bedingung „Gradient gleich null" ein lineares Gleichungssystem,
und lineare
Gleichungssysteme lösen wir seit `,e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),`. Die Idee des
Verfahrens des `,e.jsx(v,{id:"newtons-method",children:"Newton-Raphson"}),` ist deshalb, an der aktuellen
Stelle `,e.jsx(n,{children:"\\bx^{(k)}"})," die quadratische Näherung aus ",e.jsx(i.a,{href:"#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"}),` hinzulegen und
ihren stationären Punkt zu bestimmen:`]}),`
`,e.jsx(o,{children:`\\cblue{f(\\bx)} \\approx \\cgreen{T_2(\\bx)} = \\cblue{f(\\bx^{(k)})}
+ \\corange{\\nabla f(\\bx^{(k)})}\\bigl(\\bx - \\bx^{(k)}\\bigr)
+ \\tfrac{1}{2}\\bigl(\\bx - \\bx^{(k)}\\bigr)^\\top \\corange{\\bH_f(\\bx^{(k)})}\\bigl(\\bx - \\bx^{(k)}\\bigr) .`}),`
`,e.jsxs(i.p,{children:[`Den Gradienten dieser Funktion kennen wir aus
`,e.jsx(i.a,{href:"#sec-10.6",children:"Abschnitt 10.6"}),`: Der lineare Term steuert
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(k)})}"}),` bei, und die quadratische Form hat nach
`,e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"}),` den Gradienten
`,e.jsx(n,{children:"\\bigl(\\bx - \\bx^{(k)}\\bigr)^\\top\\bigl(\\corange{\\bH_f} + \\corange{\\bH_f^\\top}\\bigr)/2"}),`,
was wegen der Symmetrie der Hesse-Matrix (Satz von Schwarz, `,e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),`) gerade
`,e.jsx(n,{children:"\\bigl(\\bx - \\bx^{(k)}\\bigr)^\\top \\corange{\\bH_f(\\bx^{(k)})}"})," ist. Nullsetzen liefert"]}),`
`,e.jsx(o,{children:`\\begin{aligned}
\\corange{\\nabla T_2(\\bx)}
&= \\corange{\\nabla f(\\bx^{(k)})} + \\bigl(\\bx - \\bx^{(k)}\\bigr)^\\top \\corange{\\bH_f(\\bx^{(k)})}
\\overset{!}{=} \\bnull^\\top \\\\
\\Longrightarrow\\quad
\\bigl(\\bx - \\bx^{(k)}\\bigr)^\\top
&= -\\corange{\\nabla f(\\bx^{(k)})}\\,\\corange{\\bH_f(\\bx^{(k)})^{-1}} .
\\end{aligned}`}),`
`,e.jsxs(i.p,{children:["Der letzte Schritt setzt voraus, dass ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),` invertierbar
ist; sonst hat `,e.jsx(n,{children:"\\cgreen{T_2}"}),` entweder gar keinen kritischen Punkt oder einen affinen
Lösungsraum positiver Dimension. Ansonsten sind beide Seiten Zeilenvektoren, wie es die
Konvention aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` verlangt. Transponieren bringt uns
zurück zu Spalten, und damit steht das Verfahren da.`]}),`
`,e.jsxs(q,{kind:"Algorithmus",label:"10.8.11 (Newton-Raphson-Verfahren)",id:"env-newton-raphson-verfahren",children:[e.jsxs(i.p,{children:["Gegeben seien ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` zweimal stetig differenzierbar und ein
Startpunkt `,e.jsx(n,{children:"\\bx^{(0)}"}),". Für ",e.jsx(n,{children:"k = 0, 1, 2, \\dots"}),` wiederhole, solange
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"})," invertierbar ist:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Berechne ",e.jsx(n,{children:"\\corange{\\nabla f(\\bx^{(k)})}"})," und ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Setze"}),`
`,e.jsx(T,{tag:"10.8.7",id:"eq-newton-raphson-verfahren",children:"\\bx^{(k+1)} = \\bx^{(k)} - \\Bigl(\\corange{\\nabla f(\\bx^{(k)})}\\,\\corange{\\bH_f(\\bx^{(k)})^{-1}}\\Bigr)^\\top ."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Brich ab, wenn ",e.jsx(n,{children:"\\left\\|\\corange{\\nabla f(\\bx^{(k)})}\\right\\|"}),` oder die
Schrittlänge `,e.jsx(n,{children:"\\left\\|\\bx^{(k+1)} - \\bx^{(k)}\\right\\|"}),` unter eine vorgegebene
Schranke fällt.`]}),`
`]}),`
`]})]}),`
`,e.jsxs(q,{kind:"Bemerkung",label:"10.8.12 (Drei Vorbehalte)",id:"env-drei-vorbehalte",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Schritt sucht kritische Punkte, keine Minima."})," Konstruiert wurde ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"}),`
als Nullstelle von `,e.jsx(n,{children:"\\corange{\\nabla T_2}"}),`. Ein solcher Punkt ist ein Minimum der
Näherung nur dann, wenn `,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}"}),`
`,e.jsx(v,{id:"positive-definite",children:"positiv definit"}),` ist. Bei indefiniter beziehungsweise negativ
definiter Hesse-Matrix ist der stationäre Punkt des lokalen quadratischen Modells ein
Sattel beziehungsweise Maximum, und der Schritt muss keine Abstiegsrichtung sein. Das
klassische Newton-Verfahren sucht Nullstellen des Gradienten und kann deshalb je nach
Startpunkt zu Minima, Maxima oder Sattelpunkten konvergieren. Praktische Varianten erzwingen
deshalb
Definitheit, etwa indem sie ein Vielfaches der Einheitsmatrix addieren.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Inverse ist eine Schreibweise, keine Rechenanweisung."})," In ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"}),` steht
`,e.jsx(n,{children:"\\corange{\\bH_f^{-1}}"}),`, gerechnet wird aber das Gleichungssystem
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^{(k)})}\\,\\bd = -\\corange{\\nabla f(\\bx^{(k)})}^\\top"}),` mit
anschließendem `,e.jsx(n,{children:"\\bx^{(k+1)} = \\bx^{(k)} + \\bd"}),`. Das kostet weniger und ist
stabiler (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`); bei positiv definiter Hesse-Matrix
ist die Cholesky-Zerlegung aus `,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),` das Mittel der
Wahl, und ihr Gelingen ist zugleich die Definitheitsprobe.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Nur lokal."}),` Weit weg vom Ziel kann die quadratische Näherung so schlecht sein,
dass der Schritt in die falsche Richtung zeigt. Die Gegenmittel heißen
Schrittweitensteuerung und Trust-Region und gehören in ein eigenes Kapitel über
`,e.jsx(v,{id:"optimization",children:"Optimierung"}),", das dieses Skript später aufmacht."]})]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.8.13 (Warum Statistik und ML voll davon sind)",id:"env-warum-statistik-und-ml-voll-davon-sind",children:e.jsxs(i.p,{children:["Die ",e.jsx(v,{id:"likelihood",children:"Maximum-Likelihood-Schätzung"}),` maximiert die Log-Likelihood
`,e.jsx(n,{children:"\\ell(\\btheta)"}),`, sucht also eine Nullstelle der Score-Funktion
`,e.jsx(n,{children:"\\corange{\\nabla \\ell(\\btheta)}"}),". Genau dafür ist ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"}),` gebaut, und die dabei
gebrauchte Hesse-Matrix ist bis aufs Vorzeichen die beobachtete
Fisher-Information aus `,e.jsx(i.a,{href:"#env-fisher-informationsmatrix",children:"Definition 10.7.14"}),`. Ersetzen wir sie durch ihren
Erwartungswert, so heißt das Verfahren `,e.jsx(i.em,{children:"Fisher-Scoring"}),`; für verallgemeinerte
lineare Modelle fällt es mit den `,e.jsx(i.em,{children:"iterativ gewichteten kleinsten Quadraten"}),`
(IRLS) zusammen, in denen jeder Schritt ein gewichtetes
Kleinste-Quadrate-Problem im Sinne von `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"})," ist."]})}),`
`,e.jsx(xe,{title:"Die Asymptotik des ML-Schätzers als Taylorentwicklung",children:e.jsxs(i.p,{children:[`Auch die Asymptotik selbst ist eine Taylorentwicklung. Entwickeln wir die Score
um den wahren Parameter `,e.jsx(n,{children:"\\btheta"})," und werten sie am Schätzer ",e.jsx(n,{children:"\\wh\\btheta"}),` aus, wo
sie verschwindet, so bleibt in erster Ordnung
`,e.jsx(n,{children:"\\bnull^\\top \\approx \\corange{\\nabla \\ell(\\btheta)} + (\\wh\\btheta - \\btheta)^\\top \\corange{\\bH_\\ell(\\btheta)}"}),`
stehen. Umstellen und Normieren macht daraus unter den üblichen
Regularitätsbedingungen die bekannte Aussage
`,e.jsx(n,{children:"\\sqrt n (\\wh\\btheta - \\btheta) \\to N\\bigl(\\bnull, \\corange{\\bI_1(\\btheta)}^{-1}\\bigr)"}),`: Der
Faktor `,e.jsx(n,{children:"n^{-1/2}\\corange{\\nabla \\ell(\\btheta)}^\\top"}),` ist eine normierte Summe
unabhängiger Beiträge und wird nach dem zentralen Grenzwertsatz normal, und
`,e.jsx(n,{children:"-\\corange{\\bH_\\ell(\\btheta)}/n"}),` konvergiert gegen die Fisher-Information
`,e.jsx(n,{children:"\\corange{\\bI_1(\\btheta)}"})," einer einzelnen Beobachtung. Der Restterm aus ",e.jsx(i.a,{href:"#eq-taylorapproximation-fuer-vektor-zu",children:"(10.8.6)"}),` ist
dabei das, was die Argumentation auf eine asymptotische festlegt.`]})}),`
`,e.jsx(i.p,{children:`Wie schnell ist „quadratisch konvergent" in Zahlen? Rechnen wir das Verfahren
Schritt für Schritt mit und schauen, wie viele Schritte es bis zur
Maschinengenauigkeit braucht.`}),`
`,e.jsxs(me,{title:"Newton Schritt für Schritt",children:[e.jsxs(i.p,{children:[`Die Tafel zeigt die Höhenlinien, den Weg der Iterierten und eine Tabelle mit
Gradientennorm, Fehler und dem Quotienten `,e.jsx(n,{children:"e_k / e_{k-1}^2"}),`. Bleibt dieser
Quotient beschränkt, so wird der Fehler in jedem Schritt im Wesentlichen
quadriert; das ist die `,e.jsx(i.em,{children:"quadratische Konvergenz"}),`, die Newton so beliebt macht
(`,e.jsx(v,{id:"rate-of-convergence",children:"Konvergenzordnung"}),`). Der Schrittregler lässt sich
vor- und zurückfahren, ohne dass die Iteration neu startet.`]}),e.jsxs(i.p,{children:["Voreingestellt ist ",e.jsx(n,{children:"f(\\bx) = x_1^3/3 - x_1 + x_2^2/2"})," mit Start ",e.jsx(n,{children:"(2; 1{,}5)"}),`.
Drei Versuche lohnen sich: ein Startpunkt mit `,e.jsx(n,{children:"x_1 < 0"}),`, ein Startpunkt mit
`,e.jsx(n,{children:"x_1 = 0"}),", und der zweite Menüpunkt, die Quadrik aus ",e.jsx(i.a,{href:"#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),"."]}),e.jsx(ul,{}),e.jsxs(i.p,{children:["In der ",e.jsx(n,{children:"x_2"}),"-Richtung sitzt der erste Schritt sofort exakt, denn dort ist ",e.jsx(n,{children:"f"}),` quadratisch.
In der `,e.jsx(n,{children:"x_1"}),"-Richtung läuft die Iteration über ",e.jsx(n,{children:"1{,}25"}),", ",e.jsx(n,{children:"1{,}025"}),", ",e.jsx(n,{children:"1{,}00030"}),` und
`,e.jsx(n,{children:"1{,}00000005"})," gegen ",e.jsx(n,{children:"1"}),", mit den Fehlern ",e.jsx(n,{children:"0{,}25"}),", ",e.jsx(n,{children:"0{,}025"}),", ",e.jsx(n,{children:"3{,}05\\cdot 10^{-4}"}),` und
`,e.jsx(n,{children:"4{,}65\\cdot 10^{-8}"}),"; im fünften Schritt steht ",e.jsx(n,{children:"1{,}1\\cdot 10^{-15}"}),`. Fünf Schritte für
fünfzehn Stellen: Der Fehler wird von Schritt zu Schritt im Wesentlichen quadriert, der
Quotient `,e.jsx(n,{children:"e_k/e_{k-1}^2"})," läuft gegen ",e.jsx(n,{children:"1/(2x_1^*) = 0{,}5"}),`. Die drei Versuche zeigen ebenso
schnell die Grenzen: Ein Start mit `,e.jsx(n,{children:"x_1 < 0"})," führt in den Sattelpunkt ",e.jsx(n,{children:"(-1; 0)"}),` statt ins
Minimum (`,e.jsx(i.a,{href:"#env-drei-vorbehalte",children:"Bemerkung 10.8.12"}),"), bei ",e.jsx(n,{children:"x_1 = 0"})," ist die Hesse-Matrix ",e.jsx(n,{children:"\\diag(0, 1)"}),`
singulär und der Schritt gar nicht definiert, und auf der Quadrik ist nach einem einzigen
Schritt Schluss, weil `,e.jsx(n,{children:"\\cgreen{T_2}"})," dort mit ",e.jsx(n,{children:"f"})," übereinstimmt."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Im Restglied von ",e.jsx(i.a,{href:"#env-taylorentwicklung-i",children:"Satz 10.8.2"})," steht die ",e.jsx(n,{children:"(k+1)"}),`-te Ableitung an der
Entwicklungsstelle, also `,e.jsx(n,{children:"f^{(k+1)}(x)"}),"."]}),e.jsxs(i.p,{children:["Sie steht an einer Zwischenstelle ",e.jsx(n,{children:"\\xi"})," zwischen ",e.jsx(n,{children:"x"})," und ",e.jsx(n,{children:"x+h"}),`, die der
Mittelwertsatz liefert und über die wir sonst nichts wissen. Stünde dort
`,e.jsx(n,{children:"f^{(k+1)}(x)"}),`, so wäre der Rest ein exakt bekannter Ausdruck und
der Mittelwertsatz im Beweis überflüssig. Bekannt ist nur eine Schranke für
`,e.jsx(n,{children:"f^{(k+1)}"})," in einer Umgebung, und genau daraus wird die ",e.jsx(n,{children:"o"}),"-Aussage."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Je größer der Grad ",e.jsx(n,{children:"k"}),`, desto kleiner der Fehler, gleichgültig an welcher Stelle
wir auswerten.`]}),e.jsxs(i.p,{children:["Lokal stimmt die Faustregel, global nicht. Für ",e.jsx(n,{children:"f(x) = 1/(1+x^2)"}),` mit
Entwicklungspunkt `,e.jsx(n,{children:"0"})," fallen die Fehler bei ",e.jsx(n,{children:"x = 0{,}5"})," von ",e.jsx(n,{children:"5{,}0\\cdot 10^{-2}"}),`
auf `,e.jsx(n,{children:"3{,}1\\cdot 10^{-6}"}),", wenn wir von ",e.jsx(n,{children:"k = 2"})," auf ",e.jsx(n,{children:"k = 16"})," gehen, bei ",e.jsx(n,{children:"x = 1{,}5"}),`
wachsen sie im selben Schritt von `,e.jsx(n,{children:"1{,}6"})," auf ",e.jsx(n,{children:"455"})," (",e.jsx(i.a,{href:"#env-hoeher-ist-nicht-automatisch-besser",children:"Bemerkung 10.8.5"}),`). Im
Lagrange-Restglied kann der Faktor `,e.jsx(n,{children:"f^{(k+1)}(\\xi)"}),` schneller wachsen, als
`,e.jsx(n,{children:"(k+1)!"})," ihn drückt."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f"})," ein Polynom zweiten Grades, so gilt ",e.jsx(n,{children:"T_2 = f"}),` überall, nicht nur
näherungsweise.`]}),e.jsxs(i.p,{children:[`Alle Ableitungen ab der dritten sind null, also verschwindet das Restglied
`,e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"})," für ",e.jsx(n,{children:"k = 2"}),` identisch. Bei invertierbarer Hesse-Matrix trifft der
Newton-Schritt deshalb den eindeutigen kritischen Punkt in einem Zug. Ein Minimum
ist dieser nur bei positiver Definitheit, wie im zweiten Menüpunkt des Widgets.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Newton-Schritt ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"})," liefert stets ein lokales Minimum von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Er liefert einen kritischen Punkt der quadratischen Näherung, mehr nicht. Ist die
Hesse-Matrix indefinit, so ist dieser Punkt ein Sattel; im Widget läuft jeder
Start mit `,e.jsx(n,{children:"x_1 < 0"})," zielstrebig nach ",e.jsx(n,{children:"(-1; 0)"}),`, wo der Gradient verschwindet und
die Hesse-Matrix `,e.jsx(n,{children:"\\diag(-2, 1)"}),` indefinit ist. Erst positive Definitheit macht aus
dem kritischen Punkt ein Minimum (`,e.jsx(i.a,{href:"#env-drei-vorbehalte",children:"Bemerkung 10.8.12"}),")."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Halbieren wir ",e.jsx(n,{children:"\\left\\|\\bh\\right\\|"}),`, so fällt der Fehler der Tangentialebene auf
etwa ein Viertel, der Fehler der quadratischen Näherung auf etwa ein Achtel.`]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"}),` ist der erste Rest von der Größenordnung
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^2"}),` und der zweite von der Größenordnung
`,e.jsx(n,{children:"\\left\\|\\bh\\right\\|^3"}),`. Das Widget misst diesen Quotienten auf einem Kreis: In
der Voreinstellung stehen dort `,e.jsx(n,{children:"4{,}34"})," und ",e.jsx(n,{children:"8{,}07"}),` für
`,e.jsx(n,{children:"\\sin(x_1) + \\cos(x_2)"}),", für die Glockenfunktion an derselben Stelle ",e.jsx(n,{children:"3{,}99"}),`
und `,e.jsx(n,{children:"8{,}78"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Beweis von ",e.jsx(i.a,{href:"#env-taylorentwicklung-ii",children:"Satz 10.8.7"}),` überträgt die eindimensionale Aussage einfach auf jede
Gerade durch `,e.jsx(n,{children:"\\bx"}),", mehr ist nicht zu zeigen."]}),e.jsxs(i.p,{children:["Der Kern ist das, aber die Aussage ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|^k)}"}),` verlangt
Kleinheit gleichmäßig über alle Richtungen, während die Entwicklung von `,e.jsx(n,{children:"\\psi"}),`
zunächst nur für eine feste Richtung `,e.jsx(n,{children:"\\bu"})," gilt. Die Stetigkeit der ",e.jsx(n,{children:"k"}),`-ten
Ableitung liefert eine gemeinsame Normschranke für alle Richtungen und damit die
benötigte gleichmäßige Kleinheit (Herleitung in der Vertiefung
`,e.jsx(i.a,{href:"#env-warum-hier-die-integralform-steht",children:"Bemerkung 10.8.8"}),")."]})]}),e.jsxs(We,{loesung:5,toleranz:0,children:[e.jsxs(i.p,{children:[`Fahren wir den Schrittregler im Newton-Widget von der Voreinstellung aus hoch. In welchem
Schritt unterschreitet der Abstand zum Minimum zum ersten Mal `,e.jsx(n,{children:"10^{-10}"}),"?"]}),e.jsxs(i.p,{children:["In Schritt ",e.jsx(n,{children:"5"}),". Die Fehlerspalte fällt von ",e.jsx(n,{children:"4{,}65\\cdot 10^{-8}"}),` auf
`,e.jsx(n,{children:"1{,}1\\cdot 10^{-15}"}),`, überspringt also sieben Größenordnungen auf einmal. Das ist
quadratische Konvergenz in Zahlen: Sobald der Fehler klein genug ist, verdoppelt sich die
Zahl der gültigen Stellen mit jedem Schritt.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: MML §5.1.1 behandelt die Taylorreihe im eindimensionalen Fall, §5.8
die Linearisierung und die mehrdimensionale Taylorentwicklung samt der
Tensorschreibweise für die höheren Terme.`})})]})}function bl(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(St,{...r})}):St(r)}function Dt(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:`Ein einziger Gedanke trägt dieses Kapitel: Ableiten heißt linear approximieren.
Alles Weitere war Buchführung darüber, in welchem Format die lineare Näherung
steht und nach welchen Regeln sich mit ihr rechnen lässt. Sammeln wir ein, was
bleiben soll, und sagen wir dazu, was wir bewusst liegengelassen haben.`}),`
`,e.jsx(i.h3,{children:"Die Kernkonzepte"}),`
`,e.jsx(i.p,{children:`Die ersten vier Abschnitte haben geklärt, was eine Ableitung überhaupt ist,
sobald Ein- und Ausgabe keine Zahlen mehr sind.`}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.9.1 (Fünf Begriffe, die bleiben)",id:"env-fuenf-begriffe-die-bleiben",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Die Fréchet-Ableitung"}),` ist eine beschränkte lineare Abbildung
`,e.jsx(n,{children:"\\cgreen{D_x f}"}),` mit
`,e.jsx(n,{children:"\\cblue{f(x + h)} = \\cblue{f(x)} + \\cgreen{D_x f(h)} + \\cred{o(\\left\\|h\\right\\|)}"}),`
(`,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),"). Linear ist die Abhängigkeit von ",e.jsx(n,{children:"h"}),`, nicht die
von der Stelle `,e.jsx(n,{children:"x"})," (",e.jsx(i.a,{href:"#env-was-hier-eigentlich-linear-ist",children:"Bemerkung 10.1.4"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Der ",e.jsx(v,{id:"gradient",children:"Gradient"})]}),` sammelt die
`,e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"}),` einer skalarwertigen Funktion
als `,e.jsx(i.em,{children:"Zeile"})," (",e.jsx(i.a,{href:"#env-gradient",children:"Definition 10.2.1"}),`); transponiert zeigt er in die Richtung des
stärksten Anstiegs (`,e.jsx(i.a,{href:"#env-richtung-des-staerksten-anstiegs",children:"Satz 10.2.4"}),`), und daran hängt der
`,e.jsx(v,{id:"gradient-descent",children:"Gradientenabstieg"})," (",e.jsx(i.a,{href:"#env-gradient-gradientenabstieg",children:"Algorithmus 10.2.10"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Die Jacobimatrix"})," stapelt diese Zeilen (",e.jsx(i.a,{href:"#env-jacobimatrix",children:"Definition 10.3.1"}),`); vier
Bausteine (`,e.jsx(i.a,{href:"#env-jacobimatrizen-der-grundbausteine",children:"Satz 10.3.4"}),`) und die Kettenregel als
Matrixprodukt (`,e.jsx(i.a,{href:"#env-kettenregel-fuer-jacobimatrizen",children:"Satz 10.3.9"}),`) reichen für fast jede
Rechnung dieses Kapitels.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Skalar zu Matrix"}),` heißt: jeden Eintrag einzeln ableiten und stehen lassen,
wo er steht (`,e.jsx(i.a,{href:"#env-ableitung-einer-matrixwertigen-funktion",children:"Definition 10.4.1"}),`); für Spur,
Determinante und Inverse eines quadratischen `,e.jsx(n,{children:"\\cblue{\\bF(x)}"}),` gibt es
geschlossene Formeln (`,e.jsx(i.a,{href:"#env-identitaeten-fuer-skalar-zu-matrix",children:"Satz 10.4.4"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Matrix zu Skalar"}),` läuft ebenfalls eintragsweise, und der Ableitungsterm
ist das Frobenius-Skalarprodukt (`,e.jsx(i.a,{href:"#env-ableitung-nach-einer-matrix",children:"Definition 10.4.7"}),`,
`,e.jsx(i.a,{href:"#env-der-ableitungsterm-ist-ein-skalarprodukt",children:"Bemerkung 10.4.8"}),`); drei Identitäten decken
die häufigsten Fälle ab (`,e.jsx(i.a,{href:"#env-identitaeten-fuer-matrix-zu-skalar",children:"Satz 10.4.10"}),")."]}),`
`]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Zwei Anordnungen laufen dabei nebeneinander her. Solange nur Skalare und
Vektoren beteiligt sind, gilt: pro Ausgabekomponente eine Zeile, pro
Eingabevariable eine Spalte. Sobald eine Matrix als Eingabe oder als Ausgabe
auftritt, sortieren wir die Ableitungen dagegen so, dass ihr Format erhalten
bleibt (`,e.jsx(i.a,{href:"#env-das-format-bleibt-erhalten",children:"Bemerkung 10.4.2"}),`); der Ableitungsterm entsteht dann nicht als
Matrixprodukt, sondern im Fall Matrix zu Skalar über die Spur
(`,e.jsx(i.a,{href:"#env-der-ableitungsterm-ist-ein-skalarprodukt",children:"Bemerkung 10.4.8"}),`). Einzeln ausrechnen müssen wir die partiellen Ableitungen
nur dann, wenn wir die lineare Näherung nicht schon auf anderem Weg haben.
Finden wir irgendeine Matrix `,e.jsx(n,{children:"\\bM"}),` mit
`,e.jsx(n,{children:"\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\cgreen{\\bM\\bh} + \\cred{o(\\left\\|\\bh\\right\\|)}"}),`,
so ist sie bereits die Jacobimatrix (`,e.jsx(i.a,{href:"#env-die-matrix-der-linearen-naeherung",children:"Lemma 10.3.3"}),`). Ausmultiplizieren ist oft
kürzer als Ableiten.`]}),`
`,e.jsxs(i.p,{children:[`Die zweite Kapitelhälfte hat geklärt, wie wir mit diesem Begriff rechnen. Vier
Bausteine sind dabei entstanden, und alle vier gehen auf dieselbe Gleichung
zurück, auf die lineare Approximation aus `,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),"."]}),`
`,e.jsx(q,{kind:"Bemerkung",label:"10.9.2 (Vier Bausteine, die bleiben)",id:"env-vier-bausteine-die-bleiben",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Eigenschaften"})," (",e.jsx(i.a,{href:"#sec-10.5",children:"Abschnitt 10.5"}),`). Differenzierbar zieht stetig nach sich
(`,e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),`), umgekehrt nicht
(`,e.jsx(i.a,{href:"#env-die-betragsfunktion-am-nullpunkt",children:"Beispiel 10.5.3"}),`). Die Zuordnung
`,e.jsx(n,{children:"f \\mapsto \\cgreen{D_{\\bx} f}"}),` ist linear
(`,e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),`), in jedem der fünf Formate
(`,e.jsx(i.a,{href:"#env-fuenf-spezialfaelle-derselben-aussage",children:"Bemerkung 10.5.6"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rechenregeln"})," (",e.jsx(i.a,{href:"#sec-10.6",children:"Abschnitt 10.6"}),`). Die Produktregel gilt für jede
beschränkte bilineare Multiplikation (`,e.jsx(i.a,{href:"#env-produktregel",children:"Satz 10.6.3"}),`), die Kettenregel ist
ohne Koordinaten schlicht eine `,e.jsx(v,{id:"function-composition",children:"Verkettung"}),`
(`,e.jsx(i.a,{href:"#env-kettenregel",children:"Satz 10.6.7"}),`) und in Koordinaten ein Matrixprodukt
(`,e.jsx(i.a,{href:"#env-kettenregel-fuer-jacobimatrizen",children:"Satz 10.3.9"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Ableitungen höheren Grades"})," (",e.jsx(i.a,{href:"#sec-10.7",children:"Abschnitt 10.7"}),"). Die ",e.jsx(n,{children:"j"}),`-te
Ableitung ist die lineare Näherung an die Änderung der `,e.jsx(n,{children:"(j-1)"}),`-ten
(`,e.jsx(i.a,{href:"#env-k-mal-frechet-differenzierbar",children:"Definition 10.7.1"}),"). Für ",e.jsx(n,{children:"f \\in \\Ccal^2"}),` mit
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` ist die zweite Stufe die
`,e.jsx(v,{id:"hessian-matrix",children:"Hesse-Matrix"})," (",e.jsx(i.a,{href:"#env-hesse-matrix",children:"Definition 10.7.3"}),`,
`,e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),`); sie ist symmetrisch
(`,e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),`), ihre Definitheit entscheidet im kritischen Punkt
über Minimum, Maximum und Sattel (`,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`)
und überall über `,e.jsx(v,{id:"convexity",children:"Konvexität"}),`
(`,e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"}),`). In der Statistik steht dort
die Fisher-Information (`,e.jsx(i.a,{href:"#env-fisher-informationsmatrix",children:"Definition 10.7.14"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Taylorapproximation"})," (",e.jsx(i.a,{href:"#sec-10.8",children:"Abschnitt 10.8"}),`). Das
`,e.jsx(v,{id:"taylor-theorem",children:"Taylorpolynom"})," schmiegt sich bis zur ",e.jsx(n,{children:"k"}),`-ten Ableitung an
(`,e.jsx(i.a,{href:"#env-taylorpolynom",children:"Definition 10.8.1"}),`); für den Fehler gibt es das Lagrange-Restglied und
die Ordnungsaussage (`,e.jsx(i.a,{href:"#env-taylorentwicklung-i",children:"Satz 10.8.2"}),`), und dieselbe Aussage trägt bis
in Banachräume (`,e.jsx(i.a,{href:"#env-taylorentwicklung-ii",children:"Satz 10.8.7"}),"). Für ",e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),` stehen in
den ersten beiden Ordnungen Gradient und Hesse-Matrix
(`,e.jsx(i.a,{href:"#env-taylorapproximation-fuer-vektor-zu",children:"Korollar 10.8.9"}),`), geometrisch Tangentialebene und
Quadrik (`,e.jsx(i.a,{href:"#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),`); der stationäre Punkt der Quadrik ist der
Newton-Schritt (`,e.jsx(i.a,{href:"#env-newton-raphson-verfahren",children:"Algorithmus 10.8.11"}),", ",e.jsx(i.a,{href:"#env-drei-vorbehalte",children:"Bemerkung 10.8.12"}),")."]}),`
`]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Die meisten Beweise dieser vier Abschnitte folgen demselben Muster. Wir setzen die
Definition für jeden Baustein einzeln ein, sortieren die entstehenden Terme nach
Bauart und zeigen, dass alles außerhalb des Kandidaten
`,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"})," ist. So entstehen ",e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),`, die Produktregel,
die Kettenregel und die Hesse-Formel in `,e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),". ",e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),` kommt mit
weniger aus, denn dort gibt es gar keinen Kandidaten: Wir schätzen beide
Zusatzterme nach oben ab und lassen `,e.jsx(n,{children:"\\bh"}),` gegen null gehen. Das Rechnen
mit Landau-Symbolen ist deshalb kein Beiwerk, sondern das eigentliche
Handwerkszeug (`,e.jsx(i.a,{href:"#env-gross-o-und-klein-o-fuer-kleine",children:"Bemerkung 10.5.1"}),`). Weisen wir den Kandidaten zusätzlich als
linear und beschränkt nach, so ist `,e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),` erfüllt, und mehr braucht
es für Produkt- und Kettenregel nicht. Zweimal kommt ein Zusatzargument dazu, im
letzten Schritt zu `,e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"})," und in Schritt 4 zu ",e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),`: Zwei lineare
Abbildungen, die sich nur um `,e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|)}"}),` unterscheiden, sind
gleich. Aus dem Muster fallen der Satz von Schwarz und die eindimensionale
Taylorentwicklung heraus, denn beide brauchen einen
`,e.jsx(v,{id:"mean-value-theorem",children:"Mittelwertsatz"}),"; der allgemeine ",e.jsx(i.a,{href:"#env-taylorentwicklung-ii",children:"Satz 10.8.7"}),` verwendet
statt einer skalaren Zwischenstelle die Integralform des Restglieds.`]}),`
`,e.jsxs(xe,{title:"Weitere Ableitungsformate und praktische Nachschlagewege",children:[e.jsx(i.h3,{children:"Was wir ausgelassen haben"}),e.jsxs(q,{kind:"Bemerkung",label:"10.9.3 (Die drei leeren Felder)",id:"env-die-drei-leeren-felder",children:[e.jsxs(i.p,{children:["In der Übersicht aus ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` sind drei Zellen leer
geblieben: Matrix zu Vektor, Vektor zu Matrix und Matrix zu Matrix. Sie fehlen
nicht, weil sie schwierig wären, sondern weil ihre Ableitungen aus dem
Matrixschema herausfallen. Zählen wir nach. Eine Funktion
`,e.jsx(n,{children:"f\\colon \\R^{m \\times n} \\to \\R^{p \\times q}"})," hat ",e.jsx(n,{children:"m n p q"}),` partielle
Ableitungen, jede davon adressiert durch zwei Indizes für die Eingabe und zwei
für die Ausgabe. Ordentlich sortiert ergibt das ein Zahlenfeld mit vier
Indexpositionen, also einen `,e.jsx(v,{id:"tensor",children:"Tensor"})," der Stufe ",e.jsx(n,{children:"4"}),`
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.2",children:"Abschnitt 9.2"}),"). Für ",e.jsx(n,{children:"2 \\times 2"}),`-Matrizen auf beiden
Seiten sind das `,e.jsx(n,{children:"16"})," Zahlen in ",e.jsx(n,{children:"\\R^{2 \\times 2 \\times 2 \\times 2}"}),`. Bei den
gemischten Fällen Vektor zu Matrix und Matrix zu Vektor bleiben drei
Indexpositionen übrig.`]}),e.jsxs(i.p,{children:[`Gebraucht werden diese Fälle seltener als die sechs ausgefüllten Zellen, und wo
sie doch auftreten, gibt es zwei Wege. Entweder wir rechnen mit Tensoren
weiter, oder wir klopfen alles flach und stapeln jede Matrix zu einem Vektor:
Dafür stehen die Vektorisierung und das Kroneckerprodukt aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.5",children:"Abschnitt 9.5"}),` bereit, die eine Matrixgleichung in ein
gewöhnliches `,e.jsx(v,{id:"linear-system",children:"lineares Gleichungssystem"})," verwandeln."]})]}),e.jsxs(i.p,{children:["Eine zweite Lücke ist keine Formatfrage. ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"})," lässt für ",e.jsx(n,{children:"\\D"}),` und
`,e.jsx(n,{children:"\\E"}),` beliebige normierte Vektorräume zu, also auch Räume von Funktionen. Ableitungen
von Abbildungen zwischen Funktionenräumen bleiben hier eine Übungsaufgabe. Der
Begriff trägt dorthin, doch die Beschränktheit von `,e.jsx(n,{children:"\\cgreen{D_x f}"}),` ist dann
keine Formalie mehr, sondern eine echte Zusatzbedingung (`,e.jsx(i.a,{href:"#env-linearisierung-wie-die-definition-zu-lesen-ist",children:"Bemerkung 10.1.6"}),")."]}),e.jsx(i.h3,{children:"Ableiten in eine Richtung"}),e.jsxs(q,{kind:"Bemerkung",label:"10.9.4 (Störungsanalyse als Richtungsableitung)",id:"env-stoerungsanalyse-als-richtungsableitung",children:[e.jsxs(i.p,{children:[`Ein Werkzeug lohnt den Nachtrag, weil es die Matrixfälle auf den
eindimensionalen zurückführt. Wollen wir wissen, wie empfindlich eine
Matrixrechnung auf eine Störung reagiert, so halten wir eine Störungsrichtung
`,e.jsx(n,{children:"\\bE"})," fest und betrachten die Funktion einer einzigen reellen Variablen"]}),e.jsx(o,{children:"\\varphi(h) := \\cblue{f(\\bX + h\\bE)} ."}),e.jsxs(i.p,{children:["Ableiten nach dem Skalar ",e.jsx(n,{children:"h"})," an der Stelle ",e.jsx(n,{children:"h = 0"}),` liefert genau den
Ableitungsterm in Richtung `,e.jsx(n,{children:"\\bE"}),", für skalarwertiges ",e.jsx(n,{children:"f"})," also"]}),e.jsx(o,{children:`\\varphi'(0) = \\cgreen{D_{\\bX} f(\\bE)}
= \\tr\\Biggl(\\corange{\\biggl(\\frac{\\partial f(\\bX)}{\\partial \\bX}\\biggr)^{\\!\\top}}\\bE\\Biggr) .`}),e.jsxs(i.p,{children:["Nachzurechnen ist das schnell: Setzen wir ",e.jsx(n,{children:"\\bH = h\\bE"})," in ",e.jsx(i.a,{href:"#eq-ableitung-nach-einer-matrix-2",children:"(10.4.7)"}),` ein, so
zieht die Linearität den Faktor heraus,
`,e.jsx(n,{children:"\\cgreen{D_{\\bX} f(h\\bE)} = h\\,\\cgreen{D_{\\bX} f(\\bE)}"}),`, und der Restterm ist
`,e.jsx(n,{children:"\\cred{o(\\left|h\\right|)}"}),", weil ",e.jsx(n,{children:"\\left\\|h\\bE\\right\\| = \\left|h\\right|\\left\\|\\bE\\right\\|"}),`
gilt. Das ist dieselbe Idee wie die Richtungsableitung aus `,e.jsx(i.a,{href:"#env-richtungsableitung",children:"Definition 10.2.3"}),`,
nur mit einer Matrix als Richtung. Anders als dort verlangen wir von `,e.jsx(n,{children:"\\bE"}),` keine
Länge `,e.jsx(n,{children:"1"}),`; deshalb steht „Richtung" hier in Anführungszeichen. Rechnen
wir ein kleines Beispiel nach. Für
`,e.jsx(n,{children:"\\cblue{f(\\bX)} = \\left\\|\\bX\\right\\|_F^2"}),` mit
`,e.jsx(n,{children:"\\bX = \\bigl(\\begin{smallmatrix} 1 & 2 \\\\ 3 & 4 \\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"\\bE = \\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"\\varphi(h) = \\cblue{30} + \\cgreen{4h} + \\cred{h^2}"}),", also ",e.jsx(n,{children:"\\varphi'(0) = 4"}),`,
und das ist der Eintrag `,e.jsx(n,{children:"(1,2)"})," von ",e.jsx(n,{children:"\\corange{2\\bX}"})," nach ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-matrix-zu-skalar-3",children:"(10.4.12)"}),`. Diese
Wahl von `,e.jsx(n,{children:"\\bE"})," ist gerade das ",e.jsx(n,{children:"\\bE_{ij}"})," aus ",e.jsx(i.a,{href:"#env-der-ableitungsterm-ist-ein-skalarprodukt",children:"Bemerkung 10.4.8"}),`, das Anstupsen
eines einzelnen Eintrags; beliebige `,e.jsx(n,{children:"\\bE"})," stupsen alle Einträge zugleich an."]}),e.jsxs(i.p,{children:["Für die Praxis lesen wir das als Störungsanalyse: ",e.jsx(n,{children:"\\bE"}),` gibt an, wohin gestört
wird, und `,e.jsx(n,{children:"\\varphi'(0)"}),` misst in erster Ordnung, wie stark diese Störung im
Ergebnis ankommt. Über alle Störungsrichtungen zugleich beschränken die
`,e.jsx(v,{id:"condition-number",children:"Konditionszahlen"}),` aus
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`, wie stark ein relativer Datenfehler
anwachsen kann.`]})]}),e.jsx(i.h3,{children:"Zum Nachschlagen"}),e.jsxs(i.p,{children:[`Die Identitäten dieses Kapitels sind eine kleine Auswahl. Brauchen wir eine
Ableitung, die hier nicht steht, so schlagen wir sie besser nach, statt sie neu
herzuleiten. Das `,e.jsx(i.em,{children:"Matrix Cookbook"}),` von
`,e.jsx(i.a,{href:"https://archive.org/details/imm3274",children:"Petersen und Pedersen (2012)"}),` sammelt die
Formeln, die in Anwendungen tatsächlich vorkommen, von Determinanten und
Inversen bis zu Spur- und Normausdrücken. Eine Warnung gehört dazu: Die
Konventionen unterscheiden sich zwischen den Quellen, und dieselbe Formel steht
je nach Zeilen- oder Spaltenkonvention transponiert (`,e.jsx(i.a,{href:"#env-zeilenvektor-nicht-spaltenvektor",children:"Bemerkung 10.2.2"}),`). Bei
rechteckigen Formaten fällt das schon beim Nachzählen von Zeilen und Spalten
auf. Bei quadratischen passt die transponierte Fassung genauso gut, und dann
hilft nur eine numerische Probe an einem kleinen Beispiel.`]}),e.jsx(Me,{children:e.jsxs($,{wahr:!0,children:[e.jsx(i.p,{children:`Die Ableitung einer matrixwertigen Funktion nach einer Matrix passt im
Allgemeinen in kein rechteckiges Zahlenschema mehr.`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f\\colon \\R^{m \\times n} \\to \\R^{p \\times q}"})," entstehen ",e.jsx(n,{children:"m n p q"}),` partielle
Ableitungen mit vier Indexpositionen, also ein Tensor der Stufe `,e.jsx(n,{children:"4"}),`
(`,e.jsx(i.a,{href:"#env-die-drei-leeren-felder",children:"Bemerkung 10.9.3"}),`). Deshalb bleiben die drei Zellen der
Übersicht aus `,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` leer. Wer den Fall braucht, rechnet mit Tensoren
oder stapelt die Matrizen per Vektorisierung zu Vektoren um
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.5",children:"Abschnitt 9.5"}),")."]})]})})]}),`
`,e.jsx(i.h3,{children:"Das Wichtigste in Kürze"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Abschnitt"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Was bleibt"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.1",children:"10.1"})}),e.jsx(i.td,{children:"Ableitung als lineare Approximation"}),e.jsxs(i.td,{children:["Fréchet-Ableitung auf normierten Räumen: ",e.jsx(n,{children:"\\cblue{f(x+h)} = \\cblue{f(x)} + \\cgreen{D_x f(h)} + \\cred{r(h)}"})," mit linearem, beschränktem ",e.jsx(n,{children:"\\cgreen{D_x f}"})," und einem Restterm ",e.jsx(n,{children:"\\cred{r(h)}"}),", der schneller verschwindet als ",e.jsx(n,{children:"h"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.2",children:"10.2"})}),e.jsx(i.td,{children:"Der Gradient"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} \\in \\R^{1 \\times n}"})," als Zeile der partiellen Ableitungen; Richtung des stärksten Anstiegs; Gradientenabstieg"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.3",children:"10.3"})}),e.jsx(i.td,{children:"Die Jacobimatrix"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} \\in \\R^{m \\times n}"})," mit Gradienten als Zeilen; Kettenregel als Matrixprodukt; Backpropagation als Auswertung von links"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.4",children:"10.4"})}),e.jsx(i.td,{children:"Ableitungen mit Matrizen"}),e.jsx(i.td,{children:"eintragsweise Ableitungen für Skalar zu Matrix und Matrix zu Skalar; Spur, Jacobi-Formel, Inverse; Frobenius-Skalarprodukt als Ableitungsterm"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.5",children:"10.5"})}),e.jsx(i.td,{children:"Stetigkeit und Linearität"}),e.jsxs(i.td,{children:["Differenzierbar zieht stetig nach sich, nicht umgekehrt; die Ableitungsoperation ",e.jsx(n,{children:"f \\mapsto \\cgreen{D_{\\bx} f}"})," ist linear, in jedem der fünf Formate aus den Abschnitten ",e.jsx(i.a,{href:"#sec-10.1",children:"10.1"})," bis ",e.jsx(i.a,{href:"#sec-10.4",children:"10.4"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.6",children:"10.6"})}),e.jsx(i.td,{children:"Produkt- und Kettenregel"}),e.jsxs(i.td,{children:["Produktregel für jede beschränkte bilineare Multiplikation ",e.jsx(n,{children:"\\inner{\\cdot, \\cdot}"}),"; Kettenregel als Verkettung ",e.jsx(n,{children:"\\cgreen{D_{\\by} g} \\circ \\cgreen{D_{\\bx} f}"}),", in Koordinaten ein Matrixprodukt"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.7",children:"10.7"})}),e.jsx(i.td,{children:"Ableitungen höheren Grades"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cgreen{D^j_{\\bx} f}"})," als multilineare Abbildung; Hesse-Matrix ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx)}"}),", Satz von Schwarz, Definitheit im kritischen Punkt trennt lokales Minimum, Maximum und Sattel, entscheidet aber nichts, wenn sie semidefinit und nicht definit ist"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.a,{href:"#sec-10.8",children:"10.8"})}),e.jsx(i.td,{children:"Taylorapproximation"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{f(\\bx + \\bh)} = \\cblue{f(\\bx)} + \\corange{\\nabla f(\\bx)}\\bh + \\tfrac{1}{2}\\bh^\\top \\corange{\\bH_f(\\bx)}\\bh + \\cred{r(\\bh)}"})," mit einem Rest, der schneller verschwindet als die letzte mitgenommene Potenz; Newton bestimmt den stationären Punkt der Quadrik"]})]})]})]}),`
`,e.jsx(i.h3,{children:"Nächstes Kapitel"}),`
`,e.jsxs(i.p,{children:[`Offen geblieben ist eine Frage, die in diesem Kapitel zweimal aufgetaucht ist,
ohne dass wir sie beantwortet hätten: Wann ist ein lokaler Befund auch ein
globaler? `,e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"})," verknüpft die ",e.jsx(v,{id:"convexity",children:"Konvexität"}),` mit der positiven
Semidefinitheit der Hesse-Matrix, zieht daraus aber keinen Schluss über globale
Minima. Und `,e.jsx(i.a,{href:"#env-drei-vorbehalte",children:"Bemerkung 10.8.12"}),` nennt als ersten Vorbehalt des Newton-Verfahrens,
dass ein kritischer Punkt eben noch kein Minimum ist.`]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(v,{id:"convexity",children:"konvexe Funktionen"}),` lautet die Antwort „immer", und das ändert die Lage
grundlegend. Jeder kritische Punkt ist dann ein globales Minimum, Sattelpunkte
gibt es keine, und ein Abstiegsverfahren kann nirgends an der falschen Stelle
hängenbleiben. Damit bekommen `,e.jsx(v,{id:"optimization",children:"Optimierungsverfahren"}),` Garantien
statt Faustregeln. Das `,e.jsx(i.a,{href:"?k=11-konvexitaet#sec-11.1",children:"nächste Kapitel"}),` nimmt
sich die Konvexität deshalb als eigenes Thema vor.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(i.p,{children:[`Zwei Runden. In der ersten stehen sechs Aussagen zum Ableitungsbegriff und zu den
Formaten aus den Abschnitten `,e.jsx(i.a,{href:"#sec-10.1",children:"10.1"})," bis ",e.jsx(i.a,{href:"#sec-10.4",children:"10.4"}),`, dazu eine Frage, die sich nur an
einem Widget dieser Abschnitte beantworten lässt. Welche Aussagen stimmen?`]}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"g\\colon \\R^n \\to \\R^m"})," und ",e.jsx(n,{children:"f\\colon \\R^m \\to \\R"}),` gilt
`,e.jsx(n,{children:"\\nabla (f \\circ g)(\\bx) = \\nabla f(g(\\bx))\\,\\bJ_g(\\bx)"}),`, ganz ohne
Transponierte.`]}),e.jsxs(i.p,{children:["Genau dafür ist der Gradient eine Zeile (",e.jsx(i.a,{href:"#env-zeilenvektor-nicht-spaltenvektor",children:"Bemerkung 10.2.2"}),`): Das Produkt einer
`,e.jsx(n,{children:"1 \\times m"}),"-Zeile mit einer ",e.jsx(n,{children:"m \\times n"}),`-Matrix ist wieder eine Zeile, und für
`,e.jsx(n,{children:"m = 1"})," ist der Gradient der Sonderfall der Jacobimatrix (",e.jsx(i.a,{href:"#env-die-zeilen-sind-gradienten",children:"Bemerkung 10.3.2"}),`).
Zahlenprobe mit `,e.jsx(n,{children:"g(\\bx) = \\bA\\bx"}),`,
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\end{smallmatrix}\\bigr)"}),`
und `,e.jsx(n,{children:"f(\\by) = \\left\\|\\by\\right\\|^2"}),": In ",e.jsx(n,{children:"\\bx = (1,2,3)^\\top"}),` ist
`,e.jsx(n,{children:"\\bA\\bx = (5, 11)^\\top"}),`, also
`,e.jsx(n,{children:"\\nabla f(\\bA\\bx)\\,\\bA = 2(5,11)\\bA = (10, 42, 66)"}),`. Direkt ausgerechnet ist
`,e.jsx(n,{children:"f(g(\\bx)) = \\bx^\\top\\bA^\\top\\bA\\bx"})," mit Gradient ",e.jsx(n,{children:"2\\bx^\\top\\bA^\\top\\bA"}),` nach
`,e.jsx(i.a,{href:"#env-gradient-der-quadratischen-form",children:"Satz 10.2.8"}),", dessen Symmetrieforderung ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` erfüllt. Das ergibt
dieselbe Zeile.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Forderung in ",e.jsx(i.a,{href:"#env-frechet-ableitung",children:"Definition 10.1.5"}),", dass ",e.jsx(n,{children:"\\cgreen{D_x f}"}),` beschränkt sein soll,
ist überflüssig, denn lineare Abbildungen sind ohnehin beschränkt.`]}),e.jsxs(i.p,{children:[`In endlich-dimensionalen Räumen stimmt das, dort kostet die Forderung nichts
(`,e.jsx(i.a,{href:"#env-linearisierung-wie-die-definition-zu-lesen-ist",children:"Bemerkung 10.1.6"}),`). Im Unendlichdimensionalen ist sie eine echte
Zusatzbedingung. Auf dem Raum der
Polynome auf `,e.jsx(n,{children:"[0,1]"}),` mit der Supremumsnorm etwa ist das Ableiten
`,e.jsx(n,{children:"p \\mapsto p'"})," linear, aber unbeschränkt: Für ",e.jsx(n,{children:"p_n(x) = x^n"}),` ist
`,e.jsx(n,{children:"\\left\\|p_n\\right\\|_\\infty = 1"}),", während ",e.jsx(n,{children:"p_n'(x) = n x^{n-1}"})," die Norm ",e.jsx(n,{children:"n"}),` hat.
Genau deshalb bleiben Abbildungen zwischen Funktionenräumen in diesem Kapitel
außen vor.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"f(\\bx) = \\bx^\\top\\bA"})," mit ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times m}"}),` ist
`,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\bA"}),"."]}),e.jsxs(i.p,{children:["Richtig ist ",e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\bA^\\top"})," nach ",e.jsx(i.a,{href:"#env-jacobimatrizen-der-grundbausteine",children:"Satz 10.3.4"}),`(4), gelesen über
`,e.jsx(n,{children:"(\\bx^\\top\\bA)^\\top = \\bA^\\top\\bx"})," (",e.jsx(i.a,{href:"#env-zur-identitaet-fuer-x-a",children:"Bemerkung 10.3.5"}),"). Für ",e.jsx(n,{children:"n \\neq m"}),` verraten
schon die Formate den Fehler: `,e.jsx(n,{children:"f"})," bildet von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^m"}),` ab, die
Jacobimatrix ist also `,e.jsx(n,{children:"m \\times n"}),", während ",e.jsx(n,{children:"\\bA"})," das Format ",e.jsx(n,{children:"n \\times m"}),` hat.
Bei `,e.jsx(n,{children:"n = m"}),` passt die falsche Antwort formal, dort fällt sie erst beim
Nachrechnen auf. Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 3 & -1 \\end{smallmatrix}\\bigr) \\in \\R^{3 \\times 2}"}),`
ist `,e.jsx(n,{children:"\\corange{\\bJ_f(\\bx)} = \\bigl(\\begin{smallmatrix} 1 & 0 & 3 \\\\ 2 & 1 & -1 \\end{smallmatrix}\\bigr)"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für differenzierbares ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{n \\times n}"}),` gilt
`,e.jsx(n,{children:"\\partial \\det(\\cblue{\\bF(x)}) / \\partial x = \\det(\\corange{\\partial \\bF(x)/\\partial x})"}),"."]}),e.jsxs(i.p,{children:[`Die Determinante ist nicht linear, Ableiten und Auswerten lassen sich hier also
nicht vertauschen. Für `,e.jsx(n,{children:"\\cblue{\\bF(x)} = \\diag(x, 2x)"}),` ist
`,e.jsx(n,{children:"\\det(\\cblue{\\bF(x)}) = 2x^2"})," mit Ableitung ",e.jsx(n,{children:"4x"}),`, während
`,e.jsx(n,{children:"\\det(\\corange{\\partial \\bF(x)/\\partial x}) = \\det(\\diag(1,2)) = 2"}),` konstant
ist. Beide stimmen nur zufällig bei `,e.jsx(n,{children:"x = 0{,}5"}),` überein. Richtig ist die
Jacobi-Formel `,e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix-2",children:"(10.4.4)"}),", die den Faktor ",e.jsx(n,{children:"\\det(\\cblue{\\bF(x)})"}),` und die Spur
mitführt; für die `,e.jsx(v,{id:"trace",children:"Spur"})," dagegen dürfen wir vertauschen ",e.jsx(i.a,{href:"#eq-identitaeten-fuer-skalar-zu-matrix",children:"(10.4.3)"}),`,
denn sie ist linear.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für feste ",e.jsx(n,{children:"\\ba \\in \\R^m"})," und ",e.jsx(n,{children:"\\bb \\in \\R^n"})," mit ",e.jsx(n,{children:"\\ba, \\bb \\neq \\bnull"}),` ist
`,e.jsx(n,{children:"\\corange{\\partial (\\ba^\\top\\bX\\bb) / \\partial \\bX} = \\ba\\bb^\\top"}),`, und diese
Matrix hat den Rang `,e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:["Die Formel ist ",e.jsx(i.a,{href:"#eq-ableitung-von-f-x-a-xb",children:"(10.4.9)"}),`, und rechts steht ein
`,e.jsx(v,{id:"outer-product",children:"äußeres Produkt"}),", das nach ",e.jsx(i.a,{href:"?k=09-tensoren#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),`
(`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.3",children:"Abschnitt 9.3"}),") für Vektoren ",e.jsx(n,{children:"\\neq \\bnull"}),` genau den
Rang `,e.jsx(n,{children:"1"})," hat. Für ",e.jsx(n,{children:"\\ba = (1,2)^\\top"})," und ",e.jsx(n,{children:"\\bb = (3,-1)^\\top"}),` ist
`,e.jsx(n,{children:"\\ba\\bb^\\top = \\bigl(\\begin{smallmatrix} 3 & -1 \\\\ 6 & -2 \\end{smallmatrix}\\bigr)"}),`
mit Determinante `,e.jsx(n,{children:"0"}),"; die zweite Zeile ist das Doppelte der ersten."]})]}),e.jsxs(We,{loesung:0,toleranz:.03,children:[e.jsxs(i.p,{children:["Im Gradienten-Widget aus ",e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),": Wir drehen ",e.jsx(n,{children:"\\bd"}),` so, dass die
Richtung längs der Höhenlinie zeigt. Welchen Wert nimmt die Richtungsableitung
`,e.jsx(n,{children:"\\nabla f(\\bx)\\bd"})," dann an?"]}),e.jsxs(i.p,{children:["Null. Entlang der Höhenlinie ändert sich ",e.jsx(n,{children:"f"}),` in erster Ordnung nicht, und genau
deshalb steht der Gradient senkrecht auf ihr (`,e.jsx(i.a,{href:"#env-der-gradient-steht-senkrecht-auf-der",children:"Bemerkung 10.2.5"}),`). Im Schnitt
rechts liegt die grüne Gerade dann waagerecht.`]})]})]}),`
`,e.jsxs(i.p,{children:["Die zweite Runde nimmt sich die Abschnitte ",e.jsx(i.a,{href:"#sec-10.5",children:"10.5"})," bis ",e.jsx(i.a,{href:"#sec-10.8",children:"10.8"}),` vor: acht Aussagen zu
Eigenschaften, Rechenregeln, Hesse-Matrix und Taylor.`]}),`
`,e.jsxs(Me,{children:[e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Existieren in ",e.jsx(n,{children:"\\bx"})," alle ",e.jsx(v,{id:"partial-derivative",children:"partiellen Ableitungen"}),` von
`,e.jsx(n,{children:"f\\colon \\R^n \\to \\R"}),", so ist ",e.jsx(n,{children:"f"})," dort differenzierbar."]}),e.jsx(i.p,{children:`Die Existenz der partiellen Ableitungen sagt nur etwas über die Koordinatenrichtungen
aus. Für`}),e.jsx(o,{children:`f(\\bx) = \\frac{x_1 x_2}{x_1^2 + x_2^2} \\ \\ \\text{für } \\bx \\neq \\bnull ,
\\qquad f(\\bnull) = 0`}),e.jsxs(i.p,{children:["verschwindet ",e.jsx(n,{children:"f"}),` auf beiden Achsen, also existieren im Nullpunkt beide partiellen
Ableitungen und sind `,e.jsx(n,{children:"0"}),". Auf der Diagonalen ",e.jsx(n,{children:"x_1 = x_2 = t"})," ist ",e.jsx(n,{children:"f"}),` dagegen
konstant `,e.jsx(n,{children:"0{,}5"})," und auf ",e.jsx(n,{children:"x_2 = -x_1"})," konstant ",e.jsx(n,{children:"-0{,}5"}),`, für jedes noch so kleine
`,e.jsx(n,{children:"t \\neq 0"}),". Damit ist ",e.jsx(n,{children:"f"})," in ",e.jsx(n,{children:"\\bnull"}),` nicht einmal stetig und nach der
Kontraposition von `,e.jsx(i.a,{href:"#env-stetigkeit-aus-differenzierbarkeit",children:"Satz 10.5.2"}),` erst recht nicht differenzierbar
(`,e.jsx(i.a,{href:"#env-die-merkregel-und-ihre-kontraposition",children:"Bemerkung 10.5.4"}),"). Sind die partiellen Ableitungen dagegen ",e.jsx(i.em,{children:"stetig"}),", so ist ",e.jsx(n,{children:"f"}),`
differenzierbar; davon lebt Schritt 3 im Beweis zu `,e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"}),"."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für in ",e.jsx(n,{children:"\\bx"})," differenzierbare ",e.jsx(n,{children:"f, g\\colon \\R^n \\to \\R"}),` gilt
`,e.jsx(n,{children:"\\corange{\\nabla (f g)(\\bx)} = \\cblue{g(\\bx)}\\,\\corange{\\nabla f(\\bx)} + \\cblue{f(\\bx)}\\,\\corange{\\nabla g(\\bx)}"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-produktregel",children:"Satz 10.6.3"}),` mit der Multiplikation zweier Zahlen als bilinearer
Abbildung, die wegen `,e.jsx(n,{children:"\\left|uv\\right| = \\left|u\\right|\\left|v\\right|"}),` die
Schranke `,e.jsx(n,{children:"K = 1"})," hat (",e.jsx(i.a,{href:"#env-beispiele-und-warum-die-schranke-selten",children:"Bemerkung 10.6.2"}),", Punkt 2 mit ",e.jsx(n,{children:"m = 1"}),`). Beide Summanden sind Zeilenvektoren,
skaliert mit einer Zahl. Zahlenprobe mit `,e.jsx(n,{children:"\\cblue{f(\\bx)} = x_1^2 + x_2"}),` und
`,e.jsx(n,{children:"\\cblue{g(\\bx)} = e^{x_1}x_2"})," an der Stelle ",e.jsx(n,{children:"\\bx = (0{,}4;\\ -0{,}7)^\\top"}),`: Dort
ist `,e.jsx(n,{children:"\\cblue{f} = -0{,}54"})," und ",e.jsx(n,{children:"\\cblue{g} = -1{,}0443"}),`, und beide Wege liefern
`,e.jsx(n,{children:"\\corange{\\nabla(fg)} = (-0{,}2715;\\ -1{,}8499)"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bF\\colon \\R \\to \\R^{n \\times n}"})," und ",e.jsx(n,{children:"g\\colon \\R^{n\\times n} \\to \\R"}),` ist
`,e.jsx(n,{children:"\\partial (g \\circ \\bF)(x) / \\partial x"}),` das Matrixprodukt
`,e.jsx(n,{children:"\\corange{\\left(\\partial g(\\bY)/\\partial \\bY\\right)^\\top}\\,\\corange{\\partial \\bF(x)/\\partial x}"}),`
an der Stelle `,e.jsx(n,{children:"\\bY = \\cblue{\\bF(x)}"}),"."]}),e.jsxs(i.p,{children:[`Links steht eine Zahl, rechts eine Matrix. Es fehlt die
`,e.jsx(v,{id:"trace",children:"Spur"}),": Nach der fünften Bauform in ",e.jsx(i.a,{href:"#env-die-kettenregel-in-fuenf-bauformen",children:"Beispiel 10.6.8"}),` ist die Ableitung
`,e.jsx(n,{children:"\\tr\\bigl(\\corange{(\\partial g/\\partial \\bY)^\\top}\\,\\corange{\\partial \\bF(x)/\\partial x}\\bigr)"}),`,
denn die Fréchet-Ableitung einer
skalaren Funktion mit Matrixargument wirkt über das Frobenius-Skalarprodukt
(`,e.jsx(i.a,{href:"#env-der-ableitungsterm-ist-ein-skalarprodukt",children:"Bemerkung 10.4.8"}),`). Nachgerechnet mit
`,e.jsx(n,{children:"\\cblue{g(\\bY)} = \\left\\|\\bY\\right\\|_F^2"}),` und
`,e.jsx(n,{children:"\\cblue{\\bF(x)} = \\bigl(\\begin{smallmatrix} x & 1 \\\\ 0 & e^x\\end{smallmatrix}\\bigr)"}),`:
Direkt ist `,e.jsx(n,{children:"\\cblue{g(\\bF(x))} = x^2 + 1 + e^{2x}"})," mit Ableitung ",e.jsx(n,{children:"2x + 2e^{2x}"}),`,
bei `,e.jsx(n,{children:"x = 0{,}3"})," also ",e.jsx(n,{children:"4{,}2442"}),`. Das Matrixprodukt ist dort
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 0{,}6 & 0 \\\\ 2 & 3{,}6442 \\end{smallmatrix}\\bigr)"}),`,
und erst seine Spur ergibt `,e.jsx(n,{children:"4{,}2442"}),"."]})]}),e.jsxs($,{wahr:!1,children:[e.jsx(i.p,{children:`Der Satz von Schwarz gilt für jede Funktion, deren zweite partielle Ableitungen
existieren.`}),e.jsxs(i.p,{children:["Er verlangt zusätzlich deren Stetigkeit, also ",e.jsx(n,{children:"f \\in \\Ccal^2"})," (",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),`).
Schon für die Einträge der Hesse-Matrix reicht bloße Differenzierbarkeit nicht
(`,e.jsx(i.a,{href:"#env-hesse-matrix",children:"Definition 10.7.3"}),"). Das Standardgegenbeispiel ist"]}),e.jsx(o,{children:`f(\\bx) = \\frac{x_1 x_2 \\left(x_1^2 - x_2^2\\right)}{x_1^2 + x_2^2}
\\ \\ \\text{für } \\bx \\neq \\bnull , \\qquad f(\\bnull) = 0 .`}),e.jsxs(i.p,{children:["Auf den Achsen lässt sich alles ausrechnen: ",e.jsx(n,{children:"\\partial f(0, x_2)/\\partial x_1 = -x_2"}),`
und `,e.jsx(n,{children:"\\partial f(x_1, 0)/\\partial x_2 = x_1"}),`. Einmal mehr abgeleitet ergibt das im
Nullpunkt die beiden Werte `,e.jsx(n,{children:"-1"})," und ",e.jsx(n,{children:"+1"}),`, je nach Reihenfolge. Die Hesse-Matrix
ist dort also nicht symmetrisch, und alles, was auf ihrer Symmetrie aufbaut, von
`,e.jsx(i.a,{href:"#env-erste-und-zweite-ableitung-in",children:"Satz 10.7.6"})," bis zum Spektralsatz-Argument in ",e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`, steht ohne Stetigkeit
in der Luft.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bx^*"})," ein kritischer Punkt von ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," mit ",e.jsx(n,{children:"S \\subseteq \\R^2"}),`
offen und gilt `,e.jsx(n,{children:"\\det \\corange{\\bH_f(\\bx^*)} < 0"}),", so ist ",e.jsx(n,{children:"\\bx^*"}),` ein
Sattelpunkt.`]}),e.jsxs(i.p,{children:[`Die Determinante ist das Produkt der beiden Eigenwerte, und die sind reell, weil
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx^*)}"})," nach ",e.jsx(i.a,{href:"#env-satz-von-schwarz",children:"Satz 10.7.4"}),` symmetrisch ist. Ein negatives Produkt
lässt nur eine Möglichkeit: ein positiver und ein negativer Eigenwert, also eine
indefinite Hesse-Matrix und damit `,e.jsx(i.a,{href:"#env-hesse-kriterium-fuer-kritische-punkte",children:"Satz 10.7.9"}),`(3). Beispiel ist die Funktion
`,e.jsx(n,{children:"f(\\bx) = x_1^2 + 3x_1x_2 + 2x_2^2"}),` aus dem Gradientenfeld-Widget in
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"}),` mit
`,e.jsx(n,{children:"\\corange{\\bH_f} = \\bigl(\\begin{smallmatrix} 2 & 3 \\\\ 3 & 4\\end{smallmatrix}\\bigr)"}),`,
Determinante `,e.jsx(n,{children:"-1"})," und Eigenwerten ",e.jsx(n,{children:"3 \\pm \\sqrt{10}"}),", also ",e.jsx(n,{children:"6{,}162"}),` und
`,e.jsx(n,{children:"-0{,}162"}),". Ab ",e.jsx(n,{children:"n = 3"}),` trägt das Vorzeichen der Determinante nicht mehr:
`,e.jsx(n,{children:"\\diag(-1,-1,-1)"})," hat ebenfalls Determinante ",e.jsx(n,{children:"-1"}),`, ist aber negativ definit und
zeigt ein Maximum an.`]})]}),e.jsxs($,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil der Restterm der quadratischen Näherung ",e.jsx(n,{children:"\\cred{o(\\left\\|\\bh\\right\\|^2)}"}),`
ist, fällt er beim Halbieren von `,e.jsx(n,{children:"\\bh"})," höchstens auf ein Viertel."]}),e.jsxs(i.p,{children:["Eine ",e.jsx(n,{children:"o"}),`-Aussage beschreibt einen Grenzwert und verspricht über einzelne Schritte
gar nichts. Schon im Eindimensionalen: Die Funktion
`,e.jsx(n,{children:"\\cred{r(h)} = h^3\\bigl(2 + \\sin(1/h)\\bigr)"}),`
erfüllt `,e.jsx(n,{children:"\\left|\\cred{r(h)}\\right|/h^2 \\le 3\\left|h\\right| \\to 0"}),`, ist also
`,e.jsx(n,{children:"\\cred{o(\\left|h\\right|^2)}"}),". Bei ",e.jsx(n,{children:"h = 0{,}095"}),` steht trotzdem
`,e.jsx(n,{children:"\\left|\\cred{r(h/2)}\\right| / \\left|\\cred{r(h)}\\right| = 0{,}317"}),`. Die Faustregel
„ein Achtel", die das Widget in `,e.jsx(i.a,{href:"#sec-10.8",children:"Abschnitt 10.8"}),` misst, stützt sich
nicht auf die `,e.jsx(n,{children:"o"}),"-Aussage, sondern auf das Lagrange-Restglied ",e.jsx(i.a,{href:"#eq-taylorentwicklung-i-2",children:"(10.8.3)"}),` mit
beschränkter dritter Ableitung.`]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\cblue{f(\\bx)} = \\tfrac{1}{2}\\bx^\\top\\bA\\bx - \\bb^\\top\\bx"}),` mit symmetrischem,
`,e.jsx(v,{id:"positive-definite",children:"positiv definitem"})," ",e.jsx(n,{children:"\\bA"}),` landet der Newton-Schritt
`,e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"}),` aus jedem Startpunkt in der Lösung des
`,e.jsx(v,{id:"linear-system",children:"Gleichungssystems"})," ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),"."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-gradient-einer-quadratischen-form",children:"Beispiel 10.6.5"})," mit ",e.jsx(n,{children:"\\bA = \\bA^\\top"}),", ",e.jsx(i.a,{href:"#env-jacobimatrizen-der-grundbausteine",children:"Satz 10.3.4"}),`(3) für den linearen Term
und der Linearität aus `,e.jsx(i.a,{href:"#env-linearitaet-der-ableitungsoperation",children:"Satz 10.5.5"}),` ist
`,e.jsx(n,{children:"\\corange{\\nabla f(\\bx)} = \\bx^\\top\\bA - \\bb^\\top"}),`, und
`,e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} = \\bA"})," ist konstant. Eingesetzt in ",e.jsx(i.a,{href:"#eq-newton-raphson-verfahren",children:"(10.8.7)"}),` gibt das
`,e.jsx(n,{children:"\\bx^{(1)} = \\bx^{(0)} - \\bA^{-1}\\bigl(\\bA\\bx^{(0)} - \\bb\\bigr) = \\bA^{-1}\\bb"}),`,
unabhängig vom Start. Zahlenprobe mit
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 1 & 3\\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"\\bb = (1, 2)^\\top"}),": Von ",e.jsx(n,{children:"(5, -4)^\\top"}),", von ",e.jsx(n,{children:"\\bnull"}),` und von
`,e.jsx(n,{children:"(-13{,}7;\\ 8{,}2)^\\top"}),` aus steht nach einem Schritt jeweils exakt
`,e.jsx(n,{children:"(0{,}2;\\ 0{,}6)^\\top"})," da. Der Grund ist ",e.jsx(i.a,{href:"#env-ebene-und-quadrik",children:"Bemerkung 10.8.10"}),`: Bei einer
quadratischen Funktion ist `,e.jsx(n,{children:"\\cgreen{T_2} = \\cblue{f}"}),`, das Verfahren minimiert
also die Funktion selbst. Gerechnet wird der Schritt als Gleichungssystem und
nicht über die Inverse, bei positiv definitem `,e.jsx(n,{children:"\\bA"}),` per Cholesky-Zerlegung
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),")."]})]}),e.jsxs($,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"f \\in \\Ccal^2(S)"})," auf einer offenen, konvexen Menge ",e.jsx(n,{children:"S"}),` konvex, so ist jeder
kritische Punkt von `,e.jsx(n,{children:"f"})," ein globales Minimum auf ",e.jsx(n,{children:"S"}),"."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-konvexitaet-und-positive-semidefinitheit",children:"Satz 10.7.11"})," ist ",e.jsx(n,{children:"\\corange{\\bH_f(\\bx)} \\succeq 0"})," für alle ",e.jsx(n,{children:"\\bx \\in S"}),`. Sei
`,e.jsx(n,{children:"\\bx^*"})," kritisch und ",e.jsx(n,{children:"\\by \\in S"})," beliebig. Weil ",e.jsx(n,{children:"S"}),` konvex ist, liegt die
Strecke dazwischen ganz in `,e.jsx(n,{children:"S"}),`, und wir betrachten
`,e.jsx(n,{children:"\\varphi(t) := \\cblue{f(\\bx^* + t(\\by - \\bx^*))}"})," für ",e.jsx(n,{children:"t \\in [0,1]"}),`. Die
Kettenregel gibt `,e.jsx(n,{children:"\\varphi'(0) = \\corange{\\nabla f(\\bx^*)}(\\by - \\bx^*) = 0"}),` und
`,e.jsx(n,{children:"\\varphi''(t) = (\\by - \\bx^*)^\\top \\corange{\\bH_f\\bigl(\\bx^* + t(\\by - \\bx^*)\\bigr)} (\\by - \\bx^*) \\ge 0"}),`. Also ist
`,e.jsx(n,{children:"\\varphi'"})," nichtfallend und ab ",e.jsx(n,{children:"t = 0"}),` nichtnegativ, damit
`,e.jsx(n,{children:"\\varphi(1) \\ge \\varphi(0)"}),`, und das heißt
`,e.jsx(n,{children:"\\cblue{f(\\by)} \\ge \\cblue{f(\\bx^*)}"}),`. Sattelpunkte kann es aus demselben Grund
nicht geben. Darauf beruht der Ausblick auf das nächste Kapitel.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: MML §5.7 behandelt die höheren Ableitungen, §5.8 die Linearisierung
und die multivariaten Taylorreihen, und §5.9 sammelt weiterführende Literatur zur
Matrixdifferentialrechnung. Die Konvexität und die Verfahren, die auf ihr
aufbauen, stehen in MML §7.3; der Gradientenabstieg aus
`,e.jsx(i.a,{href:"#sec-10.2",children:"Abschnitt 10.2"})," steht dort in §7.1 daneben."]})})]})}function gl(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Dt,{...r})}):Dt(r)}const pl={sections:[{id:"10.1",key:"linearisierung",title:"Ableitung als lineare Approximation",C:Ye(Ht)},{id:"10.2",key:"gradient",title:"Der Gradient: Vektor zu Skalar",C:Ye(ns)},{id:"10.3",key:"jacobi",title:"Die Jacobimatrix: Vektor zu Vektor",C:Ye(os)},{id:"10.4",key:"matrixableitungen",title:"Ableitungen mit Matrizen",C:Ye(_s)},{id:"10.5",key:"stetigkeit",title:"Stetigkeit und Linearität",C:Ye(Es)},{id:"10.6",key:"produkt-kettenregel",title:"Produkt- und Kettenregel",C:Ye(Hs)},{id:"10.7",key:"hoehere-ableitungen",title:"Ableitungen höheren Grades",C:Ye(Os)},{id:"10.8",key:"taylor",title:"Taylorapproximation",C:Ye(bl)},{id:"10.9",key:"zusammenfassung",title:"Zusammenfassung",C:Ye(gl)}]};export{pl as default};
