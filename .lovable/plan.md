## Ziel
1. `/erste-hilfe-kurs` optischer & inhaltlicher Umbau: weniger Scroll, kein Preis.
2. Admin-Panel: Termine (Datum + Uhrzeit) für Erste-Hilfe-Kurse anlegen/bearbeiten/löschen.
3. Nächste Termine dynamisch auf Startseite und Unterseite anzeigen.

## Datenbank
Die Tabelle `public.first_aid_dates` existiert bereits (`starts_at`, `ends_at`, `note`, `active`). Falls RLS/Grants noch nicht öffentlich lesbar sind, per Migration ergänzen:
- `GRANT SELECT ON public.first_aid_dates TO anon, authenticated;`
- Public-Read-Policy `active = true`, Admin-Full-Access via `has_role`.

## Server Functions (`src/lib/public-data.functions.ts`)
- `getUpcomingFirstAidDates`: liest aktive `first_aid_dates` mit `starts_at >= now()`, sortiert aufsteigend, limitiert (z. B. 5).

## Erste-Hilfe-Unterseite (`src/routes/erste-hilfe-kurs.tsx`)
- Layout kompakter: Zwei-Spalten-Grid entfernen bzw. straffen; Info-Karte und Benefit-Liste in eine ausgewogenere Anordnung bringen, damit weniger vertikaler Scroll entsteht.
- **Preisfeld komplett entfernen** (auch aus `getFirstAidInfo`-Nutzung). Stattdessen Text: „Wir bieten regelmäßig Erste-Hilfe-Kurse in unserer Fahrschule an."
- Neuer Termin-Block: Liste der kommenden Termine aus `first_aid_dates` (Datum, Uhrzeit von–bis, optionale Notiz). Wenn leer: Hinweistext „Neue Termine folgen in Kürze – melde dich per WhatsApp."
- Standorte-Sektion beibehalten, aber näher an Termin-Block ranrücken.

## Startseite (`src/routes/index.tsx`)
- Im bestehenden Erste-Hilfe-Teaser die nächsten 2–3 Termine dynamisch anzeigen (Datum + Uhrzeit) statt statischer Beschreibung.
- Kein Preis.

## Admin-Panel (`src/routes/_authenticated/admin.tsx`)
- Im Tab **Erste-Hilfe** neben dem bestehenden Info-Editor einen neuen Abschnitt „Termine":
  - Liste mit allen Terminen (Datum, Uhrzeit, Notiz, Aktiv-Toggle, Bearbeiten, Löschen).
  - Dialog zum Anlegen/Bearbeiten mit Feldern: Datum, Startzeit, Endzeit, Notiz, Aktiv.
  - CRUD über `supabase.from("first_aid_dates")` (RLS erlaubt das für Admins).
- Preisfeld im Info-Editor bleibt technisch bestehen (Datenbank), wird aber öffentlich nicht mehr angezeigt.

## Verifikation
- Build läuft sauber.
- Neuer Termin im Admin → erscheint auf `/` und `/erste-hilfe-kurs`.
- Kein Preis mehr sichtbar auf der Unterseite.
