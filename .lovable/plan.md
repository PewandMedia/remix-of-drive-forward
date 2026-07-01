Ziel
Auf der /leistungen-Seite sollen die 8 Service-Karten (Führerschein Klasse B, B197, Theorie, etc.) auch auf Mobile in 2 Spalten nebeneinander stehen, damit der Nutzer weniger scrollen muss.

Änderung
In `src/routes/leistungen.tsx`:
- Das Grid der Service-Karten von `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` auf `grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4` ändern.
- Optional: Padding/Abstände innerhalb der Karten leicht reduzieren (z. B. `p-4` statt `p-6`), damit bei halber Bildschirmbreite der Text nicht zu eng wird.
- Keine inhaltlichen oder funktionalen Änderungen.

Zeitaufwand: < 5 Minuten.