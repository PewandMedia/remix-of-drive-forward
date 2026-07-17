## Plan: Supabase-Projekt wechseln zu „Miro-Drive“

### Ziel
Die App wird vom aktuellen Supabase-Projekt (`pewandmediasupabase1@proton.me's Project`) komplett auf das neue, leere Supabase-Projekt **„Miro-Drive“** (`slrbtiviwvwvjjafbgkp`) umgestellt. Das Website-Schema wird frisch eingespielt und der aktuelle SSR-Fehler behoben.

### Schritte

1. **Neue Supabase-Verbindung in der App hinterlegen**
   - `supabase/config.toml` aktualisieren: `project_id = "slrbtiviwvwvjjafbgkp"`
   - `.env` aktualisieren: `SUPABASE_URL`, `VITE_SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PROJECT_ID`
   - `src/integrations/supabase/client.ts` aktualisieren: URL + Publishable Key
   - `src/integrations/supabase/types.ts` aus dem neuen Projekt neu generieren (oder zunächst als leere Database-Typen hinterlegen, bis die Migration gelaufen ist)

2. **Schema in neues Supabase-Projekt einspielen**
   - Migration `supabase/migration_new_project.sql` ausführen (Enables RLS, erstellt Tabellen `first_aid_info`, `inquiries`, `instagram_posts`, `offers`, `prices`, `team_members`, `user_roles`, Funktionen, Trigger, Policies)
   - Anschließend `src/integrations/supabase/types.ts` anhand des neuen Schemas neu generieren

3. **SSR-Fehler beheben (`localStorage is not defined`)**
   - `src/integrations/supabase/client.ts` patchen: `storage` nur im Browser setzen (`typeof window !== "undefined" ? localStorage : undefined`), damit SSR nicht crasht

4. **Auth-Provider aktivieren**
   - Hinweis/Link zum Supabase-Dashboard, um E-Mail/Passwort-Auth für den Admin-Bereich zu aktivieren

5. **Ersten Admin-User einrichten**
   - Nach dem Login über `/auth` wird die bestehende `bootstrapFirstAdmin`-Server-Funktion aufgerufen, um dem ersten Nutzer die `admin`-Rolle zu geben

6. **Verifizierung**
   - `bun run build` oder Vite-Build prüft, dass keine Import-/Typfehler mehr auftreten
   - Vorschau öffnen: `/`, `/preise`, `/team` laden ohne `localStorage`-Fehler
   - `/auth` ist erreichbar

### Technische Details
- Das alte Supabase-Projekt wird nicht mehr referenziert; alle Dateien mit hartkodierten Projekt-IDs/Keys werden ersetzt.
- Die Migration enthält bereits alle nötigen GRANTs, RLS-Policies, Trigger und die `has_role`-Hilfsfunktion.
- Keine Edge Functions nötig; App-Logik bleibt bei TanStack `createServerFn`.

### Nach dem Implementieren
- Du musst im Supabase-Dashboard noch E-Mail-Auth aktivieren und ggf. den ersten Admin-User anlegen/registrieren.
- Ich gebe dir die direkten Dashboard-Links mit.

Sobald du den Plan freigibst, führe ich die Änderungen durch.