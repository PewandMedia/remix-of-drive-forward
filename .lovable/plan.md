## Ziel
Auf der Startseite (`/`) soll nach dem Preis-Teaser ein neuer Bereich erklären, welche Unterlagen für den Führerscheinantrag nötig sind, und dass MIRO-DRIVE den kompletten Service inklusive Einreichung beim Straßenverkehrsamt für Bochum und Herne übernimmt.

## Wo eingebaut
- Datei: `src/routes/index.tsx`
- Position: direkt nach dem Preis-Teaser (endet aktuell bei Zeile 437) und vor dem Erste-Hilfe-Kurs-Teaser (beginnt aktuell bei Zeile 439).

## Inhaltliche Struktur
1. **Eyebrow:** „Führerscheinantrag“ in `text-primary`.
2. **Headline:** z. B. „So einfach ist die Anmeldung.“
3. **Subtext:** Kurzer Satz, dass wir die nötigen Unterlagen kennen und alles übernehmen.
4. **Dokumenten-Checkliste** als 3 Karten/Items:
   - Biometrisches Passbild
   - Sehtest
   - Erste-Hilfe-Nachweis
5. **Service-Promise-Box:** „Wir übernehmen den kompletten Service und reichen die Antragsunterlagen für dich beim Straßenverkehrsamt ein – sowohl in Bochum als auch in Herne.“
6. **CTA:** Button „Jetzt online anmelden“ → `/anmeldung` (optional sekundärer WhatsApp-Link).

## Design
- Bestehende Design-Sprache beibehalten: `max-w-7xl`, `rounded-2xl/rounded-3xl`, Karten mit leichtem Schatten/Rand.
- Icons aus dem bereits importierten `lucide-react`-Set verwenden (z. B. `User`, `Eye`, `Heart`, `FileText`, `ShieldCheck`).
- Keine neuen Farben oder hartkodierte Werte verwenden, nur Tailwind-Design-Tokens (`primary`, `muted`, `foreground`, etc.).
- Auf Mobile 1-spaltig, auf Desktop 3-spaltige Checkliste + darunter die Service-Promise-Box.

## Technische Schritte
1. `src/routes/index.tsx`: Import der benötigten Lucide-Icons ergänzen (falls noch nicht vorhanden).
2. Neue Sektion als JSX-Komponente inline einfügen oder als kleine lokale Hilfskomponente oberhalb der `Index`-Komponente definieren.
3. Sicherstellen, dass keine neuen Datenbankabfragen nötig sind (reiner statischer Inhalt).
4. Build prüfen.

## Verifikation
- `bun run build` läuft ohne Fehler.
- Visueller Check im Preview: neuer Abschnitt erscheint nach Preisen, Inhalt vollständig und responsive.

## Nicht im Scope
- Keine neue Route.
- Keine Datenbank- oder Admin-Änderungen.
- Keine Änderungen an `/preise` oder anderen Seiten.