# Opera Video-Overlay-Button entfernen

## Problem
Der Pfeil-Button oben rechts über dem Hero-Video ist **kein Teil der Website**, sondern das Opera-Browser-eigene „Video-Popout"-Overlay. Opera (und teils Chrome/Safari) blenden diesen Button automatisch über jedem `<video>`-Element ein, sobald es groß genug ist. HTML-Attribute wie `disablePictureInPicture`, `controlsList`, CSS `::-webkit-media-controls` oder eine Klick-Fangschicht können das **nicht zuverlässig** unterdrücken — der Browser rendert den Button oberhalb des DOM.

## Lösung
Das `<video>`-Element wird **unsichtbar** ins DOM gehängt (0×0 px, `opacity:0`) und die Frames werden pro `requestAnimationFrame` in ein sichtbares `<canvas>` gezeichnet. Da der Browser den Popout-Button nur an sichtbare `<video>`-Elemente andockt, verschwindet der Button vollständig — in Opera, Chrome, Safari und Edge.

## Änderungen
**Datei:** `src/routes/index.tsx` (Hero-Video-Karte, Zeilen 133–172)

1. Neue kleine Komponente `HeroCanvasVideo` am Dateianfang (oder inline):
   - hält `<video>` versteckt (`className="sr-only"` bzw. `width={0} height={0}`)
   - `<canvas>` füllt die Karte via `object-cover`-äquivalentem Draw
   - `useEffect` startet `video.play()`, `requestAnimationFrame` zeichnet `ctx.drawImage(video, …)` mit Cover-Fit-Berechnung
   - Cleanup: `cancelAnimationFrame` + `video.pause()`
2. In der Hero-Karte `<video>…</video>` durch `<HeroCanvasVideo src={heroVideo.url} poster={heroPoster.url} />` ersetzen.
3. Klick-Fangschicht, Gradient-Overlay, Badges bleiben unverändert.

## Ergebnis
- Kein Popout-/Next-Button mehr über dem Hero-Video in Opera.
- Video läuft weiterhin automatisch, stummgeschaltet, im Loop.
- Poster bleibt sichtbar bis das erste Frame gezeichnet ist.
