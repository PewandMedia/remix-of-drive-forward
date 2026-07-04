## 1. Favicon aus dem Logo-Symbol

Das aktuelle Logo-SVG (`miro-drive-logo.svg`, 573×130) enthält Symbol + Wortmarke. Für das Favicon brauchen wir nur das Symbol quadratisch.

Schritte:
- `imagegen--edit_image` auf das Logo mit Prompt „Extract only the car/emblem symbol, centered, square, transparent background" → `public/favicon.png` (512×512, transparent).
- In `src/routes/__root.tsx` das `<link rel="icon">` auf `/favicon.png` (type `image/png`) umstellen.
- `public/favicon.ico` löschen (Template-Default).

## 2. Neue Untertitel (Meta-Descriptions) je Route

Kürzere, prägnantere Untertitel — jede Seite bekommt einen eigenen Charakter statt fast identischer Formulierungen. Vorschlag pro Seite (wird in `description` + `og:description` gesetzt):

| Route | Neuer Untertitel |
|---|---|
| `/` | Führerschein Klasse B, B197 & B78 in Bochum – moderne Fahrzeuge, faire Preise, persönliche Betreuung. |
| `/leistungen` | Klasse B, B197, B78, Theorie, Sonderfahrten und Erste-Hilfe-Kurs – alles aus einer Hand in Bochum. |
| `/preise` | Klare Paketpreise für Klasse B, B197, B78 und Erste-Hilfe-Kurs – ohne versteckte Kosten. |
| `/team` | Mehrsprachig, geduldig, erfahren – lerne die Fahrlehrer:innen von MIRO-DRIVE persönlich kennen. |
| `/ueber-uns` | Deine Fahrschule in Bochum Zentrum & Riemke – modern ausgestattet, transparent und nah dran. |
| `/kontakt` | WhatsApp, Telefon oder Filiale in Bochum – melde dich in unter einer Minute für den Führerschein an. |
| `/faq` | Antworten zu Anmeldung, Ablauf, Klasse B/B197/B78, Prüfungen und Erste-Hilfe-Kurs in Bochum. |
| `/erste-hilfe-kurs` | Amtlich anerkannter Erste-Hilfe-Kurs in Bochum – regelmäßige Termine, Anmeldung per WhatsApp. |
| `/impressum` | Anbieterkennzeichnung nach § 5 TMG für die Fahrschule MIRO-DRIVE in Bochum. |
| `/datenschutz` | Wie MIRO-DRIVE personenbezogene Daten verarbeitet – transparent nach DSGVO. |

Titel (`<title>`) bleiben unverändert, weil sie SEO-optimiert sind (Keyword „Fahrschule Bochum" vorne).

## Verifikation

- Preview: Favicon erscheint im Browser-Tab.
- `bun run build` grün.
