## Plan: Startseiten-Team-Teaser auf 4 Personen begrenzen

### Ziel
Auf der Startseite im Team-Teaser sollen nur **Ilkay** (groß, zentriert oben) und **genau 3 weitere Fahrlehrer** in der 3er-Reihe darunter angezeigt werden. Die restlichen Team-Mitglieder sollen entfernt werden, damit der Link „Ganzes Team ansehen“ Sinn macht.

### Änderung
1. **`src/routes/index.tsx`** (Team-Teaser-Abschnitt, ca. Zeile 500–520):
   - Nach dem Filtern der `others` (alle außer Ilkay) die Liste auf die **ersten 3 Einträge** begrenzen (`others.slice(0, 3)`).
   - Keine Änderung an Layout, Größen oder dem Owner-Block – nur die Anzahl.

### Nicht im Scope
- Keine Änderungen an der Team-Seite (`/team`).
- Keine Änderungen an der Datenbank oder den Server-Funktionen.
- Keine Änderungen an Texten/CTAs.

### Ergebnis
Startseite zeigt im Team-Teaser: Ilkay + 3 weitere Fahrlehrer. Alle weiteren bleiben ausschließlich auf `/team` sichtbar.