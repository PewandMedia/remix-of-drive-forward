## Ziel
Die 9 hochgeladenen Instagram-Screenshots als echte Bestanden-Posts auf der Startseite anzeigen — statt der aktuell DB-gelieferten Bilder. Jedes Screenshot wird auf den reinen Foto-Bereich zugeschnitten (linkes Panel), sodass das rechte Kommentar-Panel nicht mehr zu sehen ist. Anzeige in 2er-Reihen (2 Spalten auf Mobile, 3 auf Desktop).

## Vorgehen

### 1. Bilder zuschneiden
- Alle 9 Uploads (`Bildschirmfoto_2026-07-01_um_19.22.xx.png`, außer der letzte Screenshot 19.23.36-2 — das ist die Lovable-Vorschau, gehört nicht dazu) mit Python/PIL zuschneiden.
- Crop-Box: das Instagram-Foto-Panel (links). Wird pro Bild individuell erkannt (weißer Modal-Bereich vs. dunkler Overlay-Hintergrund), Fallback ~x: 225–1190, y: 140–1140.
- Ergebnis als quadratische JPGs (aspect-fill center) unter `src/assets/insta/bestanden-1.jpg` … `bestanden-9.jpg`.

### 2. `InstagramSection.tsx` umbauen
- DB-Query + horizontaler Scroller entfernen.
- Statisches Array aus den 9 lokalen Bild-Imports.
- Grid: `grid-cols-2 md:grid-cols-3` mit `gap-3 sm:gap-5`, quadratische Karten (`aspect-square`), `object-cover`, gerundete Ecken, Hover-Zoom + Instagram-Overlay.
- Karten verlinken auf `CONTACT.instagram` (Profil) — konkrete Post-URLs sind nicht sicher zuzuordnen.
- Header, "Auf Instagram folgen"-Button und Section-Struktur bleiben unverändert.

### 3. Nicht betroffen
- `index.tsx` (nutzt `<InstagramSection />` weiter, keine Änderung).
- DB-Tabelle `instagram_posts` (bleibt liegen, keine Migration).
- Andere Seiten/Sektionen.

## Ergebnis
Auf der Startseite erscheinen die 9 echten Foto-Screenshots als sauberes 2-/3-Spalten-Grid, ohne Kommentar-Panel — kompakter Insta-Wall-Look.
