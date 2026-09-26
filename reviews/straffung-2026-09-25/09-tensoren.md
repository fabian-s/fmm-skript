# Straffung Kapitel 9 (tensoren): S91–S95

Stand 2026-09-26. Grundlage: `BRIEF.md`, Folien `slides-2627/slides/09-tensoren.qmd`,
alter Bericht `reviews/kuerzung/09-tensoren.md` (größtenteils schon umgesetzt: DL-Box,
Attention-Box, Beweise in Vertiefungen, Sylvester-Beispiel und Spline-Designmatrix waren
vorhanden). Vorgängerlauf hatte nichts geändert (`git diff 21b998d` leer).

## 1. Zahlen (`zaehlen.mjs 09-tensoren`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S91 | 1 660 → 1 393 (−16,1 %) | 136 → 135 | 1 796 → 1 528 (−14,9 %) |
| S92 | 1 809 → 1 593 (−11,9 %) | 986 → 918 | 2 795 → 2 511 (−10,2 %) |
| S93 | 3 979 → 3 463 (−13,0 %) | 762 → 899 | 4 741 → 4 362 (−8,0 %) |
| S94 | 2 595 → 2 191 (−15,6 %) | 520 → 645 | 3 115 → 2 836 (−9,0 %) |
| S95 | 1 578 → 1 243 (−21,2 %) | 166 → 274 | 1 744 → 1 517 (−13,0 %) |
| Kapitel | 11 621 → 9 883 (−15,0 %) | 2 570 → 2 871 | 14 191 → 12 754 (−10,1 %) |

S92 und S93 liegen unter dem Richtwert, weil dort Folien-KERN nachgetragen wurde (siehe §5)
und der verbleibende Text fast vollständig auf Folien steht (äußeres Produkt,
Tensorprodukt, Kronecker, Blockstrukturen, separierbare Kovarianz).

## 2. Verlagert in Vertiefungen

- **S93, empirische Kovarianz** (Rang-1-Summanden, rang(Σ̂) ≤ N−1) aus
  @bemerkung:kovarianzmatrizen-sind-mittel-aeusserer in die bestehende Attention-Box, jetzt
  `:::vertiefung[Empirische Kovarianz und Attention]`. EXTRA: Folie hat nur die
  Verschiebungsformel. **Gegenrichtung:** Die Attention-Formel steht als Stichpunkt auf der
  gezählten Folie „Äußeres Produkt: Beispiel & Eigenschaften“ und steht jetzt als zwei
  Sätze plus Formel im Haupttext; die Box erklärt Q/K/V, Rangschranke, Softmax.
- **S93, Kroneckerprodukt zweier Vektoren** (Spalte ⊗_K Spalte, Spalte ⊗_K Zeile) aus
  @bemerkung:zwei-bedeutungen-zwei-zeichen → `:::vertiefung[Das Kroneckerprodukt zweier
  Vektoren]`. EXTRA: zweites Beispiel zum Abflachen, auf keiner Folie.
- **S94, universelle Eigenschaft** aus @definition:tensorprodukt-von-vektorraeumen in die
  bestehende Box „Die universelle Eigenschaft“, Box umgeschrieben (UP-Aussage, warum der
  Spann allein abstrakt nicht reicht, Nachrechnung für ℝᵐ⊗ℝⁿ, Eindeutigkeit bis auf
  Isomorphie). EXTRA: nur Anhangsfolie (`visibility="uncounted"`). Die Definition im
  Haupttext ist jetzt die Folienfassung (Spann + bilineares ⊗).
- **S94, Erzeugendensystem-Nachweis zu @satz:tensorproduktbasis** (mit
  `{#eq-elementarer-tensor-in-produktbasis}`) aus dem Haupttext in die Beweis-Box, die
  zusammen mit dem Unabhängigkeitsschritt jetzt `:::::vertiefung[Beweis der
  Tensorproduktbasis]` heißt (vorher „Warum die Produkte linear unabhängig sind“). EXTRA:
  Folie bringt den Satz ohne Beweis. **Ersatz im Haupttext:**
  @bemerkung:eine-feinheit nennt die Produktform c_ij = a_i b_j jetzt selbst (Quiz S94
  bleibt beantwortbar).
- **S95, Aufwand/Struktur** (mnpq Einträge, X = A⁻¹CB⁻¹ numerisch über zwei Löser,
  Eigenwerte separierbarer Kovarianzen) → `:::vertiefung[Große Systeme: Struktur statt
  Ausmultiplizieren]`, vor das Sylvester-Beispiel gestellt und ausdrücklich auf AXB = C
  bezogen (hinter Sylvester wäre X = A⁻¹CB⁻¹ falsch gelesen worden). EXTRA: Folie sagt nur
  „effizientere spezialisierte Löser“, das steht weiter im Sylvester-Beispiel.

## 3. Gestrichen oder gekürzt (nach Datei)

- **S91:** Satz nach der Definition („Die Bedingung ist n Bedingungen …“, Dublette zum
  Absatz davor); @bemerkung:das-vierfache-geometrisch-gelesen aufgelöst, Inhalt ist jetzt
  die Auswertung im Rechteck-Kasten (ID nirgends referenziert, `grep` über `src/` und
  `scripts/verify/`); alte Kasten-Auswertung (verwies auf die universelle Eigenschaft);
  „Das einfachste Beispiel kommt aus der Schulgeometrie“; „Dieser Fall begegnet uns …“;
  „erstes Beispiel mit drei verschiedenen Räumen“; Vorschau-Aufzählung zu ⊗/⊗_K in „Was
  wir brauchen“ (steht in S93); Skalarprodukt-Begründung auf zwei Sätze; Quizantworten
  gestrafft.
- **S92:** Vorspann auf drei Sätze; „Ein Detail ist dabei zu beachten“; Konventionssatz
  „Reihenfolge ist Konvention, Bedeutung nicht“; Ankündigung „Sehen wir uns k = 2 an“;
  Einleitung von „### Tensoren“ (Dublette zum Absatz über k + 1 Indizes); „Wir sagen
  deshalb indizierte Familie oder schlicht Anordnung“; reshape-Absatz auf zwei Sätze;
  Hardware-Absatz gestrafft; Widget-Nachsätze „Wie das Widget zeigt“ ersetzt. In der
  DL-Box Doppelung „Graustufenbild“ gestrichen.
- **S93:** Vorspann (dreifache Notationsansage ⊗/⊗_K; bleibt einmal im Vorspann und in
  @bemerkung:zwei-bedeutungen-zwei-zeichen); Notationsabsatz in der Kronecker-Definition
  (Dublette); @bemerkung:inneres-und-aeusseres-produkt von zwei Absätzen auf einen;
  SVD-Bemerkung umgebaut; zweiter Beweisschritt der Bilinearität (Leerlauf) in Schritt 1
  aufgegangen; Ende von @beispiel:tensorprodukt-dreier-vektoren (SVD-Analogie) auf einen
  Satz; Positionsformel in @beispiel:s-k-i-n-verteilt-die-eintraege; Farbhinweis und
  Vergleichssatz in @beispiel:i-n-k-s-ist-blockdiagonal; Korrelationsabsatz gestrafft;
  Satz „Die Struktur von B wiederholt sich …“; Quizfrage „Im Rang-1-Widget …“ (Teilmenge
  der Folgefrage zu Bild und Kern).
- **S94:** Vorspann; Satz über Rang-1-Tensoren (Wiederholung aus S93); Schluss von
  @bemerkung:rechenregeln-aus-der-bilinearitaet (Dublette zur Einleitung vor der
  Definition); Klammerungsbegründung in @beispiel:drei-faktoren (steht in S93);
  Einleitung „Ein einzelnes Produkt …“; Benennungsabsatz bei den Funktionen auf einen Satz;
  Einleitungssatz von @bemerkung:was-der-produktbau-bedeutet, Punkt 3 kürzer;
  **Schlussabsatz „Tensorproduktbasen sind damit das Standardwerkzeug …“ gestrichen**
  (fast wortgleich mit „Wie es weitergeht“ in S95, dort bleibt er); Designmatrix-Bemerkung
  ohne vagen Ausblick; zwei Quizantworten gekürzt.
- **S95:** Vorspann („Begonnen haben wir …“, Meta); in „Sechs Begriffe“ Verweisketten,
  Hinweis auf die DL-Vertiefung und die wiederholte Multilinearitäts-Formel (steht in der
  Definition); „Kapitel 9 mit Kapitel 5“ → `@kap:lgs`; Formatprobe im Identitätsbeispiel
  auf zwei Sätze; Ausblick gestrafft; **zwei Quizfragen gestrichen:** „Die Schätzung aus
  dem Kronecker-Widget …“ (Dublette zu S93 „A ⊗_K B = B ⊗_K A“, außerdem gibt es im
  Kronecker-Widget keine Schätzung) und „dieselben mnpq Zahlen“ (Dublette zu S93-Frage
  „Kroneckerprodukt ist Stufe-4-Tensor“ und zur Bemerkung); Schlusssatz „Bequem gebaut,
  aber teuer bezahlt“.

## 4. Reparierte Fehler

- S91, @definition:multilineare-abbildung: Quantor über die übrigen Argumente fehlte
  („und alle v_ℓ ∈ V_ℓ, ℓ ≠ i“, wie auf der Folie).
- S93, Rang-1-Kasten: „w die dazu orthogonale Kernrichtung“ war schief (der Kern steht
  senkrecht auf w, nicht auf der Bildgeraden); neu formuliert.
- S93, SVD-Bemerkung: Anzeigeformel ohne Satzschluss nach dem Umbau, Punkt ergänzt.
- S93/S92: Verweis „Basistensoren aus dem Beweis von …“ zeigte aus dem Haupttext in eine
  Vertiefung; die Einheitstensoren stehen jetzt in @satz:der-raum-aller-tensoren-eines-formats.
- S94: nach dem Zusammenlegen der Beweisschritte „nach dem ersten Schritt“ → „zweiten“.
- S94, Vertiefung-Titel „Beweis über die Spalten einer Matrix“ passte nicht (Beweis läuft
  über die SVD) → „Beweis über die Singulärwertzerlegung“.
- Titel: „Stufe, und warum eine Menge es nicht tut“ → „Stufe; Familie statt Menge“,
  „Eine Feinheit“ → „Koeffizienten elementarer Tensoren“, „Separierbare Kovarianz zum
  Schieben“ → „Parameterzahl der separierbaren Kovarianz“ (Kasten zugleich hinter die
  Parameterbemerkung gezogen, vor die Eigenwert-Box), „Warum die Koeffizientendarstellung
  stimmt“ → „Beweisskizze zum Darstellungssatz“. IDs unverändert.

## 5. Nachgetragener Folien-KERN (bitte ansehen)

- S91 „Was wir brauchen“: Punkt „LGS lösen (LU, Cholesky) aus @kap:lgs“ (Vorkenntnis-Folie).
- S91 @bemerkung:bilinear-und-eine-warnung: ein Satz f(2v, 3w) = 6 f(v, w) (Self-Check
  Frage 2); dieselbe Frage als Selbsttest in S95 (falsch-Variante „5 f“).
- S92 Haupttext: Formate der gezählten DL-Folie (B ∈ ℝ^{32×224×224×3}, ≈ 4,8·10⁶;
  c: ℝ^{32×224×224×3} → ℝ^{32×56×56×64}; Höhe/Breite). Details bleiben in der Box.
- S92 @satz:der-raum-aller-tensoren-eines-formats: Einheitstensoren als Basis (vorher nur
  im Beweis, aber in S93 und einem Selbsttest benutzt).
- S95 @satz:vektorisierung-eines-matrixprodukts: Spezialfälle vec(AX) = (I_q ⊗_K A)vec(X),
  vec(XB) = (Bᵀ ⊗_K I_p)vec(X) (Folie „vec-Trick“; das Sylvester-Beispiel berief sich
  schon auf „die beiden Spezialfälle“, ohne sie zu nennen). Per Node an Zufallsmatrizen
  geprüft.
- S94 Designmatrix-Bemerkung: (B_x)_ij = B_j(x_i) und f(x,y) = Σ c_jk B_j(x)B_k(y),
  „Designmatrix des Gitters ist B_y ⊗_K B_x“ (Folie „Tensorprodukt-Splines“).

## 6. Ermessensentscheidungen und offene Fragen

- Self-Check-Frage 1 der Folien (m = 10, n = 20: 265 Parameter, identifizierbar 264) ist
  nicht als eigene Frage übernommen; Formel und Identifizierbarkeit stehen in
  @bemerkung:was-die-annahme-spart-und-was-sie-kostet, die S93-Frage rechnet m = n = 2.
  Kronecker-Quizfrage 1 der Folien (Format ℝ^{6×8}) ist durch die Definition und die
  S93-Frage „Stufe-4-Tensor“ abgedeckt.
- Das Beispiel in S94 lautet f = 2 + 3x − y + 5xy, die Folie hat 2 − x + 3y + 5xy (x und
  y vertauscht). Nicht geändert: Widget-Preset und Prüfscript `s94-tensorbasis.mjs`
  hängen am Skriptbeispiel. Kein Fehler, nur Abweichung.
- Strukturfrage: Der Kronecker-Kasten in S93 und die Designmatrix-Bemerkung in S94
  verweisen vorwärts auf den vec-Trick in S95. In den Folien steht der vec-Trick direkt
  nach der separierbaren Kovarianz. Ein Umzug des Vektorisierungsteils nach S93 wäre
  sauberer, braucht aber Registry-/Nummernänderungen (nicht Teil dieses Auftrags).
- @bemerkung:stufe-und-warum-eine-menge-es-nicht-tut (Menge vs. Familie) und die
  Produktbau-Bemerkung in S94 sind nicht auf den Folien, bleiben aber im Haupttext, weil
  Selbsttests (und der Klausur-Punkt „Stufe vs. Dimension“) daran hängen.
- Die R-Ausgabe `TRUE` im Sylvester-Beispiel ist nicht mit R nachgerechnet (kein Rscript im
  Container); die Lösung (1/11, 27/55, 8/11, 51/55) erfüllt das System per Node exakt.
- `lint-numbers` meldet einen vorbestehenden TSX-String „Beispiel 9.5.4“ in
  `widgets/S95Vektorisierung.tsx:29` (Preset-Name). Die Nummer stimmt weiterhin; TSX ist
  nicht im Auftrag.
- Nach der Auflösung von @bemerkung:das-vierfache-geometrisch-gelesen rücken die Nummern in
  §9.1 ab dort um eins nach vorn; handgetippte Verweise darauf gibt es nicht (grep über
  Kapitel und Konzepte). `numbers.generated.*` muss der Orchestrator neu erzeugen.

## 7. Prüfungen

- `npm run typecheck:mdx`: grün (206 Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur „Tabelle ist nicht aktuell“.
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte; alle KAP09/REV29-09-Scripte bestätigt
  (die „\cbblue … FEHLER“-Zeile ist der bekannte Negativtest).
- Zusätzlich: Headless-MathJax über alle 1 035 Mathe-Literale von S91–S95 (Kursmakros,
  `noundefined` abgeschaltet, Negativtest `\foo` greift): 0 Fehler. Gedankenstriche: 0.
  IDs, `{#eq-…}` und `:k[…]{#id}`-Ziele gegen 21b998d verglichen: nur
  `das-vierfache-geometrisch-gelesen` entfällt.
