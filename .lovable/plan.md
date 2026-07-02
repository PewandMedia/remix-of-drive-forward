## Ziel
Auf der Kontakt-Unterseite (`/kontakt`) den aktuell kombinierten „Social“-Button (der nur zu Instagram führt und „Instagram & TikTok“ anzeigt) in zwei eigenständige Buttons aufteilen. Beide sollen wie im Footer gestaltet sein und jeweils mit dem originalen Logo und der korrekten URL zu Instagram bzw. TikTok verlinken.

## Änderungen

### 1. `src/routes/kontakt.tsx`
- Den bestehenden kombinierten Social-Button entfernen.
- **Neuen Instagram-Button** einfügen:
  - Icon: `Instagram` (Lucide)
  - Label: „Instagram“
  - URL: `CONTACT.instagram`
- **Neuen TikTok-Button** einfügen:
  - Icon: `TikTokIcon` (eigene Komponente)
  - Label: „TikTok“
  - URL: `CONTACT.tiktok`
- Grid-Layout anpassen: Die Button-Zeile enthält dann 5 Elemente (WhatsApp, Telefon, E-Mail, Instagram, TikTok). Die Spaltenanzahl im Grid muss entsprechend erweitert werden (`lg:grid-cols-5` statt `lg:grid-cols-4`).

### 2. Keine Änderungen an Daten
- `src/lib/contact.ts` enthous bereits die korrekten getrennten URLs für Instagram und TikTok.

## Ergebnis
Auf der Kontakt-Seite werden Instagram und TikTok als zwei separate, klar beschriftete Buttons mit Original-Logos angezeigt – jeder verlinkt direkt auf den jeweiligen Account.
