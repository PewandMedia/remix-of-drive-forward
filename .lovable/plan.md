## Ziel
Eine prominente Bewertungs-Sektion auf der Startseite, die das Google-Rating von Miro-Drive als Vertrauenssignal nutzt und Besucher direkt zum Google-Bewertungsformular leitet.

## Wichtig zu wissen
Eine Bewertung **direkt von der Webseite an Google Maps zu senden ist nicht möglich**. Google bietet dafür keine API – Bewertungen können ausschließlich von eingeloggten Google-Nutzern direkt auf Google Maps abgegeben werden. Das ist auf allen Webseiten so (auch bei großen Marken).

Lösung: Ein "Jetzt bei Google bewerten"-Button, der direkt das Google-Bewertungsformular für Miro-Drive öffnet (vorausgefüllt, mit 1 Klick auf Sterne klickbar). Das ist der schnellste legitime Weg.

## Was gebaut wird

### 1. Neue Sektion auf der Startseite (`src/routes/index.tsx`)
Platzierung: zwischen "TRUST STRIP" und "PREISE TEASER" – also weit oben, sichtbar ohne Scrollen auf Desktop.

Inhalt:
- Großes Eyebrow: "Bewertet von unseren Fahrschülern"
- Headline: "5,0 ★ bei über 549 Google-Bewertungen"
- 5 große rote Sterne (Lucide `Star` ausgefüllt)
- Untertitel: kurze Vertrauensaussage ("Die bestbewertete Fahrschule in Bochum…")
- 3 echte Beispiel-Reviews als Karten (aus Screenshot: Shahin Rahman, U. Mur., S.) mit Avatar-Initialen, Sternen, Auszug, "Google"-Badge
- Zwei CTAs:
  - **Primary:** "Jetzt bei Google bewerten" → öffnet Google-Bewertungsdialog
  - **Secondary:** "Alle 549 Rezensionen lesen" → öffnet Google-Profil

### 2. Eigene Mini-Sektion auf der Team-Seite (`src/routes/team.tsx`)
Kompakter 5,0★-Badge unter dem Page-Hero ("Ausgezeichnet vom Team mit 5,0★ bei 549 Bewertungen") – verstärkt das Vertrauenssignal genau dort, wo Besucher das Team kennenlernen.

### 3. Konstanten in `src/lib/contact.ts`
Hinzufügen:
- `googleReviewUrl` – direkter Link zum Bewertungsformular
- `googleProfileUrl` – Link zum Google-Profil mit allen Reviews
- `googleRating: "5.0"`, `googleReviewCount: 549`

Die Bewertungs-URLs werden anhand der Google Place ID von "Fahrschule Miro-Drive Inh. Ilkay Altin" gebaut (Standard-Format: `https://search.google.com/local/writereview?placeid=…` bzw. `https://search.google.com/local/reviews?placeid=…`). Falls die Place ID nicht eindeutig auffindbar ist, nutze ich als Fallback den Google-Maps-Such-Link auf den Geschäftsnamen.

### 4. Optional / nice-to-have
JSON-LD `AggregateRating` Schema im `head()` der Startseite – dadurch zeigt Google in den Suchergebnissen die Sterne unter dem Link an (SEO-Boost). Lokal definiert via `scripts: [{ type: "application/ld+json", children: ... }]`.

## Out of Scope
- Keine eigene Review-Datenbank, kein eigenes Formular, kein Speichern von Bewertungen im Backend.
- Keine automatische Synchronisation der Reviews von Google (Google Places API erlaubt nur 5 Reviews und das gegen Bezahlung – für später, wenn gewünscht).
- Keine Änderung an Farben/Fonts/Layout anderer Sektionen.
