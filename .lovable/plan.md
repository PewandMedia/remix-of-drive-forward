## Ziel

Der Erste-Hilfe-Bereich soll seriöser wirken:

1. **Preis nirgends mehr anzeigen** (weder Startseite noch Unterseite).
2. **Dauer und Termin gemeinsam** in einem sauberen Block anzeigen (z. B. "8:00 – 16:00 Uhr · Samstag, 15.02.2026").
3. **Admin kann Termine selbst pflegen** – neu anlegen, bearbeiten, löschen, aktiv/inaktiv schalten. Die bereits vorhandene, aber ungenutzte Tabelle `first_aid_dates` wird dafür verwendet.
4. **Unterseite `/erste-hilfe-kurs` neu anordnen**, damit die aktuell schiefe „Was du bekommst"-Liste + überfrachtete rechte Spalte aufgeräumt wirken.

## Schritte

### 1. Admin: Termine verwalten
Datei: `src/routes/_authenticated/admin.tsx`
- Im Tab „Erste-Hilfe" unter dem bestehenden Info-Formular ein zweites Panel „Offizielle Termine" ergänzen, das auf `first_aid_dates` arbeitet.
- Liste aller Termine (nach `starts_at` sortiert) mit Bearbeiten / Löschen / Aktiv-Switch.
- Dialog zum Anlegen/Bearbeiten mit Feldern: Datum, Startzeit, Endzeit, Notiz (optional), Aktiv.
- Preis-Feld im bestehenden Info-Formular entfernen (Spalte bleibt in der DB, wird einfach nicht mehr geschrieben/gelesen).

### 2. Öffentliche Datenquelle
Datei: `src/lib/public-data.functions.ts`
- Neue Server-Function `getFirstAidDates()` → nur aktive Termine, `starts_at >= now()`, sortiert.
- `getFirstAidInfo` unverändert lassen (Beschreibung + Dauer werden weiter benutzt), Preis wird im UI ignoriert.

### 3. RLS / Grants
Falls `first_aid_dates` noch keine öffentliche SELECT-Policy für aktive Termine hat, in einer Migration ergänzen (nur `active = true` für `anon`/`authenticated`, volle Rechte für Admin über `has_role`).

### 4. Unterseite `/erste-hilfe-kurs` neu aufbauen
Datei: `src/routes/erste-hilfe-kurs.tsx`
- Zweispaltiges Layout ersetzen durch eine ruhigere, moderne Struktur:
  - Hero bleibt.
  - Danach ein zentraler Content-Block: linke Spalte Bild, rechte Spalte kompakte „Das erwartet dich"-Karten (Icon + kurzer Titel + 1 Satz) statt der aktuellen langen Zeilen-Liste, die aus dem Rahmen läuft.
  - Neuer Abschnitt „Nächste Termine" als Karten-Grid mit den aus `getFirstAidDates` geladenen offiziellen Terminen (Datum, Uhrzeit-Range, optionale Notiz, CTA WhatsApp / Anrufen pro Karte). Fallback-Text, wenn keine Termine gepflegt sind.
  - „Anmeldung & Infos"-Box: Preis raus, Dauer + nächster Termin zusammen als ein Info-Block, CTAs bleiben.
  - Standorte-Abschnitt bleibt.

### 5. Startseiten-Teaser
Datei: `src/routes/index.tsx` (Bereich Zeilen 433–481)
- `InfoStat` mit Preis entfernen.
- Statt drei Stats nur noch zwei kompakte Zeilen: „Dauer & Termin" (kombiniert aus `duration` + nächstem Termin aus `getFirstAidDates`) und „Anmeldung" (vor Ort / WhatsApp).
- Kein Preis mehr im Teaser.

## Ergebnis
- Kein Preis mehr sichtbar.
- Termine sind vollständig admin-gepflegt, jederzeit änderbar.
- Dauer und Termin erscheinen zusammen, statt separat.
- Unterseite wirkt aufgeräumt und modern – keine überlappenden/überfrachteten Boxen mehr.

## Validierung
- `bun run build` läuft fehlerfrei.
- Neuen Termin im Admin anlegen → erscheint auf Startseiten-Teaser und Unterseite.
- Termin deaktivieren → verschwindet aus der öffentlichen Ansicht.
