## Zusammenhang mit der Team-Seite?

Nein. Die CSRF-Warnung ist **eine reine Sicherheitsempfehlung** von TanStack Start und hat mit der kaputten Team-Darstellung auf `mirodrive.pewandmedia.de` **nichts zu tun**. Sie blockiert nichts, verursacht keinen Layout-Fehler und bricht keine Datenbank-Anfrage ab.

Die Team-Seite auf deinem Debian-Server sieht auf dem Screenshot deshalb chaotisch aus, weil dort noch ein **alter Build** läuft. In der Lovable-Preview ist die Seite bereits sauber. Nach einem echten Deploy (neu bauen + Prozess neu starten) verschwindet das Layout-Problem.

## Was du auf dem Server tun solltest (Team-Seite fixen)

Im Projektordner auf deinem Debian-Server:

```bash
git pull
npm install
npm run build
```

Dann je nachdem wie du die App startest:

```bash
pm2 restart all        # falls du pm2 nutzt
# ODER
sudo systemctl restart drive-forward   # falls systemd (Servicenamen anpassen)
```

Danach die Seite mit hartem Reload öffnen (Cmd+Shift+R). Die Team-Karten sollten dann sauber in ihren Boxen sitzen.

## Lösungsvorschlag zur CSRF-Warnung

Die Warnung sagt: Server-Funktionen (`createServerFn`) sind derzeit nicht gegen Cross-Site-Requests geschützt. Empfohlene Lösung: eine CSRF-Middleware in `src/start.ts` ergänzen.

### Plan

1. **CSRF-Middleware in `src/start.ts` ergänzen**
   - Neue Middleware `csrfMiddleware` via `createCsrfMiddleware` aus `@tanstack/react-start`.
   - Filter setzen: `filter: (ctx) => ctx.handlerType === 'serverFn'`, damit nur Server-Funktionen geprüft werden, nicht öffentliche API-Routen wie Webhooks.
   - Middleware zusätzlich zum bestehenden `errorMiddleware` in `requestMiddleware` eintragen.
   - `functionMiddleware: [attachSupabaseAuth]` bleibt unverändert.

2. **Kompatibilität prüfen**
   - Sicherstellen, dass die installierte `@tanstack/react-start`-Version `createCsrfMiddleware` bereits exportiert. Falls nicht: Version aktualisieren.
   - Öffentliche API-Routen unter `src/routes/api/public/*` sind vom Filter nicht betroffen — sie brauchen weiter ihre eigene Signatur-Prüfung.

3. **Verifizieren**
   - Lokal bauen (`npm run build`) und testen, dass:
     - Warnung im Terminal verschwindet.
     - Team-, Preise-, Erste-Hilfe-, Home-Seite normal laden.
     - Login und Admin-Bereich weiter funktionieren.

4. **Auf deinem Debian-Server deployen**
   - `git pull && npm install && npm run build`
   - App neu starten (pm2 oder systemd).

## Ergebnis

Nach dem Deploy siehst du:
- Die Team-Seite auf `mirodrive.pewandmedia.de` sitzt sauber in den Karten (wie in der Preview).
- Die CSRF-Warnung ist weg, Server-Funktionen sind sauber gegen Cross-Site-Requests geschützt.