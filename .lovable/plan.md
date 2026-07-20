# Preis-Sneak-Peek auf der Startseite

## Ziel
Der aktuelle Preisbereich auf `/` zeigt drei große Klassen-Karten mit „Grundbetrag" – das doppelt die Unterseite und macht neugierig auf nichts. Stattdessen: kompakter, appetitanregender Auszug der Preistafel von `/preise`, klar Richtung „Mehr erfahren".

## Änderungen (nur `src/routes/index.tsx`, Sektion „PREISE TEASER", Zeilen ~334–ende der Section)

1. **Header schlanker**
   - Eyebrow „Preise & Klassen" bleibt.
   - Neue H2: „Faire Preise. Klar aufgelistet."
   - Kurzer Untertitel: Preise gelten für Klasse B, B197 und B78 – Unterschied nur im Fahrzeug/Prüfung.
   - Rechts weiterhin Link „Alle Preise ansehen →".

2. **Angebots-Banner bleibt unverändert** (nur wenn `hasActiveOffer`).

3. **Neuer Sneak-Peek** ersetzt das 3-Spalten-Klassen-Grid (`PRICE_CLASSES.map`):
   - Zentrierte weiße Karte im Stil der `/preise`-Tafel: abgerundete Ecken, dünner Rand, dezente Eck-Akzente, roter Akzentstrich oben.
   - Kopfzeile mit kleinem Logo-Emblem + Titel „MIRO-DRIVE Preise · Klasse B / B197 / B78".
   - Preiszeilen im Dotted-Leader-Look (Position links, Preis rechts, `€`), Positionen exakt wie auf `/preise`:
     - Grundbetrag
     - Lernprogramm
     - Übungsstunde  ← Hervorhebung wie auf Unterseite
     - Theorieprüfung
     - Praxisprüfung
   - Werte werden aus DB gezogen (`rowFor("Klasse B")` bzw. entsprechender Preise-Query wie auf `/preise`). Falls Startseite bislang nur einen Preis pro Klasse lädt: die auf `/preise` genutzte Query-Logik übernehmen (nur Lese-Layer, keine Business-Logik-Änderung).
   - Bei aktivem Angebot: in Zeile „Grundbetrag" alter Preis durchgestrichen + neuer Preis.
   - Unterste 1–2 Zeilen mit sanftem Fade-Out (Gradient-Maske), Signal „hier gibt's noch mehr".

4. **CTA**
   - Zentrierter Primär-Button „Mehr erfahren →" unter der Karte → `/preise`.
   - Kleiner sekundärer Text: „Vollständige Preisliste & Klassen-Vergleich".

5. **Aufräumen**
   - `PRICE_CLASSES`-Konstante und dazugehöriges 3-Spalten-Grid in dieser Sektion entfallen.
   - Prüfen ob `PRICE_CLASSES` anderswo genutzt wird; wenn nein, entfernen.

## Mobile
- Karte volle Breite, kompaktes Padding, `text-sm` in den Zeilen, Fade + CTA zentriert.

## Nicht angefasst
- `/preise` Unterseite, Hero, Leistungen, Team, Erste-Hilfe, Führerscheinantrag, Sprachen, DB, Server-Funktionen.
