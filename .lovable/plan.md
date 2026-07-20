Auf der Startseite gibt es mehrere dezente rote Blur-Glows im Hintergrund, die als Dekoration dienen. Diese sollen entfernt werden, damit der Hintergrund sauberer und seriöser wirkt.

Geplante Änderungen:

1. **Hero-Bereich oben**
   - Entferne die beiden großen radialen Blur-Glows hinter dem Hero-Text (Zeile 70–71 in `src/routes/index.tsx`).
   - Entferne den roten Schatten-Glow hinter der Video-Karte (Zeile 136 in `src/routes/index.tsx`).

2. **Erste-Hilfe-Kurs Teaser**
   - Entferne den dekorativen roten Blur-Glow in der oberen rechten Ecke (Zeile 513 in `src/routes/index.tsx`).

3. **Visuelle Prüfung**
   - Nach dem Entfernen wird geprüft, ob die Sektionen weiterhin sauber und professionell aussehen. Falls nötig, wird der Hintergrund leicht angepasst, damit keine "leere" Stelle entsteht.

Betroffene Datei:
- `src/routes/index.tsx`

Keine neuen Abhängigkeiten. Keine Datenbank-Änderungen.