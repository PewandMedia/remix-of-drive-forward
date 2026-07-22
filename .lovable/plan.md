## Ziel
Der Admin soll die Öffnungszeiten der beiden Filialen (Rathaus/Brückstraße und Riemke/Herner Str.) im Admin-Panel bearbeiten können. Änderungen wirken automatisch überall, wo die Zeiten auftauchen: Startseite (Standorte-Sektion), Kontaktseite, Footer und Erste-Hilfe-Kurs-Seite.

## Umsetzung

### 1. Datenbank
Neue Tabelle `location_hours` in Supabase:
- `location_id` (Text, z. B. `bochum-zentrum`, `bochum-riemke`)
- `sort_order` (Integer) – Reihenfolge der Zeilen
- `day_label` (Text, z. B. „Di. – Do.")
- `time_label` (Text, z. B. „14:00 – 20:00" oder „geschlossen")

RLS:
- Öffentliches Lesen (anon + authenticated)
- Nur Admins dürfen einfügen/ändern/löschen (`has_role(auth.uid(), 'admin')`)

Seed mit den aktuellen Zeiten aus `src/lib/locations.ts`.

### 2. Server-Funktionen
In `src/lib/public-data.functions.ts`:
- `getLocationHours()` – liefert alle Zeiten öffentlich (für SSR).

In neuer Datei `src/lib/location-hours.functions.ts` (mit `requireSupabaseAuth`):
- `saveLocationHours({ location_id, rows })` – ersetzt die Zeilen einer Filiale atomar (Delete + Insert).

### 3. Frontend-Integration
- `src/lib/locations.ts` behält Stammdaten (Adresse, Name), aber `hours` wird zum Fallback.
- Neuer Hook / Query `useLocationHours()` (TanStack Query mit `getLocationHours`), der in einem gemeinsamen Provider oder direkt in den vier Komponenten (`Footer`, `LocationCard`, `index.tsx` Standorte, `kontakt.tsx`, `erste-hilfe-kurs.tsx`) die statischen `loc.hours` überschreibt.
- Alternative sauberer: eine Helper-Funktion `mergeHours(locations, dbHours)`, die auf allen Seiten via Loader (`ensureQueryData`) genutzt wird.

### 4. Admin-Panel
Neuer Tab „Öffnungszeiten" in `src/routes/_authenticated/admin.tsx`:
- Zwei Karten (eine pro Filiale) mit Titel.
- Pro Karte editierbare Liste von Zeilen (Tag + Zeit), Drag-lose Reihenfolge über sort_order.
- Zeilen hinzufügen / entfernen / speichern.
- „Speichern"-Button pro Filiale, ruft `saveLocationHours` auf und invalidiert die Query, sodass die Live-Seite sofort aktualisiert wird.

## Ergebnis
Öffnungszeiten sind eine einzige Datenquelle in der Datenbank; jede Änderung im Admin-Panel schlägt automatisch auf Startseite, Kontakt, Footer und Erste-Hilfe-Kurs durch – konsistent für beide Filialen.