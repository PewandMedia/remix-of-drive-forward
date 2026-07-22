## Problem
Die Filial-Galerie zeigt für Riemke Markt in der Vorschau die richtigen Bilder, auf der Live-Seite (mirodrive.pewandmedia.de) aber nicht. Grund: In der Datenbank stehen die Pfade `/media/riemke-aussen.jpg`, `/media/riemke-lounge.jpg`, `/media/riemke-empfang.jpg`, `/media/riemke-weihnachten.jpg`, aber diese vier Dateien liegen nicht im Ordner `public/media/` (nur Rathaus- und Auto-Bilder sind dort). In der Preview lädt der Browser sie noch von der Lovable-CDN, auf dem VPS gibt es diese CDN nicht → 404.

## Lösung
Die vier Riemke-Bilder aus der Lovable-CDN herunterladen und dauerhaft in `public/media/` ablegen, damit sie beim nächsten Deployment mit auf den VPS gehen:

- `public/media/riemke-aussen.jpg`
- `public/media/riemke-lounge.jpg`
- `public/media/riemke-empfang.jpg`
- `public/media/riemke-weihnachten.jpg`

Datenbank-Einträge müssen nicht geändert werden – die Pfade passen bereits.

## Ergebnis
Nach dem nächsten Deployment sind die Riemke-Fotos auch auf der offiziellen Seite sichtbar.
