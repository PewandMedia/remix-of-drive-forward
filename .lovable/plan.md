## Ziel
Das Hero-Bild auf der Startseite wirkt klein, verpixelt und passt nicht zum Layout. Es soll durch ein neues, hochwertiges KI-generiertes Bild ersetzt und die Hero-Sektion visuell aufgewertet werden.

## Umsetzung

### 1. Neues KI-Hero-Bild generieren
- Tool: `imagegen--generate_image` mit `standard` Qualität
- Format: 1536×1024 (breit, hochauflösend statt klein/pixelig)
- Pfad: `src/assets/hero-car.jpg`
- Motiv: Modernes weißes Mercedes-A-Klasse-Fahrschulauto im 3/4-Frontwinkel, dynamische Pose, dezente rote Akzente (passend zur Brand), saubere Studio-Lichter, weicher Schatten, transparenter/heller Hintergrund passend zum hellen Hero-Bereich
- Realistische Fotografie-Optik, keine Schrift im Bild

### 2. Hero-Layout in `src/routes/index.tsx` (Zeilen 116–153) verbessern
- Bild **größer und dominanter** darstellen: aus der schmalen Spalte ausbrechen, leichte Überlappung mit der rechten Bildschirmkante (z. B. `lg:-mr-12 xl:-mr-24`)
- `aspect`-Wrapper entfernen, Bild als `object-contain` in voller Höhe
- Neuer dekorativer Hintergrund hinter dem Bild: großer roter Kreis-Glow + diagonaler schwarzer Streifen für mehr Visualgewicht
- Mindesthöhe des Hero-Bereichs (`min-h-[600px] lg:min-h-[720px]`), damit Bild nicht winzig wirkt
- Bild-Asset wechseln von `miro-car-hero.jpg.asset.json` auf das neue `@/assets/hero-car.jpg`
- `drive-in-left` Animation beibehalten

### 3. Bildqualität sicherstellen
- `loading="eager"` und `fetchPriority="high"` für Hero
- `width`/`height` Attribute setzen, damit kein Layout-Shift
- Kein `drop-shadow-2xl` auf transparentes PNG (bleibt aber bei JPG ok)

## Dateien
- **neu**: `src/assets/hero-car.jpg` (KI-generiert)
- **geändert**: `src/routes/index.tsx` (nur HERO-Section, Zeilen 116–153)

## Nicht im Scope
- Keine Änderung an Headline-Texten, CTAs oder Trust-Strip
- Keine Änderung an anderen Sektionen
- Altes Asset `miro-car-hero.jpg.asset.json` bleibt unangetastet (kann später aufgeräumt werden)