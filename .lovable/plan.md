## Ziel
Das erste hochgeladene Foto (Filialfassade "FAHRSCHULE MIRO-DRIVE") wird der Riemke-Filiale zugeordnet. Die sechs Mercedes-Fotos werden als neue "Unsere Fahrzeuge"-Sektion auf der Startseite ausgespielt.

## Plan

1. **Assets hochladen**
   - Alle 7 Uploads über `lovable-assets` als CDN-Pointer in `src/assets/` ablegen (`.asset.json`).
   - Zusätzlich in `public/media/` kopieren, damit auch der Live-VPS-Build die Dateien ausliefert (wie bei den bestehenden Bildern gehandhabt).

2. **Riemke-Bild einbinden**
   - In `src/components/site/FilialeGallery.tsx` das Riemke-Foto als erstes Bild in `FILIALEN[1].images` eintragen.
   - Damit im Tab-Umschalter „Riemke Markt" mindestens ein Bild erscheint. Da das Mosaik-Layout 3 Bilder erwartet, wird für Riemke ein leichter Fallback ergänzt: bei nur 1 Bild wird es großflächig (aspect 4/3) einzeln angezeigt statt EmptyState.

3. **Neue Sektion "Unsere Fahrzeuge"**
   - Neue Komponente `src/components/site/FleetSection.tsx`:
     - Eyebrow „Unser Fuhrpark", Headline „Lerne in modernen Mercedes-Modellen", kurzer Subtext.
     - Responsive Bento-Grid mit den 6 Autofotos (1 großes Hero-Bild + 5 kleinere; mobil 2 Spalten, Desktop asymmetrisches Grid).
     - Klick öffnet ein Lightbox-Overlay (analog zur `FilialeGallery`).
   - Einbindung in `src/routes/index.tsx` an passender Stelle (nach den Bewertungen oder vor der Filialen-Galerie – ich schlage direkt vor `FilialeGallery` vor, damit "Autos → Filiale → Kontakt" logisch fließt).

4. **Nur Präsentation**
   - Keine DB-, Admin- oder Backend-Änderungen.
   - Desktop- und Mobil-Layout beide berücksichtigt, Bewertungs- und Kontaktänderungen bleiben unangetastet.

## Offene Rückfrage
Passt dir die Reihenfolge auf der Startseite so: **Hero → … → Bewertungen → Fahrzeuge (neu) → Filialen-Galerie → Kontakt-CTA**? Falls du die Fahrzeug-Sektion an einer anderen Stelle willst (z. B. direkt unter dem Hero), sag kurz Bescheid.
