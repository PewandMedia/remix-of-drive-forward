## Fix in `src/routes/index.tsx`

### 1. Hero-Video: der letzte sichtbare Button ist Opera's Video-Popout-Overlay (browserseitig injiziert, nicht aus unserem Code)
- Auf das `<video>` zusätzlich native Steuerelemente per CSS blockieren: `[&::-webkit-media-controls]:!hidden`, `[&::-webkit-media-controls-panel]:!hidden`, `[&::-webkit-media-controls-start-playback-button]:!hidden`.
- Statt einer einfachen transparenten Overlay-Schicht das Video **hinter** einem Bild-`<div>` mit `background-image` (Poster) verstecken ist zu invasiv — stattdessen: den `<video>`-Tag selbst mit `pointer-events-none` belassen und eine **echte Klick-Fangschicht** (`absolute inset-0 z-30`) einbauen, die Opera daran hindert, das Video als „Hover-Target" zu erkennen. Zusätzlich `object-position: center` behalten.
- Extra Hardening: `x-webkit-airplay="deny"`, `controls={undefined}` weglassen, und `data-no-fullscreen`.
- Hinweis intern: Opera Popout ist nicht 100% garantiert entfernbar; die Kombination oben unterdrückt es in allen mir bekannten Fällen zuverlässig.

### 2. Sprachen-Strip: Labels vollständig lesbar, nichts mehr abgeschnitten
- Im `LanguageChip` `truncate` **entfernen** und stattdessen `whitespace-normal break-words leading-tight` verwenden, damit „Kurdisch" und „Arabisch" komplett sichtbar sind (bei Bedarf zweizeilig).
- Font-Size auf Mobile leicht verkleinern (`text-[10px] sm:text-sm`), Padding reduzieren (`px-1 py-2`).
- Chips einheitlich `min-h-[72px]` damit die Reihe bei Umbruch weiter symmetrisch bleibt.
- Grid-Gap auf Mobile verkleinern (`gap-1.5 sm:gap-4`) damit mehr Platz für den Text ist.
- Flaggen-Größe auf Mobile ebenfalls minimal reduzieren, sodass die volle Beschriftung sichtbar bleibt ohne die visuelle Wirkung zu verlieren.

Keine weiteren Änderungen.