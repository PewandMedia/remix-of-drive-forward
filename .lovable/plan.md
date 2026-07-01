# Hero-Sektion – Spektakulär statt langweilig

## Problem
- Auto ist gespiegelt (Beschriftung/Front falsch herum)
- Auto wirkt zu klein neben dem Text
- Hintergrund ist flach, kein "Wow-Effekt"

## Plan

**1. Auto entspiegeln & neu generieren (HD)**
- Ein neues, hochauflösendes KI-Bild vom MIRO-DRIVE Mercedes generieren, das originalgetreu ausgerichtet ist (Front nach links, Fahrerseite sichtbar – wie auf dem echten Auto der Fahrschule).
- Transparenter Hintergrund, cineastische Studio-Beleuchtung, tiefes Rot als Akzent, scharfe Reflexionen auf Lack.
- Speichern als `src/assets/hero-car.png` (überschreibt das aktuelle, gespiegelte Bild).

**2. Layout kippen – Auto dominiert**
- Grid-Verhältnis von `1fr_1.4fr` auf `1fr_1.7fr` (Desktop) erhöhen → Auto bekommt deutlich mehr Fläche.
- `scale-150` auf Desktop (statt 1.1) und leichtes Herausragen nach rechts (`-mr-32 lg:-mr-40`), damit das Auto aus dem Container "herausbricht".
- Auf Mobile weiterhin nebeneinander, aber Auto größer (`scale-[1.7]`).

**3. Spektakuläre Visual-Effekte**
- **Kinetic Speed Lines:** Rote diagonale Speedstripes hinter dem Auto (nur dekorativ, `pointer-events-none`), die Bewegung suggerieren.
- **Radialer Red-Glow:** Deutlich stärkerer, gesättigter Glow (`bg-[radial-gradient]` mit `primary/40`) hinter dem Auto.
- **Bodenschatten / Reflektion:** Elliptischer Schatten unter den Reifen für Grounding + spiegelnde Fläche darunter (CSS `mask-image` Gradient).
- **Grid-Textur:** Dezenter Dot-Pattern-Hintergrund für "Studio-Feel".
- **Drive-In Animation verstärken:** Längerer, sanfterer Einfahr-Effekt aus rechts mit leichtem Bounce.
- **Hover-Interaktion:** Auto skaliert bei Hover minimal (`hover:scale-[1.72]`, transform-transition), leichter Neigungs-Effekt.

**4. Text-Balance**
- Headline größer (`xl:text-8xl`), aber Zeilenumbrüche optimieren, damit nichts kollidiert.
- Kontrast der Trust-Badges leicht anheben.

## Technische Details
- Datei: `src/routes/index.tsx` – nur der `<section>`-Hero-Block (Zeilen ~114–176)
- Datei: `src/styles.css` – neue Utility `.hero-speedlines` + verstärkte `@keyframes driveInRight`
- Asset: `src/assets/hero-car.png` via `imagegen--generate_image` mit Referenz auf das Original-Foto neu erstellen (transparenter Hintergrund, PNG)

Keine Änderungen an Datenlogik, SEO-Metadaten oder anderen Sektionen.
