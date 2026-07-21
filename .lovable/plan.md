## Ziel
Die letzten Änderungen an der Kontaktseite betreffen aktuell auch die Desktop-Ansicht (z. B. kleinere Icon-Padding, reduzierte Gaps, kleinere Textgrößen in den Kontakt-Karten). Der User will: Desktop bleibt **exakt wie vorher**, nur Mobil wird kompakter.

## Änderungen in `src/routes/kontakt.tsx`

1. **Header**
   - Mobil: `text-2xl`, kein Eyebrow, `mb-4`, kleiner Untertitel.
   - Ab `sm`: wieder Original – Eyebrow sichtbar, H1 `text-4xl`, Untertitel `text-base`, `mb-6`.

2. **Anmeldungs-Tipp**
   - Mobil: kompakte Zeile mit kleinem "Anmelden →"-Pill.
   - Ab `sm`: originales Padding (`px-4 py-3`), normaler Button-Style, wie vor der Verdichtung.

3. **Kontakt-Karten (WhatsApp + 2×2 Grid)**
   - WhatsApp-Karte: Mobil `p-3.5`, Text `text-base`; ab `sm` zurück auf `p-4`/`text-lg` und Original-Icon-Padding (`p-2.5`).
   - Telefon / E-Mail / Instagram / TikTok:
     - Mobil: 2×2 Grid, `p-3`, kleine Icons (`h-3.5 w-3.5`), Text `text-xs`, Icon-Bubble `p-1.5`.
     - Ab `sm`: wieder Original – volle Breite pro Karte (1 Spalte im linken Bereich), `p-4`, Icon `h-5 w-5`, Text `text-sm`, Icon-Bubble `p-2.5`.
   - Reihenabstand: mobil `gap-2.5`, ab `sm` `gap-3`.

4. **Vertikale Container-Abstände**
   - Mobil: `pt-5 pb-8`, Section-Abstände `mt-6`.
   - Ab `sm`: Original `pt-10 pb-12`, `mt-8`.

## Nicht geändert
- Desktop-Layout / Zwei-Spalten-Grid (Kontakt links, Standorte rechts) bleibt.
- `LocationCard`, `FilialeGallery`, Business-Logik, Kontaktdaten.
