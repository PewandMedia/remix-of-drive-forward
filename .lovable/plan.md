# Typografie-Update: Klassisch & Premium

Aktuell nutzt die Seite "Archivo Black" (sehr fett/laut) und "Manrope". Das wirkt eher sportlich als klassisch.

## Neue Schriftwahl

Kombination, die viele Top-Marken (Apple, Stripe, Linear, Vercel, NYT-Stil Editorials) als Referenz nutzen:

- **Headlines:** `Playfair Display` — klassische, elegante Serif (zeitlos, hochwertig, Editorial-Look)
- **Body & UI:** `Inter` — der De-facto-Standard moderner Top-Tech-Firmen (sauber, neutral, exzellente Lesbarkeit)

Alternativ falls reiner Sans gewünscht: Inter für alles (Apple/Stripe-Stil). Aktuell gehe ich von der Serif+Sans-Kombi aus, weil "klassisch" gewünscht ist.

## Umsetzung

1. **`src/routes/__root.tsx`** — Google-Fonts-Links austauschen:
   - Entfernen: Archivo Black, Manrope
   - Hinzufügen: `Playfair Display` (500, 600, 700) + `Inter` (400, 500, 600, 700)
   - Inkl. `preconnect` zu fonts.googleapis.com / fonts.gstatic.com

2. **`src/styles.css`** — `@theme` Tokens aktualisieren:
   - `--font-display: "Playfair Display", Georgia, serif;`
   - `--font-sans: "Inter", system-ui, sans-serif;`
   - Letter-spacing der Headlines leicht reduzieren (Serifs brauchen weniger Tracking als Archivo Black): `letter-spacing: -0.02em`

3. Keine Komponenten-Änderungen nötig — `font-display` und `font-sans` werden bereits über die Tokens aufgelöst.

## Nicht im Scope
- Layout, Farben, Hero-Bild bleiben unverändert.
- Keine Änderung an Buttons, Komponenten, Spacing.
