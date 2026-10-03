import{r as _,u as ze,j as e,h as cn,A as L,F as Q,g as p,D as Se,S as R,e as ee,f as W,V as O,M as n,C as t,E as h,b as l,G as Z,Q as ne,i as v,v as nn,w as rn,l as hn,P as ie,o as T,Z as sn,O as G,d as tn,s as he,m as se}from"./index-BGJgxqST.js";import{I as X,E as q}from"./Interaktiv-Bbglsg7Y.js";const{blau:te,gruen:oe,orange:xe,rot:Ae,grau:Y}=Q,J=230,re=46,Be=J+re+18,ye=J+re+18,A=r=>re+r/6*J,B=r=>re+J-r/6*J;function on(){const[r,i]=_.useState(3),[s,a]=_.useState(2),[d,o]=_.useState("gemeinsam"),c=ze({feld:{x0:re,y0:re,w:J,h:J},welt:{x0:0,x1:3,y0:0,y1:3},greifPosition:()=>[r,s],clamp:([j,x])=>[Math.max(0,Math.min(3,j)),Math.max(0,Math.min(3,x))],onDrag:([j,x])=>{i(j),a(x)}}),u=r*s,b=2*r,m=d==="gemeinsam"?2*s:s,f=b*m,k=u<1e-8;return e.jsx(cn,{variante:"auswahl",frage:"Welcher Faktor entsteht beim Verdoppeln beider Seiten?",loesung:"4",optionen:[{id:"2",text:"Faktor 2"},{id:"3",text:"Faktor 3"},{id:"4",text:"Faktor 4"}],children:({aufgeloest:j})=>e.jsxs("div",{children:[e.jsx(L,{children:"Ziehen wir die Ecke, tippen den Faktor und vergleichen danach beide Skalierungen."}),e.jsxs("svg",{viewBox:`0 0 ${Be} ${ye}`,width:Be,height:ye,className:"mt-3 max-w-full h-auto",role:"img","aria-label":"Rechteck mit den Seiten x und y; die rechte obere Ecke ist ziehbar.",...c.svgProps,children:[[0,1,2,3,4,5,6].map(x=>e.jsxs("g",{children:[e.jsx("line",{x1:A(x),y1:B(0),x2:A(x),y2:B(0)+3,stroke:Y}),e.jsx("text",{x:A(x),y:B(0)+14,fontSize:"9",textAnchor:"middle",fill:Y,children:x})]},x)),[0,1,2,3,4,5,6].map(x=>e.jsxs("g",{children:[e.jsx("line",{x1:A(0)-3,y1:B(x),x2:A(0),y2:B(x),stroke:Y}),e.jsx("text",{x:A(0)-6,y:B(x)+3,fontSize:"9",textAnchor:"end",fill:Y,children:x})]},`y${x}`)),e.jsx("line",{x1:A(0),y1:B(0),x2:A(6),y2:B(0),stroke:Y}),e.jsx("line",{x1:A(0),y1:B(0),x2:A(0),y2:B(6),stroke:Y}),j&&e.jsx("rect",{x:A(0),y:B(m),width:A(b)-A(0),height:B(0)-B(m),fill:d==="gemeinsam"?Ae:te,fillOpacity:"0.12",stroke:d==="gemeinsam"?Ae:te,strokeDasharray:"5 3",strokeWidth:"2"}),e.jsx("rect",{x:A(0),y:B(s),width:A(r)-A(0),height:B(0)-B(s),fill:xe,fillOpacity:"0.38",stroke:xe}),e.jsx("line",{x1:A(0),y1:B(0),x2:A(r),y2:B(0),stroke:te,strokeWidth:"4"}),e.jsx("line",{x1:A(0),y1:B(0),x2:A(0),y2:B(s),stroke:oe,strokeWidth:"4"}),e.jsxs("text",{x:(A(0)+A(r))/2,y:B(0)+27,fill:te,fontSize:"11",textAnchor:"middle",children:["x = ",p(r,1)]}),e.jsxs("text",{x:A(0)+6,y:(B(0)+B(s))/2,fill:oe,fontSize:"11",textAnchor:"start",children:["y = ",p(s,1)]}),e.jsx(Se,{x:A(r),y:B(s),farbe:xe,...c.handleProps("ecke")})]}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(R,{label:"Seite x",value:r,onChange:i,min:0,max:3,step:.1,accent:te}),e.jsx(R,{label:"Seite y",value:s,onChange:a,min:0,max:3,step:.1,accent:oe})]}),j&&e.jsxs("div",{className:"mt-2 flex flex-wrap gap-2",role:"group","aria-label":"Skalierung wählen",children:[e.jsx("button",{type:"button",className:d==="gemeinsam"?ee:W,"aria-pressed":d==="gemeinsam",onClick:()=>o("gemeinsam"),children:"Beide Seiten verdoppeln"}),e.jsx("button",{type:"button",className:d==="fest"?ee:W,"aria-pressed":d==="fest",onClick:()=>o("fest"),children:"y festhalten"})]}),e.jsx(O,{kind:k?"warn":j?d==="fest"?"ok":"warn":"neutral",children:k?"Auf einer Achse ist die Fläche null; einen Skalierungsfaktor können wir dort nicht ablesen.":j?d==="fest"?`Mit festem y gilt f(2x,y) = ${p(f,2)} = 2·f(x,y). Das ist Linearität im ersten Argument.`:`Gemeinsam gilt f(2x,2y) = ${p(f,2)} = 4·f(x,y), nicht 2·f(x,y). Bilinearität verlangt gerade nicht gemeinsame Linearität.`:`Die Ausgangsfläche beträgt f(x,y) = ${p(u,2)}. Erst nach dem Tipp legen wir die Vergleichsfläche darüber.`})]})})}function De(r){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Eine lineare Abbildung nimmt einen Vektor und liefert einen Vektor. Für viele
Rechenvorschriften ist das zu eng. Ein Skalarprodukt braucht zwei Vektoren, die
Matrizenmultiplikation verarbeitet zwei Matrizen zu einer dritten, und hinter
einer quadratischen Form `,e.jsx(n,{children:"\\bx^\\top\\bA\\bx"}),` steckt die Abbildung
`,e.jsx(n,{children:"(\\bx, \\by) \\mapsto \\bx^\\top\\bA\\by"}),` mit zwei Argumenten. Als Abbildung des
ganzen Tupels ist keine davon linear, wohl aber in jedem einzelnen Argument. Auf
dieser Beobachtung baut das Kapitel auf.`]}),`
`,e.jsx(i.h3,{children:"Was wir brauchen"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(t,{id:"vector-space",children:"Vektorräume"})," und ihre Unterräume, dazu ",e.jsx(t,{id:"basis",children:"Basis"}),`
und `,e.jsx(t,{id:"dimension",children:"Dimension"}),". In einem Raum der Dimension ",e.jsx(n,{children:"n"}),` ist jeder
Vektor durch seine `,e.jsx(n,{children:"n"})," Koordinaten bezüglich einer festen Basis bestimmt."]}),`
`,e.jsxs(i.li,{children:[e.jsx(t,{id:"linear-map",children:"Lineare Abbildungen"}),", also ",e.jsx(n,{children:"f(c\\bv + c'\\bv') = c f(\\bv) + c' f(\\bv')"}),`.
Diese Eigenschaft verallgemeinern wir gleich.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(t,{id:"span",children:"lineare Hülle"}),`
`,e.jsx(n,{children:"\\spann\\bigl(\\{\\bv_1, \\dots, \\bv_n\\}\\bigr) = \\bigl\\{\\bw : \\bw = \\sum_i c_i \\bv_i,\\ c_i \\in \\R\\bigr\\}"}),"."]}),`
`,e.jsxs(i.li,{children:["Als Vorschau das ",e.jsx(i.em,{children:"äußere Produkt"})," ",e.jsx(n,{children:"\\bv \\otimes \\bw = \\bv\\bw^\\top"}),` aus
`,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),"."]}),`
`,e.jsxs(i.li,{children:[`Aus der Analysis: Funktionen mehrerer Veränderlicher,
`,e.jsx(n,{children:"f(\\bx) = f(x_1, x_2, \\dots, x_n)"}),"."]}),`
`,e.jsxs(i.li,{children:["Aus ",e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),": lineare Gleichungssysteme ",e.jsx(n,{children:"\\bM\\bz = \\bc"})," lösen (LU, Cholesky)."]}),`
`]}),`
`,e.jsx(i.h3,{children:"Von einem Vektor zu einem Tupel"}),`
`,e.jsxs(i.p,{children:["Bisher haben wir einen Vektor ",e.jsx(n,{children:"\\bv \\in V"})," linear auf einen Vektor ",e.jsx(n,{children:"\\bw \\in W"}),`
abgebildet. Jetzt bilden wir Paare oder allgemeiner Tupel
`,e.jsx(n,{children:"(\\bv_1, \\dots, \\bv_n) \\in V_1 \\times \\cdots \\times V_n"}),` ab, und zwar wieder
„linear". Die Anführungszeichen sind nötig, denn Linearität bezieht sich hier
auf die `,e.jsx(i.em,{children:"einzelnen"}),` Argumente: Halten wir alle Argumente bis auf eines fest, so
soll die verbleibende Abbildung linear sein. Solche Abbildungen heißen
`,e.jsx(i.em,{children:"multilinear"}),"."]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.1.1 (Multilineare Abbildung)",id:"env-multilineare-abbildung",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V_1, \\dots, V_n, W"}),` Vektorräume. Eine Abbildung
`,e.jsx(n,{children:"f\\colon V_1 \\times \\cdots \\times V_n \\to W"})," heißt ",e.jsx(i.em,{children:"multilinear"}),", wenn"]}),e.jsx(l,{children:`\\begin{aligned}
&f(\\bv_1, \\dots, \\cblue{c\\bv_i + c'\\bv_i'}, \\dots, \\bv_n) \\\\
&\\qquad = c\\,f(\\bv_1, \\dots, \\cblue{\\bv_i}, \\dots, \\bv_n)
        + c'\\,f(\\bv_1, \\dots, \\cblue{\\bv_i'}, \\dots, \\bv_n)
\\end{aligned}`}),e.jsxs(i.p,{children:["für alle ",e.jsx(n,{children:"i = 1, \\dots, n"}),", alle ",e.jsx(n,{children:"c, c' \\in \\R"}),", alle ",e.jsx(n,{children:"\\bv_i, \\bv_i' \\in V_i"}),`
und alle `,e.jsx(n,{children:"\\bv_\\ell \\in V_\\ell"})," (",e.jsx(n,{children:"\\ell \\neq i"}),") gilt."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.1.2 (Bilinearität und Linearität)",id:"env-bilinear-und-eine-warnung",children:[e.jsxs(i.p,{children:["Im Spezialfall ",e.jsx(n,{children:"n = 2"})," nennen wir ",e.jsx(n,{children:"f"})," ",e.jsx(i.em,{children:"bilinear"}),"."]}),e.jsxs(i.p,{children:["Multilineare Abbildungen sind in der Regel ",e.jsx(i.em,{children:"nicht"}),` linear. Skalieren wir alle
`,e.jsx(n,{children:"n"})," Argumente gleichzeitig mit demselben ",e.jsx(n,{children:"c"}),`, so zieht die Homogenität den
Faktor `,e.jsx(n,{children:"n"}),"-mal heraus, einmal je Argument:"]}),e.jsx(l,{children:"f(c\\bv_1, c\\bv_2, \\dots, c\\bv_n) = \\cred{c^n}\\, f(\\bv_1, \\bv_2, \\dots, \\bv_n) ."}),e.jsxs(i.p,{children:["Für eine lineare Abbildung müsste dort ",e.jsx(n,{children:"\\cred{c}"})," stehen. Ab ",e.jsx(n,{children:"n \\geq 2"}),` ist das
ein Unterschied, sobald `,e.jsx(n,{children:"f"})," überhaupt einen Wert ungleich ",e.jsx(n,{children:"\\bnull"}),` annimmt.
Verschiedene Faktoren in verschiedenen Argumenten multiplizieren sich ebenso,
für bilineares `,e.jsx(n,{children:"f"})," etwa ",e.jsx(n,{children:"f(2\\bv, 3\\bw) = 6\\,f(\\bv, \\bw)"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Die Fläche eines Rechtecks"}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.1.3 (Fläche eines Rechtecks)",id:"env-flaeche-eines-rechtecks",children:[e.jsx(i.p,{children:`Wir betrachten die Fläche eines Rechtecks als Funktion seiner beiden
Seitenlängen:`}),e.jsx(l,{children:`f\\colon \\R \\times \\R \\to \\R, \\qquad
(\\cblue{x}, \\cgreen{y}) \\mapsto \\cblue{x}\\cgreen{y} .`}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Warum ist ",e.jsx(n,{children:"f"})," nicht linear?"]}),` Verdoppeln wir beide Seiten, setzen also
`,e.jsx(n,{children:"c = 2"}),", so wächst die Fläche auf das Vierfache:"]}),e.jsx(l,{children:`f(2\\cblue{x}, 2\\cgreen{y}) = 2\\cblue{x} \\cdot 2\\cgreen{y}
= \\cred{4}\\,\\cblue{x}\\cgreen{y} = \\cred{4}\\,f(\\cblue{x}, \\cgreen{y}) .`}),e.jsxs(i.p,{children:["Linear wäre ",e.jsx(n,{children:"f(c\\cblue{x}, c\\cgreen{y}) = c\\,f(\\cblue{x}, \\cgreen{y})"}),`, hier
also das Doppelte. Solange `,e.jsx(n,{children:"\\cblue{x}\\cgreen{y} \\neq 0"}),` ist, sind die beiden
Werte verschieden.`]}),e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Aber ",e.jsx(n,{children:"f"})," ist bilinear."]})," Halten wir ",e.jsx(n,{children:"\\cgreen{y}"}),` fest, so gelten Additivität
und Homogenität im ersten Argument:`]}),e.jsx(l,{children:`\\begin{aligned}
f(\\cblue{x_1} + \\cblue{x_2}, \\cgreen{y})
&= (\\cblue{x_1} + \\cblue{x_2})\\,\\cgreen{y}
 = \\cblue{x_1}\\cgreen{y} + \\cblue{x_2}\\cgreen{y}
 = f(\\cblue{x_1}, \\cgreen{y}) + f(\\cblue{x_2}, \\cgreen{y}) , \\\\
f(c\\,\\cblue{x}, \\cgreen{y})
&= (c\\,\\cblue{x})\\,\\cgreen{y} = c\\,(\\cblue{x}\\cgreen{y})
 = c\\,f(\\cblue{x}, \\cgreen{y}) .
\\end{aligned}`}),e.jsxs(i.p,{children:["Halten wir umgekehrt ",e.jsx(n,{children:"\\cblue{x}"}),` fest, läuft dieselbe Rechnung im zweiten
Argument:`]}),e.jsx(l,{children:`\\begin{aligned}
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
`,e.jsxs(X,{title:"Verdoppeln, einmal beide Seiten und einmal nur eine",children:[e.jsx(i.p,{children:"Welche der beiden Skalierungen verhält sich wie bei einer linearen Abbildung?"}),e.jsx(on,{}),e.jsxs(i.p,{children:[`Verdoppeln wir beide Seiten, passt das alte Rechteck viermal in das neue;
verdoppeln wir nur eine, passt es zweimal hinein. Das Zweifache ist die Linearität im einzelnen
Argument, das Vierfache `,e.jsx(n,{children:"\\cred{4} = 2^2"})," der Fall ",e.jsx(n,{children:"n = 2"})," der Regel ",e.jsx(n,{children:"\\cred{c^n}"}),`
aus `,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Weitere Beispiele"}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.1.4 (Skalarprodukte sind bilinear)",id:"env-skalarprodukte-sind-bilinear",children:[e.jsxs(i.p,{children:["Jedes ",e.jsx(t,{id:"dot-product",children:"Skalarprodukt"})," ",e.jsx(n,{children:"f\\colon V \\times V \\to \\R"}),`,
`,e.jsx(n,{children:"(\\bv_1, \\bv_2) \\mapsto \\inner{\\bv_1, \\bv_2}"}),`, ist bilinear. Im ersten Argument
rechnen wir`]}),e.jsx(l,{children:`\\inner{\\cblue{c\\bv + c'\\bv'}, \\cgreen{\\bw}}
= \\inner{\\cblue{c\\bv}, \\cgreen{\\bw}} + \\inner{\\cblue{c'\\bv'}, \\cgreen{\\bw}}
= c\\,\\inner{\\cblue{\\bv}, \\cgreen{\\bw}} + c'\\,\\inner{\\cblue{\\bv'}, \\cgreen{\\bw}} .`}),e.jsxs(i.p,{children:[`Der erste Schritt ist die Additivität, der zweite die Homogenität. Beide stehen
in der Definition des Skalarprodukts; für `,e.jsx(n,{children:"\\bx^\\top\\by = \\sum_i x_i y_i"}),` folgen
sie aus dem Distributivgesetz in `,e.jsx(n,{children:"\\R"}),`. Das zweite Argument braucht keine neue
Rechnung, denn die Symmetrie `,e.jsx(n,{children:"\\inner{\\bv, \\bw} = \\inner{\\bw, \\bv}"}),` vertauscht die
Rollen.`]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.1.5 (Matrizenmultiplikation als bilineare Abbildung)",id:"env-matrizenmultiplikation-als-bilineare",children:[e.jsxs(i.p,{children:["Die ",e.jsx(t,{id:"matrix-multiplication",children:"Matrizenmultiplikation"})]}),e.jsx(l,{children:`\\R^{m \\times k} \\times \\R^{k \\times n} \\to \\R^{m \\times n}, \\qquad
(\\cblue{\\bA}, \\cgreen{\\bB}) \\mapsto \\corange{\\bA\\bB} ,`}),e.jsx(i.p,{children:`ist bilinear. In beiden Argumenten folgt das aus dem Distributivgesetz für
Matrizen und der Verträglichkeit mit Skalaren:`}),e.jsx(l,{children:`(c\\,\\cblue{\\bA} + c'\\,\\cblue{\\bA'})\\,\\cgreen{\\bB}
= c\\,\\corange{\\bA\\bB} + c'\\,\\corange{\\bA'\\bB} ,
\\qquad
\\cblue{\\bA}\\,(c\\,\\cgreen{\\bB} + c'\\,\\cgreen{\\bB'})
= c\\,\\corange{\\bA\\bB} + c'\\,\\corange{\\bA\\bB'} .`}),e.jsxs(i.p,{children:["Linear ist auch sie nicht. Skalieren wir beide Faktoren mit ",e.jsx(n,{children:"c"}),`, so erhalten wir
`,e.jsx(n,{children:"(c\\cblue{\\bA})(c\\cgreen{\\bB}) = \\cred{c^2}\\,\\corange{\\bA\\bB}"}),`, wie es
`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"})," für ",e.jsx(n,{children:"n = 2"})," vorhersagt."]})]}),`
`,e.jsx(i.h3,{children:"Darstellung durch Koeffizienten"}),`
`,e.jsx(i.p,{children:`Sind die beteiligten Räume Koordinatenräume, lässt sich jede multilineare
Abbildung durch eine endliche Liste von Zahlen vollständig beschreiben.`}),`
`,e.jsxs(h,{kind:"Satz",label:"9.1.6 (Darstellung multilinearer Abbildungen)",id:"env-darstellung-multilinearer-abbildungen",children:[e.jsxs(i.p,{children:["Eine Abbildung ",e.jsx(n,{children:"T\\colon \\R^{n_1} \\times \\cdots \\times \\R^{n_k} \\to \\R^m"}),` ist
genau dann multilinear, wenn es reelle Koeffizienten`]}),e.jsx(l,{children:`A = \\bigl(\\corange{a_{i_1, \\dots, i_k, j}} \\colon
1 \\leq i_1 \\leq n_1, \\dots, 1 \\leq i_k \\leq n_k, 1 \\leq j \\leq m\\bigr)`}),e.jsx(i.p,{children:"gibt, sodass"}),e.jsx(Z,{tag:"9.1.1",id:"eq-darstellung-multilinearer-abbildungen",children:`T\\bigl(\\bx^{(1)}, \\dots, \\bx^{(k)}\\bigr)
= \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k} \\sum_{j = 1}^{m}
  \\corange{a_{i_1, \\dots, i_k, j}}\\;
  x^{(1)}_{i_1} \\cdots x^{(k)}_{i_k}\\; \\be_j`}),e.jsxs(i.p,{children:["gilt, wobei ",e.jsx(n,{children:"\\be_j"})," der ",e.jsx(n,{children:"j"}),"-te Einheitsvektor des ",e.jsx(n,{children:"\\R^m"}),` ist. Die Koeffizienten
`,e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"})," sind eindeutig bestimmt."]})]}),`
`,e.jsxs(i.p,{children:["Die Koeffizienten lassen sich ablesen: ",e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"}),` ist
die `,e.jsx(n,{children:"j"}),"-te Komponente von ",e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k}) \\in \\R^m"}),`. Diese Werte
legt `,e.jsx(n,{children:"T"}),` selbst fest, daher die Eindeutigkeit. Eine multilineare Abbildung ist
also dadurch bestimmt, was sie mit Tupeln von Einheitsvektoren macht.`]}),`
`,e.jsxs(q,{title:"Beweisskizze zum Darstellungssatz",children:[e.jsxs(i.p,{children:["Dass eine Abbildung der Gestalt ",e.jsx(i.a,{href:"#eq-darstellung-multilinearer-abbildungen",children:"(9.1.1)"}),` multilinear ist, ist Nachrechnen. In
jedem Summanden steht aus jedem Argument genau eine Koordinate als Faktor.
Ersetzen wir `,e.jsx(n,{children:"\\bx^{(l)}"})," durch ",e.jsx(n,{children:"c\\bx^{(l)} + c'\\by^{(l)}"}),`, so spaltet sich jeder
Summand entsprechend auf, und die rechte Seite ist in jedem Argument linear.`]}),e.jsxs(i.p,{children:[`Für die andere Richtung entwickeln wir jedes Argument in der Standardbasis
seines eigenen Raums,
`,e.jsx(n,{children:"\\bx^{(l)} = \\sum_{i_l} x^{(l)}_{i_l} \\be_{i_l}"})," mit ",e.jsx(n,{children:"\\be_{i_l} \\in \\R^{n_l}"}),`,
und ziehen die Summen nacheinander aus `,e.jsx(n,{children:"T"}),` heraus. Das erlaubt die
Multilinearität, und übrig bleibt`]}),e.jsx(l,{children:`T\\bigl(\\bx^{(1)}, \\dots, \\bx^{(k)}\\bigr)
= \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k}
  x^{(1)}_{i_1} \\cdots x^{(k)}_{i_k}\\;
  T\\bigl(\\be_{i_1}, \\dots, \\be_{i_k}\\bigr) .`}),e.jsxs(i.p,{children:["Der Vergleich mit ",e.jsx(i.a,{href:"#eq-darstellung-multilinearer-abbildungen",children:"(9.1.1)"}),` liefert die
Koeffizienten: Dort steht `,e.jsx(n,{children:"\\corange{a_{i_1, \\dots, i_k, j}}"}),` genau an der Stelle,
an der hier die `,e.jsx(n,{children:"j"}),"-te Komponente von ",e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k})"})," auftaucht."]})]}),`
`,e.jsxs(i.p,{children:["Es sind ",e.jsx(n,{children:"n_1 n_2 \\cdots n_k \\cdot m"}),` Koeffizienten. Die Flächenfunktion aus
`,e.jsx(i.a,{href:"#env-flaeche-eines-rechtecks",children:"Beispiel 9.1.3"})," (",e.jsx(n,{children:"k = 2"}),", ",e.jsx(n,{children:"n_1 = n_2 = m = 1"}),`) kommt mit der
einzigen Zahl `,e.jsx(n,{children:"a_{1,1,1} = 1"}),` aus, ein bilineares
`,e.jsx(n,{children:"T\\colon \\R^2 \\times \\R^2 \\to \\R"})," braucht schon ",e.jsx(n,{children:"2 \\cdot 2 \\cdot 1 = 4"}),`. Wie wir
diese Zahlen anordnen, ist das Thema von `,e.jsx(i.a,{href:"#sec-9.2",children:"Abschnitt 9.2"}),"."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(ne,{children:[e.jsxs(v,{wahr:!0,children:[e.jsx(i.p,{children:`Wenn im Rechteck-Widget eine Seite null ist, ist das Verhältnis der Flächen vor
und nach dem Verdoppeln nicht definiert.`}),e.jsxs(i.p,{children:["Das Widget zeigt dann zwei Flächen mit Wert null. Der Quotient wäre ",e.jsx(n,{children:"0/0"}),`;
darum entscheidet dieser Randfall nicht zwischen Linearität und Bilinearität.`]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Für jede multilineare Abbildung ",e.jsx(n,{children:"f"}),` gilt
`,e.jsx(n,{children:"f(\\bv_1, \\dots, \\bv_n) = \\bnull"}),", sobald ",e.jsx(n,{children:"\\bv_i = \\bnull"})," für ein ",e.jsx(n,{children:"i"})," ist."]}),e.jsxs(i.p,{children:["Die Homogenität im ",e.jsx(n,{children:"i"}),`-ten Argument
(`,e.jsx(t,{id:"env:multilineare-abbildung",href:"#env-multilineare-abbildung",children:"Definition 9.1.1"})," mit ",e.jsx(n,{children:"c' = 0"}),") liefert für ",e.jsx(n,{children:"c = 0"}),":"]}),e.jsx(l,{children:`f(\\bv_1, \\dots, \\bnull, \\dots, \\bv_n)
= f(\\bv_1, \\dots, 0 \\cdot \\bv_i, \\dots, \\bv_n)
= 0 \\cdot f(\\bv_1, \\dots, \\bv_i, \\dots, \\bv_n) = \\bnull .`}),e.jsx(i.p,{children:"Die Werte der übrigen Argumente spielen dabei keine Rolle."})]}),e.jsxs(v,{wahr:!1,children:[e.jsx(i.p,{children:"Jede bilineare Abbildung ist insbesondere linear."}),e.jsxs(i.p,{children:["Skalieren wir beide Argumente mit ",e.jsx(n,{children:"c"}),", so wird der Wert mit ",e.jsx(n,{children:"c^2"}),` multipliziert,
nicht mit `,e.jsx(n,{children:"c"})," (",e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),`). In
`,e.jsx(i.a,{href:"#env-flaeche-eines-rechtecks",children:"Beispiel 9.1.3"})," ist etwa ",e.jsx(n,{children:"f(2, 2) = 4"}),`, eine lineare Abbildung
müsste `,e.jsx(n,{children:"2\\,f(1, 1) = 2"}),` liefern. Bilinear und linear zugleich ist nur die
Nullabbildung, denn aus `,e.jsx(n,{children:"c^2 f(\\bv, \\bw) = c\\,f(\\bv, \\bw)"})," für alle ",e.jsx(n,{children:"c"}),` folgt
`,e.jsx(n,{children:"f(\\bv, \\bw) = \\bnull"}),"."]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Halten wir in einer multilinearen Abbildung alle Argumente bis auf das ",e.jsx(n,{children:"i"}),`-te
fest, so ist die verbleibende Abbildung `,e.jsx(n,{children:"V_i \\to W"})," linear."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(t,{id:"env:multilineare-abbildung",href:"#env-multilineare-abbildung",children:"Definition 9.1.1"})," in Worten, und zwar für jedes ",e.jsx(n,{children:"i"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:[`Zwei verschiedene Koeffizienten-Arrays können dieselbe multilineare Abbildung
`,e.jsx(n,{children:"T\\colon \\R^{n_1} \\times \\cdots \\times \\R^{n_k} \\to \\R^m"})," darstellen."]}),e.jsxs(i.p,{children:[e.jsx(t,{id:"env:darstellung-multilinearer-abbildungen",href:"#env-darstellung-multilinearer-abbildungen",children:"Satz 9.1.6"}),` sichert die Eindeutigkeit zu:
`,e.jsx(n,{children:"a_{i_1, \\dots, i_k, j}"})," ist die ",e.jsx(n,{children:"j"}),`-te Komponente von
`,e.jsx(n,{children:"T(\\be_{i_1}, \\dots, \\be_{i_k})"}),", also durch ",e.jsx(n,{children:"T"}),` festgelegt. Andere Koeffizienten
ergeben eine andere Abbildung.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §2.7 zu linearen Abbildungen und MML §3.2, wo bilineare
Abbildungen als Vorstufe des Skalarprodukts eingeführt werden.`})})]})}function xn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(De,{...r})}):De(r)}const{blau:Re,gruen:Me,rot:Ee,orange:C,grau:ue}=Q,Fe=[[[2,-1,4,0],[3,1,-2,5],[0,4,1,-3],[2,0,3,1]],[[1,4,-2,0],[3,-1,2,5],[3,3,3,3],[0,2,-3,1]],[[4,1,-2,0],[1,3,5,2],[-2,5,0,-3],[0,2,-3,1]],[[0,1,0,-1],[1,0,5,0],[0,-1,0,1],[1,0,-1,0]]],un=(r,i,s)=>(i*29+s*17+r*53)%256,be=r=>Array.from({length:8},(i,s)=>Array.from({length:8},(a,d)=>un(r,s,d)));function ln({matrix:r,farbe:i,x:s=0,y:a=0,groesse:d,intensiv:o=!1,onCellClick:c,aktiv:u}){const b=r.length,m=d/b;return e.jsx("g",{children:r.map((f,k)=>f.map((j,x)=>{const K=(u==null?void 0:u[0])===k&&(u==null?void 0:u[1])===x,z=o?.08+.82*(j/255):.18;return e.jsxs("g",{onClick:()=>c==null?void 0:c(k,x),style:c?{cursor:"pointer"}:void 0,children:[e.jsx("rect",{x:s+x*m,y:a+k*m,width:m,height:m,fill:i,fillOpacity:z,stroke:K?"var(--w-text)":"var(--w-border)",strokeWidth:K?1.8:.55}),e.jsx("text",{x:s+(x+.5)*m,y:a+(k+.62)*m,textAnchor:"middle",fontSize:b===8?8:11,fill:o&&j>155?"var(--w-bg)":"var(--w-text)",children:hn(j)})]},`${k}-${x}`)}))})}function bn(){const[r,i]=_.useState(1),[s,a]=_.useState({azimuth:38,elevation:25}),d=Fe[r-1],o=_.useMemo(()=>({f:(c,u)=>d[Math.min(3,Math.max(0,Math.floor(u)))][Math.min(3,Math.max(0,Math.floor(c)))],nx:20,ny:20,color:C,opacity:.78,wire:!0}),[d]);return e.jsxs("div",{children:[e.jsx(L,{children:"Wählen wir eine Scheibe und vergleichen wir ihre Matrixeinträge mit dem zugehörigen Höhenfeld."}),e.jsx("svg",{viewBox:"0 0 310 314",className:"max-w-full h-auto",role:"group","aria-label":`Aufgefächerter Stapel aus vier beschrifteten Matrixscheiben; Scheibe ${r} ist ausgewählt.`,children:[[1,20,26],[2,170,26],[3,20,174],[4,170,174]].map(([c,u,b])=>{const m=c===r;return e.jsxs("g",{onClick:()=>i(c),style:{cursor:"pointer"},children:[e.jsxs("text",{x:u,y:b-7,fill:m?C:"var(--w-muted)",fontSize:"12",children:["k = ",c]}),e.jsx("rect",{x:u,y:b,width:"120",height:"120",fill:"var(--w-bg)",stroke:m?C:ue,strokeWidth:m?3:1}),e.jsx(ln,{matrix:Fe[c-1],farbe:m?C:ue,x:u,y:b,groesse:120})]},c)})}),e.jsx("div",{className:"mt-3",children:e.jsx(nn,{size:300,xDomain:[0,4],yDomain:[0,4],zDomain:[-4,5],surface:o,azimuth:s.azimuth,elevation:s.elevation,onViewChange:a,labels:{x:"j",y:"i",z:`Tᵢⱼ${r}`},ariaLabel:`Höhenfeld der ausgewählten Matrixscheibe k gleich ${r}.`})}),e.jsx(R,{label:"Scheibe k",value:r,onChange:c=>i(Math.round(c)),min:1,max:4,step:1,accent:C,fmt:c=>String(Math.round(c))}),e.jsx(rn,{value:s,onChange:a}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-x-4 text-xs","aria-label":"Legende",children:[e.jsx("span",{style:{color:C},children:"Orange: gewählte Scheibe und ihr Höhenfeld"}),e.jsx("span",{style:{color:ue},children:"Grau: übrige Scheiben"})]}),e.jsx(O,{kind:r===1?"neutral":"ok",children:r===1?"Für k = 1 ist die Scheibe ohne besondere Struktur: Das Höhenfeld ist eine zerklüftete Treppe, jeder Eintrag ein Plateau.":r===2?"Die dritte Zeile dieser Scheibe ist konstant 3. Im Höhenfeld liegt dort ein waagerechtes Band auf Höhe 3 – der Index i ändert nichts mehr, sobald i = 3 ist.":r===3?"Diese Scheibe ist symmetrisch, Tᵢⱼ₃ = Tⱼᵢ₃. Das Höhenfeld ist deshalb spiegelbildlich zur Diagonalen i = j; Vertauschen der ersten beiden Indizes ändert nichts.":"Ein einziger Ausreißer T₂₃₄ = 5 ragt heraus, alle übrigen Einträge liegen zwischen −1 und 1: ein Turm auf flachem Feld. Der dritte Index wählt also nicht nur andere Zahlen, sondern eine andere Gestalt."})]})}function mn(){const[r,i]=_.useState(3),[s,a]=_.useState(4),d=[r,s],o=[be(0),be(1),be(2)],c=o.map(j=>j[r][s]),u=`rgb(${c.join(", ")})`,b=["Rot","Grün","Blau"],m=[Ee,Me,Re],f=(j,x)=>{i(j),a(x)},k=c.indexOf(Math.max(...c));return e.jsxs("div",{children:[e.jsx(L,{children:"Wählen wir denselben Pixel in einer Kanalscheibe – per Klick oder über die beiden Regler – und lesen wir ab, welche drei Zahlen seine Farbe zusammensetzen."}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-4",children:[o.map((j,x)=>e.jsx("div",{className:"min-w-0",children:e.jsxs("svg",{viewBox:"0 0 152 152",width:152,height:152,className:"h-auto w-full max-w-full",role:"group","aria-label":`${b[x]}-Kanal als 8 mal 8 Zahlentafel; gewählt ist Zeile ${r+1}, Spalte ${s+1} mit dem Wert ${c[x]}.`,children:[e.jsxs("text",{x:2,y:11,fill:m[x],fontSize:"11",children:[b[x],"-Kanal"]}),e.jsx(ln,{matrix:j,farbe:m[x],x:2,y:16,groesse:136,intensiv:!0,aktiv:d,onCellClick:f})]})},b[x])),e.jsx("div",{className:"min-w-0",children:e.jsxs("svg",{viewBox:"0 0 152 152",width:152,height:152,className:"h-auto w-full max-w-full",role:"img","aria-label":`Das zusammengesetzte RGB-Bild aus den drei Kanälen; der gewählte Pixel hat die Farbe ${u}.`,children:[e.jsx("text",{x:2,y:11,fill:"var(--w-text)",fontSize:"11",children:"RGB-Bild"}),Array.from({length:8},(j,x)=>Array.from({length:8},(K,z)=>{const y=o[0][x][z],g=o[1][x][z],S=o[2][x][z],V=r===x&&s===z;return e.jsx("rect",{x:2+z*17,y:16+x*17,width:"17",height:"17",fill:`rgb(${y}, ${g}, ${S})`,stroke:V?"var(--w-text)":"var(--w-border)",strokeWidth:V?1.8:.55},`${x}-${z}`)}))]})})]}),e.jsxs("div",{className:"mt-2 max-w-sm",children:[e.jsx(R,{label:"Zeile i",value:r+1,onChange:j=>i(Math.round(j)-1),min:1,max:8,step:1,accent:C,fmt:j=>String(Math.round(j))}),e.jsx(R,{label:"Spalte j",value:s+1,onChange:j=>a(Math.round(j)-1),min:1,max:8,step:1,accent:C,fmt:j=>String(Math.round(j))})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-x-4 text-xs","aria-label":"Legende",children:[e.jsx("span",{style:{color:Ee},children:"Rot: Intensität des Rotanteils"}),e.jsx("span",{style:{color:Me},children:"Grün: Intensität des Grünanteils"}),e.jsx("span",{style:{color:Re},children:"Blau: Intensität des Blauanteils"})]}),e.jsx(O,{kind:"ok",children:`Pixel (${r+1}, ${s+1}) – Zeile, dann Spalte, wie bei Iᵢⱼₖ – entsteht aus (${c.join(", ")}) und ergibt ${u}. Der ${b[k]}-Kanal ist hier mit ${c[k]} der größte; er ist es nicht überall, denn jeder Kanal hat sein eigenes Muster mit eigener Steigung in i und j.`})]})}function Ve({bild:r=!1}){return r?e.jsx(mn,{}):e.jsx(bn,{})}const jn=""+new URL("vgg16-block3-feature-maps-B7P7GdzF.png",import.meta.url).href;function Te(r){const i={a:"a",em:"em",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Der Darstellungssatz (",e.jsx(t,{id:"env:darstellung-multilinearer-abbildungen",href:"#env-darstellung-multilinearer-abbildungen",children:"Satz 9.1.6"}),`) führt jede
`,e.jsx(t,{id:"env:multilineare-abbildung",children:"multilineare Abbildung"}),` auf eine Liste von Zahlen zurück. Um diese Liste geht es
im Rest des Kapitels. Wir beginnen mit dem einfachsten Fall.`]}),`
`,e.jsx(i.h3,{children:"Der Fall k = 1 liefert die Matrix"}),`
`,e.jsxs(i.p,{children:["Setzen wir im Darstellungssatz ",e.jsx(n,{children:"k = 1"}),". Dann hat ",e.jsx(n,{children:"T"}),` nur ein Argument, ist also
eine gewöhnliche `,e.jsx(t,{id:"linear-map",children:"lineare Abbildung"})," ",e.jsx(n,{children:"T\\colon \\R^{n} \\to \\R^{m}"}),`,
und von der langen Indexliste bleiben zwei Indizes übrig,
`,e.jsx(n,{children:"1 \\le i \\le n"})," und ",e.jsx(n,{children:"1 \\le j \\le m"}),":"]}),`
`,e.jsx(Z,{tag:"9.2.1",id:"eq-eq-9-2-1",children:"T(\\cblue{\\bx}) = \\sum_{i = 1}^{n} \\sum_{j = 1}^{m} \\corange{a_{i,j}}\\, \\cblue{x_i}\\, \\be_j ."}),`
`,e.jsxs(i.p,{children:["Der Faktor ",e.jsx(n,{children:"\\cblue{x_i}"})," hängt nicht von ",e.jsx(n,{children:"j"}),` ab und darf vor die innere Summe.
Übrig bleibt ein fester Vektor des `,e.jsx(n,{children:"\\R^m"}),", der nur noch von ",e.jsx(n,{children:"i"})," abhängt:"]}),`
`,e.jsx(l,{children:`\\corange{\\ba_i} := \\sum_{j = 1}^{m} \\corange{a_{i,j}}\\, \\be_j
= \\begin{pmatrix} \\corange{a_{i,1}} \\\\ \\vdots \\\\ \\corange{a_{i,m}} \\end{pmatrix} \\in \\R^m ,
\\qquad\\text{also}\\qquad
T(\\cblue{\\bx}) = \\sum_{i = 1}^{n} \\cblue{x_i}\\, \\corange{\\ba_i} .`}),`
`,e.jsxs(i.p,{children:["Stellen wir die ",e.jsx(n,{children:"\\corange{\\ba_i}"}),` als Spalten nebeneinander, so ist diese
gewichtete Summe das `,e.jsx(t,{id:"matrix-vector-product",children:"Matrix-Vektor-Produkt"}),`: Mit
`,e.jsx(n,{children:"\\corange{\\bA} = (\\corange{\\ba_1} \\mid \\cdots \\mid \\corange{\\ba_n}) \\in \\R^{m \\times n}"}),`
gilt`]}),`
`,e.jsx(l,{children:"T(\\cblue{\\bx}) = \\corange{\\bA}\\,\\cblue{\\bx} ."}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k = 1"}),` liefert der Darstellungssatz also die vertraute Tatsache, dass sich
jede lineare Abbildung `,e.jsx(n,{children:"\\R^n \\to \\R^m"})," als ",e.jsx(t,{id:"matrix",children:"Matrix"})," schreiben lässt."]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.2.1 (Von der Koeffizientenfamilie zur Matrix)",id:"env-von-der-koeffizientenfamilie-zur-matrix",children:[e.jsxs(i.p,{children:[`Im Darstellungssatz steht der Eingangsindex vorn und der Ausgangsindex hinten:
In `,e.jsx(n,{children:"\\corange{a_{i,j}}"})," gehört ",e.jsx(n,{children:"i"})," zur Komponente von ",e.jsx(n,{children:"\\cblue{\\bx}"})," und ",e.jsx(n,{children:"j"}),` zur
Komponente des Bildvektors. In der Matrix `,e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` ist
es umgekehrt, der Ausgangsindex ist der Zeilenindex:`]}),e.jsx(l,{children:"(\\corange{\\bA})_{j,i} = \\corange{a_{i,j}} ."}),e.jsxs(i.p,{children:["Nur so passt das Produkt ",e.jsx(n,{children:"\\corange{\\bA}\\,\\cblue{\\bx}"}),` zusammen, denn
`,e.jsx(n,{children:"\\cblue{\\bx}"})," hat ",e.jsx(n,{children:"n"})," Komponenten und ",e.jsx(n,{children:"\\corange{\\bA}"})," braucht dafür ",e.jsx(n,{children:"n"}),` Spalten.
Wer die Familie unbesehen als Matrix liest, erhält `,e.jsx(n,{children:"\\corange{\\bA}^\\top"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Ansammlung der ",e.jsx(n,{children:"nm"}),` Koeffizienten nennen wir eine Matrix. Sie hat zwei
Indexpositionen, deshalb sprechen wir von zwei „Dimensionen" (zu den
Anführungszeichen siehe `,e.jsx(i.a,{href:"#env-stufe-und-dimension-sind-zwei",children:"Bemerkung 9.2.6"}),`). Allgemein
gehört zu jedem `,e.jsx(n,{children:"k"})," eine Ansammlung von Koeffizienten mit ",e.jsx(n,{children:"k + 1"}),` Indizes, bei
`,e.jsx(n,{children:"m = 1"})," also mit ",e.jsx(n,{children:"k"}),`, und jede solche Ansammlung beschreibt umgekehrt eine
multilineare Abbildung.`]}),`
`,e.jsx(i.h3,{children:"Ein bilineares Beispiel"}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.2.2 (Eine bilineare Abbildung auf R2 mal R2)",id:"env-eine-bilineare-abbildung-auf-r2-mal-r2",children:[e.jsxs(i.p,{children:["Wir betrachten ",e.jsx(n,{children:"T\\colon \\R^2 \\times \\R^2 \\to \\R"})," mit"]}),e.jsx(l,{children:`T(\\cblue{\\bx}, \\cgreen{\\by}) = 2\\cblue{x_1}\\cgreen{y_1} + 3\\cblue{x_1}\\cgreen{y_2}
- \\cblue{x_2}\\cgreen{y_1} + 4\\cblue{x_2}\\cgreen{y_2} .`}),e.jsxs(i.p,{children:["Hier ist ",e.jsx(n,{children:"k = 2"}),", ",e.jsx(n,{children:"n_1 = n_2 = 2"})," und ",e.jsx(n,{children:"m = 1"}),". Wegen ",e.jsx(n,{children:"m = 1"})," ist ",e.jsx(n,{children:"\\be_1 = 1"}),`
die Zahl Eins, und wir lassen den Ausgangsindex weg. Die vier Koeffizienten
`,e.jsx(n,{children:"\\corange{a_{i_1, i_2}}"})," lesen wir direkt ab:"]}),e.jsx(l,{children:`\\corange{a_{1,1}} = 2, \\quad \\corange{a_{1,2}} = 3, \\quad
\\corange{a_{2,1}} = -1, \\quad \\corange{a_{2,2}} = 4
\\qquad\\Longrightarrow\\qquad
\\corange{\\bA} = \\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Probe."})," Die Darstellungsformel für ",e.jsx(n,{children:"k = 2"})," und ",e.jsx(n,{children:"m = 1"})," lautet"]}),e.jsx(l,{children:`\\begin{aligned}
T(\\cblue{\\bx}, \\cgreen{\\by})
&= \\sum_{i_1 = 1}^{2} \\sum_{i_2 = 1}^{2} \\corange{a_{i_1, i_2}}\\, \\cblue{x_{i_1}}\\, \\cgreen{y_{i_2}} \\\\
&= \\corange{a_{1,1}}\\cblue{x_1}\\cgreen{y_1} + \\corange{a_{1,2}}\\cblue{x_1}\\cgreen{y_2}
 + \\corange{a_{2,1}}\\cblue{x_2}\\cgreen{y_1} + \\corange{a_{2,2}}\\cblue{x_2}\\cgreen{y_2} \\\\
&= 2\\cblue{x_1}\\cgreen{y_1} + 3\\cblue{x_1}\\cgreen{y_2}
 - \\cblue{x_2}\\cgreen{y_1} + 4\\cblue{x_2}\\cgreen{y_2} ,
\\end{aligned}`}),e.jsxs(i.p,{children:[`also wieder die Abbildung, von der wir ausgegangen sind. Eine Frage nach der
Indexreihenfolge wie in `,e.jsx(i.a,{href:"#env-von-der-koeffizientenfamilie-zur-matrix",children:"Bemerkung 9.2.1"}),` stellt
sich hier nicht: `,e.jsx(n,{children:"i_1"})," und ",e.jsx(n,{children:"i_2"})," sind beide Eingangsindizes."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Numerisch."})," Für ",e.jsx(n,{children:"\\cblue{\\bx} = (1, 2)^\\top"})," und ",e.jsx(n,{children:"\\cgreen{\\by} = (3, 4)^\\top"}),`
ist`]}),e.jsx(l,{children:`T(\\cblue{\\bx}, \\cgreen{\\by})
= 2 \\cdot 1 \\cdot 3 + 3 \\cdot 1 \\cdot 4 - 1 \\cdot 2 \\cdot 3 + 4 \\cdot 2 \\cdot 4
= 6 + 12 - 6 + 32 = 44 .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"In Matrixschreibweise."}),` Die Doppelsumme ist ausgeschrieben der Ausdruck
`,e.jsx(n,{children:"\\cblue{\\bx}^\\top \\corange{\\bA}\\, \\cgreen{\\by}"}),":"]}),e.jsx(l,{children:`T(\\cblue{\\bx}, \\cgreen{\\by})
= \\cblue{\\begin{pmatrix} 1 & 2 \\end{pmatrix}}
  \\corange{\\begin{pmatrix} 2 & 3 \\\\ -1 & 4 \\end{pmatrix}}
  \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}
= \\begin{pmatrix} 0 & 11 \\end{pmatrix} \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}
= 0 \\cdot 3 + 11 \\cdot 4 = 44 .`}),e.jsxs(i.p,{children:["Eine bilineare Abbildung mit Werten in ",e.jsx(n,{children:"\\R"})," heißt ",e.jsx(i.em,{children:"Bilinearform"}),`. Setzen wir
beide Argumente gleich, entsteht aus ihr die
`,e.jsx(t,{id:"quadratic-form",children:"quadratische Form"}),`
`,e.jsx(n,{children:"\\cblue{\\bx} \\mapsto \\cblue{\\bx}^\\top \\corange{\\bA}\\, \\cblue{\\bx}"}),` mit nur noch
einem Argument.`]})]}),`
`,e.jsx(i.h3,{children:"Tensoren"}),`
`,e.jsxs(h,{kind:"Definition",label:"9.2.3 (Tensor)",id:"env-tensor",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n_1, \\dots, n_k \\in \\N"}),". Ein ",e.jsx(i.em,{children:"Tensor"})," (tensor) der ",e.jsx(i.em,{children:"Stufe"})," ",e.jsx(n,{children:"k"}),` und des
Formats `,e.jsx(n,{children:"n_1 \\times \\cdots \\times n_k"})," ist eine durch ",e.jsx(n,{children:"k"}),` Indizes indizierte
Familie reeller Zahlen`]}),e.jsx(l,{children:`A = \\bigl(a_{i_1, \\dots, i_k}\\bigr)_{1 \\le i_1 \\le n_1, \\; \\dots, \\; 1 \\le i_k \\le n_k}
\\in \\R^{n_1 \\times \\cdots \\times n_k} ,`}),e.jsxs(i.p,{children:["also eine Abbildung, die jedem Indextupel ",e.jsx(n,{children:"(i_1, \\dots, i_k)"}),` aus
`,e.jsx(n,{children:"\\{1, \\dots, n_1\\} \\times \\cdots \\times \\{1, \\dots, n_k\\}"}),` genau eine reelle Zahl
`,e.jsx(n,{children:"a_{i_1, \\dots, i_k}"})," zuordnet."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.2.4 (Stufe und Anordnung der Einträge)",id:"env-stufe-und-warum-eine-menge-es-nicht-tut",children:[e.jsx(i.p,{children:"Die Stufe zählt Indexpositionen, nicht Einträge. Die ersten Fälle kennen wir:"}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsxs(i.th,{children:["Stufe ",e.jsx(n,{children:"k"})]}),e.jsx(i.th,{children:"Objekt"}),e.jsx(i.th,{children:"Format"}),e.jsx(i.th,{children:"Einträge"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"0"})}),e.jsx(i.td,{children:e.jsx(t,{id:"scalar",children:"Skalar"})}),e.jsx(i.td,{}),e.jsx(i.td,{children:e.jsx(n,{children:"1"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"1"})}),e.jsx(i.td,{children:e.jsx(t,{id:"vector",children:"Vektor"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"2"})}),e.jsx(i.td,{children:e.jsx(t,{id:"matrix",children:"Matrix"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 \\times n_2"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 n_2"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"3"})}),e.jsx(i.td,{children:"Stapel von Matrizen"}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 \\times n_2 \\times n_3"})}),e.jsx(i.td,{children:e.jsx(n,{children:"n_1 n_2 n_3"})})]})]})]}),e.jsxs(i.p,{children:[`Die gelegentlich zu lesende Umschreibung „geordnete Menge" reeller Zahlen ist
ungenau, denn eine Menge kennt weder Reihenfolge noch Vielfachheit:
`,e.jsx(n,{children:"\\{1, 1, 2\\} = \\{2, 1\\}"}),`. Es kommt auf die Zuordnung an: Zu jedem Indextupel
gehört genau eine Zahl. Derselbe Zahlenvorrat, anders angeordnet, ergibt einen
anderen Tensor.`]})]}),`
`,e.jsx(i.p,{children:`Tensoren desselben Formats addieren wir und strecken sie mit Zahlen, Eintrag für
Eintrag wie bei Vektoren und Matrizen.`}),`
`,e.jsxs(h,{kind:"Satz",label:"9.2.5 (Der Raum aller Tensoren eines Formats)",id:"env-der-raum-aller-tensoren-eines-formats",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"n_1, \\dots, n_k \\in \\N"})," fest. Mit der eintragsweisen Addition"]}),e.jsx(l,{children:"(A + B)_{i_1, \\dots, i_k} = a_{i_1, \\dots, i_k} + b_{i_1, \\dots, i_k}"}),e.jsxs(i.p,{children:[`und der eintragsweisen Multiplikation mit Skalaren
`,e.jsx(n,{children:"(cA)_{i_1, \\dots, i_k} = c\\, a_{i_1, \\dots, i_k}"}),` ist
`,e.jsx(n,{children:"\\R^{n_1 \\times \\cdots \\times n_k}"})," ein ",e.jsx(t,{id:"vector-space",children:"Vektorraum"}),` über
`,e.jsx(n,{children:"\\R"}),". Eine ",e.jsx(t,{id:"basis",children:"Basis"})," bilden die ",e.jsx(i.em,{children:"Einheitstensoren"}),`
`,e.jsx(n,{children:"\\bE^{(i_1, \\dots, i_k)}"}),", die an der Stelle ",e.jsx(n,{children:"(i_1, \\dots, i_k)"})," eine ",e.jsx(n,{children:"1"}),` und
sonst überall `,e.jsx(n,{children:"0"})," haben. Die ",e.jsx(t,{id:"dimension",children:"Dimension"}),` ist deshalb
`,e.jsx(n,{children:"n_1 n_2 \\cdots n_k"}),"."]})]}),`
`,e.jsx(q,{title:"Warum Tensoren eines festen Formats einen Vektorraum bilden",children:e.jsxs(ie,{children:[e.jsx(T,{why:e.jsxs(e.Fragment,{children:["Assoziativität, Kommutativität und die Distributivgesetze gelten in ",e.jsx(n,{children:"\\R"}),"; sie übertragen sich Stelle für Stelle, etwa ",e.jsx(n,{children:"\\bigl(c(A + B)\\bigr)_{i_1, \\dots, i_k} = c\\,a_{i_1, \\dots, i_k} + c\\,b_{i_1, \\dots, i_k} = (cA + cB)_{i_1, \\dots, i_k}"})]}),children:e.jsxs(i.p,{children:[`Jedes Vektorraumaxiom ist eine Gleichung zwischen Tensoren, und zwei Tensoren
sind genau dann gleich, wenn sie an jeder Indexstelle übereinstimmen. Beide
Verknüpfungen wirken eintragsweise, also bleibt an jeder Indexstelle eine
Gleichung zwischen reellen Zahlen stehen. Neutrales Element ist der Nulltensor,
das Negative von `,e.jsx(n,{children:"A"})," der Tensor mit den Einträgen ",e.jsx(n,{children:"-a_{i_1, \\dots, i_k}"}),"."]})}),e.jsxs(T,{why:e.jsx(e.Fragment,{children:"eindeutige Darstellbarkeit ist genau die Basiseigenschaft: Existenz gibt das Erzeugendensystem, Eindeutigkeit die lineare Unabhängigkeit"}),children:[e.jsx(i.p,{children:"Zur Basis: Jeder Tensor schreibt sich als"}),e.jsx(l,{children:`A = \\sum_{i_1 = 1}^{n_1} \\cdots \\sum_{i_k = 1}^{n_k}
a_{i_1, \\dots, i_k}\\, \\bE^{(i_1, \\dots, i_k)} ,`}),e.jsxs(i.p,{children:["und die Koeffizienten dieser Darstellung sind die Einträge von ",e.jsx(n,{children:"A"}),`, also
eindeutig. Die `,e.jsx(n,{children:"\\bE^{(i_1, \\dots, i_k)}"}),` erzeugen den Raum somit und sind
`,e.jsx(t,{id:"linear-independence",children:"linear unabhängig"}),`. Ihre Anzahl ist die Zahl der
Indextupel, und die ist `,e.jsx(n,{children:"n_1 n_2 \\cdots n_k"}),"."]})]})]})}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.2.6 (Stufe und Dimension sind zwei verschiedene Zahlen)",id:"env-stufe-und-dimension-sind-zwei",children:[e.jsxs(i.p,{children:["Eine ",e.jsx(n,{children:"4 \\times 4"}),"-Matrix hat die Stufe ",e.jsx(n,{children:"2"}),", aber ",e.jsx(n,{children:"\\R^{4 \\times 4}"}),` hat nach
`,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"})," die Dimension ",e.jsx(n,{children:"4^2 = 16"}),`. Ein Tensor des Formats
`,e.jsx(n,{children:"4 \\times 4 \\times 4"})," hat die Stufe ",e.jsx(n,{children:"3"}),`, und der zugehörige Raum die Dimension
`,e.jsx(n,{children:"4^3 = 64"}),`. Wer die Indexpositionen „Dimensionen" nennt, meint also etwas
anderes als die Dimension des Vektorraums. Im maschinellen Lernen heißen die
Indexpositionen meist `,e.jsx(i.em,{children:"Achsen"})," (axes), was die Verwechslung vermeidet."]}),e.jsxs(i.p,{children:[`Zählen wir die Indextupel in einer festen Reihenfolge durch, wird aus jedem
Tensor ein Vektor im `,e.jsx(n,{children:"\\R^{n_1 n_2 \\cdots n_k}"}),`; Programmbibliotheken nennen das
`,e.jsx(i.em,{children:"reshape"})," oder ",e.jsx(i.em,{children:"flatten"}),`. Zählen wir bei einer Matrix Spalte für Spalte, ist das
die Vektorisierung aus `,e.jsx(i.a,{href:"#sec-9.5",children:"Abschnitt 9.5"}),"."]})]}),`
`,e.jsxs(X,{title:"Ein Stufe-3-Tensor, Scheibe für Scheibe",children:[e.jsxs(i.p,{children:["Was bleibt von einem Stufe-3-Tensor übrig, wenn wir die dritte Indexposition ",e.jsx(n,{children:"k"})," festhalten?"]}),e.jsx(Ve,{}),e.jsxs(i.p,{children:["Jede Wahl von ",e.jsx(n,{children:"k"})," liefert eine vollständige Matrix, eine ",e.jsx(i.em,{children:"Scheibe"}),` (slice) des
Tensors. Der Tensor ist der Stapel dieser Scheiben.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendungen: Bilder, Stapel, Feature-Maps"}),`
`,e.jsxs(i.p,{children:[`Ein Graustufenbild hält je Bildpunkt eine Zahl fest und ist damit eine Matrix:
Eine Indexposition läuft über die Höhe, die andere über die Breite. Ein Farbbild
braucht drei Zahlen je Pixel, eine je Farbkanal, und wird bei `,e.jsx(n,{children:"224 \\times 224"}),`
Pixeln zu einem Tensor der Stufe `,e.jsx(n,{children:"3"}),", ",e.jsx(n,{children:"\\bI \\in \\R^{224 \\times 224 \\times 3}"}),`, mit
`,e.jsx(n,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528"}),` Zahlen. Neuronale Netze verarbeiten Bilder
stapelweise, etwa `,e.jsx(n,{children:"32"}),` auf einmal. Der Stapel
`,e.jsx(n,{children:"\\bB \\in \\R^{32 \\times 224 \\times 224 \\times 3}"})," ist ein Tensor der Stufe ",e.jsx(n,{children:"4"}),`
mit rund `,e.jsx(n,{children:"4{,}8 \\cdot 10^6"}),` Zahlen; bei einem Video zählt dieselbe vierte
Indexposition die Einzelbilder. Eine Faltungsschicht (convolutional layer) bildet
Tensoren auf Tensoren ab, etwa
`,e.jsx(n,{children:"c\\colon \\R^{32 \\times 224 \\times 224 \\times 3} \\to \\R^{32 \\times 56 \\times 56 \\times 64}"}),`,
mit `,e.jsx(n,{children:"64"})," Merkmalskanälen (",e.jsx(i.em,{children:"Feature-Maps"}),") statt der drei Farbkanäle."]}),`
`,e.jsx(i.p,{children:`Solche Rechnungen bestehen aus sehr vielen gleichartigen Multiplikationen und
Additionen auf regelmäßig angeordneten Zahlen. Spezialisierte Rechenwerke wie
Googles TPUs und NVIDIAs Tensor Cores führen sie blockweise aus; für das
maschinelle Lernen ist diese Hardware eine Voraussetzung.`}),`
`,e.jsxs(X,{title:"Farbbild als Kanäle",children:[e.jsx(i.p,{children:"Wie setzen sich die drei Zahlen eines Pixels zu seiner sichtbaren Farbe zusammen?"}),e.jsx(Ve,{bild:!0}),e.jsx(i.p,{children:`Die drei Kanalscheiben sind keine drei Bilder, sondern die drei Komponenten
jedes Pixels ein und desselben Bildes.`})]}),`
`,e.jsxs(q,{title:"Bilder, Stapel und Feature-Maps im Detail",children:[e.jsxs(h,{kind:"Beispiel",label:"9.2.7 (Ein Farbbild als Tensor der Stufe 3)",id:"env-ein-farbbild-als-tensor-der-stufe-3",children:[e.jsxs(i.p,{children:["Beim Farbbild ",e.jsx(n,{children:"\\bI \\in \\R^{224 \\times 224 \\times 3}"}),` nummeriert der dritte
Index die Kanäle:`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,1}"}),": Rot-Intensität an der Position ",e.jsx(n,{children:"(i,j)"}),", ein Wert zwischen ",e.jsx(n,{children:"0"}),`
und `,e.jsx(n,{children:"255"}),","]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,2}"}),": Grün-Intensität an derselben Position,"]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bI_{i,j,3}"}),": Blau-Intensität an derselben Position."]}),`
`]}),e.jsx(i.p,{children:"Das sind"}),e.jsx(l,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528 \\approx 150 \\cdot 10^{3}"}),e.jsx(i.p,{children:`Zahlen für ein einziges Bild. Welche Indexposition wofür steht, ist
Verabredung, und die Verabredungen gehen auseinander: Manche Bibliothek stellt
den Kanalindex nach vorn, manche lässt ihn hinten, und auch die Reihenfolge von
Zeile und Spalte ist nicht überall gleich. Für die Mathematik ist das
gleichgültig, für den Code nicht.`})]}),e.jsxs(h,{kind:"Beispiel",label:"9.2.8 (Ein Stapel Bilder als Tensor der Stufe 4)",id:"env-ein-stapel-bilder-als-tensor-der-stufe-4",children:[e.jsxs(i.p,{children:[`Ein faltendes Netz (convolutional neural network, CNN) bekommt typischerweise
`,e.jsx(n,{children:"32"})," Bilder auf einmal vorgesetzt, also"]}),e.jsx(l,{children:"\\bB \\in \\R^{32 \\times 224 \\times 224 \\times 3} ,"}),e.jsxs(i.p,{children:[`wobei die vier Indexpositionen der Reihe nach die Nummer des Bildes im Stapel
(`,e.jsx(i.em,{children:"Batch-Größe"}),`), die Höhe, die Breite und den Farbkanal angeben. Nachgezählt sind
das`]}),e.jsx(l,{children:"32 \\cdot 224 \\cdot 224 \\cdot 3 = 4\\,816\\,896 \\approx 4{,}8 \\cdot 10^{6}"}),e.jsxs(i.p,{children:["Zahlen. Bei einfacher Genauigkeit mit ",e.jsx(n,{children:"4"}),` Byte je Zahl belegt allein die Eingabe
eines einzigen Rechenschritts damit rund `,e.jsx(n,{children:"19"}),` Millionen Byte. Ob die vierte
Indexposition die Bilder eines Stapels oder die eines Videos in der Zeit zählt,
sieht man ihr nicht an; wir müssen es dazusagen.`]})]}),e.jsxs(h,{kind:"Beispiel",label:"9.2.9 (Feature-Maps: eine Abbildung von Tensoren auf Tensoren)",id:"env-feature-maps-eine-abbildung-von-tensoren",children:[e.jsx(i.p,{children:`Eine Faltungsschicht (convolutional layer) eines CNN bildet Tensoren auf Tensoren
ab, etwa`}),e.jsx(l,{children:"c \\colon \\R^{32 \\times 224 \\times 224 \\times 3} \\to \\R^{32 \\times 56 \\times 56 \\times 64} ."}),e.jsxs(i.p,{children:["Sie senkt die räumliche Auflösung von ",e.jsx(n,{children:"224 \\times 224"})," auf ",e.jsx(n,{children:"56 \\times 56"}),` und
erhöht dabei die Zahl der Kanäle von `,e.jsx(n,{children:"3"})," auf ",e.jsx(n,{children:"64"}),`. Diese Kanäle stehen jetzt
nicht mehr für Farben, sondern für Merkmale (features): Jede der `,e.jsx(n,{children:"64"}),` Ebenen hält
für jede Position fest, wie stark ein bestimmtes lokales Muster dort anspricht,
und heißt deshalb `,e.jsx(i.em,{children:"Feature-Map"}),"."]}),e.jsx(i.p,{children:"Kleiner wird der Tensor dabei nicht:"}),e.jsx(l,{children:"32 \\cdot 56 \\cdot 56 \\cdot 64 = 6\\,422\\,528 \\approx 6{,}4 \\cdot 10^{6} ,"}),e.jsxs(i.p,{children:["also mehr als die ",e.jsx(n,{children:"4\\,816\\,896"}),` Einträge des Eingangs. Die Auflösung fällt zwar
um den Faktor `,e.jsx(n,{children:"16"}),", die Kanalzahl wächst aber um den Faktor ",e.jsx(n,{children:"64/3"}),`, und
`,e.jsx(n,{children:"\\tfrac{64}{3 \\cdot 16} = \\tfrac{4}{3}"}),`. Das Bild unten zeigt Feature-Maps aus
Block 3 des VGG16-Modells: Jede einzelne sieht aus wie ein grobes
Graustufenbild, hell an den Stellen, an denen das jeweilige Muster kräftig
anspricht.`]}),e.jsxs("figure",{className:"mx-auto my-4 max-w-2xl",children:[e.jsx("img",{src:jn,alt:"Raster aus 64 ausgewählten Feature-Maps des dritten VGG16-Blocks. In den dunklen Graustufenbildern zeichnen helle Bereiche unterschiedliche Strukturen des Eingabebildes nach.",className:"h-auto w-full rounded-md border border-slate-200 bg-white"}),e.jsx("figcaption",{className:"mt-2 text-center text-sm text-slate-600 dark:text-slate-400",children:e.jsxs(i.p,{children:[`64 ausgewählte Feature-Maps aus Block 3 von VGG16 für dasselbe Eingabebild.
Der Block erzeugt insgesamt 256 Kanäle. Quelle: `,e.jsx("a",{href:"https://machinelearningmastery.com/how-to-visualize-filters-and-feature-maps-in-convolutional-neural-networks/",children:"Machine Learning Mastery"}),"."]})})]})]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Was an einer Faltungsschicht linear ist."})," Die Abbildung ",e.jsx(n,{children:"c"}),` hat nur ein
Argument, ist also keine multilineare Abbildung im Sinn von `,e.jsx(i.a,{href:"#sec-9.1",children:"Abschnitt 9.1"}),`. Bei
fest gewählten Gewichten ist sie linear im Eingangstensor. Nehmen wir die
Gewichte als zweites Argument hinzu, so ist jeder Ausgangseintrag eine Summe von
Produkten aus je einem Gewicht und je einem Eingangseintrag, die Zuordnung
`,e.jsx(n,{children:"(\\text{Gewichte}, \\text{Eingang}) \\mapsto \\text{Ausgang}"}),` ist damit bilinear,
also der Fall `,e.jsx(n,{children:"k = 2"}),` des Darstellungssatzes. Zu einer vollständigen Schicht
gehören meist noch ein additiver Term und eine nichtlineare Funktion, die auf
jeden Eintrag einzeln wirkt. Erst diese Funktion macht aus einem
`,e.jsx(t,{id:"neural-network",children:"neuronalen Netz"}),` mehr als eine lange Kette linearer
Abbildungen.`]}),e.jsxs(ne,{children:[e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Ein Farbbild mit ",e.jsx(n,{children:"224 \\times 224"}),` Pixeln und drei Farbkanälen ist ein Tensor der
Stufe `,e.jsx(n,{children:"3"})," mit ",e.jsx(n,{children:"150\\,528"})," Einträgen."]}),e.jsxs(i.p,{children:["Es ist ",e.jsx(n,{children:"224 \\cdot 224 \\cdot 3 = 150\\,528"}),", also rund ",e.jsx(n,{children:"150 \\cdot 10^3"}),` Zahlen
(`,e.jsx(i.a,{href:"#env-ein-farbbild-als-tensor-der-stufe-3",children:"Beispiel 9.2.7"}),`). Die drei Indexpositionen sind die beiden Pixelrichtungen und
der Farbkanal; in welcher Reihenfolge sie stehen, ist Verabredung und von
Bibliothek zu Bibliothek verschieden.`]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:[`Weil die Faltungsschicht
`,e.jsx(n,{children:"c \\colon \\R^{32 \\times 224 \\times 224 \\times 3} \\to \\R^{32 \\times 56 \\times 56 \\times 64}"}),`
die Auflösung von `,e.jsx(n,{children:"224 \\times 224"})," auf ",e.jsx(n,{children:"56 \\times 56"}),` senkt, hat ihr Ausgang
weniger Einträge als ihr Eingang.`]}),e.jsxs(i.p,{children:["Nachgezählt: ",e.jsx(n,{children:"32 \\cdot 224 \\cdot 224 \\cdot 3 = 4\\,816\\,896"}),` gegen
`,e.jsx(n,{children:"32 \\cdot 56 \\cdot 56 \\cdot 64 = 6\\,422\\,528"}),`. Die Auflösung fällt um den Faktor
`,e.jsx(n,{children:"16"}),", die Kanalzahl wächst um den Faktor ",e.jsx(n,{children:"64/3"}),`, zusammen wächst die Zahl der
Einträge um den Faktor `,e.jsx(n,{children:"4/3"})," (",e.jsx(i.a,{href:"#env-feature-maps-eine-abbildung-von-tensoren",children:"Beispiel 9.2.9"}),")."]})]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(ne,{children:[e.jsxs(sn,{loesung:64,toleranz:0,children:[e.jsxs(i.p,{children:[`Wie viele Einträge zeigt der Zahlen-Stapel des Widgets bei vier Scheiben einer
`,e.jsx(n,{children:"4\\times4"}),"-Matrix?"]}),e.jsx(i.p,{children:`Die zusätzliche Indexposition multipliziert die Zahl der Einträge mit der Zahl
der Scheiben.`})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Setzen wir im Darstellungssatz ",e.jsx(n,{children:"k = 1"}),`, so ist die Koeffizientenansammlung eine
Matrix `,e.jsx(n,{children:"\\bA"}),", und es gilt ",e.jsx(n,{children:"T(\\bx) = \\bA\\bx"}),"."]}),e.jsxs(i.p,{children:["Das ist die Rechnung zu ",e.jsx(i.a,{href:"#eq-eq-9-2-1",children:"(9.2.1)"}),": Die innere Summe ",e.jsx(n,{children:"\\sum_j a_{i,j}\\be_j"}),` ist ein
fester Vektor `,e.jsx(n,{children:"\\ba_i \\in \\R^m"}),", und ",e.jsx(n,{children:"\\sum_i x_i \\ba_i"}),` ist das Matrix-Vektor-Produkt
mit `,e.jsx(n,{children:"\\bA = (\\ba_1 \\mid \\cdots \\mid \\ba_n)"}),`. Auf die Reihenfolge der Indizes
müssen wir dabei achten (`,e.jsx(i.a,{href:"#env-von-der-koeffizientenfamilie-zur-matrix",children:"Bemerkung 9.2.1"}),")."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsx(i.p,{children:"Die Stufe eines Tensors ist die Anzahl seiner Einträge."}),e.jsxs(i.p,{children:[`Die Stufe zählt die Indexpositionen. Ein Tensor des Formats
`,e.jsx(n,{children:"4 \\times 4 \\times 4"})," hat die Stufe ",e.jsx(n,{children:"3"}),", aber ",e.jsx(n,{children:"4^3 = 64"}),` Einträge
(`,e.jsx(t,{id:"env:tensor",href:"#env-tensor",children:"Definition 9.2.3"}),")."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Vektorraum ",e.jsx(n,{children:"\\R^{4 \\times 4 \\times 4}"})," hat die Dimension ",e.jsx(n,{children:"3"}),"."]}),e.jsxs(i.p,{children:["Seine Dimension ist ",e.jsx(n,{children:"4 \\cdot 4 \\cdot 4 = 64"}),`, denn so viele Einheitstensoren
bilden nach `,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"})," eine Basis. Die ",e.jsx(n,{children:"3"}),` ist
die Stufe, also die Zahl der Indexpositionen
(`,e.jsx(i.a,{href:"#env-stufe-und-dimension-sind-zwei",children:"Bemerkung 9.2.6"}),")."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsx(i.p,{children:"Ein Tensor ist durch die Menge seiner Einträge festgelegt."}),e.jsxs(i.p,{children:[`Eine Menge kennt weder Reihenfolge noch Vielfachheit. Vertauschen wir zwei
verschiedene Einträge einer Matrix, so bleibt die Menge der vorkommenden Zahlen
dieselbe, die Matrix ist aber eine andere. Festgelegt ist ein Tensor durch die
Zuordnung von Indextupeln zu Zahlen (`,e.jsx(t,{id:"env:tensor",href:"#env-tensor",children:"Definition 9.2.3"})," und ",e.jsx(i.a,{href:"#env-stufe-und-warum-eine-menge-es-nicht-tut",children:"Bemerkung 9.2.4"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §5.4, wo mehrdimensionale Zahlenfelder beim Ableiten
matrixwertiger Ausdrücke auftreten.`})})]})}function gn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Te,{...r})}):Te(r)}const{blau:pn,gruen:kn,orange:dn,rot:fn}=Q,qe=[{name:"A = I",A:[[1,0],[0,1]],B:[[1,1],[0,2]]},{name:"B = I",A:[[1,2],[0,1]],B:[[1,0],[0,1]]},{name:"beide voll besetzt",A:[[1,2],[0,1]],B:[[1,1],[0,2]]}],me=r=>r[0].map((i,s)=>r.map(a=>a[s])),vn=(r,i)=>r.flatMap(s=>i.map(a=>s.flatMap(d=>a.map(o=>d*o))));function _n({factor:r,block:i}){const s=i.length,a=30;return e.jsxs("svg",{viewBox:`0 0 ${s*a+8} ${s*a+8}`,width:s*a+8,height:s*a+8,className:"max-w-full h-auto",role:"img","aria-label":"Kroneckerprodukt als vier farbige Blöcke",children:[i.map((d,o)=>d.map((c,u)=>{const b=4+u*a,m=4+o*a,f=Math.floor(o/2),k=Math.floor(u/2),j=Math.min(.58,.12+Math.abs(r[f][k])*.12);return e.jsxs("g",{children:[e.jsx("rect",{x:b,y:m,width:a,height:a,fill:dn,fillOpacity:j,stroke:"var(--w-border)"}),e.jsx("text",{x:b+a/2,y:m+19,textAnchor:"middle",fill:"var(--w-text)",fontSize:"10",children:c})]},`${o}-${u}`)})),e.jsx("path",{d:`M${4+2*a} 4V${4+s*a}M4 ${4+2*a}H${4+s*a}`,stroke:fn,strokeWidth:"1.5"})]})}function wn(){const[r,i]=_.useState(0),[s,a]=_.useState(!1),{A:d,B:o}=qe[r],c=s?d:me(o),u=s?me(o):d,b=vn(c,u),m=s?"A ⊗_K Bᵀ":"Bᵀ ⊗_K A";return e.jsxs("div",{className:"rounded p-3",style:{backgroundColor:"var(--w-bg)"},children:[e.jsx(L,{children:"Klicken wir die drei Faktorpaare durch und vertauschen wir die Reihenfolge: Wo landen die Einträge von Bᵀ, wo die Blöcke von A, und was genau ändert die Vertauschung?"}),e.jsxs("div",{className:"my-3 flex flex-wrap items-start gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:pn},children:"A"}),e.jsx(G,{value:d})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:kn},children:"Bᵀ"}),e.jsx(G,{value:me(o)})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-sm",style:{color:dn},children:[m,": vier Blöcke"]}),e.jsx(_n,{factor:c,block:b})]})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[qe.map((f,k)=>e.jsx("button",{type:"button","aria-pressed":r===k,onClick:()=>i(k),className:r===k?ee:W,children:f.name},f.name)),e.jsx("button",{type:"button","aria-pressed":s,onClick:()=>a(f=>!f),className:s?ee:W,children:s?"Bᵀ ⊗_K A zeigen":"A ⊗_K Bᵀ zeigen"})]}),e.jsx(O,{kind:s?"warn":"ok",children:s?"A ⊗_K Bᵀ hat ebenfalls das Format 4 × 4, ordnet die vier Produkte aber anders an. Für quadratische Faktoren ist es zu Bᵀ ⊗_K A permutationsähnlich, nicht gleich.":r===0?"Mit A = I ist jeder Block ein Vielfaches der Einheitsmatrix: Bᵀ ⊗_K I trägt die Einträge von Bᵀ als Skalare, jeder wirkt auf einen ganzen Zweierblock von vec(X). Das ist die Wirkung von B auf die Spalten, nichts weiter.":r===1?"Mit B = I ist Bᵀ = I, und A steht zweimal unverändert auf der Blockdiagonalen; alle übrigen Blöcke sind null. I ⊗_K A wendet also A getrennt auf jede Spalte von X an – die Spalten sprechen nicht miteinander.":`Jeder grüne Eintrag von Bᵀ skaliert einen ganzen blauen A-Block. Erst wenn beide Faktoren voll besetzt sind, mischen sich Zeilen- und Spaltenwirkung, und Bᵀ ⊗_K A bildet die gestapelten Spalten von X genau zu vec(AXB) ab, wie ${tn("satz:vektorisierung-eines-matrixprodukts")} behauptet.`})]})}const{blau:Ke,gruen:Pe,orange:Ne,violett:Ze}=Q;function zn(){const[r,i]=_.useState(10),[s,a]=_.useState(50),d=r*s,o=d*(d+1)/2,c=r*(r+1)/2+s*(s+1)/2,u=d**2,b=r**2+s**2,m=100*(1-c/o),f=d>=100;return e.jsxs("div",{children:[e.jsx(L,{children:"Verändern wir Orte und Zeitpunkte und vergleichen die beiden Modellgrößen."}),e.jsxs("div",{className:"mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("div",{className:"rounded border p-3",style:{borderColor:Ne},children:[e.jsxs("div",{className:"text-sm font-semibold",children:["allgemein: ",e.jsx(n,{children:`\\bSigma \\in \\R^{${d} \\times ${d}}`})]}),e.jsx("div",{className:"mt-2 font-mono text-2xl",style:{color:Ne},children:p(o,0)}),e.jsx("div",{className:"text-sm",children:"freie Parameter"}),e.jsxs("div",{className:"mt-2 font-mono text-sm",children:[p(u,0)," gespeicherte Einträge"]})]}),e.jsxs("div",{className:"rounded border p-3",style:{borderColor:Ze},children:[e.jsxs("div",{className:"text-sm font-semibold",children:[e.jsx("span",{style:{color:Ke},children:"Σ_T"})," ⊗_K ",e.jsx("span",{style:{color:Pe},children:"Σ_S"})]}),e.jsx("div",{className:"mt-2 font-mono text-2xl",style:{color:Ze},children:p(c,0)}),e.jsx("div",{className:"text-sm",children:"freie Parameter in zwei Faktoren"}),e.jsxs("div",{className:"mt-2 font-mono text-sm",children:[p(b,0)," gespeicherte Einträge"]})]})]}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(R,{label:"Orte m",value:r,onChange:i,min:2,max:50,step:1,accent:Pe}),e.jsx(R,{label:"Zeitpunkte n",value:s,onChange:a,min:2,max:50,step:1,accent:Ke})]}),e.jsx(O,{kind:f?"ok":"neutral",children:f?`Für ${r} Orte und ${s} Zeitpunkte spart die separierbare Annahme ${p(m,1)} % der freien Parameter: zwei Muster statt einer ${d}×${d}-Matrix. Die allgemeine Zahl wächst wie (mn)²/2, die separierbare nur wie (m² + n²)/2 – der Abstand ist eine Größenordnung, keine Konstante.`:`Bei ${r}×${s} Messwerten sind es ${p(o,0)} gegen ${p(c,0)} freie Parameter. Auf einem so kleinen Gitter ist die separierbare Annahme also vor allem eine Modellannahme und noch keine Notwendigkeit; die Ersparnis lohnt den Verlust an Flexibilität erst weiter oben.`})]})}const{blau:I,gruen:P,orange:le,grau:de}=Q,Ie=[1,1],We=[1,0],Ge=[1.3,.3],E=r=>150+48*r,F=r=>150-48*r,$e=r=>Math.max(-2,Math.min(2,r)),D=([r,i])=>Math.hypot(r,i),Sn=(r,i)=>[[r[0]*i[0],r[0]*i[1]],[r[1]*i[0],r[1]*i[1]]],Ce=(r,i)=>Math.hypot(r[0]-i[0],r[1]-i[1])<.03,An=([r,i],s=1.82)=>{const a=Math.min(1,s/Math.max(Math.abs(r),Math.abs(i),Number.EPSILON));return[[a*r,a*i],a<1]},Xe=([r,i],s)=>{const a=Math.hypot(r,i);return a<1e-12?[0,0]:[s*r/a,s*i/a]},je=(r,i)=>Xe(r==="kern"?[-i[1],i[0]]:i,1.3);function ge({titel:r,farbe:i,children:s}){return e.jsxs("fieldset",{className:"min-w-0 rounded-md border border-slate-200 px-3 pb-2 dark:border-slate-700",children:[e.jsx("legend",{className:"px-1 text-sm font-semibold",style:{color:i},children:r}),s]})}function Bn({v:r,w:i,A:s}){return e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm","aria-label":"Faktoren und aktuelle Rang-eins-Matrix",children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:I},children:"v = "}),e.jsx(G,{value:[[r[0]],[r[1]]]})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:P},children:"w = "}),e.jsx(G,{value:[[i[0]],[i[1]]]})]}),e.jsxs("div",{children:[e.jsx("span",{children:"A = vwᵀ = "}),e.jsx(G,{value:s})]})]})}function yn(){const[r,i]=_.useState(Ie),[s,a]=_.useState(We),[d,o]=_.useState(Ge),c=ze({feld:{x0:54,y0:54,w:192,h:192},welt:{x0:-2,x1:2,y0:-2,y1:2},greifPosition:()=>d,onDrag:M=>o(M),clamp:([M,an])=>[$e(M),$e(an)]}),u=Sn(r,s),b=s[0]*d[0]+s[1]*d[1],m=[r[0]*b,r[1]*b],f=D(r)===0||D(s)===0,k=!f&&(D(r)<.12||D(s)<.12),j=!f,x=j&&b===0,K=j&&!x&&Math.abs(b)<.08,z=[-s[1],s[0]],[y,g]=An(m),S=je("kern",s),V=je("ausserhalb",s),$=Ce(d,S)?"kern":Ce(d,V)?"ausserhalb":null,ae=M=>{D(s)>0&&o(je(M,s))},ce=()=>{i(Ie),a(We),o(Ge)};return e.jsxs("div",{className:"space-y-3",children:[e.jsx(L,{children:"Ziehen wir nur x: Zuerst lesen wir die Zahl wᵀx ab, dann das daraus entstehende Ax."}),e.jsxs("div",{className:"mx-auto max-w-xl rounded-md border border-slate-200 bg-white/60 p-3 dark:border-slate-700 dark:bg-slate-900/30",children:[e.jsx(Bn,{v:r,w:s,A:u}),e.jsxs("div",{className:"mt-3 grid gap-2 sm:grid-cols-2","aria-label":"Die zwei Rechenschritte von A x",children:[e.jsxs("div",{className:"rounded-md border-l-4 border-emerald-600 bg-slate-50 p-2 dark:bg-slate-800/60",children:[e.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide",style:{color:P},children:"1 · Messen"}),e.jsxs("div",{className:"mt-1 font-mono text-sm tabular-nums",children:["wᵀx = ",p(s[0],1)," · ",p(d[0],1)," + ",p(s[1],1)," · ",p(d[1],1),e.jsxs("span",{className:"ml-2 font-semibold",style:{color:P},children:["= ",p(b,2)]})]})]}),e.jsxs("div",{className:"rounded-md border-l-4 border-orange-500 bg-slate-50 p-2 dark:bg-slate-800/60",children:[e.jsx("div",{className:"text-xs font-semibold uppercase tracking-wide",style:{color:le},children:"2 · Auf v ablegen"}),e.jsxs("div",{className:"mt-1 font-mono text-sm tabular-nums",children:["Ax = ",p(b,2)," · v",e.jsxs("span",{className:"ml-2 font-semibold",style:{color:le},children:["= (",p(m[0],2),"; ",p(m[1],2),")ᵀ"]})]})]})]})]}),e.jsxs("svg",{viewBox:"0 0 300 300",className:"mx-auto block h-auto w-full max-w-[27rem] overflow-hidden",role:"img","aria-label":x?"Der Eingabevektor x liegt exakt im gestrichelten Kern; das Ergebnis A x ist der Nullvektor.":"Der Eingabevektor x wird auf einen Vektor A x entlang der blauen Bildgeraden abgebildet.",...c.svgProps,children:[e.jsx("line",{x1:"54",y1:"150",x2:"246",y2:"150",stroke:"var(--w-axis)"}),e.jsx("line",{x1:"150",y1:"54",x2:"150",y2:"246",stroke:"var(--w-axis)"}),D(s)>0&&e.jsx("line",{x1:E(-2*z[0]/D(z)),y1:F(-2*z[1]/D(z)),x2:E(2*z[0]/D(z)),y2:F(2*z[1]/D(z)),stroke:P,strokeDasharray:"6 4",strokeWidth:"2"}),D(r)>.12&&e.jsx("line",{x1:E(-2*r[0]/D(r)),y1:F(-2*r[1]/D(r)),x2:E(2*r[0]/D(r)),y2:F(2*r[1]/D(r)),stroke:I,strokeWidth:"2.5"}),e.jsx("line",{x1:"150",y1:"150",x2:E(s[0]),y2:F(s[1]),stroke:P,strokeWidth:"3"}),e.jsx("circle",{cx:E(s[0]),cy:F(s[1]),r:"3.5",fill:P}),e.jsx("line",{x1:"150",y1:"150",x2:E(r[0]),y2:F(r[1]),stroke:I,strokeWidth:"3"}),e.jsx("circle",{cx:E(r[0]),cy:F(r[1]),r:"3.5",fill:I}),e.jsx("line",{x1:"150",y1:"150",x2:E(d[0]),y2:F(d[1]),stroke:de,strokeWidth:"2.5"}),e.jsx("line",{x1:"150",y1:"150",x2:E(y[0]),y2:F(y[1]),stroke:le,strokeWidth:"4"}),e.jsx("circle",{cx:E(y[0]),cy:F(y[1]),r:"3.5",fill:le}),e.jsx("text",{x:"158",y:"69",fill:P,fontSize:"10",children:"ker A = w⊥"}),e.jsx("text",{x:"190",y:"223",fill:I,fontSize:"10",children:"im A = span(v)"}),e.jsx("text",{x:E(s[0])+6,y:F(s[1])+13,fill:P,fontSize:"11",children:"w"}),e.jsx("text",{x:E(r[0])+6,y:F(r[1])-6,fill:I,fontSize:"11",children:"v"}),e.jsx("text",{x:E(d[0])+6,y:F(d[1])-6,fill:"var(--w-text)",fontSize:"11",children:"x"}),e.jsx("text",{x:E(y[0])+(y[0]>1.4?-6:6),y:F(y[1])+(y[1]<-1.4?-7:13),textAnchor:y[0]>1.4?"end":"start",fill:le,fontSize:"11",children:g?"Ax (außerhalb)":"Ax"}),e.jsx(Se,{x:E(d[0]),y:F(d[1]),farbe:de,aktiv:c.dragging==="x",...c.handleProps("x")})]}),e.jsxs("div",{className:"mx-auto flex max-w-xl flex-wrap gap-2",role:"group","aria-label":"Beispielfälle für x",children:[e.jsx("button",{type:"button",className:"rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900","aria-pressed":$==="ausserhalb",disabled:D(s)<=.12,onClick:()=>ae("ausserhalb"),children:"x außerhalb des Kerns"}),e.jsx("button",{type:"button",className:"rounded-md border border-slate-300 px-3 py-2 text-sm aria-pressed:bg-slate-800 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:aria-pressed:bg-slate-100 dark:aria-pressed:text-slate-900","aria-pressed":$==="kern",disabled:D(s)<=.12,onClick:()=>ae("kern"),children:"x im Kern"})]}),e.jsx("div",{className:"mx-auto w-full max-w-xl",children:e.jsxs(ge,{titel:"Nur die Eingabe x verändern",farbe:de,children:[e.jsx(R,{label:"x₁",value:d[0],onChange:M=>o([M,d[1]]),min:-2,max:2,step:.1,accent:de}),e.jsx(R,{label:"x₂",value:d[1],onChange:M=>o([d[0],M]),min:-2,max:2,step:.1,accent:de})]})}),e.jsx(O,{kind:f||k?"warn":x?"ok":"neutral",children:f?"Einer der beiden Faktoren ist der Nullvektor: A ist dann die Nullmatrix, hat Rang 0 und ist keine Rang-1-Matrix.":k?`Beide Faktoren sind ungleich null, A = v wᵀ hat also weiterhin Rang 1 – aber mit ‖v‖ = ${p(D(r),2)} und ‖w‖ = ${p(D(s),2)} ist einer davon so kurz, dass im Maßstab des Bildes kaum noch etwas zu sehen ist.`:x?"1. Messen: wᵀx = 0 exakt. 2. Auf v ablegen: Ax = 0 · v = 0. Genau deshalb gehört x zum Kern.":K?`1. Messen: wᵀx = ${p(b,2)} – klein, aber nicht null. 2. Auf v ablegen: Ax = (${p(m[0],2)}; ${p(m[1],2)})ᵀ ist schon sehr kurz, verschwindet aber erst genau auf der grünen Kerngeraden.`:`1. Messen: wᵀx = ${p(b,2)}. 2. Auf v ablegen: Ax = ${p(b,2)} · v = (${p(m[0],2)}; ${p(m[1],2)})ᵀ. Das Ergebnis liegt auf der blauen Bildgeraden span(v).`}),e.jsxs("details",{className:"mx-auto max-w-xl rounded-md border border-slate-200 p-3 dark:border-slate-700",children:[e.jsx("summary",{className:"cursor-pointer text-sm font-semibold",children:"Optional: v und w selbst verändern"}),e.jsxs("div",{className:"mt-3 grid gap-3",children:[e.jsxs(ge,{titel:"v dreht die Bildgerade",farbe:I,children:[e.jsx(R,{label:"v₁",value:r[0],onChange:M=>i([M,r[1]]),min:-2,max:2,step:.1,accent:I}),e.jsx(R,{label:"v₂",value:r[1],onChange:M=>i([r[0],M]),min:-2,max:2,step:.1,accent:I})]}),e.jsxs(ge,{titel:"w dreht den dazu senkrechten Kern",farbe:P,children:[e.jsx(R,{label:"w₁",value:s[0],onChange:M=>a([M,s[1]]),min:-2,max:2,step:.1,accent:P}),e.jsx(R,{label:"w₂",value:s[1],onChange:M=>a([s[0],M]),min:-2,max:2,step:.1,accent:P})]}),e.jsx("button",{type:"button",className:"w-fit rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-600",onClick:ce,children:"Ausgangslage wiederherstellen"})]})]})]})}function Le(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:[`Das Skalarprodukt macht aus zwei Vektoren eine Zahl. Hier gehen wir in die
Gegenrichtung und bauen aus zwei Objekten ein größeres: aus zwei Vektoren eine
Matrix, aus zwei Matrizen einen `,e.jsx(t,{id:"env:tensor",children:"Tensor"})," der Stufe ",e.jsx(n,{children:"4"}),` oder, anders angeordnet,
eine große Matrix. Die ersten beiden Konstruktionen schreiben wir mit `,e.jsx(n,{children:"\\otimes"}),`,
die dritte, das Kroneckerprodukt, mit `,e.jsx(n,{children:"\\kron"}),"."]}),`
`,e.jsx(i.h3,{children:"Das äußere Produkt"}),`
`,e.jsxs(h,{kind:"Definition",label:"9.3.1 (Äußeres Produkt)",id:"env-aeusseres-produkt",children:[e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"äußere Produkt"})," (outer product) zweier Vektoren ",e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^m"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^n"})," ist die Matrix"]}),e.jsx(Z,{tag:"9.3.1",id:"eq-aeusseres-produkt",children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw} := \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top
= \\begin{pmatrix}
\\corange{v_1 w_1} & \\cdots & \\corange{v_1 w_n} \\\\
\\vdots & & \\vdots \\\\
\\corange{v_m w_1} & \\cdots & \\corange{v_m w_n}
\\end{pmatrix} \\in \\R^{m \\times n} ,`}),e.jsxs(i.p,{children:[`also die Matrix mit den Einträgen
`,e.jsx(n,{children:"(\\cblue{\\bv} \\otimes \\cgreen{\\bw})_{ij} = \\corange{v_i w_j}"}),"."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.2 (Inneres und äußeres Produkt)",id:"env-inneres-und-aeusseres-produkt",children:[e.jsxs(i.p,{children:["Das Skalarprodukt heißt auch ",e.jsx(i.em,{children:"inneres Produkt"}),` (inner product).
Nebeneinandergestellt:`]}),e.jsx(l,{children:`\\inner{\\cdot, \\cdot}\\colon \\R^n \\times \\R^n \\to \\R ,
\\qquad \\inner{\\cblue{\\bv}, \\cgreen{\\bw}} = \\cblue{\\bv}^\\top\\cgreen{\\bw} ,`}),e.jsx(l,{children:`\\otimes\\colon \\R^m \\times \\R^n \\to \\R^{m \\times n} ,
\\qquad \\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top .`}),e.jsxs(i.p,{children:[`Das innere Produkt verlangt zwei Vektoren gleicher Länge und liefert eine Zahl,
das äußere verträgt beliebige Längen und liefert eine `,e.jsx(n,{children:"m \\times n"}),`-Matrix. In
`,e.jsx(n,{children:"\\cblue{\\bv}^\\top\\cgreen{\\bw}"}),", also ",e.jsx(n,{children:"(1 \\times n)"})," mal ",e.jsx(n,{children:"(n \\times 1)"}),`, treffen
sich die beiden Längen innen und verschwinden; in
`,e.jsx(n,{children:"\\cblue{\\bv}\\,\\cgreen{\\bw}^\\top"}),", also ",e.jsx(n,{children:"(m \\times 1)"})," mal ",e.jsx(n,{children:"(1 \\times n)"}),`, stehen
sie außen und ergeben das Format `,e.jsx(n,{children:"m \\times n"}),"."]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.3 (Äußeres Produkt zweier Vektoren)",id:"env-aeusseres-produkt-zweier-vektoren",children:[e.jsx(i.p,{children:"Für"}),e.jsx(l,{children:`\\cblue{\\bv} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix} \\in \\R^2
\\qquad\\text{und}\\qquad
\\cgreen{\\bw} = \\begin{pmatrix} \\cgreen{-2} \\\\ \\cgreen{3} \\\\ \\cgreen{-11} \\end{pmatrix} \\in \\R^3`}),e.jsx(i.p,{children:"ist"}),e.jsx(l,{children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top
= \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix}
  \\begin{pmatrix} \\cgreen{-2} & \\cgreen{3} & \\cgreen{-11} \\end{pmatrix}
= \\begin{pmatrix}
\\corange{-2} & \\corange{3} & \\corange{-11} \\\\
\\corange{-4} & \\corange{6} & \\corange{-22}
\\end{pmatrix} \\in \\R^{2 \\times 3} .`}),e.jsxs(i.p,{children:["Die zweite Zeile ist das Doppelte der ersten, denn ",e.jsx(n,{children:"\\cblue{v_2} = 2\\cblue{v_1}"}),`,
und jede Spalte ist ein Vielfaches von `,e.jsx(n,{children:"\\cblue{\\bv} = (1, 2)^\\top"}),`. Das gilt
allgemein.`]})]}),`
`,e.jsx(i.h3,{children:"Eine Rang-1-Matrix und was sie tut"}),`
`,e.jsxs(X,{title:"Ein Bildraum als Gerade",children:[e.jsx(i.p,{children:"Wie hängen die beiden Faktoren einer Rang-1-Matrix mit ihrem Bild und ihrem Kern zusammen?"}),e.jsx(yn,{}),e.jsxs(i.p,{children:["Jedes Bild ",e.jsx(n,{children:"(\\bv \\otimes \\bw)\\bx"})," liegt auf der Geraden durch ",e.jsx(n,{children:"\\bv"}),`, und auf
`,e.jsx(n,{children:"\\bnull"})," abgebildet werden genau die Vektoren ",e.jsx(n,{children:"\\bx"}),", die senkrecht auf ",e.jsx(n,{children:"\\bw"}),`
stehen.`]})]}),`
`,e.jsxs(h,{kind:"Satz",label:"9.3.4 (Eigenschaften des äußeren Produkts)",id:"env-eigenschaften-des-aeusseren-produkts",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^m"})," und ",e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^n"}),` beide vom Nullvektor
verschieden, und sei `,e.jsx(n,{children:"\\bM = \\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\bM"})," ist ",e.jsx(n,{children:"\\cgreen{w_j}\\,\\cblue{\\bv}"}),", die ",e.jsx(n,{children:"i"}),`-te Zeile
ist `,e.jsx(n,{children:"\\cblue{v_i}\\,\\cgreen{\\bw}^\\top"}),"."]}),`
`,e.jsxs(i.li,{children:["Für alle ",e.jsx(n,{children:"\\bx \\in \\R^n"}),` ist
`,e.jsx(n,{children:"\\bM\\bx = \\cblue{\\bv}\\,\\inner{\\cgreen{\\bw}, \\bx}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\col(\\bM) = \\spann\\{\\cblue{\\bv}\\}"}),", das ",e.jsx(t,{id:"image",children:"Bild"}),` ist also
eindimensional, und `,e.jsx(n,{children:"\\rang(\\bM) = 1"}),"."]}),`
`,e.jsxs(i.li,{children:["Der ",e.jsx(t,{id:"kernel",children:"Kern"}),` ist
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bM) = \\{\\bx \\in \\R^n : \\cgreen{\\bw}^\\top\\bx = 0\\}"}),`, also
die `,e.jsx(t,{id:"hyperplane",children:"Hyperebene"}),` durch den Ursprung senkrecht zu
`,e.jsx(n,{children:"\\cgreen{\\bw}"}),"; sie hat die Dimension ",e.jsx(n,{children:"n - 1"}),"."]}),`
`]})]}),`
`,e.jsx(q,{title:"Beweis der Eigenschaften des äußeren Produkts",children:e.jsxs(ie,{children:[e.jsx(T,{why:e.jsx(e.Fragment,{children:"Ausklammern eines gemeinsamen Faktors, Eintrag für Eintrag"}),children:e.jsxs(i.p,{children:["Zu (1): Nach ",e.jsx(i.a,{href:"#eq-aeusseres-produkt",children:"(9.3.1)"})," steht an der Stelle ",e.jsx(n,{children:"(i,j)"}),` der Eintrag
`,e.jsx(n,{children:"\\corange{v_i w_j}"}),". In der ",e.jsx(n,{children:"j"}),`-ten Spalte steckt damit in jedem Eintrag derselbe
Faktor `,e.jsx(n,{children:"\\cgreen{w_j}"}),", sie ist also ",e.jsx(n,{children:"\\cgreen{w_j}\\,\\cblue{\\bv}"}),`; für die Zeilen
läuft es genauso mit `,e.jsx(n,{children:"\\cblue{v_i}"}),"."]})}),e.jsxs(T,{why:e.jsxs(e.Fragment,{children:["Assoziativität des Matrixprodukts; ",e.jsx(n,{children:"\\cgreen{\\bw}^\\top\\bx"})," ist eine ",e.jsx(n,{children:"1 \\times 1"}),"-Matrix, also eine Zahl, und Zahlen dürfen wir vor den Vektor ziehen"]}),children:[e.jsx(i.p,{children:"Zu (2): Wir setzen die Definition ein und klammern anders:"}),e.jsx(l,{children:`\\bM\\bx = \\bigl(\\cblue{\\bv}\\,\\cgreen{\\bw}^\\top\\bigr)\\bx
= \\cblue{\\bv}\\,\\bigl(\\cgreen{\\bw}^\\top\\bx\\bigr)
= \\cblue{\\bv}\\,\\inner{\\cgreen{\\bw}, \\bx} .`}),e.jsxs(i.p,{children:[`Das Matrixprodukt sagt uns damit, was diese lineare Abbildung tut: Sie misst
`,e.jsx(n,{children:"\\bx"})," gegen ",e.jsx(n,{children:"\\cgreen{\\bw}"}),` und trägt das Ergebnis als Vielfaches von
`,e.jsx(n,{children:"\\cblue{\\bv}"})," ab."]})]}),e.jsx(T,{why:e.jsxs(e.Fragment,{children:["hier brauchen wir ",e.jsx(n,{children:"\\cgreen{\\bw} \\neq \\bnull"}),", sonst ist die Division nicht erlaubt und ",e.jsx(n,{children:"\\bM"})," die Nullmatrix; der ",e.jsx(t,{id:"rank",children:"Rang"})," ist die Dimension des Bildes"]}),children:e.jsxs(i.p,{children:["Zu (3): Nach Schritt 2 ist jedes Bild ein Vielfaches von ",e.jsx(n,{children:"\\cblue{\\bv}"}),`, also
`,e.jsx(n,{children:"\\col(\\bM) \\subseteq \\spann\\{\\cblue{\\bv}\\}"}),`. Umgekehrt erreichen wir jedes
Vielfache: Für `,e.jsx(n,{children:"\\bx = t\\,\\cgreen{\\bw}/\\left\\|\\cgreen{\\bw}\\right\\|^2"}),` ist
`,e.jsx(n,{children:"\\inner{\\cgreen{\\bw}, \\bx} = t"})," und damit ",e.jsx(n,{children:"\\bM\\bx = t\\,\\cblue{\\bv}"}),`. Wegen
`,e.jsx(n,{children:"\\cblue{\\bv} \\neq \\bnull"})," hat dieser Bildraum die Dimension ",e.jsx(n,{children:"1"}),"."]})}),e.jsx(T,{why:e.jsxs(e.Fragment,{children:["ein Vielfaches ",e.jsx(n,{children:"c\\,\\cblue{\\bv}"})," ist genau dann der Nullvektor, wenn ",e.jsx(n,{children:"c = 0"})," ist; der ",e.jsx(t,{id:"rank-nullity-theorem",children:"Rangsatz"})," verlangt ",e.jsx(n,{children:"\\rang(\\bM) + \\dim\\operatorname{Kern}(\\bM) = n"})]}),children:e.jsxs(i.p,{children:["Zu (4): Nach Schritt 2 gilt ",e.jsx(n,{children:"\\bM\\bx = \\bnull"}),` genau dann, wenn
`,e.jsx(n,{children:"\\inner{\\cgreen{\\bw}, \\bx}\\,\\cblue{\\bv} = \\bnull"}),` ist, und wegen
`,e.jsx(n,{children:"\\cblue{\\bv} \\neq \\bnull"})," genau dann, wenn ",e.jsx(n,{children:"\\cgreen{\\bw}^\\top\\bx = 0"}),` ist. Das
ist die Menge aller zu `,e.jsx(n,{children:"\\cgreen{\\bw}"}),` orthogonalen Vektoren. Die Probe liefert
der Rangsatz: `,e.jsx(n,{children:"1 + (n-1) = n"}),"."]})})]})}),`
`,e.jsxs(i.p,{children:["Umgekehrt ist jede Matrix vom Rang ",e.jsx(n,{children:"1"}),` ein äußeres Produkt: Ihr Spaltenraum hat
die Dimension `,e.jsx(n,{children:"1"}),`, jede Spalte ist also ein Vielfaches eines festen
`,e.jsx(n,{children:"\\cblue{\\bv}"}),", und die Vielfachen sammeln wir in ",e.jsx(n,{children:"\\cgreen{\\bw}"}),"."]}),`
`,e.jsx(i.h3,{children:"Wo äußere Produkte auftauchen"}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.5 (Die SVD als Summe äußerer Produkte)",id:"env-die-svd-als-summe-aeusserer-produkte",children:[e.jsxs(i.p,{children:["Die Summenform der Singulärwertzerlegung aus ",e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),`
(`,e.jsx(t,{id:"env:summenform-der-svd",href:"?k=06-svd#env-summenform-der-svd",children:"Satz 6.4.2"}),", dort als ",e.jsx(n,{children:"\\bu_i\\bv_i^\\top"}),` geschrieben) lautet für
`,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"})]}),e.jsx(l,{children:`\\bA = \\bU_r\\bSigma_r\\bV_r^\\top
= \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i} .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),` ist jeder Summand eine
Rang-1-Matrix mit der Bildgeraden `,e.jsx(n,{children:"\\spann\\{\\cblue{\\bu_i}\\}"}),`, und
`,e.jsx(n,{children:"\\corange{\\sigma_i}"})," gibt ihr Gewicht an. Die SVD zerlegt eine Matrix also in ",e.jsx(n,{children:"r"}),`
Rang-1-Bausteine; nach `,e.jsx(n,{children:"k"}),` Termen abgebrochen, liefert die Summe die beste
`,e.jsx(t,{id:"low-rank-approximation",children:"Rang-k-Approximation"}),` (Satz von Eckart, Young und
Mirsky).`]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.6 (Kovarianzmatrizen sind Mittel äußerer Produkte)",id:"env-kovarianzmatrizen-sind-mittel-aeusserer",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bx"})," ein Zufallsvektor im ",e.jsx(n,{children:"\\R^n"})," mit Erwartungswert ",e.jsx(n,{children:"\\bmu = \\E[\\bx]"}),`. Die
`,e.jsx(t,{id:"covariance-matrix",children:"Kovarianzmatrix"})," ist definiert als"]}),e.jsx(l,{children:"\\cov(\\bx) = \\E\\bigl[(\\bx - \\bmu) \\otimes (\\bx - \\bmu)\\bigr] ,"}),e.jsxs(i.p,{children:[`also als Erwartungswert eines äußeren Produkts, gebildet Eintrag für Eintrag.
Ausmultiplizieren und die Linearität des `,e.jsx(t,{id:"expected-value",children:"Erwartungswerts"}),`
liefern die Verschiebungsformel`]}),e.jsx(l,{children:`\\cov(\\bx) = \\E[\\bx \\otimes \\bx] - \\bmu \\otimes \\bmu
= \\E[\\bx \\otimes \\bx] - \\E[\\bx] \\otimes \\E[\\bx] ,`}),e.jsxs(i.p,{children:["denn ",e.jsx(n,{children:"\\E[\\bx \\otimes \\bmu] = \\bmu \\otimes \\bmu = \\E[\\bmu \\otimes \\bx]"}),`, und von
den drei gleichen Termen bleibt einer mit negativem Vorzeichen übrig. Die Formel
ist die mehrdimensionale Fassung von
`,e.jsx(n,{children:"\\var(X) = \\E[X^2] - \\E[X]^2"}),`; numerisch ist sie aus demselben Grund heikel wie
dort, siehe die `,e.jsx(t,{id:"cancellation",children:"Auslöschung"}),` in
`,e.jsx(i.a,{href:"?k=02-algos#sec-2.1",children:"Abschnitt 2.1"}),"."]})]}),`
`,e.jsx(i.p,{children:`Auch der Aufmerksamkeitsmechanismus (attention) moderner Sprachmodelle rechnet
mit äußeren Produkten. Seine übliche Form ist`}),`
`,e.jsx(l,{children:`\\text{Attention}(\\bQ, \\bK, \\bV)
= \\softmax\\!\\left(\\frac{\\bQ\\bK^\\top}{\\sqrt{d_k}}\\right)\\bV ,`}),`
`,e.jsxs(i.p,{children:["wobei die Zeilen von ",e.jsx(n,{children:"\\bQ"}),", ",e.jsx(n,{children:"\\bK"})," und ",e.jsx(n,{children:"\\bV"}),` Anfragen (queries), Schlüssel (keys)
und Werte (values) sind und `,e.jsx(n,{children:"d_k"})," die Spaltenzahl von ",e.jsx(n,{children:"\\bQ"})," und ",e.jsx(n,{children:"\\bK"}),` ist. Wie
`,e.jsx(n,{children:"\\bU_r\\bSigma_r\\bV_r^\\top"})," in ",e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),`
ist der Faktor `,e.jsx(n,{children:"\\bQ\\bK^\\top"}),` eine Summe äußerer Produkte, eines je Spalte von
`,e.jsx(n,{children:"\\bQ"})," und ",e.jsx(n,{children:"\\bK"}),"."]}),`
`,e.jsxs(q,{title:"Empirische Kovarianz und Attention",children:[e.jsxs(i.p,{children:["Für jede einzelne Realisierung mit ",e.jsx(n,{children:"\\bx \\neq \\bmu"})," ist ",e.jsx(n,{children:"(\\bx - \\bmu) \\otimes (\\bx - \\bmu)"}),` nach
`,e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),` eine Rang-1-Matrix; erst das Mitteln
über viele Richtungen macht die Kovarianzmatrix im Regelfall zu einer Matrix von
vollem Rang. Genauso gebaut ist die empirische Kovarianzmatrix aus `,e.jsx(n,{children:"N"}),`
Beobachtungen, `,e.jsx(n,{children:`\\wh{\\bSigma} = \\tfrac{1}{N-1}\\sum_{i=1}^{N} (\\bx_i - \\bar{\\bx})
\\otimes (\\bx_i - \\bar{\\bx})`}),`, und weil die zentrierten Vektoren sich zu null
summieren, ist `,e.jsx(n,{children:"\\rang(\\wh{\\bSigma}) \\le N - 1"}),`: Bei weniger Beobachtungen als
Dimensionen ist die Schätzung stets singulär.`]}),e.jsxs(i.p,{children:["In der Attention-Formel ist ",e.jsx(n,{children:"\\bQ \\in \\R^{n_q \\times d_k}"}),` mit den Zeilen
`,e.jsx(n,{children:"\\bq_i^\\top"}),", ",e.jsx(n,{children:"\\bK \\in \\R^{n_k \\times d_k}"})," mit den Zeilen ",e.jsx(n,{children:"\\bk_j^\\top"}),` und
`,e.jsx(n,{children:"\\bV \\in \\R^{n_k \\times d_v}"}),"; ",e.jsx(n,{children:"\\softmax"}),` wirkt zeilenweise, und das Ergebnis
liegt in `,e.jsx(n,{children:"\\R^{n_q \\times d_v}"}),". Der Eintrag ",e.jsx(n,{children:"(i,j)"})," von ",e.jsx(n,{children:"\\bQ\\bK^\\top"}),` ist das
innere Produkt `,e.jsx(n,{children:"\\inner{\\bq_i, \\bk_j}"}),`, das Modell vergleicht also jede Anfrage
mit jedem Schlüssel. Als ganze Matrix ist derselbe Ausdruck eine Summe äußerer
Produkte über die `,e.jsx(n,{children:"d_k"})," Spalten,"]}),e.jsx(l,{children:"\\bQ\\bK^\\top = \\sum_{l=1}^{d_k} \\bq^{(l)} \\otimes \\bk^{(l)} ,"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\bq^{(l)}"})," und ",e.jsx(n,{children:"\\bk^{(l)}"})," als ",e.jsx(n,{children:"l"}),"-ten Spalten von ",e.jsx(n,{children:"\\bQ"})," und ",e.jsx(n,{children:"\\bK"}),`. Der
Rang der `,e.jsx(i.em,{children:"Scorematrix"})," ",e.jsx(n,{children:"\\bQ\\bK^\\top"})," ist damit höchstens ",e.jsx(n,{children:"d_k"}),", und weil ",e.jsx(n,{children:"d_k"}),`
in der Praxis viel kleiner ist als die Zahl der Zeilen, steckt in den Scores eine
Zerlegung von niedrigem Rang, wie bei der SVD. Das gilt vor der
Softmax-Transformation: Softmax ist nicht linear und erhält die Rangschranke im
Allgemeinen nicht, die Matrix der Attention-Gewichte kann also vollen Rang haben.`]})]}),`
`,e.jsx(i.h3,{children:"Das Tensorprodukt"}),`
`,e.jsxs(i.p,{children:["Das äußere Produkt macht aus zwei Objekten der Stufe ",e.jsx(n,{children:"1"})," eines der Stufe ",e.jsx(n,{children:"2"}),`.
Dieselbe Vorschrift funktioniert für beliebige Stufen: Jeder Eintrag des einen
Tensors wird mit jedem Eintrag des anderen multipliziert.`]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.3.7 (Tensorprodukt)",id:"env-tensorprodukt",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{A} \\in \\R^{m_1 \\times \\cdots \\times m_p}"})," ein Tensor der Stufe ",e.jsx(n,{children:"p"}),`
und `,e.jsx(n,{children:"\\cgreen{B} \\in \\R^{n_1 \\times \\cdots \\times n_q}"})," einer der Stufe ",e.jsx(n,{children:"q"}),`. Ihr
`,e.jsx(i.em,{children:"Tensorprodukt"}),` ist der Tensor
`,e.jsx(n,{children:"\\cblue{A} \\otimes \\cgreen{B} = C \\in \\R^{m_1 \\times \\cdots \\times m_p \\times n_1 \\times \\cdots \\times n_q}"}),`
der Stufe `,e.jsx(n,{children:"p + q"})," mit den Einträgen"]}),e.jsx(Z,{tag:"9.3.2",id:"eq-tensorprodukt",children:`\\corange{c_{i_1, \\dots, i_p, j_1, \\dots, j_q}}
= \\cblue{a_{i_1, \\dots, i_p}} \\cdot \\cgreen{b_{j_1, \\dots, j_q}} ,`}),e.jsxs(i.p,{children:["für alle ",e.jsx(n,{children:"1 \\le i_r \\le m_r"})," und ",e.jsx(n,{children:"1 \\le j_s \\le n_s"}),`. Das Tensorprodukt ist also
eine Abbildung`]}),e.jsx(l,{children:`\\otimes\\colon \\R^{m_1 \\times \\cdots \\times m_p} \\times \\R^{n_1 \\times \\cdots \\times n_q}
\\to \\R^{m_1 \\times \\cdots \\times m_p \\times n_1 \\times \\cdots \\times n_q} .`})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.8 (Stufen addieren sich, Einträge multiplizieren sich)",id:"env-stufen-addieren-sich-eintraege",children:[e.jsxs(i.p,{children:["Der Ergebnistensor hat ",e.jsx(n,{children:"p + q"})," Indexpositionen, die ersten ",e.jsx(n,{children:"p"}),` von
`,e.jsx(n,{children:"\\cblue{A}"}),", die letzten ",e.jsx(n,{children:"q"})," von ",e.jsx(n,{children:"\\cgreen{B}"}),`, und
`,e.jsx(n,{children:"(m_1 \\cdots m_p) \\cdot (n_1 \\cdots n_q)"}),` Einträge, denn jeder Eintrag von
`,e.jsx(n,{children:"\\cblue{A}"})," trifft genau einmal auf jeden Eintrag von ",e.jsx(n,{children:"\\cgreen{B}"}),"."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"p = q = 1"})," wird ",e.jsx(i.a,{href:"#eq-tensorprodukt",children:"(9.3.2)"}),` zu
`,e.jsx(n,{children:"\\corange{c_{i,j}} = \\cblue{a_i}\\cgreen{b_j}"}),`, und das ist
`,e.jsx(t,{id:"env:aeusseres-produkt",href:"#env-aeusseres-produkt",children:"Definition 9.3.1"}),`: Das äußere Produkt ist das Tensorprodukt zweier
Tensoren der Stufe `,e.jsx(n,{children:"1"}),`. Zwei Vektoren spannen so ein Gitter von Produkten auf,
drei Vektoren einen Quader, und jede weitere Stufe legt eine Achse dazu.`]})]}),`
`,e.jsxs(h,{kind:"Satz",label:"9.3.9 (Das Tensorprodukt ist bilinear)",id:"env-das-tensorprodukt-ist-bilinear",children:[e.jsxs(i.p,{children:["Für Tensoren ",e.jsx(n,{children:"A, A'"})," desselben Formats, ",e.jsx(n,{children:"B, B'"}),` desselben Formats und
`,e.jsx(n,{children:"c \\in \\R"})," gilt"]}),e.jsx(l,{children:`(A + A') \\otimes B = A \\otimes B + A' \\otimes B ,
\\qquad (cA) \\otimes B = c\\,(A \\otimes B) ,`}),e.jsxs(i.p,{children:[`und ebenso im zweiten Argument. Außerdem ist das Tensorprodukt assoziativ: Für
einen dritten Tensor `,e.jsx(n,{children:"D"}),` beliebigen Formats gilt
`,e.jsx(n,{children:"(A \\otimes B) \\otimes D = A \\otimes (B \\otimes D)"}),"."]})]}),`
`,e.jsx(q,{title:"Beweis der Bilinearität des Tensorprodukts",children:e.jsx(ie,{children:e.jsx(T,{why:e.jsxs(e.Fragment,{children:["an der Stelle ",e.jsx(n,{children:"(i_1, \\dots, i_p, j_1, \\dots, j_q)"})," etwa ",e.jsx(n,{children:"(a_{i_1, \\dots, i_p} + a'_{i_1, \\dots, i_p})\\, b_{j_1, \\dots, j_q} = a_{i_1, \\dots, i_p} b_{j_1, \\dots, j_q} + a'_{i_1, \\dots, i_p} b_{j_1, \\dots, j_q}"}),"; Homogenität, zweites Argument und Assoziativität gehen genauso"]}),children:e.jsxs(i.p,{children:[`Alle Aussagen sind Gleichungen zwischen Tensoren, und zwei Tensoren sind genau
dann gleich, wenn sie an jeder Indexstelle übereinstimmen. Dort steht jeweils
eine Gleichung zwischen reellen Zahlen, die aus den Rechengesetzen in `,e.jsx(n,{children:"\\R"}),` folgt.
Insbesondere ist `,e.jsx(n,{children:"\\otimes"}),` in jedem seiner beiden Argumente linear, also bilinear
im Sinn von `,e.jsx(t,{id:"env:multilineare-abbildung",href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),"."]})})})}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.10 (Tensorprodukt dreier Vektoren)",id:"env-tensorprodukt-dreier-vektoren",children:[e.jsx(i.p,{children:"Wir nehmen"}),e.jsx(l,{children:`\\cblue{\\bu} = \\begin{pmatrix} \\cblue{1} \\\\ \\cblue{2} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bv} = \\begin{pmatrix} \\cgreen{3} \\\\ \\cgreen{5} \\end{pmatrix} ,
\\qquad
\\cpurp{\\bw} = \\begin{pmatrix} \\cpurp{7} \\\\ \\cpurp{11} \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["alle drei im ",e.jsx(n,{children:"\\R^2"}),`. Das Tensorprodukt
`,e.jsx(n,{children:"T = \\cblue{\\bu} \\otimes \\cgreen{\\bv} \\otimes \\cpurp{\\bw} \\in \\R^{2 \\times 2 \\times 2}"}),`
hat nach `,e.jsx(i.a,{href:"#eq-tensorprodukt",children:"(9.3.2)"}),` die Einträge
`,e.jsx(n,{children:"\\corange{T_{i,j,k}} = \\cblue{u_i}\\,\\cgreen{v_j}\\,\\cpurp{w_k}"}),`; auf die
Klammerung kommt es nach `,e.jsx(t,{id:"env:das-tensorprodukt-ist-bilinear",href:"#env-das-tensorprodukt-ist-bilinear",children:"Satz 9.3.9"}),` nicht an. Alle acht
Einträge, geordnet nach der dritten Indexposition:`]}),e.jsx(l,{children:`\\begin{aligned}
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
\\end{aligned}`}),e.jsx(i.p,{children:"Als Scheiben geschrieben:"}),e.jsx(l,{children:`T_{\\cdot,\\cdot,1} = \\begin{pmatrix} \\corange{21} & \\corange{35} \\\\ \\corange{42} & \\corange{70} \\end{pmatrix} ,
\\qquad
T_{\\cdot,\\cdot,2} = \\begin{pmatrix} \\corange{33} & \\corange{55} \\\\ \\corange{66} & \\corange{110} \\end{pmatrix} .`}),e.jsx(i.p,{children:"Beide Scheiben sind Vielfache derselben Matrix, nämlich"}),e.jsx(l,{children:`T_{\\cdot,\\cdot,k} = \\cpurp{w_k} \\cdot (\\cblue{\\bu} \\otimes \\cgreen{\\bv}) ,
\\qquad
\\cblue{\\bu} \\otimes \\cgreen{\\bv} = \\begin{pmatrix} \\corange{3} & \\corange{5} \\\\ \\corange{6} & \\corange{10} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"})," hat ",e.jsx(n,{children:"\\cblue{\\bu} \\otimes \\cgreen{\\bv}"})," den Rang ",e.jsx(n,{children:"1"}),`, und das
Vielfache mit `,e.jsx(n,{children:"\\cpurp{w_k} \\neq 0"}),` ändert daran nichts: Jede Scheibe ist eine
Rang-1-Matrix. Tensoren der Form
`,e.jsx(n,{children:"\\cblue{\\bu} \\otimes \\cgreen{\\bv} \\otimes \\cpurp{\\bw}"}),` mit Faktoren
`,e.jsx(n,{children:"\\neq \\bnull"})," heißen deshalb ",e.jsx(i.em,{children:"Rang-1-Tensoren"}),`. Jeder Stufe-3-Tensor ist eine
Summe solcher Bausteine, denn die Einheitstensoren aus
`,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),` sind welche:
`,e.jsx(n,{children:"\\bE^{(i,j,k)} = \\be_i \\otimes \\be_j \\otimes \\be_k"}),`. Anders als bei der SVD
(`,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),") ist ab Stufe ",e.jsx(n,{children:"3"}),` aber schon
die kleinste Anzahl nötiger Summanden im Allgemeinen schwer zu bestimmen.`]})]}),`
`,e.jsx(i.h3,{children:"Das Kroneckerprodukt"}),`
`,e.jsxs(i.p,{children:[`Für zwei Matrizen gibt es eine zweite Lesart des Produkts, die statt eines
Tensors der Stufe `,e.jsx(n,{children:"4"}),` wieder eine Matrix liefert, mit der wir weiterrechnen
können.`]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.3.11 (Kroneckerprodukt)",id:"env-kroneckerprodukt",children:[e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Kroneckerprodukt"})," zweier Matrizen ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{p \\times q}"})," ist die Blockmatrix"]}),e.jsx(l,{children:`\\cblue{\\bA} \\kron \\cgreen{\\bB} = \\begin{pmatrix}
\\cblue{a_{11}}\\cgreen{\\bB} & \\cdots & \\cblue{a_{1n}}\\cgreen{\\bB} \\\\
\\vdots & & \\vdots \\\\
\\cblue{a_{m1}}\\cgreen{\\bB} & \\cdots & \\cblue{a_{mn}}\\cgreen{\\bB}
\\end{pmatrix} \\in \\R^{mp \\times nq} .`}),e.jsxs(i.p,{children:["Sie besteht aus ",e.jsx(n,{children:"m \\cdot n"})," Blöcken der Größe ",e.jsx(n,{children:"p \\times q"}),`; der Block an der
Stelle `,e.jsx(n,{children:"(i_1, i_2)"})," ist die mit ",e.jsx(n,{children:"\\cblue{a_{i_1 i_2}}"}),` skalierte Kopie von
`,e.jsx(n,{children:"\\cgreen{\\bB}"}),"."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.12 (Zwei Bedeutungen, zwei Zeichen)",id:"env-zwei-bedeutungen-zwei-zeichen",children:[e.jsxs(i.p,{children:["Für zwei Matrizen ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{p \\times q}"})," sind jetzt zwei Produkte erklärt:"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Tensorprodukt"})," nach ",e.jsx(t,{id:"env:tensorprodukt",href:"#env-tensorprodukt",children:"Definition 9.3.7"})," liefert einen Tensor der Stufe ",e.jsx(n,{children:"4"}),`,
`,e.jsx(n,{children:"C \\in \\R^{m \\times n \\times p \\times q}"}),` mit
`,e.jsx(n,{children:"\\corange{c_{i_1, i_2, j_1, j_2}} = \\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}}"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Das ",e.jsx(i.em,{children:"Kroneckerprodukt"})," nach ",e.jsx(t,{id:"env:kroneckerprodukt",href:"#env-kroneckerprodukt",children:"Definition 9.3.11"}),` liefert eine Matrix
`,e.jsx(n,{children:"\\bD \\in \\R^{mp \\times nq}"})," mit"]}),`
`,e.jsx(Z,{tag:"9.3.3",id:"eq-zwei-bedeutungen-zwei-zeichen",children:"\\corange{d_{(i_1 - 1)p + j_1,\\; (i_2 - 1)q + j_2}} = \\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}} ."}),`
`]}),`
`]}),e.jsxs(i.p,{children:["Beide enthalten dieselben ",e.jsx(n,{children:"mnpq"})," Zahlen, nur verschieden angeordnet: ",e.jsx(n,{children:"\\bD"}),` ist
die `,e.jsx(i.em,{children:"abgeflachte"})," Fassung von ",e.jsx(n,{children:"C"}),`. Die Indexformel
`,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"})," sagt, wie abgeflacht wird. Die ",e.jsx(n,{children:"mp"}),` Zeilen
zerfallen in `,e.jsx(n,{children:"m"})," Gruppen zu je ",e.jsx(n,{children:"p"}),"; die Gruppe wählt ",e.jsx(n,{children:"i_1"}),`, die Position in der
Gruppe `,e.jsx(n,{children:"j_1"}),". Für die Spalten gilt dasselbe mit ",e.jsx(n,{children:"i_2"})," und ",e.jsx(n,{children:"j_2"}),`. Der Index des
ersten Faktors läuft also langsam, der des zweiten schnell.`]}),e.jsxs(i.p,{children:["In der Literatur steht meist für beide Produkte ",e.jsx(n,{children:"\\otimes"}),`; welches gemeint ist,
verrät das Format des Ergebnisses. Wir schreiben `,e.jsx(n,{children:"\\kron"}),` für das
Kroneckerprodukt und behalten `,e.jsx(n,{children:"\\otimes"}),` dem äußeren Produkt und dem
Tensorprodukt vor. Beim Lesen anderer Texte müssen wir die Unterscheidung selbst
treffen.`]})]}),`
`,e.jsxs(q,{title:"Das Kroneckerprodukt zweier Vektoren",children:[e.jsxs(i.p,{children:["Fassen wir ",e.jsx(n,{children:"\\cblue{\\bv} \\in \\R^{m}"})," und ",e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^{n}"}),` als
`,e.jsx(n,{children:"(m \\times 1)"}),"- und ",e.jsx(n,{children:"(n \\times 1)"}),`-Matrizen auf, so ist ihr Kroneckerprodukt der
Vektor der Länge `,e.jsx(n,{children:"mn"}),`, der die Zeilen des äußeren Produkts hintereinanderhängt.
Steht der zweite Faktor dagegen als Zeilenvektor da, kommt das äußere Produkt
selbst heraus:`]}),e.jsx(l,{children:`\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\kron \\begin{pmatrix} 3 \\\\ 5 \\\\ 7 \\end{pmatrix}
= \\begin{pmatrix} \\corange{3} & \\corange{5} & \\corange{7} & \\corange{6} & \\corange{10} & \\corange{14} \\end{pmatrix}^\\top ,
\\qquad
\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} \\kron \\begin{pmatrix} 3 & 5 & 7 \\end{pmatrix}
= \\begin{pmatrix} \\corange{3} & \\corange{5} & \\corange{7} \\\\ \\corange{6} & \\corange{10} & \\corange{14} \\end{pmatrix} .`})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.13 (Kroneckerprodukt zweier kleiner Matrizen)",id:"env-kroneckerprodukt-zweier-kleiner-matrizen",children:[e.jsx(i.p,{children:"Für"}),e.jsx(l,{children:`\\cblue{\\bA} = \\begin{pmatrix} \\cblue{1} & \\cblue{0} \\\\ \\cblue{2} & \\cblue{5} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bB} = \\begin{pmatrix}
\\cgreen{3} & \\cgreen{0} & \\cgreen{0} \\\\
\\cgreen{0} & \\cgreen{2} & \\cgreen{0} \\\\
\\cgreen{-1} & \\cgreen{0} & \\cgreen{-1}
\\end{pmatrix}`}),e.jsxs(i.p,{children:["ist ",e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB} \\in \\R^{6 \\times 6}"}),`, denn
`,e.jsx(n,{children:"2 \\cdot 3 = 6"}),` Zeilen und ebenso viele Spalten. Blockweise notiert und dann
ausgeschrieben:`]}),e.jsx(l,{children:`\\cblue{\\bA} \\kron \\cgreen{\\bB}
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
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Der Block oben rechts ist die Nullmatrix, weil ",e.jsx(n,{children:"\\cblue{a_{12}} = \\cblue{0}"})," ist."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.14 (Transponieren und Reihenfolge)",id:"env-transponieren-und-reihenfolge",children:[e.jsx(i.p,{children:`Transponieren zieht in beide Faktoren hinein, ohne ihre Reihenfolge zu
vertauschen:`}),e.jsx(l,{children:`\\bigl(\\cblue{\\bA} \\kron \\cgreen{\\bB}\\bigr)^\\top
= \\cblue{\\bA}^\\top \\kron \\cgreen{\\bB}^\\top .`}),e.jsxs(i.p,{children:["Nach ",e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` steht nämlich auf beiden Seiten an der
Stelle mit Zeilenindex `,e.jsx(n,{children:"(i_2 - 1)q + j_2"})," und Spaltenindex ",e.jsx(n,{children:"(i_1 - 1)p + j_1"}),` der
Eintrag `,e.jsx(n,{children:"\\cblue{a_{i_1, i_2}}\\cgreen{b_{j_1, j_2}}"}),"."]}),e.jsxs(i.p,{children:["Kommutativ ist das Kroneckerprodukt dagegen ",e.jsx(i.strong,{children:"nicht"}),"; im Allgemeinen ist"]}),e.jsx(l,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB} \\neq \\cgreen{\\bB} \\kron \\cblue{\\bA} ."}),e.jsxs(i.p,{children:["Beide Produkte haben dasselbe Format ",e.jsx(n,{children:"mp \\times nq"}),` und enthalten dieselben
`,e.jsx(n,{children:"mnpq"})," Zahlen, aber an anderen Stellen. Für die Matrizen aus ",e.jsx(i.a,{href:"#env-kroneckerprodukt-zweier-kleiner-matrizen",children:"Beispiel 9.3.13"}),`
steht an der Stelle `,e.jsx(n,{children:"(2,1)"})," in ",e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB}"}),` eine
`,e.jsx(n,{children:"\\corange{0}"}),", in ",e.jsx(n,{children:"\\cgreen{\\bB} \\kron \\cblue{\\bA}"})," dagegen eine ",e.jsx(n,{children:"\\cred{6}"}),`:
Dort ist der erste Block `,e.jsx(n,{children:"\\cgreen{3}\\,\\cblue{\\bA}"}),`, und dessen zweite Zeile
beginnt mit `,e.jsx(n,{children:"\\cgreen{3} \\cdot \\cblue{2}"}),"."]})]}),`
`,e.jsxs(X,{title:"Kroneckerprodukte selbst ausrechnen",children:[e.jsxs(i.p,{children:["Der Rechner zeigt ",e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"}),` in Blockdarstellung,
den Operator des vec-Tricks aus `,e.jsx(t,{id:"env:vektorisierung-eines-matrixprodukts",href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),`. Was
ändert sich, wenn wir die Faktoren vertauschen?`]}),e.jsx(wn,{}),e.jsxs(i.p,{children:["Jeder Eintrag von ",e.jsx(n,{children:"\\cgreen{\\bB^\\top}"}),` skaliert einen ganzen Block
`,e.jsx(n,{children:"\\cblue{\\bA}"}),`. Nach dem Vertauschen bleibt das Format gleich, die Einträge
stehen aber an anderen Stellen; die Reihenfolge der Faktoren gehört deshalb zur
Rechenvorschrift.`]})]}),`
`,e.jsx(i.h3,{children:"Blockstrukturen aus Kroneckerprodukten"}),`
`,e.jsxs(i.p,{children:["Setzen wir eine ",e.jsx(t,{id:"identity-matrix",children:"Einheitsmatrix"}),` als einen der beiden
Faktoren ein, entstehen Muster, die in der Statistik häufig vorkommen. Auf
welcher Seite sie steht, entscheidet über die Struktur.`]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.15 (S ⊗_K I_n verteilt die Einträge)",id:"env-s-k-i-n-verteilt-die-eintraege",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\cblue{\\bS} \\in \\R^{p \\times p}"})," mit den Einträgen ",e.jsx(n,{children:"\\cblue{s_{ij}}"}),`. Dann
ist jeder Block von `,e.jsx(n,{children:"\\cblue{\\bS} \\kron \\cgreen{\\bI_n}"})," eine Diagonalmatrix:"]}),e.jsx(l,{children:`\\cblue{\\bS} \\kron \\cgreen{\\bI_n} = \\begin{pmatrix}
\\cblue{s_{11}}\\cgreen{\\bI_n} & \\cdots & \\cblue{s_{1p}}\\cgreen{\\bI_n} \\\\
\\vdots & & \\vdots \\\\
\\cblue{s_{p1}}\\cgreen{\\bI_n} & \\cdots & \\cblue{s_{pp}}\\cgreen{\\bI_n}
\\end{pmatrix} \\in \\R^{np \\times np} .`}),e.jsxs(i.p,{children:["Jeder Eintrag ",e.jsx(n,{children:"\\cblue{s_{ij}}"})," taucht also ",e.jsx(n,{children:"n"}),"-mal auf. Für ",e.jsx(n,{children:"p = n = 2"}),` und
`,e.jsx(n,{children:"\\cblue{\\bS} = \\bigl(\\begin{smallmatrix} \\cblue{1} & \\cblue{2} \\\\ \\cblue{3} & \\cblue{4} \\end{smallmatrix}\\bigr)"}),`
sieht das so aus:`]}),e.jsx(l,{children:`\\cblue{\\bS} \\kron \\cgreen{\\bI_2} = \\begin{pmatrix}
\\corange{1} & \\corange{0} & \\corange{2} & \\corange{0} \\\\
\\corange{0} & \\corange{1} & \\corange{0} & \\corange{2} \\\\
\\corange{3} & \\corange{0} & \\corange{4} & \\corange{0} \\\\
\\corange{0} & \\corange{3} & \\corange{0} & \\corange{4}
\\end{pmatrix} .`}),e.jsxs(i.p,{children:["Als Kovarianzmatrix gelesen: Die ",e.jsx(n,{children:"np"})," Koordinaten zerfallen in ",e.jsx(n,{children:"p"}),` Gruppen zu
je `,e.jsx(n,{children:"n"}),`, und gekoppelt sind nur gleiche Positionen verschiedener Gruppen, mit der
Stärke `,e.jsx(n,{children:"\\cblue{s_{ij}}"}),". Das sind ",e.jsx(n,{children:"n"}),` unabhängige Kopien der
`,e.jsx(n,{children:"\\cblue{\\bS}"}),"-Struktur, ineinandergeschoben."]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.16 (I_n ⊗_K S ist blockdiagonal)",id:"env-i-n-k-s-ist-blockdiagonal",children:[e.jsx(i.p,{children:`Vertauschen wir die Reihenfolge, wird aus demselben Paar eine
Blockdiagonalmatrix:`}),e.jsx(l,{children:`\\cgreen{\\bI_n} \\kron \\cblue{\\bS} = \\begin{pmatrix}
\\cblue{\\bS} & & & \\\\
& \\cblue{\\bS} & & \\\\
& & \\ddots & \\\\
& & & \\cblue{\\bS}
\\end{pmatrix} \\in \\R^{np \\times np} ,`}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"n"})," Kopien von ",e.jsx(n,{children:"\\cblue{\\bS} \\in \\R^{p \\times p}"}),` auf der Diagonalen und
Nullen sonst. In der Statistik ist das die Kovarianzmatrix eines Vektors, der
aus `,e.jsx(n,{children:"n"}),` voneinander unabhängigen Blöcken besteht, die alle dieselbe
Kovarianzmatrix `,e.jsx(n,{children:"\\cblue{\\bS}"})," haben; ein typischer Fall sind ",e.jsx(n,{children:"n"}),` Personen mit
je `,e.jsx(n,{children:"p"}),` Messungen. Dieselben zwei Faktoren ergeben je nach Reihenfolge
eine blockdiagonale oder eine über die ganze Matrix verteilte Struktur
(`,e.jsx(i.a,{href:"#env-s-k-i-n-verteilt-die-eintraege",children:"Beispiel 9.3.15"}),")."]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: separierbare Kovarianz"}),`
`,e.jsxs(i.p,{children:["Beobachten wir dieselbe Größe an ",e.jsx(n,{children:"m"})," Orten zu ",e.jsx(n,{children:"n"}),` Zeitpunkten, so haben wir
`,e.jsx(n,{children:"mn"})," Messwerte, und ihre Kovarianzmatrix hat das Format ",e.jsx(n,{children:"mn \\times mn"}),`. Schon
bei `,e.jsx(n,{children:"m = 10"})," Orten und ",e.jsx(n,{children:"n = 50"})," Zeitpunkten sind das ",e.jsx(n,{children:"500 \\times 500"}),` Einträge,
weit mehr, als sich aus überschaubaren Datenmengen schätzen lässt. Das
Kroneckerprodukt liefert eine sparsame Modellannahme.`]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.3.17 (Separierbare Kovarianz)",id:"env-separierbare-kovarianz",children:[e.jsxs(i.p,{children:["Die Kovarianzmatrix ",e.jsx(n,{children:"\\bSigma \\in \\R^{mn \\times mn}"}),` der Beobachtungen heißt
`,e.jsx(i.em,{children:"separierbar"}),", wenn sie sich als"]}),e.jsx(Z,{tag:"9.3.4",id:"eq-separierbare-kovarianz",children:"\\bSigma = \\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}"}),e.jsxs(i.p,{children:["schreiben lässt, mit der Kovarianzmatrix ",e.jsx(n,{children:"\\cblue{\\bSigma_T} \\in \\R^{n \\times n}"}),`
zwischen den Zeitpunkten und der Kovarianzmatrix
`,e.jsx(n,{children:"\\cgreen{\\bSigma_S} \\in \\R^{m \\times m}"})," zwischen den Orten."]}),e.jsxs(i.p,{children:["Dazu gehört eine Anordnung der ",e.jsx(n,{children:"mn"}),` Beobachtungen. Da der Index des ersten
Faktors langsam läuft und der des zweiten schnell
(`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),"), läuft in ",e.jsx(i.a,{href:"#eq-separierbare-kovarianz",children:"(9.3.4)"}),`
die Zeit langsam und der Ort schnell: erst alle Orte zum ersten Zeitpunkt, dann
alle zum zweiten und so weiter.`]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.3.18 (Zwei Orte, zwei Zeitpunkte)",id:"env-zwei-orte-zwei-zeitpunkte",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m = 2"})," Orte und ",e.jsx(n,{children:"n = 2"})," Zeitpunkte seien"]}),e.jsx(l,{children:`\\cblue{\\bSigma_T} = \\begin{pmatrix} \\cblue{1{,}0} & \\cblue{0{,}8} \\\\ \\cblue{0{,}8} & \\cblue{1{,}0} \\end{pmatrix} ,
\\qquad
\\cgreen{\\bSigma_S} = \\begin{pmatrix} \\cgreen{2{,}0} & \\cgreen{0{,}5} \\\\ \\cgreen{0{,}5} & \\cgreen{2{,}0} \\end{pmatrix} .`}),e.jsx(i.p,{children:"Dann ist"}),e.jsx(l,{children:`\\bSigma = \\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}
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
Zeit 1), (Ort 1, Zeit 2), (Ort 2, Zeit 2). Damit lesen wir die erste Zeile ab:`}),e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Eintrag"}),e.jsx(i.th,{children:"verbindet"}),e.jsx(i.th,{children:"Wert"}),e.jsx(i.th,{children:"Herkunft"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,1)"})}),e.jsx(i.td,{children:"Ort 1, Zeit 1 mit sich selbst"}),e.jsx(i.td,{children:e.jsx(n,{children:"2{,}0"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cblue{1{,}0} \\cdot \\cgreen{2{,}0}"}),", eine Varianz"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,2)"})}),e.jsx(i.td,{children:"zwei Orte, gleiche Zeit"}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}5"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{1{,}0} \\cdot \\cgreen{0{,}5}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,3)"})}),e.jsx(i.td,{children:"gleicher Ort, zwei Zeiten"}),e.jsx(i.td,{children:e.jsx(n,{children:"1{,}6"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{0{,}8} \\cdot \\cgreen{2{,}0}"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(n,{children:"(1,4)"})}),e.jsx(i.td,{children:"anderer Ort, andere Zeit"}),e.jsx(i.td,{children:e.jsx(n,{children:"0{,}4"})}),e.jsx(i.td,{children:e.jsx(n,{children:"\\cblue{0{,}8} \\cdot \\cgreen{0{,}5}"})})]})]})]}),e.jsxs(i.p,{children:[`In Korrelationen: Beobachtungen am selben Ort zu verschiedenen Zeiten sind mit
`,e.jsx(n,{children:"1{,}6/2{,}0 = 0{,}8"}),` korreliert, zur selben Zeit an verschiedenen Orten mit
`,e.jsx(n,{children:"0{,}5/2{,}0 = 0{,}25"}),`, bei verschiedenem Ort und verschiedener Zeit mit dem
Produkt `,e.jsx(n,{children:"0{,}8 \\cdot 0{,}25 = 0{,}2"}),`. Die Korrelation zerfällt also in einen
zeitlichen und einen räumlichen Faktor; daher der Name `,e.jsx(i.em,{children:"separierbar"}),"."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.3.19 (Was die Annahme spart und was sie kostet)",id:"env-was-die-annahme-spart-und-was-sie-kostet",children:[e.jsxs(i.p,{children:[`Eine beliebige Kovarianzmatrix ist symmetrisch, hat also
`,e.jsx(n,{children:"\\tfrac{mn(mn+1)}{2}"}),` freie Einträge. Die separierbare Form braucht nur die
Einträge der beiden Faktoren,`]}),e.jsx(l,{children:"\\frac{m(m+1)}{2} + \\frac{n(n+1)}{2} ."}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m = n = 2"})," stehen ",e.jsx(n,{children:"10"})," Parametern ",e.jsx(n,{children:"6"})," gegenüber, für ",e.jsx(n,{children:"m = 10"}),` Orte und
`,e.jsx(n,{children:"n = 50"})," Zeitpunkte sind es ",e.jsx(n,{children:"125\\,250"})," gegen ",e.jsx(n,{children:"1\\,330"}),`. Die Zerlegung
`,e.jsx(i.a,{href:"#eq-separierbare-kovarianz",children:"(9.3.4)"}),` ist allerdings nicht eindeutig: Wegen
`,e.jsx(n,{children:`\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}
= (c\\,\\cblue{\\bSigma_T}) \\kron (c^{-1}\\cgreen{\\bSigma_S})`}),`
für jedes `,e.jsx(n,{children:"c > 0"}),` lässt sich ein Skalenfaktor zwischen den Kovarianzfaktoren
verschieben. Identifizierbar ist deshalb ein Parameter weniger, im Beispiel also
`,e.jsx(n,{children:"5"})," statt ",e.jsx(n,{children:"6"}),"."]}),e.jsx(i.p,{children:`Dafür verbietet Separierbarkeit, dass sich das räumliche Muster über die Zeit
ändert. Ein Wetterfeld, dessen Zusammenhänge morgens anders aussehen als abends,
lässt sich so nicht beschreiben.`})]}),`
`,e.jsxs(X,{title:"Parameterzahl der separierbaren Kovarianz",children:[e.jsx(i.p,{children:`Wie viele Parameter spart die separierbare Form gegenüber einer allgemeinen
Kovarianzmatrix, wenn das Messgitter wächst?`}),e.jsx(zn,{}),e.jsxs(i.p,{children:["Die allgemeine Parameterzahl wächst wie ",e.jsx(n,{children:"(mn)^2/2"}),`, die separierbare nur wie
`,e.jsx(n,{children:"(m^2 + n^2)/2"}),`. Auf kleinen Gittern ist der Unterschied gering, auf großen
beträgt er Größenordnungen.`]})]}),`
`,e.jsxs(q,{title:"Eigenwerte eines Kroneckerprodukts",children:[e.jsxs(i.p,{children:["Dass ",e.jsx(n,{children:"\\bSigma"}),` überhaupt eine Kovarianzmatrix sein kann, sichert eine weitere
Rechenregel: Die Eigenwerte von `,e.jsx(n,{children:"\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}"}),`
sind die Produkte `,e.jsx(n,{children:"\\lambda_i\\mu_j"}),` der Eigenwerte beider Faktoren, denn mit
Eigenvektoren `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"})," ist"]}),e.jsx(l,{children:`\\bigl(\\cblue{\\bSigma_T} \\kron \\cgreen{\\bSigma_S}\\bigr)(\\ba \\kron \\bb)
= (\\cblue{\\bSigma_T}\\ba) \\kron (\\cgreen{\\bSigma_S}\\bb)
= \\lambda_i\\mu_j\\,(\\ba \\kron \\bb) ,`}),e.jsxs(i.p,{children:["wobei ",e.jsx(n,{children:"\\ba \\kron \\bb"}),` das Kroneckerprodukt der beiden Spaltenvektoren ist. Die
mittlere Gleichung ist die Regel
`,e.jsx(n,{children:"(\\bA \\kron \\bB)(\\bC \\kron \\bD) = (\\bA\\bC) \\kron (\\bB\\bD)"}),`, die sich
ebenfalls an `,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` ablesen lässt. Beide Faktoren sind als Kovarianzmatrizen
`,e.jsx(t,{id:"symmetric-matrix",children:"symmetrisch"}),`, haben nach dem
`,e.jsx(t,{id:"spectral-theorem",children:"Spektralsatz"}),` also je eine Orthonormalbasis aus
Eigenvektoren. Laufen `,e.jsx(n,{children:"\\ba"})," und ",e.jsx(n,{children:"\\bb"}),` durch diese beiden Basen, so bilden die
`,e.jsx(n,{children:"mn"})," Vektoren ",e.jsx(n,{children:"\\ba \\kron \\bb"})," eine Basis des ",e.jsx(n,{children:"\\R^{mn}"}),`; damit sind das bereits
alle Eigenwerte. Ist also jeder Faktor
`,e.jsx(t,{id:"positive-definite",children:"positiv definit"}),", so ist es auch ",e.jsx(n,{children:"\\bSigma"}),`. In
`,e.jsx(i.a,{href:"#env-zwei-orte-zwei-zeitpunkte",children:"Beispiel 9.3.18"})," hat ",e.jsx(n,{children:"\\cblue{\\bSigma_T}"}),` die Eigenwerte
`,e.jsx(n,{children:"\\cblue{1{,}8}"})," und ",e.jsx(n,{children:"\\cblue{0{,}2}"}),", ",e.jsx(n,{children:"\\cgreen{\\bSigma_S}"}),` die Eigenwerte
`,e.jsx(n,{children:"\\cgreen{2{,}5}"})," und ",e.jsx(n,{children:"\\cgreen{1{,}5}"}),`; die vier Produkte
`,e.jsx(n,{children:"\\corange{4{,}5}"}),", ",e.jsx(n,{children:"\\corange{2{,}7}"}),", ",e.jsx(n,{children:"\\corange{0{,}5}"})," und ",e.jsx(n,{children:"\\corange{0{,}3}"}),`
sind die Eigenwerte von `,e.jsx(n,{children:"\\bSigma"}),". Ihre Summe ist ",e.jsx(n,{children:"8"}),", die ",e.jsx(t,{id:"env:spur",children:"Spur"})," von ",e.jsx(n,{children:"\\bSigma"}),`,
und ihr Produkt ist `,e.jsx(n,{children:"1{,}8225"}),", die Determinante von ",e.jsx(n,{children:"\\bSigma"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(ne,{children:[e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Das äußere Produkt ",e.jsx(n,{children:"\\bv \\otimes \\bw"}),` ist nur für Vektoren gleicher Länge
definiert.`]}),e.jsxs(i.p,{children:[`Das gilt für das innere Produkt. Das äußere Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw = \\bv\\bw^\\top"}),` verlangt keine Übereinstimmung: Für
`,e.jsx(n,{children:"\\bv \\in \\R^m"})," und ",e.jsx(n,{children:"\\bw \\in \\R^n"})," entsteht eine ",e.jsx(n,{children:"m \\times n"}),`-Matrix
(`,e.jsx(t,{id:"env:aeusseres-produkt",href:"#env-aeusseres-produkt",children:"Definition 9.3.1"}),", ",e.jsx(i.a,{href:"#env-inneres-und-aeusseres-produkt",children:"Bemerkung 9.3.2"}),`). In
`,e.jsx(i.a,{href:"#env-aeusseres-produkt-zweier-vektoren",children:"Beispiel 9.3.3"})," sind die Längen ",e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"3"}),"."]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bv, \\bw \\neq \\bnull"})," bildet ",e.jsx(n,{children:"\\bx \\mapsto (\\bv \\otimes \\bw)\\bx"}),` den ganzen
`,e.jsx(n,{children:"\\R^n"})," auf die Gerade ",e.jsx(n,{children:"\\spann\\{\\bv\\}"}),` ab, und der Kern ist die Hyperebene
senkrecht zu `,e.jsx(n,{children:"\\bw"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),`: Wegen
`,e.jsx(n,{children:"(\\bv \\otimes \\bw)\\bx = \\bv\\inner{\\bw, \\bx}"}),` besteht das Bild aus Vielfachen von
`,e.jsx(n,{children:"\\bv"})," und der Kern aus allen ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\bw^\\top\\bx = 0"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Die beiden Scheiben ",e.jsx(n,{children:"T_{\\cdot,\\cdot,1}"})," und ",e.jsx(n,{children:"T_{\\cdot,\\cdot,2}"}),` des Tensors
`,e.jsx(n,{children:"T = \\bu \\otimes \\bv \\otimes \\bw \\in \\R^{2 \\times 2 \\times 2}"}),` sind linear
unabhängig voneinander.`]}),e.jsxs(i.p,{children:[`Beide sind Vielfache derselben Rang-1-Matrix,
`,e.jsx(n,{children:"T_{\\cdot,\\cdot,k} = w_k\\,(\\bu \\otimes \\bv)"}),`, also linear abhängig. In
`,e.jsx(i.a,{href:"#env-tensorprodukt-dreier-vektoren",children:"Beispiel 9.3.10"})," ist die zweite Scheibe das ",e.jsx(n,{children:"11/7"}),`-fache
der ersten.`]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Das Kroneckerprodukt zweier Matrizen ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\bB \\in \\R^{p \\times q}"})," ist ein Tensor der Stufe ",e.jsx(n,{children:"4"}),"."]}),e.jsxs(i.p,{children:["Der Stufe-4-Tensor ist das ",e.jsx(i.em,{children:"Tensorprodukt"})," nach ",e.jsx(t,{id:"env:tensorprodukt",href:"#env-tensorprodukt",children:"Definition 9.3.7"}),`. Das
Kroneckerprodukt ordnet dieselben `,e.jsx(n,{children:"mnpq"})," Zahlen nach der Indexformel ",e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),`
in einer Matrix aus `,e.jsx(n,{children:"\\R^{mp \\times nq}"}),` an, ist also die abgeflachte Fassung
davon (`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),"). Für ",e.jsx(n,{children:"\\bA \\in \\R^{3 \\times 2}"}),`
und `,e.jsx(n,{children:"\\bB \\in \\R^{2 \\times 4}"})," etwa liegt ",e.jsx(n,{children:"\\bA \\kron \\bB"})," in ",e.jsx(n,{children:"\\R^{6 \\times 8}"}),`,
das Tensorprodukt dagegen in `,e.jsx(n,{children:"\\R^{3 \\times 2 \\times 2 \\times 4}"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"\\bA \\kron \\bB = \\bB \\kron \\bA"}),`, denn beide Produkte enthalten
dieselben Zahlen.`]}),e.jsxs(i.p,{children:["Dieselben Zahlen stehen an verschiedenen Stellen. In ",e.jsx(i.a,{href:"#env-kroneckerprodukt-zweier-kleiner-matrizen",children:"Beispiel 9.3.13"}),` ist der
Eintrag `,e.jsx(n,{children:"(2,1)"})," von ",e.jsx(n,{children:"\\bA \\kron \\bB"})," gleich ",e.jsx(n,{children:"0"}),", der von ",e.jsx(n,{children:"\\bB \\kron \\bA"}),`
dagegen `,e.jsx(n,{children:"6"})," (",e.jsx(i.a,{href:"#env-transponieren-und-reihenfolge",children:"Bemerkung 9.3.14"}),`). Die Formate stimmen
überein, die Matrizen nicht.`]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Es gilt ",e.jsx(n,{children:"(\\bA \\kron \\bB)^\\top = \\bA^\\top \\kron \\bB^\\top"}),"."]}),e.jsxs(i.p,{children:[`Transponieren zieht in beide Faktoren hinein, ohne ihre Reihenfolge zu
vertauschen; die Indexformel `,e.jsx(i.a,{href:"#eq-zwei-bedeutungen-zwei-zeichen",children:"(9.3.3)"}),` zeigt es unmittelbar
(`,e.jsx(i.a,{href:"#env-transponieren-und-reihenfolge",children:"Bemerkung 9.3.14"}),`). Anders als beim Matrixprodukt mit
`,e.jsx(n,{children:"(\\bA\\bB)^\\top = \\bB^\\top\\bA^\\top"})," dreht sich die Reihenfolge nicht um."]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Die Matrix ",e.jsx(n,{children:"\\bI_n \\kron \\bS"})," mit ",e.jsx(n,{children:"\\bS \\in \\R^{p \\times p}"}),` ist
blockdiagonal mit `,e.jsx(n,{children:"n"})," Kopien von ",e.jsx(n,{children:"\\bS"}),"."]}),e.jsxs(i.p,{children:["Der Block an der Stelle ",e.jsx(n,{children:"(i,j)"})," ist ",e.jsx(n,{children:"\\delta_{ij}\\bS"}),`, außerhalb der Diagonalen
steht also die Nullmatrix (`,e.jsx(i.a,{href:"#env-i-n-k-s-ist-blockdiagonal",children:"Beispiel 9.3.16"}),`). In der umgekehrten Reihenfolge
entsteht dagegen `,e.jsx(n,{children:"\\bS \\kron \\bI_n"}),`, dessen Einträge über die ganze Matrix
verteilt sind (`,e.jsx(i.a,{href:"#env-s-k-i-n-verteilt-die-eintraege",children:"Beispiel 9.3.15"}),")."]})]}),e.jsxs(sn,{loesung:265,toleranz:0,children:[e.jsxs(i.p,{children:["Daten liegen an ",e.jsx(n,{children:"m = 10"})," Orten zu ",e.jsx(n,{children:"n = 20"}),` Zeitpunkten vor. Eine unstrukturierte
Kovarianzmatrix des `,e.jsx(n,{children:"200"}),`-dimensionalen Datenvektors hat
`,e.jsx(n,{children:"\\tfrac{200 \\cdot 201}{2} = 20\\,100"}),` freie Parameter. Wie viele Parameter haben
die beiden Faktoren `,e.jsx(n,{children:"\\bSigma_T"})," und ",e.jsx(n,{children:"\\bSigma_S"}),` des separierbaren Modells
zusammen?`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"265"}),", denn ",e.jsx(n,{children:"\\tfrac{m(m+1)}{2} + \\tfrac{n(n+1)}{2} = 55 + 210"}),`
(`,e.jsx(i.a,{href:"#env-was-die-annahme-spart-und-was-sie-kostet",children:"Bemerkung 9.3.19"}),`). Identifizierbar sind
davon `,e.jsx(n,{children:"264"}),`, weil sich ein Skalenfaktor zwischen den beiden Faktoren verschieben
lässt.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: vgl. MML §4.5 für die Summendarstellung einer Matrix aus
Rang-1-Bausteinen, auf der `,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),` aufsetzt; die Rechenregeln des
Kroneckerprodukts sammelt Kapitel 2 von Magnus und Neudecker, `,e.jsx(i.em,{children:`Matrix
Differential Calculus with Applications in Statistics and Econometrics`}),"."]})})]})}function Dn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Le,{...r})}):Le(r)}const{blau:pe,gruen:ke,orange:Oe,violett:H,grau:Rn}=Q,N=(r,i,s)=>r.a+r.b*i+r.c*s+r.d*i*s,w={x:34,y:18,size:210},Mn=[{name:"Ebene (c₂₂ = 0)",k:{a:2,b:3,c:-1,d:0}},{name:"nur der gemischte Anteil",k:{a:0,b:0,c:0,d:5}},{name:"Beispiel 2 + 3x − y + 5xy",k:{a:2,b:3,c:-1,d:5}}];function En(r,i,s){const a=r[2]-s,d=i[2]-s;if(a<0&&d<0||a>0&&d>0||Math.abs(r[2]-i[2])<1e-10)return null;const o=a/(a-d);return[r[0]+o*(i[0]-r[0]),r[1]+o*(i[1]-r[1])]}function Fn(r,i,s=24){const a=[];for(let d=0;d<s;d+=1)for(let o=0;o<s;o+=1){const c=d/s,u=(d+1)/s,b=o/s,m=(o+1)/s,f=[[c,b,N(r,c,b)],[u,b,N(r,u,b)],[u,m,N(r,u,m)],[c,m,N(r,c,m)]],k=[[0,1],[1,2],[2,3],[3,0]].map(([j,x])=>En(f[j],f[x],i)).filter(j=>j!==null);k.length===2&&a.push({a:k[0],b:k[1]}),k.length===4&&a.push({a:k[0],b:k[1]},{a:k[2],b:k[3]})}return a}function Vn(){const[r,i]=_.useState({a:2,b:3,c:-1,d:5}),[s,a]=_.useState([.65,.45]),[d,o]=_.useState({azimuth:38,elevation:26}),c=[N(r,0,0),N(r,1,0),N(r,0,1),N(r,1,1)],u=Math.min(...c),b=Math.max(...c),m=b-u<1e-9?[u-1,b+1]:[u,b],f=N(r,s[0],s[1]),k=_.useMemo(()=>[.2,.4,.6,.8].map(g=>u+g*(b-u||1)),[u,b]),j=_.useMemo(()=>k.map(g=>Fn(r,g)),[r,k]),x=_.useMemo(()=>({f:(g,S)=>N(r,g,S),nx:24,ny:24,color:H,opacity:.84,wire:!0}),[r]),K=ze({feld:{x0:w.x,y0:w.y,w:w.size,h:w.size},welt:{x0:0,x1:1,y0:0,y1:1},greifPosition:()=>s,clamp:([g,S])=>[Math.max(0,Math.min(1,g)),Math.max(0,Math.min(1,S))],onDrag:a}),z=g=>w.x+g*w.size,y=g=>w.y+(1-g)*w.size;return e.jsxs("div",{children:[e.jsx(L,{children:"Ziehen wir den orangefarbenen Punkt und vergleichen seine Höhe in beiden Ansichten."}),e.jsxs("div",{className:"mt-3 grid grid-cols-1 items-start gap-4 sm:grid-cols-2",children:[e.jsxs("svg",{viewBox:"0 0 280 260",width:"280",height:"260",className:"max-w-full h-auto",role:"img","aria-label":"Höhenlinien und Heatmap der Tensorproduktfunktion; der orange Punkt markiert dieselbe Stelle wie in der Fläche.",...K.svgProps,children:[Array.from({length:28},(g,S)=>Array.from({length:28},(V,$)=>{const ce=(N(r,(S+.5)/28,($+.5)/28)-u)/(b-u||1);return e.jsx("rect",{x:w.x+S*7.5,y:w.y+(27-$)*7.5,width:"7.7",height:"7.7",fill:H,fillOpacity:.12+.76*ce},`${S}-${$}`)})),j.map((g,S)=>e.jsxs("g",{stroke:"var(--w-text)",strokeWidth:"1.1",fill:"none",children:[g.map((V,$)=>e.jsx("line",{x1:z(V.a[0]),y1:y(V.a[1]),x2:z(V.b[0]),y2:y(V.b[1])},$)),g.length>0&&e.jsx("text",{x:z(g[g.length-1].b[0])+3,y:y(g[g.length-1].b[1])-2,fontSize:"10",fill:"var(--w-text)",stroke:"none",children:p(k[S],1)})]},k[S])),e.jsx("rect",{x:w.x,y:w.y,width:w.size,height:w.size,fill:"none",stroke:Rn}),e.jsx("line",{x1:w.x,y1:w.y+w.size,x2:w.x+w.size,y2:w.y+w.size,stroke:pe}),e.jsx("line",{x1:w.x,y1:w.y,x2:w.x,y2:w.y+w.size,stroke:ke}),e.jsx("text",{x:"139",y:"250",fill:pe,fontSize:"12",textAnchor:"middle",children:"x"}),e.jsx("text",{x:"18",y:"123",fill:ke,fontSize:"12",textAnchor:"middle",children:"y"}),e.jsx(Se,{x:z(s[0]),y:y(s[1]),farbe:Oe,...K.handleProps("punkt")})]}),e.jsx(nn,{size:280,xDomain:[0,1],yDomain:[0,1],zDomain:m,surface:x,contours:k,contourColor:H,points:[{p:[s[0],s[1],f],color:Oe,label:`f = ${p(f,2)}`,onTop:!0}],dropLines:!0,azimuth:d.azimuth,elevation:d.elevation,onViewChange:o,labels:{x:"x",y:"y",z:"f"},ariaLabel:"Dieselbe Tensorproduktfunktion als Fläche; der orange Punkt ist mit der Höhenlinientafel verknüpft."})]}),e.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:Mn.map(g=>e.jsx("button",{type:"button",className:W,onClick:()=>i(g.k),children:g.name},g.name))}),e.jsxs("div",{className:"mt-3 max-w-md",children:[e.jsx(R,{label:"c₁₁",value:r.a,onChange:g=>i({...r,a:g}),min:-5,max:5,step:.5,accent:H}),e.jsx(R,{label:"c₂₁",value:r.b,onChange:g=>i({...r,b:g}),min:-5,max:5,step:.5,accent:H}),e.jsx(R,{label:"c₁₂",value:r.c,onChange:g=>i({...r,c:g}),min:-5,max:5,step:.5,accent:H}),e.jsx(R,{label:"c₂₂",value:r.d,onChange:g=>i({...r,d:g}),min:-5,max:5,step:.5,accent:H}),e.jsx(R,{label:"Punkt x",value:s[0],onChange:g=>a([g,s[1]]),min:0,max:1,step:.05,accent:pe}),e.jsx(R,{label:"Punkt y",value:s[1],onChange:g=>a([s[0],g]),min:0,max:1,step:.05,accent:ke})]}),e.jsx(rn,{value:d,onChange:o}),e.jsx(O,{kind:r.d===0?"ok":"neutral",children:r.d===0?`Bei c₂₂ = 0 liegt der Punkt bei f(${p(s[0],2)}, ${p(s[1],2)}) = ${p(f,2)} auf einer Ebene: Die x-Steigung ist für jedes y gleich.`:`Bei c₂₂ = ${p(r.d,1)} liegt derselbe Punkt in beiden Bildern bei f(${p(s[0],2)}, ${p(s[1],2)}) = ${p(f,2)}. Ein ${r.d>0?"positives":"negatives"} c₂₂ ${r.d>0?"hebt":"senkt"} die Ecke (1, 1) gegenüber der Ebene, und die Höhenlinien krümmen sich ${r.d>0?"von":"zu"} ihr ${r.d>0?"weg":"hin"}: Genau das ist die Kopplung von x und y.`})]})}function He(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"})," war ",e.jsx(n,{children:"\\otimes"})," eine Rechenvorschrift für Vektoren und ",e.jsx(t,{id:"env:tensor",children:"Tensoren"}),`.
Jetzt fragen wir nach dem Raum, in dem diese Produkte leben, und machen so aus
zwei Vektorräumen einen dritten.`]}),`
`,e.jsx(i.h3,{children:"Der Raum V ⊗ W"}),`
`,e.jsxs(i.p,{children:["Sei zunächst ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"})," mit dem ",e.jsx(t,{id:"env:aeusseres-produkt",children:"äußeren Produkt"}),`
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\cgreen{\\bw}^\\top"}),`. Die Menge
aller dieser Produkte ist als Vektorraum unbrauchbar, denn sie ist nicht unter
Addition abgeschlossen: Die Summe zweier Matrizen vom `,e.jsx(t,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"1"}),` hat im
Allgemeinen den Rang `,e.jsx(n,{children:"2"}),`. Der kleinste Vektorraum, der alle Produkte enthält,
ist ihre `,e.jsx(t,{id:"span",children:"lineare Hülle"}),"."]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.4.1 (Tensorprodukt von Vektorräumen)",id:"env-tensorprodukt-von-vektorraeumen",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"})," ",e.jsx(t,{id:"vector-space",children:"Vektorräume"})," und"]}),e.jsx(l,{children:`\\otimes\\colon V \\times W \\to V \\otimes W,
\\qquad (\\cblue{\\bv},\\cgreen{\\bw}) \\mapsto
\\cblue{\\bv}\\otimes\\cgreen{\\bw},`}),e.jsxs(i.p,{children:["eine bilineare Abbildung. Das ",e.jsx(i.em,{children:"Tensorprodukt"})," (tensor product) von ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"}),`
ist der von ihren Bildern erzeugte Vektorraum`]}),e.jsx(Z,{tag:"9.4.1",id:"eq-tensorprodukt-von-vektorraeumen",children:`V \\otimes W = \\spann\\bigl\\{\\cblue{\\bv} \\otimes \\cgreen{\\bw} :
\\cblue{\\bv} \\in V, \\ \\cgreen{\\bw} \\in W\\bigr\\} .`}),e.jsxs(i.p,{children:["Die Produkte ",e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," selbst nennen wir ",e.jsx(i.em,{children:`elementare
Tensoren`}),"."]})]}),`
`,e.jsxs(i.p,{children:["Nicht jede bilineare Abbildung eignet sich als ",e.jsx(n,{children:"\\otimes"}),`: Auch die Nullabbildung
ist bilinear, ihre Bilder spannen aber nur den Nullraum auf. Gemeint ist ein
`,e.jsx(n,{children:"\\otimes"})," mit der ",e.jsx(i.em,{children:"universellen Eigenschaft"}),` aus der folgenden Vertiefung; das
äußere Produkt und das Produkt von Funktionen in den Beispielen unten haben sie.`]}),`
`,e.jsxs(q,{title:"Die universelle Eigenschaft",children:[e.jsxs(i.p,{children:[`Die universelle Eigenschaft verlangt: Jede bilineare Abbildung
`,e.jsx(n,{children:"f\\colon V \\times W \\to Z"})," in einen Vektorraum ",e.jsx(n,{children:"Z"}),` faktorisiert eindeutig über
`,e.jsx(n,{children:"\\otimes"}),`, es gibt also genau eine lineare Abbildung
`,e.jsx(n,{children:"\\wt{f}\\colon V \\otimes W \\to Z"}),` mit
`,e.jsx(n,{children:"f(\\cblue{\\bv},\\cgreen{\\bw}) = \\wt{f}(\\cblue{\\bv}\\otimes\\cgreen{\\bw})"}),` für alle
`,e.jsx(n,{children:"\\cblue{\\bv}\\in V"})," und ",e.jsx(n,{children:"\\cgreen{\\bw}\\in W"}),`. Der Nullraum der Nullabbildung
leistet das nicht, denn über ihn lässt sich keine bilineare Abbildung
`,e.jsx(n,{children:"f \\neq 0"}),` faktorisieren. Das Tensorprodukt
`,e.jsx(i.em,{children:"linearisiert"})," also bilineare Abbildungen: Statt ",e.jsx(n,{children:"f"}),` auf Paaren auszuwerten,
wenden wir die lineare Abbildung `,e.jsx(n,{children:"\\wt{f}"})," auf elementare Tensoren an."]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"}),` mit dem äußeren Produkt, also
`,e.jsx(n,{children:"\\R^m \\otimes \\R^n = \\R^{m \\times n}"})," nach ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"}),`,
lässt sich die Eigenschaft direkt nachrechnen. Zu bilinearem `,e.jsx(n,{children:"f\\colon\\R^m\\times\\R^n\\to Z"}),`
setzen wir `,e.jsx(n,{children:"\\wt{f}(\\bA):=\\sum_{i=1}^m\\sum_{j=1}^n a_{ij}\\,f(\\be_i,\\be_j)"}),`.
Diese Abbildung ist linear, und wegen
`,e.jsx(n,{children:"\\bv\\bw^\\top=\\sum_{ij}v_iw_j\\bE_{ij}"})," mit der Matrix ",e.jsx(n,{children:"\\bE_{ij}"}),`, die an der
Stelle `,e.jsx(n,{children:"(i,j)"}),` eine Eins und sonst lauter Nullen trägt, liefert die Bilinearität
`,e.jsx(n,{children:"\\wt{f}(\\bv\\bw^\\top)=f(\\bv,\\bw)"}),"; eindeutig ist sie, weil die ",e.jsx(n,{children:"\\bE_{ij}"}),` den
Raum aufspannen.`]}),e.jsxs(i.p,{children:[`Tensorprodukte existieren und sind durch die universelle Eigenschaft bis auf
einen eindeutigen Isomorphismus festgelegt, der die elementaren Tensoren
respektiert. Deshalb dürfen wir mit einer konkreten Realisierung arbeiten, in
den folgenden Beispielen mit Matrizen beziehungsweise Funktionen. Gebraucht wird
die Eigenschaft im Skript nur noch für die lineare Unabhängigkeit der
Tensorproduktbasis in `,e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"V = \\R^m"})," und ",e.jsx(n,{children:"W = \\R^n"}),` sind die elementaren Tensoren genau die Matrizen
vom Rang höchstens `,e.jsx(n,{children:"1"})," (",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),"): Rang ",e.jsx(n,{children:"1"}),` für
`,e.jsx(n,{children:"\\cblue{\\bv}, \\cgreen{\\bw} \\neq \\bnull"}),", Rang ",e.jsx(n,{children:"0"}),`, wenn ein Faktor der
Nullvektor ist.`]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.4.2 (Rechenregeln aus der Bilinearität)",id:"env-rechenregeln-aus-der-bilinearitaet",children:[e.jsxs(i.p,{children:["Ausgeschrieben heißt Bilinearität (",e.jsx(t,{id:"env:multilineare-abbildung",href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),`):
Skalare Faktoren dürfen zwischen den Argumenten wandern, und in jedem Argument
dürfen wir Summen auseinanderziehen,`]}),e.jsx(l,{children:`(c\\,\\cblue{\\bv}) \\otimes \\cgreen{\\bw}
= c\\,(\\cblue{\\bv} \\otimes \\cgreen{\\bw})
= \\cblue{\\bv} \\otimes (c\\,\\cgreen{\\bw}) ,`}),e.jsx(l,{children:`(\\cblue{\\bv_1} + \\cblue{\\bv_2}) \\otimes \\cgreen{\\bw}
= \\cblue{\\bv_1} \\otimes \\cgreen{\\bw} + \\cblue{\\bv_2} \\otimes \\cgreen{\\bw} ,
\\qquad
\\cblue{\\bv} \\otimes (\\cgreen{\\bw_1} + \\cgreen{\\bw_2})
= \\cblue{\\bv} \\otimes \\cgreen{\\bw_1} + \\cblue{\\bv} \\otimes \\cgreen{\\bw_2} .`}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"c = 0"}),` folgt daraus
`,e.jsx(n,{children:"\\bnull \\otimes \\cgreen{\\bw} = \\cblue{\\bv} \\otimes \\bnull = \\bnull"}),`. Eine Summe
`,e.jsx(n,{children:"\\cblue{\\bv_1} \\otimes \\cgreen{\\bw_1} + \\cblue{\\bv_2} \\otimes \\cgreen{\\bw_2}"}),`
formen die Regeln dagegen nicht in ein einzelnes Produkt um.`]})]}),`
`,e.jsx(i.h3,{children:"Zwei Beispiele mit Zahlentupeln"}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.4.3 (Das Tensorprodukt von ℝᵐ und ℝⁿ)",id:"env-das-tensorprodukt-von-und",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\otimes"})," das äußere Produkt aus ",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`, also
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\cgreen{\\bw}^\\top \\in \\R^{m \\times n}"}),`.
Wir zeigen beide Inklusionen.`]}),e.jsxs(i.p,{children:["„",e.jsx(n,{children:"\\subseteq"}),'": Jedes ',e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),` ist eine
`,e.jsx(n,{children:"m \\times n"}),"-Matrix, und ",e.jsx(n,{children:"\\R^{m \\times n}"}),` ist ein Vektorraum
(`,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),`). Mit den Produkten liegen deshalb auch alle ihre
`,e.jsx(t,{id:"linear-combination",children:"Linearkombinationen"})," in ",e.jsx(n,{children:"\\R^{m \\times n}"}),"."]}),e.jsxs(i.p,{children:["„",e.jsx(n,{children:"\\supseteq"}),'": Für die Standardbasisvektoren ',e.jsx(n,{children:"\\be_i \\in \\R^m"}),` und
`,e.jsx(n,{children:"\\be_j \\in \\R^n"})," ist"]}),e.jsx(l,{children:"\\cblue{\\be_i} \\otimes \\cgreen{\\be_j} = \\cblue{\\be_i}\\cgreen{\\be_j}^\\top = \\bE_{ij} ,"}),e.jsxs(i.p,{children:["die Matrix mit einer ",e.jsx(n,{children:"\\corange{1}"})," an der Stelle ",e.jsx(n,{children:"(i,j)"}),` und sonst lauter Nullen.
Jede Matrix `,e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` schreibt sich als
`,e.jsx(n,{children:"\\corange{\\bA} = \\sum_{i=1}^m \\sum_{j=1}^n \\corange{a_{ij}} \\bE_{ij}"}),`, liegt also
im Spann der Produkte.`]}),e.jsxs(i.p,{children:["Damit ist ",e.jsx(n,{children:"\\R^m \\otimes \\R^n = \\R^{m \\times n}"}),` eine konkrete Realisierung des
Tensorprodukts, und nach `,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),` hat dieser Raum die
`,e.jsx(t,{id:"dimension",children:"Dimension"})," ",e.jsx(n,{children:"mn"}),"."]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.4.4 (Drei Faktoren)",id:"env-drei-faktoren",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"V_1 = \\R^m"}),", ",e.jsx(n,{children:"V_2 = \\R^n"}),", ",e.jsx(n,{children:"V_3 = \\R^q"})," und ",e.jsx(n,{children:"\\otimes"}),` das Tensorprodukt
von Tensoren aus `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),". Nach ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"}),` ist
`,e.jsx(n,{children:"V_1 \\otimes V_2 = \\R^{m \\times n}"}),`, und ein elementarer Tensor
`,e.jsx(n,{children:"\\corange{\\bA} \\otimes \\cgreen{\\bw}"})," mit ",e.jsx(n,{children:"\\corange{\\bA} \\in \\R^{m \\times n}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} \\in \\R^q"})," hat die Einträge ",e.jsx(n,{children:"\\corange{a_{ij}}\\cgreen{w_k}"}),`. Das ist
ein Tensor der Stufe `,e.jsx(n,{children:"3"}),", und dasselbe Argument wie eben zeigt"]}),e.jsx(l,{children:`V_1 \\otimes V_2 \\otimes V_3
= \\bigl(\\R^m \\otimes \\R^n\\bigr) \\otimes \\R^q
= \\R^{m \\times n} \\otimes \\R^q
= \\R^{m \\times n \\times q} .`}),e.jsxs(i.p,{children:[`Auf die Klammerung kommt es dabei nicht an
(`,e.jsx(t,{id:"env:das-tensorprodukt-ist-bilinear",href:"#env-das-tensorprodukt-ist-bilinear",children:"Satz 9.3.9"}),"). Die Dimension ist ",e.jsx(n,{children:"mnq"}),`, wieder nach
`,e.jsx(t,{id:"env:der-raum-aller-tensoren-eines-formats",href:"#env-der-raum-aller-tensoren-eines-formats",children:"Satz 9.2.5"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Ein einzelnes Produkt und der ganze Raum"}),`
`,e.jsxs(i.p,{children:["Die Ausdrücke ",e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," und ",e.jsx(n,{children:"V \\otimes W"}),` sehen ähnlich
aus und meinen Verschiedenes: ein einzelnes Element und den ganzen Raum, den
alle diese Elemente aufspannen.`]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.4.5 (Die Einheitsmatrix ist kein elementarer Tensor)",id:"env-die-einheitsmatrix-ist-kein-elementarer",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"V = W = \\R^2"})," und"]}),e.jsx(l,{children:"\\corange{\\bA} = \\bI_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} ."}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Kein einzelnes Produkt."})," Gäbe es ",e.jsx(n,{children:"\\cblue{\\bv}, \\cgreen{\\bw} \\in \\R^2"}),` mit
`,e.jsx(n,{children:"\\corange{\\bA} = \\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),`, so wären alle Spalten von
`,e.jsx(n,{children:"\\cblue{\\bv}\\cgreen{\\bw}^\\top"})," Vielfache von ",e.jsx(n,{children:"\\cblue{\\bv}"}),`, also
`,e.jsx(n,{children:"\\rang(\\cblue{\\bv} \\otimes \\cgreen{\\bw}) \\leq 1"})," (",e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`). Die
Einheitsmatrix hat aber den Rang `,e.jsx(n,{children:"\\cred{2}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Aber ein Element des Raums."})," In ",e.jsx(n,{children:"V \\otimes W = \\R^{2 \\times 2}"}),` liegt
`,e.jsx(n,{children:"\\bI_2"})," als Summe von zwei elementaren Tensoren:"]}),e.jsx(l,{children:`\\begin{aligned}
\\cblue{\\be_1} \\otimes \\cgreen{\\be_1} + \\cblue{\\be_2} \\otimes \\cgreen{\\be_2}
&= \\cblue{\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}}\\cgreen{\\begin{pmatrix} 1 & 0 \\end{pmatrix}}
 + \\cblue{\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}}\\cgreen{\\begin{pmatrix} 0 & 1 \\end{pmatrix}} \\\\
&= \\corange{\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}}
 + \\corange{\\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}}
 = \\corange{\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}} .
\\end{aligned}`}),e.jsx(i.p,{children:"Zwei Summanden genügen also."})]}),`
`,e.jsxs(h,{kind:"Satz",label:"9.4.6 (Jede Matrix ist eine kurze Summe elementarer Tensoren)",id:"env-jede-matrix-ist-eine-kurze-summe",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),`. Dann gibt
es `,e.jsx(n,{children:"\\cblue{\\bu_i} \\in \\R^m"}),", ",e.jsx(n,{children:"\\cgreen{\\bv_i} \\in \\R^n"})," und Zahlen ",e.jsx(n,{children:"\\corange{\\sigma_i} > 0"}),`
mit`]}),e.jsx(l,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i} ."}),e.jsxs(i.p,{children:["Insbesondere kommt jede Matrix mit höchstens ",e.jsx(n,{children:"\\min(m,n)"}),` elementaren Tensoren
aus.`]})]}),`
`,e.jsxs(q,{title:"Beweis über die Singulärwertzerlegung",children:[e.jsxs(ie,{children:[e.jsxs(T,{why:e.jsxs(e.Fragment,{children:["jeder Summand ist ein äußeres Produkt ",e.jsx(n,{children:"\\cblue{\\bu_i}\\cgreen{\\bv_i}^\\top = \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"}),", also ein elementarer Tensor"]}),children:[e.jsxs(i.p,{children:["Die ",e.jsx(t,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` liefert
`,e.jsx(n,{children:"\\bA = \\bU\\bSigma\\bV^\\top"})," (",e.jsx(t,{id:"env:singulaerwertzerlegung",href:"?k=06-svd#env-singulaerwertzerlegung",children:"Satz 6.2.13"}),` in
`,e.jsx(i.a,{href:"?k=06-svd#sec-6.2",children:"Abschnitt 6.2"}),`), und ausmultipliziert wird daraus die
Summenform`]}),e.jsx(l,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cblue{\\bu_i}\\cgreen{\\bv_i}^\\top"}),e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"r = \\rang(\\bA)"})," und ",e.jsx(n,{children:"\\corange{\\sigma_1} \\geq \\cdots \\geq \\corange{\\sigma_r} > 0"}),`
(`,e.jsx(t,{id:"env:summenform-der-svd",href:"?k=06-svd#env-summenform-der-svd",children:"Satz 6.4.2"})," in ",e.jsx(i.a,{href:"?k=06-svd#sec-6.4",children:"Abschnitt 6.4"}),`, im Kapitel schon in
`,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"})," aufgegriffen)."]})]}),e.jsx(T,{why:e.jsxs(e.Fragment,{children:["ein Unterraum des ",e.jsx(n,{children:"\\R^m"})," hat höchstens die Dimension ",e.jsx(n,{children:"m"}),"; ein Erzeugendensystem aus ",e.jsx(n,{children:"n"})," Vektoren spannt höchstens einen ",e.jsx(n,{children:"n"}),"-dimensionalen Raum auf"]}),children:e.jsxs(i.p,{children:["Für die Schranke bleibt ",e.jsx(n,{children:"r \\leq \\min(m,n)"}),` zu begründen. Der Rang ist die
Dimension des `,e.jsx(t,{id:"image",children:"Spaltenraums"})," ",e.jsx(n,{children:"\\col(\\bA) \\subseteq \\R^m"}),`, also ist
`,e.jsx(n,{children:"r \\leq m"}),". Zugleich wird ",e.jsx(n,{children:"\\col(\\bA)"})," von den ",e.jsx(n,{children:"n"}),` Spalten aufgespannt,
also ist `,e.jsx(n,{children:"r \\leq n"}),"."]})})]}),e.jsxs(i.p,{children:["Weniger als ",e.jsx(n,{children:"r"}),` Summanden reichen nicht. Wäre
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^{k} \\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"})," mit ",e.jsx(n,{children:"k < r"}),`, so
lägen alle Spalten von `,e.jsx(n,{children:"\\bA"}),` im Spann von
`,e.jsx(n,{children:"\\cblue{\\bu_1}, \\dots, \\cblue{\\bu_k}"}),", und der Rang wäre höchstens ",e.jsx(n,{children:"k"}),`. Die
kleinste Anzahl elementarer Tensoren, die eine Matrix darstellen, ist also genau
ihr Rang, und die SVD rechnet sie aus.`]})]}),`
`,e.jsx(i.h3,{children:"Die Tensorproduktbasis"}),`
`,e.jsxs(i.p,{children:["Eine ",e.jsx(t,{id:"basis",children:"Basis"})," von ",e.jsx(n,{children:"V \\otimes W"}),` entsteht aus Basen der beiden
Faktoren, indem wir alle Paare miteinander multiplizieren.`]}),`
`,e.jsxs(h,{kind:"Satz",label:"9.4.7 (Tensorproduktbasis)",id:"env-tensorproduktbasis",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\Bcal_V = \\{\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_m}\\}"})," eine Basis von ",e.jsx(n,{children:"V"}),` und
`,e.jsx(n,{children:"\\Bcal_W = \\{\\cgreen{\\bw_1}, \\dots, \\cgreen{\\bw_n}\\}"})," eine Basis von ",e.jsx(n,{children:"W"}),". Dann ist"]}),e.jsx(l,{children:`\\Bcal_{V \\otimes W}
= \\bigl\\{\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j} :
i = 1, \\dots, m, \\ j = 1, \\dots, n\\bigr\\}`}),e.jsxs(i.p,{children:["eine Basis von ",e.jsx(n,{children:"V \\otimes W"})," und heißt ",e.jsx(i.em,{children:"Tensorproduktbasis"}),` (tensor product
basis). Insbesondere gilt`]}),e.jsx(Z,{tag:"9.4.2",id:"eq-tensorproduktbasis",children:`V \\otimes W = \\spann\\bigl(\\Bcal_{V \\otimes W}\\bigr)
= \\biggl\\{\\sum_{i=1}^{m} \\sum_{j=1}^{n} \\corange{c_{ij}}\\,
\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j} :
\\corange{c_{11}}, \\dots, \\corange{c_{mn}} \\in \\R \\biggr\\}`}),e.jsx(i.p,{children:"und"}),e.jsx(l,{children:"\\dim(V \\otimes W) = \\dim(V)\\,\\dim(W) = mn ."})]}),`
`,e.jsx(q,{title:"Beweis der Tensorproduktbasis",children:e.jsxs(ie,{children:[e.jsxs(T,{why:e.jsx(e.Fragment,{children:"Bilinearität: Summen und skalare Faktoren dürfen aus jedem Argument einzeln heraus"}),children:[e.jsxs(i.p,{children:["Die Produkte erzeugen den Raum. Wir entwickeln ",e.jsx(n,{children:"\\cblue{\\bv} \\in V"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} \\in W"})," in den beiden Basen, ",e.jsx(n,{children:"\\cblue{\\bv} = \\sum_i a_i \\cblue{\\bv_i}"}),`
und `,e.jsx(n,{children:"\\cgreen{\\bw} = \\sum_j b_j \\cgreen{\\bw_j}"}),`, und ziehen die Summen mit
`,e.jsx(i.a,{href:"#env-rechenregeln-aus-der-bilinearitaet",children:"Bemerkung 9.4.2"}),` nach außen, zuerst im ersten, dann
im zweiten Argument:`]}),e.jsx(Z,{tag:"9.4.3",id:"eq-elementarer-tensor-in-produktbasis",children:`\\cblue{\\bv} \\otimes \\cgreen{\\bw}
= \\Bigl(\\sum_{i=1}^{m} a_i \\cblue{\\bv_i}\\Bigr) \\otimes \\cgreen{\\bw}
= \\sum_{i=1}^{m} \\sum_{j=1}^{n} a_i b_j\\,
\\bigl(\\cblue{\\bv_i} \\otimes \\cgreen{\\bw_j}\\bigr) .`}),e.jsxs(i.p,{children:["Jeder elementare Tensor liegt damit im Spann von ",e.jsx(n,{children:"\\Bcal_{V \\otimes W}"}),`, und da
die elementaren Tensoren nach `,e.jsx(t,{id:"env:tensorprodukt-von-vektorraeumen",href:"#env-tensorprodukt-von-vektorraeumen",children:"Definition 9.4.1"}),` den
ganzen Raum erzeugen, gilt die Darstellung `,e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),"."]})]}),e.jsxs(T,{why:e.jsx(e.Fragment,{children:"die universelle Eigenschaft macht aus jeder bilinearen Koordinatenabbildung genau eine lineare Abbildung auf dem Tensorproduktraum"}),children:[e.jsxs(i.p,{children:["Die Produkte sind linear unabhängig. Sei ",e.jsx(n,{children:`\\sum_i\\sum_j \\corange{c_{ij}}\\,
\\cblue{\\bv_i}\\otimes\\cgreen{\\bw_j}=\\bnull`}),". Zu festen Indizes ",e.jsx(n,{children:"(k,l)"})," ist"]}),e.jsx(l,{children:`(\\cblue{\\bv},\\cgreen{\\bw})\\longmapsto
a_k(\\cblue{\\bv})\\,b_l(\\cgreen{\\bw})`}),e.jsxs(i.p,{children:["bilinear, wobei ",e.jsx(n,{children:"a_k"})," und ",e.jsx(n,{children:"b_l"})," die ",e.jsx(n,{children:"k"}),"-te beziehungsweise ",e.jsx(n,{children:"l"}),`-te
Koordinatenfunktion in den beiden Basen sind. Die universelle Eigenschaft liefert
dazu eine lineare Abbildung auf `,e.jsx(n,{children:"V\\otimes W"}),`. Sie schickt
`,e.jsx(n,{children:"\\cblue{\\bv_i}\\otimes\\cgreen{\\bw_j}"})," auf ",e.jsx(n,{children:"1"}),", falls ",e.jsx(n,{children:"(i,j)=(k,l)"}),`, und sonst
auf `,e.jsx(n,{children:"0"}),`. Wenden wir sie auf die verschwindende Summe an, erhalten wir
`,e.jsx(n,{children:"\\corange{c_{kl}}=0"}),". Da ",e.jsx(n,{children:"(k,l)"})," beliebig war, verschwinden alle Koeffizienten."]})]}),e.jsx(T,{why:e.jsxs(e.Fragment,{children:["die ",e.jsx(n,{children:"mn"})," Produkte sind paarweise verschieden, denn sie sind nach dem zweiten Schritt ",e.jsx(t,{id:"linear-independence",children:"linear unabhängig"})]}),children:e.jsxs(i.p,{children:["Die Basis ",e.jsx(n,{children:"\\Bcal_{V \\otimes W}"})," enthält damit für jedes Paar ",e.jsx(n,{children:"(i,j)"}),` genau ein
Element, also `,e.jsx(n,{children:"mn"})," Stück."]})})]})}),`
`,e.jsx(h,{kind:"Bemerkung",label:"9.4.8 (Koeffizienten elementarer Tensoren)",id:"env-eine-feinheit",children:e.jsxs(i.p,{children:["Die Koeffizienten in ",e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),` sind beliebig. Bei einem elementaren
Tensor `,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"}),` mit
`,e.jsx(n,{children:"\\cblue{\\bv} = \\sum_i a_i \\cblue{\\bv_i}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bw} = \\sum_j b_j \\cgreen{\\bw_j}"}),` haben sie die Produktform
`,e.jsx(n,{children:"\\corange{c_{ij}} = a_i b_j"}),`, wie Ausmultiplizieren mit
`,e.jsx(i.a,{href:"#env-rechenregeln-aus-der-bilinearitaet",children:"Bemerkung 9.4.2"}),` zeigt
(`,e.jsx(i.a,{href:"#eq-elementarer-tensor-in-produktbasis",children:"(9.4.3)"}),`); bei einem allgemeinen Element von
`,e.jsx(n,{children:"V \\otimes W"})," nicht. In ",e.jsx(i.a,{href:"#env-die-einheitsmatrix-ist-kein-elementarer",children:"Beispiel 9.4.5"}),` ist die Koeffizientenmatrix bezüglich der
Standardbasen `,e.jsx(n,{children:"\\corange{\\bC} = \\bI_2"}),", und ",e.jsx(n,{children:"\\bI_2"}),` lässt sich nicht als
`,e.jsx(n,{children:"\\ba\\bb^\\top"})," schreiben."]})}),`
`,e.jsx(i.h3,{children:"Tensorproduktbasen für Funktionen"}),`
`,e.jsxs(i.p,{children:[`Der Basissatz gilt auch für Funktionenräume und wird dort zum Werkzeug für die
Approximation multivariater Funktionen. Der Raum der `,e.jsx(t,{id:"polynomial",children:"Polynome"}),`
vom Grad höchstens `,e.jsx(n,{children:"1"})," auf ",e.jsx(n,{children:"[0,1]"})," ist"]}),`
`,e.jsx(l,{children:"\\Pcal_1 = \\{p(x) = a_0 + a_1 x : a_0, a_1 \\in \\R\\}"}),`
`,e.jsxs(i.p,{children:["mit der Basis ",e.jsx(n,{children:"\\Bcal = \\{1, x\\}"}),", also ",e.jsx(n,{children:"\\dim(\\Pcal_1) = 2"}),`. Für zwei
`,e.jsx(t,{id:"function",children:"Funktionen"})," ",e.jsx(n,{children:"f, g\\colon [0,1] \\to \\R"})," setzen wir"]}),`
`,e.jsx(Z,{tag:"9.4.4",id:"eq-eq-9-4-3",children:"(\\cblue{f} \\otimes \\cgreen{g})(x, y) := \\cblue{f(x)}\\,\\cgreen{g(y)} ."}),`
`,e.jsxs(i.p,{children:[`Das Produkt zweier univariater Funktionen ist eine Funktion auf dem Quadrat
`,e.jsx(n,{children:"[0,1]^2"}),", und die Zuordnung ",e.jsx(n,{children:"(\\cblue{f}, \\cgreen{g}) \\mapsto \\cblue{f} \\otimes \\cgreen{g}"}),`
ist bilinear, denn Skalare und Summen in einem Argument ziehen sich punktweise
heraus. Im zweiten Faktor schreiben wir die Basis als `,e.jsx(n,{children:"\\{1, \\cgreen{y}\\}"}),`:
dieselben Funktionen, nur mit `,e.jsx(n,{children:"\\cgreen{y}"})," als Variable."]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.4.9 (Die Tensorproduktbasis von P₁ ⊗ P₁)",id:"env-die-tensorproduktbasis-von-p-p",children:[e.jsxs(i.p,{children:[e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"})," liefert aus ",e.jsx(n,{children:"\\Bcal_V = \\{1, x\\}"})," und ",e.jsx(n,{children:"\\Bcal_W = \\{1, y\\}"}),` die vier
Produkte, ausgewertet nach `,e.jsx(i.a,{href:"#eq-eq-9-4-3",children:"(9.4.4)"}),":"]}),e.jsx(l,{children:`\\begin{aligned}
\\phi_1(x,y) &= (\\cblue{1} \\otimes \\cgreen{1})(x,y) = 1 \\cdot 1 = 1 , &\\qquad
\\phi_2(x,y) &= (\\cblue{x} \\otimes \\cgreen{1})(x,y) = x \\cdot 1 = x , \\\\
\\phi_3(x,y) &= (\\cblue{1} \\otimes \\cgreen{y})(x,y) = 1 \\cdot y = y , &\\qquad
\\phi_4(x,y) &= (\\cblue{x} \\otimes \\cgreen{y})(x,y) = x \\cdot y = xy .
\\end{aligned}`}),e.jsxs(i.p,{children:["Sie bilden eine Basis von ",e.jsx(n,{children:"\\Pcal_1 \\otimes \\Pcal_1"}),`, dem Raum aller bivariaten
Polynome, die in jeder der beiden Variablen höchstens den Grad `,e.jsx(n,{children:"1"}),` haben. Die
Dimension ist`]}),e.jsx(l,{children:"\\dim(\\Pcal_1 \\otimes \\Pcal_1) = \\dim(\\Pcal_1)\\,\\dim(\\Pcal_1) = 2 \\cdot 2 = 4 ."}),e.jsxs(i.p,{children:["Die Koeffizienten ",e.jsx(n,{children:"\\corange{c_{ij}}"}),` nummerieren wir wie in
`,e.jsx(i.a,{href:"#eq-tensorproduktbasis",children:"(9.4.2)"}),", ",e.jsx(n,{children:"i"})," für den ersten und ",e.jsx(n,{children:"j"}),` für den zweiten Faktor:
`,e.jsx(n,{children:"\\corange{c_{11}}"})," gehört zu ",e.jsx(n,{children:"\\cblue{1} \\otimes \\cgreen{1}"}),`,
`,e.jsx(n,{children:"\\corange{c_{21}}"})," zu ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{1}"}),`,
`,e.jsx(n,{children:"\\corange{c_{12}}"})," zu ",e.jsx(n,{children:"\\cblue{1} \\otimes \\cgreen{y}"}),` und
`,e.jsx(n,{children:"\\corange{c_{22}}"})," zu ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{y}"}),"."]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.4.10 (Eine bivariate Funktion in dieser Basis)",id:"env-eine-bivariate-funktion-in-dieser-basis",children:[e.jsx(i.p,{children:"Nehmen wir"}),e.jsx(l,{children:"f(x,y) = 2 + 3x - y + 5xy ."}),e.jsx(i.p,{children:"Die Entwicklung ist abzulesen:"}),e.jsx(l,{children:`f = \\corange{2}\\,\\phi_1 + \\corange{3}\\,\\phi_2 + (\\corange{-1})\\,\\phi_3 + \\corange{5}\\,\\phi_4 ,
\\qquad
\\corange{c_{11}} = 2, \\quad \\corange{c_{21}} = 3, \\quad
\\corange{c_{12}} = -1, \\quad \\corange{c_{22}} = 5 .`})]}),`
`,e.jsx(h,{kind:"Bemerkung",label:"9.4.11 (Was der Produktbau bedeutet)",id:"env-was-der-produktbau-bedeutet",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Halten wir ",e.jsx(n,{children:"\\cgreen{y}"})," fest, so ist ",e.jsx(n,{children:"x \\mapsto f(x, \\cgreen{y})"}),` ein Polynom
aus `,e.jsx(n,{children:"\\Pcal_1"}),`, und umgekehrt: Jeder achsenparallele Schnitt durch die Fläche
ist eine Gerade.`]}),`
`,e.jsxs(i.li,{children:["Ohne den Basisvektor ",e.jsx(n,{children:"\\cblue{x} \\otimes \\cgreen{y}"})," ist ",e.jsx(n,{children:"f"}),` eine Ebene, die
beiden Variablen wirken rein additiv. Erst `,e.jsx(n,{children:"\\corange{c_{22}}"}),` koppelt sie:
Die Steigung in `,e.jsx(n,{children:"x"}),`-Richtung ist
`,e.jsx(n,{children:"\\corange{c_{21}} + \\corange{c_{22}}\\cgreen{y}"}),` und hängt vom festgehaltenen
`,e.jsx(n,{children:"\\cgreen{y}"})," ab."]}),`
`,e.jsxs(i.li,{children:[`Tensorprodukträume begrenzen den Grad in jeder Variablen einzeln, nicht den
Gesamtgrad: `,e.jsx(n,{children:"xy"})," hat in ",e.jsx(n,{children:"x"})," und in ",e.jsx(n,{children:"y"})," den Grad ",e.jsx(n,{children:"1"}),`, insgesamt aber den
Grad `,e.jsx(n,{children:"2"}),"."]}),`
`]})}),`
`,e.jsxs(X,{title:"Vier Koeffizienten, eine Fläche",children:[e.jsxs(i.p,{children:[`Wie verändern die vier Koeffizienten die Fläche, und woran erkennen wir, ob
`,e.jsx(n,{children:"c_{22}"})," die beiden Variablen koppelt?"]}),e.jsx(Vn,{}),e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"c_{22} = 0"}),` ist die Fläche eine Ebene, und die Höhenlinien sind parallele
Geraden. Ein `,e.jsx(n,{children:"c_{22} \\neq 0"}),` biegt die Ebene: Die Höhenlinien krümmen sich, und
die Steigung in `,e.jsx(n,{children:"x"}),"-Richtung hängt vom gewählten ",e.jsx(n,{children:"y"})," ab."]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.4.12 (Allgemeine Dimension und Fluch der Dimensionalität)",id:"env-allgemeine-dimension-und-was-sie-kostet",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"k"}),"-variate Polynome mit Grad höchstens ",e.jsx(n,{children:"d"}),` in jeder Variablen ist der
zugehörige Raum das `,e.jsx(n,{children:"k"}),`-fache Tensorprodukt
`,e.jsx(n,{children:"\\Pcal_d^{\\otimes k} = \\Pcal_d \\otimes \\cdots \\otimes \\Pcal_d"}),", und ",e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`
liefert seine Dimension als `,e.jsx(n,{children:"k"}),"-faches Produkt:"]}),e.jsx(l,{children:"\\dim\\bigl(\\Pcal_d^{\\otimes k}\\bigr) = (d+1)^k ."}),e.jsxs(i.p,{children:["Das wächst exponentiell in der Zahl der Variablen. Für ",e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"}),` sind
das `,e.jsx(n,{children:"4^{10} = 1\\,048\\,576"}),` Basisfunktionen. Zum Vergleich: Der Raum der Polynome
mit `,e.jsx(i.em,{children:"Gesamtgrad"})," höchstens ",e.jsx(n,{children:"d"})," in ",e.jsx(n,{children:"k"})," Variablen hat nur ",e.jsx(n,{children:"\\binom{d+k}{k}"}),`
Dimensionen, für `,e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"})," also ",e.jsx(n,{children:"\\binom{13}{10} = 286"}),`. Dieses
exponentielle Wachstum heißt `,e.jsx(i.em,{children:"Fluch der Dimensionalität"}),` (curse of
dimensionality).`]}),e.jsx(i.p,{children:"Verwendet wird die Konstruktion trotzdem vielfach:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Finite-Elemente-Methoden:"}),` Auf Rechteckgittern werden Lösungen partieller
Differentialgleichungen durch tensorbasierte Polynome approximiert.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Statistik:"}),` Tensorprodukt-Splines dienen der multivariaten Regression, etwa
in generalisierten additiven Modellen (generalized additive models, GAM).`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Numerik:"})," Dünne Gitter (sparse grids) wählen aus den ",e.jsx(n,{children:"(d+1)^k"}),`
Basisfunktionen gezielt aus und drücken den Aufwand damit weit unter den des
vollen Produktgitters.`]}),`
`]})]}),`
`,e.jsxs(h,{kind:"Bemerkung",label:"9.4.13 (Kronecker-Designmatrix für Tensorprodukt-Splines)",id:"env-kronecker-designmatrix-tensorprodukt-splines",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\bB_x \\in \\R^{n_x \\times K_x}"}),` und
`,e.jsx(n,{children:"\\bB_y \\in \\R^{n_y \\times K_y}"}),` die Auswertungsmatrizen zweier univariater
B-Spline-Basen auf Gitterpunkten `,e.jsx(n,{children:"x_1, \\dots, x_{n_x}"})," bzw. ",e.jsx(n,{children:"y_1, \\dots, y_{n_y}"}),`,
also `,e.jsx(n,{children:"(\\bB_x)_{ij} = B_j(x_i)"})," mit der ",e.jsx(n,{children:"j"}),"-ten Basisfunktion ",e.jsx(n,{children:"B_j"}),`, analog
`,e.jsx(n,{children:"(\\bB_y)_{lk} = \\wt{B}_k(y_l)"}),`. Die Tensorprodukt-Spline-Fläche
`,e.jsx(n,{children:"f(x,y) = \\sum_{j,k} c_{jk}\\,B_j(x)\\,\\wt{B}_k(y)"}),` mit der Koeffizientenmatrix
`,e.jsx(n,{children:"\\bC = (c_{jk}) \\in \\R^{K_x \\times K_y}"})," hat auf dem ",e.jsx(n,{children:"n_x \\times n_y"}),`-Gitter die
Werte `,e.jsx(n,{children:"\\bF = \\bB_x\\bC\\bB_y^\\top"}),`. Der vec-Trick aus
`,e.jsx(t,{id:"env:vektorisierung-eines-matrixprodukts",href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"})," liefert"]}),e.jsx(l,{children:"\\vec(\\bF) = \\bigl(\\bB_y \\kron \\bB_x\\bigr)\\vec(\\bC)."}),e.jsxs(i.p,{children:["Die Designmatrix des Gitters ist also das ",e.jsx(t,{id:"env:kroneckerprodukt",children:"Kroneckerprodukt"}),`
`,e.jsx(n,{children:"\\bB_y \\kron \\bB_x"}),". In R, mit je sechs B-Splines auf ",e.jsx(n,{children:"50"})," Punkten je Achse:"]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`library(splines)
x <- seq(0, 1, length.out = 50)
Bx <- bs(x, df = 6)  # B-Spline-Basis
By <- bs(x, df = 6)
B <- kronecker(By, Bx)
dim(B)  # 2500 Gitterpunkte, 6*6 Koeffizienten
`})}),e.jsxs(i.p,{children:[`Dicht ausgeschrieben hat die Designmatrix das Format
`,e.jsx(n,{children:"(n_xn_y) \\times (K_xK_y)"})," und damit ",e.jsx(n,{children:"n_xn_yK_xK_y"}),` Einträge, die beiden
Faktoren zusammen nur `,e.jsx(n,{children:"n_xK_x+n_yK_y"}),". Deshalb werten wir ",e.jsx(n,{children:"\\bB_x\\bC\\bB_y^\\top"}),`
mit zwei kleinen Matrixprodukten aus, statt die große Designmatrix aufzubauen;
das spart Speicher und meist auch Rechenzeit.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(ne,{children:[e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Wenn wir im Widget ",e.jsx(n,{children:"c_{22}"})," auf null setzen, wird die dargestellte Fläche eine Ebene."]}),e.jsx(i.p,{children:"Dann hängt die Steigung in x-Richtung nicht mehr vom gewählten y-Wert ab."})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Mit dem äußeren Produkt als ",e.jsx(n,{children:"\\otimes"})," ist ",e.jsx(n,{children:"\\R^2 \\otimes \\R^3 = \\R^{2 \\times 3}"}),`,
und dieser Raum hat die Dimension `,e.jsx(n,{children:"6"}),"."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(i.a,{href:"#env-das-tensorprodukt-von-und",children:"Beispiel 9.4.3"})," mit ",e.jsx(n,{children:"m = 2"})," und ",e.jsx(n,{children:"n = 3"}),`; nach
`,e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"})," ist die Dimension ",e.jsx(n,{children:"2 \\cdot 3 = 6"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Jedes Element von ",e.jsx(n,{children:"V \\otimes W"}),` lässt sich als ein einzelnes Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw"})," schreiben."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"V \\otimes W"}),` ist der Spann der elementaren Tensoren, und Summen von Produkten
sind im Allgemeinen selbst keine Produkte. `,e.jsx(i.a,{href:"#env-die-einheitsmatrix-ist-kein-elementarer",children:"Beispiel 9.4.5"}),` zeigt das an
`,e.jsx(n,{children:"\\bI_2 \\in \\R^2 \\otimes \\R^2"}),`: Als Produkt hätte die Matrix höchstens den Rang
`,e.jsx(n,{children:"1"}),", sie hat aber den Rang ",e.jsx(n,{children:"2"}),". Als Summe von zwei elementaren Tensoren geht es."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Für Vektorräume ",e.jsx(n,{children:"V"})," und ",e.jsx(n,{children:"W"})," gilt ",e.jsx(n,{children:"\\dim(V \\otimes W) = \\dim(V) + \\dim(W)"}),"."]}),e.jsxs(i.p,{children:["Die Dimensionen multiplizieren sich, sie addieren sich nicht (",e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`). Für
`,e.jsx(n,{children:"\\dim(V) = 2"})," und ",e.jsx(n,{children:"\\dim(W) = 3"})," ist ",e.jsx(n,{children:"\\dim(V \\otimes W) = 6"})," und nicht ",e.jsx(n,{children:"5"}),"."]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Jede Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist eine Summe von höchstens ",e.jsx(n,{children:"\\min(m,n)"}),`
elementaren Tensoren.`]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(t,{id:"env:jede-matrix-ist-eine-kurze-summe",href:"#env-jede-matrix-ist-eine-kurze-summe",children:"Satz 9.4.6"}),`. Die Summenform der Singulärwertzerlegung liefert
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^r \\sigma_i \\bu_i \\otimes \\bv_i"})," mit ",e.jsx(n,{children:"r = \\rang(\\bA)"}),`, und der
Rang übersteigt weder die Zeilen- noch die Spaltenzahl.`]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["In der Darstellung ",e.jsx(n,{children:"\\sum_i \\sum_j c_{ij}\\, \\bv_i \\otimes \\bw_j"}),` haben die
Koeffizienten stets die Form `,e.jsx(n,{children:"c_{ij} = a_i b_j"}),"."]}),e.jsxs(i.p,{children:[`Diese Produktform haben genau die elementaren Tensoren
(`,e.jsx(i.a,{href:"#env-eine-feinheit",children:"Bemerkung 9.4.8"}),"). Allgemeine Elemente von ",e.jsx(n,{children:"V \\otimes W"}),` haben
beliebige Koeffizienten; bezüglich der Standardbasen ist die Koeffizientenmatrix
zu `,e.jsx(n,{children:"\\bI_2"})," die Einheitsmatrix selbst, und die hat nicht die Form ",e.jsx(n,{children:"\\ba\\bb^\\top"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Basis ",e.jsx(n,{children:"\\{1 \\otimes 1,\\ x \\otimes 1,\\ 1 \\otimes y,\\ x \\otimes y\\}"}),` spannt alle
Polynome in zwei Variablen vom Gesamtgrad höchstens `,e.jsx(n,{children:"2"})," auf."]}),e.jsxs(i.p,{children:[`Sie spannt die Polynome auf, die in jeder Variablen einzeln höchstens den Grad
`,e.jsx(n,{children:"1"}),` haben, und das sind vier Basisfunktionen. Der Raum aller Polynome vom
Gesamtgrad höchstens `,e.jsx(n,{children:"2"})," hat dagegen die Dimension ",e.jsx(n,{children:"\\binom{4}{2} = 6"}),`: Es fehlen
`,e.jsx(n,{children:"x^2"})," und ",e.jsx(n,{children:"y^2"}),`. Tensorprodukträume begrenzen den Grad in jeder Variablen
einzeln, nicht den Gesamtgrad (Bemerkungen `,e.jsx(i.a,{href:"#env-was-der-produktbau-bedeutet",children:"9.4.11"})," und ",e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"9.4.12"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. MML §2.6 zu Basis und Dimension eines Vektorraums und MML §4.5
bis §4.6, wo die Zerlegung einer Matrix in Rang-1-Anteile ausgeführt wird.`})})]})}function Tn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(He,{...r})}):He(r)}const{blau:Ue,gruen:Je,orange:fe,rot:qn}=Q,ve=(r,i)=>r.map(s=>i[0].map((a,d)=>s.reduce((o,c,u)=>o+c*i[u][d],0))),Qe=r=>r[0].map((i,s)=>r.map(a=>a[s])),Ye=(r,i)=>r.flatMap(s=>i.map(a=>s.flatMap(d=>a.map(o=>d*o)))),_e=r=>r[0].flatMap((i,s)=>r.map(a=>a[s])),we=r=>r.map(i=>[i]),U=[{name:"Beispiel 9.5.4",A:[[1,2],[0,1]],X:[[1,0],[2,3]],B:[[1,1],[0,2]]},{name:"B = I",A:[[1,2],[0,1]],X:[[1,0],[2,3]],B:[[1,0],[0,1]]},{name:"A = I",A:[[1,0],[0,1]],X:[[1,0],[2,3]],B:[[1,1],[0,2]]}];function Kn(){const[r,i]=_.useState(U[0].A),[s,a]=_.useState(U[0].X),[d,o]=_.useState(U[0].B),[c,u]=_.useState("richtig"),[b,m]=_.useState(!1),f=_.useMemo(()=>ve(ve(r,s),d),[r,s,d]),k=_.useMemo(()=>c==="richtig"?Ye(Qe(d),r):Ye(r,Qe(d)),[r,d,c]),j=c==="richtig"?"Bᵀ ⊗_K A":"A ⊗_K Bᵀ",x=_e(f),K=_e(ve(k,we(_e(s)))),z=Math.max(...x.map((S,V)=>Math.abs(S-K[V]))),y=z<1e-9,g=S=>{i(U[S].A),a(U[S].X),o(U[S].B)};return e.jsxs("div",{className:"rounded p-3",style:{backgroundColor:"var(--w-bg)"},children:[e.jsx(L,{children:"Wählen wir die Reihenfolge der Kroneckerfaktoren und prüfen wir die beiden orangefarbenen Vektoren Eintrag für Eintrag: Nur eine der beiden Anordnungen liefert denselben Vektor."}),e.jsxs("div",{className:"my-2 text-xs",children:[e.jsx("span",{style:{color:Ue},children:"A"})," wirkt links, ",e.jsx("span",{style:{color:Je},children:"B"})," rechts; ",e.jsx("span",{style:{color:fe},children:"orange"})," markiert die beiden zu vergleichenden Ergebnisvektoren."]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",children:"C = A X B"}),e.jsx(G,{value:f})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:fe},children:"vec(C)"}),e.jsx(G,{value:we(x)})]}),e.jsx("span",{"aria-hidden":"true",className:"text-xl",children:y?"=":"≠"}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-sm",style:{color:fe},children:["(",j,") vec(X)"]}),e.jsx(G,{value:we(K)})]})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[U.map((S,V)=>e.jsx("button",{type:"button",className:W,onClick:()=>g(V),children:S.name},S.name)),e.jsx("button",{type:"button","aria-pressed":c==="richtig",className:c==="richtig"?ee:W,onClick:()=>u("richtig"),children:"Bᵀ ⊗_K A"}),e.jsx("button",{type:"button","aria-pressed":c==="vertauscht",className:c==="vertauscht"?ee:W,onClick:()=>u("vertauscht"),children:"A ⊗_K Bᵀ"})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap items-start gap-4",children:[e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",style:{color:Ue},children:"A"}),e.jsx(he,{value:r,onChange:i,step:1,min:-4,max:4})]}),e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",children:"X (unbekannt)"}),e.jsx(he,{value:s,onChange:a,step:1,min:-4,max:4})]}),e.jsxs("label",{children:[e.jsx("span",{className:"block text-sm",style:{color:Je},children:"B"}),e.jsx(he,{value:d,onChange:o,step:1,min:-4,max:4})]}),e.jsx("button",{type:"button",className:W,onClick:()=>m(S=>!S),children:b?"Operator verbergen":`Operator ${j} zeigen`}),b&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm",style:{color:qn},children:j}),e.jsx(G,{value:k})]})]}),e.jsx(O,{kind:c==="richtig"?"ok":y?"neutral":"fail",children:c==="richtig"?"Die vier Einträge stimmen überein, und zwar für jede Wahl von A, X und B. Aus A X B = C wird damit das LGS (Bᵀ ⊗_K A) vec(X) = vec(C) mit vier Unbekannten.":y?"Hier fallen beide Anordnungen zufällig zusammen – bei diesen speziellen Faktoren. Ein einzelner Treffer beweist nichts: Ändern wir A oder B, laufen die Vektoren auseinander.":`Die beiden Seiten weichen um ${p(z,4)} ab. A ⊗_K Bᵀ ist also nicht der Operator aus ${tn("satz:vektorisierung-eines-matrixprodukts")}; auf die spaltenweise gestapelten Einträge wirkt nur Bᵀ ⊗_K A richtig.`})]})}function en(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Die Kernkonzepte"}),`
`,e.jsx(h,{kind:"Bemerkung",label:"9.5.1 (Sechs Begriffe)",id:"env-sechs-begriffe-die-bleiben",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:e.jsx(t,{id:"tensor",children:"Tensoren"})}),` verallgemeinern Vektoren und Matrizen auf beliebig
viele Indexpositionen: Ein Tensor der Stufe `,e.jsx(n,{children:"k"})," ist eine durch ",e.jsx(n,{children:"k"}),` Indizes
indizierte Familie reeller Zahlen, ein Element von
`,e.jsx(n,{children:"\\R^{n_1 \\times \\cdots \\times n_k}"})," (",e.jsx(t,{id:"env:tensor",href:"#env-tensor",children:"Definition 9.2.3"}),`). Höhere Stufen
braucht das Deep Learning, die Bild- und Videobearbeitung und die moderne
Statistik.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Multilinearität"}),` heißt Linearität in jedem einzelnen Argument bei
festgehaltenen übrigen (`,e.jsx(t,{id:"env:multilineare-abbildung",href:"#env-multilineare-abbildung",children:"Definition 9.1.1"}),`). Linear im Ganzen
ist eine multilineare Abbildung in der Regel nicht: Skalieren wir alle `,e.jsx(n,{children:"n"}),`
Argumente mit demselben `,e.jsx(n,{children:"c"}),", tritt ",e.jsx(n,{children:"\\cred{c^n}"})," heraus statt ",e.jsx(n,{children:"\\cred{c}"}),`
(`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),`). So ist die
`,e.jsx(t,{id:"matrix-multiplication",children:"Matrizenmultiplikation"}),` bilinear, aber nicht
linear.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Das ",e.jsx(t,{id:"outer-product",children:"äußere Produkt"})]}),`
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw} = \\cblue{\\bv}\\,\\cgreen{\\bw}^\\top"}),` macht aus
zwei Vektoren `,e.jsx(n,{children:"\\neq \\bnull"})," eine Matrix vom Rang ",e.jsx(n,{children:"1"}),`
(`,e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"}),`). Die
`,e.jsx(t,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),` zerlegt umgekehrt
jede Matrix in solche Bausteine,
`,e.jsx(n,{children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\,\\cblue{\\bu_i} \\otimes \\cgreen{\\bv_i}"}),`
(`,e.jsx(i.a,{href:"#env-die-svd-als-summe-aeusserer-produkte",children:"Bemerkung 9.3.5"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Das Tensorprodukt"}),` überträgt diese Vorschrift auf beliebige Stufen: Die
Stufen addieren sich, die Einträge multiplizieren sich
(`,e.jsx(t,{id:"env:tensorprodukt",href:"#env-tensorprodukt",children:"Definition 9.3.7"}),", ",e.jsx(i.a,{href:"#env-stufen-addieren-sich-eintraege",children:"Bemerkung 9.3.8"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Das Kroneckerprodukt"}),` ist die flach angeordnete Fassung für zwei Matrizen,
dieselben Zahlen als Blockmatrix statt als Tensor der Stufe `,e.jsx(n,{children:"4"}),`
(`,e.jsx(i.a,{href:"#env-zwei-bedeutungen-zwei-zeichen",children:"Bemerkung 9.3.12"}),`). Es liefert den vec-Trick
`,e.jsx(n,{children:"\\vec(\\cblue{\\bA}\\bX\\cgreen{\\bB}) = (\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA})\\vec(\\bX)"}),`
(`,e.jsx(t,{id:"env:vektorisierung-eines-matrixprodukts",href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),`), der Matrixgleichungen in
lineare Gleichungssysteme übersetzt, und in der Statistik separierbare und
blockdiagonale `,e.jsx(t,{id:"covariance-matrix",children:"Kovarianzmatrizen"}),`
(`,e.jsx(t,{id:"env:separierbare-kovarianz",href:"#env-separierbare-kovarianz",children:"Definition 9.3.17"}),", ",e.jsx(i.a,{href:"#env-i-n-k-s-ist-blockdiagonal",children:"Beispiel 9.3.16"}),")."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Tensorprodukte bauen größere Räume aus kleineren."}),` Der Raum
`,e.jsx(n,{children:"V \\otimes W"})," ist die ",e.jsx(t,{id:"span",children:"lineare Hülle"}),` aller Produkte
`,e.jsx(n,{children:"\\cblue{\\bv} \\otimes \\cgreen{\\bw}"})," (",e.jsx(t,{id:"env:tensorprodukt-von-vektorraeumen",href:"#env-tensorprodukt-von-vektorraeumen",children:"Definition 9.4.1"}),`),
und aus Basen der Faktoren entsteht durch Ausmultiplizieren eine
`,e.jsx(t,{id:"basis",children:"Basis"}),` des Produktraums mit
`,e.jsx(n,{children:"\\dim(V \\otimes W) = \\dim(V)\\dim(W)"})," (",e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"}),`). Mit
Funktionenräumen als Faktoren liefert das multivariate Basen aus univariaten,
etwa für höherdimensionale Splines; auf Gittern ist ihre Designmatrix ein
Kroneckerprodukt (`,e.jsx(i.a,{href:"#env-kronecker-designmatrix-tensorprodukt-splines",children:"Bemerkung 9.4.13"}),")."]}),`
`]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Vektorisierung von Matrixgleichungen"}),`
`,e.jsxs(i.p,{children:["Punkt 5 verbindet dieses Kapitel mit ",e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),`, deshalb führen wir ihn aus. Eine
Gleichung der Bauart `,e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB} = \\bC"}),` ist linear in der
Unbekannten `,e.jsx(n,{children:"\\bX"}),`, aber diese Unbekannte ist eine Matrix. Die Verfahren aus
`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"})," erwarten ein System ",e.jsx(n,{children:"\\bA\\bx = \\bb"}),` mit einem Vektor als
Unbekannter. Also stapeln wir die Matrix zu einem Vektor um.`]}),`
`,e.jsxs(h,{kind:"Definition",label:"9.5.2 (Vektorisierung)",id:"env-zusammenfassung-vektorisierung",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bX \\in \\R^{p \\times q}"})," mit den Spalten ",e.jsx(n,{children:"\\bx_1, \\dots, \\bx_q \\in \\R^p"}),` ist
die `,e.jsx(i.em,{children:"Vektorisierung"})," (vectorization)"]}),e.jsx(l,{children:"\\vec(\\bX) = \\begin{pmatrix} \\bx_1 \\\\ \\vdots \\\\ \\bx_q \\end{pmatrix} \\in \\R^{pq} ,"}),e.jsxs(i.p,{children:["also der Vektor, der die Spalten von ",e.jsx(n,{children:"\\bX"}),` untereinanderhängt. Gestapelt wird
spaltenweise, so wie R eine Matrix ohnehin abspeichert.`]})]}),`
`,e.jsxs(h,{kind:"Satz",label:"9.5.3 (Vektorisierung eines Matrixprodukts, vec-Trick)",id:"env-vektorisierung-eines-matrixprodukts",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\bA} \\in \\R^{m \\times p}"}),", ",e.jsx(n,{children:"\\bX \\in \\R^{p \\times q}"}),` und
`,e.jsx(n,{children:"\\cgreen{\\bB} \\in \\R^{q \\times n}"}),". Dann gilt"]}),e.jsx(Z,{tag:"9.5.1",id:"eq-vektorisierung-eines-matrixprodukts",children:`\\vec\\bigl(\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB}\\bigr)
= \\bigl(\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}\\bigr)\\,\\vec(\\bX) .`}),e.jsxs(i.p,{children:["Insbesondere ist ",e.jsx(n,{children:"\\vec(\\cblue{\\bA}\\bX) = (\\bI_q \\kron \\cblue{\\bA})\\vec(\\bX)"}),` und
`,e.jsx(n,{children:"\\vec(\\bX\\cgreen{\\bB}) = (\\cgreen{\\bB^\\top} \\kron \\bI_p)\\vec(\\bX)"}),`. Die Matrix
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"})," hat das Format ",e.jsx(n,{children:"nm \\times qp"}),`, passend zu
`,e.jsx(n,{children:"\\vec(\\bX) \\in \\R^{pq}"})," und ",e.jsx(n,{children:"\\vec(\\cblue{\\bA}\\bX\\cgreen{\\bB}) \\in \\R^{mn}"}),"."]})]}),`
`,e.jsx(q,{title:"Der vec-Trick, blockweise nachgerechnet",children:e.jsxs(ie,{children:[e.jsxs(T,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\bB}\\be_j"})," ist die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\cgreen{\\bB}"}),"; ein Matrix-Vektor-Produkt ist die Linearkombination der Spalten mit den Einträgen des Vektors"]}),children:[e.jsxs(i.p,{children:["Wir lesen beide Seiten blockweise, mit Blöcken der Länge ",e.jsx(n,{children:"m"}),`. Sind
`,e.jsx(n,{children:"\\bx_1, \\dots, \\bx_q"})," die Spalten von ",e.jsx(n,{children:"\\bX"}),` und
`,e.jsx(n,{children:"\\cgreen{b_{kj}}"})," die Einträge von ",e.jsx(n,{children:"\\cgreen{\\bB}"}),", so ist die ",e.jsx(n,{children:"j"}),`-te Spalte von
`,e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB}"})]}),e.jsx(l,{children:`\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB}\\be_j
= \\cblue{\\bA}\\,\\bX \\begin{pmatrix} \\cgreen{b_{1j}} \\\\ \\vdots \\\\ \\cgreen{b_{qj}} \\end{pmatrix}
= \\sum_{k=1}^{q} \\cgreen{b_{kj}}\\; \\cblue{\\bA}\\,\\bx_k .`})]}),e.jsx(T,{why:e.jsxs(e.Fragment,{children:["Blockmultiplikation: der ",e.jsx(n,{children:"j"}),"-te Block eines Produkts ist die Summe der Blockprodukte über ",e.jsx(n,{children:"k"}),"; das Transponieren vertauscht die Indizes, deshalb steht dort ",e.jsx(n,{children:"\\cgreen{b_{kj}}"})," und nicht ",e.jsx(n,{children:"\\cgreen{b_{jk}}"})]}),children:e.jsxs(i.p,{children:["Auf der rechten Seite von ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),` zerlegen wir
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"})," nach ",e.jsx(t,{id:"env:kroneckerprodukt",href:"#env-kroneckerprodukt",children:"Definition 9.3.11"}),` in Blöcke der
Größe `,e.jsx(n,{children:"m \\times p"}),". Der Block an der Stelle ",e.jsx(n,{children:"(j,k)"}),` ist
`,e.jsx(n,{children:"\\bigl(\\cgreen{\\bB^\\top}\\bigr)_{jk}\\,\\cblue{\\bA} = \\cgreen{b_{kj}}\\,\\cblue{\\bA}"}),`,
und der `,e.jsx(n,{children:"k"}),"-te Block von ",e.jsx(n,{children:"\\vec(\\bX)"})," ist ",e.jsx(n,{children:"\\bx_k"}),". Der ",e.jsx(n,{children:"j"}),`-te Block des Produkts
lautet damit `,e.jsx(n,{children:"\\sum_{k=1}^{q} \\cgreen{b_{kj}}\\,\\cblue{\\bA}\\,\\bx_k"}),`. Das ist
die Spalte aus Schritt 1, und da `,e.jsx(n,{children:"j"}),` beliebig war, stimmen beide Seiten
überein.`]})})]})}),`
`,e.jsxs(X,{title:"Die Matrixgleichung als lineares System",children:[e.jsxs(i.p,{children:["Welche Anordnung der Kroneckerfaktoren liefert denselben Vektor wie ",e.jsx(n,{children:"\\vec(\\bA\\bX\\bB)"}),", auch wenn wir die Einträge verändern?"]}),e.jsx(Kn,{}),e.jsxs(i.p,{children:["Nur ",e.jsx(n,{children:"\\bB^\\top \\kron \\bA"})," stimmt für jede Wahl von ",e.jsx(n,{children:"\\bA"}),", ",e.jsx(n,{children:"\\bX"})," und ",e.jsx(n,{children:"\\bB"}),`;
`,e.jsx(n,{children:"\\bA \\kron \\bB^\\top"}),` trifft höchstens bei speziellen Faktoren zufällig. Aus
`,e.jsx(n,{children:"\\bA\\bX\\bB = \\bC"}),` wird so ein gewöhnliches lineares Gleichungssystem in
`,e.jsx(n,{children:"\\vec(\\bX)"}),"."]})]}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.5.4 (Die Identität an 2×2-Matrizen)",id:"env-die-identitaet-an-2-2-matrizen",children:[e.jsx(i.p,{children:"Für"}),e.jsx(l,{children:`\\cblue{\\bA} = \\begin{pmatrix} \\cblue{1} & \\cblue{2} \\\\ \\cblue{0} & \\cblue{1} \\end{pmatrix} ,
\\qquad
\\bX = \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} ,
\\qquad
\\cgreen{\\bB} = \\begin{pmatrix} \\cgreen{1} & \\cgreen{1} \\\\ \\cgreen{0} & \\cgreen{2} \\end{pmatrix}`}),e.jsx(i.p,{children:"rechnen wir zuerst direkt:"}),e.jsx(l,{children:`\\cblue{\\bA}\\,\\bX = \\begin{pmatrix} 5 & 6 \\\\ 2 & 3 \\end{pmatrix} ,
\\qquad
\\cblue{\\bA}\\,\\bX\\,\\cgreen{\\bB} = \\begin{pmatrix} \\corange{5} & \\corange{17} \\\\ \\corange{2} & \\corange{8} \\end{pmatrix} ,
\\qquad
\\vec\\bigl(\\cblue{\\bA}\\bX\\cgreen{\\bB}\\bigr) = \\begin{pmatrix} \\corange{5} \\\\ \\corange{2} \\\\ \\corange{17} \\\\ \\corange{8} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Und nun über ",e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),`. Mit
`,e.jsx(n,{children:"\\cgreen{\\bB^\\top} = \\bigl(\\begin{smallmatrix} \\cgreen{1} & \\cgreen{0} \\\\ \\cgreen{1} & \\cgreen{2} \\end{smallmatrix}\\bigr)"}),`
ist`]}),e.jsx(l,{children:`\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}
= \\begin{pmatrix} \\cgreen{1}\\cdot\\cblue{\\bA} & \\cgreen{0}\\cdot\\cblue{\\bA} \\\\ \\cgreen{1}\\cdot\\cblue{\\bA} & \\cgreen{2}\\cdot\\cblue{\\bA} \\end{pmatrix}
= \\begin{pmatrix}
1 & 2 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
1 & 2 & 2 & 4 \\\\
0 & 1 & 0 & 2
\\end{pmatrix} ,
\\qquad
\\vec(\\bX) = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\\\ 3 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:[`und das Produkt der beiden ist
`,e.jsx(n,{children:"(\\corange{5}, \\corange{2}, \\corange{17}, \\corange{8})^\\top"}),`, wie es sein muss.
Auf die Reihenfolge kommt es an: `,e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB^\\top}"}),` liefert
`,e.jsx(n,{children:"(1, 17, 0, 6)^\\top"}),`. Die Formatprobe bemerkt den Tausch nicht, denn Zeilen- und
Spaltenzahl eines Kroneckerprodukts sind Produkte der Zeilen- bzw.
Spaltenzahlen beider Faktoren. `,e.jsx(n,{children:"\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA}"}),` und
`,e.jsx(n,{children:"\\cblue{\\bA} \\kron \\cgreen{\\bB^\\top}"}),` haben deshalb stets dasselbe Format, hier
`,e.jsx(n,{children:"4 \\times 4"}),"."]})]}),`
`,e.jsx(q,{title:"Große Systeme: Struktur statt Ausmultiplizieren",children:e.jsxs(i.p,{children:["Das zu ",e.jsx(n,{children:"\\cblue{\\bA}\\bX\\cgreen{\\bB} = \\bC"}),` gehörende
`,e.jsx(t,{id:"linear-system",children:"lineare Gleichungssystem"}),`
`,e.jsx(n,{children:"(\\cgreen{\\bB^\\top} \\kron \\cblue{\\bA})\\vec(\\bX) = \\vec(\\bC)"})," hat ",e.jsx(n,{children:"mn"}),`
Gleichungen und `,e.jsx(n,{children:"pq"})," Unbekannte, seine Systemmatrix ausgeschrieben ",e.jsx(n,{children:"mnpq"}),`
Einträge. Bei großen Faktoren nutzen wir deshalb die Struktur, statt sie
auszumultiplizieren. Sind `,e.jsx(n,{children:"\\cblue{\\bA}"})," und ",e.jsx(n,{children:"\\cgreen{\\bB}"}),` quadratisch und
invertierbar, so liefert
`,e.jsx(n,{children:"\\bX = \\cblue{\\bA^{-1}}\\bC\\,\\cgreen{\\bB^{-1}}"}),` die Lösung allein aus den beiden
kleinen Faktoren. Das ist eine symbolische Identität; numerisch bilden wir die
Inversen nicht explizit, sondern lösen nacheinander lineare Systeme mit
`,e.jsx(n,{children:"\\cblue{\\bA}"})," und ",e.jsx(n,{children:"\\cgreen{\\bB^\\top}"}),`. Nach demselben Muster arbeiten die
separierbaren Kovarianzmatrizen aus `,e.jsx(i.a,{href:"#sec-9.3",children:"Abschnitt 9.3"}),`: Ihre Eigenwerte ergeben sich
als Produkte der Eigenwerte beider Faktoren, ohne dass wir `,e.jsx(n,{children:"\\bSigma"}),` je
aufstellen müssen.`]})}),`
`,e.jsxs(h,{kind:"Beispiel",label:"9.5.5 (Sylvester-Gleichung mit dem vec-Trick)",id:"env-sylvester-gleichung-per-vec-trick",children:[e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"Sylvester-Gleichung"})," lautet"]}),e.jsx(l,{children:"\\bA\\bX + \\bX\\bB = \\bC ."}),e.jsxs(i.p,{children:["Mit den beiden Spezialfällen aus ",e.jsx(t,{id:"env:vektorisierung-eines-matrixprodukts",href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"}),`
wird daraus für `,e.jsx(n,{children:"2 \\times 2"}),"-Matrizen"]}),e.jsx(l,{children:`\\bigl(\\bI_2 \\kron \\bA + \\bB^\\top \\kron \\bI_2\\bigr)\\vec(\\bX)
= \\vec(\\bC) .`}),e.jsx(i.p,{children:"Für"}),e.jsx(l,{children:`\\bA = \\begin{pmatrix}3&0\\\\1&2\\end{pmatrix},\\qquad
\\bB = \\begin{pmatrix}0&1\\\\1&1\\end{pmatrix},\\qquad
\\bC = \\begin{pmatrix}1&3\\\\2&4\\end{pmatrix}`}),e.jsxs(i.p,{children:[`hat das lineare Gleichungssystem die Systemmatrix
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix}3&0&1&0\\\\1&2&0&1\\\\1&0&4&0\\\\0&1&1&3\\end{smallmatrix}\\bigr)"}),`
und die Lösung`]}),e.jsx(l,{children:`\\vec(\\bX) =
\\begin{pmatrix}1/11\\\\27/55\\\\8/11\\\\51/55\\end{pmatrix},
\\qquad
\\bX = \\begin{pmatrix}1/11&8/11\\\\27/55&51/55\\end{pmatrix}.`}),e.jsx(i.p,{children:"In R folgt die Rechnung der Formel:"}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`A <- matrix(c(3, 1, 0, 2), 2, 2)
B <- matrix(c(0, 1, 1, 1), 2, 2)
C <- matrix(c(1, 2, 3, 4), 2, 2)
M <- kronecker(diag(2), A) + kronecker(t(B), diag(2))
X <- matrix(solve(M, as.vector(C)), 2, 2)
A %*% X + X %*% B
all.equal(A %*% X + X %*% B, C)
`})}),e.jsxs(i.p,{children:["Die letzte Zeile ergibt ",e.jsx(i.code,{children:"TRUE"}),`. Wichtige Spezialfälle sind Lyapunov-Gleichungen,
etwa für stationäre Kovarianzmatrizen von Zeitreihenmodellen; für große
Matrizen gibt es spezialisierte Löser, die die Struktur ausnutzen.`]})]}),`
`,e.jsx(i.h3,{children:"Wie es weitergeht"}),`
`,e.jsxs(i.p,{children:[`Wie wir mit Tensorproduktbasen aus guten univariaten Basen (Legendre-Polynome,
Fourierbasis, Wavelets) approximieren und dem exponentiellen Wachstum `,e.jsx(n,{children:"(d+1)^k"}),`
aus `,e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"Bemerkung 9.4.12"}),` entkommen, behandelt
`,e.jsx(i.a,{href:"?k=13-funktionsapproximation",children:"Kapitel 13"}),"."]}),`
`,e.jsxs(i.p,{children:["Zunächst folgt in ",e.jsx(i.a,{href:"?k=10-differentialrechnung",children:"Kapitel 10"}),` die fortgeschrittene
Differentialrechnung. Dort begegnen uns Tensoren wieder: Die Ableitung eines
matrixwertigen Ausdrucks nach einer Matrix
(`,e.jsx(i.a,{href:"?k=10-differentialrechnung#sec-10.9",children:"Abschnitt 10.9"}),`) ist ein mehrdimensionales
Zahlenfeld, und die Vektorisierung aus
`,e.jsx(t,{id:"env:vektorisierung-eines-matrixprodukts",href:"#env-vektorisierung-eines-matrixprodukts",children:"Satz 9.5.3"})," hilft, es zu ordnen."]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(ne,{children:[e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Für eine bilineare Abbildung ",e.jsx(n,{children:"f"})," gilt ",e.jsx(n,{children:"f(2\\bv, 3\\bw) = 5\\,f(\\bv, \\bw)"}),"."]}),e.jsxs(i.p,{children:[`Die Homogenität gilt in jedem Argument einzeln, die Faktoren multiplizieren
sich: `,e.jsx(n,{children:"f(2\\bv, 3\\bw) = 2 \\cdot 3\\, f(\\bv, \\bw) = 6\\,f(\\bv, \\bw)"}),`
(`,e.jsx(i.a,{href:"#env-bilinear-und-eine-warnung",children:"Bemerkung 9.1.2"}),")."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:[`Mit spaltenweiser Vektorisierung gilt
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB) = (\\bA \\kron \\bB^\\top)\\vec(\\bX)"}),"."]}),e.jsxs(i.p,{children:[`Die Faktoren stehen vertauscht. Richtig ist
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB) = (\\bB^\\top \\kron \\bA)\\vec(\\bX)"}),` nach
`,e.jsx(i.a,{href:"#eq-vektorisierung-eines-matrixprodukts",children:"(9.5.1)"}),": Der transponierte ",e.jsx(i.em,{children:"rechte"}),` Faktor steht
im Kroneckerprodukt `,e.jsx(i.em,{children:"links"}),`. Am Format ist der Tausch nicht zu erkennen; in
`,e.jsx(i.a,{href:"#env-die-identitaet-an-2-2-matrizen",children:"Beispiel 9.5.4"}),` liefert die vertauschte Fassung
`,e.jsx(n,{children:"(1, 17, 0, 6)^\\top"})," statt ",e.jsx(n,{children:"(5, 2, 17, 8)^\\top"}),"."]})]}),e.jsxs(v,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bv \\in \\R^m"})," und ",e.jsx(n,{children:"\\bw \\in \\R^n"}),` hat das äußere Produkt
`,e.jsx(n,{children:"\\bv \\otimes \\bw"})," stets den Rang ",e.jsx(n,{children:"1"}),"."]}),e.jsxs(i.p,{children:[e.jsx(t,{id:"env:eigenschaften-des-aeusseren-produkts",href:"#env-eigenschaften-des-aeusseren-produkts",children:"Satz 9.3.4"})," setzt ",e.jsx(n,{children:"\\bv \\neq \\bnull"}),` und
`,e.jsx(n,{children:"\\bw \\neq \\bnull"}),` voraus, und diese Voraussetzung ist nötig: Ist einer der
beiden Vektoren der Nullvektor, so sind nach `,e.jsx(i.a,{href:"#eq-aeusseres-produkt",children:"(9.3.1)"}),` alle Einträge
`,e.jsx(n,{children:"v_i w_j"})," gleich null, das Produkt ist die Nullmatrix und hat den Rang ",e.jsx(n,{children:"0"}),`. Andernfalls stimmt die Aussage, denn dann
spannt `,e.jsx(n,{children:"\\bv"})," allein den Spaltenraum auf."]})]}),e.jsxs(v,{wahr:!0,children:[e.jsxs(i.p,{children:["Kombinieren wir ",e.jsx(n,{children:"k"})," univariate Basen mit je ",e.jsx(n,{children:"d+1"}),` Funktionen zu einer
Tensorproduktbasis, so hat diese `,e.jsx(n,{children:"(d+1)^k"})," Elemente."]}),e.jsxs(i.p,{children:[e.jsx(t,{id:"env:tensorproduktbasis",href:"#env-tensorproduktbasis",children:"Satz 9.4.7"})," multipliziert die Dimensionen, bei ",e.jsx(n,{children:"k"}),` Faktoren also
`,e.jsx(n,{children:"k"}),"-mal. Für ",e.jsx(n,{children:"d = 3"})," und ",e.jsx(n,{children:"k = 10"})," sind das schon ",e.jsx(n,{children:"4^{10} = 1\\,048\\,576"}),`
Basisfunktionen (`,e.jsx(i.a,{href:"#env-allgemeine-dimension-und-was-sie-kostet",children:"Bemerkung 9.4.12"}),")."]})]})]}),`
`,e.jsx(i.p,{children:e.jsxs(i.em,{children:[`Vertiefung: Den vec-Operator und die Rechenregeln rund um
`,e.jsx(n,{children:"\\vec(\\bA\\bX\\bB)"})," entwickelt Kapitel 2 von Magnus und Neudecker, ",e.jsx(i.em,{children:`Matrix
Differential Calculus with Applications in Statistics and Econometrics`}),`; von
dort führt dasselbe Buch weiter in die Matrixdifferentialrechnung, die als
Nächstes ansteht.`]})})]})}function Pn(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(en,{...r})}):en(r)}const In={sections:[{id:"9.1",key:"multilinear",title:"Multilineare Abbildungen",C:se(xn)},{id:"9.2",key:"tensoren",title:"Tensoren",C:se(gn)},{id:"9.3",key:"produkte",title:"Produkte von Tensoren",C:se(Dn)},{id:"9.4",key:"tensorprodukt",title:"Tensorprodukt von Vektorräumen",C:se(Tn)},{id:"9.5",key:"zusammenfassung",title:"Zusammenfassung",C:se(Pn)}]};export{In as default};
