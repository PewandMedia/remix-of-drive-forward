## Ziel
Mobile-Ansicht der Preis-Karten: **1 Spalte untereinander**, aber jede Karte **horizontal dicht gepackt**, sodass alle Infos sichtbar sind ohne endloses Scrollen.

## Strategie pro Karte (Mobile)
Statt alles vertikal zu stapeln, werden Inhalte in **horizontale Zeilen mit mehreren Spalten** gelegt:

```text
┌─────────────────────────────────────────────┐
│ [Icon] Klasse B          [Preis-Chip]       │
│        Auto-Führerschein                    │
├─────────────────────────────────────────────┤
│ 🚗 5 Über · 4 Auto · 3 Nacht  |  📚 14 DS   │
│ Alter 17/18 · TÜV-Prüfung                   │
├─────────────────────────────────────────────┤
│ • Grundbetrag        75€  • Sonderf.  80€   │
│ • Theorie            15€  • Prüfung   250€  │
├─────────────────────────────────────────────┤
│ [WhatsApp]            [Filiale]             │
└─────────────────────────────────────────────┘
```

## Änderungen in `src/routes/preise.tsx`

1. **Grid-Container**: zurück auf `grid-cols-1 lg:grid-cols-3` (Mobile untereinander).
2. **Karten-Header**: Icon + Titel links, Preis-Chip rechts (grid-cols mit `min-w-0` + `shrink-0`), keine Überlappung.
3. **Info-Block**: kompakte 2-Spalten-Zeile für Sonderfahrten-Stats + Theorie/Alter, `text-[11px]`.
4. **Preisliste**: auf Mobile `grid grid-cols-2 gap-x-3 gap-y-1.5` — jede Position (Grundbetrag, Sonderfahrten, Theorie, Prüfung etc.) als kompakte Zeile mit Label links, Preis rechts. Lange Beschreibungen ausgeblendet, Alt-Preise/Badges als kleine inline-Tags sichtbar.
5. **CTAs**: WhatsApp + Filiale nebeneinander (`grid-cols-2`), volle Breite.
6. **Icons**: Gradient-Ring + Glow bleibt erhalten.
7. **Desktop (`lg:`)**: unverändert.

## Ergebnis
- Alle Klassen (B, B197, B78) untereinander lesbar
- Alle wichtigen Infos sichtbar (Sonderfahrten, Theorie, Alter, Prüfung, Preise, beide CTAs)
- Karten deutlich kürzer durch 2-spaltige Anordnung innerhalb der Karte → weniger Scrollen
