## Problem

Im Admin-Panel wird beim Aktivieren eines Angebots der bisherige Preis in „Alter Preis" gespiegelt, während das Feld „Preis" zum Aktionspreis wird. Beim **Deaktivieren** von „Angebot aktiv" bleibt aber der Aktionspreis im Feld „Preis" stehen und wird gespeichert — der ursprüngliche Preis geht verloren.

## Lösung (nur `src/routes/_authenticated/admin.tsx`)

1. **Beim Umschalten von aktiv → inaktiv im Dialog:**
   - Wenn `offerActive` von `true` auf `false` wechselt und `oldPriceNum` gesetzt ist → `priceNum` automatisch auf `oldPriceNum` zurücksetzen.
   - `oldPriceNum`, `offerLabel`, `offerNote`, `validFrom`, `validUntil` leeren, damit die Angebotsdaten sauber verschwinden.

2. **Speichern-Logik (`save.mutationFn`) absichern:**
   - Wenn `offerActive === false` und `oldPriceNum` vorhanden, sende `price = "<oldPriceNum> €"` statt des zuletzt eingegebenen Aktionspreises.
   - `old_price`, `offer_label`, `offer_note`, `offer_valid_from`, `offer_valid_until` bleiben `null` (wie schon jetzt).

3. **UX-Hinweis** direkt unter der Checkbox: „Beim Deaktivieren wird automatisch der ursprüngliche Preis wiederhergestellt."

Keine Datenbank- oder Schema-Änderungen nötig. Andere Panels (Team, Erste-Hilfe, Instagram) bleiben unverändert.