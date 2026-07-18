
## Ziel

Interessenten können sich direkt über die Webseite anmelden. Die Anmeldung wird sicher in der Datenbank gespeichert und ist im Admin-Bereich einsehbar. Der E-Mail-Versand an `info@mirodrive.de` wird später (bei eingerichteter Domain) nachgerüstet — die Struktur wird schon so vorbereitet, dass später nur der Versand ergänzt werden muss.

## Umfang jetzt

- Öffentliche Anmeldeseite unter `/anmeldung` mit Formular
- Speicherung in der bestehenden `inquiries`-Tabelle (Typ `registration`)
- Admin-Bereich zeigt Anmeldungen mit allen Details, Status ändern, löschen
- Link zur Anmeldung in Navbar und auf der Startseite (CTA)

## Formularfelder

- Vorname *
- Nachname *
- Geburtsdatum *
- Straße + Hausnummer *
- PLZ *
- Ort *
- Telefonnummer *
- E-Mail *
- Führerscheinklasse (Auswahl: B, B197, B78, A, AM, Erste-Hilfe) *
- Nachricht (optional)
- Datenschutz-Checkbox *

## Validierung

- Client-seitig mit Zod (Pflichtfelder, E-Mail-Format, Telefonformat, Geburtsdatum sinnvoll)
- Server-seitig in einer `createServerFn` nochmal Zod-validiert
- Rate-Limit: max. 5 Anmeldungen pro IP pro Stunde (simple Prüfung über `inquiries` Zeitfenster)

## Technische Details

- Neue Route: `src/routes/anmeldung.tsx` (öffentlich, SSR, mit `head()`-Meta)
- Server-Funktion: `src/lib/inquiries.functions.ts` — `submitRegistration`
- DB: `inquiries`-Tabelle nutzen; falls nötig zusätzliche Spalten per Migration ergänzen (`first_name`, `last_name`, `birth_date`, `address`, `postal_code`, `city`, `license_class`) — nur wenn sie noch nicht existieren
- RLS: `anon` darf INSERT (nur bestimmte Felder), nur `admin` darf SELECT/UPDATE/DELETE
- Admin-UI: Neuer Tab „Anmeldungen“ in `src/routes/_authenticated/admin.tsx` mit Tabelle, Detail-Ansicht, Status (`new`, `contacted`, `done`)
- E-Mail-Vorbereitung: TODO-Kommentar + Platzhalter-Funktion `sendRegistrationEmail(to: "info@mirodrive.de", ...)` — später mit Lovable Emails aktivieren

## Später (nicht jetzt)

- Domain + Lovable Emails einrichten → tatsächlicher Versand an `info@mirodrive.de`
- Digitale Vertragsunterzeichnung (separater Schritt, eigener Punkt)

## Nach Freigabe

Ich prüfe zuerst die aktuelle `inquiries`-Spaltenstruktur und RLS-Policies, ergänze fehlende Spalten per Migration, dann Formular + Server-Funktion + Admin-Ansicht.
