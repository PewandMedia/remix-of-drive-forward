## Ziel
Die vier hochgeladenen Fotos als Galerie zur Filiale „Riemke Markt" im Filial-Umschalter auf der Startseite hinzufügen (aktuell leer → zeigt Empty-State).

## Schritte

1. **Assets anlegen**
   Vier Uploads via `lovable-assets` CDN registrieren und als `.asset.json` Zeiger in `src/assets/` speichern:
   - `riemke-aussen.jpg` (Außenansicht Fahrschule mit „FAHRSCHULE"-Schriftzug)
   - `riemke-lounge.jpg` (Wartebereich mit Couchtisch/Deko)
   - `riemke-weihnachten.jpg` (Roll-up Banner mit Weihnachtsbaum)
   - `riemke-empfang.jpg` (Empfangstisch mit Visitenkarten & Google-Bewertungs-Karte)

2. **`src/components/site/FilialeGallery.tsx` aktualisieren**
   - Die vier neuen Asset-JSONs importieren.
   - Im `FILIALEN`-Array beim Eintrag `id: "riemke"` das leere `images: []` durch die vier `FilialeImage`-Objekte ersetzen (jeweils mit passendem `caption`, `kicker` und SEO-Alt-Text auf Deutsch).

## Ergebnis
Klick auf den Tab „Riemke Markt" zeigt statt Empty-State das Mosaik-Layout (Hero + 2 Kacheln + 1 zusätzliche Reihe für das 4. Bild), voll integriert in bestehendes Lightbox-Verhalten. Keine anderen Änderungen.
