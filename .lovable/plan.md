Problem: Im Preis-Bearbeiten-Dialog gibt es unten eine Checkbox „Aktiv“, die nicht funktioniert. Die Aktivierung/Deaktivierung erfolgt bereits über den Switch in der Preistabelle.

Änderungen in `src/routes/_authenticated/admin.tsx`:

1. Entferne die Checkbox-Zeile am Ende des `PriceDialog`-Formulars:
   ```tsx
   <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={initial?.active ?? true} /> Aktiv</label>
   ```

2. Passe die Speicher-Logik an, damit das `active`-Feld nicht versehentlich auf `false` gesetzt wird:
   - Beim Erstellen eines neuen Preises: `active: true` als Standardwert setzen.
   - Beim Bearbeiten: Den bestehenden `active`-Zustand beibehalten, indem `initial?.active` als Hidden-Input übergeben oder im Update-Objekt explizit übernommen wird.

3. Der Switch in der Preistabelle bleibt die einzige Stelle, um Preise aktiv/inaktiv zu schalten.

Das ist eine kleine, isolierte Korrektur.