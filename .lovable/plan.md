## Ziel
Die Team-Karten sollen sich beim Klick mit einem coolen 3D-Flip-Effekt umdrehen und auf der Rückseite einen persönlichen Text des jeweiligen Team-Mitglieds zeigen (z. B. „Entspannter Fahrlehrer, der dich sicher zur Prüfung bringt"). Diese Texte müssen im Admin-Panel bearbeitbar sein.

## Änderungen

### 1. Datenbank
- Neue Spalte `bio` (text, nullable) in `team_members` hinzufügen.
- Vorhandene `description`-Spalte bleibt für Sprachen unverändert.

### 2. Team-Seite (`src/routes/team.tsx`)
- Karten in eine neue Komponente `FlipCard` auslagern.
- 3D-Flip: `perspective` + `transform-style: preserve-3d` + `rotate-y-180` beim Klick.
- Vorderseite: aktuelles Design (Avatar, Name, Rolle, Sprachen).
- Rückseite: gleicher Rahmen, dunkler roter Gradient-Hintergrund, weißer Bio-Text zentriert, kleiner „Zurück"-Hinweis.
- Wenn kein Bio-Text vorhanden ist: dezenter Platzhalter („Bald mehr über {Name}").
- Kleiner Rotations-Icon-Indikator (unten rechts) signalisiert Klickbarkeit; sanfte Hover-Animation.
- Owner-Karte (Ilkay) bekommt denselben Flip-Effekt in ihrer größeren Variante.

### 3. Admin-Panel (`src/routes/_authenticated/admin.tsx`)
- Im Team-Tab pro Mitglied ein neues Textarea-Feld „Bio (Rückseite der Karte)" hinzufügen.
- Speichern über die bestehende Update-Mutation, ergänzt um das `bio`-Feld.

### 4. CSS (`src/styles.css`)
- Utility-Klassen für Flip: `.perspective`, `.preserve-3d`, `.backface-hidden`, `.rotate-y-180`.

## Technische Details
- SQL-Migration: `ALTER TABLE public.team_members ADD COLUMN bio text;`
- Typen werden automatisch neu generiert.
- Flip-State pro Karte via `useState<boolean>`; Klick togglet, Tastatur (Enter/Space) ebenfalls unterstützt für Accessibility (`role="button"`, `tabIndex={0}`).
- Keine Änderung an Sortierung, Filialen oder anderen Team-Feldern.

## Ergebnis
Jede Team-Karte lässt sich mit einem eleganten 3D-Flip umdrehen und zeigt einen persönlichen Text. Ilkay und alle anderen können ihren Text jederzeit selbst über das Admin-Panel pflegen.