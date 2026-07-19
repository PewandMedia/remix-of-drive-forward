## 1. Fahrlehrer-Karten auf Startseite verlinken

In `src/routes/index.tsx` (Team-Sektion, Zeilen ~660–673) die `TeamCard`-Elemente (sowohl Owner Ilkay als auch die drei weiteren Fahrlehrer) in ein `<Link to="/team">` einwickeln, damit ein Klick auf eine Fahrlehrer-Karte auf die Team-Unterseite führt. Styling der Karte bleibt unverändert; nur eine `block`-Wrapping mit Hover-Übergabe wird ergänzt.

## 2. Vierte Leistungskarte auf Startseite

In `src/routes/index.tsx` (Services-Teaser, Zeilen ~727–752) das Array von 3 auf 4 Einträge erweitern, damit auf Desktop/Tablet ein symmetrisches 2×2-Raster entsteht.

- Neuer Eintrag: **„Erste-Hilfe-Kurs"** (analog zur Unterseite `/leistungen`), mit Link auf `/erste-hilfe-kurs` und passendem Bild (`@/assets/leistungen/erste-hilfe.jpg` bzw. das bereits in `leistungen.tsx` genutzte `imgErsteHilfe`).
- Grid-Klassen anpassen: `grid-cols-2 lg:grid-cols-4` (statt `lg:grid-cols-3`), damit die 4 Karten eine saubere 2er-Reihe auf Mobile und eine 4er-Reihe auf Desktop bilden.

Keine weiteren Änderungen an Business-Logik oder anderen Sektionen.