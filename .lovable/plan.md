## Passwort für admin@gmail.com setzen

Setze das Passwort des Users `admin@gmail.com` im Miro-Drive Supabase-Projekt via Admin API auf `123123123`.

### Schritte
1. User-ID von `admin@gmail.com` in `auth.users` abfragen.
2. Einmaligen Server-Aufruf mit `supabaseAdmin.auth.admin.updateUserById(id, { password: "123123123" })` ausführen (temporäre Server-Function, danach entfernt) — oder alternativ direkt über das Supabase Dashboard (Auth → Users → Reset password).

### Hinweis
`123123123` ist unsicher. Empfehlung: nach dem ersten Login im Admin-Bereich sofort ändern.
