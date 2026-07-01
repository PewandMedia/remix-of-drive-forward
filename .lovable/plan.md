## Ziel
Admin-Panel um zeitlich begrenzte Angebote pro Preis erweitern, Login-Link im Footer, Admin-Konto `Miro-drive@media.de` anlegen. Auf `/preise` und Startseite: bei aktivem Angebot alten Preis durchgestrichen, neuen Preis fett hervorgehoben, Countdown "noch X Tage / Std.", und CTA "Jetzt Angebot sichern".

## Aktueller Stand (bereits vorhanden)
- Admin-Panel `/_authenticated/admin` mit Tab "Preise" existiert
- Tabelle `prices` hat schon `offer_active`, `old_price`, `offer_label`, `offer_valid_from`, `offer_valid_until`
- RLS + Admin-Rolle (`user_roles` + `has_role`) sind aktiv
- Anzeige von `old_price` + `offer_label` auf `/preise` teilweise vorhanden

## Änderungen

### 1. Admin-Konto anlegen (Migration/Seed)
- Nutzer per SQL in `auth.users` mit `Miro-drive@media.de` + Passwort `1213123123` (Hash via `crypt`), Email vorbestätigt
- Eintrag in `public.user_roles` mit Rolle `admin`

### 2. Admin-Panel Preis-Dialog (`src/routes/_authenticated/admin.tsx`)
- Zwei neue Datetime-Felder hinzufügen: **Gültig ab** (`offer_valid_from`) und **Gültig bis** (`offer_valid_until`)
- Werte im save-Handler auf ISO speichern (leer = NULL)
- Kleiner Hilfetext: "Nach Ablauf wird das Angebot automatisch ausgeblendet"

### 3. Angebots-Logik als Helper (`src/lib/offer.ts`, neu)
- `isOfferLive(p)`: prüft `offer_active` UND `now` innerhalb `valid_from`/`valid_until` (leere Grenzen = offen)
- `formatRemaining(untilIso)`: gibt lesbaren String zurück ("noch 3 Tage 4 Std." / "noch 5 Std. 12 Min.")

### 4. `/preise` Angebots-Darstellung (`src/routes/preise.tsx`)
- `isOfferLive` statt reinem `offer_active`
- Preis fett + größer + Primärfarbe wenn Angebot live
- Countdown-Chip unter dem Preis "⏰ noch X Tage" (aus `offer_valid_until`)
- CTA-Button in Karte wird prominenter ("Jetzt Angebot sichern") + WhatsApp-Deep-Link mit Titel des Angebots
- Aktualisierung alle 60 s via `setInterval` für Countdown

### 5. Startseite (`src/routes/index.tsx`)
- Home-Preise-Query um `offer_valid_from/until` erweitern
- `hasActiveOffer` mit `isOfferLive` prüfen; Preise mit Streichung + Countdown-Badge anzeigen
- Bestehender Angebots-Banner am Nav-Top (bereits über `nav-active-offer` gehookt) weiter nutzen

### 6. Footer Admin-Login (`src/components/site/Footer.tsx`)
- Ganz unten in der Copyright-Zeile dezenter Link "Admin" → `/auth`, klein, `text-white/30 hover:text-white/60`

## Technische Details
- Migration: `INSERT INTO auth.users (…) VALUES (…, crypt('1213123123', gen_salt('bf')), now(), …)` + `INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email='Miro-drive@media.de'`. `ON CONFLICT DO NOTHING` damit idempotent.
- Countdown clientseitig; keine Cron nötig — bei abgelaufenem `valid_until` wird `isOfferLive` false und Ansicht fällt zurück auf normalen Preis.
- `offer_active` bleibt Master-Schalter; Datumsgrenzen sind optional.

## Deliverables
- 1 Migration (Admin-User + Rolle)
- 1 neue Datei `src/lib/offer.ts`
- Edits: `admin.tsx`, `preise.tsx`, `index.tsx`, `Footer.tsx`
