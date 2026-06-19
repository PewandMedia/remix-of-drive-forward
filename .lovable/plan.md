## Ziel
Jede der 8 Service-Karten auf der Leistungen-Seite erhält ein hochwertiges, KI-generiertes Bild, das thematisch passt und ein konsistentes, erstklassiges Erscheinungsbild ergibt.

## Konsistente Bild-Sprache (für alle 8 Bilder)
Damit es nicht wie Stock-Mischmasch wirkt, bekommen alle Bilder denselben visuellen Stil:
- **Look:** Cinematic photography, soft natural light, fein körnig
- **Farbpalette:** Anthrazit/Schwarz, Weiß, mit einem dezenten Akzent in MIRO-DRIVE Signal-Rot (#E63946-ähnlich)
- **Stimmung:** modern, professionell, ruhig – kein generischer Stock-Look
- **Format:** 16:9 (1024×576) für Card-Header
- **Qualität:** `premium` (gpt-image-2) für sauberes Ergebnis ohne sichtbaren Text/Logos

## Bild-Briefs pro Karte
1. **Führerscheinausbildung Klasse B** – Cockpit eines modernen Autos aus Beifahrerperspektive, Hände am Lenkrad, weiches Tageslicht
2. **B197 Ausbildung** – Close-up Automatik-Wählhebel in modernem Innenraum, rote Akzent-Lichtreflexion
3. **Theorieunterricht** – aufgeräumter Schulungsraum mit Stuhlreihen Richtung Whiteboard, weiches Fensterlicht, leer
4. **Praxisstunden** – Fahrlehrer und Schüler:in im Auto von außen durch Windschutzscheibe gesehen, freundliche Atmosphäre
5. **Sonderfahrten** – Autobahn bei Dämmerung, Lichtspuren der Scheinwerfer, dramatisch
6. **Auffrischungsstunden** – Hände, die selbstbewusst ein Lenkrad halten, warmes Morgenlicht
7. **Erste-Hilfe-Kurs** – Hände, die eine Erste-Hilfe-Übung an einer Trainingspuppe durchführen, klinisch sauber
8. **Individuelle Angebote** – minimalistisches Stillleben: Autoschlüssel und rote Schleife auf hellem Tisch

## Umsetzung

### 1. Bilder generieren
- 8 Bilder mit `imagegen--generate_image` (model `premium`, 1024×576) erzeugen
- Speicherort: `src/assets/leistungen/<slug>.jpg`
- Jeder Prompt enthält die gemeinsame Stil-Klausel (Cinematic, Farbpalette, kein Text)

### 2. Leistungen-Seite anpassen (`src/routes/leistungen.tsx`)
- 8 Imports der generierten Bilder hinzufügen
- Im `services`-Array pro Eintrag ein `image`-Feld ergänzen
- Card-Layout erweitern:
  - Oben: 16:9 Bild mit `rounded-t-2xl` und subtiler dunkler Gradient-Overlay-Ecke
  - Icon-Badge schwebt **über** dem Bild unten links (statt im Inhalt) – wirkt premium
  - Darunter Titel/Text/CTA wie bisher
  - Hover: Bild leichter Zoom (`scale-105`), bestehende Card-Lift-Animation bleibt
- `overflow-hidden` auf die Card setzen, damit der Bild-Zoom sauber maskiert wird

### 3. Was unverändert bleibt
- Texte, Reihenfolge, CTAs, Routing
- Restliche Seiten und Komponenten
- Farb-Tokens / Design-System