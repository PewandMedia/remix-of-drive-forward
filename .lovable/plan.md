## Problem
Auf der Startseite (`/`) scrollt ein Klick auf das Logo im Header nicht nach oben. Der `<Link to="/">` verhält sich in TanStack Router bei bereits aktiver Route passiv (kein Reload, kein Scroll).

## Lösung
In `src/components/site/Navbar.tsx` den Logo-`<Link>` erweitern:
- `onClick`-Handler hinzufügen.
- Wenn `pathname === "/"`, `event.preventDefault()` aufrufen und stattdessen `window.scrollTo({ top: 0, behavior: "smooth" })` ausführen.
- Auf Unterseiten bleibt der normale Router-Navigation zu `/` erhalten.

## Datei
- `src/components/site/Navbar.tsx` (ca. Zeile 72)

## Aufwand
1 kleiner Edit, keine neuen Abhängigkeiten.