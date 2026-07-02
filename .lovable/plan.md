## Ziel
Gleiche Positionen (z. B. „Grundbetrag") einmal bearbeiten → gilt automatisch für Klasse B, B197, B78.

## Umsetzung
Nur `src/routes/_authenticated/admin.tsx` wird geändert. Datenbank & Frontend bleiben unverändert.

1. Zeilen im Preis-Tab nach `title` gruppieren, wenn `category` ∈ {Klasse B, Klasse B197, Klasse B78}. Sonstige Kategorien bleiben Einzelzeilen.
2. Gruppenzeile zeigt die gemeinsamen Werte + Badge „gilt für: B · B197 · B78".
3. Bearbeiten-Dialog speichert per Bulk-Update (`.in("id", groupIds)`) die Felder `price`, `old_price`, `offer_active`, `offer_label`, `offer_valid_from`, `offer_valid_until`, `active`, `description` auf alle Zeilen der Gruppe. `category`/`title` bleiben pro Zeile erhalten.
4. Aktiv-Toggle und Löschen wirken ebenfalls auf die ganze Gruppe.
5. „Preis hinzufügen": neuer Schalter „Für alle Klassen anlegen" – erstellt 3 Zeilen gleichzeitig.