## Ziel

Die komplette MIRO-DRIVE Website wird SEO-optimiert für Bochum **und Umgebung** (Herne, Wattenscheid, Witten, Castrop-Rauxel, Hattingen, Gelsenkirchen, allgemein NRW/Ruhrgebiet). Texte bleiben natürlich, seriös und verkaufsstark. Design (Weiß/Rot/Schwarz, modern, klare Buttons) bleibt unverändert – nur Inhalte, Meta-Daten, Überschriften-Struktur und interne Verlinkung werden überarbeitet.

## Umfang (nur Frontend/Content – keine Backend-Änderungen)

### 1. Meta-Daten (`head()` in jeder Route)
Jede Route bekommt eigenen `title`, `description`, `og:title`, `og:description`, `og:url`, `canonical`. Genau wie im Briefing:
- `/` → „Fahrschule Bochum | MIRO-DRIVE – Führerschein Klasse B & B197"
- `/preise` → „Preise Fahrschule Bochum | MIRO-DRIVE"
- `/leistungen` → „Führerschein Bochum | Klasse B, B197 & Fahrstunden | MIRO-DRIVE"
- `/erste-hilfe-kurs` → „Erste-Hilfe-Kurs Bochum für Führerschein | MIRO-DRIVE"
- `/team` → „Team Fahrschule Bochum | MIRO-DRIVE"
- `/kontakt` → „Kontakt Fahrschule Bochum | MIRO-DRIVE"
- `/ueber-uns` → „MIRO-DRIVE – moderne Fahrschule in Bochum"
- `/faq` → „FAQ Fahrschule Bochum | MIRO-DRIVE"

Zusätzlich JSON-LD:
- `__root.tsx`: `LocalBusiness` / `DrivingSchool` Schema mit beiden Standorten, Öffnungszeiten, `aggregateRating` (5,0 / 549 Bewertungen), `areaServed` (Bochum, Herne, Wattenscheid, Witten, Castrop-Rauxel, Hattingen, Gelsenkirchen, NRW).
- `/faq`: `FAQPage` Schema.

### 2. Neue Route `/angebote`
Neue Datei `src/routes/angebote.tsx` mit Headline, Text und WhatsApp-CTA laut Briefing. Wird in Navigation und Footer verlinkt.

### 3. Content-Überarbeitung pro Seite
Alle Texte gemäß Briefing, angereichert um Umgebungsstädte:
- **Startseite** (`src/routes/index.tsx` + Hero/Warum-Sektionen): Neue Hero-Headline, Subheadline, 3 CTAs, Trust-Text, „Warum MIRO-DRIVE"-Section mit 6 Karten. Erwähnung: „Bochum, Herne, Wattenscheid und Umgebung im Ruhrgebiet". 549-Bewertungen-Badge deutlicher als Social Proof.
- **Preise** (`src/routes/preise.tsx`): Neue H1, Sub, Text, Hinweisbox.
- **Leistungen** (`src/routes/leistungen.tsx`): 9 Leistungs-Blöcke laut Briefing.
- **Erste-Hilfe-Kurs** (`src/routes/erste-hilfe-kurs.tsx`): H1, Sub, Text, 5 Bulletpoints, CTA.
- **Team** (`src/routes/team.tsx`): Neue H1, Sub, Intro-Text.
- **Kontakt** (`src/routes/kontakt.tsx`): Neue H1, Sub, Text, 5 CTA-Buttons.
- **Über uns** (`src/routes/ueber-uns.tsx`): Neue H1, Text mit Umgebung, Mission/Anspruch/Vorteil.
- **FAQ** (`src/routes/faq.tsx`): 7 Fragen als Accordion laut Briefing + zusätzliche „Fahrt ihr auch nach Herne / Wattenscheid?"-Frage.

### 4. H1-/Semantik-Struktur
Pro Seite genau **eine** `<h1>`. Sinnvolle `<h2>`/`<h3>` darunter. Bilder erhalten sprechende `alt`-Texte („Fahrschulauto MIRO-DRIVE Bochum", „Fahrschule Bochum Innenstadt" etc.).

### 5. Interne Verlinkung
- Startseite → Preise, Leistungen, Erste-Hilfe-Kurs, Angebote
- Preise → Kontakt, Angebote
- Leistungen → Erste-Hilfe-Kurs, Preise
- Angebote → WhatsApp, Kontakt
- Kontakt → Preise, Leistungen
- Erste-Hilfe-Kurs → Kontakt, Angebote

### 6. Navigation & Footer
`src/lib/contact.ts` `NAV_LINKS`: `/angebote` einfügen zwischen Leistungen und Erste-Hilfe-Kurs. Footer bekommt Link auf „Angebote" und behält Standorte + 549-Bewertungen-Hinweis.

### 7. sitemap.xml + robots.txt
- Neue Datei `src/routes/sitemap[.]xml.ts` mit allen öffentlichen Routen (relative URLs, `BASE_URL=""` mit TODO – da noch kein Custom Domain).
- Neue Datei `public/robots.txt` mit `User-agent: * / Allow: /`.

### 8. Was **nicht** angefasst wird
- Backend / Supabase / RLS
- Design-Tokens, Farben, Fonts, Layout-Struktur
- Admin-Bereich, Instagram-Section (Carousel bleibt wie zuletzt gebaut)
- WhatsApp-Float (bleibt unten rechts)
- Logo, Bilder, Team-Fotos

## Technische Details

- Alle `head()`-Änderungen folgen dem TanStack-Pattern (title als `meta`-Entry, `canonical` nur auf Leaf-Routen, `og:url` relativ).
- Keine neuen Packages. Keine `.env`-Änderungen.
- Keine Änderung an `routeTree.gen.ts` (wird automatisch regeneriert, sobald `angebote.tsx` und `sitemap[.]xml.ts` existieren).
- Neue Route `/angebote` ist statisch (kein Loader, keine Auth).

## Ergebnis

Nach der Umsetzung ist die Website inhaltlich stark auf „Fahrschule Bochum" + Nachbarstädte optimiert, hat pro Seite eindeutige Meta-Daten, ein LocalBusiness- und FAQ-Schema, sauberes H1/H2, eine sitemap.xml und eine neue `/angebote`-Seite. Die 549 Google-Bewertungen werden über `aggregateRating` maschinenlesbar und über Trust-Elemente auf der Startseite sichtbar hervorgehoben.
