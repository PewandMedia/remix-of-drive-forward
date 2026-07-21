## Ziel
`/kontakt` kompakter machen – weniger vertikales Scrollen durch besseres Nebeneinander-Layout.

## Änderungen in `src/routes/kontakt.tsx`

1. **Hero verkleinern**
   - `PageHero` durch einen kompakten Inline-Header ersetzen (Eyebrow + H1 + kurzer Subtitle), Padding drastisch reduziert. Kein großer Hero-Block mehr.

2. **Zwei-Spalten-Hauptlayout auf Desktop**
   - Linke Spalte (ca. 5/12): Direkt-Kontakt-Karten kompakt gestapelt (WhatsApp prominent, dann Telefon, E-Mail, Instagram, TikTok in kleineren Reihen). Padding von `p-6` → `p-4`.
   - Rechte Spalte (ca. 7/12): Beide `LocationCard`s untereinander.
   - Mobil: alles einspaltig, aber mit kleineren Karten.

3. **Anmeldungs-Tipp-Banner schlanker**
   - In eine schmale Zeile umgewandelt (kleineres Padding, einzeilig auf Desktop).

4. **FilialeGallery unter das Grid**
   - Bleibt unten, aber mit reduziertem oberen Abstand.

5. **Vertikale Abstände generell reduzieren**
   - Section-Padding `py-16` → `py-8 sm:py-10`.
   - `mb-10/mb-12` → `mb-6/mb-8`.

## Nicht geändert
- Keine Datenquellen, keine Business-Logik, keine anderen Seiten.
- WhatsApp bleibt visuell die Hauptaktion.
