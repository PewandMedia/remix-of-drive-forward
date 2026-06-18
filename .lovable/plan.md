## Online-Anmeldung entfernen + 2 Standorte mit Navigation hinzufügen

### Was sich ändert

**1. Alle Online-Anmelde- und Anfrage-Formulare entfernen**
- `InquiryForm`-Komponente wird überall ausgebaut (Startseite, Preise, Leistungen, Erste-Hilfe, Angebote, Kontakt, FAQ, Über uns).
- Datei `src/components/site/InquiryForm.tsx` wird gelöscht.
- CTAs wie „Jetzt anmelden", „Angebot anfragen", „Online Anmelden" werden durchgehend ersetzt durch: **„In der Filiale anmelden"** + Hinweis-Text: „Die Anmeldung erfolgt persönlich in einer unserer Filialen — komm einfach während der Bürozeiten vorbei."
- Statt Formularen: Buttons für **Anrufen**, **WhatsApp**, **Route planen**.
- Admin-Panel: Tab „Anfragen" verschwindet aus dem UI (Tabelle `inquiries` bleibt in der DB unangetastet, falls später doch wieder gebraucht).

**2. Neue zentrale Daten-Datei `src/lib/locations.ts`**
Beide Standorte als typisierte Konstanten mit Adresse, Öffnungszeiten und Koordinaten-/Such-String für die Navigation:

- **Standort 1 — Bochum Zentrum (Brückstraße)**
  - Brückstraße 53, 44787 Bochum
  - Di.–Do. 14:00–20:00 · Fr. 14:00–18:00 · Sa.–Mo. geschlossen
- **Standort 2 — Bochum Riemke (Herner Str.)**
  - Herner Straße 365, 44807 Bochum
  - Di.–Do. 14:00–20:00 · Fr. 14:00–18:00 · Sa.–Mo. geschlossen

**3. Neue Komponente `LocationCard`**
Eine Karte pro Standort mit:
- Standort-Name + Adresse + Öffnungszeiten-Tabelle
- Buttons: **„Route planen"**, **„Anrufen"**, **„WhatsApp"**
- „Route planen" öffnet ein universelles Navi-Link:
  - iOS → `maps://?daddr=…` (Apple Maps, fallback Google Maps)
  - Android/Desktop → `https://www.google.com/maps/dir/?api=1&destination=…`
  - Erkennung per `navigator.userAgent`; Link wird beim Klick aufgelöst (sicheres `window.open` mit `noopener`).

**4. Kontakt-Seite (`/kontakt`) neu strukturiert**
- Kein Formular mehr.
- Hero-Text: „Anmeldung nur persönlich in der Filiale".
- Beide Standorte als große Karten nebeneinander mit allen Kontakt-Möglichkeiten (Telefon, WhatsApp, Route).
- Optional Footer-Hinweis: bei allgemeinen Fragen WhatsApp oder Anruf.

**5. Footer + Navbar**
- Footer zeigt beide Standorte kompakt (Adresse + Bürozeiten + Route-Link).
- WhatsApp-Float bleibt.

**6. Startseite**
- CTA-Sektion umgebaut: statt Formular → zwei Standort-Vorschauen + „Route planen" + Bürozeiten.

### Offene Punkte
- **Telefonnummer**: Welche soll ich für beide Standorte verwenden? (Aktuell ist ein Platzhalter in `src/lib/contact.ts`.) Soll für jede Filiale eine eigene Nummer hinterlegt werden, oder eine zentrale Nummer?
- **WhatsApp-Nummer**: Gleiche Frage — eine zentrale oder pro Filiale?
- Falls du keine eigene Nummer pro Filiale hast, nutze ich die zentrale Nummer aus `contact.ts` für beide.

### Technische Details
- Keine DB-Änderungen nötig.
- Keine Google-Maps-Embeds (kein API-Key nötig) — nur Deep-Links in die nativen Karten-Apps des Nutzers.
- Falls du später eine eingebettete Karte willst: kann ich später via Google-Maps-Connector ergänzen.