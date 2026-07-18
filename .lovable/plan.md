# Plan: Durchlaufende Führerscheinklassen entfernen

## Ziel
Der Bereich, in dem Führerscheinklassen (B197, B78 etc.) automatisch von rechts nach links durchlaufen, soll komplett aus der Website entfernt werden. Er wird nicht durch einen Slider oder ähnliches ersetzt, damit die Seite ruhiger und professioneller wirkt.

## Aktueller Stand
- Das eigentliche Marquee-UI ist bereits nicht mehr in `src/routes/index.tsx` vorhanden.
- In `src/styles.css` existiert aber noch toter Code: `@keyframes marquee` und `@utility animate-marquee`.
- Eine Prüfung des aktuellen Previews ergab keine sichtbaren Marquee-Elemente.

## Schritte

1. **Toter CSS-Code entfernen**
   - Datei: `src/styles.css`
   - Lösche die Zeilen 208–215:
     ```css
     @keyframes marquee { ... }
     @utility animate-marquee { ... }
     ```
   - Damit ist die Animation endgültig aus dem Projekt entfernt.

2. **Quer-Check aller Routen**
   - Prüfe `src/routes/*.tsx` auf verbliebene horizontale Auto-Scroll-/Ticker-Elemente (z. B. Klassen, die `animate-marquee`, `translateX` mit `infinite` oder ähnliche Bewegungsmuster nutzen).
   - Falls noch ein solches Element gefunden wird, wird es entfernt.

3. **Build & Preview-Validierung**
   - Führe den Build durch, um sicherzustellen, dass das Entfernen des CSS keine Fehler verursacht.
   - Öffne das Preview der Startseite und bestätige visuell, dass kein durchlaufender Bereich mehr vorhanden ist.

## Nicht im Scope
- Die statischen Preis-Karten auf der Startseite (manuell swipebar auf Mobil, aber nicht automatisch) bleiben erhalten.
- Inhaltliche Texte oder andere Animationen werden nicht verändert.
