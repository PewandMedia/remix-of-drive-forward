## Ziel
Die aktive "Sommer-Aktion" auf der Startseite wirkt derzeit als kleines, leicht zu übersehendes Badge. Sie soll sofort als echtes, attraktives Angebot erkennbar sein – ohne die Seite zu überladen.

## Änderungen

### 1. Auffälliger Angebots-Banner oberhalb der Preis-Karten
- In `src/routes/index.tsx`: Direkt über der 3-Spalten-Preisübersicht einen eigenen, farblich abgesetzten Angebots-Block einfügen.
- Rot-schwarzer Gradient-Hintergrund mit deutlichem Kontrast zur weißen Umgebung.
- Text: "☀️ Sommer-Aktion – jetzt Anmeldegebühr nur 200 € statt 299 €"
- Countdown-Timer direkt im Banner: "Noch X Tage / Std. gültig"
- Zwei CTA-Buttons: "Jetzt per WhatsApp anmelden" und "Alle Preise ansehen"

### 2. Karten mit aktivem Angebot stärker hervorheben
- Die 3 Klassen-Karten (B, B197, B78) bekommen bei `live === true` einen dicken, rot-goldenen Rahmen statt des feinen schwarzen/weißen Borders.
- Subtiler roter Glow-Ring (`ring-4 ring-primary/30`) um die Karte.
- "🔥 Angebot" Badge wird größer und prominent (z. B. als Ribbon oben rechts oder als Pulsierender Stempel).
- Der Preisunterschied wird visuell größer: Alter Preis (durchgestrichen, 299 €) und neuer Preis (200 €) in deutlich größerer Schrift, der neue Preis fett in Rot/Primärfarbe.

### 3. Keine Änderungen an der Admin-Oberfläche oder Datenbank
- Angebots-Daten (Preise, Gültigkeit, Label) bleiben unverändert.
- Nur die visuelle Präsentation auf der Startseite wird angepasst.

## Ergebnis
Jeder Besucher sieht sofort, dass eine zeitlich begrenzte Aktion läuft. Die Sommeraktion springt als eigenständiger, hochwertiger Banner ins Auge, und die einzelnen Klassen-Karten heben sich durch Rahmen und Preis-Hervorhebung klar vom Normalpreis ab.