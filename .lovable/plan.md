# Bilder auf VPS reparieren

## Ursache

Alle Bilder im Projekt sind über die Lovable-Assets-Integration ausgelagert. Statt echter Dateien liegen im Repo nur `.asset.json`-Pointer, und die Bilder werden zur Laufzeit vom Lovable-CDN unter Pfaden wie `/__l5e/assets-v1/<uuid>/<filename>` geladen.

Auf dem eigenen VPS (`mirodrive.pewandmedia.de`) existiert dieser Lovable-CDN-Routen-Handler nicht — deshalb liefern all diese `/__l5e/...`-URLs 404 aus und die Bilder erscheinen nicht. Betroffen sind u.a.:

- Logo (`src/assets/miro-drive-logo.svg.asset.json`)
- Hero/Emblem (`miro-car-hero.jpg`, `miro-car.png`, `miro-emblem.png`)
- Instagram-Sektion (`src/assets/insta/bestanden-neu-1..4.jpg`)
- Team-Bilder (`src/assets/team/*.jpg|png|webp`)

## Lösung

Alle Assets aus dem Lovable-CDN herunterladen und lokal in den Ordner `public/images/` legen, dann alle Referenzen im Code auf absolute Pfade `/images/<datei>` umstellen. Damit werden die Bilder direkt vom VPS-Webserver ausgeliefert — unabhängig von Lovable-Infrastruktur.

## Umsetzung

1. **Download aller Assets vom Lovable-CDN**
   Für jedes `*.asset.json` im Projekt (`src/assets/**`) die im Pointer hinterlegte `url` per `curl` auf die Preview-Domain abrufen und unter `public/images/<original_filename>` speichern. Kleinschreibung exakt beibehalten (Linux-fs).

   Zu übertragende Dateien:
   - `miro-drive-logo.svg`
   - `miro-car-hero.jpg`, `miro-car.png`, `miro-emblem.png`
   - `insta/bestanden-neu-1.jpg` … `bestanden-neu-4.jpg` → `public/images/insta/…`
   - `team/alan.jpg`, `azad.jpg`, `bahar.jpg`, `birtan.webp`, `burak.jpg`, `dilan.png`, `ilkay.jpg`, `jiyan.jpg`, `lukman.jpg`, `rawshan.jpg`, `renas.jpg` → `public/images/team/…`

2. **Import-Referenzen im Code umstellen**
   In allen Dateien, die `@/assets/....asset.json` importieren, den Import entfernen und stattdessen den absoluten Pfad `/images/<pfad>/<datei>` als String verwenden. Betroffen sind u.a.:
   - `src/components/site/Footer.tsx` (Logo)
   - `src/components/site/Navbar.tsx` (Logo, falls verwendet)
   - `src/components/site/InstagramSection.tsx` (4 Bilder)
   - `src/routes/index.tsx`, `src/routes/team.tsx`, `src/routes/ueber-uns.tsx` u.a. (Hero, Emblem, Team)

   Beispiel:
   ```tsx
   // vorher
   import logoAsset from "@/assets/miro-drive-logo.svg.asset.json";
   <img src={logoAsset.url} />
   // nachher
   <img src="/images/miro-drive-logo.svg" />
   ```

3. **Alte Pointer entfernen**
   Alle `*.asset.json`-Dateien unter `src/assets/**` löschen, damit keine toten Referenzen zurückbleiben.

4. **Build prüfen**
   `bun run build` ausführen und Fehlerfreiheit bestätigen. Anschließend die Preview kurz laden, um sicherzugehen, dass keine Bild-Referenz übersehen wurde.

## Was nicht geändert wird

- Kein Design, keine Texte, keine Layouts, keine Komponenten-Struktur, keine Funktionen.
- Keine Datenbank-, Auth- oder Server-Function-Änderungen.
- Keine Änderungen an `vite.config.ts`.

## Abschlussbericht

Am Ende gebe ich zurück:
- Liste aller kaputten `/__l5e/...`-Pfade (aus den Pointer-Dateien)
- Liste aller geänderten Code-Dateien
- Liste aller neu in `public/images/` abgelegten Bilder
- Build-Status von `bun run build`
