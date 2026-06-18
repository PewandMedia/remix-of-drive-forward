## Ziel

Admin kann **Aktions-Angebote** (Promo-Flyer) selbst anlegen, mit Bild, beliebigen Preis-Zeilen und Gültigkeitszeitraum. Aktive Angebote erscheinen automatisch auf `/angebote` **und** auf der Startseite. Nach Ablauf des Zeitraums verschwinden sie automatisch.

Das bestehende Konzept "Angebote = Pakete-Karten" wird durch **Promo-Angebote im Flyer-Stil** ersetzt (passend zum hochgeladenen Beispiel).

## Datenbank

Tabelle `offers` wird erweitert (Migration, kein Datenverlust):

- `image_url` (text, optional) – Flyer-/Auto-Bild
- `headline` (text, optional) – große Überschrift (z. B. "Starte jetzt in deine Fahrzukunft!")
- `subline` (text, optional) – kleiner Text darunter (z. B. "Unser Mega-Angebot")
- `price_blocks` (jsonb) – Liste der großen Preis-Boxen:
  `[{ label: "Einzeln anmelden", old_price: "299€", new_price: "149€", suffix: "pro Person" }, …]`
- `extra_line` (text, optional) – Zusatzzeile (z. B. "Fahrschulwechsel Angebot: 49€ statt 299€")
- `valid_from` (timestamptz, optional)
- `valid_until` (timestamptz, optional)
- `show_on_home` (boolean, default true)

Die alten Felder `items`, `price_label`, `button_text`, `short_desc` bleiben für Abwärtskompatibilität, werden aber im neuen UI nicht mehr verwendet.

Sichtbarkeits-Regel im Query (Frontend):
`active = true AND (valid_from IS NULL OR valid_from <= now()) AND (valid_until IS NULL OR valid_until >= now())`

## Admin-UI (`/admin`, Tab "Angebote")

Formular pro Angebot:

- Bild-Upload (Lovable Storage bucket `offers`, public read)
- Headline / Subline / Extra-Zeile (Text)
- Dynamische Liste **Preis-Blöcke** (hinzufügen/entfernen) mit Feldern: Titel, alter Preis, neuer Preis, Suffix
- Gültig von / bis (Datepicker, beide optional)
- "Auf Startseite anzeigen" (Switch)
- Aktiv (Switch), Sortierung
- Speichern / Löschen / Duplizieren

Storage-Bucket `offers` wird in der Migration angelegt (public read, admin write).

## Frontend

**`/angebote`**: Rendert aktive Angebote im **Flyer-Look** – großes Bild oben, Headline, Preis-Boxen nebeneinander (rot/weiß-Stil), Extra-Zeile, Gültigkeitsdatum, darunter CTAs (WhatsApp, Anrufen, Filiale besuchen). Kein Anmelde-Button.

**`/` (Startseite)**: Neue Section "Aktuelle Angebote" zeigt alle aktiven Angebote mit `show_on_home = true` als kompakte Karten mit Bild + Headline + erstem Preis-Block + Link auf `/angebote`. Wird komplett ausgeblendet, wenn keine aktiv sind.

Bestehende Karten-Logik (`items`, `price_label`) wird entfernt.

## Technische Details

- Datums-Filter zusätzlich client-seitig anwenden (SSR-Query mit `gte`/`lte`).
- Bild über `<img loading="lazy">`, alt = Headline.
- Storage-Upload im Admin via `supabase.storage.from('offers').upload(...)`, gespeichert wird nur die `image_url`.
- Migration legt Bucket + Policies an (public SELECT, admin INSERT/UPDATE/DELETE).

## Geänderte / neue Dateien

- Migration: `offers`-Spalten + Storage-Bucket `offers` + Policies
- `src/routes/_authenticated/admin.tsx` – Angebote-Tab umbauen (Bildupload, Preis-Blöcke, Datumsfelder)
- `src/routes/angebote.tsx` – Flyer-Layout, Datums-Filter
- `src/routes/index.tsx` – neue Home-Section "Aktuelle Angebote"
- `src/integrations/supabase/types.ts` – auto-regeneriert
