## Ziel
Zwei visuelle Verbesserungen auf der Startseite:

1. **Ilkays Team-Karte im Teaser verkleinern** – sie soll weiterhin größer sein als die drei anderen Fahrlehrer, aber nicht mehr so extrem groß wirken. Sein Bild bleibt zentriert.
2. **"Warum MIRO-DRIVE"-Kästchen auf Desktop neu anordnen** – die drei Kästchen sollen entweder nebeneinander oder untereinander stehen, je nachdem was im aktuellen Layout besser aussieht.

## Schritte

### 1. Neue Größen-Variante für Ilkays Startseiten-Karte
- Datei: `src/components/site/TeamCard.tsx`
- Eine neue `size`-Variante hinzufügen, z. B. `"featured"`, die zwischen der aktuellen `lg` (zu groß) und `md` liegt.
- Maße grob:
  - Avatar: `h-28 w-28 sm:h-32 sm:w-32`
  - Karte: `min-h-[340px] w-full max-w-sm p-6 sm:p-8`
  - Name: `text-2xl`
- Bestehende `lg`/`md`/`sm` Varianten bleiben unverändert, damit die Team-Unterseite nicht verändert wird.

### 2. Startseiten-Teaser auf neue Größe umstellen
- Datei: `src/routes/index.tsx`
- Im Team-Teaser für `owner` (`Ilkay`) statt `size="lg"` die neue `size="featured"` verwenden.
- Die drei anderen Fahrlehrer bleiben `size="sm"` in der 3er-Reihe.

### 3. Vorteils-Kästchen auf Desktop anordnen
- Datei: `src/routes/index.tsx`, Bereich "Warum MIRO-DRIVE" (Zeilen ~541–551).
- Aktuell sind die drei Kästchen in einem 2-Spalten-Grid innerhalb der schmalen rechten Spalte (2/5 Breite), was ein ungleiches Layout erzeugt (2 oben, 1 unten links).
- Lösung: Auf Desktop (`lg:`) die Kästchen **untereinander** in einer Spalte anordnen (`grid-cols-1`), damit sie gleichmäßig und lesbar verteilt sind.
- Alternative kurz prüfen: Falls drei Kästchen nebeneinander (`grid-cols-3`) in der schmalen Spalte zu gequetscht wirken, wird die 1-Spalten-Variante beibehalten.
- Kästchen-Höhen und Abstände leicht anpassen, damit die Säule optisch zur linken Textspalte passt.

## Ergebnis
- Ilkay hebt sich deutlich, aber dezenter ab.
- Die drei Vorteils-Kästchen wirken auf Desktop aufgeräumt und gleichmäßig.
- Team-Unterseite bleibt unverändert.

## Validierung
- `bun run build` bzw. Vite-Build muss fehlerfrei durchlaufen.
- Visueller Check in Desktop- und Mobile-Vorschau für Team-Teaser und Vorteils-Kästchen.