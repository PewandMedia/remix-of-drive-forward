Setze die ausgewählte Design-Richtung "Bold Black Card" um in `src/routes/erste-hilfe-kurs.tsx`:

- Linke Spalte (7/12): "Was du bekommst" mit großer Display-Headline (4xl→6xl), rotem Akzentstrich, dicke schwarze Top-Border, Benefit-Items als Zeilen mit rotem 48×48 Icon-Quadrat (Lucide-Icons bleiben), Hover-Zoom auf Icon.
- Rechte Spalte (5/12): 
  - Bild im 4:5-Format mit leicht rotierter Hintergrund-Karte, Dark-Gradient-Overlay, "Safe First"-Badge in Rot und kurzer Text.
  - Schwarze Info-Karte mit "Anmeldung & Infos", grauem Beschreibungstext, 2-Spalten-Grid für Preis/Termine/Dauer (rote Label-Eyebrows), WhatsApp-Button (grün) + Anrufen-Button (weiß auf schwarz) als gleichwertige Flex-Buttons.
  - Dezenter roter Blur-Glow als Decoration.

Echte Daten aus `first_aid_info` (Preis/Dauer/Dates) bleiben. CONTACT-Links, PageHero, Standorte-Sektion bleiben unverändert. Bestehendes Bild `erste-hilfe-side.jpg` wird im Hero-Bild der rechten Spalte verwendet. Alle Farben über semantische Tokens (`bg-primary`, `bg-foreground`, `text-primary-foreground`), nur WhatsApp-Grün bleibt als Marken-Hex.