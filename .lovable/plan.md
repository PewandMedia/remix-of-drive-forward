## Was gemacht wird

Die Unterseite `/preise` existiert bereits und der Admin-Bereich kann die Preise (Titel, Kategorie, Beschreibung, Preis, Aktiv/Inaktiv) schon bearbeiten. Es fehlt nur der vom Kunden gewünschte Text-Block auf der Startseite.

### Änderung in `src/routes/index.tsx`

Der bestehende Preis-Abschnitt „Unsere Preise auf einen Blick" (direkt nach dem Hero) wird an die vorgegebenen Texte angepasst:

- **Headline:** „Transparente Preise für deinen Führerschein in Bochum"
- **Text:** „Bei MIRO-DRIVE findest du alle wichtigen Preise übersichtlich und verständlich dargestellt. So weißt du von Anfang an, womit du rechnen kannst."
- **Button:** „Preise ansehen" → verlinkt auf `/preise`

Die 3 kompakten Preis-Karten (Klasse B, B197, B78) darunter bleiben erhalten, damit sofort ein Eindruck der Preise sichtbar ist.

### Nicht geändert
- `/preise` existiert und funktioniert.
- Admin-Bereich für Preise ist vollständig.
- Die ausführliche Preissektion weiter unten auf der Startseite bleibt unverändert.
