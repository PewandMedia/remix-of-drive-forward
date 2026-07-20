## Ziel
Die Filialbilder sollen wie im Referenzbild als saubere Collage wirken und auf Handy/Desktop komplett erkennbar sein. Kein schmaler Ausschnitt, kein abgeschnittenes Motiv.

## Umsetzung

**1. Mobile Ansicht fixen**
- Das aktuelle feste Kartenformat wird entfernt.
- Mobile bekommt ein horizontales Swipe-Layout mit Karten in voller Bildschirmbreite.
- Bilder werden in natürlicher Höhe angezeigt (`w-full h-auto`), damit man das komplette Bild sieht.
- Klick auf ein Bild öffnet weiterhin die Lightbox.

**2. Desktop Ansicht fixen**
- Das feste hohe Bento-Grid mit abgeschnitten/leer wirkenden Bildflächen wird ersetzt.
- Neue Collage wie das Referenzbild:
  - großes Bild links
  - zwei kleinere Bilder rechts untereinander
- Keine feste Bildhöhe mehr, damit Bilder nicht gekappt werden.
- Bildunterschriften bleiben sauber unter dem Bild, nicht über dem Motiv.

**3. Lightbox bleibt erhalten**
- Klick auf jedes Bild öffnet Vollbildansicht.
- Pfeile, Swipe und Escape bleiben aktiv.
- Vollbild zeigt immer das komplette Bild mit `object-contain`.

## Betroffene Datei
- `src/components/site/FilialeGallery.tsx`