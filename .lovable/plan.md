## Angebots-Banner (Startseite) verschönern

Aktuell nutzt das Banner den Gradient `from-[#7a0010] via-primary to-[#4a0008]` — das `#4a0008` ist fast schwarz und wirkt matschig/hässlich.

### Änderung in `src/routes/index.tsx` (Zeile 339)

Reines, edles Rot-Gradient statt Rot-zu-Schwarz:

- Gradient tauschen auf ein warmes, lebendiges Rot-Verlauf: `bg-gradient-to-br from-primary via-[#c8102e] to-[#7a0010]` (kein Schwarz mehr, tiefes Bordeaux als dunkelster Punkt).
- Dazu leichtes Radial-Glow-Overlay (via absolute `div` mit `bg-[radial-gradient(...)]`) für Premium-Look.
- Innerer Border-Highlight (`ring-1 ring-white/20`) und weicherer Shadow (`shadow-primary/40`).
- Chip-Hintergrund von `bg-white/15` auf `bg-white/20` für mehr Kontrast.

Keine Layout- oder Text-Änderungen, nur die Farben/Effekte des Banners.