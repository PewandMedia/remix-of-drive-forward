## Bewertungs-Sektion mobil lesbar machen

Aktuell wurde das Desktop-Layout (3 Spalten nebeneinander, Bild links neben Text) 1:1 auf mobil gezwungen. Auf 393px Breite wird dadurch der Text winzig und abgeschnitten – genau wie im Screenshot zu sehen.

### Änderungen in `src/components/site/ReviewsSection.tsx`

**Featured-Karte (oben):**
- Mobil: Bild zentriert oben, Text darunter (stacked), große lesbare Schrift
- Ab `md:`: horizontal (Bild links, Text rechts) wie im Referenzbild

**Drei Karten darunter:**
- Mobil: 1 Spalte untereinander mit voller Breite und normaler Schriftgröße (lesbar)
- Ab `sm:`: 3 Spalten nebeneinander

**Textgrößen & Padding:**
- Featured-Zitat: `text-xl` mobil → `md:text-2xl`
- Karten-Padding: `p-5` mobil → `md:p-6`
- Kartentext: `text-sm` mobil (statt gequetschtes text-xs)

So bleibt der Desktop-Look erhalten, aber mobil ist alles vollständig lesbar wie im Referenzbild.
