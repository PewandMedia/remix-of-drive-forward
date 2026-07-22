## Ziel
DSGVO-konformen Cookie-Banner ergänzen. Da die Seite laut Datenschutzerklärung ausschließlich technisch notwendige Cookies nutzt (keine Analytics/Tracking), reicht ein schlanker Info-Banner mit Zustimmung — kein aufwendiger Consent-Manager mit Kategorien-Auswahl.

## Umsetzung

1. **Neue Komponente** `src/components/site/CookieBanner.tsx`
   - Fixierter Banner unten (mobil full-width, Desktop rechts unten als Karte).
   - Text: kurze Info zu technisch notwendigen Cookies + Link zur Datenschutzerklärung.
   - Buttons: „Verstanden" (primary) und „Ablehnen" (ghost) — beide schließen den Banner. Da nur notwendige Cookies verwendet werden, wird die Auswahl nur als UI-Bestätigung gespeichert.
   - Persistenz via `localStorage` (`miro-drive-cookie-consent` = `"accepted"` / `"declined"` + Timestamp).
   - SSR-sicher: erst nach `useEffect` + Hydration einblenden (verhindert Layout-Shift & Hydration-Mismatch).
   - Design: passt zum bestehenden System (weiß, rounded-2xl, border, shadow, primary-Rot für CTA, `font-display` für Titel).
   - Slide-in Animation beim Erscheinen.

2. **Einbindung** in `src/routes/__root.tsx`
   - Import `CookieBanner` und einmalig innerhalb des Root-Layouts unter `<Outlet />` rendern, damit er auf allen Seiten erscheint.

3. **Kein Backend / keine Cookies neu setzen** — nur `localStorage`, damit die Aussage der Datenschutzerklärung („nur technisch notwendige Cookies") wahr bleibt.

## Nicht enthalten
- Keine Kategorien-Auswahl (Marketing/Statistik), da keine solchen Cookies gesetzt werden.
- Kein Consent-Reset-Link in Datenschutz/Footer (kann bei Bedarf nachgezogen werden).
