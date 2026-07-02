## Problem
Instagram-Button und Startseite-Link verweisen auf den falschen Account (`mirodrive`). Der korrekte Account lautet `miro_drive` (vgl. hochgeladener Screenshot).

## Änderung
- **`src/lib/contact.ts`**: `instagram`-Eintrag von `https://instagram.com/mirodrive` auf `https://instagram.com/miro_drive` aktualisieren.

Dadurch werden automatisch alle Stellen korrigiert, die `CONTACT.instagram` nutzen (Footer, Instagram-Sektion auf der Startseite, etc.). Keine weiteren Dateien müssen angefasst werden.