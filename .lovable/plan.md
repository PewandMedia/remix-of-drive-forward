Auf der Preislisten-Unterseite `/preise` soll das MIRO-DRIVE Logo im Hero-Bereich nur auf der Mobile-Ansicht entfernt werden. Auf Desktop und Tablet soll es weiterhin sichtbar bleiben.

**Vorgehen**
- Datei: `src/routes/preise.tsx`
- Das Logo wird in Zeile 155-159 als `<img>` gerendert.
- Am Logo-Element wird die Utility-Klasse `hidden sm:block` (bzw. `hidden sm:inline` je nach aktuellem Display) ergänzt, sodass es auf Bildschirmen unter `sm` (Mobile) ausgeblendet wird und ab `sm` wieder erscheint.
- Keine weiteren Änderungen an Inhalt, Layout oder Styling der Seite.

**Technische Details**
- Tailwind-CSS responsive Modifier: `hidden sm:block`
- Betroffene Datei: `src/routes/preise.tsx`
- Nach der Änderung erfolgt ein Build-Check, um sicherzustellen, dass keine Syntaxfehler entstehen.