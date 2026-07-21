Ziel: Die Bewertungs-Sektion auf der Startseite soll auf Mobilgeräten genau dasselbe Layout haben wie auf Desktop.

Geänderte Datei: `src/components/site/ReviewsSection.tsx`

Anpassungen:
1. **Featured-Bewertung (oben)**
   - Entferne den Breakpoint, der das Bild und den Namen/ Sterne auf mobilen Geräten untereinander stellt.
   - Bild bleibt links, Name, Zeitpunkt und Sterne rechts daneben – auch auf kleinsten Viewports.

2. **Drei untere Karten**
   - Entferne den responsiven Wechsel von `grid-cols-1` (mobil) auf `grid-cols-3` (Desktop).
   - Die drei Karten werden auf allen Viewports nebeneinander in 3 Spalten dargestellt.
   - Karten-Text wird mit `line-clamp` und `truncate` begrenzt, damit nichts umbricht oder überläuft.

3. **Sterne / Avatar / Abstände**
   - Avatar- und Sterngrößen sowie Padding bleiben über alle Breakpoints hinweg konstant, damit das Erscheinungsbirk identisch ist.
   - Falls nötig, werden sehr lange Namen mit `truncate` abgeschnitten.

4. **Validierung**
   - Build (`bun run build` bzw. automatischer Build) läuft sauber durch.
   - Visueller Check im Preview auf Desktop- und Mobile-Ansicht, um sicherzustellen, dass die Sektion auf beiden Viewports identisch aussieht.

Technische Details:
- Tailwind-Klassen wie `sm:flex-row`, `sm:grid-cols-3`, `sm:p-10` etc. werden auf feste Werte (`flex-row`, `grid-cols-3`, `p-10`) umgestellt.
- Keine neuen Abhängigkeiten nötig.