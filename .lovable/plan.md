## Ziel
Erstklassige, moderne Typografie im Apple-Stil – klar, sachlich, hochwertig. Weg von der Serifenschrift, hin zu einer feinen, geometrischen Sans-Serif wie auf apple.com.

## Schriftwahl
Apple nutzt **SF Pro Display / SF Pro Text** – diese sind nicht frei über Google Fonts verfügbar. Beste, lizenzfrei einsetzbare Alternativen, die nahezu identisch wirken:

- **Headlines:** `Inter` (Gewichte 600, 700) mit enger Laufweite (-0.03em) – kommt SF Pro Display am nächsten
- **Body & UI:** `Inter` (Gewichte 400, 500) – derselbe Familienstamm sorgt für ein konsistentes Apple-Gefühl

Alternative falls gewünscht: System-Font-Stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display", ...`) → nutzt auf macOS/iOS automatisch echtes SF Pro.

**Mein Vorschlag:** Kombination beider Ansätze
→ System-Font-Stack zuerst (echtes SF Pro auf Apple-Geräten), Inter als Fallback (Windows/Android/Linux).

## Geplante Änderungen

### 1. `src/routes/__root.tsx`
- Google-Fonts-Link auf nur `Inter` (Gewichte 400, 500, 600, 700) reduzieren
- Playfair Display entfernen

### 2. `src/styles.css`
- `--font-sans`: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif`
- `--font-display`: gleicher Stack (eine einzige Familie für die ganze Seite – Apple-typisch)
- Headlines: `font-weight: 600` (Apple nutzt Semibold, nicht Bold), `letter-spacing: -0.03em` für große Größen, `-0.02em` für mittlere
- Body: `font-weight: 400`, normale Laufweite, leicht erhöhte Zeilenhöhe (1.5)
- `-webkit-font-smoothing: antialiased` und `text-rendering: optimizeLegibility` ergänzen für sauberes Rendering

## Nicht im Scope
Farben, Layout, Hero-Bild, Spacing, Komponenten – nur Schrift.