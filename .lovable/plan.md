## Ziel
Hero-Bereich der Startseite auf ein helles, seriöses Fahrschul-Design umstellen, Buttons visuell aufwerten und das Sprachen-Panel aus der engen Hero-Ecke an eine gut sichtbare, luftige Stelle verschieben.

## Änderungen in `src/routes/index.tsx`

### 1. Heller Hero-Hintergrund
- Dunklen Gradient (`bg-gradient-to-br from-slate-950 …`) ersetzen durch hellen, seriösen Look:
  - Basis: `bg-white` mit sanftem Verlauf zu `bg-slate-50` / leichtem Rot-Tint (`from-white via-slate-50 to-red-50/40`).
  - Dezentes Grid-Muster in `slate-200/40` statt weiß, damit es auf hell funktioniert.
  - Weiche radial-Glows in `primary/10` statt harte dunkle Overlays.
- Alle Textfarben im Hero von `text-white` / `text-slate-200` auf dunkle Töne umstellen:
  - Headline: `text-slate-900`
  - Body/Subline: `text-slate-600`
  - Badges/Chips: helle Glass-Optik mit `bg-white/70`, `border-slate-200`, `text-slate-700`.
- Video-Karte rechts bleibt als Cinema-Karte, aber Rahmen/Schatten an hellen Hintergrund angepasst (weicher `shadow-2xl shadow-slate-300/50`, `ring-slate-200`).

### 2. Buttons aufwerten
- Primär-CTA („Jetzt anmelden“): kräftiger Rot-Gradient mit Glow, klar dominanter Look — größerer Padding, `rounded-xl`, subtiler Shine-/Hover-Lift, Icon rechts.
- Sekundär-CTA („Preise ansehen“ o. ä.): Outline-Variante auf hell (`border-slate-300`, `bg-white`, `hover:bg-slate-50`, dunkler Text) statt Glass-auf-Dunkel.
- Konsistente Höhe, gleiche Radius-Familie, ordentliche Icon-Ausrichtung.
- Trust-Zeile (Sterne / Bewertungen) unter den Buttons in dunkler Schrift auf hell.

### 3. Sprachen-Panel neu platzieren
- Bisheriges `LanguagePanel` aus der Hero-Ecke (oben rechts, gequetscht) entfernen.
- Neue Platzierung: eigener schmaler Sprachen-Streifen **direkt unter der Hero-Sektion**, volle Breite, luftig zentriert.
  - Helle Karte / Bar mit `bg-white`, feiner Border und dezentem Schatten.
  - Zeile: kleine Überschrift links („Wir beraten & unterrichten in:“) + Flaggen mit Sprachnamen horizontal, großzügiger Abstand.
  - Kurdistan bleibt als bestehendes SVG, restliche Sprachen als Emoji-Flaggen.
  - Mobile: horizontal scrollbare Reihe, damit nichts quetscht.
- Keine funktionalen Änderungen — nur Position, Layout und Styling.

## Nicht Teil des Plans
- Kein Umbau anderer Sektionen (Preise, Team, Führerschein-Info bleiben unverändert).
- Keine Änderungen an Video-Datei, Daten oder Server-Funktionen.
