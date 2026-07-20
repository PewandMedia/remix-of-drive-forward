## Fixes

### 1. Lazy-Loading entfernen
Alle `loading="lazy"` Attribute aus Bildern entfernen, damit nichts mehr nachpoppt:
- `src/routes/index.tsx` (2×), `src/routes/ueber-uns.tsx`, `src/routes/leistungen.tsx`, `src/routes/erste-hilfe-kurs.tsx`
- `src/components/site/OfferFlyer.tsx`, `TeamCard.tsx`, `InstagramSection.tsx`, `FilialeGallery.tsx`
→ Eager laden, damit Bilder direkt beim Scrollen sichtbar sind.

### 2. Smoothes Scrolling
In `src/styles.css` global aktivieren:
```css
html { scroll-behavior: smooth; }
```

### 3. Hero-Video: Play-Button beim Loop entfernen
In `src/routes/index.tsx` (Hero-Video, Zeile ~136):
- `onPlay`, `onSeeked`, `onEnded` Handler ergänzen, die den nativen Playback-Button verhindern:
  - `video.controls = false`
  - bei jedem Loop-Restart `video.play()` sofort wieder auslösen
- Fangschicht (`z-30`) auf `pointer-events-auto` setzen und `onMouseMove`/`onClick` abfangen, damit Opera/Chromium keine „Resume"-Overlay einblenden können.
- Zusätzliche CSS-Regel für alle Media-Control-Pseudo-Elemente (`::-webkit-media-controls-overlay-play-button`, `::-internal-media-controls-overlay-cast-button`) global in `src/styles.css` hinzufügen mit `display: none !important`.

Nur diese drei Punkte, kein weiterer Umbau.
