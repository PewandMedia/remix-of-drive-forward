## Problem
Auf Desktop ist die rechte Spalte kürzer als das große linke Bild → große graue Leerstelle unten rechts. Zusätzlich wirken die weißen Beschriftungs-Kästen unter jedem Bild plus die grauen Ränder unruhig und billig.

## Ziel
Cleane, symmetrische Collage ohne Leerflächen, ohne dicke Ränder, mit konsistentem Bild-Framing – auf Desktop und Mobile.

## Umsetzung in `src/components/site/FilialeGallery.tsx`

**1. Einheitliches Kachel-Framing**
- Jede Kachel bekommt ein festes Seitenverhältnis mit `object-cover`, damit alle Bilder gleich sauber sitzen (kein „halbes Foto"-Effekt).
- Linke Hero-Kachel: `aspect-[4/5]` (hochkant, wie Referenz).
- Rechte zwei Kacheln: je `aspect-[5/4]`, gestapelt mit gleichem Gap → Gesamthöhe rechts = Höhe links. Keine graue Lücke mehr.

**2. Cleaner Look**
- Rand `border border-neutral-200` entfernt, stattdessen nur `rounded-2xl overflow-hidden` + sehr dezenter `ring-1 ring-black/5`.
- Weiße Untertitel-Kästen raus. Stattdessen minimaler Text-Overlay unten links auf dem Bild (kleiner Kicker + Titel, weißer Text auf sanftem Bottom-Gradient) – wirkt hochwertig statt „Karteikarten-Optik".
- Shadow reduziert auf `shadow-[0_1px_2px_rgba(0,0,0,0.04)]`.

**3. Mobile**
- 2-Spalten-Mosaik bleibt: großes Bild oben (`col-span-2`, `aspect-[4/3]`), zwei kleinere darunter (`aspect-square`).
- Gleicher Overlay-Stil wie Desktop → einheitliches Bild.
- Hint-Text „Tippen zum Vergrößern" bleibt, kleiner und mittig.

**4. Lightbox**
- Unverändert (funktioniert bereits sauber mit `object-contain`).

## Ergebnis
Symmetrische, moderne Collage ohne graue Leerstelle, ohne aufgesetzte Text-Kästen, mit ruhigem Premium-Look passend zum Rest der Seite.
