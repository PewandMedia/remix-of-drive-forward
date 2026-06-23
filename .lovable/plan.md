## Hero überarbeiten

In `src/routes/index.tsx` HERO-Section:

1. **Roten Streifen entfernen** — die Zeile `<div className="... bg-primary" />` (der schräge rote Balken über die ganze Breite) komplett löschen. Die dezente primary-Fläche `bg-primary/[0.04]` bleibt als sanfter Hintergrundakzent.

2. **Mercedes spiegeln** — `scale-x-[-1]` auf das `<img>`, damit das Auto in Fahrtrichtung nach links zeigt.

3. **Einfahrt von rechts → links** — neue Keyframe-Animation in `src/styles.css`:
   ```css
   @keyframes drive-in-right {
     0% { transform: translateX(60%) scaleX(-1); opacity: 0; }
     100% { transform: translateX(0) scaleX(-1); opacity: 1; }
   }
   @utility animate-drive-in-right {
     animation: drive-in-right 0.9s cubic-bezier(.2,.7,.2,1) both;
   }
   ```
   Im `<img>` `animate-drive-in-left` durch `animate-drive-in-right` ersetzen. Spiegelung in den Keyframes mitgeführt, damit sie nach Animationsende erhalten bleibt.

4. **Auto größer & beide Spalten nebeneinander** — Bild-Spalte bekommt mehr Gewicht:
   - Grid: `grid-cols-[1fr_1.2fr]` mobil, `lg:grid-cols-[1fr_1.4fr]`.
   - `<img>`: `scale-150 sm:scale-125 lg:scale-110`, Wrapper `-mr-6 sm:-mr-10 lg:-mr-20 xl:-mr-32`.

5. **Text mobil weiter optimiert** (passt zur kleineren Textspalte) — H1 `text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`, Paragraph bleibt klein, Buttons unverändert.

Keine weiteren Sections oder Routen werden angefasst. SEO bleibt wie gehabt (Head/Meta nicht angetastet).