## Ursache
Es gibt einen Eintrag „Schaltkompetenz-Fahrten" (Klasse B197) mit 70 €. Die anderen Fahrstunden liegen bei 65 €.

## Fix
Preis dieser einen Zeile auf `65 €` setzen – Daten-Update, keine Struktur-Änderung.

```sql
UPDATE prices SET price = '65 €' WHERE id = 'cbaab92d-8ab6-41be-9fd0-3a14a618e95d';
```
