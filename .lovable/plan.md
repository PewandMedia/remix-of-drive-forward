## Ziel
Bilder in `FilialeGallery` vollständig sichtbar machen (kein Anschnitt) und einen Lightbox-Viewer mit Wisch-/Klick-Navigation zwischen allen 3 Bildern ergänzen.

## Änderungen (nur `src/components/site/FilialeGallery.tsx`)

**1. Bilder nicht mehr anschneiden**
- `object-cover` → `object-contain` in den Tiles, Tile-Hintergrund neutral (`bg-neutral-100`), damit das komplette Foto sichtbar bleibt.
- Desktop-Bento wird höher (`h-[640px] lg:h-[720px]`) und nutzt das Original-Seitenverhältnis der Fotos.
- Mobile: Karten-Verhältnis auf `aspect-[4/3]` (statt 4/5), damit die Landscape-Fotos vollständig hineinpassen.
- Caption bleibt als Overlay, aber mit weißem Hintergrund-Balken statt Gradient über dem Motiv, damit nichts verdeckt wird.

**2. Klickbar + Lightbox mit Swipe**
- Jedes Tile wird ein `<button>` → öffnet ein Fullscreen-Modal (fixed inset-0, schwarzes Overlay).
- Modal zeigt aktuelles Bild groß mit `object-contain`, Caption, Pfeil-Buttons links/rechts, Zähler (1/3), Close-X, Klick-außerhalb schließt.
- **Swipe** via Touch-Handler (`onTouchStart`/`onTouchEnd`, Schwellwert 50px) für Mobile.
- **Tastatur**: `←`/`→` navigieren, `Esc` schließt.
- State: `openIndex: number | null`; öffnet mit dem geklickten Index.

Keine anderen Dateien betroffen.