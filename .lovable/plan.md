## Problem

Beim Absenden der Online-Anmeldung schlägt der Server-Aufruf mit
`Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY` fehl
(sichtbar in den Netzwerk-Logs und im Session-Replay als Toast).

Ursache: Das Projekt ist mit einem **externen** Supabase-Projekt verbunden.
Der `SUPABASE_SERVICE_ROLE_KEY` erscheint zwar in der Supabase-Secrets-Liste,
wird aber **nicht** in die Laufzeit-Umgebung der TanStack-Server-Funktionen
injiziert (`process.env.SUPABASE_SERVICE_ROLE_KEY` ist `missing`). Ohne diesen
Key kann `supabaseAdmin` die Anmeldung nicht in `inquiries` speichern
→ nichts passiert sichtbar für den Nutzer.

## Fix

1. Den Service-Role-Key des verbundenen Supabase-Projekts als App-Secret
   hinzufügen (`add_secret` öffnet ein sicheres Formular; du fügst den Key
   einmalig ein). Damit ist er sowohl in Preview als auch in Production
   als `process.env.SUPABASE_SERVICE_ROLE_KEY` verfügbar.
2. Danach die Anmeldung erneut testen — PDF-Erstellung, Storage-Upload und
   Resend-Mail laufen dann durch.

Wo du den Key findest: Supabase Dashboard → Project Settings → API →
"service_role" secret (nur einmal sichtbar; kopieren und einfügen).

Keine Code-Änderungen nötig.