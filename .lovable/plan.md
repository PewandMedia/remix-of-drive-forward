# Erste-Hilfe-Änderungen zuverlässig auf Start- & Unterseite spiegeln

## Ziel
Wenn du im Admin-Panel (Tab „Erste-Hilfe") Beschreibung, Preis, Dauer, Termin-Hinweis oder Termine änderst, sollen die Änderungen sofort und dauerhaft auf der Startseite und auf `/erste-hilfe-kurs` sichtbar werden – ohne Hard-Reload-Tricks.

## Aktueller Stand (verifiziert)
- Public-Reads: `getFirstAidInfo` und `getUpcomingFirstAidDates` in `src/lib/public-data.functions.ts`.
- Start- und Unterseite lesen beide über die Query-Keys `["first_aid_info"]` und `["first_aid_dates_upcoming"]`.
- Admin-Save in `src/routes/_authenticated/admin.tsx` invalidiert bereits diese Keys.
- Aber: In der DB gibt es aktuell keinen Trigger, der `updated_at` bei UPDATE aktualisiert – die öffentliche Query sortiert jedoch nach `updated_at DESC LIMIT 1`. Sobald irgendwann eine zweite Zeile in `first_aid_info` steht (z. B. weil man den Datensatz einmal löscht/neu anlegt), zeigt die Public-Seite den falschen (älteren) Datensatz.
- Zusätzlich: Der öffentliche Filter `.eq("active", true)` blendet den Datensatz komplett aus, sobald man das Aktiv-Häkchen versehentlich abwählt – das Frontend fällt dann auf den generischen Fallback-Text zurück, was wie „Änderungen greifen nicht" wirkt.

## Änderungen

### 1. DB: `updated_at` automatisch pflegen (Migration)
- Trigger `set_updated_at` (existiert bereits als Funktion) auf `first_aid_info` und `first_aid_dates` für `BEFORE UPDATE` hängen.
- Damit sortiert die Public-Query zuverlässig auf den zuletzt gespeicherten Datensatz.

### 2. Public-Read robuster machen (`src/lib/public-data.functions.ts`)
- `getFirstAidInfo`: `.eq("active", true)` entfernen und stattdessen den zuletzt gespeicherten Datensatz zurückgeben (`order updated_at desc limit 1`). Das Aktiv-Feld im Admin steuert dann nichts Kritisches mehr – es kann nicht mehr passieren, dass die ganze Sektion „verschwindet".
- Zusätzlich `no-store`-Header setzen, damit auch bei Reverse-Proxies immer die aktuelle Version ausgeliefert wird.

### 3. Admin-Form (`src/routes/_authenticated/admin.tsx`)
- Aktiv-Checkbox aus dem Formular entfernen (nicht mehr nötig, verwirrend). Beim Save `active: true` fest setzen.
- Nach erfolgreichem Save zusätzlich `router.invalidate()` aufrufen, damit auch Loader-Caches (SSR-Hydration von `/erste-hilfe-kurs`) beim nächsten Wechsel neu laden.
- Bei den Terminen (`FirstAidDatesAdmin`) gleiches Muster: nach Save/Delete/Toggle `router.invalidate()`.

### 4. Query-Verhalten auf den öffentlichen Seiten
- In `src/routes/index.tsx` und `src/routes/erste-hilfe-kurs.tsx`: den beiden Erste-Hilfe-Queries `staleTime: 0` und `refetchOnMount: "always"` mitgeben, damit ein Wechsel Admin → Startseite garantiert einen frischen Fetch triggert.

## Technisch (kurz)
```text
DB:
  create trigger set_updated_at before update on first_aid_info ...
  create trigger set_updated_at before update on first_aid_dates ...

Code:
  public-data.functions.ts  → getFirstAidInfo ohne active-Filter, no-store
  admin.tsx (FirstAidAdmin) → active-Checkbox raus, router.invalidate()
  admin.tsx (FirstAidDatesAdmin) → router.invalidate() nach Mutationen
  index.tsx / erste-hilfe-kurs.tsx → staleTime:0, refetchOnMount:"always"
```

## Nicht Teil dieses Plans
- Änderungen an Layout, Texten oder Farben der Erste-Hilfe-Sektionen.
- Änderungen an anderen Admin-Tabs (Preise, Team, Anfragen).