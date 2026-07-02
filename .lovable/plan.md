## Problem
Im Team-Teaser auf der Startseite (4 Team-Mitglieder in Karten) sind die runden Avatare nicht zentriert, sondern links ausgerichtet.

## Ursache
Das `MiniAvatar`-Komponente in `src/routes/index.tsx` hat `h-20 w-20` aber kein `mx-auto`. Der umgebende `<div className="mx-auto mb-4">` bringt nichts, weil ein Block-Element ohne Breite die volle Breite einnimmt und `mx-auto` darauf wirkungslos bleibt.

## Lösung
`mx-auto` dem `img`-Tag und dem Fallback-`<div>` innerhalb der `MiniAvatar`-Funktion hinzufügen, sodass das 80×80 Element horizontal zentriert wird.

## Dateien
- `src/routes/index.tsx` — 1 kleine Änderung in der `MiniAvatar`-Komponente.
