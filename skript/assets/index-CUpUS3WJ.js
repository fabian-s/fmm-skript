import{r as _,u as fe,j as e,h as rn,A as Z,F as X,g as p,D as ve,S as B,V as I,M as n,C as h,E as c,a as t,G as q,Q as H,i as f,t as He,v as Je,l as sn,P as J,n as E,Z as tn,O as W,b as Qe,q as de,m as ee}from"./index-GbyLwDE5.js";import{I as N,E as K}from"./Interaktiv-DHZUUTxv.js";const{blau:ne,gruen:le,orange:ae,rot:_e,grau:te}=X,L=230,Q=32,ze=L+Q+18,Se=L+Q+18,S=r=>Q+r/6*L,A=r=>Q+L-r/6*L;function dn(){const[r,i]=_.useState(3),[s,l]=_.useState(2),[d,x]=_.useState("gemeinsam"),o=fe({feld:{x0:Q,y0:Q,w:L,h:L},welt:{x0:0,x1:3,y0:0,y1:3},greifPosition:()=>[r,s],clamp:([k,j])=>[Math.max(0,Math.min(3,k)),Math.max(0,Math.min(3,j))],onDrag:([k,j])=>{i(k),l(j)}}),u=r*s,a=2*r,b=d==="gemeinsam"?2*s:s,m=a*b,g=u<1e-8;return e.jsx(rn,{variante:"auswahl",frage:"Welcher Faktor entsteht beim Verdoppeln beider Seiten?",loesung:"4",optionen:[{id:"2",text:"Faktor 2"},{id:"3",text:"Faktor 3"},{id:"4",text:"Faktor 4"}],children:({aufgeloest:k})=>e.jsxs("div",{children:[e.jsx(Z,{children:"Ziehen wir die Ecke, tippen den Faktor und vergleichen danach beide Skalierungen."}),e.jsxs("svg",{viewBox:`0 0 ${ze} ${Se}`,width:ze,height:Se,className:"mt-3 max-w-full h-auto",role:"img","aria-label":"Rechteck mit den Seiten x und y; die rechte obere Ecke ist ziehbar.",...o.svgProps,children:[[0,1,2,3,4,5,6].map(j=>e.jsxs("g",{children:[e.jsx("line",{x1:S(j),y1:A(0),x2:S(j),y2:A(0)+3,stroke:te}),e.jsx("text",{x:S(j),y:A(0)+14,fontSize:"9",textAnchor:"middle",fill:te,children:j})]},j)),e.jsx("line",{x1:S(0),y1:A(0),x2:S(6),y2:A(0),stroke:te}),e.jsx("line",{x1:S(0),y1:A(0),x2:S(0),y2:A(6),stroke:te}),k&&e.jsx("rect",{x:S(0),y:A(b),width:S(a)-S(0),height:A(0)-A(b),fill:d==="gemeinsam"?_e:ne,fillOpacity:"0.12",stroke:d==="gemeinsam"?_e:ne,strokeDasharray:"5 3",strokeWidth:"2"}),e.jsx("rect",{x:S(0),y:A(s),width:S(r)-S(0),height:A(0)-A(s),fill:ae,fillOpacity:"0.38",stroke:ae}),e.jsx("line",{x1:S(0),y1:A(0),x2:S(r),y2:A(0),stroke:ne,strokeWidth:"4"}),e.jsx("line",{x1:S(0),y1:A(0),x2:S(0),y2:A(s),stroke:le,strokeWidth:"4"}),e.jsxs("text",{x:(S(0)+S(r))/2,y:A(0)+27,fill:ne,fontSize:"11",textAnchor:"middle",children:["x = ",p(r,1)]}),e.jsxs("text",{x:S(0)-10,y:(A(0)+A(s))/2,fill:le,fontSize:"11",textAnchor:"end",children:["y = ",p(s,1)]}),e.jsx(ve,{x:S(r),y:A(s),farbe:ae,...o.handleProps("ecke")})]}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(B,{label:"Seite x",value:r,onChange:i,min:0,max:3,step:.1,accent:ne}),e.jsx(B,{label:"Seite y",value:s,onChange:l,min:0,max:3,step:.1,accent:le})]}),k&&e.jsxs("div",{className:"mt-2 flex flex-wrap gap-2",role:"group","aria-label":"Skalierung wählen",children:[e.jsx("button",{type:"button",className:"rounded px-3 py-1 text-sm","aria-pressed":d==="gemeinsam",onClick:()=>x("gemeinsam"),children:"Beide Seiten verdoppeln"}),e.jsx("button",{type:"button",className:"rounded px-3 py-1 text-sm","aria-pressed":d==="fest",onClick:()=>x("fest"),children:"y festhalten"})]}),e.jsx(I,{kind:g?"warn":k?d==="fest"?"ok":"fail":"neutral",children:g?"Auf einer Achse ist die Fläche null; einen Skalierungsfaktor können wir dort nicht ablesen.":k?d==="fest"?`Mit festem y gilt f(2x,y) = ${p(m,2)} = 2·f(x,y). Das ist Linearität im ersten Argument.`:`Gemeinsam gilt f(2x,2y) = ${p(m,2)} = 4·f(x,y), nicht 2·f(x,y). Bilinearität verlangt gerade nicht gemeinsame Linearität.`:`Die Ausgangsfläche beträgt f(x,y) = ${p(u,2)}. Erst nach dem Tipp legen wir die Vergleichsfläche darüber.`})]})})}function Ae(r){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Eine lineare Abbildung nimmt einen Vektor und liefert einen Vektor. Für viele
Rechenvorschriften ist das zu eng. Ein Skalarprodukt braucht zwei Vektoren, die
Matrizenmultiplikation verarbeitet zwei Matrizen zu einer dritten, und hinter
einer quadratischen Form `,e.jsx(n,{children:"\\bx^\\top\\bA\\bx"}),` steckt die Abbildung
`,e.jsx(n,{children:"(\\bx, \\by) \\mapsto \\bx^\\top\\bA\\by"}),`, die ebenfalls zwei Vektoren aufnimmt.
Betrachten wir das ganze Tupel auf einmal, ist keine dieser Abbildungen linear.
In jedem einzelnen Argument sind sie es aber sehr wohl, und diese Beobachtung
trägt das gesamte Kapitel.`]}),`
`,e.jsx(i.h3,{children:"Was wir brauchen"}),`
`,e.jsx(i.p,{children:"Sammeln wir zuerst das Vorwissen ein, auf dem dieser Abschnitt steht."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(h,{id:"vector-space",children:"Vektorräume"})," und ihre Unterräume, dazu ",e.jsx(h,{id:"basis",children:"Basis"}),`
und `,e.jsx(h,{id:"dimension",children:"Dimension"}),". In einem Raum der Dimension ",e.jsx(n,{children:"n"}),` ist jeder
Vektor durch seine `,e.jsx(n,{children:"n"})," Koordinaten bezüglich einer festen Basis bestimmt."]}),`
`,e.jsxs(i.li,{children:[e.jsx(h,{id:"linear-map",children:"Lineare Abbildungen"}),", also ",e.jsx(n,{children:"f(c\\bv + c'\\bv') = c f(\\bv) + c' f(\\bv')"}),`.
Das ist die Eigenschaft, die wir gleich verallgemeinern.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(h,{id:"span",children:"lineare Hülle"}),`
`,e.jsx(n,{children:"\\spann\\bigl(\\{\\bv_1, \\dots, \\bv_n\\}\\bigr) = \\bigl\\{\\bw : \\bw = \\sum_i c_i \\bv_i,\\ c_i \\in \\R\\bigr\\}"}),"."]}),`
`,e.jsxs(i.li,{children:["Als Vorschau: Das ",e.jsx(i.em,{children:"äußere Produkt"})," ",e.jsx(n,{children:"\\bv \\otimes \\bw = \\bv\\bw^\\top"}),`, das wir
in `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"})," einführen. Das Zeichen ",e.jsx(n,{children:"\\otimes"}),` begegnet uns in
diesem Kapitel noch in allgemeinerer Rolle; für das Kroneckerprodukt, die dritte
Konstruktion aus `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`, verwenden wir das eigene Zeichen
`,e.jsx(n,{children:"\\kron"}),"."]}),`
`,e.jsxs(i.li,{children:[`Aus der Analysis: Funktionen mehrerer Veränderlicher,
`,e.jsx(n,{children:"f(\\bx) = f(x_1, x_2, \\dots, x_n)"}),"."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Von einem Vektor zu einem Tupel"}),`
`,e.jsxs(i.p,{children:["Bisher haben wir einen Vektor ",e.jsx(n,{children:"\\bv \\in V"})," linear auf einen Vektor ",e.jsx(n,{children:"\\bw \\in W"}),`
abgebildet. Jetzt bilden wir Paare oder allgemeiner Tupel
`,e.jsx(n,{children:"(\\bv_1, \\dots, \\bv_n) \\in V_1 \\times \\cdots \\times V_n"}),` ab, und zwar wieder
„linear". Die Anführungszeichen sind nötig, denn Linearität bezieht sich hier
auf die `,e.jsx(i.em,{children:"einzelnen"}),` Argumente: Halten wir alle Argumente bis auf eines fest, so
soll die verbleibende Abbildung linear sein. Solche Abbildungen heißen
`,e.jsx(i.em,{children:"multilinear"}),"."]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.1.1 (Multilineare Abbildung)",id:"env-multilineare-abbildung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V_1, \\dots, V_n, W"}),` Vektorräume. Eine Abbildung
`,e.jsx(n,{children:"f\\colon V_1 \\times \\cdots \\times V_n \\to W"})," heißt ",e.jsx(i.em,{children:"multilinear"}),", wenn"]}),e.jsx(t,{children:`\\begin{aligned}
&f(\\bv_1, \\dots, \\cblue{c\\bv_i + c'\\bv_i'}, \\dots, \\bv_n) \\\\
&\\qquad = c\\,f(\\bv_1, \\dots, \\cblue{\\bv_i}, \\dots, \\bv_n)
        + c'\\,f(\\bv_1, \\dots, \\cblue{\\bv_i'}, \\dots, \\bv_n)
\\end{aligned}`}),e.jsxs(i.p,{children:["für alle ",e.jsx(n,{children:"i = 1, \\dots, n"}),", alle ",e.jsx(n,{children:"c, c' \\in \\R"}),` und alle
`,e.jsx(n,{children:"\\bv_i, \\bv_i' \\in V_i"})," gilt."]})]}),`
`,e.jsxs(i.p,{children:["Die Bedingung ist ",e.jsx(n,{children:"n"})," Bedingungen auf einmal, eine je Argument. Für festes ",e.jsx(n,{children:"i"}),`
sagt sie: Frieren wir die übrigen `,e.jsx(n,{children:"n - 1"}),` Argumente ein, so ist die verbleibende
Abbildung `,e.jsx(n,{children:"V_i \\to W"})," linear im gewohnten Sinn."]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.1.2 (Bilinear, und eine Warnung)",id:"env-bilinear-und-eine-warnung",children:[e.jsxs(i.p,{children:["Im Spezialfall ",e.jsx(n,{children:"n = 2"})," nennen wir ",e.jsx(n,{children:"f"})," ",e.jsx(i.em,{children:"bilinear"}),`. Dieser Fall begegnet uns in
den Beispielen unten immer wieder.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Achtung:"})," Multilineare Abbildungen sind in der Regel ",e.jsx(i.em,{children:"nicht"}),` linear. Der
Grund steckt schon in der Definition. Skalieren wir alle `,e.jsx(n,{children:"n"}),` Argumente
gleichzeitig mit demselben `,e.jsx(n,{children:"c"}),", so zieht die Homogenität den Faktor ",e.jsx(n,{children:"n"}),`-mal
heraus, einmal je Argument:`]}),e.jsx(t,{children:"f(c\\bv_1, c\\bv_2, \\dots, c\\bv_n) = \\cred{c^n}\\, f(\\bv_1, \\bv_2, \\dots, \\bv_n) ."}),e.jsxs(i.p,{children:["Für eine lineare Abbildung müsste dort ",e.jsx(n,{children:"\\cred{c}"})," stehen. Ab ",e.jsx(n,{children:"n \\geq 2"}),` ist das
ein Unterschied, sobald `,e.jsx(n,{children:"f"})," überhaupt einen Wert ungleich ",e.jsx(n,{children:"\\bnull"})," annimmt."]})]}),`
`,e.jsx(i.h3,{children:"Die Fläche eines Rechtecks"}),`
`,e.jsx(i.p,{children:"Das kleinste interessante Beispiel steckt in der Schulgeometrie."}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.1.3 (Fläche eines Rechtecks)",id:"env-flaeche-eines-rechtecks",children:[e.jsx(i.p,{children:`Wir betrachten die Fläche eines Rechtecks als Funktion seiner beiden
Seitenlängen:`}),e.jsx(t,{children:`f\\colon \\R \\times \\R \\to \\R, \\qquad
(\\cblue{x}, \\cgreen{y}) \\mapsto \\cblue{x}\\cgreen{y} .`}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Warum ist ",e.jsx(n,{children:"f"})," nicht linear?"]}),` Verdoppeln wir beide Seiten, setzen also
`,e.jsx(n,{children:"c = 2"}),", so wächst die Fläche auf das Vierfache:"]}),e.jsx(t,{children:`f(2\\cblue{x}, 2\\cgreen{y}) = 2\\cblue{x} \\cdot 2\\cgreen{y}
= \\cred{4}\\,\\cblue{x}\\cgreen{y} = \\cred{4}\\,f(\\cblue{x}, \\cgreen{y}) .`}),e.jsxs(i.p,{children:["Linear wäre ",e.jsx(n,{children:"f(c\\cblue{x}, c\\cgreen{y}) = c\\,f(\\cblue{x}, \\cgreen{y})"}),`, hier
also das Doppelte. Solange `,e.jsx(n,{children:"\\cblue{x}\\cgreen{y} \\neq 0"}),` ist, klaffen die beiden
Werte auseinander.`]}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Aber ",e.jsx(n,{children:"f"})," ist bilinear."]})," Halten wir ",e.jsx(n,{children:"\\cgreen{y}"}),` fest, so gelten Additivität
und Homogenität im ersten Argument:`]}),e.jsx(t,{children:`\\begin{aligned}
f(\\cblue{x_1} + \\cblue{x_2}, \\cgreen{y})
&= (\\cblue{x_1} + \\cblue{x_2})\\,\\cgreen{y}
 = \\cblue{x_1}\\cgreen{y} + \\cblue{x_2}\\cgreen{y}
 = f(\\cblue{x_1}, \\cgreen{y}) + f(\\cblue{x_2}, \\cgreen{y}) , \\\\
f(c\\,\\cblue{x}, \\cgreen{y})
&= (c\\,\\cblue{x})\\,\\cgreen{y} = c\\,(\\cblue{x}\\cgreen{y})
 = c\\,f(\\cblue{x}, \\cgreen{y}) .
\\end{aligned}`}),e.jsxs(i.p,{children:["Halten wir umgekehrt ",e.jsx(n,{children:"\\cblue{x}"}),` fest, läuft dieselbe Rechnung im zweiten
Argument:`]}),e.jsx(t,{children:`\\begin{aligned}
f(\\cblue{x}, \\cgreen{y_1} + \\cgreen{y_2})
&= \\cblue{x}\\,(\\cgreen{y_1} + \\cgreen{y_2})
 = \\cblue{x}\\cgreen{y_1} + \\cblue{x}\\cgreen{y_2}
 = f(\\cblue{x}, \\cgreen{y_1}) + f(\\cblue{x}, \\cgreen{y_2}) , \\\\
f(\\cblue{x}, c\\,\\cgreen{y})
&= \\cblue{x}\\,(c\\,\\cgreen{y}) = c\\,(\\cblue{x}\\cgreen{y})
 = c\\,f(\\cblue{x}, \\cgreen{y}) .
\\end{aligned}`}),e.jsxs(i.p,{children:["Die Funktion ist also ",e.jsx(i.strong,{children:"in jedem Argument einzeln"}),` linear. Dieselbe Rechnung
ohne die geometrische Deutung zeigt zugleich, dass die Multiplikation reeller
Zahlen `,e.jsx(n,{children:"(\\cblue{x_1}, \\cgreen{x_2}) \\mapsto \\cblue{x_1}\\cgreen{x_2}"}),` bilinear
ist; gebraucht haben wir nur Distributiv-, Assoziativ- und Kommutativgesetz in
`,e.jsx(n,{children:"\\R"}),"."]})]}),`
`,e.jsx(c,{kind:"Bemerkung",label:"9.1.4 (Das Vierfache, geometrisch gelesen)",id:"env-das-vierfache-geometrisch-gelesen",children:e.jsxs(i.p,{children:["Der Faktor ",e.jsx(n,{children:"\\cred{4}"}),` braucht keine Rechnung. Verdoppeln wir beide Seiten, passt
das alte Rechteck viermal in das neue; verdoppeln wir nur eine Seite, genau
zweimal, und das ist die Linearität im einzelnen Argument. Der Faktor
`,e.jsx(n,{children:"\\cred{4} = 2^2"})," ist der Fall ",e.jsx(n,{children:"n = 2"})," der allgemeinen Regel ",e.jsx(n,{children:"\\cred{c^n}"}),` aus
`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),"."]})}),`
`,e.jsxs(N,{title:"Verdoppeln, einmal beide Seiten und einmal nur eine",children:[e.jsx(i.p,{children:`Welche der beiden Skalierungen besteht den Linearitätstest, wenn wir die Fläche
zuerst nur aus dem Rechteck vorhersagen?`}),e.jsx(dn,{}),e.jsx(i.p,{children:`Das Rechteckbild zeigt damit, warum die getrennte Linearität genau die Regel
ist, die das Tensorprodukt später in eine lineare Abbildung übersetzt.`})]}),`
`,e.jsx(i.h3,{children:"Weitere Beispiele"}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.1.5 (Skalarprodukte sind bilinear)",id:"env-skalarprodukte-sind-bilinear",children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(h,{id:"dot-product",children:"Skalarprodukt"})," ",e.jsx(n,{children:"f\\colon V \\times V \\to \\R"}),`,
`,e.jsx(n,{children:"(\\bv_1, \\bv_2) \\mapsto \\inner{\\bv_1, \\bv_2}"}),`, ist bilinear. Im ersten Argument
rechnen wir`]}),e.jsx(t,{children:`\\inner{\\cblue{c\\bv + c'\\bv'}, \\cgreen{\\bw}}
= \\inner{\\cblue{c\\bv}, \\cgreen{\\bw}} + \\inner{\\cblue{c'\\bv'}, \\cgreen{\\bw}}
= c\\,\\inner{\\cblue{\\bv}, \\cgreen{\\bw}} + c'\\,\\inner{\\cblue{\\bv'}, \\cgreen{\\bw}} .`}),e.jsxs(i.p,{children:[`Der erste Schritt ist die Additivität, der zweite die Homogenität. Bei einer
axiomatischen Einführung stehen beide schon in der Definition des
Skalarprodukts. Für das Standardskalarprodukt `,e.jsx(n,{children:"\\bx^\\top\\by = \\sum_i x_i y_i"}),`
rechnen wir sie in einer Zeile nach: Das Distributivgesetz der reellen Zahlen
gibt die Additivität, das Herausziehen des Skalars die Homogenität. Für das
zweite Argument brauchen wir dann keine neue Rechnung: Die Symmetrie
`,e.jsx(n,{children:"\\inner{\\bv, \\bw} = \\inner{\\bw, \\bv}"})," dreht die Rollen um."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.1.6 (Matrizenmultiplikation als bilineare Abbildung)",id:"env-matrizenmultiplikation-als-bilineare",children:[e.jsxs(i.p,{children:["Die ",e.jsx(h,{id:"matrix-multiplication",children:"Matrizenmultiplikation"})]}),e.jsx(t,{children:`\\R^{m \\times k} \\times \\R^{k \\times n} \\to \\R^{m \\times n}, \\qquad
(\\cblue{\\bA}, \\cgreen{\\bB}) \\mapsto \\corange{\\bA\\bB} ,`}),e.jsx(i.p,{children:`ist bilinear. In beiden Argumenten ist das nichts anderes als das
Distributivgesetz für Matrizen, zusammen mit der Verträglichkeit mit Skalaren:`}),e.jsx(t,{children:`(c\\,\\cblue{\\bA} + c'\\,\\cblue{\\bA'})\\,\\cgreen{\\bB}
= c\\,\\corange{\\bA\\bB} + c'\\,\\corange{\\bA'\\bB} ,
\\qquad
\\cblue{\\bA}\\,(c\\,\\cgreen{\\bB} + c'\\,\\cgreen{\\bB'})
= c\\,\\corange{\\bA\\bB} + c'\\,\\corange{\\bA\\bB'} .`}),e.jsxs(i.p,{children:["Linear ist auch sie nicht. Skalieren wir beide Faktoren mit ",e.jsx(n,{children:"c"}),`, so erhalten wir
`,e.jsx(n,{children:"(c\\cblue{\\bA})(c\\cgreen{\\bB}) = \\cred{c^2}\\,\\corange{\\bA\\bB}"}),`, wie es
`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"})," für ",e.jsx(n,{children:"n = 2"}),` vorhersagt. Die Matrizenmultiplikation ist damit
unser erstes Beispiel, in dem die drei beteiligten Räume im Allgemeinen
verschieden sind.`]})]}),`
`,e.jsx(i.h3,{children:"Darstellung durch Koeffizienten"}),`
`,e.jsx(i.p,{children:`Multilineare Abbildungen wirken zunächst wie eine unübersichtliche Klasse. Sind
die beteiligten Räume Koordinatenräume, lässt sich jede von ihnen aber durch
eine endliche Liste von Zahlen vollständig beschreiben.`}),`
`,e.jsxs(c,{kind:"Satz",label:"9.1.7 (Darstellung multilinearer Abbildungen)",id:"env-darstellung-multilinearer-abbildungen",children:[e.jsxs(i.p,{children:["Eine Abbildung ",e.jsx(n,{children:"T\\colon \\R^{n_1} \\times \\cdots \\times \\R^{n_k} \\to \\R^m"}),` ist
genau dann multilinear, wenn es reelle Koeffizienten`]}),e.jsx(t,{children:`A = \\bigl(\\corange{a_{i_1, \\dots, i_k, j}} \\colon
1 \\leq i_1 \\leq n_1, \\dots, 1 \\leq i_k \\leq n_k, 1 \\leq j \\leq m\\bigr)`}),e.jsx(i.p,{children:"gibt, sodass"}),e.jsx(q,{tag:"9.1.1",id:"eq-darstellung-multilinearer-abbildungen",children:`T\\bigl(\\bx^{(1)}, \\dots, \\bx^{(k)}\\bigr)
= \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k} \\sum_{j = 1}^{m}
  \\corange{a_{i_1, \\dots, i_k, j}}\\;
  x^{(1)}_{i_1} \\cdots x^{(k)}_{i_k}\\; \\be_j`}),e.jsxs(i.p,{children:["gilt, wobei ",e.jsx(n,{children:"\\be_j"})," der ",e.jsx(n,{children:"j"}),"-te Einheitsvektor des ",e.jsx(n,{children:"\\R^m"}),` ist. Die Koeffizienten
`,e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"})," sind eindeutig bestimmt."]})]}),`
`,e.jsxs(i.p,{children:[`Einen vollständigen Beweis führen wir nicht. Woher die Koeffizienten kommen,
lässt sich aber in einem Satz sagen: `,e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"}),` ist die
`,e.jsx(n,{children:"j"}),"-te Komponente des Vektors ",e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k}) \\in \\R^m"}),`. Damit
ist auch die Eindeutigkeit klar, denn diese Werte legt `,e.jsx(n,{children:"T"}),` selbst fest. Eine
multilineare Abbildung ist also bereits dadurch bestimmt, was sie mit Tupeln von
Einheitsvektoren macht.`]}),`
`,e.jsxs(K,{title:"Warum die Koeffizientendarstellung stimmt",children:[e.jsxs(i.p,{children:["Dass eine Abbildung der Gestalt ",e.jsx(i.a,{href:"#eq-darstellung-multilinearer-abbildungen",children:"(9.1.1)"}),` multilinear ist, ist Nachrechnen. In
jedem Summanden steht aus jedem Argument genau eine Koordinate als Faktor.
Ersetzen wir `,e.jsx(n,{children:"\\bx^{(l)}"})," durch ",e.jsx(n,{children:"c\\bx^{(l)} + c'\\by^{(l)}"}),`, so spaltet sich jeder
Summand entsprechend auf, und die rechte Seite ist in jedem Argument linear.`]}),e.jsxs(i.p,{children:[`Für die andere Richtung entwickeln wir jedes Argument in der Standardbasis
seines eigenen Raums,
`,e.jsx(n,{children:"\\bx^{(l)} = \\sum_{i_l} x^{(l)}_{i_l} \\be_{i_l}"})," mit ",e.jsx(n,{children:"\\be_{i_l} \\in \\R^{n_l}"}),`,
und ziehen die Summen nacheinander aus `,e.jsx(n,{children:"T"}),` heraus. Das erlaubt die
Multilinearität, und übrig bleibt`]}),e.jsx(t,{children:`T\\bigl(\\bx^{(1)}, \\dots, \\bx^{(k)}\\bigr)
= \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k}
  x^{(1)}_{i_1} \\cdots x^{(k)}_{i_k}\\;
  T\\bigl(\\be_{i_1}, \\dots, \\be_{i_k}\\bigr) .`}),e.jsxs(i.p,{children:["Der Vergleich mit ",e.jsx(i.a,{href:"#eq-darstellung-multilinearer-abbildungen",children:"(9.1.1)"}),` liefert die
Koeffizienten: Dort steht `,e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"}),` genau an der Stelle,
an der hier die `,e.jsx(n,{children:"j"}),"-te Komponente von ",e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k})"})," auftaucht."]})]}),`
`,e.jsxs(i.p,{children:["Zählen wir nach: Es sind ",e.jsx(n,{children:"n_1 n_2 \\cdots n_k \\cdot m"}),` Koeffizienten. Unsere
Flächenfunktion aus `,e.jsx(i.a,{href:"#env-flaeche-eines-rechtecks",children:"Beispiel 9.1.3"})," hat ",e.jsx(n,{children:"k = 2"}),` Argumente mit
`,e.jsx(n,{children:"n_1 = n_2 = 1"})," und ",e.jsx(n,{children:"m = 1"}),`, kommt also mit einer einzigen Zahl aus, nämlich
`,e.jsx(n,{children:"a_{1,1,1} = 1"}),". Ein bilineares ",e.jsx(n,{children:"T\\colon \\R^2 \\times \\R^2 \\to \\R"}),` braucht
dagegen schon `,e.jsx(n,{children:"2 \\cdot 2 \\cdot 1 = 4"}),` Koeffizienten. Wie wir diese Zahlen
anordnen und warum daraus ein Objekt mit `,e.jsx(n,{children:"k + 1"}),` Indexpositionen wird, bei
`,e.jsx(n,{children:"m = 1"})," also mit ",e.jsx(n,{children:"k"}),", ist das Thema von ",e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(H,{children:[e.jsxs(f,{wahr:!0,children:[e.jsx(i.p,{children:`Wenn im Rechteck-Widget eine Seite null ist, ist das Verhältnis der Flächen vor
und nach dem Verdoppeln nicht definiert.`}),e.jsxs(i.p,{children:["Das Widget zeigt dann zwei Flächen mit Wert null. Der Quotient wäre ",e.jsx(n,{children:"0/0"}),`;
darum entscheidet dieser Randfall nicht zwischen Linearität und Bilinearität.`]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Für jede multilineare Abbildung ",e.jsx(n,{children:"f"}),` gilt
`,e.jsx(n,{children:"f(\\bv_1, \\dots, \\bv_n) = \\bnull"}),", sobald ",e.jsx(n,{children:"\\bv_i = \\bnull"})," für ein ",e.jsx(n,{children:"i"})," ist."]}),e.jsxs(i.p,{children:["Setzen wir in ",e.jsx(i.a,{href:"#env-multilineare-abbildung",children:"Definition 9.1.1"})," den zweiten Skalar auf ",e.jsx(n,{children:"c' = 0"}),`, so bleibt im
`,e.jsx(n,{children:"i"}),`-ten Argument die reine Homogenität
`,e.jsx(n,{children:"f(\\bv_1, \\dots, c\\bv_i, \\dots, \\bv_n) = c\\,f(\\bv_1, \\dots, \\bv_i, \\dots, \\bv_n)"}),`
übrig. Darin wählen wir `,e.jsx(n,{children:"c = 0"})," und nutzen ",e.jsx(n,{children:"\\bnull = 0 \\cdot \\bv_i"}),":"]}),e.jsx(t,{children:`f(\\bv_1, \\dots, \\bnull, \\dots, \\bv_n)
= f(\\bv_1, \\dots, 0 \\cdot \\bv_i, \\dots, \\bv_n)
= 0 \\cdot f(\\bv_1, \\dots, \\bv_i, \\dots, \\bv_n) = \\bnull .`}),e.jsx(i.p,{children:`Welchen Wert die übrigen Argumente haben, spielt dabei keine Rolle. Ein einziges
Nullargument genügt.`})]}),e.jsxs(f,{wahr:!1,children:[e.jsx(i.p,{children:"Jede bilineare Abbildung ist insbesondere linear."}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"})," sagt das Gegenteil. Skalieren wir bei ",e.jsx(n,{children:"n = 2"}),` beide Argumente
mit `,e.jsx(n,{children:"c"}),", so wird der Wert mit ",e.jsx(n,{children:"c^2"})," multipliziert und nicht mit ",e.jsx(n,{children:"c"}),`. Ein
konkreter Fall aus `,e.jsx(i.a,{href:"#env-flaeche-eines-rechtecks",children:"Beispiel 9.1.3"}),": Für ",e.jsx(n,{children:"x = y = 1"})," ist ",e.jsx(n,{children:"f(2, 2) = 4"}),`, während
eine lineare Abbildung `,e.jsx(n,{children:"2\\,f(1, 1) = 2"}),` liefern müsste. Beides zugleich, bilinear
und linear, ist einzig die Nullabbildung: Aus
`,e.jsx(n,{children:"c^2 f(\\bv, \\bw) = c\\,f(\\bv, \\bw)"})," für alle ",e.jsx(n,{children:"c"})," folgt ",e.jsx(n,{children:"f(\\bv, \\bw) = \\bnull"}),` für
jedes Paar.`]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Halten wir in einer multilinearen Abbildung alle Argumente bis auf das ",e.jsx(n,{children:"i"}),`-te
fest, so ist die verbleibende Abbildung `,e.jsx(n,{children:"V_i \\to W"})," linear."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),`, in Worte gefasst. Sie fordert genau diese eine
Bedingung, und zwar für jedes `,e.jsx(n,{children:"i"})," einzeln."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:[`Zwei verschiedene Koeffizienten-Arrays können dieselbe multilineare Abbildung
`,e.jsx(n,{children:"T\\colon \\R^{n_1} \\times \\cdots \\times \\R^{n_k} \\to \\R^m"})," darstellen."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-darstellung-multilinearer-abbildungen",children:"Satz 9.1.7"}),` sichert die Eindeutigkeit zu, und der
Grund steht im Anschluss an ihn: `,e.jsx(n,{children:"a_{i_1, \\dots, i_k, j}"})," ist die ",e.jsx(n,{children:"j"}),`-te Komponente
von `,e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k})"}),", also durch ",e.jsx(n,{children:"T"}),` selbst festgelegt. Wer die
Koeffizienten ändert, ändert die Abbildung.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §2.7 zu linearen Abbildungen und MML §3.2, wo bilineare
Abbildungen als Vorstufe des Skalarprodukts eingeführt werden.`})})]})}function ln(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ae,{...r})}):Ae(r)}const{blau:Be,gruen:De,rot:ye,orange:O,grau:ce}=X,Re=[[[2,-1,4,0],[3,1,-2,5],[0,4,1,-3],[2,0,3,1]],[[-2,3,1,4],[1,5,0,-1],[2,-4,3,0],[1,2,-2,4]],[[4,0,-3,1],[2,1,5,-2],[-1,3,0,2],[4,-2,1,3]],[[0,2,1,-4],[3,-1,4,0],[2,5,-2,1],[-3,0,2,4]]],an=(r,i,s)=>(i*29+s*17+r*53)%256,he=r=>Array.from({length:8},(i,s)=>Array.from({length:8},(l,d)=>an(r,s,d)));function Ye({matrix:r,farbe:i,x:s=0,y:l=0,groesse:d,intensiv:x=!1,onCellClick:o,aktiv:u}){const a=r.length,b=d/a;return e.jsx("g",{children:r.map((m,g)=>m.map((k,j)=>{const M=(u==null?void 0:u[0])===g&&(u==null?void 0:u[1])===j,G=x?.08+.82*(k/255):.18;return e.jsxs("g",{onClick:()=>o==null?void 0:o(g,j),style:o?{cursor:"pointer"}:void 0,children:[e.jsx("rect",{x:s+j*b,y:l+g*b,width:b,height:b,fill:i,fillOpacity:G,stroke:M?"var(--w-text)":"var(--w-border)",strokeWidth:M?1.8:.55}),e.jsx("text",{x:s+(j+.5)*b,y:l+(g+.62)*b,textAnchor:"middle",fontSize:a===8?8:11,fill:x&&k>155?"var(--w-bg)":"var(--w-text)",children:sn(k)})]},`${g}-${j}`)}))})}function cn(){const[r,i]=_.useState(1),[s,l]=_.useState({azimuth:38,elevation:25}),d=Re[r-1],x=_.useMemo(()=>({f:(o,u)=>d[Math.min(3,Math.max(0,Math.floor(u)))][Math.min(3,Math.max(0,Math.floor(o)))],nx:20,ny:20,color:O,opacity:.78,wire:!0}),[d]);return e.jsxs("div",{children:[e.jsx(Z,{children:"Wählen wir eine Scheibe und vergleichen wir ihre Matrixeinträge mit dem zugehörigen Höhenfeld."}),e.jsx("svg",{viewBox:"0 0 310 314",className:"max-w-full h-auto",role:"img","aria-label":`Aufgefächerter Stapel aus vier beschrifteten Matrixscheiben; Scheibe ${r} ist ausgewählt.`,children:[[1,20,26],[2,170,26],[3,20,174],[4,170,174]].map(([o,u,a])=>{const b=o===r;return e.jsxs("g",{onClick:()=>i(o),style:{cursor:"pointer"},children:[e.jsxs("text",{x:u,y:a-7,fill:b?O:"var(--w-muted)",fontSize:"12",children:["k = ",o]}),e.jsx("rect",{x:u,y:a,width:"120",height:"120",fill:"var(--w-bg)",stroke:b?O:ce,strokeWidth:b?3:1}),e.jsx(Ye,{matrix:Re[o-1],farbe:b?O:ce,x:u,y:a,groesse:120})]},o)})}),e.jsx("div",{className:"mt-3",children:e.jsx(He,{size:300,xDomain:[0,4],yDomain:[0,4],zDomain:[-4,5],surface:x,azimuth:s.azimuth,elevation:s.elevation,onViewChange:l,labels:{x:"j",y:"i",z:`Tᵢⱼ${r}`},ariaLabel:`Höhenfeld der ausgewählten Matrixscheibe k gleich ${r}.`})}),e.jsx(B,{label:"Scheibe k",value:r,onChange:o=>i(Math.round(o)),min:1,max:4,step:1,accent:O,fmt:o=>String(Math.round(o))}),e.jsx(Je,{value:s,onChange:l}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-x-4 text-xs","aria-label":"Legende",children:[e.jsx("span",{style:{color:O},children:"Orange: gewählte Scheibe und ihr Höhenfeld"}),e.jsx("span",{style:{color:ce},children:"Grau: übrige Scheiben"})]}),e.jsx(I,{kind:r===1?"neutral":"ok",children:r===1?"Für k = 1 sehen wir die erste Matrix des Stapels als Höhenfeld; jeder Eintrag bestimmt ein Plateau.":`Für k = ${r} wechselt nicht nur das Etikett: Das Höhenfeld übernimmt genau die ${r}. Matrixscheibe.`})]})}function hn(){const[r,i]=_.useState([3,4]),s=[he(0),he(1),he(2)],l=s.map(u=>u[r[0]][r[1]]),d=`rgb(${l.join(", ")})`,x=["Rot","Grün","Blau"],o=[ye,De,Be];return e.jsxs("div",{children:[e.jsx(Z,{children:"Klicken wir auf denselben Pixel in einer Kanalscheibe und lesen wir ab, welche drei Zahlen seine Farbe zusammensetzen."}),e.jsx("div",{className:"overflow-x-auto pb-2",children:e.jsxs("svg",{viewBox:"0 0 610 180",className:"max-w-full h-auto min-w-[610px]",role:"img","aria-label":"Rot-, Grün- und Blaukanal neben dem zusammengesetzten RGB-Bild.",children:[s.map((u,a)=>e.jsxs("g",{children:[e.jsxs("text",{x:a*148+8,y:"13",fill:o[a],fontSize:"12",children:[x[a],"-Kanal"]}),e.jsx(Ye,{matrix:u,farbe:o[a],x:a*148+8,y:22,groesse:136,intensiv:!0,aktiv:r,onCellClick:(b,m)=>i([b,m])})]},x[a])),e.jsxs("g",{children:[e.jsx("text",{x:"452",y:"13",fill:"var(--w-text)",fontSize:"12",children:"RGB-Bild"}),Array.from({length:8},(u,a)=>Array.from({length:8},(b,m)=>{const g=s[0][a][m],k=s[1][a][m],j=s[2][a][m],M=r[0]===a&&r[1]===m;return e.jsx("rect",{x:452+m*17,y:22+a*17,width:"17",height:"17",fill:`rgb(${g}, ${k}, ${j})`,stroke:M?"var(--w-text)":"var(--w-border)",strokeWidth:M?1.8:.55},`${a}-${m}`)}))]})]})}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-x-4 text-xs","aria-label":"Legende",children:[e.jsx("span",{style:{color:ye},children:"Rot: Intensität des Rotanteils"}),e.jsx("span",{style:{color:De},children:"Grün: Intensität des Grünanteils"}),e.jsx("span",{style:{color:Be},children:"Blau: Intensität des Blauanteils"})]}),e.jsx(I,{kind:Math.max(...l)-Math.min(...l)<35?"neutral":"ok",children:Math.max(...l)-Math.min(...l)<35?`Pixel (${r[1]+1}, ${r[0]+1}) hat die fast ausgeglichenen Kanalwerte (${l.join(", ")}); er erscheint daher annähernd grau.`:`Pixel (${r[1]+1}, ${r[0]+1}) entsteht aus (${l.join(", ")}); die unterschiedlichen Kanalwerte erzeugen sichtbar ${d}.`})]})}function Me({bild:r=!1}){return r?e.jsx(hn,{}):e.jsx(cn,{})}const on=""+new URL("vgg16-block3-feature-maps-B7P7GdzF.png",import.meta.url).href;function Fe(r){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Der Darstellungssatz aus ",e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"})," (",e.jsx(i.a,{href:"#env-darstellung-multilinearer-abbildungen",children:"Satz 9.1.7"}),`) hat multilineare
Abbildungen vollständig auf eine Liste von Zahlen zurückgeführt. Diese Liste ist mehr als
ein Nebenprodukt der Rechnung. Sie ist das Objekt, um das sich der Rest des
Kapitels dreht, und sie hat einen Namen. Bevor wir ihn vergeben, sehen wir nach,
was aus der Liste im einfachsten Fall wird.`]}),`
`,e.jsx(i.h3,{children:"Der Fall k = 1 liefert die Matrix"}),`
`,e.jsxs(i.p,{children:["Setzen wir im Darstellungssatz ",e.jsx(n,{children:"k = 1"}),". Dann hat ",e.jsx(n,{children:"T"}),` nur ein Argument, ist also
eine gewöhnliche `,e.jsx(h,{id:"linear-map",children:"lineare Abbildung"})," ",e.jsx(n,{children:"T\\colon \\R^{n} \\to \\R^{m}"}),`,
und von der langen Indexliste bleiben zwei Indizes übrig,
`,e.jsx(n,{children:"1 \\le i \\le n"})," und ",e.jsx(n,{children:"1 \\le j \\le m"}),":"]}),`
`,e.jsx(q,{tag:"9.2.1",id:"eq-eq-9-2-1",children:"T(\\cblue{\\bx}) = \\sum_{i = 1}^{n} \\sum_{j = 1}^{m} \\corange{a_{i,j}}\\, \\cblue{x_i}\\, \\be_j ."}),`
`,e.jsxs(i.p,{children:["Die Doppelsumme lässt sich umsortieren. Der Faktor ",e.jsx(n,{children:"\\cblue{x_i}"}),` hängt nicht von
`,e.jsx(n,{children:"j"}),` ab, wir dürfen ihn vor die innere Summe ziehen. Was dann in der Klammer
steht, ist ein fester Vektor des `,e.jsx(n,{children:"\\R^m"}),", der nur noch von ",e.jsx(n,{children:"i"})," abhängt:"]}),`
`,e.jsx(t,{children:`\\corange{\\ba_i} := \\sum_{j = 1}^{m} \\corange{a_{i,j}}\\, \\be_j
= \\begin{pmatrix} \\corange{a_{i,1}} \\\\ \\vdots \\\\ \\corange{a_{i,m}} \\end{pmatrix} \\in \\R^m ,
\\qquad\\text{also}\\qquad
T(\\cblue{\\bx}) = \\sum_{i = 1}^{n} \\cblue{x_i}\\, \\corange{\\ba_i} .`}),`
`,e.jsxs(i.p,{children:[`Rechts steht eine Summe von Vektoren, gewichtet mit den Komponenten von
`,e.jsx(n,{children:"\\cblue{\\bx}"}),". Stellen wir die ",e.jsx(n,{children:"\\corange{\\ba_i}"}),` als Spalten nebeneinander, so
ist das genau das `,e.jsx(h,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),`: Mit
`,e.jsx(n,{children:"\\corange{\\bA} = (\\corange{\\ba_1} \\mid \\cdots \\mid \\corange{\\ba_n}) \\in \\R^{m \\times n}"}),`
gilt`]}),`
`,e.jsx(t,{children:"T(\\cblue{\\bx}) = \\corange{\\bA}\\,\\cblue{\\bx} ."}),`
`,e.jsxs(i.p,{children:["Der Darstellungssatz reproduziert für ",e.jsx(n,{children:"k = 1"}),` also die vertraute Tatsache, dass
sich jede lineare Abbildung `,e.jsx(n,{children:"\\R^n \\to \\R^m"})," als ",e.jsx(h,{id:"matrix",children:"Matrix"}),` schreiben
lässt. Eine Kleinigkeit lohnt dabei einen zweiten Blick.`]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.2.1 (Von der Koeffizientenfamilie zur Matrix)",id:"env-von-der-koeffizientenfamilie-zur-matrix",children:[e.jsxs(i.p,{children:[`Der Darstellungssatz nummeriert die Koeffizienten mit dem Eingangsindex vorn und
dem Ausgangsindex hinten, also `,e.jsx(n,{children:"\\corange{a_{i,j}}"})," mit ",e.jsx(n,{children:"i"}),` für die Komponente von
`,e.jsx(n,{children:"\\cblue{\\bx}"})," und ",e.jsx(n,{children:"j"}),` für die Komponente des Bildvektors. In der Matrix
`,e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` stehen sie andersherum: Der Ausgangsindex ist
der Zeilenindex, der Eingangsindex der Spaltenindex,`]}),e.jsx(t,{children:"(\\corange{\\bA})_{j,i} = \\corange{a_{i,j}} ."}),e.jsxs(i.p,{children:["Anders herum passt das Produkt ",e.jsx(n,{children:"\\corange{\\bA}\\,\\cblue{\\bx}"}),` gar nicht zusammen,
denn `,e.jsx(n,{children:"\\cblue{\\bx}"})," hat ",e.jsx(n,{children:"n"})," Komponenten und ",e.jsx(n,{children:"\\corange{\\bA}"})," braucht dafür ",e.jsx(n,{children:"n"}),`
Spalten. Wer die Familie unbesehen als Matrix liest, erhält
`,e.jsx(n,{children:"\\corange{\\bA}^\\top"}),`. Die Reihenfolge der Indexpositionen ist Konvention, ihre
Bedeutung nicht.`]})]}),`
`,e.jsxs(i.p,{children:["Die Ansammlung der ",e.jsx(n,{children:"nm"}),` Koeffizienten nennen wir eine Matrix. Sie hat zwei
Indexpositionen, und deshalb sprechen wir bei ihr von zwei „Dimensionen"; warum
die Anführungszeichen nötig sind, klärt `,e.jsx(i.a,{href:"#env-stufe-und-dimension-sind-zwei",children:"Bemerkung 9.2.6"}),`. Der Darstellungssatz
sagt aber mehr: Zu jedem `,e.jsx(n,{children:"k"}),` gehört eine Ansammlung von Koeffizienten mit
`,e.jsx(n,{children:"k + 1"})," Indizes, bei ",e.jsx(n,{children:"m = 1"})," also mit ",e.jsx(n,{children:"k"}),`, und jede solche Ansammlung beschreibt
umgekehrt eine multilineare Abbildung. Sehen wir uns den Fall `,e.jsx(n,{children:"k = 2"}),` an, bevor
wir dem Objekt einen Namen geben.`]}),`
`,e.jsx(i.h3,{children:"Ein bilineares Beispiel"}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.2.2 (Eine bilineare Abbildung auf R2 mal R2)",id:"env-eine-bilineare-abbildung-auf-r2-mal-r2",children:[e.jsxs(i.p,{children:["Wir betrachten ",e.jsx(n,{children:"T\\colon \\R^2 \\times \\R^2 \\to \\R"})," mit"]}),e.jsx(t,{children:`T(\\cblue{\\bx}, \\cgreen{\\by}) = 2\\cblue{x_1}\\cgreen{y_1} + 3\\cblue{x_1}\\cgreen{y_2}
- \\cblue{x_2}\\cgreen{y_1} + 4\\cblue{x_2}\\cgreen{y_2} .`}),e.jsxs(i.p,{children:["Hier ist ",e.jsx(n,{children:"k = 2"}),", ",e.jsx(n,{children:"n_1 = n_2 = 2"})," und ",e.jsx(n,{children:"m = 1"}),". Wegen ",e.jsx(n,{children:"m = 1"}),` nimmt der
Ausgangsindex nur den Wert `,e.jsx(n,{children:"1"})," an, und ",e.jsx(n,{children:"\\be_1 = 1"}),` ist die Zahl Eins; wir lassen
ihn weg. Übrig bleiben vier Koeffizienten `,e.jsx(n,{children:"\\corange{a_{i_1, i_2}}"}),`, die wir
direkt ablesen:`]}),e.jsx(t,{children:`\\corange{a_{1,1}} = 2, \\quad \\corange{a_{1,2}} = 3, \\quad
\\corange{a_{2,1}} = -1, \\quad \\corange{a_{2,2}} = 4
\\qquad\\Longrightarrow\\qquad
\\corange{\\bA} = \\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Probe."})," Die Darstellungsformel für ",e.jsx(n,{children:"k = 2"})," und ",e.jsx(n,{children:"m = 1"})," lautet"]}),e.jsx(t,{children:`\\begin{aligned}
T(\\cblue{\\bx}, \\cgreen{\\by})
&= \\sum_{i_1 = 1}^{2} \\sum_{i_2 = 1}^{2} \\corange{a_{i_1, i_2}}\\, \\cblue{x_{i_1}}\\, \\cgreen{y_{i_2}} \\\\
&= \\corange{a_{1,1}}\\cblue{x_1}\\cgreen{y_1} + \\corange{a_{1,2}}\\cblue{x_1}\\cgreen{y_2}
 + \\corange{a_{2,1}}\\cblue{x_2}\\cgreen{y_1} + \\corange{a_{2,2}}\\cblue{x_2}\\cgreen{y_2} \\\\
&= 2\\cblue{x_1}\\cgreen{y_1} + 3\\cblue{x_1}\\cgreen{y_2}
 - \\cblue{x_2}\\cgreen{y_1} + 4\\cblue{x_2}\\cgreen{y_2} ,
\\end{aligned}`}),e.jsxs(i.p,{children:[`also wieder die Abbildung, von der wir ausgegangen sind. Anders als in
`,e.jsx(i.a,{href:"#env-von-der-koeffizientenfamilie-zur-matrix",children:"Bemerkung 9.2.1"}),` gibt es hier keine Frage nach der Indexreihenfolge, denn beide
Indizes sind Eingangsindizes: `,e.jsx(n,{children:"i_1"})," gehört zum ersten, ",e.jsx(n,{children:"i_2"}),` zum zweiten
Argument.`]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Numerisch."})," Für ",e.jsx(n,{children:"\\cblue{\\bx} = (1, 2)^\\top"})," und ",e.jsx(n,{children:"\\cgreen{\\by} = (3, 4)^\\top"}),`
ist`]}),e.jsx(t,{children:`T(\\cblue{\\bx}, \\cgreen{\\by})
= 2 \\cdot 1 \\cdot 3 + 3 \\cdot 1 \\cdot 4 - 1 \\cdot 2 \\cdot 3 + 4 \\cdot 2 \\cdot 4
= 6 + 12 - 6 + 32 = 44 .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"In Matrixschreibweise."}),` Die Doppelsumme ist der Ausdruck
`,e.jsx(n,{children:"\\cblue{\\bx}^\\top \\corange{\\bA}\\, \\cgreen{\\by}"}),`, ausgeschrieben. Eine bilineare
Abbildung mit Werten in `,e.jsx(n,{children:"\\R"})," heißt eine ",e.jsx(i.em,{children:"Bilinearform"}),", und genau das ist ",e.jsx(n,{children:"T"}),`.
Setzen wir beide Argumente gleich, so entsteht daraus die
`,e.jsx(h,{id:"quadratic-form",children:"quadratische Form"}),`
`,e.jsx(n,{children:"\\cblue{\\bx} \\mapsto \\cblue{\\bx}^\\top \\corange{\\bA}\\, \\cblue{\\bx}"}),`, eine
Abbildung mit nur noch einem Argument.`]}),e.jsx(t,{children:`T(\\cblue{\\bx}, \\cgreen{\\by})
= \\cblue{\\begin{pmatrix} 1 & 2 \\end{pmatrix}}
  \\corange{\\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix}}
  \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}
= \\begin{pmatrix} 0 & 11 \\end{pmatrix} \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}
= 0 \\cdot 3 + 11 \\cdot 4 = 44 .`})]}),`
`,e.jsx(i.h3,{children:"Tensoren"}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k = 1"})," heißt die Koeffizientenansammlung Matrix, für ",e.jsx(n,{children:"k = 2"}),` ebenfalls, denn
bei `,e.jsx(n,{children:"m = 1"}),` blieben auch dort zwei Indizes übrig. Bei drei Eingangsvektoren
brauchen wir drei Indizes, bei `,e.jsx(n,{children:"k"}),` Vektoren und mehrdimensionalem Bildbereich
noch einen mehr. Für all das gibt es einen gemeinsamen Namen.`]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.2.3 (Tensor)",id:"env-tensor",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n_1, \\dots, n_k \\in \\N"}),". Ein ",e.jsx(i.em,{children:"Tensor"})," (tensor) der ",e.jsx(i.em,{children:"Stufe"})," ",e.jsx(n,{children:"k"}),` und des
Formats `,e.jsx(n,{children:"n_1 \\times \\cdots \\times n_k"})," ist eine durch ",e.jsx(n,{children:"k"}),` Indizes indizierte
Familie reeller Zahlen`]}),e.jsx(t,{children:`A = \\bigl(a_{i_1, \\dots, i_k}\\bigr)_{1 \\le i_1 \\le n_1, \\; \\dots, \\; 1 \\le i_k \\le n_k}
\\in \\R^{n_1 \\times \\cdots \\times n_k} ,`}),e.jsxs(i.p,{children:["also eine Abbildung, die jedem Indextupel ",e.jsx(n,{children:"(i_1, \\dots, i_k)"}),` aus
`,e.jsx(n,{children:"\\{1, \\dots, n_1\\} \\times \\cdots \\times \\{1, \\dots, n_k\\}"}),` genau eine reelle Zahl
`,e.jsx(n,{children:"a_{i_1, \\dots, i_k}"})," zuordnet."]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.2.4 (Stufe, und warum eine Menge es nicht tut)",id:"env-stufe-und-warum-eine-menge-es-nicht-tut",children:[e.jsx(i.p,{children:`Die Stufe zählt Indexpositionen, nicht Einträge. Die ersten Fälle kennen wir
alle:`}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{children:["Stufe ",e.jsx(n,{children:"k"})]}),e.jsx(i.th,{children:"Objekt"}),e.jsx(i.th,{children:"Format"}),e.jsx(i.th,{children:"Einträge"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"0"})}),e.jsx(i.td,{children:e.jsx(h,{id:"scalar",children:"Skalar"})}),e.jsx(i.td,{}),e.jsx(i.td,{children:e.jsx(n,{children:"1"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{children:e.jsx(h,{id:"vector",children:"Vektor"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{children:e.jsx(h,{id:"matrix",children:"Matrix"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 \\times n_2"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 n_2"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"3"})}),e.jsx(i.td,{children:"Stapel von Matrizen"}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 \\times n_2 \\times n_3"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 n_2 n_3"})})]})]})]}),e.jsxs(i.p,{children:[`Gelegentlich liest man, ein Tensor sei eine „geordnete Menge" reeller Zahlen.
Das trifft es nicht ganz. Eine Menge kennt weder Reihenfolge noch Vielfachheit,
es ist ja `,e.jsx(n,{children:"\\{1, 1, 2\\} = \\{2, 1\\}"}),`. Worauf es ankommt, ist die Zuordnung: zu
jedem Indextupel gehört genau eine Zahl. Derselbe Zahlenvorrat, anders
angeordnet, ergibt einen anderen Tensor. Wir sagen deshalb `,e.jsx(i.em,{children:"indizierte Familie"}),`
oder schlicht `,e.jsx(i.em,{children:"Anordnung"}),"."]})]}),`
`,e.jsx(i.p,{children:`Tensoren derselben Größe lassen sich addieren und mit Zahlen strecken, und zwar
Eintrag für Eintrag, so wie wir es von Vektoren und Matrizen gewohnt sind. Damit
liegt schon eine bekannte Struktur vor.`}),`
`,e.jsxs(c,{kind:"Satz",label:"9.2.5 (Der Raum aller Tensoren eines Formats)",id:"env-der-raum-aller-tensoren-eines-formats",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n_1, \\dots, n_k \\in \\N"})," fest. Mit der eintragsweisen Addition"]}),e.jsx(t,{children:"(A + B)_{i_1, \\dots, i_k} = a_{i_1, \\dots, i_k} + b_{i_1, \\dots, i_k}"}),e.jsxs(i.p,{children:[`und der eintragsweisen Multiplikation mit Skalaren
`,e.jsx(n,{children:"(cA)_{i_1, \\dots, i_k} = c\\, a_{i_1, \\dots, i_k}"}),` ist
`,e.jsx(n,{children:"\\R^{n_1 \\times \\cdots \\times n_k}"})," ein ",e.jsx(h,{id:"vector-space",children:"Vektorraum"}),` über
`,e.jsx(n,{children:"\\R"}),". Seine ",e.jsx(h,{id:"dimension",children:"Dimension"})," ist ",e.jsx(n,{children:"n_1 n_2 \\cdots n_k"}),"."]})]}),`
`,e.jsx(K,{title:"Warum Tensoren eines festen Formats einen Vektorraum bilden",children:e.jsxs(J,{children:[e.jsx(E,{why:e.jsxs(e.Fragment,{children:["Assoziativität, Kommutativität und die Distributivgesetze gelten in ",e.jsx(n,{children:"\\R"}),"; sie übertragen sich Stelle für Stelle, etwa ",e.jsx(n,{children:"\\bigl(c(A + B)\\bigr)_{i_1, \\dots, i_k} = c\\,a_{i_1, \\dots, i_k} + c\\,b_{i_1, \\dots, i_k} = (cA + cB)_{i_1, \\dots, i_k}"})]}),children:e.jsxs(i.p,{children:[`Jedes Vektorraumaxiom ist eine Gleichung zwischen Tensoren, und zwei Tensoren
sind genau dann gleich, wenn sie an jeder Indexstelle übereinstimmen. Beide
Verknüpfungen wirken eintragsweise, also bleibt an jeder Indexstelle eine
Gleichung zwischen reellen Zahlen stehen. Neutrales Element ist der Nulltensor,
das Negative von `,e.jsx(n,{children:"A"})," der Tensor mit den Einträgen ",e.jsx(n,{children:"-a_{i_1, \\dots, i_k}"}),"."]})}),e.jsxs(E,{why:e.jsx(e.Fragment,{children:"eindeutige Darstellbarkeit ist genau die Basiseigenschaft: Existenz gibt das Erzeugendensystem, Eindeutigkeit die lineare Unabhängigkeit"}),children:[e.jsxs(i.p,{children:["Für die Dimension geben wir eine ",e.jsx(h,{id:"basis",children:"Basis"}),` an. Zu jedem Indextupel
`,e.jsx(n,{children:"(i_1, \\dots, i_k)"})," sei ",e.jsx(n,{children:"\\bE^{(i_1, \\dots, i_k)}"}),` der Tensor, der an dieser
Stelle eine `,e.jsx(n,{children:"1"})," und sonst überall ",e.jsx(n,{children:"0"}),` stehen hat. Jeder Tensor schreibt sich
damit als`]}),e.jsx(t,{children:`A = \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k}
a_{i_1, \\dots, i_k}\\, \\bE^{(i_1, \\dots, i_k)} ,`}),e.jsxs(i.p,{children:["und die Koeffizienten dieser Darstellung sind die Einträge von ",e.jsx(n,{children:"A"}),`, also
eindeutig. Die `,e.jsx(n,{children:"\\bE^{(i_1, \\dots, i_k)}"}),` erzeugen den Raum somit und sind
`,e.jsx(h,{id:"linear-independence",children:"linear unabhängig"}),`. Ihre Anzahl ist die Zahl der
Indextupel, und die ist `,e.jsx(n,{children:"n_1 n_2 \\cdots n_k"}),"."]})]})]})}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.2.6 (Stufe und Dimension sind zwei verschiedene Zahlen)",id:"env-stufe-und-dimension-sind-zwei",children:[e.jsxs(i.p,{children:["Eine ",e.jsx(n,{children:"4 \\times 4"}),"-Matrix hat die Stufe ",e.jsx(n,{children:"2"}),", aber ",e.jsx(n,{children:"\\R^{4 \\times 4}"}),` hat nach
`,e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"})," die Dimension ",e.jsx(n,{children:"4^2 = 16"}),`. Ein Tensor des Formats
`,e.jsx(n,{children:"4 \\times 4 \\times 4"})," hat die Stufe ",e.jsx(n,{children:"3"}),`, und der zugehörige Raum die Dimension
`,e.jsx(n,{children:"4^3 = 64"}),`. Wer die Indexpositionen „Dimensionen" nennt, meint also etwas
anderes als die Dimension des Vektorraums. Im maschinellen Lernen heißen die
Indexpositionen meist `,e.jsx(i.em,{children:"Achsen"})," (axes), was die Verwechslung vermeidet."]}),e.jsxs(i.p,{children:[`Die Basisdarstellung aus dem Beweis erklärt nebenbei einen Handgriff, der in
jeder Programmbibliothek vorkommt: Zählen wir die Indextupel in einer fest
gewählten Reihenfolge durch, so wird aus jedem Tensor ein Vektor mit
`,e.jsx(n,{children:"n_1 n_2 \\cdots n_k"}),` Komponenten und aus jeder Rechnung im Tensorraum eine
Rechnung im `,e.jsx(n,{children:"\\R^{n_1 n_2 \\cdots n_k}"}),". Die Operation heißt dort ",e.jsx(i.em,{children:"reshape"}),` oder
`,e.jsx(i.em,{children:"flatten"}),`; verloren geht dabei nur die Information, welcher Index welche
Bedeutung hatte. Für Matrizen bekommt sie in `,e.jsx(i.a,{href:"#sec-9.5",children:"Abschnitt 9.5"}),` als
spaltenweise Vektorisierung einen Namen und eine Rechenregel.`]})]}),`
`,e.jsxs(N,{title:"Ein Stufe-3-Tensor, Scheibe für Scheibe",children:[e.jsxs(i.p,{children:["Welche vollständige Matrix erhalten wir, wenn wir die dritte Indexposition ",e.jsx(n,{children:"k"})," festhalten?"]}),e.jsx(Me,{}),e.jsxs(i.p,{children:["Wie das Widget zeigt, entspricht jede Wahl von ",e.jsx(n,{children:"k"}),` einer vollständigen
Matrixscheibe desselben Zahlenfelds.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendungen: Bilder, Stapel, Feature-Maps"}),`
`,e.jsxs(i.p,{children:[`Bis hierher ist ein Tensor ein Buchhaltungsobjekt. Warum er einen eigenen Namen
und inzwischen sogar eigene Rechenwerke bekommt, zeigt der Blick auf Bilddaten.
Ein Graustufenbild hält je Bildpunkt eine einzige Zahl fest und ist damit eine
Matrix. Farbe braucht drei Zahlen je Pixel; ein Farbbild der Größe
`,e.jsx(n,{children:"224 \\times 224"})," wird deshalb zu einem Tensor der Stufe ",e.jsx(n,{children:"3"}),`,
`,e.jsx(n,{children:"\\bI \\in \\R^{224 \\times 224 \\times 3}"}),", mit ",e.jsx(n,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528"}),`
Zahlen. Neuronale Netze verarbeiten solche Bilder bündelweise, etwa `,e.jsx(n,{children:"32"}),` Stück
auf einmal, und aus dem Stapel wird ein Tensor der Stufe `,e.jsx(n,{children:"4"}),`; dieselbe vierte
Indexposition zählt bei einem Video die Einzelbilder in der Zeit. Eine
Faltungsschicht (convolutional layer) eines faltenden Netzes bildet dann Tensoren
wieder auf Tensoren ab.`]}),`
`,e.jsx(i.p,{children:`Rechnungen dieser Art bestehen aus sehr vielen gleichartigen Multiplikationen und
Additionen auf regelmäßig angeordneten Zahlen. Dafür lassen sich spezialisierte
Rechenwerke bauen, die solche Blockoperationen am Stück ausführen: Googles TPUs
und NVIDIAs Tensor Cores sind genau darauf zugeschnitten. Für das maschinelle
Lernen ist diese Hardware keine Randnotiz, sondern eine Voraussetzung.`}),`
`,e.jsxs(N,{title:"Farbbild als Kanäle",children:[e.jsx(i.p,{children:"Wie setzen sich die drei Zahlen eines Pixels zu seiner sichtbaren Farbe zusammen?"}),e.jsx(Me,{bild:!0}),e.jsx(i.p,{children:`Wie das Widget zeigt, sind die drei Kanalscheiben keine drei Bilder, sondern drei
Komponenten jedes Pixels desselben Bildes.`})]}),`
`,e.jsxs(K,{title:"Bilder, Stapel und Feature-Maps im Detail",children:[e.jsxs(c,{kind:"Beispiel",label:"9.2.7 (Ein Farbbild als Tensor der Stufe 3)",id:"env-ein-farbbild-als-tensor-der-stufe-3",children:[e.jsxs(i.p,{children:[`Beim Graustufenbild läuft eine Indexrichtung über die Pixel in der Waagerechten,
die andere über die Pixel in der Senkrechten. Beim Farbbild
`,e.jsx(n,{children:"\\bI \\in \\R^{224 \\times 224 \\times 3}"})," nummeriert der dritte Index die Kanäle:"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,1}"}),": Rot-Intensität an der Position ",e.jsx(n,{children:"(i,j)"}),", ein Wert zwischen ",e.jsx(n,{children:"0"}),`
und `,e.jsx(n,{children:"255"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,2}"}),": Grün-Intensität an derselben Position,"]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,3}"}),": Blau-Intensität an derselben Position."]}),`
`]}),e.jsx(i.p,{children:"Das sind"}),e.jsx(t,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528 \\approx 150 \\cdot 10^{3}"}),e.jsx(i.p,{children:`Zahlen für ein einziges Bild. Welche Indexposition wofür steht, ist dabei reine
Verabredung, und die Verabredungen gehen auseinander: Manche Bibliothek stellt
den Kanalindex nach vorn, manche lässt ihn hinten, und ob zuerst die Zeile oder
zuerst die Spalte gezählt wird, ist ebenfalls nicht überall gleich. Für die
Mathematik ist das gleichgültig, für den Code nicht.`})]}),e.jsxs(c,{kind:"Beispiel",label:"9.2.8 (Ein Stapel Bilder als Tensor der Stufe 4)",id:"env-ein-stapel-bilder-als-tensor-der-stufe-4",children:[e.jsxs(i.p,{children:[`Ein faltendes Netz (convolutional neural network, CNN) bekommt typischerweise
`,e.jsx(n,{children:"32"})," Bilder auf einmal vorgesetzt, also"]}),e.jsx(t,{children:"\\bB \\in \\R^{32 \\times 224 \\times 224 \\times 3} ,"}),e.jsxs(i.p,{children:[`wobei die vier Indexpositionen der Reihe nach die Nummer des Bildes im Stapel
(`,e.jsx(i.em,{children:"Batch-Größe"}),`), die Höhe, die Breite und den Farbkanal angeben. Nachgezählt sind
das`]}),e.jsx(t,{children:"32 \\cdot 224 \\cdot 224 \\cdot 3 = 4\\,816\\,896 \\approx 4{,}8 \\cdot 10^{6}"}),e.jsxs(i.p,{children:["Zahlen. Bei einfacher Genauigkeit mit ",e.jsx(n,{children:"4"}),` Byte je Zahl belegt allein die Eingabe
eines einzigen Rechenschritts damit rund `,e.jsx(n,{children:"19"}),` Millionen Byte. Ob die vierte
Indexposition die Bilder eines Stapels oder die eines Videos in der Zeit zählt,
steht ihr nicht an; wir müssen es dazusagen.`]})]}),e.jsxs(c,{kind:"Beispiel",label:"9.2.9 (Feature-Maps: eine Abbildung von Tensoren auf Tensoren)",id:"env-feature-maps-eine-abbildung-von-tensoren",children:[e.jsx(i.p,{children:`Eine Faltungsschicht (convolutional layer) eines CNN bildet Tensoren auf Tensoren
ab, etwa`}),e.jsx(t,{children:"c \\colon \\R^{32 \\times 224 \\times 224 \\times 3} \\to \\R^{32 \\times 56 \\times 56 \\times 64} ."}),e.jsxs(i.p,{children:["Sie senkt die räumliche Auflösung von ",e.jsx(n,{children:"224 \\times 224"})," auf ",e.jsx(n,{children:"56 \\times 56"}),` und
erhöht dabei die Zahl der Kanäle von `,e.jsx(n,{children:"3"})," auf ",e.jsx(n,{children:"64"}),`. Diese Kanäle stehen jetzt
nicht mehr für Farben, sondern für Merkmale (features): Jede der `,e.jsx(n,{children:"64"}),` Ebenen hält
für jede Position fest, wie stark ein bestimmtes lokales Muster dort anspricht,
und heißt deshalb `,e.jsx(i.em,{children:"Feature-Map"}),"."]}),e.jsx(i.p,{children:"Naheliegend wäre die Vermutung, die Schicht mache den Tensor kleiner. Zählen wir nach:"}),e.jsx(t,{children:"32 \\cdot 56 \\cdot 56 \\cdot 64 = 6\\,422\\,528 \\approx 6{,}4 \\cdot 10^{6} ,"}),e.jsxs(i.p,{children:["also mehr als die ",e.jsx(n,{children:"4\\,816\\,896"}),` Einträge des Eingangs. Die Auflösung fällt zwar
um den Faktor `,e.jsx(n,{children:"16"}),", die Kanalzahl wächst aber um den Faktor ",e.jsx(n,{children:"64/3"}),`, und
`,e.jsx(n,{children:"\\tfrac{64}{3 \\cdot 16} = \\tfrac{4}{3}"}),`. Anschaulich wird das Prinzip an den
Feature-Maps aus Block 3 des VGG16-Modells: Jede einzelne sieht aus wie ein
grobes Graustufenbild, hell an den Stellen, an denen das jeweilige Muster
kräftig anspricht.`]}),e.jsxs("figure",{className:"mx-auto my-4 max-w-2xl",children:[e.jsx("img",{src:on,alt:"Raster aus 64 ausgewählten Feature-Maps des dritten VGG16-Blocks. In den dunklen Graustufenbildern zeichnen helle Bereiche unterschiedliche Strukturen des Eingabebildes nach.",className:"h-auto w-full rounded-md border border-slate-200 bg-white"}),e.jsx("figcaption",{className:"mt-2 text-center text-sm text-slate-600 dark:text-slate-400",children:e.jsxs(i.p,{children:[`64 ausgewählte Feature-Maps aus Block 3 von VGG16 für dasselbe Eingabebild.
Der Block erzeugt insgesamt 256 Kanäle. Quelle: `,e.jsx("a",{href:"https://machinelearningmastery.com/how-to-visualize-filters-and-feature-maps-in-convolutional-neural-networks/",children:"Machine Learning Mastery"}),"."]})})]})]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Was an einer Faltungsschicht linear ist."})," Die Abbildung ",e.jsx(n,{children:"c"}),` hat nur ein
Argument, ist also keine multilineare Abbildung im Sinn von `,e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"}),`. Bei
fest gewählten Gewichten ist sie schlicht linear im Eingangstensor. Interessant
wird es, wenn wir die Gewichte als zweites Argument hinzunehmen: Jeder
Ausgangseintrag ist eine Summe von Produkten aus je einem Gewicht und je einem
Eingangseintrag, die Zuordnung
`,e.jsx(n,{children:"(\\text{Gewichte}, \\text{Eingang}) \\mapsto \\text{Ausgang}"}),` ist damit bilinear,
also der Fall `,e.jsx(n,{children:"k = 2"}),` des Darstellungssatzes. Zu einer vollständigen Schicht
gehören meist noch ein additiver Term und eine nichtlineare Funktion, die auf
jeden Eintrag einzeln wirkt. Erst diese Funktion macht aus einem
`,e.jsx(h,{id:"neural-network",children:"neuronalen Netz"}),` mehr als eine lange Kette linearer
Abbildungen.`]}),e.jsxs(H,{children:[e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein Farbbild mit ",e.jsx(n,{children:"224 \\times 224"}),` Pixeln und drei Farbkanälen ist ein Tensor der
Stufe `,e.jsx(n,{children:"3"})," mit ",e.jsx(n,{children:"150\\,528"})," Einträgen."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528"}),", also rund ",e.jsx(n,{children:"150 \\cdot 10^3"}),` Zahlen
(`,e.jsx(i.a,{href:"#env-ein-farbbild-als-tensor-der-stufe-3",children:"Beispiel 9.2.7"}),`). Die drei Indexpositionen sind die beiden Pixelrichtungen und
der Farbkanal; in welcher Reihenfolge sie stehen, ist Verabredung und von
Bibliothek zu Bibliothek verschieden.`]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:[`Weil die Faltungsschicht
`,e.jsx(n,{children:"c \\colon \\R^{32 \\times 224 \\times 224 \\times 3} \\to \\R^{32 \\times 56 \\times 56 \\times 64}"}),`
die Auflösung von `,e.jsx(n,{children:"224 \\times 224"})," auf ",e.jsx(n,{children:"56 \\times 56"}),` senkt, hat ihr Ausgang
weniger Einträge als ihr Eingang.`]}),e.jsxs(i.p,{children:["Nachgezählt: ",e.jsx(n,{children:"32 \\cdot 224 \\cdot 224 \\cdot 3 = 4\\,816\\,896"}),` gegen
`,e.jsx(n,{children:"32 \\cdot 56 \\cdot 56 \\cdot 64 = 6\\,422\\,528"}),`. Die Auflösung fällt um den Faktor
`,e.jsx(n,{children:"16"}),", die Kanalzahl wächst um den Faktor ",e.jsx(n,{children:"64/3"}),`, zusammen wächst die Zahl der
Einträge um den Faktor `,e.jsx(n,{children:"4/3"})," (",e.jsx(i.a,{href:"#env-feature-maps-eine-abbildung-von-tensoren",children:"Beispiel 9.2.9"}),")."]})]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(H,{children:[e.jsxs(tn,{loesung:64,toleranz:0,children:[e.jsxs(i.p,{children:[`Wie viele Einträge zeigt der Zahlen-Stapel des Widgets bei vier Scheiben einer
`,e.jsx(n,{children:"4\\times4"}),"-Matrix?"]}),e.jsx(i.p,{children:`Die zusätzliche Indexposition multipliziert die Zahl der Einträge mit der Zahl
der Scheiben.`})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Setzen wir im Darstellungssatz ",e.jsx(n,{children:"k = 1"}),`, so ist die Koeffizientenansammlung eine
Matrix `,e.jsx(n,{children:"\\bA"}),", und es gilt ",e.jsx(n,{children:"T(\\bx) = \\bA\\bx"}),"."]}),e.jsxs(i.p,{children:["Das ist die Rechnung zu ",e.jsx(i.a,{href:"#eq-eq-9-2-1",children:"(9.2.1)"}),": Die innere Summe ",e.jsx(n,{children:"\\sum_j a_{i,j}\\be_j"}),` ist ein
fester Vektor `,e.jsx(n,{children:"\\ba_i \\in \\R^m"}),", und ",e.jsx(n,{children:"\\sum_i x_i \\ba_i"}),` ist das Matrix-Vektor-Produkt
mit `,e.jsx(n,{children:"\\bA = (\\ba_1 \\mid \\cdots \\mid \\ba_n)"}),`. Auf die Reihenfolge der Indizes
müssen wir dabei achten, siehe `,e.jsx(i.a,{href:"#env-von-der-koeffizientenfamilie-zur-matrix",children:"Bemerkung 9.2.1"}),"."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsx(i.p,{children:"Die Stufe eines Tensors ist die Anzahl seiner Einträge."}),e.jsxs(i.p,{children:[`Die Stufe zählt die Indexpositionen. Ein Tensor des Formats
`,e.jsx(n,{children:"4 \\times 4 \\times 4"})," hat die Stufe ",e.jsx(n,{children:"3"}),", aber ",e.jsx(n,{children:"4^3 = 64"}),` Einträge
(`,e.jsx(i.a,{href:"#env-tensor",children:"Definition 9.2.3"}),")."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Vektorraum ",e.jsx(n,{children:"\\R^{4 \\times 4 \\times 4}"})," hat die Dimension ",e.jsx(n,{children:"3"}),"."]}),e.jsxs(i.p,{children:["Seine Dimension ist ",e.jsx(n,{children:"4 \\cdot 4 \\cdot 4 = 64"}),`, denn so viele Einheitstensoren
bilden nach `,e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"})," eine Basis. Die ",e.jsx(n,{children:"3"}),` ist die Stufe, also die Zahl der
Indexpositionen; `,e.jsx(i.a,{href:"#env-stufe-und-dimension-sind-zwei",children:"Bemerkung 9.2.6"})," hält die beiden Zahlen auseinander."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Tensor ist durch die Menge seiner Einträge festgelegt."}),e.jsxs(i.p,{children:[`Eine Menge kennt weder Reihenfolge noch Vielfachheit. Vertauschen wir zwei
verschiedene Einträge einer Matrix, so bleibt die Menge der vorkommenden Zahlen
dieselbe, die Matrix ist aber eine andere. Festgelegt ist ein Tensor durch die Zuordnung von
Indextupeln zu Zahlen (`,e.jsx(i.a,{href:"#env-tensor",children:"Definition 9.2.3"})," und ",e.jsx(i.a,{href:"#env-stufe-und-warum-eine-menge-es-nicht-tut",children:"Bemerkung 9.2.4"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §5.4, wo mehrdimensionale Zahlenfelder beim Ableiten
matrixwertiger Ausdrücke ganz von selbst auftreten.`})})]})}function un(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Fe,{...r})}):Fe(r)}const{blau:xn,gruen:bn,orange:ke,rot:en}=X,Ee=[{name:"Vektorisierung",A:[[1,2],[0,1]],B:[[1,1],[0,2]]},{name:"Diagonale Faktoren",A:[[2,0],[0,-1]],B:[[3,0],[0,4]]},{name:"Gemischte Vorzeichen",A:[[1,-1],[2,0]],B:[[0,1],[1,1]]}],oe=r=>r[0].map((i,s)=>r.map(l=>l[s])),mn=(r,i)=>r.flatMap(s=>i.map(l=>s.flatMap(d=>l.map(x=>d*x))));function gn({factor:r,block:i}){const s=i.length,l=30;return e.jsxs("svg",{viewBox:`0 0 ${s*l+8} ${s*l+8}`,width:s*l+8,height:s*l+8,className:"max-w-full h-auto",role:"img","aria-label":"Kroneckerprodukt als vier farbige Blöcke",children:[i.map((d,x)=>d.map((o,u)=>{const a=4+u*l,b=4+x*l,m=Math.floor(x/2),g=Math.floor(u/2),k=Math.min(.58,.12+Math.abs(r[m][g])*.12);return e.jsxs("g",{children:[e.jsx("rect",{x:a,y:b,width:l,height:l,fill:ke,fillOpacity:k,stroke:"var(--w-border)"}),e.jsx("text",{x:a+l/2,y:b+19,textAnchor:"middle",fill:"var(--w-text)",fontSize:"10",children:o})]},`${x}-${u}`)})),e.jsx("path",{d:`M${4+2*l} 4V${4+s*l}M4 ${4+2*l}H${4+s*l}`,stroke:en,strokeWidth:"1.5"})]})}function jn(){const[r,i]=_.useState(0),[s,l]=_.useState(!1),{A:d,B:x}=Ee[r],o=s?d:oe(x),u=s?oe(x):d,a=mn(o,u),b=s?"A ⊗_K Bᵀ":"Bᵀ ⊗_K A";return e.jsxs("div",{className:"rounded p-3",style:{backgroundColor:"var(--w-bg)"},children:[e.jsx(Z,{children:"Wählen wir Faktoren und vertauschen wir die Kronecker-Reihenfolge. Welche Blockmatrix wirkt auf vec(X)?"}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:xn},children:"A"}),e.jsx(W,{value:d})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:bn},children:"Bᵀ"}),e.jsx(W,{value:oe(x)})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-sm",style:{color:ke},children:[b,": vier Blöcke"]}),e.jsx(gn,{factor:o,block:a})]})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[Ee.map((m,g)=>e.jsx("button",{type:"button","aria-pressed":r===g,onClick:()=>i(g),className:"rounded border px-2 py-1 text-sm",style:{borderColor:r===g?ke:"var(--w-border)"},children:m.name},m.name)),e.jsx("button",{type:"button","aria-pressed":s,onClick:()=>l(m=>!m),className:"rounded border px-2 py-1 text-sm",style:{borderColor:s?en:"var(--w-border)"},children:s?"Bᵀ ⊗_K A zeigen":"A ⊗_K Bᵀ zeigen"})]}),e.jsx(I,{kind:s?"warn":"ok",children:s?"A ⊗_K Bᵀ hat ebenfalls das Format 4 × 4, ordnet die vier Produkte aber anders an. Für quadratische Faktoren ist es zu Bᵀ ⊗_K A permutationsähnlich, nicht gleich.":`Jeder grüne Eintrag von Bᵀ skaliert einen ganzen blauen A-Block. Daher bildet Bᵀ ⊗_K A die gestapelten Spalten von X genau zu vec(AXB) ab, wie ${Qe("satz:vektorisierung-eines-matrixprodukts")} behauptet.`})]})}const{blau:Ve,gruen:Te,orange:qe,violett:Ke}=X;function pn(){const[r,i]=_.useState(10),[s,l]=_.useState(50),d=r*s,x=d*(d+1)/2,o=r*(r+1)/2+s*(s+1)/2,u=d**2,a=r**2+s**2,b=100*(1-o/x),m=d>=100;return e.jsxs("div",{children:[e.jsx(Z,{children:"Verändern wir Orte und Zeitpunkte und vergleichen die beiden Modellgrößen."}),e.jsxs("div",{className:"mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",role:"img","aria-label":"Vergleich einer allgemeinen und einer separierbaren Kovarianzmatrix.",children:[e.jsxs("div",{className:"rounded border p-3",style:{borderColor:qe},children:[e.jsxs("div",{className:"text-sm font-semibold",children:["allgemein: Σ ∈ ℝ^",d,"×",d]}),e.jsx("div",{className:"mt-2 font-mono text-2xl",style:{color:qe},children:p(x,0)}),e.jsx("div",{className:"text-sm",children:"freie Parameter"}),e.jsxs("div",{className:"mt-2 font-mono text-sm",children:[p(u,0)," gespeicherte Einträge"]})]}),e.jsxs("div",{className:"rounded border p-3",style:{borderColor:Ke},children:[e.jsxs("div",{className:"text-sm font-semibold",children:[e.jsx("span",{style:{color:Ve},children:"Σ_T"})," ⊗_K ",e.jsx("span",{style:{color:Te},children:"Σ_S"})]}),e.jsx("div",{className:"mt-2 font-mono text-2xl",style:{color:Ke},children:p(o,0)}),e.jsx("div",{className:"text-sm",children:"freie Parameter in zwei Faktoren"}),e.jsxs("div",{className:"mt-2 font-mono text-sm",children:[p(a,0)," gespeicherte Einträge"]})]})]}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(B,{label:"Orte m",value:r,onChange:i,min:2,max:50,step:1,accent:Te}),e.jsx(B,{label:"Zeitpunkte n",value:s,onChange:l,min:2,max:50,step:1,accent:Ve})]}),e.jsx(I,{kind:m?"ok":"neutral",children:m?`Für ${r} Orte und ${s} Zeitpunkte spart die separierbare Annahme ${p(b,1)} % der freien Parameter. Wir schätzen zwei Muster statt einer ${d}×${d}-Matrix.`:`Bei ${r}×${s} Messwerten ist der Unterschied noch klein, aber schon sichtbar: ${p(x,0)} statt ${p(o,0)} freie Parameter. Mit wachsendem Gitter wächst der Vorteil quadratisch.`})]})}const{blau:P,gruen:V,orange:ie,grau:re}=X,Pe=[1,1],We=[1,0],Ne=[1.3,.3],D=r=>150+48*r,y=r=>150-48*r,Ze=r=>Math.max(-2,Math.min(2,r)),R=([r,i])=>Math.hypot(r,i),kn=(r,i)=>[[r[0]*i[0],r[0]*i[1]],[r[1]*i[0],r[1]*i[1]]],Ie=(r,i)=>Math.hypot(r[0]-i[0],r[1]-i[1])<.03,fn=([r,i],s=1.82)=>{const l=Math.min(1,s/Math.max(Math.abs(r),Math.abs(i),Number.EPSILON));return[[l*r,l*i],l<1]},Ge=([r,i],s)=>{const l=Math.hypot(r,i);return l<1e-12?[0,0]:[s*r/l,s*i/l]},ue=(r,i)=>Ge(r==="kern"?[-i[1],i[0]]:i,1.3);function xe({titel:r,farbe:i,children:s}){return e.jsxs("fieldset",{className:"min-w-0 rounded-md border border-slate-200 px-3 pb-2 dark:border-slate-700",children:[e.jsx("legend",{className:"px-1 text-sm font-semibold",style:{color:i},children:r}),s]})}function vn({v:r,w:i,A:s}){return e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm","aria-label":"Faktoren und aktuelle Rang-eins-Matrix",children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:P},children:"v = "}),e.jsx(W,{value:[[r[0]],[r[1]]]})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:V},children:"w = "}),e.jsx(W,{value:[[i[0]],[i[1]]]})]}),e.jsxs("div",{children:[e.jsx("span",{children:"A = vwᵀ = "}),e.jsx(W,{value:s})]})]})}function wn(){const[r,i]=_.useState(Pe),[s,l]=_.useState(We),[d,x]=_.useState(Ne),o=fe({feld:{x0:54,y0:54,w:192,h:192},welt:{x0:-2,x1:2,y0:-2,y1:2},greifPosition:()=>d,onDrag:z=>x(z),clamp:([z,we])=>[Ze(z),Ze(we)]}),u=kn(r,s),a=s[0]*d[0]+s[1]*d[1],b=[r[0]*a,r[1]*a],m=R(r)>.12&&R(s)>.12,g=m&&Math.abs(a)<.08,k=[-s[1],s[0]],[j,M]=fn(b),G=ue("kern",s),Y=ue("ausserhalb",s),v=Ie(d,G)?"kern":Ie(d,Y)?"ausserhalb":null,F=z=>{R(s)>.12&&x(ue(z,s))},$=()=>{i(Pe),l(We),x(Ne)};return e.jsxs("div",{className:"space-y-3",children:[e.jsx(Z,{children:"Ziehen wir nur x: Zuerst lesen wir die Zahl wᵀx ab, dann das daraus entstehende Ax."}),e.jsxs("div",{className:"mx-auto max-w-xl rounded-md border border-slate-200 bg-white/60 p-3 dark:border-slate-700 dark:bg-slate-900/30",children:[e.jsx(vn,{v:r,w:s,A:u}),e.jsxs("div",{className:"mt-3 grid gap-2 sm:grid-cols-2","aria-label":"Die zwei Rechenschritte von A x",children:[e.jsxs("div",{className:"rounded-md border-l-4 border-emerald-600 bg-slate-50 p-2 dark:bg-slate-800/60",children:[e.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide",style:{color:V},children:"1 · Messen"}),e.jsxs("div",{className:"mt-1 font-mono text-sm tabular-nums",children:["wᵀx = ",p(s[0],1)," · ",p(d[0],1)," + ",p(s[1],1)," · ",p(d[1],1),e.jsxs("span",{className:"ml-2 font-semibold",style:{color:V},children:["= ",p(a,2)]})]})]}),e.jsxs("div",{className:"rounded-md border-l-4 border-orange-500 bg-slate-50 p-2 dark:bg-slate-800/60",children:[e.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide",style:{color:ie},children:"2 · Auf v ablegen"}),e.jsxs("div",{className:"mt-1 font-mono text-sm tabular-nums",children:["Ax = ",p(a,2)," · v",e.jsxs("span",{className:"ml-2 font-semibold",style:{color:ie},children:["= (",p(b[0],2),"; ",p(b[1],2),")ᵀ"]})]})]})]})]}),e.jsxs("svg",{viewBox:"0 0 300 300",className:"mx-auto block h-auto w-full max-w-[27rem] overflow-hidden",role:"img","aria-label":g?"Der Eingabevektor x liegt im gestrichelten Kern; das Ergebnis A x ist der Nullvektor.":"Der Eingabevektor x wird auf einen Vektor A x entlang der blauen Bildgeraden abgebildet.",...o.svgProps,children:[e.jsx("line",{x1:"54",y1:"150",x2:"246",y2:"150",stroke:"var(--w-axis)"}),e.jsx("line",{x1:"150",y1:"54",x2:"150",y2:"246",stroke:"var(--w-axis)"}),R(s)>.12&&e.jsx("line",{x1:D(-2*k[0]/R(k)),y1:y(-2*k[1]/R(k)),x2:D(2*k[0]/R(k)),y2:y(2*k[1]/R(k)),stroke:V,strokeDasharray:"6 4",strokeWidth:"2"}),R(r)>.12&&e.jsx("line",{x1:D(-2*r[0]/R(r)),y1:y(-2*r[1]/R(r)),x2:D(2*r[0]/R(r)),y2:y(2*r[1]/R(r)),stroke:P,strokeWidth:"2.5"}),e.jsx("line",{x1:"150",y1:"150",x2:D(s[0]),y2:y(s[1]),stroke:V,strokeWidth:"3"}),e.jsx("circle",{cx:D(s[0]),cy:y(s[1]),r:"3.5",fill:V}),e.jsx("line",{x1:"150",y1:"150",x2:D(r[0]),y2:y(r[1]),stroke:P,strokeWidth:"3"}),e.jsx("circle",{cx:D(r[0]),cy:y(r[1]),r:"3.5",fill:P}),e.jsx("line",{x1:"150",y1:"150",x2:D(d[0]),y2:y(d[1]),stroke:re,strokeWidth:"2.5"}),e.jsx("line",{x1:"150",y1:"150",x2:D(j[0]),y2:y(j[1]),stroke:ie,strokeWidth:"4"}),e.jsx("circle",{cx:D(j[0]),cy:y(j[1]),r:"3.5",fill:ie}),e.jsx("text",{x:"158",y:"69",fill:V,fontSize:"10",children:"ker A = w⊥"}),e.jsx("text",{x:"190",y:"223",fill:P,fontSize:"10",children:"im A = span(v)"}),e.jsx("text",{x:D(s[0])+6,y:y(s[1])+13,fill:V,fontSize:"11",children:"w"}),e.jsx("text",{x:D(r[0])+6,y:y(r[1])-6,fill:P,fontSize:"11",children:"v"}),e.jsx("text",{x:D(d[0])+6,y:y(d[1])-6,fill:"var(--w-text)",fontSize:"11",children:"x"}),e.jsx("text",{x:D(j[0])+(j[0]>1.4?-6:6),y:y(j[1])+(j[1]<-1.4?-7:13),textAnchor:j[0]>1.4?"end":"start",fill:ie,fontSize:"11",children:M?"Ax (außerhalb)":"Ax"}),e.jsx(ve,{x:D(d[0]),y:y(d[1]),farbe:re,aktiv:o.dragging==="x",...o.handleProps("x")})]}),e.jsxs("div",{className:"mx-auto flex max-w-xl flex-wrap gap-2",role:"group","aria-label":"Beispielfälle für x",children:[e.jsx("button",{type:"button",className:"rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900","aria-pressed":v==="ausserhalb",disabled:R(s)<=.12,onClick:()=>F("ausserhalb"),children:"x außerhalb des Kerns"}),e.jsx("button",{type:"button",className:"rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900","aria-pressed":v==="kern",disabled:R(s)<=.12,onClick:()=>F("kern"),children:"x im Kern"})]}),e.jsx("div",{className:"mx-auto w-full max-w-xl",children:e.jsxs(xe,{titel:"Nur die Eingabe x verändern",farbe:re,children:[e.jsx(B,{label:"x₁",value:d[0],onChange:z=>x([z,d[1]]),min:-2,max:2,step:.1,accent:re}),e.jsx(B,{label:"x₂",value:d[1],onChange:z=>x([d[0],z]),min:-2,max:2,step:.1,accent:re})]})}),e.jsx(I,{kind:m?g?"ok":"neutral":"warn",children:m?g?`1. Messen: wᵀx = ${p(a,2)}. 2. Auf v ablegen: Ax = 0 · v = 0. Genau deshalb gehört x zum Kern.`:`1. Messen: wᵀx = ${p(a,2)}. 2. Auf v ablegen: Ax = ${p(a,2)} · v = (${p(b[0],2)}; ${p(b[1],2)})ᵀ. Das Ergebnis liegt auf der blauen Bildgeraden span(v).`:"Mindestens einer der Faktoren ist der Nullvektor: A ist dann die Nullmatrix und keine Rang-1-Matrix."}),e.jsxs("details",{className:"mx-auto max-w-xl rounded-md border border-slate-200 p-3 dark:border-slate-700",children:[e.jsx("summary",{className:"cursor-pointer text-sm font-semibold",children:"Optional: v und w selbst verändern"}),e.jsxs("div",{className:"mt-3 grid gap-3",children:[e.jsxs(xe,{titel:"v dreht die Bildgerade",farbe:P,children:[e.jsx(B,{label:"v₁",value:r[0],onChange:z=>i([z,r[1]]),min:-2,max:2,step:.1,accent:P}),e.jsx(B,{label:"v₂",value:r[1],onChange:z=>i([r[0],z]),min:-2,max:2,step:.1,accent:P})]}),e.jsxs(xe,{titel:"w dreht den dazu senkrechten Kern",farbe:V,children:[e.jsx(B,{label:"w₁",value:s[0],onChange:z=>l([z,s[1]]),min:-2,max:2,step:.1,accent:V}),e.jsx(B,{label:"w₂",value:s[1],onChange:z=>l([s[0],z]),min:-2,max:2,step:.1,accent:V})]}),e.jsx("button",{type:"button",className:"w-fit rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-600",onClick:$,children:"Ausgangslage wiederherstellen"})]})]})]})}function $e(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Aus zwei Vektoren eine Zahl zu machen, ist uns vertraut: Das leistet das
Skalarprodukt. In diesem Abschnitt gehen wir in die Gegenrichtung und bauen aus
zwei Objekten ein größeres. Aus zwei Vektoren wird eine Matrix, aus zwei
Matrizen ein Tensor der Stufe `,e.jsx(n,{children:"4"}),` oder, anders angeordnet, eine sehr große
Matrix. In der Literatur tragen alle drei Konstruktionen dasselbe Zeichen
`,e.jsx(n,{children:"\\otimes"}),`; der Umgang mit dieser Doppelbelegung gehört zum Thema. Wir behalten
`,e.jsx(n,{children:"\\otimes"}),` dem äußeren Produkt und dem Tensorprodukt vor und schreiben die dritte
Konstruktion, das Kroneckerprodukt, als `,e.jsx(n,{children:"\\kron"}),"."]}),`
`,e.jsx(i.h3,{children:"Das äußere Produkt"}),`
`,e.jsxs(c,{kind:"Definition",label:"9.3.1 (Äußeres Produkt)",id:"env-aeusseres-produkt",children:[e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"äußere Produkt"})," (outer product) zweier Vektoren ",e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^m"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^n"})," ist die Matrix"]}),e.jsx(q,{tag:"9.3.1",id:"eq-aeusseres-produkt",children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw} := \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top
= \\begin{pmatrix}
\\corange{v_1 w_1} & \\cdots & \\corange{v_1 w_n} \\\\
\\vdots & & \\vdots \\\\
\\corange{v_m w_1} & \\cdots & \\corange{v_m w_n}
\\end{pmatrix} \\in \\R^{m \\times n} ,`}),e.jsxs(i.p,{children:[`also die Matrix mit den Einträgen
`,e.jsx(n,{children:"(\\cblue{\\bv} \\otimes \\cgreen{\\bw})_{ij} = \\corange{v_i w_j}"}),"."]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.2 (Inneres und äußeres Produkt)",id:"env-inneres-und-aeusseres-produkt",children:[e.jsxs(i.p,{children:["Das Skalarprodukt heißt auch ",e.jsx(i.em,{children:"inneres Produkt"}),` (inner product), und der
Namensvetter macht den Unterschied deutlich. Nebeneinandergestellt sind die
beiden Abbildungen`]}),e.jsx(t,{children:`\\inner{\\cdot, \\cdot}\\colon \\R^n \\times \\R^n \\to \\R ,
\\qquad \\inner{\\cblue{\\bv}, \\cgreen{\\bw}} = \\cblue{\\bv}^\\top\\cgreen{\\bw} ,`}),e.jsx(t,{children:`\\otimes\\colon \\R^m \\times \\R^n \\to \\R^{m \\times n} ,
\\qquad \\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top .`}),e.jsxs(i.p,{children:[`Drei Unterschiede lohnen einen Blick. Das innere Produkt verlangt zwei Vektoren
gleicher Länge, das äußere verträgt beliebige Längen. Beim inneren Produkt
steht das Transponat links, beim äußeren rechts. Und heraus kommt einmal eine
einzige Zahl, einmal eine ganze Matrix aus `,e.jsx(n,{children:"mn"})," Zahlen."]}),e.jsxs(i.p,{children:[`Wer sich die Formeln nicht merken mag, zählt die Formate ab: In
`,e.jsx(n,{children:"\\cblue{\\bv}^\\top\\cgreen{\\bw}"})," multiplizieren wir ",e.jsx(n,{children:"(1 \\times n)"}),` mit
`,e.jsx(n,{children:"(n \\times 1)"}),`, die langen Dimensionen treffen sich innen und verschwinden. In
`,e.jsx(n,{children:"\\cblue{\\bv}\\,\\cgreen{\\bw}^\\top"})," multiplizieren wir ",e.jsx(n,{children:"(m \\times 1)"}),` mit
`,e.jsx(n,{children:"(1 \\times n)"}),", die langen Dimensionen stehen außen und bleiben stehen."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.3 (Äußeres Produkt zweier Vektoren)",id:"env-aeusseres-produkt-zweier-vektoren",children:[e.jsx(i.p,{children:"Für"}),e.jsx(t,{children:`\\cblue{\\bv} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix} \\in \\R^2
\\qquad\\text{und}\\qquad
\\cgreen{\\bw} = \\begin{pmatrix} \\cgreen{-2} \\\\ \\cgreen{3} \\\\ \\cgreen{-11} \\end{pmatrix} \\in \\R^3`}),e.jsx(i.p,{children:"ist"}),e.jsx(t,{children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top
= \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix}
  \\begin{pmatrix} \\cgreen{-2} & \\cgreen{3} & \\cgreen{-11} \\end{pmatrix}
= \\begin{pmatrix}
\\corange{-2} & \\corange{3} & \\corange{-11} \\\\
\\corange{-4} & \\corange{6} & \\corange{-22}
\\end{pmatrix} \\in \\R^{2 \\times 3} .`}),e.jsxs(i.p,{children:["Die zweite Zeile ist das Doppelte der ersten, denn ",e.jsx(n,{children:"\\cblue{v_2} = 2\\cblue{v_1}"}),`.
Genauso ist jede Spalte ein Vielfaches von `,e.jsx(n,{children:"\\cblue{\\bv} = (1, 2)^\\top"}),`. Das ist
kein Zufall dieses Beispiels, sondern die Regel.`]})]}),`
`,e.jsx(i.h3,{children:"Eine Rang-1-Matrix und was sie tut"}),`
`,e.jsx(i.p,{children:"Wie hängen die beiden Faktoren einer Rang-1-Matrix mit ihrem Kern und ihrem Bild zusammen?"}),`
`,e.jsxs(N,{title:"Ein Bildraum als Gerade",children:[e.jsx(wn,{}),e.jsxs(i.p,{children:["Wie das Widget zeigt, bestimmt ",e.jsx(n,{children:"\\bv"})," die Bildgerade und ",e.jsx(n,{children:"\\bw"}),` die dazu
orthogonale Kernrichtung einer Rang-1-Matrix.`]})]}),`
`,e.jsxs(c,{kind:"Satz",label:"9.3.4 (Eigenschaften des äußeren Produkts)",id:"env-eigenschaften-des-aeusseren-produkts",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^m"})," und ",e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^n"}),` beide vom Nullvektor
verschieden, und sei `,e.jsx(n,{children:"\\bM = \\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\bM"})," ist ",e.jsx(n,{children:"\\cgreen{w_j}\\,\\cblue{\\bv}"}),", die ",e.jsx(n,{children:"i"}),`-te Zeile
ist `,e.jsx(n,{children:"\\cblue{v_i}\\,\\cgreen{\\bw}^\\top"}),"."]}),`
`,e.jsxs(i.li,{children:["Für alle ",e.jsx(n,{children:"\\bx \\in \\R^n"}),` ist
`,e.jsx(n,{children:"\\bM\\bx = \\cblue{\\bv}\\,\\inner{\\cgreen{\\bw}, \\bx}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\col(\\bM) = \\spann\\{\\cblue{\\bv}\\}"}),", das ",e.jsx(h,{id:"image",children:"Bild"}),` ist also
eindimensional, und `,e.jsx(n,{children:"\\rang(\\bM) = 1"}),"."]}),`
`,e.jsxs(i.li,{children:["Der ",e.jsx(h,{id:"kernel",children:"Kern"}),` ist
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bM) = \\{\\bx \\in \\R^n : \\cgreen{\\bw}^\\top\\bx = 0\\}"}),`, also
die `,e.jsx(h,{id:"hyperplane",children:"Hyperebene"}),` durch den Ursprung senkrecht zu
`,e.jsx(n,{children:"\\cgreen{\\bw}"}),"; sie hat die Dimension ",e.jsx(n,{children:"n - 1"}),"."]}),`
`]})]}),`
`,e.jsx(K,{title:"Beweis der Eigenschaften des äußeren Produkts",children:e.jsxs(J,{children:[e.jsx(E,{why:e.jsx(e.Fragment,{children:"Ausklammern eines gemeinsamen Faktors, Eintrag für Eintrag"}),children:e.jsxs(i.p,{children:["Zu (1): Nach ",e.jsx(i.a,{href:"#eq-aeusseres-produkt",children:"(9.3.1)"})," steht an der Stelle ",e.jsx(n,{children:"(i,j)"}),` der Eintrag
`,e.jsx(n,{children:"\\corange{v_i w_j}"}),". In der ",e.jsx(n,{children:"j"}),`-ten Spalte steckt damit in jedem Eintrag derselbe
Faktor `,e.jsx(n,{children:"\\cgreen{w_j}"}),", sie ist also ",e.jsx(n,{children:"\\cgreen{w_j}\\,\\cblue{\\bv}"}),`; für die Zeilen
läuft es genauso mit `,e.jsx(n,{children:"\\cblue{v_i}"}),"."]})}),e.jsxs(E,{why:e.jsxs(e.Fragment,{children:["Assoziativität des Matrixprodukts; ",e.jsx(n,{children:"\\cgreen{\\bw}^\\top\\bx"})," ist eine ",e.jsx(n,{children:"1 \\times 1"}),"-Matrix, also eine Zahl, und Zahlen dürfen wir vor den Vektor ziehen"]}),children:[e.jsx(i.p,{children:"Zu (2): Wir setzen die Definition ein und klammern anders:"}),e.jsx(t,{children:`\\bM\\bx = \\bigl(\\cblue{\\bv}\\,\\cgreen{\\bw}^\\top\\bigr)\\bx
= \\cblue{\\bv}\\,\\bigl(\\cgreen{\\bw}^\\top\\bx\\bigr)
= \\cblue{\\bv}\\,\\inner{\\cgreen{\\bw}, \\bx} .`}),e.jsxs(i.p,{children:[`Das Matrixprodukt sagt uns damit, was diese lineare Abbildung tut: Sie misst
`,e.jsx(n,{children:"\\bx"})," gegen ",e.jsx(n,{children:"\\cgreen{\\bw}"}),` und trägt das Ergebnis als Vielfaches von
`,e.jsx(n,{children:"\\cblue{\\bv}"})," ab."]})]}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["hier brauchen wir ",e.jsx(n,{children:"\\cgreen{\\bw} \\neq \\bnull"}),", sonst ist die Division nicht erlaubt und ",e.jsx(n,{children:"\\bM"})," die Nullmatrix; der ",e.jsx(h,{id:"rank",children:"Rang"})," ist die Dimension des Bildes"]}),children:e.jsxs(i.p,{children:["Zu (3): Nach Schritt 2 ist jedes Bild ein Vielfaches von ",e.jsx(n,{children:"\\cblue{\\bv}"}),`, also
`,e.jsx(n,{children:"\\col(\\bM) \\subseteq \\spann\\{\\cblue{\\bv}\\}"}),`. Umgekehrt erreichen wir jedes
Vielfache: Für `,e.jsx(n,{children:"\\bx = t\\,\\cgreen{\\bw}/\\left\\|\\cgreen{\\bw}\\right\\|^2"}),` ist
`,e.jsx(n,{children:"\\inner{\\cgreen{\\bw}, \\bx} = t"})," und damit ",e.jsx(n,{children:"\\bM\\bx = t\\,\\cblue{\\bv}"}),`. Wegen
`,e.jsx(n,{children:"\\cblue{\\bv} \\neq \\bnull"})," hat dieser Bildraum die Dimension ",e.jsx(n,{children:"1"}),"."]})}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["ein Vielfaches ",e.jsx(n,{children:"c\\,\\cblue{\\bv}"})," ist genau dann der Nullvektor, wenn ",e.jsx(n,{children:"c = 0"})," ist; der ",e.jsx(h,{id:"rank-nullity-theorem",children:"Rangsatz"})," verlangt ",e.jsx(n,{children:"\\rang(\\bM) + \\dim\\operatorname{Kern}(\\bM) = n"})]}),children:e.jsxs(i.p,{children:["Zu (4): Nach Schritt 2 gilt ",e.jsx(n,{children:"\\bM\\bx = \\bnull"}),` genau dann, wenn
`,e.jsx(n,{children:"\\inner{\\cgreen{\\bw}, \\bx}\\,\\cblue{\\bv} = \\bnull"}),` ist, und wegen
`,e.jsx(n,{children:"\\cblue{\\bv} \\neq \\bnull"})," genau dann, wenn ",e.jsx(n,{children:"\\cgreen{\\bw}^\\top\\bx = 0"}),` ist. Das
ist die Menge aller zu `,e.jsx(n,{children:"\\cgreen{\\bw}"}),` orthogonalen Vektoren. Die Probe liefert
der Rangsatz: `,e.jsx(n,{children:"1 + (n-1) = n"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:[`Damit ist das äußere Produkt der Prototyp einer Rang-1-Matrix. Es gilt sogar die
Umkehrung: Jede Matrix vom Rang `,e.jsx(n,{children:"1"})," lässt sich als ",e.jsx(n,{children:`\\cblue{\\bv} \\otimes
\\cgreen{\\bw}`})," schreiben, denn hat ihr Spaltenraum die Dimension ",e.jsx(n,{children:"1"}),`, so ist jede
Spalte ein Vielfaches eines festen `,e.jsx(n,{children:"\\cblue{\\bv}"}),`, und die Vielfachen sammeln wir
in `,e.jsx(n,{children:"\\cgreen{\\bw}"}),"."]}),`
`,e.jsx(i.h3,{children:"Wo äußere Produkte auftauchen"}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.5 (Die SVD als Summe äußerer Produkte)",id:"env-die-svd-als-summe-aeusserer-produkte",children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),` haben wir die Singulärwertzerlegung
ausmultipliziert und für `,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),` die
Summenform`]}),e.jsx(t,{children:`\\bA = \\bU_r\\bSigma_r\\bV_r^\\top
= \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}`}),e.jsxs(i.p,{children:["erhalten (",e.jsx(i.a,{href:"?k=06-svd#env-summenform-der-svd",children:"Satz 6.4.2"}),"; dort noch als ",e.jsx(n,{children:"\\bu_i\\bv_i^\\top"}),` geschrieben). Jetzt lesen
wir sie mit `,e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),`: Jeder Summand ist eine Rang-1-Matrix, ihr Bild ist die
Gerade `,e.jsx(n,{children:"\\spann\\{\\cblue{\\bu_i}\\}"}),", und ",e.jsx(n,{children:"\\corange{\\sigma_i}"}),` sagt, wie stark
dieser Anteil zählt. Die SVD zerlegt eine Matrix also in `,e.jsx(n,{children:"r"}),` denkbar einfache Bausteine.
Brechen wir die Summe nach `,e.jsx(n,{children:"k"}),` Termen ab, entsteht die beste
`,e.jsx(h,{id:"low-rank-approximation",children:"Rang-k-Approximation"}),`, wie der Satz von
Eckart, Young und Mirsky in `,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"})," zeigt."]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.6 (Kovarianzmatrizen sind Mittel äußerer Produkte)",id:"env-kovarianzmatrizen-sind-mittel-aeusserer",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bx"})," ein Zufallsvektor im ",e.jsx(n,{children:"\\R^n"})," mit Erwartungswert ",e.jsx(n,{children:"\\bmu = \\E[\\bx]"}),`. Die
`,e.jsx(h,{id:"covariance-matrix",children:"Kovarianzmatrix"})," ist definiert als"]}),e.jsx(t,{children:"\\cov(\\bx) = \\E\\bigl[(\\bx - \\bmu) \\otimes (\\bx - \\bmu)\\bigr] ,"}),e.jsxs(i.p,{children:[`also als Erwartungswert eines äußeren Produkts, gebildet Eintrag für Eintrag.
Ausmultiplizieren und die Linearität des `,e.jsx(h,{id:"expected-value",children:"Erwartungswerts"}),`
liefern die Verschiebungsformel`]}),e.jsx(t,{children:`\\cov(\\bx) = \\E[\\bx \\otimes \\bx] - \\bmu \\otimes \\bmu
= \\E[\\bx \\otimes \\bx] - \\E[\\bx] \\otimes \\E[\\bx] ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"\\E[\\bx \\otimes \\bmu] = \\bmu \\otimes \\bmu = \\E[\\bmu \\otimes \\bx]"}),`, und von
den drei gleichen Termen bleibt einer mit negativem Vorzeichen übrig. Die Formel
ist die mehrdimensionale Fassung von
`,e.jsx(n,{children:"\\var(X) = \\E[X^2] - \\E[X]^2"}),`; numerisch ist sie aus demselben Grund heikel wie
dort, siehe die `,e.jsx(h,{id:"cancellation",children:"Auslöschung"}),` in
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),"."]}),e.jsxs(i.p,{children:["Für jede einzelne Realisierung ist ",e.jsx(n,{children:"(\\bx - \\bmu) \\otimes (\\bx - \\bmu)"}),` nach
`,e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),` eine Rang-1-Matrix; erst das Mitteln
über viele Richtungen macht die Kovarianzmatrix im Regelfall zu einer Matrix von
vollem Rang. Genauso gebaut ist die empirische Kovarianzmatrix aus `,e.jsx(n,{children:"N"}),`
Beobachtungen, `,e.jsx(n,{children:`\\wh{\\bSigma} = \\tfrac{1}{N-1}\\sum_{i=1}^{N} (\\bx_i - \\bar{\\bx})
\\otimes (\\bx_i - \\bar{\\bx})`}),`, und weil die zentrierten Vektoren sich zu null
summieren, ist `,e.jsx(n,{children:"\\rang(\\wh{\\bSigma}) \\le N - 1"}),`: Bei weniger Beobachtungen als
Dimensionen ist die Schätzung stets singulär.`]})]}),`
`,e.jsxs(K,{title:"Attention: Skalarprodukte in Massen",children:[e.jsxs(i.p,{children:[`Der Aufmerksamkeitsmechanismus (attention) moderner Sprachmodelle rechnet mit
drei Matrizen: `,e.jsx(n,{children:"\\bQ \\in \\R^{n_q \\times d_k}"}),` mit den Anfragen (queries)
`,e.jsx(n,{children:"\\bq_i^\\top"})," in den Zeilen, ",e.jsx(n,{children:"\\bK \\in \\R^{n_k \\times d_k}"}),` mit den Schlüsseln
(keys) `,e.jsx(n,{children:"\\bk_j^\\top"})," und ",e.jsx(n,{children:"\\bV \\in \\R^{n_k \\times d_v}"}),` mit den Werten (values).
Die übliche Form lautet`]}),e.jsx(t,{children:`\\text{Attention}(\\bQ, \\bK, \\bV)
= \\softmax\\!\\left(\\frac{\\bQ\\bK^\\top}{\\sqrt{d_k}}\\right)\\bV ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\softmax"})," zeilenweise wirkt und das Ergebnis in ",e.jsx(n,{children:"\\R^{n_q \\times d_v}"}),`
liegt. Der interessante Faktor ist `,e.jsx(n,{children:"\\bQ\\bK^\\top"}),`:
Sein Eintrag `,e.jsx(n,{children:"(i,j)"})," ist das innere Produkt ",e.jsx(n,{children:"\\inner{\\bq_i, \\bk_j}"}),`, das Modell
vergleicht also jede Anfrage mit jedem Schlüssel. Als ganze Matrix ist derselbe
Ausdruck eine Summe äußerer Produkte, diesmal über die `,e.jsx(n,{children:"d_k"})," Spalten,"]}),e.jsx(t,{children:"\\bQ\\bK^\\top = \\sum_{l=1}^{d_k} \\bq^{(l)} \\otimes \\bk^{(l)} ,"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\bq^{(l)}"})," und ",e.jsx(n,{children:"\\bk^{(l)}"})," als ",e.jsx(n,{children:"l"}),"-ten Spalten von ",e.jsx(n,{children:"\\bQ"})," und ",e.jsx(n,{children:"\\bK"}),`. Der
Rang der `,e.jsx(i.em,{children:"Scorematrix"})," ",e.jsx(n,{children:"\\bQ\\bK^\\top"})," ist damit höchstens ",e.jsx(n,{children:"d_k"}),", und weil ",e.jsx(n,{children:"d_k"}),`
in der Praxis viel kleiner ist als die Zahl der Zeilen, steckt in den Scores eine
Zerlegung von niedrigem Rang, genau wie bei der SVD. Diese Aussage gilt vor der
Softmax-Transformation: Softmax ist nicht linear und erhält die Rangschranke im
Allgemeinen nicht, die Matrix der Attention-Gewichte kann also vollen Rang haben.`]})]}),`
`,e.jsx(i.h3,{children:"Das Tensorprodukt"}),`
`,e.jsxs(i.p,{children:[`Das äußere Produkt macht aus zwei Vektoren eine Matrix, aus zwei Objekten der
Stufe `,e.jsx(n,{children:"1"})," also eines der Stufe ",e.jsx(n,{children:"2"}),`. Diese Idee lässt sich auf beliebige Stufen
übertragen, und die Vorschrift bleibt dieselbe: Jeder Eintrag des einen Tensors
wird mit jedem Eintrag des anderen multipliziert.`]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.3.7 (Tensorprodukt)",id:"env-tensorprodukt",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{A} \\in \\R^{m_1 \\times \\cdots \\times m_p}"})," ein Tensor der Stufe ",e.jsx(n,{children:"p"}),`
und `,e.jsx(n,{children:"\\cgreen{B} \\in \\R^{n_1 \\times \\cdots \\times n_q}"})," einer der Stufe ",e.jsx(n,{children:"q"}),`. Ihr
`,e.jsx(i.em,{children:"Tensorprodukt"}),` ist der Tensor
`,e.jsx(n,{children:"\\cblue{A} \\otimes \\cgreen{B} = C \\in \\R^{m_1 \\times \\cdots \\times m_p \\times n_1 \\times \\cdots \\times n_q}"}),`
der Stufe `,e.jsx(n,{children:"p + q"})," mit den Einträgen"]}),e.jsx(q,{tag:"9.3.2",id:"eq-tensorprodukt",children:`\\corange{c_{i_1, \\dots, i_p, j_1, \\dots, j_q}}
= \\cblue{a_{i_1, \\dots, i_p}} \\cdot \\cgreen{b_{j_1, \\dots, j_q}} ,`}),e.jsxs(i.p,{children:["für alle ",e.jsx(n,{children:"1 \\le i_r \\le m_r"})," und ",e.jsx(n,{children:"1 \\le j_s \\le n_s"}),`. Das Tensorprodukt ist also
eine Abbildung`]}),e.jsx(t,{children:`\\otimes\\colon \\R^{m_1 \\times \\cdots \\times m_p} \\times \\R^{n_1 \\times \\cdots \\times n_q}
\\to \\R^{m_1 \\times \\cdots \\times m_p \\times n_1 \\times \\cdots \\times n_q} .`})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.8 (Stufen addieren sich, Einträge multiplizieren sich)",id:"env-stufen-addieren-sich-eintraege",children:[e.jsxs(i.p,{children:["Der Ergebnistensor hat ",e.jsx(n,{children:"p + q"})," Indexpositionen, seine ersten ",e.jsx(n,{children:"p"}),` Indizes kommen
von `,e.jsx(n,{children:"\\cblue{A}"}),", die letzten ",e.jsx(n,{children:"q"})," von ",e.jsx(n,{children:"\\cgreen{B}"}),". Gezählt werden dabei"]}),e.jsx(t,{children:"(m_1 \\cdots m_p) \\cdot (n_1 \\cdots n_q)"}),e.jsxs(i.p,{children:["Einträge, denn jeder Eintrag von ",e.jsx(n,{children:"\\cblue{A}"}),` trifft genau einmal auf jeden
Eintrag von `,e.jsx(n,{children:"\\cgreen{B}"}),"."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"p = q = 1"})," sind beide Faktoren Vektoren, und ",e.jsx(i.a,{href:"#eq-tensorprodukt",children:"(9.3.2)"}),` wird zu
`,e.jsx(n,{children:"\\corange{c_{i,j}} = \\cblue{a_i}\\cgreen{b_j}"}),`. Das ist Wort für Wort
`,e.jsx(i.a,{href:"#env-aeusseres-produkt",children:"Definition 9.3.1"}),`: Das äußere Produkt ist das Tensorprodukt zweier Tensoren der
Stufe `,e.jsx(n,{children:"1"}),". Im Bild aus ",e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),` heißt das: Zwei Vektoren
spannen ein Gitter von Produkten auf, drei Vektoren einen Quader, und jede
weitere Stufe legt eine Achse dazu.`]})]}),`
`,e.jsxs(c,{kind:"Satz",label:"9.3.9 (Das Tensorprodukt ist bilinear)",id:"env-das-tensorprodukt-ist-bilinear",children:[e.jsxs(i.p,{children:["Für Tensoren ",e.jsx(n,{children:"A, A'"})," desselben Formats, ",e.jsx(n,{children:"B, B'"}),` desselben Formats und
`,e.jsx(n,{children:"c \\in \\R"})," gilt"]}),e.jsx(t,{children:`(A + A') \\otimes B = A \\otimes B + A' \\otimes B ,
\\qquad (cA) \\otimes B = c\\,(A \\otimes B) ,`}),e.jsxs(i.p,{children:[`und ebenso im zweiten Argument. Außerdem ist das Tensorprodukt assoziativ: Für
einen dritten Tensor `,e.jsx(n,{children:"D"}),` beliebigen Formats gilt
`,e.jsx(n,{children:"(A \\otimes B) \\otimes D = A \\otimes (B \\otimes D)"}),"."]})]}),`
`,e.jsx(K,{title:"Beweis der Bilinearität des Tensorprodukts",children:e.jsxs(J,{children:[e.jsx(E,{why:e.jsxs(e.Fragment,{children:["an der Stelle ",e.jsx(n,{children:"(i_1, \\dots, i_p, j_1, \\dots, j_q)"})," etwa ",e.jsx(n,{children:"(a_{i_1, \\dots, i_p} + a'_{i_1, \\dots, i_p})\\, b_{j_1, \\dots, j_q} = a_{i_1, \\dots, i_p} b_{j_1, \\dots, j_q} + a'_{i_1, \\dots, i_p} b_{j_1, \\dots, j_q}"}),"; Homogenität, zweites Argument und Assoziativität gehen genauso"]}),children:e.jsxs(i.p,{children:[`Alle Aussagen sind Gleichungen zwischen Tensoren, und zwei Tensoren sind genau
dann gleich, wenn sie an jeder Indexstelle übereinstimmen. Dort steht jeweils
eine Gleichung zwischen reellen Zahlen, die aus den Rechengesetzen in `,e.jsx(n,{children:"\\R"})," folgt."]})}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["Bilinearität ist der Fall ",e.jsx(n,{children:"n = 2"})," der Multilinearität"]}),children:e.jsxs(i.p,{children:[`Das Tensorprodukt ist damit in jedem seiner beiden Argumente linear, also eine
bilineare Abbildung im Sinn von `,e.jsx(i.a,{href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),`
(`,e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"}),"). Es ist selbst ein Beispiel für den Gegenstand dieses Kapitels."]})})]})}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.10 (Tensorprodukt dreier Vektoren)",id:"env-tensorprodukt-dreier-vektoren",children:[e.jsx(i.p,{children:"Wir nehmen"}),e.jsx(t,{children:`\\cblue{\\bu} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bv} = \\begin{pmatrix} \\cgreen{3} \\\\ \\cgreen{5} \\end{pmatrix} ,
\\qquad
\\cpurp{\\bw} = \\begin{pmatrix} \\cpurp{7} \\\\ \\cpurp{11} \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["alle drei im ",e.jsx(n,{children:"\\R^2"}),`. Das Tensorprodukt
`,e.jsx(n,{children:"T = \\cblue{\\bu} \\otimes \\cgreen{\\bv} \\otimes \\cpurp{\\bw} \\in \\R^{2 \\times 2 \\times 2}"}),`
hat nach `,e.jsx(i.a,{href:"#eq-tensorprodukt",children:"(9.3.2)"}),` die Einträge
`,e.jsx(n,{children:"\\corange{T_{i,j,k}} = \\cblue{u_i}\\,\\cgreen{v_j}\\,\\cpurp{w_k}"}),`. Die Klammerung
brauchen wir dank `,e.jsx(i.a,{href:"#env-das-tensorprodukt-ist-bilinear",children:"Satz 9.3.9"}),` nicht zu notieren. Rechnen wir alle acht Einträge
aus, geordnet nach der dritten Indexposition:`]}),e.jsx(t,{children:`\\begin{aligned}
\\text{Scheibe } k = 1 \\;(\\cpurp{w_1} = \\cpurp{7})\\colon \\quad
&\\corange{T_{1,1,1}} = \\cblue{1} \\cdot \\cgreen{3} \\cdot \\cpurp{7} = \\corange{21} , &
&\\corange{T_{1,2,1}} = \\cblue{1} \\cdot \\cgreen{5} \\cdot \\cpurp{7} = \\corange{35} , \\\\
&\\corange{T_{2,1,1}} = \\cblue{2} \\cdot \\cgreen{3} \\cdot \\cpurp{7} = \\corange{42} , &
&\\corange{T_{2,2,1}} = \\cblue{2} \\cdot \\cgreen{5} \\cdot \\cpurp{7} = \\corange{70} , \\\\[4pt]
\\text{Scheibe } k = 2 \\;(\\cpurp{w_2} = \\cpurp{11})\\colon \\quad
&\\corange{T_{1,1,2}} = \\cblue{1} \\cdot \\cgreen{3} \\cdot \\cpurp{11} = \\corange{33} , &
&\\corange{T_{1,2,2}} = \\cblue{1} \\cdot \\cgreen{5} \\cdot \\cpurp{11} = \\corange{55} , \\\\
&\\corange{T_{2,1,2}} = \\cblue{2} \\cdot \\cgreen{3} \\cdot \\cpurp{11} = \\corange{66} , &
&\\corange{T_{2,2,2}} = \\cblue{2} \\cdot \\cgreen{5} \\cdot \\cpurp{11} = \\corange{110} .
\\end{aligned}`}),e.jsxs(i.p,{children:["Als Scheiben geschrieben, wie im Viewer aus ",e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),":"]}),e.jsx(t,{children:`T_{\\cdot,\\cdot,1} = \\begin{pmatrix} \\corange{21} & \\corange{35} \\\\ \\corange{42} & \\corange{70} \\end{pmatrix} ,
\\qquad
T_{\\cdot,\\cdot,2} = \\begin{pmatrix} \\corange{33} & \\corange{55} \\\\ \\corange{66} & \\corange{110} \\end{pmatrix} .`}),e.jsx(i.p,{children:"Beide Scheiben sind Vielfache derselben Matrix, nämlich"}),e.jsx(t,{children:`T_{\\cdot,\\cdot,k} = \\cpurp{w_k} \\cdot (\\cblue{\\bu} \\otimes \\cgreen{\\bv}) ,
\\qquad
\\cblue{\\bu} \\otimes \\cgreen{\\bv} = \\begin{pmatrix} \\corange{3} & \\corange{5} \\\\ \\corange{6} & \\corange{10} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"})," hat ",e.jsx(n,{children:"\\cblue{\\bu} \\otimes \\cgreen{\\bv}"})," den Rang ",e.jsx(n,{children:"1"}),`, und das
Vielfache mit `,e.jsx(n,{children:"\\cpurp{w_k} \\neq 0"}),` ändert daran nichts: Jede Scheibe dieses
Stufe-3-Tensors ist eine Rang-1-Matrix. Tensoren der Form
`,e.jsx(n,{children:"\\cblue{\\bu} \\otimes \\cgreen{\\bv} \\otimes \\cpurp{\\bw}"}),` mit Faktoren
`,e.jsx(n,{children:"\\neq \\bnull"})," heißen deshalb ",e.jsx(i.em,{children:"Rang-1-Tensoren"}),`. Jeder Stufe-3-Tensor ist eine
Summe solcher Bausteine, denn
schon die Basistensoren `,e.jsx(n,{children:"\\bE^{(i,j,k)}"})," aus dem Beweis von ",e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),`
(`,e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),`) sind welche: Es ist
`,e.jsx(n,{children:"\\bE^{(i,j,k)} = \\be_i \\otimes \\be_j \\otimes \\be_k"}),`. Die Analogie zur SVD hat
aber eine Grenze. Für Matrizen liefert `,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),` die Bausteine mit
orthogonalen Faktoren, der Größe nach geordnet und mit einem Verfahren
berechenbar. Ab Stufe `,e.jsx(n,{children:"3"}),` ist das im Allgemeinen nicht mehr zu haben, und schon
die kleinste Anzahl nötiger Summanden ist schwer zu bestimmen.`]})]}),`
`,e.jsx(i.h3,{children:"Das Kroneckerprodukt"}),`
`,e.jsxs(i.p,{children:[`Für Matrizen gibt es eine zweite Lesart des Produkts, die statt eines Tensors
der Stufe `,e.jsx(n,{children:"4"}),` wieder eine Matrix liefert. Sie ist überall dort im Einsatz, wo
mit Matrizen weitergerechnet werden soll.`]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.3.11 (Kroneckerprodukt)",id:"env-kroneckerprodukt",children:[e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Kroneckerprodukt"})," zweier Matrizen ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{p \\times q}"})," ist die Blockmatrix"]}),e.jsx(t,{children:`\\cblue{\\bA} \\kron \\cgreen{\\bB} = \\begin{pmatrix}
\\cblue{a_{11}}\\cgreen{\\bB} & \\cdots & \\cblue{a_{1n}}\\cgreen{\\bB} \\\\
\\vdots & & \\vdots \\\\
\\cblue{a_{m1}}\\cgreen{\\bB} & \\cdots & \\cblue{a_{mn}}\\cgreen{\\bB}
\\end{pmatrix} \\in \\R^{mp \\times nq} .`}),e.jsxs(i.p,{children:["Sie besteht aus ",e.jsx(n,{children:"m \\cdot n"})," Blöcken der Größe ",e.jsx(n,{children:"p \\times q"}),`; der Block an der
Stelle `,e.jsx(n,{children:"(i_1, i_2)"})," ist die mit ",e.jsx(n,{children:"\\cblue{a_{i_1 i_2}}"}),` skalierte Kopie von
`,e.jsx(n,{children:"\\cgreen{\\bB}"}),"."]}),e.jsxs(i.p,{children:["Das tiefgestellte ",e.jsx(n,{children:"\\mathrm{K}"})," in ",e.jsx(n,{children:"\\kron"}),` ist unsere Schreibweise; in der Literatur
steht auch hier meist `,e.jsx(n,{children:"\\otimes"})," (siehe ",e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),")."]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.12 (Zwei Bedeutungen, zwei Zeichen)",id:"env-zwei-bedeutungen-zwei-zeichen",children:[e.jsxs(i.p,{children:["Für zwei Matrizen ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{p \\times q}"}),` sind jetzt zwei verschiedene Produkte erklärt,
und beide sind gebräuchlich:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Tensorprodukt"})," nach ",e.jsx(i.a,{href:"#env-tensorprodukt",children:"Definition 9.3.7"})," liefert einen Tensor der Stufe ",e.jsx(n,{children:"4"}),`,
`,e.jsx(n,{children:"C \\in \\R^{m \\times n \\times p \\times q}"}),` mit
`,e.jsx(n,{children:"\\corange{c_{i_1, i_2, j_1, j_2}} = \\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}}"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Kroneckerprodukt"})," nach ",e.jsx(i.a,{href:"#env-kroneckerprodukt",children:"Definition 9.3.11"}),` liefert eine Matrix
`,e.jsx(n,{children:"\\bD \\in \\R^{mp \\times nq}"})," mit"]}),`
`,e.jsx(q,{tag:"9.3.3",id:"eq-zwei-bedeutungen-zwei-zeichen",children:"\\corange{d_{(i_1 - 1)p + j_1,\\; (i_2 - 1)q + j_2}} = \\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}} ."}),`
`]}),`
`]}),e.jsxs(i.p,{children:["Dieselben ",e.jsx(n,{children:"mnpq"})," Zahlen, verschieden angeordnet: ",e.jsx(n,{children:"\\bD"})," ist die ",e.jsx(i.em,{children:"abgeflachte"}),`
Fassung von `,e.jsx(n,{children:"C"}),". Die Indexformel ",e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` sagt genau, wie abgeflacht wird. Der
Zeilenindex läuft in `,e.jsx(n,{children:"m"})," Gruppen zu je ",e.jsx(n,{children:"p"})," Zeilen; die Gruppe wählt ",e.jsx(n,{children:"i_1"}),`, die
Position innerhalb der Gruppe wählt `,e.jsx(n,{children:"j_1"}),`. Für die Spalten gilt dasselbe mit
`,e.jsx(n,{children:"i_2"})," und ",e.jsx(n,{children:"j_2"}),`. Der Index des ersten Faktors läuft also langsam, der des
zweiten schnell.`]}),e.jsxs(i.p,{children:["Beide Produkte mit demselben Zeichen ",e.jsx(n,{children:"\\otimes"}),` zu schreiben, ist verbreitet; welche
Bedeutung gemeint ist, verrät dann das Format des Ergebnisses. Wir sparen uns diese
Rückfrage und schreiben `,e.jsx(n,{children:"\\kron"}),`, sobald das Kroneckerprodukt gemeint ist. Das Zeichen
`,e.jsx(n,{children:"\\otimes"}),` bleibt dem äußeren Produkt und dem Tensorprodukt vorbehalten. Beim Lesen fremder Texte
ist die Unterscheidung wieder Ihre Aufgabe.`]}),e.jsxs(i.p,{children:[`An Vektoren lässt sich das Abflachen gut ablesen. Fassen wir
`,e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^{m}"})," und ",e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^{n}"})," als ",e.jsx(n,{children:"(m \\times 1)"}),`- und
`,e.jsx(n,{children:"(n \\times 1)"}),`-Matrizen auf, so ist ihr Kroneckerprodukt der Vektor der Länge
`,e.jsx(n,{children:"mn"}),`, der die Zeilen des äußeren Produkts hintereinanderhängt. Steht der zweite
Faktor dagegen als Zeilenvektor da, kommt das äußere Produkt selbst heraus:`]}),e.jsx(t,{children:`\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\kron \\begin{pmatrix} 3 \\\\ 5 \\\\ 7 \\end{pmatrix}
= \\begin{pmatrix} \\corange{3} & \\corange{5} & \\corange{7} & \\corange{6} & \\corange{10} & \\corange{14} \\end{pmatrix}^\\top ,
\\qquad
\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\kron \\begin{pmatrix} 3 & 5 & 7 \\end{pmatrix}
= \\begin{pmatrix} \\corange{3} & \\corange{5} & \\corange{7} \\\\ \\corange{6} & \\corange{10} & \\corange{14} \\end{pmatrix} .`})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.13 (Kroneckerprodukt zweier kleiner Matrizen)",id:"env-kroneckerprodukt-zweier-kleiner-matrizen",children:[e.jsx(i.p,{children:"Für"}),e.jsx(t,{children:`\\cblue{\\bA} = \\begin{pmatrix} \\cblue{1} & \\cblue{0} \\\\ \\cblue{2} & \\cblue{5} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bB} = \\begin{pmatrix}
\\cgreen{3} & \\cgreen{0} & \\cgreen{0} \\\\
\\cgreen{0} & \\cgreen{2} & \\cgreen{0} \\\\
\\cgreen{-1} & \\cgreen{0} & \\cgreen{-1}
\\end{pmatrix}`}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB} \\in \\R^{6 \\times 6}"}),`, denn
`,e.jsx(n,{children:"2 \\cdot 3 = 6"}),` Zeilen und ebenso viele Spalten. Blockweise notiert und dann
ausgeschrieben:`]}),e.jsx(t,{children:`\\cblue{\\bA} \\kron \\cgreen{\\bB}
= \\begin{pmatrix}
\\cblue{1} \\cdot \\cgreen{\\bB} & \\cblue{0} \\cdot \\cgreen{\\bB} \\\\
\\cblue{2} \\cdot \\cgreen{\\bB} & \\cblue{5} \\cdot \\cgreen{\\bB}
\\end{pmatrix}
= \\begin{pmatrix}
\\corange{3} & \\corange{0} & \\corange{0} & \\corange{0} & \\corange{0} & \\corange{0} \\\\
\\corange{0} & \\corange{2} & \\corange{0} & \\corange{0} & \\corange{0} & \\corange{0} \\\\
\\corange{-1} & \\corange{0} & \\corange{-1} & \\corange{0} & \\corange{0} & \\corange{0} \\\\
\\corange{6} & \\corange{0} & \\corange{0} & \\corange{15} & \\corange{0} & \\corange{0} \\\\
\\corange{0} & \\corange{4} & \\corange{0} & \\corange{0} & \\corange{10} & \\corange{0} \\\\
\\corange{-2} & \\corange{0} & \\corange{-2} & \\corange{-5} & \\corange{0} & \\corange{-5}
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Der Block oben rechts ist die Nullmatrix, weil ",e.jsx(n,{children:"\\cblue{a_{12}} = \\cblue{0}"}),` ist.
Die Struktur von `,e.jsx(n,{children:"\\cgreen{\\bB}"}),` wiederholt sich in jedem der drei übrigen
Blöcke, nur mit unterschiedlichem Vorfaktor.`]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.14 (Transponieren und Reihenfolge)",id:"env-transponieren-und-reihenfolge",children:[e.jsx(i.p,{children:`Zwei Regeln sind im Umgang mit dem Kroneckerprodukt nützlich, und die erste
davon ist bequem:`}),e.jsx(t,{children:`\\bigl(\\cblue{\\bA} \\kron \\cgreen{\\bB}\\bigr)^\\top
= \\cblue{\\bA}^\\top \\kron \\cgreen{\\bB}^\\top .`}),e.jsxs(i.p,{children:[`Transponieren zieht also in beide Faktoren hinein, ohne ihre Reihenfolge zu
vertauschen. Der Nachweis ist ein Blick auf `,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),`: Auf beiden Seiten steht
an der Stelle mit Zeilenindex `,e.jsx(n,{children:"(i_2 - 1)q + j_2"}),` und Spaltenindex
`,e.jsx(n,{children:"(i_1 - 1)p + j_1"})," der Eintrag ",e.jsx(n,{children:"\\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}}"}),"."]}),e.jsxs(i.p,{children:["Die zweite Regel ist eine Warnung: Das Kroneckerprodukt ist ",e.jsx(i.strong,{children:`nicht
kommutativ`}),", im Allgemeinen also"]}),e.jsx(t,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB} \\neq \\cgreen{\\bB} \\kron \\cblue{\\bA} ."}),e.jsxs(i.p,{children:["Beide Produkte haben zwar dasselbe Format ",e.jsx(n,{children:"mp \\times nq"}),` und enthalten dieselben
`,e.jsx(n,{children:"mnpq"})," Zahlen, aber an anderen Stellen. Für die Matrizen aus ",e.jsx(i.a,{href:"#env-kroneckerprodukt-zweier-kleiner-matrizen",children:"Beispiel 9.3.13"}),`
steht an der Stelle `,e.jsx(n,{children:"(2,1)"})," in ",e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB}"}),` eine
`,e.jsx(n,{children:"\\corange{0}"}),", in ",e.jsx(n,{children:"\\cgreen{\\bB} \\kron \\cblue{\\bA}"})," dagegen eine ",e.jsx(n,{children:"\\cred{6}"}),`:
Dort ist der erste Block `,e.jsx(n,{children:"\\cgreen{3}\\,\\cblue{\\bA}"}),`, und dessen zweite Zeile
beginnt mit `,e.jsx(n,{children:"\\cgreen{3} \\cdot \\cblue{2}"}),"."]})]}),`
`,e.jsxs(N,{title:"Kroneckerprodukte selbst ausrechnen",children:[e.jsxs(i.p,{children:[`Der Rechner zeigt beide Faktoren und das Produkt in Blockdarstellung. Warum steht
in `,e.jsx(i.a,{href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),` gerade
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"})," vor ",e.jsx(n,{children:"\\vec(\\bX)"}),` und nicht dieselben
Faktoren in der anderen Reihenfolge?`]}),e.jsx(jn,{}),e.jsx(i.p,{children:`Die Blockstruktur legt fest, welche gestapelten Spalten miteinander verrechnet
werden; deshalb ist die Reihenfolge der Faktoren Teil der Rechenvorschrift.`})]}),`
`,e.jsx(i.h3,{children:"Blockstrukturen aus Kroneckerprodukten"}),`
`,e.jsxs(i.p,{children:["Setzen wir eine ",e.jsx(h,{id:"identity-matrix",children:"Einheitsmatrix"}),` als einen der beiden
Faktoren ein, entstehen Muster, die in der Statistik ständig vorkommen. Auf
welcher Seite sie steht, macht dabei den ganzen Unterschied.`]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.15 (S ⊗_K I_n verteilt die Einträge)",id:"env-s-k-i-n-verteilt-die-eintraege",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\bS} \\in \\R^{p \\times p}"})," mit den Einträgen ",e.jsx(n,{children:"\\cblue{s_{ij}}"}),`. Dann
ist jeder Block von `,e.jsx(n,{children:"\\cblue{\\bS} \\kron \\cgreen{\\bI_n}"})," eine Diagonalmatrix:"]}),e.jsx(t,{children:`\\cblue{\\bS} \\kron \\cgreen{\\bI_n} = \\begin{pmatrix}
\\cblue{s_{11}}\\cgreen{\\bI_n} & \\cdots & \\cblue{s_{1p}}\\cgreen{\\bI_n} \\\\
\\vdots & & \\vdots \\\\
\\cblue{s_{p1}}\\cgreen{\\bI_n} & \\cdots & \\cblue{s_{pp}}\\cgreen{\\bI_n}
\\end{pmatrix} \\in \\R^{np \\times np} .`}),e.jsxs(i.p,{children:["Jeder Eintrag ",e.jsx(n,{children:"\\cblue{s_{ij}}"})," taucht ",e.jsx(n,{children:"n"}),`-mal auf, nämlich an den Stellen
`,e.jsx(n,{children:"\\bigl((i-1)n + k,\\; (j-1)n + k\\bigr)"})," für ",e.jsx(n,{children:"k = 1, \\dots, n"}),`; alle übrigen
Einträge sind null. Für `,e.jsx(n,{children:"p = n = 2"}),` und
`,e.jsx(n,{children:"\\cblue{\\bS} = \\bigl(\\begin{smallmatrix} \\cblue{1} & \\cblue{2} \\\\ \\cblue{3} & \\cblue{4} \\end{smallmatrix}\\bigr)"}),`
sieht das so aus:`]}),e.jsx(t,{children:`\\cblue{\\bS} \\kron \\cgreen{\\bI_2} = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{2} & \\corange{0} \\\\
\\corange{0} & \\corange{1} & \\corange{0} & \\corange{2} \\\\
\\corange{3} & \\corange{0} & \\corange{4} & \\corange{0} \\\\
\\corange{0} & \\corange{3} & \\corange{0} & \\corange{4}
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Gelesen als Kovarianzstruktur heißt das: Die ",e.jsx(n,{children:"np"})," Koordinaten zerfallen in ",e.jsx(n,{children:"p"}),`
Gruppen zu je `,e.jsx(n,{children:"n"}),` Stück, und gekoppelt sind immer nur gleiche Positionen
verschiedener Gruppen, mit der Stärke `,e.jsx(n,{children:"\\cblue{s_{ij}}"}),". Es liegen also ",e.jsx(n,{children:"n"}),`
unabhängige Kopien der `,e.jsx(n,{children:"\\cblue{\\bS}"}),"-Struktur ineinandergeschoben."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.16 (I_n ⊗_K S ist blockdiagonal)",id:"env-i-n-k-s-ist-blockdiagonal",children:[e.jsxs(i.p,{children:[`Vertauschen wir die Reihenfolge, wird aus demselben Paar eine
Blockdiagonalmatrix. Die Farben bleiben an ihren Matrizen, `,e.jsx(n,{children:"\\cblue{\\bS}"}),` steht
jetzt also innen:`]}),e.jsx(t,{children:`\\cgreen{\\bI_n} \\kron \\cblue{\\bS} = \\begin{pmatrix}
\\cblue{\\bS} & & & \\\\
& \\cblue{\\bS} & & \\\\
& & \\ddots & \\\\
& & & \\cblue{\\bS}
\\end{pmatrix} \\in \\R^{np \\times np} ,`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"n"})," Kopien von ",e.jsx(n,{children:"\\cblue{\\bS} \\in \\R^{p \\times p}"}),` auf der Diagonalen und
Nullen sonst. In der Statistik ist das die Kovarianzmatrix eines Vektors, der
aus `,e.jsx(n,{children:"n"}),` voneinander unabhängigen Blöcken besteht, die alle dieselbe
Kovarianzmatrix `,e.jsx(n,{children:"\\cblue{\\bS}"})," haben; ein typischer Fall sind ",e.jsx(n,{children:"n"}),` Personen mit
je `,e.jsx(n,{children:"p"})," Messungen. Der Vergleich mit ",e.jsx(i.a,{href:"#env-s-k-i-n-verteilt-die-eintraege",children:"Beispiel 9.3.15"}),` zeigt die
Nicht-Kommutativität von der anschaulichen Seite: Dieselben zwei Faktoren
ergeben einmal eine blockdiagonale und einmal eine über die ganze Matrix
verteilte Struktur.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: separierbare Kovarianz"}),`
`,e.jsxs(i.p,{children:["Beobachten wir dieselbe Größe an ",e.jsx(n,{children:"m"})," Orten zu ",e.jsx(n,{children:"n"}),` Zeitpunkten, so haben wir
`,e.jsx(n,{children:"mn"})," Messwerte, und ihre Kovarianzmatrix hat das Format ",e.jsx(n,{children:"mn \\times mn"}),`. Schon
bei `,e.jsx(n,{children:"m = 10"})," Orten und ",e.jsx(n,{children:"n = 50"})," Zeitpunkten sind das ",e.jsx(n,{children:"500 \\times 500"}),` Einträge,
weit mehr, als sich aus überschaubaren Datenmengen schätzen lässt. Das
Kroneckerprodukt liefert eine sparsame Modellannahme.`]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.3.17 (Separierbare Kovarianz)",id:"env-separierbare-kovarianz",children:[e.jsxs(i.p,{children:["Die Kovarianzmatrix ",e.jsx(n,{children:"\\bSigma \\in \\R^{mn \\times mn}"}),` der Beobachtungen heißt
`,e.jsx(i.em,{children:"separierbar"}),", wenn sie sich als"]}),e.jsx(q,{tag:"9.3.4",id:"eq-separierbare-kovarianz",children:"\\bSigma = \\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}"}),e.jsxs(i.p,{children:["schreiben lässt, mit der Kovarianzmatrix ",e.jsx(n,{children:"\\cblue{\\bSigma_T} \\in \\R^{n \\times n}"}),`
zwischen den Zeitpunkten und der Kovarianzmatrix
`,e.jsx(n,{children:"\\cgreen{\\bSigma_S} \\in \\R^{m \\times m}"})," zwischen den Orten."]}),e.jsxs(i.p,{children:["Dabei müssen wir sagen, wie die ",e.jsx(n,{children:"mn"}),` Beobachtungen angeordnet sind. Nach
`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),` läuft der Index des ersten Faktors langsam und der des zweiten
schnell. Zu `,e.jsx(i.a,{href:"#eq-separierbare-kovarianz",children:"(9.3.4)"}),` gehört also die Anordnung, in der die Zeit langsam und der
Ort schnell läuft: erst alle Orte zum ersten Zeitpunkt, dann alle Orte zum
zweiten Zeitpunkt und so weiter.`]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.3.18 (Zwei Orte, zwei Zeitpunkte)",id:"env-zwei-orte-zwei-zeitpunkte",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m = 2"})," Orte und ",e.jsx(n,{children:"n = 2"})," Zeitpunkte seien"]}),e.jsx(t,{children:`\\cblue{\\bSigma_T} = \\begin{pmatrix} \\cblue{1{,}0} & \\cblue{0{,}8} \\\\ \\cblue{0{,}8} & \\cblue{1{,}0} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bSigma_S} = \\begin{pmatrix} \\cgreen{2{,}0} & \\cgreen{0{,}5} \\\\ \\cgreen{0{,}5} & \\cgreen{2{,}0} \\end{pmatrix} .`}),e.jsx(i.p,{children:"Dann ist"}),e.jsx(t,{children:`\\bSigma = \\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}
= \\begin{pmatrix}
\\cblue{1{,}0} \\cdot \\cgreen{\\bSigma_S} & \\cblue{0{,}8} \\cdot \\cgreen{\\bSigma_S} \\\\
\\cblue{0{,}8} \\cdot \\cgreen{\\bSigma_S} & \\cblue{1{,}0} \\cdot \\cgreen{\\bSigma_S}
\\end{pmatrix}
= \\begin{pmatrix}
\\corange{2{,}0} & \\corange{0{,}5} & \\corange{1{,}6} & \\corange{0{,}4} \\\\
\\corange{0{,}5} & \\corange{2{,}0} & \\corange{0{,}4} & \\corange{1{,}6} \\\\
\\corange{1{,}6} & \\corange{0{,}4} & \\corange{2{,}0} & \\corange{0{,}5} \\\\
\\corange{0{,}4} & \\corange{1{,}6} & \\corange{0{,}5} & \\corange{2{,}0}
\\end{pmatrix} \\in \\R^{4 \\times 4} .`}),e.jsx(i.p,{children:`Die vier Beobachtungen stehen in der Reihenfolge (Ort 1, Zeit 1), (Ort 2,
Zeit 1), (Ort 1, Zeit 2), (Ort 2, Zeit 2). Damit lesen wir die erste Zeile ab:`}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Eintrag"}),e.jsx(i.th,{children:"verbindet"}),e.jsx(i.th,{children:"Wert"}),e.jsx(i.th,{children:"Herkunft"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,1)"})}),e.jsx(i.td,{children:"Ort 1, Zeit 1 mit sich selbst"}),e.jsx(i.td,{children:e.jsx(n,{children:"2{,}0"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{1{,}0} \\cdot \\cgreen{2{,}0}"}),", eine Varianz"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,2)"})}),e.jsx(i.td,{children:"zwei Orte, gleiche Zeit"}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}5"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{1{,}0} \\cdot \\cgreen{0{,}5}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,3)"})}),e.jsx(i.td,{children:"gleicher Ort, zwei Zeiten"}),e.jsx(i.td,{children:e.jsx(n,{children:"1{,}6"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{0{,}8} \\cdot \\cgreen{2{,}0}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,4)"})}),e.jsx(i.td,{children:"anderer Ort, andere Zeit"}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}4"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{0{,}8} \\cdot \\cgreen{0{,}5}"})})]})]})]}),e.jsxs(i.p,{children:[`Noch klarer wird die Struktur in Korrelationen. Zwei Beobachtungen am selben Ort
zu verschiedenen Zeiten sind mit `,e.jsx(n,{children:"1{,}6/2{,}0 = 0{,}8"}),` korreliert, zwei
Beobachtungen zur selben Zeit an verschiedenen Orten mit
`,e.jsx(n,{children:"0{,}5/2{,}0 = 0{,}25"}),`, und unterscheiden sich beide Merkmale, so ist die
Korrelation das Produkt `,e.jsx(n,{children:"0{,}8 \\cdot 0{,}25 = 0{,}2"}),`. Separierbarkeit heißt
genau das: Die Korrelation zerfällt in einen zeitlichen und einen räumlichen
Anteil, die sich nicht gegenseitig beeinflussen.`]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.3.19 (Was die Annahme spart und was sie kostet)",id:"env-was-die-annahme-spart-und-was-sie-kostet",children:[e.jsxs(i.p,{children:[`Eine beliebige Kovarianzmatrix ist symmetrisch, hat also
`,e.jsx(n,{children:"\\tfrac{mn(mn+1)}{2}"}),` freie Einträge. Die separierbare Form braucht nur die
Einträge der beiden Faktoren,`]}),e.jsx(t,{children:"\\frac{m(m+1)}{2} + \\frac{n(n+1)}{2} ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m = n = 2"})," stehen ",e.jsx(n,{children:"10"})," Parametern also ",e.jsx(n,{children:"6"})," gegenüber, für ",e.jsx(n,{children:"m = 10"}),` Orte und
`,e.jsx(n,{children:"n = 50"})," Zeitpunkte sind es ",e.jsx(n,{children:"125\\,250"})," gegen ",e.jsx(n,{children:"1\\,330"}),`. Genau genommen ist die
Zerlegung `,e.jsx(i.a,{href:"#eq-separierbare-kovarianz",children:"(9.3.4)"}),` nicht eindeutig: Wegen
`,e.jsx(n,{children:`\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}
= (c\\,\\cblue{\\bSigma_T}) \\kron (c^{-1}\\cgreen{\\bSigma_S})`}),`
für jedes `,e.jsx(n,{children:"c > 0"}),` lässt sich ein Skalenfaktor zwischen den Kovarianzfaktoren
verschieben. Identifizierbar ist deshalb ein Parameter weniger, im Beispiel also
`,e.jsx(n,{children:"5"})," statt ",e.jsx(n,{children:"6"}),"."]}),e.jsx(i.p,{children:`Bezahlt wird die Sparsamkeit mit einer echten Einschränkung. Separierbarkeit
verbietet, dass sich das räumliche Muster über die Zeit ändert. Ein Wetterfeld,
dessen Zusammenhänge morgens anders aussehen als abends, lässt sich so nicht
beschreiben.`})]}),`
`,e.jsxs(K,{title:"Eigenwerte eines Kroneckerprodukts",children:[e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"\\bSigma"}),` überhaupt eine Kovarianzmatrix sein kann, sichert eine weitere
Rechenregel: Die Eigenwerte von `,e.jsx(n,{children:"\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}"}),`
sind die Produkte `,e.jsx(n,{children:"\\lambda_i\\mu_j"}),` der Eigenwerte beider Faktoren, denn mit
Eigenvektoren `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"})," ist"]}),e.jsx(t,{children:`\\bigl(\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}\\bigr)(\\ba \\kron \\bb)
= (\\cblue{\\bSigma_T}\\ba) \\kron (\\cgreen{\\bSigma_S}\\bb)
= \\lambda_i\\mu_j\\,(\\ba \\kron \\bb) ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\ba \\kron \\bb"}),` das Kroneckerprodukt der beiden Spaltenvektoren ist. Die
mittlere Gleichung ist die Regel
`,e.jsx(n,{children:"(\\bA \\kron \\bB)(\\bC \\kron \\bD) = (\\bA\\bC) \\kron (\\bB\\bD)"}),`, die sich
ebenfalls an `,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` ablesen lässt. Beide Faktoren sind als Kovarianzmatrizen
`,e.jsx(h,{id:"symmetric-matrix",children:"symmetrisch"}),`, haben nach dem
`,e.jsx(h,{id:"spectral-theorem",children:"Spektralsatz"}),` also je eine Orthonormalbasis aus
Eigenvektoren. Laufen `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"}),` durch diese beiden Basen, so bilden die
`,e.jsx(n,{children:"mn"})," Vektoren ",e.jsx(n,{children:"\\ba \\kron \\bb"})," eine Basis des ",e.jsx(n,{children:"\\R^{mn}"}),`; damit sind das bereits
alle Eigenwerte. Ist also jeder Faktor
`,e.jsx(h,{id:"positive-definite",children:"positiv definit"}),", so ist es auch ",e.jsx(n,{children:"\\bSigma"}),`. In
`,e.jsx(i.a,{href:"#env-zwei-orte-zwei-zeitpunkte",children:"Beispiel 9.3.18"})," hat ",e.jsx(n,{children:"\\cblue{\\bSigma_T}"}),` die Eigenwerte
`,e.jsx(n,{children:"\\cblue{1{,}8}"})," und ",e.jsx(n,{children:"\\cblue{0{,}2}"}),", ",e.jsx(n,{children:"\\cgreen{\\bSigma_S}"}),` die Eigenwerte
`,e.jsx(n,{children:"\\cgreen{2{,}5}"})," und ",e.jsx(n,{children:"\\cgreen{1{,}5}"}),`; die vier Produkte
`,e.jsx(n,{children:"\\corange{4{,}5}"}),", ",e.jsx(n,{children:"\\corange{2{,}7}"}),", ",e.jsx(n,{children:"\\corange{0{,}5}"})," und ",e.jsx(n,{children:"\\corange{0{,}3}"}),`
sind die Eigenwerte von `,e.jsx(n,{children:"\\bSigma"}),". Ihre Summe ist ",e.jsx(n,{children:"8"}),", die Spur von ",e.jsx(n,{children:"\\bSigma"}),`,
und ihr Produkt ist `,e.jsx(n,{children:"1{,}8225"}),", die Determinante von ",e.jsx(n,{children:"\\bSigma"}),"."]})]}),`
`,e.jsxs(N,{title:"Separierbare Kovarianz zum Schieben",children:[e.jsx(i.p,{children:`Wie groß ist der Unterschied zwischen dem Speichern einer allgemeinen
Kovarianzmatrix und ihrer separierbaren Beschreibung für unser Messgitter?`}),e.jsx(pn,{}),e.jsx(i.p,{children:`Die separierbare Kovarianz gewinnt ihre Sparsamkeit dadurch, dass Zeit- und
Ortsstruktur in zwei Faktoren getrennt modelliert werden.`})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(H,{children:[e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Im Rang-1-Widget wird jeder Bildvektor ein Vielfaches von ",e.jsx(n,{children:"\\bv"}),"."]}),e.jsxs(i.p,{children:[`Der orange Pfeil liegt stets auf derselben Geraden. Das ist die Bildaussage aus
`,e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),"."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Das äußere Produkt ",e.jsx(n,{children:"\\bv \\otimes \\bw"}),` ist nur für Vektoren gleicher Länge
definiert.`]}),e.jsxs(i.p,{children:[`Das gilt für das innere Produkt. Das äußere Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw = \\bv\\bw^\\top"}),` verlangt keine Übereinstimmung: Für
`,e.jsx(n,{children:"\\bv \\in \\R^m"})," und ",e.jsx(n,{children:"\\bw \\in \\R^n"})," entsteht eine ",e.jsx(n,{children:"m \\times n"}),`-Matrix
(`,e.jsx(i.a,{href:"#env-aeusseres-produkt",children:"Definition 9.3.1"}),", ",e.jsx(i.a,{href:"#env-inneres-und-aeusseres-produkt",children:"Bemerkung 9.3.2"}),"). In ",e.jsx(i.a,{href:"#env-aeusseres-produkt-zweier-vektoren",children:"Beispiel 9.3.3"})," sind die Längen ",e.jsx(n,{children:"2"}),` und
`,e.jsx(n,{children:"3"}),"."]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bv, \\bw \\neq \\bnull"})," bildet ",e.jsx(n,{children:"\\bx \\mapsto (\\bv \\otimes \\bw)\\bx"}),` den ganzen
`,e.jsx(n,{children:"\\R^n"})," auf die Gerade ",e.jsx(n,{children:"\\spann\\{\\bv\\}"}),` ab, und der Kern ist die Hyperebene
senkrecht zu `,e.jsx(n,{children:"\\bw"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),": Es gilt ",e.jsx(n,{children:"(\\bv \\otimes \\bw)\\bx = \\bv\\inner{\\bw, \\bx}"}),`, das
Bild besteht also aus Vielfachen von `,e.jsx(n,{children:"\\bv"}),`, und der Kern besteht aus allen
`,e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\bw^\\top\\bx = 0"}),". Rang ",e.jsx(n,{children:"1"})," plus Kerndimension ",e.jsx(n,{children:"n-1"})," ergibt ",e.jsx(n,{children:"n"}),`, wie
der Rangsatz es verlangt.`]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Die beiden Scheiben ",e.jsx(n,{children:"T_{\\cdot,\\cdot,1}"})," und ",e.jsx(n,{children:"T_{\\cdot,\\cdot,2}"}),` des Tensors
`,e.jsx(n,{children:"T = \\bu \\otimes \\bv \\otimes \\bw \\in \\R^{2 \\times 2 \\times 2}"}),` sind linear
unabhängig voneinander.`]}),e.jsxs(i.p,{children:[`Beide sind Vielfache derselben Rang-1-Matrix,
`,e.jsx(n,{children:"T_{\\cdot,\\cdot,k} = w_k\\,(\\bu \\otimes \\bv)"}),`, also linear abhängig. In
`,e.jsx(i.a,{href:"#env-tensorprodukt-dreier-vektoren",children:"Beispiel 9.3.10"})," ist die zweite Scheibe das ",e.jsx(n,{children:"11/7"}),`-fache der ersten. Tensoren
dieser Bauart heißen gerade deshalb Rang-1-Tensoren.`]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Das Kroneckerprodukt zweier Matrizen ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\bB \\in \\R^{p \\times q}"})," ist ein Tensor der Stufe ",e.jsx(n,{children:"4"}),"."]}),e.jsxs(i.p,{children:["Der Stufe-4-Tensor ist das ",e.jsx(i.em,{children:"Tensorprodukt"})," nach ",e.jsx(i.a,{href:"#env-tensorprodukt",children:"Definition 9.3.7"}),`. Das
Kroneckerprodukt ordnet dieselben `,e.jsx(n,{children:"mnpq"})," Zahlen nach der Indexformel ",e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),`
in einer Matrix aus `,e.jsx(n,{children:"\\R^{mp \\times nq}"}),` an, ist also die abgeflachte Fassung
davon (`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),")."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"\\bA \\kron \\bB = \\bB \\kron \\bA"}),`, denn beide Produkte enthalten
dieselben Zahlen.`]}),e.jsxs(i.p,{children:["Dieselben Zahlen stehen an verschiedenen Stellen. In ",e.jsx(i.a,{href:"#env-kroneckerprodukt-zweier-kleiner-matrizen",children:"Beispiel 9.3.13"}),` ist der
Eintrag `,e.jsx(n,{children:"(2,1)"})," von ",e.jsx(n,{children:"\\bA \\kron \\bB"})," gleich ",e.jsx(n,{children:"0"}),", der von ",e.jsx(n,{children:"\\bB \\kron \\bA"}),`
dagegen `,e.jsx(n,{children:"6"})," (",e.jsx(i.a,{href:"#env-transponieren-und-reihenfolge",children:"Bemerkung 9.3.14"}),`). Die Formate stimmen zwar überein, die Matrizen
nicht.`]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"(\\bA \\kron \\bB)^\\top = \\bA^\\top \\kron \\bB^\\top"}),"."]}),e.jsxs(i.p,{children:[`Transponieren zieht in beide Faktoren hinein, ohne ihre Reihenfolge zu
vertauschen; die Indexformel `,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` zeigt es unmittelbar
(`,e.jsx(i.a,{href:"#env-transponieren-und-reihenfolge",children:"Bemerkung 9.3.14"}),`). Vorsicht bei der Analogie zum Matrixprodukt: Dort dreht
sich die Reihenfolge um, hier nicht.`]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bI_n \\kron \\bS"})," mit ",e.jsx(n,{children:"\\bS \\in \\R^{p \\times p}"}),` ist
blockdiagonal mit `,e.jsx(n,{children:"n"})," Kopien von ",e.jsx(n,{children:"\\bS"}),"."]}),e.jsxs(i.p,{children:["Der Block an der Stelle ",e.jsx(n,{children:"(i,j)"})," ist ",e.jsx(n,{children:"\\delta_{ij}\\bS"}),`, außerhalb der Diagonalen
steht also die Nullmatrix (`,e.jsx(i.a,{href:"#env-i-n-k-s-ist-blockdiagonal",children:"Beispiel 9.3.16"}),`). In der umgekehrten Reihenfolge
entsteht dagegen `,e.jsx(n,{children:"\\bS \\kron \\bI_n"}),`, dessen Einträge über die ganze Matrix
verteilt sind (`,e.jsx(i.a,{href:"#env-s-k-i-n-verteilt-die-eintraege",children:"Beispiel 9.3.15"}),")."]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m = 2"})," Orte und ",e.jsx(n,{children:"n = 2"}),` Zeitpunkte hat eine separierbare Kovarianzmatrix
`,e.jsx(n,{children:"6"})," Parameter statt der ",e.jsx(n,{children:"10"})," einer beliebigen symmetrischen ",e.jsx(n,{children:"4 \\times 4"}),"-Matrix."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"\\tfrac{mn(mn+1)}{2} = \\tfrac{4 \\cdot 5}{2} = 10"}),` gegen
`,e.jsx(n,{children:"\\tfrac{m(m+1)}{2} + \\tfrac{n(n+1)}{2} = 3 + 3 = 6"})," (",e.jsx(i.a,{href:"#env-was-die-annahme-spart-und-was-sie-kostet",children:"Bemerkung 9.3.19"}),`).
Identifizierbar sind davon `,e.jsx(n,{children:"5"}),`, weil sich ein Skalenfaktor zwischen den beiden
Faktoren verschieben lässt.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: vgl. MML §4.5 für die Summendarstellung einer Matrix aus
Rang-1-Bausteinen, auf der `,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),` aufsetzt; die Rechenregeln des
Kroneckerprodukts sammelt Kapitel 2 von Magnus und Neudecker, `,e.jsx(i.em,{children:`Matrix
Differential Calculus with Applications in Statistics and Econometrics`}),"."]})})]})}function _n(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx($e,{...r})}):$e(r)}const{blau:be,gruen:me,orange:Ce,violett:C,grau:zn}=X,T=(r,i,s)=>r.a+r.b*i+r.c*s+r.d*i*s,w={x:34,y:18,size:210};function Sn(r,i,s){const l=r[2]-s,d=i[2]-s;if(l<0&&d<0||l>0&&d>0||Math.abs(r[2]-i[2])<1e-10)return null;const x=l/(l-d);return[r[0]+x*(i[0]-r[0]),r[1]+x*(i[1]-r[1])]}function An(r,i,s=24){const l=[];for(let d=0;d<s;d+=1)for(let x=0;x<s;x+=1){const o=d/s,u=(d+1)/s,a=x/s,b=(x+1)/s,m=[[o,a,T(r,o,a)],[u,a,T(r,u,a)],[u,b,T(r,u,b)],[o,b,T(r,o,b)]],g=[[0,1],[1,2],[2,3],[3,0]].map(([k,j])=>Sn(m[k],m[j],i)).filter(k=>k!==null);g.length===2&&l.push({a:g[0],b:g[1]}),g.length===4&&l.push({a:g[0],b:g[1]},{a:g[2],b:g[3]})}return l}function Bn(){const[r,i]=_.useState({a:2,b:3,c:-1,d:5}),[s,l]=_.useState([.65,.45]),[d,x]=_.useState({azimuth:38,elevation:26}),o=[T(r,0,0),T(r,1,0),T(r,0,1),T(r,1,1)],u=Math.min(...o),a=Math.max(...o),b=a-u<1e-9?[u-1,a+1]:[u,a],m=T(r,s[0],s[1]),g=_.useMemo(()=>[.2,.4,.6,.8].map(v=>u+v*(a-u||1)),[u,a]),k=_.useMemo(()=>g.map(v=>An(r,v)),[r,g]),j=_.useMemo(()=>({f:(v,F)=>T(r,v,F),nx:24,ny:24,color:C,opacity:.84,wire:!0}),[r]),M=fe({feld:{x0:w.x,y0:w.y,w:w.size,h:w.size},welt:{x0:0,x1:1,y0:0,y1:1},greifPosition:()=>s,clamp:([v,F])=>[Math.max(0,Math.min(1,v)),Math.max(0,Math.min(1,F))],onDrag:l}),G=v=>w.x+v*w.size,Y=v=>w.y+(1-v)*w.size;return e.jsxs("div",{children:[e.jsx(Z,{children:"Ziehen wir den orangefarbenen Punkt und vergleichen seine Höhe in beiden Ansichten."}),e.jsxs("div",{className:"mt-3 grid grid-cols-1 items-start gap-4 sm:grid-cols-2",children:[e.jsxs("svg",{viewBox:"0 0 280 260",width:"280",height:"260",className:"max-w-full h-auto",role:"img","aria-label":"Höhenlinien und Heatmap der Tensorproduktfunktion; der orange Punkt markiert dieselbe Stelle wie in der Fläche.",...M.svgProps,children:[Array.from({length:28},(v,F)=>Array.from({length:28},($,z)=>{const nn=(T(r,(F+.5)/28,(z+.5)/28)-u)/(a-u||1);return e.jsx("rect",{x:w.x+F*7.5,y:w.y+(27-z)*7.5,width:"7.7",height:"7.7",fill:C,fillOpacity:.12+.76*nn},`${F}-${z}`)})),k.map((v,F)=>e.jsxs("g",{stroke:"var(--w-text)",strokeWidth:"1.1",fill:"none",children:[v.map(($,z)=>e.jsx("line",{x1:G($.a[0]),y1:Y($.a[1]),x2:G($.b[0]),y2:Y($.b[1])},z)),e.jsx("text",{x:"252",y:32+F*15,fontSize:"10",fill:"var(--w-text)",children:p(g[F],1)})]},g[F])),e.jsx("rect",{x:w.x,y:w.y,width:w.size,height:w.size,fill:"none",stroke:zn}),e.jsx("line",{x1:w.x,y1:w.y+w.size,x2:w.x+w.size,y2:w.y+w.size,stroke:be}),e.jsx("line",{x1:w.x,y1:w.y,x2:w.x,y2:w.y+w.size,stroke:me}),e.jsx("text",{x:"139",y:"250",fill:be,fontSize:"12",textAnchor:"middle",children:"x"}),e.jsx("text",{x:"18",y:"123",fill:me,fontSize:"12",textAnchor:"middle",children:"y"}),e.jsx(ve,{x:G(s[0]),y:Y(s[1]),farbe:Ce,...M.handleProps("punkt")})]}),e.jsx(He,{size:280,xDomain:[0,1],yDomain:[0,1],zDomain:b,surface:j,contours:g,contourColor:C,points:[{p:[s[0],s[1],m],color:Ce,label:`f = ${p(m,2)}`,onTop:!0}],dropLines:!0,azimuth:d.azimuth,elevation:d.elevation,onViewChange:x,labels:{x:"x",y:"y",z:"f"},ariaLabel:"Dieselbe Tensorproduktfunktion als Fläche; der orange Punkt ist mit der Höhenlinientafel verknüpft."})]}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(B,{label:"c₁₁",value:r.a,onChange:v=>i({...r,a:v}),min:-5,max:5,step:.5,accent:C}),e.jsx(B,{label:"c₂₁",value:r.b,onChange:v=>i({...r,b:v}),min:-5,max:5,step:.5,accent:C}),e.jsx(B,{label:"c₁₂",value:r.c,onChange:v=>i({...r,c:v}),min:-5,max:5,step:.5,accent:C}),e.jsx(B,{label:"c₂₂",value:r.d,onChange:v=>i({...r,d:v}),min:-5,max:5,step:.5,accent:C}),e.jsx(B,{label:"Punkt x",value:s[0],onChange:v=>l([v,s[1]]),min:0,max:1,step:.05,accent:be}),e.jsx(B,{label:"Punkt y",value:s[1],onChange:v=>l([s[0],v]),min:0,max:1,step:.05,accent:me})]}),e.jsx(Je,{value:d,onChange:x}),e.jsx(I,{kind:Math.abs(r.d)<1e-9?"ok":"neutral",children:Math.abs(r.d)<1e-9?`Bei c₂₂ = 0 liegt der Punkt bei f(${p(s[0],2)}, ${p(s[1],2)}) = ${p(m,2)} auf einer Ebene: Die x-Steigung ist für jedes y gleich.`:`Bei c₂₂ = ${p(r.d,1)} liegt derselbe Punkt in beiden Bildern bei f(${p(s[0],2)}, ${p(s[1],2)}) = ${p(m,2)}. Die gekrümmten Höhenlinien zeigen die Kopplung von x und y.`})]})}function Le(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"})," war ",e.jsx(n,{children:"\\otimes"}),` eine Rechenvorschrift: Aus zwei
Vektoren wurde eine Matrix, aus zwei Tensoren ein Tensor höherer Stufe. Jetzt
drehen wir die Blickrichtung um und fragen nach dem Raum, in dem diese Produkte
leben. Aus der Operation wird damit eine Konstruktion, die aus zwei
Vektorräumen einen dritten macht.`]}),`
`,e.jsx(i.h3,{children:"Der Raum V ⊗ W"}),`
`,e.jsxs(i.p,{children:["Bleiben wir kurz bei ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"}),` mit dem äußeren Produkt
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\cgreen{\\bw}^\\top"}),`. Die Menge
aller dieser Produkte ist als Vektorraum unbrauchbar, denn sie ist nicht unter
Addition abgeschlossen: Die Summe zweier Matrizen vom `,e.jsx(h,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"1"}),` hat im
Allgemeinen den Rang `,e.jsx(n,{children:"2"}),`. Der kleinste Vektorraum, der alle Produkte enthält,
ist ihre `,e.jsx(h,{id:"span",children:"lineare Hülle"}),", und genau so setzen wir den Raum an."]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.4.1 (Tensorprodukt von Vektorräumen)",id:"env-tensorprodukt-von-vektorraeumen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"})," ",e.jsx(h,{id:"vector-space",children:"Vektorräume"})," und"]}),e.jsx(t,{children:`\\otimes\\colon V \\times W \\to V \\otimes W,
\\qquad (\\cblue{\\bv},\\cgreen{\\bw}) \\mapsto
\\cblue{\\bv}\\otimes\\cgreen{\\bw},`}),e.jsxs(i.p,{children:["eine bilineare Abbildung. Das ",e.jsx(i.em,{children:"Tensorprodukt"})," (tensor product) von ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"}),`
ist der von ihren Bildern erzeugte Vektorraum`]}),e.jsx(q,{tag:"9.4.1",id:"eq-tensorprodukt-von-vektorraeumen",children:`V \\otimes W = \\spann\\bigl\\{\\cblue{\\bv} \\otimes \\cgreen{\\bw} :
\\cblue{\\bv} \\in V, \\ \\cgreen{\\bw} \\in W\\bigr\\} .`}),e.jsxs(i.p,{children:["Dabei hat ",e.jsx(n,{children:"\\otimes"})," die ",e.jsx(i.em,{children:"universelle Eigenschaft"}),`: Jede bilineare Abbildung
`,e.jsx(n,{children:"f\\colon V \\times W \\to Z"})," in einen Vektorraum ",e.jsx(n,{children:"Z"}),` faktorisiert eindeutig über
`,e.jsx(n,{children:"\\otimes"}),`, es gibt also genau eine lineare Abbildung
`,e.jsx(n,{children:"\\wt{f}\\colon V \\otimes W \\to Z"}),` mit
`,e.jsx(n,{children:"f(\\cblue{\\bv},\\cgreen{\\bw}) = \\wt{f}(\\cblue{\\bv}\\otimes\\cgreen{\\bw})"}),` für alle
`,e.jsx(n,{children:"\\cblue{\\bv}\\in V"})," und ",e.jsx(n,{children:"\\cgreen{\\bw}\\in W"}),"."]}),e.jsxs(i.p,{children:["Die Produkte ",e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," selbst nennen wir ",e.jsx(i.em,{children:`elementare
Tensoren`}),"."]})]}),`
`,e.jsxs(K,{title:"Die universelle Eigenschaft",children:[e.jsxs(i.p,{children:[`Die universelle Eigenschaft legt den Raum bis auf Isomorphie fest und macht ihn
unabhängig von einer zufällig gewählten konkreten Realisierung. Das
Tensorprodukt `,e.jsx(i.em,{children:"linearisiert"})," damit bilineare Abbildungen: Statt ",e.jsx(n,{children:"f"}),` auf Paaren
auszuwerten, wenden wir die lineare Abbildung `,e.jsx(n,{children:"\\wt{f}"}),` auf elementare Tensoren
an. Der Spann allein würde dazu nicht genügen. Nähmen wir etwa die Nullabbildung
als bilineare Abbildung, so wäre ihr Bildspann zwar der Nullraum, erfüllte aber
die universelle Eigenschaft nicht und könnte die übrigen bilinearen Abbildungen
nicht darstellen.`]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"}),` mit dem äußeren Produkt, also
`,e.jsx(n,{children:"\\R^m \\otimes \\R^n = \\R^{m \\times n}"})," nach ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"}),`,
ist die Eigenschaft schnell nachgerechnet. Zu bilinearem `,e.jsx(n,{children:"f\\colon\\R^m\\times\\R^n\\to Z"}),`
setzen wir `,e.jsx(n,{children:"\\wt{f}(\\bA):=\\sum_{i=1}^m\\sum_{j=1}^n a_{ij}\\,f(\\be_i,\\be_j)"}),`.
Diese Abbildung ist linear, und wegen
`,e.jsx(n,{children:"\\bv\\bw^\\top=\\sum_{ij}v_iw_j\\bE_{ij}"})," mit der Matrix ",e.jsx(n,{children:"\\bE_{ij}"}),`, die an der
Stelle `,e.jsx(n,{children:"(i,j)"}),` eine Eins und sonst lauter Nullen trägt, liefert die Bilinearität
`,e.jsx(n,{children:"\\wt{f}(\\bv\\bw^\\top)=f(\\bv,\\bw)"}),"; eindeutig ist sie, weil die ",e.jsx(n,{children:"\\bE_{ij}"}),` den
Raum aufspannen.`]}),e.jsxs(i.p,{children:[`Tensorprodukte existieren und sind durch die universelle Eigenschaft bis auf
einen eindeutigen Isomorphismus festgelegt, der die elementaren Tensoren
respektiert. Deshalb dürfen wir mit einer bequemen konkreten Realisierung
arbeiten, in den folgenden Beispielen mit Matrizen beziehungsweise Funktionen.
Gebraucht wird die Eigenschaft im Skript nur noch an einer Stelle, nämlich für
die lineare Unabhängigkeit der Tensorproduktbasis in `,e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"}),` sind die elementaren Tensoren genau die Matrizen
vom Rang höchstens `,e.jsx(n,{children:"1"}),". ",e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),` liefert davon eine Hälfte, nämlich den Rang
`,e.jsx(n,{children:"1"})," für ",e.jsx(n,{children:"\\cblue{\\bv}, \\cgreen{\\bw} \\neq \\bnull"}),`; die Umkehrung steht im
Anschluss an seinen Beweis, und der Rang `,e.jsx(n,{children:"0"}),` gehört zum Produkt mit dem
Nullvektor. Produkte `,e.jsx(n,{children:"\\bu \\otimes \\bv \\otimes \\bw"}),` dreier Vektoren heißen in
`,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"})," entsprechend Rang-1-Tensoren."]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.4.2 (Rechenregeln aus der Bilinearität)",id:"env-rechenregeln-aus-der-bilinearitaet",children:[e.jsxs(i.p,{children:["Bilinearität im Sinn von ",e.jsx(i.a,{href:"#env-multilineare-abbildung",children:"Definition 9.1.1"})," (",e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"}),`) heißt hier
ausgeschrieben: Skalare Faktoren dürfen zwischen den Argumenten wandern, und in
jedem Argument darf man Summen auseinanderziehen,`]}),e.jsx(t,{children:`(c\\,\\cblue{\\bv}) \\otimes \\cgreen{\\bw}
= c\\,(\\cblue{\\bv} \\otimes \\cgreen{\\bw})
= \\cblue{\\bv} \\otimes (c\\,\\cgreen{\\bw}) ,`}),e.jsx(t,{children:`(\\cblue{\\bv_1} + \\cblue{\\bv_2}) \\otimes \\cgreen{\\bw}
= \\cblue{\\bv_1} \\otimes \\cgreen{\\bw} + \\cblue{\\bv_2} \\otimes \\cgreen{\\bw} ,
\\qquad
\\cblue{\\bv} \\otimes (\\cgreen{\\bw_1} + \\cgreen{\\bw_2})
= \\cblue{\\bv} \\otimes \\cgreen{\\bw_1} + \\cblue{\\bv} \\otimes \\cgreen{\\bw_2} .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"c = 0"}),` folgt daraus sofort
`,e.jsx(n,{children:"\\bnull \\otimes \\cgreen{\\bw} = \\cblue{\\bv} \\otimes \\bnull = \\bnull"}),`. Was die
Regeln dagegen nicht liefern, ist eine Umformung von
`,e.jsx(n,{children:"\\cblue{\\bv_1} \\otimes \\cgreen{\\bw_1} + \\cblue{\\bv_2} \\otimes \\cgreen{\\bw_2}"}),` in
ein einzelnes Produkt. Deshalb steht in `,e.jsx(i.a,{href:"#eq-tensorprodukt-von-vektorraeumen",children:"(9.4.1)"}),` der Spann und nicht die Menge
der Produkte.`]})]}),`
`,e.jsx(i.h3,{children:"Zwei Beispiele mit Zahlentupeln"}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.4.3 (Das Tensorprodukt von ℝᵐ und ℝⁿ)",id:"env-das-tensorprodukt-von-und",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\otimes"})," das äußere Produkt aus ",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`, also
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\cgreen{\\bw}^\\top \\in \\R^{m \\times n}"}),`.
Wir zeigen beide Inklusionen.`]}),e.jsxs(i.p,{children:["„",e.jsx(n,{children:"\\subseteq"}),'": Jedes ',e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),` ist eine
`,e.jsx(n,{children:"m \\times n"}),"-Matrix, und ",e.jsx(n,{children:"\\R^{m \\times n}"}),` ist ein Vektorraum
(`,e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),`). Mit den Produkten liegen deshalb auch alle ihre
`,e.jsx(h,{id:"linear-combination",children:"Linearkombinationen"})," in ",e.jsx(n,{children:"\\R^{m \\times n}"}),"."]}),e.jsxs(i.p,{children:["„",e.jsx(n,{children:"\\supseteq"}),'": Für die Standardbasisvektoren ',e.jsx(n,{children:"\\be_i \\in \\R^m"}),` und
`,e.jsx(n,{children:"\\be_j \\in \\R^n"})," ist"]}),e.jsx(t,{children:"\\cblue{\\be_i} \\otimes \\cgreen{\\be_j} = \\cblue{\\be_i}\\cgreen{\\be_j}^\\top = \\bE_{ij} ,"}),e.jsxs(i.p,{children:["die Matrix mit einer ",e.jsx(n,{children:"\\corange{1}"})," an der Stelle ",e.jsx(n,{children:"(i,j)"}),` und sonst lauter Nullen.
Jede Matrix `,e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` schreibt sich als
`,e.jsx(n,{children:"\\corange{\\bA} = \\sum_{i=1}^m \\sum_{j=1}^n \\corange{a_{ij}} \\bE_{ij}"}),`, liegt also
im Spann der Produkte.`]}),e.jsxs(i.p,{children:["Damit ist ",e.jsx(n,{children:"\\R^m \\otimes \\R^n = \\R^{m \\times n}"}),` eine konkrete Realisierung des
Tensorprodukts, und nach `,e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),` hat dieser Raum die
`,e.jsx(h,{id:"dimension",children:"Dimension"})," ",e.jsx(n,{children:"mn"}),"."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.4.4 (Drei Faktoren)",id:"env-drei-faktoren",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V_1 = \\R^m"}),", ",e.jsx(n,{children:"V_2 = \\R^n"}),", ",e.jsx(n,{children:"V_3 = \\R^q"})," und ",e.jsx(n,{children:"\\otimes"}),` das Tensorprodukt
von Tensoren aus `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),". Nach ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"}),` ist
`,e.jsx(n,{children:"V_1 \\otimes V_2 = \\R^{m \\times n}"}),`, und ein elementarer Tensor
`,e.jsx(n,{children:"\\corange{\\bA} \\otimes \\cgreen{\\bw}"})," mit ",e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^q"})," hat die Einträge ",e.jsx(n,{children:"\\corange{a_{ij}}\\cgreen{w_k}"}),`. Das ist
ein Tensor der Stufe `,e.jsx(n,{children:"3"}),", und dasselbe Argument wie eben zeigt"]}),e.jsx(t,{children:`V_1 \\otimes V_2 \\otimes V_3
= \\bigl(\\R^m \\otimes \\R^n\\bigr) \\otimes \\R^q
= \\R^{m \\times n} \\otimes \\R^q
= \\R^{m \\times n \\times q} .`}),e.jsxs(i.p,{children:[`Auf die Klammerung kommt es dabei nicht an: Der elementare Tensor
`,e.jsx(n,{children:"\\bu \\otimes \\bv \\otimes \\bw"})," hat die Einträge ",e.jsx(n,{children:"u_i v_j w_k"}),`, gleichgültig, in
welcher Reihenfolge wir die drei Produkte bilden. Die Dimension ist `,e.jsx(n,{children:"mnq"}),`, wieder
nach `,e.jsx(i.a,{href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Ein einzelnes Produkt und der ganze Raum"}),`
`,e.jsxs(i.p,{children:["Die beiden Ausdrücke ",e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," und ",e.jsx(n,{children:"V \\otimes W"}),` sehen
ähnlich aus und meinen Verschiedenes. Links steht ein einzelnes Element, rechts
der ganze Raum, den alle diese Elemente aufspannen. Der Unterschied ist keine
Feinheit, wie das kleinste denkbare Beispiel zeigt.`]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.4.5 (Die Einheitsmatrix ist kein elementarer Tensor)",id:"env-die-einheitsmatrix-ist-kein-elementarer",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"V = W = \\R^2"})," und"]}),e.jsx(t,{children:"\\corange{\\bA} = \\bI_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} ."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Kein einzelnes Produkt."})," Gäbe es ",e.jsx(n,{children:"\\cblue{\\bv}, \\cgreen{\\bw} \\in \\R^2"}),` mit
`,e.jsx(n,{children:"\\corange{\\bA} = \\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),`, so wären alle Spalten von
`,e.jsx(n,{children:"\\cblue{\\bv}\\cgreen{\\bw}^\\top"})," Vielfache von ",e.jsx(n,{children:"\\cblue{\\bv}"}),`, also
`,e.jsx(n,{children:"\\rang(\\cblue{\\bv} \\otimes \\cgreen{\\bw}) \\leq 1"})," (",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`). Die
Einheitsmatrix hat aber den Rang `,e.jsx(n,{children:"\\cred{2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Aber ein Element des Raums."})," In ",e.jsx(n,{children:"V \\otimes W = \\R^{2 \\times 2}"}),` liegt
`,e.jsx(n,{children:"\\bI_2"})," selbstverständlich, und zwar als Summe von zwei elementaren Tensoren:"]}),e.jsx(t,{children:`\\begin{aligned}
\\cblue{\\be_1} \\otimes \\cgreen{\\be_1} + \\cblue{\\be_2} \\otimes \\cgreen{\\be_2}
&= \\cblue{\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}}\\cgreen{\\begin{pmatrix} 1 & 0 \\end{pmatrix}}
 + \\cblue{\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}}\\cgreen{\\begin{pmatrix} 0 & 1 \\end{pmatrix}} \\\\
&= \\corange{\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}}
 + \\corange{\\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}}
 = \\corange{\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}} .
\\end{aligned}`}),e.jsx(i.p,{children:"Zwei Summanden genügen also. Dass das kein Zufall ist, sagt der nächste Satz."})]}),`
`,e.jsxs(c,{kind:"Satz",label:"9.4.6 (Jede Matrix ist eine kurze Summe elementarer Tensoren)",id:"env-jede-matrix-ist-eine-kurze-summe",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),`. Dann gibt
es `,e.jsx(n,{children:"\\cblue{\\bu_i} \\in \\R^m"}),", ",e.jsx(n,{children:"\\cgreen{\\bv_i} \\in \\R^n"})," und Zahlen ",e.jsx(n,{children:"\\corange{\\sigma_i} > 0"}),`
mit`]}),e.jsx(t,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i} ."}),e.jsxs(i.p,{children:["Insbesondere kommt jede Matrix mit höchstens ",e.jsx(n,{children:"\\min(m,n)"}),` elementaren Tensoren
aus.`]})]}),`
`,e.jsxs(K,{title:"Beweis über die Spalten einer Matrix",children:[e.jsxs(J,{children:[e.jsxs(E,{why:e.jsxs(e.Fragment,{children:["jeder Summand ist ein äußeres Produkt ",e.jsx(n,{children:"\\cblue{\\bu_i}\\cgreen{\\bv_i}^\\top = \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"}),", also ein elementarer Tensor"]}),children:[e.jsxs(i.p,{children:["Die ",e.jsx(h,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` liefert
`,e.jsx(n,{children:"\\bA = \\bU\\bSigma\\bV^\\top"})," (",e.jsx(i.a,{href:"?k=06-svd#env-singulaerwertzerlegung",children:"Satz 6.2.13"}),` in
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.2",children:"Abschnitt 6.2"}),`), und ausmultipliziert wird daraus die
Summenform`]}),e.jsx(t,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i}\\cgreen{\\bv_i}^\\top"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"r = \\rang(\\bA)"})," und ",e.jsx(n,{children:"\\corange{\\sigma_1} \\geq \\cdots \\geq \\corange{\\sigma_r} > 0"}),`
(`,e.jsx(i.a,{href:"?k=06-svd#env-summenform-der-svd",children:"Satz 6.4.2"})," in ",e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),`, im Kapitel schon in
`,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"})," aufgegriffen)."]})]}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["ein Unterraum des ",e.jsx(n,{children:"\\R^m"})," hat höchstens die Dimension ",e.jsx(n,{children:"m"}),"; ein Erzeugendensystem aus ",e.jsx(n,{children:"n"})," Vektoren spannt höchstens einen ",e.jsx(n,{children:"n"}),"-dimensionalen Raum auf"]}),children:e.jsxs(i.p,{children:["Für die Schranke bleibt ",e.jsx(n,{children:"r \\leq \\min(m,n)"}),` zu begründen. Der Rang ist die
Dimension des `,e.jsx(h,{id:"image",children:"Spaltenraums"})," ",e.jsx(n,{children:"\\col(\\bA) \\subseteq \\R^m"}),`, also ist
`,e.jsx(n,{children:"r \\leq m"}),". Zugleich wird ",e.jsx(n,{children:"\\col(\\bA)"})," von den ",e.jsx(n,{children:"n"}),` Spalten aufgespannt,
also ist `,e.jsx(n,{children:"r \\leq n"}),"."]})})]}),e.jsxs(i.p,{children:["Weniger als ",e.jsx(n,{children:"r"}),` Summanden reichen nicht. Wäre
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^{k} \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"})," mit ",e.jsx(n,{children:"k < r"}),`, so
lägen alle Spalten von `,e.jsx(n,{children:"\\bA"}),` im Spann von
`,e.jsx(n,{children:"\\cblue{\\bu_1}, \\dots, \\cblue{\\bu_k}"}),", und der Rang wäre höchstens ",e.jsx(n,{children:"k"}),`. Die
kleinste Anzahl elementarer Tensoren, die eine Matrix darstellen, ist also genau
ihr Rang, und die SVD rechnet sie aus.`]})]}),`
`,e.jsx(i.h3,{children:"Die Tensorproduktbasis"}),`
`,e.jsxs(i.p,{children:["Ein Vektorraum wird durch eine ",e.jsx(h,{id:"basis",children:"Basis"})," handhabbar. Für ",e.jsx(n,{children:"V \\otimes W"}),`
müssen wir sie nicht suchen: Sie entsteht aus Basen der beiden Faktoren, indem
wir alle Paare miteinander multiplizieren.`]}),`
`,e.jsxs(c,{kind:"Satz",label:"9.4.7 (Tensorproduktbasis)",id:"env-tensorproduktbasis",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\Bcal_V = \\{\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_m}\\}"})," eine Basis von ",e.jsx(n,{children:"V"}),` und
`,e.jsx(n,{children:"\\Bcal_W = \\{\\cgreen{\\bw_1}, \\dots, \\cgreen{\\bw_n}\\}"})," eine Basis von ",e.jsx(n,{children:"W"}),". Dann ist"]}),e.jsx(t,{children:`\\Bcal_{V \\otimes W}
= \\bigl\\{\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j} :
i = 1, \\dots, m, \\ j = 1, \\dots, n\\bigr\\}`}),e.jsxs(i.p,{children:["eine Basis von ",e.jsx(n,{children:"V \\otimes W"})," und heißt ",e.jsx(i.em,{children:"Tensorproduktbasis"}),` (tensor product
basis). Insbesondere gilt`]}),e.jsx(q,{tag:"9.4.2",id:"eq-tensorproduktbasis",children:`V \\otimes W = \\spann\\bigl(\\Bcal_{V \\otimes W}\\bigr)
= \\biggl\\{\\sum_{i=1}^{m} \\sum_{j=1}^{n} \\corange{c_{ij}}\\,
\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j} :
\\corange{c_{11}}, \\dots, \\corange{c_{mn}} \\in \\R \\biggr\\}`}),e.jsx(i.p,{children:"und"}),e.jsx(t,{children:"\\dim(V \\otimes W) = \\dim(V)\\,\\dim(W) = mn ."})]}),`
`,e.jsxs(i.p,{children:[`Dass die Produkte den Raum erzeugen, ist schnell gesehen. Wir entwickeln
`,e.jsx(n,{children:"\\cblue{\\bv} \\in V"})," und ",e.jsx(n,{children:"\\cgreen{\\bw} \\in W"}),` in den beiden Basen,
`,e.jsx(n,{children:"\\cblue{\\bv} = \\sum_i a_i \\cblue{\\bv_i}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} = \\sum_j b_j \\cgreen{\\bw_j}"}),`, und ziehen die Summen mit
`,e.jsx(i.a,{href:"#env-rechenregeln-aus-der-bilinearitaet",children:"Bemerkung 9.4.2"}),` nach außen, zuerst im ersten, dann
im zweiten Argument:`]}),`
`,e.jsx(q,{tag:"9.4.3",id:"eq-elementarer-tensor-in-produktbasis",children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw}
= \\Bigl(\\sum_{i=1}^{m} a_i \\cblue{\\bv_i}\\Bigr) \\otimes \\cgreen{\\bw}
= \\sum_{i=1}^{m} \\sum_{j=1}^{n} a_i b_j\\,
\\bigl(\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j}\\bigr) .`}),`
`,e.jsxs(i.p,{children:["Jeder elementare Tensor liegt damit im Spann von ",e.jsx(n,{children:"\\Bcal_{V \\otimes W}"}),`, und da
die elementaren Tensoren nach `,e.jsx(i.a,{href:"#env-tensorprodukt-von-vektorraeumen",children:"Definition 9.4.1"}),` den
ganzen Raum erzeugen, gilt die Darstellung `,e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),`. Die lineare
Unabhängigkeit holt die folgende Vertiefung nach.`]}),`
`,e.jsx(K,{title:"Warum die Produkte linear unabhängig sind",children:e.jsxs(J,{children:[e.jsxs(E,{why:e.jsx(e.Fragment,{children:"die universelle Eigenschaft macht aus jeder bilinearen Koordinatenabbildung genau eine lineare Abbildung auf dem Tensorproduktraum"}),children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:`\\sum_i\\sum_j \\corange{c_{ij}}\\,
\\cblue{\\bv_i}\\otimes\\cgreen{\\bw_j}=\\bnull`}),". Zu festen Indizes ",e.jsx(n,{children:"(k,l)"})," ist"]}),e.jsx(t,{children:`(\\cblue{\\bv},\\cgreen{\\bw})\\longmapsto
a_k(\\cblue{\\bv})\\,b_l(\\cgreen{\\bw})`}),e.jsxs(i.p,{children:["bilinear, wobei ",e.jsx(n,{children:"a_k"})," und ",e.jsx(n,{children:"b_l"})," die ",e.jsx(n,{children:"k"}),"-te beziehungsweise ",e.jsx(n,{children:"l"}),`-te
Koordinatenfunktion in den beiden Basen sind. Die universelle Eigenschaft liefert
dazu eine lineare Abbildung auf `,e.jsx(n,{children:"V\\otimes W"}),`. Sie schickt
`,e.jsx(n,{children:"\\cblue{\\bv_i}\\otimes\\cgreen{\\bw_j}"})," auf ",e.jsx(n,{children:"1"}),", falls ",e.jsx(n,{children:"(i,j)=(k,l)"}),`, und sonst
auf `,e.jsx(n,{children:"0"}),`. Wenden wir sie auf die verschwindende Summe an, erhalten wir
`,e.jsx(n,{children:"\\corange{c_{kl}}=0"}),". Da ",e.jsx(n,{children:"(k,l)"})," beliebig war, verschwinden alle Koeffizienten."]})]}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["die ",e.jsx(n,{children:"mn"})," Produkte sind paarweise verschieden, denn sie sind nach dem ersten Schritt ",e.jsx(h,{id:"linear-independence",children:"linear unabhängig"})]}),children:e.jsxs(i.p,{children:["Die Basis ",e.jsx(n,{children:"\\Bcal_{V \\otimes W}"})," enthält damit für jedes Paar ",e.jsx(n,{children:"(i,j)"}),` genau ein
Element, also `,e.jsx(n,{children:"mn"})," Stück."]})})]})}),`
`,e.jsx(c,{kind:"Bemerkung",label:"9.4.8 (Eine Feinheit)",id:"env-eine-feinheit",children:e.jsxs(i.p,{children:["Die Koeffizienten in ",e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),` sind beliebig. Bei einem elementaren
Tensor haben sie nach `,e.jsx(i.a,{href:"#eq-elementarer-tensor-in-produktbasis",children:"(9.4.3)"}),` die besondere Form
`,e.jsx(n,{children:"\\corange{c_{ij}} = a_i b_j"}),", bei einem allgemeinen Element von ",e.jsx(n,{children:"V \\otimes W"}),`
gerade nicht. In `,e.jsx(i.a,{href:"#env-die-einheitsmatrix-ist-kein-elementarer",children:"Beispiel 9.4.5"}),` ist die Koeffizientenmatrix bezüglich der
Standardbasen `,e.jsx(n,{children:"\\corange{\\bC} = \\bI_2"}),", und ",e.jsx(n,{children:"\\bI_2"}),` lässt sich nicht als
`,e.jsx(n,{children:"\\ba\\bb^\\top"})," schreiben."]})}),`
`,e.jsx(i.h3,{children:"Tensorproduktbasen für Funktionen"}),`
`,e.jsxs(i.p,{children:["Der Basissatz braucht nirgends, dass die Elemente von ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"}),` Zahlentupel
sind. Nehmen wir Funktionenräume, so wird aus ihm ein Werkzeug für die
Approximation multivariater Funktionen.`]}),`
`,e.jsxs(i.p,{children:["Wir starten univariat. Der Raum der ",e.jsx(h,{id:"polynomial",children:"Polynome"}),` vom Grad
höchstens `,e.jsx(n,{children:"1"})," auf ",e.jsx(n,{children:"[0,1]"})," ist"]}),`
`,e.jsx(t,{children:"\\Pcal_1 = \\{p(x) = a_0 + a_1 x : a_0, a_1 \\in \\R\\}"}),`
`,e.jsxs(i.p,{children:["mit der Basis ",e.jsx(n,{children:"\\Bcal = \\{1, x\\}"}),", also ",e.jsx(n,{children:"\\dim(\\Pcal_1) = 2"}),`. Für zwei
`,e.jsx(h,{id:"function",children:"Funktionen"})," ",e.jsx(n,{children:"f, g\\colon [0,1] \\to \\R"})," setzen wir"]}),`
`,e.jsx(q,{tag:"9.4.4",id:"eq-eq-9-4-3",children:"(\\cblue{f} \\otimes \\cgreen{g})(x, y) := \\cblue{f(x)}\\,\\cgreen{g(y)} ."}),`
`,e.jsxs(i.p,{children:[`Das Produkt zweier univariater Funktionen ist also eine Funktion auf dem Quadrat
`,e.jsx(n,{children:"[0,1]^2"}),", und die Zuordnung ",e.jsx(n,{children:"(\\cblue{f}, \\cgreen{g}) \\mapsto \\cblue{f} \\otimes \\cgreen{g}"}),`
ist bilinear: Ein Skalar vor `,e.jsx(n,{children:"\\cblue{f}"}),` landet vor dem Produkt, ebenso einer vor
`,e.jsx(n,{children:"\\cgreen{g}"}),`, und Summen im ersten oder zweiten Argument ziehen sich punktweise
auseinander. Wir benennen Funktionen dabei nach dem Ausdruck, den sie liefern:
Die konstante Funktion heißt in beiden Faktoren `,e.jsx(n,{children:"1"}),`, die identische im ersten
`,e.jsx(n,{children:"\\cblue{x}"})," und im zweiten ",e.jsx(n,{children:"\\cgreen{y}"}),`. Die zweite Basis ist also dieselbe wie
die erste, nur anders aufgeschrieben.`]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.4.9 (Die Tensorproduktbasis von P₁ ⊗ P₁)",id:"env-die-tensorproduktbasis-von-p-p",children:[e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"})," liefert aus ",e.jsx(n,{children:"\\Bcal_V = \\{1, x\\}"})," und ",e.jsx(n,{children:"\\Bcal_W = \\{1, y\\}"}),` die vier
Produkte, ausgewertet nach `,e.jsx(i.a,{href:"#eq-eq-9-4-3",children:"(9.4.4)"}),":"]}),e.jsx(t,{children:`\\begin{aligned}
\\phi_1(x,y) &= (\\cblue{1} \\otimes \\cgreen{1})(x,y) = 1 \\cdot 1 = 1 , &\\qquad
\\phi_2(x,y) &= (\\cblue{x} \\otimes \\cgreen{1})(x,y) = x \\cdot 1 = x , \\\\
\\phi_3(x,y) &= (\\cblue{1} \\otimes \\cgreen{y})(x,y) = 1 \\cdot y = y , &\\qquad
\\phi_4(x,y) &= (\\cblue{x} \\otimes \\cgreen{y})(x,y) = x \\cdot y = xy .
\\end{aligned}`}),e.jsxs(i.p,{children:["Sie bilden eine Basis von ",e.jsx(n,{children:"\\Pcal_1 \\otimes \\Pcal_1"}),`, dem Raum aller bivariaten
Polynome, die in jeder der beiden Variablen höchstens den Grad `,e.jsx(n,{children:"1"}),` haben. Die
Dimension ist`]}),e.jsx(t,{children:"\\dim(\\Pcal_1 \\otimes \\Pcal_1) = \\dim(\\Pcal_1)\\,\\dim(\\Pcal_1) = 2 \\cdot 2 = 4 ."}),e.jsxs(i.p,{children:["Nummerieren wir die Koeffizienten wie in ",e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),", also ",e.jsx(n,{children:"\\corange{c_{ij}}"}),` mit
`,e.jsx(n,{children:"i"})," für den ersten und ",e.jsx(n,{children:"j"}),` für den zweiten Faktor, so ist
`,e.jsx(n,{children:"\\corange{c_{11}}"})," der Koeffizient von ",e.jsx(n,{children:"\\cblue{1} \\otimes \\cgreen{1}"}),`,
`,e.jsx(n,{children:"\\corange{c_{21}}"})," der von ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{1}"}),`,
`,e.jsx(n,{children:"\\corange{c_{12}}"})," der von ",e.jsx(n,{children:"\\cblue{1} \\otimes \\cgreen{y}"}),` und
`,e.jsx(n,{children:"\\corange{c_{22}}"})," der von ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{y}"}),"."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.4.10 (Eine bivariate Funktion in dieser Basis)",id:"env-eine-bivariate-funktion-in-dieser-basis",children:[e.jsx(i.p,{children:"Nehmen wir"}),e.jsx(t,{children:"f(x,y) = 2 + 3x - y + 5xy ."}),e.jsx(i.p,{children:"Die Entwicklung ist abzulesen:"}),e.jsx(t,{children:`f = \\corange{2}\\,\\phi_1 + \\corange{3}\\,\\phi_2 + (\\corange{-1})\\,\\phi_3 + \\corange{5}\\,\\phi_4 ,
\\qquad
\\corange{c_{11}} = 2, \\quad \\corange{c_{21}} = 3, \\quad
\\corange{c_{12}} = -1, \\quad \\corange{c_{22}} = 5 .`})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.4.11 (Was der Produktbau bedeutet)",id:"env-was-der-produktbau-bedeutet",children:[e.jsx(i.p,{children:`Drei Beobachtungen an dieser Basis, die sich auf jeden Tensorproduktraum von
Funktionen übertragen.`}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Halten wir ",e.jsx(n,{children:"\\cgreen{y}"})," fest, so ist ",e.jsx(n,{children:"x \\mapsto f(x, \\cgreen{y})"}),` ein Polynom
aus `,e.jsx(n,{children:"\\Pcal_1"}),`, und umgekehrt. Jeder achsenparallele Schnitt durch die Fläche
ist also eine Gerade.`]}),`
`,e.jsxs(i.li,{children:["Ohne den vierten Basisvektor ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{y}"}),` ist
`,e.jsx(n,{children:"f"}),` eine Ebene, die beiden Variablen wirken dann rein additiv. Erst
`,e.jsx(n,{children:"\\corange{c_{22}}"})," koppelt sie: Die Steigung in ",e.jsx(n,{children:"x"}),`-Richtung ist
`,e.jsx(n,{children:"\\corange{c_{21}} + \\corange{c_{22}}\\cgreen{y}"}),` und hängt damit vom
festgehaltenen `,e.jsx(n,{children:"\\cgreen{y}"})," ab."]}),`
`,e.jsxs(i.li,{children:["Der Grad in ",e.jsx(n,{children:"x"})," und der Grad in ",e.jsx(n,{children:"y"})," sind je höchstens ",e.jsx(n,{children:"1"}),`, der Gesamtgrad von
`,e.jsx(n,{children:"xy"})," ist aber ",e.jsx(n,{children:"2"}),`. Tensorprodukträume begrenzen den Grad in jeder Variablen
einzeln, nicht den Gesamtgrad.`]}),`
`]})]}),`
`,e.jsxs(N,{title:"Vier Koeffizienten, eine Fläche",children:[e.jsx(i.p,{children:`Wie erkennen wir an derselben Stelle im Quadrat und auf der Fläche, ob der
gemischte Basisanteil die beiden Variablen koppelt?`}),e.jsx(Bn,{}),e.jsx(i.p,{children:`Der gemischte Basisanteil ist genau der Teil, der die beiden Variablen in der
Fläche koppelt.`})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.4.12 (Allgemeine Dimension, und was sie kostet)",id:"env-allgemeine-dimension-und-was-sie-kostet",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k"}),"-variate Polynome mit Grad höchstens ",e.jsx(n,{children:"d"}),` in jeder Variablen ist der
zugehörige Raum das `,e.jsx(n,{children:"k"}),`-fache Tensorprodukt
`,e.jsx(n,{children:"\\Pcal_d^{\\otimes k} = \\Pcal_d \\otimes \\cdots \\otimes \\Pcal_d"}),", und ",e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`
liefert seine Dimension als `,e.jsx(n,{children:"k"}),"-faches Produkt:"]}),e.jsx(t,{children:"\\dim\\bigl(\\Pcal_d^{\\otimes k}\\bigr) = (d+1)^k ."}),e.jsxs(i.p,{children:["Das wächst exponentiell in der Zahl der Variablen. Für ",e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"}),` sind
das `,e.jsx(n,{children:"4^{10} = 1\\,048\\,576"}),` Basisfunktionen. Zum Vergleich: Der Raum der Polynome
mit `,e.jsx(i.em,{children:"Gesamtgrad"})," höchstens ",e.jsx(n,{children:"d"})," in ",e.jsx(n,{children:"k"})," Variablen hat nur ",e.jsx(n,{children:"\\binom{d+k}{k}"}),`
Dimensionen, für `,e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"})," also ",e.jsx(n,{children:"\\binom{13}{10} = 286"}),`. Der
Produktbau ist bequem, aber teuer, und dieser Preis hat einen Namen:
`,e.jsx(i.em,{children:"Fluch der Dimensionalität"})," (curse of dimensionality)."]}),e.jsx(i.p,{children:"In der Praxis begegnet uns die Konstruktion trotzdem überall:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Finite-Elemente-Methoden:"}),` Auf Rechteckgittern werden Lösungen partieller
Differentialgleichungen durch tensorbasierte Polynome approximiert.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Statistik:"}),` Tensorprodukt-Splines dienen der multivariaten Regression, etwa
in generalisierten additiven Modellen (generalized additive models, GAM).`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Numerik:"})," Dünne Gitter (sparse grids) wählen aus den ",e.jsx(n,{children:"(d+1)^k"}),`
Basisfunktionen gezielt aus und drücken den Aufwand damit weit unter den des
vollen Produktgitters.`]}),`
`]})]}),`
`,e.jsxs(c,{kind:"Bemerkung",label:"9.4.13 (Kronecker-Designmatrix für Tensorprodukt-Splines)",id:"env-kronecker-designmatrix-tensorprodukt-splines",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bB_x \\in \\R^{n_x \\times K_x}"}),` und
`,e.jsx(n,{children:"\\bB_y \\in \\R^{n_y \\times K_y}"}),` die Auswertungsmatrizen zweier univariater
B-Spline-Basen. Für eine Koeffizientenmatrix
`,e.jsx(n,{children:"\\bC \\in \\R^{K_x \\times K_y}"}),` enthält
`,e.jsx(n,{children:"\\bF = \\bB_x\\bC\\bB_y^\\top"}),` die Werte der Tensorprodukt-Spline-Fläche auf dem
`,e.jsx(n,{children:"n_x \\times n_y"}),`-Gitter. Der vec-Trick aus
`,e.jsx(i.a,{href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"})," liefert"]}),e.jsx(t,{children:"\\vec(\\bF) = \\bigl(\\bB_y \\kron \\bB_x\\bigr)\\vec(\\bC)."}),e.jsxs(i.p,{children:["Die dichte Designmatrix ",e.jsx(n,{children:"\\bB_y \\kron \\bB_x"}),` hat das Format
`,e.jsx(n,{children:"(n_xn_y) \\times (K_xK_y)"})," und damit ",e.jsx(n,{children:"n_xn_yK_xK_y"}),` Einträge. Die beiden
Faktoren speichern nur `,e.jsx(n,{children:"n_xK_x+n_yK_y"}),` Einträge. Wir werten daher
`,e.jsx(n,{children:"\\bB_x\\bC\\bB_y^\\top"}),` durch zwei kleine Matrixprodukte aus, statt die große
Designmatrix aufzubauen. Das spart Speicher und meist auch Rechenzeit. In
`,e.jsx(i.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),` erscheint dieselbe Idee mit einer allgemeinen
Designmatrix wieder.`]})]}),`
`,e.jsx(i.p,{children:`Tensorproduktbasen sind damit das Standardwerkzeug, sobald multivariate
Funktionen approximiert werden sollen. Nötig ist dafür zunächst eine gute Basis
für univariate Funktionen, etwa Legendre-Polynome, eine Fourierbasis oder
Wavelets. Das Tensorprodukt setzt daraus eine Basis multivariater Funktionen
zusammen. Im Kapitel zur Funktionsapproximation kommen wir darauf zurück.`}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(H,{children:[e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Wenn wir im Widget ",e.jsx(n,{children:"c_{22}"})," auf null setzen, wird die dargestellte Fläche eine Ebene."]}),e.jsx(i.p,{children:"Dann hängt die Steigung in x-Richtung nicht mehr vom gewählten y-Wert ab."})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Mit dem äußeren Produkt als ",e.jsx(n,{children:"\\otimes"})," ist ",e.jsx(n,{children:"\\R^2 \\otimes \\R^3 = \\R^{2 \\times 3}"}),`,
und dieser Raum hat die Dimension `,e.jsx(n,{children:"6"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"})," mit ",e.jsx(n,{children:"m = 2"})," und ",e.jsx(n,{children:"n = 3"}),`: Die sechs Matrizen
`,e.jsx(n,{children:"\\be_i \\otimes \\be_j = \\bE_{ij}"}),` liegen im Spann der äußeren Produkte und bilden
eine Basis von `,e.jsx(n,{children:"\\R^{2 \\times 3}"}),". Nach ",e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),` ist die Dimension
`,e.jsx(n,{children:"2 \\cdot 3 = 6"}),"."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Jedes Element von ",e.jsx(n,{children:"V \\otimes W"}),` lässt sich als ein einzelnes Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw"})," schreiben."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"V \\otimes W"}),` ist der Spann der elementaren Tensoren, und Summen von Produkten
sind im Allgemeinen selbst keine Produkte. `,e.jsx(i.a,{href:"#env-die-einheitsmatrix-ist-kein-elementarer",children:"Beispiel 9.4.5"}),` zeigt das an
`,e.jsx(n,{children:"\\bI_2 \\in \\R^2 \\otimes \\R^2"}),`: Als Produkt hätte die Matrix höchstens den Rang
`,e.jsx(n,{children:"1"}),", sie hat aber den Rang ",e.jsx(n,{children:"2"}),". Als Summe von zwei elementaren Tensoren geht es."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Für Vektorräume ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"})," gilt ",e.jsx(n,{children:"\\dim(V \\otimes W) = \\dim(V) + \\dim(W)"}),"."]}),e.jsxs(i.p,{children:["Die Dimensionen multiplizieren sich, sie addieren sich nicht (",e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`). Für
`,e.jsx(n,{children:"\\dim(V) = 2"})," und ",e.jsx(n,{children:"\\dim(W) = 3"})," ist ",e.jsx(n,{children:"\\dim(V \\otimes W) = 6"})," und nicht ",e.jsx(n,{children:"5"}),`. Die
Basis besteht aus allen Paaren `,e.jsx(n,{children:"\\bv_i \\otimes \\bw_j"}),`, und davon gibt es
`,e.jsx(n,{children:"\\dim(V)\\dim(W)"})," Stück."]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Jede Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist eine Summe von höchstens ",e.jsx(n,{children:"\\min(m,n)"}),`
elementaren Tensoren.`]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-jede-matrix-ist-eine-kurze-summe",children:"Satz 9.4.6"}),`. Die Summenform der Singulärwertzerlegung liefert
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^r \\sigma_i \\bu_i \\otimes \\bv_i"})," mit ",e.jsx(n,{children:"r = \\rang(\\bA)"}),`, und der
Rang übersteigt weder die Zeilen- noch die Spaltenzahl. Weniger als `,e.jsx(n,{children:"r"}),` Summanden
reichen nicht, `,e.jsx(n,{children:"r"})," ist also sogar die kleinstmögliche Anzahl."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["In der Darstellung ",e.jsx(n,{children:"\\sum_i \\sum_j c_{ij}\\, \\bv_i \\otimes \\bw_j"}),` haben die
Koeffizienten stets die Form `,e.jsx(n,{children:"c_{ij} = a_i b_j"}),"."]}),e.jsxs(i.p,{children:[`Diese Produktform haben genau die elementaren Tensoren, wie die Entwicklung
`,e.jsx(i.a,{href:"#eq-elementarer-tensor-in-produktbasis",children:"(9.4.3)"})," zu ",e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),` zeigt.
Allgemeine Elemente von `,e.jsx(n,{children:"V \\otimes W"}),` haben
beliebige Koeffizienten; bezüglich der Standardbasen ist die
Koeffizientenmatrix zu `,e.jsx(n,{children:"\\bI_2"}),` die Einheitsmatrix selbst, und die hat nicht die
Form `,e.jsx(n,{children:"\\ba\\bb^\\top"})," (",e.jsx(i.a,{href:"#env-eine-feinheit",children:"Bemerkung 9.4.8"}),")."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Basis ",e.jsx(n,{children:"\\{1 \\otimes 1,\\ x \\otimes 1,\\ 1 \\otimes y,\\ x \\otimes y\\}"}),` spannt alle
Polynome in zwei Variablen vom Gesamtgrad höchstens `,e.jsx(n,{children:"2"})," auf."]}),e.jsxs(i.p,{children:[`Sie spannt die Polynome auf, die in jeder Variablen einzeln höchstens den Grad
`,e.jsx(n,{children:"1"}),` haben, und das sind vier Basisfunktionen. Der Raum aller Polynome vom
Gesamtgrad höchstens `,e.jsx(n,{children:"2"})," hat dagegen die Dimension ",e.jsx(n,{children:"\\binom{4}{2} = 6"}),`: Es fehlen
`,e.jsx(n,{children:"x^2"})," und ",e.jsx(n,{children:"y^2"}),`. Tensorprodukträume begrenzen den Grad in jeder Variablen
einzeln, nicht den Gesamtgrad (Bemerkungen `,e.jsx(i.a,{href:"#env-was-der-produktbau-bedeutet",children:"9.4.11"})," und ",e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"9.4.12"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §2.6 zu Basis und Dimension eines Vektorraums und MML §4.5
bis §4.6, wo die Zerlegung einer Matrix in Rang-1-Anteile ausgeführt wird.`})})]})}function Dn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Le,{...r})}):Le(r)}const{blau:Xe,gruen:Oe,orange:se,rot:U}=X,ge=(r,i)=>r.map(s=>i[0].map((l,d)=>s.reduce((x,o,u)=>x+o*i[u][d],0))),yn=r=>r[0].map((i,s)=>r.map(l=>l[s])),Rn=(r,i)=>r.flatMap(s=>i.map(l=>s.flatMap(d=>l.map(x=>d*x)))),je=r=>r[0].flatMap((i,s)=>r.map(l=>l[s])),pe=r=>r.map(i=>[i]);function Mn(){const[r,i]=_.useState([[1,2],[0,1]]),[s,l]=_.useState([[1,0],[2,3]]),[d,x]=_.useState([[1,1],[0,2]]),[o,u]=_.useState(!1),a=_.useMemo(()=>ge(ge(r,s),d),[r,s,d]),b=_.useMemo(()=>Rn(yn(d),r),[r,d]),m=je(a),g=je(ge(b,pe(je(s)))),k=m.every((j,M)=>Math.abs(j-g[M])<1e-9);return e.jsxs("div",{className:"rounded p-3",style:{backgroundColor:"var(--w-bg)"},children:[e.jsx(Z,{children:"Ändern wir A, X oder B und prüfen wir die beiden orangefarbenen Vektoren Eintrag für Eintrag."}),e.jsxs("div",{className:"my-2 text-xs",children:[e.jsx("span",{style:{color:Xe},children:"A"})," wirkt links, ",e.jsx("span",{style:{color:Oe},children:"B"})," rechts; ",e.jsx("span",{style:{color:se},children:"orange"})," markiert die zwei gleichen Ergebnisvektoren."]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:se},children:"vec(AXB)"}),e.jsx(W,{value:pe(m)})]}),e.jsx("span",{"aria-hidden":"true",className:"text-xl",children:"="}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:se},children:"(Bᵀ ⊗_K A) vec(X)"}),e.jsx(W,{value:pe(g)})]}),e.jsxs("svg",{viewBox:"0 0 300 74",width:"300",height:"74",className:"max-w-full h-auto",role:"img","aria-label":"Eine Matrixgleichung wird durch Vektorisierung in ein lineares Gleichungssystem überführt.",children:[e.jsx("rect",{x:"8",y:"18",width:"112",height:"38",rx:"5",fill:se,fillOpacity:"0.18",stroke:se}),e.jsx("text",{x:"64",y:"42",textAnchor:"middle",fill:"var(--w-text)",fontSize:"14",children:"A X B = C"}),e.jsx("path",{d:"M128 37H174",stroke:U,strokeWidth:"2",markerEnd:"url(#arrow)"}),e.jsx("rect",{x:"182",y:"18",width:"110",height:"38",rx:"5",fill:U,fillOpacity:"0.12",stroke:U}),e.jsx("text",{x:"237",y:"42",textAnchor:"middle",fill:"var(--w-text)",fontSize:"12",children:"(Bᵀ ⊗_K A) vec(X)"}),e.jsx("defs",{children:e.jsx("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6z",fill:U})})})]})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap items-start gap-4",children:[e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",style:{color:Xe},children:"A"}),e.jsx(de,{value:r,onChange:i,step:1,min:-4,max:4})]}),e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",children:"X (unbekannt)"}),e.jsx(de,{value:s,onChange:l,step:1,min:-4,max:4})]}),e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",style:{color:Oe},children:"B"}),e.jsx(de,{value:d,onChange:x,step:1,min:-4,max:4})]}),e.jsx("button",{type:"button",className:"rounded border px-2 py-1 text-sm",onClick:()=>u(j=>!j),style:{borderColor:U},children:o?"Operator verbergen":"Operator Bᵀ ⊗_K A zeigen"}),o&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:U},children:"Bᵀ ⊗_K A"}),e.jsx(W,{value:b})]})]}),e.jsx(I,{kind:k?"ok":"fail",children:k?"Die vier Einträge stimmen überein. Aus A X B = C wird damit das LGS (Bᵀ ⊗_K A) vec(X) = vec(C) mit vier Unbekannten.":`Die beiden Seiten weichen um ${p(Math.max(...m.map((j,M)=>Math.abs(j-g[M]))),4)} ab. Das wäre ein Gegenbeispiel zu ${Qe("satz:vektorisierung-eines-matrixprodukts")}.`})]})}function Ue(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:`Vier Abschnitte, ein Faden: Begonnen haben wir mit Abbildungen, die mehrere
Vektoren gleichzeitig verarbeiten, geendet sind wir bei Vektorräumen, die aus
zwei anderen zusammengesetzt werden. Dazwischen stand der Tensor als das Objekt,
das beides verbindet. Sammeln wir ein, was bleiben soll.`}),`
`,e.jsx(i.h3,{children:"Die Kernkonzepte"}),`
`,e.jsx(c,{kind:"Bemerkung",label:"9.5.1 (Sechs Begriffe, die bleiben)",id:"env-sechs-begriffe-die-bleiben",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:e.jsx(h,{id:"tensor",children:"Tensoren"})}),` verallgemeinern Vektoren und Matrizen auf mehr als
zwei Indexpositionen. Ein Tensor der Stufe `,e.jsx(n,{children:"k"})," ist eine durch ",e.jsx(n,{children:"k"}),` Indizes
indizierte Familie reeller Zahlen, also ein Element von
`,e.jsx(n,{children:"\\R^{n_1 \\times \\cdots \\times n_k}"})," (",e.jsx(i.a,{href:"#env-tensor",children:"Definition 9.2.3"}),`,
`,e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),"); Stufe ",e.jsx(n,{children:"1"})," ist ein Vektor, Stufe ",e.jsx(n,{children:"2"}),` eine Matrix.
Gebraucht werden höhere Stufen im Deep Learning, in der Bild- und
Videobearbeitung und in der modernen Statistik; ausführliche Bild- und
Feature-Map-Beispiele stehen als Vertiefung in `,e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Multilinearität"}),` ist etwas anderes als Linearität. Linear heißt
`,e.jsx(n,{children:"f(c\\bv + c'\\bw) = c\\,f(\\bv) + c'\\,f(\\bw)"}),", multilinear dagegen"]}),`
`,e.jsx(t,{children:`f(\\bv_1, \\dots, \\cblue{c\\bv_i + c'\\bv_i'}, \\dots, \\bv_n)
= c\\,f(\\bv_1, \\dots, \\cblue{\\bv_i}, \\dots, \\bv_n)
+ c'\\,f(\\bv_1, \\dots, \\cblue{\\bv_i'}, \\dots, \\bv_n) ,`}),`
`,e.jsxs(i.p,{children:[`also Linearität in jedem einzelnen Argument bei festgehaltenen übrigen
(`,e.jsx(i.a,{href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),", ",e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"}),`). Die
`,e.jsx(h,{id:"matrix-multiplication",children:"Matrizenmultiplikation"}),` ist bilinear, aber nicht
linear (`,e.jsx(i.a,{href:"#env-matrizenmultiplikation-als-bilineare",children:"Beispiel 9.1.6"}),"). Der Grund gilt allgemein: Skalieren wir alle ",e.jsx(n,{children:"n"}),`
Argumente mit demselben `,e.jsx(n,{children:"c"}),", so tritt ",e.jsx(n,{children:"\\cred{c^n}"})," heraus statt ",e.jsx(n,{children:"\\cred{c}"}),`
(`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Das ",e.jsx(h,{id:"outer-product",children:"äußere Produkt"})]}),`
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top"}),` macht aus
zwei Vektoren `,e.jsx(n,{children:"\\neq \\bnull"})," eine Matrix vom Rang ",e.jsx(n,{children:"1"})," (",e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),`,
`,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`). Die
`,e.jsx(h,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` zerlegt umgekehrt
jede Matrix in genau solche Bausteine,
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\,\\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"}),`
(`,e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),", ",e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Das Tensorprodukt"}),` überträgt diese Vorschrift auf beliebige Stufen: Die
Stufen addieren sich, die Einträge multiplizieren sich
(`,e.jsx(i.a,{href:"#env-tensorprodukt",children:"Definition 9.3.7"}),", ",e.jsx(i.a,{href:"#env-stufen-addieren-sich-eintraege",children:"Bemerkung 9.3.8"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Das Kroneckerprodukt"}),` ist die flach angeordnete Fassung für zwei Matrizen,
dieselben Zahlen als Blockmatrix statt als Tensor der Stufe `,e.jsx(n,{children:"4"}),`
(`,e.jsx(i.a,{href:"#env-kroneckerprodukt",children:"Definition 9.3.11"}),", ",e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),`). Es trägt die Vektorisierung von
Matrixgleichungen,
`,e.jsx(n,{children:"\\vec(\\cblue{\\bA}\\bX\\cgreen{\\bB}) = (\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA})\\vec(\\bX)"}),`
(`,e.jsx(i.a,{href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),`), und in der Statistik die Kronecker-strukturierten
`,e.jsx(h,{id:"covariance-matrix",children:"Kovarianzmatrizen"}),` multivariater Verteilungen, von
Zeitreihen und von raumzeitlichen Daten (`,e.jsx(i.a,{href:"#env-separierbare-kovarianz",children:"Definition 9.3.17"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Tensorprodukte bauen größere Räume aus kleineren."}),` Der Raum
`,e.jsx(n,{children:"V \\otimes W"})," ist die ",e.jsx(h,{id:"span",children:"lineare Hülle"}),` aller Produkte
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," (",e.jsx(i.a,{href:"#env-tensorprodukt-von-vektorraeumen",children:"Definition 9.4.1"}),`,
`,e.jsx(i.a,{href:"#sec-9.4",children:"Abschnitt 9.4"}),`), und aus Basen der Faktoren entsteht durch
Ausmultiplizieren eine `,e.jsx(h,{id:"basis",children:"Basis"}),` des Produktraums mit
`,e.jsx(n,{children:"\\dim(V \\otimes W) = \\dim(V)\\dim(W)"})," (",e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`). Mit Funktionenräumen als
Faktoren liefert das multivariate Basen aus univariaten, die Grundlage der
Funktionsapproximation und höherdimensionaler Splines.`]}),`
`]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Vektorisierung von Matrixgleichungen"}),`
`,e.jsxs(i.p,{children:[`Ein Punkt dieser Liste verdient mehr als einen Halbsatz, weil er Kapitel 9 an
Kapitel 5 zurückbindet. Eine Gleichung der Bauart
`,e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB} = \\bC"})," ist linear in der Unbekannten ",e.jsx(n,{children:"\\bX"}),`, aber
diese Unbekannte ist eine Matrix. Die Verfahren aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"})," erwarten dagegen ein System ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),`
mit einem Vektor als Unbekannter. Also stapeln wir die Matrix zu einem Vektor
um.`]}),`
`,e.jsxs(c,{kind:"Definition",label:"9.5.2 (Vektorisierung)",id:"env-zusammenfassung-vektorisierung",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bX \\in \\R^{p \\times q}"})," mit den Spalten ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_q \\in \\R^p"}),` ist
die `,e.jsx(i.em,{children:"Vektorisierung"})," (vectorization)"]}),e.jsx(t,{children:"\\vec(\\bX) = \\begin{pmatrix} \\bx_1 \\\\ \\vdots \\\\ \\bx_q \\end{pmatrix} \\in \\R^{pq} ,"}),e.jsxs(i.p,{children:["also der Vektor, der die Spalten von ",e.jsx(n,{children:"\\bX"}),` untereinanderhängt. Gestapelt wird
spaltenweise, so wie R eine Matrix ohnehin abspeichert.`]})]}),`
`,e.jsxs(c,{kind:"Satz",label:"9.5.3 (Vektorisierung eines Matrixprodukts)",id:"env-vektorisierung-eines-matrixprodukts",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times p}"}),", ",e.jsx(n,{children:"\\bX \\in \\R^{p \\times q}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{q \\times n}"}),". Dann gilt"]}),e.jsx(q,{tag:"9.5.1",id:"eq-vektorisierung-eines-matrixprodukts",children:`\\vec\\bigl(\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB}\\bigr)
= \\bigl(\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}\\bigr)\\,\\vec(\\bX) .`}),e.jsxs(i.p,{children:["Im Kroneckerprodukt steht ",e.jsx(n,{children:"\\cgreen{\\bB^\\top}"})," als erster und ",e.jsx(n,{children:"\\cblue{\\bA}"}),` als
zweiter Faktor; die Matrix `,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"}),` hat das
Format `,e.jsx(n,{children:"nm \\times qp"}),", passend zu ",e.jsx(n,{children:"\\vec(\\bX) \\in \\R^{pq}"}),` und
`,e.jsx(n,{children:"\\vec(\\cblue{\\bA}\\bX\\cgreen{\\bB}) \\in \\R^{mn}"}),"."]})]}),`
`,e.jsx(K,{title:"Der vec-Trick, blockweise nachgerechnet",children:e.jsxs(J,{children:[e.jsxs(E,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\bB}\\be_j"})," ist die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\cgreen{\\bB}"}),"; ein Matrix-Vektor-Produkt ist die Linearkombination der Spalten mit den Einträgen des Vektors"]}),children:[e.jsxs(i.p,{children:["Wir lesen beide Seiten blockweise, mit Blöcken der Länge ",e.jsx(n,{children:"m"}),`. Sind
`,e.jsx(n,{children:"\\bx_1, \\dots, \\bx_q"})," die Spalten von ",e.jsx(n,{children:"\\bX"}),` und
`,e.jsx(n,{children:"\\cgreen{b_{kj}}"})," die Einträge von ",e.jsx(n,{children:"\\cgreen{\\bB}"}),", so ist die ",e.jsx(n,{children:"j"}),`-te Spalte von
`,e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB}"})]}),e.jsx(t,{children:`\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB}\\be_j
= \\cblue{\\bA}\\,\\bX \\begin{pmatrix} \\cgreen{b_{1j}} \\\\ \\vdots \\\\ \\cgreen{b_{qj}} \\end{pmatrix}
= \\sum_{k=1}^{q} \\cgreen{b_{kj}}\\; \\cblue{\\bA}\\,\\bx_k .`})]}),e.jsx(E,{why:e.jsxs(e.Fragment,{children:["Blockmultiplikation: der ",e.jsx(n,{children:"j"}),"-te Block eines Produkts ist die Summe der Blockprodukte über ",e.jsx(n,{children:"k"}),"; das Transponieren vertauscht die Indizes, deshalb steht dort ",e.jsx(n,{children:"\\cgreen{b_{kj}}"})," und nicht ",e.jsx(n,{children:"\\cgreen{b_{jk}}"})]}),children:e.jsxs(i.p,{children:["Auf der rechten Seite von ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),` zerlegen wir
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"})," nach ",e.jsx(i.a,{href:"#env-kroneckerprodukt",children:"Definition 9.3.11"}),` in Blöcke der
Größe `,e.jsx(n,{children:"m \\times p"}),". Der Block an der Stelle ",e.jsx(n,{children:"(j,k)"}),` ist
`,e.jsx(n,{children:"\\bigl(\\cgreen{\\bB^\\top}\\bigr)_{jk}\\,\\cblue{\\bA} = \\cgreen{b_{kj}}\\,\\cblue{\\bA}"}),`,
und der `,e.jsx(n,{children:"k"}),"-te Block von ",e.jsx(n,{children:"\\vec(\\bX)"})," ist ",e.jsx(n,{children:"\\bx_k"}),". Der ",e.jsx(n,{children:"j"}),`-te Block des Produkts
lautet damit `,e.jsx(n,{children:"\\sum_{k=1}^{q} \\cgreen{b_{kj}}\\,\\cblue{\\bA}\\,\\bx_k"}),`. Das ist
genau die Spalte aus Schritt 1, und da `,e.jsx(n,{children:"j"}),` beliebig war, stimmen beide Seiten
überein.`]})})]})}),`
`,e.jsxs(N,{title:"Die Matrixgleichung als lineares System",children:[e.jsxs(i.p,{children:["Welche der beiden Rechnungen liefert denselben Vektor, wenn wir die Einträge von ",e.jsx(n,{children:"\\bX"})," verändern?"]}),e.jsx(Mn,{}),e.jsx(i.p,{children:`Die Vektorisierung bewahrt die lineare Wirkung von links und rechts und macht
damit Standardverfahren für lineare Gleichungssysteme anwendbar.`})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.5.4 (Die Identität an 2×2-Matrizen)",id:"env-die-identitaet-an-2-2-matrizen",children:[e.jsx(i.p,{children:"Für"}),e.jsx(t,{children:`\\cblue{\\bA} = \\begin{pmatrix} \\cblue{1} & \\cblue{2} \\\\ \\cblue{0} & \\cblue{1} \\end{pmatrix} ,
\\qquad
\\bX = \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} ,
\\qquad
\\cgreen{\\bB} = \\begin{pmatrix} \\cgreen{1} & \\cgreen{1} \\\\ \\cgreen{0} & \\cgreen{2} \\end{pmatrix}`}),e.jsx(i.p,{children:"rechnen wir zuerst direkt:"}),e.jsx(t,{children:`\\cblue{\\bA}\\,\\bX = \\begin{pmatrix} 5 & 6 \\\\ 2 & 3 \\end{pmatrix} ,
\\qquad
\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB} = \\begin{pmatrix} \\corange{5} & \\corange{17} \\\\ \\corange{2} & \\corange{8} \\end{pmatrix} ,
\\qquad
\\vec\\bigl(\\cblue{\\bA}\\bX\\cgreen{\\bB}\\bigr) = \\begin{pmatrix} \\corange{5} \\\\ \\corange{2} \\\\ \\corange{17} \\\\ \\corange{8} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Und nun über ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),`. Mit
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} = \\bigl(\\begin{smallmatrix} \\cgreen{1} & \\cgreen{0} \\\\ \\cgreen{1} & \\cgreen{2} \\end{smallmatrix}\\bigr)"}),`
ist`]}),e.jsx(t,{children:`\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}
= \\begin{pmatrix} \\cgreen{1}\\cdot\\cblue{\\bA} & \\cgreen{0}\\cdot\\cblue{\\bA} \\\\ \\cgreen{1}\\cdot\\cblue{\\bA} & \\cgreen{2}\\cdot\\cblue{\\bA} \\end{pmatrix}
= \\begin{pmatrix}
1 & 2 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
1 & 2 & 2 & 4 \\\\
0 & 1 & 0 & 2
\\end{pmatrix} ,
\\qquad
\\vec(\\bX) = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\\\ 3 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:[`und das Produkt der beiden ist
`,e.jsx(n,{children:"(\\corange{5}, \\corange{2}, \\corange{17}, \\corange{8})^\\top"}),`, wie versprochen.
Auf die Reihenfolge kommt es dabei an: `,e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB^\\top}"}),`
liefert `,e.jsx(n,{children:"(1, 17, 0, 6)^\\top"}),` und damit etwas ganz anderes. Die Formatprobe
schützt uns davor grundsätzlich nicht: Zeilen- und
Spaltenzahl eines Kroneckerprodukts entstehen als Produkte der Zeilen- bzw.
Spaltenzahlen beider Faktoren, und Produkte hängen nicht von der Reihenfolge ab.
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"})," und ",e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB^\\top}"}),`
haben deshalb stets dasselbe Format, hier `,e.jsx(n,{children:"4 \\times 4"}),`, und beide lassen sich
mit `,e.jsx(n,{children:"\\vec(\\bX)"})," multiplizieren."]})]}),`
`,e.jsxs(c,{kind:"Beispiel",label:"9.5.5 (Sylvester-Gleichung mit dem vec-Trick)",id:"env-sylvester-gleichung-per-vec-trick",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Sylvester-Gleichung"})," lautet"]}),e.jsx(t,{children:"\\bA\\bX + \\bX\\bB = \\bC ."}),e.jsxs(i.p,{children:["Mit den beiden Spezialfällen von ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),` wird
daraus`]}),e.jsx(t,{children:`\\bigl(\\bI_2 \\kron \\bA + \\bB^\\top \\kron \\bI_2\\bigr)\\vec(\\bX)
= \\vec(\\bC) .`}),e.jsx(i.p,{children:"Betrachten wir"}),e.jsx(t,{children:`\\bA = \\begin{pmatrix}3&0\\\\1&2\\end{pmatrix},\\qquad
\\bB = \\begin{pmatrix}0&1\\\\1&1\\end{pmatrix},\\qquad
\\bC = \\begin{pmatrix}1&3\\\\2&4\\end{pmatrix}.`}),e.jsxs(i.p,{children:[`Das zugehörige lineare Gleichungssystem hat die Systemmatrix
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix}3&0&1&0\\\\1&2&0&1\\\\1&0&4&0\\\\0&1&1&3\\end{smallmatrix}\\bigr)"}),`.
Seine Lösung ist`]}),e.jsx(t,{children:`\\vec(\\bX) =
\\begin{pmatrix}1/11\\\\27/55\\\\8/11\\\\51/55\\end{pmatrix},
\\qquad
\\bX = \\begin{pmatrix}1/11&8/11\\\\27/55&51/55\\end{pmatrix}.`}),e.jsx(i.p,{children:"In R folgt die Rechnung direkt der Formel:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`A <- matrix(c(3, 1, 0, 2), 2, 2)
B <- matrix(c(0, 1, 1, 1), 2, 2)
C <- matrix(c(1, 2, 3, 4), 2, 2)
M <- kronecker(diag(2), A) + kronecker(t(B), diag(2))
X <- matrix(solve(M, as.vector(C)), 2, 2)
A %*% X + X %*% B
all.equal(A %*% X + X %*% B, C)
`})}),e.jsxs(i.p,{children:["Die letzte Zeile ergibt ",e.jsx(i.code,{children:"TRUE"}),`. Lyapunov-Gleichungen, etwa für stationäre
Kovarianzmatrizen von Zeitreihenmodellen, sind wichtige Spezialfälle. Für
große Matrizen verwenden wir spezialisierte Löser, die die Struktur ausnutzen.`]})]}),`
`,e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB} = \\bC"})," wird mit ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),` ein gewöhnliches
`,e.jsx(h,{id:"linear-system",children:"lineares Gleichungssystem"}),`
`,e.jsx(n,{children:"(\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA})\\vec(\\bX) = \\vec(\\bC)"})," mit ",e.jsx(n,{children:"mn"}),`
Gleichungen und `,e.jsx(n,{children:"pq"}),` Unbekannten. Der Gewinn ist begrifflich, der Preis ist
Speicher und Rechenzeit: Ausgeschrieben hat die Systemmatrix `,e.jsx(n,{children:"mnpq"}),` Einträge.
Praktisch nutzen wir deshalb die Struktur, statt sie auszumultiplizieren. Sind
`,e.jsx(n,{children:"\\cblue{\\bA}"})," und ",e.jsx(n,{children:"\\cgreen{\\bB}"}),` quadratisch und invertierbar, so liefert
`,e.jsx(n,{children:"\\bX = \\cblue{\\bA^{-1}}\\bC\\,\\cgreen{\\bB^{-1}}"}),` die Lösung allein aus den beiden
kleinen Faktoren. Das ist eine symbolische Identität; numerisch bilden wir die
Inversen nicht explizit, sondern lösen nacheinander lineare Systeme mit
`,e.jsx(n,{children:"\\cblue{\\bA}"})," und ",e.jsx(n,{children:"\\cgreen{\\bB^\\top}"}),`. Nach demselben Muster arbeiten die separierbaren
Kovarianzmatrizen aus `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`: Dort lesen wir die Eigenwerte
von `,e.jsx(n,{children:"\\bSigma"})," als Produkte der Eigenwerte beider Faktoren ab, ohne ",e.jsx(n,{children:"\\bSigma"}),` je
aufzustellen.`]}),`
`,e.jsx(i.h3,{children:"Wie es weitergeht"}),`
`,e.jsxs(i.p,{children:[`Offen geblieben ist der Bogen zur Approximation. Eine gute Basis für univariate
Funktionen, etwa Legendre-Polynome, eine Fourierbasis oder Wavelets, liefert
über das Tensorprodukt sofort eine Basis für multivariate Funktionen. Wie wir
damit tatsächlich approximieren und wie wir dem exponentiellen Wachstum
`,e.jsx(n,{children:"(d+1)^k"})," aus ",e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"Bemerkung 9.4.12"}),` entkommen, ist das Thema von
`,e.jsx(i.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),"."]}),`
`,e.jsxs(i.p,{children:["Das nächste Kapitel, ",e.jsx(i.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),`, wendet
sich der fortgeschrittenen Differentialrechnung zu. Tensoren begegnen uns dort
gleich wieder: Leiten wir
einen matrixwertigen Ausdruck nach einer Matrix ab
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.4",children:"Abschnitt 10.4"}),`), so ist das Ergebnis von Haus
aus ein mehrdimensionales Zahlenfeld, und die Vektorisierung aus `,e.jsx(i.a,{href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),` ist
eines der Werkzeuge, mit denen sich das ordnen lässt.`]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsx(i.p,{children:"Vier Aussagen quer durch das Kapitel. Welche davon stimmen?"}),`
`,e.jsxs(H,{children:[e.jsxs(f,{wahr:!0,children:[e.jsx(i.p,{children:`Die Schätzung aus dem Kronecker-Widget zeigt: Vertauschen der Faktoren kann die
Blockstruktur ändern, obwohl das Ergebnisformat gleich bleibt.`}),e.jsxs(i.p,{children:["Das ist die Nicht-Kommutativität aus ",e.jsx(i.a,{href:"#env-transponieren-und-reihenfolge",children:"Bemerkung 9.3.14"}),"."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:[`Mit spaltenweiser Vektorisierung gilt
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB) = (\\bA \\kron \\bB^\\top)\\vec(\\bX)"}),"."]}),e.jsxs(i.p,{children:[`Die Faktoren stehen vertauscht. Richtig ist
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB) = (\\bB^\\top \\kron \\bA)\\vec(\\bX)"})," nach ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),`: Der
transponierte `,e.jsx(i.em,{children:"rechte"})," Faktor steht im Kroneckerprodukt ",e.jsx(i.em,{children:"links"}),`. Die
Formatprobe merkt den Tausch nie, denn beide Anordnungen führen auf dasselbe
Format. In `,e.jsx(i.a,{href:"#env-die-identitaet-an-2-2-matrizen",children:"Beispiel 9.5.4"})," ist das ",e.jsx(n,{children:"4 \\times 4"}),`, und die vertauschte Fassung
liefert dort
`,e.jsx(n,{children:"(1, 17, 0, 6)^\\top"}),` statt des korrekten
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB) = (5, 2, 17, 8)^\\top"}),"."]})]}),e.jsxs(f,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bv \\in \\R^m"})," und ",e.jsx(n,{children:"\\bw \\in \\R^n"}),` hat das äußere Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw"})," stets den Rang ",e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"})," setzt ",e.jsx(n,{children:"\\bv \\neq \\bnull"})," und ",e.jsx(n,{children:"\\bw \\neq \\bnull"}),` voraus, und diese
Voraussetzung ist nötig: Ist einer der beiden Vektoren der Nullvektor, so sind
nach `,e.jsx(i.a,{href:"#eq-aeusseres-produkt",children:"(9.3.1)"})," alle Einträge ",e.jsx(n,{children:"v_i w_j"}),` gleich null, das Produkt ist die
Nullmatrix und hat den Rang `,e.jsx(n,{children:"0"}),`. Andernfalls stimmt die Aussage, denn dann
spannt `,e.jsx(n,{children:"\\bv"})," allein den Spaltenraum auf."]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," und ",e.jsx(n,{children:"\\bB \\in \\R^{p \\times q}"}),` enthalten das
Tensorprodukt und das Kroneckerprodukt dieselben `,e.jsx(n,{children:"mnpq"}),` Zahlen, nur anders
angeordnet.`]}),e.jsxs(i.p,{children:["Beide Male entsteht jede Zahl als ein Produkt ",e.jsx(n,{children:"a_{i_1 i_2} b_{j_1 j_2}"}),`
(`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),"). Das Tensorprodukt legt sie in einen Tensor der Stufe ",e.jsx(n,{children:"4"}),` mit
Format `,e.jsx(n,{children:"m \\times n \\times p \\times q"}),`, das Kroneckerprodukt flacht dieselben
Werte zu einer Matrix aus `,e.jsx(n,{children:"\\R^{mp \\times nq}"}),` ab. Welche Lesart gemeint ist,
verrät in der Praxis das Format des Ergebnisses.`]})]}),e.jsxs(f,{wahr:!0,children:[e.jsxs(i.p,{children:["Kombinieren wir ",e.jsx(n,{children:"k"})," univariate Basen mit je ",e.jsx(n,{children:"d+1"}),` Funktionen zu einer
Tensorproduktbasis, so hat diese `,e.jsx(n,{children:"(d+1)^k"})," Elemente."]}),e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#env-tensorproduktbasis",children:"Satz 9.4.7"})," multipliziert die Dimensionen, und bei ",e.jsx(n,{children:"k"}),` Faktoren entsteht so das
`,e.jsx(n,{children:"k"}),"-fache Produkt (",e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"Bemerkung 9.4.12"}),"). Für ",e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"}),` sind das
`,e.jsx(n,{children:"4^{10} = 1\\,048\\,576"}),` Basisfunktionen, während der Raum der Polynome mit
Gesamtgrad höchstens `,e.jsx(n,{children:"3"})," in ",e.jsx(n,{children:"10"}),` Variablen nur
`,e.jsx(n,{children:"\\binom{13}{10} = 286"})," Dimensionen hat. Bequem gebaut, aber teuer bezahlt."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Den vec-Operator und die Rechenregeln rund um
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB)"})," entwickelt Kapitel 2 von Magnus und Neudecker, ",e.jsx(i.em,{children:`Matrix
Differential Calculus with Applications in Statistics and Econometrics`}),`; von
dort führt dasselbe Buch weiter in die Matrixdifferentialrechnung, die als
Nächstes ansteht.`]})})]})}function Fn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Ue,{...r})}):Ue(r)}const Tn={sections:[{id:"9.1",key:"multilinear",title:"Multilineare Abbildungen",C:ee(ln)},{id:"9.2",key:"tensoren",title:"Tensoren",C:ee(un)},{id:"9.3",key:"produkte",title:"Produkte von Tensoren",C:ee(_n)},{id:"9.4",key:"tensorprodukt",title:"Tensorprodukt von Vektorräumen",C:ee(Dn)},{id:"9.5",key:"zusammenfassung",title:"Zusammenfassung",C:ee(Fn)}]};export{Tn as default};
