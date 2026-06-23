## Ziel
- "Angebote"-Seite & -Sektion komplett entfernen. Angebote werden ab jetzt direkt in den Preisen verwaltet/markiert.
- Inhaber kann im Admin-Panel die Preise mit einem optionalen Angebots-Status versehen (z. B. alter Preis durchgestrichen + neuer Aktionspreis). Ist ein Angebot aktiv, wird das auf der Preise-Seite, auf den Preis-Karten der Startseite und im Header sichtbar gemacht.
- Reviews-Sektion ist aktuell sehr weit oben. Sie wandert weiter nach unten. Stattdessen kommt weiter oben ein dezenter "5,0★ · 549 Google-Bewertungen"-Hinweis (Inline-Badge), der nebenbei auf die guten Bewertungen aufmerksam macht.

## Was geändert wird

### 1. Angebote entfernen
- `src/routes/angebote.tsx` löschen.
- Aus `src/lib/contact.ts` `NAV_LINKS` den Eintrag "Angebote" entfernen (Header- und Footer-Nav).
- Aus `src/routes/index.tsx` die ganze Sektion `CURRENT OFFERS` entfernen, inkl. `homeOffers`-Query, `OfferFlyer`-Import und nicht mehr benötigter Lucide-Icons.
- Aus dem Admin-Panel (`src/routes/_authenticated/admin.tsx`) den `Angebote`-Tab + `OffersAdmin`/`OfferDialog` entfernen.
- Tabelle `offers` bleibt in der DB unangetastet (kein Migration-Risiko), wird aber nirgendwo mehr gelesen/geschrieben.

### 2. Angebot pro Preis (neues Feature)
Migration auf `public.prices`: drei neue optionale Spalten:
- `old_price text` — durchgestrichener Originalpreis
- `offer_label text` — kurzes Label, z. B. "Aktion", "-30%", "Sommer-Special"
- `offer_active boolean default false` — Schalter

Admin-Panel `PriceDialog` bekommt zusätzliche Felder: "Angebot aktiv" (Switch), "Aktionspreis-Label", "Alter Preis". Wenn `offer_active` an ist und `old_price` gefüllt, wird im Frontend in `preise.tsx` und in den Preis-Karten der Startseite (`PRICE_CLASSES` in `index.tsx`) der alte Preis durchgestrichen, der neue Preis rot/auffällig dargestellt, plus kleines "Aktion"-Badge.

Globaler Indikator: Ein neuer kleiner Query (`active_offer_prices`) liefert die Anzahl der Preise mit `offer_active = true`.
- **Header (`Navbar.tsx`)**: Wenn > 0, erscheint neben dem "Preise"-Link ein kleiner roter Punkt + dezentes "Aktion"-Pill.
- **Startseite (`index.tsx`)**: Im "Preise & Klassen"-Block oben ein kleines pulsierendes "Aktuelle Aktion läuft"-Badge neben dem Eyebrow.

### 3. Reviews neu positionieren
- `<ReviewsSection />` wird in `src/routes/index.tsx` **weiter unten** platziert (nach "ERSTE HILFE KURS TEASER", vor "TEAM TEASER" oder ganz unten vor dem CTA – konkret: direkt nach dem Erste-Hilfe-Teaser).
- Oben im Hero-Bereich (rechts unter den CTA-Buttons) kommt ein dezenter Inline-Badge: kleines Google-G-Icon + "5,0 ★ · 549 Google-Bewertungen" als Link zum Google-Profil. Nicht aufdringlich, eher "by the way".
- Optional zusätzlich in der Navbar später – ist aber **nicht** Teil dieses Plans, um den Header nicht zu überladen.

### 4. Saubere Aufräumarbeiten
- Aus `OfferFlyer.tsx` bleibt im Repo, aber wird nirgends mehr importiert (keine Code-Pflicht, kann später entfernt werden).
- Trust-Strip-Eintrag "Individuelle Angebote" bleibt – passt weiter inhaltlich.

## Out of Scope
- Keine Änderung an Reviews-Texten oder Optik der Sektion selbst.
- Kein Löschen der `offers`-DB-Tabelle.
- Keine Änderung an Team-/FAQ-/Kontakt-/Erste-Hilfe-Routen.
- Keine Änderung an Farben/Fonts/globalem Layout.

## Technische Hinweise
- Eine einzige Supabase-Migration für die drei neuen Spalten + ggf. Re-Grant.
- Schemaänderung → Typen werden danach regeneriert; Code, der die neuen Felder liest, folgt nach Migration.
