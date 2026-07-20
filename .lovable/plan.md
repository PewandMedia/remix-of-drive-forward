## Ziel
Die `/preise` Seite auf ein hochwertiges, seriöses Fahrschul-Design heben. Doppeltes MIRO-DRIVE entfernen, externe TÜV-Gebühren raus, Preisliste als Premium-Design umsetzen.

## Änderungen in `src/routes/preise.tsx`

### 1. Header aufräumen
- Nur **ein** Logo/Wortmarke im Hero (aktuell steht MIRO-DRIVE im Logo UND in der H1 → doppelt).
- Neue H1: **„Preise"** in großer, seriöser Serif-Typo (z. B. Instrument Serif Stil) mit dezenter Unterzeile „Transparent. Fair. Ohne versteckte Kosten." — Logo separat klein darüber als Emblem.
- Ruhiger, heller Hintergrund mit sehr dezentem Rot-Akzent (kein Farbverlauf-Overkill).

### 2. Zentrale Preistafel (Premium-Look)
Umbau der bisherigen „Dotted Leader"-Liste zu einer echten Preistafel:
- Große weiße Karte, edler Rahmen (1px `border-slate-200`), sanfter Schatten, mehr Padding.
- Jede Zeile: Positionstitel links (seriöse Serif, größer), rechts Preis in Tabellen-Typo mit **€**-Symbol und Tabular-Nums, dezente Trennlinie darunter.
- Kleiner grauer Sub-Text pro Zeile (z. B. „einmalig", „pro 45 Min.", „pro Antritt") für Kontext.
- Rot als Akzent nur für die Preiszahl der Übungsstunde (Kern-USP) — Rest in `text-slate-900`.
- Preise weiterhin dynamisch aus „Klasse B"-Kategorie (Grundbetrag, Lernprogramm, Übungsstunde, Theorieprüfung, Praxisprüfung).

### 3. Externe TÜV-Gebühren-Sektion komplett entfernen
Kompletter Block raus (inkl. Überschrift, Karten, Hinweis-Text).

### 4. Klassen-Vergleich behalten, aber ruhiger
- Aktuelle 3 Karten (B / B197 / B78) beibehalten, aber Typo und Abstände an neuen Header angleichen.
- Keine Preise in den Karten — nur inhaltliche Unterschiede.

### 5. Abschluss-CTA
Schmaler Call-to-Action unter der Preistafel: „Jetzt online anmelden" + WhatsApp-Button (konsistent mit Startseite).

## Technisch
- Nur `src/routes/preise.tsx` wird angefasst.
- Keine Datenbank-, Query- oder Admin-Änderungen.
- Preisdaten-Quelle (`prices` Query, Kategorie „Klasse B") bleibt unverändert.
