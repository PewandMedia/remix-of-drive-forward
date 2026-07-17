Ich habe die Ursache gefunden: Die App ist teilweise auf das neue Supabase-Projekt `slrbtiviwvwvjjafbgkp` konfiguriert, aber `.env` und `src/integrations/supabase/client.ts` zeigen noch auf das alte Projekt `elvsfhgnrjusgfxqhpiq`. Dadurch fragt die App teils die falsche Datenbank ab. Zusätzlich fehlt im neuen Projekt die Data-API-Berechtigung auf die Public-Tabellen, und öffentliche RLS-Policies rufen `has_role()` auf, obwohl anonyme Besucher diese Funktion nicht ausführen dürfen. Genau daher kommt `permission denied for function has_role`.

## Plan

1. **Supabase-Verbindung vollständig auf Miro-Drive umstellen**
   - `.env` auf `slrbtiviwvwvjjafbgkp` aktualisieren.
   - `src/integrations/supabase/client.ts` so ändern, dass es die `VITE_SUPABASE_*` Variablen nutzt statt hart codierter alter Projektwerte.
   - Dadurch nutzen Browser und Server dieselbe Supabase-Instanz.

2. **Datenbank-Berechtigungen korrekt nachziehen**
   - Per Migration `GRANT`-Berechtigungen für alle App-Tabellen setzen:
     - öffentliche Lesetabellen: `offers`, `prices`, `team_members`, `instagram_posts`, `first_aid_info`
     - Kontaktformular: `inquiries` mit öffentlichem Erstellen, aber nur Admin-Lesen/Bearbeiten/Löschen
     - Rollen: `user_roles` nur für angemeldete Nutzer und Service-Rolle
   - Das behebt fehlende Data-API-Zugriffe.

3. **RLS-Policies reparieren**
   - Öffentliche Lesepolicies ändern, damit sie nur öffentlich sichtbare aktive Daten lesen lassen und nicht mehr `has_role()` für anonyme Nutzer aufrufen.
   - Separate Admin-Policies bleiben für angemeldete Admins bestehen.
   - Dadurch ist `has_role()` nicht mehr Teil öffentlicher Website-Abfragen.

4. **Admin-Rollenfunktion sicher und funktionsfähig lassen**
   - `has_role()` bleibt `SECURITY DEFINER`, weil RLS-Policies damit Adminrechte prüfen.
   - Execute bleibt nur für `authenticated` und `service_role`, nicht für anonyme Besucher.
   - Damit ist der Runtime-Fehler weg, ohne die Funktion öffentlich zu öffnen.

5. **Prüfen nach Umsetzung**
   - Datenbank-Linter erneut laufen lassen.
   - Public-Abfragen für Preise, Team, Angebote und Erste-Hilfe testen.
   - Preview prüfen, dass die Startseite ohne `has_role`-Fehler lädt.

## Hinweis

Für den finalen Verbindungswechsel brauche ich den neuen `anon public` Key aus dem Supabase-Projekt **Miro-Drive**. Falls er noch nicht in Lovable verfügbar ist, öffne bitte in Supabase:

`Project Settings → API → anon public key`

Dann kann ich die App komplett auf das neue Projekt umstellen.