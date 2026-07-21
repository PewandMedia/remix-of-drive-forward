## Ziel
Auf der Handy-Ansicht der Startseite (`/`) das Video früher sichtbar machen und den TÜV-Badge entfernen.

## Änderungen in `src/routes/index.tsx`

1. **Eyebrow „MIRO-DRIVE · Fahrschule in Bochum" komplett entfernen** (Zeilen 77–80). Damit rutschen H1, Text, Buttons und das Video-Panel nach oben.
2. **Vertikales Padding der Hero-Sektion reduzieren**, damit auf Mobil noch mehr Inhalt (inkl. Video) above the fold sichtbar wird: `py-16 sm:py-20` → `py-8 sm:py-16 lg:py-24` (Zeile 74).
3. **TÜV-geprüft Badge entfernen** (Zeilen 127–130 im Trust-Row).

Sterne / „5.0 · über 500 Bewertungen" bleiben unverändert – der User hat nur TÜV genannt.

## Verifikation
Kurzer Playwright-Screenshot bei 390×844, um zu bestätigen, dass das Video im initialen Viewport sichtbar ist und der Eyebrow / TÜV-Badge weg sind.