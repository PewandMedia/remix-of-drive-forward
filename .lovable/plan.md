## Ziel
Das hochgeladene SVG-Logo (`miro-drive-logo.svg`) ersetzt überall das aktuelle PNG-Logo (`miro-logo.png.asset.json`).

## Schritte
1. **Neue Logo-Komponente**
   - `src/components/site/Logo.tsx` anlegen.
   - Der Inhalt ist das hochgeladene SVG als inline React-Komponente (self-contained, da Base64-Bilddaten enthalten sind).
   - Unterstützt `className` und `alt`-Text als Props für Barrierefreiheit.

2. **Referenzen aktualisieren**
   - `src/components/site/Navbar.tsx`
   - `src/components/site/Footer.tsx`
   - `src/routes/index.tsx`
   Überall das alte `import logoAsset from "@/assets/miro-logo.png.asset.json"` entfernen und durch `<Logo className="h-10 w-auto" alt="MIRO-DRIVE" />` ersetzen.

3. **Alten Asset-Pointer aufräumen**
   - `src/assets/miro-logo.png.asset.json` löschen, da keine Verweise mehr bestehen.

4. **Build-Check**
   - `bun run build` ausführen, um sicherzustellen dass alle Imports korrekt aufgelöst werden und keine ungenutzten Imports übrig bleiben.
