## Ziel
Den Hero-Text und die Anmelde-Callouts auf der Startseite so überarbeiten, dass klar wird: Anmeldung geht sowohl per WhatsApp als auch bequem online über das Formular.

## Geplante Änderungen

### 1. Hero-Text überarbeiten (`src/routes/index.tsx`)
- **Überschrift (H1):** Kurz, SEO-relevant, ohne Aneinanderreihung von Fahrklassen. Beispiel:
  > „Führerschein in Bochum – einfach & unkompliziert“
- **Unterzeile:** Stärkeres Alleinstellungsmerkmal mit beiden Anmeldekanälen. Beispiel:
  > „Melde dich in unter 2 Minuten online an oder schreib uns direkt per WhatsApp. Persönliche Betreuung, moderne Fahrzeuge und flexible Fahrstunden in Bochum.“
- **CTAs:**
  - Primär: „Jetzt online anmelden“ (Link `/anmeldung`)
  - Sekundär: „WhatsApp schreiben“ (externer Link zur hinterlegten Nummer aus `src/lib/contact.ts`)
  - Tertiär: „Preise ansehen“

### 2. 4-Schritte-Ablauf anpassen
- Schritt 01 aktuell: „Melde dich per WhatsApp“
- Neu: Beide Kanäle nennen, z. B.
  > „Online oder per WhatsApp anmelden“
  > „Wähle zwischen dem Online-Formular oder einer schnellen WhatsApp-Nachricht.“

### 3. Sprach- und Stilvorgaben
- Keine Bindestriche in Aufzählungen.
- Kurze, seriöse Fahrschul-Sprache.
- SEO-relevante Keywords: Führerschein Bochum, Fahrschule Bochum, Online-Anmeldung, WhatsApp.

## Nicht im Scope
- Keine Änderungen am Design, Layout, Video oder Farben.
- Keine Änderungen an anderen Seiten außer der Startseite.

## Dateien
- `src/routes/index.tsx`