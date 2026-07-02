## Ziel
Den roten Hover-Glow auf h1/h2-Überschriften deutlich abschwächen.

## Status quo
In `src/styles.css` erzeugen `h1:hover, h2:hover` und `@utility headline-glow` einen zweilagigen `text-shadow`:
- Layer 1: `0 0 18px` bei 55 % Brand-Rot
- Layer 2: `0 0 38px` bei 30 % Brand-Rot

## Änderung
Beide Stellen auf einen sanfteren Glow reduzieren:
- Layer 1: `0 0 10px` bei 35 % Brand-Rot
- Layer 2: `0 0 22px` bei 18 % Brand-Rot

Das macht den Effekt weniger dominant, behält aber die rote Akzentuierung beim Hover.

## Datei
- `src/styles.css` (Zeile 164–166 und 202–204)
