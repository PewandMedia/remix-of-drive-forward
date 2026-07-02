## Ziel
1. „Auffrischungsstunden“ komplett aus der Website entfernen (Startseite, Leistungen, Preise, FAQ, Metadaten).
2. Die Startseiten-Sektion unter „Alle Leistungen ansehen“ visuell aufwerten – aktuelles Icon+Label-Raster wirkt „tot".

---

## 1. Entfernung: Auffrischungsstunden

Betroffene Dateien:

- **src/routes/index.tsx**
  - Titelzeile der Services-Teaser-Sektion: „Führerschein Klasse B, B197 & Auffrischungsstunden in Bochum" → anpassen.
  - Beschreibungstext in derselben Sektion: Satz mit „Auffrischungsstunden" entfernen/umschreiben.
  - Grid-Item „Auffrischungs­stunden" mit Clock-Icon entfernen.
  - SEO-Meta-Description (Head): „Auffrischungsstunden" entfernen.
  - Marquee-Ticker prüfen (steht aktuell nicht drin).

- **src/routes/leistungen.tsx**
  - Eintrag „Auffrischungsstunden in Bochum" aus `services`-Array entfernen.
  - Bild-Import `imgAuffrischung` entfernen.
  - `RotateCcw` aus Lucide-Imports entfernen.

- **src/routes/preise.tsx**
  - `meta`-Description/og:description anpassen (keine „Auffrischungsstunden" mehr).

- **src/routes/faq.tsx**
  - FAQ-Antworten umschreiben, die „Auffrischungsstunden" erwähnen (2 Stück).

- **src/routes/__root.tsx**
  - Prüfen und ggf. „Auffrischungsstunden" aus Meta/Nav/Text entfernen.

---

## 2. Redesign: „Alle Leistungen ansehen"-Sektion auf der Startseite

Aktuell: 2-Spalten-Layout mit Text links und 4 langweiligen Icon+Label-Kacheln rechts (B, B197, B78, Auffrischung). Keine Tiefe, keine Bilder, keine Interaktion.

Neu: Die 3 verbleibenden Klassen (B, B197, B78) werden als **visuelle Mini-Leistungskarten** dargestellt – mit den echten Fotos aus der Leistungen-Seite (klasse-b.jpg, b197.jpg, …), kurzem Beschreibungstext und einem „Mehr erfahren"-Link. Das macht die Sektion lebendiger und verknüpft sie direkt mit den Inhalten der Leistungsseite.

Konkrete Änderungen in **src/routes/index.tsx**:
- Rechtes Grid ersetzen durch 3 Karten im **Bento-Stil** (2+1 oder 3 nebeneinander je nach Breakpoint).
- Jede Karte: Bild oben (Aspect 16/10, object-cover), darunter Titel + 1-Zeilen-Text + Pfeil-Link.
- „Alle Leistungen ansehen"-Button bleibt links erhalten.
- Farbschema beibehalten (weiße Karten, schwarze Schrift, Primary-Akzente).

Keine Backend-/DB-Änderungen nötig.
