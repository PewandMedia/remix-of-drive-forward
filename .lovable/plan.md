## Änderung in `src/routes/index.tsx` – `LanguageStrip`

Mobile Dauerschleife entfernen, alle 5 Sprachen kompakt in einer Reihe auf Handy zeigen.

- Marquee-Block (Zeilen 233–242) löschen.
- Mobile-Liste als 5-spaltiges Grid (`grid grid-cols-5 gap-1.5`) direkt unter der Überschrift rendern, damit alle Chips auf 360–390px sichtbar bleiben.
- `LanguageChip` bekommt eine `compact`-Variante für Mobile: kleineres Padding (`px-2 py-1.5`), Flagge oben, Label darunter in `text-[10px]` — so passen alle fünf Chips nebeneinander ohne Overflow.
- Desktop-Verhalten (statische horizontale Chip-Reihe rechts) bleibt unverändert.

Keine anderen Komponenten oder Styles ändern; `@keyframes marquee-scroll` in `styles.css` bleibt (wird nicht mehr genutzt, aber ungenutztes CSS ist unkritisch).
