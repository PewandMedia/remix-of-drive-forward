## Ziel
Den "Social"-Button auf der Kontakt-Seite in zwei separate, untereinander stehende Links für Instagram und TikTok aufteilen. Dabei die originalen Brand-Icons nutzen und das Label "Social" entfernen.

## Änderungen

### `src/routes/kontakt.tsx`
- Den vierten Link-Block (Zeile 67–73, bisher "Social" → Instagram & TikTok zusammen) entfernen.
- An gleicher Stelle zwei neue, vertikal gestapelte Links einfügen:
  1. **Instagram** – Link zu `CONTACT.instagram`, Icon: `Instagram` (Lucide), Label: "Instagram"
  2. **TikTok** – Link zu `CONTACT.tiktok`, Icon: `TikTokIcon` (SVG, wie im Footer), Label: "TikTok"
- Das Wort "Social" komplett aus dieser Sektion entfernen.
- Die bestehende 4-Spalten-Grid-Struktur (`lg:grid-cols-4`) beibehalten; die beiden neuen Links teilen sich visuell die vierte Spalte als gestapelte Karten oder sind als eigene Karten im Grid (je nach Platzierung im Code).

### Icon-Versorgung
- TikTok-SVG-Icon aus `src/components/site/Footer.tsx` in eine wiederverwendbare Komponente (`src/components/icons/TikTokIcon.tsx`) extrahieren, damit `kontakt.tsx` es importieren kann, ohne den Footer direkt zu importieren.
- Alternativ: Das Icon inline in `kontakt.tsx` definieren, falls keine zentrale Icon-Datei existiert.

## Build-Validierung
- Nach der Änderung `bun run build` ausführen, um sicherzustellen, dass alle Imports auflösbar sind und keine JSX-Fehler vorliegen.

## Nicht im Scope
- Keine Änderungen an anderen Seiten (Startseite, Footer, Preise etc.).
- Keine Änderungen an Backend oder Auth.