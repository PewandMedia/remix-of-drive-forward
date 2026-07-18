## Ziel
Auf der Erste-Hilfe-Seite keinen Preis mehr anzeigen, stattdessen einen Hinweis "regelmäßige Kurse". Termine (Datum + Uhrzeit) sollen im Admin-Bereich anlegbar, editierbar und löschbar sein und öffentlich als Liste erscheinen.

## Änderungen

### 1. Datenbank (Migration)
Neue Tabelle `public.first_aid_dates`:
- `id`, `starts_at` (timestamptz), `ends_at` (timestamptz, optional), `note` (text, optional), `active` (bool, default true), `created_at`, `updated_at`
- GRANTs: `authenticated` (CRUD), `service_role` (ALL), `anon` (SELECT für aktive/zukünftige)
- RLS: Öffentlich SELECT auf aktive Termine; Admin (has_role) INSERT/UPDATE/DELETE
- Updated-at Trigger

Die bestehende `first_aid_info.price`-Spalte bleibt technisch bestehen, wird aber im Frontend nicht mehr angezeigt (kein Datenverlust).

### 2. Public Data (`src/lib/public-data.functions.ts`)
Neue Server-Funktion `getFirstAidDates()` – liefert zukünftige aktive Termine sortiert nach `starts_at`.

### 3. Öffentliche Seite (`src/routes/erste-hilfe-kurs.tsx`)
- "Preis"-Block im Info-Kasten entfernen.
- Alten `dates`-Text-Block ersetzen durch dynamische Liste der Termine (formatiert deutsch, z. B. "Sa, 15.02.2026 · 08:00–16:00").
- Wenn keine Termine vorhanden: Hinweistext "Wir bieten regelmäßig Erste-Hilfe-Kurse an. Sprich uns per WhatsApp oder Anruf für den nächsten freien Termin an."
- Subheadline / Beschreibungstexte behalten die Aussage "regelmäßig".

### 4. Admin-Bereich (`src/routes/_authenticated/admin.tsx`)
Im Tab "Erste-Hilfe" unter dem bestehenden Beschreibungs-Formular einen neuen Abschnitt "Termine":
- Liste aller Termine mit Datum/Uhrzeit, Notiz, Aktiv-Switch, Löschen-Button
- Dialog/Formular zum Anlegen und Bearbeiten (Datumspicker + Startzeit + optional Endzeit + Notiz)
- Preis-Feld im bestehenden Formular kann bleiben (unbenutzt), wird aber mit Hinweis "wird nicht öffentlich angezeigt" versehen — oder alternativ ausgeblendet. Vorschlag: ausblenden für weniger Verwirrung.
