## Problem
Auf der Startseite im Bereich „Drei Klassen, transparente Preise“ steht aktuell nur der Kurzcode (B, B197, B78). Für Besucher – besonders auf Mobilgeräten – ist nicht sofort klar, welche Führerschein-Art sich dahinter verbirgt, weil der erklärende Tagline-Text (`tagline`) nur auf Desktop sichtbar ist (`hidden sm:block`).

## Ziel
Sowohl auf Desktop als auch auf Mobile muss direkt unter dem Klassen-Namen ein kurzer, verständlicher Satz stehen, der den Führerschein-Typ beschreibt. Die Karten sollen dabei kompakt bleiben, damit der Bereich nicht zu lang wird.

## Umsetzung

### Schritt 1: Datenstruktur anpassen
In `src/routes/index.tsx` wird das Array `PRICE_CLASSES` um ein Feld `mobileShort` erweitert (z.B. `"Schalter"`, `"Automatik + Schalter"`, `"Automatik"`). Das erlaubt einen extrem kurzen, mobiloptimierten Zusatztext.

### Schritt 2: Mobile & Desktop Rendering anpassen
- Der bisherige `tagline`-Paragraph wird nicht mehr komplett `hidden` gesetzt.
- Stattdessen wird auf Mobile (`sm:hidden`) der kurze `mobileShort`-Text unterhalb von „Klasse B“ angezeigt.
- Auf Desktop (`sm:block`) bleibt der längere `tagline`-Text erhalten.
- Schriftgröße und Abstände auf Mobile werden so gewählt, dass die 3 Karten nebeneinander passen (z.B. `text-[10px]` mit minimalem Margin).

### Schritt 3: Karten-Layout beibehalten
- Die bestehende 3-Spalten-Grid auf Mobile (`grid-cols-3`) bleibt erhalten.
- Inneres Padding und Icon-Größen werden leicht reduziert, falls nötig, um Platz für den zusätzlichen Text zu schaffen, ohne dass die Karten ungleich hoch werden.

## Geänderte Datei
- `src/routes/index.tsx` – Anpassung von `PRICE_CLASSES` und dem zugehörigen Render-Code in der Preis-Teaser-Sektion.

## Nicht im Scope
- Keine Änderung an der vollständigen Preisliste (`/preise`).
- Keine Änderung an Datenbank oder Admin-Panel.