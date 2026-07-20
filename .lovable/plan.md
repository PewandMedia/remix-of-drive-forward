````text
Ziel: Den aktuellen Preis-Teaser auf der Startseite (/index.tsx) vereinfachen. Statt dunkler Premium-Bühne mit Dot-Grid, diagonalen roten Streifen, Glows, Wasserzeichen und Eck-Winkeln soll ein sauberer, seriöser, weißer Teaser entstehen.

Schritt 1: Sektions-Container vereinfachen
- Hintergrund von bg-slate-950 auf bg-white ändern.
- Alle dekorativen absoluten Elemente entfernen: obere/untere Signal-Linie, Dot-Grid, diagonale rote Streifen, Radial-Glows.
- Padding/Spacing anpassen: py-20 sm:py-24 statt py-24 sm:py-28.

Schritt 2: Header-Bereich clean gestalten
- Label "Preise & Klassen" beibehalten, aber ohne Glas/Backdrop-Effekt.
- Headline auf seriöses Weiß/Slate-900 setzen.
- Subtext kurz und klar: "Gleiche Preise für Klasse B, B197 und B78."
- "Alle Preise ansehen"-Link als dezenter Text-Link mit Pfeil rechts neben der Headline oder darunter.
- Aktions-Badge optional nur anzeigen, wenn eine Aktion läuft.

Schritt 3: Preistafel vereinfachen
- Gradient-Border-Wrapper, Eck-Winkel, Wasserzeichen und innere Kontur entfernen.
- Karte mit weißem Hintergrund, feinem slate-200 Border und leichtem Schatten.
- Header der Karte: "Preisliste 2026 · MIRO-DRIVE Fahrschule Bochum" und Klasse-Zeile.
- Preiszeilen ohne Nummerierung, ohne Hover-Seitenlinie, ohne Dotted-Leader-Overlays.
- Stattdessen klare Zeilen: Label links, Preis rechts, optional alter durchgestrichener Preis + Aktions-Badge.
- Übungsstunde kann als wichtigste Zeile leicht hervorgehoben werden (z. B. fett oder primary-Farbe).

Schritt 4: CTA-Bereich vereinfachen
- Button: "Vollständige Preisliste ansehen" als normale primary Button, ohne extremen Glow-Shadow.
- Vertrauens-Icons darunter optional beibehalten, aber dezent.

Schritt 5: Visuelle Qualität sicherstellen
- Keine hartkodierten Farben; primary-Token nutzen.
- Responsive Verhalten beibehalten (mobile 1 Spalte, Desktop gleiche Breite).
- Keine Änderungen an der Preis-Unterseite /preise.

Abgrenzung: Nur der Preis-Teaser in src/routes/index.tsx wird angefasst. Datenquelle (prices) und Logik (isOfferLive, formatRemaining) bleiben unverändert.
````