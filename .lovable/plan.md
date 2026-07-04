## Ziel
Alle WhatsApp-Buttons auf der Seite sollen beim Klick einen WhatsApp-Chat mit der Nummer **+49 1573 0218086** öffnen.

## Analyse
Alle WhatsApp-Links in der App beziehen sich auf das zentrale `CONTACT`-Objekt in `src/lib/contact.ts`. Dort ist aktuell noch eine Platzhalter-Nummer hinterlegt (`491234567890`).

## Umsetzung
1. In `src/lib/contact.ts` folgende Werte aktualisieren:
   - `whatsapp`: `https://wa.me/4915730218086`
   - `whatsappText`: `+49 1573 0218086`
   - `phone`: `4915730218086`
   - `phoneDisplay`: `+49 1573 0218086`

2. Build prüfen mit `bun run build`.

## Auswirkung
Dadurch wird automatisch jeder WhatsApp-Button (Floating-Button, Hero-CTA, Kontaktseite, etc.) auf die neue Nummer umgestellt – ohne weitere Dateien ändern zu müssen.