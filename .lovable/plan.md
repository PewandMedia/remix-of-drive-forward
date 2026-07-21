## Problem
Alle Bilder/Videos nutzen `/__l5e/assets-v1/...` URLs (Lovable CDN). Auf deinem VPS existieren diese Pfade nicht → 404. Die 5 fehlenden Dateien sind:
- `filiale-aussen.jpg`, `theorieraum.jpg`, `empfang.jpg` (Filial-Galerie)
- `miro-drive-hero-v2.mp4` + Poster (Hero-Video)
- `miro-drive-hero.mp4` + Poster (Backup)

## Lösung
Assets vom Lovable-CDN herunterladen und als echte Dateien in `public/media/` ablegen. Dann werden sie vom VPS selbst ausgeliefert.

## Umsetzung (im Build-Modus)

1. **Download**: Alle 7 Dateien vom CDN nach `public/media/` laden
   ```
   public/media/filiale-aussen.jpg
   public/media/theorieraum.jpg
   public/media/empfang.jpg
   public/media/miro-drive-hero-v2.mp4
   public/media/miro-drive-hero-v2-poster.jpg
   public/media/miro-drive-hero.mp4
   public/media/miro-drive-hero-poster.jpg
   ```

2. **`.asset.json` Pointer umschreiben** — jede der 7 JSON-Dateien in `src/assets/` bekommt `"url": "/media/<dateiname>"` statt der `/__l5e/...` URL. Vorteil: keine Änderung an Import-Code nötig, alles funktioniert weiter.

3. **Push nach GitHub** durch Lovable's Auto-Sync.

## Deploy auf VPS (danach)
```bash
cd /pfad/zur/app
git pull
bun install         # oder npm install
bun run build       # oder npm run build
pm2 restart mirodrive
```

Nach dem Deploy sind alle Bilder + das Hero-Video sichtbar wie in der Lovable-Preview.

**Hinweis:** Die MP4s sind ca. 5 MB groß und landen im git-Repo. Das ist ok für ein einmaliges Setup, aber falls du sie später oft änderst, wäre ein separater CDN/S3 sauberer. Für jetzt reicht `public/media/`.

Sag „los" und ich mach das im nächsten Schritt.
