## Ziel
In der Hero-Sektion oben rechts ein auffälliges Sprachen-Panel einbauen, das die 5 Beratungssprachen mit Flaggen zeigt: Deutsch, Englisch, Kurdisch, Türkisch, Arabisch.

## Umsetzung — `src/routes/index.tsx` in `HeroSection`

### Positionierung
- Absolutes Element `absolute right-4 top-24 sm:right-6 sm:top-28 lg:right-10 lg:top-32 z-20`.
- Auf Mobile (< sm) ausgeblendet oder kompakter (Entscheidung: sichtbar, aber schlank — als vertikale Flag-Säule oben rechts, damit es nicht mit Text kollidiert).

### Design ("krass")
- Glassmorphism-Karte: `rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl shadow-primary/20`.
- Roter Akzent-Balken oben: `absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent`.
- Innen: Eyebrow-Zeile in weiß/85, uppercase, tracking-wide: „Wir sprechen deine Sprache".
- Darunter vertikale Liste mit 5 Flag-Chips: Flag-Emoji groß (`text-2xl`) + Sprachname (`text-xs sm:text-sm font-semibold text-white`), jeweils `flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 border border-white/10`.
- Kurdisch: Da kein Emoji-Flag existiert, ein inline gerendertes SVG-Icon (Kurdistan-Flagge: rot/weiß/grün Streifen + gelbe Sonne) im gleichen `w-6 h-4` Format wie Emoji-Höhe.
- Subtile Animation: `animate-fade-up` mit `animationDelay: "0.75s"`, plus dezenter Hover-Lift der Karte (`hover:-translate-y-0.5 transition-transform`).

### Layout-Varianten
- Desktop/Tablet: 5 Reihen vertikal in der Karte.
- Mobile: Kompaktere Version — nur Flaggen ohne Text als horizontale Reihe oben rechts (weniger Platzverbrauch), Padding reduziert.
  - Umsetzung: zwei Renderings mit `hidden sm:flex` / `flex sm:hidden`.

### Bestandsschutz
- Bestehende Trust-Zeile („Klasse B · B197 · Mehrsprachige Beratung · Erste-Hilfe-Kurse") bleibt unverändert — das neue Panel ergänzt sie visuell.
- Keine Änderungen an Video, Overlays oder anderen Sektionen.

Ergebnis: Sofort im Hero oben rechts eine premium-wirkende Glass-Karte mit 5 Flaggen — Besucher sehen auf den ersten Blick, dass MIRO-DRIVE mehrsprachig berät.
