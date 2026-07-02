## Ziel
Wenn das Hamburger-Menü auf Mobil geöffnet wird, soll man nur die Navigation sehen — keine Startseite dahinter und kein unnötiger Startseiten-Link im Menü.

## Änderungen
1. **Mobile Fullscreen-Menü sauber abdecken**
   - Overlay bleibt `fixed inset-0` und bekommt eine komplett deckende weiße Fläche.
   - Höhe wird auf den echten mobilen Viewport optimiert (`100dvh`), damit nichts von der Seite durchscheint.
   - Falls nötig: Header/Overlay-Z-Index so anpassen, dass wirklich alles über der Startseite liegt.

2. **„Startseite“ aus dem mobilen Menü entfernen**
   - Desktop-Navigation bleibt unverändert.
   - Im mobilen Fullscreen-Menü werden nur Unterseiten angezeigt: Preise, Leistungen, Erste-Hilfe-Kurs, Team, Kontakt.
   - Das Logo oben bleibt weiterhin klickbar zur Startseite.

3. **Menü-Verhalten verbessern**
   - Klick auf einen Unterseiten-Link schließt das Menü zuverlässig.
   - X-Button schließt das Menü.
   - Body-Scroll bleibt gesperrt, solange das Menü offen ist.

## Technische Details
- Änderung nur in `src/components/site/Navbar.tsx`.
- Keine Änderung an Desktop-Design, Routen oder Datenbank.
- Bestehende `NAV_LINKS` bleiben global unverändert; für Mobile wird lokal gefiltert.