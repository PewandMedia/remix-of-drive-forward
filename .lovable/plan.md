## Ziel
Die Headlines (H1–H3 und große Überschriften) sollen erstklassig und qualitativ wirken:
- Kein `uppercase` mehr bei Hauptüberschriften – stattdessen normal geschriebener Text (Sentence Case / Title Case)
- Deutlich größere Schriftgrößen für mehr Präsenz
- Roter Hover-/Glow-Effekt auf Überschriften als edles Detail
- Alle kleinen Labels/Tags dürfen `uppercase` behalten (die sind als dekorative Eyecatcher gut)

## Scope
Alle Seiten-Routen und wiederverwendbare Komponenten mit sichtbaren Headlines.

### 1. Globale Stile (`src/styles.css`)
- `@utility headline-glow` anlegen: Roter Text-Schatten + sanfter Farbübergang auf Hover, der bei Mausberührung einen leuchtenden Glow erzeugt
- H1/H2/H3 im `@layer base` vergrößern (z. B. H1 von `text-4xl/5xl/6xl` auf `text-5xl/6xl/7xl`, H2 von `text-3xl/4xl/5xl` auf `text-4xl/5xl/6xl`)
- `text-transform: uppercase` aus den globalen `h1, h2, h3`-Regeln entfernen

### 2. Startseite (`src/routes/index.tsx`)
- Hero-H1: `uppercase` entfernen, Schriftgröße hochschrauben
- Alle Sektions-H2s: `uppercase` entfernen, ggf. vergrößern
- Preis- und Angebotskarten: `uppercase` bei H3 entfernen

### 3. Weitere Routen (sequentielle Bearbeitung)
- `preise.tsx`, `angebote.tsx`, `erste-hilfe-kurs.tsx`, `kontakt.tsx`, `faq.tsx`, `leistungen.tsx`, `team.tsx`, `ueber-uns.tsx`, `impressum.tsx`, `datenschutz.tsx`, `auth.tsx`
- Jeweils Hauptüberschriften (`h1`/`h2`) von `uppercase` befreien und mit der globalen Utility verknüpfen

### 4. Wiederverwendbare Komponenten
- `SiteLayout.tsx`: Page-Title H1 ohne `uppercase`
- `OfferFlyer.tsx`: Headline ohne `uppercase`
- `LocationCard.tsx`: Headline ohne `uppercase`
- `Footer.tsx`: Footer-Headlines bleiben klein; bei Bedarf anpassen

### 5. Hover/Glow-Anwendung
- Die neue `headline-glow`-Utility wird auf alle großen Überschriften (`h1`, `h2`, wichtige `h3`) angewendet
- Effekt: Beim Hover leuchtet der Text leicht in der Brand-Farbe (`--primary`) auf mit einem weichen Schatten/Glow

## Nicht im Scope
- Buttons, kleine Tags/Labels (die bleiben `uppercase`, wenn sie das gerade sind)
- Farbschema oder Layout-Änderungen außerhalb der Headlines
- Neue Bilder oder Inhalte