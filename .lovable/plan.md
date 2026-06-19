# Preise-Seite – Redesign & echtes Angebot abbilden

## Problem
- Aktuell wird **nur eine schmale Karte** (Klasse B) angezeigt, weil in der Datenbank nur Preise für `Klasse B` und `Externe TÜV-Gebühren` existieren. B78 und B197 fehlen komplett, deshalb wirkt die Seite leer und "an der Seite geklebt".
- "Externe TÜV-Gebühren" werden aktuell gar nicht gerendert (Kategorie nicht in der Anzeigeliste).
- "Jetzt anmelden"-Button widerspricht der Regel: **keine Online-Anmeldung**, nur in den Filialen.
- Design ist generisch (weiße Karte, dünner roter Strich) – keine Hierarchie, kein "Wow".

## Fahrschul-Angebot (laut deiner Nachricht)
Die Fahrschule bietet ausschließlich:
1. **Klasse B** (Standard PKW)
2. **Klasse B78** (Automatik)
3. **Klasse B197** (Automatik-Ausbildung, manueller Führerschein)

Zusätzlich werden weiterhin angezeigt: **Externe TÜV-Gebühren** und Hinweis auf **Erste-Hilfe-Kurs** (eigene Seite).

## Was passiert

### 1. Datenbank: B78 + B197 + B-Preise spiegeln
Migration, die für **B78** und **B197** dieselbe Preisstruktur wie Klasse B anlegt (Grundbetrag, Lernprogramm, Übungsstunde, Sonderfahrten, Vorstellung Theorie/Praxis). Preise initial = Klasse B; Inhaber kann jederzeit im Admin anpassen. B78 bekommt zusätzlich Position "Umschreibung/Schlüsselzahl-Fahrten". Bestehende Klasse-B-Einträge bleiben unverändert.

### 2. `/preise` – Redesign
Drei zentrale Kategorien als **gleichwertige, große Karten** in einem 3-Spalten-Grid (1 col mobil, 3 col ab `lg`) – mittig zentriert, volle Breite des Containers, nicht mehr links angepinnt.

Pro Karte:
- Farbiger Gradient-Header mit Kategorie-Icon (Auto / Automatik-Symbol)
- Großer Kategorie-Titel + ein-Satz-Beschreibung ("Manuelles Schalten", "Automatik-Klasse", "Automatik-Ausbildung – manueller Führerschein")
- Preis-Liste mit Hover-Trennlinien, Preis als auffälliger Pill rechts
- Karte **"Klasse B197" als empfohlen** markiert (Badge "Beliebt", leichter Ring + stärkerer Schatten, hebt sich heraus)
- CTA-Buttons: **"Per WhatsApp fragen"** + **"Standorte ansehen"** (Link zu `/kontakt`) – kein "Jetzt anmelden" mehr
- Subtile Effekte: Hover-Lift, Glow am Rand, animierter Gradient-Header, Border-Beam-artiger Akzent auf der empfohlenen Karte

Darunter:
- **Externe TÜV-Gebühren** als eigener, kompakter Streifen (zwei kleine Zellen Theorie/Praxis) – klar abgegrenzt, weil das keine Fahrschulpreise sind
- **Hinweis-Banner** (Info-Box) bleibt, aber kleiner und oben rechts mit Icon-Akzent
- **CTA-Bereich unten** wird zu einem stärkeren dunklen Block mit zwei großen Buttons: WhatsApp + Filialen/Route (verlinkt auf `/kontakt`)

### 3. Verhalten / Inhalt
- Keine "Anmelden"-Wording mehr; überall "Beratung / WhatsApp / Filiale besuchen"
- Hero-Untertitel wird klarer: "Anmeldung ausschließlich vor Ort in unseren Filialen in Bochum"
- Wenn eine Kategorie in der DB leer ist, wird sie nicht angezeigt (kein leerer Slot)

## Technische Details
- Migration: `INSERT INTO public.prices (category, title, description, price, sort_order, active) VALUES …` für B78 und B197. Keine Schemaänderung.
- `src/routes/preise.tsx`: neue Komponenten-Struktur, `CATEGORY_ORDER` = `["Klasse B", "Klasse B197", "Klasse B78"]`, separater Render-Block für `Externe TÜV-Gebühren`, "Erste-Hilfe-Kurs" wird nicht mehr hier gemischt, sondern als kleiner Verweislink unter den Karten.
- `CATEGORY_CTA` entfernt, ersetzt durch einheitliche WhatsApp/Kontakt-CTAs (`CONTACT.whatsapp` + `<Link to="/kontakt">`).
- Effekte mit Tailwind + bestehenden Tokens (Gradient, Shadow, Ring, Hover) – keine neuen npm-Pakete nötig.
- Admin-Bereich bleibt unverändert; neue Kategorien tauchen automatisch im bestehenden Preise-Tab auf.

## Geänderte Dateien
- `supabase/migrations/<timestamp>_seed_b78_b197_prices.sql` (neu, Daten-Seed)
- `src/routes/preise.tsx` (Redesign)

Keine Änderungen an Footer, Navbar, Admin-Logik, anderen Routen.
