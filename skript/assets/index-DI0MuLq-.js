import{d as O,r as E,x as Fn,j as e,h as Bn,A as fe,M as n,T as Ne,F as D,g as q,H as Un,S as oe,s as Qe,e as Fe,f as me,V as I,n as qe,C as c,G as X,b as j,E as M,P as be,o as $,Q as Re,Z as Ve,i as G,a as He,v as Gn,w as Tn,k as Cn,I as On,J as Hn,m as _e}from"./index-BGJgxqST.js";import{I as we,E as ee}from"./Interaktiv-Bbglsg7Y.js";function Qn(r){const[[i,s],[a,h]]=r,u=i*i+s*s+a*a+h*h,o=i*h-s*a;return Math.sqrt(Math.max(0,(u-Math.sqrt(Math.max(0,u*u-4*o*o)))/2))}function Xn(r){const[[i,s],[a,h]]=r,u=i*i+a*a,o=i*s+a*h,f=s*s+h*h;if(Math.abs(o)<1e-12)return u>=f?[1,0]:[0,1];const b=u+f,m=u*f-o*o,t=(b+Math.sqrt(Math.max(0,b*b-4*m)))/2,g=[o,t-u],x=Math.hypot(g[0],g[1]);return[g[0]/x,g[1]/x]}function Pn(r){const i=s=>Math.round((s||0)*1e6);return[i(r[0][0]),i(r[0][1]),i(r[1][0]),i(r[1][1])]}function Jn(r){const[i,s,a,h]=Pn(r);return i*h-s*a===0}function Yn(r){const[i,s,a,h]=Pn(r),u=i*i+a*a;return i*s+a*h===0&&u===s*s+h*h&&u>0}function ei(r){const i="⁰¹²³⁴⁵⁶⁷⁸⁹";return(r<0?"⁻":"")+String(Math.abs(r)).split("").map(s=>i[Number(s)]).join("")}function xn(r){if(!Number.isFinite(r))return q(r,3);if(r===0)return"0";if(r>=.001)return q(r,3);const i=Math.floor(Math.log10(r));return`${q(r/10**i,2)} · 10${ei(i)}`}function Je(r){return(Math.atan2(r[1],r[0])*180/Math.PI%360+360)%360}const un=[{id:"beispiel",name:`${O("beispiel:der-einheitskreis-wird-zur-ellipse")}`,A:[[2,1],[0,1]]},{id:"drehung",name:"Drehung",A:[[.6,-.8],[.8,.6]]},{id:"diagonal",name:"Strecken und Stauchen",A:[[2,0],[0,.5]]},{id:"singulaer",name:"singulär",A:[[1,2],[2,4]]}];function ni(){const[r,i]=E.useState(un[0].A),[s,a]=E.useState(20),[h,u]=E.useState("beispiel"),o=[[r[0][0]||0,r[0][1]||0],[r[1][0]||0,r[1][1]||0]],f=K=>[o[0][0]*K[0]+o[0][1]*K[1],o[1][0]*K[0]+o[1][1]*K[1]],b=K=>{const W=K*Math.PI/180;return Math.hypot(...f([Math.cos(W),Math.sin(W)]))},m=s*Math.PI/180,t=[Math.cos(m),Math.sin(m)],g=f(t),x=Math.hypot(...g),p=Fn(o),_=Qn(o),w=Xn(o),N=[-w[1],w[0]],S=f(w),k=f(N),l=Je(w),d=Je(N),A=S[0]*k[0]+S[1]*k[1],z=Math.max(2.4,1.25*p),U=Math.max(1,1.15*p),v=K=>{u(K.id),i(K.A)},y=K=>{u("frei"),i(K)},R=Jn(r),L=!R&&Yn(r),P=R?1/0:p/_,H=!R&&P>1e3,ne=!R&&!L&&P<1.02;return e.jsx("div",{className:"text-sm",children:e.jsx(Bn,{frage:e.jsxs(e.Fragment,{children:["Bei welchem Winkel ",e.jsx(n,{children:"\\theta"})," wird ",e.jsx(n,{children:"\\bx"})," am stärksten gestreckt?"]}),loesung:l,toleranz:5,labels:L?{tatsaechlich:"Eine Maximalstelle unter vielen"}:void 0,einheit:"°",fmt:K=>q(K,1),min:0,max:360,auswertung:K=>{const W=typeof K=="number"?K:NaN;if(L)return e.jsxs(I,{kind:"ok",titel:"Trickfrage:",children:["Bei dieser Matrix ist jede Richtung eine Maximalstelle, alle werden um"," ",q(p,3)," gestreckt. Die Frage nach dem Winkel hat hier keine eindeutige Antwort."]});const Q=Math.min(...[-360,-180,0,180,360].map(te=>Math.abs(W-l+te)));return e.jsxs(I,{kind:Q<=5?"ok":"warn",children:[Q<=5?"Gut geschätzt. ":"Daneben. ","Das Maximum liegt bei ",q(l,1),"° und, weil die Kurve die Periode 180° hat, ein zweites Mal bei ",q((l+180)%360,1),"°; beide Antworten sind richtig. Die Abweichung des Tipps beträgt ",q(Q,1),"°."]})},children:({aufgeloest:K})=>e.jsxs(e.Fragment,{children:[e.jsxs(fe,{children:["Ziehen wir die graue Spitze auf dem Einheitskreis herum (oder schieben wir"," ",e.jsx(n,{children:"\\theta"}),") und suchen wir die Stellung mit dem längsten violetten Bildpfeil."]}),e.jsxs("div",{className:"my-2 grid gap-4 sm:grid-cols-2",children:[e.jsx(Ne,{matrix:o,showGrid:!1,showUnitCircle:!0,size:250,worldHalf:z,transitionMs:250,readout:!1,ariaLabel:`Einheitskreis und seine Bildellipse unter A; der laufende Einheitsvektor steht bei ${q(s,0)} Grad, sein Bild hat die Länge ${q(x,2)}.`,vectors:[{v:t,color:D.grau,label:"x",draggable:!0,dragConstraint:"unitCircle"},{v:g,color:D.violett,label:"Ax"},...K?[{v:w,color:D.blau,label:"v₁"},{v:N,color:D.blau,label:"v₂"},{v:S,color:D.gruen,label:"Av₁"},{v:k,color:D.gruen,label:"Av₂"}]:[]],onVectorChange:(W,Q)=>{W===0&&a(Je(Q))}}),e.jsx(Un,{xLabel:"θ in Grad",yLabel:"‖Ax(θ)‖",xDomain:[0,360],yDomain:[0,U],width:300,height:230,ariaLabel:`Länge des Bildvektors über dem Winkel; aktuell ${q(x,2)} bei ${q(s,0)} Grad.`,series:[{f:b,color:D.orange,label:"‖Ax(θ)‖"},...K?[{f:()=>p,color:D.grau,dash:[4,4],label:"σ₁"},{f:()=>_,color:D.grau,dash:[4,4],label:"σ₂"}]:[]],markers:[{x:s,y:x,color:D.violett},...K?[{x:l,y:p,color:D.orange},{x:(l+180)%360,y:p,color:D.orange},{x:d,y:_,color:D.orange},{x:(d+180)%360,y:_,color:D.orange}]:[]]})]}),e.jsx(oe,{label:"Winkel θ",value:s,onChange:a,min:0,max:360,step:1,unit:"°",accent:D.grau,fmt:W=>q(W,0)}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-3",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(n,{children:"\\bA ="}),e.jsx(Qe,{value:r,onChange:y})]}),un.map(W=>e.jsx("button",{type:"button",className:h===W.id?Fe:me,"aria-pressed":h===W.id,onClick:()=>v(W),children:W.name},W.id))]}),e.jsxs("p",{className:"my-1 font-mono text-xs",children:["‖x‖ = 1, ‖Ax(θ)‖ = ",q(x,3)," bei θ = ",q(s,0),"°"]}),K?R?e.jsxs(I,{kind:"warn",titel:"Entartet:",children:[e.jsx(n,{children:"\\det \\bA = 0"}),", die kleinste Streckung ist damit exakt null: Eine ganze Richtung wird plattgedrückt, aus dem Kreis wird eine Strecke statt einer Ellipse, und die Kurve berührt zweimal die Nulllinie. Die längste Halbachse misst weiterhin"," ",q(p,3),". Eine Matrix mit kleinstem Singulärwert null ist singulär (",O("sec:svd/motivation"),")."]}):H?e.jsxs(I,{kind:"warn",titel:"Fast entartet:",children:["Die kleinste Streckung ist ",xn(_),", also nicht null, aber winzig gegen"," ",q(p,3),". Die Ellipse ist eine sehr dünne Nadel, ohne je zur Strecke zu werden. Das Verhältnis ",e.jsx(n,{children:"\\sigma_1/\\sigma_2"})," = ",xn(P)," ist die Konditionszahl aus ",O("sec:fehler/kondition"),": Die Matrix ist schlecht konditioniert, nicht singulär."]}):L?e.jsxs(I,{kind:"ok",titel:"Alle Richtungen gleich:",children:["Hier ist ",e.jsx(n,{children:"\\bA^\\top\\bA"})," ein Vielfaches der Einheitsmatrix, größte und kleinste Streckung fallen deshalb exakt mit ",q(p,3)," zusammen und die Kurve ist flach. Aus dem Kreis wird wieder ein Kreis, und jede Richtung ist Maximalstelle: Die Maximalstelle in (",qe("eq:eq-6-1-2"),") ist dann nicht eindeutig."]}):ne?e.jsxs(I,{kind:"neutral",titel:"Fast ein Kreis:",children:["Größte und kleinste Streckung liegen mit ",q(p,3)," und ",q(_,3)," dicht beieinander. Die Ellipse ist fast, aber nicht ganz ein Kreis, und die Maximalstelle bei ",q(l,1),"° ist zwar eindeutig, an der flachen Kurve aber kaum abzulesen. Ein Vielfaches einer Orthogonalmatrix ist ",e.jsx(n,{children:"\\bA"})," erst, wenn"," ",e.jsx(n,{children:"\\sigma_1 = \\sigma_2"})," gilt."]}):e.jsxs(I,{kind:"neutral",children:["Das Maximum ist ",q(p,3)," bei ",q(l,1),"°, das Minimum"," ",q(_,3)," bei ",q(d,1),"°, und die beiden Stellen liegen exakt"," ",e.jsx(n,{children:"90^\\circ"})," auseinander. Auch die zugehörigen Bilder stehen senkrecht aufeinander: Ihr Skalarprodukt ist ",q(A,3),". Genau dieses Muster zerlegt ",O("sec:svd/singulaerwerte")," in ",e.jsx(n,{children:"\\bA = \\bU\\bSigma\\bV^\\top"}),"."]}):e.jsxs(I,{kind:"neutral",children:["Die Kurve wiederholt sich nach ",e.jsx(n,{children:"180^\\circ"}),": Ein halber Umlauf ersetzt"," ",e.jsx(n,{children:"\\bx"})," durch ",e.jsx(n,{children:"-\\bx"}),", und das Bild wechselt dabei nur das Vorzeichen. Ihr Höchstpunkt ist die längste Halbachse der Ellipse."]})]})})})}function gn(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"?k=05-lgs",children:"Kapitel 5"}),` haben wir Matrizen zerlegt, um Gleichungssysteme zu lösen. Die
`,e.jsx(c,{id:"env:lu-zerlegung",children:"LU-Zerlegung"}),` braucht dafür eine quadratische Matrix, die Cholesky-Zerlegung
sogar eine symmetrische und positiv definite. Die Matrizen, mit denen wir in der
Statistik rechnen, sehen selten so aus: Eine Designmatrix hat `,e.jsx(n,{children:"n"}),` Zeilen für die
Beobachtungen und `,e.jsx(n,{children:"p"})," Spalten für die Merkmale, und ",e.jsx(n,{children:"n = p"}),` ist der
Ausnahmefall. Dieses Kapitel baut eine Zerlegung, die für jede Matrix
funktioniert.`]}),`
`,e.jsx(i.h3,{children:"Was wir brauchen"}),`
`,e.jsx(i.p,{children:"Das Kapitel setzt voraus:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"Spektralnorm"})," ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),`,
also der größte Streckfaktor der Abbildung `,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"}),`
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"})," ",e.jsx(n,{children:"\\bQ"})," mit ",e.jsx(n,{children:"\\bQ^\\top\\bQ = \\bI"}),`. Sie
erhalten Längen und Winkel, ihre Inverse ist die Transponierte
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),")."]}),`
`,e.jsxs(i.li,{children:[`Matrixzerlegungen als Werkzeug: eine Matrix in leicht handhabbare Faktoren
aufspalten und die eigentliche Rechnung dann auf den Faktoren machen
(`,e.jsx(i.a,{href:"?k=05-lgs#sec-5.2",children:"Abschnitt 5.2"}),")."]}),`
`,e.jsxs(i.li,{children:["Aus der linearen Algebra:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"eigenvalue-eigenvector",children:"Eigenwerte und Eigenvektoren"}),", ",e.jsx(n,{children:"\\bA\\bv = \\lambda\\bv"}),";"]}),`
`,e.jsxs(i.li,{children:["der ",e.jsx(c,{id:"rank",children:"Rang"})," einer Matrix;"]}),`
`,e.jsxs(i.li,{children:["die fundamentalen Unterräume ",e.jsx(n,{children:"\\col(\\bA)"}),", ",e.jsx(n,{children:"\\operatorname{Kern}(\\bA)"}),` und
`,e.jsx(n,{children:"\\col(\\bA^\\top)"})," (",e.jsx(c,{id:"image",children:"Spaltenraum"})," und ",e.jsx(c,{id:"null-space",children:"Kern"}),");"]}),`
`,e.jsxs(i.li,{children:[e.jsx(c,{id:"projection",children:"Projektionen"})," auf Unterräume."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.h3,{children:"Diagonalisierung ist limitiert"}),`
`,e.jsxs(i.p,{children:["Die Eigenwertzerlegung ",e.jsx(n,{children:"\\bA = \\bP\\bD\\bP^{-1}"}),` ist das Standardwerkzeug, um eine
Matrix in ihre Wirkungsrichtungen zu zerlegen. Sie ist aber in zwei Punkten eingeschränkt.`]}),`
`,e.jsxs(i.p,{children:["Zum einen verlangt schon die Gleichung ",e.jsx(n,{children:"\\bA\\bv = \\lambda\\bv"}),", dass ",e.jsx(n,{children:"\\bA\\bv"}),` und
`,e.jsx(n,{children:"\\bv"}),` im selben Raum liegen. Die Matrix muss also quadratisch sein; für
`,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"m \\neq n"}),` stellt sich die Frage nach Eigenwerten
gar nicht erst. Und selbst unter den quadratischen Matrizen hat nicht jede eine
Eigenwertzerlegung: `,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),`
besitzt nur den Eigenwert `,e.jsx(n,{children:"0"}),`, dessen Eigenraum eindimensional ist. Eine Basis
aus Eigenvektoren kommt so nicht zustande.`]}),`
`,e.jsxs(i.p,{children:["Zum anderen nützt uns die Zerlegung vor allem dann etwas, wenn ",e.jsx(n,{children:"\\bP"}),` orthogonal
gewählt werden kann, denn nur dann verzerrt der Basiswechsel nichts. Das gelingt
genau für `,e.jsx(c,{id:"symmetric-matrix",children:"symmetrische"}),` Matrizen (Spektralsatz,
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),`). Mehr können es nicht sein, denn wegen
`,e.jsx(n,{children:"(\\bP\\bD\\bP^\\top)^\\top = \\bP\\bD^\\top\\bP^\\top = \\bP\\bD\\bP^\\top"}),` ist alles,
was sich so zerlegen lässt, automatisch symmetrisch. Die meisten Matrizen, die
uns begegnen, sind weder quadratisch noch symmetrisch.`]}),`
`,e.jsx(i.h3,{children:"Was wir wollen"}),`
`,e.jsx(i.p,{children:`Gesucht ist eine Zerlegung, die dieselbe Arbeit leistet, aber ohne diese
Bedingungen:`}),`
`,e.jsx(X,{tag:"6.1.1",id:"eq-eq-6-1-1",children:"\\bA = \\cgreen{\\bP}\\,\\corange{\\bD}\\,\\cblue{\\bQ}^{-1} ."}),`
`,e.jsx(i.p,{children:"Drei Dinge wünschen wir uns dabei:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Sie existiert für ",e.jsx(i.em,{children:"beliebige"})," Matrizen ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\bD}"}),` ist „diagonal", trägt also außerhalb der Diagonalen nur
Nullen. Was Diagonale bei einer rechteckigen Matrix heißt, klären wir in
`,e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cgreen{\\bP}"})," und ",e.jsx(n,{children:"\\cblue{\\bQ}"})," sind ",e.jsx(c,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"}),"."]}),`
`]}),`
`,e.jsxs(i.p,{children:[`Auf Punkt 3 kommt es an. Orthogonalmatrizen drehen und spiegeln, mehr nicht.
Steckt die ganze Verzerrung in `,e.jsx(n,{children:"\\corange{\\bD}"}),`, dann lesen wir an den
Diagonaleinträgen ab, was die Abbildung mit dem Raum anstellt. Außerdem entfällt
die Inverse: Für orthogonales `,e.jsx(n,{children:"\\bQ"})," ist ",e.jsx(n,{children:"\\bQ^{-1} = \\bQ^\\top"}),`, aus
`,e.jsx(i.a,{href:"#eq-eq-6-1-1",children:"(6.1.1)"})," wird also ",e.jsx(n,{children:"\\bA = \\cgreen{\\bP}\\corange{\\bD}\\cblue{\\bQ}^\\top"}),"."]}),`
`,e.jsxs(i.p,{children:["Später heißen die Faktoren ",e.jsx(n,{children:"\\cgreen{\\bU}"}),", ",e.jsx(n,{children:"\\corange{\\bSigma}"}),` und
`,e.jsx(n,{children:"\\cblue{\\bV}"}),`, und die Zerlegung
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV}^\\top"}),` trägt den Namen
`,e.jsx(c,{id:"singular-value-decomposition",children:"Singulärwertzerlegung"}),`. Die Farben gelten im
ganzen Kapitel: orange die Streckfaktoren, blau die rechte Seite
`,e.jsx(n,{children:"\\cblue{\\bV}"}),", grün die linke Seite ",e.jsx(n,{children:"\\cgreen{\\bU}"}),"."]}),`
`,e.jsx(i.h3,{children:"Geometrische Intuition"}),`
`,e.jsxs(i.p,{children:[`Woher kommt so eine Zerlegung? Statt einen einzelnen Vektor durch die Abbildung
zu schicken, schicken wir alle Einheitsvektoren auf einmal, also die
Einheitssphäre aller `,e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\left\\| \\bx \\right\\| = 1"}),`. Ihre Bilder
`,e.jsx(n,{children:"\\bA\\bx"}),` haben verschiedene Längen: Manche Richtungen streckt
`,e.jsx(n,{children:"\\bA"}),`, andere staucht sie. Die Leitfrage dieses Kapitels: Welche Richtung wird am
stärksten gestreckt, welche am zweitstärksten, und so
weiter?`]}),`
`,e.jsxs(i.p,{children:["Für eine ",e.jsx(n,{children:"2 \\times 2"}),"-Matrix wird aus dem Einheitskreis eine Ellipse; ist ",e.jsx(n,{children:"\\bA"}),`
singulär, so entartet sie zu einer Strecke. Der längste Bildvektor liegt auf
ihrer Hauptachse, der kürzeste auf der Nebenachse, und
diese Halbachsenlängen sind uns als Singulärwerte in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.4",children:"Abschnitt 3.4"})," schon begegnet. Bildet ",e.jsx(n,{children:"\\bA"}),`
dagegen von `,e.jsx(n,{children:"\\R^3"}),` in die Ebene ab, so drückt sie die Richtungen in
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA)"})," auf ",e.jsx(n,{children:"\\bnull"}),`, und aus der Einheitssphäre wird eine
ausgefüllte Ellipse. Haupt- und Nebenachse zeigen weiterhin die stärkste und die
zweitstärkste Streckung.`]}),`
`,e.jsxs(i.p,{children:["Nehmen wir die Matrix aus ",e.jsx(i.a,{href:"?k=03-matrix-spur-norm#env-visualisierung",children:"Beispiel 3.3.3"}),","]}),`
`,e.jsx(j,{children:"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix} ."}),`
`,e.jsxs(we,{title:"Welche Richtung streckt die Matrix am stärksten?",children:[e.jsxs(i.p,{children:[`Welche Richtung streckt sie am stärksten, und um welchen Faktor? Das Widget
schickt den ganzen Einheitskreis durch `,e.jsx(n,{children:"\\bA"}),` und trägt rechts die Länge des
Bildvektors über dem Winkel auf.`]}),e.jsx(ni,{})]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.1.1 (Der Einheitskreis wird zur Ellipse)",id:"env-der-einheitskreis-wird-zur-ellipse",children:[e.jsxs(i.p,{children:["Die beiden Streckfaktoren von ",e.jsx(n,{children:"\\bA"}),` kennen wir bereits aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm",children:"Kapitel 3"}),": ",e.jsx(n,{children:"\\corange{2{,}288} = \\sqrt{3 + \\sqrt{5}}"}),` ist die längste
Halbachse der Bildellipse, `,e.jsx(n,{children:"\\corange{0{,}874}"}),` die kürzeste. Am stärksten
gestreckt wird die Richtung`]}),e.jsx(j,{children:`\\cblue{\\bx^*} \\approx \\begin{pmatrix} 0{,}851 \\\\ 0{,}526 \\end{pmatrix} ,
\\qquad
\\cgreen{\\bA\\bx^*} \\approx \\begin{pmatrix} 2{,}227 \\\\ 0{,}526 \\end{pmatrix} ,
\\qquad
\\left\\| \\cgreen{\\bA\\bx^*} \\right\\| \\approx \\corange{2{,}288} ,`}),e.jsxs(i.p,{children:["ein Einheitsvektor, der rund ",e.jsx(n,{children:"31{,}7^\\circ"})," über der ",e.jsx(n,{children:"x_1"}),`-Achse liegt. Die dazu
senkrechte Richtung `,e.jsx(n,{children:"\\cblue{\\bx^\\perp} \\approx (-0{,}526,\\; 0{,}851)^\\top"}),` hat das
Bild `,e.jsx(n,{children:"\\cgreen{\\bA\\bx^\\perp} \\approx (-0{,}201,\\; 0{,}851)^\\top"}),` der Länge
`,e.jsx(n,{children:"\\corange{0{,}874}"}),", wird also am schwächsten gestreckt."]}),e.jsx(i.p,{children:"Die beiden Bilder stehen wieder senkrecht aufeinander,"}),e.jsx(j,{children:`\\cgreen{\\bA\\bx^*}^\\top \\cgreen{\\bA\\bx^\\perp}
\\approx 2{,}227 \\cdot (-0{,}201) + 0{,}526 \\cdot 0{,}851
= -0{,}4476 + 0{,}4476 = 0`}),e.jsxs(i.p,{children:[`(bis auf Rundung). Zwei senkrechte Richtungen im Urbild, zwei senkrechte
Richtungen im Bild, dazwischen zwei Streckfaktoren: Dieses Muster schreiben wir
in `,e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),` als Zerlegung auf. Dort klärt sich auch, woher
`,e.jsx(n,{children:"\\cblue{\\bx^*}"})," kommt und warum die Bilder senkrecht bleiben."]})]}),`
`,e.jsx(i.h3,{children:"Die Grundidee"}),`
`,e.jsx(i.p,{children:`Wie finden wir die Richtung der stärksten Streckung? Wir schreiben die Frage als
Optimierungsproblem:`}),`
`,e.jsx(X,{tag:"6.1.2",id:"eq-eq-6-1-2",children:"\\max_{\\left\\| \\bx \\right\\| = 1} \\left\\| \\bA\\bx \\right\\| ."}),`
`,e.jsxs(i.p,{children:[`Ein Maximum existiert, denn die Einheitssphäre ist
`,e.jsx(c,{id:"closed-bounded-set",children:"abgeschlossen und beschränkt"}),` und
`,e.jsx(n,{children:"\\bx \\mapsto \\left\\| \\bA\\bx \\right\\|"}),` ist stetig. Der Maximalwert ist die
Spektralnorm `,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2"}),` aus der Vorwissensliste. Neu ist die
Frage nach der Maximalstelle und danach, was in den übrigen Richtungen
passiert.`]}),`
`,e.jsxs(i.p,{children:["Unhandlich an ",e.jsx(i.a,{href:"#eq-eq-6-1-2",children:"(6.1.2)"}),` ist die Zielfunktion: In der Norm steckt eine Wurzel
über einer Quadratsumme. Wir maximieren deshalb stattdessen das Quadrat.`]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.1.2 (Streckung als quadratische Form)",id:"env-streckung-als-quadratische-form",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," und alle ",e.jsx(n,{children:"\\bx \\in \\R^n"})," gilt"]}),e.jsx(X,{tag:"6.1.3",id:"eq-streckung-als-quadratische-form",children:"\\left\\| \\bA\\bx \\right\\|^2 = (\\bA\\bx)^\\top(\\bA\\bx) = \\bx^\\top\\left(\\bA^\\top\\bA\\right)\\bx ."}),e.jsxs(i.p,{children:["Auf der Einheitssphäre haben ",e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|"}),` und
`,e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|^2"})," dieselben Maximalstellen."]})]}),`
`,e.jsx(ee,{title:"Die Identität im Detail",children:e.jsxs(be,{children:[e.jsx($,{why:e.jsxs(e.Fragment,{children:["Definition der ",e.jsx(c,{id:"euclidean-norm",children:"euklidischen Norm"}),": ",e.jsx(n,{children:"\\left\\| \\by \\right\\| = \\sqrt{\\sum_i y_i^2}"}),", und das Skalarprodukt ",e.jsx(n,{children:"\\by^\\top\\by"})," ist genau ",e.jsx(n,{children:"\\sum_i y_i^2"})]}),children:e.jsxs(i.p,{children:["Für jeden Vektor ",e.jsx(n,{children:"\\by \\in \\R^m"})," ist ",e.jsx(n,{children:"\\left\\| \\by \\right\\|^2 = \\by^\\top\\by"}),`. Mit
`,e.jsx(n,{children:"\\by = \\bA\\bx"})," folgt die erste Gleichheit in ",e.jsx(i.a,{href:"#eq-streckung-als-quadratische-form",children:"(6.1.3)"}),"."]})}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"(\\bA\\bx)^\\top = \\bx^\\top\\bA^\\top"}),", die Transposition dreht die Reihenfolge des Produkts um; danach klammern wir nur um"]}),children:[e.jsx(i.p,{children:"Ausmultiplizieren liefert die zweite Gleichheit:"}),e.jsx(j,{children:"(\\bA\\bx)^\\top(\\bA\\bx) = \\bx^\\top\\bA^\\top\\bA\\bx = \\bx^\\top\\left(\\bA^\\top\\bA\\right)\\bx ."})]}),e.jsx($,{why:e.jsxs(e.Fragment,{children:["strenge Monotonie erhält die Ordnung: ",e.jsx(n,{children:"\\left\\| \\bA\\bx_1 \\right\\| \\le \\left\\| \\bA\\bx_2 \\right\\|"})," gilt genau dann, wenn ",e.jsx(n,{children:"\\left\\| \\bA\\bx_1 \\right\\|^2 \\le \\left\\| \\bA\\bx_2 \\right\\|^2"})," gilt"]}),children:e.jsxs(i.p,{children:["Die Abbildung ",e.jsx(n,{children:"t \\mapsto t^2"})," wächst auf ",e.jsx(n,{children:"[0, \\infty)"}),` streng monoton, und Normen
sind nie negativ. Ein `,e.jsx(n,{children:"\\bx"})," maximiert daher ",e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|"}),` genau dann,
wenn es `,e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|^2"})," maximiert."]})})]})}),`
`,e.jsxs(i.p,{children:["Die rechte Seite von ",e.jsx(i.a,{href:"#eq-streckung-als-quadratische-form",children:"(6.1.3)"}),` ist eine
`,e.jsx(c,{id:"quadratic-form",children:"quadratische Form"}),", und zwar die zur Matrix ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`.
Ist `,e.jsx(n,{children:"\\bA"})," vom Format ",e.jsx(n,{children:"m \\times n"}),", so ist ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` quadratisch vom Format
`,e.jsx(n,{children:"n \\times n"}),", ganz gleich, ob ",e.jsx(n,{children:"\\bA"}),` mehr Zeilen oder mehr Spalten hat.
Symmetrisch ist `,e.jsx(n,{children:"\\bA^\\top\\bA"})," außerdem (",e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),`). Der Umweg über
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),` führt uns also zu einer Matrix zurück, die sich orthogonal
diagonalisieren lässt. Aus ihren Eigenwerten und Eigenvektoren werden in
`,e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"})," die Singulärwerte und die Singulärvektoren."]}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.1.3 (Notation)",id:"env-notation",children:e.jsxs(i.p,{children:["Ab hier ist ",e.jsx(n,{children:"\\left\\| \\cdot \\right\\|"}),` ohne Index immer die
`,e.jsx(c,{id:"euclidean-norm",children:"euklidische Norm"})," ",e.jsx(n,{children:"\\left\\| \\cdot \\right\\|_2"}),`, bei Matrizen entsprechend die davon induzierte
`,e.jsx(c,{id:"env:operatornorm",children:"Operatornorm"}),`, also die Spektralnorm
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),`). Ist eine andere Norm gemeint,
schreiben wir den Index dazu.`]})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(Ve,{loesung:1.458,toleranz:.02,children:[e.jsxs(i.p,{children:[`Stellen wir im Widget oben das Preset „Strecken und Stauchen" ein, also
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 0 \\\\ 0 & 0{,}5 \\end{smallmatrix}\\bigr)"}),`, und
schieben wir `,e.jsx(n,{children:"\\theta"})," auf ",e.jsx(n,{children:"45^\\circ"}),`. Wie lang ist dann der Bildvektor
`,e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|"}),"?"]}),e.jsxs(i.p,{children:["Rund ",e.jsx(n,{children:"1{,}458"}),`. Der Einheitsvektor ist
`,e.jsx(n,{children:"\\bx = (0{,}7071,\\; 0{,}7071)^\\top"}),", sein Bild ",e.jsx(n,{children:"(1{,}4142,\\; 0{,}3536)^\\top"}),`, und
dessen Länge ist `,e.jsx(n,{children:"\\sqrt{2 + 0{,}125} = \\sqrt{2{,}125} \\approx 1{,}458"}),`. Der Wert
liegt zwischen den beiden Streckfaktoren `,e.jsx(n,{children:"\\corange{0{,}5}"})," und ",e.jsx(n,{children:"\\corange{2}"}),`;
auf dem Einheitskreis liegt `,e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|"}),` immer zwischen
kleinstem und größtem Singulärwert.`]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{3 \\times 2}"}),` ist die Frage nach Eigenwerten sinnlos, die Matrix
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," dagegen ist ein ",e.jsx(n,{children:"2 \\times 2"}),"-Objekt."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bA"})," bildet von ",e.jsx(n,{children:"\\R^2"})," nach ",e.jsx(n,{children:"\\R^3"})," ab; in ",e.jsx(n,{children:"\\bA\\bv = \\lambda\\bv"}),` stünde links ein
Vektor aus `,e.jsx(n,{children:"\\R^3"})," und rechts einer aus ",e.jsx(n,{children:"\\R^2"}),". Das Produkt ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist
dagegen `,e.jsx(n,{children:"(2 \\times 3) \\cdot (3 \\times 2)"}),`, also eine quadratische
`,e.jsx(n,{children:"2 \\times 2"}),`-Matrix. Deshalb machen wir den Umweg aus
`,e.jsx(c,{id:"env:streckung-als-quadratische-form",href:"#env-streckung-als-quadratische-form",children:"Satz 6.1.2"}),"."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Jede symmetrische Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"}),` lässt sich als
`,e.jsx(n,{children:"\\bA = \\bQ\\bD\\bQ^\\top"})," mit orthogonalem ",e.jsx(n,{children:"\\bQ"})," und reeller Diagonalmatrix ",e.jsx(n,{children:"\\bD"}),`
schreiben.`]}),e.jsxs(i.p,{children:["Das ist der ",e.jsx(c,{id:"spectral-theorem",children:"Spektralsatz"}),`. Mehr sichert
die Symmetrie nicht: Die Eigenwerte dürfen negativ oder null sein, und
verschieden müssen sie auch nicht sein, wie `,e.jsx(n,{children:"\\bI"})," mit dem ",e.jsx(n,{children:"n"}),`-fachen Eigenwert
`,e.jsx(n,{children:"1"})," zeigt."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:[`Jede quadratische Matrix lässt sich orthogonal diagonalisieren, also als
`,e.jsx(n,{children:"\\bA = \\bP\\bD\\bP^\\top"})," mit orthogonalem ",e.jsx(n,{children:"\\bP"})," schreiben."]}),e.jsxs(i.p,{children:["Aus ",e.jsx(n,{children:"\\bA = \\bP\\bD\\bP^\\top"})," folgt ",e.jsx(n,{children:"\\bA^\\top = \\bP\\bD^\\top\\bP^\\top = \\bP\\bD\\bP^\\top = \\bA"}),`.
So zerlegbar sind also nur symmetrische Matrizen. Die quadratische Matrix
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 1 \\end{smallmatrix}\\bigr)"}),` aus
`,e.jsx(i.a,{href:"#env-der-einheitskreis-wird-zur-ellipse",children:"Beispiel 6.1.1"})," ist nicht symmetrisch und fällt damit heraus."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Wenn ",e.jsx(n,{children:"\\det \\bA = 1"}),` gilt, wird jede Richtung des Einheitskreises gleich stark
gestreckt.`]}),e.jsxs(i.p,{children:[`Die Determinante misst nur die Flächenänderung insgesamt, nicht ihre Verteilung
auf die Richtungen. Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 0 \\\\ 0 & 0{,}5 \\end{smallmatrix}\\bigr)"}),` ist
`,e.jsx(n,{children:"\\det \\bA = 1"}),", trotzdem wird die ",e.jsx(n,{children:"x_1"}),"-Richtung um den Faktor ",e.jsx(n,{children:"2"}),` gestreckt und
die `,e.jsx(n,{children:"x_2"}),`-Richtung auf die Hälfte gestaucht. Alle Richtungen gleich stark
streckt nur ein Vielfaches `,e.jsx(n,{children:"\\bA = c\\bQ"})," einer Orthogonalmatrix ",e.jsx(n,{children:"\\bQ"}),`; dann ist
`,e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\| = |c|"})," für jeden Einheitsvektor ",e.jsx(n,{children:"\\bx"}),"."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Der Übergang von ",e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|"})," zu ",e.jsx(n,{children:"\\left\\| \\bA\\bx \\right\\|^2"}),` ändert
weder die Maximalstelle noch den Maximalwert.`]}),e.jsxs(i.p,{children:[`Die Maximalstelle bleibt, der Wert nicht: Er wird quadriert. Für die Matrix aus
`,e.jsx(i.a,{href:"#env-der-einheitskreis-wird-zur-ellipse",children:"Beispiel 6.1.1"})," ist ",e.jsx(n,{children:"\\max_{\\left\\| \\bx \\right\\| = 1} \\left\\| \\bA\\bx \\right\\| \\approx 2{,}288"}),`,
während `,e.jsx(n,{children:"\\max_{\\left\\| \\bx \\right\\| = 1} \\left\\| \\bA\\bx \\right\\|^2 = 3 + \\sqrt{5} \\approx 5{,}236"}),`
herauskommt. Für die Suche nach der Richtung spielt das keine Rolle, deshalb
dürfen wir quadrieren.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:"Vertiefung: vgl. Heath §3.6 (Singulärwertzerlegung) sowie MML §4.5 und §4.6."})})]})}function ii(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(gn,{...r})}):gn(r)}const bn=(r,i)=>r&&r.length===3?[r[0],r[1],r[2]]:i;function ri({A:r,v:i,u:s,sig:a}){const[h,u]=E.useState(20),[o,f]=E.useState({azimuth:38,elevation:24}),b=h*Math.PI/180,m=[Math.cos(b),Math.sin(b)],t=U=>[(r[0][0]||0)*U[0]+(r[0][1]||0)*U[1],(r[1][0]||0)*U[0]+(r[1][1]||0)*U[1],(r[2][0]||0)*U[0]+(r[2][1]||0)*U[1]],g=t(m),x=Math.hypot(...g),p=E.useMemo(()=>{const U=[];for(let v=0;v<=96;v++){const y=2*Math.PI*v/96;U.push(t([Math.cos(y),Math.sin(y)]))}return U},[r[0][0],r[0][1],r[1][0],r[1][1],r[2][0],r[2][1]]),_=Math.max(1,1.05*Math.max(...p.map(U=>Math.max(Math.abs(U[0]),Math.abs(U[1]),Math.abs(U[2]))))),w=[-_,_],N=bn(s[0],[1,0,0]),S=bn(s[1],[0,1,0]),k=!(a[1]>1e-9),l=E.useMemo(()=>[{pts:p,color:D.violett,width:2.2,onTop:!0}],[p]),d=E.useMemo(()=>[{from:[0,0,0],to:[a[0]*N[0],a[0]*N[1],a[0]*N[2]],color:D.gruen,label:"σ₁u₁",onTop:!0},...k?[]:[{from:[0,0,0],to:[a[1]*S[0],a[1]*S[1],a[1]*S[2]],color:D.gruen,label:"σ₂u₂",onTop:!0}],{from:[0,0,0],to:g,color:D.violett,label:"Ax",onTop:!0}],[a[0],a[1],N,S,g,k]),A=E.useMemo(()=>[{p:[0,0,0],color:D.grau,r:3,onTop:!0}],[]),z=E.useMemo(()=>k?[]:[{p0:[0,0,0],u:N,v:S,su:_,sv:_,color:D.gruen,opacity:.16}],[N,S,_,k]);return e.jsxs("div",{className:"mt-4",children:[e.jsxs(fe,{children:["Drehen wir ",e.jsx("span",{className:"font-mono",children:"x"})," im linken Kreis und verfolgen wir sein Bild rechts; die Raumtafel lässt sich mit der Maus kippen."]}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsxs("figure",{className:"m-0",children:[e.jsx(Ne,{matrix:[[1,0],[0,1]],showGrid:!1,showUnitCircle:!0,size:230,worldHalf:1.5,readout:!1,xLabel:"x₁",yLabel:"x₂",ariaLabel:`Einheitskreis im R² mit den rechten Singulärvektoren; der laufende Vektor steht bei ${q(h,0)} Grad.`,vectors:[{v:m,color:D.grau,label:"x",draggable:!0,dragConstraint:"unitCircle"},{v:[i[0][0],i[0][1]],color:D.blau,label:"v₁"},{v:[i[1][0],i[1][1]],color:D.blau,label:"v₂"}],onVectorChange:(U,v)=>{if(U===0){const y=Math.atan2(v[1],v[0])*180/Math.PI;u((y%360+360)%360)}}}),e.jsxs("figcaption",{className:`mt-1 text-xs ${He}`,children:["Urbild: der Einheitskreis im ",e.jsx("span",{className:"font-mono",children:"R²"})]})]}),e.jsxs("figure",{className:"m-0",children:[e.jsx(Gn,{size:260,xDomain:w,yDomain:w,zDomain:w,zScale:1,ticks:!1,labels:{x:"y₁",y:"y₂",z:"y₃"},curves:l,arrows:d,points:A,planes:z,azimuth:o.azimuth,elevation:o.elevation,onViewChange:f,ariaLabel:k?"Bild des Einheitskreises im Raum: eine Strecke durch den Ursprung.":"Bild des Einheitskreises im Raum: eine Ellipse, die flach in der von u₁ und u₂ aufgespannten Ebene liegt."}),e.jsx(Tn,{value:o,onChange:f,reset:{azimuth:38,elevation:24}}),e.jsxs("figcaption",{className:`mt-1 text-xs ${He}`,children:["Bild: die Ellipse in der Ebene ",e.jsx("span",{className:"font-mono",children:"col(A)"})," des"," ",e.jsx("span",{className:"font-mono",children:"R³"})]})]})]}),e.jsx(oe,{label:"Winkel θ",value:h,onChange:u,min:0,max:360,step:1,unit:"°",accent:D.grau,fmt:U=>q(U,0)}),k?e.jsxs(I,{kind:"warn",titel:"Rang 1:",children:["Wegen ",e.jsx("span",{className:"font-mono",children:"σ₂ = 0"})," liegt das Bild auf einer Geraden statt in einer Ebene; ",e.jsx("span",{className:"font-mono",children:"col(A)"})," ist eindimensional (",O("satz:charakterisierung-der-fundamentalen"),"). Aus dem Kreis wird eine Strecke der halben Länge"," ",q(a[0],3),", die doppelt durchlaufen wird."]}):e.jsxs(I,{kind:"neutral",children:["Der Kreis landet als Ellipse in der Ebene ",e.jsx("span",{className:"font-mono",children:"col(A)"}),", aufgespannt von ",e.jsx("span",{className:"font-mono",children:"u₁"})," und"," ",e.jsx("span",{className:"font-mono",children:"u₂"})," (",O("satz:charakterisierung-der-fundamentalen"),"). Ihre Halbachsen sind"," ",e.jsx("span",{className:"font-mono",children:"σ₁u₁"})," und ",e.jsx("span",{className:"font-mono",children:"σ₂u₂"})," mit"," ",q(a[0],3)," und ",q(a[1],3),"; dazwischen läuft ‖Ax‖ hin und her, gerade jetzt bei ",q(x,3),". Obwohl das Bild im"," ",e.jsx("span",{className:"font-mono",children:"R³"})," liegt, ist es zweidimensional: Mehr als zwei Richtungen kann eine Matrix mit zwei Spalten nicht erzeugen."]})]})}const si=D.blau,ti=D.gruen,li=D.orange,ue=D.grau,C=r=>q(r,3);function se(r){if(!Number.isFinite(r))return C(r);const i=Math.round(r*1e3)/1e3;return Number.isInteger(i)?String(i).replace("-","−"):C(i)}const Ee=r=>`(${r.map(C).join(", ")})`;function di({m:r,color:i}){return e.jsx("span",{className:"inline-grid gap-px rounded border-x-2 border-slate-500 px-1.5 py-1 align-middle",style:{gridTemplateColumns:`repeat(${r[0].length}, minmax(2.6rem, auto))`,color:i},children:r.map((s,a)=>s.map((h,u)=>e.jsx("span",{className:"px-1 text-center font-mono text-xs",children:se(h)},`${a}-${u}`)))})}function ge({children:r}){return e.jsx("div",{className:"my-1 flex flex-wrap items-center gap-2 text-sm",children:r})}function ai(){var te;const[r,i]=E.useState([[1,2],[2,1],[1,0]]),[s,a]=E.useState(1),[h,u]=E.useState([-1,-1]),o=B=>r.map(F=>F[B]||0),f=(B,F)=>B.reduce((re,le,xe)=>re+le*F[xe],0),b=o(0),m=o(1),t=f(b,b),g=f(b,m),x=f(m,m),p=[[t,g],[g,x]],_=t+x,w=t*x-g*g,N=Math.max(_*_-4*w,0),S=Math.sqrt(N),k=[(_+S)/2,Math.max((_-S)/2,0)],l=k.map(Math.sqrt),d=.5*Math.atan2(2*g,t-x),z=[[Math.cos(d),Math.sin(d)],[-Math.sin(d),Math.cos(d)]].map((B,F)=>B.map(re=>h[F]*re)),U=z.map(B=>r.map(F=>(F[0]||0)*B[0]+(F[1]||0)*B[1])),v=U.map((B,F)=>l[F]>1e-9?B.map(re=>re/l[F]):null),y=v[0],R=v[1],L=l.filter(B=>B>1e-9).length,P=l[1]>1e-9?l[0]/l[1]:l[0]>1e-9?1/0:NaN;let H=0;for(let B=0;B<r.length;B++)for(let F=0;F<2;F++){let re=0;for(let le=0;le<2;le++){const xe=v[le];xe&&(re+=l[le]*xe[B]*z[le][F])}H=Math.max(H,Math.abs(re-(r[B][F]||0)))}const ne=B=>u(F=>B===0?[-F[0],F[1]]:[F[0],-F[1]]),K=[{titel:"Schritt 1: die Matrix AᵀA aufstellen",inhalt:e.jsxs(e.Fragment,{children:[e.jsxs(ge,{children:[e.jsx("span",{children:"AᵀA ="}),e.jsx(di,{m:p}),e.jsx("span",{style:{color:ue},children:"(Eintrag (i, j) ist das Skalarprodukt der i-ten mit der j-ten Spalte von A)"})]}),e.jsx("p",{className:"text-sm",style:{color:ue},children:"Die Matrix ist symmetrisch, ihre Diagonale trägt die quadrierten Spaltenlängen."})]})},{titel:"Schritt 2: charakteristisches Polynom",inhalt:e.jsxs(e.Fragment,{children:[e.jsx(ge,{children:e.jsxs("span",{className:"font-mono text-xs",children:["det(AᵀA − λI) = (",se(t)," − λ)(",se(x)," − λ) − (",se(g),")² = λ² −"," ",se(_),"λ",w===0?"":` ${w<0?"−":"+"} ${se(Math.abs(w))}`]})}),e.jsx("p",{className:"text-sm",style:{color:ue},children:"Der Koeffizient bei λ ist die Spur, das absolute Glied die Determinante von AᵀA."})]})},{titel:"Schritt 3: Nullstellen, also die Eigenwerte",inhalt:e.jsxs(e.Fragment,{children:[e.jsx(ge,{children:e.jsxs("span",{className:"font-mono text-xs",children:["λ₁,₂ = (",se(_)," ± √(",se(_),"² − 4·",se(w),")) / 2 = (",se(_)," ± √",se(N),") / 2"]})}),e.jsxs(ge,{children:[e.jsxs("span",{className:"font-mono text-xs",children:["λ₁ = ",C(k[0]),", λ₂ = ",C(k[1])]}),e.jsxs("span",{style:{color:ue},children:["Probe: λ₁ + λ₂ = ",C(k[0]+k[1])," = Spur, λ₁ · λ₂ = ",C(k[0]*k[1])," = Determinante"]})]})]})},{titel:"Schritt 4: Wurzeln ziehen – die Singulärwerte",inhalt:e.jsxs(e.Fragment,{children:[e.jsx(ge,{children:e.jsxs("span",{className:"font-mono text-xs",style:{color:li},children:["σ₁ = √",C(k[0])," = ",C(l[0]),"    σ₂ = √",C(k[1])," ="," ",C(l[1])]})}),e.jsxs("p",{className:"text-sm",style:{color:ue},children:["σ₁ ist die größte Streckung, die A einem Einheitsvektor antun kann, σ₂ die kleinste. Ihr Verhältnis σ₁/σ₂ = ",C(P)," misst, wie richtungsabhängig A wirkt. Von null verschiedene Singulärwerte: ",L,", das ist der Rang von A."]})]})},{titel:"Schritt 5: rechte Singulärvektoren",inhalt:e.jsxs(e.Fragment,{children:[e.jsx(ge,{children:e.jsxs("span",{className:"font-mono text-xs",style:{color:si},children:["v₁ = ",Ee(z[0]),"    v₂ = ",Ee(z[1])]})}),e.jsx(ge,{children:e.jsxs("span",{style:{color:ue},children:["Probe: AᵀA v₁ − λ₁v₁ = ",Ee([p[0][0]*z[0][0]+p[0][1]*z[0][1]-k[0]*z[0][0],p[1][0]*z[0][0]+p[1][1]*z[0][1]-k[0]*z[0][1]]),", v₁ᵀv₂ = ",C(f(z[0],z[1])),", ‖v₁‖ = ",C(Math.hypot(...z[0]))]})}),e.jsxs("div",{className:"my-1 flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("button",{type:"button",className:me,onClick:()=>ne(0),children:"Vorzeichen von v₁ umdrehen"}),e.jsx("button",{type:"button",className:me,onClick:()=>ne(1),children:"Vorzeichen von v₂ umdrehen"}),e.jsx("span",{style:{color:ue},children:"Beide Wahlen sind gleich richtig; mit v_i dreht sich auch u_i um."})]})]})},{titel:"Schritt 6: linke Singulärvektoren",inhalt:e.jsxs(e.Fragment,{children:[v.map((B,F)=>e.jsxs(ge,{children:[e.jsxs("span",{className:"font-mono text-xs",children:["A v",F===0?"₁":"₂"," = ",Ee(U[F]),", geteilt durch σ",F===0?"₁":"₂"," = ",C(l[F]),":"]}),B?e.jsxs("span",{className:"font-mono text-xs",style:{color:ti},children:["u",F===0?"₁":"₂"," = ",Ee(B)]}):e.jsxs("span",{style:{color:ue},children:["σ",F===0?"₁":"₂"," = 0, hier liefert die Formel keinen Vektor; v",F===0?"₁":"₂"," liegt im Kern von A."]})]},F)),y&&R?e.jsx(ge,{children:e.jsxs("span",{style:{color:ue},children:["Probe: u₁ᵀu₂ = ",C(f(y,R)),", ‖u₁‖ = ",C(Math.hypot(...y)),", ‖u₂‖ ="," ",C(Math.hypot(...R))]})}):null]})}],W=K.length,Q=Math.min(s,W);return e.jsxs("div",{children:[e.jsx(fe,{children:"Gehen wir die sechs Schritte durch und tragen wir danach eine eigene Matrix ein, etwa eine mit zwei gleichen Spalten."}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3 text-sm",children:[e.jsx("span",{children:"A ="}),e.jsx(Qe,{value:r,onChange:i,step:1})]}),e.jsx(Cn,{step:Q,setStep:a,min:1,max:W,narration:(te=K[Q-1])==null?void 0:te.titel}),e.jsx("div",{className:"space-y-3",children:K.slice(0,Q).map(B=>e.jsxs("div",{className:"rounded border border-slate-300 p-2 dark:border-slate-600",children:[e.jsx("div",{className:"text-sm font-semibold",children:B.titel}),B.inhalt]},B.titel))}),Q>=W?L===0?e.jsxs(I,{kind:"warn",titel:"Nullmatrix:",children:["Beide Singulärwerte sind null, es gibt keine Bildrichtung und keine linken Singulärvektoren. Die Formel u_i = Av_i/σ_i aus (",qe("eq:rechte-und-linke-singulaervektoren"),") ist hier nicht anwendbar."]}):L===1?e.jsxs(I,{kind:"warn",titel:"Rang 1:",children:["σ₂ = ",C(l[1])," verschwindet, die Spalten von A sind linear abhängig. Nach"," ",O("satz:charakterisierung-der-fundamentalen")," ist v₂ eine Basis des Kerns, und u₂ liefert die Formel nicht mehr; erst die volle Zerlegung ergänzt eine passende Richtung. Der Rang ist ",L,"."]}):e.jsxs(I,{kind:"ok",titel:"Probe bestanden:",children:["Beide Vorzeichenwahlen sind gleich richtig: Dreht sich v_i, so dreht sich nach (",qe("eq:rechte-und-linke-singulaervektoren"),") auch u_i, und A = UΣVᵀ bleibt unverändert (",O("bemerkung:singulaervektoren-sind-nicht-eindeutig"),"). Der größte Abstand zwischen der zurückgerechneten Matrix σ₁u₁v₁ᵀ + σ₂u₂v₂ᵀ und A beträgt hier"," ",H.toExponential(1).replace(".",",").replace("-","−"),", also nichts als Rundung. Die Proben bestätigen außerdem ",O("satz:orthogonalitaet-der-singulaervektoren"),": u₁ᵀu₂ = ",C(f(y??[],R??[])),"."]}):null,e.jsx(ri,{A:r,v:z,u:v,sig:l})]})}const Se=D.blau,Ie=D.gruen,We=D.orange,Ye=D.grau,mn=[{id:"beispiel",name:`Beispiel aus ${O("kap:matrix-spur-norm")}`,A:[[2,1],[0,1]]},{id:"drehung",name:"Drehmatrix",A:[[0,-1],[1,0]]},{id:"scherung",name:"Scherung",A:[[1,1.5],[0,1]]},{id:"gleich",name:"zwei gleiche Spalten",A:[[1,1],[1,1]]}];function ci(r){const[[i,s],[a,h]]=r,u=i*i+a*a,o=i*s+a*h,f=s*s+h*h,b=.5*Math.atan2(2*o,u-f),m=(u+f)/2,t=Math.hypot((u-f)/2,o),g=Math.sqrt(Math.max(m+t,0)),x=Math.sqrt(Math.max(m-t,0)),p=[Math.cos(b),Math.sin(b)],_=[-Math.sin(b),Math.cos(b)],w=d=>[i*d[0]+s*d[1],a*d[0]+h*d[1]],N=w(p),S=w(_),k=g>1e-9?[N[0]/g,N[1]/g]:[1,0],l=x>1e-9?[S[0]/x,S[1]/x]:[-k[1],k[0]];return{v1:p,v2:_,u1:k,u2:l,s1:g,s2:x}}const ie=r=>q(r,3);function jn(r){if(r===0)return"0";const i=Math.floor(Math.log10(Math.abs(r)));return`${q(r/10**i,2)} · 10^${i}`}const Ze=r=>`(${ie(r[0])}, ${ie(r[1])})`;function hi(){const[r,i]=E.useState(mn[0].A),[s,a]=E.useState("beispiel"),h=[[r[0][0]||0,r[0][1]||0],[r[1][0]||0,r[1][1]||0]],{v1:u,v2:o,u1:f,u2:b,s1:m,s2:t}=ci(h),g=[[1,0],[0,1]],x=[[u[0],u[1]],[o[0],o[1]]],p=[[m*u[0],m*u[1]],[t*o[0],t*o[1]]],_=Math.max(1,Fn(h),On(u,o,[m,t],[m*f[0],m*f[1]],[t*b[0],t*b[1]]))+.6,w=[{key:"start",titel:"Station 0 · Einheitskreis, dazu v₁ und v₂",m:g,vecs:[{v:u,color:Se,label:"v₁"},{v:o,color:Se,label:"v₂"}]},{key:"vt",titel:"Station 1 · Bild unter Vᵀ: v₁, v₂ liegen jetzt auf den Achsen",m:x,vecs:[{v:[1,0],color:Se,label:"e₁"},{v:[0,1],color:Se,label:"e₂"}]},{key:"svt",titel:"Station 2 · Bild unter ΣVᵀ: gestreckt um σ₁ und σ₂",m:p,vecs:[{v:[m,0],color:We,label:"σ₁e₁"},{v:[0,t],color:We,label:"σ₂e₂"}]},{key:"a",titel:"Station 3 · Bild unter UΣVᵀ = A: die Ellipse in ihrer Endlage",m:h,vecs:[{v:[m*f[0],m*f[1]],color:Ie,label:"σ₁u₁"},{v:[t*b[0],t*b[1]],color:Ie,label:"σ₂u₂"}]}],N=[[m*f[0]*u[0]+t*b[0]*o[0],m*f[0]*u[1]+t*b[0]*o[1]],[m*f[1]*u[0]+t*b[1]*o[0],m*f[1]*u[1]+t*b[1]*o[1]]];let S=0;for(let d=0;d<2;d++)for(let A=0;A<2;A++)S=Math.max(S,Math.abs(N[d][A]-h[d][A]));const k=1e-9,l=t>k?m/t:m>k?1/0:NaN;return e.jsxs("div",{children:[e.jsxs(fe,{children:["Wählen wir eine Matrix und verfolgen wir denselben Kreis über die vier Tafeln;"," ",e.jsx("span",{style:{color:Se,fontWeight:600},children:"blau"})," die rechten,"," ",e.jsx("span",{style:{color:Ie,fontWeight:600},children:"grün"})," die linken Singulärvektoren, ",e.jsx("span",{style:{color:We,fontWeight:600},children:"orange"})," die Streckung."]}),e.jsxs("div",{className:"my-3 flex flex-wrap items-center gap-3 text-sm",children:[e.jsx("span",{children:"A ="}),e.jsx(Qe,{value:r,onChange:d=>{a("frei"),i(d)}}),e.jsxs("span",{className:"font-mono text-xs",style:{color:We},children:["σ₁ = ",ie(m),", σ₂ = ",ie(t)]}),e.jsxs("span",{className:"font-mono text-xs",style:{color:Ye},children:["σ₁/σ₂ = ",ie(l)]})]}),e.jsx("div",{className:"my-2 flex flex-wrap items-center gap-2",children:mn.map(d=>e.jsx("button",{type:"button",className:s===d.id?Fe:me,"aria-pressed":s===d.id,onClick:()=>{a(d.id),i(d.A)},children:d.name},d.id))}),e.jsx("div",{className:"mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2",children:w.map(d=>e.jsxs("figure",{className:"m-0",children:[e.jsx(Ne,{matrix:d.m,vectors:d.vecs,size:190,worldHalf:_,transitionMs:250,xLabel:"x₁",yLabel:"x₂",ariaLabel:`${d.titel}; σ₁ = ${ie(m)}, σ₂ = ${ie(t)}.`}),e.jsx("figcaption",{className:"mt-1 text-xs",style:{color:Ye},children:d.titel})]},d.key))}),e.jsxs("div",{className:"mt-3 font-mono text-xs leading-relaxed",children:[e.jsxs("div",{style:{color:Se},children:["v₁ = ",Ze(u),"   v₂ = ",Ze(o)]}),e.jsxs("div",{style:{color:Ie},children:["u₁ = ",Ze(f),"   u₂ = ",Ze(b)]}),e.jsxs("div",{style:{color:Ye},children:["größter Abstand zwischen UΣVᵀ und A: ",jn(S)]})]}),m<k?e.jsx(I,{kind:"warn",titel:"Nullmatrix:",children:"Beide Singulärwerte sind null. Die Abbildung schickt jeden Vektor in den Ursprung, vom Kreis bleibt ein Punkt, und Station 2 löscht alles aus."}):t<k?e.jsxs(I,{kind:"warn",titel:"Singulär:",children:["σ₂ = ",jn(t)," liegt unter der Nullschwelle 10⁻⁹: Station 2 drückt eine ganze Richtung auf null, aus dem Kreis wird eine Strecke. Das Verhältnis σ₁/σ₂ ist nicht mehr endlich, der Rang ist 1 (",O("satz:charakterisierung-der-fundamentalen"),"), und die letzte Drehung legt die Strecke nur noch in ihre Endlage."]}):m/t>5?e.jsxs(I,{kind:"warn",titel:"Stark verzerrt:",children:["σ₁/σ₂ = ",ie(l),": Die Ellipse ist weit in die Länge gezogen, die Abbildung wirkt in den beiden Richtungen sehr unterschiedlich. Genau dieses Verhältnis ist die Konditionszahl κ₂(A) aus ",O("sec:matrix-spur-norm/eigenschaften"),"."]}):m/t>1.5?e.jsxs(I,{kind:"neutral",children:["σ₁/σ₂ = ",ie(l),": eine deutlich erkennbare Ellipse. Station 1 dreht v₁ und v₂ auf die Achsen, Station 2 streckt um ",ie(m)," und ",ie(t),", Station 3 dreht in die Endlage; zusammen ist das ",O("bemerkung:merkregel-drehen-strecken-drehen"),"."]}):e.jsxs(I,{kind:"ok",titel:"Fast winkeltreu:",children:["σ₁/σ₂ = ",ie(l),": Die Ellipse ist beinahe ein Kreis, alle Richtungen werden ähnlich stark gestreckt. Bei σ₁ = σ₂ hat Station 2 nichts zu tun, und A ist ein Vielfaches einer Orthogonalmatrix."]})]})}function pn(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["In ",e.jsx(i.a,{href:"#sec-6.1",children:"Abschnitt 6.1"}),` haben wir die Richtung stärkster Streckung als Maximalstelle
über der Einheitssphäre gesucht und dabei statt `,e.jsx(n,{children:"\\left\\|\\bA\\bx\\right\\|"}),` das
Quadrat maximiert:`]}),`
`,e.jsx(X,{tag:"6.2.1",id:"eq-eq-6-2-1",children:"\\left\\|\\bA\\bx\\right\\|^2 = (\\bA\\bx)^\\top(\\bA\\bx) = \\bx^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bx ."}),`
`,e.jsxs(i.p,{children:["Rechts steht eine ",e.jsx(c,{id:"quadratic-form",children:"quadratische Form"})," in ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`.
Diese eine Matrix bestimmt also, wie stark `,e.jsx(n,{children:"\\bA"})," in welche Richtung streckt."]}),`
`,e.jsxs(i.h3,{children:["Die Matrix ",e.jsx(n,{children:"\\bA^\\top\\bA"})]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.2.1 (Eigenschaften von AᵀA)",id:"env-eigenschaften-von-a-a",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA^\\top\\bA \\in \\R^{n \\times n}"})," ist ",e.jsx(c,{id:"symmetric-matrix",children:"symmetrisch"}),`, das
heißt `,e.jsx(n,{children:"\\bigl(\\bA^\\top\\bA\\bigr)^\\top = \\bA^\\top\\bA"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA^\\top\\bA"})," ist ",e.jsx(c,{id:"positive-definite",children:e.jsx(i.em,{children:"positiv semidefinit"})}),`, das heißt
`,e.jsx(n,{children:"\\bx^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bx \\geq 0"})," für alle ",e.jsx(n,{children:"\\bx \\in \\R^n"}),`.
Insbesondere sind alle
`,e.jsx(c,{id:"eigenvalue-eigenvector",children:"Eigenwerte"})," ",e.jsx(n,{children:"\\lambda_i"})," von ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`
nichtnegativ.`]}),`
`]})]}),`
`,e.jsxs(be,{children:[e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"(\\bX\\bY)^\\top = \\bY^\\top\\bX^\\top"})," und ",e.jsx(n,{children:"\\bigl(\\bX^\\top\\bigr)^\\top = \\bX"})]}),children:[e.jsx(i.p,{children:"Zu (1):"}),e.jsx(j,{children:"\\bigl(\\bA^\\top\\bA\\bigr)^\\top = \\bA^\\top\\bigl(\\bA^\\top\\bigr)^\\top = \\bA^\\top\\bA ."})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-eq-6-2-1",children:"(6.2.1)"}),", von rechts nach links gelesen"]}),children:[e.jsx(i.p,{children:"Zu (2): Die quadratische Form ist ein Längenquadrat:"}),e.jsx(j,{children:`\\bx^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bx = \\left\\|\\bA\\bx\\right\\|^2 \\geq 0
\\qquad \\text{für alle } \\bx \\in \\R^n .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["Eigenwertgleichung ",e.jsx(n,{children:"\\bA^\\top\\bA\\bv_i = \\lambda_i\\bv_i"}),", dann ",e.jsx(n,{children:"\\left\\|\\bv_i\\right\\| = 1"}),"; reelle Eigenwerte mit reellen Eigenvektoren gibt es dank des Spektralsatzes, siehe direkt im Anschluss"]}),children:[e.jsxs(i.p,{children:["Für die Eigenwerte setzen wir einen normierten Eigenvektor ",e.jsx(n,{children:"\\bv_i"}),` von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," zum Eigenwert ",e.jsx(n,{children:"\\lambda_i"})," ein:"]}),e.jsx(j,{children:`0 \\leq \\left\\|\\bA\\bv_i\\right\\|^2
= \\bv_i^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bv_i
= \\bv_i^\\top\\bigl(\\lambda_i\\bv_i\\bigr)
= \\lambda_i \\left\\|\\bv_i\\right\\|^2
= \\lambda_i .`})]})]}),`
`,e.jsxs(i.p,{children:[`Dass die Eigenwerte überhaupt reell sind und dass es eine
`,e.jsx(c,{id:"orthonormal-basis",children:"Orthonormalbasis"}),` aus Eigenvektoren gibt, garantiert der
`,e.jsx(c,{id:"spectral-theorem",children:"Spektralsatz"}),` für symmetrische Matrizen. Zusammen mit
`,e.jsx(c,{id:"env:eigenschaften-von-a-a",href:"#env-eigenschaften-von-a-a",children:"Satz 6.2.1"})," ergibt das:"]}),`
`,e.jsxs(M,{kind:"Korollar",label:"6.2.2 (AᵀA ist orthogonal diagonalisierbar)",id:"env-a-a-ist-orthogonal-diagonalisierbar",children:[e.jsxs(i.p,{children:["Zu ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` gibt es eine
`,e.jsx(c,{id:"orthogonal-matrix",children:"Orthogonalmatrix"})," ",e.jsx(n,{children:"\\cblue{\\bV} \\in \\R^{n \\times n}"}),` und
eine `,e.jsx(c,{id:"diagonal-matrix",children:"Diagonalmatrix"}),`
`,e.jsx(n,{children:"\\bLambda = \\diag(\\lambda_1, \\dots, \\lambda_n)"}),` mit
`,e.jsx(n,{children:"\\lambda_1 \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_n \\geq 0"}),", sodass"]}),e.jsx(j,{children:"\\bA^\\top\\bA = \\cblue{\\bV}\\bLambda\\cblue{\\bV^\\top} ."}),e.jsxs(i.p,{children:["Die Spalten von ",e.jsx(n,{children:"\\cblue{\\bV}"})," sind Eigenvektoren von ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` und bilden
eine Orthonormalbasis des `,e.jsx(n,{children:"\\R^n"}),"."]})]}),`
`,e.jsxs(i.p,{children:["In der Basis aus den Spalten von ",e.jsx(n,{children:"\\cblue{\\bV}"})," skaliert ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` also nur
entlang der Achsen. Durch den ganzen Abschnitt begleitet uns eine kleine
Beispielmatrix.`]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.2.3 (Die Matrix AᵀA einer 3×2-Matrix)",id:"env-die-matrix-a-a-einer-3-2-matrix",children:[e.jsx(i.p,{children:"Sei"}),e.jsx(j,{children:`\\bA = \\begin{pmatrix} \\ba_1 & \\ba_2 \\end{pmatrix}
= \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\\\ 1 & 0 \\end{pmatrix} \\in \\R^{3 \\times 2} .`}),e.jsxs(i.p,{children:["Der Eintrag ",e.jsx(n,{children:"(i,j)"})," von ",e.jsx(n,{children:"\\bA^\\top\\bA"})," ist das Skalarprodukt der ",e.jsx(n,{children:"i"}),`-ten mit der
`,e.jsx(n,{children:"j"}),"-ten Spalte von ",e.jsx(n,{children:"\\bA"}),":"]}),e.jsx(j,{children:`\\bA^\\top\\bA
= \\begin{pmatrix} \\ba_1^\\top\\ba_1 & \\ba_1^\\top\\ba_2 \\\\ \\ba_2^\\top\\ba_1 & \\ba_2^\\top\\ba_2 \\end{pmatrix}
= \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 0 \\end{pmatrix}
  \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\\\ 1 & 0 \\end{pmatrix}
= \\begin{pmatrix} 6 & 4 \\\\ 4 & 5 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Die Symmetrie sieht man der Matrix an. Die Eigenwerte liefert das
`,e.jsx(c,{id:"characteristic-polynomial",children:"charakteristische Polynom"}),":"]}),e.jsx(j,{children:`\\det\\bigl(\\bA^\\top\\bA - \\lambda\\bI\\bigr) = (6-\\lambda)(5-\\lambda) - 16
= \\lambda^2 - 11\\lambda + 14 \\overset{!}{=} 0 ,`}),e.jsx(i.p,{children:"also"}),e.jsx(j,{children:`\\lambda_{1,2} = \\frac{11 \\pm \\sqrt{11^2 - 4 \\cdot 14}}{2} = \\frac{11 \\pm \\sqrt{65}}{2},
\\qquad
\\corange{\\lambda_1} \\approx \\corange{9{,}531}, \\qquad \\corange{\\lambda_2} \\approx \\corange{1{,}469} .`}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:eigenschaften-von-a-a",href:"#env-eigenschaften-von-a-a",children:"Satz 6.2.1"})," verspricht nur ",e.jsx(n,{children:"\\lambda_i \\geq 0"}),`. Hier sind beide Eigenwerte sogar
echt positiv, `,e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist also positiv definit. Der Grund: Die beiden
Spalten von `,e.jsx(n,{children:"\\bA"})," sind ",e.jsx(c,{id:"linear-independence",children:"linear unabhängig"}),`,
`,e.jsx(n,{children:"\\bA\\bx = \\bnull"}),` gilt somit nur für
`,e.jsx(n,{children:"\\bx = \\bnull"}),", und ein Eigenwert ",e.jsx(n,{children:"0"}),` hätte nach der Rechnung oben einen
Eigenvektor mit `,e.jsx(n,{children:"\\bA\\bv = \\bnull"})," verlangt. Zwei Proben: Die Summe der Eigenwerte ist ",e.jsx(n,{children:"11"}),", die ",e.jsx(c,{id:"env:spur",children:"Spur"})," von ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`; ihr
Produkt ist `,e.jsx(n,{children:"14"}),", die ",e.jsx(c,{id:"determinant",children:"Determinante"})," ",e.jsx(n,{children:"6 \\cdot 5 - 4^2"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Singulärwerte"}),`
`,e.jsxs(i.p,{children:["Die Eigenwerte von ",e.jsx(n,{children:"\\bA^\\top\\bA"})," sind nach ",e.jsx(i.a,{href:"#eq-eq-6-2-1",children:"(6.2.1)"}),` quadrierte Längen. Wer an
Streckungsfaktoren interessiert ist, zieht deshalb die Wurzel.`]}),`
`,e.jsxs(M,{kind:"Definition",label:"6.2.4 (Singulärwerte)",id:"env-singulaerwerte",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," heißen die ",e.jsx(n,{children:"q=\\min(m,n)"})," Zahlen"]}),e.jsx(j,{children:"\\corange{\\sigma_1}\\ge\\cdots\\ge\\corange{\\sigma_q}\\ge0"}),e.jsxs(i.p,{children:["die ",e.jsx(i.em,{children:"Singulärwerte"})," (singular values) von ",e.jsx(n,{children:"\\bA"}),`. Die positiven unter ihnen
sind die Quadratwurzeln der positiven Eigenwerte von `,e.jsx(n,{children:"\\bA^\\top\\bA"}),`; bis zur
Länge `,e.jsx(n,{children:"q"})," wird die Liste mit Nullen ergänzt."]})]}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.2.5 (Singulärwerte sind Streckungsfaktoren)",id:"env-singulaerwerte-sind-streckungsfaktoren",children:[e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\sigma_1} = \\max_{\\left\\|\\bx\\right\\| = 1} \\left\\|\\bA\\bx\\right\\|"}),` ist
die maximale Streckung. Das ist das Maximierungsproblem aus
`,e.jsx(i.a,{href:"#sec-6.1",children:"Abschnitt 6.1"}),": Über ",e.jsx(i.a,{href:"#eq-eq-6-2-1",children:"(6.2.1)"}),` maximieren wir die quadratische
Form von `,e.jsx(n,{children:"\\bA^\\top\\bA"}),`, und deren größter Wert auf der Einheitssphäre ist
`,e.jsx(n,{children:"\\lambda_1"}),"."]}),`
`,e.jsxs(i.li,{children:["Falls ",e.jsx(n,{children:"m\\ge n"}),", ist ",e.jsx(n,{children:"\\corange{\\sigma_n} = \\min_{\\left\\|\\bx\\right\\| = 1} \\left\\|\\bA\\bx\\right\\|"}),`
die minimale Streckung. Für `,e.jsx(n,{children:"m<n"})," ist dieses Minimum null, weil ",e.jsx(n,{children:"\\bA"}),` dann
einen nichttrivialen Kern hat; in der erweiterten Liste (letzter Punkt)
ist das `,e.jsx(n,{children:"\\sigma_n = 0"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\sigma_i = 0"})," gilt genau dann, wenn ",e.jsx(n,{children:"\\lambda_i = 0"})," ist."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Konvention bei breiten Matrizen."})," Für ",e.jsx(n,{children:"m < n"})," hat ",e.jsx(n,{children:"\\bA^\\top\\bA"})," insgesamt ",e.jsx(n,{children:"n"}),`
Eigenwerte, darunter mindestens `,e.jsx(n,{children:"n-m"}),` strukturell erzwungene Nullen. Als
Singulärwerte zählen nur die `,e.jsx(n,{children:"q = \\min(m,n)"}),` Diagonalplätze von
`,e.jsx(n,{children:"\\corange{\\bSigma}"}),`; wer alle Eigenwerte indizieren will, ergänzt
`,e.jsx(n,{children:"\\sigma_{q+1} = \\cdots = \\sigma_n = 0"})," zu dieser ",e.jsx(i.em,{children:"erweiterten Liste"}),`, ohne
dass die Nullen weitere Diagonaleinträge wären.`]}),`
`]}),e.jsxs(i.p,{children:["Der größte Singulärwert ist damit die ",e.jsx(i.em,{children:"Spektralnorm"})," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"}),`
aus `,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),`
(`,e.jsx(c,{id:"env:spektralnorm-und-groesster-singulaerwert",href:"#env-spektralnorm-und-groesster-singulaerwert",children:"Satz 6.4.1"}),")."]})]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.2.6 (Singulärwerte der Beispielmatrix)",id:"env-singulaerwerte-der-beispielmatrix",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA"})," aus ",e.jsx(i.a,{href:"#env-die-matrix-a-a-einer-3-2-matrix",children:"Beispiel 6.2.3"}),` mit
`,e.jsx(n,{children:"\\corange{\\lambda_1} \\approx \\corange{9{,}531}"}),` und
`,e.jsx(n,{children:"\\corange{\\lambda_2} \\approx \\corange{1{,}469}"})," ist"]}),e.jsx(j,{children:`\\corange{\\sigma_1} = \\sqrt{\\lambda_1} \\approx \\sqrt{9{,}531} \\approx \\corange{3{,}087} ,
\\qquad
\\corange{\\sigma_2} = \\sqrt{\\lambda_2} \\approx \\sqrt{1{,}469} \\approx \\corange{1{,}212} .`}),e.jsxs(i.p,{children:["In der einen Richtung streckt ",e.jsx(n,{children:"\\bA"}),` also um gut das Dreifache, in der anderen
wächst die Länge nur um gut ein Fünftel. Ihr Verhältnis`]}),e.jsx(j,{children:"\\frac{\\corange{\\sigma_1}}{\\corange{\\sigma_2}} \\approx \\frac{3{,}087}{1{,}212} \\approx 2{,}55"}),e.jsxs(i.p,{children:["sagt, wie richtungsabhängig (",e.jsx(i.em,{children:"anisotrop"}),`) diese Matrix wirkt. Für quadratische,
invertierbare Matrizen ist `,e.jsx(n,{children:"\\sigma_1/\\sigma_n"}),` die Spektralkondition
`,e.jsx(n,{children:"\\kappa_2(\\bA) = \\left\\|\\bA\\right\\|_2 \\left\\|\\bA^{-1}\\right\\|_2"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`:
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\corange{\\sigma_1}"}),` ist die stärkste Streckung
durch `,e.jsx(n,{children:"\\bA"}),", und ",e.jsx(n,{children:"\\left\\|\\bA^{-1}\\right\\|_2 = 1/\\corange{\\sigma_n}"}),`, denn die
schwächste Streckung durch `,e.jsx(n,{children:"\\bA"})," ist die stärkste durch ",e.jsx(n,{children:"\\bA^{-1}"}),`.
Für rechteckige Matrizen mit vollem Spaltenrang wie diese ist
`,e.jsx(n,{children:"\\sigma_1/\\sigma_n"})," die übliche Verallgemeinerung."]})]}),`
`,e.jsx(i.h3,{children:"Singulärvektoren"}),`
`,e.jsxs(i.p,{children:["Streckungsfaktoren allein nützen wenig, solange wir nicht wissen, ",e.jsx(i.em,{children:"welche"}),`
Richtung um `,e.jsx(n,{children:"\\sigma_i"}),` gestreckt wird. Diese Richtungen stecken bereits in
`,e.jsx(c,{id:"env:a-a-ist-orthogonal-diagonalisierbar",href:"#env-a-a-ist-orthogonal-diagonalisierbar",children:"Korollar 6.2.2"}),"."]}),`
`,e.jsxs(M,{kind:"Definition",label:"6.2.7 (Rechte und linke Singulärvektoren)",id:"env-rechte-und-linke-singulaervektoren",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),`. Für die rechten Singulärvektoren verwenden wir
die in `,e.jsx(i.a,{href:"#env-singulaerwerte-sind-streckungsfaktoren",children:"Bemerkung 6.2.5"}),` erklärte erweiterte Liste
`,e.jsx(n,{children:"\\sigma_1 \\geq \\cdots \\geq \\sigma_n \\geq 0"}),"; bei ",e.jsx(n,{children:"m<n"}),` enthält sie die
zusätzlichen erzwungenen Nullen.`]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"rechten Singulärvektoren"})," ",e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_n} \\in \\R^n"}),`
sind normierte, paarweise orthogonale Eigenvektoren von `,e.jsx(n,{children:"\\bA^\\top\\bA"}),":"]}),`
`,e.jsx(j,{children:`\\bA^\\top\\bA\\,\\cblue{\\bv_i} = \\lambda_i \\cblue{\\bv_i} = \\corange{\\sigma_i^2}\\,\\cblue{\\bv_i} ,
\\qquad \\left\\|\\cblue{\\bv_i}\\right\\| = 1 .`}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Die ",e.jsx(i.em,{children:"linken Singulärvektoren"})," ",e.jsx(n,{children:"\\cgreen{\\bu_i} \\in \\R^m"}),` sind für
`,e.jsx(n,{children:"\\sigma_i > 0"})," erklärt durch"]}),`
`,e.jsx(X,{tag:"6.2.2",id:"eq-rechte-und-linke-singulaervektoren",children:`\\cgreen{\\bu_i} = \\frac{\\bA\\,\\cblue{\\bv_i}}{\\corange{\\sigma_i}} ,
\\qquad\\text{gleichwertig}\\qquad
\\bA\\,\\cblue{\\bv_i} = \\corange{\\sigma_i}\\,\\cgreen{\\bu_i} .`}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:["Die zweite Schreibweise in ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` sagt mehr:
`,e.jsx(n,{children:"\\bA"})," bildet die Richtung ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," auf die Richtung ",e.jsx(n,{children:"\\cgreen{\\bu_i}"}),`
ab und streckt dabei um `,e.jsx(n,{children:"\\corange{\\sigma_i}"}),`. Dass diese Bildrichtungen
aufeinander senkrecht stehen, zeigt der nächste Satz; auf ihm beruht die ganze
Konstruktion.`]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.2.8 (Orthogonalität der Singulärvektoren)",id:"env-orthogonalitaet-der-singulaervektoren",children:[e.jsxs(i.p,{children:["Seien ",e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_n}"}),` orthonormale rechte
Singulärvektoren von `,e.jsx(n,{children:"\\bA"}),". Dann gilt"]}),e.jsx(j,{children:`\\bigl(\\bA\\,\\cblue{\\bv_i}\\bigr)^\\top\\bigl(\\bA\\,\\cblue{\\bv_j}\\bigr) = 0
\\quad \\text{für } i \\neq j ,
\\qquad
\\left\\|\\bA\\,\\cblue{\\bv_i}\\right\\| = \\corange{\\sigma_i} .`}),e.jsxs(i.p,{children:["Insbesondere sind die linken Singulärvektoren ",e.jsx(n,{children:`\\cgreen{\\bu_1}, \\dots,
\\cgreen{\\bu_r}`})," zu den ",e.jsx(n,{children:"r"})," von null verschiedenen Singulärwerten orthonormal."]})]}),`
`,e.jsx(ee,{title:"Beweis der Orthogonalität",children:e.jsxs(be,{children:[e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"(\\bA\\bv_i)^\\top(\\bA\\bv_j) = \\bv_i^\\top\\bA^\\top\\bA\\bv_j"}),"; dann die Eigenwertgleichung für ",e.jsx(n,{children:"\\bv_j"})," und zuletzt die Orthogonalität ",e.jsx(n,{children:"\\bv_i^\\top\\bv_j = 0"})]}),children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"i \\neq j"})," rechnen wir"]}),e.jsx(j,{children:`\\bigl(\\bA\\bv_i\\bigr)^\\top\\bigl(\\bA\\bv_j\\bigr)
= \\bv_i^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bv_j
= \\bv_i^\\top\\bigl(\\lambda_j\\bv_j\\bigr)
= \\lambda_j\\bigl(\\bv_i^\\top\\bv_j\\bigr)
= \\lambda_j \\cdot 0 = 0 .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(i.a,{href:"#eq-eq-6-2-1",children:"(6.2.1)"})," mit ",e.jsx(n,{children:"\\bx = \\bv_i"}),", danach Eigenwertgleichung und ",e.jsx(n,{children:"\\left\\|\\bv_i\\right\\| = 1"})]}),children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"i = j"})," liefert dieselbe Rechnung die Länge:"]}),e.jsx(j,{children:`\\left\\|\\bA\\bv_i\\right\\|^2 = \\bv_i^\\top\\bigl(\\bA^\\top\\bA\\bigr)\\bv_i
= \\lambda_i \\left\\|\\bv_i\\right\\|^2 = \\lambda_i = \\corange{\\sigma_i^2} .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["dividieren dürfen wir nur bei ",e.jsx(n,{children:"\\sigma_i, \\sigma_j > 0"}),", also für Indizes ",e.jsx(n,{children:"i, j \\leq r"}),"; die übrigen ",e.jsx(n,{children:"\\bu_i"})," liefert ",e.jsx(c,{id:"env:rechte-und-linke-singulaervektoren",href:"#env-rechte-und-linke-singulaervektoren",children:"Definition 6.2.7"})," gar nicht erst"]}),children:[e.jsxs(i.p,{children:["Die ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," sind ortho",e.jsx(i.em,{children:"normal"}),", ihre Bilder ",e.jsx(n,{children:"\\bA\\cblue{\\bv_i}"}),`
dagegen nur orthogonal, mit Längen
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),". Erst die Normierung ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` macht daraus orthonormale
Vektoren,`]}),e.jsx(j,{children:`\\cgreen{\\bu_i^\\top\\bu_j}
= \\frac{\\bigl(\\bA\\bv_i\\bigr)^\\top\\bigl(\\bA\\bv_j\\bigr)}{\\corange{\\sigma_i\\sigma_j}} = 0
\\quad (i \\neq j) ,
\\qquad
\\left\\|\\cgreen{\\bu_i}\\right\\| = \\frac{\\left\\|\\bA\\bv_i\\right\\|}{\\corange{\\sigma_i}} = 1 .`})]})]})}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.2.9 (Singulärvektoren der Beispielmatrix)",id:"env-singulaervektoren-der-beispielmatrix",children:[e.jsxs(i.p,{children:["Wir bleiben bei ",e.jsx(n,{children:"\\bA"})," aus ",e.jsx(i.a,{href:"#env-die-matrix-a-a-einer-3-2-matrix",children:"Beispiel 6.2.3"}),` mit
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\bigl(\\begin{smallmatrix} 6 & 4 \\\\ 4 & 5 \\end{smallmatrix}\\bigr)"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rechte Singulärvektoren."})," Für ",e.jsx(n,{children:"\\lambda_1 \\approx 9{,}531"}),` suchen wir
`,e.jsx(n,{children:"\\cblue{\\bv_1}"})," mit"]}),e.jsx(j,{children:`\\begin{pmatrix} 6 & 4 \\\\ 4 & 5 \\end{pmatrix}
\\begin{pmatrix} v_{11} \\\\ v_{21} \\end{pmatrix}
= 9{,}531 \\begin{pmatrix} v_{11} \\\\ v_{21} \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die erste Zeile heißt ",e.jsx(n,{children:"(6 - 9{,}531)\\,v_{11} + 4\\,v_{21} = 0"}),`, also
`,e.jsx(n,{children:"v_{21} \\approx 0{,}883\\,v_{11}"}),`. Normieren wir (das Vorzeichen dürfen wir dabei
frei wählen, siehe `,e.jsx(i.a,{href:"#env-singulaervektoren-sind-nicht-eindeutig",children:"Bemerkung 6.2.10"}),`), so ergibt sich zusammen mit dem dazu
orthogonalen zweiten Eigenvektor`]}),e.jsx(j,{children:`\\cblue{\\bv_1} \\approx \\begin{pmatrix} -0{,}750 \\\\ -0{,}662 \\end{pmatrix} ,
\\qquad
\\cblue{\\bv_2} \\approx \\begin{pmatrix} 0{,}662 \\\\ -0{,}750 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Linke Singulärvektoren."})," Jetzt liefert ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"})," die Bildrichtungen:"]}),e.jsx(j,{children:`\\cgreen{\\bu_1} = \\frac{\\bA\\,\\cblue{\\bv_1}}{\\corange{\\sigma_1}}
\\approx \\frac{1}{\\corange{3{,}087}}
\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\\\ 1 & 0 \\end{pmatrix}
\\begin{pmatrix} -0{,}750 \\\\ -0{,}662 \\end{pmatrix}
= \\frac{1}{\\corange{3{,}087}} \\begin{pmatrix} -2{,}074 \\\\ -2{,}162 \\\\ -0{,}750 \\end{pmatrix}
\\approx \\begin{pmatrix} -0{,}672 \\\\ -0{,}700 \\\\ -0{,}243 \\end{pmatrix} ,`}),e.jsx(j,{children:`\\cgreen{\\bu_2} = \\frac{\\bA\\,\\cblue{\\bv_2}}{\\corange{\\sigma_2}}
\\approx \\frac{1}{\\corange{1{,}212}} \\begin{pmatrix} -0{,}838 \\\\ 0{,}574 \\\\ 0{,}662 \\end{pmatrix}
\\approx \\begin{pmatrix} -0{,}691 \\\\ 0{,}474 \\\\ 0{,}546 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Probe auf Orthonormalität."})," ",e.jsx(c,{id:"env:orthogonalitaet-der-singulaervektoren",href:"#env-orthogonalitaet-der-singulaervektoren",children:"Satz 6.2.8"}),` behauptet, dass diese beiden Vektoren
orthonormal sind, und die Zahlen bestätigen es:`]}),e.jsx(j,{children:`\\begin{aligned}
\\cgreen{\\bu_1^\\top\\bu_2}
&\\approx (-0{,}672)(-0{,}691) + (-0{,}700)(0{,}474) + (-0{,}243)(0{,}546) \\\\
&= 0{,}4644 - 0{,}3318 - 0{,}1327 \\approx 0 , \\\\[2pt]
\\left\\|\\cgreen{\\bu_1}\\right\\|
&\\approx \\sqrt{0{,}672^2 + 0{,}700^2 + 0{,}243^2}
= \\sqrt{0{,}4516 + 0{,}4900 + 0{,}0590} \\approx 1 .
\\end{aligned}`})]}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.2.10 (Singulärvektoren sind nicht eindeutig)",id:"env-singulaervektoren-sind-nicht-eindeutig",children:e.jsxs(i.p,{children:["Mit ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," ist auch ",e.jsx(n,{children:"-\\cblue{\\bv_i}"}),` ein normierter Eigenvektor zum
selben Eigenwert. Die Singulärwerte ändern sich dadurch nicht, die Vektoren
schon, und zwar paarweise: Nach `,e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` dreht
sich mit `,e.jsx(n,{children:"\\cblue{\\bv_i}"})," zugleich ",e.jsx(n,{children:"\\cgreen{\\bu_i}"}),` um, sonst passen die beiden
Seiten von `,e.jsx(n,{children:"\\bA\\cblue{\\bv_i} = \\corange{\\sigma_i}\\cgreen{\\bu_i}"}),` nicht mehr
zusammen. Bei mehrfachen Singulärwerten ist die Freiheit noch größer: Im
zugehörigen Eigenraum lässt sich die Orthonormalbasis beliebig drehen.`]})}),`
`,e.jsxs(i.p,{children:["Stimmt die Handrechnung? Was liefert ",e.jsx(i.code,{children:"svd(A)"})," in R?"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`A <- matrix(c(1, 2,
              2, 1,
              1, 0), nrow = 3, byrow = TRUE)
svd(A)
`})}),`
`,e.jsxs(i.p,{children:["Die Komponente ",e.jsx(i.code,{children:"d"})," enthält die Singulärwerte ",e.jsx(n,{children:"3{,}087"})," und ",e.jsx(n,{children:"1{,}212"}),` wie von Hand
berechnet, die Spalten von `,e.jsx(i.code,{children:"u"})," und ",e.jsx(i.code,{children:"v"}),` die Singulärvektoren, womöglich mit
anderen Vorzeichen als bei uns. Numerische Bibliotheken wählen das Vorzeichen
nach eigenen Konventionen; falsch ist deshalb keine der beiden Rechnungen.`]}),`
`,e.jsxs(we,{title:"Die Rechnung Schritt für Schritt",children:[e.jsxs(i.p,{children:[`Wie läuft dieser Weg an einer anderen Matrix, und was geht schief, wenn die
beiden Spalten linear abhängig sind? Das Widget rechnet die Schritte von
`,e.jsx(i.a,{href:"#env-die-matrix-a-a-einer-3-2-matrix",children:"Beispiel 6.2.3"})," bis ",e.jsx(i.a,{href:"#env-singulaervektoren-der-beispielmatrix",children:"6.2.9"})," für jede eingetragene ",e.jsx(n,{children:"3 \\times 2"}),`-Matrix nach; die
beiden Vorzeichen-Knöpfe in Schritt 5 führen `,e.jsx(i.a,{href:"#env-singulaervektoren-sind-nicht-eindeutig",children:"Bemerkung 6.2.10"}),` vor. Unter den
Schritten steht dieselbe Abbildung geometrisch: links der Einheitskreis des
`,e.jsx(n,{children:"\\R^2"}),", rechts sein Bild im ",e.jsx(n,{children:"\\R^3"}),"."]}),e.jsx(ai,{}),e.jsxs(i.p,{children:["Sind die beiden Spalten linear abhängig, so verschwindet ",e.jsx(n,{children:"\\corange{\\sigma_2}"}),`,
und für `,e.jsx(n,{children:"\\cgreen{\\bu_2}"})," liefert ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` nichts
mehr, weil sie durch `,e.jsx(n,{children:"\\corange{\\sigma_2}"})," teilt."]})]}),`
`,e.jsx(i.h3,{children:"Fundamentale Unterräume"}),`
`,e.jsx(i.p,{children:"Die Singulärvektoren liefern außerdem Basen der fundamentalen Unterräume."}),`
`,e.jsxs(M,{kind:"Satz",label:"6.2.11 (Charakterisierung der fundamentalen Unterräume)",id:"env-charakterisierung-der-fundamentalen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit genau ",e.jsx(n,{children:"r"}),` von null verschiedenen
Singulärwerten. In der erweiterten Liste aus `,e.jsx(i.a,{href:"#env-singulaerwerte-sind-streckungsfaktoren",children:"Bemerkung 6.2.5"}),` gilt also
`,e.jsx(n,{children:"\\sigma_1 \\geq \\cdots \\geq \\sigma_r > 0"}),` und
`,e.jsx(n,{children:"\\sigma_{r+1} = \\cdots = \\sigma_n = 0"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\{\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_r}\\}"}),` ist eine Orthonormalbasis des
Zeilenraums `,e.jsx(n,{children:"\\col(\\bA^\\top)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\{\\bA\\cblue{\\bv_1}, \\dots, \\bA\\cblue{\\bv_r}\\}"}),` ist eine Orthogonalbasis des
Spaltenraums `,e.jsx(n,{children:"\\col(\\bA)"}),", also des ",e.jsx(c,{id:"image",children:"Bildes"})," von ",e.jsx(n,{children:"\\bA"}),`; normiert
man sie, erhält man die Orthonormalbasis
`,e.jsx(n,{children:"\\{\\cgreen{\\bu_1}, \\dots, \\cgreen{\\bu_r}\\}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\{\\cblue{\\bv_{r+1}}, \\dots, \\cblue{\\bv_n}\\}"}),` ist eine Orthonormalbasis des
`,e.jsx(c,{id:"kernel",children:"Kerns"})," ",e.jsx(n,{children:"\\operatorname{Kern}(\\bA)"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\rang(\\bA) = r"}),": Der ",e.jsx(c,{id:"rank",children:"Rang"})," von ",e.jsx(n,{children:"\\bA"}),` ist die Anzahl der von null
verschiedenen Singulärwerte.`]}),`
`]})]}),`
`,e.jsxs(ee,{title:"Beweis der Charakterisierung der Unterräume",children:[e.jsx(i.p,{children:"Der Beweis geht in vier Etappen: Kern, Umkehrung, Spaltenraum, Zeilenraum."}),e.jsxs(be,{children:[e.jsx($,{why:e.jsx(e.Fragment,{children:"nur der Nullvektor hat die Länge null"}),children:e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"i > r"})," ist ",e.jsx(n,{children:"\\corange{\\sigma_i} = 0"}),", nach ",e.jsx(c,{id:"env:orthogonalitaet-der-singulaervektoren",href:"#env-orthogonalitaet-der-singulaervektoren",children:"Satz 6.2.8"}),` also
`,e.jsx(n,{children:"\\left\\|\\bA\\cblue{\\bv_i}\\right\\| = 0"})," und damit ",e.jsx(n,{children:"\\bA\\cblue{\\bv_i} = \\bnull"}),`. Die
letzten `,e.jsx(n,{children:"n - r"})," rechten Singulärvektoren liegen im Kern von ",e.jsx(n,{children:"\\bA"}),"."]})}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["die Summanden mit ",e.jsx(n,{children:"i > r"})," fallen weg; die ",e.jsx(n,{children:"\\cgreen{\\bu_i}"})," sind orthonormal, also linear unabhängig, und wegen ",e.jsx(n,{children:"\\corange{\\sigma_i} > 0"})," müssen alle Koeffizienten verschwinden"]}),children:[e.jsxs(i.p,{children:["Umgekehrt liegt jedes ",e.jsx(n,{children:"\\bx"})," mit ",e.jsx(n,{children:"\\bA\\bx = \\bnull"}),` in deren
`,e.jsx(c,{id:"span",children:"linearer Hülle"}),`. Wir
entwickeln `,e.jsx(n,{children:"\\bx = \\sum_{i=1}^n c_i \\cblue{\\bv_i}"})," und erhalten"]}),e.jsx(j,{children:"\\bnull = \\bA\\bx = \\sum_{i=1}^{r} c_i\\,\\corange{\\sigma_i}\\,\\cgreen{\\bu_i} ,"}),e.jsxs(i.p,{children:["woraus ",e.jsx(n,{children:"c_1 = \\cdots = c_r = 0"}),` folgt. Zusammen mit dem ersten Schritt ist
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA) = \\spann\\{\\cblue{\\bv_{r+1}}, \\dots, \\cblue{\\bv_n}\\}"}),`,
und diese Vektoren sind als Teil einer Orthonormalbasis orthonormal.`]})]}),e.jsx($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\bA\\be_j"})," ist die ",e.jsx(n,{children:"j"}),"-te Spalte von ",e.jsx(n,{children:"\\bA"}),"; die Summanden mit ",e.jsx(n,{children:"i > r"})," fallen nach Schritt 1 weg"]}),children:e.jsxs(i.p,{children:["Die Spalten von ",e.jsx(n,{children:"\\bA"})," sind Linearkombinationen der ",e.jsx(n,{children:"\\bA\\cblue{\\bv_i}"}),` mit
`,e.jsx(n,{children:"i \\leq r"}),": Für jeden Einheitsvektor ",e.jsx(n,{children:"\\be_j"}),` ist
`,e.jsx(n,{children:"\\be_j = \\sum_{i=1}^n (\\cblue{\\bv_i^\\top}\\be_j)\\,\\cblue{\\bv_i}"}),`, und Anwenden von
`,e.jsx(n,{children:"\\bA"}),` liefert
`,e.jsx(n,{children:"\\bA\\be_j = \\sum_{i \\leq r} (\\cblue{\\bv_i^\\top}\\be_j)\\,\\bA\\cblue{\\bv_i}"}),`. Die
`,e.jsx(n,{children:"r"})," Vektoren ",e.jsx(n,{children:"\\bA\\cblue{\\bv_i}"})," sind nach ",e.jsx(c,{id:"env:orthogonalitaet-der-singulaervektoren",href:"#env-orthogonalitaet-der-singulaervektoren",children:"Satz 6.2.8"}),` orthogonal und von null
verschieden, also linear unabhängig. Sie bilden damit eine Orthogonalbasis von
`,e.jsx(n,{children:"\\col(\\bA)"}),", und es folgt ",e.jsx(n,{children:"\\rang(\\bA) = \\dim \\col(\\bA) = r"}),"."]})}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"r"})," linear unabhängige Vektoren in einem ",e.jsx(n,{children:"r"}),"-dimensionalen Raum bilden bereits eine Basis, und orthonormale Vektoren sind linear unabhängig"]}),children:[e.jsxs(i.p,{children:["Für den Zeilenraum multiplizieren wir ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"})," von links mit ",e.jsx(n,{children:"\\bA^\\top"}),`: Für
`,e.jsx(n,{children:"i \\leq r"})," ist"]}),e.jsx(j,{children:`\\bA^\\top\\cgreen{\\bu_i} = \\frac{\\bA^\\top\\bA\\,\\cblue{\\bv_i}}{\\corange{\\sigma_i}}
= \\frac{\\corange{\\sigma_i^2}\\,\\cblue{\\bv_i}}{\\corange{\\sigma_i}}
= \\corange{\\sigma_i}\\,\\cblue{\\bv_i} .`}),e.jsxs(i.p,{children:["Jedes ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," mit ",e.jsx(n,{children:"i \\leq r"}),` ist also eine Linearkombination von Spalten
von `,e.jsx(n,{children:"\\bA^\\top"}),", liegt somit in ",e.jsx(n,{children:"\\col(\\bA^\\top)"}),`. Da
`,e.jsx(n,{children:"\\dim\\col(\\bA^\\top) = \\rang(\\bA^\\top) = \\rang(\\bA) = r"}),` ist und die
`,e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_r}"}),` orthonormal sind, spannen sie
`,e.jsx(n,{children:"\\col(\\bA^\\top)"})," vollständig auf."]})]})]})]}),`
`,e.jsxs(i.p,{children:[`Den vierten fundamentalen Unterraum, den linken Kern
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA^\\top)"}),`, spannen orthonormale Vektoren
`,e.jsx(n,{children:"\\cgreen{\\bu_{r+1}}, \\dots, \\cgreen{\\bu_m}"}),` auf, die
`,e.jsx(n,{children:"\\cgreen{\\bu_1}, \\dots, \\cgreen{\\bu_r}"})," zu einer Orthonormalbasis des ",e.jsx(n,{children:"\\R^m"}),`
ergänzen; das nächste Beispiel führt das vor. Damit liefert die SVD
Orthonormalbasen für alle vier fundamentalen Unterräume.`]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.2.12 (Alle Unterräume einer Rang-1-Matrix)",id:"env-alle-unterraeume-einer-rang-1-matrix",children:[e.jsx(i.p,{children:"Wir nehmen"}),e.jsx(j,{children:`\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\\\ 0 & 0 \\end{pmatrix} ,
\\qquad
\\bA^\\top\\bA = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Singulärwerte."}),` Das charakteristische Polynom ist
`,e.jsx(n,{children:"(2-\\lambda)^2 - 4 = \\lambda^2 - 4\\lambda = \\lambda(\\lambda - 4)"}),`, also
`,e.jsx(n,{children:"\\lambda_1 = 4"})," und ",e.jsx(n,{children:"\\lambda_2 = 0"})," und damit"]}),e.jsx(j,{children:"\\corange{\\sigma_1} = 2 , \\qquad \\corange{\\sigma_2} = 0 , \\qquad r = 1 ."}),e.jsxs(i.p,{children:["In Richtung ",e.jsx(n,{children:"\\cblue{\\bv_1}"})," streckt ",e.jsx(n,{children:"\\bA"})," um den Faktor ",e.jsx(n,{children:"2"}),`, in Richtung
`,e.jsx(n,{children:"\\cblue{\\bv_2}"})," um den Faktor ",e.jsx(n,{children:"0"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rechte Singulärvektoren und Zeilenraum."}),` Die Eigenvektoren von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," sind"]}),e.jsx(j,{children:`\\cblue{\\bv_1} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} ,
\\qquad
\\cblue{\\bv_2} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\col(\\bA^\\top) = \\spann\\{\\cblue{\\bv_1}\\} = \\spann\\bigl\\{(1, 1)^\\top\\bigr\\}"}),`.
Das passt: Die beiden Zeilen von `,e.jsx(n,{children:"\\bA"}),`, die nicht null sind, lauten beide
`,e.jsx(n,{children:"(1, 1)"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Linker Singulärvektor und Spaltenraum."})," Aus ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"})," folgt"]}),e.jsx(j,{children:`\\cgreen{\\bu_1} = \\frac{\\bA\\cblue{\\bv_1}}{\\corange{\\sigma_1}}
= \\frac{1}{2} \\cdot \\tfrac{1}{\\sqrt{2}} \\begin{pmatrix} 2 \\\\ 2 \\\\ 0 \\end{pmatrix}
= \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} ,`}),e.jsxs(i.p,{children:["also ",e.jsx(n,{children:"\\col(\\bA) = \\spann\\{\\cgreen{\\bu_1}\\} = \\spann\\bigl\\{(1, 1, 0)^\\top\\bigr\\}"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Kern."})," Nach ",e.jsx(c,{id:"env:charakterisierung-der-fundamentalen",href:"#env-charakterisierung-der-fundamentalen",children:"Satz 6.2.11"}),` ist
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA) = \\spann\\{\\cblue{\\bv_2}\\} = \\spann\\bigl\\{(1, -1)^\\top\\bigr\\}"}),`,
und die Probe bestätigt das:
`,e.jsx(n,{children:"\\bA (1, -1)^\\top = (0, 0, 0)^\\top"}),"."]}),e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Linker Kern."})," Für ",e.jsx(n,{children:"\\cgreen{\\bu_2}"})," liefert ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` nichts, denn
`,e.jsx(n,{children:"\\corange{\\sigma_2} = 0"}),"; ein ",e.jsx(n,{children:"\\cgreen{\\bu_3}"}),` sieht die Formel nicht
vor, weil `,e.jsx(n,{children:"\\bA"}),` nur zwei Spalten und damit nur zwei rechte Singulärvektoren
hat. Wir ergänzen `,e.jsx(n,{children:"\\cgreen{\\bu_1}"}),`
stattdessen zu einer Orthonormalbasis des `,e.jsx(n,{children:"\\R^3"}),", etwa durch"]}),e.jsx(j,{children:`\\cgreen{\\bu_2} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix} ,
\\qquad
\\cgreen{\\bu_3} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`Diese beiden spannen den linken Kern auf,
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA^\\top) = \\spann\\{\\cgreen{\\bu_2}, \\cgreen{\\bu_3}\\}"}),", denn"]}),e.jsx(j,{children:`\\bA^\\top \\begin{pmatrix} -1 & 0 \\\\ 1 & 0 \\\\ 0 & 1 \\end{pmatrix}
= \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix} .`})]}),`
`,e.jsx(i.h3,{children:"Der SVD-Hauptsatz"}),`
`,e.jsx(i.p,{children:`Sammeln wir die rechten Singulärvektoren als
Spalten in einer Matrix, ebenso die linken, und schreiben wir die Singulärwerte
auf eine Diagonale, dann steht die Zerlegung da.`}),`
`,e.jsxs(M,{kind:"Satz",label:"6.2.13 (Singulärwertzerlegung)",id:"env-singulaerwertzerlegung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),`. Dann existiert eine
Zerlegung`]}),e.jsx(X,{tag:"6.2.3",id:"eq-singulaerwertzerlegung",children:"\\bA = \\cgreen{\\bU}\\,\\corange{\\bSigma}\\,\\cblue{\\bV^\\top}"}),e.jsx(i.p,{children:"mit"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cblue{\\bV} \\in \\R^{n \\times n}"}),` orthogonal, in den Spalten die rechten
Singulärvektoren `,e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_n}"}),";"]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cgreen{\\bU} \\in \\R^{m \\times m}"})," orthogonal, in den ersten ",e.jsx(n,{children:"r"}),` Spalten die
linken Singulärvektoren `,e.jsx(n,{children:"\\cgreen{\\bu_1}, \\dots, \\cgreen{\\bu_r}"}),`, ergänzt zu
einer Orthonormalbasis des `,e.jsx(n,{children:"\\R^m"}),";"]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(n,{children:"\\corange{\\bSigma} \\in \\R^{m \\times n}"}),` „diagonal" mit den Singulärwerten auf
der Hauptdiagonalen,`]}),`
`,e.jsx(X,{tag:"6.2.4",id:"eq-singulaerwertzerlegung-2",children:`\\corange{\\bSigma} = \\begin{pmatrix}
\\diag(\\sigma_1, \\dots, \\sigma_r) & \\bnull_{r \\times (n-r)} \\\\
\\bnull_{(m-r) \\times r} & \\bnull_{(m-r) \\times (n-r)}
\\end{pmatrix} .`}),`
`]}),`
`]})]}),`
`,e.jsxs(i.p,{children:['Die Anführungszeichen um „diagonal" sind nötig, weil ',e.jsx(n,{children:"\\corange{\\bSigma}"}),`
dasselbe Format wie `,e.jsx(n,{children:"\\bA"})," hat und für ",e.jsx(n,{children:"m \\neq n"})," nicht quadratisch ist."]}),`
`,e.jsxs(ee,{title:"Beweisskizze des SVD-Hauptsatzes",children:[e.jsx(i.p,{children:`Die Skizze sammelt die Konstruktion dieses Abschnitts und stützt sich auf den
Spektralsatz, den wir nicht bewiesen haben.`}),e.jsxs(be,{qed:!1,children:[e.jsx($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cblue{\\bV}"})," ist orthogonal, weil seine Spalten orthonormal sind"]}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Rechte Singulärvektoren."})," Nach ",e.jsx(c,{id:"env:a-a-ist-orthogonal-diagonalisierbar",href:"#env-a-a-ist-orthogonal-diagonalisierbar",children:"Korollar 6.2.2"})," besitzt ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` eine
Orthonormalbasis aus Eigenvektoren. Wir sortieren sie nach absteigenden
Eigenwerten und stellen sie spaltenweise zusammen:
`,e.jsx(n,{children:"\\cblue{\\bV} = (\\cblue{\\bv_1} \\mid \\cblue{\\bv_2} \\mid \\cdots \\mid \\cblue{\\bv_n})"}),"."]})}),e.jsx($,{why:e.jsxs(e.Fragment,{children:["nach ",e.jsx(c,{id:"env:orthogonalitaet-der-singulaervektoren",href:"#env-orthogonalitaet-der-singulaervektoren",children:"Satz 6.2.8"})," sind diese ",e.jsx(n,{children:"r"})," Vektoren orthonormal"]}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Linke Singulärvektoren."})," Für ",e.jsx(n,{children:"i \\leq r"}),` setzen wir
`,e.jsx(n,{children:"\\cgreen{\\bu_i} = \\bA\\cblue{\\bv_i}/\\corange{\\sigma_i}"})," nach ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` und
sammeln sie in `,e.jsx(n,{children:"\\cgreen{\\bU_r} = (\\cgreen{\\bu_1} \\mid \\cdots \\mid \\cgreen{\\bu_r})"}),"."]})}),e.jsx($,{why:e.jsxs(e.Fragment,{children:["die ergänzten Spalten spannen gerade ",e.jsx(n,{children:"\\operatorname{Kern}(\\bA^\\top)"})," auf, wie in ",e.jsx(i.a,{href:"#env-alle-unterraeume-einer-rang-1-matrix",children:"Beispiel 6.2.12"})]}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Vervollständigung."})," Wir ergänzen ",e.jsx(n,{children:"\\cgreen{\\bU_r}"}),` zu einer Orthonormalbasis
des `,e.jsx(n,{children:"\\R^m"}),`, etwa mit dem
`,e.jsx(c,{id:"gram-schmidt",children:"Gram-Schmidt-Verfahren"}),`. Das ergibt die Orthogonalmatrix
`,e.jsx(n,{children:"\\cgreen{\\bU} \\in \\R^{m \\times m}"}),"."]})}),e.jsx($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cblue{\\bV^\\top}\\cblue{\\bv_i} = \\be_i"}),", weil ",e.jsx(n,{children:"\\cblue{\\bV}"})," orthogonal ist; ",e.jsx(n,{children:"\\corange{\\bSigma}\\be_i = \\corange{\\sigma_i}\\be_i"})," nach ",e.jsx(i.a,{href:"#eq-singulaerwertzerlegung-2",children:"(6.2.4)"}),", und für ",e.jsx(n,{children:"i > r"})," ist ",e.jsx(n,{children:"\\corange{\\bSigma}\\be_i = \\bnull"})]}),children:e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Verifikation."})," Für ",e.jsx(n,{children:"i \\leq r"}),` ist
`,e.jsx(n,{children:`\\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}\\cblue{\\bv_i}
= \\cgreen{\\bU}\\corange{\\bSigma}\\be_i
= \\corange{\\sigma_i}\\,\\cgreen{\\bU}\\be_i
= \\corange{\\sigma_i}\\,\\cgreen{\\bu_i} = \\bA\\cblue{\\bv_i}`}),`,
und für `,e.jsx(n,{children:"i > r"}),` steht auf beiden Seiten der Nullvektor. Beide Abbildungen
stimmen also auf einer Basis des `,e.jsx(n,{children:"\\R^n"})," überein und sind damit gleich."]})})]})]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.2.14 (Die Gestalt von Σ)",id:"env-die-gestalt-von",children:[e.jsxs(i.p,{children:["Die Blockform ",e.jsx(i.a,{href:"#eq-singulaerwertzerlegung-2",children:"(6.2.4)"})," in drei Fällen:"]}),e.jsxs(i.p,{children:["Für ein quadratisches ",e.jsx(n,{children:"\\bA"})," mit ",e.jsx(n,{children:"m = n = 3"})," und ",e.jsx(n,{children:"r = 2"})," ist"]}),e.jsx(j,{children:"\\corange{\\bSigma} = \\begin{pmatrix} \\sigma_1 & 0 & 0 \\\\ 0 & \\sigma_2 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} ."}),e.jsxs(i.p,{children:["Für ein rechteckiges ",e.jsx(n,{children:"\\bA"})," mit ",e.jsx(n,{children:"m = 2"}),", ",e.jsx(n,{children:"n = 3"})," und ",e.jsx(n,{children:"r = 2"})," ist"]}),e.jsx(j,{children:"\\corange{\\bSigma} = \\begin{pmatrix} \\sigma_1 & 0 & 0 \\\\ 0 & \\sigma_2 & 0 \\end{pmatrix} ."}),e.jsxs(i.p,{children:["Und für unsere Beispielmatrix aus ",e.jsx(i.a,{href:"#env-die-matrix-a-a-einer-3-2-matrix",children:"Beispiel 6.2.3"})," mit ",e.jsx(n,{children:"m = 3"}),", ",e.jsx(n,{children:"n = 2"}),", ",e.jsx(n,{children:"r = 2"})," ist"]}),e.jsx(j,{children:"\\corange{\\bSigma} \\approx \\begin{pmatrix} 3{,}087 & 0 \\\\ 0 & 1{,}212 \\\\ 0 & 0 \\end{pmatrix} ."}),e.jsxs(i.p,{children:["Hier hat ",e.jsx(n,{children:"\\cgreen{\\bU}"}),` drei Spalten, wir kennen aber erst zwei. Die dritte
ergänzt `,e.jsx(n,{children:"\\cgreen{\\bu_1}, \\cgreen{\\bu_2}"}),` wie in
`,e.jsx(i.a,{href:"#env-alle-unterraeume-einer-rang-1-matrix",children:"Beispiel 6.2.12"}),` zu einer Orthonormalbasis des
`,e.jsx(n,{children:"\\R^3"}),"; sie spannt den linken Kern auf und ist bis aufs Vorzeichen"]}),e.jsx(j,{children:`\\cgreen{\\bu_3} = \\tfrac{1}{\\sqrt{14}} \\begin{pmatrix} 1 \\\\ -2 \\\\ 3 \\end{pmatrix}
\\approx \\begin{pmatrix} 0{,}267 \\\\ -0{,}535 \\\\ 0{,}802 \\end{pmatrix} ,
\\qquad\\text{denn}\\qquad
\\bA^\\top \\begin{pmatrix} 1 \\\\ -2 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} .`})]}),`
`,e.jsx(i.h3,{children:"Geometrische Interpretation"}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.2.15 (Merkregel: Drehen, Strecken, Drehen)",id:"env-merkregel-drehen-strecken-drehen",children:[e.jsxs(i.p,{children:["Lesen wir ",e.jsx(i.a,{href:"#eq-singulaerwertzerlegung",children:"(6.2.3)"}),` als Abbildungsvorschrift
`,e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}\\bx"}),`, dann
geschieht die Abbildung in drei Etappen:`]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{\\bV^\\top}"}),": Koordinatenwechsel im ",e.jsx(n,{children:"\\R^n"}),`, eine Drehung oder
Spiegelung auf die „optimalen" Richtungen
`,e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_n}"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\bSigma}"}),`: Strecken entlang dieser Achsen um die Faktoren
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),", Nullsetzen der Richtungen mit ",e.jsx(n,{children:"i > r"}),` und Übergang von
`,e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^m"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cgreen{\\bU}"}),": Koordinatenwechsel im ",e.jsx(n,{children:"\\R^m"}),`, wieder eine Drehung oder
Spiegelung, diesmal in die Endlage.`]}),`
`]}),e.jsxs(i.p,{children:["Die SVD zerlegt also ",e.jsx(i.em,{children:"jede"})," lineare Abbildung von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^m"}),` in Drehen,
Strecken, Drehen. Aus der Einheitssphäre des `,e.jsx(n,{children:"\\R^n"}),` wird dabei ein Ellipsoid mit
den Hauptachsenrichtungen `,e.jsx(n,{children:"\\cgreen{\\bu_i}"}),` und den Halbachsenlängen
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),". Drückt ",e.jsx(n,{children:"\\bA"})," Richtungen auf null, ist also ",e.jsx(n,{children:"r < n"}),`, so
wird daraus ein ausgefülltes Ellipsoid im `,e.jsx(n,{children:"r"}),`-dimensionalen Spaltenraum
(`,e.jsx(i.a,{href:"#sec-6.1",children:"Abschnitt 6.1"}),")."]})]}),`
`,e.jsxs(we,{title:"Drehen, Strecken, Drehen an einer editierbaren Matrix",children:[e.jsxs(i.p,{children:[`Welche der drei Etappen ist für die Form der Bildellipse zuständig, und welche
nur für ihre Lage? Vier Tafeln zeigen denselben Kreis vor `,e.jsx(n,{children:"\\cblue{\\bV^\\top}"}),`,
danach, nach `,e.jsx(n,{children:"\\corange{\\bSigma}"})," und nach ",e.jsx(n,{children:"\\cgreen{\\bU}"}),`. Voreingestellt ist
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 1 \\end{smallmatrix}\\bigr)"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),`; drei weitere Knöpfe stellen eine
Drehmatrix, eine Scherung und eine Matrix mit zwei gleichen Spalten ein.`]}),e.jsx(hi,{}),e.jsxs(i.p,{children:["Nach ",e.jsx(n,{children:"\\cblue{\\bV^\\top}"}),` ist der Kreis noch ein Kreis, nur gedreht oder
gespiegelt. Erst `,e.jsx(n,{children:"\\corange{\\bSigma}"}),` macht ihn zur Ellipse mit den Halbachsen
`,e.jsx(n,{children:"\\corange{\\sigma_1}"})," und ",e.jsx(n,{children:"\\corange{\\sigma_2}"}),", und ",e.jsx(n,{children:"\\cgreen{\\bU}"}),` legt diese
Ellipse nur noch in ihre Endlage. Bei zwei gleichen Spalten ist
`,e.jsx(n,{children:"\\corange{\\sigma_2} = 0"}),", und aus dem Kreis wird eine Strecke."]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(Ve,{loesung:2.547,toleranz:.01,children:[e.jsxs(i.p,{children:["Der Rechner oben zeigt in Schritt 4 das Verhältnis ",e.jsx(n,{children:"\\corange{\\sigma_1}/\\corange{\\sigma_2}"}),`
der voreingestellten Matrix. Wie groß ist es?`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\corange{3{,}087} / \\corange{1{,}212} \\approx 2{,}547"}),`. Ohne Widget geht es
auch, denn Wurzelziehen und Teilen vertauschen:
`,e.jsx(n,{children:"\\sqrt{9{,}531/1{,}469} = \\sqrt{6{,}488} \\approx 2{,}547"}),`. Diese Zahl ist die
`,e.jsx(c,{id:"env:eigenschaften-konditionszahl-einer-matrix",children:"Konditionszahl"})," ",e.jsx(n,{children:"\\kappa_2(\\bA)"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`; die Bildellipse ist gut
zweieinhalbmal so lang wie breit.`]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Für jede Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` sind alle Eigenwerte von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," nichtnegativ."]}),e.jsxs(i.p,{children:["Das ist ",e.jsx(c,{id:"env:eigenschaften-von-a-a",href:"#env-eigenschaften-von-a-a",children:"Satz 6.2.1"}),"(2). Der Grund steckt in ",e.jsx(i.a,{href:"#eq-eq-6-2-1",children:"(6.2.1)"}),`: Für einen normierten
Eigenvektor `,e.jsx(n,{children:"\\bv_i"})," ist ",e.jsx(n,{children:"\\lambda_i = \\left\\|\\bA\\bv_i\\right\\|^2"}),`, also das
Quadrat einer Länge.`]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Wenn ein Singulärwert von ",e.jsx(n,{children:"\\bA"})," null ist, muss ",e.jsx(n,{children:"\\bA"})," die Nullmatrix sein."]}),e.jsxs(i.p,{children:["Ein verschwindender Singulärwert bedeutet nur, dass ",e.jsx(n,{children:"\\bA"}),` eine Richtung auf
null abbildet. `,e.jsx(i.a,{href:"#env-alle-unterraeume-einer-rang-1-matrix",children:"Beispiel 6.2.12"}),` zeigt eine Matrix mit
`,e.jsx(n,{children:"\\sigma_1 = 2"})," und ",e.jsx(n,{children:"\\sigma_2 = 0"}),`, die nicht null ist; nach
`,e.jsx(c,{id:"env:charakterisierung-der-fundamentalen",href:"#env-charakterisierung-der-fundamentalen",children:"Satz 6.2.11"})," hat sie den Rang ",e.jsx(n,{children:"1"})," und einen eindimensionalen Kern."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Die rechten Singulärvektoren ",e.jsx(n,{children:"\\bv_i"}),` sind orthonormal, die Bildvektoren
`,e.jsx(n,{children:"\\bA\\bv_i"})," dagegen im Allgemeinen nur orthogonal."]}),e.jsxs(i.p,{children:["Das sagt ",e.jsx(c,{id:"env:orthogonalitaet-der-singulaervektoren",href:"#env-orthogonalitaet-der-singulaervektoren",children:"Satz 6.2.8"}),`: Die Bilder stehen paarweise senkrecht aufeinander,
haben aber die Längen `,e.jsx(n,{children:"\\sigma_i"}),". Erst die Division durch ",e.jsx(n,{children:"\\sigma_i"}),` macht
daraus die orthonormalen linken Singulärvektoren.`]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["In der Zerlegung ",e.jsx(n,{children:"\\bA = \\bU\\bSigma\\bV^\\top"})," ist ",e.jsx(n,{children:"\\bSigma"}),` immer eine
quadratische Diagonalmatrix.`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bSigma"})," hat dasselbe Format wie ",e.jsx(n,{children:"\\bA"}),", ist also für ",e.jsx(n,{children:"m \\neq n"}),` rechteckig.
Quadratisch sind nur die beiden Orthogonalmatrizen: `,e.jsx(n,{children:"\\bU"}),` ist
`,e.jsx(n,{children:"m \\times m"}),", ",e.jsx(n,{children:"\\bV"})," ist ",e.jsx(n,{children:"n \\times n"}),"."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsx(i.p,{children:`Die Singulärwerte und die Singulärvektoren einer Matrix sind eindeutig
bestimmt.`}),e.jsxs(i.p,{children:["Die Singulärwerte schon, die Vektoren nicht: Mit ",e.jsx(n,{children:"\\bv_i"}),` leistet auch
`,e.jsx(n,{children:"-\\bv_i"})," dasselbe, und dann dreht sich nach ",e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"})," auch ",e.jsx(n,{children:"\\bu_i"}),` um
(`,e.jsx(i.a,{href:"#env-singulaervektoren-sind-nicht-eindeutig",children:"Bemerkung 6.2.10"}),`). Bei mehrfachen Singulärwerten kommt sogar noch die freie
Wahl einer Orthonormalbasis im zugehörigen Eigenraum hinzu.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §3.6 (Singulärwertzerlegung); vgl. MML §4.5 für die
geometrische Deutung der SVD und §4.6 für die daran anschließende
Rang-k-Approximation.`})})]})}function oi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(pn,{...r})}):pn(r)}const fn=D.gruen,kn=D.blau,Ge=D.orange,ke=D.grau,xi=[{id:"klein",name:"r < min(m, n)",m:5,n:4,r:2},{id:"rang1",name:"r = 1",m:5,n:4,r:1},{id:"voll",name:"r = m = n",m:4,n:4,r:4}],Z=22,Te={Ur:{name:"U_r",bleibt:!0,text:"Die ersten r Spalten von U. Sie sind eine Orthonormalbasis des Spaltenraums col(A), also genau die Richtungen, in denen A überhaupt etwas abliefert. Dieser Block bleibt."},Umr:{name:"U_(m−r)",bleibt:!1,text:"Die letzten m−r Spalten von U spannen den linken Kern auf. Im Produkt treffen sie auf die Nullzeilen von Σ, ihr Beitrag ist also die Nullmatrix. Dieser Block fällt weg."},Sr:{name:"Σ_r",bleibt:!0,text:"diag(σ₁, …, σ_r) mit lauter positiven Einträgen. Hier steckt die ganze Streckung, und weil kein Diagonaleintrag null ist, lässt sich dieser Block als einziger invertieren. Er bleibt."},S0:{name:"Nullblöcke von Σ",bleibt:!1,text:"Die letzten m−r Zeilen und die letzten n−r Spalten von Σ bestehen nur aus Nullen. Sie sind der Grund für die ganze Reduktion: Was auf sie trifft, verschwindet."},Vr:{name:"V_rᵀ",bleibt:!0,text:"Die ersten r Zeilen von Vᵀ, also die ersten r Spalten von V. Sie bilden eine Orthonormalbasis des Zeilenraums col(Aᵀ) und bleiben stehen."},Vnr:{name:"V_(n−r)ᵀ",bleibt:!1,text:"Die letzten n−r Zeilen von Vᵀ gehören zum Kern von A. Sie treffen auf die Nullspalten von Σ und fallen weg."}},vn=r=>r===1?"1 Spalte":`${r} Spalten`;function An({x:r,y:i,base:s,sub:a,hoch:h,fill:u}){return e.jsxs("text",{x:r,y:i,textAnchor:"middle",fontSize:13,fontWeight:600,fill:u,style:{pointerEvents:"none"},children:[s,a?e.jsx("tspan",{fontSize:9,dy:3,children:a}):null,h?e.jsx("tspan",{fontSize:9,dy:a?-7:-4,children:h}):null]})}function ui(){const[r,i]=E.useState(5),[s,a]=E.useState(4),[h,u]=E.useState(2),[o,f]=E.useState(!1),[b,m]=E.useState("S0"),t=Math.max(1,Math.min(h,r,s)),g=Math.max(r,s)*Z/2,x=Hn(o?1:0,250),p=x<.995,_=r*r+s*s+Math.min(r,s),w=t*(r+s+1),N=r*s,S=({id:V,x:J,y:de,w:Pe,h:Ke,farbe:Xe,base:In,sub:Wn,hoch:Zn,leer:on})=>{if(Pe<=0||Ke<=0)return null;const $e=b===V;return e.jsxs("g",{role:"button",tabIndex:0,"aria-pressed":$e,"aria-label":Te[V].name,onClick:()=>m(V),onKeyDown:Le=>{(Le.key==="Enter"||Le.key===" "||Le.key==="Spacebar")&&(Le.preventDefault(),m(V))},style:{cursor:"pointer"},children:[e.jsx("title",{children:Te[V].name}),e.jsx("rect",{x:J,y:de,width:Pe,height:Ke,fill:Xe,fillOpacity:on?$e?.14:.04:$e?.55:.22,stroke:Xe,strokeWidth:$e?2.5:1,strokeDasharray:on?"4 3":void 0}),Pe>=30&&Ke>=18?e.jsx(An,{x:J+Pe/2,y:de+Ke/2+4,base:In,sub:Wn,hoch:Zn,fill:Xe}):null]})},k=({x:V,y:J,text:de})=>e.jsx("text",{x:V,y:J,textAnchor:"middle",fontSize:11,fill:ke,children:de}),l=({x:V,y:J,z:de})=>e.jsx("text",{x:V,y:J,textAnchor:"middle",fontSize:15,fill:ke,children:de}),d=(V,J)=>(V+(J-V)*(1-x))*Z,A=s*Z,z=r*Z,U=d(t,r),v=r*Z,y=d(t,s),R=d(t,r),L=s*Z,P=d(t,s),H=26,ne=4,K=ne+A+H,W=K+U+H,Q=W+y+H,te=Q+L+8,B=Math.max(r,s)*Z+18,F=B+12,re=g-z/2,le=g-v/2,xe=g-R/2,hn=g-P/2,Be=Te[b],Ue=[];r-t>0&&Ue.push(`${vn(r-t)} von U`),s-t>0&&Ue.push(`${vn(s-t)} von V`);const Ln=()=>{const V=!o;V&&!Te[b].bleibt&&m("Sr"),f(V)};return e.jsxs("div",{children:[e.jsx(fe,{children:"Klicken wir auf einen Block und schalten wir dann auf die reduzierte Zerlegung um."}),e.jsx("div",{className:"my-2 flex flex-wrap items-center gap-2",children:xi.map(V=>e.jsx("button",{type:"button",className:r===V.m&&s===V.n&&t===V.r?Fe:me,"aria-pressed":r===V.m&&s===V.n&&t===V.r,onClick:()=>{i(V.m),a(V.n),u(V.r)},children:V.name},V.id))}),e.jsxs("div",{className:"my-3 max-w-md",children:[e.jsx(oe,{label:"Zeilen m",value:r,onChange:V=>{const J=Math.round(V);i(J),u(de=>Math.min(de,J,s))},min:2,max:8,step:1,fmt:V=>String(V)}),e.jsx(oe,{label:"Spalten n",value:s,onChange:V=>{const J=Math.round(V);a(J),u(de=>Math.min(de,r,J))},min:2,max:8,step:1,fmt:V=>String(V)}),e.jsx(oe,{label:"Rang r",value:t,onChange:V=>u(Math.round(V)),min:1,max:Math.min(r,s),step:1,fmt:V=>String(V)})]}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-3 text-sm",children:[e.jsx("button",{type:"button",className:me,"aria-pressed":o,onClick:Ln,children:o?"volle SVD zeigen":"auf die reduzierte SVD schrumpfen"}),e.jsxs("span",{style:{color:ke},children:["Zustand: m = ",r,", n = ",s,", r = ",t,", ",o?"reduzierte":"volle"," Zerlegung"]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("svg",{width:te,height:F,viewBox:`0 0 ${te} ${F}`,className:"h-auto max-w-full",role:"group","aria-label":`Blockschema der ${o?"reduzierten":"vollen"} Singulärwertzerlegung einer ${r} mal ${s}-Matrix vom Rang ${t}. Die Blöcke sind anwählbar.`,children:[e.jsx("rect",{x:ne,y:re,width:A,height:z,fill:ke,fillOpacity:.12,stroke:ke}),e.jsx(An,{x:ne+A/2,y:re+z/2+4,base:"A",fill:ke}),e.jsx(k,{x:ne+A/2,y:B,text:`A: ${r}×${s}`}),e.jsx(l,{x:ne+A+H/2,y:g+5,z:"="}),e.jsx(S,{id:"Ur",x:K,y:le,w:t*Z,h:v,farbe:fn,base:"U",sub:"r"}),p?e.jsx(S,{id:"Umr",x:K+t*Z,y:le,w:(r-t)*Z*(1-x),h:v,farbe:fn,base:"U",sub:"m−r"}):null,e.jsx(k,{x:K+U/2,y:B,text:o?`U_r: ${r}×${t}`:`U: ${r}×${r}`}),e.jsx(l,{x:K+U+H/2,y:g+5,z:"·"}),e.jsx(S,{id:"Sr",x:W,y:xe,w:t*Z,h:t*Z,farbe:Ge,base:"Σ",sub:"r"}),p?e.jsxs(e.Fragment,{children:[e.jsx(S,{id:"S0",x:W+t*Z,y:xe,w:(s-t)*Z*(1-x),h:t*Z,farbe:Ge,base:"0",leer:!0}),e.jsx(S,{id:"S0",x:W,y:xe+t*Z,w:t*Z,h:(r-t)*Z*(1-x),farbe:Ge,base:"0",leer:!0}),e.jsx(S,{id:"S0",x:W+t*Z,y:xe+t*Z,w:(s-t)*Z*(1-x),h:(r-t)*Z*(1-x),farbe:Ge,base:"0",leer:!0})]}):null,e.jsx(k,{x:W+y/2,y:B,text:o?`Σ_r: ${t}×${t}`:`Σ: ${r}×${s}`}),e.jsx(l,{x:W+y+H/2,y:g+5,z:"·"}),e.jsx(S,{id:"Vr",x:Q,y:hn,w:s*Z,h:t*Z,farbe:kn,base:"V",sub:"r",hoch:"T"}),p?e.jsx(S,{id:"Vnr",x:Q,y:hn+t*Z,w:s*Z,h:(s-t)*Z*(1-x),farbe:kn,base:"V",sub:"n−r",hoch:"T"}):null,e.jsx(k,{x:Q+L/2,y:B,text:o?`V_rᵀ: ${t}×${s}`:`Vᵀ: ${s}×${s}`})]})}),e.jsxs(I,{kind:Be.bleibt?"ok":"fail",titel:`${Be.name}:`,children:[Be.bleibt?"Bleibt in der reduzierten Zerlegung. ":"Fällt in der reduzierten Zerlegung weg. ",Be.text," ",Ue.length===0?`Mit m = n = r = ${t} fällt allerdings gar nichts weg: U und V sind schon quadratisch, und Σ hat weder eine Nullzeile noch eine Nullspalte, die Reduktion aus ${O("satz:reduzierte-darstellung")} ist dann leer.`:`Insgesamt fallen ${Ue.join(" und ")} weg; Σ schrumpft von ${r}×${s} auf ${t}×${t}.`]}),e.jsxs("p",{className:"mt-2 font-mono text-xs",style:{color:ke},children:["Gespeicherte Zahlen (",O("bemerkung:was-die-reduzierte-form-spart-und-was"),"), volle Zerlegung: m² + n² + min(m, n) ="," ",_,"; reduzierte Zerlegung: r·(m + n + 1) = ",w,"; A selbst: m·n ="," ",N]})]})}const en=D.gruen,nn=D.blau,wn=D.rot,rn=D.violett,ze=D.grau,T=(r,i=3)=>q(r,i),gi=(r,i=2)=>`(${T(r[0],i)}; ${T(r[1],i)})`;function bi(r){const[[i,s],[a,h]]=r,u=i*i+a*a,o=i*s+a*h,f=s*s+h*h,b=.5*Math.atan2(2*o,u-f),m=(u+f)/2,t=Math.hypot((u-f)/2,o),g=Math.sqrt(Math.max(m+t,0)),x=Math.sqrt(Math.max(m-t,0)),p=[Math.cos(b),Math.sin(b)],_=[-Math.sin(b),Math.cos(b)],w=d=>[i*d[0]+s*d[1],a*d[0]+h*d[1]],N=w(p),S=w(_),k=g>1e-9?[N[0]/g,N[1]/g]:[1,0],l=x>1e-9?[S[0]/x,S[1]/x]:[-k[1],k[0]];return{v1:p,v2:_,u1:k,u2:l,s1:g,s2:x}}function mi(r){const i=[[0,0],[0,0]],s=(a,h,u)=>{if(!(u<=1e-9))for(let o=0;o<2;o++)for(let f=0;f<2;f++)i[o][f]+=a[o]*h[f]/u};return s(r.v1,r.u1,r.s1),s(r.v2,r.u2,r.s2),i}const _n=(r,i)=>[r[0][0]*i[0]+r[0][1]*i[1],r[1][0]*i[0]+r[1][1]*i[1]];function Sn(r,i,s){let a=1/0;for(const h of[0,1]){if(Math.abs(i[h])<1e-9){if(Math.abs(r[h])>s)return 0;continue}a=Math.min(a,Math.max((s-r[h])/i[h],(-s-r[h])/i[h]))}return Number.isFinite(a)?Math.max(0,a):0}const sn=[{id:"rang1",name:`Rang 1 (${O("beispiel:reduzierte-svd-einer-rang-1-matrix")})`,A:[[1,1],[1,1]],b:[1,5]},{id:"rang1b",name:"andere Rang-1-Matrix",A:[[1,2],[2,4]],b:[1,5]},{id:"exakt",name:"b liegt in col(A)",A:[[1,1],[1,1]],b:[3,3]},{id:"regulaer",name:"regulär",A:[[2,1],[0,1]],b:[1,5]}];function ji(){const[r,i]=E.useState(sn[0].A),[s,a]=E.useState(sn[0].b),[h,u]=E.useState(0),[o,f]=E.useState("rang1"),b=[[r[0][0]||0,r[0][1]||0],[r[1][0]||0,r[1][1]||0]],m=bi(b),t=(m.s1>1e-9?1:0)+(m.s2>1e-9?1:0),g=mi(m),x=_n(g,s),p=m.s2>1e-9?[0,0]:m.v2,_=t===1?[x[0]+h*p[0],x[1]+h*p[1]]:x,w=_n(b,_),N=[s[0]-w[0],s[1]-w[1]],S=Math.hypot(...N),k=Math.hypot(..._),l=Math.hypot(...x),d=Math.max(3,1.2*Math.max(Math.abs(s[0]),Math.abs(s[1]),l+1.5)),A=v=>{f(v.id),i(v.A),a(v.b),u(0)},z=v=>{const y=[];if(t===1){const P=Sn(x,p,d),H=-Sn(x,[-p[0],-p[1]],d),[ne,K]=v(x[0]+H*p[0],x[1]+H*p[1]),[W,Q]=v(x[0]+P*p[0],x[1]+P*p[1]),[te,B]=v(0,0),[F]=v(l,0);y.push(e.jsx("circle",{cx:te,cy:B,r:Math.abs(F-te),fill:"none",stroke:ze,strokeWidth:1,strokeDasharray:"3 3"},"norm"),e.jsx("line",{x1:ne,y1:K,x2:W,y2:Q,stroke:ze,strokeWidth:2,strokeDasharray:"7 4"},"loes"))}const[R,L]=v(x[0],x[1]);return y.push(e.jsxs("g",{children:[e.jsx("circle",{cx:R,cy:L,r:5,fill:nn}),e.jsx("text",{x:R+8,y:L-6,fontSize:11,fill:nn,children:"A⁺b"})]},"xdach")),e.jsx(e.Fragment,{children:y})},U=v=>{const[y,R]=v(s[0],s[1]),[L,P]=v(w[0],w[1]);return e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:L,y1:P,x2:y,y2:R,stroke:wn,strokeWidth:2,strokeDasharray:"5 4"}),e.jsx("circle",{cx:L,cy:P,r:5,fill:en}),e.jsx("text",{x:L+8,y:P+14,fontSize:11,fill:en,children:"Ax"}),S>1e-9?e.jsx("text",{x:(L+y)/2+8,y:(P+R)/2,fontSize:11,fill:wn,children:"r"}):null]})};return e.jsxs("div",{className:"text-sm",children:[e.jsxs(fe,{children:["Ziehen wir ",e.jsx(n,{children:"\\bb"})," in der rechten Tafel und schieben wir ",e.jsx(n,{children:"\\bx"})," danach auf der gestrichelten Lösungsgeraden entlang."]}),e.jsx("div",{className:"my-2 flex flex-wrap items-center gap-2",children:sn.map(v=>e.jsx("button",{type:"button",className:o===v.id?Fe:me,"aria-pressed":o===v.id,onClick:()=>A(v),children:v.name},v.id))}),e.jsxs("div",{className:"my-3 grid gap-4 sm:grid-cols-2",children:[e.jsxs("figure",{className:"m-0",children:[e.jsx(Ne,{matrix:[[1,0],[0,1]],showGrid:!0,showUnitCircle:!1,size:230,worldHalf:d,readout:!1,transitionMs:250,xLabel:"x₁",yLabel:"x₂",lines:t===1?[{dir:p,color:nn,label:"Kern"}]:[],vectors:t===1?[{v:_,color:ze,label:"x",draggable:!0}]:[{v:x,color:ze,label:"x̂"}],onVectorChange:(v,y)=>{if(v!==0||t!==1)return;const R=(y[0]-x[0])*p[0]+(y[1]-x[1])*p[1];u(Math.max(-6,Math.min(6,R)))},overlay:z,ariaLabel:t===1?`Urbildraum: die Lösungsgerade der Kleinste-Quadrate-Aufgabe, darauf die Minimalnorm-Lösung mit Norm ${T(l)} und die laufende Lösung mit Norm ${T(k)}.`:`Urbildraum: die eindeutige Lösung der Kleinste-Quadrate-Aufgabe mit Norm ${T(l)}.`}),e.jsxs("figcaption",{className:`mt-1 text-xs ${He}`,children:["Urbildraum: Lösungsgerade (grau gestrichelt), Kern (blau) und der Kreis um den Ursprung durch ",e.jsx("span",{className:"font-mono",children:"A⁺b"})]})]}),e.jsxs("figure",{className:"m-0",children:[e.jsx(Ne,{matrix:b,showGrid:!1,showUnitCircle:!1,size:230,worldHalf:d,readout:!1,transitionMs:250,xLabel:"b₁",yLabel:"b₂",lines:t===1?[{dir:m.u1,color:en,label:"col(A)"}]:[],vectors:[{v:s,color:rn,label:"b",draggable:!0}],onVectorChange:(v,y)=>{v===0&&(f("frei"),a([y[0],y[1]]))},overlay:U,ariaLabel:`Bildraum: der Datenvektor b, sein Bildpunkt Ax auf dem Spaltenraum und das Residuum der Länge ${T(S)}.`}),e.jsxs("figcaption",{className:`mt-1 text-xs ${He}`,children:["Bildraum: ",e.jsx("span",{className:"font-mono",children:"b"})," (violett), sein nächster Punkt"," ",e.jsx("span",{className:"font-mono",children:"Ax"})," in ",e.jsx("span",{className:"font-mono",children:"col(A)"})," ","(grün) und das Residuum (rot)"]})]})]}),e.jsxs("div",{className:"my-2 max-w-md",children:[e.jsx(oe,{label:"b₁",value:s[0],onChange:v=>{f("frei"),a([v,s[1]])},min:-6,max:6,step:.1,accent:rn,fmt:v=>T(v,1)}),e.jsx(oe,{label:"b₂",value:s[1],onChange:v=>{f("frei"),a([s[0],v])},min:-6,max:6,step:.1,accent:rn,fmt:v=>T(v,1)}),e.jsx(oe,{label:"Position t auf der Lösungsgeraden",value:h,onChange:u,min:-6,max:6,step:.1,accent:ze,disabled:t!==1,fmt:v=>T(v,1)})]}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-3",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(n,{children:"\\bA ="}),e.jsx(Qe,{value:r,onChange:v=>{f("frei"),i(v),u(0)}})]}),e.jsxs("span",{className:"font-mono text-xs",style:{color:ze},children:["‖x‖ = ",T(k),", ‖A⁺b‖ = ",T(l),", ‖b − Ax‖ = ",T(S)]})]}),t===0?e.jsxs(I,{kind:"warn",titel:"Nullmatrix:",children:["Hier ist ",e.jsx(n,{children:"\\bA\\pinv = \\bnull"})," und ",e.jsx(n,{children:"\\bA\\pinv\\bb = \\bnull"}),". Jedes"," ",e.jsx(n,{children:"\\bx"})," ist Lösung der Kleinste-Quadrate-Aufgabe, denn"," ",e.jsx(n,{children:"\\bA\\bx = \\bnull"})," für alle ",e.jsx(n,{children:"\\bx"}),"; die kürzeste unter allen ist der Nullvektor. Das Residuum bleibt bei ",T(S),", also bei ",e.jsx(n,{children:"\\left\\|\\bb\\right\\|"}),"."]}):t===2?e.jsxs(I,{kind:"ok",titel:"Regulärer Fall:",children:["Der Kern ist ",e.jsx(n,{children:"\\{\\bnull\\}"}),", die Lösungsmenge schrumpft auf einen einzigen Punkt, und ",e.jsx(n,{children:"\\bA\\pinv = \\bA^{-1}"})," (",O("korollar:spezialfaelle"),"). Das Residuum ist"," ",T(S),": ",e.jsx(n,{children:"\\bb"})," liegt in ",e.jsx(n,{children:"\\col(\\bA)"}),", denn der Spaltenraum ist hier der ganze ",e.jsx(n,{children:"\\R^2"}),'. Von „kleinster Norm unter den Lösungen" bleibt nichts zu wählen.']}):S<1e-9?e.jsxs(I,{kind:"ok",titel:"Exakt lösbar, trotzdem mehrdeutig:",children:[e.jsx(n,{children:"\\bb"})," liegt auf ",e.jsx(n,{children:"\\col(\\bA)"}),", das Residuum ist null. Lösungen gibt es dennoch unendlich viele, nämlich die ganze gestrichelte Gerade. Die Pseudoinverse greift daraus ",e.jsx(n,{children:"\\bA\\pinv\\bb"})," mit der Norm ",T(l)," heraus; das gerade eingestellte ",e.jsx(n,{children:"\\bx"})," hat die Norm ",T(k),"."]}):e.jsxs(I,{kind:Math.abs(h)<.05?"ok":"neutral",children:[e.jsx(n,{children:"\\bA"})," hat den Rang 1, der Kern ist eine Gerade, und jeder Punkt der gestrichelten Geraden löst die Kleinste-Quadrate-Aufgabe gleich gut: Das Bild bleibt"," ",e.jsx(n,{children:"\\bA\\bx = "}),gi(w),", das ist nach ",O("satz:eigenschaften-der-pseudoinversen")," der Punkt"," ",e.jsx(n,{children:"\\proj_{\\col(\\bA)}\\bb"}),", und das Residuum bleibt ",T(S),", wie weit wir"," ",e.jsx(n,{children:"\\bx"})," auch schieben."," ",Math.abs(h)<.05?`Nur die Norm unterscheidet die Lösungen, und eingestellt ist gerade die kürzeste: ‖A⁺b‖ = ${T(l)}, der kleinste Wert auf der ganzen Geraden. Die Lösungsgerade berührt den grauen Kreis genau hier, denn A⁺b steht senkrecht auf dem Kern (${O("bemerkung:ausblick-kleinste-quadrate")}).`:`Nur die Norm unterscheidet die Lösungen: ${T(k)} gegen ‖A⁺b‖ = ${T(l)}, also ${T(k-l)} mehr. Zurück bei t = 0 steht die kürzeste.`]})]})}function zn(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsxs(i.p,{children:["Die Zerlegung ",e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"}),` aus
`,e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),` ist vollständig, aber verschwenderisch. Sobald der
`,e.jsx(c,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"r"})," kleiner als ",e.jsx(n,{children:"m"})," oder ",e.jsx(n,{children:"n"}),` ist, besteht ein Teil von
`,e.jsx(n,{children:"\\corange{\\bSigma}"}),` aus Nullen, und diese Nullen löschen ganze Spalten von
`,e.jsx(n,{children:"\\cgreen{\\bU}"})," und ",e.jsx(n,{children:"\\cblue{\\bV}"}),` aus. Lassen wir sie weg, bleibt die
reduzierte SVD. Aus ihr lesen wir eine Matrix ab, die auch eine rechteckige
oder singuläre Matrix so weit wie möglich umkehrt.`]}),`
`,e.jsx(i.h3,{children:"Nullblöcke in Sigma"}),`
`,e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"})," hat ",e.jsx(n,{children:"\\corange{\\bSigma}"}),` die
Blockgestalt`]}),`
`,e.jsx(X,{tag:"6.3.1",id:"eq-eq-6-3-1",children:`\\corange{\\bSigma} = \\begin{pmatrix}
\\corange{\\bSigma_r} & \\bnull_{r \\times (n-r)} \\\\
\\bnull_{(m-r) \\times r} & \\bnull_{(m-r) \\times (n-r)}
\\end{pmatrix} \\in \\R^{m \\times n} ,
\\qquad
\\corange{\\bSigma_r} = \\diag(\\sigma_1, \\dots, \\sigma_r) .`}),`
`,e.jsxs(i.p,{children:["Nur der Block links oben ist besetzt: Die letzten ",e.jsx(n,{children:"m - r"}),` Zeilen von
`,e.jsx(n,{children:"\\corange{\\bSigma}"})," sind Nullzeilen, die letzten ",e.jsx(n,{children:"n - r"}),` Spalten Nullspalten.
Bei einer Matrix mit `,e.jsx(n,{children:"m = 1000"}),", ",e.jsx(n,{children:"n = 50"})," und ",e.jsx(n,{children:"r = 5"})," sind von den ",e.jsx(n,{children:"50\\,000"}),`
Einträgen in `,e.jsx(n,{children:"\\corange{\\bSigma}"})," nur fünf von null verschieden."]}),`
`,e.jsxs(i.p,{children:["Passend dazu trennen wir in beiden Orthogonalmatrizen die ersten ",e.jsx(n,{children:"r"}),` Spalten
ab:`]}),`
`,e.jsx(X,{tag:"6.3.2",id:"eq-eq-6-3-2",children:`\\cgreen{\\bU} = (\\cgreen{\\bU_r} \\mid \\cgreen{\\bU_{m-r}}) ,
\\qquad
\\cblue{\\bV} = (\\cblue{\\bV_r} \\mid \\cblue{\\bV_{n-r}}) ,`}),`
`,e.jsxs(i.p,{children:["mit ",e.jsx(n,{children:"\\cgreen{\\bU_r} \\in \\R^{m \\times r}"})," und ",e.jsx(n,{children:"\\cblue{\\bV_r} \\in \\R^{n \\times r}"}),`.
Nach `,e.jsx(c,{id:"env:charakterisierung-der-fundamentalen",href:"#env-charakterisierung-der-fundamentalen",children:"Satz 6.2.11"})," stehen in ",e.jsx(n,{children:"\\cgreen{\\bU_r}"})," die linken ",e.jsx(c,{id:"env:rechte-und-linke-singulaervektoren",children:"Singulärvektoren"}),`
`,e.jsx(n,{children:"\\cgreen{\\bu_1}, \\dots, \\cgreen{\\bu_r}"}),`, also eine
`,e.jsx(c,{id:"orthonormal-basis",children:"Orthonormalbasis"})," des Spaltenraums ",e.jsx(n,{children:"\\col(\\bA)"}),`, und in
`,e.jsx(n,{children:"\\cblue{\\bV_r}"})," die rechten Singulärvektoren ",e.jsx(n,{children:`\\cblue{\\bv_1}, \\dots,
\\cblue{\\bv_r}`}),", eine Orthonormalbasis des Zeilenraums ",e.jsx(n,{children:"\\col(\\bA^\\top)"}),`. Die
abgetrennten Blöcke gehören zu den beiden Kernen: `,e.jsx(n,{children:"\\cblue{\\bV_{n-r}}"}),` spannt
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA)"})," auf, ",e.jsx(n,{children:"\\cgreen{\\bU_{m-r}}"}),` den linken Kern
`,e.jsx(n,{children:"\\operatorname{Kern}(\\bA^\\top)"}),"."]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.3.1 (Reduzierte Darstellung)",id:"env-reduzierte-darstellung",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r \\geq 1"}),` und einer
Singulärwertzerlegung `,e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"}),`. Mit
den Partitionen aus `,e.jsx(i.a,{href:"#eq-eq-6-3-2",children:"(6.3.2)"})," gilt"]}),e.jsx(X,{tag:"6.3.3",id:"eq-reduzierte-darstellung",children:"\\bA = \\cgreen{\\bU_r}\\,\\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} ."}),e.jsxs(i.p,{children:["Die Blöcke ",e.jsx(n,{children:"\\cgreen{\\bU_{m-r}}"})," und ",e.jsx(n,{children:"\\cblue{\\bV_{n-r}}"})," tragen zu ",e.jsx(n,{children:"\\bA"}),` nichts
bei.`]})]}),`
`,e.jsx(ee,{title:"Beweis der reduzierten Darstellung",children:e.jsxs(be,{children:[e.jsxs($,{why:e.jsxs(e.Fragment,{children:["Transponieren macht aus der ",e.jsx(n,{children:"j"}),"-ten Spalte die ",e.jsx(n,{children:"j"}),"-te Zeile; der obere Block hat ",e.jsx(n,{children:"r"})," Zeilen, der untere die restlichen ",e.jsx(n,{children:"n - r"})]}),children:[e.jsxs(i.p,{children:["Transponieren wir die Partition von ",e.jsx(n,{children:"\\cblue{\\bV}"}),`, so werden aus den
Spaltenblöcken übereinanderliegende Zeilenblöcke:`]}),e.jsx(j,{children:"\\cblue{\\bV^\\top} = \\begin{pmatrix} \\cblue{\\bV_r^\\top} \\\\ \\cblue{\\bV_{n-r}^\\top} \\end{pmatrix} ."})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["Blockmultiplikation: oben steht ",e.jsx(n,{children:"\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top} + \\bnull\\,\\cblue{\\bV_{n-r}^\\top}"}),", unten nur Nullen; ",e.jsx(n,{children:"\\cblue{\\bV_{n-r}}"})," kommt rechts gar nicht mehr vor"]}),children:[e.jsxs(i.p,{children:["Multiplizieren wir blockweise mit ",e.jsx(i.a,{href:"#eq-eq-6-3-1",children:"(6.3.1)"}),":"]}),e.jsx(j,{children:`\\corange{\\bSigma}\\,\\cblue{\\bV^\\top}
= \\begin{pmatrix} \\corange{\\bSigma_r} & \\bnull \\\\ \\bnull & \\bnull \\end{pmatrix}
  \\begin{pmatrix} \\cblue{\\bV_r^\\top} \\\\ \\cblue{\\bV_{n-r}^\\top} \\end{pmatrix}
= \\begin{pmatrix} \\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} \\\\ \\bnull_{(m-r) \\times n} \\end{pmatrix} .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["Spaltenblöcke mal Zeilenblöcke: der zweite Summand ist die Nullmatrix, ganz gleich, was in ",e.jsx(n,{children:"\\cgreen{\\bU_{m-r}}"})," steht"]}),children:[e.jsxs(i.p,{children:["Multiplizieren wir von links mit ",e.jsx(n,{children:"\\cgreen{\\bU}"}),", ebenfalls blockweise:"]}),e.jsx(j,{children:`\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}
= (\\cgreen{\\bU_r} \\mid \\cgreen{\\bU_{m-r}})
  \\begin{pmatrix} \\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} \\\\ \\bnull \\end{pmatrix}
= \\cgreen{\\bU_r}\\,\\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} + \\cgreen{\\bU_{m-r}}\\,\\bnull
= \\cgreen{\\bU_r}\\,\\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} .`})]})]})}),`
`,e.jsx(i.h3,{children:"Die reduzierte SVD"}),`
`,e.jsxs(M,{kind:"Definition",label:"6.3.2 (Reduzierte SVD)",id:"env-reduzierte-svd",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r \\geq 1"}),`. Die Darstellung
`,e.jsx(i.a,{href:"#eq-reduzierte-darstellung",children:"(6.3.3)"}),","]}),e.jsx(j,{children:"\\bA = \\cgreen{\\bU_r}\\,\\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top} ,"}),e.jsxs(i.p,{children:["heißt ",e.jsx(i.em,{children:"reduzierte SVD"})," (reduced SVD) von ",e.jsx(n,{children:"\\bA"}),". Dabei ist"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cgreen{\\bU_r} \\in \\R^{m \\times r}"})," die Matrix der ersten ",e.jsx(n,{children:"r"}),` linken
Singulärvektoren,`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\cblue{\\bV_r} \\in \\R^{n \\times r}"})," die Matrix der ersten ",e.jsx(n,{children:"r"}),` rechten
Singulärvektoren,`]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\corange{\\bSigma_r} = \\diag(\\sigma_1, \\dots, \\sigma_r) \\in \\R^{r \\times r}"}),`
die `,e.jsx(c,{id:"diagonal-matrix",children:"Diagonalmatrix"}),` der von null verschiedenen
Singulärwerte.`]}),`
`]})]}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.3.3 (Was die reduzierte Form spart, und was sie kostet)",id:"env-was-die-reduzierte-form-spart-und-was",children:[e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Kompakter."})," Die volle Zerlegung speichert ",e.jsx(n,{children:"m^2 + n^2 + \\min(m,n)"}),` Zahlen
(beide Orthogonalmatrizen plus die Diagonale von `,e.jsx(n,{children:"\\corange{\\bSigma}"}),`), die
reduzierte nur `,e.jsx(n,{children:"r(m + n + 1)"}),". Im Beispiel oben mit ",e.jsx(n,{children:"m = 1000"}),", ",e.jsx(n,{children:"n = 50"}),` und
`,e.jsx(n,{children:"r = 5"})," sind das ",e.jsx(n,{children:"5255"})," statt ",e.jsx(n,{children:"1\\,002\\,550"}),` Zahlen, also nicht einmal ein
Prozent. Sogar `,e.jsx(n,{children:"\\bA"})," selbst braucht mit ",e.jsx(n,{children:"50\\,000"}),` Einträgen noch fast das
Zehnfache.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Schneller."})," Auch ",e.jsx(n,{children:"\\bA\\bx"}),` kostet über die drei kleinen Faktoren nur
`,e.jsx(n,{children:"r(m + n + 1)"})," statt ",e.jsx(n,{children:"mn"})," Multiplikationen."]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.em,{children:[e.jsx(n,{children:"\\corange{\\bSigma_r}"})," ist invertierbar."]}),` Sie ist quadratisch, und auf ihrer
Diagonalen stehen ausschließlich positive Zahlen. Darauf baut der Rest
dieses Abschnitts auf.`]}),`
`]}),e.jsxs(i.p,{children:["Eines geht dabei verloren: ",e.jsx(n,{children:"\\cgreen{\\bU_r}"})," und ",e.jsx(n,{children:"\\cblue{\\bV_r}"}),` sind für
`,e.jsx(n,{children:"r < m"})," bzw. ",e.jsx(n,{children:"r < n"})," keine ",e.jsx(c,{id:"orthogonal-matrix",children:"Orthogonalmatrizen"}),` mehr, denn
sie sind nicht quadratisch. Ihre Spalten bleiben orthonormal, es gilt also`]}),e.jsx(X,{tag:"6.3.4",id:"eq-was-die-reduzierte-form-spart-und-was",children:`\\cgreen{\\bU_r^\\top\\bU_r} = \\bI_r
\\qquad\\text{und}\\qquad
\\cblue{\\bV_r^\\top\\bV_r} = \\bI_r ,`}),e.jsxs(i.p,{children:["aber die Produkte in der anderen Reihenfolge, ",e.jsx(n,{children:"\\cgreen{\\bU_r\\bU_r^\\top}"}),` und
`,e.jsx(n,{children:"\\cblue{\\bV_r\\bV_r^\\top}"}),`, sind im Allgemeinen keine Einheitsmatrizen, sondern
Projektionen (`,e.jsx(c,{id:"env:eigenschaften-der-pseudoinversen",href:"#env-eigenschaften-der-pseudoinversen",children:"Satz 6.3.8"}),`). Beim Rechnen mit
reduzierten Faktoren ist diese Unterscheidung eine typische Fehlerquelle.`]})]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.3.4 (Reduzierte SVD einer Rang-1-Matrix)",id:"env-reduzierte-svd-einer-rang-1-matrix",children:[e.jsxs(i.p,{children:["Nehmen wir die Matrix aus ",e.jsx(i.a,{href:"#env-alle-unterraeume-einer-rang-1-matrix",children:"Beispiel 6.2.12"}),","]}),e.jsx(j,{children:`\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\\\ 0 & 0 \\end{pmatrix} ,
\\qquad
\\corange{\\sigma_1} = 2 , \\qquad \\corange{\\sigma_2} = 0 , \\qquad r = 1 .`}),e.jsxs(i.p,{children:["Die volle Zerlegung braucht ein ",e.jsx(n,{children:"3 \\times 3"}),"-großes ",e.jsx(n,{children:"\\cgreen{\\bU}"}),`, ein
`,e.jsx(n,{children:"3 \\times 2"}),"-großes ",e.jsx(n,{children:"\\corange{\\bSigma}"})," und ein ",e.jsx(n,{children:"2 \\times 2"}),`-großes
`,e.jsx(n,{children:"\\cblue{\\bV}"}),". Bei ",e.jsx(n,{children:"r = 1"})," bleiben davon die erste Spalte von ",e.jsx(n,{children:"\\cgreen{\\bU}"}),`,
die erste Spalte von `,e.jsx(n,{children:"\\cblue{\\bV}"})," und der einzige positive ",e.jsx(c,{id:"env:singulaerwerte",children:"Singulärwert"})," übrig:"]}),e.jsx(j,{children:`\\cgreen{\\bU_1} = \\cgreen{\\bu_1} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} ,
\\qquad
\\corange{\\bSigma_1} = (\\corange{2}) ,
\\qquad
\\cblue{\\bV_1} = \\cblue{\\bv_1} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Die Probe bestätigt ",e.jsx(i.a,{href:"#eq-reduzierte-darstellung",children:"(6.3.3)"}),":"]}),e.jsx(j,{children:`\\cgreen{\\bU_1}\\corange{\\bSigma_1}\\cblue{\\bV_1^\\top}
= \\corange{2} \\cdot \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}
  \\cdot \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\end{pmatrix}
= \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\end{pmatrix}
= \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\\\ 0 & 0 \\end{pmatrix} = \\bA .`}),e.jsxs(i.p,{children:["Aus drei Matrizen mit ",e.jsx(n,{children:"9"}),", ",e.jsx(n,{children:"6"})," und ",e.jsx(n,{children:"4"})," Einträgen sind ",e.jsx(n,{children:"3 + 1 + 2"}),` Zahlen
geworden. Ganz rechts steht ein
`,e.jsx(c,{id:"outer-product",children:"äußeres Produkt"}),` von zwei Vektoren; dass
sich jede Matrix so als Summe von `,e.jsx(n,{children:"r"}),` solchen Produkten schreiben lässt, ist der
Ausgangspunkt von `,e.jsx(i.a,{href:"#sec-6.4",children:"Abschnitt 6.4"}),"."]})]}),`
`,e.jsxs(we,{title:"Welche Blöcke fallen weg?",children:[e.jsxs(i.p,{children:[`Welche Teile der Zerlegung verschwinden beim Schrumpfen, und wie viel Speicher
spart das? Das Widget zeichnet die volle Zerlegung als Blockschema mit
einstellbaren Formaten; ein Klick auf einen Block sagt, wozu er da ist. Der
Umschalter führt `,e.jsx(c,{id:"env:reduzierte-darstellung",href:"#env-reduzierte-darstellung",children:"Satz 6.3.1"}),` vor und wirft alles heraus, was
auf einen Nullblock von `,e.jsx(n,{children:"\\corange{\\bSigma}"}),` trifft. Die Zeile ganz unten zählt
die gespeicherten Zahlen aus `,e.jsx(i.a,{href:"#env-was-die-reduzierte-form-spart-und-was",children:"Bemerkung 6.3.3"}),"."]}),e.jsx(ui,{}),e.jsxs(i.p,{children:["Im Preset ",e.jsx(n,{children:"r = 1"}),` fällt der Speicherbedarf unter den der Matrix selbst; im
Preset `,e.jsx(n,{children:"r = m = n"})," schrumpft nichts, die reduzierte Zerlegung ist die volle."]})]}),`
`,e.jsx(i.h3,{children:"Die Moore-Penrose-Pseudoinverse"}),`
`,e.jsxs(i.p,{children:["Ein Gleichungssystem ",e.jsx(n,{children:"\\bA\\bx = \\bb"})," lösen wir mit ",e.jsx(n,{children:"\\bx = \\bA^{-1}\\bb"}),`, sofern
`,e.jsx(n,{children:"\\bA"}),` quadratisch und invertierbar ist. In der Statistik ist das der
Ausnahmefall: Designmatrizen sind rechteckig, und auch quadratische Matrizen
sind manchmal singulär. Was tritt an die Stelle von `,e.jsx(n,{children:"\\bA^{-1}"}),`, wenn es die
`,e.jsx(c,{id:"matrix-inverse",children:"Inverse"})," nicht gibt?"]}),`
`,e.jsxs(i.p,{children:["Die reduzierte SVD zerlegt die Abbildung ",e.jsx(n,{children:"\\bx \\mapsto \\bA\\bx"}),` in drei
Etappen: `,e.jsx(n,{children:"\\cblue{\\bV_r^\\top}"})," liest die Koordinaten von ",e.jsx(n,{children:"\\bx"}),` bezüglich
`,e.jsx(n,{children:"\\cblue{\\bv_1}, \\dots, \\cblue{\\bv_r}"})," ab, ",e.jsx(n,{children:"\\corange{\\bSigma_r}"}),` streckt jede
dieser Koordinaten um ihren Singulärwert, und `,e.jsx(n,{children:"\\cgreen{\\bU_r}"}),` setzt das
Ergebnis in der Basis `,e.jsx(n,{children:"\\cgreen{\\bu_1}, \\dots, \\cgreen{\\bu_r}"}),` des
Spaltenraums zusammen. Jede Etappe lässt sich umkehren: die beiden äußeren durch
Transponieren, die mittlere durch Division durch die positiven
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),". Verloren ist nur, was ",e.jsx(n,{children:"\\bx"}),` außerhalb des Zeilenraums
mitbrachte, denn das hat `,e.jsx(n,{children:"\\bA"}),` auf null gedrückt. Die drei Etappen rückwärts
ergeben die folgende Matrix.`]}),`
`,e.jsxs(M,{kind:"Definition",label:"6.3.5 (Moore-Penrose-Pseudoinverse)",id:"env-moore-penrose-pseudoinverse",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r \\geq 1"}),` und reduzierter SVD
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}"}),`. Die
`,e.jsx(c,{id:"pseudoinverse",children:e.jsx(i.em,{children:"Pseudoinverse"})})," (Moore-Penrose-Inverse) von ",e.jsx(n,{children:"\\bA"})," ist"]}),e.jsx(X,{tag:"6.3.5",id:"eq-moore-penrose-pseudoinverse",children:`\\bA\\pinv := \\cblue{\\bV_r}\\,\\corange{\\bSigma_r^{-1}}\\,\\cgreen{\\bU_r^\\top}
\\in \\R^{n \\times m} .`})]}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.3.6 (Zum Bau der Pseudoinversen)",id:"env-zum-bau-der-pseudoinversen",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Die Inverse in der Mitte existiert immer, denn ",e.jsx(n,{children:"\\corange{\\bSigma_r}"}),` ist eine
Diagonalmatrix mit positiven Einträgen:`]}),`
`,e.jsx(j,{children:"\\corange{\\bSigma_r^{-1}} = \\diag\\!\\left(\\frac{1}{\\sigma_1}, \\dots, \\frac{1}{\\sigma_r}\\right) ."}),`
`,e.jsxs(i.p,{children:["Dafür brauchen wir die Reduktion: In ",e.jsx(n,{children:"\\corange{\\bSigma}"}),` selbst stehen
Nullen auf der Diagonalen, durch die wir nicht teilen könnten.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[`Die Reihenfolge der drei Faktoren dreht sich um, wie wir es von
`,e.jsx(n,{children:"(\\bX\\bY)^{-1} = \\bY^{-1}\\bX^{-1}"}),` gewohnt sind: Was zuletzt angewandt wurde,
wird zuerst rückgängig gemacht.`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Die Formate passen zusammen. ",e.jsx(n,{children:"\\bA"})," bildet von ",e.jsx(n,{children:"\\R^n"})," nach ",e.jsx(n,{children:"\\R^m"}),` ab, also muss
`,e.jsx(n,{children:"\\bA\\pinv"})," von ",e.jsx(n,{children:"\\R^m"})," nach ",e.jsx(n,{children:"\\R^n"})," abbilden, und tatsächlich ist ",e.jsx(n,{children:"\\bA\\pinv"}),` vom
Format `,e.jsx(n,{children:"(n \\times r) \\cdot (r \\times r) \\cdot (r \\times m) = n \\times m"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Für die Nullmatrix, also ",e.jsx(n,{children:"r = 0"}),", setzt man ",e.jsx(n,{children:"\\bA\\pinv = \\bnull \\in \\R^{n \\times m}"}),"."]}),`
`]}),`
`]})}),`
`,e.jsxs(ee,{title:"Eindeutigkeit der Pseudoinversen",children:[e.jsxs(i.p,{children:[`Die Singulärvektoren liegen nach
`,e.jsx(i.a,{href:"#env-singulaervektoren-sind-nicht-eindeutig",children:"Bemerkung 6.2.10"}),` nicht eindeutig fest. Auf
`,e.jsx(n,{children:"\\bA\\pinv"}),` schlägt diese Freiheit aber nicht durch: Die Pseudoinverse hängt
allein an `,e.jsx(n,{children:"\\bA"}),", nicht an der gewählten Zerlegung."]}),e.jsxs(i.p,{children:["Beim Vorzeichen sieht man es sofort: Dreht sich das von ",e.jsx(n,{children:"\\cblue{\\bv_i}"}),`, so
dreht sich nach `,e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` auch das von
`,e.jsx(n,{children:"\\cgreen{\\bu_i}"}),", und in der Summendarstellung"]}),e.jsx(j,{children:"\\bA\\pinv = \\sum_{i=1}^{r} \\frac{1}{\\corange{\\sigma_i}}\\,\\cblue{\\bv_i}\\,\\cgreen{\\bu_i^\\top}"}),e.jsxs(i.p,{children:[`heben die beiden Vorzeichen einander auf. Bei einem mehrfachen Singulärwert ist
die Freiheit größer, das Ergebnis aber dasselbe: Dort darf die Orthonormalbasis
des Eigenraums gedreht werden, `,e.jsx(n,{children:"\\cblue{\\bV_r} \\mapsto \\cblue{\\bV_r}\\bQ"}),` und
mit `,e.jsx(i.a,{href:"#eq-rechte-und-linke-singulaervektoren",children:"(6.2.2)"}),` zugleich
`,e.jsx(n,{children:"\\cgreen{\\bU_r} \\mapsto \\cgreen{\\bU_r}\\bQ"}),`, und weil
`,e.jsx(n,{children:"\\corange{\\bSigma_r^{-1}}"}),` in diesem Block ein Vielfaches der Einheitsmatrix
ist, kürzt sich `,e.jsx(n,{children:"\\bQ\\bQ^\\top = \\bI"})," ebenso weg."]})]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.3.7 (Fortsetzung: die Pseudoinverse der Rang-1-Matrix)",id:"env-fortsetzung-die-pseudoinverse-der-rang-1",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA"})," aus ",e.jsx(i.a,{href:"#env-reduzierte-svd-einer-rang-1-matrix",children:"Beispiel 6.3.4"}),` setzen wir die drei Faktoren in umgekehrter
Reihenfolge zusammen:`]}),e.jsx(j,{children:`\\bA\\pinv
= \\cblue{\\bV_1}\\,\\corange{\\bSigma_1^{-1}}\\,\\cgreen{\\bU_1^\\top}
= \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}
  \\cdot \\corange{\\tfrac{1}{2}} \\cdot
  \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 & 0 \\end{pmatrix}
= \\frac{1}{4}\\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 0 \\end{pmatrix} .`}),e.jsx(i.p,{children:"Dazu die beiden Produkte:"}),e.jsx(j,{children:`\\bA\\bA\\pinv = \\frac{1}{2}\\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}
= \\cgreen{\\bu_1\\bu_1^\\top} ,
\\qquad
\\bA\\pinv\\bA = \\frac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}
= \\cblue{\\bv_1\\bv_1^\\top} .`}),e.jsxs(i.p,{children:[`Keines von beiden ist eine Einheitsmatrix, und zwar aus je eigenem Grund:
`,e.jsx(n,{children:"\\bA\\pinv\\bA \\neq \\bI_2"}),", weil ",e.jsx(n,{children:"\\bA"})," die Richtung ",e.jsx(n,{children:"\\cblue{\\bv_2}"}),` auf null
drückt und diese Information verloren ist; `,e.jsx(n,{children:"\\bA\\bA\\pinv \\neq \\bI_3"}),`, weil der
Spaltenraum nur eine Gerade im `,e.jsx(n,{children:"\\R^3"})," ist und ",e.jsx(n,{children:"\\bA\\bA\\pinv\\bb"}),` immer auf ihr
landet. Was `,e.jsx(n,{children:"\\bA\\bA\\pinv"}),` stattdessen tut, zeigt ein Testvektor: Für
`,e.jsx(n,{children:"\\bb = (1, 3, 5)^\\top"})," ist"]}),e.jsx(j,{children:"\\bA\\bA\\pinv\\bb = \\begin{pmatrix} 2 \\\\ 2 \\\\ 0 \\end{pmatrix} ,"}),e.jsxs(i.p,{children:["der Punkt von ",e.jsx(n,{children:"\\col(\\bA) = \\spann\\{(1,1,0)^\\top\\}"}),", der ",e.jsx(n,{children:"\\bb"}),` am nächsten
liegt: Die ersten beiden Einträge werden gemittelt, der dritte fällt weg.
`,e.jsx(n,{children:"\\bA\\bA\\pinv"})," wirkt also als ",e.jsx(c,{id:"projection",children:"Projektion"}),"."]})]}),`
`,e.jsx(i.h3,{children:"Eigenschaften der Pseudoinversen"}),`
`,e.jsxs(M,{kind:"Satz",label:"6.3.8 (Eigenschaften der Pseudoinversen)",id:"env-eigenschaften-der-pseudoinversen",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r \\geq 1"}),` und Pseudoinverser
`,e.jsx(n,{children:"\\bA\\pinv"}),". Dann gilt:"]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA\\bA\\pinv\\bx = \\proj_{\\col(\\bA)}\\bx"})," für alle ",e.jsx(n,{children:"\\bx \\in \\R^m"}),";"]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA\\pinv\\bA\\bx = \\proj_{\\col(\\bA^\\top)}\\bx"})," für alle ",e.jsx(n,{children:"\\bx \\in \\R^n"}),";"]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA\\bA\\pinv\\bA = \\bA"}),";"]}),`
`,e.jsxs(i.li,{children:[e.jsx(n,{children:"\\bA\\pinv\\bA\\bA\\pinv = \\bA\\pinv"}),"."]}),`
`]}),e.jsxs(i.p,{children:["Dabei ist ",e.jsx(n,{children:"\\proj_U"})," die orthogonale Projektion auf den Untervektorraum ",e.jsx(n,{children:"U"}),"."]})]}),`
`,e.jsxs(i.p,{children:["Die Punkte 3 und 4 heißen ",e.jsx(i.em,{children:"Konsistenzbedingungen"}),`: In den Dreierprodukten
verhält sich `,e.jsx(n,{children:"\\bA\\pinv"})," wie eine echte Inverse, obwohl ",e.jsx(n,{children:"\\bA\\bA\\pinv"}),` und
`,e.jsx(n,{children:"\\bA\\pinv\\bA"})," für sich keine Einheitsmatrizen sind."]}),`
`,e.jsx(i.p,{children:"Warum Projektionen herauskommen, zeigt das Einsetzen der reduzierten Faktoren:"}),`
`,e.jsx(j,{children:`\\bA\\bA\\pinv
= \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}\\;\\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top}
= \\cgreen{\\bU_r\\bU_r^\\top} ,`}),`
`,e.jsxs(i.p,{children:[`denn die inneren Faktoren heben sich nach
`,e.jsx(i.a,{href:"#eq-was-die-reduzierte-form-spart-und-was",children:"(6.3.4)"}),` weg; ebenso wird
`,e.jsx(n,{children:"\\bA\\pinv\\bA = \\cblue{\\bV_r\\bV_r^\\top}"}),". Die Spalten von ",e.jsx(n,{children:"\\cgreen{\\bU_r}"}),`
sind eine Orthonormalbasis von `,e.jsx(n,{children:"\\col(\\bA)"}),", die von ",e.jsx(n,{children:"\\cblue{\\bV_r}"}),` eine von
`,e.jsx(n,{children:"\\col(\\bA^\\top)"}),`. Daraus folgen die Aussagen 1 und 2, und aus ihnen die
Aussagen 3 und 4.`]}),`
`,e.jsxs(ee,{title:"Beweis der Eigenschaften der Pseudoinversen",children:[e.jsxs(i.p,{children:["Der Beweis zeigt, dass ",e.jsx(n,{children:"\\cgreen{\\bU_r\\bU_r^\\top}"})," auf ",e.jsx(n,{children:"\\col(\\bA)"}),` nichts
ändert und das orthogonale Komplement auf null abbildet.`]}),e.jsxs(be,{children:[e.jsxs($,{why:e.jsxs(e.Fragment,{children:["in ",e.jsx(n,{children:"\\bA\\bA\\pinv = \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}\\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top}"})," ist ",e.jsx(n,{children:"\\cblue{\\bV_r^\\top\\bV_r} = \\bI_r"})," nach ",e.jsx(i.a,{href:"#eq-was-die-reduzierte-form-spart-und-was",children:"(6.3.4)"}),", danach ",e.jsx(n,{children:"\\corange{\\bSigma_r\\bSigma_r^{-1}} = \\bI_r"})]}),children:[e.jsx(i.p,{children:"Geben wir dem Produkt einen Namen:"}),e.jsx(j,{children:"\\cgreen{\\bP} := \\bA\\bA\\pinv = \\cgreen{\\bU_r\\bU_r^\\top} ."})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["Transponieren dreht das Produkt um und trifft es dadurch selbst; für ",e.jsx(n,{children:"\\cgreen{\\bP^2}"})," klammern wir die inneren Faktoren zusammen und nutzen wieder ",e.jsx(i.a,{href:"#eq-was-die-reduzierte-form-spart-und-was",children:"(6.3.4)"})]}),children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cgreen{\\bP}"})," ist symmetrisch und idempotent:"]}),e.jsx(j,{children:`\\cgreen{\\bP^\\top} = \\bigl(\\cgreen{\\bU_r\\bU_r^\\top}\\bigr)^\\top = \\cgreen{\\bU_r\\bU_r^\\top} = \\cgreen{\\bP} ,
\\qquad
\\cgreen{\\bP^2} = \\cgreen{\\bU_r}\\bigl(\\cgreen{\\bU_r^\\top\\bU_r}\\bigr)\\cgreen{\\bU_r^\\top}
= \\cgreen{\\bU_r\\bU_r^\\top} = \\cgreen{\\bP} .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["die Spalten von ",e.jsx(n,{children:"\\cgreen{\\bU_r}"})," sind nach ",e.jsx(c,{id:"env:charakterisierung-der-fundamentalen",href:"#env-charakterisierung-der-fundamentalen",children:"Satz 6.2.11"})," eine Orthonormalbasis von ",e.jsx(n,{children:"\\col(\\bA)"}),", jedes ",e.jsx(n,{children:"\\by"})," dort ist also eine Linearkombination von ihnen"]}),children:[e.jsxs(i.p,{children:["Auf ",e.jsx(n,{children:"\\col(\\bA)"})," ändert ",e.jsx(n,{children:"\\cgreen{\\bP}"})," nichts. Jedes ",e.jsx(n,{children:"\\by \\in \\col(\\bA)"}),` lässt
sich als `,e.jsx(n,{children:"\\by = \\cgreen{\\bU_r}\\bc"}),` mit einem Koeffizientenvektor
`,e.jsx(n,{children:"\\bc \\in \\R^r"})," schreiben, und damit ist"]}),e.jsx(j,{children:"\\cgreen{\\bP}\\by = \\cgreen{\\bU_r}\\bigl(\\cgreen{\\bU_r^\\top\\bU_r}\\bigr)\\bc = \\cgreen{\\bU_r}\\bc = \\by ."})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["der ",e.jsx(n,{children:"i"}),"-te Eintrag von ",e.jsx(n,{children:"\\cgreen{\\bU_r^\\top}\\bz"})," ist das Skalarprodukt ",e.jsx(n,{children:"\\cgreen{\\bu_i^\\top}\\bz"}),", und die ",e.jsx(n,{children:"\\cgreen{\\bu_i}"})," spannen ",e.jsx(n,{children:"\\col(\\bA)"})," auf"]}),children:[e.jsxs(i.p,{children:["Auf dem ",e.jsx(c,{id:"orthogonal-complement",children:"orthogonalen Komplement"}),` bildet
`,e.jsx(n,{children:"\\cgreen{\\bP}"})," alles auf null ab. Steht ",e.jsx(n,{children:"\\bz"})," senkrecht auf ",e.jsx(n,{children:"\\col(\\bA)"}),`, so ist
`,e.jsx(n,{children:"\\cgreen{\\bu_i^\\top}\\bz = 0"})," für ",e.jsx(n,{children:"i = 1, \\dots, r"}),`, also
`,e.jsx(n,{children:"\\cgreen{\\bU_r^\\top}\\bz = \\bnull"})," und damit"]}),e.jsx(j,{children:"\\cgreen{\\bP}\\bz = \\cgreen{\\bU_r}\\bigl(\\cgreen{\\bU_r^\\top}\\bz\\bigr) = \\bnull ."})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["die Spalten von ",e.jsx(n,{children:"\\cgreen{\\bU} = (\\cgreen{\\bU_r} \\mid \\cgreen{\\bU_{m-r}})"})," sind eine Orthonormalbasis des ",e.jsx(n,{children:"\\R^m"}),"; die ersten ",e.jsx(n,{children:"r"})," spannen ",e.jsx(n,{children:"\\col(\\bA)"})," auf, die übrigen den linken Kern ",e.jsx(n,{children:"\\operatorname{Kern}(\\bA^\\top) = \\col(\\bA)^\\perp"}),", und die Entwicklung von ",e.jsx(n,{children:"\\bx"})," in dieser Basis liefert die Zerlegung"]}),children:[e.jsxs(i.p,{children:["Beides zusammen ergibt Aussage 1. Jedes ",e.jsx(n,{children:"\\bx \\in \\R^m"}),` zerlegt sich eindeutig in
`,e.jsx(n,{children:"\\bx = \\by + \\bz"})," mit ",e.jsx(n,{children:"\\by \\in \\col(\\bA)"})," und ",e.jsx(n,{children:"\\bz \\perp \\col(\\bA)"}),`, und nach
den beiden Vorschritten ist`]}),e.jsx(j,{children:"\\cgreen{\\bP}\\bx = \\cgreen{\\bP}\\by + \\cgreen{\\bP}\\bz = \\by = \\proj_{\\col(\\bA)}\\bx ."}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\cgreen{\\bP} = \\cgreen{\\bU_r\\bU_r^\\top}"}),` ist also die orthogonale
Projektionsmatrix auf `,e.jsx(n,{children:"\\col(\\bA)"}),`. Bild und Kern lesen wir gleich mit ab:
`,e.jsx(n,{children:"\\col(\\cgreen{\\bP}) = \\col(\\bA)"}),` und
`,e.jsx(n,{children:"\\operatorname{Kern}(\\cgreen{\\bP}) = \\col(\\bA)^\\perp"}),`. Schritt 2 bestätigt das
von der anderen Seite, denn `,e.jsx(n,{children:"\\cgreen{\\bP^2} = \\cgreen{\\bP}"})," macht ",e.jsx(n,{children:"\\cgreen{\\bP}"}),`
zu einer Projektion und `,e.jsx(n,{children:"\\cgreen{\\bP^\\top} = \\cgreen{\\bP}"}),` zu einer
orthogonalen.`]})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["jetzt treffen sich ",e.jsx(n,{children:"\\cgreen{\\bU_r^\\top\\bU_r} = \\bI_r"})," in der Mitte; die Spalten von ",e.jsx(n,{children:"\\cblue{\\bV_r}"})," sind eine Orthonormalbasis von ",e.jsx(n,{children:"\\col(\\bA^\\top)"}),", also ist ",e.jsx(n,{children:"\\cblue{\\bV_r\\bV_r^\\top}"})," nach demselben Argument die Projektion auf den Zeilenraum"]}),children:[e.jsx(i.p,{children:"Aussage 2 geht wörtlich genauso, nur mit den blauen Faktoren:"}),e.jsx(j,{children:`\\bA\\pinv\\bA
= \\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top}\\;\\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}
= \\cblue{\\bV_r\\bV_r^\\top} .`})]}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:["beide Male steht ",e.jsx(i.a,{href:"#eq-was-die-reduzierte-form-spart-und-was",children:"(6.3.4)"})," in der Mitte; anschaulich: jede Spalte von ",e.jsx(n,{children:"\\bA"})," liegt in ",e.jsx(n,{children:"\\col(\\bA)"}),", und dort lässt die Projektion nach Schritt 3 alles unverändert"]}),children:[e.jsx(i.p,{children:"Die Konsistenzbedingungen fallen jetzt ab:"}),e.jsx(j,{children:`\\bA\\bA\\pinv\\bA = \\cgreen{\\bU_r\\bU_r^\\top}\\;\\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}
= \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top} = \\bA ,`}),e.jsx(j,{children:`\\bA\\pinv\\bA\\bA\\pinv = \\cblue{\\bV_r\\bV_r^\\top}\\;\\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top}
= \\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top} = \\bA\\pinv .`})]})]})]}),`
`,e.jsx(i.p,{children:`Für Matrizen mit vollem Zeilen- oder Spaltenrang wird eine der beiden
Projektionen zur Identität, und dann sieht die Pseudoinverse einer echten
Inversen sehr ähnlich.`}),`
`,e.jsxs(M,{kind:"Korollar",label:"6.3.9 (Spezialfälle)",id:"env-spezialfaelle",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),"."]}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"r = m"})," (voller Zeilenrang), so gilt ",e.jsx(n,{children:"\\bA\\bA\\pinv = \\bI_m"}),"."]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"r = n"})," (voller Spaltenrang), so gilt ",e.jsx(n,{children:"\\bA\\pinv\\bA = \\bI_n"}),"."]}),`
`,e.jsxs(i.li,{children:["Ist ",e.jsx(n,{children:"\\bA"})," quadratisch und invertierbar, so gilt ",e.jsx(n,{children:"\\bA\\pinv = \\bA^{-1}"}),"."]}),`
`]})]}),`
`,e.jsx(ee,{title:"Beweis der Spezialfälle",children:e.jsxs(be,{children:[e.jsx($,{why:e.jsxs(e.Fragment,{children:["bei einer quadratischen Matrix ist eine einseitige Inverse automatisch die beidseitige; geometrisch: ",e.jsx(n,{children:"\\col(\\bA)"})," ist ganz ",e.jsx(n,{children:"\\R^m"})," bzw. ",e.jsx(n,{children:"\\col(\\bA^\\top)"})," ganz ",e.jsx(n,{children:"\\R^n"}),", und die Projektion auf den ganzen Raum ändert nichts"]}),children:e.jsxs(i.p,{children:["Zu 1 und 2: Für ",e.jsx(n,{children:"r = m"})," ist ",e.jsx(n,{children:"\\cgreen{\\bU_r} \\in \\R^{m \\times m}"}),` quadratisch
mit orthonormalen Spalten, also eine Orthogonalmatrix, und aus
`,e.jsx(n,{children:"\\cgreen{\\bU_r^\\top\\bU_r} = \\bI_m"}),` folgt dann auch
`,e.jsx(n,{children:"\\bA\\bA\\pinv = \\cgreen{\\bU_r\\bU_r^\\top} = \\bI_m"}),". Für ",e.jsx(n,{children:"r = n"}),` liefert
dasselbe Argument mit `,e.jsx(n,{children:"\\cblue{\\bV_r}"}),` die Gleichung
`,e.jsx(n,{children:"\\bA\\pinv\\bA = \\cblue{\\bV_r\\bV_r^\\top} = \\bI_n"}),"."]})}),e.jsx($,{why:e.jsxs(e.Fragment,{children:["die Inverse einer Matrix ist eindeutig: aus ",e.jsx(n,{children:"\\bB\\bA = \\bI"})," und ",e.jsx(n,{children:"\\bA\\bC = \\bI"})," folgt ",e.jsx(n,{children:"\\bB = \\bB\\bA\\bC = \\bC"})]}),children:e.jsxs(i.p,{children:["Zu 3: Ist ",e.jsx(n,{children:"\\bA"})," quadratisch und invertierbar, so ist ",e.jsx(n,{children:"r = m = n"}),`, beide Fälle
greifen gleichzeitig, und `,e.jsx(n,{children:"\\bA\\pinv"})," ist eine beidseitige Inverse von ",e.jsx(n,{children:"\\bA"}),"."]})})]})}),`
`,e.jsx(i.p,{children:`Der zweite Spezialfall ist der für die Statistik wichtigste, denn eine
Designmatrix hat in aller Regel mehr Zeilen als Spalten. Er lässt sich sogar
ohne SVD ausrechnen.`}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.3.10 (Voller Spaltenrang: eine geschlossene Formel)",id:"env-voller-spaltenrang-eine-geschlossene",children:[e.jsxs(i.p,{children:["Hat ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," vollen Spaltenrang ",e.jsx(n,{children:"r = n"}),`, so ist
`,e.jsx(n,{children:"\\cblue{\\bV_r}"})," orthogonal, und ",e.jsx(n,{children:"\\bA^\\top\\bA"})," lässt sich mit ",e.jsx(i.a,{href:"#eq-reduzierte-darstellung",children:"(6.3.3)"}),` und
`,e.jsx(i.a,{href:"#eq-was-die-reduzierte-form-spart-und-was",children:"(6.3.4)"})," ausrechnen:"]}),e.jsx(j,{children:`\\bA^\\top\\bA
= \\cblue{\\bV_r}\\corange{\\bSigma_r}\\cgreen{\\bU_r^\\top}\\;\\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}
= \\cblue{\\bV_r}\\corange{\\bSigma_r^2}\\cblue{\\bV_r^\\top} ,
\\qquad\\text{also}\\qquad
\\bigl(\\bA^\\top\\bA\\bigr)^{-1} = \\cblue{\\bV_r}\\corange{\\bSigma_r^{-2}}\\cblue{\\bV_r^\\top} .`}),e.jsxs(i.p,{children:["Multiplizieren wir das mit ",e.jsx(n,{children:"\\bA^\\top = \\cblue{\\bV_r}\\corange{\\bSigma_r}\\cgreen{\\bU_r^\\top}"}),`,
so bleibt`]}),e.jsx(X,{tag:"6.3.6",id:"eq-voller-spaltenrang-eine-geschlossene",children:`\\bigl(\\bA^\\top\\bA\\bigr)^{-1}\\bA^\\top
= \\cblue{\\bV_r}\\corange{\\bSigma_r^{-2}}\\underbrace{\\cblue{\\bV_r^\\top}\\cblue{\\bV_r}}_{= \\bI_n}\\corange{\\bSigma_r}\\cgreen{\\bU_r^\\top}
= \\cblue{\\bV_r}\\corange{\\bSigma_r^{-1}}\\cgreen{\\bU_r^\\top}
= \\bA\\pinv .`}),e.jsxs(i.p,{children:[`Bei vollem Spaltenrang ist die Pseudoinverse also
`,e.jsx(n,{children:"(\\bA^\\top\\bA)^{-1}\\bA^\\top"}),`, die aufgelöste Form der
`,e.jsx(c,{id:"normal-equations",children:"Normalengleichungen"}),"."]})]}),`
`,e.jsx(ee,{title:"Die geschlossene Formel an der Beispielmatrix",children:e.jsxs(M,{kind:"Beispiel",label:"6.3.11 (Pseudoinverse der Beispielmatrix)",id:"env-pseudoinverse-der-beispielmatrix",children:[e.jsxs(i.p,{children:["Kehren wir zu der Matrix zurück, die uns durch ",e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),`
begleitet hat:`]}),e.jsx(j,{children:`\\bA = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\\\ 1 & 0 \\end{pmatrix} ,
\\qquad
\\bA^\\top\\bA = \\begin{pmatrix} 6 & 4 \\\\ 4 & 5 \\end{pmatrix} ,
\\qquad
\\corange{\\sigma_1} \\approx \\corange{3{,}087} , \\quad \\corange{\\sigma_2} \\approx \\corange{1{,}212} .`}),e.jsxs(i.p,{children:["Beide Singulärwerte sind positiv, also ist ",e.jsx(n,{children:"r = 2 = n"}),`: voller Spaltenrang. Die
reduzierte SVD wirft hier nur die dritte Spalte von `,e.jsx(n,{children:"\\cgreen{\\bU}"}),` weg, jene
`,e.jsx(n,{children:"\\cgreen{\\bu_3}"})," aus ",e.jsx(i.a,{href:"#env-die-gestalt-von",children:"Beispiel 6.2.14"}),`, die den linken Kern aufspannt. Weil
`,e.jsx(n,{children:"r = n"})," ist, dürfen wir ",e.jsx(i.a,{href:"#eq-voller-spaltenrang-eine-geschlossene",children:"(6.3.6)"}),` benutzen und die Singulärwerte ganz umgehen.
Mit `,e.jsx(n,{children:"\\det(\\bA^\\top\\bA) = 30 - 16 = 14"})," ist"]}),e.jsx(j,{children:`\\bigl(\\bA^\\top\\bA\\bigr)^{-1} = \\frac{1}{14}\\begin{pmatrix} 5 & -4 \\\\ -4 & 6 \\end{pmatrix} ,
\\qquad
\\bA\\pinv = \\frac{1}{14}\\begin{pmatrix} 5 & -4 \\\\ -4 & 6 \\end{pmatrix}
\\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 0 \\end{pmatrix}
= \\frac{1}{14}\\begin{pmatrix} -3 & 6 & 5 \\\\ 8 & -2 & -4 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[e.jsx(c,{id:"env:spezialfaelle",href:"#env-spezialfaelle",children:"Korollar 6.3.9"})," verspricht ",e.jsx(n,{children:"\\bA\\pinv\\bA = \\bI_2"}),", und die Rechnung bestätigt das:"]}),e.jsx(j,{children:`\\frac{1}{14}\\begin{pmatrix} -3 & 6 & 5 \\\\ 8 & -2 & -4 \\end{pmatrix}
\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\\\ 1 & 0 \\end{pmatrix}
= \\frac{1}{14}\\begin{pmatrix} -3 + 12 + 5 & -6 + 6 + 0 \\\\ 8 - 4 - 4 & 16 - 2 + 0 \\end{pmatrix}
= \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} .`}),e.jsxs(i.p,{children:[`In der anderen Reihenfolge kommt dagegen keine Einheitsmatrix heraus, denn
`,e.jsx(n,{children:"\\col(\\bA)"})," ist nur eine Ebene im ",e.jsx(n,{children:"\\R^3"}),`: Es ist
`,e.jsx(n,{children:"\\bA\\bA\\pinv = \\bI_3 - \\cgreen{\\bu_3\\bu_3^\\top}"}),`, die orthogonale Projektion
auf diese Ebene.`]})]})}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.3.12 (Ausblick: Kleinste Quadrate)",id:"env-ausblick-kleinste-quadrate",children:[e.jsxs(i.p,{children:["Aussage 1 aus ",e.jsx(c,{id:"env:eigenschaften-der-pseudoinversen",href:"#env-eigenschaften-der-pseudoinversen",children:"Satz 6.3.8"}),` hat eine wichtige Anwendung. Ein überbestimmtes
System `,e.jsx(n,{children:"\\bA\\bx = \\bb"})," hat in aller Regel keine Lösung, weil ",e.jsx(n,{children:"\\bb"}),` nicht in
`,e.jsx(n,{children:"\\col(\\bA)"})," liegt. Am nächsten kommt ",e.jsx(n,{children:"\\bb"}),` der Punkt
`,e.jsx(n,{children:"\\bA\\bA\\pinv\\bb = \\proj_{\\col(\\bA)}\\bb"}),". Der Vektor"]}),e.jsx(j,{children:"\\wh{\\bx} = \\bA\\pinv\\bb"}),e.jsxs(i.p,{children:["löst deshalb das ",e.jsx(c,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problem"}),`
`,e.jsx(n,{children:"\\min_{\\bx} \\left\\|\\cred{\\bA\\bx - \\bb}\\right\\|"}),`: Kleiner als
`,e.jsx(n,{children:"\\left\\|\\cred{\\proj_{\\col(\\bA)}\\bb - \\bb}\\right\\|"}),` wird das Residuum nicht.
Bei vollem Spaltenrang ist `,e.jsx(n,{children:"\\wh{\\bx}"}),` nach
`,e.jsx(i.a,{href:"#eq-voller-spaltenrang-eine-geschlossene",children:"(6.3.6)"}),` die vertraute Lösung der
Normalengleichungen; bei kleinerem Rang gibt es unendlich viele Lösungen, und
`,e.jsx(n,{children:"\\bA\\pinv\\bb"}),` wählt unter ihnen die mit der kleinsten Norm. Ausgeführt wird das
in `,e.jsx(i.a,{href:"?k=07-kq#sec-7.6",children:"Abschnitt 7.6"}),`, wo die Pseudoinverse der robusteste von drei
Lösungswegen ist.`]})]}),`
`,e.jsxs(we,{title:"Die kürzeste unter unendlich vielen Lösungen",children:[e.jsxs(i.p,{children:[`Was heißt „die mit der kleinsten Norm" geometrisch? Das Widget stellt beide
Räume nebeneinander: rechts den Bildraum mit `,e.jsx(n,{children:"\\bb"}),`, dem Spaltenraum
`,e.jsx(n,{children:"\\cgreen{\\col(\\bA)}"}),` und dem Residuum, links den Urbildraum
mit der Menge aller Kleinste-Quadrate-Lösungen. Ist `,e.jsx(n,{children:"\\bA"}),` singulär, so ist
diese Menge eine Gerade.`]}),e.jsx(ji,{}),e.jsxs(i.p,{children:["Das Residuum hängt nur von der Projektion auf ",e.jsx(n,{children:"\\cgreen{\\col(\\bA)}"}),` ab und ist
für jede Lösung dasselbe. Die Norm `,e.jsx(n,{children:"\\left\\|\\bx\\right\\|"}),` dagegen unterscheidet
die Lösungen, und `,e.jsx(n,{children:"\\bA\\pinv\\bb"}),` ist der Punkt der Lösungsgeraden, der dem
Ursprung am nächsten liegt.`]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(Ve,{loesung:20,toleranz:.5,children:[e.jsxs(i.p,{children:["Stellen wir im Blockschema oben das Preset ",e.jsx(n,{children:"r < \\min(m, n)"})," ein, also ",e.jsx(n,{children:"m = 5"}),`,
`,e.jsx(n,{children:"n = 4"}),", ",e.jsx(n,{children:"r = 2"}),`, und schalten wir auf die reduzierte Zerlegung um. Wie viele
Zahlen speichert sie?`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"r \\cdot (m + n + 1) = 2 \\cdot 10 = 20"}),`. Die volle Zerlegung braucht
`,e.jsx(n,{children:"m^2 + n^2 + \\min(m,n) = 25 + 16 + 4 = 45"}),` Zahlen, die Matrix selbst
`,e.jsx(n,{children:"m \\cdot n = 20"}),`. Bei diesen Formaten lohnt die Reduktion gegenüber der vollen
Zerlegung deutlich, gegenüber `,e.jsx(n,{children:"\\bA"})," selbst aber noch nicht: Erst kleines ",e.jsx(n,{children:"r"}),`
bei großem `,e.jsx(n,{children:"m"})," und ",e.jsx(n,{children:"n"})," spart wirklich (",e.jsx(i.a,{href:"#env-was-die-reduzierte-form-spart-und-was",children:"Bemerkung 6.3.3"}),")."]})]}),e.jsxs(Ve,{loesung:2.121,toleranz:.02,children:[e.jsxs(i.p,{children:[`Im Pseudoinversen-Widget steht voreingestellt
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 1 & 1 \\\\ 1 & 1 \\end{smallmatrix}\\bigr)"}),` mit
`,e.jsx(n,{children:"\\bb = (1,\\; 5)^\\top"}),". Wie groß ist die Norm ",e.jsx(n,{children:"\\left\\| \\bA\\pinv\\bb \\right\\|"}),` der
Minimalnorm-Lösung?`]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\left\\| \\bA\\pinv\\bb \\right\\| = 2{,}121"}),`. Es ist
`,e.jsx(n,{children:"\\bA\\pinv = \\tfrac{1}{4}\\bigl(\\begin{smallmatrix} 1 & 1 \\\\ 1 & 1 \\end{smallmatrix}\\bigr)"}),`,
also `,e.jsx(n,{children:"\\bA\\pinv\\bb = (1{,}5,\\; 1{,}5)^\\top"})," mit der Länge ",e.jsx(n,{children:"1{,}5\\sqrt{2}"}),`. Jede
andere Lösung liegt weiter außen: Bei `,e.jsx(n,{children:"t = 1"}),` auf der Lösungsgeraden sind es
schon `,e.jsx(n,{children:"2{,}345"}),", während das Residuum unverändert ",e.jsx(n,{children:"2{,}828"})," bleibt."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["In der reduzierten SVD ",e.jsx(n,{children:"\\bA = \\bU_r\\bSigma_r\\bV_r^\\top"})," sind ",e.jsx(n,{children:"\\bU_r"}),` und
`,e.jsx(n,{children:"\\bV_r"})," Orthogonalmatrizen."]}),e.jsxs(i.p,{children:["Ihre Spalten sind orthonormal, es gilt also ",e.jsx(n,{children:"\\bU_r^\\top\\bU_r = \\bI_r"}),` und
`,e.jsx(n,{children:"\\bV_r^\\top\\bV_r = \\bI_r"}),`. Orthogonal heißt eine Matrix aber erst, wenn sie
quadratisch ist, und das sind die beiden nur für `,e.jsx(n,{children:"r = m"})," bzw. ",e.jsx(n,{children:"r = n"}),`. In der
anderen Reihenfolge sind die Produkte im Allgemeinen keine Einheitsmatrizen,
sondern Projektionen (`,e.jsx(c,{id:"env:eigenschaften-der-pseudoinversen",href:"#env-eigenschaften-der-pseudoinversen",children:"Satz 6.3.8"}),")."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Pseudoinverse erfüllt ",e.jsx(n,{children:"\\bA\\bA\\pinv = \\bI_m"})," für jede Matrix ",e.jsx(n,{children:"\\bA"}),"."]}),e.jsxs(i.p,{children:["Das gilt nur bei vollem Zeilenrang ",e.jsx(n,{children:"r = m"})," (",e.jsx(c,{id:"env:spezialfaelle",href:"#env-spezialfaelle",children:"Korollar 6.3.9"}),`). Im Allgemeinen ist
`,e.jsx(n,{children:"\\bA\\bA\\pinv = \\bU_r\\bU_r^\\top"})," die Projektion auf ",e.jsx(n,{children:"\\col(\\bA)"}),`, und die ist von
der Einheitsmatrix weit entfernt, sobald `,e.jsx(n,{children:"\\col(\\bA)"}),` ein echter Untervektorraum
des `,e.jsx(n,{children:"\\R^m"})," ist. In ",e.jsx(i.a,{href:"#env-fortsetzung-die-pseudoinverse-der-rang-1",children:"Beispiel 6.3.7"})," etwa hat ",e.jsx(n,{children:"\\bA\\bA\\pinv"})," eine Nullzeile."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bA"})," quadratisch und invertierbar, so ist ",e.jsx(n,{children:"\\bA\\pinv = \\bA^{-1}"}),"."]}),e.jsxs(i.p,{children:["Dann ist ",e.jsx(n,{children:"r = m = n"}),", und beide Spezialfälle aus ",e.jsx(c,{id:"env:spezialfaelle",href:"#env-spezialfaelle",children:"Korollar 6.3.9"}),` greifen
gleichzeitig: `,e.jsx(n,{children:"\\bA\\pinv"}),` ist eine beidseitige Inverse, und die ist eindeutig.
Die Pseudoinverse verallgemeinert die Inverse also wirklich, sie ersetzt sie
nicht.`]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Weil ",e.jsx(n,{children:"\\bA\\bA\\pinv\\bA = \\bA"})," gilt, ist ",e.jsx(n,{children:"\\bA\\pinv\\bA"})," die Einheitsmatrix."]}),e.jsxs(i.p,{children:["Das eine folgt nicht aus dem anderen. In ",e.jsx(i.a,{href:"#env-fortsetzung-die-pseudoinverse-der-rang-1",children:"Beispiel 6.3.7"}),` ist
`,e.jsx(n,{children:"\\bA\\pinv\\bA = \\tfrac{1}{2}\\left(\\begin{smallmatrix} 1 & 1 \\\\ 1 & 1 \\end{smallmatrix}\\right)"}),`,
und trotzdem stimmt `,e.jsx(n,{children:"\\bA\\bA\\pinv\\bA = \\bA"}),`. Der Grund: Die Projektion
`,e.jsx(n,{children:"\\bA\\pinv\\bA"})," lässt den Zeilenraum ",e.jsx(n,{children:"\\col(\\bA^\\top)"}),` punktweise fest, und mehr
braucht es nicht, weil `,e.jsx(n,{children:"\\bA"}),` ohnehin nur auf diesem Teilraum etwas anderes als
den Nullvektor produziert.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §3.6 (SVD und Pseudoinverse); vgl. MML §4.5 für die
reduzierten Varianten der Zerlegung und §4.6 für den Anschluss an die
Rang-k-Approximation.`})})]})}function pi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(zn,{...r})}):zn(r)}function Kn(r){const i=r.length,s=r[0].length,a=Array.from({length:s},(b,m)=>r.map(t=>t[m])),h=Array.from({length:s},(b,m)=>Array.from({length:s},(t,g)=>g===m?1:0)),u=(b,m)=>b.reduce((t,g,x)=>t+g*m[x],0);for(let b=0;b<60;b++){let m=0;for(let t=0;t<s-1;t++)for(let g=t+1;g<s;g++){const x=u(a[t],a[t]),p=u(a[g],a[g]),_=u(a[t],a[g]),w=Math.sqrt(x*p);if(w>0&&(m=Math.max(m,Math.abs(_)/w)),w===0||Math.abs(_)<=1e-14*w)continue;const N=(p-x)/(2*_),S=Math.sign(N)/(Math.abs(N)+Math.sqrt(1+N*N)),k=1/Math.sqrt(1+S*S),l=k*S;for(let d=0;d<i;d++){const A=a[t][d];a[t][d]=k*A-l*a[g][d],a[g][d]=l*A+k*a[g][d]}for(let d=0;d<s;d++){const A=h[t][d];h[t][d]=k*A-l*h[g][d],h[g][d]=l*A+k*h[g][d]}}if(m<1e-12)break}const o=a.map(b=>Math.sqrt(u(b,b))),f=o.map((b,m)=>m).sort((b,m)=>o[m]-o[b]);return{u:f.map(b=>o[b]>1e-10?a[b].map(m=>m/o[b]):a[b].map(()=>0)),s:f.map(b=>o[b]),v:f.map(b=>h[b]),m:i,n:s}}function $n(r,i){const s=Array.from({length:r.m},()=>Array(r.n).fill(0));for(let a=0;a<Math.min(i,r.s.length);a++)for(let h=0;h<r.m;h++){const u=r.s[a]*r.u[a][h];for(let o=0;o<r.n;o++)s[h][o]+=u*r.v[a][o]}return s}function fi(r,i){return r.map((s,a)=>s.map((h,u)=>h-i[a][u]))}function ki(r){let i=0;for(const s of r)for(const a of s)i+=a*a;return Math.sqrt(i)}function cn(r,i){const s=r.reduce((a,h)=>a+h*h,0);return s===0?NaN:r.slice(0,i).reduce((a,h)=>a+h*h,0)/s}function vi(r){let i=r>>>0;return()=>(i=1103515245*i+12345>>>0,i/4294967296)}function Ai(r=36,i=54,s=.07){const a=[],h=Math.round(.66*r),u=Math.round(.28*r),o=[5,12,19,28,35,44],f=3,b=[[5,15],[19,31],[35,47]],m=vi(20260811);for(let t=0;t<r;t++){const g=[];for(let x=0;x<i;x++){let p;t<h?p=.88-.2*(t/h):(p=.5-.18*((t-h)/(r-h)),p+=.04*Math.sin(.7*x+t));const _=(t-.12*r)**2+((x-.85*i)*.8)**2;if(p=Math.max(p,.98*Math.exp(-_/14)),t>=u+3&&t<h+2)for(const w of o)x>=w&&x<w+f&&(p=.14+.05*Math.sin(3*w+t));if(t>=u&&t<u+3)for(const[w,N]of b)x>=w&&x<N&&(p=.18);p+=s*(m()-.5),g.push(Math.min(1,Math.max(0,p)))}a.push(g)}return a}let tn=null;function wi(){if(!tn){const r=Ai();tn={A:r,svd:Kn(r)}}return tn}const ln=D.orange,Ce=D.rot,Oe=D.grau,ae=24,je=3,ce=(r,i=3)=>q(r,i),De=(r,i=1)=>Number.isFinite(r)?`${ce(100*r,i)} %`:ce(r);function dn({data:r,scale:i=4,mode:s="clamp"}){const a=E.useRef(null),h=r.length,u=r[0].length;return E.useEffect(()=>{const o=a.current;if(!o)return;const f=o.getContext("2d");if(!f)return;const b=f.createImageData(u,h);let m=0,t=1;if(s==="sym"){let g=0;for(const x of r)for(const p of x)g=Math.max(g,Math.abs(p));m=-g||-1,t=g||1}for(let g=0;g<h;g++)for(let x=0;x<u;x++){const p=Math.min(1,Math.max(0,(r[g][x]-m)/(t-m))),_=Math.round(p*255),w=4*(g*u+x);b.data[w]=_,b.data[w+1]=_,b.data[w+2]=_,b.data[w+3]=255}f.putImageData(b,0,0)},[r,h,u,s]),e.jsx("canvas",{ref:a,width:u,height:h,style:{width:u*i,imageRendering:"pixelated"},className:"h-auto max-w-full rounded border border-slate-300 dark:border-slate-600"})}function an({children:r,titel:i}){return e.jsxs("figure",{className:"flex flex-col items-center gap-1",children:[r,e.jsx("figcaption",{className:"text-center text-xs",style:{color:Oe},children:i})]})}function Dn(r){return i=>{if(!Number.isFinite(i))return NaN;const s=Math.min(Math.max(i,0),r.length-1),a=Math.floor(s),h=Math.min(a+1,r.length-1);return r[a]*(1-(s-a))+r[h]*(s-a)}}function _i(){const{A:r,svd:i}=wi(),[s,a]=E.useState(1),h=E.useMemo(()=>$n(i,s),[i,s]),u=E.useMemo(()=>fi(r,h),[r,h]),o=i.m,f=i.n,b=o*f,m=s*(o+f+1),t=Math.floor((b-1)/(o+f+1)),g=ki(r),x=E.useMemo(()=>Array.from({length:ae+1},(k,l)=>i.s[l]??0),[i]),p=E.useMemo(()=>Array.from({length:ae+1},(k,l)=>Math.sqrt(i.s.slice(l).reduce((d,A)=>d+A*A,0))),[i]),_=cn(i.s,s),w=1.15*p[1],N=i.s.slice(0,ae),S=N[0];return e.jsx(Bn,{frage:e.jsx(e.Fragment,{children:"Wie viele Rang-1-Terme braucht dieses Bild, bis im Restbild nur noch das Rauschen der Vorlage steht?"}),loesung:je,toleranz:.5,einheit:"Terme",fmt:k=>q(k,0),min:1,max:ae,children:({aufgeloest:k})=>e.jsxs("div",{children:[e.jsxs(fe,{children:["Schieben wir ",e.jsx(n,{children:"k"})," nach oben und achten wir auf die dritte Tafel: Ab wann steht dort kein Gegenstand mehr, sondern nur noch Körnung?"]}),e.jsx("div",{className:"mt-3 max-w-md",children:e.jsx(oe,{label:"Rang k",value:s,onChange:l=>a(Math.round(l)),min:1,max:ae,step:1,accent:ln,marks:k?[je]:void 0,fmt:l=>q(l,0)})}),e.jsxs("div",{className:"mt-3 flex flex-wrap items-start justify-center gap-4",children:[e.jsx(an,{titel:e.jsxs(e.Fragment,{children:["Original ",e.jsx(n,{children:"\\bA"})]}),children:e.jsx(dn,{data:r})}),e.jsx(an,{titel:e.jsxs(e.Fragment,{children:["Rekonstruktion ",e.jsx(n,{children:`\\bA_{${s}}`})]}),children:e.jsx(dn,{data:h})}),e.jsx(an,{titel:e.jsxs(e.Fragment,{children:["Differenz ",e.jsx(n,{children:`\\bA - \\bA_{${s}}`}),", wobei 0 als Mittelgrau erscheint"]}),children:e.jsx(dn,{data:u,mode:"sym"})})]}),e.jsxs("div",{className:"mt-4 flex flex-wrap items-start justify-center gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("div",{className:"flex h-28 items-end gap-0.5","aria-hidden":"true",children:N.map((l,d)=>e.jsx("div",{title:`σ${d+1} = ${ce(l)}`,className:"w-2.5 rounded-t",style:{height:`${Math.max(2,l/S*100)}%`,backgroundColor:d<s?ln:"var(--w-grid-strong)"}},d))}),e.jsxs("span",{className:"max-w-[220px] text-center text-xs",style:{color:Oe},children:["Singulärwerte ",e.jsx(n,{children:"\\sigma_1"})," bis ",e.jsx(n,{children:`\\sigma_{${ae}}`})," in absteigender Größe; orange eingefärbt sind die ",s,", die in"," ",e.jsx(n,{children:`\\bA_{${s}}`})," eingehen"]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx(Un,{xLabel:"Rang k",yLabel:"Fehler",xDomain:[1,ae],yDomain:[0,w],width:330,height:230,ariaLabel:`Fehler der Rang-k-Approximation über k; bei k = ${s} beträgt der Frobenius-Fehler ${ce(p[s])}.`,series:[{f:Dn(p),color:Ce,label:"Frobenius-Fehler"},{f:Dn(x),color:Ce,dash:[5,4],label:"Spektralnorm-Fehler"}],markers:[{x:s,y:p[s],color:Ce},{x:s,y:x[s],color:Ce}]}),e.jsxs("span",{className:"max-w-[330px] text-center text-xs",style:{color:Oe},children:["Die beiden Fehlerformeln aus (",qe("eq:eckart-und-young-beste-approximation-von"),"), an diesem Bild ausgewertet. Sinnvoll sind nur ganzzahlige ",e.jsx(n,{children:"k"}),"; die Punkte sind der Übersicht halber verbunden."]})]})]}),e.jsxs("div",{className:"mt-4 space-y-2 text-sm",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-1",children:["Energie-Anteil"," ",e.jsx(n,{children:`\\sum_{i=1}^{${s}} \\sigma_i^2 \\big/ \\sum_{i=1}^{r} \\sigma_i^2`})," ="," ",e.jsx("strong",{children:De(_,2)})]}),e.jsxs("div",{className:"relative h-4 w-full max-w-md rounded bg-slate-200 dark:bg-slate-700",children:[e.jsx("div",{className:"absolute left-0 top-0 h-4 rounded",style:{width:`${Math.max(0,Math.min(1,_))*100}%`,backgroundColor:ln}}),e.jsx("div",{className:"absolute left-[90%] top-0 h-4 w-px bg-slate-500"}),e.jsx("div",{className:"absolute left-[99%] top-0 h-4 w-px bg-slate-500"})]}),e.jsx("div",{className:"mt-0.5 max-w-md text-xs",style:{color:Oe},children:"Die beiden Striche markieren 90 % und 99 %."})]}),e.jsxs("ul",{className:"list-disc space-y-1 pl-5",children:[e.jsxs("li",{children:["Spektralnorm-Fehler"," ",e.jsx(n,{children:`\\left\\| \\bA - \\bA_{${s}} \\right\\|_2 = \\sigma_{${s+1}}`})," ="," ",ce(x[s]),", relativ zu ",e.jsx(n,{children:"\\sigma_1"}),":"," ",De(x[s]/x[0],2),"."]}),e.jsxs("li",{children:["Frobenius-Fehler ",e.jsx(n,{children:`\\left\\| \\bA - \\bA_{${s}} \\right\\|_F`})," ="," ",ce(p[s]),", relativ zu ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_F"})," ="," ",ce(g),": ",De(p[s]/g,2),"."]}),e.jsxs("li",{children:["Speicherbedarf: ",s," · (",o," + ",f," + 1) = ",m," Zahlen; das Bild selbst hat"," ",o," · ",f," = ",b,". Verhältnis: ",De(m/b),"."," ",s<=t?`Bei k = ${t+1} kippt die Bilanz.`:`Die Bilanz ist gekippt: Kompression gibt es hier nur bis k = ${t}.`]})]}),s<ae?e.jsxs("p",{children:["Wie viel ein weiterer Term überhaupt noch bringen kann, verrät der nächste graue Balken: Er senkt den quadrierten Frobenius-Fehler um"," ",e.jsx(n,{children:`\\sigma_{${s+1}}^2 = ${(x[s]**2).toFixed(3).replace(".","{,}")}`}),"."]}):e.jsxs("p",{children:["Alle ",ae," gezeigten Balken sind aufgebraucht. Jeder weitere Term würde den quadrierten Frobenius-Fehler noch um ",e.jsx(n,{children:"\\sigma_{k+1}^2"})," senken; das sind hier höchstens ",ce(x[ae]**2),"."]})]}),k?s>t?e.jsxs(I,{kind:"warn",titel:"Speicherbilanz gekippt:",children:["Bei ",e.jsx(n,{children:`k = ${s}`})," legen wir mit ",m," Zahlen mehr ab als das Bild selbst hat (",b,"). Kompression gibt es hier nur bis ",e.jsx(n,{children:`k = ${t}`}),"; als Glättung kann ein größeres ",e.jsx(n,{children:"k"})," trotzdem sinnvoll sein."]}):s<je?e.jsxs(I,{kind:"fail",titel:"Noch fehlt Struktur:",children:["In der dritten Tafel zeichnen sich noch Gegenstände ab, nicht nur Körnung: Der nächste Singulärwert ",e.jsx(n,{children:`\\sigma_{${s+1}} = ${ce(x[s])}`})," ist groß gegen seine Nachfolger, und genau er ist nach (",qe("eq:eckart-und-young-beste-approximation-von"),") der Fehler in der Spektralnorm. Der Energie-Anteil liegt erst bei ",De(_,2),"."]}):e.jsxs(I,{kind:"ok",titel:"Hinter dem Knick:",children:["Ab ",e.jsx(n,{children:`k = ${je}`})," bleibt in der Differenz im Wesentlichen das Rauschen der Vorlage übrig. Der Grund steht im Balkenbild: Nach"," ",e.jsx(n,{children:`\\sigma_{${je}}`})," fällt das Spektrum um den Faktor"," ",ce(i.s[je]/i.s[je-1],2)," ab, und die ersten drei Terme tragen bereits ",De(cn(i.s,je),2)," der Energie. Weitere Terme senken den Frobenius-Fehler nach (",qe("eq:eckart-und-young-beste-approximation-von"),") nur noch um jeweils ",e.jsx(n,{children:"\\sigma_{k+1}^2"}),", hier also um Bruchteile."]}):e.jsx(I,{kind:"neutral",children:"Die dritte Tafel zeigt, wo die Rekonstruktion danebenliegt: Mittelgrau heißt kein Unterschied, hell und dunkel markieren zu helle und zu dunkle Bildpunkte. Lesen wir sie zusammen mit dem Balkenbild links, dann sehen wir, welcher Singulärwert gerade welche Struktur nachträgt."})]})})}const Si=D.orange,Mn=D.rot,ye=D.grau,pe=["Ada","Bruno","Carla","Deniz"],Me=["Sternenstaub","Nachtzug","Tiefsee","Bergsommer","Kaltes Licht"],Y=[[5,null,1,null,4],[null,3,null,4,null],[2,1,null,null,5],[null,5,4,3,null]],ve=Y.length,Ae=Y[0].length,yn={spalte:"Filmmittel (Spalten)",zeile:"Nutzermittel (Zeilen)",gesamt:"Gesamtmittel"},zi={spalte:"dem Mittel der jeweiligen Filmspalte",zeile:"dem Mittel der jeweiligen Nutzerzeile",gesamt:"dem Gesamtmittel"},he=(r,i=2)=>q(r,i),Di=r=>Number.isFinite(r)?`${he(100*r,1)} %`:he(r);function qn(r){return`rgba(0, 114, 178, ${(.08+.62*Math.min(1,Math.max(0,r/5))).toFixed(3)})`}function Rn({children:r}){return e.jsx("th",{className:"px-1 pb-1 text-center text-xs font-normal",style:{color:ye},children:r})}function Mi(){const[r,i]=E.useState(2),[s,a]=E.useState("spalte"),[h,u]=E.useState(()=>Y.map(l=>l.map(()=>!1))),o=(l,d)=>Y[l][d]!==null&&!h[l][d],{F:f,fuellwert:b,gesamtMittel:m,anzahlBeobachtet:t}=E.useMemo(()=>{const l=[];for(let y=0;y<ve;y++)for(let R=0;R<Ae;R++)o(y,R)&&l.push(Y[y][R]);const d=l.length>0?l.reduce((y,R)=>y+R,0)/l.length:0,A=Array.from({length:Ae},(y,R)=>{const L=[];for(let P=0;P<ve;P++)o(P,R)&&L.push(Y[P][R]);return L.length>0?L.reduce((P,H)=>P+H,0)/L.length:d}),z=Array.from({length:ve},(y,R)=>{const L=[];for(let P=0;P<Ae;P++)o(R,P)&&L.push(Y[R][P]);return L.length>0?L.reduce((P,H)=>P+H,0)/L.length:d}),U=(y,R)=>s==="spalte"?A[R]:s==="zeile"?z[y]:d;return{F:Array.from({length:ve},(y,R)=>Array.from({length:Ae},(L,P)=>o(R,P)?Y[R][P]:U(R,P))),fuellwert:U,gesamtMittel:d,anzahlBeobachtet:l.length}},[s,h]),g=E.useMemo(()=>Kn(f),[f]),x=E.useMemo(()=>$n(g,r),[g,r]),{rmse:p,anzahl:_}=E.useMemo(()=>{let l=0,d=0;for(let A=0;A<ve;A++)for(let z=0;z<Ae;z++)o(A,z)&&(l+=(Y[A][z]-x[A][z])**2,d++);return{rmse:d>0?Math.sqrt(l/d):NaN,anzahl:d}},[x,h]),w=E.useMemo(()=>{const l=[];for(let d=0;d<ve;d++)for(let A=0;A<Ae;A++)Y[d][A]!==null&&h[d][A]&&l.push({i:d,j:A,wahr:Y[d][A],hut:x[d][A]});return l},[x,h]),N=(l,d)=>{Y[l][d]!==null&&u(A=>A.map((z,U)=>z.map((v,y)=>U===l&&y===d?!v:v)))},S=cn(g.s,r),k=g.s.filter(l=>l>1e-9).length;return e.jsxs("div",{children:[e.jsx(fe,{children:"Klicken wir in der linken Tabelle auf eine Bewertung: Sie wird zurückgehalten, und wir sehen, wie gut das Modell sie ohne diese Information trifft."}),e.jsx("div",{className:"mt-3 max-w-md",children:e.jsx(oe,{label:"Rang k",value:r,onChange:l=>i(Math.round(l)),min:1,max:4,step:1,fmt:l=>l.toFixed(0)})}),e.jsxs("div",{className:"my-2 flex flex-wrap items-center gap-2 text-sm",children:[e.jsx("span",{style:{color:ye},children:"Lücken füllen mit:"}),Object.keys(yn).map(l=>e.jsx("button",{type:"button",className:s===l?Fe:me,"aria-pressed":s===l,onClick:()=>a(l),children:yn[l]},l)),e.jsx("button",{type:"button",className:me,onClick:()=>u(Y.map(l=>l.map(()=>!1))),children:"alle Bewertungen zurückholen"})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap items-start justify-center gap-6",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsxs("p",{className:"mb-1 text-center text-sm font-medium",children:["Bewertungen ",e.jsx(n,{children:"\\bR"})," (",t," von ",ve*Ae," bekannt)"]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Me.map(l=>e.jsx(Rn,{children:l},l))]})}),e.jsx("tbody",{children:Y.map((l,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-right text-xs",style:{color:ye},children:pe[d]}),l.map((A,z)=>e.jsx("td",{className:"p-0",children:e.jsx("button",{type:"button",onClick:()=>N(d,z),disabled:A===null,"aria-pressed":A===null?void 0:h[d][z],"aria-label":A===null?`${pe[d]} hat ${Me[z]} nie bewertet`:`Bewertung ${A} von ${pe[d]} für ${Me[z]}, ${h[d][z]?"zurückgehalten":"wird verwendet"}`,title:A===null?"nie bewertet":h[d][z]?"zurückgehalten; klicken, um sie wieder zu verwenden":"klicken, um diese Bewertung zurückzuhalten",className:"h-9 w-20 border border-slate-300 text-center font-mono text-xs disabled:cursor-default dark:border-slate-600",style:{backgroundColor:o(d,z)?qn(A):"transparent",outline:h[d][z]?`2px dashed ${Mn}`:void 0,outlineOffset:"-3px"},children:o(d,z)?A.toFixed(0):"?"})},z))]},pe[d]))})]})})]}),e.jsxs("div",{className:"min-w-0",children:[e.jsxs("p",{className:"mb-1 text-center text-sm font-medium",children:["Rang-",r,"-Rekonstruktion ",e.jsx(n,{children:`\\bR_{${r}}`})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Me.map(l=>e.jsx(Rn,{children:l},l))]})}),e.jsx("tbody",{children:x.map((l,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pr-2 text-right text-xs",style:{color:ye},children:pe[d]}),l.map((A,z)=>e.jsx("td",{className:"h-9 w-20 border border-slate-300 text-center font-mono text-xs dark:border-slate-600",style:{backgroundColor:qn(A),outline:o(d,z)?void 0:`2px dashed ${ye}`,outlineOffset:"-3px"},children:he(A,1)},z))]},pe[d]))})]})}),e.jsx("p",{className:"mt-1 max-w-xs text-xs",style:{color:ye},children:"Gestrichelt umrandet sind die Felder, die das Modell selbst ergänzt hat."})]})]}),e.jsxs("div",{className:"mt-4 space-y-1 text-sm",children:[e.jsxs("p",{children:["Aufgefüllt haben wir mit ",zi[s],"; das Gesamtmittel aller bekannten Bewertungen liegt bei ",he(m),". Beispielhaft steht in der Lücke von ",pe[0]," bei „",Me[1],'" vor der Zerlegung ',he(b(0,1))," und nach der Rang-",r,"-Glättung ",he(x[0][1],1),"."]}),e.jsxs("p",{children:["Singulärwerte der aufgefüllten Matrix:"," ",e.jsx("span",{style:{color:Si},children:g.s.slice(0,4).map(l=>he(l)).join(", ")}),". Die ersten ",r," tragen ",Di(S)," der Energie; der Rang der aufgefüllten Matrix ist ",k,"."]}),e.jsxs("p",{children:["Wurzel der mittleren quadratischen Abweichung auf den ",_," verwendeten Bewertungen: ",he(p),"."," ",r>=4?"Bei k = 4 gibt die Zerlegung die aufgefüllte Matrix exakt zurück, samt der Mittelwerte, die wir selbst hineingeschrieben haben. Nützlich ist das nicht: Erst das Abschneiden macht aus dem Auffüllen eine Vorhersage.":"Kleines k glättet stark, großes k bildet auch die eigenen Füllwerte nach."]})]}),w.length>0?e.jsxs(I,{kind:w.every(l=>Math.abs(l.hut-l.wahr)<1)?"ok":"warn",titel:"Echter Test:",children:[e.jsx("ul",{className:"ml-4 list-disc space-y-0.5",children:w.map(l=>e.jsxs("li",{children:[pe[l.i]," bei „",Me[l.j],'": vorhergesagt ',he(l.hut,1),", tatsächlich"," ",l.wahr,", Abweichung"," ",e.jsx("span",{style:{color:Mn},children:he(Math.abs(l.hut-l.wahr),1)}),"."]},`${l.i}-${l.j}`))}),"Diese Felder hat das Modell nicht gesehen; alles andere in seiner Vorhersage stammt aus den übrigen Bewertungen und aus der Füllregel selbst (",O("bemerkung:staerken-schwaechen-ausblick"),")."]}):e.jsxs(I,{kind:"neutral",children:["Noch ist keine Bewertung zurückgehalten. Solange das Modell jede Zahl kennt, prüft der RMSE nur, wie gut es die eigenen Eingaben nachbaut, und wächst mit kleinerem"," ",e.jsx(n,{children:"k"})," allein deshalb."]})]})}function Vn(r){const i={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.p,{children:`Bisher war die SVD vor allem eine Aussage über die Geometrie einer Abbildung.
Jetzt wird sie zum Werkzeug, bis hin zur Bildkompression und zu
Empfehlungssystemen.`}),`
`,e.jsx(i.h3,{children:"Die Spektralnorm ist der größte Singulärwert"}),`
`,e.jsxs(i.p,{children:["Die ",e.jsx(c,{id:"matrix-norm",children:"Matrixnorm"})," ",e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2"}),` ist in
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),` als maximale Streckung
`,e.jsx(n,{children:"\\max_{\\left\\|\\bx\\right\\| = 1} \\left\\|\\bA\\bx\\right\\|"}),` definiert, und
`,e.jsx(c,{id:"env:spektralnorm-und-spektralzerlegung",href:"?k=03-matrix-spur-norm#env-spektralnorm-und-spektralzerlegung",children:"Satz 3.3.7"}),` hat sie dort zu
`,e.jsx(n,{children:"\\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}),` ausgerechnet. Nach
`,e.jsx(c,{id:"env:singulaerwerte",href:"#env-singulaerwerte",children:"Definition 6.2.4"}),` ist
`,e.jsx(n,{children:"\\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)} = \\sqrt{\\lambda_1} = \\corange{\\sigma_1}"}),`,
denn die Singulärwerte erben die absteigende Sortierung der Eigenwerte. Damit
gilt:`]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.4.1 (Spektralnorm und größter Singulärwert)",id:"env-spektralnorm-und-groesster-singulaerwert",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` mit Singulärwerten
`,e.jsx(n,{children:"\\corange{\\sigma_1} \\geq \\corange{\\sigma_2} \\geq \\cdots \\geq \\corange{\\sigma_n} \\geq 0"}),`.
Dann gilt`]}),e.jsx(X,{tag:"6.4.1",id:"eq-spektralnorm-und-groesster-singulaerwert",children:"\\left\\| \\bA \\right\\|_2 = \\corange{\\sigma_1} = \\corange{\\sigma_{\\max}}(\\bA) ."})]}),`
`,e.jsx(i.h3,{children:"Die SVD als Summe von Rang-1-Matrizen"}),`
`,e.jsxs(i.p,{children:["Multiplizieren wir ",e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"}),` aus,
so fallen fast alle Summanden weg, weil `,e.jsx(n,{children:"\\corange{\\bSigma}"}),` außerhalb der
Diagonalen nur Nullen trägt: Übrig bleibt für jeden von null verschiedenen
Singulärwert genau ein Term.`]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.4.2 (Summenform der SVD)",id:"env-summenform-der-svd",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),` und der Zerlegung
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"})," aus ",e.jsx(c,{id:"env:singulaerwertzerlegung",href:"#env-singulaerwertzerlegung",children:"Satz 6.2.13"}),`
(`,e.jsx(i.a,{href:"#sec-6.2",children:"Abschnitt 6.2"}),"). Dann gilt"]}),e.jsx(X,{tag:"6.4.2",id:"eq-summenform-der-svd",children:"\\bA = \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top ."}),e.jsxs(i.p,{children:["Jeder Summand ",e.jsx(n,{children:"\\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top \\in \\R^{m \\times n}"}),` hat
`,e.jsx(c,{id:"rank",children:"Rang"})," ",e.jsx(n,{children:"1"}),`, und in der Frobeniusnorm aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.1",children:"Abschnitt 3.1"})," gilt"]}),e.jsx(j,{children:"\\left\\| \\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top \\right\\|_F = 1 ."})]}),`
`,e.jsx(ee,{title:"Herleitung der Rang-1-Summenform",children:e.jsxs(be,{children:[e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\corange{\\Sigma_{ij}}"})," ist null, außer für ",e.jsx(n,{children:"i = j \\leq r"}),"; dort steht ",e.jsx(n,{children:"\\corange{\\sigma_i}"}),". Von der Doppelsumme bleibt also nur die Diagonale übrig"]}),children:[e.jsxs(i.p,{children:["Wir schreiben den Eintrag ",e.jsx(n,{children:"(a,b)"})," des Produkts aus:"]}),e.jsx(j,{children:`\\bigl(\\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}\\bigr)_{ab}
= \\sum_{i=1}^{m} \\sum_{j=1}^{n} \\cgreen{U_{ai}}\\, \\corange{\\Sigma_{ij}}\\, \\cblue{V_{bj}}
= \\sum_{i=1}^{r} \\corange{\\sigma_i}\\, \\cgreen{U_{ai}}\\, \\cblue{V_{bi}} .`})]}),e.jsx($,{why:e.jsxs(e.Fragment,{children:["das ",e.jsx(c,{id:"outer-product",children:"äußere Produkt"})," ",e.jsx(n,{children:"\\bx\\by^\\top"})," hat an der Stelle ",e.jsx(n,{children:"(a,b)"})," den Eintrag ",e.jsx(n,{children:"x_a y_b"}),"; hier ist ",e.jsx(n,{children:"\\cgreen{\\bu_i}"})," die ",e.jsx(n,{children:"i"}),"-te Spalte von ",e.jsx(n,{children:"\\cgreen{\\bU}"})," und ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," die ",e.jsx(n,{children:"i"}),"-te Spalte von ",e.jsx(n,{children:"\\cblue{\\bV}"})]}),children:e.jsxs(i.p,{children:["Die rechte Seite ist genau der Eintrag ",e.jsx(n,{children:"(a,b)"}),` von
`,e.jsx(n,{children:"\\sum_{i=1}^{r} \\corange{\\sigma_i} \\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top"}),`, denn
`,e.jsx(n,{children:"\\bigl(\\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top\\bigr)_{ab} = \\cgreen{U_{ai}} \\cblue{V_{bi}}"}),`.
Da die Einträge übereinstimmen, stimmen die Matrizen überein, und `,e.jsx(i.a,{href:"#eq-summenform-der-svd",children:"(6.4.2)"}),` ist
gezeigt.`]})}),e.jsxs($,{why:e.jsxs(e.Fragment,{children:[e.jsx(n,{children:"\\cgreen{\\bu_i}"})," und ",e.jsx(n,{children:"\\cblue{\\bv_i}"})," sind Spalten von Orthogonalmatrizen, haben also Länge ",e.jsx(n,{children:"1"})," und sind insbesondere nicht der Nullvektor; in der Doppelsumme hängt ",e.jsx(n,{children:"\\cgreen{U_{ai}}^2"})," nicht von ",e.jsx(n,{children:"b"})," und ",e.jsx(n,{children:"\\cblue{V_{bi}}^2"})," nicht von ",e.jsx(n,{children:"a"})," ab, beide Klammern sind quadrierte Längen von Einheitsvektoren"]}),children:[e.jsxs(i.p,{children:[`Zu den beiden Zusatzaussagen: Jede Spalte von
`,e.jsx(n,{children:"\\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top"})," ist ein Vielfaches von ",e.jsx(n,{children:"\\cgreen{\\bu_i}"}),`,
der Spaltenraum also eindimensional und der Rang damit `,e.jsx(n,{children:"1"}),`; und für die
Frobeniusnorm faktorisiert die Doppelsumme:`]}),e.jsx(j,{children:`\\left\\| \\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top \\right\\|_F^2
= \\Bigl(\\sum_{a=1}^{m} \\cgreen{U_{ai}}^2\\Bigr) \\Bigl(\\sum_{b=1}^{n} \\cblue{V_{bi}}^2\\Bigr)
= 1 \\cdot 1 = 1 .`})]})]})}),`
`,e.jsxs(i.p,{children:["Die Summenform ist die ",e.jsx(c,{id:"env:reduzierte-svd",children:"reduzierte SVD"}),`
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}"}),` aus
`,e.jsx(i.a,{href:"#sec-6.3",children:"Abschnitt 6.3"}),`, als Summe statt als Produkt geschrieben. Sie zeigt aber,
was im Produkt versteckt bleibt: `,e.jsx(n,{children:"\\bA"})," ist eine gewichtete Summe von ",e.jsx(n,{children:"r"}),`
Bausteinen, die in der Frobeniusnorm alle gleich groß sind. Was sie
unterscheidet, sind allein die Gewichte `,e.jsx(n,{children:"\\corange{\\sigma_i}"}),`: Ein großes
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),` markiert eine wichtige Richtung, ein kleines eine
unwichtige. Weil die Singulärwerte absteigend sortiert sind, stehen die
wichtigen Terme vorn. Das legt nahe, nur die ersten Summanden zu behalten.`]}),`
`,e.jsx(i.h3,{children:"Die beste Approximation von kleinem Rang"}),`
`,e.jsxs(M,{kind:"Definition",label:"6.4.3 (Rang-k-Approximation)",id:"env-rang-k-approximation",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," mit ",e.jsx(n,{children:"\\rang(\\bA) = r"}),` und der Summenform
`,e.jsx(i.a,{href:"#eq-summenform-der-svd",children:"(6.4.2)"}),". Für ",e.jsx(n,{children:"k \\leq r"})," heißt"]}),e.jsx(X,{tag:"6.4.3",id:"eq-rang-k-approximation",children:"\\bA_k = \\sum_{i=1}^{k} \\corange{\\sigma_i}\\, \\cgreen{\\bu_i} \\cblue{\\bv_i}^\\top"}),e.jsxs(i.p,{children:["die ",e.jsx(i.em,{children:"Rang-k-Approximation"})," (",e.jsx(c,{id:"low-rank-approximation",children:"low-rank approximation"}),`)
von `,e.jsx(n,{children:"\\bA"}),". Für ",e.jsx(n,{children:"k \\geq 1"})," hat sie tatsächlich Rang ",e.jsx(n,{children:"k"}),", denn wegen ",e.jsx(n,{children:"k \\leq r"}),`
sind alle beteiligten `,e.jsx(n,{children:"\\corange{\\sigma_i}"})," positiv und die ",e.jsx(n,{children:"\\cgreen{\\bu_i}"}),`
orthonormal.`]}),e.jsxs(i.p,{children:["Wie in ",e.jsx(i.a,{href:"#sec-6.3",children:"Abschnitt 6.3"}),` lässt sich die Summe wieder zu einem Produkt
zusammenfassen: Mit den ersten `,e.jsx(n,{children:"k"})," Spalten ",e.jsx(n,{children:"\\cgreen{\\bU_k}"})," von ",e.jsx(n,{children:"\\cgreen{\\bU}"}),`,
den ersten `,e.jsx(n,{children:"k"})," Spalten ",e.jsx(n,{children:"\\cblue{\\bV_k}"})," von ",e.jsx(n,{children:"\\cblue{\\bV}"}),` und
`,e.jsx(n,{children:"\\corange{\\bSigma_k} = \\diag(\\corange{\\sigma_1}, \\dots, \\corange{\\sigma_k})"}),`
ist gleichbedeutend`]}),e.jsx(j,{children:"\\bA_k = \\cgreen{\\bU_k}\\,\\corange{\\bSigma_k}\\,\\cblue{\\bV_k^\\top} ."})]}),`
`,e.jsxs(i.p,{children:["Was verlieren wir beim Abschneiden, und könnte eine andere Matrix vom Rang ",e.jsx(n,{children:"k"}),`
es besser? Auf beide Fragen gibt derselbe Satz Antwort.`]}),`
`,e.jsxs(M,{kind:"Satz",label:"6.4.4 (Eckart und Young: beste Approximation von Rang k)",id:"env-eckart-und-young-beste-approximation-von",children:[e.jsxs(i.p,{children:["Sei ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` mit Singulärwerten
`,e.jsx(n,{children:"\\corange{\\sigma_1} \\geq \\cdots \\geq \\corange{\\sigma_r} > 0"})," und sei ",e.jsx(n,{children:"k < r"}),`.
Dann löst `,e.jsx(n,{children:"\\bA_k"})," aus ",e.jsx(i.a,{href:"#eq-rang-k-approximation",children:"(6.4.3)"})," beide Approximationsprobleme"]}),e.jsx(j,{children:`\\min_{\\substack{\\bB \\in \\R^{m \\times n} \\\\ \\rang(\\bB) \\leq k}} \\left\\| \\bA - \\bB \\right\\|_F
\\qquad\\text{und}\\qquad
\\min_{\\substack{\\bB \\in \\R^{m \\times n} \\\\ \\rang(\\bB) \\leq k}} \\left\\| \\bA - \\bB \\right\\|_2 ,`}),e.jsx(i.p,{children:"und die zugehörigen Fehler sind"}),e.jsx(X,{tag:"6.4.4",id:"eq-eckart-und-young-beste-approximation-von",children:`\\cred{\\left\\| \\bA - \\bA_k \\right\\|_F} = \\sqrt{\\sum_{i=k+1}^{r} \\corange{\\sigma_i}^2} ,
\\qquad
\\cred{\\left\\| \\bA - \\bA_k \\right\\|_2} = \\corange{\\sigma_{k+1}} .`})]}),`
`,e.jsx(i.p,{children:`Den Beweis lassen wir aus (vgl. Heath §3.6; MML §4.6). Eckart und Young (1936)
haben den Fall der Frobeniusnorm behandelt, die Aussage für die Spektralnorm
geht auf Mirsky (1960) zurück.`}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.4.5 (Was der Satz liefert und was nicht)",id:"env-was-der-satz-liefert-und-was-nicht",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Der Fehler steht in den weggeworfenen Singulärwerten."}),` In der
Spektralnorm ist es der größte weggelassene Wert `,e.jsx(n,{children:"\\corange{\\sigma_{k+1}}"}),`,
in der Frobeniusnorm die Wurzel aus der Summe aller weggelassenen Quadrate.
Wir kennen den Approximationsfehler also, bevor wir approximieren.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Beide Normen führen zum selben Minimierer."}),` Selbstverständlich ist das
nicht, denn zwei verschiedene Gütemaße haben im Allgemeinen verschiedene
Optima.`]}),`
`,e.jsxs(i.li,{children:[e.jsxs(i.strong,{children:["Der Satz sagt, dass ",e.jsx(n,{children:"\\bA_k"}),` das Minimum annimmt, nicht dass es der einzige
Minimierer ist.`]})," In der Frobeniusnorm ist ",e.jsx(n,{children:"\\bA_k"}),` eindeutig, solange
`,e.jsx(n,{children:"\\corange{\\sigma_k} > \\corange{\\sigma_{k+1}}"}),` gilt; bei Gleichheit gibt es
mehrere. In der Spektralnorm ist die Lage anders. Für
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 3 & 0 \\\\ 0 & 2 \\end{smallmatrix}\\bigr)"}),` und
`,e.jsx(n,{children:"k = 1"}),` etwa hat jede Matrix
`,e.jsx(n,{children:"\\bB = \\bigl(\\begin{smallmatrix} b & 0 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` mit
`,e.jsx(n,{children:"b \\in [1, 5]"}),` den Fehler
`,e.jsx(n,{children:"\\cred{\\left\\| \\bA - \\bB \\right\\|_2} = \\max(|3 - b|, 2) = 2 = \\corange{\\sigma_2}"}),`.
`,e.jsx(n,{children:"\\bA_1"})," ist also ",e.jsx(i.em,{children:"eine"})," beste Approximation, nicht ",e.jsx(i.em,{children:"die"}),`. In der
Frobeniusnorm ist dagegen nur `,e.jsx(n,{children:"b = 3"}),` optimal, denn dort beträgt der Fehler
`,e.jsx(n,{children:"\\sqrt{(3 - b)^2 + 2^2}"}),"."]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Wie wählen wir k?"}),`
`,e.jsxs(i.p,{children:["Der Satz von Eckart und Young sagt, wie gut jedes ",e.jsx(n,{children:"k"}),` ist, aber nicht, welches
wir nehmen sollen. Die Wahl ist ein Kompromiss zwischen Genauigkeit und
Aufwand; drei Kriterien sind gebräuchlich.`]}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.4.6 (Drei Kriterien für die Wahl von k)",id:"env-drei-kriterien-fuer-die-wahl-von-k",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Relativer Fehler in der Spektralnorm."})," Aus ",e.jsx(i.a,{href:"#eq-eckart-und-young-beste-approximation-von",children:"(6.4.4)"})," folgt"]}),`
`,e.jsx(j,{children:`\\frac{\\cred{\\left\\| \\bA - \\bA_k \\right\\|_2}}{\\left\\| \\bA \\right\\|_2}
= \\frac{\\corange{\\sigma_{k+1}}}{\\corange{\\sigma_1}} ,`}),`
`,e.jsxs(i.p,{children:["denn der Nenner ist nach ",e.jsx(c,{id:"env:spektralnorm-und-groesster-singulaerwert",href:"#env-spektralnorm-und-groesster-singulaerwert",children:"Satz 6.4.1"})," gerade ",e.jsx(n,{children:"\\corange{\\sigma_1}"}),`. Wir wählen
das kleinste `,e.jsx(n,{children:"k"}),", für das dieser Quotient unter einer Schranke bleibt."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Relativer Fehler in der Frobeniusnorm."}),` Mit derselben Rechnung und der
Identität `,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_F = \\sqrt{\\sum_i \\corange{\\sigma_i}^2}"}),`
aus `,e.jsx(c,{id:"env:spezialfaelle-der-schatten-p-norm",href:"?k=03-matrix-spur-norm#env-spezialfaelle-der-schatten-p-norm",children:"Korollar 3.4.4"})," ist"]}),`
`,e.jsx(j,{children:`\\frac{\\cred{\\left\\| \\bA - \\bA_k \\right\\|_F}}{\\left\\| \\bA \\right\\|_F}
= \\frac{\\sqrt{\\sum_{i=k+1}^{r} \\corange{\\sigma_i}^2}}{\\sqrt{\\sum_{i=1}^{r} \\corange{\\sigma_i}^2}} .`}),`
`,e.jsx(i.p,{children:"Dieses Maß nimmt alle Richtungen zusammen, das erste nur die schlechteste."}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.em,{children:"Energiekriterium."}),` Statt den Fehler zu beschränken, verlangen wir einen
Mindestanteil an erklärter „Energie":`]}),`
`,e.jsx(j,{children:"\\frac{\\sum_{i=1}^{k} \\corange{\\sigma_i}^2}{\\sum_{i=1}^{r} \\corange{\\sigma_i}^2} \\geq p ,"}),`
`,e.jsxs(i.p,{children:["üblich sind ",e.jsx(n,{children:"p = 0{,}9"})," oder ",e.jsx(n,{children:"p = 0{,}99"}),`. Das ist nur eine Umformulierung
von Kriterium 2, denn die linke Seite ist `,e.jsx(n,{children:"1"}),` minus dem Quadrat des
relativen Frobeniusfehlers.`]}),`
`]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Kriterium 3 hat eine Schwäche: Wenn ",e.jsx(n,{children:"\\corange{\\sigma_1}"}),` die übrigen
Singulärwerte weit überragt, ist der Energieanteil schon bei `,e.jsx(n,{children:"k = 1"}),` nahe bei
eins, obwohl die Approximation noch grob ist. Als alleiniges Kriterium taugt es
deshalb wenig.`]}),`
`,e.jsxs(i.p,{children:["In der Praxis wählt man ",e.jsx(n,{children:"k"})," oft am ",e.jsx(i.em,{children:"Ellenbogen"}),` (elbow): Tragen wir
`,e.jsx(n,{children:"\\log \\corange{\\sigma_i}"})," gegen ",e.jsx(n,{children:"i"}),` auf, so ist das die Stelle, an der die
Singulärwerte abknicken und die Kurve flach wird.`]}),`
`,e.jsxs(ee,{title:"Typische Singulärwert-Verläufe",children:[e.jsxs(M,{kind:"Bemerkung",label:"6.4.7 (Typische Singulärwert-Verläufe)",id:"env-typische-singulaerwert-verlaeufe-und-der",children:[e.jsx(i.p,{children:`Wie gut sich eine Matrix überhaupt komprimieren lässt, steht im Verlauf ihrer
Singulärwerte. Drei Muster begegnen uns immer wieder:`}),e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Schneller Abfall"}),", etwa ",e.jsx(n,{children:"\\corange{\\sigma_i} \\approx c \\cdot e^{-\\alpha i}"}),`.
Wenige Werte dominieren, der Rest ist vernachlässigbar. Solche Matrizen sind
der ideale Fall für eine Rang-k-Approximation.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Linearer Abfall"}),", ",e.jsx(n,{children:"\\corange{\\sigma_i} \\approx c - \\alpha i"}),`. Die
Approximation gelingt noch ordentlich, der Kompressionsfaktor bleibt aber
mittelmäßig.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Langsamer Abfall"}),", ",e.jsx(n,{children:"\\corange{\\sigma_i} \\approx c \\cdot i^{-\\alpha}"}),`. Viele
Komponenten tragen ähnlich viel bei; ein kleines `,e.jsx(n,{children:"k"}),` verliert dann
zwangsläufig viel Information.`]}),`
`]}),e.jsxs(i.p,{children:["In der Auftragung von ",e.jsx(n,{children:"\\log \\corange{\\sigma_i}"})," gegen ",e.jsx(n,{children:"i"}),` wird ein
exponentieller Abfall zur Geraden. Der Ellenbogen trennt die Richtungen, in
denen Struktur steckt, von denen, in denen nur noch Rauschen sitzt, und liefert
einen Startwert für `,e.jsx(n,{children:"k"}),`. Eine Garantie ist das nicht; manche Spektren haben
keinen Ellenbogen.`]})]}),e.jsx(Re,{children:e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:[`Ein Spektrum mit langsam abfallenden Singulärwerten,
`,e.jsx(n,{children:"\\corange{\\sigma_i} \\approx c \\cdot i^{-\\alpha}"}),`, eignet sich besonders gut für
eine Rang-k-Approximation.`]}),e.jsxs(i.p,{children:[`Es ist der ungünstigste Fall: Viele Komponenten
tragen ähnlich viel bei, der Fehler `,e.jsx(n,{children:"\\sqrt{\\sum_{i>k} \\corange{\\sigma_i}^2}"}),`
sinkt entsprechend langsam, und ein kleines `,e.jsx(n,{children:"k"}),` verliert echte Struktur. Gut
komprimieren lässt sich der exponentielle Abfall.`]})]})})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Datenkompression"}),`
`,e.jsx(i.p,{children:`Ein Graustufenbild ist eine Matrix: Jeder Pixel ist ein Eintrag, seine
Helligkeit der Wert. Farbbilder bestehen aus drei solchen Matrizen, einer pro
Kanal.`}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.4.8 (Ein Bild mit 659 × 512 Pixeln)",id:"env-ein-bild-mit-659-512-pixeln",children:[e.jsxs(i.p,{children:["Das Bild sei ",e.jsx(n,{children:"\\bA \\in \\R^{659 \\times 512}"}),". Vollständig gespeichert sind das"]}),e.jsx(j,{children:"659 \\cdot 512 = 337\\,408 \\text{ Zahlen (pro Kanal)} ."}),e.jsxs(i.p,{children:["Für die Rang-50-Approximation brauchen wir dagegen nur die ersten ",e.jsx(n,{children:"50"}),` Spalten
von `,e.jsx(n,{children:"\\cgreen{\\bU}"}),", die ersten ",e.jsx(n,{children:"50"})," Singulärwerte und die ersten ",e.jsx(n,{children:"50"}),` Spalten
von `,e.jsx(n,{children:"\\cblue{\\bV}"}),":"]}),e.jsx(j,{children:`\\underbrace{659 \\cdot 50}_{\\cgreen{\\bU_{50}}}
+ \\underbrace{50}_{\\corange{\\bSigma_{50}}}
+ \\underbrace{50 \\cdot 512}_{\\cblue{\\bV_{50}}}
= 32\\,950 + 50 + 25\\,600 = 58\\,600 .`}),e.jsxs(i.p,{children:["Das sind ",e.jsx(n,{children:"58\\,600 / 337\\,408 \\approx 17{,}4\\,\\%"}),` des Originals, wir sparen also
rund `,e.jsx(n,{children:"83\\,\\%"})," des Speichers."]}),e.jsxs(i.p,{children:["Der Speicherbedarf ",e.jsx(n,{children:"k \\cdot (659 + 512 + 1)"})," wächst linear in ",e.jsx(n,{children:"k"}),` und
übersteigt ab `,e.jsx(n,{children:"k = 288"})," die ",e.jsx(n,{children:"337\\,408"}),` Zahlen des Bildes selbst. Kompression
gibt es hier nur für `,e.jsx(n,{children:"k \\leq 287"}),"."]})]}),`
`,e.jsx(M,{kind:"Algorithmus",label:"6.4.9 (Kompression mit der SVD)",id:"env-kompression-mit-der-svd",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Berechne die SVD ",e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"}),"."]}),`
`,e.jsxs(i.li,{children:["Wähle ",e.jsx(n,{children:"k"})," anhand der Kriterien aus ",e.jsx(i.a,{href:"#env-drei-kriterien-fuer-die-wahl-von-k",children:"Bemerkung 6.4.6"}),"."]}),`
`,e.jsxs(i.li,{children:[`Bilde die Approximation
`,e.jsx(n,{children:"\\bA_k = \\cgreen{\\bU_k}\\corange{\\bSigma_k}\\cblue{\\bV_k^\\top}"}),"."]}),`
`,e.jsxs(i.li,{children:["Speichere nur ",e.jsx(n,{children:"\\cgreen{\\bU_k}"}),", ",e.jsx(n,{children:"\\corange{\\bSigma_k}"})," und ",e.jsx(n,{children:"\\cblue{\\bV_k}"}),`;
das Bild wird bei Bedarf daraus zurückgerechnet.`]}),`
`]})}),`
`,e.jsxs(we,{title:"Bildkompression mit der Rang-k-Approximation",children:[e.jsxs(i.p,{children:[`Wie viele Rang-1-Terme braucht ein Bild? Wir probieren es an einem synthetisch
erzeugten Graustufenbild aus. Der Schieber gibt `,e.jsx(n,{children:"k"}),` vor, die dritte Tafel zeigt
die Differenz `,e.jsx(n,{children:"\\cred{\\bA - \\bA_k}"}),` als Bild, und die beiden Kurven sind die
Fehlerformeln aus `,e.jsx(i.a,{href:"#eq-eckart-und-young-beste-approximation-von",children:"(6.4.4)"}),`, an diesem Bild
ausgewertet.`]}),e.jsx(_i,{}),e.jsxs(i.p,{children:["Mit wachsendem ",e.jsx(n,{children:"k"}),` sinken beide Fehler. Die ersten Terme geben die
großflächigen Helligkeiten wieder, die feinen Kanten stecken in den Termen mit
kleinem `,e.jsx(n,{children:"\\corange{\\sigma_i}"}),"."]}),e.jsxs(i.p,{children:[`Für echte Fotos gibt es unter
`,e.jsx(i.a,{href:"https://fabian-s.shinyapps.io/truncatedSVD-shiny/",children:"shinyapps.io"}),` eine Shiny-App
zur abgeschnittenen SVD.`]})]}),`
`,e.jsx(i.h3,{children:"Anwendung: Empfehlungssysteme"}),`
`,e.jsxs(i.p,{children:["Die zweite Anwendung ist das ",e.jsx(i.em,{children:"kollaborative Filtern"}),` (collaborative filtering).
Ein Streamingdienst kennt `,e.jsx(n,{children:"m"})," Nutzer und ",e.jsx(n,{children:"n"}),` Filme und will für jedes Paar
vorhersagen, wie gut der Film ankommt. Die Bewertungen bilden eine Matrix, in
der die meisten Einträge fehlen: Fast niemand hat fast alles gesehen.`]}),`
`,e.jsxs(M,{kind:"Beispiel",label:"6.4.10 (Eine dünn besetzte Bewertungsmatrix)",id:"env-eine-duenn-besetzte-bewertungsmatrix",children:[e.jsx(i.p,{children:`Zeilen sind Nutzer, Spalten sind Filme, ein Fragezeichen steht für eine
fehlende Bewertung:`}),e.jsx(j,{children:`\\bR = \\begin{pmatrix}
5 & ? & 1 & ? & 4 \\\\
? & 3 & ? & 4 & ? \\\\
2 & 1 & ? & ? & 5 \\\\
? & 5 & 4 & 3 & ?
\\end{pmatrix} \\in \\R^{m \\times n} .`}),e.jsxs(i.p,{children:["Hier sind ",e.jsx(n,{children:"m = 4"})," und ",e.jsx(n,{children:"n = 5"}),", und von ",e.jsx(n,{children:"20"})," möglichen Einträgen sind ",e.jsx(n,{children:"11"}),`
bekannt. In der Praxis ist die Matrix noch weit
`,e.jsx(c,{id:"sparse-matrix",children:"dünner besetzt"}),`: Millionen von Nutzern, Hunderttausende von
Titeln, und pro Zeile eine Handvoll Bewertungen.`]}),e.jsxs(i.p,{children:[`Füllen wir die Lücken mit den Spaltenmitteln der bekannten Einträge, so sind
das der Reihe nach `,e.jsx(n,{children:"3{,}5"}),", ",e.jsx(n,{children:"3"}),", ",e.jsx(n,{children:"2{,}5"}),", ",e.jsx(n,{children:"3{,}5"})," und ",e.jsx(n,{children:"4{,}5"}),"."]})]}),`
`,e.jsx(i.p,{children:`Eine Zerlegung hilft, weil Geschmack Struktur hat: Wer zwei
Science-Fiction-Filme mag, mag wahrscheinlich auch den dritten. Die Vorlieben
von Millionen Nutzern lassen sich deshalb durch wenige Größen wie Genres und
Nutzertypen beschreiben, die Bewertungsmatrix ist also näherungsweise von
kleinem Rang.`}),`
`,e.jsx(M,{kind:"Algorithmus",label:"6.4.11 (Empfehlungen über eine Rang-k-Approximation)",id:"env-empfehlungen-ueber-eine-rang-k",children:e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:`Ergänze die fehlenden Einträge grob, etwa durch die Spaltenmittel der
bekannten Bewertungen.`}),`
`,e.jsxs(i.li,{children:[`Berechne von der aufgefüllten Matrix die Rang-k-Approximation
`,e.jsx(n,{children:"\\bR_k = \\cgreen{\\bU_k}\\corange{\\bSigma_k}\\cblue{\\bV_k^\\top}"}),"."]}),`
`,e.jsxs(i.li,{children:["Lies die Vorhersagen an den zuvor fehlenden Stellen von ",e.jsx(n,{children:"\\bR_k"})," ab."]}),`
`]})}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.4.12 (Was die Faktoren bedeuten)",id:"env-was-die-faktoren-bedeuten",children:[e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"rechten"})," ",e.jsx(c,{id:"env:rechte-und-linke-singulaervektoren",children:"Singulärvektoren"})," ",e.jsx(n,{children:"\\cblue{\\bv_j} \\in \\R^n"}),` leben im Filmraum.
Sie sind gelernte Genres: `,e.jsx(n,{children:"\\cblue{\\bv_1}"}),` könnte eine Achse von Action nach
Drama beschreiben, `,e.jsx(n,{children:"\\cblue{\\bv_2}"}),` eine von Komödie nach Thriller. Diese
Achsen hat niemand vorgegeben, sie fallen aus den Daten.`]}),`
`,e.jsxs(i.li,{children:["Die ",e.jsx(i.em,{children:"linken"})," Singulärvektoren ",e.jsx(n,{children:"\\cgreen{\\bu_i} \\in \\R^m"}),` leben im Nutzerraum
und geben an, wie stark die einzelnen Nutzer auf diese Genre-Achsen
ansprechen.`]}),`
`,e.jsxs(i.li,{children:["Die Singulärwerte ",e.jsx(n,{children:"\\corange{\\sigma_i}"}),` gewichten, wie viel eine Achse
überhaupt erklärt.`]}),`
`]}),e.jsxs(i.p,{children:[`Eine Vorhersage ist damit ein gewichtetes Skalarprodukt aus Nutzerprofil und
Filmprofil, summiert über die ersten `,e.jsx(n,{children:"k"}),` Achsen mit den Gewichten
`,e.jsx(n,{children:"\\corange{\\sigma_i}"}),"."]})]}),`
`,e.jsxs(we,{title:"Rang-k-Glättung einer Bewertungsmatrix",children:[e.jsxs(i.p,{children:[`Wie gut trifft dieses Verfahren eine Bewertung, die es nicht kennt? Das Widget
rechnet `,e.jsx(i.a,{href:"#env-eine-duenn-besetzte-bewertungsmatrix",children:"Beispiel 6.4.10"}),` durch und lässt uns eine bekannte Bewertung
zurückhalten; sie wird damit zur Testgröße. Der Vergleich der drei Auffüllregeln
zeigt zusätzlich, wie stark die Vorhersage an Schritt 1 von `,e.jsx(i.a,{href:"#env-empfehlungen-ueber-eine-rang-k",children:"Algorithmus 6.4.11"}),`
hängt.`]}),e.jsx(Mi,{}),e.jsxs(i.p,{children:[`Die Vorhersage hängt stark an der Auffüllregel, und das hat einen Grund:
Schritt 1 erfindet Daten, und Schritt 2 behandelt diese Erfindungen wie
Messwerte. Denn `,e.jsx(n,{children:"\\bR_k"}),` minimiert nach
`,e.jsx(c,{id:"env:eckart-und-young-beste-approximation-von",href:"#env-eckart-und-young-beste-approximation-von",children:"Satz 6.4.4"})," den Fehler über ",e.jsx(i.em,{children:"alle"}),` Einträge,
also auch über die selbst gesetzten Mittelwerte.`]})]}),`
`,e.jsx(ee,{title:"Stärken, Schwächen und neuere Verfahren",children:e.jsxs(M,{kind:"Bemerkung",label:"6.4.13 (Stärken, Schwächen, Ausblick)",id:"env-staerken-schwaechen-ausblick",children:[e.jsx(i.p,{children:"Für den Ansatz spricht einiges:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Speicher."})," Statt ",e.jsx(n,{children:"m \\cdot n"})," Zahlen genügen ",e.jsx(n,{children:"(m + n) \\cdot k + k"}),`, und für
`,e.jsx(n,{children:"k \\ll \\min(m,n)"})," ist das viel weniger."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Glättung."})," Das Abschneiden wirkt als ",e.jsx(i.em,{children:"Regularisierung"}),`: Die
Rang-k-Approximation kann den Zufall in einzelnen Bewertungen gar nicht
nachbilden, weil ihr die Freiheitsgrade fehlen.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Robustheit gegen Lücken."}),` Auch bei sehr spärlichen Daten kann das
Verfahren brauchbare Schätzungen liefern, solange die zugrunde liegende
Struktur wirklich niedrigdimensional ist.`]}),`
`]}),e.jsxs(i.p,{children:[`Gegen ihn spricht der Einwand oben, und neuere Verfahren umgehen ihn: Unter
dem Stichwort `,e.jsx(i.em,{children:"Matrix Completion"}),` sucht man direkt eine Faktorisierung von
kleinem Rang, die nur an den beobachteten Stellen gut passt; mit der
Nebenbedingung, dass alle Faktoren nichtnegativ sind, heißt das
nichtnegative Matrixfaktorisierung (NMF).`]})]})}),`
`,e.jsx(i.h3,{children:"Wann lohnt sich die SVD?"}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.4.14 (Ideale Situationen für die SVD)",id:"env-ideale-situationen-fuer-die-svd",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Niedrig-Rang-Strukturen:"})," ",e.jsx(n,{children:"\\rang(\\bA) \\ll \\min(m,n)"}),`, oder wenigstens
näherungsweise.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Schnell abfallende Singulärwerte:"})," wenige Richtungen dominieren."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Überbestimmte Systeme:"})," ",e.jsx(n,{children:"m > n"}),` und womöglich inkonsistent, wie bei
`,e.jsx(c,{id:"linear-least-squares",children:"Kleinste-Quadrate-Problemen"}),`
(`,e.jsx(i.a,{href:"?k=07-kq",children:"Kapitel 7"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Datenanalyse:"}),` Die Hauptkomponentenanalyse (PCA) lässt sich direkt aus der
SVD der zentrierten Datenmatrix `,e.jsx(n,{children:"\\bX"}),` ablesen, ohne dass wir das
Kreuzprodukt `,e.jsx(n,{children:"\\bX^\\top\\bX"}),` je aufstellen müssen. Dieses Kreuzprodukt ist bis
auf einen Faktor die empirische
`,e.jsx(c,{id:"covariance-matrix",children:"Kovarianzmatrix"}),`; ausgeführt wird die PCA in
`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.2",children:"Abschnitt 8.2"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Numerische Robustheit:"}),` als Alternative zu den
`,e.jsx(c,{id:"normal-equations",children:"Normalgleichungen"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-7.3",children:"Abschnitt 7.3"}),")."]}),`
`]})}),`
`,e.jsxs(i.p,{children:["Punkt 4 und Punkt 5 haben denselben Kern. Das Produkt ",e.jsx(n,{children:"\\bX^\\top\\bX"}),` zu bilden
kostet Genauigkeit, denn es quadriert die
`,e.jsx(c,{id:"condition-number",children:"Konditionszahl"}),`
(`,e.jsx(i.a,{href:"?k=07-kq#sec-effizient-aber-moeglicherweise-instabil",children:"Abschnitt 7.3.3"}),`). Die SVD arbeitet direkt an
`,e.jsx(n,{children:"\\bX"})," und vermeidet diesen Schritt."]}),`
`,e.jsxs(M,{kind:"Bemerkung",label:"6.4.15 (Rechenaufwand)",id:"env-rechenaufwand",children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),` gilt in der
`,e.jsx(c,{id:"big-o-notation",children:"Landau-Notation"}),`
(`,e.jsx(i.a,{href:"?k=02-algos#sec-2.4",children:"Abschnitt 2.4"}),"):"]}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"SVD:"})," ",e.jsx(n,{children:"O(\\min(m^2 n,\\, m n^2))"}),"; für ",e.jsx(n,{children:"m \\gg n"})," sind das rund ",e.jsx(n,{children:"4 m n^2"}),`
Operationen.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Normalgleichungen:"})," ",e.jsx(n,{children:"O(m n^2 + n^3)"}),"; für ",e.jsx(n,{children:"m \\gg n"}),` dominiert der Aufbau von
`,e.jsx(n,{children:"\\bA^\\top\\bA"})," mit rund ",e.jsx(n,{children:"m n^2"})," Operationen."]}),`
`]}),e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"m \\gg n"}),` ist die SVD also grob viermal so teuer. Das ist der übliche
Kompromiss: Geschwindigkeit gegen Stabilität. Bei schlecht konditionierten
Daten lohnt sich der Faktor.`]})]}),`
`,e.jsx(i.h3,{children:"SVD und Eigenwertzerlegung im Vergleich"}),`
`,e.jsxs(i.p,{children:[`In der Tabelle meint „Eigenwertzerlegung" die Zerlegung
`,e.jsx(n,{children:"\\bA = \\bP\\bD\\bP^{-1}"})," mit beliebigem invertierbarem ",e.jsx(n,{children:"\\bP"}),`; erst im
symmetrischen Fall wird daraus die Spektralzerlegung mit orthogonalem `,e.jsx(n,{children:"\\bP"}),` aus
`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),"."]}),`
`,e.jsxs("table",{className:"text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-300 text-left dark:border-slate-600",children:[e.jsx("th",{className:"py-1 pr-6",children:"Eigenschaft"}),e.jsx("th",{className:"py-1 pr-6",children:"Eigenwertzerlegung"}),e.jsx("th",{className:"py-1",children:"SVD"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Matrixtyp"}),e.jsx("td",{className:"py-1 pr-6",children:"quadratisch"}),e.jsxs("td",{className:"py-1",children:["beliebig, ",e.jsx(n,{children:"m \\times n"})]})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"orthogonale Faktoren"}),e.jsxs("td",{className:"py-1 pr-6",children:["nur für ",e.jsx(c,{id:"symmetric-matrix",children:"symmetrische"})," Matrizen"]}),e.jsx("td",{className:"py-1",children:"immer"})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"numerische Stabilität"}),e.jsx("td",{className:"py-1 pr-6",children:"kann problematisch sein"}),e.jsx("td",{className:"py-1",children:"stabil"})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"Existenz"}),e.jsx("td",{className:"py-1 pr-6",children:"nur für diagonalisierbare Matrizen"}),e.jsxs("td",{className:"py-1",children:["immer, auch für singuläre; ",e.jsx(n,{children:"\\corange{\\sigma_i} = 0"})," zeigt den Rangabfall an"]})]}),e.jsxs("tr",{className:"border-b border-slate-200 dark:border-slate-700",children:[e.jsx("td",{className:"py-1 pr-6",children:"geometrische Deutung"}),e.jsx("td",{className:"py-1 pr-6",children:"Hauptachsen (im symmetrischen Fall)"}),e.jsx("td",{className:"py-1",children:"optimale Koordinaten in Urbild und Bild"})]})]})]}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(Ve,{loesung:98.59,toleranz:.2,children:[e.jsxs(i.p,{children:["Stellen wir im Rang-k-Explorer oben ",e.jsx(n,{children:"k = 2"}),` ein. Wie viel Prozent der Energie
`,e.jsx(n,{children:"\\sum_i \\corange{\\sigma_i}^2"})," stecken dann schon in ",e.jsx(n,{children:"\\bA_2"}),"?"]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"98{,}59\\,\\%"}),`. Die ersten beiden Singulärwerte des Testbilds sind
`,e.jsx(n,{children:"\\corange{26{,}475}"})," und ",e.jsx(n,{children:"\\corange{6{,}060}"}),`, alle übrigen zusammen tragen nur
noch den Rest bei. Trotzdem sieht die Rekonstruktion bei `,e.jsx(n,{children:"k = 2"}),` noch sichtbar
falsch aus: Der Energie-Anteil misst Quadrate und wird deshalb schon von den
großflächigen Helligkeiten fast ausgeschöpft, während die feinen Kanten in den
kleinen `,e.jsx(n,{children:"\\corange{\\sigma_i}"}),` stecken. Ein Kriterium allein reicht für die Wahl
von `,e.jsx(n,{children:"k"})," nicht (",e.jsx(i.a,{href:"#env-drei-kriterien-fuer-die-wahl-von-k",children:"Bemerkung 6.4.6"}),")."]})]}),e.jsxs(Ve,{loesung:1.8,toleranz:.3,children:[e.jsxs(i.p,{children:[`Halten wir im Empfehlungs-Widget Adas Bewertung für „Sternenstaub" zurück, also
die `,e.jsx(n,{children:"5"})," links oben, und setzen wir ",e.jsx(n,{children:"k = 2"}),` bei Auffüllung mit dem Filmmittel.
Welche Vorhersage steht danach in diesem Feld?`]}),e.jsxs(i.p,{children:["Rund ",e.jsx(n,{children:"1{,}8"}),", bei einem wahren Wert von ",e.jsx(n,{children:"5"}),`. Der Grund ist Schritt 1 von
`,e.jsx(i.a,{href:"#env-empfehlungen-ueber-eine-rang-k",children:"Algorithmus 6.4.11"}),`: Ohne Adas Bewertung sinkt das Mittel der Spalte
„Sternenstaub" von `,e.jsx(n,{children:"3{,}5"})," auf ",e.jsx(n,{children:"2{,}0"}),`, und dieser selbst gesetzte Wert
bestimmt die Vorhersage fast allein. Bei elf bekannten Bewertungen sagt das
Ergebnis mehr über die Füllregel als über Ada; das ist der Einwand gegen
das Auffüllen in Schritt 1.`]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Spektralnorm ",e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2"}),` ist der betragsgrößte Eigenwert von
`,e.jsx(n,{children:"\\bA"}),"."]}),e.jsxs(i.p,{children:["Sie ist der größte ",e.jsx(i.em,{children:"Singulärwert"})," (",e.jsx(c,{id:"env:spektralnorm-und-groesster-singulaerwert",href:"#env-spektralnorm-und-groesster-singulaerwert",children:"Satz 6.4.1"}),`). Für symmetrische Matrizen
fallen beide Größen bis aufs Vorzeichen zusammen, sonst nicht. Gegenbeispiel:
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` hat
den doppelten Eigenwert `,e.jsx(n,{children:"0"}),`, aber
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\bigl(\\begin{smallmatrix} 0 & 0 \\\\ 0 & 1 \\end{smallmatrix}\\bigr)"}),`
und damit `,e.jsx(n,{children:"\\left\\| \\bA \\right\\|_2 = 1"}),`. Für nicht quadratische Matrizen
existieren Eigenwerte ohnehin nicht.`]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Unter allen Matrizen vom Rang höchstens ",e.jsx(n,{children:"k"})," minimiert ",e.jsx(n,{children:"\\bA_k"}),` den Fehler
gleichzeitig in der Frobenius- und in der Spektralnorm.`]}),e.jsxs(i.p,{children:["So steht es in ",e.jsx(c,{id:"env:eckart-und-young-beste-approximation-von",href:"#env-eckart-und-young-beste-approximation-von",children:"Satz 6.4.4"}),`: Zwei verschiedene
Gütemaße führen zur selben Lösung. Der einzige Minimierer ist `,e.jsx(n,{children:"\\bA_k"}),`
allerdings nicht (`,e.jsx(i.a,{href:"#env-was-der-satz-liefert-und-was-nicht",children:"Bemerkung 6.4.5"}),")."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 3 & 0 \\\\ 0 & 2 \\end{smallmatrix}\\bigr)"}),`
ist `,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 2{,}5 & 0 \\\\ 0 & 2{,}5 \\end{smallmatrix}\\bigr)"}),`
die beste Rang-1-Approximation.`]}),e.jsxs(i.p,{children:["Diese Matrix hat Rang ",e.jsx(n,{children:"2"}),`, ist also nicht zugelassen. Die Singulärwerte
von `,e.jsx(n,{children:"\\bA"})," sind ",e.jsx(n,{children:"\\corange{\\sigma_1} = 3"})," und ",e.jsx(n,{children:"\\corange{\\sigma_2} = 2"}),`, die beste
Rang-1-Approximation ist
`,e.jsx(n,{children:"\\bA_1 = \\bigl(\\begin{smallmatrix} 3 & 0 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),`, und
der Fehler beträgt `,e.jsx(n,{children:"\\cred{\\left\\| \\bA - \\bA_1 \\right\\|_2} = \\corange{\\sigma_2} = 2"}),"."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Solange ",e.jsx(n,{children:"k < \\min(m,n)"})," gilt, spart die Rang-k-Approximation immer Speicher."]}),e.jsxs(i.p,{children:["Sie kostet ",e.jsx(n,{children:"k(m + n + 1)"})," Zahlen gegen ",e.jsx(n,{children:"mn"}),` für die volle Matrix, und das ist
für großes `,e.jsx(n,{children:"k"})," mehr. Bei ",e.jsx(n,{children:"m = n = 100"})," und ",e.jsx(n,{children:"k = 50"}),` etwa speichern wir
`,e.jsx(n,{children:"50 \\cdot 201 = 10\\,050"})," statt ",e.jsx(n,{children:"10\\,000"}),` Zahlen. Ein Gewinn entsteht erst für
`,e.jsx(n,{children:"k < mn/(m + n + 1) \\approx 49{,}8"}),", hier also für ",e.jsx(n,{children:"k \\leq 49"}),"."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\corange{\\sigma_{k+1}} = 0"}),", so ist die Rang-k-Approximation exakt."]}),e.jsxs(i.p,{children:[`Weil die Singulärwerte absteigend sortiert sind, folgt aus
`,e.jsx(n,{children:"\\corange{\\sigma_{k+1}} = 0"})," sofort ",e.jsx(n,{children:"\\rang(\\bA) \\leq k"}),`. Die Summenform
`,e.jsx(i.a,{href:"#eq-summenform-der-svd",children:"(6.4.2)"})," hat dann höchstens ",e.jsx(n,{children:"k"})," Summanden, also ist ",e.jsx(n,{children:"\\bA_k = \\bA"}),`.
`,e.jsx(c,{id:"env:eckart-und-young-beste-approximation-von",href:"#env-eckart-und-young-beste-approximation-von",children:"Satz 6.4.4"})," selbst setzt ",e.jsx(n,{children:"k < r"}),` voraus und greift hier nicht mehr. Setzen wir
`,e.jsx(n,{children:"\\corange{\\sigma_i} = 0"})," für ",e.jsx(n,{children:"i > r"}),", sagt ",e.jsx(i.a,{href:"#eq-eckart-und-young-beste-approximation-von",children:"(6.4.4)"})," aber dasselbe: Der Fehler ist null."]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: vgl. Heath §3.6 (Singulärwertzerlegung und ihre Anwendungen)
sowie MML §4.5 und §4.6 (SVD und Matrixapproximation).`})})]})}function yi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Vn,{...r})}):Vn(r)}function En(r){const i={a:"a",code:"code",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h3,{children:"Was wir gelernt haben"}),`
`,e.jsx(M,{kind:"Bemerkung",label:"6.5.1 (Die fünf Kernkonzepte)",id:"env-die-fuenf-kernkonzepte",children:e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Die SVD erweitert die Eigenwertzerlegung."}),` Sie verlangt weder eine
quadratische noch eine `,e.jsx(c,{id:"symmetric-matrix",children:"symmetrische"}),` Matrix und
existiert für jedes `,e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"}),`
(`,e.jsx(i.a,{href:"#sec-6.1",children:"Abschnitt 6.1"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Singulärwerte sind Wurzeln von Eigenwerten:"}),`
`,e.jsx(n,{children:"\\corange{\\sigma_i(\\bA)} = \\sqrt{\\lambda_i\\left(\\bA^\\top\\bA\\right)}"}),`
(`,e.jsx(c,{id:"env:singulaerwerte",href:"#env-singulaerwerte",children:"Definition 6.2.4"}),"). Der Umweg über ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` verwandelt eine beliebige
Matrix in eine symmetrische, auf die der Spektralsatz passt.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Der Hauptsatz:"}),`
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\,\\corange{\\bSigma}\\,\\cblue{\\bV^\\top}"}),` mit orthogonalem
`,e.jsx(n,{children:"\\cgreen{\\bU} \\in \\R^{m \\times m}"}),`, orthogonalem
`,e.jsx(n,{children:"\\cblue{\\bV} \\in \\R^{n \\times n}"}),` und „diagonalem"
`,e.jsx(n,{children:"\\corange{\\bSigma} \\in \\R^{m \\times n}"})," (",e.jsx(c,{id:"env:singulaerwertzerlegung",href:"#env-singulaerwertzerlegung",children:"Satz 6.2.13"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Reduzierte SVD:"}),`
`,e.jsx(n,{children:"\\bA = \\cgreen{\\bU_r}\\,\\corange{\\bSigma_r}\\,\\cblue{\\bV_r^\\top}"}),` mit
`,e.jsx(n,{children:"r = \\rang(\\bA)"}),". Die Nullblöcke von ",e.jsx(n,{children:"\\corange{\\bSigma}"}),` tragen nichts bei
und dürfen weg (`,e.jsx(c,{id:"env:reduzierte-svd",href:"#env-reduzierte-svd",children:"Definition 6.3.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Pseudoinverse:"}),`
`,e.jsx(n,{children:"\\bA\\pinv = \\cblue{\\bV_r}\\,\\corange{\\bSigma_r^{-1}}\\,\\cgreen{\\bU_r^\\top}"}),`,
die Verallgemeinerung der Inversen auf beliebige Matrizen
(`,e.jsx(c,{id:"env:moore-penrose-pseudoinverse",href:"#env-moore-penrose-pseudoinverse",children:"Definition 6.3.5"}),")."]}),`
`]})}),`
`,e.jsxs(i.p,{children:[`Zwei Anwendungen tragen das Kapitel. Die Pseudoinverse löst
`,e.jsx(c,{id:"linear-least-squares",children:"Kleinste-Quadrate-Probleme"}),` über
`,e.jsx(n,{children:"\\wh{\\bx} = \\bA\\pinv\\bb"}),`, auch wenn die Normalengleichungen mangels vollen
Spaltenrangs versagen (`,e.jsx(i.a,{href:"#env-ausblick-kleinste-quadrate",children:"Bemerkung 6.3.12"}),`). Die
abgeschnittene Zerlegung liefert die beste
`,e.jsx(c,{id:"low-rank-approximation",children:"Approximation niedrigen Rangs"}),`, deren Fehler die
weggelassenen Singulärwerte beziffern (`,e.jsx(i.a,{href:"#sec-6.4",children:"Abschnitt 6.4"}),`). Sie ist das
Standardwerkzeug für Datenkompression und Datenanalyse, von der
Hauptkomponentenanalyse (`,e.jsx(i.a,{href:"?k=08-la-misc#sec-8.2",children:"Abschnitt 8.2"}),`) bis zum Empfehlungssystem
(`,e.jsx(i.a,{href:"#env-eine-duenn-besetzte-bewertungsmatrix",children:"Beispiel 6.4.10"}),`). Wer die SVD einer Matrix
kennt, kennt ihren Rang, ihre Norm, ihre Kondition, ihre fundamentalen
Unterräume und die beste Näherung jeder Stufe.`]}),`
`,e.jsx(ee,{title:"Querverbindungen zu anderen Kapiteln",children:e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Normen:"}),` Der größte Singulärwert ist die
Spektralnorm, `,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_2 = \\corange{\\sigma_1}"}),`
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.3",children:"Abschnitt 3.3"}),`); die Frobeniusnorm nimmt
alle Singulärwerte zusammen,
`,e.jsx(n,{children:"\\left\\|\\bA\\right\\|_F = \\sqrt{\\sum_i \\corange{\\sigma_i}^2}"}),`
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.4",children:"Abschnitt 3.4"}),`). Für quadratische,
invertierbare Matrizen ist der Quotient
`,e.jsx(n,{children:"\\corange{\\sigma_1}/\\corange{\\sigma_n}"}),` die
`,e.jsx(c,{id:"condition-number",children:"Spektralkondition"})," ",e.jsx(n,{children:"\\kappa_2(\\bA)"}),`
(`,e.jsx(i.a,{href:"?k=03-matrix-spur-norm#sec-3.5",children:"Abschnitt 3.5"}),`); sie beschränkt, wie stark
ein relativer Datenfehler in der Lösung anwachsen kann
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.2",children:"Abschnitt 4.2"}),")."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"Matrixzerlegungen:"})," LU (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.3",children:"Abschnitt 5.3"}),") und Cholesky (",e.jsx(i.a,{href:"?k=05-lgs#sec-5.4",children:"Abschnitt 5.4"}),`)
zerlegen, um Gleichungssysteme schnell zu lösen. Die SVD zerlegt, um die
Geometrie einer Abbildung sichtbar zu machen. Sie ist die teuerste der drei
und die einzige, die für jede Matrix existiert.`]}),`
`]})}),`
`,e.jsx(i.h3,{children:"Praktische Hinweise"}),`
`,e.jsx(i.p,{children:"Drei Zuschnitte der Zerlegung sind gebräuchlich:"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Variante"}),e.jsx(i.th,{children:"Zerlegung"}),e.jsx(i.th,{children:"Formate"}),e.jsx(i.th,{children:"Wozu"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"volle SVD"}),e.jsx(i.td,{children:e.jsx(n,{children:"\\bA = \\cgreen{\\bU}\\corange{\\bSigma}\\cblue{\\bV^\\top}"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cgreen{\\bU}"})," ist ",e.jsx(n,{children:"m \\times m"}),", ",e.jsx(n,{children:"\\cblue{\\bV}"})," ist ",e.jsx(n,{children:"n \\times n"})]}),e.jsx(i.td,{children:"exakt, alle fundamentalen Unterräume auf einmal"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"reduzierte SVD"}),e.jsx(i.td,{children:e.jsx(n,{children:"\\bA = \\cgreen{\\bU_r}\\corange{\\bSigma_r}\\cblue{\\bV_r^\\top}"})}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cgreen{\\bU_r}"})," ist ",e.jsx(n,{children:"m \\times r"}),", ",e.jsx(n,{children:"\\cblue{\\bV_r}"})," ist ",e.jsx(n,{children:"n \\times r"})]}),e.jsx(i.td,{children:"exakt, ohne die Nullblöcke"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"truncated SVD"}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\bA \\approx \\bA_k = \\cgreen{\\bU_k}\\corange{\\bSigma_k}\\cblue{\\bV_k^\\top}"}),", ",e.jsx(n,{children:"k < r"})]}),e.jsxs(i.td,{children:[e.jsx(n,{children:"\\cgreen{\\bU_k}"})," ist ",e.jsx(n,{children:"m \\times k"}),", ",e.jsx(n,{children:"\\cblue{\\bV_k}"})," ist ",e.jsx(n,{children:"n \\times k"})]}),e.jsx(i.td,{children:"Approximation, Kompression"})]})]})]}),`
`,e.jsxs(i.p,{children:[`Nur die dritte Variante verliert Information, und wie viel, sagen die
abgeschnittenen Singulärwerte; die Wahl von `,e.jsx(n,{children:"k"}),` ist eine
Modellierungsentscheidung (`,e.jsx(i.a,{href:"#env-drei-kriterien-fuer-die-wahl-von-k",children:"Bemerkung 6.4.6"}),")."]}),`
`,e.jsxs(i.p,{children:[`Die Definition der Singulärwerte führt über die Eigenwerte von
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),", als ",e.jsx(i.em,{children:"Rechenweg"}),` taugt dieser Umweg aber nicht. Das Produkt
quadriert die Kondition, `,e.jsx(n,{children:"\\kappa_2(\\bA^\\top\\bA) = \\kappa_2(\\bA)^2"}),`, und beim
Aufstellen gehen kleine Beiträge neben großen im
`,e.jsx(c,{id:"rounding-error",children:"Rundungsfehler"}),` unter. Als Faustregel lassen sich über
`,e.jsx(n,{children:"\\bA^\\top\\bA"}),` Singulärwerte unterhalb von
`,e.jsx(n,{children:"\\sqrt{\\eps} \\cdot \\corange{\\sigma_1} \\approx 1{,}5 \\cdot 10^{-8} \\cdot \\corange{\\sigma_1}"}),`
nicht mehr bestimmen.`]}),`
`,e.jsxs(ee,{title:"Der Umweg über AᵀA an einem Beispiel",children:[e.jsxs(i.p,{children:["Ist ",e.jsx(n,{children:"\\bA^\\top\\bA"}),` erst aufgestellt, müsste eine Differenz fast gleicher Zahlen
den kleinen Singulärwert liefern, und diese
`,e.jsx(c,{id:"cancellation",children:"Auslöschung"}),` kann den Rundungsverlust nicht rückgängig machen
(`,e.jsx(i.a,{href:"?k=04-fehler#sec-4.3",children:"Abschnitt 4.3"}),")."]}),e.jsxs(M,{kind:"Beispiel",label:"6.5.2 (Der Umweg über AᵀA)",id:"env-der-umweg-ueber-a-a",children:[e.jsx(i.p,{children:"Betrachten wir"}),e.jsx(j,{children:`\\bA = \\begin{pmatrix} 1 & 1 \\\\ \\delta & 0 \\\\ 0 & \\delta \\end{pmatrix},
\\qquad \\delta = 10^{-8},
\\qquad
\\bA^\\top\\bA = \\begin{pmatrix} 1 + \\delta^2 & 1 \\\\ 1 & 1 + \\delta^2 \\end{pmatrix} .`}),e.jsxs(i.p,{children:["Eine Matrix der Bauart ",e.jsx(n,{children:"\\begin{pmatrix} a & b \\\\ b & a \\end{pmatrix}"}),` hat die
Eigenwerte `,e.jsx(n,{children:"a + b"})," und ",e.jsx(n,{children:"a - b"}),", hier also ",e.jsx(n,{children:"(1 + \\delta^2) + 1 = 2 + \\delta^2"}),`
und `,e.jsx(n,{children:"(1 + \\delta^2) - 1 = \\delta^2"}),". Damit besitzt ",e.jsx(n,{children:"\\bA"}),` die Singulärwerte
`,e.jsx(n,{children:"\\corange{\\sigma_1} = \\sqrt{2 + \\delta^2} \\approx 1{,}4142"}),` und
`,e.jsx(n,{children:"\\corange{\\sigma_2} = \\delta = 10^{-8}"}),"; die Matrix hat Rang ",e.jsx(n,{children:"2"}),`. Der kleinere
Eigenwert ist eine Differenz fast gleicher Zahlen. Er hängt allein an dem
Summanden `,e.jsx(n,{children:"\\delta^2"})," im Diagonaleintrag, und der ist gefährdet."]}),e.jsxs(i.p,{children:["In doppelter Genauigkeit geht das schief. Der Abstand von ",e.jsx(n,{children:"1"}),` zur nächstgrößeren
darstellbaren Zahl ist die `,e.jsx(c,{id:"machine-epsilon",children:"Maschinengenauigkeit"}),`
`,e.jsx(n,{children:"\\eps \\approx 2{,}22 \\cdot 10^{-16}"}),`, und gerundet wird
zur nächstgelegenen. Weil `,e.jsx(n,{children:"\\delta^2 = 10^{-16}"}),` kleiner als die halbe
Schrittweite `,e.jsx(n,{children:"1{,}11 \\cdot 10^{-16}"}),` ausfällt, ergibt sich
`,e.jsx(n,{children:"\\operatorname{fl}(1 + \\delta^2) = 1"}),". Die berechnete Matrix ist"]}),e.jsx(j,{children:`\\wh{\\bA^\\top\\bA} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}
\\qquad\\text{mit den Eigenwerten } 2 \\text{ und } \\cred{0} .`}),e.jsxs(i.p,{children:["Die Rechnung meldet ",e.jsx(n,{children:"\\corange{\\sigma_2} = \\cred{0}"})," und damit Rang ",e.jsx(n,{children:"1"}),`. Ein Verfahren,
das direkt mit `,e.jsx(n,{children:"\\bA"})," arbeitet, bestimmt ",e.jsx(n,{children:"\\corange{\\sigma_2}"}),` dagegen bis auf
einen absoluten Fehler der Größenordnung `,e.jsx(n,{children:"\\eps \\cdot \\corange{\\sigma_1}"}),`, also
auf etwa `,e.jsx(n,{children:"3 \\cdot 10^{-16}"})," genau, und sieht den Rang ",e.jsx(n,{children:"2"}),"."]})]})]}),`
`,e.jsxs(i.p,{children:["Die gebräuchlichen Verfahren arbeiten deshalb direkt mit ",e.jsx(n,{children:"\\bA"}),` und benutzen
nur orthogonale Transformationen, die alle Singulärwerte unverändert lassen
(`,e.jsx(c,{id:"env:unitaere-invarianz",href:"?k=03-matrix-spur-norm#env-unitaere-invarianz",children:"Satz 3.4.7"}),`); Standard ist der Algorithmus von Golub und Reinsch.
Bei sehr großen Matrizen berechnen wir nur die `,e.jsx(n,{children:"k"}),` größten Singulärwerte samt
`,e.jsx(c,{id:"env:rechte-und-linke-singulaervektoren",children:"Singulärvektoren"})," (",e.jsx(i.em,{children:"truncated SVD"}),"), ohne ",e.jsx(n,{children:"\\bA"}),` je vollständig zu zerlegen. In R
stehen beide Wege bereit:`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-r",children:`s <- svd(A)                   # s$d: Singulärwerte, s$u und s$v: Singulärvektoren
k <- 5
A_k <- s$u[, 1:k] %*% diag(s$d[1:k], nrow = k) %*% t(s$v[, 1:k])

irlba::irlba(A, nv = k)       # nur die k größten, iterativ (Lanczos)
irlba::svdr(A, k)             # dasselbe, randomisiert
`})}),`
`,e.jsx(i.h3,{children:"Selbsttest"}),`
`,e.jsxs(Re,{children:[e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist ",e.jsx(n,{children:"\\bA^\\top\\bA \\in \\R^{m \\times m}"}),"."]}),e.jsxs(i.p,{children:["Die Formate ergeben ",e.jsx(n,{children:"(n \\times m) \\cdot (m \\times n)"}),", also ist ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`
eine `,e.jsx(n,{children:"n \\times n"}),"-Matrix (",e.jsx(c,{id:"env:eigenschaften-von-a-a",href:"#env-eigenschaften-von-a-a",children:"Satz 6.2.1"}),"). Die ",e.jsx(n,{children:"m \\times m"}),`-Matrix ist
`,e.jsx(n,{children:"\\bA\\bA^\\top"}),". In ",e.jsx(i.a,{href:"#env-die-matrix-a-a-einer-3-2-matrix",children:"Beispiel 6.2.3"})," mit ",e.jsx(n,{children:"m = 3"})," und ",e.jsx(n,{children:"n = 2"})," war ",e.jsx(n,{children:"\\bA^\\top\\bA"}),`
entsprechend `,e.jsx(n,{children:"2 \\times 2"})," groß."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:["Für ",e.jsx(n,{children:"\\bA \\in \\R^{m \\times n}"})," ist ",e.jsx(n,{children:"\\bA^\\top\\bA"})," symmetrisch."]}),e.jsxs(i.p,{children:[`Transponieren dreht die Reihenfolge um:
`,e.jsx(n,{children:"\\left(\\bA^\\top\\bA\\right)^\\top = \\bA^\\top\\left(\\bA^\\top\\right)^\\top = \\bA^\\top\\bA"}),`
(`,e.jsx(c,{id:"env:eigenschaften-von-a-a",href:"#env-eigenschaften-von-a-a",children:"Satz 6.2.1"}),"). Das gilt für jede Matrix ",e.jsx(n,{children:"\\bA"}),"."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Die Eigenwerte von ",e.jsx(n,{children:"\\bA^\\top\\bA"})," sind die Singulärwerte von ",e.jsx(n,{children:"\\bA"}),"."]}),e.jsxs(i.p,{children:["Sie sind deren ",e.jsx(i.em,{children:"Quadrate"}),": ",e.jsx(n,{children:"\\lambda_i = \\corange{\\sigma_i}^2"}),`, oder umgekehrt
`,e.jsx(n,{children:"\\corange{\\sigma_i} = \\sqrt{\\lambda_i}"})," (",e.jsx(c,{id:"env:singulaerwerte",href:"#env-singulaerwerte",children:"Definition 6.2.4"}),"). In ",e.jsx(i.a,{href:"#env-singulaerwerte-der-beispielmatrix",children:"Beispiel 6.2.6"}),`
gehören zu `,e.jsx(n,{children:"\\lambda_1 \\approx 9{,}531"})," und ",e.jsx(n,{children:"\\lambda_2 \\approx 1{,}469"}),` die
Singulärwerte `,e.jsx(n,{children:"\\corange{\\sigma_1} \\approx 3{,}087"}),` und
`,e.jsx(n,{children:"\\corange{\\sigma_2} \\approx 1{,}212"}),"."]})]}),e.jsxs(G,{wahr:!1,children:[e.jsxs(i.p,{children:["Jede quadratische Matrix ",e.jsx(n,{children:"\\bA \\in \\R^{n \\times n}"})," ist diagonalisierbar."]}),e.jsxs(i.p,{children:[`Der Jordan-Block
`,e.jsx(n,{children:"\\bA = \\bigl(\\begin{smallmatrix} 0 & 1 \\\\ 0 & 0 \\end{smallmatrix}\\bigr)"}),` hat
nur den Eigenwert `,e.jsx(n,{children:"0"}),`, und dessen Eigenraum ist die Gerade
`,e.jsx(n,{children:"\\spann\\{\\be_1\\}"}),". Es gibt also keine Basis des ",e.jsx(n,{children:"\\R^2"}),` aus
Eigenvektoren. Symmetrie ist dabei `,e.jsx(i.em,{children:"hinreichend"}),` für Diagonalisierbarkeit,
aber nicht notwendig: Die unsymmetrische Matrix
`,e.jsx(n,{children:"\\bigl(\\begin{smallmatrix} 2 & 1 \\\\ 0 & 1 \\end{smallmatrix}\\bigr)"}),` aus
`,e.jsx(i.a,{href:"#env-der-einheitskreis-wird-zur-ellipse",children:"Beispiel 6.1.1"})," hat die zwei verschiedenen Eigenwerte ",e.jsx(n,{children:"2"})," und ",e.jsx(n,{children:"1"}),` und ist damit
diagonalisierbar, nur nicht `,e.jsx(i.em,{children:"orthogonal"})," diagonalisierbar (",e.jsx(i.a,{href:"#sec-6.1",children:"Abschnitt 6.1"}),")."]})]}),e.jsxs(G,{wahr:!0,children:[e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bA^\\top\\bA"})," ist immer orthogonal diagonalisierbar."]}),e.jsxs(i.p,{children:[e.jsx(n,{children:"\\bA^\\top\\bA"}),` ist symmetrisch, und der Spektralsatz liefert für symmetrische
Matrizen eine Orthonormalbasis aus Eigenvektoren, also
`,e.jsx(n,{children:"\\bA^\\top\\bA = \\cblue{\\bV}\\bLambda\\cblue{\\bV^\\top}"}),` mit orthogonalem
`,e.jsx(n,{children:"\\cblue{\\bV}"})," (",e.jsx(c,{id:"env:a-a-ist-orthogonal-diagonalisierbar",href:"#env-a-a-ist-orthogonal-diagonalisierbar",children:"Korollar 6.2.2"}),`). Darauf beruht
die Konstruktion der SVD: Die Spalten von `,e.jsx(n,{children:"\\cblue{\\bV}"}),` sind die rechten
Singulärvektoren.`]})]})]}),`
`,e.jsx(i.p,{children:e.jsx(i.em,{children:`Vertiefung: Heath §3.6 (Singulärwertzerlegung, Pseudoinverse und ihre
Anwendungen); vgl. MML §4.5 und §4.6 für die Zerlegung selbst und die
Approximation niedrigen Rangs.`})})]})}function qi(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(En,{...r})}):En(r)}function Nn(r){const i={em:"em",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r.components};return e.jsxs(e.Fragment,{children:[`
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
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 3.30"}),e.jsx(i.td,{children:"Reduzierte SVD eines Spalten- und eines Zeilenvektors"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Deisenroth et al. (MML) Exercise 4.8"}),e.jsxs(i.td,{children:["SVD einer ",e.jsx(n,{children:"2 \\times 3"}),"-Matrix von Hand"]}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 3.33"}),e.jsx(i.td,{children:"Pseudoinverse in drei Spezialfällen"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 3.34"}),e.jsx(i.td,{children:"Pseudoinverse einer fast singulären Matrix"}),e.jsx(i.td,{children:"leicht, ca. 15 Min."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Schaback/Wendland Aufgabe 4.4"}),e.jsx(i.td,{children:"Tychonoff-Regularisierung und ihre Berechnung via SVD"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Lohnend"})," (",e.jsx(n,{children:"\\bigstar\\bigstar"}),")"]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Aufgabe"}),e.jsx(i.th,{children:"Thema"}),e.jsx(i.th,{children:"Schwierigkeit, Aufwand"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Heath Exercise 4.36"}),e.jsx(i.td,{children:"Singulärwerte als Eigenwerte der erweiterten Matrix"}),e.jsx(i.td,{children:"mittel, ca. 30 Min."})]})})]}),`
`,e.jsxs(i.p,{children:["Bücher: Heath: ",e.jsx(i.em,{children:"Scientific Computing"})," (2. Aufl.); Schaback/Wendland: ",e.jsx(i.em,{children:"Numerische Mathematik"})," (5. Aufl.); Deisenroth et al. (MML): ",e.jsx(i.em,{children:"Mathematics for Machine Learning"}),"."]})]})}function Ri(r={}){const{wrapper:i}=r.components||{};return i?e.jsx(i,{...r,children:e.jsx(Nn,{...r})}):Nn(r)}const Ni={sections:[{id:"6.1",key:"motivation",title:"Motivation",C:_e(ii)},{id:"6.2",key:"singulaerwerte",title:"Singulärwerte und Singulärvektoren",C:_e(oi)},{id:"6.3",key:"reduzierte-svd",title:"Reduzierte SVD und Pseudoinverse",C:_e(pi)},{id:"6.4",key:"anwendungen",title:"Anwendungen",C:_e(yi)},{id:"6.5",key:"zusammenfassung",title:"Zusammenfassung",C:_e(qi)},{id:"6.6",key:"uebungen",title:"Übungsempfehlungen",C:_e(Ri)}]};export{Ni as default};
