## Ziel
Filialen-Umschalter in `FilialeGallery`: zwei Buttons („Rathaus" / „Riemke Markt"). Rathaus zeigt die 3 bestehenden Fotos, Riemke zeigt einen sauberen „Bilder folgen"-Platzhalter, bis Bilder nachgeliefert werden.

## Änderungen in `src/components/site/FilialeGallery.tsx`

1. **Datenstruktur auf Filialen umstellen** — neuer Export `FILIALEN`:
   ```ts
   { id: 'rathaus',  name: 'Rathaus',      address: '…', images: [ /* 3 bestehenden Rathaus-Bilder */ ] }
   { id: 'riemke',   name: 'Riemke Markt', address: '…', images: [] }  // leer, später befüllen
   ```
   Adressen ziehe ich aus `src/lib/locations.ts` (existiert bereits, wird gelesen bevor ich schreibe).

2. **Toggle-UI** über dem Grid:
   - Segmented-Control mit zwei Pills (`Rathaus` / `Riemke Markt`), aktive Pill in `bg-primary text-primary-foreground`, inaktiv `bg-white border`.
   - State: `const [active, setActive] = useState<'rathaus'|'riemke'>('rathaus')`.

3. **Rendering**:
   - Wenn `images.length >= 3` → aktuelles Mosaik/Collage-Layout (Hero + 2 Kacheln).
   - Wenn `images.length === 0` → Empty-State-Karte in gleicher Optik: gestrichelter Rahmen, MIRO-DRIVE Logo-Emblem dezent, Text „Bilder folgen in Kürze" + Filialname/Adresse. Keine Lightbox-Buttons.
   - Lightbox nutzt jetzt `activeImages` statt globalen `FILIALE_IMAGES`.

4. **Späteres Nachreichen** ist ein Ein-Zeilen-Edit: die 3 Riemke-Bilder in `FILIALEN.riemke.images` als Objekte im gleichen Schema einfügen — kein weiterer Code nötig.

5. **Backwards compat**: `FILIALE_IMAGES` bleibt als Alias auf `FILIALEN.rathaus.images` exportiert, falls andere Stellen darauf referenzieren (grep vorab).

## Verifikation
- `tsgo` / Build sauber.
- Playwright bei 390×844 und 1280×1800: beide Buttons klickbar, Wechsel zeigt Rathaus-Bilder bzw. Riemke-Platzhalter.