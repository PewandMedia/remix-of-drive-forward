## Plan: Host-Blockierung auf VPS beheben

Der Fehler betrifft nur die Vite-Server-Konfiguration. Ich ändere keine UI, keine Texte und keine App-Funktionen.

### Vorgehen

1. **Config-Dateien prüfen**
   - Prüfen, ob `vite.config.ts` existiert und aktiv ist.
   - Prüfen, ob zusätzlich eine `vite.config.js` existiert, die auf dem VPS eventuell statt der `.ts`-Datei verwendet wird.
   - Keine neue Datei erstellen, wenn die vorhandene Config korrekt genutzt werden kann.

2. **`server`-Block final absichern**
   - Sicherstellen, dass in der aktiven Vite-Config exakt zusammengeführt vorhanden ist:
     - `host: "0.0.0.0"`
     - `port: 8082`
     - `allowedHosts` mit `"mirodrive.pewandmedia.de"` und `"www.mirodrive.pewandmedia.de"`
   - Falls ein `server`-Block schon existiert, nur ergänzen, nicht doppelt anlegen.

3. **`preview`-Block final absichern**
   - Sicherstellen, dass auch `preview` gesetzt ist mit:
     - `host: "0.0.0.0"`
     - `port: 8082`
     - denselben `allowedHosts`
   - Falls ein `preview`-Block schon existiert, nur ergänzen, nicht doppelt anlegen.

4. **Keine anderen Dateien anfassen**
   - Keine Komponenten.
   - Keine Routen.
   - Keine Styles.
   - Keine Inhalte.

5. **Finale Ausgabe**
   - Die komplette finale `vite.config.ts` oder `vite.config.js` ausgeben.
   - Wenn die Config bereits korrekt ist, klar sagen, dass der VPS-Prozess danach neu gestartet bzw. neu deployed werden muss, weil Vite Config-Änderungen nicht ohne Neustart übernommen werden.