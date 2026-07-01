# Kontakt-Seite Redesign

## Ziel
Die Kontakt-Seite soll auf Mobilgeräten kompakter sein (weniger Scrollen) und visuell spektakulärer wirken – konsistent mit dem Premium-Look der Startseite.

## Änderungen

### 1. Standorte nebeneinander auf Mobile
- LocationCard-Grid auf `grid-cols-2 gap-4` ab der kleinsten Bildschirmgröße umstellen (statt aktuell `grid gap-6 lg:grid-cols-2`, was auf Mobile 1 Spalte ergibt).
- LocationCard-Inhalte komprimieren für Mobile:
  - Kürzere Adress-Anzeige, kleinere Schrift (`text-xs` / `text-[11px]`).
  - Bürozeiten kompakter (z. B. nur Di–Do. und Fr. anzeigen, oder mit `line-clamp`).
  - CTA-Buttons (Route, Anrufen, WhatsApp) als 3er-Reihe beibehalten, aber kompaktere Padding/Schrift.

### 2. Kontakt-Widgets (WhatsApp, Telefon, E-Mail, Social) auf Mobile 2×2-Grid
- Aktuell: 4 untereinander auf Mobile (`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`).
- Neu: `grid-cols-2` auf Mobile, damit auch hier weniger Scrollen nötig ist.

### 3. Visuelles Upgrade – spektakuläreres Design
- **Hero-Bereich:** Den PageHero mit einem lebenden roten Gradient-Blob (wie auf der Startseite) hinterlegen, statt nur dem statischen roten Streifen. Subtiler Glow-Effekt im Hintergrund.
- **Standort-Karten:**
  - Icon-Hintergründe mit rotem Gradient-Ring (wie auf der Preis-Seite).
  - Subtiler Hover-Lift (`hover:-translate-y-1`) beibehalten, aber mit sanftem rotem Schlagschatten (`shadow-[0_8px_30px_-8px_rgba(...)]`).
  - Adresse und Öffnungszeichen mit einer feinen Trennlinie statt schlichter Border.
- **Kontakt-Widgets:** Statt simpler weißer Karten mit Icon-Rundchen → Karten mit leichtem Glassmorphism-Effekt (subtiler Hintergrund-Blur, feiner Border-Glow), Icons mit animiertem Puls-Glow bei Hover.
- **Farbe & Tiefe:** Statt flacher `bg-white`-Karten: leichte Verlaufs-Töne vom Hintergrund zur Karte, mehr Kontrast durch den Brand-Rot-Akzent.

### 4. Hinweis-Box stylen
- Die gelbliche Info-Box („Anmeldung nur persönlich...“) aufwerten: statt `bg-primary/5` + `border-primary/20` → ein auffälligeres, aber elegantes Highlight. Z. B. dunkler Hintergrund mit rotem Link-Rand, oder ein auffälligeres Icon mit Puls.

## Technische Details
- Keine neuen Pakete nötig, alles mit Tailwind v4 + bestehenden CSS-Utilities (`animate-blob`, `gradient-border-featured`, etc.) umsetzbar.
- Änderungen in `src/routes/kontakt.tsx` und ggf. `src/components/site/LocationCard.tsx`.

## Dateien
- `src/routes/kontakt.tsx`
- `src/components/site/LocationCard.tsx`
