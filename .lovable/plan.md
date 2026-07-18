## Ziel
Den oberen, doppelten Preisabschnitt auf der Startseite (`/`) entfernen. Der untere Preis-Teaser bleibt erhalten.

## Schritte
1. In `src/routes/index.tsx` den Abschnitt "PREISE AUF EINEN BLICK" (Zeilen 212–270) entfernen. Dieser enthält:
   - Headline „Transparente Preise für deinen Führerschein in Bochum"
   - Beschreibungstext
   - „Preise ansehen“-Button
   - Drei Preiskarten (Klasse B, B197, B78)
2. Sicherstellen, dass die darunterliegenden Abschnitte (Prozess, Reviews, unterer Preis-Teaser) nahtlos anschließen.
3. Build laufen lassen, um sicherzustellen, dass keine verwendeten Variablen oder Imports verloren gehen.

## Nicht-Ziele
- Keine Änderung am unteren Preis-Teaser.
- Keine Änderung an Preisen, Admin-Bereich oder Datenbank.
- Keine neuen Routen oder Komponenten.