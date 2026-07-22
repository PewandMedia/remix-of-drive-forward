## Ziel
Auf der Startseite sollen im Instagram-Bereich **alle aktiven Posts** angezeigt werden — mobil immer in 3er-Reihen untereinander, Desktop in 4er-Reihen. Aktuell werden nur die ersten 3 (mobil) bzw. 4 (Desktop) gezeigt, damit die Reihen „voll" sind. Das wird entfernt.

## Änderungen

### `src/lib/public-data.functions.ts`
- `getActiveInstagramPosts`: Limit von 8 entfernen (bzw. auf z. B. 60 anheben), damit alle aktiven Posts geladen werden.

### `src/components/site/InstagramSection.tsx`
- Slice-/Trim-Logik entfernen, die überzählige Kacheln pro Breakpoint ausblendet.
- Grid bleibt `grid-cols-3 md:grid-cols-4` — dadurch fließen alle Posts automatisch in vollständige 3er- bzw. 4er-Reihen; unvollständige letzte Reihe wird akzeptiert (statt alles auszublenden).
- Keine künstliche Obergrenze mehr; alle im Admin als aktiv markierten Posts erscheinen.

### Nicht Teil dieses Plans
- Admin-Upload-Flow, RLS, Storage-Bucket bleiben unverändert.
- Keine Änderung am Kachel-Design oder Aspect-Ratio.
