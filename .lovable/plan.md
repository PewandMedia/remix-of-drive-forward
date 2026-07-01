# Plan: Startseite neu aufbauen – lukrativ, modern, SEO-stark

## Ziel
Die aktuelle Startseite wirkt flach und der SEO-Text ist verschwunden. Ich baue `src/routes/index.tsx` komplett neu – editorial, hochwertig, mit klarer Hierarchie – und bringe den vollständigen SEO-Fließtext für Bochum, Herne und NRW zurück.

## 1. Hero – editorial premium
- Vollflächiger Hero mit weichem rotem Radial-Glow + Dot-Grid Hintergrund (dezent, kein „Fleck").
- Kleiner Top-Badge: „5.0 ★ · 549 Google-Bewertungen · Bochum & Herne" (klickbar zu Google).
- Riesige editoriale H1 mit rotem Akzentwort („Dein **Führerschein** in Bochum & Herne").
- Sub-Copy mit klaren Keywords (Klasse B, B197, B78, Automatik, Schalter).
- 3 CTAs: WhatsApp (rot), Preise ansehen (schwarz), Beratung (outline).
- Trust-Row unter den CTAs: „2 Filialen · Klassen B / B197 / B78 · Erste-Hilfe monatlich".

## 2. Stat-Bento (direkt unter Hero)
4 Karten in einem Bento-Grid: 5.0 ★, 549+ Bewertungen, 2 Filialen, Anmeldung in Minuten. Große Zahlen, kleine Labels, dezente Icons.

## 3. SEO-Textblock zurück
Neuer Prose-Block „Deine Fahrschule in Bochum, Herne & NRW" mit 2 ausformulierten Absätzen. Keywords: Fahrschule Bochum, Führerschein Bochum, Fahrschule Herne, NRW, Klasse B, B197, B78, Automatik, Schalter, Erste-Hilfe-Kurs, Sehtest, TÜV, günstig, erfahren.

## 4. Preise-Teaser – aufgewertet
3 Karten (B / B197 / B78) mit weichem Schatten, Hover-Lift, roter „Beliebt"-Badge auf B197, pulsierender „Aktion läuft"-Badge nur wenn `offer_active`. Große „ab X€"-Preise. CTA zur Preise-Seite.

## 5. Erste-Hilfe-Teaser
Split-Card: links Info (50 €, 1 Tag, monatlich, direkt bei uns), rechts ein Icon-Bento mit rotem Kreuz-Motiv (Heart, ShieldCheck, Calendar). CTA „Zum Kurs".

## 6. Team-Teaser
Ilkay als Hero-Karte oben, darunter kleine runde Avatare der weiteren Instruktoren. CTA „Ganzes Team ansehen".

## 7. Standorte
2 LocationCards nebeneinander (Bochum-Standorte) mit Öffnungszeiten + „Route öffnen".

## 8. FAQ-Teaser
Accordion mit Top 3 Fragen, Link zur FAQ-Seite.

## 9. Reviews + Instagram
ReviewsSection + InstagramSection bleiben weiter unten; darüber dezenter „5.0 ★"-Streifen.

## 10. Final CTA
Vollflächige schwarze Section mit großer Claim-Headline + WhatsApp/Kontakt CTAs.

## Technisch
- Nur `src/routes/index.tsx` neu, plus 2–3 kleine Utility-Klassen in `src/styles.css` (Radial-Glow, Border-Gradient für „Beliebt").
- Bestehende Queries (`home-prices`, `home-team`, `home-first-aid`, offer-badge) bleiben.
- SEO `head()` + JSON-LD (DrivingSchool + aggregateRating) bleiben.
- Keine Backend-Änderungen, keine neuen Bilder, kein Auto-Hero-Bild.
- Mobile: sauber vertikal gestapelt, kein horizontaler Overflow (mit Playwright verifiziert).

## Nicht Teil dieses Plans
Andere Unterseiten (Preise, Team, Kontakt …) – falls gewünscht, mache ich die im Anschluss.
