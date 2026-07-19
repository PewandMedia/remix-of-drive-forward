## Ziel
Hero-Sektion auf `/` bekommt einen SEO-optimierten Text mit dem Keyword „MIRO-DRIVE Fahrschule Bochum". Der aktuelle Gedankenstrich in der H1 wird entfernt (sieht optisch schlecht aus).

## Änderungen in `src/routes/index.tsx` (HeroSection, Zeilen 81–97)

### Eyebrow (Zeile 83)
Neu: `MIRO-DRIVE · Fahrschule in Bochum` (Mittelpunkt statt Bindestrich).

### H1 (Zeilen 86–90)
Neu, ohne „–", mit Keyword vorn und Kursiv-Highlight für den Markenteil:
```
MIRO-DRIVE Fahrschule Bochum
für deinen Führerschein Klasse B, B197 & B78
```
(Zweite Zeile in `<span className="italic text-primary">` gehüllt, per `<br className="hidden sm:block" />` optisch getrennt, damit die Struktur ohne Bindestrich klar bleibt.)

### Sub-Copy (Zeilen 92–97)
Neu formuliert, mit relevanten Keywords (Fahrschule Bochum, Führerschein, Klasse B, B197, Erste-Hilfe-Kurs, Bochum Innenstadt/Rathaus/Riemke, Herne) und ohne Gedankenstrich:
> Deine moderne Fahrschule in Bochum. Bei MIRO-DRIVE machst du deinen Führerschein Klasse B, B197 und B78 mit persönlicher Betreuung, modernen Fahrzeugen und flexiblen Fahrstunden in **Bochum Innenstadt**, am **Rathaus Bochum**, in **Bochum Riemke** und Umgebung. Anmeldung, Theorie und Erste-Hilfe-Kurs aus einer Hand.

## Nicht Teil des Plans
- Kein Umbau von Layout, Buttons, Video-Karte, Trust-Zeile.
- Keine Änderung an `head()`-Meta-Tags (bereits SEO-tauglich).
- Keine Änderungen an anderen Seiten.
