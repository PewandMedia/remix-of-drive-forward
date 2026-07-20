Ziel: Die Leistungskarten auf der `/leistungen`-Unterseite sollen auf Desktop-Ansicht in 3er-Reihen angezeigt werden (statt aktuell 4er-Reihen).

Aktueller Stand:
- In `src/routes/leistungen.tsx` wird das Grid mit `grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4` gerendert.
- Auf dem Screenshot sind daher 4 Karten in der ersten Reihe und 2 Karten in der zweiten Reihe zu sehen.

Geplante Änderung:
- Ändere das Grid auf `grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3`.
- Damit werden auf Desktop 3 Karten pro Reihe dargestellt (2 Reihen mit je 3 Karten).
- Tablet-Ansicht (`md`) wird ebenfalls auf 3 Spalten gesetzt, damit der Übergang sauber ist.
- Keine weiteren inhaltlichen oder visuellen Änderungen an den Karten selbst.

Betroffene Datei:
- `src/routes/leistungen.tsx` (Zeile 45)