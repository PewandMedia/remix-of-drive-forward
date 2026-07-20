## Änderungen an `src/routes/index.tsx`

### 1. Sprachen-Strip symmetrisch mit zentrierten Flaggen
Im `LanguageStrip` (Zeilen 220–253):
- Layout auf **zentrierte, symmetrische Anordnung** umstellen: Label „Wir beraten & unterrichten in" oben zentriert, darunter alle 5 Sprachen in einer gleichmäßigen Reihe (5 Spalten) **zentriert nebeneinander** – Desktop und Mobile identisch strukturiert, nur Skalierung anders.
- `LanguageChip`: Flagge **oben zentriert**, Label darunter zentriert (statt Flagge-links / Text-rechts). Gleiche Chip-Breite für alle 5 Sprachen (`grid-cols-5` mit `justify-items-center`), damit optisch alles bündig sitzt.
- Kurdistan-Flagge (SVG) in gleicher Größe wie die Emoji-Flaggen darstellen, damit die Reihe wirklich symmetrisch wirkt.

### 2. Hero-Video: Browser-Steuerbuttons entfernen
Die zwei Buttons, die beim Antippen erscheinen, sind die nativen Video-Controls des Browsers (Play/Pause + Fullscreen/PiP auf iOS). Fix im `<video>`-Element (Zeilen 143–154):
- `controls={false}` explizit setzen, `disablePictureInPicture` und `controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"` ergänzen.
- Über dem Video eine transparente `pointer-events-none`-Overlay-Schicht legen, damit Taps das Video nicht mehr aktivieren können – das Video läuft dauerhaft im Loop, ohne dass Steuerelemente auftauchen.
- `onContextMenu`-Handler zum Blockieren des Rechtsklick-Menüs.

Keine Änderungen an Business-Logik, Datenquellen oder anderen Sektionen.