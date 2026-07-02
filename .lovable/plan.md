## Problem
Login schlägt fehl, weil das gespeicherte Passwort nicht `123123123` ist.

## Lösung
Passwort des Admin-Users per SQL sauber zurücksetzen.

### Zugangsdaten nach Fix
- **E-Mail:** `miro-drive@media.de`
- **Passwort:** `123123123`

### Schritt
`UPDATE auth.users SET encrypted_password = crypt('123123123', gen_salt('bf')), email_confirmed_at = now(), updated_at = now() WHERE email ILIKE 'miro-drive@media.de';`

Kein Frontend-Code wird verändert.