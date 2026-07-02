## Plan

### 1. FAQ-Teaser aus der Startseite entfernen
- **Datei:** `src/routes/index.tsx`
- Den gesamten „FAQ TEASER“-Block (Accordion mit den 3 Fragen) löschen.
- Ungenutzte Imports (`Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`, `HelpCircle`) entfernen, falls sie danach nirgends mehr verwendet werden.
- Die `FAQ_TOP`-Konstante (Zeile 80–84) ebenfalls entfernen.

### 2. Google-Bewertungen nebeneinander auf Mobile anzeigen
- **Datei:** `src/components/site/ReviewsSection.tsx`
- Grid-Layout ändern von `grid-cols-1` auf Mobile zu `grid-cols-2` auf Mobile (`grid-cols-2 sm:grid-cols-3`).
- Padding, Schriftgröße und Abstände innerhalb der Review-Cards für Mobile leicht reduzieren, damit zwei Karten nebeneinander gut lesbar bleiben und die Sektion deutlich kürzer wird (weniger Scrollen).

**Ergebnis:** Die Startseite enthält keinen FAQ-Teaser mehr und die Google-Bewertungen werden auf Handys in zwei Spalten nebeneinander dargestellt.