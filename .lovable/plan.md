## Ziel
Die Instagram- und TikTok-Buttons im Footer sollen im jeweiligen originalen Brand-Stil erscheinen.

## Umsetzung
1. **Instagram-Button**: Statt neutralem `bg-white/10` den offiziellen Instagram-Verlauf (pink/lila/orange) als Hintergrund verwenden, damit er sofort erkennbar ist.
2. **TikTok-Button**: Statt neutralem `bg-white/10` einen schwarzen oder typischen TikTok-roten Hintergrund mit weißem Icon verwenden, um den originalen Look zu treffen.
3. Beide Buttons behalten ihre runde Form, Hover-Animation und korrekte Verlinkung.
4. Änderung ausschließlich in `src/components/site/Footer.tsx`.

## Technische Details
- CSS-Gradient für Instagram (`linear-gradient` mit `#f09433`, `#e6683c`, `#dc2743`, `#cc2366`, `#bc1888`).
- Reiner schwarzer oder `#010101` Hintergrund für TikTok mit weißem Icon.
- Keine neuen Abhängigkeiten nötig.