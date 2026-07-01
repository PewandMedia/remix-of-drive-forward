## Diagnose
- **Desktop**: Auto ist zu klein und zu brav zentriert. Auf der Referenz (miro-drive.de) füllt das Auto fast die ganze Höhe der Sektion, überlappt leicht die Textspalte und wirkt dadurch dominant und premium.
- **Mobile**: Aktuell zwingt das 2-Spalten-Grid (`grid-cols-[1.1fr_1fr]`) Text und Bild nebeneinander → beides zu schmal, unlesbar, sieht kaputt aus.

## Ziel
- **Mobile (< sm)**: 1 Spalte, gestapelt – zuerst Text (Badge, Headline, Absatz, CTAs, Rating), danach Logo + Auto in voller Breite darunter.
- **Desktop (≥ lg)**: 2 Spalten, Auto dominant und groß, überlappt leicht in den Textbereich für den "echten" Hero-Look wie auf miro-drive.de. Logo dezent oberhalb des Autos.
- **Tablet (sm–lg)**: ebenfalls gestapelt, aber Auto größer.

## Änderungen (nur `src/routes/index.tsx`)

### 1. Grid → responsives Layout
- Ersetze `grid grid-cols-[1.1fr_1fr] ... sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1.1fr]` durch:
  - Mobile/Tablet: `flex flex-col` (Text oben, Auto unten).
  - `lg:grid lg:grid-cols-[1fr_1.25fr]` erst ab Desktop.
- Padding/min-h neu setzen: mobile `py-10 min-h-0`, lg `min-h-[640px] py-20`.

### 2. Textblock
- Auf mobile volle Breite, Headline `text-3xl` (statt 2xl → jetzt gibt es Platz), sm `text-4xl`, lg `text-5xl`, xl `text-6xl`.
- CTAs bleiben unverändert.

### 3. Auto + Logo Block
- **Mobile/Tablet**: eigener Container `w-full mt-6`. Logo oben mittig (`h-10 sm:h-12`), Eyebrow + rote Linie, dann Auto `w-full max-w-[520px] mx-auto`.
- **Desktop**: Auto darf breit werden und leicht rechts aus dem Container ragen: `lg:max-w-none lg:scale-[1.15] lg:-mr-16 xl:-mr-24`, mit `overflow-hidden` an der Section damit nichts scrollt. Logo bleibt oberhalb, aber kleiner damit Auto dominiert.
- Radialer Glow + Speedlines + Ground-Shadow bleiben, werden proportional an die neue Auto-Größe angepasst.

### 4. Reihenfolge im DOM
- Damit auf mobile Text zuerst kommt, bleibt DOM-Reihenfolge wie sie ist (Text → Auto). Auf Desktop mit CSS-Grid via `lg:grid-cols` bleibt die visuelle Reihenfolge korrekt (Text links, Auto rechts).

### 5. Section-Hintergrund
- Der schräg-rote Streifen (`-skew-x-12` Overlay) bleibt, aber nur ab `lg:` sichtbar (`hidden lg:block`), damit er auf Mobile keine visuelle Verwirrung stiftet.

## Nicht Teil des Plans
- Keine neuen Bilder generieren.
- Keine Änderungen an Header/Navbar oder anderen Sections.
- Keine Text-Content-Änderungen.
