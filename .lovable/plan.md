## Ziel
Instagram-Kacheln auf Mobil kompakter darstellen, damit die Seite nicht endlos lang wird — und Reihen bleiben immer vollständig gefüllt (keine einzelne Kachel am Ende).

## Änderungen (`src/components/site/InstagramSection.tsx`)

- Grid-Spalten anheben:
  - Mobil: `grid-cols-3` (statt 2) → kleinere Kacheln, mehr pro Reihe, deutlich kürzere Sektion.
  - `sm:` bleibt `grid-cols-3`, `md:grid-cols-4` → auf Desktop 4 pro Reihe (harmoniert mit typischer Postanzahl).
- Kachel-Größe: `aspect-square` bleibt, `rounded-xl` statt `rounded-2xl` für kompakteres Bild.
- Abstände reduzieren: `gap-2 sm:gap-3` (statt `gap-3 sm:gap-5`).
- Immer volle Reihen anzeigen:
  - Auf Mobil (3 Spalten) nur Vielfaches von 3 Posts anzeigen (überzählige per `hidden`).
  - Ab `md` (4 Spalten) nur Vielfaches von 4 (per `md:hidden` bzw. `md:block`).
  - Umsetzung: pro Post Klassen berechnen — Indizes ≥ `Math.floor(n/3)*3` bekommen `hidden md:block` (nur auf Mobil weglassen), Indizes ≥ `Math.floor(n/4)*4` bekommen `md:hidden` bzw. werden komplett ausgeblendet.
- `limit(6)` in `getActiveInstagramPosts` (`src/lib/public-data.functions.ts`) auf 8 anheben, damit auf Desktop zwei volle 4er-Reihen möglich sind.

Kein Umbau der Admin- oder DB-Logik nötig.

## Ergebnis
- Mobil: 3 Bilder pro Reihe, kompakt, Seite deutlich kürzer.
- Desktop: 4 Bilder pro Reihe.
- Nie mehr eine „einsame" Kachel unten — Reihen sind immer voll.