## Ziel

- `/team` (Unterseite): Fahrlehrer symmetrisch **1 (Ilkay) + 3 + 3**, Bürokräfte in **2er-Reihen** auf Mobile.
- `/` (Startseite): Team-Teaser **unverändert** bei Ilkay + 3 Fahrlehrern, **keine** Bürokräfte.

## Aktueller Zustand

- `/team`: Fahrlehrer-Grid nutzt `sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4` → bei 6 weiteren Fahrlehrern entsteht auf breiten Screens das unsymmetrische Muster **1 + 4 + 2**. Bürokräfte nutzen dasselbe Grid, mobil aber nur 1 Spalte.
- Startseite: Teaser zeigt bereits Ilkay + 3 Fahrlehrer, keine Bürokräfte – bleibt so.

## Geplante Änderungen

### `/team` – Fahrlehrer-Grid
- Grid auf fix **3 Spalten** ab `lg` (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), das `2xl:grid-cols-4` entfällt.
- Ergebnis: **1 (Ilkay zentriert) + 3 + 3**.

### `/team` – Bürokräfte-Grid
- Mobil künftig **2 Spalten** (`grid-cols-2`), auf Desktop weiterhin bis zu 4 Spalten (`sm:grid-cols-2 lg:grid-cols-4`).
- Damit passen die 4 Bürokräfte auf Desktop in eine Reihe und mobil sauber in 2×2.

### Startseite (`/`)
- **Keine Änderungen** am Team-Teaser (Ilkay + 3 Fahrlehrer, keine Bürokräfte).

## Technische Details

- Betroffene Datei: `src/routes/team.tsx` (Grid-Klassen in `renderGroup` bzw. separate Grids für Fahrlehrer und Bürokräfte).
- Keine DB-, Schema- oder Dependency-Änderungen.
- Build-Validierung nach den Änderungen.