# Plan: Hero-Text & Logo-Veranschaulichung

## Änderungen in `src/routes/index.tsx` (Hero-Section)

### 1. Neuer Hero-Text (linke Spalte)
- Eyebrow bleibt: „Fahrschule · Bochum · Herne · NRW"
- Neue H1: **„Fahrschule MIRO-DRIVE – die Nr. 1 Fahrschule in Bochum."**
  - „Nr. 1" als rotes/italic Akzentwort hervorgehoben
- Sub-Copy klar formuliert mit den 2 Standorten:
  - „Zwei Filialen mitten in Bochum: **Bochum Zentrum (Brückstraße 53)** und **Bochum Riemke (Herner Str. 365)**. Klasse B, B197 & B78 – persönlich betreut, fair bepreist."
- Trust-Row unten bleibt (2 Filialen, WhatsApp-Anmeldung, Automatik & Schalter, Persönliche Betreuung)

### 2. Rechte Spalte – Logo-Veranschaulichung über Bento
Über der 5.0★-Karte kommt ein neues Logo-Panel:
- Elegante Karte mit rotem Radial-Glow im Hintergrund
- MIRO-DRIVE Logo groß und zentriert (`src/assets/miro-logo.png`)
- Darunter eine dünne rote Trennlinie mit dem Label „Nr. 1 Fahrschule in Bochum"
- Sitzt direkt über der Google-Rating-Bento-Karte, wirkt wie ein Brand-Header für die Stat-Sektion
- Weiche Schatten, abgerundet (rounded-3xl), passend zum bestehenden Bento-Grid

### 3. Bento darunter bleibt strukturell gleich
- 5,0 ★ · 549 Bewertungen (klickbar zu Google)
- Filialen-Karte
- Klassen-Karte
- Schwarze „Anmeldung in Minuten"-Karte

## Technisch
- Nur `src/routes/index.tsx` wird angefasst
- Logo-Import via bestehendem `miro-logo.png.asset.json`
- Keine neuen Assets, keine Backend-Änderungen
- Verifikation per Playwright (Desktop + Mobile Screenshot), damit Layout auf beiden Ansichten sauber steht
