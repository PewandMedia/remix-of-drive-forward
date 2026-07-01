## Diagnose
Auf dem Screenshot (Tablet ~990px) ist der Hero komplett aus der Balance:
- **Headline zu groß** für die schmale linke Spalte → `Führerschein` und `MIRO-DRIVE` werden abgeschnitten/umbrochen in einzelne Wörter pro Zeile, das erste `–` steht allein.
- **Logo-Container wirkt wie eine riesige weiße Karte**, weil der radial-Glow nur hell und der leere Raum darum sehr groß ist.
- **Roter Rechteck-Balken** rechts (schwarzer Accent-Bar aus früherem Layout) hängt disconnected in der Luft und überschneidet die Sektion.
- **Auto beginnt viel zu tief** unter dem Logo — Logo + Auto stehen nicht wie eine Einheit da.

## Ziel
Hero perfekt ausbalanciert auf Mobile, Tablet und Desktop. Nichts überschneidet, nichts läuft aus dem Container, Logo + Auto wirken wie eine zusammenhängende Bildkomposition rechts, Text bleibt links lesbar.

## Änderungen (nur `src/routes/index.tsx`)

### 1. Grid-Verhältnisse zurücksetzen
- Auf allen Breakpoints ausgewogenes 2-Spalten-Grid: `grid-cols-[1.1fr_1fr]` mobile → `sm:grid-cols-[1fr_1fr]` → `lg:grid-cols-[1fr_1.1fr]`.
- Container darf nicht mehr aus dem Viewport ragen: negative Margins am rechten Wrapper entfernen (`-mr-*` weg).

### 2. Headline anpassen
- Font-Sizes so setzen, dass `Führerschein` und `MIRO-DRIVE` **auf einer Zeile** passen:
  - Mobile: `text-2xl` (statt xl mit `<br />` Chaos)
  - `sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`
- `<br />` Tags entfernen und stattdessen natürliches Umbrechen zulassen mit `max-w-` Constraints.
- Zeilenhöhe `leading-tight` statt `leading-[1.02]`.

### 3. Rechte Spalte: Logo + Auto als kompakte Einheit
- Wrapper: `flex flex-col items-center justify-center gap-3 sm:gap-4` — kein negatives Margin.
- **Logo**: dezenter (kein großer weißer Kartencharakter). Größen: `h-8 sm:h-12 md:h-14 lg:h-16`. Glow entfernen oder deutlich reduzieren.
- **Eyebrow-Text** unter Logo: kleiner (`text-[8px] sm:text-[10px]`), max eine Zeile.
- **Rote Trennlinie**: bleibt schmal.
- **Auto**: direkt darunter, `w-full max-w-[420px] sm:max-w-none`, `scale-100` statt `scale-[1.35]` → passt exakt in Container ohne Overflow.
- **Speedlines & Ground-Shadow** proportional kleiner.

### 4. Störende Layout-Elemente entfernen
- Den roten/schwarzen absoluten Accent-Bar auf Section-Ebene (`-right-16 top-1/2 bg-foreground`) **entfernen** — der hängt disconnected und ist die rote Fläche im Screenshot.
- Den zusätzlichen `bg-foreground w-56` Balken hinter dem Auto entfernen.
- Nur der subtile radiale Glow + dezente Speedlines bleiben als Hintergrund.

### 5. `overflow-hidden` + `min-h` angepasst
- `min-h` mobile: `380px`, sm: `520px`, lg: `640px` (statt 760px).
- Section behält `overflow-hidden` damit die Einfahr-Animation nicht scrollt.

## Nicht Teil des Plans
- Keine Änderung am Auto- oder Logo-Asset selbst.
- Keine Änderung an Trust-Strip, Reviews, weiteren Sections.
- Keine Text-/CTA-Inhalte anfassen — nur Größen und Layout.
