Das Impressum der Website soll mit den vom Betreiber gelieferten Angaben vollständig und rechtskonform ausgestattet werden. Alle anderen Seiteninhalte bleiben unverändert.

## Ziel
Die Route `/impressum` wird durch ein vollständiges Impressum nach deutschem Recht ersetzt. Alle Angaben bleiben im JSX als statischer Content, keine externen Datenquellen.

## Änderungen

### 1. `src/routes/impressum.tsx` erweitern
- **Angaben gemäß § 5 TMG:**
  - Fahrschule Miro-Drive
  - Ilkay Altin (Einzelunternehmen)
  - Herner Str. 365, 44807 Bochum
  - USt-IdNr.: DE341767395
- **Kontakt:**
  - Telefon: 01772358248
  - E-Mail: info@miro-drive.de
- **Aufsichtsbehörde:**
  - Straßenverkehrsamt Bochum
  - Bulksmühle 17, 44809 Bochum
  - Link: Straßenverkehrsamt | Stadt Bochum
- **EU-Online-Streitbeilegung:**
  - Hinweis mit externem Link http://ec.europa.eu/consumers/odr/
- **Social-Media-Geltungsbereich:**
  - Hinweis, dass das Impressum für alle verlinkten Social-Media-Kanäle gilt.
- **Disclaimer / Haftungsausschluss:**
  - Inhalt des Onlineangebotes
  - Verweise und Links
  - Urheber- und Kennzeichenrecht
  - Rechtswirksamkeit des Haftungsausschlusses
- **Datenschutz-Verweis:**
  - Kurzer Satz mit internem Link zu `/datenschutz`.
- **Facebook Social Plugins Hinweis:**
  - Hinweis auf Einbindung von Facebook-Plugins, Datenübermittlung an Facebook Inc., Rechte/Einstellungen.
- **Google Analytics Hinweis:**
  - Hinweis auf Verwendung von Google Analytics, Cookies, IP-Anonymisierung, Opt-Out-Link.

### 2. SEO-Metadaten anpassen
- Titel: `Impressum – MIRO-DRIVE Fahrschule`
- Description: Rechtliche Angaben gemäß § 5 TMG.
- Canonical und og:url auf `/impressum`.

### 3. Design & Layout
- Bestehende `SiteLayout` und `PageHero` beibehalten.
- Inhalt in mehrere übersichtliche Abschnitte mit Zwischenüberschriften gliedern.
- Externe Links mit `target="_blank" rel="noopener noreferrer"` versehen.
- Keine hartkodierten Farbwerte außerhalb des bestehenden Design-Systems verwenden.

## Einschränkung
Die Telefonnummer 01772358248 wird ausschließlich im Impressum eingetragen. Die allgemeinen Kontaktdaten in `src/lib/contact.ts` und andere Seiten bleiben unverändert.