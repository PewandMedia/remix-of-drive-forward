## Ziel

Nur die Hero-Sektion der Startseite (`src/routes/index.tsx`) überarbeiten. Neues hochgeladenes Cinematic-Video als Full-Bleed-Hintergrund einbinden, einmalig abspielen und weich auf ein Posterbild (letztes Frame) einfrieren. Restliche Website bleibt unverändert.

## Schritte

**1. Video- und Poster-Asset**
- Neues Video via `lovable-assets` CDN hochladen → `src/assets/miro-drive-hero.mp4.asset.json` (ersetzt altes `hero-video.mp4.asset.json`, wird gelöscht).
- Mit `ffmpeg` letztes Frame extrahieren (`-sseof -0.1 -vframes 1`), als JPG optimieren, ebenfalls als CDN-Asset hochladen → `src/assets/miro-drive-hero-poster.jpg.asset.json`.

**2. Neue Hero-Komponente (`src/routes/index.tsx`, Zeilen 103–192)**

Layout:
- `<section>` mit `min-h-[88svh] lg:min-h-[92svh]`, `bg-black`, Text links.
- `<video autoPlay muted playsInline preload="auto" poster={posterUrl}>` (kein `loop`, keine `controls`) mit `onEnded` → State `videoDone=true` setzt `opacity-0` auf `<video>` und blendet `<img>`-Poster (absolut, `object-cover`, opacity-Transition 700ms) darüber, sodass Freeze-Frame nahtlos ist.
- Video-Fade-In: initial `opacity-0`, nach `onLoadedData` → `opacity-100` (Transition 800ms).
- `motion-reduce:hidden` am Video, `motion-reduce:block` am Poster als Fallback.

Overlay:
- Linker Verlauf `bg-gradient-to-r from-black/75 via-black/40 to-transparent` (Auto rechts sichtbar).
- Sehr dezente Vignette `shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]`.
- Nach `videoDone`: einmaliger roter Shimmer-Sweep (CSS-Keyframe `hero-shine`, 1.8s, `animation-fill-mode: forwards`, kein Loop) über einen schmalen diagonalen Streifen.

Text (links, max-w-2xl, gestaffelte `animate-fade-up` mit `animation-delay`):
- Eyebrow: „DEINE MODERNE FAHRSCHULE IN BOCHUM" (uppercase, tracking-widest, weiß/80, mit rotem Strich).
- H1: „Fahrschule Bochum – modern, persönlich und sicher zum Führerschein" (Display, weiß, „modern, persönlich und sicher" in `text-primary italic`).
- Untertext: exakt wie vorgegeben, weiß/85.
- Buttons: primär „Jetzt online anmelden" → `/anmeldung` (bestehende Route; `/online-anmeldung` existiert nicht), sekundär Glas „Kostenlose Beratung" → `/kontakt`, Text-Link „Preise ansehen →" → `/preise`.
- Trust-Zeile: „Klasse B · B197 · Mehrsprachige Beratung · Erste-Hilfe-Kurse" (weiß/70, kleine Check-Icons weggelassen, Punkte als Separator).

Scroll-Hinweis unten mittig: „Mehr entdecken" + `ChevronDown` mit ruhiger `animate-bounce`-Alternative (custom keyframe, 2.4s ease-in-out).

**3. Reduced Motion**
- Bei `prefers-reduced-motion`: `<video>` versteckt, Poster wird sofort angezeigt, keine Fade-/Shimmer-Animationen.

**4. Kleine Detail-Klärung**
- Route `/online-anmeldung` existiert nicht – verwende bestehende `/anmeldung`. Falls du wirklich einen neuen Pfad willst, sag Bescheid, ansonsten bleibt der Link auf `/anmeldung`.

## Nicht-Ziele
- Keine anderen Sektionen ändern, keine neuen Routen, keine Content-/Navi-Änderungen.
- Kein neues npm-Paket.
