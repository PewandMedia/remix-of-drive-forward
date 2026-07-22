## Ziel
Die Fotos der Filial-Galerie (Rathaus, Riemke Markt, Unsere Autos) sind aktuell fest in `src/components/site/FilialeGallery.tsx` codiert. Der Admin soll diese Bilder im Admin-Panel selbst hochladen, bearbeiten (Caption, Reihenfolge) und löschen können.

## Umsetzung

### 1. Datenbank
Neue Tabelle `filiale_photos`:
- `filiale_id` (Text: `rathaus`, `riemke`, `autos`)
- `image_url` (Text, signierte URL aus Storage)
- `caption`, `kicker`, `alt` (Text)
- `sort_order` (Integer)
- `active` (Boolean, Default true)

RLS: öffentliches Lesen (aktive), Admin-Schreibrechte über `has_role`.

Seed mit den aktuellen 10 Bildern aus `FilialeGallery.tsx`.

### 2. Storage
Neuer privater Bucket `filiale` (analog zu `team`/`instagram`), mit Policies für Admin-Upload und öffentliches Lesen via signierte URLs (10 Jahre).

### 3. Server-Funktionen
- `getFilialePhotos()` in `src/lib/public-data.functions.ts` – öffentliches Fetching für SSR.
- CRUD-Funktionen in neuer Datei `src/lib/filiale-photos.functions.ts` mit `requireSupabaseAuth`: create, update, delete.

### 4. Frontend
`FilialeGallery.tsx` lädt die Bilder per TanStack Query (`getFilialePhotos`) und mergt sie mit den festen Filial-Stammdaten (Name/Adresse/Icon bleiben statisch). Fällt auf die aktuellen Default-Bilder zurück, falls DB leer.

### 5. Admin-Panel
Neuer Tab „Filial-Galerie" in `src/routes/_authenticated/admin.tsx`:
- Umschalter Rathaus / Riemke / Autos.
- Grid der Bilder mit Vorschau, Caption, Kicker, Reihenfolge.
- „Bild hinzufügen"-Dialog: Datei-Upload (kein URL-Feld), Kicker, Caption, Alt-Text.
- Bearbeiten & Löschen pro Kachel.
- Query invalidiert nach jeder Aktion → Live-Seite aktualisiert sofort.

## Ergebnis
Alle Filial-Fotos (inkl. Autos) sind zentral im Admin-Panel verwaltbar; hochgeladene Bilder erscheinen sofort in der Galerie auf der Startseite.
