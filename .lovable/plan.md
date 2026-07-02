## Ziel
Angebots-Dialog im Admin einfacher & flexibler machen.

## Änderungen (nur `src/routes/_authenticated/admin.tsx` + Frontend-Anzeige)

### 1. Alter Preis automatisch
- Beim Aktivieren von „Angebot aktiv" wird `old_price` automatisch mit dem aktuellen `price` vorbefüllt.
- Feld „Neuer Aktionspreis" (statt „Preis") wird prominent – Admin gibt einfach z. B. `150` ein.
- Kein Prozent-Feld, keine Prozentrechnung – reine Zahlen.

### 2. Datum vereinfachen
- Statt zwei `datetime-local` Feldern → **Shadcn Date-Range-Picker** (Kalender-Popover).
- Schnellauswahl-Buttons: „7 Tage", „14 Tage", „30 Tage", „Bis Monatsende".
- Uhrzeit entfällt (00:00 Start, 23:59 Ende automatisch).

### 3. Anlass-Auswahl + Notiz
- Neues Feld `offer_label` bekommt Preset-Chips:
  - Weihnachten, Silvester, Neujahr, Ostern, Sommer-Aktion, Herbst-Aktion, Frühlings-Aktion, Black Friday, Ferien-Special, Muttertag, Vatertag
  - Klick auf Chip = Label + passendes Emoji wird gesetzt.
  - „Eigener Anlass" → Freitext.
- Neues DB-Feld `offer_note` (TEXT, optional): längere Beschreibung („Nur für Neuanmeldungen bis Ende des Monats").

### 4. Anzeige auf Frontend
- Auf `/preise` und Startseite: unter dem Aktionspreis wird `offer_note` als kleiner kursiver Text angezeigt, wenn vorhanden.
- Label-Chip bleibt oben rechts wie bisher.

## DB-Migration
- `ALTER TABLE prices ADD COLUMN offer_note TEXT;`

## Reihenfolge
1. Migration (neues Feld).
2. Admin-Dialog umbauen.
3. Preise-Seite + Startseiten-Karten für Notiz-Anzeige erweitern.
