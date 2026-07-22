## Plan

1. **Secret-Fallback finalisieren**
   - Den Admin-Supabase-Client so absichern, dass er zuverlässig `SERVICE_ROLE_KEY` nutzt, wenn `SUPABASE_SERVICE_ROLE_KEY` in der Laufzeit nicht verfügbar ist.
   - Die Fehlermeldung klarer machen, damit künftig sichtbar ist, ob `SERVICE_ROLE_KEY` oder `SUPABASE_SERVICE_ROLE_KEY` fehlt.

2. **Anmelde-Flow robuster machen**
   - Prüfen, ob der Submit aktuell schon beim Speichern der Anmeldung scheitert oder erst bei Vertrag/PDF/E-Mail.
   - Falls PDF/Resend/Storage fehlschlägt, darf die Anmeldung trotzdem gespeichert werden und der Admin soll den Fehler im Panel sehen.

3. **Live testen**
   - Das Formular `/anmeldung` mit Testdaten absenden.
   - Erfolgs-Toast oder gespeicherte Anmeldung verifizieren.
   - Falls noch ein Backend-Fehler kommt, direkt die konkrete Fehlerquelle im Server-Function-Log prüfen und gezielt beheben.

## Ziel

Nach dem Fix soll das Online-Anmeldeformular wieder absendbar sein und die Anmeldung im Admin-Bereich gespeichert werden; Vertragsversand bleibt zusätzlich aktiv, soll aber die Anmeldung nicht blockieren.