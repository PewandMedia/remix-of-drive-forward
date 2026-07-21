Ziel: Preistabelle im Admin auf die 5 offiziellen Positionen reduzieren und den Toggle als Angebots-Schalter (rot = Aktion aktiv) mit automatischem Rückfall auf den Ursprungspreis nutzen.

1. Datenbank aufräumen
   - `Sonderfahrten`, `Übungsstunde (Automatik)`, `Schaltkompetenz-Fahrten` aus `prices` löschen (alle Klassen).
   - Übrig bleiben nur: Grundbetrag, Lernprogramm, Übungsstunde, Vorstellung Theorieprüfung, Vorstellung Praxisprüfung — identisch zur Startseite und `/preise`.
   - Tool: `supabase--insert` (DELETE).

2. Admin-Toggle umfunktionieren (`src/routes/_authenticated/admin.tsx`, `PricesAdmin`)
   - Spalte „Aktiv" → „Angebot" (der bestehende „Angebot"-Info-Spaltentext wandert als Sublabel darunter oder entfällt).
   - Toggle schaltet jetzt `offer_active` statt `active`:
     - AN: `offer_active=true`; wenn `old_price` leer ist, wird der aktuelle Preis in `old_price` gesichert. Button rot (Switch bekommt `data-state=checked` mit primary-Farbe – bereits so gestylt).
     - AUS: `offer_active=false`; falls `old_price` gesetzt war, wird `price` auf `old_price` zurückgesetzt, `old_price`, `offer_label`, `offer_note`, `offer_valid_from`, `offer_valid_until` werden auf `null` gesetzt.
   - `active` bleibt für sichtbare Positionen stets `true` (kein UI dafür mehr in der Tabelle).
   - Neue Mutation `toggleOffer` ersetzt `toggleActive` und wendet die Logik auf alle IDs einer Gruppe (Klasse B/B197/B78) gleichzeitig an.

3. Validierung
   - Preview `/admin`: nur 5 Zeilen, Toggle rot bei aktivem Angebot, Deaktivieren stellt Ursprungspreis wieder her.
   - `/preise` und Startseiten-Teaser bleiben unverändert korrekt.

Technische Details:
- Betroffene Dateien: `src/routes/_authenticated/admin.tsx`.
- Keine Schema-Änderung, nur Datenlöschung + UI-Logik.