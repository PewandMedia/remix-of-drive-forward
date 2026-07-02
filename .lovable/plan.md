## Ziel
Das MIRO-DRIVE Logo im Header soll auf mobilen Viewports (unter `lg`) horizontal zentriert werden. Der Hamburger-Menü-Button bleibt rechts.

## Schritte
1. **Datei öffnen:** `src/components/site/Navbar.tsx`
2. **Layout anpassen:**
   - Dem inneren Flex-Container (`<div className="mx-auto flex ...">`) die Klasse `relative` hinzufügen.
   - Dem Logo-Link (`<Link to="/">`) die Klassen `absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0` hinzufügen, damit er auf Mobil absolut mittig und auf Desktop wieder normal linksbündig ist.
3. **Verifikation:** Im Live-Preview prüfen, ob das Logo auf Mobil (390px) zentriert ist und auf Desktop (`lg`) weiterhin links ausgerichtet bleibt.

## Technische Details
- Verwendet bestehende Tailwind-Breakpoints (`lg:`).
- Keine neuen Abhängigkeiten.
- Keine Änderungen an Desktop-Layout oder Menü-Funktionalität.