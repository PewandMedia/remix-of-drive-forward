## Erste-Hilfe-Bild ersetzen

Statt des KI-Bilds mit Personen → ein **Verbandskasten (Erste-Hilfe-Koffer) mit MIRO-DRIVE Logo** auf dem Deckel.

### Schritte

1. **Neues Bild generieren** mit `imagegen--generate_image` (standard quality):
   - Motiv: Ein klassischer roter Verbandskasten / Erste-Hilfe-Koffer, prominent zentriert, weißes Kreuz auf dem Deckel, darunter das Schriftlogo „MIRO-DRIVE" (weiß) — Produktfoto-Stil, sauberer heller Studio-Hintergrund, weiches Licht, leichte Schatten, hochwertig und modern.
   - Pfad: `src/assets/erste-hilfe-hero.jpg` (überschreibt das aktuelle Bild)
   - Format: 1280×960

2. **Kein Code-Change nötig** — der Import in `src/routes/index.tsx` bleibt derselbe.

3. Falls die Text-Rendering-Qualität nicht ausreicht, mit `imagegen--edit_image` und dem echten Logo (`src/assets/miro-logo.png.asset.json`) als Referenz nachbessern.
