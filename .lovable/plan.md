## Ziel
Auf `/kontakt` sollen die direkten Kontaktmöglichkeiten (WhatsApp, Telefon, E-Mail, Instagram, TikTok) sofort oben sichtbar sein – nicht erst nach dem Filialen-Block ganz unten.

## Änderungen in `src/routes/kontakt.tsx`

1. **Kontakt-Grid nach oben verschieben**
   - Der aktuelle 5-Karten-Grid (WhatsApp, Telefon, E-Mail, Instagram, TikTok) wird direkt unter den `PageHero` gezogen, noch vor dem Anmeldungs-Tipp-Banner und den `LocationCard`s.
   - WhatsApp bekommt visuelles Gewicht (größere Karte / volle Breite auf Mobil), damit die Haupt-Aktion sofort ins Auge fällt.

2. **Layout-Feinschliff**
   - Mobil: WhatsApp + Telefon groß und prominent oben (2 Karten volle Breite bzw. 1-spaltig gestapelt), danach E-Mail/Instagram/TikTok kompakter.
   - Desktop: 5-spaltiges Grid bleibt, aber mit klarer Hierarchie (WhatsApp hebt sich hervor).
   - Konsistente Semantic-Tokens statt hartkodierter Farben, wo möglich (bestehende Marken-Farben wie WhatsApp-Grün bleiben).

3. **Reihenfolge auf der Seite danach**
   1. Hero
   2. Direkt-Kontakt-Karten (neu oben)
   3. Anmeldungs-Tipp-Banner
   4. Filial-Karten (`LocationCard`)
   5. `FilialeGallery`

## Nicht geändert
- Keine Business-Logik, keine Daten, keine anderen Seiten.
- `WhatsAppFloat` bleibt unverändert.
