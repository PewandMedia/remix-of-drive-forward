## Ziel

Startseiten-Hero ersetzen durch einen modernen, hochwertigen Full-Bleed Hero mit dem hochgeladenen Seedance-2.0-Video als Hintergrund, neuer Headline/Subheadline und drei klaren CTAs.

## Umsetzung

**1. Video als Asset einbinden**
- Hochgeladenes MP4 aus `user-uploads://hf_20260718_145213_bf877e7f-128c-4b93-8d47-74c0ebe78d2e.mp4` via `lovable-assets` CDN hochladen als `src/assets/hero-video.mp4.asset.json`.
- Nutzung als `<video autoPlay muted loop playsInline preload="auto" poster>` für saubere mobile Wiedergabe.

**2. Hero neu bauen (`src/routes/index.tsx`, Zeilen 102–232)**

Layout (Full-Bleed, ~min-h-[90vh] Desktop / 85vh Mobile):
- Hintergrund: Video absolut, `object-cover`, mit dunklem Verlaufs-Overlay (`from-black/85 via-black/60 to-black/40`) + subtiler roter Radial-Glow rechts unten für Brand-Akzent.
- Container zentriert links-ausgerichtet, max-w-4xl.
- Oben: Google-Bewertungs-Pill (transparent/glasig, weißer Text).
- Eyebrow: `Fahrschule · Bochum · NRW` in roter Signatur.
- **Headline (H1, riesig, weiß, Display):** „Fahrschule Bochum – modern, persönlich und sicher zum Führerschein." — mit „modern, persönlich und sicher" als roter Kursiv-Akzent.
- **Subheadline (weiß/80):** „MIRO-DRIVE ist deine moderne Fahrschule in Bochum Innenstadt, am Rathaus und in Bochum Riemke. Wir begleiten dich persönlich von der Anmeldung bis zur bestandenen Prüfung."
- **3 Buttons:**
  - Primary Rot: „Jetzt online anmelden" → `/anmeldung`
  - Weiß/Glas: „Kostenlose Beratung anfragen" → `/kontakt`
  - Outline weiß: „Preise ansehen" → `/preise`
- Trust-Zeile unten: Filialen · WhatsApp-Anmeldung · Automatik & Schalter · Persönliche Betreuung (weiße Checks).
- Scroll-Indikator am unteren Rand (dezent).

**3. Rechte Bento-Spalte entfernen**
- Die aktuelle Stats-Bento (Logo/Rating/Filialen/Klassen/WhatsApp-Card) fällt weg — der Video-Hero übernimmt die visuelle Wirkung. Rating und Trust bleiben integriert im Overlay.

**4. Accessibility & Performance**
- `poster`-Bild vom ersten Frame (optional, fallback ohne).
- `prefers-reduced-motion`: Video pausiert (via CSS `@media`), Poster bleibt sichtbar.
- Video `muted` + `playsInline` für iOS-Autoplay.

## Nicht-Ziele

- Preis-Sektion, restliche Startseiten-Sektionen bleiben unverändert.
- Keine neuen Routen, keine DB-Änderungen.
