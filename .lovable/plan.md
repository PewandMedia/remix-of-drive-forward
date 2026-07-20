Die drei Filial-Fotos (Außen, Theorieraum, Empfang) sind im Format 4/5 hochkant zugeschnitten, wodurch Motive abgeschnitten wirken. Sie werden auf ein echtes Foto-Verhältnis umgestellt und überall wirklich nebeneinander gerendert. Das KI-Bild in der Leistungen-Kachel „Theorieunterricht“ wird durch das echte Theorieraum-Foto ersetzt.

## Änderungen

**1. `src/components/site/FilialeGallery.tsx`**
- Bild-Container von `aspect-[4/5]` auf `aspect-[4/3]` (Landscape, Motiv wird nicht mehr abgeschnitten).
- `object-cover` mit `object-center` erzwingen, damit Zentrum sichtbar bleibt.
- Grid bleibt bei `sm:grid-cols-3`, aber zusätzlich auf Mobile 3 Spalten (`grid-cols-3`) mit kleinerem Gap, damit die Bilder auf dem Handy nebeneinander (statt untereinander) angezeigt werden — weniger Scrollen.
- Caption kleiner (`text-xs sm:text-sm`) für die kompakte Mobil-Ansicht.

**2. `src/routes/ueber-uns.tsx`**
- Rechte Spalte: Alle drei Fotos nebeneinander in einem 3-Spalten-Grid statt „1 groß oben + 2 unten“. Verhältnis `aspect-[4/3]`, damit nichts abgeschnitten wird und die Sektion kompakter bleibt.
- Zweite große `FilialeGallery`-Sektion unten entfernen (doppelt) – spart Scroll.

**3. `src/routes/index.tsx`**
- `<FilialeGallery />` bleibt an aktueller Stelle (vor Team), nutzt automatisch das neue kompakte 3er-Layout.

**4. `src/routes/kontakt.tsx`**
- Nutzt weiterhin `FilialeGallery compact` — profitiert automatisch vom neuen Layout.

**5. `src/routes/leistungen.tsx`**
- Import `imgTheorie from "@/assets/leistungen/theorie.jpg"` ersetzen durch das echte Foto: `theorieraum from "@/assets/theorieraum.jpg.asset.json"` und `image: theorieraum.url` in der Theorie-Kachel.
- Optional: `imgTheorie`-Import und Datei-Referenz entfernen (Datei bleibt liegen, keine DB-Änderung).

Keine Änderungen an Backend, DB oder Business-Logik.