## Nächste Schritte nach Supabase-Verbindung

Supabase ist verbunden (`uxcwnrfjlswmrpnjwubm`), aber die DB ist leer und es gibt einen Runtime-Fehler.

### 1. Schema in neuer Supabase-DB anlegen
Die Datei `supabase/migration_new_project.sql` enthält das komplette Schema (Tabellen, Enums, RLS, Trigger, `has_role`). 
→ Du öffnest den Supabase SQL-Editor und führst die Datei einmal aus.
[SQL-Editor öffnen](https://supabase.com/dashboard/project/uxcwnrfjlswmrpnjwubm/sql/new)

### 2. SSR-Fehler beheben (`localStorage is not defined`)
Der auto-generierte `src/integrations/supabase/client.ts` referenziert `localStorage` ohne `typeof window`-Guard beim SSR-Rendering. Ich patche den Client so, dass `storage` nur im Browser gesetzt wird — analog zum bestehenden Muster in anderen Lovable-Projekten.

### 3. Auth-Provider aktivieren
E-Mail-Login in Supabase aktivieren, damit `/auth` funktioniert.
[Auth-Provider öffnen](https://supabase.com/dashboard/project/uxcwnrfjlswmrpnjwubm/auth/providers)

### 4. Ersten Admin-User anlegen
- Über `/auth` mit E-Mail/Passwort registrieren (oder Nutzer manuell im Dashboard anlegen)
- `bootstrapFirstAdmin` Server-Function aufrufen (existiert bereits in `src/lib/admin.functions.ts`) → weist dem ersten User automatisch die `admin`-Rolle zu
[Users öffnen](https://supabase.com/dashboard/project/uxcwnrfjlswmrpnjwubm/auth/users)

### 5. Test
- `/` lädt ohne Fehler
- `/preise`, `/team` zeigen (leere) Daten aus der neuen DB
- `/auth` → `/admin` funktioniert

### Reihenfolge
Zuerst mache ich Schritt 2 (Code-Fix), damit die Vorschau wieder läuft. Schritte 1, 3, 4 machst du im Supabase-Dashboard — ich sage dir jeweils genau was zu tun ist.

Passt das so, oder willst du eine andere Reihenfolge?
