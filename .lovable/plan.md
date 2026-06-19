## Ziel
Das aktuelle Hero-Auto-Bild auf der Startseite wird durch das hochgeladene Bild ersetzt. Das Auto fährt beim Seitenaufruf von links in die Hero-Sektion hinein (Animation).

## Schritte

### 1. Neues Asset anlegen
- Quelldatei: `/mnt/user-uploads/selected-element-screenshot.jpg`
- Als Lovable Asset hochladen mit sinnvollem Dateinamen
- Neue Asset-Pointer-Datei anlegen (z. B. `src/assets/miro-car-hero.asset.json`)

### 2. CSS-Animation hinzufügen (`src/styles.css`)
Neues `@keyframes driveInLeft` definieren:
- Start: außerhalb links (`translateX(-120%)`) mit leichter Neigung (`rotate(-4deg)`)
- Ende: finale Position (`translateX(0) rotate(0deg)`) mit leichtem Überschwingen (Overshoot), damit es sich anfühlt wie ein anhaltendes Auto
- Dauer ca. 1.0–1.2 s, Easing mit Overshoot (z. B. `cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Dazu eine passende `@utility`-Klasse `animate-drive-in-left`

### 3. Hero-Sektion anpassen (`src/routes/index.tsx`)
- Import des alten `carAsset` ersetzen durch den neuen Asset-Pointer
- Das `<img>`-Element bleibt an derselben Stelle rechts neben dem Text (2-Spalten-Layout)
- Den Wrapper um das Bild (`<div className="relative">`) um eine `overflow-hidden` ergänzen (damit das Auto beim Start wirklich unsichtbar ist)
- Die neue Animations-Klasse `animate-drive-in-left` auf das Bild oder seinen Wrapper anwenden

### 4. Unverändert bleibt
- `src/routes/ueber-uns.tsx` behält das alte `miro-car.png`-Asset (kein Seiteneffekt)
- Layout und Text der Hero-Sektion bleiben gleich
- Keine neuen npm-Pakete nötig (pure CSS-Animation)