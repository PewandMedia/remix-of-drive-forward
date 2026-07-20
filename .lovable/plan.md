## Ziel
Auf der Startseite den WhatsApp-Beratungs-Button aus dem Preis-Teaser entfernen und die Preistafel selbst zu einem "2027-Style" Wow-Moment umbauen: dunkle Bühne mit roten Signal-Akzenten, präzise Typografie, feines Grafik-Muster, aber weiterhin seriös.

Scope: Nur die Sektion `PREISE TEASER` in `src/routes/index.tsx` (ca. Zeilen 328–525). Keine Änderungen an `/preise`, DB, Business-Logik oder anderen Sektionen.

## Änderungen

### 1. WhatsApp-Beratung entfernen
- `<a href={CONTACT.whatsapp}>… Beratung per WhatsApp</a>` (Zeilen 497–504) inkl. umschließendem Flex-Container komplett löschen.
- Der Primär-Button „Vollständige Preisliste" → `/preise` bleibt als einzige CTA, zentriert und etwas prominenter.
- `MessageCircle` Icon bleibt weiterhin in der Trust-Zeile („Persönliche Beratung") und darf nicht aus den Imports entfernt werden.

### 2. Preistafel: Redesign auf „Premium-Bühne"
Von „hell + weiß" zu einer edlen, kontrastreichen Inszenierung mit Rot-Akzenten.

**Sektions-Hintergrund**
- Neue Hintergrund-Bühne: sehr dunkles Slate/Ink (`bg-slate-950`) über die volle Sektionsbreite, mit:
  - Dezentem Grid-/Dot-Muster (SVG-Pattern oder existierendes `hero-dot-grid` in gedämpfter Weiß-Opacity),
  - Zwei Radial-Glows: warmer Rot-Glow oben links, tiefer Slate-Glow unten rechts,
  - Diagonalen roten Signal-Streifen (dünn, ~1px, wiederholend, sehr niedrige Opacity) als grafisches Muster,
  - Ganz oben feine, harte 1px-Linie in `primary/40`, um die Sektion abzugrenzen.
- Sektions-Header (Titel „Faire Preise. Klar aufgelistet.", Chip, „Alle Preise ansehen") komplett auf Hell-auf-Dunkel invertiert.

**Karte selbst**
- Karten-Hintergrund bleibt „Papier"-Off-White (`#F7F5F2`), aber eingebettet in die dunkle Bühne → hoher Kontrast, wirkt wie ein Dokument auf einer Bühne.
- Karte bekommt:
  - Zwei sichtbare Layer: äußerer schmaler Rot-Rahmen (`ring-1 ring-primary/30` + `p-[2px]` Gradient-Border von `primary` → `slate-900`),
  - Innere Karte mit doppelter Kontur wie bisher, plus dezentem Rasterlinien-Muster (repeat linear-gradient, 24px, `slate-900/[0.025]`) statt reinem Weiß.
- Eck-Akzente werden zu roten L-Winkeln (`border-primary`), länger (h-16 w-16) und schärfer.
- Wasserzeichen „PREISE" wird ersetzt durch groß gesetztes „MIRO-DRIVE" (font-display, extra-light, letter-spacing weit) in `slate-900/[0.04]` — bewusst ein Marken-Statement.
- Neuer Kopfbereich: statt Logo + Text-Divider → kompakte „Ticket-Kopfzeile":
  - Links: kleine rote vertikale Signal-Leiste + Label „PREISLISTE 2026" (uppercase, tracking-widest),
  - Mitte/Rechts: Serifen-freie Headline „Klasse B · B197 · B78" mit dünnem Untertitel,
  - Rechts: Aktions-Chip (falls Angebot aktiv) — bleibt, aber mit rotem Rand statt neutralem Grau.
- Zwischen Header und Preiszeilen: doppelte Trennlinie (dick + dünn) mit rotem Punkt in der Mitte („Manufaktur-Feel").

**Preiszeilen**
- Nummerierung `01` … in roter Farbe (`text-primary`), tabular-nums, größer, mit dezentem `after:` roter Punkt.
- Hover-Effekt pro Zeile: linke rote 2px-Border-Left slidet ein (`hover:border-l-2 hover:border-primary` mit Transition, Padding-Ausgleich).
- Dotted-Leader in `slate-300`, aber mit Farbverlauf zur Mitte hin.
- Preise: Standardpreise in `slate-900`, Highlight (Übungsstunde) in Slate mit rotem Unterstrich, Aktions-Preise in `primary` + kleine Flame-Chip inline (bleibt).
- Fade-Maske am Ende bleibt, aber weicher (75%).

**CTA-Bereich**
- Nur noch ein zentraler Primär-Button „Vollständige Preisliste ansehen" → `/preise`.
  - Style: `bg-primary text-white`, `rounded-full`, größer (`px-9 py-4`, `text-base`), mit sanftem Rot-Glow-Shadow (`shadow-[0_20px_50px_-15px_rgba(200,16,46,0.5)]`).
  - Hover: leichter Lift + intensiverer Glow, Pfeil animiert nach rechts.
- Trust-Zeile bleibt unter dem Button (3 Icons + Punkte-Trenner, keine Änderung am Wording).

### 3. Sektions-Header (über der Karte)
- Auf dunklem Hintergrund: Chip „Preise & Klassen" wird `text-primary`, `bg-white/5`, `border-primary/30`.
- Aktions-Chip „Aktion läuft" mit rotem Rand + weißem Text auf transparentem Hintergrund.
- Headline `text-white`, Subtext `text-white/60`.
- „Alle Preise ansehen" Link: `text-primary`, hover underline bleibt.

## Technische Details
- Datei: `src/routes/index.tsx`.
- Keine neuen Dependencies. Alle Effekte via Tailwind-Utilities, inline `style` für Radial-/Pattern-Gradients, ggf. ein winziges SVG-Muster als data-URL.
- `CONTACT` Import darf drin bleiben (wird an anderer Stelle verwendet), `MessageCircle` bleibt für die Trust-Zeile.
- Angebots-Detection (`isOfferLive`, `formatRemaining`, `hasActiveOffer`) unverändert.
- Keine Änderungen an Queries, `getHomePrices`, DB-Schema, `/preise`-Seite oder anderen Sektionen der Startseite.
