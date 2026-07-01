# Plan: Mobile-Ansicht kompakter — alles nebeneinander wie Desktop

## Ziel
Auf Mobile soll deutlich weniger gescrollt werden. Karten, die aktuell untereinander stapeln (`grid-cols-1`), rücken auf 2 Spalten nebeneinander — genau wie auf Desktop, nur kleiner skaliert. Nur wirklich große Blöcke (Hero-Headline, Standortkarten mit vielen Infos) bleiben einspaltig.

## Änderungen in `src/routes/index.tsx`

### 1. Hero-Bereich
- Rechte Spalte: Logo-Panel + Stat-Bento sichtbar auf Mobile (aktuell teils versteckt / gestapelt)
- Bento-Karten: von `grid-cols-1` auf `grid-cols-2` ab `sm:` — 5,0★, Filialen, Klassen, Anmeldung nebeneinander in 2×2
- H1-Größen auf Mobile leicht reduzieren, damit rechte Spalte Platz bekommt
- Trust-Row unter CTAs: `grid-cols-2` statt Stack

### 2. Fahrschulklassen-Teaser (Preise B / B197 / B78)
- Von `grid-cols-1 md:grid-cols-3` → `grid-cols-3` ab Mobile (kompakte Karten, kleinere Innenpaddings auf Mobile)
- Padding/Textgrößen mobile-tauglich reduzieren, damit 3 Karten in einer Reihe passen

### 3. Stat-Bento (5,0★, 549 Bewertungen, Filialen, Klassen)
- Immer 2 Spalten auf Mobile (`grid-cols-2`), nie einspaltig

### 4. Prozess „So geht's" (4 Schritte)
- Von `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → `grid-cols-2 lg:grid-cols-4` (2×2 auf Mobile statt 4×1)

### 5. Erste-Hilfe-Teaser
- Split-Card: Info-Bento (50€, 1 Tag, monatlich, TÜV) auf Mobile als `grid-cols-2` statt `grid-cols-1`
- Text + Icon-Bento nebeneinander schon ab `sm:` (nicht erst `lg:`)

### 6. Team-Teaser
- Ilkay-Hero-Karte bleibt full width
- Restliche Mitglieder: `grid-cols-2` auf Mobile (aktuell 1 Spalte) → 4-6 statt 12 Scroll-Blöcke

### 7. FAQ-Teaser
- Bleibt einspaltig (Accordion braucht volle Breite) — kein Change

### 8. Standorte
- LocationCards: `grid-cols-1 md:grid-cols-2` beibehalten — Karten sind zu inhaltsreich für 2 Spalten auf Mobile
- Alternative: kompakte Version mit `compact` Prop nebeneinander — **offene Frage unten**

### 9. Trust-Strip (8 Icons)
- Von `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8` → `grid-cols-4 sm:grid-cols-4 lg:grid-cols-8` (4×2 auf Mobile)

### 10. Reviews + Instagram
- Innere Grids der Sub-Sections auf 2 Spalten Mobile prüfen (falls aktuell 1)

### 11. Final CTA
- CTA-Buttons nebeneinander (`grid-cols-2`) statt gestapelt

## Technisch
- Nur `src/routes/index.tsx` + evtl. minimale Anpassungen in `ReviewsSection.tsx` / `InstagramSection.tsx` falls dort auch `grid-cols-1` steht
- Kein Backend, keine neuen Assets
- Verifikation per Playwright: Mobile 390×1800 + Desktop 1280×1800 Screenshot, Scrollhöhe vorher/nachher vergleichen

## Offene Frage
Sollen die **Standortkarten** (Brückstraße + Herner Str.) auf Mobile auch nebeneinander (kompakt, weniger Details sichtbar) oder untereinander (volle Info) bleiben?
