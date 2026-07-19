## Ziel
Hero-Text auf `/` deutlich kürzen und die Klassen-Aufzählung („Klasse B, B197 & B78") komplett aus der H1 und der Sub-Copy entfernen.

## Änderungen in `src/routes/index.tsx` (HeroSection)

### H1
Neu, kurz und klar, ohne Klassen-Aufzählung, ohne Bindestrich:
```
MIRO-DRIVE Fahrschule Bochum
```
Markenteil „MIRO-DRIVE" bleibt in `italic text-primary` als Highlight, „Fahrschule Bochum" in Standardfarbe.

### Sub-Copy (unter der H1)
Auf einen kurzen Satz reduziert, ohne „Klasse B / B197 / B78":
> Deine moderne Fahrschule in Bochum – persönliche Betreuung, moderne Fahrzeuge und flexible Fahrstunden in Bochum und Umgebung.

### Eyebrow
Bleibt: `MIRO-DRIVE · Fahrschule in Bochum`.

## Nicht Teil des Plans
- Keine Änderungen an Buttons, Trust-Zeile, Video-Karte, Layout.
- Keine Änderungen an `head()`-Meta-Tags (SEO bleibt dort erhalten).
