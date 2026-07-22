## Neue Datenschutzerklärung für MIRO-DRIVE

`src/routes/datenschutz.tsx` komplett neu aufbauen – als vollständige, an DSGVO orientierte Erklärung, die die tatsächlich auf der Seite laufenden Verarbeitungen abbildet. Cookie-Banner und Bestätigungs-E-Mail werden **nicht** eingebaut – nur der Text bereitet die spätere Umsetzung vor.

### Verantwortliche Stelle
Aus `src/lib/contact.ts` + Impressum: Fahrschule Miro-Drive, Ilkay Altin, Herner Str. 365, 44807 Bochum, Tel. 01772358248, E-Mail info@miro-drive.de.

### Abschnitte

1. **Verantwortlicher** – Namen, Adresse, Telefon, E-Mail (§ 5 TMG-analog).
2. **Allgemeine Hinweise & Rechtsgrundlagen** – Kurzüberblick über DSGVO-Grundlagen (Art. 6 Abs. 1 lit. a, b, c, f).
3. **Zugriffsdaten / Server-Logfiles** – Beim Aufruf werden technisch nötige Daten (IP, User-Agent, Zeitpunkt, Referrer, aufgerufene URL) durch den Hoster verarbeitet; Rechtsgrundlage Art. 6 Abs. 1 lit. f, Speicherung max. wenige Wochen zur Betriebssicherheit.
4. **Hosting** – Hinweis, dass die Seite auf einem VPS in Deutschland/EU gehostet wird. Platzhalterzeile „Hosting-Anbieter: {Name/Sitz} – bitte durch den Betreiber ergänzen", damit die Angabe rechtssicher gemacht werden kann, ohne dass wir sie erfinden.
5. **Cookies & lokale Speicherung** – Aktuell nur technisch notwendige Speicherung (Session/Admin-Login via Supabase, ggf. Präferenz-Speicher). Kein Tracking, kein Analytics, keine Marketing-Cookies. Hinweis, dass ein Cookie-/Consent-Banner nachgezogen wird, sobald einwilligungspflichtige Dienste zum Einsatz kommen.
6. **Online-Anmeldung (`/anmeldung`)** – Verarbeitete Felder aus `submitRegistration` (Vorname, Nachname, Geburtsdatum, Adresse, PLZ, Ort, Telefon, E-Mail, Führerscheinklasse, optionale Nachricht, Erste-Hilfe-Interesse). Zweck: Bearbeitung der Anmeldung und Vorbereitung des Ausbildungsvertrags. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich) sowie lit. a (Datenschutz-Checkbox). Empfänger: Fahrschulinhaber und ggf. beauftragte Fahrlehrer. Speicherdauer: bis zur Beendigung der Fahrausbildung + gesetzliche Aufbewahrungsfristen (bis zu 10 Jahre, § 147 AO / § 257 HGB, soweit relevant). Hinweis: Nach Absenden erhält die angegebene E-Mail-Adresse eine automatische Bestätigungs-E-Mail; die E-Mail-Zustellung erfolgt über einen Auftragsverarbeiter (wird bei Aktivierung ergänzt).
7. **Kontaktaufnahme** – E-Mail (`info@miro-drive.de`) und Telefon (`01772358248`) zur Anfragebearbeitung, Art. 6 Abs. 1 lit. b/f.
8. **WhatsApp-Kommunikation** – Klarer Hinweis: Über den WhatsApp-Button (`+49 1573 0218086`) findet der Chat auf Servern von WhatsApp Ireland Ltd. / Meta statt; Datenverarbeitung erfolgt nach deren Bedingungen, Datentransfer in Drittländer möglich. Nutzung freiwillig, alternative Kontaktwege (E-Mail, Telefon) verfügbar.
9. **Google Maps / eingebettete Karten & externe Links** – Falls Karten/Links (Google Maps zu Filialen, Instagram, TikTok) genutzt werden, kurzer Hinweis auf externe Anbieter und deren Datenschutz.
10. **Admin-Bereich** – Login (`/auth`) nur für internes Personal, Auth über Supabase (Sitz Frankreich/EU), Verarbeitung nach Art. 6 Abs. 1 lit. b/f.
11. **Auftragsverarbeitung** – Nennung genereller Kategorien (Hosting, Datenbank/Supabase, ggf. E-Mail-Versand-Dienstleister); Verträge nach Art. 28 DSGVO abgeschlossen.
12. **Rechte der betroffenen Personen** – Auskunft (Art. 15), Berichtigung (16), Löschung (17), Einschränkung (18), Datenübertragbarkeit (20), Widerspruch (21), Widerruf von Einwilligungen (7 Abs. 3) sowie Beschwerderecht bei der Aufsichtsbehörde (LDI NRW, Kavalleriestraße 2–4, 40213 Düsseldorf).
13. **SSL/TLS-Verschlüsselung** – Standardhinweis.
14. **Änderungen der Datenschutzerklärung** – Kurzer Passus mit Stand-Datum.

### Umsetzung
- Datei: `src/routes/datenschutz.tsx` neu schreiben, gleiche Struktur wie neues Impressum (`SiteLayout` + `PageHero` + `max-w-3xl` Container mit `section`/`h2`-Blöcken).
- Head-Meta: Title „Datenschutzerklärung – MIRO-DRIVE Fahrschule", passende Description, `og:title/og:description/og:url`, canonical `/datenschutz`.
- Kontaktangaben aus `CONTACT` (E-Mail) + hart kodierte Telefonnummer / Adresse wie im Impressum.
- Keine Änderungen an anderen Dateien; kein Cookie-Banner, keine Backend-Änderungen.

### Offene Punkte (Platzhalter im Text markiert)
- Konkreter Hosting-Anbieter (Name + Sitz) für Abschnitt „Hosting".
- Konkreter E-Mail-Versand-Dienstleister – wird ergänzt, sobald die Bestätigungs-E-Mail aktiviert wird.
Sag Bescheid, wenn ich diese Angaben schon eintragen soll; sonst bleiben es klar markierte Platzhalter.
