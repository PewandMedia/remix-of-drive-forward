Ziel: Den fehlenden „Grundbetrag 299 €“ als ersten Preis-Eintrag ergänzen und die Darstellung auf der Startseite sowie der Preis-Unterseite optisch aufwerten.

Annahmen (bitte bestätigen/korrigieren):
- Der Grundbetrag gilt für alle drei Klassen (B, B197, B78), da die Seite bisher „identische Preise“ kommuniziert.
- Die gewünschte Reihenfolge ist: Grundbetrag → Lernprogramm → Übungsstunde → Theorieprüfung → Praxisprüfung.

Schritte:

1. Datenbank: Grundbetrag anlegen
   - In `prices` je einen aktiven Datensatz pro Kategorie (Klasse B, Klasse B197, Klasse B78) einfügen:
     - title: „Grundbetrag"
     - price: „299 €"
     - description: „Einmalig – Anmeldung & Verwaltung"
     - sort_order: 1 (vor Lernprogramm)
     - active: true
   - Tool: `supabase--insert`

2. Preis-Unterseite `/preise` verbessern
   - `STANDARD_ROWS` um „Grundbetrag" als ersten Eintrag erweitern.
   - Reihenfolge sicherstellen: Grundbetrag, Lernprogramm, Übungsstunde, Theorieprüfung, Praxisprüfung.
   - Visuelles Highlight für den Grundbetrag: z. B. leicht abgesetzter Hintergrund, „Einmalig"-Badge oder fettere Typografie, damit er als Fixkosten-Position sofort erkennbar ist.
   - Optional: Kleine „Gesamtkosten-Beispiel"-Zeile oder Info-Box unter der Tabelle, die Grundbetrag + Übungsstunden erklärt.

3. Startseiten-Preis-Teaser verbessern
   - `SNEAK_ROWS` ebenfalls um „Grundbetrag" als ersten Eintrag erweitern.
   - Gleiche Reihenfolge wie auf `/preise`.
   - Grundbetrag optisch hervorheben (z. B. roter Akzent, Badge „Einmalig").
   - Teaser-Karte aufhübschen: bessere Whitespace, klare Trennung zwischen einmaligem Grundbetrag und wiederkehrenden Positionen, CTA „Vollständige Preisliste ansehen" beibehalten.

4. Validierung
   - Build laufen lassen.
   - Im Preview prüfen:
     - `/preise` zeigt Grundbetrag 299 € an erster Stelle.
     - Startseiten-Preisteaser zeigt Grundbetrag an erster Stelle.
     - Mobile & Desktop sehen sauber aus.

Technische Details:
- Betroffene Dateien:
  - `src/routes/preise.tsx`
  - `src/routes/index.tsx`
  - Datenbank-Tabelle `prices`
- Keine Schema-Änderungen nötig; reine Daten-Einfügung plus UI-Anpassung.

Falls der Grundbetrag nur für eine bestimmte Klasse gelten soll oder du andere Verbesserungen im Sinn hast (z. B. Farbe, Layout, zusätzliche Info-Box), sag kurz Bescheid.