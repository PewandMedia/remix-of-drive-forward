## Ziel
Das Hero-Bild soll exakt das echte MIRO-DRIVE-Fahrschulauto zeigen (so wie auf dem Original-Foto, das in `src/assets/miro-car-hero.jpg.asset.json` hinterlegt ist) – aber in höherer Qualität und freigestellt, damit es im Hero nicht mehr klein/pixelig wirkt.

## Umsetzung

### 1. Hochwertige Version des echten Autos erzeugen
- Tool: `imagegen--edit_image`
- Input: das vorhandene Original-Bild über die CDN-URL aus `miro-car-hero.jpg.asset.json` (`/__l5e/assets-v1/9b065a9a-…/miro-car-hero.jpg` → vollständige Lovable-Preview-URL)
- Prompt: „Recreate this exact MIRO-DRIVE driving school car (white Mercedes A-Class with red MIRO-DRIVE branding/decals, red arrow stripe, identical livery and decals) in much higher resolution, photorealistic studio shot, sharp focus, soft contact shadow, 3/4 front angle. Keep the MIRO-DRIVE branding, red arrow design and overall look identical to the reference."
- `transparent_background: true`, Pfad: `src/assets/hero-car.png` (überschreibt die KI-Version aus dem vorherigen Schritt)
- aspect_ratio: 16:9

### 2. Falls die Markierung/Decals nicht überzeugend rekonstruiert werden
- Fallback: das Original-Foto verwenden und einfach im Hero größer/dominanter platzieren (wie bereits in der Layout-Änderung umgesetzt). Dazu Import zurück auf `miro-car-hero.jpg.asset.json` umstellen.

### 3. Hero-Layout bleibt wie aktuell
- Keine Layout-Änderungen nötig – die größeren Spalten, der rote Glow und der schwarze Akzent-Strich bleiben.
- Bild-Größe, `loading="eager"`, `fetchPriority="high"` bleiben.

## Dateien
- **überschrieben**: `src/assets/hero-car.png` (neue, dem Original treue Version)
- ggf. `src/routes/index.tsx` (nur falls Fallback auf Originalbild nötig)

## Nicht im Scope
- Keine weiteren Layout-Änderungen
- Kein neues Auto-Design, kein generisches Mercedes-Bild mehr