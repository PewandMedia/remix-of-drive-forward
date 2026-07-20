Drei neue Fotos der Fahrschule (Außenansicht, Theorieraum, Empfang/Büro) werden als Assets hochgeladen und an passenden Stellen platziert.

## Assets
- Upload aller drei Bilder via `lovable-assets` nach `src/assets/`:
  - `filiale-aussen.jpg` (Außenansicht)
  - `theorieraum.jpg` (Theorieraum)
  - `empfang.jpg` (Empfang/Büro)

## Platzierung

**1. Über uns (`src/routes/ueber-uns.tsx`)**
- Ersetze das einzelne `miro-car.png` in der rechten Spalte durch eine Foto-Collage: großes Bild oben (Außenansicht), darunter zwei kleinere nebeneinander (Theorieraum + Empfang), jeweils mit `rounded-2xl` und leichtem Border.
- Neue Sektion „Unsere Filiale in Bochum" unterhalb des Grids mit den 3 Bildern in einer responsiven Galerie (1 Spalte mobil, 3 Spalten Desktop), jedes mit kleiner Bildunterschrift (Außenansicht / Theorieraum / Empfang & Beratung).

**2. Kontakt (`src/routes/kontakt.tsx`)**
- Kompaktes Bild-Trio oberhalb der Location-Cards mit den drei Fotos, jeweils mit Bildunterschrift – gibt Besuchern visuellen Kontext zur Filiale.

**3. Startseite (`src/routes/index.tsx`)**
- Neue schlanke Sektion „So sieht deine Fahrschule aus" vor dem Team-Bereich: 3-Spalten-Grid (Desktop) / horizontales Scroll (Mobile) mit den drei Bildern, dezentem weißen Hintergrund, passend zum aktuellen cleanen Design – kein Glow.

Alle Bilder mit sinnvollen `alt`-Texten (SEO: „Fahrschule MIRO-DRIVE Bochum Außenansicht" etc.) und `loading="lazy"`.

Keine Änderungen an Datenbank, Business-Logik oder Backend.