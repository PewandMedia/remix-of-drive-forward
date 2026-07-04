## Plan: Vite-Hosting-Fehler beheben

Ich ändere ausschließlich die bestehende Vite-Konfiguration, damit `mirodrive.pewandmedia.de` auf deinem VPS nicht mehr blockiert wird.

### Geplante Änderung

1. **Nur `vite.config.ts` prüfen und anpassen**
   - Keine neue Config-Datei erstellen, weil `vite.config.ts` bereits existiert.
   - Bestehende `vite.server`-Konfiguration sauber zusammenführen, nicht doppelt anlegen.

2. **`server` ergänzen/setzen**
   - `host: "0.0.0.0"`
   - `port: 8082`
   - `allowedHosts` mit:
     - `"mirodrive.pewandmedia.de"`
     - `"www.mirodrive.pewandmedia.de"`
   - Bestehende sinnvolle Host-Einträge wie `.pewandmedia.de` und `.lovable.app` nicht entfernen, falls sie bereits vorhanden sind.

3. **`preview` ergänzen/setzen**
   - `host: "0.0.0.0"`
   - `port: 8082`
   - `allowedHosts` mit:
     - `"mirodrive.pewandmedia.de"`
     - `"www.mirodrive.pewandmedia.de"`
   - Auch hier keine doppelten Blöcke erzeugen.

4. **Keine anderen Dateien ändern**
   - Kein Design ändern.
   - Keine Texte ändern.
   - Keine Komponenten oder Funktionen ändern.

5. **Am Ende ausgeben**
   - Die komplett finale `vite.config.ts` mit dem vollständigen Code.