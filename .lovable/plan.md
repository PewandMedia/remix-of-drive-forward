Problem: Auf Desktop wird das Hero-Video in einer hohen Portrait-Karte (`lg:aspect-[4/5]`) mit `object-cover` dargestellt. Dadurch wird das 16:9-Video an den Seiten abgeschnitten (vorderer Teil des Autos fehlt) und wirkt durch die dunkle Overlay-Fläche weniger hochwertig. Auf Mobilgeräten ist das Video im Querformat (`aspect-video`) perfekt.

Lösung: Das Video auf Desktop in eine breitere Querformat-Karte bringen, das volle Bild sichtbar machen und die Wiedergabe heller/sauberer wirken lassen. Die Mobilansicht bleibt exakt so wie jetzt.

Geplante Änderungen in `src/routes/index.tsx` (`HeroSection`):

1. **Desktop-Seitenverhältnis des Video-Containers ändern**
   - Ersetze `lg:aspect-[4/5]` durch `lg:aspect-video` (16:9).
   - Passe das Grid leicht an, damit die Video-Karte auf Desktop genug Breite hat, z. B. `lg:grid-cols-[1fr_1.1fr]` statt `lg:grid-cols-[1.1fr_1fr]`.
   - Behalte `aspect-video` für alle kleineren Breakpoints bei, damit Mobil nicht verändert wird.

2. **Video sichtbarer & schärfer positionieren**
   - `object-cover object-center` beibehalten.
   - Durch das passende Seitenverhältnis wird das gesamte Auto ohne seitlichen Schnitt zu sehen sein.

3. **Overlay auf Desktop aufhellen**
   - Der aktuelle Gradient `from-black/50 via-transparent to-black/10` dunkelt das Video stark ab.
   - Auf Desktop (`lg:`) wird der Gradient reduziert, z. B. nur noch ein dezenter unterer Verlauf (`from-black/20 via-transparent to-transparent`), damit das Video heller und hochwertiger wirkt.
   - Auf Mobil bleibt der Kontrast für die eingeblendeten Badges erhalten.

4. **Validierung**
   - `bun run build` ausführen.
   - Desktop-Screenshot (1440 px) der Startseite erstellen und prüfen, dass das Auto komplett sichtbar ist und die Karte nicht mehr „abgehakt" wirkt.
   - Optional: Screenshot in Mobilansicht erstellen, um zu bestätigen, dass sich dort nichts verändert hat.

Hinweis: Ich lasse das Video rechts neben dem Text. Falls du es auf Desktop lieber als großes, durchgehendes Banner unter dem Text haben möchtest, sag kurz Bescheid – dann passe ich den Plan an.