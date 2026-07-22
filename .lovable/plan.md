## Ziel
Im Admin-Panel beim Anlegen/Bearbeiten eines Fahrlehrers (TeamDialog):
1. Feld „Bio (Rückseite der Karte)" komplett entfernen.
2. Feld „Bild-URL" durch einen Datei-Upload ersetzen (Bild oder PDF), analog zum Instagram-Dialog.

## Änderungen

### Neuer Storage-Bucket `team`
- Privater Bucket (wie `instagram`), Admin-Uploads, öffentlicher Lesezugriff via signierter Langzeit-URL.
- RLS-Policies auf `storage.objects`:
  - `SELECT` für `anon`/`authenticated` (Bilder werden öffentlich auf der Team-Seite gezeigt).
  - `INSERT`/`UPDATE`/`DELETE` nur für Admins (`public.has_role(auth.uid(),'admin')`).

### `src/routes/_authenticated/admin.tsx` – `TeamDialog`
- Bio-Textarea (Label + `Textarea name="bio"`) entfernen.
- `bio` aus dem `row`-Objekt der Mutation entfernen (Spalte bleibt in der DB unangetastet).
- Bild-URL-Input entfernen, ersetzen durch:
  - `<Input type="file" accept="image/*,application/pdf" onChange={onFileChange} />` mit Upload in Bucket `team`, danach 10-Jahre-Signed-URL, gespeichert in `team_members.image_url`.
  - Vorschau: Bild bei `image/*`, sonst Datei-Icon + Dateiname bei PDF.
  - `uploading`-State deaktiviert den Speichern-Button.
- Kein URL-Eingabefeld mehr — Upload ist die einzige Quelle.

### Nicht Teil des Plans
- Datenbank-Spalte `bio` bleibt erhalten (nur UI-Feld entfernt) — kein Datenverlust.
- Instagram-Dialog, andere Bereiche unverändert.
- Anzeige der Team-Karten auf `/team` und Startseite unverändert (nutzt weiterhin `image_url`).
