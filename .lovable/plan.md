## Diagnose

Die kaputte Team-Seite kommt sehr wahrscheinlich nicht vom CSRF-Hinweis und auch nicht direkt vom WebSocket/Node-Problem. Auf dem Screenshot sieht man ein Layout-Problem: Die Team-Karten/Flip-Karten laufen optisch aus ihrem vorgesehenen Bereich und überdecken den Footer.

Der aktuelle Code nutzt für die Team-Karten eine 3D-Flip-Struktur mit `absolute inset-0`, eigenen CSS-Utilities wie `preserve-3d`, `backface-hidden`, `rotate-y-180` und dynamischen Höhenklassen. Wenn auf dem Debian-Server eine alte Build-Version, ein anderer CSS-Build oder gecachte Assets laufen, können genau diese 3D-/absolute-Styles brechen. Dann werden Kartenflächen, Avatare und Texte nicht mehr im normalen Dokumentfluss gehalten und landen übereinander.

## Lösungsvorschlag

1. **Team-Karten robust neu bauen**
   - Die fehleranfällige 3D-Flip-Card-Struktur entfernen.
   - Normale stabile Karten im Dokumentfluss verwenden, ohne `absolute`, ohne 3D-Transform und ohne Backface-Logik.
   - Avatar, Name, Rolle, Sprachen und Kurztext sichtbar sauber in einer Karte anzeigen.

2. **Grid stabilisieren**
   - Desktop: sauberes 3-/4-Spalten-Grid.
   - Tablet/Mobile: weniger Spalten, damit nichts zusammengedrückt wird.
   - Jede Karte bekommt feste responsive Mindesthöhen und `h-full`, damit Karten gleichmäßig stehen und den Footer nicht überlappen.

3. **Owner-/Chefkarte separat stabil darstellen**
   - Die hervorgehobene Ilkay-Karte bleibt optisch größer, aber ebenfalls ohne absolute/3D-Technik.
   - Dadurch kann sie nicht mehr über andere Karten rutschen.

4. **Footer-Abstand absichern**
   - Unterhalb der Team-Sektionen genug Abstand lassen.
   - Der Footer bleibt erst nach dem kompletten Team-Grid sichtbar.

5. **Alte CSS-Risikostellen entfernen oder ungenutzt lassen**
   - Die speziellen Flip-Utilities werden nicht mehr gebraucht.
   - Dadurch ist die Seite weniger abhängig von CSS-Generierung, Browser-3D-Verhalten und gecachten alten Assets.

## Ergebnis

Nach Umsetzung ist die Team-Seite technisch simpler und stabiler. Selbst wenn dein Debian-Server noch mit Node 20/22, PM2 oder gecachten Assets arbeitet, kann diese konkrete Überlappung nicht mehr durch die Flip-Card-Struktur entstehen.

## Danach auf dem Debian-Server

Nach dem Code-Fix trotzdem einmal frisch bauen und neustarten:

```bash
git pull
npm install
npm run build
pm2 restart all
```

Falls dein Prozess nicht über PM2 läuft, statt `pm2 restart all` deinen systemd-Service oder Startprozess neu starten.