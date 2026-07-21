## Änderungen in `src/components/site/FilialeGallery.tsx`

1. **Bilder reduzieren im Autos-Tab**: Nur `auto-2.jpg` (Heckansicht) und `auto-5.jpg` (Auf der Straße) behalten. Die anderen 4 Einträge entfernen.

2. **Caption-Overlay entfernen**: Da bei 2 Bildern die aktuelle Mosaik-Logik (`images.length >= 3`) sonst den EmptyState zeigen würde, das Grid so anpassen, dass es auch bei 2 Bildern funktioniert – zwei gleich große Kacheln nebeneinander (Desktop) bzw. gestapelt/2-Spalten (Mobil).

3. **Untere Bildbeschreibung entfernen**: Den dunklen Gradient-Overlay mit Kicker + Caption in der `Tile`-Komponente ausblendbar machen (neuer Prop `showCaption`, default `true`), und für den Autos-Tab auf `false` setzen. Rathaus/Riemke bleiben unverändert mit Overlay.

4. Lightbox bleibt funktionsfähig (Klick öffnet Bild groß, Beschreibung nur dort sichtbar).
