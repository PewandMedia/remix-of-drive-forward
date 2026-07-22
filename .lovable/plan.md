# Plan: Externe TÜV-Gebühren in die Preisliste

## Ziel
Auf der Preis-Seite `/preise` sollen die vom TÜV direkt erhobenen Prüfungsgebühren separat ausgewiesen werden:
- Theorieprüfung: **24,99 €**
- Praxisprüfung: **129,83 €**

## Umsetzung

### 1. Datenbank: Neue Preiszeilen anlegen
Ich lege zwei Einträge in der bestehenden `prices`-Tabelle an, Kategorie **„Externe TÜV-Gebühren“**:
- Titel: „Theorieprüfung“ – 24,99 €
- Titel: „Praxisprüfung“ – 129,83 €

Damit erscheinen sie automatisch auch im Admin-Panel unter „Preise“ und können dort später geändert werden, ohne Code anzufassen.

### 2. Seite `/preise` erweitern
Nach der zentralen Preistabelle füge ich einen neuen Abschnitt **„Externe TÜV-Gebühren“** ein.
- Er zeigt alle Preise aus der Kategorie „Externe TÜV-Gebühren“ als Liste an.
- Ein kurzer Hinweis erklärt, dass diese Beträge direkt an den TÜV gezahlt werden und nicht im Fahrschulpreis enthalten sind.
- Styling passt sich an die bestehende Preistabelle an (weiße Karte, rote Akzente, klare Typografie).

### 3. Admin-Panel
Keine Änderung nötig. Die neuen Zeilen werden wie alle anderen Preise verwaltet.

## Technische Details
- **Migration**: `INSERT INTO public.prices (category, title, description, price, sort_order, active)`
- **Frontend**: In `src/routes/preise.tsx` filtere ich `prices` nach `category === "Externe TÜV-Gebühren"` und rendere eine zusätzliche Sektion.
- **Keine neuen Tabellen oder RLS-Änderungen** nötig, da `prices` bereits existiert und öffentlich lesbar ist.

## Ergebnis
- `/preise` zeigt nach den Fahrschulpreisen klar getrennt die TÜV-Gebühren.
- Admin kann die Beträge später selbst anpassen.