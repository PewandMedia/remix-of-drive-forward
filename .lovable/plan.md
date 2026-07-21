## Neues Impressum für Miro-Drive

`src/routes/impressum.tsx` komplett neu aufbauen – ohne Facebook-Bezüge, mit den vom Nutzer bestätigten Daten und passend zum Design der übrigen Seiten (gleiche Container-/Typografie-Struktur wie z. B. Datenschutz/AGB).

### Inhalt (finale Fassung)

**Angaben gemäß § 5 TMG**
- Fahrschule Miro-Drive
- Ilkay Altin (Einzelunternehmen)
- Herner Str. 365, 44807 Bochum

**Kontakt**
- Telefon: 01772358248
- E-Mail: info@miro-drive.de

**Umsatzsteuer-ID**
- gemäß § 27a UStG: DE341767395

**Aufsichtsbehörde**
- Straßenverkehrsamt Bochum
- Bulksmühle 17, 44809 Bochum

**Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV**
- Ilkay Altin, Anschrift wie oben

**Weitere rechtliche Standardabschnitte** (ohne Facebook, ohne Google Analytics – nur allgemein gehalten, passend zur aktuellen Seite):
- Haftung für Inhalte
- Haftung für Links
- Urheberrecht
- Hinweis EU-Streitschlichtung / Verbraucherstreitbeilegung

### Umsetzung
- Datei: `src/routes/impressum.tsx` neu schreiben
- Head-Meta beibehalten (Title „Impressum – Miro-Drive“, description, canonical `/impressum`)
- Layout: bestehende `Navbar` + `Footer` + Container mit `prose`-artigem Styling wie bereits verwendet
- Keine Änderungen an anderen Seiten

### Offene Frage
Falls noch fehlt: Handelsregister-/Kammer-Angaben, Berufsbezeichnung („Fahrlehrer“) samt zuständiger Erlaubnisbehörde und Fahrlehrerlaubnis-Nummer sind rechtlich üblich. Ich baue das Impressum ohne diese Punkte, wenn du keine Angabe machst – sag Bescheid, falls ich sie ergänzen soll.
