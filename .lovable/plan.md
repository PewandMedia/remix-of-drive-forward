## Ziel
Neues hochgeladenes Video als Hero verwenden und Hero so umbauen, dass Video und Text visuell getrennt sind (Split-Layout: Text links, Video rechts in eigener gerahmter Karte).

## Umsetzung

### 1. Video als CDN-Asset hochladen
- `lovable-assets create --file /mnt/user-uploads/hf_20260718_154751_de96d321-f424-4191-9ab5-3866f4e791fd_1.mp4 --filename miro-drive-hero-v2.mp4 > src/assets/miro-drive-hero-v2.mp4.asset.json`
- Aus dem ersten Frame ein Poster erzeugen (via `ffmpeg` in `/tmp/`, dann `lovable-assets create` als `miro-drive-hero-v2-poster.jpg`).
- Alte Asset-Pointer bleiben unverfügt bestehen (können später manuell gelöscht werden).

### 2. `src/routes/index.tsx` — `HeroSection` neu strukturieren
**Split-Layout** statt Full-Bleed-Video:

- Section-Hintergrund: dunkler Verlauf (`bg-gradient-to-br from-black via-neutral-950 to-black`) mit dezentem Grid/Noise-Overlay — kein Video mehr als Background.
- Container: `grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-14 items-center` innerhalb `max-w-7xl mx-auto`.
- **Linke Spalte (Text)**:
  - Eyebrow, H1, Subtitle, CTAs, Trust-Zeile — bestehende Inhalte übernehmen.
  - Textfarben bleiben auf dunklem Hintergrund lesbar.
- **Rechte Spalte (Video-Karte)**:
  - Wrapper: `relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-primary/25`.
  - Innen: neues Video (autoplay, muted, playsInline, loop), Poster als Fallback.
  - Dekor: Roter Glow-Ring hinter der Karte (`absolute -inset-4 rounded-[2rem] bg-primary/20 blur-3xl`), dezente Diagonale/Gradient-Frame oben.
  - Kleines "Live"-Badge oben links auf der Karte: „MIRO-DRIVE · Bochum".
- **Sprachen-Panel (`LanguagePanel`)**: Bleibt oben rechts absolut positioniert, damit die Position auf dem Video-Rahmen liegt und weiterhin auffällt.
- **Mobile**: Grid kollabiert auf 1 Spalte — Text oben, Video-Karte darunter (nicht mehr als Background). Karte bekommt `aspect-video` für kompakte Höhe.

### 3. Alte Video-Referenzen ersetzen
- Imports `heroVideo` / `heroPoster` auf neue Pointer umstellen.
- Overlays über Video-Background entfernen; nur noch Overlay *innerhalb* der Video-Karte (subtiler unterer Gradient für Badge-Lesbarkeit).

### 4. Verifikation
- Build starten, Preview prüfen (Desktop: Split; Mobile: gestapelt).

Ergebnis: Video wirkt als eigenständiges Cinematic-Element in einer Premium-Karte rechts, klar vom Text-Block getrennt — kein visueller "Verschmelzungseffekt" mehr.
