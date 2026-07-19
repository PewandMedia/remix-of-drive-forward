## Ziel
Alle Inhalte des Erste-Hilfe-Kurses, die im Admin-Panel gepflegt werden (Beschreibung, Preis, Dauer, Termin-Hinweis), sollen live auf der Startseite und der Unterseite `/erste-hilfe-kurs` erscheinen. Die Termine sind bereits verbunden – jetzt kommen die restlichen Felder dazu.

## Änderungen

### 1. Startseite (`src/routes/index.tsx`, Teaser-Sektion ~Zeile 579–625)
- Beschreibungstext durch `info?.description` ersetzen (Fallback = aktueller Text, falls Feld leer)
- Optional Dauer als kleiner Chip einblenden, wenn im Admin gepflegt

### 2. Unterseite (`src/routes/erste-hilfe-kurs.tsx`)
- `PageHero` subtitle dynamisch aus `info?.description` (Fallback = aktueller Text)
- Preis (`info.price`) im dunklen Termin-Panel neben der Dauer anzeigen, wenn gepflegt
- Termin-Hinweis-Freitext (`info.dates`) als Zusatzhinweis unter der Terminliste einblenden

### 3. Admin-Panel (`src/routes/_authenticated/admin.tsx`, `FirstAidAdmin` ~Zeile 608–647)
- Irreführenden Hinweis „Preis wird auf der Website aktuell nicht angezeigt" entfernen
- Feld-Labels klarer beschriften, sodass sichtbar ist, wo welches Feld erscheint (Startseite / Unterseite)

### 4. Query-Synchronisation
- Sicherstellen, dass Startseite und Unterseite denselben Query-Key (`first_aid_info`) verwenden, damit nach dem Speichern im Admin beide Seiten sofort aktualisiert werden

## Was unverändert bleibt
- Termin-Verwaltung (bereits vollständig dynamisch)
- Vorteils-Liste „Was dich erwartet" (statisch, nicht im Admin-Feld enthalten)
- Design und Layout – nur Datenbindung, keine visuellen Änderungen
