## Ziel
Bewertungssektion auf der Startseite aufwerten: eine große Featured-Bewertung oben, drei kleinere darunter. Klick auf eine der kleinen tauscht sie mit der oberen. Alle 5 Sterne, mit realistischen KI-Portraits, Vor- und Nachname.

## Umfang
Nur `src/components/site/ReviewsSection.tsx` wird angepasst. Der bestehende Header (Google-Rating, Sterne, CTAs) bleibt unverändert.

## Änderungen

### 1. Vier realistische KI-Portraits generieren
Vier quadratische Portraits (512×512, `fast`, Fotostil, warmes Studiolicht, natürliche Hauttöne, deutsche/vielfältige Gesichter, freundlicher Ausdruck) unter `src/assets/reviews/`:
- `review-1.jpg` — junger Mann, Anfang 20, kurze dunkle Haare
- `review-2.jpg` — junge Frau, Anfang 20, lange braune Haare
- `review-3.jpg` — junger Mann, Mitte 20, Locken
- `review-4.jpg` — junge Frau, Ende 20, blond

### 2. Vier Bewertungen mit vollen Namen (alle 5 Sterne)
Beispielhaft:
- Yusuf Demir — „Von der ersten Theoriestunde bis zur bestandenen Prüfung: super Betreuung..."
- Lea Hoffmann — „Meine Fahrlehrerin war unglaublich geduldig..."
- Daniel Krüger — „Moderne Autos, faire Preise..."
- Marie Schneider — „Ich habe die Fahrschule gewechselt und es war die beste Entscheidung..."

Der erste Eintrag ist initial „Featured".

### 3. Layout
- Neuer `useState`-Index für den Featured-Slot.
- **Featured-Karte oben** (`max-w-3xl`, zentriert): großes rundes Portrait links (h-20 w-20), Name/Zeit/Google-Logo, große Sterne, Zitat in größerer Schrift, Google-Farb-Akzent.
- **Darunter 3 kleinere Karten** in `grid-cols-3` (mobile: 1-spaltig gestapelt oder horizontales Scroll — nutze `grid-cols-1 sm:grid-cols-3`). Karten sind `button`-Elemente mit `onClick={() => setFeaturedIndex(i)}`, Hover-Lift, `aria-label="Bewertung von X hervorheben"`.
- Beim Klick werden Featured und angeklickte Karte getauscht (Index-Swap in State-Array).
- Sanfte Übertragung via bestehender Tailwind-Transitions (keine neue Motion-Lib).

### 4. Sonstiges
- Bestehende `GoogleLogo`/`Stars`-Helper wiederverwenden.
- `ReviewsBadge`-Export unverändert lassen.
- Kein Datenbank- oder Backend-Change.

## Technische Details
- State: `const [order, setOrder] = useState([0,1,2,3])` — `order[0]` = Featured, `order[1..3]` = untere Reihe. Swap-Funktion tauscht Index 0 mit geklicktem Slot.
- Bilder als normale ES6-Imports aus `src/assets/reviews/` (kein `lovable-assets`, damit sie auf dem VPS ohne CDN funktionieren).
