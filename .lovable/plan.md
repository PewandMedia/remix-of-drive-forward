## Ziel
Mobile Preis-Karten wieder **untereinander** (1 Spalte) statt 3 nebeneinander — aber **kompakt** mit **allen wichtigen Infos** sichtbar. Keine langen Scroll-Strecken.

## Änderungen in `src/routes/preise.tsx`

### 1. Grid zurück auf 1 Spalte auf Mobile
- `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Karten volle Breite auf Mobile → mehr Platz für Inhalte

### 2. Karten-Header kompakt (horizontal, nicht mehr zentriert)
- Icon (mit Gradient-Ring/Glow) links, Titel + Tagline rechts daneben, Badge oben rechts
- Tagline **1 Zeile** mit `line-clamp-1` — kurz sichtbar
- Sonder/Theorie/Alter Stat-Pills bleiben (jetzt breiter, gut lesbar)

### 3. Info-Block auf Mobile sichtbar, aber kompakt
- Theorie, Mindestalter, Prüfung, Voraussetzungen als **2-spaltiges Micro-Grid** (Icon + Zahl/Kurztext) — nicht mehr als lange Listen-Zeilen
- `extraNote` in kleiner Hinweis-Zeile
- Alles in einem einzigen dichten Kasten (`p-3`, `text-[11px]`)

### 4. Preis-Liste kompakt
- Zurück zu horizontaler Zeile (Titel links, Preis rechts) — jetzt mit voller Kartenbreite kein Overlap mehr
- Beschreibungen bleiben auf Mobile sichtbar aber `line-clamp-1`, `text-[10px]`
- Angebots-Badge + Alt-Preis sichtbar (klein)
- Kompakte `py-2` Zeilen

### 5. CTA
- WhatsApp + Filiale beide sichtbar (nebeneinander), kompakt

## Technisch
- Nur `src/routes/preise.tsx`
- Kein Business-Logic-Change
- Icons behalten den Premium-Look aus dem vorherigen Turn
