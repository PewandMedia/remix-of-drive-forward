## Ziel
`/kontakt` auf Mobil kompakter machen – weniger Scrollen, wichtigste Aktionen sofort sichtbar.

## Änderungen in `src/routes/kontakt.tsx`

1. **Header schlanker auf Mobil**
   - H1 auf `text-2xl` reduzieren, Subtitle auf `text-xs`, `mb-6` → `mb-4`.
   - Eyebrow-Zeile weglassen auf Mobil (`hidden sm:block`).

2. **Anmeldungs-Tipp kompakter**
   - Auf Mobil nur eine schmale Zeile mit „Online anmelden →“-Link statt Button-Block.

3. **Direkt-Kontakt-Karten mobil dichter**
   - WhatsApp bleibt prominent (etwas kleiner: `p-3.5`, Text `text-base`).
   - Telefon / E-Mail / Instagram / TikTok: auf Mobil in einem 2×2-Grid mit minimalem Padding (`p-3`), Icons kleiner, nur Label + Wert.
   - Reihenabstand `gap-2.5` statt `gap-3`.

4. **Reihenfolge auf Mobil**
   - Kontakt-Karten kommen VOR den Standort-Karten (bereits so). Standort-Karten werden mobil kompakter dargestellt (`LocationCard` selbst unverändert, nur Container-Abstand).

5. **Vertikale Abstände reduzieren**
   - `pt-8` → `pt-5` auf Mobil, `pb-12` → `pb-8`.
   - Zwischen-Sections `mt-8` → `mt-6`.

## Nicht geändert
- Desktop-Layout bleibt wie es ist.
- `LocationCard`, `FilialeGallery`, Daten und Business-Logik unverändert.
