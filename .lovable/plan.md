## Beobachtete Probleme
- Beim Scrollen ruckelt es, besonders auf dem Handy (390×844). Hauptursachen: viele große `blur-3xl`-Ebenen, gleichzeitig animierte `animate-pulse`-Badges, `transition-all`-Hover-Effekte auf vielen Karten, und mehrere `bg-[radial-gradient]`-Layer im Hero/Preise/Reviews-Bereich.
- Ein wiederkehrender Bug: nach Edits springt die Seite "nach oben" / lädt nicht zu Ende. Ursache ist ein veralteter Vite-Modul-Chunk (`Failed to fetch dynamically imported module: …tanstack-start-client-entry`). Das tritt auf, wenn der Router nach einem Hot-Reload nicht sauber neulädt – kann durch einen kleinen Fallback abgefangen werden, der bei Chunk-Load-Fehler automatisch `location.reload()` macht.
- Navbar-Query (`nav-active-offer`) wird auf jeder Route neu ausgeführt, da `staleTime` zwar 60s ist, aber `refetchOnWindowFocus` Default an. Das verursacht beim Tabwechsel kurzes Layout-Shift im Header.

## Was geändert wird

### 1. Visuelle Effekte entschärfen (`src/routes/index.tsx`, `src/components/site/ReviewsSection.tsx`, `src/routes/preise.tsx`)
- Große `blur-3xl`-Hintergründe nur noch auf `lg:block` zeigen – auf Mobile komplett weglassen. Das ist der größte Perf-Gewinn beim Scrollen.
- `animate-pulse` auf den "Aktion läuft"-Badges entfernen (Header + Startseite). Stattdessen statisches rotes Badge – fällt immer noch auf, ohne Continuous-Repaint.
- Auf großen Karten `transition-all` ersetzen durch gezieltes `transition-colors transition-transform` (vermeidet das Re-Layouten auf jeden Stilwechsel).
- Den rotierenden `conic-gradient`-Overlay auf der „featured" Preis-Karte entfernen – sieht hübsch aus, kostet aber ständig Repaint.

### 2. Bilder & Lazy-Loading
- `loading="lazy"` und `decoding="async"` auf Below-the-Fold-Bildern (Team-Avatare, Hero-Mini-Avatare, Location-Karten-Bilder, falls vorhanden) ergänzen.
- Hero-Bild bleibt `eager` + `fetchPriority="high"`.

### 3. Chunk-Reload-Bug abfangen (`src/router.tsx` oder `src/routes/__root.tsx`)
- Globalen `window.addEventListener('error', …)`-Handler für `vite:preloadError` (bzw. Message-Match auf "Failed to fetch dynamically imported module") registrieren, der `window.location.reload()` aufruft. Das ist der offizielle Vite-Workaround und beseitigt das „springt nach oben / weiße Seite"-Verhalten nach Deploys/Edits.

### 4. Navbar-Query stabilisieren (`src/components/site/Navbar.tsx`)
- `refetchOnWindowFocus: false`, `refetchOnMount: false` auf den `nav-active-offer`-Query. Bleibt 60s frisch, Layout-Shift entfällt.

### 5. Kleine Aufräumarbeiten
- `useEffect`-Scroll-Listener im Navbar bekommt `{ passive: true }` (ist schon so – nur prüfen) und einen `requestAnimationFrame`-Throttle, damit `setScrolled` nicht pro Scrollevent neu rendert.

## Bewusst nicht in scope
- Keine Änderung an Inhalten, Layout-Struktur, Farben, Fonts.
- Keine neuen Libraries.
- Kein Umbau auf Image-CDN/`vite-imagetools` (großer Eingriff, separat).
- Keine DB-/Migration-Änderungen.

## Erwartetes Ergebnis
Spürbar flüssigeres Scrollen besonders auf Mobile, kein „Sprung nach oben" mehr nach Code-Updates, ruhigerer Header.
