## Problem
Die Sprach-Tags in den Team-Flip-Cards überlappen bei vielen Sprachen die feste Kartenhöhe und ragen aus der Box heraus.

## Ursache
Die FlipCards verwenden eine absolute, 3D-geflippte Struktur mit fester `min-h` (300px/360px bzw. 440px). Der Sprachen-Container nutzt `flex-wrap`, wodurch bei vielen Sprachen der verfügbare vertikale Platz überschritten wird.

## Lösung
1. **`src/routes/team.tsx`** – FlipCard:
   - Erhöhe `min-h` für normale Karten von `300px` auf `380px` und `sm:min-h-[360px]` auf `sm:min-h-[420px]`
   - Erhöhe `min-h` für große Karten (`lg`) von `440px` auf `520px`
   - Oder alternativ: Begrenze die Sprach-Tags auf max. 2 Zeilen mit `line-clamp`/`overflow-hidden` und `max-h` auf dem Sprachen-Container

2. Sorge dafür, dass alle Karten einer Reihe dieselbe Höhe haben (grid-Row-Ausrichtung bleibt erhalten).

3. Keine Änderung an Texten, Farben, Design oder Funktionalität der Flip-Animation.

## Ziel
Sprach-Tags bleiben sauber innerhalb jeder Team-Karte, unabhängig von der Anzahl der gesprochenen Sprachen.