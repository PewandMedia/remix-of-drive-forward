## Änderungen an `src/routes/_authenticated/admin.tsx`

1. **Presets kürzen**: Muttertag und Vatertag aus `OFFER_PRESETS` entfernen.
2. **Notiz-Autofill entfernen**: `applyPreset()` schreibt nicht mehr in `offerNote`. Die Notiz bleibt komplett benutzergesteuert.
3. **Preset-Info anzeigen**: Wenn ein Preset ausgewählt ist, wird dessen `note` als kleiner Info-Text (kursiv, muted) direkt unter der Preset-Chip-Reihe eingeblendet – rein informativ, geht nicht ins Notizfeld.
