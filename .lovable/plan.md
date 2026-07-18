# Punkt 2 + 3: Preise sichtbarer, Laufband entfernen

## Was ich ändere

### 1. Laufband entfernen (Punkt 3)
In `src/routes/index.tsx` den kompletten Abschnitt „MARQUEE TICKER" (Zeilen 248–258) entfernen — das durchlaufende Klassenband unter dem Hero.

### 2. Preise sichtbarer machen (Punkt 2)
Der Preisbereich existiert bereits weiter unten (Sektion „Drei Klassen, transparente Preise"), aber er ist tief auf der Seite versteckt. Zwei Verbesserungen:

**a) Zusätzlicher, kompakter Preis-Anker direkt nach dem Hero**  
An der Stelle, wo bisher das Laufband war, kommt ein neuer, klarer Block:
- Überschrift „Unsere Preise auf einen Blick"
- 3 kompakte Karten nebeneinander (Klasse B · B197 · B78) mit Grundbetrag aus der Datenbank
- Wenn ein Angebot aktiv ist, wird der Aktionspreis mit durchgestrichenem alten Preis angezeigt
- Button „Alle Preise ansehen" → `/preise`
- Mobil: horizontal scrollbare Karten statt Grid

**b) Bestehende ausführliche Preissektion bleibt**  
Die tiefer liegende Sektion mit der vollständigen Preistabelle bleibt unverändert — sie liefert die Details für Interessenten, die weiter scrollen.

## Ergebnis
- Der „Spielothek-Effekt" ist weg.
- Preise sind sofort nach dem Hero sichtbar, ohne den bestehenden ausführlichen Bereich zu verlieren.
- Datenquelle bleibt die `prices`-Tabelle in Supabase — Änderungen im Admin wirken sofort.
