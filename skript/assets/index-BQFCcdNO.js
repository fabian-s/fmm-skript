import{r as P,j as e,A as ue,F as ee,M as n,S as ne,V as he,g as Y,d as xe,L as He,C as c,E as k,b as _,G as L,h as tn,P as me,o as F,Q as Re,i as M,n as Cs,p as Xn,q as li,z as Si,e as Zs,f as Os,m as _e}from"./index-BGJgxqST.js";import{I as ae,E as H}from"./Interaktiv-Bbglsg7Y.js";import{C as Hs}from"./ConceptFlow-DHzg4T41.js";const{blau:Wi,gruen:Vi,rot:Ti,grau:qe,hellgrau:Li}=ee,_i=210,rn=150,Gn=24,Us=8,Js=10,Ci=18,pe=s=>Gn+s*(_i-Gn-Us),ke=s=>rn-Ci-s*(rn-Ci-Js),Bi=.28,ve=s=>.5+Bi*Math.sin(2*Math.PI*s-.9),Qs=[0,.2,.4,.6,.8,1],Xs=s=>.06*Math.sin(5*Math.PI*s),We=[.042,.125,.208,.292,.375,.458,.542,.625,.708,.792,.875,.958],Ki=[-.245,-.912,-.221,-2.183,.304,1.66,.197,-.441,1.272,1.185,-.348,-.267],Ys=Math.sqrt(Ki.reduce((s,i)=>s+i*i,0)/Ki.length),er=Ki.map(s=>s/Ys),dn=Y;function yn(s){const i=[];for(let r=0;r<=120;r++){const l=r/120,t=s(l);Number.isFinite(t)&&i.push(`${pe(l).toFixed(1)},${ke(t).toFixed(1)}`)}return i.join(" ")}function nr(){return e.jsxs("g",{children:[e.jsx("line",{x1:pe(0),y1:ke(0),x2:pe(1),y2:ke(0),stroke:Li,strokeWidth:1}),e.jsx("line",{x1:pe(0),y1:ke(0),x2:pe(0),y2:ke(1),stroke:Li,strokeWidth:1}),e.jsx("text",{x:pe(0),y:rn-5,fontSize:9,fill:qe,textAnchor:"middle",children:"0"}),e.jsx("text",{x:pe(1),y:rn-5,fontSize:9,fill:qe,textAnchor:"middle",children:"1"}),e.jsx("text",{x:pe(.5),y:rn-5,fontSize:9,fill:qe,textAnchor:"middle",children:"x"}),e.jsx("text",{x:Gn-4,y:ke(0)+3,fontSize:9,fill:qe,textAnchor:"end",children:"0"}),e.jsx("text",{x:Gn-4,y:ke(1)+3,fontSize:9,fill:qe,textAnchor:"end",children:"1"}),e.jsx("text",{x:Gn-4,y:ke(.5)+3,fontSize:9,fill:qe,textAnchor:"end",children:"y"})]})}function di({titel:s,formula:i,beschreibung:r,children:l}){return e.jsxs("div",{className:"w-[210px] max-w-full min-w-0 grow-0",children:[e.jsx("p",{className:"mb-1 text-center text-sm font-medium",children:s}),e.jsxs("svg",{viewBox:`0 0 ${_i} ${rn}`,width:_i,height:rn,className:"h-auto w-full rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",role:"img","aria-label":r,children:[e.jsx(nr,{}),l]}),e.jsx("p",{className:"mt-1 text-center text-sm",children:e.jsx(n,{children:i})})]})}function ir(){const[s,i]=P.useState(.07),r=We.map((d,h)=>ve(d)+s*er[h]),l=Math.sqrt(r.reduce((d,h,x)=>d+(h-ve(We[x]))**2,0)/We.length),t=r.reduce((d,h,x)=>Math.abs(h-ve(We[x]))>d.d?{d:Math.abs(h-ve(We[x])),x:We[x]}:d,{d:0,x:0}),a=s>0&&l<.1*Bi;return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Schieben wir das Rauschen auf null und vergleichen die drei Aufgaben."}),e.jsx("div",{className:"pb-1",children:e.jsxs("div",{className:"mx-auto flex flex-wrap items-start justify-center gap-4",children:[e.jsxs(di,{titel:"Approximation",formula:"\\left\\|f - \\wh{f}\\right\\| \\text{ möglichst klein}",beschreibung:"Approximation: die wahre Funktion grau gestrichelt, der Approximant grün leicht daneben, keine Datenpunkte.",children:[e.jsx("polyline",{points:yn(ve),fill:"none",stroke:qe,strokeWidth:1.5,strokeDasharray:"5 3"}),e.jsx("polyline",{points:yn(d=>ve(d)+.045*Math.sin(4*Math.PI*d+1)),fill:"none",stroke:Vi,strokeWidth:2})]}),e.jsxs(di,{titel:"Interpolation",formula:"\\wh{f}(x_i) = y_i \\ \\ \\forall i",beschreibung:"Interpolation: der grüne Interpolant trifft die sechs blauen Knoten exakt, weicht dazwischen aber sichtbar von der grauen wahren Funktion ab.",children:[e.jsx("polyline",{points:yn(ve),fill:"none",stroke:qe,strokeWidth:1.5,strokeDasharray:"5 3"}),e.jsx("polyline",{points:yn(d=>ve(d)+Xs(d)),fill:"none",stroke:Vi,strokeWidth:2}),Qs.map(d=>e.jsx("circle",{cx:pe(d),cy:ke(ve(d)),r:3.5,fill:Wi},d))]}),e.jsxs(di,{titel:"Glättung",formula:"y_i = f(x_i) + \\eps_i \\ \\ \\forall i",beschreibung:`Glättung: zwölf blaue Beobachtungen streuen mit σ = ${dn(s,3)} um die graue wahre Funktion; rote Strecken markieren die Abstände.`,children:[e.jsx("polyline",{points:yn(ve),fill:"none",stroke:qe,strokeWidth:1.5,strokeDasharray:"5 3"}),s>0&&We.map((d,h)=>e.jsx("line",{x1:pe(d),y1:ke(ve(d)),x2:pe(d),y2:ke(r[h]),stroke:Ti,strokeWidth:1.5},`r${d}`)),We.map((d,h)=>e.jsx("circle",{cx:pe(d),cy:ke(r[h]),r:3.5,fill:Wi},d))]})]})}),e.jsxs("p",{className:"mt-2 text-sm",children:["Grau gestrichelt läuft die Funktion ",e.jsx(n,{children:"f"}),", die wir treffen wollen, grün unser ",e.jsx(n,{children:"\\wh{f}"}),", blau die Datenpunkte.",s>0?e.jsxs(e.Fragment,{children:[" ","In der Tafel „Glättung“ sind die roten Strecken die Fehler"," ",e.jsx(n,{children:"\\eps_i"}),"."]}):e.jsxs(e.Fragment,{children:[" ","In der Tafel „Glättung“ liegen bei ",e.jsx(n,{children:"\\sigma = 0"})," alle Beobachtungen auf ",e.jsx(n,{children:"f"}),", rote Strecken gibt es keine."]})," ","Eine aus diesen Punkten geschätzte grüne Kurve ist dort bewusst noch nicht eingezeichnet."]}),e.jsx(ne,{label:"σ (Rauschen)",value:s,onChange:i,min:0,max:.12,step:.005,fmt:d=>dn(d,3)}),e.jsx(he,{className:"mt-1",kind:s===0?"ok":a?"neutral":"warn",children:s===0?"Bei σ = 0 liegen alle zwölf Punkte exakt auf der wahren Funktion. Dann sind die Funktionswerte rauschfrei und dürfen interpoliert werden.":e.jsxs(e.Fragment,{children:["Mittlerer Abstand der Punkte zur wahren Funktion (quadratisches Mittel):"," ",e.jsx("span",{className:"font-mono",children:dn(l,3)}),", der größte Einzelabstand"," ",e.jsx("span",{className:"font-mono",style:{color:Ti},children:dn(t.d,3)})," ","bei ",e.jsxs("span",{className:"font-mono",children:["x = ",dn(t.x,3)]}),"."," ",a?`Das Rauschen ist klein gegen die Signalamplitude ${dn(Bi,2)}: Eine Kurve durch alle Punkte kostet hier wenig, richtig ist sie trotzdem nicht mehr.`:"Solange σ groß genug ist, um die Punkte sichtbar von f wegzuziehen, wäre eine Kurve durch alle Punkte die falsche Antwort, denn sie würde das Rauschen mitzeichnen."]})})]})}const sr=[{id:"span",label:["Basis & Span"],kicker:"Kap. 1",x:105,y:44,w:140,group:"anker",href:"?k=01-intro"},{id:"fraum",label:["Funktionenräume"],x:380,y:40,w:155,group:"fa1"},{id:"gs",label:["Gram-Schmidt / QR"],kicker:"Kap. 7",x:640,y:44,w:165,group:"anker",href:"?k=07-kq"},{id:"fbasis",label:["Basen von","Funktionenräumen"],x:380,y:142,w:170,group:"fa1"},{id:"fapprox",label:["Basisdarstellung","f̂(x) = Σₖ aₖ φₖ(x)"],x:380,y:248,w:175,group:"fa1"},{id:"kond",label:["Kondition"],kicker:"Kap. 4",x:230,y:148,w:120,group:"anker",href:"?k=04-fehler"},{id:"lgsn",label:["Gleichungssysteme"],kicker:"Kap. 5",x:105,y:248,w:165,group:"anker",href:"?k=05-lgs"},{id:"poly",label:["Polynominterpolation"],x:205,y:352,w:185,group:"fa1"},{id:"spline",label:["Splines"],x:520,y:352,w:110,group:"fa1"},{id:"runge",label:["Runge-Phänomen"],x:115,y:445,w:160,group:"fa1"},{id:"bspline",label:["B-Splines"],x:400,y:445,w:120,group:"fa1"},{id:"natspline",label:["Natürliche kubische","Splines"],x:640,y:450,w:175,group:"fa1"},{id:"kq",label:["Kleinste Quadrate"],kicker:"Kap. 7",x:95,y:545,w:160,group:"anker",href:"?k=07-kq"},{id:"smooth",label:["Glättung /","Regressionssplines"],x:290,y:550,w:175,group:"fa2"},{id:"tpk9",label:["TP-Basis &","TP-Designmatrix"],kicker:"Kap. 9",x:480,y:552,w:160,group:"anker",href:"?k=09-tensoren"},{id:"kruemm",label:["Krümmungsarmheit"],x:655,y:545,w:170,group:"fa2"},{id:"biasvar",label:["Bias-Varianz-","Abwägung"],x:130,y:655,w:145,group:"fa2"},{id:"gam",label:["Additive Modelle","(GAMs)"],x:310,y:655,w:155,group:"fa2"},{id:"tps",label:["Tensorprodukt-","Splines"],x:490,y:655,w:150,group:"fa2"},{id:"fluch",label:["Fluch der Dimension"],x:490,y:748,w:180,group:"fa2"}],rr=[{from:"span",to:"fbasis"},{from:"fraum",to:"fbasis"},{from:"gs",to:"fbasis"},{from:"fbasis",to:"fapprox"},{from:"fapprox",to:"poly"},{from:"fapprox",to:"spline"},{from:"lgsn",to:"poly"},{from:"kond",to:"poly"},{from:"poly",to:"runge"},{from:"spline",to:"bspline"},{from:"spline",to:"natspline"},{from:"natspline",to:"kruemm"},{from:"kq",to:"smooth"},{from:"bspline",to:"smooth"},{from:"smooth",to:"biasvar"},{from:"smooth",to:"gam"},{from:"bspline",to:"tps"},{from:"tpk9",to:"tps"},{from:"tps",to:"fluch"}];function tr(){return e.jsx(Hs,{ariaLabel:`Konzeptkarte von ${xe("kap:funktionsapproximation")}: von Basen und Funktionenräumen über Interpolation und Splines zu Glättung, Bias-Varianz-Abwägung und Tensorprodukt-Splines.`,nodes:sr,edges:rr,groups:[{key:"anker",label:`Anker aus ${xe("kap:intro")}–9`,color:ee.gruen},{key:"fa1",label:"Interpolationsstrang",color:ee.orange},{key:"fa2",label:"Glättungsstrang und Multivariates",color:ee.violett}],openLabel:"Kapitel öffnen"})}const{blau:lr,gruen:As,rot:Zi}=ee,Oi=[0,1,2],dr=[1,2,5],ar=s=>1+s*s,hr=s=>s<0||s>2?NaN:s<=1?s+1:3*s-1,cr=s=>s**3-2*s*s+2*s+1,or=s=>1+s*s+.5*Math.sin(2*Math.PI*s),ai=[{name:"Parabel",formel:"\\wh{f}_1(x) = 1 + x^2",f:ar,dash:[]},{name:"stückweise linear",formel:"\\wh{f}_2",f:hr,dash:[7,4]},{name:"kubisch",formel:"\\wh{f}_3(x) = x^3 - 2x^2 + 2x + 1",f:cr,dash:[2,3]},{name:"vogelwild",formel:"\\wh{f}_4(x) = 1 + x^2 + 0{,}5\\sin(2\\pi x)",f:or,dash:[10,3,2,3]}],hi=Y;function xr({dash:s}){return e.jsx("svg",{width:56,height:12,viewBox:"0 0 56 12",className:"h-3 w-14 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:6,x2:55,y2:6,stroke:As,strokeWidth:2,strokeDasharray:s.length?s.join(" "):void 0})})}function ur({zeigeSpanne:s=!0}={}){const[i,r]=P.useState([!0,!0,!0,!0]),[l,t]=P.useState(1),a=ai.filter((p,y)=>i[y]),d=a.map(p=>({f:p.f,color:As,dash:p.dash})),h=a.map(p=>p.f(l)).filter(p=>Number.isFinite(p)),x=h.length?Math.max(...h):NaN,m=h.length?Math.min(...h):NaN,b=h.length>=2?x-m:NaN,f=Oi.some(p=>Math.abs(p-l)<1e-9),g=Oi.map((p,y)=>({x:p,y:dr[y],color:lr}));return Number.isFinite(b)&&b>1e-9&&(g.push({x:l,y:m,color:Zi}),g.push({x:l,y:x,color:Zi})),e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Schätzen wir zuerst die größte Spanne und schieben dann x* zwischen zwei Stützstellen."}),e.jsx("div",{className:"mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm",children:ai.map((p,y)=>e.jsxs("label",{className:"inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap",children:[e.jsx("input",{type:"checkbox",checked:i[y],onChange:S=>r(i.map((z,o)=>o===y?S.target.checked:z))}),e.jsx(xr,{dash:p.dash}),e.jsx("span",{children:p.name})]},p.name))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx(He,{xLabel:"x",yLabel:"y",series:d,markers:g,xDomain:[-.15,2.15],yDomain:[-.5,6.5],width:360,height:250}),e.jsxs("div",{className:"text-sm",children:[e.jsx(ne,{label:"x*",value:l,onChange:t,min:0,max:2,step:.05,fmt:p=>hi(p,2)}),e.jsx("table",{className:"mt-2 border-collapse text-left",children:e.jsx("tbody",{children:ai.map((p,y)=>{const S=p.f(l);return e.jsxs("tr",{className:i[y]?"":"opacity-40",children:[e.jsx("td",{className:"py-0.5 pr-3",children:e.jsx(n,{children:`\\wh{f}_${y+1}(x^{\\ast})`})}),e.jsx("td",{className:"py-0.5 font-mono",children:Number.isFinite(S)?hi(S):"nicht definiert"})]},p.name)})})}),e.jsx(he,{kind:h.length<2?"warn":f?"ok":"neutral",children:h.length<2?"Zum Vergleichen brauchen wir mindestens zwei eingeschaltete Kurven.":f?"Spanne 0: x* ist eine Stützstelle, dort sind alle Interpolanten gleich.":s?e.jsxs(e.Fragment,{children:["Nicht festgelegt: Die Spanne bei x* beträgt"," ",e.jsx("span",{className:"font-mono",children:hi(b)}),"; die roten Punkte markieren sie. Nach ",xe("satz:gestalt-aller-interpolanten")," bleiben alle Kurven an den Stützstellen gebunden, dazwischen nicht."]}):e.jsxs(e.Fragment,{children:["Nicht festgelegt: Zwischen zwei Stützstellen laufen die vier Kurven auseinander, die roten Punkte markieren den Abstand. Nach"," ",xe("satz:gestalt-aller-interpolanten")," bleiben alle Kurven an den Stützstellen gebunden, dazwischen nicht."]})})]})]})]})}function Hi(s){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Mit diesem Kapitel beginnt der dritte Block des Skripts
(`,e.jsx(i.a,{href:"?k=01-intro#sec-1.1",children:"Abschnitt 1.1"}),"). Die Aufgabe: Gegeben sind ",e.jsx(n,{children:"n"}),` Datenpunkte
`,e.jsx(n,{children:"\\cblue{(x_1, y_1), \\dots, (x_n, y_n)}"})," mit paarweise verschiedenen ",e.jsx(n,{children:"x_i"}),`,
gesucht ist eine Funktion `,e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),`, die zu ihnen passt. Manchmal
stammen die Punkte nicht aus einer Messung, sondern sind Auswertungen einer
bekannten Funktion `,e.jsx(n,{children:"f"}),`, die zu teuer ist, um sie an beliebig vielen Stellen
auszurechnen.`]}),`
`,e.jsxs(ae,{title:"Konzeptkarte des Kapitels",children:[e.jsx(i.p,{children:`Die Karte zeigt, wie die Begriffe dieses Kapitels zusammenhängen und auf
welche Bausteine aus dem ersten Teil des Skripts sie zurückgreifen; beim
ersten Lesen genügt der Gesamteindruck.`}),e.jsx(tr,{}),e.jsx(i.p,{children:`Ein ausgewählter Begriff hebt seine Voraussetzungen und Folgerungen hervor;
verlinkte Kästen führen zum zugehörigen Kapitel.`})]}),`
`,e.jsx(i.h3,{children:"Vorkenntnisse"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Lineare Gleichungssysteme ",e.jsx(n,{children:"\\bB\\ba = \\by"}),` und ihre Lösbarkeit
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`); jede Interpolationsaufgabe dieses Kapitels endet in einem
solchen System.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(c,{id:"condition-number",children:"Konditionszahl"}),` einer Matrix
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),", ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`); sie
entscheidet ab `,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),", welches Basissystem brauchbar ist."]}),`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"basis",children:"Basen"})," und ",e.jsx(c,{id:"linear-independence",children:"lineare Unabhängigkeit"}),`,
diesmal in einem `,e.jsx(c,{id:"vector-space",children:"Vektorraum"})," aus Funktionen."]}),`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"polynomial",children:"Polynome"}),` samt Grad und Monombasis,
`,e.jsx(c,{id:"continuity",children:"Stetigkeit"}),", ",e.jsx(c,{id:"differentiability",children:"Differenzierbarkeit"}),`
und stückweise definierte Funktionen.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"norm",children:"Normen"})," (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),`), vor allem die
`,e.jsx(i.em,{children:"Supremumsnorm"})," ",e.jsx(n,{children:"\\|g\\|_\\infty = \\sup_{x \\in [a,b]} |g(x)|"}),` einer Funktion
`,e.jsx(n,{children:"g"})," auf ",e.jsx(n,{children:"[a, b]"}),"; für stetiges ",e.jsx(n,{children:"g"})," ist das der größte Betrag, den ",e.jsx(n,{children:"g"}),` dort
annimmt.`]}),`
`]}),`
`,e.jsx(i.h3,{children:"Drei Varianten desselben Wunsches"}),`
`,e.jsxs(i.p,{children:[`„Passt" lässt sich auf drei Weisen verlangen. Alle drei Aufgaben liefern am
Ende ein `,e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),", verlangen aber sehr Verschiedenes von ihm."]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.1.1 (Approximationsproblem)",id:"env-approximationsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien eine Funktion ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"[a, b]"}),", eine Norm ",e.jsx(n,{children:"\\|\\cdot\\|"}),` auf
einem Funktionenraum, der `,e.jsx(n,{children:"f"}),` enthält, und eine vorgegebene, einfacher
handhabbare Klasse `,e.jsx(n,{children:"\\mathcal A"}),` von Funktionen. Gesucht ist ein
`,e.jsx(n,{children:"\\cgreen{\\wh{f}} \\in \\mathcal A"}),", das den Abstand zu ",e.jsx(n,{children:"f"}),` minimiert oder dem
bestmöglichen Abstand wenigstens nahekommt:`]}),e.jsx(_,{children:`\\left\\| f - \\cgreen{\\wh{f}} \\right\\|
\\approx \\inf_{g \\in \\mathcal A} \\left\\| f-g \\right\\| .`}),e.jsxs(i.p,{children:["Die Bedingung ist global: ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," soll ",e.jsx(n,{children:"f"})," überall auf ",e.jsx(n,{children:"[a, b]"}),`
nahekommen, muss es aber an keiner einzigen Stelle exakt treffen. Ist
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," ein Minimierer, gilt Gleichheit."]})]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.1.2 (Interpolationsproblem)",id:"env-interpolationsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien Datenpunkte ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit
paarweise verschiedenen `,e.jsx(n,{children:"x_i"}),". Gesucht ist ein ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," mit"]}),e.jsx(L,{tag:"13.1.1",id:"eq-interpolationsproblem",children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}, \\qquad i = 1, \\dots, n ."}),e.jsxs(i.p,{children:["Jede Funktion mit dieser Eigenschaft heißt ",e.jsx(i.em,{children:"Interpolant"}),` (interpolant) der
Daten, die `,e.jsx(n,{children:"x_i"})," heißen ",e.jsx(i.em,{children:"Stützstellen"}),` (nodes). Die Bedingung ist punktweise
und exakt: An den `,e.jsx(n,{children:"n"})," Stützstellen muss ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` die Werte treffen, zwischen
ihnen ist alles erlaubt.`]})]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.1.3 (Glättungsproblem)",id:"env-glaettungsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien Datenpunkte ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, die aus
einer unbekannten Funktion `,e.jsx(n,{children:"f"})," und Fehlern entstanden sind:"]}),e.jsx(_,{children:"\\cblue{y_i} = f(x_i) + \\cred{\\eps_i}, \\qquad i = 1, \\dots, n ."}),e.jsxs(i.p,{children:["Gesucht ist eine Schätzung ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," von ",e.jsx(n,{children:"f"}),`, die das Signal trifft,
statt jeden beobachteten Fehler mitzuzeichnen. Die `,e.jsx(n,{children:"\\cred{\\eps_i}"}),` sind in
aller Regel Zufallsvariablen; die Residuen
`,e.jsx(n,{children:"\\cblue{y_i}-\\cgreen{\\wh{f}(x_i)}"}),` sind dagegen aus den Daten berechenbare
Abweichungen und nicht mit den unbeobachteten Fehlern gleichzusetzen.`]})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.1.4 (Daten oder Funktion?)",id:"env-daten-oder-funktion",children:e.jsxs(i.p,{children:[`Die Interpolationsbedingung wird mal als
`,e.jsx(n,{children:"f(x_i) = \\cgreen{\\wh{f}(x_i)}"}),` geschrieben, mal als
`,e.jsx(n,{children:"\\cblue{y_i} = \\cgreen{\\wh{f}(x_i)}"}),`; bei rauschfreien Daten, also
`,e.jsx(n,{children:"\\cblue{y_i} = f(x_i)"}),", ist das dasselbe. Bei der Glättung ist ",e.jsx(n,{children:"f"}),` unbekannt,
nur die verrauschten `,e.jsx(n,{children:"\\cblue{y_i}"}),` liegen vor. Wir schreiben deshalb
durchgehend `,e.jsx(n,{children:"\\cblue{y_i}"})," und sagen dazu, ob ",e.jsx(n,{children:"\\cblue{y_i} = f(x_i)"}),` gelten
soll.`]})}),`
`,e.jsxs(ae,{title:"Die drei Aufgaben nebeneinander",children:[e.jsx(i.p,{children:"Wann wird aus Glättung wieder Interpolation? Wir variieren dafür nur das Rauschen."}),e.jsx(ir,{}),e.jsxs(i.p,{children:["Bei der Approximation darf ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` überall ein wenig danebenliegen,
bei der Interpolation nirgends an den Knoten und dazwischen beliebig. Nur bei
`,e.jsx(n,{children:"\\sigma = 0"})," fallen Glättung und Interpolation zusammen."]})]}),`
`,e.jsx(i.h3,{children:"Wie die drei Aufgaben zusammenhängen"}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.1.5 (Approximation über Interpolation)",id:"env-approximation-ueber-interpolation",children:[e.jsxs(i.p,{children:[`Ein wichtiger Weg zu einer Approximation führt über Interpolation: Wir
werten `,e.jsx(n,{children:"f"})," an endlich vielen Stellen ",e.jsx(n,{children:"x_i"}),` aus und interpolieren die Paare
`,e.jsx(n,{children:"\\cblue{(x_i, f(x_i))}"}),"; aus der Bedingung ",e.jsx(i.a,{href:"#eq-interpolationsproblem",children:"(13.1.1)"}),` wird in
`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` ein lineares Gleichungssystem. Andere Verfahren
minimieren die Norm `,e.jsx(n,{children:"\\|f - \\cgreen{\\wh{f}}\\|"}),` tatsächlich direkt, etwa
Kleinste Quadrate oder eine Minimax-Approximation. Sind die Auswertungen
fehlerbehaftet, tritt an die Stelle der Interpolation ein Glättungsproblem.`]}),e.jsxs(i.p,{children:[`Die Glättung ist die schwierigste der drei Varianten, weil sie entscheiden
muss, welcher Teil der Daten Signal und welcher Rauschen ist, und dafür ein
stochastisches Modell für die `,e.jsx(n,{children:"\\cred{\\eps_i}"}),` braucht. Dieses Kapitel
behandelt deshalb zuerst die Interpolation; die Glättung folgt in
`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Wozu wir das brauchen"}),`
`,e.jsxs(i.p,{children:[`Klassisch sind drei Anlässe. Für eine Grafik brauchen wir eine glatte Kurve
durch eine Punktwolke. Erfordert jede Auswertung von `,e.jsx(n,{children:"f"}),` ein numerisches
Verfahren, etwa bei `,e.jsx(n,{children:"f(x) = \\int_0^x g(y)\\,\\mathrm{d}y"}),` oder
`,e.jsx(n,{children:"f(x) = g^{-1}(x)"}),", ist es billiger, ",e.jsx(n,{children:"f"}),` an wenigen Stellen zu bestimmen und
dazwischen zu interpolieren. Und ein Polynom oder ein Spline lässt sich exakt
differenzieren und integrieren; das Ergebnis dient als Näherung für `,e.jsx(n,{children:"f'"}),`
beziehungsweise `,e.jsx(n,{children:"\\int f"}),"."]}),`
`,e.jsxs(i.p,{children:[`Auch im maschinellen Lernen ist oft von Interpolation die Rede, aber nicht
immer im Sinn von `,e.jsx(c,{id:"env:interpolationsproblem",href:"#env-interpolationsproblem",children:"Definition 13.1.2"}),`. Computergrafik
(Pixelwerte beim Drehen oder Skalieren eines Bildes) und Zeitreihen
(Auffüllen fehlender Werte) sind Interpolation in diesem Sinn.
Latent-Space-Interpolation in generativen Modellen und Positional Encodings
in Transformern sind nur Analogien.`]}),`
`,e.jsx(H,{title:"Interpolation im maschinellen Lernen",children:e.jsxs(k,{kind:"Bemerkung",label:"13.1.6 (Interpolation im maschinellen Lernen, und was nur so aussieht)",id:"env-interpolation-im-maschinellen-lernen-und",children:[e.jsxs(i.p,{children:[`Zwei der vier Anwendungen sind Interpolation im Sinn von
`,e.jsx(c,{id:"env:interpolationsproblem",href:"#env-interpolationsproblem",children:"Definition 13.1.2"}),":"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Computergrafik."}),` Wird ein Bild gedreht oder skaliert, liegen die neuen
Pixelmittelpunkte zwischen den alten. Bilineare und bikubische Verfahren
legen eine Funktion durch die umliegenden Pixelwerte und werten sie an der
neuen Stelle aus.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zeitreihen."}),` Fehlende Werte in Sensor- oder Finanzdaten werden aufgefüllt,
indem eine Kurve durch die vorhandenen Messzeitpunkte gelegt wird.`]}),`
`]}),e.jsx(i.p,{children:"Die beiden anderen sind nur Analogien:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Latent-Space-Interpolation"}),` in VAEs und GANs interpoliert linear zwischen
zwei Codes, `,e.jsx(n,{children:"\\bz(t) = (1-t)\\bz_0 + t\\bz_1"}),`. Das ist Interpolation im
Argumentraum mit `,e.jsx(n,{children:"n = 2"}),` Stützstellen. Über das erzeugte Bild sagt sie
nichts: Ob der Übergang glatt aussieht, hängt am Decoder, nicht an einer
Interpolationsbedingung.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Positional Encodings"}),` wie RoPE werten feste Sinus- und
Kosinusfunktionen an den Token-Positionen aus. Eine Bedingung der Form
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"}),` kommt darin nicht vor; gemeinsam sind
mit unserem Thema nur dieselben Sinus- und Kosinusfunktionen.
Interpolation im engen Sinn taucht dort erst auf, wenn ein trainiertes
Modell auf längere Kontexte umskaliert wird.`]}),`
`]}),e.jsxs(i.p,{children:[`Ein Grenzfall ist die Idee, die feste Aktivierungsfunktion eines
neuronalen Netzes durch eine lernbare, spline-basierte zu ersetzen
(`,e.jsx(i.em,{children:"Kolmogorow-Arnold-Netze"}),"). Die Splines aus ",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` sind
dort das Modell selbst; ihre Koeffizienten
werden allerdings trainiert und nicht aus Interpolationsbedingungen bestimmt.`]})]})}),`
`,e.jsx(i.h3,{children:"Warum die Interpolationsbedingung zu wenig ist"}),`
`,e.jsxs(i.p,{children:["Interpolation stellt ",e.jsx(n,{children:"n"}),` Gleichungen an eine Funktion. Eine Funktion hat
unendlich viele Freiheitsgrade, und deshalb bleibt nach diesen `,e.jsx(n,{children:"n"}),` Gleichungen
sehr viel offen.`]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.1.7 (Vier Interpolanten durch drei Punkte)",id:"env-vier-interpolanten-durch-drei-punkte",children:[e.jsxs(i.p,{children:["Betrachten wir die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0, 1)}"}),", ",e.jsx(n,{children:"\\cblue{(1, 2)}"}),`,
`,e.jsx(n,{children:"\\cblue{(2, 5)}"}),". Die folgenden vier Funktionen interpolieren sie alle:"]}),e.jsx(_,{children:`\\begin{aligned}
\\cgreen{\\wh{f}_1(x)} &= 1 + x^2 , \\\\
\\cgreen{\\wh{f}_2(x)} &= \\begin{cases} x + 1 & x \\in [0, 1] \\\\ 3x - 1 & x \\in [1, 2] \\end{cases} , \\\\
\\cgreen{\\wh{f}_3(x)} &= x^3 - 2x^2 + 2x + 1 , \\\\
\\cgreen{\\wh{f}_4(x)} &= 1 + x^2 + 0{,}5 \\sin(2\\pi x) .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die Probe ist jeweils eine Zeile, für ",e.jsx(n,{children:"\\cgreen{\\wh{f}_1}"}),` etwa
`,e.jsx(n,{children:"1 + 0 = 1"}),", ",e.jsx(n,{children:"1 + 1 = 2"})," und ",e.jsx(n,{children:"1 + 4 = 5"}),", für ",e.jsx(n,{children:"\\cgreen{\\wh{f}_3}"}),` ebenso. Bei
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_4}"})," verschwindet ",e.jsx(n,{children:"\\sin(2\\pi x)"}),` an jeder ganzen Zahl, und
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_2}"}),` ist auf beiden Teilintervallen die Gerade durch die
Endpunkte.`]}),e.jsx(i.p,{children:`Zwischen den Stützstellen sehen die vier Funktionen dagegen völlig
verschieden aus; wie weit sie dort auseinandergehen, legen die drei
Bedingungen nicht fest.`})]}),`
`,e.jsxs(ae,{title:"Vier Interpolanten, ein Datensatz",children:[e.jsx(i.p,{children:"Wie weit können vier Interpolanten, die dieselben drei Punkte treffen, zwischen zwei Stützstellen auseinanderliegen?"}),e.jsx(tn,{frage:"Schätzen wir die größte Spanne auf [0, 2].",loesung:.75,toleranz:.08,einheit:"",verdeckt:e.jsx(i.p,{children:"Bei x = 1,3 liefern die vier Kurven 2,69, 2,90, 2,42 und 3,17, die höchste und die niedrigste trennt dort 0,75. Weiter gehen sie nirgends auseinander: Die größte Spanne ist 0,7499 bei x ≈ 1,288."}),children:({aufgeloest:r})=>e.jsx(ur,{zeigeSpanne:r})}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:gestalt-aller-interpolanten",href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"})," erklärt, warum die Interpolationsbedingungen diese Zwischenwerte nicht festlegen."]})]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.1.8 (Gestalt aller Interpolanten)",id:"env-gestalt-aller-interpolanten",children:[e.jsxs(i.p,{children:["Seien Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, gegeben und sei
`,e.jsx(n,{children:"\\cgreen{p}"}),` irgendein Interpolant dieser Daten. Dann ist eine Funktion
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` genau dann ebenfalls ein Interpolant, wenn sie sich
schreiben lässt als`]}),e.jsx(L,{tag:"13.1.2",id:"eq-gestalt-aller-interpolanten",children:`\\cgreen{\\wh{f}} = \\cgreen{p} + g
\\qquad \\text{mit} \\qquad
g(x_i) = 0 \\quad \\text{für } i = 1, \\dots, n .`})]}),`
`,e.jsx(H,{title:"Beweis der allgemeinen Gestalt aller Interpolanten",children:e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Funktionen werden punktweise addiert, und ",e.jsx(n,{children:"\\cgreen{p}"})," ist nach Voraussetzung ein Interpolant"]}),children:[e.jsxs(i.p,{children:["Sei zunächst ",e.jsx(n,{children:"g"})," eine Funktion mit ",e.jsx(n,{children:"g(x_i) = 0"})," für alle ",e.jsx(n,{children:"i"}),`. Dann gilt für
jedes `,e.jsx(n,{children:"i"})]}),e.jsx(_,{children:"(\\cgreen{p} + g)(x_i) = \\cgreen{p(x_i)} + g(x_i) = \\cblue{y_i} + 0 = \\cblue{y_i} ,"}),e.jsxs(i.p,{children:["also interpoliert ",e.jsx(n,{children:"\\cgreen{p} + g"})," die Daten."]})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["beide Funktionen erfüllen die Interpolationsbedingung ",e.jsx(i.a,{href:"#eq-interpolationsproblem",children:"(13.1.1)"})," an derselben Stelle ",e.jsx(n,{children:"x_i"})]}),children:[e.jsxs(i.p,{children:["Sei umgekehrt ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` ein Interpolant. Wir setzen
`,e.jsx(n,{children:"g := \\cgreen{\\wh{f}} - \\cgreen{p}"})," und erhalten für jedes ",e.jsx(n,{children:"i"})]}),e.jsx(_,{children:"g(x_i) = \\cgreen{\\wh{f}(x_i)} - \\cgreen{p(x_i)} = \\cblue{y_i} - \\cblue{y_i} = 0 ."}),e.jsxs(i.p,{children:["Mit diesem ",e.jsx(n,{children:"g"})," ist ",e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\cgreen{p} + g"})," von der Form ",e.jsx(i.a,{href:"#eq-gestalt-aller-interpolanten",children:"(13.1.2)"}),"."]})]})]})}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.1.9 (Unendlich viele Lösungen)",id:"env-unendlich-viele-loesungen",children:[e.jsxs(i.p,{children:["Die Menge der Funktionen ",e.jsx(n,{children:"g"})," mit ",e.jsx(n,{children:"g(x_i) = 0"})," für alle ",e.jsx(n,{children:"i"}),` ist ein
Untervektorraum des Funktionenraums, und er ist unendlichdimensional: Für
jedes Polynom `,e.jsx(n,{children:"q"})," liegt ",e.jsx(n,{children:"q(x) \\prod_{i=1}^n (x - x_i)"}),` darin, und diese
Produkte sind für verschiedene Grade von `,e.jsx(n,{children:"q"}),` linear unabhängig. Schon der
Spezialfall `,e.jsx(n,{children:"g_c(x) = c \\prod_{i=1}^n (x - x_i)"}),` liefert für jedes
`,e.jsx(n,{children:"c \\in \\R"}),` einen weiteren Interpolanten. Damit hat das Interpolationsproblem
aus `,e.jsx(c,{id:"env:interpolationsproblem",href:"#env-interpolationsproblem",children:"Definition 13.1.2"}),` stets unendlich viele Lösungen, sobald wir
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," nicht weiter einschränken."]}),e.jsxs(i.p,{children:["Die Differenzen aus ",e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"}),` sind von
dieser Bauart: Mit `,e.jsx(n,{children:"\\cgreen{p} = \\cgreen{\\wh{f}_1}"}),` ist
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_3} - \\cgreen{p} = x(x-1)(x-2)"}),` und
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_4} - \\cgreen{p} = 0{,}5\\sin(2\\pi x)"}),`, und auch
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_2} - \\cgreen{p}"})," verschwindet an ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"2"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Interpolation allein legt also nichts fest. Erst ein ",e.jsx(i.em,{children:"Basissystem"}),` schränkt
die Auswahl so ein, dass so viele Freiheitsgrade übrig bleiben, wie wir
Datenpunkte haben: Wir lassen nur Linearkombinationen von `,e.jsx(n,{children:"K"}),`
Basisfunktionen zu, und aus der Interpolationsbedingung wird ein lineares
Gleichungssystem in den `,e.jsx(n,{children:"K"})," Koeffizienten (",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`). Die Wahl der Basis entscheidet
dann über die Kondition dieses Systems und darüber, ob eine lokale
Datenänderung die Kurve global verbiegt (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Zu Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise verschiedenen
`,e.jsx(n,{children:"x_i"})," gibt es unendlich viele Funktionen ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` mit
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-unendlich-viele-loesungen",children:"Bemerkung 13.1.9"}),". Ist ",e.jsx(n,{children:"\\cgreen{p}"}),` ein Interpolant, so ist nach
`,e.jsx(c,{id:"env:gestalt-aller-interpolanten",href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"})," auch ",e.jsx(n,{children:"\\cgreen{p} + c \\prod_i (x - x_i)"})," für jedes ",e.jsx(n,{children:"c \\in \\R"}),` einer,
und verschiedene `,e.jsx(n,{children:"c"})," liefern verschiedene Funktionen."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"})," für ",e.jsx(n,{children:"i = 1, \\dots, n"}),` folgt
`,e.jsx(n,{children:"\\left\\|f - \\cgreen{\\wh{f}}\\right\\| \\approx 0"}),"."]}),e.jsxs(i.p,{children:[`Die Interpolationsbedingung sagt über die Stellen zwischen den Stützstellen
nichts. In `,e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"}),` erfüllen alle vier
Funktionen dieselben drei Bedingungen und liegen bei `,e.jsx(n,{children:"x = 1{,}3"}),` trotzdem
`,e.jsx(n,{children:"0{,}75"})," auseinander; höchstens eine von ihnen kann einem gegebenen ",e.jsx(n,{children:"f"}),`
nahekommen.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Beschränken wir ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," auf Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"}),`, so hat
das Interpolationsproblem bei paarweise verschiedenen `,e.jsx(n,{children:"x_i"})," genau eine Lösung."]}),e.jsxs(i.p,{children:[`Das ist der Eindeutigkeitssatz der Polynominterpolation aus
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),". Ohne den Zusatz „vom Grad höchstens ",e.jsx(n,{children:"n-1"}),`" wäre
die Aussage falsch; so gelesen widerspräche sie der ersten Aussage dieses
Selbsttests.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[`Beim Glättungsproblem verlangen wir wie bei der Interpolation, dass
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," durch alle Datenpunkte läuft."]}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:glaettungsproblem",href:"#env-glaettungsproblem",children:"Definition 13.1.3"})," lässt Residuen ",e.jsx(n,{children:`\\cblue{y_i} -
\\cgreen{\\wh{f}(x_i)} \\neq 0`}),` ausdrücklich zu. Bei verrauschten Daten wäre eine
Kurve durch alle Punkte die falsche Antwort, weil sie das Rauschen mit
abbildet.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Interpolant muss ein Polynom sein."}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:interpolationsproblem",href:"#env-interpolationsproblem",children:"Definition 13.1.2"})," verlangt nur die ",e.jsx(n,{children:"n"}),` Gleichungen an den Stützstellen.
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_2}"})," aus ",e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"})," ist stückweise linear und an ",e.jsx(n,{children:"x = 1"}),`
nicht differenzierbar, `,e.jsx(n,{children:"\\cgreen{\\wh{f}_4}"}),` enthält einen Sinusterm; beide
interpolieren. Polynome sind eine praktische Wahl, keine Vorschrift.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath, Scientific Computing, Kapitel 7 (Interpolation), führt in
§7.1 dieselbe Aufgabenstellung ein und diskutiert, nach welchen Kriterien eine
Funktionenklasse für die Interpolation ausgewählt wird.`})})]})}function gr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Hi,{...s})}):Hi(s)}const Ai=ee.blau,mn=ee.gruen,re=ee.orange,Sn=ee.rot,an=ee.violett,oe=ee.grau,G=Y,jr="⁰¹²³⁴⁵⁶⁷⁸⁹";function Di(s,i=1){if(!Number.isFinite(s))return"–";if(s===0)return"0";const r=Math.floor(Math.log10(Math.abs(s))),l=s/10**r,t=String(Math.abs(r)).split("").map(a=>jr[Number(a)]).join("");return`${l.toFixed(i).replace(".",",")} · 10${r<0?"⁻":""}${t}`}function Ds(s,i){const r=s.length-1,l=[];for(let t=0;t<=i;t++)l.push(s[0]);for(let t=1;t<=r-1;t++)l.push(s[t]);for(let t=0;t<=i;t++)l.push(s[r]);return l}function Se(s,i,r,l){if(r===0)return s[i]<=l&&l<s[i+1]?1:0;let t=0,a=0;const d=s[i+r]-s[i],h=s[i+r+1]-s[i+1];return d>0&&(t=(l-s[i])/d*Se(s,i,r-1,l)),h>0&&(a=(s[i+r+1]-l)/h*Se(s,i+1,r-1,l)),t+a}function Ui(s,i,r,l){const t=s[i+r]-s[i],a=s[i+r+1]-s[i+1],d=t>0?r/t*Se(s,i,r-1,l):0,h=a>0?r/a*Se(s,i+1,r-1,l):0;return d-h}function mr(s,i,r,l){const t=s[i+r]-s[i],a=s[i+r+1]-s[i+1],d=t>0?r/t*Ui(s,i,r-1,l):0,h=a>0?r/a*Ui(s,i+1,r-1,l):0;return d-h}function sn(s,i,r,l,t){return Se(s,i,r,Math.min(l,t-1e-9))}function Ms(s,i){const r=i.length,l=s.map(d=>d.slice()),t=i.slice();for(let d=0;d<r;d++){let h=d;for(let x=d+1;x<r;x++)Math.abs(l[x][d])>Math.abs(l[h][d])&&(h=x);if(Math.abs(l[h][d])<1e-13)return null;[l[d],l[h]]=[l[h],l[d]],[t[d],t[h]]=[t[h],t[d]];for(let x=d+1;x<r;x++){const m=l[x][d]/l[d][d];for(let b=d;b<r;b++)l[x][b]-=m*l[d][b];t[x]-=m*t[d]}}const a=new Array(r).fill(0);for(let d=r-1;d>=0;d--){let h=t[d];for(let x=d+1;x<r;x++)h-=l[d][x]*a[x];a[d]=h/l[d][d]}return a}const{blau:Wn,gruen:ci,orange:Vn}=ee,_n=[0,1,2],oi={monom:{name:"Monombasis",tex:["1","x","x^2"],phi:[()=>1,s=>s,s=>s*s],loese:s=>{const i=(s[0]-2*s[1]+s[2])/2;return[s[0],s[1]-s[0]-i,i]}},newton:{name:"Newton-Basis",tex:["1","x","x(x-1)"],phi:[()=>1,s=>s,s=>s*(s-1)],loese:s=>[s[0],s[1]-s[0],(s[0]-2*s[1]+s[2])/2]}},ze=Y;function br(){const[s,i]=P.useState("monom"),[r,l]=P.useState([1,2,5]),[t,a]=P.useState(!1),d=oi[s],h=_n.map(o=>d.phi.map(j=>j(o))),x=d.loese(r),m=o=>x.reduce((j,v,B)=>j+v*d.phi[B](o),0),b=_n.map(m),f=Math.max(...b.map((o,j)=>Math.abs(o-r[j]))),g=(o,j)=>l(v=>v.map((B,D)=>D===o?j:B)),p=[...t?d.phi.map((o,j)=>({f:v=>x[j]*o(v),color:Vn,dash:[2+2*j,3]})):[],{f:m,color:ci}],y=h[0][1]===0&&h[0][2]===0&&h[1][2]===0,S=r[0]-2*r[1]+r[2]===0,z=f<1e-12;return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Verschieben wir einen Messwert und wechseln dann die Basis."}),e.jsxs("div",{className:"mb-2 flex flex-wrap items-center gap-2 text-sm",children:[Object.keys(oi).map(o=>e.jsx("button",{type:"button",onClick:()=>i(o),className:`rounded border px-2 py-1 ${s===o?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:oi[o].name},o)),e.jsxs("label",{className:"ml-2 flex items-center gap-1",children:[e.jsx("input",{type:"checkbox",checked:t,onChange:o=>a(o.target.checked)}),e.jsxs("span",{children:["Bausteine ",e.jsx(n,{children:"a_k \\phi_k"})," zeigen"]})]})]}),[0,1,2].map(o=>e.jsx(ne,{label:`y${["₁","₂","₃"][o]} bei x = ${_n[o]}`,value:r[o],onChange:j=>g(o,j),min:0,max:6,step:.5,fmt:j=>ze(j,1)},o)),e.jsxs("div",{className:"mt-2 flex flex-wrap items-start gap-5",children:[e.jsxs("div",{className:"min-w-0",role:"img","aria-label":`Interpolant durch die drei Messwerte ${r.map(o=>ze(o,1)).join(", ")} an den Knoten 0, 1, 2, in der ${d.name} dargestellt.`,children:[e.jsx(He,{xLabel:"x",yLabel:"y",series:p,markers:_n.map((o,j)=>({x:o,y:r[j],color:Wn})),xDomain:[-.2,2.2],yDomain:[-3,9],width:320,height:230}),e.jsxs("p",{className:"mt-1 max-w-[20rem] text-center text-xs text-slate-500 dark:text-slate-400",children:["Blau die Daten, grün der Interpolant. Sind die orangen Bausteine"," ",e.jsx(n,{children:"a_k \\phi_k"})," eingeschaltet, summieren sie sich punktweise zur grünen Kurve; bei starker Reglerstellung laufen sie oben und unten aus dem Bild."]})]}),e.jsxs("div",{className:"min-w-0 text-sm",children:[e.jsx("p",{className:"mb-1",style:{color:Vn},children:e.jsx(n,{children:`\\phi_1(x) = ${d.tex[0]}, \\quad \\phi_2(x) = ${d.tex[1]}, \\quad \\phi_3(x) = ${d.tex[2]}`})}),e.jsx("div",{className:"mb-2 overflow-x-auto",children:e.jsxs("table",{className:"font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left font-normal",children:"Zeile"}),[1,2,3].map(o=>e.jsx("th",{className:"px-2 font-normal",style:{color:Vn},children:e.jsx(n,{children:`\\phi_${o}(x_i)`})},o)),e.jsx("th",{className:"pl-3 font-normal",style:{color:Wn},children:e.jsx(n,{children:"y_i"})})]})}),e.jsx("tbody",{children:_n.map((o,j)=>e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-2 text-slate-500 dark:text-slate-400",children:["i = ",j+1,", x = ",o]}),h[j].map((v,B)=>e.jsx("td",{className:"px-2 text-center",style:{color:Vn},children:ze(v,0)},B)),e.jsx("td",{className:"pl-3 text-center",style:{color:Wn},children:ze(r[j],1)})]},o))})]})}),e.jsxs("p",{children:["Lösung des Systems ",e.jsx(n,{children:"\\bB\\ba = \\by"}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:ci},children:["a = (",ze(x[0]),"; ",ze(x[1]),"; ",ze(x[2]),")"]})]}),e.jsxs("p",{className:"mt-1",children:["Probe:"," ",e.jsx("span",{className:"font-mono",style:{color:ci},children:b.map(o=>ze(o,1)).join(" · ")})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:Wn},children:r.map(o=>ze(o,1)).join(" · ")})]}),e.jsxs("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:["größte Abweichung:"," ",f===0?"0 (exakt)":Di(f)]}),e.jsx("p",{className:"mt-2 max-w-[20rem]",children:y?"B ist hier untere Dreiecksmatrix: Zeile 1 gibt a₁ direkt, dann setzen wir nach unten durch. Das ist Vorwärtssubstitution im engen Sinn.":"Über der Diagonalen steht in Zeile 2 eine 1, B ist also keine Dreiecksmatrix. Wir lösen mit Elimination: Zeile 1 gibt a₁, das setzen wir in die Zeilen 2 und 3 ein und räumen dann a₂ weg."})]})]}),e.jsx(he,{kind:S?"warn":z?"ok":"neutral",titel:y?"Newton-Basis:":"Monombasis:",children:S?"Der quadratische Baustein hat Gewicht a₃ = 0, weil y₁ − 2y₂ + y₃ = 0 ist. Der Interpolant ist hier eine Gerade, obwohl wir im Raum der Polynome vom Grad höchstens 2 gesucht haben: Die drei Punkte liegen auf einer Geraden, und die Basis ist trotzdem dieselbe geblieben.":z?`Alle drei Bausteine tragen bei, das Gewicht des quadratischen ist a₃ = ${ze(x[2])}. Die Probe trifft die drei Messwerte exakt: Die Koeffizienten hängen an der Basis, der Interpolant nicht.`:`Alle drei Bausteine tragen bei, das Gewicht des quadratischen ist a₃ = ${ze(x[2])}. Die Probe weicht um ${Di(f)} ab; das ist Rundung, nicht ein anderer Interpolant.`})]})}function Ji(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` hat ein Problem offengelassen: Durch
dieselben drei Punkte laufen eine Parabel, ein Polygonzug, ein kubisches
Polynom und eine wellige Sinuskurve, und alle vier erfüllen die
Interpolationsbedingungen exakt. Wir suchen den Interpolanten deshalb nur
noch in einem kleinen, endlichdimensionalen Ansatzraum. Aus der Suche nach
einer Funktion wird damit die Suche nach endlich vielen Zahlen, und dafür
haben wir seit `,e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"})," die Werkzeuge."]}),`
`,e.jsx(i.h3,{children:"Funktionen als Vektoren"}),`
`,e.jsxs(k,{kind:"Definition",label:"13.2.1 (Der Vektorraum der Funktionen)",id:"env-der-vektorraum-der-funktionen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\Fcal = \\{f \\colon [a,b] \\to \\R\\}"}),` die Menge aller reellwertigen
Funktionen auf einem Intervall `,e.jsx(n,{children:"[a,b]"}),`. Mit den punktweise erklärten
Verknüpfungen`]}),e.jsx(_,{children:`(f + g)(x) = f(x) + g(x),
\\qquad
(\\alpha \\cdot f)(x) = \\alpha \\cdot f(x),
\\qquad \\alpha \\in \\R,`}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\Fcal"})," ein ",e.jsx(c,{id:"vector-space",children:"Vektorraum"})," über ",e.jsx(n,{children:"\\R"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Nachzurechnen ist daran wenig: Assoziativität, Kommutativität
und die Distributivgesetze erbt `,e.jsx(n,{children:"\\Fcal"})," punktweise von ",e.jsx(n,{children:"\\R"}),`, die Nullfunktion
`,e.jsx(n,{children:"x \\mapsto 0"})," ist das neutrale Element, und ",e.jsx(n,{children:"-f"})," ist das Inverse zu ",e.jsx(n,{children:"f"}),`.
Anders als der `,e.jsx(n,{children:"\\R^n"})," ist ",e.jsx(n,{children:"\\Fcal"}),` aber unendlichdimensional, und deshalb
legen `,e.jsx(n,{children:"n"})," Interpolationsbedingungen nichts fest (",e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),")."]}),`
`,e.jsxs(H,{title:"Die Auswertungsabbildung und der Rangsatz",children:[e.jsxs(i.p,{children:["Was heißt der Befund aus ",e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` in dieser Sprache? Dort
war jeder Interpolant von der Gestalt `,e.jsx(n,{children:"\\cgreen{p} + g"})," mit einer Funktion ",e.jsx(n,{children:"g"}),`,
die an allen Stellen `,e.jsx(n,{children:"x_i"}),` verschwindet. So sieht auch die Lösungsmenge eines
linearen Gleichungssystems aus, und das hat einen Grund.`]}),e.jsxs(k,{kind:"Bemerkung",label:"13.2.2 (Unendlich viele Freiheitsgrade, endlich viele Bedingungen)",id:"env-unendlich-viele-freiheitsgrade-endlich",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Auswertungsabbildung"})]}),e.jsx(_,{children:`E \\colon \\Fcal \\to \\R^n,
\\qquad
E(f) = \\bigl(f(x_1), \\dots, f(x_n)\\bigr)^\\top,`}),e.jsxs(i.p,{children:["ist linear, und die Interpolanten der Daten ",e.jsx(n,{children:"\\cblue{\\by}"}),` sind genau die
Urbilder von `,e.jsx(n,{children:"\\cblue{\\by}"})," unter ",e.jsx(n,{children:"E"}),`: eine spezielle Lösung plus der
`,e.jsx(c,{id:"kernel",children:"Kern"}),`, also genau die Gestalt aus
`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),". Der Kern ist unendlichdimensional, denn ",e.jsx(n,{children:"E"})," misst nur ",e.jsx(n,{children:"n"}),`
Zahlen aus einem unendlichdimensionalen Raum
(`,e.jsx(c,{id:"rank-nullity-theorem",children:"Rangsatz"}),")."]})]})]}),`
`,e.jsx(i.h3,{children:"Ansatzräume und Basisdarstellung"}),`
`,e.jsxs(i.p,{children:["Statt in ganz ",e.jsx(n,{children:"\\Fcal"}),` suchen wir nur noch in einem endlichdimensionalen
Unterraum.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.2.3 (Ansatzraum, Basisdarstellung, Basiskoeffizienten)",id:"env-ansatzraum-basisdarstellung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K} \\colon [a,b] \\to \\R"}),` fest
gewählte Funktionen, genannt `,e.jsx(i.em,{children:"Basisfunktionen"}),` (basis functions). Der von
ihnen aufgespannte `,e.jsx(c,{id:"subspace",children:"Unterraum"})]}),e.jsx(_,{children:`\\Fcal_K = \\spann\\{\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}\\}
= \\Bigl\\{ \\textstyle\\sum_{k=1}^K a_k \\corange{\\phi_k}
\\;\\Big|\\; a_1, \\dots, a_K \\in \\R \\Bigr\\} \\subset \\Fcal`}),e.jsxs(i.p,{children:["heißt ",e.jsx(i.em,{children:"Ansatzraum"}),". Eine Darstellung ",e.jsx(n,{children:"f = \\sum_{k=1}^K a_k \\corange{\\phi_k}"}),`
heißt `,e.jsx(i.em,{children:"Basisdarstellung"})," von ",e.jsx(n,{children:"f"}),", und ",e.jsx(n,{children:"a_1, \\dots, a_K"}),` heißen
`,e.jsx(i.em,{children:"Basiskoeffizienten"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Ein Element von ",e.jsx(n,{children:"\\Fcal_K"}),` ist damit durch seinen Koeffizientenvektor
`,e.jsx(n,{children:"\\ba = (a_1, \\dots, a_K)^\\top \\in \\R^K"}),` beschrieben. Ob umgekehrt auch jede
Funktion in `,e.jsx(n,{children:"\\Fcal_K"})," nur ",e.jsx(i.em,{children:"einen"}),` solchen Vektor besitzt, ist eine echte
Zusatzforderung an die `,e.jsx(n,{children:"\\corange{\\phi_k}"}),"."]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.2.4 (Wann K Zahlen eine Funktion festlegen)",id:"env-wann-k-zahlen-eine-funktion-festlegen",children:[e.jsx(i.p,{children:"Die Koordinatenabbildung"}),e.jsx(_,{children:`\\Phi \\colon \\R^K \\to \\Fcal_K,
\\qquad
\\Phi(\\ba) = \\sum_{k=1}^K a_k \\corange{\\phi_k},`}),e.jsxs(i.p,{children:[`ist linear und surjektiv. Sie ist genau dann bijektiv, wenn
`,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
`,e.jsx(c,{id:"linear-independence",children:"linear unabhängig"}),` sind. In diesem Fall bilden sie
eine `,e.jsx(c,{id:"basis",children:"Basis"})," von ",e.jsx(n,{children:"\\Fcal_K"}),`, es gilt
`,e.jsx(n,{children:"\\dim \\Fcal_K = K"}),", und jedes ",e.jsx(n,{children:"f \\in \\Fcal_K"}),` hat genau einen
Koeffizientenvektor.`]})]}),`
`,e.jsx(H,{title:"Beweis: Wann Koeffizienten eine Funktion eindeutig festlegen",children:e.jsxs(me,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\Fcal_K"})," ist als Menge aller Linearkombinationen definiert, also ist jedes Element ein Bild unter ",e.jsx(n,{children:"\\Phi"}),"; die Linearität folgt aus den punktweisen Rechenregeln"]}),children:e.jsxs(i.p,{children:["Linearität und Surjektivität stehen schon in ",e.jsx(c,{id:"env:ansatzraum-basisdarstellung",href:"#env-ansatzraum-basisdarstellung",children:"Definition 13.2.3"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["eine surjektive lineare Abbildung ist genau dann bijektiv, wenn sie injektiv ist, und injektiv ist sie genau bei trivialem Kern; ",e.jsx(n,{children:"\\Phi(\\ba) = 0"})," heißt ausgeschrieben ",e.jsx(n,{children:"\\sum_k a_k \\corange{\\phi_k(x)} = 0"})," für alle ",e.jsx(n,{children:"x"}),", und dass daraus ",e.jsx(n,{children:"\\ba = \\bnull"})," folgt, ist die Definition der linearen Unabhängigkeit"]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\Phi"}),` ist genau dann bijektiv, wenn
`,e.jsx(n,{children:"\\operatorname{Kern}(\\Phi) = \\{\\bnull\\}"}),` ist, und das ist genau die lineare
Unabhängigkeit der `,e.jsx(n,{children:"\\corange{\\phi_k}"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["ein Isomorphismus bildet eine Basis auf eine Basis ab; das Bild der Standardbasis von ",e.jsx(n,{children:"\\R^K"})," ist gerade ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"})]}),children:e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\Phi"})," bijektiv, so ist es ein Isomorphismus zwischen ",e.jsx(n,{children:"\\R^K"}),` und
`,e.jsx(n,{children:"\\Fcal_K"}),"; damit ist ",e.jsx(n,{children:"\\dim \\Fcal_K = K"}),`, und die Basisdarstellung jedes
`,e.jsx(n,{children:"f \\in \\Fcal_K"})," ist eindeutig."]})})]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.2.5 (Das Wort Basisfunktion trägt eine Voraussetzung mit)",id:"env-das-wort-basisfunktion-traegt-eine",children:e.jsxs(i.p,{children:["Von den Koeffizienten zur Funktion ist der Weg immer eindeutig, denn ",e.jsx(n,{children:"\\Phi"}),`
ist eine Abbildung; die Gegenrichtung braucht
`,e.jsx(c,{id:"env:wann-k-zahlen-eine-funktion-festlegen",href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`. Wählen wir etwa
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"}),", so ist ",e.jsx(n,{children:"K = 3"}),", aber ",e.jsx(n,{children:"\\Fcal_3"}),` besteht nur aus
den Polynomen vom Grad höchstens `,e.jsx(n,{children:"1"})," und hat die Dimension ",e.jsx(n,{children:"2"}),`. Die Funktion
`,e.jsx(n,{children:"f(x) = 1 + x"})," hat dort die Koeffizientenvektoren ",e.jsx(n,{children:"(1, 1, 0)^\\top"}),`,
`,e.jsx(n,{children:"(0, 0, 1)^\\top"})," und unendlich viele weitere. Das Wort ",e.jsx(i.em,{children:"Basis"}),`funktion setzt
die lineare Unabhängigkeit stillschweigend voraus; wir prüfen sie im
Zweifelsfall nach.`]})}),`
`,e.jsx(k,{kind:"Beispiel",label:"13.2.6 (Zwei Ansatzräume)",id:"env-zwei-ansatzraeume",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Polynome vom Grad höchstens ",e.jsx(n,{children:"n - 1"}),":"]})," Mit der ",e.jsx(i.em,{children:"Monombasis"}),`
`,e.jsx(n,{children:"\\corange{\\phi_k(x)} = x^{k-1}"})," und ",e.jsx(n,{children:"K = n"})," ist ",e.jsx(n,{children:"\\Fcal_K"}),` der Raum aller
`,e.jsx(c,{id:"polynomial",children:"Polynome"})," vom Grad höchstens ",e.jsx(n,{children:"n - 1"}),`. Die Monome sind
linear unabhängig, also ist `,e.jsx(n,{children:"\\dim \\Fcal_K = n"}),`. Diesen Ansatzraum behandelt
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Splines vom Grad ",e.jsx(n,{children:"q"})," über ",e.jsx(n,{children:"m + 1"})," Knoten:"]}),` Stückweise Polynome vom Grad
höchstens `,e.jsx(n,{children:"q"}),", die an den ",e.jsx(n,{children:"m - 1"})," inneren Knoten ",e.jsx(n,{children:"C^{q-1}"}),`-glatt
aneinanderstoßen, bilden ebenfalls einen Ansatzraum. Bei einfachen inneren
Knoten und dieser größtmöglichen Glattheit hat er `,e.jsx(n,{children:"K = m + q"}),`
Freiheitsgrade (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Der Ansatz und sein Gleichungssystem"}),`
`,e.jsxs(i.p,{children:["Gesucht ist jetzt nicht mehr eine Funktion, sondern ein Vektor aus ",e.jsx(n,{children:"K"}),`
Zahlen.`]}),`
`,e.jsxs(k,{kind:"Algorithmus",label:"13.2.7 (Interpolation durch Basisdarstellung)",id:"env-interpolation-durch-basisdarstellung",children:[e.jsxs(i.p,{children:["Gegeben seien Daten ",e.jsx(n,{children:"(x_i, \\cblue{y_i})"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Basissystem wählen:"})," Lege ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
fest. Diese Funktionen sind bekannt.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ansatz machen:"}),`
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = \\sum_{k=1}^K a_k \\corange{\\phi_k(x)}"}),` mit den
unbekannten Koeffizienten `,e.jsx(n,{children:"a_1, \\dots, a_K"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Bedingungen hinschreiben:"})," ",e.jsx(n,{children:"\\cblue{y_i} = \\cgreen{\\wh{f}(x_i)}"}),` für alle
`,e.jsx(n,{children:"i"})," ergibt das lineare Gleichungssystem ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` aus
`,e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"System lösen"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`) und die Koeffizienten in den Ansatz
einsetzen.`]}),`
`]})]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.2.8 (Das Interpolationsproblem ist ein lineares Gleichungssystem)",id:"env-das-interpolationsproblem-ist-ein",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bB \\in \\R^{n \\times K}"}),` die Matrix mit den Einträgen
`,e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k(x_i)}"}),", also"]}),e.jsx(_,{children:`\\bB = \\begin{pmatrix}
\\corange{\\phi_1(x_1)} & \\cdots & \\corange{\\phi_K(x_1)} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\corange{\\phi_1(x_n)} & \\cdots & \\corange{\\phi_K(x_n)}
\\end{pmatrix} \\in \\R^{n \\times K},
\\qquad
\\ba = \\begin{pmatrix} a_1 \\\\ \\vdots \\\\ a_K \\end{pmatrix} \\in \\R^K,
\\qquad
\\cblue{\\by} = \\begin{pmatrix} \\cblue{y_1} \\\\ \\vdots \\\\ \\cblue{y_n} \\end{pmatrix} \\in \\R^n .`}),e.jsxs(i.p,{children:["Dann interpoliert ",e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\sum_{k=1}^K a_k \\corange{\\phi_k}"}),` die
Daten genau dann, wenn `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," gilt."]})]}),`
`,e.jsxs(i.p,{children:["Der Beweis ist kurz: Die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bB\\ba"}),` ist
`,e.jsx(n,{children:"\\sum_{k=1}^K \\corange{\\phi_k(x_i)}\\, a_k = \\cgreen{\\wh{f}(x_i)}"}),", die ",e.jsx(n,{children:"i"}),`-te
Zeile der Gleichung ist also die `,e.jsx(n,{children:"i"}),"-te Interpolationsbedingung."]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.2.9 (Was in B steckt und was nicht)",id:"env-was-in-b-steckt-und-was-nicht",children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bB"})," liest sich zeilenweise wie eine Datentabelle: ",e.jsx(i.em,{children:`eine Zeile je
Datenpunkt, eine Spalte je Basisfunktion`}),"."]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bB"})," hängt nur von den Stellen ",e.jsx(n,{children:"x_i"}),` und vom Basissystem ab, nicht von den
gemessenen Werten `,e.jsx(n,{children:"\\cblue{y_i}"}),`. Kommen neue Messwerte an denselben Stellen
herein, bleibt die Matrix stehen, und eine einmal berechnete Zerlegung
lässt sich wiederverwenden (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"n = K"})," ist ",e.jsx(n,{children:"\\bB"}),` quadratisch, und das System ist genau dann für jede
rechte Seite eindeutig lösbar, wenn `,e.jsx(n,{children:"\\bB"}),` invertierbar ist
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`). Das ist der Normalfall der Interpolation; die
folgenden Abschnitte fragen, wie gut `,e.jsx(n,{children:"\\bB"})," dann konditioniert ist."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"n > K"}),` gibt es in der Regel keinen exakten Interpolanten, und wir
minimieren stattdessen die Residuen, also
`,e.jsx(c,{id:"linear-least-squares",children:"Kleinste Quadrate"})," (",e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),`); das ist der
Übergang zur Glättung. Für `,e.jsx(n,{children:"n < K"})," ist das Problem unterbestimmt."]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Ein Beispiel von Hand"}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.2.10 (Basisdarstellung konkret)",id:"env-basisdarstellung-konkret",children:[e.jsxs(i.p,{children:["Gegeben seien die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0, 1)}"}),", ",e.jsx(n,{children:"\\cblue{(1, 2)}"}),`,
`,e.jsx(n,{children:"\\cblue{(2, 5)}"})," aus ",e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`, dazu die Monombasis
`,e.jsx(n,{children:"\\corange{\\phi_k(x)} = x^{k-1}"})," mit ",e.jsx(n,{children:"K = 3"}),`. Der Ansatzraum ist der Raum der
Polynome vom Grad höchstens `,e.jsx(n,{children:"2"}),`, der Ansatz lautet
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = a_1 + a_2 x + a_3 x^2"}),"."]}),e.jsx(i.p,{children:`Die Matrix entsteht durch Auswerten der drei Basisfunktionen an den drei
Stellen:`}),e.jsx(_,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{1} \\\\
\\corange{1} & \\corange{2} & \\corange{4}
\\end{pmatrix},
\\qquad
\\cblue{\\by} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\\\ \\cblue{5} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Wir lösen ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` durch Einsetzen. Die erste Zeile liefert
`,e.jsx(n,{children:"a_1"})," sofort, danach eliminieren wir:"]}),e.jsx(_,{children:`\\begin{aligned}
\\text{Zeile 1:} \\quad a_1 &= \\cblue{1}, \\\\
\\text{Zeile 2:} \\quad a_1 + a_2 + a_3 &= \\cblue{2}
\\quad\\implies\\quad a_2 + a_3 = 1
\\quad\\implies\\quad a_2 = 1 - a_3, \\\\
\\text{Zeile 3:} \\quad a_1 + 2a_2 + 4a_3 &= \\cblue{5}
\\quad\\implies\\quad 2a_2 + 4a_3 = 4
\\quad\\implies\\quad 2 + 2a_3 = 4 .
\\end{aligned}`}),e.jsxs(i.p,{children:["In Zeile 3 steckt bereits ",e.jsx(n,{children:"a_2 = 1 - a_3"}),` aus Zeile 2. Aus der letzten
Gleichung folgt `,e.jsx(n,{children:"\\cgreen{a_3 = 1}"})," und damit ",e.jsx(n,{children:"\\cgreen{a_2 = 0}"}),`. Der
Koeffizientenvektor ist
`,e.jsx(n,{children:"\\cgreen{\\ba = (1, 0, 1)^\\top}"}),", der Interpolant also"]}),e.jsx(_,{children:"\\cgreen{\\wh{f}(x)} = 1 + x^2 ."}),e.jsxs(i.p,{children:[`Die Probe an allen drei Stellen geht auf:
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(0)} = \\cblue{1}"}),", ",e.jsx(n,{children:"\\cgreen{\\wh{f}(1)} = \\cblue{2}"}),`,
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(2)} = \\cblue{5}"}),"."]})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.2.11 (Einsetzen ist hier nicht Vorwärtssubstitution)",id:"env-einsetzen-ist-hier-nicht",children:e.jsxs(i.p,{children:["Der Rechenweg sieht aus wie ",e.jsx(c,{id:"triangular-solve",children:"Vorwärtssubstitution"}),`,
ist aber `,e.jsx(c,{id:"gaussian-elimination",children:"Gauß-Elimination"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`): In
Zeile 2 von `,e.jsx(n,{children:"\\bB"}),` steht rechts der Diagonalen
`,e.jsx(n,{children:"\\corange{\\phi_3(x_2)} = \\corange{1} \\neq 0"}),", ",e.jsx(n,{children:"\\bB"}),` ist also keine untere
`,e.jsx(c,{id:"triangular-matrix",children:"Dreiecksmatrix"}),". Nur ",e.jsx(n,{children:"x_1 = 0"}),` macht die erste Zeile
so einfach.`]})}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.2.12 (Dieselbe Funktion, andere Koeffizienten)",id:"env-dieselbe-funktion-andere-koeffizienten",children:[e.jsxs(i.p,{children:[`Wir behalten die Daten und wechseln nur das Basissystem, und zwar zur
`,e.jsx(i.em,{children:"Newton-Basis"})," zu den Knoten ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"1"}),":"]}),e.jsx(_,{children:`\\corange{\\phi_1(x)} = 1,
\\qquad
\\corange{\\phi_2(x)} = x,
\\qquad
\\corange{\\phi_3(x)} = x(x-1) .`}),e.jsxs(i.p,{children:["Auch diese drei Funktionen spannen die Polynome vom Grad höchstens ",e.jsx(n,{children:"2"}),` auf,
der Ansatzraum ist also unverändert. Die Matrix dagegen ändert ihre Gestalt:`]}),e.jsx(_,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{0} \\\\
\\corange{1} & \\corange{2} & \\corange{2}
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Sie ist eine untere Dreiecksmatrix, denn ",e.jsx(n,{children:"\\corange{\\phi_2}"}),` verschwindet in
`,e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"\\corange{\\phi_3}"})," verschwindet in ",e.jsx(n,{children:"0"})," und in ",e.jsx(n,{children:"1"}),`. Jetzt greift die
Vorwärtssubstitution, Zeile für Zeile von oben nach unten:`]}),e.jsx(_,{children:`\\begin{aligned}
a_1 &= \\cblue{1}
\\quad\\implies\\quad \\cgreen{a_1 = 1}, \\\\
a_1 + a_2 &= \\cblue{2}
\\quad\\implies\\quad \\cgreen{a_2 = 1}, \\\\
a_1 + 2a_2 + 2a_3 &= \\cblue{5}
\\quad\\implies\\quad 2a_3 = 2
\\quad\\implies\\quad \\cgreen{a_3 = 1} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Der Koeffizientenvektor ist diesmal ",e.jsx(n,{children:"\\cgreen{\\ba = (1, 1, 1)^\\top}"}),`, und
ausmultipliziert steht dort`]}),e.jsx(_,{children:"\\cgreen{\\wh{f}(x)} = 1 + x + x(x-1) = 1 + x^2 ,"}),e.jsxs(i.p,{children:["dieselbe Funktion wie in ",e.jsx(i.a,{href:"#env-basisdarstellung-konkret",children:"Beispiel 13.2.10"}),`. Anders kann es
nicht sein, denn in den Polynomen vom Grad höchstens `,e.jsx(n,{children:"2"}),` ist der Interpolant
durch drei Punkte eindeutig (`,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),")."]})]}),`
`,e.jsxs(i.p,{children:[`Der Ansatzraum bestimmt also den Interpolanten, das Basissystem nur seine
Koeffizienten und den Rechenweg dorthin. Für die Numerik ist der Rechenweg
allerdings wesentlich: Ein Dreieckssystem kostet
`,e.jsx(n,{children:"O(K^2)"})," Operationen, die volle Elimination ",e.jsx(n,{children:"O(K^3)"}),`
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]}),`
`,e.jsxs(ae,{title:"Zwei Basen, ein Interpolant",children:[e.jsx(i.p,{children:`Ändert ein Basiswechsel die Kurve oder nur die Koeffizienten? Und was am
Gleichungssystem bleibt stehen, wenn wir einen Messwert verschieben?`}),e.jsx(br,{}),e.jsxs(i.p,{children:["Die Knoten ",e.jsx(n,{children:"\\cblue{x_1} = 0"}),", ",e.jsx(n,{children:"\\cblue{x_2} = 1"}),", ",e.jsx(n,{children:"\\cblue{x_3} = 2"}),` bleiben
fest, wir verschieben nur die Messwerte; deshalb bleibt `,e.jsx(n,{children:"\\bB"}),` stehen, und nur
die rechte Seite `,e.jsx(n,{children:"\\cblue{\\by}"}),` wandert mit. Der Schalter wechselt das
Basissystem, ohne den Ansatzraum zu ändern: Die Koeffizienten `,e.jsx(n,{children:"\\ba"}),` springen,
die grüne Kurve nicht. Die orangen Bausteine `,e.jsx(n,{children:"a_k \\corange{\\phi_k}"}),`
summieren sich punktweise zu dieser Kurve.`]})]}),`
`,e.jsx(i.h3,{children:"Woran sich Basissysteme unterscheiden"}),`
`,e.jsx(i.p,{children:`Interpolationsverfahren unterscheiden sich im Wesentlichen durch die Wahl des
Basissystems; vier Kriterien bestimmen den Rest des Kapitels.`}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kondition."}),` Wie empfindlich reagieren die berechneten Koeffizienten auf
Störungen der Daten? Das misst die `,e.jsx(c,{id:"condition-number",children:"Konditionszahl"}),`
`,e.jsx(n,{children:"\\kappa(\\bB)"})," (",e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`); bei der Monombasis wächst sie mit
`,e.jsx(n,{children:"K"})," sehr schnell (",e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stabilität."}),` Ändert sich ein Messwert ein wenig, soll sich der Interpolant
nur wenig ändern, am besten nur in der Nähe dieses Punktes. Ein globales
Polynom ändert sich dagegen im ganzen Intervall, oft am stärksten weit weg
von der Störung (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokalität."}),` Ist jede Basisfunktion nur auf einem kleinen Teilintervall von
null verschieden, wird `,e.jsx(n,{children:"\\bB"}),` zur Bandmatrix; das leisten die B-Splines aus
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Effiziente Lösbarkeit."}),` Ein Bandsystem lässt sich mit linearem Aufwand in
der Zahl der Unbekannten lösen, ein Dreieckssystem mit quadratischem, eine
volle Matrix nur mit kubischem (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),", ",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),`; zum
Bandsystem `,e.jsx(i.a,{href:"#env-bandstruktur-und-aufwand",children:"Bemerkung 13.4.14"}),")."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Im System ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," hat ",e.jsx(n,{children:"\\bB"})," genau ",e.jsx(n,{children:"n"})," Zeilen und ",e.jsx(n,{children:"K"}),` Spalten,
und in Zeile `,e.jsx(n,{children:"i"}),", Spalte ",e.jsx(n,{children:"k"})," steht ",e.jsx(n,{children:"\\corange{\\phi_k(x_i)}"}),"."]}),e.jsxs(i.p,{children:["So steht es in ",e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"}),`: Jede Zeile gehört zu einem Datenpunkt, jede
Spalte zu einer Basisfunktion. Die Unbekannte ist der Koeffizientenvektor
`,e.jsx(n,{children:"\\ba \\in \\R^K"}),`, die rechte Seite der Datenvektor
`,e.jsx(n,{children:"\\cblue{\\by} \\in \\R^n"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bB"})," hängt von den gemessenen Werten ",e.jsx(n,{children:"\\cblue{y_i}"})," ab."]}),e.jsxs(i.p,{children:["In ",e.jsx(n,{children:"\\bB"}),` stehen ausschließlich Werte der Basisfunktionen an den Stellen
`,e.jsx(n,{children:"x_i"}),`. Die Messwerte stehen komplett auf der rechten Seite. Deshalb dürfen
wir für neue Daten an denselben Stellen dieselbe Matrix und dieselbe
Zerlegung weiterverwenden (`,e.jsx(i.a,{href:"#env-was-in-b-steckt-und-was-nicht",children:"Bemerkung 13.2.9"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Sobald wir uns auf einen endlichdimensionalen Ansatzraum ",e.jsx(n,{children:"\\Fcal_K"}),`
beschränken, ist der Interpolant eindeutig.`]}),e.jsxs(i.p,{children:[`Die Einschränkung allein genügt nicht. Suchen wir zu unseren drei Punkten in
den Polynomen vom Grad höchstens `,e.jsx(n,{children:"3"}),", also mit ",e.jsx(n,{children:"K = 4 > 3 = n"}),`, so hat das
System mehr Unbekannte als Gleichungen und weiterhin unendlich viele
Lösungen; der kubische Interpolant aus `,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` ist eine
davon.
Genau eine Lösung für jede rechte Seite gibt es erst, wenn `,e.jsx(n,{children:"\\bB"}),` quadratisch
und invertierbar ist.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Wechseln wir von der Monombasis zur Newton-Basis, so ändert sich der
Interpolant.`}),e.jsxs(i.p,{children:[`Es ändern sich nur die Koeffizienten, von
`,e.jsx(n,{children:"\\cgreen{(1, 0, 1)^\\top}"})," auf ",e.jsx(n,{children:"\\cgreen{(1, 1, 1)^\\top}"}),`. Beide Basen spannen
denselben Ansatzraum auf, und in ihm gibt es zu drei verschiedenen Stellen nur
einen Interpolanten, hier `,e.jsx(n,{children:"\\cgreen{1 + x^2}"})," (",e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`). Im Widget
springt die grüne Kurve beim Umschalten nicht.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Wählen wir ",e.jsx(n,{children:"K"})," Basisfunktionen, so hat der Ansatzraum ",e.jsx(n,{children:"\\Fcal_K"}),` die
Dimension `,e.jsx(n,{children:"K"}),"."]}),e.jsxs(i.p,{children:["Nur wenn die ",e.jsx(n,{children:"\\corange{\\phi_k}"})," linear unabhängig sind (",e.jsx(c,{id:"env:wann-k-zahlen-eine-funktion-festlegen",href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`). Mit
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"})," ist ",e.jsx(n,{children:"K = 3"}),", aber ",e.jsx(n,{children:"\\Fcal_3"}),` enthält nur die
Polynome vom Grad höchstens `,e.jsx(n,{children:"1"})," und hat die Dimension ",e.jsx(n,{children:"2"}),`; jede Funktion
darin hat dann unendlich viele Koeffizientenvektoren (`,e.jsx(i.a,{href:"#env-das-wort-basisfunktion-traegt-eine",children:"Bemerkung 13.2.5"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §7.1 (Interpolation, Wahl des Basissystems) und §7.2
(Existenz, Eindeutigkeit, Kondition).`})})]})}function fr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ji,{...s})}):Ji(s)}const{orange:zn,rot:Qi,grau:Ge}=ee;function pr(s,i){const r=s.length,l=s.map((a,d)=>[...a,i[d]]);for(let a=0;a<r;a++){let d=a;for(let h=a+1;h<r;h++)Math.abs(l[h][a])>Math.abs(l[d][a])&&(d=h);if(Math.abs(l[d][a])<1e-300)return null;d!==a&&([l[d],l[a]]=[l[a],l[d]]);for(let h=a+1;h<r;h++){const x=l[h][a]/l[a][a];for(let m=a;m<=r;m++)l[h][m]-=x*l[a][m]}}const t=new Array(r).fill(0);for(let a=r-1;a>=0;a--){let d=l[a][r];for(let h=a+1;h<r;h++)d-=l[a][h]*t[h];t[a]=d/l[a][a]}return t}function kr(s){const i=s.length,r=[];for(let l=0;l<i;l++){const t=new Array(i).fill(0);t[l]=1;const a=pr(s,t);if(!a)return null;r.push(a)}return s.map((l,t)=>r.map(a=>a[t]))}function Xi(s){const i=s.length,r=s[0].length;let l=new Array(r).fill(1/Math.sqrt(r));for(let a=0;a<400;a++){const d=s.map(f=>f.reduce((g,p,y)=>g+p*l[y],0)),h=new Array(r).fill(0);for(let f=0;f<r;f++)for(let g=0;g<i;g++)h[f]+=s[g][f]*d[g];const x=Math.hypot(...h);if(!Number.isFinite(x)||x===0)break;const m=h.map(f=>f/x),b=Math.hypot(...m.map((f,g)=>f-l[g]));if(l=m,b<1e-14)break}const t=s.map(a=>a.reduce((d,h,x)=>d+h*l[x],0));return Math.hypot(...t)}const xi=(s,i,r)=>Array.from({length:s},(l,t)=>s===1?(i+r)/2:i+(r-i)*t/(s-1));function wr(s,i){if(s===0)return 1;let r=1,l=i;for(let t=1;t<s;t++){const a=2*i*l-r;r=l,l=a}return l}const Pn=[{id:"monom01",name:"Monome auf [0, 1]",kurz:"Monome [0, 1]",dash:""},{id:"monom11",name:"Monome auf [−1, 1]",kurz:"Monome [−1, 1]",dash:"7 4"},{id:"cheb",name:"Chebyshev-Polynome auf [−1, 1]",kurz:"Chebyshev",dash:"2 3"}];function Fs(s,i){return s==="monom01"?xi(i,0,1).map(r=>Array.from({length:i},(l,t)=>r**t)):s==="monom11"?xi(i,-1,1).map(r=>Array.from({length:i},(l,t)=>r**t)):xi(i,-1,1).map(r=>Array.from({length:i},(l,t)=>wr(t,r)))}function ui(s,i){const r=Fs(s,i),l=kr(r);return l?Xi(r)*Xi(l):1/0}const bn=2,Pi=20,fn=[];for(let s=bn;s<=Pi;s++)fn.push(s);const $n={monom01:fn.map(s=>ui("monom01",s)),monom11:fn.map(s=>ui("monom11",s)),cheb:fn.map(s=>ui("cheb",s))};function Yi(s,i){const r=Fs("monom01",s),l=x=>r.map(m=>m[x]),t=l(i),a=l(i+1),d=t.reduce((x,m,b)=>x+m*a[b],0),h=Math.hypot(...t)*Math.hypot(...a);return h===0?NaN:Math.acos(Math.min(1,d/h))*180/Math.PI}const vr=["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];function Ns(s){return String(Math.abs(s)).split("").map(i=>vr[Number(i)]??i).join("").replace(/^/,s<0?"⁻":"")}function Tn(s){if(Number.isNaN(s))return"undefiniert";if(!Number.isFinite(s))return"∞";if(s<100)return s.toFixed(s<10?2:1).replace(".",",");let i=Math.floor(Math.log10(s)),r=s/10**i;return r>=9.95&&(r/=10,i+=1),`${r.toFixed(1).replace(".",",")} · 10${Ns(i)}`}function Ze(s,i=1){return Number.isNaN(s)?"undefiniert":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function zr(){const x=g=>46+g*378,m=g=>12+(1-g)*232,b=[];for(let g=0;g<=7;g++){const p=[];for(let y=0;y<=80;y++){const S=y/80;p.push(`${x(S).toFixed(1)},${m(S**g).toFixed(1)}`)}b.push(p.join(" "))}const f=[{text:"1",t:.42,k:0,dy:14},{text:"x",t:.38,k:1,dy:-6},{text:"x²",t:.56,k:2,dy:-6},{text:"x³",t:.68,k:3,dy:-6},{text:"x⁷",t:.93,k:7,dy:14}];return e.jsxs("svg",{viewBox:"0 0 440 280",className:"max-w-full h-auto",role:"img","aria-label":"Die ersten acht Monome auf dem Einheitsintervall",children:[e.jsx("rect",{x:46,y:12,width:378,height:232,className:"fill-none stroke-slate-400"}),[0,.5,1].map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:x(g),y1:m(0),x2:x(g),y2:m(0)+4,className:"stroke-slate-400"}),e.jsx("text",{x:x(g),y:m(0)+16,textAnchor:"middle",fontSize:11,fill:Ge,children:Ze(g,1)})]},`x${g}`)),[0,.5,1].map(g=>e.jsxs("g",{children:[e.jsx("line",{x1:42,y1:m(g),x2:46,y2:m(g),className:"stroke-slate-400"}),e.jsx("text",{x:39,y:m(g)+4,textAnchor:"end",fontSize:11,fill:Ge,children:Ze(g,1)})]},`y${g}`)),b.map((g,p)=>e.jsx("polyline",{points:g,fill:"none",stroke:zn,strokeWidth:p===0?1.8:1.2},p)),f.map(({text:g,t:p,k:y,dy:S})=>e.jsx("text",{x:x(p),y:m(p**y)+S,textAnchor:"middle",fontSize:12,fill:zn,children:g},g)),e.jsx("text",{x:46+378/2,y:277,textAnchor:"middle",fontSize:11,fill:Ge,children:"x →"}),e.jsx("text",{x:14,y:12+232/2,textAnchor:"middle",fontSize:11,fill:Ge,transform:`rotate(-90 14 ${12+232/2})`,children:"φₖ(x) ↑"})]})}function yr({dash:s}){return e.jsx("svg",{width:34,height:10,viewBox:"0 0 34 10",className:"h-2.5 w-[34px] shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:5,x2:33,y2:5,stroke:zn,strokeWidth:2,strokeDasharray:s||void 0})})}function Sr({n:s,aktiv:i}){const f=S=>52+(S-bn)/(Pi-bn)*394,g=S=>14+(1-Math.min(Math.max(S,0),18)/18)*196,p=S=>fn.map((z,o)=>{const j=Number.isFinite(S[o])?Math.log10(S[o]):18;return`${f(z).toFixed(1)},${g(j).toFixed(1)}`}).join(" "),y=s-bn;return e.jsxs("svg",{viewBox:"0 0 460 250",className:"max-w-full h-auto",role:"img","aria-label":"Konditionszahl der Basismatrix gegen die Zahl der Stellen, logarithmische Achse",children:[e.jsx("rect",{x:52,y:14,width:394,height:196,className:"fill-none stroke-slate-400"}),[0,4,8,12,16].map(S=>e.jsxs("g",{children:[e.jsx("line",{x1:52,y1:g(S),x2:446,y2:g(S),className:"stroke-slate-300 dark:stroke-slate-700",strokeDasharray:"2 3"}),e.jsx("text",{x:46,y:g(S)+4,textAnchor:"end",fontSize:10,fill:Ge,children:`10${Ns(S)}`})]},S)),e.jsx("line",{x1:52,y1:g(16),x2:446,y2:g(16),stroke:Qi,strokeDasharray:"6 4"}),e.jsx("text",{x:442,y:g(16)-5,textAnchor:"end",fontSize:10,fill:Qi,children:"1/ε ≈ 10¹⁶: doppelte Genauigkeit aufgebraucht"}),fn.filter(S=>S%2===0).map(S=>e.jsx("text",{x:f(S),y:225,textAnchor:"middle",fontSize:10,fill:Ge,children:S},S)),e.jsx("text",{x:52+394/2,y:246,textAnchor:"middle",fontSize:11,fill:Ge,children:"n (Zahl der Stellen) →"}),e.jsx("text",{x:14,y:14+196/2,textAnchor:"middle",fontSize:11,fill:Ge,transform:`rotate(-90 14 ${14+196/2})`,children:"κ₂(B) ↑"}),Pn.map(S=>e.jsx("polyline",{points:p($n[S.id]),fill:"none",stroke:zn,strokeWidth:S.id===i?2.6:1.3,strokeDasharray:S.dash||void 0,opacity:S.id===i?1:.55},S.id)),e.jsx("line",{x1:f(s),y1:14,x2:f(s),y2:210,className:"stroke-slate-400",strokeDasharray:"3 3"}),Pn.map(S=>{const z=$n[S.id][y],o=Number.isFinite(z)?Math.log10(z):18;return e.jsx("circle",{cx:f(s),cy:g(o),r:S.id===i?4.5:3,fill:zn,opacity:S.id===i?1:.55},S.id)})]})}function _r(){const[s,i]=P.useState(10),[r,l]=P.useState("monom01"),t=s-bn,a=$n[r][t],d=$n.monom01[t],h=Number.isFinite(a)?Math.min(16,Math.log10(a)):16,x=Yi(s,0),m=s>=3?Yi(s,s-2):NaN,b=Pn.find(p=>p.id===r).name,f=s<3?"neutral":h>=15.5?"fail":h>=6?"warn":"neutral",g=s<3?`Mit ${s} Stellen ist die Basismatrix winzig, und alle drei Systeme sind unbedenklich.`:h>=15.5?`${b}: Bei ${s} Stellen frisst die Konditionszahl rechnerisch alle rund 16 Stellen, die doppelte Genauigkeit hergibt. Das gelöste System hat mit dem gemeinten nichts mehr zu tun.`:h>=6?`${b}: Von den rund 16 sicheren Dezimalstellen sind bei ${s} Stellen etwa ${Ze(h,1)} in Gefahr, es bleiben ungefähr ${Ze(16-h,1)} übrig. Das ist keine Kleinigkeit mehr.`:`${b}: Bei ${s} Stellen sind rund ${Ze(h,1)} der etwa 16 sicheren Dezimalstellen in Gefahr, das ist noch harmlos.`;return e.jsxs("div",{className:"my-2 text-sm",children:[e.jsx(ue,{children:"Vergleichen wir die drei Basen und erhöhen dann die Zahl der Stellen."}),e.jsxs("p",{className:"mb-2",children:["Zu ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Stellen bauen wir die",e.jsx(n,{children:"\\,n \\times n"}),"-Basismatrix ",e.jsx(n,{children:"\\bB"})," und schätzen ihre Konditionszahl ",e.jsx(n,{children:"\\kappa_2(\\bB)"})," über die explizit berechnete Inverse. Drei Basissysteme desselben Ansatzraums stehen zur Wahl, die senkrechte Achse ist logarithmisch."]}),e.jsx("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:Pn.map(p=>e.jsx("button",{type:"button",onClick:()=>l(p.id),className:`rounded border px-2 py-1 ${r===p.id?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:p.name},p.id))}),e.jsx(ne,{label:"n (Zahl der Stellen)",value:s,onChange:p=>i(Math.round(p)),min:bn,max:Pi,step:1,fmt:p=>p.toFixed(0)}),e.jsx("div",{className:"my-2 grid gap-2 sm:grid-cols-3",children:Pn.map(p=>e.jsxs("div",{className:`rounded p-2 ${r===p.id?"bg-slate-200 dark:bg-slate-700":"bg-slate-100 dark:bg-slate-800"}`,children:[e.jsxs("p",{className:"flex items-center gap-1.5 font-semibold",style:{color:zn},children:[e.jsx(yr,{dash:p.dash}),p.kurz]}),e.jsxs("p",{className:"font-mono text-xs",children:["κ₂ ≈ ",Tn($n[p.id][t])]})]},p.id))}),e.jsx(Sr,{n:s,aktiv:r}),e.jsxs("p",{className:"mt-2 font-mono text-xs",children:["n = ",s,", Polynomgrad ",s-1,": κ₂ ≈ ",Tn(a)]}),e.jsx(he,{kind:f,children:g}),s>=3?e.jsxs("p",{className:"mt-1",children:[r==="monom01"?"Woher das kommt, zeigen die Spalten dieser Matrix direkt: ":"Woran die Monombasis krankt, zeigen ihre Spalten auf dem Einheitsintervall direkt: ","Die ersten beiden schließen einen Winkel von"," ",e.jsxs("span",{className:"font-mono",children:[Ze(x,1),"°"]})," ein, die letzten beiden nur noch"," ",e.jsxs("span",{className:"font-mono",children:[Ze(m,1),"°"]}),m<6?". So dicht beieinander sind sie kaum noch zu unterscheiden, und die Konditionszahl setzt dieser Ähnlichkeit eine Zahl entgegen.":". Mit wachsendem n rücken sie weiter zusammen.",r==="monom01"?"":e.jsxs(e.Fragment,{children:[" ","Sie steht bei diesem ",e.jsx(n,{children:"n"})," bei κ₂ ≈ ",Tn(d),", das gewählte System bei κ₂ ≈ ",Tn(a),"."]})]}):e.jsxs("p",{className:"mt-1",children:["Bei zwei Stellen hat die Monom-Matrix nur die Spalten"," ",e.jsx(n,{children:"\\bb_1"})," und ",e.jsx(n,{children:"\\bb_2"}),", und die schließen einen Winkel von ",e.jsxs("span",{className:"font-mono",children:[Ze(x,1),"°"]})," ","ein. Erst mit mehr Stellen rücken benachbarte Spalten zusammen, und die Konditionszahl zieht an."]}),e.jsxs("p",{className:"mt-1 text-xs",style:{color:Ge},children:["Die Werte sind Größenordnungen und hängen von der Norm und von der Lage der Stellen ab; jenseits von ",e.jsx(n,{children:"\\kappa_2 \\approx 10^{16}"})," ist die Rechnung, die sie ausgibt, selbst schon vom Rundungsfehler gezeichnet."]})]})}const{blau:Br,gruen:Kr,rot:gi,grau:ji}=ee,pn=s=>1/(1+25*s*s),qs=s=>Array.from({length:s},(i,r)=>s===1?0:-1+2*r/(s-1)),Gs=s=>Array.from({length:s},(i,r)=>Math.cos((2*r+1)*Math.PI/(2*s)));function Mi(s,i){const r=s.map(i),l=s.map((t,a)=>{let d=1;for(let h=0;h<s.length;h++)h!==a&&(d*=t-s[h]);return 1/d});return t=>{let a=0,d=0;for(let h=0;h<s.length;h++){const x=t-s[h];if(Math.abs(x)<1e-13)return r[h];const m=l[h]/x;a+=m*r[h],d+=m}return a/d}}function Fi(s){let i=0,r=0,l=1/0,t=-1/0;for(let a=0;a<=2e3;a++){const d=-1+a/1e3,h=s(d),x=Math.abs(pn(d)-h);x>i&&(i=x,r=d),l=Math.min(l,h),t=Math.max(t,h)}return{fehler:i,ort:r,lo:l,hi:t}}const Fe=3,Yn=21,Jn=[],Ni=[];for(let s=Fe;s<=Yn;s++)Jn.push(Math.log10(Fi(Mi(qs(s),pn)).fehler)),Ni.push(Math.log10(Fi(Mi(Gs(s),pn)).fehler));function es(s,i){const r=Math.min(Yn,Math.max(Fe,i))-Fe,l=Math.min(s.length-2,Math.floor(r));return s[l]+(r-l)*(s[l+1]-s[l])}function ye(s,i=3){return Number.isNaN(s)?"undefiniert":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function Ar({zeigeFehlerkurve:s=!0}={}){const[i,r]=P.useState(11),[l,t]=P.useState("aequi"),a=P.useMemo(()=>l==="aequi"?qs(i):Gs(i),[i,l]),d=P.useMemo(()=>Mi(a,pn),[a]),{fehler:h,ort:x,lo:m,hi:b}=P.useMemo(()=>Fi(d),[d]),f=Math.max(-4,Math.min(-.4,m-.15)),g=Math.min(4,Math.max(1.6,b+.15)),p=m<-4||b>4,y=Math.log10(h),S=i>Fe?10**(l==="aequi"?Jn[i-1-Fe]:Ni[i-1-Fe]):NaN,z=Number.isFinite(S)?h<S:!1,o=Math.abs(x)>.7,j=o?"also nahe am Rand":"also im mittleren Bereich",v=`${l==="cheb"?"Chebyshev-Knoten":"Äquidistante Knoten"}, Grad ${i-1}: größter Abstand ${h>=100?ye(h,0):ye(h)} bei x = ${ye(x,2)}, ${j}.`,B=10**Jn[i-Fe],D=h<.5*B&&h<.2,N=l==="cheb"?D?`${v} Zu den Rändern hin liegen die Knoten dichter, und dort bleibt die Kurve ruhig; äquidistante Knoten lägen hier bei ${ye(B)}.`:`${v} Zu den Rändern hin liegen die Knoten dichter, aber der größte Abstand ist ${h<=B?"kaum kleiner":"sogar größer"} als mit äquidistanten Knoten (${ye(B)}). Der Vorsprung zeigt sich erst bei größerem n.`:h>1?`${v} In der Mitte passt der Interpolant gut, an den Enden schlägt er weit aus.`:o?`${v} Der Ausschlag ist noch klein, sitzt aber schon am Rand; von dort wächst er mit weiteren Knoten.`:`${v} Noch sieht es harmlos aus. Ziehen wir n hoch, wandert das Maximum an den Rand und wächst.`,w=i===Fe?"":z?` Der letzte hinzugekommene Knoten hat den Fehler von ${ye(S,3)} auf ${ye(h,3)} gedrückt.`:` Der letzte hinzugekommene Knoten hat den Fehler von ${ye(S,3)} auf ${ye(h,3)} gehoben.`;return e.jsxs("div",{className:"my-2 text-sm",children:[e.jsx(ue,{children:"Wählen wir eine Knotenfamilie und verändern die Knotenzahl; erst dann lesen wir den Fehler ab."}),e.jsx("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:[["aequi","äquidistante Knoten"],["cheb","Chebyshev-Knoten"]].map(([u,A])=>e.jsx("button",{type:"button",onClick:()=>t(u),className:`rounded border px-2 py-1 ${l===u?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:A},u))}),e.jsx(ne,{label:"n (Zahl der Knoten)",value:i,onChange:u=>r(Math.round(u)),min:Fe,max:Yn,step:1,fmt:u=>u.toFixed(0)}),e.jsxs("div",{className:"my-2 flex flex-wrap items-start gap-5",children:[e.jsxs("div",{children:[e.jsx(He,{xLabel:"x",yLabel:"y",series:[{f:pn,color:ji},{f:d,color:Kr}],xDomain:[-1,1],yDomain:[f,g],width:360,height:250,markers:a.map(u=>({x:u,y:pn(u),color:Br}))}),e.jsxs("p",{className:"mt-1 max-w-[22rem] text-center text-xs",style:{color:ji},children:["Grau die Funktion ",e.jsx(n,{children:"f"}),", blau die Stützpunkte, grün der Interpolant.",p?" Der Interpolant verlässt am Rand das gezeichnete Fenster.":""]})]}),s?e.jsxs("div",{children:[e.jsx(He,{xLabel:"n (Knoten)",yLabel:"log₁₀ max|f−p|",series:[{f:u=>es(Jn,u),color:gi},{f:u=>es(Ni,u),color:gi,dash:[5,4]}],xDomain:[Fe,Yn],yDomain:[-2.4,2.4],width:300,height:220,markers:[{x:i,y,color:gi}]}),e.jsx("p",{className:"mt-1 max-w-[19rem] text-center text-xs",style:{color:ji},children:"Beide Kurven messen dieselbe Größe und tragen deshalb dieselbe Farbe: durchgezogen die äquidistanten, gestrichelt die Chebyshev-Knoten."})]}):null]}),e.jsxs("p",{className:"font-mono text-xs",children:["n = ",i,", Grad ",i-1,", ",l==="aequi"?"äquidistant":"Chebyshev",": max|f − p| ≈"," ",h>=100?ye(h,0):ye(h)]}),e.jsxs(he,{kind:l==="aequi"&&h>1?"fail":l==="cheb"?D?"ok":"neutral":"warn",children:[N,w,l==="aequi"?e.jsxs(e.Fragment,{children:[" ","Das illustriert ",xe("bemerkung:divergenz-schon-aber-nicht-monoton"),": Bei äquidistanten Knoten wächst der Fehler asymptotisch, aber nicht monoton."]}):null]})]})}function ns(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"})," hat das ",e.jsx(c,{id:"env:interpolationsproblem",children:"Interpolationsproblem"}),` auf das lineare
Gleichungssystem `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` zurückgeführt. Damit ist die Wahl des
`,e.jsx(c,{id:"env:ansatzraum-basisdarstellung",children:"Ansatzraums"}),` die eigentliche Entscheidung, und die naheliegendste ist zugleich
die älteste: Polynome, aufgeschrieben in der Monombasis. Theoretisch ist der
Fall einfach: Durch `,e.jsx(n,{children:"n"}),` Punkte läuft genau ein Polynom vom Grad höchstens
`,e.jsx(n,{children:"n-1"}),`. Numerisch hat der Ansatz drei Probleme: Kondition, Stabilität und
Konvergenz.`]}),`
`,e.jsx(i.h3,{children:"Wie viele Nullstellen ein Polynom haben kann"}),`
`,e.jsx(i.p,{children:"Die Eindeutigkeit hängt an einer Aussage über Nullstellen aus der Algebra."}),`
`,e.jsxs(k,{kind:"Satz",label:"13.3.1 (Fundamentalsatz der Algebra)",id:"env-fundamentalsatz-der-algebra",children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(c,{id:"polynomial",children:"Polynom"}),`
`,e.jsx(n,{children:"p(x) = a_n x^n + \\dots + a_1 x + a_0"})," mit ",e.jsx(n,{children:"a_n \\neq 0"})," und ",e.jsx(n,{children:"n \\ge 1"}),` hat
mindestens eine `,e.jsx(c,{id:"polynomial-roots",children:"Nullstelle"})," in ",e.jsx(n,{children:"\\C"}),"."]}),e.jsxs(i.p,{children:["Gleichwertig dazu: Jedes Polynom vom Grad ",e.jsx(n,{children:"n"})," hat in ",e.jsx(n,{children:"\\C"})," genau ",e.jsx(n,{children:"n"}),`
Nullstellen, wenn wir sie mit Vielfachheit zählen.`]})]}),`
`,e.jsx(k,{kind:"Korollar",label:"13.3.2 (Zu viele Nullstellen erzwingen das Nullpolynom)",id:"env-zu-viele-nullstellen-erzwingen-das",children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"p"})," ein Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"})," mit ",e.jsx(n,{children:"n"}),` paarweise verschiedenen
Nullstellen. Dann ist `,e.jsx(n,{children:"p"})," das Nullpolynom, es gilt also ",e.jsx(n,{children:"p(x) = 0"}),` für
`,e.jsx(i.em,{children:"alle"})," ",e.jsx(n,{children:"x"}),"."]})}),`
`,e.jsxs(H,{title:"Gleichwertigkeit der Fassungen und Beweis der Folgerung",children:[e.jsxs(i.p,{children:["Die beiden Fassungen von ",e.jsx(c,{id:"env:fundamentalsatz-der-algebra",href:"#env-fundamentalsatz-der-algebra",children:"Satz 13.3.1"}),` gehen durch
Polynomdivision auseinander hervor: Ist `,e.jsx(n,{children:"x_0"}),`
eine Nullstelle von `,e.jsx(n,{children:"p"}),`, so lässt sich der Linearfaktor abspalten,
`,e.jsx(n,{children:"p(x) = (x - x_0)\\, q(x)"})," mit ",e.jsx(n,{children:"\\deg q = n - 1"}),", und auf ",e.jsx(n,{children:"q"}),` wenden wir
dieselbe Überlegung an. Nach `,e.jsx(n,{children:"n"})," Schritten ist ",e.jsx(n,{children:"p"}),` vollständig in
Linearfaktoren zerlegt.`]}),e.jsxs(me,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:["der Grad eines Polynoms ist der größte Index mit ",e.jsx(n,{children:"a_d \\neq 0"}),"; nur das Nullpolynom hat gar keinen solchen Index"]}),children:e.jsxs(i.p,{children:["Nehmen wir an, ",e.jsx(n,{children:"p"})," sei nicht das Nullpolynom. Dann besitzt ",e.jsx(n,{children:"p"}),` einen Grad
`,e.jsx(n,{children:"d"})," mit ",e.jsx(n,{children:"0 \\le d \\le n-1"})," und einen führenden Koeffizienten ",e.jsx(n,{children:"a_d \\neq 0"}),"."]})}),e.jsx(F,{children:e.jsxs(i.p,{children:["Im Fall ",e.jsx(n,{children:"d = 0"})," ist ",e.jsx(n,{children:"p"})," die konstante Funktion ",e.jsx(n,{children:"a_0 \\neq 0"}),` und hat
überhaupt keine Nullstelle. Das widerspricht der Voraussetzung, denn
`,e.jsx(n,{children:"n \\ge 1"}),"."]})}),e.jsx(F,{why:e.jsx(e.Fragment,{children:"verschiedene Nullstellen zählen mindestens einfach, ihre Anzahl ist also höchstens die Zahl der mit Vielfachheit gezählten"}),children:e.jsxs(i.p,{children:["Im Fall ",e.jsx(n,{children:"d \\ge 1"})," hat ",e.jsx(n,{children:"p"})," nach ",e.jsx(c,{id:"env:fundamentalsatz-der-algebra",href:"#env-fundamentalsatz-der-algebra",children:"Satz 13.3.1"}),` mit Vielfachheit gezählt genau
`,e.jsx(n,{children:"d"})," Nullstellen in ",e.jsx(n,{children:"\\C"}),", also höchstens ",e.jsx(n,{children:"d \\le n-1"}),` verschiedene. Auch das
widerspricht der Voraussetzung von `,e.jsx(n,{children:"n"})," verschiedenen Nullstellen."]})}),e.jsx(F,{children:e.jsxs(i.p,{children:["Beide Fälle sind unmöglich, die Annahme fällt. Also ist ",e.jsx(n,{children:"p"})," das Nullpolynom."]})})]})]}),`
`,e.jsx(k,{kind:"Beispiel",label:"13.3.3 (Drei Nullstellen bei Grad höchstens zwei)",id:"env-drei-nullstellen-bei-grad-hoechstens",children:e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"2"}),` hat höchstens zwei verschiedene
Nullstellen; das kennen wir von der Parabel. Finden wir also ein solches
Polynom mit drei Nullstellen, etwa `,e.jsx(n,{children:"p(-1) = p(0) = p(1) = 0"}),`, so bleibt nur
ein Schluss: `,e.jsx(n,{children:"p"})," ist das Nullpolynom, und dann ist auch ",e.jsx(n,{children:"p(7) = 0"}),` und
`,e.jsx(n,{children:"p(10^6) = 0"}),"."]})}),`
`,e.jsx(i.h3,{children:"Genau ein Polynom durch n Punkte"}),`
`,e.jsxs(i.p,{children:["Ansatzraum und Basismatrix kennen wir schon aus ",e.jsx(i.a,{href:"#env-zwei-ansatzraeume",children:"Beispiel 13.2.6"}),`;
hier bekommen sie ihre Namen.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.3.4 (Monombasis und Vandermonde-Matrix)",id:"env-monombasis-und-vandermonde-matrix",children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"n"})," Funktionen"]}),e.jsx(_,{children:`\\corange{\\phi_1(x)} = 1, \\quad
\\corange{\\phi_2(x)} = x, \\quad \\dots, \\quad
\\corange{\\phi_n(x)} = x^{n-1}`}),e.jsxs(i.p,{children:["heißen ",e.jsx(i.em,{children:"Monombasis"}),` (monomial basis). Sie sind
`,e.jsx(c,{id:"linear-independence",children:"linear unabhängig"}),` und spannen den Ansatzraum
`,e.jsx(n,{children:"\\Fcal_n"})," aller Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` auf, der damit die
Dimension `,e.jsx(n,{children:"n"})," hat."]}),e.jsxs(i.p,{children:["Die zugehörige Basismatrix aus ",e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})," zu Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n"}),`
heißt `,e.jsx(i.em,{children:"Vandermonde-Matrix"}),":"]}),e.jsx(_,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{x_1} & \\corange{x_1^2} & \\cdots & \\corange{x_1^{n-1}} \\\\
\\corange{1} & \\corange{x_2} & \\corange{x_2^2} & \\cdots & \\corange{x_2^{n-1}} \\\\
\\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
\\corange{1} & \\corange{x_n} & \\corange{x_n^2} & \\cdots & \\corange{x_n^{n-1}}
\\end{pmatrix} \\in \\R^{n \\times n} .`})]}),`
`,e.jsxs(i.p,{children:["Dass die Monome linear unabhängig sind, folgt aus ",e.jsx(c,{id:"env:zu-viele-nullstellen-erzwingen-das",href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),": Verschwindet ",e.jsx(n,{children:"\\sum_{k=1}^n a_k x^{k-1}"})," für alle ",e.jsx(n,{children:"x"}),`, so hat
dieses Polynom vom Grad höchstens `,e.jsx(n,{children:"n-1"}),` unendlich viele Nullstellen, ist also
das Nullpolynom, und damit sind alle `,e.jsx(n,{children:"a_k"})," null."]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.3.5 (Existenz und Eindeutigkeit der Polynominterpolation)",id:"env-existenz-und-eindeutigkeit-der",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(n,{children:"n"})," Paaren ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"})," gibt es ",e.jsx(i.em,{children:"genau ein"})," Polynom ",e.jsx(n,{children:"\\cgreen{p}"}),` vom Grad
`,e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"})," mit"]}),e.jsx(_,{children:`\\cgreen{p(x_i)} = \\cblue{y_i}
\\qquad \\text{für } i = 1, \\dots, n .`}),e.jsx(i.p,{children:`Gleichbedeutend damit ist: Die Vandermonde-Matrix zu paarweise verschiedenen
Stellen ist invertierbar.`})]}),`
`,e.jsxs(me,{children:[e.jsxs(F,{why:e.jsx(e.Fragment,{children:"beide erfüllen dieselbe Interpolationsbedingung an derselben Stelle"}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Eindeutigkeit."})," Seien ",e.jsx(n,{children:"\\cgreen{p}"})," und ",e.jsx(n,{children:"\\cgreen{q}"}),` zwei Polynome vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),`, die beide interpolieren. Für ihre Differenz gilt an jeder
Stelle`]}),e.jsx(_,{children:`(\\cgreen{p} - \\cgreen{q})(x_i)
= \\cgreen{p(x_i)} - \\cgreen{q(x_i)}
= \\cblue{y_i} - \\cblue{y_i} = 0 .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["die Differenz zweier Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"})," hat wieder Grad höchstens ",e.jsx(n,{children:"n-1"})]}),children:e.jsxs(i.p,{children:["Damit hat ",e.jsx(n,{children:"\\cgreen{p} - \\cgreen{q}"})," mindestens ",e.jsx(n,{children:"n"}),` verschiedene Nullstellen,
obwohl der Grad höchstens `,e.jsx(n,{children:"n-1"})," ist. Nach ",e.jsx(c,{id:"env:zu-viele-nullstellen-erzwingen-das",href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` ist die Differenz
das Nullpolynom, also `,e.jsx(n,{children:"\\cgreen{p} = \\cgreen{q}"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bB\\ba"})," ist der Vektor der Werte dieses Polynoms an den Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n"})]}),children:e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Invertierbarkeit von ",e.jsx(n,{children:"\\bB"}),"."]})," Sei ",e.jsx(n,{children:"\\ba \\in \\R^n"})," mit ",e.jsx(n,{children:"\\bB\\ba = \\bnull"}),`. Nach
`,e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})," heißt das: Das Polynom ",e.jsx(n,{children:"\\sum_{k=1}^n a_k x^{k-1}"}),` verschwindet an
allen `,e.jsx(n,{children:"n"})," Stellen. ",e.jsx(c,{id:"env:zu-viele-nullstellen-erzwingen-das",href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` macht daraus das Nullpolynom, und weil die
Monome linear unabhängig sind, folgt `,e.jsx(n,{children:"\\ba = \\bnull"}),"."]})}),e.jsx(F,{children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bB"}),` ist quadratisch und hat nur den trivialen
`,e.jsx(c,{id:"kernel",children:"Kern"}),", ist also invertierbar. Damit besitzt ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),`
für jede rechte Seite genau eine Lösung, und das ist die `,e.jsx(i.em,{children:"Existenz"}),`: Zu jedem
Datenvektor gehört ein interpolierendes Polynom, nämlich
`,e.jsx(n,{children:"\\cgreen{p} = \\sum_{k=1}^n a_k \\corange{\\phi_k}"}),"."]})})]}),`
`,e.jsx(i.h3,{children:"Höchstens, nicht genau"}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.3.6 (Ein häufiges Missverständnis)",id:"env-ein-haeufiges-missverstaendnis",children:e.jsxs(i.p,{children:[e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` verspricht genau ein Polynom vom Grad
`,e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"}),", nicht vom Grad ",e.jsx(i.em,{children:"genau"})," ",e.jsx(n,{children:"n-1"}),`. Der führende Koeffizient darf null
sein, und wenn die Daten schon auf einem Polynom kleineren Grades liegen, ist
er es auch. Der Ansatzraum `,e.jsx(n,{children:"\\Fcal_n"})," enthält diese Polynome ebenfalls."]})}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.3.7 (Drei Punkte auf einer Geraden)",id:"env-drei-punkte-auf-einer-geraden",children:[e.jsxs(i.p,{children:["Für die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,2)}"}),`
lautet das System aus `,e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})]}),e.jsx(_,{children:`\\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{1} \\\\
\\corange{1} & \\corange{2} & \\corange{4}
\\end{pmatrix}
\\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}
= \\begin{pmatrix} \\cblue{0} \\\\ \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix},
\\qquad \\text{Lösung} \\quad
\\cgreen{\\ba} = (0, 1, 0)^\\top .`}),e.jsxs(i.p,{children:["Das eindeutige Polynom vom Grad höchstens ",e.jsx(n,{children:"2"})," ist also"]}),e.jsx(_,{children:"\\cgreen{p(x)} = \\cgreen{0} \\cdot x^2 + 1 \\cdot x + 0 = x,"}),e.jsxs(i.p,{children:["eine Gerade und damit vom Grad ",e.jsx(n,{children:"1"}),`. Die Eindeutigkeit gilt trotzdem: Ein
zweites Polynom vom Grad höchstens `,e.jsx(n,{children:"2"}),` durch dieselben drei Punkte gibt es
nicht.`]})]}),`
`,e.jsx(i.h3,{children:"Der Rechenweg und sein Aufwand"}),`
`,e.jsxs(k,{kind:"Algorithmus",label:"13.3.8 (Polynominterpolation in der Monombasis)",id:"env-polynominterpolation-in-der-monombasis",children:[e.jsxs(i.p,{children:["Gegeben seien Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Vandermonde-Matrix aufstellen:"})," ",e.jsx(n,{children:"B_{ik} = x_i^{k-1}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"System lösen:"})," ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` mit
`,e.jsx(c,{id:"gaussian-elimination",children:"Gauß-Elimination"}),`
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),"), Aufwand ",e.jsx(n,{children:"O(n^3)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Auswerten:"})," ",e.jsx(n,{children:"\\cgreen{p(x)} = \\sum_{k=1}^n a_k x^{k-1}"}),` an den
gewünschten Stellen.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.code,{children:"R"})," sind das wenige Zeilen, hier für ",e.jsx(n,{children:"n = 10"})," Stellen in ",e.jsx(n,{children:"[0, 1]"}),` und
eine Funktion `,e.jsx(i.code,{children:"f"}),", deren Werte wir interpolieren."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`x <- seq(0, 1, length = 10)
y <- f(x)

B <- outer(x, 0:9, "^")  # Vandermonde-Matrix: cbind(1, x, x^2, ...)
a <- solve(B, y)

xnew <- seq(0, 1, length = 100)
fhat <- outer(xnew, 0:9, "^") %*% a

ggplot() + geom_point(aes(x, y)) + geom_line(aes(xnew, fhat))
`})}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:'outer(x, 0:9, "^")'}),` erzeugt die Matrix aus
`,e.jsx(c,{id:"env:monombasis-und-vandermonde-matrix",href:"#env-monombasis-und-vandermonde-matrix",children:"Definition 13.3.4"}),", ",e.jsx(i.code,{children:"solve"}),` ruft die Elimination
auf, und die Auswertung auf dem feinen Gitter ist wieder ein
Matrix-Vektor-Produkt. Dieses `,e.jsx(n,{children:"10 \\times 10"}),`-System verliert allerdings etwa
sieben der rund `,e.jsx(n,{children:"16"}),` Dezimalstellen doppelter Genauigkeit; warum, zeigt der
nächste Unterabschnitt.`]}),`
`,e.jsx(i.h3,{children:"Problem 1: die Kondition der Monombasis"}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.3.9 (Warum die Spalten fast parallel werden)",id:"env-warum-die-spalten-fast-parallel-werden",children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"k"}),"-te Spalte der Vandermonde-Matrix ist der Vektor"]}),e.jsx(_,{children:"\\bb_k = \\bigl(x_1^{k-1}, x_2^{k-1}, \\dots, x_n^{k-1}\\bigr)^\\top ."}),e.jsxs(i.p,{children:["Für wachsendes ",e.jsx(n,{children:"k"}),` unterscheiden sich diese Vektoren immer weniger in ihrer
`,e.jsx(i.em,{children:"Richtung"}),": Auf ",e.jsx(n,{children:"[0, 1]"}),` verkleinert jedes weitere Potenzieren alle Einträge
außer dem letzten, der zu `,e.jsx(n,{children:"x_n = 1"}),` gehört, und so konzentrieren sich die
Vektoren immer mehr auf ihre letzten Komponenten. Bei `,e.jsx(n,{children:"n = 10"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` schließen
`,e.jsx(n,{children:"\\bb_1"})," und ",e.jsx(n,{children:"\\bb_2"})," noch einen Winkel von ",e.jsx(n,{children:"32{,}6^\\circ"}),` ein,
`,e.jsx(n,{children:"\\bb_5"})," und ",e.jsx(n,{children:"\\bb_6"})," nur noch ",e.jsx(n,{children:"5{,}5^\\circ"}),", und ",e.jsx(n,{children:"\\bb_9"})," und ",e.jsx(n,{children:"\\bb_{10}"}),`
nur `,e.jsx(n,{children:"2{,}7^\\circ"}),"."]}),e.jsxs(i.p,{children:["Fast parallele Spalten heißen: fast ",e.jsx(c,{id:"linear-independence",children:"linear abhängig"}),`,
also eine Matrix, die einer singulären nahe kommt. Das misst die
`,e.jsx(c,{id:"condition-number",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa(\\bB)"}),`
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),"), und sie wächst hier sehr schnell."]})]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.3.10 (Konditionszahlen, der Größenordnung nach)",id:"env-konditionszahlen-der-groessenordnung",children:[e.jsxs(i.p,{children:["Wir interpolieren an ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` durch ein
Polynom vom Grad `,e.jsx(n,{children:"n-1"})," und sehen uns die Konditionszahl der Vandermonde-Matrix an."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"n"})}),e.jsx(i.th,{style:{textAlign:"center"},children:"Polynomgrad"}),e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\kappa_2(\\bB)"})}),e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\kappa_\\infty(\\bB)"})})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"5"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"6{,}9 \\cdot 10^{2}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}7 \\cdot 10^{3}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"10"}),e.jsx(i.td,{style:{textAlign:"center"},children:"9"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}5 \\cdot 10^{7}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}8 \\cdot 10^{7}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"15"}),e.jsx(i.td,{style:{textAlign:"center"},children:"14"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}0 \\cdot 10^{11}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}6 \\cdot 10^{12}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"20"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}1 \\cdot 10^{16}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}9 \\cdot 10^{16}"})})]})]})]}),e.jsxs(i.p,{children:[`Die Werte sind als Größenordnungen zu lesen; sie hängen von der
`,e.jsx(c,{id:"matrix-norm",children:"Norm"})," ab und von der Lage der Stellen. Auf ",e.jsx(n,{children:"[-1, 1]"}),` statt
`,e.jsx(n,{children:"[0, 1]"})," liefert dieselbe Rechnung bei ",e.jsx(n,{children:"n = 20"}),` nur
`,e.jsx(n,{children:"\\kappa_2 \\approx 2{,}7 \\cdot 10^{8}"}),"."]}),e.jsxs(i.p,{children:[`Entscheidend ist der Trend, und der ist in jeder Norm derselbe: exponentielles
Wachstum. Die Faustregel aus `,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),` beschränkt
den relativen Fehler der berechneten Koeffizienten der Größenordnung nach
durch `,e.jsx(n,{children:"\\kappa(\\bB) \\cdot \\eps"}),` mit
`,e.jsx(n,{children:"\\eps \\approx 2{,}2 \\cdot 10^{-16}"}),`
(`,e.jsx(c,{id:"machine-epsilon",children:"Maschinengenauigkeit"}),`,
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.1",children:"Abschnitt 4.1"}),"). Bei ",e.jsx(n,{children:"n = 10"})," steht dort ",e.jsx(n,{children:"\\cred{3 \\cdot 10^{-9}}"}),`,
bei `,e.jsx(n,{children:"n = 15"})," schon ",e.jsx(n,{children:"\\cred{10^{-4}}"}),". Bei ",e.jsx(n,{children:"n = 20"}),` ist die Schranke mit
`,e.jsx(n,{children:"\\cred{2}"}),` größer als die gesuchten Zahlen selbst: Von der Lösung bleibt
nichts Verlässliches übrig.`]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.3.11 (Der Ausweg: orthogonalisierte Basen)",id:"env-der-ausweg-orthogonalisierte-basen",children:[e.jsxs(i.p,{children:["Die schlechte Kondition ist eine Eigenschaft der ",e.jsx(i.em,{children:"Basis"}),`, nicht des
Ansatzraums. Nach `,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` ändert ein Basiswechsel den
Interpolanten nicht, nur die Koeffizienten und den Rechenweg. Wählen wir
Basisfunktionen, die sich weniger ähneln, wird die Basismatrix besser
konditioniert. Klassisch sind dafür die `,e.jsx(i.em,{children:"orthogonalen Polynome"}),`
(Legendre, Chebyshev, Hermite), die bezüglich eines Skalarprodukts von
Funktionen `,e.jsx(c,{id:"orthogonality",children:"orthogonal"}),` sind. An denselben
gleichmäßig verteilten Stellen wie oben liefern die Chebyshev-Polynome
`,e.jsx(n,{children:"\\kappa_2 \\approx 2{,}2"})," statt ",e.jsx(n,{children:"6{,}9 \\cdot 10^2"})," bei ",e.jsx(n,{children:"n = 5"}),` und
`,e.jsx(n,{children:"\\kappa_2 \\approx 4{,}8 \\cdot 10^3"})," statt ",e.jsx(n,{children:"1{,}1 \\cdot 10^{16}"}),` bei
`,e.jsx(n,{children:"n = 20"}),", ein Gewinn von zwölf Zehnerpotenzen."]}),e.jsxs(i.p,{children:["Das einfachste ",e.jsx(c,{id:"inner-product-functions",children:"Skalarprodukt"}),` von Funktionen
auf `,e.jsx(n,{children:"[-1, 1]"})," ist ",e.jsx(n,{children:"\\langle f, g \\rangle = \\int_{-1}^{1} f(x)\\, g(x) \\dx"}),`, das Gegenstück zu
`,e.jsx(n,{children:"\\bx^\\top\\by"})," im ",e.jsx(n,{children:"\\R^n"}),`. Mit ihm läuft das
`,e.jsx(c,{id:"gram-schmidt",children:"Gram-Schmidt-Verfahren"})," aus ",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),` im Funktionenraum
wie im `,e.jsx(n,{children:"\\R^n"}),": Auf die Monome ",e.jsx(n,{children:"1, x, x^2"})," angewandt, lässt es ",e.jsx(n,{children:"x"}),`
unverändert, weil `,e.jsx(n,{children:"\\langle x, 1 \\rangle = 0"})," ist, und macht aus ",e.jsx(n,{children:"x^2"})]}),e.jsx(_,{children:`p_2(x) = x^2 - \\frac{\\langle x^2, 1 \\rangle}{\\langle 1, 1 \\rangle} \\cdot 1 -
\\frac{\\langle x^2, x \\rangle}{\\langle x, x \\rangle} \\cdot x
= x^2 - \\frac{2/3}{2} - 0 = x^2 - \\frac{1}{3} ,`}),e.jsxs(i.p,{children:["bis auf einen Faktor das Legendre-Polynom ",e.jsx(n,{children:"P_2(x) = \\tfrac{1}{2}(3x^2 - 1)"}),`.
Legendre-, Chebyshev- und Hermite-Polynome entstehen so aus verschiedenen
Skalarprodukten, also verschiedenen Gewichtsfunktionen und Intervallen.`]}),e.jsxs(i.p,{children:["In ",e.jsx(i.code,{children:"R"})," ersetzt ",e.jsx(i.code,{children:"poly(x, 3)"})," die Spalten ",e.jsx(i.code,{children:"cbind(x, x^2, x^3)"}),` durch Spalten,
die bezüglich des diskreten Skalarprodukts `,e.jsx(n,{children:"\\sum_i f(x_i)\\, g(x_i)"}),` an den
`,e.jsx(i.em,{children:"gegebenen"}),` Stellen orthonormal sind; berechnet werden sie
über eine stabile Orthogonalisierung der Vandermonde-Spalten. In
`,e.jsx(i.code,{children:"cbind(1, poly(x, 3))"}),` stehen dann alle Spalten senkrecht aufeinander, mit den
Längen `,e.jsx(n,{children:"\\sqrt n, 1, 1, 1"}),". Die Konditionszahl dieser Matrix ist ",e.jsx(n,{children:"\\sqrt n"}),"."]})]}),`
`,e.jsxs(ae,{title:"Die Monombasis und ihre Kondition",children:[e.jsxs(i.p,{children:["Warum sind die Spalten einer Vandermonde-Matrix auf ",e.jsx(n,{children:"[0,1]"})," fast parallel? Die erste Tafel macht die Ursache sichtbar."]}),e.jsx(zr,{}),e.jsx(i.p,{children:`Der Regler erhöht die Zahl der Stellen, die Schalter wechseln zwischen drei
Basissystemen desselben Ansatzraums.`}),e.jsx(_r,{}),e.jsxs(i.p,{children:[`Beide Monom-Kurven sind im logarithmischen Bild ungefähr Geraden, ihre
Konditionszahl wächst also exponentiell in `,e.jsx(n,{children:"n"}),". Verschieben auf ",e.jsx(n,{children:"[-1, 1]"}),`
drückt nur die Steigung, Chebyshev drückt sie deutlich stärker.`]})]}),`
`,e.jsx(i.h3,{children:"Problem 2: Stabilität und Lokalität"}),`
`,e.jsx(i.p,{children:`Ändern wir einen einzigen Messwert, so ändert sich der Interpolant im
gesamten Intervall, und oft nicht am stärksten dort, wo wir geändert haben.`}),`
`,e.jsxs(k,{kind:"Satz",label:"13.3.12 (Wie sich eine Datenänderung fortpflanzt)",id:"env-wie-sich-eine-datenaenderung-fortpflanzt",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cgreen{p}"})," das interpolierende Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` zu
den Daten `,e.jsx(n,{children:"\\cblue{(x_i, y_i)}"})," und ",e.jsx(n,{children:"\\cgreen{\\wt{p}}"}),` das interpolierende
Polynom zu denselben Daten, bei denen nur `,e.jsx(n,{children:"\\cblue{y_j}"})," um ",e.jsx(n,{children:"\\cred{\\delta}"}),`
verändert wurde. Dann gilt`]}),e.jsx(_,{children:"\\cgreen{\\wt{p}} - \\cgreen{p} = \\cred{\\delta} \\cdot \\ell_j,"}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\ell_j"})," das eindeutige Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` mit
`,e.jsx(n,{children:"\\ell_j(x_j) = 1"})," und ",e.jsx(n,{children:"\\ell_j(x_i) = 0"})," für ",e.jsx(n,{children:"i \\neq j"})," ist."]})]}),`
`,e.jsxs(me,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:["beide Polynome interpolieren dieselben Daten bis auf den ",e.jsx(n,{children:"j"}),"-ten Wert, ihre Differenz interpoliert also die Differenz der Daten"]}),children:e.jsxs(i.p,{children:["Die Differenz ",e.jsx(n,{children:"\\cgreen{\\wt{p}} - \\cgreen{p}"}),` ist ein Polynom vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),`, und an den Stellen nimmt sie die Werte
`,e.jsx(n,{children:"0, \\dots, 0, \\cred{\\delta}, 0, \\dots, 0"})," an, mit ",e.jsx(n,{children:"\\cred{\\delta}"}),` an der
`,e.jsx(n,{children:"j"}),"-ten Position."]})}),e.jsx(F,{children:e.jsxs(i.p,{children:["Dieselben Werte hat ",e.jsx(n,{children:"\\cred{\\delta} \\cdot \\ell_j"}),`, und auch dieses Polynom hat
Grad höchstens `,e.jsx(n,{children:"n-1"}),". Nach der Eindeutigkeit in ",e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` sind beide
Polynome gleich.`]})})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.3.13 (Was das in Zahlen heißt)",id:"env-was-das-in-zahlen-heisst",children:[e.jsxs(i.p,{children:["Die Polynome ",e.jsx(n,{children:"\\ell_j"})," heißen ",e.jsx(i.em,{children:"Lagrange-Grundpolynome"}),", und ",e.jsx(c,{id:"env:wie-sich-eine-datenaenderung-fortpflanzt",href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"}),` sagt:
Der Ausschlag einer Datenänderung ist überall dort groß, wo `,e.jsx(n,{children:"|\\ell_j|"}),` groß
ist. Rechnen wir das für `,e.jsx(n,{children:"n = 10"})," gleichmäßig verteilte Stellen in ",e.jsx(n,{children:"[0, 1]"}),`
aus und heben den fünften Wert bei `,e.jsx(n,{children:"x_5 = 4/9 \\approx 0{,}444"}),` um
`,e.jsx(n,{children:"\\cred{\\delta} = 0{,}1"}),` an, so verschiebt sich der Interpolant um bis zu
`,e.jsx(n,{children:"\\cred{0{,}40}"}),`, das Vierfache der Störung. Erreicht wird dieses Maximum bei
`,e.jsx(n,{children:"x \\approx 0{,}035"}),", also am ",e.jsx(i.em,{children:"anderen Ende"}),` des Intervalls. Der größte solche
Verstärkungsfaktor liegt bei diesen zehn Stellen bei `,e.jsx(n,{children:"4{,}03"}),` und gehört zu
den beiden mittleren, `,e.jsx(n,{children:"x_5"})," und ",e.jsx(n,{children:"x_6"}),"."]}),e.jsxs(i.p,{children:["Die Methode ist also ",e.jsx(i.em,{children:"instabil"}),`, weil sie kleine Datenänderungen verstärkt,
und `,e.jsx(i.em,{children:"nicht lokal"}),", weil jedes ",e.jsx(n,{children:"\\ell_j"}),` auf dem ganzen Intervall von null
verschieden ist. Beides liegt am Ansatzraum, nicht an der Basis, denn `,e.jsx(n,{children:"\\ell_j"}),`
ist durch die Stellen und den Ansatzraum festgelegt. Abhilfe schafft erst ein
Ansatzraum aus Basisfunktionen, die außerhalb eines kleinen Bereichs
verschwinden (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")."]})]}),`
`,e.jsx(H,{title:"Wenn alle Werte gleichzeitig gestört werden",children:e.jsxs(i.p,{children:[`Wie groß der Effekt werden kann, hängt an der Zahl der Stellen. Stören wir alle
Werte gleichzeitig um höchstens `,e.jsx(n,{children:"\\cred{\\delta}"}),`, so ändert sich der
Interpolant um höchstens `,e.jsx(n,{children:"\\Lambda_n \\cdot \\cred{\\delta}"}),` mit
`,e.jsx(n,{children:"\\Lambda_n = \\max_x \\sum_{j=1}^n |\\ell_j(x)|"}),`, und diese Schranke wird bei
passend gewählten Vorzeichen auch angenommen. Für gleichmäßig verteilte
Stellen wächst diese Zahl schnell, nämlich auf `,e.jsx(n,{children:"2{,}2"})," bei ",e.jsx(n,{children:"n = 5"}),", ",e.jsx(n,{children:"17{,}9"})," bei ",e.jsx(n,{children:"n = 10"}),`,
`,e.jsx(n,{children:"283"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"5890"})," bei ",e.jsx(n,{children:"n = 20"}),`. Für die Chebyshev-Knoten, die uns
gleich wieder begegnen, bleibt sie im selben Bereich zwischen `,e.jsx(n,{children:"2{,}0"}),` und
`,e.jsx(n,{children:"2{,}9"}),"."]})}),`
`,e.jsx(i.h3,{children:"Das Runge-Phänomen"}),`
`,e.jsx(i.p,{children:`Wird wenigstens der Interpolant selbst besser, wenn wir mehr Stützstellen
nehmen? Bei einer beliebig oft differenzierbaren Funktion wäre das zu
erwarten; Carl Runge hat 1901 gezeigt, dass es nicht stimmt.`}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.3.14 (Runge 1901)",id:"env-runge-1901",children:[e.jsx(i.p,{children:"Wir interpolieren"}),e.jsx(_,{children:`f(x) = \\frac{1}{1 + 25x^2}
\\qquad \\text{auf } [-1, 1]`}),e.jsxs(i.p,{children:["an ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Knoten durch das Polynom ",e.jsx(n,{children:"\\cgreen{p_{n-1}}"}),` vom
Grad `,e.jsx(n,{children:"n-1"}),". Die Funktion ",e.jsx(n,{children:"f"})," ist ",e.jsx(c,{id:"smooth-function",children:"beliebig oft differenzierbar"}),`, also
`,e.jsx(n,{children:"f \\in \\Ccal^\\infty"}),", und beschränkt durch ",e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:["Trotzdem konvergieren die Interpolanten nicht gleichmäßig gegen ",e.jsx(n,{children:"f"}),`. Der
Fehler `,e.jsx(n,{children:`\\left\\|f - \\cgreen{p_{n-1}}\\right\\|_\\infty = \\max_{x \\in [-1,1]}
\\left|f(x) - \\cgreen{p_{n-1}(x)}\\right|`}),` wächst über alle Grenzen, und zwar
durch immer stärkere `,e.jsx(n,{children:"\\cred{\\text{Oszillationen}}"}),` nahe den
Intervallenden. In der Mitte passt sich das Polynom dabei immer besser an.`]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.3.15 (Divergenz schon, aber nicht monoton)",id:"env-divergenz-schon-aber-nicht-monoton",children:[e.jsxs(i.p,{children:[`Die knappe Schreibweise
`,e.jsx(n,{children:"\\left\\|f - \\cgreen{p_{n-1}}\\right\\|_\\infty \\to \\infty"})," für ",e.jsx(n,{children:"n \\to \\infty"}),`
legt nahe, dass jeder zusätzliche Knoten die Lage verschlimmert; das ist
nicht so. Für gleichmäßig verteilte Knoten ergeben sich diese größten Fehler:`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"center"},children:[e.jsx(n,{children:"n"})," Knoten"]}),e.jsx(i.th,{style:{textAlign:"center"},children:"Polynomgrad"}),e.jsx(i.th,{style:{textAlign:"center"},children:"größter Fehler"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Stelle des Maximums"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"5"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"0{,}44"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}80"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"10"}),e.jsx(i.td,{style:{textAlign:"center"},children:"9"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"0{,}30"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}93"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"15"}),e.jsx(i.td,{style:{textAlign:"center"},children:"14"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"7{,}2"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}96"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"20"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"8{,}6"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}97"})})]})]})]}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"n = 5"})," auf ",e.jsx(n,{children:"n = 10"})," ",e.jsx(i.em,{children:"fällt"}),` der Fehler, erst danach wächst er, dann aber
schnell (bei `,e.jsx(n,{children:"n = 25"})," auf ",e.jsx(n,{children:"257"}),`); unbeschränkt ist das Wachstum nur
asymptotisch. Die letzte Spalte zeigt, wo das Problem liegt: Das
Fehlermaximum wandert mit wachsendem `,e.jsx(n,{children:"n"})," immer näher an die Ränder ",e.jsx(n,{children:"\\pm 1"}),"."]})]}),`
`,e.jsx(H,{title:"Chebyshev-Knoten als Gegenmittel",children:e.jsxs(k,{kind:"Bemerkung",label:"13.3.16 (Ein Ausweg: die Knoten anders legen)",id:"env-ein-ausweg-die-knoten-anders-legen",children:[e.jsxs(i.p,{children:[`An der Basis liegt es nicht, denn zu gegebenen Knoten ist das Polynom nach
`,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` eindeutig, gleich in welcher Basis wir es
aufschreiben. Es liegt an den `,e.jsx(i.em,{children:"Knoten"}),`: Legen wir sie an den Rändern dichter, statt sie gleichmäßig zu
verteilen, verschwindet das Problem. Die übliche Wahl sind die
`,e.jsx(i.em,{children:"Chebyshev-Knoten"})]}),e.jsx(_,{children:`\\cblue{x_i} = \\cos\\!\\left(\\frac{(2i-1)\\pi}{2n}\\right),
\\qquad i = 1, \\dots, n,`}),e.jsxs(i.p,{children:["die Nullstellen des ",e.jsx(n,{children:"n"}),`-ten Chebyshev-Polynoms. Für Runges Funktion sinkt der
größte Fehler damit auf `,e.jsx(n,{children:"0{,}047"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"0{,}038"})," bei ",e.jsx(n,{children:"n = 20"}),`,
gegen `,e.jsx(n,{children:"7{,}2"})," und ",e.jsx(n,{children:"8{,}6"})," oben, und er fällt weiter: ",e.jsx(n,{children:"0{,}015"})," bei ",e.jsx(n,{children:"n = 21"}),`,
dem Ende des Reglerbereichs im Widget unten. Dieser Gewinn ist allerdings
asymptotisch. Bei
`,e.jsx(n,{children:"n = 4"}),", ",e.jsx(n,{children:"6"})," und ",e.jsx(n,{children:"8"}),` Knoten schneiden die gleichmäßig verteilten Knoten
etwas besser ab.`]})]})}),`
`,e.jsxs(i.p,{children:[`Chebyshev-Knoten vermeiden das Runge-Phänomen, setzen aber voraus, dass wir die
Stellen frei wählen dürfen (`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),`).
Bei gemessenen Daten
liegen sie fest, und dann hilft nur ein anderer Ansatzraum.`]}),`
`,e.jsxs(ae,{title:"Runges Funktion, zwei Knotenfamilien",children:[e.jsx(i.p,{children:"Wann wird der Fehler zum ersten Mal größer als die Funktion selbst?"}),e.jsx(tn,{frage:"Schätzen wir, ab welcher Knotenzahl n der größte Fehler bei äquidistanten Knoten erstmals über 1 liegt.",loesung:9,toleranz:1,einheit:"Knoten",verdeckt:e.jsx(i.p,{children:"Bei n = 9 steht dort 1,05. Ungerade Knotenzahlen liegen durchweg über den benachbarten geraden, weil nur sie einen Knoten auf die Spitze von f legen; bei n = 10 fällt der Fehler deshalb wieder auf 0,30."}),children:({aufgeloest:r})=>e.jsx(Ar,{zeigeFehlerkurve:r})}),e.jsxs(i.p,{children:[`Die Knöpfe wählen zwischen äquidistanten und Chebyshev-Knoten: Mit
äquidistanten Knoten wachsen die Ausschläge an den Rändern, mit
Chebyshev-Knoten bleibt die Kurve dort ruhig, sobald `,e.jsx(n,{children:"n"}),` nicht zu klein ist.
Die zweite Tafel trägt die Fehlerkurven beider Familien übereinander; sie erscheint erst nach dem Auflösen.`]})]}),`
`,e.jsxs(i.p,{children:[`Existenz und Eindeutigkeit sind damit geklärt; das globale Polynom hohen
Grades ist trotzdem schlecht konditioniert, nicht lokal und konvergiert nicht
einmal für glatte `,e.jsx(n,{children:"f"}),`. Der Rest des Kapitels nimmt deshalb statt eines
Polynoms hohen Grades viele Polynome kleinen Grades, jedes nur auf einem
kurzen Stück gültig und glatt zusammengesetzt: die `,e.jsx(i.em,{children:"Splines"}),` aus
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Durch ",e.jsx(n,{children:"n"})," Punkte mit paarweise verschiedenen ",e.jsx(n,{children:"x_i"}),` läuft genau ein Polynom
vom Grad höchstens `,e.jsx(n,{children:"n-1"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),". Die Eindeutigkeit folgt aus ",e.jsx(c,{id:"env:zu-viele-nullstellen-erzwingen-das",href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` über die
Differenz zweier Interpolanten, die Existenz aus der Invertierbarkeit der
Vandermonde-Matrix.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Das interpolierende Polynom durch ",e.jsx(n,{children:"n"})," Punkte hat den Grad genau ",e.jsx(n,{children:"n-1"}),"."]}),e.jsxs(i.p,{children:["Es hat Grad ",e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"}),`. Für die drei Punkte
`,e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,2)}"}),` liefert das System die
Koeffizienten `,e.jsx(n,{children:"\\cgreen{(0, 1, 0)^\\top}"}),`, das Polynom ist also
`,e.jsx(n,{children:"\\cgreen{p(x)} = x"})," und damit vom Grad ",e.jsx(n,{children:"1"})," (",e.jsx(i.a,{href:"#env-drei-punkte-auf-einer-geraden",children:"Beispiel 13.3.7"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"5"}),` mit sechs verschiedenen Nullstellen kann
noch von null verschiedene Werte annehmen.`]}),e.jsxs(i.p,{children:["Nach ",e.jsx(c,{id:"env:zu-viele-nullstellen-erzwingen-das",href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` ist es das Nullpolynom und
nimmt überall den Wert null an: Ein Polynom vom Grad höchstens `,e.jsx(n,{children:"5"}),`, das nicht
das Nullpolynom ist, hat höchstens fünf verschiedene Nullstellen.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`Die Vandermonde-Matrix ist zu paarweise verschiedenen Stellen stets
invertierbar und kann trotzdem numerisch unbrauchbar sein.`}),e.jsxs(i.p,{children:[`Invertierbarkeit ist eine Ja-Nein-Frage, Kondition eine Frage des Ausmaßes.
Bei `,e.jsx(n,{children:"n = 20"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` ist
`,e.jsx(n,{children:"\\det \\bB \\neq 0"}),", aber ",e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 10^{16}"}),`, und damit ist die
Schranke `,e.jsx(n,{children:"\\kappa \\cdot \\eps"})," für den relativen Fehler von der Größe ",e.jsx(n,{children:"1"}),`
(`,e.jsx(i.a,{href:"#env-konditionszahlen-der-groessenordnung",children:"Beispiel 13.3.10"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Bei äquidistanten Knoten wird der Fehler ",e.jsx(n,{children:"\\max|f - \\cgreen{p_{n-1}}|"}),` für
Runges Funktion mit jedem zusätzlichen Knoten größer.`]}),e.jsxs(i.p,{children:["Er wächst asymptotisch über alle Grenzen, aber nicht monoton: von ",e.jsx(n,{children:"n = 5"}),` auf
`,e.jsx(n,{children:"n = 10"})," fällt er von ",e.jsx(n,{children:"0{,}44"})," auf ",e.jsx(n,{children:"0{,}30"})," (",e.jsx(i.a,{href:"#env-divergenz-schon-aber-nicht-monoton",children:"Bemerkung 13.3.15"}),`). Erst danach
setzt das Wachstum durch, mit `,e.jsx(n,{children:"7{,}2"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"8{,}6"})," bei ",e.jsx(n,{children:"n = 20"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Wechseln wir von der Monombasis zu den Chebyshev-Polynomen, so verschwindet
bei gleichmäßig verteilten Knoten auch das Runge-Phänomen.`}),e.jsxs(i.p,{children:[`Der Basiswechsel bessert die Kondition des Gleichungssystems, mehr nicht.
Nach `,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` gehört zu den Daten dasselbe eindeutige Polynom, gleich in
welcher Basis wir es aufschreiben, also auch derselbe Fehler. Gegen die
Oszillationen hilft nur, die Knoten anders zu legen oder den Ansatzraum zu
wechseln (`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Heben wir bei fester Knotenmenge einen einzigen Wert ",e.jsx(n,{children:"\\cblue{y_j}"}),` um
`,e.jsx(n,{children:"\\cred{\\delta}"})," an, so ändert sich der Interpolant an jeder Stelle ",e.jsx(n,{children:"x"}),` um
`,e.jsx(n,{children:"\\cred{\\delta}\\,\\ell_j(x)"}),"."]}),e.jsxs(i.p,{children:["So steht es in ",e.jsx(c,{id:"env:wie-sich-eine-datenaenderung-fortpflanzt",href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"}),`, und der Beweis ist die Eindeutigkeit aus
`,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),". Weil ",e.jsx(n,{children:"\\ell_j"}),` nur an den anderen Knoten verschwindet, wirkt die
Änderung im gesamten Intervall, bei `,e.jsx(n,{children:"n = 10"})," mit einem Faktor bis ",e.jsx(n,{children:"4{,}03"}),`
und am stärksten fern von `,e.jsx(n,{children:"x_j"})," (",e.jsx(i.a,{href:"#env-was-das-in-zahlen-heisst",children:"Bemerkung 13.3.13"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath, Scientific Computing, §7.3.1 (Monombasis und
Vandermonde-Matrix), §7.3.4 (orthogonale Polynome) und §7.3.5 (Interpolation
stetiger Funktionen mit Runge-Phänomen und Chebyshev-Knoten); die
Lagrange-Grundpolynome aus `,e.jsx(c,{id:"env:wie-sich-eine-datenaenderung-fortpflanzt",href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"})," stehen dort in §7.3.2."]})})]})}function Dr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(ns,{...s})}):ns(s)}const C=[0,1,2,3],$i=()=>new Array(12).fill(0),hn=(s,i)=>{const r=$i();return r[4*s]=1,r[4*s+1]=i,r[4*s+2]=i*i,r[4*s+3]=i**3,r},Ln=(s,i)=>{const r=$i();return r[4*s+1]=1,r[4*s+2]=2*i,r[4*s+3]=3*i*i,r},Cn=(s,i)=>{const r=$i();return r[4*s+2]=2,r[4*s+3]=6*i,r},mi=(s,i)=>s.map((r,l)=>r-i[l]);function Mr(){const[s,i]=P.useState([0,1,0,-1]),[r,l]=P.useState("natuerlich"),t=P.useMemo(()=>{const w=[],u=[];w.push(hn(0,C[0])),u.push(s[0]),w.push(hn(0,C[1])),u.push(s[1]),w.push(hn(1,C[2])),u.push(s[2]),w.push(hn(2,C[3])),u.push(s[3]);for(const A of[0,1]){const W=C[A+1];w.push(mi(hn(A,W),hn(A+1,W))),u.push(0),w.push(mi(Ln(A,W),Ln(A+1,W))),u.push(0),w.push(mi(Cn(A,W),Cn(A+1,W))),u.push(0)}return r==="natuerlich"?(w.push(Cn(0,C[0])),u.push(0),w.push(Cn(2,C[3])),u.push(0)):(w.push(Ln(0,C[0])),u.push(0),w.push(Ln(2,C[3])),u.push(0)),Ms(w,u)},[s,r]);if(!t)return e.jsx("p",{className:"text-sm",style:{color:re},children:"Für diese Eingaben ist das System singulär."});const a=t,d=w=>u=>a[4*w]+a[4*w+1]*u+a[4*w+2]*u*u+a[4*w+3]*u**3,h=w=>u=>a[4*w+1]+2*a[4*w+2]*u+3*a[4*w+3]*u*u,x=w=>u=>2*a[4*w+2]+6*a[4*w+3]*u,m=w=>w<1?d(0)(w):w<2?d(1)(w):d(2)(w);let b=1/0,f=-1/0;for(let w=0;w<=300;w++){const u=m(3*w/300);b=Math.min(b,u),f=Math.max(f,u)}const g=Math.min(-2.5,b-.4),p=Math.max(3,f+.4),y=[[],[7,4],[2,3]],S=[0,1,2].map(w=>({f:u=>u>=C[w]&&u<=C[w+1]?d(w)(u):NaN,color:mn,dash:y[w]})),z=(w,u)=>Math.abs(w(u)(C[u+1])-w(u+1)(C[u+1])),o=Math.max(...[0,1].flatMap(w=>[z(d,w),z(h,w),z(x,w)])),j=r==="natuerlich"?[x(0)(C[0]),x(2)(C[3])]:[h(0)(C[0]),h(2)(C[3])],v=[h(0)(C[0]),h(2)(C[3])],B=[x(0)(C[0]),x(2)(C[3])],D=r==="natuerlich"?"Natürlich:":"Eingespannt:",N=r==="natuerlich"?`Die letzten beiden Zeilen setzen s''(0) = s''(3) = 0. Die Krümmung verschwindet an beiden Enden, der Spline läuft geradlinig aus; seine Steigung dort ist frei und steht gerade bei ${G(v[0],2)} und ${G(v[1],2)}.`:`Die letzten beiden Zeilen setzen s'(0) = s'(3) = 0. Der Spline läuft an beiden Enden waagerecht aus; dafür ist jetzt die Krümmung dort frei und steht bei ${G(B[0],2)} und ${G(B[1],2)}.`;return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Verschieben wir einen Messwert und vergleichen die beiden Randbedingungen."}),e.jsxs("p",{className:"mb-2 text-sm",children:["Wir halten die vier Stellen ",e.jsx(n,{children:"\\xi_0 = 0, \\dots, \\xi_3 = 3"})," fest und verschieben die vier Messwerte. Das Widget baut die zwölf Zeilen genau so auf, wie sie im Text stehen, löst das System mit Spaltenpivotierung und zeichnet die drei kubischen Stücke. Alle drei sind Teile ",e.jsx("em",{children:"desselben"})," Interpolanten und deshalb grün; unterschieden sind sie nur durch die Strichelung."]}),e.jsx("div",{className:"mb-2 flex flex-wrap items-center gap-2 text-sm",children:["natuerlich","eingespannt"].map(w=>e.jsx("button",{type:"button",onClick:()=>l(w),className:`rounded border px-2 py-1 ${r===w?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:w==="natuerlich"?"natürlich: s''(0) = s''(3) = 0":"eingespannt: s'(0) = s'(3) = 0"},w))}),e.jsx("div",{className:"mb-2 grid max-w-xl gap-x-8 sm:grid-cols-2",children:C.map((w,u)=>e.jsx(ne,{label:`y bei x = ${w}`,value:s[u],onChange:A=>i(W=>W.map((U,te)=>te===u?A:U)),min:-2,max:2,step:.25,fmt:A=>G(A,2)},w))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx(He,{xLabel:"x",yLabel:"y",series:S,markers:[...C.map((w,u)=>({x:w,y:s[u],color:Ai})),{x:1,y:g+.05*(p-g),color:re},{x:2,y:g+.05*(p-g),color:re}],xDomain:[-.15,3.15],yDomain:[g,p],width:340,height:250}),e.jsxs("p",{className:"mt-1 max-w-[21rem] text-xs text-slate-500 dark:text-slate-400",children:["Blau die Daten, grün die drei Stücke (durchgezogen, gestrichelt, gepunktet), orange am unteren Rand die inneren Knoten bei",e.jsx(n,{children:"x = 1"})," und ",e.jsx(n,{children:"x = 2"}),". Wo genau ein Stück endet und das nächste beginnt, verrät die Kurve nicht; das Readout daneben misst nach."]})]}),e.jsxs("div",{className:"min-w-0 max-w-full grow basis-72 text-sm",children:[e.jsx("div",{className:"mb-2 overflow-x-auto",children:e.jsxs("table",{className:"font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left font-normal",children:"Stück"}),e.jsx("th",{className:"px-2 font-normal",children:"konst."}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x"})}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x^2"})}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x^3"})})]})}),e.jsx("tbody",{children:[0,1,2].map(w=>e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-2 whitespace-nowrap text-slate-500 dark:text-slate-400",children:["p",w+1," auf [",C[w],", ",C[w+1],"]"]}),[0,1,2,3].map(u=>e.jsx("td",{className:"px-2 text-right",style:{color:mn},children:G(a[4*w+u],3)},u))]},w))})]})}),e.jsxs("p",{children:["Probe an den Daten:"," ",e.jsx("span",{className:"font-mono",style:{color:mn},children:C.map(w=>G(m(w),2)).join(" · ")})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:Ai},children:s.map(w=>G(w,2)).join(" · ")})]}),e.jsxs("p",{className:"mt-1",children:["Größter Sprung von ",e.jsx(n,{children:"s"}),", ",e.jsx(n,{children:"s'"})," oder ",e.jsx(n,{children:"s''"})," an den inneren Knoten:"," ",e.jsx("span",{className:"font-mono",children:o<1e-9?"0 (bis auf Rundung)":Di(o)})]}),e.jsxs("p",{className:"mt-1",style:{color:oe},children:["Randbedingung: ",r==="natuerlich"?"s''":"s'"," an den Enden ="," ",e.jsx("span",{className:"font-mono",children:j.map(w=>G(w,3)).join(" und ")})]})]})]}),e.jsxs(he,{kind:r==="natuerlich"?"neutral":"ok",titel:D,children:[N," Beide Male bleiben es zwölf Bedingungen für zwölf Unbekannte, nur die letzten beiden Zeilen der Matrix wechseln; die Naht bei"," ",e.jsx(n,{children:"x = 1"})," und ",e.jsx(n,{children:"x = 2"})," bleibt in beiden Fällen unsichtbar, weil Wert, Steigung und Krümmung dort Zeilen desselben gelösten Systems sind."]})]})}const is=[0,1,2,3,4,5],Bn=5,ss=4.95;function Fr(){const[s,i]=P.useState(3),[r,l]=P.useState(4),[t,a]=P.useState(2.4),[d,h]=P.useState(!0),x=Math.round(s),m=P.useMemo(()=>Ds(is,x),[x]),b=m.length-x-1,f=Math.min(Math.round(r),b),g=P.useMemo(()=>{const D=Array.from({length:b},(N,w)=>({f:u=>sn(m,w,x,u,Bn),color:w===f-1?re:oe}));return d&&D.push({f:N=>{let w=0;for(let u=0;u<b;u++)w+=sn(m,u,x,N,Bn);return w},color:oe,dash:[6,4]}),D},[m,x,b,f,d]),p=Math.min(t,ss),y=sn(m,f-1,x,p,Bn);let S=0;for(let D=0;D<b;D++)S+=sn(m,D,x,p,Bn);let z=0;for(let D=0;D<b;D++)sn(m,D,x,p,Bn)>1e-12&&z++;const o=Math.round(p*20),j=o%20===0,v=x===0?"grad0":o===0?"linkerRand":j?"knoten":"innen",B=v==="grad0"?"Bei q = 0 ist jede Basisfunktion die Indikatorfunktion genau eines Gitterintervalls. An jeder Stelle ist deshalb genau eine von ihnen ungleich null, und die Summe ist trivialerweise eins – um den Preis, dass die Basis an jedem Knoten springt.":v==="linkerRand"?`Am linken Rand fallen q + 1 = ${x+1} Knoten zusammen. Dort ist nur die erste Basisfunktion ungleich null, und zwar gleich eins: Deshalb interpoliert eine B-Spline-Darstellung den Randwert exakt.`:v==="knoten"?`x* sitzt auf dem inneren Knoten ${G(p,0)}. Der Träger ist rechts halboffen, eine der Funktionen endet hier also gerade; es tragen ${z} statt der ${x+1} des Intervallinneren.`:`x* liegt im Inneren eines Gitterintervalls. Genau ${x+1} Funktionen sind dort ungleich null, alle übrigen ${b-(x+1)} verschwinden – das ist der lokale Träger.`;return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Wählen wir Grad, Basisfunktion und Stelle und zählen dann, wie viele Funktionen dort ungleich null sind."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(ne,{label:"Grad q",value:s,onChange:i,min:0,max:3,step:1,fmt:D=>`${Math.round(D)}`}),e.jsx(ne,{label:"hervorgehoben k",value:f,onChange:l,min:1,max:b,step:1,fmt:D=>`${Math.round(D)}`}),e.jsx(ne,{label:"Stelle x*",value:t,onChange:a,min:0,max:ss,step:.05,fmt:D=>G(D,2)}),e.jsxs("label",{className:"my-1 flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:D=>h(D.target.checked)}),e.jsx("span",{children:"Summe aller Basisfunktionen zeigen"})]})]}),e.jsxs("div",{className:"mb-2 text-sm",children:[e.jsxs("p",{children:[e.jsx(n,{children:`m + 2q + 1 = ${is.length-1+2*x+1}`})," Knoten:"," ",e.jsxs("span",{className:"font-mono",style:{color:re},children:["(",m.map(D=>G(D,0)).join("; "),")"]})]}),e.jsxs("p",{children:["daraus ",e.jsx(n,{children:`m + q = ${b}`})," Basisfunktionen vom Grad"," ",e.jsx(n,{children:`q = ${x}`}),"."]})]}),e.jsx(He,{xLabel:"x",yLabel:"",series:g,markers:[...m.map(D=>({x:D,y:0,color:re})),{x:t,y,color:re}],xDomain:[-.2,5.2],yDomain:[0,1.12],width:480,height:230}),e.jsxs("p",{className:"mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs",style:{color:oe},children:[e.jsxs("span",{className:"inline-flex items-center gap-1.5",children:[e.jsx("svg",{width:28,height:8,viewBox:"0 0 28 8",className:"h-2 w-7 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:4,x2:27,y2:4,stroke:re,strokeWidth:2.4})}),e.jsx("span",{style:{color:re},children:"hervorgehobene Funktion B_k"})]}),e.jsxs("span",{className:"inline-flex items-center gap-1.5",children:[e.jsx("svg",{width:28,height:8,viewBox:"0 0 28 8",className:"h-2 w-7 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:4,x2:27,y2:4,stroke:oe,strokeWidth:1.6})}),"übrige Basisfunktionen"]}),d?e.jsxs("span",{className:"inline-flex items-center gap-1.5",children:[e.jsx("svg",{width:28,height:8,viewBox:"0 0 28 8",className:"h-2 w-7 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:4,x2:27,y2:4,stroke:oe,strokeWidth:1.6,strokeDasharray:"6 4"})}),"Summe aller B_k"]}):null]}),e.jsxs("div",{className:"mt-2 text-sm",children:[e.jsxs("p",{children:["Träger der hervorgehobenen Funktion:"," ",e.jsx(n,{children:`[\\tau_{${f}}, \\tau_{${f+x+1}}] = [${G(m[f-1],0)}, ${G(m[f+x],0)}]`}),", also"," ",m[f+x]-m[f-1]===1?"ein Gitterintervall":`${G(m[f+x]-m[f-1],0)} Gitterintervalle`,"."]}),e.jsxs("p",{className:"mt-1",children:["An der Stelle ",e.jsx(n,{children:`x^* = ${G(t,2)}`}),":"," ",e.jsx(n,{children:`B_{${f}}^{(${x})}(x^*) = `}),e.jsx("span",{className:"font-mono",style:{color:re},children:G(y,4)}),", Summe aller ",e.jsx("span",{className:"font-mono",children:G(S,4)}),", davon"," ",e.jsx("span",{className:"font-mono",children:z})," von ",b," ",z===1?"Funktion":"Funktionen"," ungleich null."]}),e.jsxs(he,{kind:v==="innen"?"ok":"neutral",titel:v==="grad0"?"Grad null:":v==="linkerRand"?"Linker Rand:":v==="knoten"?"Auf einem Knoten:":"Im Intervallinneren:",children:[B," Die Summe bleibt in allen vier Lagen eins, wie"," ",xe("bemerkung:warum-die-knotenfolge-so-lang-sein-muss")," es über die Länge der Knotenfolge vorhersagt."]})]})]})}const Q=[0,1,2,3,4,5,6,7,8,9],ie=2,Nr=["nullten","ersten","zweiten","dritten"];function qr(){const[s,i]=P.useState(2),[r,l]=P.useState(3.4),t=Math.round(s),a=Math.min(r,Q[ie]+t+1),d=B=>(B-Q[ie])/(Q[ie+t]-Q[ie]),h=B=>(Q[ie+t+1]-B)/(Q[ie+t+1]-Q[ie+1]),x=[{f:B=>Se(Q,ie,t-1,B),color:an,dash:[]},{f:B=>Se(Q,ie+1,t-1,B),color:an,dash:[2,3]},{f:d,color:oe,dash:[9,4]},{f:h,color:oe,dash:[1,4]},{f:B=>Se(Q,ie,t,B),color:re,dash:[]}],m=[{dash:[],farbe:an,text:`linker Nachbar B₃⁽${t-1}⁾`},{dash:[2,3],farbe:an,text:`rechter Nachbar B₄⁽${t-1}⁾`},{dash:[9,4],farbe:oe,text:"Gewichtsrampe links (wächst)"},{dash:[1,4],farbe:oe,text:"Gewichtsrampe rechts (fällt)"},{dash:[],farbe:re,text:`Ergebnis B₃⁽${t}⁾`}],b=d(a),f=Se(Q,ie,t-1,a),g=h(a),p=Se(Q,ie+1,t-1,a),y=Se(Q,ie,t,a),S=f>1e-12,z=p>1e-12,o=y<=1e-12?"ausserhalb":S&&z?"ueberlappung":"einseitig",j=o==="ausserhalb"?"Außerhalb des Trägers:":o==="ueberlappung"?"Beide Rampen tragen:":"Nur ein Nachbar trägt:",v=o==="ausserhalb"?`Bei x* = ${G(a,2)} verschwinden beide Nachbarfunktionen, das Ergebnis ist deshalb exakt null: Hier endet der Träger [${G(Q[ie],0)}, ${G(Q[ie+t+1],0)}].`:o==="ueberlappung"?`Bei x* = ${G(a,2)} sind beide Nachbarn ungleich null. Die linke Rampe gewichtet mit ${G(b,3)}, die rechte mit ${G(g,3)}; zusammen ergeben die beiden Summanden ${G(y,4)}. Genau in diesem Überlappungsbereich entsteht die Glattheit.`:`Bei x* = ${G(a,2)} ist nur der ${S?"linke":"rechte"} Nachbar ungleich null. Das Ergebnis ${G(y,4)} kommt allein aus ${S?"seinem wachsenden":"seinem fallenden"} Beitrag; der andere Summand ist null.`;return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Verschieben wir x* und lesen die beiden gewichteten Beiträge ab."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(ne,{label:"Grad q",value:s,onChange:B=>{const D=Math.round(B);i(D),l(N=>Math.min(N,Q[ie]+D+1))},min:1,max:3,step:1,fmt:B=>`${Math.round(B)}`}),e.jsx(ne,{label:"Stelle x*",value:a,onChange:l,min:Q[ie],max:Q[ie]+t+1,step:.05,fmt:B=>G(B,2)})]}),e.jsx("p",{className:"my-1 text-sm",children:e.jsx(n,{children:`B_{3}^{(${t})}(x) = \\frac{x - \\tau_3}{\\tau_{${3+t}} - \\tau_3}\\, B_{3}^{(${t-1})}(x) + \\frac{\\tau_{${4+t}} - x}{\\tau_{${4+t}} - \\tau_4}\\, B_{4}^{(${t-1})}(x)`})}),e.jsxs("div",{className:"mb-1 text-sm",children:["An der Stelle ",e.jsx(n,{children:`x^* = ${G(a,2)}`}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:an},children:[G(b,3)," · ",G(f,3)]})," ","+"," ",e.jsxs("span",{className:"font-mono",style:{color:an},children:[G(g,3)," · ",G(p,3)]})," ","="," ",e.jsx("span",{className:"font-mono",style:{color:re},children:G(y,4)})]}),e.jsx(He,{xLabel:"x",yLabel:"",series:x,markers:[...Q.slice(1,8).map(B=>({x:B,y:0,color:re})),{x:a,y,color:re}],xDomain:[1.5,7.5],yDomain:[0,1.12],width:480,height:230}),e.jsx("p",{className:"mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs",style:{color:oe},children:m.map(B=>e.jsxs("span",{className:"inline-flex items-center gap-1.5",children:[e.jsx("svg",{width:28,height:8,viewBox:"0 0 28 8",className:"h-2 w-7 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:4,x2:27,y2:4,stroke:B.farbe,strokeWidth:2,strokeDasharray:B.dash.length?B.dash.join(" "):void 0})}),e.jsx("span",{style:{color:B.farbe},children:B.text})]},B.text))}),e.jsxs(he,{kind:o==="ueberlappung"?"ok":"neutral",titel:j,children:[v," Beide Rampen gewichten nichtnegative Nachbarfunktionen; deshalb bleibt ",`B₃ vom Grad ${t}`," nichtnegativ, sein Träger wächst um ein Intervall und die Glattheit reicht bis zur ",Nr[t-1]," Ableitung (",Cs("eq:erweiterte-knotenfolge-und-b-splines-2"),")."]})]})}const je=[1,2,3,4,5,6,7,8,9],bi=[.2,.9,1.4,1.6,1.5,1.2,.9,.7,.6],In=3,Ri=9,ri=Ds(je,In),Oe=ri.length-In-1,rs=(s,i)=>mr(ri,s,In,Math.min(i,Ri-1e-9));function Gr(){const s=[];s.push(Array.from({length:Oe},(i,r)=>rs(r,je[0])));for(const i of je)s.push(Array.from({length:Oe},(r,l)=>sn(ri,l,In,i,Ri)));return s.push(Array.from({length:Oe},(i,r)=>rs(r,je[8]))),s}const Ps=Gr();function ts(s){const i=je.length,r=s.slice();for(let l=1;l<i;l++)for(let t=i-1;t>=l;t--)r[t]=(r[t]-r[t-1])/(je[t]-je[t-l]);return l=>{let t=r[i-1];for(let a=i-2;a>=0;a--)t=t*(l-je[a])+r[a];return t}}function ls(s){return Ms(Ps,[0,...s,0])}function Pr(){const[s,i]=P.useState(5),[r,l]=P.useState(1),t=Math.round(s),{daten:a,cVor:d,cNach:h,pVor:x,pNach:m}=P.useMemo(()=>{const $=bi.map((E,se)=>se===t-1?E+r:E);return{daten:$,cVor:ls(bi),cNach:ls($),pVor:ts(bi),pNach:ts($)}},[t,r]);if(!d||!h)return e.jsx("p",{className:"text-sm",style:{color:Sn},children:"Die Kollokationsmatrix ist singulär."});const b=$=>E=>$.reduce((se,le,Ee)=>se+le*sn(ri,Ee,In,E,Ri),0),f=b(d),g=b(h);let p=1/0,y=-1/0,S=0,z=0,o=0,j=0;for(let $=0;$<=400;$++){const E=je[0]+8*$/400;for(const Ee of[f(E),g(E),x(E),m(E)])p=Math.min(p,Ee),y=Math.max(y,Ee);const se=Math.abs(g(E)-f(E)),le=Math.abs(m(E)-x(E));S=Math.max(S,se),z=Math.max(z,le),Math.abs(E-je[t-1])>2&&(o=Math.max(o,se),j=Math.max(j,le))}const v=Math.min(-1,p-.3),B=Math.max(2.2,y+.3),D=d.map(($,E)=>Math.abs(h[E]-$)),N=Math.max(...D,1e-12),w=D.filter($=>$>.01*Math.max(Math.abs(r),1e-9)).length,u=Math.max(0,D.indexOf(Math.max(...D))),A=u>=2&&D[u-1]>1e-9,W=u<=Oe-3&&D[u+1]>1e-9,U=(A?1:0)+(W?1:0),te=(()=>{const $=[];return W&&D[u+1]>1e-12&&$.push(N/D[u+1]),A&&D[u-1]>1e-12&&$.push(N/D[u-1]),$.length?$.reduce((E,se)=>E+se,0)/$.length:NaN})(),ln=t===1||t===9,ti=r===0?"neutral":j>4*o?"ok":"warn",Ue=r===0?"Ohne Verschiebung:":ln?"Am Gitterrand:":"In der Gittermitte:",Ie=r===0?"Ohne Verschiebung bleiben beide Interpolanten unverändert; es gibt daher keine Fernwirkung zu vergleichen, und alle Balken sind null.":j>4*o?`Fern vom verschobenen Punkt bleibt die Spline-Änderung mit ${G(o,3)} deutlich kleiner als die Polynom-Änderung mit ${G(j,3)}. Der Balkensatz zeigt, woher das kommt: eine Spitze bei a${["₁","₂","₃","₄","₅","₆","₇","₈","₉","₁₀","₁₁"][u]}, und ${U===2?"beide Flanken fallen":"die eine Flanke fällt"} je Knotenabstand auf rund ${G(1/te,2)} des vorigen Werts.`:`Auch hier ändert der Spline nur wenige Koeffizienten, aber der Vergleich trägt in diesem Zustand nicht: Punkt ${t} liegt am Gitterrand, wo das Polynom vom Grad 8 wenig Hebel hat, und das „ferne" Gebiet |x − x_${t}| > 2 fällt fast mit dem ganzen Intervall zusammen. Der Balkensatz hat deshalb nur ${U===1?"eine Flanke":"zwei Flanken"}. Schieben wir den Punkt in die Mitte, dann trennen sich die beiden Spalten wieder.`,K=je.map(($,E)=>({x:$,y:a[E],color:E===t-1?Sn:Ai})),Z=($,E,se)=>e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm font-semibold",children:$}),e.jsx(He,{xLabel:"x",yLabel:"y",series:[{f:E,color:oe,dash:[5,4]},{f:se,color:mn}],markers:K,xDomain:[.8,9.2],yDomain:[v,B],width:310,height:205})]});return e.jsxs("div",{className:"my-2",children:[e.jsx(ue,{children:"Verschieben wir einen Datenpunkt und vergleichen die Fernwirkung beider Interpolanten."}),e.jsx("p",{className:"mb-2 text-sm",children:"Neun Datenpunkte, einer davon lässt sich verschieben. Beide Tafeln zeigen denselben Vorgang mit verschiedenen Ansatzräumen: links das Interpolationspolynom vom Grad 8, rechts der natürliche kubische Spline zum Gitter der Datenpunkte. Grau gestrichelt liegt jeweils der ungestörte Interpolant darunter, grün der neue, rot markiert ist der verschobene Punkt."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(ne,{label:"Punkt j",value:t,onChange:i,min:1,max:9,step:1,fmt:$=>`${Math.round($)}`}),e.jsx(ne,{label:"Verschiebung δ",value:r,onChange:l,min:-2,max:2,step:.25,fmt:$=>G($,2)})]}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[Z("Polynom vom Grad 8",x,m),Z("Natürlicher kubischer Spline",f,g)]}),e.jsxs("div",{className:"mt-2 text-sm",children:[e.jsxs("p",{children:["Größte Änderung des Interpolanten: Polynom"," ",e.jsx("span",{className:"font-mono",style:{color:Sn},children:G(z,3)}),", Spline"," ",e.jsx("span",{className:"font-mono",style:{color:mn},children:G(S,3)})," ","bei einer Verschiebung von"," ",e.jsx("span",{className:"font-mono",children:G(Math.abs(r),2)}),"."]}),e.jsxs("p",{className:"mt-1",children:["Weiter als zwei Knoten von ",e.jsx(n,{children:`x_{${t}}`})," entfernt: Polynom"," ",e.jsx("span",{className:"font-mono",style:{color:Sn},children:G(j,3)}),", Spline"," ",e.jsx("span",{className:"font-mono",style:{color:mn},children:G(o,3)}),"."]})]}),e.jsx("p",{className:"mt-3 mb-1 text-sm font-semibold",children:"Welche B-Spline-Koeffizienten reagieren?"}),e.jsx("div",{className:"max-w-md",children:D.map(($,E)=>e.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[e.jsx("span",{className:"w-12 shrink-0 text-right",children:e.jsx(n,{children:`a_{${E+1}}`})}),e.jsx("div",{className:"h-3 flex-1 rounded-sm bg-slate-200 dark:bg-slate-700",children:e.jsx("div",{className:"h-3 rounded-sm",style:{width:`${Math.max(0,100*$/N)}%`,background:re}})}),e.jsx("span",{className:"w-16 shrink-0 font-mono",children:G($,3)})]},E))}),e.jsxs("p",{className:"mt-1 max-w-[34rem] text-sm",children:[e.jsx("span",{className:"font-mono",children:w})," von ",Oe," Koeffizienten ändern sich um mehr als ein Prozent der Verschiebung."]}),e.jsx(he,{kind:ti,titel:Ue,children:Ie}),e.jsx("p",{className:"mt-3 mb-1 text-sm font-semibold",children:"Besetzungsmuster"}),e.jsxs("div",{className:"flex flex-wrap items-start gap-8",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-1 text-xs",style:{color:oe},children:["B-Spline-Kollokation, ",Oe," × ",Oe]}),e.jsx("div",{className:"inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600",style:{gridTemplateColumns:`repeat(${Oe}, 13px)`},children:Ps.flatMap(($,E)=>$.map((se,le)=>e.jsx("div",{style:{width:13,height:13,background:Math.abs(se)>1e-12?re:void 0},className:Math.abs(se)>1e-12?"":"bg-[var(--w-bg)]"},`${E}-${le}`)))})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-1 text-xs",style:{color:oe},children:"Monombasis (Vandermonde), 9 × 9"}),e.jsx("div",{className:"inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600",style:{gridTemplateColumns:"repeat(9, 13px)"},children:je.flatMap(($,E)=>je.map((se,le)=>e.jsx("div",{style:{width:13,height:13,background:Math.abs(Math.pow($,le))>1e-12?Sn:void 0},className:Math.abs(Math.pow($,le))>1e-12?"":"bg-[var(--w-bg)]"},`${E}-${le}`)))})]})]}),e.jsxs("p",{className:"mt-2 max-w-[34rem] text-sm",children:["Links liegen die Einträge ungleich null in einem schmalen Streifen um die Diagonale, höchstens ",e.jsx(n,{children:"q + 1 = 4"})," je Zeile; genau so viele Basisfunktionen sind an einer Stelle überhaupt beteiligt. Rechts ist kein einziges Feld leer. Der Unterschied kostet beim Lösen den Faktor, den ",xe("bemerkung:bandstruktur-und-aufwand")," ausrechnet, und zur schlechten Kondition der Monombasis kommt er noch hinzu."]})]})}function ds(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),` endet mit einer Beobachtung: Ein einzelnes
Polynom durch viele Datenpunkte oszilliert zwischen ihnen. Es ist ein
`,e.jsx(n,{children:"\\cred{\\text{globales}}"}),` Objekt, jeder Koeffizient wirkt überall und jede
Messung auf die ganze Kurve. Wir zerlegen deshalb das Intervall in kleine
Stücke und legen auf jedes ein Polynom von `,e.jsx(i.em,{children:"festem, niedrigem"}),` Grad; mit der
Datenmenge wächst dann nur die Zahl der Stücke. Damit daraus keine unstetige
Funktion wird, verlangen wir an den Nahtstellen so viel Glattheit, wie der
Grad zulässt.`]}),`
`,e.jsx(i.h3,{children:"Stückweise Polynome mit vorgeschriebener Glattheit"}),`
`,e.jsxs(k,{kind:"Definition",label:"13.4.1 (Polynom-Spline vom Grad q)",id:"env-polynom-spline-vom-grad-q",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"[a, b] \\subset \\R"})," ein Intervall und sei"]}),e.jsx(_,{children:"a = \\corange{\\xi_0} < \\corange{\\xi_1} < \\dots < \\corange{\\xi_m} = b"}),e.jsxs(i.p,{children:["ein Gitter von ",e.jsx(i.em,{children:"Knoten"})," (knots). Eine Funktion ",e.jsx(n,{children:"s\\colon [a,b] \\to \\R"}),` heißt
`,e.jsxs(i.em,{children:["Polynom-Spline vom Grad ",e.jsx(n,{children:"q"})]})," (polynomial spline of degree ",e.jsx(n,{children:"q"}),`) zu diesem
Gitter, wenn`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`auf jedem Teilintervall ein Polynom steht:
`,e.jsx(n,{children:"s(x) = p_k(x)"})," für ",e.jsx(n,{children:"x \\in [\\corange{\\xi_{k-1}}, \\corange{\\xi_k})"}),` mit
Polynomen `,e.jsx(n,{children:"p_k"})," vom Grad höchstens ",e.jsx(n,{children:"q"}),", ",e.jsx(n,{children:"k = 1, \\dots, m"}),` (auf dem letzten
Teilintervall abgeschlossen), und`]}),`
`,e.jsxs(i.li,{children:["die Nahtstellen glatt sind: ",e.jsx(n,{children:"s \\in \\Ccal^{q-1}([a,b])"}),", also sind ",e.jsx(n,{children:"s"}),` und
seine ersten `,e.jsx(n,{children:"q-1"})," Ableitungen auf ganz ",e.jsx(n,{children:"[a,b]"}),`
`,e.jsx(c,{id:"continuity",children:"stetig"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Die Menge aller solchen Funktionen bezeichnen wir mit ",e.jsx(n,{children:"\\Scal_q"}),"."]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.2 (Was in dieser Definition steckt)",id:"env-was-in-dieser-definition-steckt",children:[e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Grad höchstens ",e.jsx(n,{children:"q"}),"."]})," „Polynome ",e.jsx(n,{children:"q"}),`-ten Grades" meint stets „vom Grad
höchstens `,e.jsx(n,{children:"q"}),`", sonst wäre nicht einmal die Nullfunktion ein Spline und
`,e.jsx(n,{children:"\\Scal_q"})," kein Vektorraum."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Glattheit ist eine Forderung."}),` Eine stückweise durch
Polynome vom Grad höchstens `,e.jsx(n,{children:"q"}),` definierte Funktion darf an jedem Knoten
springen. Erst Bedingung 2 macht sie zum
Spline. `,e.jsx(n,{children:"\\Ccal^{q-1}"})," ist dabei die ",e.jsx(i.em,{children:"größtmögliche"}),` Glattheit, die wir
verlangen können, ohne den Spline zu einem einzigen globalen Polynom zu
zwingen: Ist auch die `,e.jsx(n,{children:"q"}),`-te Ableitung stetig, so stimmen benachbarte
Polynome in allen Ableitungen überein und sind damit gleich.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Der Fall ",e.jsx(n,{children:"q = 0"}),"."]})," ",e.jsx(n,{children:"\\Ccal^{-1}"}),` bedeutet: keine Stetigkeitsforderung; ein
Spline vom Grad `,e.jsx(n,{children:"0"})," ist eine Treppenfunktion. Ab ",e.jsx(n,{children:"q = 1"})," ist ",e.jsx(n,{children:"s"}),` stetig, ab
`,e.jsx(n,{children:"q = 2"})," auch knickfrei."]})]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.4.3 (Die Grade 0, 1 und 3)",id:"env-die-grade-0-1-und-3",children:[e.jsxs(i.p,{children:["Auf dem Gitter ",e.jsx(n,{children:"\\corange{0} < \\corange{1} < \\corange{2} < \\corange{3}"}),` sehen
die drei gebräuchlichsten Grade so aus.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 0"}),`: konstante Stücke, Sprünge an den Knoten erlaubt. Das ist der
Histogramm-Fall.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 1"}),`: der Streckenzug durch die Daten, stetig, mit Knicken an den Knoten.
Für Interpolation braucht er keine Rechnung, wir verbinden die Punkte.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 3"}),`: kubische Stücke, an den Knoten stimmen Funktionswert, Steigung und
Krümmung überein. Ein Knick ist nicht mehr zu sehen, und darum ist
`,e.jsx(n,{children:"q = 3"})," der Standardfall."]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Wie viele Parameter hat ein Spline?"}),`
`,e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"})," entscheidet die Größe des ",e.jsx(c,{id:"env:ansatzraum-basisdarstellung",children:"Ansatzraums"}),` darüber,
wie viele Bedingungen wir stellen dürfen.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.4.4 (Dimension des Spline-Raums)",id:"env-dimension-des-spline-raums",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"q \\ge 1"})," und sei ",e.jsx(n,{children:"\\Scal_q"})," der Raum der Polynom-Splines vom Grad ",e.jsx(n,{children:"q"}),` zum
Gitter `,e.jsx(n,{children:"a = \\corange{\\xi_0} < \\dots < \\corange{\\xi_m} = b"}),". Dann ist ",e.jsx(n,{children:"\\Scal_q"}),`
ein `,e.jsx(c,{id:"vector-space",children:"Vektorraum"})," der ",e.jsx(c,{id:"dimension",children:"Dimension"})]}),e.jsx(L,{tag:"13.4.1",id:"eq-dimension-des-spline-raums",children:"\\dim \\Scal_q = m + q ,"}),e.jsxs(i.p,{children:["und die ",e.jsx(n,{children:"m + q"})," Funktionen"]}),e.jsx(_,{children:`1,\\ x,\\ \\dots,\\ x^q,\\
(x - \\corange{\\xi_1})_+^q,\\ \\dots,\\ (x - \\corange{\\xi_{m-1}})_+^q
\\qquad \\text{mit} \\qquad u_+ := \\max(u, 0)`}),e.jsxs(i.p,{children:["bilden eine Basis, die ",e.jsx(i.em,{children:"Basis der abgeschnittenen Potenzen"}),` (truncated power
basis).`]})]}),`
`,e.jsxs(H,{title:"Warum die abgeschnittenen Potenzen eine Basis bilden",children:[e.jsx(i.p,{children:`Der Beweis baut einen Spline von links nach rechts aus Monomen und
abgeschnittenen Potenzen auf und zeigt, dass diese Familie linear unabhängig
ist. Die Abzählung darunter kommt ohne ihn aus.`}),e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Für ",e.jsx(n,{children:"j \\le q-1"})," ist die ",e.jsx(n,{children:"j"}),"-te Ableitung rechts von ",e.jsx(n,{children:"\\xi_i"})," gleich ",e.jsx(n,{children:"q(q-1)\\cdots(q-j+1)\\,(x-\\xi_i)^{q-j}"})," mit Exponent ",e.jsx(n,{children:"q - j \\ge 1"}),"; sie verschwindet also in ",e.jsx(n,{children:"\\xi_i"}),", ebenso wie die Ableitung von links. Damit ist ",e.jsx(n,{children:"g_i \\in \\Ccal^{q-1}"}),", und erst die ",e.jsx(n,{children:"q"}),"-te Ableitung springt (von ",e.jsx(n,{children:"0"})," auf ",e.jsx(n,{children:"q!"}),")."]}),children:[e.jsxs(i.p,{children:["Jede der genannten Funktionen liegt in ",e.jsx(n,{children:"\\Scal_q"}),"."]}),e.jsxs(i.p,{children:["Die Monome ",e.jsx(n,{children:"1, x, \\dots, x^q"})," sind auf ganz ",e.jsx(n,{children:"[a,b]"}),` Polynome vom Grad
höchstens `,e.jsx(n,{children:"q"}),` und beliebig oft differenzierbar. Für die abgeschnittene Potenz
`,e.jsx(n,{children:"g_i(x) = (x - \\corange{\\xi_i})_+^q"})," ist ",e.jsx(n,{children:"g_i \\equiv 0"}),` links von
`,e.jsx(n,{children:"\\corange{\\xi_i}"})," und ",e.jsx(n,{children:"g_i(x) = (x - \\corange{\\xi_i})^q"}),` rechts davon, auf
beiden Seiten also ein Polynom vom Grad höchstens `,e.jsx(n,{children:"q"}),"."]})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Beide Funktionen sind dort ",e.jsx(n,{children:"\\Ccal^{q-1}"})," und stimmen links von ",e.jsx(n,{children:"\\xi_k"})," überein, also stimmen auch ihre einseitigen Ableitungen bis zur Ordnung ",e.jsx(n,{children:"q-1"})," überein und die der Differenz sind null."]}),children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(n,{children:"s \\in \\Scal_q"})," ist eine Linearkombination dieser Funktionen."]}),e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"p_1"}),` das Polynom auf dem ersten Teilintervall. Wir zeigen per Induktion
über `,e.jsx(n,{children:"k"}),", dass es Zahlen ",e.jsx(n,{children:"d_1, \\dots, d_{k-1}"})," gibt mit"]}),e.jsx(_,{children:`s(x) = p_1(x) + \\sum_{i=1}^{k-1} d_i\\,(x - \\corange{\\xi_i})_+^q
\\qquad \\text{für } x \\in [a, \\corange{\\xi_k}) .`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k = 1"})," ist das die Definition von ",e.jsx(n,{children:"p_1"}),`. Gilt die Darstellung bis
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),", so ist die Differenz ",e.jsx(n,{children:"r"})," zwischen ",e.jsx(n,{children:"s"}),` und der rechten Seite
auf `,e.jsx(n,{children:"[\\corange{\\xi_k}, \\corange{\\xi_{k+1}})"}),` ein Polynom vom Grad höchstens
`,e.jsx(n,{children:"q"}),", und ihre Ableitungen der Ordnungen ",e.jsx(n,{children:"0, \\dots, q-1"}),` verschwinden in
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),"."]}),e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"q"}),", dessen Ableitungen bis zur Ordnung ",e.jsx(n,{children:"q-1"}),`
in `,e.jsx(n,{children:"\\corange{\\xi_k}"}),` verschwinden, ist aber ein Vielfaches von
`,e.jsx(n,{children:"(x - \\corange{\\xi_k})^q"})," (",e.jsx(c,{id:"taylor-theorem",children:"Taylor-Entwicklung"}),` um
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),`). Das
liefert `,e.jsx(n,{children:"d_k"})," und den Induktionsschritt."]})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"q"})," hat höchstens ",e.jsx(n,{children:"q"})," Nullstellen, sofern es nicht das Nullpolynom ist; ein Intervall enthält unendlich viele Punkte."]}),children:[e.jsxs(i.p,{children:["Die Funktionen sind ",e.jsx(c,{id:"linear-independence",children:"linear unabhängig"}),"."]}),e.jsxs(i.p,{children:["Verschwindet eine Linearkombination auf ganz ",e.jsx(n,{children:"[a,b]"}),`, so verschwindet sie
insbesondere auf `,e.jsx(n,{children:"[a, \\corange{\\xi_1})"}),`. Dort tragen nur die Monome bei, also
ist das Polynom `,e.jsx(n,{children:"\\sum_j c_j x^j"}),` auf einem ganzen Intervall null und damit das
Nullpolynom, `,e.jsx(n,{children:"c_0 = \\dots = c_q = 0"}),"."]}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"[\\corange{\\xi_1}, \\corange{\\xi_2})"}),` bleibt dann nur
`,e.jsx(n,{children:"d_1 (x - \\corange{\\xi_1})^q"})," übrig, also ",e.jsx(n,{children:"d_1 = 0"}),`, und so weiter bis
`,e.jsx(n,{children:"d_{m-1} = 0"}),"."]})]}),e.jsx(F,{children:e.jsxs(i.p,{children:[`Damit ist die angegebene Familie eine Basis, und ihre Länge ist
`,e.jsx(n,{children:"(q+1) + (m-1) = m + q"}),"."]})})]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.5 (Die Parameterzählung als Gegenprobe)",id:"env-die-parameterzaehlung-als-gegenprobe",children:[e.jsx(i.p,{children:"Zum selben Ergebnis führt eine Abzählung ohne Basis."}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ohne Glattheitsforderung:"})," ",e.jsx(n,{children:"m"})," Teilintervalle mit je ",e.jsx(n,{children:"q+1"}),` Koeffizienten,
also `,e.jsx(n,{children:"m(q+1)"})," freie Parameter."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["An jedem der ",e.jsx(n,{children:"m-1"})," inneren Knoten:"]})," ",e.jsx(n,{children:"q"}),` Bedingungen, nämlich Stetigkeit von
`,e.jsx(n,{children:"s"})," und der ersten ",e.jsx(n,{children:"q-1"})," Ableitungen."]}),`
`]}),e.jsx(i.p,{children:"Das ergibt"}),e.jsx(_,{children:"m(q+1) - (m-1)\\,q = mq + m - mq + q = \\corange{m + q} ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"})," sind das ",e.jsx(n,{children:"5 \\cdot 4 - 4 \\cdot 3 = 20 - 12 = 8 = m + q"}),`
`,e.jsx(n,{children:"\\checkmark"}),". Die Rechnung setzt voraus, dass die ",e.jsx(n,{children:"(m-1)q"}),` Bedingungen
linear unabhängig sind; das liefert `,e.jsx(c,{id:"env:dimension-des-spline-raums",href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"})," nach."]}),e.jsxs(i.p,{children:["Beide Wege stützen sich auf ",e.jsx(i.em,{children:"einfache innere Knoten"}),` (kein
`,e.jsx(n,{children:"\\corange{\\xi_i}"})," tritt doppelt auf) und ",e.jsx(i.em,{children:"maximale Glattheit"})," ",e.jsx(n,{children:"\\Ccal^{q-1}"}),`.
Erlauben wir an einem Knoten weniger Glattheit, so fällt dort eine Bedingung
weg und die Dimension steigt um eins.`]})]}),`
`,e.jsx(i.h3,{children:"Interpolation mit kubischen Splines"}),`
`,e.jsxs(i.p,{children:["Wir interpolieren ",e.jsx(n,{children:"n = m+1"}),` Datenpunkte, die an den Knoten selbst liegen,
mit `,e.jsx(n,{children:"q = 3"}),"."]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.6 (Zwei Bedingungen fehlen: Randbedingungen)",id:"env-zwei-bedingungen-fehlen-randbedingungen",children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-dimension-des-spline-raums",children:"(13.4.1)"})," hat der Ansatzraum die Dimension ",e.jsx(n,{children:"m + 3"}),`, die Daten liefern
aber nur `,e.jsx(n,{children:"n = m + 1"})," Gleichungen. Es fehlen also genau ",e.jsx(i.em,{children:"zwei"}),` Bedingungen,
und ohne sie hat das `,e.jsx(c,{id:"env:interpolationsproblem",children:"Interpolationsproblem"}),` unendlich viele Lösungen. Üblich
sind drei Sorten von `,e.jsx(i.em,{children:"Randbedingungen"})," (boundary conditions):"]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Typ"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Bedingung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"natürlich"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"s''(a) = s''(b) = 0"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"eingespannt"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'(a)"})," und ",e.jsx(n,{children:"s'(b)"})," vorgegeben"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"periodisch"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'(a) = s'(b)"})," und ",e.jsx(n,{children:"s''(a) = s''(b)"})]})]})]})]}),e.jsxs(i.p,{children:["Liegt keine Information über den Rand vor, ist der ",e.jsx(i.em,{children:"natürliche Spline"}),` der
Standard, denn unter allen Interpolanten mit zwei stetigen Ableitungen hat er
die kleinste Gesamtkrümmung `,e.jsx(n,{children:"\\int_a^b |g''(x)|^2\\,\\mathrm{d}x"}),`
(`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),"). Im periodischen Fall zählt ",e.jsx(n,{children:"s(a) = s(b)"}),` nicht als
eine der beiden Bedingungen: Bei periodischen Daten (`,e.jsx(n,{children:"y_0 = y_m"}),`) folgt es
schon aus der Interpolation, sonst widerspricht es ihr.`]})]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.4.7 (Kubischer Spline durch vier Punkte)",id:"env-kubischer-spline-durch-vier-punkte",children:[e.jsxs(i.p,{children:[`Gegeben seien die vier Punkte
`,e.jsx(n,{children:"\\cblue{(0,0)},\\ \\cblue{(1,1)},\\ \\cblue{(2,0)},\\ \\cblue{(3,-1)}"}),`, also
`,e.jsx(n,{children:"m = 3"}),` Teilintervalle. Auf jedes legen wir ein kubisches Polynom
`,e.jsx(n,{children:"p_k(x) = c_{k1} + c_{k2}x + c_{k3}x^2 + c_{k4}x^3"}),`; das sind
`,e.jsx(n,{children:"3 \\cdot 4 = 12"})," Unbekannte. Die Bedingungen:"]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Typ"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Anzahl"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Beispiel"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"Interpolation"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"p_1(0) = 0"}),", ",e.jsx(n,{children:"p_1(1) = 1"}),", ",e.jsx(n,{children:"p_2(2) = 0"}),", ",e.jsx(n,{children:"p_3(3) = -1"})]})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1(1) = p_2(1)"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1'(1) = p_2'(1)"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s''"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1''(1) = p_2''(1)"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"natürlicher Rand"}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"s''(0) = s''(3) = 0"})})]})]})]}),e.jsxs(i.p,{children:["Zusammen ",e.jsx(n,{children:"4 + 2 + 2 + 2 + 2 = 12"})," Bedingungen für ",e.jsx(n,{children:"12"}),` Unbekannte, und das
lineare Gleichungssystem ist eindeutig lösbar. Jeder Datenpunkt wird dabei
nur `,e.jsx(i.em,{children:"einmal"})," gezählt: Dass etwa auch ",e.jsx(n,{children:"p_2(1) = 1"}),` gilt, erzwingt schon die
Stetigkeitszeile.`]}),e.jsx(i.p,{children:"Die Lösung lautet"}),e.jsx(_,{children:`\\cgreen{p_1(x)} = \\tfrac{1}{15}\\left(23x - 8x^3\\right), \\quad
\\cgreen{p_2(x)} = \\tfrac{1}{15}\\left(-18 + 77x - 54x^2 + 10x^3\\right), \\quad
\\cgreen{p_3(x)} = \\tfrac{1}{15}\\left(78 - 67x + 18x^2 - 2x^3\\right) .`}),e.jsxs(i.p,{children:["Zur Probe an der Naht ",e.jsx(n,{children:"x = 1"}),": ",e.jsx(n,{children:"\\cgreen{p_1(1)} = \\cgreen{p_2(1)} = 1"}),`,
`,e.jsx(n,{children:"\\cgreen{p_1'(1)} = \\cgreen{p_2'(1)} = -\\tfrac{1}{15}"}),` und
`,e.jsx(n,{children:"\\cgreen{p_1''(1)} = \\cgreen{p_2''(1)} = -\\tfrac{48}{15}"}),`; an den Rändern ist
`,e.jsx(n,{children:"\\cgreen{p_1''(0)} = 0"})," und ",e.jsx(n,{children:"\\cgreen{p_3''(3)} = \\tfrac{36 - 36}{15} = 0"}),"."]})]}),`
`,e.jsxs(ae,{title:"Das Zwölf-mal-zwölf-System",children:[e.jsx(i.p,{children:`Wie viele der zwölf Koeffizienten ändern sich, wenn wir einen einzigen
Messwert verschieben?`}),e.jsx(Mr,{}),e.jsxs(i.p,{children:[`Die Naht ist unsichtbar, obwohl links und rechts davon verschiedene Polynome
stehen; das Readout zeigt, dass Wert, Steigung und Krümmung bis auf Rundung
übereinstimmen. Beim Verschieben eines einzigen Messwerts ändern sich dagegen
`,e.jsx(i.em,{children:"alle"}),` zwölf Koeffizienten. Dass eine andere Darstellung desselben
Ansatzraums darin anders ausgeht, zeigt `,e.jsx(i.a,{href:"#env-bandstruktur-und-aufwand",children:"Bemerkung 13.4.14"}),"."]})]}),`
`,e.jsx(i.h3,{children:"B-Splines"}),`
`,e.jsxs(i.p,{children:[`Die stückweise Monomdarstellung aus
`,e.jsx(i.a,{href:"#env-kubischer-spline-durch-vier-punkte",children:"Beispiel 13.4.7"}),` erbt die schlechte Kondition der
`,e.jsx(c,{id:"env:monombasis-und-vandermonde-matrix",children:"Monombasis"})," (",e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`), ihre Matrix hat keine erkennbare
Struktur, und jeder Koeffizient hängt an allen Daten. Wir suchen deshalb eine
bessere `,e.jsx(c,{id:"basis",children:e.jsx(i.em,{children:"Basis"})})," von ",e.jsx(n,{children:"\\Scal_q"})," im Sinn von ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`;
nach `,e.jsx(c,{id:"env:dimension-des-spline-raums",href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"})," hat sie genau ",e.jsx(n,{children:"m + q"}),` Funktionen. Die
abgeschnittenen Potenzen aus demselben Satz taugen dafür nicht, denn jede ist
auf dem ganzen Stück rechts ihres Knotens von null verschieden und wird für
großes `,e.jsx(n,{children:"x"})," sehr groß. Stattdessen nehmen wir die B-Splines."]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.4.8 (Erweiterte Knotenfolge und B-Splines)",id:"env-erweiterte-knotenfolge-und-b-splines",children:[e.jsxs(i.p,{children:["Zum Gitter ",e.jsx(n,{children:"a = \\corange{\\xi_0} < \\dots < \\corange{\\xi_m} = b"}),` und zum Grad
`,e.jsx(n,{children:"q \\ge 0"})," setzen wir die ",e.jsx(i.em,{children:"erweiterte Knotenfolge"}),`
`,e.jsx(n,{children:"\\corange{\\tau_1} \\le \\dots \\le \\corange{\\tau_{m+2q+1}}"})," fest durch"]}),e.jsx(L,{tag:"13.4.2",id:"eq-erweiterte-knotenfolge-und-b-splines",children:`\\corange{\\tau_1} = \\dots = \\corange{\\tau_{q+1}} = \\corange{\\xi_0}, \\qquad
\\corange{\\tau_{q+1+i}} = \\corange{\\xi_i} \\ \\ (i = 1, \\dots, m-1), \\qquad
\\corange{\\tau_{m+q+1}} = \\dots = \\corange{\\tau_{m+2q+1}} = \\corange{\\xi_m} .`}),e.jsxs(i.p,{children:["Die Randknoten treten also ",e.jsx(n,{children:"(q+1)"}),`-fach auf, die inneren einfach; zusammen
sind das `,e.jsx(n,{children:"(q+1) + (m-1) + (q+1) = m + 2q + 1"})," Knoten."]}),e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"B-Splines"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}}"}),", ",e.jsx(n,{children:"k = 1, \\dots, m+q"}),`, sind rekursiv
über den Grad erklärt. Für `,e.jsx(n,{children:"q = 0"})," ist"]}),e.jsx(_,{children:"\\corange{B_k^{(0)}(x)} = \\ind\\left(\\corange{\\tau_k} \\le x < \\corange{\\tau_{k+1}}\\right),"}),e.jsxs(i.p,{children:["und für ",e.jsx(n,{children:"q > 0"})," gilt die ",e.jsx(i.em,{children:"Cox-de-Boor-Rekursion"})]}),e.jsx(L,{tag:"13.4.3",id:"eq-erweiterte-knotenfolge-und-b-splines-2",children:`\\corange{B_k^{(q)}(x)}
= \\frac{x - \\corange{\\tau_k}}{\\corange{\\tau_{k+q}} - \\corange{\\tau_k}}\\,
  \\corange{B_k^{(q-1)}(x)}
+ \\frac{\\corange{\\tau_{k+q+1}} - x}{\\corange{\\tau_{k+q+1}} - \\corange{\\tau_{k+1}}}\\,
  \\corange{B_{k+1}^{(q-1)}(x)} .`}),e.jsxs(i.p,{children:["Ein Summand mit verschwindendem Nenner wird dabei als ",e.jsx(n,{children:"0"}),` gelesen; das
betrifft nur die mehrfachen Randknoten. Am rechten Rand lesen wir das letzte
nichtleere Knotenintervall als abgeschlossen, damit die Basisfunktionen auch
in `,e.jsx(n,{children:"b"})," definiert sind."]})]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.4.9 (Die B-Splines sind eine Basis)",id:"env-die-b-splines-sind-eine-basis",children:[e.jsxs(i.p,{children:["Mit den Bezeichnungen aus ",e.jsx(c,{id:"env:erweiterte-knotenfolge-und-b-splines",href:"#env-erweiterte-knotenfolge-und-b-splines",children:"Definition 13.4.8"})," gilt für ",e.jsx(n,{children:"q \\ge 1"}),":"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokaler Träger:"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}(x)} = 0"}),` für
`,e.jsx(n,{children:"x \\notin [\\corange{\\tau_k}, \\corange{\\tau_{k+q+1}}]"}),`, und
`,e.jsx(n,{children:"\\corange{B_k^{(q)}(x)} > 0"}),` für
`,e.jsx(n,{children:"\\corange{\\tau_k} < x < \\corange{\\tau_{k+q+1}}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zerlegung der Eins:"}),`
`,e.jsx(n,{children:"\\sum_{k=1}^{m+q} \\corange{B_k^{(q)}(x)} = 1"})," für alle ",e.jsx(n,{children:"x \\in [a,b]"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Glattheit:"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}} \\in \\Ccal^{q-1}"}),`, jedes
`,e.jsx(n,{children:"\\corange{B_k^{(q)}}"})," liegt also selbst in ",e.jsx(n,{children:"\\Scal_q"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Basis:"})," ",e.jsx(n,{children:"\\corange{B_1^{(q)}}, \\dots, \\corange{B_{m+q}^{(q)}}"}),` sind linear
unabhängig und `,e.jsx(c,{id:"span",children:"spannen"})," ",e.jsx(n,{children:"\\Scal_q"})," auf. Jeder Spline ",e.jsx(n,{children:"\\cgreen{s}"}),` vom Grad
`,e.jsx(n,{children:"q"})," besitzt daher genau eine Darstellung"]}),`
`]}),e.jsx(L,{tag:"13.4.4",id:"eq-die-b-splines-sind-eine-basis",children:"\\cgreen{s(x)} = \\sum_{k=1}^{m+q} a_k\\, \\corange{B_k^{(q)}(x)} ."})]}),`
`,e.jsxs(i.p,{children:[`Einen Beweis führen wir nicht, und die Rekursion dient im Weiteren nur als
Referenz. Aussage 1 und 3 lesen sich an einem Rekursionsschritt ab
(Vertiefung unten), und weil `,e.jsx(n,{children:"m+q"}),` die Dimension aus
`,e.jsx(c,{id:"env:dimension-des-spline-raums",href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),` ist, ist ein aufspannendes System
automatisch eine Basis.`]}),`
`,e.jsxs(i.p,{children:["Damit ist der Anschluss an ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` hergestellt: Wir
wählen `,e.jsx(n,{children:"\\corange{\\phi_k} = \\corange{B_k^{(q)}}"}),` als Basisfunktionen, stellen
das System `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` auf und lösen es. Neu ist nur, wie gut
dieses System konditioniert ist.`]}),`
`,e.jsxs(ae,{title:"Die B-Spline-Basis erkunden",children:[e.jsx(i.p,{children:"Wie viele Basisfunktionen sind an einer Stelle aktiv, und wie entsteht ihre Form aus der Rekursion?"}),e.jsx(Fr,{}),e.jsxs(i.p,{children:[`Die gestrichelte Summe liegt über dem ganzen Gitter konstant bei eins, obwohl
die einzelnen Kurven ganz verschieden aussehen. Und an jeder Stelle sind
höchstens `,e.jsx(n,{children:"q+1"}),` Basisfunktionen von null verschieden: Das ist die Zahl, die
gleich die Rechenzeit bestimmt.`]})]}),`
`,e.jsxs(H,{title:"Die Cox-de-Boor-Rekursion von Hand",children:[e.jsxs(k,{kind:"Bemerkung",label:"13.4.10 (Warum die Knotenfolge so lang sein muss)",id:"env-warum-die-knotenfolge-so-lang-sein-muss",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(n,{children:"m + q"})," Basisfunktionen nur ",e.jsx(n,{children:"m + q"}),` Knoten anzusetzen, liegt nahe, reicht
aber nicht: Die Rekursion `,e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines-2",children:"(13.4.3)"}),` greift für
`,e.jsx(n,{children:"k = m+q"})," auf ",e.jsx(n,{children:"\\corange{\\tau_{m+2q+1}}"})," zu, es braucht also ",e.jsx(n,{children:"m + 2q + 1"}),`
Knoten.`]}),e.jsxs(i.p,{children:["Ebenso wichtig ist, dass sich die drei Vorschriften in ",e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines",children:"(13.4.2)"}),` nicht
überschneiden. Der linke Randblock belegt die Indizes `,e.jsx(n,{children:"1, \\dots, q+1"}),`, die
inneren Knoten die Indizes `,e.jsx(n,{children:"q+2, \\dots, q+m"}),`, der rechte Randblock die
Indizes `,e.jsx(n,{children:"m+q+1, \\dots, m+2q+1"}),`: Jeder Index bekommt genau einen Wert. Begänne
der rechte Block schon bei `,e.jsx(n,{children:"m+1"}),", so bekäme für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"}),` der Knoten
`,e.jsx(n,{children:"\\corange{\\tau_6}"})," sowohl ",e.jsx(n,{children:"\\corange{\\xi_2}"})," als auch ",e.jsx(n,{children:"\\corange{\\xi_5}"}),`
zugewiesen.`]})]}),e.jsxs(k,{kind:"Beispiel",label:"13.4.11 (Grad 1: die Hutfunktionen)",id:"env-grad-1-die-hutfunktionen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\corange{\\xi} = (0, 1, 2)"}),", also ",e.jsx(n,{children:"m = 2"}),", und ",e.jsx(n,{children:"q = 1"}),` lautet die
erweiterte Knotenfolge`]}),e.jsx(_,{children:"\\corange{\\tau} = (0,\\ 0,\\ 1,\\ 2,\\ 2),"}),e.jsxs(i.p,{children:["das sind ",e.jsx(n,{children:"m + 2q + 1 = 5"})," Knoten und damit ",e.jsx(n,{children:"m + q = 3"}),` Basisfunktionen. Die
Rekursion liefert`]}),e.jsx(_,{children:`\\corange{B_1^{(1)}(x)} = \\begin{cases} 1 - x, & 0 \\le x < 1 \\\\ 0 & \\text{sonst,} \\end{cases}
\\qquad
\\corange{B_2^{(1)}(x)} = \\begin{cases} x, & 0 \\le x < 1 \\\\ 2 - x, & 1 \\le x \\le 2 \\end{cases}
\\qquad
\\corange{B_3^{(1)}(x)} = \\begin{cases} x - 1, & 1 \\le x \\le 2 \\\\ 0 & \\text{sonst.} \\end{cases}`}),e.jsxs(i.p,{children:["An der Stelle ",e.jsx(n,{children:"x = 0{,}25"})," etwa stehen dort die Werte ",e.jsx(n,{children:"0{,}75"}),", ",e.jsx(n,{children:"0{,}25"}),` und
`,e.jsx(n,{children:"0"}),", bei ",e.jsx(n,{children:"x = 1{,}5"})," die Werte ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"0{,}5"})," und ",e.jsx(n,{children:"0{,}5"}),`. In beiden Fällen ist
die Summe `,e.jsx(n,{children:"1"}),`, und das gilt an jeder Stelle. Jede dieser drei Hutfunktionen ist
selbst ein Spline vom Grad `,e.jsx(n,{children:"1"}),`, nichtnegativ und nur auf höchstens
`,e.jsx(n,{children:"q + 1 = 2"}),` Gitterintervallen von null verschieden. An den Rändern
sorgen die doppelten Knoten dafür, dass der Träger kürzer ausfällt.`]})]}),e.jsxs(ae,{title:"Ein Rekursionsschritt Stück für Stück",children:[e.jsxs(i.p,{children:["Die Rekursion aus ",e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines-2",children:"(13.4.3)"}),` baut
`,e.jsx(n,{children:"\\corange{B_3^{(q)}}"})," aus zwei Nachbarn vom Grad ",e.jsx(n,{children:"q-1"}),` auf, jeder mit einer
eigenen Gewichtsrampe. Wo beide Rampen tragen, entsteht die zusätzliche
Glattheit; wo nur eine trägt, wächst der Träger um ein Intervall.`]}),e.jsx(qr,{})]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.12 (B-Splines in R)",id:"env-b-splines-in-r",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.code,{children:"R"})," liefert ",e.jsx(i.code,{children:"splines::bs()"})," die Auswertungsmatrix ",e.jsx(n,{children:"\\bB"})," direkt:"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`y <- f(x)
B <- splines::bs(x, df = 10, degree = 3, intercept = TRUE)
a <- solve(B, y)

xnew <- seq(0, 1, length = 100)
Bnew <- splines::bs(xnew, knots = attr(B, "knots"),
                    Boundary.knots = attr(B, "Boundary.knots"),
                    degree = attr(B, "degree"),
                    intercept = TRUE)
fhat <- Bnew %*% a
`})}),e.jsxs(i.p,{children:["Die erste Hälfte ist der Algorithmus aus ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`: Basis
auswerten, System lösen. Die zweite wertet den Interpolanten an neuen Stellen
aus, und dafür muss die neue Basismatrix zu `,e.jsx(i.em,{children:"derselben"}),` Basis gehören; deshalb
reichen wir innere Knoten, Randknoten und Grad weiter, statt `,e.jsx(i.code,{children:"bs()"}),` sie aus
`,e.jsx(i.code,{children:"xnew"}),` neu bestimmen zu lassen. Vergessen wir das, gibt es keine
Fehlermeldung: Die Spaltenzahl stimmt, und heraus kommt eine glatte Kurve, nur
nicht die geschätzte. Am sichersten erledigt das bei einem angepassten Modell
die zugehörige `,e.jsx(i.code,{children:"predict()"}),"-Methode."]})]}),`
`,e.jsx(i.h3,{children:"Warum B-Splines? Kondition und Aufwand"}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.13 (Konditionszahlen: eine Größenordnung, kein Messwert)",id:"env-konditionszahlen-eine-groessenordnung",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = 20"})," Punkte in ",e.jsx(n,{children:"[0,1]"}),` stellen wir zwei Basissysteme gegenüber. Die
`,e.jsx(c,{id:"condition-number",children:"Konditionszahlen"}),` sind Größenordnungen; sie hängen von
der `,e.jsx(c,{id:"matrix-norm",children:"Norm"}),`, der Lage der Auswertungsstellen und der
Knotenwahl ab.`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Basis"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Grad"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Konditionszahl"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"Monombasis"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\cred{\\kappa(\\bB_{\\text{mono}}) \\approx 10^{16}}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"kubische B-Splines"}),e.jsx(i.td,{style:{textAlign:"center"},children:"3"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\cgreen{\\kappa(\\bB_{\\text{spline}}) \\approx 10^{1} \\text{ bis } 10^{2}}"})})]})]})]}),e.jsxs(i.p,{children:["Die obere Zeile setzt die Tabelle aus ",e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),` fort; in
exakter rationaler Arithmetik nachgerechnet ist
`,e.jsx(n,{children:"\\cred{\\kappa_1 = 4{,}4 \\cdot 10^{16}}"}),`, während die kubische
B-Spline-Kollokationsmatrix mit ebenfalls `,e.jsx(n,{children:"20"}),` Basisfunktionen in derselben
Norm auf `,e.jsx(n,{children:"\\cgreen{\\kappa_1 = 37}"}),` kommt, gut fünfzehn Größenordnungen
weniger (mit dem aufgerundeten Tabellenwert `,e.jsx(n,{children:"10^2"})," vierzehn). Bei ",e.jsx(n,{children:"\\cred{\\kappa \\approx 10^{16}}"}),` ist von den etwa sechzehn
signifikanten Stellen eines `,e.jsx(i.code,{children:"double"}),` im Ergebnis
nichts mehr sicher, während `,e.jsx(n,{children:"\\cgreen{\\kappa \\approx 40}"}),` nicht einmal zwei
Stellen kostet (Faustregel in `,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.4.14 (Bandstruktur und Aufwand)",id:"env-bandstruktur-und-aufwand",children:[e.jsxs(i.p,{children:["Der zweite Vorteil ist die Struktur der Matrix. Nach ",e.jsx(c,{id:"env:die-b-splines-sind-eine-basis",href:"#env-die-b-splines-sind-eine-basis",children:"Satz 13.4.9"}),` sind an jeder
Stelle `,e.jsx(n,{children:"x_i"})," höchstens ",e.jsx(n,{children:"q+1"}),` Basisfunktionen von null verschieden, in der
`,e.jsx(n,{children:"i"}),"-ten Zeile von ",e.jsx(n,{children:"\\bB"})," stehen also höchstens ",e.jsx(n,{children:"q+1"}),` Einträge ungleich null,
und sie stehen nebeneinander. `,e.jsx(n,{children:"\\bB"}),` ist eine
`,e.jsx(c,{id:"sparse-matrix",children:"dünn besetzte"})," ",e.jsx(i.em,{children:"Bandmatrix"})," mit Bandbreite ungefähr ",e.jsx(n,{children:"q"}),"."]}),e.jsxs(i.p,{children:["Die Elimination bearbeitet deshalb in jedem Schritt nur die höchstens ",e.jsx(n,{children:"q"}),`
Zeilen unterhalb des Pivots, die noch im Band liegen, und in jeder nur die
höchstens `,e.jsx(n,{children:"q"})," Einträge des Bandes (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),"). Bei einer Systemgröße ",e.jsx(n,{children:"N"}),`
kostet das`]}),e.jsx(_,{children:"O(N q^2) \\quad \\text{statt} \\quad O(N^3)"}),e.jsxs(i.p,{children:["(",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"). Dabei ist ",e.jsx(n,{children:"N = m+q"}),` die Zahl der Basisfunktionen; bei
Interpolation an `,e.jsx(n,{children:"n"})," Punkten ist ",e.jsx(n,{children:"N = n"}),"."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"N = 1000"})," und ",e.jsx(n,{children:"q = 3"}),` ist das Verhältnis
`,e.jsx(n,{children:"N^3 / (N q^2) = N^2/q^2 = 10^6/9 \\approx 111\\,000"}),`, also ein
Beschleunigungsfaktor der Größenordnung `,e.jsx(n,{children:"10^5"}),`. Verglichen werden dabei
Operationszahlen, keine gemessenen Laufzeiten.`]})]}),`
`,e.jsx(i.h3,{children:"Eigenschaften"}),`
`,e.jsxs(i.p,{children:["Splines, meist mit ",e.jsx(n,{children:"q = 3"}),`, sind heute das gebräuchlichste Basissystem zur
Funktionsapproximation.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.4.15 (Eigenschaften von Splines und B-Splines)",id:"env-eigenschaften-von-splines-und-b-splines",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"q \\ge 1"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Approximierbarkeit:"})," Zu jeder stetigen Funktion ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"[a,b]"}),` und jedem
`,e.jsx(n,{children:"\\varepsilon > 0"}),` gibt es ein Gitter, dessen maximale Knotenweite
`,e.jsx(n,{children:"\\max_k |\\corange{\\xi_k} - \\corange{\\xi_{k-1}}|"}),` klein genug ist, sodass
der zugehörige Raum `,e.jsx(n,{children:"\\Scal_q"})," ein ",e.jsx(n,{children:"\\cgreen{s}"}),` mit
`,e.jsx(n,{children:"\\left\\| f - \\cgreen{s} \\right\\|_\\infty < \\varepsilon"})," enthält."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ableitung und Integral:"})," Die Ableitung eines Splines vom Grad ",e.jsx(n,{children:"q"}),` ist ein
Spline vom Grad `,e.jsx(n,{children:"q-1"}),` zum selben Gitter, eine Stammfunktion ist ein Spline
vom Grad `,e.jsx(n,{children:"q+1"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokaler Träger:"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}}"}),` verschwindet außerhalb von
`,e.jsx(n,{children:"[\\corange{\\tau_k}, \\corange{\\tau_{k+q+1}}]"}),`, also außerhalb von höchstens
`,e.jsx(n,{children:"q+1"})," Gitterintervallen."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:[`Aussage 2 folgt durch stückweises Ableiten: Der Grad jedes Stücks sinkt um
eins, und aus `,e.jsx(n,{children:"\\cgreen{s} \\in \\Ccal^{q-1}"}),` wird
`,e.jsx(n,{children:"\\cgreen{s'} \\in \\Ccal^{q-2}"}),", wieder die maximale Glattheit zum Grad ",e.jsx(n,{children:"q-1"}),`.
Die Ableitung eines kubischen Splines ist also ein quadratischer Spline, die
Krümmung eine stückweise lineare Funktion. Aussage 1 ist im Fall `,e.jsx(n,{children:"q = 1"}),` die gleichmäßige Stetigkeit
von `,e.jsx(n,{children:"f"}),`, für höhere Grade ein klassisches Resultat der
Approximationstheorie; wie schnell der Fehler mit der Knotenweite fällt,
klärt `,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.4.16 (Ableitungen und Integral des Splines)",id:"env-vorsicht-bei-den-ableitungen",children:e.jsxs(i.p,{children:["Das Integral des Splines approximiert das Integral von ",e.jsx(n,{children:"f"}),`, denn aus
`,e.jsx(n,{children:"\\left\\| f - \\cgreen{s} \\right\\|_\\infty < \\varepsilon"}),` folgt sofort die
Schranke `,e.jsx(n,{children:"(b-a)\\varepsilon"}),` für die Differenz der Integrale. Für die
Ableitungen gilt das nur eingeschränkt: `,e.jsx(n,{children:"f"}),` muss selbst genügend oft
differenzierbar sein, und jede Ableitungsordnung kostet eine Potenz der
Knotenweite. Eine kleine Abweichung in den Funktionswerten sagt für sich
genommen nichts über die Steigungen.`]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.4.17 (Was die Lokalität praktisch bedeutet)",id:"env-was-die-lokalitaet-praktisch-bedeutet",children:e.jsxs(i.p,{children:[`Verschieben wir einen einzigen Messwert, so ändert sich nur eine rechte
Seite, und die zugehörige Zeile von `,e.jsx(n,{children:"\\bB"}),` enthält nur die wenigen
Basisfunktionen in seiner Umgebung. Die Lösung des Gleichungssystems koppelt
die Koeffizienten allerdings weiter, denn die Inverse einer Bandmatrix ist im
Allgemeinen dicht; bei gut konditionierten Bandsystemen fällt der Einfluss
aber typischerweise schnell mit dem Abstand ab. Ein globales Polynom wirkt
dagegen über das ganze Intervall, am stärksten oft weit weg von der gestörten
Stelle (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]})}),`
`,e.jsxs(ae,{title:"Ein Datenpunkt wandert",children:[e.jsx(i.p,{children:`Wie weit vom verschobenen Punkt entfernt ist von der Störung noch etwas zu
sehen – beim Polynom und beim Spline?`}),e.jsx(Pr,{}),e.jsxs(i.p,{children:[`Fern vom gestörten Punkt trennen sich die beiden Ansatzräume: Mehr als zwei
Knoten entfernt bleibt die Spline-Änderung in der Voreinstellung unter
`,e.jsx(n,{children:"0{,}037"}),", während das Polynom dort weiterhin ",e.jsx(n,{children:"2{,}320"}),` ausschlägt, und zwar
am äußeren Rand. Lokal ist die B-Spline-Darstellung damit, abgeschottet aber
nicht: Neun der elf Koeffizienten reagieren messbar, obwohl an der
verschobenen Stelle nur drei Basisfunktionen von null verschieden sind. Nur
die beiden Randkoeffizienten bleiben exakt stehen, weil sie beim offenen
Knotenvektor unmittelbar an den Randwerten hängen.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Spline vom Grad ",e.jsx(n,{children:"q"})," auf ",e.jsx(n,{children:"m"}),` Teilintervallen ist ein Polynom vom Grad
`,e.jsx(n,{children:"mq"}),"."]}),e.jsxs(i.p,{children:["Er ist kein einzelnes Polynom, sondern eine Zusammensetzung aus ",e.jsx(n,{children:"m"}),`
Polynomen vom Grad `,e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"q"}),`. Der Grad wächst nicht mit der Zahl
der Stücke; das ist der Zweck der Konstruktion. Nur im Sonderfall
`,e.jsx(n,{children:"m = 1"})," liegt ein einzelnes Polynom vor, und auch dann vom Grad höchstens ",e.jsx(n,{children:"q"}),"."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Zur Beschreibung eines Splines vom Grad ",e.jsx(n,{children:"q"})," auf ",e.jsx(n,{children:"m+1"}),` Knoten brauchen wir
`,e.jsx(n,{children:"m+q"})," Parameter."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(c,{id:"env:dimension-des-spline-raums",href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),`, unter seinen beiden Annahmen: einfache innere
Knoten und maximale Glattheit `,e.jsx(n,{children:"\\Ccal^{q-1}"}),`. Die Abzählung dazu lautet
`,e.jsx(n,{children:"m(q+1) - (m-1)q = m+q"}),"; für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"})," also ",e.jsx(n,{children:"20 - 12 = 8"}),`.
Verlangen wir an einem Knoten weniger Glattheit, steigt die Zahl.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[`Jede Funktion, die auf jedem Teilintervall mit einem Polynom vom Grad
höchstens `,e.jsx(n,{children:"q"})," übereinstimmt, ist ein Spline vom Grad ",e.jsx(n,{children:"q"}),"."]}),e.jsxs(i.p,{children:["Die Glattheit gehört zur Definition (",e.jsx(i.a,{href:"#env-was-in-dieser-definition-steckt",children:"Bemerkung 13.4.2"}),`). Die Funktion, die auf
`,e.jsx(n,{children:"[0,1)"})," konstant ",e.jsx(n,{children:"0"})," und auf ",e.jsx(n,{children:"[1,2]"})," konstant ",e.jsx(n,{children:"1"}),` ist, besteht aus zwei
Polynomen vom Grad höchstens `,e.jsx(n,{children:"3"}),`, ist aber nicht einmal stetig und damit kein
kubischer Spline. Ein Spline vom Grad `,e.jsx(n,{children:"0"}),` ist sie dagegen, denn dort fordert
`,e.jsx(n,{children:"\\Ccal^{-1}"})," nichts."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Fordern wir von einem kubischen Spline zusätzlich, dass auch ",e.jsx(n,{children:"s'''"}),` stetig
ist, so bekommen wir eine glattere, aber immer noch stückweise verschiedene
Kurve.`]}),e.jsxs(i.p,{children:[`Dann stimmen benachbarte kubische Polynome an ihrer Nahtstelle in allen vier
Ableitungen der Ordnungen `,e.jsx(n,{children:"0"})," bis ",e.jsx(n,{children:"3"}),` überein und sind deshalb identisch. Aus
dem Spline wird ein einziges globales Polynom vom Grad höchstens `,e.jsx(n,{children:"3"}),`, und wir
sind zurück bei dem Ansatz, den wir gerade verlassen haben. `,e.jsx(n,{children:"\\Ccal^{q-1}"}),` ist
die höchste sinnvolle Glattheitsforderung.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Interpolieren wir ",e.jsx(n,{children:"n = m+1"}),` Datenpunkte mit einem kubischen Spline zum
Gitter der Datenpunkte, so ist der Interpolant eindeutig bestimmt.`]}),e.jsxs(i.p,{children:["Der Ansatzraum hat die Dimension ",e.jsx(n,{children:"m+3"}),", die Daten liefern aber nur ",e.jsx(n,{children:"m+1"}),`
Gleichungen. Zwei Bedingungen fehlen, und ohne sie gibt es unendlich viele
Lösungen (`,e.jsx(i.a,{href:"#env-zwei-bedingungen-fehlen-randbedingungen",children:"Bemerkung 13.4.6"}),`). Erst eine Randbedingung wie
`,e.jsx(n,{children:"s''(a) = s''(b) = 0"})," macht das System quadratisch und regulär."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`Die Ableitung eines kubischen Splines ist ein quadratischer Spline zum selben
Gitter.`}),e.jsxs(i.p,{children:["Stückweises Ableiten senkt den Grad jedes Stücks von ",e.jsx(n,{children:"3"})," auf ",e.jsx(n,{children:"2"}),`, und aus
`,e.jsx(n,{children:"\\Ccal^2"})," wird ",e.jsx(n,{children:"\\Ccal^1"})," (",e.jsx(c,{id:"env:eigenschaften-von-splines-und-b-splines",href:"#env-eigenschaften-von-splines-und-b-splines",children:"Satz 13.4.15"}),`). Das ist die maximale Glattheit
zum Grad `,e.jsx(n,{children:"2"}),`. Entsprechend ist die zweite Ableitung eines kubischen Splines
stückweise linear und stetig, während die dritte stückweise konstant ist
und an den Knoten springen darf.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Verschieben wir einen Datenpunkt, so ändern sich nur die Koeffizienten
derjenigen B-Splines, die an dieser Stelle von null verschieden sind.`}),e.jsxs(i.p,{children:[`Die Änderung ist lokalisiert, aber nicht exakt lokal. An einem inneren
Datenpunkt sind bei `,e.jsx(n,{children:"q = 3"}),` nur drei Basisfunktionen von null verschieden,
im Beispiel des Widgets reagieren jedoch neun von elf Koeffizienten messbar:
`,e.jsx(n,{children:"1{,}732"}),", dann ",e.jsx(n,{children:"0{,}464"}),", ",e.jsx(n,{children:"0{,}124"}),", ",e.jsx(n,{children:"0{,}031"}),", ",e.jsx(n,{children:"0{,}010"}),`. Das
Gleichungssystem koppelt die Koeffizienten über das Band, und die Kopplung
fällt je Knotenabstand auf gut ein Viertel, statt abzubrechen.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath behandelt die stückweise polynomiale Interpolation in
§7.4, die kubischen Splines in §7.4.2 und die B-Splines samt Rekursion und
Bandstruktur in §7.4.3; die klassische Referenz zur Sache ist
Carl de Boor, A Practical Guide to Splines.`})})]})}function $r(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(ds,{...s})}):ds(s)}const{blau:as,gruen:Zn,orange:hs,rot:Kn,grau:Je,hellgrau:Rr}=ee,cs=[[0,0],[1,1],[2,0]],$s=s=>s<=1?1.5*s-.5*s**3:1.5*(2-s)-.5*(2-s)**3,Rs=s=>s<=1?-3*s:-3*(2-s),Ir=s=>-s*s+2*s,Er=-2,Wr=(s,i)=>(1-i)*$s(s)+i*Ir(s),Is=(s,i)=>(1-i)*Rs(s)+i*Er;function os(s,i,r,l=2e3){const t=(r-i)/l;let a=s(i)+s(r);for(let d=1;d<l;d++)a+=(d%2===1?4:2)*s(i+d*t);return a*t/3}function xs(s){const i=r=>Is(r,s)**2;return os(i,0,1)+os(i,1,2)}const Be=430,Ve=260,R={l:42,r:12,t:12,b:28},fi=[{id:"kurven",label:"Kurven f(x)",yd:[-.25,1.3],achse:"f(x)",sLegende:"Spline s",gLegende:"g_t",fs:$s,fg:Wr},{id:"kruemmung",label:"zweite Ableitung f″(x)",yd:[-4.6,2.6],achse:"f″(x)",sLegende:"s″",gLegende:"g_t″",fs:Rs,fg:Is}];function Vr(){const[s,i]=P.useState("kurven"),[r,l]=P.useState(1e3),t=r/1e3,a=fi.find(j=>j.id===s)??fi[0],d=P.useMemo(()=>xs(0),[]),h=P.useMemo(()=>xs(t),[t]),x=[-.12,2.12],m=j=>R.l+(j-x[0])/(x[1]-x[0])*(Be-R.l-R.r),b=j=>R.t+(a.yd[1]-j)/(a.yd[1]-a.yd[0])*(Ve-R.t-R.b),f=j=>{let v="";for(const[B,D]of[[0,1],[1,2]])for(let w=0;w<=120;w++){const u=B+(D-B)*w/120,A=j(u);Number.isFinite(A)&&(v+=`${w===0?"M":"L"}${m(u).toFixed(1)} ${b(A).toFixed(1)}`)}return v},g=f(a.fs),p=f(j=>a.fg(j,t)),y=r===0,S=j=>`rounded border px-2 py-1 text-sm ${j?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`;let z;if(y)z=`Bei t = 0 ist g₀ der natürliche kubische Spline selbst, die rote Kurve liegt auf der grünen. Das Krümmungsintegral steht bei ${Y(h)} und ist über den ganzen Regler hinweg der kleinste erreichbare Wert: Der Beweis zu ${xe("satz:kubische-splines-haben-minimale")} liefert J(g) = J(s) + ∫(h″)², und der Zusatzterm ist genau dann null, wenn h verschwindet.`;else if(Math.abs(t-1)<1e-9)z=`Bei t = 1 steht die Parabel p(x) = −x² + 2x da. Ihre zweite Ableitung ist konstant −2, das Integral also 4 · 2 = ${Y(h)}. Der Spline kommt mit ${Y(d)} aus, der Überschuss ${Y(h-d)} ist ∫(h″)² mit h = p − s. Beide Kurven treffen dieselben drei blauen Punkte.`;else{let j;t<0?j=`Wegen p − s ≥ 0 liegt g_t für negative t zwischen den Stützstellen unter dem Spline, und im Knoten x = 1 ist es mit g_t″(1) = ${Y(-3+t,2)} stärker gekrümmt als der Spline mit −3.`:t<1?j="Für t zwischen 0 und 1 verläuft g_t zwischen Spline und Parabel.":j="Für t über 1 zieht g_t noch über die Parabel hinaus.",z=`Der Regler steht bei t = ${Y(t,2)}. Die rote Kurve g_t = s + t·(p − s) interpoliert dieselben drei Punkte wie der Spline, denn p − s verschwindet an den Stützstellen. Ihr Krümmungsintegral ist ${Y(h)} gegen ${Y(d)} beim Spline, der Überschuss ${Y(h-d)} stimmt mit 2t² = ${Y(2*t*t)} überein. ${j}`}const o=s==="kruemmung";return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{children:"Stellen wir zuerst eine Vermutung für die minimale Krümmung auf und verschieben dann t."}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[fi.map(j=>e.jsx("button",{type:"button",className:S(j.id===s),onClick:()=>i(j.id),children:j.label},j.id)),e.jsx("button",{type:"button",className:S(!1),onClick:()=>l(0),children:"t = 0 (Spline)"}),e.jsx("button",{type:"button",className:S(!1),onClick:()=>l(1e3),children:"t = 1 (Parabel)"})]}),e.jsx(ne,{label:"Mischung t",min:-1e3,max:2e3,step:50,value:r,onChange:l,fmt:j=>Y(j/1e3,2),accent:Kn}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${Be} ${Ve}`,width:Be,height:Ve,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:R.l,y:R.t,width:Be-R.l-R.r,height:Ve-R.t-R.b,fill:"none",stroke:Rr,strokeWidth:.8}),Xn(x[0],x[1]).map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:m(j),x2:m(j),y1:Ve-R.b,y2:Ve-R.b+3,stroke:Je}),e.jsx("text",{x:m(j),y:Ve-R.b+14,textAnchor:"middle",fontSize:9,fill:Je,children:String(j).replace("-","−").replace(".",",")})]},`x${j}`)),Xn(a.yd[0],a.yd[1]).map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:R.l-3,x2:R.l,y1:b(j),y2:b(j),stroke:Je}),e.jsx("text",{x:R.l-5,y:b(j)+3,textAnchor:"end",fontSize:9,fill:Je,children:String(j).replace("-","−").replace(".",",")})]},`y${j}`)),e.jsx("line",{x1:R.l,x2:Be-R.r,y1:b(0),y2:b(0),stroke:Je,strokeWidth:1}),e.jsx("text",{x:Be-R.r-4,y:b(0)-5,textAnchor:"end",fontSize:10,fill:Je,children:"x"}),e.jsx("text",{x:R.l+3,y:R.t+10,fontSize:10,fill:Je,children:a.achse}),cs.map(([j])=>e.jsx("line",{x1:m(j),x2:m(j),y1:R.t,y2:Ve-R.b,stroke:hs,strokeDasharray:"2 4",strokeWidth:1},`k${j}`)),e.jsx("path",{d:g,fill:"none",stroke:Zn,strokeWidth:2.6}),e.jsx("path",{d:p,fill:"none",stroke:Kn,strokeWidth:1.8,strokeDasharray:"6 3"}),!o&&cs.map(([j,v])=>e.jsx("circle",{cx:m(j),cy:b(v),r:4.5,fill:as},`d${j}`)),e.jsxs("g",{fontSize:10,children:[e.jsx("text",{x:Be-R.r-8,y:R.t+14,textAnchor:"end",fill:Zn,children:"Spline s"}),e.jsx("text",{x:Be-R.r-8,y:R.t+27,textAnchor:"end",fill:Kn,children:"g_t (gestrichelt)"}),e.jsx("text",{x:Be-R.r-8,y:R.t+40,textAnchor:"end",fill:hs,children:"Knoten (senkrecht)"}),e.jsx("text",{x:Be-R.r-8,y:R.t+53,textAnchor:"end",fill:as,children:o?"Daten (nur in der ersten Ansicht)":"Daten"})]})]}),e.jsxs("div",{className:"min-w-56 grow space-y-2",children:[e.jsx("table",{className:"w-full text-right font-mono text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Mischung t"}),e.jsx("td",{className:"px-2 py-0.5",children:Y(t,2)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",style:{color:Zn},children:"J(s) = ∫₀² |s″|²"}),e.jsx("td",{className:"px-2 py-0.5",style:{color:Zn},children:Y(d)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",style:{color:Kn},children:"J(g_t) = ∫₀² |g_t″|²"}),e.jsx("td",{className:"px-2 py-0.5",style:{color:Kn},children:Y(h)})]}),e.jsxs("tr",{className:"font-semibold",children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Überschuss ∫(h″)²"}),e.jsx("td",{className:"px-2 py-0.5",children:Y(h-d)})]})]})}),e.jsx("p",{className:"px-2 text-xs text-slate-600 dark:text-slate-400",children:"Die Teilintegrale des Splines sind ∫₀¹ 9x² dx = 3 und ∫₁² 9(2 − x)² dx = 3."})]})]}),e.jsxs(he,{kind:y?"ok":"warn",children:[z," Das bestätigt ",xe("satz:kubische-splines-haben-minimale"),"."]})]})}function us(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Bis hierher war Interpolation ein lineares Problem: Basis wählen, System
lösen (`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),"). Offen ist, warum gerade ",e.jsx(i.em,{children:"kubische"}),` Splines der
Standard sind; Grad `,e.jsx(n,{children:"2"})," wäre billiger, Grad ",e.jsx(n,{children:"5"}),` glatter. Die Antwort ist ein
Optimalitätssatz: Unter allen zweimal stetig differenzierbaren Funktionen
durch dieselben Punkte hat der natürliche kubische Spline die geringste
Gesamtkrümmung, er löst also ein `,e.jsx(c,{id:"optimization",children:"Optimierungsproblem"}),`. Im
Englischen heißt diese Eigenschaft `,e.jsx(i.em,{children:"minimal wiggliness"}),"."]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.5.1 (Was von hier an gebraucht wird)",id:"env-was-die-zweite-kapitelhaelfte",children:e.jsxs(i.p,{children:["Ab ",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),` brauchen wir aus der linearen Algebra
`,e.jsx(c,{id:"linear-least-squares",children:"Kleinste Quadrate"})," (",e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`) und die
`,e.jsx(c,{id:"pseudoinverse",children:"Pseudoinverse"})," (",e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),`), aus der Statistik
die Designmatrix eines `,e.jsx(c,{id:"linear-regression",children:"linearen Modells"}),` und die
Zerlegung des mittleren quadratischen Fehlers in Bias und
`,e.jsx(c,{id:"variance",children:"Varianz"})," (",e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),`). Aus der Analysis kommen die
`,e.jsx(c,{id:"differentiability",children:"Glattheitsklassen"})," ",e.jsx(n,{children:"\\Ccal^k"})," der ",e.jsx(n,{children:"k"}),`-mal stetig
differenzierbaren Funktionen hinzu, hier `,e.jsx(n,{children:"\\Ccal^2"}),` und in
`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"})," ",e.jsx(n,{children:"\\Ccal^4"}),`, dazu Integrale wie
`,e.jsx(n,{children:"\\int |f''(x)|^2 \\dx"})," und die partielle Integration."]})}),`
`,e.jsx(i.h3,{children:"Splines, kurz erinnert"}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.5.2 (Spline)",id:"env-spline",children:[e.jsxs(i.p,{children:[`Ein kubischer Spline setzt kubische Polynome an den Knoten
`,e.jsx(n,{children:"\\corange{\\xi_1 < \\dots < \\xi_{m-1}}"})," zu einer ",e.jsx(n,{children:"\\Ccal^2"}),`-Funktion zusammen
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`): Wert, erste und zweite Ableitung gehen ohne Sprung über die
Knoten.`]}),e.jsxs(i.p,{children:[`Zur Benennung, weil im Satz weiter unten andere Buchstaben stehen:
`,e.jsx(n,{children:"\\corange{\\xi_1}, \\dots, \\corange{\\xi_{m-1}}"})," sind dabei nur die ",e.jsx(i.em,{children:"inneren"}),`
Trennstellen. Im Krümmungssatz fallen die Knoten mit den Stützstellen
zusammen und heißen deshalb `,e.jsx(n,{children:"\\corange{x_1}, \\dots, \\corange{x_n}"}),`, die beiden
Intervallenden mitgezählt. Bei `,e.jsx(n,{children:"n"})," Datenpunkten ist also ",e.jsx(n,{children:"m = n - 1"}),` und
`,e.jsx(n,{children:"\\corange{\\xi_k} = \\corange{x_{k+1}}"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Krümmung als Zielgröße"}),`
`,e.jsxs(i.p,{children:[`Um „möglichst glatt" rechenbar zu machen, brauchen wir eine Zahl für die
Welligkeit einer Funktion. Die `,e.jsx(c,{id:"derivative",children:"zweite Ableitung"})," ",e.jsx(n,{children:"f''"}),` ist
groß, wo sich die Steigung schnell ändert, und verschwindet genau für
Geraden; weil nur die Stärke der Biegung zählt und nicht ihre Richtung,
quadrieren wir sie und integrieren über das Intervall.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.5.3 (Krümmungsfunktional)",id:"env-kruemmungsfunktional",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"g \\in \\Ccal^2[a, b]"})," heißt"]}),e.jsx(L,{tag:"13.5.1",id:"eq-kruemmungsfunktional",children:"J(g) := \\int_a^b \\left|g''(x)\\right|^2 \\dx"}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"Krümmungsfunktional"})," von ",e.jsx(n,{children:"g"})," auf ",e.jsx(n,{children:"[a, b]"}),"."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"J"})," ist eine ",e.jsx(c,{id:"objective-function",children:"Zielfunktion"}),` auf einem Funktionenraum,
und `,e.jsx(n,{children:"J(g) = 0"}),` gilt genau für die affinen Funktionen
`,e.jsx(n,{children:"g(x) = \\alpha x + \\beta"}),". Je größer ",e.jsx(n,{children:"J(g)"}),", desto stärker ist die Kurve gekrümmt."]}),`
`,e.jsxs(i.p,{children:["Streng genommen misst ",e.jsx(n,{children:"J"}),` nicht die geometrische Krümmung
`,e.jsx(n,{children:"\\kappa(x) = |g''(x)| / (1 + g'(x)^2)^{3/2}"}),`; nur für flache Kurven mit
`,e.jsx(n,{children:"|g'| \\ll 1"})," ist ",e.jsx(n,{children:"\\kappa \\approx |g''|"}),`. Der Name „minimale Krümmung" ist
trotzdem eingebürgert, gemeint ist immer `,e.jsx(i.a,{href:"#eq-kruemmungsfunktional",children:"(13.5.1)"}),". Dass ",e.jsx(n,{children:"J"}),`
quadratisch ist, macht das Folgende möglich: Quadratische Ziele führen auf
lineare Gleichungen, wie bei den Kleinsten Quadraten in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),"."]}),`
`,e.jsxs(i.p,{children:["Gesucht ist also unter allen ",e.jsx(n,{children:"\\Ccal^2"}),`-Funktionen durch die gegebenen Punkte
die mit dem kleinsten `,e.jsx(n,{children:"J"}),`. Interpolanten gibt es unendlich viele
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`), das Minimum dagegen ist eindeutig, und es hat einen
Namen.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.5.4 (Kubische Splines haben minimale Krümmung)",id:"env-kubische-splines-haben-minimale",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n \\ge 2"}),` und
`,e.jsx(n,{children:"\\cblue{(x_1, y_1)}, \\dots, \\cblue{(x_n, y_n)} \\in [a,b] \\times \\R"}),` mit
`,e.jsx(n,{children:"a = \\corange{x_1} < \\corange{x_2} < \\dots < \\corange{x_n} = b"}),`. Sei
`,e.jsx(n,{children:"\\cgreen{s}"})," ein ",e.jsx(i.em,{children:"natürlicher kubischer Spline"}),` mit Knoten
`,e.jsx(n,{children:"\\corange{x_1, \\dots, x_n}"}),`, der diese Punkte interpoliert, also
`,e.jsx(n,{children:"\\cgreen{s(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"})," und"]}),e.jsx(_,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0 ."}),e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cred{g} \\in \\Ccal^2[a, b]"}),` eine weitere Funktion mit
`,e.jsx(n,{children:"\\cred{g(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"}),". Dann gilt"]}),e.jsx(_,{children:`\\int_a^b \\left|\\cgreen{s''(x)}\\right|^2 \\dx
\\;\\le\\;
\\int_a^b \\left|\\cred{g''(x)}\\right|^2 \\dx ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"J(\\cgreen{s}) \\le J(\\cred{g})"}),"."]})]}),`
`,e.jsx(i.p,{children:`Der Beweis besteht im Kern aus zwei partiellen Integrationen über die
Knotenintervalle; die natürlichen Randbedingungen lassen dabei einen
störenden Randterm verschwinden.`}),`
`,e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{s}"})," ist auf jedem Teilintervall ein Polynom und an den Knoten zweimal stetig differenzierbar, liegt also selbst in ",e.jsx(n,{children:"\\Ccal^2"}),"; die Differenz zweier ",e.jsx(n,{children:"\\Ccal^2"}),"-Funktionen ist wieder ",e.jsx(n,{children:"\\Ccal^2"})]}),children:[e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"\\cred{h} := \\cred{g} - \\cgreen{s}"}),`. Dann ist
`,e.jsx(n,{children:"\\cred{h} \\in \\Ccal^2[a, b]"}),", und weil ",e.jsx(n,{children:"\\cgreen{s}"})," und ",e.jsx(n,{children:"\\cred{g}"}),` dieselben
Werte interpolieren, gilt`]}),e.jsx(_,{children:"\\cred{h(x_i)} = 0 \\qquad \\text{für } i = 1, \\dots, n ."})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["binomische Formel ",e.jsx(n,{children:"(u + v)^2 = u^2 + 2uv + v^2"})," mit ",e.jsx(n,{children:"u = \\cgreen{s''}"})," und ",e.jsx(n,{children:"v = \\cred{h''}"}),"; alle drei Integrale existieren, weil ",e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h''}"})," stetig sind"]}),children:[e.jsxs(i.p,{children:["Ausmultiplizieren von ",e.jsx(n,{children:"\\cred{g''} = \\cgreen{s''} + \\cred{h''}"}),` unter dem
Integral liefert die Zerlegung`]}),e.jsx(L,{tag:"13.5.2",id:"eq-eq-13-5-2",children:`J(\\cred{g})
= J(\\cgreen{s})
+ 2 \\int_a^b \\cgreen{s''(x)}\\,\\cred{h''(x)} \\dx
+ \\int_a^b \\left(\\cred{h''(x)}\\right)^2 \\dx .`}),e.jsx(i.p,{children:"Zu zeigen bleibt, dass der mittlere Term verschwindet."})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["zweimal partiell integriert: der erste Durchgang schiebt einen Strich von ",e.jsx(n,{children:"\\cred{h''}"})," auf ",e.jsx(n,{children:"\\cgreen{s''}"})," und hinterlässt den Randterm ",e.jsx(n,{children:"\\cgreen{s''}\\cred{h'}"})," samt ",e.jsx(n,{children:"-\\int \\cgreen{s^{(3)}}\\cred{h'}"}),", der zweite behandelt dieses Integral genauso und liefert den Randterm ",e.jsx(n,{children:"-\\cgreen{s^{(3)}}\\cred{h}"})," und ",e.jsx(n,{children:"+\\int \\cgreen{s^{(4)}}\\cred{h}"})]}),children:[e.jsxs(i.p,{children:["Auf jedem einzelnen Knotenintervall ",e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"}),` ist
`,e.jsx(n,{children:"\\cgreen{s}"})," ein Polynom vom Grad höchstens ",e.jsx(n,{children:"3"}),`, dort also beliebig oft
differenzierbar. Deshalb zerlegen wir das mittlere Integral und integrieren
auf jedem Stück zweimal partiell:`]}),e.jsx(_,{children:`\\int_{x_{i-1}}^{x_i} \\cgreen{s''}\\, \\cred{h''} \\dx
= \\Bigl[\\cgreen{s''}\\,\\cred{h'} - \\cgreen{s^{(3)}}\\,\\cred{h}\\Bigr]_{x_{i-1}}^{x_i}
+ \\int_{x_{i-1}}^{x_i} \\cgreen{s^{(4)}}\\, \\cred{h} \\dx .`})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["die dritte Ableitung eines kubischen Polynoms ist konstant, die vierte null; das gilt stückweise, an den Knoten selbst ist ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"})," im Allgemeinen unstetig"]}),children:[e.jsxs(i.p,{children:["Als kubisches Polynom hat ",e.jsx(n,{children:"\\cgreen{s}"}),` auf jedem Teilintervall
`,e.jsx(n,{children:"\\cgreen{s^{(4)}} \\equiv 0"}),`. Die Integrale fallen weg, übrig bleiben die
Randterme:`]}),e.jsx(_,{children:`\\int_a^b \\cgreen{s''}\\, \\cred{h''} \\dx
= \\sum_{i=2}^{n}
\\Bigl[\\cgreen{s''}\\,\\cred{h'} - \\cgreen{s^{(3)}}\\,\\cred{h}\\Bigr]_{x_{i-1}}^{x_i} .`})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"})," ist die natürliche Randbedingung; für den zweiten Anteil ist ",e.jsx(n,{children:"\\cgreen{s^{(3)}(x_i)}\\,\\cred{h(x_i)} = 0"})," von beiden Seiten, ganz gleich wie ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"})," dort springt"]}),children:[e.jsxs(i.p,{children:[`Die Summe teleskopiert, allerdings mit zwei verschiedenen Begründungen. Für
den ersten Anteil sind `,e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h'}"}),` an jedem inneren Knoten
stetig, der Beitrag vom rechten Rand des einen Intervalls hebt also den vom
linken Rand des nächsten auf:`]}),e.jsx(_,{children:`\\sum_{i=2}^{n} \\Bigl[\\cgreen{s''}\\,\\cred{h'}\\Bigr]_{x_{i-1}}^{x_i}
= \\Bigl[\\cgreen{s''}\\,\\cred{h'}\\Bigr]_a^b
= \\cgreen{s''(b)}\\,\\cred{h'(b)} - \\cgreen{s''(a)}\\,\\cred{h'(a)} = 0 .`}),e.jsxs(i.p,{children:["Der zweite Anteil verschwindet sogar summandenweise, weil ",e.jsx(n,{children:"\\cred{h}"}),` an jedem
Knoten null ist.`]})]}),e.jsxs(F,{why:e.jsx(e.Fragment,{children:"der verbleibende Integrand ist ein Quadrat, also nirgends negativ, und damit ist auch sein Integral nicht negativ"}),children:[e.jsxs(i.p,{children:["Damit ist der mittlere Term in ",e.jsx(i.a,{href:"#eq-eq-13-5-2",children:"(13.5.2)"})," null, und es bleibt"]}),e.jsx(L,{tag:"13.5.3",id:"eq-eq-13-5-3",children:`J(\\cred{g}) = J(\\cgreen{s}) + \\int_a^b \\left(\\cred{h''(x)}\\right)^2 \\dx
\\;\\ge\\; J(\\cgreen{s}) .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["hätte ",e.jsx(n,{children:"(\\cred{h''})^2"})," an einer Stelle einen positiven Wert, wäre es aus Stetigkeitsgründen auf einer ganzen Umgebung positiv und das Integral echt größer als null; aus ",e.jsx(n,{children:"\\alpha x_1 + \\beta = \\alpha x_2 + \\beta = 0"})," mit ",e.jsx(n,{children:"x_1 \\neq x_2"})," folgt ",e.jsx(n,{children:"\\alpha = 0"})," und dann ",e.jsx(n,{children:"\\beta = 0"})]}),children:e.jsxs(i.p,{children:["Für den Gleichheitsfall lesen wir ",e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"}),` rückwärts. Aus
`,e.jsx(n,{children:"J(\\cred{g}) = J(\\cgreen{s})"})," folgt ",e.jsx(n,{children:"\\int_a^b (\\cred{h''})^2 \\dx = 0"}),`, und
weil `,e.jsx(n,{children:"(\\cred{h''})^2"}),` stetig und nirgends negativ ist, folgt daraus
`,e.jsx(n,{children:"\\cred{h''} \\equiv 0"})," auf ",e.jsx(n,{children:"[a,b]"}),". Also ist ",e.jsx(n,{children:"\\cred{h}"}),` affin,
`,e.jsx(n,{children:"\\cred{h(x)} = \\alpha x + \\beta"}),". Wegen ",e.jsx(n,{children:"n \\ge 2"})," hat ",e.jsx(n,{children:"\\cred{h}"}),` mindestens
zwei verschiedene Nullstellen `,e.jsx(n,{children:"\\corange{x_1} \\neq \\corange{x_2}"}),`, und eine
affine Funktion mit zwei Nullstellen ist die Nullfunktion. Also
`,e.jsx(n,{children:"\\cred{h} \\equiv 0"})," und ",e.jsx(n,{children:"\\cred{g} = \\cgreen{s}"}),"."]})})]}),`
`,e.jsx(H,{title:"Was der Beweis von den Randbedingungen braucht",children:e.jsxs(k,{kind:"Bemerkung",label:"13.5.5 (Was die Randterme wirklich brauchen)",id:"env-was-die-randterme-wirklich-brauchen",children:[e.jsx(i.p,{children:"Der Beweis braucht drei Voraussetzungen."}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Das Teleskopieren von ",e.jsx(n,{children:"\\cgreen{s''}\\,\\cred{h'}"}),` braucht die Stetigkeit von
`,e.jsx(n,{children:"\\cgreen{s''}"})," ",e.jsx(i.em,{children:"und"})," von ",e.jsx(n,{children:"\\cred{h'}"}),` über die Knoten hinweg. Beides ist
vorhanden: `,e.jsx(n,{children:"\\cgreen{s}"})," ist als kubischer Spline in ",e.jsx(n,{children:"\\Ccal^2"}),`, und
`,e.jsx(n,{children:"\\cred{h}"})," ist es nach Voraussetzung an ",e.jsx(n,{children:"\\cred{g}"}),". Wäre ",e.jsx(n,{children:"\\cred{g}"}),` nur
stückweise glatt mit Knick, ginge der Schritt nicht.`]}),`
`,e.jsxs(i.li,{children:["Die dritte Ableitung ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"}),` darf an den Knoten dagegen
springen, und sie tut es im Allgemeinen auch. Der Term verschwindet
allein wegen `,e.jsx(n,{children:"\\cred{h(x_i)} = 0"}),`: Der Sprung wird mit null multipliziert.
Deshalb müssen die Knoten des Splines die Datenpunkte sein.`]}),`
`,e.jsxs(i.li,{children:["Für den letzten Rest ",e.jsx(n,{children:"[\\cgreen{s''}\\cred{h'}]_a^b"}),` hilft kein
Verschwinden von `,e.jsx(n,{children:"\\cred{h}"})," mehr, denn dort steht ",e.jsx(n,{children:"\\cred{h'}"}),`. Die
natürliche Bedingung `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),` macht ihn
null, und das ist der einfachste Weg. Es ist nicht der einzige: Verlangen
wir stattdessen von allen Kandidaten vorgeschriebene Randsteigungen, so
ist `,e.jsx(n,{children:"\\cred{h'(a)} = \\cred{h'(b)} = 0"}),`, und der Term verschwindet ebenso.
Das führt auf den eingespannten Spline (clamped spline), für den derselbe
Satz in seiner Klasse gilt.`]}),`
`]}),e.jsxs(i.p,{children:[`Eine Voraussetzung im Satzkopf ist dabei leicht zu übersehen:
`,e.jsx(n,{children:"a = \\corange{x_1}"})," und ",e.jsx(n,{children:"\\corange{x_n} = b"}),`, die äußersten Knoten sind also
die Intervallenden. Liegen die Daten echt im Inneren, setzen wir den Spline
außerhalb linear fort; dort ist `,e.jsx(n,{children:"\\cgreen{s''} = 0"}),", ",e.jsx(n,{children:"J(\\cgreen{s})"}),` bleibt
unverändert, und die Ungleichung überträgt sich auf das größere Intervall.`]})]})}),`
`,e.jsxs(k,{kind:"Korollar",label:"13.5.6 (Der natürliche kubische Spline ist der einzige Minimierer)",id:"env-der-natuerliche-kubische-spline-ist-der",children:[e.jsxs(i.p,{children:["Unter den Voraussetzungen von ",e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"})," ist ",e.jsx(n,{children:"\\cgreen{s}"})," der ",e.jsx(i.em,{children:"eindeutige"}),`
Minimierer von `,e.jsx(n,{children:"J"})," in der Menge"]}),e.jsx(_,{children:"\\left\\{ g \\in \\Ccal^2[a,b] \\;:\\; g(x_i) = \\cblue{y_i} \\text{ für } i = 1, \\dots, n \\right\\} ."}),e.jsxs(i.p,{children:[`Das ist der letzte Beweisschritt: Jeder andere Interpolant mit
demselben Krümmungswert ist `,e.jsx(n,{children:"\\cgreen{s}"})," selbst."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` setzt voraus, dass ein natürlicher
kubischer Spline durch die Punkte existiert. Das tut er, und er ist eindeutig:
Das zugehörige tridiagonale Gleichungssystem für die zweiten Ableitungen ist
strikt diagonaldominant und damit regulär.`]}),`
`,e.jsx(H,{title:"Die Abzählung und das tridiagonale System dahinter",children:e.jsxs(k,{kind:"Bemerkung",label:"13.5.7 (Existenz: die Abzählung geht auf)",id:"env-existenz-die-abzaehlung-geht-auf",children:[e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"n"})," Knoten gibt es ",e.jsx(n,{children:"n-1"})," Teilintervalle mit je ",e.jsx(n,{children:"4"}),` Koeffizienten,
zusammen `,e.jsx(n,{children:"4(n-1)"}),`
Unbekannte. Dem stehen `,e.jsx(n,{children:"2(n-1)"}),` Interpolationsbedingungen gegenüber (jedes
Stück trifft beide Endwerte), `,e.jsx(n,{children:"2(n-2)"}),` Glattheitsbedingungen an den inneren
Knoten (erste und zweite Ableitung) und die `,e.jsx(n,{children:"2"}),` natürlichen Randbedingungen.
Summe: `,e.jsx(n,{children:"2(n-1) + 2(n-2) + 2 = 4(n-1)"}),`, also genauso viele Gleichungen wie
Unbekannte. Für `,e.jsx(n,{children:"n = 5"})," etwa sind es ",e.jsx(n,{children:"16"})," auf beiden Seiten."]}),e.jsxs(i.p,{children:[`Abzählen allein ist noch kein Existenzbeweis, denn gleich viele Gleichungen
wie Unbekannte heißt nicht, dass die Matrix regulär ist. Das zeigt sich
aber, wenn wir die `,e.jsx(n,{children:"4(n-1)"})," Koeffizienten zugunsten der ",e.jsx(i.em,{children:"Momente"}),`
`,e.jsx(n,{children:"M_i := \\cgreen{s''(x_i)}"}),` eliminieren. Mit den Abständen
`,e.jsx(n,{children:"\\corange{h_i} := \\corange{x_{i+1}} - \\corange{x_i}"}),` bleibt für jeden inneren
Knoten `,e.jsx(n,{children:"i = 2, \\dots, n-1"})," genau eine Gleichung übrig,"]}),e.jsx(_,{children:`\\corange{h_{i-1}}\\,M_{i-1}
+ 2\\left(\\corange{h_{i-1}} + \\corange{h_i}\\right) M_i
+ \\corange{h_i}\\,M_{i+1}
= 6\\left(\\frac{\\cblue{y_{i+1}} - \\cblue{y_i}}{\\corange{h_i}}
- \\frac{\\cblue{y_i} - \\cblue{y_{i-1}}}{\\corange{h_{i-1}}}\\right),`}),e.jsxs(i.p,{children:["dazu ",e.jsx(n,{children:"M_1 = M_n = 0"}),` aus der natürlichen Randbedingung. Das ist ein
tridiagonales System in `,e.jsx(n,{children:"n-2"}),` Unbekannten, und sein Diagonaleintrag ist mit
`,e.jsx(n,{children:"2(\\corange{h_{i-1}} + \\corange{h_i})"}),` doppelt so groß wie die Summe der
beiden Nebeneinträge. Damit ist es strikt diagonaldominant, also regulär: Der
natürliche kubische Spline existiert und ist eindeutig. Zugleich ist es ein
Bandsystem, wie es `,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),` als ausnutzbare
Sonderstruktur aufführt: Die Elimination verlässt das Band nie, der Aufwand
wächst also nur linear in `,e.jsx(n,{children:"n"}),` statt kubisch. Deshalb bleiben Splines
auch bei vielen Punkten billig. Für die drei Punkte aus `,e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"}),` bleibt
davon die einzelne Gleichung `,e.jsx(n,{children:"4M_2 = -12"})," mit ",e.jsx(n,{children:"M_2 = -3"}),`, und das ist
das `,e.jsx(n,{children:"\\cgreen{s''(1)} = -3"}),`, das wir dort ausrechnen.
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` zählt denselben
Ansatz für vier Punkte durch.`]})]})}),`
`,e.jsx(i.h3,{children:"Beispiel: Spline gegen Parabel"}),`
`,e.jsxs(i.p,{children:["An drei Punkten lässt sich ",e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` von Hand
nachrechnen.`]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.5.8 (Drei Punkte, zwei Interpolanten)",id:"env-drei-punkte-zwei-interpolanten",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Gegeben:"})," die Punkte ",e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,0)}"}),`,
also `,e.jsx(n,{children:"a = 0"}),", ",e.jsx(n,{children:"b = 2"})," und Knoten ",e.jsx(n,{children:"\\corange{x_1 = 0}"}),", ",e.jsx(n,{children:"\\corange{x_2 = 1}"}),`,
`,e.jsx(n,{children:"\\corange{x_3 = 2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Der natürliche kubische Spline"})," ist"]}),e.jsx(_,{children:`\\cgreen{s(x)} = \\begin{cases}
1{,}5\\,x - 0{,}5\\,x^3 & x \\in [0, 1], \\\\[2pt]
1{,}5\\,(2-x) - 0{,}5\\,(2-x)^3 & x \\in [1, 2].
\\end{cases}`}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Interpolation:"})," ",e.jsx(n,{children:"\\cgreen{s(0)} = 0"}),", ",e.jsx(n,{children:"\\cgreen{s(1)} = 1{,}5 - 0{,}5 = 1"}),` und
`,e.jsx(n,{children:"\\cgreen{s(2)} = 0"}),", jeweils aus dem passenden Ast."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Glattheit im inneren Knoten:"}),` Aus
`,e.jsx(n,{children:"\\cgreen{s'(x)} = 1{,}5 - 1{,}5\\,x^2"}),` links und
`,e.jsx(n,{children:"\\cgreen{s'(x)} = -1{,}5 + 1{,}5\\,(2-x)^2"})," rechts wird an der Stelle ",e.jsx(n,{children:"x = 1"}),`
beidseitig `,e.jsx(n,{children:"0"}),"; aus ",e.jsx(n,{children:"\\cgreen{s''(x)} = -3x"}),` links und
`,e.jsx(n,{children:"\\cgreen{s''(x)} = -3(2-x)"})," rechts beidseitig ",e.jsx(n,{children:"-3"}),`. Der Spline ist also
`,e.jsx(n,{children:"\\Ccal^2"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Natürlichkeit:"})," ",e.jsx(n,{children:"\\cgreen{s''(0)} = 0"})," und ",e.jsx(n,{children:"\\cgreen{s''(2)} = -3 \\cdot 0 = 0"}),"."]}),e.jsx(i.p,{children:"Damit rechnen wir das Krümmungsintegral aus, getrennt nach Teilintervall:"}),e.jsx(_,{children:`\\begin{aligned}
J(\\cgreen{s})
&= \\int_0^1 (-3x)^2 \\dx + \\int_1^2 \\bigl(-3(2-x)\\bigr)^2 \\dx \\\\
&= \\int_0^1 9x^2 \\dx + \\int_0^1 9u^2 \\, \\mathrm{d}u \\\\
&= 9 \\cdot \\Bigl[\\tfrac{x^3}{3}\\Bigr]_0^1 + 9 \\cdot \\Bigl[\\tfrac{u^3}{3}\\Bigr]_0^1
= 3 + 3 = 6 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Im zweiten Integral haben wir ",e.jsx(n,{children:"u = 2 - x"}),` substituiert; das Minuszeichen aus
`,e.jsx(n,{children:"\\mathrm{d}u = -\\dx"})," und die gedrehten Grenzen heben sich auf."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Zum Vergleich die Parabel"})," ",e.jsx(n,{children:"\\cred{p(x)} = -x^2 + 2x"}),`. Auch sie
interpoliert, denn `,e.jsx(n,{children:"\\cred{p(0)} = 0"}),", ",e.jsx(n,{children:"\\cred{p(1)} = 1"}),` und
`,e.jsx(n,{children:"\\cred{p(2)} = 0"}),". Ihre Ableitungen sind ",e.jsx(n,{children:"\\cred{p'(x)} = -2x + 2"}),` und
`,e.jsx(n,{children:"\\cred{p''(x)} = -2"}),", also"]}),e.jsx(_,{children:"J(\\cred{p}) = \\int_0^2 (-2)^2 \\dx = 4 \\cdot 2 = 8 ."}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Interpolant"}),e.jsx(i.th,{style:{textAlign:"right"},children:e.jsx(n,{children:"\\int_0^2 \\left\\lvert f''(x)\\right\\rvert^2 \\dx"})})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:["Spline ",e.jsx(n,{children:"\\cgreen{s}"})]}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"6"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:["Parabel ",e.jsx(n,{children:"\\cred{p}"})]}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"8"})})]})]})]}),e.jsxs(i.p,{children:["Der Spline gewinnt, wie ",e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` es verlangt. Der Überschuss lässt sich
mit `,e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"})," sogar benennen: Mit ",e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),` ist
`,e.jsx(n,{children:"\\cred{h''(x)} = -2 + 3x"})," auf ",e.jsx(n,{children:"[0,1]"})," und"]}),e.jsx(_,{children:`\\int_0^1 (3x - 2)^2 \\dx = \\Bigl[\\tfrac{(3x-2)^3}{9}\\Bigr]_0^1
= \\tfrac{1}{9} - \\Bigl(-\\tfrac{8}{9}\\Bigr) = 1 ,`}),e.jsxs(i.p,{children:["auf ",e.jsx(n,{children:"[1,2]"}),` aus Symmetriegründen ebenso. Zusammen ist
`,e.jsx(n,{children:"\\int_0^2 (\\cred{h''})^2 \\dx = 2"}),", und tatsächlich ist ",e.jsx(n,{children:"6 + 2 = 8"}),"."]})]}),`
`,e.jsxs(ae,{title:"Eine ganze Schar von Interpolanten",children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),` an allen drei Stützstellen
verschwindet, interpoliert jede Mischung `,e.jsx(n,{children:"g_t = \\cgreen{s} + t\\,\\cred{h}"}),`
dieselben Daten, für jedes `,e.jsx(n,{children:"t \\in \\R"}),`. Der Regler fährt diese Schar ab:
`,e.jsx(n,{children:"t = 0"})," ist der Spline, ",e.jsx(n,{children:"t = 1"}),` die Parabel des Beispiels. Die Farben tragen
dieselben Rollen wie im Text.`]}),e.jsx(tn,{frage:"Bei welchem t wird die Krümmungsenergie minimal?",loesung:0,toleranz:.05,einheit:"t",verdeckt:e.jsx(i.p,{children:"Das Krümmungsintegral der Schar ist J(g_t) = J(s) + t² ∫ (h″)² dx = 6 + 2t², eine nach oben geöffnete Parabel in t. Ihr Minimum liegt bei t = 0, und das ist gerade der Spline."}),children:e.jsx(Vr,{})}),e.jsxs(i.p,{children:[`Die zweite Ansicht zeigt, woher der Unterschied kommt: zwei Geradenstücke von
`,e.jsx(n,{children:"\\cgreen{s''}"})," gegen die Konstante ",e.jsx(n,{children:"-2"})," von ",e.jsx(n,{children:"\\cred{p''}"}),`. Wegen
`,e.jsx(n,{children:"\\int_0^2 \\cgreen{s''}\\cred{h''}\\dx = 0"}),` fällt der gemischte Term aus dem
Integral heraus, und übrig bleibt der quadratische Zuschlag in `,e.jsx(n,{children:"t"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Über die Approximationsgüte sagt ",e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),`
nichts: Alle Konkurrenten treffen die Daten exakt und unterscheiden sich nur
in der Krümmung dazwischen. Wie weit ein Spline von einer zugrunde liegenden
Funktion abweicht, klärt `,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[`Jeder kubische Spline, der die Punkte interpoliert, minimiert das
Krümmungsfunktional `,e.jsx(n,{children:"J"}),"."]}),e.jsxs(i.p,{children:["Nur der ",e.jsx(i.em,{children:"natürliche"}),": Ohne ",e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),` bleibt im
Beweis der Randterm `,e.jsx(n,{children:"[\\cgreen{s''}\\,\\cred{h'}]_a^b"}),` stehen, und der kann
jedes Vorzeichen haben. Kubische Spline-Interpolanten zu denselben Daten gibt
es unendlich viele, weil zwei Randbedingungen frei sind. Die Parabel aus
`,e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"}),` ist selbst einer (ein Polynom vom
Grad `,e.jsx(n,{children:"2"}),` ist auch ein kubischer Spline), aber wegen
`,e.jsx(n,{children:"\\cred{p''(0)} = -2 \\neq 0"})," nicht der natürliche, und ihr ",e.jsx(n,{children:"J"})," ist um ",e.jsx(n,{children:"2"}),`
größer.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Beim Teleskopieren der Randterme darf ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"}),` an den Knoten
springen.`]}),e.jsxs(i.p,{children:["Der Term ",e.jsx(n,{children:"\\cgreen{s^{(3)}}\\,\\cred{h}"}),` wird an jedem Knoten mit
`,e.jsx(n,{children:"\\cred{h(x_i)} = 0"}),` multipliziert und verschwindet dadurch von beiden Seiten,
egal wie der Sprung aussieht. Für den anderen Term
`,e.jsx(n,{children:"\\cgreen{s''}\\,\\cred{h'}"}),` gilt das nicht, dort braucht es die Stetigkeit von
`,e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h'}"}),` und am Rand die natürlichen Bedingungen
(`,e.jsx(i.a,{href:"#env-was-die-randterme-wirklich-brauchen",children:"Bemerkung 13.5.5"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[`Der Beweis setzt voraus, dass auch die Vergleichsfunktion
`,e.jsx(n,{children:"\\cred{g''(a)} = \\cred{g''(b)} = 0"})," erfüllt."]}),e.jsxs(i.p,{children:[`Diese Forderung wird nirgends gebraucht. Sie wäre sogar schädlich: Sie
schlösse die meisten `,e.jsx(n,{children:"\\Ccal^2"}),`-Interpolanten aus, und gerade gegen die soll
der Spline gewinnen. Verwendet werden nur
`,e.jsx(n,{children:"\\cred{g} \\in \\Ccal^2"})," und ",e.jsx(n,{children:"\\cred{g(x_i)} = \\cblue{y_i}"}),"."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Überschuss ",e.jsx(n,{children:"J(\\cred{p}) - J(\\cgreen{s}) = 2"}),` im Beispiel ist genau
`,e.jsx(n,{children:"\\int_0^2 (\\cred{h''})^2 \\dx"})," mit ",e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),"."]}),e.jsxs(i.p,{children:["Das ist Gleichung ",e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"}),`, und im Beispiel rechnet es sich aus: Auf
`,e.jsx(n,{children:"[0,1]"})," ist ",e.jsx(n,{children:"\\cred{h''(x)} = -2 + 3x"})," mit ",e.jsx(n,{children:"\\int_0^1 (3x-2)^2 \\dx = 1"}),`, auf
`,e.jsx(n,{children:"[1,2]"})," aus Symmetriegründen ebenso, zusammen ",e.jsx(n,{children:"2 = 8 - 6"}),`. Der Kreuzterm aus
`,e.jsx(i.a,{href:"#eq-eq-13-5-2",children:"(13.5.2)"})," fällt weg, sonst stimmte die Rechnung nicht."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"J(\\cred{g}) = J(\\cgreen{s})"})," folgt stets ",e.jsx(n,{children:"\\cred{g} = \\cgreen{s}"}),`, auch
bei nur einer Stützstelle.`]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"n = 1"}),` ist jede affine Funktion durch den einen Punkt ein Interpolant
mit `,e.jsx(n,{children:"J = 0"}),`, Minimierer gibt es also unendlich viele. Der Schluss von
`,e.jsx(n,{children:"\\cred{h''} \\equiv 0"})," auf ",e.jsx(n,{children:"\\cred{h} \\equiv 0"}),` braucht zwei verschiedene
Nullstellen von `,e.jsx(n,{children:"\\cred{h}"}),", also ",e.jsx(n,{children:"n \\ge 2"}),"."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath führt natürliche kubische Splines in Kapitel 7
(Interpolation), Abschnitt 7.4.2 ein und rechnet dort denselben
Drei-Punkte-Fall mit acht Bedingungen vor. Die Minimaleigenschaft selbst
steht als Satz 7.57 bei Deuflhard und Hohmann, Numerische Mathematik 1;
dort findet sich auch die Rechtfertigung, warum statt der geometrischen
Krümmung deren Näherung `,e.jsx(n,{children:"f''"})," integriert wird."]})})]})}function Tr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(us,{...s})}):us(s)}const{gruen:gs,orange:pi,rot:Qe,violett:js,grau:ce,hellgrau:On}=ee,An=[3,5,9,17,33,65],Lr=5/384,ei=40,qi=2/5,Cr=12*ei*ei,ms=8001,Rn=s=>Math.exp(-ei*(s-qi)*(s-qi)),bs=s=>-2*ei*(s-qi)*Rn(s);function Zr(s,i){const r=s.length-1,l=[];for(let g=0;g<r;g++)l.push(s[g+1]-s[g]);const t=r+1,a=new Array(t).fill(0),d=new Array(t).fill(0),h=new Array(t).fill(0),x=new Array(t).fill(0);for(let g=1;g<r;g++)a[g]=l[g-1],d[g]=2*(l[g-1]+l[g]),h[g]=l[g],x[g]=6*((i[g+1]-i[g])/l[g]-(i[g]-i[g-1])/l[g-1]);d[0]=2*l[0],h[0]=l[0],x[0]=6*((i[1]-i[0])/l[0]-bs(s[0])),a[r]=l[r-1],d[r]=2*l[r-1],x[r]=6*(bs(s[r])-(i[r]-i[r-1])/l[r-1]);const m=new Array(t),b=new Array(t);m[0]=h[0]/d[0],b[0]=x[0]/d[0];for(let g=1;g<t;g++){const p=d[g]-a[g]*m[g-1];m[g]=h[g]/p,b[g]=(x[g]-a[g]*b[g-1])/p}const f=new Array(t);f[t-1]=b[t-1];for(let g=t-2;g>=0;g--)f[g]=b[g]-m[g]*f[g+1];return{xs:s,ys:i,hs:l,M:f}}function Gi(s,i){const{xs:r,ys:l,hs:t,M:a}=s,d=r.length-1;let h=0;if(i<=r[0])h=0;else if(i>=r[d])h=d-1;else{let f=0,g=d;for(;g-f>1;){const p=f+g>>1;i<r[p]?g=p:f=p}h=f}const x=t[h],m=r[h+1]-i,b=i-r[h];return a[h]*m*m*m/(6*x)+a[h+1]*b*b*b/(6*x)+(l[h]/x-a[h]*x/6)*m+(l[h+1]/x-a[h+1]*x/6)*b}function Or(s){const i=s-1,r=[],l=[];for(let m=0;m<=i;m++){const b=m/i;r.push(b),l.push(Rn(b))}const t=Zr(r,l);let a=0,d=0,h=-1/0;for(let m=0;m<ms;m++){const b=m/(ms-1),f=Gi(t,b);f>h&&(h=f);const g=Math.abs(Rn(b)-f);g>a&&(a=g,d=b)}const x=1/i;return{knoten:s,h:x,schranke:Lr*Math.pow(x,4)*Cr,fehler:a,argmax:d,hoehe:h,sp:t}}const Hr={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function Ke(s,i=3){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function Dn(s){return s.toFixed(5).replace(/0+$/,"").replace(/\.$/,"").replace(".",",")}function be(s){if(Number.isNaN(s))return"–";if(!Number.isFinite(s))return"∞";if(s===0)return"0";const[i,r]=s.toExponential(2).split("e"),l=String(Number(r)).split("").map(t=>Hr[t]??t).join("");return`${i.replace(".",",")}·10${l}`}const Ae=420,cn=205,on=150,q={l:46,r:12,t:12,b:26};function Ur({zeigeFaktor:s=!0}={}){const[i,r]=P.useState(1),l=P.useMemo(()=>An.map(Or),[]),t=l[i],a=i>0?l[i-1]:null,d=u=>q.l+u*(Ae-q.l-q.r),h=t.knoten>33?1.5:t.knoten>17?2.2:3,x=u=>q.t+(1.1-u)/1.3*(cn-q.t-q.b),m=(u,A)=>{let W="";for(let U=0;U<=1200;U++){const te=U/1200,ln=u(te);Number.isFinite(ln)&&(W+=`${U===0?"M":"L"}${d(te).toFixed(1)} ${A(ln).toFixed(1)}`)}return W},b=t.fehler>0?t.fehler*1.25:1,f=u=>q.t+(b-u)/(2*b)*(on-q.t-q.b),g=300,p=190,y={l:44,r:12,t:12,b:30},S=l.flatMap(u=>[Math.log10(u.fehler),Math.log10(u.schranke)]),z=Math.floor(Math.min(...S))-.3,o=Math.ceil(Math.max(...S))+.3,j=u=>y.l+u/(An.length-1)*(g-y.l-y.r),v=u=>y.t+(o-u)/(o-z)*(p-y.t-y.b),B=u=>u.map((A,W)=>`${W===0?"M":"L"}${j(W).toFixed(1)} ${v(Math.log10(A)).toFixed(1)}`).join(""),D=t.fehler/t.schranke,N=a?a.fehler/t.fehler:Number.NaN;let w;if(!a)w=`Das gröbste Gitter hat ${t.knoten} Knoten, also die Gitterweite h = ${Dn(t.h)}. ${xe("satz:approximationsfehler-kubischer-splines")} erlaubt damit einen Fehler von bis zu C·h⁴·M₄ = ${be(t.schranke)}; gemessen haben wir ${be(t.fehler)} an der Stelle x = ${Ke(t.argmax,4)}, also ${Ke(D*100,1)} % der Schranke. Mit nur drei Knoten geht die Spitze des Buckels komplett verloren: Der Spline kommt über ${Ke(t.hoehe,2)} nicht hinaus, während f auf 1 steigt. Schieben wir den Regler nach rechts, um die Gitterweite zu halbieren.`;else{const u=Math.abs(N-16)<=1.2?"Wir liegen schon dicht daran":N>16?"Auf diesem Gitter liegen wir darüber":"Auf diesem Gitter liegen wir darunter";w=`${t.knoten} Knoten, h = ${Dn(t.h)}: Der gemessene Fehler fällt von ${be(a.fehler)} auf ${be(t.fehler)}, also auf das ${Ke(1/N,4)}-fache. Das ist ein Faktor ${Ke(N,2)}. Der Exponent vier verspricht 2⁴ = 16: ${u}. Die Schranke selbst fällt exakt auf ein Sechzehntel, von ${be(a.schranke)} auf ${be(t.schranke)}; ausgeschöpft ist sie zu ${Ke(D*100,1)} %. Der größte Fehler sitzt jetzt bei x = ${Ke(t.argmax,4)}.`}return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{children:"Wählen wir ein Gitter und vergleichen die beiden aufeinanderfolgenden Fehler."}),e.jsx(ne,{label:"Knoten",min:0,max:An.length-1,step:1,value:i,onChange:r,fmt:u=>`${An[u]} (h = ${Dn(l[u].h)})`,accent:pi}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{children:[e.jsxs("svg",{width:Ae,viewBox:`0 0 ${Ae} ${cn}`,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:q.l,y:q.t,width:Ae-q.l-q.r,height:cn-q.t-q.b,fill:"none",stroke:On,strokeWidth:.8}),Xn(0,1).map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:d(u),x2:d(u),y1:cn-q.b,y2:cn-q.b+3,stroke:ce}),e.jsx("text",{x:d(u),y:cn-q.b+14,textAnchor:"middle",fontSize:9,fill:ce,children:li(u,.2)})]},`x${u}`)),[0,.5,1].map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:q.l-3,x2:q.l,y1:x(u),y2:x(u),stroke:ce}),e.jsx("text",{x:q.l-5,y:x(u)+3,textAnchor:"end",fontSize:9,fill:ce,children:li(u,.5)})]},`y${u}`)),e.jsx("line",{x1:q.l,x2:Ae-q.r,y1:x(0),y2:x(0),stroke:ce,strokeWidth:1}),e.jsx("text",{x:Ae-q.r-4,y:x(0)-5,textAnchor:"end",fontSize:10,fill:ce,children:"x"}),e.jsx("path",{d:m(Rn,x),fill:"none",stroke:js,strokeWidth:2.4}),e.jsx("path",{d:m(u=>Gi(t.sp,u),x),fill:"none",stroke:gs,strokeWidth:1.6,strokeDasharray:"5 3"}),t.sp.xs.map((u,A)=>e.jsx("circle",{cx:d(u),cy:x(t.sp.ys[A]),r:h,fill:pi},u)),e.jsx("text",{x:q.l+4,y:q.t+11,fontSize:10,fill:js,children:"f"}),e.jsx("text",{x:q.l+16,y:q.t+11,fontSize:10,fill:gs,children:"s"})]}),e.jsxs("svg",{width:Ae,viewBox:`0 0 ${Ae} ${on}`,className:"mt-2 max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:q.l,y:q.t,width:Ae-q.l-q.r,height:on-q.t-q.b,fill:"none",stroke:On,strokeWidth:.8}),Xn(0,1).map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:d(u),x2:d(u),y1:on-q.b,y2:on-q.b+3,stroke:ce}),e.jsx("text",{x:d(u),y:on-q.b+14,textAnchor:"middle",fontSize:9,fill:ce,children:li(u,.2)})]},`ex${u}`)),[-t.fehler,0,t.fehler].map((u,A)=>e.jsxs("g",{children:[e.jsx("line",{x1:q.l-3,x2:q.l,y1:f(u),y2:f(u),stroke:ce}),e.jsx("text",{x:q.l-5,y:f(u)+3,textAnchor:"end",fontSize:8,fill:ce,children:A===1?"0":(A===0?"−":"")+be(t.fehler)})]},`ey${A}`)),e.jsx("line",{x1:q.l,x2:Ae-q.r,y1:f(0),y2:f(0),stroke:ce,strokeWidth:1}),e.jsx("path",{d:m(u=>Rn(u)-Gi(t.sp,u),f),fill:"none",stroke:Qe,strokeWidth:1.8}),t.sp.xs.map(u=>e.jsx("circle",{cx:d(u),cy:f(0),r:h*.75,fill:pi},`k${u}`)),e.jsx("text",{x:q.l+4,y:q.t+11,fontSize:10,fill:Qe,children:"f − s"})]})]}),e.jsxs("div",{className:"min-w-0 grow space-y-2",children:[e.jsxs("svg",{viewBox:`0 0 ${g} ${p}`,width:g,height:p,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:y.l,y:y.t,width:g-y.l-y.r,height:p-y.t-y.b,fill:"none",stroke:On,strokeWidth:.8}),Array.from({length:Math.floor(o)-Math.ceil(z)+1},(u,A)=>Math.ceil(z)+A).map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:y.l-3,x2:g-y.r,y1:v(u),y2:v(u),stroke:On}),e.jsx("text",{x:y.l-5,y:v(u)+3,textAnchor:"end",fontSize:8,fill:ce,children:be(Math.pow(10,u))})]},`l${u}`)),An.map((u,A)=>e.jsx("text",{x:j(A),y:p-y.b+14,textAnchor:"middle",fontSize:9,fill:ce,children:u},`t${u}`)),e.jsx("text",{x:g/2,y:p-4,textAnchor:"middle",fontSize:9,fill:ce,children:"Knotenzahl"}),e.jsx("path",{d:B(l.map(u=>u.schranke)),fill:"none",stroke:Qe,strokeWidth:1.6,strokeDasharray:"5 3"}),e.jsx("path",{d:B(l.map(u=>u.fehler)),fill:"none",stroke:Qe,strokeWidth:2}),l.map((u,A)=>e.jsxs("g",{children:[e.jsx("circle",{cx:j(A),cy:v(Math.log10(u.schranke)),r:A===i?4:2.5,fill:"white",stroke:Qe,strokeWidth:1.6}),e.jsx("circle",{cx:j(A),cy:v(Math.log10(u.fehler)),r:A===i?4:2.5,fill:Qe})]},`p${u.knoten}`)),e.jsx("text",{x:y.l+6,y:y.t+11,fontSize:9,fill:Qe,children:"Schranke (gestrichelt), Fehler (voll)"})]}),e.jsx("div",{className:"overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsx("th",{className:"px-2 py-1",children:"Knoten"}),e.jsx("th",{className:"px-2 py-1",children:"h"}),e.jsx("th",{className:"px-2 py-1",children:"Schranke"}),e.jsx("th",{className:"px-2 py-1",children:"Fehler"}),s?e.jsx("th",{className:"px-2 py-1",children:"Faktor"}):null]})}),e.jsx("tbody",{children:l.map((u,A)=>e.jsxs("tr",{className:A===i?"font-semibold text-slate-900 dark:text-slate-100":"",children:[e.jsx("td",{className:"px-2 py-0.5",children:u.knoten}),e.jsx("td",{className:"px-2 py-0.5",children:Dn(u.h)}),e.jsx("td",{className:"px-2 py-0.5",children:be(u.schranke)}),e.jsx("td",{className:"px-2 py-0.5",children:be(u.fehler)}),s?e.jsx("td",{className:"px-2 py-0.5",children:A===0?"–":Ke(l[A-1].fehler/u.fehler,2)}):null]},u.knoten))})]})})]})]}),s?e.jsx(he,{kind:i===0?"neutral":"ok",children:w}):e.jsx(he,{kind:"neutral",children:`${t.knoten} Knoten, h = ${Dn(t.h)}: Schranke ${be(t.schranke)}, gemessener Fehler ${be(t.fehler)}; ausgeschöpft ist die Schranke zu ${Ke(D*100,1)} %. Der größte Fehler sitzt bei x = ${Ke(t.argmax,4)}.`})]})}function fs(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Splines setzen sich aus Polynomstücken zusammen und sind darum effizient zu
berechnen (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`), und unter allen Interpolanten mit stetiger zweiter
Ableitung hat der natürliche kubische Spline die kleinste Krümmung
(`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),`). Außerdem fängt ein hinreichend feines Knotengitter
jede `,e.jsx(c,{id:"continuity",children:"stetige Funktion"}),` beliebig genau ein. Eine Geschwindigkeit
nennt diese Aussage nicht: Sie sagt weder, wie viele Knoten wir brauchen, noch
was wir gewinnen, wenn wir die Zahl der Teilintervalle verdoppeln.`]}),`
`,e.jsx(i.h3,{children:"Gitterweite und Fehlerschranke"}),`
`,e.jsxs(k,{kind:"Definition",label:"13.6.1 (Partition und Gitterweite)",id:"env-partition-und-gitterweite",children:[e.jsxs(i.p,{children:["Eine ",e.jsx(i.em,{children:"Partition"})," des Intervalls ",e.jsx(n,{children:"[a, b]"})," ist eine geordnete Folge von Stellen"]}),e.jsx(_,{children:"a = \\corange{x_0} < \\corange{x_1} < \\dots < \\corange{x_n} = b ."}),e.jsxs(i.p,{children:["Ihre ",e.jsx(i.em,{children:"Gitterweite"})," (mesh width) ist die Länge des größten Teilintervalls,"]}),e.jsx(_,{children:"\\corange{h} := \\max_{i = 1, \\dots, n} \\left| x_i - x_{i-1} \\right| ."})]}),`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\corange{h}"}),` ist ein Maximum, kein Mittelwert: Ein einziges breites
Teilintervall bestimmt die Gitterweite, wie fein die übrigen auch liegen.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.6.2 (Approximationsfehler kubischer Splines)",id:"env-approximationsfehler-kubischer-splines",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"a = \\corange{x_0} < \\dots < \\corange{x_n} = b"}),` eine Partition mit
Gitterweite `,e.jsx(n,{children:"\\corange{h}"}),", und sei ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`. Dann gibt es einen
kubischen Spline `,e.jsx(n,{children:"\\cgreen{s}"}),` mit Knoten
`,e.jsx(n,{children:"\\corange{x_0}, \\dots, \\corange{x_n}"}),", der ",e.jsx(n,{children:"f"})," an allen Knoten interpoliert,"]}),e.jsx(_,{children:"\\cgreen{s(x_i)} = f(x_i) \\qquad \\text{für } i = 0, \\dots, n ,"}),e.jsx(i.p,{children:"und dessen Fehler die Schranke"}),e.jsx(L,{tag:"13.6.1",id:"eq-approximationsfehler-kubischer-splines",children:`\\max_{x \\in [a, b]} \\cred{\\left| f(x) - s(x) \\right|}
\\;\\le\\; C \\cdot \\corange{h}^4 \\cdot \\max_{x \\in [a, b]} \\left| f^{(4)}(x) \\right|`}),e.jsxs(i.p,{children:["erfüllt, mit einer kleinen Konstanten ",e.jsx(n,{children:"C"}),`. Für kubische Splines mit passenden
Randbedingungen gilt sie mit `,e.jsx(n,{children:"C = \\tfrac{5}{384}"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Konstante ",e.jsx(n,{children:"\\tfrac{5}{384}"})," gilt für den ",e.jsx(i.em,{children:"eingespannten"}),` kubischen Spline
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"), der zusätzlich ",e.jsx(n,{children:"s'(a) = f'(a)"})," und ",e.jsx(n,{children:"s'(b) = f'(b)"}),` erfüllt.
Der `,e.jsx(i.em,{children:"natürliche"}),` Spline erzwingt dagegen
`,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),"; ist ",e.jsx(n,{children:"f''(a)"})," oder ",e.jsx(n,{children:"f''(b)"}),` ungleich
null, erreicht er die Ordnung `,e.jsx(n,{children:"\\corange{h}^4"}),` global nicht. Das Beispiel
unten rechnet deshalb mit dem eingespannten Spline.`]}),`
`,e.jsx(H,{title:"Natürlicher oder eingespannter Spline",children:e.jsxs(k,{kind:"Bemerkung",label:"13.6.3 (Welcher Spline die Konstante trägt)",id:"env-welcher-spline-die-konstante-traegt",children:[e.jsxs(i.p,{children:[e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` behauptet die Existenz eines
kubischen Splines, nicht die Güte eines beliebigen Randabschlusses. Die
scharfe Konstante `,e.jsx(n,{children:"\\tfrac{5}{384}"}),` gilt für den eingespannten Spline und
ebenso für die passende Randbedingung zweiter Ordnung `,e.jsx(n,{children:"s''(a)=f''(a)"}),` und
`,e.jsx(n,{children:"s''(b)=f''(b)"}),`. Dem natürlichen Spline steht sie nicht pauschal zu: Passen
seine Randwerte `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"})," nicht zu ",e.jsx(n,{children:"f''(a)"}),` und
`,e.jsx(n,{children:"f''(b)"}),`, so ist er am Rand schlechter, und sein maximaler Fehler fällt global
nur wie `,e.jsx(n,{children:"\\corange{h}^2"}),"."]}),e.jsxs(i.p,{children:["Zwei eigene Rechnungen zeigen das. Für ",e.jsx(n,{children:"f(x) = e^x"})," auf ",e.jsx(n,{children:"[0, 1]"}),` ist
`,e.jsx(n,{children:"f''(0) = 1 \\neq 0"}),`, und der maximale Fehler des natürlichen Splines sinkt beim
Halbieren von `,e.jsx(n,{children:"\\corange{h}"})," nur auf ein Viertel: ",e.jsx(n,{children:"2{,}08 \\cdot 10^{-3}"}),`,
`,e.jsx(n,{children:"5{,}21 \\cdot 10^{-4}"}),", ",e.jsx(n,{children:"1{,}30 \\cdot 10^{-4}"})," und ",e.jsx(n,{children:"3{,}26 \\cdot 10^{-5}"}),` für
`,e.jsx(n,{children:"n = 8, 16, 32, 64"}),`. Die Fehlerspitze rückt dabei immer näher an den rechten
Rand (`,e.jsx(n,{children:"x \\approx 0{,}95"}),", dann ",e.jsx(n,{children:"0{,}976"}),", ",e.jsx(n,{children:"0{,}988"})," und ",e.jsx(n,{children:"0{,}994"}),`), der Rest des
Intervalls ist längst genauer. Noch schärfer ist `,e.jsx(n,{children:"f(x) = x^3"}),`: Dort steht rechts
in `,e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," eine Null, denn ",e.jsx(n,{children:"f^{(4)} \\equiv 0"}),", und tatsächlich ist ",e.jsx(n,{children:"f"}),` selbst
ein kubischer Spline und interpoliert sich fehlerfrei. Der natürliche Spline auf
vier gleich langen Teilintervallen weicht dagegen um `,e.jsx(n,{children:"0{,}018"}),` ab, weil er
`,e.jsx(n,{children:"\\cgreen{s''(1)} = 0"})," erzwingt, während ",e.jsx(n,{children:"f''(1) = 6"})," ist."]}),e.jsxs(i.p,{children:[`Im Beispiel unten schreiben wir die Randableitungen
`,e.jsx(n,{children:"\\cgreen{s'(0)} = f'(0)"})," und ",e.jsx(n,{children:"\\cgreen{s'(1)} = f'(1)"}),` vor. Wie viel daran
hängt, zeigt der natürliche Spline derselben Funktion. Auf groben Gittern ist
der Unterschied klein, weil die Funktion an beiden Rändern fast flach
ausläuft: Bei fünf Knoten messen wir `,e.jsx(n,{children:"0{,}341"})," statt ",e.jsx(n,{children:"0{,}324"}),`. Sobald das
Gitter fein wird, dominiert der Randfehler. Bei `,e.jsx(n,{children:"33"}),` Knoten sitzt der größte Fehler
des natürlichen Splines nicht mehr an der Spitze im Inneren, sondern bei
`,e.jsx(n,{children:"x \\approx 0{,}012"})," am linken Rand, und bei ",e.jsx(n,{children:"65"}),` Knoten ist er mit
`,e.jsx(n,{children:"1{,}84 \\cdot 10^{-5}"})," sogar ",e.jsx(i.em,{children:"größer"}),` als die Schranke
`,e.jsx(n,{children:"1{,}49 \\cdot 10^{-5}"})," aus ",e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),`. Ein
Widerspruch wäre das nur, wenn der Satz die Schranke für jeden Randabschluss
behauptete.`]})]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.6.4 (Wie wir die Schranke lesen)",id:"env-wie-wir-die-schranke-lesen",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`Je enger das Gitter, desto besser die Approximation. Die Gitterweite steht
in der `,e.jsx(i.em,{children:"vierten"})," Potenz: Halbieren wir ",e.jsx(n,{children:"\\corange{h}"}),`, so fällt die Schranke
auf `,e.jsx(n,{children:"2^{-4} = \\tfrac{1}{16}"})," ihres Werts."]}),`
`,e.jsxs(i.li,{children:[`Der zweite Faktor gehört der Funktion, nicht dem Verfahren. Je kleiner
`,e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),`, desto kleiner die Schranke; je
`,e.jsx(c,{id:"smooth-function",children:"glatter"})," also ",e.jsx(n,{children:"f"}),` ist, desto weniger Knoten kostet
dieselbe Genauigkeit. Für ein `,e.jsx(c,{id:"polynomial",children:"Polynom"}),` vom Grad höchstens
drei steht rechts sogar null.`]}),`
`,e.jsxs(i.li,{children:["Beide Faktoren sind Maxima über das ",e.jsx(i.em,{children:"ganze"}),` Intervall; lokal gerechnet steht
für jedes Teilintervall dessen eigene Länge neben dem dortigen Maximum von
`,e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),` (für Geradenstücke im Beweis zu
`,e.jsx(c,{id:"env:fehler-der-stueckweise-linearen",href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"}),`). Deshalb verdichten wir das Gitter
dort, wo `,e.jsx(n,{children:"\\left| f^{(4)} \\right|"})," groß ist, ",e.jsx(n,{children:"f"}),` also stark von einem
kubischen Polynom abweicht, und dünnen es aus, wo `,e.jsx(n,{children:"f"})," fast gerade verläuft."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Wie viel an Punkt 3 hängt, zeigt ",e.jsx(n,{children:"f(x) = \\sin(2\\pi x)"})," auf ",e.jsx(n,{children:"[0, 1]"}),`: Zehn
Knoten, die die linke Intervallhälfte als ein einziges Teilstück lassen und die
rechte in acht gleiche Stücke teilen (`,e.jsx(n,{children:"\\corange{h} = 0{,}5"}),`), ergeben für den
natürlichen kubischen Spline den maximalen Fehler `,e.jsx(n,{children:"0{,}479"}),`. Neun gleichmäßig
verteilte Knoten kommen auf `,e.jsx(n,{children:"0{,}00107"}),` und sind trotz eines Knotens weniger
rund 450-mal genauer.`]}),`
`,e.jsx(i.h3,{children:"Woher der Exponent kommt"}),`
`,e.jsxs(i.p,{children:[`Warum vier? Der Exponent hängt am Grad der Polynomstücke; am einfachsten sehen
wir das an geraden Stücken, dem Streckenzug durch die Punkte
`,e.jsx(n,{children:"(\\corange{x_i}, f(\\corange{x_i}))"}),"."]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.6.5 (Fehler der stückweise linearen Interpolation)",id:"env-fehler-der-stueckweise-linearen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f \\in \\Ccal^2[a, b]"})," und sei ",e.jsx(n,{children:"\\cgreen{p}"}),` der Streckenzug durch die Punkte
`,e.jsx(n,{children:"(\\corange{x_i}, f(\\corange{x_i}))"}),` zu einer Partition mit Gitterweite
`,e.jsx(n,{children:"\\corange{h}"}),". Dann gilt"]}),e.jsx(L,{tag:"13.6.2",id:"eq-fehler-der-stueckweise-linearen",children:`\\max_{x \\in [a, b]} \\cred{\\left| f(x) - p(x) \\right|}
\\;\\le\\; \\frac{\\corange{h}^2}{8} \\max_{x \\in [a, b]} \\left| f''(x) \\right| .`})]}),`
`,e.jsxs(i.p,{children:["Bei Geradenstücken steht ",e.jsx(n,{children:"\\corange{h}^2"})," neben ",e.jsx(n,{children:"f''"}),`, allgemein bei
Polynomstücken vom Grad `,e.jsx(n,{children:"q"})," die Potenz ",e.jsx(n,{children:"\\corange{h}^{q+1}"}),` neben der
`,e.jsx(n,{children:"(q+1)"}),"-ten Ableitung, für kubische Stücke also ",e.jsx(n,{children:"\\corange{h}^4"})," neben ",e.jsx(n,{children:"f^{(4)}"}),`. Der Grad
bleibt dabei fest, verfeinert wird nur das Gitter; die Probleme der
Polynominterpolation hohen Grades (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`) treten deshalb
nicht auf.`]}),`
`,e.jsxs(H,{title:"Beweis für Geradenstücke und das allgemeine Muster",children:[e.jsx(i.p,{children:`Der Beweis arbeitet auf einem einzelnen Teilintervall, konstruiert eine
Hilfsfunktion mit drei Nullstellen und wendet zweimal den Satz von
Rolle an. Die Bemerkung danach beschreibt das allgemeine Muster.`}),e.jsxs(me,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:["An den Knoten selbst ist die Differenz null, dort ist nichts zu zeigen; jede Stelle aus ",e.jsx(n,{children:"[a, b]"})," liegt in einem solchen Teilintervall"]}),children:e.jsxs(i.p,{children:[`Wir arbeiten auf einem einzelnen Teilintervall
`,e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"})," der Länge ",e.jsx(n,{children:"h_i"})," und halten darin eine Stelle ",e.jsx(n,{children:"\\wt{x}"}),` mit
`,e.jsx(n,{children:"\\corange{x_{i-1}} < \\wt{x} < \\corange{x_i}"})," fest. Dort ist ",e.jsx(n,{children:"\\cgreen{p}"}),` die
Gerade durch die beiden Endpunkte.`]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Wegen ",e.jsx(n,{children:"\\corange{x_{i-1}} < \\wt{x} < \\corange{x_i}"})," ist ",e.jsx(n,{children:"w(\\wt{x}) \\neq 0"}),", also ist ",e.jsx(n,{children:"\\lambda = (f(\\wt{x}) - \\cgreen{p(\\wt{x})})/w(\\wt{x})"})," die einzige mögliche Wahl"]}),children:[e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"w(t) := (t - \\corange{x_{i-1}})(t - \\corange{x_i})"}),` und wählen
`,e.jsx(n,{children:"\\lambda \\in \\R"})," so, dass die Hilfsfunktion"]}),e.jsx(_,{children:"g(t) := f(t) - \\cgreen{p(t)} - \\lambda\\, w(t)"}),e.jsxs(i.p,{children:["auch in ",e.jsx(n,{children:"\\wt{x}"})," verschwindet."]})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Satz von Rolle, der Spezialfall des ",e.jsx(c,{id:"mean-value-theorem",children:"Mittelwertsatzes"})," mit gleichen Funktionswerten an beiden Enden; ",e.jsx(n,{children:"g"})," ist zweimal stetig differenzierbar, weil ",e.jsx(n,{children:"f"})," es ist und ",e.jsx(n,{children:"\\cgreen{p}"}),", ",e.jsx(n,{children:"w"})," Polynome sind"]}),children:e.jsxs(i.p,{children:["Damit hat ",e.jsx(n,{children:"g"})," drei Nullstellen in ",e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"}),`: die
beiden Knoten und `,e.jsx(n,{children:"\\wt{x}"}),`. Zwischen je zwei benachbarten Nullstellen liegt eine
Nullstelle von `,e.jsx(n,{children:"g'"}),", also hat ",e.jsx(n,{children:"g'"}),` zwei Nullstellen, und dasselbe Argument
liefert ein `,e.jsx(n,{children:"\\xi"})," im Inneren mit ",e.jsx(n,{children:"g''(\\xi) = 0"}),"."]})}),e.jsxs(F,{children:[e.jsxs(i.p,{children:["Auf dem Teilintervall ist ",e.jsx(n,{children:"\\cgreen{p}"})," linear, also ",e.jsx(n,{children:"\\cgreen{p''} \\equiv 0"}),`, und
`,e.jsx(n,{children:"w'' \\equiv 2"}),". Aus ",e.jsx(n,{children:"g''(\\xi) = 0"})," folgt daher"]}),e.jsx(_,{children:`f''(\\xi) - 2\\lambda = 0 ,
\\qquad \\text{also} \\qquad
\\lambda = \\tfrac{1}{2} f''(\\xi) .`})]}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Der Betrag des Produkts ist ",e.jsx(n,{children:"(\\wt{x} - \\corange{x_{i-1}})(\\corange{x_i} - \\wt{x})"}),"; zwei nichtnegative Zahlen mit fester Summe ",e.jsx(n,{children:"h_i"})," haben ihr größtes Produkt, wenn beide gleich ",e.jsx(n,{children:"h_i/2"})," sind, also ist er höchstens ",e.jsx(n,{children:"h_i^2/4"})]}),children:[e.jsxs(i.p,{children:["Setzen wir das in ",e.jsx(n,{children:"g(\\wt{x}) = 0"}),` ein, so steht die punktweise Darstellung des
Fehlers da:`]}),e.jsx(_,{children:`f(\\wt{x}) - \\cgreen{p(\\wt{x})}
= \\tfrac{1}{2} f''(\\xi)\\,
(\\wt{x} - \\corange{x_{i-1}})(\\wt{x} - \\corange{x_i}) .`})]}),e.jsx(F,{children:e.jsxs(i.p,{children:[`Auf dem Teilintervall gilt somit
`,e.jsx(n,{children:"\\cred{\\left| f - p \\right|} \\le \\tfrac{h_i^2}{8} \\max \\left| f'' \\right|"}),`, wobei
das Maximum nur über dieses Teilintervall läuft. Wegen `,e.jsx(n,{children:"h_i \\le \\corange{h}"}),` und
weil das Maximum über `,e.jsx(n,{children:"[a, b]"})," mindestens so groß ist, gilt ",e.jsx(i.a,{href:"#eq-fehler-der-stueckweise-linearen",children:"(13.6.2)"}),` auf jedem
Teilintervall und damit auf ganz `,e.jsx(n,{children:"[a, b]"}),"."]})})]}),e.jsxs(k,{kind:"Bemerkung",label:"13.6.6 (Das Muster hinter dem Exponenten)",id:"env-das-muster-hinter-dem-exponenten",children:[e.jsxs(i.p,{children:["Das Hilfsprodukt ",e.jsx(n,{children:"w"}),` hat einen Faktor je Interpolationsbedingung im
Teilintervall, jeder Faktor ist von der Größenordnung `,e.jsx(n,{children:"\\corange{h}"}),`, und
genauso oft wird differenziert. Bei Geradenstücken sind es zwei Bedingungen,
zwei Ableitungen und `,e.jsx(n,{children:"\\corange{h}^2"}),", bei Stücken vom Grad ",e.jsx(n,{children:"q"}),` entsprechend
`,e.jsx(n,{children:"q+1"})," Bedingungen, ",e.jsx(n,{children:"q+1"})," Ableitungen und ",e.jsx(n,{children:"\\corange{h}^{q+1}"}),`. Der Restterm im
`,e.jsx(c,{id:"taylor-theorem",children:"Satz von Taylor"}),` hat dieselbe Bauart: Dort steht eine
höhere Ableitung an einer Zwischenstelle mal eine Potenz des Abstands, hier
`,e.jsx(n,{children:"\\tfrac{1}{2} f''(\\xi)"})," mal ein Produkt von Abständen."]}),e.jsxs(i.p,{children:[`Für Splines ist der Beweis deutlich länger, weil die Anschlussbedingungen die
Teilintervalle koppeln: Der Spline auf einem Stück hängt über das
Gleichungssystem aus `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"})," an ",e.jsx(i.em,{children:"allen"}),` Daten, und darauf beruht seine
Glattheit. Das Zählen der Ordnung bleibt dasselbe, und kein Schritt verlangt
einen wachsenden Polynomgrad.`]})]})]}),`
`,e.jsx(i.h3,{children:"Ein numerisches Beispiel"}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.6.7 (Ein Buckel auf dem Einheitsintervall)",id:"env-buckel-auf-dem-einheitsintervall",children:[e.jsx(i.p,{children:"Wir nehmen einen schmalen Buckel,"}),e.jsx(_,{children:`f(x) = \\exp\\left(-\\alpha \\left(x - \\tfrac{2}{5}\\right)^2\\right)
\\quad \\text{mit } \\alpha = 40, \\qquad x \\in [0, 1] .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"t := x - \\tfrac{2}{5}"})," ist"]}),e.jsx(_,{children:`f^{(4)}(x) = \\left(12\\alpha^2 - 48\\alpha^3 t^2 + 16\\alpha^4 t^4\\right) f(x) ,
\\qquad
M_4 := \\max_{x \\in [0, 1]} \\left| f^{(4)}(x) \\right| = 12\\alpha^2 = 19200 ,`}),e.jsxs(i.p,{children:["und das Maximum liegt in der Spitze ",e.jsx(n,{children:"t = 0"}),`. Um sie herum, auf einem
schmalen Streifen, entsteht fast der ganze Fehler; an beiden Rändern ist `,e.jsx(n,{children:"f"}),`
praktisch null.`]}),e.jsxs(i.p,{children:["Auf gleichmäßigen Gittern mit ",e.jsx(n,{children:"n + 1"})," Knoten ist ",e.jsx(n,{children:"\\corange{h} = 1/n"}),`, und
`,e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),` liefert die Schranke
`,e.jsx(n,{children:"\\tfrac{5}{384} \\corange{h}^4 M_4"}),`. Die vierte Spalte haben wir selbst
gerechnet: Wir bestimmen den eingespannten kubischen Spline über das
tridiagonale System seiner zweiten Ableitungen an den Knoten und messen
`,e.jsx(n,{children:"\\max \\cred{|f - s|}"})," auf einem feinen Raster."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Knoten ",e.jsx(n,{children:"n+1"})]}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Gitterweite ",e.jsx(n,{children:"h"})]}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Schranke ",e.jsx(n,{children:"C h^4 M_4"})]}),e.jsx(i.th,{style:{textAlign:"left"},children:"gemessener Fehler"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Faktor"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}25"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}977"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}324"})}),e.jsx(i.td,{style:{textAlign:"left"},children:"–"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0610"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0239"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"13{,}6"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"17"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0625"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}81 \\cdot 10^{-3}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}11 \\cdot 10^{-3}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"21{,}6"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"33"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}03125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}38 \\cdot 10^{-4}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5{,}16 \\cdot 10^{-5}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"21{,}4"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"65"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}015625"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}49 \\cdot 10^{-5}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}05 \\cdot 10^{-6}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"16{,}9"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"129"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0078125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9{,}31 \\cdot 10^{-7}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}87 \\cdot 10^{-7}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"16{,}3"})})]})]})]}),e.jsxs(i.p,{children:[`Auf groben Gittern ist der Fehler deutlich sichtbar: Bei fünf Knoten beträgt
er `,e.jsx(n,{children:"0{,}324"}),", rund ein Drittel der Buckelhöhe ",e.jsx(n,{children:"1"}),`. Der Spline erreicht an der
Spitze nur `,e.jsx(n,{children:"0{,}71"})," und schwingt rechts davon bis ",e.jsx(n,{children:"-0{,}056"}),` unter die
Nulllinie.`]}),e.jsxs(i.p,{children:["Der Faktor ",e.jsx(n,{children:"16"}),` stellt sich nicht sofort ein. Die Schranke fällt bei jeder
Halbierung exakt auf ein Sechzehntel, der gemessene Fehler dagegen erst um den
Faktor `,e.jsx(n,{children:"13{,}6"}),", dann um ",e.jsx(n,{children:"21{,}6"})," und ",e.jsx(n,{children:"21{,}4"}),"; ab ",e.jsx(n,{children:"65"}),` Knoten liegen die
Faktoren bei `,e.jsx(n,{children:"16{,}9"})," und ",e.jsx(n,{children:"16{,}3"}),`. Der Grund ist Punkt 3 von
`,e.jsx(i.a,{href:"#env-wie-wir-die-schranke-lesen",children:"Bemerkung 13.6.4"}),": ",e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),` ist fast nur
auf der Breite `,e.jsx(n,{children:"1/\\sqrt{\\alpha} \\approx 0{,}16"}),` um die Spitze von null
verschieden, und solange `,e.jsx(n,{children:"\\corange{h}"}),` von dieser Größenordnung ist, hängt der
Fehler stark davon ab, wie die Knoten zur Spitze liegen; die Ordnung `,e.jsx(n,{children:"4"}),` zeigt
sich erst, wenn `,e.jsx(n,{children:"\\corange{h}"})," klein gegen diese Breite ist."]})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.6.8 (Schranke und gemessener Fehler)",id:"env-schranke-und-messung-sind-zweierlei",children:e.jsxs(i.p,{children:["Die Schranke gilt für ",e.jsx(i.em,{children:"jedes"})," ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),` und jede Partition, der
gemessene Fehler gehört zu einer Funktion auf einem Gitter. Aus dem Faktor
`,e.jsx(n,{children:"16"}),` wird deshalb keine Gleichung, sondern eine Aussage über die
Größenordnung, in `,e.jsx(c,{id:"big-o-notation",children:"Landau-Notation"}),`
`,e.jsx(n,{children:"\\cred{\\left\\| f - s \\right\\|_\\infty} = O(\\corange{h}^4)"}),`. Wir sagen, der
Fehler sei `,e.jsx(i.em,{children:"von vierter Ordnung"})," in ",e.jsx(n,{children:"\\corange{h}"}),`, wie bei der
`,e.jsx(c,{id:"rate-of-convergence",children:"Konvergenzordnung"}),` iterativer Verfahren; nur läuft
hier statt eines Iterationszählers die Gitterweite gegen null.`]})}),`
`,e.jsxs(ae,{title:"Vom groben zum feinen Gitter",children:[e.jsxs(i.p,{children:["Um welchen Faktor erwarten wir beim Halbieren von ",e.jsx(n,{children:"h"}),` einen kleineren Fehler?
Das Widget rechnet den Buckel aus `,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),`
nach und beginnt schon bei drei Knoten.`]}),e.jsx(tn,{frage:"Schätzen wir den asymptotischen Faktor beim Halbieren von h.",loesung:16,toleranz:1,verdeckt:e.jsx(i.p,{children:"Die Schranke fällt bei jeder Halbierung von h exakt auf ein Sechzehntel, denn sie hängt an h⁴. Der gemessene Faktor schwankt auf den groben Gittern stark (1,36, 13,58, 21,59 und 21,44) und kommt dem asymptotischen Wert erst am rechten Ende mit 16,91 nahe."}),children:({aufgeloest:r})=>e.jsx(Ur,{zeigeFaktor:r})}),e.jsxs(i.p,{children:["Im oberen Bild bleibt der Spline mit drei Knoten bei ",e.jsx(n,{children:"0{,}67"}),`; erst ab neun
Knoten liegen Funktion und Interpolant nahezu übereinander. Im unteren Bild
verschwindet der Fehler an jedem Knoten und bildet dazwischen Bäuche, die sich
um die Spitze sammeln, wo `,e.jsx(n,{children:"\\left| f^{(4)} \\right|"})," groß ist."]})]}),`
`,e.jsx(i.h3,{children:"Was Splines stark macht"}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.6.9 (Vier Stärken auf einen Blick)",id:"env-vier-staerken-auf-einen-blick",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Effiziente Berechnung."}),` In der B-Spline-Basis führt die Interpolation auf
ein Gleichungssystem mit Bandstruktur (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`), und Bandstruktur
senkt den Aufwand (`,e.jsx(i.a,{href:"?k=05-lgs#env-struktur-ausnutzen",children:"Bemerkung 5.3.9"})," in ",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`). Die
zweiten Ableitungen des kubischen Spline-Interpolanten an den Knoten lösen
sogar ein `,e.jsx(i.em,{children:"tridiagonales"})," System, das ",e.jsx(n,{children:"O(n)"})," statt ",e.jsx(n,{children:"O(n^3)"}),` Operationen
kostet.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stabilität und Lokalität."})," ",e.jsx(c,{id:"env:erweiterte-knotenfolge-und-b-splines",children:"B-Splines"}),` haben kompakten Träger: Eine Änderung
an einem Datenpunkt wirkt nur lokal, und die Basis ist weit besser
konditioniert als die `,e.jsx(c,{id:"env:monombasis-und-vandermonde-matrix",children:"Monombasis"})," (",e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`, Kondition in
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Minimale Krümmung."})," Unter allen Interpolanten aus ",e.jsx(n,{children:"\\Ccal^2"}),` macht der
natürliche kubische Spline `,e.jsx(n,{children:"\\int_a^b \\left| f''(x) \\right|^2 dx"}),` am
kleinsten (`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Approximationsfehler ",e.jsx(n,{children:"O(h^4)"})," bei passenden Randbedingungen."]}),` Halbieren
wir `,e.jsx(n,{children:"h"}),`, so fällt die Schranke aus
`,e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"})," um den Faktor ",e.jsx(n,{children:"16"}),`, ohne dass
wir den Polynomgrad anrühren. Für einen natürlichen Spline ohne passende
Randkrümmung gilt diese globale Ordnung im Allgemeinen nicht
(`,e.jsx(i.a,{href:"#env-welcher-spline-die-konstante-traegt",children:"Bemerkung 13.6.3"}),")."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Alle vier Punkte gelten für ",e.jsx(i.em,{children:"Interpolation"}),`, also für Daten ohne Rauschen.
Tragen die `,e.jsx(n,{children:"y_i"}),` eine Zufallskomponente, wollen wir sie nicht mehr exakt
treffen, und aus dem `,e.jsx(c,{id:"env:interpolationsproblem",children:"Interpolationsproblem"})," wird ein ",e.jsx(c,{id:"env:glaettungsproblem",children:"Glättungsproblem"}),`
(`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Halbieren wir die Gitterweite, so fällt die Schranke aus ",e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` auf ein
Sechzehntel.`]}),e.jsxs(i.p,{children:["Die Schranke ist ",e.jsx(n,{children:"C \\corange{h}^4 M_4"}),", und nur ",e.jsx(n,{children:"\\corange{h}"}),` ändert sich. Aus
`,e.jsx(n,{children:"(\\corange{h}/2)^4 = \\corange{h}^4/16"}),` folgt der Faktor
`,e.jsx(n,{children:"\\tfrac{1}{16}"})," exakt. In ",e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"})," sind das die Werte ",e.jsx(n,{children:"0{,}977"}),`,
`,e.jsx(n,{children:"0{,}0610"}),", ",e.jsx(n,{children:"3{,}81 \\cdot 10^{-3}"}),", ",e.jsx(n,{children:"2{,}38 \\cdot 10^{-4}"})," und so fort."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Auch der tatsächliche Fehler wird bei jeder Halbierung von ",e.jsx(n,{children:"\\corange{h}"}),` genau
`,e.jsx(n,{children:"16"}),"-mal kleiner."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),` ist eine obere Schranke, keine
Gleichung. Am Buckel aus `,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),` messen wir
die Faktoren `,e.jsx(n,{children:"13{,}6"}),", ",e.jsx(n,{children:"21{,}6"}),", ",e.jsx(n,{children:"21{,}4"}),", ",e.jsx(n,{children:"16{,}9"})," und ",e.jsx(n,{children:"16{,}3"}),`; erst wenn das
Gitter die Spitze auflöst, nähern sie sich `,e.jsx(n,{children:"16"}),`, ohne die Zahl genau zu
treffen. Als Aussage über die Größenordnung bleibt die Faustregel „Fehler wird
`,e.jsx(n,{children:"2^4 = 16"}),'-mal kleiner" richtig.']})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"f(x) = x^3"})," die Bedingung ",e.jsx(n,{children:"f^{(4)} \\equiv 0"}),` erfüllt, interpoliert der
natürliche kubische Spline diese Funktion fehlerfrei.`]}),e.jsxs(i.p,{children:["Fehlerfrei ist der Spline aus ",e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),", und das ist hier ",e.jsx(n,{children:"f"}),` selbst: Ein
kubisches Polynom `,e.jsx(i.em,{children:"ist"})," ein kubischer Spline. Der ",e.jsx(i.em,{children:"natürliche"}),` Spline erzwingt
zusätzlich `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),", während ",e.jsx(n,{children:"f''(1) = 6"}),` ist.
Auf vier gleich langen Teilintervallen von `,e.jsx(n,{children:"[0, 1]"}),` weicht er um
`,e.jsx(n,{children:"0{,}018"}),` ab, obwohl die rechte Seite von
`,e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),` null ist
(`,e.jsx(i.a,{href:"#env-welcher-spline-die-konstante-traegt",children:"Bemerkung 13.6.3"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`Ein einziges breites Teilintervall verdirbt die Schranke, auch wenn alle
übrigen Knoten dicht liegen.`}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\corange{h}"})," ist das Maximum der Teilintervall-Längen (",e.jsx(c,{id:"env:partition-und-gitterweite",href:"#env-partition-und-gitterweite",children:"Definition 13.6.1"}),`),
und die Schranke wächst mit seiner vierten Potenz. Die Rechnung zu
`,e.jsx(n,{children:"\\sin(2\\pi x)"}),` zeigt es am gemessenen Fehler: Zehn Knoten mit einer Lücke
der Breite `,e.jsx(n,{children:"0{,}5"})," liefern ",e.jsx(n,{children:"0{,}479"}),`, neun gleichmäßig verteilte Knoten dagegen
`,e.jsx(n,{children:"0{,}00107"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"})," gibt eine Fehlerschranke für jede stetige Funktion ",e.jsx(n,{children:"f"}),` auf
`,e.jsx(n,{children:"[a, b]"}),"."]}),e.jsxs(i.p,{children:["Der Satz verlangt ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`, denn auf der rechten Seite steht
`,e.jsx(n,{children:"\\max \\left| f^{(4)} \\right|"}),". Dass sich ",e.jsx(i.em,{children:"stetige"}),` Funktionen durch Splines
beliebig genau approximieren lassen, ist eine andere Aussage
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`); sie nennt keine
Geschwindigkeit. Bei weniger Glattheit ergibt sich eine schwächere
Ordnung: `,e.jsx(c,{id:"env:fehler-der-stueckweise-linearen",href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," verlangt nur ",e.jsx(n,{children:"f \\in \\Ccal^2"}),` und liefert dafür auch nur
`,e.jsx(n,{children:"O(\\corange{h}^2)"}),"."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:[`Bei stückweise linearer Interpolation bringt eine Halbierung der Gitterweite
nur den Faktor `,e.jsx(n,{children:"4"}),"."]}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:fehler-der-stueckweise-linearen",href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," gibt die Schranke ",e.jsx(n,{children:"\\corange{h}^2/8 \\cdot \\max \\left| f'' \\right|"}),`,
und `,e.jsx(n,{children:"\\corange{h}^2"})," viertelt sich beim Halbieren. Für ",e.jsx(n,{children:"\\sin(2\\pi x)"}),` messen wir
die Fehler `,e.jsx(n,{children:"0{,}211"}),", ",e.jsx(n,{children:"0{,}0704"}),", ",e.jsx(n,{children:"0{,}0188"})," und ",e.jsx(n,{children:"0{,}00479"}),` bei
`,e.jsx(n,{children:"n = 4, 8, 16, 32"}),", also die Faktoren ",e.jsx(n,{children:"2{,}99"}),", ",e.jsx(n,{children:"3{,}73"})," und ",e.jsx(n,{children:"3{,}93"}),`. Der
kubische Spline gewinnt pro Verfeinerung deutlich mehr; das ist ein Grund,
warum kubisch die übliche Wahl ist.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath entwickelt die stückweise Polynominterpolation und die
kubischen Splines in Kapitel 7. Die scharfe Konstante `,e.jsx(n,{children:"5/384"}),` für den
eingespannten kubischen Spline geht auf C. A. Hall und W. W. Meyer, Optimal
error bounds for cubic spline interpolation, Journal of Approximation Theory 16
(1976), 105–122, zurück.`]})})]})}function Jr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(fs,{...s})}):fs(s)}const{blau:Qr,gruen:ps,orange:Mn,rot:Xr,violett:ks,grau:Te,hellgrau:Yr}=ee,we=50,et=.3,Pe=2*Math.PI,nt=15032026,kn=3,it=4,st=40,Le=2.6,Ii=s=>Math.sin(s)+.5*Math.sin(2*s);function rt(){const s=Si(nt),i=[];for(let a=0;a<we;a++)i.push(s()*Pe);i.sort((a,d)=>a-d);const r=[];for(;r.length<we;){const a=Math.max(s(),1e-12),d=s(),h=et*Math.sqrt(-2*Math.log(a));r.push(h*Math.cos(2*Math.PI*d)),r.length<we&&r.push(h*Math.sin(2*Math.PI*d))}const l=r.reduce((a,d)=>a+d,0)/we,t=Math.sqrt(r.reduce((a,d)=>a+(d-l)*(d-l),0)/(we-1));return{xs:i,ys:i.map((a,d)=>Ii(a)+r[d]),sdEps:t}}const Es=rt();function tt(s,i){const r=(s.length-1)*i,l=Math.floor(r),t=Math.min(l+1,s.length-1);return s[l]+(r-l)*(s[t]-s[l])}function lt(s,i){const r=s-kn,l=[];for(let t=0;t<=kn;t++)l.push(0);for(let t=1;t<=r-1;t++)l.push(tt(i,t/r));for(let t=0;t<=kn;t++)l.push(Pe);return l}function ni(s,i,r){const l=s.length-1,t=s[0],a=s[l],d=Math.min(Math.max(r,t),a);let h=new Array(l).fill(0);for(let x=0;x<l;x++)s[x]<=d&&d<s[x+1]&&(h[x]=1);if(d>=a){for(let x=l-1;x>=0;x--)if(s[x]<s[x+1]){h[x]=1;break}}for(let x=1;x<=kn;x++){const m=new Array(l-x).fill(0);for(let b=0;b<l-x;b++){let f=0;const g=s[b+x]-s[b];g>0&&(f+=(d-s[b])/g*h[b]);const p=s[b+x+1]-s[b+1];p>0&&(f+=(s[b+x+1]-d)/p*h[b+1]),m[b]=f}h=m}return h.slice(0,i)}function dt(s){const{xs:i,ys:r}=Es,l=lt(s,i),t=Array.from({length:s},()=>new Array(s).fill(0)),a=new Array(s).fill(0);for(let o=0;o<we;o++){const j=ni(l,s,i[o]);for(let v=0;v<s;v++)if(j[v]!==0){a[v]+=j[v]*r[o];for(let B=v;B<s;B++)t[v][B]+=j[v]*j[B]}}for(let o=0;o<s;o++)for(let j=0;j<o;j++)t[o][j]=t[j][o];const d=Array.from({length:s},()=>new Array(s).fill(0));for(let o=0;o<s;o++){let j=t[o][o];for(let v=0;v<o;v++)j-=d[o][v]*d[o][v];if(!(j>1e-12))return{K:s,t:l,a:null,rss:Number.NaN,sigmaHut:Number.NaN,rms:Number.NaN,maxAbw:Number.NaN,argMax:Number.NaN,minWert:Number.NaN,maxWert:Number.NaN};d[o][o]=Math.sqrt(j);for(let v=o+1;v<s;v++){let B=t[v][o];for(let D=0;D<o;D++)B-=d[v][D]*d[o][D];d[v][o]=B/d[o][o]}}const h=new Array(s).fill(0);for(let o=0;o<s;o++){let j=a[o];for(let v=0;v<o;v++)j-=d[o][v]*h[v];h[o]=j/d[o][o]}const x=new Array(s).fill(0);for(let o=s-1;o>=0;o--){let j=h[o];for(let v=o+1;v<s;v++)j-=d[v][o]*x[v];x[o]=j/d[o][o]}const m=o=>ni(l,s,o).reduce((j,v,B)=>j+v*x[B],0);let b=0;for(let o=0;o<we;o++){const j=r[o]-m(i[o]);b+=j*j}const f=2e3;let g=0,p=0,y=0,S=1/0,z=-1/0;for(let o=0;o<=f;o++){const j=o/f*Pe,v=m(j),B=v-Ii(j);Math.abs(B)>p&&(p=Math.abs(B),y=j);const D=o===0||o===f?1:o%2===1?4:2;g+=D*B*B,S=Math.min(S,v),z=Math.max(z,v)}return g*=Pe/f/3/Pe,{K:s,t:l,a:x,rss:b,sigmaHut:we>s?Math.sqrt(b/(we-s)):Number.NaN,rms:Math.sqrt(g),maxAbw:p,argMax:y,minWert:S,maxWert:z}}function O(s,i=3){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}const Ne=470,Ce=250,ws=110,V={l:40,r:12,t:12,b:26};function at(){const[s,i]=P.useState(10),r=P.useMemo(()=>dt(s),[s]),{xs:l,ys:t,sdEps:a}=Es,d=z=>V.l+z/Pe*(Ne-V.l-V.r),h=z=>V.t+(Le-z)/(2*Le)*(Ce-V.t-V.b),x=z=>4+(1.08-z)*(ws-4-18)/1.16,m=P.useMemo(()=>{if(!r.a)return null;const z=r.a;return o=>ni(r.t,r.K,o).reduce((j,v,B)=>j+v*z[B],0)},[r]),b=P.useMemo(()=>{if(!m)return"";let z="",o=!1;for(let j=0;j<=2e3;j++){const v=j/2e3*Pe,B=m(v);if(!Number.isFinite(B)||B>Le||B<-Le){o=!1;continue}z+=`${o?"L":"M"}${d(v).toFixed(1)} ${h(B).toFixed(1)}`,o=!0}return z},[m]),f=P.useMemo(()=>{let z="";for(let o=0;o<=600;o++){const j=o/600*Pe;z+=`${o===0?"M":"L"}${d(j).toFixed(1)} ${h(Ii(j)).toFixed(1)}`}return z},[]),g=r.t.slice(kn+1,r.t.length-kn-1),p=!!r.a&&(r.maxWert>Le||r.minWert<-Le);let y,S;if(!r.a)y="singulaer",S=`Bei K = ${s} ist BᵀB nicht mehr positiv definit: Die Basis ist auf diesen 50 Datenpunkten linear abhängig, die Normalengleichungen haben also keine eindeutige Lösung. Schieben wir den Regler zurück.`;else if(s<=5){y="starr";const z=s===4?"ist genau der Raum der kubischen Polynome, innere Knoten gibt es keine":`lässt mit ${g.length} innerem Knoten kaum mehr zu`;S=`K = ${s} ${z}. Die Kurve ist zu starr für f und verfehlt die Extrema systematisch: im quadratischen Mittel um ${O(r.rms)}, an der schlimmsten Stelle x = ${O(r.argMax,2)} um ${O(r.maxAbw,2)}. Auch die Residuen sind entsprechend groß, RSS = ${O(r.rss,2)} und damit σ̂ = ${O(r.sigmaHut)} statt der wahren 0,3. Was hier übrig bleibt, ist kein Rauschen, sondern nicht erklärte Struktur.`}else p?(y="fenster",S=`K = ${s} bei n = 50 Datenpunkten: Der Fit hat nur noch ${we-s} Freiheitsgrade übrig. Die Residuenquadratsumme ist mit ${O(r.rss,2)} klein, die geschätzte Kurve läuft aber bis ${O(r.maxWert,1)} nach oben und ${O(r.minWert,1)} nach unten und verlässt damit das Bild; wo sie draußen ist, bricht der grüne Zug ab. Vom wahren f ist sie im quadratischen Mittel ${O(r.rms)} entfernt, an der schlimmsten Stelle x = ${O(r.argMax,2)} um ${O(r.maxAbw,2)}. Das ist Überanpassung in Reinform: Die Kurve jagt einzelne Punkte, und zwischen zwei eng benachbarten x-Werten mit verschiedenem Rauschen muss sie steil werden.`):r.rms>.18?(y="ausschlag",S=`K = ${s}: Zwischen den Datenpunkten schlägt die Kurve aus. Die Residuenquadratsumme ist auf ${O(r.rss,2)} gefallen, der Abstand zum wahren f dagegen auf ${O(r.rms)} gestiegen (größte Abweichung ${O(r.maxAbw,2)} bei x = ${O(r.argMax,2)}). Die Anpassung an die Daten wird also besser, die Schätzung von f schlechter. Nur den ersten der beiden Werte könnten wir an echten Daten überhaupt ausrechnen.`):(y="passend",S=`K = ${s} mit ${g.length} inneren Knoten: Die Kurve folgt f, ohne den einzelnen Punkten nachzulaufen. Der Abstand zum wahren f beträgt im quadratischen Mittel ${O(r.rms)}. Aus der Residuenquadratsumme ${O(r.rss,2)} auf ${we-s} Freiheitsgraden schätzen wir σ̂ = ${O(r.sigmaHut)}; die tatsächliche Streuung der gezogenen Fehler liegt bei ${O(a)}, das wahre σ bei 0,3. Der Fit erklärt also gerade so viel, wie sich erklären lässt.`);return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{children:"Fahren wir den Regler ab und vergleichen die drei Sprungmarken K = 4, K = 11 und K = 40."}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"text-sm",style:{color:Te},children:"Sprungmarken:"}),[4,11,40].map(z=>e.jsx("button",{type:"button",className:s===z?Zs:Os,onClick:()=>i(z),"aria-pressed":s===z,children:z},z))]}),e.jsx(ne,{label:"Basisfunktionen K",min:it,max:st,step:1,value:s,onChange:i,fmt:z=>`${z} (${z-4} innere Knoten)`,accent:Mn}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{children:[e.jsxs("svg",{width:Ne,viewBox:`0 0 ${Ne} ${Ce}`,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:V.l,y:V.t,width:Ne-V.l-V.r,height:Ce-V.t-V.b,fill:"none",stroke:Yr,strokeWidth:.8}),[0,1,2,3,4,5,6].map(z=>e.jsxs("g",{children:[e.jsx("line",{x1:d(z),x2:d(z),y1:Ce-V.b,y2:Ce-V.b+3,stroke:Te}),e.jsx("text",{x:d(z),y:Ce-V.b+14,textAnchor:"middle",fontSize:9,fill:Te,children:z})]},`x${z}`)),[-2,-1,0,1,2].map(z=>e.jsxs("g",{children:[e.jsx("line",{x1:V.l-3,x2:V.l,y1:h(z),y2:h(z),stroke:Te}),e.jsx("text",{x:V.l-5,y:h(z)+3,textAnchor:"end",fontSize:9,fill:Te,children:String(z).replace("-","−")})]},`y${z}`)),e.jsx("line",{x1:V.l,x2:Ne-V.r,y1:h(0),y2:h(0),stroke:Te,strokeWidth:1}),e.jsx("text",{x:Ne-V.r-4,y:h(0)-5,textAnchor:"end",fontSize:10,fill:Te,children:"x"}),m&&l.map((z,o)=>{const j=m(z);if(!Number.isFinite(j))return null;const v=Math.min(Math.max(j,-Le),Le);return e.jsx("line",{x1:d(z),x2:d(z),y1:h(t[o]),y2:h(v),stroke:Xr,strokeWidth:1},`r${o}`)}),e.jsx("path",{d:f,fill:"none",stroke:ks,strokeWidth:2,strokeDasharray:"6 3"}),e.jsx("path",{d:b,fill:"none",stroke:ps,strokeWidth:2.2}),l.map((z,o)=>e.jsx("circle",{cx:d(z),cy:h(t[o]),r:2.6,fill:Qr},`d${o}`)),g.map((z,o)=>e.jsx("line",{x1:d(z),x2:d(z),y1:Ce-V.b,y2:Ce-V.b-7,stroke:Mn,strokeWidth:1.6},`k${o}`)),e.jsx("text",{x:V.l+4,y:V.t+11,fontSize:10,fill:ks,children:"f"}),e.jsx("text",{x:V.l+14,y:V.t+11,fontSize:10,fill:ps,children:"f̂"})]}),e.jsxs("svg",{width:Ne,viewBox:`0 0 ${Ne} ${ws}`,className:"mt-2 max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("line",{x1:V.l,x2:Ne-V.r,y1:x(0),y2:x(0),stroke:Te,strokeWidth:1}),Array.from({length:s},(z,o)=>{let j="";for(let v=0;v<=300;v++){const B=v/300*Pe,D=ni(r.t,s,B)[o];j+=`${v===0?"M":"L"}${d(B).toFixed(1)} ${x(D).toFixed(1)}`}return e.jsx("path",{d:j,fill:"none",stroke:Mn,strokeWidth:1.1,opacity:.85},`b${o}`)}),g.map((z,o)=>e.jsx("line",{x1:d(z),x2:d(z),y1:x(0),y2:x(0)+6,stroke:Mn,strokeWidth:1.6},`bk${o}`))]}),e.jsxs("p",{className:"mt-1 text-xs",style:{color:Mn},children:["die ",s," Basisfunktionen und ihre inneren Knoten"]})]}),e.jsxs("div",{className:"min-w-0 grow space-y-2",children:[e.jsx("div",{className:"overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsx("table",{className:"w-full text-right font-mono text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"Basisfunktionen K"}),e.jsx("td",{className:"px-2 py-1",children:s})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"innere Knoten"}),e.jsx("td",{className:"px-2 py-1",children:g.length})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"Freiheitsgrade n − K"}),e.jsx("td",{className:"px-2 py-1",children:we-s})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"RSS"}),e.jsx("td",{className:"px-2 py-1",children:O(r.rss,3)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"σ̂ = √(RSS/(n−K))"}),e.jsx("td",{className:"px-2 py-1",children:O(r.sigmaHut)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"‖f̂ − f‖ im Mittel"}),e.jsx("td",{className:"px-2 py-1",children:O(r.rms,4)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"max |f̂ − f|"}),e.jsx("td",{className:"px-2 py-1",children:O(r.maxAbw,3)})]})]})})}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Die beiden unteren Zeilen sind an echten Daten nicht ausrechenbar: Sie brauchen f, und f ist gerade das Unbekannte. Ausrechenbar ist allein die RSS, und die zeigt in die falsche Richtung, sobald K groß wird. Der größte Abstand sitzt bei kleinem K meist an einem der beiden Ränder, wo die Schätzung die wenigsten Daten hinter sich hat: Der erste Datenpunkt liegt bei x = 0,05, der letzte bei x = 6,26."})]})]}),e.jsxs(he,{kind:y==="passend"?"ok":y==="singulaer"?"fail":"warn",children:[S," Damit wird der Zielkonflikt aus ",xe("sec:funktionsapproximation/glaettung")," sichtbar."]})]})}function vs(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Bisher waren die Daten exakt: Ein Interpolant läuft durch jeden Punkt, und
`,e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` sagt, wie weit er dazwischen
danebenliegen kann. Messwerte sind aber selten exakt (ein Sensor rauscht, eine
Stichprobe streut), und ein Interpolant liefe durch jeden Messfehler. Wir
verlangen deshalb nur noch, dass die Kurve die Daten ungefähr trifft; das ist
die Glättung aus `,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),"."]}),`
`,e.jsx(i.h3,{children:"Das Modell"}),`
`,e.jsxs(k,{kind:"Definition",label:"13.7.1 (Regressionsmodell mit additivem Fehler)",id:"env-regressionsmodell-mit-additivem-fehler",children:[e.jsxs(i.p,{children:["An Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n \\in [a, b]"})," beobachten wir"]}),e.jsx(L,{tag:"13.7.1",id:"eq-regressionsmodell-mit-additivem-fehler",children:"\\cblue{y_i} = f(x_i) + \\cred{\\eps_i}, \\qquad i = 1, \\dots, n,"}),e.jsxs(i.p,{children:["mit einer unbekannten Funktion ",e.jsx(n,{children:"f"}),` und Zufallsfehlern
`,e.jsx(n,{children:"\\cred{\\eps_1}, \\dots, \\cred{\\eps_n}"}),", die"]}),e.jsx(_,{children:"\\E\\left[\\cred{\\eps_i} \\mid x_i\\right] = 0"}),e.jsxs(i.p,{children:["erfüllen. Gesucht ist eine Schätzung ",e.jsx(n,{children:"\\cgreen{\\wh f}"})," von ",e.jsx(n,{children:"f"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Der Unterschied zur Interpolation steckt allein im roten Term. Ohne ihn wären
die `,e.jsx(n,{children:"\\cblue{y_i}"}),` Funktionswerte, und wir wären wieder in
`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.7.2 (Was in der Fehlerannahme steckt)",id:"env-was-in-der-fehlerannahme-steckt",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Die Beobachtungen streuen an jeder Stelle ",e.jsx(i.em,{children:"um"})," ",e.jsx(n,{children:"f(x_i)"}),` herum, nicht
systematisch daneben: `,e.jsx(n,{children:"f(x)"}),` ist der bedingte
`,e.jsx(c,{id:"expected-value",children:"Erwartungswert"})," ",e.jsx(n,{children:"\\E[\\cblue{y} \\mid x]"}),`, und
`,e.jsx(n,{children:"\\cred{\\eps_i}"})," ist reine Streuung. Ohne diese Forderung wäre ",e.jsx(n,{children:"f"}),` nicht
einmal bestimmt, denn `,e.jsx(n,{children:"(g + c,\\ \\cred{\\eps} - c)"}),` liefert für jede Konstante
`,e.jsx(n,{children:"c"})," dieselben Beobachtungen wie ",e.jsx(n,{children:"(g, \\cred{\\eps})"}),"."]}),`
`,e.jsxs(i.li,{children:["Über Abhängigkeit und Streuung der ",e.jsx(n,{children:"\\cred{\\eps_i}"}),` sagt die Annahme nichts,
und die KQ-Herleitung dieses Abschnitts braucht beides nicht.
Unkorreliertheit und die gemeinsame Varianz `,e.jsx(n,{children:"\\sigma^2"}),` kommen erst in
`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," ins Spiel."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Wie messen wir, ob ein Kandidat ",e.jsx(n,{children:"\\cgreen{\\wh f}"}),` zu den Daten passt? Mit
derselben Größe wie in `,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),", der Summe der quadrierten Abweichungen:"]}),`
`,e.jsx(L,{tag:"13.7.2",id:"eq-eq-13-7-2",children:`\\operatorname{RSS}(\\cgreen{\\wh f})
:= \\sum_{i=1}^{n} \\left( \\cblue{y_i} - \\cgreen{\\wh f(x_i)} \\right)^2 .`}),`
`,e.jsxs(i.p,{children:["Die Abkürzung steht für ",e.jsx(i.em,{children:"residual sum of squares"}),`, die Residuenquadratsumme. Die
einzelnen Differenzen `,e.jsx(n,{children:"\\cred{r_i} = \\cblue{y_i} - \\cgreen{\\wh f(x_i)}"}),` heißen
`,e.jsx(i.em,{children:"Residuen"}),"."]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.7.3 (Die Aufgabe ist so noch entartet)",id:"env-die-aufgabe-ist-so-noch-entartet",children:[e.jsxs(i.p,{children:["Über ",e.jsx(i.em,{children:"alle"})," Funktionen ist das Minimum von ",e.jsx(i.a,{href:"#eq-eq-13-7-2",children:"(13.7.2)"}),` null, und
angenommen wird es von jedem der unendlich vielen Interpolanten der Daten
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`). Alle übernehmen an den Datenstellen jedes
`,e.jsx(n,{children:"\\cred{\\eps_i}"}),`, und die RSS kann zwischen einem brauchbaren und einem beliebig
schlechten Verlauf zwischen den Punkten nicht unterscheiden. Die Zielfunktion
allein legt also nichts fest; es gibt zwei Auswege:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Wir minimieren nur über einen ",e.jsx(i.em,{children:"kleinen"}),` Funktionenraum; das ist der Weg der
nächsten Seiten.`]}),`
`,e.jsx(i.li,{children:`Wir minimieren über einen großen Raum und bestrafen unruhige Kandidaten;
darauf kommen wir am Ende des Abschnitts zurück.`}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Der Basisansatz macht daraus ein KQ-Problem"}),`
`,e.jsxs(i.p,{children:[`Den ersten Weg kennen wir schon aus der Interpolation
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`): Wir legen endlich
viele Funktionen fest und lassen nur deren Linearkombinationen zu.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.7.4 (Ansatzraum und Designmatrix)",id:"env-ansatzraum-und-designmatrix",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),` fest gewählte Funktionen auf
`,e.jsx(n,{children:"[a, b]"}),", die ",e.jsx(i.em,{children:"Basisfunktionen"}),", und sei"]}),e.jsx(_,{children:`\\Fcal_K := \\left\\{ \\textstyle\\sum_{k=1}^{K} a_k \\corange{\\phi_k}
\\;:\\; a_1, \\dots, a_K \\in \\R \\right\\}`}),e.jsxs(i.p,{children:["der von ihnen aufgespannte ",e.jsx(c,{id:"env:ansatzraum-basisdarstellung",children:"Ansatzraum"}),". Die ",e.jsx(i.em,{children:"Designmatrix"}),` zu den Stellen
`,e.jsx(n,{children:"x_1, \\dots, x_n"})," ist"]}),e.jsx(_,{children:`\\bB := \\begin{pmatrix}
\\corange{\\phi_1(x_1)} & \\cdots & \\corange{\\phi_K(x_1)} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\corange{\\phi_1(x_n)} & \\cdots & \\corange{\\phi_K(x_n)}
\\end{pmatrix} \\in \\R^{n \\times K},
\\qquad b_{ik} = \\corange{\\phi_k(x_i)} .`}),e.jsxs(i.p,{children:["Das ist die Matrix aus ",e.jsx(c,{id:"env:das-interpolationsproblem-ist-ein",href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Für Splines sind die ",e.jsx(n,{children:"\\corange{\\phi_k}"})," die ",e.jsx(c,{id:"env:erweiterte-knotenfolge-und-b-splines",children:"B-Splines"}),` zu einem gewählten
Knotenvektor `,e.jsx(n,{children:"\\corange{\\xi_1 < \\dots < \\xi_{m-1}}"}),`
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`). Wir halten die beiden
Rollen auseinander: `,e.jsx(n,{children:"x_i"})," sind die Stellen, an denen ",e.jsx(i.em,{children:"gemessen"}),` wurde,
`,e.jsx(n,{children:"\\corange{\\xi_j}"})," die Stellen, an denen die Polynomstücke ",e.jsx(i.em,{children:"zusammengesetzt"}),`
werden. Beide dürfen verschieden liegen, und bei der Glättung tun sie das
auch.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.7.5 (Glättung ist ein lineares Kleinste-Quadrate-Problem)",id:"env-glaettung-ist-ein-lineares-kleinste",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\wh f} = \\sum_{k=1}^{K} a_k \\corange{\\phi_k} \\in \\Fcal_K"}),` mit
Koeffizientenvektor `,e.jsx(n,{children:"\\ba = (a_1, \\dots, a_K)^\\top"}),". Dann gilt"]}),e.jsx(L,{tag:"13.7.3",id:"eq-glaettung-ist-ein-lineares-kleinste",children:`\\sum_{i=1}^{n} \\left( \\cblue{y_i} - \\cgreen{\\wh f(x_i)} \\right)^2
= \\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2^2 ,
\\qquad \\cblue{\\by} = (\\cblue{y_1}, \\dots, \\cblue{y_n})^\\top ,`}),e.jsxs(i.p,{children:["und ",e.jsx(n,{children:"\\ba"}),` minimiert die linke Seite genau dann, wenn es die
`,e.jsx(c,{id:"normal-equations",children:"Normalengleichungen"})]}),e.jsx(L,{tag:"13.7.4",id:"eq-glaettung-ist-ein-lineares-kleinste-2",children:"\\bB^\\top \\bB\\, \\ba = \\bB^\\top \\cblue{\\by}"}),e.jsxs(i.p,{children:["erfüllt. Hat ",e.jsx(n,{children:"\\bB"})," vollen Spaltenrang ",e.jsx(n,{children:"K"}),`, so ist die Lösung eindeutig,
`,e.jsx(n,{children:"\\wh\\ba = (\\bB^\\top\\bB)^{-1}\\bB^\\top\\cblue{\\by}"}),`. Andernfalls ist die
Lösungsmenge ein affiner Raum, und `,e.jsx(n,{children:"\\wh\\ba = \\bB\\pinv \\cblue{\\by}"}),` ist ihr
Element kleinster Norm. Der Vektor der angepassten Werte `,e.jsx(n,{children:"\\bB\\wh\\ba"}),` ist in
beiden Fällen eindeutig.`]})]}),`
`,e.jsx(H,{title:"Beweis der Kleinste-Quadrate-Darstellung",children:e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Die ",e.jsx(n,{children:"i"}),"-te Zeile von ",e.jsx(n,{children:"\\bB"})," enthält genau die Werte ",e.jsx(n,{children:"\\corange{\\phi_1(x_i)}, \\dots, \\corange{\\phi_K(x_i)}"}),", das Skalarprodukt mit ",e.jsx(n,{children:"\\ba"})," ist die Auswertung"]}),children:[e.jsxs(i.p,{children:["Nach Definition der Designmatrix ist der Wert von ",e.jsx(n,{children:"\\cgreen{\\wh f}"}),` an der Stelle
`,e.jsx(n,{children:"x_i"})," gerade die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bB\\ba"}),":"]}),e.jsx(_,{children:`\\cgreen{\\wh f(x_i)} = \\sum_{k=1}^{K} a_k \\corange{\\phi_k(x_i)}
= \\sum_{k=1}^{K} b_{ik}\\, a_k = (\\bB\\ba)_i .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\|\\bv\\right\\|_2^2 = \\sum_i v_i^2"})," mit ",e.jsx(n,{children:"v_i = \\cblue{y_i} - (\\bB\\ba)_i"})]}),children:e.jsxs(i.p,{children:[`Damit ist die Summe der quadrierten Residuen die quadrierte
`,e.jsx(c,{id:"euclidean-norm",children:"euklidische Norm"}),` des Vektors
`,e.jsx(n,{children:"\\cblue{\\by} - \\bB\\ba"}),", also ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste",children:"(13.7.3)"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Die Zuordnung ",e.jsx(n,{children:"\\ba \\mapsto \\sum_k a_k \\corange{\\phi_k}"})," bildet ",e.jsx(n,{children:"\\R^K"})," auf ",e.jsx(n,{children:"\\Fcal_K"})," ab; ein Minimum der einen Aufgabe ist eines der anderen"]}),children:e.jsxs(i.p,{children:["Jedes Element von ",e.jsx(n,{children:"\\Fcal_K"}),` hat einen Koeffizientenvektor, und jeder
Koeffizientenvektor liefert ein Element von `,e.jsx(n,{children:"\\Fcal_K"}),`. Das Minimieren über
`,e.jsx(n,{children:"\\Fcal_K"})," ist deshalb dasselbe wie das Minimieren über ",e.jsx(n,{children:"\\ba \\in \\R^K"}),`, und das
ist das
`,e.jsx(c,{id:"linear-least-squares",children:"lineare Kleinste-Quadrate-Problem"}),`
`,e.jsx(n,{children:"\\min_{\\ba} \\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2"}),` aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Ausmultipliziert ist ",e.jsx(n,{children:"\\bB^\\top(\\cblue{\\by} - \\bB\\ba) = \\bnull"})," dasselbe wie ",e.jsx(n,{children:"\\bB^\\top\\bB\\ba = \\bB^\\top\\cblue{\\by}"})]}),children:e.jsxs(i.p,{children:["Die Minimierer von ",e.jsx(n,{children:"\\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2"}),` sind genau die
Lösungen der Normalengleichungen `,e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),`. Das ist die
`,e.jsx(c,{id:"projection",children:"Projektions"}),`-Eigenschaft aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),": Der Abstand wird minimal, wenn ",e.jsx(n,{children:"\\bB\\ba"}),` die
orthogonale Projektion von `,e.jsx(n,{children:"\\cblue{\\by}"})," auf den Spaltenraum von ",e.jsx(n,{children:"\\bB"}),` ist, und
das heißt, dass das Residuum auf allen Spalten senkrecht steht,
`,e.jsx(n,{children:"\\bB^\\top(\\cblue{\\by} - \\bB\\ba) = \\bnull"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\ba^\\top\\bB^\\top\\bB\\ba = \\left\\|\\bB\\ba\\right\\|_2^2 > 0"})," für ",e.jsx(n,{children:"\\ba \\neq \\bnull"})," gilt genau bei vollem Spaltenrang"]}),children:e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\rang(\\bB) = K"}),", so ist ",e.jsx(n,{children:"\\bB^\\top\\bB"}),` symmetrisch positiv definit und damit
invertierbar (`,e.jsx(i.a,{href:"?k=07-kq#sec-7.3",children:"Abschnitt 7.3"}),"), die Lösung von ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),` also
eindeutig. Ist `,e.jsx(n,{children:"\\rang(\\bB) < K"}),`, so unterscheiden sich je zwei Lösungen um ein
Element des Kerns von `,e.jsx(n,{children:"\\bB"}),`; unter ihnen wählt die
`,e.jsx(c,{id:"pseudoinverse",children:"Pseudoinverse"}),` die mit der kleinsten Norm
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),")."]})}),e.jsx(F,{children:e.jsxs(i.p,{children:["Die angepassten Werte sind die orthogonale Projektion von ",e.jsx(n,{children:"\\cblue{\\by}"}),` auf den
Spaltenraum, und eine Projektion hängt nur vom Unterraum ab, nicht von der
gewählten Darstellung. Sie ist deshalb auch bei Rangdefekt eindeutig.`]})})]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.7.6 (Wie wir das System numerisch lösen)",id:"env-wie-wir-das-system-wirklich-loesen",children:e.jsxs(i.p,{children:["Die Normalengleichungen quadrieren die ",e.jsx(c,{id:"env:definition-7-2-1",children:"Konditionszahl"}),`,
`,e.jsx(n,{children:"\\kappa_2(\\bB^\\top\\bB) = \\kappa_2(\\bB)^2"}),"; deshalb zieht ",e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),` die
`,e.jsx(c,{id:"env:qr-zerlegung",children:"QR-Zerlegung"})," vor (",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`, Vergleich der Verfahren in
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),`), und der R-Code am Ende dieses Abschnitts nutzt
`,e.jsx(i.code,{children:"qr.solve"}),`. Für B-Splines ist der Schaden klein: Für den Datensatz unseres
Widgets messen wir `,e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 5{,}6"})," bei ",e.jsx(n,{children:"K = 10"}),` und
`,e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 65"})," bei ",e.jsx(n,{children:"K = 40"}),", die ",e.jsx(c,{id:"env:monombasis-und-vandermonde-matrix",children:"Monombasis"}),` derselben Größe liegt
viele Zehnerpotenzen darüber (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`). Dazu kommt die
Bandstruktur: Jede Basisfunktion lebt nur über wenigen Teilintervallen, also
ist `,e.jsx(n,{children:"\\bB^\\top\\bB"})," dünn besetzt und die Zerlegung günstig (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.7.7 (Wann die Designmatrix vollen Spaltenrang hat)",id:"env-wann-die-designmatrix-vollen-spaltenrang",children:e.jsxs(i.p,{children:["Notwendig ist ",e.jsx(n,{children:"K \\le n"}),`, aber das reicht nicht: Die Basisfunktionen müssen
auch `,e.jsx(i.em,{children:"auf den Daten"}),` linear unabhängig sein, und dafür müssen die Knoten zu den
Messstellen passen. Nach dem Satz von Schoenberg und Whitney muss jede
Basisfunktion einen eigenen, passend geordneten Datenpunkt belegen können. Mit
Knoten auf den Quantilen der `,e.jsx(n,{children:"x_i"})," gelingt das bis ",e.jsx(n,{children:"K = n"}),`; das Widget legt
seine Knoten daher auf Quantile, wie es auch `,e.jsx(i.code,{children:"splines::bs()"})," tut."]})}),`
`,e.jsxs(H,{title:"Die Schoenberg-Whitney-Bedingung im Detail",children:[e.jsxs(i.p,{children:["Für B-Splines vom Grad ",e.jsx(n,{children:"q"})," mit erweitertem Knotenvektor ",e.jsx(n,{children:"\\corange{\\tau}"}),`
lautet die Bedingung: Es müssen sich
Indizes `,e.jsx(n,{children:"i_1 < \\dots < i_K"}),` finden, sodass die jeweils zugeordnete
Basisfunktion am eigenen Datenpunkt positiv ist,`]}),e.jsx(_,{children:"\\corange{B_k^{(q)}(x_{i_k})} > 0, \\qquad k=1,\\dots,K."}),e.jsxs(i.p,{children:[`Im Inneren des Knotengebiets ist das gleichbedeutend mit
`,e.jsx(n,{children:"\\corange{\\tau_k} < x_{i_k} < \\corange{\\tau_{k+q+1}}"}),`. Bei einem offenen,
an den Rändern geklemmten Knotenvektor gehören die positiven Randwerte der
ersten und letzten Basisfunktion ausdrücklich dazu.`]}),e.jsxs(i.p,{children:[`Die naheliegende Abschwächung „jede Basisfunktion sieht mindestens einen
Datenpunkt" genügt dafür nicht. Unsere eigene Rechnung mit den `,e.jsx(n,{children:"50"}),` Punkten des
Widgets, aber `,e.jsx(i.em,{children:"gleichmäßigen"})," Knoten auf ",e.jsx(n,{children:"[0, 2\\pi]"}),", zeigt es: Bei ",e.jsx(n,{children:"K = 35"}),` hat
jede der `,e.jsx(n,{children:"35"}),` Basisfunktionen mindestens einen Datenpunkt im Träger, und
trotzdem bricht die Cholesky-Zerlegung von `,e.jsx(n,{children:"\\bB^\\top\\bB"}),` ab, weil sieben der
`,e.jsx(n,{children:"32"})," Knotenintervalle leer bleiben und die Bedingung damit verletzt ist."]})]}),`
`,e.jsx(i.h3,{children:"Interpolation und Glättung sind derselbe Rahmen"}),`
`,e.jsxs(i.p,{children:["Der Rahmen aus ",e.jsx(c,{id:"env:glaettung-ist-ein-lineares-kleinste",href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),` deckt beide
Aufgaben ab.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.7.8 (Interpolation und Glättung im Basisansatz)",id:"env-interpolation-und-glaettung-im",children:[e.jsxs(i.p,{children:["Eine Anpassung ",e.jsx(i.em,{children:"interpoliert"}),` die Daten, wenn ihre Residuen verschwinden,
also wenn`]}),e.jsx(_,{children:`\\bB\\wh\\ba = \\cblue{\\by}
\\qquad\\text{beziehungsweise}\\qquad
\\cgreen{\\wh f(x_i)}=\\cblue{y_i}\\quad\\text{für alle }i`}),e.jsxs(i.p,{children:["gilt. Bei einer ",e.jsx(i.em,{children:"Glättung"}),` dürfen Residuen verbleiben, damit die Schätzung
nicht jede beobachtete Schwankung übernehmen muss.`]}),e.jsxs(i.p,{children:["Ohne Strafterm ist ",e.jsx(n,{children:"K=n"})," mit invertierbarem ",e.jsx(n,{children:"\\bB"}),` der Interpolationsfall
und `,e.jsx(n,{children:"K<n"}),` mit vollem Spaltenrang der Glättungsfall, denn dann lässt sich nicht
mehr jeder Datenvektor interpolieren. Die Zahlen `,e.jsx(n,{children:"K"})," und ",e.jsx(n,{children:"n"}),` allein legen die
Begriffe aber nicht fest; entscheidend sind Rang, rechte Seite und ein
möglicher Strafterm.`]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.7.9 (Warum Interpolation das Rauschen erbt)",id:"env-warum-interpolation-das-rauschen-erbt",children:[e.jsxs(i.p,{children:["Warum ist das exakte Treffen schlecht? Setzen wir ",e.jsx(i.a,{href:"#eq-regressionsmodell-mit-additivem-fehler",children:"(13.7.1)"}),` in die
Interpolationsbedingung ein:`]}),e.jsx(_,{children:`\\cgreen{\\wh f(x_i)} = \\cblue{y_i} = f(x_i) + \\cred{\\eps_i}
\\qquad\\implies\\qquad
\\cgreen{\\wh f(x_i)} - f(x_i) = \\cred{\\eps_i} .`}),e.jsxs(i.p,{children:[`An jeder Beobachtungsstelle ist der Schätzfehler exakt der Messfehler. Er wird
nicht kleiner, wenn wir mehr Daten erheben, denn jeder neue Punkt bringt seinen
eigenen Fehler mit, den der Interpolant übernimmt. Zwischen den
Punkten wird es eher schlechter: Liegen zwei Stellen dicht beieinander und ziehen
ihre Fehler in verschiedene Richtungen, muss die Kurve dazwischen steil werden.
Modelliert eine Schätzung auf diese Weise den Zufallsanteil der Daten mit,
spricht die Statistik von `,e.jsx(c,{id:"overfitting",children:"Überanpassung"}),"."]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"K < n"}),` und vollem Spaltenrang wird dagegen jeder Koeffizient aus
mehreren Beobachtungen bestimmt, und in dieser Mittelung hebt sich ein Teil der
Fehler auf. Der Nachteil: Der kleine Ansatzraum enthält `,e.jsx(n,{children:"f"}),` vielleicht nicht;
wie sich beides gegeneinander verrechnet, ist das Thema von `,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),"."]})]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.7.10 (Fünfzig verrauschte Punkte)",id:"env-fuenfzig-verrauschte-punkte",children:[e.jsxs(i.p,{children:["Wir ziehen einmal ",e.jsx(n,{children:"n = 50"})," Stellen gleichverteilt auf ",e.jsx(n,{children:"[0, 2\\pi]"}),", werten dort"]}),e.jsx(_,{children:"f(x) = \\sin(x) + \\tfrac12 \\sin(2x)"}),e.jsxs(i.p,{children:["aus und addieren normalverteilte Fehler mit ",e.jsx(n,{children:"\\sigma = 0{,}3"}),` (fester
Startwert; die gezogenen Fehler haben die empirische Streuung `,e.jsx(n,{children:"0{,}266"}),`).
Darauf passen wir kubische B-Splines mit `,e.jsx(n,{children:"K"}),` Basisfunktionen an, Knoten auf
den Quantilen der `,e.jsx(n,{children:"x_i"}),". Für vier Werte von ",e.jsx(n,{children:"K"})," rechnet unser Widget:"]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"K"})}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\operatorname{RSS}"})}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\wh\\sigma"})}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Abstand zu ",e.jsx(n,{children:"f"})]}),e.jsx(i.th,{style:{textAlign:"left"},children:"größte Abweichung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"4"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"6{,}421"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}374"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}247"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}467"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}084"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}278"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}086"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}532"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"20"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}460"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}286"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}269"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}223"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"40"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}557"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}236"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}908"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"8{,}574"})})]})]})]}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\wh\\sigma = \\sqrt{\\operatorname{RSS}/(n-K)}"}),` der übliche
Residualstandardfehler, eine Schätzung von `,e.jsx(n,{children:"\\sigma"}),"; fehlt ",e.jsx(n,{children:"f"}),` im
Ansatzraum, enthält er zusätzlich den Anpassungsfehler (lack of fit), wie bei
`,e.jsx(n,{children:"K = 4"}),". „Abstand zu ",e.jsx(n,{children:"f"}),`" ist die
Wurzel aus dem mittleren quadrierten Abstand`]}),e.jsx(_,{children:"\\frac{1}{2\\pi}\\int_0^{2\\pi} \\left( \\cgreen{\\wh f(x)} - f(x) \\right)^2 \\dx ."}),e.jsxs(i.p,{children:[`Die beiden mittleren Spalten lassen sich aus den Daten berechnen, die beiden
rechten nur mit Kenntnis von `,e.jsx(n,{children:"f"}),". Und sie laufen auseinander: Von ",e.jsx(n,{children:"K = 10"}),` auf
`,e.jsx(n,{children:"K = 40"}),` fällt die Residuenquadratsumme auf weniger als ein Fünftel, während
der Abstand zur wahren Funktion auf das Zweiundzwanzigfache steigt. Am besten
trifft in unserem Lauf `,e.jsx(n,{children:"K = 11"})," mit einem Abstand von ",e.jsx(n,{children:"0{,}072"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Tabelle zeigt drei Regime. Bei ",e.jsx(n,{children:"K = 4"}),` ist der Ansatzraum der Raum der
kubischen Polynome, und die Kurve ist zu starr für beide Wellen von `,e.jsx(n,{children:"f"}),`;
zwischen `,e.jsx(n,{children:"K = 6"})," und ",e.jsx(n,{children:"K = 15"})," liegt sie im Rauschband, mit ",e.jsx(n,{children:"\\wh\\sigma"}),` zwischen
`,e.jsx(n,{children:"0{,}278"})," und ",e.jsx(n,{children:"0{,}306"})," nahe der wahren Streuung ",e.jsx(n,{children:"0{,}3"}),". Ab ",e.jsx(n,{children:"K = 16"}),` beginnen
die Ausschläge, und der Abstand zu `,e.jsx(n,{children:"f"}),` wächst wieder, während die Residuen
weiter fallen.`]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.7.11 (Die Residuen fallen nicht immer)",id:"env-die-residuen-fallen-nicht-immer",children:e.jsxs(i.p,{children:["Für ",e.jsx(i.em,{children:"geschachtelte"})," Räume kann die Residuenquadratsumme mit wachsendem ",e.jsx(n,{children:"K"}),`
nicht steigen, denn der alte Minimierer bleibt zulässig. Knoten auf Quantilen
wandern aber mit `,e.jsx(n,{children:"K"}),`, und dann sind die Räume nicht geschachtelt. In unserem
Lauf steigt die Residuenquadratsumme bei elf der `,e.jsx(n,{children:"36"})," Schritte von ",e.jsx(n,{children:"K"}),` auf
`,e.jsx(n,{children:"K+1"})," wieder an, etwa von ",e.jsx(n,{children:"K = 6"})," auf ",e.jsx(n,{children:"K = 7"}),"."]})}),`
`,e.jsxs(ae,{title:"Ein Regler für die Flexibilität",children:[e.jsxs(i.p,{children:["Welcher der drei Werte von ",e.jsx(n,{children:"K"}),` dürfte die unbekannte wahre Funktion am
besten treffen? Das Widget rechnet den Fit für jedes `,e.jsx(n,{children:"K"})," zwischen ",e.jsx(n,{children:"4"})," und ",e.jsx(n,{children:"40"}),`
neu.`]}),e.jsx(tn,{variante:"auswahl",frage:"Welcher der drei Fälle wirkt als Schätzer am plausibelsten?",loesung:"passend",optionen:[{id:"starr",text:"K = 4"},{id:"passend",text:"K = 11"},{id:"flexibel",text:"K = 40"}],verdeckt:e.jsx(i.p,{children:"K = 4 ist zu starr, K = 40 zu flexibel. Im Reglerbereich hat K = 11 den kleinsten mittleren Abstand zum wahren f – ausrechnen ließe sich das an echten Daten allerdings nicht, weil dazu f bekannt sein müsste."}),children:e.jsx(at,{})}),e.jsxs(i.p,{children:[`Am Regler durchlaufen wir die drei Regime: Die rot gezeichneten Residuen
werden im Mittel kürzer, während die grüne Kurve immer weniger mit der violett
gezeichneten wahren Funktion zu tun hat und von `,e.jsx(n,{children:"K = 30"}),` an meist das
Bildfenster verlässt. Die untere Tafel zeigt die `,e.jsx(n,{children:"K"}),` Basisfunktionen, die mit
wachsendem `,e.jsx(n,{children:"K"})," schmaler und zahlreicher werden."]})]}),`
`,e.jsx(i.h3,{children:"Der zweite Weg: strafen statt weglassen"}),`
`,e.jsxs(i.p,{children:["Bei der Glättung über einen kleinen Ansatzraum steuert ",e.jsx(n,{children:"K"}),` die Glattheit in
groben Stufen, und Zahl und Lage der Knoten müssen vorab feststehen. Der zweite
Weg aus `,e.jsx(i.a,{href:"#env-die-aufgabe-ist-so-noch-entartet",children:"Bemerkung 13.7.3"}),` lässt viele Knoten zu und
bestraft unruhige Lösungen: Wir minimieren
`,e.jsx(n,{children:"\\sum_i (\\cblue{y_i} - g(x_i))^2 + \\lambda \\int_a^b |g''(x)|^2 \\dx"}),` entweder
über allen `,e.jsx(n,{children:"\\Ccal^2"}),"-Funktionen (",e.jsx(i.em,{children:"Glättungsspline"}),`, Knoten in allen
Datenpunkten) oder über einer großen B-Spline-Basis mit `,e.jsx(n,{children:"K < n"})," (",e.jsx(i.em,{children:`Penalized
Splines`}),`, die Grundlage der additiven Modelle). Der Strafterm ist das
`,e.jsx(c,{id:"env:kruemmungsfunktional",children:"Krümmungsfunktional"})," aus ",e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),`, und gesteuert wird mit
`,e.jsx(n,{children:"\\lambda"})," statt mit ",e.jsx(n,{children:"K"}),"."]}),`
`,e.jsxs(H,{title:"Glättungssplines und Penalized Splines im Detail",children:[e.jsxs(k,{kind:"Definition",label:"13.7.12 (Penalisiertes Kleinste-Quadrate-Kriterium)",id:"env-penalisiertes-kleinste-quadrate",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\lambda \\ge 0"})," heißt"]}),e.jsx(L,{tag:"13.7.5",id:"eq-penalisiertes-kleinste-quadrate",children:`\\sum_{i=1}^{n} \\left( \\cblue{y_i} - g(x_i) \\right)^2
\\;+\\; \\lambda \\int_a^b \\left| g''(x) \\right|^2 \\dx`}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"penalisierte"}),` Kleinste-Quadrate-Kriterium, und ein Minimierer über
`,e.jsx(n,{children:"\\Ccal^2[a, b]"})," heißt ",e.jsx(i.em,{children:"Glättungsspline"}),` (smoothing spline). Der Parameter
`,e.jsx(n,{children:"\\lambda"})," heißt ",e.jsx(i.em,{children:"Glättungsparameter"}),"."]})]}),e.jsxs(i.p,{children:["Wir schreiben ",e.jsx(n,{children:"J(g) = \\int_a^b |g''|^2 \\dx"}),` für das Krümmungsfunktional, das
in `,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"})," den natürlichen kubischen Spline ausgezeichnet hat."]}),e.jsx(k,{kind:"Bemerkung",label:"13.7.13 (Was der Strafterm bewirkt)",id:"env-was-der-strafterm-bewirkt",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Der Minimierer ist wieder ein Spline."})," Für ",e.jsx(n,{children:"\\lambda > 0"}),` und mindestens zwei
verschiedene Beobachtungsstellen ist der Minimierer von `,e.jsx(i.a,{href:"#eq-penalisiertes-kleinste-quadrate",children:"(13.7.5)"}),` über
`,e.jsx(n,{children:"\\Ccal^2[a, b]"})," ein natürlicher kubischer Spline mit Knoten in ",e.jsx(i.em,{children:"allen"}),`
verschiedenen Datenpunkten. Das ist der Satz von Schoenberg und Reinsch, den wir hier nicht
beweisen; Green und Silverman führen ihn in Kapitel 2 vor. Bei paarweise
verschiedenen `,e.jsx(n,{children:"x_i"}),` hat der daraus entstehende natürliche Spline-Raum
Dimension `,e.jsx(n,{children:"K=n"}),", und trotzdem entsteht für ",e.jsx(n,{children:"\\lambda>0"})," keine Interpolation."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Die beiden Grenzfälle sind vertraut."})," Für ",e.jsx(n,{children:"\\lambda \\to 0"}),` verschwindet die
Strafe. Bei paarweise verschiedenen Datenstellen bleiben im Grenzwert die
Interpolanten, und unter ihnen wählt der Strafterm den mit der kleinsten
Krümmung, also den natürlichen kubischen Spline aus `,e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),`. Bei
wiederholten Stellen mit verschiedenen Beobachtungen kann es dagegen keinen
Interpolanten aller Einzelwerte geben. Für `,e.jsx(n,{children:"\\lambda \\to \\infty"}),` wird jeder Kandidat mit
`,e.jsx(n,{children:"J(g) > 0"})," ausgeschlossen; übrig bleiben die Funktionen mit ",e.jsx(n,{children:"g'' \\equiv 0"}),`, also
die Geraden, und unter ihnen die
`,e.jsx(c,{id:"linear-regression",children:"Kleinste-Quadrate-Gerade"}),`. Der Glättungsparameter
bewegt die Schätzung stufenlos zwischen Interpolation und einfacher linearer
Regression.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stetige Steuerung."})," Statt einer ganzen Zahl ",e.jsx(n,{children:"K"}),` wählen wir die stetige
Größe `,e.jsx(n,{children:"\\lambda"}),`, und die Knotenwahl fällt als Frage weg. Dafür ist das
Gleichungssystem von der Größe `,e.jsx(n,{children:"n"})," statt ",e.jsx(n,{children:"K"}),"."]}),`
`]})}),e.jsxs(k,{kind:"Bemerkung",label:"13.7.14 (Penalized Splines und die Nähe zu Ridge)",id:"env-penalized-splines-und-die-naehe-zu-ridge",children:[e.jsxs(i.p,{children:[`Zwischen beiden Wegen liegt der in der Praxis übliche Kompromiss: eine
große, aber nicht datengroße Basis (`,e.jsx(n,{children:"K < n"}),") ",e.jsx(i.em,{children:"und"}),` ein Strafterm. Solche
`,e.jsx(i.em,{children:"Penalized Splines"}),` führen auf ein Kriterium, das sich vollständig in
Matrixform schreiben lässt. Mit
`,e.jsx(n,{children:"\\bP_{jk} := \\int_a^b \\corange{\\phi_j''(x)}\\,\\corange{\\phi_k''(x)} \\dx"}),` ist
`,e.jsx(n,{children:"\\int_a^b |\\cgreen{\\wh f''}|^2 \\dx = \\ba^\\top\\bP\\ba"}),", und ",e.jsx(i.a,{href:"#eq-penalisiertes-kleinste-quadrate",children:"(13.7.5)"})," wird zu"]}),e.jsx(_,{children:"\\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2^2 + \\lambda\\, \\ba^\\top \\bP \\ba ."}),e.jsxs(i.p,{children:["Ableiten nach ",e.jsx(n,{children:"\\ba"})," und Nullsetzen liefert die gestraften Normalengleichungen"]}),e.jsx(_,{children:"\\left( \\bB^\\top\\bB + \\lambda \\bP \\right) \\ba = \\bB^\\top \\cblue{\\by} ."}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bP = \\bI"}),` steht dort die Ridge-Regression aus
`,e.jsx(i.a,{href:"?k=12-optim#sec-12.5",children:"Abschnitt 12.5"}),`, und der Effekt ist derselbe: Der
Zuschlag macht das System auch dann eindeutig lösbar, wenn `,e.jsx(n,{children:"\\bB"}),` keinen vollen
Spaltenrang hat. Beim Krümmungs-Strafterm ist `,e.jsx(n,{children:"\\bP"}),` allerdings nur positiv
semidefinit, denn affine Funktionen haben Strafe null. Positiv definit wird
`,e.jsx(n,{children:"\\bB^\\top\\bB + \\lambda\\bP"}),` dann, sobald keine affine Funktion an allen
Datenstellen verschwindet, wofür zwei verschiedene `,e.jsx(n,{children:"x_i"}),` genügen. Der
Unterschied zu Ridge liegt in der Bedeutung: Dort werden `,e.jsx(i.em,{children:"große"}),` Koeffizienten
bestraft, hier `,e.jsx(i.em,{children:"unruhige"})," Funktionen."]}),e.jsxs(i.p,{children:["Wie ",e.jsx(n,{children:"\\lambda"})," gewählt wird, ist dieselbe Frage wie die nach dem richtigen ",e.jsx(n,{children:"K"}),`;
`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," kommt darauf zurück."]})]})]}),`
`,e.jsx(i.h3,{children:"Wann welche Methode?"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Situation"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Methode"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"präzise, rauschfreie Daten"}),e.jsx(i.td,{style:{textAlign:"left"},children:"Interpolation"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"verrauschte Messungen"}),e.jsx(i.td,{style:{textAlign:"left"},children:"Glättung"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"Vorhersage auf neuen Daten"}),e.jsx(i.td,{style:{textAlign:"left"},children:"Glättung"})]})]})]}),`
`,e.jsxs(i.p,{children:[`Die dritte Zeile ist die am wenigsten offensichtliche: Auf den vorliegenden
Daten hat die Interpolation die kleinste Residuenquadratsumme, nämlich null.
Bei der Vorhersage an einer `,e.jsx(i.em,{children:"neuen"})," Stelle zählt aber der Abstand zu ",e.jsx(n,{children:"f"}),`, und
der ist bei einer glatten Schätzung kleiner
(`,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"}),")."]}),`
`,e.jsx(i.h3,{children:"Beispiel: Glättung in R"}),`
`,e.jsxs(i.p,{children:["Für den Datensatz aus ",e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"}),` sieht das in R
so aus:`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`B <- splines::bs(x, df = 10, intercept = TRUE)   # n x 10 Designmatrix
a_hat <- qr.solve(B, y)                          # KQ-Loesung ueber QR

x_new <- seq(0, 2 * pi, length = 200)
B_new <- splines::bs(x_new,
                     knots = attr(B, "knots"),
                     Boundary.knots = attr(B, "Boundary.knots"),
                     intercept = TRUE)
f_hat <- B_new %*% a_hat
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"bs()"})," baut die Designmatrix ",e.jsx(n,{children:"\\bB"}),"; ",e.jsx(i.code,{children:"df = 10"})," mit ",e.jsx(i.code,{children:"intercept = TRUE"}),` fordert
`,e.jsx(n,{children:"K = 10"})," Spalten, bei Grad ",e.jsx(n,{children:"3"})," also ",e.jsx(n,{children:"10 - 3 - 1 = 6"}),` innere Knoten auf den
Quantilen der `,e.jsx(n,{children:"x_i"}),". Wir wählen nicht die Knoten, sondern ihre Anzahl."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"qr.solve(B, y)"}),` löst das überbestimmte System über die QR-Zerlegung
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`), den stabileren Weg
(`,e.jsx(i.a,{href:"#env-wie-wir-das-system-wirklich-loesen",children:"Bemerkung 13.7.6"}),")."]}),`
`,e.jsxs(i.li,{children:["Für die Vorhersage braucht ",e.jsx(i.code,{children:"B_new"})," ",e.jsx(i.em,{children:"dieselbe"}),` Basis; deshalb übernehmen wir
`,e.jsx(i.code,{children:"knots"})," und ",e.jsx(i.code,{children:"Boundary.knots"})," von ",e.jsx(i.code,{children:"B"}),", sonst gehört ",e.jsx(i.code,{children:"B_new"}),` ohne
Fehlermeldung zu einer anderen Basis als `,e.jsx(i.code,{children:"a_hat"}),`
(`,e.jsx(i.a,{href:"#env-b-splines-in-r",children:"Bemerkung 13.4.12"}),")."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Im Glättungs-Widget kann ",e.jsx(n,{children:"K=40"})," eine kleinere RSS und zugleich eine schlechtere Annäherung an die wahre Funktion liefern."]}),e.jsxs(i.p,{children:["Die RSS misst nur die Anpassung an die verrauschten Daten; bei großem ",e.jsx(n,{children:"K"}),`
folgt der Fit einzelnen Störungen. In `,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"}),`
hat `,e.jsx(n,{children:"K = 40"})," die kleinste RSS und den größten Abstand zu ",e.jsx(n,{children:"f"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Minimieren wir ",e.jsx(n,{children:"\\sum_i (\\cblue{y_i} - \\cgreen{\\wh f(x_i)})^2"}),` über alle
Funktionen `,e.jsx(n,{children:"\\cgreen{\\wh f}"}),", so erhalten wir die bestmögliche Schätzung von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Das Minimum ist null und wird von jedem Interpolanten angenommen, und davon gibt
es unendlich viele (`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`).
Alle diese Funktionen übernehmen die Fehler `,e.jsx(n,{children:"\\cred{\\eps_i}"}),` punktweise
(`,e.jsx(i.a,{href:"#env-warum-interpolation-das-rauschen-erbt",children:"Bemerkung 13.7.9"}),`). Erst eine Einschränkung des Suchraums oder ein Strafterm
macht die Aufgabe sinnvoll.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"K = n"})," und hat ",e.jsx(n,{children:"\\bB"})," vollen Rang, so ist die Residuenquadratsumme null."]}),e.jsxs(i.p,{children:["Dann ist ",e.jsx(n,{children:"\\bB"})," quadratisch und invertierbar, ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),` hat die Lösung
`,e.jsx(n,{children:"\\wh\\ba = \\bB^{-1}\\cblue{\\by}"}),`, und der Fit trifft jeden Punkt exakt. Für den
Datensatz aus `,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"})," rechnen wir mit ",e.jsx(n,{children:"K = n = 50"}),` eine
Residuenquadratsumme von `,e.jsx(n,{children:"10^{-16}"}),` nach. Ein guter Schätzer ist das nicht: Die
Koeffizienten erreichen dabei Beträge über `,e.jsx(n,{children:"3 \\cdot 10^4"}),`, und
`,e.jsx(n,{children:"\\kappa_2(\\bB)"})," steigt auf rund ",e.jsx(n,{children:"2 \\cdot 10^5"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit ",e.jsx(n,{children:"\\bB^\\top\\bB"}),` invertierbar ist, genügt es, dass jede Basisfunktion
mindestens einen Datenpunkt in ihrem Träger hat.`]}),e.jsxs(i.p,{children:["Gebraucht wird die Bedingung von Schoenberg und Whitney aus ",e.jsx(i.a,{href:"#env-wann-die-designmatrix-vollen-spaltenrang",children:"Bemerkung 13.7.7"}),`,
und die verlangt für jede Basisfunktion einen `,e.jsx(i.em,{children:"eigenen"}),` Datenpunkt in der
richtigen Reihenfolge. Unsere Gegenrechnung mit gleichmäßigen Knoten und
`,e.jsx(n,{children:"K = 35"})," auf ",e.jsx(n,{children:"50"}),` Punkten erfüllt die schwächere Forderung, und trotzdem bricht
die Cholesky-Zerlegung ab.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Auch bei Rangdefekt von ",e.jsx(n,{children:"\\bB"})," sind die angepassten Werte ",e.jsx(n,{children:"\\bB\\wh\\ba"}),` eindeutig
bestimmt.`]}),e.jsxs(i.p,{children:["Sie sind die orthogonale Projektion von ",e.jsx(n,{children:"\\cblue{\\by}"}),` auf den Spaltenraum von
`,e.jsx(n,{children:"\\bB"}),`, und die hängt nur vom Unterraum ab
(`,e.jsx(c,{id:"env:glaettung-ist-ein-lineares-kleinste",href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),`). Nicht eindeutig sind dagegen die
Koeffizienten und mit ihnen die Funktion `,e.jsx(n,{children:"\\cgreen{\\wh f}"}),` selbst: Zwei Lösungen unterscheiden sich um ein
Element des Kerns von `,e.jsx(n,{children:"\\bB"}),`, und die zugehörige Funktion verschwindet nur an den
Datenstellen, nicht überall.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit wachsendem ",e.jsx(n,{children:"K"})," fällt die Residuenquadratsumme in jedem Schritt."]}),e.jsxs(i.p,{children:[`Für geschachtelte Ansatzräume stimmt es, denn der alte Minimierer bleibt
zulässig. Wandern die Knoten mit `,e.jsx(n,{children:"K"}),`, etwa weil sie auf Quantilen liegen, so
sind die Räume nicht geschachtelt: In unserem Lauf steigt die
Residuenquadratsumme bei elf von `,e.jsx(n,{children:"36"})," Schritten wieder an, von ",e.jsx(n,{children:"K = 6"}),` auf
`,e.jsx(n,{children:"K = 7"})," etwa von ",e.jsx(n,{children:"3{,}435"})," auf ",e.jsx(n,{children:"4{,}016"})," (",e.jsx(i.a,{href:"#env-die-residuen-fallen-nicht-immer",children:"Bemerkung 13.7.11"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Die Theorie der Glättungssplines samt Existenz- und
Eindeutigkeitssatz entwickeln P. J. Green und B. W. Silverman, Nonparametric
Regression and Generalized Linear Models, Chapman und Hall 1994, Kapitel 2; die
Penalized Splines und die additiven Modelle dahinter stehen bei S. N. Wood,
Generalized Additive Models: An Introduction with R, 2. Auflage 2017. Die
Rangbedingung aus `,e.jsx(i.a,{href:"#env-wann-die-designmatrix-vollen-spaltenrang",children:"Bemerkung 13.7.7"}),` geht auf I. J. Schoenberg und A. Whitney
(1953) zurück und wird bei C. de Boor, A Practical Guide to Splines, Springer
2001, bewiesen.`]})})]})}function ht(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(vs,{...s})}):vs(s)}const{blau:ct,gruen:Xe,orange:zs,rot:Hn,violett:ys,grau:jn,hellgrau:ki}=ee,fe=jn,$e=0,wn=2*Math.PI,de=100,ii=.3,nn=200,vn=3,qn=4,Qn=40,ot=12,Ws=s=>Math.sin(3*s);function Vs(s){const i=s-vn-1,r=[];for(let l=0;l<=vn;l++)r.push($e);for(let l=1;l<=i;l++)r.push($e+l*(wn-$e)/(i+1));for(let l=0;l<=vn;l++)r.push(wn);return r}function Ts(s,i,r){const l=s.length;let t=new Array(l-1).fill(0);for(let a=0;a<l-1;a++)s[a]<=r&&r<s[a+1]&&(t[a]=1);if(r>=s[l-1]){for(let a=l-2;a>=0;a--)if(s[a]<s[a+1]){t[a]=1;break}}for(let a=1;a<=vn;a++){const d=new Array(l-1-a).fill(0);for(let h=0;h<d.length;h++){let x=0;const m=s[h+a]-s[h];m>0&&(x+=(r-s[h])/m*t[h]);const b=s[h+a+1]-s[h+1];b>0&&(x+=(s[h+a+1]-r)/b*t[h+1]),d[h]=x}t=d}return t.slice(0,i)}function xt(s,i){const r=Array.from({length:i},()=>new Float64Array(i));for(let l=0;l<i;l++)for(let t=0;t<=l;t++){let a=s[l][t];for(let d=0;d<t;d++)a-=r[l][d]*r[t][d];if(l===t){if(a<=0)return null;r[l][l]=Math.sqrt(a)}else r[l][t]=a/r[t][t]}return r}function ut(s,i,r){const l=new Float64Array(i);for(let a=0;a<i;a++){let d=r[a];for(let h=0;h<a;h++)d-=s[a][h]*l[h];l[a]=d/s[a][a]}const t=new Float64Array(i);for(let a=i-1;a>=0;a--){let d=l[a];for(let h=a+1;h<i;h++)d-=s[h][a]*t[h];t[a]=d/s[a][a]}return t}function gt(){const s=Si(20250813),i=Array.from({length:de},()=>$e+(wn-$e)*s()).sort((m,b)=>m-b),r=i.map(Ws),l=Si(77002),t=[];for(let m=0;m<nn;m++){const b=new Float64Array(de);for(let f=0;f<de;f+=2){const g=Math.max(l(),1e-12),p=l(),y=Math.sqrt(-2*Math.log(g));b[f]=y*Math.cos(2*Math.PI*p),f+1<de&&(b[f+1]=y*Math.sin(2*Math.PI*p))}t.push(b)}const a=r.map((m,b)=>m+ii*t[0][b]),d=[];for(let m=qn;m<=Qn;m++){const b=Vs(m),f=i.map(N=>Ts(b,m,N)),g=Array.from({length:m},()=>new Float64Array(m));for(let N=0;N<de;N++)for(let w=0;w<m;w++){const u=f[N][w];if(u!==0)for(let A=0;A<m;A++)g[w][A]+=u*f[N][A]}const p=xt(g,m);if(!p)continue;const y=new Float64Array(de),S=new Float64Array(de),z=new Float64Array(de),o=new Float64Array(m),j=[];for(let N=0;N<nn;N++){const w=new Float64Array(m);for(let A=0;A<de;A++){const W=r[A]+ii*t[N][A];for(let U=0;U<m;U++)w[U]+=f[A][U]*W}const u=ut(p,m,w);for(let A=0;A<m;A++)o[A]+=u[A]/nn;N<ot&&j.push(u);for(let A=0;A<de;A++){let W=0;for(let U=0;U<m;U++)W+=u[U]*f[A][U];y[A]+=W,S[A]+=W*W,z[A]+=(W-r[A])*(W-r[A])}}let v=0,B=0,D=0;for(let N=0;N<de;N++){const w=y[N]/nn;v+=(w-r[N])*(w-r[N])/de,B+=(S[N]/nn-w*w)/de,D+=z[N]/nn/de}d.push({K:m,bias2:v,varianz:B,mse:D,knoten:b.slice(vn+1,b.length-vn-1),proben:j,mittel:o})}const h=d.reduce((m,b)=>b.mse<m.mse?b:m).K,x=d.reduce((m,b)=>Math.max(m,b.mse),0);return{xs:i,y0:a,laeufe:d,besteK:h,maxMse:x}}function X(s,i=4){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}const Ye=430,De=225,I={l:34,r:10,t:10,b:26},wi=300,vi=118,xn=300,en=186,J={l:46,r:10,t:10,b:30};function jt({zeigeOptimum:s=!0}={}){const[i,r]=P.useState(6),l=P.useMemo(gt,[]),t=l.laeufe.find(K=>K.K===i)??l.laeufe[0],a=P.useMemo(()=>{const K=Vs(t.K),Z=241,$=Array.from({length:Z},(le,Ee)=>$e+(wn-$e)*Ee/(Z-1)),E=$.map(le=>Ts(K,t.K,le)),se=le=>E.map(Ee=>{let Ei=0;for(let En=0;En<t.K;En++)Ei+=le[En]*Ee[En];return Ei});return{gx:$,proben:t.proben.map(se),mittel:se(t.mittel)}},[t]),d=K=>I.l+(K-$e)/(wn-$e)*(Ye-I.l-I.r),h=K=>I.t+(2.2-K)/4.4*(De-I.t-I.b),x=K=>a.gx.map((Z,$)=>`${$===0?"M":"L"}${d(Z).toFixed(1)} ${h(K[$]).toFixed(1)}`).join(""),m=l.laeufe.flatMap(K=>[Math.max(K.bias2,1e-6),Math.max(K.varianz,1e-6),Math.max(K.mse,1e-6)]),b=Math.floor(Math.log10(Math.min(...m))),f=Math.ceil(Math.log10(Math.max(...m))),g=K=>J.l+(K-qn)/(Qn-qn)*(xn-J.l-J.r),p=K=>J.t+(f-Math.log10(Math.max(K,1e-6)))/(f-b)*(en-J.t-J.b),y=K=>l.laeufe.map((Z,$)=>`${$===0?"M":"L"}${g(Z.K).toFixed(1)} ${p(K(Z)).toFixed(1)}`).join(""),S=t.mse>0?t.bias2/t.mse:Number.NaN,z=t.mse>0?t.varianz/t.mse:Number.NaN,o=ii*ii*t.K/de,j=l.laeufe.find(K=>K.K===l.besteK)??t,v=j.mse>0?t.mse/j.mse:Number.NaN,B=K=>Math.max(0,Math.min(1,K)),D=t.mse>0?t.mse:1,N=96,w=wi-N-8,u=K=>w*B(K/D),A=K=>u(K)>w-42,W=K=>A(K)?N+4:N+u(K)+4,U=K=>A(K)?"var(--w-bg)":jn,te=l.laeufe.filter(K=>K.mse<=1.1*j.mse).map(K=>K.K),ln=te.every((K,Z)=>Z===0||K===te[Z-1]+1),ti=te.length===1?`K = ${te[0]}`:ln?`K = ${te[0]} bis ${te[te.length-1]}`:`K = ${te.join(", ")}`,Ue=`Für die gemittelte Varianz sagt ${xe("satz:gemittelte-varianz-eines-linearen")} exakt σ²K/n = ${X(o)} voraus; unsere ${nn} Wiederholungen schätzen ${X(t.varianz)}.`;let Ie;return s?v>1.1?t.K<l.besteK&&S>.5?Ie=`K = ${t.K}: Der Bias trägt ${X(S*100,1)} % des MSE. Die zwölf Kurven der oberen Tafel liegen dicht beieinander und weichen alle in dieselbe Richtung ab: Der Spline ist zu starr für f(x) = sin(3x). Das ist Unteranpassung. Der MSE ist das ${X(v,1)}-fache des Minimums bei K = ${l.besteK}. ${Ue}`:t.K<l.besteK?Ie=`K = ${t.K}: Der Bias ist schon klein, aber noch nicht klein genug. Er trägt ${X(S*100,1)} % des MSE, und der liegt beim ${X(v,2)}-fachen des Minimums bei K = ${l.besteK}. Links vom Optimum spart jede zusätzliche Basisfunktion noch mehr an Bias, als sie an Varianz kostet. ${Ue}`:Ie=`K = ${t.K}: Die Varianz trägt ${X(z*100,1)} % des MSE. Die zwölf Kurven der oberen Tafel fächern auf, jede folgt ihrem eigenen Rauschen, während ihr Mittelwert weiter auf f liegt. ${v>=2?"Das ist deutliche Überanpassung":"Hier beginnt die Überanpassung"}: Der MSE ist das ${X(v,1)}-fache des Minimums bei K = ${l.besteK}. ${Ue}`:Ie=`${t.K===l.besteK?`Bei K = ${t.K} ist der MSE unserer Simulation am kleinsten: ${X(t.mse)}.`:`K = ${t.K} liegt im flachen Bereich um das Minimum: MSE ${X(t.mse)}, das ${X(v,2)}-fache des besten Werts bei K = ${l.besteK}.`} Vom MSE trägt der Bias hier nur noch ${X(S*100,1)} %, die Varianz ${X(z*100,1)} %. Das Optimum liegt also nicht dort, wo beide Anteile gleich groß sind, sondern dort, wo eine weitere Verfeinerung mehr Varianz kostet als sie an Bias spart.${t.K===l.besteK?` Das liegt hier zufällig nahe beim Ein-Neuntel-Verhältnis des Proxy-Modells aus ${xe("bemerkung:heuristisches-balance-modell-fuer-die")}; allgemein erzwingt die Theorie diesen Anteil nicht.`:""} Innerhalb von zehn Prozent gleichwertig sind ${ti}. ${Ue}`:Ie=`K = ${t.K}: Vom MSE ${X(t.mse)} trägt der Bias ${X(S*100,1)} %, die Varianz ${X(z*100,1)} %. ${S>.5?"Die zwölf Kurven der oberen Tafel liegen dicht beieinander und weichen alle in dieselbe Richtung ab: Der Spline ist noch zu starr für f(x) = sin(3x).":"Die zwölf Kurven der oberen Tafel fächern auf, jede folgt ihrem eigenen Rauschen, während ihr Mittelwert weiter auf f liegt."} ${Ue}`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{children:"Schätzen wir erst die Knotenzahl mit kleinstem grauen MSE und prüfen sie dann."}),e.jsx(ne,{label:"Basisfunktionen K",min:qn,max:Qn,step:1,value:i,onChange:r,accent:zs}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${Ye} ${De}`,width:Ye,height:De,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("clipPath",{id:"s154-clip",children:e.jsx("rect",{x:I.l,y:I.t,width:Ye-I.l-I.r,height:De-I.t-I.b})}),e.jsx("rect",{x:I.l,y:I.t,width:Ye-I.l-I.r,height:De-I.t-I.b,fill:"none",stroke:ki,strokeWidth:.8}),[{v:0,s:"0"},{v:Math.PI,s:"π"},{v:wn,s:"2π"}].map(K=>e.jsxs("g",{children:[e.jsx("line",{x1:d(K.v),x2:d(K.v),y1:De-I.b,y2:De-I.b+3,stroke:fe}),e.jsx("text",{x:d(K.v),y:De-I.b+14,textAnchor:"middle",fontSize:9,fill:fe,children:K.s})]},K.s)),[-2,-1,0,1,2].map(K=>e.jsxs("g",{children:[e.jsx("line",{x1:I.l-3,x2:I.l,y1:h(K),y2:h(K),stroke:fe}),e.jsx("text",{x:I.l-5,y:h(K)+3,textAnchor:"end",fontSize:9,fill:fe,children:String(K).replace("-","−")})]},`y${K}`)),e.jsx("line",{x1:I.l,x2:Ye-I.r,y1:h(0),y2:h(0),stroke:fe,strokeWidth:.8}),e.jsx("text",{x:Ye-I.r-2,y:h(0)-5,textAnchor:"end",fontSize:9,fill:fe,children:"x"}),e.jsxs("g",{clipPath:"url(#s154-clip)",children:[l.xs.map((K,Z)=>e.jsx("circle",{cx:d(K),cy:h(l.y0[Z]),r:1.7,fill:ct,opacity:.75},`d${Z}`)),a.proben.map((K,Z)=>e.jsx("path",{d:x(K),fill:"none",stroke:Xe,strokeWidth:.9,opacity:.4},`p${Z}`)),e.jsx("path",{d:x(a.mittel),fill:"none",stroke:Xe,strokeWidth:2.4}),e.jsx("path",{d:a.gx.map((K,Z)=>`${Z===0?"M":"L"}${d(K).toFixed(1)} ${h(Ws(a.gx[Z])).toFixed(1)}`).join(""),fill:"none",stroke:ys,strokeWidth:2,strokeDasharray:"6 3"})]}),t.knoten.map(K=>e.jsx("line",{x1:d(K),x2:d(K),y1:De-I.b-6,y2:De-I.b,stroke:zs,strokeWidth:1.6},`k${K}`)),e.jsx("text",{x:I.l+4,y:I.t+11,fontSize:10,fill:ys,children:"f"}),e.jsx("text",{x:I.l+16,y:I.t+11,fontSize:10,fill:Xe,children:"Schätzer"})]}),e.jsxs("div",{className:"min-w-0 grow basis-72 space-y-2",children:[e.jsxs("svg",{viewBox:`0 0 ${wi} ${vi}`,width:wi,height:vi,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsxs("text",{x:8,y:16,fontSize:10,fill:fe,children:["Anteile am MSE bei K = ",t.K]}),e.jsxs("g",{children:[e.jsx("text",{x:N-6,y:42,textAnchor:"end",fontSize:10,fill:Hn,children:"Bias²"}),e.jsx("rect",{x:N,y:32,width:w*B(t.bias2/D),height:13,fill:Hn}),e.jsx("text",{x:W(t.bias2),y:42,fontSize:9,fill:U(t.bias2),children:X(t.bias2)})]}),e.jsxs("g",{children:[e.jsx("text",{x:N-6,y:68,textAnchor:"end",fontSize:10,fill:Xe,children:"Varianz"}),e.jsx("rect",{x:N,y:58,width:w*B(t.varianz/D),height:13,fill:Xe}),e.jsx("text",{x:W(t.varianz),y:68,fontSize:9,fill:U(t.varianz),children:X(t.varianz)})]}),e.jsxs("g",{children:[e.jsx("text",{x:N-6,y:94,textAnchor:"end",fontSize:10,fill:jn,children:"MSE"}),e.jsx("rect",{x:N,y:84,width:w*B(t.bias2/D),height:13,fill:Hn}),e.jsx("rect",{x:N+w*B(t.bias2/D),y:84,width:w*B(t.varianz/D),height:13,fill:Xe}),e.jsx("text",{x:N+4,y:94,fontSize:9,fill:"var(--w-bg)",children:X(t.mse)})]}),e.jsx("text",{x:8,y:vi-5,fontSize:8.5,fill:fe,children:"Der MSE-Balken ist immer voll ausgezogen; die Zahlen sind absolut."})]}),e.jsxs("svg",{viewBox:`0 0 ${xn} ${en}`,width:xn,height:en,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:J.l,y:J.t,width:xn-J.l-J.r,height:en-J.t-J.b,fill:"none",stroke:ki,strokeWidth:.8}),Array.from({length:f-b+1},(K,Z)=>b+Z).map(K=>e.jsxs("g",{children:[e.jsx("line",{x1:J.l,x2:xn-J.r,y1:p(Math.pow(10,K)),y2:p(Math.pow(10,K)),stroke:ki}),e.jsxs("text",{x:J.l-5,y:p(Math.pow(10,K))+3,textAnchor:"end",fontSize:8,fill:fe,children:["10",K<0?"⁻":"",String(Math.abs(K)).split("").map(Z=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(Z)]).join("")]})]},`g${K}`)),[qn,10,20,30,Qn].map(K=>e.jsx("text",{x:g(K),y:en-J.b+13,textAnchor:"middle",fontSize:9,fill:fe,children:K},`x${K}`)),e.jsx("text",{x:(J.l+xn-J.r)/2,y:en-4,textAnchor:"middle",fontSize:9,fill:fe,children:"Basisfunktionen K"}),e.jsx("line",{x1:g(t.K),x2:g(t.K),y1:J.t,y2:en-J.b,stroke:fe,strokeWidth:1,strokeDasharray:"3 3"}),e.jsx("path",{d:y(K=>K.bias2),fill:"none",stroke:Hn,strokeWidth:1.6}),e.jsx("path",{d:y(K=>K.varianz),fill:"none",stroke:Xe,strokeWidth:1.6}),e.jsx("path",{d:y(K=>K.mse),fill:"none",stroke:jn,strokeWidth:2}),s?e.jsx("circle",{cx:g(l.besteK),cy:p(j.mse),r:4,fill:"none",stroke:jn,strokeWidth:1.8}):null,e.jsx("text",{x:J.l+5,y:J.t+11,fontSize:8.5,fill:jn,children:"MSE (grau) = Bias² (rot) + Varianz des grünen Schätzers"})]})]})]}),e.jsx(he,{kind:s?t.K===l.besteK?"ok":"warn":"neutral",children:Ie})]})}function Ss(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"})," haben wir mit ",e.jsx(n,{children:"K < n"}),` Basisfunktionen geglättet. Offen
blieb die Frage, die in der Praxis am wichtigsten ist: Wie groß soll `,e.jsx(n,{children:"K"}),` sein?
Zwei Effekte wirken gegeneinander. Zu wenige Basisfunktionen können `,e.jsx(n,{children:"f"}),` nicht
darstellen, zu viele lassen den Schätzer dem Rauschen folgen.`]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.8.1 (Modell, Designmatrix, Schätzer)",id:"env-modell-designmatrix-schaetzer",children:[e.jsxs(i.p,{children:["Die Bezeichnungen stammen aus ",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),". An festen Stellen ",e.jsx(n,{children:"x_1 < \\dots < x_n"})," in ",e.jsx(n,{children:"[a, b]"})," beobachten wir"]}),e.jsx(_,{children:`\\cblue{y_i} = f(x_i) + \\cred{\\eps_i},
\\qquad \\E[\\cred{\\eps_i}] = 0,
\\qquad \\var[\\cred{\\eps_i}] = \\sigma^2 ,`}),e.jsxs(i.p,{children:["mit unkorrelierten Fehlern. Zu einer ",e.jsx(c,{id:"basis",children:"Basis"}),`
`,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),` von Splinefunktionen
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`) bilden wir die
Designmatrix `,e.jsx(n,{children:"\\bB \\in \\R^{n \\times K}"}),` mit Einträgen
`,e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k}(x_i)"}),`, schreiben
`,e.jsx(n,{children:"\\corange{\\bphi(x)} = (\\corange{\\phi_1(x)}, \\dots, \\corange{\\phi_K(x)})^\\top"}),`
und erhalten den `,e.jsx(c,{id:"linear-least-squares",children:"Kleinste-Quadrate-Schätzer"})]}),e.jsx(L,{tag:"13.8.1",id:"eq-modell-designmatrix-schaetzer",children:`\\cgreen{\\wh{\\ba}} = \\bB^+ \\cblue{\\by},
\\qquad
\\cgreen{\\wh{f}(x)} = \\corange{\\bphi(x)}^\\top \\cgreen{\\wh{\\ba}} .`}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\bB^+"})," die ",e.jsx(c,{id:"pseudoinverse",children:"Pseudoinverse"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),"); hat ",e.jsx(n,{children:"\\bB"}),` vollen Spaltenrang
`,e.jsx(n,{children:"K"}),", so ist ",e.jsx(n,{children:"\\bB^+ = (\\bB^\\top\\bB)^{-1}\\bB^\\top"}),`,
und `,e.jsx(i.a,{href:"#eq-modell-designmatrix-schaetzer",children:"(13.8.1)"}),` ist die gewöhnliche Lösung der Normalengleichungen
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),")."]}),e.jsxs(i.p,{children:["Der Schätzer ist ",e.jsx(i.em,{children:"linear"}),` in den Daten, er entsteht durch Multiplikation mit
einer festen Matrix. Mit `,e.jsx(n,{children:"\\cblue{\\by} = \\symbf{f} + \\cred{\\beps}"}),`, wobei
`,e.jsx(n,{children:"\\symbf{f} = (f(x_1), \\dots, f(x_n))^\\top"}),` die rauschfreien Werte sammelt,
zerfällt er in`]}),e.jsx(_,{children:"\\cgreen{\\wh{\\ba}} = \\bB^+ \\symbf{f} + \\bB^+ \\cred{\\beps} ."}),e.jsx(i.p,{children:`Der erste Summand ist deterministisch, der zweite trägt den ganzen Zufall.
Diese Aufteilung ist die Bias-Varianz-Zerlegung in Rohform.`})]}),`
`,e.jsx(i.h3,{children:"Bias: zu wenige Basisfunktionen"}),`
`,e.jsxs(i.p,{children:["Der deterministische erste Summand misst, wie gut sich ",e.jsx(n,{children:"f"}),` im Spann unserer
`,e.jsx(n,{children:"K"})," Basisfunktionen darstellen lässt."]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.8.2 (Der Bias ist der Approximationsfehler ohne Rauschen)",id:"env-der-bias-ist-der-approximationsfehler",children:[e.jsxs(i.p,{children:["Hat ",e.jsx(n,{children:"\\bB"})," vollen Spaltenrang, so gilt für jedes ",e.jsx(n,{children:"x \\in [a, b]"})]}),e.jsx(L,{tag:"13.8.2",id:"eq-der-bias-ist-der-approximationsfehler",children:`\\E\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\symbf{f} .`}),e.jsxs(i.p,{children:[`Der Erwartungswert des Schätzers ist damit dieselbe Anpassung, die wir aus
rauschfreien Daten bekämen. Der `,e.jsx(i.em,{children:"Bias"})," ",e.jsx(n,{children:"\\cred{\\E[\\wh{f}(x)] - f(x)}"}),` hängt
damit weder von `,e.jsx(n,{children:"\\sigma"})," noch von der einzelnen Ziehung ab."]}),e.jsxs(i.p,{children:["Liegen die Knoten gleichmäßig auf ",e.jsx(n,{children:"[a, b]"}),", sind die ",e.jsx(n,{children:"\\corange{\\phi_k}"}),` eine
Basis der kubischen Splines zu diesen Knoten und ist `,e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`,
so gilt zusätzlich`]}),e.jsx(L,{tag:"13.8.3",id:"eq-der-bias-ist-der-approximationsfehler-2",children:`\\frac{1}{n}\\sumin \\bigl(\\cred{\\E[\\wh{f}(x_i)] - f(x_i)}\\bigr)^2
\\;\\le\\; \\Bigl(C \\corange{h}^4 \\max_{x \\in [a,b]}\\left| f^{(4)}(x) \\right|\\Bigr)^2
= O(K^{-8}) ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\corange{h}"})," die Gitterweite der Knoten ist."]})]}),`
`,e.jsx(H,{title:"Beweis der Bias-Darstellung",children:e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bB^+"})," und ",e.jsx(n,{children:"\\corange{\\bphi(x)}"})," hängen nur von den Stellen ",e.jsx(n,{children:"x_i"})," und der Basis ab, nicht von den Beobachtungen; und ",e.jsx(n,{children:"\\E[\\cblue{\\by}] = \\symbf{f}"}),", weil ",e.jsx(n,{children:"\\E[\\cred{\\beps}] = \\bnull"})]}),children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-modell-designmatrix-schaetzer",children:"(13.8.1)"})," ist ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x)}"}),` eine feste Linearkombination der
`,e.jsx(n,{children:"\\cblue{y_i}"}),". Aus der Linearität des ",e.jsx(c,{id:"expected-value",children:"Erwartungswerts"}),`
folgt`]}),e.jsx(_,{children:`\\E\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\E[\\cblue{\\by}]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\symbf{f} .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Das ist die definierende Eigenschaft der Kleinste-Quadrate-Lösung, angewendet auf den Datenvektor ",e.jsx(n,{children:"\\symbf{f}"})," statt auf ",e.jsx(n,{children:"\\cblue{\\by}"})]}),children:e.jsxs(i.p,{children:["Die rechte Seite von ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler",children:"(13.8.2)"}),` ist der Kleinste-Quadrate-Fit an die
rauschfreien Werte `,e.jsx(n,{children:"\\symbf{f}"}),". Nennen wir ihn ",e.jsx(n,{children:"\\cgreen{\\wh{f}_0}"}),`. Er
minimiert unter allen Funktionen `,e.jsx(n,{children:"s"})," des ",e.jsx(c,{id:"env:ansatzraum-basisdarstellung",children:"Ansatzraums"})," ",e.jsx(n,{children:"\\Fcal_K"}),`, also des
Spanns von `,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
(`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"), die Summe ",e.jsx(n,{children:"\\sumin (f(x_i) - s(x_i))^2"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["Kubische Splines zu ",e.jsx(n,{children:"m"})," Teilintervallen bilden einen Raum der Dimension ",e.jsx(n,{children:"m + 3 = K"}),", und ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"})," ist eine Basis davon (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")"]}),children:e.jsxs(i.p,{children:["Zu den Knoten unserer Basis gehört nach ",e.jsx(c,{id:"env:approximationsfehler-kubischer-splines",href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` ein kubischer Spline
`,e.jsx(n,{children:"\\cgreen{s^\\star}"}),", der ",e.jsx(n,{children:"f"}),` dort interpoliert und
`,e.jsx(n,{children:"\\max_x \\cred{\\left| f(x) - s^\\star(x) \\right|} \\le C \\corange{h}^4 \\max_x |f^{(4)}(x)|"}),`
erfüllt. Dieser Spline liegt in `,e.jsx(n,{children:"\\Fcal_K"}),"."]})}),e.jsxs(F,{children:[e.jsx(i.p,{children:"Mit Schritt 2 und Schritt 3 folgt"}),e.jsx(_,{children:`\\sumin \\bigl(f(x_i) - \\cgreen{\\wh{f}_0(x_i)}\\bigr)^2
\\;\\le\\; \\sumin \\bigl(f(x_i) - \\cgreen{s^\\star(x_i)}\\bigr)^2
\\;\\le\\; n\\,\\Bigl(C \\corange{h}^4 \\max_x |f^{(4)}(x)|\\Bigr)^2 ,`}),e.jsxs(i.p,{children:["und Division durch ",e.jsx(n,{children:"n"})," gibt ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler-2",children:"(13.8.3)"}),"."]})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"K"})," Basisfunktionen vom Grad ",e.jsx(n,{children:"3"})," gehören zu ",e.jsx(n,{children:"K - 3"})," Teilintervallen (Schritt 3), die Gitterweite fällt also wie ",e.jsx(n,{children:"1/K"})]}),children:e.jsxs(i.p,{children:["Gleichmäßige Knoten auf einem festen Intervall ",e.jsx(n,{children:"[a, b]"}),` bedeuten
`,e.jsx(n,{children:"\\corange{h} = (b - a)/(K - 3)"}),", also ",e.jsx(n,{children:"\\corange{h} = O(1/K)"}),` und damit
`,e.jsx(n,{children:"\\corange{h}^8 = O(K^{-8})"}),"."]})})]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.8.3 (Woran die Ordnung hängt)",id:"env-woran-die-ordnung-haengt",children:e.jsxs(i.p,{children:[`Gebraucht werden gleichmäßige Knoten auf einem festen Intervall,
`,e.jsx(n,{children:"f \\in \\Ccal^4"}),` und kubische Stücke; fällt eine Bedingung weg, ändert sich der
Exponent. Bei Geradenstücken oder einer `,e.jsx(c,{id:"function",children:"Funktion"}),` mit nur zwei
stetigen Ableitungen steht `,e.jsx(n,{children:"\\corange{h}^2"})," statt ",e.jsx(n,{children:"\\corange{h}^4"}),`
(`,e.jsx(c,{id:"env:fehler-der-stueckweise-linearen",href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"}),`), und ein einziges breites
Teilintervall verdirbt die Gitterweite (`,e.jsx(c,{id:"env:partition-und-gitterweite",href:"#env-partition-und-gitterweite",children:"Definition 13.6.1"}),`).
Die Kurzform `,e.jsx(n,{children:"\\max_x |f(x) - \\cgreen{\\wh{f}(x)}| = O(\\corange{h}^4)"}),` ist die
punktweise Fassung ohne Rauschen; `,e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),`
mittelt über die Entwurfsstellen und quadriert, daher `,e.jsx(n,{children:"O(K^{-8})"}),` statt
`,e.jsx(n,{children:"O(K^{-4})"}),"."]})}),`
`,e.jsx(i.h3,{children:"Varianz: zu viele Basisfunktionen"}),`
`,e.jsxs(i.p,{children:["Der zweite Summand ",e.jsx(n,{children:"\\bB^+\\cred{\\beps}"})," trägt den Zufall und wächst mit ",e.jsx(n,{children:"K"}),`.
Ziehen wir die Daten mehrfach neu, so liegen die Schätzkurven bei kleinem `,e.jsx(n,{children:"K"}),`
fast übereinander und verfehlen `,e.jsx(n,{children:"f"}),` alle in dieselbe Richtung, während sie bei
großem `,e.jsx(n,{children:"K"}),` im Mittel richtig liegen, einzeln aber weit auffächern, weil jede
ihrem eigenen Rauschen folgt.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.8.4 (Gemittelte Varianz eines linearen Schätzers)",id:"env-gemittelte-varianz-eines-linearen",children:[e.jsxs(i.p,{children:["Seien die ",e.jsx(n,{children:"\\cred{\\eps_i}"}),` unkorreliert mit
`,e.jsx(n,{children:"\\var[\\cred{\\eps_i}] = \\sigma^2"}),` (homoskedastisch), und habe
`,e.jsx(n,{children:"\\bB"})," vollen Spaltenrang ",e.jsx(n,{children:"K"}),". Dann gilt für jedes ",e.jsx(n,{children:"x"})]}),e.jsx(L,{tag:"13.8.4",id:"eq-gemittelte-varianz-eines-linearen",children:`\\var\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\sigma^2\\, \\corange{\\bphi(x)}^\\top
\\bigl(\\bB^\\top\\bB\\bigr)^{-1} \\corange{\\bphi(x)} ,`}),e.jsx(i.p,{children:"und über die Entwurfsstellen gemittelt sogar exakt"}),e.jsx(L,{tag:"13.8.5",id:"eq-gemittelte-varianz-eines-linearen-2",children:"\\frac{1}{n}\\sumin \\var\\bigl[\\cgreen{\\wh{f}(x_i)}\\bigr] = \\frac{\\sigma^2 K}{n} ."})]}),`
`,e.jsx(H,{title:"Beweis der gemittelten Varianzformel",children:e.jsxs(me,{children:[e.jsxs(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[\\bM\\cblue{\\by}] = \\bM \\var[\\cblue{\\by}]\\bM^\\top"})," für feste ",e.jsx(n,{children:"\\bM"}),"; ",e.jsx(n,{children:"\\var[\\cblue{\\by}] = \\sigma^2\\bI_n"})," wegen Unkorreliertheit und Homoskedastizität; und mit ",e.jsx(n,{children:"\\bB^+ = (\\bB^\\top\\bB)^{-1}\\bB^\\top"})," kürzt sich ",e.jsx(n,{children:"\\bB^\\top\\bB"})," heraus"]}),children:[e.jsxs(i.p,{children:["Für die ",e.jsx(c,{id:"covariance-matrix",children:"Kovarianzmatrix"}),` des Koeffizientenvektors gilt,
wobei `,e.jsx(n,{children:"\\var[\\cdot\\,]"})," für einen Vektor die Matrix der Kovarianzen bezeichnet,"]}),e.jsx(_,{children:`\\var\\bigl[\\cgreen{\\wh{\\ba}}\\bigr]
= \\bB^+ \\var[\\cblue{\\by}] \\,(\\bB^+)^\\top
= \\sigma^2 \\bB^+ (\\bB^+)^\\top
= \\sigma^2 \\bigl(\\bB^\\top\\bB\\bigr)^{-1} .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[\\bc^\\top\\bv] = \\bc^\\top\\var[\\bv]\\,\\bc"}),", hier mit ",e.jsx(n,{children:"\\bc = \\corange{\\bphi(x)}"})]}),children:e.jsxs(i.p,{children:["Daraus folgt ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),", denn ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = \\corange{\\bphi(x)}^\\top\\cgreen{\\wh{\\ba}}"}),`
ist eine Linearkombination der Koeffizienten.`]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Jeder Summand ist ein Skalar und damit gleich seiner ",e.jsx(c,{id:"trace",children:"Spur"}),"; die Zyklizität der Spur (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),") zieht den Vektor nach vorn, und ",e.jsx(n,{children:"\\sumin \\corange{\\bphi(x_i)}\\corange{\\bphi(x_i)}^\\top = \\bB^\\top\\bB"})]}),children:[e.jsxs(i.p,{children:["Nun summieren wir ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),` über die Entwurfsstellen. Der Vektor
`,e.jsx(n,{children:"\\corange{\\bphi(x_i)}^\\top"})," ist die ",e.jsx(n,{children:"i"}),"-te Zeile von ",e.jsx(n,{children:"\\bB"}),", also ist"]}),e.jsx(_,{children:`\\sumin \\corange{\\bphi(x_i)}^\\top \\bigl(\\bB^\\top\\bB\\bigr)^{-1}\\corange{\\bphi(x_i)}
= \\tr\\Bigl(\\bigl(\\bB^\\top\\bB\\bigr)^{-1}
\\sumin \\corange{\\bphi(x_i)}\\,\\corange{\\bphi(x_i)}^\\top\\Bigr)
= \\tr\\bigl(\\bI_K\\bigr) = K .`})]}),e.jsx(F,{children:e.jsxs(i.p,{children:["Multiplikation mit ",e.jsx(n,{children:"\\sigma^2/n"})," liefert ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),"."]})})]})}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.8.5 (Was die Varianzformel besagt)",id:"env-was-die-varianzformel-erzaehlt",children:[e.jsxs(i.p,{children:["Rechts in ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),` steht keine Eigenschaft der
Basis, keine Knotenlage und keine `,e.jsx(c,{id:"env:definition-7-2-1",children:"Konditionszahl"}),", nur ",e.jsx(n,{children:"\\sigma^2"}),", ",e.jsx(n,{children:"K"})," und ",e.jsx(n,{children:"n"}),`:
Im Mittel kostet jede Basisfunktion `,e.jsx(n,{children:"\\sigma^2/n"}),` an Varianz, unabhängig von
ihrer Form. Das ist die exakte Fassung der Ordnungsaussage
`,e.jsx(n,{children:"\\var[\\cgreen{\\wh{f}(x)}] = O(K/n)"}),"."]}),e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Hatmatrix"})," ",e.jsx(n,{children:"\\bH = \\bB(\\bB^\\top\\bB)^{-1}\\bB^\\top"}),` bildet die Beobachtungen
auf die angepassten Werte ab, und der Beweis zeigt `,e.jsx(n,{children:"\\tr(\\bH) = K"}),`. Diese Spur
heißt die `,e.jsx(i.em,{children:"Anzahl effektiver Freiheitsgrade"}),` des Schätzers; bei einer
unbestraften Regression mit `,e.jsx(n,{children:"K"})," Basisfunktionen ist sie ",e.jsx(n,{children:"K"}),"."]}),e.jsxs(i.p,{children:["Punktweise gilt nur ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),`, und an einer
Stelle, in deren Nähe kaum Daten liegen, kann `,e.jsx(n,{children:"\\var[\\cgreen{\\wh{f}(x)}]"}),` um
Größenordnungen über `,e.jsx(n,{children:"\\sigma^2 K/n"}),` liegen. Werten wir
`,e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),` im Beispiel unten auf einem gleichmäßigen
Gitter über `,e.jsx(n,{children:"[0, 2\\pi]"})," statt an den ",e.jsx(n,{children:"100"}),`
Entwurfsstellen aus, so ist die mittlere Varianz bei `,e.jsx(n,{children:"K = 40"})," nicht ",e.jsx(n,{children:"0{,}036"}),`,
sondern `,e.jsx(n,{children:"5{,}04"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Der Kompromiss: mittlerer quadratischer Fehler"}),`
`,e.jsxs(k,{kind:"Satz",label:"13.8.6 (Zerlegung des mittleren quadratischen Fehlers)",id:"env-zerlegung-des-mittleren-quadratischen",children:[e.jsxs(i.p,{children:["Für jedes ",e.jsx(n,{children:"x"})," gilt"]}),e.jsx(L,{tag:"13.8.6",id:"eq-zerlegung-des-mittleren-quadratischen",children:`\\underbrace{\\E\\Bigl[\\bigl(\\cgreen{\\wh{f}(x)} - f(x)\\bigr)^2\\Bigr]}_{\\MSE}
= \\underbrace{\\bigl(\\cred{\\E[\\wh{f}(x)] - f(x)}\\bigr)^2}_{\\text{Bias}^2}
+ \\underbrace{\\var\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]}_{\\text{Varianz}} .`})]}),`
`,e.jsx(H,{title:"Beweis der Bias-Varianz-Zerlegung",children:e.jsxs(me,{children:[e.jsxs(F,{children:[e.jsxs(i.p,{children:["Wir schreiben ",e.jsx(n,{children:"\\mu := \\E[\\cgreen{\\wh{f}(x)}]"})," und schieben diesen Wert ein:"]}),e.jsx(_,{children:`\\bigl(\\cgreen{\\wh{f}(x)} - f(x)\\bigr)^2
= \\bigl(\\cgreen{\\wh{f}(x)} - \\mu\\bigr)^2
+ 2\\bigl(\\cgreen{\\wh{f}(x)} - \\mu\\bigr)\\bigl(\\mu - f(x)\\bigr)
+ \\bigl(\\mu - f(x)\\bigr)^2 .`})]}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\E[\\cgreen{\\wh{f}(x)} - \\mu] = 0"})," nach Definition von ",e.jsx(n,{children:"\\mu"}),", und ",e.jsx(n,{children:"\\mu - f(x)"})," ist keine Zufallsgröße, darf also aus dem Erwartungswert gezogen werden"]}),children:e.jsxs(i.p,{children:[`Jetzt nehmen wir den Erwartungswert. Der mittlere Term fällt weg, der erste
ist die `,e.jsx(c,{id:"variance",children:"Varianz"}),", der letzte ist deterministisch."]})})]})}),`
`,e.jsxs(i.p,{children:["Setzen wir ",e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"})," und ",e.jsx(c,{id:"env:gemittelte-varianz-eines-linearen",href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"})," in ",e.jsx(i.a,{href:"#eq-zerlegung-des-mittleren-quadratischen",children:"(13.8.6)"}),` ein und mitteln über die
Entwurfsstellen, so erhalten wir unter den Voraussetzungen von `,e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),`
für eine Konstante `,e.jsx(n,{children:"C_1>0"})," die zentrale ",e.jsx(i.em,{children:"Obergrenze"})," dieses Abschnitts:"]}),`
`,e.jsx(L,{tag:"13.8.7",id:"eq-eq-13-8-7",children:`\\frac{1}{n}\\sumin \\E\\Bigl[\\bigl(\\cgreen{\\wh{f}(x_i)} - f(x_i)\\bigr)^2\\Bigr]
\\;\\le\\;
\\underbrace{C_1K^{-8}}_{\\cred{\\text{obere Schranke für Bias}^2}}
+ \\underbrace{\\frac{\\sigma^2 K}{n}}_{\\text{Varianz}} .`}),`
`,e.jsxs(i.p,{children:["Die Schranke für den ersten Term fällt mit wachsendem ",e.jsx(n,{children:"K"}),` schnell, der zweite
Term wächst linear, also hat die `,e.jsx(i.em,{children:"rechte Seite"}),` ein Minimum dazwischen. Der
tatsächliche MSE muss sein Minimum nicht an derselben Stelle haben, denn der
Bias darf unter seiner Schranke liegen oder schwanken.`]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.8.7 (Heuristisches Balance-Modell für die Knotenzahl)",id:"env-heuristisches-balance-modell-fuer-die",children:[e.jsxs(i.p,{children:[`Nehmen wir zusätzlich an, dass der quadrierte Bias in dem interessierenden
Bereich tatsächlich wie `,e.jsx(n,{children:"c_1K^{-8}"})," mit ",e.jsx(n,{children:"c_1>0"}),` verläuft, statt nur nach oben
so beschränkt zu sein, erhalten wir das Proxy-Kriterium
`,e.jsx(n,{children:"g(K) = c_1 K^{-8} + c_2 K/n"}),". Ableiten und Nullsetzen gibt"]}),e.jsx(_,{children:`g'(K) = -8 c_1 K^{-9} + \\frac{c_2}{n} \\overset{!}{=} 0
\\quad\\Longrightarrow\\quad
K^\\star = \\Bigl(\\frac{8 c_1}{c_2}\\Bigr)^{1/9} n^{1/9} ,`}),e.jsx(i.p,{children:"und dort sind beide Summanden von derselben Ordnung:"}),e.jsx(_,{children:`c_1 (K^\\star)^{-8} \\sim n^{-8/9}, \\qquad
\\frac{c_2 K^\\star}{n} \\sim n^{1/9 - 1} = n^{-8/9} .`}),e.jsxs(i.p,{children:["Unter dieser zusätzlichen Annahme ergeben sich also ",e.jsx(n,{children:"K^\\star \\asymp n^{1/9}"}),`
und eine Proxy-Rate `,e.jsx(n,{children:"n^{-8/9}"}),`; eine rigorose Optimalitätsaussage wäre das
erst mit einer passenden unteren Schranke.`]}),e.jsxs(i.p,{children:["Aus derselben Rechnung folgt ",e.jsx(n,{children:"c_1 (K^\\star)^{-8} = \\tfrac{1}{8}\\, c_2 K^\\star/n"}),`:
Im Optimum dieses Modells trägt der quadrierte Bias ein Neuntel der Summe, eine
Eigenschaft der Potenzform, nicht des tatsächlichen MSE.`]}),e.jsxs(i.p,{children:["Die Ordnung ",e.jsx(n,{children:"K^\\star \\asymp n^{1/9}"})," ist ",e.jsx(i.em,{children:"rein asymptotisch"}),`: Mit Konstante
`,e.jsx(n,{children:"1"})," liefert die Formel für ",e.jsx(n,{children:"n = 100"})," den Wert ",e.jsx(n,{children:"K^\\star = 1{,}67"}),`, und niemand
approximiert eine schwingende Funktion mit zwei Basisfunktionen. Es fehlt der
Faktor `,e.jsx(n,{children:"(8c_1/c_2)^{1/9}"}),", der an der vierten Ableitung von ",e.jsx(n,{children:"f"}),` und an
`,e.jsx(n,{children:"\\sigma"}),` hängt. Merken lässt sich deshalb der Balance-Exponent, keine konkrete
Knotenzahl.`]})]}),`
`,e.jsx(i.h3,{children:"Ein numerisches Beispiel"}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.8.8 (Bias und Varianz beim Sinusbeispiel)",id:"env-bias-und-varianz-beim-sinusbeispiel",children:[e.jsxs(i.p,{children:["Wir nehmen ",e.jsx(n,{children:"f(x) = \\sin(3x)"})," auf ",e.jsx(n,{children:"[0, 2\\pi]"}),", ",e.jsx(n,{children:"n = 100"}),` feste, einmal
gleichverteilt gezogene Stellen und `,e.jsx(n,{children:"\\sigma = 0{,}3"}),". Für ",e.jsx(n,{children:"200"}),` simulierte
Datensätze passen wir jeweils einen kubischen Regressionsspline mit `,e.jsx(n,{children:"K"}),`
Basisfunktionen an und schätzen daraus Bias, Varianz und MSE an den
Entwurfsstellen. Alle Zahlen der Tabelle sind unsere eigene Rechnung.`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"K"})}),e.jsx(i.th,{style:{textAlign:"left"},children:"Bias²"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Varianz"}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\sigma^2 K/n"})}),e.jsx(i.th,{style:{textAlign:"left"},children:"MSE"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}4103"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0044"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0045"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}4147"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"8"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0344"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0071"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0072"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0415"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}1174"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0080"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0081"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}1254"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"15"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0001"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0135"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0135"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0136"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"40"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0001"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0358"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0360"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0360"})})]})]})]}),e.jsxs(i.p,{children:["Die geschätzte Varianz trifft die Vorhersage ",e.jsx(n,{children:"\\sigma^2 K/n"}),` aus
`,e.jsx(c,{id:"env:gemittelte-varianz-eines-linearen",href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"}),` in jeder Zeile auf zwei Prozent genau;
die Abweichung ist Simulationsfehler. Der MSE fällt zwischen `,e.jsx(n,{children:"K = 9"}),` und
`,e.jsx(n,{children:"K = 15"}),` um eine Größenordnung und steigt danach wieder an. Wo genau sein
Minimum liegt, rechnet das Widget unten aus.`]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.8.9 (Der Bias fällt nicht monoton)",id:"env-der-bias-faellt-nicht-monoton",children:[e.jsxs(i.p,{children:["Zwischen ",e.jsx(n,{children:"K = 8"})," und ",e.jsx(n,{children:"K = 9"}),` steigt der quadrierte Bias in der Tabelle
wieder an. Beide Anpassungen sind schlecht, denn fünf beziehungsweise sechs
Teilintervalle sind für drei Sinusperioden zu wenig. Welche weniger schlecht
ausfällt, entscheidet die Lage der Knoten relativ zu `,e.jsx(n,{children:"f"}),". Bei ",e.jsx(n,{children:"K = 9"}),` sitzen
die fünf inneren Knoten exakt auf den Nullstellen `,e.jsx(n,{children:"k\\pi/3"})," von ",e.jsx(n,{children:"\\sin(3x)"}),`, wo
auch `,e.jsx(n,{children:"f''"}),` verschwindet, während die Funktion zwischen den Knoten am stärksten
gekrümmt ist.`]}),e.jsxs(i.p,{children:["Ein Widerspruch zu ",e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),` ist das nicht:
`,e.jsx(n,{children:"O(K^{-8})"})," ist eine obere Schranke für große ",e.jsx(n,{children:"K"}),`, keine Garantie für jeden
einzelnen Schritt, wie schon bei den gemessenen Faktoren in
`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]})]}),`
`,e.jsxs(ae,{title:"Bias, Varianz und MSE in der Simulation",children:[e.jsx(i.p,{children:`Wo vermuten wir vor dem Blick auf die MSE-Kurve ihr Minimum? Das Widget
rechnet die Tabelle mit festem Startwert nach, jeder Aufruf zeigt dieselbe
Simulation.`}),e.jsx(tn,{frage:"Welche Knotenzahl minimiert in dieser festen Simulation den MSE?",loesung:12,toleranz:.5,einheit:"K",verdeckt:e.jsx(i.p,{children:"Das Minimum liegt bei K = 12 mit einem MSE von 0,0120: Bei K = 5 ist der MSE das 34,5-fache davon, bei K = 40 das Dreifache. Bias² 0,0013 und Varianz 0,0107 ergänzen sich dort zu 0,0120, der Bias trägt also nur noch 11 Prozent. Das stimmt hier numerisch mit dem Ein-Neuntel-Verhältnis des Proxy-Modells überein, ist aber keine theoretisch erzwungene Übereinstimmung. Innerhalb von zehn Prozent gleichwertig sind K = 12 bis 14."}),children:({aufgeloest:r})=>e.jsx(jt,{zeigeOptimum:r})}),e.jsxs(i.p,{children:[`Die obere Tafel zeigt die Daten einer Ziehung in Blau, die wahre Funktion
violett gestrichelt, die inneren Knoten als orange Marken und in Grün die
Schätzer der ersten zwölf Wiederholungen samt Mittelwert; bei `,e.jsx(n,{children:"K = 40"}),` liegt
nur noch dieser Mittelwert auf `,e.jsx(n,{children:"f"}),`. Die Balkentafel zeigt die Anteile
am MSE, die logarithmische Tafel den Verlauf aller drei Größen über `,e.jsx(n,{children:"K"}),`. Dort
fällt der rote Bias steil, die grüne Varianz steigt langsam, und die graue
Summe hat ihr Minimum dazwischen.`]})]}),`
`,e.jsxs(i.h3,{children:["Wie wählt man ",e.jsx(n,{children:"K"})," in der Praxis?"]}),`
`,e.jsxs(i.p,{children:["Wir kennen ",e.jsx(n,{children:"f"}),` nicht, also lassen sich Bias und MSE nicht ausrechnen, nur die
Residuen. Diese werden mit wachsendem `,e.jsx(n,{children:"K"}),` im Trend kleiner, bis ein
vollrangiger Fall mit `,e.jsx(n,{children:"K=n"}),` jeden Datenpunkt exakt trifft
(`,e.jsx(i.a,{href:"#env-die-residuen-fallen-nicht-immer",children:"Bemerkung 13.7.11"}),`). Die Anpassung an die Daten
belohnt Flexibilität, nicht Vorhersagegüte, und taugt nicht als
Auswahlkriterium.`]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.8.10 (Drei Auswege)",id:"env-drei-auswege",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kreuzvalidierung."}),` Wir halten einen Teil der Daten zurück, passen auf dem
Rest an und messen den Fehler auf dem zurückgehaltenen Teil. Punkte, die
nicht an der Anpassung beteiligt waren, bestrafen Überanpassung von selbst.
Gewählt wird das `,e.jsx(n,{children:"K"})," mit dem kleinsten Validierungsfehler."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Informationskriterien."}),` AIC und BIC addieren zur Anpassungsgüte, der
negativen doppelten `,e.jsx(c,{id:"likelihood",children:"Log-Likelihood"}),`, einen Strafterm, der
mit der Parameterzahl wächst. Für normalverteilte Fehler
sind sie bis auf Konstanten `,e.jsx(n,{children:"n \\log(\\mathrm{RSS}_K/n) + 2K"}),` beziehungsweise
`,e.jsx(n,{children:"n \\log(\\mathrm{RSS}_K/n) + \\log(n)\\,K"}),`; BIC bestraft schärfer, sobald
`,e.jsx(n,{children:"n \\ge 8"})," ist."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Generalisierte Kreuzvalidierung."}),` Sie schätzt den Kreuzvalidierungsfehler
aus einer einzigen Anpassung.`]}),`
`]})}),`
`,e.jsxs(k,{kind:"Definition",label:"13.8.11 (Generalisierte Kreuzvalidierung)",id:"env-generalisierte-kreuzvalidierung",children:[e.jsxs(i.p,{children:[`Mit der Residuenquadratsumme
`,e.jsx(n,{children:"\\mathrm{RSS}_K = \\sumin (\\cblue{y_i} - \\cgreen{\\wh{f}(x_i)})^2"})," heißt"]}),e.jsx(L,{tag:"13.8.8",id:"eq-generalisierte-kreuzvalidierung",children:"\\mathrm{GCV}(K) = \\frac{\\mathrm{RSS}_K / n}{\\left(1 - K/n\\right)^2}"}),e.jsxs(i.p,{children:["der ",e.jsx(i.em,{children:"GCV-Kriteriumswert"}),". Gewählt wird das ",e.jsx(n,{children:"K"}),", das ihn minimiert."]}),e.jsxs(i.p,{children:["Für unseren unbestraften KQ-Fit mit vollem Spaltenrang ist ",e.jsx(n,{children:"\\tr(\\bH)=K"}),`; für
einen allgemeinen linearen Glätter steht im Nenner die effektive
Freiheitsgradzahl `,e.jsx(n,{children:"\\tr(\\bH)"})," anstelle von ",e.jsx(n,{children:"K"}),"."]})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.8.12 (Warum der Nenner nötig ist)",id:"env-warum-der-nenner-noetig-ist",children:e.jsxs(i.p,{children:["Der Zähler fällt im Trend mit ",e.jsx(n,{children:"K"}),` und würde allein die flexibelsten Fits
bevorzugen. Der Nenner wirkt dem entgegen; er stammt aus der Kreuzvalidierung,
die jeden Punkt einmal weglässt. Je näher `,e.jsx(n,{children:"K"})," an ",e.jsx(n,{children:"n"}),` rückt, desto stärker
vergrößert er den beobachteten Fehler, denn ein Schätzer mit vielen Parametern
rechnet seine eigenen Residuen künstlich klein.`]})}),`
`,e.jsxs(H,{title:"Woher der Nenner kommt",children:[e.jsxs(i.p,{children:["Für einen linearen Schätzer ",e.jsx(n,{children:"\\cgreen{\\wh{\\by}} = \\bH\\cblue{\\by}"}),` lässt
sich das Residuum, das beim Weglassen des `,e.jsx(n,{children:"i"}),`-ten Punktes entstünde, ohne
erneute Anpassung ausrechnen: Es ist
`,e.jsx(n,{children:"(\\cblue{y_i} - \\cgreen{\\wh{f}(x_i)})/(1 - H_{ii})"}),`, was man mit der
`,e.jsx(c,{id:"sherman-morrison-formula",children:"Sherman-Morrison-Formel"}),` nachrechnet. Die
Kreuzvalidierung wird damit zu einer einzigen Formel. Ersetzt man darin alle
`,e.jsx(n,{children:"H_{ii}"})," durch ihren Mittelwert ",e.jsx(n,{children:"\\tr(\\bH)/n"}),`, so steht
`,e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"}),` da, denn nach
`,e.jsx(i.a,{href:"#env-was-die-varianzformel-erzaehlt",children:"Bemerkung 13.8.5"})," ist ",e.jsx(n,{children:"\\tr(\\bH) = K"}),"."]}),e.jsx(i.p,{children:`Die Leave-one-out-Identität hält dabei die Designmatrix und damit die Basis
fest. Würden wir nach dem Weglassen jedes Punkts auch quantilbasierte Knoten
neu bestimmen, entstünde ein anderes Verfahren, für das die Formel nicht
exakt dieselbe Kreuzvalidierung berechnet.`})]}),`
`,e.jsx(k,{kind:"Beispiel",label:"13.8.13 (Was die Kriterien in unserem Datensatz wählen)",id:"env-was-die-kriterien-in-unserem-datensatz",children:e.jsxs(i.p,{children:["Für die erste der ",e.jsx(n,{children:"200"}),` Ziehungen aus
`,e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),` werten wir
`,e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"})," für ",e.jsx(n,{children:"K = 4, \\dots, 40"}),` aus: Das Minimum
liegt bei `,e.jsx(n,{children:"K = 10"})," mit ",e.jsx(n,{children:"\\mathrm{GCV} = 0{,}0895"}),`, und AIC und BIC in den
Formen aus `,e.jsx(i.a,{href:"#env-drei-auswege",children:"Bemerkung 13.8.10"})," wählen dasselbe ",e.jsx(n,{children:"K"}),`. Der wahre MSE ist bei
`,e.jsx(n,{children:"K = 12"})," am kleinsten; ",e.jsx(n,{children:"K = 10"})," liefert ",e.jsx(n,{children:"0{,}0157"})," statt ",e.jsx(n,{children:"0{,}0120"}),`, rund
`,e.jsx(n,{children:"30"})," Prozent mehr. Für ein Kriterium, das ",e.jsx(n,{children:"f"}),` nicht kennt und mit
einer einzigen Ziehung auskommt, ist das gut. Die Kriterien schätzen den
Fehler aber nur, und auf einer anderen Ziehung fällt die Wahl anders aus.`]})}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.8.14 (Der praktische Ausweg: groß wählen und bestrafen)",id:"env-der-praktische-ausweg-gross-waehlen-und",children:e.jsxs(i.p,{children:["In der Anwendung wird ",e.jsx(n,{children:"K"}),` meist nicht feinjustiert: Wir wählen es groß,
sodass der Bias sicher klein ist, und steuern die Glattheit über einen
Strafterm. Das führt auf `,e.jsx(i.em,{children:"P-Splines"})," und ",e.jsx(i.em,{children:"additive Modelle"}),`, in R etwa mit
`,e.jsx(i.code,{children:"mgcv::gam()"}),`. Der Strafparameter ist stufenlos und lässt sich mit denselben
Kriterien feiner einstellen als die ganzzahlige Knotenzahl; die effektiven
Freiheitsgrade `,e.jsx(n,{children:"\\tr(\\bH)"})," aus ",e.jsx(i.a,{href:"#env-was-die-varianzformel-erzaehlt",children:"Bemerkung 13.8.5"}),` sind
dann keine ganze Zahl mehr und fallen mit wachsendem Strafparameter stetig.
Die gestraften Normalengleichungen stehen in
`,e.jsx(i.a,{href:"#env-penalized-splines-und-die-naehe-zu-ridge",children:"Bemerkung 13.7.14"}),`, die Glättungssplines
aus `,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"})," sind der Grenzfall ",e.jsx(n,{children:"K = n"})," mit Strafterm."]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Je größer ",e.jsx(n,{children:"K"}),", desto kleiner der Bias: Die Verzerrung fällt monoton."]}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"})," gibt eine obere Schranke der Ordnung ",e.jsx(n,{children:"O(K^{-8})"}),`, keine
monotone Folge. In unserer Simulation steigt der quadrierte Bias von
`,e.jsx(n,{children:"0{,}0344"})," bei ",e.jsx(n,{children:"K = 8"})," auf ",e.jsx(n,{children:"0{,}1174"})," bei ",e.jsx(n,{children:"K = 9"}),", weil bei ",e.jsx(n,{children:"K = 9"}),` die
inneren Knoten auf die Nullstellen von `,e.jsx(n,{children:"\\sin(3x)"}),` fallen
(`,e.jsx(i.a,{href:"#env-der-bias-faellt-nicht-monoton",children:"Bemerkung 13.8.9"}),"). Erst über größere Schritte in ",e.jsx(n,{children:"K"}),`
setzt sich der Trend durch.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Bias hängt nicht von der Rauschstärke ",e.jsx(n,{children:"\\sigma"})," ab."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler",children:"(13.8.2)"})," ist ",e.jsx(n,{children:"\\E[\\cgreen{\\wh{f}(x)}] = \\corange{\\bphi(x)}^\\top\\bB^+\\symbf{f}"}),`,
und darin kommt `,e.jsx(n,{children:"\\sigma"}),` nicht vor. Stärkeres Rauschen vergrößert die
Varianz, nicht die Verzerrung.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Die über die Entwurfsstellen gemittelte Varianz ist exakt ",e.jsx(n,{children:"\\sigma^2 K/n"}),`,
unabhängig davon, wo die Knoten liegen.`]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),`: Der Beweis braucht nur einen
KQ-Fit mit vollem Spaltenrang `,e.jsx(n,{children:"K"}),` und unkorrelierte homoskedastische Fehler,
am Ende steht `,e.jsx(n,{children:"\\tr(\\bI_K) = K"}),`, und Basis wie Knotenlage gehen nicht ein.
Unsere Simulation bestätigt es in jeder Zeile der Tabelle aus
`,e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Dann ist auch die Varianz an jeder einzelnen Stelle ",e.jsx(n,{children:"x"})," gleich ",e.jsx(n,{children:"\\sigma^2 K/n"}),"."]}),e.jsxs(i.p,{children:["Gemittelt wird über die ",e.jsx(n,{children:"n"}),` Entwurfsstellen, und dort ist die Aussage exakt.
Zwischen den Datenpunkten und an den Rändern kann die Varianz weit darüber
liegen: Bei `,e.jsx(n,{children:"K = 40"}),` misst unsere Simulation über ein feines Gitter auf
`,e.jsx(n,{children:"[0, 2\\pi]"})," eine mittlere Varianz von ",e.jsx(n,{children:"5{,}04"})," statt ",e.jsx(n,{children:"0{,}036"}),`. Punktweise
gilt nur `,e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),", und dort steht ",e.jsx(n,{children:"\\corange{\\bphi(x)}"})," im Ausdruck."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:"Im Minimum des MSE sind quadrierter Bias und Varianz allgemein gleich groß."}),e.jsxs(i.p,{children:["Schon im glatten Proxy-Modell sind am Optimum die ",e.jsx(i.em,{children:"Änderungsraten"}),`, nicht die
Beiträge gleich: `,e.jsx(n,{children:"g'(K^\\star)=0"}),` heißt, dass eine infinitesimale Verfeinerung
genauso viel Varianz kostet, wie sie an Bias spart. Für die spezielle Form
`,e.jsx(n,{children:"c_1K^{-8}+c_2K/n"}),` trägt der Bias dort ein Neuntel der Summe, eine Eigenschaft
dieses Modells und keine allgemeine MSE-Identität; im simulierten Beispiel
liegt der Anteil bei `,e.jsx(n,{children:"K = 12"}),` zufällig nahe daran
(`,e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["GCV lässt sich ausrechnen, ohne ",e.jsx(n,{children:"f"})," zu kennen."]}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"})," stehen nur die Residuenquadratsumme, ",e.jsx(n,{children:"n"})," und ",e.jsx(n,{children:"K"}),`, alles
beobachtbare Größen. Modellwahlkriterien schätzen den Vorhersagefehler, statt
ihn zu messen, und treffen das MSE-Optimum deshalb nur ungefähr: In
`,e.jsx(i.a,{href:"#env-was-die-kriterien-in-unserem-datensatz",children:"Beispiel 13.8.13"})," wählt GCV ",e.jsx(n,{children:"K = 10"}),`, während
`,e.jsx(n,{children:"K = 12"})," am besten wäre."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Die Bias-Varianz-Zerlegung und die Modellwahlkriterien behandeln
T. Hastie, R. Tibshirani und J. Friedman, The Elements of Statistical
Learning, Kapitel 7; die generalisierte Kreuzvalidierung geht auf P. Craven
und G. Wahba, Smoothing noisy data with spline functions, Numerische
Mathematik 31 (1979), 377–403, zurück, P-Splines und additive Modelle
entwickelt S. N. Wood, Generalized Additive Models: An Introduction with R,
2. Auflage 2017.`})})]})}function mt(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ss,{...s})}):Ss(s)}const{gruen:zi,orange:Fn,grau:Nn,hellgrau:_s}=ee,Un=10,yi=8,bt=["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];function Ls(s){return String(s).split("").map(i=>bt[Number(i)]??i).join("")}function si(s,i){const r=s.toFixed(i);return(r.includes(".")?r.replace(/0+$/,"").replace(/\.$/,""):r).replace(".",",")}function ge(s){if(!Number.isFinite(s))return"nicht darstellbar";if(s<1e5)return Math.round(s).toLocaleString("de-DE");const i=Math.floor(Math.log10(s)),r=s/Math.pow(10,i);return`${Math.abs(r-1)<1e-9?"":`${si(r,2)} · `}10${Ls(i)}`}function un(s){if(!Number.isFinite(s))return"nicht darstellbar";const i=[[1e15,"PB"],[1e12,"TB"],[1e9,"GB"],[1e6,"MB"],[1e3,"kB"]];for(const[r,l]of i)if(s>=r){const t=s/r;return`${t>=100?si(t,0):si(t,t>=10?1:2)} ${l}`}return`${Math.round(s)} Bytes`}const gn=380,Me=240,T={l:46,r:14,t:14,b:34};function ft(){const[s,i]=P.useState(8),[r,l]=P.useState(10),t=P.useMemo(()=>{const o=[];for(let j=1;j<=Un;j++)o.push({p:j,tensor:Math.pow(r,j),additiv:j*(r-1)+1});return o},[r]),a=t[s-1],d=8/(8+s),h=Math.pow(10,(8+s)/4),x=Math.max(1,Math.log10(t[Un-1].tensor)),m=x>9?3:x>5?2:1,b=[];for(let o=0;o<=x+1e-9;o+=m)b.push(o);const f=o=>T.l+(o-1)/(Un-1)*(gn-T.l-T.r),g=o=>Me-T.b-o/x*(Me-T.t-T.b),p=o=>t.map((j,v)=>`${v===0?"M":"L"}${f(j.p)},${g(Math.log10(o(j)))}`).join(" "),y=a.tensor*yi,S=s===1||y<1e6?"neutral":y<1e9?"warn":"fail",z=s===1?`Bei p = 1 gibt es nichts zu vergleichen: ${ge(a.tensor)} gegen ${ge(a.additiv)} Koeffizienten, beide Ansätze sind dieselbe univariate Anpassung. Der Fluch beginnt erst mit der zweiten Variablen.`:y<1e6?`Mit p = ${s} und K = ${r} kostet die Tensor-Produkt-Basis ${ge(a.tensor)} Koeffizienten (${un(y)}). Das passt noch bequem in den Speicher, und wir brauchen mindestens ebenso viele Beobachtungen, damit die Designmatrix vollen Spaltenrang haben kann.`:y<1e9?`Mit p = ${s} und K = ${r} sind es ${ge(a.tensor)} Koeffizienten (${un(y)}). Der Speicher reicht noch, die geforderten ${ge(a.tensor)} Beobachtungen sind in den meisten Anwendungen aber schon die härtere Schranke. Das additive Modell käme nach Zentrierung mit ${ge(a.additiv)} freien Parametern aus.`:`Mit p = ${s} und K = ${r} verlangt die Tensor-Produkt-Basis ${ge(a.tensor)} Koeffizienten, also ${un(y)} allein für den Koeffizienten-Tensor. Praktikabel ist das nicht mehr; das additive Modell braucht nach Zentrierung nur ${ge(a.additiv)} freie Parameter (${un(a.additiv*yi)}).`;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(ue,{children:"Stellen wir K und p ein und vergleichen die beiden Modellgrößen."}),e.jsx(ne,{label:"Dimension p",min:1,max:Un,step:1,value:s,onChange:i,accent:Fn}),e.jsx(ne,{label:"Basisfunktionen K je Variable",min:4,max:20,step:1,value:r,onChange:l,accent:Fn}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${gn} ${Me}`,width:gn,height:Me,className:"max-w-full h-auto rounded border border-slate-300 bg-[var(--w-bg)] dark:border-slate-600",children:[e.jsx("rect",{x:T.l,y:T.t,width:gn-T.l-T.r,height:Me-T.t-T.b,fill:"none",stroke:_s,strokeWidth:.8}),b.map(o=>e.jsxs("g",{children:[e.jsx("line",{x1:T.l-3,x2:gn-T.r,y1:g(o),y2:g(o),stroke:_s}),e.jsxs("text",{x:T.l-5,y:g(o)+3,textAnchor:"end",fontSize:9,fill:Nn,children:["10",Ls(o)]})]},`y${o}`)),t.map(o=>e.jsx("text",{x:f(o.p),y:Me-T.b+14,textAnchor:"middle",fontSize:9,fill:Nn,children:o.p},`x${o.p}`)),e.jsx("text",{x:(T.l+gn-T.r)/2,y:Me-4,textAnchor:"middle",fontSize:9,fill:Nn,children:"Dimension p"}),e.jsx("text",{x:12,y:(T.t+Me-T.b)/2,textAnchor:"middle",fontSize:9,fill:Nn,transform:`rotate(-90 12 ${(T.t+Me-T.b)/2})`,children:"Koeffizienten"}),e.jsx("line",{x1:f(s),x2:f(s),y1:T.t,y2:Me-T.b,stroke:Nn,strokeWidth:.8,strokeDasharray:"3 3"}),e.jsx("path",{d:p(o=>o.tensor),fill:"none",stroke:Fn,strokeWidth:2.2}),e.jsx("path",{d:p(o=>o.additiv),fill:"none",stroke:zi,strokeWidth:2.2}),e.jsx("circle",{cx:f(s),cy:g(Math.log10(a.tensor)),r:4,fill:Fn}),e.jsx("circle",{cx:f(s),cy:g(Math.log10(a.additiv)),r:4,fill:zi}),e.jsx("text",{x:T.l+6,y:T.t+12,fontSize:9,fill:Fn,children:"Tensorprodukt"}),e.jsx("text",{x:T.l+6,y:T.t+24,fontSize:9,fill:zi,children:"additiv"})]}),e.jsx("div",{className:"grow overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsxs("th",{className:"px-2 py-1 text-left",children:["p = ",s,", K = ",r]}),e.jsx("th",{className:"px-2 py-1",children:"Tensorprodukt"}),e.jsx("th",{className:"px-2 py-1",children:"additiv"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Zahl im Modell"}),e.jsx("td",{className:"px-2 py-0.5",children:ge(a.tensor)}),e.jsx("td",{className:"px-2 py-0.5",children:ge(a.additiv)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Speicher (8 Byte)"}),e.jsx("td",{className:"px-2 py-0.5",children:un(y)}),e.jsx("td",{className:"px-2 py-0.5",children:un(a.additiv*yi)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Beobachtungen mindestens"}),e.jsx("td",{className:"px-2 py-0.5",children:ge(a.tensor)}),e.jsx("td",{className:"px-2 py-0.5",children:ge(a.additiv)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"balancierte MSE-Obergrenze"}),e.jsxs("td",{className:"px-2 py-0.5",colSpan:2,children:["n",e.jsxs("sup",{children:["−",si(d,3)]})," = n",e.jsxs("sup",{children:["−8/",8+s]})]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Proxy-n (Konstante 1)"}),e.jsx("td",{className:"px-2 py-0.5",colSpan:2,children:ge(h)})]})]})]})})]}),e.jsxs(he,{kind:S,children:[z," Das ordnet die Skalierung aus"," ",xe("satz:eine-mse-obergrenze-im-multivariaten")," ein."]})]})}function Bs(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Bisher spielte alles auf einem Intervall: eine Variable, Knoten darauf, eine
Kurve. Reale Datensätze bringen mehrere Kovariablen mit, und die Übertragung
des Basisansatzes auf `,e.jsx(n,{children:"f\\colon \\R^p \\to \\R"}),` ist eine Anwendung des
`,e.jsx(c,{id:"env:tensorprodukt",children:"Tensorprodukts"})," aus ",e.jsx(i.a,{href:"?k=09-tensoren#sec-9.4",children:"Abschnitt 9.4"}),`, deren Aufwand allerdings
exponentiell in `,e.jsx(n,{children:"p"}),` wächst. Danach fassen wir das Kapitel und das Skript
zusammen.`]}),`
`,e.jsx(i.h3,{children:"Tensor-Produkt-Basen"}),`
`,e.jsxs(i.p,{children:[`Eine Basis für Funktionen mehrerer Variablen bauen wir aus den univariaten
Bausteinen: Aus `,e.jsx(n,{children:"K"}),` Basisfunktionen pro Variable bilden wir alle möglichen
Produkte.`]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.9.1 (Tensor-Produkt-Basis)",id:"env-tensor-produkt-basis",children:[e.jsxs(i.p,{children:["Für jede Variable ",e.jsx(n,{children:"x_r"})," sei ein ",e.jsx(n,{children:"K"}),`-dimensionaler Funktionenraum auf einem
Intervall `,e.jsx(n,{children:"I_r"}),` mit Basis
`,e.jsx(n,{children:"\\corange{\\phi_{r1}}, \\dots, \\corange{\\phi_{rK}}"}),` gegeben, etwa ein
B-Spline-Raum aus
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`. Die zugehörige
`,e.jsx(i.em,{children:"Tensor-Produkt-Basis"})," auf ",e.jsx(n,{children:"I_1\\times\\dots\\times I_p"})," besteht aus den ",e.jsx(n,{children:"K^p"}),`
Produkten`]}),e.jsx(_,{children:`\\corange{\\phi_{1j_1}(x_1)} \\times \\cdots \\times \\corange{\\phi_{pj_p}(x_p)},
\\qquad j_1, \\dots, j_p \\in \\{1, \\dots, K\\} ,`}),e.jsxs(i.p,{children:["und der Ansatz für ",e.jsx(n,{children:"f\\colon I_1\\times\\dots\\times I_p \\to \\R"})," lautet"]}),e.jsx(L,{tag:"13.9.1",id:"eq-tensor-produkt-basis",children:`\\cgreen{\\wh{f}(\\bx)}
= \\sum_{j_1 = 1}^{K} \\cdots \\sum_{j_p = 1}^{K} a_{j_1, \\dots, j_p}
\\bigl(\\corange{\\phi_{1j_1}(x_1)} \\times \\cdots \\times \\corange{\\phi_{pj_p}(x_p)}\\bigr)`}),e.jsxs(i.p,{children:["mit dem Koeffizienten-",e.jsx(c,{id:"tensor",children:"Tensor"})]}),e.jsx(_,{children:`\\bA = \\bigl(a_{j_1, \\dots, j_p}\\bigr)_{j_i = 1, \\dots, K,\\; i = 1, \\dots, p}
\\in \\R^{K \\times \\cdots \\times K} .`})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.9.2 (Was das Tensorkapitel dazu schon gesagt hat)",id:"env-was-kapitel-9-dazu-schon-gesagt-hat",children:e.jsxs(i.p,{children:[`Die Konstruktion ist das Tensorprodukt von Funktionenräumen aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.4",children:"Abschnitt 9.4"}),`: Produkte von Basiselementen bilden wieder eine
Basis, und die `,e.jsx(c,{id:"dimension",children:"Dimensionen"})," multiplizieren sich, für ",e.jsx(n,{children:"p"}),`
Faktoren also zu `,e.jsx(n,{children:"K^p"}),". Dort fiel auch schon der Name für die Folgen, ",e.jsx(i.em,{children:`Fluch
der Dimensionalität`}),` (curse of dimensionality). Anschaulich legen wir ein
Gitter über den `,e.jsx(n,{children:"p"}),`-dimensionalen Raum, das mit jeder Variablen um den Faktor
`,e.jsx(n,{children:"K"})," wächst."]})}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.9.3 (Es bleibt ein lineares Kleinste-Quadrate-Problem)",id:"env-es-bleibt-ein-lineares-kleinste-quadrate",children:[e.jsxs(i.p,{children:["Der Ansatz ",e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"}),` ist linear in den Koeffizienten.
Nummerieren wir die `,e.jsx(n,{children:"K^p"})," Indexkombinationen ",e.jsx(n,{children:"(j_1, \\dots, j_p)"}),` durch, so wird
aus `,e.jsx(n,{children:"\\bA"})," ein Vektor ",e.jsx(n,{children:"\\cgreen{\\ba} \\in \\R^{K^p}"}),`, und mit der Designmatrix
`,e.jsx(n,{children:"\\corange{\\bB} \\in \\R^{n \\times K^p}"}),", deren Zeilen die ",e.jsx(n,{children:"K^p"}),` Produkte an der
Beobachtungsstelle `,e.jsx(n,{children:"\\cblue{\\bx_i}"})," enthalten, steht wieder"]}),e.jsx(_,{children:"\\min_{\\cgreen{\\ba}} \\left\\| \\cblue{\\by} - \\corange{\\bB}\\,\\cgreen{\\ba} \\right\\|_2^2"}),e.jsxs(i.p,{children:["da, das Problem aus ",e.jsx(c,{id:"env:glaettung-ist-ein-lineares-kleinste",href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),` mit mehr
Spalten, lösbar über die `,e.jsx(c,{id:"normal-equations",children:"Normalengleichungen"}),` oder
besser über eine `,e.jsx(c,{id:"env:qr-zerlegung",children:"QR-Zerlegung"})," (",e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`). Vollen Spaltenrang kann
`,e.jsx(n,{children:"\\corange{\\bB}"})," aber nur haben, wenn ",e.jsx(n,{children:"n \\ge K^p"})," ist: Mit ",e.jsx(n,{children:"K = 10"}),`
Basisfunktionen je Variable und `,e.jsx(n,{children:"p = 5"}),` Kovariablen brauchen wir mindestens
`,e.jsx(n,{children:"100\\,000"})," Beobachtungen, bevor die Anpassung überhaupt eindeutig ist."]})]}),`
`,e.jsx(i.h3,{children:"Der Fluch der Dimensionalität"}),`
`,e.jsxs(i.p,{children:["Drei Größen wachsen exponentiell in ",e.jsx(n,{children:"p"}),": der Speicher für ",e.jsx(n,{children:"\\bA"}),`, der Aufwand
einer Auswertung und die Datenmenge für eine feste Genauigkeit. Jede für sich
macht den vollen Tensoransatz jenseits weniger Variablen unbrauchbar.`]}),`
`,e.jsxs(k,{kind:"Beispiel",label:"13.9.4 (Zehn Basisfunktionen je Variable)",id:"env-zehn-basisfunktionen-je-variable",children:[e.jsxs(i.p,{children:["Wir rechnen mit ",e.jsx(n,{children:"K = 10"}),` und speichern jeden Koeffizienten als
`,e.jsx(c,{id:"floating-point",children:"Gleitkommazahl"})," doppelter Genauigkeit, also mit ",e.jsx(n,{children:"8"})," Byte."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Dimension ",e.jsx(n,{children:"p"})]}),e.jsxs(i.th,{style:{textAlign:"right"},children:["Koeffizienten ",e.jsx(n,{children:"K^p"})]}),e.jsx(i.th,{style:{textAlign:"right"},children:"Speicher"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"80"})," Bytes"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"100"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"800"})," Bytes"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"1000"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"8"})," kB"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"100\\,000"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"800"})," kB"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{10}"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"\\cred{80}"})," GB"]})]})]})]}),e.jsxs(i.p,{children:["Bis ",e.jsx(n,{children:"p = 5"})," ist der Koeffizienten-Tensor handlich, bei ",e.jsx(n,{children:"p = 10"}),` passt er in
keinen üblichen Arbeitsspeicher (dezimale Präfixe, `,e.jsx(n,{children:"1"})," kB ",e.jsx(n,{children:"= 1000"}),` Bytes). Der
Sprung von `,e.jsx(n,{children:"p = 5"})," auf ",e.jsx(n,{children:"p = 10"})," ist ein Faktor ",e.jsx(n,{children:"10^5"}),`, allein durch fünf
weitere Variablen.`]})]}),`
`,e.jsxs(i.p,{children:["Der Datenbedarf wächst genauso; mit der Rechnung aus ",e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),` lässt
er sich direkt hinschreiben.`]}),`
`,e.jsxs(k,{kind:"Satz",label:"13.9.5 (Eine MSE-Obergrenze im Multivariaten)",id:"env-eine-mse-obergrenze-im-multivariaten",children:[e.jsxs(i.p,{children:["Wir beobachten ",e.jsx(n,{children:"\\cblue{y_i} = f(\\cblue{\\bx_i}) + \\cred{\\epsilon_i}"})," an ",e.jsx(n,{children:"n"}),`
festen Stellen mit unkorrelierten, homoskedastischen Fehlern vom Mittelwert
null und passen
`,e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"}),` mit kubischen Spline-Bausteinen auf einem gleichmäßigen Gitter an.
Hat `,e.jsx(n,{children:"\\corange{\\bB}"})," vollen Spaltenrang ",e.jsx(n,{children:"K^p"}),` und besitzt die verwendete
Tensorprodukt-Splinefolge für `,e.jsx(n,{children:"f"}),` eine gleichmäßige Approximationsschranke
`,e.jsx(n,{children:"\\inf_{s\\in\\Fcal_K}\\|f-s\\|_\\infty\\le C K^{-4}"}),` (etwa unter den üblichen
Glattheitsannahmen an die partiellen Ableitungen vierter Ordnung), so gilt
für den an den Entwurfsstellen gemittelten Fehler`]}),e.jsx(L,{tag:"13.9.2",id:"eq-eine-mse-obergrenze-im-multivariaten",children:`\\MSE(\\cgreen{\\wh{f}})
\\;\\le\\; \\underbrace{C_1K^{-8}}_{\\cred{\\text{Bias}^2\\text{-Schranke}}}
+ \\underbrace{\\frac{\\sigma^2 K^p}{n}}_{\\text{Varianz}}`}),e.jsxs(i.p,{children:["mit einer Konstante ",e.jsx(n,{children:"C_1>0"}),`. Die Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"})," balanciert die rechte Seite und liefert die Garantie"]}),e.jsx(L,{tag:"13.9.3",id:"eq-eine-mse-obergrenze-im-multivariaten-2",children:"\\MSE(\\cgreen{\\wh{f}}) = O\\bigl(n^{-8/(8+p)}\\bigr) ."})]}),`
`,e.jsxs(H,{title:"Wie sich die Rate im Multivariaten ausbalanciert",children:[e.jsxs(i.p,{children:["Der Beweis ist die Rechnung aus ",e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," mit ",e.jsx(n,{children:"K^p"})," statt ",e.jsx(n,{children:"K"}),`
Spalten: Varianzsatz übernehmen, Bias-Schranke voraussetzen, Summe
minimieren, einsetzen.`]}),e.jsxs(me,{children:[e.jsx(F,{why:e.jsxs(e.Fragment,{children:["am Ende des Beweises steht ",e.jsx(n,{children:"\\tr(\\bI_{K^p}) = K^p"})," statt ",e.jsx(n,{children:"\\tr(\\bI_K) = K"})]}),children:e.jsxs(i.p,{children:["Der Varianzterm ist ",e.jsx(c,{id:"env:gemittelte-varianz-eines-linearen",href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"}),`. Dessen Beweis benutzt vom
Schätzer nur, dass er die Kleinste-Quadrate-Anpassung an eine Designmatrix
mit vollem Spaltenrang ist; wie viele Spalten sie hat und wie ihre Einträge
zustande kommen, geht nicht ein. Hier sind es `,e.jsx(n,{children:"K^p"}),` Spalten, also ist die
gemittelte Varianz `,e.jsx(n,{children:"\\sigma^2 K^p / n"}),"."]})}),e.jsx(F,{why:e.jsxs(e.Fragment,{children:["dieselbe Vergleichsrechnung wie in ",e.jsx(c,{id:"env:der-bias-ist-der-approximationsfehler",href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),"; die genaue Herleitung der Tensorprodukt-Schranke gehört zur mehrdimensionalen Approximationstheorie und wird hier als Voraussetzung sichtbar gemacht"]}),children:e.jsxs(i.p,{children:[`Für den Bias verwenden wir die im Satz ausdrücklich vorausgesetzte
Tensorprodukt-Approximation. Der rauschfreie KQ-Fit ist an den
Entwurfsstellen mindestens so gut wie dieser Vergleichsspline, also ist der
gemittelte quadrierte Bias höchstens `,e.jsx(n,{children:"C_1K^{-8}"}),"."]})}),e.jsxs(F,{why:e.jsxs(e.Fragment,{children:["Multiplikation mit ",e.jsx(n,{children:"K^9 n/(c_2 p)"})," sammelt alle ",e.jsx(n,{children:"K"}),"-Potenzen auf einer Seite; ",e.jsx(n,{children:"g"})," fällt für kleine und wächst für große ",e.jsx(n,{children:"K"}),", die einzige positive Nullstelle ist also das Minimum"]}),children:[e.jsxs(i.p,{children:[`Wir minimieren nun die bewiesene Obergrenze
`,e.jsx(n,{children:"g(K) = c_1 K^{-8} + c_2 K^p / n"})," mit Konstanten ",e.jsx(n,{children:"c_1, c_2 > 0"}),`. Ableiten
und Nullsetzen gibt`]}),e.jsx(_,{children:`g'(K) = -8 c_1 K^{-9} + \\frac{c_2\\, p\\, K^{p-1}}{n} \\overset{!}{=} 0
\\quad\\Longrightarrow\\quad
K^{8+p} = \\frac{8 c_1 n}{c_2\\, p} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"K^\\star \\sim n^{1/(8+p)}"}),"."]})]}),e.jsxs(F,{why:e.jsx(e.Fragment,{children:e.jsx(n,{children:"p/(8+p) - 1 = (p - 8 - p)/(8+p) = -8/(8+p)"})}),children:[e.jsxs(i.p,{children:["Einsetzen von ",e.jsx(n,{children:"K^\\star"})," in beide Summanden liefert"]}),e.jsx(_,{children:`c_1 (K^\\star)^{-8} \\sim n^{-8/(8+p)},
\\qquad
\\frac{c_2 (K^\\star)^p}{n} \\sim n^{p/(8+p) - 1} = n^{-8/(8+p)} ,`}),e.jsxs(i.p,{children:["und damit ",e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten-2",children:"(13.9.3)"}),"."]})]})]})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.9.6 (Was die Rate über Datenmengen sagt)",id:"env-was-die-rate-ueber-datenmengen-sagt",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten-2",children:"(13.9.3)"}),` ist eine Obergrenze bei der Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"}),", nicht der Fehler für jedes ",e.jsx(n,{children:"K"}),`. Als grobe
Planungsheuristik setzen wir die in der `,e.jsx(n,{children:"\\mathcal O"}),`-Notation verborgene
Konstante gleich eins. Aus `,e.jsx(n,{children:"n^{-8/(8+p)} \\le \\varepsilon"}),` folgt dann
`,e.jsx(n,{children:"n \\ge \\varepsilon^{-(8+p)/8}"}),", für ",e.jsx(n,{children:"\\varepsilon = 0{,}01"}),` also
`,e.jsx(n,{children:"n \\ge 10^{(8+p)/4}"}),"."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Dimension ",e.jsx(n,{children:"p"})]}),e.jsx(i.th,{style:{textAlign:"right"},children:"Rate"}),e.jsxs(i.th,{style:{textAlign:"right"},children:["Proxy-",e.jsx(n,{children:"n"})," bei Konstante ",e.jsx(n,{children:"1"})]})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/9}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{2{,}25} \\approx 178"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/10} = n^{-0{,}8}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{2{,}5} \\approx 316"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/13}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{3{,}25} \\approx 1778"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/18}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{4{,}5} \\approx 31\\,623"})})]})]})]}),e.jsxs(i.p,{children:[`Die dritte Spalte ist eine Orientierung, keine Stichprobenplanung, denn die
entscheidenden Konstanten hängen am Problem. Ihre Botschaft steckt im
Exponenten `,e.jsx(n,{children:"(8+p)/4"}),`: Jede weitere Variable multipliziert die nötige
Datenmenge mit `,e.jsx(n,{children:"10^{1/4} \\approx 1{,}78"}),", bei ",e.jsx(n,{children:"\\varepsilon = 10^{-4}"}),` sogar
mit `,e.jsx(n,{children:"\\varepsilon^{-1/8} \\approx 3{,}16"}),`. Der Datenbedarf wächst also
exponentiell in `,e.jsx(n,{children:"p"}),", wie der Speicherbedarf."]})]}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.9.7 (Auch die Auswertung kostet)",id:"env-auch-die-auswertung-kostet",children:e.jsxs(i.p,{children:["Eine Auswertung von ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` kostet für eine Basis ohne besondere
Struktur `,e.jsx(n,{children:"O(K^p)"}),", denn die Summe in ",e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"})," hat ",e.jsx(n,{children:"K^p"}),`
Summanden. Bei `,e.jsx(c,{id:"env:erweiterte-knotenfolge-und-b-splines",children:"B-Splines"}),` sind an einer festen Stelle je Variable höchstens
`,e.jsx(n,{children:"q+1"})," Basisfunktionen von null verschieden (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`), im Produkt also
höchstens `,e.jsx(n,{children:"(q+1)^p"})," Summanden, für ",e.jsx(n,{children:"p = 10"})," und ",e.jsx(n,{children:"q = 3"}),` noch
`,e.jsx(n,{children:"4^{10} = 1\\,048\\,576"})," statt ",e.jsx(n,{children:"10^{10}"}),`. Das spart fünf Größenordnungen, aber
`,e.jsx(n,{children:"4^p"})," wächst ebenfalls exponentiell, und gespeichert werden müssen die ",e.jsx(n,{children:"K^p"}),`
Koeffizienten ohnehin.`]})}),`
`,e.jsx(i.h3,{children:"Additive Modelle statt voller Produkte"}),`
`,e.jsxs(i.p,{children:["Der Ausweg ist keine bessere Numerik, sondern eine Annahme über ",e.jsx(n,{children:"f"}),`. Wenn wir
darauf verzichten, beliebige Wechselwirkungen zwischen den Variablen
darzustellen, schrumpft der `,e.jsx(c,{id:"env:ansatzraum-basisdarstellung",children:"Ansatzraum"})," stark."]}),`
`,e.jsxs(k,{kind:"Definition",label:"13.9.8 (Additives Modell)",id:"env-additives-modell",children:[e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"additives Regressionsmodell"}),` setzt statt des vollen Tensorprodukts eine
Summe univariater Funktionen an:`]}),e.jsx(L,{tag:"13.9.4",id:"eq-additives-modell",children:"\\cgreen{\\wh{f}(\\bx)} = \\beta_0 + \\sum_{i=1}^{p} \\cgreen{f_i(x_i)} ,"}),e.jsxs(i.p,{children:["wobei jede Komponente ",e.jsx(n,{children:"\\cgreen{f_i}"})," in einem eigenen ",e.jsx(n,{children:"K"}),`-dimensionalen
Ansatzraum liegt, etwa dem der kubischen Splines aus
`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"."]}),e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"generalisiertes additives Modell"}),` (GAM) erweitert diese Form wie ein
generalisiertes lineares Modell um eine Verteilung für `,e.jsx(n,{children:"Y\\mid X"}),` und eine
Linkfunktion `,e.jsx(n,{children:"g"}),":"]}),e.jsx(_,{children:`g\\!\\left(\\E[Y\\mid X=\\bx]\\right)
= \\beta_0 + \\sum_{i=1}^p f_i(x_i).`}),e.jsx(i.p,{children:"Für Gaußfehler und den Identitätslink ergibt sich das additive Modell oben."})]}),`
`,e.jsxs(k,{kind:"Bemerkung",label:"13.9.9 (Vorteile und Grenzen additiver Modelle)",id:"env-der-gewinn-und-was-er-kostet",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Skalierbar."})," Zu den ",e.jsx(n,{children:"pK"}),` Komponenten-Koeffizienten kommt der Achsenabschnitt
`,e.jsx(n,{children:"\\beta_0"}),", zusammen ",e.jsx(n,{children:"pK+1"})," statt ",e.jsx(n,{children:"K^p"}),`. Jede Komponente ist aber nur bis auf
eine additive Konstante bestimmt, denn eine Konstante ließe sich von
`,e.jsx(n,{children:"\\cgreen{f_1}"})," nach ",e.jsx(n,{children:"\\cgreen{f_2}"})," verschieben, ohne ",e.jsx(i.a,{href:"#eq-additives-modell",children:"(13.9.4)"}),` zu
ändern; mit einer Zentrierungsbedingung je Komponente (etwa: ihre Werte an den
Beobachtungsstellen summieren sich zu null) bleiben `,e.jsx(n,{children:"p(K-1)+1 = O(pK)"}),` frei
wählbare Koeffizienten. Für `,e.jsx(n,{children:"p = K = 10"})," sind das ",e.jsx(n,{children:"91"})," statt ",e.jsx(n,{children:"10^{10}"}),`, ein
Faktor von gut `,e.jsx(n,{children:"10^8"}),": Aus dem exponentiellen Wachstum in ",e.jsx(n,{children:"p"}),` wird ein
lineares.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Interpretierbar."}),` Jede Komponente ist eine Funktion einer einzigen Variablen
und lässt sich als Kurve zeichnen; beim vollen Tensorprodukt ist der Effekt
einer Kovariablen nur gemeinsam mit allen anderen definiert.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Einschränkung."}),` Wechselwirkungen fallen weg: Ein GAM kann nicht
darstellen, dass die Wirkung von `,e.jsx(n,{children:"x_1"})," vom Wert von ",e.jsx(n,{children:"x_2"}),` abhängt. Wo einzelne
Wechselwirkungen gebraucht werden, nehmen wir sie gezielt als
Tensorprodukt-Term für zwei oder drei Variablen dazu.`]}),e.jsxs(i.p,{children:["In R ist ",e.jsx(i.code,{children:"mgcv::gam()"}),` die Standardimplementierung, mit automatischer Wahl
der Glättungsparameter über die Kriterien aus `,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),"."]})]}),`
`,e.jsxs(ae,{title:"Koeffizientenzahl von Tensorprodukt und additivem Modell",children:[e.jsxs(i.p,{children:["Die Tabelle oben rechnet mit ",e.jsx(n,{children:"K = 10"}),`. Wie groß wird der Koeffizienten-Tensor,
wenn wir zwei Variablen weglassen, dafür aber doppelt so fein auflösen?`]}),e.jsx(tn,{frage:"Schätzen wir den Speicherbedarf in GB für K = 20 und p = 8.",loesung:205,toleranz:25,einheit:"GB",verdeckt:e.jsx(i.p,{children:"20⁸ = 2,56 · 10¹⁰ Koeffizienten zu je 8 Byte sind rund 205 GB – mehr als die 80 GB der Tabellenzeile für K = 10 und p = 10. Zwei Variablen weniger sparen hier weniger, als die feinere Auflösung kostet: Die Verdopplung von K verdoppelt alle acht Faktoren von K⁸, das Weglassen spart nur zwei Faktoren 10."}),children:e.jsx(ft,{})}),e.jsxs(i.p,{children:["Über der Dimension ",e.jsx(n,{children:"p"})," mit logarithmischer senkrechter Achse sind die ",e.jsx(n,{children:"K^p"}),`
Koeffizienten des vollen Tensorprodukts (orange) eine Gerade, die `,e.jsx(n,{children:"p(K-1)+1"}),`
freien Parameter des zentrierten additiven Modells (grün) eine flach liegende
Kurve. Der `,e.jsx(n,{children:"K"}),"-Regler kippt die orange Gerade, weil ",e.jsx(n,{children:"K"}),` in ihrer Steigung
sitzt, und verschiebt die grüne Kurve kaum. Die Werttafel rechnet
Speicherbedarf, Mindestzahl an Beobachtungen und Konvergenzrate zum
eingestellten Zustand mit.`]})]}),`
`,e.jsx(H,{title:"Additivität ist mehr als ein Verzicht",children:e.jsx(k,{kind:"Bemerkung",label:"13.9.10 (Warum das mehr ist als eine Notlösung)",id:"env-warum-das-mehr-ist-als-eine-notloesung",children:e.jsxs(i.p,{children:["Die Additivität sieht nach einem Verzicht aus. Ist ",e.jsx(n,{children:"f"}),` tatsächlich
additiv und bleibt `,e.jsx(n,{children:"p"}),` fest, so ist sie mehr als das: Unter den üblichen
Regularitäts- und Designannahmen lassen sich die einzelnen Komponenten mit
derselben eindimensionalen Rate schätzen wie eine univariate Funktion; `,e.jsx(n,{children:"p"}),`
geht dann in die Konstante ein. Für vierfach glatte Komponenten wird aus der
vollen Rate `,e.jsx(n,{children:"n^{-8/(8+p)}"})," wieder die univariate Rate ",e.jsx(n,{children:"n^{-8/9}"}),`. Der Fluch
der Dimensionalität ist damit nicht bekämpft, sondern durch eine
Strukturannahme umgangen. Entsprechende Optimalitätsresultate gehen auf
C. J. Stone (1985) zurück und sind ein Grund, warum additive Modelle in der
Statistik so verbreitet sind.`]})})}),`
`,e.jsxs(H,{title:"Radiale Basisfunktionen und Splines im maschinellen Lernen",children:[e.jsxs(i.p,{children:[`Tensor-Produkt-Basis und additives Modell behandeln die Variablen getrennt
und setzen die Bausteine anschließend zusammen. Für Stellen, die als
verstreute Punkte im `,e.jsx(n,{children:"\\R^p"}),` anfallen, passt das schlecht: Messstationen auf
einer Landkarte liegen nicht auf einem Gitter, und ein Gitter, das sie alle
abdeckt, wäre in weiten Teilen leer. Die übliche Antwort sind `,e.jsx(i.em,{children:`radiale
Basisfunktionen`}),` (radial basis functions), die statt eines Gitters nur Zentren
brauchen und den Ansatz linear in den Koeffizienten lassen.`]}),e.jsxs(k,{kind:"Bemerkung",label:"13.9.11 (Radiale Basisfunktionen)",id:"env-radiale-basisfunktionen",children:[e.jsxs(i.p,{children:["Eine radiale Basisfunktion hängt nur vom Abstand zu einem Zentrum ",e.jsx(n,{children:"\\bc_k"})," ab,"]}),e.jsx(_,{children:`\\corange{\\phi_k(\\bx)} = \\rho\\left(\\left\\| \\bx - \\bc_k \\right\\|\\right),
\\qquad \\text{etwa mit } \\rho(r) = \\exp\\left(-r^2 / (2h^2)\\right),`}),e.jsxs(i.p,{children:[`oft dienen die Datenpunkte selbst als Zentren. Es ist wieder das
`,e.jsx(c,{id:"env:kleinste-quadrate-problem-kq-problem",children:"Kleinste-Quadrate-Problem"})," aus ",e.jsx(i.a,{href:"#env-es-bleibt-ein-lineares-kleinste-quadrate",children:"Bemerkung 13.9.3"}),`,
nur mit anderen Spalten.`]}),e.jsxs(i.p,{children:[`Diese Freiheit hat eine Kehrseite: Die Basismatrix ist im Allgemeinen voll
besetzt, denn eine Gaußglocke wird nirgends exakt null, und die Lokalität der
B-Splines aus `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` geht verloren, solange wir nicht eigens Kerne mit
beschränktem Träger wählen. Der
Bandbreitenparameter `,e.jsx(n,{children:"h"}),` spielt dabei die Rolle des Knotenabstands: klein
heißt flexibel und unruhig, groß heißt glatt und träge.`]})]}),e.jsxs(i.p,{children:[`Zwei aktuelle Verwendungen benutzen Splines als Modellbaustein, nicht als
Interpolationsverfahren. `,e.jsx(i.em,{children:"Kolmogorow-Arnold-Netze"}),` ersetzen die feste
Aktivierungsfunktion eines neuronalen Netzes durch lernbare B-Splines
(`,e.jsx(i.a,{href:"#env-interpolation-im-maschinellen-lernen-und",children:"Bemerkung 13.1.6"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Normalizing Flows"}),` bauen eine komplizierte Wahrscheinlichkeitsverteilung aus
einer einfachen auf, indem sie eine invertierbare Abbildung dazwischenschalten.
Die Dichte der transformierten Größe enthält den Betrag der
`,e.jsx(c,{id:"determinant",children:"Determinante"})," ihrer ",e.jsx(c,{id:"env:jacobimatrix",children:"Jacobimatrix"}),`
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.3",children:"Abschnitt 10.3"}),`), und deshalb muss die
Abbildung zweierlei können: sich invertieren und ihre Determinante effizient
ausrechnen lassen. Geeignet parametrisierte `,e.jsx(i.em,{children:"streng monotone"}),` Splines leisten
beides: Strikte Monotonie macht die eindimensionale Abbildung bijektiv, und
ihre Ableitung steht stückweise sofort da. Häufig verwendet werden dafür
monotone rationale quadratische Splines.`]})]}),`
`,e.jsx(i.h3,{children:"Was vom Kapitel bleibt"}),`
`,e.jsx(i.p,{children:`Am Anfang stand die Aufgabe, eine Funktion zu finden, die zu gegebenen Daten
passt; am Ende steht ein lineares Gleichungssystem, dessen Matrix wir selbst
wählen. Das Kapitel war eine Reihe von Entscheidungen über diese Matrix und
ihre Folgen.`}),`
`,e.jsx(k,{kind:"Bemerkung",label:"13.9.12 (Kernkonzepte des Kapitels)",id:"env-multivariat-kernkonzepte-des-kapitels",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Drei Aufgaben, ein Rechenweg."}),` Approximation misst global in einer
`,e.jsx(c,{id:"norm",children:"Norm"}),`, Interpolation verlangt exakte Treffer an den Daten,
Glättung lässt Residuen zu, weil die Daten Rauschen tragen
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`). Die Interpolationsbedingung allein legt nichts fest:
Mit `,e.jsx(n,{children:"\\cgreen{p}"})," ist auch ",e.jsx(n,{children:"\\cgreen{p} + g"}),` ein Interpolant, sobald
`,e.jsx(n,{children:"g(x_i) = 0"})," gilt (",e.jsx(c,{id:"env:gestalt-aller-interpolanten",href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Die Basisdarstellung macht daraus ein Gleichungssystem."}),` Mit
`,e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\sum_k a_k \\corange{\\phi_k}"}),` wird die Interpolation zu
`,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," mit ",e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k(x_i)}"}),`
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`). Der Ansatzraum bestimmt die Kurve, das
Basissystem nur Koeffizienten, Kondition und Rechenweg, die Knotenlage die
Güte zwischen den Daten (`,e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`,
`,e.jsx(i.a,{href:"#env-der-ausweg-orthogonalisierte-basen",children:"Bemerkung 13.3.11"}),`,
`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Polynome sind theoretisch einfach und numerisch problematisch."}),` Durch
`,e.jsx(n,{children:"n"})," Punkte läuft genau ein Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"}),`
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`). Die Monombasis hat eine exponentiell
wachsende `,e.jsx(c,{id:"condition-number",children:"Kondition"}),`, und selbst für beliebig oft
differenzierbares `,e.jsx(n,{children:"f"}),` muss die Folge der Interpolanten an gleichmäßig
verteilten Knoten nicht konvergieren (Runge-Phänomen).`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Splines halten den Grad klein und die Wirkung lokal."}),` Polynome vom
festen Grad `,e.jsx(n,{children:"q"}),", ",e.jsx(n,{children:"\\Ccal^{q-1}"}),`-glatt zusammengesetzt, bilden den Raum
`,e.jsx(n,{children:"\\Scal_q"})," der Dimension ",e.jsx(n,{children:"m + q"})," (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`). Die B-Spline-Basis hat
lokale Träger und macht `,e.jsx(n,{children:"\\bB"})," zu einer ",e.jsx(c,{id:"sparse-matrix",children:"dünn besetzten"}),`
Bandmatrix, lösbar in `,e.jsx(n,{children:"O(N q^2)"})," statt ",e.jsx(n,{children:"O(N^3)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Minimale Krümmung."})," Unter allen ",e.jsx(n,{children:"\\Ccal^2"}),`-Interpolanten minimiert der
`,e.jsx(i.em,{children:"natürliche"})," kubische Spline ",e.jsx(n,{children:"J(f) = \\int (f'')^2 \\dx"}),`; der Beweis stützt
sich auf die Randbedingungen `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),`
(`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Approximationsordnung."})," Für ",e.jsx(n,{children:"f \\in \\Ccal^4"}),` ist der Fehler des
interpolierenden kubischen Splines durch
`,e.jsx(n,{children:"C \\corange{h}^4 \\max_x \\left| f^{(4)}(x) \\right|"}),` beschränkt, mit
passenden Randbedingungen mit `,e.jsx(n,{children:"C = 5/384"}),`; stückweise linear liefert nur
`,e.jsx(n,{children:"\\corange{h}^2"})," (",e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Glättung statt Interpolation."}),` Mit einem vollrangigen kleinen
Ansatzraum (`,e.jsx(n,{children:"K<n"}),`) wird die Anpassung zum Kleinste-Quadrate-Problem
`,e.jsx(n,{children:"\\min_{\\ba} \\left\\| \\cblue{\\by} - \\corange{\\bB}\\ba \\right\\|_2^2"}),`; der
zweite Weg bestraft in einem großen Raum die Krümmung mit
`,e.jsx(n,{children:"\\lambda \\int (g'')^2 \\dx"})," (",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Bias-Varianz."})," Der gemittelte quadrierte Bias ist durch ",e.jsx(n,{children:"C_1K^{-8}"}),`
beschränkt, die gemittelte Varianz ist exakt `,e.jsx(n,{children:"\\sigma^2 K/n"}),`, und unter der
Proxy-Annahme `,e.jsx(n,{children:"\\mathrm{Bias}^2\\asymp c_1K^{-8}"}),` balanciert
`,e.jsx(n,{children:"K\\asymp n^{1/9}"})," beide Terme. In der Praxis wird ",e.jsx(n,{children:"K"}),` über
Kreuzvalidierung, AIC, BIC oder GCV gewählt (`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Fluch der Dimensionalität."})," Die Tensor-Produkt-Basis braucht ",e.jsx(n,{children:"K^p"}),`
Koeffizienten und garantiert nur die Rate `,e.jsx(n,{children:"O(n^{-8/(8+p)})"}),`. Additive
Modelle kommen mit `,e.jsx(n,{children:"O(pK)"}),` Koeffizienten aus und sind interpretierbar,
verzichten aber auf Wechselwirkungen.`]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest zum Kapitel"}),`
`,e.jsxs(Re,{children:[e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit der Interpolant zu ",e.jsx(n,{children:"n"}),` Datenpunkten eindeutig ist, genügt es, genau
`,e.jsx(n,{children:"K = n"})," Basisfunktionen zu wählen."]}),e.jsxs(i.p,{children:["Die Zahl allein reicht nicht, ",e.jsx(n,{children:"\\bB"}),` muss auch invertierbar sein. Mit
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"})," und den Stellen ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"1"}),", ",e.jsx(n,{children:"2"}),` ist die dritte
Spalte die Summe der ersten beiden, also `,e.jsx(n,{children:"\\det \\bB = 0"})," (",e.jsx(c,{id:"env:wann-k-zahlen-eine-funktion-festlegen",href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`,
`,e.jsx(i.a,{href:"#env-das-wort-basisfunktion-traegt-eine",children:"Bemerkung 13.2.5"}),`). Mit der Monombasis dagegen, also mit Polynomen vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),", steht dort die Vandermonde-Matrix mit ",e.jsx(n,{children:"\\det \\bB = 2"}),`, und
`,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"})," sichert die Eindeutigkeit."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gibt ",e.jsx(c,{id:"smooth-function",children:"beliebig oft differenzierbare"}),` Funktionen, für
die der größte Fehler
der Interpolation an gleichmäßig verteilten Knoten über alle Grenzen wächst,
obwohl der Fehler an den Knoten selbst stets null ist.`]}),e.jsxs(i.p,{children:["Das ist Runges Funktion ",e.jsx(n,{children:"f(x) = 1/(1 + 25x^2)"})," auf ",e.jsx(n,{children:"[-1, 1]"}),`
(`,e.jsx(i.a,{href:"#env-runge-1901",children:"Beispiel 13.3.14"}),"). Nachgerechnet steigt der größte Fehler von ",e.jsx(n,{children:"0{,}44"}),` bei
`,e.jsx(n,{children:"n = 5"})," über ",e.jsx(n,{children:"7{,}2"})," bei ",e.jsx(n,{children:"n = 15"})," auf ",e.jsx(n,{children:"257"})," bei ",e.jsx(n,{children:"n = 25"}),`, während die
Interpolationsbedingung an jedem einzelnen Knoten exakt erfüllt bleibt.
Interpolation sagt nur etwas über die Stützstellen aus.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`In der Basismatrix zu kubischen B-Splines stehen in jeder Zeile höchstens
vier Einträge ungleich null.`}),e.jsxs(i.p,{children:["An jeder Stelle sind höchstens ",e.jsx(n,{children:"q + 1 = 4"}),` der Basisfunktionen von null
verschieden, denn `,e.jsx(n,{children:"\\corange{B_k^{(q)}}"}),` verschwindet außerhalb von
`,e.jsx(n,{children:"[\\corange{\\tau_k}, \\corange{\\tau_{k+q+1}}]"})," (",e.jsx(c,{id:"env:die-b-splines-sind-eine-basis",href:"#env-die-b-splines-sind-eine-basis",children:"Satz 13.4.9"}),"). Für ",e.jsx(n,{children:"20"}),`
Stützstellen und `,e.jsx(n,{children:"20"}),` kubische B-Splines haben wir das nachgezählt: nirgends
mehr als vier, an den Rändern weniger. Daraus wird die Bandstruktur und mit
ihr der Aufwand `,e.jsx(n,{children:"O(N q^2)"})," statt ",e.jsx(n,{children:"O(N^3)"}),", bei ",e.jsx(n,{children:"N = 1000"})," und ",e.jsx(n,{children:"q = 3"}),` ein
Verhältnis von `,e.jsx(n,{children:"N^2/q^2 \\approx 111\\,000"})," (",e.jsx(i.a,{href:"#env-bandstruktur-und-aufwand",children:"Bemerkung 13.4.14"}),")."]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`Zwei verschiedene Basen desselben Ansatzraums liefern denselben
Interpolanten, können aber Basismatrizen sehr unterschiedlicher Kondition
haben.`}),e.jsxs(i.p,{children:[`Der Ansatzraum bestimmt die Kurve, die Basis nur die Koeffizienten: Monom-
und Newton-Basis geben beide `,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = 1 + x^2"}),`, einmal mit
`,e.jsx(n,{children:"\\cgreen{\\ba = (1,0,1)^\\top}"}),` und einmal mit
`,e.jsx(n,{children:"\\cgreen{\\ba = (1,1,1)^\\top}"})," (",e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`). An der Kondition ändert
ein solcher Wechsel dagegen sehr viel, bei `,e.jsx(n,{children:"n = 20"}),` gleichmäßig verteilten
Stellen um zwölf Zehnerpotenzen (`,e.jsx(i.a,{href:"#env-der-ausweg-orthogonalisierte-basen",children:"Bemerkung 13.3.11"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Der Übergang von der Monombasis zu den kubischen B-Splines ist ein
Basiswechsel im Sinn der vorigen Aussage, der Interpolant bleibt also
derselbe.`}),e.jsxs(i.p,{children:["Hier wechselt nicht die Basis, sondern der Ansatzraum: Die ",e.jsx(n,{children:"n"}),` Monome
spannen die Polynome vom Grad höchstens `,e.jsx(n,{children:"n-1"})," auf, die ",e.jsx(n,{children:"m+q"}),` kubischen
B-Splines den Spline-Raum `,e.jsx(n,{children:"\\Scal_3"}),", für ",e.jsx(n,{children:"n > 4"}),` eine ganz andere Menge von
Funktionen. Im Störungs-Widget von `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` liegen deshalb links ein
Polynom vom Grad `,e.jsx(n,{children:"8"}),` und rechts ein stückweise kubischer Spline durch dieselben
neun Punkte.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Zu jeder stetigen Funktion ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"[a,b]"}),` und jeder Genauigkeit
`,e.jsx(n,{children:"\\varepsilon > 0"}),` gibt es ein Gitter, auf dem bereits ein stückweise linearer
Spline `,e.jsx(n,{children:"\\cgreen{s}"}),` mit
`,e.jsx(n,{children:"\\left\\| f - \\cgreen{s} \\right\\|_\\infty < \\varepsilon"})," existiert."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(c,{id:"env:eigenschaften-von-splines-und-b-splines",href:"#env-eigenschaften-von-splines-und-b-splines",children:"Satz 13.4.15"}),`, Punkt 1, im Fall
`,e.jsx(n,{children:"q = 1"}),"; dort folgt er direkt aus der gleichmäßigen Stetigkeit von ",e.jsx(n,{children:"f"}),` auf
einem abgeschlossenen Intervall. Der Weg über wachsenden Polynomgrad kann
scheitern (Runge-Phänomen), der Weg über feinere Gitter bei festem Grad nicht.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Bei der Spline-Interpolation wächst mit jedem zusätzlichen Datenpunkt der
Grad des Interpolanten.`}),e.jsxs(i.p,{children:["Der Grad ",e.jsx(n,{children:"q"})," ist fest gewählt, meist ",e.jsx(n,{children:"q = 3"}),`; mit den Daten wächst die Zahl
der Teilintervalle und damit die Dimension `,e.jsx(n,{children:"m + q"}),` des Ansatzraums
(`,e.jsx(c,{id:"env:dimension-des-spline-raums",href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),`). Bei der Polynominterpolation lässt der
Ansatzraum für `,e.jsx(n,{children:"n"})," Punkte dagegen Polynome bis zum Grad ",e.jsx(n,{children:"n-1"}),` zu
(`,e.jsx(c,{id:"env:existenz-und-eindeutigkeit-der",href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),`), auch wenn das tatsächliche
Interpolationspolynom kleineren Grad haben darf. Weil der Grad bei Splines
nicht mitwächst, treten die Oszillationen aus `,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),` nicht
auf.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Unter allen Funktionen, die die Punkte ",e.jsx(n,{children:"(\\cblue{x_i}, \\cblue{y_i})"}),`
interpolieren, minimiert der natürliche kubische Spline
`,e.jsx(n,{children:"J(f) = \\int_a^b (f'')^2 \\dx"}),"."]}),e.jsxs(i.p,{children:[`Ohne Glattheitsforderung ist die Aussage falsch: Der Polygonzug durch die
Punkte ist zwischen den Knoten linear und käme auf `,e.jsx(n,{children:"J = 0"}),`, in
`,e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"})," gegen ",e.jsx(n,{children:"J(\\cgreen{s}) = 6"}),`. An den
Knoten selbst existiert seine zweite Ableitung allerdings nicht, `,e.jsx(n,{children:"J"}),` ist für
ihn streng genommen undefiniert. `,e.jsx(c,{id:"env:kubische-splines-haben-minimale",href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),`
vergleicht deshalb nur `,e.jsx(n,{children:"\\Ccal^2"}),`-Interpolanten, und unter denen gewinnt der
natürliche Spline.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsx(i.p,{children:`Verdoppeln wir die Zahl der Teilintervalle eines gleichmäßigen Gitters, so fällt die
Fehlerschranke für kubische Spline-Interpolation auf ein Sechzehntel, die für
stückweise lineare Interpolation dagegen nur auf ein Viertel.`}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," steht ",e.jsx(n,{children:"\\corange{h}^4"}),`, in
`,e.jsx(c,{id:"env:fehler-der-stueckweise-linearen",href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," ",e.jsx(n,{children:"\\corange{h}^2"}),`, und die verdoppelte
Teilintervallzahl (von `,e.jsx(n,{children:"N"})," auf ",e.jsx(n,{children:"2N-1"}),` Knoten, wie in der Folge
`,e.jsx(n,{children:"5,9,17,33"}),") halbiert ",e.jsx(n,{children:"\\corange h"}),"; das gibt die Faktoren ",e.jsx(n,{children:"2^4=16"}),`
beziehungsweise `,e.jsx(n,{children:"2^2=4"}),`. Auf hinreichend feinen Gittern laufen auch die
gemessenen Faktoren im kubischen Fall gegen `,e.jsx(n,{children:"16"}),`
(`,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),"), im linearen gegen ",e.jsx(n,{children:"4"}),"."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsx(i.p,{children:`Interpolation und Glättung sind zwei verschiedene Verfahren; die Interpolation
fällt nicht unter den Kleinste-Quadrate-Ansatz dieses Kapitels.`}),e.jsxs(i.p,{children:[`Interpolation ist der Spezialfall des KQ-Ansatzes mit verschwindenden
Residuen: Mit `,e.jsx(n,{children:"K = n"}),` Basisfunktionen und invertierbarer Designmatrix ist die
Kleinste-Quadrate-Lösung `,e.jsx(n,{children:"\\cgreen{\\wh\\ba} = \\corange{\\bB}^{-1}\\cblue{\\by}"}),`, die
Residuenquadratsumme null und jeder Punkt exakt getroffen. Ein kleiner
vollrangiger Raum mit `,e.jsx(n,{children:"K<n"}),` lässt für generische Daten Residuen stehen, ein
großer Raum kann durch einen Strafterm ebenfalls glätten
(`,e.jsx(c,{id:"env:interpolation-und-glaettung-im",href:"#env-interpolation-und-glaettung-im",children:"Definition 13.7.8"}),`). Ein interpolierender Schätzer
übernimmt dafür die Fehler `,e.jsx(n,{children:"\\cred{\\epsilon_i}"})," an den Datenstellen punktweise."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:[`Allein aus der Bias-Obergrenze folgt, dass die tatsächlich MSE-optimale
Knotenzahl von der Ordnung `,e.jsx(n,{children:"n^{1/9}"})," ist."]}),e.jsxs(i.p,{children:["Bewiesen ist nur ",e.jsx(n,{children:"\\mathrm{Bias}^2\\le C_1K^{-8}"}),`. Minimieren wir die daraus
entstehende Obergrenze oder nehmen zusätzlich
`,e.jsx(n,{children:"\\mathrm{Bias}^2\\asymp c_1K^{-8}"})," an, erhalten wir ",e.jsx(n,{children:"K\\asymp n^{1/9}"}),` und die
Garantie beziehungsweise Proxy-Rate `,e.jsx(n,{children:"n^{-8/9}"}),`
(`,e.jsx(i.a,{href:"#env-heuristisches-balance-modell-fuer-die",children:"Bemerkung 13.8.7"}),`). Für eine Aussage über das
tatsächliche oder minimax-optimale `,e.jsx(n,{children:"K"}),` braucht es zusätzlich eine passende
untere Schranke und genaue Annahmen an Funktionsklasse und Design.`]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"p = 10"})," Kovariablen und ",e.jsx(n,{children:"K = 10"}),` Basisfunktionen je Variable ist der
Koeffizienten-Tensor mit rund `,e.jsx(n,{children:"80"})," MB noch gut zu handhaben."]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"10^{10}"})," Koeffizienten, und mit ",e.jsx(n,{children:"8"}),` Byte je Zahl macht das
`,e.jsx(n,{children:"8 \\cdot 10^{10}"})," Bytes, also ",e.jsx(n,{children:"80"})," GB und nicht ",e.jsx(n,{children:"80"})," MB (",e.jsx(i.a,{href:"#env-zehn-basisfunktionen-je-variable",children:"Beispiel 13.9.4"}),`).
Dazu kämen mindestens ebenso viele Beobachtungen, damit die Designmatrix
vollen Spaltenrang haben kann. Daran scheitert der volle Tensoransatz in
hohen Dimensionen.`]})]}),e.jsxs(M,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein additives Modell mit ",e.jsx(n,{children:"p"})," Variablen und ",e.jsx(n,{children:"K"}),` Basisfunktionen je Komponente
hat eine Koeffizientenzahl der Ordnung `,e.jsx(n,{children:"pK"}),", wächst also nur linear in ",e.jsx(n,{children:"p"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#eq-additives-modell",children:"(13.9.4)"}),": ",e.jsx(n,{children:"pK"}),` Komponenten-Koeffizienten plus Achsenabschnitt, nach
Zentrierung `,e.jsx(n,{children:"p(K-1)+1"})," frei wählbare. Für ",e.jsx(n,{children:"p = 10"})," und ",e.jsx(n,{children:"K = 10"}),` sind das
`,e.jsx(n,{children:"91"})," freie Parameter statt ",e.jsx(n,{children:"10^{10}"}),`. Dafür fallen die Wechselwirkungen weg
(`,e.jsx(i.a,{href:"#env-der-gewinn-und-was-er-kostet",children:"Bemerkung 13.9.9"}),")."]})]}),e.jsxs(M,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Rate ",e.jsx(n,{children:"O(n^{-8/(8+p)})"}),` ist eine obere Schranke für den MSE, gleich welches
`,e.jsx(n,{children:"K"})," wir wählen."]}),e.jsxs(i.p,{children:[`Sie ist die Garantie aus der ausbalancierten Obergrenze und gilt für eine Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"})," unter den Voraussetzungen von ",e.jsx(c,{id:"env:eine-mse-obergrenze-im-multivariaten",href:"#env-eine-mse-obergrenze-im-multivariaten",children:"Satz 13.9.5"}),`. Für ein
beliebiges `,e.jsx(n,{children:"K"})," steht nur die zweigliedrige Schranke ",e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten",children:"(13.9.2)"}),` zur Verfügung:
`,e.jsx(n,{children:"K"})," zu klein lässt eine große Bias-Schranke, ",e.jsx(n,{children:"K"}),` zu groß macht die Varianz
groß.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie es weitergeht"}),`
`,e.jsxs(i.p,{children:[`Drei Themen hat dieses Kapitel nur angeschnitten: die theoretische Analyse
statistischer Verfahren, die Eigenschaften von Parameterschätzern und die
Funktionsapproximation über das hier Gezeigte hinaus. Dazu bieten sich die
Vorlesungen von Thomas Nagler an, `,e.jsx(i.em,{children:"Statistical Learning Theory"}),` im Master und
`,e.jsx(i.em,{children:"Mathematical Statistics"}),` für Bachelor und Master. Additive Modelle und ihre
Verwandten behandelt `,e.jsx(i.em,{children:"Statistik V: Konzepte statistischer Modellierung"}),` im
Bachelor.`]}),`
`,e.jsx(i.h3,{children:"Schluss"}),`
`,e.jsx(i.p,{children:`Damit endet das Skript. Begonnen haben wir mit der Frage, warum Rechnen mit
endlicher Genauigkeit schiefgehen kann, und mit den Werkzeugen
dagegen: Kondition, Stabilität, Aufwandsanalyse. Darauf baute die numerische
lineare Algebra auf, von der Elimination über die Zerlegungen bis zur
Singulärwertzerlegung, und darauf die Analysis mehrerer
Veränderlicher mit Ableitungen, Konvexität und Optimierung. Dieses letzte
Kapitel hat alles zusammengeführt: Eine Spline-Anpassung ist ein
Kleinste-Quadrate-Problem, ihre Lösung ein Zerlegungsverfahren, ihre Güte
eine Frage von Approximationsordnung und Kondition, und ihre Modellwahl ein
Optimierungsproblem.`}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath, Scientific Computing, Kapitel 7 fasst Interpolation,
stückweise polynomiale Interpolation und Splines samt Übungsaufgaben zusammen;
die klassische Referenz zur Sache ist C. de Boor, A Practical Guide to
Splines. Die gestrafte Glättung entwickeln P. Eilers und B. Marx, Flexible
Smoothing with B-splines and Penalties, Statistical Science 11 (1996), 89–121;
Tensorprodukt-Splines und additive Modelle samt `,e.jsx(i.code,{children:"mgcv"}),` behandelt S. N. Wood,
Generalized Additive Models: An Introduction with R, 2. Auflage 2017. Die Rate
additiver Schätzer geht auf C. J. Stone, Additive regression and other
nonparametric models, Annals of Statistics 13 (1985), 689–705, zurück, der
Begriff „Fluch der Dimensionalität" auf R. Bellman, Dynamic Programming,
1957.`]})})]})}function pt(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Bs,{...s})}):Bs(s)}function Ks(s){const i={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[`
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
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 7.1 (a)"}),e.jsx(i.td,{children:"Interpolationspolynom vom Grad zwei in der Monomialbasis"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 7.5 (a)"}),e.jsx(i.td,{children:"Interpolationspolynom in der Monomialbasis"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 7.23"}),e.jsx(i.td,{children:"Vorteil stückweiser Polynome bei vielen Datenpunkten"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Review Question 7.28"}),e.jsx(i.td,{children:"Parameter- und Bedingungszählung beim natürlichen kubischen Spline"}),e.jsx(i.td,{children:"mittel, ca. 15 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Lohnend"})," (",e.jsx(n,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 7.6"}),e.jsxs(i.td,{children:["Fehlerschranke der Polynominterpolation von ",e.jsx(n,{children:"\\sin"})]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 7.16"}),e.jsx(i.td,{children:"Eigenschaften von B-Splines nachrechnen"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lange Problem 10.6"}),e.jsx(i.td,{children:"Integral und Ableitungen des natürlichen kubischen Splines an drei Knoten"}),e.jsx(i.td,{children:"mittel, 1 Std. und mehr"})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Vertiefung"})," (",e.jsx(n,{children:"\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deuflhard/Hohmann Aufgabe 7.2"}),e.jsx(i.td,{children:"Optimale Knotenwahl – Interpolationsfehler und Tschebyscheff-Knoten"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 8.6"}),e.jsx(i.td,{children:"Operatornorm der Interpolationsabbildung (Lebesgue-Konstante)"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deuflhard/Hohmann Aufgabe 7.9"}),e.jsx(i.td,{children:"Der Algorithmus von de Boor"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgaben 11.2 und 11.3"}),e.jsx(i.td,{children:"Äquidistante B-Splines als Faltungen; B-Spline als Peano-Kern"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Lange Problem 10.10"}),e.jsx(i.td,{children:"Bayes-Interpretation des Glättungssplines"}),e.jsx(i.td,{children:"schwer, 1 Std. und mehr"})]})]})]}),`
`,e.jsxs(i.p,{children:["Bücher: Heath: ",e.jsx(i.em,{children:"Scientific Computing"})," (2. Aufl.); Deuflhard/Hohmann: ",e.jsx(i.em,{children:"Numerische Mathematik 1"})," (4. Aufl.); Schaback/Wendland: ",e.jsx(i.em,{children:"Numerische Mathematik"})," (5. Aufl.); Lange: ",e.jsx(i.em,{children:"Numerical Analysis for Statisticians"})," (2. Aufl.)."]})]})}function kt(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ks,{...s})}):Ks(s)}const yt={sections:[{id:"13.1",key:"approximation",title:"Approximation, Interpolation, Glättung",C:_e(gr)},{id:"13.2",key:"basisdarstellung",title:"Interpolation durch Basisdarstellung",C:_e(fr)},{id:"13.3",key:"polynominterpolation",title:"Polynominterpolation",C:_e(Dr)},{id:"13.4",key:"splines",title:"Splines und B-Splines",C:_e($r)},{id:"13.5",key:"minimale-kruemmung",title:"Minimale Krümmung",C:_e(Tr)},{id:"13.6",key:"approximationsfehler",title:"Approximationsfehler",C:_e(Jr)},{id:"13.7",key:"glaettung",title:"Glättung und Regression",C:_e(ht)},{id:"13.8",key:"bias-varianz",title:"Bias-Varianz und Modellwahl",C:_e(mt)},{id:"13.9",key:"multivariat",title:"Multivariat und Zusammenfassung",C:_e(pt)},{id:"13.10",key:"uebungen",title:"Übungsempfehlungen",C:_e(kt)}]};export{yt as default};
