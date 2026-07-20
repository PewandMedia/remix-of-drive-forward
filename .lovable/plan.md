## Ziel
Die `FilialeGallery` in ein modernes Bento-/Mosaik-Gitter umbauen (angelehnt an das Referenzbild) mit sanftem Scroll-Effekt.

## Änderungen (nur `src/components/site/FilialeGallery.tsx`)

**Neues Layout — asymmetrisches Bento-Grid (Desktop):**
- CSS Grid `grid-cols-4 grid-rows-2` mit fester Höhe (~520px).
- Bild 1 (Außenansicht) = großes Hero-Tile links: `col-span-2 row-span-2`.
- Bild 2 (Theorieraum) = oben rechts breit: `col-span-2 row-span-1`.
- Bild 3 (Empfang) = unten rechts breit: `col-span-2 row-span-1`.
- Gap 3, abgerundete Ecken (`rounded-3xl`), feiner Border + Shadow.

**Mobile:**
- Horizontales Snap-Scroll-Karussell (`flex overflow-x-auto snap-x snap-mandatory`), Karten `min-w-[80%]` mit `snap-center`, versteckte Scrollbar (`scrollbar-none`). Erlaubt seitliches Wischen wie im Beispiel.

**Hover / Feinschliff:**
- Bildunterschrift als Overlay unten mit Gradient (`from-black/70 to-transparent`), weiße Schrift, kleiner Kicker.
- `object-cover` + sanftes Zoom-in bei Hover (`group-hover:scale-105`).
- Beibehalt der `compact`-Prop und der Header-Sektion.

Keine anderen Dateien werden angefasst — die Komponente wird bereits auf Startseite, Über-uns und Kontakt eingebunden und übernimmt das neue Layout automatisch.