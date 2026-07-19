## Ziel
Auf der Unterseite `/team` in der Mobile-Ansicht soll Ilkays Karte kleiner werden (aber weiterhin größer als die anderen), und die Karten der übrigen Fahrlehrer:innen sollen etwas größer wirken. Desktop bleibt unverändert.

## Änderungen

### 1. `src/routes/team.tsx`
- Ilkays Karte statt `size="lg"` mit responsivem Wrapper rendern:
  - Auf Mobile Karte in einer max-Breite (`max-w-[280px]`) zentrieren und Größe `"featured"` verwenden.
  - Auf `sm+` weiterhin `size="lg"` mit voller Präsenz.
  - Umsetzung über zwei Renders mit `sm:hidden` / `hidden sm:block`.

### 2. `src/components/site/TeamCard.tsx` (`size="sm"` Mobile-Werte anheben)
- Avatar Mobile: `h-16 w-16` → `h-20 w-20`.
- Karten-Padding Mobile: `p-3` → `p-4`, `min-h-[200px]` → `min-h-[230px]`.
- Name Mobile: `text-base` → `text-lg`.
- Rolle Mobile: `text-[10px]` → `text-xs`.
- Sprach-Chips Mobile: `text-[10px]` → `text-[11px]`, Padding leicht erhöht.

Ergebnis: Ilkay auf Mobile deutlich kompakter (Featured-Größe statt Lg), Fahrlehrer-Reihe darunter etwas kräftiger — klare visuelle Hierarchie ohne Überdimensionierung.
