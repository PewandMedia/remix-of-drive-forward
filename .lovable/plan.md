
## Ziel

`/preise` wird komplett neu aufgebaut. Statt drei fast identischer Klassen-Karten mit doppelten Preisen gibt es **eine zentrale, seriöse Preistafel** (Grundbetrag, Lernprogramm, Übungsstunde, Theorieprüfung, Praxisprüfung) — plus einen kompakten Bereich, der die **Unterschiede zwischen den Klassen B, B197 und B78** klar herausstellt. Look: hell, hochmodern, ruhig, „Millionen-Fahrschule".

## Neuer Seitenaufbau (`src/routes/preise.tsx`)

```text
┌───────────────────────────────────────────────┐
│  [Logo]                                       │
│  MIRO-DRIVE Preise                            │
│  Transparent · Fair · Ohne versteckte Kosten  │
├───────────────────────────────────────────────┤
│  DIE PREISE (eine Tabelle für alle Klassen)   │
│  ─ Grundbetrag ............... 299 €          │
│  ─ Lernprogramm ...............  80 €          │
│  ─ Übungsstunde (45 Min) ......  65 €          │
│  ─ Theorieprüfung .............  85 €          │
│  ─ Praxisprüfung .............. 240 €          │
│                                               │
│  Hinweis: Sonderfahrten = Übungsstunde        │
├───────────────────────────────────────────────┤
│  KLASSEN IM VERGLEICH (3 schlanke Karten)     │
│  Klasse B  │  Klasse B197 ★  │  Klasse B78   │
│  Nur der Unterschied — keine Preise mehr      │
├───────────────────────────────────────────────┤
│  Externe TÜV-Gebühren (bleibt, aufgeräumt)    │
├───────────────────────────────────────────────┤
│  Erste-Hilfe / Kontakt Teaser (bleibt)        │
│  Dunkler CTA-Block (bleibt)                   │
└───────────────────────────────────────────────┘
```

### 1. Hero der Preistafel
- Bestehende `PageHero` durch eigenen, ruhigen Header ersetzen: Logo (`/images/miro-drive-logo.svg`) links, „MIRO-DRIVE Preise" als große Display-Headline, kurzer Subtitel.
- Heller Hintergrund (weiß / `bg-slate-50`), feine Trennlinie, kein dunkler Verlauf.

### 2. Zentrale Preistafel (Kernstück)
- Große weiße Karte, `rounded-3xl`, dezenter Schatten, feine Border.
- Kopfzeile: „Preise gültig für Klasse B, B197 und B78" + kleines „Stand: aktuell" Chip.
- Preiszeilen als klare Liste mit Dotted-Leader-Look (Titel links, Preis rechts, dünner Trenner). Jede Zeile:
  - Grundbetrag — 299 €
  - Lernprogramm — 80 €
  - Übungsstunde (45 Min) — 65 €
  - Theorieprüfung — 85 €
  - Praxisprüfung — 240 €
- Preise in `font-display`, tabellarisch, Rot-Akzent nur bei aktiven Angeboten (`isOfferLive` + `offer_label` + Countdown) — die bestehende Offer-Logik aus `src/lib/offer.ts` bleibt erhalten.
- Fußnote: „Sonderfahrten (Überland, Autobahn, Dunkel) werden wie Übungsstunden abgerechnet."

### 3. Klassen im Vergleich (nur Unterschiede)
- 3 schlanke Karten in `grid-cols-1 md:grid-cols-3`, hell (`bg-white`), Icon + Klassenname + Kurz-Tagline + 3–4 Fakten (Sonderfahrten, Getriebe-Hinweis, Prüfungshinweis).
- **Keine Preisangaben** in diesen Karten — Preise stehen ausschließlich in der Tafel oben.
- B197 bleibt visuell hervorgehoben (dünner Rot-Ring + „Am beliebtesten"-Chip), aber deutlich zurückhaltender als bisher.

### 4. Bestehende Blöcke
- Externe TÜV-Gebühren, Erste-Hilfe-Teaser, Kontakt-Teaser und dunkler CTA-Block bleiben inhaltlich, werden nur an das ruhigere Layout angepasst (gleiche Radien, gleiche Schatten).

## Daten & Admin

- **Kein Schema-Change.** Die Tafel liest die 5 Standardpositionen aus der bestehenden `prices`-Tabelle über eine feste, sprechende Reihenfolge nach `title` (Grundbetrag, Lernprogramm, Übungsstunde, Theorieprüfung, Praxisprüfung).
- Sollten diese Titel in der DB fehlen/abweichen, wird über eine kleine Migration `title` normalisiert und Kategorie auf einen einheitlichen Wert (z. B. „Standardpreise") gesetzt. Klassenspezifische Duplikate werden **nicht gelöscht** — sie werden auf der Seite nur nicht mehr angezeigt. Admin-Panel bleibt unverändert nutzbar.
- Angebots-Felder (`old_price`, `offer_label`, `offer_valid_until`, `offer_note`) funktionieren weiter — sie färben die betroffene Preiszeile rot und zeigen Countdown.

## Startseite

- Der Preis-Teaser auf `/` bleibt strukturell gleich, wird nur an die neue Optik angeglichen (gleiche Card-Radien/Schatten). Keine Preisänderung dort.

## Technische Details

- Datei: `src/routes/preise.tsx` wird neu geschrieben. `CATEGORIES`-Konstante wird stark reduziert (nur noch Vergleichs-Fakten, keine Preise).
- Logo via `<img src="/images/miro-drive-logo.svg" />` im neuen Header.
- Typografie: bestehende `font-display` beibehalten; keine neuen Fonts.
- Farben: bestehendes Rot (`primary`, `#c8102e`) nur als Akzent, dominante Fläche bleibt weiß/`slate-50`.
- Keine Änderungen an Admin-Panel, DB-Schema, Server Functions oder anderen Routen nötig.

## Nicht im Scope
- Keine Änderung am Admin-CRUD.
- Keine Änderung an Startseite außer optionaler Optik-Angleichung des Preis-Teasers.
- Kein Redesign von Header/Footer.
