## Ziel
Das remixede Projekt mit deinem eigenen Supabase-Backend verbinden, damit du unabhängig von Lovable Cloud bist.

## Voraussetzung
Das Remix-Projekt darf noch nicht an Lovable Cloud gebunden sein. Wenn du beim Erstellen des Remixes **Cloud nicht aktiviert** hast, funktioniert der folgende Weg. War Cloud bereits aktiv, lässt sie sich laut Lovable-Regeln nicht mehr entfernen — dann müsstest du ein komplett neues, leeres Projekt ohne Cloud starten.

## Schritt-für-Schritt-Plan

### 1. Eigenes Supabase-Projekt anlegen
- Auf supabase.com ein neues Projekt erstellen.
- Region wählen (am besten Frankfurt/eu-central-1 für Deutschland).
- Projekt-Passwort sicher speichern.
- Folgende Werte notieren:
  - Project URL (z. B. `https://xyz123.supabase.co`)
  - Publishable/Anon Key (beginnt oft mit `eyJ...` oder `sb_publishable_...`)
  - Service Role Key (nur für Server, niemals im Browser)

### 2. Supabase-Integration in Lovable verbinden
- Im remixeden Projekt: **Connectors** im linken Sidebar öffnen.
- **Supabase** auswählen und mit deinem Supabase-Account verknüpfen.
- Das neu erstellte Supabase-Projekt auswählen.

### 3. Schema + Daten migrieren
Ich generiere dir eine vollständige SQL-Migrationsdatei mit:
- Enums (`app_role`)
- Tabellen (`prices`, `team_members`, `first_aid_info`, `inquiries`, `instagram_posts`, `offers`, `user_roles`)
- GRANTs für `anon`, `authenticated`, `service_role`
- RLS-Policies
- `has_role`-Funktion und `set_updated_at`-Trigger
- Aktuelle Daten aus den Tabellen als INSERTs

Du führst diese Datei im Supabase SQL-Editor aus.

### 4. Umgebungsvariablen prüfen
Nach dem Connecten sollten diese Variablen automatisch gesetzt werden:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Falls etwas fehlt, ergänzen wir es manuell.

### 5. Auth-Provider konfigurieren
Falls du Google-Login oder E-Mail-Auth brauchst, müssen diese im eigenen Supabase-Projekt aktiviert werden.

### 6. Test
- Öffentliche Seiten (`/`, `/team`, `/preise`) laden.
- Admin-Login funktioniert.
- Kontaktformular schreibt in `inquiries`.

## Was ich jetzt von dir brauche
1. Bist du sicher, dass das Remix-Projekt **noch nicht** an Lovable Cloud gebunden ist? (Wenn doch, müssen wir einen anderen Weg wählen.)
2. Hast du bereits ein eigenes Supabase-Projekt erstellt?
3. Falls ja: Kannst du mir URL, Publishable Key und Service Role Key über das sichere Secret-Formular geben?

Sobald ich das weiß, generiere ich die Migration und wir schließen die Anbindung ab.