## Ziel
Das Hero-Bild verwendet aktuell ein KI-generiertes Auto (`hero-car.png`). Stattdessen soll das echte Fahrschul-Foto (`miro-car.png`, bereits als CDN-Asset im Projekt) verwendet werden. Zusätzlich soll das MIRO-DRIVE Logo (`miro-logo.png`) prominent über bzw. neben dem Auto platziert werden, damit die rechte Hero-Seite hochwertig und gefüllt wirkt statt leer.

## Änderungen (nur `src/routes/index.tsx`, keine Backend-Änderungen)

1. **Bildquelle umstellen**
   - `hero-car.png` Import entfernen.
   - Stattdessen `miro-car.png.asset.json` importieren und `.url` als `<img src>` verwenden (echtes Fahrschulauto der Fahrschule).
   - Zusätzlich `miro-logo.png.asset.json` importieren.

2. **Neuer Hero-Aufbau rechte Spalte** (Auto-Bereich)
   ```text
   ┌───────────────────────────────────────┐
   │   [ MIRO-DRIVE LOGO groß, zentriert]  │
   │        "Fahrschule Bochum"            │
   │   ═══════════════════════════════     │  ← dünne rote Trennlinie
   │                                       │
   │        [ ECHTES AUTO-FOTO ]           │  ← einfahrend von rechts
   │                                       │
   └───────────────────────────────────────┘
   ```
   - Logo oben mittig über dem Auto, mit sanftem Fade-in und dezentem roten Glow dahinter.
   - Kleiner Eyebrow-Text unter dem Logo ("Fahrschule Bochum · seit Jahren dein Partner") als visueller Anker.
   - Auto darunter, weiterhin mit `animate-drive-in-right` (unverändert), leicht kleiner skaliert damit Logo Platz hat.
   - Roter radialer Glow als Backdrop hinter Logo + Auto zusammen für einen zusammenhängenden Look.

3. **Feinschliff**
   - Speedlines & schwarzer Accent-Bar bleiben, werden aber neu positioniert damit sie unter das Auto wandern (Boden-Linie statt seitlich).
   - Drop-Shadow am Auto beibehalten, Ground-Shadow-Ellipse bleibt.
   - Mobile: Logo kleiner, oberhalb des Autos, damit die 2-Spalten-Anordnung erhalten bleibt.

## Nicht Teil des Plans
- Keine neuen KI-Bilder generieren (Nutzer will explizit das echte Auto).
- Keine Textänderungen in der linken Hero-Spalte (Headline, CTAs, Bewertungs-Chip bleiben wie sie sind).
- Keine Änderungen an anderen Seiten oder Komponenten.
- `hero-car.png` bleibt vorerst im Ordner liegen (kein Delete), damit nichts anderes bricht.
