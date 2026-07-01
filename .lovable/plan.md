# Plan: Startseite komplett neu – modern, lukrativ, SEO stark

## Ziel
Die Startseite (`src/routes/index.tsx`) wirkt aktuell flach und der SEO‑optimierte Fließtext (Bochum / Herne / NRW) ist verloren gegangen. Ich baue die Seite optisch komplett neu auf – hochwertig, modern, mit klaren CTAs – und bringe den vollständigen SEO‑Text zurück.

## 1. Hero – premium & lukrativ
- Zweispaltig auf Desktop, gestapelt auf Mobile, ohne Auto-Bild-Chaos.
- Große editoriale Headline mit rotem Akzentwort, darüber ein „5.0 ★ · 549 Google‑Bewertungen“ Badge (klickbar).
- Sub‑Headline mit klarer Value‑Proposition (Bochum, Herne, NRW, Klasse B/B197/B78).
- 3 CTAs: WhatsApp (primary rot), Preise ansehen (schwarz), Beratung (outline).
- Rechte Spalte: elegante „Stat‑Karte“ Bento (5.0 ★, 549 Bewertungen, 2 Filialen Bochum, Anmeldung in Minuten) – ohne Auto-Foto.
- Hintergrund: dezenter Dot‑Grid + weicher roter Radial‑Glow (dezent, kein „Fleck“).

## 2. SEO‑Textblock zurück
Neuer Section „Deine Fahrschule in Bochum, Herne & NRW“ mit ausformuliertem Fließtext (2 Absätze) inkl. Keywords: Fahrschule Bochum, Führerschein Bochum, Fahrschule Herne, NRW, Klasse B, B197, B78, Automatik, Schalter, Erste‑Hilfe‑Kurs, Sehtest, TÜV. Als lesbarer Prose‑Block, nicht versteckt.

## 3. Preise‑Teaser – aufgewertet
- Gleiche 3 Karten, aber mit weicheren Schatten, Hover‑Lift, feinem Border‑Gradient bei „Beliebt“, roter Badge „Aktion läuft“ nur wenn aktiv.
- „Ab“‑Preis größer, sekundäre Info in Muted.

## 4. Erste‑Hilfe‑Kurs Teaser
- Split‑Card mit rotem Kreuz‑Icon Grid, 3 Info‑Stats (50 €, 1 Tag, monatlich), CTA.
- Kein leeres Placeholder‑Herz mehr – stattdessen Icon‑Bento (Heart, ShieldCheck, Calendar) mit rotem Cross‑Motiv.

## 5. Team‑Teaser
- Kleine, elegante Karten (rundes Foto, Name, Rolle), max 4 nebeneinander, CTA „Ganzes Team ansehen“.

## 6. Standorte
- Zwei LocationCards nebeneinander, mit Öffnungszeiten & „Route öffnen“.

## 7. FAQ‑Teaser
- Accordion mit Top 3 Fragen, darunter Link zur FAQ‑Seite.

## 8. Reviews + Instagram
- ReviewsSection bleibt (weiter unten), darunter InstagramSection.
- Direkt darüber ein dezenter „5.0 ★ Google‑Bewertungen“ Streifen.

## 9. Final CTA
- Vollflächige schwarze Section mit großer Claim‑Headline, WhatsApp + Kontakt CTA.

## Technisch
- Nur `src/routes/index.tsx` und ggf. kleine Utility‑Klassen in `src/styles.css` (weicher radialer Glow, Border‑Gradient für „Beliebt“).
- Keine Backend‑Änderungen, keine neuen Bilder.
- Bestehende Queries (`home-prices`, `home-team`, `home-first-aid`) bleiben unverändert.
- Metadaten `head()` bleiben; SEO‑JSON‑LD (`DrivingSchool` + `aggregateRating`) bleibt.

## Nicht Teil dieses Plans
- Andere Unterseiten (Preise, Team, Kontakt etc.) – nur wenn du willst, mache ich die im Anschluss.
