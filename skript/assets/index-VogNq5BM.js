import{r as q,j as e,A as te,F as U,M as n,S as J,V as le,g as H,b as ce,L as Ee,C as S,E as w,a as y,G as T,h as Ue,P as he,n as K,Q as Me,i as A,z as Ns,o as Ln,p as Yn,y as bi,m as ve}from"./index-GbyLwDE5.js";import{I as re,E as Q}from"./Interaktiv-DHZUUTxv.js";import{C as qs}from"./ConceptFlow-CQqTMxA4.js";const{blau:Mi,gruen:Fi,rot:Ni,grau:Be,hellgrau:qi}=U,ms=210,sn=150,vn=24,Gs=8,Rs=10,Gi=18,ue=s=>vn+s*(ms-vn-Gs),ge=s=>sn-Gi-s*(sn-Gi-Rs),me=s=>.5+.28*Math.sin(2*Math.PI*s-.9),Ps=[0,.2,.4,.6,.8,1],Es=s=>.06*Math.sin(5*Math.PI*s),Fe=[.042,.125,.208,.292,.375,.458,.542,.625,.708,.792,.875,.958],fi=[-.245,-.912,-.221,-2.183,.304,1.66,.197,-.441,1.272,1.185,-.348,-.267],Is=Math.sqrt(fi.reduce((s,i)=>s+i*i,0)/fi.length),Ws=fi.map(s=>s/Is),Mn=H;function on(s){const i=[];for(let r=0;r<=120;r++){const t=r/120,d=s(t);Number.isFinite(d)&&i.push(`${ue(t).toFixed(1)},${ge(d).toFixed(1)}`)}return i.join(" ")}function $s(){return e.jsxs("g",{children:[e.jsx("line",{x1:ue(0),y1:ge(0),x2:ue(1),y2:ge(0),stroke:qi,strokeWidth:1}),e.jsx("line",{x1:ue(0),y1:ge(0),x2:ue(0),y2:ge(1),stroke:qi,strokeWidth:1}),e.jsx("text",{x:ue(0),y:sn-5,fontSize:9,fill:Be,textAnchor:"middle",children:"0"}),e.jsx("text",{x:ue(1),y:sn-5,fontSize:9,fill:Be,textAnchor:"middle",children:"1"}),e.jsx("text",{x:ue(.5),y:sn-5,fontSize:9,fill:Be,textAnchor:"middle",children:"x"}),e.jsx("text",{x:vn-4,y:ge(0)+3,fontSize:9,fill:Be,textAnchor:"end",children:"0"}),e.jsx("text",{x:vn-4,y:ge(1)+3,fontSize:9,fill:Be,textAnchor:"end",children:"1"}),e.jsx("text",{x:vn-4,y:ge(.5)+3,fontSize:9,fill:Be,textAnchor:"end",children:"y"})]})}function ei({titel:s,formula:i,children:r}){return e.jsxs("div",{className:"w-[210px] shrink-0",children:[e.jsx("p",{className:"mb-1 text-center text-sm font-medium",children:s}),e.jsxs("svg",{viewBox:`0 0 ${ms} ${sn}`,className:"h-auto w-full rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx($s,{}),r]}),e.jsx("p",{className:"mt-1 text-center text-sm",children:e.jsx(n,{children:i})})]})}function Vs(){const[s,i]=q.useState(.07),r=Fe.map((l,a)=>me(l)+s*Ws[a]),t=Math.sqrt(r.reduce((l,a,h)=>l+(a-me(Fe[h]))**2,0)/Fe.length),d=r.reduce((l,a,h)=>Math.abs(a-me(Fe[h]))>l.d?{d:Math.abs(a-me(Fe[h])),x:Fe[h]}:l,{d:0,x:0});return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Schieben wir das Rauschen auf null und vergleichen die drei Aufgaben."}),e.jsx("div",{className:"overflow-x-auto pb-1",children:e.jsxs("div",{className:"mx-auto flex w-max items-start gap-4",children:[e.jsxs(ei,{titel:"Approximation",formula:"\\left\\|f - \\wh{f}\\right\\| \\text{ möglichst klein}",children:[e.jsx("polyline",{points:on(me),fill:"none",stroke:Be,strokeWidth:1.5,strokeDasharray:"5 3"}),e.jsx("polyline",{points:on(l=>me(l)+.045*Math.sin(4*Math.PI*l+1)),fill:"none",stroke:Fi,strokeWidth:2})]}),e.jsxs(ei,{titel:"Interpolation",formula:"\\wh{f}(x_i) = y_i \\ \\ \\forall i",children:[e.jsx("polyline",{points:on(me),fill:"none",stroke:Be,strokeWidth:1.5,strokeDasharray:"5 3"}),e.jsx("polyline",{points:on(l=>me(l)+Es(l)),fill:"none",stroke:Fi,strokeWidth:2}),Ps.map(l=>e.jsx("circle",{cx:ue(l),cy:ge(me(l)),r:3.5,fill:Mi},l))]}),e.jsxs(ei,{titel:"Glättung",formula:"y_i = f(x_i) + \\eps_i \\ \\ \\forall i",children:[e.jsx("polyline",{points:on(me),fill:"none",stroke:Be,strokeWidth:1.5,strokeDasharray:"5 3"}),Fe.map((l,a)=>e.jsx("line",{x1:ue(l),y1:ge(me(l)),x2:ue(l),y2:ge(r[a]),stroke:Ni,strokeWidth:1.5},`r${l}`)),Fe.map((l,a)=>e.jsx("circle",{cx:ue(l),cy:ge(r[a]),r:3.5,fill:Mi},l))]})]})}),e.jsxs("p",{className:"mt-2 text-sm",children:["Grau gestrichelt läuft die Funktion ",e.jsx(n,{children:"f"}),", die wir treffen wollen, grün unser ",e.jsx(n,{children:"\\wh{f}"}),", blau die Datenpunkte. Links darf"," ",e.jsx(n,{children:"\\wh{f}"})," überall ein wenig danebenliegen, muss aber nirgends genau treffen. In der Mitte ist es umgekehrt: An den sechs Knoten sitzt ",e.jsx(n,{children:"\\wh{f}"})," exakt auf den Daten, dazwischen weicht es sichtbar von"," ",e.jsx(n,{children:"f"})," ab. Rechts streuen die Beobachtungen um die unbekannte wahre Funktion",e.jsx(n,{children:"f"}),"; die roten Strecken sind die Fehler ",e.jsx(n,{children:"\\eps_i"}),". Eine aus diesen Punkten geschätzte grüne Kurve ist dort bewusst noch nicht eingezeichnet."]}),e.jsx(J,{label:"σ (Rauschen)",value:s,onChange:i,min:0,max:.12,step:.005,fmt:l=>Mn(l,3)}),e.jsx(le,{className:"mt-1",kind:s===0?"ok":"warn",children:t===0?"Bei σ = 0 liegen alle zwölf Punkte exakt auf der wahren Funktion. Dann sind die Funktionswerte rauschfrei und dürfen interpoliert werden.":e.jsxs(e.Fragment,{children:["Mittlerer Abstand der Punkte zur wahren Funktion (quadratisches Mittel):"," ",e.jsx("span",{className:"font-mono",children:Mn(t,3)}),", der größte Einzelabstand"," ",e.jsx("span",{className:"font-mono",style:{color:Ni},children:Mn(d.d,3)})," ","bei ",e.jsxs("span",{className:"font-mono",children:["x = ",Mn(d.x,3)]}),". Solange σ > 0 ist, wäre eine Kurve durch alle Punkte die falsche Antwort, denn sie würde das Rauschen mitzeichnen."]})})]})}const Zs=[{id:"span",label:["Basis & Span"],kicker:"Kap. 1",x:105,y:44,w:140,group:"anker",href:"?k=01-intro"},{id:"fraum",label:["Funktionenräume"],x:380,y:40,w:155,group:"fa1"},{id:"gs",label:["Gram-Schmidt / QR"],kicker:"Kap. 7",x:640,y:44,w:165,group:"anker",href:"?k=07-kq"},{id:"fbasis",label:["Basen von","Funktionenräumen"],x:380,y:142,w:170,group:"fa1"},{id:"fapprox",label:["Basisdarstellung","f̂(x) = Σₖ aₖ φₖ(x)"],x:380,y:248,w:175,group:"fa1"},{id:"kond",label:["Kondition"],kicker:"Kap. 4",x:230,y:148,w:120,group:"anker",href:"?k=04-fehler"},{id:"lgsn",label:["Gleichungssysteme"],kicker:"Kap. 5",x:105,y:248,w:165,group:"anker",href:"?k=05-lgs"},{id:"poly",label:["Polynominterpolation"],x:205,y:352,w:185,group:"fa1"},{id:"spline",label:["Splines"],x:520,y:352,w:110,group:"fa1"},{id:"runge",label:["Runge-Phänomen"],x:115,y:445,w:160,group:"fa1"},{id:"bspline",label:["B-Splines"],x:400,y:445,w:120,group:"fa1"},{id:"natspline",label:["Natürliche kubische","Splines"],x:640,y:450,w:175,group:"fa1"},{id:"kq",label:["Kleinste Quadrate"],kicker:"Kap. 7",x:95,y:545,w:160,group:"anker",href:"?k=07-kq"},{id:"smooth",label:["Glättung /","Regressionssplines"],x:290,y:550,w:175,group:"fa2"},{id:"tpk9",label:["TP-Basis &","TP-Designmatrix"],kicker:"Kap. 9",x:480,y:552,w:160,group:"anker",href:"?k=09-tensoren"},{id:"kruemm",label:["Krümmungsarmheit"],x:655,y:545,w:170,group:"fa2"},{id:"biasvar",label:["Bias-Varianz-","Abwägung"],x:130,y:655,w:145,group:"fa2"},{id:"gam",label:["Additive Modelle","(GAMs)"],x:310,y:655,w:155,group:"fa2"},{id:"tps",label:["Tensorprodukt-","Splines"],x:490,y:655,w:150,group:"fa2"},{id:"fluch",label:["Fluch der Dimension"],x:490,y:748,w:180,group:"fa2"}],Ts=[{from:"span",to:"fbasis"},{from:"fraum",to:"fbasis"},{from:"gs",to:"fbasis"},{from:"fbasis",to:"fapprox"},{from:"fapprox",to:"poly"},{from:"fapprox",to:"spline"},{from:"lgsn",to:"poly"},{from:"kond",to:"poly"},{from:"poly",to:"runge"},{from:"spline",to:"bspline"},{from:"spline",to:"natspline"},{from:"natspline",to:"kruemm"},{from:"kq",to:"smooth"},{from:"bspline",to:"smooth"},{from:"smooth",to:"biasvar"},{from:"smooth",to:"gam"},{from:"bspline",to:"tps"},{from:"tpk9",to:"tps"},{from:"tps",to:"fluch"}];function Ls(){return e.jsx(qs,{ariaLabel:`Konzeptkarte von ${ce("kap:funktionsapproximation")}: von Basen und Funktionenräumen über Interpolation und Splines zu Glättung, Bias-Varianz-Abwägung und Tensorprodukt-Splines.`,nodes:Zs,edges:Ts,groups:[{key:"anker",label:`Anker aus ${ce("kap:intro")}–9`,color:U.gruen},{key:"fa1",label:"13.1–13.4 · Interpolation",color:U.orange},{key:"fa2",label:"13.5–13.9 · Glättung und Multivariates",color:U.violett}],openLabel:"Kapitel öffnen"})}const{blau:Cs,gruen:bs,rot:Ri}=U,Pi=[0,1,2],Os=[1,2,5],Hs=s=>1+s*s,Us=s=>s<0||s>2?NaN:s<=1?s+1:3*s-1,Js=s=>s**3-2*s*s+2*s+1,Qs=s=>1+s*s+.5*Math.sin(2*Math.PI*s),ni=[{name:"Parabel",formel:"\\wh{f}_1(x) = 1 + x^2",f:Hs,dash:[]},{name:"stückweise linear",formel:"\\wh{f}_2",f:Us,dash:[7,4]},{name:"kubisch",formel:"\\wh{f}_3(x) = x^3 - 2x^2 + 2x + 1",f:Js,dash:[2,3]},{name:"vogelwild",formel:"\\wh{f}_4(x) = 1 + x^2 + 0{,}5\\sin(2\\pi x)",f:Qs,dash:[10,3,2,3]}],ii=H;function Xs({dash:s}){return e.jsx("svg",{width:56,height:12,viewBox:"0 0 56 12",className:"h-3 w-14 shrink-0","aria-hidden":"true",children:e.jsx("line",{x1:1,y1:6,x2:55,y2:6,stroke:bs,strokeWidth:2,strokeDasharray:s.length?s.join(" "):void 0})})}function Ys(){const[s,i]=q.useState([!0,!0,!0,!0]),[r,t]=q.useState(1.3),d=ni.filter((c,z)=>s[z]),l=d.map(c=>({f:c.f,color:bs,dash:c.dash})),a=d.map(c=>c.f(r)).filter(c=>Number.isFinite(c)),h=a.length?Math.max(...a):NaN,o=a.length?Math.min(...a):NaN,g=a.length>=2?h-o:NaN,f=Pi.some(c=>Math.abs(c-r)<1e-9),k=Pi.map((c,z)=>({x:c,y:Os[z],color:Cs}));return Number.isFinite(g)&&g>1e-9&&(k.push({x:r,y:o,color:Ri}),k.push({x:r,y:h,color:Ri})),e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Schätzen wir zuerst die größte Spanne und schieben dann x* zwischen zwei Stützstellen."}),e.jsx("div",{className:"mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm",children:ni.map((c,z)=>e.jsxs("label",{className:"inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap",children:[e.jsx("input",{type:"checkbox",checked:s[z],onChange:_=>i(s.map((p,u)=>u===z?_.target.checked:p))}),e.jsx(Xs,{dash:c.dash}),e.jsx("span",{children:c.name})]},c.name))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsx(Ee,{xLabel:"x",yLabel:"y",series:l,markers:k,xDomain:[-.15,2.15],yDomain:[-.5,6.5],width:360,height:250}),e.jsxs("div",{className:"text-sm",children:[e.jsx(J,{label:"x*",value:r,onChange:t,min:0,max:2,step:.05,fmt:c=>ii(c,2)}),e.jsx("table",{className:"mt-2 border-collapse text-left",children:e.jsx("tbody",{children:ni.map((c,z)=>{const _=c.f(r);return e.jsxs("tr",{className:s[z]?"":"opacity-40",children:[e.jsx("td",{className:"py-0.5 pr-3",children:e.jsx(n,{children:`\\wh{f}_${z+1}(x^{\\ast})`})}),e.jsx("td",{className:"py-0.5 font-mono",children:Number.isFinite(_)?ii(_):"nicht definiert"})]},c.name)})})}),e.jsx(le,{kind:a.length<2?"warn":f?"ok":"fail",children:a.length<2?"Zum Vergleichen brauchen wir mindestens zwei eingeschaltete Kurven.":f?e.jsxs(e.Fragment,{children:["Spanne 0: ",e.jsx(n,{children:"x^{\\ast}"})," ist eine Stützstelle, dort sind alle Interpolanten gleich."]}):e.jsxs(e.Fragment,{children:["Die Spanne bei ",e.jsx(n,{children:"x^{\\ast}"})," beträgt ",e.jsx("span",{className:"font-mono",children:ii(g)}),"; die roten Punkte markieren sie. Nach ",ce("satz:gestalt-aller-interpolanten")," bleiben alle Kurven an den Stützstellen gebunden, dazwischen nicht."]})})]})]})]})}function Ei(s){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Mit diesem Kapitel beginnt der dritte Block des Skripts
(`,e.jsx(i.a,{href:"?k=01-intro#sec-1.1",children:"Abschnitt 1.1"}),`). Die Aufgabe klingt zunächst harmlos:
Gegeben sind `,e.jsx(n,{children:"n"})," Datenpunkte ",e.jsx(n,{children:"\\cblue{(x_1, y_1), \\dots, (x_n, y_n)}"}),` mit
paarweise verschiedenen `,e.jsx(n,{children:"x_i"}),", gesucht ist eine Funktion ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),`,
die zu ihnen passt. Manchmal stammen die Punkte gar nicht aus einer Messung,
sondern sind Auswertungen einer bekannten Funktion `,e.jsx(n,{children:"f"}),`, die zu teuer ist, um
sie an beliebig vielen Stellen auszurechnen.`]}),`
`,e.jsxs(re,{title:"Landkarte der Funktionsapproximation",children:[e.jsx(i.p,{children:`Wie die Konzepte dieses Kapitels zusammenhängen und auf welche Bausteine aus
den Kapiteln 1–9 sie zurückgreifen, zeigt die Karte; Teil 2 wird hier nirgends
gebraucht. Beim ersten Lesen genügt der Gesamteindruck.`}),e.jsx(Ls,{}),e.jsx(i.p,{children:`Wählen wir einen Begriff aus, hebt die Karte seine Voraussetzungen und
Folgerungen hervor; verlinkte Kästen führen direkt zum zugehörigen Kapitel.`})]}),`
`,e.jsx(i.p,{children:`„Passt" lässt sich allerdings auf sehr verschiedene Weisen verlangen, und
deshalb stehen gleich drei Varianten nebeneinander. Der Rechenweg
bleibt dabei der aus den bisherigen Kapiteln: Am Ende steht wieder ein
lineares Gleichungssystem, neu ist nur, dass die Unbekannten darin die
Koeffizienten einer Funktion sind.`}),`
`,e.jsx(i.h3,{children:"Vorkenntnisse"}),`
`,e.jsx(i.p,{children:`Der Abschnitt führt kaum eigene Technik ein, greift dafür aber auf mehrere
frühere Kapitel zurück.`}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Lineare Gleichungssysteme ",e.jsx(n,{children:"\\bB\\ba = \\by"}),` und ihre Lösbarkeit
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`). Jede Interpolationsaufgabe dieses
Kapitels endet in einem solchen System.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(S,{id:"condition-number",children:"Konditionszahl"}),` einer Matrix als Maß dafür, wie
stark sich Daten- und Rundungsfehler verstärken
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),` und
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`). Sie entscheidet ab
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"})," darüber, welches Basissystem brauchbar ist."]}),`
`,e.jsxs(i.li,{children:[e.jsx(S,{id:"basis",children:"Basen"})," und ",e.jsx(S,{id:"linear-independence",children:"lineare Unabhängigkeit"}),`,
diesmal in einem `,e.jsx(S,{id:"vector-space",children:"Vektorraum"}),`, dessen Elemente Funktionen
sind.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(S,{id:"polynomial",children:"Polynome"}),` samt Polynomgrad und Monombasis,
`,e.jsx(S,{id:"continuity",children:"Stetigkeit"}),` und
`,e.jsx(S,{id:"differentiability",children:"Differenzierbarkeit"}),`, außerdem stückweise definierte
Funktionen.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(S,{id:"norm",children:"Normen"})," (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.2",children:"Abschnitt 3.2"}),`), hier
vor allem die `,e.jsx(i.em,{children:"Supremumsnorm"})," einer Funktion: Für ",e.jsx(n,{children:"g"})," auf ",e.jsx(n,{children:"[a, b]"}),` ist
`,e.jsx(n,{children:"\\|g\\|_\\infty = \\sup_{x \\in [a,b]} |g(x)|"}),", bei stetigem ",e.jsx(n,{children:"g"}),` auf einem
abgeschlossenen Intervall also der größte Betrag, den `,e.jsx(n,{children:"g"})," dort annimmt."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Drei Varianten desselben Wunsches"}),`
`,e.jsxs(i.p,{children:["Alle drei Aufgaben liefern am Ende ein ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),`, verlangen aber sehr
Verschiedenes von ihm.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.1.1 (Approximationsproblem)",id:"env-approximationsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien eine Funktion ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"[a, b]"}),", eine Norm ",e.jsx(n,{children:"\\|\\cdot\\|"}),` auf
einem Funktionenraum, der `,e.jsx(n,{children:"f"}),` enthält, und eine vorgegebene, einfacher
handhabbare Klasse `,e.jsx(n,{children:"\\mathcal A"}),` von Funktionen. Gesucht ist ein
`,e.jsx(n,{children:"\\cgreen{\\wh{f}} \\in \\mathcal A"}),", das den Abstand zu ",e.jsx(n,{children:"f"}),` minimiert oder dem
bestmöglichen Abstand wenigstens nahekommt:`]}),e.jsx(y,{children:`\\left\\| f - \\cgreen{\\wh{f}} \\right\\|
\\approx \\inf_{g \\in \\mathcal A} \\left\\| f-g \\right\\| .`}),e.jsxs(i.p,{children:["Die Bedingung ist global: ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," soll ",e.jsx(n,{children:"f"})," überall auf ",e.jsx(n,{children:"[a, b]"}),`
nahekommen, muss es aber an keiner einzigen Stelle exakt treffen. Existiert
ein Minimierer, steht in der Anzeige exakt ein Gleichheitszeichen.`]})]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.1.2 (Interpolationsproblem)",id:"env-interpolationsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien Datenpunkte ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit
paarweise verschiedenen `,e.jsx(n,{children:"x_i"}),". Gesucht ist ein ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," mit"]}),e.jsx(T,{tag:"13.1.1",id:"eq-interpolationsproblem",children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}, \\qquad i = 1, \\dots, n ."}),e.jsxs(i.p,{children:["Jede Funktion mit dieser Eigenschaft heißt ",e.jsx(i.em,{children:"Interpolant"}),` (interpolant) der
Daten, die `,e.jsx(n,{children:"x_i"})," heißen ",e.jsx(i.em,{children:"Stützstellen"}),` (nodes). Die Bedingung ist punktweise
und exakt: An den `,e.jsx(n,{children:"n"}),` Stützstellen ist nichts erlaubt außer Treffen, zwischen
ihnen alles.`]})]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.1.3 (Glättungsproblem)",id:"env-glaettungsproblem",children:[e.jsxs(i.p,{children:["Gegeben seien Datenpunkte ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, die aus
einer unbekannten Funktion `,e.jsx(n,{children:"f"})," und Fehlern entstanden sind:"]}),e.jsx(y,{children:"\\cblue{y_i} = f(x_i) + \\cred{\\eps_i}, \\qquad i = 1, \\dots, n ."}),e.jsxs(i.p,{children:["Gesucht ist eine Schätzung ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," von ",e.jsx(n,{children:"f"}),`, die das Signal trifft,
statt jeden beobachteten Fehler mitzuzeichnen. Die `,e.jsx(n,{children:"\\cred{\\eps_i}"}),` sind in
aller Regel Zufallsvariablen; die Residuen
`,e.jsx(n,{children:"\\cblue{y_i}-\\cgreen{\\wh{f}(x_i)}"}),` sind dagegen aus den Daten berechenbare
Abweichungen und nicht mit den unbeobachteten Fehlern gleichzusetzen.`]})]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.1.4 (Daten oder Funktion?)",id:"env-daten-oder-funktion",children:e.jsxs(i.p,{children:[`Die Interpolationsbedingung wird mal als
`,e.jsx(n,{children:"f(x_i) = \\cgreen{\\wh{f}(x_i)}"}),` geschrieben, mal als
`,e.jsx(n,{children:"\\cblue{y_i} = \\cgreen{\\wh{f}(x_i)}"}),`. Beides meint dasselbe, solange die Daten
rauschfrei sind, also `,e.jsx(n,{children:"\\cblue{y_i} = f(x_i)"}),` gilt. Der Unterschied wird erst
bei der Glättung wichtig: Dort ist `,e.jsx(n,{children:"f"}),` unbekannt und nur die verrauschten
`,e.jsx(n,{children:"\\cblue{y_i}"})," liegen vor, weshalb die Bedingung ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = f(x_i)"}),`
gar nicht überprüfbar wäre. Wir schreiben deshalb durchgehend
`,e.jsx(n,{children:"\\cblue{y_i}"})," und sagen dazu, ob ",e.jsx(n,{children:"\\cblue{y_i} = f(x_i)"})," gelten soll."]})}),`
`,e.jsxs(re,{title:"Die drei Aufgaben nebeneinander",children:[e.jsx(i.p,{children:"Wann wird aus Glättung wieder Interpolation? Wir variieren dafür nur das Rauschen."}),e.jsx(Vs,{})]}),`
`,e.jsx(i.h3,{children:"Wie die drei Aufgaben zusammenhängen"}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.1.5 (Approximation über Interpolation)",id:"env-approximation-ueber-interpolation",children:[e.jsxs(i.p,{children:[`Ein wichtiger Weg zu einer Approximation führt über Interpolation: Statt die
Norm `,e.jsx(n,{children:"\\|f - \\cgreen{\\wh{f}}\\|"}),` direkt über einem Funktionenraum zu minimieren,
werten wir `,e.jsx(n,{children:"f"})," an endlich vielen Stellen ",e.jsx(n,{children:"x_i"}),` aus und interpolieren die so
entstandenen Paare `,e.jsx(n,{children:"\\cblue{(x_i, f(x_i))}"}),`. Damit ist das konkrete
Approximationsverfahren auf ein Interpolationsproblem zurückgeführt, und aus
dessen Bedingung `,e.jsx(i.a,{href:"#eq-interpolationsproblem",children:"(13.1.1)"})," wird in ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` ein lineares
Gleichungssystem. Andere Verfahren minimieren eine Norm tatsächlich direkt,
etwa Kleinste Quadrate oder eine Minimax-Approximation. Sind die Auswertungen
fehlerbehaftet, tritt an die Stelle der Interpolation ein Glättungsproblem.`]}),e.jsxs(i.p,{children:[`Von den drei Varianten ist die Glättung die schwierigste: Sie muss zusätzlich
entscheiden, welcher Teil der Daten Signal und welcher Rauschen ist, und dafür
braucht es ein stochastisches Modell für die `,e.jsx(n,{children:"\\cred{\\eps_i}"}),`. Dieses Kapitel
behandelt deshalb die Interpolation; die Glättung folgt in
`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Wozu wir das brauchen"}),`
`,e.jsxs(i.p,{children:[`Klassisch sind drei Anlässe. Erstens die glatte Kurve durch eine
Punktwolke, etwa für eine Grafik. Zweitens der Wunsch, eine teure Funktion
schneller auszuwerten: Wenn `,e.jsx(n,{children:"f(x) = \\int_0^x g(y)\\,\\mathrm{d}y"}),` oder
`,e.jsx(n,{children:"f(x) = g^{-1}(x)"}),` jedes Mal ein numerisches Verfahren erfordert, ist es
billiger, `,e.jsx(n,{children:"f"}),` an wenigen Stellen zu bestimmen und dazwischen zu interpolieren.
Drittens Ableitungen und Integrale von `,e.jsx(n,{children:"f"}),`: Ein Polynom oder ein Spline lässt
sich exakt differenzieren und integrieren, und wir nehmen das Ergebnis als
Näherung für `,e.jsx(n,{children:"f'"})," beziehungsweise für ",e.jsx(n,{children:"\\int f"}),`. Auf diesem Umweg beruhen die
klassischen Verfahren der numerischen Differentiation und Integration, die
dieses Skript nicht weiter verfolgt.`]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.1.6 (Interpolation im maschinellen Lernen, und was nur so aussieht)",id:"env-interpolation-im-maschinellen-lernen-und",children:[e.jsxs(i.p,{children:[`Zwei der gängigen Anwendungsbeispiele sind Interpolation im Sinn von
`,e.jsx(i.a,{href:"#env-interpolationsproblem",children:"Definition 13.1.2"}),":"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Computergrafik."}),` Wird ein Bild gedreht oder skaliert, liegen die neuen
Pixelmittelpunkte zwischen den alten. Bilineare und bikubische Verfahren
legen eine Funktion durch die umliegenden Pixelwerte und werten sie an der
neuen Stelle aus.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zeitreihen."}),` Fehlende Werte in Sensor- oder Finanzdaten werden aufgefüllt,
indem eine Kurve durch die vorhandenen Messzeitpunkte gelegt wird.`]}),`
`]}),e.jsx(i.p,{children:"Zwei weitere werden gern danebengestellt, sind aber bloße Analogien:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Latent-Space-Interpolation"}),` in VAEs und GANs interpoliert linear zwischen
zwei Codes, `,e.jsx(n,{children:"\\bz(t) = (1-t)\\bz_0 + t\\bz_1"}),`. Das ist Interpolation im
Argumentraum mit `,e.jsx(n,{children:"n = 2"}),` Stützstellen. Über das erzeugte Bild sagt sie
nichts: Ob der Übergang glatt aussieht, hängt am Decoder, nicht an einer
Interpolationsbedingung.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Positional Encodings"}),` wie RoPE werten feste Sinus- und
Kosinusfunktionen an den Token-Positionen aus. Eine Bedingung der Form
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"}),` kommt darin nicht vor; gemeinsam ist
mit unserem Thema nur der Baukasten aus Sinusfunktionen. Interpolation im
engen Sinn taucht dort erst auf, wenn ein trainiertes Modell auf längere
Kontexte umskaliert wird.`]}),`
`]}),e.jsxs(i.p,{children:[`Ein echter Grenzfall ist die Idee, die feste Aktivierungsfunktion eines
neuronalen Netzes durch eine lernbare, spline-basierte zu ersetzen
(`,e.jsx(i.em,{children:"Kolmogorow-Arnold-Netze"}),"). Die Splines aus ",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` sind
dort das Modell selbst; ihre Koeffizienten
werden allerdings trainiert und nicht aus Interpolationsbedingungen bestimmt.`]})]}),`
`,e.jsx(i.h3,{children:"Warum die Interpolationsbedingung zu wenig ist"}),`
`,e.jsxs(i.p,{children:["Interpolation stellt ",e.jsx(n,{children:"n"}),` Gleichungen an eine Funktion. Eine Funktion hat
unendlich viele Freiheitsgrade, und deshalb bleibt nach diesen `,e.jsx(n,{children:"n"}),` Gleichungen
sehr viel offen. Wie viel, zeigt schon das kleinste sinnvolle Beispiel.`]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.1.7 (Vier Interpolanten durch drei Punkte)",id:"env-vier-interpolanten-durch-drei-punkte",children:[e.jsxs(i.p,{children:["Betrachten wir die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0, 1)}"}),", ",e.jsx(n,{children:"\\cblue{(1, 2)}"}),`,
`,e.jsx(n,{children:"\\cblue{(2, 5)}"}),". Die folgenden vier Funktionen interpolieren sie alle:"]}),e.jsx(y,{children:`\\begin{aligned}
\\cgreen{\\wh{f}_1(x)} &= 1 + x^2 , \\\\
\\cgreen{\\wh{f}_2(x)} &= \\begin{cases} x + 1 & x \\in [0, 1] \\\\ 3x - 1 & x \\in [1, 2] \\end{cases} , \\\\
\\cgreen{\\wh{f}_3(x)} &= x^3 - 2x^2 + 2x + 1 , \\\\
\\cgreen{\\wh{f}_4(x)} &= 1 + x^2 + 0{,}5 \\sin(2\\pi x) .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die Probe ist in allen vier Fällen eine Zeile. Für ",e.jsx(n,{children:"\\cgreen{\\wh{f}_1}"}),` etwa
ist `,e.jsx(n,{children:"1 + 0 = 1"}),", ",e.jsx(n,{children:"1 + 1 = 2"})," und ",e.jsx(n,{children:"1 + 4 = 5"}),". Für ",e.jsx(n,{children:"\\cgreen{\\wh{f}_3}"}),` rechnen
wir `,e.jsx(n,{children:"0 - 0 + 0 + 1 = 1"}),", ",e.jsx(n,{children:"1 - 2 + 2 + 1 = 2"})," und ",e.jsx(n,{children:"8 - 8 + 4 + 1 = 5"}),`. Bei
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_4}"})," genügt der Hinweis, dass ",e.jsx(n,{children:"\\sin(2\\pi x)"}),` an jeder ganzen
Zahl verschwindet, und `,e.jsx(n,{children:"\\cgreen{\\wh{f}_2}"}),` ist auf beiden Teilintervallen die
Gerade durch die jeweiligen Endpunkte.`]}),e.jsxs(i.p,{children:[`Zwischen den Stützstellen sehen die vier Funktionen dagegen völlig
verschieden aus. Bei `,e.jsx(n,{children:"x = 1{,}3"})," liefern sie ",e.jsx(n,{children:"2{,}69"}),", ",e.jsx(n,{children:"2{,}90"}),", ",e.jsx(n,{children:"2{,}42"}),` und
`,e.jsx(n,{children:"3{,}17"}),"; die höchste und die niedrigste trennt dort ",e.jsx(n,{children:"0{,}75"}),`. Viel weiter
gehen sie auf `,e.jsx(n,{children:"[0, 2]"}),` nirgends auseinander, die größte Spanne beträgt
`,e.jsx(n,{children:"0{,}7499"})," und wird bei ",e.jsx(n,{children:"x \\approx 1{,}288"})," erreicht."]})]}),`
`,e.jsxs(re,{title:"Vier Interpolanten, ein Datensatz",children:[e.jsx(i.p,{children:"Wie weit können vier Interpolanten, die dieselben drei Punkte treffen, zwischen zwei Stützstellen auseinanderliegen?"}),e.jsx(Ue,{frage:"Schätzen wir die größte Spanne auf [0, 2].",loesung:.75,toleranz:.08,einheit:"",children:e.jsx(Ys,{})}),e.jsxs(i.p,{children:["Wie das Widget zeigt, liegt die größte Spanne bei etwa ",e.jsx(n,{children:"0{,}75"}),"; ",e.jsx(i.a,{href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"})," erklärt, warum die Interpolationsbedingungen diese Zwischenwerte nicht festlegen."]})]}),`
`,e.jsx(i.p,{children:`Vier Beispiele sind noch kein Argument. Der folgende Satz beschreibt die
gesamte Lösungsmenge und macht damit klar, dass es nicht bei vieren bleibt.`}),`
`,e.jsxs(w,{kind:"Satz",label:"13.1.8 (Gestalt aller Interpolanten)",id:"env-gestalt-aller-interpolanten",children:[e.jsxs(i.p,{children:["Seien Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, gegeben und sei
`,e.jsx(n,{children:"\\cgreen{p}"}),` irgendein Interpolant dieser Daten. Dann ist eine Funktion
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` genau dann ebenfalls ein Interpolant, wenn sie sich
schreiben lässt als`]}),e.jsx(T,{tag:"13.1.2",id:"eq-gestalt-aller-interpolanten",children:`\\cgreen{\\wh{f}} = \\cgreen{p} + g
\\qquad \\text{mit} \\qquad
g(x_i) = 0 \\quad \\text{für } i = 1, \\dots, n .`})]}),`
`,e.jsx(Q,{title:"Beweis der allgemeinen Gestalt aller Interpolanten",children:e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Funktionen werden punktweise addiert, und ",e.jsx(n,{children:"\\cgreen{p}"})," ist nach Voraussetzung ein Interpolant"]}),children:[e.jsxs(i.p,{children:["Sei zunächst ",e.jsx(n,{children:"g"})," eine Funktion mit ",e.jsx(n,{children:"g(x_i) = 0"})," für alle ",e.jsx(n,{children:"i"}),`. Dann gilt für
jedes `,e.jsx(n,{children:"i"})]}),e.jsx(y,{children:"(\\cgreen{p} + g)(x_i) = \\cgreen{p(x_i)} + g(x_i) = \\cblue{y_i} + 0 = \\cblue{y_i} ,"}),e.jsxs(i.p,{children:["also interpoliert ",e.jsx(n,{children:"\\cgreen{p} + g"})," die Daten."]})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["beide Funktionen erfüllen die Interpolationsbedingung ",e.jsx(i.a,{href:"#eq-interpolationsproblem",children:"(13.1.1)"})," an derselben Stelle ",e.jsx(n,{children:"x_i"})]}),children:[e.jsxs(i.p,{children:["Sei umgekehrt ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` ein Interpolant. Wir setzen
`,e.jsx(n,{children:"g := \\cgreen{\\wh{f}} - \\cgreen{p}"})," und erhalten für jedes ",e.jsx(n,{children:"i"})]}),e.jsx(y,{children:"g(x_i) = \\cgreen{\\wh{f}(x_i)} - \\cgreen{p(x_i)} = \\cblue{y_i} - \\cblue{y_i} = 0 ."}),e.jsxs(i.p,{children:["Mit diesem ",e.jsx(n,{children:"g"})," ist ",e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\cgreen{p} + g"})," von der Form ",e.jsx(i.a,{href:"#eq-gestalt-aller-interpolanten",children:"(13.1.2)"}),"."]})]})]})}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.1.9 (Unendlich viele Lösungen)",id:"env-unendlich-viele-loesungen",children:[e.jsxs(i.p,{children:["Die Menge der Funktionen ",e.jsx(n,{children:"g"})," mit ",e.jsx(n,{children:"g(x_i) = 0"})," für alle ",e.jsx(n,{children:"i"}),` ist ein
Untervektorraum des Funktionenraums, und er ist unendlichdimensional: Für
jedes Polynom `,e.jsx(n,{children:"q"})," liegt ",e.jsx(n,{children:"q(x) \\prod_{i=1}^n (x - x_i)"}),` darin, und diese
Produkte sind für verschiedene Grade von `,e.jsx(n,{children:"q"}),` linear unabhängig. Schon der
Spezialfall `,e.jsx(n,{children:"g_c(x) = c \\prod_{i=1}^n (x - x_i)"}),` liefert für jedes
`,e.jsx(n,{children:"c \\in \\R"}),` einen weiteren Interpolanten. Damit hat das Interpolationsproblem
aus `,e.jsx(i.a,{href:"#env-interpolationsproblem",children:"Definition 13.1.2"}),` stets unendlich viele Lösungen, sobald wir
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," nicht weiter einschränken."]}),e.jsxs(i.p,{children:["Die drei Zusatzfunktionen aus ",e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"}),` sind genau von dieser Bauart.
Mit `,e.jsx(n,{children:"\\cgreen{p} = \\cgreen{\\wh{f}_1}"})," ist"]}),e.jsx(y,{children:`\\cgreen{\\wh{f}_3} - \\cgreen{p} = x(x-1)(x-2),
\\qquad
\\cgreen{\\wh{f}_4} - \\cgreen{p} = 0{,}5\\sin(2\\pi x),`}),e.jsxs(i.p,{children:["und beide verschwinden an ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"1"})," und ",e.jsx(n,{children:"2"}),"; das erste ist gerade ",e.jsx(n,{children:"g_1"}),` von
oben, das zweite eine Sinusschwingung, die zufällig an denselben Stellen
Nullstellen hat. Auch die stückweise lineare Differenz
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_2} - \\cgreen{p}"})," verschwindet dort, sie lautet ",e.jsx(n,{children:"x(1-x)"}),` auf
`,e.jsx(n,{children:"[0,1]"})," und ",e.jsx(n,{children:"-(x-1)(x-2)"})," auf ",e.jsx(n,{children:"[1,2]"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Interpolation allein legt also nichts fest. Wir müssen die Auswahl
einschränken, und zwar so, dass genau so viele Freiheitsgrade übrig bleiben,
wie wir Datenpunkte haben. Das leisten `,e.jsx(i.em,{children:"Basissysteme"}),": Wir wählen ",e.jsx(n,{children:"K"}),`
Basisfunktionen und lassen nur noch Linearkombinationen aus ihnen zu. Aus der
Interpolationsbedingung wird dann ein lineares Gleichungssystem in den `,e.jsx(n,{children:"K"}),`
Koeffizienten (`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`), und die Wahl der Basis entscheidet
über alles Weitere: über Eindeutigkeit (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`), über die
Kondition des Systems und über die Frage, ob eine lokale Datenänderung die
Kurve global verbiegt (`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Zu Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise verschiedenen
`,e.jsx(n,{children:"x_i"})," gibt es unendlich viele Funktionen ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` mit
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-unendlich-viele-loesungen",children:"Bemerkung 13.1.9"}),". Ist ",e.jsx(n,{children:"\\cgreen{p}"}),` ein Interpolant, so ist nach
`,e.jsx(i.a,{href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"})," auch ",e.jsx(n,{children:"\\cgreen{p} + c \\prod_i (x - x_i)"})," für jedes ",e.jsx(n,{children:"c \\in \\R"}),` einer,
und verschiedene `,e.jsx(n,{children:"c"})," liefern verschiedene Funktionen."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x_i)} = \\cblue{y_i}"})," für ",e.jsx(n,{children:"i = 1, \\dots, n"}),` folgt
`,e.jsx(n,{children:"\\left\\|f - \\cgreen{\\wh{f}}\\right\\| \\approx 0"}),"."]}),e.jsxs(i.p,{children:[`Die Interpolationsbedingung sagt über die Stellen zwischen den Stützstellen
nichts. In `,e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"}),` erfüllen alle vier Funktionen dieselben drei
Bedingungen und liegen bei `,e.jsx(n,{children:"x = 1{,}3"})," trotzdem ",e.jsx(n,{children:"0{,}75"}),` auseinander; höchstens
eine von ihnen kann einem gegebenen `,e.jsx(n,{children:"f"}),` nahekommen. Wie groß der Abstand
tatsächlich wird, klärt erst eine Fehlerabschätzung für eine konkrete
Funktionenklasse.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Beschränken wir ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," auf Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"}),`, so hat
das Interpolationsproblem bei paarweise verschiedenen `,e.jsx(n,{children:"x_i"})," genau eine Lösung."]}),e.jsxs(i.p,{children:[`Das ist der Eindeutigkeitssatz der Polynominterpolation aus
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),". Ohne den Zusatz „vom Grad höchstens ",e.jsx(n,{children:"n-1"}),`" wäre
die Aussage falsch; so gelesen widerspräche sie der ersten Aussage dieses
Selbsttests.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[`Beim Glättungsproblem verlangen wir wie bei der Interpolation, dass
`,e.jsx(n,{children:"\\cgreen{\\wh{f}}"})," durch alle Datenpunkte läuft."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-glaettungsproblem",children:"Definition 13.1.3"})," lässt die Residuen ",e.jsx(n,{children:`\\cred{\\eps_i} = \\cblue{y_i} -
\\cgreen{\\wh{f}(x_i)}`}),` ausdrücklich zu. Bei verrauschten Daten wäre eine Kurve
durch alle Punkte die falsche Antwort, weil sie das Rauschen mit abbildet. Im
Widget der ersten Vertiefung fallen die beiden Aufgaben nur für `,e.jsx(n,{children:"\\sigma = 0"}),`
zusammen.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Interpolant muss ein Polynom sein."}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-interpolationsproblem",children:"Definition 13.1.2"})," verlangt nur die ",e.jsx(n,{children:"n"}),` Gleichungen an den Stützstellen.
`,e.jsx(n,{children:"\\cgreen{\\wh{f}_2}"})," aus ",e.jsx(i.a,{href:"#env-vier-interpolanten-durch-drei-punkte",children:"Beispiel 13.1.7"})," ist stückweise linear und an ",e.jsx(n,{children:"x = 1"}),`
nicht differenzierbar, `,e.jsx(n,{children:"\\cgreen{\\wh{f}_4}"}),` enthält einen Sinusterm; beide
interpolieren. Polynome sind eine besonders bequeme Wahl, keine Vorschrift.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath, Scientific Computing, Kapitel 7 (Interpolation), führt in
§7.1 dieselbe Aufgabenstellung ein und diskutiert, nach welchen Kriterien eine
Funktionenklasse für die Interpolation ausgewählt wird.`})})]})}function er(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ei,{...s})}):Ei(s)}const{blau:Fn,gruen:si,orange:Nn}=U,xn=[0,1,2],ri={monom:{name:"Monombasis",tex:["1","x","x^2"],phi:[()=>1,s=>s,s=>s*s],loese:s=>{const i=(s[0]-2*s[1]+s[2])/2;return[s[0],s[1]-s[0]-i,i]}},newton:{name:"Newton-Basis",tex:["1","x","x(x-1)"],phi:[()=>1,s=>s,s=>s*(s-1)],loese:s=>[s[0],s[1]-s[0],(s[0]-2*s[1]+s[2])/2]}},ye=H;function nr(){const[s,i]=q.useState("monom"),[r,t]=q.useState([1,2,5]),[d,l]=q.useState(!1),a=ri[s],h=xn.map(u=>a.phi.map(j=>j(u))),o=a.loese(r),g=u=>o.reduce((j,m,x)=>j+m*a.phi[x](u),0),f=xn.map(g),k=Math.max(...f.map((u,j)=>Math.abs(u-r[j]))),c=(u,j)=>t(m=>m.map((x,B)=>B===u?j:x)),z=[...d?a.phi.map((u,j)=>({f:m=>o[j]*u(m),color:Nn,dash:[2+2*j,3]})):[],{f:g,color:si}],_=h[0][1]===0&&h[0][2]===0&&h[1][2]===0,p=Math.abs(o[2])<1e-12;return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Verschieben wir einen Messwert und wechseln dann die Basis."}),e.jsxs("p",{className:"mb-2 text-sm",children:["Wir halten die Knoten ",e.jsx(n,{children:"x_1 = 0,\\ x_2 = 1,\\ x_3 = 2"})," fest und verschieben die drei Messwerte. Die Matrix ",e.jsx(n,{children:"\\bB"})," hängt nur von den Knoten und vom Basissystem ab, sie bleibt beim Schieben also stehen; nur die rechte Seite ",e.jsx(n,{children:"\\by"})," wandert mit. Der Schalter wechselt das Basissystem, ohne den Ansatzraum zu ändern: Beide Basen spannen die Polynome vom Grad höchstens 2 auf, die grüne Kurve springt beim Wechsel deshalb nicht, nur die Koeffizienten ",e.jsx(n,{children:"\\ba"})," tun es."]}),e.jsxs("div",{className:"mb-2 flex flex-wrap items-center gap-2 text-sm",children:[Object.keys(ri).map(u=>e.jsx("button",{type:"button",onClick:()=>i(u),className:`rounded border px-2 py-1 ${s===u?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:ri[u].name},u)),e.jsxs("label",{className:"ml-2 flex items-center gap-1",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:u=>l(u.target.checked)}),e.jsxs("span",{children:["Bausteine ",e.jsx(n,{children:"a_k \\phi_k"})," zeigen"]})]})]}),[0,1,2].map(u=>e.jsx(J,{label:`y${["₁","₂","₃"][u]} bei x = ${xn[u]}`,value:r[u],onChange:j=>c(u,j),min:0,max:6,step:.5,fmt:j=>ye(j,1)},u)),e.jsxs("div",{className:"mt-2 flex flex-wrap items-start gap-5",children:[e.jsxs("div",{children:[e.jsx(Ee,{xLabel:"x",yLabel:"y",series:z,markers:xn.map((u,j)=>({x:u,y:r[j],color:Fn})),xDomain:[-.2,2.2],yDomain:[-3,9],width:320,height:230}),e.jsxs("p",{className:"mt-1 max-w-[20rem] text-center text-xs text-slate-500 dark:text-slate-400",children:["Blau die Daten, grün der Interpolant. Sind die orangen Bausteine"," ",e.jsx(n,{children:"a_k \\phi_k"})," eingeschaltet, summieren sie sich punktweise zur grünen Kurve; bei starker Reglerstellung laufen sie oben und unten aus dem Bild."]})]}),e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{className:"mb-1",style:{color:Nn},children:e.jsx(n,{children:`\\phi_1(x) = ${a.tex[0]}, \\quad \\phi_2(x) = ${a.tex[1]}, \\quad \\phi_3(x) = ${a.tex[2]}`})}),e.jsxs("table",{className:"mb-2 font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left font-normal",children:"Zeile"}),[1,2,3].map(u=>e.jsx("th",{className:"px-2 font-normal",style:{color:Nn},children:e.jsx(n,{children:`\\phi_${u}(x_i)`})},u)),e.jsx("th",{className:"pl-3 font-normal",style:{color:Fn},children:e.jsx(n,{children:"y_i"})})]})}),e.jsx("tbody",{children:xn.map((u,j)=>e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-2 text-slate-500 dark:text-slate-400",children:["i = ",j+1,", x = ",u]}),h[j].map((m,x)=>e.jsx("td",{className:"px-2 text-center",style:{color:Nn},children:ye(m,0)},x)),e.jsx("td",{className:"pl-3 text-center",style:{color:Fn},children:ye(r[j],1)})]},u))})]}),e.jsxs("p",{children:["Lösung des Systems ",e.jsx(n,{children:"\\bB\\ba = \\by"}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:si},children:["a = (",ye(o[0]),"; ",ye(o[1]),"; ",ye(o[2]),")"]})]}),e.jsxs("p",{className:"mt-1",children:["Probe:"," ",e.jsx("span",{className:"font-mono",style:{color:si},children:f.map(u=>ye(u,1)).join(" · ")})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:Fn},children:r.map(u=>ye(u,1)).join(" · ")})]}),e.jsxs("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:["größte Abweichung:"," ",k===0?"0 (exakt)":k.toExponential(1)]}),e.jsx("p",{className:"mt-2 max-w-[20rem]",children:_?"B ist hier untere Dreiecksmatrix: Zeile 1 gibt a₁ direkt, dann setzen wir nach unten durch. Das ist Vorwärtssubstitution im engen Sinn.":"Über der Diagonalen steht in Zeile 2 eine 1, B ist also keine Dreiecksmatrix. Wir lösen mit Elimination: Zeile 1 gibt a₁, das setzen wir in die Zeilen 2 und 3 ein und räumen dann a₂ weg."}),e.jsx("p",{className:"mt-1 max-w-[20rem]",children:p?"Der quadratische Baustein hat Gewicht a₃ = 0. Der Interpolant ist eine Gerade, obwohl wir im Raum der Polynome vom Grad höchstens 2 gesucht haben.":`Alle drei Bausteine tragen bei; das Gewicht des quadratischen ist a₃ = ${ye(o[2])}.`})]})]}),e.jsx(le,{kind:_?"ok":"neutral",children:_?"In der Newton-Basis ist B untere Dreiecksmatrix. Wir bestimmen die Koeffizienten daher nacheinander; die grüne Kurve bleibt dabei unverändert.":"Die Monombasis beschreibt denselben Ansatzraum, aber B ist nicht dreieckig. Die Koeffizienten ändern sich beim Basiswechsel, nicht der Interpolant."})]})}function Ii(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` hat uns mit einem Ärgernis zurückgelassen: Durch
dieselben drei Punkte laufen eine Parabel, ein Polygonzug, ein kubisches
Polynom und eine wellige Sinuskurve, und alle vier erfüllen die
Interpolationsbedingungen exakt. Solange wir nur „irgendeine Funktion durch
die Punkte" verlangen, ist die Aufgabe hoffnungslos unterbestimmt. Dieser
Abschnitt räumt das auf. Die Idee ist in einem Satz gesagt: Wir suchen den
Interpolanten nicht mehr unter allen Funktionen, sondern nur noch in einem
kleinen, endlichdimensionalen Ansatzraum. Aus der Suche nach einer Funktion
wird damit die Suche nach endlich vielen Zahlen, und dafür haben wir seit
`,e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"})," das Werkzeug."]}),`
`,e.jsx(i.h3,{children:"Funktionen als Vektoren"}),`
`,e.jsx(i.p,{children:"Der erste Schritt ist ein Perspektivwechsel: Funktionen sind Vektoren."}),`
`,e.jsxs(w,{kind:"Definition",label:"13.2.1 (Der Vektorraum der Funktionen)",id:"env-der-vektorraum-der-funktionen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\Fcal = \\{f \\colon [a,b] \\to \\R\\}"}),` die Menge aller reellwertigen
Funktionen auf einem Intervall `,e.jsx(n,{children:"[a,b]"}),`. Mit den punktweise erklärten
Verknüpfungen`]}),e.jsx(y,{children:`(f + g)(x) = f(x) + g(x),
\\qquad
(\\alpha \\cdot f)(x) = \\alpha \\cdot f(x),
\\qquad \\alpha \\in \\R,`}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\Fcal"})," ein ",e.jsx(S,{id:"vector-space",children:"Vektorraum"})," über ",e.jsx(n,{children:"\\R"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Nachzurechnen ist daran nichts Aufregendes: Assoziativität, Kommutativität
und die Distributivgesetze erbt `,e.jsx(n,{children:"\\Fcal"})," punktweise von ",e.jsx(n,{children:"\\R"}),`, die Nullfunktion
`,e.jsx(n,{children:"x \\mapsto 0"})," ist das neutrale Element, und ",e.jsx(n,{children:"-f"})," ist das Inverse zu ",e.jsx(n,{children:"f"}),`. Wir
dürfen Funktionen also addieren und strecken wie Vektoren im
`,e.jsx(n,{children:"\\R^n"}),`. Der Unterschied liegt in der Größe des Raums, und genau die ist unser
Problem.`]}),`
`,e.jsxs(i.p,{children:["Was heißt der Befund aus ",e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` in dieser Sprache? Dort
war jeder Interpolant von der Gestalt `,e.jsx(n,{children:"\\cgreen{p} + g"})," mit einer Funktion ",e.jsx(n,{children:"g"}),`,
die an allen Stellen `,e.jsx(n,{children:"x_i"}),` verschwindet. Genau so sieht die Lösungsmenge eines
linearen Gleichungssystems aus, und das ist kein Zufall.`]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.2.2 (Unendlich viele Freiheitsgrade, endlich viele Bedingungen)",id:"env-unendlich-viele-freiheitsgrade-endlich",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Auswertungsabbildung"})]}),e.jsx(y,{children:`E \\colon \\Fcal \\to \\R^n,
\\qquad
E(f) = \\bigl(f(x_1), \\dots, f(x_n)\\bigr)^\\top,`}),e.jsxs(i.p,{children:["ist linear, und die Interpolanten der Daten ",e.jsx(n,{children:"\\cblue{\\by}"}),` sind genau die
Urbilder von `,e.jsx(n,{children:"\\cblue{\\by}"})," unter ",e.jsx(n,{children:"E"}),`: eine spezielle Lösung plus der
`,e.jsx(S,{id:"kernel",children:"Kern"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.1",children:"Abschnitt 5.1"}),`), also genau die Gestalt aus
`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),". Der Kern ist unendlichdimensional, denn ",e.jsx(n,{children:"E"})," misst nur ",e.jsx(n,{children:"n"}),`
Zahlen aus einem unendlichdimensionalen Raum
(`,e.jsx(S,{id:"rank-nullity-theorem",children:"Rangsatz"}),")."]}),e.jsxs(i.p,{children:["Die Diagnose lautet damit: unendlich viele Freiheitsgrade gegen ",e.jsx(n,{children:"n"}),`
Bedingungen. Die Therapie liegt auf der Hand. Wir suchen von vornherein in
einem Raum, der nur endlich viele Freiheitsgrade hat.`]})]}),`
`,e.jsx(i.h3,{children:"Ansatzräume und Basisdarstellung"}),`
`,e.jsxs(i.p,{children:[`Wenn die Bedingungen zu wenig festlegen, engen wir den Suchraum ein. Statt in
ganz `,e.jsx(n,{children:"\\Fcal"})," suchen wir nur noch in einem endlichdimensionalen Unterraum."]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.2.3 (Ansatzraum, Basisdarstellung, Basiskoeffizienten)",id:"env-ansatzraum-basisdarstellung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K} \\colon [a,b] \\to \\R"}),` fest
gewählte Funktionen, genannt `,e.jsx(i.em,{children:"Basisfunktionen"}),` (basis functions). Der von
ihnen aufgespannte `,e.jsx(S,{id:"subspace",children:"Unterraum"})]}),e.jsx(y,{children:`\\Fcal_K = \\spann\\{\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}\\}
= \\Bigl\\{ \\textstyle\\sum_{k=1}^K a_k \\corange{\\phi_k}
\\;\\Big|\\; a_1, \\dots, a_K \\in \\R \\Bigr\\} \\subset \\Fcal`}),e.jsxs(i.p,{children:["heißt ",e.jsx(i.em,{children:"Ansatzraum"}),". Eine Darstellung ",e.jsx(n,{children:"f = \\sum_{k=1}^K a_k \\corange{\\phi_k}"}),`
heißt `,e.jsx(i.em,{children:"Basisdarstellung"})," von ",e.jsx(n,{children:"f"}),", und ",e.jsx(n,{children:"a_1, \\dots, a_K"}),` heißen
`,e.jsx(i.em,{children:"Basiskoeffizienten"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Ein Element von ",e.jsx(n,{children:"\\Fcal_K"}),` ist damit durch seinen Koeffizientenvektor
`,e.jsx(n,{children:"\\ba = (a_1, \\dots, a_K)^\\top \\in \\R^K"}),` beschrieben. Ob umgekehrt auch jede
Funktion in `,e.jsx(n,{children:"\\Fcal_K"})," nur ",e.jsx(i.em,{children:"einen"}),` solchen Vektor besitzt, ist eine echte
Zusatzforderung an die `,e.jsx(n,{children:"\\corange{\\phi_k}"}),"."]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.2.4 (Wann K Zahlen eine Funktion festlegen)",id:"env-wann-k-zahlen-eine-funktion-festlegen",children:[e.jsx(i.p,{children:"Die Koordinatenabbildung"}),e.jsx(y,{children:`\\Phi \\colon \\R^K \\to \\Fcal_K,
\\qquad
\\Phi(\\ba) = \\sum_{k=1}^K a_k \\corange{\\phi_k},`}),e.jsxs(i.p,{children:[`ist linear und surjektiv. Sie ist genau dann bijektiv, wenn
`,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
`,e.jsx(S,{id:"linear-independence",children:"linear unabhängig"}),` sind. In diesem Fall bilden sie
eine `,e.jsx(S,{id:"basis",children:"Basis"})," von ",e.jsx(n,{children:"\\Fcal_K"}),`, es gilt
`,e.jsx(n,{children:"\\dim \\Fcal_K = K"}),", und jedes ",e.jsx(n,{children:"f \\in \\Fcal_K"}),` hat genau einen
Koeffizientenvektor.`]})]}),`
`,e.jsx(Q,{title:"Beweis: Wann Koeffizienten eine Funktion eindeutig festlegen",children:e.jsxs(he,{children:[e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\Fcal_K"})," ist als Menge aller Linearkombinationen definiert, also ist jedes Element ein Bild unter ",e.jsx(n,{children:"\\Phi"}),"; die Linearität folgt aus den punktweisen Rechenregeln"]}),children:e.jsxs(i.p,{children:["Linearität und Surjektivität stehen schon in ",e.jsx(i.a,{href:"#env-ansatzraum-basisdarstellung",children:"Definition 13.2.3"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["eine surjektive lineare Abbildung ist genau dann bijektiv, wenn sie injektiv ist, und injektiv ist sie genau bei trivialem Kern; ",e.jsx(n,{children:"\\Phi(\\ba) = 0"})," heißt ausgeschrieben ",e.jsx(n,{children:"\\sum_k a_k \\corange{\\phi_k(x)} = 0"})," für alle ",e.jsx(n,{children:"x"}),", und dass daraus ",e.jsx(n,{children:"\\ba = \\bnull"})," folgt, ist die Definition der linearen Unabhängigkeit"]}),children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\Phi"}),` ist genau dann bijektiv, wenn
`,e.jsx(n,{children:"\\operatorname{Kern}(\\Phi) = \\{\\bnull\\}"}),` ist, und das ist genau die lineare
Unabhängigkeit der `,e.jsx(n,{children:"\\corange{\\phi_k}"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["ein Isomorphismus bildet eine Basis auf eine Basis ab; das Bild der Standardbasis von ",e.jsx(n,{children:"\\R^K"})," ist gerade ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"})]}),children:e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\Phi"})," bijektiv, so ist es ein Isomorphismus zwischen ",e.jsx(n,{children:"\\R^K"}),` und
`,e.jsx(n,{children:"\\Fcal_K"}),"; damit ist ",e.jsx(n,{children:"\\dim \\Fcal_K = K"}),`, und die Basisdarstellung jedes
`,e.jsx(n,{children:"f \\in \\Fcal_K"})," ist eindeutig."]})})]})}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.2.5 (Das Wort Basisfunktion trägt eine Voraussetzung mit)",id:"env-das-wort-basisfunktion-traegt-eine",children:e.jsxs(i.p,{children:["Dass jedes ",e.jsx(n,{children:"f \\in \\Fcal_K"})," durch ",e.jsx(n,{children:"K"}),` Koeffizienten eindeutig bestimmt sei,
klingt harmlos. In der Leserichtung von den Koeffizienten zur Funktion ist
das immer richtig, denn `,e.jsx(n,{children:"\\Phi"}),` ist eine Abbildung. Interessant ist die
Gegenrichtung, und die braucht `,e.jsx(i.a,{href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`. Wählen wir etwa
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"}),", so ist ",e.jsx(n,{children:"K = 3"}),", aber ",e.jsx(n,{children:"\\Fcal_3"}),` besteht nur aus
den Polynomen vom Grad höchstens `,e.jsx(n,{children:"1"})," und hat die Dimension ",e.jsx(n,{children:"2"}),`. Die Funktion
`,e.jsx(n,{children:"f(x) = 1 + x"})," hat dort die Koeffizientenvektoren ",e.jsx(n,{children:"(1, 1, 0)^\\top"}),`,
`,e.jsx(n,{children:"(0, 0, 1)^\\top"})," und unendlich viele weitere. Das Wort ",e.jsx(i.em,{children:"Basis"}),`funktion setzt
die lineare Unabhängigkeit stillschweigend voraus; wir prüfen sie im
Zweifelsfall nach.`]})}),`
`,e.jsx(w,{kind:"Beispiel",label:"13.2.6 (Zwei Ansatzräume)",id:"env-zwei-ansatzraeume",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Polynome vom Grad höchstens ",e.jsx(n,{children:"n - 1"}),":"]})," Mit der ",e.jsx(i.em,{children:"Monombasis"}),`
`,e.jsx(n,{children:"\\corange{\\phi_k(x)} = x^{k-1}"})," und ",e.jsx(n,{children:"K = n"})," ist ",e.jsx(n,{children:"\\Fcal_K"}),` der Raum aller
`,e.jsx(S,{id:"polynomial",children:"Polynome"})," vom Grad höchstens ",e.jsx(n,{children:"n - 1"}),`. Die Monome sind
linear unabhängig, also ist `,e.jsx(n,{children:"\\dim \\Fcal_K = n"}),`. Diesen Ansatzraum nimmt
sich `,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"})," vor."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Splines vom Grad ",e.jsx(n,{children:"q"})," über ",e.jsx(n,{children:"m + 1"})," Knoten:"]}),` Stückweise Polynome vom Grad
höchstens `,e.jsx(n,{children:"q"}),", die an den ",e.jsx(n,{children:"m - 1"})," inneren Knoten ",e.jsx(n,{children:"C^{q-1}"}),`-glatt
aneinanderstoßen, bilden ebenfalls einen Ansatzraum. Bei einfachen inneren
Knoten und dieser größtmöglichen Glattheit hat er `,e.jsx(n,{children:"K = m + q"}),`
Freiheitsgrade. Woher diese Zahl kommt und welche Basis man dafür wählt,
klärt `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"; wir nehmen sie hier als Vorschau mit."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Der Ansatz und sein Gleichungssystem"}),`
`,e.jsxs(i.p,{children:[`Jetzt können wir das Interpolationsproblem umformulieren. Gesucht ist nicht
mehr eine Funktion, sondern ein Vektor aus `,e.jsx(n,{children:"K"})," Zahlen."]}),`
`,e.jsxs(w,{kind:"Algorithmus",label:"13.2.7 (Interpolation durch Basisdarstellung)",id:"env-interpolation-durch-basisdarstellung",children:[e.jsxs(i.p,{children:["Gegeben seien Daten ",e.jsx(n,{children:"(x_i, \\cblue{y_i})"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Basissystem wählen:"})," Lege ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
fest. Diese Funktionen sind bekannt.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ansatz machen:"}),`
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = \\sum_{k=1}^K a_k \\corange{\\phi_k(x)}"}),` mit den
unbekannten Koeffizienten `,e.jsx(n,{children:"a_1, \\dots, a_K"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Bedingungen hinschreiben:"})," ",e.jsx(n,{children:"\\cblue{y_i} = \\cgreen{\\wh{f}(x_i)}"}),` für alle
`,e.jsx(n,{children:"i"})," ergibt das lineare Gleichungssystem ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` aus
`,e.jsx(i.a,{href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"System lösen"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Kapitel 5"}),`) und die Koeffizienten in
den Ansatz einsetzen.`]}),`
`]})]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.2.8 (Das Interpolationsproblem ist ein lineares Gleichungssystem)",id:"env-das-interpolationsproblem-ist-ein",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bB \\in \\R^{n \\times K}"}),` die Matrix mit den Einträgen
`,e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k(x_i)}"}),", also"]}),e.jsx(y,{children:`\\bB = \\begin{pmatrix}
\\corange{\\phi_1(x_1)} & \\cdots & \\corange{\\phi_K(x_1)} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\corange{\\phi_1(x_n)} & \\cdots & \\corange{\\phi_K(x_n)}
\\end{pmatrix} \\in \\R^{n \\times K},
\\qquad
\\ba = \\begin{pmatrix} a_1 \\\\ \\vdots \\\\ a_K \\end{pmatrix} \\in \\R^K,
\\qquad
\\cblue{\\by} = \\begin{pmatrix} \\cblue{y_1} \\\\ \\vdots \\\\ \\cblue{y_n} \\end{pmatrix} \\in \\R^n .`}),e.jsxs(i.p,{children:["Dann interpoliert ",e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\sum_{k=1}^K a_k \\corange{\\phi_k}"}),` die
Daten genau dann, wenn `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," gilt."]})]}),`
`,e.jsxs(i.p,{children:["Der Beweis ist eine Zeile: Die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bB\\ba"}),` ist
`,e.jsx(n,{children:"\\sum_{k=1}^K \\corange{\\phi_k(x_i)}\\, a_k = \\cgreen{\\wh{f}(x_i)}"}),", die ",e.jsx(n,{children:"i"}),`-te
Zeile der Gleichung also wörtlich die `,e.jsx(n,{children:"i"}),"-te Interpolationsbedingung."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.2.9 (Was in B steckt und was nicht)",id:"env-was-in-b-steckt-und-was-nicht",children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bB"})," liest sich zeilenweise wie eine Datentabelle: ",e.jsx(i.em,{children:`eine Zeile je
Datenpunkt, eine Spalte je Basisfunktion`}),". Drei Beobachtungen dazu."]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bB"})," hängt nur von den Stellen ",e.jsx(n,{children:"x_i"}),` und vom Basissystem ab, nicht von den
gemessenen Werten `,e.jsx(n,{children:"\\cblue{y_i}"}),`. Kommen neue Messwerte an denselben Stellen
herein, bleibt die Matrix stehen, und eine einmal berechnete Zerlegung
lässt sich wiederverwenden (`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"n = K"})," ist ",e.jsx(n,{children:"\\bB"}),` quadratisch. Das System ist genau dann für jede rechte
Seite eindeutig lösbar, wenn `,e.jsx(n,{children:"\\bB"}),` invertierbar ist
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.1",children:"Abschnitt 5.1"}),`). Das ist der Normalfall der
Interpolation, und die folgenden Abschnitte drehen sich um die Frage, wie
gut diese Matrix konditioniert ist.`]}),`
`,e.jsxs(i.li,{children:["Für ",e.jsx(n,{children:"n > K"}),` haben wir mehr Bedingungen als Unbekannte. Ein exakter
Interpolant existiert dann in der Regel nicht, und wir minimieren
stattdessen die Residuen, also
`,e.jsx(S,{id:"linear-least-squares",children:"Kleinste Quadrate"}),`
(`,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),`). Das ist der Übergang zur Glättung, den
`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"})," angekündigt hat. Für ",e.jsx(n,{children:"n < K"}),` bleibt das Problem
unterbestimmt und braucht weitere Forderungen.`]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Ein Beispiel von Hand"}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.2.10 (Basisdarstellung konkret)",id:"env-basisdarstellung-konkret",children:[e.jsxs(i.p,{children:["Gegeben seien die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0, 1)}"}),", ",e.jsx(n,{children:"\\cblue{(1, 2)}"}),`,
`,e.jsx(n,{children:"\\cblue{(2, 5)}"})," aus ",e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`, dazu die Monombasis
`,e.jsx(n,{children:"\\corange{\\phi_k(x)} = x^{k-1}"})," mit ",e.jsx(n,{children:"K = 3"}),`. Der Ansatzraum ist der Raum der
Polynome vom Grad höchstens `,e.jsx(n,{children:"2"}),`, der Ansatz lautet
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = a_1 + a_2 x + a_3 x^2"}),"."]}),e.jsx(i.p,{children:`Die Matrix entsteht durch Auswerten der drei Basisfunktionen an den drei
Stellen:`}),e.jsx(y,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{1} \\\\
\\corange{1} & \\corange{2} & \\corange{4}
\\end{pmatrix},
\\qquad
\\cblue{\\by} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\\\ \\cblue{5} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Wir lösen ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` durch Einsetzen. Die erste Zeile liefert
`,e.jsx(n,{children:"a_1"})," sofort, danach eliminieren wir:"]}),e.jsx(y,{children:`\\begin{aligned}
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
`,e.jsx(n,{children:"\\cgreen{\\ba = (1, 0, 1)^\\top}"}),", der Interpolant also"]}),e.jsx(y,{children:"\\cgreen{\\wh{f}(x)} = 1 + x^2 ."}),e.jsxs(i.p,{children:[`Die Probe an allen drei Stellen geht auf:
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(0)} = \\cblue{1}"}),", ",e.jsx(n,{children:"\\cgreen{\\wh{f}(1)} = \\cblue{2}"}),`,
`,e.jsx(n,{children:"\\cgreen{\\wh{f}(2)} = \\cblue{5}"}),"."]})]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.2.11 (Einsetzen ist hier nicht Vorwärtssubstitution)",id:"env-einsetzen-ist-hier-nicht",children:e.jsxs(i.p,{children:[`Der Rechenweg sieht aus wie das Lösen eines Dreieckssystems, ist aber keines:
`,e.jsx(S,{id:"triangular-solve",children:"Vorwärtssubstitution"}),` setzt eine untere
`,e.jsx(S,{id:"triangular-matrix",children:"Dreiecksmatrix"})," voraus, und in Zeile 2 von ",e.jsx(n,{children:"\\bB"}),` steht
rechts der Diagonalen `,e.jsx(n,{children:"\\corange{\\phi_3(x_2)} = \\corange{1} \\neq 0"}),`. Dass die
erste Zeile so billig ist, liegt allein an `,e.jsx(n,{children:"x_1 = 0"}),`; ab Zeile 2 rechnen wir
echte `,e.jsx(S,{id:"gaussian-elimination",children:"Gauß-Elimination"})," (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),")."]})}),`
`,e.jsx(i.p,{children:"Dass es auch anders geht, zeigt ein zweiter Anlauf mit demselben Ansatzraum."}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.2.12 (Dieselbe Funktion, andere Koeffizienten)",id:"env-dieselbe-funktion-andere-koeffizienten",children:[e.jsxs(i.p,{children:[`Wir behalten die Daten und wechseln nur das Basissystem, und zwar zur
`,e.jsx(i.em,{children:"Newton-Basis"})," zu den Knoten ",e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"1"}),":"]}),e.jsx(y,{children:`\\corange{\\phi_1(x)} = 1,
\\qquad
\\corange{\\phi_2(x)} = x,
\\qquad
\\corange{\\phi_3(x)} = x(x-1) .`}),e.jsxs(i.p,{children:["Auch diese drei Funktionen spannen die Polynome vom Grad höchstens ",e.jsx(n,{children:"2"}),` auf,
der Ansatzraum ist also unverändert. Die Matrix dagegen ändert ihre Gestalt:`]}),e.jsx(y,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{0} \\\\
\\corange{1} & \\corange{2} & \\corange{2}
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Sie ist eine untere Dreiecksmatrix, denn ",e.jsx(n,{children:"\\corange{\\phi_2}"}),` verschwindet in
`,e.jsx(n,{children:"0"})," und ",e.jsx(n,{children:"\\corange{\\phi_3}"})," verschwindet in ",e.jsx(n,{children:"0"})," und in ",e.jsx(n,{children:"1"}),`. Jetzt greift die
Vorwärtssubstitution wirklich, Zeile für Zeile von oben nach unten:`]}),e.jsx(y,{children:`\\begin{aligned}
a_1 &= \\cblue{1}
\\quad\\implies\\quad \\cgreen{a_1 = 1}, \\\\
a_1 + a_2 &= \\cblue{2}
\\quad\\implies\\quad \\cgreen{a_2 = 1}, \\\\
a_1 + 2a_2 + 2a_3 &= \\cblue{5}
\\quad\\implies\\quad 2a_3 = 2
\\quad\\implies\\quad \\cgreen{a_3 = 1} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Der Koeffizientenvektor ist diesmal ",e.jsx(n,{children:"\\cgreen{\\ba = (1, 1, 1)^\\top}"}),`, und
ausmultipliziert steht dort`]}),e.jsx(y,{children:"\\cgreen{\\wh{f}(x)} = 1 + x + x(x-1) = 1 + x^2 ,"}),e.jsxs(i.p,{children:["dieselbe Funktion wie in ",e.jsx(i.a,{href:"#env-basisdarstellung-konkret",children:"Beispiel 13.2.10"}),`. Anders sein kann sie auch nicht:
Die Differenz zweier Polynome vom Grad höchstens `,e.jsx(n,{children:"2"}),`, die beide durch alle
drei Punkte laufen, hat mindestens drei Nullstellen. Ein Polynom vom Grad
höchstens `,e.jsx(n,{children:"2"}),` mit drei Nullstellen ist aber das Nullpolynom, wie
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"})," allgemein festhält."]})]}),`
`,e.jsxs(i.p,{children:[`Der Ansatzraum bestimmt also den Interpolanten, das Basissystem nur seine
Koeffizienten und den Rechenweg dorthin. Für die Numerik ist der Rechenweg
allerdings alles andere als gleichgültig: Ein Dreieckssystem kostet
`,e.jsx(n,{children:"O(K^2)"})," Operationen, die volle Elimination ",e.jsx(n,{children:"O(K^3)"}),`
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]}),`
`,e.jsxs(re,{title:"Zwei Basen, ein Interpolant",children:[e.jsxs(i.p,{children:[`Der Rechner führt beide Beispiele vor. Der Schalter wechselt das
Basissystem, die Regler verschieben die drei Messwerte. Beobachten lässt sich
dabei alles, worauf es in diesem Abschnitt ankommt: Die Matrix bleibt beim
Schieben stehen, weil sie nur von den Stellen und der Basis abhängt; die
Koeffizienten springen beim Basiswechsel, die grüne Kurve nicht; und die
orangen Bausteine `,e.jsx(n,{children:"a_k \\corange{\\phi_k}"}),` summieren sich punktweise zu genau
dieser Kurve.`]}),e.jsx(nr,{})]}),`
`,e.jsx(i.h3,{children:"Woran sich Basissysteme unterscheiden"}),`
`,e.jsx(i.p,{children:`Interpolationsverfahren unterscheiden sich im Wesentlichen durch die Wahl des
Basissystems, und manche Systeme sind erheblich brauchbarer als andere. Vier
Kriterien geben den Fahrplan für den Rest des Kapitels vor.`}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kondition."}),` Wie empfindlich reagieren die berechneten Koeffizienten auf
Störungen der Daten? Für eine quadratische invertierbare Matrix kontrolliert
`,e.jsx(n,{children:"\\|\\bB^{-1}\\|"}),` die absolute Verstärkung einer Störung der rechten Seite;
die `,e.jsx(S,{id:"condition-number",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa(\\bB)"}),` liefert die übliche
relative Störungsabschätzung
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`). Bei der Monombasis wächst sie mit
`,e.jsx(n,{children:"K"}),` dramatisch, und das ist ihr Hauptproblem
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stabilität."}),` Ändert sich ein einziger Messwert ein wenig, sollte sich der
Interpolant auch nur ein wenig ändern, und zwar am besten nur in der Nähe
dieses Punktes. Ein globales Polynom schlägt stattdessen im ganzen Intervall
aus, oft am heftigsten weit weg von der Störung
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokalität."}),` Ist jede Basisfunktion nur auf einem kleinen Teilintervall von
null verschieden, so hat `,e.jsx(n,{children:"\\bB"}),` viele Nullen und wird zur Bandmatrix. Genau
das leisten die B-Splines aus `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Effiziente Lösbarkeit."})," Aus der Struktur von ",e.jsx(n,{children:"\\bB"}),` wird Rechenzeit:
Dreiecks- und Bandmatrizen lassen sich mit einem Aufwand lösen, der linear
in der Zahl der Unbekannten wächst, statt kubisch
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`,
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),")."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Im System ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," hat ",e.jsx(n,{children:"\\bB"})," genau ",e.jsx(n,{children:"n"})," Zeilen und ",e.jsx(n,{children:"K"}),` Spalten,
und in Zeile `,e.jsx(n,{children:"i"}),", Spalte ",e.jsx(n,{children:"k"})," steht ",e.jsx(n,{children:"\\corange{\\phi_k(x_i)}"}),"."]}),e.jsxs(i.p,{children:["So steht es in ",e.jsx(i.a,{href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"}),`: Jede Zeile gehört zu einem Datenpunkt, jede
Spalte zu einer Basisfunktion. Die Unbekannte ist der Koeffizientenvektor
`,e.jsx(n,{children:"\\ba \\in \\R^K"}),`, die rechte Seite der Datenvektor
`,e.jsx(n,{children:"\\cblue{\\by} \\in \\R^n"}),"."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bB"})," hängt von den gemessenen Werten ",e.jsx(n,{children:"\\cblue{y_i}"})," ab."]}),e.jsxs(i.p,{children:["In ",e.jsx(n,{children:"\\bB"}),` stehen ausschließlich Werte der Basisfunktionen an den Stellen
`,e.jsx(n,{children:"x_i"}),`. Die Messwerte stehen komplett auf der rechten Seite. Deshalb dürfen
wir für neue Daten an denselben Stellen dieselbe Matrix und dieselbe
Zerlegung weiterverwenden (`,e.jsx(i.a,{href:"#env-was-in-b-steckt-und-was-nicht",children:"Bemerkung 13.2.9"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Sobald wir uns auf einen endlichdimensionalen Ansatzraum ",e.jsx(n,{children:"\\Fcal_K"}),`
beschränken, ist der Interpolant eindeutig.`]}),e.jsxs(i.p,{children:[`Die Einschränkung allein genügt nicht. Suchen wir zu unseren drei Punkten in
den Polynomen vom Grad höchstens `,e.jsx(n,{children:"3"}),", also mit ",e.jsx(n,{children:"K = 4 > 3 = n"}),`, so hat das
System mehr Unbekannte als Gleichungen und weiterhin unendlich viele
Lösungen; der kubische Interpolant aus `,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` ist eine
davon.
Genau eine Lösung für jede rechte Seite gibt es erst, wenn `,e.jsx(n,{children:"\\bB"}),` quadratisch
und invertierbar ist.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Wechseln wir von der Monombasis zur Newton-Basis, so ändert sich der
Interpolant.`}),e.jsxs(i.p,{children:[`Es ändern sich nur die Koeffizienten, von
`,e.jsx(n,{children:"\\cgreen{(1, 0, 1)^\\top}"})," auf ",e.jsx(n,{children:"\\cgreen{(1, 1, 1)^\\top}"}),`. Beide Basen spannen
denselben Ansatzraum auf, und in ihm gibt es zu drei verschiedenen Stellen nur
einen Interpolanten, hier `,e.jsx(n,{children:"\\cgreen{1 + x^2}"})," (",e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`). Am Widget
lässt sich das nachfahren: Die grüne Kurve springt beim Umschalten nicht.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil sich das System aus ",e.jsx(i.a,{href:"#env-basisdarstellung-konkret",children:"Beispiel 13.2.10"}),` durch Einsetzen lösen lässt, ist
`,e.jsx(n,{children:"\\bB"})," dort eine untere Dreiecksmatrix."]}),e.jsxs(i.p,{children:[`Über der Diagonalen steht in Zeile 2 der Eintrag
`,e.jsx(n,{children:"\\corange{\\phi_3(x_2)} = \\corange{1}"}),`, die Matrix ist also keine
Dreiecksmatrix (`,e.jsx(i.a,{href:"#env-einsetzen-ist-hier-nicht",children:"Bemerkung 13.2.11"}),"). Dass die erste Zeile sofort ",e.jsx(n,{children:"a_1"}),` liefert,
liegt allein an `,e.jsx(n,{children:"x_1 = 0"}),`. Erst mit der Newton-Basis entsteht wirklich
Dreiecksgestalt.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Wählen wir ",e.jsx(n,{children:"K"})," Basisfunktionen, so hat der Ansatzraum ",e.jsx(n,{children:"\\Fcal_K"}),` die
Dimension `,e.jsx(n,{children:"K"}),"."]}),e.jsxs(i.p,{children:["Nur wenn die ",e.jsx(n,{children:"\\corange{\\phi_k}"})," linear unabhängig sind (",e.jsx(i.a,{href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`). Mit
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"})," ist ",e.jsx(n,{children:"K = 3"}),", aber ",e.jsx(n,{children:"\\Fcal_3"}),` enthält nur die
Polynome vom Grad höchstens `,e.jsx(n,{children:"1"})," und hat die Dimension ",e.jsx(n,{children:"2"}),`; jede Funktion
darin hat dann unendlich viele Koeffizientenvektoren (`,e.jsx(i.a,{href:"#env-das-wort-basisfunktion-traegt-eine",children:"Bemerkung 13.2.5"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §7.1 (Interpolation, Wahl des Basissystems) und §7.2
(Existenz, Eindeutigkeit, Kondition).`})})]})}function ir(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ii,{...s})}):Ii(s)}const{orange:_n,rot:Wi,grau:Ae}=U;function sr(s,i){const r=s.length,t=s.map((l,a)=>[...l,i[a]]);for(let l=0;l<r;l++){let a=l;for(let h=l+1;h<r;h++)Math.abs(t[h][l])>Math.abs(t[a][l])&&(a=h);if(Math.abs(t[a][l])<1e-300)return null;a!==l&&([t[a],t[l]]=[t[l],t[a]]);for(let h=l+1;h<r;h++){const o=t[h][l]/t[l][l];for(let g=l;g<=r;g++)t[h][g]-=o*t[l][g]}}const d=new Array(r).fill(0);for(let l=r-1;l>=0;l--){let a=t[l][r];for(let h=l+1;h<r;h++)a-=t[l][h]*d[h];d[l]=a/t[l][l]}return d}function rr(s){const i=s.length,r=[];for(let t=0;t<i;t++){const d=new Array(i).fill(0);d[t]=1;const l=sr(s,d);if(!l)return null;r.push(l)}return s.map((t,d)=>r.map(l=>l[d]))}function $i(s){const i=s.length,r=s[0].length;let t=new Array(r).fill(1/Math.sqrt(r));for(let l=0;l<400;l++){const a=s.map(k=>k.reduce((c,z,_)=>c+z*t[_],0)),h=new Array(r).fill(0);for(let k=0;k<r;k++)for(let c=0;c<i;c++)h[k]+=s[c][k]*a[c];const o=Math.hypot(...h);if(!Number.isFinite(o)||o===0)break;const g=h.map(k=>k/o),f=Math.hypot(...g.map((k,c)=>k-t[c]));if(t=g,f<1e-14)break}const d=s.map(l=>l.reduce((a,h,o)=>a+h*t[o],0));return Math.hypot(...d)}const ti=(s,i,r)=>Array.from({length:s},(t,d)=>s===1?(i+r)/2:i+(r-i)*d/(s-1));function tr(s,i){if(s===0)return 1;let r=1,t=i;for(let d=1;d<s;d++){const l=2*i*t-r;r=t,t=l}return t}const yn=[{id:"monom01",name:"Monome auf [0, 1]",kurz:"Monome [0, 1]",dash:""},{id:"monom11",name:"Monome auf [−1, 1]",kurz:"Monome [−1, 1]",dash:"7 4"},{id:"cheb",name:"Chebyshev-Polynome auf [−1, 1]",kurz:"Chebyshev",dash:"2 3"}];function fs(s,i){return s==="monom01"?ti(i,0,1).map(r=>Array.from({length:i},(t,d)=>r**d)):s==="monom11"?ti(i,-1,1).map(r=>Array.from({length:i},(t,d)=>r**d)):ti(i,-1,1).map(r=>Array.from({length:i},(t,d)=>tr(d,r)))}function li(s,i){const r=fs(s,i),t=rr(r);return t?$i(r)*$i(t):1/0}const rn=2,Si=20,tn=[];for(let s=rn;s<=Si;s++)tn.push(s);const Sn={monom01:tn.map(s=>li("monom01",s)),monom11:tn.map(s=>li("monom11",s)),cheb:tn.map(s=>li("cheb",s))};function Vi(s,i){const r=fs("monom01",s),t=o=>r.map(g=>g[o]),d=t(i),l=t(i+1),a=d.reduce((o,g,f)=>o+g*l[f],0),h=Math.hypot(...d)*Math.hypot(...l);return h===0?NaN:Math.acos(Math.min(1,a/h))*180/Math.PI}function qn(s){if(Number.isNaN(s))return"undefiniert";if(!Number.isFinite(s))return"∞";if(s<100)return s.toFixed(s<10?2:1).replace(".",",");let i=Math.floor(Math.log10(s)),r=s/10**i;return r>=9.95&&(r/=10,i+=1),`${r.toFixed(1).replace(".",",")} · 10^${i}`}function Re(s,i=1){return Number.isNaN(s)?"undefiniert":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function lr(){const o=c=>46+c*378,g=c=>12+(1-c)*232,f=[];for(let c=0;c<=7;c++){const z=[];for(let _=0;_<=80;_++){const p=_/80;z.push(`${o(p).toFixed(1)},${g(p**c).toFixed(1)}`)}f.push(z.join(" "))}const k=[{text:"1",t:.42,k:0,dy:14},{text:"x",t:.38,k:1,dy:-6},{text:"x²",t:.56,k:2,dy:-6},{text:"x³",t:.68,k:3,dy:-6},{text:"x⁷",t:.93,k:7,dy:14}];return e.jsxs("svg",{viewBox:"0 0 440 280",className:"max-w-full h-auto",role:"img","aria-label":"Die ersten acht Monome auf dem Einheitsintervall",children:[e.jsx("rect",{x:46,y:12,width:378,height:232,className:"fill-none stroke-slate-400"}),[0,.5,1].map(c=>e.jsxs("g",{children:[e.jsx("line",{x1:o(c),y1:g(0),x2:o(c),y2:g(0)+4,className:"stroke-slate-400"}),e.jsx("text",{x:o(c),y:g(0)+16,textAnchor:"middle",fontSize:11,fill:Ae,children:Re(c,1)})]},`x${c}`)),[0,.5,1].map(c=>e.jsxs("g",{children:[e.jsx("line",{x1:42,y1:g(c),x2:46,y2:g(c),className:"stroke-slate-400"}),e.jsx("text",{x:39,y:g(c)+4,textAnchor:"end",fontSize:11,fill:Ae,children:Re(c,1)})]},`y${c}`)),f.map((c,z)=>e.jsx("polyline",{points:c,fill:"none",stroke:_n,strokeWidth:z===0?1.8:1.2},z)),k.map(({text:c,t:z,k:_,dy:p})=>e.jsx("text",{x:o(z),y:g(z**_)+p,textAnchor:"middle",fontSize:12,fill:_n,children:c},c)),e.jsx("text",{x:46+378/2,y:277,textAnchor:"middle",fontSize:11,fill:Ae,children:"x →"}),e.jsx("text",{x:14,y:12+232/2,textAnchor:"middle",fontSize:11,fill:Ae,transform:`rotate(-90 14 ${12+232/2})`,children:"φₖ(x) ↑"})]})}function dr({n:s,aktiv:i}){const k=p=>52+(p-rn)/(Si-rn)*394,c=p=>14+(1-Math.min(Math.max(p,0),18)/18)*196,z=p=>tn.map((u,j)=>{const m=Number.isFinite(p[j])?Math.log10(p[j]):18;return`${k(u).toFixed(1)},${c(m).toFixed(1)}`}).join(" "),_=s-rn;return e.jsxs("svg",{viewBox:"0 0 460 250",className:"max-w-full h-auto",role:"img","aria-label":"Konditionszahl der Basismatrix gegen die Zahl der Stellen, logarithmische Achse",children:[e.jsx("rect",{x:52,y:14,width:394,height:196,className:"fill-none stroke-slate-400"}),[0,4,8,12,16].map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:52,y1:c(p),x2:446,y2:c(p),className:"stroke-slate-300 dark:stroke-slate-700",strokeDasharray:"2 3"}),e.jsx("text",{x:46,y:c(p)+4,textAnchor:"end",fontSize:10,fill:Ae,children:`10^${p}`})]},p)),e.jsx("line",{x1:52,y1:c(16),x2:446,y2:c(16),stroke:Wi,strokeDasharray:"6 4"}),e.jsx("text",{x:442,y:c(16)-5,textAnchor:"end",fontSize:10,fill:Wi,children:"1/ε ≈ 10^16: doppelte Genauigkeit aufgebraucht"}),tn.filter(p=>p%2===0).map(p=>e.jsx("text",{x:k(p),y:225,textAnchor:"middle",fontSize:10,fill:Ae,children:p},p)),e.jsx("text",{x:52+394/2,y:246,textAnchor:"middle",fontSize:11,fill:Ae,children:"n (Zahl der Stellen) →"}),e.jsx("text",{x:14,y:14+196/2,textAnchor:"middle",fontSize:11,fill:Ae,transform:`rotate(-90 14 ${14+196/2})`,children:"κ₂(B) ↑"}),yn.map(p=>e.jsx("polyline",{points:z(Sn[p.id]),fill:"none",stroke:_n,strokeWidth:p.id===i?2.6:1.3,strokeDasharray:p.dash||void 0,opacity:p.id===i?1:.55},p.id)),e.jsx("line",{x1:k(s),y1:14,x2:k(s),y2:210,className:"stroke-slate-400",strokeDasharray:"3 3"}),yn.map(p=>{const u=Sn[p.id][_],j=Number.isFinite(u)?Math.log10(u):18;return e.jsx("circle",{cx:k(s),cy:c(j),r:p.id===i?4.5:3,fill:_n,opacity:p.id===i?1:.55},p.id)})]})}function ar(){const[s,i]=q.useState(10),[r,t]=q.useState("monom01"),d=s-rn,l=Sn[r][d],a=Sn.monom01[d],h=Number.isFinite(l)?Math.min(16,Math.log10(l)):16,o=Vi(s,0),g=s>=3?Vi(s,s-2):NaN,f=yn.find(c=>c.id===r).name,k=s<3?`Mit ${s} Stellen ist die Basismatrix winzig, und alle drei Systeme sind unbedenklich.`:h>=15.5?`${f}: Bei ${s} Stellen frisst die Konditionszahl rechnerisch alle rund 16 Stellen, die doppelte Genauigkeit hergibt. Das gelöste System hat mit dem gemeinten nichts mehr zu tun.`:h>=6?`${f}: Von den rund 16 sicheren Dezimalstellen sind bei ${s} Stellen etwa ${Re(h,1)} in Gefahr, es bleiben ungefähr ${Re(16-h,1)} übrig. Das ist keine Kleinigkeit mehr.`:`${f}: Bei ${s} Stellen sind rund ${Re(h,1)} der etwa 16 sicheren Dezimalstellen in Gefahr, das ist noch harmlos.`;return e.jsxs("div",{className:"my-2 text-sm",children:[e.jsx(te,{children:"Vergleichen wir die drei Basen und erhöhen dann die Zahl der Stellen."}),e.jsxs("p",{className:"mb-2",children:["Zu ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Stellen bauen wir die",e.jsx(n,{children:"\\,n \\times n"}),"-Basismatrix ",e.jsx(n,{children:"\\bB"})," und schätzen ihre Konditionszahl ",e.jsx(n,{children:"\\kappa_2(\\bB)"})," über die explizit berechnete Inverse. Drei Basissysteme desselben Ansatzraums stehen zur Wahl. Die senkrechte Achse ist logarithmisch: Beide Monom-Kurven sind ungefähr Geraden, ihre Konditionszahl wächst also exponentiell in ",e.jsx(n,{children:"n"}),". Verschieben und Skalieren auf ",e.jsx(n,{children:"[-1, 1]"})," drückt nur die Steigung, die Chebyshev-Polynome drücken sie noch einmal deutlich stärker."]}),e.jsx("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:yn.map(c=>e.jsx("button",{type:"button",onClick:()=>t(c.id),className:`rounded border px-2 py-1 ${r===c.id?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:c.name},c.id))}),e.jsx(J,{label:"n (Zahl der Stellen)",value:s,onChange:c=>i(Math.round(c)),min:rn,max:Si,step:1,fmt:c=>c.toFixed(0)}),e.jsx("div",{className:"my-2 grid gap-2 sm:grid-cols-3",children:yn.map(c=>e.jsxs("div",{className:`rounded p-2 ${r===c.id?"bg-slate-200 dark:bg-slate-700":"bg-slate-100 dark:bg-slate-800"}`,children:[e.jsx("p",{className:"font-semibold",style:{color:_n},children:c.kurz}),e.jsxs("p",{className:"font-mono text-xs",children:["κ₂ ≈ ",qn(Sn[c.id][d])]})]},c.id))}),e.jsx(dr,{n:s,aktiv:r}),e.jsxs("p",{className:"mt-2 font-mono text-xs",children:["n = ",s,", Polynomgrad ",s-1,": κ₂ ≈ ",qn(l)]}),e.jsx(le,{kind:r==="monom01"&&s>=15?"warn":"neutral",children:k}),s>=3?e.jsxs("p",{className:"mt-1",children:[r==="monom01"?"Woher das kommt, zeigen die Spalten dieser Matrix direkt: ":"Woran die Monombasis krankt, zeigen ihre Spalten auf dem Einheitsintervall direkt: ","Die ersten beiden schließen einen Winkel von"," ",e.jsxs("span",{className:"font-mono",children:[Re(o,1),"°"]})," ein, die letzten beiden nur noch"," ",e.jsxs("span",{className:"font-mono",children:[Re(g,1),"°"]}),g<6?". So dicht beieinander sind sie kaum noch zu unterscheiden, und die Konditionszahl setzt dieser Ähnlichkeit eine Zahl entgegen.":". Mit wachsendem n rücken sie weiter zusammen.",r==="monom01"?"":e.jsxs(e.Fragment,{children:[" ","Sie steht bei diesem ",e.jsx(n,{children:"n"})," bei κ₂ ≈ ",qn(a),", das gewählte System bei κ₂ ≈ ",qn(l),"."]})]}):e.jsxs("p",{className:"mt-1",children:["Bei zwei Stellen hat die Monom-Matrix nur die Spalten"," ",e.jsx(n,{children:"\\bb_1"})," und ",e.jsx(n,{children:"\\bb_2"}),", und die schließen einen Winkel von ",e.jsxs("span",{className:"font-mono",children:[Re(o,1),"°"]})," ","ein. Erst mit mehr Stellen rücken benachbarte Spalten zusammen, und die Konditionszahl zieht an."]}),e.jsxs("p",{className:"mt-1 text-xs",style:{color:Ae},children:["Die Werte sind Größenordnungen und hängen von der Norm und von der Lage der Stellen ab; jenseits von ",e.jsx(n,{children:"\\kappa_2 \\approx 10^{16}"})," ist die Rechnung, die sie ausgibt, selbst schon vom Rundungsfehler gezeichnet."]})]})}const{blau:hr,gruen:cr,rot:di,grau:ai}=U,ln=s=>1/(1+25*s*s),ps=s=>Array.from({length:s},(i,r)=>s===1?0:-1+2*r/(s-1)),ks=s=>Array.from({length:s},(i,r)=>Math.cos((2*r+1)*Math.PI/(2*s)));function pi(s,i){const r=s.map(i),t=s.map((d,l)=>{let a=1;for(let h=0;h<s.length;h++)h!==l&&(a*=d-s[h]);return 1/a});return d=>{let l=0,a=0;for(let h=0;h<s.length;h++){const o=d-s[h];if(Math.abs(o)<1e-13)return r[h];const g=t[h]/o;l+=g*r[h],a+=g}return l/a}}function ki(s){let i=0,r=0,t=1/0,d=-1/0;for(let l=0;l<=2e3;l++){const a=-1+l/1e3,h=s(a),o=Math.abs(ln(a)-h);o>i&&(i=o,r=a),t=Math.min(t,h),d=Math.max(d,h)}return{fehler:i,ort:r,lo:t,hi:d}}const ze=3,Cn=21,Zn=[],wi=[];for(let s=ze;s<=Cn;s++)Zn.push(Math.log10(ki(pi(ps(s),ln)).fehler)),wi.push(Math.log10(ki(pi(ks(s),ln)).fehler));function Zi(s,i){const r=Math.min(Cn,Math.max(ze,i))-ze,t=Math.min(s.length-2,Math.floor(r));return s[t]+(r-t)*(s[t+1]-s[t])}function be(s,i=3){return Number.isNaN(s)?"undefiniert":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function or(){const[s,i]=q.useState(11),[r,t]=q.useState("aequi"),d=q.useMemo(()=>r==="aequi"?ps(s):ks(s),[s,r]),l=q.useMemo(()=>pi(d,ln),[d]),{fehler:a,ort:h,lo:o,hi:g}=q.useMemo(()=>ki(l),[l]),f=Math.max(-4,Math.min(-.4,o-.15)),k=Math.min(4,Math.max(1.6,g+.15)),c=o<-4||g>4,z=Math.log10(a),_=s>ze?10**(r==="aequi"?Zn[s-1-ze]:wi[s-1-ze]):NaN,p=Number.isFinite(_)?a<_:!1,u=Math.abs(h)>.7,j=u?"also nahe am Rand":"also im mittleren Bereich",m=`${r==="cheb"?"Chebyshev-Knoten":"Äquidistante Knoten"}, Grad ${s-1}: größter Abstand ${a>=100?be(a,0):be(a)} bei x = ${be(h,2)}, ${j}.`,x=10**Zn[s-ze],B=a<.5*x&&a<.2,F=r==="cheb"?B?`${m} Zu den Rändern hin liegen die Knoten dichter, und dort bleibt die Kurve ruhig; äquidistante Knoten lägen hier bei ${be(x)}.`:`${m} Zu den Rändern hin liegen die Knoten dichter, aber der größte Abstand ist ${a<=x?"kaum kleiner":"sogar größer"} als mit äquidistanten Knoten (${be(x)}). Der Vorsprung zeigt sich erst bei größerem n.`:a>1?`${m} In der Mitte passt der Interpolant gut, an den Enden schlägt er weit aus.`:u?`${m} Der Ausschlag ist noch klein, sitzt aber schon am Rand; von dort wächst er mit weiteren Knoten.`:`${m} Noch sieht es harmlos aus. Ziehen wir n hoch, wandert das Maximum an den Rand und wächst.`,G=s===ze?"":p?` Der letzte hinzugekommene Knoten hat den Fehler von ${be(_,3)} auf ${be(a,3)} gedrückt.`:` Der letzte hinzugekommene Knoten hat den Fehler von ${be(_,3)} auf ${be(a,3)} gehoben.`;return e.jsxs("div",{className:"my-2 text-sm",children:[e.jsx(te,{children:"Wählen wir eine Knotenfamilie und verändern die Knotenzahl; erst dann lesen wir den Fehler ab."}),e.jsx("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:[["aequi","äquidistante Knoten"],["cheb","Chebyshev-Knoten"]].map(([b,R])=>e.jsx("button",{type:"button",onClick:()=>t(b),className:`rounded border px-2 py-1 ${r===b?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:R},b))}),e.jsx(J,{label:"n (Zahl der Knoten)",value:s,onChange:b=>i(Math.round(b)),min:ze,max:Cn,step:1,fmt:b=>b.toFixed(0)}),e.jsxs("div",{className:"my-2 flex flex-wrap items-start gap-5",children:[e.jsxs("div",{children:[e.jsx(Ee,{xLabel:"x",yLabel:"y",series:[{f:ln,color:ai},{f:l,color:cr}],xDomain:[-1,1],yDomain:[f,k],width:360,height:250,markers:d.map(b=>({x:b,y:ln(b),color:hr}))}),e.jsxs("p",{className:"mt-1 max-w-[22rem] text-center text-xs",style:{color:ai},children:["Grau die Funktion ",e.jsx(n,{children:"f"}),", blau die Stützpunkte, grün der Interpolant.",c?" Der Interpolant verlässt am Rand das gezeichnete Fenster.":""]})]}),e.jsxs("div",{children:[e.jsx(Ee,{xLabel:"n (Knoten)",yLabel:"log₁₀ max|f−p|",series:[{f:b=>Zi(Zn,b),color:di},{f:b=>Zi(wi,b),color:di,dash:[5,4]}],xDomain:[ze,Cn],yDomain:[-2.4,2.4],width:300,height:220,markers:[{x:s,y:z,color:di}]}),e.jsx("p",{className:"mt-1 max-w-[19rem] text-center text-xs",style:{color:ai},children:"Beide Kurven messen dieselbe Größe und tragen deshalb dieselbe Farbe: durchgezogen die äquidistanten, gestrichelt die Chebyshev-Knoten."})]})]}),e.jsxs("p",{className:"font-mono text-xs",children:["n = ",s,", Grad ",s-1,", ",r==="aequi"?"äquidistant":"Chebyshev",": max|f − p| ≈"," ",a>=100?be(a,0):be(a)]}),e.jsxs(le,{kind:r==="aequi"&&a>1?"fail":r==="cheb"?B?"ok":"neutral":"warn",children:[F,G," Das illustriert ",ce("bemerkung:divergenz-schon-aber-nicht-monoton"),": Bei äquidistanten Knoten wächst der Fehler asymptotisch, aber nicht monoton."]})]})}function Ti(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` hat das Interpolationsproblem auf das lineare
Gleichungssystem `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` zurückgeführt. Damit ist die Wahl des
Ansatzraums die eigentliche Entscheidung, und die naheliegendste ist zugleich
die älteste: Polynome, aufgeschrieben in der Monombasis. Dieser Abschnitt
zeigt beide Seiten dieser Wahl. Theoretisch ist der Fall erledigt, und zwar
so schön, wie man es sich nur wünschen kann: Durch `,e.jsx(n,{children:"n"}),` Punkte läuft genau ein
Polynom vom Grad höchstens `,e.jsx(n,{children:"n-1"}),`. Numerisch dagegen sammelt derselbe Ansatz
drei Probleme ein, eine katastrophal konditionierte Matrix, eine global
instabile Lösung und ein Konvergenzverhalten, das an einem harmlos
aussehenden Beispiel spektakulär versagt.`]}),`
`,e.jsx(i.h3,{children:"Wie viele Nullstellen ein Polynom haben kann"}),`
`,e.jsx(i.p,{children:`Die Eindeutigkeit hängt an einer einzigen Aussage über Nullstellen, und die
kommt aus der Algebra.`}),`
`,e.jsxs(w,{kind:"Satz",label:"13.3.1 (Fundamentalsatz der Algebra)",id:"env-fundamentalsatz-der-algebra",children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(S,{id:"polynomial",children:"Polynom"}),`
`,e.jsx(n,{children:"p(x) = a_n x^n + \\dots + a_1 x + a_0"})," mit ",e.jsx(n,{children:"a_n \\neq 0"})," und ",e.jsx(n,{children:"n \\ge 1"}),` hat
mindestens eine `,e.jsx(S,{id:"polynomial-roots",children:"Nullstelle"})," in ",e.jsx(n,{children:"\\C"}),"."]}),e.jsxs(i.p,{children:["Gleichwertig dazu: Jedes Polynom vom Grad ",e.jsx(n,{children:"n"})," hat in ",e.jsx(n,{children:"\\C"})," genau ",e.jsx(n,{children:"n"}),`
Nullstellen, wenn wir sie mit Vielfachheit zählen.`]})]}),`
`,e.jsxs(i.p,{children:["Beide Fassungen gehen durch Polynomdivision auseinander hervor. Ist ",e.jsx(n,{children:"x_0"}),`
eine Nullstelle von `,e.jsx(n,{children:"p"}),`, so lässt sich der Linearfaktor abspalten,
`,e.jsx(n,{children:"p(x) = (x - x_0)\\, q(x)"})," mit ",e.jsx(n,{children:"\\deg q = n - 1"}),", und auf ",e.jsx(n,{children:"q"}),` wenden wir
dieselbe Überlegung an. Nach `,e.jsx(n,{children:"n"})," Schritten ist ",e.jsx(n,{children:"p"}),` vollständig in
Linearfaktoren zerlegt. Wir brauchen den Satz allerdings gar nicht in dieser
Stärke, sondern nur seine Kehrseite.`]}),`
`,e.jsx(w,{kind:"Korollar",label:"13.3.2 (Zu viele Nullstellen erzwingen das Nullpolynom)",id:"env-zu-viele-nullstellen-erzwingen-das",children:e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"p"})," ein Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"})," mit ",e.jsx(n,{children:"n"}),` paarweise verschiedenen
Nullstellen. Dann ist `,e.jsx(n,{children:"p"})," das Nullpolynom, es gilt also ",e.jsx(n,{children:"p(x) = 0"}),` für
`,e.jsx(i.em,{children:"alle"})," ",e.jsx(n,{children:"x"}),"."]})}),`
`,e.jsxs(he,{children:[e.jsx(K,{why:e.jsxs(e.Fragment,{children:["der Grad eines Polynoms ist der größte Index mit ",e.jsx(n,{children:"a_d \\neq 0"}),"; nur das Nullpolynom hat gar keinen solchen Index"]}),children:e.jsxs(i.p,{children:["Nehmen wir an, ",e.jsx(n,{children:"p"})," sei nicht das Nullpolynom. Dann besitzt ",e.jsx(n,{children:"p"}),` einen Grad
`,e.jsx(n,{children:"d"})," mit ",e.jsx(n,{children:"0 \\le d \\le n-1"})," und einen führenden Koeffizienten ",e.jsx(n,{children:"a_d \\neq 0"}),"."]})}),e.jsx(K,{children:e.jsxs(i.p,{children:["Im Fall ",e.jsx(n,{children:"d = 0"})," ist ",e.jsx(n,{children:"p"})," die konstante Funktion ",e.jsx(n,{children:"a_0 \\neq 0"}),` und hat
überhaupt keine Nullstelle. Das widerspricht der Voraussetzung, denn
`,e.jsx(n,{children:"n \\ge 1"}),"."]})}),e.jsx(K,{why:e.jsx(e.Fragment,{children:"verschiedene Nullstellen zählen mindestens einfach, ihre Anzahl ist also höchstens die Zahl der mit Vielfachheit gezählten"}),children:e.jsxs(i.p,{children:["Im Fall ",e.jsx(n,{children:"d \\ge 1"})," hat ",e.jsx(n,{children:"p"})," nach ",e.jsx(i.a,{href:"#env-fundamentalsatz-der-algebra",children:"Satz 13.3.1"}),` mit Vielfachheit gezählt genau
`,e.jsx(n,{children:"d"})," Nullstellen in ",e.jsx(n,{children:"\\C"}),", also höchstens ",e.jsx(n,{children:"d \\le n-1"}),` verschiedene. Auch das
widerspricht der Voraussetzung von `,e.jsx(n,{children:"n"})," verschiedenen Nullstellen."]})}),e.jsx(K,{children:e.jsxs(i.p,{children:["Beide Fälle sind unmöglich, die Annahme fällt. Also ist ",e.jsx(n,{children:"p"})," das Nullpolynom."]})})]}),`
`,e.jsx(w,{kind:"Beispiel",label:"13.3.3 (Drei Nullstellen bei Grad höchstens zwei)",id:"env-drei-nullstellen-bei-grad-hoechstens",children:e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"2"}),` hat höchstens zwei verschiedene
Nullstellen; das kennen wir von der Parabel. Finden wir also ein solches
Polynom mit drei Nullstellen, etwa `,e.jsx(n,{children:"p(-1) = p(0) = p(1) = 0"}),`, so bleibt nur
ein Schluss: `,e.jsx(n,{children:"p"})," ist das Nullpolynom, und dann ist auch ",e.jsx(n,{children:"p(7) = 0"}),` und
`,e.jsx(n,{children:"p(10^6) = 0"}),`. Aus drei Nullstellen wird eine Aussage über die gesamte reelle
Achse, und genau diese Hebelwirkung brauchen wir gleich.`]})}),`
`,e.jsx(i.h3,{children:"Genau ein Polynom durch n Punkte"}),`
`,e.jsxs(i.p,{children:[`Wir halten zuerst den Ansatzraum und seine Basismatrix fest. Beides kennen
wir schon aus `,e.jsx(i.a,{href:"#env-zwei-ansatzraeume",children:"Beispiel 13.2.6"}),", hier bekommen sie ihre Namen."]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.3.4 (Monombasis und Vandermonde-Matrix)",id:"env-monombasis-und-vandermonde-matrix",children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"n"})," Funktionen"]}),e.jsx(y,{children:`\\corange{\\phi_1(x)} = 1, \\quad
\\corange{\\phi_2(x)} = x, \\quad \\dots, \\quad
\\corange{\\phi_n(x)} = x^{n-1}`}),e.jsxs(i.p,{children:["heißen ",e.jsx(i.em,{children:"Monombasis"}),` (monomial basis). Sie sind
`,e.jsx(S,{id:"linear-independence",children:"linear unabhängig"}),` und spannen den Ansatzraum
`,e.jsx(n,{children:"\\Fcal_n"})," aller Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` auf, der damit die
Dimension `,e.jsx(n,{children:"n"})," hat."]}),e.jsxs(i.p,{children:["Die zugehörige Basismatrix aus ",e.jsx(i.a,{href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})," zu Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n"}),`
heißt `,e.jsx(i.em,{children:"Vandermonde-Matrix"}),":"]}),e.jsx(y,{children:`\\bB = \\begin{pmatrix}
\\corange{1} & \\corange{x_1} & \\corange{x_1^2} & \\cdots & \\corange{x_1^{n-1}} \\\\
\\corange{1} & \\corange{x_2} & \\corange{x_2^2} & \\cdots & \\corange{x_2^{n-1}} \\\\
\\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\
\\corange{1} & \\corange{x_n} & \\corange{x_n^2} & \\cdots & \\corange{x_n^{n-1}}
\\end{pmatrix} \\in \\R^{n \\times n} .`})]}),`
`,e.jsxs(i.p,{children:["Dass die Monome linear unabhängig sind, ist ",e.jsx(i.a,{href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` in anderer
Verpackung: Verschwindet `,e.jsx(n,{children:"\\sum_{k=1}^n a_k x^{k-1}"})," für alle ",e.jsx(n,{children:"x"}),`, so hat
dieses Polynom vom Grad höchstens `,e.jsx(n,{children:"n-1"}),` unendlich viele Nullstellen, ist also
das Nullpolynom, und damit sind alle `,e.jsx(n,{children:"a_k"})," null."]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.3.5 (Existenz und Eindeutigkeit der Polynominterpolation)",id:"env-existenz-und-eindeutigkeit-der",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(n,{children:"n"})," Paaren ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"})," gibt es ",e.jsx(i.em,{children:"genau ein"})," Polynom ",e.jsx(n,{children:"\\cgreen{p}"}),` vom Grad
`,e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"})," mit"]}),e.jsx(y,{children:`\\cgreen{p(x_i)} = \\cblue{y_i}
\\qquad \\text{für } i = 1, \\dots, n .`}),e.jsx(i.p,{children:`Gleichbedeutend damit ist: Die Vandermonde-Matrix zu paarweise verschiedenen
Stellen ist invertierbar.`})]}),`
`,e.jsxs(he,{children:[e.jsxs(K,{why:e.jsx(e.Fragment,{children:"beide erfüllen dieselbe Interpolationsbedingung an derselben Stelle"}),children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Eindeutigkeit."})," Seien ",e.jsx(n,{children:"\\cgreen{p}"})," und ",e.jsx(n,{children:"\\cgreen{q}"}),` zwei Polynome vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),`, die beide interpolieren. Für ihre Differenz gilt an jeder
Stelle`]}),e.jsx(y,{children:`(\\cgreen{p} - \\cgreen{q})(x_i)
= \\cgreen{p(x_i)} - \\cgreen{q(x_i)}
= \\cblue{y_i} - \\cblue{y_i} = 0 .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["die Differenz zweier Polynome vom Grad höchstens ",e.jsx(n,{children:"n-1"})," hat wieder Grad höchstens ",e.jsx(n,{children:"n-1"})]}),children:e.jsxs(i.p,{children:["Damit hat ",e.jsx(n,{children:"\\cgreen{p} - \\cgreen{q}"})," mindestens ",e.jsx(n,{children:"n"}),` verschiedene Nullstellen,
obwohl der Grad höchstens `,e.jsx(n,{children:"n-1"})," ist. Nach ",e.jsx(i.a,{href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` ist die Differenz
das Nullpolynom, also `,e.jsx(n,{children:"\\cgreen{p} = \\cgreen{q}"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bB\\ba"})," ist der Vektor der Werte dieses Polynoms an den Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n"})]}),children:e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Invertierbarkeit von ",e.jsx(n,{children:"\\bB"}),"."]})," Sei ",e.jsx(n,{children:"\\ba \\in \\R^n"})," mit ",e.jsx(n,{children:"\\bB\\ba = \\bnull"}),`. Nach
`,e.jsx(i.a,{href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})," heißt das: Das Polynom ",e.jsx(n,{children:"\\sum_{k=1}^n a_k x^{k-1}"}),` verschwindet an
allen `,e.jsx(n,{children:"n"})," Stellen. ",e.jsx(i.a,{href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` macht daraus das Nullpolynom, und weil die
Monome linear unabhängig sind, folgt `,e.jsx(n,{children:"\\ba = \\bnull"}),"."]})}),e.jsx(K,{children:e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bB"}),` ist quadratisch und hat nur den trivialen
`,e.jsx(S,{id:"kernel",children:"Kern"}),`, ist also invertierbar
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.1",children:"Abschnitt 5.1"}),"). Damit besitzt ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),`
für jede rechte Seite genau eine Lösung, und das ist die `,e.jsx(i.em,{children:"Existenz"}),`: Zu jedem
Datenvektor gehört ein interpolierendes Polynom, nämlich
`,e.jsx(n,{children:"\\cgreen{p} = \\sum_{k=1}^n a_k \\corange{\\phi_k}"}),"."]})})]}),`
`,e.jsx(i.h3,{children:"Höchstens, nicht genau"}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.3.6 (Ein häufiges Missverständnis)",id:"env-ein-haeufiges-missverstaendnis",children:e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"})," verspricht genau ein Polynom vom Grad ",e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"}),`. Er
verspricht nicht den Grad `,e.jsx(i.em,{children:"genau"})," ",e.jsx(n,{children:"n-1"}),`. Der führende Koeffizient darf null
sein, und wenn die Daten schon auf einem Polynom kleineren Grades liegen, ist
er es auch. Der Ansatzraum `,e.jsx(n,{children:"\\Fcal_n"})," enthält diese Polynome ja ebenfalls."]})}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.3.7 (Drei Punkte auf einer Geraden)",id:"env-drei-punkte-auf-einer-geraden",children:[e.jsxs(i.p,{children:["Für die ",e.jsx(n,{children:"n = 3"})," Punkte ",e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,2)}"}),`
lautet das System aus `,e.jsx(i.a,{href:"#env-das-interpolationsproblem-ist-ein",children:"Satz 13.2.8"})]}),e.jsx(y,{children:`\\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{0} \\\\
\\corange{1} & \\corange{1} & \\corange{1} \\\\
\\corange{1} & \\corange{2} & \\corange{4}
\\end{pmatrix}
\\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}
= \\begin{pmatrix} \\cblue{0} \\\\ \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix},
\\qquad \\text{Lösung} \\quad
\\cgreen{\\ba} = (0, 1, 0)^\\top .`}),e.jsxs(i.p,{children:["Das eindeutige Polynom vom Grad höchstens ",e.jsx(n,{children:"2"})," ist also"]}),e.jsx(y,{children:"\\cgreen{p(x)} = \\cgreen{0} \\cdot x^2 + 1 \\cdot x + 0 = x,"}),e.jsxs(i.p,{children:["eine Gerade und damit vom Grad ",e.jsx(n,{children:"1"}),`. Die Eindeutigkeit gilt trotzdem: Ein
zweites Polynom vom Grad höchstens `,e.jsx(n,{children:"2"}),` durch dieselben drei Punkte gibt es
nicht.`]})]}),`
`,e.jsx(i.h3,{children:"Der Rechenweg und sein Preis"}),`
`,e.jsxs(w,{kind:"Algorithmus",label:"13.3.8 (Polynominterpolation in der Monombasis)",id:"env-polynominterpolation-in-der-monombasis",children:[e.jsxs(i.p,{children:["Gegeben seien Daten ",e.jsx(n,{children:"\\cblue{(x_i, y_i)}"}),", ",e.jsx(n,{children:"i = 1, \\dots, n"}),`, mit paarweise
verschiedenen `,e.jsx(n,{children:"x_i"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Vandermonde-Matrix aufstellen:"})," ",e.jsx(n,{children:"B_{ik} = x_i^{k-1}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"System lösen:"})," ",e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` mit
`,e.jsx(S,{id:"gaussian-elimination",children:"Gauß-Elimination"}),`
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),"), Aufwand ",e.jsx(n,{children:"O(n^3)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Auswerten:"})," ",e.jsx(n,{children:"\\cgreen{p(x)} = \\sum_{k=1}^n a_k x^{k-1}"}),` an den
gewünschten Stellen.`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["In ",e.jsx(i.code,{children:"R"})," sind das wenige Zeilen, hier für ",e.jsx(n,{children:"n = 10"}),` Stellen im Intervall
`,e.jsx(n,{children:"[0, 1]"}),"; die Funktion ",e.jsx(i.code,{children:"f"}),` liefert dabei die Werte, die interpoliert werden
sollen.`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`x <- seq(0, 1, length = 10)
y <- f(x)

B <- outer(x, 0:9, "^")  # Vandermonde-Matrix: cbind(1, x, x^2, ...)
a <- solve(B, y)

xnew <- seq(0, 1, length = 100)
fhat <- outer(xnew, 0:9, "^") %*% a

ggplot() + geom_point(aes(x, y)) + geom_line(aes(xnew, fhat))
`})}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:'outer(x, 0:9, "^")'})," baut genau die Matrix aus ",e.jsx(i.a,{href:"#env-monombasis-und-vandermonde-matrix",children:"Definition 13.3.4"}),", ",e.jsx(i.code,{children:"solve"}),`
ruft die Elimination auf, und die letzte Auswertung ist wieder ein
Matrix-Vektor-Produkt, diesmal mit einem feinen Auswertungsgitter. So weit,
so unauffällig. Nur ist dieses `,e.jsx(n,{children:"10 \\times 10"}),`-System bereits so schlecht
konditioniert, dass von den rund `,e.jsx(n,{children:"16"}),` verlässlichen Dezimalstellen der
doppelten Genauigkeit etwa sieben verloren gehen. Warum, klärt der nächste
Abschnitt.`]}),`
`,e.jsx(i.h3,{children:"Problem 1: die Kondition der Monombasis"}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.3.9 (Warum die Spalten fast parallel werden)",id:"env-warum-die-spalten-fast-parallel-werden",children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"k"}),"-te Spalte der Vandermonde-Matrix ist der Vektor"]}),e.jsx(y,{children:"\\bb_k = \\bigl(x_1^{k-1}, x_2^{k-1}, \\dots, x_n^{k-1}\\bigr)^\\top ."}),e.jsxs(i.p,{children:["Für wachsendes ",e.jsx(n,{children:"k"}),` unterscheiden sich diese Vektoren immer weniger in ihrer
`,e.jsx(i.em,{children:"Richtung"}),". Auf ",e.jsx(n,{children:"[0, 1]"}),` drückt jedes weitere Potenzieren die Einträge gegen
null, den größten aber gar nicht, denn er gehört zu `,e.jsx(n,{children:"x_n = 1"}),`. Damit
konzentriert sich jeder dieser Vektoren mehr und mehr auf seine letzten
Komponenten, und alle zeigen am Ende in dieselbe Richtung.
Bei `,e.jsx(n,{children:"n = 10"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` schließen
`,e.jsx(n,{children:"\\bb_1"})," und ",e.jsx(n,{children:"\\bb_2"})," noch einen Winkel von ",e.jsx(n,{children:"32{,}6^\\circ"}),` ein,
`,e.jsx(n,{children:"\\bb_5"})," und ",e.jsx(n,{children:"\\bb_6"})," nur noch ",e.jsx(n,{children:"5{,}5^\\circ"}),", und ",e.jsx(n,{children:"\\bb_9"})," und ",e.jsx(n,{children:"\\bb_{10}"}),`
gerade einmal `,e.jsx(n,{children:"2{,}7^\\circ"}),"."]}),e.jsxs(i.p,{children:["Fast parallele Spalten heißen: fast ",e.jsx(S,{id:"linear-independence",children:"linear abhängig"}),`,
also eine Matrix, die einer singulären sehr nahe kommt. Genau das misst die
`,e.jsx(S,{id:"condition-number",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa(\\bB)"}),`
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),"), und sie wächst hier dramatisch."]})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.3.10 (Konditionszahlen, der Größenordnung nach)",id:"env-konditionszahlen-der-groessenordnung",children:[e.jsxs(i.p,{children:["Wir interpolieren an ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` durch ein
Polynom vom Grad `,e.jsx(n,{children:"n-1"})," und sehen uns die Konditionszahl der Vandermonde-Matrix an."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"n"})}),e.jsx(i.th,{style:{textAlign:"center"},children:"Polynomgrad"}),e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\kappa_2(\\bB)"})}),e.jsx(i.th,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\kappa_\\infty(\\bB)"})})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"5"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"6{,}9 \\cdot 10^{2}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}7 \\cdot 10^{3}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"10"}),e.jsx(i.td,{style:{textAlign:"center"},children:"9"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}5 \\cdot 10^{7}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}8 \\cdot 10^{7}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"15"}),e.jsx(i.td,{style:{textAlign:"center"},children:"14"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}0 \\cdot 10^{11}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}6 \\cdot 10^{12}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"20"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"1{,}1 \\cdot 10^{16}"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"4{,}9 \\cdot 10^{16}"})})]})]})]}),e.jsxs(i.p,{children:["Die Werte sind ",e.jsx(i.em,{children:"illustrativ"}),` und als Größenordnungen zu lesen. Sie hängen von
der verwendeten `,e.jsx(S,{id:"matrix-norm",children:"Norm"}),` ab, wie der Vergleich der beiden
Spalten zeigt, und ebenso von der Lage der Stellen: Dieselbe Rechnung auf
`,e.jsx(n,{children:"[-1, 1]"})," statt auf ",e.jsx(n,{children:"[0, 1]"})," liefert bei ",e.jsx(n,{children:"n = 20"}),` nur noch
`,e.jsx(n,{children:"\\kappa_2 \\approx 2{,}7 \\cdot 10^{8}"}),"."]}),e.jsxs(i.p,{children:[`Entscheidend ist der Trend, und der ist in jeder Norm derselbe: exponentielles
Wachstum. Die Faustregel aus `,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),` beschränkt
den relativen Fehler der berechneten Koeffizienten der Größenordnung nach
durch `,e.jsx(n,{children:"\\kappa(\\bB) \\cdot \\eps"}),` mit
`,e.jsx(n,{children:"\\eps \\approx 2{,}2 \\cdot 10^{-16}"}),`
(`,e.jsx(S,{id:"machine-epsilon",children:"Maschinengenauigkeit"}),`,
`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.1",children:"Abschnitt 4.1"}),`). Bei
`,e.jsx(n,{children:"n = 10"})," steht dort ",e.jsx(n,{children:"\\cred{3 \\cdot 10^{-9}}"}),", bei ",e.jsx(n,{children:"n = 15"}),` schon
`,e.jsx(n,{children:"\\cred{10^{-4}}"}),", und bei ",e.jsx(n,{children:"n = 20"})," ist die Schranke mit ",e.jsx(n,{children:"\\cred{2}"}),` größer als
die gesuchten Zahlen selbst: Von der Lösung bleibt rechnerisch nichts
Verlässliches übrig.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.3.11 (Der Ausweg: orthogonalisierte Basen)",id:"env-der-ausweg-orthogonalisierte-basen",children:[e.jsxs(i.p,{children:["Die schlechte Kondition ist eine Eigenschaft der ",e.jsx(i.em,{children:"Basis"}),`, nicht des
Ansatzraums. Nach `,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` ändert ein Basiswechsel den
Interpolanten nicht, nur die Koeffizienten und den Rechenweg. Wählen wir
Basisfunktionen, die sich weniger ähneln, wird die Basismatrix besser
konditioniert. Klassisch sind dafür die `,e.jsx(i.em,{children:"orthogonalen Polynome"}),`
(Legendre, Chebyshev, Hermite), die bezüglich eines Skalarprodukts von
Funktionen `,e.jsx(S,{id:"orthogonality",children:"orthogonal"}),` sind. An denselben
gleichmäßig verteilten Stellen wie oben liefern die Chebyshev-Polynome
`,e.jsx(n,{children:"\\kappa_2 \\approx 2{,}2"})," statt ",e.jsx(n,{children:"6{,}9 \\cdot 10^2"})," bei ",e.jsx(n,{children:"n = 5"}),` und
`,e.jsx(n,{children:"\\kappa_2 \\approx 4{,}8 \\cdot 10^3"})," statt ",e.jsx(n,{children:"1{,}1 \\cdot 10^{16}"}),` bei
`,e.jsx(n,{children:"n = 20"}),", ein Gewinn von zwölf Zehnerpotenzen."]}),e.jsxs(i.p,{children:["Noch weiter geht ",e.jsx(i.code,{children:"R"})," mit ",e.jsx(i.code,{children:"poly(x, 3)"}),` anstelle der drei nichtkonstanten
Spalten `,e.jsx(i.code,{children:"cbind(x, x^2, x^3)"}),". Der Aufruf erzeugt bezüglich der ",e.jsx(i.em,{children:"gegebenen"}),`
Stellen orthonormale Spalten, im Kern über eine stabile
Orthogonalisierung der Vandermonde-Spalten. `,e.jsx(i.code,{children:"poly(x, 3)"}),` allein hat deshalb
in der 2-Norm Konditionszahl `,e.jsx(n,{children:"1"}),`. Ergänzen wir für ein Regressionsmodell die
unnormierte konstante Spalte, also `,e.jsx(i.code,{children:"cbind(1, poly(x, 3))"}),`, stehen weiterhin
alle Spalten senkrecht aufeinander, aber ihre Längen sind `,e.jsx(n,{children:"\\sqrt n,1,1,1"}),`;
die Konditionszahl ist dann `,e.jsx(n,{children:"\\sqrt n"}),`. Normieren wir auch die erste Spalte,
fällt sie wieder auf `,e.jsx(n,{children:"1"}),"."]})]}),`
`,e.jsxs(re,{title:"Die Monombasis und ihre Kondition",children:[e.jsxs(i.p,{children:["Warum sind die Spalten einer Vandermonde-Matrix auf ",e.jsx(n,{children:"[0,1]"})," fast parallel? Die erste Tafel macht die Ursache sichtbar."]}),e.jsx(lr,{}),e.jsx(i.p,{children:`Diese Ähnlichkeit ist es, die das Gleichungssystem verdirbt. Der Regler zieht
die Zahl der Stellen hoch, die Schalter wechseln zwischen drei Basissystemen
desselben Ansatzraums.`}),e.jsx(ar,{})]}),`
`,e.jsx(i.h3,{children:"Problem 2: Stabilität und Lokalität"}),`
`,e.jsx(i.p,{children:`Die zweite Schwäche zeigt sich, wenn wir an den Daten wackeln. Ändern wir
einen einzigen Messwert, so ändert sich der Interpolant im gesamten
Intervall, und keineswegs am stärksten dort, wo wir gewackelt haben.`}),`
`,e.jsxs(w,{kind:"Satz",label:"13.3.12 (Wie sich eine Datenänderung fortpflanzt)",id:"env-wie-sich-eine-datenaenderung-fortpflanzt",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cgreen{p}"})," das interpolierende Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` zu
den Daten `,e.jsx(n,{children:"\\cblue{(x_i, y_i)}"})," und ",e.jsx(n,{children:"\\cgreen{\\wt{p}}"}),` das interpolierende
Polynom zu denselben Daten, bei denen nur `,e.jsx(n,{children:"\\cblue{y_j}"})," um ",e.jsx(n,{children:"\\cred{\\delta}"}),`
verändert wurde. Dann gilt`]}),e.jsx(y,{children:"\\cgreen{\\wt{p}} - \\cgreen{p} = \\cred{\\delta} \\cdot \\ell_j,"}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\ell_j"})," das eindeutige Polynom vom Grad höchstens ",e.jsx(n,{children:"n-1"}),` mit
`,e.jsx(n,{children:"\\ell_j(x_j) = 1"})," und ",e.jsx(n,{children:"\\ell_j(x_i) = 0"})," für ",e.jsx(n,{children:"i \\neq j"})," ist."]})]}),`
`,e.jsxs(he,{children:[e.jsx(K,{why:e.jsxs(e.Fragment,{children:["beide Polynome interpolieren dieselben Daten bis auf den ",e.jsx(n,{children:"j"}),"-ten Wert, ihre Differenz interpoliert also die Differenz der Daten"]}),children:e.jsxs(i.p,{children:["Die Differenz ",e.jsx(n,{children:"\\cgreen{\\wt{p}} - \\cgreen{p}"}),` ist ein Polynom vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),`, und an den Stellen nimmt sie die Werte
`,e.jsx(n,{children:"0, \\dots, 0, \\cred{\\delta}, 0, \\dots, 0"})," an, mit ",e.jsx(n,{children:"\\cred{\\delta}"}),` an der
`,e.jsx(n,{children:"j"}),"-ten Position."]})}),e.jsx(K,{children:e.jsxs(i.p,{children:["Dieselben Werte hat ",e.jsx(n,{children:"\\cred{\\delta} \\cdot \\ell_j"}),`, und auch dieses Polynom hat
Grad höchstens `,e.jsx(n,{children:"n-1"}),". Nach der Eindeutigkeit in ",e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` sind beide
Polynome gleich.`]})})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.3.13 (Was das in Zahlen heißt)",id:"env-was-das-in-zahlen-heisst",children:[e.jsxs(i.p,{children:["Die Polynome ",e.jsx(n,{children:"\\ell_j"})," heißen ",e.jsx(i.em,{children:"Lagrange-Grundpolynome"}),", und ",e.jsx(i.a,{href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"}),` sagt:
Der Ausschlag einer Datenänderung ist überall dort groß, wo `,e.jsx(n,{children:"|\\ell_j|"}),` groß
ist. Rechnen wir das für `,e.jsx(n,{children:"n = 10"})," gleichmäßig verteilte Stellen in ",e.jsx(n,{children:"[0, 1]"}),`
aus und heben den fünften Wert bei `,e.jsx(n,{children:"x_5 = 4/9 \\approx 0{,}444"}),` um
`,e.jsx(n,{children:"\\cred{\\delta} = 0{,}1"}),` an, so verschiebt sich der Interpolant um bis zu
`,e.jsx(n,{children:"\\cred{0{,}40}"}),`, das Vierfache der Störung. Erreicht wird dieses Maximum bei
`,e.jsx(n,{children:"x \\approx 0{,}035"}),", also am ",e.jsx(i.em,{children:"anderen Ende"}),` des Intervalls. Der größte solche
Verstärkungsfaktor liegt bei diesen zehn Stellen bei `,e.jsx(n,{children:"4{,}03"}),` und gehört zu
den beiden mittleren, `,e.jsx(n,{children:"x_5"})," und ",e.jsx(n,{children:"x_6"}),"."]}),e.jsxs(i.p,{children:["Damit sind beide Schwächen beziffert. Die Methode ist ",e.jsx(i.em,{children:"instabil"}),`,
weil kleine Datenänderungen groß herauskommen, und sie ist `,e.jsx(i.em,{children:"nicht lokal"}),`,
weil jedes `,e.jsx(n,{children:"\\ell_j"}),` auf dem ganzen Intervall von null verschieden ist. Beides
ist kein Malheur der Monombasis, sondern eine Eigenschaft globaler
Polynome: `,e.jsx(n,{children:"\\ell_j"}),` hängt allein vom Ansatzraum ab. Abhilfe schaffen erst
Basisfunktionen, die außerhalb eines kleinen Bereichs verschwinden
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")."]})]}),`
`,e.jsx(Q,{title:"Wenn alle Werte gleichzeitig gestört werden",children:e.jsxs(i.p,{children:[`Wie schlimm es werden kann, hängt an der Zahl der Stellen. Stören wir alle
Werte gleichzeitig um höchstens `,e.jsx(n,{children:"\\cred{\\delta}"}),`, so ändert sich der
Interpolant um höchstens `,e.jsx(n,{children:"\\Lambda_n \\cdot \\cred{\\delta}"}),` mit
`,e.jsx(n,{children:"\\Lambda_n = \\max_x \\sum_{j=1}^n |\\ell_j(x)|"}),`, und diese Schranke wird bei
passend gewählten Vorzeichen auch angenommen. Für gleichmäßig verteilte
Stellen wächst diese Zahl rasant, nämlich auf `,e.jsx(n,{children:"2{,}2"})," bei ",e.jsx(n,{children:"n = 5"}),", ",e.jsx(n,{children:"17{,}9"})," bei ",e.jsx(n,{children:"n = 10"}),`,
`,e.jsx(n,{children:"283"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"5890"})," bei ",e.jsx(n,{children:"n = 20"}),`. Für die Chebyshev-Knoten, die uns
gleich wieder begegnen, bleibt sie im selben Bereich zwischen `,e.jsx(n,{children:"2{,}0"}),` und
`,e.jsx(n,{children:"2{,}9"}),"."]})}),`
`,e.jsx(i.h3,{children:"Das Runge-Phänomen"}),`
`,e.jsx(i.p,{children:`Bleibt die Frage, ob wenigstens der Interpolant selbst besser wird, wenn wir
mehr Stützstellen nehmen. Bei einer beliebig oft differenzierbaren Funktion
sollte man das erwarten. Carl Runge hat 1901 gezeigt, dass die Erwartung
trügt.`}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.3.14 (Runge 1901)",id:"env-runge-1901",children:[e.jsx(i.p,{children:"Wir interpolieren"}),e.jsx(y,{children:`f(x) = \\frac{1}{1 + 25x^2}
\\qquad \\text{auf } [-1, 1]`}),e.jsxs(i.p,{children:["an ",e.jsx(n,{children:"n"})," gleichmäßig verteilten Knoten durch das Polynom ",e.jsx(n,{children:"\\cgreen{p_{n-1}}"}),` vom
Grad `,e.jsx(n,{children:"n-1"}),". Die Funktion ",e.jsx(n,{children:"f"}),` ist so gutartig, wie man es sich wünschen kann,
sie ist `,e.jsx(S,{id:"smooth-function",children:"beliebig oft differenzierbar"}),`, also
`,e.jsx(n,{children:"f \\in \\Ccal^\\infty"}),", und beschränkt durch ",e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:["Trotzdem konvergieren die Interpolanten nicht gleichmäßig gegen ",e.jsx(n,{children:"f"}),`. Der
Fehler `,e.jsx(n,{children:`\\left\\|f - \\cgreen{p_{n-1}}\\right\\|_\\infty = \\max_{x \\in [-1,1]}
\\left|f(x) - \\cgreen{p_{n-1}(x)}\\right|`}),` wächst über alle Grenzen, und zwar
durch immer heftigere `,e.jsx("span",{style:{color:"#D55E00"},children:"Oszillationen"}),` nahe den
Intervallenden. In der Mitte passt sich das Polynom dabei immer besser an.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.3.15 (Divergenz schon, aber nicht monoton)",id:"env-divergenz-schon-aber-nicht-monoton",children:[e.jsxs(i.p,{children:[`Die knappe Schreibweise
`,e.jsx(n,{children:"\\left\\|f - \\cgreen{p_{n-1}}\\right\\|_\\infty \\to \\infty"})," für ",e.jsx(n,{children:"n \\to \\infty"}),`
legt nahe, dass jeder zusätzliche Knoten die Lage verschlimmert. Das ist
nicht so. Nachgerechnet ergeben sich für gleichmäßig verteilte Knoten diese
größten Fehler:`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"center"},children:[e.jsx(n,{children:"n"})," Knoten"]}),e.jsx(i.th,{style:{textAlign:"center"},children:"Polynomgrad"}),e.jsx(i.th,{style:{textAlign:"center"},children:"größter Fehler"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Stelle des Maximums"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"5"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"0{,}44"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}80"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"10"}),e.jsx(i.td,{style:{textAlign:"center"},children:"9"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"0{,}30"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}93"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"15"}),e.jsx(i.td,{style:{textAlign:"center"},children:"14"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"7{,}2"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}96"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"center"},children:"20"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"8{,}6"})}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"x \\approx \\pm 0{,}97"})})]})]})]}),e.jsxs(i.p,{children:["Von ",e.jsx(n,{children:"n = 5"})," auf ",e.jsx(n,{children:"n = 10"})," ",e.jsx(i.em,{children:"fällt"}),` der Fehler. Erst danach dreht die Folge
nach oben, und dann sehr entschlossen: bei `,e.jsx(n,{children:"n = 25"}),` steht dort bereits
`,e.jsx(n,{children:"257"}),`. Die Aussage lautet also präzise, dass der Fehler asymptotisch
unbeschränkt wächst, nicht dass er in jedem Schritt zunimmt. Zugleich zeigt
die letzte Spalte, wo das Unheil sitzt: Das Fehlermaximum wandert mit
wachsendem `,e.jsx(n,{children:"n"})," immer näher an die Ränder ",e.jsx(n,{children:"\\pm 1"}),"."]})]}),`
`,e.jsx(Q,{title:"Chebyshev-Knoten als Gegenmittel",children:e.jsxs(w,{kind:"Bemerkung",label:"13.3.16 (Ein Ausweg: die Knoten anders legen)",id:"env-ein-ausweg-die-knoten-anders-legen",children:[e.jsxs(i.p,{children:["Am Ansatzraum liegt es nicht, und an der Basis auch nicht: ",e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` gibt
zu jeder Knotenwahl dasselbe eindeutige Polynom her. Es liegt an den
`,e.jsx(i.em,{children:"Knoten"}),`. Legen wir sie an den Rändern dichter, statt sie gleichmäßig zu
verteilen, verschwindet das Problem. Die übliche Wahl sind die
`,e.jsx(i.em,{children:"Chebyshev-Knoten"})]}),e.jsx(y,{children:`\\cblue{x_i} = \\cos\\!\\left(\\frac{(2i-1)\\pi}{2n}\\right),
\\qquad i = 1, \\dots, n,`}),e.jsxs(i.p,{children:["die Nullstellen des ",e.jsx(n,{children:"n"}),`-ten Chebyshev-Polynoms. Für Runges Funktion sinkt der
größte Fehler damit auf `,e.jsx(n,{children:"0{,}047"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"0{,}038"})," bei ",e.jsx(n,{children:"n = 20"}),`,
gegen `,e.jsx(n,{children:"7{,}2"})," und ",e.jsx(n,{children:"8{,}6"})," oben, und er fällt weiter: ",e.jsx(n,{children:"1{,}3 \\cdot 10^{-5}"}),` bei
`,e.jsx(n,{children:"n = 60"}),`. Ehrlicherweise gehört dazu, dass dieser Gewinn asymptotisch ist. Bei
`,e.jsx(n,{children:"n = 4"}),", ",e.jsx(n,{children:"6"})," und ",e.jsx(n,{children:"8"}),` Knoten schneiden die gleichmäßig verteilten Knoten sogar
etwas besser ab.`]})]})}),`
`,e.jsxs(i.p,{children:[`Chebyshev-Knoten zähmen das Runge-Phänomen, setzen aber voraus, dass wir die
Stellen frei wählen dürfen (in der Vertiefung
`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),` erklärt). Bei gemessenen Daten
liegen sie fest, und dann hilft nur ein anderer Ansatzraum.`]}),`
`,e.jsxs(re,{title:"Runges Funktion, zwei Knotenfamilien",children:[e.jsxs(i.p,{children:["Fällt der Fehler bei äquidistanten Knoten von ",e.jsx(n,{children:"n=5"})," auf ",e.jsx(n,{children:"n=10"}),", oder steigt er schon dort?"]}),e.jsx(Ue,{variante:"auswahl",frage:"Welche Richtung nimmt der Fehler von n = 5 auf n = 10 bei äquidistanten Knoten?",loesung:"faellt",optionen:[{id:"faellt",text:"Er fällt"},{id:"steigt",text:"Er steigt"}],children:e.jsx(or,{})}),e.jsxs(i.p,{children:["Der Vergleich zeigt den nichtmonotonen Start aus ",e.jsx(i.a,{href:"#env-divergenz-schon-aber-nicht-monoton",children:"Bemerkung 13.3.15"}),": Von ",e.jsx(n,{children:"n = 5"})," auf ",e.jsx(n,{children:"n = 10"})," fällt der Fehler zunächst, bevor die Randoszillationen dominieren."]})]}),`
`,e.jsxs(i.p,{children:[`Damit ist die Bilanz der Polynominterpolation gemischt. Der Satz von der
Existenz und Eindeutigkeit ist so sauber, wie ein Satz nur sein kann. Der
praktische Nutzen des globalen Polynoms hoher Ordnung ist trotzdem gering: Es
rechnet sich schlecht, es reagiert auf jeden Messwert im ganzen Intervall,
und es konvergiert nicht einmal für harmlose Funktionen. Der Schluss daraus
trägt den Rest des Kapitels. Statt eines globalen
Polynoms hohen Grades nehmen wir viele Polynome kleinen Grades, jedes nur auf
einem kurzen Stück gültig, und kleben sie glatt aneinander. Das sind die
`,e.jsx(i.em,{children:"Splines"})," aus ",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Durch ",e.jsx(n,{children:"n"})," Punkte mit paarweise verschiedenen ",e.jsx(n,{children:"x_i"}),` läuft genau ein Polynom
vom Grad höchstens `,e.jsx(n,{children:"n-1"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),". Die Eindeutigkeit folgt aus ",e.jsx(i.a,{href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` über die
Differenz zweier Interpolanten, die Existenz aus der Invertierbarkeit der
Vandermonde-Matrix.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Das interpolierende Polynom durch ",e.jsx(n,{children:"n"})," Punkte hat den Grad genau ",e.jsx(n,{children:"n-1"}),"."]}),e.jsxs(i.p,{children:["Es hat Grad ",e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"n-1"}),`. Für die drei Punkte
`,e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,2)}"}),` liefert das System die
Koeffizienten `,e.jsx(n,{children:"\\cgreen{(0, 1, 0)^\\top}"}),`, das Polynom ist also
`,e.jsx(n,{children:"\\cgreen{p(x)} = x"})," und damit vom Grad ",e.jsx(n,{children:"1"})," (",e.jsx(i.a,{href:"#env-drei-punkte-auf-einer-geraden",children:"Beispiel 13.3.7"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"5"}),` mit sechs verschiedenen Nullstellen kann
noch von null verschiedene Werte annehmen.`]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-zu-viele-nullstellen-erzwingen-das",children:"Korollar 13.3.2"}),` ist es das Nullpolynom, nimmt also überall den Wert null
an. Ein Polynom vom Grad `,e.jsx(n,{children:"d \\ge 1"})," hat mit Vielfachheit gezählt genau ",e.jsx(n,{children:"d"}),`
Nullstellen, ein konstantes Polynom ungleich null gar keine; sechs
verschiedene Nullstellen bei Grad höchstens `,e.jsx(n,{children:"5"}),` sind in beiden Fällen zu
viele.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`Die Vandermonde-Matrix ist zu paarweise verschiedenen Stellen stets
invertierbar und kann trotzdem numerisch unbrauchbar sein.`}),e.jsxs(i.p,{children:[`Invertierbarkeit ist eine Ja-Nein-Frage, Kondition eine Frage des Ausmaßes.
Bei `,e.jsx(n,{children:"n = 20"})," gleichmäßig verteilten Stellen in ",e.jsx(n,{children:"[0, 1]"}),` ist
`,e.jsx(n,{children:"\\det \\bB \\neq 0"}),", aber ",e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 10^{16}"}),`, und damit ist die
Schranke `,e.jsx(n,{children:"\\kappa \\cdot \\eps"})," für den relativen Fehler von der Größe ",e.jsx(n,{children:"1"}),`
(`,e.jsx(i.a,{href:"#env-konditionszahlen-der-groessenordnung",children:"Beispiel 13.3.10"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Bei äquidistanten Knoten wird der Fehler ",e.jsx(n,{children:"\\max|f - \\cgreen{p_{n-1}}|"}),` für
Runges Funktion mit jedem zusätzlichen Knoten größer.`]}),e.jsxs(i.p,{children:["Er wächst asymptotisch über alle Grenzen, aber nicht monoton: von ",e.jsx(n,{children:"n = 5"}),` auf
`,e.jsx(n,{children:"n = 10"})," fällt er von ",e.jsx(n,{children:"0{,}44"})," auf ",e.jsx(n,{children:"0{,}30"})," (",e.jsx(i.a,{href:"#env-divergenz-schon-aber-nicht-monoton",children:"Bemerkung 13.3.15"}),`). Erst danach
setzt das Wachstum durch, mit `,e.jsx(n,{children:"7{,}2"})," bei ",e.jsx(n,{children:"n = 15"})," und ",e.jsx(n,{children:"8{,}6"})," bei ",e.jsx(n,{children:"n = 20"}),"."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Wechseln wir von der Monombasis zu den Chebyshev-Polynomen, so verschwindet
bei gleichmäßig verteilten Knoten auch das Runge-Phänomen.`}),e.jsxs(i.p,{children:[`Der Basiswechsel bessert die Kondition des Gleichungssystems, mehr nicht.
Nach `,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),` gehört zu den Daten dasselbe eindeutige Polynom, gleich in
welcher Basis wir es aufschreiben, also auch derselbe Fehler. Gegen die
Oszillationen hilft nur, die Knoten anders zu legen oder den Ansatzraum zu
wechseln (`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),")."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Heben wir bei fester Knotenmenge einen einzigen Wert ",e.jsx(n,{children:"\\cblue{y_j}"}),` um
`,e.jsx(n,{children:"\\cred{\\delta}"})," an, so ändert sich der Interpolant an jeder Stelle ",e.jsx(n,{children:"x"}),` um
`,e.jsx(n,{children:"\\cred{\\delta}\\,\\ell_j(x)"}),"."]}),e.jsxs(i.p,{children:["So steht es in ",e.jsx(i.a,{href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"}),`, und der Beweis ist die Eindeutigkeit aus
`,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),". Weil ",e.jsx(n,{children:"\\ell_j"}),` nur an den anderen Knoten verschwindet, wirkt die
Änderung im gesamten Intervall, bei `,e.jsx(n,{children:"n = 10"})," mit einem Faktor bis ",e.jsx(n,{children:"4{,}03"}),`
und am stärksten fern von `,e.jsx(n,{children:"x_j"})," (",e.jsx(i.a,{href:"#env-was-das-in-zahlen-heisst",children:"Bemerkung 13.3.13"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath, Scientific Computing, §7.3.1 (Monombasis und
Vandermonde-Matrix), §7.3.4 (orthogonale Polynome) und §7.3.5 (Interpolation
stetiger Funktionen mit Runge-Phänomen und Chebyshev-Knoten); die
Lagrange-Grundpolynome aus `,e.jsx(i.a,{href:"#env-wie-sich-eine-datenaenderung-fortpflanzt",children:"Satz 13.3.12"})," stehen dort in §7.3.2."]})})]})}function xr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ti,{...s})}):Ti(s)}const zi=U.blau,dn=U.gruen,se=U.orange,un=U.rot,Gn=U.violett,Pe=U.grau,$=H;function ws(s,i){const r=s.length-1,t=[];for(let d=0;d<=i;d++)t.push(s[0]);for(let d=1;d<=r-1;d++)t.push(s[d]);for(let d=0;d<=i;d++)t.push(s[r]);return t}function fe(s,i,r,t){if(r===0)return s[i]<=t&&t<s[i+1]?1:0;let d=0,l=0;const a=s[i+r]-s[i],h=s[i+r+1]-s[i+1];return a>0&&(d=(t-s[i])/a*fe(s,i,r-1,t)),h>0&&(l=(s[i+r+1]-t)/h*fe(s,i+1,r-1,t)),d+l}function Li(s,i,r,t){const d=s[i+r]-s[i],l=s[i+r+1]-s[i+1],a=d>0?r/d*fe(s,i,r-1,t):0,h=l>0?r/l*fe(s,i+1,r-1,t):0;return a-h}function ur(s,i,r,t){const d=s[i+r]-s[i],l=s[i+r+1]-s[i+1],a=d>0?r/d*Li(s,i,r-1,t):0,h=l>0?r/l*Li(s,i+1,r-1,t):0;return a-h}function Oe(s,i,r,t,d){return fe(s,i,r,Math.min(t,d-1e-9))}function zs(s,i){const r=i.length,t=s.map(a=>a.slice()),d=i.slice();for(let a=0;a<r;a++){let h=a;for(let o=a+1;o<r;o++)Math.abs(t[o][a])>Math.abs(t[h][a])&&(h=o);if(Math.abs(t[h][a])<1e-13)return null;[t[a],t[h]]=[t[h],t[a]],[d[a],d[h]]=[d[h],d[a]];for(let o=a+1;o<r;o++){const g=t[o][a]/t[a][a];for(let f=a;f<r;f++)t[o][f]-=g*t[a][f];d[o]-=g*d[a]}}const l=new Array(r).fill(0);for(let a=r-1;a>=0;a--){let h=d[a];for(let o=a+1;o<r;o++)h-=t[a][o]*l[o];l[a]=h/t[a][a]}return l}const C=[0,1,2,3],_i=()=>new Array(12).fill(0),Je=(s,i)=>{const r=_i();return r[4*s]=1,r[4*s+1]=i,r[4*s+2]=i*i,r[4*s+3]=i**3,r},Rn=(s,i)=>{const r=_i();return r[4*s+1]=1,r[4*s+2]=2*i,r[4*s+3]=3*i*i,r},Pn=(s,i)=>{const r=_i();return r[4*s+2]=2,r[4*s+3]=6*i,r},hi=(s,i)=>s.map((r,t)=>r-i[t]);function gr(){const[s,i]=q.useState([0,1,0,-1]),[r,t]=q.useState("natuerlich"),d=q.useMemo(()=>{const x=[],B=[];x.push(Je(0,C[0])),B.push(s[0]),x.push(Je(0,C[1])),B.push(s[1]),x.push(Je(1,C[2])),B.push(s[2]),x.push(Je(2,C[3])),B.push(s[3]);for(const F of[0,1]){const G=C[F+1];x.push(hi(Je(F,G),Je(F+1,G))),B.push(0),x.push(hi(Rn(F,G),Rn(F+1,G))),B.push(0),x.push(hi(Pn(F,G),Pn(F+1,G))),B.push(0)}return r==="natuerlich"?(x.push(Pn(0,C[0])),B.push(0),x.push(Pn(2,C[3])),B.push(0)):(x.push(Rn(0,C[0])),B.push(0),x.push(Rn(2,C[3])),B.push(0)),zs(x,B)},[s,r]);if(!d)return e.jsx("p",{className:"text-sm",style:{color:se},children:"Für diese Eingaben ist das System singulär."});const l=d,a=x=>B=>l[4*x]+l[4*x+1]*B+l[4*x+2]*B*B+l[4*x+3]*B**3,h=x=>B=>l[4*x+1]+2*l[4*x+2]*B+3*l[4*x+3]*B*B,o=x=>B=>2*l[4*x+2]+6*l[4*x+3]*B,g=x=>x<1?a(0)(x):x<2?a(1)(x):a(2)(x);let f=1/0,k=-1/0;for(let x=0;x<=300;x++){const B=g(3*x/300);f=Math.min(f,B),k=Math.max(k,B)}const c=Math.min(-2.5,f-.4),z=Math.max(3,k+.4),_=[[],[7,4],[2,3]],p=[0,1,2].map(x=>({f:B=>B>=C[x]&&B<=C[x+1]?a(x)(B):NaN,color:dn,dash:_[x]})),u=(x,B)=>Math.abs(x(B)(C[B+1])-x(B+1)(C[B+1])),j=Math.max(...[0,1].flatMap(x=>[u(a,x),u(h,x),u(o,x)])),m=r==="natuerlich"?[o(0)(C[0]),o(2)(C[3])]:[h(0)(C[0]),h(2)(C[3])];return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Verschieben wir einen Messwert und vergleichen die beiden Randbedingungen."}),e.jsxs("p",{className:"mb-2 text-sm",children:["Wir halten die vier Stellen ",e.jsx(n,{children:"\\xi_0 = 0, \\dots, \\xi_3 = 3"})," fest und verschieben die vier Messwerte. Das Widget baut die zwölf Zeilen genau so auf, wie sie im Text stehen, löst das System mit Spaltenpivotierung und zeichnet die drei kubischen Stücke. Alle drei sind Teile ",e.jsx("em",{children:"desselben"})," Interpolanten und deshalb grün; unterschieden sind sie nur durch die Strichelung."]}),e.jsx("div",{className:"mb-2 flex flex-wrap items-center gap-2 text-sm",children:["natuerlich","eingespannt"].map(x=>e.jsx("button",{type:"button",onClick:()=>t(x),className:`rounded border px-2 py-1 ${r===x?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`,children:x==="natuerlich"?"natürlich: s''(0) = s''(3) = 0":"eingespannt: s'(0) = s'(3) = 0"},x))}),e.jsx("div",{className:"mb-2 grid max-w-xl gap-x-8 sm:grid-cols-2",children:C.map((x,B)=>e.jsx(J,{label:`y bei x = ${x}`,value:s[B],onChange:F=>i(G=>G.map((b,R)=>R===B?F:b)),min:-2,max:2,step:.25,fmt:F=>$(F,2)},x))}),e.jsxs("div",{className:"flex flex-wrap items-start gap-5",children:[e.jsxs("div",{children:[e.jsx(Ee,{xLabel:"x",yLabel:"y",series:p,markers:[...C.map((x,B)=>({x,y:s[B],color:zi})),{x:1,y:c+.05*(z-c),color:se},{x:2,y:c+.05*(z-c),color:se}],xDomain:[-.15,3.15],yDomain:[c,z],width:340,height:250}),e.jsxs("p",{className:"mt-1 max-w-[21rem] text-xs text-slate-500 dark:text-slate-400",children:["Blau die Daten, grün die drei Stücke (durchgezogen, gestrichelt, gepunktet), orange am unteren Rand die inneren Knoten bei",e.jsx(n,{children:"x = 1"})," und ",e.jsx(n,{children:"x = 2"}),". Wo genau ein Stück endet und das nächste beginnt, verrät die Kurve nicht; das Readout daneben misst nach."]})]}),e.jsxs("div",{className:"text-sm",children:[e.jsxs("table",{className:"mb-2 font-mono text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-slate-500 dark:text-slate-400",children:[e.jsx("th",{className:"pr-2 text-left font-normal",children:"Stück"}),e.jsx("th",{className:"px-2 font-normal",children:"konst."}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x"})}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x^2"})}),e.jsx("th",{className:"px-2 font-normal",children:e.jsx(n,{children:"x^3"})})]})}),e.jsx("tbody",{children:[0,1,2].map(x=>e.jsxs("tr",{children:[e.jsxs("td",{className:"pr-2 text-slate-500 dark:text-slate-400",children:["p",x+1," auf [",C[x],", ",C[x+1],"]"]}),[0,1,2,3].map(B=>e.jsx("td",{className:"px-2 text-right",style:{color:dn},children:$(l[4*x+B],3)},B))]},x))})]}),e.jsxs("p",{children:["Probe an den Daten:"," ",e.jsx("span",{className:"font-mono",style:{color:dn},children:C.map(x=>$(g(x),2)).join(" · ")})," ","gegen"," ",e.jsx("span",{className:"font-mono",style:{color:zi},children:s.map(x=>$(x,2)).join(" · ")})]}),e.jsxs("p",{className:"mt-1",children:["Größter Sprung von ",e.jsx(n,{children:"s"}),", ",e.jsx(n,{children:"s'"})," oder ",e.jsx(n,{children:"s''"})," an den inneren Knoten:"," ",e.jsx("span",{className:"font-mono",children:j<1e-9?"0 (bis auf Rundung)":j.toExponential(1)})]}),e.jsxs("p",{className:"mt-1",style:{color:Pe},children:["Randbedingung: ",r==="natuerlich"?"s''":"s'"," an den Enden ="," ",e.jsx("span",{className:"font-mono",children:m.map(x=>$(x,3)).join(" und ")})]}),e.jsxs("p",{className:"mt-2 max-w-[22rem]",children:[r==="natuerlich"?"Natürlich heißt: An beiden Enden verschwindet die Krümmung, der Spline läuft dort geradlinig aus.":"Eingespannt heißt hier: An beiden Enden ist die Steigung auf null gesetzt, der Spline läuft dort waagerecht aus."," ","Beide Male bleiben es zwölf Bedingungen für zwölf Unbekannte, nur die letzten beiden Zeilen der Matrix wechseln."]}),e.jsx("p",{className:"mt-1 max-w-[22rem]",children:"Ein Blick auf die Koeffiziententabelle beim Schieben lohnt sich: Es gibt keine Zeile, die stehen bliebe. Zwölf Zahlen hängen an vier Messwerten, und die Zuordnung ist so verteilt, dass jede von jedem abhängt. Weiter unten in diesem Abschnitt steht dieselbe Funktion in einer anderen Darstellung, und dort geht das anders aus."})]})]}),e.jsx(le,{kind:j<1e-9?"ok":"warn",children:j<1e-9?"Die drei Stücke schließen ohne sichtbaren Sprung aneinander an. Die zwölf Bedingungen bestimmen den Spline für die gewählte Randbedingung.":"Die Rundung lässt einen Sprung erkennen; wir prüfen die Randwerte und die lineare Lösung erneut."})]})}const X=[0,1,2,3,4,5,6,7,8,9],ee=2,jr=["nullten","ersten","zweiten","dritten"];function mr(){const[s,i]=q.useState(2),[r,t]=q.useState(3.4),d=Math.round(s),l=Math.min(r,X[ee]+d+1),a=_=>(_-X[ee])/(X[ee+d]-X[ee]),h=_=>(X[ee+d+1]-_)/(X[ee+d+1]-X[ee+1]),o=[{f:_=>fe(X,ee,d-1,_),color:Gn,dash:[]},{f:_=>fe(X,ee+1,d-1,_),color:Gn,dash:[2,3]},{f:a,color:Pe,dash:[6,4]},{f:h,color:Pe,dash:[6,4]},{f:_=>fe(X,ee,d,_),color:se,dash:[]}],g=a(l),f=fe(X,ee,d-1,l),k=h(l),c=fe(X,ee+1,d-1,l),z=fe(X,ee,d,l);return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Verschieben wir x* und lesen die beiden gewichteten Beiträge ab."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(J,{label:"Grad q",value:s,onChange:i,min:1,max:3,step:1,fmt:_=>`${Math.round(_)}`}),e.jsx(J,{label:"Stelle x*",value:l,onChange:t,min:X[ee],max:X[ee]+d+1,step:.05,fmt:_=>$(_,2)})]}),e.jsx("p",{className:"my-1 text-sm",children:e.jsx(n,{children:`B_{3}^{(${d})}(x) = \\frac{x - \\tau_3}{\\tau_{${3+d}} - \\tau_3}\\, B_{3}^{(${d-1})}(x) + \\frac{\\tau_{${4+d}} - x}{\\tau_{${4+d}} - \\tau_4}\\, B_{4}^{(${d-1})}(x)`})}),e.jsxs("div",{className:"mb-1 text-sm",children:["An der Stelle ",e.jsx(n,{children:`x^* = ${$(l,2)}`}),":"," ",e.jsxs("span",{className:"font-mono",style:{color:Gn},children:[$(g,3)," · ",$(f,3)]})," ","+"," ",e.jsxs("span",{className:"font-mono",style:{color:Gn},children:[$(k,3)," · ",$(c,3)]})," ","="," ",e.jsx("span",{className:"font-mono",style:{color:se},children:$(z,4)})]}),e.jsx(Ee,{xLabel:"x",yLabel:"",series:o,markers:[...X.slice(1,8).map(_=>({x:_,y:0,color:se})),{x:l,y:z,color:se}],xDomain:[1.5,7.5],yDomain:[0,1.12],width:480,height:230}),e.jsxs(le,{kind:"ok",children:["Beide Rampen gewichten nichtnegative Nachbarfunktionen. Deshalb bleibt ",e.jsx(n,{children:`B_3^{(${d})}`})," nichtnegativ; sein Träger wächst um ein Intervall und die Glattheit reicht bis zur ",jr[d-1]," Ableitung (",Ns("eq:erweiterte-knotenfolge-und-b-splines-2"),")."]})]})}const Ci=[0,1,2,3,4,5],gn=5;function br(){const[s,i]=q.useState(3),[r,t]=q.useState(4),[d,l]=q.useState(2.4),[a,h]=q.useState(!0),o=Math.round(s),g=q.useMemo(()=>ws(Ci,o),[o]),f=g.length-o-1,k=Math.min(Math.round(r),f),c=q.useMemo(()=>{const u=Array.from({length:f},(j,m)=>({f:x=>Oe(g,m,o,x,gn),color:m===k-1?se:Pe}));return a&&u.push({f:j=>{let m=0;for(let x=0;x<f;x++)m+=Oe(g,x,o,j,gn);return m},color:Pe,dash:[6,4]}),u},[g,o,f,k,a]),z=Oe(g,k-1,o,d,gn);let _=0;for(let u=0;u<f;u++)_+=Oe(g,u,o,d,gn);let p=0;for(let u=0;u<f;u++)Oe(g,u,o,d,gn)>1e-12&&p++;return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Wählen wir Grad, Basisfunktion und Stelle; vergleichen wir dann ihren Träger mit dem Rekursionsschritt darunter."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(J,{label:"Grad q",value:s,onChange:i,min:0,max:3,step:1,fmt:u=>`${Math.round(u)}`}),e.jsx(J,{label:"hervorgehoben k",value:k,onChange:t,min:1,max:f,step:1,fmt:u=>`${Math.round(u)}`}),e.jsx(J,{label:"Stelle x*",value:d,onChange:l,min:0,max:5,step:.05,fmt:u=>$(u,2)}),e.jsxs("label",{className:"my-1 flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:a,onChange:u=>h(u.target.checked)}),e.jsx("span",{children:"Summe aller Basisfunktionen zeigen"})]})]}),e.jsxs("div",{className:"mb-2 text-sm",children:[e.jsxs("p",{children:[e.jsx(n,{children:`m + 2q + 1 = ${Ci.length-1+2*o+1}`})," Knoten:"," ",e.jsxs("span",{className:"font-mono",style:{color:se},children:["(",g.map(u=>$(u,0)).join("; "),")"]})]}),e.jsxs("p",{children:["daraus ",e.jsx(n,{children:`m + q = ${f}`})," Basisfunktionen vom Grad"," ",e.jsx(n,{children:`q = ${o}`}),"."]})]}),e.jsx(Ee,{xLabel:"x",yLabel:"",series:c,markers:[...g.map(u=>({x:u,y:0,color:se})),{x:d,y:z,color:se}],xDomain:[-.2,5.2],yDomain:[0,1.12],width:480,height:230}),e.jsxs("div",{className:"mt-2 text-sm",children:[e.jsxs("p",{children:["Träger der hervorgehobenen Funktion:"," ",e.jsx(n,{children:`[\\tau_{${k}}, \\tau_{${k+o+1}}] = [${$(g[k-1],0)}, ${$(g[k+o],0)}]`}),", also"," ",g[k+o]-g[k-1]===1?"ein Gitterintervall":`${$(g[k+o]-g[k-1],0)} Gitterintervalle`,"."]}),e.jsxs("p",{className:"mt-1",children:["An der Stelle ",e.jsx(n,{children:`x^* = ${$(d,2)}`}),":"," ",e.jsx(n,{children:`B_{${k}}^{(${o})}(x^*) = `}),e.jsx("span",{className:"font-mono",style:{color:se},children:$(z,4)}),", Summe aller ",e.jsx("span",{className:"font-mono",children:$(_,4)}),", davon"," ",e.jsx("span",{className:"font-mono",children:p})," von ",f," Funktionen ungleich null."]}),e.jsxs(le,{kind:Math.abs(_-1)<1e-10?"ok":"warn",children:["Der Träger von ",e.jsx(n,{children:`B_{${k}}^{(${o})}`})," ist genau ",e.jsx(n,{children:`[\\tau_${k},\\tau_{${k+o+1}}]`}),"; an x* sind ",p," Funktionen aktiv. Ihre Summe ist ",$(_,4),", wie ",ce("bemerkung:warum-die-knotenfolge-so-lang-sein-muss")," vorhersagt."]})]}),e.jsxs("details",{className:"mt-3",children:[e.jsx("summary",{className:"cursor-pointer text-sm font-medium",children:"Rekursionsschritt an einer Stelle"}),e.jsx(mr,{})]})]})}const ae=[1,2,3,4,5,6,7,8,9],ci=[.2,.9,1.4,1.6,1.5,1.2,.9,.7,.6],An=3,Bi=9,Qn=ws(ae,An),He=Qn.length-An-1,Oi=(s,i)=>ur(Qn,s,An,Math.min(i,Bi-1e-9));function fr(){const s=[];s.push(Array.from({length:He},(i,r)=>Oi(r,ae[0])));for(const i of ae)s.push(Array.from({length:He},(r,t)=>Oe(Qn,t,An,i,Bi)));return s.push(Array.from({length:He},(i,r)=>Oi(r,ae[8]))),s}const vs=fr();function Hi(s){const i=ae.length,r=s.slice();for(let t=1;t<i;t++)for(let d=i-1;d>=t;d--)r[d]=(r[d]-r[d-1])/(ae[d]-ae[d-t]);return t=>{let d=r[i-1];for(let l=i-2;l>=0;l--)d=d*(t-ae[l])+r[l];return d}}function Ui(s){return zs(vs,[0,...s,0])}function pr(){const[s,i]=q.useState(5),[r,t]=q.useState(1),d=Math.round(s),{daten:l,cVor:a,cNach:h,pVor:o,pNach:g}=q.useMemo(()=>{const D=ci.map((M,v)=>v===d-1?M+r:M);return{daten:D,cVor:Ui(ci),cNach:Ui(D),pVor:Hi(ci),pNach:Hi(D)}},[d,r]);if(!a||!h)return e.jsx("p",{className:"text-sm",style:{color:un},children:"Die Kollokationsmatrix ist singulär."});const f=D=>M=>D.reduce((v,I,oe)=>v+I*Oe(Qn,oe,An,M,Bi),0),k=f(a),c=f(h);let z=1/0,_=-1/0,p=0,u=0,j=0,m=0;for(let D=0;D<=400;D++){const M=ae[0]+8*D/400;for(const oe of[k(M),c(M),o(M),g(M)])z=Math.min(z,oe),_=Math.max(_,oe);const v=Math.abs(c(M)-k(M)),I=Math.abs(g(M)-o(M));p=Math.max(p,v),u=Math.max(u,I),Math.abs(M-ae[d-1])>2&&(j=Math.max(j,v),m=Math.max(m,I))}const x=Math.min(-1,z-.3),B=Math.max(2.2,_+.3),F=a.map((D,M)=>Math.abs(h[M]-D)),G=Math.max(...F,1e-12),b=F.filter(D=>D>.01*Math.max(Math.abs(r),1e-9)).length,R=ae.map((D,M)=>({x:D,y:l[M],color:M===d-1?un:zi})),P=(D,M,v)=>e.jsxs("div",{children:[e.jsx("p",{className:"mb-1 text-sm font-semibold",children:D}),e.jsx(Ee,{xLabel:"x",yLabel:"y",series:[{f:M,color:Pe,dash:[5,4]},{f:v,color:dn}],markers:R,xDomain:[.8,9.2],yDomain:[x,B],width:330,height:210})]});return e.jsxs("div",{className:"my-2",children:[e.jsx(te,{children:"Verschieben wir einen Datenpunkt und vergleichen die Fernwirkung beider Interpolanten."}),e.jsx("p",{className:"mb-2 text-sm",children:"Neun Datenpunkte, einer davon lässt sich verschieben. Beide Tafeln zeigen denselben Vorgang mit verschiedenen Ansatzräumen: links das Interpolationspolynom vom Grad 8, rechts der natürliche kubische Spline zum Gitter der Datenpunkte. Grau gestrichelt liegt jeweils der ungestörte Interpolant darunter, grün der neue, rot markiert ist der verschobene Punkt."}),e.jsxs("div",{className:"mb-2 grid max-w-2xl gap-x-8 sm:grid-cols-2",children:[e.jsx(J,{label:"Punkt j",value:d,onChange:i,min:1,max:9,step:1,fmt:D=>`${Math.round(D)}`}),e.jsx(J,{label:"Verschiebung δ",value:r,onChange:t,min:-2,max:2,step:.25,fmt:D=>$(D,2)})]}),e.jsxs("div",{className:"flex flex-wrap gap-5",children:[P("Polynom vom Grad 8",o,g),P("Natürlicher kubischer Spline",k,c)]}),e.jsxs("div",{className:"mt-2 text-sm",children:[e.jsxs("p",{children:["Größte Änderung des Interpolanten: Polynom"," ",e.jsx("span",{className:"font-mono",style:{color:un},children:$(u,3)}),", Spline"," ",e.jsx("span",{className:"font-mono",style:{color:dn},children:$(p,3)})," ","bei einer Verschiebung von"," ",e.jsx("span",{className:"font-mono",children:$(Math.abs(r),2)}),"."]}),e.jsxs("p",{className:"mt-1",children:["Weiter als zwei Knoten von ",e.jsx(n,{children:`x_{${d}}`})," entfernt: Polynom"," ",e.jsx("span",{className:"font-mono",style:{color:un},children:$(m,3)}),", Spline"," ",e.jsx("span",{className:"font-mono",style:{color:dn},children:$(j,3)}),"."," ",r===0?"Bei δ = 0 ändert sich naturgemäß nichts.":m>4*j?"Beim Spline ist nach wenigen Knoten nichts mehr davon übrig, beim Polynom bleibt bis zum Rand hin etwas zu sehen.":"Nahe am Rand hat das Polynom weniger Hebel als in der Mitte, deshalb fällt der Abstand zwischen beiden Spalten hier kleiner aus."]})]}),e.jsx("p",{className:"mt-3 mb-1 text-sm font-semibold",children:"Welche B-Spline-Koeffizienten reagieren?"}),e.jsx("div",{className:"max-w-md",children:F.map((D,M)=>e.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[e.jsx("span",{className:"w-10 shrink-0 text-right",children:e.jsx(n,{children:`a_{${M+1}}`})}),e.jsx("div",{className:"h-3 flex-1 rounded-sm bg-slate-200 dark:bg-slate-700",children:e.jsx("div",{className:"h-3 rounded-sm",style:{width:`${Math.max(0,100*D/G)}%`,background:se}})}),e.jsx("span",{className:"w-16 shrink-0 font-mono",children:$(D,3)})]},M))}),e.jsxs("p",{className:"mt-1 max-w-[34rem] text-sm",children:[e.jsx("span",{className:"font-mono",children:b})," von ",He," Koeffizienten ändern sich um mehr als ein Prozent der Verschiebung. Der Balkensatz hat eine Spitze und zwei Flanken, und die Flanken fallen je Knotenabstand auf rund ein Viertel. Wichtig ist dabei, dass sie nicht abbrechen: Auch die äußersten Koeffizienten bewegen sich noch, nur eben um sehr wenig."]}),e.jsx(le,{kind:r===0?"neutral":j<m?"ok":"warn",children:r===0?"Ohne Verschiebung bleiben beide Interpolanten unverändert; es gibt daher keine Fernwirkung zu vergleichen.":j<m?`Fern vom verschobenen Punkt bleibt die Spline-Änderung mit ${$(j,3)} kleiner als die Polynom-Änderung mit ${$(m,3)}. Das macht die Lokalität der B-Spline-Darstellung sichtbar.`:"In diesem Zustand ist die Fernwirkung nicht kleiner; wir prüfen die gewählte Verschiebung und das betrachtete Gebiet."}),e.jsx("p",{className:"mt-3 mb-1 text-sm font-semibold",children:"Besetzungsmuster"}),e.jsxs("div",{className:"flex flex-wrap items-start gap-8",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-1 text-xs",style:{color:Pe},children:["B-Spline-Kollokation, ",He," × ",He]}),e.jsx("div",{className:"inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600",style:{gridTemplateColumns:`repeat(${He}, 13px)`},children:vs.flatMap((D,M)=>D.map((v,I)=>e.jsx("div",{style:{width:13,height:13,background:Math.abs(v)>1e-12?se:void 0},className:Math.abs(v)>1e-12?"":"bg-white dark:bg-slate-900"},`${M}-${I}`)))})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-1 text-xs",style:{color:Pe},children:"Monombasis (Vandermonde), 9 × 9"}),e.jsx("div",{className:"inline-grid gap-px rounded bg-slate-300 p-px dark:bg-slate-600",style:{gridTemplateColumns:"repeat(9, 13px)"},children:ae.flatMap((D,M)=>ae.map((v,I)=>e.jsx("div",{style:{width:13,height:13,background:Math.abs(Math.pow(D,I))>1e-12?un:void 0},className:Math.abs(Math.pow(D,I))>1e-12?"":"bg-white dark:bg-slate-900"},`${M}-${I}`)))})]})]}),e.jsxs("p",{className:"mt-2 max-w-[34rem] text-sm",children:["Links liegen die Einträge ungleich null in einem schmalen Streifen um die Diagonale, höchstens ",e.jsx(n,{children:"q + 1 = 4"})," je Zeile; genau so viele Basisfunktionen sind an einer Stelle überhaupt beteiligt. Rechts ist kein einziges Feld leer. Der Unterschied kostet beim Lösen den Faktor, den ",ce("bemerkung:bandstruktur-und-aufwand")," ausrechnet, und zur schlechten Kondition der Monombasis kommt er noch hinzu."]})]})}function Ji(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),` endet mit einer unbequemen Beobachtung: Ein
einzelnes Polynom, das durch viele Datenpunkte gezwungen wird, schlägt
zwischen ihnen aus, und der Ausschlag wächst mit der Zahl der Punkte. Der
Grund liegt im Ansatzraum selbst. Ein Polynom vom Grad `,e.jsx(n,{children:"n-1"}),` ist ein
`,e.jsx(n,{children:"\\cred{\\text{globales}}"}),` Objekt: Jeder Koeffizient wirkt überall, jede
Messung zieht an der ganzen Kurve.`]}),`
`,e.jsxs(i.p,{children:[`Der Ausweg dieses Abschnitts kehrt das um. Wir zerlegen das Intervall in
kleine Stücke und legen auf jedes ein Polynom von `,e.jsx(i.em,{children:"festem, niedrigem"}),` Grad.
Der Grad wächst dann nicht mehr mit der Datenmenge, es wächst nur die Anzahl
der Stücke. Damit daraus keine zerbrochene Linie wird, verlangen wir an den
Nahtstellen so viel Glattheit, wie der Grad hergibt.`]}),`
`,e.jsx(i.h3,{children:"Stückweise Polynome mit vorgeschriebener Glattheit"}),`
`,e.jsxs(w,{kind:"Definition",label:"13.4.1 (Polynom-Spline vom Grad q)",id:"env-polynom-spline-vom-grad-q",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"[a, b] \\subset \\R"})," ein Intervall und sei"]}),e.jsx(y,{children:"a = \\corange{\\xi_0} < \\corange{\\xi_1} < \\dots < \\corange{\\xi_m} = b"}),e.jsxs(i.p,{children:["ein Gitter von ",e.jsx(i.em,{children:"Knoten"})," (knots). Eine Funktion ",e.jsx(n,{children:"s\\colon [a,b] \\to \\R"}),` heißt
`,e.jsxs(i.em,{children:["Polynom-Spline vom Grad ",e.jsx(n,{children:"q"})]})," (polynomial spline of degree ",e.jsx(n,{children:"q"}),`) zu diesem
Gitter, wenn`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`auf jedem Teilintervall ein Polynom steht:
`,e.jsx(n,{children:"s(x) = p_k(x)"})," für ",e.jsx(n,{children:"x \\in [\\corange{\\xi_{k-1}}, \\corange{\\xi_k})"}),` mit
Polynomen `,e.jsx(n,{children:"p_k"})," vom Grad höchstens ",e.jsx(n,{children:"q"}),", ",e.jsx(n,{children:"k = 1, \\dots, m"}),` (auf dem letzten
Teilintervall abgeschlossen), und`]}),`
`,e.jsxs(i.li,{children:["die Nahtstellen glatt sind: ",e.jsx(n,{children:"s \\in \\Ccal^{q-1}([a,b])"}),", also sind ",e.jsx(n,{children:"s"}),` und
seine ersten `,e.jsx(n,{children:"q-1"})," Ableitungen auf ganz ",e.jsx(n,{children:"[a,b]"}),`
`,e.jsx(S,{id:"continuity",children:"stetig"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Die Menge aller solchen Funktionen bezeichnen wir mit ",e.jsx(n,{children:"\\Scal_q"}),"."]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.2 (Was in dieser Definition steckt)",id:"env-was-in-dieser-definition-steckt",children:[e.jsx(i.p,{children:"Drei Punkte lohnen einen zweiten Blick."}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Grad höchstens ",e.jsx(n,{children:"q"}),"."]})," Die kurze Sprechweise „Polynome ",e.jsx(n,{children:"q"}),`-ten Grades" meint
stets „vom Grad höchstens `,e.jsx(n,{children:"q"}),`". Sonst wäre nicht einmal die Nullfunktion
ein Spline, und `,e.jsx(n,{children:"\\Scal_q"})," wäre kein Vektorraum."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Die Glattheit ist eine Forderung, kein Geschenk."}),` Eine stückweise durch
Polynome vom Grad höchstens `,e.jsx(n,{children:"q"}),` definierte Funktion ist von sich aus gar
nichts: Sie darf an jedem Knoten springen. Erst Bedingung 2 macht sie zum
Spline. `,e.jsx(n,{children:"\\Ccal^{q-1}"})," ist dabei die ",e.jsx(i.em,{children:"größtmögliche"}),` Glattheit, die man
verlangen kann, ohne den Spline zu einem einzigen globalen Polynom zu
zwingen. Fordern wir nämlich zusätzlich, dass auch die `,e.jsx(n,{children:"q"}),`-te Ableitung
stetig ist, so stimmen benachbarte Polynome in allen Ableitungen überein und
sind damit gleich.`]}),e.jsxs(i.p,{children:[e.jsxs(i.em,{children:["Der Fall ",e.jsx(n,{children:"q = 0"}),"."]})," Dann bedeutet ",e.jsx(n,{children:"\\Ccal^{-1}"}),` schlicht: keine
Stetigkeitsforderung. Ein Spline vom Grad `,e.jsx(n,{children:"0"}),` ist eine Treppenfunktion, die an
jedem Knoten springen darf. Ab `,e.jsx(n,{children:"q = 1"})," ist ",e.jsx(n,{children:"s"})," stetig, ab ",e.jsx(n,{children:"q = 2"}),` auch
knickfrei.`]})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.4.3 (Die Grade 0, 1 und 3)",id:"env-die-grade-0-1-und-3",children:[e.jsxs(i.p,{children:["Auf dem Gitter ",e.jsx(n,{children:"\\corange{0} < \\corange{1} < \\corange{2} < \\corange{3}"}),` sehen
die drei gebräuchlichsten Grade so aus.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 0"}),`: konstante Stücke, Sprünge an den Knoten erlaubt. Das ist der
Histogramm-Fall.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 1"}),`: der Streckenzug durch die Daten, stetig, mit Knicken an den Knoten.
Für Interpolation braucht er keine Rechnung, wir verbinden die Punkte.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"q = 3"}),`: kubische Stücke, an den Knoten stimmen Funktionswert, Steigung und
Krümmung überein. Ein Knick ist nicht mehr zu sehen, und darum ist
`,e.jsx(n,{children:"q = 3"})," der Standardfall."]}),`
`]}),e.jsx(i.p,{children:`Höhere Grade sind möglich, bringen aber wenig: Die Kurve wird kaum glatter
fürs Auge, und die Stücke fangen wieder an zu schwingen.`})]}),`
`,e.jsx(i.h3,{children:"Wie viele Parameter hat ein Spline?"}),`
`,e.jsxs(i.p,{children:[`Bevor wir interpolieren, sollten wir wissen, wie groß der Ansatzraum
überhaupt ist. Nach `,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` entscheidet diese Zahl
darüber, wie viele Bedingungen wir stellen dürfen.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.4.4 (Dimension des Spline-Raums)",id:"env-dimension-des-spline-raums",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"q \\ge 1"})," und sei ",e.jsx(n,{children:"\\Scal_q"})," der Raum der Polynom-Splines vom Grad ",e.jsx(n,{children:"q"}),` zum
Gitter `,e.jsx(n,{children:"a = \\corange{\\xi_0} < \\dots < \\corange{\\xi_m} = b"}),". Dann ist ",e.jsx(n,{children:"\\Scal_q"}),`
ein `,e.jsx(S,{id:"vector-space",children:"Vektorraum"})," der ",e.jsx(S,{id:"dimension",children:"Dimension"})]}),e.jsx(T,{tag:"13.4.1",id:"eq-dimension-des-spline-raums",children:"\\dim \\Scal_q = m + q ,"}),e.jsxs(i.p,{children:["und die ",e.jsx(n,{children:"m + q"})," Funktionen"]}),e.jsx(y,{children:`1,\\ x,\\ \\dots,\\ x^q,\\
(x - \\corange{\\xi_1})_+^q,\\ \\dots,\\ (x - \\corange{\\xi_{m-1}})_+^q
\\qquad \\text{mit} \\qquad u_+ := \\max(u, 0)`}),e.jsxs(i.p,{children:["bilden eine Basis, die ",e.jsx(i.em,{children:"Basis der abgeschnittenen Potenzen"}),` (truncated power
basis).`]})]}),`
`,e.jsxs(Q,{title:"Warum die abgeschnittenen Potenzen eine Basis bilden",children:[e.jsx(i.p,{children:`Der Beweis baut einen Spline von links nach rechts aus Monomen und
abgeschnittenen Potenzen auf und zeigt, dass diese Familie linear unabhängig
ist. Die Abzählung darunter kommt ohne ihn aus.`}),e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Für ",e.jsx(n,{children:"j \\le q-1"})," ist die ",e.jsx(n,{children:"j"}),"-te Ableitung rechts von ",e.jsx(n,{children:"\\xi_i"})," gleich ",e.jsx(n,{children:"q(q-1)\\cdots(q-j+1)\\,(x-\\xi_i)^{q-j}"})," mit Exponent ",e.jsx(n,{children:"q - j \\ge 1"}),"; sie verschwindet also in ",e.jsx(n,{children:"\\xi_i"}),", ebenso wie die Ableitung von links. Damit ist ",e.jsx(n,{children:"g_i \\in \\Ccal^{q-1}"}),", und erst die ",e.jsx(n,{children:"q"}),"-te Ableitung springt (von ",e.jsx(n,{children:"0"})," auf ",e.jsx(n,{children:"q!"}),")."]}),children:[e.jsxs(i.p,{children:["Jede der genannten Funktionen liegt in ",e.jsx(n,{children:"\\Scal_q"}),"."]}),e.jsxs(i.p,{children:["Die Monome ",e.jsx(n,{children:"1, x, \\dots, x^q"})," sind auf ganz ",e.jsx(n,{children:"[a,b]"}),` Polynome vom Grad
höchstens `,e.jsx(n,{children:"q"}),` und beliebig oft differenzierbar. Für die abgeschnittene Potenz
`,e.jsx(n,{children:"g_i(x) = (x - \\corange{\\xi_i})_+^q"})," ist ",e.jsx(n,{children:"g_i \\equiv 0"}),` links von
`,e.jsx(n,{children:"\\corange{\\xi_i}"})," und ",e.jsx(n,{children:"g_i(x) = (x - \\corange{\\xi_i})^q"}),` rechts davon, auf
beiden Seiten also ein Polynom vom Grad höchstens `,e.jsx(n,{children:"q"}),"."]})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Beide Funktionen sind dort ",e.jsx(n,{children:"\\Ccal^{q-1}"})," und stimmen links von ",e.jsx(n,{children:"\\xi_k"})," überein, also stimmen auch ihre einseitigen Ableitungen bis zur Ordnung ",e.jsx(n,{children:"q-1"})," überein und die der Differenz sind null."]}),children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(n,{children:"s \\in \\Scal_q"})," ist eine Linearkombination dieser Funktionen."]}),e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"p_1"}),` das Polynom auf dem ersten Teilintervall. Wir zeigen per Induktion
über `,e.jsx(n,{children:"k"}),", dass es Zahlen ",e.jsx(n,{children:"d_1, \\dots, d_{k-1}"})," gibt mit"]}),e.jsx(y,{children:`s(x) = p_1(x) + \\sum_{i=1}^{k-1} d_i\\,(x - \\corange{\\xi_i})_+^q
\\qquad \\text{für } x \\in [a, \\corange{\\xi_k}) .`}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k = 1"})," ist das die Definition von ",e.jsx(n,{children:"p_1"}),`. Gilt die Darstellung bis
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),", so ist die Differenz ",e.jsx(n,{children:"r"})," zwischen ",e.jsx(n,{children:"s"}),` und der rechten Seite
auf `,e.jsx(n,{children:"[\\corange{\\xi_k}, \\corange{\\xi_{k+1}})"}),` ein Polynom vom Grad höchstens
`,e.jsx(n,{children:"q"}),", und ihre Ableitungen der Ordnungen ",e.jsx(n,{children:"0, \\dots, q-1"}),` verschwinden in
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),"."]}),e.jsxs(i.p,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"q"}),", dessen Ableitungen bis zur Ordnung ",e.jsx(n,{children:"q-1"}),`
in `,e.jsx(n,{children:"\\corange{\\xi_k}"}),` verschwinden, ist aber ein Vielfaches von
`,e.jsx(n,{children:"(x - \\corange{\\xi_k})^q"})," (",e.jsx(S,{id:"taylor-theorem",children:"Taylor-Entwicklung"}),` um
`,e.jsx(n,{children:"\\corange{\\xi_k}"}),`). Das
liefert `,e.jsx(n,{children:"d_k"})," und den Induktionsschritt."]})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Ein Polynom vom Grad höchstens ",e.jsx(n,{children:"q"})," hat höchstens ",e.jsx(n,{children:"q"})," Nullstellen, sofern es nicht das Nullpolynom ist; ein Intervall enthält unendlich viele Punkte."]}),children:[e.jsxs(i.p,{children:["Die Funktionen sind ",e.jsx(S,{id:"linear-independence",children:"linear unabhängig"}),"."]}),e.jsxs(i.p,{children:["Verschwindet eine Linearkombination auf ganz ",e.jsx(n,{children:"[a,b]"}),`, so verschwindet sie
insbesondere auf `,e.jsx(n,{children:"[a, \\corange{\\xi_1})"}),`. Dort tragen nur die Monome bei, also
ist das Polynom `,e.jsx(n,{children:"\\sum_j c_j x^j"}),` auf einem ganzen Intervall null und damit das
Nullpolynom, `,e.jsx(n,{children:"c_0 = \\dots = c_q = 0"}),"."]}),e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"[\\corange{\\xi_1}, \\corange{\\xi_2})"}),` bleibt dann nur
`,e.jsx(n,{children:"d_1 (x - \\corange{\\xi_1})^q"})," übrig, also ",e.jsx(n,{children:"d_1 = 0"}),`, und so weiter bis
`,e.jsx(n,{children:"d_{m-1} = 0"}),"."]})]}),e.jsx(K,{children:e.jsxs(i.p,{children:[`Damit ist die angegebene Familie eine Basis, und ihre Länge ist
`,e.jsx(n,{children:"(q+1) + (m-1) = m + q"}),"."]})})]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.5 (Die Parameterzählung als Gegenprobe)",id:"env-die-parameterzaehlung-als-gegenprobe",children:[e.jsx(i.p,{children:"Zum selben Ergebnis kommt man ohne Basis, durch bloßes Abzählen."}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Ohne Glattheitsforderung:"})," ",e.jsx(n,{children:"m"})," Teilintervalle mit je ",e.jsx(n,{children:"q+1"}),` Koeffizienten,
also `,e.jsx(n,{children:"m(q+1)"})," freie Parameter."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["An jedem der ",e.jsx(n,{children:"m-1"})," inneren Knoten:"]})," ",e.jsx(n,{children:"q"}),` Bedingungen, nämlich Stetigkeit von
`,e.jsx(n,{children:"s"})," und der ersten ",e.jsx(n,{children:"q-1"})," Ableitungen."]}),`
`]}),e.jsx(i.p,{children:"Das ergibt"}),e.jsx(y,{children:"m(q+1) - (m-1)\\,q = mq + m - mq + q = \\corange{m + q} ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"})," sind das ",e.jsx(n,{children:"5 \\cdot 4 - 4 \\cdot 3 = 20 - 12 = 8 = m + q"}),`
`,e.jsx(n,{children:"\\checkmark"}),". Diese Rechnung setzt allerdings voraus, dass die ",e.jsx(n,{children:"(m-1)q"}),`
Bedingungen linear unabhängig sind, sonst dürften wir sie nicht einfach
abziehen. `,e.jsx(i.a,{href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"})," liefert genau das nach."]}),e.jsxs(i.p,{children:[`Beide Wege stützen sich auf zwei Annahmen, die wir nicht weglassen dürfen:
`,e.jsx(i.em,{children:"einfache innere Knoten"})," (kein ",e.jsx(n,{children:"\\corange{\\xi_i}"}),` tritt doppelt auf) und
`,e.jsx(i.em,{children:"maximale Glattheit"}),`
`,e.jsx(n,{children:"\\Ccal^{q-1}"}),`. Erlauben wir an einem Knoten weniger Glattheit, so fällt dort
eine Bedingung weg und die Dimension steigt um eins.`]})]}),`
`,e.jsx(i.h3,{children:"Interpolation mit kubischen Splines"}),`
`,e.jsxs(i.p,{children:[`Jetzt können wir zählen, ob ein Interpolationsproblem aufgeht. Wir haben
`,e.jsx(n,{children:"n = m+1"})," Datenpunkte an den Knoten selbst und wählen ",e.jsx(n,{children:"q = 3"}),"."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.6 (Zwei Bedingungen fehlen: Randbedingungen)",id:"env-zwei-bedingungen-fehlen-randbedingungen",children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-dimension-des-spline-raums",children:"(13.4.1)"})," hat der Ansatzraum die Dimension ",e.jsx(n,{children:"m + 3"}),`, die Daten liefern
aber nur `,e.jsx(n,{children:"n = m + 1"})," Gleichungen. Es fehlen also genau ",e.jsx(i.em,{children:"zwei"}),` Bedingungen,
und ohne sie hat das Interpolationsproblem unendlich viele Lösungen. Üblich
sind drei Sorten von `,e.jsx(i.em,{children:"Randbedingungen"})," (boundary conditions):"]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Typ"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Bedingung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"natürlich"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"s''(a) = s''(b) = 0"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"eingespannt"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'(a)"})," und ",e.jsx(n,{children:"s'(b)"})," vorgegeben"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"periodisch"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'(a) = s'(b)"})," und ",e.jsx(n,{children:"s''(a) = s''(b)"})]})]})]})]}),e.jsxs(i.p,{children:["Liegt keine Information über den Rand vor, ist der ",e.jsx(i.em,{children:"natürliche Spline"}),` der
Standard. Er hat einen guten Grund für sich: Unter allen Interpolanten mit
zwei stetigen Ableitungen hat er die kleinste Gesamtkrümmung
`,e.jsx(n,{children:"\\int_a^b |g''(x)|^2\\,\\mathrm{d}x"})," (",e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),")."]}),e.jsxs(i.p,{children:[`Im periodischen Fall ist die Wahl der beiden Bedingungen heikler, als sie
aussieht: `,e.jsx(n,{children:"s(a) = s(b)"}),` taugt nicht als eine davon. Sind die Daten periodisch,
gilt also `,e.jsx(n,{children:"y_0 = y_m"}),", so folgt ",e.jsx(n,{children:"s(a) = s(b)"}),` schon aus den
Interpolationsbedingungen und ist keine neue Gleichung; sind sie es nicht, so
widerspricht die Forderung ihnen. Für `,e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 4"}),` nachgerechnet: Mit
`,e.jsx(n,{children:"\\{s(a) = s(b),\\, s'(a) = s'(b)\\}"})," hat die ",e.jsx(n,{children:"16 \\times 16"}),`-Matrix nur den Rang
`,e.jsx(n,{children:"15"}),`, ein Freiheitsgrad bleibt offen. Erst
`,e.jsx(n,{children:"\\{s'(a) = s'(b),\\, s''(a) = s''(b)\\}"})," macht sie regulär."]})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.4.7 (Kubischer Spline durch vier Punkte)",id:"env-kubischer-spline-durch-vier-punkte",children:[e.jsxs(i.p,{children:[`Gegeben seien die vier Punkte
`,e.jsx(n,{children:"\\cblue{(0,0)},\\ \\cblue{(1,1)},\\ \\cblue{(2,0)},\\ \\cblue{(3,-1)}"}),`, also
`,e.jsx(n,{children:"m = 3"}),` Teilintervalle. Auf jedes legen wir ein kubisches Polynom
`,e.jsx(n,{children:"p_k(x) = c_{k1} + c_{k2}x + c_{k3}x^2 + c_{k4}x^3"}),`; das sind
`,e.jsx(n,{children:"3 \\cdot 4 = 12"})," Unbekannte. Die Bedingungen:"]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Typ"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Anzahl"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Beispiel"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"Interpolation"}),e.jsx(i.td,{style:{textAlign:"center"},children:"4"}),e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"p_1(0) = 0"}),", ",e.jsx(n,{children:"p_1(1) = 1"}),", ",e.jsx(n,{children:"p_2(2) = 0"}),", ",e.jsx(n,{children:"p_3(3) = -1"})]})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1(1) = p_2(1)"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s'"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1'(1) = p_2'(1)"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:[e.jsx(n,{children:"s''"})," stetig"]}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"p_1''(1) = p_2''(1)"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"natürlicher Rand"}),e.jsx(i.td,{style:{textAlign:"center"},children:"2"}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"s''(0) = s''(3) = 0"})})]})]})]}),e.jsxs(i.p,{children:["Zusammen ",e.jsx(n,{children:"4 + 2 + 2 + 2 + 2 = 12"})," Bedingungen für ",e.jsx(n,{children:"12"}),` Unbekannte, und das
lineare Gleichungssystem ist eindeutig lösbar. Beachten wir, dass jeder
Datenpunkt nur `,e.jsx(i.em,{children:"einmal"})," gezählt wird: Dass etwa auch ",e.jsx(n,{children:"p_2(1) = 1"}),` gilt,
erzwingt schon die Stetigkeitszeile.`]}),e.jsx(i.p,{children:"Die Lösung lautet"}),e.jsx(y,{children:`\\cgreen{p_1(x)} = \\tfrac{1}{15}\\left(23x - 8x^3\\right), \\quad
\\cgreen{p_2(x)} = \\tfrac{1}{15}\\left(-18 + 77x - 54x^2 + 10x^3\\right), \\quad
\\cgreen{p_3(x)} = \\tfrac{1}{15}\\left(78 - 67x + 18x^2 - 2x^3\\right) .`}),e.jsxs(i.p,{children:["Die Probe geht glatt auf: ",e.jsx(n,{children:"\\cgreen{p_1(1)} = \\tfrac{15}{15} = 1 = \\cgreen{p_2(1)}"}),`,
und an der Nahtstelle `,e.jsx(n,{children:"x = 1"})," ist ",e.jsx(n,{children:"\\cgreen{p_1'(1)} = \\cgreen{p_2'(1)} = -\\tfrac{1}{15}"}),`
sowie `,e.jsx(n,{children:"\\cgreen{p_1''(1)} = \\cgreen{p_2''(1)} = -\\tfrac{48}{15}"}),`. Am linken Rand
ist `,e.jsx(n,{children:"\\cgreen{p_1''(0)} = 0"}),", am rechten ",e.jsx(n,{children:"\\cgreen{p_3''(3)} = \\tfrac{36 - 36}{15} = 0"}),`,
wie die natürliche Randbedingung verlangt.`]})]}),`
`,e.jsxs(re,{title:"Das Zwölf-mal-zwölf-System live",children:[e.jsxs(i.p,{children:[`Das Widget baut die zwölf Zeilen genau in der Reihenfolge der Tabelle auf und
löst das System mit Spaltenpivotierung
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),`). Die vier Messwerte lassen sich
verschieben, und der Schalter tauscht die letzten beiden Zeilen gegen die
eingespannte Variante.`]}),e.jsx(gr,{}),e.jsxs(i.p,{children:[`Zwei Dinge sind daran wichtig. Erstens ist die Naht unsichtbar, obwohl links
und rechts davon verschiedene Polynome stehen; das Readout zeigt, dass Wert,
Steigung und Krümmung bis auf Rundung übereinstimmen. Zweitens ändern sich
beim Verschieben eines einzigen Messwerts `,e.jsx(i.em,{children:"alle"})," zwölf Koeffizienten."]})]}),`
`,e.jsx(i.h3,{children:"B-Splines"}),`
`,e.jsxs(i.p,{children:["Die stückweise Monomdarstellung aus ",e.jsx(i.a,{href:"#env-kubischer-spline-durch-vier-punkte",children:"Beispiel 13.4.7"}),` ist zum Rechnen schlecht
geeignet. Sie erbt die schlechte Kondition der Monombasis
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`), ihre Matrix hat keine erkennbare Struktur, und
jeder Koeffizient hängt an allen Daten: Verschieben wir einen einzigen
Messwert, so ändern sich alle zwölf Koeffizienten, in dieser Darstellung ist
Spline-Interpolation also global. Wir suchen deshalb eine
`,e.jsx(S,{id:"basis",children:e.jsx(i.em,{children:"Basis"})}),` des
Raums `,e.jsx(n,{children:"\\Scal_q"})," im Sinn von ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`, aus der sich die
Systemmatrix `,e.jsx(n,{children:"\\bB"})," mit den Einträgen ",e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k(x_i)}"}),` besser
verhält. Nach `,e.jsx(i.a,{href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"})," muss eine solche Basis genau ",e.jsx(n,{children:"m + q"}),` Funktionen
haben.`]}),`
`,e.jsxs(i.p,{children:[`Die abgeschnittenen Potenzen aus dem Beweis wären eine, taugen aber nicht: Sie
sind fast alle auf dem halben Intervall von null verschieden, und für großes
`,e.jsx(n,{children:"x"}),` werden sie riesig. Die B-Splines sind die Basis, die stattdessen
gebraucht wird. Ihr Name kommt von `,e.jsx(i.em,{children:"Basis"}),`, ihre Gestalt von der Rekursion,
die sie erzeugt.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.4.8 (Erweiterte Knotenfolge und B-Splines)",id:"env-erweiterte-knotenfolge-und-b-splines",children:[e.jsxs(i.p,{children:["Zum Gitter ",e.jsx(n,{children:"a = \\corange{\\xi_0} < \\dots < \\corange{\\xi_m} = b"}),` und zum Grad
`,e.jsx(n,{children:"q \\ge 0"})," setzen wir die ",e.jsx(i.em,{children:"erweiterte Knotenfolge"}),`
`,e.jsx(n,{children:"\\corange{\\tau_1} \\le \\dots \\le \\corange{\\tau_{m+2q+1}}"})," fest durch"]}),e.jsx(T,{tag:"13.4.2",id:"eq-erweiterte-knotenfolge-und-b-splines",children:`\\corange{\\tau_1} = \\dots = \\corange{\\tau_{q+1}} = \\corange{\\xi_0}, \\qquad
\\corange{\\tau_{q+1+i}} = \\corange{\\xi_i} \\ \\ (i = 1, \\dots, m-1), \\qquad
\\corange{\\tau_{m+q+1}} = \\dots = \\corange{\\tau_{m+2q+1}} = \\corange{\\xi_m} .`}),e.jsxs(i.p,{children:["Die Randknoten treten also ",e.jsx(n,{children:"(q+1)"}),`-fach auf, die inneren einfach; zusammen
sind das `,e.jsx(n,{children:"(q+1) + (m-1) + (q+1) = m + 2q + 1"})," Knoten."]}),e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"B-Splines"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}}"}),", ",e.jsx(n,{children:"k = 1, \\dots, m+q"}),`, sind rekursiv
über den Grad erklärt. Für `,e.jsx(n,{children:"q = 0"})," ist"]}),e.jsx(y,{children:"\\corange{B_k^{(0)}(x)} = \\ind\\left(\\corange{\\tau_k} \\le x < \\corange{\\tau_{k+1}}\\right),"}),e.jsxs(i.p,{children:["und für ",e.jsx(n,{children:"q > 0"})," gilt die ",e.jsx(i.em,{children:"Cox-de-Boor-Rekursion"})]}),e.jsx(T,{tag:"13.4.3",id:"eq-erweiterte-knotenfolge-und-b-splines-2",children:`\\corange{B_k^{(q)}(x)}
= \\frac{x - \\corange{\\tau_k}}{\\corange{\\tau_{k+q}} - \\corange{\\tau_k}}\\,
  \\corange{B_k^{(q-1)}(x)}
+ \\frac{\\corange{\\tau_{k+q+1}} - x}{\\corange{\\tau_{k+q+1}} - \\corange{\\tau_{k+1}}}\\,
  \\corange{B_{k+1}^{(q-1)}(x)} .`}),e.jsxs(i.p,{children:["Ein Summand mit verschwindendem Nenner wird dabei als ",e.jsx(n,{children:"0"}),` gelesen; das
betrifft nur die mehrfachen Randknoten. Am rechten Rand lesen wir das letzte
nichtleere Knotenintervall als abgeschlossen, damit die Basisfunktionen auch
in `,e.jsx(n,{children:"b"})," definiert sind."]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.9 (Warum die Knotenfolge so lang sein muss)",id:"env-warum-die-knotenfolge-so-lang-sein-muss",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(n,{children:"m + q"})," Basisfunktionen nur ",e.jsx(n,{children:"m + q"}),` Knoten anzusetzen, liegt nahe, reicht
aber nicht: Die Rekursion `,e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines-2",children:"(13.4.3)"}),` greift für
`,e.jsx(n,{children:"k = m+q"})," auf ",e.jsx(n,{children:"\\corange{\\tau_{m+2q+1}}"})," zu, es braucht also ",e.jsx(n,{children:"m + 2q + 1"}),`
Knoten.`]}),e.jsxs(i.p,{children:["Ebenso wichtig ist, dass sich die drei Vorschriften in ",e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines",children:"(13.4.2)"}),` nicht ins
Gehege kommen. Der linke Randblock belegt die Indizes `,e.jsx(n,{children:"1, \\dots, q+1"}),`, die
inneren Knoten die Indizes `,e.jsx(n,{children:"q+2, \\dots, q+m"}),`, der rechte Randblock die
Indizes `,e.jsx(n,{children:"m+q+1, \\dots, m+2q+1"}),`: Jeder Index bekommt genau einen Wert. Begänne
der rechte Block schon bei `,e.jsx(n,{children:"m+1"}),", so bekäme für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"}),` der Knoten
`,e.jsx(n,{children:"\\corange{\\tau_6}"})," sowohl ",e.jsx(n,{children:"\\corange{\\xi_2}"})," als auch ",e.jsx(n,{children:"\\corange{\\xi_5}"}),`
zugewiesen.`]})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.4.10 (Grad 1: die Hutfunktionen)",id:"env-grad-1-die-hutfunktionen",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\corange{\\xi} = (0, 1, 2)"}),", also ",e.jsx(n,{children:"m = 2"}),", und ",e.jsx(n,{children:"q = 1"}),` lautet die
erweiterte Knotenfolge`]}),e.jsx(y,{children:"\\corange{\\tau} = (0,\\ 0,\\ 1,\\ 2,\\ 2),"}),e.jsxs(i.p,{children:["das sind ",e.jsx(n,{children:"m + 2q + 1 = 5"})," Knoten und damit ",e.jsx(n,{children:"m + q = 3"}),` Basisfunktionen. Die
Rekursion liefert`]}),e.jsx(y,{children:`\\corange{B_1^{(1)}(x)} = \\begin{cases} 1 - x, & 0 \\le x < 1 \\\\ 0 & \\text{sonst,} \\end{cases}
\\qquad
\\corange{B_2^{(1)}(x)} = \\begin{cases} x, & 0 \\le x < 1 \\\\ 2 - x, & 1 \\le x \\le 2 \\end{cases}
\\qquad
\\corange{B_3^{(1)}(x)} = \\begin{cases} x - 1, & 1 \\le x \\le 2 \\\\ 0 & \\text{sonst.} \\end{cases}`}),e.jsxs(i.p,{children:["An der Stelle ",e.jsx(n,{children:"x = 0{,}25"})," etwa stehen dort die Werte ",e.jsx(n,{children:"0{,}75"}),", ",e.jsx(n,{children:"0{,}25"}),` und
`,e.jsx(n,{children:"0"}),", bei ",e.jsx(n,{children:"x = 1{,}5"})," die Werte ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"0{,}5"})," und ",e.jsx(n,{children:"0{,}5"}),`. In beiden Fällen ist
die Summe `,e.jsx(n,{children:"1"}),`, und das gilt an jeder Stelle. Jedes dieser drei Dächer ist
selbst ein Spline vom Grad `,e.jsx(n,{children:"1"}),`, jedes ist nichtnegativ, und jedes ist nur auf
höchstens `,e.jsx(n,{children:"q + 1 = 2"}),` Gitterintervallen von null verschieden. An den Rändern
sorgen die doppelten Knoten dafür, dass der Träger kürzer ausfällt.`]})]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.4.11 (Die B-Splines sind eine Basis)",id:"env-die-b-splines-sind-eine-basis",children:[e.jsxs(i.p,{children:["Mit den Bezeichnungen aus ",e.jsx(i.a,{href:"#env-erweiterte-knotenfolge-und-b-splines",children:"Definition 13.4.8"})," gilt für ",e.jsx(n,{children:"q \\ge 1"}),":"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Lokaler Träger:"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}(x)} = 0"}),` für
`,e.jsx(n,{children:"x \\notin [\\corange{\\tau_k}, \\corange{\\tau_{k+q+1}}]"}),`, und
`,e.jsx(n,{children:"\\corange{B_k^{(q)}(x)} > 0"}),` für
`,e.jsx(n,{children:"\\corange{\\tau_k} < x < \\corange{\\tau_{k+q+1}}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Zerlegung der Eins:"}),`
`,e.jsx(n,{children:"\\sum_{k=1}^{m+q} \\corange{B_k^{(q)}(x)} = 1"})," für alle ",e.jsx(n,{children:"x \\in [a,b]"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Glattheit:"})," ",e.jsx(n,{children:"\\corange{B_k^{(q)}} \\in \\Ccal^{q-1}"}),`, jedes
`,e.jsx(n,{children:"\\corange{B_k^{(q)}}"})," liegt also selbst in ",e.jsx(n,{children:"\\Scal_q"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Basis:"})," ",e.jsx(n,{children:"\\corange{B_1^{(q)}}, \\dots, \\corange{B_{m+q}^{(q)}}"}),` sind linear
unabhängig und `,e.jsx(S,{id:"span",children:"spannen"})," ",e.jsx(n,{children:"\\Scal_q"})," auf. Jeder Spline ",e.jsx(n,{children:"\\cgreen{s}"}),` vom Grad
`,e.jsx(n,{children:"q"})," besitzt daher genau eine Darstellung"]}),`
`]}),e.jsx(T,{tag:"13.4.4",id:"eq-die-b-splines-sind-eine-basis",children:"\\cgreen{s(x)} = \\sum_{k=1}^{m+q} a_k\\, \\corange{B_k^{(q)}(x)} ."})]}),`
`,e.jsxs(i.p,{children:[`Einen Beweis führen wir nicht; die Rekursion selbst brauchen wir im Weiteren
nur zur Referenz. Plausibel ist die Aussage aber sofort: Aussage 1 und 3 lesen
sich direkt an einem Rekursionsschritt ab (siehe die Vertiefungen), und die
Anzahl `,e.jsx(n,{children:"m+q"})," ist genau die Dimension aus ",e.jsx(i.a,{href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),`, sodass ein
aufspannendes System automatisch eine Basis ist.`]}),`
`,e.jsxs(i.p,{children:["Damit ist der Anschluss an ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` hergestellt: Wir
wählen `,e.jsx(n,{children:"\\corange{\\phi_k} = \\corange{B_k^{(q)}}"}),` als Basisfunktionen, stellen
das System `,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"}),` auf und lösen es. Neu ist nur, wie gut sich
dieses System benimmt.`]}),`
`,e.jsxs(re,{title:"Die B-Spline-Basis erkunden",children:[e.jsx(i.p,{children:"Wie viele Basisfunktionen sind an einer Stelle aktiv, und wie entsteht ihre Form aus der Rekursion?"}),e.jsx(br,{}),e.jsxs(i.p,{children:[`Die gestrichelte Summe liegt über dem ganzen Gitter konstant bei eins, obwohl
die einzelnen Kurven ganz verschieden aussehen. Und an jeder Stelle sind
höchstens `,e.jsx(n,{children:"q+1"}),` Basisfunktionen von null verschieden: Das ist die Zahl, die
gleich die Rechenzeit bestimmt. Der aufgeklappte Rekursionsschritt zeigt die
beiden Gewichtsrampen an derselben Idee und erklärt, warum der Grad um eins steigt.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.12 (B-Splines in R)",id:"env-b-splines-in-r",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.code,{children:"R"})," liefert ",e.jsx(i.code,{children:"splines::bs()"})," die Auswertungsmatrix ",e.jsx(n,{children:"\\bB"}),` direkt. Ein
typischer Aufruf sieht so aus:`]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`y <- f(x)
B <- splines::bs(x, df = 10, degree = 3, intercept = TRUE)
a <- solve(B, y)

xnew <- seq(0, 1, length = 100)
Bnew <- splines::bs(xnew, knots = attr(B, "knots"),
                    Boundary.knots = attr(B, "Boundary.knots"),
                    degree = attr(B, "degree"),
                    intercept = TRUE)
fhat <- Bnew %*% a
`})}),e.jsxs(i.p,{children:["Die erste Hälfte ist der Algorithmus aus ",e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),` in
drei Zeilen: Basis auswerten,
System lösen, fertig. Die zweite Hälfte wertet den Interpolanten an neuen
Stellen aus, und dabei steckt die eigentliche Fußangel: Die neue Basismatrix
muss zu `,e.jsx(i.em,{children:"derselben"}),` Basis gehören wie die alte. Deshalb werden innere Knoten,
Randknoten und Grad weitergereicht, statt `,e.jsx(i.code,{children:"bs()"})," Teile davon aus ",e.jsx(i.code,{children:"xnew"}),` neu
bestimmen zu lassen. Vergisst man das, geht nichts schief, was man merken
würde: Die Spaltenzahl stimmt weiterhin, es gibt keine Fehlermeldung, und
heraus kommt eine glatte Kurve – nur eben nicht die geschätzte. Am sichersten
erledigt das bei einem angepassten Modell die zugehörige `,e.jsx(i.code,{children:"predict()"}),"-Methode."]})]}),`
`,e.jsx(i.h3,{children:"Warum B-Splines? Kondition und Aufwand"}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.13 (Konditionszahlen: eine Größenordnung, kein Messwert)",id:"env-konditionszahlen-eine-groessenordnung",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"n = 20"})," Punkte in ",e.jsx(n,{children:"[0,1]"}),` stellen wir zwei Basissysteme
gegenüber. Die `,e.jsx(S,{id:"condition-number",children:"Konditionszahlen"})," sind ",e.jsx(i.em,{children:"illustrativ"}),`: Sie
hängen von der verwendeten `,e.jsx(S,{id:"matrix-norm",children:"Norm"}),`,
von der Lage der Auswertungsstellen und von der Knotenwahl ab.`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Basis"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Grad"}),e.jsx(i.th,{style:{textAlign:"center"},children:"Konditionszahl"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"Monombasis"}),e.jsx(i.td,{style:{textAlign:"center"},children:"19"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\cred{\\kappa(\\bB_{\\text{mono}}) \\approx 10^{16}}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:"kubische B-Splines"}),e.jsx(i.td,{style:{textAlign:"center"},children:"3"}),e.jsx(i.td,{style:{textAlign:"center"},children:e.jsx(n,{children:"\\cgreen{\\kappa(\\bB_{\\text{spline}}) \\approx 10^{1} \\text{ bis } 10^{2}}"})})]})]})]}),e.jsxs(i.p,{children:[`Die obere Zeile setzt die Tabelle aus
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`; wir haben sie in exakter rationaler Arithmetik
nachgerechnet und erhalten `,e.jsx(n,{children:"\\cred{\\kappa_1 = 4{,}4 \\cdot 10^{16}}"}),`. Die
kubische B-Spline-Kollokationsmatrix mit ebenfalls `,e.jsx(n,{children:"20"}),` Basisfunktionen
kommt in derselben Norm auf `,e.jsx(n,{children:"\\cgreen{\\kappa_1 = 37}"}),`. Zwischen beiden liegen
gut fünfzehn Größenordnungen; rundet man den B-Spline-Wert großzügig auf `,e.jsx(n,{children:"10^2"}),`
auf, werden es vierzehn. Auf die genaue Zahl kommt es nicht an, wohl aber auf
ihre Deutung: Bei `,e.jsx(n,{children:"\\cred{\\kappa \\approx 10^{16}}"}),` ist von
den etwa sechzehn signifikanten Stellen eines `,e.jsx(i.code,{children:"double"}),`
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),`) im Ergebnis nichts mehr sicher,
während `,e.jsx(n,{children:"\\cgreen{\\kappa \\approx 40}"})," nicht einmal zwei Stellen kostet."]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.14 (Bandstruktur und Aufwand)",id:"env-bandstruktur-und-aufwand",children:[e.jsxs(i.p,{children:["Der zweite Vorteil ist die Struktur der Matrix. Nach ",e.jsx(i.a,{href:"#env-die-b-splines-sind-eine-basis",children:"Satz 13.4.11"}),` ist an jeder
Stelle `,e.jsx(n,{children:"x_i"})," höchstens ",e.jsx(n,{children:"q+1"}),` der Basisfunktionen von null verschieden, in der
`,e.jsx(n,{children:"i"}),"-ten Zeile von ",e.jsx(n,{children:"\\bB"})," stehen also höchstens ",e.jsx(n,{children:"q+1"}),` Einträge ungleich null,
und sie stehen nebeneinander. `,e.jsx(n,{children:"\\bB"}),` ist eine
`,e.jsx(S,{id:"sparse-matrix",children:"dünn besetzte"})," ",e.jsx(i.em,{children:"Bandmatrix"})," mit Bandbreite ungefähr ",e.jsx(n,{children:"q"}),"."]}),e.jsxs(i.p,{children:[`Für die Elimination heißt das: Wo bei einer vollbesetzten Matrix in jedem
Schritt alle verbleibenden Zeilen angefasst werden, sind es hier nur die
höchstens `,e.jsx(n,{children:"q"}),` Zeilen, die unterhalb des Pivots noch im Band liegen, und in
jeder davon nur die höchstens `,e.jsx(n,{children:"q"}),` Einträge des Bandes
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),"). Bei einer Systemgröße ",e.jsx(n,{children:"N"})," kostet das"]}),e.jsx(y,{children:"O(N q^2) \\quad \\text{statt} \\quad O(N^3)"}),e.jsxs(i.p,{children:["(",e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"). Hier bezeichnet ",e.jsx(n,{children:"N"}),` die Größe des
Systems, also die Zahl der Basisfunktionen `,e.jsx(n,{children:"m+q"}),"; bei Interpolation an ",e.jsx(n,{children:"n"}),`
Punkten fällt sie mit `,e.jsx(n,{children:"n"}),` zusammen, sonst nicht. Es lohnt sich, die beiden
Größen auseinanderzuhalten.`]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"N = 1000"})," und ",e.jsx(n,{children:"q = 3"}),` ist das Verhältnis
`,e.jsx(n,{children:"N^3 / (N q^2) = N^2/q^2 = 10^6/9 \\approx 111\\,000"}),`, also ein
Beschleunigungsfaktor der Größenordnung `,e.jsx(n,{children:"10^5"}),`. Verglichen werden dabei
Operationszahlen, keine gemessenen Laufzeiten.`]})]}),`
`,e.jsx(i.h3,{children:"Eigenschaften"}),`
`,e.jsxs(i.p,{children:[`Splines sind heute das gebräuchlichste Basissystem zur Funktionsapproximation,
und in aller Regel wird mit `,e.jsx(n,{children:"q = 3"}),` gearbeitet. Zum Abschluss sammeln wir
die Eigenschaften, die diese Vorliebe erklären.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.4.15 (Eigenschaften von Splines und B-Splines)",id:"env-eigenschaften-von-splines-und-b-splines",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"q \\ge 1"}),"."]}),e.jsxs(i.ol,{children:[`
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
`,e.jsxs(i.p,{children:[`Aussage 2 ist schnell eingesehen: Leiten wir stückweise ab, so sinkt der Grad
jedes Stücks um eins, und aus `,e.jsx(n,{children:"\\cgreen{s} \\in \\Ccal^{q-1}"}),` wird
`,e.jsx(n,{children:"\\cgreen{s'} \\in \\Ccal^{q-2}"}),`. Das ist wieder genau die maximale Glattheit
zum Grad `,e.jsx(n,{children:"q-1"}),". Für ",e.jsx(n,{children:"q = 3"}),` heißt das: Die Ableitung eines kubischen Splines
ist ein quadratischer Spline, die Krümmung eine stückweise lineare Funktion.
Aussage 1 ist im Fall `,e.jsx(n,{children:"q = 1"}),` nichts anderes als die gleichmäßige Stetigkeit
von `,e.jsx(n,{children:"f"}),`, für höhere Grade ein klassisches Resultat der
Approximationstheorie; wie schnell der Fehler mit der Knotenweite fällt,
klärt `,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.4.16 (Vorsicht bei den Ableitungen)",id:"env-vorsicht-bei-den-ableitungen",children:e.jsxs(i.p,{children:[`Aus Aussage 1 wird gern gefolgert, dass auch die Ableitungen und das Integral
des Splines die entsprechenden Größen von `,e.jsx(n,{children:"f"}),` approximieren. Für das Integral
stimmt das ohne Weiteres, denn aus `,e.jsx(n,{children:"\\left\\| f - \\cgreen{s} \\right\\|_\\infty < \\varepsilon"}),`
folgt sofort eine Schranke `,e.jsx(n,{children:"(b-a)\\varepsilon"}),` für die Differenz der Integrale.
Bei den Ableitungen ist Vorsicht geboten: Sie brauchen erstens, dass `,e.jsx(n,{children:"f"}),`
selbst genügend oft differenzierbar ist, und sie konvergieren zweitens
langsamer. Jede abgeleitete Ordnung kostet eine Potenz der Knotenweite. Eine
kleine Abweichung in den Funktionswerten sagt für sich genommen noch nichts
über die Steigungen aus.`]})}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.4.17 (Was die Lokalität praktisch bedeutet)",id:"env-was-die-lokalitaet-praktisch-bedeutet",children:[e.jsxs(i.p,{children:[`Der lokale Träger ist ein Hauptgrund, warum B-Splines in der Praxis benutzt
werden. Verschieben wir einen einzigen Messwert, so ändert sich zunächst nur
die entsprechende rechte Seite; die zugehörige Zeile der Basismatrix enthält
nur die wenigen Basisfunktionen in seiner Umgebung. Die Lösung des
Gleichungssystems koppelt diese Koeffizienten allerdings weiter: Die Inverse
einer Bandmatrix ist im Allgemeinen dicht. Für gut konditionierte, reguläre
Bandsysteme fällt ihr Einfluss typischerweise schnell und häufig geometrisch
mit dem Abstand ab, aber der kompakte Träger allein garantiert weder einen
universellen Faktor noch exakte Abschottung. Ein globales Polynom verhält sich
im Vergleich meist deutlich weniger lokal.
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),` hat den Verstärkungsfaktor dort schon beziffert:
Die Störung eines einzigen Werts wirkt über das ganze Intervall und schlägt
am weitesten dort aus, wo gar nichts passiert ist.`]}),e.jsx(i.p,{children:`Wie stark die Kopplung mit dem Abstand abfällt, rechnen wir im
gleichmäßigen Beispiel unten nach; die Zahlen dort sind Messwerte dieses
Systems, keine allgemeine B-Spline-Konstante.`})]}),`
`,e.jsxs(re,{title:"Ein Datenpunkt wandert",children:[e.jsxs(i.p,{children:[`Das Widget stört einen einzelnen Datenpunkt. Links steht das
Interpolationspolynom vom Grad `,e.jsx(n,{children:"8"}),`, rechts der natürliche kubische Spline zu
denselben neun Punkten.`]}),e.jsx(pr,{}),e.jsxs(i.p,{children:["In der Voreinstellung wandert der fünfte Punkt um ",e.jsx(n,{children:"1"}),` nach oben. Der Spline
ändert sich um höchstens `,e.jsx(n,{children:"1{,}000"}),", das Polynom um ",e.jsx(n,{children:"2{,}320"}),`, also um mehr als
die Störung selbst. Noch deutlicher wird der Unterschied im Fernbereich: Mehr
als zwei Knoten vom verschobenen Punkt entfernt bleibt die Spline-Änderung
unter `,e.jsx(n,{children:"0{,}037"}),", während das Polynom dort weiterhin ",e.jsx(n,{children:"2{,}320"}),` ausschlägt, und
zwar am äußeren Rand. Die Balken zeigen, wo die Änderung sitzt: Von
`,e.jsx(n,{children:"1{,}732"})," fällt sie über ",e.jsx(n,{children:"0{,}464"}),", ",e.jsx(n,{children:"0{,}124"}),", ",e.jsx(n,{children:"0{,}031"})," auf ",e.jsx(n,{children:"0{,}010"}),`, also
je Knotenabstand auf gut ein Viertel. Neun der elf Koeffizienten reagieren
messbar, obwohl an der verschobenen Stelle nur drei Basisfunktionen
überhaupt von null verschieden sind.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Ein Spline vom Grad ",e.jsx(n,{children:"q"})," auf ",e.jsx(n,{children:"m"}),` Teilintervallen ist ein Polynom vom Grad
`,e.jsx(n,{children:"mq"}),"."]}),e.jsxs(i.p,{children:["Er ist überhaupt kein einzelnes Polynom, sondern eine Zusammensetzung aus ",e.jsx(n,{children:"m"}),`
Polynomen vom Grad `,e.jsx(i.em,{children:"höchstens"})," ",e.jsx(n,{children:"q"}),`. Der Grad wächst gerade nicht mit der Zahl
der Stücke; das ist der ganze Punkt der Konstruktion. Nur im Sonderfall
`,e.jsx(n,{children:"m = 1"})," liegt ein einzelnes Polynom vor, und auch dann vom Grad höchstens ",e.jsx(n,{children:"q"}),"."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Zur Beschreibung eines Splines vom Grad ",e.jsx(n,{children:"q"})," auf ",e.jsx(n,{children:"m+1"}),` Knoten brauchen wir
`,e.jsx(n,{children:"m+q"})," Parameter."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),`, unter seinen beiden Annahmen: einfache innere
Knoten und maximale Glattheit `,e.jsx(n,{children:"\\Ccal^{q-1}"}),`. Die Abzählung dazu lautet
`,e.jsx(n,{children:"m(q+1) - (m-1)q = m+q"}),"; für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 5"})," also ",e.jsx(n,{children:"20 - 12 = 8"}),`.
Verlangen wir an einem Knoten weniger Glattheit, steigt die Zahl.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[`Jede Funktion, die auf jedem Teilintervall mit einem Polynom vom Grad
höchstens `,e.jsx(n,{children:"q"})," übereinstimmt, ist ein Spline vom Grad ",e.jsx(n,{children:"q"}),"."]}),e.jsxs(i.p,{children:["Die Glattheit gehört zur Definition (",e.jsx(i.a,{href:"#env-was-in-dieser-definition-steckt",children:"Bemerkung 13.4.2"}),`). Die Funktion, die auf
`,e.jsx(n,{children:"[0,1)"})," konstant ",e.jsx(n,{children:"0"})," und auf ",e.jsx(n,{children:"[1,2]"})," konstant ",e.jsx(n,{children:"1"}),` ist, besteht aus zwei
Polynomen vom Grad höchstens `,e.jsx(n,{children:"3"}),`, ist aber nicht einmal stetig und damit kein
kubischer Spline. Als Spline vom Grad `,e.jsx(n,{children:"0"}),` geht sie durch, denn dort fordert
`,e.jsx(n,{children:"\\Ccal^{-1}"})," nichts."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Fordern wir von einem kubischen Spline zusätzlich, dass auch ",e.jsx(n,{children:"s'''"}),` stetig
ist, so bekommen wir eine glattere, aber immer noch stückweise verschiedene
Kurve.`]}),e.jsxs(i.p,{children:[`Dann stimmen benachbarte kubische Polynome an ihrer Nahtstelle in allen vier
Ableitungen der Ordnungen `,e.jsx(n,{children:"0"})," bis ",e.jsx(n,{children:"3"}),` überein und sind deshalb identisch. Aus
dem Spline wird ein einziges globales Polynom vom Grad höchstens `,e.jsx(n,{children:"3"}),`, und wir
sind zurück bei dem Ansatz, den wir gerade verlassen haben. `,e.jsx(n,{children:"\\Ccal^{q-1}"}),` ist
die höchste sinnvolle Glattheitsforderung.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Interpolieren wir ",e.jsx(n,{children:"n = m+1"}),` Datenpunkte mit einem kubischen Spline zum
Gitter der Datenpunkte, so ist der Interpolant eindeutig bestimmt.`]}),e.jsxs(i.p,{children:["Der Ansatzraum hat die Dimension ",e.jsx(n,{children:"m+3"}),", die Daten liefern aber nur ",e.jsx(n,{children:"m+1"}),`
Gleichungen. Zwei Bedingungen fehlen, und ohne sie gibt es unendlich viele
Lösungen (`,e.jsx(i.a,{href:"#env-zwei-bedingungen-fehlen-randbedingungen",children:"Bemerkung 13.4.6"}),`). Erst eine Randbedingung wie
`,e.jsx(n,{children:"s''(a) = s''(b) = 0"})," macht das System quadratisch und regulär."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`Die Ableitung eines kubischen Splines ist ein quadratischer Spline zum selben
Gitter.`}),e.jsxs(i.p,{children:["Stückweises Ableiten senkt den Grad jedes Stücks von ",e.jsx(n,{children:"3"})," auf ",e.jsx(n,{children:"2"}),`, und aus
`,e.jsx(n,{children:"\\Ccal^2"})," wird ",e.jsx(n,{children:"\\Ccal^1"})," (",e.jsx(i.a,{href:"#env-eigenschaften-von-splines-und-b-splines",children:"Satz 13.4.15"}),`). Das ist genau die maximale Glattheit
zum Grad `,e.jsx(n,{children:"2"}),`. Entsprechend ist die zweite Ableitung eines kubischen Splines
stückweise linear und stetig, während die dritte stückweise konstant ist
und an den Knoten springen darf.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m+q"})," B-Splines vom Grad ",e.jsx(n,{children:"q"})," genügt eine Knotenfolge mit ",e.jsx(n,{children:"m+q"})," Gliedern."]}),e.jsxs(i.p,{children:["Die Rekursion ",e.jsx(i.a,{href:"#eq-erweiterte-knotenfolge-und-b-splines-2",children:"(13.4.3)"})," greift für ",e.jsx(n,{children:"k = m+q"})," auf ",e.jsx(n,{children:"\\corange{\\tau_{k+q+1}}"}),`
zu, es braucht also `,e.jsx(n,{children:"m + 2q + 1"})," Knoten. Für ",e.jsx(n,{children:"q = 3"})," und ",e.jsx(n,{children:"m = 17"}),` sind das
`,e.jsx(n,{children:"24"})," statt ",e.jsx(n,{children:"20"})," (",e.jsx(i.a,{href:"#env-warum-die-knotenfolge-so-lang-sein-muss",children:"Bemerkung 13.4.9"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Verschieben wir einen Datenpunkt, so ändern sich nur die Koeffizienten
derjenigen B-Splines, die an dieser Stelle von null verschieden sind.`}),e.jsxs(i.p,{children:[`Die Änderung ist lokalisiert, aber nicht exakt lokal. An einem inneren
Datenpunkt sind bei `,e.jsx(n,{children:"q = 3"}),` nur drei Basisfunktionen von null verschieden,
im Beispiel des Widgets reagieren jedoch neun von elf Koeffizienten messbar:
`,e.jsx(n,{children:"1{,}732"}),", dann ",e.jsx(n,{children:"0{,}464"}),", ",e.jsx(n,{children:"0{,}124"}),", ",e.jsx(n,{children:"0{,}031"}),", ",e.jsx(n,{children:"0{,}010"}),`. Das
Gleichungssystem koppelt die Koeffizienten über das Band, und die Kopplung
fällt je Knotenabstand auf gut ein Viertel, statt abzubrechen.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath behandelt die stückweise polynomiale Interpolation in
§7.4, die kubischen Splines in §7.4.2 und die B-Splines samt Rekursion und
Bandstruktur in §7.4.3; die klassische Referenz zur Sache ist
Carl de Boor, A Practical Guide to Splines.`})})]})}function kr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(Ji,{...s})}):Ji(s)}const{blau:wr,gruen:En,orange:zr,rot:jn,grau:Ie,hellgrau:vr}=U,Qi=[[0,0],[1,1],[2,0]],ys=s=>s<=1?1.5*s-.5*s**3:1.5*(2-s)-.5*(2-s)**3,Ss=s=>s<=1?-3*s:-3*(2-s),yr=s=>-s*s+2*s,Sr=-2,_r=(s,i)=>(1-i)*ys(s)+i*yr(s),_s=(s,i)=>(1-i)*Ss(s)+i*Sr;function Xi(s,i,r,t=2e3){const d=(r-i)/t;let l=s(i)+s(r);for(let a=1;a<t;a++)l+=(a%2===1?4:2)*s(i+a*d);return l*d/3}function Yi(s){const i=r=>_s(r,s)**2;return Xi(i,0,1)+Xi(i,1,2)}const We=430,$e=260,V={l:42,r:12,t:12,b:28},oi=[{id:"kurven",label:"Kurven f(x)",yd:[-.25,1.3],achse:"f(x)",sLegende:"Spline s",gLegende:"g_t",fs:ys,fg:_r},{id:"kruemmung",label:"zweite Ableitung f″(x)",yd:[-4.6,2.6],achse:"f″(x)",sLegende:"s″",gLegende:"g_t″",fs:Ss,fg:_s}];function Br(){const[s,i]=q.useState("kurven"),[r,t]=q.useState(1e3),d=r/1e3,l=oi.find(m=>m.id===s)??oi[0],a=q.useMemo(()=>Yi(0),[]),h=q.useMemo(()=>Yi(d),[d]),o=[-.12,2.12],g=m=>V.l+(m-o[0])/(o[1]-o[0])*(We-V.l-V.r),f=m=>V.t+(l.yd[1]-m)/(l.yd[1]-l.yd[0])*($e-V.t-V.b),k=m=>{let x="";for(const[B,F]of[[0,1],[1,2]])for(let b=0;b<=120;b++){const R=B+(F-B)*b/120,P=m(R);Number.isFinite(P)&&(x+=`${b===0?"M":"L"}${g(R).toFixed(1)} ${f(P).toFixed(1)}`)}return x},c=k(l.fs),z=k(m=>l.fg(m,d)),_=Math.abs(d)<1e-9,p=m=>`rounded border px-2 py-1 text-sm ${m?"border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700":"border-slate-300 dark:border-slate-600"}`;let u;if(_)u=`Bei t = 0 ist g₀ der natürliche kubische Spline selbst, die rote Kurve liegt auf der grünen. Das Krümmungsintegral steht bei ${H(h)} und ist über den ganzen Regler hinweg der kleinste erreichbare Wert: Der Beweis zu ${ce("satz:kubische-splines-haben-minimale")} liefert J(g) = J(s) + ∫(h″)², und der Zusatzterm ist genau dann null, wenn h verschwindet.`;else if(Math.abs(d-1)<1e-9)u=`Bei t = 1 steht die Parabel p(x) = −x² + 2x da. Ihre zweite Ableitung ist konstant −2, das Integral also 4 · 2 = ${H(h)}. Der Spline kommt mit ${H(a)} aus, der Überschuss ${H(h-a)} ist ∫(h″)² mit h = p − s. Beide Kurven treffen dieselben drei blauen Punkte.`;else{let m;d<0?m=`Wegen p − s ≥ 0 liegt g_t für negative t zwischen den Stützstellen unter dem Spline, und im Knoten x = 1 ist es mit g_t″(1) = ${H(-3+d,2)} stärker gekrümmt als der Spline mit −3.`:d<1?m="Für t zwischen 0 und 1 verläuft g_t zwischen Spline und Parabel.":m="Für t über 1 zieht g_t noch über die Parabel hinaus.",u=`Der Regler steht bei t = ${H(d,2)}. Die rote Kurve g_t = s + t·(p − s) interpoliert dieselben drei Punkte wie der Spline, denn p − s verschwindet an den Stützstellen. Ihr Krümmungsintegral ist ${H(h)} gegen ${H(a)} beim Spline, der Überschuss ${H(h-a)} stimmt mit 2t² = ${H(2*d*d)} überein. ${m}`}const j=s==="kruemmung";return e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Stellen wir zuerst eine Vermutung für die minimale Krümmung auf und verschieben dann t."}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[oi.map(m=>e.jsx("button",{type:"button",className:p(m.id===s),onClick:()=>i(m.id),children:m.label},m.id)),e.jsx("button",{type:"button",className:p(!1),onClick:()=>t(0),children:"t = 0 (Spline)"}),e.jsx("button",{type:"button",className:p(!1),onClick:()=>t(1e3),children:"t = 1 (Parabel)"})]}),e.jsx(J,{label:"Mischung t",min:-1e3,max:2e3,step:50,value:r,onChange:t,fmt:m=>H(m/1e3,2),accent:jn}),e.jsxs("div",{className:"flex flex-wrap items-start gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${We} ${$e}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:V.l,y:V.t,width:We-V.l-V.r,height:$e-V.t-V.b,fill:"none",stroke:vr,strokeWidth:.8}),Ln(o[0],o[1]).map(m=>e.jsxs("g",{children:[e.jsx("line",{x1:g(m),x2:g(m),y1:$e-V.b,y2:$e-V.b+3,stroke:Ie}),e.jsx("text",{x:g(m),y:$e-V.b+14,textAnchor:"middle",fontSize:9,fill:Ie,children:String(m).replace("-","−").replace(".",",")})]},`x${m}`)),Ln(l.yd[0],l.yd[1]).map(m=>e.jsxs("g",{children:[e.jsx("line",{x1:V.l-3,x2:V.l,y1:f(m),y2:f(m),stroke:Ie}),e.jsx("text",{x:V.l-5,y:f(m)+3,textAnchor:"end",fontSize:9,fill:Ie,children:String(m).replace("-","−").replace(".",",")})]},`y${m}`)),e.jsx("line",{x1:V.l,x2:We-V.r,y1:f(0),y2:f(0),stroke:Ie,strokeWidth:1}),e.jsx("text",{x:We-V.r-4,y:f(0)-5,textAnchor:"end",fontSize:10,fill:Ie,children:"x"}),e.jsx("text",{x:V.l+3,y:V.t+10,fontSize:10,fill:Ie,children:l.achse}),Qi.map(([m])=>e.jsx("line",{x1:g(m),x2:g(m),y1:V.t,y2:$e-V.b,stroke:zr,strokeDasharray:"2 4",strokeWidth:1},`k${m}`)),e.jsx("path",{d:c,fill:"none",stroke:En,strokeWidth:2.6}),e.jsx("path",{d:z,fill:"none",stroke:jn,strokeWidth:1.8,strokeDasharray:"6 3"}),!j&&Qi.map(([m,x])=>e.jsx("circle",{cx:g(m),cy:f(x),r:4.5,fill:wr},`d${m}`)),e.jsxs("g",{fontSize:10,children:[e.jsx("text",{x:We-V.r-8,y:V.t+14,textAnchor:"end",fill:En,children:"Spline s"}),e.jsx("text",{x:We-V.r-8,y:V.t+27,textAnchor:"end",fill:jn,children:"g_t"})]})]}),e.jsxs("div",{className:"min-w-56 grow space-y-2",children:[e.jsx("table",{className:"w-full text-right font-mono text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Mischung t"}),e.jsx("td",{className:"px-2 py-0.5",children:H(d,2)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",style:{color:En},children:"J(s) = ∫₀² |s″|²"}),e.jsx("td",{className:"px-2 py-0.5",style:{color:En},children:H(a)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",style:{color:jn},children:"J(g_t) = ∫₀² |g_t″|²"}),e.jsx("td",{className:"px-2 py-0.5",style:{color:jn},children:H(h)})]}),e.jsxs("tr",{className:"font-semibold",children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Überschuss ∫(h″)²"}),e.jsx("td",{className:"px-2 py-0.5",children:H(h-a)})]})]})}),e.jsx("p",{className:"px-2 text-xs text-slate-600 dark:text-slate-400",children:"Die Teilintegrale des Splines sind ∫₀¹ 9x² dx = 3 und ∫₁² 9(2 − x)² dx = 3."})]})]}),e.jsxs(le,{kind:Math.abs(d)<.001?"ok":"warn",children:[u," Das bestätigt ",ce("satz:kubische-splines-haben-minimale"),"."]})]})}function es(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Bis hierher war Interpolation ein lineares Problem: Basis wählen, System
lösen (`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`). Gelandet sind wir bei stückweisen
`,e.jsx(S,{id:"polynomial",children:"Polynomen"}),`, weil globale Polynome hohen Grades am Rand
ausschlagen. Eine Frage ist dabei offen geblieben: Warum laufen ausgerechnet
`,e.jsx(i.em,{children:"kubische"})," Splines überall als Standard? Grad ",e.jsx(n,{children:"2"})," wäre billiger, Grad ",e.jsx(n,{children:"5"}),`
glatter.`]}),`
`,e.jsxs(i.p,{children:[`Die Antwort dieses Abschnitts ist ein Optimalitätssatz. Der kubische Spline
ist nicht irgendein Interpolant, sondern die Lösung eines
`,e.jsx(S,{id:"optimization",children:"Optimierungsproblems"}),`: Unter allen zweimal stetig
differenzierbaren Funktionen durch dieselben Punkte ist er derjenige mit der
geringsten Gesamtkrümmung. Die Eigenschaft trägt den englischen Namen
`,e.jsx(i.em,{children:"minimal wiggliness"}),`, und der trifft das Bild gut. Der
kubische Spline zappelt am wenigsten.`]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.5.1 (Was die zweite Kapitelhälfte voraussetzt)",id:"env-was-die-zweite-kapitelhaelfte",children:[e.jsx(i.p,{children:`Von hier an lebt das Kapitel von Ergebnissen aus mehreren Ecken des Skripts.
Wir sammeln sie mit den zugehörigen Abschnitten:`}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Lineare Algebra:"})," ",e.jsx(S,{id:"linear-least-squares",children:"Kleinste Quadrate"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),`) und die
`,e.jsx(S,{id:"pseudoinverse",children:"Pseudoinverse"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),`). Beide brauchen wir ab
`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),`, wenn aus dem Interpolationsproblem eine
Regression wird. Die Pseudoinverse liefert dabei eine einheitliche
Schreibweise auch bei Rangdefekt; unter vollem Spaltenrang lässt sie sich
durch `,e.jsx(n,{children:"(\\bB^\\top\\bB)^{-1}\\bB^\\top"}),` ersetzen, wie die Varianzrechnung in
`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," zeigt."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Analysis:"})," ",e.jsx(S,{id:"differentiability",children:"Glattheitsklassen"})," ",e.jsx(n,{children:"\\Ccal^k"}),`, also
`,e.jsx(n,{children:"k"}),`-mal stetig differenzierbare Funktionen. In diesem Abschnitt zählt
`,e.jsx(n,{children:"\\Ccal^2"}),", in ",e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"})," dann ",e.jsx(n,{children:"\\Ccal^4"}),`. Dazu Integrale
der Bauart `,e.jsx(n,{children:"\\int |f''(x)|^2 \\dx"})," und die partielle Integration."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Statistik:"}),` Designmatrix eines
`,e.jsx(S,{id:"linear-regression",children:"linearen Modells"}),` und die Zerlegung des mittleren
quadratischen Fehlers in Bias und `,e.jsx(S,{id:"variance",children:"Varianz"}),`
(`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),")."]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Splines, kurz erinnert"}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.5.2 (Spline)",id:"env-spline",children:[e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"Spline"})," setzt Polynome vom Grad höchstens ",e.jsx(n,{children:"q"}),` an vorgegebenen Stellen
`,e.jsx(n,{children:"\\corange{\\xi_1 < \\dots < \\xi_{m-1}}"})," zusammen, den ",e.jsx(i.em,{children:"Knoten"}),` (knots), und
zwar so glatt wie möglich: An jedem Knoten passen die Stücke bis zur
`,e.jsx(n,{children:"(q-1)"}),"-ten Ableitung zusammen (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),"). Ein kubischer Spline (",e.jsx(n,{children:"q = 3"}),`) ist demnach eine
`,e.jsx(n,{children:"\\Ccal^2"}),`-Funktion: Wert, erste und zweite Ableitung gehen ohne Sprung über
die Knoten. Genau dieser Fall ist der Standard, und dieser Abschnitt sagt,
warum.`]}),e.jsxs(i.p,{children:[`Ein Wort zur Benennung, weil im Satz weiter unten andere Buchstaben stehen:
`,e.jsx(n,{children:"\\corange{\\xi_1}, \\dots, \\corange{\\xi_{m-1}}"})," sind hier nur die ",e.jsx(i.em,{children:"inneren"}),`
Trennstellen. Im Krümmungssatz fallen die Knoten mit den Stützstellen
zusammen und heißen deshalb `,e.jsx(n,{children:"\\corange{x_1}, \\dots, \\corange{x_n}"}),`, die beiden
Intervallenden mitgezählt. Bei `,e.jsx(n,{children:"n"})," Datenpunkten ist also ",e.jsx(n,{children:"m = n - 1"}),` und
`,e.jsx(n,{children:"\\corange{\\xi_k} = \\corange{x_{k+1}}"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Krümmung als Zielgröße"}),`
`,e.jsxs(i.p,{children:[`Wollen wir „möglichst glatt" zu einer rechenbaren Forderung machen, brauchen
wir eine Zahl, die einer Funktion ihre Zappeligkeit zuordnet. Die
`,e.jsx(S,{id:"derivative",children:"zweite Ableitung"})," ",e.jsx(n,{children:"f''"}),` ist der natürliche Kandidat: Sie ist
genau dort groß, wo sich die Steigung schnell ändert, und sie verschwindet
genau für Geraden. Weil uns nur die Stärke der Biegung interessiert und nicht
ihre Richtung, quadrieren wir und integrieren über das ganze Intervall.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.5.3 (Krümmungsfunktional)",id:"env-kruemmungsfunktional",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"g \\in \\Ccal^2[a, b]"})," heißt"]}),e.jsx(T,{tag:"13.5.1",id:"eq-kruemmungsfunktional",children:"J(g) := \\int_a^b \\left|g''(x)\\right|^2 \\dx"}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"Krümmungsfunktional"})," von ",e.jsx(n,{children:"g"})," auf ",e.jsx(n,{children:"[a, b]"}),"."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"J"})," ist eine ",e.jsx(S,{id:"objective-function",children:"Zielfunktion"}),` auf einem Funktionenraum,
und `,e.jsx(n,{children:"J(g) = 0"}),` gilt genau für die affinen Funktionen
`,e.jsx(n,{children:"g(x) = \\alpha x + \\beta"}),". Je größer ",e.jsx(n,{children:"J(g)"}),`, desto mehr Biegearbeit steckt in
der Kurve.`]}),`
`,e.jsxs(i.p,{children:["Streng genommen misst ",e.jsx(n,{children:"J"}),` nicht die geometrische Krümmung. Die ist
`,e.jsx(n,{children:"\\kappa(x) = |g''(x)| / (1 + g'(x)^2)^{3/2}"}),`, und das Integral darüber wäre
weder quadratisch noch bequem. Für flache Kurven mit `,e.jsx(n,{children:"|g'| \\ll 1"}),` ist
`,e.jsx(n,{children:"\\kappa \\approx |g''|"}),", und ",e.jsx(n,{children:"J"}),` ist die dazu passende quadratische Größe. Der
Name „minimale Krümmung" ist in der Spline-Literatur eingebürgert, gemeint
ist immer `,e.jsx(i.a,{href:"#eq-kruemmungsfunktional",children:"(13.5.1)"}),". Dass ",e.jsx(n,{children:"J"}),` quadratisch ist, ist kein Schönheitsfehler,
sondern der Grund für alles Folgende: Quadratische Ziele führen auf lineare
Gleichungen, genau wie bei den Kleinsten Quadraten in
`,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),"."]}),`
`,e.jsxs(i.p,{children:[`Damit lässt sich die Ausgangsfrage präzise stellen. Gegeben sind Punkte, gesucht
ist unter allen `,e.jsx(n,{children:"\\Ccal^2"}),`-Funktionen, die durch diese Punkte laufen, die mit
dem kleinsten `,e.jsx(n,{children:"J"}),`. Interpolanten gibt es unendlich viele
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`), das Minimum
dagegen ist eindeutig, und es hat einen Namen.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.5.4 (Kubische Splines haben minimale Krümmung)",id:"env-kubische-splines-haben-minimale",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n \\ge 2"}),` und
`,e.jsx(n,{children:"\\cblue{(x_1, y_1)}, \\dots, \\cblue{(x_n, y_n)} \\in [a,b] \\times \\R"}),` mit
`,e.jsx(n,{children:"a = \\corange{x_1} < \\corange{x_2} < \\dots < \\corange{x_n} = b"}),`. Sei
`,e.jsx(n,{children:"\\cgreen{s}"})," ein ",e.jsx(i.em,{children:"natürlicher kubischer Spline"}),` mit Knoten
`,e.jsx(n,{children:"\\corange{x_1, \\dots, x_n}"}),`, der diese Punkte interpoliert, also
`,e.jsx(n,{children:"\\cgreen{s(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"})," und"]}),e.jsx(y,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0 ."}),e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cred{g} \\in \\Ccal^2[a, b]"}),` eine weitere Funktion mit
`,e.jsx(n,{children:"\\cred{g(x_i)} = \\cblue{y_i}"})," für alle ",e.jsx(n,{children:"i"}),". Dann gilt"]}),e.jsx(y,{children:`\\int_a^b \\left|\\cgreen{s''(x)}\\right|^2 \\dx
\\;\\le\\;
\\int_a^b \\left|\\cred{g''(x)}\\right|^2 \\dx ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"J(\\cgreen{s}) \\le J(\\cred{g})"}),"."]})]}),`
`,e.jsx(i.p,{children:`Im Kern besteht der Beweis aus zwei partiellen Integrationen, die wir über
die Knoten hinweg zusammensetzen. Die beiden Randbedingungen des
natürlichen Splines sind darin nicht Zierrat, sondern genau der Grund, warum
ein störender Term verschwindet.`}),`
`,e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{s}"})," ist auf jedem Teilintervall ein Polynom und an den Knoten zweimal stetig differenzierbar, liegt also selbst in ",e.jsx(n,{children:"\\Ccal^2"}),"; die Differenz zweier ",e.jsx(n,{children:"\\Ccal^2"}),"-Funktionen ist wieder ",e.jsx(n,{children:"\\Ccal^2"})]}),children:[e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"\\cred{h} := \\cred{g} - \\cgreen{s}"}),`. Dann ist
`,e.jsx(n,{children:"\\cred{h} \\in \\Ccal^2[a, b]"}),", und weil ",e.jsx(n,{children:"\\cgreen{s}"})," und ",e.jsx(n,{children:"\\cred{g}"}),` dieselben
Werte interpolieren, gilt`]}),e.jsx(y,{children:"\\cred{h(x_i)} = 0 \\qquad \\text{für } i = 1, \\dots, n ."})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["binomische Formel ",e.jsx(n,{children:"(u + v)^2 = u^2 + 2uv + v^2"})," mit ",e.jsx(n,{children:"u = \\cgreen{s''}"})," und ",e.jsx(n,{children:"v = \\cred{h''}"}),"; alle drei Integrale existieren, weil ",e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h''}"})," stetig sind"]}),children:[e.jsxs(i.p,{children:["Ausmultiplizieren von ",e.jsx(n,{children:"\\cred{g''} = \\cgreen{s''} + \\cred{h''}"}),` unter dem
Integral liefert die Zerlegung`]}),e.jsx(T,{tag:"13.5.2",id:"eq-eq-13-5-2",children:`J(\\cred{g})
= J(\\cgreen{s})
+ 2 \\int_a^b \\cgreen{s''(x)}\\,\\cred{h''(x)} \\dx
+ \\int_a^b \\left(\\cred{h''(x)}\\right)^2 \\dx .`}),e.jsx(i.p,{children:"Zu zeigen bleibt, dass der mittlere Term verschwindet."})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["zweimal partiell integriert: der erste Durchgang schiebt einen Strich von ",e.jsx(n,{children:"\\cred{h''}"})," auf ",e.jsx(n,{children:"\\cgreen{s''}"})," und hinterlässt den Randterm ",e.jsx(n,{children:"\\cgreen{s''}\\cred{h'}"})," samt ",e.jsx(n,{children:"-\\int \\cgreen{s^{(3)}}\\cred{h'}"}),", der zweite behandelt dieses Integral genauso und liefert den Randterm ",e.jsx(n,{children:"-\\cgreen{s^{(3)}}\\cred{h}"})," und ",e.jsx(n,{children:"+\\int \\cgreen{s^{(4)}}\\cred{h}"})]}),children:[e.jsxs(i.p,{children:["Auf jedem einzelnen Knotenintervall ",e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"}),` ist
`,e.jsx(n,{children:"\\cgreen{s}"})," ein Polynom vom Grad höchstens ",e.jsx(n,{children:"3"}),`, dort also beliebig oft
differenzierbar. Deshalb zerlegen wir das mittlere Integral und integrieren
auf jedem Stück zweimal partiell:`]}),e.jsx(y,{children:`\\int_{x_{i-1}}^{x_i} \\cgreen{s''}\\, \\cred{h''} \\dx
= \\Bigl[\\cgreen{s''}\\,\\cred{h'} - \\cgreen{s^{(3)}}\\,\\cred{h}\\Bigr]_{x_{i-1}}^{x_i}
+ \\int_{x_{i-1}}^{x_i} \\cgreen{s^{(4)}}\\, \\cred{h} \\dx .`})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["die dritte Ableitung eines kubischen Polynoms ist konstant, die vierte null; das gilt stückweise, an den Knoten selbst ist ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"})," im Allgemeinen unstetig"]}),children:[e.jsxs(i.p,{children:["Als kubisches Polynom hat ",e.jsx(n,{children:"\\cgreen{s}"}),` auf jedem Teilintervall
`,e.jsx(n,{children:"\\cgreen{s^{(4)}} \\equiv 0"}),`. Die Integrale fallen weg, übrig bleiben die
Randterme:`]}),e.jsx(y,{children:`\\int_a^b \\cgreen{s''}\\, \\cred{h''} \\dx
= \\sum_{i=2}^{n}
\\Bigl[\\cgreen{s''}\\,\\cred{h'} - \\cgreen{s^{(3)}}\\,\\cred{h}\\Bigr]_{x_{i-1}}^{x_i} .`})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"})," ist die natürliche Randbedingung; für den zweiten Anteil ist ",e.jsx(n,{children:"\\cgreen{s^{(3)}(x_i)}\\,\\cred{h(x_i)} = 0"})," von beiden Seiten, ganz gleich wie ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"})," dort springt"]}),children:[e.jsxs(i.p,{children:[`Die Summe teleskopiert, allerdings mit zwei verschiedenen Begründungen. Für
den ersten Anteil sind `,e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h'}"}),` an jedem inneren Knoten
stetig, der Beitrag vom rechten Rand des einen Intervalls hebt also den vom
linken Rand des nächsten auf:`]}),e.jsx(y,{children:`\\sum_{i=2}^{n} \\Bigl[\\cgreen{s''}\\,\\cred{h'}\\Bigr]_{x_{i-1}}^{x_i}
= \\Bigl[\\cgreen{s''}\\,\\cred{h'}\\Bigr]_a^b
= \\cgreen{s''(b)}\\,\\cred{h'(b)} - \\cgreen{s''(a)}\\,\\cred{h'(a)} = 0 .`}),e.jsxs(i.p,{children:["Der zweite Anteil verschwindet sogar summandenweise, weil ",e.jsx(n,{children:"\\cred{h}"}),` an jedem
Knoten null ist.`]})]}),e.jsxs(K,{why:e.jsx(e.Fragment,{children:"der verbleibende Integrand ist ein Quadrat, also nirgends negativ, und damit ist auch sein Integral nicht negativ"}),children:[e.jsxs(i.p,{children:["Damit ist der mittlere Term in ",e.jsx(i.a,{href:"#eq-eq-13-5-2",children:"(13.5.2)"})," null, und es bleibt"]}),e.jsx(T,{tag:"13.5.3",id:"eq-eq-13-5-3",children:`J(\\cred{g}) = J(\\cgreen{s}) + \\int_a^b \\left(\\cred{h''(x)}\\right)^2 \\dx
\\;\\ge\\; J(\\cgreen{s}) .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["hätte ",e.jsx(n,{children:"(\\cred{h''})^2"})," an einer Stelle einen positiven Wert, wäre es aus Stetigkeitsgründen auf einer ganzen Umgebung positiv und das Integral echt größer als null; aus ",e.jsx(n,{children:"\\alpha x_1 + \\beta = \\alpha x_2 + \\beta = 0"})," mit ",e.jsx(n,{children:"x_1 \\neq x_2"})," folgt ",e.jsx(n,{children:"\\alpha = 0"})," und dann ",e.jsx(n,{children:"\\beta = 0"})]}),children:e.jsxs(i.p,{children:["Für den Gleichheitsfall lesen wir ",e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"}),` rückwärts. Aus
`,e.jsx(n,{children:"J(\\cred{g}) = J(\\cgreen{s})"})," folgt ",e.jsx(n,{children:"\\int_a^b (\\cred{h''})^2 \\dx = 0"}),`, und
weil `,e.jsx(n,{children:"(\\cred{h''})^2"}),` stetig und nirgends negativ ist, folgt daraus
`,e.jsx(n,{children:"\\cred{h''} \\equiv 0"})," auf ",e.jsx(n,{children:"[a,b]"}),". Also ist ",e.jsx(n,{children:"\\cred{h}"}),` affin,
`,e.jsx(n,{children:"\\cred{h(x)} = \\alpha x + \\beta"}),". Wegen ",e.jsx(n,{children:"n \\ge 2"})," hat ",e.jsx(n,{children:"\\cred{h}"}),` mindestens
zwei verschiedene Nullstellen `,e.jsx(n,{children:"\\corange{x_1} \\neq \\corange{x_2}"}),`, und eine
affine Funktion mit zwei Nullstellen ist die Nullfunktion. Also
`,e.jsx(n,{children:"\\cred{h} \\equiv 0"})," und ",e.jsx(n,{children:"\\cred{g} = \\cgreen{s}"}),"."]})})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.5.5 (Was die Randterme wirklich brauchen)",id:"env-was-die-randterme-wirklich-brauchen",children:[e.jsx(i.p,{children:`Die Rechnung im Beweis ist empfindlicher, als sie aussieht, und es lohnt
sich, die drei Zutaten getrennt zu benennen.`}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Das Teleskopieren von ",e.jsx(n,{children:"\\cgreen{s''}\\,\\cred{h'}"}),` braucht die Stetigkeit von
`,e.jsx(n,{children:"\\cgreen{s''}"})," ",e.jsx(i.em,{children:"und"})," von ",e.jsx(n,{children:"\\cred{h'}"}),` über die Knoten hinweg. Beides ist
vorhanden: `,e.jsx(n,{children:"\\cgreen{s}"})," ist als kubischer Spline in ",e.jsx(n,{children:"\\Ccal^2"}),`, und
`,e.jsx(n,{children:"\\cred{h}"})," ist es nach Voraussetzung an ",e.jsx(n,{children:"\\cred{g}"}),". Wäre ",e.jsx(n,{children:"\\cred{g}"}),` nur
stückweise glatt mit Knick, bräche der Schritt zusammen.`]}),`
`,e.jsxs(i.li,{children:["Die dritte Ableitung ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"}),` darf an den Knoten dagegen
springen, und sie tut es im Allgemeinen auch. Gerettet wird der Term
allein durch `,e.jsx(n,{children:"\\cred{h(x_i)} = 0"}),`: Der Sprung wird mit null multipliziert.
Genau deshalb müssen die Knoten des Splines die Datenpunkte sein.`]}),`
`,e.jsxs(i.li,{children:["Für den letzten Rest ",e.jsx(n,{children:"[\\cgreen{s''}\\cred{h'}]_a^b"}),` hilft kein
Verschwinden von `,e.jsx(n,{children:"\\cred{h}"})," mehr, denn dort steht ",e.jsx(n,{children:"\\cred{h'}"}),`. Die
natürliche Bedingung `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),` macht ihn
null, und das ist der bequemste Weg. Es ist nicht der einzige: Verlangen
wir stattdessen von allen Kandidaten vorgeschriebene Randsteigungen, so
ist `,e.jsx(n,{children:"\\cred{h'(a)} = \\cred{h'(b)} = 0"}),`, und der Term verschwindet ebenso.
Das führt auf den eingespannten Spline (clamped spline), für den derselbe
Satz in seiner Klasse gilt.`]}),`
`]}),e.jsxs(i.p,{children:[`Eine Voraussetzung im Satzkopf ist dabei leicht zu übersehen:
`,e.jsx(n,{children:"a = \\corange{x_1}"})," und ",e.jsx(n,{children:"\\corange{x_n} = b"}),`, die äußersten Knoten sind also
die Intervallenden. Liegen die Daten echt im Inneren, setzt man den Spline
außerhalb linear fort; dort ist `,e.jsx(n,{children:"\\cgreen{s''} = 0"}),", ",e.jsx(n,{children:"J(\\cgreen{s})"}),` bleibt
unverändert, und die Ungleichung überträgt sich auf das größere Intervall.`]})]}),`
`,e.jsxs(w,{kind:"Korollar",label:"13.5.6 (Der natürliche kubische Spline ist der einzige Minimierer)",id:"env-der-natuerliche-kubische-spline-ist-der",children:[e.jsxs(i.p,{children:["Unter den Voraussetzungen von ",e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"})," ist ",e.jsx(n,{children:"\\cgreen{s}"})," der ",e.jsx(i.em,{children:"eindeutige"}),`
Minimierer von `,e.jsx(n,{children:"J"})," in der Menge"]}),e.jsx(y,{children:"\\left\\{ g \\in \\Ccal^2[a,b] \\;:\\; g(x_i) = \\cblue{y_i} \\text{ für } i = 1, \\dots, n \\right\\} ."}),e.jsxs(i.p,{children:[`Das ist genau der letzte Beweisschritt: Jeder andere Interpolant mit
demselben Krümmungswert ist `,e.jsx(n,{children:"\\cgreen{s}"})," selbst."]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` setzt voraus, dass ein natürlicher
kubischer Spline durch die Punkte überhaupt existiert. Er tut es, und zwar
genau einer: Die Abzählung von Unbekannten und Bedingungen geht auf, und das
zugehörige tridiagonale Gleichungssystem für die zweiten Ableitungen ist
strikt diagonaldominant und damit regulär.`]}),`
`,e.jsx(Q,{title:"Die Abzählung und das tridiagonale System dahinter",children:e.jsxs(w,{kind:"Bemerkung",label:"13.5.7 (Existenz: die Abzählung geht auf)",id:"env-existenz-die-abzaehlung-geht-auf",children:[e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"n"})," Knoten gibt es ",e.jsx(n,{children:"n-1"})," Teilintervalle mit je ",e.jsx(n,{children:"4"}),` Koeffizienten,
zusammen `,e.jsx(n,{children:"4(n-1)"}),`
Unbekannte. Dem stehen `,e.jsx(n,{children:"2(n-1)"}),` Interpolationsbedingungen gegenüber (jedes
Stück trifft beide Endwerte), `,e.jsx(n,{children:"2(n-2)"}),` Glattheitsbedingungen an den inneren
Knoten (erste und zweite Ableitung) und die `,e.jsx(n,{children:"2"}),` natürlichen Randbedingungen.
Summe: `,e.jsx(n,{children:"2(n-1) + 2(n-2) + 2 = 4(n-1)"}),`, also genauso viele Gleichungen wie
Unbekannte. Für `,e.jsx(n,{children:"n = 5"})," etwa sind es ",e.jsx(n,{children:"16"})," auf beiden Seiten."]}),e.jsxs(i.p,{children:[`Abzählen allein ist noch kein Existenzbeweis, denn gleich viele Gleichungen
wie Unbekannte heißt nicht, dass die Matrix regulär ist. Das sieht man
aber, wenn man die `,e.jsx(n,{children:"4(n-1)"})," Koeffizienten zugunsten der ",e.jsx(i.em,{children:"Momente"}),`
`,e.jsx(n,{children:"M_i := \\cgreen{s''(x_i)}"}),` eliminiert. Mit den Abständen
`,e.jsx(n,{children:"\\corange{h_i} := \\corange{x_{i+1}} - \\corange{x_i}"}),` bleibt für jeden inneren
Knoten `,e.jsx(n,{children:"i = 2, \\dots, n-1"})," genau eine Gleichung übrig,"]}),e.jsx(y,{children:`\\corange{h_{i-1}}\\,M_{i-1}
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
wächst also nur linear in `,e.jsx(n,{children:"n"}),` statt kubisch. Genau deshalb bleiben Splines
auch bei vielen Punkten billig. Für die drei Punkte aus `,e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"}),` bleibt
davon die einzelne Gleichung `,e.jsx(n,{children:"4M_2 = -12"})," mit ",e.jsx(n,{children:"M_2 = -3"}),`, und das ist genau
das `,e.jsx(n,{children:"\\cgreen{s''(1)} = -3"}),`, das wir dort ausrechnen.
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` zählt denselben
Ansatz für vier Punkte durch.`]})]})}),`
`,e.jsx(i.h3,{children:"Beispiel: Spline gegen Parabel"}),`
`,e.jsxs(i.p,{children:[`Der Satz verspricht, dass der natürliche kubische Spline gegen jeden anderen
`,e.jsx(n,{children:"\\Ccal^2"}),`-Interpolanten gewinnt. An drei Punkten lässt sich das komplett von
Hand nachrechnen.`]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.5.8 (Drei Punkte, zwei Interpolanten)",id:"env-drei-punkte-zwei-interpolanten",children:[e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Gegeben:"})," die Punkte ",e.jsx(n,{children:"\\cblue{(0,0)}"}),", ",e.jsx(n,{children:"\\cblue{(1,1)}"}),", ",e.jsx(n,{children:"\\cblue{(2,0)}"}),`,
also `,e.jsx(n,{children:"a = 0"}),", ",e.jsx(n,{children:"b = 2"})," und Knoten ",e.jsx(n,{children:"\\corange{x_1 = 0}"}),", ",e.jsx(n,{children:"\\corange{x_2 = 1}"}),`,
`,e.jsx(n,{children:"\\corange{x_3 = 2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Der natürliche kubische Spline"})," ist"]}),e.jsx(y,{children:`\\cgreen{s(x)} = \\begin{cases}
1{,}5\\,x - 0{,}5\\,x^3 & x \\in [0, 1], \\\\[2pt]
1{,}5\\,(2-x) - 0{,}5\\,(2-x)^3 & x \\in [1, 2].
\\end{cases}`}),e.jsx(i.p,{children:"Die drei Eigenschaften prüfen wir der Reihe nach."}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Interpolation:"})," ",e.jsx(n,{children:"\\cgreen{s(0)} = 0"}),", ",e.jsx(n,{children:"\\cgreen{s(1)} = 1{,}5 - 0{,}5 = 1"}),` und
`,e.jsx(n,{children:"\\cgreen{s(2)} = 0"}),", jeweils aus dem passenden Ast."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Glattheit im inneren Knoten:"}),` Aus
`,e.jsx(n,{children:"\\cgreen{s'(x)} = 1{,}5 - 1{,}5\\,x^2"}),` links und
`,e.jsx(n,{children:"\\cgreen{s'(x)} = -1{,}5 + 1{,}5\\,(2-x)^2"})," rechts wird an der Stelle ",e.jsx(n,{children:"x = 1"}),`
beidseitig `,e.jsx(n,{children:"0"}),"; aus ",e.jsx(n,{children:"\\cgreen{s''(x)} = -3x"}),` links und
`,e.jsx(n,{children:"\\cgreen{s''(x)} = -3(2-x)"})," rechts beidseitig ",e.jsx(n,{children:"-3"}),`. Der Spline ist also
`,e.jsx(n,{children:"\\Ccal^2"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Natürlichkeit:"})," ",e.jsx(n,{children:"\\cgreen{s''(0)} = 0"})," und ",e.jsx(n,{children:"\\cgreen{s''(2)} = -3 \\cdot 0 = 0"}),"."]}),e.jsx(i.p,{children:"Damit rechnen wir das Krümmungsintegral aus, getrennt nach Teilintervall:"}),e.jsx(y,{children:`\\begin{aligned}
J(\\cgreen{s})
&= \\int_0^1 (-3x)^2 \\dx + \\int_1^2 \\bigl(-3(2-x)\\bigr)^2 \\dx \\\\
&= \\int_0^1 9x^2 \\dx + \\int_0^1 9u^2 \\, \\mathrm{d}u \\\\
&= 9 \\cdot \\Bigl[\\tfrac{x^3}{3}\\Bigr]_0^1 + 9 \\cdot \\Bigl[\\tfrac{u^3}{3}\\Bigr]_0^1
= 3 + 3 = 6 .
\\end{aligned}`}),e.jsxs(i.p,{children:["Im zweiten Integral haben wir ",e.jsx(n,{children:"u = 2 - x"}),` substituiert, also
`,e.jsx(n,{children:"\\mathrm{d}u = -\\dx"})," und die Grenzen ",e.jsx(n,{children:"x = 1, 2"})," zu ",e.jsx(n,{children:"u = 1, 0"}),` gedreht; das
Minuszeichen der Substitution und die gedrehten Grenzen heben sich auf.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Zum Vergleich die Parabel"})," ",e.jsx(n,{children:"\\cred{p(x)} = -x^2 + 2x"}),`. Auch sie
interpoliert, denn `,e.jsx(n,{children:"\\cred{p(0)} = 0"}),", ",e.jsx(n,{children:"\\cred{p(1)} = 1"}),` und
`,e.jsx(n,{children:"\\cred{p(2)} = 0"}),". Ihre Ableitungen sind ",e.jsx(n,{children:"\\cred{p'(x)} = -2x + 2"}),` und
`,e.jsx(n,{children:"\\cred{p''(x)} = -2"}),", also"]}),e.jsx(y,{children:"J(\\cred{p}) = \\int_0^2 (-2)^2 \\dx = 4 \\cdot 2 = 8 ."}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:"Interpolant"}),e.jsx(i.th,{style:{textAlign:"right"},children:e.jsx(n,{children:"\\int_0^2 \\left\\lvert f''(x)\\right\\rvert^2 \\dx"})})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:["Spline ",e.jsx(n,{children:"\\cgreen{s}"})]}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"6"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{style:{textAlign:"left"},children:["Parabel ",e.jsx(n,{children:"\\cred{p}"})]}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"8"})})]})]})]}),e.jsxs(i.p,{children:["Der Spline gewinnt, wie ",e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` es verlangt. Der Überschuss lässt sich
mit `,e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"})," sogar benennen: Mit ",e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),` ist
`,e.jsx(n,{children:"\\cred{h''(x)} = -2 + 3x"})," auf ",e.jsx(n,{children:"[0,1]"})," und"]}),e.jsx(y,{children:`\\int_0^1 (3x - 2)^2 \\dx = \\Bigl[\\tfrac{(3x-2)^3}{9}\\Bigr]_0^1
= \\tfrac{1}{9} - \\Bigl(-\\tfrac{8}{9}\\Bigr) = 1 ,`}),e.jsxs(i.p,{children:["auf ",e.jsx(n,{children:"[1,2]"}),` aus Symmetriegründen ebenso. Zusammen ist
`,e.jsx(n,{children:"\\int_0^2 (\\cred{h''})^2 \\dx = 2"}),", und tatsächlich ist ",e.jsx(n,{children:"6 + 2 = 8"}),"."]})]}),`
`,e.jsxs(re,{title:"Eine ganze Schar von Interpolanten",children:[e.jsxs(i.p,{children:[`Spline und Parabel sind nur zwei Punkte in einer unendlichen Menge. Weil
`,e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),` an allen drei Stützstellen verschwindet,
interpoliert auch jede Mischung
`,e.jsx(n,{children:"g_t = \\cgreen{s} + t\\,\\cred{h}"})," dieselben Daten, für jedes ",e.jsx(n,{children:"t \\in \\R"}),`. Mit
`,e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"})," ist ihr Krümmungsintegral"]}),e.jsx(y,{children:"J(g_t) = J(\\cgreen{s}) + t^2 \\int_0^2 (\\cred{h''})^2 \\dx = 6 + 2t^2 ,"}),e.jsxs(i.p,{children:["eine nach oben geöffnete Parabel in ",e.jsx(n,{children:"t"})," mit Minimum bei ",e.jsx(n,{children:"t = 0"}),`. Der Regler
fährt diese Schar ab: `,e.jsx(n,{children:"t = 0"})," ist der Spline, ",e.jsx(n,{children:"t = 1"}),` die Parabel des
Beispiels. Die zweite Ansicht zeigt, woher der Unterschied kommt, nämlich aus
zwei Geradenstücken von `,e.jsx(n,{children:"\\cgreen{s''}"})," gegen die Konstante ",e.jsx(n,{children:"-2"}),` von
`,e.jsx(n,{children:"\\cred{p''}"}),`. Die Farben tragen dieselben Rollen wie im Text: blau die Daten,
orange die Knoten, grün der Spline als Lösung des Minimierungsproblems, rot
die Abweichung `,e.jsx(n,{children:"\\cred{h}"})," und mit ihr jeder Konkurrent ",e.jsx(n,{children:"g_t"}),"."]}),e.jsx(i.p,{children:"Welche Mischung hat nach unserer Vermutung die kleinste Krümmungsenergie?"}),e.jsx(Ue,{frage:"Bei welchem t wird die Krümmungsenergie minimal?",loesung:0,toleranz:.05,einheit:"t",children:e.jsx(Br,{})})]}),`
`,e.jsxs(i.p,{children:["Bemerkenswert an ",e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"})," ist, was er ",e.jsx(i.em,{children:"nicht"}),` sagt. Über die
Approximationsgüte fällt kein Wort: Alle Konkurrenten treffen die Daten exakt, sie
unterscheiden sich nur in der Zappeligkeit dazwischen. Wie weit ein Spline
von einer zugrunde liegenden Funktion abweicht, ist eine ganz andere Frage.
Sie ist der Gegenstand von `,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[`Jeder kubische Spline, der die Punkte interpoliert, minimiert das
Krümmungsfunktional `,e.jsx(n,{children:"J"}),"."]}),e.jsxs(i.p,{children:["Nur der ",e.jsx(i.em,{children:"natürliche"}),". Ohne ",e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),` bleibt im
Beweis der Randterm `,e.jsx(n,{children:"[\\cgreen{s''}\\,\\cred{h'}]_a^b"}),` stehen, und der kann
jedes Vorzeichen haben. Kubische Spline-Interpolanten zu denselben Daten gibt
es unendlich viele, weil zwei Randbedingungen frei sind; nur eine Wahl davon
löst das Minimierungsproblem. Die Parabel aus `,e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"}),` ist selbst so
ein Fall: Sie ist stückweise ein Polynom vom Grad höchstens `,e.jsx(n,{children:"3"}),` und beliebig
oft differenzierbar, also ein kubischer Spline-Interpolant, aber wegen
`,e.jsx(n,{children:"\\cred{p''(0)} = -2 \\neq 0"})," nicht der natürliche, und ihr ",e.jsx(n,{children:"J"})," ist um ",e.jsx(n,{children:"2"}),`
größer.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Beim Teleskopieren der Randterme darf ",e.jsx(n,{children:"\\cgreen{s^{(3)}}"}),` an den Knoten
springen.`]}),e.jsxs(i.p,{children:["Der Term ",e.jsx(n,{children:"\\cgreen{s^{(3)}}\\,\\cred{h}"}),` wird an jedem Knoten mit
`,e.jsx(n,{children:"\\cred{h(x_i)} = 0"}),` multipliziert und verschwindet dadurch von beiden Seiten,
egal wie der Sprung aussieht. Für den anderen Term
`,e.jsx(n,{children:"\\cgreen{s''}\\,\\cred{h'}"}),` gilt das nicht, dort braucht es die Stetigkeit von
`,e.jsx(n,{children:"\\cgreen{s''}"})," und ",e.jsx(n,{children:"\\cred{h'}"}),` und am Rand die natürlichen Bedingungen
(`,e.jsx(i.a,{href:"#env-was-die-randterme-wirklich-brauchen",children:"Bemerkung 13.5.5"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[`Der Beweis setzt voraus, dass auch die Vergleichsfunktion
`,e.jsx(n,{children:"\\cred{g''(a)} = \\cred{g''(b)} = 0"})," erfüllt."]}),e.jsxs(i.p,{children:[`Diese Forderung wird nirgends gebraucht. Sie wäre sogar schädlich: Sie
schlösse die meisten `,e.jsx(n,{children:"\\Ccal^2"}),`-Interpolanten aus, und gerade gegen die soll
der Spline gewinnen. Verwendet werden nur
`,e.jsx(n,{children:"\\cred{g} \\in \\Ccal^2"})," und ",e.jsx(n,{children:"\\cred{g(x_i)} = \\cblue{y_i}"}),"."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Überschuss ",e.jsx(n,{children:"J(\\cred{p}) - J(\\cgreen{s}) = 2"}),` im Beispiel ist genau
`,e.jsx(n,{children:"\\int_0^2 (\\cred{h''})^2 \\dx"})," mit ",e.jsx(n,{children:"\\cred{h} = \\cred{p} - \\cgreen{s}"}),"."]}),e.jsxs(i.p,{children:["Das ist Gleichung ",e.jsx(i.a,{href:"#eq-eq-13-5-3",children:"(13.5.3)"}),`, und im Beispiel rechnet es sich aus: Auf
`,e.jsx(n,{children:"[0,1]"})," ist ",e.jsx(n,{children:"\\cred{h''(x)} = -2 + 3x"})," mit ",e.jsx(n,{children:"\\int_0^1 (3x-2)^2 \\dx = 1"}),`, auf
`,e.jsx(n,{children:"[1,2]"})," aus Symmetriegründen ebenso, zusammen ",e.jsx(n,{children:"2 = 8 - 6"}),`. Der Kreuzterm aus
`,e.jsx(i.a,{href:"#eq-eq-13-5-2",children:"(13.5.2)"})," fällt weg, sonst stimmte die Rechnung nicht."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"J(\\cred{g}) = J(\\cgreen{s})"})," folgt stets ",e.jsx(n,{children:"\\cred{g} = \\cgreen{s}"}),`, auch
bei nur einer Stützstelle.`]}),e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"n = 1"}),` ist jede affine Funktion durch den einen Punkt ein Interpolant
mit `,e.jsx(n,{children:"J = 0"}),`, und Minimierer gibt es unendlich viele. Der Schluss von
`,e.jsx(n,{children:"\\cred{h''} \\equiv 0"})," auf ",e.jsx(n,{children:"\\cred{h} \\equiv 0"}),` braucht zwei verschiedene
Nullstellen von `,e.jsx(n,{children:"\\cred{h}"}),", also ",e.jsx(n,{children:"n \\ge 2"}),`. Die Kurzfassung „Gleichheit nur
für `,e.jsx(n,{children:"\\cred{h} \\equiv 0"}),'" verschweigt das.']})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath führt natürliche kubische Splines in Kapitel 7
(Interpolation), Abschnitt 7.4.2 ein und rechnet dort denselben
Drei-Punkte-Fall mit acht Bedingungen vor. Die Minimaleigenschaft selbst
steht als Satz 7.57 bei Deuflhard und Hohmann, Numerische Mathematik 1,
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`; dort findet sich auch die Rechtfertigung, warum man statt der
geometrischen Krümmung deren Näherung `,e.jsx(n,{children:"f''"})," integriert."]})})]})}function Ar(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(es,{...s})}):es(s)}const{gruen:ns,orange:xi,rot:Ve,violett:is,grau:ie,hellgrau:In}=U,mn=[3,5,9,17,33,65],Kr=5/384,On=40,vi=2/5,Dr=12*On*On,ss=8001,Bn=s=>Math.exp(-On*(s-vi)*(s-vi)),rs=s=>-2*On*(s-vi)*Bn(s);function Mr(s,i){const r=s.length-1,t=[];for(let c=0;c<r;c++)t.push(s[c+1]-s[c]);const d=r+1,l=new Array(d).fill(0),a=new Array(d).fill(0),h=new Array(d).fill(0),o=new Array(d).fill(0);for(let c=1;c<r;c++)l[c]=t[c-1],a[c]=2*(t[c-1]+t[c]),h[c]=t[c],o[c]=6*((i[c+1]-i[c])/t[c]-(i[c]-i[c-1])/t[c-1]);a[0]=2*t[0],h[0]=t[0],o[0]=6*((i[1]-i[0])/t[0]-rs(s[0])),l[r]=t[r-1],a[r]=2*t[r-1],o[r]=6*(rs(s[r])-(i[r]-i[r-1])/t[r-1]);const g=new Array(d),f=new Array(d);g[0]=h[0]/a[0],f[0]=o[0]/a[0];for(let c=1;c<d;c++){const z=a[c]-l[c]*g[c-1];g[c]=h[c]/z,f[c]=(o[c]-l[c]*f[c-1])/z}const k=new Array(d);k[d-1]=f[d-1];for(let c=d-2;c>=0;c--)k[c]=f[c]-g[c]*k[c+1];return{xs:s,ys:i,hs:t,M:k}}function yi(s,i){const{xs:r,ys:t,hs:d,M:l}=s,a=r.length-1;let h=0;if(i<=r[0])h=0;else if(i>=r[a])h=a-1;else{let k=0,c=a;for(;c-k>1;){const z=k+c>>1;i<r[z]?c=z:k=z}h=k}const o=d[h],g=r[h+1]-i,f=i-r[h];return l[h]*g*g*g/(6*o)+l[h+1]*f*f*f/(6*o)+(t[h]/o-l[h]*o/6)*g+(t[h+1]/o-l[h+1]*o/6)*f}function Fr(s){const i=s-1,r=[],t=[];for(let g=0;g<=i;g++){const f=g/i;r.push(f),t.push(Bn(f))}const d=Mr(r,t);let l=0,a=0,h=-1/0;for(let g=0;g<ss;g++){const f=g/(ss-1),k=yi(d,f);k>h&&(h=k);const c=Math.abs(Bn(f)-k);c>l&&(l=c,a=f)}const o=1/i;return{knoten:s,h:o,schranke:Kr*Math.pow(o,4)*Dr,fehler:l,argmax:a,hoehe:h,sp:d}}const Nr={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","-":"⁻"};function Ne(s,i=3){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}function Wn(s){return s.toFixed(5).replace(/0+$/,"").replace(/\.$/,"").replace(".",",")}function pe(s){if(Number.isNaN(s))return"–";if(!Number.isFinite(s))return"∞";if(s===0)return"0";const[i,r]=s.toExponential(2).split("e"),t=String(Number(r)).split("").map(d=>Nr[d]??d).join("");return`${i.replace(".",",")}·10${t}`}const ke=420,Qe=205,Xe=150,N={l:46,r:12,t:12,b:26};function qr(){const[s,i]=q.useState(1),r=q.useMemo(()=>mn.map(Fr),[]),t=r[s],d=s>0?r[s-1]:null,l=b=>N.l+b*(ke-N.l-N.r),a=t.knoten>33?1.5:t.knoten>17?2.2:3,h=b=>N.t+(1.1-b)/1.3*(Qe-N.t-N.b),o=(b,R)=>{let P="";for(let D=0;D<=1200;D++){const M=D/1200,v=b(M);Number.isFinite(v)&&(P+=`${D===0?"M":"L"}${l(M).toFixed(1)} ${R(v).toFixed(1)}`)}return P},g=t.fehler>0?t.fehler*1.25:1,f=b=>N.t+(g-b)/(2*g)*(Xe-N.t-N.b),k=300,c=190,z={l:44,r:12,t:12,b:30},_=r.flatMap(b=>[Math.log10(b.fehler),Math.log10(b.schranke)]),p=Math.floor(Math.min(..._))-.3,u=Math.ceil(Math.max(..._))+.3,j=b=>z.l+b/(mn.length-1)*(k-z.l-z.r),m=b=>z.t+(u-b)/(u-p)*(c-z.t-z.b),x=b=>b.map((R,P)=>`${P===0?"M":"L"}${j(P).toFixed(1)} ${m(Math.log10(R)).toFixed(1)}`).join(""),B=t.fehler/t.schranke,F=d?d.fehler/t.fehler:Number.NaN;let G;if(!d)G=`Das gröbste Gitter hat ${t.knoten} Knoten, also die Gitterweite h = ${Wn(t.h)}. ${ce("satz:approximationsfehler-kubischer-splines")} erlaubt damit einen Fehler von bis zu C·h⁴·M₄ = ${pe(t.schranke)}; gemessen haben wir ${pe(t.fehler)} an der Stelle x = ${Ne(t.argmax,4)}, also ${Ne(B*100,1)} % der Schranke. Mit nur drei Knoten geht die Spitze des Buckels komplett verloren: Der Spline kommt über ${Ne(t.hoehe,2)} nicht hinaus, während f auf 1 steigt. Schieben wir den Regler nach rechts, um die Gitterweite zu halbieren.`;else{const b=Math.abs(F-16)<=1.2?"Wir liegen schon dicht daran":F>16?"Auf diesem Gitter liegen wir darüber":"Auf diesem Gitter liegen wir darunter";G=`${t.knoten} Knoten, h = ${Wn(t.h)}: Der gemessene Fehler fällt von ${pe(d.fehler)} auf ${pe(t.fehler)}, also auf das ${Ne(1/F,4)}-fache. Das ist ein Faktor ${Ne(F,2)}. Der Exponent vier verspricht 2⁴ = 16: ${b}. Die Schranke selbst fällt exakt auf ein Sechzehntel, von ${pe(d.schranke)} auf ${pe(t.schranke)}; ausgeschöpft ist sie zu ${Ne(B*100,1)} %. Der größte Fehler sitzt jetzt bei x = ${Ne(t.argmax,4)}.`}return e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Wählen wir ein Gitter und vergleichen die beiden aufeinanderfolgenden Fehler."}),e.jsx(J,{label:"Knoten",min:0,max:mn.length-1,step:1,value:s,onChange:i,fmt:b=>`${mn[b]} (h = ${Wn(r[b].h)})`,accent:xi}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{children:[e.jsxs("svg",{width:ke,viewBox:`0 0 ${ke} ${Qe}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:N.l,y:N.t,width:ke-N.l-N.r,height:Qe-N.t-N.b,fill:"none",stroke:In,strokeWidth:.8}),Ln(0,1).map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:l(b),x2:l(b),y1:Qe-N.b,y2:Qe-N.b+3,stroke:ie}),e.jsx("text",{x:l(b),y:Qe-N.b+14,textAnchor:"middle",fontSize:9,fill:ie,children:Yn(b,.2)})]},`x${b}`)),[0,.5,1].map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:N.l-3,x2:N.l,y1:h(b),y2:h(b),stroke:ie}),e.jsx("text",{x:N.l-5,y:h(b)+3,textAnchor:"end",fontSize:9,fill:ie,children:Yn(b,.5)})]},`y${b}`)),e.jsx("line",{x1:N.l,x2:ke-N.r,y1:h(0),y2:h(0),stroke:ie,strokeWidth:1}),e.jsx("text",{x:ke-N.r-4,y:h(0)-5,textAnchor:"end",fontSize:10,fill:ie,children:"x"}),e.jsx("path",{d:o(Bn,h),fill:"none",stroke:is,strokeWidth:2.4}),e.jsx("path",{d:o(b=>yi(t.sp,b),h),fill:"none",stroke:ns,strokeWidth:1.6,strokeDasharray:"5 3"}),t.sp.xs.map((b,R)=>e.jsx("circle",{cx:l(b),cy:h(t.sp.ys[R]),r:a,fill:xi},b)),e.jsx("text",{x:N.l+4,y:N.t+11,fontSize:10,fill:is,children:"f"}),e.jsx("text",{x:N.l+16,y:N.t+11,fontSize:10,fill:ns,children:"s"})]}),e.jsxs("svg",{width:ke,viewBox:`0 0 ${ke} ${Xe}`,className:"mt-2 max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:N.l,y:N.t,width:ke-N.l-N.r,height:Xe-N.t-N.b,fill:"none",stroke:In,strokeWidth:.8}),Ln(0,1).map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:l(b),x2:l(b),y1:Xe-N.b,y2:Xe-N.b+3,stroke:ie}),e.jsx("text",{x:l(b),y:Xe-N.b+14,textAnchor:"middle",fontSize:9,fill:ie,children:Yn(b,.2)})]},`ex${b}`)),[-t.fehler,0,t.fehler].map((b,R)=>e.jsxs("g",{children:[e.jsx("line",{x1:N.l-3,x2:N.l,y1:f(b),y2:f(b),stroke:ie}),e.jsx("text",{x:N.l-5,y:f(b)+3,textAnchor:"end",fontSize:8,fill:ie,children:R===1?"0":(R===0?"−":"")+pe(t.fehler)})]},`ey${R}`)),e.jsx("line",{x1:N.l,x2:ke-N.r,y1:f(0),y2:f(0),stroke:ie,strokeWidth:1}),e.jsx("path",{d:o(b=>Bn(b)-yi(t.sp,b),f),fill:"none",stroke:Ve,strokeWidth:1.8}),t.sp.xs.map(b=>e.jsx("circle",{cx:l(b),cy:f(0),r:a*.75,fill:xi},`k${b}`)),e.jsx("text",{x:N.l+4,y:N.t+11,fontSize:10,fill:Ve,children:"f − s"})]})]}),e.jsxs("div",{className:"min-w-0 grow space-y-2",children:[e.jsxs("svg",{viewBox:`0 0 ${k} ${c}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:z.l,y:z.t,width:k-z.l-z.r,height:c-z.t-z.b,fill:"none",stroke:In,strokeWidth:.8}),Array.from({length:Math.floor(u)-Math.ceil(p)+1},(b,R)=>Math.ceil(p)+R).map(b=>e.jsxs("g",{children:[e.jsx("line",{x1:z.l-3,x2:k-z.r,y1:m(b),y2:m(b),stroke:In}),e.jsx("text",{x:z.l-5,y:m(b)+3,textAnchor:"end",fontSize:8,fill:ie,children:pe(Math.pow(10,b))})]},`l${b}`)),mn.map((b,R)=>e.jsx("text",{x:j(R),y:c-z.b+14,textAnchor:"middle",fontSize:9,fill:ie,children:b},`t${b}`)),e.jsx("text",{x:k/2,y:c-4,textAnchor:"middle",fontSize:9,fill:ie,children:"Knotenzahl"}),e.jsx("path",{d:x(r.map(b=>b.schranke)),fill:"none",stroke:Ve,strokeWidth:1.6,strokeDasharray:"5 3"}),e.jsx("path",{d:x(r.map(b=>b.fehler)),fill:"none",stroke:Ve,strokeWidth:2}),r.map((b,R)=>e.jsxs("g",{children:[e.jsx("circle",{cx:j(R),cy:m(Math.log10(b.schranke)),r:R===s?4:2.5,fill:"white",stroke:Ve,strokeWidth:1.6}),e.jsx("circle",{cx:j(R),cy:m(Math.log10(b.fehler)),r:R===s?4:2.5,fill:Ve})]},`p${b.knoten}`)),e.jsx("text",{x:z.l+6,y:z.t+11,fontSize:9,fill:Ve,children:"Schranke (gestrichelt), Fehler (voll)"})]}),e.jsx("div",{className:"overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsx("th",{className:"px-2 py-1",children:"Knoten"}),e.jsx("th",{className:"px-2 py-1",children:"h"}),e.jsx("th",{className:"px-2 py-1",children:"Schranke"}),e.jsx("th",{className:"px-2 py-1",children:"Fehler"}),e.jsx("th",{className:"px-2 py-1",children:"Faktor"})]})}),e.jsx("tbody",{children:r.map((b,R)=>e.jsxs("tr",{className:R===s?"font-semibold text-slate-900 dark:text-slate-100":"",children:[e.jsx("td",{className:"px-2 py-0.5",children:b.knoten}),e.jsx("td",{className:"px-2 py-0.5",children:Wn(b.h)}),e.jsx("td",{className:"px-2 py-0.5",children:pe(b.schranke)}),e.jsx("td",{className:"px-2 py-0.5",children:pe(b.fehler)}),e.jsx("td",{className:"px-2 py-0.5",children:R===0?"–":Ne(r[R-1].fehler/b.fehler,2)})]},b.knoten))})]})})]})]}),e.jsx(le,{kind:s===0?"neutral":"ok",children:G})]})}function ts(s){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Über Splines wissen wir bisher zweierlei. Sie setzen sich aus Polynomstücken
zusammen und sind darum billig zu rechnen
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`), und unter allen
Interpolanten mit stetiger zweiter Ableitung hat der natürliche kubische Spline
die kleinste Krümmung (`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),`). Dazu kam die Zusage, dass
ein hinreichend feines Knotengitter jede
`,e.jsx(S,{id:"continuity",children:"stetige Funktion"}),` beliebig genau einfängt. Diese Zusage
nennt kein Tempo. Sie sagt weder, wie viele Knoten wir brauchen, noch was wir
gewinnen, wenn wir die Zahl der Teilintervalle verdoppeln. Genau das holen wir
jetzt nach.`]}),`
`,e.jsx(i.h3,{children:"Gitterweite und Fehlerschranke"}),`
`,e.jsx(i.p,{children:"Zuerst brauchen wir ein Maß für die Feinheit des Gitters."}),`
`,e.jsxs(w,{kind:"Definition",label:"13.6.1 (Partition und Gitterweite)",id:"env-partition-und-gitterweite",children:[e.jsxs(i.p,{children:["Eine ",e.jsx(i.em,{children:"Partition"})," des Intervalls ",e.jsx(n,{children:"[a, b]"})," ist eine geordnete Folge von Stellen"]}),e.jsx(y,{children:"a = \\corange{x_0} < \\corange{x_1} < \\dots < \\corange{x_n} = b ."}),e.jsxs(i.p,{children:["Ihre ",e.jsx(i.em,{children:"Gitterweite"})," (mesh width) ist die Länge des größten Teilintervalls,"]}),e.jsx(y,{children:"\\corange{h} := \\max_{i = 1, \\dots, n} \\left| x_i - x_{i-1} \\right| ."})]}),`
`,e.jsxs(i.p,{children:[`Zwei Feinheiten stecken schon in dieser Definition. Das Gitter ist geordnet und
schöpft `,e.jsx(n,{children:"[a, b]"}),` aus, die beiden Randpunkte sind also selbst Knoten. Und
`,e.jsx(n,{children:"\\corange{h}"}),` ist ein Maximum, kein Mittelwert: Ein einziges breites
Teilintervall bestimmt die Gitterweite, wie fein die übrigen auch liegen mögen.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.6.2 (Approximationsfehler kubischer Splines)",id:"env-approximationsfehler-kubischer-splines",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"a = \\corange{x_0} < \\dots < \\corange{x_n} = b"}),` eine Partition mit
Gitterweite `,e.jsx(n,{children:"\\corange{h}"}),", und sei ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`. Dann gibt es einen
kubischen Spline `,e.jsx(n,{children:"\\cgreen{s}"}),` mit Knoten
`,e.jsx(n,{children:"\\corange{x_0}, \\dots, \\corange{x_n}"}),", der ",e.jsx(n,{children:"f"})," an allen Knoten interpoliert,"]}),e.jsx(y,{children:"\\cgreen{s(x_i)} = f(x_i) \\qquad \\text{für } i = 0, \\dots, n ,"}),e.jsx(i.p,{children:"und dessen Fehler die Schranke"}),e.jsx(T,{tag:"13.6.1",id:"eq-approximationsfehler-kubischer-splines",children:`\\max_{x \\in [a, b]} \\cred{\\left| f(x) - s(x) \\right|}
\\;\\le\\; C \\cdot \\corange{h}^4 \\cdot \\max_{x \\in [a, b]} \\left| f^{(4)}(x) \\right|`}),e.jsxs(i.p,{children:["erfüllt, mit einer kleinen Konstanten ",e.jsx(n,{children:"C"}),`. Für kubische Splines mit passenden
Randbedingungen gilt sie mit `,e.jsx(n,{children:"C = \\tfrac{5}{384}"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Voraussetzung ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),` verlangt vier stetige Ableitungen,
also eine `,e.jsx(S,{id:"smooth-function",children:"glatte Funktion"}),` im üblichen Sinn. Die rechte
Seite der Schranke hat drei Faktoren, und jeder erzählt etwas anderes.`]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.6.3 (Wie wir die Schranke lesen)",id:"env-wie-wir-die-schranke-lesen",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Die Gitterweite steht in der ",e.jsx(i.em,{children:"vierten"}),` Potenz. Halbieren wir
`,e.jsx(n,{children:"\\corange{h}"}),", so fällt die Schranke auf ",e.jsx(n,{children:"2^{-4} = \\tfrac{1}{16}"}),` ihres
Werts. Je enger das Gitter, desto besser die Approximation, und zwar sehr
viel besser.`]}),`
`,e.jsxs(i.li,{children:[`Der zweite Faktor gehört der Funktion, nicht dem Verfahren. Je kleiner
`,e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),", desto kleiner die Schranke; je glatter also ",e.jsx(n,{children:"f"}),`
ist, desto weniger Knoten kostet dieselbe Genauigkeit. Für ein
`,e.jsx(S,{id:"polynomial",children:"Polynom"})," vom Grad höchstens drei steht rechts sogar null."]}),`
`,e.jsxs(i.li,{children:["Beide Faktoren sind Maxima über das ",e.jsx(i.em,{children:"ganze"}),` Intervall. Rechnet man lokal,
so steht in der Abschätzung für ein Teilintervall dessen eigene Länge neben
dem dortigen Maximum von `,e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),`. Das ist der Grund, das
Gitter dort zu verdichten, wo `,e.jsx(n,{children:"f"}),` stark gekrümmt ist und schwingt, und es
dort auszudünnen, wo `,e.jsx(n,{children:"f"}),` fast gerade verläuft. Für den einfachsten Fall
führen wir diese lokale Rechnung gleich in `,e.jsx(i.a,{href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," vor."]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Wie ernst Punkt 3 gemeint ist, zeigt eine kleine Rechnung mit
`,e.jsx(n,{children:"f(x) = \\sin(2\\pi x)"})," auf ",e.jsx(n,{children:"[0, 1]"}),`. Legen wir zehn Knoten so, dass die linke
Hälfte des Intervalls ein einziges Teilstück bleibt und die rechte Hälfte in
acht gleiche Stücke zerfällt, dann ist `,e.jsx(n,{children:"\\corange{h} = 0{,}5"}),`, und der maximale
Fehler des natürlichen kubischen Splines beträgt `,e.jsx(n,{children:"0{,}479"}),`. Ein gleichmäßiges
Gitter mit `,e.jsx(i.em,{children:"neun"})," Knoten kommt auf ",e.jsx(n,{children:"0{,}00107"}),` und ist damit rund 450-mal
genauer. Ein Knoten mehr nützt nichts, solange eine Lücke bleibt.`]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.6.4 (Welcher Spline die Konstante trägt)",id:"env-welcher-spline-die-konstante-traegt",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` behauptet die Existenz eines kubischen Splines, nicht die Güte
eines beliebigen Randabschlusses. Das ist keine Spitzfindigkeit. Die scharfe
Konstante `,e.jsx(n,{children:"\\tfrac{5}{384}"})," gilt etwa für den ",e.jsx(i.em,{children:"vollständigen"}),` kubischen Spline,
der `,e.jsx(n,{children:"s'(a) = f'(a)"})," und ",e.jsx(n,{children:"s'(b) = f'(b)"}),` erfüllt, sowie für die passende
Randbedingung zweiter Ordnung `,e.jsx(n,{children:"s''(a)=f''(a)"})," und ",e.jsx(n,{children:"s''(b)=f''(b)"}),`. Der
`,e.jsx(i.em,{children:"natürliche"}),` Spline verlangt stattdessen
`,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),`; pauschal steht ihm die Konstante
deshalb nicht zu. Passen diese Randwerte nicht zu `,e.jsx(n,{children:"f''(a)"})," und ",e.jsx(n,{children:"f''(b)"}),`, so
ist der natürliche Spline am Rand schlechter,
und sein maximaler Fehler fällt global nur wie `,e.jsx(n,{children:"\\corange{h}^2"}),"."]}),e.jsxs(i.p,{children:["Zwei eigene Rechnungen zeigen das. Für ",e.jsx(n,{children:"f(x) = e^x"})," auf ",e.jsx(n,{children:"[0, 1]"}),` ist
`,e.jsx(n,{children:"f''(0) = 1 \\neq 0"}),`, und der maximale Fehler des natürlichen Splines sinkt beim
Halbieren von `,e.jsx(n,{children:"\\corange{h}"})," nur auf ein Viertel: ",e.jsx(n,{children:"2{,}08 \\cdot 10^{-3}"}),`,
`,e.jsx(n,{children:"5{,}21 \\cdot 10^{-4}"}),", ",e.jsx(n,{children:"1{,}30 \\cdot 10^{-4}"})," und ",e.jsx(n,{children:"3{,}26 \\cdot 10^{-5}"}),` für
`,e.jsx(n,{children:"n = 8, 16, 32, 64"}),`. Die Fehlerspitze rückt dabei immer näher an den rechten
Rand (`,e.jsx(n,{children:"x \\approx 0{,}95"}),", dann ",e.jsx(n,{children:"0{,}976"}),", ",e.jsx(n,{children:"0{,}988"})," und ",e.jsx(n,{children:"0{,}994"}),`), der Rest des
Intervalls ist längst genauer. Noch schärfer ist `,e.jsx(n,{children:"f(x) = x^3"}),`: Dort steht rechts
in `,e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," eine Null, denn ",e.jsx(n,{children:"f^{(4)} \\equiv 0"}),", und tatsächlich ist ",e.jsx(n,{children:"f"}),` selbst
ein kubischer Spline und interpoliert sich fehlerfrei. Der natürliche Spline auf
vier gleich langen Teilintervallen weicht dagegen um `,e.jsx(n,{children:"0{,}018"}),` ab, weil er
`,e.jsx(n,{children:"\\cgreen{s''(1)} = 0"})," erzwingt, während ",e.jsx(n,{children:"f''(1) = 6"})," ist."]}),e.jsxs(i.p,{children:[`Für das Beispiel unten schreiben wir deshalb gleich die Randableitungen vor,
`,e.jsx(n,{children:"\\cgreen{s'(0)} = f'(0)"})," und ",e.jsx(n,{children:"\\cgreen{s'(1)} = f'(1)"}),`; die Konstante
`,e.jsx(n,{children:"\\tfrac{5}{384}"}),` ist dort also ehrlich verdient. Wie viel daran hängt, zeigt
der Vergleich mit dem natürlichen Spline derselben Funktion. Auf groben Gittern
ist der Unterschied winzig, weil die Funktion dort an beiden Rändern fast flach
ausläuft: bei fünf Knoten messen wir `,e.jsx(n,{children:"0{,}341"})," statt ",e.jsx(n,{children:"0{,}324"}),`. Sobald das Gitter
fein wird, schlägt der Randfehler durch. Bei `,e.jsx(n,{children:"33"}),` Knoten sitzt der größte Fehler
des natürlichen Splines nicht mehr an der Spitze im Inneren, sondern bei
`,e.jsx(n,{children:"x \\approx 0{,}012"})," am linken Rand, und bei ",e.jsx(n,{children:"65"}),` Knoten ist er mit
`,e.jsx(n,{children:"1{,}84 \\cdot 10^{-5}"})," sogar ",e.jsx(i.em,{children:"größer"}),` als die Schranke
`,e.jsx(n,{children:"1{,}49 \\cdot 10^{-5}"})," aus ",e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),`. Ein
Widerspruch wäre das nur, wenn der Satz die Schranke für jeden Randabschluss
behauptete.`]})]}),`
`,e.jsx(i.h3,{children:"Woher der Exponent kommt"}),`
`,e.jsxs(i.p,{children:[`Warum vier? Der Exponent hängt am Grad der Polynomstücke, und der Zusammenhang
lässt sich am einfachsten Fall vollständig durchrechnen. Statt kubischer Stücke
nehmen wir dafür gerade Stücke, also den Streckenzug durch die Punkte
`,e.jsx(n,{children:"(\\corange{x_i}, f(\\corange{x_i}))"}),"."]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.6.5 (Fehler der stückweise linearen Interpolation)",id:"env-fehler-der-stueckweise-linearen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"f \\in \\Ccal^2[a, b]"})," und sei ",e.jsx(n,{children:"\\cgreen{p}"}),` der Streckenzug durch die Punkte
`,e.jsx(n,{children:"(\\corange{x_i}, f(\\corange{x_i}))"}),` zu einer Partition mit Gitterweite
`,e.jsx(n,{children:"\\corange{h}"}),". Dann gilt"]}),e.jsx(T,{tag:"13.6.2",id:"eq-fehler-der-stueckweise-linearen",children:`\\max_{x \\in [a, b]} \\cred{\\left| f(x) - p(x) \\right|}
\\;\\le\\; \\frac{\\corange{h}^2}{8} \\max_{x \\in [a, b]} \\left| f''(x) \\right| .`})]}),`
`,e.jsxs(Q,{title:"Wie die Schranke für Geradenstücke entsteht",children:[e.jsx(i.p,{children:`Der Beweis arbeitet auf einem einzelnen Teilintervall, schiebt eine
Hilfsfunktion mit drei Nullstellen dazwischen und wendet zweimal den Satz von
Rolle an. Die Bemerkung darunter zieht daraus das Muster, auf das es hier
ankommt.`}),e.jsxs(he,{children:[e.jsx(K,{why:e.jsxs(e.Fragment,{children:["An den Knoten selbst ist die Differenz null, dort ist nichts zu zeigen; jede Stelle aus ",e.jsx(n,{children:"[a, b]"})," liegt in einem solchen Teilintervall"]}),children:e.jsxs(i.p,{children:[`Wir arbeiten auf einem einzelnen Teilintervall
`,e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"})," der Länge ",e.jsx(n,{children:"h_i"})," und halten darin eine Stelle ",e.jsx(n,{children:"\\wt{x}"}),` mit
`,e.jsx(n,{children:"\\corange{x_{i-1}} < \\wt{x} < \\corange{x_i}"})," fest. Dort ist ",e.jsx(n,{children:"\\cgreen{p}"}),` die
Gerade durch die beiden Endpunkte.`]})}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Wegen ",e.jsx(n,{children:"\\corange{x_{i-1}} < \\wt{x} < \\corange{x_i}"})," ist ",e.jsx(n,{children:"w(\\wt{x}) \\neq 0"}),", also ist ",e.jsx(n,{children:"\\lambda = (f(\\wt{x}) - \\cgreen{p(\\wt{x})})/w(\\wt{x})"})," die einzige mögliche Wahl"]}),children:[e.jsxs(i.p,{children:["Wir setzen ",e.jsx(n,{children:"w(t) := (t - \\corange{x_{i-1}})(t - \\corange{x_i})"}),` und wählen
`,e.jsx(n,{children:"\\lambda \\in \\R"})," so, dass die Hilfsfunktion"]}),e.jsx(y,{children:"g(t) := f(t) - \\cgreen{p(t)} - \\lambda\\, w(t)"}),e.jsxs(i.p,{children:["auch in ",e.jsx(n,{children:"\\wt{x}"})," verschwindet."]})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["Satz von Rolle, der Spezialfall des ",e.jsx(S,{id:"mean-value-theorem",children:"Mittelwertsatzes"})," mit gleichen Funktionswerten an beiden Enden; ",e.jsx(n,{children:"g"})," ist zweimal stetig differenzierbar, weil ",e.jsx(n,{children:"f"})," es ist und ",e.jsx(n,{children:"\\cgreen{p}"}),", ",e.jsx(n,{children:"w"})," Polynome sind"]}),children:e.jsxs(i.p,{children:["Damit hat ",e.jsx(n,{children:"g"})," drei Nullstellen in ",e.jsx(n,{children:"[\\corange{x_{i-1}}, \\corange{x_i}]"}),`: die
beiden Knoten und `,e.jsx(n,{children:"\\wt{x}"}),`. Zwischen je zwei benachbarten Nullstellen liegt eine
Nullstelle von `,e.jsx(n,{children:"g'"}),", also hat ",e.jsx(n,{children:"g'"}),` zwei Nullstellen, und dasselbe Argument
liefert ein `,e.jsx(n,{children:"\\xi"})," im Inneren mit ",e.jsx(n,{children:"g''(\\xi) = 0"}),"."]})}),e.jsxs(K,{children:[e.jsxs(i.p,{children:["Auf dem Teilintervall ist ",e.jsx(n,{children:"\\cgreen{p}"})," linear, also ",e.jsx(n,{children:"\\cgreen{p''} \\equiv 0"}),`, und
`,e.jsx(n,{children:"w'' \\equiv 2"}),". Aus ",e.jsx(n,{children:"g''(\\xi) = 0"})," folgt daher"]}),e.jsx(y,{children:`f''(\\xi) - 2\\lambda = 0 ,
\\qquad \\text{also} \\qquad
\\lambda = \\tfrac{1}{2} f''(\\xi) .`})]}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Der Betrag des Produkts ist ",e.jsx(n,{children:"(\\wt{x} - \\corange{x_{i-1}})(\\corange{x_i} - \\wt{x})"}),"; zwei nichtnegative Zahlen mit fester Summe ",e.jsx(n,{children:"h_i"})," haben ihr größtes Produkt, wenn beide gleich ",e.jsx(n,{children:"h_i/2"})," sind, also ist er höchstens ",e.jsx(n,{children:"h_i^2/4"})]}),children:[e.jsxs(i.p,{children:["Setzen wir das in ",e.jsx(n,{children:"g(\\wt{x}) = 0"}),` ein, so steht die punktweise Darstellung des
Fehlers da:`]}),e.jsx(y,{children:`f(\\wt{x}) - \\cgreen{p(\\wt{x})}
= \\tfrac{1}{2} f''(\\xi)\\,
(\\wt{x} - \\corange{x_{i-1}})(\\wt{x} - \\corange{x_i}) .`})]}),e.jsx(K,{children:e.jsxs(i.p,{children:[`Auf dem Teilintervall gilt somit
`,e.jsx(n,{children:"\\cred{\\left| f - p \\right|} \\le \\tfrac{h_i^2}{8} \\max \\left| f'' \\right|"}),`, wobei
das Maximum nur über dieses Teilintervall läuft. Wegen `,e.jsx(n,{children:"h_i \\le \\corange{h}"}),` und
weil das Maximum über `,e.jsx(n,{children:"[a, b]"})," mindestens so groß ist, gilt ",e.jsx(i.a,{href:"#eq-fehler-der-stueckweise-linearen",children:"(13.6.2)"}),` auf jedem
Teilintervall und damit auf ganz `,e.jsx(n,{children:"[a, b]"}),"."]})})]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.6.6 (Das Muster hinter dem Exponenten)",id:"env-das-muster-hinter-dem-exponenten",children:[e.jsxs(i.p,{children:["Der Beweis zeigt, woher der Exponent kommt. Das Hilfsprodukt ",e.jsx(n,{children:"w"}),` hat einen
Faktor je Interpolationsbedingung im Teilintervall, jeder Faktor ist von der
Größenordnung `,e.jsx(n,{children:"\\corange{h}"}),`, und genauso oft wird differenziert. Bei
Geradenstücken sind es zwei Bedingungen, zwei Ableitungen und `,e.jsx(n,{children:"\\corange{h}^2"}),`.
Das Muster setzt sich fort: Bei Polynomstücken vom Grad `,e.jsx(n,{children:"q"}),` steht am Ende
`,e.jsx(n,{children:"\\corange{h}^{q+1}"})," neben der ",e.jsx(n,{children:"(q+1)"}),`-ten Ableitung, für kubische Stücke also
`,e.jsx(n,{children:"\\corange{h}^4"})," neben ",e.jsx(n,{children:"f^{(4)}"}),`. Wer den Restterm im
`,e.jsx(S,{id:"taylor-theorem",children:"Satz von Taylor"}),` kennt, erkennt die Bauart wieder: Dort
steht eine höhere Ableitung an einer Zwischenstelle mal eine Potenz des
Abstands, hier `,e.jsx(n,{children:"\\tfrac{1}{2} f''(\\xi)"})," mal ein Produkt von Abständen."]}),e.jsxs(i.p,{children:[`Für Splines ist der Beweis deutlich länger als der obige, weil die
Anschlussbedingungen die Teilintervalle koppeln: Der Spline auf einem Stück
hängt über das Gleichungssystem aus
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"})," an ",e.jsx(i.em,{children:"allen"}),` Daten, und
genau davon lebt ja seine Glattheit. Die Buchführung über die Ordnung bleibt
dieselbe.`]}),e.jsxs(i.p,{children:["Bemerkenswert ist dabei, was ",e.jsx(i.em,{children:"nicht"}),` gebraucht wird. Kein Schritt verlangt einen
wachsenden Polynomgrad. Wir verfeinern das Gitter und lassen den Grad bei drei,
und deshalb passiert hier nichts von dem, was die Polynominterpolation hohen
Grades ruiniert
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Ein numerisches Beispiel"}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.6.7 (Ein Buckel auf dem Einheitsintervall)",id:"env-buckel-auf-dem-einheitsintervall",children:[e.jsx(i.p,{children:"Wir nehmen einen schmalen Buckel,"}),e.jsx(y,{children:`f(x) = \\exp\\left(-\\alpha \\left(x - \\tfrac{2}{5}\\right)^2\\right)
\\quad \\text{mit } \\alpha = 40, \\qquad x \\in [0, 1] .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"t := x - \\tfrac{2}{5}"})," ist"]}),e.jsx(y,{children:`f^{(4)}(x) = \\left(12\\alpha^2 - 48\\alpha^3 t^2 + 16\\alpha^4 t^4\\right) f(x) ,
\\qquad
M_4 := \\max_{x \\in [0, 1]} \\left| f^{(4)}(x) \\right| = 12\\alpha^2 = 19200 ,`}),e.jsxs(i.p,{children:["und das Maximum sitzt in der Spitze ",e.jsx(n,{children:"t = 0"}),`. Dort, auf einem schmalen Streifen,
steckt fast der ganze Fehler; an beiden Rändern ist `,e.jsx(n,{children:"f"})," praktisch null."]}),e.jsxs(i.p,{children:["Auf gleichmäßigen Gittern mit ",e.jsx(n,{children:"n + 1"})," Knoten ist ",e.jsx(n,{children:"\\corange{h} = 1/n"}),`, und
`,e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," liefert die Schranke ",e.jsx(n,{children:"\\tfrac{5}{384} \\corange{h}^4 M_4"}),`. Die vierte
Spalte ist unsere eigene Rechnung: Wir bestimmen den vollständigen kubischen
Spline über das tridiagonale System seiner zweiten Ableitungen an den Knoten und
messen `,e.jsx(n,{children:"\\max \\cred{|f - s|}"})," auf einem feinen Raster."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Knoten ",e.jsx(n,{children:"n+1"})]}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Gitterweite ",e.jsx(n,{children:"h"})]}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Schranke ",e.jsx(n,{children:"C h^4 M_4"})]}),e.jsx(i.th,{style:{textAlign:"left"},children:"gemessener Fehler"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Faktor"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}25"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}977"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}324"})}),e.jsx(i.td,{style:{textAlign:"left"},children:"–"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0610"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0239"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"13{,}6"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"17"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0625"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}81 \\cdot 10^{-3}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}11 \\cdot 10^{-3}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"21{,}6"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"33"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}03125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}38 \\cdot 10^{-4}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5{,}16 \\cdot 10^{-5}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"21{,}4"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"65"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}015625"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}49 \\cdot 10^{-5}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}05 \\cdot 10^{-6}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"16{,}9"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"129"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0078125"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9{,}31 \\cdot 10^{-7}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}87 \\cdot 10^{-7}"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"16{,}3"})})]})]})]}),e.jsxs(i.p,{children:[`Zweierlei ist hier zu sehen. Erstens ist der Fehler auf groben Gittern mit
bloßem Auge zu erkennen: Bei fünf Knoten beträgt er `,e.jsx(n,{children:"0{,}324"}),`, also rund ein
Drittel der Buckelhöhe `,e.jsx(n,{children:"1"}),". Der Spline drückt die Spitze auf ",e.jsx(n,{children:"0{,}71"}),` herunter
und schwingt rechts davon bis auf `,e.jsx(n,{children:"-0{,}056"})," unter die Nulllinie."]}),e.jsxs(i.p,{children:["Zweitens stellt sich der Faktor ",e.jsx(n,{children:"16"}),` nicht sofort ein. Die Schranke fällt bei
jeder Halbierung exakt auf ein Sechzehntel, denn `,e.jsx(n,{children:"\\corange{h}^4"}),` tut genau das;
der gemessene Fehler springt dagegen erst auf `,e.jsx(n,{children:"13{,}6"}),", dann auf ",e.jsx(n,{children:"21{,}6"}),` und
`,e.jsx(n,{children:"21{,}4"})," und beruhigt sich ab ",e.jsx(n,{children:"65"})," Knoten bei ",e.jsx(n,{children:"16{,}9"})," und ",e.jsx(n,{children:"16{,}3"}),`. Der Grund
steht in `,e.jsx(i.a,{href:"#env-wie-wir-die-schranke-lesen",children:"Bemerkung 13.6.3"}),": ",e.jsx(n,{children:"M_4"}),` ist ein Maximum über das
`,e.jsx(i.em,{children:"ganze"})," Intervall, tatsächlich aber lebt ",e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),` fast nur auf
der Breite `,e.jsx(n,{children:"1/\\sqrt{\\alpha} \\approx 0{,}16"}),` um die Spitze. Solange
`,e.jsx(n,{children:"\\corange{h}"}),` von dieser Größenordnung ist, hängt der gemessene Fehler stark
davon ab, wie die Knoten gerade zur Spitze liegen, und die Ordnung `,e.jsx(n,{children:"4"}),` ist noch
nicht zu sehen. `,e.jsx(n,{children:"O(\\corange{h}^4)"})," ist eine Aussage für kleine ",e.jsx(n,{children:"\\corange{h}"}),`,
und „klein" heißt hier: klein gegen die Breite, auf der sich `,e.jsx(n,{children:"f^{(4)}"})," ändert."]})]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.6.8 (Schranke und Messung sind zweierlei)",id:"env-schranke-und-messung-sind-zweierlei",children:e.jsxs(i.p,{children:[`Die beiden Fehlerspalten in der Tabelle oben sehen ähnlich aus, sagen aber
Verschiedenes. Die Schranke gilt für `,e.jsx(i.em,{children:"jedes"})," ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),` und für
jede Partition; der
gemessene Fehler gehört zu genau einer Funktion auf genau einem Gitter. Aus dem
Faktor `,e.jsx(n,{children:"16"}),` wird deshalb keine Gleichung, sondern eine Aussage über die
Größenordnung, die wir in `,e.jsx(S,{id:"big-o-notation",children:"Landau-Notation"}),` als
`,e.jsx(n,{children:"\\cred{\\left\\| f - s \\right\\|_\\infty} = O(\\corange{h}^4)"}),` schreiben. Wir sagen
dazu, der Fehler sei `,e.jsx(i.em,{children:"von vierter Ordnung"})," in ",e.jsx(n,{children:"\\corange{h}"}),`; das ist dieselbe
Sprechweise wie bei der `,e.jsx(S,{id:"rate-of-convergence",children:"Konvergenzordnung"}),` iterativer
Verfahren, nur läuft hier kein Iterationszähler, sondern die Gitterweite gegen
null. Unsere Messung liegt in `,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),`
durchweg unter der Schranke — das Verhältnis von gemessenem Fehler zu Schranke
beträgt `,e.jsx(n,{children:"0{,}33"}),", ",e.jsx(n,{children:"0{,}39"}),", ",e.jsx(n,{children:"0{,}29"}),", ",e.jsx(n,{children:"0{,}22"})," und dann zweimal ",e.jsx(n,{children:"0{,}20"}),` —, aber
die Faktoren erreichen die `,e.jsx(n,{children:"16"}),` erst, wenn das Gitter fein genug ist. Wer eine
Rechnung „mit Faktor genau 16" erwartet, wird enttäuscht, ohne dass etwas
falsch wäre.`]})}),`
`,e.jsxs(re,{title:"Vom groben zum feinen Gitter",children:[e.jsxs(i.p,{children:["Das Widget rechnet den Buckel aus ",e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),`
noch einmal nach und beginnt schon bei drei Knoten. Im oberen Bild ist zu sehen,
wie der Spline die Spitze zunächst gar nicht findet: Mit drei Knoten bleibt er
bei `,e.jsx(n,{children:"0{,}67"})," hängen, mit fünf kommt er auf ",e.jsx(n,{children:"0{,}71"}),` und schwingt rechts der
Spitze unter null. Erst ab neun Knoten liegen Funktion und Interpolant nahezu
übereinander.`]}),e.jsxs(i.p,{children:[`Im unteren Bild verschwindet der Fehler an jedem Knoten und bildet dazwischen
Bäuche; sie sammeln sich um die Spitze, wo `,e.jsx(n,{children:"\\left| f^{(4)} \\right|"}),` groß ist.
Darunter legt eine halblogarithmische Tafel Messung und Schranke übereinander,
und die Tabelle listet dieselben Zahlen. Die Schranke fällt bei jeder
Halbierung von `,e.jsx(n,{children:"h"}),` exakt auf ein Sechzehntel; der gemessene Faktor schwankt auf
den groben Gittern kräftig und nähert sich der asymptotischen `,e.jsx(n,{children:"16"}),` erst am
rechten Ende.`]}),e.jsxs(i.p,{children:["Um welchen Faktor erwarten wir beim Halbieren von ",e.jsx(n,{children:"h"})," einen kleineren Fehler?"]}),e.jsx(Ue,{frage:"Schätzen wir den asymptotischen Faktor beim Halbieren von h.",loesung:16,toleranz:1,children:e.jsx(qr,{})})]}),`
`,e.jsx(i.h3,{children:"Was Splines stark macht"}),`
`,e.jsx(i.p,{children:`Damit ist der theoretische Werkzeugkasten für Splines beisammen, und er ist
bemerkenswert gut bestückt.`}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.6.9 (Vier Stärken auf einen Blick)",id:"env-vier-staerken-auf-einen-blick",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Effiziente Berechnung."}),` In der B-Spline-Basis führt die Interpolation auf
ein Gleichungssystem mit Bandstruktur
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`), und Bandstruktur
ist genau die Sorte Struktur, die den Aufwand drückt (`,e.jsx(i.a,{href:"?k=05-lgs#env-struktur-ausnutzen",children:"Bemerkung 5.3.10"}),` in
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),`). Der kubische Spline-Interpolant dieses
Abschnitts ist das kleinste Beispiel dafür: Seine zweiten Ableitungen an den
Knoten lösen ein `,e.jsx(i.em,{children:"tridiagonales"}),` System — bei natürlichem wie bei
eingespanntem Randabschluss —, und weil die Elimination dessen Band erhält,
kostet es `,e.jsx(n,{children:"O(n)"})," statt ",e.jsx(n,{children:"O(n^3)"}),` Operationen. Genau so rechnet das Widget
oben.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Stabilität und Lokalität."}),` B-Splines haben kompakten Träger, jede
Basisfunktion lebt also nur über wenigen Teilintervallen. Eine Änderung an
einem Datenpunkt wirkt lokal, und die Basis ist weit besser konditioniert als
die Monombasis (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`,
Kondition in `,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Minimale Krümmung."})," Unter allen Interpolanten aus ",e.jsx(n,{children:"\\Ccal^2"}),` macht der
natürliche kubische Spline `,e.jsx(n,{children:"\\int_a^b \\left| f''(x) \\right|^2 dx"}),` am
kleinsten (`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Approximationsfehler ",e.jsx(n,{children:"O(h^4)"})," bei passenden Randbedingungen."]}),` Das ist
`,e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),`: Verdoppeln wir auf einem gleichmäßigen Gitter die Zahl der
Teilintervalle, halbiert sich `,e.jsx(n,{children:"h"}),`, und die Schranke fällt um den Faktor
`,e.jsx(n,{children:"16"}),`, ohne dass wir den Polynomgrad anrühren. Für einen natürlichen Spline
ohne passende Randkrümmung gilt diese globale Ordnung im Allgemeinen nicht
(`,e.jsx(i.a,{href:"#env-welcher-spline-die-konstante-traegt",children:"Bemerkung 13.6.4"}),")."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Alle vier Punkte gelten für ",e.jsx(i.em,{children:"Interpolation"}),`, also für Daten ohne Rauschen. Genau
diese Voraussetzung fällt im nächsten Abschnitt weg. Sobald die `,e.jsx(n,{children:"y_i"}),` eine
Zufallskomponente tragen, ist es nicht mehr wünschenswert, sie exakt zu treffen,
und aus dem Interpolationsproblem wird ein Glättungsproblem
(`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),")."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Halbieren wir die Gitterweite, so fällt die Schranke aus ",e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` auf ein
Sechzehntel.`]}),e.jsxs(i.p,{children:["Die Schranke ist ",e.jsx(n,{children:"C \\corange{h}^4 M_4"}),", und nur ",e.jsx(n,{children:"\\corange{h}"}),` ändert sich. Aus
`,e.jsx(n,{children:"(\\corange{h}/2)^4 = \\corange{h}^4/16"}),` folgt der Faktor
`,e.jsx(n,{children:"\\tfrac{1}{16}"})," exakt. In ",e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"})," sind das die Werte ",e.jsx(n,{children:"0{,}977"}),`,
`,e.jsx(n,{children:"0{,}0610"}),", ",e.jsx(n,{children:"3{,}81 \\cdot 10^{-3}"}),", ",e.jsx(n,{children:"2{,}38 \\cdot 10^{-4}"})," und so fort."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Auch der tatsächliche Fehler wird bei jeder Halbierung von ",e.jsx(n,{children:"\\corange{h}"}),` genau
`,e.jsx(n,{children:"16"}),"-mal kleiner."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"}),` ist eine obere Schranke, keine Gleichung. Unsere eigenen Messungen am
Buckel aus `,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),` ergeben der Reihe nach die
Faktoren `,e.jsx(n,{children:"13{,}6"}),", ",e.jsx(n,{children:"21{,}6"}),", ",e.jsx(n,{children:"21{,}4"}),", ",e.jsx(n,{children:"16{,}9"})," und ",e.jsx(n,{children:"16{,}3"}),`: Erst wenn das
Gitter die Spitze auflöst, pendeln sie sich bei `,e.jsx(n,{children:"16"}),` ein, und getroffen wird die
Zahl auch dann nicht. Als Aussage über die Größenordnung bleibt die Faustregel
„Fehler wird `,e.jsx(n,{children:"2^4 = 16"}),'-mal kleiner" trotzdem richtig.']})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"f(x) = x^3"})," die Bedingung ",e.jsx(n,{children:"f^{(4)} \\equiv 0"}),` erfüllt, interpoliert der
natürliche kubische Spline diese Funktion fehlerfrei.`]}),e.jsxs(i.p,{children:["Fehlerfrei ist der Spline aus ",e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),", und das ist hier ",e.jsx(n,{children:"f"}),` selbst: Ein
kubisches Polynom `,e.jsx(i.em,{children:"ist"})," ein kubischer Spline. Der ",e.jsx(i.em,{children:"natürliche"}),` Spline erzwingt
zusätzlich `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),", während ",e.jsx(n,{children:"f''(1) = 6"}),` ist.
Auf vier gleich langen Teilintervallen von `,e.jsx(n,{children:"[0, 1]"}),` weicht er um
`,e.jsx(n,{children:"0{,}018"})," ab, obwohl die rechte Seite von ",e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," null ist. ",e.jsx(i.a,{href:"#env-welcher-spline-die-konstante-traegt",children:"Bemerkung 13.6.4"}),`
sagt, warum das kein Widerspruch ist.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`Ein einziges breites Teilintervall verdirbt die Schranke, auch wenn alle
übrigen Knoten dicht liegen.`}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\corange{h}"})," ist das Maximum der Teilintervall-Längen (",e.jsx(i.a,{href:"#env-partition-und-gitterweite",children:"Definition 13.6.1"}),`),
und die Schranke wächst mit seiner vierten Potenz. Unsere Rechnung zu
`,e.jsx(n,{children:"\\sin(2\\pi x)"}),` zeigt es auch am gemessenen Fehler: Zehn Knoten mit einer Lücke
der Breite `,e.jsx(n,{children:"0{,}5"})," liefern ",e.jsx(n,{children:"0{,}479"}),`, neun gleichmäßig verteilte Knoten dagegen
`,e.jsx(n,{children:"0{,}00107"}),"."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"})," gibt eine Fehlerschranke für jede stetige Funktion ",e.jsx(n,{children:"f"}),` auf
`,e.jsx(n,{children:"[a, b]"}),"."]}),e.jsxs(i.p,{children:["Der Satz verlangt ",e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`, denn auf der rechten Seite steht
`,e.jsx(n,{children:"\\max \\left| f^{(4)} \\right|"}),". Dass sich ",e.jsx(i.em,{children:"stetige"}),` Funktionen durch Splines
beliebig genau approximieren lassen, ist eine andere Aussage
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`); sie nennt keine
Geschwindigkeit. Wer weniger Glattheit mitbringt, bekommt eine schwächere
Ordnung: `,e.jsx(i.a,{href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," verlangt nur ",e.jsx(n,{children:"f \\in \\Ccal^2"}),` und liefert dafür auch nur
`,e.jsx(n,{children:"O(\\corange{h}^2)"}),"."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:[`Bei stückweise linearer Interpolation bringt eine Halbierung der Gitterweite
nur den Faktor `,e.jsx(n,{children:"4"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," gibt die Schranke ",e.jsx(n,{children:"\\corange{h}^2/8 \\cdot \\max \\left| f'' \\right|"}),`,
und `,e.jsx(n,{children:"\\corange{h}^2"})," viertelt sich beim Halbieren. Für ",e.jsx(n,{children:"\\sin(2\\pi x)"}),` messen wir
die Fehler `,e.jsx(n,{children:"0{,}211"}),", ",e.jsx(n,{children:"0{,}0704"}),", ",e.jsx(n,{children:"0{,}0188"})," und ",e.jsx(n,{children:"0{,}00479"}),` bei
`,e.jsx(n,{children:"n = 4, 8, 16, 32"}),", also die Faktoren ",e.jsx(n,{children:"2{,}99"}),", ",e.jsx(n,{children:"3{,}73"})," und ",e.jsx(n,{children:"3{,}93"}),`. Der
Gewinn pro Verfeinerung ist damit deutlich kleiner als beim kubischen Spline,
und das ist einer der Gründe, warum kubisch die übliche Wahl ist.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Heath entwickelt die stückweise Polynominterpolation und die
kubischen Splines in Kapitel 7. Die scharfe Konstante `,e.jsx(n,{children:"5/384"}),` für den
vollständigen kubischen Spline geht auf C. A. Hall und W. W. Meyer, Optimal
error bounds for cubic spline interpolation, Journal of Approximation Theory 16
(1976), 105–122, zurück.`]})})]})}function Gr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(ts,{...s})}):ts(s)}const{blau:Rr,gruen:ls,orange:bn,rot:Pr,violett:ds,grau:Ze,hellgrau:Er}=U,je=50,Ir=.3,Ke=2*Math.PI,Wr=15032026,an=3,$r=4,Vr=40,qe=2.6,Ai=s=>Math.sin(s)+.5*Math.sin(2*s);function Zr(){const s=bi(Wr),i=[];for(let l=0;l<je;l++)i.push(s()*Ke);i.sort((l,a)=>l-a);const r=[];for(;r.length<je;){const l=Math.max(s(),1e-12),a=s(),h=Ir*Math.sqrt(-2*Math.log(l));r.push(h*Math.cos(2*Math.PI*a)),r.length<je&&r.push(h*Math.sin(2*Math.PI*a))}const t=r.reduce((l,a)=>l+a,0)/je,d=Math.sqrt(r.reduce((l,a)=>l+(a-t)*(a-t),0)/(je-1));return{xs:i,ys:i.map((l,a)=>Ai(l)+r[a]),sdEps:d}}const Bs=Zr();function Tr(s,i){const r=(s.length-1)*i,t=Math.floor(r),d=Math.min(t+1,s.length-1);return s[t]+(r-t)*(s[d]-s[t])}function Lr(s,i){const r=s-an,t=[];for(let d=0;d<=an;d++)t.push(0);for(let d=1;d<=r-1;d++)t.push(Tr(i,d/r));for(let d=0;d<=an;d++)t.push(Ke);return t}function Hn(s,i,r){const t=s.length-1,d=s[0],l=s[t],a=Math.min(Math.max(r,d),l);let h=new Array(t).fill(0);for(let o=0;o<t;o++)s[o]<=a&&a<s[o+1]&&(h[o]=1);if(a>=l){for(let o=t-1;o>=0;o--)if(s[o]<s[o+1]){h[o]=1;break}}for(let o=1;o<=an;o++){const g=new Array(t-o).fill(0);for(let f=0;f<t-o;f++){let k=0;const c=s[f+o]-s[f];c>0&&(k+=(a-s[f])/c*h[f]);const z=s[f+o+1]-s[f+1];z>0&&(k+=(s[f+o+1]-a)/z*h[f+1]),g[f]=k}h=g}return h.slice(0,i)}function Cr(s){const{xs:i,ys:r}=Bs,t=Lr(s,i),d=Array.from({length:s},()=>new Array(s).fill(0)),l=new Array(s).fill(0);for(let j=0;j<je;j++){const m=Hn(t,s,i[j]);for(let x=0;x<s;x++)if(m[x]!==0){l[x]+=m[x]*r[j];for(let B=x;B<s;B++)d[x][B]+=m[x]*m[B]}}for(let j=0;j<s;j++)for(let m=0;m<j;m++)d[j][m]=d[m][j];const a=Array.from({length:s},()=>new Array(s).fill(0));for(let j=0;j<s;j++){let m=d[j][j];for(let x=0;x<j;x++)m-=a[j][x]*a[j][x];if(!(m>1e-12))return{K:s,t,a:null,rss:Number.NaN,sigmaHut:Number.NaN,rms:Number.NaN,maxAbw:Number.NaN,argMax:Number.NaN,minWert:Number.NaN,maxWert:Number.NaN};a[j][j]=Math.sqrt(m);for(let x=j+1;x<s;x++){let B=d[x][j];for(let F=0;F<j;F++)B-=a[x][F]*a[j][F];a[x][j]=B/a[j][j]}}const h=new Array(s).fill(0);for(let j=0;j<s;j++){let m=l[j];for(let x=0;x<j;x++)m-=a[j][x]*h[x];h[j]=m/a[j][j]}const o=new Array(s).fill(0);for(let j=s-1;j>=0;j--){let m=h[j];for(let x=j+1;x<s;x++)m-=a[x][j]*o[x];o[j]=m/a[j][j]}const g=j=>Hn(t,s,j).reduce((m,x,B)=>m+x*o[B],0);let f=0;for(let j=0;j<je;j++){const m=r[j]-g(i[j]);f+=m*m}const k=2e3;let c=0,z=0,_=0,p=1/0,u=-1/0;for(let j=0;j<=k;j++){const m=j/k*Ke,x=g(m),B=x-Ai(m);Math.abs(B)>z&&(z=Math.abs(B),_=m);const F=j===0||j===k?1:j%2===1?4:2;c+=F*B*B,p=Math.min(p,x),u=Math.max(u,x)}return c*=Ke/k/3/Ke,{K:s,t,a:o,rss:f,sigmaHut:je>s?Math.sqrt(f/(je-s)):Number.NaN,rms:Math.sqrt(c),maxAbw:z,argMax:_,minWert:p,maxWert:u}}function L(s,i=3){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}const Se=470,Ge=250,ui=110,W={l:40,r:12,t:12,b:26};function Or(){const[s,i]=q.useState(10),r=q.useMemo(()=>Cr(s),[s]),{xs:t,ys:d,sdEps:l}=Bs,a=p=>W.l+p/Ke*(Se-W.l-W.r),h=p=>W.t+(qe-p)/(2*qe)*(Ge-W.t-W.b),o=p=>4+(1.08-p)*(ui-4-18)/1.16,g=q.useMemo(()=>{if(!r.a)return null;const p=r.a;return u=>Hn(r.t,r.K,u).reduce((j,m,x)=>j+m*p[x],0)},[r]),f=q.useMemo(()=>{if(!g)return"";let p="",u=!1;for(let j=0;j<=2e3;j++){const m=j/2e3*Ke,x=g(m);if(!Number.isFinite(x)||x>qe||x<-qe){u=!1;continue}p+=`${u?"L":"M"}${a(m).toFixed(1)} ${h(x).toFixed(1)}`,u=!0}return p},[g]),k=q.useMemo(()=>{let p="";for(let u=0;u<=600;u++){const j=u/600*Ke;p+=`${u===0?"M":"L"}${a(j).toFixed(1)} ${h(Ai(j)).toFixed(1)}`}return p},[]),c=r.t.slice(an+1,r.t.length-an-1),z=!!r.a&&(r.maxWert>qe||r.minWert<-qe);let _;if(!r.a)_=`Bei K = ${s} ist BᵀB nicht mehr positiv definit: Die Basis ist auf diesen 50 Datenpunkten linear abhängig, die Normalengleichungen haben also keine eindeutige Lösung. Schieben wir den Regler zurück.`;else if(s<=5){const p=s===4?"ist genau der Raum der kubischen Polynome, innere Knoten gibt es keine":`lässt mit ${c.length} innerem Knoten kaum mehr zu`;_=`K = ${s} ${p}. Die Kurve ist zu starr für f und verfehlt die Extrema systematisch: im quadratischen Mittel um ${L(r.rms)}, an der schlimmsten Stelle x = ${L(r.argMax,2)} um ${L(r.maxAbw,2)}. Auch die Residuen sind entsprechend groß, RSS = ${L(r.rss,2)} und damit σ̂ = ${L(r.sigmaHut)} statt der wahren 0,3. Was hier übrig bleibt, ist kein Rauschen, sondern nicht erklärte Struktur.`}else z?_=`K = ${s} bei n = 50 Datenpunkten: Der Fit hat nur noch ${je-s} Freiheitsgrade übrig. Die Residuenquadratsumme ist mit ${L(r.rss,2)} klein, die geschätzte Kurve läuft aber bis ${L(r.maxWert,1)} nach oben und ${L(r.minWert,1)} nach unten und verlässt damit das Bild; wo sie draußen ist, bricht der grüne Zug ab. Vom wahren f ist sie im quadratischen Mittel ${L(r.rms)} entfernt, an der schlimmsten Stelle x = ${L(r.argMax,2)} um ${L(r.maxAbw,2)}. Das ist Überanpassung in Reinform: Die Kurve jagt einzelne Punkte, und zwischen zwei eng benachbarten x-Werten mit verschiedenem Rauschen muss sie steil werden.`:r.rms>.18?_=`K = ${s}: Zwischen den Datenpunkten schlägt die Kurve aus. Die Residuenquadratsumme ist auf ${L(r.rss,2)} gefallen, der Abstand zum wahren f dagegen auf ${L(r.rms)} gestiegen (größte Abweichung ${L(r.maxAbw,2)} bei x = ${L(r.argMax,2)}). Die Anpassung an die Daten wird also besser, die Schätzung von f schlechter. Nur den ersten der beiden Werte könnten wir an echten Daten überhaupt ausrechnen.`:_=`K = ${s} mit ${c.length} inneren Knoten: Die Kurve folgt f, ohne den einzelnen Punkten nachzulaufen. Der Abstand zum wahren f beträgt im quadratischen Mittel ${L(r.rms)}. Aus der Residuenquadratsumme ${L(r.rss,2)} auf ${je-s} Freiheitsgraden schätzen wir σ̂ = ${L(r.sigmaHut)}; die tatsächliche Streuung der gezogenen Fehler liegt bei ${L(l)}, das wahre σ bei 0,3. Der Fit erklärt also gerade so viel, wie sich erklären lässt.`;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Vergleichen wir die drei Fälle „zu starr“, „passend“ und „zu flexibel“."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:[{k:4,label:"zu starr"},{k:11,label:"passend"},{k:40,label:"zu flexibel"}].map(({k:p,label:u})=>e.jsx("button",{type:"button",onClick:()=>i(p),"aria-pressed":s===p,children:u},p))}),e.jsx(J,{label:"Basisfunktionen K",min:$r,max:Vr,step:1,value:s,onChange:i,fmt:p=>`${p} (${p-4} innere Knoten)`,accent:bn}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{children:[e.jsxs("svg",{width:Se,viewBox:`0 0 ${Se} ${Ge}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:W.l,y:W.t,width:Se-W.l-W.r,height:Ge-W.t-W.b,fill:"none",stroke:Er,strokeWidth:.8}),[0,1,2,3,4,5,6].map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:a(p),x2:a(p),y1:Ge-W.b,y2:Ge-W.b+3,stroke:Ze}),e.jsx("text",{x:a(p),y:Ge-W.b+14,textAnchor:"middle",fontSize:9,fill:Ze,children:p})]},`x${p}`)),[-2,-1,0,1,2].map(p=>e.jsxs("g",{children:[e.jsx("line",{x1:W.l-3,x2:W.l,y1:h(p),y2:h(p),stroke:Ze}),e.jsx("text",{x:W.l-5,y:h(p)+3,textAnchor:"end",fontSize:9,fill:Ze,children:String(p).replace("-","−")})]},`y${p}`)),e.jsx("line",{x1:W.l,x2:Se-W.r,y1:h(0),y2:h(0),stroke:Ze,strokeWidth:1}),e.jsx("text",{x:Se-W.r-4,y:h(0)-5,textAnchor:"end",fontSize:10,fill:Ze,children:"x"}),g&&t.map((p,u)=>{const j=g(p);if(!Number.isFinite(j))return null;const m=Math.min(Math.max(j,-qe),qe);return e.jsx("line",{x1:a(p),x2:a(p),y1:h(d[u]),y2:h(m),stroke:Pr,strokeWidth:1},`r${u}`)}),e.jsx("path",{d:k,fill:"none",stroke:ds,strokeWidth:2,strokeDasharray:"6 3"}),e.jsx("path",{d:f,fill:"none",stroke:ls,strokeWidth:2.2}),t.map((p,u)=>e.jsx("circle",{cx:a(p),cy:h(d[u]),r:2.6,fill:Rr},`d${u}`)),c.map((p,u)=>e.jsx("line",{x1:a(p),x2:a(p),y1:Ge-W.b,y2:Ge-W.b-7,stroke:bn,strokeWidth:1.6},`k${u}`)),e.jsx("text",{x:W.l+4,y:W.t+11,fontSize:10,fill:ds,children:"f"}),e.jsx("text",{x:W.l+14,y:W.t+11,fontSize:10,fill:ls,children:"f̂"})]}),e.jsxs("svg",{width:Se,viewBox:`0 0 ${Se} ${ui}`,className:"mt-2 max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("line",{x1:W.l,x2:Se-W.r,y1:o(0),y2:o(0),stroke:Ze,strokeWidth:1}),Array.from({length:s},(p,u)=>{let j="";for(let m=0;m<=300;m++){const x=m/300*Ke,B=Hn(r.t,s,x)[u];j+=`${m===0?"M":"L"}${a(x).toFixed(1)} ${o(B).toFixed(1)}`}return e.jsx("path",{d:j,fill:"none",stroke:bn,strokeWidth:1.1,opacity:.85},`b${u}`)}),c.map((p,u)=>e.jsx("line",{x1:a(p),x2:a(p),y1:o(0),y2:o(0)+6,stroke:bn,strokeWidth:1.6},`bk${u}`)),e.jsxs("text",{x:W.l+4,y:ui-3,fontSize:10,fill:bn,children:["die ",s," Basisfunktionen und ihre inneren Knoten"]})]})]}),e.jsxs("div",{className:"min-w-0 grow space-y-2",children:[e.jsx("div",{className:"overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsx("table",{className:"w-full text-right font-mono text-xs",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"Basisfunktionen K"}),e.jsx("td",{className:"px-2 py-1",children:s})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"innere Knoten"}),e.jsx("td",{className:"px-2 py-1",children:c.length})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"Freiheitsgrade n − K"}),e.jsx("td",{className:"px-2 py-1",children:je-s})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"RSS"}),e.jsx("td",{className:"px-2 py-1",children:L(r.rss,3)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"σ̂ = √(RSS/(n−K))"}),e.jsx("td",{className:"px-2 py-1",children:L(r.sigmaHut)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"‖f̂ − f‖ im Mittel"}),e.jsx("td",{className:"px-2 py-1",children:L(r.rms,4)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 text-left",children:"max |f̂ − f|"}),e.jsx("td",{className:"px-2 py-1",children:L(r.maxAbw,3)})]})]})})}),e.jsx("p",{className:"max-w-prose text-xs text-slate-600 dark:text-slate-400",children:"Die beiden unteren Zeilen sind an echten Daten nicht ausrechenbar: Sie brauchen f, und f ist gerade das Unbekannte. Ausrechenbar ist allein die RSS, und die zeigt in die falsche Richtung, sobald K groß wird. Der größte Abstand sitzt bei kleinem K meist an einem der beiden Ränder, wo die Schätzung die wenigsten Daten hinter sich hat: Der erste Datenpunkt liegt bei x = 0,05, der letzte bei x = 6,26."})]})]}),e.jsxs(le,{kind:s<7||s>15?"warn":"ok",children:[_," Damit wird der Zielkonflikt aus ",ce("sec:funktionsapproximation/glaettung")," sichtbar."]})]})}function as(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Bisher waren die Daten exakt. Ein Interpolant läuft durch jeden vorgegebenen
Punkt, und `,e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` sagt, wie weit er dazwischen danebenliegen kann. Messwerte
sind aber selten exakt. Ein Sensor rauscht, eine Stichprobe streut, eine
Befragung trifft nur zufällig ausgewählte Personen. Wer solche Werte
interpoliert, zwingt die Kurve durch jeden Messfehler hindurch.`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),` hat die beiden Aufgaben schon
nebeneinandergestellt: Interpolation trifft die Daten exakt, Glättung nur
ungefähr. In diesem Abschnitt rechnen wir die
zweite Aufgabe aus, und sie stellt sich als altbekanntes Problem heraus.`]}),`
`,e.jsx(i.h3,{children:"Das Modell"}),`
`,e.jsxs(w,{kind:"Definition",label:"13.7.1 (Regressionsmodell mit additivem Fehler)",id:"env-regressionsmodell-mit-additivem-fehler",children:[e.jsxs(i.p,{children:["An Stellen ",e.jsx(n,{children:"x_1, \\dots, x_n \\in [a, b]"})," beobachten wir"]}),e.jsx(T,{tag:"13.7.1",id:"eq-regressionsmodell-mit-additivem-fehler",children:"\\cblue{y_i} = f(x_i) + \\cred{\\eps_i}, \\qquad i = 1, \\dots, n,"}),e.jsxs(i.p,{children:["mit einer unbekannten Funktion ",e.jsx(n,{children:"f"}),` und Zufallsfehlern
`,e.jsx(n,{children:"\\cred{\\eps_1}, \\dots, \\cred{\\eps_n}"}),", die"]}),e.jsx(y,{children:"\\E\\left[\\cred{\\eps_i} \\mid x_i\\right] = 0"}),e.jsxs(i.p,{children:["erfüllen. Gesucht ist eine Schätzung ",e.jsx(n,{children:"\\cgreen{\\wh f}"})," von ",e.jsx(n,{children:"f"}),"."]})]}),`
`,e.jsxs(i.p,{children:[`Der Unterschied zur Interpolation steckt allein im roten Term. Ohne ihn wären
die `,e.jsx(n,{children:"\\cblue{y_i}"}),` Funktionswerte, und wir wären wieder in
`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),"."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.7.2 (Was in der Fehlerannahme steckt)",id:"env-was-in-der-fehlerannahme-steckt",children:[e.jsxs(i.p,{children:["Die Bedingung ",e.jsx(n,{children:"\\E[\\cred{\\eps_i} \\mid x_i] = 0"}),` sieht harmlos aus, trägt aber die
ganze Aufgabe.`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Sie sagt, dass die Beobachtungen an jeder Stelle ",e.jsx(i.em,{children:"um"})," ",e.jsx(n,{children:"f(x_i)"}),` herum streuen
und nicht systematisch daneben. Anders gesagt ist `,e.jsx(n,{children:"f(x)"}),` der
bedingte `,e.jsx(S,{id:"expected-value",children:"Erwartungswert"})," ",e.jsx(n,{children:"\\E[\\cblue{y} \\mid x]"}),`, und
`,e.jsx(n,{children:"\\cred{\\eps_i}"})," ist reine Streuung."]}),`
`,e.jsxs(i.li,{children:["Ohne sie wäre ",e.jsx(n,{children:"f"})," überhaupt nicht bestimmt. Zu jeder Funktion ",e.jsx(n,{children:"g"}),` und jeder
Konstanten `,e.jsx(n,{children:"c"})," liefert das Paar ",e.jsx(n,{children:"(g + c,\\ \\cred{\\eps} - c)"}),` dieselben
Beobachtungen wie `,e.jsx(n,{children:"(g, \\cred{\\eps})"}),`. Erst die Forderung, dass der Fehler im
Mittel verschwindet, macht aus `,e.jsx(i.a,{href:"#eq-regressionsmodell-mit-additivem-fehler",children:"(13.7.1)"})," eine Aussage über ",e.jsx(n,{children:"f"}),"."]}),`
`,e.jsxs(i.li,{children:["Über Abhängigkeit und Streuung der ",e.jsx(n,{children:"\\cred{\\eps_i}"}),` sagt die Annahme noch
nichts. Für die algebraische KQ-Herleitung dieses Abschnitts brauchen wir
beides nicht; Unkorreliertheit und die gemeinsame Varianz `,e.jsx(n,{children:"\\sigma^2"}),` kommen
erst ins Spiel, wenn wir den Fehler der Schätzung zerlegen
(`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),")."]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Wie messen wir, ob eine Kandidatin ",e.jsx(n,{children:"\\cgreen{\\wh f}"}),` zu den Daten passt? Mit
derselben Größe wie in Kapitel 7, der Summe der quadrierten Abweichungen:`]}),`
`,e.jsx(T,{tag:"13.7.2",id:"eq-eq-13-7-2",children:`\\operatorname{RSS}(\\cgreen{\\wh f})
:= \\sum_{i=1}^{n} \\left( \\cblue{y_i} - \\cgreen{\\wh f(x_i)} \\right)^2 .`}),`
`,e.jsxs(i.p,{children:["Die Abkürzung steht für ",e.jsx(i.em,{children:"residual sum of squares"}),`, die Residuenquadratsumme. Die
einzelnen Differenzen `,e.jsx(n,{children:"\\cred{r_i} = \\cblue{y_i} - \\cgreen{\\wh f(x_i)}"}),` heißen
`,e.jsx(i.em,{children:"Residuen"}),"."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.7.3 (Die Aufgabe ist so noch entartet)",id:"env-die-aufgabe-ist-so-noch-entartet",children:[e.jsxs(i.p,{children:["Suchten wir das Minimum von ",e.jsx(i.a,{href:"#eq-eq-13-7-2",children:"(13.7.2)"})," unter ",e.jsx(i.em,{children:"allen"}),` Funktionen, wäre die
Antwort langweilig und nutzlos: Das Minimum ist null, und angenommen wird es von
jedem Interpolanten der Daten. Davon gibt es unendlich viele
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`). Alle übernehmen an
den Datenstellen jedes `,e.jsx(n,{children:"\\cred{\\eps_i}"}),`; die Trainings-RSS kann dabei zwischen
einem brauchbaren und einem beliebig schlechten Verlauf zwischen den Punkten
nicht unterscheiden.`]}),e.jsx(i.p,{children:`Die Zielfunktion allein legt also nichts fest. Zwei Auswege gibt es, und beide
kommen in diesem Abschnitt vor:`}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Wir minimieren nur über einen ",e.jsx(i.em,{children:"kleinen"}),` Funktionenraum. Das ist der Weg der
nächsten Seiten.`]}),`
`,e.jsx(i.li,{children:`Wir minimieren über einen großen Raum, bestrafen aber unruhige Kandidaten.
Darauf kommen wir weiter unten zurück.`}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Der Basisansatz macht daraus ein KQ-Problem"}),`
`,e.jsxs(i.p,{children:[`Den ersten Weg kennen wir schon aus der Interpolation
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`): Wir legen endlich
viele Funktionen fest und lassen nur deren Linearkombinationen zu.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.7.4 (Ansatzraum und Designmatrix)",id:"env-ansatzraum-und-designmatrix",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),` fest gewählte Funktionen auf
`,e.jsx(n,{children:"[a, b]"}),", die ",e.jsx(i.em,{children:"Basisfunktionen"}),", und sei"]}),e.jsx(y,{children:`\\Fcal_K := \\left\\{ \\textstyle\\sum_{k=1}^{K} a_k \\corange{\\phi_k}
\\;:\\; a_1, \\dots, a_K \\in \\R \\right\\}`}),e.jsxs(i.p,{children:["der von ihnen aufgespannte Ansatzraum. Die ",e.jsx(i.em,{children:"Designmatrix"}),` zu den Stellen
`,e.jsx(n,{children:"x_1, \\dots, x_n"})," ist"]}),e.jsx(y,{children:`\\bB := \\begin{pmatrix}
\\corange{\\phi_1(x_1)} & \\cdots & \\corange{\\phi_K(x_1)} \\\\
\\vdots & \\ddots & \\vdots \\\\
\\corange{\\phi_1(x_n)} & \\cdots & \\corange{\\phi_K(x_n)}
\\end{pmatrix} \\in \\R^{n \\times K},
\\qquad b_{ik} = \\corange{\\phi_k(x_i)} .`}),e.jsxs(i.p,{children:["Ihre ",e.jsx(n,{children:"i"}),"-te Zeile sammelt die Werte aller Basisfunktionen an der ",e.jsx(n,{children:"i"}),`-ten
Beobachtungsstelle, ihre `,e.jsx(n,{children:"k"}),"-te Spalte die Werte der ",e.jsx(n,{children:"k"}),`-ten Basisfunktion an
allen Stellen.`]})]}),`
`,e.jsxs(i.p,{children:["Für Splines sind die ",e.jsx(n,{children:"\\corange{\\phi_k}"}),` die B-Splines zu einem gewählten
Knotenvektor `,e.jsx(n,{children:"\\corange{\\xi_1 < \\dots < \\xi_{m-1}}"}),`
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`). Wir halten die beiden
Rollen auseinander: `,e.jsx(n,{children:"x_i"})," sind die Stellen, an denen ",e.jsx(i.em,{children:"gemessen"}),` wurde,
`,e.jsx(n,{children:"\\corange{\\xi_j}"})," die Stellen, an denen die Polynomstücke ",e.jsx(i.em,{children:"zusammengesetzt"}),`
werden. Beide dürfen völlig verschieden liegen, und bei der Glättung tun sie das
auch.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.7.5 (Glättung ist ein lineares Kleinste-Quadrate-Problem)",id:"env-glaettung-ist-ein-lineares-kleinste",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cgreen{\\wh f} = \\sum_{k=1}^{K} a_k \\corange{\\phi_k} \\in \\Fcal_K"}),` mit
Koeffizientenvektor `,e.jsx(n,{children:"\\ba = (a_1, \\dots, a_K)^\\top"}),". Dann gilt"]}),e.jsx(T,{tag:"13.7.3",id:"eq-glaettung-ist-ein-lineares-kleinste",children:`\\sum_{i=1}^{n} \\left( \\cblue{y_i} - \\cgreen{\\wh f(x_i)} \\right)^2
= \\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2^2 ,
\\qquad \\cblue{\\by} = (\\cblue{y_1}, \\dots, \\cblue{y_n})^\\top ,`}),e.jsxs(i.p,{children:["und ",e.jsx(n,{children:"\\ba"}),` minimiert die linke Seite genau dann, wenn es die
`,e.jsx(S,{id:"normal-equations",children:"Normalengleichungen"})]}),e.jsx(T,{tag:"13.7.4",id:"eq-glaettung-ist-ein-lineares-kleinste-2",children:"\\bB^\\top \\bB\\, \\ba = \\bB^\\top \\cblue{\\by}"}),e.jsxs(i.p,{children:["erfüllt. Hat ",e.jsx(n,{children:"\\bB"})," vollen Spaltenrang ",e.jsx(n,{children:"K"}),`, so ist die Lösung eindeutig,
`,e.jsx(n,{children:"\\wh\\ba = (\\bB^\\top\\bB)^{-1}\\bB^\\top\\cblue{\\by}"}),`. Andernfalls ist die
Lösungsmenge ein affiner Raum, und `,e.jsx(n,{children:"\\wh\\ba = \\bB\\pinv \\cblue{\\by}"}),` ist ihr
Element kleinster Norm. Der Vektor der angepassten Werte `,e.jsx(n,{children:"\\bB\\wh\\ba"}),` ist in
beiden Fällen eindeutig.`]})]}),`
`,e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Die ",e.jsx(n,{children:"i"}),"-te Zeile von ",e.jsx(n,{children:"\\bB"})," enthält genau die Werte ",e.jsx(n,{children:"\\corange{\\phi_1(x_i)}, \\dots, \\corange{\\phi_K(x_i)}"}),", das Skalarprodukt mit ",e.jsx(n,{children:"\\ba"})," ist die Auswertung"]}),children:[e.jsxs(i.p,{children:["Nach Definition der Designmatrix ist der Wert von ",e.jsx(n,{children:"\\cgreen{\\wh f}"}),` an der Stelle
`,e.jsx(n,{children:"x_i"})," gerade die ",e.jsx(n,{children:"i"}),"-te Komponente von ",e.jsx(n,{children:"\\bB\\ba"}),":"]}),e.jsx(y,{children:`\\cgreen{\\wh f(x_i)} = \\sum_{k=1}^{K} a_k \\corange{\\phi_k(x_i)}
= \\sum_{k=1}^{K} b_{ik}\\, a_k = (\\bB\\ba)_i .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\left\\|\\bv\\right\\|_2^2 = \\sum_i v_i^2"})," mit ",e.jsx(n,{children:"v_i = \\cblue{y_i} - (\\bB\\ba)_i"})]}),children:e.jsxs(i.p,{children:[`Damit ist die Summe der quadrierten Residuen die quadrierte
`,e.jsx(S,{id:"euclidean-norm",children:"euklidische Norm"}),` des Vektors
`,e.jsx(n,{children:"\\cblue{\\by} - \\bB\\ba"}),", also ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste",children:"(13.7.3)"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["Die Zuordnung ",e.jsx(n,{children:"\\ba \\mapsto \\sum_k a_k \\corange{\\phi_k}"})," bildet ",e.jsx(n,{children:"\\R^K"})," auf ",e.jsx(n,{children:"\\Fcal_K"})," ab; ein Minimum der einen Aufgabe ist eines der anderen"]}),children:e.jsxs(i.p,{children:["Jedes Element von ",e.jsx(n,{children:"\\Fcal_K"}),` hat einen Koeffizientenvektor, und jeder
Koeffizientenvektor liefert ein Element von `,e.jsx(n,{children:"\\Fcal_K"}),`. Das Minimieren über
`,e.jsx(n,{children:"\\Fcal_K"})," ist deshalb dasselbe wie das Minimieren über ",e.jsx(n,{children:"\\ba \\in \\R^K"}),`, und das
ist wortwörtlich das
`,e.jsx(S,{id:"linear-least-squares",children:"lineare Kleinste-Quadrate-Problem"}),`
`,e.jsx(n,{children:"\\min_{\\ba} \\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2"}),` aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["Ausmultipliziert ist ",e.jsx(n,{children:"\\bB^\\top(\\cblue{\\by} - \\bB\\ba) = \\bnull"})," dasselbe wie ",e.jsx(n,{children:"\\bB^\\top\\bB\\ba = \\bB^\\top\\cblue{\\by}"})]}),children:e.jsxs(i.p,{children:["Die Minimierer von ",e.jsx(n,{children:"\\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2"}),` sind genau die
Lösungen der Normalengleichungen `,e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),`. Das ist die
`,e.jsx(S,{id:"projection",children:"Projektions"}),`-Eigenschaft aus
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),": Der Abstand wird minimal, wenn ",e.jsx(n,{children:"\\bB\\ba"}),` die
orthogonale Projektion von `,e.jsx(n,{children:"\\cblue{\\by}"})," auf den Spaltenraum von ",e.jsx(n,{children:"\\bB"}),` ist, und
das heißt, dass das Residuum auf allen Spalten senkrecht steht,
`,e.jsx(n,{children:"\\bB^\\top(\\cblue{\\by} - \\bB\\ba) = \\bnull"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\ba^\\top\\bB^\\top\\bB\\ba = \\left\\|\\bB\\ba\\right\\|_2^2 > 0"})," für ",e.jsx(n,{children:"\\ba \\neq \\bnull"})," gilt genau bei vollem Spaltenrang"]}),children:e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\rang(\\bB) = K"}),", so ist ",e.jsx(n,{children:"\\bB^\\top\\bB"}),` symmetrisch positiv definit und damit
invertierbar (`,e.jsx(i.a,{href:"?k=07-kq#sec-7.3",children:"Abschnitt 7.3"}),"), die Lösung von ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),` also
eindeutig. Ist `,e.jsx(n,{children:"\\rang(\\bB) < K"}),`, so unterscheiden sich je zwei Lösungen um ein
Element des Kerns von `,e.jsx(n,{children:"\\bB"}),`; unter ihnen wählt die
`,e.jsx(S,{id:"pseudoinverse",children:"Pseudoinverse"}),` die mit der kleinsten Norm
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),")."]})}),e.jsx(K,{children:e.jsxs(i.p,{children:["Die angepassten Werte sind die orthogonale Projektion von ",e.jsx(n,{children:"\\cblue{\\by}"}),` auf den
Spaltenraum, und eine Projektion hängt nur vom Unterraum ab, nicht von der
gewählten Darstellung. Sie ist deshalb auch bei Rangdefekt eindeutig.`]})})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.7.6 (Wie wir das System wirklich lösen)",id:"env-wie-wir-das-system-wirklich-loesen",children:[e.jsxs(i.p,{children:[`Die Normalengleichungen sind die kürzeste Herleitung, aber nicht der beste
Rechenweg. Sie quadrieren die Konditionszahl,
`,e.jsx(n,{children:"\\kappa_2(\\bB^\\top\\bB) = \\kappa_2(\\bB)^2"}),`, weshalb Kapitel 7 die QR-Zerlegung
vorzieht (`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`, Vergleich der Verfahren in
`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),`). Der R-Code am Ende dieses Abschnitts nutzt
darum `,e.jsx(i.code,{children:"qr.solve"}),"."]}),e.jsxs(i.p,{children:[`Für B-Splines ist der Schaden allerdings begrenzt, denn sie sind gut
konditioniert. Für den Datensatz unseres Widgets messen wir
`,e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 5{,}6"})," bei ",e.jsx(n,{children:"K = 10"})," und ",e.jsx(n,{children:"\\kappa_2(\\bB) \\approx 65"}),` bei
`,e.jsx(n,{children:"K = 40"}),`. Die Monombasis derselben Größenordnung liegt viele Zehnerpotenzen
darüber (`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`). Dazu kommt
die Bandstruktur: Jede Basisfunktion lebt nur über wenigen Teilintervallen, also
ist `,e.jsx(n,{children:"\\bB^\\top\\bB"}),` dünn besetzt und die Zerlegung billig
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),")."]})]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.7.7 (Wann die Designmatrix vollen Spaltenrang hat)",id:"env-wann-die-designmatrix-vollen-spaltenrang",children:e.jsxs(i.p,{children:["Vollen Spaltenrang bekommen wir nicht geschenkt. Notwendig ist ",e.jsx(n,{children:"K \\le n"}),`, aber
das reicht nicht: Die Basisfunktionen müssen auch `,e.jsx(i.em,{children:"auf den Daten"}),` linear
unabhängig sein, und dafür müssen die Knoten zu den Messstellen passen.
Anschaulich muss jede Basisfunktion einen eigenen, passend geordneten
Datenpunkt belegen können; der zuständige Satz von Schoenberg und Whitney
macht daraus eine Indexbedingung. Mit Knoten auf den Quantilen der `,e.jsx(n,{children:"x_i"}),` hält
sie bis `,e.jsx(n,{children:"K = n"}),`, und deshalb legt das Widget seine Knoten auf Quantile, wie es
auch `,e.jsx(i.code,{children:"splines::bs()"})," tut."]})}),`
`,e.jsxs(Q,{title:"Die Schoenberg-Whitney-Bedingung im Detail",children:[e.jsxs(i.p,{children:["Für B-Splines vom Grad ",e.jsx(n,{children:"q"})," mit erweitertem Knotenvektor ",e.jsx(n,{children:"\\corange{\\tau}"}),`
lautet die Bedingung: Es müssen sich
Indizes `,e.jsx(n,{children:"i_1 < \\dots < i_K"}),` finden, sodass die jeweils zugeordnete
Basisfunktion am eigenen Datenpunkt positiv ist,`]}),e.jsx(y,{children:"\\corange{B_k^{(q)}(x_{i_k})} > 0, \\qquad k=1,\\dots,K."}),e.jsxs(i.p,{children:[`Im Inneren des Knotengebiets ist das gleichbedeutend mit
`,e.jsx(n,{children:"\\corange{\\tau_k} < x_{i_k} < \\corange{\\tau_{k+q+1}}"}),`. Bei einem offenen,
an den Rändern geklemmten Knotenvektor gehören die positiven Randwerte der
ersten und letzten Basisfunktion ausdrücklich dazu. Anschaulich muss jede
Basisfunktion also einen eigenen, passend geordneten Datenpunkt belegen
können.`]}),e.jsxs(i.p,{children:[`Die naheliegende Abschwächung „jede Basisfunktion sieht mindestens einen
Datenpunkt" genügt dafür nicht. Unsere eigene Rechnung mit den `,e.jsx(n,{children:"50"}),` Punkten des
Widgets, aber `,e.jsx(i.em,{children:"gleichmäßigen"})," Knoten auf ",e.jsx(n,{children:"[0, 2\\pi]"}),", zeigt es: Bei ",e.jsx(n,{children:"K = 35"}),` hat
jede der `,e.jsx(n,{children:"35"}),` Basisfunktionen mindestens einen Datenpunkt im Träger, und
trotzdem bricht die Cholesky-Zerlegung von `,e.jsx(n,{children:"\\bB^\\top\\bB"}),` ab, weil sieben der
`,e.jsx(n,{children:"32"})," Knotenintervalle leer bleiben und die Bedingung damit verletzt ist."]})]}),`
`,e.jsx(i.h3,{children:"Interpolation und Glättung sind derselbe Rahmen"}),`
`,e.jsxs(i.p,{children:["Der Rahmen aus ",e.jsx(i.a,{href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),` deckt beide Aufgaben ab. Unterschieden werden sie
allein durch die Größe des Ansatzraums.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.7.8 (Interpolation und Glättung im Basisansatz)",id:"env-interpolation-und-glaettung-im",children:[e.jsxs(i.p,{children:["Eine Anpassung ",e.jsx(i.em,{children:"interpoliert"}),` die Daten, wenn ihre Residuen verschwinden,
also wenn`]}),e.jsx(y,{children:`\\bB\\wh\\ba = \\cblue{\\by}
\\qquad\\text{beziehungsweise}\\qquad
\\cgreen{\\wh f(x_i)}=\\cblue{y_i}\\quad\\text{für alle }i`}),e.jsxs(i.p,{children:["gilt. Bei einer ",e.jsx(i.em,{children:"Glättung"}),` dürfen Residuen verbleiben, damit die Schätzung
nicht jede beobachtete Schwankung übernehmen muss.`]}),e.jsxs(i.p,{children:["Für eine unbestrafte Anpassung sind ",e.jsx(n,{children:"K=n"})," und invertierbares ",e.jsx(n,{children:"\\bB"}),` der
klassische Interpolationsfall. Ein vollrangiger Ansatz mit `,e.jsx(n,{children:"K<n"}),` ist das
klassische Regressions- oder Glättungsregime: Er kann nicht jeden beliebigen
Datenvektor interpolieren. Die Zahlen `,e.jsx(n,{children:"K"})," und ",e.jsx(n,{children:"n"}),` allein definieren die beiden
Begriffe jedoch nicht; entscheidend sind Rang, konkrete rechte Seite und ein
möglicher Strafterm.`]})]}),`
`,e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"K = n"})," ist ",e.jsx(n,{children:"\\bB"}),` quadratisch. Ist sie zusätzlich invertierbar, so hat
`,e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"})," die Lösung ",e.jsx(n,{children:"\\wh\\ba = \\bB^{-1}\\cblue{\\by}"}),`, das Residuum ist der
Nullvektor, und `,e.jsx(n,{children:"\\cgreen{\\wh f}"})," trifft jeden Datenpunkt exakt. Bei ",e.jsx(n,{children:"K < n"}),` ist
das System überbestimmt; genau dann bleibt ein Rest, wenn
`,e.jsx(n,{children:"\\cblue{\\by}\\notin\\operatorname{Bild}(\\bB)"})," gilt."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.7.9 (Warum Interpolation das Rauschen erbt)",id:"env-warum-interpolation-das-rauschen-erbt",children:[e.jsxs(i.p,{children:["Warum ist das exakte Treffen schlecht? Setzen wir ",e.jsx(i.a,{href:"#eq-regressionsmodell-mit-additivem-fehler",children:"(13.7.1)"}),` in die
Interpolationsbedingung ein:`]}),e.jsx(y,{children:`\\cgreen{\\wh f(x_i)} = \\cblue{y_i} = f(x_i) + \\cred{\\eps_i}
\\qquad\\implies\\qquad
\\cgreen{\\wh f(x_i)} - f(x_i) = \\cred{\\eps_i} .`}),e.jsxs(i.p,{children:[`An jeder Beobachtungsstelle ist der Schätzfehler exakt der Messfehler. Er wird
nicht kleiner, wenn wir mehr Daten erheben, denn jeder neue Punkt bringt seinen
eigenen Fehler mit, den der Interpolant pflichtschuldig übernimmt. Zwischen den
Punkten wird es eher schlimmer: Liegen zwei Stellen dicht beieinander und ziehen
ihre Fehler in verschiedene Richtungen, muss die Kurve dazwischen steil werden.
Modelliert eine Schätzung auf diese Weise den Zufallsanteil der Daten mit,
spricht die Statistik von `,e.jsx(S,{id:"overfitting",children:"Überanpassung"}),"."]}),e.jsxs(i.p,{children:["Bei vollem Spaltenrang und ",e.jsx(n,{children:"K < n"}),` ist ein exakter Fit nicht mehr für jeden
Datenvektor möglich; bei generischen verrauschten Daten bleibt ein Rest. Jeder
Koeffizient wird dann aus mehreren Beobachtungen bestimmt, und in dieser
Mittelung hebt sich ein Teil der Fehler auf. Ausnahmsweise kann auch ein
kleiner Raum exakt interpolieren, nämlich wenn `,e.jsx(n,{children:"\\cblue{\\by}"}),` zufällig in
`,e.jsx(n,{children:"\\operatorname{Bild}(\\bB)"}),` liegt. Der Preis des kleinen Ansatzraums steht auf
der anderen Seite: Er enthält `,e.jsx(n,{children:"f"}),` vielleicht gar nicht. Wie sich beides
gegeneinander verrechnet, ist das Thema von `,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),"."]})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.7.10 (Fünfzig verrauschte Punkte)",id:"env-fuenfzig-verrauschte-punkte",children:[e.jsxs(i.p,{children:["Wir ziehen einmal ",e.jsx(n,{children:"n = 50"})," Stellen gleichverteilt auf ",e.jsx(n,{children:"[0, 2\\pi]"}),", werten dort"]}),e.jsx(y,{children:"f(x) = \\sin(x) + \\tfrac12 \\sin(2x)"}),e.jsxs(i.p,{children:["aus und addieren normalverteilte Fehler mit ",e.jsx(n,{children:"\\sigma = 0{,}3"}),`. Die Ziehung hat
einen festen Startwert; die empirische Streuung der gezogenen Fehler beträgt
`,e.jsx(n,{children:"0{,}266"}),`. Auf diese Daten passen wir
kubische B-Splines mit `,e.jsx(n,{children:"K"}),` Basisfunktionen an, Knoten auf den Quantilen der
`,e.jsx(n,{children:"x_i"}),". Vier Werte von ",e.jsx(n,{children:"K"}),` im Vergleich, alle Zahlen von unserem Widget selbst
gerechnet:`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"K"})}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\operatorname{RSS}"})}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\wh\\sigma"})}),e.jsxs(i.th,{style:{textAlign:"left"},children:["Abstand zu ",e.jsx(n,{children:"f"})]}),e.jsx(i.th,{style:{textAlign:"left"},children:"größte Abweichung"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"4"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"6{,}421"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}374"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}247"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}467"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3{,}084"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}278"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}086"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}532"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"20"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}460"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}286"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}269"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2{,}223"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"40"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}557"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}236"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1{,}908"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"8{,}574"})})]})]})]}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\wh\\sigma = \\sqrt{\\operatorname{RSS}/(n-K)}"}),` der übliche
Residualstandardfehler. Als Schätzung von `,e.jsx(n,{children:"\\sigma"}),` ist er bei vollem Rang,
unkorrelierten homoskedastischen Fehlern und korrekt spezifiziertem
Mittelwertmodell gerechtfertigt; fehlt `,e.jsx(n,{children:"f"}),` im Ansatzraum, enthält er
zusätzlich Lack-of-fit.
„Abstand zu `,e.jsx(n,{children:"f"}),'" ist die Wurzel aus dem mittleren quadrierten Abstand']}),e.jsx(y,{children:"\\frac{1}{2\\pi}\\int_0^{2\\pi} \\left( \\cgreen{\\wh f(x)} - f(x) \\right)^2 \\dx ."}),e.jsxs(i.p,{children:[`Die beiden mittleren Spalten sind aus Daten ausrechenbar, die beiden rechten
nicht, denn sie brauchen `,e.jsx(n,{children:"f"}),". Und sie laufen auseinander: Von ",e.jsx(n,{children:"K = 10"}),` auf
`,e.jsx(n,{children:"K = 40"}),` fällt die Residuenquadratsumme auf weniger als ein Fünftel, während der
Abstand zur wahren Funktion auf das Zweiundzwanzigfache steigt. Am besten trifft
in unserem Lauf `,e.jsx(n,{children:"K = 11"})," mit einem Abstand von ",e.jsx(n,{children:"0{,}072"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Tabelle zeigt drei Regime. Bei ",e.jsx(n,{children:"K = 4"}),` ist der Ansatzraum gerade der
Raum der kubischen Polynome, und die Kurve ist zu starr, um beide Wellen
von `,e.jsx(n,{children:"f"})," mitzunehmen; zwischen ",e.jsx(n,{children:"K = 6"})," und ",e.jsx(n,{children:"K = 15"}),` liegt sie sauber im
Rauschband, und `,e.jsx(n,{children:"\\wh\\sigma"})," bewegt sich dort zwischen ",e.jsx(n,{children:"0{,}278"}),` und
`,e.jsx(n,{children:"0{,}306"}),", also dicht an der wahren Streuung ",e.jsx(n,{children:"0{,}3"}),"; ab ",e.jsx(n,{children:"K = 16"}),` beginnen die
Ausschläge, und der Abstand zu `,e.jsx(n,{children:"f"}),` wächst wieder, während die Residuen weiter
fallen.`]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.7.11 (Die Residuen fallen nicht immer)",id:"env-die-residuen-fallen-nicht-immer",children:e.jsxs(i.p,{children:[`Beim Blick auf die Tabelle liegt die Vermutung nahe, die Residuenquadratsumme
falle mit wachsendem `,e.jsx(n,{children:"K"})," immer. Für ",e.jsx(i.em,{children:"geschachtelte"}),` Räume stimmt das: Kommt eine
Basisfunktion hinzu und bleiben die alten erhalten, so ist der alte Minimierer
weiterhin zulässig, das Minimum kann also nur sinken. Legen wir die Knoten aber
auf Quantile, so wandern sie mit `,e.jsx(n,{children:"K"}),`, und die Räume sind nicht geschachtelt.
In unserem Lauf steigt die Residuenquadratsumme bei elf der `,e.jsx(n,{children:"36"}),` Schritte
von `,e.jsx(n,{children:"K"})," auf ",e.jsx(n,{children:"K+1"})," wieder an, etwa von ",e.jsx(n,{children:"K = 6"})," auf ",e.jsx(n,{children:"K = 7"}),"."]})}),`
`,e.jsxs(re,{title:"Ein Regler für die Flexibilität",children:[e.jsxs(i.p,{children:["Das Widget rechnet den Fit für jedes ",e.jsx(n,{children:"K"})," zwischen ",e.jsx(n,{children:"4"})," und ",e.jsx(n,{children:"40"}),` neu: Cox-de-Boor
für die Basis, Normalengleichungen mit Cholesky-Zerlegung für die Koeffizienten.
Im unteren Bild stehen die `,e.jsx(n,{children:"K"}),` Basisfunktionen selbst, sie werden mit wachsendem
`,e.jsx(n,{children:"K"})," schmaler und zahlreicher."]}),e.jsxs(i.p,{children:["Die drei Regime lassen sich am Regler abfahren. Ab ",e.jsx(n,{children:"K = 16"}),` beginnen die
Ausschläge, und von `,e.jsx(n,{children:"K = 30"}),` an verlässt die Kurve bei den meisten
Reglerstellungen das Bildfenster, ohne dass die Residuen davon noch viel
besser würden.`]}),e.jsx(i.p,{children:`Die rot gezeichneten Residuen zeigen dasselbe von der anderen Seite: Sie werden
im Mittel kürzer, während die grüne Kurve immer weniger mit der violetten zu tun
hat.`}),e.jsx(i.p,{children:"Welche der drei voreingestellten Knotenzahlen dürfte die unbekannte wahre Funktion am besten treffen?"}),e.jsx(Ue,{variante:"auswahl",frage:"Welcher der drei Fälle wirkt als Schätzer am plausibelsten?",loesung:"passend",optionen:[{id:"starr",text:"K = 4"},{id:"passend",text:"K = 11"},{id:"flexibel",text:"K = 40"}],children:e.jsx(Or,{})})]}),`
`,e.jsx(i.h3,{children:"Der zweite Weg: strafen statt weglassen"}),`
`,e.jsxs(i.p,{children:["Bei der Glättung über einen kleinen Ansatzraum steuert ",e.jsx(n,{children:"K"}),` die Glattheit in
groben Stufen, und wir müssen uns vorab auf Zahl und Lage der Knoten festlegen.
Der zweite Weg aus `,e.jsx(i.a,{href:"#env-die-aufgabe-ist-so-noch-entartet",children:"Bemerkung 13.7.3"}),` dreht das um: Wir lassen viele Knoten zu und
bestrafen dafür unruhige Lösungen.`]}),`
`,e.jsxs(Q,{title:"Glättungssplines und Penalized Splines im Detail",children:[e.jsxs(w,{kind:"Definition",label:"13.7.12 (Penalisiertes Kleinste-Quadrate-Kriterium)",id:"env-penalisiertes-kleinste-quadrate",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\lambda \\ge 0"})," heißt"]}),e.jsx(T,{tag:"13.7.5",id:"eq-penalisiertes-kleinste-quadrate",children:`\\sum_{i=1}^{n} \\left( \\cblue{y_i} - g(x_i) \\right)^2
\\;+\\; \\lambda \\int_a^b \\left| g''(x) \\right|^2 \\dx`}),e.jsxs(i.p,{children:["das ",e.jsx(i.em,{children:"penalisierte"}),` Kleinste-Quadrate-Kriterium, und ein Minimierer über
`,e.jsx(n,{children:"\\Ccal^2[a, b]"})," heißt ",e.jsx(i.em,{children:"Glättungsspline"}),` (smoothing spline). Der Parameter
`,e.jsx(n,{children:"\\lambda"})," heißt ",e.jsx(i.em,{children:"Glättungsparameter"}),"."]})]}),e.jsxs(i.p,{children:[`Der Strafterm ist keine neue Größe. Er ist das Krümmungsfunktional
`,e.jsx(n,{children:"J(g) = \\int_a^b |g''|^2 \\dx"})," aus ",e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),`, also dasselbe
Maß für Unruhe, das dort den natürlichen kubischen Spline ausgezeichnet hat.`]}),e.jsxs(w,{kind:"Bemerkung",label:"13.7.13 (Was der Strafterm bewirkt)",id:"env-was-der-strafterm-bewirkt",children:[e.jsx(i.p,{children:"Drei Beobachtungen ordnen das Kriterium ein."}),e.jsxs(i.ol,{children:[`
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
Krümmung, also den natürlichen kubischen Spline aus `,e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),`. Bei
wiederholten Stellen mit verschiedenen Beobachtungen kann es dagegen keinen
Interpolanten aller Einzelwerte geben. Für `,e.jsx(n,{children:"\\lambda \\to \\infty"}),` wird jede Kandidatin mit
`,e.jsx(n,{children:"J(g) > 0"})," unbezahlbar; übrig bleiben die Funktionen mit ",e.jsx(n,{children:"g'' \\equiv 0"}),`, also
die Geraden, und unter ihnen die
`,e.jsx(S,{id:"linear-regression",children:"Kleinste-Quadrate-Gerade"}),`. Der Glättungsparameter
fährt die Schätzung stufenlos zwischen Interpolation und einfacher linearer
Regression hin und her.`]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:["Gesteuert wird jetzt mit ",e.jsx(n,{children:"\\lambda"}),", nicht mit ",e.jsx(n,{children:"K"}),"."]}),` Statt einer ganzen Zahl
drehen wir an einer stetigen Größe, und die Knotenwahl fällt als Frage weg.
Bezahlt wird das mit einem Gleichungssystem der Größe `,e.jsx(n,{children:"n"})," statt ",e.jsx(n,{children:"K"}),"."]}),`
`]})]}),e.jsxs(w,{kind:"Bemerkung",label:"13.7.14 (Penalized Splines und die Nähe zu Ridge)",id:"env-penalized-splines-und-die-naehe-zu-ridge",children:[e.jsxs(i.p,{children:[`Zwischen beiden Wegen liegt der in der Praxis übliche Kompromiss: eine
großzügige, aber nicht datengroße Basis (`,e.jsx(n,{children:"K < n"}),") ",e.jsx(i.em,{children:"und"}),` ein Strafterm. Solche
`,e.jsx(i.em,{children:"Penalized Splines"}),` führen auf ein Kriterium, das sich vollständig in
Matrixform schreiben lässt. Mit
`,e.jsx(n,{children:"\\bP_{jk} := \\int_a^b \\corange{\\phi_j''(x)}\\,\\corange{\\phi_k''(x)} \\dx"}),` ist
`,e.jsx(n,{children:"\\int_a^b |\\cgreen{\\wh f''}|^2 \\dx = \\ba^\\top\\bP\\ba"}),", und ",e.jsx(i.a,{href:"#eq-penalisiertes-kleinste-quadrate",children:"(13.7.5)"})," wird zu"]}),e.jsx(y,{children:"\\left\\| \\cblue{\\by} - \\bB\\ba \\right\\|_2^2 + \\lambda\\, \\ba^\\top \\bP \\ba ."}),e.jsxs(i.p,{children:["Ableiten nach ",e.jsx(n,{children:"\\ba"})," und Nullsetzen liefert die gestraften Normalengleichungen"]}),e.jsx(y,{children:"\\left( \\bB^\\top\\bB + \\lambda \\bP \\right) \\ba = \\bB^\\top \\cblue{\\by} ."}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\bP = \\bI"}),` steht dort wortwörtlich die Ridge-Regression aus
`,e.jsx(i.a,{href:"?k=12-optim#sec-12.5",children:"Abschnitt 12.5"}),`, und der Rechentrick ist derselbe: Der
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
`,e.jsxs(i.p,{children:[`Die dritte Zeile ist die wichtigste und die am wenigsten offensichtliche. Wer
nur die vorliegenden `,e.jsx(n,{children:"n"}),` Punkte beschreiben will, fährt mit der Interpolation
nicht schlecht: Sie hat auf den Daten die kleinste Residuenquadratsumme, nämlich
null. Sobald wir aber an einer `,e.jsx(i.em,{children:"neuen"}),` Stelle vorhersagen wollen, zählt der
Abstand zu `,e.jsx(n,{children:"f"}),`, und der ist bei einer glatten Schätzung kleiner.
`,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"})," führt beide Größen nebeneinander vor."]}),`
`,e.jsx(i.h3,{children:"Beispiel: Glättung in R"}),`
`,e.jsxs(i.p,{children:[`Der ganze Abschnitt passt in acht Zeilen R, hier für den Datensatz aus
`,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`B <- splines::bs(x, df = 10, intercept = TRUE)   # n x 10 Designmatrix
a_hat <- qr.solve(B, y)                          # KQ-Loesung ueber QR

x_new <- seq(0, 2 * pi, length = 200)
B_new <- splines::bs(x_new,
                     knots = attr(B, "knots"),
                     Boundary.knots = attr(B, "Boundary.knots"),
                     intercept = TRUE)
f_hat <- B_new %*% a_hat
`})}),`
`,e.jsx(i.p,{children:"Drei Details lohnen den zweiten Blick."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"bs()"})," baut die B-Spline-Designmatrix ",e.jsx(n,{children:"\\bB"}),". Das Argument ",e.jsx(i.code,{children:"df = 10"}),` zusammen
mit `,e.jsx(i.code,{children:"intercept = TRUE"})," fordert ",e.jsx(n,{children:"K = 10"})," Spalten; bei Grad ",e.jsx(n,{children:"3"}),` bleiben dafür
`,e.jsx(n,{children:"10 - 3 - 1 = 6"})," innere Knoten, die die Funktion auf die Quantile der ",e.jsx(n,{children:"x_i"}),`
legt. Wir wählen also nicht die Knoten, sondern ihre Anzahl.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"qr.solve(B, y)"}),` löst das überbestimmte System über die QR-Zerlegung
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),`) und nicht über die Normalengleichungen.
Das ist der stabilere der beiden Wege (`,e.jsx(i.a,{href:"#env-wie-wir-das-system-wirklich-loesen",children:"Bemerkung 13.7.6"}),")."]}),`
`,e.jsxs(i.li,{children:["Für die Vorhersage an neuen Stellen braucht ",e.jsx(i.code,{children:"B_new"})," ",e.jsx(i.em,{children:"dieselbe"}),` Basis. Deshalb
werden Knoten und Randknoten von `,e.jsx(i.code,{children:"B"})," übernommen. Lässt man ",e.jsx(i.code,{children:"Boundary.knots"}),`
weg, so setzt `,e.jsx(i.code,{children:"bs()"})," sie auf den Wertebereich des ",e.jsx(i.em,{children:"neuen"})," Gitters: ",e.jsx(i.code,{children:"B_new"}),`
gehört dann zu einer anderen Basis als `,e.jsx(i.code,{children:"a_hat"}),`, und zwar lautlos
(`,e.jsx(i.a,{href:"#env-b-splines-in-r",children:"Bemerkung 13.4.12"}),"). Beide Argumente, ",e.jsx(i.code,{children:"knots"})," ",e.jsx(i.em,{children:"und"}),`
`,e.jsx(i.code,{children:"Boundary.knots"}),", gehören zusammen übergeben."]}),`
`]}),`
`,e.jsx(i.p,{children:`Ausgaben drucken wir hier keine ab. Wer sehen will, wie die Kurve auf einen
konkreten Datensatz reagiert, findet oben im Widget eine eigene Realisierung,
deren Zahlen wir selbst nachgerechnet haben.`}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Im Glättungs-Widget kann ",e.jsx(n,{children:"K=40"})," eine kleinere RSS und zugleich eine schlechtere Annäherung an die wahre Funktion liefern."]}),e.jsxs(i.p,{children:["Die RSS misst nur die Anpassung an die verrauschten Daten. Bei großem ",e.jsx(n,{children:"K"})," folgt der Fit einzelnen Störungen und überanpasst."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Minimieren wir ",e.jsx(n,{children:"\\sum_i (\\cblue{y_i} - \\cgreen{\\wh f(x_i)})^2"}),` über alle
Funktionen `,e.jsx(n,{children:"\\cgreen{\\wh f}"}),", so erhalten wir die bestmögliche Schätzung von ",e.jsx(n,{children:"f"}),"."]}),e.jsxs(i.p,{children:[`Das Minimum ist null und wird von jedem Interpolanten angenommen, und davon gibt
es unendlich viele (`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`).
Alle diese Funktionen übernehmen die Fehler `,e.jsx(n,{children:"\\cred{\\eps_i}"}),` punktweise
(`,e.jsx(i.a,{href:"#env-warum-interpolation-das-rauschen-erbt",children:"Bemerkung 13.7.9"}),`). Erst eine Einschränkung des Suchraums oder ein Strafterm
macht die Aufgabe sinnvoll.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"K = n"})," und hat ",e.jsx(n,{children:"\\bB"})," vollen Rang, so ist die Residuenquadratsumme null."]}),e.jsxs(i.p,{children:["Dann ist ",e.jsx(n,{children:"\\bB"})," quadratisch und invertierbar, ",e.jsx(i.a,{href:"#eq-glaettung-ist-ein-lineares-kleinste-2",children:"(13.7.4)"}),` hat die Lösung
`,e.jsx(n,{children:"\\wh\\ba = \\bB^{-1}\\cblue{\\by}"}),`, und der Fit trifft jeden Punkt exakt. Für den
Datensatz aus `,e.jsx(i.a,{href:"#env-fuenfzig-verrauschte-punkte",children:"Beispiel 13.7.10"})," rechnen wir mit ",e.jsx(n,{children:"K = n = 50"}),` eine
Residuenquadratsumme von `,e.jsx(n,{children:"10^{-16}"}),` nach. Ein guter Schätzer ist das nicht: Die
Koeffizienten erreichen dabei Beträge über `,e.jsx(n,{children:"3 \\cdot 10^4"}),`, und
`,e.jsx(n,{children:"\\kappa_2(\\bB)"})," steigt auf rund ",e.jsx(n,{children:"2 \\cdot 10^5"}),"."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit ",e.jsx(n,{children:"\\bB^\\top\\bB"}),` invertierbar ist, genügt es, dass jede Basisfunktion
mindestens einen Datenpunkt in ihrem Träger hat.`]}),e.jsxs(i.p,{children:["Gebraucht wird die Bedingung von Schoenberg und Whitney aus ",e.jsx(i.a,{href:"#env-wann-die-designmatrix-vollen-spaltenrang",children:"Bemerkung 13.7.7"}),`,
und die verlangt für jede Basisfunktion einen `,e.jsx(i.em,{children:"eigenen"}),` Datenpunkt in der
richtigen Reihenfolge. Unsere Gegenrechnung mit gleichmäßigen Knoten und
`,e.jsx(n,{children:"K = 35"})," auf ",e.jsx(n,{children:"50"}),` Punkten erfüllt die schwächere Forderung, und trotzdem bricht
die Cholesky-Zerlegung ab.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Auch bei Rangdefekt von ",e.jsx(n,{children:"\\bB"})," sind die angepassten Werte ",e.jsx(n,{children:"\\bB\\wh\\ba"}),` eindeutig
bestimmt.`]}),e.jsxs(i.p,{children:["Sie sind die orthogonale Projektion von ",e.jsx(n,{children:"\\cblue{\\by}"}),` auf den Spaltenraum von
`,e.jsx(n,{children:"\\bB"}),`, und die hängt nur vom Unterraum ab (letzter Beweisschritt zu
`,e.jsx(i.a,{href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),`). Nicht eindeutig sind dagegen die
Koeffizienten und mit ihnen die Funktion `,e.jsx(n,{children:"\\cgreen{\\wh f}"}),` selbst: Zwei Lösungen unterscheiden sich um ein
Element des Kerns von `,e.jsx(n,{children:"\\bB"}),`, und die zugehörige Funktion verschwindet nur an den
Datenstellen, nicht überall.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit wachsendem ",e.jsx(n,{children:"K"})," fällt die Residuenquadratsumme in jedem Schritt."]}),e.jsxs(i.p,{children:[`Für geschachtelte Ansatzräume stimmt es, denn der alte Minimierer bleibt
zulässig. Wandern die Knoten mit `,e.jsx(n,{children:"K"}),`, etwa weil sie auf Quantilen liegen, so
sind die Räume nicht geschachtelt: In unserem Lauf steigt die
Residuenquadratsumme bei elf von `,e.jsx(n,{children:"36"})," Schritten wieder an, von ",e.jsx(n,{children:"K = 6"}),` auf
`,e.jsx(n,{children:"K = 7"})," etwa von ",e.jsx(n,{children:"3{,}435"})," auf ",e.jsx(n,{children:"4{,}016"})," (",e.jsx(i.a,{href:"#env-die-residuen-fallen-nicht-immer",children:"Bemerkung 13.7.11"}),")."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\lambda \\to \\infty"}),` nähert sich der Glättungsspline der
Kleinste-Quadrate-Geraden.`]}),e.jsxs(i.p,{children:["Der Strafterm ",e.jsx(n,{children:"\\lambda \\int |g''|^2 \\dx"})," zwingt im Grenzwert ",e.jsx(n,{children:"g'' \\equiv 0"}),`,
also affines `,e.jsx(n,{children:"g"}),`. Unter den affinen Funktionen minimiert das Kriterium nur noch
die Residuenquadratsumme, und das ist die einfache lineare Regression.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Die Theorie der Glättungssplines samt Existenz- und
Eindeutigkeitssatz entwickeln P. J. Green und B. W. Silverman, Nonparametric
Regression and Generalized Linear Models, Chapman und Hall 1994, Kapitel 2; die
Penalized Splines und die additiven Modelle dahinter stehen bei S. N. Wood,
Generalized Additive Models: An Introduction with R, 2. Auflage 2017. Die
Rangbedingung aus `,e.jsx(i.a,{href:"#env-wann-die-designmatrix-vollen-spaltenrang",children:"Bemerkung 13.7.7"}),` geht auf I. J. Schoenberg und A. Whitney
(1953) zurück und wird bei C. de Boor, A Practical Guide to Splines, Springer
2001, bewiesen.`]})})]})}function Hr(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(as,{...s})}):as(s)}const{blau:Ur,gruen:Te,orange:hs,rot:$n,violett:cs,grau:Le,hellgrau:gi}=U,xe=Le,De=0,hn=2*Math.PI,ne=100,Un=.3,Ce=200,cn=3,zn=4,Tn=40,Jr=12,As=s=>Math.sin(3*s);function Ks(s){const i=s-cn-1,r=[];for(let t=0;t<=cn;t++)r.push(De);for(let t=1;t<=i;t++)r.push(De+t*(hn-De)/(i+1));for(let t=0;t<=cn;t++)r.push(hn);return r}function Ds(s,i,r){const t=s.length;let d=new Array(t-1).fill(0);for(let l=0;l<t-1;l++)s[l]<=r&&r<s[l+1]&&(d[l]=1);if(r>=s[t-1]){for(let l=t-2;l>=0;l--)if(s[l]<s[l+1]){d[l]=1;break}}for(let l=1;l<=cn;l++){const a=new Array(t-1-l).fill(0);for(let h=0;h<a.length;h++){let o=0;const g=s[h+l]-s[h];g>0&&(o+=(r-s[h])/g*d[h]);const f=s[h+l+1]-s[h+1];f>0&&(o+=(s[h+l+1]-r)/f*d[h+1]),a[h]=o}d=a}return d.slice(0,i)}function Qr(s,i){const r=Array.from({length:i},()=>new Float64Array(i));for(let t=0;t<i;t++)for(let d=0;d<=t;d++){let l=s[t][d];for(let a=0;a<d;a++)l-=r[t][a]*r[d][a];if(t===d){if(l<=0)return null;r[t][t]=Math.sqrt(l)}else r[t][d]=l/r[d][d]}return r}function Xr(s,i,r){const t=new Float64Array(i);for(let l=0;l<i;l++){let a=r[l];for(let h=0;h<l;h++)a-=s[l][h]*t[h];t[l]=a/s[l][l]}const d=new Float64Array(i);for(let l=i-1;l>=0;l--){let a=t[l];for(let h=l+1;h<i;h++)a-=s[h][l]*d[h];d[l]=a/s[l][l]}return d}function Yr(){const s=bi(20250813),i=Array.from({length:ne},()=>De+(hn-De)*s()).sort((g,f)=>g-f),r=i.map(As),t=bi(77002),d=[];for(let g=0;g<Ce;g++){const f=new Float64Array(ne);for(let k=0;k<ne;k+=2){const c=Math.max(t(),1e-12),z=t(),_=Math.sqrt(-2*Math.log(c));f[k]=_*Math.cos(2*Math.PI*z),k+1<ne&&(f[k+1]=_*Math.sin(2*Math.PI*z))}d.push(f)}const l=r.map((g,f)=>g+Un*d[0][f]),a=[];for(let g=zn;g<=Tn;g++){const f=Ks(g),k=i.map(G=>Ds(f,g,G)),c=Array.from({length:g},()=>new Float64Array(g));for(let G=0;G<ne;G++)for(let b=0;b<g;b++){const R=k[G][b];if(R!==0)for(let P=0;P<g;P++)c[b][P]+=R*k[G][P]}const z=Qr(c,g);if(!z)continue;const _=new Float64Array(ne),p=new Float64Array(ne),u=new Float64Array(ne),j=new Float64Array(g),m=[];for(let G=0;G<Ce;G++){const b=new Float64Array(g);for(let P=0;P<ne;P++){const D=r[P]+Un*d[G][P];for(let M=0;M<g;M++)b[M]+=k[P][M]*D}const R=Xr(z,g,b);for(let P=0;P<g;P++)j[P]+=R[P]/Ce;G<Jr&&m.push(R);for(let P=0;P<ne;P++){let D=0;for(let M=0;M<g;M++)D+=R[M]*k[P][M];_[P]+=D,p[P]+=D*D,u[P]+=(D-r[P])*(D-r[P])}}let x=0,B=0,F=0;for(let G=0;G<ne;G++){const b=_[G]/Ce;x+=(b-r[G])*(b-r[G])/ne,B+=(p[G]/Ce-b*b)/ne,F+=u[G]/Ce/ne}a.push({K:g,bias2:x,varianz:B,mse:F,knoten:f.slice(cn+1,f.length-cn-1),proben:m,mittel:j})}const h=a.reduce((g,f)=>f.mse<g.mse?f:g).K,o=a.reduce((g,f)=>Math.max(g,f.mse),0);return{xs:i,y0:l,laeufe:a,besteK:h,maxMse:o}}function Y(s,i=4){return Number.isNaN(s)?"–":Number.isFinite(s)?s.toFixed(i).replace(".",",").replace(/^-/,"−"):s>0?"∞":"−∞"}const Ye=430,we=225,E={l:34,r:10,t:10,b:26},os=300,xs=118,fn=300,en=186,O={l:46,r:10,t:10,b:30};function et(){const[s,i]=q.useState(12),r=q.useMemo(Yr,[]),t=r.laeufe.find(v=>v.K===s)??r.laeufe[0],d=q.useMemo(()=>{const v=Ks(t.K),I=241,oe=Array.from({length:I},(Kn,Xn)=>De+(hn-De)*Xn/(I-1)),Fs=oe.map(Kn=>Ds(v,t.K,Kn)),Ki=Kn=>Fs.map(Xn=>{let Di=0;for(let Dn=0;Dn<t.K;Dn++)Di+=Kn[Dn]*Xn[Dn];return Di});return{gx:oe,proben:t.proben.map(Ki),mittel:Ki(t.mittel)}},[t]),l=v=>E.l+(v-De)/(hn-De)*(Ye-E.l-E.r),a=v=>E.t+(2.2-v)/4.4*(we-E.t-E.b),h=v=>d.gx.map((I,oe)=>`${oe===0?"M":"L"}${l(I).toFixed(1)} ${a(v[oe]).toFixed(1)}`).join(""),o=r.laeufe.flatMap(v=>[Math.max(v.bias2,1e-6),Math.max(v.varianz,1e-6),Math.max(v.mse,1e-6)]),g=Math.floor(Math.log10(Math.min(...o))),f=Math.ceil(Math.log10(Math.max(...o))),k=v=>O.l+(v-zn)/(Tn-zn)*(fn-O.l-O.r),c=v=>O.t+(f-Math.log10(Math.max(v,1e-6)))/(f-g)*(en-O.t-O.b),z=v=>r.laeufe.map((I,oe)=>`${oe===0?"M":"L"}${k(I.K).toFixed(1)} ${c(v(I)).toFixed(1)}`).join(""),_=t.mse>0?t.bias2/t.mse:Number.NaN,p=t.mse>0?t.varianz/t.mse:Number.NaN,u=Un*Un*t.K/ne,j=r.laeufe.find(v=>v.K===r.besteK)??t,m=j.mse>0?t.mse/j.mse:Number.NaN,x=v=>Math.max(0,Math.min(1,v)),B=t.mse>0?t.mse:1,F=96,G=os-F-8,b=r.laeufe.filter(v=>v.mse<=1.1*j.mse).map(v=>v.K),R=b.every((v,I)=>I===0||v===b[I-1]+1),P=b.length===1?`K = ${b[0]}`:R?`K = ${b[0]} bis ${b[b.length-1]}`:`K = ${b.join(", ")}`,D=`Für die gemittelte Varianz sagt ${ce("satz:gemittelte-varianz-eines-linearen")} exakt σ²K/n = ${Y(u)} voraus; unsere ${Ce} Wiederholungen schätzen ${Y(t.varianz)}.`;let M;return m>1.1?t.K<r.besteK&&_>.5?M=`K = ${t.K}: Der Bias trägt ${Y(_*100,1)} % des MSE. Die zwölf Kurven links liegen dicht beieinander und weichen alle in dieselbe Richtung ab: Der Spline ist zu starr für f(x) = sin(3x). Das ist Unteranpassung. Der MSE ist das ${Y(m,1)}-fache des Minimums bei K = ${r.besteK}. ${D}`:t.K<r.besteK?M=`K = ${t.K}: Der Bias ist schon klein, aber noch nicht klein genug. Er trägt ${Y(_*100,1)} % des MSE, und der liegt beim ${Y(m,2)}-fachen des Minimums bei K = ${r.besteK}. Links vom Optimum spart jede zusätzliche Basisfunktion noch mehr an Bias, als sie an Varianz kostet. ${D}`:M=`K = ${t.K}: Die Varianz trägt ${Y(p*100,1)} % des MSE. Die zwölf Kurven links fächern auf, jede folgt ihrem eigenen Rauschen, während ihr Mittelwert weiter auf f liegt. ${m>=2?"Das ist deutliche Überanpassung":"Hier beginnt die Überanpassung"}: Der MSE ist das ${Y(m,1)}-fache des Minimums bei K = ${r.besteK}. ${D}`:M=`${t.K===r.besteK?`Bei K = ${t.K} ist der MSE unserer Simulation am kleinsten: ${Y(t.mse)}.`:`K = ${t.K} liegt im flachen Bereich um das Minimum: MSE ${Y(t.mse)}, das ${Y(m,2)}-fache des besten Werts bei K = ${r.besteK}.`} Vom MSE trägt der Bias hier nur noch ${Y(_*100,1)} %, die Varianz ${Y(p*100,1)} %. Das Optimum liegt also nicht dort, wo beide Anteile gleich groß sind, sondern dort, wo eine weitere Verfeinerung mehr Varianz kostet als sie an Bias spart.${t.K===r.besteK?` Das liegt hier zufällig nahe beim Ein-Neuntel-Verhältnis des Proxy-Modells aus ${ce("bemerkung:heuristisches-balance-modell-fuer-die")}; allgemein erzwingt die Theorie diesen Anteil nicht.`:""} Innerhalb von zehn Prozent gleichwertig sind ${P}. ${D}`,e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Schätzen wir erst die Knotenzahl mit kleinstem grauen MSE und prüfen sie dann."}),e.jsx(J,{label:"Basisfunktionen K",min:zn,max:Tn,step:1,value:s,onChange:i,accent:hs}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${Ye} ${we}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("clipPath",{id:"s154-clip",children:e.jsx("rect",{x:E.l,y:E.t,width:Ye-E.l-E.r,height:we-E.t-E.b})}),e.jsx("rect",{x:E.l,y:E.t,width:Ye-E.l-E.r,height:we-E.t-E.b,fill:"none",stroke:gi,strokeWidth:.8}),[{v:0,s:"0"},{v:Math.PI,s:"π"},{v:hn,s:"2π"}].map(v=>e.jsxs("g",{children:[e.jsx("line",{x1:l(v.v),x2:l(v.v),y1:we-E.b,y2:we-E.b+3,stroke:xe}),e.jsx("text",{x:l(v.v),y:we-E.b+14,textAnchor:"middle",fontSize:9,fill:xe,children:v.s})]},v.s)),[-2,-1,0,1,2].map(v=>e.jsxs("g",{children:[e.jsx("line",{x1:E.l-3,x2:E.l,y1:a(v),y2:a(v),stroke:xe}),e.jsx("text",{x:E.l-5,y:a(v)+3,textAnchor:"end",fontSize:9,fill:xe,children:String(v).replace("-","−")})]},`y${v}`)),e.jsx("line",{x1:E.l,x2:Ye-E.r,y1:a(0),y2:a(0),stroke:xe,strokeWidth:.8}),e.jsx("text",{x:Ye-E.r-4,y:we-E.b+14,textAnchor:"end",fontSize:9,fill:xe,children:"x"}),e.jsxs("g",{clipPath:"url(#s154-clip)",children:[r.xs.map((v,I)=>e.jsx("circle",{cx:l(v),cy:a(r.y0[I]),r:1.7,fill:Ur,opacity:.75},`d${I}`)),d.proben.map((v,I)=>e.jsx("path",{d:h(v),fill:"none",stroke:Te,strokeWidth:.9,opacity:.4},`p${I}`)),e.jsx("path",{d:h(d.mittel),fill:"none",stroke:Te,strokeWidth:2.4}),e.jsx("path",{d:d.gx.map((v,I)=>`${I===0?"M":"L"}${l(v).toFixed(1)} ${a(As(d.gx[I])).toFixed(1)}`).join(""),fill:"none",stroke:cs,strokeWidth:2,strokeDasharray:"6 3"})]}),t.knoten.map(v=>e.jsx("line",{x1:l(v),x2:l(v),y1:we-E.b-6,y2:we-E.b,stroke:hs,strokeWidth:1.6},`k${v}`)),e.jsx("text",{x:E.l+4,y:E.t+11,fontSize:10,fill:cs,children:"f"}),e.jsx("text",{x:E.l+16,y:E.t+11,fontSize:10,fill:Te,children:"Schätzer"})]}),e.jsxs("div",{className:"grow space-y-2",children:[e.jsxs("svg",{viewBox:`0 0 ${os} ${xs}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsxs("text",{x:8,y:16,fontSize:10,fill:xe,children:["Anteile am MSE bei K = ",t.K]}),e.jsxs("g",{children:[e.jsx("text",{x:F-6,y:42,textAnchor:"end",fontSize:10,fill:$n,children:"Bias²"}),e.jsx("rect",{x:F,y:32,width:G*x(t.bias2/B),height:13,fill:$n}),e.jsx("text",{x:F+4,y:42,fontSize:9,fill:Le,children:Y(t.bias2)})]}),e.jsxs("g",{children:[e.jsx("text",{x:F-6,y:68,textAnchor:"end",fontSize:10,fill:Te,children:"Varianz"}),e.jsx("rect",{x:F,y:58,width:G*x(t.varianz/B),height:13,fill:Te}),e.jsx("text",{x:F+4,y:68,fontSize:9,fill:Le,children:Y(t.varianz)})]}),e.jsxs("g",{children:[e.jsx("text",{x:F-6,y:94,textAnchor:"end",fontSize:10,fill:Le,children:"MSE"}),e.jsx("rect",{x:F,y:84,width:G*x(t.bias2/B),height:13,fill:$n}),e.jsx("rect",{x:F+G*x(t.bias2/B),y:84,width:G*x(t.varianz/B),height:13,fill:Te}),e.jsx("text",{x:F+4,y:94,fontSize:9,fill:"var(--w-bg)",children:Y(t.mse)})]}),e.jsx("text",{x:8,y:xs-5,fontSize:8.5,fill:xe,children:"Der MSE-Balken ist immer voll ausgezogen; die Zahlen sind absolut."})]}),e.jsxs("svg",{viewBox:`0 0 ${fn} ${en}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:O.l,y:O.t,width:fn-O.l-O.r,height:en-O.t-O.b,fill:"none",stroke:gi,strokeWidth:.8}),Array.from({length:f-g+1},(v,I)=>g+I).map(v=>e.jsxs("g",{children:[e.jsx("line",{x1:O.l,x2:fn-O.r,y1:c(Math.pow(10,v)),y2:c(Math.pow(10,v)),stroke:gi}),e.jsxs("text",{x:O.l-5,y:c(Math.pow(10,v))+3,textAnchor:"end",fontSize:8,fill:xe,children:["10",v<0?"⁻":"",String(Math.abs(v)).split("").map(I=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(I)]).join("")]})]},`g${v}`)),[zn,10,20,30,Tn].map(v=>e.jsx("text",{x:k(v),y:en-O.b+13,textAnchor:"middle",fontSize:9,fill:xe,children:v},`x${v}`)),e.jsx("text",{x:(O.l+fn-O.r)/2,y:en-4,textAnchor:"middle",fontSize:9,fill:xe,children:"Basisfunktionen K"}),e.jsx("line",{x1:k(t.K),x2:k(t.K),y1:O.t,y2:en-O.b,stroke:xe,strokeWidth:1,strokeDasharray:"3 3"}),e.jsx("path",{d:z(v=>v.bias2),fill:"none",stroke:$n,strokeWidth:1.6}),e.jsx("path",{d:z(v=>v.varianz),fill:"none",stroke:Te,strokeWidth:1.6}),e.jsx("path",{d:z(v=>v.mse),fill:"none",stroke:Le,strokeWidth:2}),e.jsx("circle",{cx:k(r.besteK),cy:c(j.mse),r:4,fill:"none",stroke:Le,strokeWidth:1.8}),e.jsx("text",{x:O.l+5,y:O.t+11,fontSize:8.5,fill:Le,children:"MSE (grau) = Bias² (rot) + Varianz (grün)"})]})]})]}),e.jsx(le,{kind:t.K===r.besteK?"ok":"warn",children:M})]})}function us(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),` haben wir die Interpolation aufgegeben und
stattdessen mit `,e.jsx(n,{children:"K < n"}),` Basisfunktionen geglättet. Eine Frage blieb dabei
offen, und es ist die einzige, die in der Praxis wirklich zu beantworten ist:
Wie groß soll `,e.jsx(n,{children:"K"}),` sein? Zwei Kräfte ziehen in entgegengesetzte Richtungen. Zu
wenige Basisfunktionen können `,e.jsx(n,{children:"f"}),` gar nicht darstellen, zu viele lassen den
Schätzer dem Rauschen hinterherlaufen. Dieser Abschnitt macht aus dieser
Intuition zwei Sätze und zeigt anschließend an einem asymptotischen
Balance-Modell, wie eine theoretische Wahl von `,e.jsx(n,{children:"K"})," aussehen kann."]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.1 (Modell, Designmatrix, Schätzer)",id:"env-modell-designmatrix-schaetzer",children:[e.jsxs(i.p,{children:["Wir sammeln die Bezeichnungen aus ",e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),`, mit denen wir
hier rechnen. An festen Stellen `,e.jsx(n,{children:"x_1 < \\dots < x_n"})," in ",e.jsx(n,{children:"[a, b]"})," beobachten wir"]}),e.jsx(y,{children:`\\cblue{y_i} = f(x_i) + \\cred{\\eps_i},
\\qquad \\E[\\cred{\\eps_i}] = 0,
\\qquad \\var[\\cred{\\eps_i}] = \\sigma^2 ,`}),e.jsxs(i.p,{children:["mit unkorrelierten Fehlern. Zu einer ",e.jsx(S,{id:"basis",children:"Basis"}),`
`,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),` von Splinefunktionen
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`) bilden wir die
Designmatrix `,e.jsx(n,{children:"\\bB \\in \\R^{n \\times K}"}),` mit Einträgen
`,e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k}(x_i)"}),`, schreiben
`,e.jsx(n,{children:"\\corange{\\bphi(x)} = (\\corange{\\phi_1(x)}, \\dots, \\corange{\\phi_K(x)})^\\top"}),`
und erhalten den `,e.jsx(S,{id:"linear-least-squares",children:"Kleinste-Quadrate-Schätzer"})]}),e.jsx(T,{tag:"13.8.1",id:"eq-modell-designmatrix-schaetzer",children:`\\cgreen{\\wh{\\ba}} = \\bB^+ \\cblue{\\by},
\\qquad
\\cgreen{\\wh{f}(x)} = \\corange{\\bphi(x)}^\\top \\cgreen{\\wh{\\ba}} .`}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\bB^+"})," die ",e.jsx(S,{id:"pseudoinverse",children:"Pseudoinverse"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),"); hat ",e.jsx(n,{children:"\\bB"}),` vollen Spaltenrang
`,e.jsx(n,{children:"K"}),", so ist ",e.jsx(n,{children:"\\bB^+ = (\\bB^\\top\\bB)^{-1}\\bB^\\top"}),`,
und `,e.jsx(i.a,{href:"#eq-modell-designmatrix-schaetzer",children:"(13.8.1)"}),` ist die gewöhnliche Lösung der Normalengleichungen
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.1",children:"Abschnitt 7.1"}),")."]}),e.jsxs(i.p,{children:["Zwei Dinge sind an ",e.jsx(i.a,{href:"#eq-modell-designmatrix-schaetzer",children:"(13.8.1)"})," wichtig. Der Schätzer ist ",e.jsx(i.em,{children:"linear"}),` in den Daten,
er entsteht also durch Multiplikation mit einer festen Matrix. Und mit
`,e.jsx(n,{children:"\\cblue{\\by} = \\symbf{f} + \\cred{\\beps}"}),`, wobei
`,e.jsx(n,{children:"\\symbf{f} = (f(x_1), \\dots, f(x_n))^\\top"}),` die rauschfreien
Werte sammelt, zerfällt er in`]}),e.jsx(y,{children:"\\cgreen{\\wh{\\ba}} = \\bB^+ \\symbf{f} + \\bB^+ \\cred{\\beps} ."}),e.jsx(i.p,{children:`Der erste Summand ist deterministisch, der zweite trägt den ganzen Zufall.
Diese Aufteilung ist die Bias-Varianz-Zerlegung in Rohform.`})]}),`
`,e.jsx(i.h3,{children:"Bias: der Preis für zu wenige Basisfunktionen"}),`
`,e.jsxs(i.p,{children:[`Der erste Summand ist bereits vollständig bestimmt, bevor eine einzige
Zufallszahl gezogen wird. Er misst, wie gut sich `,e.jsx(n,{children:"f"}),` überhaupt im Spann
unserer `,e.jsx(n,{children:"K"})," Basisfunktionen darstellen lässt."]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.8.2 (Der Bias ist der Approximationsfehler ohne Rauschen)",id:"env-der-bias-ist-der-approximationsfehler",children:[e.jsxs(i.p,{children:["Hat ",e.jsx(n,{children:"\\bB"})," vollen Spaltenrang, so gilt für jedes ",e.jsx(n,{children:"x \\in [a, b]"})]}),e.jsx(T,{tag:"13.8.2",id:"eq-der-bias-ist-der-approximationsfehler",children:`\\E\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\symbf{f} .`}),e.jsxs(i.p,{children:[`Der Erwartungswert des Schätzers ist damit dieselbe Anpassung, die wir aus
rauschfreien Daten bekämen. Der `,e.jsx(i.em,{children:"Bias"})," ",e.jsx(n,{children:"\\cred{\\E[\\wh{f}(x)] - f(x)}"}),` hängt
damit weder von `,e.jsx(n,{children:"\\sigma"})," noch von der einzelnen Ziehung ab."]}),e.jsxs(i.p,{children:["Liegen die Knoten gleichmäßig auf ",e.jsx(n,{children:"[a, b]"}),", sind die ",e.jsx(n,{children:"\\corange{\\phi_k}"}),` eine
Basis der kubischen Splines zu diesen Knoten und ist `,e.jsx(n,{children:"f \\in \\Ccal^4[a, b]"}),`,
so gilt zusätzlich`]}),e.jsx(T,{tag:"13.8.3",id:"eq-der-bias-ist-der-approximationsfehler-2",children:`\\frac{1}{n}\\sumin \\bigl(\\cred{\\E[\\wh{f}(x_i)] - f(x_i)}\\bigr)^2
\\;\\le\\; \\Bigl(C \\corange{h}^4 \\max_{x \\in [a,b]}\\left| f^{(4)}(x) \\right|\\Bigr)^2
= O(K^{-8}) ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\corange{h}"})," die Gitterweite der Knoten ist."]})]}),`
`,e.jsx(Q,{title:"Beweis der Bias-Darstellung",children:e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bB^+"})," und ",e.jsx(n,{children:"\\corange{\\bphi(x)}"})," hängen nur von den Stellen ",e.jsx(n,{children:"x_i"})," und der Basis ab, nicht von den Beobachtungen; und ",e.jsx(n,{children:"\\E[\\cblue{\\by}] = \\symbf{f}"}),", weil ",e.jsx(n,{children:"\\E[\\cred{\\beps}] = \\bnull"})]}),children:[e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-modell-designmatrix-schaetzer",children:"(13.8.1)"})," ist ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x)}"}),` eine feste Linearkombination der
`,e.jsx(n,{children:"\\cblue{y_i}"}),". Aus der Linearität des ",e.jsx(S,{id:"expected-value",children:"Erwartungswerts"}),`
folgt`]}),e.jsx(y,{children:`\\E\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\E[\\cblue{\\by}]
= \\corange{\\bphi(x)}^\\top \\bB^+ \\symbf{f} .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["Das ist die definierende Eigenschaft der Kleinste-Quadrate-Lösung, angewendet auf den Datenvektor ",e.jsx(n,{children:"\\symbf{f}"})," statt auf ",e.jsx(n,{children:"\\cblue{\\by}"})]}),children:e.jsxs(i.p,{children:["Die rechte Seite von ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler",children:"(13.8.2)"}),` ist der Kleinste-Quadrate-Fit an die
rauschfreien Werte `,e.jsx(n,{children:"\\symbf{f}"}),". Nennen wir ihn ",e.jsx(n,{children:"\\cgreen{\\wh{f}_0}"}),`. Er
minimiert unter allen Funktionen `,e.jsx(n,{children:"s"})," des Ansatzraums ",e.jsx(n,{children:"\\Fcal_K"}),`, also des
Spanns von `,e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`
(`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"), die Summe ",e.jsx(n,{children:"\\sumin (f(x_i) - s(x_i))^2"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["Kubische Splines zu ",e.jsx(n,{children:"m"})," Teilintervallen bilden einen Raum der Dimension ",e.jsx(n,{children:"m + 3 = K"}),", und ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"})," ist eine Basis davon (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),")"]}),children:e.jsxs(i.p,{children:["Zu den Knoten unserer Basis gehört nach ",e.jsx(i.a,{href:"#env-approximationsfehler-kubischer-splines",children:"Satz 13.6.2"}),` ein kubischer Spline
`,e.jsx(n,{children:"\\cgreen{s^\\star}"}),", der ",e.jsx(n,{children:"f"}),` dort interpoliert und
`,e.jsx(n,{children:"\\max_x \\cred{\\left| f(x) - s^\\star(x) \\right|} \\le C \\corange{h}^4 \\max_x |f^{(4)}(x)|"}),`
erfüllt. Dieser Spline liegt in `,e.jsx(n,{children:"\\Fcal_K"}),"."]})}),e.jsxs(K,{children:[e.jsx(i.p,{children:"Mit Schritt 2 und Schritt 3 folgt"}),e.jsx(y,{children:`\\sumin \\bigl(f(x_i) - \\cgreen{\\wh{f}_0(x_i)}\\bigr)^2
\\;\\le\\; \\sumin \\bigl(f(x_i) - \\cgreen{s^\\star(x_i)}\\bigr)^2
\\;\\le\\; n\\,\\Bigl(C \\corange{h}^4 \\max_x |f^{(4)}(x)|\\Bigr)^2 ,`}),e.jsxs(i.p,{children:["und Division durch ",e.jsx(n,{children:"n"})," gibt ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler-2",children:"(13.8.3)"}),"."]})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"K"})," Basisfunktionen vom Grad ",e.jsx(n,{children:"3"})," gehören zu ",e.jsx(n,{children:"K - 3"})," Teilintervallen (Schritt 3), die Gitterweite fällt also wie ",e.jsx(n,{children:"1/K"})]}),children:e.jsxs(i.p,{children:["Gleichmäßige Knoten auf einem festen Intervall ",e.jsx(n,{children:"[a, b]"}),` bedeuten
`,e.jsx(n,{children:"\\corange{h} = (b - a)/(K - 3)"}),", also ",e.jsx(n,{children:"\\corange{h} = O(1/K)"}),` und damit
`,e.jsx(n,{children:"\\corange{h}^8 = O(K^{-8})"}),"."]})})]})}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.3 (Woran die Ordnung hängt)",id:"env-woran-die-ordnung-haengt",children:[e.jsxs(i.p,{children:[`Die Annahmen verdienen eine eigene Zeile, denn ohne sie ist die Aussage
falsch. Gebraucht werden gleichmäßige Knoten auf einem
festen Intervall, `,e.jsx(n,{children:"f \\in \\Ccal^4"}),` und kubische Stücke. Fällt eine dieser drei
Bedingungen weg, ändert sich der Exponent. Bei stückweise linearen Stücken
steht `,e.jsx(n,{children:"\\corange{h}^2"})," statt ",e.jsx(n,{children:"\\corange{h}^4"})," (",e.jsx(i.a,{href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"}),`), bei einer
`,e.jsx(S,{id:"function",children:"Funktion"}),` mit nur zwei stetigen Ableitungen ebenfalls, und ein
einziges breites Teilintervall verdirbt die Gitterweite unabhängig davon, wie
fein der Rest liegt (`,e.jsx(i.a,{href:"#env-partition-und-gitterweite",children:"Definition 13.6.1"}),")."]}),e.jsxs(i.p,{children:["Die Kurzform ",e.jsx(n,{children:"\\max_x |f(x) - \\cgreen{\\wh{f}(x)}| = O(\\corange{h}^4)"}),` ist die
punktweise Fassung ohne Rauschen. `,e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),` mittelt
stattdessen über die Entwurfsstellen und quadriert; das ist die Größe,
die gleich in den MSE eingeht, und sie erbt die Ordnung `,e.jsx(n,{children:"O(K^{-8})"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Varianz: der Preis für zu viele Basisfunktionen"}),`
`,e.jsxs(i.p,{children:["Der zweite Summand ",e.jsx(n,{children:"\\bB^+\\cred{\\beps}"}),` trägt den Zufall. Er ist es,
der bei großem `,e.jsx(n,{children:"K"}),` aus dem Ruder läuft, und über ihn lässt sich mehr sagen als
eine Ordnung. Anschaulich heißt das: Ziehen wir die Daten mehrfach neu, so
liegen die Schätzkurven bei kleinem `,e.jsx(n,{children:"K"})," fast übereinander und verfehlen ",e.jsx(n,{children:"f"}),`
alle in dieselbe Richtung, während sie bei großem `,e.jsx(n,{children:"K"}),` im Mittel richtig
liegen, einzeln aber weit auffächern, weil jede ihrem eigenen Rauschen folgt.`]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.8.4 (Gemittelte Varianz eines linearen Schätzers)",id:"env-gemittelte-varianz-eines-linearen",children:[e.jsxs(i.p,{children:["Seien die ",e.jsx(n,{children:"\\cred{\\eps_i}"}),` unkorreliert mit
`,e.jsx(n,{children:"\\var[\\cred{\\eps_i}] = \\sigma^2"}),` (homoskedastisch), und habe
`,e.jsx(n,{children:"\\bB"})," vollen Spaltenrang ",e.jsx(n,{children:"K"}),". Dann gilt für jedes ",e.jsx(n,{children:"x"})]}),e.jsx(T,{tag:"13.8.4",id:"eq-gemittelte-varianz-eines-linearen",children:`\\var\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]
= \\sigma^2\\, \\corange{\\bphi(x)}^\\top
\\bigl(\\bB^\\top\\bB\\bigr)^{-1} \\corange{\\bphi(x)} ,`}),e.jsx(i.p,{children:"und über die Entwurfsstellen gemittelt sogar exakt"}),e.jsx(T,{tag:"13.8.5",id:"eq-gemittelte-varianz-eines-linearen-2",children:"\\frac{1}{n}\\sumin \\var\\bigl[\\cgreen{\\wh{f}(x_i)}\\bigr] = \\frac{\\sigma^2 K}{n} ."})]}),`
`,e.jsx(Q,{title:"Beweis der gemittelten Varianzformel",children:e.jsxs(he,{children:[e.jsxs(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[\\bM\\cblue{\\by}] = \\bM \\var[\\cblue{\\by}]\\bM^\\top"})," für feste ",e.jsx(n,{children:"\\bM"}),"; ",e.jsx(n,{children:"\\var[\\cblue{\\by}] = \\sigma^2\\bI_n"})," wegen Unkorreliertheit und Homoskedastizität; und mit ",e.jsx(n,{children:"\\bB^+ = (\\bB^\\top\\bB)^{-1}\\bB^\\top"})," kürzt sich ",e.jsx(n,{children:"\\bB^\\top\\bB"})," heraus"]}),children:[e.jsxs(i.p,{children:["Für die ",e.jsx(S,{id:"covariance-matrix",children:"Kovarianzmatrix"}),` des Koeffizientenvektors gilt,
wobei `,e.jsx(n,{children:"\\var[\\cdot\\,]"})," für einen Vektor die Matrix der Kovarianzen bezeichnet,"]}),e.jsx(y,{children:`\\var\\bigl[\\cgreen{\\wh{\\ba}}\\bigr]
= \\bB^+ \\var[\\cblue{\\by}] \\,(\\bB^+)^\\top
= \\sigma^2 \\bB^+ (\\bB^+)^\\top
= \\sigma^2 \\bigl(\\bB^\\top\\bB\\bigr)^{-1} .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\var[\\bc^\\top\\bv] = \\bc^\\top\\var[\\bv]\\,\\bc"}),", hier mit ",e.jsx(n,{children:"\\bc = \\corange{\\bphi(x)}"})]}),children:e.jsxs(i.p,{children:["Daraus folgt ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),", denn ",e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = \\corange{\\bphi(x)}^\\top\\cgreen{\\wh{\\ba}}"}),`
ist eine Linearkombination der Koeffizienten.`]})}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Jeder Summand ist ein Skalar und damit gleich seiner ",e.jsx(S,{id:"trace",children:"Spur"}),"; die Zyklizität der Spur (",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"}),") zieht den Vektor nach vorn, und ",e.jsx(n,{children:"\\sumin \\corange{\\bphi(x_i)}\\corange{\\bphi(x_i)}^\\top = \\bB^\\top\\bB"})]}),children:[e.jsxs(i.p,{children:["Nun summieren wir ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),` über die Entwurfsstellen. Der Vektor
`,e.jsx(n,{children:"\\corange{\\bphi(x_i)}^\\top"})," ist die ",e.jsx(n,{children:"i"}),"-te Zeile von ",e.jsx(n,{children:"\\bB"}),", also ist"]}),e.jsx(y,{children:`\\sumin \\corange{\\bphi(x_i)}^\\top \\bigl(\\bB^\\top\\bB\\bigr)^{-1}\\corange{\\bphi(x_i)}
= \\tr\\Bigl(\\bigl(\\bB^\\top\\bB\\bigr)^{-1}
\\sumin \\corange{\\bphi(x_i)}\\,\\corange{\\bphi(x_i)}^\\top\\Bigr)
= \\tr\\bigl(\\bI_K\\bigr) = K .`})]}),e.jsx(K,{children:e.jsxs(i.p,{children:["Multiplikation mit ",e.jsx(n,{children:"\\sigma^2/n"})," liefert ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),"."]})})]})}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.5 (Was die Varianzformel erzählt)",id:"env-was-die-varianzformel-erzaehlt",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),` ist bemerkenswert schlicht. Rechts steht keine
Eigenschaft der Basis, keine Knotenlage, keine Konditionszahl, sondern nur
`,e.jsx(n,{children:"\\sigma^2"}),", ",e.jsx(n,{children:"K"})," und ",e.jsx(n,{children:"n"}),`. Im Mittel kostet uns jede Basisfunktion genau
`,e.jsx(n,{children:"\\sigma^2/n"}),` an Varianz, egal welche. Das ist die exakte Fassung der
Ordnungsaussage `,e.jsx(n,{children:"\\var[\\cgreen{\\wh{f}(x)}] = O(K/n)"}),"."]}),e.jsxs(i.p,{children:[`Der Beweis liefert nebenbei eine Größe, die uns im letzten Teil dieses
Abschnitts wieder begegnet. Die Matrix
`,e.jsx(n,{children:"\\bH = \\bB(\\bB^\\top\\bB)^{-1}\\bB^\\top"}),`
bildet die Beobachtungen auf die angepassten Werte ab, und Schritt 3 zeigt
`,e.jsx(n,{children:"\\tr(\\bH) = K"}),". Diese Spur heißt in der Statistik die ",e.jsx(i.em,{children:`Anzahl
effektiver Freiheitsgrade`}),` des Schätzers, und bei einer unbestraften
Regression mit `,e.jsx(n,{children:"K"})," Basisfunktionen ist sie schlicht ",e.jsx(n,{children:"K"}),"."]}),e.jsxs(i.p,{children:["Vorsicht bei der punktweisen Lesart. Formel ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"})," mittelt, ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),`
nicht. An einer Stelle, in deren Nähe kaum Daten liegen, kann
`,e.jsx(n,{children:"\\var[\\cgreen{\\wh{f}(x)}]"}),` um Größenordnungen darüber liegen. Werten wir
`,e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"})," im Beispiel unten nicht an den ",e.jsx(n,{children:"100"}),` Entwurfsstellen aus, sondern
auf einem gleichmäßigen Gitter über `,e.jsx(n,{children:"[0, 2\\pi]"}),`, so ist die mittlere Varianz
bei `,e.jsx(n,{children:"K = 40"})," nicht ",e.jsx(n,{children:"0{,}036"}),", sondern ",e.jsx(n,{children:"5{,}04"}),`: Zwischen den Datenpunkten und
an den Rändern schwingt der Schätzer weit stärker als dort, wo er angepasst
wurde. Die Ordnung `,e.jsx(n,{children:"O(K/n)"}),` wird meist punktweise notiert; als Aussage über
den gemittelten Fehler ist sie richtig, als Aussage über jedes einzelne `,e.jsx(n,{children:"x"}),`
nicht.`]})]}),`
`,e.jsx(i.h3,{children:"Der Kompromiss: mittlerer quadratischer Fehler"}),`
`,e.jsxs(w,{kind:"Satz",label:"13.8.6 (Zerlegung des mittleren quadratischen Fehlers)",id:"env-zerlegung-des-mittleren-quadratischen",children:[e.jsxs(i.p,{children:["Für jedes ",e.jsx(n,{children:"x"})," gilt"]}),e.jsx(T,{tag:"13.8.6",id:"eq-zerlegung-des-mittleren-quadratischen",children:`\\underbrace{\\E\\Bigl[\\bigl(\\cgreen{\\wh{f}(x)} - f(x)\\bigr)^2\\Bigr]}_{\\MSE}
= \\underbrace{\\bigl(\\cred{\\E[\\wh{f}(x)] - f(x)}\\bigr)^2}_{\\text{Bias}^2}
+ \\underbrace{\\var\\bigl[\\cgreen{\\wh{f}(x)}\\bigr]}_{\\text{Varianz}} .`})]}),`
`,e.jsx(Q,{title:"Beweis der Bias-Varianz-Zerlegung",children:e.jsxs(he,{children:[e.jsxs(K,{children:[e.jsxs(i.p,{children:["Wir schreiben ",e.jsx(n,{children:"\\mu := \\E[\\cgreen{\\wh{f}(x)}]"})," und schieben diesen Wert ein:"]}),e.jsx(y,{children:`\\bigl(\\cgreen{\\wh{f}(x)} - f(x)\\bigr)^2
= \\bigl(\\cgreen{\\wh{f}(x)} - \\mu\\bigr)^2
+ 2\\bigl(\\cgreen{\\wh{f}(x)} - \\mu\\bigr)\\bigl(\\mu - f(x)\\bigr)
+ \\bigl(\\mu - f(x)\\bigr)^2 .`})]}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\E[\\cgreen{\\wh{f}(x)} - \\mu] = 0"})," nach Definition von ",e.jsx(n,{children:"\\mu"}),", und ",e.jsx(n,{children:"\\mu - f(x)"})," ist keine Zufallsgröße, darf also aus dem Erwartungswert gezogen werden"]}),children:e.jsxs(i.p,{children:[`Jetzt nehmen wir den Erwartungswert. Der mittlere Term fällt weg, der erste
ist die `,e.jsx(S,{id:"variance",children:"Varianz"}),", der letzte ist deterministisch."]})})]})}),`
`,e.jsxs(i.p,{children:["Setzen wir ",e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"})," und ",e.jsx(i.a,{href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"})," in ",e.jsx(i.a,{href:"#eq-zerlegung-des-mittleren-quadratischen",children:"(13.8.6)"}),` ein und mitteln über die
Entwurfsstellen, so erhalten wir unter den Voraussetzungen von `,e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),`
für eine Konstante `,e.jsx(n,{children:"C_1>0"})," die zentrale ",e.jsx(i.em,{children:"Obergrenze"})," dieses Abschnitts:"]}),`
`,e.jsx(T,{tag:"13.8.7",id:"eq-eq-13-8-7",children:`\\frac{1}{n}\\sumin \\E\\Bigl[\\bigl(\\cgreen{\\wh{f}(x_i)} - f(x_i)\\bigr)^2\\Bigr]
\\;\\le\\;
\\underbrace{C_1K^{-8}}_{\\cred{\\text{obere Schranke für Bias}^2}}
+ \\underbrace{\\frac{\\sigma^2 K}{n}}_{\\text{Varianz}} .`}),`
`,e.jsxs(i.p,{children:["Die Schranke für den ersten Term fällt mit wachsendem ",e.jsx(n,{children:"K"}),` rasant, der zweite
Term wächst exakt linear. Damit besitzt die `,e.jsx(i.em,{children:"rechte Seite"}),` ein Minimum
dazwischen. Der tatsächliche Bias darf unter seiner Schranke liegen oder bei
nicht geschachtelten Räumen schwanken; aus `,e.jsx(i.a,{href:"#eq-eq-13-8-7",children:"(13.8.7)"}),` allein folgt daher noch
kein tatsächliches MSE-Minimum an derselben Stelle.`]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.7 (Heuristisches Balance-Modell für die Knotenzahl)",id:"env-heuristisches-balance-modell-fuer-die",children:[e.jsxs(i.p,{children:[`Nehmen wir stärker an, dass der quadrierte Bias in dem interessierenden
Bereich tatsächlich wie `,e.jsx(n,{children:"c_1K^{-8}"})," mit ",e.jsx(n,{children:"c_1>0"}),` verläuft, statt nur nach oben
so beschränkt zu sein, erhalten wir das Proxy-Kriterium
`,e.jsx(n,{children:"g(K) = c_1 K^{-8} + c_2 K/n"}),". Ableiten und Nullsetzen gibt"]}),e.jsx(y,{children:`g'(K) = -8 c_1 K^{-9} + \\frac{c_2}{n} \\overset{!}{=} 0
\\quad\\Longrightarrow\\quad
K^\\star = \\Bigl(\\frac{8 c_1}{c_2}\\Bigr)^{1/9} n^{1/9} ,`}),e.jsx(i.p,{children:"und dort sind beide Summanden von derselben Ordnung:"}),e.jsx(y,{children:`c_1 (K^\\star)^{-8} \\sim n^{-8/9}, \\qquad
\\frac{c_2 K^\\star}{n} \\sim n^{1/9 - 1} = n^{-8/9} .`}),e.jsxs(i.p,{children:[`Unter dieser zusätzlichen Äquivalenzannahme ergeben sich also
`,e.jsx(n,{children:"K^\\star \\asymp n^{1/9}"})," und eine Proxy-Rate ",e.jsx(n,{children:"n^{-8/9}"}),". Der Exponent ",e.jsx(n,{children:"1/9"}),`
entsteht aus `,e.jsx(n,{children:"8 + 1"}),`, also aus der angenommenen Bias-Ordnung plus dem linearen
Varianzterm. Als rigorose Optimalitäts- oder Minimax-Aussage bräuchte die Rate
zusätzlich eine passende untere Schranke und genaue Annahmen an Funktionsklasse,
Design und Folge der Ansatzräume.`]}),e.jsxs(i.p,{children:[`Aus derselben Rechnung folgt
`,e.jsx(n,{children:"c_1 (K^\\star)^{-8} = \\tfrac{1}{8}\\, c_2 K^\\star/n"}),`: Der quadrierte Bias
trägt im Optimum dieses Modells ein Neuntel der Summe, die Varianz die
übrigen acht Neuntel – eine Eigenschaft der angenommenen Potenzform, keine
des tatsächlichen MSE.`]}),e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"K^\\star \\asymp n^{1/9}"})," eine ",e.jsx(i.em,{children:"rein asymptotische"}),` Ordnung ist, verdient
mehr als eine Fußnote: Mit Konstante `,e.jsx(n,{children:"1"})," liefert die Formel für ",e.jsx(n,{children:"n = 100"}),` den
Wert `,e.jsx(n,{children:"K^\\star = 1{,}67"}),`, und niemand approximiert eine schwingende Funktion
mit zwei Basisfunktionen. Was fehlt, ist der Faktor `,e.jsx(n,{children:"(8c_1/c_2)^{1/9}"}),`, und
der hängt an der vierten Ableitung von `,e.jsx(n,{children:"f"})," und an ",e.jsx(n,{children:"\\sigma"}),`. Merken lässt sich
aus der heuristischen Formel deshalb der Balance-Exponent, nicht eine
konkrete Knotenzahl.`]})]}),`
`,e.jsx(i.h3,{children:"Ein numerisches Beispiel"}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.8.8 (Bias und Varianz beim Sinusbeispiel)",id:"env-bias-und-varianz-beim-sinusbeispiel",children:[e.jsxs(i.p,{children:["Wir wählen das Setup ",e.jsx(n,{children:"f(x) = \\sin(3x)"})," auf ",e.jsx(n,{children:"[0, 2\\pi]"}),`,
`,e.jsx(n,{children:"n = 100"})," feste Stellen, ",e.jsx(n,{children:"\\sigma = 0{,}3"}),`. Die Stellen ziehen wir einmal aus
einer Gleichverteilung und behalten sie bei; anschließend simulieren wir
`,e.jsx(n,{children:"200"})," Datensätze, passen jeweils einen kubischen Regressionsspline mit ",e.jsx(n,{children:"K"}),`
Basisfunktionen an und schätzen daraus Bias, Varianz und MSE an den
Entwurfsstellen. Alle Zahlen der folgenden Tabelle sind unsere eigene
Rechnung.`]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"K"})}),e.jsx(i.th,{style:{textAlign:"left"},children:"Bias²"}),e.jsx(i.th,{style:{textAlign:"left"},children:"Varianz"}),e.jsx(i.th,{style:{textAlign:"left"},children:e.jsx(n,{children:"\\sigma^2 K/n"})}),e.jsx(i.th,{style:{textAlign:"left"},children:"MSE"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}4103"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0044"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0045"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}4147"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"8"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0344"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0071"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0072"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0415"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"9"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}1174"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0080"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0081"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}1254"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"12"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0013"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0107"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0108"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0120"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"15"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0001"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0135"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0135"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0136"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"40"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0001"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0358"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0360"})}),e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"0{,}0360"})})]})]})]}),e.jsxs(i.p,{children:[`Drei Beobachtungen. Erstens trifft die geschätzte Varianz die Vorhersage
`,e.jsx(n,{children:"\\sigma^2 K/n"})," aus ",e.jsx(i.a,{href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"}),` in jeder Zeile auf höchstens zwei Prozent genau;
die Abweichung ist der Simulationsfehler von `,e.jsx(n,{children:"200"}),` Wiederholungen. Zweitens
liegt das Minimum des MSE bei `,e.jsx(n,{children:"K = 12"})," mit ",e.jsx(n,{children:"0{,}0120"}),". Bei ",e.jsx(n,{children:"K = 5"}),` ist der MSE
das `,e.jsx(n,{children:"34{,}5"}),"-fache davon, bei ",e.jsx(n,{children:"K = 40"}),` das Dreifache. Drittens trägt beim
simulierten Minimum der Bias nur noch `,e.jsx(n,{children:"11"}),` Prozent zum MSE bei. Das stimmt
hier numerisch mit dem Ein-Neuntel-Verhältnis des Proxy-Modells aus
`,e.jsx(i.a,{href:"#env-heuristisches-balance-modell-fuer-die",children:"Bemerkung 13.8.7"}),` überein, ist aber keine
theoretisch erzwungene Übereinstimmung. Das diskrete Optimum liegt dort, wo
der nächste zulässige Schritt mehr Varianz kostet, als er in dieser
Simulation an Bias einspart.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.9 (Der Bias fällt nicht monoton)",id:"env-der-bias-faellt-nicht-monoton",children:[e.jsxs(i.p,{children:["Zwischen ",e.jsx(n,{children:"K = 8"})," und ",e.jsx(n,{children:"K = 9"}),` steigt der quadrierte Bias in der Tabelle
wieder an. Beide Anpassungen sind schlecht, denn fünf beziehungsweise sechs
Teilintervalle sind für drei Sinusperioden zu wenig. Welche von beiden weniger
schlecht ausfällt, entscheidet die Lage der Knoten relativ zu `,e.jsx(n,{children:"f"}),": Bei ",e.jsx(n,{children:"K = 9"}),`
sitzen die fünf inneren Knoten exakt auf den Nullstellen `,e.jsx(n,{children:"k\\pi/3"}),` von
`,e.jsx(n,{children:"\\sin(3x)"}),", dort also, wo auch ",e.jsx(n,{children:"f''"}),` verschwindet, während die Funktion
zwischen den Knoten am stärksten gekrümmt ist.`]}),e.jsxs(i.p,{children:["Ein Widerspruch zu ",e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"})," ist das nicht. Die Aussage ",e.jsx(n,{children:"O(K^{-8})"}),` ist eine
obere Schranke für große `,e.jsx(n,{children:"K"}),`, keine Garantie, dass jeder einzelne Schritt eine
Verbesserung bringt. Wir kennen dieselbe Unterscheidung aus
`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),`, wo die gemessenen Faktoren erst allmählich gegen
die vorhergesagten `,e.jsx(n,{children:"16"})," liefen."]})]}),`
`,e.jsxs(re,{title:"Zwölf Kurven, drei Balken, ein Regler",children:[e.jsx(i.p,{children:`Das Widget rechnet die Tabelle live nach und zeigt zugleich, woher die beiden
Anteile kommen. Links stehen die Daten einer einzelnen Ziehung in Blau, die
wahre Funktion violett gestrichelt, die inneren Knoten als orange Marken auf
der Achse und in Grün die Schätzer der ersten zwölf Wiederholungen samt ihrem
Mittelwert.`}),e.jsxs(i.p,{children:["Bei kleinem ",e.jsx(n,{children:"K"})," liegen die zwölf Kurven fast übereinander, bei ",e.jsx(n,{children:"K = 40"}),`
fächern sie weit auf, und nur noch ihr Mittelwert liegt auf `,e.jsx(n,{children:"f"}),`. Die Balken
rechts zeigen die Anteile am MSE, die Tafel darunter den Verlauf aller drei
Größen über `,e.jsx(n,{children:"K"}),` auf logarithmischer Skala. Dort ist der Knick gut zu sehen:
Der rote Bias stürzt ab, die grüne Varianz steigt langsam und stetig, und die graue Summe
hat ihr Minimum dazwischen.`]}),e.jsx(i.p,{children:`Alle Zufallszahlen stammen aus einem festen Startwert. Es ist bei jedem
Aufruf dieselbe Simulation, und die Zahlen im Widget stimmen mit denen der
Tabelle überein.`}),e.jsx(i.p,{children:"Wo vermuten wir vor dem Blick auf die MSE-Kurve ihr Minimum?"}),e.jsx(Ue,{frage:"Welche Knotenzahl minimiert in dieser festen Simulation den MSE?",loesung:12,toleranz:.5,einheit:"K",children:e.jsx(et,{})})]}),`
`,e.jsxs(i.h3,{children:["Wie wählt man ",e.jsx(n,{children:"K"})," in der Praxis?"]}),`
`,e.jsxs(i.p,{children:[`Die ganze bisherige Rechnung hat einen Haken, und er ist deutlich zu
benennen: Wir kennen `,e.jsx(n,{children:"f"}),` nicht. Bias und MSE sind damit nicht ausrechenbar,
sondern nur die Residuen. In geschachtelten Räumen werden sie mit wachsendem
`,e.jsx(n,{children:"K"})," immer kleiner, bis ein vollrangiger Fall mit ",e.jsx(n,{children:"K=n"}),` jeden Datenpunkt exakt
trifft; bei wandernden Knoten dürfen einzelne Schritte davon abweichen
(`,e.jsx(i.a,{href:"#env-die-residuen-fallen-nicht-immer",children:"Bemerkung 13.7.11"}),`). Der allgemeine Trend bleibt: Trainingsanpassung belohnt
Flexibilität, nicht Vorhersagegüte. Als Auswahlkriterium taugt sie daher nicht.`]}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.8.10 (Drei Auswege)",id:"env-drei-auswege",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kreuzvalidierung."}),` Wir halten einen Teil der Daten zurück, passen auf dem
Rest an und messen den Fehler auf dem zurückgehaltenen Teil. Punkte, die
nicht an der Anpassung beteiligt waren, bestrafen Überanpassung von selbst.
Gewählt wird das `,e.jsx(n,{children:"K"})," mit dem kleinsten Validierungsfehler."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Informationskriterien."}),` AIC und BIC addieren zur Anpassungsgüte einen
Strafterm, der mit der Parameterzahl wächst. Für normalverteilte Fehler
sind sie bis auf Konstanten `,e.jsx(n,{children:"n \\log(\\mathrm{RSS}_K/n) + 2K"}),` beziehungsweise
`,e.jsx(n,{children:"n \\log(\\mathrm{RSS}_K/n) + \\log(n)\\,K"}),`; BIC bestraft schärfer, sobald
`,e.jsx(n,{children:"n \\ge 8"})," ist. Beide gehen auf die ",e.jsx(S,{id:"likelihood",children:"Log-Likelihood"})," zurück."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Generalisierte Kreuzvalidierung."}),` Sie schätzt den Kreuzvalidierungsfehler
aus einer einzigen Anpassung.`]}),`
`]})}),`
`,e.jsxs(w,{kind:"Definition",label:"13.8.11 (Generalisierte Kreuzvalidierung)",id:"env-generalisierte-kreuzvalidierung",children:[e.jsxs(i.p,{children:[`Mit der Residuenquadratsumme
`,e.jsx(n,{children:"\\mathrm{RSS}_K = \\sumin (\\cblue{y_i} - \\cgreen{\\wh{f}(x_i)})^2"})," heißt"]}),e.jsx(T,{tag:"13.8.8",id:"eq-generalisierte-kreuzvalidierung",children:"\\mathrm{GCV}(K) = \\frac{\\mathrm{RSS}_K / n}{\\left(1 - K/n\\right)^2}"}),e.jsxs(i.p,{children:["der ",e.jsx(i.em,{children:"GCV-Kriteriumswert"}),". Gewählt wird das ",e.jsx(n,{children:"K"}),", das ihn minimiert."]}),e.jsxs(i.p,{children:[`Hier ist der Schätzer ein unbestrafter KQ-Fit mit vollem Spaltenrang, sodass
`,e.jsx(n,{children:"\\tr(\\bH)=K"}),` gilt. Für einen allgemeinen linearen Glätter steht im Nenner die
effektive Freiheitsgradzahl `,e.jsx(n,{children:"\\tr(\\bH)"})," anstelle von ",e.jsx(n,{children:"K"}),"."]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.12 (Warum der Nenner nötig ist)",id:"env-warum-der-nenner-noetig-ist",children:[e.jsxs(i.p,{children:["Bei geschachtelten Modellräumen fällt der Zähler monoton in ",e.jsx(n,{children:"K"}),` und wäre als
Auswahlkriterium nutzlos. Bei den hier verwendeten, mit `,e.jsx(n,{children:"K"}),` wandernden
Quantilsknoten kann er einzelne Male steigen (`,e.jsx(i.a,{href:"#env-die-residuen-fallen-nicht-immer",children:"Bemerkung 13.7.11"}),`), bevorzugt
im Trend aber weiterhin unnötig flexible Trainingsfits. Der Nenner sorgt für
den nötigen Gegendruck, und er kommt nicht aus der Luft: Er entsteht aus der
Kreuzvalidierung, die jeden Punkt einmal weglässt.`]}),e.jsxs(i.p,{children:["Die Faustregel dahinter ist einfach: Je näher ",e.jsx(n,{children:"K"})," an ",e.jsx(n,{children:"n"}),` rückt, desto stärker
bläst der Nenner den beobachteten Fehler auf, weil ein Schätzer mit vielen
Parametern seine eigenen Residuen künstlich klein rechnet.`]})]}),`
`,e.jsxs(Q,{title:"Woher der Nenner kommt",children:[e.jsxs(i.p,{children:["Für einen linearen Schätzer ",e.jsx(n,{children:"\\cgreen{\\wh{\\by}} = \\bH\\cblue{\\by}"}),` lässt
sich das Residuum, das beim Weglassen des `,e.jsx(n,{children:"i"}),`-ten Punktes entstünde, ohne
erneute Anpassung ausrechnen: Es ist
`,e.jsx(n,{children:"(\\cblue{y_i} - \\cgreen{\\wh{f}(x_i)})/(1 - H_{ii})"}),`, was man mit der
`,e.jsx(S,{id:"sherman-morrison-formula",children:"Sherman-Morrison-Formel"}),` nachrechnet. Die
Kreuzvalidierung wird damit zu einer einzigen Formel. Ersetzt man darin alle
`,e.jsx(n,{children:"H_{ii}"})," durch ihren Mittelwert ",e.jsx(n,{children:"\\tr(\\bH)/n"}),`, so steht
`,e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"}),` da, denn nach
`,e.jsx(i.a,{href:"#env-was-die-varianzformel-erzaehlt",children:"Bemerkung 13.8.5"})," ist ",e.jsx(n,{children:"\\tr(\\bH) = K"}),"."]}),e.jsx(i.p,{children:`Die Leave-one-out-Identität hält dabei die Designmatrix und damit die Basis
fest. Würden wir nach dem Weglassen jedes Punkts auch quantilbasierte Knoten
neu bestimmen, entstünde ein anderes Verfahren, für das die Formel nicht
exakt dieselbe Kreuzvalidierung berechnet.`})]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.8.13 (Was die Kriterien in unserem Datensatz wählen)",id:"env-was-die-kriterien-in-unserem-datensatz",children:[e.jsxs(i.p,{children:["Wir nehmen die erste der ",e.jsx(n,{children:"200"})," Ziehungen aus ",e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),`, also einen
einzigen Datensatz, und werten `,e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"})," für ",e.jsx(n,{children:"K = 4, \\dots, 40"}),` aus. Das
Minimum liegt bei `,e.jsx(n,{children:"K = 10"})," mit ",e.jsx(n,{children:"\\mathrm{GCV} = 0{,}0895"}),`; AIC und BIC in den
Formen aus `,e.jsx(i.a,{href:"#env-drei-auswege",children:"Bemerkung 13.8.10"})," wählen dasselbe ",e.jsx(n,{children:"K"}),"."]}),e.jsxs(i.p,{children:["Der wahre MSE ist bei ",e.jsx(n,{children:"K = 12"})," am kleinsten. Mit ",e.jsx(n,{children:"K = 10"}),` zahlen wir
`,e.jsx(n,{children:"0{,}0157"})," statt ",e.jsx(n,{children:"0{,}0120"}),", also rund ",e.jsx(n,{children:"30"}),` Prozent Aufschlag. Für ein
Kriterium, das `,e.jsx(n,{children:"f"}),` überhaupt nicht kennt und mit einer einzigen Ziehung
auskommt, ist das ein gutes Ergebnis, und es zeigt zugleich die Grenze: Die
Kriterien schätzen den Fehler, sie kennen ihn nicht. Auf einer anderen
Ziehung fällt die Wahl anders aus.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.8.14 (Der praktische Ausweg: groß wählen und bestrafen)",id:"env-der-praktische-ausweg-gross-waehlen-und",children:[e.jsxs(i.p,{children:["In der Anwendung wird ",e.jsx(n,{children:"K"}),` meist gar nicht feinjustiert. Man wählt es
großzügig, sodass der Bias sicher klein ist, und steuert die Glattheit
stattdessen über einen Strafterm. Das führt auf `,e.jsx(i.em,{children:"P-Splines"}),` und weiter auf
additive Modelle; in R ist `,e.jsx(i.code,{children:"mgcv::gam()"})," die Standardadresse dafür."]}),e.jsxs(i.p,{children:[`Der Vorteil ist mehr als Bequemlichkeit. Die Knotenzahl ist eine ganze Zahl,
der Strafparameter dagegen stufenlos, und ein stufenloser Regler lässt sich
mit denselben Kriterien viel feiner einstellen. Formal führt das auf gestrafte
Normalengleichungen; die Details stehen in der Vertiefung zu Glättungs- und
Penalized Splines in `,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),`. Auch die effektiven
Freiheitsgrade `,e.jsx(n,{children:"\\tr(\\bH)"})," aus ",e.jsx(i.a,{href:"#env-was-die-varianzformel-erzaehlt",children:"Bemerkung 13.8.5"}),`
bleiben brauchbar; sie sind dann
keine ganze Zahl mehr, sondern rutschen mit wachsendem Strafparameter stetig
nach unten. Die Glättungssplines aus `,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),` sind der
Grenzfall `,e.jsx(n,{children:"K = n"})," mit Strafterm."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Je größer ",e.jsx(n,{children:"K"}),", desto kleiner der Bias: Die Verzerrung fällt monoton."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"})," gibt eine obere Schranke der Ordnung ",e.jsx(n,{children:"O(K^{-8})"}),`, keine
monotone Folge. In unserer eigenen Simulation steigt der quadrierte Bias von
`,e.jsx(n,{children:"0{,}0344"})," bei ",e.jsx(n,{children:"K = 8"})," auf ",e.jsx(n,{children:"0{,}1174"})," bei ",e.jsx(n,{children:"K = 9"}),`: Beide Gitter sind viel zu
grob, und bei `,e.jsx(n,{children:"K = 9"}),` fallen die inneren Knoten zusätzlich genau auf die
Nullstellen von `,e.jsx(n,{children:"\\sin(3x)"})," (",e.jsx(i.a,{href:"#env-der-bias-faellt-nicht-monoton",children:"Bemerkung 13.8.9"}),`). Erst über größere Sprünge in
`,e.jsx(n,{children:"K"})," setzt sich der Trend durch."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Der Bias hängt nicht von der Rauschstärke ",e.jsx(n,{children:"\\sigma"})," ab."]}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-der-bias-ist-der-approximationsfehler",children:"(13.8.2)"})," ist ",e.jsx(n,{children:"\\E[\\cgreen{\\wh{f}(x)}] = \\corange{\\bphi(x)}^\\top\\bB^+\\symbf{f}"}),`,
und darin kommt `,e.jsx(n,{children:"\\sigma"}),` nicht vor. Der Bias ist der Approximationsfehler, den
wir auch bei rauschfreien Daten hätten. Stärkeres Rauschen vergrößert die
Varianz, nicht die Verzerrung.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Die über die Entwurfsstellen gemittelte Varianz ist exakt ",e.jsx(n,{children:"\\sigma^2 K/n"}),`,
unabhängig davon, wo die Knoten liegen.`]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen-2",children:"(13.8.5)"}),`. Der Beweis benutzt nur, dass der Schätzer die
Kleinste-Quadrate-Anpassung an eine Designmatrix mit vollem Spaltenrang `,e.jsx(n,{children:"K"}),`
ist, dazu Unkorreliertheit und Homoskedastizität. Weder die Basis noch die
Knotenlage gehen ein, denn am Ende steht `,e.jsx(n,{children:"\\tr(\\bI_K) = K"}),`. Unsere Simulation
bestätigt es in jeder Zeile der Tabelle aus `,e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),"."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Dann ist auch die Varianz an jeder einzelnen Stelle ",e.jsx(n,{children:"x"})," gleich ",e.jsx(n,{children:"\\sigma^2 K/n"}),"."]}),e.jsxs(i.p,{children:["Gemittelt wird über die ",e.jsx(n,{children:"n"}),` Entwurfsstellen, und dort ist die Aussage exakt.
Zwischen den Datenpunkten und an den Rändern kann die Varianz weit darüber
liegen: Bei `,e.jsx(n,{children:"K = 40"}),` misst unsere Simulation über ein feines Gitter auf
`,e.jsx(n,{children:"[0, 2\\pi]"})," eine mittlere Varianz von ",e.jsx(n,{children:"5{,}04"})," statt ",e.jsx(n,{children:"0{,}036"}),`. Punktweise
gilt nur `,e.jsx(i.a,{href:"#eq-gemittelte-varianz-eines-linearen",children:"(13.8.4)"}),", und dort steht ",e.jsx(n,{children:"\\corange{\\bphi(x)}"})," im Ausdruck."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:"Im Minimum des MSE sind quadrierter Bias und Varianz allgemein gleich groß."}),e.jsxs(i.p,{children:["Schon im glatten Proxy-Modell sind am Optimum die ",e.jsx(i.em,{children:"Änderungsraten"}),`, nicht die
Beiträge gleich: `,e.jsx(n,{children:"g'(K^\\star)=0"}),` heißt, dass eine infinitesimale Verfeinerung
genauso viel Varianz kostet, wie sie an Bias spart. Für die spezielle Form
`,e.jsx(n,{children:"c_1K^{-8}+c_2K/n"}),` trägt der Bias dort ein Neuntel der Summe. Das ist eine
Eigenschaft dieses Modells, keine allgemeine MSE-Identität. Im simulierten
Beispiel liegt der Anteil bei `,e.jsx(n,{children:"K = 12"}),` zufällig ebenfalls nahe daran
(`,e.jsx(i.a,{href:"#env-bias-und-varianz-beim-sinusbeispiel",children:"Beispiel 13.8.8"}),")."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["GCV lässt sich ausrechnen, ohne ",e.jsx(n,{children:"f"})," zu kennen."]}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-generalisierte-kreuzvalidierung",children:"(13.8.8)"})," stehen nur die Residuenquadratsumme, ",e.jsx(n,{children:"n"})," und ",e.jsx(n,{children:"K"}),`, alles
beobachtbare Größen. Darum geht es bei den Modellwahlkriterien: Sie
schätzen den Vorhersagefehler, statt ihn zu messen, und deshalb treffen sie
das MSE-Optimum auch nur ungefähr: In `,e.jsx(i.a,{href:"#env-was-die-kriterien-in-unserem-datensatz",children:"Beispiel 13.8.13"})," wählt GCV ",e.jsx(n,{children:"K = 10"}),`,
während `,e.jsx(n,{children:"K = 12"})," am besten wäre."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Die Bias-Varianz-Zerlegung und die Modellwahlkriterien behandeln
T. Hastie, R. Tibshirani und J. Friedman, The Elements of Statistical
Learning, Kapitel 7; die generalisierte Kreuzvalidierung geht auf P. Craven
und G. Wahba, Smoothing noisy data with spline functions, Numerische
Mathematik 31 (1979), 377–403, zurück, P-Splines und additive Modelle
entwickelt S. N. Wood, Generalized Additive Models: An Introduction with R,
2. Auflage 2017.`})})]})}function nt(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(us,{...s})}):us(s)}const{gruen:ji,orange:pn,grau:kn,hellgrau:gs}=U,Vn=10,mi=8,it=["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];function Ms(s){return String(s).split("").map(i=>it[Number(i)]??i).join("")}function Jn(s,i){const r=s.toFixed(i);return(r.includes(".")?r.replace(/0+$/,"").replace(/\.$/,""):r).replace(".",",")}function de(s){if(!Number.isFinite(s))return"nicht darstellbar";if(s<1e5)return Math.round(s).toLocaleString("de-DE");const i=Math.floor(Math.log10(s)),r=s/Math.pow(10,i);return`${Math.abs(r-1)<1e-9?"":`${Jn(r,2)} · `}10${Ms(i)}`}function nn(s){if(!Number.isFinite(s))return"nicht darstellbar";const i=[[1e15,"PB"],[1e12,"TB"],[1e9,"GB"],[1e6,"MB"],[1e3,"kB"]];for(const[r,t]of i)if(s>=r){const d=s/r;return`${d>=100?Jn(d,0):Jn(d,d>=10?1:2)} ${t}`}return`${Math.round(s)} Bytes`}const wn=380,_e=240,Z={l:46,r:14,t:14,b:34};function st(){const[s,i]=q.useState(5),[r,t]=q.useState(10),d=q.useMemo(()=>{const u=[];for(let j=1;j<=Vn;j++)u.push({p:j,tensor:Math.pow(r,j),additiv:j*(r-1)+1});return u},[r]),l=d[s-1],a=8/(8+s),h=Math.pow(10,(8+s)/4),o=Math.max(1,Math.log10(d[Vn-1].tensor)),g=o>9?3:o>5?2:1,f=[];for(let u=0;u<=o+1e-9;u+=g)f.push(u);const k=u=>Z.l+(u-1)/(Vn-1)*(wn-Z.l-Z.r),c=u=>_e-Z.b-u/o*(_e-Z.t-Z.b),z=u=>d.map((j,m)=>`${m===0?"M":"L"}${k(j.p)},${c(Math.log10(u(j)))}`).join(" "),_=l.tensor*mi,p=s===1?`Bei p = 1 gibt es nichts zu vergleichen: ${de(l.tensor)} gegen ${de(l.additiv)} Koeffizienten, beide Ansätze sind dieselbe univariate Anpassung. Der Fluch beginnt erst mit der zweiten Variablen.`:_<1e6?`Mit p = ${s} und K = ${r} kostet die Tensor-Produkt-Basis ${de(l.tensor)} Koeffizienten (${nn(_)}). Das passt noch bequem in den Speicher, und wir brauchen mindestens ebenso viele Beobachtungen, damit die Designmatrix vollen Spaltenrang haben kann.`:_<1e9?`Mit p = ${s} und K = ${r} sind es ${de(l.tensor)} Koeffizienten (${nn(_)}). Der Speicher reicht noch, die geforderten ${de(l.tensor)} Beobachtungen sind in den meisten Anwendungen aber schon die härtere Schranke. Das additive Modell käme nach Zentrierung mit ${de(l.additiv)} freien Parametern aus.`:`Mit p = ${s} und K = ${r} verlangt die Tensor-Produkt-Basis ${de(l.tensor)} Koeffizienten, also ${nn(_)} allein für den Koeffizienten-Tensor. Praktikabel ist das nicht mehr; das additive Modell braucht nach Zentrierung nur ${de(l.additiv)} freie Parameter (${nn(l.additiv*mi)}).`;return e.jsxs("div",{className:"space-y-3",children:[e.jsx(te,{children:"Stellen wir K und p ein und vergleichen die beiden Modellgrößen."}),e.jsx(J,{label:"Dimension p",min:1,max:Vn,step:1,value:s,onChange:i,accent:pn}),e.jsx(J,{label:"Basisfunktionen K je Variable",min:4,max:20,step:1,value:r,onChange:t,accent:pn}),e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("svg",{viewBox:`0 0 ${wn} ${_e}`,className:"max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600",children:[e.jsx("rect",{x:Z.l,y:Z.t,width:wn-Z.l-Z.r,height:_e-Z.t-Z.b,fill:"none",stroke:gs,strokeWidth:.8}),f.map(u=>e.jsxs("g",{children:[e.jsx("line",{x1:Z.l-3,x2:wn-Z.r,y1:c(u),y2:c(u),stroke:gs}),e.jsxs("text",{x:Z.l-5,y:c(u)+3,textAnchor:"end",fontSize:9,fill:kn,children:["10",Ms(u)]})]},`y${u}`)),d.map(u=>e.jsx("text",{x:k(u.p),y:_e-Z.b+14,textAnchor:"middle",fontSize:9,fill:kn,children:u.p},`x${u.p}`)),e.jsx("text",{x:(Z.l+wn-Z.r)/2,y:_e-4,textAnchor:"middle",fontSize:9,fill:kn,children:"Dimension p"}),e.jsx("text",{x:12,y:(Z.t+_e-Z.b)/2,textAnchor:"middle",fontSize:9,fill:kn,transform:`rotate(-90 12 ${(Z.t+_e-Z.b)/2})`,children:"Koeffizienten"}),e.jsx("line",{x1:k(s),x2:k(s),y1:Z.t,y2:_e-Z.b,stroke:kn,strokeWidth:.8,strokeDasharray:"3 3"}),e.jsx("path",{d:z(u=>u.tensor),fill:"none",stroke:pn,strokeWidth:2.2}),e.jsx("path",{d:z(u=>u.additiv),fill:"none",stroke:ji,strokeWidth:2.2}),e.jsx("circle",{cx:k(s),cy:c(Math.log10(l.tensor)),r:4,fill:pn}),e.jsx("circle",{cx:k(s),cy:c(Math.log10(l.additiv)),r:4,fill:ji}),e.jsx("text",{x:Z.l+6,y:Z.t+12,fontSize:9,fill:pn,children:"Tensorprodukt"}),e.jsx("text",{x:Z.l+6,y:Z.t+24,fontSize:9,fill:ji,children:"additiv"})]}),e.jsx("div",{className:"grow overflow-x-auto rounded border border-slate-300 dark:border-slate-600",children:e.jsxs("table",{className:"w-full text-right font-mono text-xs",children:[e.jsx("thead",{className:"bg-slate-100 dark:bg-slate-800",children:e.jsxs("tr",{className:"text-slate-600 dark:text-slate-300",children:[e.jsxs("th",{className:"px-2 py-1 text-left",children:["p = ",s,", K = ",r]}),e.jsx("th",{className:"px-2 py-1",children:"Tensorprodukt"}),e.jsx("th",{className:"px-2 py-1",children:"additiv"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Zahl im Modell"}),e.jsx("td",{className:"px-2 py-0.5",children:de(l.tensor)}),e.jsx("td",{className:"px-2 py-0.5",children:de(l.additiv)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Speicher (8 Byte)"}),e.jsx("td",{className:"px-2 py-0.5",children:nn(_)}),e.jsx("td",{className:"px-2 py-0.5",children:nn(l.additiv*mi)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Beobachtungen mindestens"}),e.jsx("td",{className:"px-2 py-0.5",children:de(l.tensor)}),e.jsx("td",{className:"px-2 py-0.5",children:de(l.additiv)})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"balancierte MSE-Obergrenze"}),e.jsxs("td",{className:"px-2 py-0.5",colSpan:2,children:["n",e.jsxs("sup",{children:["−",Jn(a,3)]})," = n",e.jsxs("sup",{children:["−8/",8+s]})]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-0.5 text-left",children:"Proxy-n (Konstante 1)"}),e.jsx("td",{className:"px-2 py-0.5",colSpan:2,children:de(h)})]})]})]})})]}),e.jsxs(le,{kind:s>=6?"warn":"neutral",children:[p," Das ordnet die Skalierung aus ",ce("satz:eine-mse-obergrenze-im-multivariaten")," ein."]})]})}function js(s){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Alles, was wir bisher gerechnet haben, spielte auf einem Intervall: eine
Variable, Knoten darauf, eine Kurve. Reale Datensätze bringen mehr als eine
Kovariable mit. Dieser Abschnitt überträgt den Basisansatz auf
`,e.jsx(n,{children:"f\\colon \\R^p \\to \\R"}),`. Die Übertragung selbst gelingt mühelos, sie ist eine
Anwendung des Tensorprodukts aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.4",children:"Abschnitt 9.4"}),`. Bezahlen müssen wir sie mit einem
Aufwand, der in `,e.jsx(n,{children:"p"}),` exponentiell wächst. Danach ziehen wir Bilanz, für das
Kapitel und für das ganze Skript.`]}),`
`,e.jsx(i.h3,{children:"Tensor-Produkt-Basen"}),`
`,e.jsxs(i.p,{children:[`Eine Basis für Funktionen mehrerer Variablen bauen wir nicht neu, sondern aus
den univariaten Bausteinen zusammen, die wir schon haben. Aus `,e.jsx(n,{children:"K"}),`
Basisfunktionen pro Variable entstehen alle möglichen Produkte.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.9.1 (Tensor-Produkt-Basis)",id:"env-tensor-produkt-basis",children:[e.jsxs(i.p,{children:["Für jede Variable ",e.jsx(n,{children:"x_r"})," sei ein ",e.jsx(n,{children:"K"}),`-dimensionaler Funktionenraum auf einem
Intervall `,e.jsx(n,{children:"I_r"}),` mit Basis
`,e.jsx(n,{children:"\\corange{\\phi_{r1}}, \\dots, \\corange{\\phi_{rK}}"}),` gegeben, etwa ein
B-Spline-Raum aus
`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`. Die zugehörige
`,e.jsx(i.em,{children:"Tensor-Produkt-Basis"})," auf ",e.jsx(n,{children:"I_1\\times\\dots\\times I_p"})," besteht aus den ",e.jsx(n,{children:"K^p"}),`
Produkten`]}),e.jsx(y,{children:`\\corange{\\phi_{1j_1}(x_1)} \\times \\cdots \\times \\corange{\\phi_{pj_p}(x_p)},
\\qquad j_1, \\dots, j_p \\in \\{1, \\dots, K\\} ,`}),e.jsxs(i.p,{children:["und der Ansatz für ",e.jsx(n,{children:"f\\colon I_1\\times\\dots\\times I_p \\to \\R"})," lautet"]}),e.jsx(T,{tag:"13.9.1",id:"eq-tensor-produkt-basis",children:`\\cgreen{\\wh{f}(\\bx)}
= \\sum_{j_1 = 1}^{K} \\cdots \\sum_{j_p = 1}^{K} a_{j_1, \\dots, j_p}
\\bigl(\\corange{\\phi_{1j_1}(x_1)} \\times \\cdots \\times \\corange{\\phi_{pj_p}(x_p)}\\bigr)`}),e.jsxs(i.p,{children:["mit dem Koeffizienten-",e.jsx(S,{id:"tensor",children:"Tensor"})]}),e.jsx(y,{children:`\\bA = \\bigl(a_{j_1, \\dots, j_p}\\bigr)_{j_i = 1, \\dots, K,\\; i = 1, \\dots, p}
\\in \\R^{K \\times \\cdots \\times K} .`})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.2 (Was Kapitel 9 dazu schon gesagt hat)",id:"env-was-kapitel-9-dazu-schon-gesagt-hat",children:[e.jsxs(i.p,{children:[`Die Konstruktion ist genau das Tensorprodukt von Funktionenräumen aus
`,e.jsx(i.a,{href:"?k=09-tensoren#sec-9.4",children:"Abschnitt 9.4"}),`. Dort haben wir gesehen, dass die
Produkte von Basiselementen wieder eine Basis bilden und dass sich die
`,e.jsx(S,{id:"dimension",children:"Dimensionen"})," dabei multiplizieren, für ",e.jsx(n,{children:"p"}),` Faktoren also
`,e.jsx(n,{children:"K \\cdot K \\cdots K = K^p"}),". Für Polynome vom Grad höchstens ",e.jsx(n,{children:"d"}),` in jeder
Variablen stand dort die Zahl `,e.jsx(n,{children:"(d+1)^k"}),`, und der Name für das, was daraus
folgt, fiel ebenfalls schon: `,e.jsx(i.em,{children:"Fluch der Dimensionalität"}),` (curse of
dimensionality).`]}),e.jsxs(i.p,{children:["Anschaulich legen wir ein Gitter über den ",e.jsx(n,{children:"p"}),`-dimensionalen Raum. In jeder
Variablen sitzen `,e.jsx(n,{children:"K"}),` Basisfunktionen mit ihren Knoten, und jede
Basisfunktion des Produkts gehört zu einer Zelle dieses Gitters. Der Ansatz
ist bequem, weil wir für jede Variable dieselben eindimensionalen Bausteine
verwenden können, und teuer, weil das Gitter mit jeder Variablen um einen
Faktor `,e.jsx(n,{children:"K"})," wächst."]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.3 (Es bleibt ein lineares Kleinste-Quadrate-Problem)",id:"env-es-bleibt-ein-lineares-kleinste-quadrate",children:[e.jsxs(i.p,{children:["Der Ansatz ",e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"}),` ist linear in den Koeffizienten, und daran ändert die
Tensorschreibweise nichts. Nummerieren wir die `,e.jsx(n,{children:"K^p"}),` Indexkombinationen
`,e.jsx(n,{children:"(j_1, \\dots, j_p)"})," durch, so wird aus ",e.jsx(n,{children:"\\bA"}),` ein Vektor
`,e.jsx(n,{children:"\\cgreen{\\ba} \\in \\R^{K^p}"}),`, und mit der Designmatrix
`,e.jsx(n,{children:"\\corange{\\bB} \\in \\R^{n \\times K^p}"}),", deren Zeilen die ",e.jsx(n,{children:"K^p"}),` Produkte an der
Beobachtungsstelle `,e.jsx(n,{children:"\\cblue{\\bx_i}"})," enthalten, steht wieder"]}),e.jsx(y,{children:"\\min_{\\cgreen{\\ba}} \\left\\| \\cblue{\\by} - \\corange{\\bB}\\,\\cgreen{\\ba} \\right\\|_2^2"}),e.jsxs(i.p,{children:["da: dasselbe Problem wie in ",e.jsx(i.a,{href:"#env-glaettung-ist-ein-lineares-kleinste",children:"Satz 13.7.5"}),`, nur mit mehr Spalten. Gelöst wird es
mit denselben Mitteln, über die
`,e.jsx(S,{id:"normal-equations",children:"Normalengleichungen"}),` oder besser über eine
QR-Zerlegung (`,e.jsx(i.a,{href:"?k=07-kq#sec-7.4",children:"Abschnitt 7.4"}),")."]}),e.jsxs(i.p,{children:[`Die Spaltenzahl ist die schlechte Nachricht. Vollen Spaltenrang kann
`,e.jsx(n,{children:"\\corange{\\bB}"})," nur haben, wenn ",e.jsx(n,{children:"n \\ge K^p"}),` ist, und das ist eine harte
Schranke: Mit `,e.jsx(n,{children:"K = 10"})," Basisfunktionen je Variable und ",e.jsx(n,{children:"p = 5"}),` Kovariablen
brauchen wir mindestens `,e.jsx(n,{children:"100\\,000"}),` Beobachtungen, bevor die Anpassung
überhaupt eindeutig ist.`]})]}),`
`,e.jsx(i.h3,{children:"Der Fluch der Dimensionalität"}),`
`,e.jsxs(i.p,{children:["Drei Größen wachsen exponentiell in ",e.jsx(n,{children:"p"}),`, und jede für sich reicht aus, um den
vollen Tensoransatz jenseits weniger Variablen unbrauchbar zu machen: der
Speicher für `,e.jsx(n,{children:"\\bA"}),`, der Aufwand einer Auswertung und die Datenmenge, die für
eine feste Genauigkeit nötig ist.`]}),`
`,e.jsxs(w,{kind:"Beispiel",label:"13.9.4 (Zehn Basisfunktionen je Variable)",id:"env-zehn-basisfunktionen-je-variable",children:[e.jsxs(i.p,{children:["Wir rechnen mit ",e.jsx(n,{children:"K = 10"}),` und speichern jeden Koeffizienten als
`,e.jsx(S,{id:"floating-point",children:"Gleitkommazahl"})," doppelter Genauigkeit, also mit ",e.jsx(n,{children:"8"}),` Byte
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.1",children:"Abschnitt 4.1"}),")."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Dimension ",e.jsx(n,{children:"p"})]}),e.jsxs(i.th,{style:{textAlign:"right"},children:["Koeffizienten ",e.jsx(n,{children:"K^p"})]}),e.jsx(i.th,{style:{textAlign:"right"},children:"Speicher"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"80"})," Bytes"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"100"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"800"})," Bytes"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"3"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"1000"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"8"})," kB"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"100\\,000"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"800"})," kB"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{10}"})}),e.jsxs(i.td,{style:{textAlign:"right"},children:[e.jsx(n,{children:"\\cred{80}"})," GB"]})]})]})]}),e.jsxs(i.p,{children:["Bis ",e.jsx(n,{children:"p = 3"})," ist der Koeffizienten-Tensor ein Nichts, bei ",e.jsx(n,{children:"p = 5"}),` noch
handlich, bei `,e.jsx(n,{children:"p = 10"}),` passt er auf keinen üblichen Arbeitsspeicher. Die
Speicherangaben verwenden dezimale Präfixe, `,e.jsx(n,{children:"1"})," kB sind also ",e.jsx(n,{children:"1000"}),` Bytes;
binär gerechnet sind die `,e.jsx(n,{children:"8 \\cdot 10^{10}"}),` Bytes der letzten Zeile
`,e.jsx(n,{children:"74{,}5"})," GiB. Der Sprung von ",e.jsx(n,{children:"p = 5"})," auf ",e.jsx(n,{children:"p = 10"})," ist ein Faktor ",e.jsx(n,{children:"10^5"}),`,
und der kommt allein daher, dass fünf weitere Variablen dazukommen.`]})]}),`
`,e.jsxs(i.p,{children:[`Der statistische Preis ist derselbe. Er lässt sich mit dem, was wir in
`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," gerechnet haben, direkt hinschreiben."]}),`
`,e.jsxs(w,{kind:"Satz",label:"13.9.5 (Eine MSE-Obergrenze im Multivariaten)",id:"env-eine-mse-obergrenze-im-multivariaten",children:[e.jsxs(i.p,{children:["Wir beobachten ",e.jsx(n,{children:"\\cblue{y_i} = f(\\cblue{\\bx_i}) + \\cred{\\epsilon_i}"})," an ",e.jsx(n,{children:"n"}),`
festen Stellen mit unkorrelierten, homoskedastischen Fehlern vom Mittelwert
null und passen
`,e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"}),` mit kubischen Spline-Bausteinen auf einem gleichmäßigen Gitter an.
Hat `,e.jsx(n,{children:"\\corange{\\bB}"})," vollen Spaltenrang ",e.jsx(n,{children:"K^p"}),` und besitzt die verwendete
Tensorprodukt-Splinefolge für `,e.jsx(n,{children:"f"}),` eine gleichmäßige Approximationsschranke
`,e.jsx(n,{children:"\\inf_{s\\in\\Fcal_K}\\|f-s\\|_\\infty\\le C K^{-4}"}),` (etwa unter den üblichen
Glattheitsannahmen an die partiellen Ableitungen vierter Ordnung), so gilt
für den an den Entwurfsstellen gemittelten Fehler`]}),e.jsx(T,{tag:"13.9.2",id:"eq-eine-mse-obergrenze-im-multivariaten",children:`\\MSE(\\cgreen{\\wh{f}})
\\;\\le\\; \\underbrace{C_1K^{-8}}_{\\cred{\\text{Bias}^2\\text{-Schranke}}}
+ \\underbrace{\\frac{\\sigma^2 K^p}{n}}_{\\text{Varianz}}`}),e.jsxs(i.p,{children:["mit einer Konstante ",e.jsx(n,{children:"C_1>0"}),`. Die Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"})," balanciert die rechte Seite und liefert die Garantie"]}),e.jsx(T,{tag:"13.9.3",id:"eq-eine-mse-obergrenze-im-multivariaten-2",children:"\\MSE(\\cgreen{\\wh{f}}) = O\\bigl(n^{-8/(8+p)}\\bigr) ."})]}),`
`,e.jsxs(Q,{title:"Wie sich die Rate im Multivariaten ausbalanciert",children:[e.jsxs(i.p,{children:["Der Beweis ist die Rechnung aus ",e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"})," mit ",e.jsx(n,{children:"K^p"})," statt ",e.jsx(n,{children:"K"}),`
Spalten: Varianzsatz übernehmen, Bias-Schranke voraussetzen, Summe
minimieren, einsetzen.`]}),e.jsxs(he,{children:[e.jsx(K,{why:e.jsxs(e.Fragment,{children:["am Ende des Beweises steht ",e.jsx(n,{children:"\\tr(\\bI_{K^p}) = K^p"})," statt ",e.jsx(n,{children:"\\tr(\\bI_K) = K"})]}),children:e.jsxs(i.p,{children:["Der Varianzterm ist ",e.jsx(i.a,{href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"}),`, wörtlich. Dessen Beweis benutzt vom
Schätzer nur, dass er die Kleinste-Quadrate-Anpassung an eine Designmatrix
mit vollem Spaltenrang ist; wie viele Spalten sie hat und wie ihre Einträge
zustande kommen, geht nicht ein. Hier sind es `,e.jsx(n,{children:"K^p"}),` Spalten, also ist die
gemittelte Varianz `,e.jsx(n,{children:"\\sigma^2 K^p / n"}),"."]})}),e.jsx(K,{why:e.jsxs(e.Fragment,{children:["dieselbe Vergleichsrechnung wie in ",e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),"; die genaue Herleitung der Tensorprodukt-Schranke gehört zur mehrdimensionalen Approximationstheorie und wird hier als Voraussetzung sichtbar gemacht"]}),children:e.jsxs(i.p,{children:[`Für den Bias verwenden wir die im Satz ausdrücklich vorausgesetzte
Tensorprodukt-Approximation. Der rauschfreie KQ-Fit ist an den
Entwurfsstellen mindestens so gut wie dieser Vergleichsspline, also ist der
gemittelte quadrierte Bias höchstens `,e.jsx(n,{children:"C_1K^{-8}"}),"."]})}),e.jsxs(K,{why:e.jsxs(e.Fragment,{children:["Multiplikation mit ",e.jsx(n,{children:"K^9 n/(c_2 p)"})," sammelt alle ",e.jsx(n,{children:"K"}),"-Potenzen auf einer Seite; ",e.jsx(n,{children:"g"})," fällt für kleine und wächst für große ",e.jsx(n,{children:"K"}),", die einzige positive Nullstelle ist also das Minimum"]}),children:[e.jsxs(i.p,{children:[`Wir minimieren nun die bewiesene Obergrenze
`,e.jsx(n,{children:"g(K) = c_1 K^{-8} + c_2 K^p / n"})," mit Konstanten ",e.jsx(n,{children:"c_1, c_2 > 0"}),`. Ableiten
und Nullsetzen gibt`]}),e.jsx(y,{children:`g'(K) = -8 c_1 K^{-9} + \\frac{c_2\\, p\\, K^{p-1}}{n} \\overset{!}{=} 0
\\quad\\Longrightarrow\\quad
K^{8+p} = \\frac{8 c_1 n}{c_2\\, p} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"K^\\star \\sim n^{1/(8+p)}"}),"."]})]}),e.jsxs(K,{why:e.jsx(e.Fragment,{children:e.jsx(n,{children:"p/(8+p) - 1 = (p - 8 - p)/(8+p) = -8/(8+p)"})}),children:[e.jsxs(i.p,{children:["Einsetzen von ",e.jsx(n,{children:"K^\\star"})," in beide Summanden liefert"]}),e.jsx(y,{children:`c_1 (K^\\star)^{-8} \\sim n^{-8/(8+p)},
\\qquad
\\frac{c_2 (K^\\star)^p}{n} \\sim n^{p/(8+p) - 1} = n^{-8/(8+p)} ,`}),e.jsxs(i.p,{children:["und damit ",e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten-2",children:"(13.9.3)"}),"."]})]})]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.6 (Was die Rate über Datenmengen sagt)",id:"env-was-die-rate-ueber-datenmengen-sagt",children:[e.jsxs(i.p,{children:["Gleichung ",e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten-2",children:"(13.9.3)"}),` ist eine Obergrenze bei einer Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"}),", nicht der Fehler für jedes ",e.jsx(n,{children:"K"}),`. Sie beschreibt eine
garantierte Balance der beiden Schranken; dass diese Wahl den tatsächlichen
MSE minimiert, würde zusätzliche untere Schranken verlangen.`]}),e.jsxs(i.p,{children:["Als grobe Planungsheuristik setzen wir die in der ",e.jsx(n,{children:"\\mathcal O"}),`-Notation
verborgene Konstante gleich eins. Welches `,e.jsx(n,{children:"n"}),` legt diese Proxy-Rechnung nahe,
damit der MSE unter eine Schranke `,e.jsx(n,{children:"\\varepsilon"}),` fällt? Aus
`,e.jsx(n,{children:"n^{-8/(8+p)} \\le \\varepsilon"})," folgt ",e.jsx(n,{children:"n \\ge \\varepsilon^{-(8+p)/8}"}),`, für
`,e.jsx(n,{children:"\\varepsilon = 0{,}01"})," also ",e.jsx(n,{children:"n \\ge 10^{(8+p)/4}"}),"."]}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{style:{textAlign:"left"},children:["Dimension ",e.jsx(n,{children:"p"})]}),e.jsx(i.th,{style:{textAlign:"right"},children:"Rate"}),e.jsxs(i.th,{style:{textAlign:"right"},children:["Proxy-",e.jsx(n,{children:"n"})," bei Konstante ",e.jsx(n,{children:"1"})]})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/9}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{2{,}25} \\approx 178"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/10} = n^{-0{,}8}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{2{,}5} \\approx 316"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"5"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/13}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{3{,}25} \\approx 1778"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{style:{textAlign:"left"},children:e.jsx(n,{children:"10"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"n^{-8/18}"})}),e.jsx(i.td,{style:{textAlign:"right"},children:e.jsx(n,{children:"10^{4{,}5} \\approx 31\\,623"})})]})]})]}),e.jsxs(i.p,{children:[`Die dritte Spalte ist eine reine Orientierung und keine garantierte
Stichprobenplanung, denn die entscheidenden Konstanten hängen am Problem und
nicht an der Rate; in `,e.jsx(i.a,{href:"#env-heuristisches-balance-modell-fuer-die",children:"Bemerkung 13.8.7"})," haben wir für ",e.jsx(n,{children:"p = 1"}),` gesehen, wie weit
die versteckte Konstante eine solche Zahl verschieben kann.`]}),e.jsxs(i.p,{children:[`Die Botschaft der Spalte bleibt davon unberührt, und sie steckt im Exponenten
`,e.jsx(n,{children:"(8+p)/4"}),`. Jede weitere Variable multipliziert die nötige Datenmenge mit
`,e.jsx(n,{children:"10^{1/4} \\approx 1{,}78"}),`, bei schärferer Genauigkeitsforderung mit noch mehr:
für `,e.jsx(n,{children:"\\varepsilon = 10^{-4}"})," mit ",e.jsx(n,{children:"\\varepsilon^{-1/8} \\approx 3{,}16"}),` je
Dimension. Der Datenhunger wächst also exponentiell in `,e.jsx(n,{children:"p"}),`, ganz so wie der
Speicherbedarf.`]})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.7 (Auch die Auswertung kostet)",id:"env-auch-die-auswertung-kostet",children:[e.jsxs(i.p,{children:["Für eine einzelne Auswertung von ",e.jsx(n,{children:"\\cgreen{\\wh{f}}"}),` steht zunächst der
Aufwand `,e.jsx(n,{children:"O(K^p)"}),`, und das ist die ehrliche Zahl für eine Basis ohne besondere
Struktur: Die Summe in `,e.jsx(i.a,{href:"#eq-tensor-produkt-basis",children:"(13.9.1)"})," hat ",e.jsx(n,{children:"K^p"})," Summanden."]}),e.jsxs(i.p,{children:[`Mit B-Splines wird es besser, denn die haben kompakten Träger
(`,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`). An einer festen
Stelle `,e.jsx(n,{children:"x"})," sind von den ",e.jsx(n,{children:"K"})," Basisfunktionen einer Variablen höchstens ",e.jsx(n,{children:"q+1"}),`
von null verschieden, bei kubischen also vier. Im Produkt bleiben damit
höchstens `,e.jsx(n,{children:"(q+1)^p"})," Summanden übrig, für ",e.jsx(n,{children:"p = 10"})," und ",e.jsx(n,{children:"q = 3"}),` noch
`,e.jsx(n,{children:"4^{10} = 1\\,048\\,576"})," statt ",e.jsx(n,{children:"10^{10}"}),`. Das ist eine Ersparnis um fünf
Größenordnungen und ändert nichts am Grundproblem: `,e.jsx(n,{children:"4^p"}),` wächst exponentiell
wie `,e.jsx(n,{children:"10^p"}),", nur mit kleinerer Basis. Gespeichert werden müssen die ",e.jsx(n,{children:"K^p"}),`
Koeffizienten ohnehin alle.`]})]}),`
`,e.jsx(i.h3,{children:"Additive Modelle statt voller Produkte"}),`
`,e.jsxs(i.p,{children:["Der Ausweg ist keine bessere Numerik, sondern eine Annahme über ",e.jsx(n,{children:"f"}),`. Wenn wir
darauf verzichten, beliebige Wechselwirkungen zwischen den Variablen
darzustellen, schrumpft der Ansatzraum dramatisch.`]}),`
`,e.jsxs(w,{kind:"Definition",label:"13.9.8 (Additives Modell)",id:"env-additives-modell",children:[e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"additives Regressionsmodell"}),` setzt statt des vollen Tensorprodukts eine
Summe univariater Funktionen an:`]}),e.jsx(T,{tag:"13.9.4",id:"eq-additives-modell",children:"\\cgreen{\\wh{f}(\\bx)} = \\beta_0 + \\sum_{i=1}^{p} \\cgreen{f_i(x_i)} ,"}),e.jsxs(i.p,{children:["wobei jede Komponente ",e.jsx(n,{children:"\\cgreen{f_i}"})," in einem eigenen ",e.jsx(n,{children:"K"}),`-dimensionalen
Ansatzraum liegt, etwa dem der kubischen Splines aus
`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"."]}),e.jsxs(i.p,{children:["Ein ",e.jsx(i.em,{children:"generalisiertes additives Modell"}),` (GAM) erweitert diese Form wie ein
generalisiertes lineares Modell um eine Verteilung für `,e.jsx(n,{children:"Y\\mid X"}),` und eine
Linkfunktion `,e.jsx(n,{children:"g"}),":"]}),e.jsx(y,{children:`g\\!\\left(\\E[Y\\mid X=\\bx]\\right)
= \\beta_0 + \\sum_{i=1}^p f_i(x_i).`}),e.jsx(i.p,{children:"Für Gaußfehler und die Identitätslink ist das genau das additive Modell oben."})]}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.9 (Der Gewinn, und was er kostet)",id:"env-der-gewinn-und-was-er-kostet",children:[e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Skalierbar."})," In der rohen Darstellung stehen ",e.jsx(n,{children:"pK+1"}),` Koeffizienten statt
`,e.jsx(n,{children:"K^p"}),`. Nach den nötigen Zentrierungsbedingungen sind davon
`,e.jsx(n,{children:"p(K-1)+1=O(pK)"})," frei wählbar. Für ",e.jsx(n,{children:"p=10"})," und ",e.jsx(n,{children:"K=10"})," sind das ",e.jsx(n,{children:"91"}),` freie
Parameter gegen `,e.jsx(n,{children:"10^{10}"}),", ein Faktor von gut ",e.jsx(n,{children:"10^8"}),`. Aus dem Wachstum in
`,e.jsx(n,{children:"p"})," wird ein lineares."]}),e.jsxs(i.p,{children:["Die geläufige Kurzformel lautet ",e.jsx(n,{children:"pK"}),`; um diese Zahl sauber zu bekommen,
räumen wir kurz auf: Zu den `,e.jsx(n,{children:"pK"}),` Komponenten-Koeffizienten kommt der Achsenabschnitt
`,e.jsx(n,{children:"\\beta_0"}),`, dafür ist jede Komponente nur bis auf eine additive Konstante
bestimmt, denn eine Konstante ließe sich von `,e.jsx(n,{children:"\\cgreen{f_1}"}),` nach
`,e.jsx(n,{children:"\\cgreen{f_2}"})," verschieben, ohne ",e.jsx(i.a,{href:"#eq-additives-modell",children:"(13.9.4)"}),` zu ändern. Üblich ist deshalb eine
Zentrierungsbedingung an jede Komponente, etwa dass sich ihre Werte an den
Beobachtungsstellen zu null summieren; dann bleiben `,e.jsx(n,{children:"p(K-1) + 1"}),` frei wählbare
Koeffizienten. Die Größenordnung `,e.jsx(n,{children:"pK"}),` stimmt, die Buchführung ist ein wenig
feiner.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Interpretierbar."}),` Jede Komponente ist eine Funktion einer einzigen Variablen
und lässt sich als Kurve zeichnen. Den Effekt einer Kovariablen können wir
also ansehen; beim vollen Tensorprodukt ist er nur gemeinsam mit allen
anderen Variablen definiert.`]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Der Preis."}),` Wechselwirkungen fallen weg. Ein GAM kann nicht darstellen, dass
die Wirkung von `,e.jsx(n,{children:"x_1"})," vom Wert von ",e.jsx(n,{children:"x_2"}),` abhängt. Wo einzelne solche
Wechselwirkungen gebraucht werden, nehmen wir sie gezielt als
Tensorprodukt-Term für zwei oder drei Variablen dazu und behalten für den Rest
die additive Struktur. In R ist `,e.jsx(i.code,{children:"mgcv::gam()"}),` die Standardadresse, mit
automatischer Wahl der Glättungsparameter über die Kriterien aus
`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),"."]})]}),`
`,e.jsxs(re,{title:"Zwei Kurven auf logarithmischer Achse",children:[e.jsxs(i.p,{children:["Das Widget stellt die beiden Zählungen nebeneinander. Orange die ",e.jsx(n,{children:"K^p"}),`
Koeffizienten des vollen Tensorprodukts, grün die `,e.jsx(n,{children:"p(K-1)+1"}),` freien Parameter
des zentrierten additiven Modells, beides über der Dimension `,e.jsx(n,{children:"p"}),` und mit
logarithmischer senkrechter Achse. Der Tensoransatz ist dort eine Gerade, das
additive Modell eine flach liegende Kurve.`]}),e.jsxs(i.p,{children:["Der zweite Regler ändert ",e.jsx(n,{children:"K"}),`. Er verschiebt die grüne Kurve kaum und kippt die
orange Gerade steiler oder flacher: Bei einer Geraden im logarithmischen Bild
sitzt `,e.jsx(n,{children:"K"}),` in der Steigung. Die Tafel daneben rechnet Speicherbedarf,
Mindestzahl an Beobachtungen und die Konvergenzrate zum eingestellten Zustand
mit.`]}),e.jsx(i.p,{children:"Wie groß vermuten wir den Speicherbedarf des vollen Tensorprodukts bei zehn Variablen und zehn Basisfunktionen?"}),e.jsx(Ue,{frage:"Schätzen wir den Speicherbedarf in GB für K = 10 und p = 10.",loesung:80,toleranz:5,einheit:"GB",children:e.jsx(st,{})})]}),`
`,e.jsx(Q,{title:"Additivität ist mehr als ein Verzicht",children:e.jsx(w,{kind:"Bemerkung",label:"13.9.10 (Warum das mehr ist als eine Notlösung)",id:"env-warum-das-mehr-ist-als-eine-notloesung",children:e.jsxs(i.p,{children:["Die Additivität sieht nach einem bloßen Verzicht aus. Ist ",e.jsx(n,{children:"f"}),` tatsächlich
additiv und bleibt `,e.jsx(n,{children:"p"}),` fest, so ist sie mehr als das: Unter den üblichen
Regularitäts- und Designannahmen lassen sich die einzelnen Komponenten mit
derselben eindimensionalen Rate schätzen wie eine univariate Funktion; `,e.jsx(n,{children:"p"}),`
geht dann in die Konstante ein. Für vierfach glatte Komponenten wird aus der
vollen Rate `,e.jsx(n,{children:"n^{-8/(8+p)}"})," wieder die univariate Rate ",e.jsx(n,{children:"n^{-8/9}"}),`. Der Fluch
der Dimensionalität ist damit nicht bekämpft, sondern durch eine
Strukturannahme umgangen. Entsprechende Optimalitätsresultate gehen auf
C. J. Stone (1985) zurück und sind ein Grund, warum additive Modelle in der
Statistik so verbreitet sind.`]})})}),`
`,e.jsx(i.h3,{children:"Verstreute Punkte ohne Gitter"}),`
`,e.jsxs(i.p,{children:[`Tensor-Produkt-Basis und additives Modell haben eines gemeinsam: Beide
behandeln die Variablen getrennt und setzen die Bausteine anschließend
zusammen. Für Stellen, die als verstreute Punkte im `,e.jsx(n,{children:"\\R^p"}),` anfallen, passt
das schlecht: Messstationen auf einer Landkarte liegen nicht auf einem Gitter,
und ein Gitter, das sie alle abdeckt, wäre in weiten Teilen leer. Die übliche
Antwort sind `,e.jsx(i.em,{children:"radiale Basisfunktionen"}),` (radial basis functions), die statt
eines Gitters nur Zentren brauchen und den Ansatz linear in den Koeffizienten
lassen.`]}),`
`,e.jsx(Q,{title:"Basisfunktionen, die nur vom Abstand abhängen",children:e.jsxs(w,{kind:"Bemerkung",label:"13.9.11 (Radiale Basisfunktionen)",id:"env-radiale-basisfunktionen",children:[e.jsxs(i.p,{children:["Eine radiale Basisfunktion hängt nur vom Abstand zu einem Zentrum ",e.jsx(n,{children:"\\bc_k"})," ab,"]}),e.jsx(y,{children:`\\corange{\\phi_k(\\bx)} = \\rho\\left(\\left\\| \\bx - \\bc_k \\right\\|\\right),
\\qquad \\text{etwa mit } \\rho(r) = \\exp\\left(-r^2 / (2h^2)\\right),`}),e.jsxs(i.p,{children:[`oft nimmt man als Zentren die Datenpunkte selbst. Es ist wieder das
Kleinste-Quadrate-Problem aus `,e.jsx(i.a,{href:"#env-es-bleibt-ein-lineares-kleinste-quadrate",children:"Bemerkung 13.9.3"}),`,
nur mit anderen Spalten.`]}),e.jsxs(i.p,{children:[`Bezahlt wird die Freiheit mit der Struktur. Die Basismatrix ist im
Allgemeinen voll besetzt, denn eine Gaußglocke wird nirgends exakt null, und
damit ist die Lokalität der B-Splines aus `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` dahin,
solange wir nicht eigens Kerne mit beschränktem Träger wählen. Der
Bandbreitenparameter `,e.jsx(n,{children:"h"}),` spielt dabei die Rolle des Knotenabstands: klein
heißt flexibel und unruhig, groß heißt glatt und träge.`]})]})}),`
`,e.jsxs(Q,{title:"Splines im maschinellen Lernen",children:[e.jsxs(i.p,{children:[`Zwei aktuelle Verwendungen benutzen Splines als Modellbaustein, nicht als
Interpolationsverfahren. `,e.jsx(i.em,{children:"Kolmogorow-Arnold-Netze"}),` ersetzen die feste
Aktivierungsfunktion eines neuronalen Netzes durch eine lernbare, stückweise
polynomiale; die Netzgewichte sind dann B-Spline-Koeffizienten, bestimmt
durch Training statt durch Interpolationsbedingungen
(`,e.jsx(i.a,{href:"#env-interpolation-im-maschinellen-lernen-und",children:"Bemerkung 13.1.6"}),")."]}),e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Normalizing Flows"}),` bauen eine komplizierte Wahrscheinlichkeitsverteilung aus
einer einfachen auf, indem sie eine invertierbare Abbildung dazwischenschalten.
Die Dichte der transformierten Größe enthält den Betrag der
`,e.jsx(S,{id:"determinant",children:"Determinante"}),` ihrer Jacobimatrix
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.3",children:"Abschnitt 10.3"}),`), und deshalb muss die
Abbildung zweierlei können: sich invertieren und ihre Determinante billig
ausrechnen lassen. Geeignet parametrisierte `,e.jsx(i.em,{children:"streng monotone"}),` Splines leisten
beides: Strikte Monotonie macht die eindimensionale Abbildung bijektiv, und
ihre Ableitung steht stückweise sofort da. Häufig verwendet werden dafür
monotone rationale quadratische Splines.`]})]}),`
`,e.jsx(i.h3,{children:"Was vom Kapitel bleibt"}),`
`,e.jsx(i.p,{children:`Am Anfang stand ein Wunsch, der sich in einem Satz sagen lässt: eine Funktion
finden, die zu gegebenen Daten passt. Am Ende steht ein lineares
Gleichungssystem, dessen Matrix wir uns selbst aussuchen dürfen. Alles
Interessante entscheidet sich bei dieser Wahl, und deshalb war dieses Kapitel
weniger eine Sammlung von Formeln als eine Reihe von Entscheidungen samt ihren
Folgen.`}),`
`,e.jsx(w,{kind:"Bemerkung",label:"13.9.12 (Kernkonzepte des Kapitels)",id:"env-multivariat-kernkonzepte-des-kapitels",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Drei Aufgaben, ein Rechenweg."}),` Approximation misst global in einer
`,e.jsx(S,{id:"norm",children:"Norm"}),`,
Interpolation verlangt punktweise exakte Treffer, Glättung lässt Residuen
zu, weil die Daten Rauschen tragen. Einen wichtigen Zugang zur ersten
Aufgabe erhalten wir über die zweite, indem wir `,e.jsx(n,{children:"f"}),` an endlich vielen
Stellen auswerten und interpolieren; andere Verfahren minimieren den
Approximationsfehler direkt
(`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"}),`). Die Interpolationsbedingung allein legt
dabei nichts fest: Zu jedem Interpolanten `,e.jsx(n,{children:"\\cgreen{p}"}),` und jeder Funktion
`,e.jsx(n,{children:"g"})," mit ",e.jsx(n,{children:"g(x_i) = 0"})," ist auch ",e.jsx(n,{children:"\\cgreen{p} + g"})," einer, und solche ",e.jsx(n,{children:"g"}),` gibt
es unendlich viele (`,e.jsx(i.a,{href:"#env-gestalt-aller-interpolanten",children:"Satz 13.1.8"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Die Basisdarstellung macht daraus ein Gleichungssystem."}),` Wir wählen
`,e.jsx(n,{children:"K"})," Basisfunktionen ",e.jsx(n,{children:"\\corange{\\phi_1}, \\dots, \\corange{\\phi_K}"}),`, setzen
`,e.jsx(n,{children:"\\cgreen{\\wh{f}} = \\sum_k a_k \\corange{\\phi_k}"}),` an und erhalten
`,e.jsx(n,{children:"\\bB\\ba = \\cblue{\\by}"})," mit ",e.jsx(n,{children:"B_{ik} = \\corange{\\phi_k(x_i)}"}),`: eine Zeile je
Datenpunkt, eine Spalte je Basisfunktion
(`,e.jsx(i.a,{href:"#sec-13.2",children:"Abschnitt 13.2"}),`). Die Matrix hängt nur von den Stellen und
der Basis ab, nicht von den Messwerten.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Polynome sind theoretisch schön und numerisch heikel."})," Durch ",e.jsx(n,{children:"n"}),` Punkte
läuft genau ein Polynom vom Grad höchstens `,e.jsx(n,{children:"n-1"}),`
(`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"}),`). Die Monombasis erkauft das mit einer
`,e.jsx(S,{id:"condition-number",children:"Kondition"}),`, die exponentiell wächst, mit einer
Störung, die im ganzen Intervall wirkt, und mit dem
`,e.jsx("span",{style:{color:"#D55E00"},children:"Runge-Phänomen"}),`: Selbst bei
beliebig oft differenzierbarem `,e.jsx(n,{children:"f"}),` muss die Folge der Interpolanten an
gleichmäßig verteilten Knoten nicht konvergieren.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Splines halten den Grad klein und die Wirkung lokal."}),` Statt eines
Polynoms hohen Grades nehmen wir viele Polynome vom festen Grad `,e.jsx(n,{children:"q"}),` und
kleben sie `,e.jsx(n,{children:"\\Ccal^{q-1}"}),"-glatt aneinander; der Raum ",e.jsx(n,{children:"\\Scal_q"}),` hat die
Dimension `,e.jsx(n,{children:"m + q"})," (",e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),`). Die B-Spline-Basis dazu
hat lokale Träger, macht `,e.jsx(n,{children:"\\bB"}),` zu einer
`,e.jsx(S,{id:"sparse-matrix",children:"dünn besetzten"}),` Bandmatrix und senkt den Aufwand von
`,e.jsx(n,{children:"O(N^3)"})," auf ",e.jsx(n,{children:"O(N q^2)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Minimale Krümmung."})," Unter allen ",e.jsx(n,{children:"\\Ccal^2"}),`-Funktionen, die die Daten
interpolieren, minimiert der `,e.jsx(i.em,{children:"natürliche"}),` kubische Spline
`,e.jsx(n,{children:"J(f) = \\int (f'')^2 \\dx"}),`. Getragen wird der Beweis von den
natürlichen Randbedingungen `,e.jsx(n,{children:"\\cgreen{s''(a)} = \\cgreen{s''(b)} = 0"}),`; die
dritte Ableitung darf an den Knoten springen
(`,e.jsx(i.a,{href:"#sec-13.5",children:"Abschnitt 13.5"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Approximationsordnung."})," Für ",e.jsx(n,{children:"f \\in \\Ccal^4"}),` ist der Fehler des
interpolierenden kubischen Splines durch
`,e.jsx(n,{children:"C \\corange{h}^4 \\max_x \\left| f^{(4)}(x) \\right|"}),` beschränkt, mit
passenden Randbedingungen sogar mit `,e.jsx(n,{children:"C = 5/384"}),`: Halbierte Gitterweite
heißt Schranke durch `,e.jsx(n,{children:"16"}),`. Die Ordnung hängt am Grad und an der
Glattheit, stückweise linear liefert nur `,e.jsx(n,{children:"\\corange{h}^2"}),`
(`,e.jsx(i.a,{href:"#sec-13.6",children:"Abschnitt 13.6"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Glättung statt Interpolation."}),` Mit einem vollrangigen kleinen
Ansatzraum, typischerweise `,e.jsx(n,{children:"K<n"}),`, wird die Anpassung zu einem
Kleinste-Quadrate-Problem
`,e.jsx(n,{children:"\\min_{\\ba} \\left\\| \\cblue{\\by} - \\corange{\\bB}\\ba \\right\\|_2^2"}),`. Der
zweite Weg benutzt einen großen, bis zu datengroßen Raum mit einem
Strafterm `,e.jsx(n,{children:"\\lambda \\int (g'')^2 \\dx"}),`, also einen Glättungsspline
(`,e.jsx(i.a,{href:"#sec-13.7",children:"Abschnitt 13.7"}),"). Nicht ",e.jsx(n,{children:"K"}),` allein, sondern Residuen und
Strafterm entscheiden zwischen Interpolation und Glättung.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Bias-Varianz."}),` Der gemittelte quadrierte Bias besitzt unter den
genannten Glattheitsannahmen eine obere Schranke `,e.jsx(n,{children:"C_1K^{-8}"}),`, die
gemittelte Varianz ist exakt `,e.jsx(n,{children:"\\sigma^2 K/n"}),`. Unter der stärkeren
Proxy-Annahme `,e.jsx(n,{children:"\\mathrm{Bias}^2\\asymp c_1K^{-8}"}),` balanciert
`,e.jsx(n,{children:"K\\asymp n^{1/9}"})," beide Terme und liefert die Rate ",e.jsx(n,{children:"n^{-8/9}"}),`. In der
Praxis wird `,e.jsx(n,{children:"K"}),` über Kreuzvalidierung, AIC, BIC oder GCV gewählt
(`,e.jsx(i.a,{href:"#sec-13.8",children:"Abschnitt 13.8"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Fluch der Dimensionalität."})," Die Tensor-Produkt-Basis braucht ",e.jsx(n,{children:"K^p"}),`
Koeffizienten. Das Ausbalancieren der gezeigten MSE-Obergrenze liefert
`,e.jsx(n,{children:"O(n^{-8/(8+p)})"}),`. Additive Modelle ersetzen das Produkt durch eine Summe,
kommen mit `,e.jsx(n,{children:"O(pK)"})," Koeffizienten aus und sind zusätzlich interpretierbar."]}),`
`]})}),`
`,e.jsxs(w,{kind:"Bemerkung",label:"13.9.13 (Drei Stellschrauben, drei Wirkungen)",id:"env-drei-stellschrauben-drei-wirkungen",children:[e.jsx(i.p,{children:`Drei Entscheidungen der ersten Kapitelhälfte haben klar getrennte Folgen, und
das ist ihre kürzeste Fassung.`}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Der ",e.jsx(i.em,{children:"Ansatzraum"}),` bestimmt den Interpolanten. Polynome vom Grad höchstens
`,e.jsx(n,{children:"n-1"}),` und kubische Splines liefern verschiedene Kurven durch dieselben
Punkte.`]}),`
`,e.jsxs(i.li,{children:["Das ",e.jsx(i.em,{children:"Basissystem"}),` bestimmt Koeffizienten, Kondition und Rechenweg, aber
nicht die Kurve. Monombasis und Newton-Basis spannen denselben Raum auf und
ergeben dieselbe Funktion (`,e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`); orthogonalisierte Basen
ändern an ihr nichts und an der Kondition alles (`,e.jsx(i.a,{href:"#env-der-ausweg-orthogonalisierte-basen",children:"Bemerkung 13.3.11"}),")."]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"Knotenwahl"}),` bestimmt, wie gut der Interpolant zwischen den Daten
liegt. Bei frei wählbaren Stellen zähmen Chebyshev-Knoten das
Runge-Phänomen (in der Vertiefung
`,e.jsx(i.a,{href:"#env-ein-ausweg-die-knoten-anders-legen",children:"Bemerkung 13.3.16"}),` erklärt); bei gemessenen Daten
liegen die Stellen fest, und dann bleibt nur der Wechsel des Ansatzraums.`]}),`
`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest zum Kapitel"}),`
`,e.jsxs(i.p,{children:[`Der Selbsttest geht quer durch das Kapitel, von den drei Aufgaben aus
`,e.jsx(i.a,{href:"#sec-13.1",children:"Abschnitt 13.1"})," bis zum Fluch der Dimensionalität."]}),`
`,e.jsxs(Me,{children:[e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Damit der Interpolant zu ",e.jsx(n,{children:"n"}),` Datenpunkten eindeutig ist, genügt es, genau
`,e.jsx(n,{children:"K = n"})," Basisfunktionen zu wählen."]}),e.jsxs(i.p,{children:["Die Zahl allein reicht nicht, ",e.jsx(n,{children:"\\bB"}),` muss auch invertierbar sein. Mit
`,e.jsx(n,{children:"\\corange{\\phi_1(x)} = 1"}),", ",e.jsx(n,{children:"\\corange{\\phi_2(x)} = x"}),` und
`,e.jsx(n,{children:"\\corange{\\phi_3(x)} = 1 + x"})," und den Stellen ",e.jsx(n,{children:"0"}),", ",e.jsx(n,{children:"1"}),", ",e.jsx(n,{children:"2"}),` ist die dritte
Spalte die Summe der ersten beiden, also `,e.jsx(n,{children:"\\det \\bB = 0"})," (",e.jsx(i.a,{href:"#env-wann-k-zahlen-eine-funktion-festlegen",children:"Satz 13.2.4"}),`,
`,e.jsx(i.a,{href:"#env-das-wort-basisfunktion-traegt-eine",children:"Bemerkung 13.2.5"}),`). Mit der Monombasis dagegen, also mit Polynomen vom Grad
höchstens `,e.jsx(n,{children:"n-1"}),", steht dort die Vandermonde-Matrix mit ",e.jsx(n,{children:"\\det \\bB = 2"}),`, und
`,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"})," sichert die Eindeutigkeit."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gibt ",e.jsx(S,{id:"smooth-function",children:"beliebig oft differenzierbare"}),` Funktionen, für
die der größte Fehler
der Interpolation an gleichmäßig verteilten Knoten über alle Grenzen wächst,
obwohl der Fehler an den Knoten selbst stets null ist.`]}),e.jsxs(i.p,{children:["Das ist Runges Funktion ",e.jsx(n,{children:"f(x) = 1/(1 + 25x^2)"})," auf ",e.jsx(n,{children:"[-1, 1]"}),`
(`,e.jsx(i.a,{href:"#env-runge-1901",children:"Beispiel 13.3.14"}),"). Nachgerechnet steigt der größte Fehler von ",e.jsx(n,{children:"0{,}44"}),` bei
`,e.jsx(n,{children:"n = 5"})," über ",e.jsx(n,{children:"7{,}2"})," bei ",e.jsx(n,{children:"n = 15"})," auf ",e.jsx(n,{children:"257"})," bei ",e.jsx(n,{children:"n = 25"}),`, während die
Interpolationsbedingung an jedem einzelnen Knoten exakt erfüllt bleibt.
Interpolation sagt eben nur etwas über die Stützstellen aus.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`In der Basismatrix zu kubischen B-Splines stehen in jeder Zeile höchstens
vier Einträge ungleich null.`}),e.jsxs(i.p,{children:["An jeder Stelle sind höchstens ",e.jsx(n,{children:"q + 1 = 4"}),` der Basisfunktionen von null
verschieden, denn `,e.jsx(n,{children:"\\corange{B_k^{(q)}}"}),` verschwindet außerhalb von
`,e.jsx(n,{children:"[\\corange{\\tau_k}, \\corange{\\tau_{k+q+1}}]"})," (",e.jsx(i.a,{href:"#env-die-b-splines-sind-eine-basis",children:"Satz 13.4.11"}),"). Für ",e.jsx(n,{children:"20"}),`
Stützstellen und `,e.jsx(n,{children:"20"}),` kubische B-Splines haben wir das nachgezählt: nirgends
mehr als vier, an den Rändern weniger. Daraus wird die Bandstruktur und mit
ihr der Aufwand `,e.jsx(n,{children:"O(N q^2)"})," statt ",e.jsx(n,{children:"O(N^3)"}),", bei ",e.jsx(n,{children:"N = 1000"})," und ",e.jsx(n,{children:"q = 3"}),` ein
Verhältnis von `,e.jsx(n,{children:"N^2/q^2 \\approx 111\\,000"})," (",e.jsx(i.a,{href:"#env-bandstruktur-und-aufwand",children:"Bemerkung 13.4.14"}),")."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`Zwei verschiedene Basen desselben Ansatzraums liefern denselben
Interpolanten, können aber Basismatrizen sehr unterschiedlicher Kondition
haben.`}),e.jsxs(i.p,{children:[`Der Ansatzraum bestimmt die Kurve, die Basis nur die Koeffizienten: Monom-
und Newton-Basis geben beide `,e.jsx(n,{children:"\\cgreen{\\wh{f}(x)} = 1 + x^2"}),`, einmal mit
`,e.jsx(n,{children:"\\cgreen{\\ba = (1,0,1)^\\top}"}),` und einmal mit
`,e.jsx(n,{children:"\\cgreen{\\ba = (1,1,1)^\\top}"})," (",e.jsx(i.a,{href:"#env-dieselbe-funktion-andere-koeffizienten",children:"Beispiel 13.2.12"}),`). An der Kondition ändert
ein solcher Wechsel dagegen sehr viel, bei `,e.jsx(n,{children:"n = 20"}),` gleichmäßig verteilten
Stellen um zwölf Zehnerpotenzen (`,e.jsx(i.a,{href:"#env-der-ausweg-orthogonalisierte-basen",children:"Bemerkung 13.3.11"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Der Übergang von der Monombasis zu den kubischen B-Splines ist ein
Basiswechsel im Sinn der vorigen Aussage, der Interpolant bleibt also
derselbe.`}),e.jsxs(i.p,{children:["Hier wechselt nicht die Basis, sondern der Ansatzraum. Die ",e.jsx(n,{children:"n"}),` Monome
spannen die Polynome vom Grad höchstens `,e.jsx(n,{children:"n-1"})," auf, die ",e.jsx(n,{children:"m+q"}),` kubischen
B-Splines den Spline-Raum `,e.jsx(n,{children:"\\Scal_3"}),", und für ",e.jsx(n,{children:"n > 4"}),` ist das eine ganz andere
Menge von Funktionen. Entsprechend verschieden sehen die Kurven aus: Im
Störungs-Widget von `,e.jsx(i.a,{href:"#sec-13.4",children:"Abschnitt 13.4"}),` liegen links ein Polynom vom
Grad `,e.jsx(n,{children:"8"}),` und rechts ein stückweise kubischer Spline durch dieselben neun
Punkte.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Zu jeder stetigen Funktion ",e.jsx(n,{children:"f"})," auf ",e.jsx(n,{children:"[a,b]"}),` und jeder Genauigkeit
`,e.jsx(n,{children:"\\varepsilon > 0"}),` gibt es ein Gitter, auf dem bereits ein stückweise linearer
Spline `,e.jsx(n,{children:"\\cgreen{s}"}),` mit
`,e.jsx(n,{children:"\\left\\| f - \\cgreen{s} \\right\\|_\\infty < \\varepsilon"})," existiert."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-eigenschaften-von-splines-und-b-splines",children:"Satz 13.4.15"}),", Punkt 1, im Fall ",e.jsx(n,{children:"q = 1"}),`; dort ist er nichts anderes
als die gleichmäßige Stetigkeit von `,e.jsx(n,{children:"f"}),` auf einem abgeschlossenen Intervall.
Bemerkenswert ist der Gegensatz zum Runge-Phänomen: Der Weg über wachsenden
Polynomgrad kann scheitern, der Weg über feinere Gitter bei festem Grad nicht.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Bei der Spline-Interpolation wächst mit jedem zusätzlichen Datenpunkt der
Grad des Interpolanten.`}),e.jsxs(i.p,{children:["Der Grad ",e.jsx(n,{children:"q"})," ist fest gewählt, meist ",e.jsx(n,{children:"q = 3"}),`. Was mit den Daten wächst, ist
die Zahl der Teilintervalle und damit die Dimension `,e.jsx(n,{children:"m + q"}),` des Ansatzraums
(`,e.jsx(i.a,{href:"#env-dimension-des-spline-raums",children:"Satz 13.4.4"}),`). Genau darin liegt der Unterschied zur Polynominterpolation,
bei der der Ansatzraum für `,e.jsx(n,{children:"n"})," Punkte Polynome bis zum Grad ",e.jsx(n,{children:"n-1"}),` zulässt
(`,e.jsx(i.a,{href:"#env-existenz-und-eindeutigkeit-der",children:"Satz 13.3.5"}),`). Das tatsächliche Interpolationspolynom darf kleineren Grad
haben. Am wachsenden maximalen Grad hängt, dass die Oszillationen aus
`,e.jsx(i.a,{href:"#sec-13.3",children:"Abschnitt 13.3"})," ausbleiben."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Unter allen Funktionen, die die Punkte ",e.jsx(n,{children:"(\\cblue{x_i}, \\cblue{y_i})"}),`
interpolieren, minimiert der natürliche kubische Spline
`,e.jsx(n,{children:"J(f) = \\int_a^b (f'')^2 \\dx"}),"."]}),e.jsxs(i.p,{children:[`Ohne Glattheitsforderung ist die Aussage falsch. Der Polygonzug durch die
Punkte ist zwischen den Knoten linear, hat dort also `,e.jsx(n,{children:"f'' = 0"}),` und käme damit
auf `,e.jsx(n,{children:"J = 0"}),"; in ",e.jsx(i.a,{href:"#env-drei-punkte-zwei-interpolanten",children:"Beispiel 13.5.8"})," stünde das gegen ",e.jsx(n,{children:"J(\\cgreen{s}) = 6"}),`. An den
Knoten selbst existiert seine zweite Ableitung nicht, `,e.jsx(n,{children:"J"}),` ist für ihn streng
genommen undefiniert. `,e.jsx(i.a,{href:"#env-kubische-splines-haben-minimale",children:"Satz 13.5.4"}),` vergleicht deshalb nur
`,e.jsx(n,{children:"\\Ccal^2"}),"-Interpolanten, und unter denen gewinnt der natürliche Spline."]})]}),e.jsxs(A,{wahr:!0,children:[e.jsx(i.p,{children:`Verdoppeln wir die Zahl der Teilintervalle eines gleichmäßigen Gitters, so fällt die
Fehlerschranke für kubische Spline-Interpolation auf ein Sechzehntel, die für
stückweise lineare Interpolation dagegen nur auf ein Viertel.`}),e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#eq-approximationsfehler-kubischer-splines",children:"(13.6.1)"})," steht ",e.jsx(n,{children:"\\corange{h}^4"}),", in ",e.jsx(i.a,{href:"#env-fehler-der-stueckweise-linearen",children:"Satz 13.6.5"})," steht ",e.jsx(n,{children:"\\corange{h}^2"}),`, und
die verdoppelte Teilintervallzahl halbiert `,e.jsx(n,{children:"\\corange h"}),". Bei ",e.jsx(n,{children:"N"}),` Knoten gehen
wir dafür auf `,e.jsx(n,{children:"2N-1"})," Knoten, wie in der Folge ",e.jsx(n,{children:"5,9,17,33"}),`. Halbiertes
`,e.jsx(n,{children:"\\corange h"})," gibt die Faktoren ",e.jsx(n,{children:"2^4=16"})," beziehungsweise ",e.jsx(n,{children:"2^2=4"}),`. Gemessen
bestätigen unsere Rechnungen beides: Auf hinreichend feinen Gittern laufen die
gemessenen Faktoren im kubischen Fall gegen `,e.jsx(n,{children:"16"}),", im linearen gegen ",e.jsx(n,{children:"4"}),`
(`,e.jsx(i.a,{href:"#env-buckel-auf-dem-einheitsintervall",children:"Beispiel 13.6.7"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsx(i.p,{children:`Interpolation und Glättung sind zwei verschiedene Verfahren; die Interpolation
fällt nicht unter den Kleinste-Quadrate-Ansatz dieses Kapitels.`}),e.jsxs(i.p,{children:[`Interpolation ist der Spezialfall des KQ-Ansatzes mit verschwindenden
Residuen. Mit `,e.jsx(n,{children:"K = n"}),` Basisfunktionen und invertierbarer Designmatrix ist die Kleinste-Quadrate-Lösung
`,e.jsx(n,{children:"\\cgreen{\\wh\\ba} = \\corange{\\bB}^{-1}\\cblue{\\by}"}),`, die Residuenquadratsumme
null und jeder Punkt exakt getroffen. Ein kleiner vollrangiger Raum mit
`,e.jsx(n,{children:"K<n"}),` lässt für generische Daten Residuen stehen; ein großer Raum kann durch
einen Strafterm ebenfalls glätten (`,e.jsx(i.a,{href:"#env-interpolation-und-glaettung-im",children:"Definition 13.7.8"}),`). Ein interpolierender
Schätzer übernimmt die Fehler `,e.jsx(n,{children:"\\cred{\\epsilon_i}"}),` an den Datenstellen
punktweise.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Mit wachsendem ",e.jsx(n,{children:"K"}),` fällt der quadrierte Bias monoton und die Varianz wächst
monoton.`]}),e.jsxs(i.p,{children:["Die zweite Hälfte stimmt exakt: Die gemittelte Varianz ist ",e.jsx(n,{children:"\\sigma^2 K/n"}),`
(`,e.jsx(i.a,{href:"#env-gemittelte-varianz-eines-linearen",children:"Satz 13.8.4"}),"), sie wächst also linear. Für den Bias gibt ",e.jsx(i.a,{href:"#env-der-bias-ist-der-approximationsfehler",children:"Satz 13.8.2"}),` nur die
obere Schranke `,e.jsx(n,{children:"O(K^{-8})"}),`, und die verlangt keine Monotonie. In unserer
Simulation steigt der quadrierte Bias von `,e.jsx(n,{children:"K = 8"})," auf ",e.jsx(n,{children:"K = 9"}),` sogar an, weil
die inneren Knoten dort gerade auf die Nullstellen von `,e.jsx(n,{children:"\\sin(3x)"}),` fallen
(`,e.jsx(i.a,{href:"#env-der-bias-faellt-nicht-monoton",children:"Bemerkung 13.8.9"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:[`Allein aus der Bias-Obergrenze folgt, dass die tatsächlich MSE-optimale
Knotenzahl von der Ordnung `,e.jsx(n,{children:"n^{1/9}"})," ist."]}),e.jsxs(i.p,{children:["Bewiesen ist nur ",e.jsx(n,{children:"\\mathrm{Bias}^2\\le C_1K^{-8}"}),`. Minimieren wir die daraus
entstehende Obergrenze oder nehmen stärker
`,e.jsx(n,{children:"\\mathrm{Bias}^2\\asymp c_1K^{-8}"}),` an, erhalten wir
`,e.jsx(n,{children:"K\\asymp n^{1/9}"})," und die Garantie beziehungsweise Proxy-Rate ",e.jsx(n,{children:"n^{-8/9}"}),`
(`,e.jsx(i.a,{href:"#env-heuristisches-balance-modell-fuer-die",children:"Bemerkung 13.8.7"}),`). Für eine Aussage über das tatsächliche oder minimax-
optimale `,e.jsx(n,{children:"K"}),` braucht es zusätzlich eine passende untere Schranke und genaue
Annahmen an Funktionsklasse und Design.`]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Bei ",e.jsx(n,{children:"p = 10"})," Kovariablen und ",e.jsx(n,{children:"K = 10"}),` Basisfunktionen je Variable ist der
Koeffizienten-Tensor mit rund `,e.jsx(n,{children:"80"})," MB noch gut zu handhaben."]}),e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"10^{10}"})," Koeffizienten, und mit ",e.jsx(n,{children:"8"}),` Byte je Zahl macht das
`,e.jsx(n,{children:"8 \\cdot 10^{10}"})," Bytes, also ",e.jsx(n,{children:"80"})," GB und nicht ",e.jsx(n,{children:"80"})," MB (",e.jsx(i.a,{href:"#env-zehn-basisfunktionen-je-variable",children:"Beispiel 13.9.4"}),`).
Dazu kämen mindestens ebenso viele Beobachtungen, damit die Designmatrix
vollen Spaltenrang haben kann. Genau daran scheitert der volle Tensoransatz in
hohen Dimensionen.`]})]}),e.jsxs(A,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein additives Modell mit ",e.jsx(n,{children:"p"})," Variablen und ",e.jsx(n,{children:"K"}),` Basisfunktionen je Komponente
hat eine Koeffizientenzahl der Ordnung `,e.jsx(n,{children:"pK"}),", wächst also nur linear in ",e.jsx(n,{children:"p"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#eq-additives-modell",children:"(13.9.4)"}),": ",e.jsx(n,{children:"pK"}),` Komponenten-Koeffizienten plus Achsenabschnitt, nach
Zentrierung `,e.jsx(n,{children:"p(K-1)+1"})," frei wählbare. Für ",e.jsx(n,{children:"p = 10"})," und ",e.jsx(n,{children:"K = 10"}),` sind das
`,e.jsx(n,{children:"91"})," freie Parameter statt ",e.jsx(n,{children:"10^{10}"}),`. Bezahlt wird der Gewinn mit den Wechselwirkungen, die
der Ansatz nicht darstellen kann (`,e.jsx(i.a,{href:"#env-der-gewinn-und-was-er-kostet",children:"Bemerkung 13.9.9"}),")."]})]}),e.jsxs(A,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Rate ",e.jsx(n,{children:"O(n^{-8/(8+p)})"}),` ist eine obere Schranke für den MSE, gleich welches
`,e.jsx(n,{children:"K"})," wir wählen."]}),e.jsxs(i.p,{children:[`Sie ist die Garantie aus der ausbalancierten Obergrenze und gilt für eine Wahl
`,e.jsx(n,{children:"K\\asymp n^{1/(8+p)}"})," unter den Voraussetzungen von ",e.jsx(i.a,{href:"#env-eine-mse-obergrenze-im-multivariaten",children:"Satz 13.9.5"}),`. Für ein
beliebiges `,e.jsx(n,{children:"K"})," steht nur die zweigliedrige Schranke ",e.jsx(i.a,{href:"#eq-eine-mse-obergrenze-im-multivariaten",children:"(13.9.2)"}),` zur Verfügung:
`,e.jsx(n,{children:"K"})," zu klein lässt eine große Bias-Schranke, ",e.jsx(n,{children:"K"}),` zu groß macht die Varianz
groß.`]})]})]}),`
`,e.jsx(i.h3,{children:"Wie es weitergeht"}),`
`,e.jsxs(i.p,{children:[`Drei Fragen hat dieses Kapitel nur angerissen, und jede füllt eine eigene
Vorlesung: die theoretische Analyse statistischer Verfahren, die Eigenschaften
von Parameterschätzern und die Funktionsapproximation über das hier Gezeigte
hinaus. Dafür bieten sich die Vorlesungen von Thomas Nagler an,
`,e.jsx(i.em,{children:"Statistical Learning Theory"})," im Master und ",e.jsx(i.em,{children:"Mathematical Statistics"}),` für
Bachelor und Master. Additive Modelle und ihre Verwandten behandelt die
Vorlesung `,e.jsx(i.em,{children:"Statistik V: Konzepte statistischer Modellierung"})," im Bachelor."]}),`
`,e.jsx(i.h3,{children:"Finito"}),`
`,e.jsx(i.p,{children:`Damit endet das Skript. Begonnen haben wir mit der Frage, warum Rechnen mit
endlicher Genauigkeit überhaupt schiefgehen kann, und mit dem Handwerkszeug
dagegen: Kondition, Stabilität, Aufwandsanalyse. Darauf baute die numerische
lineare Algebra auf, von der Elimination über die Zerlegungen bis zur
Singulärwertzerlegung, und darauf wiederum die Analysis mehrerer
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
1957.`]})})]})}function rt(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(js,{...s})}):js(s)}const at={sections:[{id:"13.1",key:"approximation",title:"Approximation, Interpolation, Glättung",C:ve(er)},{id:"13.2",key:"basisdarstellung",title:"Interpolation durch Basisdarstellung",C:ve(ir)},{id:"13.3",key:"polynominterpolation",title:"Polynominterpolation",C:ve(xr)},{id:"13.4",key:"splines",title:"Splines und B-Splines",C:ve(kr)},{id:"13.5",key:"minimale-kruemmung",title:"Minimale Krümmung",C:ve(Ar)},{id:"13.6",key:"approximationsfehler",title:"Approximationsfehler",C:ve(Gr)},{id:"13.7",key:"glaettung",title:"Glättung und Regression",C:ve(Hr)},{id:"13.8",key:"bias-varianz",title:"Bias-Varianz und Modellwahl",C:ve(nt)},{id:"13.9",key:"multivariat",title:"Multivariat und Zusammenfassung",C:ve(rt)}]};export{at as default};
