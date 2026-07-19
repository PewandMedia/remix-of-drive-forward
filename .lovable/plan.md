## Ziel

Auf der Unterseite `/team` soll die **mobile Ansicht** exakt so aussehen:

```text
     Ilkay (allein, mittig)

 [Fahrlehrer] [Fahrlehrer] [Fahrlehrer]
 [Fahrlehrer] [Fahrlehrer] [Fahrlehrer]

     [Bürokraft] [Bürokraft]
     [Bürokraft] [Bürokraft]
```

Also: Fahrlehrer auf Mobile in **3er-Reihen**, Bürokräfte auf Mobile in **2er-Reihen**. Desktop bleibt wie es ist.

## Aktueller Zustand (Mobile)

- Fahrlehrer-Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` → auf Mobile aktuell **1 pro Reihe** statt 3.
- Bürokräfte-Grid: `grid-cols-2 sm:gap-8 lg:grid-cols-4` → auf Mobile bereits 2 pro Reihe (bleibt).

## Änderungen

### `src/routes/team.tsx`

- **Fahrlehrer-Grid** auf Mobile fix auf 3 Spalten setzen: `grid-cols-3 lg:grid-cols-3` (Desktop unverändert 3er).
- Abstände (`gap`) mobil verkleinern, damit 3 Karten nebeneinander sauber passen (`gap-2 sm:gap-8`).
- **Bürokräfte-Grid** bleibt `grid-cols-2 ... lg:grid-cols-4` (Mobile schon korrekt).

### `src/components/site/TeamCard.tsx`

- Da drei Karten nebeneinander auf schmalen Screens sehr wenig Platz haben, die `size="sm"`-Variante der Karte kompakter machen (kleinere Avatar-Größe, kleinere Schrift, geringeres Padding), damit Name, Rolle und Sprachen sauber in der Karte bleiben.
- Auf der `/team`-Fahrlehrerreihe wird `size="sm"` nur mobil greifen; ab `sm:` wieder die normalen Größen – das ist bereits so in der Karte über die responsive Klassen (`sm:` Präfixe) vorgesehen und wird lediglich für den kleineren Mobile-State feinjustiert.

## Nicht ändern

- Ilkay-Karte oben (bleibt `size="lg"` zentriert).
- Team-Teaser auf der Startseite (`/`) bleibt unverändert (keine Bürokräfte, keine zusätzlichen Fahrlehrer).
- Keine DB-, Admin- oder Datenänderungen.

## Technische Details

- Betroffene Dateien:
  - `src/routes/team.tsx` — Grid-Klassen der Fahrlehrer-Reihe.
  - `src/components/site/TeamCard.tsx` — kompaktere `size="sm"`-Variante für die 3-spaltige Mobile-Ansicht.
- Fahrlehrer-Karten in der 3er-Reihe werden auf Mobile mit `size="sm"` gerendert und ab `sm:` wieder größer dargestellt.
- Build-Validierung nach den Änderungen.