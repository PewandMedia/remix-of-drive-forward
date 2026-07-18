## Ziel
Miro-Drive Supabase-Projekt (`slrbtiviwvwvjjafbgkp`) mit den Inhalten des alten Projekts (`elvsfhgnrjusgfxqhpiq`) befüllen und `admin@gmail.com` als Admin einrichten. Verbindung bleibt Supabase, keine Fehler.

## Schritte

1. **Daten aus altem Projekt exportieren**
   - Auslesen aller Zeilen aus `prices`, `team_members`, `first_aid_info`, `offers`, `instagram_posts` im alten Projekt (`elvsfhgnrjusgfxqhpiq`) per Read-Query.

2. **Daten in Miro-Drive einspielen**
   - `INSERT`-Statements gegen `slrbtiviwvwvjjafbgkp` mit den exportierten Zeilen (inkl. Original-IDs, damit Bildpfade/Referenzen konsistent bleiben).
   - Nur öffentliche Inhalts-Tabellen — `inquiries` (Kundenanfragen) und `user_roles` (alte User-IDs existieren im neuen Auth nicht) werden nicht kopiert.

3. **Admin-User anlegen**
   - Du registrierst dich einmal auf `/auth` mit `admin@gmail.com` und einem Passwort deiner Wahl.
   - Danach trage ich die neue `auth.users`-ID in `public.user_roles` als `admin` ein.

4. **Verifikation**
   - Startseite, Preise, Team, Erste-Hilfe laden mit Inhalten.
   - Login mit `admin@gmail.com` funktioniert, `/admin` ist zugänglich.

## Was du tun musst
- Nach Schritt 2: auf `/auth` mit `admin@gmail.com` registrieren und mir Bescheid geben, dann setze ich die Admin-Rolle.
