
## Ziel

Nach Absenden des Anmelde-Formulars wird automatisch ein ausgefüllter PDF-Vertrag an die E-Mail-Adresse des Kunden verschickt und im Admin-Bereich als Download hinterlegt. Solange die finale Vorlage noch nicht vorliegt, arbeiten wir mit einem Platzhalter-Vertrag – der Ablauf ist trotzdem voll testbar.

## Ablauf für den Kunden

1. Kunde füllt `/anmeldung` aus.
2. Anmeldung landet wie bisher in der Datenbank.
3. Ein PDF wird serverseitig mit den Anmeldedaten generiert (Name, Adresse, Geburtsdatum, Klasse etc.).
4. PDF wird in Supabase Storage (privater Bucket `contracts`) abgelegt.
5. Resend verschickt die E-Mail mit PDF-Anhang an den Kunden.
6. Im Admin-Panel erscheint bei jeder Anmeldung ein „Vertrag herunterladen"-Button + Status „Gesendet / Fehler".

## Was ich einrichte

- **Storage-Bucket** `contracts` (privat) mit RLS: nur Admin liest, Server schreibt.
- **DB-Erweiterung** an `inquiries`: `contract_url`, `contract_sent_at`, `contract_error`.
- **PDF-Generator** (`pdf-lib`) mit Platzhalter-Vorlage im MIRO-DRIVE-Design – später einfach durch deine finale Vorlage austauschbar, ohne den Rest anzufassen.
- **Resend-Anbindung** über den bestehenden Lovable-Connector – ich richte die Verbindung ein, du bestätigst nur den Connect-Dialog.
- **Absender:** in der Testphase `onboarding@resend.dev` (funktioniert sofort, sendet nur an die Adresse deines Resend-Accounts). Für echte Kunden richten wir danach `noreply@mirodrive.pewandmedia.de` ein (kleine DNS-Anpassung nötig).
- **Interne Kopie** an `info@miro-drive.de` als BCC (falls gewünscht – sag Bescheid, dann ist die richtige Adresse gesetzt).
- **Server-Funktion** in `submitRegistration` wird erweitert: PDF erzeugen → hochladen → Mail senden → Status in DB schreiben. Schlägt der Versand fehl, wird die Anmeldung trotzdem gespeichert und der Fehler im Admin sichtbar.
- **Admin-Panel:** in der Anmeldungs-Liste kommt eine Spalte „Vertrag" mit Download-Link und Sende-Status; Button „Erneut senden" bei Fehlern.

## Testbarkeit – ohne finale Vorlage

Ja, sofort testbar:

- Platzhalter-PDF trägt schon alle echten Anmeldedaten, Logo und Design – nur der endgültige Vertragstext fehlt.
- In der Testphase (Resend-Testabsender) landen Mails nur bei deiner eigenen Resend-Account-Adresse; du kannst also mit deiner E-Mail durchspielen, ob alles ankommt.
- Sobald deine Vorlage da ist, tausche ich nur den Inhalt des PDF-Generators aus – Formular, DB, Storage, Versand bleiben unverändert.

## Was ich von dir brauche

1. **Bestätigung des Resend-Connects**, wenn ich den Dialog öffne.
2. **BCC-Adresse** für die interne Kopie (oder „nein, keine Kopie").
3. **Später:** die finale Vertragsvorlage (PDF oder Word) + Freigabe für die DNS-Records deiner Absender-Domain.

## Technische Details

- Neue Migration: `contracts` Storage-Bucket + Spalten `contract_url TEXT`, `contract_sent_at TIMESTAMPTZ`, `contract_error TEXT` auf `inquiries`.
- `pdf-lib` als reines JS-Package (Worker-kompatibel, kein Node-Binär).
- `sendTemplateEmail` bzw. Resend-Gateway-Aufruf innerhalb der bestehenden `submitRegistration`-Server-Funktion – kein neuer Public-Endpoint, keine Client-Änderungen außer dem bestehenden Formular.
- Fehler beim Mailversand werfen die Anmeldung nicht weg (`try/catch` um PDF+Mail, DB-Insert bleibt bestehen).
- Admin-Bereich (`src/routes/_authenticated/admin.tsx`, Inquiries-Tab): neue Spalte + „Erneut senden"-Server-Funktion (`resendContract`).
