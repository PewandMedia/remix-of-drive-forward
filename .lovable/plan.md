## Änderung: Team-Seite Layout-Restrukturierung

### Ziel
Ilkay (Inhaber & Fahrlehrer) soll prominent über allen anderen Teammitgliedern stehen. Die übrigen Fahrlehrer:innen kommen in einem Grid nebeneinander darunter. Ilkays Karte soll etwas größer sein als die anderen.

### Umsetzung
1. **Datenaufbereitung in `src/routes/team.tsx`**
   - Aus der `instructors`-Liste Ilkay (anhand von `sort_order === 0` oder Name-Check) separat herausfiltern.
   - Die verbleibenden Instruktoren als `otherInstructors` behandeln.

2. **Featured-Karte für Ilkay**
   - Eigenes Layout: zentriert, breiter als die Standardkarten (z. B. `max-w-md` oder `max-w-lg`).
   - Größerer Avatar (`h-40 w-40` statt `h-32 w-32`).
   - Größere Schrift für Name und Rolle.
   - Evtl. zusätzliches Styling (z. B. leichterer Rahmen oder Schatten) um ihn als Inhaber zu kennzeichnen.

3. **Grid für die übrigen Instruktoren**
   - `otherInstructors` im bestehenden `renderGroup`-Grid rendern.
   - `xl:grid-cols-4` beibehalten.

4. **Bürokräfte-Sektion**
   - Unverändert bleiben, wird unter dem Instruktoren-Grid angezeigt.

### Technische Details
- Datei: `src/routes/team.tsx`
- Keine Backend-Änderungen nötig (Sortierung via `sort_order` in Supabase).
- Keine neuen Abhängigkeiten.

### Nicht im Scope
- Keine Änderungen an Farben, Schriftarten oder Animationen (Headlines bleiben wie aktuell).
- Keine Änderungen an der Bürokräfte-Sektion.