## Ziel
Der große rote Angebots-Kasten auf der Startseite wird ersatzlos entfernt. Stattdessen wird die darunterliegende Preistafel („Sneak Peek") deutlich spektakulärer inszeniert und übernimmt das Angebot dezent als Highlight – ohne den bisherigen roten Block-Look.

Scope: Nur `src/routes/index.tsx`, Sektion `PREISE TEASER` (Zeilen ~328–492). Keine Änderungen an `/preise`, DB oder Business-Logik.

## Änderungen

### 1. Roten Angebots-Banner entfernen
- Kompletter Block `{hasActiveOffer && (() => { ... })()}` (Zeilen 350–395) inkl. Gradient-Karte `from-primary via-[#c8102e] to-[#7a0010]` wird gelöscht.
- Der kleine „Aktion läuft"-Pill im Header (Zeilen 334–338) bleibt als dezenter Hinweis erhalten.

### 2. Preistafel spektakulärer machen
Umbau der Sneak-Peek-Karte zu einer Premium-Preistafel im Stil einer edlen Speisekarte / Manufaktur-Preisliste:

**Rahmen & Bühne**
- Große Karte mit doppelter Kontur (feine innere Linie + äußere Karte), stärkerer, weicher Schatten `shadow-[0_50px_120px_-40px_rgba(15,23,42,0.45)]`.
- Dezenter Radial-Glow hinter der Karte (warmes Off-White + minimaler roter Schimmer oben rechts) statt roter Fläche.
- Eck-Akzente in Gold-artigem Slate-900 statt Primary, feiner und länger.
- Optional: dünner „Wasserzeichen"-Text „PREISLISTE" hinter der Kopfzeile (opacity ~4%, sehr groß, font-display).

**Header der Tafel**
- Logo bleibt; darüber kleine Zeile „Est. Bochum" o. ä. – NEIN, stattdessen ein Monogramm-Divider (dünne Linie – Punkt – dünne Linie).
- Titel „Klasse B · B197 · B78" wird größer und in Serif-Light, darunter Untertitel „Identische Preise – individuelle Ausbildung".
- Wenn Angebot aktiv: rechts oben in der Karte ein schwebender, kleiner Chip „Aktion aktiv · noch X Tage" (weiß, feine Border, roter Punkt) – deutlich zurückhaltender als der aktuelle rote Block.

**Preiszeilen**
- Nummerierung (01, 02, …) in Serif light, größer.
- Zeilen bekommen dezente Dotted-Leader zwischen Titel und Preis (`border-dotted`-Trick) für klassischen Speisekarten-Look.
- Beim Angebots-Row (Grundbetrag): alter Preis durchgestrichen daneben, neuer Preis in Primary + kleiner Flame-Chip „Aktion" inline neben dem Titel. Kein farbiger Hintergrund für die Zeile.
- Übungsstunde bleibt Primary-Highlight.
- Fade-Maske am unteren Ende beibehalten (Sneak-Peek-Charakter).

**CTA-Bereich**
- Zwei Buttons nebeneinander:
  - Primär (dunkel): „Vollständige Preisliste" → `/preise`.
  - Sekundär (Outline): „Beratung per WhatsApp" → `CONTACT.whatsapp`.
- Trust-Zeile darunter: „Keine versteckten Kosten · Faire Konditionen · Persönliche Beratung" mit Mini-Icons.

### 3. Header der Sektion
- Der Chip „Aktion läuft" bleibt, wird aber als sanfter Outline-Chip (weißer Hintergrund, Primary-Text, kleiner pulsierender Punkt) statt gefülltem Primary umgebaut, damit er zur neuen Ästhetik passt.

## Technische Details
- Datei: `src/routes/index.tsx`.
- Keine neuen Abhängigkeiten, nur Tailwind-Klassen und bereits importierte Lucide-Icons (`Flame`, `Timer`, `ArrowRight`, `MessageCircle`, `CheckCircle2`, `ShieldCheck`).
- Angebots-Detection weiterhin über `isOfferLive` / `formatRemaining` / `hasActiveOffer` (bereits im File vorhanden).
- Keine Änderung an Queries, `getHomePrices`, DB-Schema oder `/preise`-Seite.
