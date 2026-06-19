# Startseite – Teaser für alle Unterseiten

## Ziel
Die Startseite soll von **jeder Unterseite einen Vorgeschmack** zeigen – so wird Interesse geweckt und ein Klick führt direkt zur passenden Seite. Aktuell teasern wir nur Standorte, Leistungen und Angebote.

## Unterseiten & jeweiliger Teaser auf der Startseite

| Unterseite | Was wird angeteasert | CTA |
| --- | --- | --- |
| `/preise` | 3 Preis-Klassen (B / B197 / B78) mit Grundbetrag-Preis als Vorschau, "ab 65 € pro Fahrstunde" | "Alle Preise ansehen" |
| `/leistungen` | bestehender Block bleibt, leicht aufgewertet | "Alle Leistungen ansehen" |
| `/angebote` | bestehende Live-Offers-Sektion bleibt; falls keine aktiv: kleiner Teaser "Aktuell keine Aktion – schau bald wieder vorbei" + Link | "Alle Angebote" |
| `/erste-hilfe-kurs` | eigene Sektion mit kurzem Pitch (Dauer, was lernt man, Preis ab) + Bild/Icon | "Zum Erste-Hilfe-Kurs" |
| `/team` | horizontale Team-Vorschau (Avatare + Namen + Rolle, max. 4, aus DB) | "Ganzes Team ansehen" |
| `/ueber-uns` | kurzer "Wer wir sind"-Block (2–3 Sätze + Bild/Icon) | "Mehr über uns" |
| `/faq` | 3 häufigste Fragen als kleines Accordion | "Alle FAQ ansehen" |
| `/kontakt` | Standorte-Block (bleibt, ist schon top) | bleibt |

## Aufbau der neuen Startseite (in Reihenfolge)

```
1. HERO            (bleibt, leicht entschlackt – nur 2 Buttons: WhatsApp + Standorte)
2. TRUST STRIP     (bleibt)
3. PREISE-TEASER   ← NEU: 3 Mini-Karten Klasse B / B197 / B78 + "Preise ansehen"
4. LEISTUNGEN-TEASER (bestehender Block, leicht aufgewertet)
5. ANGEBOTE        (bleibt – mit Empty-State-Teaser falls leer)
6. ERSTE-HILFE-KURS-TEASER ← NEU: eigene Sektion mit Pitch + CTA
7. TEAM-TEASER     ← NEU: 4 Mitglieder horizontal + CTA
8. ÜBER-UNS-TEASER ← NEU: kompakter Block + CTA
9. FAQ-TEASER      ← NEU: Top-3 Fragen + CTA
10. STANDORTE      (bleibt)
11. WHY-Sektion    (gekürzt auf 3 Punkte statt 6, damit Seite nicht zu lang wird)
12. FINAL CTA      (bleibt)
```

## Was passiert technisch

- **`src/routes/index.tsx`** wird erweitert: zusätzliche Queries für `prices` (für Vorschau-Grundbeträge), `team_members` (Top 4 nach `sort_order`), `first_aid_info` (1 Eintrag für Pitch & Preis). FAQ-Daten werden – falls bisher hardcoded auf `/faq` – als kleines Top-3-Array zentralisiert (oder kurz aus der FAQ-Seite importiert).
- **Neue kleine Komponenten** inline in `index.tsx` (keine neuen Dateien, hält Footprint klein):
  - `PriceTeaserCard` – pro Klasse: Icon, Name, "ab X €", 2–3 Bullet-Highlights
  - `TeamTeaser` – horizontaler Avatar-Grid
  - `FaqTeaserItem` – Mini-Accordion (3 Stück)
- **Design-Sprache**: gleiche Tokens wie restliche Seite (primary-Rot, dunkler `#0a0a0a`-Block, `rounded-3xl`, Hover-Lift). Konsistente Section-Header (Eyebrow + H2 + Untertitel-Muster wie schon vorhanden).
- **Performance**: Alle zusätzlichen Daten in **einem `useQueries`-Block** parallel laden; Section nur rendern wenn Daten da sind (kein Layout-Shift).
- **Bestehende Sektionen bleiben funktional unverändert** (Standorte, Offers, Hero, Final-CTA).

## Was sich nicht ändert
- Keine Anmelde-Formulare auf der Startseite (Regel bleibt: Anmeldung nur in Filiale).
- Routing-Struktur, Footer, Navbar, Admin – unangetastet.
- Andere Unterseiten – unangetastet.

## Geänderte Dateien
- `src/routes/index.tsx` (erweitert)

## Offene Frage
Soll ich beim **FAQ-Teaser die Top-3-Fragen aus der bestehenden FAQ-Seite übernehmen** (ich lese die Liste dann aus `src/routes/faq.tsx`), oder möchtest du 3 konkrete Fragen vorgeben?
