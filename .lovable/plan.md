Ziel: Den Team-Teaser auf der Startseite so umbauen, dass er der Team-Seite entspricht – Ilkay als große, zentrierte Karte oben, die anderen Fahrlehrer:innen in einer 3er-Reihe darunter. Das soll auch auf Mobilgeräten sauber aussehen.

### Technische Umsetzung

1. **Datenbasis erweitern**
   - `src/lib/public-data.functions.ts`: `getTeamPreview` um `description` und `sort_order` erweitern und das `.limit(4)` entfernen, damit die Startseite den Inhaber erkennen und die Sprachen anzeigen kann.

2. **Wiederverwendbare Team-Karte**
   - `Avatar`, `renderLanguages` und `TeamCard` aus `src/routes/team.tsx` in eine neue Komponente `src/components/site/TeamCard.tsx` auslagern.
   - Beide Routen (`/team` und Startseite) nutzen dieselbe Karte, damit Layout und Stil identisch bleiben.

3. **Startseite: Team-Teaser umbauen**
   - In `src/routes/index.tsx` den bisherigen einfachen 2/4-spaltigen Grid ersetzen.
   - Fahrlehrer:innen filtern (`sort_order < 8`).
   - Inhaber anhand des Namens (`ilkay`) finden und zentriert als große Karte (`size="lg"`) oben rendern.
   - Verbleibende Fahrlehrer:innen in einer 3er-Reihe darunter anzeigen – mobil als `grid-cols-3` mit kompakteren Karten, auf größeren Screens mit mehr Abstand und größeren Karten.
   - Sprach-Tags und Rollen wie auf der Team-Seite anzeigen.

4. **Team-Seite aufräumen**
   - `src/routes/team.tsx` importiert die neue `TeamCard`-Komponente und entfernt die lokale Duplikation.

5. **Design-Token-Korrektur**
   - Hardcoded Farbverlauf `to-[#7a0a14]` im Avatar-Fallback durch semantische Primary-Tokens ersetzen.

6. **Validierung**
   - Build prüfen.
   - Preview auf Desktop und Mobile vergleichen: Ilkay groß und zentriert oben, Rest in 3er-Reihe, keine überlappenden Texte.